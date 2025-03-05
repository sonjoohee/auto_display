import React from "react";
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

const OrganismPersonaCardList = ({ isStarred, setIsStarred, setShowPopup }) => {
  // 여기에서 페르소나 데이터를 가져오는 로직을 구현할 수 있습니다
  // 예: API 호출 또는 props로 전달받은 데이터 사용
  const personaData = [
    {
      id: 1,
      title: "스마트홈 자동화 유저",
      tags: ["남성", "20세", "은퇴 후 건강 관리에 집중", "부드러운 기상 선호"],
      description:
        "스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을 연구",
      type: "Haker",
    },
    {
      id: 2,
      title: "스마트홈 자동화 유저",
      tags: ["남성", "20세", "은퇴 후 건강 관리에 집중", "부드러운 기상 선호"],
      description:
        "스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을 연구 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을 연구, 스마트홈 기기와 연동하여 알람을 자동화하고, 커스텀 기능을 연구",
      type: "Haker",
    },
  ];

  // 데이터가 없는 경우 빈 상태 컴포넌트 표시
  if (!personaData || personaData.length === 0) {
    return <OrganismEmptyPersona />;
  }

  return (
    <AiPersonaCardGroupWrap>
      {personaData.map((persona) => (
        <AiPersonaCardListItem key={persona.id}>
          <div className="header">
            <UniqueTag color={persona.type} />
            <div className="title">
              <Body1 color="gray800">{persona.title}</Body1>
              <div>
                {persona.tags.map((tag, index) => (
                  <Sub3 key={index} color="gray700">
                    #{tag}
                  </Sub3>
                ))}
              </div>
            </div>
          </div>

          <div className="content">
            <Sub3 color="gray700">{persona.description}</Sub3>
          </div>

          <AiPersonaCardButtonWrap>
            <div>
              <StarButtonStyled
                onClick={() => setIsStarred(!isStarred)}
                isStarred={isStarred}
              >
                {isStarred ? (
                  <img src={images.StarFill} />
                ) : (
                  <img src={images.Star} />
                )}
              </StarButtonStyled>
            </div>

            <div>
              <StyledButton Medium Outline onClick={() => setShowPopup(true)}>
                프로필
              </StyledButton>
              <StyledButton Medium Primary Fill>
                채팅
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
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;
