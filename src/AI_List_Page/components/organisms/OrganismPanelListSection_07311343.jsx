import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from 'jotai';
import MoleculePanelItem from "../molecules/MoleculePanelItem";
import MoleculePanelControls from "../molecules/MoleculePanelControls";
import { palette } from "../../assets/styles/Palette";
import panelData from "../../data/panelData";  // 더미 데이터 또는 API 호출
import { selectedPanelCountAtom, loadedPanelCountAtom, selectedPanelsAtom } from '../../../AtomStates';

const PanelWrap = styled.section`
  .sortBooth {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  .choicePanel {
    strong {
      font-weight: 400;
      margin: 0 12px;
      padding: 4px 20px;
      border-radius: 10px;
      background: rgba(4, 83, 244, 0.1);
    }
  }

  .viewList {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 30px;

    input[type="radio"] {
      opacity: 0;
    }

    input[type="radio"] + label {
      position: relative;
      padding-left: 28px;
      cursor: pointer;
    }
  }
`;

const PanelList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: ${palette.blue};
  color: ${palette.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const OrganismPanelListSectionInfinite = ({ service, time, onSelect }) => {
  const [visiblePanels, setVisiblePanels] = useState(20);
  const [selectedCount, setSelectedCount] = useAtom(selectedPanelCountAtom);
  const [selectedPanels, setSelectedPanels] = useAtom(selectedPanelsAtom);
  const [, setLoadedPanelCount] = useAtom(loadedPanelCountAtom);

  useEffect(() => {
    setLoadedPanelCount(visiblePanels);
  }, [visiblePanels, setLoadedPanelCount]);

  // const handleSelect = (isSelected, panelId) => {
  //   setSelectedPanels(prevSelected => {
  //     const newSelected = new Set(prevSelected);
  //     if (isSelected) {
  //       newSelected.add(panelId);
  //     } else {
  //       newSelected.delete(panelId);
  //     }
  //     setSelectedCount(newSelected.size); // Update selectedCount based on the size of the set
  //     return newSelected;
  //   });
  //   onSelect(isSelected);
  // };
  
  const handleSelect = (isSelected, panelId) => {
    setSelectedCount((prevCount) => isSelected ? prevCount + 1 : prevCount - 1);
    if (isSelected) {
      setSelectedPanels(prevSelected => new Set(prevSelected).add(panelId));
    } else {
      setSelectedPanels(prevSelected => {
        const newSelected = new Set(prevSelected);
        newSelected.delete(panelId);
        return newSelected;
      });
    }
    onSelect(isSelected);
  };
  const handleLoadMore = () => {
    setVisiblePanels((prevCount) => prevCount + 20);
  };

  // const handleSelectAll = (isSelected) => {
  //   const allPanelIds = panelData.slice(0, visiblePanels).map(panel => panel.id);
  //   const newSelectedPanels = isSelected ? new Set(allPanelIds) : new Set();
  //   setSelectedPanels(newSelectedPanels);
  //   setSelectedCount(newSelectedPanels.size); // Update selectedCount based on the size of the set
  // };
  const handleSelectAll = (isSelected) => {
    const allPanelIds = panelData.slice(0, visiblePanels).map(panel => panel.id);
    setSelectedPanels(isSelected ? new Set(allPanelIds) : new Set());
    setSelectedCount(isSelected ? allPanelIds.length : 0);
  };

  const handleViewChange = (e) => {
    console.log(`View changed to: ${e.target.value}`);
  };

  return (
    <PanelWrap>
      <MoleculePanelControls
        selectedCount={selectedCount}
        onSelectAll={handleSelectAll}
        onViewChange={handleViewChange}
        loadedPanelCount={visiblePanels}  // Add this prop to pass the loaded panel count
      />
      <PanelList>
        {panelData.slice(0, visiblePanels).map((panel) => (
          <MoleculePanelItem
            key={panel.id}
            id={panel.id}
            imgSrc={panel.imgSrc}
            altText={panel.altText}
            description={panel.description}
            tags={panel.tags}
            lifeStyle={panel.lifeStyle}
            consumption={panel.consumption}
            interest={panel.interest}
            onSelect={(isSelected) => handleSelect(isSelected, panel.id)}
            service={service}
            time={time}
          />
        ))}
      </PanelList>
      {visiblePanels < panelData.length && (
        <LoadMoreButton onClick={handleLoadMore}>20명의 패널 더보기</LoadMoreButton>
      )}
    </PanelWrap>
  );
};

export default OrganismPanelListSectionInfinite;
