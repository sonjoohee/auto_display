import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { useAtom } from "jotai";
import { KANO_MODEL_GRAPH_DATA } from "../../pages/AtomStates";

/**
 * 카노 모델(Kano Model) 그래프 컴포넌트
 * x축: 충족도(불충족 -> 충족)
 * y축: 만족도(불만족 -> 만족)
 */
const KanoModelGraph = () => {
  const [kanoModelGraphData] = useAtom(KANO_MODEL_GRAPH_DATA);
  // State for custom tooltip
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // 라벨 정의
  // const satisfactionLabels = {
  //   veryHigh: "매우 만족",
  //   high: "만족",
  //   neutral: "보통",
  //   low: "불만족",
  //   veryLow: "매우 불만족",
  // };

  // const fulfillmentLabels = {
  //   fulfilled: "충족",
  //   adequate: "보통",
  //   unfulfilled: "불충족",
  // };

  // 데이터 변환 함수
  // const transformKanoData = (kanoModelGraphData) => {
  //   console.log(
  //     "🚀 ~ transformKanoData ~ kanoModelGraphData:",
  //     kanoModelGraphData
  //   );
  //   if (!kanoModelGraphData || !Array.isArray(kanoModelGraphData)) return [];

  //   return kanoModelGraphData
  //     .map((data) => {
  //       return {
  //         x: data.CSP,
  //         y: data.CSM,
  //         title: Object.keys(data),
  //         size: 8,
  //       };
  //     })
  //     .flat();
  // };
  const transformKanoData = (kanoModelGraphData) => {
    if (
      !kanoModelGraphData ||
      typeof kanoModelGraphData !== "object" ||
      Array.isArray(kanoModelGraphData)
    ) {
      return [];
    }

    return Object.entries(kanoModelGraphData).map(([title, data], index) => {
      const xValue = data.CSP * 100;
      const yValue = (data.CSM + 1) * 100;
      const indexCode = String.fromCharCode(65 + index);

      return {
        x: xValue,
        y: yValue,
        title: title,
        indexCode: indexCode,
        size: 24,
      };
    });
  };

  const transformAverageKanoData = (kanoModelGraphData) => {
    if (
      !kanoModelGraphData ||
      typeof kanoModelGraphData !== "object" ||
      Array.isArray(kanoModelGraphData)
    ) {
      return { avgCSP: 0, avgCSM: 0 };
    }

    const dataEntries = Object.values(kanoModelGraphData);
    const numberOfEntries = dataEntries.length;

    if (numberOfEntries === 0) {
      return { avgCSP: 0, avgCSM: 0 };
    }

    const sumCSP = dataEntries.reduce((sum, data) => sum + data.CSP, 0);
    const sumCSM = dataEntries.reduce((sum, data) => sum + data.CSM, 0);

    const avgCSP = (sumCSP / numberOfEntries) * 100;
    const avgCSM = (sumCSM / numberOfEntries + 1) * 100;

    return { avgCSP, avgCSM };
  };

  // Helper function to rescale a single coordinate
  const rescaleCoordinate = (coord, average) => {
    // Handle edge cases where average is 0 or 100 to avoid division by zero
    if (average === 0) {
      // Map 0 -> 50, 100 -> 100
      return 50 + (coord / 100) * 50;
    } else if (average === 100) {
      // Map 0 -> 0, 100 -> 50
      return (coord / 100) * 50;
    }

    // Normal case: scale based on the average
    if (coord <= average) {
      // Map the range [0, average] to [0, 50]
      return (coord / average) * 50;
    } else {
      // coord > average
      // Map the range (average, 100] to (50, 100]
      return 50 + ((coord - average) / (100 - average)) * 50;
    }
  };

  // Function to rescale all data points
  const rescaleDataPoints = (dataPoints, averages) => {
    const { avgCSP, avgCSM } = averages;
    // Ensure averages are within the valid range [0, 100]
    const clampedAvgCSP = Math.max(0, Math.min(100, avgCSP));
    const clampedAvgCSM = Math.max(0, Math.min(100, avgCSM));

    return dataPoints.map((point) => ({
      ...point,
      x: rescaleCoordinate(point.x, clampedAvgCSP),
      // Apply rescaling to the y-coordinate as well
      y: rescaleCoordinate(point.y, clampedAvgCSM),
    }));
  };

  // Helper function to get quadrant name
  const getQuadrantName = (x, y) => {
    if (x > 50 && y > 50) return "One-dimensional"; // 일원적 품질 (우상단): 만족 높음, 불만족 낮음
    if (x <= 50 && y > 50) return "Attractive"; // 매력적 품질 (좌상단): 만족 낮음, 불만족 낮음
    if (x > 50 && y <= 50) return "Must-be"; // 당연 품질 (우하단): 만족 높음, 불만족 높음
    if (x <= 50 && y <= 50) return "Indifferent"; // 무관심 품질 (좌하단): 만족 낮음, 불만족 높음
    return "";
  };

  // 1. 기본 데이터 변환
  const transformedData = transformKanoData(kanoModelGraphData);
  // 2. 평균값 계산
  const averageKanoData = transformAverageKanoData(kanoModelGraphData);
  // 3. 데이터 리스케일링 (이제 rescaleDataPoints 함수가 위에 선언되어 접근 가능)
  const rescaledGraphData = rescaleDataPoints(transformedData, averageKanoData);
  // 4. 범례 데이터 생성
  const legendData = transformedData.map((item, index) => {
    const rescaledPoint = rescaledGraphData[index];
    const quadrantName = getQuadrantName(rescaledPoint.x, rescaledPoint.y);
    return {
      ...item,
      quadrantName: quadrantName,
    };
  });

  // legendData를 사분면으로 그룹화
  const groupedLegendData = {
    Attractive: [],
    "One-dimensional": [],
    "Must-be": [],
    Indifferent: [],
  };

  // 각 아이템을 해당 사분면 그룹에 추가
  legendData.forEach((item) => {
    groupedLegendData[item.quadrantName].push(item);
  });

  // Tooltip handlers
  const handleMouseEnter = (event, title, x, y) => {
    const graphAreaRect = event.currentTarget
      .closest("[data-graph-area]")
      .getBoundingClientRect();
    const pointRect = event.currentTarget.getBoundingClientRect();

    // Calculate position relative to GraphArea, adjusted for point size and desired offset
    const relativeX = pointRect.left - graphAreaRect.left + pointRect.width / 2;
    const relativeY = pointRect.top - graphAreaRect.top - 10; // 10px above the point

    setTooltipContent(title);
    setTooltipPosition({ x: relativeX, y: relativeY });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <GraphWrapper>
      {/* 전체 레이아웃 Wrapper */}
      <GraphContainer>
        {/* 그래프 영역 */}
        <GraphArea data-graph-area>
          {/* Average lines are now always at 50% after rescaling */}
          <GridLineVertical position={50} />
          <GridLineHorizontal position={50} />
          {/* Quadrant Labels */}
          <QuadrantLabel top="25%" left="75%">
            One-dimensional
          </QuadrantLabel>{" "}
          {/* Top-Right */}
          <QuadrantLabel top="25%" left="25%">
            Attractive
          </QuadrantLabel>{" "}
          {/* Top-Left */}
          <QuadrantLabel top="75%" left="75%">
            Must-be
          </QuadrantLabel>{" "}
          {/* Bottom-Right */}
          <QuadrantLabel top="75%" left="25%">
            Indifferent
          </QuadrantLabel>{" "}
          {/* Bottom-Left */}
          {/* 좌측 실선 라인 (위로 확장) */}
          <LeftAxisLine />
          {/* 좌측 상단 화살표 */}
          <LeftAxisArrow />
          {/* 하단 실선 라인 (우측으로 확장) */}
          <BottomAxisLine />
          {/* 우측 하단 화살표 */}
          <RightAxisArrow />
          {/* 데이터 포인트 - Use rescaled data and add event handlers */}
          {rescaledGraphData.map((point, index) => (
            <DataPoint
              key={index}
              x={point.x}
              y={point.y}
              size={point.size} // size prop 전달
              onMouseEnter={(e) =>
                // 툴크에는 여전히 title 표시
                handleMouseEnter(e, point.title, point.x, point.y)
              }
              onMouseLeave={handleMouseLeave}
            >
              {point.indexCode} {/* 데이터 포인트 내부에 인덱스 코드 렌더링 */}
            </DataPoint>
          ))}
          {/* Custom Tooltip */}
          {tooltipVisible && (
            <Tooltip
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
              }}
            >
              {tooltipContent}
            </Tooltip>
          )}
          {/* 곡선과 대각선 주석 처리 (임시로 화면에서 제거) */}
          {/* <GraphPath1 /> */}
          {/* <GraphPath2 /> */}
          {/* <GraphPath3 /> */}
        </GraphArea>
      </GraphContainer>
      {/* 범례 컨테이너 */}
      <LegendContainer>
        {/* 각 사분면 그룹별로 렌더링 */}
        {Object.entries(groupedLegendData).map(
          ([quadrantName, items]) =>
            items.length > 0 && (
              <div key={quadrantName}>
                <QuadrantTitle>{quadrantName}</QuadrantTitle>
                {items.map((item, idx) => (
                  <LegendItem key={idx}>
                    <span className="index-code">{item.indexCode}</span>
                    <span className="item-title">{item.title}</span>
                  </LegendItem>
                ))}
              </div>
            )
        )}
      </LegendContainer>
    </GraphWrapper>
  );
};

