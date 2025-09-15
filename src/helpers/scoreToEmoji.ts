import { GuessType } from "../types/guess";
import { emojis } from "../constants";

export function scoreToEmoji(guesses: GuessType[]): string {
  const result = guesses
    .map((guess) =>
      guess.isCorrect === true ? emojis.correct
        : guess.skipped === true ? emojis.skip
        : guess.isCorrect === false ? emojis.incorrect
        : emojis.empty
    );

  for (let i = 0; i < 6 - guesses.length; i++) {
    result.push(emojis.empty);
  }

  return result.join('');
}