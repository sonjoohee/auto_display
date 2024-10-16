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

import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";

const OrganismIdeaCustomer = ({ conversationId }) => {
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

  return (
    <Wrap>
      <h1>알뜰 배달 서비스의 고객 요구 사항</h1>
      <p>총 10개의 고객 요구 사항을 도출하였습니다</p>

      <IdeaList>
        <div>
          <span>1</span>
          팀 매칭 시 불필요한 대기 시간 개선
        </div>
        <div>
          <span>2</span>
          배달 지연 시 사전 통지 
        </div>
        <div>
          <span>3</span>
          안전하고 비대면으로 이루어지는 무인 배달
        </div>
        <div>
          <span>4</span>
          개인 맞춤형 할인 혜택 제공
        </div>
        <div>
          <span>5</span>
          고급 사용자용 프리미엄 서비스
        </div>
        <div>
          <span>6</span>
          소비자 피드백을 반영한 빠른 개선
        </div>
        <div>
          <span>7</span>
          주문 전후 투명한 정보 제공
        </div>
        <div>
          <span>8</span>
          배달 과정에서의 지속적인 소통
        </div>
        <div>
          <span>9</span>
          환경 보호를 고려한 배달 서비스
        </div>
        <div>
          <span>10</span>
          사용 편의성 증대
        </div>
      </IdeaList>

      <MoleculeReportController
        reportIndex={5}
        conversationId={conversationId}
      />
    </Wrap>
  );
};

export default OrganismIdeaCustomer;

const Wrap = styled.div`
  max-width:657px;
  width:100%;
  display:flex;
  flex-direction:column;
  padding: 20px;
  margin:24px 0 0 44px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

  h1 {
    font-size:1rem;
    font-weight:700;
    text-align:left;
    padding-bottom:8px;
    margin-bottom:16px;
    border-bottom:1px solid ${palette.lineGray};
  }

  p {
    font-size:0.88rem;
    color:${palette.gray500};
    text-align:left;
  }
`;

const IdeaList = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:4px;
  margin-top:16px;

  > div {
    display:flex;
    align-items:center;
    gap:12px;
    width:49.5%;
    min-height:35px;
    font-size:0.88rem;
    color:${palette.gray700};
    padding:4px 6px;
    border-radius:12px;
    background:${palette.chatGray};  
  }

  span {
    width:27px;
    height:27px;
    line-height:26px;
    text-align:center;
    border-radius:100%;
    border:1px solid ${palette.lineGray};
    background:${palette.white};
  }

  > button {
    display:flex;
    align-items:center;
    width:49.5%;
    font-family: Pretendard, Poppins;
    font-size:0.88rem;
    color:${palette.gray500};
    padding:4px 16px;
    border-radius:12px;
    border:1px solid ${palette.lineGray};
    background:${palette.gray50};
  }
`;
