import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
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
  KPI_QUESTION_LIST,
  SELCTED_POC_TARGET,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_LIST,
  IDEA_GROUP,
  IDEA_PRIORITY,
  SURVEY_OPTION_BUTTON_STATE,
  SURVEY_QUESTION_LIST,
  BUTTON_STATE,
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";
import { palette } from "../../../../assets/styles/Palette";

const MoleculeCheckSurveyOption = () => {
  const [conversationId] = useAtom(CONVERSATION_ID);
  const [buttonState] = useAtom(BUTTON_STATE);
  const [ideaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [ideaList] = useAtom(IDEA_LIST);
  const [ideaGroup] = useAtom(IDEA_GROUP);
  const [ideaPriority] = useAtom(IDEA_PRIORITY);
  const [selectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [targetSelectButtonState, setTargetSelectButtonState] = useAtom(TARGET_SELECT_BUTTON_STATE);
  const [strategyReportData] = useAtom(STRATEGY_REPORT_DATA);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [selectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [selectedCustomerAdditionalKeyword] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [additionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);
  const [customerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);

  const [SurveyQuestionList, setSurveyQuestionList] = useAtom(SURVEY_QUESTION_LIST);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");

  const [surveyOptionButtonState, setSurveyOptionButtonState] = useAtom(SURVEY_OPTION_BUTTON_STATE);

  const [tabs, setTabs] = useState(0);

  useEffect(() => {
    if (SurveyQuestionList.length === 0) {
      setTabs(0);
    } else {
      setTabs(3);

      setSelectedOption1(SurveyQuestionList[0]);
      setSelectedOption2(SurveyQuestionList[1]);
      setSelectedOption3(SurveyQuestionList[2]);
      setSelectedOption4(SurveyQuestionList[3]);
    }
  }, [SurveyQuestionList]);


  const options1 = [
    { label: "매우 짧음(1주 이내)", value: "매우 짧음(1주 이내)" },
    { label: "짧음(1~2주)", value: "짧음(1~2주)" },
    { label: "보통(2주~1개월)", value: "보통(2주~1개월)" },
    { label: "긺(1개월~2개월)", value: "긺(1개월~2개월)" },
    { label: "매우 긺", value: "매우 긺" },
  ];
  
  const options2 = [
    { label: "매우 부족함", value: "매우 부족함" },
    { label: "부족함", value: "부족함" },
    { label: "보통", value: "보통" },
    { label: "충분함", value: "충분함" },
    { label: "매우 충분함", value: "매우 충분함" }
  ];
  
  const options3 = [
    { label: "매우 적음(소규모)", value: "매우 적음(소규모)" },
    { label: "적음(중소규모)", value: "적음(중소규모)" },
    { label: "보통(중간규모)", value: "보통(중간규모)" },
    { label: "많음(중대규모)", value: "많음(중대규모)" },
    { label: "매우 많음(대규모)", value: "매우 많음(대규모)" },
  ];
  
  const options4 = [
    { label: "객관적인 수치나 통계 자료", value: "객관적인 수치나 통계 자료" },
    { label: "사람들의 의견 및 경험 설명 자료", value: "사람들의 의견 및 경험 설명 자료" },
    { label: "수치 자료와 설명 혼합 자료", value: "수치 자료와 설명 혼합 자료" },
    { label: "데이터 형태는 상관없음", value: "데이터 형태는 상관없음" }
  ];
  

  const handleOptionClick = (index, optionValue) => {
    if (SurveyQuestionList.length) return;
  
    switch (index) {
      case 1:
        setSelectedOption1(optionValue);
        break;
      case 2:
        setSelectedOption2(optionValue);
        break;
      case 3:
        setSelectedOption3(optionValue);
        break;
      case 4:
        setSelectedOption4(optionValue);
        break;
      default:
        break;
    }
  };
  

  const handleConfirm = async () => {
    if (SurveyQuestionList.length) return;

    setSurveyQuestionList([selectedOption1, selectedOption2, selectedOption3, selectedOption4]);
    setApproachPath(3);
    setConversationStage(3);
    setSurveyOptionButtonState(1);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message: `네 괜찮습니다. 이대로 진행해주세요`,
      },
      {
        type: "system",
        message: "좋습니다. 이 목적에 맞춰 설문조사 문항을 설계해드리겠습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: `surveyOptionReport`,
      }
    );
    setConversation(updatedConversation);

    await saveConversationToIndexedDB(
      {
        id: conversationId,
        inputBusinessInfo,
        analysisReportData: {
          title: titleOfBusinessInfo,
          mainFeatures: mainFeaturesOfBusinessInformation,
          mainCharacter: mainCharacteristicOfBusinessInformation,
          mainCustomer: businessInformationTargetCustomer,
        },
        strategyReportData,
        conversation: updatedConversation,
        conversationStage: 3,
        selectedAdditionalKeywords: selectedAdditionalKeyword,
        selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
        additionalReportData,
        customerAdditionalReportData,
        timestamp: Date.now(),
        expert_index: selectedExpertIndex,
        KpiQuestionList : KpiQuestionList,
        SurveyQuestionList: [selectedOption1, selectedOption2, selectedOption3, selectedOption4],
        selectedPocTarget: selectedPocTarget,
        ideaFeatureData: ideaFeatureData,
        ideaRequirementData: ideaRequirementData,
        ideaList: ideaList,
        ideaGroup: ideaGroup,
        ideaPriority: ideaPriority,
        buttonState: buttonState,
      },
      isLoggedIn,
      conversationId
    );
  };

  const hadleTurnTab = (dir) => {
    if (dir === "prev") {
      setTabs((prevTabs) => prevTabs - 1);
    } else if (dir === "next") {
      setTabs((prevTabs) => prevTabs + 1);
    }
  };

  return (
    <Wrap>
      {tabs === 0 && (
        <>
          <Question>Q1. 조사를 완료해야 하는 기간은 어느 정도인가요?</Question>
          <OptionContainer>
            {options1.map((option1) => (
              <Option
                key={option1.value}
                selected={selectedOption1 === option1.value}
                onClick={() => handleOptionClick(1, option1.value)}
                SurveyQuestionList={SurveyQuestionList}
              >
                {option1.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {tabs === 1 && (
        <>
          <Question>Q2. 조사를 위한 예산을 어느 정도로 고려하고 있나요?</Question>
          <OptionContainer>
            {options2.map((option2) => (
              <Option
                key={option2.value}
                selected={selectedOption2 === option2.value}
                onClick={() => handleOptionClick(2, option2.value)}
                SurveyQuestionList={SurveyQuestionList}
              >
                {option2.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {/* 각 탭별로 동일한 방식으로 설정 */}
      {tabs === 2 && (
        <>
          <Question>Q3. 조사에 참여할 계획인 대상자 수는 어느정도로 생각하십니까?</Question>
          <OptionContainer>
            {options3.map((option3) => (
              <Option
                key={option3.value}
                selected={selectedOption3 === option3.value}
                onClick={() => handleOptionClick(3, option3.value)}
                SurveyQuestionList={SurveyQuestionList}
              >
                {option3.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}
      {tabs === 3 && (
        <>
          <Question>Q4. 어떤 형태의 데이터가 필요하신가요?</Question>
          <OptionContainer>
            {options4.map((option4) => (
              <Option
                key={option4.value}
                selected={selectedOption4 === option4.value}
                onClick={() => handleOptionClick(4, option4.value)}
                SurveyQuestionList={SurveyQuestionList}
              >
                {option4.label}
              </Option>
            ))}
          </OptionContainer>
        </>
      )}


<ButtonWrap
        selectedOption1={selectedOption1}
        selectedOption2={selectedOption2}
        selectedOption3={selectedOption3}
        selectedOption4={selectedOption4}
        SurveyQuestionList={SurveyQuestionList}
      >
        {tabs === 0 ? null : (
          <div className="prev" onClick={() => hadleTurnTab("prev")}>
            이전
          </div>
        )}

        {tabs === 3 ? (
          <div
            className="finish"
            disabled={!selectedOption1 || !selectedOption2 || !selectedOption3 || !selectedOption4}
            onClick={() => {
              if (!selectedOption1 || !selectedOption2 || !selectedOption3 || !selectedOption4) return;
              handleConfirm();
            }}
          >
            완료
          </div>
        ) : (
          <div
            className="next"
            disabled={
              (tabs === 0 && !selectedOption1) ||
              (tabs === 1 && !selectedOption2) ||
              (tabs === 2 && !selectedOption3) 
            }
            onClick={() => {
              if (
                (tabs === 0 && !selectedOption1) ||
                (tabs === 1 && !selectedOption2) ||
                (tabs === 2 && !selectedOption3) 
              )
                return;
              hadleTurnTab("next");
            }}
          >
            다음
          </div>
        )}
      </ButtonWrap>

    </Wrap>
  );
};

export default MoleculeCheckSurveyOption;


const Wrap = styled.div`
  max-width:570px;
  width:100%;
  min-height:325px;
  display:flex;
  flex-direction:column;
  padding: 32px 40px;
  margin:24px 0 0 44px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};
`;

const Progress = styled.div`
  width:100%;
  height:3px;
  margin-bottom:30px;
  border-radius:10px;
  background:#ECEFF3;

  .bar {
    width:100%;
    height:3px;
    border-radius:10px;
    background:${(props) =>
      props.SurveyQuestionList?.length !== 0
        ? palette.gray800
        : palette.blue};
    transition:all .5s;
  }

  .bar.num2 {
    width:50%;
  }

  .bar.num3 {
    width:33%;
  }
`;

const Question = styled.div`
  font-size: 0.88rem;
  font-weight:700;
  text-align:left;
  margin-bottom: 20px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
  gap: 8px 0;
`;

const Option = styled.div`
  position:relative;
  display:flex;
  gap:8px;
  align-items:center;
  // flex: 1 1 40%;
  width:49%;
  font-size:0.88rem;
  color: ${(props) =>
    props.selected
      ? props.SurveyQuestionList?.length === 0
        ? palette.blue
        : palette.black
      : palette.gray800};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? props.SurveyQuestionList?.length === 0
        ? "rgba(4,83,244,0.05)"
        : "rgba(0,0,0,0.05)"
      : palette.white};
  border: 1px solid
    ${(props) =>
      props.selected
        ? props.SurveyQuestionList?.length === 0
          ? palette.blue
          : palette.black
        : palette.lineGray};
  transition:all .5s;

  &:before {
    width:20px;
    height:20px;
    border-radius:50%;
    border: 1px solid
      ${(props) =>
        props.selected
          ? props.SurveyQuestionList?.length === 0
            ? palette.blue
            : palette.gray800
          : palette.lineGray};
    background-color: ${(props) =>
      props.selected
      ? props.SurveyQuestionList?.length === 0
      ? palette.blue
          : palette.gray800
        : palette.white};
    transition:all .5s;
    content:'';
  }

  &:after {
    position:absolute;
    left:12px;
    top:8px;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }

  &:hover {
    border-color: ${(props) =>
      props.SurveyQuestionList?.length === 0 ? palette.blue : "none"};
  }
`;

const ButtonWrap = styled.div`
  // margin-top:40px;
  margin-top:auto;
  display:flex;
  justify-content:space-between;
  align-items:center;

  .prev {
    font-size:0.88rem;
    color:${palette.gray500};
    cursor:pointer;
  }

  .next, .finish {
    // min-width:100px;
    font-size:0.88rem;
    // color:${palette.white};
    // line-height:22px;
    // padding:8px 20px;
    margin-left:auto;
    border-radius:8px;
    background:none;
    transition:all .5s;
  }

  .next {
    color: ${(props) =>
      props.SurveyQuestionList.length !== 0
        ? palette.black
        : !props.selectedOption1
        ? palette.gray500
        : palette.chatBlue};
    background: ${(props) =>
      props.SurveyQuestionList.length !== 0
        ? palette.white
        : !props.selectedOption1
        ? palette.white
        : palette.white};
    cursor: ${(props) => (!props.selectedOption1 ? "default" : "pointer")};
  }

  .finish {
    color: ${(props) =>
      props.SurveyQuestionList.length !== 0
        ? palette.black
        : !props.selectedOption1 || !props.selectedOption2
        ? palette.gray500
        : palette.chatBlue};
    background: ${(props) =>
      props.SurveyQuestionList.length !== 0
        ? palette.white
        : !props.selectedOption1 || !props.selectedOption2
        ? palette.white
        : palette.white};
    cursor: ${(props) => (!props.selectedOption1 || !props.selectedOption2 ? "default" : "pointer")};
  }
`;
