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
  POC_DETAIL_REPORT_ATOM,
  POC_PERSONA_LIST
} from "../../../AtomStates";

import {
  saveConversationToIndexedDB,
} from "../../../../utils/indexedDB";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeIdeaPriorityButton = () => {
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [pocDetailReportData, setpocDetailReportData] = useAtom(POC_DETAIL_REPORT_ATOM);
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
  const [targetReportButtonState, setTargetReportButtonState] = useAtom(TARGET_REPORT_BUTTON_STATE);

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "startIdeaButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: "체계적인 방법으로 많은 아이디어 발상 부탁드립니다.",
      },
      {
        type: "system",
        message: "구조화된 아이디어 발상을 위해, 먼저 아이템의 기능 및 특성을 살펴보겠습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'ideaFeature',
      },
      {
        type: "system",
        message: "주요 기능 및 특성을 확인하셨다면, 고객의 요구사항을 확인해보겠습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'ideaCustomerButton',
      },
      {
        type: "user",
        message: "고객 니즈를 도출해주세요",
      },
      {
        type: "system",
        message: "해당 아이템과 관련된 고객 요구 사항을 살펴보았습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'ideaCustomer',
      },
      {
        type: "system",
        message: "고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을 기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'ideaGenerateButton',
      },
      {
        type: "user",
        message: "다양한 관점의 아이디어들이 기대됩니다. ",
      },
      {
        type: "system",
        message: "주요 구매 요소와 고객 요구 사항을 기반으로, (도출된 아이디어 수 : 100개)의 사업 아이디어를 도출했습니다.\n주요 아이디어를 먼저 살펴보고, 상세한 아이디어 목록은 파일을 다운로드하거나 Miro와 연계하여  확인해보세요 📝",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'ideaList',
      },
      {
        type: "system",
        message: "이렇게 많은 아이디어 중 어떤 것을 먼저 진행할지 고민되시죠?\n우선순위를 확인해드릴게요. 아래 3가지 방법 중 하나를 선택해주세요 ",
        expertIndex: selectedExpertIndex,
      },
      {
        type: 'ideaPriorityButton',
      },
      {
        type: 'ideaPriority',
      },
    );
    // setConversation(updatedConversation);
    // setConversationStage(3);
    // setApproachPath(3);

    // await saveConversationToIndexedDB(
    //   {
    //     id: conversationId,
    //     inputBusinessInfo: inputBusinessInfo,
    //     analysisReportData: analysisReportData,
    //     strategyReportData: strategyReportData,
    //     conversation: updatedConversation,
    //     conversationStage: 3,
    //     selectedAdditionalKeywords: selectedAdditionalKeyword,
    //     selectedCustomerAdditionalKeyword:
    //     selectedCustomerAdditionalKeyword,
    //     additionalReportData: additionalReportData,
    //     customerAdditionalReportData: customerAdditionalReportData,
    //     timestamp: Date.now(),
    //     expert_index: selectedExpertIndex,
    //     pocPersonaList: pocPersonaList,
    //     selectedPocTarget: selectedPocTarget,
    //     pocDetailReportData : pocDetailReportData,
    //   },
    //   isLoggedIn,
    //   conversationId
    // );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>페르소나별 우선순위 선정하기</button>
        <button onClick={handleClick}>데이터 기반 우선순위 선정하기 (준비중)</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeIdeaPriorityButton;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
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
