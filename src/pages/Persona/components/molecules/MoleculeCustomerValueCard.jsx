import React, { useState } from "react";
import styled from "styled-components";
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

  const renderButton = () => {
    switch (status) {
      case 'waiting':
        return (
          <CustomButton Medium PrimaryLightest Fill disabled>
            대기중
          </CustomButton>
        );
      case 'loading':
        return (
          <CustomButton Medium PrimaryLightest Fill disabled>
            생성중
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
            <CustomButton Medium PrimaryLightest Fill disabled>
              대기중
            </CustomButton>
          );
    }
  };

  return (
    <>
        <ListBoxItem 
            NoBg
            // selected={selectedPersonas.includes('persona1')} 
            // active={selectedPersonas.includes('persona1')}
        >
            <div>
            <CheckBoxButton 
                // id="persona1"
                // name="persona1"
                // checked={selectedPersonas.includes('persona1')}
                // onChange={() => handleCheckboxChange('persona1')}
            />
            </div>
            <ListText>
            <ListTitle>
                {/* <Body1 color={selectedPersonas.includes('persona1') ? "primary" : "gray800"}> */}
                <Body1 color="gray800">
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
                (Persona name)의 (Business)<br />고객 여정 분석
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
                    My Working Day
                  </BoxWrap>
                </>
              )}

              {activeTabIndex === 1 && (
                <>
                  <ListBox>
                    <div>
                      <span className="number">1</span>
                      <div>
                        <Sub1 color="gray800">유저저니맵 1 단계</Sub1>
                        <Body2 color="gray700" align="left">이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</Body2>
                        <div className="tag">
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="number">2</span>
                      <div>
                        <Sub1 color="gray800">유저저니맵 2 단계</Sub1>
                        <Body2 color="gray700" align="left">이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</Body2>
                        <div className="tag">
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="number">3</span>
                      <div>
                        <Sub1 color="gray800">유저저니맵 3 단계</Sub1>
                        <Body2 color="gray700" align="left">이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</Body2>
                        <div className="tag">
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="number">4</span>
                      <div>
                        <Sub1 color="gray800">유저저니맵 4 단계</Sub1>
                        <Body2 color="gray700" align="left">이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</Body2>
                        <div className="tag">
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="number">5</span>
                      <div>
                        <Sub1 color="gray800">유저저니맵 5 단계</Sub1>
                        <Body2 color="gray700" align="left">이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</Body2>
                        <div className="tag">
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                          <Sub3 color="gray800">#키워드</Sub3>
                        </div>
                      </div>
                    </div>
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