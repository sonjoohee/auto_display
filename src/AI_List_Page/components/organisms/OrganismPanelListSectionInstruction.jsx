// src/AI_List_Page/components/organisms/OrganismPanelListSection.jsx

import React, { useState } from "react";
import styled from "styled-components";
import MoleculePanelItem from "../molecules/MoleculePanelItem";
import AtomCheckbox from "../atoms/AtomCheckbox";
import { palette } from "../../assets/styles/Palette";
import panelData from "../../data/panelData";  // 더미 데이터 또는 API 호출

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

const OrganismPanelListSection = ({ service, time }) => {
  const [selectedCount, setSelectedCount] = useState(0);

  const handleSelect = (isSelected) => {
    setSelectedCount((prevCount) => isSelected ? prevCount + 1 : prevCount - 1);
  };

  return (
    <PanelWrap>
      <div className="sortBooth">
        <AtomCheckbox id="allChk" label="전체 선택" />
        <div className="choicePanel">
          210명의 패널 중 <strong>{selectedCount}</strong>명의 패널을 선택하셨어요
        </div>
        <div className="viewList">
          <input type="radio" id="setCardType" name="viewGroup" value="card" />
          <label htmlFor="setCardType">카드보기</label>
          <input type="radio" id="setListType" name="viewGroup" value="list" />
          <label htmlFor="setListType">목록보기</label>
        </div>
      </div>
      <PanelList>
        {panelData.map((panel) => (
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
            onSelect={handleSelect}
            service={service}
            time={time}
          />
        ))}
      </PanelList>
    </PanelWrap>
  );
};

export default OrganismPanelListSection;
