import React, { useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  SAVED_REPORTS,
} from '../../../AtomStates';

const OrganismBizAnalysisSection = () => {
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [savedReports, setSavedReports] = useAtom(SAVED_REPORTS);

  const [newAddContent, setNewAddContent] = useState('');
  const [newEditContent, setNewEditContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const saveReport = () => {
    setSavedReports((prevReports) => [
      ...prevReports,
      {
        title: titleOfBusinessInfo,
        date: new Date().toLocaleDateString(),
        content: mainFeaturesOfBusinessInformation,
      },
    ]);
  };

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
            ) : (
              <button onClick={() => deleteContent(index)}>삭제</button>
            )}
          </li>
        ))}
      </ul>

      <input 
        type="text" 
        value={newAddContent} 
        onChange={(e) => setNewAddContent(e.target.value)} 
        placeholder="새로운 정보를 추가해보세요"
      />

      <button onClick={addContent}>추가</button>
      <button onClick={saveReport}>보고서 저장</button> {/* 저장 버튼 추가 */}
    </>
  );
};

export default OrganismBizAnalysisSection;

const Styled = styled.div``;
