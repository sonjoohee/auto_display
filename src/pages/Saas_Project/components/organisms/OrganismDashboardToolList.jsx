import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../assets/styles/ButtonStyle";
import {
  Table,
  TableHeader,
  TableBody,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  Body1,
  Body2,
  Caption1,
  InputText,
} from "../../../../assets/styles/Typography";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import axios from "axios";
import { useAtom } from "jotai";
import {
  SAVED_TIMESTAMP,
  SELECTED_EXPERT_INDEX,
  CONVERSATION_ID,
  CONVERSATION,
  CONVERSATION_STAGE,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  STRATEGY_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  SELECTED_POC_OPTIONS,
  RECOMMENDED_TARGET_DATA,
  SELCTED_POC_TARGET,
  POC_PERSONA_LIST,
  POC_DETAIL_REPORT_DATA,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_FEATURE_DATA_TEMP,
  IDEA_REQUIREMENT_DATA_TEMP,
  IDEA_LIST,
  IDEA_GROUP,
  IDEA_PRIORITY,
  IDEA_MIRO_STATE,
  BUTTON_STATE,
  GROWTH_HACKER_RECOMMENDED_SOLUTION,
  GROWTH_HACKER_REPORT_DATA,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  GROWTH_HACKER_SELECTED_SOLUTION,
  KPI_QUESTION_LIST,
  PRICE_REPORT_DATA,
  PRICE_SCRAP_DATA,
  PRICE_PRODUCT,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  PRICE_PRODUCT_SEGMENTATION,
  CASE_REPORT_DATA,
  CASE_HASH_TAG,
  SURVEY_GUIDELINE_DETAIL_REPORT_DATA,
  SURVEY_GUIDELINE_REPORT_DATA,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_GOAL_FIXED,
  SURVEY_QUESTION_LIST,
  BM_MODEL_SUGGESTION_REPORT_DATA,
  BM_QUESTION_LIST,
  BM_SELECTED_PROBLEM_OPTIONS,
  BM_OR_LEAN,
  BM_BM_AUTO_REPORT_DATA,
  BM_LEAN_AUTO_REPORT_DATA,
  BM_BM_ADS_REPORT_DATA,
  BM_LEAN_ADS_REPORT_DATA,
  BM_BM_CUSTOM_REPORT_DATA,
  BM_LEAN_CUSTOM_REPORT_DATA,
  IS_MARKETING,
  MARKETING_MBTI_RESULT,
  MARKETING_RESEARCH_REPORT_DATA,
  MARKETING_BM_REPORT_DATA,
  MARKETING_CUSTOMER_DATA,
  MARKETING_SELECTED_CUSTOMER,
  MARKETING_FINAL_CUSTOMER,
  MARKETING_FINAL_REPORT_DATA,
  STRATEGY_CONSULTANT_REPORT_DATA,
  APPROACH_PATH,
  IS_EDITING_NOW,
  IS_EDITING_IDEA_FEATURE,
  IS_EDITING_IDEA_CUSTOMER,
  ADDING_IDEA_FEATURE,
  ACTIVE_IDEA_FEATURE_INDEX,
  ADD_CONTENT_IDEA_FEATURE,
  EDITED_IDEA_FEATURE_TITLE,
  ADDING_IDEA_CUSTOMER,
  ACTIVE_IDEA_CUSTOMER_INDEX,
  ADD_CONTENT_IDEA_CUSTOMER,
  EDITED_IDEA_CUSTOMER_TITLE,
  ANALYSIS_BUTTON_STATE,
  EXPERT_BUTTON_STATE,
  ADDITION_BUTTON_STATE,
  CUSTOMER_ADDITION_BUTTON_STATE,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  TOOL_STEP,
  TOOL_ID,
  TARGET_DISCOVERY_INFO,
  TARGET_DISCOVERY_PERSONA,
  TARGET_DISCOVERY_SCENARIO,
  TARGET_DISCOVERY_FINAL_REPORT,
  TOOL_LOADING,
  CUSTOMER_VALUE_ANALYZER_INFO,
  CUSTOMER_VALUE_ANALYZER_PERSONA,
  CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP,
  CUSTOMER_VALUE_ANALYZER_FACTOR,
  CUSTOMER_VALUE_ANALYZER_CLUSTERING,
  CUSTOMER_VALUE_ANALYZER_POSITIONING,
  CUSTOMER_VALUE_ANALYZER_FINAL_REPORT,
  CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA,
  IDEA_GENERATOR_INFO,
  IDEA_GENERATOR_PERSONA,
  IDEA_GENERATOR_IDEA,
  IDEA_GENERATOR_CLUSTERING,
  IDEA_GENERATOR_FINAL_REPORT,
  IDEA_GENERATOR_SELECTED_PERSONA,
  IDEA_GENERATOR_KNOW_TARGET,
  IDEA_GENERATOR_CUSTOM_TARGET,
  DESIGN_ANALYSIS_EMOTION_ANALYSIS,
  DESIGN_ANALYSIS_BUSINESS_INFO,
  DESIGN_ANALYSIS_UPLOADED_FILES,
  DESIGN_ANALYSIS_FILE_ID,
  DESIGN_ANALYSIS_SELECTED_PERSONA,
  DESIGN_ANALYSIS_EMOTION_TARGET,
  DESIGN_ANALYSIS_EMOTION_SCALE,
  DESIGN_ANALYSIS_FILE_NAMES,
  IDEA_GENERATOR_PURPOSE,
} from "../../../../pages/AtomStates";

