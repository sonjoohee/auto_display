import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_STAGE,
  IS_EDITING_NOW,
  SELECTED_EXPERT_INDEX,
  STRATEGY_BUTTON_STATE,
  TITLE_OF_BUSINESS_INFORMATION,
  STRATEGY_CONSULTANT_REPORT_DATA,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeStrategyButton = () => {
  const { saveConversation } = useSaveConversation();
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [strategyButtonState, setStrategyButtonState] = useAtom(
    STRATEGY_BUTTON_STATE
  );
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [strategyConsultantReportData] = useAtom(STRATEGY_CONSULTANT_REPORT_DATA);

  let button_message, user_message, system_message;

  const button_message_3 = "시장 내 경쟁우위 확인하기 🔎";
  const button_message_2 = "고객 분석 및 가치 전략 확인하기 📈";
  const button_message_1 = "시장 기회 탐색 시작하기 🛠";

  const user_message_3 = "시장 내 경쟁우위 확인하기";
  const user_message_2 = "고객 분석 및 가치 전략 확인하기";
  const user_message_1 = "시장 기회 탐색 시작하기";

  const system_message_3 =
    "경쟁 우위 방법을 분석 중입니다.\n보고서를 통해 우리 비즈니스가 시장에서 차별화 할 수 있는 강점을 발견하길 바래요 !";
  const system_message_2 =
    "고객 분석과 가치 제안을 분석하고 있습니다. 잠시만 기다려 주세요...";
  const system_message_1 = `${titleOfBusinessInfo}에 대한 시장 현황과 기회 요소를 확인하고 있습니다.`;

  if (strategyButtonState === 0) {
    button_message = button_message_1;
    user_message = user_message_1;
    system_message = system_message_1;
  } else if (strategyButtonState === 1) {
    button_message = button_message_2;
    user_message = user_message_2;
    system_message = system_message_2;
  } else if (strategyButtonState === 2) {
    button_message = button_message_3;
    user_message = user_message_3;
    system_message = system_message_3;
  }

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (
      updatedConversation.length > 0 &&
      updatedConversation[updatedConversation.length - 1].type ===
        "strategyButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: user_message,
      },
      {
        type: "system",
        message: system_message,
        expertIndex: selectedExpertIndex,
      },
      {
        type: "strategyConsultant",
      }
    );

    setIsEditingNow(false);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);

    await saveConversation({
      changingConversation: {
        conversation: updatedConversation,
        conversationStage: 3,
      },
    });
  };
  return (
    <>
      <SelectButton>
        <button onClick={handleClick}>{button_message}</button>
      </SelectButton>
    </>
  );
};

export default MoleculeStrategyButton;

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
    color: ${palette.primary};
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
