import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  TextInfo,
  TextBox,
  BgBoxList,
  BgBoxItem,
} from "../../../../assets/styles/BusinessAnalysisStyle"; // Adjust the import path as necessary
import { Body1, Body3, Caption2 } from "../../../../assets/styles/Typography";
import { CustomTextarea, FormBox } from "../../../../assets/styles/InputStyle";
import { palette } from "../../../../assets/styles/Palette";

import {
  Button,
  ButtonGroup,
  IconButton,
} from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import MoleculeInterviewPurpose from "../molecules/MoleculeInterviewPurpose";
import { InterviewXPersonaSingleInterviewTheoryCustom } from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom } from "../../../../utils/indexedDB";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import { useAtom } from "jotai";
import AtomPersonaLoader from "../atoms/AtomPersonaLoader";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  PROJECT_ID,
  IS_LOGGED_IN,
  BUSINESS_ANALYSIS,
  SINGLE_INTERVIEW_QUESTION_LIST,
  PURPOSE_ITEMS_SINGLE,
  IS_LOADING_QUESTION,
} from "../../../AtomStates";

const OrganismCustomization = ({
  customizations,
  setCustomizations,
  setShowPopup,
  setShowNewListBox,
  setShowCustomization,
  setShowCustomButton,
  setShowQuestions,
}) => {
  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [purposeItemsSingleAtom, setPurposeItemsSingleAtom] =
    useAtom(PURPOSE_ITEMS_SINGLE);
  const [singleInterviewQuestionList, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
  const [isLoadingQuestion, setIsLoadingQuestion] =
    useAtom(IS_LOADING_QUESTION);
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showCustomInterviewPurpose, setShowCustomInterviewPurpose] =
    useState(false);
  const [currentPurposeData, setCurrentPurposeData] = useState(null);
  const [showResults, setShowResults] = useState(true);
  const [showOrganismCustomization, setShowOrganismCustomization] =
    useState(true);
  const [selectedTheory, setSelectedTheory] = useState(null);
  const [customTheoryData, setCustomTheoryData] = useState(null);

  const handleEditComplete = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].definitionText =
      newCustomizations[index].editedDefinition;
    newCustomizations[index].purposeText =
      newCustomizations[index].editedPurpose;
    newCustomizations[index].isEditing = false;
    setCustomizations(newCustomizations);
  };

  const handlePurposeGeneration = async (custom, index) => {
    try {
      setIsLoadingQuestion(true);
      const result = await InterviewXPersonaSingleInterviewTheoryCustom(
        { input_data: custom.purposeText },
        true
      ); // Adjust parameters as needed
      console.log(result);
      setApiResponse(result);
      setCustomTheoryData(result?.response?.custom_theory_data);
      // Update project on server with the new data
      await updateProjectOnServer(
        projectId,
        {
          customTheoryData: result?.response?.custom_theory_data,
        },
        isLoggedIn
      );
      setShowResults(true);
      // 새로운 카드 추가
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowPopup(true); // Show error popup for 500 status
            break;
          case 504:
            // Handle 504 error if needed
            setShowPopup(true); // Show error popup for 504 status
            break;
          default:
            setShowPopup(true); // Show error popup for other statuses
            break;
        }
        console.error("Error details:", error);
      }
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const handleGenerateQuestions = async (title) => {
    try {
      setIsLoadingQuestion(true);
      setSelectedPurpose(4); // 커스텀 방법론의 ID

      // 2. 카드 열기
      setShowQuestions((prev) => ({
        ...prev,
        4: true,
      }));

      // 3. PURPOSE_ITEMS_SINGLE 업데이트
      const generatedQuestions = {
        id: 4,
        theory_title: customTheoryData.theory_title,
        view_title: customTheoryData.theory_title,
        definition: customTheoryData.definition,
        objective: customTheoryData.objective,
        characteristic: customTheoryData.characteristic || [],
        description: "사용자 커스텀 방법론",
        custom_theory_data: customTheoryData,
      };

      await setPurposeItemsSingleAtom((prev) => {
        const updatedItems = prev.filter((item) => item.id !== 4);
        return [...updatedItems, generatedQuestions];
      });

      // 4. OrganismCustomization 닫기
      setShowOrganismCustomization(false);

      // 5. API 호출
      const data = {
        business_idea: businessAnalysis.input,
        business_analysis_data: {
          title: businessAnalysis.title,
          characteristics: businessAnalysis.characteristics,
          features: businessAnalysis.features,
        },
        custom_theory_data: customTheoryData,
      };

      const result =
        await InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom(
          data,
          true
        );

      if (result?.response) {
        const commonQuestions = result.response
          .filter((item) => item.question_type === "공통질문")
          .map((item) => item.question);

        const specialQuestions = result.response
          .filter((item) => item.question_type === "특화질문")
          .map((item) => item.question);

        const newQuestionList = {
          theory_name: customTheoryData.theory_title,
          commonQuestions,
          specialQuestions,
        };

        await setSingleInterviewQuestionList((prev) => {
          const filtered = prev.filter(
            (item) => item.theory_name !== customTheoryData.theory_title
          );
          return [...filtered, newQuestionList];
        });

        await updateProjectOnServer(
          projectId,
          {
            singleInterviewQuestionList: [
              ...singleInterviewQuestionList,
              newQuestionList,
            ],
          },
          isLoggedIn
        );
      }
    } catch (error) {
      console.error("Error in handleGenerateQuestions:", error);
      setShowErrorPopup(true);
      setShowQuestions((prev) => ({
        ...prev,
        4: false,
      }));
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const loadInterviewQuestions = (title) => {
    // 질문 로딩 로직을 여기에 추가합니다.
    console.log("Loading interview questions for:", title);
    // 실제 질문 로딩 로직을 여기에 추가
  };

  return (
    <>
      {showOrganismCustomization && (
        <>
          {customizations.map((custom, index) => (
            <div key={custom.id}>
              {!custom.showMethodology ? (
                <CustomizationBox>
                  <Body1 color="gray800" style={{ alignSelf: "flex-start" }}>
                    인터뷰 목적
                  </Body1>
                  <CustomTextarea
                    rows={4}
                    placeholder="페르소나의 특성 및 라이프스타일 등을 파악할 수 있는 질문 구성 입니다."
                    value={custom.purposeText}
                    onChange={(e) => {
                      const newCustomizations = [...customizations];
                      newCustomizations[index].purposeText = e.target.value;
                      setCustomizations(newCustomizations);
                    }}
                  />
                  <Button
                    Medium
                    Primary
                    onClick={async () => {
                      if (!custom.purposeText.trim()) {
                        setShowPopup(true);
                      } else {
                        const newCustomizations = [...customizations];
                        newCustomizations[index].showMethodology = true;
                        setCustomizations(newCustomizations);
                        setShowResults(false);

                        // Call the new function to handle the API request
                        await handlePurposeGeneration(custom, index);
                      }
                    }}
                  >
                    목적 생성
                  </Button>
                </CustomizationBox>
              ) : (
                <CustomizationBox>
                  {isLoadingQuestion ? (
                    <AtomPersonaLoader message="입력하신 데이터를 분석하고 있어요" />
                  ) : (
                    <>
                      {showResults && (
                        <>
                          <Body1
                            color="gray800"
                            style={{ alignSelf: "flex-start" }}
                          >
                            {apiResponse?.response?.custom_theory_data
                              ?.theory_title || custom.definitionText}
                          </Body1>
                          <TextInfo>
                            <Body3 color="gray700" align="left">
                              정의
                            </Body3>
                            <TextBox>
                              <Body3 color="gray700">
                                {apiResponse?.response?.custom_theory_data
                                  ?.definition || custom.definitionText}
                              </Body3>
                            </TextBox>
                          </TextInfo>

                          <TextInfo>
                            <Body3 color="gray700" align="left">
                              목적
                            </Body3>
                            <TextBox>
                              <Body3 color="gray700">
                                {apiResponse?.response?.custom_theory_data
                                  ?.objective || custom.purposeText}
                              </Body3>
                            </TextBox>
                          </TextInfo>

                          <TextInfo style={{ width: "100%" }}>
                            <Body3 color="gray700">주요 특징</Body3>

                            {apiResponse?.response?.custom_theory_data?.characteristic?.map(
                              (char, idx) => (
                                <TextBox key={idx}>
                                  <Body3 color="gray700">{char}</Body3>
                                </TextBox>
                              )
                            ) || (
                              <Body3 color="gray700">특징이 없습니다.</Body3>
                            )}
                          </TextInfo>

                          <Caption2
                            color="gray500"
                            style={{ alignSelf: "flex-start" }}
                          >
                            * 본 서비스는 B2C 페르소나를 타겟으로 진행되어,
                            질문문항이 소비자 중심으로 되지 않았을 경우, 적합한
                            결과 도출이 나오지 않을 수 있습니다.
                          </Caption2>
                          <Button
                            Medium
                            onClick={() => {
                              const generatedQuestions = {
                                id: 4,
                                theory_title:
                                  apiResponse?.response?.custom_theory_data
                                    ?.theory_title || "",
                                view_title:
                                  apiResponse?.response?.custom_theory_data
                                    ?.theory_title || "",
                                definition:
                                  apiResponse?.response?.custom_theory_data
                                    ?.definition || "",
                                objective:
                                  apiResponse?.response?.custom_theory_data
                                    ?.objective || "",
                                characteristic:
                                  apiResponse?.response?.custom_theory_data
                                    ?.characteristic || [],
                                description: "사용자 커스텀 방법론" || "",
                                custom_theory_data:
                                  apiResponse?.response?.custom_theory_data ||
                                  "",
                                isQuestionVisible: true,
                              };

                              if (purposeItemsSingleAtom.length < 4) {
                                setPurposeItemsSingleAtom((prev) => {
                                  const updatedItems = [...prev];
                                  if (
                                    !updatedItems.some(
                                      (item) =>
                                        item.id === generatedQuestions.id
                                    )
                                  ) {
                                    updatedItems.push(generatedQuestions);
                                  }
                                  return updatedItems.slice(0, 4);
                                });
                              }

                              handleGenerateQuestions(
                                generatedQuestions.theory_title
                              );
                              setShowOrganismCustomization(false);
                            }}
                          >
                            문항 생성
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </CustomizationBox>
              )}
            </div>
          ))}
        </>
      )}

      {showErrorPopup && (
        <PopupWrap
          Warning
          title="오류가 발생했습니다"
          message="질문 생성 중 문제가 발생했습니다. 다시 시도해주세요."
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={() => setShowErrorPopup(false)}
          show={showErrorPopup}
        />
      )}
    </>
  );
};

export default OrganismCustomization;

const CustomizationBox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 20px;
  width: 100%;
  padding: 24px 24px 20px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;
