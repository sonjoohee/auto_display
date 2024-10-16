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

const OrganismIdeaPriority = ({ conversationId }) => {
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
      <h1>페르소나별 아이디어 우선순위 선별</h1>

      <SeparateSection>
        <h3>
          <span className="number">1</span>
          페르소나 : 글로벌 K-pop 팬 (다국적 팬)
        </h3>
        <p>다양한 언어를 구사하며, 여러 나라의 팬들과 소통하는 것을 좋아함. 콘서트 정보를 쉽게 접하고, 자국어로 예매와 결제가 가능한 시스템을 선호. 언어 장벽 없이 콘서트 예매 과정을 원활하게 진행하는 것을 중요하게 생각함.</p>
        <div>
          <ol className="list-decimal">
            <li>아이디어명 : 글로벌 팬은 여러 언어를 지원하는 플랫폼을 필요로 하며, 이를 통해 쉽게 정보에 접근하고 예매를 진행할 수 있음</li>
            <li>아이디어명 : 글로벌 팬들이 자주 겪는 문제는 결제 과정에서의 불편함이므로, 다국어 지원 결제 시스템은 매우 중요한 기능임.</li>
            <li>아이디어명 : 좌석 배치도와 같은 중요한 정보가 다국어로 제공되면, 팬들은 공연장 내 좌석을 명확히 이해하고 선택할 수 있음.</li>
          </ol>
        </div>
      </SeparateSection>

      <SeparateSection>
        <h3>
          <span className="number">2</span>
          페르소나 : 글로벌 K-pop 팬 (다국적 팬)
        </h3>
        <p>다양한 언어를 구사하며, 여러 나라의 팬들과 소통하는 것을 좋아함. 콘서트 정보를 쉽게 접하고, 자국어로 예매와 결제가 가능한 시스템을 선호. 언어 장벽 없이 콘서트 예매 과정을 원활하게 진행하는 것을 중요하게 생각함.</p>
        <div>
          <ol className="list-decimal">
            <li>아이디어명 : 글로벌 팬은 여러 언어를 지원하는 플랫폼을 필요로 하며, 이를 통해 쉽게 정보에 접근하고 예매를 진행할 수 있음</li>
            <li>아이디어명 : 글로벌 팬들이 자주 겪는 문제는 결제 과정에서의 불편함이므로, 다국어 지원 결제 시스템은 매우 중요한 기능임.</li>
            <li>아이디어명 : 좌석 배치도와 같은 중요한 정보가 다국어로 제공되면, 팬들은 공연장 내 좌석을 명확히 이해하고 선택할 수 있음.</li>
          </ol>
        </div>
      </SeparateSection>
      
      <MoleculeReportController
        reportIndex={5}
        conversationId={conversationId}
      />

    </Wrap>
  );
};

export default OrganismIdeaPriority;

const Wrap = styled.div`
  max-width:986px;
  width:100%;
  display:flex;
  flex-direction:column;
  padding: 28px;
  margin:24px 0 0 44px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    text-align:left;
    margin-bottom:20px;
  }
`;

const SeparateSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap:12px;
  margin-top: 12px;
  padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);

  h3 {
    display:flex;
    align-items:center;
    gap:12px;
    font-size:1rem;
    font-weight:700;

    span {
      width: 15px;
      height: 15px;
      font-size: 0.63rem;
      color: ${palette.chatBlue};
      line-height: 15px;
      text-align: center;
      border: 1px solid ${palette.chatBlue};
    }
  }

  p {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray700};
    text-align:left;
  }

  div {
    padding:16px;
    border-radius:10px;
    background:${palette.white};
  }

  .list-decimal li {
    list-style-type:decimal;
    list-style-position:inside;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    text-align:left;
  }
`;
