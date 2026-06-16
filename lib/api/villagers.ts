import {
  items as animalCrossingItems,
  villagers as animalCrossingVillagers,
} from "animal-crossing";
import { getKoKrSpeciesName } from "@/lib/mappings/villagerMappings";
import { villagerKoKrOverridesByName } from "@/lib/mappings/villagerOverrides";
import { VillagerType } from "@/types/villagersType";

const animalCrossingVillagersByName = new Map(
  animalCrossingVillagers.map((villager) => [villager.name, villager]),
);

const animalCrossingItemTranslationsByInternalId = new Map(
  animalCrossingItems
    .filter((item) => item.internalId !== undefined && item.translations?.kRko)
    .map((item) => [item.internalId!, item.translations!.kRko]),
);

const animalCrossingItemTranslationsByName = new Map(
  animalCrossingItems
    .filter((item) => item.translations?.kRko)
    .map((item) => [item.name, item.translations!.kRko]),
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
    const koKrOverride = villagerKoKrOverridesByName[villager.name];
    const koKrClothing =
      koKrOverride?.clothing ??
      (matchingVillager?.defaultClothingInternalId !== undefined
        ? animalCrossingItemTranslationsByInternalId.get(
            matchingVillager.defaultClothingInternalId,
          )
        : undefined) ??
      animalCrossingItemTranslationsByName.get(villager.clothing) ??
      (matchingVillager
        ? animalCrossingItemTranslationsByName.get(matchingVillager.defaultClothing)
        : undefined) ??
      villager.clothing;

    return {
      ...villager,
      species: getKoKrSpeciesName(villager.species),
      catchphrase:
        koKrOverride?.catchphrase ??
        matchingVillager?.catchphrases.kRko ??
        villager.phrase,
      clothing: koKrClothing,
      translations: {
        ...villager.translations,
        koKr: koKrOverride?.name ?? matchingVillager?.translations.kRko,
      },
    };
  });
};

export const getVillagersPage = async (
  cursor: string | null,
  limit: number,
  search = "",
): Promise<{ villagers: VillagerType[]; nextCursor: string | null }> => {
  const allVillagers = await getVillagers();
  const normalizedSearch = search.trim().toLowerCase();
  const filteredVillagers = normalizedSearch
    ? allVillagers.filter((villager) => {
        const searchableNames = [
          villager.name,
          villager.translations?.koKr,
        ].filter((name): name is string => Boolean(name));

        return searchableNames.some((name) =>
          name.toLowerCase().includes(normalizedSearch),
        );
      })
    : allVillagers;

  const startIndex = cursor ? Number(cursor) : 0;
  const endIndex = startIndex + limit;
  const paginatedVillagers = filteredVillagers.slice(startIndex, endIndex);

  const nextCursor =
    endIndex < filteredVillagers.length ? endIndex.toString() : null;

  return { villagers: paginatedVillagers, nextCursor };
};
