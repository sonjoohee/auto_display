import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import {
  IDEA_GENERATION_SELECTED_START_POSITION,
  PROJECT_SAAS,
  IDEA_GENERATION_SELECTED_MANDALART,
} from "../../../../AtomStates";
import { useAtom } from "jotai";

const MoleculeMandalArtGraph = ({ mandalartData }) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [ideaGenerationSelectedStartPosition] = useAtom(
    IDEA_GENERATION_SELECTED_START_POSITION
  );
  // console.log(
  //   "🚀 ~ MoleculeMandalArtGraph ~ ideaGenerationSelectedStartPosition:",
  //   ideaGenerationSelectedStartPosition
  // );
  const [, setIdeaGenerationSelectedMandalart] = useAtom(
    IDEA_GENERATION_SELECTED_MANDALART
  );
  const [projectSaas] = useAtom(PROJECT_SAAS);


  const mandalartButtons = [
    // 1, 2, 3 위치 (왼쪽 상단, 중앙 상단, 오른쪽 상단)
    ...ideaGenerationSelectedStartPosition.slice(0, 3).map((item, index) => ({
      id: index + 1,
      text: item.theme,
      isCenter: false,
      displayOrder: index + 1 // 1, 2, 3
    })),
    
    // 8 위치 (왼쪽 중앙)
    {
      id: 8,
      text: ideaGenerationSelectedStartPosition[7]?.theme || "",
      isCenter: false,
      displayOrder: 4 // 표시 순서 4번째
    },
    
    // 0 위치 (중앙)
    {
      id: 0,
      text: projectSaas?.projectTitle || "아이디어 발상",
      isCenter: true,
      displayOrder: 5 // 표시 순서 5번째
    },
    
    // 4 위치 (오른쪽 중앙)
    {
      id: 4,
      text: ideaGenerationSelectedStartPosition[3]?.theme || "",
      isCenter: false,
      displayOrder: 6 // 표시 순서 6번째
    },
    
    // 7, 6, 5 위치 (왼쪽 하단, 중앙 하단, 오른쪽 하단)
    {
      id: 7,
      text: ideaGenerationSelectedStartPosition[6]?.theme || "",
      isCenter: false,
      displayOrder: 7 // 표시 순서 7번째
    },
    {
      id: 6,
      text: ideaGenerationSelectedStartPosition[5]?.theme || "",
      isCenter: false,
      displayOrder: 8 // 표시 순서 8번째
    },
    {
      id: 5,
      text: ideaGenerationSelectedStartPosition[4]?.theme || "",
      isCenter: false,
      displayOrder: 9 // 표시 순서 9번째
    },
  ];

  // displayOrder 기준으로 정렬
  mandalartButtons.sort((a, b) => a.displayOrder - b.displayOrder);

  console.log("mandalartButtons", mandalartButtons);
  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
    setIdeaGenerationSelectedMandalart(itemId);
    console.log("itemId", itemId);
  };

  const handleBackClick = () => {
    setSelectedItem(null);
    setIdeaGenerationSelectedMandalart(null);
  };

  const generateDetailButtons = () => {
    if (!selectedItem || !mandalartData) return [];

    // 선택된 아이템의 데이터 찾기
    const selectedData = mandalartData[selectedItem - 1];

    if (!selectedData?.detailed_execution_ideas) return [];

    // detailed_execution_ideas에서 idea_title만 사용
    const detailButtons = selectedData.detailed_execution_ideas.map(
      (item, index) => ({
        id: index + 1,
        text: item.idea_title,
        isCenter: false,
      })
    );

    // 중앙 버튼을 5번째 위치에 삽입
    const centerButton = {
      id: 0,
      text: `Theme.${selectedItem} ${
        ideaGenerationSelectedStartPosition[selectedItem - 1].theme
      }`,
      isCenter: true,
    };

    // 앞의 4개 버튼 + 중앙 버튼 + 나머지 버튼들
    return [
      ...detailButtons.slice(0, 4),
      centerButton,
      ...detailButtons.slice(4),
    ];
  };

  return (
    <ChartContainer>
      {!selectedItem ? (
        <MandalartGrid>
          {mandalartButtons.map((button, index) => (
            <MandalartButton
              key={index}
              position={button.displayOrder}
              themeText={button.text}
              isCenterBox={button.isCenter}
              onClick={
                !button.isCenter ? () => handleItemClick(button.id) : undefined
              }
              hasOutline={true}
            >
              {button.isCenter
                ? button.text
                : `Theme.${button.id} ${button.text}`}
            </MandalartButton>
          ))}
        </MandalartGrid>
      ) : (
        <MandalartGrid>
          {generateDetailButtons().map((button, index) => (
            <MandalartButton
              key={index}
              themeText={button.text}
              isCenterBox={button.isCenter}
              position={button.displayOrder}
              isDetailView={true}
              onClick={button.isCenter ? handleBackClick : undefined}
              hasOutline={true}
            >
              {button.isCenter
                ? button.text
                : `Idea.${button.id} ${button.text}`}
              {button.isCenter && (
                <BackNavigationText>
                  <BackIcon
                    viewBox="0 0 12 13"
                    width="12"
                    height="13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_42_615)">
                      <path
                        d="M0.929993 9.44996H7.94999C8.77747 9.44996 9.57105 9.12125 10.1562 8.53613C10.7413 7.95102 11.07 7.15744 11.07 6.32996C11.07 5.50249 10.7413 4.7089 10.1562 4.12379C9.57105 3.53867 8.77747 3.20996 7.94999 3.20996H5.60999"
                        stroke="#8C8C8C"
                        strokeWidth="0.78"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.26999 7.10986L0.929993 9.44986L3.26999 11.7899"
                        stroke="#8C8C8C"
                        strokeWidth="0.78"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_42_615">
                        <rect
                          width="12"
                          height="12"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </BackIcon>
                  되돌아가기
                </BackNavigationText>
              )}
            </MandalartButton>
          ))}
        </MandalartGrid>
      )}
    </ChartContainer>
  );
};

