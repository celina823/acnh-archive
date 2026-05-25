"use client";

import { useCallback, useMemo, useRef } from "react";
import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import type { VillagerType } from "@/types/villagersType";

const ITEMS_PER_PAGE = 10;

type VillagersResponse = {
  items: VillagerType[];
  nextCursor: string | null;
};

const fetchVillagersPage = async ({
  pageParam,
}: QueryFunctionContext<
  readonly ["villagers"],
  string | null
>): Promise<VillagersResponse> => {
  const response = await fetch(
    `/api/villagers?cursor=${pageParam ?? ""}&limit=${ITEMS_PER_PAGE}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("주민 데이터를 불러오는데 실패했습니다.");
  }

  return response.json();
};

export default function VillagersInfiniteList() {
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
    VillagersResponse,
    Error,
    InfiniteData<VillagersResponse, string | null>,
    readonly ["villagers"],
    string | null
  >({
    queryKey: ["villagers"],
    queryFn: fetchVillagersPage,
    initialPageParam: null,
    getNextPageParam: (last) => last.nextCursor,
    staleTime: 1000 * 60 * 3,
  });

  const visibleVillagers = useMemo<VillagerType[]>(
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
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  if (isLoading) {
    return (
      <section className="px-4 py-12 text-center text-slate-700 sm:px-6 lg:px-8">
        <p className="text-lg font-medium">
          주민 데이터를 불러오는 중입니다...
        </p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 py-12 text-center text-red-600 sm:px-6 lg:px-8">
        <p className="text-lg font-medium">데이터를 불러오지 못했습니다.</p>
        <p className="mt-2 text-sm">{error?.message}</p>
      </section>
    );
  }

  return (
    <section className="space-y-8pb-16 pt-6 ">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleVillagers.map((villager, index) => (
          <article
            key={villager.id}
            ref={index === visibleVillagers.length - 1 ? lastItemRef : null}
            className="group overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-lg shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src={villager.image_url}
                alt={villager.name}
                loading="lazy"
                className="h-full w-full object-contain"
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-800 shadow-sm">
                {villager.species}
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: villager.title_color }}
                  >
                    {villager.name}
                  </h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
                    {villager.gender}
                  </span>
                </div>

                <p
                  className="text-sm leading-6 text-slate-600"
                  style={{ color: villager.text_color }}
                >
                  {villager.quote || villager.phrase}
                </p>
              </div>

              <div className="grid gap-3 text-sm text-slate-700">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-2xl bg-slate-100 px-3 py-1">
                    성격: {villager.personality}
                  </span>
                  <span className="rounded-2xl bg-slate-100 px-3 py-1">
                    의상: {villager.clothing}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-2xl bg-slate-100 px-3 py-1">
                    생일: {villager.birthday_month}월 {villager.birthday_day}일
                  </span>
                  <span className="rounded-2xl bg-slate-100 px-3 py-1">
                    별자리: {villager.sign}
                  </span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
                <p className="font-semibold text-slate-800">Phrase</p>
                <p className="mt-2">“{villager.phrase}”</p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                {villager.appearances.map((appearance: string) => (
                  <span
                    key={`${villager.id}-${appearance}`}
                    className="rounded-full bg-slate-100 px-2 py-1"
                  >
                    {appearance}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center text-sm text-slate-500">
        {hasNextPage
          ? isFetchingNextPage
            ? "불러오는 중..."
            : "스크롤을 내려서 더 많은 주민을 불러오세요."
          : "모든 주민 데이터를 로드했습니다."}
      </div>
    </section>
  );
}
