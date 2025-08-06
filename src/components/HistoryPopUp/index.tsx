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
  return (
    <Styled.Container>
      <Styled.PopUp>
        <h1>HISTORY</h1>
        <Styled.Spacer />

        {stats.sort(x => x.index).reverse().map((item, i) => (
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
