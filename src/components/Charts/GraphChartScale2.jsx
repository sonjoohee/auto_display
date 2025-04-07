import React from 'react';
import styled from 'styled-components';

const GraphChartScale2 = ({ data = defaultData }) => {
  // 그래프 바 너비 - 서로 다른 값으로 설정
  const barWidthA = 120; // A는 더 긴 바
  const barWidthB = 90;  // B는 더 짧은 바

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
        <DataRowGroup>
          <RowLabel>
            <LabelText>A</LabelText>
            <GraphBar width={barWidthA} type="a" />
          </RowLabel>
          <DataRow>
            {data.a.map((value, index) => (
              <DataCell key={`a-${index}`}>{value}</DataCell>
            ))}
          </DataRow>
        </DataRowGroup>
        
        <DataSectionHorizontalLine marginTop="12px" marginBottom="12px" />
        
        <DataRowGroup>
          <RowLabel>
            <LabelText>B</LabelText>
            <GraphBar width={barWidthB} type="b" />
          </RowLabel>
          <DataRow>
            {data.b.map((value, index) => (
              <DataCell key={`b-${index}`}>{value}</DataCell>
            ))}
          </DataRow>
        </DataRowGroup>
      </DataSection>
    </ChartContainer>
  );
};

// 데이터 형식: [남성, 여성, 10대, 20대, 30대, 40대, 50대, 60대 이상]
const defaultData = {
  a: [7, 4, 8, 5, 6, 3, 9, 2],
  b: [5, 8, 3, 7, 6, 9, 4, 5]
};

const ChartContainer = styled.div`
  padding: 28px 24px 20px 24px;
  border: 1px solid #E0E4EB;
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 820px;
  height: 187px;
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
  height: 36px; /* 60대 이상의 높이와 맞춤 */
  &:first-child {
    width: 60px;
  }
  &:last-child {
    width: 62px;
    margin-left: 60px;
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  margin-left: 24px;
  gap: 4px;
  align-items: center;
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
  height: 36px; /* 60대 이상을 위한 공간 확보 */
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
  flex-direction: column;
  width: 100%;
`;

const DataRowGroup = styled.div`
  display: flex;
  width: 100%;
`;

const RowLabel = styled.div`
  display: flex;
  align-items: center;
  width: 291px;
  padding-left: 20px;
  position: relative;
`;

const LabelText = styled.div`
  font-family: 'Pretendard', 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  text-align: center;
  letter-spacing: -0.03em;
  color: #666666;
  width: 60px;
  position: absolute;
  left: 60px;
  display: flex;
  justify-content: center;
`;

const GraphBar = styled.div`
  height: 16px;
  width: ${props => props.width}px;
  min-width: 20px;
  background-color: #226FFF;
  border-radius: 2px;
  position: absolute;
  left: 180px;
`;

const DataRow = styled.div`
  display: flex;
  width: calc(100% - 291px);
  gap: 4px;
  margin-left: 24px;
  align-items: center;
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
  justify-content: center;
`;

const DataSectionHorizontalLine = styled(HorizontalLine)`
  width: calc(100% - 291px - 24px);
  margin-left: 315px; /* 291px(RowLabel 너비) + 24px(DataRow 마진) */
`;

export default GraphChartScale2; 