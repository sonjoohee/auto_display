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

const OrganismIdeaList = ({ conversationId }) => {
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

  const [isPopupOpenCancel, setIsPopupOpenCancel] = useState(false);

  const togglePopupCancel = () => {
    setIsPopupOpenCancel(!isPopupOpenCancel);
  };

  return (
    <Wrap>
      <h1>알뜰 배달 서비스를 위한 아이디어 리스트</h1>
      <p>총 300개의 아이디어를 도출하였으며, 유사한 아이디어들을 묶어 7개의 그룹으로 나눌 수 있었습니다.</p>

      <IdeaList>
        <li>
          <span>1</span>
          <div>
            <strong>다국어 지원 및 글로벌 접근성 강화 (속한 아이디어 개수: 10건)</strong>
            <p>글로벌 팬들을 위한 다국어 지원과 접근성을 강화하는 기능들로 구성된 아이디어들입니다. 글로벌 팬들을 대상으로 서비스 제공 시, 언어 장벽을 제거하고 글로벌 결제, </p>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <strong>좌석 선택 및 관리 시스템 개선 (10건)</strong>
            <p>좌석 선택과 관리 시스템의 시각적 경험을 개선하여, 팬들이 좌석 선택 과정에서 더 많은 정보를 얻고 자신 있게 선택할 수 있도록 지원하는 아이디어들 입니다. (2줄 고정)</p>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <strong>맞춤형 알림 및 사용자 경험 강화 (8건)</strong>
            <p>팬들에게 맞춤형 알림과 사용자 경험을 최적화하여, 개인화된 서비스를 제공하는 것이 목표입니다. 아티스트 관련 소식이나 티켓 구매 정보 등을 맞춤형으로 제공해 팬들의 </p>
          </div>
        </li>
        <li>
          <span>4</span>
          <div>
            <strong>맞춤형 알림 및 사용자 경험 강화 (8건)</strong>
            <p>팬들에게 맞춤형 알림과 사용자 경험을 최적화하여, 개인화된 서비스를 제공하는 것이 목표입니다. 아티스트 관련 소식이나 티켓 구매 정보 등을 맞춤형으로 제공해 팬들의 </p>
          </div>
        </li>
        <li>
          <span>5</span>
          <div>
            <strong>맞춤형 알림 및 사용자 경험 강화 (8건)</strong>
            <p>팬들에게 맞춤형 알림과 사용자 경험을 최적화하여, 개인화된 서비스를 제공하는 것이 목표입니다. 아티스트 관련 소식이나 티켓 구매 정보 등을 맞춤형으로 제공해 팬들의</p>
          </div>
        </li>
        <li>
          <span>6</span>
          <div>
            <strong>맞춤형 알림 및 사용자 경험 강화 (8건)</strong>
            <p>팬들에게 맞춤형 알림과 사용자 경험을 최적화하여, 개인화된 서비스를 제공하는 것이 목표입니다. 아티스트 관련 소식이나 티켓 구매 정보 등을 맞춤형으로 제공해 팬들의</p>
          </div>
        </li>
        <li>
          <span>7</span>
          <div>
            <strong>맞춤형 알림 및 사용자 경험 강화 (8건)</strong>
            <p>팬들에게 맞춤형 알림과 사용자 경험을 최적화하여, 개인화된 서비스를 제공하는 것이 목표입니다. 아티스트 관련 소식이나 티켓 구매 정보 등을 맞춤형으로 제공해 팬들의 </p>
          </div>
        </li>
      </IdeaList>

      <DownloadButton>
        <p>
          <img src={images.IconEdit3} alt="" />
          자료 (2건)
        </p>
        <div>
          <button>
            <img src={images.IconDownload2} alt="" />
            <div>
              <strong>아이디어 다운로드</strong>
              <span>1.8 MB · Download</span>
            </div>
          </button>
          <button
            onClick={togglePopupCancel}
          >
            <img src={images.IconDownloadMiro} alt="" />
            <div>
              <strong>Miro에서 협업하기</strong>
              <span>외부페이지 이동 · www.miro.com</span>
            </div>
          </button>
        </div>
      </DownloadButton>

      {isPopupOpenCancel && (
        <DownloadPopup
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              togglePopupCancel();
            }
          }}
        >
          <div>
            <h3>PoC 수행 계획서 다운로드</h3>
            <SelectBoxWrap>
              <label>포맷 선택 (택1)</label>
              <SelectBox>
                <div
                  className="PDF"
                >
                  <img src={images.ImgPDF} alt="" />
                  PDF
                </div>
                <div
                  className="Word"
                >
                  <img src={images.ImgWord} alt="" />
                  Word
                </div>
              </SelectBox>
            </SelectBoxWrap>
            <SelectBoxWrap>
              <label>언어 선택 (택1)</label>
              <SelectBox>
                <div
                  className="한글 selected"
                >
                  <img src={images.ImgKOR} alt="" />
                  한글
                </div>
                <div
                  className="영문 selected"
                >
                  <img src={images.ImgENG} alt="" />
                  영문(준비 중)
                </div>
              </SelectBox>
            </SelectBoxWrap>
            <div>
              <button>
                다운로드
              </button>
            </div>
          </div>
        </DownloadPopup>
      )}

    </Wrap>
  );
};

