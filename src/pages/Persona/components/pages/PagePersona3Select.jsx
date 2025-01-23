import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import OrganismIncNavigation from "../../../Persona/components/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../Persona/components/molecules/MoleculeHeader";
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
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
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
} from "../../../../pages/AtomStates.jsx";

const FULL_DEFINITION_TEXT =
  "사용자 트렌드 민감도 분석은 사용자가 시장의 최신 트렌드에 얼마나 빠르고 효과적으로 반응하는지를 측정하는 방법론입니다. 이 분석은 사용자가 새로운 트렌드를 어떻게 인식하고, 그 트렌드에 따라 행동이 어떻게 변화하는지 파악하는 데 중점을 둡니다.";

const PagePersona3Select = () => {
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
  const [requestPersonaList, setRequestPersonaList] =
    useAtom(REQUEST_PERSONA_LIST);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // const [allBusinessPersonas, setAllBusinessPersonas] = useState([]); // 전체 비즈니스 페르소나 상태

  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, []);

  const handleStartInterview = () => {
    console.log("인터뷰 시작");
    console.log("personaList", personaList);
    console.log("singleInterviewQuestionList", singleInterviewQuestionList);
    // console.log("selectedInterviewPurpose", selectedInterviewPurpose);
    console.log("selectedInterviewPurposeData", selectedInterviewPurposeData);
    console.log("purposeItemsSingleAtom", purposeItemsSingleAtom);
    setShowPopup(true);
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

  const handlePersonaSelect = (personaId) => {
    setSelectedPersonas(personaId);
  };

  const getSelectedCount = () => {
    if (!selectedPersonas) return 0;
    return Array.isArray(selectedPersonas) ? selectedPersonas.length : 1;
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              {/* <AnalysisInfo showButtons={true} /> */}
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
                          {selectedInterviewPurposeData.view_title}
                        </Body2>
                      ) : null}
                    </li>
                    <li>
                      <Body2 color="gray500">페르소나 선택</Body2>
                      <PersonaGroup>
                        {selectedPersonas &&
                          (Array.isArray(selectedPersonas) ? (
                            <>
                              {selectedPersonas.length > 3 && (
                                <span>+{selectedPersonas.length - 3}</span>
                              )}
                              {selectedPersonas
                                .slice(0, 3)
                                .map((persona, index) => (
                                  <Persona key={index} size="Small" Round>
                                    <img
                                      src={persona.profileImage}
                                      alt={`선택된 페르소나 ${index + 1}`}
                                    />
                                  </Persona>
                                ))}
                            </>
                          ) : (
                            <Persona size="Small" Round>
                              <img
                                src={selectedPersonas.profileImage}
                                alt="선택된 페르소나"
                              />
                            </Persona>
                          ))}
                      </PersonaGroup>
                    </li>
                    {selectedInterviewType === "multiple" ? (
                      <></>
                    ) : selectedInterviewType === "single" ? (
                      <li>
                        <Body2 color="gray500">
                          반응형 인터뷰
                          <Tooltip>
                            <span>?</span>
                            <Caption2 align="left" color="white">
                              반응형 인터뷰란?<br />
                              페르소나의 답변에 맞춰, 모더레이터가 자동으로 추가 질문을 제시하는<br />
                              맞춤형 인터뷰 방식 입니다.
                            </Caption2>
                          </Tooltip>
                        </Body2>
                        <SwitchToggle>
                          <SwitchToggleItem>
                            <input type="checkbox" />
                            <span data-on="ON" data-off="OFF" />
                            <SwitchHandle />
                          </SwitchToggleItem>
                          <Body2 color="gray800">추가 질문 생성</Body2>
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
                        <Body2 color="gray800">📌 추천 페르소나</Body2>
                        <Sub3 color="gray800">
                          {getSelectedCount()}명 선택됨
                        </Sub3>
                      </>
                    ) : null}
                  </Title>
                  <MoleculePersonaSelectCard
                    interviewType={selectedInterviewType}
                    personaList={filteredProjectList}
                    selectedPersonas={selectedPersonas}
                    onPersonaSelect={setSelectedPersonas}
                  />
                </div>
              </InterviewWayContent>

              <BottomBar W100>
                <Body2 color="gray800">
                  {selectedInterviewType === "multiple"
                    ? `선택한 ${getSelectedCount()}명의 페르소나와 인터뷰를 진행하시겠습니까?`
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
                  {/* <img src={images.ChevronRight} alt="인터뷰 시작" /> */}
                </Button>
              </BottomBar>
            </MainSection>
          </AnalysisWrap>
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
        <OrganismToastPopupSingleChat isActive={showToast} autoClose={false} />
      ) : null}
    </>
  );
};

export default PagePersona3Select;

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
