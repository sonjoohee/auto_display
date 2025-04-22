import React from "react";
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
    // 입력 데이터가 객체이고 null이 아닌지 확인합니다.
    if (
      !kanoModelGraphData ||
      typeof kanoModelGraphData !== "object" ||
      Array.isArray(kanoModelGraphData)
    ) {
      return [];
    }

    // Object.entries를 사용하여 객체를 [key, value] 쌍의 배열로 변환합니다.
    return Object.entries(kanoModelGraphData).map(([title, data]) => {
      // CSP 값은 0 ~ 1 범위를 0 ~ 100 범위로 변환합니다.
      const xValue = data.CSP * 100;
      // CSM 값은 절대값을 취하고 백분율로 변환합니다.
      const yValue = Math.abs(data.CSM) * 100;

      return {
        x: xValue,
        y: yValue,
        title: title,
        size: 8,
      };
    });
  };

  const transformAverageKanoData = (kanoModelGraphData) => {
    // 입력 데이터가 유효한 객체인지 확인합니다.
    if (
      !kanoModelGraphData ||
      typeof kanoModelGraphData !== "object" ||
      Array.isArray(kanoModelGraphData)
    ) {
      return { avgCSP: 0, avgCSM: 0 }; // 유효하지 않으면 기본값 반환
    }

    const dataEntries = Object.values(kanoModelGraphData);
    const numberOfEntries = dataEntries.length;

    // 데이터가 없는 경우 기본값 반환
    if (numberOfEntries === 0) {
      return { avgCSP: 0, avgCSM: 0 };
    }

    // CSP와 CSM 값의 합계를 계산합니다.
    const sumCSP = dataEntries.reduce((sum, data) => sum + data.CSP, 0);
    const sumCSM = dataEntries.reduce(
      (sum, data) => sum + Math.abs(data.CSM),
      0
    );

    // 평균을 계산하고 백분율로 변환합니다.
    const avgCSP = (sumCSP / numberOfEntries) * 100;
    const avgCSM = (sumCSM / numberOfEntries) * 100;

    return { avgCSP, avgCSM };
  };

  const graphData = transformKanoData(kanoModelGraphData);
  const averageKanoData = transformAverageKanoData(kanoModelGraphData);

  return (
    <GraphContainer>
      {/* 그래프 영역 */}
      <GraphArea>
        {/* 평균 CSP 값으로 수직 기준선 그리기 */}
        <GridLineVertical position={averageKanoData.avgCSP} />
        {/* 평균 CSM 값으로 수평 기준선 그리기 */}
        <GridLineHorizontal position={averageKanoData.avgCSM} />

        {/* 좌측 실선 라인 (위로 확장) */}
        <LeftAxisLine />

        {/* 좌측 상단 화살표 */}
        <LeftAxisArrow />

        {/* 하단 실선 라인 (우측으로 확장) */}
        <BottomAxisLine />

        {/* 우측 하단 화살표 */}
        <RightAxisArrow />

        {/* 데이터 포인트 */}
        {graphData.map((point, index) => (
          <DataPoint key={index} x={point.x} y={point.y} size={point.size} />
        ))}

        {/* 곡선과 대각선 주석 처리 (임시로 화면에서 제거) */}
        {/* <GraphPath1 /> */}
        {/* <GraphPath2 /> */}
        {/* <GraphPath3 /> */}
      </GraphArea>
    </GraphContainer>
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
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background-color: ${palette.primary};
  border: 1px solid ${palette.primary};
  left: ${(props) => props.x}%;
  top: ${(props) => 100 - props.y}%; /* y축 반전 (0이 아래, 100이 위) */
  transform: translate(-50%, -50%);
  z-index: 3;
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
