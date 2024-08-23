// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\pages\PageExpertInsight.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
} from '../../../AtomStates';

import OrganismHeader from '../../../organisms/OrganismHeader';
import OrganismSideBar from '../organisms/OrganismSideBar';
import OrganismTakingChargeAiExpert from '../organisms/OrganismTakingChargeAiExpert';
import OrganismBizAnalysisSection from '../organisms/OrganismBizAnalysisSection';
import OrganismSearchBottomBar from '../organisms/OrganismSearchBottomBar';
import MoleculeBizName from '../molecules/MoleculeBizName';
import MoleculeSystemMessage from '../molecules/MoleculeSystemMessage';
<<<<<<< HEAD
import MoleculeUserMessage from '../molecules/MoleculeUserMessage';
import OrganismBizAnalysisSection from '../organisms/OrganismBizAnalysisSection';
=======
>>>>>>> 2b6ba8ec5b24fa6e96e1a33bcb74ba08ec89763f
import OrganismBizExpertSelect from '../organisms/OrganismBizExpertSelect';


const PageExpertInsight = () => {
  const navigate = useNavigate();
  const [userMessage, setUserMessage] = useState('');

  const handleSearch = (inputValue) => {
    console.log("Searching for:", inputValue);
    setUserMessage(inputValue);
  };

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);

  return (
    <>
        {/* <OrganismHeader/> */}
        <OrganismSideBar/>
    
        {selectedExpertIndex !== 0 ? <OrganismTakingChargeAiExpert/> : ''}

      <OrganismHeader />
      <OrganismSideBar />

      {/* Biz Name Section */}
      <MoleculeBizName />

      <MainContent>
        {/* 시스템 메시지 */}
        <MoleculeSystemMessage />

        {/* 비즈니스 분석 섹션 */}
        <OrganismBizAnalysisSection />

        {/* 유저 메시지 */}
        <MoleculeUserMessage message={userMessage} />

        {/* 전문가 선택 섹션 */}
        <OrganismBizExpertSelect />
      </MainContent>

      <OrganismSearchBottomBar onSearch={handleSearch} />
    </>
  );
};

export default PageExpertInsight;

// MainContent에 상단 패딩 추가
const MainContent = styled.div`
  margin-left: 240px; /* 사이드바가 차지하는 공간을 고려하여 여백 설정 */
  padding: 200px 20px 20px; /* 상단 패딩 추가 */
  background-color: #fff; /* 메인 콘텐츠 배경색 */
  min-height: 100vh;
  display: flex;
  flex-direction: column; /* 요소들이 수직으로 배치되도록 설정 */
`;

