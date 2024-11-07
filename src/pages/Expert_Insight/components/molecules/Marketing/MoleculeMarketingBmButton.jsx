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

const MoleculeMarketingBmButton = () => {
  const { saveConversation } = useSaveConversation();
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [marketingBmButtonState, setMarketingBmButtonState] = useAtom(MARKETING_BM_BUTTON_STATE);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "marketingBmButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: 'user',
        message: 'BM분석 시작하기',
      },
      {
        type: 'system',
        message: `BM 분석을 진행 중입니다! ${titleOfBusinessInfo}의 시장 성공 가능성을 구체화하는 중이에요.\n곧 나올 비즈니스 모델 전략, 과연 대박 전략일까요? 신박한 발견 일까요? 👀`,
        expertIndex: 0,
      },
      {
        type: 'marketingBmReport',
      }
    );

    setConversation(updatedConversation);
    setMarketingBmButtonState(1);

    saveConversation({ changingConversation: { conversation: updatedConversation } });
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>BM분석 시작하기 📈</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeMarketingBmButton;

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
