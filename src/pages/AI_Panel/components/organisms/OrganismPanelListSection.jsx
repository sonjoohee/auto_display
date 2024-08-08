// src/AI_List_Page/components/organisms/OrganismPanelListSection.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoleculePanelItem from "../molecules/MoleculePanelItem";
import MoleculePanelControls from "../molecules/MoleculePanelControls";
import { palette } from "../../../../assets/styles/Palette";
import { Link } from "react-router-dom";
import OrganismPanelListSectionBottomBar from "./OrganismPanelListSectionBottomBar"; // 하단 바 컴포넌트 import

import panelimages from "../../../../assets/styles/PanelImages";
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
  PANEL_LIST_PAGE_COUNT,
  SELECTED_COUNT,
  SELECTED_PANELS
} from "../../../AtomStates";

const OrganismPanelListSection = () => {

  const [panelList, setPanelList] = useAtom(PANEL_LIST);
  const [searchBehabioralType, setSearchBehabioralType] = useAtom(SEARCH_BEHABIORAL_TYPE);
  const [searchUtilizationTime, setSearchUtilizationTime] = useAtom(SEARCH_UTILIZATION_TIME);
  const [searchGender, setSearchGender] = useAtom(SEARCH_GENDER);
  const [searchAge, setSearchAge] = useAtom(SEARCH_AGE);
  const [panelListPageCount, setPanelListPageCount] = useAtom(PANEL_LIST_PAGE_COUNT);
  const [selectedCount, setSelectedCount] = useAtom(SELECTED_COUNT);
  const [selectedPanels, setSelectedPanels] = useAtom(SELECTED_PANELS); // 선택된 패널의 ID 저장

  const [isAllPanelsLoaded, setIsAllPanelsLoaded] = useState(false);

  // 패널 저장 테스트용
  useEffect(() => {
    console.log("selectedPanels:", selectedPanels);
  }, [selectedPanels]);

  const handleSelect = (isSelected, panelId) => {
    console.log("Selected Panel ID:", panelId);
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

  const handleLoadMore = () => {
    setPanelListPageCount(prevPageCount => prevPageCount + 1);
  };

  const handleViewChange = (e) => {
    console.log(`View changed to: ${e.target.value}`);
  };

  // 최초 패널 리스트
  useEffect(() => {
    const searchParams = {
      searchBehabioralType,
      searchUtilizationTime,
      searchGender,
      searchAge,
    };
    const fetchInitialPanelList = async () => {
      console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/panels/list?page=1&size=20&field_go=식당`, {
          params: {
            searchParams
          }
        });
        setPanelList(response.data.results);
        
        if (response.data.results.length < 20) setIsAllPanelsLoaded(true); // 20개 미만의 데이터가 오면 동작

        console.log(searchParams);
      } catch (error) {
        console.error("Error fetching panel list:", error);
      }
    };

    fetchInitialPanelList();
  }, []);

  // 추가 패널 리스트
  useEffect(() => {
    const searchParams = {
      searchBehabioralType,
      searchUtilizationTime,
      searchGender,
      searchAge,
    };
    if (panelListPageCount > 1) {
      const fetchAdditionalPanelList = async () => {
        console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/panels/list?page=${panelListPageCount}&size=20&field_go=식당`, {
            params: {
              searchParams
            }
          });
          setPanelList(prevPanelList => [...prevPanelList, ...response.data.results]); // 리스트 초기화 하지 않고 아래에 붙이기
          
          if (response.data.results.length < 20) setIsAllPanelsLoaded(true); // 20개 미만의 데이터가 오면 동작

          console.log(searchParams);
        } catch (error) {
          console.error("Error fetching panel list:", error);
        }
      };

      fetchAdditionalPanelList();
    }
  }, [panelListPageCount]); // panelListPageCount가 변경될 때마다 실행

  // // 하단 바가 나타날 때 스크롤 조정
  // useEffect(() => {
  //   if (selectedCount > 0) {
  //     window.scrollBy({
  //       top: 100, // 하단 바 높이만큼 조정
  //       behavior: "smooth",
  //     });
  //   }
  // }, [selectedCount]);

  // panelData가 유효한지 확인
  if (!Array.isArray(panelList) || panelList.length === 0) {
    return <p>패널 데이터가 없습니다.</p>;
  }

  return (
    <>
      <PanelWrap>
        <MoleculePanelControls
          selectedCount={selectedCount}
          onViewChange={handleViewChange}
          loadedPanelCount={panelList.length}
        />
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
        {isAllPanelsLoaded ? (
          <CreatePanelLink to="/createpanel" isBottomBarVisible={selectedCount > 0}>
          원하시는 패널이 없나요? 직접 만들어 보세요!
        </CreatePanelLink>
        ) : (
          20 <= panelList.length && (
            <LoadMoreButton isBottomBarVisible={selectedCount > 0} onClick={handleLoadMore}>
              20명의 패널 더보기
            </LoadMoreButton>
          )
        )}
      </PanelWrap>
      {selectedCount > 0 && (
        <OrganismPanelListSectionBottomBar onSaveSelection={() => alert("선택패널이 저장되었습니다.")} />
      )}
    </>
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
  margin-bottom: 10px; /* 기본적으로 충분한 하단 여백 추가 */
`;

const LoadMoreButton = styled.button`
  position: relative;
  font-size:0.88rem;
  color: ${palette.gray};
  display: block;
  margin: ${({ isBottomBarVisible }) => (isBottomBarVisible ? '50px auto 120px' : '50px auto 120px')}; /* 하단 바가 보일 때 더 위로 이동 */
  padding: 12px 20px;
  border: 1px solid ${palette.gray};
  border-radius: 40px;
  cursor: pointer;
  background-color: ${palette.white};
  z-index: 10;
  transition:all .5s;

  &:hover {
    background-color: rgba(0,0,0,.05);
  }
`;

const CreatePanelLink = styled(Link)`
  display: block;
  margin: ${({ isBottomBarVisible }) => (isBottomBarVisible ? '20px auto 120px' : '20px auto')}; /* 하단 바가 보일 때 더 위로 이동 */
  padding: 10px 20px;
  background-color: ${palette.blue};
  color: ${palette.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  z-index: 10;
`;