// src/AI_List_Page/components/pages/PageAIPanelListInfinite.jsx

import React, { useState } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import OrganismHeader from '../organisms/OrganismHeader';
import OrganismSearchSection from '../organisms/OrganismSearchSection';
import OrganismPanelListSectionImage from '../organisms/OrganismPanelListSectionImage';
import OrganismPanelListSectionBizImage from '../organisms/OrganismPanelListSectionBizImage';
import OrganismPanelListSectionInstructionImage from '../organisms/OrganismPanelListSectionInstructionImage';
import { ContentsWrap } from '../../assets/styles/Common';
import MoleculeTabMenu from "../molecules/MoleculeTabMenu";
import { selectedPanelCountAtom, selectedPanelsAtom,loadedPanelCountAtom } from '../../../AtomStates';

const PageAIPanelList = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const [, SET_SELECTED_COUNT] = useAtom(selectedPanelCountAtom);
  const [, SET_SELECTED_PANELS] = useAtom(selectedPanelsAtom);
  const [, SET_LOADED_PANEL_COUNT] = useAtom(loadedPanelCountAtom);


  const handleSelect = (isSelected) => {
    SET_SELECTED_COUNT(prevCount => isSelected ? prevCount + 1 : prevCount - 1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    SET_SELECTED_COUNT(0);  // 탭을 변경할 때 선택된 패널의 갯수를 초기화
    SET_LOADED_PANEL_COUNT(0);
    SET_SELECTED_PANELS(new Set());  // 선택된 패널의 상태 초기화
  };

  const renderPanelListSection = () => {
    switch (activeTab) {
      case 'ai':
        return <OrganismPanelListSectionImage onSelect={handleSelect} />;
      case 'biz':
        return <OrganismPanelListSectionBizImage onSelect={handleSelect} />;
      case 'preset':
        return <OrganismPanelListSectionInstructionImage onSelect={handleSelect} />;
      default:
        return <OrganismPanelListSectionImage onSelect={handleSelect} />;
    }
  };

  return (
    <>
      <OrganismHeader />
      <ContentsWrap>
        <MoleculeTabMenu activeTab={activeTab} onSelectTab={handleTabChange} />
        <OrganismSearchSection />
        {renderPanelListSection()}
      </ContentsWrap>
    </>
  );
};

export default PageAIPanelList;
