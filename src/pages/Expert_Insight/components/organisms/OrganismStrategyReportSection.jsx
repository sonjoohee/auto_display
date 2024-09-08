import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  SELECTED_TAB,
  EXPERT_BUTTON_STATE,
  CONVERSATION,
  APPROACH_PATH,
  isLoggedInAtom,
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
} from "../../../AtomStates";

const OrganismStrategyReportSection = ({ conversationId, expertIndex }) => {
  // console.log("🚀 ~ OrganismStrategyReportSection ~ expertIndex:", expertIndex);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [approachPath] = useAtom(APPROACH_PATH);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedTab, setSelectedTab] = useAtom(SELECTED_TAB); // 탭을 인덱스로 관리
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인

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

  const [expert1ReprotData, setExpert1ReportData] =
    useAtom(EXPERT1_REPORT_DATA);
  const [expert2ReprotData, setExpert2ReportData] =
    useAtom(EXPERT2_REPORT_DATA);
  const [expert3ReprotData, setExpert3ReportData] =
    useAtom(EXPERT3_REPORT_DATA);

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const [isLoading, setIsLoading] = useState(false);

  // 전문가 인덱스에 따라 해당 Atom을 선택
  const strategyReportAtomMap = {
    1: EXPERT1_REPORT_DATA,
    2: EXPERT2_REPORT_DATA,
    3: EXPERT3_REPORT_DATA,
  };

  const sampleDataMap = {
    1: sampleData1,
    2: sampleData2,
    3: sampleData3,
  };

  const strategyReportAtom =
    strategyReportAtomMap[selectedExpertIndex] || EXPERT3_REPORT_DATA;
  const sampleData = sampleDataMap[selectedExpertIndex] || sampleData3;

  const [strategyReportData, setStrategyReportData] =
    useAtom(strategyReportAtom);

  useEffect(() => {
    const loadData = async () => {
      let finalResponse;
      if (buttonState === 1) {
        // BUTTON_STATE가 1일 때만 API 호출
        setIsLoading(true);
        setButtonState(0); // BUTTON_STATE를 초기화
        try {
          const existingConversation = await getConversationByIdFromIndexedDB(
            conversationId,
            isLoggedIn
          );
          let currentReportKey = `strategyReportData_EX${selectedExpertIndex}`;

          console.log(
            "🚀 ~ loadData ~ existingConversation:",
            existingConversation
          );
          // console.log("🚀 ~ loadData ~ currentReportKey:", currentReportKey);
          if (
            existingConversation &&
            existingConversation[currentReportKey] &&
            existingConversation[currentReportKey].expert_id ===
              parseInt(selectedExpertIndex, 10)
          ) {
            const strategyData = existingConversation[currentReportKey];
            setStrategyReportData(strategyData);
            setTabs(strategyData.tabs);
            setSections(strategyData.tabs[selectedTab].sections);
          } else if (Object.keys(strategyReportData).length >= 0) {
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
            // console.log("🚀 ~ loadData ~ data:", data);

            const response1 = await axios.post(
              "https://wishresearch.kr/panels/expert",
              data,
              axiosConfig
            );

            finalResponse = response1.data;
            // console.log("🚀 ~ loadData ~ finalResponse:", finalResponse);

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

            // console.log("Final response data:", finalResponse);

            const strategyData = finalResponse;
            // console.log("🚀 ~ loadData ~ strategyData:", strategyData);

            setStrategyReportData(strategyData);
            setTabs(strategyData.tabs);
            setSections(strategyData.tabs[selectedTab].sections);

            if (strategyData.expert_id === 1)
              setExpert1ReportData(strategyData);
            else if (strategyData.expert_id === 2)
              setExpert2ReportData(strategyData);
            else if (strategyData.expert_id === 3)
              setExpert3ReportData(strategyData);

            const updatedConversation = {
              ...existingConversation,
              [currentReportKey]: strategyData,
              timestamp: Date.now(),
              expert_index: selectedExpertIndex,
            };
            // console.log(
            //   "🚀 ~ loadData ~ existingConversation:",
            //   existingConversation
            // );
            // console.log(
            //   "🚀 ~ loadData ~ updatedConversation:",
            //   updatedConversation
            // );

            await saveConversationToIndexedDB(
              updatedConversation,
              isLoggedIn,
              conversationId
            );
          } else {
            setTabs(strategyReportData.tabs);
            setSections(strategyReportData.tabs[selectedTab].sections);
          }
        } catch (error) {
          console.error("Error loading data:", error);
        }
        setIsLoading(false);

        const updatedConversation = [...conversation];
        updatedConversation.push(
          {
            type: "system",
            message:
              "리포트 내용을 보시고 추가로 궁금한 점이 있나요? 아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊",
          },
          { type: `keyword` }
        );
        const existingConversation2 = await getConversationByIdFromIndexedDB(
          conversationId,
          isLoggedIn
        );
        const updatedConversation2 = {
          ...existingConversation2,
          expert_index: selectedExpertIndex,
          conversation: updatedConversation,
          timestamp: Date.now(),
          expert_index: selectedExpertIndex,
        };

        // console.log(
        //   "🚀 ~ loadData ~ existingConversation2:",
        //   existingConversation2
        // );
        // console.log(
        //   "🚀 ~ loadData ~ updatedConversation2:",
        //   updatedConversation2
        // );
        setConversation(updatedConversation);
        const currentReportKey = `strategyReportData_EX${selectedExpertIndex}`;
        const strategyData = finalResponse;
        await saveConversationToIndexedDB(
          updatedConversation2,
          isLoggedIn,
          conversationId
        );
      }
    };
    loadData();
  }, [buttonState, conversationId, selectedTab, expertIndex]); // buttonState 의존성 추가

  const handleTabClick = (index) => {
    setSelectedTab(index);
    if (tabs.length > 0) {
      setSections(tabs[index].sections);
    }
  };

  return (
    <>
      <AnalysisSection Strategy>
        <TabHeader>
          {tabs.map((tab, index) => (
            <TabButton
              key={index}
              active={selectedTab === index}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </TabButton>
          ))}
        </TabHeader>

        {isLoading ? (
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
        ) : Array.isArray(sections) && sections.length > 0 ? (
          sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              content={section.content}
            />
          ))
        ) : (
          <>
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
          </>
        )}

        {!isLoading && (
          <MoleculeReportController
            reportIndex={1}
            strategyReportID={strategyReportData.expert_id}
            conversationId={conversationId}
            sampleData={strategyReportData}
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
        nonSubTitleItems.map((item, index) => (
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
          {subTitleItems.map((item, index) => (
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
