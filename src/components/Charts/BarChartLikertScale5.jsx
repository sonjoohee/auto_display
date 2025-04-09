import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";

// 5개의 카테고리 그래프를 위한 데이터 구조
// [{ category: string, value: number }, ...]
const BarChartLikertScale5 = ({
  data = [
    { category: "카테고리1", value: 4 },
    { category: "카테고리2", value: 12 },
    { category: "카테고리3", value: 20 },
    { category: "카테고리4", value: 38 },
    { category: "카테고리5", value: 26 },
  ],
}) => {
  return (
    <GraphContainer>
      {data.map((item, index) => (
        <CategoryItem
          key={index}
          onClick={() => console.log("Clicked Bar Value:", item.category)}
        >
          <BarGroup>
            <BarBackground />
            <BarFill width={item.value} />
            <BarValue>{item.value}%</BarValue>
          </BarGroup>
          <CategoryLabel>{item.category}</CategoryLabel>
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
