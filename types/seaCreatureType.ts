export interface TimesByMonthType {
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  "10": string;
  "11": string;
  "12": string;
}

export interface SeaCreatureAvailabilityType {
  availability_array: SeaCreatureAvailabilityItemType[];
  times_by_month: TimesByMonthType;
  months: string;
  months_array: number[];
}

export interface SeaCreatureAvailabilityItemType {
  months: string;
  time: string;
}

export interface SeaCreatureType {
  name: string;
  url: string;
  number: number | string;
  image_url: string;
  render_url: string;
  shadow_size: string;
  shadow_movement: string;
  rarity: string;
  total_catch: number | string;
  sell_nook: number | string;
  tank_width: number | string;
  tank_length: number | string;
  catchphrase?: string;
  catchphrase2?: string;
  catchphrases: string[];
  time?: string;
  n_availability?: string;
  s_availability?: string;
  availability_north?: SeaCreatureAvailabilityItemType[];
  availability_south?: SeaCreatureAvailabilityItemType[];
  times_by_month_north?: TimesByMonthType;
  times_by_month_south?: TimesByMonthType;
  n_availability_array?: string[];
  s_availability_array?: string[];
  north?: SeaCreatureAvailabilityType;
  south?: SeaCreatureAvailabilityType;

  translations?: {
    koKr?: string;
  };
}
