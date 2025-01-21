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
  PURPOSE_ITEMS_SINGLE,
  IS_LOADING_QUESTION,
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

import {
  InterviewXPersonaSingleInterviewGeneratorRequest,
  InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom,
} from "../../../../utils/indexedDB";
import { updateProjectOnServer } from "../../../../utils/indexedDB";

const MoleculeInterviewPurpose = ({
  purpose,
  selectedPurpose,
  showQuestions,
  onPurposeSelect,
  toggleQuestions,
  setShowErrorPopup,
  regenerateCount,
  setRegenerateCount,
}) => {
  console.log("🚀 ~ purpose:", purpose);

  const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId] = useAtom(PROJECT_ID);
  const [singleInterviewQuestionList, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
  const [isLoadingQuestion, setIsLoadingQuestion] =
    useAtom(IS_LOADING_QUESTION);
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);

  const [purposeItemsSingleAtom, setPurposeItemsSingleAtom] =
    useAtom(PURPOSE_ITEMS_SINGLE);
  const [checkGenerateQuestion, setCheckGenerateQuestion] = useState("");
  const [loadingStates, setLoadingStates] = useState({});

  const loadInterviewQuestion = async (title) => {
    console.log("loadInterviewQuestion 시작", {
      purposeId: purpose.id,
      title,
      isCustom: purpose.id === 4,
    });

    setShowRegenerateButton(false);

    // 현재 카드의 로딩 상태 설정
    setLoadingStates((prev) => {
      const newState = {
        ...prev,
        [purpose.id]: true,
      };
      console.log("loadingStates 설정:", newState);
      return newState;
    });

    const existingQuestions = singleInterviewQuestionList.find(
      (item) =>
        item.theory_name ===
        (purpose.id === 4 ? purpose.custom_theory_data.theory_title : title)
    );

    if (existingQuestions) {
      console.log("이미 존재하는 질문입니다:", existingQuestions);
      setCheckGenerateQuestion("");
      setLoadingStates((prev) => ({
        ...prev,
        [purpose.id]: false,
      }));
      return;
    }

    try {
      setIsLoadingQuestion(true);

      let response = {};
      if (purpose.id === 4) {
        console.log("🚀 ~ loadInterviewQuestion ~ purpose.id === 4:", purpose);
        const generatedQuestions = purposeItemsSingleAtom.find(
          (item) => item.id === 4
        );

        if (generatedQuestions) {
          let data = {
            business_idea: businessAnalysis.input,
            business_analysis_data: {
              title: businessAnalysis.title,
              characteristics: businessAnalysis.characteristics,
              features: businessAnalysis.features,
            },
            custom_theory_data: purpose,
          };

          response =
            await InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom(
              data,
              isLoggedIn
            );
        }
      } else if (purpose.id !== 4) {
        console.log("🚀 ~ loadInterviewQuestion ~ purpose.id !== 4:", purpose);
        let data = {
          business_idea: businessAnalysis.input,
          business_analysis_data: {
            title: businessAnalysis.title,
            characteristics: businessAnalysis.characteristics,
            features: businessAnalysis.features,
          },
          theory_name: title,
        };

        response = await InterviewXPersonaSingleInterviewGeneratorRequest(
          data,
          isLoggedIn
        );
        console.log("API 응답:", response);
      }

      if (response.response) {
        const commonQuestions = response.response
          .filter((item) => item.question_type === "공통질문")
          .map((item) => item.question);

        const specialQuestions = response.response
          .filter((item) => item.question_type === "특화질문")
          .map((item) => item.question);

        const newQuestionData = {
          theory_name:
            purpose.id === 4
              ? purpose.custom_theory_data.theory_title
              : purpose.title,
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
      setLoadingStates((prev) => ({
        ...prev,
        [purpose.id]: false,
      }));
      setIsLoadingQuestion(false);
      setCheckGenerateQuestion("");
    }
  };

  const handleQuestionClick = () => {
    console.log("handleQuestionClick 시작", {
      purposeId: purpose.id,
      isCustom: purpose.id === 4,
      showQuestions: showQuestions[purpose.id],
      loadingStates: loadingStates,
      isLoadingQuestion,
    });

    toggleQuestions(purpose.id);

    if (purpose.id !== 4 && !showQuestions[purpose.id]) {
      console.log("일반 방법론 처리");
      const existingQuestions = singleInterviewQuestionList.find(
        (item) => item.theory_name === purpose.title
      );

      if (!existingQuestions) {
        setLoadingStates((prev) => ({
          ...prev,
          [purpose.id]: true,
        }));
        setIsLoadingQuestion(true);
        loadInterviewQuestion(purpose.title);
      }
    } else if (purpose.id === 4 && !showQuestions[purpose.id]) {
      console.log("커스텀 방법론 처리", {
        theoryTitle: purpose.theory_title,
      });

      const existingQuestions = singleInterviewQuestionList.find(
        (item) => item.theory_name === purpose.theory_title
      );
      console.log("existingQuestions:", existingQuestions);

      if (!existingQuestions) {
        console.log("커스텀 방법론 질문 생성 시작");
        setLoadingStates((prev) => ({
          ...prev,
          [purpose.id]: true,
        }));
        setIsLoadingQuestion(true);
        loadInterviewQuestion(purpose.theory_title);
      }
    }
  };

  return (
    <ListBoxItem
      active={selectedPurpose === purpose["id"]}
      showQuestions={showQuestions[purpose["id"]]}
    >
      <div>
        <RadioButton
          id={purpose.id}
          name="radioGroup1"
          checked={selectedPurpose === purpose["id"]}
          onChange={() => onPurposeSelect(purpose["id"])}
        />
      </div>
      <ListText>
        <ListTitle>
          <Body1
            color={selectedPurpose === purpose["id"] ? "primary" : "gray800"}
          >
            {purpose["view_title"]}
          </Body1>
        </ListTitle>
        <ListSubtitle>
          <Caption1 color="gray500">{purpose["description"]}</Caption1>
        </ListSubtitle>
      </ListText>
      <ListButton>
        <Button
          Medium
          {...(showQuestions[purpose["id"]]
            ? { PrimaryLightest: true, Fill: true }
            : { View: true })}
          onClick={handleQuestionClick}
        >
          {showQuestions[purpose["id"]] ? "문항 닫기" : "문항 보기"}
        </Button>
      </ListButton>

      {showQuestions[purpose["id"]] && (
        <BoxListWrap>
          <div>
            <Body1 color="gray800">공통 질문</Body1>
            <BgBoxList>
              {isLoadingQuestion && loadingStates[purpose.id] ? (
                <>
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                </>
              ) : (
                (() => {
                  const questions = singleInterviewQuestionList.find(
                    (item) =>
                      item.theory_name ===
                      (purpose.id === 4
                        ? purpose.custom_theory_data.theory_title
                        : purpose["title"])
                  );
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
              {isLoadingQuestion && loadingStates[purpose.id] ? (
                <>
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                  <SkeletonLine width="100%" height="20px" />
                </>
              ) : (
                (() => {
                  const questions = singleInterviewQuestionList.find(
                    (item) =>
                      item.theory_name ===
                      (purpose.id === 4
                        ? purpose.custom_theory_data.theory_title
                        : purpose["title"])
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

export default MoleculeInterviewPurpose;
