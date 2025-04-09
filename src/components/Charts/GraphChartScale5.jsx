import React from 'react';
import styled from 'styled-components';

const GraphChartScale5 = ({ data = defaultData }) => {
  // 각 중요도 레벨별 합계 계산
  const rowSums = importanceLabels.map((_, index) => {
    const rowKey = `row${index + 1}`;
    const values = data[rowKey];
    return values.reduce((sum, val) => sum + val, 0);
  });

  return (
    <ChartContainer>
      <HeaderSection>
        <HeaderRow>
          <CategoryHeader>
            <EmptySpace />
            <CategoryLabels>
              <CategoryItem>점수</CategoryItem>
              <CategoryItem>계</CategoryItem>
            </CategoryLabels>
          </CategoryHeader>
          <CategoriesContainer>
            <DemographicItem>남</DemographicItem>
            <DemographicItem>여</DemographicItem>
            <DemographicItem>10대</DemographicItem>
            <DemographicItem>20대</DemographicItem>
            <DemographicItem>30대</DemographicItem>
            <DemographicItem>40대</DemographicItem>
            <DemographicItem>50대</DemographicItem>
            <DemographicItem>60대<br />이상</DemographicItem>
          </CategoriesContainer>
        </HeaderRow>
        <HorizontalLine marginTop="16px" marginBottom="0" />
      </HeaderSection>

      <DataSection>
        <VerticalLine />
        <RightVerticalLine />
        <ImportanceContainer>
          <ImportanceLabelsColumn>
            {importanceLabels.map((label, index) => (
              <ImportanceLabel key={`label-${index}`}>{label}</ImportanceLabel>
            ))}
          </ImportanceLabelsColumn>
          
          <BarsColumn>
            {importanceLabels.map((_, index) => {
              const barWidth = Math.min(70, calculateBarWidth(index));
              return (
                <div key={`bar-container-${index}`} style={{ position: 'relative' }}>
                  <ImportanceBar key={`bar-${index}`} width={barWidth} />
                  <BarValue>{rowSums[index]}</BarValue>
                </div>
              );
            })}
          </BarsColumn>
        </ImportanceContainer>

        <DataRowsContainer>
          {Object.keys(data).map((key, rowIndex) => (
            <React.Fragment key={`row-${key}`}>
              <DataRowGroup>
                <DataRowValues>
                  {data[key].map((value, index) => (
                    <DataCell key={`${key}-${index}`}>{value}</DataCell>
                  ))}
                </DataRowValues>
              </DataRowGroup>
              {rowIndex < Object.keys(data).length - 1 && (
                <DataSectionHorizontalLine />
              )}
            </React.Fragment>
          ))}
        </DataRowsContainer>
      </DataSection>
    </ChartContainer>
  );
};

// 데이터 형식: [남성, 여성, 10대, 20대, 30대, 40대, 50대, 60대 이상]
const defaultData = {
  row1: [7, 6, 8, 7, 5, 4, 6, 7],
  row2: [5, 6, 7, 5, 6, 7, 5, 4],
  row3: [4, 3, 5, 6, 4, 5, 3, 4],
  row4: [3, 4, 2, 3, 5, 6, 4, 3],
  row5: [2, 2, 1, 3, 4, 2, 3, 2]
};

const importanceLabels = [
  "매우 중요함",
  "중요함",
  "보통",
  "중요하지 않음",
  "전혀 중요하지 않음"
];

const ChartContainer = styled.div`
  padding: 28px 24px 24px 24px;
  border: 1px solid #E0E4EB;
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 820px;
  box-sizing: border-box;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  width: 291px;
  padding-left: 0;
`;

const EmptySpace = styled.div`
  width: 0;
`;

const CategoryLabels = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 160px;
  margin-left: 60px;
  gap: 0;
`;

const CategoryItem = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 700;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  &:first-child {
    width: 60px;
  }
  &:last-child {
    width: 62px;
    margin-left: 60px;
  }
`;

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 55px);
  margin-left: 12px;
  gap: 4px;
  align-items: center;
  width: 455px;
`;

const DemographicItem = styled.div`
  width: 55px;
  font-family: 'Pretendard', 'Poppins';
  font-weight: 700;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  white-space: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 36px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #DDDDDD;
  margin-top: ${props => props.marginTop || '4px'};
  margin-bottom: ${props => props.marginBottom || '4px'};
`;

const DataSection = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  height: 180px; /* 중요도 라벨 5개(16px) + 간격 4개(25px) = 80px + 100px = 180px */
`;

const VerticalLine = styled.div`
  position: absolute;
  height: calc(100% + 56px + 24px + 2px); /* DataSection 높이(100%) + 헤더 여백(56px) + 하단 패딩(24px) + 테두리(2px) */
  width: 1px;
  background-color: #DDDDDD;
  left: 303px; /* ImportanceContainer 너비(291px) + 약간의 간격(12px) */
  top: -56px; /* 헤더 여백만큼 위로 확장 */
  z-index: 1;
`;

const RightVerticalLine = styled.div`
  position: absolute;
  height: calc(100% + 56px + 24px + 2px); /* DataSection 높이(100%) + 헤더 여백(56px) + 하단 패딩(24px) + 테두리(2px) */
  width: 1px;
  background-color: #DDDDDD;
  left: calc(303px + 55px * 2 + 4px); /* 왼쪽 세로선(303px) + 남성 열 너비(55px) + 여성 열 너비(55px) + 간격(4px) */
  top: -56px; /* 헤더 여백만큼 위로 확장 */
  z-index: 1;
`;

const ImportanceContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 291px;
  height: 100%;
`;

const ImportanceLabelsColumn = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 25px;
  left: 90px;
  transform: translateX(-50%);
  z-index: 1;
  top: 0;
`;

const ImportanceLabel = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #666666;
  width: 130px;
  text-align: center;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BarsColumn = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 25px;
  left: 180px;
  top: 0;
`;

const calculateBarWidth = (index) => {
  // 중요도 순서대로 막대 너비 반환 (최대값 70px로 조정)
  const barWidths = [70, 60, 50, 40, 30]; // 최대 너비 70px로 조정
  return barWidths[index] || 50; // 기본값 50px
};

const ImportanceBar = styled.div`
  height: 16px;
  width: ${props => props.width}px;
  min-width: 20px;
  background-color: #226FFF;
  border-radius: 2px;
  display: flex;
  align-items: center;
`;

const BarValue = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  text-align: left;
  letter-spacing: -0.03em;
  color: #226FFF;
  position: absolute;
  left: calc(${props => props.width || 70}px + 12px);
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
`;

const DataRowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: absolute;
  left: 303px;
  width: 455px;
  top: 0;
`;

const DataRowGroup = styled.div`
  display: flex;
  width: 100%;
  height: 16px;
`;

const DataRowValues = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 55px) 58px;
  gap: 4px;
  align-items: center;
  height: 16px;
  margin-left: 0;
  width: 455px;
  justify-content: start;
`;

const DataCell = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #666666;
  text-align: center;
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DataSectionHorizontalLine = styled(HorizontalLine)`
  width: 455px;
  margin-left: 0;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #DDDDDD;
  height: 1px;
`;

export default GraphChartScale5; 