import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";

const GraphChartScale2 = () => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);

  // 그래프 바 너비 계산 - 백분율 값에 따라 가변적으로 설정
  const getBarWidth = (value) => {
    // 최소 너비와 최대 너비 설정
    const minWidth = 10;
    const maxWidth = 120;

    // 백분율 값에 따라 선형적으로 너비 계산
    // 0%일 때 minWidth, 100%일 때 maxWidth가 되도록 설정
    const width = minWidth + (value / 100) * (maxWidth - minWidth);

    // 소수점 반올림하여 정수 값 반환
    return Math.round(width);
  };

  // A와 B 옵션의 총합 값 가져오기
  const barWidthA = getBarWidth(
    quickSurveyStaticData[Object.keys(quickSurveyStaticData)[0]]["전체총합"]
  );
  const barWidthB = getBarWidth(
    quickSurveyStaticData[Object.keys(quickSurveyStaticData)[1]]["전체총합"]
  );
  const barWidths = [barWidthA, barWidthB];
  const getDataFromQuickSurveyStaticData = (quickSurveyStaticData) => {
    const option1Key = Object.keys(quickSurveyStaticData)[0];
    const option2Key = Object.keys(quickSurveyStaticData)[1];

    return {
      a: [
        quickSurveyStaticData[option1Key]["성별"]["남성"],
        quickSurveyStaticData[option1Key]["성별"]["여성"],
        quickSurveyStaticData[option1Key]["연령대"]["10대"],
        quickSurveyStaticData[option1Key]["연령대"]["20대"],
        quickSurveyStaticData[option1Key]["연령대"]["30대"],
        quickSurveyStaticData[option1Key]["연령대"]["40대"],
        quickSurveyStaticData[option1Key]["연령대"]["50대"],
        quickSurveyStaticData[option1Key]["연령대"]["60대 이상"],
      ],
      b: [
        quickSurveyStaticData[option2Key]["성별"]["남성"],
        quickSurveyStaticData[option2Key]["성별"]["여성"],
        quickSurveyStaticData[option2Key]["연령대"]["10대"],
        quickSurveyStaticData[option2Key]["연령대"]["20대"],
        quickSurveyStaticData[option2Key]["연령대"]["30대"],
        quickSurveyStaticData[option2Key]["연령대"]["40대"],
        quickSurveyStaticData[option2Key]["연령대"]["50대"],
        quickSurveyStaticData[option2Key]["연령대"]["60대 이상"],
      ],
    };
  };

  const data = getDataFromQuickSurveyStaticData(quickSurveyStaticData);

  // 합계 계산
  const sumA = data.a.reduce((sum, val) => sum + val, 0);
  const sumB = data.b.reduce((sum, val) => sum + val, 0);
  const importanceLabels = ["A", "B"]; // A, B를 레이블로 사용
  // const barWidths = [Math.min(70, sumA), Math.min(70, sumB)];

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
              return (
                <div
                  key={`bar-container-${index}`}
                  style={{ position: "relative" }}
                >
                  <ImportanceBar
                    key={`bar-${index}`}
                    width={barWidths[index]}
                  />
                  <BarValue>{index === 0 ? sumA : sumB}</BarValue>
                </div>
              );
            })}
          </BarsColumn>
        </ImportanceContainer>

        <DataRowsContainer>
          <React.Fragment key="row-a">
            <DataRowGroup>
              <DataRowValues>
                {data.a.map((value, index) => (
                  <DataCell key={`a-${index}`}>{value}</DataCell>
                ))}
              </DataRowValues>
            </DataRowGroup>
            <DataSectionHorizontalLine />
          </React.Fragment>

          <React.Fragment key="row-b">
            <DataRowGroup>
              <DataRowValues>
                {data.b.map((value, index) => (
                  <DataCell key={`b-${index}`}>{value}</DataCell>
                ))}
              </DataRowValues>
            </DataRowGroup>
          </React.Fragment>
        </DataRowsContainer>

        {/* <DataRowGroup>
          <RowLabel>
            <LabelText>A</LabelText>
            <GraphBar width={barWidthA} type="a" />
          </RowLabel>
          <DataRow>
            {getDataFromQuickSurveyStaticData(quickSurveyStaticData).a.map(
              (value, index) => (
                <DataCell key={`a-${index}`}>{value}</DataCell>
              )
            )}
          </DataRow>
        </DataRowGroup>

        <DataSectionHorizontalLine marginTop="12px" marginBottom="12px" />

        <DataRowGroup>
          <RowLabel>
            <LabelText>B</LabelText>
            <GraphBar width={barWidthB} type="b" />
          </RowLabel>
          <DataRow>
            {getDataFromQuickSurveyStaticData(quickSurveyStaticData).b.map(
              (value, index) => (
                <DataCell key={`b-${index}`}>{value}</DataCell>
              )
            )}
          </DataRow>
        </DataRowGroup> */}
      </DataSection>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  padding: 28px 24px 24px 24px;
  border: 1px solid #e0e4eb;
  border-radius: 10px;
  background-color: #ffffff;
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
  height: 36px; /* 60대 이상을 위한 공간 확보 */
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
  height: 100px; /* A, B 두 개의 라벨(16px) + 간격(1개, 25px) + 여백 */
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
  width: 80px;
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
  min-width: ${(props) => props.width}px;
  background-color: #226fff;
  border-radius: 2px;
  display: flex;
  align-items: center;
`;

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

export default GraphChartScale2;
