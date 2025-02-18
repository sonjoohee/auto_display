import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import {
  PASSWORD,
  NEW_PASSWORD,
  RE_PASSWORD,
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  APPROACH_PATH,
  ANALYSIS_BUTTON_STATE,
  IS_LOGGED_IN,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  STRATEGY_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CONVERSATION_STAGE,
  CONVERSATION,
  CONVERSATION_ID,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_LIST,
  IS_EDITING_NOW,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  RECOMMENDED_TARGET_DATA,
  POC_DETAIL_REPORT_DATA,
  POC_PERSONA_LIST,
  EXPERT_DETAIL_DATA,
  IS_MOBILE,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_LIST,
  IDEA_GROUP,
  IDEA_PRIORITY,
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
  IDEA_FEATURE_DATA_TEMP,
  IDEA_REQUIREMENT_DATA_TEMP,
  BUTTON_STATE,
  IDEA_MIRO_STATE,
  GROWTH_HACKER_REPORT_DATA,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  KPI_QUESTION_LIST,
  PRICE_SCRAP_DATA,
  PRICE_REPORT_DATA,
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
  IS_LOADING,
  NEW_ADD_CONTENT,
  IS_ADDING_NOW,
  IS_LOGIN_POPUP_OPEN,
  IS_MARKETING,
  LOGIN_SUCCESS,
  IS_SOCIAL_LOGGED_IN,
  USER_NAME,
  USER_EMAIL,
  MARKETING_MBTI_RESULT,
  MARKETING_RESEARCH_REPORT_DATA,
  MARKETING_BM_REPORT_DATA,
  MARKETING_CUSTOMER_DATA,
  MARKETING_SELECTED_CUSTOMER,
  MARKETING_FINAL_CUSTOMER,
  MARKETING_FINAL_REPORT_DATA,
  MARKETING_FINAL_REPORT_BUTTON_STATE,
  MARKETING_BM_BUTTON_STATE,
  MARKETING_CUSTOMER_BUTTON_STATE,
  MARKETING_HAVE_IEDA,
  MARKETING_MBTI_STAGE,
  MARKETING_MBTI_ANSWER,
  MARKETING_INTEREST,
  MARKETING_RECOMMENDED_ITEM_DATA,
  MARKETING_START_BUTTON_STATE,
  MARKETING_RECOMMENDED_ITEM_BUTTON_STATE,
  GROWTH_HACKER_RECOMMENDED_SOLUTION,
  GROWTH_HACKER_SELECTED_SOLUTION,
  STRATEGY_CONSULTANT_REPORT_DATA,
  IS_PERSONA_ACCESSIBLE,
  PERSONA_BUTTON_STATE_1,
  PERSONA_BUTTON_STATE_2,
  BUSINESS_ANALYSIS,
  PERSONA_STEP,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  PROJECT_LIST,
  PROJECT_REPORT_LIST,
  REPORT_LIST,
  PERSONA_LIST,
  SELECTED_PERSONA_LIST,
  CUSTOMIZE_PERSONA_LIST,
  REQUEST_PERSONA_LIST,
  INTERVIEW_QUESTION_LIST,
  SELECTED_INTERVIEW_PURPOSE,
  CATEGORY_COLOR,
  PROJECT_LOAD_BUTTON_STATE,
  REPORT_LOAD_BUTTON_STATE,
  REPORT_DESCRIPTION_LOAD_BUTTON_STATE,
  INTERVIEW_DATA,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL,
  IS_EDIT_MODE,
  IS_SHOW_TOAST,
  PROJECT_LOADING,
  PROJECT_REFRESH_TRIGGER,
  IS_LOADING_BUSINESS_ANALYSIS,
  CREDIT_CUSTOM_THEORY,
  CREDIT_ADDITIONAL_QUESTION,
  CREDIT_INDEPTH_INTERVIEW,
  CREDIT_REQUEST_CUSTOM_PERSONA,
  CREDIT_REQUEST_BUSINESS_PERSONA,
  EVENT_TITLE,
  EVENT_STATE,
  TRIAL_STATE,
  ACCESSABLE_EXPERT,
} from "../../../AtomStates";
import {
  ContentsWrap,
  TabWrapType4,
  TabButtonType4Main,
  ExploreList,
  ExploreCard,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  H4,
  Body1,
  Body3,
  Sub2,
  Sub3,
  Caption1,
  Caption2,
} from "../../../../assets/styles/Typography";
import { CustomTextarea } from "../../../../assets/styles/InputStyle";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
import MoleculeHeader from "../molecules/MoleculeHeader";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { CreditInfo, createChatOnServer } from "../../../../utils/indexedDB";

