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
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";

const MoleculePersonaSelect = ({ conversationId }) => {
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
  const [buttonState, setButtonState] = useAtom(EXPERT_BUTTON_STATE);
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
  const [selectedPocTargetState, setSelectedPocTargetState] = useState({}); // 현재 선택한 상태를 저장
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET); // 확인 버튼을 눌렀을 때만 저장 -> 히스토리 저장
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingTarget, setIsLoadingTarget] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const [options, setOptions] = useState([
    {
      title: "퇴직자, 취미 활동가",
      text: "웰에이징 플랫폼을 통해 자신의 경험을 다른 사람과 공유하고, 새로운 취미와 활동을 탐색하며 건강하고 보람찬 노년을 보낸는 것",
    },
    {
      title: "중소기업 CEO, 고위 관리직",
      text: "플랫폼을 통해 웰에이징 관련 정보와 활동을 적극적으로 탐색하며, 동료들과 경험을 나누고 스스로의 건강과 행복을 유지하고자 함",
    },
    {
      title: "중소기업 CEO, 고위 관리직",
      text: "플랫폼을 통해 웰에이징 관련 정보와 활동을 적극적으로 탐색하며, 동료들과 경험을 나누고 스스로의 건강과 행복을 유지하고자 함",
    },
    {
      title: "중소기업 CEO, 고위 관리직",
      text: "플랫폼을 통해 웰에이징 관련 정보와 활동을 적극적으로 탐색하며, 동료들과 경험을 나누고 스스로의 건강과 행복을 유지하고자 함",
    },
    {
      title: "중소기업 CEO, 고위 관리직",
      text: "플랫폼을 통해 웰에이징 관련 정보와 활동을 적극적으로 탐색하며, 동료들과 경험을 나누고 스스로의 건강과 행복을 유지하고자 함",
    },
    { title: "아직 타겟 고객이 확실하지 않아요", text: "" },
  ]);

  const handleOptionClick = (option) => {
    setSelectedOption(option.title); // 선택된 옵션을 상태로 저장
    setSelectedPocTargetState({ title: option.title, text: option.text });
  };


  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  // useEffect(() => {
  //   const fetchPersonaSelect = async () => {

  //     if(buttonState) {
  //       setIsLoading(true);
  //       setIsLoadingTarget(true);
  //       setButtonState(0);

  //       const data = {
  //         expert_id: selectedExpertIndex,
  //         business_info: titleOfBusinessInfo,
  //         business_analysis_data: {
  //           명칭: analysisReportData.title,
  //           주요_목적_및_특징: analysisReportData.mainFeatures,
  //           주요기능: analysisReportData.mainCharacter,
  //           목표고객: analysisReportData.mainCustomer,
  //         },
  //         goal : selectedPocOptions[0],
  //         standpoint : selectedPocOptions[1],
  //         target : selectedPocTarget.title,
  //         tabs: [],
  //         page_index: 1,
  //       };

  //       const response = await axios.post(
  //         "https://wishresearch.kr/",
  //         data,
  //         axiosConfig
  //       );

  //       setOptions(response.data);

  //       setIsLoading(false);
  //       setIsLoadingTarget(false);
  //     }

  //   };

  //   fetchPersonaSelect();
  // }, [buttonState]);

  const handleConfirm = async () => {
    if (Object.keys(selectedPocTarget).length) return;

    if (Object.keys(selectedPocTargetState).length === 0) {
      alert("항목을 선택해주세요");
      return;
    }
    setConversationStage(3);
    setApproachPath(3);
    setSelectedPocTarget(selectedPocTargetState);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message: `비즈니스 타겟은 *${selectedPocTargetState.title}* 입니다.`,
        expertIndex: selectedExpertIndex,
      },
      {
        type: "system",
        message: "소중한 정보 감사합니다. Poc를 설계해보겠습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: `poc_${selectedExpertIndex}`,
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
        selectedPocOptions: selectedPocOptions,
        selectedPocTarget: selectedPocTargetState,
      },
      isLoggedIn,
      conversationId
    );
    setButtonState(1);
  };

  return (
    <Wrapper>
      {Object.keys(selectedPocTarget).length === 0 ?
      <>
        <Question>Q. 생각하고 계시는 비즈니스의 타겟 고객은 누구입니까?</Question>
        <OptionsContainer>
          {options.map((option) => (
            <Option 
              key={option.title} 
              selected={selectedOption === option.title}
              // onClick={() => setSelectedPocTargetState({"title": option.title, "text": option.text})}
              onClick={() => handleOptionClick(option)}
            >
              {/* <input type="radio" id={option} name="target" /> */}
              <Label 
                htmlFor={option}
                selected={selectedOption === option.title}
              >
                {option.title}
              </Label>
              <p>{option.text}</p>
            </Option>
          ))}
        </OptionsContainer>
        <ButtonWrap>
          <Button selectedOption={selectedOption} onClick={handleConfirm}>확인</Button>
        </ButtonWrap>
      </>
      :
      <>
      <OptionsContainer>완료</OptionsContainer>
      </>
      }

    </Wrapper>
  );
};

export default MoleculePersonaSelect;

const Wrapper = styled.div`
  max-width:968px;
  width:100%;
  padding: 40px;
  margin:24px 0 0 44px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};
`;

const Question = styled.h2`
  font-size: 0.88rem;
  font-weight:700;
  text-align:left;
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Option = styled.div`
  position:relative;
  display:flex;
  gap:12px;
  align-items:center;
  flex-direction:column;
  flex:1 1 30%;
  font-size:0.88rem;
  text-align:left;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "rgba(4,83,244,0.05)" : palette.white)};
  border: 1px solid ${(props) => (props.selected ? palette.blue : palette.lineGray)};
  transition:all .5s;

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height:1.3;
  }

  // input {
  //   margin-right: 10px;
  // }
`;

const Label = styled.label`
  position:relative;
  display:flex;
  gap:8px;
  align-items:flex-start;
  width:100%;
  color: ${(props) => (props.selected ? palette.blue : palette.gray800)};
  cursor:pointer;

  &:before {
    width:20px;
    height:20px;
    flex-shrink:0;
    border-radius:50%;
    border:1px solid ${(props) => (props.selected ? palette.blue : palette.lineGray)};
    background-color: ${(props) => (props.selected ? palette.blue : palette.white)};
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

const ButtonWrap = styled.div`
  margin-top:32px;
  display:flex;
  justify-content:end;
  align-items:center;
`;

const Button = styled.button`
  min-width:100px;
  font-size:0.88rem;
  color:${palette.white};
  line-height:22px;
  padding:8px 20px;
  margin-left:auto;
  border-radius:8px;
  border:0;
  background: ${(props) => (!props.selectedOption ? palette.lineGray : palette.blue)};
  transition:all .5s;
`;
