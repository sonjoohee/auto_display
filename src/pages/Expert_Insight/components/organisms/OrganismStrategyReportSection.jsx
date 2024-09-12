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
          setTabs(expert1ReportData.tabs);
          setSections(expert1ReportData.tabs[selectedTab].sections);
        } else if (
          expertIndex === "2" &&
          Object.keys(expert2ReportData).length > 0
        ) {
          setTabs(expert2ReportData.tabs);
          setSections(expert2ReportData.tabs[selectedTab].sections);
        } else if (
          expertIndex === "3" &&
          Object.keys(expert3ReportData).length > 0
        ) {
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
              strategyReportData_EX1: expert1ReportData,
              strategyReportData_EX2: expert2ReportData,
              strategyReportData_EX3: expert3ReportData,
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
              strategyReportData_EX1: expert1ReportData,
              strategyReportData_EX2: expert2ReportData,
              strategyReportData_EX3: expert3ReportData,
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
        ) :
        <>
          <TabHeader>
            {tabs &&
              tabs.length > 0 &&
              tabs?.map((tab, index) => (
                <TabButton
                  key={index}
                  active={selectedTab === index}
                  expertIndex={expertIndex}  // 전달
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
              isLast={index === sections.length - 1}
              expertIndex={expertIndex}
            />
          ))}
        </>
        }

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

const Section = ({ title, content, isLast, expertIndex }) => {
  // 서브 타이틀이 있는 항목과 없는 항목을 분리
  const subTitleItems = content.filter((item) => item.subTitle);
  const nonSubTitleItems = content.filter((item) => !item.subTitle);

  // subText에서 ':'로 분리하여 subTitle과 text를 따로 처리
  const splitText = (text) => {
    const [subTitle, ...rest] = text.split(':');
    return {
      subTitle: subTitle.trim(), // ':' 앞부분
      text: rest.join(':').trim(), // ':' 뒷부분
    };
  };

  // 기존 subTitle과 text를 합쳐 새로운 text 생성
  const mergeSubTitleAndText = (subTitle, text) => `${subTitle} : ${text}`;

  // 두 섹션의 데이터를 결합하여 하나의 섹션처럼 처리 (이전 섹션들의 combinedContent 포함)
  const combinedContent = [
    ...subTitleItems.map((item) => ({
      text: mergeSubTitleAndText(item.subTitle, item.text)
    }))
  ];

  // 전역적으로 두 섹션의 데이터를 저장할 수 있는 별도의 배열을 생성 (전역적으로 이 두 섹션의 데이터를 병합)
  const globalCombinedContent = [];

  // 이 함수는 "주요 차별화 요소"와 "차별화 전략 제안"이 있을 때 데이터를 병합해서 한 번만 렌더링
  const renderCombinedSections = () => {
    if (title === "주요 차별화 요소" || title === "차별화 전략 제안" || title === "경쟁 압박 대처 방안" || title === "장기적인 경쟁 우위 전략") {
      // 중복 호출 방지를 위해 한 번 병합된 후 다시 병합되지 않도록 확인
      if (globalCombinedContent.length === 0) {
        globalCombinedContent.push(...combinedContent); // 데이터 병합
      }

      return (
        <>
          <strong>
            <img src={images.Check} alt="" /> {/* 체크 이미지 추가 */}
            {/* 경쟁사 대비 차별화 전략 */}
            {title}
          </strong>
          <SubTextBox>
          {globalCombinedContent.map((item, index) => (
            <div key={index}>
              <p>{item.text}</p>
            </div>
          ))}
          </SubTextBox>
        </>
      );
    }
  };

  return (
    <BoxWrap expertIndex={expertIndex} isLast={isLast}>
      {/* "주요 차별화 요소"와 "차별화 전략 제안" 데이터를 결합하여 한 번만 렌더링 */}
      {renderCombinedSections()}

      {/* title 표시 (특정 타이틀 제외) */}
      {!isLast && title && !(title === "주요 차별화 요소" || title === "차별화 전략 제안" 
      || title === "경쟁 압박 대처 방안" 
      || title === "장기적인 경쟁 우위 전략") && (
        <strong>
          <img src={images.Check} alt="" />
          {title}
        </strong>
      )}

      {/* "시장 위치 평가 및 경쟁자 분석"일 때 nonSubTitleItems 텍스트를 제목 밑에 출력 */}
      {title === "시장 위치 평가 및 경쟁자 분석" && nonSubTitleItems.length > 0 && (
        <>
          {nonSubTitleItems.map((item, index) => (
            <div key={index}>
              {/* "시장 위치 평가 및 경쟁자 분석"에서 텍스트를 출력 */}
              <p>{item.text}</p>
            </div>
          ))}
        </>
      )}

      {/* "특징" 또는 "차별화 요소" 섹션을 처리 */}
      {(title === "특징" || title === "차별화 요소" || title === "시장 위치 평가 및 경쟁자 분석") && subTitleItems.length > 0 && (
        <>
          {subTitleItems.map((item, index) => (
            <SeparateSection key={index}>
              <strong>
                <span className="number">{index + 1}</span> {/* 번호 추가 */}
                <strong_title>{`${title} : ${item.subTitle}`}</strong_title> {/* 이 부분만 bold 처리 */}
              </strong>
              <p>{item.text}</p>

              {/* subText1, subText2, subText3에 대해 NumDynamicGrid 적용 */}
              <NumDynamicGrid columns={2}>
                {item.subText1 && (
                  <div>
                    <SubTitle>{splitText(item.subText1).subTitle}</SubTitle>
                    <p>{splitText(item.subText1).text}</p>
                  </div>
                )}
                {item.subText2 && (
                  <div>
                    <SubTitle>{splitText(item.subText2).subTitle}</SubTitle>
                    <p>{splitText(item.subText2).text}</p>
                  </div>
                )}
                {item.subText3 && (
                  <div>
                    <SubTitle>{splitText(item.subText3).subTitle}</SubTitle>
                    <p>{splitText(item.subText3).text}</p>
                  </div>
                )}
              </NumDynamicGrid>
            </SeparateSection>
          ))}
        </>
      )}

      {/* "특징", "차별화 요소", "경쟁 분석"이 아닌 경우 기존 방식대로 처리 */}
      {title !== "특징" 
      && title !== "차별화 요소" 
      && title !== "시장 위치 평가 및 경쟁자 분석" 
      && title !== "주요 차별화 요소" 
      && title !== "차별화 전략 제안" 
      && title !== "경쟁사 대비 차별화 전략" 
      && title !== "경쟁 압박 대처 방안" 
      && title !== "장기적인 경쟁 우위 전략" 
      && (
        <>
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
                  <SubTitle>{item.subTitle}</SubTitle>
                  <p>{item.text}</p>
                  {item.subText1 && <SubTextBox>{item.subText1}</SubTextBox>}
                  {item.subText2 && <SubTextBox>{item.subText2}</SubTextBox>}
                  {item.subText3 && <SubTextBox>{item.subText3}</SubTextBox>}
                </div>
              ))}
            </DynamicGrid>
          )}
        </>
      )}
    </BoxWrap>
  );
};

