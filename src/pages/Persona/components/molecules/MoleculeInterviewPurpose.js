import React, { useState } from 'react';
import { useAtom } from "jotai";
import {
    IS_PERSONA_ACCESSIBLE,
    IS_LOGGED_IN,
    PERSONA_STEP,
    SELECTED_INTERVIEW_PURPOSE,
    PERSONA_LIST,
    PERSONA_BUTTON_STATE_3,
    BUSINESS_ANALYSIS,
    REQUEST_PERSONA_LIST,
    PROJECT_LOAD_BUTTON_STATE,
    PROJECT_ID,
  } from "../../../AtomStates";
import {
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BoxListWrap,
  BgBoxList,
  BgBoxItem,
  Badge,
} from '../../../../assets/styles/BusinessAnalysisStyle'; 
import {
    SkeletonLine,
  } from "../../../../assets/styles/Skeleton";
import {
    Body1,
    Body3,
    Caption1,
} from '../../../../assets/styles/Typography'
import {
    Button,
  } from "../../../../assets/styles/ButtonStyle";
import {
    RadioButton,
  } from "../../../../assets/styles/InputStyle";

import {InterviewXPersonaSingleInterviewGeneratorRequest} from "../../../../utils/indexedDB"
import { updateProjectOnServer } from "../../../../utils/indexedDB";

const MoleculeInterviewPurpose = ({
  purpose,
  selectedPurpose,
  showQuestions,
  onPurposeSelect,
  toggleQuestions,
  setShowErrorPopup,
  projectId,
  regenerateCount,
  setRegenerateCount,
}) => {
const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);
const [isLoggedIn] = useAtom(IS_LOGGED_IN);

  const [interviewQuestionListState, setInterviewQuestionListState] = useState([]);
  const [interviewQuestionList, setInterviewQuestionList] = useState([]);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);

  const loadInterviewQuestion = async (title) => {
    // 1. 재생성 버튼 숨기기
    setShowRegenerateButton(false);
  
    // 2. 기존 질문 확인
    const existingQuestions = interviewQuestionListState.find(
      (item) => item.theory_name === title
    );
  
    // 이미 존재하는 경우 함수 종료
    if (existingQuestions) {
      return;
    }
  
    try {
      setIsLoadingQuestion(true);
      // 3. API 요청 데이터 생성
      let data = {
        business_idea: businessAnalysis.input,
        business_analysis_data: {
          title: businessAnalysis.title,
          characteristics: businessAnalysis.characteristics,
          features: businessAnalysis.features,
        },
        theory_name: title,
      };
  
      // 4. 첫 번째 API 호출
      let response = await InterviewXPersonaSingleInterviewGeneratorRequest(data, isLoggedIn);
  
      let questionList = response.data;
      let retryCount = 0;
      const maxRetries = 10;
  
    //   // 5. 재시도 로직
    //   while (
    //     retryCount < maxRetries &&
    //     (!response || !response.data || response.data.length !== 5)
    //   ) {
    //     response = await InterviewXPersonaSingleInterviewGeneratorRequest(data, isLoggedIn);
    //     retryCount++;
    //     questionList = response.data;
    //   }
  
      // 6. 최대 재시도 초과 처리
      if (retryCount >= maxRetries) {
        setShowErrorPopup(true);
        return;
      }
  
      // 8. 성공적인 데이터 수신
      setInterviewQuestionListState((prev) => [
        ...prev,
        {
          theory_name: title,
          questions: questionList,
        },
      ]);
  
      // 서버 업데이트
      const newQuestionList = [
        ...interviewQuestionList,
        {
          theory_name: title,
          questions: questionList,
        },
      ];
  
      setInterviewQuestionList(newQuestionList);
  
      await updateProjectOnServer(
        projectId,
        {
          singleInterviewQuestionList: newQuestionList,
        },
        isLoggedIn
      );
    } catch (error) {
      // 10. 에러 처리
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            if (regenerateCount >= 3) {
              setShowErrorPopup(true);
              return;
            } else {
              setShowRegenerateButton(true);
              setRegenerateCount(regenerateCount + 1);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
        console.error("Error details:", error);
      }
    } finally {
      // 1. 로딩 상태 종료
      setIsLoadingQuestion(false);
    }
  };
  



    
  return (
    <ListBoxItem active={selectedPurpose === purpose.id} showQuestions={showQuestions[purpose.id]}>
      <div>
        <RadioButton
          id={purpose.id}
          name="radioGroup1"
          checked={selectedPurpose === purpose.id}
          onChange={() => onPurposeSelect(purpose.id)}
        />
      </div>
      <ListText>
        <ListTitle>
          <Body1 color={selectedPurpose === purpose.id ? "primary" : "gray800"}>
            {purpose.title}
          </Body1>
          {purpose.isNew && <Badge Complete>New</Badge>}
        </ListTitle>
        <ListSubtitle>
          <Caption1 color="gray500">{purpose.description}</Caption1>
        </ListSubtitle>
      </ListText>
      <ListButton>
        <Button
          Medium
          {...(showQuestions[purpose.id] ? { PrimaryLightest: true, Fill: true } : { View: true })}
          onClick={(e) => {
            e.preventDefault();
            toggleQuestions(purpose.id);
            if (!showQuestions[purpose.id]) {
              loadInterviewQuestion(purpose.title); // 질문 로드 함수 호출
            }
          }}
        >
          {showQuestions[purpose.id] ? "문항 닫기" : "문항 보기"}
        </Button>
      </ListButton>

      {showQuestions[purpose.id] && (
        <BoxListWrap>
          <div>
            <Body1 color="gray800">공통 질문</Body1>
            <BgBoxList>
              {isLoadingQuestion ? (
                <>
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                </>
              ) : (
                purpose.commonQuestions.map((question, index) => (
                  <BgBoxItem key={index}>
                    <Body3 color="gray700">{question}</Body3>
                  </BgBoxItem>
                ))
              )}
            </BgBoxList>
          </div>

          <div>
            <Body1 color="gray800">특화 질문</Body1>
            <BgBoxList>
              {isLoadingQuestion ? (
                <>
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                </>
              ) : (
                purpose.specialQuestions.map((question, index) => (
                  <BgBoxItem key={index}>
                    <Body3 color="gray700">{question}</Body3>
                  </BgBoxItem>
                ))
              )}
            </BgBoxList>
          </div>
        </BoxListWrap>
      )}
    </ListBoxItem>
  );
};

export default MoleculeInterviewPurpose; 