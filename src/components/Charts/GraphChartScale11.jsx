import React from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { QUICK_SURVEY_STATIC_DATA } from '../../pages/AtomStates';

const GraphChartScale11 = () => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);

    const getDataFromQuickSurveyStaticData = (quickSurveyStaticData) => {
      const result = {};
      const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
      
      for (let i = 0; i < 11; i++) {
        result[labels[i]] = [
          quickSurveyStaticData[i]['성별']['남성'],
          quickSurveyStaticData[i]['성별']['여성'],
          quickSurveyStaticData[i]['연령대']['10대'],
          quickSurveyStaticData[i]['연령대']['20대'],
          quickSurveyStaticData[i]['연령대']['30대'],
          quickSurveyStaticData[i]['연령대']['40대'],
          quickSurveyStaticData[i]['연령대']['50대'],
          quickSurveyStaticData[i]['연령대']['60대 이상']
        ];
      }
      
      return result;
    };
  
  const data = getDataFromQuickSurveyStaticData(quickSurveyStaticData);

  // 바의 너비를 계산하는 함수 - 백분율 값에 따라 가변적으로 설정
  const calculateBarWidth = (index) => {
    const total = quickSurveyStaticData['총합']['전체총합'];
    const value = quickSurveyStaticData[index]['전체총합'];
    
    // 백분율 계산
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    
    return percentage;
  };

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
        <ImportanceContainer>
          <ImportanceLabelsColumn>
            {importanceLabels.map((label, index) => (
              <ImportanceLabel key={`label-${index}`}>{label}</ImportanceLabel>
            ))}
          </ImportanceLabelsColumn>
          
          <BarsColumn>
            {importanceLabels.map((_, index) => (
              <ImportanceBar key={`bar-${index}`} width={calculateBarWidth(index)} />
            ))}
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
                <DataSectionHorizontalLine marginTop="12px" marginBottom="12px" />
              )}
            </React.Fragment>
          ))}
        </DataRowsContainer>
      </DataSection>
    </ChartContainer>
  );
};

const importanceLabels = [
  "(매우 추천함) 10점",
  "9점",
  "8점",
  "7점",
  "6점",
  "5점",
  "4점",
  "3점",
  "2점",
  "1점",
  "(전혀 추천하지 않음) 0점"
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
  height: 426px; /* 중요도 라벨 11개(16px) + 간격 10개(25px) = 176px + 250px = 426px */
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
  width: 170px;
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

const ImportanceBar = styled.div`
  height: 16px;
  width: ${props => props.width}px;
  background-color: #226FFF;
  border-radius: 2px;
  display: flex;
  align-items: center;
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

export default GraphChartScale11;