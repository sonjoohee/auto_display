import React, { useState, useEffect } from "react";
import { Body1, Sub3 } from "../../../../assets/styles/Typography";
import {
  AiPersonaCardGroupWrap,
  AiPersonaCardListItem,
  AiPersonaCardButtonWrap,
  UniqueTag,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { Button } from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import OrganismEmptyPersona from "./OrganismEmptyPersona";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import {
  updatePersonaOnServer,
  getPersonaListOnServer,
} from "../../../../utils/indexedDB";

const OrganismPersonaCardList = ({
  personaData = [],
  setIsStarred = () => {},
  setShowPopup = () => {},
  activeTab = "macro_segment", // 기본 탭은 macro_segment로 설정
  setPersonaStats = () => {}, // 페르소나 통계 정보를 부모 컴포넌트에 전달하는 함수
}) => {
  // 활성화된 탭에 따라 필터링된 페르소나 데이터
  const [filteredPersonaData, setFilteredPersonaData] = useState([]);

  // 탭이 변경될 때마다 데이터 필터링 및 통계 계산
  useEffect(() => {
    if (!personaData || personaData.length === 0) {
      setFilteredPersonaData([]);
      setPersonaStats({ active: 0, inactive: 0, generating: 0 });
      return;
    }

    let filtered = [];

    // 'my_persona' 탭인 경우 favorite이 true인 항목만 표시
    if (activeTab === "my_persona") {
      filtered = personaData.filter((persona) => persona?.favorite === true);
    } else {
      // 선택된 탭에 맞는 personaType을 가진 데이터만 필터링
      filtered = personaData.filter(
        (persona) => persona?.personaType === activeTab
      );
    }

    setFilteredPersonaData(filtered);

    // 현재 탭의 활성/생성 중/비활성 페르소나 수 계산
    const activeCount = filtered.filter(
      (persona) => persona?.status === "complete"
    ).length;

    const generatingCount = filtered.filter(
      (persona) => persona?.status === "ing"
    ).length;

    const inactiveCount = filtered.filter(
      (persona) => persona?.status !== "complete" && persona?.status !== "ing"
    ).length;

    // 통계 정보를 부모 컴포넌트에 전달
    setPersonaStats({
      active: activeCount,
      inactive: inactiveCount,
      generating: generatingCount,
    });
  }, [personaData, activeTab, setPersonaStats]);

  // 즐겨찾기 토글 함수
  const toggleFavorite = async (persona) => {
    if (!persona || !persona._id) return;

    try {
      // 페르소나 객체의 favorite 값을 반전
      const updatedPersona = {
        id: persona._id,
        favorite: !persona.favorite,
      };

      // 서버에 업데이트된 페르소나 저장
      await updatePersonaOnServer(updatedPersona, true);

      // 서버에서 최신 데이터 다시 불러오기
      const projectId =
        persona.projectId || localStorage.getItem("currentProjectId");
      if (projectId) {
        const refreshedData = await getPersonaListOnServer(projectId, true);
        if (refreshedData) {
          // 부모 컴포넌트에 새로운 데이터 전달
          setIsStarred(refreshedData);
          return;
        }
      }

      // 서버에서 데이터를 가져오지 못한 경우 로컬에서 업데이트
      // 필터링된 데이터 업데이트
      setFilteredPersonaData((prevData) =>
        prevData.map((p) => {
          if (p._id === persona._id) {
            return { ...p, favorite: !p.favorite };
          }
          return p;
        })
      );
    } catch (error) {
      console.error("즐겨찾기 업데이트 실패:", error);
    }
  };

  // 데이터가 없는 경우 빈 상태 컴포넌트 표시
  if (!filteredPersonaData || filteredPersonaData.length === 0) {
    return <OrganismEmptyPersona />;
  }

  return (
    <AiPersonaCardGroupWrap>
      {filteredPersonaData.map((persona) => (
        <AiPersonaCardListItem key={persona?._id || `persona-${Math.random()}`}>
          <div className="header">
            <UniqueTag color={persona?.type || "default"} />
            <div className="title">
              <Body1 color="gray800">
                {persona?.personaName || "제목 없음"}
              </Body1>
              <div>
                <Sub3 color="gray700">#{persona?.gender || ""}</Sub3>
                <Sub3 color="gray700">#{persona?.age || ""}</Sub3>
                <Sub3 color="gray700">#{persona?.keywords[0] || ""}</Sub3>
                <Sub3 color="gray700">#{persona?.keywords[1] || ""}</Sub3>
              </div>
            </div>
          </div>

          <div className="content">
            <Sub3 color="gray700">
              {persona?.personaCharacteristics || "설명 없음"}
            </Sub3>
          </div>

          <AiPersonaCardButtonWrap>
            <div>
              <StarButtonStyled
                onClick={() => toggleFavorite(persona)}
                isStarred={persona?.favorite || false}
              >
                {persona?.favorite ? (
                  <img src={images?.StarFill || ""} alt="즐겨찾기 됨" />
                ) : (
                  <img src={images?.Star || ""} alt="즐겨찾기" />
                )}
              </StarButtonStyled>
            </div>

            <div>
              <StyledButton
                Medium
                Outline
                onClick={() => setShowPopup(persona)}
              >
                프로필
              </StyledButton>
              <StyledButton Medium Primary Fill>
                페르소나 생성
              </StyledButton>
            </div>
          </AiPersonaCardButtonWrap>
        </AiPersonaCardListItem>
      ))}
    </AiPersonaCardGroupWrap>
  );
};

export default OrganismPersonaCardList;

const StyledButton = styled(Button)`
  min-width: 92px;
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
