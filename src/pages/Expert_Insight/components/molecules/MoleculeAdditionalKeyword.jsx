import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  TITLE_OF_BUSINESS_INFORMATION,
  SELECTED_EXPERT_INDEX,
  SELECTED_ADDITIONAL_KEYWORD,
  QUESTION_LIST,
  ADDITIONAL_QUESTION_1,
  ADDITIONAL_QUESTION_2,
  ADDITIONAL_QUESTION_3,
  ADDITION_BUTTON_STATE, // BUTTON_STATE 추가
} from "../../../AtomStates";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

const MoleculeAdditionalKeyword = () => {
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [addtionalQuestion1, setAddtionalQuestion1] = useAtom(
    ADDITIONAL_QUESTION_1
  );
  const [addtionalQuestion2, setAddtionalQuestion2] = useAtom(
    ADDITIONAL_QUESTION_2
  );
  const [addtionalQuestion3, setAddtionalQuestion3] = useAtom(
    ADDITIONAL_QUESTION_3
  );
  const [questionList] = useAtom(QUESTION_LIST);
  const [buttonState, setButtonState] = useAtom(ADDITION_BUTTON_STATE); // BUTTON_STATE 가져오기

  const [randomSelections, setRandomSelections] = useState({});

  const generateRandomSelections = () => {
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    let directions;

    if (questionList && questionList[selectedExpertIndex]) {
      directions = questionList[selectedExpertIndex];
    } else {
      directions = questionList[1];
    }

    const selections = {
      방법론관련: getRandomItem(directions.방법론관련),
      사례제시: getRandomItem(directions.사례제시),
      아이디어제공: getRandomItem(directions.아이디어제공),
    };
    return selections;
  };

  const handleOtherInsightClick = () => {
    const newSelections = generateRandomSelections();
    setRandomSelections(newSelections);

    setAddtionalQuestion1(newSelections.방법론관련);
    setAddtionalQuestion2(newSelections.사례제시);
    setAddtionalQuestion3(newSelections.아이디어제공);
  };

  const updateSelectedAdditionalKeyword = (keyword) => {
    const updatedKeywords = [...selectedAdditionalKeyword];
    console.log(
      "🚀 ~ updateSelectedAdditionalKeyword ~ updatedKeywords:",
      updatedKeywords
    );
    updatedKeywords.push(keyword); // Add the keyword to the end of the array
    setSelectedAdditionalKeyword(updatedKeywords);

    setButtonState(1); // 버튼 클릭 시 buttonState를 1로 설정
  };

  useEffect(() => {
    setRandomSelections(generateRandomSelections());
  }, []);

  return (
    <>
      <ButtonWrap>
        <button
          onClick={() =>
            updateSelectedAdditionalKeyword(randomSelections.방법론관련)
          }
        >
          {randomSelections.방법론관련}
        </button>
        <button
          onClick={() =>
            updateSelectedAdditionalKeyword(randomSelections.사례제시)
          }
        >
          {randomSelections.사례제시}
        </button>
        <button
          onClick={() =>
            updateSelectedAdditionalKeyword(randomSelections.아이디어제공)
          }
        >
          {randomSelections.아이디어제공}
        </button>
        <button className="other" onClick={handleOtherInsightClick}>
          <img src={images.IconRefresh} alt="" />
          다른 인사이트 확인
        </button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeAdditionalKeyword;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 15px;

  button {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: "Pretendard";
    font-size: 0.875rem;
    color: ${palette.darkGray};
    border: 0;
    background: none;
    margin-right: 10px;
  }

  > button {
    padding: 8px 16px;
    border-radius: 40px;
    border: 1px solid ${palette.lineGray};
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
    gap: 4px;

    img {
      height: 19px;
    }
  }
`;
