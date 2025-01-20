import React, { useState } from "react";
import { useAtom } from "jotai";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import {
  IS_PERSONA_ACCESSIBLE,
  IS_LOGGED_IN,
  PERSONA_STEP,
  SELECTED_INTERVIEW_PURPOSE,
  SINGLE_INTERVIEW_QUESTION_LIST,
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
  Badge,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { SkeletonLine } from "../../../../assets/styles/Skeleton";
import { Body1, Body3, Caption1 } from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { RadioButton } from "../../../../assets/styles/InputStyle";

import { InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom } from "../../../../utils/indexedDB";
import { updateProjectOnServer } from "../../../../utils/indexedDB";

const MoleculeCustomInterviewPurpose = ({
  id,
  purpose,
  selectedPurpose,
  onPurposeSelect,
  setShowErrorPopup,
  regenerateCount,
  setRegenerateCount,
}) => {
  const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId] = useAtom(PROJECT_ID);
  const [singleInterviewQuestionList, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  console.log("purpose", purpose);

  if (!purpose) {
    return null;
  }
  const loadInterviewQuestion = async (title) => {
    setShowRegenerateButton(false);

    const existingQuestions = singleInterviewQuestionList.find(
      (item) => item.theory_name === title
    );

    if (existingQuestions) {
      console.log("이미 존재하는 질문입니다:", existingQuestions);
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
        custom_theory_data: purpose,
      };

      console.log("API 요청 데이터:", data);

      let response =
        await InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom(
          data,
          isLoggedIn
        );

      console.log("API 응답:", response);

      if (response.response) {
        const commonQuestions = response.response
          .filter((item) => item.question_type === "공통질문")
          .map((item) => item.question);

        const specialQuestions = response.response
          .filter((item) => item.question_type === "특화질문")
          .map((item) => item.question);

        const newQuestionData = {
          theory_name: title,
          commonQuestions,
          specialQuestions,
        };

        console.log("새로운 질문 데이터:", newQuestionData);

        setSingleInterviewQuestionList((prev) => {
          const newState = [...prev, newQuestionData];
          console.log("업데이트된 상태:", newState);
          return newState;
        });

        await updateProjectOnServer(
          projectId,
          {
            singleInterviewQuestionList: [
              ...singleInterviewQuestionList,
              newQuestionData,
            ],
          },
          isLoggedIn
        );
      }
    } catch (error) {
      console.error("질문 로딩 중 에러 발생:", error);
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
      }
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  return (
    <ListBoxItem active={selectedPurpose === id} showQuestions={isQuestionOpen}>
      <Button
        Medium
        {...(isQuestionOpen
          ? { PrimaryLightest: true, Fill: true }
          : { View: true })}
        onClick={(e) => {
          e.preventDefault();
          setIsQuestionOpen(!isQuestionOpen);
          if (!isQuestionOpen) {
            loadInterviewQuestion(purpose?.theory_title);
          }
        }}
      >
        {isQuestionOpen ? "문항 닫기" : "문항 생성"}
      </Button>

      {isQuestionOpen && (
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
                (() => {
                  const questions = singleInterviewQuestionList.find(
                    (item) => item.theory_name === purpose?.theory_title
                  );
                  console.log("현재 표시할 질문:", questions);
                  return (
                    questions?.commonQuestions?.map((question, index) => (
                      <BgBoxItem key={index}>
                        <Body3 color="gray700">{`${String(index + 1).padStart(
                          2,
                          "0"
                        )}.`}</Body3>
                        <Body3 color="gray700">{question}</Body3>
                      </BgBoxItem>
                    )) || null
                  );
                })()
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
                (() => {
                  const questions = singleInterviewQuestionList.find(
                    (item) => item.theory_name === purpose?.theory_title
                  );
                  return (
                    questions?.specialQuestions?.map((question, index) => (
                      <BgBoxItem key={index}>
                        <Body3 color="gray700">{`${String(index + 1).padStart(
                          2,
                          "0"
                        )}.`}</Body3>
                        <Body3 color="gray700">{question}</Body3>
                      </BgBoxItem>
                    )) || null
                  );
                })()
              )}
            </BgBoxList>
          </div>
        </BoxListWrap>
      )}
    </ListBoxItem>
  );
};

const BgBoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 12px;
`;

const BgBoxItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${palette.chatGray};
`;

export default MoleculeCustomInterviewPurpose;
