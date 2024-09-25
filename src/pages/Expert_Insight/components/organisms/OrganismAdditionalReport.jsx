import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import {
  ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_INDEX,
  SELECTED_ADDITIONAL_KEYWORD, // Import the new atom
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  ADDITION_BUTTON_STATE,
  CONVERSATION,
  APPROACH_PATH,
  IS_LOADING,
  isLoggedInAtom,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  INPUT_BUSINESS_INFO,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_LIST,
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
import e from "cors";

const OrganismAdditionalReport = ({
  additionalReportCount,
  conversationId,
}) => {
  // console.log("🚀 ~ additionalReportCount:", additionalReportCount);
  const [selectedExpertList, setSelectedExpertList] =
    useAtom(SELECTED_EXPERT_LIST);
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [approachPath] = useAtom(APPROACH_PATH);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [expert1ReportData, setExpert1ReportData] =
    useAtom(EXPERT1_REPORT_DATA);
  const [expert2ReportData, setExpert2ReportData] =
    useAtom(EXPERT2_REPORT_DATA);
  const [expert3ReportData, setExpert3ReportData] =
    useAtom(EXPERT3_REPORT_DATA);
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
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [selectedKeywords] = useAtom(SELECTED_ADDITIONAL_KEYWORD); // Access the list of selected keywords
  const [title, setTitle] = useState([]);
  const [sections, setSections] = useState([]);
  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  ); // Use the list-based atom
  const [answerDataState, setAnswerDataState] = useState([]);
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);

  // const additionalReportAtom = strategyReportAtomMap[expertIndex] || ADDITIONAL_REPORT_DATA1;
  // const [additionalReportData, setAdditionalReportData] = useAtom(additionalReportAtom);

  useEffect(() => {
    const loadData = async () => {
      let answerData;

      try {
        // const existingConversation = await getConversationByIdFromIndexedDB(
        //   conversationId,
        //   isLoggedIn
        // );
        // 기존 데이터가 있을 때 처리
        if (additionalReportData[additionalReportCount]) {
          setAnswerDataState(additionalReportData[additionalReportCount]);
          setTitle(additionalReportData[additionalReportCount]?.title || []);
          setSections(
            additionalReportData[additionalReportCount]?.sections || []
          );
        } else if (buttonState === 1) {
          // 버튼 상태가 1일 때만 API 요청 실행
          setButtonState(0); // 버튼 상태 초기화
          setIsLoadingAdd(true);
          setIsLoading(true);

          const keyword = selectedKeywords[selectedKeywords.length - 1]; // Use the keyword based on expertIndex

          const data = {
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: analysisReportData.title,
              주요_목적_및_특징: analysisReportData.mainFeatures,
              주요기능: analysisReportData.mainCharacter,
              목표고객: analysisReportData.mainCustomer,
            },
            question_info: keyword,
          };

          let response = await axios.post(
            "https://wishresearch.kr/panels/add_question",
            data,
            axiosConfig
          );
          answerData = response.data.additional_question;

          while (
            !answerData.hasOwnProperty("title")
            //  || !answerData.sections[0].hasOwnProperty("title") ||
            // !answerData.sections[1].hasOwnProperty("title") ||
            // !answerData.sections[2].hasOwnProperty("title") ||
            // !answerData.sections[3].hasOwnProperty("title") ||
            // !answerData.sections[0].content.length ||
            // !answerData.sections[1].content.length ||
            // !answerData.sections[2].content.length ||
            // !answerData.sections[3].content.length
          ) {
            response = await axios.post(
              "https://wishresearch.kr/panels/add_question",
              data,
              axiosConfig
            );
            answerData = response.data.additional_question;
          }

          setAnswerDataState(answerData);
          setTitle(answerData?.title);
          setSections(answerData?.sections);

          // console.log(
          //   "🚀 ~ loadData ~ additionalReportData:",
          //   additionalReportData
          // );
          // 새로운 데이터를 배열의 맨 앞에 추가합니다.
          // let updatedAdditionalReportData = [
          //   ...(Array.isArray(additionalReportData)
          //     ? additionalReportData
          //     : [additionalReportData]),
          //   answerData,
          // ];
          let updatedAdditionalReportData = [];

          if (
            additionalReportCount === 0 ||
            additionalReportData.length === 0
          ) {
            // console.log(
            //   "🚀 ~ 첫저장 ~ additionalReportCount:",
            //   additionalReportCount
            // );
            updatedAdditionalReportData.push(answerData);
          } else {
            // console.log(
            //   "🚀 ~ 저장 ~ updatedAdditionalReportData:",
            //   additionalReportData
            // );
            updatedAdditionalReportData = additionalReportData;
            updatedAdditionalReportData.push(answerData);
          }

          // console.log(
          //   "🚀 ~ loadData ~ updatedAdditionalReportData:",
          //   updatedAdditionalReportData
          // );
          setAdditionalReportData(updatedAdditionalReportData);

          // const updatedConversation = {
          //   ...existingConversation,
          //   additionalReportData: updatedAdditionalReportData, // 전체 리스트를 저장
          //   timestamp: Date.now(),
          // };
          await saveConversationToIndexedDB(
            {
              //   id: "",
              //   conversation: [],
              //   conversationStage: 1,
              //   expertIndex: 0,
              //   analysisReportData: {},
              //   inputBusinessInfo: "",
              //   strategyReportData_EX1: {},
              //   strategyReportData_EX2: {},
              //   strategyReportData_EX3: {},
              //   additionalReportData: [],
              //   selectedAdditionalKeywords: [],
              //   timestamp: new Date().toISOString(),

              // ...existingConversation,
              // expertIndex: 0,
              id: conversationId,
              inputBusinessInfo: inputBusinessInfo,
              analysisReportData: analysisReportData,
              strategyReportData_EX1: expert1ReportData,
              strategyReportData_EX2: expert2ReportData,
              strategyReportData_EX3: expert3ReportData,
              conversation: conversation,
              selectedAdditionalKeywords: selectedKeywords,
              selectedCustomerAdditionalKeyword:
                selectedCustomerAdditionalKeyword,
              additionalReportData: updatedAdditionalReportData,
              customerAdditionalReportData: customerAdditionalReportData,
              conversationStage: 3,
              timestamp: Date.now(),
              expert_index: selectedExpertIndex,
            },
            isLoggedIn,
            conversationId
          );
          setIsLoadingAdd(false);
          setIsLoading(false);

          const updatedConversation2 = [...conversation];

          if (selectedExpertList.length === 3) {
            updatedConversation2.push({
              type: "system",
              message: `"${titleOfBusinessInfo}"과 관련된 "${
                selectedAdditionalKeyword[selectedAdditionalKeyword.length - 1]
              }" 분석 결과입니다.\n추가로 궁금한 점이 있으면 질문해 주세요 😊`,
              expertIndex: 0,
            });
          } else {
            updatedConversation2.push({
              type: "system",
              message: `"${titleOfBusinessInfo}"과 관련된 "${
                selectedAdditionalKeyword[selectedAdditionalKeyword.length - 1]
              }" 분석 결과입니다.\n추가로 궁금한 점이 있으면 질문해 주세요 😊 분야별 전문가의 의견도 확인해보세요`,
              expertIndex: 0,
            });
          }
          updatedConversation2.push({ type: "keyword" });
          setConversation(updatedConversation2);
          await saveConversationToIndexedDB(
            {
              // expertIndex: 0,
              id: conversationId,
              inputBusinessInfo: inputBusinessInfo,
              analysisReportData: analysisReportData,
              strategyReportData_EX1: expert1ReportData,
              strategyReportData_EX2: expert2ReportData,
              strategyReportData_EX3: expert3ReportData,
              selectedCustomerAdditionalKeyword:
                selectedCustomerAdditionalKeyword,
              customerAdditionalReportData: customerAdditionalReportData,
              selectedAdditionalKeywords: selectedKeywords,
              conversation: updatedConversation2,
              conversationStage: 3,
              additionalReportData: updatedAdditionalReportData,
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
      // console.log("🚀 ~ loadData ~ conversationId:", conversationId);
    };

    loadData();
  }, [
    conversationId,
    selectedKeywords,
    buttonState, // buttonState 의존성 추가
  ]);

  return (
    <AnalysisSection Strategy>
      {isLoadingAdd ? (
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
          {title && (
            <TabHeader>
              <TabTitle>{title}</TabTitle>
              {/* <TabContent>{purpose}</TabContent> */}
            </TabHeader>
          )}

          <div>
            {sections?.map((section, index) => (
              <Section
                key={index}
                title={section.title}
                content={section.content}
                index={index - 1}
              />
            ))}
          </div>

          {!isLoadingAdd && (
            <MoleculeReportController
              reportIndex={2}
              conversationId={conversationId}
              sampleData={answerDataState}
              additionalReportCount={additionalReportCount}
            />
          )}
        </>
      )}
    </AnalysisSection>
  );
};

// ... (아래 부분은 동일)

const Section = ({ title, content, index }) => {
  // 서브 타이틀이 있는 항목과 없는 항목을 분리
  const subTitleItems = content.filter((item) => item.subTitle);
  const nonSubTitleItems = content.filter((item) => !item.subTitle);

  // subText에서 ':'로 분리하여 subTitle과 text를 따로 처리
  const splitText = (text) => {
    const [subTitle, ...rest] = text.split(":");
    return {
      subTitle: subTitle.trim(), // ':' 앞부분
      text: rest.join(":").trim(), // ':' 뒷부분
    };
  };

  return (
    <>
      <BoxWrap title={title} isPurpose={title === "목적"}>
        {" "}
        {/* 타이틀이 "목적"인지 확인 */}
        {title && title !== "목적" && (
          <strong>
            {/* 번호 표시 */}
            {index + 1}. {title}
          </strong>
        )}
        {/* nonSubTitleItems는 일반적으로 title과 text만 표시 */}
        {nonSubTitleItems.length > 0 &&
          nonSubTitleItems?.map((item, index) => (
            <>
              <div key={index}>
                <p>{item.text}</p>
                {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
              </div>
            </>
          ))}
        {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
        <>
          {subTitleItems.map((item, index) => (
            <SeparateSection key={index}>
              <strong>
                {/* <strong_title>{`${item.subTitle}`}</strong_title> */}{" "}
                {/* 차후 추가할수도 있음*/}
              </strong>
              <p>
                {item.subTitle} : {item.text}
              </p>

              {/* subText1, subText2, subText3를 한 줄씩 표시 */}
              <div>
                {item.subText1 && (
                  <p>
                    {item.subTitle}: {splitText(item.subText1).text}
                  </p>
                )}
                {item.subText2 && (
                  <p>
                    {item.subTitle}: {splitText(item.subText2).text}
                  </p>
                )}
                {item.subText3 && (
                  <p>
                    {item.subTitle}: {splitText(item.subText3).text}
                  </p>
                )}
              </div>
            </SeparateSection>
          ))}
        </>
      </BoxWrap>
    </>
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
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 15px;

    span {
      color: ${palette.red};
    }
  }
`;

const BoxWrap = styled.div`
  // padding: 20px;
  // border-radius: 10px;
  padding: ${(props) => (props.isPurpose ? "0" : "20px")};
  background: ${(props) =>
    props.isPurpose ? palette.white : "rgba(0, 0, 0, 0.04)"}; /* 흰 배경 적용 */

  font-size: 0.875rem;
  color: ${palette.gray800};
  line-height: 1.5;
  // margin:8px auto 20px;

  &:nth-child(2) {
    border-radius: 10px 10px 0 0;
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
  &:nth-child(n + 3) {
    margin-top: 0;
  }

  + div {
    margin-top: 12px;
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  // p {
  //   font-size: 0.875rem;
  //   margin-bottom: 10px;
  // }
`;

const TabHeader = styled.div`
  gap: 40px;
  margin-bottom: 20px;
`;

const TabTitle = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 1.25rem;
  font-weight: 400;
  color: ${palette.gray800};
`;

const TabContent = styled.div`
  font-family: "Pretendard";
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.black};
  border: none;
  border-bottom: none;
  background: ${palette.white};
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
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 10px;
  margin-top: 10px;

  ul {
    list-style: none; /* 기본 리스트 스타일 제거 */
    padding: 0;
    margin: 0;

    li {
      position: relative;
      font-size: 0.875rem;
      color: ${palette.gray800};
      line-height: 1.5;
      padding-left: 13px;
      margin-left: 8px;

      &:before {
        position: absolute;
        top: 8px;
        left: 0;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: ${palette.gray800};
        content: "";
      }
    }
  }

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
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
  }
`;

const SeparateSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0);

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
    margin-bottom: 4px;
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
    position: relative;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
    padding-left: 13px;
    margin-left: 8px;

    &:before {
      position: absolute;
      top: 8px;
      left: 0;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: ${palette.gray800};
      content: "";
    }
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
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: ${palette.gray800};
        content: "";
      }
    }
  }
`;
