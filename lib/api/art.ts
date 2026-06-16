import { items as animalCrossingItems } from "animal-crossing";
import type { ArtItemType } from "@/types/artType";

const koKrArtNames = new Map(
  animalCrossingItems
    .filter((item) => item.sourceSheet === "Artwork" && item.translations?.kRko)
    .map((item) => [item.name.toLowerCase(), item.translations!.kRko]),
);

export const getArt = async (): Promise<ArtItemType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nh/art`, {
    headers: {
      "X-API-KEY": process.env.API_KEY!,
      "Accept-Version": "1.0.0",
    },
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    throw new Error("미술품 데이터를 불러오지 못했습니다.");
  }

  const art = (await response.json()) as ArtItemType[];

  return art.map((item) => ({
    ...item,
    translations: {
      ...item.translations,
      koKr: koKrArtNames.get(item.name.toLowerCase()),
    },
  }));
};

export const getArtPage = async (
  cursor: string | null,
  limit: number,
): Promise<{ art: ArtItemType[]; nextCursor: string | null }> => {
  const allArt = await getArt();
  const parsedCursor = cursor ? Number(cursor) : 0;
  const startIndex = Number.isFinite(parsedCursor) ? parsedCursor : 0;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 12;
  const endIndex = startIndex + safeLimit;

  return {
    art: allArt.slice(startIndex, endIndex),
    nextCursor: endIndex < allArt.length ? endIndex.toString() : null,
  };
};
