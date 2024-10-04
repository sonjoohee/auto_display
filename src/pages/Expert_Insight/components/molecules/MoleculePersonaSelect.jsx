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
  POC_PERSONA_LIST,
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";

import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";

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
  const [expertButtonState, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE);
  const [targetSelectButtonState, setTargetSelectButtonState] = useAtom(TARGET_SELECT_BUTTON_STATE);
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
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchPersonaSelect = async () => {

      if(targetSelectButtonState) {
        setIsLoading(true);
        setIsLoadingTarget(true);
        setTargetSelectButtonState(0);

        const data = {
          product_info: titleOfBusinessInfo,
          goal : selectedPocOptions[0],
          standpoint : selectedPocOptions[1],
        };

        let response = await axios.post(
          "https://wishresearch.kr/panels/persona_list",
          data,
          axiosConfig
        );
        let updatedPersonaList = response.data.persona_list;

        while (
          !Array.isArray(updatedPersonaList) ||
          updatedPersonaList.length === 0 ||
          !updatedPersonaList[0].hasOwnProperty("persona_1")
        ) {
          response = await axios.post(
            "https://wishresearch.kr/panels/persona_list",
            data,
            axiosConfig
          );
          updatedPersonaList = response.data.additional_question;
        }

        setPocPersonaList(updatedPersonaList);

        await saveConversationToIndexedDB(
          {
            id: conversationId,
            inputBusinessInfo: inputBusinessInfo,
            analysisReportData: analysisReportData,
            strategyReportData: strategyReportData,
            conversation: conversation,
            conversationStage: 3,
            selectedAdditionalKeywords: selectedAdditionalKeyword,
            selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
            additionalReportData: additionalReportData,
            customerAdditionalReportData: customerAdditionalReportData,
            timestamp: Date.now(),
            expert_index: selectedExpertIndex,
            selectedPocOptions: selectedPocOptions,
            pocPersonaList: updatedPersonaList,
          },
          isLoggedIn,
          conversationId
        );

        setIsLoading(false);
        setIsLoadingTarget(false);
      }
    };

    fetchPersonaSelect();
  }, [targetSelectButtonState]);

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
        message: `비즈니스 타겟은 *${selectedPocTargetState.job}* 입니다.`,
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
        pocPersonaList: pocPersonaList,
        selectedPocTarget: selectedPocTargetState,
      },
      isLoggedIn,
      conversationId
    );
    setExpertButtonState(1);
  };

  return (
    <Wrapper>
      {isLoadingTarget ?
      <>
        <SkeletonTitle className="title-placeholder" />
        <SkeletonLine className="content-placeholder" />
        <SkeletonLine className="content-placeholder" />
        <SkeletonLine className="content-placeholder" />
        <SkeletonLine className="content-placeholder" />
      </>
      :
      <>
      {Object.keys(selectedPocTarget).length === 0 ? (
        <>
          <Question>
            Q. 생각하고 계시는 비즈니스의 타겟 고객은 누구입니까?
          </Question>
          <OptionsContainer>
            {pocPersonaList.map((persona, index) => (
              <Option
                key={index}
                onClick={() =>
                  setSelectedPocTargetState({
                    job: persona[`persona_${index + 1}`][1]["job"],
                    target: persona[`persona_${index + 1}`][4]["target"],
                  })
                }
              >
                <input type="radio" id={persona} name="target" />
                <Label htmlFor={persona}>{persona[`persona_${index + 1}`][1]["job"]}</Label>
                <p>{persona[`persona_${index + 1}`][4]["target"]}</p>
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
    </>
    }
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
