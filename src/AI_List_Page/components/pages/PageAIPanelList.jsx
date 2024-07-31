// src/AI_List_Page/components/pages/PageAIPanelListInfinite.jsx

import React, { useState } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import OrganismHeader from '../organisms/OrganismHeader';
import OrganismSearchSection from '../organisms/OrganismSearchSection';
import OrganismPanelListSection from '../organisms/OrganismPanelListSection';
import OrganismPanelListSectionBiz from '../organisms/OrganismPanelListSectionBiz';
import OrganismPanelListSectionInstruction from '../organisms/OrganismPanelListSectionInstruction';
import { ContentsWrap } from '../../assets/styles/Common';
import MoleculeTabMenu from "../molecules/MoleculeTabMenu";
import { selectedPanelCountAtom, selectedPanelsAtom,loadedPanelCountAtom } from '../../../AtomStates';

const PageAIPanelListInfinite = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const [, setSelectedCount] = useAtom(selectedPanelCountAtom);
  const [, setSelectedPanels] = useAtom(selectedPanelsAtom);
  const [, setloadedPanelCount] = useAtom(loadedPanelCountAtom);


  const handleSelect = (isSelected) => {
    setSelectedCount(prevCount => isSelected ? prevCount + 1 : prevCount - 1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCount(0);  // 탭을 변경할 때 선택된 패널의 갯수를 초기화
    setloadedPanelCount(0);
    setSelectedPanels(new Set());  // 선택된 패널의 상태 초기화
  };

  const renderPanelListSection = () => {
    switch (activeTab) {
      case 'ai':
        return <OrganismPanelListSection onSelect={handleSelect} />;
      case 'biz':
        return <OrganismPanelListSectionBiz onSelect={handleSelect} />;
      case 'preset':
        return <OrganismPanelListSectionInstruction onSelect={handleSelect} />;
      default:
        return <OrganismPanelListSection onSelect={handleSelect} />;
    }
  };

  return (
    <>
      <OrganismHeader />
      <ContentsWrap>
        <OrganismSearchSection />
        <MoleculeTabMenu activeTab={activeTab} onSelectTab={handleTabChange} />
        {renderPanelListSection()}
      </ContentsWrap>
    </>
  );
};

export default PageAIPanelListInfinite;
