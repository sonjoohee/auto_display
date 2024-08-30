import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  TITLE_OF_BUSINESS_INFORMATION,
  IS_CLICK_EXPERT_SELECT,
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER,
  SAVED_REPORTS,
  IS_EDITING_NOW,
  SELECTED_TAB,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  QUESTION_LIST,
} from '../../../AtomStates';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';

const MoleculeAdditionalKeyword = ({ reportIndex, strategyReportID, conversationId, sampleData }) => {
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [isClickExpertSelect] = useAtom(IS_CLICK_EXPERT_SELECT);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [tempMainFeaturesOfBusinessInformation, setTempMainFeaturesOfBusinessInformation] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [tempMainCharacteristicOfBusinessInformation, setTempMainCharacteristicOfBusinessInformation] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [tempMusinessInformationTargetCustomer, setTemptBusinessInformationTargetCustomer] = useAtom(TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER);
  
  const [savedReports, setSavedReports] = useAtom(SAVED_REPORTS);
  const [bizAnalysisReportIndex, setBizAnalysisReportIndex] = useState(0);
  const [newAddContent, setNewAddContent] = useState('');
  const [isAddingNow, setIsAddingNow] = useState({ section: '', isAdding: false });
  const [newEditContent, setNewEditContent] = useState('');
  const [editingIndex, setEditingIndex] = useState({ section: '', index: -1 });
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [warningMessage, setWarningMessage] = useState('');

  const [selectedTab, setSelectedTab] = useAtom(SELECTED_TAB);

  const [expert1ReprotData, setExpert1ReprotData] = useAtom(EXPERT1_REPORT_DATA); 
  const [expert2ReprotData, setExpert2ReprotData] = useAtom(EXPERT2_REPORT_DATA); 
  const [expert3ReprotData, setExpert3ReprotData] = useAtom(EXPERT3_REPORT_DATA);

  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [questionList] = useAtom(QUESTION_LIST);
  
  const [randomSelections, setRandomSelections] = useState({});

  useEffect(() => {
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    let directions;

    if (selectedExpertIndex === 1) directions = questionList[1];
    else if (selectedExpertIndex === 2) directions = questionList[2];
    else if (selectedExpertIndex === 3) directions = questionList[3];

    const selections = {
      방법론관련: getRandomItem(directions.방법론관련),
      사례제시: getRandomItem(directions.사례제시),
      아이디어제공: getRandomItem(directions.아이디어제공),
    };

    setRandomSelections(selections);
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
  // justify-content: space-between;
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

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
  }
`;
