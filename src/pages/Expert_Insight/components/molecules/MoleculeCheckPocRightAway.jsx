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
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_LIST,
  IDEA_GROUP,
  IDEA_PRIORITY,
  IDEA_MIRO,
  GROWTH_HACKER_REPORT_DATA,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  KPI_QUESTION_LIST,
  BUTTON_STATE,
  PRICE_SCRAP_DATA,
  PRICE_REPORT_DATA,
  PRICE_PRODUCT,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  PRICE_PRODUCT_SEGMENTATION,
} from "../../../AtomStates";

import {
  saveConversationToIndexedDB,
} from "../../../../utils/indexedDB";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeCheckPocRightAway = () => {
  const [priceScrapData, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [priceReportData, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [priceSelectedProductSegmentation, setPriceSelectedProductSegmentation] = useAtom(PRICE_SELECTED_PRODUCT_SEGMENTATION);
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(PRICE_PRODUCT_SEGMENTATION);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [ideaMiro, setIdeaMiro] = useAtom(IDEA_MIRO);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] = useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);
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

  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
      updatedConversation[updatedConversation.length - 1].type === "pocPlanButton"
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "system",
        message: "아래 항목에서 적합한 내용을 선택해주시면, 보다 구체적인 PoC 계획을 세울 수 있을 것 같습니다",
        expertIndex: selectedExpertIndex,
      },
      {
        type: `pocOption`,
      }
    );
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);

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
        selectedPocTarget: selectedPocTarget,
        ideaFeatureData : ideaFeatureData,
        ideaRequirementData : ideaRequirementData,
        ideaList : ideaList,
        ideaGroup : ideaGroup,
        ideaPriority : ideaPriority,
        growthHackerReportData : growthHackerReportData,
        growthHackerDetailReportData : growthHackerDetailReportData,
        KpiQuestionList : KpiQuestionList,
        buttonState : buttonState,
        priceScrapData : priceScrapData,
        priceReportData : priceReportData,
        priceProduct : priceProduct,
        priceSelectedProductSegmentation : priceSelectedProductSegmentation,
        priceProductSegmentation : priceProductSegmentation,
      },
      isLoggedIn,
      conversationId
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>PoC 계획 세우기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeCheckPocRightAway;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
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
    border: 1px solid ${palette.lineGray};
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
