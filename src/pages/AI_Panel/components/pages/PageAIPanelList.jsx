// PageAIPanelListInfinite.jsx
import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OrganismHeader from '../organisms/OrganismHeader';
import OrganismSearchSection from '../organisms/OrganismSearchSection';
import OrganismPanelCardSection from '../organisms/OrganismPanelCardSection';
import OrganismPanelCardSectionBiz from '../organisms/OrganismPanelCardSectionBiz';
import OrganismPanelCardSectionInstruction from '../organisms/OrganismPanelCardSectionInstruction';
import OrganismPanelCardSectionBottomBar from '../organisms/OrganismPanelCardSectionBottomBar'; // 수정된 컴포넌트 이름
import { ContentsWrap } from '../../../../assets/styles/Common';
import MoleculeTabMenu from "../molecules/MoleculeTabMenu";
import { SELECTED_COUNT, selectedPanelsAtom, PANEL_LIST_PAGE_COUNT, IS_FIRST_PANELS_LOADED, } from '../../../AtomStates';
import BusinessTool from '../../../Business_Tool';

const PageAIPanelListInfinite = () => {
  const [activeTab, setActiveTab] = useState('aiPanel');
  const [selectedCount, setSelectedCount] = useAtom(SELECTED_COUNT);
  const [, setSelectedPanels] = useAtom(selectedPanelsAtom);
  const [, setPanelListPageCount] = useAtom(PANEL_LIST_PAGE_COUNT);
  const navigate = useNavigate();

  const handleSelect = (isSelected) => {
    setSelectedCount(prevCount => isSelected ? prevCount + 1 : prevCount - 1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCount(0);
    setPanelListPageCount(0);
    setSelectedPanels(new Set());
  };

  const handleSaveSelection = () => {
    alert('선택패널이 저장되었습니다.');
  };

  const renderPanelListSection = () => {
    switch (activeTab) {
      case 'aiPanel':
        return <OrganismPanelCardSection onSelect={handleSelect} />;
      case 'biz':
        return <BusinessTool onSelect={handleSelect} />;
      case 'instruction':
        return <OrganismPanelCardSectionInstruction onSelect={handleSelect} />;
      default:
        return <OrganismPanelCardSection onSelect={handleSelect} />;
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
      {selectedCount > 0 && (
        <OrganismPanelCardSectionBottomBar onSaveSelection={handleSaveSelection} />
      )}
    </>
  );
};

export default PageAIPanelListInfinite;
