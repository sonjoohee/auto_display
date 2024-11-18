import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  MARKETING_BM_BUTTON_STATE,
  TITLE_OF_BUSINESS_INFORMATION,
} from "../../../../AtomStates";

import { useSaveConversation } from "../../atoms/AtomSaveConversation";

import { palette } from "../../../../../assets/styles/Palette";

const MoleculeMarketingStrategyButton = () => {
  const { saveConversation } = useSaveConversation();
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [marketingBmButtonState, setMarketingBmButtonState] = useAtom(
    MARKETING_BM_BUTTON_STATE
  );

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (
      updatedConversation.length > 0 &&
      updatedConversation[updatedConversation.length - 1].type ===
        "marketingStrategyReport"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: "시장 기회 탐색 시작하기",
      },
      {
        type: "system",
        message: `${titleOfBusinessInfo}에 대한 시장 현황과 기회 요소를 확인하고 있습니다.`,
        expertIndex: 0,
      },
      {
        type: "marketingStrategyReport",
      }
    );

    setConversation(updatedConversation);
    setMarketingBmButtonState(1);

    saveConversation({
      changingConversation: { conversation: updatedConversation },
    });
  };
  return (
    <>
      <SelectButton>
        <button onClick={handleClick}>BM분석 시작하기 📈</button>
      </SelectButton>
    </>
  );
};

export default MoleculeMarketingBmButton;

const SelectButton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  margin-left: 50px;

  button {
    // display:inline-block;
    // width:fit-content;
    font-family: "Pretendard", "Poppins";
    font-size: 0.88rem;
    color: ${palette.chatBlue};
    padding: 8px 20px;
    border-radius: 40px;
    border: 0;
    background: rgba(4, 83, 244, 0.1);
  }

  .finish {
    color: ${palette.gray500};
    background: ${palette.gray100};
  }
`;
