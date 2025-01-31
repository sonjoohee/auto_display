import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import personaImages from "../../../../assets/styles/PersonaImages";
import PopupWrap from "../../../../assets/styles/Popup";
import { CustomInput } from "../../../../assets/styles/InputStyle";
import {
  Body1,
  H3,
  H4,
  Helptext,
  Sub1,
  Sub2,
  Sub3,
  Body2,
  Body3,
} from "../../../../assets/styles/Typography";
import { Persona } from "../../../../assets/styles/BusinessAnalysisStyle";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import axios from "axios";
import {
  IS_LOGGED_IN,
  PERSONA_LIST,
  PERSONA_BUTTON_STATE_3,
  BUSINESS_ANALYSIS,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  INTERVIEW_DATA,
  SELECTED_PERSONA_LIST,
  SELECTED_INTERVIEW_PURPOSE_DATA,
  PURPOSE_ITEMS_SINGLE,
} from "../../../AtomStates";
import { InterviewXPersonaSingleInterviewRequestAddQuestion } from "../../../../utils/indexedDB";

const OrganismToastPopupSingleChat = ({ isActive, onClose, isComplete, }) => {
  console.log("=================================isComplete", isComplete);
  const [selectedPersonaList, setSelectedPersonaList] = useAtom(
    SELECTED_PERSONA_LIST
  );

  const [purposeItemsSingleAtom, setPurposeItemsSingleAtom] =
    useAtom(PURPOSE_ITEMS_SINGLE);

  const [reportId, setReportId] = useAtom(PROJECT_REPORT_ID);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);

  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [selectedInterviewPurposeData, setSelectedInterviewPurposeData] =
    useAtom(SELECTED_INTERVIEW_PURPOSE_DATA);
  const navigate = useNavigate();

  const [active, setActive] = useState(isActive);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoadingPrepare, setIsLoadingPrepare] = useState(true);
  const [interviewQuestionListState, setInterviewQuestionListState] = useState(
    []
  );
  const [interviewStatus, setInterviewStatus] = useState([]);
  const [answers, setAnswers] = useState({});
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const [showAddQuestion, setShowAddQuestion] = useState(false);

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      // 인터뷰 스크립트 보기, 인터뷰 상세보기로 진입 시 isComplete는 True
      if (isComplete) {
        console.log("인터뷰 불러오기 1");
        const questions = interviewData.map((item) => {
          // 모든 question 키를 찾아서 값이 있는 첫 번째 question을 반환
          const questionKeys = Object.keys(item).filter((key) =>
            key.startsWith("question")
          );
          const question = questionKeys.map((key) => item[key]).find((q) => q);
          return { question };
        });
        console.log("Loaded questions:", questions); // 여기 콘솔로

        console.log("questions:", questions);

        setInterviewQuestionListState(questions);
        console.log("Updated interviewQuestionListState:", questions); // Log the updated state
        // 모든 질문을 Complete 상태로 설정
        const completedStatus = new Array(interviewData.length).fill(
          "Complete"
        );
        setInterviewStatus(completedStatus);

        const newAnswers = {};
        console.log("인터뷰 불러오기 2", interviewData);

        questions.forEach((_, index) => {
          const answers = interviewData[index].answer;
          newAnswers[index] = (
            selectedPersonaList.length
              ? selectedPersonaList
              : personaList.selected
          ).map((persona, pIndex) => {
            // Ensure that answers[pIndex] exists
            const answer =
              answers && answers[pIndex] !== undefined ? answers[pIndex] : null;
            return {
              persona: persona,
              answer: answer,
            };
          });
        });
        console.log("페르소나", personaList);
        setAnswers(newAnswers);
        console.log("🚀 ~ interviewLoading ~ newAnswers:", newAnswers);

        // 모든 답변을 보이도록 설정
        const allVisible = {};
        questions.forEach((_, index) => {
          allVisible[index] = true;
        });
        setVisibleAnswers(allVisible);
        setIsLoadingPrepare(false);

        console.log("🚀 ~ questions.forEach ~ questions:", questions);
        return; // isComplete가 True일 때 API 호출 없이 종료
      }
    };
    interviewLoading();
  }, [personaButtonState3, isComplete]);

  // !인터뷰 진행
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

  // 이미 완료된 인터뷰를 확인할 때 사용
  const renderInterviewItemsComplete = () => {
    console.log("인터뷰 완료 렌더링");

    return interviewData.map((item, index) => {
      console.log("현재 처리중인 item:", item);

      const status = interviewStatus[index];

      if (status === "Complete" && item.question && item.answer) {
        return (
          <React.Fragment key={index}>
            <ChatItem Moder>
              <Persona Moder color="Gainsboro" size="Medium" Round>
                <img src={personaImages.PersonaModer} alt="모더" />
                <span>
                  <img src={images.PatchCheckFill} alt="" />
                  <Helptext color="primary">모더</Helptext>
                </span>
              </Persona>
              <ChatBox Moder>
                <Sub1 color="gray800" align="left">
                  Q{index + 1}.{" "}
                  {typeof item.question === "string" ? item.question : ""}
                </Sub1>
              </ChatBox>
            </ChatItem>

            <ChatItem Persona>
              <Persona Persona color="Linen" size="Medium" Round>
                <img
                  src={`/ai_person/${selectedPersonaList[0].personaImg}.png`}
                  alt="페르소나"
                />
              </Persona>
              <ChatBox Persona>
                <Sub1 color="gray800" align="left">
                  {typeof item.answer === "string" ? item.answer : ""}
                </Sub1>
              </ChatBox>
            </ChatItem>
          </React.Fragment>
        );
      }
      return null;
    });
  };

  return (
    <>
      <PopupBox isActive={active}>
        <ToastPopup Wide isActive={active}>
          <QuestionListWrap>
            {/* {businessAnalysis.title}의 {selectedInterviewPurpose} */}
            <H4 color="gray700" align="left">
              문항 리스트
            </H4>

            <QuestionList>
              {interviewData.length > 0 ? (
                interviewData.map((item, index) => {
                  const status = interviewStatus[index];
                  return (
                    <QuestionItem key={index} checked={status === "Complete" ? true : item.checked}>
                      <Sub2 color="gray800">
                        Q{index + 1}. {item.question}
                      </Sub2>
                      <span>
                        <img src={images.CheckGreen} alt="완료" />
                      </span>
                    </QuestionItem>
                  );
                })
              ) : (
                <Sub2 color="gray800">질문이 없습니다.</Sub2> // 질문이 없을 때 메시지 표시
              )}
            </QuestionList>
          </QuestionListWrap>

          <ChatWrap>
            <Header>
              <Title>
                {businessAnalysis.title}의 {selectedInterviewPurposeData.title}
                <ColseButton onClick={handleClose} />
              </Title>
              <ul>
                {selectedPersonaList.map((persona) => {
                  return (
                    <li key={persona.persona_id}>
                      <Thumb>
                        <img
                          src={`/ai_person/${persona.personaImg}.png`}
                          alt={persona.persona}
                        />
                      </Thumb>
                      <span>{persona.persona}</span>
                      <span>
                        {persona.gender} | {persona.age}세 | {persona.job}{" "}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Header>

            <Contents showAddQuestion={showAddQuestion}>
              {!isLoadingPrepare && isComplete
                ? renderInterviewItemsComplete()
                : renderInterviewItemsComplete()}
            </Contents>
          </ChatWrap>
        </ToastPopup>
      </PopupBox>
    </>
  );
};

export default OrganismToastPopupSingleChat;

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
  max-width: ${({ Wide }) => (Wide ? "1175px" : "800px")};
  height: 100vh;
  display: flex;
  flex-direction: ${({ Wide }) => (Wide ? "row" : "column")};
  align-items: ${({ Wide }) => (Wide ? "flex-start" : "center")};
  justify-content: flex-start;
  gap: ${({ Wide }) => (Wide ? "0" : "40px")};
  padding: ${({ Wide }) => (Wide ? "0 0 0 32px" : "32px")};
  border-radius: 15px 0 0 15px;
  background: ${palette.white};
  transition: transform 0.3s ease;
`;

const QuestionListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;
  max-width: 340px;
  width: 100%;
  height: 100%;
  padding: 32px 20px 32px 0;
  border-right: 1px solid ${palette.outlineGray};
`;

const QuestionList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  overflow-y: auto;
`;

const QuestionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 17px 12px;
  border-radius: 8px;
  border: ${({ checked }) =>
    checked ? `1px solid ${palette.outlineGray}` : "none"};
  background: ${({ checked }) =>
    checked ? palette.white : `rgba(34, 111, 255, 0.10)`};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  filter: ${({ disabled }) =>
    disabled ? "grayscale(1) opacity(0.3)" : "grayscale(0) opacity(1)"};

  > div {
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  span {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
  }

  img {
    width: 12px;
    opacity: 0;
  }

  ${({ checked }) =>
    checked &&
    `
    img {
      opacity: 1;
    }
  `}
`;

const ChatWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ChatListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
`;

const ChatItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.Persona
      ? "row"
      : props.Moder
      ? "row-reverse"
      : props.Add
      ? "column"
      : "none"};
  align-items: ${({ Add }) => (Add ? "flex-end" : "flex-start")};
  justify-content: flex-start;
  gap: ${({ Add }) => (Add ? "8px" : "12px")};
  width: 100%;
`;

const ChatBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  max-width: 624px;
  padding: ${(props) =>
    props.Persona ? "12px" : props.Moder ? "14px 20px" : "0"};
  border-radius: ${(props) =>
    props.Persona
      ? "0 15px 15px 15px"
      : props.Moder
      ? "15px 0 15px 15px"
      : "0"};
  background: ${(props) =>
    props.Persona
      ? `rgba(34, 111, 255, 0.06)`
      : props.Moder
      ? palette.white
      : "none"};

  &:before {
    content: attr(data-time);
    position: absolute;
    right: 102%;
    bottom: 0;
    font-size: 0.75rem;
    color: ${palette.gray500};
    white-space: nowrap;
  }

  span {
    font-size: 0.88rem;
    font-weight: 400;
    color: ${palette.gray500};
  }
`;

const ChatAddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;

  label {
    span {
      font-family: "Pretendard", "Poppins";
      font-size: 0.88rem;
      color: ${palette.gray700};
      font-weight: 400;
      line-height: 1.55;
      letter-spacing: -0.42px;
      padding: 5px 12px;
      border-radius: 40px;
      border: 1px solid ${palette.gray700};
      outline: none;
      background: transparent;
      transition: all 0.5s;
      cursor: pointer;

      &:hover {
        color: ${palette.white};
        border: 1px solid ${palette.gray800};
        background: ${palette.gray800};
      }
    }

    input[type="radio"] {
      display: none;

      &:checked {
        + span {
          color: ${palette.white};
          border: 1px solid ${palette.gray800};
          background: ${palette.gray800};
        }
      }
    }

    &[disabled] {
      cursor: not-allowed;

      span {
        opacity: 0.5;
        cursor: not-allowed;

        &:hover {
          color: ${palette.gray700};
          border: 1px solid ${palette.gray700};
          background: transparent;
        }
      }

      input[type="radio"]:checked + span {
        color: ${palette.white};
        border: 1px solid ${palette.gray800};
        background: ${palette.gray800};
        opacity: 0.5;

        &:hover {
          color: ${palette.white};
          border: 1px solid ${palette.gray800};
          background: ${palette.gray800};
        }
      }
    }
  }

  button {
    flex-shrink: 0;
    font-family: "Pretendard", "Poppins";
    font-size: 0.88rem;
    color: ${palette.gray700};
    font-weight: 400;
    line-height: 1.55;
    letter-spacing: -0.42px;
    padding: 4px 12px;
    border-radius: 40px;
    border: 1px solid ${palette.gray700};
    outline: none;
    background: transparent;
    transition: all 0.5s;

    &:hover:not(:disabled) {
      color: ${palette.primary};
      border-color: ${palette.primary};
      background: rgba(34, 111, 255, 0.04);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover {
      color: ${palette.white};
      background: ${palette.gray800};
    }

    &[type="button"]:active {
      color: ${palette.primary};
      border-color: ${palette.primary};
      background: rgba(34, 111, 255, 0.04);
    }
  }
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 32px;
  border-bottom: 1px solid ${palette.outlineGray};

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

const ChatFooter = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 12px 14px 12px 20px;
  border-top: 1px solid ${palette.outlineGray};
  background: ${palette.white};
  z-index: 1;

  input {
    width: 100%;
    font-size: 1rem;
    line-height: 1.55;

    &::placeholder {
      color: ${palette.gray300};
    }

    &:disabled {
      background: ${palette.white};
    }
  }
  button {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    font-size: 0;
    border: 0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cg clip-path='url(%23clip0_690_5724)'%3E%3Cpath d='M5.64515 11.6483L25.4734 5.18259C26.7812 4.75614 28.0145 6.00577 27.571 7.30785L20.9018 26.8849C20.4086 28.3327 18.39 28.41 17.7875 27.0042L15.036 20.5839C14.7672 19.9567 14.9072 19.229 15.3896 18.7463L20.4659 13.6676C20.8353 13.298 20.8353 12.6989 20.4657 12.3294C20.083 11.9466 19.4625 11.9466 19.0797 12.3294L14.036 17.373C13.5486 17.8605 12.8116 17.9982 12.1811 17.7195L5.488 14.7621C4.08754 14.1433 4.1895 12.123 5.64515 11.6483Z' fill='%23226FFF'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_690_5724'%3E%3Crect width='32' height='32' fill='white' transform='translate(0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")
      center no-repeat;
    background-size: 100%;
    filter: grayscale(1) opacity(0.3);
    transition: all 0.5s;
    cursor: pointer;

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;

      &:hover {
        opacity: 0.3;
      }
    }

    &:not(:disabled):hover {
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none'%3E%3Cg clip-path='url(%23clip0_690_5724)'%3E%3Cpath d='M5.64515 11.6483L25.4734 5.18259C26.7812 4.75614 28.0145 6.00577 27.571 7.30785L20.9018 26.8849C20.4086 28.3327 18.39 28.41 17.7875 27.0042L15.036 20.5839C14.7672 19.9567 14.9072 19.229 15.3896 18.7463L20.4659 13.6676C20.8353 13.298 20.8353 12.6989 20.4657 12.3294C20.083 11.9466 19.4625 11.9466 19.0797 12.3294L14.036 17.373C13.5486 17.8605 12.8116 17.9982 12.1811 17.7195L5.488 14.7621C4.08754 14.1433 4.1895 12.123 5.64515 11.6483Z' fill='%23226FFF'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_690_5724'%3E%3Crect width='32' height='32' fill='white' transform='translate(0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")
        center no-repeat;
      filter: grayscale(0) opacity(1);
    }
  }
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 12px 14px 12px 20px;
  border-radius: 50px;

  border: ${(props) =>
    props.isInputEnabled
      ? `1px solid ${palette.primary}`
      : `1px solid ${palette.outlineGray}`};
  background: ${palette.white};
  transition: all 0.3s ease;

  &:has(input:hover),
  &:has(input:focus) {
    border-color: ${palette.primary};

    button {
      filter: grayscale(0) opacity(1);
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
  height: ${({ showAddQuestion }) =>
    showAddQuestion ? "calc(100% - 58px)" : "100%"};
  padding: 40px 32px;
  overflow-y: auto;
  background: ${palette.chatGray};
  transition: all 0.3s ease-in-out;
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

const AddQuestion = styled.div`
  position: sticky;
  bottom: ${({ show }) => (show ? "58px" : "-100%")};
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  height: ${({ show }) => (show ? "auto" : "0")};
  padding: ${({ show }) => (show ? "20px 20px 12px 20px" : "0")};
  border-top: ${({ show }) =>
    show ? `1px solid ${palette.outlineGray}` : "none"};
  background: ${palette.white};
  transform: translateY(${({ show }) => (show ? "0" : "100%")});
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
  z-index: 1;
  /* overflow: hidden; */

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};
    transition: all 0.5s;
    cursor: pointer;

    div ${Body2} {
      &:before {
        content: "Select";
      }
    }

    &:hover {
      border-color: ${palette.primary};
      background: ${palette.white};

      div ${Body2} {
        &:before {
          content: "Done";
        }
      }
    }

    &.selected {
      opacity: 0.3;
      background: ${palette.white};

      div ${Body2} {
        &:before {
          content: "Done";
        }
      }

      &:hover {
        opacity: 1;
      }
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        border-color: ${palette.outlineGray};
        background: ${palette.chatGray};
      }
    }
  }
`;

const AddQuestionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
