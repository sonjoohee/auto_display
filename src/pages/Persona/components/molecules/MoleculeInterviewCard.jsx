import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { useAtom } from "jotai";
import {
  BUSINESS_ANALYSIS,
  SELECTED_INTERVIEW_PURPOSE,
  INTERVIEW_QUESTION_LIST,
  PROJECT_ID,
  IS_LOGGED_IN,
  IS_LOADING,
} from "../../../AtomStates";
import axios from "axios";
import { updateProjectReportOnServer } from "../../../../utils/indexedDB";

const MoleculeInterviewCard = ({
  title,
  description,
  isSelected,

  onSelect,
  interviewPurpose,
}) => {
  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [interviewQuestionListState, setInterviewQuestionListState] = useState(
    []
  );
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
  );

  const [state, setState] = useState({
    isExpanded: false,
    isChecked: false,
    showPopup: false,
    showRequestBadge: false,
    showCustomModal: false,
    customTextarea: '',
    isTextareaValid: false,
    isRadioSelected: false,
    showQuestions: false,
    showCustomPopup: false,
    isAccordionOpen: false,
    formState: {
      purpose: '',
      personaCount: '',
      gender: '',
      age: '',
      additionalInfo: ''
    }
  });

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const loadInterviewQuestion = async () => {
    const existingQuestions = interviewQuestionListState.find(
      (item) => item.theory_name === title
    );

    // 이미 존재하는 경우 함수 종료
    if (existingQuestions) {
      return;
    }
    try {
      setIsLoadingQuestion(true);
      let data = {
        business_idea: businessAnalysis.input,
        business_analysis_data: {
          title: businessAnalysis.title,
          characteristics: businessAnalysis.characteristics,
          features: businessAnalysis.features,
        },
        theory_name: title,
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
        throw new Error(
          "Maximum retry attempts reached. Empty response persists."
        );
      }
      setInterviewQuestionListState((prev) => [
        ...prev,
        {
          theory_name: title,
          questions: questionList,
        },
      ]);
      // 새로운 데이터를 포함한 전체 리스트를 생성
      const newQuestionList = [
        ...interviewQuestionList,
        {
          theory_name: title,
          questions: questionList,
        },
      ];

      // 상태 업데이트와 서버 업데이트를 순차적으로 실행
      setInterviewQuestionList(newQuestionList);

      // 서버 업데이트 시 새로운 리스트를 직접 전달
      await updateProjectReportOnServer(
        projectId,
        {
          interviewQuestionList: newQuestionList,
        },
        isLoggedIn
      );
    } catch (error) {
      console.error("Error in loadInterviewQuestion:", error);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  return (
    <CardContainer>
      <MainContent>
        <CheckCircle $isSelected={isSelected} onClick={() => onSelect(title)} />
        <ContentWrapper>
          <TitleSection>
            <Title>{title}</Title>
          </TitleSection>
          {description && <Description>{description}</Description>}
        </ContentWrapper>


        <ToggleButton 
          $isExpanded={isExpanded} 
          onClick={() => setIsExpanded(!isExpanded)} 

        />
      </MainContent>

      {isExpanded && (
        <DescriptionSection $isExpanded={isExpanded}>

          {!state.showQuestions ? (
            <span onClick={async () => {
              await loadInterviewQuestion();
              setState(prev => ({ ...prev, showQuestions: true }));
            }}>
              <img src="" alt="문항보기" />
              문항보기
            </span>
          ) : (
            <ListUL>
              <ul>
                {interviewQuestionListState
                  .find(item => item.theory_name === title)
                  ?.questions.slice(2, 5).map((item, index) => (

                    <li key={index}>
                      <span className="number">{index + 1}</span>
                      {item.question}
                    </li>
                  ))}
              </ul>

            </ListUL>
          )}

        </DescriptionSection>
      )}
    </CardContainer>
  );
};

export default MoleculeInterviewCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid ${props => props.isActive ? palette.chatBlue : palette.outlineGray};
  background: ${props => props.isActive ? 'rgba(34, 111, 255, 0.10)' : palette.white};
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  transition: all 0.2s ease-in-out;

  ${props => props.TitleFlex && css`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  `}
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;

  background-image: ${props => props.$isChecked 
    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
    : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11' stroke='%23E0E4EB' stroke-width='2'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='%23E0E4EB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
  };

  transition: background-image 0.3s ease-in-out;
  cursor: pointer;
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.div`
  font-weight: 600;
  color: ${palette.gray800};
  text-align: left;
  word-wrap: break-word;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  line-height: 1.2;

  color: ${props => {
    if (props.Basic) return `#34C759`;
    else if (props.Custom) return palette.gray500;

    else return palette.gray500;
  }};
  padding: 4px 8px;
  border-radius: 50px;

  border: 1px solid ${props => {
    if (props.Basic) return `#34C759`;
    else if (props.Custom) return palette.chatBlue;
    else return palette.outlineGray;
  }};
  background:${props => {
    if (props.Basic) return `rgba(52, 199, 89, 0.10)`;
    else if (props.Custom) return palette.chatBlue;

    else return palette.gray50;
  }};
  cursor: pointer;
`;

const ReadyIcon = styled.div`
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent #34c759;
  transform: rotate(0deg);
`;

const KeywordGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Description = styled.div`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray500};
  text-align: left;
  word-break: keep-all;
  white-space: pre-wrap;
`;

const KeywordTag = styled.div`
  padding: 4px 10px;
  color: #666666;
  font-size: 0.75rem;
  line-height: 1.6;
  border-radius: 20px;
  background: ${palette.chatGray};
`;

const ToggleButton = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    transform: ${(props) =>
      props.$isExpanded
        ? "translate(-50%, -50%) rotate(45deg)"
        : "translate(-50%, -50%) rotate(-135deg)"};
    margin-top: 2px;
    border-top: 1px solid ${palette.gray500};
    border-left: 1px solid ${palette.gray500};
    transition: all 0.5s;
  }
`;

const DescriptionSection = styled.div`
  width: 100%;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
  border-radius: 10px;

  border: ${props => props.$isTabContent 
    ? `1px solid ${palette.outlineGray}`
    : 'none' };

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    line-height: 1.5;
    color: ${palette.gray800};
    padding: 20px;
    border-radius: 10px;
    background: ${props => props.$isTabContent 
      ? 'transparent'
      : palette.chatGray};
    cursor: pointer;
  }

`;

const ListUL = styled.div`
  padding: 20px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray800};

    + li {
      padding-top: 8px;
      margin-top: 8px;
      border-top: 1px solid ${palette.outlineGray};
    }
  }

  .number {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: ${palette.chatBlue};
    border-radius: 2px;
    border: 1px solid rgba(34, 111, 255, 0.5);
    background: rgba(34, 111, 255, 0.04);
  }
`;
