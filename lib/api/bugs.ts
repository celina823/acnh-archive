import { creatures as animalCrossingCreatures } from "animal-crossing";
import type { BugType } from "@/types/bugType";

const koKrBugNames = new Map(
  animalCrossingCreatures
    .filter(
      (creature) =>
        creature.sourceSheet === "Insects" && creature.translations?.kRko,
    )
    .map((creature) => [creature.name.toLowerCase(), creature.translations!.kRko]),
);

export const getBugs = async (): Promise<BugType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nh/bugs`, {
    headers: {
      "X-API-KEY": process.env.API_KEY!,
      "Accept-Version": "1.0.0",
    },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("곤충 데이터를 불러오지 못했습니다.");

  const bugs = (await response.json()) as BugType[];

  return bugs.map((bug) => ({
    ...bug,
    translations: {
      ...bug.translations,
      koKr: koKrBugNames.get(bug.name.toLowerCase()),
    },
  }));
};

export const getBugsPage = async (cursor: string | null, limit: number) => {
  const allBugs = (await getBugs()).toSorted(
    (a, b) => Number(a.number) - Number(b.number),
  );
  const parsedCursor = cursor ? Number(cursor) : 0;
  const startIndex = Number.isFinite(parsedCursor) ? parsedCursor : 0;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 12;
  const endIndex = startIndex + safeLimit;

  return {
    bugs: allBugs.slice(startIndex, endIndex),
    nextCursor: endIndex < allBugs.length ? endIndex.toString() : null,
  };
};
