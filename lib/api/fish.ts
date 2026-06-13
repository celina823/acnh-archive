import { creatures as animalCrossingCreatures } from "animal-crossing";
import type { Fish } from "@/types/fishType";

const koKrFishNames = new Map(
  animalCrossingCreatures
    .filter(
      (creature) =>
        creature.sourceSheet === "Fish" && creature.translations?.kRko,
    )
    .map((creature) => [creature.name.toLowerCase(), creature.translations!.kRko]),
);

export const getFish = async (): Promise<Fish[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nh/fish`, {
    headers: {
      "X-API-KEY": process.env.API_KEY!,
      "Accept-Version": "1.0.0",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("물고기 데이터를 불러오지 못했습니다.");
  }

  const fish = (await response.json()) as Fish[];

  return fish.map((item) => ({
    ...item,
    translations: {
      ...item.translations,
      koKr: koKrFishNames.get(item.name.toLowerCase()),
    },
  }));
};

export const getFishPage = async (
  cursor: string | null,
  limit: number,
): Promise<{ fish: Fish[]; nextCursor: string | null }> => {
  const allFish = await getFish();

  const startIndex = cursor ? Number(cursor) : 0;
  const endIndex = startIndex + limit;
  const paginatedFish = allFish.slice(startIndex, endIndex);

  const nextCursor = endIndex < allFish.length ? endIndex.toString() : null;

  return { fish: paginatedFish, nextCursor };
};
