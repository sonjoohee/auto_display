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
  SELECTED_POC_OPTIONS,
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";
import { palette } from "../../../../assets/styles/Palette";

const MoleculeCheckPocOption = ({ conversationId }) => {
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
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [selectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [selectedCustomerAdditionalKeyword] = useAtom(
    SELECTED_CUSTOMER_ADDITIONAL_KEYWORD
  );
  const [additionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);
  const [customerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  const [selectedPocOptions, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [tabs, setTabs] = useState(0);
  const [options2, setOptions2] = useState([]);

  const options1 = [
    { label: "아이디어 검증 단계", value: "아이디어 검증" },
    { label: "기술 검증 단계", value: "기술 검증" },
    { label: "프로토타입 개발 단계", value: "프로토타입 개발" },
    { label: "기능 테스트 단계", value: "기능 테스트" },
    { label: "사용자 적합성 검증 단계", value: "사용자 적합성 검증" },
    { label: "완전 제품 준비 단계", value: "완전 제품 준비" },
  ];
  const options2_1 = [
    { label: "타겟 고객 그룹과 시장 세분화", value: "타겟 고객 그룹과 시장 세분화" },
    { label: "해결하고자 하는 문제 여부 확인", value: "해결하고자 하는 문제 여부 확인" },
    { label: "시장 기회 및 크기 분석", value: "시장 기회 및 크기 분석" },
  ];
  const options2_2 = [
    { label: "기술 구현 가능성 확인", value: "기술 구현 가능성 확인" },
    { label: "예상되는 기술적 위험 요소 식별", value: "예상되는 기술적 위험 요소 식별" },
    { label: "비즈니스 목표와의 연계성 검토", value: "비즈니스 목표와의 연계성 검토" },
  ];
  const options2_3 = [
    { label: "사용자 여정 중심 접근", value: "사용자 여정 중심 접근" },
    { label: "기능 간 통합성", value: "기능 간 통합성" },
    { label: "초기 사용자 피드백 수집", value: "초기 사용자 피드백 수집" },
  ];
  const options2_4 = [
    { label: "사용자 요구와의 일치 여부 확인", value: "사용자 요구와의 일치 여부 확인" },
    { label: "성능 및 안정성 평가", value: "성능 및 안정성 평가" },
    { label: "사용지 피드백 수렴", value: "사용지 피드백 수렴" },
  ];
  const options2_5 = [
    { label: "시장의 긍정적 반응 여부 확인", value: "시장의 긍정적 반응 여부 확인" },
    { label: "사용자 피드백 수집 및 분석", value: "사용자 피드백 수집 및 분석" },
    { label: "가격 모델 및 판매 전략 검토", value: "가격 모델 및 판매 전략 검토" },
  ];
  const options2_6 = [
    { label: "기술 안정성 확보", value: "기술 안정성 확보" },
    { label: "보안 및 시스템 확장 가능성 검토", value: "보안 및 시스템 확장 가능성 검토" },
    { label: "최종 사용자 경험 최적화 확인", value: "최종 사용자 경험 최적화 확인" },
    { label: "배포 및 운영 준비 완료", value: "배포 및 운영 준비 완료" },
  ];

  const handleOptionClick = (index, optionValue) => {
    if (index === 1) {
      setSelectedOption1(optionValue);
    }
    else if (index === 2) {
      setSelectedOption2(optionValue);
    }
    else;
  };

  const handleConfirm = async () => {
    if(!selectedOption1 || !selectedOption2) {
      alert("항목을 선택해주세요.")
      return;
    }
    setSelectedPocOptions([selectedOption1, selectedOption2]);
    setTabs(2);
    setApproachPath(3);
    setConversationStage(3);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message:
          `PoC 검증은 “${selectedOption1}”을 위해 진행하고자 합니다.\n현재 저희 서비스는 아이디어 단계로 초기 스타트업 입니다.`,
      },
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
        selectedPocOptions: [selectedOption1, selectedOption2],
      },
      isLoggedIn,
      conversationId
    );
  };

  const hadleTurnTab = (dir) => {
    if (dir === "prev") {
      setTabs((prevTabs) => prevTabs - 1)
    }
    else if (dir === "next") {
      if(!selectedOption1) {
        alert("항목을 선택해주세요.")
        return;
      }
      
      switch (selectedOption1) {
        case "아이디어 검증":
          setOptions2(options2_1);
          break;
        case "기술 검증":
          setOptions2(options2_2);
          break;
        case "프로토타입 개발":
          setOptions2(options2_3);
          break;
        case "기능 테스트":
          setOptions2(options2_4);
          break;
        case "사용자 적합성 검증":
          setOptions2(options2_5);
          break;
        case "완전 제품 준비":
          setOptions2(options2_6);
          break;
        default:
          setOptions2([]);
          break;
      }

      setTabs((prevTabs) => prevTabs + 1)
    }
    else;
  }

  return (
    <Wrap>
      {tabs === 0 && !selectedPocOptions.length ? (
        <>
        <Question>Q. 현재 PoC를 진행 단계는 무엇인가요?</Question>
        <OptionContainer>
          {options1.map((option1) => (
            <Option
              key={option1.value}
              selected={selectedOption1 === option1.value}
              onClick={() => handleOptionClick(1, option1.value)}
            >
              {option1.label}
            </Option>
          ))}
        </OptionContainer>
        </>
      ) : tabs === 1 && !selectedPocOptions.length ? (
        <>
        <Question>Q. PoC를 통해서 얻고 싶은 내용은 무엇인가요?</Question>
        <OptionContainer>
          {options2.map((option2) => (
            <Option
              key={option2.value}
              selected={selectedOption2 === option2.value}
              onClick={() => handleOptionClick(2, option2.value)}
            >
              {option2.label}
            </Option>
          ))}
        </OptionContainer>
        </>
      ) : (
        <Question>완료</Question>
      )}

      {tabs !== 2 && !selectedPocOptions.length ? 
        <OptionContainer>
          {tabs === 0 ?
            <Option></Option>
            :
            <Option onClick={() => hadleTurnTab("prev")}>
              이전
            </Option>
          }
          {tabs === 0 ?
            <Option onClick={() => hadleTurnTab("next")}>
              다음
            </Option>
            :
            <Option onClick={() => handleConfirm()}>
              완료
            </Option>
          }        
        </OptionContainer>
        : null
      } 
    </Wrap>
  );
};

export default MoleculeCheckPocOption;

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
