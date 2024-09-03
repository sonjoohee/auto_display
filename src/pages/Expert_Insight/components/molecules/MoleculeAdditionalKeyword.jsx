import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  TITLE_OF_BUSINESS_INFORMATION,
  SELECTED_EXPERT_INDEX,
  SELECTED_ADDITIONAL_KEYWORD1,
  SELECTED_ADDITIONAL_KEYWORD2,
  SELECTED_ADDITIONAL_KEYWORD3,
  QUESTION_LIST,
  ADDITIONAL_QUESTION_1,
  ADDITIONAL_QUESTION_2,
  ADDITIONAL_QUESTION_3,
} from '../../../AtomStates';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';

const MoleculeAdditionalKeyword = () => {
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [selectedAdditionalKeyword1, setSelectedAdditionalKeyword1] = useAtom(SELECTED_ADDITIONAL_KEYWORD1);
  const [selectedAdditionalKeyword2, setSelectedAdditionalKeyword2] = useAtom(SELECTED_ADDITIONAL_KEYWORD2);
  const [selectedAdditionalKeyword3, setSelectedAdditionalKeyword3] = useAtom(SELECTED_ADDITIONAL_KEYWORD3);
  const [addtionalQuestion1, setAddtionalQuestion1] = useAtom(ADDITIONAL_QUESTION_1);
  const [addtionalQuestion2, setAddtionalQuestion2] = useAtom(ADDITIONAL_QUESTION_2);
  const [addtionalQuestion3, setAddtionalQuestion3] = useAtom(ADDITIONAL_QUESTION_3);
  const [questionList] = useAtom(QUESTION_LIST);

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

  const setSelectedAdditionalKeyword = (keyword) => {
    console.log(keyword)
    if (selectedExpertIndex === 1) {
      setSelectedAdditionalKeyword1(keyword);
    } else if (selectedExpertIndex === 2) {
      setSelectedAdditionalKeyword2(keyword);
    } else if (selectedExpertIndex === 3) {
      setSelectedAdditionalKeyword3(keyword);
    }
  };

  useEffect(() => {
    setRandomSelections(generateRandomSelections());
  }, []);

  return (
    <>
      <ButtonWrap>
        <button onClick={() => setSelectedAdditionalKeyword(randomSelections.방법론관련)}>
          {randomSelections.방법론관련}
        </button>
        <button onClick={() => setSelectedAdditionalKeyword(randomSelections.사례제시)}>
          {randomSelections.사례제시}
        </button>
        <button onClick={() => setSelectedAdditionalKeyword(randomSelections.아이디어제공)}>
          {randomSelections.아이디어제공}
        </button>
        <button
          className="other" 
          onClick={handleOtherInsightClick}
        >
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
    font-family: 'Pretendard';
    font-size: 0.88rem;
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
  }
    
`;
