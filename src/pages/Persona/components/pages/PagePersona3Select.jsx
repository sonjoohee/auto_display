import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import PopupWrap from "../../../../assets/styles/Popup";
import OrganismToastPopup from "../../../Persona/components/organisms/OrganismToastPopup";
import OrganismToastPopupSingleChat from "../../../Persona/components/organisms/OrganismToastPopupSingleChat";
import {
  Button,
  ButtonGroup,
  IconButton,
} from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import personaImages from "../../../../assets/styles/PersonaImages";
import { palette } from "../../../../assets/styles/Palette";
import MoleculePersonaSelectCard from "../../../Persona/components/molecules/MoleculePersonaSelectCard";
import {
  ContentsWrap,
  MainContent,
  AnalysisWrap,
  MainSection,
  CardWrap,
  CardGroupWrap,
  ListBoxItem,
  ListBorderItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BoxListWrap,
  BgBoxList,
  BgBoxItem,
  TextBox,
  TextInfo,
  Badge,
  BottomBar,
  ListBoxGroup,
  PersonaGroup,
  Persona,
  Title,
  PersonaInfo,
  SwitchToggle,
  SwitchToggleItem,
  SwitchHandle,
  Tooltip,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  H3,
  H5,
  Body1,
  Body2,
  Body3,
  Sub1,
  Sub2,
  Sub3,
  Caption1,
  Caption2,
} from "../../../../assets/styles/Typography";
import {
  SELECTED_INTERVIEW_TYPE,
  SELECTED_INTERVIEW_PURPOSE,
  SELECTED_INTERVIEW_PURPOSE_DATA,
  FILTERED_PROJECT_LIST,
  PERSONA_LIST,
  REQUEST_PERSONA_LIST,
  IS_PERSONA_ACCESSIBLE,
  INTERVIEW_QUESTION_LIST,
  PERSONA_BUTTON_STATE_3,
  SINGLE_INTERVIEW_QUESTION_LIST,
  PURPOSE_ITEMS_SINGLE,
  CREDIT_INDEPTH_INTERVIEW,
  EVENT_STATE,
  EVENT_TITLE,
  TRIAL_STATE,
  USER_CREDITS,
  All_BUSINESS_PERSONA_LIST,
  CUSTOM_PERSONA_LIST,
  PERSONA_LIST_SAAS,
} from "../../../../pages/AtomStates.jsx";
import {
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
} from "../../../../utils/indexedDB";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import OrganismPersonaListSaas from "../organisms/OrganismPersonaListSaas";

const FULL_DEFINITION_TEXT =
  "사용자 트렌드 민감도 분석은 사용자가 시장의 최신 트렌드에 얼마나 빠르고 효과적으로 반응하는지를 측정하는 방법론입니다. 이 분석은 사용자가 새로운 트렌드를 어떻게 인식하고, 그 트렌드에 따라 행동이 어떻게 변화하는지 파악하는 데 중점을 둡니다.";

