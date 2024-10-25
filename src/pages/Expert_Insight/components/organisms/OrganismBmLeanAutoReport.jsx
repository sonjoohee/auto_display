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
  BM_LEAN_AUTO_REPORT_DATA,
  BM_LEAN_AUTO_REPORT_BUTTON_STATE,
  BM_QUESTION_LIST,
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";

import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";

const OrganismBmLeanAutoReport = () => {
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

  const [bmLeanAutoButtonState, setBmLeanAutoButtonState] = useAtom(BM_LEAN_AUTO_REPORT_BUTTON_STATE);

  
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [isLoadingIdeaPriority, setIsLoadingIdeaPriority] = useState(false);
  const [bmLeanAutoReportData, setBmLeanAutoReportData] = useAtom(BM_LEAN_AUTO_REPORT_DATA);
  const [bmQuestionList, setbmQuestionList] = useAtom(BM_QUESTION_LIST);

  
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchBmLeanAutoReport = async () => {

      if(bmLeanAutoButtonState) {
        setIsLoading(true);
        setIsLoadingIdeaPriority(true);
        setBmLeanAutoButtonState(0);

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
          "https://wishresearch.kr/panels/lean_auto_report",
          data,
          axiosConfig
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || !response.data || typeof response.data !== "object" ||
          !response.data.hasOwnProperty("bm_lean_auto_report") ||
          !Array.isArray(response.data.bm_lean_auto_report) ||
          response.data.bm_lean_auto_report.some(section => 
            !section.hasOwnProperty("section") || 
            !Array.isArray(section.content) || 
            section.content.some(contentItem => 
              !contentItem.hasOwnProperty("title") || 
              !contentItem.hasOwnProperty("description") || 
              !Array.isArray(contentItem.keyword)
            )
          )
        )) {
          response = await axios.post(
            "https://wishresearch.kr/panels/lean_auto_report",
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

        setBmLeanAutoReportData(response.data.bm_lean_auto_report);

        setIsLoading(false);
        setIsLoadingIdeaPriority(false);

        const updatedConversation = [...conversation];
        updatedConversation.push(
          {
            type: "system",
            message:
              "기본 린 캔버스 작성이 완료되었습니다.\n이제부터는 비즈니스 목표에 따라 비즈니스 모델을 다양하게 구분해보겠습니다.",
            expertIndex: selectedExpertIndex,
          },
          { type: `bmLeanAdsContinueButton`}
        );
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
            bmLeanAutoReportData : response.data.bm_lean_auto_report,
          },
          isLoggedIn,
          conversationId
        );
      }
    };

    fetchBmLeanAutoReport();
  }, [bmLeanAutoButtonState]);

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
          <h1>린 캔버스 보고서</h1>

          {bmLeanAutoReportData?.map((section, index) => (
            <SeparateSection key={index}>
              <h3>
                <span className="number">{index + 1}</span>
                섹션: {section?.section}
              </h3>
              {section?.content?.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  <h4>{contentItem?.title}</h4>
                  <p>{contentItem?.description}</p>
                  <div>
                    <ol className="list-decimal">
                      {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                        <li key={keywordIndex}>{keywordItem}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </SeparateSection>
          ))}


      <MoleculeReportController
        reportIndex={5}
        sampleData={bmLeanAutoReportData}
        />
      </>
      )}

    </Wrap>
  );
};

export default OrganismBmLeanAutoReport;

const Wrap = styled.div`
  max-width:986px;
  width:100%;
  display:flex;
  flex-direction:column;
  padding: 28px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    text-align:left;
    margin-bottom:20px;
  }
`;

const SeparateSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap:12px;
  margin-top: 12px;
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h3 {
    display:flex;
    align-items:center;
    gap:12px;
    font-size:1rem;
    font-weight:700;

    span {
      width: 15px;
      height: 15px;
      font-size: 0.63rem;
      color: ${palette.chatBlue};
      line-height: 15px;
      text-align: center;
      border: 1px solid ${palette.chatBlue};
    }
  }

  p {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray700};
    text-align:left;
  }

  div {
    padding:16px;
    border-radius:10px;
    background:${palette.white};
  }

  .list-decimal li {
    list-style-type:decimal;
    list-style-position:inside;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    text-align:left;
  }
`;
