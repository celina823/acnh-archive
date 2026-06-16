import { creatures as animalCrossingCreatures } from "animal-crossing";
import type { SeaCreatureType } from "@/types/seaCreatureType";

const koKrSeaCreatureNames = new Map(
  animalCrossingCreatures
    .filter(
      (creature) =>
        creature.sourceSheet === "Sea Creatures" && creature.translations?.kRko,
    )
    .map((creature) => [
      creature.name.toLowerCase(),
      creature.translations!.kRko,
    ]),
);

export const getSeaCreatures = async (): Promise<SeaCreatureType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nh/sea`, {
    headers: {
      "X-API-KEY": process.env.API_KEY!,
      "Accept-Version": "1.0.0",
    },
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    throw new Error("해산물 데이터를 불러오지 못했습니다.");
  }

  const seaCreatures = (await response.json()) as SeaCreatureType[];

  return seaCreatures.map((seaCreature) => ({
    ...seaCreature,
    translations: {
      ...seaCreature.translations,
      koKr: koKrSeaCreatureNames.get(seaCreature.name.toLowerCase()),
    },
  }));
};

export const getSeaCreaturesPage = async (
  cursor: string | null,
  limit: number,
): Promise<{ seaCreatures: SeaCreatureType[]; nextCursor: string | null }> => {
  const allSeaCreatures = [...(await getSeaCreatures())].sort(
    (a, b) => Number(a.number) - Number(b.number),
  );

  const parsedCursor = cursor ? Number(cursor) : 0;
  const startIndex = Number.isFinite(parsedCursor) ? parsedCursor : 0;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 12;
  const endIndex = startIndex + safeLimit;

  return {
    seaCreatures: allSeaCreatures.slice(startIndex, endIndex),
    nextCursor:
      endIndex < allSeaCreatures.length ? endIndex.toString() : null,
  };
};