const PagePersona3Select = () => {
  const [customPersonaList, setCustomPersonaList] =
    useAtom(CUSTOM_PERSONA_LIST);
  const [allBusinessPersonas, setAllBusinessPersonas] = useAtom(
    All_BUSINESS_PERSONA_LIST
  );
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [showPopup, setShowPopup] = useState(false);
  const [showQuestions, setShowQuestions] = useState({
    radio3: false,
    radio4: false,
    radio5: false,
  });
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
  );
  const [singleInterviewQuestionList, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
  const [purposeItemsSingleAtom, setPurposeItemsSingleAtom] =
    useAtom(PURPOSE_ITEMS_SINGLE);
  const navigate = useNavigate();
  const [showCustomization, setShowCustomization] = useState(false);
  const [purposeText, setPurposeText] = useState("");
  const [showMethodology, setShowMethodology] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDefinition, setEditedDefinition] = useState("");
  const [editedPurpose, setEditedPurpose] = useState("");
  const [definitionText, setDefinitionText] = useState(
    "사용자 트렌드 민감도 분석은 사용자가 시장의 최신 트렌드에 얼마나 빠르고 효과적으로 반응하는지를 측정하는 방법론입니다. 이 분석은 사용자가 새로운 트렌드를 어떻게 인식하고, 그 트렌드에 따라 행동이 어떻게 변화하는지 파악하는 데 중점을 둡니다."
  );
  const [showNewListBox, setShowNewListBox] = useState(false);
  const [customizations, setCustomizations] = useState([]);
  const [showCustomButton, setShowCustomButton] = useState(true);
  const [selectedPersonas, setSelectedPersonas] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedInterviewType] = useAtom(SELECTED_INTERVIEW_TYPE);
  const [selectedInterviewPurpose] = useAtom(SELECTED_INTERVIEW_PURPOSE);
  const [selectedInterviewPurposeData] = useAtom(
    SELECTED_INTERVIEW_PURPOSE_DATA
  );
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [filteredProjectList, setFilteredProjectList] = useAtom(
    FILTERED_PROJECT_LIST
  );
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [businessAnalysis, setBusinessAnalysis] = useState({
    title: "맞춤 페르소나 인터뷰",
  });
  const [showRequestPopup, setShowRequestPopup] = useState(false);

  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );

  const [creditIndepthInterview] = useAtom(CREDIT_INDEPTH_INTERVIEW);
  const [eventState] = useAtom(EVENT_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [trialState] = useAtom(TRIAL_STATE);

  const [isIndepthEnabled, setIsIndepthEnabled] = useState(false);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, [navigate]);

  // 배경 scroll 방지
  useEffect(() => {
    if (showToast) {
      // body와 html 모두 scroll을 막도록 설정
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    // 컴포넌트 언마운트 시 원상 복구
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showToast]);

  // 모집 요청 팝업 닫기 함수
  const handleCloseRequestPopup = () => {
    setShowRequestPopup(false);
  };

  // 크레딧 체크 및 사용 함수
  const creditUse = async () => {
    try {
      const creditPayload = {
        // 기존 10 대신 additionalQuestionMount 사용
        mount: creditIndepthInterview,
      };

      const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

      if (creditResponse?.state !== "use") {
        setShowCreditPopup(true);
        return;
      }

      // 크레딧이 사용 가능한 상태면 사용 API 호출
      const creditUsePayload = {
        title: businessAnalysis.title,
        service_type: "인뎁스 인터뷰",
        target: "",
        state: "use",
        mount: creditIndepthInterview,
      };

      const creditUseResponse = await UserCreditUse(
        creditUsePayload,
        isLoggedIn
      );

      // 이후 인터뷰 시작 등 추가 로직 처리 (예를 들어 인터뷰 준비 팝업 표시)
      setShowPopup(true);

      // 크레딧 사용 후 사용자 정보 새로고침
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const userCreditValue = await UserCreditInfo(isLoggedIn);

        // 전역 상태의 크레딧 정보 업데이트
        setUserCredits(userCreditValue);
      }
    } catch (error) {
      console.error("크레딧 체크 실패:", error);
      setShowCreditPopup(true);
      return;
    }
  };

  const handleStartInterview = () => {
    if (isIndepthEnabled) {
      setShowRequestPopup(true);
    } else {
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleConfirmStart = () => {
    setPersonaButtonState3(1);
    setShowPopup(false);
    setShowToast(true);
  };

  const handleCreatePurpose = () => {
    if (!purposeText.trim()) {
      setShowPopup(true);
    } else {
      setShowMethodology(true);
    }
  };

  const handleEditClick = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].isEditing = true;
    newCustomizations[index].editedDefinition =
      newCustomizations[index].definitionText;
    newCustomizations[index].editedPurpose =
      newCustomizations[index].purposeText;
    setCustomizations(newCustomizations);
  };

  const handleEditComplete = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].definitionText =
      newCustomizations[index].editedDefinition;
    newCustomizations[index].purposeText =
      newCustomizations[index].editedPurpose;
    newCustomizations[index].isEditing = false;
    setCustomizations(newCustomizations);
  };

  const handlePersonaSelect = (personaImg) => {
    setSelectedPersonas(personaImg);
  };

  const getSelectedCount = () => {
    if (!selectedPersonas) return 0;
    return Array.isArray(selectedPersonas) ? selectedPersonas.length : 1;
  };

  const [personaListSaas, setPersonaListSaas] = useAtom(PERSONA_LIST_SAAS);
  console.log("personaListSaas", personaListSaas);

  const [selectedPersonaButtons, setSelectedPersonaButtons] = useState({});

  // 버튼 클릭 핸들러 추가
  const handlePersonaButtonClick = (personaId) => {
    setSelectedPersonaButtons((prev) => ({
      ...prev,
      [personaId]: !prev[personaId],
    }));
  };

  console.log("selectedInterviewType:", selectedInterviewType); // 디버깅용

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <PersonaSingleWrap>
            <TabWrapType5>
              <TabButtonType5 isActive>
                <span>01</span>
                <div className="text">
                  <Body1 color="gray800">인터뷰 목표 설정</Body1>
                  <Body1 color="gray800">Interview Define</Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5 isActive>
                <span>02</span>
                <div className="text">
                  <Body1 color="gray800">페르소나 선택</Body1>
                  <Body1 color="gray800">Persona Selection</Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5>
                <span>03</span>
                <div className="text">
                  <Body1 color="gray300">
                    {selectedInterviewType === "multiple"
                      ? "그룹 인터뷰"
                      : "심층 인터뷰"}
                  </Body1>
                  <Body1 color="gray300">
                    {selectedInterviewType === "multiple"
                      ? "Group Interview"
                      : "Indepth Interview"}
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5>
                <span>04</span>
                <div className="text">
                  <Body1 color="gray300">최종 인사이트 분석</Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            <TabContent5>
              <div className="title">
                <H3 color="gray800">Persona Selection</H3>
                <Body3 color="gray800">
                  인터뷰에 참여할 최적의 페르소나를 선정하세요{" "}
                </Body3>
              </div>

              <div className="content">
                <div>
                  <Body2 color="gray800" align="left">
                    인터뷰 정보
                  </Body2>

                  <ListBoxGroup>
                    {/* <li>
                      <Body2 color="gray500">인터뷰 방식</Body2>
                      {selectedInterviewType === "multiple" ? (
                        <Body2 color="gray800">
                          여러 페르소나 인터뷰 (1:N)
                        </Body2>
                      ) : selectedInterviewType === "single" ? (
                        <Body2 color="gray800">한명과 심층 인터뷰 (1:1)</Body2>
                      ) : null}
                    </li> */}
                    <li>
                      <Body2 color="gray500">인터뷰 목적</Body2>
                      {selectedInterviewType === "multiple" ? (
                        <Body2 color="gray800">
                          {selectedInterviewPurpose}
                        </Body2>
                      ) : selectedInterviewType === "single" ? (
                        <Body2 color="gray800">
                          {selectedInterviewPurposeData?.view_title || ""}
                        </Body2>
                      ) : null}
                    </li>
                    <li>
                      <Body2 color="gray500">페르소나 선택</Body2>
                      {selectedPersonas ? (
                        <PersonaGroup>
                          {Array.isArray(selectedPersonas) ? (
                            <>
                              {selectedPersonas.length > 3 && (
                                <span>+{selectedPersonas.length - 3}</span>
                              )}
                              {selectedPersonas
                                .slice(0, 3)
                                .map((persona, index) => (
                                  <Persona key={index} size="Small" Round>
                                    <img
                                      src={`/ai_person/${persona.personaImg}.png`}
                                      alt={persona.persona}
                                    />
                                  </Persona>
                                ))}
                            </>
                          ) : (
                            <Persona size="Small" Round>
                              <img
                                src={`/ai_person/${selectedPersonas.personaImg}.png`}
                                alt={selectedPersonas.persona}
                              />
                            </Persona>
                          )}
                        </PersonaGroup>
                      ) : (
                        <Body2 color="gray300">
                          페르소나가 선택되지 않았습니다. 하단에서 페르소나를
                          선택해 주세요!
                        </Body2>
                      )}
                    </li>
                    {selectedInterviewType === "multiple" ? (
                      <></>
                    ) : selectedInterviewType === "single" ? (
                      <li>
                        <Body2 color="gray500">
                          인뎁스 인터뷰
                          <Tooltip>
                            <span>?</span>
                            <Caption2 align="left" color="white">
                              인뎁스 인터뷰란?
                              <br />
                              페르소나의 답변에 맞춰, 모더레이터가 자동으로 추가
                              질문을 제시하는 맞춤형 인터뷰 방식 입니다.
                            </Caption2>
                          </Tooltip>
                        </Body2>
                        <SwitchToggle>
                          <SwitchToggleItem>
                            <input
                              type="checkbox"
                              checked={isIndepthEnabled}
                              onChange={(e) =>
                                setIsIndepthEnabled(e.target.checked)
                              }
                            />
                            <span data-on="ON" data-off="OFF" />
                            <SwitchHandle />
                          </SwitchToggleItem>
                          <Body2
                            color={isIndepthEnabled ? "gray800" : "gray300"}
                          >
                            인뎁스 인터뷰 수행
                            {!isIndepthEnabled ? (
                              <Sub3 color="gray300" style={{ width: "auto" }}>
                                ({creditIndepthInterview} 크레딧 소모)
                              </Sub3>
                            ) : (
                              <Sub3 color="gray800" style={{ width: "auto" }}>
                                ({creditIndepthInterview} 크레딧 소모)
                              </Sub3>
                            )}
                          </Body2>
                        </SwitchToggle>
                      </li>
                    ) : null}
                  </ListBoxGroup>
                </div>

                <OrganismPersonaListSaas
                  personaListSaas={personaListSaas}
                  personaImages={personaImages}
                  selectedPersonaButtons={selectedPersonaButtons}
                  handlePersonaButtonClick={handlePersonaButtonClick}
                  onNavigate={navigate}
                  selectedPersonas={selectedPersonas}
                  onPersonaSelect={setSelectedPersonas}
                />
              </div>
              <BottomBar W100>
                <Body2 color="gray800">
                  {selectedInterviewType === "multiple"
                    ? `선택한 ${getSelectedCount()}명의 페르소나와 인터뷰를 진행하시겠습니까?`
                    : getSelectedCount() === 0
                    ? "인터뷰할 페르소나를 선택해주세요"
                    : "선택한 페르소나와 인터뷰를 진행하시겠습니까?"}
                </Body2>
                <Button
                  Large
                  Primary
                  Round
                  Fill
                  disabled={getSelectedCount() === 0}
                  onClick={handleStartInterview}
                >
                  인터뷰 시작
                  <images.ChevronRight
                    width="20px"
                    height="20px"
                    color="white"
                  />
                </Button>
              </BottomBar>
            </TabContent5>

            {/* <MainSection>
              <InterviewWayTab>
                <InterviewWayTabItem>
                  <span>1</span>
                  <H5>인터뷰 방법 선택</H5>
                </InterviewWayTabItem>
                <InterviewWayTabItem active>
                  <span>2</span>
                  <H5>참여 페르소나 선택</H5>
                </InterviewWayTabItem>
              </InterviewWayTab>

              <InterviewWayContent>
                <div>
                  <Body2 color="gray800">인터뷰 정보</Body2>

                  <ListBoxGroup>
                    <li>
                      <Body2 color="gray500">인터뷰 방식</Body2>
                      {selectedInterviewType === "multiple" ? (
                        <Body2 color="gray800">
                          여러 페르소나 인터뷰 (1:N)
                        </Body2>
                      ) : selectedInterviewType === "single" ? (
                        <Body2 color="gray800">한명과 심층 인터뷰 (1:1)</Body2>
                      ) : null}
                    </li>
                    <li>
                      <Body2 color="gray500">인터뷰 목적</Body2>
                      {selectedInterviewType === "multiple" ? (
                        <Body2 color="gray800">
                          {selectedInterviewPurpose}
                        </Body2>
                      ) : selectedInterviewType === "single" ? (
                        <Body2 color="gray800">
                          {selectedInterviewPurposeData?.view_title || ""}
                        </Body2>
                      ) : null}
                    </li>
                    <li>
                      <Body2 color="gray500">페르소나 선택</Body2>
                      {selectedPersonas ? (
                        <PersonaGroup>
                          {Array.isArray(selectedPersonas) ? (
                            <>
                              {selectedPersonas.length > 3 && (
                                <span>+{selectedPersonas.length - 3}</span>
                              )}
                              {selectedPersonas
                                .slice(0, 3)
                                .map((persona, index) => (
                                  <Persona key={index} size="Small" Round>
                                    <img
                                      src={`/ai_person/${persona.personaImg}.png`}
                                      alt={persona.persona}
                                    />
                                  </Persona>
                                ))}
                            </>
                          ) : (
                            <Persona size="Small" Round>
                              <img
                                src={`/ai_person/${selectedPersonas.personaImg}.png`}
                                alt={selectedPersonas.persona}
                              />
                            </Persona>
                          )}
                        </PersonaGroup>
                      ) : (
                        <Body2 color="gray300">
                          페르소나가 선택되지 않았습니다. 하단에서 페르소나를
                          선택해 주세요!
                        </Body2>
                      )}
                    </li>
                    {selectedInterviewType === "multiple" ? (
                      <></>
                    ) : selectedInterviewType === "single" ? (
                      <li>
                        <Body2 color="gray500">
                          인뎁스 인터뷰
                          <Tooltip>
                            <span>?</span>
                            <Caption2 align="left" color="white">
                              인뎁스 인터뷰란?
                              <br />
                              페르소나의 답변에 맞춰, 모더레이터가 자동으로 추가
                              질문을 제시하는 맞춤형 인터뷰 방식 입니다.
                            </Caption2>
                          </Tooltip>
                        </Body2>
                        <SwitchToggle>
                          <SwitchToggleItem>
                            <input
                              type="checkbox"
                              checked={isIndepthEnabled}
                              onChange={(e) =>
                                setIsIndepthEnabled(e.target.checked)
                              }
                            />
                            <span data-on="ON" data-off="OFF" />
                            <SwitchHandle />
                          </SwitchToggleItem>
                          <Body2
                            color={isIndepthEnabled ? "gray800" : "gray300"}
                          >
                            인뎁스 인터뷰 수행
                            {!isIndepthEnabled ? (
                              <Sub3 color="gray300" style={{ width: "auto" }}>
                                ({creditIndepthInterview} 크레딧 소모)
                              </Sub3>
                            ) : (
                              <Sub3 color="gray800" style={{ width: "auto" }}>
                                ({creditIndepthInterview} 크레딧 소모)
                              </Sub3>
                            )}
                          </Body2>
                        </SwitchToggle>
                      </li>
                    ) : null}
                  </ListBoxGroup>
                </div>

                <div>
                  <Title>
                    {selectedInterviewType === "multiple" ? (
                      <>
                        <Body2 color="gray800">⭐ 페르소나 리스트</Body2>
                        <Sub3 color="gray800">
                          {getSelectedCount()}명 선택됨
                        </Sub3>
                      </>
                    ) : selectedInterviewType === "single" ? (
                      <>
                        <Body2 color="gray800">📌 참여가능 페르소나</Body2>
                        <Sub3 color="gray800">
                          {getSelectedCount()}명 선택됨
                        </Sub3>
                      </>
                    ) : null}
                  </Title>
                  <MoleculePersonaSelectCard
                    interviewType={selectedInterviewType}
                    filteredPersonaList={filteredProjectList}
                    businessPersonaList={allBusinessPersonas.filter(persona => persona?.status === "complete")}
                    customPersonaList={customPersonaList}
                    selectedPersonas={selectedPersonas}
                    onPersonaSelect={setSelectedPersonas}
                  />
                </div>
              </InterviewWayContent>

              <BottomBar W100>
                <Body2 color="gray800">
                  {selectedInterviewType === "multiple"
                    ? `선택한 ${getSelectedCount()}명의 페르소나와 인터뷰를 진행하시겠습니까?`
                    : getSelectedCount() === 0
                    ? "인터뷰할 페르소나를 선택해주세요"
                    : "선택한 페르소나와 인터뷰를 진행하시겠습니까?"}
                </Body2>
                <Button
                  Large
                  Primary
                  Round
                  Fill
                  disabled={getSelectedCount() === 0}
                  onClick={handleStartInterview}
                >
                  인터뷰 시작
                  <images.ChevronRight
                    width="20px"
                    height="20px"
                    color="white"
                  />
                </Button>
              </BottomBar>
            </MainSection> */}
          </PersonaSingleWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <PopupWrap
          Check
          title="인터뷰 준비 완료"
          message={
            <>
              인터뷰 룸 이동 시, 바로 시작됩니다.
              <br />
              인터뷰를 중단하면 모든 내역이 삭제되니 주의하세요
            </>
          }
          buttonType="Outline"
          closeText="취소"
          confirmText="시작하기"
          isModal={false}
          onCancel={handlePopupClose}
          onConfirm={handleConfirmStart}
          show={showPopup}
        />
      )}

      {selectedInterviewType === "multiple" ? (
        <OrganismToastPopup isActive={showToast} autoClose={false} />
      ) : selectedInterviewType === "single" ? (
        <OrganismToastPopupSingleChat
          isActive={showToast}
          autoClose={false}
          isIndepth={isIndepthEnabled}
        />
      ) : null}

      {showCreditPopup && (
        <PopupWrap
          Warning
          title="크레딧이 모두 소진되었습니다"
          message={
            <>
              보유한 크레딧이 부족합니다.
              <br />
              크레딧을 충전한 후 다시 시도해주세요.
            </>
          }
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={() => setShowCreditPopup(false)}
          onConfirm={() => setShowCreditPopup(false)}
        />
      )}

      {/* 모집 요청 팝업 추가 */}
      {showRequestPopup &&
        (eventState ? (
          <PopupWrap
            Event
            title="인뎁스 인터뷰"
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditIndepthInterview} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              handleCloseRequestPopup();
              creditUse();
            }}
          />
        ) : trialState ? (
          <PopupWrap
            Check
            title="인뎁스 인터뷰"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditIndepthInterview} 크레딧)
                <br />
                신규 가입 2주간 무료로 사용 가능합니다.
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              handleCloseRequestPopup();
              creditUse();
            }}
          />
        ) : (
          <PopupWrap
            Check
            title="인뎁스 인터뷰"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditIndepthInterview} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              handleCloseRequestPopup();
              creditUse();
            }}
          />
        ))}
    </>
  );
};

export default PagePersona3Select;

const PersonaSingleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const InterviewWayTab = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-bottom: 20px;
`;

const InterviewWayTabItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex: 1;
  color: ${(props) => (props.active ? palette.gray800 : palette.gray300)};
  padding: 20px 24px;
  border-radius: 15px;
  background: ${(props) => (props.active ? palette.chatGray : palette.white)};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.5;
    color: ${palette.white};
    border-radius: 50%;
    background: ${(props) =>
      props.active ? palette.primary : palette.gray300};
  }
`;

const InterviewWayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
  text-align: left;
  margin-bottom: 100px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const CustomizationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;

  > div {
    width: 100%;
  }

  button span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid ${palette.gray700};

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 1px;
      background: ${palette.gray700};
      content: "";
    }

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
`;

const CustomizationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 24px 24px 20px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const CustomTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
