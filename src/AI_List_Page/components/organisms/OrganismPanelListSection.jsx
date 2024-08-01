// src/AI_List_Page/components/organisms/OrganismPanelListSection.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoleculePanelItem from "../molecules/MoleculePanelItem";
import MoleculePanelControls from "../molecules/MoleculePanelControls";
import { palette } from "../../assets/styles/Palette";

import panelimages from "../../assets/styles/PanelImages";
import { useAtom } from "jotai";
import axios from "axios";
import { 
  TOTAL_PANEL_COUNT,
  PANEL_LIST,
  SELECTED_PANEL_COUNT,
  SEARCH_BEHABIORAL_TYPE,
  SEARCH_UTILIZATION_TIME, 
  SEARCH_GENDER, 
  SEARCH_AGE, 
  SEARCH_MARRIAGE, 
  SEARCH_CHILD, 
  SEARCH_CONSUMPTION, 
  SEARCH_TECHNOLOGY,
} from "../../../AtomStates";

const OrganismPanelListSection = () => {

  const [panelList, setPanelList] = useAtom(PANEL_LIST);
  const [searchBehabioralType, setSearchBehabioralType] = useAtom(SEARCH_BEHABIORAL_TYPE);
  const [searchUtilizationTime, setSearchUtilizationTime] = useAtom(SEARCH_UTILIZATION_TIME);
  const [searchGender, setSearchGender] = useAtom(SEARCH_GENDER);
  const [searchAge, setSearchAge] = useAtom(SEARCH_AGE);
  
  // 패널 데이터의 실제 개수를 고려하여 초기 visiblePanels 설정
  const initialVisiblePanels = panelData?.length ? Math.min(panelData.length, 20) : 0;
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
    const allPanelIds = panelData.slice(0, visiblePanels).map(panel => panel.id);
    setSelectedPanels(isSelected ? new Set(allPanelIds) : new Set());
    setSelectedCount(isSelected ? allPanelIds.length : 0);
  };

  const handleLoadMore = () => {
    setVisiblePanels((prevCount) => {
      const remainingPanels = panelData.length - prevCount;
      return prevCount + (remainingPanels >= 20 ? 20 : remainingPanels);
    });
  };

  const handleViewChange = (e) => {
    console.log(`View changed to: ${e.target.value}`);
  };

  // panelData가 유효한지 확인
  if (!Array.isArray(panelData) || panelData.length === 0) {
    return <p>패널 데이터가 없습니다.</p>;
  }

  // 최초 패널 리스트
  useEffect(() => {
    const fetchPanelList = async () => {
      console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/panels/list?page=1&size=20`);
        setPanelList(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching panel list:", error);
      }
    };

    fetchPanelList();
  }, [setPanelList]);

  return (
    <PanelWrap>
      <div className="sortBooth">
        <AtomCheckbox id="allChk" label="전체 선택" />
        <div className="choicePanel">
          {panelList.length}명의 패널 중 <strong>{selectedCount}</strong>명의 패널을 선택하셨어요
        </div>
        <div className="viewList">
          <input type="radio" id="setCardType" name="viewGroup" value="card" />
          <label htmlFor="setCardType">카드보기</label>
          <input type="radio" id="setListType" name="viewGroup" value="list" />
          <label htmlFor="setListType">목록보기</label>
        </div>
      </div>
      <PanelList>
        {panelList.map((panel) => (
          <MoleculePanelItem
            key={panel.id}
            id={panel.id}
            gender={panel.gender}
            age={panel.age}
            job={panel.job}
            address={panel.address}
            subAddress={panel.subAddress}
            imgSrc={panel.img}
            tags={panel.tag}
            comment={panel.comment}
            lifeStyle={panel.lifeStyle}
            consumption={panel.consumptionPropensity}
            productGroup={panel.productGroup}
            onSelect={handleSelect}
          />
          ))}
      </PanelList>
      {visiblePanels < panelData.length && (
        <LoadMoreButton onClick={handleLoadMore}>20명의 패널 더보기</LoadMoreButton>
      )}
    </PanelWrap>
  );
};

export default OrganismPanelListSection;

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