export default OrganismIdeaList;

const Wrap = styled.div`
  max-width:756px;
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

const IdeaList = styled.ul`
  display:flex;
  flex-direction:column;
  gap:4px;
  margin-top:16px;

  li {
    display:flex;
    gap:8px;
    padding:8px;
    border-radius:12px;
    background:${palette.chatGray};

    > div {
      min-width:0;
      text-align:left;
    }
  }

  span {
    width:27px;
    height:27px;
    font-size:0.88rem;
    color:${palette.gray700};
    line-height:26px;
    text-align:center;
    flex-shrink:0;
    border-radius:100%;
    border:1px solid ${palette.lineGray};
    background:${palette.white};
  }

  div {
    display:flex;
    flex-direction:column;
    gap:4px;

    strong {
      font-size:0.88rem;
      font-weight:normal;
      line-height:27px;
      color:${palette.gray800};
    }

    p {
      font-size:0.63rem;
      color:${palette.gray700};
      line-height:15px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
`;

const DownloadButton = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
  margin-top:20px;

  p {
    display:flex;
    align-items:center;
    gap:8px;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray500};
    line-height:22px;
  }

  div {
    display:flex;
    gap:12px;
  }

  button {
    display:flex;
    align-items:center;
    gap:8px;
    padding:6px 8px;
    border-radius:6px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};

    div {
      display:flex;
      flex-direction:column;
      gap:4px;
      min-width:160px;
      text-align:left;
    }

    strong {
      font-size:0.63rem;
      font-weight:400;
      color:${palette.gray800};
    }

    span {
      font-size:0.5rem;
      color:${palette.gray500};
    }
  }
`;

const DownloadPopup = styled.div`
  position: absolute;
  right: ${(props) => (props.isAutoSaveToggle ? "0" : "-70px")};
  top: 120px;
  max-width: 288px;
  width: 100%;
  max-height: 400px; /* 팝업의 최대 높이를 적절히 설정 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능하게 설정 */
  padding: ${(props) => (props.isAutoSaveToggle ? "0" : "24px 20px 20px")};
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  visibility: ${(props) => (props.isAutoSaveToggle ? "hidden" : "visible")};
  opacity: ${(props) => (props.isAutoSaveToggle ? "0" : "1")};
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 트랜지션 추가 */
  z-index: 99;

  &:before {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 20px 12px 20px;
    border-color: transparent transparent ${palette.white} transparent;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));
    // content: "";
    z-index: 0;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  h3 {
    font-size: 0.88rem;
    font-weight: 600;
    color: ${palette.gray800};
  }

  label {
    font-size: 0.875rem;
    color: ${palette.gray};
  }

  select {
    margin-left: 10px;
    padding: 5px;
    border-radius: 5px;
  }

  button {
    width: 100%;
    font-family: Pretendard, Poppins;
    font-size: 0.88rem;
    color: ${palette.white};
    margin-top: 16px;
    padding: 15px 0;
    border-radius: 8px;
    border: none;
    background-color: ${palette.blue};
    cursor: pointer;

    &:disabled {
      background-color: ${palette.lineGray};
      cursor: not-allowed;
    }
  }
`;

const SelectBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 120px;
    font-size: 0.75rem;
    text-align: center;
    color: ${palette.gray700};
    padding: 13px 0;
    border-radius: 10px;
    border: 1px solid ${palette.gray100};
    cursor: pointer;
    transition: all 0.5s;

    img {
      width: 40px;
      height: 40px;
    }

    &.selected {
      font-weight: 700;
      color: ${palette.gray800};
      border: 1px solid ${palette.blue};
      background: rgba(4, 83, 244, 0.05);
    }
  }
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .disabled img {
    filter: grayscale(100%);
  }

  .disabled span {
    color: ${palette.gray300};
  }
`;
