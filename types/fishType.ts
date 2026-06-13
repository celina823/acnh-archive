export interface FishAvailability {
  months: string;
  time: string;
}

export interface FishAvailabilityInfo {
  availability_array: FishAvailability[];
  times_by_month: Record<string, string>;
  months: string;
  months_array: number[];
}

export interface Fish {
  name: string;
  url: string;
  number: number | string;

  image_url: string;
  render_url: string;

  location: string;
  shadow_size: string;
  rarity: string;

  total_catch: number | string;

  sell_nook: number | string;
  sell_cj: number | string;

  tank_width: number | string;
  tank_length: number | string;

  time?: string;
  n_availability?: string;
  s_availability?: string;

  catchphrases: string[];

  availability_north?: FishAvailability[];
  availability_south?: FishAvailability[];
  times_by_month_north?: Record<string, string>;
  times_by_month_south?: Record<string, string>;
  n_availability_array?: string[];
  s_availability_array?: string[];

  north?: FishAvailabilityInfo;
  south?: FishAvailabilityInfo;

  translations?: {
    koKr?: string;
  };
}
