export type VillagerKoKrOverride = {
  name: string;
  catchphrase: string;
  clothing: string;
};

export const villagerKoKrOverridesByName: Record<string, VillagerKoKrOverride> =
  {
    Cece: {
      name: "나기사",
      catchphrase: "아이가",
      clothing: "후우카 옷",
    },
    Viché: {
      name: "미사키",
      catchphrase: "이니라",
      clothing: "우츠호 옷",
    },
    Tulin: {
      name: "튤리",
      catchphrase: "바람을",
      clothing: "튤리 옷",
    },
    Mineru: {
      name: "미넬",
      catchphrase: "골렘",
      clothing: "미넬 옷",
    },
  };
