import { GuessType } from "../types/guess";
import { emojis } from "../constants";

export function scoreToEmoji(guesses: GuessType[]): string {
  return guesses
    .map((guess) =>
      guess.isCorrect === true ? emojis.correct
        : guess.skipped === true ? emojis.skip
        : guess.isCorrect === false ? emojis.incorrect
        : emojis.empty
    )
    .join('');
}