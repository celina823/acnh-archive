import { villagers as animalCrossingVillagers } from "animal-crossing";
import { VillagerType } from "@/types/villagersType";

const animalCrossingVillagersByName = new Map(
  animalCrossingVillagers.map((villager) => [villager.name, villager]),
);

const koKrSpeciesNames: Record<string, string> = {
  alligator: "악어",
  anteater: "개미핥기",
  bear: "곰",
  "bear cub": "아기곰",
  bird: "새",
  bull: "황소",
  cat: "고양이",
  chicken: "닭",
  cow: "소",
  cub: "아기곰",
  deer: "사슴",
  dog: "개",
  duck: "오리",
  eagle: "독수리",
  elephant: "코끼리",
  frog: "개구리",
  goat: "염소",
  gorilla: "고릴라",
  hamster: "햄스터",
  hippo: "하마",
  horse: "말",
  kangaroo: "캥거루",
  koala: "코알라",
  lion: "사자",
  monkey: "원숭이",
  mouse: "생쥐",
  octopus: "문어",
  ostrich: "타조",
  penguin: "펭귄",
  pig: "돼지",
  rabbit: "토끼",
  rhino: "코뿔소",
  rhinoceros: "코뿔소",
  sheep: "양",
  squirrel: "다람쥐",
  tiger: "호랑이",
  wolf: "늑대",
};

const getKoKrSpeciesName = (species: string) =>
  koKrSpeciesNames[species.toLowerCase()] ?? species;

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
      species: getKoKrSpeciesName(villager.species),
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
