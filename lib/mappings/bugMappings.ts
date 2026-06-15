import type { BugType } from "@/types/bugType";

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

const locationNames: Record<string, string> = {
  Flying: "공중",
  "Flying near water": "물가 주변 공중",
  "Flying near trash": "쓰레기 주변 공중",
  "Flying near flowers": "꽃 주변 공중",
  "Flying near trash or rotten turnips": "쓰레기 또는 썩은 무 주변 공중",
  "Flying near light sources": "불빛 주변 공중",
  "Flying near blue, purple, and black flowers": "파랑·보라·검정 꽃 주변 공중",
  "On flowers": "꽃 위",
  "On white flowers": "흰 꽃 위",
  "On trees": "나무 위",
  "On trees (any kind)": "모든 나무 위",
  "On trees (hardwood and cedar)": "활엽수·침엽수 위",
  "On tree stumps": "그루터기 위",
  "On palm trees": "야자수 위",
  "On the ground": "땅 위",
  "On rocks and bushes": "바위·관목 위",
  "On beach rocks": "해변 바위 위",
  "Shaking trees (hardwood and cedar)": "활엽수·침엽수 흔들기",
  "Shaking trees": "나무 흔들기",
  "Shaking non-fruit hardwood trees or cedar trees":
    "과일 없는 활엽수·침엽수 흔들기",
  Underground: "땅속",
  "Under trees": "나무 아래",
  "Under rocks": "바위 아래",
  "On rocks": "바위 위",
  "On ponds and rivers": "연못·강 위",
  "On rivers and ponds": "강·연못 위",
  "On rotten food": "썩은 음식 위",
  "On/near spoiled turnips/candy/lollipops": "썩은 무·사탕 주변",
  "On villagers": "주민에게 붙음",
  "From hitting rocks": "바위 치기",
  "Pushing snowballs": "눈덩이 주변",
  "Disguised on shoreline": "해변에 소라로 위장",
  "Disguised under trees": "나무 아래 나뭇잎으로 위장",
};

const weatherNames: Record<string, string> = {
  "Any weather": "모든 날씨",
  "Any except rain": "비를 제외한 모든 날씨",
  "Rain only": "비 오는 날",
  Rain: "비 오는 날",
  Clear: "맑은 날",
  "Clear weather": "맑은 날",
};

export const formatBugLocation = (location: string) =>
  locationNames[location] ?? location;

export const formatBugWeather = (weather: string) =>
  (weatherNames[weather] ?? weather) || "날씨 정보 없음";

function formatMonths(months: string) {
  if (!months || months === "NA" || months === "All year") return "연중";
  return months.replace(
    /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g,
    (month) => monthNames[month],
  );
}

function formatTime(time: string) {
  return !time || time === "NA" || time === "All day" ? "하루 종일" : time;
}

export function formatBugAvailability(bug: BugType) {
  const availability = bug.availability_north ?? [];

  if (availability.length > 0) {
    return availability
      .map(({ months, time }) => `${formatMonths(months)} ${formatTime(time)}`)
      .join(", ");
  }

  const timesByMonth = bug.times_by_month_north ?? {};
  const times = [...new Set(Object.values(timesByMonth))].filter(
    (time): time is string => Boolean(time && time !== "NA"),
  );
  const months = bug.n_availability ?? "";

  if (!months && times.length === 0) return "출현 정보 없음";

  return `${formatMonths(months)} ${
    times.length > 0 ? times.map(formatTime).join(", ") : "하루 종일"
  }`;
}
