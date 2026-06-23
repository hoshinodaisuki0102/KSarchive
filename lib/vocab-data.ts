import { vocabDay16 } from "./vocab-days/vocab-day-16";
import { vocabDay17 } from "./vocab-days/vocab-day-17";
import { vocabDay18 } from "./vocab-days/vocab-day-18";
import { vocabDay19 } from "./vocab-days/vocab-day-19";
import { vocabDay20 } from "./vocab-days/vocab-day-20";
import { vocabDay21 } from "./vocab-days/vocab-day-21";
import { vocabDay22 } from "./vocab-days/vocab-day-22";
import { vocabDay23 } from "./vocab-days/vocab-day-23";
import { vocabDay24 } from "./vocab-days/vocab-day-24";
import { vocabDay25 } from "./vocab-days/vocab-day-25";

export type VocabItem = {
  id: number;
  day: number;
  no: number;
  word: string;
  meaning: string;
};

type VocabRow = readonly [number, string, string];

type VocabDayGroup = {
  day: number;
  rows: readonly VocabRow[];
};

const dayGroups: VocabDayGroup[] = [
  { day: 16, rows: vocabDay16 },
  { day: 17, rows: vocabDay17 },
  { day: 18, rows: vocabDay18 },
  { day: 19, rows: vocabDay19 },
  { day: 20, rows: vocabDay20 },
  { day: 21, rows: vocabDay21 },
  { day: 22, rows: vocabDay22 },
  { day: 23, rows: vocabDay23 },
  { day: 24, rows: vocabDay24 },
  { day: 25, rows: vocabDay25 }
];

export const vocabItems: VocabItem[] = dayGroups.flatMap(({ day, rows }) =>
  rows.map(([no, word, meaning]) => ({
    id: day * 1000 + no,
    day,
    no,
    word,
    meaning
  }))
);

export const vocabDays = dayGroups.map((group) => group.day);
export const vocabTotalCount = vocabItems.length;
