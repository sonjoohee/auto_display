// PageAIPanelListInfinite.jsx
import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OrganismHeader from '../organisms/OrganismHeader';
import OrganismSearchSection from '../organisms/OrganismSearchSection';
import OrganismPanelListSection from '../organisms/OrganismPanelListSection';
import OrganismPanelListSectionBiz from '../organisms/OrganismPanelListSectionBiz';
import OrganismPanelListSectionInstruction from '../organisms/OrganismPanelListSectionInstruction';
import OrganismPanelListSectionBottomBar from '../organisms/OrganismPanelListSectionBottomBar'; // 수정된 컴포넌트 이름
import { ContentsWrap } from '../../../../assets/styles/Common';
import MoleculeTabMenu from "../molecules/MoleculeTabMenu";
import { SELECTED_COUNT, selectedPanelsAtom, PANEL_LIST_PAGE_COUNT } from '../../../AtomStates';
import BusinessTool from '../../../Business_Tool';

const PageAIPanelListInfinite = () => {
  const [activeTab, setActiveTab] = useState('ai');
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

  // 임시로 비즈니스 툴로
  useEffect(() => {
    if (activeTab === 'biz') {
      navigate('/');
    }
  }, [activeTab, navigate]);

  const handleSaveSelection = () => {
    alert('선택패널이 저장되었습니다.');
  };

  const renderPanelListSection = () => {
    switch (activeTab) {
      case 'ai':
        return <OrganismPanelListSection onSelect={handleSelect} />;
      // case 'biz':
      //   return <BusinessTool onSelect={handleSelect} />;
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
        <MoleculeTabMenu activeTab={activeTab} onSelectTab={handleTabChange} />
        <OrganismSearchSection />
        {renderPanelListSection()}
      </ContentsWrap>
      {selectedCount > 0 && (
        <OrganismPanelListSectionBottomBar onSaveSelection={handleSaveSelection} />
      )}
    </>
  );
};

export default PageAIPanelListInfinite;
