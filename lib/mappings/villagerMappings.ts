export const koKrSpeciesNames: Record<string, string> = {
  alligator: "악어",
  anteater: "개미핥기",
  bear: "곰",
  "bear cub": "아기곰",
  bird: "새",
  bull: "황소",
  cat: "고양이",
  chicken: "닭",
  cow: "소",
  cub: "아기곰",
  deer: "사슴",
  dog: "개",
  duck: "오리",
  eagle: "독수리",
  elephant: "코끼리",
  frog: "개구리",
  goat: "염소",
  gorilla: "고릴라",
  hamster: "햄스터",
  hippo: "하마",
  horse: "말",
  kangaroo: "캥거루",
  koala: "코알라",
  lion: "사자",
  monkey: "원숭이",
  mouse: "생쥐",
  octopus: "문어",
  ostrich: "타조",
  penguin: "펭귄",
  pig: "돼지",
  rabbit: "토끼",
  rhino: "코뿔소",
  rhinoceros: "코뿔소",
  sheep: "양",
  squirrel: "다람쥐",
  tiger: "호랑이",
  wolf: "늑대",
};

export const villagerStyleNames: Record<string, string> = {
  Active: "활동적",
  Cool: "쿨",
  Cute: "큐트",
  Elegant: "엘레강트",
  Gorgeous: "화려함",
  Simple: "심플",
};

export const villagerColorNames: Record<string, string> = {
  Aqua: "민트",
  Beige: "베이지",
  Black: "검정",
  Blue: "파랑",
  Brown: "갈색",
  Colorful: "컬러풀",
  Gray: "회색",
  Green: "초록",
  Orange: "주황",
  Pink: "분홍",
  Purple: "보라",
  Red: "빨강",
  White: "하양",
  Yellow: "노랑",
};

export const villagerPersonalityNames: Record<string, string> = {
  Cranky: "무뚝뚝",
  Jock: "운동광",
  Lazy: "먹보",
  Smug: "느끼함",
  Normal: "친절함",
  Peppy: "아이돌",
  Snooty: "성숙함",
  Sisterly: "단순활발",
  "Big Sister": "단순활발",
};

export const villagerBirthdayMonthNumbers: Record<string, string> = {
  January: "1",
  February: "2",
  March: "3",
  April: "4",
  May: "5",
  June: "6",
  July: "7",
  August: "8",
  September: "9",
  October: "10",
  November: "11",
  December: "12",
};

export const villagerSignNames: Record<string, string> = {
  Aries: "양자리",
  Taurus: "황소자리",
  Gemini: "쌍둥이자리",
  Cancer: "게자리",
  Leo: "사자자리",
  Virgo: "처녀자리",
  Libra: "천칭자리",
  Scorpio: "전갈자리",
  Sagittarius: "사수자리",
  Capricorn: "염소자리",
  Aquarius: "물병자리",
  Pisces: "물고기자리",
};

export const villagerGenderNames: Record<string, string> = {
  Male: "남",
  Female: "여",
  MALE: "남",
  FEMALE: "여",
};

export const getKoKrSpeciesName = (species: string) =>
  koKrSpeciesNames[species.toLowerCase()] ?? species;

export const formatVillagerPersonality = (personality: string) =>
  villagerPersonalityNames[personality] ?? personality;

export const formatVillagerBirthdayMonth = (month: string) =>
  villagerBirthdayMonthNumbers[month] ?? month;

export const formatVillagerSign = (sign: string) =>
  villagerSignNames[sign] ?? sign;

export const formatVillagerGender = (gender: string) =>
  villagerGenderNames[gender] ?? gender;

export const formatVillagerStyle = (style: string) =>
  villagerStyleNames[style] ?? style;

export const formatVillagerColor = (color: string) =>
  villagerColorNames[color] ?? color;
