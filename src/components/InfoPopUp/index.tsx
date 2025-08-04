import React from "react";
import { IoMusicalNoteOutline, IoHelpCircleOutline } from "react-icons/io5";
import { Button } from "..";

import * as Styled from "./index.styled";

interface Props {
  onClose: () => void;
}

export function InfoPopUp({ onClose }: Props) {
  return (
    <Styled.Container>
      <Styled.PopUp>
        <h1>HOW TO PLAY</h1>
        <Styled.Spacer />
        <Styled.Section>
          {/* <IoMusicalNoteOutline size={50} /> */}
          <p>
            Listen to the intro, then find the correct King Gizzard song in the list.
          </p>
        </Styled.Section>
        <Styled.Section>
          {/* <IoHelpCircleOutline size={50} /> */}
          <p>Skipped or incorrect attempts unlock more of the intro</p>
        </Styled.Section>
        <Styled.Section>
          <p>Answer in as few tries as possible and share your score!</p>
        </Styled.Section>
        <Styled.Section>
          <p>Contains most songs up to Flight b741.</p>
        </Styled.Section>
        <Styled.Section>
          <p>Report issues to u/TimelandIsWacky. Template by <a href="https://github.com/sarvarghese/youtube-heardle-template" target="_blank" rel="noreferrer">sarvarghese.</a></p>
        </Styled.Section>
        <Styled.Section>
          <p>Songs owned by KGLW. Support the band at pdoomrecords.com.</p>
        </Styled.Section>
        <Button variant="green" style={{ marginTop: 20 }} onClick={onClose}>
          Play
        </Button>
      </Styled.PopUp>
    </Styled.Container>
  );
}