export default OrganismStrategyReportSection;
const SeparateSection = styled.div`
  display: flex;
  flex-direction: column;
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
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
        content: '';
      }
    }
  }
`;

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
  background: ${(props) => 
    props.isLast ? palette.white : "rgba(0, 0, 0, 0.04)" };  /* 마지막 섹션은 흰색 배경 */

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    color: ${(props) =>
      props.expertIndex === '1' ? palette.darkGray :  // 1번 전문가일 때 글자색 파란색
      props.expertIndex === '2' ? palette.darkGray :   // 2번 전문가일 때 글자색 빨간색
      palette.darkGray};                             // 3번 전문가일 때 글자색 녹색
  }

  p {
    font-size: 0.875rem;
    color: ${(props) =>
      props.expertIndex === '1' ? palette.darkGray :
      props.expertIndex === '2' ? palette.darkGray :
      palette.darkGray};
    line-height: 1.5;
  }

  /* 마지막 섹션일 경우 title을 숨기고, 내부 텍스트만 보이도록 */
  ${(props) =>
    props.isLast &&
    `
    strong {
      display: none;
    }
  `}
`;

const TabHeader = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
`;

// color: ${(props) => (props.active ? palette.black : palette.lightGray)};

const TabButton = styled.button`
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  
  color: ${(props) =>
    props.expertIndex === '1'
      ? palette.black // 1번 전문가일 때
      : props.expertIndex === '2'
      ? palette.black // 2번 전문가일 때
      : palette.black}; // 3번 전문가일 때
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
const NumDynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr); /* 동적 컬럼 수 설정 */
  gap: 10px;
  margin-top: 10px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
    position: relative; /* 번호 표시를 위한 상대적 위치 */

    /* 각 div 내에서 번호를 표시하는 span.number */
    span.number {
      width: 20px;
      height: 20px;
      font-size: 0.75rem;
      color: ${palette.blue};
      line-height: 20px;
      text-align: center;
      border: 1px solid ${palette.blue};
      position: absolute;
      top: -10px;
      left: -10px;
      background-color: ${palette.white}; /* 번호 배경색 */
      border-radius: 50%;
    }
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
  }
`;
