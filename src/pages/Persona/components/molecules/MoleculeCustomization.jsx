import React, { useState } from 'react';
import styled, { css } from "styled-components";
import { 
    TextInfo, 
    TextBox,
    BgBoxList,
    BgBoxItem
} from "../../../../assets/styles/BusinessAnalysisStyle"; // Adjust the import path as necessary
import {
    Body1,
    Body3,
    Caption2,
} from "../../../../assets/styles/Typography";
import { CustomTextarea,FormBox } from "../../../../assets/styles/InputStyle";
import { palette } from "../../../../assets/styles/Palette";

import {
    Button,
    ButtonGroup,
    IconButton,
  } from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";

import { InterviewXPersonaSingleInterviewTheoryCustom } from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom } from "../../../../utils/indexedDB";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import { useAtom } from 'jotai';
import {
    PROJECT_ID,
    IS_LOGGED_IN,
    BUSINESS_ANALYSIS,
  } from "../../../AtomStates";

const MoleculeCustomization = ({ 
    customizations, 
    setCustomizations,
     setShowPopup, 
    setShowNewListBox,
     setShowCustomization, 
    setShowCustomButton }) => {


  const [projectId] = useAtom(PROJECT_ID);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [businessAnalysis] = useAtom(BUSINESS_ANALYSIS);

  const [apiResponse, setApiResponse] = useState(null);


  
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
      const result = await InterviewXPersonaSingleInterviewTheoryCustom({ input_data: custom.purposeText }, true); // Adjust parameters as needed
      console.log(result); 
      setApiResponse(result); 

      // Update project on server with the new data
      await updateProjectOnServer(
        projectId, 
        {
          interviewQuestionList: custom.questionList, 
          theoryTitle: result?.response?.custom_theory_data?.theory_title, 
          customTheoryData: result?.response?.custom_theory_data 
        },
        isLoggedIn 
      );
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
    }
  };

  const handleGenerateQuestions = async (custom) => {
    // Prepare the data to send to the API
    const dataToSend = {
        business_idea: custom.purposeText,
        business_analysis_data: {
            title: apiResponse?.response?.custom_theory_data?.theory_title || '',
            characteristics: apiResponse?.response?.custom_theory_data?.characteristic || [], 
            features: apiResponse?.response?.custom_theory_data?.definition || '', 
        },
        custom_theory_data: apiResponse?.response?.custom_theory_data 
    };

    // Log the data being sent to the API for debugging
    console.log("Data to send:", dataToSend); // Added logging for debugging

    const RequestTheoryCustom = await InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom(dataToSend, isLoggedIn);
    console.log("API Response:", RequestTheoryCustom); // 결과를 콘솔에 출력
  };








  
  return (
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
                    
                    // Call the new function to handle the API request
                    await handlePurposeGeneration(custom, index);
                  }
                }}
              >
                목적 생성
              </Button>
            </CustomizationBox>
          ) : (
            <>
              {/* Remove the CustomizationBox for editing */}
              {/* <CustomizationBox Edit={custom.isEditing}> */}
              {/*   <CustomTitle> */}
              {/*     <Body1 */}
              {/*       color="gray800" */}
              {/*       style={{ alignSelf: "flex-start" }} */}
              {/*     > */}
              {/*       방법론 타이틀 */}
              {/*     </Body1> */}
              {/*     <ButtonGroup> */}
              {/*       <IconButton> */}
              {/*         <img */}
              {/*           src={images.PencilSquare} */}
              {/*           alt="수정하기" */}
              {/*         /> */}
              {/*         수정하기 */}
              {/*       </IconButton>  */}
              {/*       <IconButton> */}
              {/*         <img */}
              {/*           src={images.MagicStick} */}
              {/*           alt="AI로 다듬기" */}
              {/*         /> */}
              {/*         AI로 다듬기 */}
              {/*       </IconButton> */}
              {/*     </ButtonGroup> */}
              {/*   </CustomTitle> */}

              <TextInfo>
                <Body3 color="gray700">정의</Body3>
                <TextBox>
                  <Body3 color="gray700">
                    {apiResponse?.response?.custom_theory_data?.definition || custom.definitionText}
                  </Body3>
                </TextBox>
              </TextInfo>

              <TextInfo>
                <Body3 color="gray700">목적</Body3>
                <TextBox>
                  <Body3 color="gray700">
                    {apiResponse?.response?.custom_theory_data?.objective || custom.purposeText}
                  </Body3>
                </TextBox>
              </TextInfo>

              <TextInfo style={{ width: '100%' }}>
                <Body3 color="gray700">주요 특징</Body3>
              
                  {apiResponse?.response?.custom_theory_data?.characteristic?.map((char, idx) => (
                    <TextBox key={idx}>
                      <Body3 color="gray700">{char}</Body3>
                    </TextBox>
                  )) || <Body3 color="gray700">특징이 없습니다.</Body3>}
              
              </TextInfo>

            

              <Caption2 color="gray500" style={{ alignSelf: "flex-start" }}>
                * 본 서비스는 B2C 페르소나를 타겟으로 진행되어, 질문문항이 소비자 중심으로 되지 않았을 경우, 적합한 결과 도출이 나오지 않을 수 있습니다.
              </Caption2>

              <Button
                Medium
                Primary
                onClick={async () => {
                  setShowNewListBox(true);
                  setShowCustomization(false);
                  setShowCustomButton(true);
                  setCustomizations([]);

                  // Call the new function to handle the API request
                  await handleGenerateQuestions(custom);

                  setTimeout(() => {
                    setShowCustomization(false);
                  }, 100);
                }}
              >
                질문 생성하기
              </Button>
            </>
          )}
          <CustomizationBox Edit={custom.isEditing}>
            <CustomTitle>
              <Body1 color="gray800" style={{ alignSelf: "flex-start" }}>
                방법론 타이틀
              </Body1>
              <ButtonGroup>
                <IconButton>
                  <img src={images.PencilSquare} alt="수정하기" />
                  수정하기
                </IconButton>
                <IconButton>
                  <img src={images.MagicStick} alt="AI로 다듬기" />
                  AI로 다듬기
                </IconButton>
              </ButtonGroup>
            </CustomTitle>

            <TextInfo>
              <Body3 color="gray700">정의</Body3>
              <FormBox>
                <CustomTextarea
                  Edit
                  rows={3}
                  placeholder="textarea"
                  onChange={(e) => {
                    const newCustomizations = [...customizations];
                    newCustomizations[index].editedDefinition = e.target.value;
                    setCustomizations(newCustomizations);
                  }}
                  value={custom.editedDefinition}
                />
              </FormBox>
            </TextInfo>

            <TextInfo>
              <Body3 color="gray700">목적</Body3>
              <FormBox>
                <CustomTextarea
                  Edit
                  rows={3}
                  placeholder="textarea"
                  onChange={(e) => {
                    const newCustomizations = [...customizations];
                    newCustomizations[index].editedPurpose = e.target.value;
                    setCustomizations(newCustomizations);
                  }}
                  value={custom.editedPurpose}
                />
              </FormBox>
            </TextInfo>

            <TextInfo>
              <Body3 color="gray700">질문</Body3>
              <BgBoxList>
                <BgBoxItem white>
                  <Body3 color="gray800">사용자의 트렌드 인지와 반응 속도 측정</Body3>
                </BgBoxItem>
                <BgBoxItem white>
                  <Body3 color="gray800">시장 변화에 대한 사용자의 태도와 행동 분석</Body3>
                </BgBoxItem>
                <BgBoxItem white>
                  <Body3 color="gray800">트렌드에 따른 구매 결정 요인 파악</Body3>
                </BgBoxItem>
                <BgBoxItem white>
                  <Body3 color="gray800">다양한 데모그래픽과 트렌드 반응성 비교</Body3>
                </BgBoxItem>
              </BgBoxList>
            </TextInfo>

            <Caption2 color="gray500" style={{ alignSelf: "flex-start" }}>
              * 본 서비스는 B2C 페르소나를 타겟으로 진행되어, 질문문항이 소비자 중심으로 되지 않았을 경우, 적합한 결과 도출이 나오지 않을 수 있습니다.
            </Caption2>

            <Button
              Medium
              Primary
              onClick={() => handleEditComplete(index)} // Ensure this function is defined
            >
              완료
            </Button>
          </CustomizationBox>
        </div>
      ))}
    </>
  );
};

export default MoleculeCustomization; 



const CustomizationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 24px 24px 20px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const CustomTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;