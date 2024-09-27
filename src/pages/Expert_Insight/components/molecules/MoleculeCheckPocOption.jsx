import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  iS_CLICK_CHECK_POC_RIGHTAWAY,
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
  ADDITION_BUTTON_STATE,
  isLoggedInAtom,
  STRATEGY_REPORT_DATA,
  INPUT_BUSINESS_INFO,
  CONVERSATION_STAGE,
  SELECTED_ADDITIONAL_KEYWORD,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITION_BUTTON_STATE,
  CUSTOMER_ADDITION_QUESTION_INPUT,
  SELECTED_EXPERT_LIST,
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";
import { palette } from "../../../../assets/styles/Palette";

const MoleculeCheckPocOption = ({ conversationId }) => {
  const [selectedOption, setSelectedOption] = useState("");

  // Import necessary atoms
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation,] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [buttonState, setButtonState] = useAtom(CUSTOMER_ADDITION_BUTTON_STATE);
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [strategyReportData] = useAtom(STRATEGY_REPORT_DATA);
  const [conversationStage] = useAtom(CONVERSATION_STAGE);
  const [selectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [selectedCustomerAdditionalKeyword] = useAtom(
    SELECTED_CUSTOMER_ADDITIONAL_KEYWORD
  );
  const [additionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);
  const [customerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isClickCheckPocRightAway, setIsClickCheckPocRightAway] = useAtom(iS_CLICK_CHECK_POC_RIGHTAWAY);


  const options = [
    { label: "아이디어 검증 단계", value: "아이디어 검증 단계" },
    { label: "기술 검증 단계", value: "기술 검증 단계" },
    { label: "프로토타입 개발 단계", value: "프로토타입 개발 단계" },
    { label: "기능 테스트 단계", value: "기능 테스트 단계" },
    { label: "사용자 적합성 검증 단계", value: "사용자 적합성 검증 단계" },
    { label: "완전 제품 준비 단계", value: "완전 제품 준비 단계" },
  ];

  const handleOptionClick = async (optionValue) => {
    setSelectedOption(optionValue);

    // Update the conversation
    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "system",
        message:
          "PoC 설계를 위한 귀중한 정보 감사합니다. 마지막으로 타겟 유저에 대한 정보를 알려주세요.\n더욱 상세한 PoC 설계가 가능합니다. ",
        expertIndex: selectedExpertIndex,
      },
      {
        type: `pocPersona`,
      }
    );
    setConversation(updatedConversation);

    setApproachPath(3);
    setIsClickCheckPocRightAway(true);

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
      },
      isLoggedIn,
      conversationId
    );
  };

  return (
    <Wrap>
      <Question>Q. 현재 PoC를 진행 단계는 무엇인가요?</Question>
      <OptionContainer>
        {options.map((option) => (
          <Option
            key={option.value}
            selected={selectedOption === option.value}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </Option>
        ))}
      </OptionContainer>
    </Wrap>
  );
};

export default MoleculeCheckPocOption;

// Styled-components
const Wrap = styled.div`
  padding: 20px;
`;

const Question = styled.div`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Option = styled.div`
  flex: 1 1 calc(33.33% - 10px);
  padding: 10px;
  border: 1px solid ${palette.lineGray};
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? palette.black : palette.white)};
  color: ${(props) => (props.selected ? palette.white : palette.black)};
  border-color: ${(props) => (props.selected ? palette.black : palette.lineGray)};

  &:hover {
    border-color: ${palette.black};
  }
`;
