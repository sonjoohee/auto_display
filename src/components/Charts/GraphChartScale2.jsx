import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";

const GraphChartScale2 = () => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);
  console.log(
    "🚀 ~ GraphChartScale2 ~ quickSurveyStaticData:",
    quickSurveyStaticData
  );

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
  const sumA = data.a[0] + data.a[1]; // 남성과 여성 데이터만 합산
  const sumB = data.b[0] + data.b[1]; // 남성과 여성 데이터만 합산
  const importanceLabels = ["A", "B"]; // A, B를 레이블로 사용
  const importanceOptions = [
    Object.keys(quickSurveyStaticData)[0],
    Object.keys(quickSurveyStaticData)[1],
  ]; // A, B를 레이블로 사용

  // 그래프 바 너비 계산 - 백분율 값에 따라 가변적으로 설정
  const getBarWidth = (value) => {
    // 최소 너비와 최대 너비 설정
    const minWidth = 0;
    const maxWidth = 100;

    // 백분율 값에 따라 선형적으로 너비 계산
    // 0%일 때 minWidth, 100%일 때 maxWidth가 되도록 설정
    const width = minWidth + (value / (sumA + sumB)) * (maxWidth - minWidth);

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
  // const barWidths = [Math.min(70, sumA), Math.min(70, sumB)];
  console.log("🚀 ~ GraphChartScale2 ~ importanceOptions:", importanceOptions);
  return (
    <ChartContainer>
      <HeaderSection>
        <HeaderRow>
          <CategoryHeader>
            <EmptySpace />
            <CategoryLabels>
              <CategoryItem>보기</CategoryItem>
              <CategoryItem>계</CategoryItem>
            </CategoryLabels>
          </CategoryHeader>
          <CategoriesWrapper>
            <GenderSection>
              <GenderHeader>
                <GenderText>성별</GenderText>
                <GenderLine />
              </GenderHeader>
              <GenderItems>
                <DemographicItem>남</DemographicItem>
                <DemographicItem>여</DemographicItem>
              </GenderItems>
            </GenderSection>
            <AgeSection>
              <AgeHeader>
                <AgeText>나이(10세 단위)</AgeText>
                <AgeLine />
              </AgeHeader>
              <AgeItems>
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
              </AgeItems>
            </AgeSection>
          </CategoriesWrapper>
        </HeaderRow>
        <HorizontalLine marginTop="16px" marginBottom="0" fullWidth />
      </HeaderSection>

      <DataSection>
        <VerticalLine />
        <RightVerticalLine />
        <ImportanceContainer>
          <ImportanceLabelsColumn>
            {importanceOptions.map((option, index) => (
              <ImportanceLabel key={`label-${index}`}>
                <span
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {option}
                </span>
              </ImportanceLabel>
            ))}
            <ImportanceLabelsColumnIndex>
              {importanceOptions.map((option, index) => (
                <ImportanceLabel key={`label-${index}`}>
                  {`${importanceLabels[index]}`}
                </ImportanceLabel>
              ))}
            </ImportanceLabelsColumnIndex>
          </ImportanceLabelsColumn>

          <BarsColumn>
            {importanceLabels.map((_, index) => {
              // Assuming importanceLabels ('A', 'B') map directly to barWidths and sums
              return (
                <div
                  key={`bar-container-${index}`}
                  style={{ position: "relative" }}
                >
                  <ImportanceBar
                    key={`bar-${index}`}
                    width={barWidths[index]}
                  />
                  {/* Restore original BarValue positioning and content */}
                  <BarValue width={barWidths[index]}>
                    {index === 0 ? sumA : sumB}
                  </BarValue>
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
  height: 227px;
  box-sizing: border-box;
  position: relative;
  overflow: visible; /* 세로 라인이 컨테이너 밖으로 나갈 수 있게 변경 */
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
  margin-left: 40px;
  gap: 0;
  position: relative;
`;

const CategoryItem = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  &:first-child {
    box-sizing: border-box;
    min-width: 25px;
    width: 25px;
    text-align: center;
    justify-content: center;
    padding: 0;
    margin-left: 20px;
  }
  &:last-child {
    width: 62px;
    margin-left: 140px;
  }
`;

const CategoriesWrapper = styled.div`
  display: flex;
  margin-left: 12px;
  gap: 4px;
  align-items: flex-end;
  width: 455px;
`;

const GenderSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const GenderHeader = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  width: 114px; /* 남성, 여성 컬럼 너비 합계 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const GenderText = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  padding-top: 18px;
`;

const GenderLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e4eb;
  margin-top: 12px;
`;

const GenderItems = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 36px;
`;

const AgeSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const AgeHeader = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  width: 338px; /* 10대~60대 이상 컬럼 너비 합계 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const AgeText = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  padding-top: 18px;
`;

const AgeLine = styled.div`
  width: 378px;
  height: 1px;
  background-color: #e0e4eb;
  margin-left: 26px;
  margin-top: 12px;
`;

const AgeItems = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 36px;
`;

const DemographicItem = styled.div`
  width: 55px;
  font-family: "Pretendard", "Poppins";
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.03em;
  color: #323232;
  white-space: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding-top: 8px;
`;

const HorizontalLine = styled.div`
  width: ${(props) => (props.fullWidth ? "calc(100% + 48px)" : "100%")};
  height: 1px;
  background-color: #e0e4eb;
  margin-top: ${(props) => props.marginTop || "4px"};
  margin-bottom: ${(props) => props.marginBottom || "4px"};
  margin-left: ${(props) => (props.fullWidth ? "-24px" : "0")};
  position: ${(props) => (props.fullWidth ? "relative" : "static")};
`;

const DataSection = styled.div`
  display: flex;
  /* flex-direction: row; // Implicit default or restore if explicitly set */
  width: 100%;
  position: relative;
  height: 100px; /* Restore original height calculation if different */
  /* Remove gap and padding-top added in previous edit */
`;

const VerticalLine = styled.div`
  position: absolute;
  height: calc(
    100% + 130px + 24px + 17px
  ); /* DataSection 높이(100%) + 상단 확장(130px) + 하단 패딩(24px) + 추가 높이(17px) */
  width: 1px;
  background-color: #e0e4eb;
  left: 303px;
  top: -147px; /* 기존 -130px에서 17px 더 위로 확장 */
  z-index: 1;
`;

const RightVerticalLine = styled.div`
  position: absolute;
  height: calc(
    100% + 130px + 24px + 17px
  ); /* DataSection 높이(100%) + 상단 확장(130px) + 하단 패딩(24px) + 추가 높이(17px) */
  width: 1px;
  background-color: #e0e4eb;
  left: calc(
    303px + 55px * 2 + 4px
  ); /* 왼쪽 세로선(303px) + 남성 열 너비(55px) + 여성 열 너비(55px) + 간격(4px) */
  top: -147px; /* 기존 -130px에서 17px 더 위로 확장 */
  z-index: 1;
`;

const ImportanceContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column; // Or original layout
  width: 291px;
  height: 100%;
`;

const ImportanceLabelsColumn = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 25px; // Restore original gap
  /* left: 50px; // Restore original position */
  /* transform: translateX(-80%); // Restore original transform */
  z-index: 1;
  top: 0;
`;
const ImportanceLabelsColumnIndex = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 25px; // Restore original gap
  left: 20px; // Restore original position
  /* transform: translateX(-20%); // Restore original transform */
  z-index: 1;
  top: 0;
`;
const ImportanceLabel = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #666666;
  width: 130px; // Restore original width
  text-align: right;
  height: 16px; // Restore original height
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0; // Restore original padding
  /* Remove styles added in previous edit if any */
`;

const BarsColumn = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 25px; // Restore original gap
  left: 160px; // Restore original position
  top: 0;
`;

const ImportanceBar = styled.div`
  height: 16px;
  width: ${(props) => props.width}px;
  background-color: #226fff;
  border-radius: 2px;
  display: flex; // Keep or restore original display
  align-items: center; // Keep or restore original align-items
`;

const BarValue = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  text-align: right;
  letter-spacing: -0.03em;
  color: #226fff;
  position: absolute;
  /* Restore original left calculation */
  /* left: calc(
    ${(props) => props.width}px + 52px
  );  */
  width: 30px;
  top: 0; // Restore original top
  /* transform: none; // Remove transform if added */

  left: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const DataRowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0; // Restore original gap
  position: absolute;
  left: 303px; // Restore original position
  width: 455px; // Restore original width
  top: 0;
`;

const DataRowGroup = styled.div`
  display: flex;
  width: 100%;
  height: 16px; // Restore original height
`;

const DataRowValues = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 55px) 58px; // Restore original columns
  gap: 4px; // Restore original gap
  align-items: center;
  height: 16px; // Restore original height
  margin-left: 0; // Restore original margin
  width: 455px; // Restore original width
  justify-content: start; // Restore original justify
`;

const DataCell = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #666666;
  text-align: center;
  width: 55px;
  /* height: auto; // Remove height: 100% if added */
  display: flex;
  align-items: center;
  justify-content: center;
  /* box-sizing: content-box; // Remove box-sizing if added */
`;

const DataSectionHorizontalLine = styled(HorizontalLine)`
  width: 490px; // Restore original width
  margin-left: 0; // Restore original margin
  margin-top: 12px; // Restore original margin
  margin-bottom: 12px; // Restore original margin
  background-color: transparent; /* 배경색 제거 */
  border: none; // Ensure border is none if changed
  border-bottom: 1px dashed #e0e4eb; /* 점선 색상을 outline 색상으로 변경 */
  height: 1px;
  /* position: static; // Remove position: relative if added */
`;

export default GraphChartScale2;
