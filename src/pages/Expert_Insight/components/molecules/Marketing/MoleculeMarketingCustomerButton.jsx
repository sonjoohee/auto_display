import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  MARKETING_BM_BUTTON_STATE,
  TITLE_OF_BUSINESS_INFORMATION,
  MARKETING_CUSTOMER_BUTTON_STATE,
} from "../../../../AtomStates";

import { useSaveConversation } from "../../atoms/AtomSaveConversation";

import { palette } from "../../../../../assets/styles/Palette";

const MoleculeMarketingCustomerButton = () => {
  const { saveConversation } = useSaveConversation();
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [marketingCustomerButtonState, setMarketingCustomerButtonState] = useAtom(MARKETING_CUSTOMER_BUTTON_STATE);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "marketingCustomerButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: 'user',
        message: '고객 알아보기',
      },
      {
        type: 'system',
        message: `고객 알아보는 중...`,
        expertIndex: 0,
      },
      {
        type: 'marketingCustomer',
      }
    );

    setConversation(updatedConversation);
    setMarketingCustomerButtonState(1);

    saveConversation({ changingConversation: { conversation: updatedConversation } });
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>고객 알아보기 🔎</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeMarketingCustomerButton;

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
