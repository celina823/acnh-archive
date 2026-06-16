import type { SeaCreatureType } from "@/types/seaCreatureType";

const monthNames: Record<string, string> = {
  Jan: "1월",
  Feb: "2월",
  Mar: "3월",
  Apr: "4월",
  May: "5월",
  Jun: "6월",
  Jul: "7월",
  Aug: "8월",
  Sep: "9월",
  Oct: "10월",
  Nov: "11월",
  Dec: "12월",
};

const seaCreatureShadowSizes: Record<string, number> = {
  Tiny: 1,
  Small: 2,
  Medium: 3,
  Large: 4,
  "Very large": 5,
};

const seaCreatureShadowMovements: Record<string, string> = {
  Stationary: "움직이지 않음",
  "Very slow": "매우 느림",
  Slow: "느림",
  Medium: "보통",
  Fast: "빠름",
  "Very fast": "매우 빠름",
};

export function formatSeaCreatureShadowSize(shadowSize: string) {
  return seaCreatureShadowSizes[shadowSize] ?? shadowSize;
}

export function formatSeaCreatureShadowMovement(shadowMovement: string) {
  return seaCreatureShadowMovements[shadowMovement] ?? shadowMovement;
}

export function formatSeaCreatureMonths(months: string) {
  if (!months || months === "NA" || months === "All year") return "연중";

  return months
    .replace(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g, (month) => {
      return monthNames[month];
    })
    .replace(/\s*(?:â|–|-)\s*/g, "~");
}

export function formatSeaCreatureTime(time: string) {
  if (!time || time === "NA" || time === "All day") return "하루 종일";

  return time
    .replace(/\s*(?:–|-)\s*/g, "~")
    .replace(/(\d+)\s*AM/g, "오전 $1시")
    .replace(/(\d+)\s*PM/g, "오후 $1시");
}

export function formatSeaCreatureAvailability(seaCreature: SeaCreatureType) {
  const availability =
    seaCreature.availability_north ??
    seaCreature.north?.availability_array ??
    [];

  if (availability.length > 0) {
    return availability
      .map(
        ({ months, time }) =>
          `${formatSeaCreatureMonths(months)} ${formatSeaCreatureTime(time)}`,
      )
      .join(", ");
  }

  const months = formatSeaCreatureMonths(
    seaCreature.n_availability ?? seaCreature.north?.months ?? "",
  );
  const times = [
    ...new Set(
      Object.values(
        seaCreature.times_by_month_north ??
          seaCreature.north?.times_by_month ??
          {},
      ).filter((time) => time && time !== "NA"),
    ),
  ];
  const time =
    times.length > 0
      ? times
          .map((availableTime) => formatSeaCreatureTime(availableTime))
          .join(", ")
      : "하루 종일";

  return `${months} ${time}`;
}
