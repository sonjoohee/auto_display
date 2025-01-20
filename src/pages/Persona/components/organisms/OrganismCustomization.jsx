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
} from "../../../AtomStates";

const OrganismCustomization = ({
  customizations,
  setCustomizations,
  setShowPopup,
  setShowNewListBox,
  setShowCustomization,
  setShowCustomButton,
}) => {
  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [singleInterviewQuestionList, setSingleInterviewQuestionList] = useAtom(
    SINGLE_INTERVIEW_QUESTION_LIST
  );
  const [purposeItemsSingleAtom, setPurposeItemsSingleAtom] =
    useAtom(PURPOSE_ITEMS_SINGLE);

  const [apiResponse, setApiResponse] = useState(null);
  const [showQuestions, setShowQuestions] = useState({});
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showCustomInterviewPurpose, setShowCustomInterviewPurpose] =
    useState(false);
  const [currentPurposeData, setCurrentPurposeData] = useState(null);
  const [showResults, setShowResults] = useState(true);
  const [showOrganismCustomization, setShowOrganismCustomization] =
    useState(true);
  // const [loadInterviewQuestions, setLoadInterviewQuestions] = useState(null); // 상태 추가

  const handleEditComplete = (index) => {
    const newCustomizations = [...customizations];
    newCustomizations[index].definitionText =
      newCustomizations[index].editedDefinition;
    newCustomizations[index].purposeText =
      newCustomizations[index].editedPurpose;
    newCustomizations[index].isEditing = false;
    setCustomizations(newCustomizations);
  };
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [customTheoryData, setCustomTheoryData] = useState(null);

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

  const handleGenerateQuestions = (title) => {
    try {
      // 여기서 질문 생성 로직을 추가합니다.
      if (loadInterviewQuestions) {
        loadInterviewQuestions(title); // MoleculeInterviewPurpose의 함수를 호출
      } else {
        console.error("loadInterviewQuestions is not defined");
      }
    } catch (error) {
      console.error("Error in handleGenerateQuestions:", error);
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
                              };
                              console.log(generatedQuestions); // 생성된 질문을 콘솔에 로그
                              if (purposeItemsSingleAtom.length < 4) {
                                setPurposeItemsSingleAtom((prev) => {
                                  const updatedItems = [...prev];
                                  // 생성된 질문이 이미 존재하는지 확인
                                  if (
                                    !updatedItems.some(
                                      (item) =>
                                        item.id === generatedQuestions.id
                                    )
                                  ) {
                                    updatedItems.push(generatedQuestions);
                                  }
                                  // 4개 항목으로 제한
                                  console.log(
                                    "🚀 ~ setPurposeItemsSingle ~ updatedItems:",
                                    updatedItems
                                  );
                                  return updatedItems.slice(0, 4);
                                });
                              }

                              setShowResults(false); // 결과 숨기기
                              setShowCustomInterviewPurpose(true);
                              setCurrentPurposeData(generatedQuestions);
                              setShowOrganismCustomization(false); // 전체 컴포넌트 숨기기
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

      {showCustomInterviewPurpose && currentPurposeData && (
        <>
          {console.log("MoleculeInterviewPurpose is being rendered")}
          <MoleculeInterviewPurpose
            key={currentPurposeData.id}
            purpose={currentPurposeData}
            selectedPurpose={selectedPurpose}
            onPurposeSelect={(id) => setSelectedPurpose(id)}
            toggleQuestions={(id) =>
              setShowQuestions((prev) => ({
                ...prev,
                [id]: !prev[id],
              }))
            }
            showQuestions={showQuestions}
            loadInterviewQuestion={loadInterviewQuestions}
            onGenerateQuestions={(title) => handleGenerateQuestions(title)}
            setShowErrorPopup={setShowErrorPopup}
            regenerateCount={regenerateCount}
            setRegenerateCount={setRegenerateCount}
            custom_theory_data={currentPurposeData.custom_theory_data}
          />
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
