import React from "react";

import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosClock } from "react-icons/all";

import * as Styled from "./index.styled";

interface Props {
  openHistoryPopUp: () => void;
  openInfoPopUp: () => void;
}

export function Header({ openHistoryPopUp, openInfoPopUp }: Props) {
  return (
    <Styled.Container>
      <Styled.Content>
        <IoInformationCircleOutline
          onClick={openInfoPopUp}
          size={30}
          width={30}
          height={30}
        />

        <Styled.Logo>King Gizzard Heardle</Styled.Logo>

        <IoIosClock
          onClick={openHistoryPopUp}
          size={30}
          width={30}
          height={30}
          style={{ marginLeft: 'auto' }}
        />
      </Styled.Content>
    </Styled.Container>
  );
}
