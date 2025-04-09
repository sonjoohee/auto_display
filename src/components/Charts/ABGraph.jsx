import React from 'react';
import styled from 'styled-components';
import { palette } from '../../assets/styles/Palette';
import { useAtom } from 'jotai';
import { QUICK_SURVEY_STATIC_DATA } from '../../pages/AtomStates';

const ABGraph = () => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);
  
  // 높이 계산 함수 - 백분율 값에 따라 가변적으로 높이 설정
  const getBarHeight = (value) => {
    console.log("getBarHeight value:", value);
    // 최소 높이와 최대 높이 설정
    const minHeight = 50;
    const maxHeight = 200;
    
    // 백분율 값에 따라 선형적으로 높이 계산
    // 0%일 때 minHeight, 100%일 때 maxHeight가 되도록 설정
    const height = minHeight + (value / 100) * (maxHeight - minHeight);
    console.log("getBarHeight height:", height);
    // 소수점 반올림하여 정수 값 반환
    return Math.round(height);
  };

  // 백분율 계산 함수
  const calculatePercentage = (value, total) => {
    return Math.round((value / total) * 100);
  };

  // 데이터 계산
  const getABData = () => {
    const totalSum = quickSurveyStaticData['총합']['전체총합'];
    const aValue = quickSurveyStaticData[Object.keys(quickSurveyStaticData)[0]]['전체총합'];
    const bValue = quickSurveyStaticData[Object.keys(quickSurveyStaticData)[1]]['전체총합'];

    return {
      a: calculatePercentage(aValue, totalSum),
      b: calculatePercentage(bValue, totalSum)
    };
  };

  const calculatedData = getABData();

  return (
    <GraphContainer>
      <BarContainer>
        <BarWrapper>

          <BarItem onClick={() => console.log("Clicked Bar Value:", calculatedData.a)}>
            <BarFill height={getBarHeight(calculatedData.a)} />
            <BarValue>{calculatedData.a}%</BarValue>

          </BarItem>
          <BarLabel>{Object.keys(quickSurveyStaticData)[0]}</BarLabel>
        </BarWrapper>

        <BarWrapper>
          <BarItem onClick={() => console.log("Clicked Bar Value:", calculatedData.b)}>
            <BarFill height={getBarHeight(calculatedData.b)} />
            <BarValue>{calculatedData.b}%</BarValue>

          </BarItem>
          <BarLabel>{Object.keys(quickSurveyStaticData)[1]}</BarLabel>
        </BarWrapper>
      </BarContainer>
    </GraphContainer>
  );
};

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 320px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  gap: 272px;
`;

const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 143px;
`;

const BarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const BarFill = styled.div`
  width: 143px;
  height: ${(props) => props.height}px;
  background-color: ${palette.primary};
  border-radius: 5px;
`;

const BarValue = styled.span`
  font-family: "Pretendard", "Poppins";
  font-weight: 600;
  font-size: 20px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${palette.primary};
  text-align: center;
`;

const BarLabel = styled.span`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
  text-align: center;
`;

export default ABGraph;
