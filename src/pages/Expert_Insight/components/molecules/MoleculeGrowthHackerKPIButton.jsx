import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_STAGE,
  GROWTH_HACKER_KPI_BUTTON_STATE,
  BUTTON_STATE,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeGrowthHackerKPIButton = () => {
  const { saveConversation } = useSaveConversation();
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [growthHackerKPIButtonState, setGrowthHackerKPIButtonState] = useAtom(GROWTH_HACKER_KPI_BUTTON_STATE);
  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "growthHackerKPIButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message:
          "현재 제 아이템에 맞는 최적의 KPI를 추천해 주시면 좋겠습니다",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'growthHackerKPI',
      },
    );

    setGrowthHackerKPIButtonState(1);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);
    setButtonState({
      ...buttonState,
      growthHackerKPI : 1,
    });

    await saveConversation(
      { changingConversation: { 
          conversation: updatedConversation, 
          conversationStage: 3,
          buttonState : {
            ...buttonState,
            growthHackerKPI : 1,
          },
        }
      }
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>최적의 KPI 전략 제안 받기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeGrowthHackerKPIButton;

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
    font-family: 'Pretendard', 'Poppins';
    font-size: 0.875rem;
    color: ${palette.darkGray};
    border: 0;
    background: none;
    margin-right: 10px;
  }

  > button {
    padding: 8px 16px;
    border-radius: 40px;
    border: 1px solid ${palette.buttonLineGray};
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
