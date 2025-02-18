import React, { useState } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import {
    ListBoxItem,
    ListText,
    ListTitle,
    ListSubtitle,
    ListButton,
    Badge,
    ListRowWrap,
    ListRowItem,
    InterviewPopup,
    Status,
    TabWrapType2,
    TabButtonType2,
    TabContent,
    BoxWrap,
    ListBox,
    TextWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { 
    FormBox, 
    CustomTextarea, 
    CustomInput, 
    SelectBox, 
    SelectBoxItem, 
    SelectBoxTitle, 
    SelectBoxList,
    CheckBoxButton,
    GenderRadioButton,
  } from "../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../assets/styles/Popup";
import {
    H4,
    Body1,
    Body2,
    Body3,
    Sub1,
    Sub3,
} from "../../../../assets/styles/Typography";

import { useAtom } from "jotai";
import {
    CUSTOMER_VALUE_ANALYZER_INFO,
    CUSTOMER_VALUE_ANALYZER_PERSONA,
    CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP,
    CUSTOMER_VALUE_ANALYZER_FACTOR,
    CUSTOMER_VALUE_ANALYZER_CLUSTERING,
    CUSTOMER_VALUE_ANALYZER_POSITIONING,
    CUSTOMER_VALUE_ANALYZER_FINAL_REPORT,
    TOOL_ID,
} from "../../../../pages/AtomStates";

import {
    createToolOnServer,
    updateToolOnServer,
    getToolOnServer,
    InterviewXCustomerValueAnalyzerPersonaRequest,
    getToolListOnServer,
    InterviewXCustomerValueAnalyzerJourneyMapRequest,
    InterviewXCustomerValueAnalyzerFactorRequest,
    InterviewXCustomerValueAnalyzerClusteringRequest,
    InterviewXCustomerValueAnalyzerPositioningRequest,
    InterviewXCustomerValueAnalyzerFinalReportRequest,
  } from "../../../../utils/indexedDB";

const MoleculeCustomerValueCard = ({
  title,
  content,
  status, // 'waiting' | 'loading' | 'completed'
  onAnalyze, // API 요청을 시작하는 함수
  isSelected, // 선택 여부
  onSelect, // 선택 이벤트 핸들러
  id, // 카드 식별자
  journeyMapData // 새로운 prop 추가
}) => {
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [customerValueAnalyzerInfo, setCustomerValueAnalyzerInfo] = useAtom(CUSTOMER_VALUE_ANALYZER_INFO);
  const [customerValueAnalyzerPersona, setCustomerValueAnalyzerPersona] = useAtom(CUSTOMER_VALUE_ANALYZER_PERSONA);
  const [customerValueAnalyzerJourneyMap, setCustomerValueAnalyzerJourneyMap] = useAtom(CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP);
  const [customerValueAnalyzerFactor, setCustomerValueAnalyzerFactor] = useAtom(CUSTOMER_VALUE_ANALYZER_FACTOR);
  const [customerValueAnalyzerClustering, setCustomerValueAnalyzerClustering] = useAtom(CUSTOMER_VALUE_ANALYZER_CLUSTERING);
  const [customerValueAnalyzerPositioning, setCustomerValueAnalyzerPositioning] = useAtom(CUSTOMER_VALUE_ANALYZER_POSITIONING);
  const [customerValueAnalyzerFinalReport, setCustomerValueAnalyzerFinalReport] = useAtom(CUSTOMER_VALUE_ANALYZER_FINAL_REPORT);

  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("personaInfo");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  console.log("customerValueAnalyzerJourneyMap", customerValueAnalyzerJourneyMap);
  
  const renderButton = () => {
    switch (status) {
      case 'waiting':
        return (
          <CustomButton Medium PrimaryLightest Fill disabled $loading>
            대기중
          </CustomButton>
        );
      case 'loading':
        return (
          <CustomButton Medium PrimaryLightest Fill disabled $loading>
            호출중
          </CustomButton>
        );
      case 'completed':
        return (
          <CustomButton
            Medium
            PrimaryLightest
            Fill
            onClick={() => setShowDetailPopup(true)}
          >
            자세히
          </CustomButton>
        );
      default:
        return (
          <CustomButton Medium PrimaryLightest Fill disabled $loading>
            대기중
          </CustomButton>
        );
    }
  };

  return (
    <>
        <ListBoxItem 
            NoBg
            selected={isSelected}
            active={isSelected}
        >
            <div>
            <CheckBoxButton 
                id={id}
                name={id}
                checked={isSelected}
                onChange={() => onSelect(id)}
            />
            </div>
            <ListText>
            <ListTitle>
                <Body1 color={isSelected ? "primary" : "gray800"}>
                {title}
                </Body1>
            </ListTitle>

            <ListSubtitle>
                {content}
            </ListSubtitle>
            </ListText>
            <ListButton>
                {renderButton()}
            </ListButton>
        </ListBoxItem>

      {showDetailPopup && (
        <PopupWrap
          Wide1000
          title={
            <>
              <H4 color="gray800" align="left">
                {title}의 {content}<br />고객 여정 분석
              </H4>
            </>
          }
          buttonType="Fill"
          isModal={true}
          showTabs={true}
          tabs={["고객 여정 맵", "여정별 상세 설명"]}
          activeTab={activeTabIndex}
          onTabChange={(index) => setActiveTabIndex(index)}
          eventState={false}
          creditRequestCustomPersona={1}
          customAlertBox={
            <TextWrap>
              <Body2 color="gray800" align="left">
                이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다. 다만, 참신함이 곧 블루 오션을 의미하지 않으므로, 진입 전략은 사용자 친화적 디자인, 가족의 참여를 유도하는 마케팅, 맞춤형 프로그램으로 보강해야 합니다.
              </Body2>
            </TextWrap>
          }
          onClose={() => setShowDetailPopup(false)}
          onCancel={() => setShowDetailPopup(false)}
          body={
            <>
              {activeTabIndex === 0 && (
                <>
                  <BoxWrap>
                    {journeyMapData?.journey_map_image || "Journey map 이미지가 없습니다."}
                  </BoxWrap>
                </>
              )}

              {activeTabIndex === 1 && (
                <>
                  <ListBox>
                    {Object.entries(journeyMapData).map(([key, step], index) => {
                      // conclusion은 제외
                      if (key === 'conclusion') return null;
                      
                      return (
                        <div key={index}>
                          <span className="number">{index + 1}</span>
                          <div>
                            <Sub1 color="gray800">{step.title}</Sub1>
                            <Body2 color="gray700" align="left">{step.detail}</Body2>
                            <div className="tag">
                              <Sub3 color="gray800">#{step.emotion}</Sub3>
                              {step.mot !== "해당 없음" && (
                                <Sub3 color="gray800">#{step.mot}</Sub3>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </ListBox>
                </>
              )}
            </>
          }
        />
      )}
    </>
  );
};

export default MoleculeCustomerValueCard;

const CustomButton = styled(Button)`
  min-width: 92px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  ${(props) =>
    props.$loading &&
    css`
      position: relative;
      justify-content: ${props.children === "호출중"
        ? "space-between"
        : "center"};
      border: 1px solid ${palette.outlineGray} !important;
      background: ${palette.chatGray} !important;
      color: ${palette.gray700} !important;
      opacity: 1;

      ${props.children === "호출중" &&
      css`
        &:after {
          content: "";
          width: 3px;
          height: 3px;
          border-radius: 50%;
          display: block;
          position: relative;
          margin-right: 8px;
          background: ${palette.white};
          box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.white};
          box-sizing: border-box;
          animation: shadowPulse 2s linear infinite;
        }

        @keyframes shadowPulse {
          33% {
            background: ${palette.white};
            box-shadow: -10px 0 ${palette.primary}, 10px 0 ${palette.white};
          }
          66% {
            background: ${palette.primary};
            box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.white};
          }
          100% {
            background: ${palette.white};
            box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.primary};
          }
        }
      `}
    `}
`;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;