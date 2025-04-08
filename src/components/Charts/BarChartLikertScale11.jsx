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
  showLegend = true,
  npsScore = 32
}) => {
  // 그룹별 바 인덱스 범위 정의
  const groupRanges = {
    negative: [0, 1, 2, 3, 4], // 0-4: 비추천 그룹
    neutral: [5],              // 5: 중립 그룹
    positive: [6, 7, 8, 9, 10] // 6-10: 추천 그룹
  };

  // NPS 점수에 따른 스타일 결정
  const getNpsStyle = (score) => {
    if (score >= -100 && score <= -50) return { color: '#EB7167', text: 'Critical\n(위험)' };
    if (score >= -49 && score <= -1) return { color: '#F6B64C', text: 'Weak\n(취약)' };
    if (score >= 0 && score <= 49) return { color: '#5080E9', text: 'Good\n(양호)' };
    if (score >= 50 && score <= 74) return { color: '#4BC077', text: 'Great\n(우수)' };
    if (score >= 75 && score <= 100) return { color: '#4BC077', text: 'Excellent\n(탁월함)' };
    return { color: '#5080E9', text: 'Good\n(양호)' }; // 기본값
  };

  const npsStyle = getNpsStyle(npsScore);

  return (
    <MainContainer>
      <ContentContainer>
        <BarContainer>
          {data.map((item, index) => {
            // 바 색상 결정
            let barColor = '#E0E4EB'; // 기본 바 색상 
            let valueColor = palette.grayScale500; // 기본 숫자 색상
            
            // 9~10번 인덱스만 primary 색상 적용
            if (index >= 9) {
              barColor = palette.primary;
              valueColor = palette.primary;
            }
            // 7,8번 인덱스에 CFDAFF 색상 적용
            else if (index === 7 || index === 8) {
              barColor = '#CFDAFF';
              valueColor = '#819FFF';
            }
            // 중립 그룹(5번 인덱스)에 기본 색상 적용
            else if (index === 5) {
              barColor = '#E0E4EB';
              valueColor = palette.grayScale500;
            }
            
            return (
              <BarItem key={index}>
                <BarValue color={valueColor}>{item.value}%</BarValue>
                <BarGroup>
                  <BarBackground />
                  <BarFill height={item.value} color={barColor} />
                </BarGroup>
                <BarLabel>{item.label}</BarLabel>
              </BarItem>
            );
          })}
        </BarContainer>

        {showLegend && (
          <LegendContainer>
            <GroupContainer width="393px">
              <LegendColor color="#E0E4EB" />
              <GroupLabel>비추천 그룹</GroupLabel>
            </GroupContainer>
            <GroupContainer width="98px">
              <LegendColor color="#CFDAFF" />
              <GroupLabel>중립 그룹</GroupLabel>
            </GroupContainer>
            <GroupContainer width="97px">
              <LegendColor color={palette.primary} />
              <GroupLabel>추천 그룹</GroupLabel>
            </GroupContainer>
          </LegendContainer>
        )}
      </ContentContainer>

      <NpsScoreContainer>
        <NpsScoreHeader>NPS 점수</NpsScoreHeader>
        <NpsScoreCircle color={npsStyle.color}>
          <NpsScoreValue>{npsScore}</NpsScoreValue>
        </NpsScoreCircle>
        <NpsScoreLabel color={npsStyle.color}>
          {npsStyle.text.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </NpsScoreLabel>
      </NpsScoreContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 31px;
  padding-bottom: 16px;
  width: 820px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 636px;
  gap: 16px;
  min-height: 373px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 24px;
`;

const BarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: 36px;
  margin-top: 20px;
`;

const BarGroup = styled.div`
  position: relative;
  width: 36px;
  height: 200px;
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
  background-color: ${props => props.color || palette.primary};
  border-radius: 5px;
`;

const BarValue = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 600;
  font-size: 16px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${props => props.color || '#8C8C8C'};
`;

const BarLabel = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 14px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-align: center;
  color: #323232;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  margin-top: 16px;
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
  height: 4px;
  background: ${props => props.color};
  border-radius: 2px;
`;

const NpsScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background-color: #F7F8FA;
  border-radius: 15px;
  padding: 24px;
  width: 143px;
  height: 250px;
  margin: 0;
  transform: translateY(-20px);
`;

const NpsScoreHeader = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 700;
  font-size: 12px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #323232;
  text-align: center;
`;

const NpsScoreCircle = styled.div`
  width: 77.25px;
  height: 77.25px;
  border-radius: 50%;
  background-color: ${props => props.color || '#5080E9'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NpsScoreValue = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #FFFFFF;
`;

const NpsScoreLabel = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 700;
  font-size: 12px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: ${props => props.color || '#5080E9'};
  text-align: center;
`;

export default BarChartLikertScale11;