export default KanoModelGraph;

// 스타일 컴포넌트
const GraphContainer = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const GraphArea = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  background-color: ${palette.white};
`;

// 좌측 라인 - 위로 22px 확장
const LeftAxisLine = styled.div`
  position: absolute;
  left: 1px; /* 좌측 원의 중앙에 맞춤 */
  top: -22px; /* 위로 22px 확장 */
  width: 2px;
  height: calc(100% + 22px); /* 전체 높이 + 22px */
  background-color: ${palette.gray700};
  z-index: 2;
`;

// 하단 라인 - 우측으로 22px 확장
const BottomAxisLine = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: calc(100% + 22px); /* 우측으로 22px 확장 */
  height: 2px;
  background-color: ${palette.gray700};
  z-index: 2;
`;

// 좌측 축 원 - 우측으로 1px 이동
const LeftAxisCircle = styled.div`
  position: absolute;
  left: 2px; /* 기존 1px에서 1px 우측으로 이동: 1px + 1px = 2px */
  top: ${(props) => props.position}%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${palette.gray700};
  transform: translate(-50%, -50%);
  z-index: 4;
`;

// 하단 축 원 - z-index 조정
const BottomAxisCircle = styled.div`
  position: absolute;
  bottom: 0; /* 기존 위치 유지 */
  left: ${(props) => {
    // 첫 번째 원(position=25)의 위치를 좌측 끝단(0%)으로 이동
    if (props.position === 25) return "0%";
    // 중간 원은 그대로 50%에 위치
    if (props.position === 50) return "50%";
    // 마지막 원(position=75)의 위치를 우측 끝단(100%)으로 이동
    if (props.position === 75) return "100%";
    return `${props.position}%`;
  }};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${palette.gray700};
  transform: translate(-50%, 50%);
  z-index: 4; /* SVG 라인 위에 표시되도록 z-index 증가 */
`;

