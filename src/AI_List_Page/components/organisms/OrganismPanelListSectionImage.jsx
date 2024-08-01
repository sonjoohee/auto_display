import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MoleculePanelItemImage from "../molecules/MoleculePanelItem";
import MoleculePanelControls from "../molecules/MoleculePanelControls";
import { palette } from "../../assets/styles/Palette";
import panelDataImage from "../../data/panelDataImage";  // 더미 데이터 또는 API 호출

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

const OrganismPanelListSectionImage = ({ service, time }) => {
  // 패널 데이터의 실제 개수를 고려하여 초기 visiblePanels 설정
  const initialVisiblePanels = panelDataImage?.length ? Math.min(panelDataImage.length, 20) : 0;
  const [visiblePanels, setVisiblePanels] = useState(initialVisiblePanels);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedPanels, setSelectedPanels] = useState(new Set());

  const handleSelect = (isSelected, panelId) => {
    setSelectedCount((prevCount) => isSelected ? prevCount + 1 : prevCount - 1);
    setSelectedPanels((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (isSelected) {
        newSelected.add(panelId);
      } else {
        newSelected.delete(panelId);
      }
      return newSelected;
    });
  };

  const handleSelectAll = (isSelected) => {
    const allPanelIds = panelDataImage.slice(0, visiblePanels).map(panel => panel.id);
    setSelectedPanels(isSelected ? new Set(allPanelIds) : new Set());
    setSelectedCount(isSelected ? allPanelIds.length : 0);
  };

  const handleLoadMore = () => {
    setVisiblePanels((prevCount) => {
      const remainingPanels = panelDataImage.length - prevCount;
      return prevCount + (remainingPanels >= 20 ? 20 : remainingPanels);
    });
  };

  const handleViewChange = (e) => {
    console.log(`View changed to: ${e.target.value}`);
  };

  // panelDataImage가 유효한지 확인
  if (!Array.isArray(panelDataImage) || panelDataImage.length === 0) {
    return <p>패널 데이터가 없습니다.</p>;
  }

  return (
    <PanelWrap>
      <MoleculePanelControls
        selectedCount={selectedCount}
        onViewChange={handleViewChange}
        onSelectAll={handleSelectAll}
        loadedPanelCount={visiblePanels}
      />
      <PanelList>
        {panelDataImage.slice(0, visiblePanels).map((panel) => (
          <MoleculePanelItemImage
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
      {visiblePanels < panelDataImage.length && (
        <LoadMoreButton onClick={handleLoadMore}>20명의 패널 더보기</LoadMoreButton>
      )}
    </PanelWrap>
  );
};

export default OrganismPanelListSectionImage;
