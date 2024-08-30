import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  TITLE_OF_BUSINESS_INFORMATION,
  SELECTED_EXPERT_INDEX,
  SELECTED_ADDITIONAL_KEYWORD,
  QUESTION_LIST,
} from '../../../AtomStates';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';

const MoleculeAdditionalKeyword = ({ reportIndex, strategyReportID, conversationId, sampleData }) => {
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [questionList] = useAtom(QUESTION_LIST);

  const [randomSelections, setRandomSelections] = useState({
    방법론관련: '',
    사례제시: '',
    아이디어제공: '',
  });

  useEffect(() => {
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    if (selectedExpertIndex === 1 || selectedExpertIndex === 2 || selectedExpertIndex === 3) {
      const directions = questionList[selectedExpertIndex];
      setRandomSelections({
        방법론관련: getRandomItem(directions.방법론관련),
        사례제시: getRandomItem(directions.사례제시),
        아이디어제공: getRandomItem(directions.아이디어제공),
      });
    }
  }, [selectedExpertIndex, questionList]);

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
      </ButtonWrap>
    </>
  );
};

export default MoleculeAdditionalKeyword;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${palette.lineGray};

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Pretendard';
    font-size: 0.75rem;
    color: ${palette.gray};
    border: 0;
    background: none;
  }

  > button {
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }
`;