const OrganismDashboardToolList = ({ toolListSaas }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // 상태 변수들 정의
  const [savedTimestamp, setSavedTimestamp] = useAtom(SAVED_TIMESTAMP);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
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
  const [strategyReportData, setStrategyReportData] =
    useAtom(STRATEGY_REPORT_DATA);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  );
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [selectedPocOptions, setSelectedPocOptions] =
    useAtom(SELECTED_POC_OPTIONS);
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(
    RECOMMENDED_TARGET_DATA
  );
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [pocDetailReportData, setPocDetailReportData] = useAtom(
    POC_DETAIL_REPORT_DATA
  );
  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(
    IDEA_REQUIREMENT_DATA
  );
  const [ideaFeatureDataTemp, setIdeaFeatureDataTemp] = useAtom(
    IDEA_FEATURE_DATA_TEMP
  );
  const [ideaRequirementDataTemp, setIdeaRequirementDataTemp] = useAtom(
    IDEA_REQUIREMENT_DATA_TEMP
  );
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);
  const [ideaMiroState, setIdeaMiroState] = useAtom(IDEA_MIRO_STATE);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [growthHackerRecommendedSolution, setGrowthHackerRecommendedSolution] =
    useAtom(GROWTH_HACKER_RECOMMENDED_SOLUTION);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(
    GROWTH_HACKER_REPORT_DATA
  );
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] =
    useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [growthHackerSelectedSolution, setGrowthHackerSelectedSolution] =
    useAtom(GROWTH_HACKER_SELECTED_SOLUTION);
  const [kpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [priceReportData, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [priceScrapData, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [
    priceSelectedProductSegmentation,
    setPriceSelectedProductSegmentation,
  ] = useAtom(PRICE_SELECTED_PRODUCT_SEGMENTATION);
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(
    PRICE_PRODUCT_SEGMENTATION
  );
  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [surveyGuidelineDetailReportData, setSurveyGuidelineDetailReportData] =
    useAtom(SURVEY_GUIDELINE_DETAIL_REPORT_DATA);
  const [surveyGuidelineReportData, setSurveyGuidelineReportData] = useAtom(
    SURVEY_GUIDELINE_REPORT_DATA
  );
  const [surveyGoalSuggestionList, setSurveyGoalSuggestionList] = useAtom(
    SURVEY_GOAL_SUGGESTION_LIST
  );
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [surveyQuestionList, setSurveyQuestionList] =
    useAtom(SURVEY_QUESTION_LIST);
  const [bmModelSuggestionReportData, setBmModelSuggestionReportData] = useAtom(
    BM_MODEL_SUGGESTION_REPORT_DATA
  );
  const [bmQuestionList, setBmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [bmSelectedProblemOptions, setBmSelectedProblemOptions] = useAtom(
    BM_SELECTED_PROBLEM_OPTIONS
  );
  const [bmOrLean, setBmOrLean] = useAtom(BM_OR_LEAN);
  const [bmBmAutoReportData, setBmBmAutoReportData] = useAtom(
    BM_BM_AUTO_REPORT_DATA
  );
  const [bmLeanAutoReportData, setBmLeanAutoReportData] = useAtom(
    BM_LEAN_AUTO_REPORT_DATA
  );
  const [bmBmAdsReportData, setBmBmAdsReportData] = useAtom(
    BM_BM_ADS_REPORT_DATA
  );
  const [bmLeanAdsReportData, setBmLeanAdsReportData] = useAtom(
    BM_LEAN_ADS_REPORT_DATA
  );
  const [bmBmCustomReportData, setBmBmCustomReportData] = useAtom(
    BM_BM_CUSTOM_REPORT_DATA
  );
  const [bmLeanCustomReportData, setBmLeanCustomReportData] = useAtom(
    BM_LEAN_CUSTOM_REPORT_DATA
  );
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(
    MARKETING_MBTI_RESULT
  );
  const [marketingResearchReportData, setMarketingResearchReportData] = useAtom(
    MARKETING_RESEARCH_REPORT_DATA
  );
  const [marketingBmReportData, setMarketingBmReportData] = useAtom(
    MARKETING_BM_REPORT_DATA
  );
  const [marketingCustomerData, setMarketingCustomerData] = useAtom(
    MARKETING_CUSTOMER_DATA
  );
  const [marketingSelectedCustomer, setMarketingSelectedCustomer] = useAtom(
    MARKETING_SELECTED_CUSTOMER
  );
  const [marketingFinalCustomer, setMarketingFinalCustomer] = useAtom(
    MARKETING_FINAL_CUSTOMER
  );
  const [marketingFinalReportData, setMarketingFinalReportData] = useAtom(
    MARKETING_FINAL_REPORT_DATA
  );
  const [strategyConsultantReportData, setStrategyConsultantReportData] =
    useAtom(STRATEGY_CONSULTANT_REPORT_DATA);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [isEditingIdeaFeature, setIsEditingIdeaFeature] = useAtom(
    IS_EDITING_IDEA_FEATURE
  );
  const [isEditingIdeaCustomer, setIsEditingIdeaCustomer] = useAtom(
    IS_EDITING_IDEA_CUSTOMER
  );
  const [addingIdeaFeature, setAddingIdeaFeature] =
    useAtom(ADDING_IDEA_FEATURE);
  const [activeIdeaFeatureIndex, setActiveIdeaFeatureIndex] = useAtom(
    ACTIVE_IDEA_FEATURE_INDEX
  );
  const [addContentIdeaFeature, setAddContentIdeaFeature] = useAtom(
    ADD_CONTENT_IDEA_FEATURE
  );
  const [editedIdeaFeatureTitle, setEditedIdeaFeatureTitle] = useAtom(
    EDITED_IDEA_FEATURE_TITLE
  );
  const [addingIdeaCustomer, setAddingIdeaCustomer] =
    useAtom(ADDING_IDEA_CUSTOMER);
  const [activeIdeaCustomerIndex, setActiveIdeaCustomerIndex] = useAtom(
    ACTIVE_IDEA_CUSTOMER_INDEX
  );
  const [addContentIdeaCustomer, setAddContentIdeaCustomer] = useAtom(
    ADD_CONTENT_IDEA_CUSTOMER
  );
  const [editedIdeaCustomerTitle, setEditedIdeaCustomerTitle] = useAtom(
    EDITED_IDEA_CUSTOMER_TITLE
  );
  const [analysisButtonState, setAnalysisButtonState] = useAtom(
    ANALYSIS_BUTTON_STATE
  );
  const [expertButtonState, setExpertButtonState] =
    useAtom(EXPERT_BUTTON_STATE);
  const [additionButtonState, setAdditionButtonState] = useAtom(
    ADDITION_BUTTON_STATE
  );
  const [customerAdditionButtonState, setCustomerAdditionButtonState] = useAtom(
    CUSTOMER_ADDITION_BUTTON_STATE
  );
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(
    IS_EXPERT_INSIGHT_ACCESSIBLE
  );
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [targetDiscoveryInfo, setTargetDiscoveryInfo] = useAtom(
    TARGET_DISCOVERY_INFO
  );
  const [targetDiscoveryPersona, setTargetDiscoveryPersona] = useAtom(
    TARGET_DISCOVERY_PERSONA
  );
  const [targetDiscoveryScenario, setTargetDiscoveryScenario] = useAtom(
    TARGET_DISCOVERY_SCENARIO
  );
  const [targetDiscoveryFinalReport, setTargetDiscoveryFinalReport] = useAtom(
    TARGET_DISCOVERY_FINAL_REPORT
  );
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [customerValueAnalyzerInfo, setCustomerValueAnalyzerInfo] = useAtom(
    CUSTOMER_VALUE_ANALYZER_INFO
  );
  const [customerValueAnalyzerPersona, setCustomerValueAnalyzerPersona] =
    useAtom(CUSTOMER_VALUE_ANALYZER_PERSONA);
  const [customerValueAnalyzerJourneyMap, setCustomerValueAnalyzerJourneyMap] =
    useAtom(CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP);
  const [customerValueAnalyzerFactor, setCustomerValueAnalyzerFactor] = useAtom(
    CUSTOMER_VALUE_ANALYZER_FACTOR
  );
  const [customerValueAnalyzerClustering, setCustomerValueAnalyzerClustering] =
    useAtom(CUSTOMER_VALUE_ANALYZER_CLUSTERING);
  const [
    customerValueAnalyzerPositioning,
    setCustomerValueAnalyzerPositioning,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_POSITIONING);
  const [
    customerValueAnalyzerFinalReport,
    setCustomerValueAnalyzerFinalReport,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_FINAL_REPORT);
  const [
    customerValueAnalyzerSelectedPersona,
    setCustomerValueAnalyzerSelectedPersona,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA);
  const [designAnalysisEmotionAnalysis, setDesignAnalysisEmotionAnalysis] =
    useAtom(DESIGN_ANALYSIS_EMOTION_ANALYSIS);
  const [designAnalysisBusinessInfo, setDesignAnalysisBusinessInfo] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_INFO
  );
  const [designAnalysisUploadedFiles, setDesignAnalysisUploadedFiles] = useAtom(
    DESIGN_ANALYSIS_UPLOADED_FILES
  );
  const [designAnalysisFileId, setDesignAnalysisFileId] = useAtom(
    DESIGN_ANALYSIS_FILE_ID
  );
  const [designAnalysisSelectedPersona, setDesignAnalysisSelectedPersona] =
    useAtom(DESIGN_ANALYSIS_SELECTED_PERSONA);
  const [designAnalysisEmotionTarget, setDesignAnalysisEmotionTarget] = useAtom(
    DESIGN_ANALYSIS_EMOTION_TARGET
  );
  const [designAnalysisEmotionScale, setDesignAnalysisEmotionScale] = useAtom(
    DESIGN_ANALYSIS_EMOTION_SCALE
  );
  const [designAnalysisFileNames, setDesignAnalysisFileNames] = useAtom(
    DESIGN_ANALYSIS_FILE_NAMES
  );
  const [ideaGeneratorInfo, setIdeaGeneratorInfo] =
    useAtom(IDEA_GENERATOR_INFO);
  const [ideaGeneratorPersona, setIdeaGeneratorPersona] = useAtom(
    IDEA_GENERATOR_PERSONA
  );
  const [ideaGeneratorIdea, setIdeaGeneratorIdea] =
    useAtom(IDEA_GENERATOR_IDEA);
  const [ideaGeneratorClustering, setIdeaGeneratorClustering] = useAtom(
    IDEA_GENERATOR_CLUSTERING
  );
  const [ideaGeneratorFinalReport, setIdeaGeneratorFinalReport] = useAtom(
    IDEA_GENERATOR_FINAL_REPORT
  );
  const [ideaGeneratorSelectedPersona, setIdeaGeneratorSelectedPersona] =
    useAtom(IDEA_GENERATOR_SELECTED_PERSONA);
  const [ideaGeneratorKnowTarget, setIdeaGeneratorKnowTarget] = useAtom(
    IDEA_GENERATOR_KNOW_TARGET
  );
  const [ideaGeneratorCustomTarget, setIdeaGeneratorCustomTarget] = useAtom(
    IDEA_GENERATOR_CUSTOM_TARGET
  );
  const [ideaGeneratorPurpose, setIdeaGeneratorPurpose] = useAtom(
    IDEA_GENERATOR_PURPOSE
  );
  const saveConversation = (data) => {
    // 대화 저장 로직 구현
    console.log("대화 저장:", data);
  };

  // 서버에서 툴 정보 가져오기 함수
  const getToolOnServer = async (toolId, isLoggedIn) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `https://wishresearch.kr/panels/tool/tool_detail/${toolId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("툴 정보 가져오기 오류:", error);
      return null;
    }
  };

  // 툴 이름 가져오기 함수
  const getToolName = (tool) => {
    if (tool.type) {
      switch (tool.type) {
        case "ix_target_discovery_persona":
          return "타겟 탐색기";
        case "ix_customer_value_persona":
          return "고객 핵심 가치 분석기";
        case "ix_design_emotion_analysis":
          return "디자인 감성 분석기";
        case "ix_idea_generator_persona":
          return "아이디어 생성기";
        default:
          return tool.type;
      }
    }
    if (tool.interviewType) return tool.interviewType;
    if (tool.chat_data?.expert_index) return tool.chat_data.expert_index;
    return "상세 내용 없음";
  };

  // 툴 설명 가져오기 함수
  const getToolDescription = (tool) => {
    if (tool.type) {
      switch (tool.type) {
        case "ix_target_discovery_persona":
          return tool.specificSituation || "상세 내용 없음";
        case "ix_customer_value_persona":
          return tool.analysisScope || "상세 내용 없음";
        case "ix_idea_generator_persona":
          return (
            `${tool.coreValue?.[0]} 외 ${tool.coreValue?.length - 1}개` ||
            "상세 내용 없음"
          );
        case "ix_design_emotion_analysis":
          return "이미지 명";
        default:
          return tool.type;
      }
    }
    if (tool.interviewType) return tool.interviewType;
    if (tool.chat_data?.expert_index) return tool.chat_data.expert_index;
    return "상세 내용 없음";
  };
  // 날짜 포맷팅 함수 (년월일시분 표기)
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear().toString().slice(2)}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const handleConversationClick = async (conversationId, conversationType) => {
    if (isLoading) {
      return;
    }

    // 대시보드에서 자세히 보기로 이동하는 플래그 설정
    sessionStorage.setItem("fromDashboard", "true");

    if (conversationType === "expert") {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `https://wishresearch.kr/panels/chat/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const chatData = response.data.chat_data;
        setSavedTimestamp(chatData.timestamp); // 대화 날짜 설정
        setSelectedExpertIndex(
          chatData.expert_index !== undefined ? chatData.expert_index : "0"
        );
        setConversationId(chatData.id); // 대화 ID 설정
        setConversation(chatData.conversation); // 이전 대화 내역 설정
        setConversationStage(chatData.conversationStage); // 대화 단계 설정
        setInputBusinessInfo(chatData.inputBusinessInfo); // 비즈니스 정보 설정
        setTitleOfBusinessInfo(chatData.analysisReportData.title); // 분석 데이터 설정
        setMainFeaturesOfBusinessInformation(
          chatData.analysisReportData.mainFeatures
        ); // 주요 특징 설정
        setMainCharacteristicOfBusinessInformation(
          chatData.analysisReportData.mainCharacter
        ); // 주요 특징 설정
        setBusinessInformationTargetCustomer(
          chatData.analysisReportData.mainCustomer
        ); // 목표 고객 설정

        // 전문가 보고서 데이터 복구
        setStrategyReportData(chatData.strategyReportData || {});

        // 필요하다면 추가 상태 업데이트
        setSelectedAdditionalKeyword(chatData.selectedAdditionalKeyword || []);
        setAdditionalReportData(chatData.additionalReportData || []);
        setCustomerAdditionalReportData(
          chatData.customerAdditionalReportData || []
        );
        setSelectedCustomerAdditionalKeyword(
          chatData.selectedCustomerAdditionalKeyword || []
        );

        setSelectedPocOptions(chatData.selectedPocOptions || []);
        setSelectedPocTarget(chatData.selectedPocTarget || {});
        setRecommendedTargetData(chatData.recommendedTargetData || {});
        setPocPersonaList(chatData.pocPersonaList || []);
        setPocDetailReportData(chatData.pocDetailReportData || {});

        setIdeaFeatureData(chatData.ideaFeatureData || []);
        setIdeaRequirementData(chatData.ideaRequirementData || []);
        setIdeaFeatureDataTemp(chatData.ideaFeatureData || []);
        setIdeaRequirementDataTemp(chatData.ideaRequirementData || []);

        setIdeaList(chatData.ideaList || []);
        setIdeaGroup(chatData.ideaGroup || {});
        setIdeaPriority(chatData.ideaPriority || []);
        setIdeaMiroState(chatData.ideaMiroState || 0);

        setButtonState(chatData.buttonState || {});

        setGrowthHackerRecommendedSolution(
          chatData.growthHackerRecommendedSolution || []
        );
        setGrowthHackerReportData(chatData.growthHackerReportData || []);
        setGrowthHackerDetailReportData(
          chatData.growthHackerDetailReportData || []
        );
        setGrowthHackerSelectedSolution(
          chatData.growthHackerSelectedSolution || []
        );
        setKpiQuestionList(chatData.KpiQuestionList || []);

        setPriceReportData(chatData.priceReportData || {});
        setPriceScrapData(chatData.priceScrapData || {});
        setPriceProduct(chatData.priceProduct || []);
        setPriceSelectedProductSegmentation(
          chatData.priceSelectedProductSegmentation || []
        );
        setPriceProductSegmentation(chatData.priceProductSegmentation || []);

        setCaseReportData(chatData.caseReportData || []);
        setCaseHashTag(chatData.caseHashTag || []);

        setSurveyGuidelineDetailReportData(
          chatData.surveyGuidelineDetailReportData || {}
        );
        setSurveyGuidelineReportData(chatData.surveyGuidelineReportData || {});
        setSurveyGoalSuggestionList(chatData.surveyGoalSuggestionList || []);
        setSurveyGoalFixed(chatData.surveyGoalFixed || []);
        setSurveyQuestionList(chatData.surveyQuestionList || []);

        setBmModelSuggestionReportData(
          chatData.bmModelSuggestionReportData || []
        );
        setBmQuestionList(chatData.bmQuestionList || []);
        setBmSelectedProblemOptions(chatData.bmSelectedProblemOptions || {});
        setBmOrLean(chatData.bmOrLean || "");
        setBmBmAutoReportData(chatData.bmBmAutoReportData || []);
        setBmLeanAutoReportData(chatData.bmLeanAutoReportData || []);
        setBmBmAdsReportData(chatData.bmBmAdsReportData || []);
        setBmLeanAdsReportData(chatData.bmLeanAdsReportData || []);
        setBmBmCustomReportData(chatData.bmBmCustomReportData || []);
        setBmLeanCustomReportData(chatData.bmLeanCustomReportData || []);

        setIsMarketing(chatData.isMarketing || false);
        setMarketingMbtiResult(chatData.marketingMbtiResult || {});
        setMarketingResearchReportData(
          chatData.marketingResearchReportData || []
        );
        setMarketingBmReportData(chatData.marketingBmReportData || []);
        setMarketingCustomerData(chatData.marketingCustomerData || []);
        setMarketingSelectedCustomer(chatData.marketingSelectedCustomer || []);
        setMarketingFinalCustomer(chatData.marketingFinalCustomer || {});
        setMarketingFinalReportData(chatData.marketingFinalReportData || []);

        setStrategyConsultantReportData(
          chatData.strategyConsultantReportData || []
        );

        if (chatData.isMarketing) {
          const updatedConversation = [...chatData.conversation];

          if (
            updatedConversation.length > 0 &&
            updatedConversation[updatedConversation.length - 1].type ===
              "marketingSignUpButton"
          ) {
            updatedConversation.pop();
            updatedConversation.pop();
          }

          setConversation(updatedConversation);
          saveConversation({
            changingConversation: {
              conversation: updatedConversation,
              conversationId: chatData.id,
              timestamp: chatData.timestamp,
              isMarketing: chatData.isMarketing,
              expert_index: chatData.expert_index,
              inputBusinessInfo: chatData.inputBusinessInfo,
              analysisReportData: chatData.analysisReportData,
              conversationStage: chatData.conversationStage,
              title: chatData.analysisReportData.title,
              mainFeatures: chatData.analysisReportData.mainFeatures,
              marketingMbtiResult: chatData.marketingMbtiResult,
              marketingResearchReportData: chatData.marketingResearchReportData,
              marketingBmReportData: chatData.marketingBmReportData,
              marketingCustomerData: chatData.marketingCustomerData,
              marketingSelectedCustomer: chatData.marketingSelectedCustomer,
              marketingFinalCustomer: chatData.marketingFinalCustomer,
              marketingFinalReportData: chatData.marketingFinalReportData,
            },
          });
        }

        // 어프로치 패스 추가 필요(보고서만 뽑고 나온 뒤에 들어가면 버튼만 추가되어 보이게)
        // set어프로치패스(2)
        setApproachPath(2);

        setIsEditingNow(false);
        setIsEditingIdeaFeature(false);
        setIsEditingIdeaCustomer(false);
        setAddingIdeaFeature(false);
        setActiveIdeaFeatureIndex(0);
        setAddContentIdeaFeature("");
        setEditedIdeaFeatureTitle("");
        setAddingIdeaCustomer(false);
        setActiveIdeaCustomerIndex(0);
        setAddContentIdeaCustomer("");
        setEditedIdeaCustomerTitle("");
        setAnalysisButtonState(0);
        setExpertButtonState(0);
        setAdditionButtonState(0);
        setCustomerAdditionButtonState(0);
        setIsExpertInsightAccessible(true); // 접근 가능 상태로 설정

        // 페이지를 대화가 이어지는 형태로 전환
        navigate(`/conversation`);
      } catch (error) {
        console.error("대화 내용 가져오기 오류:", error);
      }
    } else {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const response = await getToolOnServer(conversationId, isLoggedIn);

        const chatData = response;

        setToolStep(1);
        setToolId("");
        setTargetDiscoveryInfo({
          type: "",
          business: "",
          target: "",
          specificSituation: "",
          country: "",
        });
        setTargetDiscoveryPersona([]);
        setTargetDiscoveryScenario([]);
        setTargetDiscoveryFinalReport({});
        setToolLoading(false);
        // console.log("🚀 ~ handleConversationClick ~ chatData:", chatData);
        setToolStep(chatData?.completedStep || 0);
        setToolId(chatData?.id);
        setTargetDiscoveryInfo({
          type: chatData?.type,
          business: chatData?.business,
          target: chatData?.target,
          specificSituation: chatData?.specificSituation,
          country: chatData?.country,
        });
        setTargetDiscoveryPersona(chatData?.targetDiscoveryPersona);
        setTargetDiscoveryScenario(chatData?.targetDiscoveryScenario);
        setTargetDiscoveryFinalReport(chatData?.targetDiscoveryFinalReport);
        setToolLoading(true);

        // customer value persona 타입일 경우

        setToolStep(1);
        setToolId("");
        setCustomerValueAnalyzerInfo({});
        setCustomerValueAnalyzerPersona([]);
        setCustomerValueAnalyzerJourneyMap([]);
        setCustomerValueAnalyzerFactor([]);
        setCustomerValueAnalyzerClustering([]);
        setCustomerValueAnalyzerPositioning([]);
        setCustomerValueAnalyzerFinalReport({});
        setCustomerValueAnalyzerSelectedPersona([]);
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);
        setCustomerValueAnalyzerInfo({
          business: chatData?.business,
          targetList: chatData?.targetList,
          analysisScope: chatData?.analysisScope,
          analysisPurpose: chatData?.analysisPurpose,
        });
        setCustomerValueAnalyzerPersona(chatData?.customerValuePersona || []);
        setCustomerValueAnalyzerJourneyMap(
          chatData?.customerValueJourneyMap || []
        );
        setCustomerValueAnalyzerSelectedPersona(
          chatData?.selectedCustomerValuePersona || []
        );
        setCustomerValueAnalyzerFactor(chatData?.customerValueFactor || []);
        setCustomerValueAnalyzerClustering(
          chatData?.customerValueClustering || []
        );
        // setCustomerValueAnalyzerSelectedFactor(
        //   chatData.customer_value_selected_factor || []
        // );
        setCustomerValueAnalyzerPositioning(
          chatData?.customerValuePositioning || []
        );
        setCustomerValueAnalyzerFinalReport(
          chatData?.customerValueFinalReport || {}
        );
        setToolLoading(true);
        setIdeaGeneratorInfo({});
        setIdeaGeneratorPersona([]);
        setIdeaGeneratorIdea([]);
        setIdeaGeneratorClustering([]);
        setIdeaGeneratorFinalReport({});
        setIdeaGeneratorSelectedPersona([]);
        setIdeaGeneratorKnowTarget(null);
        setIdeaGeneratorPurpose("");

        setIdeaGeneratorInfo({
          business: chatData?.business,
          coreValue: chatData?.coreValue,
        });

        setIdeaGeneratorPersona(chatData?.ideaGeneratorPersona || []);
        setIdeaGeneratorIdea(chatData?.ideaGeneratorIdea || []);
        setIdeaGeneratorClustering(chatData?.ideaGeneratorClustering || []);
        setIdeaGeneratorFinalReport(chatData?.ideaGeneratorFinalReport || {});
        setIdeaGeneratorSelectedPersona(
          chatData?.ideaGeneratorSelectedPersona || []
        );
        setIdeaGeneratorKnowTarget(chatData?.ideaGeneratorKnowTarget);
        setIdeaGeneratorPurpose(chatData?.purpose);

        setDesignAnalysisEmotionAnalysis([]);
        setDesignAnalysisBusinessInfo("");
        setDesignAnalysisUploadedFiles([]);
        setDesignAnalysisFileId([]);
        setDesignAnalysisSelectedPersona([]);
        setDesignAnalysisEmotionTarget({});
        setDesignAnalysisEmotionScale([]);
        setDesignAnalysisFileNames([]);
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);
        setDesignAnalysisEmotionAnalysis(chatData?.designEmotionAnalysis || []);
        setDesignAnalysisBusinessInfo(chatData?.business || "");
        setDesignAnalysisSelectedPersona(chatData?.designSelectedPersona || []);
        setDesignAnalysisEmotionTarget(chatData?.designEmotionTarget || {});
        setDesignAnalysisEmotionScale(chatData?.designEmotionScale || []);
        setDesignAnalysisFileNames(
          chatData?.imageName?.map((item) => item.name) || []
        );
        setDesignAnalysisFileId(
          chatData?.imageName?.map((item) => item.id) || []
        );
        setToolLoading(true);

        if (chatData.isMarketing) {
          const updatedConversation = [...chatData.conversation];

          if (
            updatedConversation.length > 0 &&
            updatedConversation[updatedConversation.length - 1].type ===
              "marketingSignUpButton"
          ) {
            updatedConversation.pop();
            updatedConversation.pop();
          }

          setConversation(updatedConversation);
          saveConversation({
            changingConversation: {
              conversation: updatedConversation,
              conversationId: chatData.id,
              timestamp: chatData.timestamp,
              isMarketing: chatData.isMarketing,
              expert_index: chatData.expert_index,
              inputBusinessInfo: chatData.inputBusinessInfo,
              analysisReportData: chatData.analysisReportData,
              conversationStage: chatData.conversationStage,
              title: chatData.analysisReportData.title,
              mainFeatures: chatData.analysisReportData.mainFeatures,
              marketingMbtiResult: chatData.marketingMbtiResult,
              marketingResearchReportData: chatData.marketingResearchReportData,
              marketingBmReportData: chatData.marketingBmReportData,
              marketingCustomerData: chatData.marketingCustomerData,
              marketingSelectedCustomer: chatData.marketingSelectedCustomer,
              marketingFinalCustomer: chatData.marketingFinalCustomer,
              marketingFinalReportData: chatData.marketingFinalReportData,
            },
          });
        }

        // 어프로치 패스 추가 필요(보고서만 뽑고 나온 뒤에 들어가면 버튼만 추가되어 보이게)
        // set어프로치패스(2)
        setApproachPath(2);

        setIsEditingNow(false);
        setIsEditingIdeaFeature(false);
        setIsEditingIdeaCustomer(false);
        setAddingIdeaFeature(false);
        setActiveIdeaFeatureIndex(0);
        setAddContentIdeaFeature("");
        setEditedIdeaFeatureTitle("");
        setAddingIdeaCustomer(false);
        setActiveIdeaCustomerIndex(0);
        setAddContentIdeaCustomer("");
        setEditedIdeaCustomerTitle("");
        setAnalysisButtonState(0);
        setExpertButtonState(0);
        setAdditionButtonState(0);
        setCustomerAdditionButtonState(0);
        setIsExpertInsightAccessible(true); // 접근 가능 상태로 설정

        // 페이지를 대화가 이어지는 형태로 전환
        // navigate(`/TargetDiscovery`);

        if (chatData.type === "ix_customer_value_persona") {
          setToolLoading(true);
          navigate("/CustomerValueAnalyzer");
        } else if (chatData.type === "ix_idea_generator_persona") {
          setToolLoading(true);
          navigate("/IdeaGenerator");
        } else if (chatData.type === "ix_target_discovery_persona") {
          setToolLoading(true);
          navigate("/TargetDiscovery");
        } else if (chatData.type === "ix_design_emotion_analysis") {
          setToolLoading(true);
          navigate("/DesignAnalysis");
        }
      } catch (error) {
        console.error("대화 내용 가져오기 오류:", error);
      }
    }
  };

  return (
    <RecentToolWrap>
      {toolListSaas?.length > 0 ? (
        <Table>
          <colgroup>
            <col width="20%" />
            <col />
            <col width="10%" />
            <col width="15%" />
            <col width="10%" />
          </colgroup>

          <TableHeader Type1>
            <tr>
              <th>
                <Body1 color="gray700" align="left">
                  리서치 툴 명
                </Body1>
              </th>
              <th>
                <Body1 color="gray700" align="left">
                  상세 내용
                </Body1>
              </th>
              <th>
                <Body1 color="gray700" align="left">
                  현황
                </Body1>
              </th>
              <th>
                <Body1 color="gray700" align="left">
                  진행 일시
                </Body1>
              </th>
              <th>
                <Body1 color="gray700" align="left">
                  상세보기
                </Body1>
              </th>
            </tr>
          </TableHeader>

          <TableBody Type1>
            {toolListSaas.map((tool, index) => (
              <tr key={index}>
                <td>
                  <Body2 color="gray700" align="left">
                    {getToolName(tool)}
                  </Body2>
                </td>
                <td>
                  <Body2 color="gray700" align="left">
                    {getToolDescription(tool)}
                  </Body2>
                </td>
                <td>
                  <Body2 color="gray700" align="left">
                    {tool.status || "완료"}
                  </Body2>
                </td>
                <td>
                  <Body2 color="gray700" align="left">
                    {formatDate(tool.timestamp)}
                  </Body2>
                </td>
                <td>
                  <Button
                    Medium
                    Outline
                    Fill
                    onClick={() =>
                      handleConversationClick(
                        tool._id || tool.id,
                        tool.type || "expert"
                      )
                    }
                  >
                    <InputText color="gray700">자세히 보기</InputText>
                  </Button>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoDataWrap onClick={() => navigate("/Tool")}>
          <div>
            <img src={images.Tools} alt="" />
            <Body2 color="gray500">
              AI 기반 리서치, 어디까지 해보셨나요? 다양한 리서치 툴을 지금
              사용해보세요
              <br />
              (AI Persona 확인 후 리서치 툴을 사용하면 더 효과적입니다)
            </Body2>
            <Button Medium Outline Fill onClick={() => navigate("/Tool")}>
              <Caption1 color="gray700">리서치 툴 바로가기</Caption1>
            </Button>
          </div>
        </NoDataWrap>
      )}
    </RecentToolWrap>
  );
};

export default OrganismDashboardToolList;

const RecentToolWrap = styled.div`
  width: 100%;
`;

const NoDataWrap = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 130px 0 155px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    cursor: pointer;

    button {
      margin-top: 4px;
    }
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: ${palette.primary};
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }
  }
`;
