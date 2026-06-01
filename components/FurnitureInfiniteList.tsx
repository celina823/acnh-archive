"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import type { FurnitureItemType } from "@/types/furnitureType";

const ITEMS_PER_PAGE = 20;

type FurnitureResponse = {
  items: FurnitureItemType[];
  nextCursor: string | null;
};

const fetchFurniturePage = async ({
  pageParam,
}: QueryFunctionContext<
  readonly ["furniture"],
  string | null
>): Promise<FurnitureResponse> => {
  const response = await fetch(
    `/api/furniture?cursor=${pageParam ?? ""}&limit=${ITEMS_PER_PAGE}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new Error(
      errorBody?.message ?? "가구 데이터를 불러오지 못했습니다.",
    );
  }

  return response.json();
};

function FurnitureCard({ item }: { item: FurnitureItemType }) {
  const [selectedFrame, setSelectedFrame] = useState(
    item.variations?.[0]?.variation ?? "",
  );
  const [selectedPattern, setSelectedPattern] = useState(
    item.variations?.[0]?.pattern ?? "",
  );

  const koreanName = item?.translations?.koKr;
  const displayName = koreanName ?? item.name;

  const uniqueFrames = useMemo(
    () => [...new Set(item.variations?.map((v) => v.variation) ?? [])],
    [item.variations],
  );

  const patternsForFrame = useMemo(
    () =>
      item.variations
        ?.filter((v) => v.variation === selectedFrame)
        .map((v) => v.pattern) ?? [],
    [item.variations, selectedFrame],
  );

  const uniquePatternsForFrame = useMemo(
    () => [...new Set(patternsForFrame)],
    [patternsForFrame],
  );

  const selectedVariation = useMemo(() => {
    const match = item.variations?.find(
      (v) => v.variation === selectedFrame && v.pattern === selectedPattern,
    );

    if (match) return match;
    if (selectedFrame) {
      return item.variations?.find((v) => v.variation === selectedFrame);
    }
    return item.variations?.[0];
  }, [item.variations, selectedFrame, selectedPattern]);

  const mainSrc = selectedVariation?.image_url ?? item.url;

  return (
    <>
      <div className="relative aspect-[4/3] w-full max-w-full overflow-hidden bg-slate-100">
        <img
          src={mainSrc}
          alt={`${displayName} ${selectedVariation?.variation ?? ""}`}
          loading="lazy"
          className="block h-full max-h-full w-full max-w-full min-w-0 object-contain"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-900">
              {displayName}
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
              {item.category}
            </span>
          </div>

          <p className="text-sm leading-6 text-slate-600">
            시리즈: {item.item_series || "없음"}
          </p>
        </div>

        {item.variations && item.variations.length > 0 && (
          <div className="space-y-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                변형
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {uniqueFrames.map((frame) => (
                  <button
                    key={frame}
                    type="button"
                    onClick={() => {
                      setSelectedFrame(frame);
                      const nextPattern =
                        item.variations?.find((v) => v.variation === frame)
                          ?.pattern ?? "";
                      setSelectedPattern(nextPattern);
                    }}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      selectedFrame === frame
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {frame || "기본"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                패턴
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {uniquePatternsForFrame.map((pattern) => (
                  <button
                    key={pattern}
                    type="button"
                    onClick={() => setSelectedPattern(pattern)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      selectedPattern === pattern
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {pattern || "기본"}
                  </button>
                ))}
              </div>
            </div>

            {selectedVariation && (
              <div className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">
                    색상: {selectedVariation.variation || "기본"}
                  </span>
                  {selectedVariation.pattern ? (
                    <span className="text-xs text-slate-500">
                      패턴: {selectedVariation.pattern}
                    </span>
                  ) : null}
                </div>
                {selectedVariation.colors.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedVariation.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                      >
                        <span
                          className="inline-block h-3 w-3 rounded-full border"
                          style={{ backgroundColor: color }}
                          aria-hidden
                        />
                        {color}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="grid gap-3 text-sm text-slate-700">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              판매가: {item.sell.toLocaleString()} 벨
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              리폼: {item.customizable ? "가능" : "불가능"}
            </span>
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              추가 버전: {item.version_added}
            </span>
          </div>
        </div>

        <div className="grid gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
          {item.themes.slice(0, 3).map((theme) => (
            <span
              key={`${item.name}-${theme}`}
              className="rounded-full bg-slate-100 px-2 py-1"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function FurnitureInfiniteList() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<
    FurnitureResponse,
    Error,
    InfiniteData<FurnitureResponse, string | null>,
    readonly ["furniture"],
    string | null
  >({
    queryKey: ["furniture"],
    queryFn: fetchFurniturePage,
    initialPageParam: null,
    getNextPageParam: (last) => last.nextCursor,
    staleTime: 1000 * 60 * 3,
  });

  const visibleFurniture = useMemo<FurnitureItemType[]>(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );

  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  if (isLoading) {
    return (
      <section className="px-4 py-12 text-center text-slate-700 sm:px-6 lg:px-8">
        <p className="text-lg font-medium">
          가구 데이터를 불러오는 중입니다...
        </p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 py-12 text-center text-red-600 sm:px-6 lg:px-8">
        <p className="text-lg font-medium">
          데이터를 불러오지 못했습니다.
        </p>
        <p className="mt-2 text-sm">{error?.message}</p>
      </section>
    );
  }

  return (
    <section className="space-y-8 pb-16 pt-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleFurniture.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            ref={index === visibleFurniture.length - 1 ? lastItemRef : null}
            className="group w-full min-w-0 overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-lg shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <FurnitureCard item={item} />
          </article>
        ))}
      </div>

      <div className="text-center text-sm text-slate-500">
        {hasNextPage
          ? isFetchingNextPage
            ? "불러오는 중..."
            : "스크롤을 내려 더 많은 가구를 불러오세요."
          : "모든 가구 데이터를 불러왔습니다."}
      </div>
    </section>
  );
}
