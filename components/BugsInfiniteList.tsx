"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef } from "react";
import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  formatBugAvailability,
  formatBugLocation,
  formatBugWeather,
} from "@/lib/mappings/bugMappings";
import type { BugType } from "@/types/bugType";

const ITEMS_PER_PAGE = 12;

type BugsResponse = { items: BugType[]; nextCursor: string | null };

const fetchBugsPage = async ({
  pageParam,
}: QueryFunctionContext<
  readonly ["bugs"],
  string | null
>): Promise<BugsResponse> => {
  const searchParams = new URLSearchParams({
    cursor: pageParam ?? "",
    limit: ITEMS_PER_PAGE.toString(),
  });
  const response = await fetch(`/api/bugs?${searchParams.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(errorBody?.message ?? "곤충 데이터를 불러오지 못했습니다.");
  }
  return response.json();
};

const formatBells = (value: number | string) => {
  const price = Number(value);
  return Number.isFinite(price)
    ? `${price.toLocaleString()} 벨`
    : "가격 정보 없음";
};

function BugCard({ bug }: { bug: BugType }) {
  const displayName = bug.translations?.koKr ?? bug.name;
  const location = formatBugLocation(bug.location);
  const catchphrase =
    bug.catchphrases?.[0] ?? bug.catchphrase ?? bug.catchphrase2;

  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-emerald-50">
        <Image
          src={bug.render_url || bug.image_url}
          alt={displayName}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-6 transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-emerald-700">
              No. {bug.number}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {displayName}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{location}</p>
          </div>
          {bug.rarity && (
            <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              {bug.rarity}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-slate-700">
          <span className="rounded-2xl bg-slate-100 px-3 py-1">
            장소: {location}
          </span>
          <span className="rounded-2xl bg-slate-100 px-3 py-1">
            날씨: {formatBugWeather(bug.weather)}
          </span>

          <span className="rounded-2xl bg-slate-100 px-3 py-1">
            너굴 상점: {formatBells(bug.sell_nook)}
          </span>
          <span className="rounded-2xl bg-slate-100 px-3 py-1">
            레온: {formatBells(bug.sell_flick)}
          </span>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 px-4 py-4 text-sm leading-6 text-slate-700">
          <p className="font-semibold text-slate-800">북반구 출현</p>
          <p className="mt-2">{formatBugAvailability(bug)}</p>
        </div>

        {catchphrase && (
          <div className="rounded-3xl border border-slate-200 px-4 py-4 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-slate-800">잡았을 때</p>
            <p className="mt-2">{catchphrase}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function BugsInfiniteList() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<
    BugsResponse,
    Error,
    InfiniteData<BugsResponse, string | null>,
    readonly ["bugs"],
    string | null
  >({
    queryKey: ["bugs"],
    queryFn: fetchBugsPage,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 3,
  });
  console.log("bugs data:", data);

  const visibleBugs = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );

  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      observerRef.current?.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      });
      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  if (isLoading) {
    return (
      <p className="py-16 text-center text-slate-600">
        곤충 데이터를 불러오는 중입니다...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="py-16 text-center text-red-600">
        <p className="font-semibold">데이터를 불러오지 못했습니다.</p>
        <p className="mt-2 text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <section className="space-y-8 pb-16 pt-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleBugs.map((bug, index) => (
          <article
            key={`${bug.number}-${bug.name}`}
            ref={index === visibleBugs.length - 1 ? lastItemRef : null}
            className="group overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-lg shadow-emerald-100/60 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <BugCard bug={bug} />
          </article>
        ))}
      </div>

      <p className="text-center text-sm text-slate-500">
        {hasNextPage
          ? isFetchingNextPage
            ? "불러오는 중..."
            : "스크롤을 내려 더 많은 곤충을 확인하세요."
          : "모든 곤충 데이터를 불러왔습니다."}
      </p>
    </section>
  );
}
