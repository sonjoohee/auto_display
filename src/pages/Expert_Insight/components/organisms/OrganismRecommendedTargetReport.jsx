import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  STRATEGY_REPORT_DATA,
  SELECTED_TAB_COPY_1,
  SELECTED_TAB_COPY_2,
  SELECTED_TAB_COPY_3,
  TARGET_REPORT_BUTTON_STATE,
  CONVERSATION,
  APPROACH_PATH,
  isLoggedInAtom,
  INPUT_BUSINESS_INFO,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
} from "../../../AtomStates";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";

import MoleculeReportController from "../molecules/MoleculeReportController";
import {
  saveConversationToIndexedDB,
  getConversationByIdFromIndexedDB,
} from "../../../../utils/indexedDB";
import axios from "axios";

import {
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  IS_LOADING,
  SELECTED_ADDITIONAL_KEYWORD,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  IS_EDITING_NOW,
  CONVERSATION_STAGE,
  RECOMMENDED_TARGET_DATA,
  POC_DETAIL_REPORT_ATOM,
} from "../../../AtomStates";

const OrganismRecommendedTargetReport = ({ conversationId, expertIndex }) => {
  const [pocDetailReportData, setpocDetailReportData] = useAtom(POC_DETAIL_REPORT_ATOM);
  const [selectedPocOptions, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [approachPath] = useAtom(APPROACH_PATH);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedTabCopy1, setSelectedTabCopy1] = useAtom(SELECTED_TAB_COPY_1);
  const [selectedTabCopy2, setSelectedTabCopy2] = useAtom(SELECTED_TAB_COPY_2);
  const [selectedTabCopy3, setSelectedTabCopy3] = useAtom(SELECTED_TAB_COPY_3);
  const [selectedTab, setSelectedTab] = useState(0); // 선택된 보고서 탭 상태관리
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인
  const [selectedKeywords] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [loading, setLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(""); // 상태 메시지를 관리
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET); // 확인 버튼을 눌렀을 때만 저장 -> 히스토리 저장


  const axiosConfig = {
    timeout: 100000, // 100초
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };
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
  const [buttonState, setButtonState] = useAtom(TARGET_REPORT_BUTTON_STATE); // BUTTON_STATE 사용

  // Use the single strategyReportData atom
  const [strategyReportData, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA);

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const [isLoadingTarget, setIsLoadingTarget] = useState(false);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  );
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);
   // 목표 행위 텍스트를 찾는 함수
   const findGoalActionText = (index) => {
    const currentExpertData = strategyReportData[selectedExpertIndex];
    if (currentExpertData && currentExpertData.tabs[0] && currentExpertData.tabs[0].sections[0]) {
      const content = currentExpertData.tabs[0].sections[0].content[index];
      if (content && content.subContent) {
        for (let subItem of content.subContent) {
          if (subItem.subTitle === "목표 행위") {
            return subItem.text;
          }
        }
      }
    }
    return "목표 행위"; // 기본값
  };

  const addGoalActionToRecommendedTargetData = (data) => {
    if (data && data.poc_persona) {
      return {
        ...data,
        poc_persona: Object.entries(data.poc_persona).map(([key, value], index) => {
          const goalActionText = findGoalActionText(index);
          return {
            ...value,
            goalActionText: goalActionText
          };
        })
      };
    }
    return data;
  };
  const modifiedRecommendedTargetData = addGoalActionToRecommendedTargetData(recommendedTargetData);

  useEffect(() => {
    const loadData = async () => {
      let finalResponse;
        
      try {
        // Existing data handling
        if (recommendedTargetData && Object.keys(recommendedTargetData).length > 0) {
          // setTabs(recommendedTargetData.tabs);
          // setSections(recommendedTargetData.tabs[selectedTab].sections);
        }
        // buttonState === 1일 때만 API 호출
        else if (buttonState === 1) {
          setButtonState(0); // 버튼 상태를 초기화
          setIsLoadingTarget(true);
          setIsLoading(true);
          setIsEditingNow(false); // 수정 상태 초기화

          const data = {
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: analysisReportData.title,
              주요_목적_및_특징: analysisReportData.mainFeatures,
              주요기능: analysisReportData.mainCharacter,
              목표고객: analysisReportData.mainCustomer,
            },
            goal : selectedPocOptions[0],
            target : selectedPocTarget.title,
            poc_report : strategyReportData[selectedExpertIndex]
          };

          let response1 = await axios.post(
            "https://wishresearch.kr/panels/expert/poc_persona",
            data,
            axiosConfig
          );

          finalResponse = response1.data;

          const targetData = finalResponse;

          setRecommendedTargetData(targetData);

          setIsLoadingTarget(false);
          setIsLoading(false);

          const updatedConversation = [...conversation];
          updatedConversation.push(
            {
              type: "system",
              message:
                "리포트 내용을 보시고 추가로 궁금한 점이 있나요? 아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊",
              expertIndex: selectedExpertIndex,
            },
            { type: `keyword` }
          );
          setConversationStage(3);
          setConversation(updatedConversation);
          await saveConversationToIndexedDB(
            {
              id: conversationId,
              inputBusinessInfo: inputBusinessInfo,
              analysisReportData: analysisReportData,
              strategyReportData: strategyReportData,
              selectedAdditionalKeywords: selectedKeywords,
              conversationStage: 3,
              conversation: updatedConversation,
              selectedAdditionalKeywords: selectedAdditionalKeyword,
              selectedCustomerAdditionalKeyword:
              selectedCustomerAdditionalKeyword,
              additionalReportData: additionalReportData,
              customerAdditionalReportData: customerAdditionalReportData,
              timestamp: Date.now(),
              expert_index: selectedExpertIndex,
              selectedPocOptions: selectedPocOptions,
              selectedPocTarget: selectedPocTarget,
              recommendedTargetData: targetData,
              pocDetailReportData : pocDetailReportData
            },
            isLoggedIn,
            conversationId
          );
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [conversationId, expertIndex, buttonState]); // buttonState 의존성 추가

  return (
    <>
        <AnalysisSection Strategy>
      {/* PDF로 변환할 콘텐츠를 감싸는 div에 id 추가 */}
      <div id="print-content">
        {isLoadingTarget ? (
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
          <TabHeader>
            <h1 active={true} expertIndex={expertIndex} style={{marginBottom:"0"}}>
              PoC 목적별 추천 타겟 및 예상 인사이트
            </h1>
          </TabHeader>

          {recommendedTargetData && recommendedTargetData.poc_persona && (
            <>
              {Object.entries(recommendedTargetData.poc_persona).map(([key, value], index) => {
                      const goalActionText = findGoalActionText(index);
                      return (
                        <SeparateSection key={index}>
                          <strong>
                            <span className="number">{index + 1}</span>
                            <strong_title>{goalActionText}</strong_title>
                          </strong>
                          <div className="bgWhite">
                          <p style={{ textIndent: '-1em', paddingLeft: '1em', marginBottom: '5px' }}>
                              1. 추천 가상 페르소나 : {value[0]["추천 가상 페르소나"]}
                            </p>
                            <p style={{ textIndent: '-1em', paddingLeft: '1em', marginTop: '5px' }}>
                              2. 이유 및 예상 인사이트 : {value[1]["이유 및 예상 인사이트"]}
                            </p>
                          </div>
                        </SeparateSection>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
      {!isLoadingTarget && (
        <MoleculeReportController
          reportIndex={4}
          strategyReportID={expertIndex}
          conversationId={conversationId}
          sampleData={modifiedRecommendedTargetData}
        />
      )}
    </AnalysisSection>
    </>
  );
};


  export default OrganismRecommendedTargetReport;
  const SeparateSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    padding: 20px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.03);
  
    + div {
      margin-top: 12px;
    }
  
    h4 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }
  
    span.number {
      width: 15px;
      height: 15px;
      font-size: 0.63rem;
      color: ${palette.blue};
      line-height: 15px;
      text-align: center;
      border: 1px solid ${palette.blue};
    }
  
    strong {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      font-size: 0.875rem;
      font-weight: 400;
      color: ${palette.darkGray};
    }
  
    strong_title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;
      font-weight: 700;
      color: ${palette.darkGray};
    }
  
    p {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${palette.darkGray};
      line-height: 1.5;
    }
  
    .flexBox {
      display: flex;
      gap: 12px;
      margin-top: 12px;
  
      > div {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid ${palette.lineGray};
  
        p {
          overflow: visible;
          // text-overflow: ellipsis;
          display: flex;
          // -webkit-line-clamp: 3;
          // -webkit-box-orient: vertical;
        }
      }
  
      .bgWhite {
        margin-top: 0 !important;
      }
    }
  
    .bgWhite {
      padding: 15px !important;
      margin-top: 12px;
      border-radius: 10px;
      border: 1px solid ${palette.white} !important;
      background: ${palette.white};
  
      .title {
        color: ${palette.black};
        font-weight: 700;
      }
    }
  
    ul {
      display: flex;
      flex-direction: column;
      gap: 5px;
  
      li {
        position: relative;
        font-size: 0.875rem;
        color: ${palette.darkGray};
        line-height: 1.5;
        padding-left: 13px;
  
        &:before {
          position: absolute;
          top: 8px;
          left: 0;
          width: 5px;
          height: 1px;
          background: ${palette.black};
          content: "";
        }
      }
    }
  `;
  
  const AnalysisSection = styled.div`
    position: relative;
    max-width: 1135px;
    width: 91.5%;
    text-align: left;
    margin-top: 25px;
    padding: 30px;
    border-radius: 15px;
    border: 1px solid ${palette.lineGray};
  
    h1 {
      font-size: 1.25rem;
      font-weight: 400;
      margin-bottom: 20px;
    }
  
    > p {
      font-size: 0.875rem;
      line-height: 1.5;
      margin-top: 15px;
  
      span {
        color: ${palette.red};
      }
    }
  `;
  
  
  const TabHeader = styled.div`
    display: flex;
    gap: 40px;
    margin-bottom: 20px;
  `;
  
  // color: ${(props) => (props.active ? palette.black : palette.lightGray)};
  
  const TabButton = styled.button`
    font-family: "Pretendard", "Poppins";
    font-size: 1.25rem;
    font-weight: 400;
  
    color: ${(props) =>
      props.active
        ? palette.black
        : props.expertIndex === "1"
        ? `rgba(0,0,0,.2)` // 1번 전문가일 때
        : props.expertIndex === "2"
        ? `rgba(0,0,0,.2)` // 2번 전문가일 때
        : `rgba(0,0,0,.2)`}; // 3번 전문가일 때
    border: none;
    border-bottom: ${(props) =>
      props.active ? `1px solid ${palette.black}` : "none"};
    background: ${palette.white};
    cursor: pointer;
    transition: all 0.5s;
  
    &:hover {
      color: ${palette.black};
    }
  
    &:focus {
      outline: none;
    }
  `;
  
  const Spacing = styled.div`
    margin-bottom: 40px; /* 제목과 본문 사이의 간격 */
  `;
  
  const SectionWrapper_2 = styled.div`
    // padding: 12px;
    // border-radius: 10px;
    // border: 1px solid ${palette.lineGray};
  `;