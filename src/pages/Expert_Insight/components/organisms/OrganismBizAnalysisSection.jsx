import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
} from '../../../AtomStates';

import OrganismHeader from '../../../organisms/OrganismHeader';
import OrganismSideBar from '../organisms/OrganismSideBar';
import OrganismTakingChargeAiExpert from '../organisms/OrganismTakingChargeAiExpert';

const OrganismBizAnalysisSection = () => {

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);

  const [newAddContent, setNewAddContent] = useState(''); // 내용 추가 입력값 임시 저장용
  const [newEditContent, setNewEditContent] = useState(''); // 내용 수정 입력값 임시 저장용
  const [editingIndex, setEditingIndex] = useState(-1); // 수정 중인 항목의 인덱스 저장

  console.log("전문가 인덱스:", selectedExpertIndex, "인풋값:", inputBusinessInfo);
  console.log("주요특징 내용", mainFeaturesOfBusinessInformation);

  const addContent = () => {
    if (newAddContent.trim() !== '') {
      setMainFeaturesOfBusinessInformation([...mainFeaturesOfBusinessInformation, newAddContent]);
      setNewAddContent('');
    }
  };
  
  const deleteContent = (index) => {
    setMainFeaturesOfBusinessInformation(
      mainFeaturesOfBusinessInformation.filter((_, i) => i !== index)
    );
  };

  const handleEditStart = (index) => {
    setEditingIndex(index);
    setNewEditContent(mainFeaturesOfBusinessInformation[index]);
  };

  const handleEditSave = (index) => {
    const updatedFeatures = [...mainFeaturesOfBusinessInformation];
    updatedFeatures[index] = newEditContent;
    setMainFeaturesOfBusinessInformation(updatedFeatures);
    setEditingIndex(-1);
  };

  const handleEditCancel = () => {
    setEditingIndex(-1);
  };

  return (
    <>
      <h1>{titleOfBusinessInfo}</h1>
      
      <h2>주요 특징</h2>
      <ul>
        {mainFeaturesOfBusinessInformation.map((content, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={newEditContent}
                onChange={(e) => setNewEditContent(e.target.value)}
              />
            ) : (
              <span onDoubleClick={() => handleEditStart(index)}>{content}</span>
            )}
            {editingIndex === index ? (
              <>
                <button onClick={() => handleEditSave(index)}>저장</button>
                <button onClick={handleEditCancel}>취소</button>
              </>
            ) : <button onClick={() => deleteContent(index)}>삭제</button>}
          </li>
        ))}
      </ul>

      <input 
        type="text" 
        value={newAddContent} 
        onChange={(e)=>{setNewAddContent(e.target.value);}} 
        placeholder="새로운 정보를 추가해보세요"
        />

      <button onClick={addContent}>추가</button>
      <br />
    </>
  );
};

export default OrganismBizAnalysisSection;

const Styled = styled.div`
`;