"use client";

import { useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  formatSeaCreatureAvailability,
  formatSeaCreatureShadowMovement,
  formatSeaCreatureShadowSize,
} from "@/lib/mappings/seaCreatureMappings";
import type { SeaCreatureType } from "@/types/seaCreatureType";

const ITEMS_PER_PAGE = 12;

type SeaCreaturesResponse = {
  items: SeaCreatureType[];
  nextCursor: string | null;
};

const fetchSeaCreaturesPage = async ({
  pageParam,
}: QueryFunctionContext<
  readonly ["seaCreatures"],
  string | null
>): Promise<SeaCreaturesResponse> => {
  const searchParams = new URLSearchParams({
    cursor: pageParam ?? "",
    limit: ITEMS_PER_PAGE.toString(),
  });
  const response = await fetch(`/api/seacreatures?${searchParams.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new Error(
      errorBody?.message ?? "해산물 데이터를 불러오지 못했습니다.",
    );
  }

  return response.json();
};

function formatBells(value: number | string) {
  const price = Number(value);
  return Number.isFinite(price)
    ? `${price.toLocaleString()} 벨`
    : "가격 정보 없음";
}

function SeaCreatureCard({ seaCreature }: { seaCreature: SeaCreatureType }) {
  const imageSrc = seaCreature.render_url || seaCreature.image_url;
  const displayName = seaCreature.translations?.koKr ?? seaCreature.name;
  const northernAvailability = formatSeaCreatureAvailability(seaCreature);
  const catchphrase =
    seaCreature.catchphrases?.[0] ??
    seaCreature.catchphrase ??
    seaCreature.catchphrase2;

  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cyan-50">
        <Image
          src={imageSrc}
          alt={displayName}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-6 transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-cyan-700">
              No. {seaCreature.number}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {displayName}
            </h2>
            {/* <p className="mt-1 text-sm text-slate-500">해산물</p> */}
          </div>
          {seaCreature.rarity && (
            <span className="shrink-0 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800">
              {seaCreature.rarity}
            </span>
          )}
        </div>

        <div className="grid gap-3 text-sm text-slate-700">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              그림자 크기:{" "}
              {formatSeaCreatureShadowSize(seaCreature.shadow_size)}
            </span>
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              움직임:{" "}
              {formatSeaCreatureShadowMovement(seaCreature.shadow_movement)}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              너굴 상점: {formatBells(seaCreature.sell_nook)}
            </span>
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              수조 크기: {seaCreature.tank_width}x{seaCreature.tank_length}
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-100 bg-cyan-50/70 px-4 py-4 text-sm leading-6 text-slate-700">
          <p className="font-semibold text-slate-800">북반구 출현</p>
          <p className="mt-2">{northernAvailability}</p>
        </div>

        {catchphrase && (
          <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-slate-800">잡았을 때</p>
            <p className="mt-2">{catchphrase}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function SeaCreaturesInfiniteList() {
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
    SeaCreaturesResponse,
    Error,
    InfiniteData<SeaCreaturesResponse, string | null>,
    readonly ["seaCreatures"],
    string | null
  >({
    queryKey: ["seaCreatures"],
    queryFn: fetchSeaCreaturesPage,
    initialPageParam: null,
    getNextPageParam: (last) => last.nextCursor,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const visibleSeaCreatures = useMemo<SeaCreatureType[]>(
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
          해산물 데이터를 불러오는 중입니다...
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleSeaCreatures.map((seaCreature, index) => (
          <article
            key={`${seaCreature.number}-${seaCreature.name}`}
            ref={index === visibleSeaCreatures.length - 1 ? lastItemRef : null}
            className="group overflow-hidden rounded-[32px] border border-cyan-100 bg-white shadow-lg shadow-cyan-100/60 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <SeaCreatureCard seaCreature={seaCreature} />
          </article>
        ))}
      </div>

      <div className="text-center text-sm text-slate-500">
        {hasNextPage
          ? isFetchingNextPage
            ? "불러오는 중..."
            : "스크롤을 내려 더 많은 해산물을 불러오세요."
          : "모든 해산물 데이터를 불러왔습니다."}
      </div>
    </section>
  );
}
