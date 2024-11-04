import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_STAGE,
  BM_LEAN_AUTO_REPORT_BUTTON_STATE,
  BM_BM_AUTO_REPORT_BUTTON_STATE,
  BM_OR_LEAN,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeBmSelectModelButton = () => {
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [bmLeanAutoButtonState, setBmLeanAutoButtonState] = useAtom(BM_LEAN_AUTO_REPORT_BUTTON_STATE);
  const [bmBmAutoButtonState, setBmBmAutoButtonState] = useAtom(BM_BM_AUTO_REPORT_BUTTON_STATE);
  const [bmOrLean, setBmOrLean] = useAtom(BM_OR_LEAN);


  const handleBMClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "bmSelectModelButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: 'user', 
        message: '비즈니스 모델 캔버스를 작성해주세요'
      },
      {
        type: 'bmBmAutoReport',
      }
    );
    setBmBmAutoButtonState(1);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);
    setBmOrLean("Bm");

    saveConversation(
      { changingConversation: 
        { conversation: updatedConversation, 
          bmOrLean : "Bm",
          conversationStage: 3,
        }
      }
    );
  };

  const handleLeanClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "bmSelectModelButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      { 
        type: 'user', 
        message: '린 캔버스를 작성해주세요'
      },
      {
        type: 'bmLeanAutoReport',
      }
    );
    setBmLeanAutoButtonState(1);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);
    setBmOrLean("Lean");

    saveConversation(
      { changingConversation: 
        { conversation: updatedConversation, 
          bmOrLean : "Lean",
          conversationStage: 3,
        }
      }
    );
  };

  return (
    
    <>
      <ButtonWrap>
        <button onClick={handleBMClick}>비즈니스 모델 캔버스 작성하기</button>
        <button onClick={handleLeanClick}>린 캔버스 작성하기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeBmSelectModelButton;

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

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
