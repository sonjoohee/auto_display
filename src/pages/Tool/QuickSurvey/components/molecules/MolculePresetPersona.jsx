import React from "react";
import { Body1, Sub3 } from "../../../../../assets/styles/Typography";
import {
  AiPersonaCardGroupWrap,
  AiPersonaCardListItem,
  AiPersonaCardButtonWrap,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import images from "../../../../../assets/styles/Images";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";


const MolculePresetPersona = ({
  personaData = [],
  selectedCards = {},
  onCardSelect = () => {},
}) => {



  return (
    <>
        <AiPersonaCardGroupWrap>
          {personaData.map((persona) => (
            <AiPersonaCardListItem key={persona?._id}>
              <div className="header">
                <div className="title">
                  <Body1 color="gray800">
                    {persona?.personaName || "제목 없음"}
                  </Body1>
                </div>
              </div>

              <div className="content" style={{ minHeight: "114px" }}>
                <Sub3 color="gray700">
                  {persona?.personaType === "my_persona" ? (
                    <>
                      {persona?.customData?.persona_reason || ""}
                      {persona?.customData?.persona_additional_info && (
                        <>{" " + persona.customData.persona_additional_info}</>
                      )}
                    </>
                  ) : (
                    persona?.personaCharacteristics || "설명 없음"
                  )}
                </Sub3>
              </div>

              <AiPersonaCardButtonWrap>
                <div style={{ flex: "1" }}>
                  <StyledButton
                    Medium
                    Primary
                    Fill
                    onClick={() => onCardSelect(persona._id)}
                    style={{
                      background: selectedCards[persona._id] ? palette.primary : '#F0F4FF',
                      color: selectedCards[persona._id] ? palette.white : palette.primary,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {selectedCards[persona._id] ? (
                        <>
                          <img src={images.IconCheck3} width="8" />
                          선택됨
                        </>
                      ) : (
                        "선택하기"
                      )}
                    </div>
                  </StyledButton>
                </div>
              </AiPersonaCardButtonWrap>
            </AiPersonaCardListItem>
          ))}
        </AiPersonaCardGroupWrap>
    </>
  );
};

export default MolculePresetPersona;

const StyledButton = styled(Button)`
  flex-grow: 1;

  &:hover {
    background: ${palette.chatGray};
  }
`;

const StarButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.isStarred ? `rgba(255, 149, 0, 0.10)` : palette.gray200};
  background: ${(props) =>
    props.isStarred ? `rgba(255, 149, 0, 0.10)` : palette.white};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
