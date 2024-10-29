import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  EXPERT_BUTTON_STATE,
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_ID,
  INPUT_BUSINESS_INFO,
  STRATEGY_REPORT_DATA,
  SELECTED_EXPERT_INDEX,
  SELECTED_EXPERT_LIST,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  isLoggedInAtom,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  CONVERSATION_STAGE,
  BUTTON_STATE,
  IS_EDITING_NOW,
} from "../../../AtomStates";

import { palette } from "../../../../assets/styles/Palette";

import {
  saveConversationToIndexedDB,
} from "../../../../utils/indexedDB";

const MoleculeCheckReportRightAway = () => {
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [selectedExpertList, setSelectedExpertList] = useAtom(SELECTED_EXPERT_LIST);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [strategyReportData] = useAtom(STRATEGY_REPORT_DATA);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [selectedCustomerAdditionalKeyword, setSelectedCustomerAdditionalKeyword] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [expertButtonState, setExpertButtonState] =
    useAtom(EXPERT_BUTTON_STATE);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation,] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const handleClick = async () => {
    if (isLoading) return;

    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "reportButton"
    ) {
      updatedConversation.pop();
    }

    if (selectedExpertIndex === "1") {
      updatedConversation.push(
        {
          type: "user",
          message:
            "보고서를 확인하고 싶습니다. 분석 결과를 기반으로 멋진 전략 부탁드립니다. 🙌🏻",
        },
        {
          type: "system",
          message: `${titleOfBusinessInfo}를 성장 시킬 맞춤형 전략 보고서를 준비했습니다. 이 전략을 통해 성과를 극대화 할 수 있기를 바랍니다`,
          expertIndex: selectedExpertIndex,
        }
      );
    } else if (selectedExpertIndex === "2") {
      updatedConversation.push(
        {
          type: "user",
          message:
            "보고서를 확인하고 싶습니다. 어떤 마케팅 방법이 있을지 궁금해요. 🙌🏻",
        },
        {
          type: "system",
          message: `${titleOfBusinessInfo}의 마케팅 기회를 극대화 할 보고서를 준비했습니다. 이 전략을 통해 고객과의 연결을 강화할 수 있길 바래요`,
          expertIndex: selectedExpertIndex,
        }
      );
    } else if (selectedExpertIndex === "3") {
      updatedConversation.push(
        {
          type: "user",
          message:
            "보고서를 확인하고 싶습니다. 제가 보지 못한 고객 인사이트는 무엇이 있을까요. 🙌🏻",
        },
        {
          type: "system",
          message: `${titleOfBusinessInfo}의 고객의 요구와 니즈를 반영하여 전략을 제안드립니다. 이 보고서로 고객 이해도를 높여 더 효과적인 전략을 수립해 보세요`,
          expertIndex: selectedExpertIndex,
        }
      );
    }

    updatedConversation.push({ type: `strategy_${selectedExpertIndex}` });

    // 전문가 선택영역 표시 관련, 선택된 전문가 인덱스 추가
    setSelectedExpertList((prevList) => {
      if (prevList.includes(selectedExpertIndex)) {
        return prevList;
      }
      return [...prevList, selectedExpertIndex];
    });

    setIsEditingNow(false);
    setConversation(updatedConversation);
    setConversationStage(3);
    setExpertButtonState(1); // 버튼 클릭 시 EXPERT_BUTTON_STATE를 1로 설정
    setApproachPath(3);

    await saveConversationToIndexedDB(
      {
        id: conversationId,
        inputBusinessInfo: inputBusinessInfo,
        analysisReportData: analysisReportData,
        conversation: updatedConversation,
        conversationStage: 3,
        selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
        customerAdditionalReportData: customerAdditionalReportData,
        timestamp: Date.now(),
        expert_index: selectedExpertIndex,
        buttonState : buttonState,
      },
      isLoggedIn,
      conversationId
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>보고서 바로 확인하기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeCheckReportRightAway;

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
