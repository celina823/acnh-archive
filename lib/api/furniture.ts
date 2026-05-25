import { FurnitureItemType } from "@/types/furnitureType";

export const getFurniture = async (): Promise<FurnitureItemType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/nh/furniture`,
    {
      headers: {
        "X-API-KEY": process.env.API_KEY!,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("가구 데이터를 불러오는데 실패했습니다.");
  }

  return response.json();
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
