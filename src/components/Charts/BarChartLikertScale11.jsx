import React from 'react';
import styled from 'styled-components';
import { palette } from '../../assets/styles/Palette';

// 11개 척도의 그래프를 위한 데이터 구조
// [{ value: number, label: string }, ...]
const BarChartLikertScale11 = ({ 
  data = [
    { value: 4, label: '0' },
    { value: 2, label: '1' },
    { value: 7, label: '2' },
    { value: 4, label: '3' },
    { value: 2, label: '4' },
    { value: 31, label: '5' },
    { value: 4, label: '6' },
    { value: 13, label: '7' },
    { value: 20, label: '8' },
    { value: 11, label: '9' },
    { value: 2, label: '10' }
  ],
  showLegend = true
}) => {
  // 그룹별 바 인덱스 범위 정의
  const groupRanges = {
    negative: [0, 1, 2, 3, 4], // 0-4: 비추천 그룹
    neutral: [5],              // 5: 중립 그룹
    positive: [6, 7, 8, 9, 10] // 6-10: 추천 그룹
  };

  return (
    <GraphContainer>
      <BarContainer>
        {data.map((item, index) => (
          <BarItem key={index}>
            <BarValue>{item.value}%</BarValue>
            <BarGroup>
              <BarBackground />
              <BarFill height={item.value} />
            </BarGroup>
            <BarLabel>{item.label}</BarLabel>
          </BarItem>
        ))}
      </BarContainer>

      {showLegend && (
        <LegendContainer>
          <GroupContainer width="445px">
            <LegendColor color="#E0E4EB" />
            <GroupLabel>비추천 그룹</GroupLabel>
          </GroupContainer>
          <GroupContainer width="110px">
            <LegendColor color="#CEDAFF" />
            <GroupLabel>중립 그룹</GroupLabel>
          </GroupContainer>
          <GroupContainer width="110px">
            <LegendColor color={palette.primary} />
            <GroupLabel>추천 그룹</GroupLabel>
          </GroupContainer>
        </LegendContainer>
      )}
    </GraphContainer>
  );
};

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 713px;
  gap: 16px;
  min-height: 373px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
`;

const BarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 43px;
  margin-top: 20px;
`;

const BarGroup = styled.div`
  position: relative;
  width: 43px;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const BarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 5px;
`;

const BarFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => Math.max(props.height, 1)}%;
  background-color: ${palette.primary};
  border-radius: 5px;
`;

const BarValue = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 600;
  font-size: 20px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${palette.primary};
`;

const BarLabel = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-align: center;
  color: #323232;
  margin-top: 12px;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  margin-top: 8px;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || 'auto'};
  gap: 8px;
`;

const GroupLabel = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
  text-align: left;
`;

const LegendColor = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.color};
  border-radius: 2px;
`;

export default BarChartLikertScale11; 