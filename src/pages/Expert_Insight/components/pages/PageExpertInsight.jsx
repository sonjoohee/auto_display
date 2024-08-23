// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\pages\PageExpertInsight.jsx

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import OrganismHeader from '../../../organisms/OrganismHeader';
import OrganismSideBar from '../organisms/OrganismSideBar';
import OrganismSearchBottomBar from '../organisms/OrganismSearchBottomBar';
import MoleculeBizName from '../molecules/MoleculeBizName';
import MoleculeSystemMessage from '../molecules/MoleculeSystemMessage';
import OrganismBizAnalysisSection from '../organisms/OrganismBizAnalysisSection'; // 이미 작성된 컴포넌트
import OrganismBizExpertSelect from '../organisms/OrganismBizExpertSelect';

const PageExpertInsight = () => {
  const navigate = useNavigate();

  const handleSearch = (inputValue) => {
    console.log("Searching for:", inputValue);
  };

  return (
    <>
      <OrganismHeader />
      <OrganismSideBar />

      {/* Biz Name Section */}
      <MoleculeBizName />

      <MainContent>
        {/* 시스템 메시지 */}
        <MoleculeSystemMessage />

        {/* 비즈니스 분석 섹션 */}
        <OrganismBizAnalysisSection />

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
`;
