import type { Fish } from "@/types/fishType";

export const englishMonthToNumber: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

export const fishLocationNames: Record<string, string> = {
  River: "강",
  Sea: "바다",
  Pier: "부두",
  Pond: "연못",
  "River (clifftop)": "절벽 위 강",
  "River (mouth)": "강 하구",
  "Sea (raining)": "비 오는 날 바다",
};

const fishShadowSizes: Record<string, number> = {
  Tiny: 1,
  Small: 2,
  Medium: 3,
  Large: 4,
  "Very large": 5,
  Huge: 6,
};

export function formatFishLocation(location: string) {
  return fishLocationNames[location] ?? location;
}

export function formatFishShadowSize(shadowSize: string) {
  return fishShadowSizes[shadowSize] ?? shadowSize;
}

export function formatFishMonths(months: string) {
  if (!months || months === "NA" || months === "All year") return "상시";

  return months
    .replace(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g, (month) => {
      return `${englishMonthToNumber[month]}월`;
    })
    .replace(/\s*(?:–|-|\?\?)\s*/g, "~")
    .replace(/(\d+)월~(\d+)월/g, "$1~$2월");
}

export function formatFishTime(time: string) {
  if (!time || time === "NA" || time === "All day") return "하루 종일";

  return time
    .replace(/\s*(?:–|-|\?\?)\s*/g, "~")
    .replace(/(\d+)\s*AM/g, "오전 $1시")
    .replace(/(\d+)\s*PM/g, "오후 $1시");
}

export function formatFishAvailability(fish: Fish) {
  const availability =
    fish.availability_north ?? fish.north?.availability_array;

  if (availability?.length) {
    return availability
      .map(
        ({ months, time }) =>
          `${formatFishMonths(months)} ${formatFishTime(time)}`,
      )
      .join(", ");
  }

  const months = formatFishMonths(
    fish.n_availability ?? fish.north?.months ?? "",
  );
  const timesByMonth = fish.times_by_month_north ?? fish.north?.times_by_month;
  const times = [
    ...new Set(
      Object.values(timesByMonth ?? {}).filter((time) => time && time !== "NA"),
    ),
  ];
  const time =
    times.length > 0
      ? times.map((availableTime) => formatFishTime(availableTime)).join(", ")
      : "하루 종일";

  return `${months} ${time}`;
}
