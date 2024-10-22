import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  EXPERT_BUTTON_STATE,
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_ID,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  ADDITION_BUTTON_STATE,
  isLoggedInAtom,
  STRATEGY_REPORT_DATA,
  INPUT_BUSINESS_INFO,
  CONVERSATION_STAGE,
  SELECTED_ADDITIONAL_KEYWORD,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITION_BUTTON_STATE,
  SELECTED_EXPERT_LIST,
  SELCTED_POC_TARGET,
  TARGET_REPORT_BUTTON_STATE,
  POC_DETAIL_REPORT_DATA,
  POC_PERSONA_LIST,
  IDEA_LIST_BUTTON_STATE,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  BUTTON_STATE,
} from "../../../AtomStates";

import {
  saveConversationToIndexedDB,
} from "../../../../utils/indexedDB";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeIdeaGenerateButton = () => {
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [pocDetailReportData, setpocDetailReportData] = useAtom(POC_DETAIL_REPORT_DATA);
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [selectedExpertList, setSelectedExpertList] = useAtom(SELECTED_EXPERT_LIST);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [strategyReportData, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA);

  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation,] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [additionalReportData, setAdditionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [selectedCustomerAdditionalKeyword, setSelectedCustomerAdditionalKeyword] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [ideaListButtonState, setIdeaListButtonState] = useAtom(IDEA_LIST_BUTTON_STATE);
  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "ideaGenerateButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: "다양한 관점의 아이디어들이 기대됩니다. ",
      },
      {
        type: "system",
        message: "주요 구매 요소와 고객 요구 사항을 기반으로 구조화된 아이디어 도출을 진행합니다.\n상세한 아이디어는 다운로드 받아 확인하시면 됩니다. Miro에는 선별된 25개의 아이디어가 있으니 팀원들과 우선순위 워크숍을 진행해보세요. 👍🏻",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'ideaList',
      },
    );
    setIdeaListButtonState(1);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);
    setButtonState({
      ...buttonState,
      IdeaGenerate: 1
    });

    await saveConversationToIndexedDB(
      {
        id: conversationId,
        inputBusinessInfo: inputBusinessInfo,
        analysisReportData: analysisReportData,
        strategyReportData: strategyReportData,
        conversation: updatedConversation,
        conversationStage: 3,
        selectedAdditionalKeywords: selectedAdditionalKeyword,
        selectedCustomerAdditionalKeyword:
        selectedCustomerAdditionalKeyword,
        additionalReportData: additionalReportData,
        customerAdditionalReportData: customerAdditionalReportData,
        timestamp: Date.now(),
        expert_index: selectedExpertIndex,
        pocPersonaList: pocPersonaList,
        selectedPocTarget: selectedPocTarget,
        pocDetailReportData : pocDetailReportData,
        ideaFeatureData : ideaFeatureData,
        ideaRequirementData : ideaRequirementData,
        buttonState : {
          ...buttonState,
          IdeaGenerate : 1
        }
      },
      isLoggedIn,
      conversationId
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>아이디어 생성하기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeIdeaGenerateButton;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-left:45px;
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
