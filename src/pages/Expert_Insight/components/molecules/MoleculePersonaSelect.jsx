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
      {Object.keys(selectedPocTarget).length === 0 ? (
        <>
          <Question>
            Q. 생각하고 계시는 비즈니스의 타겟 고객은 누구입니까?
          </Question>
          <OptionsContainer>
            {options.map((option) => (
              <Option
                key={option.title}
                onClick={() =>
                  setSelectedPocTargetState({
                    title: option.title,
                    text: option.text,
                  })
                }
              >
                <input type="radio" id={option} name="target" />
                <Label htmlFor={option}>{option.title}</Label>
                <p>{option.text}</p>
              </Option>
            ))}
          </OptionsContainer>
          <Button onClick={handleConfirm}>확인</Button>
        </>
      ) : (
        <>
          <Question>완료</Question>
        </>
      )}
    </Wrapper>
  );
};

export default MoleculePersonaSelect;

const Wrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  width: 60%;
  margin: auto;
`;

const Question = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Option = styled.div`
  flex: 1 1 calc(50% - 20px);
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  cursor: pointer;

  input {
    margin-right: 10px;
  }
`;

const Label = styled.label`
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
`;
