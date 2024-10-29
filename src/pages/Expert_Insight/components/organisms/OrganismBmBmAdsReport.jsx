import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
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
  IDEA_PRIORITY_BUTTON_STATE,
  IDEA_LIST,
  IDEA_GROUP,
  RECOMMENDED_TARGET_DATA,
  POC_DETAIL_REPORT_DATA,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_PRIORITY,
  BUTTON_STATE,
  GROWTH_HACKER_REPORT_DATA,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  KPI_QUESTION_LIST,
  IDEA_MIRO,
  PRICE_SCRAP_DATA,
  PRICE_REPORT_DATA,
  PRICE_PRODUCT,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  PRICE_PRODUCT_SEGMENTATION,
  CASE_HASH_TAG,
  CASE_REPORT_DATA,
  BM_BM_AUTO_REPORT_DATA,
  BM_BM_AUTO_REPORT_BUTTON_STATE,
  BM_QUESTION_LIST,
  BM_BM_ADS_REPORT_BUTTON_STATE,
  BM_BM_ADS_REPORT_DATA,
  SURVEY_GUIDELINE_REPORT_DATA,
  SURVEY_GUIDELINE_DETAIL_REPORT_DATA,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_GOAL_FIXED,
  SURVEY_QUESTION_LIST,
  BM_SELECTED_PROBLEM_OPTIONS,
  BM_BM_CUSTOM_REPORT_BUTTON_STATE,
  BM_OR_LEAN,
  BM_LEAN_AUTO_REPORT_DATA,
  BM_LEAN_ADS_REPORT_DATA,
  BM_LEAN_CUSTOM_REPORT_DATA,
  BM_MODEL_SUGGESTION_REPORT_DATA,
  BM_BM_CUSTOM_REPORT_DATA,
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";

import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";

