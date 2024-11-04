import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_STAGE,
  IS_EDITING_NOW,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeGrowthHackerStartButton = () => {
  const { saveConversation } = useSaveConversation();
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "growthHackerStartButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: 'growthHackerOption',
      },
    );
    setIsEditingNow(false);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);

    await saveConversation(
      { changingConversation: { conversation: updatedConversation, conversationStage: 3 } }
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>퍼널 분석하기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeGrowthHackerStartButton;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-left:50px;
  padding-bottom: 15px;

  button {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: "Pretendard";
    font-size: 0.875rem;
    color: ${palette.darkGray};
    border: 0;
    background: none;
    margin-right: 10px;
  }

  > button {
    padding: 8px 16px;
    border-radius: 40px;
    border: 1px solid ${palette.lineGray};
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
