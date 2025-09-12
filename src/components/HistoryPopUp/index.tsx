import React from "react";
import { IoMusicalNoteOutline, IoHelpCircleOutline } from "react-icons/io5";
import { Button } from "..";

import * as Styled from "./index.styled";
import { RunStatsType } from "../../types/stats";
import { scoreToEmoji } from "../../helpers";

interface Props {
  stats: RunStatsType[];
  onClose: () => void;
}

function Title(item: RunStatsType){
  if (item.didGuess) {
    return <a
      href={"https://youtu.be/" + item.solution.youtubeId}
      target={"_blank"}
      rel={"noopener noreferrer"}
      style={{ textDecoration: "none", color: "white" }}
    >
      {item.solution.name} by {item.solution.artist}
    </a>
  }

  return <>???</>;
}

export function HistoryPopUp({ stats, onClose }: Props) {
  const displayStats = Object.values(stats.reduce<Record<number, RunStatsType>>(
    (acc, item) => {
      if (!acc[item.index]) {
        acc[item.index] = item;
        return acc;
      }

      if (acc[item.index].didGuess) return acc;

      const existingItemGuesses = acc[item.index].guesses.filter(g => g.song !== undefined).length;
      const currentItemGuesses = item.guesses.filter(g => g.song !== undefined).length;

      if (currentItemGuesses > existingItemGuesses)
        acc[item.index] = item;

      return acc;
    },
    {}
  )).sort((a, b) => b.index - a.index);

  return (
    <Styled.Container>
      <Styled.PopUp>
        <h1>HISTORY</h1>
        <Styled.Spacer />

        {displayStats.map((item, i) => (
            <section key={i}>
              <h3 style={{ textAlign: "center" }}>
                #{item.index + 1}: {Title(item)}
              </h3>

              <Styled.Section style={{ justifyContent: "space-around" }}>
                {scoreToEmoji(item.guesses)}
              </Styled.Section>

              <Styled.Spacer />
            </section>
        ))}

        <Button variant="gray" style={{ marginTop: 20, color: "black" }} onClick={onClose}>
          Close
        </Button>
      </Styled.PopUp>
    </Styled.Container>
  );
}
