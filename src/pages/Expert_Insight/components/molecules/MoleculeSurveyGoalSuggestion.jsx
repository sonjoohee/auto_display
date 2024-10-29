import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  BUTTON_STATE,
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
  isLoggedInAtom,
  STRATEGY_REPORT_DATA,
  INPUT_BUSINESS_INFO,
  CONVERSATION_STAGE,
  SELECTED_ADDITIONAL_KEYWORD,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  TARGET_SELECT_BUTTON_STATE,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  POC_PERSONA_LIST,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_LIST,
  IDEA_GROUP,
  IDEA_PRIORITY,
  IDEA_MIRO,
  GROWTH_HACKER_REPORT_DATA,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  KPI_QUESTION_LIST,
  PRICE_SCRAP_DATA,
  PRICE_REPORT_DATA,
  PRICE_PRODUCT,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  PRICE_PRODUCT_SEGMENTATION,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_USER_GOAL_INPUT,
  SURVEY_GOAL_FIXED,
  SURVEY_GOAL_SUGGESTION_BUTTON_STATE,
  CASE_HASH_TAG,
  CASE_REPORT_DATA,
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

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";

import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";

const MoleculeSurveyGoalSuggestion = () => {
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
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);
  const [priceScrapData, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [priceReportData, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [priceSelectedProductSegmentation, setPriceSelectedProductSegmentation] = useAtom(PRICE_SELECTED_PRODUCT_SEGMENTATION);
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(PRICE_PRODUCT_SEGMENTATION);
  const [ideaMiro, setIdeaMiro] = useAtom(IDEA_MIRO);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] = useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);
  const [selectedPocOptions, setSelectedPocOptions] =
    useAtom(SELECTED_POC_OPTIONS);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [expertButtonState, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE);
  const [surveyGoalSuggestionButtonState, setSurveyGoalSuggestionButtonState] = useAtom(SURVEY_GOAL_SUGGESTION_BUTTON_STATE);
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [strategyReportData] = useAtom(STRATEGY_REPORT_DATA);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [selectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [selectedCustomerAdditionalKeyword] = useAtom(
    SELECTED_CUSTOMER_ADDITIONAL_KEYWORD
  );
  const [additionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);
  const [customerAdditionalReportData] = useAtom(
    CUSTOMER_ADDITIONAL_REPORT_DATA
  );
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [surveyGoalFixedState, setSurveyGoalFixedState] = useState({}); // 현재 선택한 상태를 저장
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingSurvey, setIsLoadingSurvey] = useState(false);
  const [surveyGoalSuggestionList, setSurveyGoalSuggestionList] = useAtom(SURVEY_GOAL_SUGGESTION_LIST);
  const [surveyUserGoalInput, setSurveyUserGoalInput] = useAtom(SURVEY_USER_GOAL_INPUT);
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);

  
  useEffect(() => {
    if(Object.keys(surveyGoalFixed).length) {
      setSurveyGoalFixedState(surveyGoalFixed);
    }
  }, [surveyGoalFixed]);

  const handleOptionClick = (index) => {
    if (Object.keys(surveyGoalFixed).length) return;

      setSurveyGoalFixedState({
        title: surveyGoalSuggestionList[index].title,
        description: surveyGoalSuggestionList[index].description,
        index: index,
      });
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchSurveyGoalSuggestion = async () => {

      if(surveyGoalSuggestionButtonState) {
        setIsLoading(true);
        setIsLoadingSurvey(true);
        setSurveyGoalSuggestionButtonState(0);

        const data = {
          expert_id: "10",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
          },
          user_goal_input : surveyUserGoalInput
        };

        let response = await axios.post(
          "https://wishresearch.kr/panels/survey_goal_suggestion",
          data,
          axiosConfig
        );
        let updatedGoalList = response.data.survey_goal_suggestion_report;

        let retryCount = 0;
        const maxRetries = 10;

        while ((retryCount < maxRetries &&
          !response || !response.data || typeof response.data !== "object" ||
          !response.data.hasOwnProperty("survey_goal_suggestion_report") ||
          !Array.isArray(response.data.survey_goal_suggestion_report) ||
          response.data.survey_goal_suggestion_report.some(item =>
            !item.hasOwnProperty("title") || 
            !item.hasOwnProperty("description")
          )
        )) {
          response = await axios.post(
            "https://wishresearch.kr/panels/survey_goal_suggestion",
            data,
            axiosConfig
          );
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
          updatedGoalList = response.data.survey_goal_suggestion_report;
        }
        if (retryCount === maxRetries) {
          console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }
        
        setSurveyGoalSuggestionList(updatedGoalList);

        let newButtonState = { ...buttonState };
        delete newButtonState.surveyGoalInputStart;
        setButtonState(newButtonState);

        await saveConversationToIndexedDB(
          {
            id: conversationId,
            inputBusinessInfo: inputBusinessInfo,
            analysisReportData: analysisReportData,
            strategyReportData: strategyReportData,
            conversation: conversation,
            conversationStage: 3,
            selectedAdditionalKeywords: selectedAdditionalKeyword,
            selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
            additionalReportData: additionalReportData,
            customerAdditionalReportData: customerAdditionalReportData,
            timestamp: Date.now(),
            expert_index: selectedExpertIndex,
            selectedPocOptions: selectedPocOptions,
            surveyGoalSuggestionList: updatedGoalList,
            ideaFeatureData : ideaFeatureData,
            ideaRequirementData : ideaRequirementData,
            ideaList : ideaList,
            ideaGroup : ideaGroup,
            ideaPriority : ideaPriority,
            buttonState : newButtonState,
            growthHackerReportData : growthHackerReportData,
            growthHackerDetailReportData : growthHackerDetailReportData,
            KpiQuestionList : KpiQuestionList,
            priceScrapData : priceScrapData,
            priceReportData : priceReportData,
            priceProduct : priceProduct,
            priceSelectedProductSegmentation : priceSelectedProductSegmentation,
            priceProductSegmentation : priceProductSegmentation,
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
          },
          isLoggedIn,
          conversationId
        );

        setIsLoading(false);
        setIsLoadingSurvey(false);
      }
    };

    fetchSurveyGoalSuggestion();
  }, [surveyGoalSuggestionButtonState]);

  const handleConfirm = async () => {
    if (Object.keys(surveyGoalFixed).length || Object.keys(surveyGoalFixedState).length === 0) return;

    setConversationStage(3);
    setApproachPath(3);
    setSurveyGoalFixed(surveyGoalFixedState);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "system",
        message: `입력하신 내용을 기반으로 다음과 같은 설문조사 목적을 제안드립니다.\n"${surveyGoalFixedState.title}"을 목적으로 합니다.`,
        expertIndex: selectedExpertIndex,
      },
      {
        type: `surveyOption`,
      }
    );
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
        selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
        additionalReportData: additionalReportData,
        customerAdditionalReportData: customerAdditionalReportData,
        timestamp: Date.now(),
        expert_index: selectedExpertIndex,
        selectedPocOptions: selectedPocOptions,
        surveyGoalSuggestionList: surveyGoalSuggestionList,
        surveyGoalFixed: surveyGoalFixedState,
        ideaFeatureData : ideaFeatureData,
        ideaRequirementData : ideaRequirementData,
        ideaList : ideaList,
        ideaGroup : ideaGroup,
        ideaPriority : ideaPriority,
        buttonState : buttonState,
        growthHackerReportData : growthHackerReportData,
        growthHackerDetailReportData : growthHackerDetailReportData,
        KpiQuestionList : KpiQuestionList,
        priceScrapData : priceScrapData,
        priceReportData : priceReportData,
        priceProduct : priceProduct,
        priceSelectedProductSegmentation : priceSelectedProductSegmentation,
        priceProductSegmentation : priceProductSegmentation,
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
      },
      isLoggedIn,
      conversationId
    );
    setExpertButtonState(1);
  };

  return (
    <Wrapper>
      {isLoadingSurvey ?
      <>
        <SkeletonTitle className="title-placeholder" />
        <SkeletonLine className="content-placeholder" />
        <SkeletonLine className="content-placeholder" />
        <Spacing />
        <SkeletonTitle className="title-placeholder" />
        <SkeletonLine className="content-placeholder" />
        <SkeletonLine className="content-placeholder" />
      </>
      :
      <>
        <OptionsContainer>
          {surveyGoalSuggestionList.map((goal, index) => (
            <Option
              key={index}
              onClick={() => handleOptionClick(index)}
              selected={surveyGoalFixedState.index === index}
              surveyGoalFixed={surveyGoalFixed}
            >
              <Label
                surveyGoalFixed={surveyGoalFixed}
                selected={surveyGoalFixedState.index === index}
              >
                {goal.title}
              </Label>
            </Option>
          ))}
        </OptionsContainer>


        <ButtonWrap>
          <Button surveyGoalFixedState={surveyGoalFixedState} surveyGoalFixed={surveyGoalFixed} onClick={handleConfirm}>확인</Button>
        </ButtonWrap>
      </>
    }
    </Wrapper>
  );
};

