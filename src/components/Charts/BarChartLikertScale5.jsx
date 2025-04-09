import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { useAtom } from "jotai";
import { QUICK_SURVEY_STATIC_DATA } from "../../pages/AtomStates";

const BarChartLikertScale5 = ({
  onOptionSelect = () => {},
  onOptionSelectIndex = () => {},
  onBarClick,
}) => {
  const [quickSurveyStaticData] = useAtom(QUICK_SURVEY_STATIC_DATA);

  const calculatePercentage = (value, total) => {
    return Math.round((value / total) * 100);
  };

  const processData = () => {
    const total = quickSurveyStaticData["총합"]["전체총합"];

    return [
      {
        category: Object.keys(quickSurveyStaticData)[0],
        value: calculatePercentage(
          quickSurveyStaticData[Object.keys(quickSurveyStaticData)[0]][
            "전체총합"
          ],
          total
        ),
      },
      {
        category: Object.keys(quickSurveyStaticData)[1],
        value: calculatePercentage(
          quickSurveyStaticData[Object.keys(quickSurveyStaticData)[1]][
            "전체총합"
          ],
          total
        ),
      },
      {
        category: Object.keys(quickSurveyStaticData)[2],
        value: calculatePercentage(
          quickSurveyStaticData[Object.keys(quickSurveyStaticData)[2]][
            "전체총합"
          ],
          total
        ),
      },
      {
        category: Object.keys(quickSurveyStaticData)[3],
        value: calculatePercentage(
          quickSurveyStaticData[Object.keys(quickSurveyStaticData)[3]][
            "전체총합"
          ],
          total
        ),
      },
      {
        category: Object.keys(quickSurveyStaticData)[4],
        value: calculatePercentage(
          quickSurveyStaticData[Object.keys(quickSurveyStaticData)[4]][
            "전체총합"
          ],
          total
        ),
      },
    ];
  };

  const data = processData();

  return (
    <GraphContainer>
      {data.map((item, index) => (
        <CategoryItem
          key={index}
          onClick={() => {
            onOptionSelect(item.category);
            onOptionSelectIndex(index + 1);
            onBarClick();
          }}
        >
          <BarGroup>
            <BarBackground />
            <BarFill width={item.value} />
            <BarValue>{item.value}%</BarValue>
          </BarGroup>
          <CategoryLabel>
            {index + 1}. {item.category}
          </CategoryLabel>
          <SubCategoryLabel>
            추가 설명
          </SubCategoryLabel>
        </CategoryItem>
      ))}
    </GraphContainer>
  );
};

export default BarChartLikertScale5;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 44px;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 86px;
`;

const BarGroup = styled.div`
  position: relative;
  width: 86px;
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
  background-color: #ffffff;
  border-radius: 5px;
`;

const BarFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.width}%;
  background-color: ${palette.primary};
  border-radius: 5px;
`;

const BarValue = styled.div`
  position: relative;
  z-index: 2;
  font-family: "Pretendard", "Poppins";
  font-weight: 600;
  font-size: 20px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${palette.primary};
`;

const CategoryLabel = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-align: center;
  color: #323232;
  width: 100%;
`;

const SubCategoryLabel = styled.div`
  font-family: "Pretendard", "Poppins";
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  letter-spacing: -0.03em;
  text-align: center;
  color: #323232;
  width: 100%;
  margin-top: -10px;
`;
