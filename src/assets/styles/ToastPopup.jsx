import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { palette } from "./Palette";
import images from "./Images";
import PopupWrap from "./Popup";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import axios from "axios";
import {
  IS_LOGGED_IN,
  PERSONA_STEP,
  SELECTED_INTERVIEW_PURPOSE,
  PERSONA_LIST,
  INTERVIEW_QUESTION_LIST,
  PERSONA_BUTTON_STATE_3,
  BUSINESS_ANALYSIS,
  PROJECT_ID
} from "../../pages/AtomStates";
import { updateProjectOnServer } from "../../utils/indexedDB";

const ToastPopupWrap = ({ isActive, onClose }) => {
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [personaButtonState3, setPersonaButtonState3] = useAtom(PERSONA_BUTTON_STATE_3);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
  );
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  
  const navigate = useNavigate();

  const [active, setActive] = useState(isActive);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoadingPrepare, setIsLoadingPrepare] = useState(true);
  const [interviewQuestionListState, setInterviewQuestionListState] = useState([]);
  const [interviewStatus, setInterviewStatus] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const axiosConfig = {
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    const interviewLoading = async () => {
      try {
        if (personaButtonState3 === 1) {
          const existingQuestions = interviewQuestionList.find(
            (item) => item.theory_name === selectedInterviewPurpose
          );
      
          if (existingQuestions) {
            setInterviewQuestionListState(existingQuestions.questions.slice(2));
            await new Promise(resolve => setTimeout(resolve, 5000));
          } else {
            let data = {
              business_idea: businessAnalysis.input,
              business_analysis_data: {
                title: businessAnalysis.title,
                characteristics: businessAnalysis.characteristics,
                features: businessAnalysis.features,
              },
              theory_name: selectedInterviewPurpose,
            };

            let response = await axios.post(
              "https://wishresearch.kr/person/persona_interview",
              data,
              axiosConfig
            );
      
            let questionList = response.data;
            let retryCount = 0;
            const maxRetries = 10;
      
            while (
              retryCount < maxRetries &&
              (!response || !response.data || response.data.length !== 5)
            ) {
              response = await axios.post(
                "https://wishresearch.kr/person/persona_interview",
                data,
                axiosConfig
              );
              retryCount++;
              questionList = response.data;
            }

            if (retryCount === maxRetries) {
              throw new Error("Maximum retry attempts reached.");
            }

            const newQuestionList = [
              ...interviewQuestionList,
              {
                theory_name: selectedInterviewPurpose,
                questions: questionList,
              },
            ];
      
            setInterviewQuestionList(newQuestionList);
            setInterviewQuestionListState(questionList.slice(2));
      
            await updateProjectOnServer(
              projectId,
              {
                interviewQuestionList: newQuestionList,
              },
              isLoggedIn
            );
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setPersonaButtonState3(0);
        setIsLoadingPrepare(false);
        const initialStatus = new Array(interviewQuestionListState.length).fill('Pre');
        setInterviewStatus(initialStatus);
      }
    }
    interviewLoading();
  }, [personaButtonState3]);

  useEffect(() => {
    const processInterview = async () => {
      if (!isLoadingPrepare && interviewStatus[currentQuestionIndex] === 'Pre') {
        const newStatus = [...interviewStatus];
        newStatus[currentQuestionIndex] = 'Ing';
        setInterviewStatus(newStatus);

        setAnswers(prev => ({
          ...prev,
          [currentQuestionIndex]: []
        }));

        try {
          for (let i = 0; i < personaList.selected.length; i++) {
            setIsGenerating(true);
            
            const data = {
              business_analysis_data: businessAnalysis,
              question: interviewQuestionListState[currentQuestionIndex],
              persona_info: {
                "id": personaList.selected[i].personIndex.replace(/[^1-9]/g, ''),
                "name": personaList.selected[i].persona,
                "keyword": personaList.selected[i].keyword,
                "hashtag": personaList.selected[i].tag,
                "summary": personaList.selected[i].summary
              },
              last_interview: []
            };

            const response = await axios.post(
              "https://wishresearch.kr/person/persona_interview_module",
              data,
              axiosConfig
            );

            setIsGenerating(false);

            setAnswers(prev => ({
              ...prev,
              [currentQuestionIndex]: [
                ...prev[currentQuestionIndex],
                {
                  persona: personaList.selected[i],
                  answer: response.data.answer
                }
              ]
            }));

            if (i === personaList.selected.length - 1) {
              newStatus[currentQuestionIndex] = 'Complete';
              setInterviewStatus(newStatus);
              
              if (currentQuestionIndex < interviewQuestionListState.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
              }
            }
          }
        } catch (error) {
          console.error('Interview process error:', error);
          setIsGenerating(false);
        }
      }
    };

    processInterview();
  }, [isLoadingPrepare, currentQuestionIndex, interviewStatus]);

  const renderAnswers = (questionIndex) => {
    const questionAnswers = answers[questionIndex] || [];
    
    return (
      <>
        {questionAnswers.map((answer, index) => (
          <AnswerItem key={index}>
            <TypeName>
              <Thumb />
              {answer.persona.persona}
            </TypeName>
            <TextContainer>
              {answer.answer}
            </TextContainer>
          </AnswerItem>
        ))}
        {isGenerating && interviewStatus[questionIndex] === 'Ing' && (
          <AnswerItem>
            <TypeName>
              <Thumb />
              {personaList.selected[questionAnswers.length].persona}
            </TypeName>
            <TextContainer>
              <Entering />
            </TextContainer>
          </AnswerItem>
        )}
      </>
    );
  };

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const handleClose = () => {
    setShowWarning(true);
  };

  const handleWarningClose = () => {
    setIsLoadingPrepare(true);
    setShowWarning(false);
    setActive(false);
    if (onClose) {
      onClose();
    }
  };

  const handleWarningContinue = () => {
    setShowWarning(false);
  };

  useEffect(() => {
    setVisibleAnswers(prev => {
      const newVisibleAnswers = { ...prev };
      interviewStatus.forEach((status, index) => {
        // 진행중인 질문은 자동으로 열기
        if (status === 'Ing') {
          newVisibleAnswers[index] = true;
        }
        // 완료된 질문은 자동으로 닫기
        else if (status === 'Complete') {
          newVisibleAnswers[index] = false;
        }
      });
      return newVisibleAnswers;
    });
  }, [interviewStatus]);

  const handleAnswerToggle = (index) => {
    // 'Pre' 상태일 때는 토글 불가능
    if (interviewStatus[index] === 'Pre') return;
    
    setVisibleAnswers(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const renderInterviewItems = () => {
    return interviewQuestionListState.map((item, index) => (
      <InterviewItem 
        key={index} 
        status={interviewStatus[index] || 'Pre'}
        // 'Pre' 상태일 때는 커서 스타일 변경
        style={{ cursor: interviewStatus[index] === 'Pre' ? 'default' : 'pointer' }}
      >
        <QuestionWrap onClick={() => handleAnswerToggle(index)}>
          <Number status={interviewStatus[index] || 'Pre'}>{index + 1}</Number>
          <QuestionText>{item.question}</QuestionText>
          <Status status={interviewStatus[index] || 'Pre'}>
            {interviewStatus[index] === 'Ing' ? '진행중' 
            : interviewStatus[index] === 'Complete' ? '완료' 
            : '준비중'}
          </Status>
        </QuestionWrap>
        {visibleAnswers[index] && (interviewStatus[index] === 'Ing' || interviewStatus[index] === 'Complete') && (
          <AnswerWrap>
            {renderAnswers(index)}
          </AnswerWrap>
        )}
      </InterviewItem>
    ));
  };

  return (
    <>
      <PopupBox isActive={active}>
        <ToastPopup isActive={active}>
          <Header>
            <Title>
              {businessAnalysis.title}
              <ColseButton onClick={handleClose} />
            </Title>
            <ul>
              <li>
                <span>
                  <img src={images.QuestionCount} alt="문항수" />문항수
                </span>
                <span>3개</span>
              </li>
              <li>
                <span>
                  <img src={images.PersonaCount} alt="참여페르소나" />참여페르소나
                </span>
                <span>{personaList.selected.length}명</span>
              </li>
            </ul>
          </Header>

          <Contents>
            {isLoadingPrepare &&
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
            }

            {!isLoadingPrepare && renderInterviewItems()}
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
    </>
  );
};

export default ToastPopupWrap;

const PopupBox = styled.div`
  position: fixed;
  top: 0;
  right: 100%;
  transform: ${({ isActive }) => isActive ? 'translateX(100%)' : 'translateX(0)'};
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  z-index: 101;
  visibility: ${({ isActive }) => isActive ? 'visible' : 'hidden'};
`;

const ToastPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: ${({ isActive }) => isActive ? 'translateX(0)' : 'translateX(100%)'};
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
    display:flex;
    align-items:center;
    width:100%;
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

  &:before, &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    border-radius: 10px;
    background-color: ${palette.black};
    content: '';
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
      background: ${props => props.Complete ? palette.primary : palette.gray300};
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
      opacity: .7;
    }
    &:nth-child(2) {
      border: 1px solid ${palette.primary};
      background: rgba(34, 111, 255, 1);
      animation: ${move} 2s 0s linear infinite;
      opacity: .5;
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
  cursor: ${props => props.status === 'Pre' ? 'default' : 'pointer'};
`;

const QuestionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  // cursor: ${props => (props.status === 'Ing' || props.status === 'Complete') ? 'pointer' : 'default'};
  cursor: inherit;
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
  color: ${props => 
    props.status === 'Ing' ? palette.primary 
    : props.status === 'Complete' ? palette.green 
    : palette.gray300};
  border-radius: 2px;
  border: 1px solid ${props => 
    props.status === 'Ing' ? palette.primary 
    : props.status === 'Complete' ? palette.green
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
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${props =>
    props.status === 'Ing' ? palette.primary
    : props.status === 'Complete' ? palette.green
    : palette.gray300
  };
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 2px;
  border: ${props =>
    props.status === 'Ing' ? `1px solid ${palette.primary}`
    : props.status === 'Complete' ? `1px solid ${palette.green}`
    : `1px solid ${palette.gray300}`
  };
  background: ${palette.white};
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

const TypeName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  font-size: 0.75rem;
  line-height: 1.5;
  color: ${palette.gray800};
`;

const Thumb = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${palette.gray200};
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
  margin:0 12px;
  border-radius: 50%;
  background: ${palette.gray500};
  box-shadow: 12px 0 ${palette.gray500}, -12px 0 ${palette.gray500};
  position: relative;
  animation: ${flash} 0.5s ease-out infinite alternate;
`;