const PageMain = () => {
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [accessableExpert, setAccessableExpert] = useAtom(ACCESSABLE_EXPERT);

  const [projectLoading, setProjectLoading] = useAtom(PROJECT_LOADING);
  const [projectRefreshTrigger, setProjectRefreshTrigger] = useAtom(
    PROJECT_REFRESH_TRIGGER
  );
  const [isLoadingBusinessAnalysis, setIsLoadingBusinessAnalysis] = useAtom(
    IS_LOADING_BUSINESS_ANALYSIS
  );
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [personaButtonState1, setPersonaButtonState1] = useAtom(
    PERSONA_BUTTON_STATE_1
  );
  const [personaButtonState2, setPersonaButtonState2] = useAtom(
    PERSONA_BUTTON_STATE_2
  );
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [strategyConsultantReportData, setStrategyConsultantReportData] =
    useAtom(STRATEGY_CONSULTANT_REPORT_DATA);
  const [growthHackerRecommendedSolution, setGrowthHackerRecommendedSolution] =
    useAtom(GROWTH_HACKER_RECOMMENDED_SOLUTION);
  const [growthHackerSelectedSolution, setGrowthHackerSelectedSolution] =
    useAtom(GROWTH_HACKER_SELECTED_SOLUTION);
  const { saveConversation } = useSaveConversation();
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
  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [priceScrapData, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [priceReportData, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [
    priceSelectedProductSegmentation,
    setPriceSelectedProductSegmentation,
  ] = useAtom(PRICE_SELECTED_PRODUCT_SEGMENTATION);
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(
    PRICE_PRODUCT_SEGMENTATION
  );
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
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
  const [isMobile, setIsMobile] = useAtom(IS_MOBILE);
  const location = useLocation();
  const navigate = useNavigate();
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(
    RECOMMENDED_TARGET_DATA
  );
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [selectedPocOptions, setSelectedPocOptions] =
    useAtom(SELECTED_POC_OPTIONS);
  const [selectedExpertList, setSelectedExpertList] =
    useAtom(SELECTED_EXPERT_LIST);
  const [analysisButtonState, setAnalysisButtonState] = useAtom(
    ANALYSIS_BUTTON_STATE
  );
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(
    IS_EXPERT_INSIGHT_ACCESSIBLE
  );
  const [expertData] = useAtom(EXPERT_DETAIL_DATA);
  const [password, setPassword] = useAtom(PASSWORD);
  const [newPassword, setNewPassword] = useAtom(NEW_PASSWORD);
  const [rePassword, setRePassword] = useAtom(RE_PASSWORD);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO); // 상태값으로 설정
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  useEffect(() => {
    setSelectedExpertIndex(SELECTED_EXPERT_INDEX);
  }, []);

  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
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
  const [sections, setSections] = useState([]);
  const [additionalReportCount, setAdditionalReportCount] = useState(0);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );

  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  ); // Use the new list-based atom

  const [strategyReportData, setStrategyReportData] =
    useAtom(STRATEGY_REPORT_DATA);

  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);

  const [inputAdditionalQuestion, setInputAdditionalQuestion] = useState("");

  const [isPopupRegex, setIsPopupRegex] = useState(false);
  const [isPopupRegex2, setIsPopupRegex2] = useState(false);
  const [isPopupLogin, setIsPopupLogin] = useState(false); // 로그인 상태가 아닐 때 팝업을 띄우기 위한 상태
  const [isPopupInvalidBusiness, setIsPopupInvalidBusiness] = useState(false);
  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false); // 계정설정 팝업
  const [isLoginPopupOpen, setLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN); // 로그인 팝업 상태 관리
  const [isComingSoon, setIsComingSoon] = useState(false);

  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [pocDetailReportData, setpocDetailReportData] = useAtom(
    POC_DETAIL_REPORT_DATA
  );
  const [ideaMiroState, setIdeaMiroState] = useAtom(IDEA_MIRO_STATE);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(
    GROWTH_HACKER_REPORT_DATA
  );
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] =
    useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [newAddContent, setNewAddContent] = useAtom(NEW_ADD_CONTENT);
  const [isAddingNow, setIsAddingNow] = useAtom(IS_ADDING_NOW);
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);

  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [loginSuccess, setLoginSuccess] = useAtom(LOGIN_SUCCESS);
  const [isSocialLoggedIn, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN);
  const [userName, setUserName] = useAtom(USER_NAME);
  const [userEmail, setUserEmail] = useAtom(USER_EMAIL);

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
  const [marketingFinalReportButtonState, setMarketingFinalReportButtonState] =
    useAtom(MARKETING_FINAL_REPORT_BUTTON_STATE);
  const [marketingBmButtonState, setMarketingBmButtonState] = useAtom(
    MARKETING_BM_BUTTON_STATE
  );
  const [marketingCustomerButtonState, setMarketingCustomerButtonState] =
    useAtom(MARKETING_CUSTOMER_BUTTON_STATE);
  const [marketingHaveIdea, setMarketingHaveIdea] =
    useAtom(MARKETING_HAVE_IEDA);
  const [marketingMbtiStage, setMarketingMbtiStage] =
    useAtom(MARKETING_MBTI_STAGE);
  const [marketingMbtiAnswer, setMarketingMbtiAnswer] = useAtom(
    MARKETING_MBTI_ANSWER
  );
  const [marketingInterest, setMarketingInterest] = useAtom(MARKETING_INTEREST);
  const [marketingRecommendedItemData, setMarketingRecommendedItemData] =
    useAtom(MARKETING_RECOMMENDED_ITEM_DATA);
  const [marketingStartButtonState, setMarketingStartButtonState] = useAtom(
    MARKETING_START_BUTTON_STATE
  );
  const [
    marketingRecommendedItemButtonState,
    setMarketingRecommendedItemButtonState,
  ] = useAtom(MARKETING_RECOMMENDED_ITEM_BUTTON_STATE);

  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);

  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [projectReportId, setProjectReportId] = useAtom(PROJECT_REPORT_ID);
  const [projectList, setProjectList] = useAtom(PROJECT_LIST);
  const [projectReportList, setProjectReportList] =
    useAtom(PROJECT_REPORT_LIST);
  const [reportList, setReportList] = useAtom(REPORT_LIST);
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [selectedPersonaList, setSelectedPersonaList] = useAtom(
    SELECTED_PERSONA_LIST
  );
  const [customizePersonaList, setCustomizePersonaList] = useAtom(
    CUSTOMIZE_PERSONA_LIST
  );
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
  );
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [categoryColor, setCategoryColor] = useAtom(CATEGORY_COLOR);
  const [projectLoadButtonState, setProjectLoadButtonState] = useAtom(
    PROJECT_LOAD_BUTTON_STATE
  );
  const [reportLoadButtonState, setReportLoadButtonState] = useAtom(
    REPORT_LOAD_BUTTON_STATE
  );
  const [
    reportDescriptionLoadButtonState,
    setReportDescriptionLoadButtonState,
  ] = useAtom(REPORT_DESCRIPTION_LOAD_BUTTON_STATE);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [interviewReport, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [interviewReportAdditional, setInterviewReportAdditional] = useAtom(
    INTERVIEW_REPORT_ADDITIONAL
  );
  const [isEditMode, setIsEditMode] = useAtom(IS_EDIT_MODE);
  const [isShowToast, setIsShowToast] = useAtom(IS_SHOW_TOAST);

  // Credit-related atoms
  const [, setCreditRequestCustomPersona] = useAtom(
    CREDIT_REQUEST_CUSTOM_PERSONA
  );
  const [, setCreditRequestBusinessPersona] = useAtom(
    CREDIT_REQUEST_BUSINESS_PERSONA
  );
  const [, setCreditCustomTheory] = useAtom(CREDIT_CUSTOM_THEORY);
  const [, setCreditAdditionalQuestion] = useAtom(CREDIT_ADDITIONAL_QUESTION);
  const [, setCreditIndepthInterview] = useAtom(CREDIT_INDEPTH_INTERVIEW);
  const [, setEventTitle] = useAtom(EVENT_TITLE);
  const [, setEventState] = useAtom(EVENT_STATE);
  const [, setTrialState] = useAtom(TRIAL_STATE);

  useEffect(() => {
    const fetchCreditInfo = async () => {
      try {
        const response = await CreditInfo(isLoggedIn);

        if (response) {
          setCreditRequestCustomPersona(response.request_custom_persona);
          setCreditRequestBusinessPersona(response.request_business_persona);
          setCreditCustomTheory(response.custom_theory);
          setCreditAdditionalQuestion(response.additional_question);
          setCreditIndepthInterview(response.indepth_interview);
          setEventTitle(response.event_title);
          setEventState(response.event_state);
          setTrialState(response.trial_state);
        }
      } catch (error) {
        console.error("Failed to fetch credit info:", error);
      }
    };

    // Call the API every time PageMain is rendered (or when isLoggedIn changes)
    fetchCreditInfo();
  }, [isLoggedIn]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const closePopupRegex = () => {
    setBusinessAnalysis({
      input: "",
      title: "",
      characteristics: "",
      features: [],
      category: {},
    });
    setIsPopupRegex(false); // 팝업 닫기
  };
  const closePopupRegex2 = () => {
    setIsPopupRegex2(false);
  };
  const closePopupLogin = () => {
    setIsPopupLogin(false); // 로그인 필요 팝업 닫기
    setLoginPopupOpen(true);
  };
  const closePopupInvalidBusiness = () => {
    setIsPopupInvalidBusiness(false); // 팝업 닫기
  };
  const closeAccountPopup = () => {
    setAccountPopupOpen(false); // 계정설정 팝업 닫기
  };
  const closeLoginPopup = () => {
    setLoginPopupOpen(false); // 로그인 팝업 닫기
  };
  const closeComingSoonPopup = () => {
    setIsComingSoon(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // let savedInputBusinessInfo = "";
    // // If there's inputBusinessInfo in the location state, save it
    // if (location.state && location.state.inputBusinessInfo) {
    //   savedInputBusinessInfo = location.state.inputBusinessInfo;
    //   // Remove the inputBusinessInfo from location.state
    //   const newState = { ...location.state };
    //   delete newState.inputBusinessInfo;
    //   window.history.replaceState(newState, "");

    //   // 비로그인 상태에서 들어온 경우 로그인 팝업 띄우기
    //   if (!isLoggedIn) {
    //     setLoginPopupOpen(true);
    //   }
    // }

    // Reset all states except inputBusinessInfo
    //새로운 세션이나 페이지 전환 시 데이터 일관성 보장
    setNewAddContent("");
    setIsAddingNow(false);
    setIsLoading(false);
    setConversation([]);
    setConversationId(null);
    setConversationStage(1);
    setTitleOfBusinessInfo("");
    setMainFeaturesOfBusinessInformation([]);
    setMainCharacteristicOfBusinessInformation([]);
    setBusinessInformationTargetCustomer([]);
    setSelectedExpertIndex("0");
    setSections([]);
    setAdditionalReportCount(0);
    setSelectedAdditionalKeyword([]);
    setApproachPath(0);
    setAdditionalReportData([]);
    setCustomerAdditionalReportData([]);
    setStrategyReportData({});
    setInputAdditionalQuestion("");
    setSelectedCustomerAdditionalKeyword([]);
    setPassword("");
    setNewPassword("");
    setRePassword("");
    setSelectedExpertList([]);
    setIsEditingNow(false);
    setSelectedPocOptions([]);
    setSelectedPocTarget({});
    setRecommendedTargetData({});
    setpocDetailReportData({});
    setPocPersonaList([]);
    // setInputBusinessInfo(savedInputBusinessInfo);
    // setBusinessAnalysis({
    //   input: "",
    //   title: "",
    //   characteristics: "",
    //   features: [],
    //   category: {},
    // });
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
    setIdeaFeatureData([]);
    setIdeaRequirementData([]);
    setIdeaFeatureDataTemp([]);
    setIdeaRequirementDataTemp([]);
    setIdeaList([]);
    setIdeaGroup({});
    setIdeaPriority([]);
    setButtonState({});
    setIdeaMiroState(0);
    setGrowthHackerReportData([]);
    setGrowthHackerDetailReportData([]);
    setGrowthHackerRecommendedSolution([]);
    setGrowthHackerSelectedSolution([]);
    setKpiQuestionList([]);
    setPriceScrapData([]);
    setPriceReportData([]);
    setPriceProduct([]);
    setPriceSelectedProductSegmentation([]);
    setPriceProductSegmentation([]);
    setCaseReportData([]);
    setCaseHashTag([]);
    setSurveyGuidelineDetailReportData({});
    setSurveyGuidelineReportData({});
    setSurveyGoalSuggestionList([]);
    setSurveyGoalFixed([]);
    setSurveyQuestionList([]);

    setBmModelSuggestionReportData([]);
    setBmQuestionList([]);
    setBmSelectedProblemOptions({});
    setBmOrLean("");
    setBmBmAutoReportData([]);
    setBmLeanAutoReportData([]);
    setBmBmAdsReportData([]);
    setBmLeanAdsReportData([]);
    setBmBmCustomReportData([]);
    setBmLeanCustomReportData([]);

    setMarketingMbtiResult({});
    setMarketingResearchReportData([]);
    setMarketingBmReportData([]);
    setMarketingCustomerData([]);
    setMarketingSelectedCustomer([]);
    setMarketingFinalCustomer({});
    setMarketingFinalReportData([]);

    setIsMarketing(false);
    setMarketingHaveIdea(false);
    setMarketingMbtiStage(0);
    setMarketingMbtiAnswer([0, 0, 0, 0]);
    setMarketingInterest("");
    setMarketingRecommendedItemData({});
    setMarketingStartButtonState(0);
    setMarketingBmButtonState(0);
    setMarketingFinalReportButtonState(0);
    setMarketingRecommendedItemButtonState(0);

    setStrategyConsultantReportData([]);

    setBusinessAnalysis({
      input: "",
      title: "",
      characteristics: "",
      features: [],
      category: {},
    });
    setProjectId("");
    setProjectReportId("");
    setProjectList([]);
    setProjectReportList([]);
    setReportList([]);
    setPersonaList({
      selected: [],
      unselected: [],
    });
    setSelectedPersonaList([]);
    setCustomizePersonaList({
      selected: [],
      unselected: [],
    });
    setInterviewQuestionList([]);
    setSelectedInterviewPurpose("");
    setCategoryColor({});
    setProjectLoadButtonState(false);
    setReportLoadButtonState(false);
    setReportDescriptionLoadButtonState(false);
    setInterviewData([]);
    setInterviewReport([]);
    setInterviewReportAdditional([]);
    setIsEditMode(false);
    setIsShowToast(false);
    setPersonaStep(0);
    setIsLoadingBusinessAnalysis(false);
    setProjectLoading({
      isLoading: false,
      lastLoadTime: null,
      error: null,
    });
    setProjectRefreshTrigger(0);
  }, []);

  useEffect(() => {
    const checkboxes = document.querySelectorAll(".accordion-toggle");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    });

    // Cleanup 이벤트 리스너
    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", () => {});
      });
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 엔터 동작 방지
      handledSearch(); // 검색 함수 호출
    }
  };

  const handledSearch = async () => {
    // 로그인 상태인지 확인 후 처리
    if (isLoggedIn) {
      const regex = /^[가-힣a-zA-Z0-9\s.,'"?!()\/\-·:\\%~@#$^&*_+<>`]*$/;
      const specialChars = /^[.,'"?!()\/\-·:\\%~@#$^&*_+<>`]+$/;
      // const consecutiveSpecialChars = /[.,'"?!()\/\-·:\\%]{2,}/; // 특수문자가 2번 이상 연속되는 패턴

      // 단독으로 특수 문자만 사용된 경우
      if (specialChars.test(businessAnalysis.input.trim())) {
        setIsPopupRegex(true);
        return;
      }

      // 연속된 특수문자 체크
      // if (consecutiveSpecialChars.test(businessAnalysis.input.trim())) {
      //   setIsPopupRegex(true);
      //   return;
      // }

      // 입력 값에 대한 정규식 및 빈 값 체크
      if (!regex.test(businessAnalysis.input)) {
        setIsPopupRegex(true);
        return;
      }
      if (businessAnalysis.input.trim() === "") {
        setIsPopupRegex2(true);
        return;
      }

      // const updatedConversation = [...conversation];

      // updatedConversation.push(
      //   {
      //     type: "system",
      //     message: `아이디어를 입력해 주셔서 감사합니다!\n지금부터 아이디어를 세분화하여 주요한 특징과 목표 고객을 파악해보겠습니다 🙌🏻`,
      //     expertIndex: 0,
      //   },
      //   { type: "analysis" }
      // );

      // await saveConversation({
      //   changingConversation: {
      //     conversation: updatedConversation,
      //     conversationStage: 2,
      //   },
      // });

      // setConversation(updatedConversation);
      // setConversationStage(2);
      setIsPersonaAccessible(true);
      setPersonaButtonState1(1);
      setPersonaStep(1);
      // saveConversation({changingConversation: {inputBusinessInfo: inputBusinessInfo}});
      // setApproachPath(-1); // 검색을 통해 들어가는 경우
      // setSelectedExpertIndex("0");
      navigate("/Persona"); //pagepersona
    } else {
      setIsPopupLogin(true); // 로그인 상태가 아니라면 로그인 팝업 띄우기
    }
  };

  /* API 데이터 활용 */
  // const getExpertImage = (expertIndex) => {
  //   switch (expertIndex) {
  //     case "1":
  //       return images.ImgStrategy;
  //     case "2":
  //       return images.ImgMarketing;
  //     case "3":
  //       return images.ImgClient;
  //     case "4":
  //       return images.ImgPoC;
  //     default:
  //       return images.ImgPoC; // 기본 이미지
  //   }
  // };

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

  const hadleToolSelect = (index) => {
    if (isLoggedIn) {
      switch (index) {
        case "1":
          navigate("/TargetDiscovery");
          break;
        case "2":
          navigate("/CustomerValueAnalyzer");
          break;
        case "3":
          navigate("/IdeaGenerator");
          break;
      }
    } else {
      setIsPopupLogin(true);
    }
  };

  //전문가 부분 누르면
  const handledExpertSelect = (index) => {
    if (isLoggedIn) {
      const initialMessage = getInitialSystemMessage(index);

      setConversation([
        {
          type: "system",
          message: initialMessage,
          expertIndex: index,
        },
        {
          type: "system",
          message:
            index === "7"
              ? "먼저 분석이 필요한 제품이나 서비스에 대해서 알려주세요 📝\n📌 현재는 제품만 분석이 가능합니다"
              : "먼저 분석이 필요한 제품이나 서비스에 대해서 알려주세요 📝",
          expertIndex: -1,
        },
      ]);

      setAnalysisButtonState(1);
      setIsExpertInsightAccessible(true);
      setApproachPath(1);
      setBusinessAnalysis({
        input: "",
        title: "",
        characteristics: "",
        features: [],
        category: {},
      });
      setSelectedExpertIndex(index);
      navigate("/ExpertInsight");
    } else {
      setIsPopupLogin(true); // 로그인 상태가 아니라면 로그인 팝업 띄우기
    }
  };

  const handleButtonLending = () => {
    navigate("/Landing");
  };

  const [showText, setShowText] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // 10초 동안 보여주고, 3초 동안 숨김
      setShowHint(true);

      const timeout = setTimeout(() => {
        setShowHint(false);
      }, 10000); // 10초 뒤에 숨김 상태로 변경

      return () => clearTimeout(timeout);
    }, 13000); // 13초 후 다시 반복 (10초 보여짐 + 3초 숨김)

    return () => clearInterval(interval);
  }, []);

  // 검색어 목록과 현재 표시할 검색어 인덱스를 위한 state 추가
  const [searchKeywords] = useState([
    {
      prefix: "패션 브랜드 운영자들은 '",
      keyword: "개인 스타일 추천을 위한 코디 서비스",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "교육 스타트업 창업자들은 '",
      keyword: "AI 기반 영어 회화 튜터 앱",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "피트니스 전문가들은 '",
      keyword: "홈트레이닝에 최적화된 운동 코치",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "모빌리티 스타트업은 '",
      keyword: "실시간 도로 환경 인식 및 위험 예측 AI 모델",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "마케팅 담당자들은 '",
      keyword: "SNS에서 자연스럽게 확산되는 바이럴 광고",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "행사 주최자들은 '",
      keyword: "스마트 홈 가전 신제품 출시 체험회",
      suffix: "' 키워드로 검색했어요.",
    },
    {
      prefix: "축제 기획자들은 '",
      keyword: "지역 문화와 예술을 만나는 전통 축제",
      suffix: "' 키워드로 검색했어요.",
    },
  ]);
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);

  // 검색어 자동 순환을 위한 useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeywordIndex((prev) => (prev + 1) % searchKeywords.length);
    }, 5000); // 5초마다 변경

    return () => clearInterval(interval);
  }, [searchKeywords.length]);

  // 탭 상태 관리를 위한 state 추가
  const [activeTab, setActiveTab] = useState("all");

  // 카드 필터링 함수 수정
  const filterCards = (card) => {
    if (activeTab === "all") return true;

    if (card.props.Expert) return activeTab === "expert";
    if (card.props.Research) return activeTab === "research";
    if (card.props.Analysis) return activeTab === "analysis";

    return false;
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      try {
        // 로그인 요청
        const response = await axios.get(
          "https://wishresearch.kr/api/user/marketing/",
          axiosConfig
        );

        const accessToken = response.data.access_token;

        // accessToken을 세션 스토리지에 저장
        sessionStorage.setItem("accessToken", accessToken);
      } catch (error) {
        console.error("로그인 중 오류가 발생했습니다.", error);
      }
    }

    const newConversationId = await createChatOnServer();
    setConversationId(newConversationId); // 생성된 대화 ID 설정

    setIsMarketing(true);
    setMarketingHaveIdea(true);
    setSelectedExpertIndex("11");

    navigate("/MarketingSetting/1");
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent MainSearch>
          <MainSearchWrap MainSearch>
            <Title>
              Validate Your Idea with AI Persona
              <p>
                시장 반응을 예측하는 가장 스마트한 방법, AI 페르소나로
                시작하세요
              </p>
            </Title>

            <div>
              <InputWrap>
                <div className="inputWrap">
                  <CustomTextarea
                    Edit
                    rows={1}
                    placeholder="비즈니스 설명을 입력하면, 최적의 페르소나를 제안해드려요"
                    onInput={(e) => {
                      // 입력값을 최대 300자로 제한
                      if (e.target.value.length > 300) {
                        e.target.value = e.target.value.substring(0, 300);
                      }
                      setBusinessAnalysis({
                        input: e.target.value,
                        title: "",
                        characteristics: "",
                        features: [],
                        category: {},
                      });

                      // // 글자 수 표시
                      // const currentLength = e.target.value.length;
                      // document.getElementById(
                      //   "letterCount"
                      // ).innerText = `${currentLength}/300`;
                    }}
                    onKeyDown={handleKeyPress}
                  ></CustomTextarea>
                  <button type="button" onClick={handledSearch}>
                    검색
                  </button>
                </div>
                <div className="maxLetter">
                  <images.ExclamationCircle2
                    width="14px"
                    height="14px"
                    color={palette.gray300}
                  />
                  <Sub3 color="gray300">
                    현재 서비스는 B2C 비즈니스에 특화되어 있습니다
                  </Sub3>
                  <span id="letterCount">
                    {businessAnalysis.input.length}/300
                  </span>
                </div>
              </InputWrap>

              <KeywordSearch>
                <Sub3 color="gray500">
                  {searchKeywords[currentKeywordIndex].prefix}
                </Sub3>
                <div>
                  <Sub3
                    color="primary"
                    style={{
                      opacity: 1,
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  >
                    {searchKeywords[currentKeywordIndex].keyword}
                  </Sub3>
                </div>
                <Sub3 color="gray500">
                  {searchKeywords[currentKeywordIndex].suffix}
                </Sub3>
              </KeywordSearch>
            </div>
          </MainSearchWrap>

          <ExploreWrap>
            <H4 align="left">Explore</H4>

            <TabWrapType4>
              <TabButtonType4Main
                isActive={activeTab === "all"}
                onClick={() => setActiveTab("all")}
              >
                <Caption1 color="gray700">All</Caption1>
              </TabButtonType4Main>
              <TabButtonType4Main
                isActive={activeTab === "research"}
                onClick={() => setActiveTab("research")}
              >
                <Caption1 color="gray700">Research Tool</Caption1>
              </TabButtonType4Main>
              <TabButtonType4Main
                isActive={activeTab === "expert"}
                onClick={() => setActiveTab("expert")}
              >
                <Caption1 color="gray700">Business Expert</Caption1>
              </TabButtonType4Main>
              {/* <TabButtonType4Main 
                isActive={activeTab === "analysis"}
                onClick={() => setActiveTab("analysis")}
              >
                <Caption1 color="gray700">Analysis Tool</Caption1>
              </TabButtonType4Main> */}
            </TabWrapType4>

            <ExploreList>
              {[
                // Expert 카드들

                <ExploreCard
                  Research
                  key="research-1"
                  {...(!accessableExpert && { Ready: true })}
                >
                  <span>
                    <images.LightningChargeFill color={palette.gray700} />
                    Tool
                  </span>
                  <p>
                    <img src={images.ImgExplore05} alt="" />
                  </p>
                  <Body1 color="gray800">
                    <em>준비중</em>
                    타겟 탐색기
                  </Body1>

                  <div
                    className="overlay"
                    onClick={() => {
                      hadleToolSelect("1");
                    }}
                  >
                    <span>
                      <images.LightningChargeFill color={palette.white} />
                      Tool
                    </span>

                    <div className="text">
                      <Body1 color="white">
                        <em>준비중</em>타겟 탐색기
                      </Body1>
                      <Caption1 color="white" align="left">
                        맥락적 조사 및 시나리오 분석 기법을 활용해 제품 및
                        서비스의 잠재고객 탐색 툴
                      </Caption1>
                      <i />
                    </div>
                  </div>
                </ExploreCard>,

                <ExploreCard
                  Research
                  key="research-2"
                  {...(!accessableExpert && { Ready: true })}
                >
                  <span>
                    <images.LightningChargeFill color={palette.gray700} />
                    Tool
                  </span>
                  <p>
                    <img src={images.ImgExplore06} alt="" />
                  </p>
                  <Body1 color="gray800">
                    <em>준비중</em>
                    고객 핵심 가치 분석기
                  </Body1>

                  <div
                    className="overlay"
                    onClick={() => {
                      hadleToolSelect("2");
                    }}
                  >
                    <span>
                      <images.LightningChargeFill color={palette.white} />
                      Tool
                    </span>

                    <div className="text">
                      <Body1 color="white">
                        <em>준비중</em>고객 핵심 가치 분석기
                      </Body1>
                      <Caption1 color="white" align="left">
                        고객여정맵을 기반으로 핵심 구매 요인을 도출하고 고객
                        중심의 경쟁력을 강화하는 툴
                      </Caption1>
                      <i />
                    </div>
                  </div>
                </ExploreCard>,

                <ExploreCard
                  Research
                  Ready
                  key="research-3"
                  {...(!accessableExpert && { Ready: true })}
                >
                  <span>
                    <images.LightningChargeFill color={palette.gray700} />
                    Tool
                  </span>
                  <p>
                    <img src={images.ImgExplore07} alt="" />
                  </p>
                  <Body1 color="gray800">
                    <em>준비중</em>
                    아이디어 생성기
                  </Body1>

                  <div
                    className="overlay"
                    onClick={() => {
                      hadleToolSelect("3");
                    }}
                  >
                    <span>
                      <images.LightningChargeFill color={palette.white} />
                      Tool
                    </span>

                    <div className="text">
                      <Body1 color="white">
                        <em>준비중</em>아이디어 생성기
                      </Body1>
                      <Caption1 color="white" align="left">
                        만다라트 기법을 활용하여 창의적이고 구조적인 아이디어를
                        발산하고 구체화 하는 툴
                      </Caption1>
                      <i />
                    </div>
                  </div>
                </ExploreCard>,

                <ExploreCard Research Ready key="research-4">
                  <span>
                    <images.LightningChargeFill color={palette.gray700} />
                    Tool
                  </span>
                  <p>
                    <img src={images.ImgExplore10} alt="" />
                  </p>
                  <Body1 color="gray800">
                    <em>준비중</em>
                    디자인 감성 분석기
                  </Body1>

                  <div
                    className="overlay"
                    onClick={() => {
                      setIsComingSoon(true);
                    }}
                  >
                    <span>
                      <images.LightningChargeFill color={palette.white} />
                      Tool
                    </span>

                    <div className="text">
                      <Body1 color="white">
                        <em>준비중</em>디자인 감성 분석기
                      </Body1>
                      <Caption1 color="white" align="left">
                        디자인 분야별 평가 기준을 적용해 감성적인 특징을
                        정량적으로 분석하는 툴
                      </Caption1>
                      <i />
                    </div>
                  </div>
                </ExploreCard>,

                <ExploreCard Research Ready key="research-5">
                  <span>
                    <images.LightningChargeFill color={palette.gray700} />
                    Tool
                  </span>
                  <p>
                    <img src={images.ImgExplore11} alt="" />
                  </p>
                  <Body1 color="gray800">
                    <em>준비중</em>
                    디자인 적합성 분석기
                  </Body1>

                  <div
                    className="overlay"
                    onClick={() => {
                      setIsComingSoon(true);
                    }}
                  >
                    <span>
                      <images.LightningChargeFill color={palette.white} />
                      Tool
                    </span>

                    <div className="text">
                      <Body1 color="white">
                        <em>준비중</em>디자인 적합성 분석기
                      </Body1>
                      <Caption1 color="white" align="left">
                        이미지가 마케팅 활용에 적합한지 다양한 기준으로 평가하여
                        적합성을 판단하는 툴
                      </Caption1>
                      <i />
                    </div>
                  </div>
                </ExploreCard>,

                <ExploreCard
                  Expert
                  Ready
                  key="expert-1"
                  {...(!accessableExpert && { Ready: true })}
                >
                  <span>
                    <images.LightningChargeFill color={palette.gray700} />
                    Expert
                  </span>
                  <p>
                    <img src={images.ImgExplore01} alt="" />
                  </p>
                  <Body1 color="gray800">
                    <em>준비중</em>
                    전략 컨설턴트
                  </Body1>

                  <div
                    className="overlay"
                    onClick={() => {
                      handledExpertSelect("1");
                    }}
                  >
                    <span>
                      <images.LightningChargeFill color={palette.white} />
                      Expert
                    </span>

                    <div className="text">
                      <Body1 color="white">
                        <em>준비중</em>
                        전략 컨설턴트
                      </Body1>
                      <Caption1 color="white" align="left">
                        차별화된 비즈니스 전략과 리스크 분석을 통해 시장
                        경쟁력을 강화하는 방법을 제시드려요
                      </Caption1>
                      <i />
                    </div>
                  </div>
                </ExploreCard>,

                <ExploreCard
                  Expert
                  Ready
                  key="expert-2"
                  {...(!accessableExpert && { Ready: true })}
                >
                  <span>
                    <images.LightningChargeFill color={palette.gray700} />
                    Expert
                  </span>
                  <p>
                    <img src={images.ImgExplore02} alt="" />
                  </p>
                  <Body1 color="gray800">
                    <em>준비중</em>
                    가격 분석 전문가
                  </Body1>

                  <div
                    className="overlay"
                    onClick={() => {
                      handledExpertSelect("7");
                    }}
                  >
                    <span>
                      <images.LightningChargeFill color={palette.white} />
                      Expert
                    </span>

                    <div className="text">
                      <Body1 color="white">
                        <em>준비중</em>가격 분석 전문가
                      </Body1>
                      <Caption1 color="white" align="left">
                        시장 데이터 기반 최적 가격을 분석하여 수익성과 경쟁력을
                        극대화할 수 있어요 (제품 한정)
                      </Caption1>
                      <i />
                    </div>
                  </div>
                </ExploreCard>,

                <ExploreCard
                  Expert
                  Ready
                  key="expert-3"
                  {...(!accessableExpert && { Ready: true })}
                >
                  <span>
                    <images.LightningChargeFill color={palette.gray700} />
                    Expert
                  </span>
                  <p>
                    <img src={images.ImgExplore03} alt="" />
                  </p>
                  <Body1 color="gray800">
                    <em>준비중</em>
                    BM 전문가
                  </Body1>

                  <div
                    className="overlay"
                    onClick={() => {
                      handledExpertSelect("9");
                    }}
                  >
                    <span>
                      <images.LightningChargeFill color={palette.white} />
                      Expert
                    </span>

                    <div className="text">
                      <Body1 color="white">
                        <em>준비중</em>BM 전문가
                      </Body1>
                      <Caption1 color="white" align="left">
                        비즈니스 모델을 설계하고 최적화하여 지속 가능한 수익
                        구조를 구축하는 방향을 설정해드려요{" "}
                      </Caption1>
                      <i />
                    </div>
                  </div>
                </ExploreCard>,

                <ExploreCard
                  Expert
                  Ready
                  key="expert-4"
                  {...(!accessableExpert && { Ready: true })}
                >
                  <span>
                    <images.LightningChargeFill color={palette.gray700} />
                    Expert
                  </span>
                  <p>
                    <img src={images.ImgExplore04} alt="" />
                  </p>
                  <Body1 color="gray800">
                    <em>준비중</em>
                    그로스 해커
                  </Body1>

                  <div
                    className="overlay"
                    onClick={() => {
                      handledExpertSelect("6");
                    }}
                  >
                    <span>
                      <images.LightningChargeFill color={palette.white} />
                      Expert
                    </span>

                    <div className="text">
                      <Body1 color="white">
                        <em>준비중</em>그로스 해커
                      </Body1>
                      <Caption1 color="white" align="left">
                        사용자 여정을 분석하여 각 마케팅 퍼널 단계별 최적의
                        전략을 도출하고 실행 방안을 제시드려요
                      </Caption1>
                      <i />
                    </div>
                  </div>
                </ExploreCard>,

                <ExploreCard
                  Expert
                  Ready
                  key="expert-5"
                  style={{ cursor: "default" }}
                >
                  <span>
                    <images.LightningChargeFill color={palette.gray700} />
                    Expert
                  </span>
                  <p>
                    <img src={images.ImgExploreNoData} alt="" />
                  </p>
                  <Body1 color="gray300">
                    <em>준비중</em>
                    Coming Soon
                  </Body1>
                </ExploreCard>,

                // <ExploreCard Research key="research-4">
                //   <span>
                //     <images.LightningChargeFill color={palette.gray700} />
                //     Tool
                //   </span>
                //   <p><img src={images.ImgExplore08} alt="" /></p>
                //   <Body1 color="gray800">
                //     <em>준비중</em>
                //     컨셉 검증 플래너
                //   </Body1>

                //   <div className="overlay" onClick={() => { setIsComingSoon(true); }}>
                //     <span>
                //       <images.LightningChargeFill color={palette.white} />
                //       Tool
                //     </span>

                //     <div className="text">
                //       <Body1 color="white">컨셉 검증 플래너</Body1>
                //       <Caption1 color="white" align="left">MVP/PoC 검증을 위한 체계저인 플랜을 수립하여 실행 가능성을 높이는 플랜 제시 툴</Caption1>
                //       <i />
                //     </div>
                //   </div>
                // </ExploreCard>,

                // <ExploreCard Research key="research-5">
                //   <span>
                //     <images.LightningChargeFill color={palette.gray700} />
                //     Tool
                //   </span>
                //   <p><img src={images.ImgExplore09} alt="" /></p>
                //   <Body1 color="gray800">
                //     <em>준비중</em>
                //     사용자 시뮬레이터
                //   </Body1>

                //   <div className="overlay" onClick={() => { setIsComingSoon(true); }}>
                //     <span>
                //       <images.LightningChargeFill color={palette.white} />
                //       Tool
                //     </span>

                //     <div className="text">
                //       <Body1 color="white">사용자 시뮬레이터</Body1>
                //       <Caption1 color="white" align="left">특정 AI Persona 그룹을 대상으로 핵심적인 질문을 제시하여 응답 패턴과 경향성을 분석하는 툴</Caption1>
                //       <i />
                //     </div>
                //   </div>
                // </ExploreCard>,

                // <ExploreCard Analysis key="analysis-1">
                //   <span>
                //     <images.LightningChargeFill color={palette.gray700} />
                //     Tool
                //   </span>
                //   <p><img src={images.ImgExplore02} alt="" /></p>
                //   <Body1 color="gray800">
                //     <em>준비중</em>
                //     Analysis Tool
                //   </Body1>

                //   <div className="overlay" onClick={() => { setIsComingSoon(true); }}>
                //     <span>
                //       <images.LightningChargeFill color={palette.white} />
                //       Tool
                //     </span>

                //     <div className="text">
                //       <Body1 color="white">Analysis Tool</Body1>
                //       <Caption1 color="white" align="left">Analysis Tool</Caption1>
                //       <i />
                //     </div>
                //   </div>
                // </ExploreCard>,

                // <ExploreCard Analysis key="analysis-2">
                //   <span>
                //     <images.LightningChargeFill color={palette.gray700} />
                //     Tool
                //   </span>
                //   <p><img src={images.ImgExplore02} alt="" /></p>
                //   <Body1 color="gray800">
                //     <em>준비중</em>
                //     Analysis Tool2
                //   </Body1>

                //   <div className="overlay" onClick={() => { setIsComingSoon(true); }}>
                //     <span>
                //       <images.LightningChargeFill color={palette.white} />
                //       Tool
                //     </span>

                //     <div className="text">
                //       <Body1 color="white">Analysis Tool</Body1>
                //       <Caption1 color="white" align="left">Analysis Tool</Caption1>
                //       <i />
                //     </div>
                //   </div>
                // </ExploreCard>,
              ].filter(filterCards)}
            </ExploreList>
          </ExploreWrap>

          <CopyRight>
            <div>
              <Sub3 color="gray300">회사명 : (주)유저커넥트</Sub3>
              <Sub3 color="gray300">대표: 박영수</Sub3>
              <Sub3 color="gray300">개인정보관리책임자 : 이선근</Sub3>
              <Sub3 color="gray300">전화: 031 - 216 - 5930</Sub3>
              <Sub3 color="gray300">메일 : info@userconnect.kr</Sub3>
              <Sub3 color="gray300">사업자등록번호 : 678 - 81 - 01795</Sub3>
            </div>
            <div>
              <Sub3 color="gray300">
                통신판매업신고 : 제2025 - 경기안산 - 0424 호
              </Sub3>
              <Sub3 color="gray300">
                주소: 경기도 안산시 상록구 해양3로 15, 1512호 ~ 1515호 (그랑시티
                시그니처타워)
              </Sub3>
            </div>
          </CopyRight>
        </MainContent>

        <FloatingMenu>
          <input type="checkbox" id="floatingMenu" name="floatingMenu" />
          <label htmlFor="floatingMenu">
            <span>
              <img src={images.LogoSymbolWhite} alt="" />
            </span>
          </label>

          <FloatingMenuItem onClick={() => navigate("/MarketingLanding")}>
            <Sub2 color="gray800">창업 MBTI로 유형 분석하기</Sub2>
            <div className="icon">
              <images.Tag width="15" height="16" color={palette.primary} />
            </div>
          </FloatingMenuItem>
          <FloatingMenuItem onClick={() => handleSubmit()}>
            <Sub2 color="gray800">내 아이템 잠재력 진단 받기</Sub2>
            <div className="icon">
              <images.Report2 width="16" height="16" color={palette.primary} />
            </div>
          </FloatingMenuItem>
        </FloatingMenu>

        {/* <QuickMenu showText={showText} showHint={showHint}>
          {showHint && <span>창업 MBTI 진행하기</span>}
          <button
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
            onClick={() => navigate("/MarketingLanding")}
          >
            <p>
              <img src={images.LogoSymbolWhite} alt="" />
            </p>
            <span>창업 MBTI로 창업 스타일 찾기</span>
          </button>
        </QuickMenu> */}
      </ContentsWrap>
      {isPopupRegex && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupRegex(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupRegex}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>
              한글, 영문 외 특수문자는 입력할 수 없어요. 자음이나 모음만 입력한
              경우 검색이 제한되니, 문장을 완전하게 입력해주세요.
            </p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupRegex}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isPopupRegex2 && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupRegex2(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupRegex2}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>비즈니스 분석을 위해 내용을 입력해주세요</p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupRegex2}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isPopupLogin && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupLogin(); // 팝업 닫기
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupLogin}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>로그인 후 사용해 주세요.</p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupLogin}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isPopupInvalidBusiness && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupInvalidBusiness(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupInvalidBusiness}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>
              올바른 비즈니스 정보를 입력해주세요. 입력한 정보로 검색이 제한될
              수 있습니다.
            </p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupInvalidBusiness}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isComingSoon && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeComingSoonPopup();
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closeComingSoonPopup}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>
              전문가가 곧 공개됩니다
              <br />
              조금만 기다려 주세요!
            </p>
            <div className="btnWrap">
              <button type="button" onClick={closeComingSoonPopup}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default PageMain;