// 그리드 라인 z-index 조정
const GridLineVertical = styled.div`
  position: absolute;
  left: ${(props) => props.position}%;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: transparent;
  z-index: 1; /* SVG 라인 아래에 표시되도록 z-index 조정 */
  border-left: 2px dashed ${palette.outlineGray};
`;

const GridLineHorizontal = styled.div`
  position: absolute;
  left: 0;
  top: ${(props) => props.position}%;
  width: 100%;
  height: 2px;
  background-color: transparent;
  z-index: 1; /* SVG 라인 아래에 표시되도록 z-index 조정 */
  border-top: 2px dashed ${palette.outlineGray};
`;

// 라벨 텍스트 z-index 조정
const AxisCircleLabel = styled.div`
  position: absolute;
  right: calc(100% + 16px);
  top: ${(props) => props.position}%;
  font-family: "Pretendard", "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${palette.gray800};
  transform: translateY(-50%);
  text-align: right;
  white-space: nowrap;
  z-index: 4; /* SVG 라인 위에 표시되도록 z-index 증가 */
`;

const BottomCircleLabel = styled.div`
  position: absolute;
  bottom: -36px;
  left: ${(props) => {
    if (props.position === 25) return "0%";
    if (props.position === 50) return "50%";
    if (props.position === 75) return "100%";
    return `${props.position}%`;
  }};
  font-family: "Pretendard", "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${palette.gray800};
  white-space: nowrap;
  z-index: 4; /* SVG 라인 위에 표시되도록 z-index 증가 */

  ${(props) => {
    if (props.align === "left") {
      return `
        transform: translateX(0);
        text-align: left;
      `;
    } else if (props.align === "center") {
      return `
        transform: translateX(-50%);
        text-align: center;
      `;
    } else if (props.align === "right") {
      return `
        transform: translateX(-100%);
        text-align: right;
      `;
    }
  }}
`;

