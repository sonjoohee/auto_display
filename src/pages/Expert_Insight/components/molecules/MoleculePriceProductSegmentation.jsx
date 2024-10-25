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
  PRICE_PRODUCT_SEGMENTATION,
  PRICE_START_BUTTON_STATE,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  CASE_HASH_TAG,
  CASE_REPORT_DATA,
  SURVEY_GUIDELINE_REPORT_DATA,
  SURVEY_GUIDELINE_DETAIL_REPORT_DATA,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_GOAL_FIXED,
  SURVEY_QUESTION_LIST,
} from "../../../AtomStates";

import {
  saveConversationToIndexedDB,
} from "../../../../utils/indexedDB";

import { palette } from "../../../../assets/styles/Palette";

const MoleculePriceContinueButton = () => {
  const [surveyGuidelineReportData, setSurveyGuidelineReportData] = useAtom(SURVEY_GUIDELINE_REPORT_DATA);
  const [surveyGuidelineDetailReportData, setSurveyGuidelineDetailReportData] = useAtom(SURVEY_GUIDELINE_DETAIL_REPORT_DATA);
  const [surveyGoalSuggestionList, setSurveyGoalSuggestionList] = useAtom(SURVEY_GOAL_SUGGESTION_LIST);
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [surveyQuestionList, setSurveyQuestionList] = useAtom(SURVEY_QUESTION_LIST);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);
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
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(PRICE_PRODUCT_SEGMENTATION);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [priceStartButtonState, setPriceStartButtonState] = useAtom(PRICE_START_BUTTON_STATE);

  useEffect(() => {
    const fetchPriceProductSegmentation = async () => {
      if(priceContinueButtonState === 1) {
        /* 제품 개수를 확인하는 API */
        // setIsLoading(true);
        // setIsLoadingPrice(true);
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
        // setIsLoadingPrice(false);
        // setIsLoading(false);
      setPriceContinueButtonState(0);
      setPriceProductSegmentation(["클랜징 디바이스", "리프팅 및 탄력 디바이스", "LED 마스크 디바이스", "모공 관리 디바이스"]);

      setConversationStage(3);
      setApproachPath(3);

      await saveConversationToIndexedDB(
        {
          id: conversationId,
          inputBusinessInfo: inputBusinessInfo,
          analysisReportData: analysisReportData,
          strategyReportData: strategyReportData,
          conversation: conversation,
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
          priceProductSegmentation : priceProductSegmentation,
          priceSelectedProductSegmentation : priceSelectedProductSegmentation,
          priceScrapData : priceScrapData,
          priceReportData : priceReportData,
          caseHashTag : caseHashTag,
          caseReportData : caseReportData,

          surveyGuidelineReportData : surveyGuidelineReportData,
          surveyGuidelineDetailReportData : surveyGuidelineDetailReportData,
          surveyGoalSuggestionList: surveyGoalSuggestionList,
          surveyGoalFixed: surveyGoalFixed,
          surveyQuestionList: surveyQuestionList,
        },
        isLoggedIn,
        conversationId
      );
    }
  }
    fetchPriceProductSegmentation();
  }, [priceContinueButtonState]);

  const handleClick = async (index) => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "priceProductSegmentation"
    ) {
      updatedConversation.pop();
    }

    setPriceSelectedProductSegmentation([...priceSelectedProductSegmentation, priceProductSegmentation[index]]);
    setPriceStartButtonState(1);

    updatedConversation.push(
      {
        type: "user",
        message:
          `${priceProductSegmentation[index]}의 가격 분석을 진행하겠습니다`,
      },
      { type: `priceReport` }
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
        priceScrapData : priceScrapData,
        priceReportData : priceReportData,
        priceProduct : priceProduct,
        priceSelectedProductSegmentation : [
          ...priceSelectedProductSegmentation,
          priceProductSegmentation[index],
        ],
        priceProductSegmentation : priceProductSegmentation,
        caseHashTag : caseHashTag,
        caseReportData : caseReportData,

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
        <>
          {priceProductSegmentation.map((product, index) => (
            <button key={index} onClick={() => handleClick(index)}>
              {product}
            </button>
          ))}
        </>
      </ButtonWrap>
    </>
  );
};

export default MoleculePriceContinueButton;

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

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
