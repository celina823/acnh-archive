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