const OrganismBmBmAdsReport = () => {
  const [bmModelSuggestionReportData, setBmModelSuggestionReportData] = useAtom(BM_MODEL_SUGGESTION_REPORT_DATA);
  const [bmOrLean, setBmOrLean] = useAtom(BM_OR_LEAN);
  const [bmLeanAutoReportData, setBmLeanAutoReportData] = useAtom(BM_LEAN_AUTO_REPORT_DATA);
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
  const [targetSelectButtonState, setTargetSelectButtonState] = useAtom(TARGET_SELECT_BUTTON_STATE);
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

  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingTarget, setIsLoadingTarget] = useState(false);
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);
  const [pocDetailReportData, setPocDetailReportData] = useAtom(POC_DETAIL_REPORT_DATA);

  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);

  const [bmBmAdsButtonState, setBmBmAdsButtonState] = useAtom(BM_BM_ADS_REPORT_BUTTON_STATE);
  const [bmBmAutoReportData, setBmBmAutoReportData] = useAtom(BM_BM_AUTO_REPORT_DATA);

  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [isLoadingIdeaPriority, setIsLoadingIdeaPriority] = useState(false);
  const [bmBmAdsReportData, setBmBmAdsReportData] = useAtom(BM_BM_ADS_REPORT_DATA);
  const [bmQuestionList, setbmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [bmSelectedProblemOptions, setBmSelectedProblemOptions] = useAtom(BM_SELECTED_PROBLEM_OPTIONS); // 문제 선택 아톰
  const [problemOptions, setProblemOptions] = useState("");
  const [bmBmCustomButtonState, setBmBmCustomButtonState] = useAtom(BM_BM_CUSTOM_REPORT_BUTTON_STATE);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 상태로 관리

  useEffect(() => {
    if(Object.keys(bmSelectedProblemOptions).length > 0) {
      setProblemOptions(bmSelectedProblemOptions.problemOptions);
      setCurrentPage(bmSelectedProblemOptions.currentPage);
    }
  }, [bmSelectedProblemOptions]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchBmBmAdsReport = async () => {

      if(bmBmAdsButtonState) {
        setIsLoading(true);
        setIsLoadingIdeaPriority(true);
        setBmBmAdsButtonState(0);

        const data = {
          expert_id: "1",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
            목표고객: businessInformationTargetCustomer,
          },
          bm_question_list: bmQuestionList,
        };

        let response = await axios.post(
          "https://wishresearch.kr/panels/bm_ads_report",
          data,
          axiosConfig
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || !response.data || typeof response.data !== "object" ||
          !response.data.hasOwnProperty("bm_bm_ads_report") ||
          !Array.isArray(response.data.bm_bm_ads_report) ||
          response.data.bm_bm_ads_report.some(keywordSection => 
            !Array.isArray(keywordSection.keywords) || 
            keywordSection.keywords.some(keyword => 
              !keyword.hasOwnProperty("title") || 
              !keyword.hasOwnProperty("description") || 
              !Array.isArray(keyword.examples) || 
              !Array.isArray(keyword.related_blocks) || 
              !keyword.hasOwnProperty("action")
            )
          )
        )) {
          response = await axios.post(
            "https://wishresearch.kr/panels/bm_ads_report",
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

        setBmBmAdsReportData(response.data.bm_bm_ads_report);

        const updatedConversation = [...conversation];
        // updatedConversation.push(
        //   {
        //     type: "system",
        //     message:
        //       "목표로 하는 문제(Problem)를 골라주시면, 해당 문제에 특화된 린 캔버스를 작성하겠습니다.",
        //     expertIndex: selectedExpertIndex,
        //   },
        //   // { type: `bmBmAdsReport`}
        // );
        setConversationStage(3);
        setConversation(updatedConversation);

        await saveConversationToIndexedDB(
          {
            id: conversationId,
            inputBusinessInfo: inputBusinessInfo,
            analysisReportData: analysisReportData,
            strategyReportData: strategyReportData,
            conversation: updatedConversation,
            conversationStage: conversationStage,
            selectedAdditionalKeywords: selectedAdditionalKeyword,
            selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
            additionalReportData: additionalReportData,
            customerAdditionalReportData: customerAdditionalReportData,
            timestamp: Date.now(),
            expert_index: selectedExpertIndex,
            selectedPocOptions: selectedPocOptions,
            pocPersonaList: pocPersonaList,
            selectedPocTarget: selectedPocTarget,
            recommendedTargetData: recommendedTargetData,
            pocDetailReportData : pocDetailReportData,
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
            bmBmAdsReportData : response.data.bm_bm_ads_report,
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
        setIsLoading(false);
        setIsLoadingIdeaPriority(false);
      }
    };

    fetchBmBmAdsReport();
  }, [bmBmAdsButtonState]);

  const examplesPerPage = 5; // 페이지당 표시할 예시 개수

  // 전체 예시를 하나의 배열로 모으기
  const allExamples = bmBmAdsReportData.reduce((acc, section) => {
    section.keywords.forEach((keywordItem) => {
      if (keywordItem.examples) acc.push(...keywordItem.examples);
    });
    return acc;
  }, []);
  
  // 현재 페이지에 표시할 예시 목록 계산
  const paginatedExamples = (examples) => {
    const startIndex = (currentPage - 1) * examplesPerPage;
    return examples.slice(startIndex, startIndex + examplesPerPage);
  };

  const handleExampleClick = (example) => {
    if (Object.keys(bmSelectedProblemOptions).length > 0) return;

    setProblemOptions(example); // 클릭된 example을 bmSelectedProblemOptions에 저장
  };

  const handleConfirm = async () => {
    if (!problemOptions) return;
    
    setBmSelectedProblemOptions({
      problemOptions: problemOptions,
      currentPage: currentPage,
    });
    setApproachPath(3);
    setConversationStage(3);
    setBmBmCustomButtonState(1);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message: `*${problemOptions}*에 대한 비즈니스 모델 캔버스를 작성해주세요`,
      },
      {
        type: `bmBmCustomReport`,
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
          selectedPocTarget: selectedPocTarget,
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
          bmSelectedProblemOptions : {
            problemOptions: problemOptions,
            currentPage: currentPage,
          },
          bmLeanAdsReportData : bmLeanAdsReportData,
          bmBmCustomReportData : bmBmCustomReportData,
          bmLeanCustomReportData : bmLeanCustomReportData,
        },
        isLoggedIn,
        conversationId
      );
    };
  return (
    <Wrap>
      {isLoadingIdeaPriority ? (
        <>
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing />
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing />
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
        </>
      ) : (
        <>
          <h1>제시된 고객 세그먼트(Customer Segment) 중에서 하나를 골라주세요.</h1>
          <OptionContainer>
            <ul>
              {allExamples.length > 0 ? (
                paginatedExamples(allExamples).map((example, exampleIndex) => (
                  <Option
                    key={exampleIndex}
                    onClick={() => handleExampleClick(example)} // 클릭 시 handleExampleClick 호출
                    selected={problemOptions === example}
                    bmSelectedProblemOptions={bmSelectedProblemOptions.problemOptions}
                  >
                    <Label
                      bmSelectedProblemOptions={bmSelectedProblemOptions.problemOptions}
                      selected={problemOptions === example}
                    >
                      {example}
                    </Label>
                  </Option>
                ))
              ) : (
                <li>예시 없음</li>
              )}
            </ul>
          </OptionContainer>

          <PaginationWrap>
            {/* 총 1개의 페이지네이션 */}
            {allExamples.length > examplesPerPage && (
              <Pagination bmSelectedProblemOptions={bmSelectedProblemOptions.problemOptions}>
                {Array.from({
                  length: Math.ceil(allExamples.length / examplesPerPage),
                }).map((_, pageIndex) => (
                  <li key={pageIndex}>
                    <a
                      onClick={() => handlePageChange(pageIndex + 1)}
                      className={currentPage === pageIndex + 1 ? 'active' : ''}
                    >
                      {pageIndex + 1}
                    </a>
                  </li>
                ))}
              </Pagination>
            )}

            <ButtonWrap>
              <Button 
                bmSelectedProblemOptions={bmSelectedProblemOptions.problemOptions} problemOptions={problemOptions}
                disabled={!problemOptions} // 선택이 안됐을 경우 버튼 비활성화
                onClick={() => {
                  handleConfirm();
                }}
              >
                완료
              </Button>
            </ButtonWrap>
          </PaginationWrap>
        </>
      )}
    </Wrap>
  );
};
export default OrganismBmBmAdsReport;

