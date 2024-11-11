import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  MARKETING_BM_BUTTON_STATE,
  TITLE_OF_BUSINESS_INFORMATION,
  MARKETING_CUSTOMER_BUTTON_STATE,
  MARKETING_SELECTED_CUSTOMER,
  MARKETING_FINAL_CUSTOMER,
  MARKETING_FINAL_REPORT_BUTTON_STATE,
} from "../../../../AtomStates";

import { useSaveConversation } from "../../atoms/AtomSaveConversation";

import { palette } from "../../../../../assets/styles/Palette";

const MoleculeMarketingCustomerButton = () => {
  const { saveConversation } = useSaveConversation();
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [marketingCustomerButtonState, setMarketingCustomerButtonState] = useAtom(MARKETING_CUSTOMER_BUTTON_STATE);
  const [marketingSelectedCustomer, setMarketingSelectedCustomer] = useAtom(MARKETING_SELECTED_CUSTOMER);
  const [marketingFinalCustomer, setMarketingFinalCustomer] = useAtom(MARKETING_FINAL_CUSTOMER);
  const [marketingFinalReportButtonState, setMarketingFinalReportButtonState] = useAtom(MARKETING_FINAL_REPORT_BUTTON_STATE);

  const handleClick = async (type, index) => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "marketingCustomerButton"
    ) {
      updatedConversation.pop();
    }

    if (type === 1) {
      updatedConversation.push(
        {
          type: 'user',
          message: '고객 분석으로 잠재력 발견하기',
        },
        {
          type: 'system',
          message: `이 아이템에 매력을 느낄 주요 고객은 누구일까요?\n가장 적합하다고 생각하는 타겟을 골라주세요`,
          expertIndex: 0,
        },
        {
          type: 'marketingCustomer',
        }
      );
      setMarketingCustomerButtonState(1);
    } 
    
    else if (type === 2) {
      updatedConversation.push(
        {
          type: 'user',
          message: '다른 고객도 알아보기',
        },
        {
          type: 'system',
          message: `다른 고객들은 어떤 특징을 갖고 있는지 확인이 필요하죠 !\n어떤 고객이 아이템에 관심을 갖을까요? `,
          expertIndex: 0,
        },
        {
          type: 'marketingCustomer',
        }
      );
    } 
    
    else {
      updatedConversation.push(
        {
          type: 'user',
          message: '고객 분석으로 잠재력 발견하기',
        },
        {
          type: 'system',
          message: `이제 ${marketingSelectedCustomer[index].content.name}을 타겟 고객으로 한 ${titleOfBusinessInfo}의 잠재력을 확인해 볼 시간입니다.\n과연 대박 가능성을 품고 있을까요? 👀`,
          expertIndex: 0,
        },
        {
          type: 'marketingFinalReport',
        }
      );
      setMarketingFinalCustomer(marketingSelectedCustomer[index]);
      setMarketingFinalReportButtonState(1);
      saveConversation({ changingConversation: { marketingFinalCustomer: marketingSelectedCustomer[index] } });
    }

    setConversation(updatedConversation);

    saveConversation({ changingConversation: { conversation: updatedConversation } });
  };
  return (
    <>
      <ButtonWrap>
        {marketingSelectedCustomer.length === 0 ?
          <button onClick={() => handleClick(1)}>고객 분석으로 잠재력 발견하기 🔎</button>
        :
          marketingSelectedCustomer.length === 1 || marketingSelectedCustomer.length === 2 ?
            <>
              <button onClick={() => handleClick(2)}>다른 고객도 알아보기 🔎 </button>
              <button onClick={() => handleClick(3, marketingSelectedCustomer.length-1)}>{marketingSelectedCustomer[marketingSelectedCustomer.length-1].content.name}로 잠재력 지수 알아보기 ⭐</button>
            </>
          :
            <>
              <button onClick={() => handleClick(3, 0)}>{marketingSelectedCustomer[0].content.name}</button>
              <button onClick={() => handleClick(3, 1)}>{marketingSelectedCustomer[1].content.name}</button>
              <button onClick={() => handleClick(3, 2)}>{marketingSelectedCustomer[2].content.name}</button>
            </>
        }
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
