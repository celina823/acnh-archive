export type FurnitureItemType = {
  url: string;
  name: string;

  category: string;
  item_series: string;
  item_set: string;

  hha_category: string;
  tag: string;
  hha_base: number;

  lucky: boolean;
  lucky_season: string;

  sell: number;

  variation_total: number;
  pattern_total: number;

  customizable: boolean;
  custom_kits: number;

  custom_kit_type: string;
  custom_body_part: string;
  custom_pattern_part: string;

  height: number | string;

  door_decor: boolean;

  version_added: string;

  unlocked: boolean;

  notes: string;

  grid_width: number;
  grid_length: number;

  themes: string[];

  functions: string[];

  availability: FurnitureAvailabilityType[];

  buy: FurnitureBuyType[];

  variations: FurnitureVariationType[];
};

export type FurnitureAvailabilityType = {
  from: string;
  note: string;
};

export type FurnitureBuyType = {
  price: number;
  currency: string;
};

export type FurnitureVariationType = {
  variation: string;
  pattern: string;

  image_url: string;

  colors: string[];
};
