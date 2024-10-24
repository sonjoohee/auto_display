import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_ID,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  isLoggedInAtom,
  STRATEGY_REPORT_DATA,
  INPUT_BUSINESS_INFO,
  CONVERSATION_STAGE,
  SELECTED_ADDITIONAL_KEYWORD,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_LIST,
  SELCTED_POC_TARGET,
  POC_DETAIL_REPORT_DATA,
  POC_PERSONA_LIST,
  BUTTON_STATE,
  GROWTH_HACKER_REPORT_DATA,
  KPI_QUESTION_LIST,
  IDEA_MIRO,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_LIST,
  IDEA_GROUP,
  PRICE_CONTINUE_BUTTON_STATE,
  PRICE_REPORT_DATA,
  PRICE_SCRAP_DATA,
  PRICE_PRODUCT,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  PRICE_PRODUCT_SEGMENTATION,
  CASE_HASH_TAG,
  CASE_REPORT_DATA,
} from "../../../AtomStates";

import {
  saveConversationToIndexedDB,
} from "../../../../utils/indexedDB";

import axios from "axios";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeCaseContinueButton = () => {
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(PRICE_PRODUCT_SEGMENTATION);
  const [priceSelectedProductSegmentation, setPriceSelectedProductSegmentation] = useAtom(PRICE_SELECTED_PRODUCT_SEGMENTATION);
  const [ideaMiro, setIdeaMiro] = useAtom(IDEA_MIRO);
  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
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
  const [priceContinueButtonState, setPriceContinueButtonState] = useAtom(PRICE_CONTINUE_BUTTON_STATE);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [priceReportData, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [priceScrapData, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const handleClick = async (type) => {
    if (isLoading) return;

    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "caseContinueButton"
    ) {
      updatedConversation.pop();
    }

    if(type === "more") {
      updatedConversation.push(
        {
          type: "user",
          message:
            `"${titleOfBusinessInfo}"의 어떤 사례를 찾아드릴까요?\n아래 채팅창에 원하시는 내용을 입력해주세요.`,
          expertIndex: selectedExpertIndex,
        },
      );
  
      setConversation(updatedConversation);
      setConversationStage(3);
      setApproachPath(3);
      setButtonState({
        ...buttonState,
        caseStart : 1,
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
          ideaList : ideaList,
          ideaGroup : ideaGroup,
          buttonState : {
            ...buttonState,
            caseStart : 1,
          },
          ideaMiro : ideaMiro,
          growthHackerReportData : growthHackerReportData,
          KpiQuestionList : KpiQuestionList,
          priceScrapData : priceScrapData,
          priceReportData : priceReportData,
          priceProduct : priceProduct,
          priceSelectedProductSegmentation : priceSelectedProductSegmentation,
          priceProductSegmentation : priceProductSegmentation,
          caseHashTag : caseHashTag,
          caseReportData : caseReportData,
        },
        isLoggedIn,
        conversationId
      );
  
      const data = {
        expert_id: "8",
        business_info: titleOfBusinessInfo,
        business_analysis_data: {
          명칭: titleOfBusinessInfo,
          주요_목적_및_특징: mainFeaturesOfBusinessInformation,
          주요기능: mainCharacteristicOfBusinessInformation,
          목표고객: businessInformationTargetCustomer,
        }
      };
  
      let response = axios.post(
        "https://wishresearch.kr/panels/case_recommand_list",
        data,
        axiosConfig
      );
  
      let retryCount = 0;
      const maxRetries = 10;
  
      while (retryCount < maxRetries && (
        !response || 
        !response.data || 
        typeof response.data !== "object" ||
        !response.data.hasOwnProperty("case_recommand_list") || 
        !Array.isArray(response.data.case_recommand_list) ||
        response.data.case_recommand_list.some(item => 
          !item.hasOwnProperty("title") || 
          !item.hasOwnProperty("text")
        )
      )) 
      {
        response = await axios.post(
          "https://wishresearch.kr/panels/case_recommand_list",
          data,
          axiosConfig
        );
        retryCount++;
      }
      if (retryCount === maxRetries) {
        console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
        // 에러 처리 로직 추가
        throw new Error("Maximum retry attempts reached. Empty response persists.");
      }
  
      const caseRecommandList = response.data.case_recommand_list;
      setCaseHashTag(caseRecommandList);
  
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
          ideaList : ideaList,
          ideaGroup : ideaGroup,
          buttonState : {
            ...buttonState,
            caseStart : 1,
          },
          ideaMiro : ideaMiro,
          growthHackerReportData : growthHackerReportData,
          KpiQuestionList : KpiQuestionList,
          priceScrapData : priceScrapData,
          priceReportData : priceReportData,
          priceProduct : priceProduct,
          priceSelectedProductSegmentation : priceSelectedProductSegmentation,
          priceProductSegmentation : priceProductSegmentation,
          caseHashTag : caseRecommandList,
          caseReportData : caseReportData,
        },
        isLoggedIn,
        conversationId
      );
    } else {
      updatedConversation.push(
        {
          type: "system",
          message:
            "리포트 내용을 보시고 추가로 궁금한 점이 있나요? 아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊",
          expertIndex: selectedExpertIndex,
        },
        { type: `keyword` }
      );
      setButtonState({
        ...buttonState,
        caseEnough: 1,
      });
      setConversation(updatedConversation);

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
          ideaList : ideaList,
          ideaGroup : ideaGroup,
          buttonState : {
            ...buttonState,
            caseEnough: 1,
          },
          ideaMiro : ideaMiro,
          growthHackerReportData : growthHackerReportData,
          KpiQuestionList : KpiQuestionList,
          priceScrapData : priceScrapData,
          priceReportData : priceReportData,
          priceProduct : priceProduct,
          priceSelectedProductSegmentation : priceSelectedProductSegmentation,
          priceProductSegmentation : priceProductSegmentation,
        },
        isLoggedIn,
        conversationId
      );
    }

    setConversationStage(3);
    setApproachPath(3);
  };
  return (
    <>
      <ButtonWrap>
          <button onClick={() => handleClick("more")}>추가 사례를 조사하겠습니다</button>
          <button onClick={() => handleClick("enough")}>이정도면 충분합니다</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeCaseContinueButton;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 15px;
  margin-left:45px;

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
