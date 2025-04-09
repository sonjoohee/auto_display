//인터뷰룸
import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import images from "../../../../../assets/styles/Images";
import PopupWrap from "../../../../../assets/styles/Popup";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  IS_LOGGED_IN,
  SELECTED_INTERVIEW_PURPOSE,
  PERSONA_LIST,
  INTERVIEW_QUESTION_LIST,
  PERSONA_BUTTON_STATE_3,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  INTERVIEW_DATA,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL,
  IS_PERSONA_ACCESSIBLE,
  SELECTED_PERSONA_LIST,
  PROJECT_TOTAL_INFO,
  PROJECT_CREATE_INFO,
  PROJECT_SAAS,
} from "../../../../AtomStates";
import personaImages from "../../../../../assets/styles/PersonaImages";
import { updateProjectOnServer } from "../../../../../utils/indexedDB";
import { createProjectReportOnServer } from "../../../../../utils/indexedDB";
import MoleculeRecreate from "../../../../Persona/components/molecules/MoleculeRecreate";
import { InterviewXPersonaMultipleInterviewGeneratorRequest } from "../../../../../utils/indexedDB";
import { InterviewXPersonaMultipleInterviewRequest } from "../../../../../utils/indexedDB";
import { InterviewXInterviewReportRequest } from "../../../../../utils/indexedDB";
import { InterviewXInterviewReportAdditionalRequest } from "../../../../../utils/indexedDB";

