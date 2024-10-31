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
  IS_LOADING_CASE_HASHTAG,
  BM_LEAN_ADS_REPORT_BUTTON_STATE,
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
} from "../../../AtomStates";

import {
  saveConversationToIndexedDB,
} from "../../../../utils/indexedDB";

import axios from "axios";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeBmLeanAdsContinueButton = () => { 
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
  const [isLoadingCaseHashTag, setIsLoadingCaseHashTag] = useAtom(IS_LOADING_CASE_HASHTAG);
  const [bmLeanAdsButtonState, setBmLeanAdsButtonState] = useAtom(BM_LEAN_ADS_REPORT_BUTTON_STATE);


  const handleClick = async (type) => {
    if (isLoading) return;

    setIsLoadingCaseHashTag(true);

    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "bmLeanAdsContinueButton"
    ) {
      updatedConversation.pop();
    }

    if(type === "more") {
        updatedConversation.push(
          {
            type: "system",
            message:
              "입력해주신 비즈니스 목표에 따른 캔버스의 정교화 방향성을 도출하였습니다.\n원하시는 방향을 선택하시고, 어떤 요소들이 변화되었는지 확인해보세요",
            expertIndex: selectedExpertIndex,
          },
          { type: `bmLeanAdsReport` }
        );
        setBmLeanAdsButtonState(1);
        setConversationStage(3);
        setConversation(updatedConversation);
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
          buttonState : buttonState,
          surveyGuidelineReportData : surveyGuidelineReportData,
          surveyGuidelineDetailReportData : surveyGuidelineDetailReportData,
          surveyGoalSuggestionList: surveyGoalSuggestionList,
          surveyGoalFixed: surveyGoalFixed,
          surveyQuestionList: surveyQuestionList,
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
        bmEnough: 1,
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
          buttonState : {
            ...buttonState,
            bmEnough: 1,
          },
          surveyGuidelineReportData : surveyGuidelineReportData,
          surveyGuidelineDetailReportData : surveyGuidelineDetailReportData,
          surveyGoalSuggestionList: surveyGoalSuggestionList,
          surveyGoalFixed: surveyGoalFixed,
          surveyQuestionList: surveyQuestionList,
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
        },
        isLoggedIn,
        conversationId
      );
    }

    setConversationStage(3);
    setApproachPath(3);
    setIsLoadingCaseHashTag(false);
  };
  return (
    <>
      <ButtonWrap>
          <button onClick={() => handleClick("more")}>특정 문제(Problem)에 특화된 린 캔버스를 보고 싶습니다</button>
          <button onClick={() => handleClick("enough")}>이정도면 충분합니다</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeBmLeanAdsContinueButton;

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

  button.none {
    cursor: default;
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