// 데이터 포인트
const DataPoint = styled.div`
  position: absolute;
  width: ${(props) => props.size}px; /* props로 크기 조절 */
  height: ${(props) => props.size}px; /* props로 크기 조절 */
  border-radius: 50%;
  background-color: ${palette.primary};
  border: 1px solid ${palette.primaryDark}; /* 테두리 추가 */
  left: ${(props) => props.x}%;
  top: ${(props) => 100 - props.y}%; /* y축 반전 */
  transform: translate(-50%, -50%);
  z-index: 3;
  /* 추가: 텍스트 중앙 정렬 및 스타일 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${palette.white};
  font-size: 12px; /* 폰트 크기 조절 */
  font-weight: bold;
  cursor: default; /* 기본 커서 유지 */
`;
// 좌측 상단 화살표 - 좌측으로 4px 이동
const LeftAxisArrow = styled.div`
  position: absolute;
  left: -7px; /* 기존 1px에서 4px 좌측으로 이동: 1px - 4px = -3px */
  top: -24px;
  width: 10px;
  height: 10px;
  z-index: 3;
  transform: rotate(-90deg);
  transform-origin: center;

  &:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray700};
    bottom: 0;
    right: 0;
    transform: translateY(-3px) rotate(45deg);
  }

  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray700};
    bottom: 0;
    right: 0;
    transform: translateY(3px) rotate(-45deg);
  }
`;

// 우측 하단 화살표 - 2px 우측으로 이동
const RightAxisArrow = styled.div`
  position: absolute;
  right: -24px; /* 2px 우측으로 이동 */
  bottom: 0px;
  width: 10px;
  height: 10px;
  z-index: 3;

  &:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray700};
    bottom: 0;
    right: 0;
    transform: translateY(-3px) rotate(45deg);
  }

  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray700};
    bottom: 0;
    right: 0;
    transform: translateY(3px) rotate(-45deg);
  }
`;

// '적당한' 위측 원 기준의 실선 추가
const CenterVerticalLine = styled.div`
  position: absolute;
  left: 50%; /* 중앙에 위치한 원('적당한' 위치의 원) */
  top: 0; /* 상단에서 시작 */
  width: 2px; /* 2px 두께의 실선 */
  height: 100%; /* 세로 점선과 동일한 길이 (상단부터 중간까지) */
  background-color: ${palette.gray300}; /* gray300 색상 */
  z-index: 2; /* 다른 요소들 위에 표시 */
  transform: translateX(-50%); /* 원의 중앙에 정확히 위치하도록 조정 */
`;

// '보통' 우측 원 기준의 가로 실선 추가
const MidLevelHorizontalLine = styled.div`
  position: absolute;
  left: 0; /* 좌측에서 시작 */
  top: 50%; /* 중간 높이('보통' 위치) */
  width: 100%; /* 가로 점선과 동일한 길이 (좌측부터 중간까지) */
  height: 2px; /* 2px 두께의 실선 */
  background-color: ${palette.gray300}; /* gray300 색상 */
  z-index: 2; /* 다른 요소들 위에 표시 */
  transform: translateY(-50%); /* 원의 중앙에 정확히 위치하도록 조정 */
`;

// '보통' 우측 원 기준의 가로 실선 화살표 - 위치 조정
const MidLevelHorizontalArrow = styled.div`
  position: absolute;
  left: calc(100% - 6px); /* 가로선의 우측 끝에서 좌측으로 6px 이동 */
  top: calc(50% - 4px); /* 중앙에서 위쪽으로 4px 이동 */
  width: 10px;
  height: 10px;
  z-index: 3;
  transform: translateY(-50%) rotate(0deg); /* 우측 방향으로 회전 (90도 회전) */

  &:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray300}; /* gray300 색상으로 변경 */
    bottom: 0;
    right: 0;
    transform: translateY(-3px) rotate(45deg);
  }

  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray300}; /* gray300 색상으로 변경 */
    bottom: 0;
    right: 0;
    transform: translateY(3px) rotate(-45deg);
  }
`;

// '적당한' 위측 원 기준의 세로 실선 화살표
const CenterVerticalArrow = styled.div`
  position: absolute;
  left: 50%;
  top: 0px;
  width: 10px;
  height: 10px;
  z-index: 3;
  transform: translateX(-50%); /* 중앙 정렬 */

  &:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray300}; /* gray300 색상으로 변경 */
    top: 0;
    left: 0;
    transform: translateX(-3px) rotate(-45deg);
  }

  &:after {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: ${palette.gray300}; /* gray300 색상으로 변경 */
    top: 0;
    left: 0;
    transform: translateX(3px) rotate(45deg);
  }
`;

// Add Tooltip styled component
const Tooltip = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10; /* Ensure tooltip is above other elements */
  transform: translate(
    -50%,
    -100%
  ); /* Position tooltip centered above the cursor/point */
  pointer-events: none; /* Prevent tooltip from blocking mouse events */
  transition: opacity 0.2s ease-in-out; /* Optional: add transition */
