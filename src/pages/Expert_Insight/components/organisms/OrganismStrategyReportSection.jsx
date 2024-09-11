import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  SELECTED_TAB_COPY,
  EXPERT_BUTTON_STATE,
  CONVERSATION,
  APPROACH_PATH,
  isLoggedInAtom,
  INPUT_BUSINESS_INFO,
} from "../../../AtomStates";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";

import MoleculeReportController from "../molecules/MoleculeReportController";
import sampleData1 from "./sample1.json";
import sampleData2 from "./sample2.json";
import sampleData3 from "./sample3.json";
import {
  saveConversationToIndexedDB,
  getConversationByIdFromIndexedDB,
} from "../../../../utils/indexedDB";
import axios from "axios";

import {
  emailAtom,
  passwordAtom,
  currentUserAtom,
  errorAtom,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  IS_LOADING,
  SELECTED_ADDITIONAL_KEYWORD,
} from "../../../AtomStates";

const OrganismStrategyReportSection = ({ conversationId, expertIndex }) => {
  // console.log("🚀 ~ OrganismStrategyReportSection ~ expertIndex:", expertIndex);
  const [inputBusinessInfo, setInputBusinessInfo] =
  useAtom(INPUT_BUSINESS_INFO);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [approachPath] = useAtom(APPROACH_PATH);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedTabCopy, setSelectedTabCopy] = useAtom(SELECTED_TAB_COPY); // 복사 기능을 위한 Atom
  const [selectedTab, setSelectedTab] = useState(0); // 선택된 보고서 탭 상태관리
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인
  const [selectedKeywords] = useAtom(SELECTED_ADDITIONAL_KEYWORD);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };
  const [email, setEmail] = useAtom(emailAtom);
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
  const [buttonState, setButtonState] = useAtom(EXPERT_BUTTON_STATE); // BUTTON_STATE 사용

  const [expert1ReportData, setExpert1ReportData] =
    useAtom(EXPERT1_REPORT_DATA);
  const [expert2ReportData, setExpert2ReportData] =
    useAtom(EXPERT2_REPORT_DATA);
  const [expert3ReportData, setExpert3ReportData] =
    useAtom(EXPERT3_REPORT_DATA);

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const [isLoadingExpert, setIsLoadingExpert] = useState(false);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  useEffect(() => {
    const loadData = async () => {
      let finalResponse;

      try {
        // 기존 데이터를 조회하는 로직을 buttonState와 상관없이 실행
        const existingConversation = await getConversationByIdFromIndexedDB(
          conversationId,
          isLoggedIn
        );
        let currentReportKey = `strategyReportData_EX${selectedExpertIndex}`;
        // 기존 데이터가 있는 경우
        if (expertIndex === "1" && Object.keys(expert1ReportData).length > 0) {
          console.log("1번 전문가");
          setTabs(expert1ReportData.tabs);
          setSections(expert1ReportData.tabs[selectedTab].sections);
        } else if (
          expertIndex === "2" &&
          Object.keys(expert2ReportData).length > 0
        ) {
          console.log("2번 전문가");
          setTabs(expert2ReportData.tabs);
          setSections(expert2ReportData.tabs[selectedTab].sections);
        } else if (
          expertIndex === "3" &&
          Object.keys(expert3ReportData).length > 0
        ) {
          console.log("3번 전문가");
          setTabs(expert3ReportData.tabs);
          setSections(expert3ReportData.tabs[selectedTab].sections);
        }
        // buttonState === 1일 때만 API 호출
        else if (buttonState === 1) {
          setButtonState(0); // 버튼 상태를 초기화
          setIsLoadingExpert(true);
          setIsLoading(true);

          const data = {
            expert_id: selectedExpertIndex,
            business_info: titleOfBusinessInfo, // DB에서 가져온 titleOfBusinessInfo 사용
            business_analysis_data: {
              명칭: analysisReportData.title,
              주요_목적_및_특징: analysisReportData.mainFeatures,
              주요기능: analysisReportData.mainCharacter,
              목표고객: analysisReportData.mainCustomer,
            },
            tabs: [],
            page_index: 1,
          };

          const response1 = await axios.post(
            "https://wishresearch.kr/panels/expert",
            data,
            axiosConfig
          );

          finalResponse = response1.data;

          if (finalResponse.total_page_index === 2) {
            const response2 = await axios.post(
              "https://wishresearch.kr/panels/expert",
              finalResponse,
              axiosConfig
            );
            finalResponse = response2.data;
          } else if (finalResponse.total_page_index === 3) {
            const response2 = await axios.post(
              "https://wishresearch.kr/panels/expert",
              finalResponse,
              axiosConfig
            );
            const response3 = await axios.post(
              "https://wishresearch.kr/panels/expert",
              response2.data,
              axiosConfig
            );
            finalResponse = response3.data;
          }

          const strategyData = finalResponse;

          if (expertIndex === "1") setExpert1ReportData(strategyData);
          else if (expertIndex === "2") setExpert2ReportData(strategyData);
          else if (expertIndex === "3") setExpert3ReportData(strategyData);

          setTabs(strategyData.tabs);
          setSections(strategyData.tabs[selectedTab].sections);

          await saveConversationToIndexedDB(
            {
              // ...existingConversation,

              id: conversationId,
              inputBusinessInfo: inputBusinessInfo,
              analysisReportData: analysisReportData,
              selectedAdditionalKeywords: selectedKeywords,
              conversation: conversation,
              conversationStage: 3,
              [currentReportKey]: strategyData,
              timestamp: Date.now(),
              expert_index: selectedExpertIndex,
            },
            isLoggedIn,
            conversationId
          );
          setIsLoadingExpert(false);
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

          const existingConversation2 = await getConversationByIdFromIndexedDB(
            conversationId,
            isLoggedIn
          );
          // const updatedConversation2 = {
          //   ...existingConversation2,
          //   expert_index: selectedExpertIndex,
          //   conversation: updatedConversation1,
          //   conversationStage: 3,
          //   timestamp: Date.now(),
          //   expert_index: selectedExpertIndex,
          // };

          setConversation(updatedConversation);
          await saveConversationToIndexedDB(
            {
              id: conversationId,
              inputBusinessInfo: inputBusinessInfo,
              analysisReportData: analysisReportData,
              selectedAdditionalKeywords: selectedKeywords,
              conversationStage: 3,
              [currentReportKey]: strategyData,
              conversation: updatedConversation,
              timestamp: Date.now(),
              expert_index: selectedExpertIndex,
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
  }, [conversationId, selectedTab, expertIndex, buttonState]); // buttonState 의존성 추가

  const handleTabClick = (index) => {
    setSelectedTab(index);
    setSelectedTabCopy(index);
    if (tabs.length > 0) {
      setSections(tabs[index].sections);
    }
  };

  return (
    <>
      <AnalysisSection Strategy>
        {isLoadingExpert ? (
          <>
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <Spacing /> {/* 제목과 본문 사이에 간격 추가 */}
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <Spacing /> {/* 제목과 본문 사이에 간격 추가 */}
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
          </>
        ) : (
          <>
            <TabHeader>
              {tabs &&
                tabs.length > 0 &&
                tabs?.map((tab, index) => (
                  <TabButton
                    key={index}
                    active={selectedTab === index}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab.title}
                  </TabButton>
                ))}
            </TabHeader>

            {sections?.map((section, index) => (
              <Section
                key={index}
                title={section.title}
                content={section.content}
              />
            ))}
          </>
        )}

        {!isLoadingExpert && (
          <MoleculeReportController
            reportIndex={1}
            strategyReportID={expertIndex}
            conversationId={conversationId}
            sampleData={
              expertIndex === "1"
                ? expert1ReportData
                : expertIndex === "2"
                ? expert2ReportData
                : expertIndex === "3"
                ? expert3ReportData
                : null
            }
          />
        )}
      </AnalysisSection>
    </>
  );
};

const Section = ({ title, content }) => {
  // 서브 타이틀이 있는 항목과 없는 항목을 분리
  const subTitleItems = content.filter((item) => item.subTitle);
  const nonSubTitleItems = content.filter((item) => !item.subTitle);

  return (
    <BoxWrap>
      {title && (
        <strong>
          <img src={images.Check} alt="" />
          {title}
        </strong>
      )}

      {/* nonSubTitleItems는 일반적으로 title과 text만 표시 */}
      {nonSubTitleItems.length > 0 &&
        nonSubTitleItems?.map((item, index) => (
          <div key={index}>
            <p>{item.text}</p>
            {item.subText1 && <SubTextBox>{item.subText1}</SubTextBox>}
            {item.subText2 && <SubTextBox>{item.subText2}</SubTextBox>}
            {item.subText3 && <SubTextBox>{item.subText3}</SubTextBox>}
          </div>
        ))}

      {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
      {subTitleItems.length > 0 && (
        <DynamicGrid columns={subTitleItems.length}>
          {subTitleItems?.map((item, index) => (
            <div key={index}>
              {item.subTitle && <SubTitle>{item.subTitle}</SubTitle>}
              <p>{item.text}</p>
              {item.subText1 && <SubTextBox>{item.subText1}</SubTextBox>}
              {item.subText2 && <SubTextBox>{item.subText2}</SubTextBox>}
              {item.subText3 && <SubTextBox>{item.subText3}</SubTextBox>}
            </div>
          ))}
        </DynamicGrid>
      )}
    </BoxWrap>
  );
};

export default OrganismStrategyReportSection;

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const TitlePlaceholder = styled.div`
  width: 60%;
  height: 30px;
  background-color: ${palette.lineGray};
  border-radius: 4px;
  animation: ${blinkAnimation} 1.5s ease-in-out infinite;
  margin-bottom: 20px;
`;
const ContentPlaceholder = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${palette.lineGray};
  border-radius: 4px;
  animation: ${blinkAnimation} 1.5s ease-in-out infinite;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 30px;
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

const BoxWrap = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);

  + div {
    margin-top: 12px;
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.875rem;
    color: ${palette.darkGray};
    line-height: 1.5;
    // margin-bottom:10px;
  }
`;

const TabHeader = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? palette.black : palette.lightGray)};
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

// DynamicGrid로 그리드 컬럼의 갯수를 서브 타이틀 갯수에 맞춰 동적으로 설정
const DynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 10px;
  margin-top: 10px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  p {
    margin: 0;
  }
`;

const SubTitle = styled.strong`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${palette.gray};
  text-align: left;
`;

const SubTextBox = styled.div`
  background: ${palette.white};
  padding: 16px;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 0.875rem;
  color: ${palette.gray};
  border: 0 !important;
`;
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .loader {
    border: 12px solid #f3f3f3; /* Light grey */
    border-top: 12px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Spacing = styled.div`
  margin-bottom: 40px; /* 제목과 본문 사이의 간격 */
`;