const OrganismToastPopupQuickSurveyComplete = ({
  isActive,
  onClose,
  isComplete,
}) => {
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const project = projectSaas;
  const [selectedPersonaList, setSelectedPersonaList] = useAtom(
    SELECTED_PERSONA_LIST
  );
  const [, setReportId] = useAtom(PROJECT_REPORT_ID);
  const [, setIsPersonaAccessible] = useAtom(IS_PERSONA_ACCESSIBLE);
  const [, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [, setInterviewReportAdditional] = useAtom(INTERVIEW_REPORT_ADDITIONAL);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
  const [selectedInterviewPurpose] = useAtom(SELECTED_INTERVIEW_PURPOSE);
  const [personaList] = useAtom(PERSONA_LIST);
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
  );
  const [projectTotalInfo] = useAtom(PROJECT_TOTAL_INFO);
  const [projectCreateInfo] = useAtom(PROJECT_CREATE_INFO);

  const navigate = useNavigate();

  const [active, setActive] = useState(isActive);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoadingPrepare, setIsLoadingPrepare] = useState(true);
  const [interviewQuestionListState, setInterviewQuestionListState] = useState(
    []
  );
  const [interviewStatus, setInterviewStatus] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [regenerateCount1, setRegenerateCount1] = useState(0);
  const [regenerateCount2, setRegenerateCount2] = useState(0);
  const [showRegenerateButton1, setShowRegenerateButton1] = useState(false);
  const [showRegenerateButton2, setShowRegenerateButton2] = useState(false);

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      // 인터뷰 스크립트 보기, 인터뷰 상세보기로 진입 시 isComplete는 True
      if (isComplete) {
        const questions = interviewData.map((item) => ({
          question: item.question_1 || item.question_2 || item.question_3,
        }));
        setInterviewQuestionListState(questions);
        // 모든 질문을 Complete 상태로 설정
        const completedStatus = new Array(interviewData.length).fill(
          "Complete"
        );
        setInterviewStatus(completedStatus);

        const newAnswers = {};

        questions.forEach((_, index) => {
          const answers = interviewData[index][`answer_${index + 1}`];
          newAnswers[index] = (
            selectedPersonaList.length
              ? selectedPersonaList
              : personaList.selected
          ).map((persona, pIndex) => {
            // profile 문자열에서 정보 추출

            const age = persona.age;
            const gender = persona.gender;
            const job = persona.job;

            return {
              persona: persona,
              imageKey: persona.imageKey,
              gender: gender,
              age: age,
              job: job,
              answer: answers[pIndex],
            };
          });
        });
        setAnswers(newAnswers);

        // 모든 답변을 보이도록 설정
        const allVisible = {};
        questions.forEach((_, index) => {
          allVisible[index] = true;
        });
        setVisibleAnswers(allVisible);
        setIsLoadingPrepare(false);

        return; // isComplete가 True일 때 API 호출 없이 종료
      }
    };
    interviewLoading();
  }, [personaButtonState3, isComplete]);

  const renderAnswersComplete = (questionIndex) => {
    const questionAnswers = answers[questionIndex] || [];

    return (
      <>
        {questionAnswers.map((answer, index) => (
          <AnswerItem key={index}>
            <TypeName>
              <Thumb>
                <img
                  src={personaImages[answer.persona.imageKey]}
                  alt={answer.persona.persona}
                />
              </Thumb>
              <div>
                {answer.persona.request_persona_type
                  ? answer.persona.persona
                  : answer.persona.persona_view}
                <p>
                  <span>{answer.gender}</span>
                  <span>
                    {answer.age.includes("세") ? answer.age : `${answer.age}세`}
                  </span>
                  <span>{answer.job}</span>
                </p>
              </div>
            </TypeName>
            <TextContainer>{answer.answer}</TextContainer>
          </AnswerItem>
        ))}
      </>
    );
  };

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const handleClose = () => {
    if (isComplete) {
      setActive(false);
      if (onClose) {
        onClose();
      }
      return;
    }
    setShowWarning(true);
  };

  const handleWarningClose = () => {
    setIsLoadingPrepare(true);
    setShowWarning(false);
    setActive(false);
    if (onClose) {
      onClose();
    }
    setPersonaButtonState3(0);
    // onClose();
    window.location.href = "/";
  };

  const handleWarningContinue = () => {
    setShowWarning(false);
  };

  useEffect(() => {
    setVisibleAnswers((prev) => {
      const newVisibleAnswers = { ...prev };
      interviewStatus.forEach(async (status, index) => {
        // 진행중인 질문은 자동으로 열기
        if (status === "Ing") {
          newVisibleAnswers[index] = true;
        }
        // 완료된 질문은 자동으로 닫기
        else if (status === "Complete") {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          newVisibleAnswers[index] = false;
        }
      });
      return newVisibleAnswers;
    });
  }, [interviewStatus]);

  const handleAnswerToggle = (index) => {
    // 'Pre', 'Ing' 상태일 때는 토글 불가능
    if (
      interviewStatus[index] === "Pre" ||
      interviewStatus[index] === "Ing" ||
      interviewStatus[index] === undefined
    )
      return;
    setVisibleAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // 이미 완료된 인터뷰를 확인할 때 사용 ex)인터뷰 스크립트 보기, 인터뷰 상세보기
  const renderInterviewItemsComplete = () => {
    return interviewQuestionListState.map((item, index) => (
      <InterviewItem key={index} status={"Complete"}>
        <QuestionWrap
          onClick={() => handleAnswerToggle(index)}
          status={"Complete"}
          style={{ cursor: "pointer" }}
          isOpen={visibleAnswers[index]}
        >
          <Status status={"Complete"}>완료</Status>
          <QuestionText>
            Q{index + 1}. {item.question}
          </QuestionText>
        </QuestionWrap>
        {visibleAnswers[index] && (
          <AnswerWrap>{renderAnswersComplete(index)}</AnswerWrap>
        )}
      </InterviewItem>
    ));
  };

  const handleCheckResult = async () => {
    setActive(false);
    if (onClose) {
      onClose();
    }
    setIsPersonaAccessible(true);
    try {
      // 인터뷰 완료 후 결과 저장하기 위해 새로운 리포트 생성 (나중에 리포트 조회)
      let newReportId = await createProjectReportOnServer(
        project._id,
        "interviewGroup"
      );
      setReportId(newReportId); // 생성된 대화 ID 설정
    } catch (error) {
      // console.error("Failed to create project on server:", error);
    }
    setSelectedPersonaList(personaList.selected);
    navigate(`/Persona/4`, { replace: true });
  };

  return (
    <>
      <PopupBox isActive={active}>
        <ToastPopup isActive={active}>
          <Header>
            <Title>
              {projectTotalInfo.projectTitle}의 {selectedInterviewPurpose}
              <ColseButton onClick={handleClose} />
            </Title>
            <ul>
              <li>
                <span>
                  <img src={images.PeopleFill} alt="참여 페르소나" />
                  참여 페르소나
                </span>
                <span>
                  {personaList.selected.length || selectedPersonaList.length}명
                </span>
              </li>
            </ul>
          </Header>

          <Contents>
            {isLoadingPrepare &&
              (showRegenerateButton1 ? (
                <LoadingBox>
                  <MoleculeRecreate
                    Medium
                    onRegenerate={loadInterviewQuestion}
                  />
                </LoadingBox>
              ) : (
                <LoadingBox>
                  <Loading>
                    <div />
                    <div />
                    <div />
                  </Loading>
                  <p>
                    페르소나가 인터뷰 룸으로 입장 중이에요
                    <span>잠시만 기다려주세요 ...</span>
                  </p>
                </LoadingBox>
              ))}

            {(!isLoadingPrepare && isComplete) ??
              renderInterviewItemsComplete()}
          </Contents>
        </ToastPopup>
      </PopupBox>

      {showWarning && (
        <PopupWrap
          Warning
          title="인터뷰를 종료하시겠습니까?"
          message="모든 내역이 사라집니다. 그래도 중단 하시겠습니까?"
          buttonType="Outline"
          closeText="중단하기"
          confirmText="계속진행하기"
          isModal={false}
          onCancel={handleWarningClose}
          onConfirm={handleWarningContinue}
        />
      )}
      {showErrorPopup && (
        <PopupWrap
          Warning
          title="작업이 중단되었습니다"
          message="데이터 오류로 인해 페이지가 초기화됩니다."
          message2="작업 중인 내용은 작업관리 페이지를 확인하세요."
          buttonType="Outline"
          closeText="확인"
          onConfirm={() => {
            setShowErrorPopup(false);
            window.location.href = "/";
          }}
          onCancel={() => {
            setShowErrorPopup(false);
            window.location.href = "/";
          }}
        />
      )}
    </>
  );
};