`;

// Add QuadrantLabel styled component
const QuadrantLabel = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translate(-50%, -50%); /* Center the label */
  font-family: "Pretendard", "Poppins", sans-serif;
  font-size: 14px; /* Adjust font size as needed */
  font-weight: 600; /* Make labels slightly bolder */
  color: ${palette.gray500}; /* Use a less prominent color */
  padding: 4px;
  border-radius: 4px;
  /* Optional: Add background for better readability if needed */
  /* background-color: rgba(255, 255, 255, 0.7); */
  z-index: 0; /* Ensure labels are behind grid lines and data points */
  pointer-events: none; /* Labels should not interfere with mouse events */
`;

// 그래프 내부 SVG 경로 1 (파란 곡선)
const GraphPath1 = () => (
  <svg
    width="55%"
    height="45%"
    viewBox="0 0 264 168"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      top: "0",
      right: "0",
      zIndex: 10,
      pointerEvents: "none",
      transform: "translate(-65%, -10%)", // 세로 중앙 정렬
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M254.194 0L263.957 20.9287L256.419 20.2705C249.982 85.6635 238.643 123.68 202.185 144.426C183.949 154.803 159.79 160.638 127.699 163.929C95.5747 167.223 55.0952 168 4 168C1.79086 168 0 166.209 0 164C0 161.791 1.79086 160 4 160C55.1018 160 95.2106 159.218 126.883 155.971C158.589 152.719 181.434 147.03 198.229 137.473C230.81 118.933 241.997 85.004 248.449 19.5744L240.95 18.9196L254.194 0Z"
      fill="#8FB5FF"
    />
  </svg>
);

// 그래프 내부 SVG 경로 2 (대각선)
const GraphPath2 = () => (
  <svg
    width="90%"
    height="100%"
    viewBox="0 0 396 336"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      top: "-5%", // 위쪽으로 이동
      left: "10%",
      zIndex: 5,
      pointerEvents: "none",
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M395.342 0.5L372.618 4.61689L377.754 10.6796L2.07474 328.927C0.389124 330.355 0.180227 332.879 1.60816 334.565C3.03609 336.25 5.56012 336.459 7.24574 335.031L382.925 16.7838L387.545 22.2381L395.342 0.5Z"
      fill="#D2DDFF"
    />
  </svg>
);

// 그래프 내부 SVG 경로 3 (회색 곡선)
const GraphPath3 = () => (
  <svg
    width="85%"
    height="65%"
    viewBox="0 0 368 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute",
      top: "105%", // 매우 불만족의 원(100%) 위치에 맞춤
      left: "15%", // 우측으로 이동
      zIndex: 5,
      pointerEvents: "none",
      transform: "translate(-5%, -100%)", // 하단 정렬
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M367.435 11.7057L347.338 0.328125L347.402 7.89693C252.432 9.73162 191.901 25.0026 142.014 55.5068C92.1774 85.9799 53.3143 131.481 1.38662 192.62C-0.0434732 194.304 0.162194 196.828 1.84597 198.258C3.52976 199.688 6.05406 199.483 7.48415 197.799C59.6277 136.405 97.6561 92.0069 146.187 62.332C194.406 32.8481 253.343 17.7241 347.47 15.8971L347.534 23.4213L367.435 11.7057Z"
      fill="#E0E4EB"
    />
  </svg>
);

// 전체 레이아웃을 위한 Wrapper 추가
const GraphWrapper = styled.div`
  display: flex;
  align-items: flex-start; /* 상단 정렬 */
  gap: 40px; /* 그래프와 범례 사이 간격 */
  justify-content: center; /* 중앙 정렬 */
  padding: 20px;
`;

// 범례 컨테이너 스타일
const LegendContainer = styled.div`
  width: 250px; /* 범례 너비 조절 */
  max-height: 500px; /* 그래프 높이와 맞춤 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 */
  padding: 10px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 8px;
  background-color: ${palette.white};
`;

// 범례 아이템 스타일 수정
const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2px; /* 간격 줄임 */
  margin-bottom: 8px;
  font-size: 13px;
  color: ${palette.gray800};
  width: 100%;

  .index-code {
    font-weight: bold;
    text-align: left; /* 왼쪽 정렬 */
    width: auto; /* 고정 너비 제거 */
    margin-right: 2px; /* 약간의 간격만 추가 */
    flex-shrink: 0;
  }

  .item-title {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left; /* 왼쪽 정렬 */
  }
`;

// 사분면 그룹 타이틀 스타일
const QuadrantTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${palette.gray800};
  margin: 12px 0 8px 0;
  padding-bottom: 4px;
  border-bottom: 1px solid ${palette.outlineGray};
  text-align: left; /* 왼쪽 정렬 추가 */

  &:first-child {
    margin-top: 0;
  }
`;
