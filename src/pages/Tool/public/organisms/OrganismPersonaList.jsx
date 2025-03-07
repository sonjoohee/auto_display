import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  TabWrapType3,
  TabButtonType3,
  ListBoxWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import MoleculePersonaListItem from "../molecules/MoleculePersonaListItem";
import OrganismNoPersonaMessage from "./OrganismNoPersonaMessage";
import { palette } from "../../../../assets/styles/Palette";

const OrganismPersonaList = ({
  personaListSaas,
  personaImages,
  selectedPersonaButtons,
  handlePersonaButtonClick,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState("my_persona");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      {personaListSaas && personaListSaas.length > 0 ? (
        <ToolPublicPersonaWrap>
          <AiPersonaContent>
            <TabWrapType3 Border>
              <TabButtonType3
                className={activeTab === "my_persona" ? "active" : ""}
                onClick={() => handleTabClick("my_persona")}
                style={
                  activeTab === "my_persona"
                    ? { color: "#333333" }
                    : { color: "#999999" }
                }
              >
                My Persona
              </TabButtonType3>
              <TabButtonType3
                className={activeTab === "macro_segment" ? "active" : ""}
                onClick={() => handleTabClick("macro_segment")}
                style={
                  activeTab === "macro_segment"
                    ? { color: "#333333" }
                    : { color: "#999999" }
                }
              >
                Macro Segment
              </TabButtonType3>
              <TabButtonType3
                className={activeTab === "unique_user" ? "active" : ""}
                onClick={() => handleTabClick("unique_user")}
                style={
                  activeTab === "unique_user"
                    ? { color: "#333333" }
                    : { color: "#999999" }
                }
              >
                Unique User
              </TabButtonType3>
              <TabButtonType3
                className={activeTab === "key_stakeholder" ? "active" : ""}
                onClick={() => handleTabClick("key_stakeholder")}
                style={
                  activeTab === "key_stakeholder"
                    ? { color: "#333333" }
                    : { color: "#999999" }
                }
              >
                Key Stakeholder
              </TabButtonType3>
            </TabWrapType3>
            <ListBoxWrap Border>
              {personaListSaas
                .filter((persona) => {
                  if (activeTab === "my_persona") {
                    return persona.favorite === true;
                  }
                  return persona.personaType === activeTab;
                })
                .map((persona, index) => (
                  <MoleculePersonaListItem
                    key={persona.id || `persona${index}`}
                    personaImage={
                      personaImages[persona.imageKey] ||
                      personaImages.PersonaWomen01
                    }
                    personaTitle={persona.personaName || ""}
                    badgeType={persona.badgeType || ""}
                    badgeText={persona.badgeText || ""}
                    personaId={persona.id || `persona${index}`}
                    isSelected={
                      selectedPersonaButtons[persona.id || `persona${index}`]
                    }
                    personaInfo={persona || ""}
                    onPersonaButtonClick={handlePersonaButtonClick}
                  />
                ))}
            </ListBoxWrap>
          </AiPersonaContent>
        </ToolPublicPersonaWrap>
      ) : (
        <ToolPublicPersonaWrap NoData onClick={() => onNavigate("/AiPersona")}>
          <OrganismNoPersonaMessage />
        </ToolPublicPersonaWrap>
      )}
    </>
  );
};

export default OrganismPersonaList;

const ToolPublicPersonaWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${(props) =>
    props.NoData &&
    css`
      gap: 20px;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      border-radius: 10px;
      border: 1px solid ${palette.outlineGray};
      transition: all 0.2s ease-in-out;
      &:hover {
        border-color: ${palette.primary};
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
      }
    `}
`;
const AiPersonaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
