import { items as animalCrossingItems } from "animal-crossing";
import { FurnitureItemType } from "@/types/furnitureType";

const koKrFurnitureNames = new Map(
  animalCrossingItems
    .filter((item) => item.translations?.kRko)
    .map((item) => [item.name, item.translations!.kRko]),
);

export const getFurniture = async (): Promise<FurnitureItemType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/nh/furniture`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
        "Accept-Version": "1.0.0",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("가구 데이터를 불러오지 못했습니다.");
  }

  const furniture = (await response.json()) as FurnitureItemType[];

  return furniture.map((item) => ({
    ...item,
    translations: {
      ...item.translations,
      koKr: koKrFurnitureNames.get(item.name),
    },
  }));
};

export const getFurniturePage = async (
  cursor: string | null,
  limit: number,
): Promise<{ furniture: FurnitureItemType[]; nextCursor: string | null }> => {
  const allFurniture = await getFurniture();

  const startIndex = cursor ? Number(cursor) : 0;
  const endIndex = startIndex + limit;
  const paginatedFurniture = allFurniture.slice(startIndex, endIndex);

  const nextCursor =
    endIndex < allFurniture.length ? endIndex.toString() : null;

  return { furniture: paginatedFurniture, nextCursor };
};
