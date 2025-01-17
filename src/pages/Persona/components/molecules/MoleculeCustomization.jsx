import React from 'react';
import styled, { css } from "styled-components";
import { 
    TextInfo, 
    TextBox,
    BgBoxList,
} from "../../../../assets/styles/BusinessAnalysisStyle"; // Adjust the import path as necessary
import {
    Body1,
    Body3,
    Caption2,
} from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { CustomTextarea } from "../../../../assets/styles/InputStyle";
import { palette } from "../../../../assets/styles/Palette";

import { InterviewXPersonaSingleInterviewTheoryCustom } from "../../../../utils/indexedDB";
import { InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom } from "../../../../utils/indexedDB";

const MoleculeCustomization = ({ 
    customizations, 
    setCustomizations, setShowPopup, 
    setShowNewListBox, setShowCustomization, 
    setShowCustomButton }) => {














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
                onClick={() => {
                  if (!custom.purposeText.trim()) {
                    setShowPopup(true);
                  } else {
                    const newCustomizations = [...customizations];
                    newCustomizations[index].showMethodology = true;
                    setCustomizations(newCustomizations);
                  }
                }}
              >
                목적 생성
              </Button>
            </CustomizationBox>
          ) : (
            <CustomizationBox>
              <CustomTitle>
                <Body1 color="gray800" style={{ alignSelf: "flex-start" }}>
                  방법론 타이틀
                </Body1>
                {/* Add your button group here */}
              </CustomTitle>

              <TextInfo>
                <Body3 color="gray700" align="left">정의</Body3>
                <TextBox>
                  <Body3 color="gray700">{custom.definitionText}</Body3>
                </TextBox>
              </TextInfo>

              <TextInfo>
                <Body3 color="gray700" align="left">목적</Body3>
                <TextBox>
                  <Body3 color="gray700">{custom.purposeText}</Body3>
                </TextBox>
              </TextInfo>

              <TextInfo>
                <Body3 color="gray700" align="left">질문</Body3>
                <BgBoxList>
                  {/* Add your questions here */}
                </BgBoxList>
              </TextInfo>

              <Caption2 color="gray500" style={{ alignSelf: "flex-start" }}>
                * 본 서비스는 B2C 페르소나를 타겟으로 진행되어, 질문문항이 소비자 중심으로 되지 않았을 경우, 적합한 결과 도출이 나오지 않을 수 있습니다.
              </Caption2>

              <Button
                Medium
                Primary
                onClick={() => {
                  setShowNewListBox(true);
                  setShowCustomization(false);
                  setShowCustomButton(true);
                  setCustomizations([]);
                  setTimeout(() => {
                    setShowCustomization(false);
                  }, 100);
                }}
              >
                질문 생성하기
              </Button>
            </CustomizationBox>
          )}
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