const FloatingMenu = styled.div`
  position: fixed;
  bottom: 3%;
  right: 3%;

  input {
    display: none;

    &:checked ~ label span {
      img {
        opacity: 0;
      }

      &:before,
      &:after {
        opacity: 1;
      }
    }

    &:checked ~ div {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
      transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);

      &:nth-child(3) {
        transition-duration: 180ms;
        transform: translate3d(0, -95px, 0);
      }

      &:nth-child(4) {
        transition-duration: 280ms;
        transform: translate3d(0, -150px, 0);
      }
    }
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${palette.primary};
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;

      &:before,
      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 3px;
        border-radius: 4px;
        background: ${palette.white};
        content: "";
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }

      img {
        width: 100%;
        height: 100%;
        transition: opacity 0.3s ease;
      }
    }
  }
`;

const FloatingMenuItem = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 200px;
  transform: translateY(20px);
  transition: all 0.3s ease;
  cursor: pointer;
  pointer-events: none;
  opacity: 0;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.15);
    background: ${palette.white};

    img {
      width: 100%;
      height: 100%;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  justify-content: ${(props) => {
    if (props.MainSearch) return `center`;
    else return `flex-start`;
  }};
  margin: 57px auto 0;
  // padding: ${(props) => (props.isMobile ? "0" : "0 20px")};
`;

const MainSearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => {
    if (props.MainSearch) return `center`;
    else return `flex-start`;
  }};

  gap: 42px;
  // height: 85dvh;
  height: 74dvh;

  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 616px;
    width: 100%;
  }
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  font-size: ${(props) => (props.isMobile ? "1.5rem" : "2.25rem")};
  font-weight: 600;
  /* margin: ${(props) =>
    props.isMobile ? "40px auto 30px" : "120px auto 55px"}; */

  p {
    font-size: ${(props) => (props.isMobile ? "0.75rem" : "0.88rem")};
    font-weight: 400;
    line-height: 1.5;
  }
`;

const InputWrap = styled.div`
  // max-width: ${(props) => (props.isMobile ? "100%" : "616px")};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  border-radius: 20px;
  // border: 1px solid ${palette.lineGray};
  background: ${palette.white};
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.12);
  overflow: hidden;

  .inputWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    // padding:28px 38px;
    padding: ${(props) => (props.isMobile ? "20px" : "20px")};

    textarea {
      width: 100%;
      // height: 40px;
      font-family: "Pretendard", "Poppins";
      font-size: 1rem;
      outline: 0;
      border: 0;
      resize: none;
      margin-bottom: 20px;

      &::placeholder {
        font-size: 1rem;

        font-weight: 300;
        color: #a9a9a9;
      }
    }

    button {
      flex-shrink: 0;
      width: 27px;
      height: 27px;
      font-family: "Pretendard", "Poppins";
      font-size: 0;
      border: 0;
      background: url(${images.IconSearch}) center no-repeat;
      transition: all 0.5s;

      &:hover {
        background: url(${images.IconSearchHover}) center no-repeat;
      }
    }
  }

  .maxLetter {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    color: ${palette.gray500};
    padding: 12px 20px;
    border-top: 1px solid ${palette.outlineGray};
    background: #f5f9ff;

    p {
      font-size: 0.88rem;
      font-weight: 300;
      color: ${palette.gray300};
      line-height: 1.5;
    }

    span {
      font-size: 0.75rem;
      color: #525252;
      margin-left: auto;
    }
  }
`;

const KeywordSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 21px;

    p {
      transition: opacity 0.5s ease-in-out;
    }
  }
