import React, { useState, useEffect } from "react";
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
import PopupWrap from "../../../../assets/styles/Popup";
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
  IS_PERSONA_ACCESSIBLE,
  PERSONA_STEP,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  REPORT_LOAD_BUTTON_STATE,
  PROJECT_SAAS,
} from "../../../AtomStates";

import {
  updateToolOnServer,
  updateProjectReportOnServer,
} from "../../../../utils/indexedDB";

const OrganismStorageBoxToolList = ({ toolListSaas }) => {
  const [projectSaas, setProjectSaas] = useAtom(PROJECT_SAAS);
  const project = projectSaas;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [localToolList, setLocalToolList] = useState(toolListSaas || []);

  useEffect(() => {
    setLocalToolList(toolListSaas);
  }, [toolListSaas]);
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

  const [reportLoadButtonState, setReportLoadButtonState] = useAtom(
    REPORT_LOAD_BUTTON_STATE
  );

  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [reportId, setReportId] = useAtom(PROJECT_REPORT_ID);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);

  const [deleteToolId, setDeleteToolId] = useState(null);
  const [deleteToolType, setDeleteToolType] = useState(null);

  const saveConversation = (data) => {
    // 대화 저장 로직 구현
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
    if (tool.interviewType)
      return tool.interviewType === "single" ? "심층 인터뷰" : "그룹 인터뷰";
    if (tool.chat_data?.expert_index) {
      switch (tool.chat_data.expert_index) {
        case "1":
          return "전략 컨설턴트";
        case "2":
          return "마케팅 전문가";
        case "3":
          return "고객 인사이트 전문가";
        case "4":
          return "PoC 설계 전문가";
        case "5":
          return "아이디어 디벨로퍼";
        case "6":
          return "그로스 해커";
        case "7":
          return "가격 분석 전문가";
        case "8":
          return "사례 분석 전문가";
        case "9":
          return "BM 전문가";
        case "10":
          return "조사 설계 전문가";
        default:
          return tool.chat_data.expert_index;
      }
    }
    return "상세 내용 없음";
  };

  //전문가 부분 누르면
  const getInitialSystemMessage = (index) => {
    switch (index) {
      case "1":
        return "안녕하세요! 저는 전략 컨설턴트 김도원입니다. \n고객 요구와 시장 현황을 파악하여, 성장을 위한 전략적 인사이트와 맞춤형 개선 방향을 지원하고 있습니다.";
      case "2":
        return "안녕하세요! 마케팅 전문가 이지현입니다. 😄 여러분의 아이디어를 효과적으로 시장에 알릴 수 있는 전략을 함께 고민해 보아요. 아이디어나 비즈니스 아이템을 여기에 작성해 주세요. 제가 분석하고, 효과적인 마케팅 전략 리포트를 준비해 드리겠습니다!";
      case "3":
        return "반갑습니다! 저는 고객 인사이트 전문가 박서연입니다. 😊 여러분의 비즈니스가 목표 고객에게 잘 다가갈 수 있도록 돕겠습니다. 아이디어나 비즈니스 아이템을 작성해 주세요. 분석 후, 타겟 고객을 정의하고 세분화 방법에 대한 리포트를 제공해 드리겠습니다!";
      case "4":
        return "안녕하세요! 저는 PoC 설계 전문가 장석훈입니다. 😊 여러분의 사업 목표에 맞춘 가설 설정과 PoC 전략을 설계하고, 성공적인 검증 과정을 지원해드립니다. 맞춤형 PoC 설계를 위해 몇가지 질문에 응답 부탁드립니다!";
      case "5":
        return "안녕하세요. 저는 아이디어 디벨로퍼 윤재민입니다.\n혼자 아이디어를 고민하다보면, 한정된 생각에 갇히기 쉽습니다. 제가 다각도로 사업 아이디어 발산을 돕고 우선순위 높은 아이디어를 선별해드려요. 아이템에 대한 설명을 해주세요 📝";
      case "6":
        return "안녕하세요. 저는 그로스 해커 김세준입니다.\n비즈니스에 적합한 성장을 목표로 데이터를 기반으로 실험하고 최적화된 전략을 제시하고 있습니다.";
      case "7":
        return "안녕하세요! 저는 가격 분석 전문가 한준혁입니다. 다양한 데이터 소스를 활용해 시장의 가격 변동을 분석하고, 적정 가격을 도출해드립니다. 경쟁사 동향과 시장 트렌드를 파악해 최적의 가격 전략을 세울 수 있도록 도와드려요.";
      case "8":
        return "안녕하세요! 저는 사례 분석 전문가 이민호입니다. 최신 데이터와 글로벌 사례등을 분석해 비즈니스에 도움을 드립니다.\n정확한 사례 분석을 위해 비즈니스 정보를 입력해 주세요 🔎";
      case "9":
        return "안녕하세요! 저는 BM 전문가 김소윤입니다.\n아이템에 최적화된 비즈니스 모델을 정의하고, 비즈니스 성과를 극대화 할 수 있도록 전략을 제안드립니다.";
      case "10":
        return "안녕하세요! 저는 조사 설계 전문가 김현우입니다.\n고객 요구와 시장 반응을 파악해 비즈니스 인사이트를 제공하고, 이를 통해 비즈니스 성장을 돕는 맞춤형 조사를 설계해드립니다. 조사 결과를 기반으로 전략적 개선 방향을 제시해 비즈니스 성과를 향상시킬 수 있습니다.\n먼저 분석이 필요한 제품이나 서비스에 대해서 알려주세요 📝";
      default:
        return "비즈니스(아이디어)를 입력해주세요.";
    }
  };
  // 툴 설명 가져오기 함수
  const getToolDescription = (tool) => {
    if (tool.type) {
      switch (tool.type) {
        case "ix_target_discovery_persona":
          return tool.specificSituation || "상세 내용 없음";
        case "ix_customer_value_persona":
          return (tool.analysisScope?.split("|")[0] || "상세 내용 없음").trim();
        case "ix_idea_generator_persona":
          return (
            `${tool.coreValue?.[0]} 외 ${tool.coreValue?.length - 1}개` ||
            "상세 내용 없음"
          );
        case "ix_design_emotion_analysis":
          return tool.imageName?.[0]?.name || "상세 내용 없음";
        default:
          return tool.type;
      }
    }
    if (tool.interviewType)
      return tool.interviewType === "single"
        ? tool.reportTitle
        : tool.theoryType;
    if (tool.chat_data?.expert_index) {
      switch (tool.chat_data.expert_index) {
        case "1":
          return "시장 내 경쟁 우위 방안 보고서";
        case "2":
          return "마케팅 전문가";
        case "3":
          return "고객 인사이트 전문가";
        case "4":
          return "PoC 설계 전문가";
        case "5":
          return "아이디어 디벨로퍼";
        case "6":
          return "최적화된 전략을 제시";
        case "7":
          return "제품/서비스 분석 보고서";
        case "8":
          return "사례 분석 전문가";
        case "9":
          return "린 캔버스 vs 비즈니스 모델 캔버스 매칭 분석";
        case "10":
          return "조사 설계 전문가";
        default:
          return tool.chat_data.expert_index;
      }
    }
    return "상세 내용 없음";
  };
  // 툴 설명 가져오기 함수
  const getToolStatus = (tool) => {
    if (tool.type) {
      switch (tool.type) {
        case "ix_target_discovery_persona":
          return tool.completedStep === 4 ? "완료" : "진행중";
        case "ix_customer_value_persona":
          return tool.completedStep === 4 ? "완료" : "진행중";
        case "ix_idea_generator_persona":
          return tool.completedStep === 4 ? "완료" : "진행중";
        case "ix_design_emotion_analysis":
          return tool.completedStep === 3 ? "완료" : "진행중";
        default:
          return "-";
      }
    }
    if (tool.interviewType) return "완료";
    if (tool.chat_data?.expert_index) return "-";
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

    if (conversationType === "chat") {
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

        // console.log("🚀 ~ handleConversationClick ~ chatData:", chatData);
        // 페이지를 대화가 이어지는 형태로 전환
        navigate(`/ExpertInsight`);
      } catch (error) {
        // console.error("대화 내용 가져오기 오류:", error);
      }
    } else if (conversationType === "tool") {
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
      } catch (error) {}
    } else if (conversationType === "interviewSingle") {
      // console.log("🚀 ~ navigateToInterviewReportPage ~ reportId:", reportId);
      setProjectId(project._id);
      setReportId(conversationId);
      // setPersonaStep(4);
      setReportLoadButtonState(true);
      setIsPersonaAccessible(true);

      setPersonaStep(4);

      navigate(`/Persona/4/Single`);
    } else if (conversationType === "interviewGroup") {
      // console.log("🚀 ~ navigateToInterviewReportPage ~ reportId:", reportId);
      setProjectId(project._id);
      setReportId(conversationId);
      // setPersonaStep(4);
      setReportLoadButtonState(true);
      setIsPersonaAccessible(true);

      setPersonaStep(4);
      navigate(`/Persona/4`);
    }
  };

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handleDeleteClose = () => {
    setIsDeletePopupOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeletePopupOpen(false);

    if (
      deleteToolType === "interviewSingle" ||
      deleteToolType === "interviewGroup"
    ) {
      await updateProjectReportOnServer(
        deleteToolId,
        {
          deleteState: 1,
        },
        true
      );
    } else if (deleteToolType === "chat") {
      // 서버에서 채팅 삭제 (deleteState를 1로 설정)
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        await axios.put(
          `https://wishresearch.kr/panels/update_chat`,
          {
            id: deleteToolId,
            deleteState: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("채팅 삭제 중 오류 발생:", error);
      }
    } else if (deleteToolType === "tool") {
      await updateToolOnServer(deleteToolId, {
        deleteState: 1,
      });
    }
    // 로컬 상태에서 삭제된 툴 제거
    setLocalToolList((prevList) =>
      prevList.filter((tool) => (tool._id || tool.id) !== deleteToolId)
    );
  };

  const hadleDeleteTool = async (toolId, toolType) => {
    setIsDeletePopupOpen(true);
    setDeleteToolId(toolId);
    setDeleteToolType(toolType);
  };

  return (
    <>
      <RecentToolWrap>
        {localToolList?.length > 0 ? (
          <Table>
            <colgroup>
              <col width="20%" />
              <col />
              <col width="10%" />
              <col width="15%" />
              <col width="12%" />
              <col width="5%" />
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
                  <Body1 color="gray700" align="center">
                    현황
                  </Body1>
                </th>
                <th>
                  <Body1 color="gray700" align="center">
                    진행 일시
                  </Body1>
                </th>
                <th>
                  <Body1 color="gray700" align="center">
                    상세보기
                  </Body1>
                </th>
                <th>&nbsp;</th>
              </tr>
            </TableHeader>

            <TableBody Type1 Border>
              {localToolList.map((tool, index) => (
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
                    <Body2 color="gray700" align="center">
                      {getToolStatus(tool)}
                    </Body2>
                  </td>
                  <td>
                    <Body2 color="gray700" align="center">
                      {formatDate(tool.timestamp)}
                    </Body2>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      Medium
                      Outline
                      Fill
                      onClick={() =>
                        handleConversationClick(
                          tool._id || tool.id,
                          tool.toolType
                        )
                      }
                    >
                      <InputText color="gray700">자세히 보기</InputText>
                    </Button>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      None
                      onClick={() => hadleDeleteTool(tool._id, tool.toolType)}
                    >
                      <img src={images.Trash} alt="" />
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

      {isDeletePopupOpen && (
        <PopupWrap
          Warning
          title="정말 삭제하시겠습니까?"
          message="삭제된 항목은 임시 삭제함에서 복구 가능합니다."
          buttonType="Outline"
          closeText="취소"
          confirmText="확인"
          isModal={false}
          onCancel={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};

export default OrganismStorageBoxToolList;

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