export default MoleculeSurveyGoalSuggestion;

const Wrapper = styled.div`
  max-width:540px;
  width:100%;
  display:flex;
  flex-direction:column;
  gap:20px;
  padding:20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};
`;

const OptionsContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:8px;
`;

const Option = styled.div`
  position:relative;
  display:flex;
  gap:8px;
  align-items:center;
  color: ${palette.gray800};
  font-size:0.88rem;
  text-align: left;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? Object.keys(props.surveyGoalFixed).length
        ? "rgba(0,0,0,0.05)"
        : "rgba(4,83,244,0.05)"
      : palette.white};
  border: 1px solid ${(props) => (props.selected ? (Object.keys(props.surveyGoalFixed).length ? palette.gray800 : palette.blue) : palette.lineGray)};
  transition:all .5s;

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height:1.3;
  }
  
  img {
    margin-bottom: 5px;
    background-color: ${(props) => (!props.selected || Object.keys(props.surveyGoalFixed).length ? "rgba(246, 246, 246, 1)" : "rgba(255, 255, 255, 1)")};
    border-radius: 50%;
    padding: 10px;
    width: 34px;
    height: 34px;
  }

  &:hover {
    border-color: ${(props) =>
      Object.keys(props.surveyGoalFixed).length 
        ? "none" 
        : palette.blue};
  }
