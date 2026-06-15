type MonthNumberString =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

type TimesByMonth = Record<MonthNumberString, string>;

type Availability = {
  months: string;
  time: string;
};

export type BugType = {
  name: string;
  url: string;
  number: number | string;

  image_url: string;
  render_url: string;

  catchphrase: string;
  catchphrase2: string;
  catchphrases: string[];

  location: string;
  weather: string;
  rarity: string;

  total_catch: string;
  sell_nook: string;
  sell_flick: string;

  tank_width: string;
  tank_length: string;

  time: string;

  n_availability: string;
  s_availability: string;

  availability_north: Availability[];
  availability_south: Availability[];

  times_by_month_north: TimesByMonth;
  times_by_month_south: TimesByMonth;

  n_availability_array: string[];
  s_availability_array: string[];

  translations?: {
    koKr?: string;
  };
};
