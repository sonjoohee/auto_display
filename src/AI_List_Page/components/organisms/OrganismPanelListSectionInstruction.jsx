// src/AI_List_Page/components/organisms/OrganismPanelListSection.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoleculePanelItem from "../molecules/MoleculePanelItem";
import AtomCheckbox from "../atoms/AtomCheckbox";
import { palette } from "../../assets/styles/Palette";

import panelimages from "../../assets/styles/PanelImages";
import { useAtom } from "jotai";
import axios from "axios";
import { 
  TOTAL_PANEL_COUNT,
  PANEL_LIST,
  FILTERED_PANEL_LIST,
  SELECTED_PANEL_COUNT,
  SEARCH_KEYWORD,
  SEARCH_TIME, 
  SEARCH_GENDER, 
  SEARCH_AGE, 
  SEARCH_MARRIAGE, 
  SEARCH_CHILD, 
  SEARCH_CONSUMPTION, 
  SEARCH_TECHNOLOGY,
} from "../../../AtomStates";

const OrganismPanelListSectionInstruction = () => {

  const [panelList, setPanelList] = useAtom(PANEL_LIST);
  const [filteredPanelList, setFilteredPanelList] = useAtom(FILTERED_PANEL_LIST);
  const [searchKeyword, setSearchKeyword] = useAtom(SEARCH_KEYWORD);
  const [searchTime, setSearchTime] = useAtom(SEARCH_TIME);
  const [searchGender, setSearchGender] = useAtom(SEARCH_GENDER);
  const [searchAge, setSearchAge] = useAtom(SEARCH_AGE);

  const [selectedCount, setSelectedCount] = useState(0);

  const handleSelect = (isSelected) => {
    setSelectedCount((prevCount) => isSelected ? prevCount + 1 : prevCount - 1);
  };

  // 전체 패널 리스트 
  useEffect(() => {
    const fetchPanelList = async () => {
      console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/panels/list`);
        setPanelList(response.data);
      } catch (error) {
        console.error("Error fetching panel list:", error);
      }
    };

    fetchPanelList();
  }, [setPanelList]);

  // 검색어가 없을 때 필터링된 리스트는 전체 리스트
  useEffect(() => {
    if (searchKeyword === "" && searchTime === "" && searchGender === "" && searchAge === "") {
        setFilteredPanelList(panelList);
    }
  }, [panelList, searchKeyword, searchTime, searchGender, searchAge, setFilteredPanelList]);

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
        {filteredPanelList.map((panel) => (
          <MoleculePanelItem
            key={panel.id}
            id={panel.id}
            gender={panel.gender}
            age={panel.age}
            imgSrc={panel.img}
            tags={panel.tag}
            lifeStyle={panel.lifeStyle}
            consumption={panel.consumptionPropensity}
            interest={panel.productGroup}
            onSelect={handleSelect}
            time={panel.timeImportance}
          />
          ))}
      </PanelList>
    </PanelWrap>
  );
};

export default OrganismPanelListSectionInstruction;

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