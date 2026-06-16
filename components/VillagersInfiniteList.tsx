"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  InfiniteData,
  keepPreviousData,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  formatVillagerBirthdayMonth,
  formatVillagerColor,
  formatVillagerGender,
  formatVillagerPersonality,
  formatVillagerSign,
  formatVillagerStyle,
} from "@/lib/mappings/villagerMappings";
import type { VillagerType } from "@/types/villagersType";

const ITEMS_PER_PAGE = 20;

type VillagersResponse = {
  items: VillagerType[];
  nextCursor: string | null;
};

const fetchVillagersPage = async ({
  pageParam,
  queryKey,
}: QueryFunctionContext<
  readonly ["villagers", string],
  string | null
>): Promise<VillagersResponse> => {
  const [, search] = queryKey;
  const searchParams = new URLSearchParams({
    cursor: pageParam ?? "",
    limit: ITEMS_PER_PAGE.toString(),
    search,
  });
  const response = await fetch(`/api/villagers?${searchParams.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new Error(errorBody?.message ?? "주민 데이터를 불러오지 못했습니다.");
  }

  return response.json();
};

export default function VillagersInfiniteList() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [search, setSearch] = useState("");
  const [selectedHouse, setSelectedHouse] = useState<{
    name: string;
    imageUrl: string;
  } | null>(null);
  const [houseImageError, setHouseImageError] = useState(false);
  const normalizedSearch = search.trim();

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
    readonly ["villagers", string],
    string | null
  >({
    queryKey: ["villagers", normalizedSearch],
    queryFn: fetchVillagersPage,
    initialPageParam: null,
    getNextPageParam: (last) => last.nextCursor,
    placeholderData: keepPreviousData,
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
    <section className="space-y-8 pb-16 pt-6">
      <label className="relative block w-full">
        <span className="sr-only">Search villagers by name</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="찾고 싶은 주민을 검색해보세요"
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 pr-14 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
        />
        <Image
          src="/icon-search.png"
          alt=""
          aria-hidden="true"
          width={20}
          height={20}
          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 object-contain"
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleVillagers.map((villager, index) => {
          const displayName = villager.translations?.koKr ?? villager.name;
          const favoriteStyles = villager.nh_details?.fav_styles ?? [];
          const favoriteColors = villager.nh_details?.fav_colors ?? [];
          const houseExteriorUrl = villager.nh_details?.house_exterior_url;

          return (
            <article
              key={villager.id}
              ref={index === visibleVillagers.length - 1 ? lastItemRef : null}
              className="group overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-lg shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={villager.image_url}
                  alt={displayName}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-800 shadow-sm">
                  {villager.species}
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {displayName}
                  </h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
                    {formatVillagerGender(villager.gender)}
                  </span>
                </div>

                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-2xl bg-slate-100 px-3 py-1">
                      성격: {formatVillagerPersonality(villager.personality)}
                    </span>
                    <span className="rounded-2xl bg-slate-100 px-3 py-1">
                      의상: {villager.clothing}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-2xl bg-slate-100 px-3 py-1">
                      생일: {formatVillagerBirthdayMonth(villager.birthday_month)}
                      월 {villager.birthday_day}일
                    </span>
                    <span className="rounded-2xl bg-slate-100 px-3 py-1">
                      별자리: {formatVillagerSign(villager.sign)}
                    </span>
                  </div>

                  {(favoriteStyles.length > 0 || favoriteColors.length > 0) && (
                    <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                      {favoriteStyles.length > 0 && (
                        <div>
                          <p className="font-semibold text-slate-800">
                            좋아하는 스타일
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {favoriteStyles.map((style) => (
                              <span
                                key={`${villager.id}-style-${style}`}
                                className="rounded-2xl bg-white px-3 py-1 text-slate-700 shadow-sm"
                              >
                                {formatVillagerStyle(style)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {favoriteColors.length > 0 && (
                        <div>
                          <p className="font-semibold text-slate-800">
                            좋아하는 색상
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {favoriteColors.map((color) => (
                              <span
                                key={`${villager.id}-color-${color}`}
                                className="rounded-2xl bg-white px-3 py-1 text-slate-700 shadow-sm"
                              >
                                {formatVillagerColor(color)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
                  <p className="font-semibold text-slate-800">말버릇</p>
                  <p className="mt-2">
                    {villager.catchphrase ?? villager.phrase}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700">
                  <p className="font-semibold text-slate-800">좋아하는 말</p>
                  <p className="mt-2">{villager.quote}</p>
                </div>

                {houseExteriorUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setHouseImageError(false);
                      setSelectedHouse({
                        name: displayName,
                        imageUrl: houseExteriorUrl,
                      });
                    }}
                    className="w-fit rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    집 이미지
                  </button>
                )}

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
          );
        })}
      </div>

      <div className="text-center text-sm text-slate-500">
        {hasNextPage
          ? isFetchingNextPage
            ? "불러오는 중..."
            : "스크롤을 내려 더 많은 주민을 불러오세요."
          : "모든 주민 데이터를 불러왔습니다."}
      </div>

      {selectedHouse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedHouse.name} 집 이미지`}
          onClick={() => {
            setSelectedHouse(null);
            setHouseImageError(false);
          }}
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-slate-900">
                {selectedHouse.name} 집 이미지
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedHouse(null);
                  setHouseImageError(false);
                }}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                닫기
              </button>
            </div>
            <div className="bg-slate-50 p-6">
              {houseImageError ? (
                <div className="flex min-h-64 items-center justify-center rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center text-sm font-medium text-red-700">
                  이미지를 불러오는 데 실패했습니다.
                </div>
              ) : (
                <img
                  src={selectedHouse.imageUrl}
                  alt={`${selectedHouse.name} 집 외관`}
                  className="mx-auto max-h-[70vh] w-full object-contain"
                  onError={() => setHouseImageError(true)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
