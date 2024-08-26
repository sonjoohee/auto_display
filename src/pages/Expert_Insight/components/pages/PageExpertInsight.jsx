// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\pages\PageExpertInsight.jsx

import React from 'react';
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
import OrganismBizExpertSelect from '../organisms/OrganismBizExpertSelect';


const PageExpertInsight = () => {
  const navigate = useNavigate();

  const handleSearch = (inputValue) => {
    console.log("Searching for:", inputValue);
  };

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);

  return (
    <>
        {/* <OrganismHeader/> */}
        {/* <OrganismSideBar/> */}
    
        {selectedExpertIndex !== 0 ? <OrganismTakingChargeAiExpert/> : ''}

      <OrganismHeader />

      <ContentsWrap>
        <OrganismSideBar />

        <MainContent>
          {/* Biz Name Section */}
          <MoleculeBizName />

          {/* 시스템 메시지 */}
          <MoleculeSystemMessage />

          {/* 비즈니스 분석 섹션 */}
          <OrganismBizAnalysisSection />

          {/* 전문가 선택 섹션 */}
          <OrganismBizExpertSelect />
        </MainContent>
      </ContentsWrap>

      <OrganismSearchBottomBar onSearch={handleSearch} />
    </>
  );
};

export default PageExpertInsight;

// MainContent에 상단 패딩 추가
const MainContent = styled.div`
  grid-area:content;
  min-width:1px;
  max-width:1135px;
  padding-bottom:150px;
  margin:0 auto;
`;

const ContentsWrap = styled.div`
  position:relative;
  width:calc(100% - 45px);
  // display:grid;
  // grid-template-rows:auto 1fr;
  // grid-template-columns:1fr 4fr;
  // grid-template-areas:"toc content";
  // gap:40px;
  margin:150px auto 0;
  padding-left:380px;
  padding-right:380px;
`;