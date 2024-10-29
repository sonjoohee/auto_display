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
  PRICE_START_BUTTON_STATE,
  PRICE_PRODUCT,
  CASE_HASH_TAG,
  CASE_REPORT_DATA,
  SURVEY_GUIDELINE_REPORT_DATA,
  SURVEY_GUIDELINE_DETAIL_REPORT_DATA,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_GOAL_FIXED,
  SURVEY_QUESTION_LIST,
  BM_OR_LEAN,
  BM_BM_AUTO_REPORT_DATA,
  BM_LEAN_AUTO_REPORT_DATA,
  BM_BM_ADS_REPORT_DATA,
  BM_SELECTED_PROBLEM_OPTIONS,
  BM_LEAN_ADS_REPORT_DATA,
  BM_BM_CUSTOM_REPORT_DATA,
  BM_LEAN_CUSTOM_REPORT_DATA,
  BM_MODEL_SUGGESTION_REPORT_DATA,
  BM_QUESTION_LIST,
  IS_EDITING_NOW,
} from "../../../AtomStates";

import {
  saveConversationToIndexedDB,
} from "../../../../utils/indexedDB";

import { palette } from "../../../../assets/styles/Palette";

const MoleculePriceStartButton = () => {
  const [bmModelSuggestionReportData, setBmModelSuggestionReportData] = useAtom(BM_MODEL_SUGGESTION_REPORT_DATA);
  const [bmQuestionList, setBmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [bmOrLean, setBmOrLean] = useAtom(BM_OR_LEAN);
  const [bmBmAutoReportData, setBmBmAutoReportData] = useAtom(BM_BM_AUTO_REPORT_DATA);
  const [bmLeanAutoReportData, setBmLeanAutoReportData] = useAtom(BM_LEAN_AUTO_REPORT_DATA);
  const [bmBmAdsReportData, setBmBmAdsReportData] = useAtom(BM_BM_ADS_REPORT_DATA);
  const [bmSelectedProblemOptions, setBmSelectedProblemOptions] = useAtom(BM_SELECTED_PROBLEM_OPTIONS);
  const [bmLeanAdsReportData, setBmLeanAdsReportData] = useAtom(BM_LEAN_ADS_REPORT_DATA);
  const [bmBmCustomReportData, setBmBmCustomReportData] = useAtom(BM_BM_CUSTOM_REPORT_DATA);
  const [bmLeanCustomReportData, setBmLeanCustomReportData] = useAtom(BM_LEAN_CUSTOM_REPORT_DATA);
  const [surveyGuidelineReportData, setSurveyGuidelineReportData] = useAtom(SURVEY_GUIDELINE_REPORT_DATA);
  const [surveyGuidelineDetailReportData, setSurveyGuidelineDetailReportData] = useAtom(SURVEY_GUIDELINE_DETAIL_REPORT_DATA);
  const [surveyGoalSuggestionList, setSurveyGoalSuggestionList] = useAtom(SURVEY_GOAL_SUGGESTION_LIST);
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [surveyQuestionList, setSurveyQuestionList] = useAtom(SURVEY_QUESTION_LIST);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);
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
  const [priceStartButtonState, setPriceStartButtonState] = useAtom(PRICE_START_BUTTON_STATE);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  
  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "priceStartButton"
    ) {
      updatedConversation.pop();
    }

    /* 제품 개수를 확인하는 API */

    // const data = {
    //   expert_id: "7",
    //   business_info: titleOfBusinessInfo,
    //   business_analysis_data: {
    //     명칭: titleOfBusinessInfo,
    //     주요_목적_및_특징: mainFeaturesOfBusinessInformation,
    //     주요기능: mainCharacteristicOfBusinessInformation,
    //     목표고객: businessInformationTargetCustomer,
    //   }
    // };

    // let response = await axios.post(
    //   "https://wishresearch.kr/panels/growth_hacker",
    //   data,
    //   axiosConfig
    // );

    // let retryCount = 0;
    // const maxRetries = 10;

    // while (retryCount < maxRetries && (
    //   !response || 
    //   !response.data || 
    //   typeof response.data !== "object" ||
    //   !response.data.hasOwnProperty("growth_hacker_report") || 
    //   !Array.isArray(response.data.growth_hacker_report) ||
    //   !response.data.growth_hacker_report[0].hasOwnProperty("content") ||
    //   !Array.isArray(response.data.growth_hacker_report[0].content) ||
    //   !response.data.growth_hacker_report[0].content[0].hasOwnProperty("text") ||
    //   !response.data.growth_hacker_report[0].content[1].hasOwnProperty("text") ||
    //   response.data.growth_hacker_report[1].content.some(item => 
    //     !item.hasOwnProperty("title") || 
    //     !item.hasOwnProperty("text") || 
    //     !item.hasOwnProperty("subcontent") || 
    //     !Array.isArray(item.subcontent) || 
    //     item.subcontent.some(contentItem => 
    //       !contentItem.hasOwnProperty("subTitle") || 
    //       !contentItem.hasOwnProperty("text")
    //     )
    //   )
    // )) 
    // {
    //   response = await axios.post(
    //     "https://wishresearch.kr/panels/growth_hacker",
    //     data,
    //     axiosConfig
    //   );
    //   retryCount++;
    // }
    // if (retryCount === maxRetries) {
    //   console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
    //   // 에러 처리 로직 추가
    //   throw new Error("Maximum retry attempts reached. Empty response persists.");
    // }
    
    const product = ["기능성 화장품"];
    setPriceProduct(product);

    updatedConversation.push(
      {
        type: "user",
        message:
          "시장 가격 분석하기를 진행하겠습니다",
        expertIndex: selectedExpertIndex,
      },
    );

    if(product.length === 1) {
      setPriceStartButtonState(1);

      updatedConversation.push(
        {
          type: "system",
          message:
            `${titleOfBusinessInfo}에 대한 가격 정보를 확인하여 시장 가격 분석을 진행하겠습니다.`,
          expertIndex: selectedExpertIndex,
        },
        {
          type: 'priceReport',
        },
      );
    } else {
      updatedConversation.push(
        {
          type: "system",
          message:
            `시장 가격 분석을 위해 조사할 제품군을 확인해주세요`,
          expertIndex: selectedExpertIndex,
        },
        {
          type: 'priceOption',
        },
      );
    }

    setIsEditingNow(false);
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
        pocPersonaList: pocPersonaList,
        selectedPocTarget: selectedPocTarget,
        pocDetailReportData : pocDetailReportData,
        ideaFeatureData : ideaFeatureData,
        ideaRequirementData : ideaRequirementData,
        ideaList : ideaList,
        ideaGroup : ideaGroup,
        buttonState : buttonState,
        ideaMiro : ideaMiro,
        growthHackerReportData : growthHackerReportData,
        KpiQuestionList : KpiQuestionList,
        priceProduct : priceProduct,
        caseHashTag : caseHashTag,
        caseReportData : caseReportData,
        bmOrLean : bmOrLean,
        bmQuestionList : bmQuestionList,
        bmModelSuggestionReportData : bmModelSuggestionReportData,
        bmBmAutoReportData : bmBmAutoReportData,
        bmLeanAutoReportData : bmLeanAutoReportData,
        bmBmAdsReportData : bmBmAdsReportData,
        bmSelectedProblemOptions : bmSelectedProblemOptions,
        bmLeanAdsReportData : bmLeanAdsReportData,
        bmBmCustomReportData : bmBmCustomReportData,
        bmLeanCustomReportData : bmLeanCustomReportData,
        surveyGuidelineReportData : surveyGuidelineReportData,
        surveyGuidelineDetailReportData : surveyGuidelineDetailReportData,
        surveyGoalSuggestionList: surveyGoalSuggestionList,
        surveyGoalFixed: surveyGoalFixed,
        surveyQuestionList: surveyQuestionList,
      },
      isLoggedIn,
      conversationId
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>시장 가격 분석하기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculePriceStartButton;

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
