// OrganismPanelListSection.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoleculePanelItem2 from "../molecules/MoleculePanelItem2"; // 수정된 MoleculePanelItem2를 import
import { palette } from "../../../../assets/styles/Palette";
import OrganismPanelCardSectionBottomBar from "./OrganismPanelCardSectionBottomBar";
import { useAtom } from "jotai";
import axios from "axios";
import { 
  TOTAL_PANEL_COUNT,
  PANEL_LIST,
  SELECTED_COUNT,
  SELECTED_PANELS,
  SELECTED_ALL_PANELS,
  IS_ALL_PANELS_LOADED,
  FILTERD_PANEL_COUNT,
  IS_PANEL_NULL,
  PANEL_LIST_PAGE_COUNT,
  SEARCH_BEHABIORAL_TYPE,
  SEARCH_UTILIZATION_TIME,
  SEARCH_GENDER,
  SEARCH_AGE,
  SEARCH_MARRIAGE,
  SEARCH_CHILD_M,
  SEARCH_CHILD_F,
  SEARCH_TAG_1,
  SEARCH_TAG_2,
  SEARCH_TAG_3,
  SEARCH_TAG_4,
  IS_RE_SEARCH,
  PANEL_TOTAL_VALUE,
} from "../../../AtomStates";

const OrganismPanelListSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [panelList, setPanelList] = useAtom(PANEL_LIST);
  const [selectedCount, setSelectedCount] = useAtom(SELECTED_COUNT);
  const [selectedPanels, setSelectedPanels] = useAtom(SELECTED_PANELS);
  const [selectedAllPanels, setSelectedAllPanels] = useAtom(SELECTED_ALL_PANELS);

  const [totalPanelCount, setTotalPanelCount] = useAtom(TOTAL_PANEL_COUNT);
  const [filterdPanelCount, setFilterdPanelCount] = useAtom(FILTERD_PANEL_COUNT);
  const [isAllPanelsLoaded, setIsAllPanelsLoaded] = useAtom(IS_ALL_PANELS_LOADED);
  const [isPanelNull, setIsPanelNull] = useAtom(IS_PANEL_NULL);
  const [panelListPageCount, setPanelListPageCount] = useAtom(PANEL_LIST_PAGE_COUNT);

  // 검색 관련 상태들
  const [searchBehabioralType, setSearchBehabioralType] = useAtom(SEARCH_BEHABIORAL_TYPE);
  const [searchUtilizationTime, setSearchUtilizationTime] = useAtom(SEARCH_UTILIZATION_TIME);
  const [searchGender, setSearchGender] = useAtom(SEARCH_GENDER);
  const [searchAge, setSearchAge] = useAtom(SEARCH_AGE);
  const [searchMarriage, setSearchMarriage] = useAtom(SEARCH_MARRIAGE);
  const [searchChildM, setSearchChildM] = useAtom(SEARCH_CHILD_M);
  const [searchChildF, setSearchChildF] = useAtom(SEARCH_CHILD_F);
  const [searchTag1, setSearchTag1] = useAtom(SEARCH_TAG_1);
  const [searchTag2, setSearchTag2] = useAtom(SEARCH_TAG_2);
  const [searchTag3, setSearchTag3] = useAtom(SEARCH_TAG_3);
  const [searchTag4, setSearchTag4] = useAtom(SEARCH_TAG_4);
  const [isReSearch, setIsReSearch] = useAtom(IS_RE_SEARCH);
  const [panelTotalValue, setPanelTotalValue] = useAtom(PANEL_TOTAL_VALUE);

  const handleAllSelectChange = (e) => {
    if (e.target.checked) {
      const allPanelIds = new Set(panelList.map((panel) => panel.id));
      setSelectedPanels(allPanelIds);
      setSelectedCount(panelList.length);
      setSelectedAllPanels(true);
    } else {
      setSelectedPanels(new Set());
      setSelectedCount(0);
      setSelectedAllPanels(false);
    }
  };

  useEffect(() => {
    panelList.length === selectedCount ? setSelectedAllPanels(true) : setSelectedAllPanels(false);
  }, [selectedCount, panelList]);

  useEffect(() => {
    if (selectedAllPanels) {
      const allPanelIds = new Set(panelList.map((panel) => panel.id));
      setSelectedCount(panelList.length);
      setSelectedPanels(allPanelIds);
    }
  }, [selectedAllPanels]);

  useEffect(() => {
    console.log("selectedPanels:", selectedPanels);
  }, [selectedPanels]);

  const handleSelect = (isSelected, panelId) => {
    setSelectedCount((prevCount) => {
      const newCount = isSelected ? prevCount + 1 : prevCount - 1;
      return Math.min(filterdPanelCount, Math.max(0, newCount));
    });
    setSelectedPanels((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (isSelected) {
        if (newSelected.size < filterdPanelCount) {
          newSelected.add(panelId);
        }
      } else {
        newSelected.delete(panelId);
      }
      return newSelected;
    });
  };

  const handleLoadMore = () => {
    if (panelList.length < filterdPanelCount) {
      setPanelListPageCount((prevPageCount) => prevPageCount + 1);
    }
  };

  // 패널 데이터 초기 로드 및 필터링 로직
  useEffect(() => {
    setIsPanelNull(true);

    const fetchInitialPanelList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/panels/list?page=1&size=20&searchBehabioralType=${searchBehabioralType}&searchUtilizationTime=${searchUtilizationTime}&searchGender=${searchGender.join(',')}&searchAge=${searchAge.join(',')}&searchTag1=${searchTag1.join(',')}&searchTag2=${searchTag2.join(',')}&searchTag3=${searchTag3.join(',')}&searchTag4=${searchTag4.join(',')}&searchMarriage=${searchMarriage}&searchChildM=${searchChildM}&searchChildF=${searchChildF}`
        );
        setPanelList(response.data.results);
        setTotalPanelCount(response.data.count);
        setFilterdPanelCount(response.data.count);

        if (response.data.results.length < 20) {
          setIsAllPanelsLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching panel list:", error);
      } finally {
        setIsPanelNull(false);
      }
    };

    fetchInitialPanelList();
  }, [searchBehabioralType, searchUtilizationTime, searchGender, searchAge, searchTag1, searchTag2, searchTag3, searchTag4, searchMarriage, searchChildM, searchChildF]);

  // 추가 패널 리스트 로드 로직
  useEffect(() => {
    if (panelListPageCount > 1 && panelList.length < filterdPanelCount) {
      setIsPanelNull(true);

      const combinedTags = [...searchTag1, ...searchTag2, ...searchTag3, ...searchTag4];
      
      const fetchAdditionalPanelList = async () => {
        try {
          const apiUrl = `${process.env.REACT_APP_SERVER_URL}/panels/list?page=${panelListPageCount}&size=20&searchBehabioralType=${searchBehabioralType}&searchUtilizationTime=${searchUtilizationTime}&searchGender=${searchGender.join(',')}&searchAge=${searchAge.join(',')}&searchTag=${combinedTags.join(',')}&searchMarriage=${searchMarriage}&searchChildM=${searchChildM}&searchChildF=${searchChildF}`;
          
          const response = await axios.get(apiUrl);
          setPanelList(prevPanelList => [...prevPanelList, ...response.data.results]);
          setFilterdPanelCount(response.data.count);

          if (response.data.results.length < 20 || panelList.length + response.data.results.length >= filterdPanelCount) {
            setIsAllPanelsLoaded(true);
          }
        } catch (error) {
          console.error("Error fetching additional panel list:", error);
        } finally {
          setIsPanelNull(false);
        }
      };

      fetchAdditionalPanelList();
    }
  }, [panelListPageCount]);

  if (!Array.isArray(panelList) || panelList.length === 0) {
    return isPanelNull ? <NoData>패널 데이터를 불러오고 있습니다.</NoData> : <NoData>패널 데이터가 없습니다.</NoData>;
  }

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <div className="loader"></div>
        </LoadingOverlay>
      )}
      <PanelWrap>
        <PanelList>
          {panelList.map((panel, index) => (
            <MoleculePanelItem2
              key={panel.id}
              id={panel.id}
              gender={panel.gender}
              age={panel.age}
              job={panel.job}
              address={panel.address}
              subAddress={panel.subAddress}
              imgSrc={(index % 10) + 1}
              tags={panel.tag}
              comment={panel.comment}
              lifeStyle={panel.lifeStyle}
              consumption={panel.consumptionPropensity}
              productGroup={panel.productGroup}
              target_1={panel.target_1}
              target_2={panel.target_2}
              target_3={panel.target_3}
              target_4={panel.target_4}
              target_5={panel.target_5}
              value_1={panel.value_1}
              value_2={panel.value_2}
              value_3={panel.value_3}
              value_4={panel.value_4}
              value_5={panel.value_5}
              onSelect={handleSelect}
            />
          ))}
        </PanelList>
        {isAllPanelsLoaded ? (
          <><br/><br/><br/><br/><br/><br/><br/></>
        ) : (
          <LoadMoreButton isBottomBarVisible={selectedCount > 0} onClick={handleLoadMore}>
            패널 더보기
          </LoadMoreButton>
        )}
      </PanelWrap>
      {selectedCount > 0 && (
        <OrganismPanelCardSectionBottomBar onSaveSelection={() => alert("선택패널이 저장되었습니다.")} />
      )}
    </>
  );
};

export default OrganismPanelListSection;

const NoData = styled.p`
  min-height: 700px;
`;

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
`;

const PanelList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const LoadMoreButton = styled.button`
  position: relative;
  font-size: 0.88rem;
  color: ${palette.gray};
  display: block;
  margin: ${({ isBottomBarVisible }) => (isBottomBarVisible ? '50px auto 120px' : '50px auto 120px')};
  padding: 12px 20px;
  border: 1px solid ${palette.gray};
  border-radius: 40px;
  cursor: pointer;
  background-color: ${palette.white};
  z-index: 10;
  transition: all 0.5s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .loader {
    border: 12px solid #f3f3f3;
    border-top: 12px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
