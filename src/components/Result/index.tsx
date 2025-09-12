import React from "react";

import { Song } from "../../types/song";
import { GuessType } from "../../types/guess";
import { scoreToEmoji } from "../../helpers";

import { Button } from "../Button";
import { YouTube } from "../YouTube";

import * as Styled from "./index.styled";
import { startDate } from "../../constants";

interface Props {
  didGuess: boolean;
  currentTry: number;
  todaysSolution: Song;
  guesses: GuessType[];
}

export function Result({
  didGuess,
  todaysSolution,
  guesses,
  currentTry,
}: Props) {
  const now = new Date();

  const nextMidnightUTC = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0, 0, 0, 0
  ));

  const diffMs = nextMidnightUTC.getTime() - now.getTime();
  const totalMinutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const timeToNextTry = `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;

  const textForTry = ["Woooooo!", "Eeyup!", "All in favor of this truth!", "Good to me!"];

  if (didGuess) {
    const copyResult = React.useCallback(() => {
      const msInDay = 86400000;
      const todaysDate = new Date();
      const index = Math.floor((todaysDate.getTime() - startDate.getTime() )/msInDay) + 1

      const prefix = `KGLW Heardle - #${index} 🎧`;

      navigator.clipboard.writeText(
        prefix + ' ' + scoreToEmoji(guesses)
      );
    }, [guesses]);

    return (
      <>
        <Styled.ResultTitle>{textForTry[currentTry - 1]}</Styled.ResultTitle>
        <Styled.SongTitle>
          Today&apos;s song is {todaysSolution.artist} -{" "}
          {todaysSolution.name}
        </Styled.SongTitle>
        <Styled.Tries>
          You guessed it in {currentTry} {currentTry === 1 ? 'try' : 'tries'}
        </Styled.Tries>
        <YouTube id={todaysSolution.youtubeId} />
        <Button onClick={copyResult} variant="green">
          Copy results
        </Button>
        <Styled.TimeToNext>
          Remember to come back in {timeToNextTry}!
        </Styled.TimeToNext>
      </>
    );
  } else {
    return (
      <>
        <Styled.ResultTitle>Maybe it&apos;ll work next time...</Styled.ResultTitle>
        <Styled.SongTitle>
          Today&apos;s song is {todaysSolution.artist} -{" "}
          {todaysSolution.name}
        </Styled.SongTitle>
        <YouTube id={todaysSolution.youtubeId} />
        <Styled.TimeToNext>
          Try again in {timeToNextTry}
        </Styled.TimeToNext>
      </>
    );
  }
}
