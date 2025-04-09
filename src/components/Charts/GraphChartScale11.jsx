import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";

const GraphChartScale11 = () => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);

  const getDataFromQuickSurveyStaticData = (quickSurveyStaticData) => {
    const result = {};
    const labels = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];

    for (let i = 0; i < 11; i++) {
      result[labels[i]] = [
        quickSurveyStaticData[i]["성별"]["남성"],
        quickSurveyStaticData[i]["성별"]["여성"],
        quickSurveyStaticData[i]["연령대"]["10대"],
        quickSurveyStaticData[i]["연령대"]["20대"],
        quickSurveyStaticData[i]["연령대"]["30대"],
        quickSurveyStaticData[i]["연령대"]["40대"],
        quickSurveyStaticData[i]["연령대"]["50대"],
        quickSurveyStaticData[i]["연령대"]["60대 이상"],
      ];
    }

    return result;
  };

  const data = getDataFromQuickSurveyStaticData(quickSurveyStaticData);

  // 바의 너비를 계산하는 함수 - 백분율 값에 따라 가변적으로 설정
  const calculateBarWidth = (index) => {
    const total = quickSurveyStaticData["총합"]["전체총합"];
    const value = quickSurveyStaticData[index]["전체총합"];

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
            <DemographicItem>
              60대
              <br />
              이상
            </DemographicItem>
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
                <div
                  key={`bar-container-${index}`}
                  style={{ position: "relative" }}
                >
                  <ImportanceBar key={`bar-${index}`} width={barWidth} />
                  <BarValue>
                    {index === 0
                      ? data.a[0] + data.a[1]
                      : index === 1
                      ? data.b[0] + data.b[1]
                      : index === 2
                      ? data.c[0] + data.c[1]
                      : index === 3
                      ? data.d[0] + data.d[1]
                      : index === 4
                      ? data.e[0] + data.e[1]
                      : index === 5
                      ? data.f[0] + data.f[1]
                      : index === 6
                      ? data.g[0] + data.g[1]
                      : index === 7
                      ? data.h[0] + data.h[1]
                      : index === 8
                      ? data.i[0] + data.i[1]
                      : index === 9
                      ? data.j[0] + data.j[1]
                      : data.k[0] + data.k[1]}
                  </BarValue>
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
                <DataSectionHorizontalLine
                  marginTop="12px"
                  marginBottom="12px"
                />
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
  "(전혀 추천하지 않음) 0점",
];

const ChartContainer = styled.div`
  padding: 28px 24px 24px 24px;
  border: 1px solid #e0e4eb;
  border-radius: 10px;
  background-color: #ffffff;
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
  font-family: "Pretendard", "Poppins";
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
  font-family: "Pretendard", "Poppins";
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
  background-color: #dddddd;
  margin-top: ${(props) => props.marginTop || "4px"};
  margin-bottom: ${(props) => props.marginBottom || "4px"};
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
  font-family: "Pretendard", "Poppins";
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
  width: ${(props) => props.width}px;
  background-color: #226fff;
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
  font-family: "Pretendard", "Poppins";
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
  background-color: #dddddd;
  height: 1px;
`;

const VerticalLine = styled.div`
  position: absolute;
  height: calc(
    100% + 56px + 20px
  ); /* DataSection 높이(100%) + 헤더 여백(56px) + 하단 패딩 조정(20px) */
  width: 1px;
  background-color: #dddddd;
  left: 303px; /* ImportanceContainer 너비(291px) + 약간의 간격(12px) */
  top: -56px; /* 헤더 여백만큼 위로 확장 */
  z-index: 1;
`;

const RightVerticalLine = styled.div`
  position: absolute;
  height: calc(
    100% + 56px + 20px
  ); /* DataSection 높이(100%) + 헤더 여백(56px) + 하단 패딩 조정(20px) */
  width: 1px;
  background-color: #dddddd;
  left: calc(
    303px + 55px * 2 + 4px
  ); /* 왼쪽 세로선(303px) + 남성 열 너비(55px) + 여성 열 너비(55px) + 간격(4px) */
  top: -56px; /* 헤더 여백만큼 위로 확장 */
  z-index: 1;
`;

// 바의 너비를 계산하는 함수 - 인덱스에 따라 다른 너비 반환 (최대 70px로 제한)
const calculateBarWidth = (index) => {
  const widths = [70, 68, 66, 64, 60, 55, 50, 45, 40, 35, 30]; // 10점부터 0점까지 내림차순으로 바 너비 설정 (최대 70px)
  return widths[index] || 50;
};

const BarValue = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  text-align: left;
  letter-spacing: -0.03em;
  color: #226fff;
  position: absolute;
  left: calc(${(props) => props.width || 70}px + 12px);
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
`;

export default GraphChartScale11;
