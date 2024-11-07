import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  MARKETING_START_BUTTON_STATE,
} from "../../../../AtomStates";

import { useSaveConversation } from "../../atoms/AtomSaveConversation";

import { palette } from "../../../../../assets/styles/Palette";

const MoleculeMarketingStartButton = () => {
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [marketingStartButtonState, setMarketingStartButtonState] = useAtom(MARKETING_START_BUTTON_STATE);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "marketingStartButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: 'user',
        message: '시장조사 시작하기',
      },
      {
        type: 'system',
        message: '시장조사가 진행 중 입니다... 🔍 잠시 후 시장조사 결과가 도착합니다.\n과연 내가 선택한 아이템의 가능성은 ?!',
        expertIndex: 0,
      },
      {
        type: 'marketingResearchReport',
      }
    );

    setConversation(updatedConversation);
    setMarketingStartButtonState(1);

    saveConversation({ changingConversation: { conversation: updatedConversation } });
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>시장조사 시작하기 🚀</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeMarketingStartButton;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 15px;
  margin-left: 50px;

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
