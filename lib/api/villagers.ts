import { VillagerType } from "@/types/villagersType";

export const getVillagers = async (): Promise<VillagerType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/villagers`, {
    headers: {
      "X-API-KEY": process.env.API_KEY!,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("주민 데이터를 불러오는데 실패했습니다.");
  }

  return response.json();
};

export const getVillagersPage = async (
  cursor: string | null,
  limit: number,
): Promise<{ villagers: VillagerType[]; nextCursor: string | null }> => {
  const allVillagers = await getVillagers();

  // Cursor 파싱: cursor는 배열 인덱스
  const startIndex = cursor ? Number(cursor) : 0;
  const endIndex = startIndex + limit;
  const paginatedVillagers = allVillagers.slice(startIndex, endIndex);

  // nextCursor: 더 이상 데이터가 없으면 null
  const nextCursor =
    endIndex < allVillagers.length ? endIndex.toString() : null;

  return { villagers: paginatedVillagers, nextCursor };
};
