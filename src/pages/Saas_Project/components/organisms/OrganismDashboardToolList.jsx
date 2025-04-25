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
  IDEA_GENERATOR_EDITING_BUSINESS_TEXT,
  DESIGN_ANALYSIS_EMOTION_ANALYSIS,
  DESIGN_ANALYSIS_BUSINESS_INFO,
  DESIGN_ANALYSIS_UPLOADED_FILES,
  DESIGN_ANALYSIS_FILE_ID,
  DESIGN_ANALYSIS_SELECTED_PERSONA,
  DESIGN_ANALYSIS_EMOTION_TARGET,
  DESIGN_ANALYSIS_EMOTION_SCALE,
  DESIGN_ANALYSIS_FILE_NAMES,
  IDEA_GENERATOR_PURPOSE,
  REPORT_LOAD_BUTTON_STATE,
  PROJECT_REPORT_ID,
  PROJECT_ID,
  IS_PERSONA_ACCESSIBLE,
  PERSONA_STEP,
  PROJECT_SAAS,
  PSST_REPORT,
  PSST_SELECTED_TEMPLETE,
  PSST_BUSINESS_INFO,
  PROJECT_ANALYSIS_MULTIMODAL,
  PSST_ANALYSIS_RESULTS,
  PSST_FILE_NAMES,
  PROJECT_ANALYSIS_MULTIMODAL_DESCRIPTION,
  PROJECT_ANALYSIS_MULTIMODAL_KEYMESSAGE,
  QUICK_SURVEY_PROJECT_DESCRIPTION,
  QUICK_SURVEY_ANALYSIS,
  QUICK_SURVEY_CUSTOM_GUIDE,
  QUICK_SURVEY_PRESET_DATA,
  QUICK_SURVEY_PERSONA_GROUP,
  QUICK_SURVEY_INTERVIEW,
  QUICK_SURVEY_REPORT,
  QUICK_SURVEY_STATIC_DATA,
  QUICK_SURVEY_SURVEY_METHOD,
  QUICK_SURVEY_SELECTED_QUESTION,
  QUICK_SURVEY_DETAIL_INFO,
  QUICK_SURVEY_RECRUITING_CONDITION,
  QUICK_SURVEY_INTERVIEW_MODE_TYPE,
  CUSTOMER_JOURNEY_MAP_MOMENT_ANALYSIS,
  CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA,
  CUSTOMER_JOURNEY_MAP_REPORT,
  CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION,
  CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION_INDEX,
  IDEA_GENERATION_PROBLEM_LIST,
  IDEA_GENERATION_PROBLEM_LIST_TITLE,
  IDEA_GENERATION_START_POSITION,
  IDEA_GENERATION_MANDALART_DATA,
  IDEA_GENERATION_SELECTED_START_POSITION,
  IDEA_GENERATION_SELECTED_MANDALART,
  IDEA_GENERATION_POSSSESSION_TECH,
  IDEA_GENERATION_SELECTED_PURPOSE,
  KANO_MODEL_SELECTED_IDEA,
  KANO_MODEL_CLUSTERING,
  KANO_MODEL_CLUSTERING_NAME,
  KANO_MODEL_EVALUATION,
  KANO_MODEL_PRODUCT_ANALYSIS,
  KANO_MODEL_GRAPH_DATA,
  IDEA_EVALUATE_LIST,
  IDEA_EVALUATE_SELECTED_LIST,
  IDEA_EVALUATE_COMPARISON_EDUCATION,
  IDEA_EVALUATE_SELECTED_KANO_MODEL,
  IDEA_EVALUATE_SELECTED_KANO_MODEL_INDEX,
  IDEA_EVALUATE_SELECTED_LIST_INDEX,
  CONCEPT_DEFINITION_SELECTED_PURPOSE,
  CONCEPT_DEFINITION_SELECTED_PERSONA,
  CONCEPT_DEFINITION_FIRST_REPORT,
  CONCEPT_DEFINITION_FINAL_REPORT,
  ISSUE_GENERATION_SELECTED_PURPOSE,
  ISSUE_GENERATION_PROBLEM_LIST,
  ISSUE_GENERATION_PROBLEM_LIST_TITLE,
  ISSUE_GENERATION_START_POSITION,
  ISSUE_GENERATION_SELECTED_START_POSITION,
  ISSUE_GENERATION_LIST,
  KEYWORDS_GENERATION_SELECTED_ISSUE,
  KEYWORDS_GENERATION_SELECTED_ISSUE_INDEX,
  KEYWORDS_GENERATION_TAG,

} from "../../../../pages/AtomStates";