`;

const ExploreWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  max-width: 1024px;
  width: 100%;

  > h4 {
    margin-bottom: 12px;
  }
`;

const ExpertSelectWrap = styled.div`
  position: relative;
  max-width: 1040px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 290px;

  > p {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  a {
    font-size: 1.25rem;
    text-decoration: underline;
    color: ${palette.black};

    &:hover {
      color: ${palette.black};
    }
  }
`;

const CopyRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 36px;

  > div {
    display: flex;
    gap: 20px;
  }
`;

const ExpertSelectBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  justify-content: space-between;
  gap: ${(props) => (props.isMobile ? "10px" : "15px")};
  // margin-bottom:30px;

  > div {
    flex: ${(props) => (props.isMobile ? "1 1 auto" : "1 1 18%")};
  }
`;

const ExpertCard = styled.div`
  visibility: ${(props) => (props.Empty ? "hidden" : "visible")};
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: ${(props) => (props.isMobile ? "auto" : "215px")};
  text-align: left;
  padding: ${(props) => (props.isMobile ? "20px 15px" : "26px 20px")};
  border-radius: 16px;

  border: ${(props) => {
    if (props.select) return `1px solid ${palette.blue}`;
    else if (props.Coming) return `none`;
    // else if (props.PoC) return `1px solid #E2E7EA`;
    // else if (props.Marketing) return `1px solid #F0EDE6`;
    // else if (props.Client) return `1px solid #E2E7EA`;
    // else if (props.Strategy) return `1px solid #E0E5DF`;
    // else if (props.Idea) return `1px solid #DAE1F1`;
    // else if (props.Hacker) return `1px solid #EDE9DE`;
    // else if (props.Biz) return `1px solid #CCDAE0`;
    // else if (props.BM) return `1px solid #EEE7E7`;
    // else if (props.Price) return `1px solid #E8E2EA`;
    // else if (props.Survey) return `1px solid #E7E9EE`;
    // else return `1px solid ${palette.gray100}`;
    else return `1px solid ${palette.chatGray}`;
  }};
  background: ${(props) => {
    if (props.select) return palette.blue;
    else if (props.Coming) return `rgba(0,0,0,.03)`;
    // else if (props.PoC) return `#E2E7EA`;
    // else if (props.Marketing) return `#F0EDE6`;
    // else if (props.Client) return `#E2E7EA`;
    // else if (props.Strategy) return `#E0E5DF`;
    // else if (props.Idea) return `#DAE1F1`;
    // else if (props.Hacker) return `#EDE9DE`;
    // else if (props.Biz) return `#CCDAE0`;
    // else if (props.BM) return `#EEE7E7`;
    // else if (props.Price) return `#E8E2EA`;
    // else if (props.Survey) return `#E7E9EE`;
    // else return palette.gray100;
    else return palette.chatGray;
  }};

  box-shadow: ${(props) => {
    if (props.select) return `0 4px 30px rgba(0, 0, 0, 0.1)`;
    else return `none`;
  }};
  cursor: ${(props) => {
    if (props.Coming) return `auto`;
    else return `pointer`;
  }};
  pointer-events: ${(props) => {
    if (props.Coming) return `auto`;
    else return `auto`;
  }};
  transition: all 0.5s;

  span {
    position: relative;
    width: 70px;
    height: 70px;
    margin: 0 auto;
    margin-top: auto;
    // border-radius: 100px;
    // border: 1px solid ${palette.lineGray};
    // background: ${palette.white};

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  p {
    color: ${(props) => (props.select ? palette.white : palette.gray500)};
  }

  strong {
    color: ${(props) => (props.select ? palette.white : palette.darkGray)};
    // min-height: 1.2rem;
  }

  &:hover {
    border: 1px solid ${palette.primary};
    background: ${palette.primary};

    div {
      color: ${palette.white};
    }
  }

  ${(props) =>
    props.More &&
    css`
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        height: 100%;

        span {
          position: relative;
          font-size: 0;
          border: 0;

          &:before,
          &:after {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 5px;
            border-radius: 2px;
            background: #e8e8e8;
            content: "";
          }
          &:before {
            width: 20px;
            height: 5px;
          }
          &:after {
            width: 5px;
            height: 20px;
          }
        }

        p {
          color: ${palette.gray};
          margin-top: 0;
        }
      }

      &:hover {
        border: none;
        background: rgba(0, 0, 0, 0.03);

        p,
        strong {
          color: ${palette.gray};
        }
      }
    `}

  ${(props) =>
    props.Coming &&
    css`
      align-items: center;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin: auto;
      }

      span {
        position: relative;
        font-size: 0;
        border: 0;
      }

      &:hover {
        border: none;
        background: rgba(0, 0, 0, 0.03);

        p,
        strong {
          color: ${palette.gray};
        }
      }
    `}
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 11px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.black};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

    p {
      font-family: "Pretendard", "Poppins";
      font-size: 0.875rem;
      font-weight: 500;
      margin: 20px auto 24px;
      line-height: 1.5;
    }

    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 500;
            display: block;
          }
          span {
            font-size: 0.75rem;
            font-weight: 400;
            color: ${palette.gray500};
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            font-family: "Pretendard", "Poppins";
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.blue};
              background: none;
            }
          }
        }
      `}
  }
`;