export default OrganismToastPopupQuickSurveyComplete;

const PopupBox = styled.div`
  position: fixed;
  top: 0;
  right: 100%;
  transform: ${({ isActive }) =>
    isActive ? "translateX(100%)" : "translateX(0)"};
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  z-index: 101;
  visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
`;

const ToastPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: ${({ isActive }) =>
    isActive ? "translateX(0)" : "translateX(100%)"};
  width: 100%;
  max-width: 800px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 32px;
  border-radius: 15px 0 0 15px;
  background: ${palette.white};
  transition: transform 0.3s ease;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  ul {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 0.88rem;
    color: ${palette.gray500};
    font-weight: 300;
    line-height: 1.5;
  }

  li {
    display: flex;
    align-items: center;
    gap: 16px;

    + li {
      margin-left: 20px;
      padding-left: 20px;
      border-left: 1px solid ${palette.lineGray};
    }

    span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 1.38rem;
  font-weight: 600;
  color: ${palette.gray800};
  line-height: 1.3;
  word-wrap: break-word;
`;

export const ColseButton = styled.button`
  position: relative;
  width: 15px;
  height: 15px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    border-radius: 10px;
    background-color: ${palette.black};
    content: "";
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding-right: 10px;
  overflow-y: auto;
`;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 40px 20px 24px;
  border-radius: 10px;
  background: ${palette.chatGray};

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};

    span {
      color: ${palette.white};
      padding: 8px 16px;
      border-radius: 10px;
      background: ${(props) =>
        props.Complete ? palette.primary : palette.gray300};
      cursor: pointer;
    }
  }
`;

const move = keyframes`
  0% {
    -webkit-transform:scale(0);
    transform:scale(0);
    opacity:0
  }
  5% {
    opacity:1
  }
  100% {
    -webkit-transform:scale(6);
    transform:scale(6);
    opacity:0
  }
`;

const moveCircle = keyframes`
  0% {
    -webkit-transform:scale(1);
    transform:scale(1);
  }
  50% {
    -webkit-transform:scale(1.2);
    transform:scale(1.2);
  }
  100% {
    -webkit-transform:scale(1);
    transform:scale(1);
  }
`;

const Loading = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    position: absolute;
    top: 42%;
    left: 42%;
    transform: translate(-50%, -50%);
    width: 13px;
    height: 13px;
    border-radius: 50%;

    &:nth-child(1) {
      border: 1px solid ${palette.primary};
      background: rgba(34, 111, 255, 1);
      animation: ${move} 2s 0s linear infinite;
      animation-delay: -3s;
      opacity: 0.7;
    }
    &:nth-child(2) {
      border: 1px solid ${palette.primary};
      background: rgba(34, 111, 255, 1);
      animation: ${move} 2s 0s linear infinite;
      opacity: 0.5;
    }
    &:nth-child(3) {
      background: ${palette.primary};
      animation: ${moveCircle} 2s 0s linear infinite;
    }
  }
