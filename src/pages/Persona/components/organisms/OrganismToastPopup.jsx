import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
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
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import { createProjectReportOnServer } from "../../../../utils/indexedDB";

const OrganismToastPopup = ({ isActive, onClose, isComplete }) => {
  const [reportId, setReportId] = useAtom(PROJECT_REPORT_ID);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [interviewReport, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [interviewReportAdditional, setInterviewReportAdditional] = useAtom(
    INTERVIEW_REPORT_ADDITIONAL
  );
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [personaButtonState3, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
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
  const [interviewQuestionListState, setInterviewQuestionListState] = useState(
    []
  );
  const [interviewStatus, setInterviewStatus] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [personaInfo, setPersonaInfo] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

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
        // isComplete가 true일 경우 즉시 완료 상태로 설정
        if (isComplete) {
          const existingQuestions = interviewQuestionList.find(
            (item) => item.theory_name === selectedInterviewPurpose
          );
          
          if (existingQuestions) {
            const questions = existingQuestions.questions.slice(2);
            setInterviewQuestionListState(questions);
            
            // 모든 질문을 Complete 상태로 설정
            const completedStatus = new Array(questions.length).fill('Complete');
            setInterviewStatus(completedStatus);

            console.log(completedStatus); 
            
            // interviewData에서 답변 설정
            const newAnswers = {};
            questions.forEach((_, index) => {
              const answers = interviewData[index][`answer_${index + 1}`];
              newAnswers[index] = personaList.selected.map((persona, pIndex) => ({
                persona: persona,
                answer: answers[pIndex]
              }));
            });
            setAnswers(newAnswers);
  
            // 모든 답변을 보이도록 설정
            const allVisible = {};
            questions.forEach((_, index) => {
              allVisible[index] = true;
            });
            setVisibleAnswers(allVisible);
            
            setIsLoadingPrepare(false);
          }
          return; // API 호출 없이 종료
        }
        if (personaButtonState3 === 1) {
          const existingQuestions = interviewQuestionList.find(
            (item) => item.theory_name === selectedInterviewPurpose
          );

          if (existingQuestions) {
            setInterviewQuestionListState(existingQuestions.questions.slice(2));
            await new Promise((resolve) => setTimeout(resolve, 5000));
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
        const initialStatus = new Array(interviewQuestionListState.length).fill(
          "Pre"
        );
        setInterviewStatus(initialStatus);
      }
    };
    interviewLoading();
  }, [personaButtonState3, isComplete]);

  useEffect(() => {
    const processInterview = async () => {
      if (
        !isLoadingPrepare &&
        interviewStatus[currentQuestionIndex] === "Pre"
      ) {
        const newStatus = [...interviewStatus];
        newStatus[currentQuestionIndex] = "Ing";
        setInterviewStatus(newStatus);

        setAnswers((prev) => ({
          ...prev,
          [currentQuestionIndex]: [],
        }));

        try {
          let allAnswers = [];
          let personaInfoState = [];

          for (let i = 0; i < personaList.selected.length; i++) {
            setIsGenerating(true);

            // 현재 페르소나의 이전 답변들 수집
            const lastInterview = [];
            for (let q = 0; q < currentQuestionIndex; q++) {
              const questionAnswers = answers[q] || [];
              const personaAnswer = questionAnswers.find(
                (ans) =>
                  ans.persona.personIndex ===
                  personaList.selected[i].personIndex
              );
              if (personaAnswer) {
                lastInterview.push({
                  question: interviewQuestionListState[q].question,
                  answer: personaAnswer.answer,
                });
              }
            }

            const personaInfo = {
              id: personaList.selected[i].personIndex.replace(/[^1-9]/g, ""),
              name: personaList.selected[i].persona,
              keyword: personaList.selected[i].keyword,
              hashtag: personaList.selected[i].tag,
              summary: personaList.selected[i].summary,
            };

            const data = {
              business_analysis_data: businessAnalysis,
              question: interviewQuestionListState[currentQuestionIndex],
              persona_info: personaInfo,
              last_interview: lastInterview,
            };

            let response = await axios.post(
              "https://wishresearch.kr/person/persona_interview_module",
              data,
              axiosConfig
            );

            let retryCount = 0;
            const maxRetries = 10;

            while (
              retryCount < maxRetries &&
              (!response ||
                !response.data ||
                !response.data.hasOwnProperty("answer") ||
                !response.data.answer)
            ) {
              response = await axios.post(
                "https://wishresearch.kr/person/persona_interview_module",
                data,
                axiosConfig
              );
              retryCount++;
            }

            if (retryCount === maxRetries) {
              throw new Error("Maximum retry attempts reached.");
            }

            setIsGenerating(false);
            allAnswers.push(response.data.answer);

            personaInfoState.push(personaInfo);

            setAnswers((prev) => ({
              ...prev,
              [currentQuestionIndex]: [
                ...prev[currentQuestionIndex],
                {
                  persona: personaList.selected[i],
                  answer: response.data.answer,
                },
              ],
            }));

            if (i === personaList.selected.length - 1) {
              // 모든 페르소나의 답변이 완료되면 interviewData 업데이트
              setInterviewData((prev) => {
                const newData = [...(prev || [])];
                newData[currentQuestionIndex] = {
                  [`question_${currentQuestionIndex + 1}`]:
                    interviewQuestionListState[currentQuestionIndex].question,
                  [`answer_${currentQuestionIndex + 1}`]: allAnswers,
                };
                return newData;
              });

              newStatus[currentQuestionIndex] = "Complete";
              setInterviewStatus(newStatus);

              // 모든 인터뷰가 완료되었는지 확인
              const allComplete = newStatus.every(
                (status) => status === "Complete"
              );
              if (allComplete) {
                try {
                  await updateProjectOnServer(
                    projectId,
                    {
                      interviewData: [
                        ...interviewData,
                        {
                          [`question_${currentQuestionIndex + 1}`]:
                            interviewQuestionListState[currentQuestionIndex]
                              .question,
                          [`answer_${currentQuestionIndex + 1}`]: allAnswers,
                        },
                      ],
                    },
                    isLoggedIn
                  );

                  setIsAnalyzing(true);
                  const finalData1 = {
                    business_idea: businessAnalysis,
                    persona_info: personaInfoState,
                    interview_data: [
                      ...interviewData,
                      {
                        [`question_${currentQuestionIndex + 1}`]:
                          interviewQuestionListState[currentQuestionIndex]
                            .question,
                        [`answer_${currentQuestionIndex + 1}`]: allAnswers,
                      },
                    ],
                    theory_type: selectedInterviewPurpose,
                  };

                  let responseReport;
                  let retryCount = 0;
                  const maxRetries = 10;

                  while (retryCount < maxRetries) {
                    responseReport = await axios.post(
                      "https://wishresearch.kr/person/interview_reports",
                      finalData1,
                      axiosConfig
                    );

                    // 응답 데이터가 유효한지 확인
                    if (
                      responseReport &&
                      responseReport.data &&
                      responseReport.data.length > 0 &&
                      responseReport.data[0].title &&
                      responseReport.data[0].text
                    ) {
                      break;
                    }

                    retryCount++;
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                  }

                  if (retryCount === maxRetries) {
                    throw new Error(
                      "Maximum retry attempts reached for interview reports."
                    );
                  }

                  setInterviewReport(responseReport.data);

                  const finalData2 = {
                    business_idea: businessAnalysis,
                    persona_info: personaInfoState,
                    report_data: responseReport.data,
                    interview_data: [
                      ...interviewData,
                      {
                        [`question_${currentQuestionIndex + 1}`]:
                          interviewQuestionListState[currentQuestionIndex]
                            .question,
                        [`answer_${currentQuestionIndex + 1}`]: allAnswers,
                      },
                    ],
                    theory_type: selectedInterviewPurpose,
                  };

                  let responseReportAdditional;
                  retryCount = 0;

                  while (retryCount < maxRetries) {
                    responseReportAdditional = await axios.post(
                      "https://wishresearch.kr/person/interview_report_additional",
                      finalData2,
                      axiosConfig
                    );

                    // 응답 데이터의 유효성 검사

                    if (responseReportAdditional && responseReportAdditional.data && 
                        responseReportAdditional.data.title && 
                        responseReportAdditional.data.suggestion_list && 
                        responseReportAdditional.data.suggestion_list.length === 5 &&
                        responseReportAdditional.data.suggestion_list.every(item => 
                          item.title && 
                          item.title_text && 
                          item.description_text &&
                          item.title === "브랜드 강화 관점" ||
                          item.title === "타겟팅 관점" ||
                          item.title === "세그먼트화 관점" ||
                          item.title === "사업 전략 관점" ||
                          item.title === "고객 경험 개선 관점" ||
                          item.title === "성장 전략 관점" ||
                          item.title === "비즈니스 모델 캔버스 관점"
                        )) {
                      break;
                    }

                    retryCount++;
                    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기
                  }

                  if (retryCount === maxRetries) {
                    throw new Error(
                      "Maximum retry attempts reached for interview report additional."
                    );
                  }

                  setInterviewReportAdditional(responseReportAdditional.data);

                  if (responseReport.data && responseReportAdditional.data) {
                    setIsAnalyzing(false);
                    setIsAnalysisComplete(true);
                    // 필요한 경우 분석 결과 저장
                  }
                } catch (error) {
                  console.error("Analysis error:", error);
                  setIsAnalyzing(false);
                }
              }

              if (
                currentQuestionIndex <
                interviewQuestionListState.length - 1
              ) {
                setCurrentQuestionIndex((prev) => prev + 1);
              }
            }
          }
        } catch (error) {
          console.error("Interview process error:", error);
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
            <TextContainer>{answer.answer}</TextContainer>
          </AnswerItem>
        ))}
        {isGenerating && interviewStatus[questionIndex] === "Ing" && (
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

  const renderAnswersComplete = (questionIndex) => {
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
      </>
    );
  };

  // // 완료 상태일 때는 모든 답변을 보이도록 설정
  // useEffect(() => {
  //   if (isComplete) {
  //     const allVisible = {};
  //     interviewQuestionListState.forEach((_, index) => {
  //       allVisible[index] = true;
  //     });
  //     setVisibleAnswers(allVisible);
  //   }
  // }, [isComplete, interviewQuestionListState]);

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
    if (!isComplete) {
      navigate(`/Main`, { replace: true });
    }
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
    // 'Pre' 상태일 때는 토글 불가능
    // if (interviewStatus[index] === 'Pre') return;
    
    setVisibleAnswers(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const renderInterviewItems = () => {
    return interviewQuestionListState.map((item, index) => (
      <InterviewItem
        key={index}
        status={interviewStatus[index] || "Pre"}
        // 'Pre' 상태일 때는 커서 스타일 변경
        style={{
          cursor: interviewStatus[index] === "Pre" ? "default" : "pointer",
        }}
      >
        <QuestionWrap 
          onClick={() => handleAnswerToggle(index)}
          status={interviewStatus[index] || "Pre"}
          isOpen={visibleAnswers[index]}
        >
          <Status status={interviewStatus[index] || "Pre"}>
            {interviewStatus[index] === "Ing"
              ? "진행 중"
              : interviewStatus[index] === "Complete"
              ? "완료"
              : "준비 중"}
          </Status>
          <QuestionText>Q{index + 1}. {item.question}</QuestionText>
        </QuestionWrap>
        {visibleAnswers[index] && (
          <AnswerWrap>
            {renderAnswers(index)}
          </AnswerWrap>
        )}
      </InterviewItem>
    ));
  };

  const renderInterviewItemsComplete = () => {
    return interviewQuestionListState.map((item, index) => (
      <InterviewItem 
        key={index} 
        status={'Complete'}
        style={{ cursor: 'pointer' }}
      >
        <QuestionWrap onClick={() => handleAnswerToggle(index)}>
          <Number status={'Complete'}>{index + 1}</Number>
          <QuestionText>{item.question}</QuestionText>
          <Status status={'Complete'}>
            완료
          </Status>
        </QuestionWrap>
        {visibleAnswers[index] && (
          <AnswerWrap>
            {renderAnswersComplete(index)}
          </AnswerWrap>
        )}
      </InterviewItem>
    ));
  };


  const handleCheckResult = async () => {
    handleWarningClose();
    setIsPersonaAccessible(true);

    if (!reportId && isPersonaAccessible) {
      try {
        let newReportId = await createProjectReportOnServer(isLoggedIn);
        setReportId(newReportId); // 생성된 대화 ID 설정
        setIsPersonaAccessible(true);
      } catch (error) {
        // setIsLoadingPage(false); // 로딩 완료
        setIsPersonaAccessible(true);
        console.error("Failed to create project on server:", error);
      }
    }
    navigate(`/Persona/4/${projectId}`, { replace: true });
  };

  return (
    <>
      <PopupBox isActive={active}>
        <ToastPopup isActive={active}>
          <Header>
            <Title>
              {businessAnalysis.title}의 {selectedInterviewPurpose}
              <ColseButton onClick={handleClose} />
            </Title>
            <ul>
              <li>
                <span>
                  <img src={images.FileText} alt="문항수" />
                  문항수
                </span>
                <span>3개</span>
              </li>
              <li>
                <span>
                  <img src={images.PeopleFill} alt="참여페르소나" />
                  참여페르소나
                </span>
                <span>{personaList.selected.length}명</span>
              </li>
            </ul>
          </Header>

          <Contents>
            {/* <LoadingBox Complete>
              <img src={images.CheckCircleFill} alt="완료" />

              <p>
                페르소나 입장 완료! 인터뷰를 시작하겠습니다
                <span>지금 시작하기</span>
              </p>
            </LoadingBox> */}

            {isLoadingPrepare && (
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
            )}

            {!isLoadingPrepare && 
              isComplete ? renderInterviewItemsComplete() : renderInterviewItems()
            }

            {isAnalyzing && (
              <LoadingBox>
                <Loading>
                  <div />
                  <div />
                  <div />
                </Loading>
                <p>
                  인터뷰 결과를 취합하고 분석 중입니다.
                  <span>잠시만 기다려주세요 ...</span>
                </p>
              </LoadingBox>
            )}

            {isAnalysisComplete && (
              <LoadingBox Complete>
                <img src={images.CheckCircleFill} alt="완료" />

                <p>
                  결과 분석이 완료되었습니다. 지금 바로 확인해보세요!
                  <span onClick={handleCheckResult}>지금 확인하기</span>
                </p>
              </LoadingBox>
            )}
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

export default OrganismToastPopup;

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
  cursor: ${(props) => (props.status === "Pre" ? "default" : "pointer")};
`;

const QuestionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  cursor: inherit;
  position: relative;
  padding-right: 24px;

  ${props => props.status === "Complete" && css`
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

  ${props => props.status === "Complete" && props.isOpen && css`
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

  ${props => props.status === "Complete" && css`
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

const TypeName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  font-size: 0.875rem;
  font-weight: 300;
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
  margin: 0 12px;
  border-radius: 50%;
  background: ${palette.gray500};
  box-shadow: 12px 0 ${palette.gray500}, -12px 0 ${palette.gray500};
  position: relative;
  animation: ${flash} 0.5s ease-out infinite alternate;
`;
