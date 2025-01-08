import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import PopupWrap from "../../../../assets/styles/Popup";
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
  PROJECT_ID,
  PROJECT_REPORT_ID,
  INTERVIEW_DATA,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL,
  IS_PERSONA_ACCESSIBLE,
} from "../../../AtomStates";

const OrganismOneInterview = ({ isActive, onClose, testData }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [interviewStatus, setInterviewStatus] = useState([]);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  
  const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [selectedInterviewPurpose] = useAtom(SELECTED_INTERVIEW_PURPOSE);
  const [personaList] = useAtom(PERSONA_LIST);
  const [projectId] = useAtom(PROJECT_ID);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);

  // 테스트 데이터 사용
  const currentBusinessAnalysis = testData?.businessAnalysis || businessAnalysis;
  const currentInterviewPurpose = testData?.selectedInterviewPurpose || selectedInterviewPurpose;
  const currentPersonaList = testData?.personaList || personaList;

  useEffect(() => {
    loadInitialQuestions();
  }, []);

  const loadInitialQuestions = async () => {
    try {
      const response = await axios.post(
        "https://wishresearch.kr/person/persona_interview",
        {
          business_idea: currentBusinessAnalysis.input,
          theory_name: currentInterviewPurpose,
        }
      );
      
      setInterviewQuestions(response.data);
      setInterviewStatus(new Array(response.data.length).fill("pending"));
    } catch (error) {
      console.error("Failed to load questions:", error);
    }
  };

  const generateAnswer = async (questionIndex) => {
    setIsGenerating(true);
    try {
      const response = await axios.post(
        "https://wishresearch.kr/person/persona_interview_module",
        {
          business_analysis_data: currentBusinessAnalysis,
          question: interviewQuestions[questionIndex],
          persona_info: currentPersonaList.selected[0],
        }
      );

      setAnswers(prev => ({
        ...prev,
        [questionIndex]: response.data.answer
      }));

      setInterviewStatus(prev => {
        const newStatus = [...prev];
        newStatus[questionIndex] = "completed";
        return newStatus;
      });

      setInterviewData(prev => ({
        ...prev,
        [questionIndex]: {
          question: interviewQuestions[questionIndex],
          answer: response.data.answer
        }
      }));

    } catch (error) {
      console.error("Failed to generate answer:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuestionClick = (index) => {
    if (interviewStatus[index] === "pending") {
      setCurrentQuestionIndex(index);
      generateAnswer(index);
    }
  };

  return (
    <PopupBox isActive={isActive}>
      <ToastPopup isActive={isActive}>
        <QuestionSidebar>
          <QuestionList>
            {interviewQuestions.map((question, index) => (
              <QuestionItem
                key={index}
                isActive={currentQuestionIndex === index}
                onClick={() => handleQuestionClick(index)}
              >
                <div className="question-number">Q{index + 1}</div>
                <div className="question-text">{question}</div>
              </QuestionItem>
            ))}
          </QuestionList>
        </QuestionSidebar>

        <Header>
          <Title>
            {currentBusinessAnalysis.title}의 {currentInterviewPurpose}
            <CloseButton onClick={onClose} />
          </Title>
        </Header>

        <ChatContainer>
          {interviewQuestions.map((question, index) => (
            interviewStatus[index] !== "pending" && (
              <MessageGroup key={index}>
                <ChatMessage isUser>
                  <MessageContent isUser>
                    {question}
                  </MessageContent>
                </ChatMessage>

                <ChatMessage>
                  <Avatar>
                    <img 
                      src={`/ai_person/${currentPersonaList.selected[0].personaImg}.jpg`}
                      alt="AI Avatar"
                    />
                  </Avatar>
                  <MessageContent>
                    {isGenerating && currentQuestionIndex === index ? (
                      <LoadingDots>
                        <span></span>
                        <span></span>
                        <span></span>
                      </LoadingDots>
                    ) : (
                      answers[index]
                    )}
                  </MessageContent>
                </ChatMessage>
              </MessageGroup>
            )
          ))}
        </ChatContainer>
      </ToastPopup>
    </PopupBox>
  );
};

// Styled Components
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PopupBox = styled(PopupWrap)`
  z-index: 999;
`;

const ToastPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: ${({ isActive }) =>
    isActive ? "translateX(0)" : "translateX(100%)"};
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  display: grid;
  grid-template-columns: 300px 1fr;
  background: ${palette.white};
  transition: transform 0.3s ease;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 300px;
  right: 0;
  padding: 20px;
  background: ${palette.white};
  border-bottom: 1px solid ${palette.outlineGray};
  z-index: 1;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  
  &:before {
    content: "×";
    font-size: 24px;
    color: ${palette.gray};
  }
`;

const QuestionSidebar = styled.div`
  padding: 20px;
  border-right: 1px solid ${palette.outlineGray};
  overflow-y: auto;
  background: ${palette.lightGray};
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const QuestionItem = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: ${props => props.isActive ? palette.white : 'transparent'};
  box-shadow: ${props => props.isActive ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${palette.white};
  }

  .question-number {
    color: ${palette.primary};
    font-weight: 600;
    margin-bottom: 8px;
  }

  .question-text {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const ChatContainer = styled.div`
  padding: 90px 20px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MessageGroup = styled.div`
  animation: ${fadeIn} 0.3s ease;
`;

const ChatMessage = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => props.isUser ? '12px' : '24px'};
  
  ${props => props.isUser && `
    justify-content: flex-end;
  `}
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MessageContent = styled.div`
  max-width: 60%;
  padding: 16px;
  border-radius: ${props => props.isUser ? '16px 16px 0 16px' : '16px 16px 16px 0'};
  background: ${props => props.isUser ? palette.primary + '15' : palette.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  
  span {
    width: 8px;
    height: 8px;
    background: ${palette.gray};
    border-radius: 50%;
    animation: bounce 1s infinite;
    
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
`;

export default OrganismOneInterview; 