`;

const InterviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  // cursor: ${(props) => (props.status === "Pre" ? "default" : "pointer")};
`;

const ErrorInterviewItem = styled(InterviewItem)`
  gap: 12px;
  padding: 73px 0;
  border: 0;
  background: ${palette.chatGray};

  p {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};
  }
`;

const QuestionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  cursor: inherit;
  position: relative;
  padding-right: 56px;
  cursor: ${(props) => (props.status === "Complete" ? "pointer" : "default")};

  ${(props) =>
    props.status === "Complete" &&
    css`
      &:after {
        content: "";
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 8px;
        height: 8px;
        border-right: 2px solid ${palette.gray500};
        border-bottom: 2px solid ${palette.gray500};
        transition: transform 0.3s ease;
      }
    `}

  ${(props) =>
    props.status === "Complete" &&
    props.isOpen &&
    css`
      &:after {
        transform: translateY(-50%) rotate(225deg);
      }
    `}
`;

const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${(props) =>
    props.status === "Ing"
      ? palette.primary
      : props.status === "Complete"
      ? palette.green
      : palette.gray300};
  border-radius: 2px;
  border: 1px solid
    ${(props) =>
      props.status === "Ing"
        ? palette.primary
        : props.status === "Complete"
        ? palette.green
        : palette.gray300};
  background: ${palette.chatGray};
`;

const QuestionText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
`;

const Status = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  gap: 8px;
  max-width: 55px;
  width: 100%;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${(props) =>
    props.status === "Ing"
      ? palette.primary
      : props.status === "Complete"
      ? palette.green
      : palette.gray700};
  // margin-left: auto;
  padding: 2px 8px;
  border-radius: 2px;
  border: ${(props) =>
    props.status === "Ing"
      ? `1px solid ${palette.primary}`
      : props.status === "Complete"
      ? `1px solid ${palette.green}`
      : `1px solid ${palette.outlineGray}`};
  background: ${(props) =>
    props.status === "Ing"
      ? `rgba(34, 111, 255, 0.04)`
      : props.status === "Complete"
      ? palette.white
      : palette.chatGray};

  ${(props) =>
    props.status === "Complete" &&
    css`
      &:before {
        content: "";
        width: 8px;
        height: 8px;
        background: url(${images.CheckGreen}) center no-repeat;
        background-size: contain;
      }
    `}
`;

const AnswerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
  padding-top: 32px;
  border-top: 1px solid ${palette.outlineGray};
`;

const AnswerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: 100%;
`;

const ErrorAnswerItem = styled(AnswerItem)`
  align-items: flex-start;
  margin-top: 24px;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid ${palette.error};
  background: rgba(255, 59, 48, 0.06);

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.error};

    &:before {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: url(${images.ExclamationCircleFill}) center no-repeat;
      background-size: 100%;
      content: "";
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-left: 28px;
  }

  p {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
  }

  button {
    font-size: 0.875rem;
    color: ${palette.gray800};
    border-radius: 8px;
    border: 1px solid ${palette.gray500};
  }
`;

const TypeName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${palette.gray800};

  p {
    display: flex;
    align-items: center;
    gap: 6px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 0.75rem;
      font-weight: 300;
      line-height: 1.3;
      color: ${palette.gray500};

      + span:before {
        display: inline-block;
        width: 1px;
        height: 9px;
        background: ${palette.gray500};
        content: "";
      }
    }
  }
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: ${palette.gray200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextContainer = styled.div`
  align-self: flex-start;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.gray800};
  margin-left: 44px;
  padding: 12px;
  border-radius: 0 15px 15px 15px;
  background: rgba(34, 111, 255, 0.06);
`;

const flash = keyframes`
  0% {
    background-color: ${palette.gray300};
    box-shadow: 12px 0 ${palette.gray300}, -12px 0 ${palette.gray500};
  }
  50% {
    background-color: ${palette.gray500};
    box-shadow: 12px 0 ${palette.gray500}, -12px 0 ${palette.gray300};
  }
  100% {
    background-color: ${palette.gray300};
    box-shadow: 12px 0 ${palette.gray500}, -12px 0 ${palette.gray300};
  }
`;

const Entering = styled.div`
  width: 6px;
  height: 6px;
  margin: 0 12px;
  border-radius: 50%;
  background: ${palette.gray500};
  box-shadow: 12px 0 ${palette.gray500}, -12px 0 ${palette.gray500};
  position: relative;
  animation: ${flash} 0.5s ease-out infinite alternate;
`;