`;

const Label = styled.label`
  position:relative;
  display:flex;
  gap:8px;
  align-items:flex-start;
  width:100%;
  color: ${(props) => (props.selected ? (Object.keys(props.surveyGoalFixed).length ? palette.gray800 : palette.blue) : palette.gray800)};
  cursor:pointer;

  &:before {
    width:20px;
    height:20px;
    flex-shrink:0;
    border-radius:50%;
    border:1px solid ${(props) => (props.selected ? (Object.keys(props.surveyGoalFixed).length ? palette.gray800 : palette.blue) : palette.lineGray)};
    background-color: ${(props) => (props.selected ? (Object.keys(props.surveyGoalFixed).length ? palette.gray800 : palette.blue) : palette.white)};
    transition:all .5s;
    content:'';
  }

  &:after {
    position:absolute;
    left:0;
    top:0;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }
`;

const ButtonWrap = styled.div`
  display:flex;
  justify-content:end;
  align-items:center;
`;

const Button = styled.button`
  font-family: Pretendard, Poppins;
  font-size:0.88rem;
  color: ${(props) => (props.surveyGoalFixedState && Object.keys(props.surveyGoalFixedState).length ? palette.chatBlue : palette.black)};
  line-height:22px;
  padding:8px 20px;
  margin-left:auto;
  border-radius:8px;
  border:0;
  background:${palette.white};
  transition:all .5s;

  display: ${(props) => (
    Object.keys(props.surveyGoalFixed).length ? 'none' : 'block')};
`;

const Spacing = styled.div`
  margin-bottom: 40px;
`;