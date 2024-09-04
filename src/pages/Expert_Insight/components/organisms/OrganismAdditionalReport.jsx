import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_INDEX,
  SELECTED_TAB,
  SELECTED_ADDITIONAL_KEYWORD, // Import the new atom
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  ADDITION_BUTTON_STATE,
  CONVERSATION,
  APPROACH_PATH,
  IS_LOADING,
} from "../../../AtomStates";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";
import {
  saveConversationToIndexedDB,
  getConversationByIdFromIndexedDB,
} from "../../../../utils/indexedDB";
import axios from "axios";
import {
  SkeletonH1,
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";

const OrganismAdditionalReport = ({ conversationId, expertIndex }) => {
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [approachPath] = useAtom(APPROACH_PATH);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

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
  const [buttonState, setButtonState] = useAtom(ADDITION_BUTTON_STATE);

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [selectedTab, setSelectedTab] = useAtom(SELECTED_TAB);
  const [selectedKeywords] = useAtom(SELECTED_ADDITIONAL_KEYWORD); // Access the list of selected keywords
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  ); // Use the list-based atom
  const [answerData, setAnswerData] = useState(null);
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  // const additionalReportAtom = strategyReportAtomMap[expertIndex] || ADDITIONAL_REPORT_DATA1;
  // const [additionalReportData, setAdditionalReportData] = useAtom(additionalReportAtom);

  useEffect(() => {
    const loadData = async () => {
      try {
        const existingConversation = await getConversationByIdFromIndexedDB(
          conversationId
        );

        if (buttonState === 1) {
          // 버튼 상태가 1일 때만 API 요청 실행
          setButtonState(0); // 버튼 상태 초기화
          setIsLoading(true);

          const keyword = selectedKeywords[selectedKeywords.length - 1]; // Use the keyword based on expertIndex

          const data = {
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: analysisReportData.title,
              개요: {
                주요_목적_및_특징: analysisReportData.mainFeatures.map(
                  (feature) => feature.기능
                ),
              },
              주요기능: analysisReportData.mainFeatures,
              목표고객: analysisReportData.mainCustomer,
            },
            question_info: keyword,
          };

          const response = await axios.post(
            "https://wishresearch.kr/panels/add_question",
            data,
            axiosConfig
          );
          console.log(response);
          const answerData = response.data.additional_question;
          setAnswerData(answerData);
          setSections(answerData.sections);

          // 기존의 추가 리포트 데이터에 새로 가져온 데이터를 추가합니다.
          const updatedAdditionalReportData = [
            ...additionalReportData,
            answerData,
          ];
          setAdditionalReportData(updatedAdditionalReportData);

          //         // Report fetching logic
          //         if (!existingConversation || additionalReportData.length === 0) {
          //           const keyword = selectedKeywords[expertIndex - 1]; // Use the keyword based on expertIndex

          //           const data = {
          //             business_info: "초고속 팝업 텐트",
          //             business_analysis_data: {
          //               business_info: "초고속 팝업 텐트",
          //               business_analysis_data: {
          //                 "명칭":"초고속 팝업 텐트",
          //                 "개요": {
          //                   "주요_목적_및_특징":"초고속 팝업 텐트는 30초 만에 설치가 가능한 휴대용 텐트로, 캠핑, 야외 활동, 비상 대피 시 빠르고 간편하게 사용할 수 있는 것이 가장 큰 특징입니다. 가볍고 컴팩트한 디자인으로 휴대 및 보관이 용이하며, 내구성이 뛰어나 다양한 환경에서 안전하게 사용할 수 있습니다."
          //                 },
          //                 "주요기능":[
          //                   {
          //                     "기능":"초고속 설치",
          //                     "설명":"특허 받은 팝업 구조를 적용하여 30초 만에 텐트를 설치할 수 있습니다. 텐트를 펼치면 자동으로 프레임이 형성되어 별도의 조립 과정이 필요하지 않습니다. 캠핑, 야외 활동, 비상 대피 시 빠르게 텐트를 설치하여 안전하고 편리하게 사용할 수 있습니다."
          //                   },
          //                   {
          //                     "기능":"휴대성 및 보관 용이성",
          //                     "설명":"가볍고 컴팩트한 디자인으로 휴대 및 보관이 용이합니다. 전용 가방에 담아 손쉽게 이동 및 보관할 수 있으며, 차량 트렁크나 백팩에 넣어 휴대하기에도 편리합니다."
          //                   },
          //                   {
          //                     "기능":"내구성 및 안전성",
          //                     "설명":"고품질 소재와 튼튼한 프레임 구조로 제작되어 험한 환경에서도 안전하게 사용할 수 있습니다. 방수, 방풍, 자외선 차단 기능을 갖추어 다양한 기후 조건에서도 쾌적하게 사용할 수 있습니다."
          //                   }
          //                 ],
          //                 "목표고객":[
          //                   {
          //                     "고객_세그먼트":"캠핑 및 야외 활동 애호가",
          //                     "설명":"캠핑, 백패킹, 낚시, 등산 등 다양한 야외 활동을 즐기는 사람들로, 빠르고 간편한 텐트 설치를 선호하며, 휴대 및 보관이 용이한 제품을 찾습니다. 초고속 팝업 텐트는 빠른 설치 시간, 휴대성, 내구성을 갖추어 이러한 고객들의 요구를 충족시킬 수 있습니다."
          //                   },
          //                   {
          //                     "고객_세그먼트":"가족 단위 여행객",
          //                     "설명":"가족 단위로 여행을 자주 다니는 사람들로, 아이들과 함께 캠핑을 즐기거나, 여행 중 갑작스러운 비나 추위로부터 보호할 수 있는 텐트를 필요로 합니다. 초고속 팝업 텐트는 빠르고 간편한 설치, 넓은 공간, 안전성을 갖추어 가족 단위 여행객에게 안성맞춤입니다."
          //                   },
          //                   {
          //                     "고객_세그먼트":"비상 대피 및 재난 대비 용품 구매자",
          //                     "설명":"자연 재해 발생 시 대피를 위한 텐트를 구비하고자 하는 사람들로, 빠른 설치, 휴대성, 내구성을 중요하게 생각합니다. 초고속 팝업 텐트는 비상 상황에서 빠르게 설치하여 안전을 확보하고, 휴대 및 보관이 용이하여 비상 대피 용품으로 적합합니다."
          //                   }
          //                 ]
          //               },
          //               "tabs": [],
          //               "page_index": 1
          //             },
          //             "question_info": keyword
          //           };

          //           const response = await axios.post('https://wishresearch.kr/panels/add_question', data, axiosConfig);
          //           console.log(response)
          //           const answerData = response.data.additional_question;
          //           setAnswerData(answerData);
          //           setSections(answerData.sections);

          //           // 기존의 추가 리포트 데이터에 새로 가져온 데이터를 추가합니다.
          //           const updatedAdditionalReportData = [...additionalReportData, answerData];
          //           setAdditionalReportData(updatedAdditionalReportData);

          const updatedConversation = {
            ...existingConversation,
            additionalReportData: updatedAdditionalReportData, // 전체 리스트를 저장
            timestamp: Date.now(),
          };
          await saveConversationToIndexedDB(updatedConversation);

          setIsLoading(false);

          const updatedConversation2 = [...conversation];
          updatedConversation2.push(
            { type: 'system', message: `"${titleOfBusinessInfo}"과 관련된 시장에서의 BDG 메트릭스를 기반으로 ${selectedAdditionalKeyword[selectedAdditionalKeyword.length-1]}를 찾아드렸어요\n추가적인 질문이 있으시면, 언제든지 물어보세요💡 다른 분야 전문가의 의견도 프로젝트에 도움이 될거에요👇🏻` },
            { type: `keyword` },
          );
          setConversation(updatedConversation2);
        } else {
          // 기존 데이터가 있을 때 처리
          if (existingConversation && additionalReportData.length > 0) {
            setTabs(additionalReportData[selectedTab]?.tabs || []);
            setSections(additionalReportData[selectedTab]?.sections || []);
          } else {
            // console.warn('No saved additional report data found.');
          }
          //           console.log()
          //         } else {
          //           // 기존 데이터가 있을 때 처리
          //           setTabs(additionalReportData[selectedTab]?.tabs || []);
          //           setSections(additionalReportData[selectedTab]?.sections || []);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [
    conversationId,
    expertIndex,
    selectedTab,
    selectedKeywords,
    buttonState, // buttonState 의존성 추가
  ]);

  //     loadData();
  //   }, [conversationId, selectedTab, expertIndex, selectedKeywords]);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    if (tabs.length > 0) {
      setSections(tabs[index].sections);
    }
  };

  return (
    <AnalysisSection Strategy>
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
      ) :
      <>
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

      {sections.map((section, index) => (
        <Section key={index} title={section.title} content={section.content} />
      ))}

      <MoleculeReportController
        reportIndex={2}
        conversationId={conversationId}
        sampleData={answerData}
      />
      </>
    }
    </AnalysisSection>
  );
};

// ... (아래 부분은 동일)

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
            {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
          </div>
        ))}

      {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
      {subTitleItems.length > 0 && (
        <DynamicGrid columns={subTitleItems.length}>
          {subTitleItems.map((item, index) => (
            <div key={index}>
              {item.subTitle && <SubTitle>{item.subTitle}</SubTitle>}
              <p>{item.text}</p>
              {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
            </div>
          ))}
        </DynamicGrid>
      )}
    </BoxWrap>
  );
};

export default OrganismAdditionalReport;

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
    font-size:0.875rem;
    line-height:1.5;
    margin-top:15px;

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
    font-size:0.875rem;
    margin-bottom:10px;
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
  font-size:0.875rem;
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