const OrganismDashboardToolList = ({ toolListSaas }) => {
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const project = projectSaas;
  const navigate = useNavigate();
  const [isLoading] = React.useState(false);
  const [isLoggedIn] = React.useState(false);

  // 상태 변수들 정의
  const [, setSavedTimestamp] = useAtom(SAVED_TIMESTAMP);
  const [, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [, setConversationId] = useAtom(CONVERSATION_ID);
  const [, setConversation] = useAtom(CONVERSATION);
  const [, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [, setMainFeaturesOfBusinessInformation] = useAtom(
    MAIN_FEATURES_OF_BUSINESS_INFORMATION
  );
  const [, setMainCharacteristicOfBusinessInformation] = useAtom(
    MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION
  );
  const [, setBusinessInformationTargetCustomer] = useAtom(
    BUSINESS_INFORMATION_TARGET_CUSTOMER
  );
  const [, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA);
  const [, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [, setAdditionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);
  const [, setCustomerAdditionalReportData] = useAtom(
    CUSTOMER_ADDITIONAL_REPORT_DATA
  );
  const [, setSelectedCustomerAdditionalKeyword] = useAtom(
    SELECTED_CUSTOMER_ADDITIONAL_KEYWORD
  );
  const [, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);
  const [, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [, setPocDetailReportData] = useAtom(POC_DETAIL_REPORT_DATA);
  const [, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [, setIdeaFeatureDataTemp] = useAtom(IDEA_FEATURE_DATA_TEMP);
  const [, setIdeaRequirementDataTemp] = useAtom(IDEA_REQUIREMENT_DATA_TEMP);
  const [, setIdeaList] = useAtom(IDEA_LIST);
  const [, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [, setIdeaPriority] = useAtom(IDEA_PRIORITY);
  const [, setIdeaMiroState] = useAtom(IDEA_MIRO_STATE);
  const [, setButtonState] = useAtom(BUTTON_STATE);
  const [, setGrowthHackerRecommendedSolution] = useAtom(
    GROWTH_HACKER_RECOMMENDED_SOLUTION
  );
  const [, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [, setGrowthHackerDetailReportData] = useAtom(
    GROWTH_HACKER_DETAIL_REPORT_DATA
  );
  const [, setGrowthHackerSelectedSolution] = useAtom(
    GROWTH_HACKER_SELECTED_SOLUTION
  );
  const [, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [, setPriceSelectedProductSegmentation] = useAtom(
    PRICE_SELECTED_PRODUCT_SEGMENTATION
  );
  const [, setPriceProductSegmentation] = useAtom(PRICE_PRODUCT_SEGMENTATION);
  const [, setCaseReportData] = useAtom(CASE_REPORT_DATA);
  const [, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [, setSurveyGuidelineDetailReportData] = useAtom(
    SURVEY_GUIDELINE_DETAIL_REPORT_DATA
  );
  const [, setSurveyGuidelineReportData] = useAtom(
    SURVEY_GUIDELINE_REPORT_DATA
  );
  const [, setSurveyGoalSuggestionList] = useAtom(SURVEY_GOAL_SUGGESTION_LIST);
  const [, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [, setSurveyQuestionList] = useAtom(SURVEY_QUESTION_LIST);
  const [, setBmModelSuggestionReportData] = useAtom(
    BM_MODEL_SUGGESTION_REPORT_DATA
  );
  const [, setBmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [, setBmSelectedProblemOptions] = useAtom(BM_SELECTED_PROBLEM_OPTIONS);
  const [, setBmOrLean] = useAtom(BM_OR_LEAN);
  const [, setBmBmAutoReportData] = useAtom(BM_BM_AUTO_REPORT_DATA);
  const [, setBmLeanAutoReportData] = useAtom(BM_LEAN_AUTO_REPORT_DATA);
  const [, setBmBmAdsReportData] = useAtom(BM_BM_ADS_REPORT_DATA);
  const [, setBmLeanAdsReportData] = useAtom(BM_LEAN_ADS_REPORT_DATA);
  const [, setBmBmCustomReportData] = useAtom(BM_BM_CUSTOM_REPORT_DATA);
  const [, setBmLeanCustomReportData] = useAtom(BM_LEAN_CUSTOM_REPORT_DATA);
  const [, setIsMarketing] = useAtom(IS_MARKETING);
  const [, setMarketingMbtiResult] = useAtom(MARKETING_MBTI_RESULT);
  const [, setMarketingResearchReportData] = useAtom(
    MARKETING_RESEARCH_REPORT_DATA
  );
  const [, setMarketingBmReportData] = useAtom(MARKETING_BM_REPORT_DATA);
  const [, setMarketingCustomerData] = useAtom(MARKETING_CUSTOMER_DATA);
  const [, setMarketingSelectedCustomer] = useAtom(MARKETING_SELECTED_CUSTOMER);
  const [, setMarketingFinalCustomer] = useAtom(MARKETING_FINAL_CUSTOMER);
  const [, setMarketingFinalReportData] = useAtom(MARKETING_FINAL_REPORT_DATA);
  const [, setStrategyConsultantReportData] = useAtom(
    STRATEGY_CONSULTANT_REPORT_DATA
  );
  const [, setApproachPath] = useAtom(APPROACH_PATH);
  const [, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [, setIsEditingIdeaFeature] = useAtom(IS_EDITING_IDEA_FEATURE);
  const [, setIsEditingIdeaCustomer] = useAtom(IS_EDITING_IDEA_CUSTOMER);
  const [, setAddingIdeaFeature] = useAtom(ADDING_IDEA_FEATURE);
  const [, setActiveIdeaFeatureIndex] = useAtom(ACTIVE_IDEA_FEATURE_INDEX);
  const [, setAddContentIdeaFeature] = useAtom(ADD_CONTENT_IDEA_FEATURE);
  const [, setEditedIdeaFeatureTitle] = useAtom(EDITED_IDEA_FEATURE_TITLE);
  const [, setAddingIdeaCustomer] = useAtom(ADDING_IDEA_CUSTOMER);
  const [, setActiveIdeaCustomerIndex] = useAtom(ACTIVE_IDEA_CUSTOMER_INDEX);
  const [, setAddContentIdeaCustomer] = useAtom(ADD_CONTENT_IDEA_CUSTOMER);
  const [, setEditedIdeaCustomerTitle] = useAtom(EDITED_IDEA_CUSTOMER_TITLE);
  const [, setAnalysisButtonState] = useAtom(ANALYSIS_BUTTON_STATE);
  const [, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE);
  const [, setAdditionButtonState] = useAtom(ADDITION_BUTTON_STATE);
  const [, setCustomerAdditionButtonState] = useAtom(
    CUSTOMER_ADDITION_BUTTON_STATE
  );
  const [, setIsExpertInsightAccessible] = useAtom(
    IS_EXPERT_INSIGHT_ACCESSIBLE
  );

  const [, setToolStep] = useAtom(TOOL_STEP);
  const [, setToolId] = useAtom(TOOL_ID);
  const [, setTargetDiscoveryInfo] = useAtom(TARGET_DISCOVERY_INFO);
  const [, setTargetDiscoveryPersona] = useAtom(TARGET_DISCOVERY_PERSONA);
  const [, setTargetDiscoveryScenario] = useAtom(TARGET_DISCOVERY_SCENARIO);
  const [, setTargetDiscoveryFinalReport] = useAtom(
    TARGET_DISCOVERY_FINAL_REPORT
  );
  const [, setToolLoading] = useAtom(TOOL_LOADING);
  const [, setCustomerValueAnalyzerInfo] = useAtom(
    CUSTOMER_VALUE_ANALYZER_INFO
  );
  const [, setCustomerValueAnalyzerPersona] = useAtom(
    CUSTOMER_VALUE_ANALYZER_PERSONA
  );
  const [, setCustomerValueAnalyzerJourneyMap] = useAtom(
    CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP
  );
  const [, setCustomerValueAnalyzerFactor] = useAtom(
    CUSTOMER_VALUE_ANALYZER_FACTOR
  );
  const [, setCustomerValueAnalyzerClustering] = useAtom(
    CUSTOMER_VALUE_ANALYZER_CLUSTERING
  );
  const [, setCustomerValueAnalyzerPositioning] = useAtom(
    CUSTOMER_VALUE_ANALYZER_POSITIONING
  );
  const [, setCustomerValueAnalyzerFinalReport] = useAtom(
    CUSTOMER_VALUE_ANALYZER_FINAL_REPORT
  );
  const [, setCustomerValueAnalyzerSelectedPersona] = useAtom(
    CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA
  );
  const [, setDesignAnalysisEmotionAnalysis] = useAtom(
    DESIGN_ANALYSIS_EMOTION_ANALYSIS
  );
  const [, setDesignAnalysisBusinessInfo] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_INFO
  );
  const [, setDesignAnalysisUploadedFiles] = useAtom(
    DESIGN_ANALYSIS_UPLOADED_FILES
  );
  const [, setDesignAnalysisFileId] = useAtom(DESIGN_ANALYSIS_FILE_ID);
  const [, setDesignAnalysisSelectedPersona] = useAtom(
    DESIGN_ANALYSIS_SELECTED_PERSONA
  );
  const [, setDesignAnalysisEmotionTarget] = useAtom(
    DESIGN_ANALYSIS_EMOTION_TARGET
  );
  const [, setDesignAnalysisEmotionScale] = useAtom(
    DESIGN_ANALYSIS_EMOTION_SCALE
  );
  const [, setDesignAnalysisFileNames] = useAtom(DESIGN_ANALYSIS_FILE_NAMES);
  const [, setIdeaGeneratorInfo] = useAtom(IDEA_GENERATOR_INFO);
  const [, setIdeaGeneratorPersona] = useAtom(IDEA_GENERATOR_PERSONA);
  const [, setIdeaGeneratorIdea] = useAtom(IDEA_GENERATOR_IDEA);
  const [, setIdeaGeneratorClustering] = useAtom(IDEA_GENERATOR_CLUSTERING);
  const [, setIdeaGeneratorFinalReport] = useAtom(IDEA_GENERATOR_FINAL_REPORT);
  const [, setIdeaGeneratorSelectedPersona] = useAtom(
    IDEA_GENERATOR_SELECTED_PERSONA
  );
  const [, setIdeaGeneratorKnowTarget] = useAtom(IDEA_GENERATOR_KNOW_TARGET);
  const [, setIdeaGeneratorPurpose] = useAtom(IDEA_GENERATOR_PURPOSE);
  const [, setIdeaGeneratorEditingBusinessText] = useAtom(
    IDEA_GENERATOR_EDITING_BUSINESS_TEXT
  );
  const [, setReportLoadButtonState] = useAtom(REPORT_LOAD_BUTTON_STATE);
  const [, setIsPersonaAccessible] = useAtom(IS_PERSONA_ACCESSIBLE);
  const [, setReportId] = useAtom(PROJECT_REPORT_ID);
  const [, setPersonaStep] = useAtom(PERSONA_STEP);
  const [, setProjectId] = useAtom(PROJECT_ID);

  const [, setPsstBusinessInfo] = useAtom(PSST_BUSINESS_INFO);
  const [, setProjectAnalysisMultimodal] = useAtom(PROJECT_ANALYSIS_MULTIMODAL);
  const [, setPsstAnalysisResults] = useAtom(PSST_ANALYSIS_RESULTS);
  const [, setPsstReport] = useAtom(PSST_REPORT);
  const [, setPsstSelectedTemplete] = useAtom(PSST_SELECTED_TEMPLETE);
  const [, setPsstFileNames] = useAtom(PSST_FILE_NAMES);
  const [, setProjectAnalysisMultimodalDescription] = useAtom(
    PROJECT_ANALYSIS_MULTIMODAL_DESCRIPTION
  );
  const [, setProjectAnalysisMultimodalKeyMessage] = useAtom(
    PROJECT_ANALYSIS_MULTIMODAL_KEYMESSAGE
  );
  const [, setQuickSurveyProjectDescription] = useAtom(
    QUICK_SURVEY_PROJECT_DESCRIPTION
  );
  const [, setQuickSurveySelectedQuestion] = useAtom(
    QUICK_SURVEY_SELECTED_QUESTION
  );
  const [, setQuickSurveyAnalysis] = useAtom(QUICK_SURVEY_ANALYSIS);
  const [, setQuickSurveyCustomGuide] = useAtom(QUICK_SURVEY_CUSTOM_GUIDE);
  const [, setQuickSurveyPresetData] = useAtom(QUICK_SURVEY_PRESET_DATA);
  const [, setquickSurveyPersonaGroup] = useAtom(QUICK_SURVEY_PERSONA_GROUP);
  const [, setQuickSurveyInterview] = useAtom(QUICK_SURVEY_INTERVIEW);
  const [, setQuickSurveySurveyMethod] = useAtom(QUICK_SURVEY_SURVEY_METHOD);
  const [, setQuickSurveyReport] = useAtom(QUICK_SURVEY_REPORT);
  const [, setQuickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);
  const [, setQuickSurveyDetailInfo] = useAtom(QUICK_SURVEY_DETAIL_INFO);
  const [, setQuickSurveyRecruitingCondition] = useAtom(
    QUICK_SURVEY_RECRUITING_CONDITION
  );
  const [, setQuickSurveyInterviewModeType] = useAtom(
    QUICK_SURVEY_INTERVIEW_MODE_TYPE
  );

  //!Education Tool
  const [, setCustomerJourneyMapMomentAnalysis] = useAtom(CUSTOMER_JOURNEY_MAP_MOMENT_ANALYSIS);
  const [, setCustomerJourneyMapSelectedPersona] = useAtom(CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA);
  const [, setCustomerJourneyMapReport] = useAtom(CUSTOMER_JOURNEY_MAP_REPORT);
  const [, setCustomerJourneyMapSelectedDirection] = useAtom(CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION);
  const [, setCustomerJourneyMapSelectedDirectionIndex] = useAtom(CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION_INDEX);

  const [, setIssueGenerationSelectedPurpose] = useAtom(ISSUE_GENERATION_SELECTED_PURPOSE); 
  const [, setIssueGenerationProblemList] = useAtom(ISSUE_GENERATION_PROBLEM_LIST);
  const [, setIssueGenerationProblemListTitle] = useAtom(ISSUE_GENERATION_PROBLEM_LIST_TITLE);
  const [, setIssueGenerationStartPosition] = useAtom(ISSUE_GENERATION_START_POSITION);
  const [, setIssueGenerationSelectedStartPosition] = useAtom(ISSUE_GENERATION_SELECTED_START_POSITION);

  const [, setIssueGenerationList] = useAtom(ISSUE_GENERATION_LIST);
  const [, setKeywordsGenerationSelectedIssue] = useAtom(KEYWORDS_GENERATION_SELECTED_ISSUE); 
  const [, setKeywordsGenerationSelectedIssueIndex] = useAtom(KEYWORDS_GENERATION_SELECTED_ISSUE_INDEX);
  const [, setKeywordsGenerationTag] = useAtom(KEYWORDS_GENERATION_TAG);

  const [, setIdeaGenerationSelectedPurpose] = useAtom(IDEA_GENERATION_SELECTED_PURPOSE);
  const [, setIdeaGenerationProblemList] = useAtom(IDEA_GENERATION_PROBLEM_LIST);
  const [, setIdeaGenerationProblemListTitle] = useAtom(IDEA_GENERATION_PROBLEM_LIST_TITLE);
  const [, setIdeaGenerationStartPosition] = useAtom(IDEA_GENERATION_START_POSITION);
  const [, setIdeaGenerationMandalartData] = useAtom(IDEA_GENERATION_MANDALART_DATA);
  const [, setIdeaGenerationSelectedStartPosition] = useAtom(IDEA_GENERATION_SELECTED_START_POSITION);
  const [, setIdeaGenerationSelectedMandalart] = useAtom(IDEA_GENERATION_SELECTED_MANDALART);
  const [, setIdeaGenerationPossessionTech] = useAtom(IDEA_GENERATION_POSSSESSION_TECH);

  const [,   setSelectedKanoModelIdea] = useAtom(KANO_MODEL_SELECTED_IDEA);
  const [, setKanoModelClustering] = useAtom(KANO_MODEL_CLUSTERING);
  const [, setKanoModelClusteringName] = useAtom(KANO_MODEL_CLUSTERING_NAME);
  const [, setKanoModelEvaluation] = useAtom(KANO_MODEL_EVALUATION);
  const [, setKanoModelProductAnalysis] = useAtom(KANO_MODEL_PRODUCT_ANALYSIS);
  const [, setKanoModelGraphData] = useAtom(KANO_MODEL_GRAPH_DATA);

  const [, setIdeaEvaluateSelectedKanoModel] = useAtom(IDEA_EVALUATE_SELECTED_KANO_MODEL);
  const [, setIdeaEvaluateSelectedKanoModelIndex] = useAtom(IDEA_EVALUATE_SELECTED_KANO_MODEL_INDEX);
  const [, setIdeaEvaluateList] = useAtom(IDEA_EVALUATE_LIST);
  const [, setIdeaEvaluateSelectedList] = useAtom(IDEA_EVALUATE_SELECTED_LIST);
  const [, setIdeaEvaluateComparisonEducation] = useAtom(IDEA_EVALUATE_COMPARISON_EDUCATION);
  const [, setIdeaEvaluateSelectedListIndex] = useAtom(IDEA_EVALUATE_SELECTED_LIST_INDEX);

  const [, setConceptDefinitionSelectedPersona] = useAtom(CONCEPT_DEFINITION_SELECTED_PERSONA);
  const [, setConceptDefinitionSelectedPurpose] = useAtom(CONCEPT_DEFINITION_SELECTED_PURPOSE);
  const [, setConceptDefinitionFirstReport] = useAtom(CONCEPT_DEFINITION_FIRST_REPORT);
  const [, setConceptDefinitionFinalReport] = useAtom(CONCEPT_DEFINITION_FINAL_REPORT);

  const saveConversation = (data) => {};

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
        case "ix_psst_multimodal":
          return "보고서 생성기";
        case "ix_quick_survey_question":
          return "퀵 서베이";
        case "ix_customer_journey_map_education":
          return "고객 여정 맵 분석기";
        case "ix_idea_generation_education":
          return "아이디어 발상";
        case "ix_kano_model_education":
          return "Kano Model";
        case "ix_idea_evaluation_education":
          return "아이디어 평가";
        case "ix_concept_definition_education":
          return "컨셉 정의서";
        case "ix_issue_generation_education":
          return "핵심 이슈 도출";
        case "ix_needs_keywords_generation_education":
          return "문제점 & 니즈 키워드 생성";
        default:
          return tool.type;
      }
    }
    if (tool.interviewType)
      return tool.interviewType === "single"
        ? "심층 인터뷰(모더레이터)"
        : tool.interviewType === "multiple"
        ? "그룹 인터뷰"
        : "심층 인터뷰(자율형)";
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
          return tool.coreValue?.length > 1
            ? `${tool.coreValue[0]} 외 ${tool.coreValue.length - 1}개`
            : tool.coreValue?.[0] || "상세 내용 없음";
        case "ix_design_emotion_analysis":
          return tool.imageName?.[0]?.name || "상세 내용 없음";
        case "ix_psst_multimodal":
          return (
            tool.fileName?.[0]?.name[0] ||
            (tool.selectedTemplete?.[0] == 0 ? "PSST 계획서" : "")
          );
        case "ix_quick_survey_question":
          return tool.goal || "상세 내용 없음";
        case "ix_customer_journey_map_education":
          return tool.fileName?.[0]?.name[0] || "상세 내용 없음";
        case "ix_idea_generation_education":
          return tool.fileName?.[0]?.name[0] || "상세 내용 없음";
        case "ix_kano_model_education":
          return tool.fileName?.[0]?.name[0] || "상세 내용 없음";
        case "ix_idea_evaluation_education":
          return tool.fileName?.[0]?.name[0] || "상세 내용 없음";
        case "ix_concept_definition_education":
          return tool.fileName?.[0]?.name[0] || "상세 내용 없음";
        case "ix_issue_generation_education":
          return tool.fileName?.[0]?.name[0] || "상세 내용 없음";
        case "ix_needs_keywords_generation_education":
          return tool.fileName?.[0]?.name[0] || "상세 내용 없음";
        default:
          return tool.type;
      }
    }
    if (tool.interviewType)
      return tool.interviewType === "single" ||
        tool.interviewType === "singleLive"
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
        case "ix_psst_multimodal":
          return tool.completedStep === 3 ? "완료" : "진행중";
        case "ix_quick_survey_question":
          return tool.completedStep === 3 ? "완료" : "진행중";
        case "ix_customer_journey_map_education":
          return tool.completedStep === 3 ? "완료" : "진행중";
        case "ix_idea_generation_education":
          return tool.completedStep === 3 ? "완료" : "진행중";
        case "ix_kano_model_education":
          return tool.completedStep === 3 ? "완료" : "진행중";
        case "ix_idea_evaluation_education":
          return tool.completedStep === 3 ? "완료" : "진행중";
        case "ix_issue_generation_education":
          return tool.completedStep === 3 ? "완료" : "진행중";
        case "ix_needs_keywords_generation_education":
          return tool.completedStep === 2 ? "완료" : "진행중";
        case "ix_concept_definition_education":
          return tool.completedStep === 3 ? "완료" : "진행중";
        case "ix_prfaq_education":
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

        // 페이지를 대화가 이어지는 형태로 전환
        navigate(`/ExpertInsight`);
      } catch (error) {}
    } else if (conversationType === "tool") {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const response = await getToolOnServer(conversationId, isLoggedIn);

        const chatData = response;

        //! 타겟 탐색기
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
        //! 고객 가치 타입
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

        setCustomerValueAnalyzerPositioning(
          chatData?.customerValuePositioning || []
        );
        setCustomerValueAnalyzerFinalReport(
          chatData?.customerValueFinalReport || {}
        );

        //! 아이디어 생성
        setToolLoading(true);
        setIdeaGeneratorInfo({});
        setIdeaGeneratorPersona([]);
        setIdeaGeneratorIdea([]);
        setIdeaGeneratorClustering([]);
        setIdeaGeneratorFinalReport({});
        setIdeaGeneratorSelectedPersona([]);
        setIdeaGeneratorKnowTarget(null);
        setIdeaGeneratorEditingBusinessText("");
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
        setIdeaGeneratorEditingBusinessText(chatData?.businessDescription);

        //! 디자인 감성 분석
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

        //!PSST 보고서

        setToolStep(1);
        setPsstBusinessInfo([]);
        setPsstFileNames([]);
        setProjectAnalysisMultimodal("");
        setPsstAnalysisResults([]);
        setPsstReport("");
        setPsstSelectedTemplete([]);
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);
        setPsstBusinessInfo(chatData?.business || "");
        setPsstFileNames(
          chatData?.fileName
            ? Array.isArray(chatData.fileName)
              ? chatData.fileName.map((file) =>
                  typeof file === "object" ? file.name : file
                )
              : [
                  typeof chatData.fileName === "object"
                    ? chatData.fileName.name
                    : chatData.fileName,
                ]
            : []
        );
        setProjectAnalysisMultimodal(chatData?.projectAnalysisMultimodal || "");
        setPsstAnalysisResults(chatData?.analysisResults || []);
        setPsstReport(chatData?.psstReport || "");
        setPsstSelectedTemplete(chatData?.selectedTemplete || []);
        setProjectAnalysisMultimodalDescription(
          chatData?.projectAnalysisMultimodalDescription || ""
        );
        setProjectAnalysisMultimodalKeyMessage(
          chatData?.projectAnalysisMultimodalKeyMessage || ""
        );

        //!퀵서베이
        setToolStep(1);
        setQuickSurveyProjectDescription("");
        setQuickSurveyAnalysis([]);
        setQuickSurveyCustomGuide([]);
        setQuickSurveyPresetData([]);
        setquickSurveyPersonaGroup([]);
        setQuickSurveyInterview([]);
        setQuickSurveySurveyMethod([]);
        setQuickSurveyStaticData([]);
        setQuickSurveyReport([]);
        setQuickSurveyDetailInfo({});
        setQuickSurveyInterviewModeType("");
        setQuickSurveyRecruitingCondition("");
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);
        setQuickSurveyProjectDescription(chatData?.goal || "");
        setQuickSurveySelectedQuestion(chatData?.selectedQuestion || []);
        setQuickSurveyAnalysis(chatData?.quickSurveyAnalysis || []);
        setQuickSurveyCustomGuide(chatData?.quickSurveyCustomGuide || []);
        setQuickSurveyPresetData(chatData?.quickSurveyPresetData || []);
        setquickSurveyPersonaGroup(chatData?.personaGroup || []);
        setQuickSurveyInterview(chatData?.quickSurveyInterview || []);
        setQuickSurveySurveyMethod(chatData?.surveyMethod || []);
        setQuickSurveyReport(chatData?.quickSurveyReport || []);
        setQuickSurveyStaticData(chatData?.quickSurveyStaticData || []);
        setQuickSurveyDetailInfo(chatData?.detailInfo || {});
        setQuickSurveyRecruitingCondition(chatData?.recruitmentCriteria || "");
        setQuickSurveyInterviewModeType(chatData?.interviewModeType || "");


        //!Education Tool

        //!고객 저니 맵
        setToolStep(1);
        setCustomerJourneyMapMomentAnalysis([]);
        setCustomerJourneyMapSelectedPersona([]);
        setCustomerJourneyMapReport([]);
        setCustomerJourneyMapSelectedDirection([]);
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);
        setCustomerJourneyMapMomentAnalysis(chatData?.customerJourneyMapMomentAnalysis || []);
        setCustomerJourneyMapSelectedPersona(chatData?.customerJourneyMapSelectedPersona || {});
        setCustomerJourneyMapReport(chatData?.customerJourneyMapReport || []);
        setCustomerJourneyMapSelectedDirection(chatData?.selectedDirection || []);
        setCustomerJourneyMapSelectedDirectionIndex(chatData?.selectedDirectionIndex || 0);

        //! 핵심 이슈 도출
        setToolStep(1);
        setIssueGenerationSelectedPurpose([]);
        setIssueGenerationProblemList([]);
        setIssueGenerationProblemListTitle([]);
        setIssueGenerationStartPosition([]);
        setIssueGenerationSelectedStartPosition([]);
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);
        setIssueGenerationSelectedPurpose(chatData?.selectedPurposes || {});
        setIssueGenerationProblemList(chatData?.issueGenerationProblemList || []);
        setIssueGenerationProblemListTitle(chatData?.issueGenerationProblemListTitle || []);
        setIssueGenerationStartPosition(chatData?.issueGenerationStartPosition || []);
        setIssueGenerationSelectedStartPosition(chatData?.issueGenerationSelectedStartPosition || []);

        //! 핵심 니즈 키워드 생성
        setToolStep(1);
        setIssueGenerationList([]);
        setKeywordsGenerationSelectedIssue([]);
        setKeywordsGenerationTag([]);
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);
        setKeywordsGenerationSelectedIssue(chatData?.keywordsGenerationSelectedIssue || []);
        setKeywordsGenerationSelectedIssueIndex(chatData?.selectedIssueIndex || []);
        setKeywordsGenerationTag(chatData?.keywordsGenerationTag || []);
   

        //! 아이디어 발상
        setToolStep(1);
        setIdeaGenerationSelectedPurpose([]);
        setIdeaGenerationProblemList([]);
        setIdeaGenerationProblemListTitle([]);
        setIdeaGenerationStartPosition([]);
        setIdeaGenerationMandalartData([]);
        setIdeaGenerationSelectedStartPosition([]);
        setIdeaGenerationSelectedMandalart(null);
        setIdeaGenerationPossessionTech("");
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);  
        setIdeaGenerationSelectedPurpose(chatData?.selectedPurposes || {});
        setIdeaGenerationProblemList(chatData?.ideaGenerationProblemList || []);  
        setIdeaGenerationProblemListTitle(chatData?.ideaGenerationProblemListTitle || []);  
        setIdeaGenerationStartPosition(chatData?.ideaGenerationStartPosition || []);  
        setIdeaGenerationMandalartData(chatData?.ideaGenerationMandalArtData || []);  
        setIdeaGenerationSelectedStartPosition(chatData?.ideaGenerationSelectedStartPosition || []);  
        setIdeaGenerationPossessionTech(chatData?.possessionTech || "");

        //!Kano Model
        setToolStep(1);
        setSelectedKanoModelIdea([]);
        setKanoModelClustering([]);
        setKanoModelClusteringName([]);
        setKanoModelEvaluation([]);
        setKanoModelProductAnalysis([]);
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);
        setSelectedKanoModelIdea(chatData?.kanoModelSelectedIdea || []);
        setKanoModelClustering(chatData?.kanoModelClustering || []);
        setKanoModelClusteringName(chatData?.kanoModelClusteringName || []);
        setKanoModelEvaluation(chatData?.kanoModelEvaluation || []);
        setKanoModelProductAnalysis(chatData?.kanoModelProductAnalysis || []);
        setKanoModelGraphData(chatData?.kanoModelGraphData || []);

        //!아이디어 평가
        setToolStep(1);
        setIdeaEvaluateList([]);
        setIdeaEvaluateSelectedList([]);
        setIdeaEvaluateSelectedListIndex({});
        setIdeaEvaluateComparisonEducation([]);
        setIdeaEvaluateSelectedKanoModel({});
        setIdeaEvaluateSelectedKanoModelIndex({});
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);
        setIdeaEvaluateList(chatData?.ideaEvaluateList || []);
        setIdeaEvaluateSelectedList(chatData?.ideaEvaluateSelectedList || []);
        setIdeaEvaluateComparisonEducation(chatData?.ideaEvaluateComparisonEducation || []);
        setIdeaEvaluateSelectedListIndex(chatData?. ideaEvaluateSelectedListIndex || {});
        setIdeaEvaluateSelectedKanoModel(chatData?.selectedKanoModelIdea || {});
        setIdeaEvaluateSelectedKanoModelIndex(chatData?.selectedKanoModelIdeaIndex || []);

        //!컨셉 정의
        setToolStep(1);
        setConceptDefinitionSelectedPurpose({});
        setConceptDefinitionSelectedPersona([]); 
        setConceptDefinitionFirstReport("");
        setConceptDefinitionFinalReport("");
        setToolLoading(false);
        setToolStep(chatData?.completedStep);
        setToolId(chatData?.id);
        setConceptDefinitionSelectedPurpose(chatData?.selectedKanoModel || {});
        setConceptDefinitionSelectedPersona(chatData?.selectedPersonas || []);
        setConceptDefinitionFirstReport(chatData?.conceptDefinitionFirstReport || "");
        setConceptDefinitionFinalReport(chatData?.conceptDefinitionFinalReport || "");



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
        } else if (chatData.type === "ix_psst_multimodal") {
          setToolLoading(true);
          navigate("/PsstReport");
        } else if (chatData.type === "ix_quick_survey_question") {
          setToolLoading(true);
          navigate("/QuickSurvey");
        } else if (chatData.type === "ix_customer_journey_map_education") {
          setToolLoading(true);
          navigate("/CustomerJourneyMap");
        } else if (chatData.type === "ix_idea_generation_education") {
          setToolLoading(true);
          navigate("/IdeaGeneration");
        } else if (chatData.type === "ix_kano_model_education") {
          setToolLoading(true);
          navigate("/KanoModel");
        } else if (chatData.type === "ix_idea_evaluation_education") {
          setToolLoading(true);
          navigate("/IdeaEvaluate");
        } else if (chatData.type === "ix_concept_definition_education") {
          setToolLoading(true);
          navigate("/ConceptDefinition");
        } else if (chatData.type === "ix_issue_generation_education") {
          setToolLoading(true);
          navigate("/IssueGeneration");
        } else if (chatData.type === "ix_needs_keywords_generation_education") {
          setToolLoading(true);
          navigate("/NeedsKeywordsGeneration");
        }
      } catch (error) {}
    } else if (conversationType === "interviewSingle") {
      setProjectId(project._id);
      setReportId(conversationId);
      setReportLoadButtonState(true);
      setIsPersonaAccessible(true);

      setPersonaStep(4);

      navigate(`/Persona/4/Single`);
    } else if (conversationType === "interviewGroup") {
      setProjectId(project._id);
      setReportId(conversationId);
      setReportLoadButtonState(true);
      setIsPersonaAccessible(true);

      setPersonaStep(4);
      navigate(`/Persona/4`);
    } else if (conversationType === "interviewSingleLive") {
      setProjectId(project._id);
      setReportId(conversationId);
      setReportLoadButtonState(true);
      setIsPersonaAccessible(true);

      setPersonaStep(4);

      navigate(`/Persona/4/SingleLive`);
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
            <col width="12%" />
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
