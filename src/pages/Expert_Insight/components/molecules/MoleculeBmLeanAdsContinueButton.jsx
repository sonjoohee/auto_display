import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_STAGE,
  BUTTON_STATE,
  IS_LOADING_CASE_HASHTAG,
  BM_LEAN_ADS_REPORT_BUTTON_STATE,
} from "../../../AtomStates"; 

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeBmLeanAdsContinueButton = () => { 
  const { saveConversation } = useSaveConversation();
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isLoadingCaseHashTag, setIsLoadingCaseHashTag] = useAtom(IS_LOADING_CASE_HASHTAG);
  const [bmLeanAdsButtonState, setBmLeanAdsButtonState] = useAtom(BM_LEAN_ADS_REPORT_BUTTON_STATE);


  const handleClick = async (type) => {
    if (isLoading) return;

    setIsLoadingCaseHashTag(true);

    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "bmLeanAdsContinueButton"
    ) {
      updatedConversation.pop();
    }

    if(type === "more") {
        updatedConversation.push(
          {
            type: "system",
            message:
              "입력해주신 비즈니스 목표에 따른 캔버스의 정교화 방향성을 도출하였습니다.\n원하시는 방향을 선택하시고, 어떤 요소들이 변화되었는지 확인해보세요",
            expertIndex: selectedExpertIndex,
          },
          { type: `bmLeanAdsReport` }
        );
        setBmLeanAdsButtonState(1);
        setConversationStage(3);
        setConversation(updatedConversation);
        setApproachPath(3);

        saveConversation(
          { changingConversation: { conversation: updatedConversation, conversationStage: 3 } }
        );
    } else {
      updatedConversation.push(
        {
          type: "system",
          message:
            "리포트 내용을 보시고 추가로 궁금한 점이 있나요?\n아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊",
          expertIndex: selectedExpertIndex,
        },
        { type: `keyword` }
      );
      setButtonState({
        ...buttonState,
        bmEnough: 1,
      });
      setConversation(updatedConversation);

      saveConversation(
        { changingConversation: 
          { conversation: updatedConversation, 
            buttonState : {
              ...buttonState,
              bmEnough: 1,
            },
            conversationStage: 3,
          }
        }
      );
    }

    setConversationStage(3);
    setApproachPath(3);
    setIsLoadingCaseHashTag(false);
  };
  return (
    <>
      <ButtonWrap>
          <button onClick={() => handleClick("more")}>특정 문제(Problem)에 특화된 린 캔버스를 보고 싶습니다</button>
          <button onClick={() => handleClick("enough")}>이정도면 충분합니다</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeBmLeanAdsContinueButton;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 15px;
  margin-left:50px;

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

  button.none {
    cursor: default;
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