const QuickMenu = styled.div`
  position: fixed;
  bottom: 3%;
  right: 3%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
  transition: all 0.5s;

  > span {
    position: relative;
    font-size: 0.88rem;
    color: ${palette.white};
    line-height: 1.5;
    padding: 12px 16px;
    border-radius: 12px;
    background: ${palette.gray800};
    opacity: ${(props) => (props.showHint && !props.showText ? 1 : 0)};
    transition: opacity 1s ease-in-out;

    &:after {
      position: absolute;
      bottom: -5px;
      right: 12px;
      transform: rotate(45deg);
      width: 17px;
      height: 17px;
      border-radius: 6px;
      background: ${palette.gray800};
      content: "";
    }
  }

  > button {
    display: flex;
    align-items: center;
    // gap: 10px;
    gap: 0;
    width: ${(props) => (props.showText ? "auto" : "40px")};
    height: 40px;
    font-family: Pretendard, Poppins;
    font-size: 0.88rem;
    font-weight: 500;
    color: ${palette.white};
    line-height: 1.5;
    // padding-right:15px;
    padding-right: ${(props) => (props.showText ? "15px" : "0px")};
    border-radius: 30px;
    border: 0;
    box-shadow: 2px 2px 15px 0px rgba(0, 0, 0, 0.15);
    background: ${palette.primary};
    overflow: hidden;
    transition: width 0.5s ease;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      // overflow: hidden;

      img {
        height: 100%;
      }
    }

    span {
      // visibility: ${(props) => (props.showText ? "visible" : "hidden")};
      opacity: ${(props) => (props.showText ? 1 : 0)};
      transition: opacity 0.3s ease, width 0.3s ease, font-size 0.3s ease;
      width: ${(props) => (props.showText ? "auto" : "0")};
      font-size: ${(props) => (props.showText ? "0.88rem" : "0")};
    }
  }
`;