const Wrap = styled.div`
  max-width:540px;
  width:100%;
  display:flex;
  flex-direction:column;
  gap:20px;
  padding:20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    position:relative;
    display:flex;
    align-items:center;
    justify-content:space-between;
    // font-size:1rem;
    font-size:0.88rem;
    font-weight:700;
    text-align:left;
  }
`;

const OptionContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:8px;
`;

const Option = styled.li`
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
      ? props.bmSelectedProblemOptions
        ? "rgba(0,0,0,0.05)"
        : "rgba(4,83,244,0.05)"
      : palette.white};
  border: 1px solid ${(props) => (props.selected ? (props.bmSelectedProblemOptions ? palette.gray800 : palette.blue) : palette.lineGray)};
  transition:all .5s;

  + li {
    margin-top:8px;
  }

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height:1.3;
  }
  
  img {
    margin-bottom: 5px;
    background-color: ${(props) => (!props.selected || props.bmSelectedProblemOptions ? "rgba(246, 246, 246, 1)" : "rgba(255, 255, 255, 1)")};
    border-radius: 50%;
    padding: 10px;
    width: 34px;
    height: 34px;
  }

  &:hover {
    border-color: ${(props) =>
      props.bmSelectedProblemOptions
        ? "none" 
        : palette.blue};
  }
`;

const Label = styled.label`
  position:relative;
  display:flex;
  gap:8px;
  // align-items:flex-start;
  align-items:center;
  width:100%;
  color: ${(props) => (props.selected ? (props.bmSelectedProblemOptions ? palette.gray800 : palette.blue) : palette.gray800)};
  cursor:pointer;

  &:before {
    width:20px;
    height:20px;
    flex-shrink:0;
    border-radius:50%;
    border:1px solid ${(props) => (props.selected ? (props.bmSelectedProblemOptions ? palette.gray800 : palette.blue) : palette.lineGray)};
    background-color: ${(props) => (props.selected ? (props.bmSelectedProblemOptions ? palette.gray800 : palette.blue) : palette.white)};
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

const PaginationWrap = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
`;

const Pagination = styled.ul`
  display:flex;
  align-items:center;

  li + li:before {
    display:inline-block;
    width:1px;
    height:8px;
    background:${palette.gray300};
    content:'';
  }

  a {
    font-size:0.88rem;
    color:${palette.gray300};
    padding:0 10px;
    transition:all .5s;
    cursor: pointer;
    
    &:hover {
      color:${palette.gray700};
    }

    &.active {
      font-weight:500;
      color:${(props) => props.bmSelectedProblemOptions ? palette.gray800 : palette.chatBlue};
    }
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
  font-weight:400;
  color: ${(props) => (props.problemOptions ? palette.chatBlue : palette.gray500)};
  line-height:22px;
  padding:8px 20px;
  margin-left:auto;
  border-radius:8px;
  border:0;
  background:${palette.white};
  transition:all .5s;
  cursor: ${(props) => (
    props.problemOptions ? 'pointer' : 'default')};
  display: ${(props) => (
    props.bmSelectedProblemOptions ? 'none' : 'block')};
`;