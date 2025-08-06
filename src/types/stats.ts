import { Song } from "./song";
import { GuessType } from "./guess";

export type RunStatsType = {
  solution: Song;
  currentTry: number;
  didGuess: boolean;
  guesses: GuessType[];
  index: number;
};