// 스타일 컴포넌트
const ChartContainer = styled.div`
  width: 560px;
  height: 452px;
  background-color: ${palette.white};
  border-radius: 10px;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MandalartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 176px);
  grid-template-rows: repeat(3, 140px);
  gap: 16px;
  width: 100%;
  height: 100%;
`;

const MandalartButton = styled.div`
  width: 176px;
  height: 140px;
  background-color: ${(props) => {
    if (props.isCenterBox && !props.isDetailView) return palette.primary;
    if (props.isCenterBox && props.isDetailView) return "#F4F8FF";
    if (!props.isCenterBox && props.isDetailView) return "#FFFFFF";
    return "#F4F8FF";
  }};
  border: ${(props) => {
    // F4F8FF 색상인 경우 테두리 없음, 나머지는 항상 동일한 색상 테두리
    const bgColor =
      props.isCenterBox && !props.isDetailView
        ? palette.primary
        : props.isCenterBox && props.isDetailView
        ? "#F4F8FF"
        : !props.isCenterBox && props.isDetailView
        ? "#FFFFFF"
        : "#F4F8FF";

    return bgColor === "#F4F8FF" ? "none" : "1px solid #E0E4EB";
  }};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  font-family: "Pretendard", "Poppins";
  font-weight: ${(props) => (props.isCenterBox ? "600" : "500")};
  font-size: 16px;
  text-align: center;
  color: ${(props) => {
    if (props.isCenterBox && !props.isDetailView) return palette.white;
    return palette.gray800;
  }};
  cursor: ${(props) => {
    if (props.isCenterBox && !props.isDetailView) return "default";
    if (props.isCenterBox && props.isDetailView) return "pointer";
    if (!props.isCenterBox && !props.isDetailView) return "pointer";
    return "default";
  }};
  transition: background-color 0.2s ease;

  &:hover {
    ${(props) => {
      if (
        (props.isCenterBox && props.isDetailView) ||
        (!props.isCenterBox && !props.isDetailView)
      ) {
        return `
          background-color: #E6F0FF;
        `;
      }
      return "";
    }}
  }
`;

const BackNavigationText = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #8c8c8c;
`;

const BackIcon = styled.svg`
  margin-right: 4px;
`;

export default MoleculeMandalArtGraph;
