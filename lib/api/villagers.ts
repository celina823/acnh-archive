import { villagers as animalCrossingVillagers } from "animal-crossing";
import { VillagerType } from "@/types/villagersType";

const animalCrossingVillagersByName = new Map(
  animalCrossingVillagers.map((villager) => [villager.name, villager]),
);

export const getVillagers = async (): Promise<VillagerType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/villagers?game=nh&nhdetails=true`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
        "Accept-Version": "1.0.0",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("주민 데이터를 불러오지 못했습니다.");
  }

  const villagers = (await response.json()) as VillagerType[];

  return villagers.map((villager) => {
    const matchingVillager = animalCrossingVillagersByName.get(villager.name);

    return {
      ...villager,
      catchphrase: matchingVillager?.catchphrases.kRko ?? villager.phrase,
      translations: {
        ...villager.translations,
        koKr: matchingVillager?.translations.kRko,
      },
    };
  });
};

export const getVillagersPage = async (
  cursor: string | null,
  limit: number,
): Promise<{ villagers: VillagerType[]; nextCursor: string | null }> => {
  const allVillagers = await getVillagers();

  const startIndex = cursor ? Number(cursor) : 0;
  const endIndex = startIndex + limit;
  const paginatedVillagers = allVillagers.slice(startIndex, endIndex);

  const nextCursor =
    endIndex < allVillagers.length ? endIndex.toString() : null;

  return { villagers: paginatedVillagers, nextCursor };
};
