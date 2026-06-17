"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
} from "@tanstack/react-query";
import type { ArtItemType } from "@/types/artType";
import {
  formatArtAuthenticity,
  formatArtAuthor,
  formatArtAvailability,
  formatArtDescription,
  formatArtOriginalTitle,
  formatArtStyle,
  formatArtType,
  formatArtYear,
} from "@/lib/mappings/artMappings";

const ITEMS_PER_PAGE = 12;

type ArtResponse = {
  items: ArtItemType[];
  nextCursor: string | null;
};

const fetchArtPage = async ({
  pageParam,
}: QueryFunctionContext<
  readonly ["art"],
  string | null
>): Promise<ArtResponse> => {
  const searchParams = new URLSearchParams({
    cursor: pageParam ?? "",
    limit: ITEMS_PER_PAGE.toString(),
  });
  const response = await fetch(`/api/art?${searchParams.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new Error(
      errorBody?.message ?? "미술품 데이터를 불러오지 못했습니다.",
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

function getRealImageSrc(item: ArtItemType) {
  return (
    item.image_url ||
    item.real_info?.image_url ||
    item.texture_url ||
    item.real_info?.texture_url
  );
}

function getFakeImageSrc(item: ArtItemType) {
  return (
    item.fake_image_url ||
    item.fake_info?.image_url ||
    item.fake_texture_url ||
    item.fake_info?.texture_url
  );
}

function getRealTextureSrc(item: ArtItemType) {
  return (
    item.texture_url ||
    item.real_info?.texture_url ||
    item.image_url ||
    item.real_info?.image_url
  );
}

function getFakeTextureSrc(item: ArtItemType) {
  return (
    item.fake_texture_url ||
    item.fake_info?.texture_url ||
    item.fake_image_url ||
    item.fake_info?.image_url
  );
}

function ArtCard({ item }: { item: ArtItemType }) {
  const displayName = item.translations?.koKr ?? item.name;
  const imageSrc = getRealImageSrc(item) || getFakeImageSrc(item);
  const description = formatArtDescription(
    item.name,
    item.description ?? item.real_info?.description,
  );
  const authenticity = formatArtAuthenticity(item.name, item.authenticity);

  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-amber-50">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={displayName}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            이미지 없음
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-amber-700">
              {formatArtType(item.art_type)}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {displayName}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{item.art_name}</p>
          </div>

          {item.has_fake ? (
            <span className="shrink-0 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800 transition">
              가품 존재
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              진품만
            </span>
          )}
        </div>

        <div className="grid gap-3 text-sm text-slate-700">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              작가: {formatArtAuthor(item.name, item.author)}
            </span>
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              연도: {formatArtYear(item.year)}
            </span>
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              재료·기법: {formatArtStyle(item.name, item.art_style)}
            </span>
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              입수: {formatArtAvailability(item.availability)}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              구매: {formatBells(item.buy)}
            </span>
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              판매: {formatBells(item.sell)}
            </span>
            <span className="rounded-2xl bg-slate-100 px-3 py-1">
              크기: {item.width}x{item.length}
            </span>
          </div>
        </div>

        {description && (
          <div className="rounded-3xl border border-amber-100 bg-amber-50/70 px-4 py-4 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-slate-800">작품 설명</p>
            <p className="mt-2 line-clamp-4">{description}</p>
          </div>
        )}
      </div>
    </>
  );
}

function ArtComparisonModal({
  item,
  onClose,
}: {
  item: ArtItemType;
  onClose: () => void;
}) {
  const displayName = item.translations?.koKr ?? item.name;
  const realImageSrc = getRealTextureSrc(item);
  const fakeImageSrc = getFakeTextureSrc(item);
  const realDescription =
    formatArtDescription(
      item.name,
      item.real_info?.description ?? item.description,
    ) ?? "진품 설명 정보 없음";
  const fakeDescription = item.has_fake
    ? (formatArtAuthenticity(
        item.name,
        item.fake_info?.description ?? item.authenticity,
      ) ?? "가품 설명 정보 없음")
    : "이 작품은 진품만 존재합니다.";
  const originalTitle = formatArtOriginalTitle(item.name, item.art_name);
  const authenticity = formatArtAuthenticity(item.name, item.authenticity);
  const fakePanelTitle = item.has_fake ? "가품" : "가품 없음";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${displayName} 진/가품 정보`}
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[32px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-semibold text-amber-700">
              {formatArtType(item.art_type)}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              {displayName} 진/가품 정보
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            닫기
          </button>
        </div>

        <div className="grid gap-5 bg-slate-50 p-5 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white">
            <div className="border-b border-emerald-100 px-4 py-3">
              <h3 className="font-semibold text-emerald-800">진품</h3>
            </div>
            <div className="relative aspect-[4/3] bg-emerald-50">
              {realImageSrc ? (
                <Image
                  src={realImageSrc}
                  alt={`${displayName} 진품`}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-contain p-6"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  진품 이미지 없음
                </div>
              )}
            </div>
            <div className="space-y-3 px-4 py-4 text-sm leading-6 text-slate-700">
              <p className="text-base font-semibold text-slate-900">
                원작명: {originalTitle}
              </p>
              <p>{realDescription}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-rose-100 bg-white">
            <div className="border-b border-rose-100 px-4 py-3">
              <h3 className="font-semibold text-rose-800">{fakePanelTitle}</h3>
            </div>
            <div className="relative aspect-[4/3] bg-rose-50">
              {fakeImageSrc ? (
                <Image
                  src={fakeImageSrc}
                  alt={`${displayName} 가품`}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-contain p-6"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">
                  가품 이미지 없음
                </div>
              )}
            </div>
            <div className="space-y-3 px-4 py-4 text-sm leading-6 text-slate-700">
              <p>
                <span className="font-semibold text-slate-800">구분법: </span>
                {authenticity || "정보 없음"}
              </p>
              <p>{fakeDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArtInfiniteList() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [selectedArt, setSelectedArt] = useState<ArtItemType | null>(null);

  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<
    ArtResponse,
    Error,
    InfiniteData<ArtResponse, string | null>,
    readonly ["art"],
    string | null
  >({
    queryKey: ["art"],
    queryFn: fetchArtPage,
    initialPageParam: null,
    getNextPageParam: (last) => last.nextCursor,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const visibleArt = useMemo<ArtItemType[]>(
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

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    item: ArtItemType,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedArt(item);
    }
  };

  if (isLoading) {
    return (
      <section className="px-4 py-12 text-center text-slate-700 sm:px-6 lg:px-8">
        <p className="text-lg font-medium">
          미술품 데이터를 불러오는 중입니다...
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
    <>
      <section className="space-y-8 pb-16 pt-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleArt.map((item, index) => (
            <article
              key={`${item.name}-${item.art_name}`}
              ref={index === visibleArt.length - 1 ? lastItemRef : null}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedArt(item)}
              onKeyDown={(event) => handleCardKeyDown(event, item)}
              className="group cursor-pointer overflow-hidden rounded-[32px] border border-amber-100 bg-white shadow-lg shadow-amber-100/60 transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
            >
              <ArtCard item={item} />
            </article>
          ))}
        </div>

        <div className="text-center text-sm text-slate-500">
          {hasNextPage
            ? isFetchingNextPage
              ? "불러오는 중..."
              : "스크롤을 내려 더 많은 미술품을 불러오세요."
            : "모든 미술품 데이터를 불러왔습니다."}
        </div>
      </section>

      {selectedArt && (
        <ArtComparisonModal
          item={selectedArt}
          onClose={() => setSelectedArt(null)}
        />
      )}
    </>
  );
}
