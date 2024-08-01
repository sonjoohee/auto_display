// src/components/molecules/MoleculeSearchForm.jsx
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
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
} from "../../../AtomStates";

import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { InputField, CheckBox } from "../../assets/styles/Input";
import Button from "../../assets/styles/Button";

import images from "../../assets/styles/Images";

const MoleculeSearchForm = () => {

  const [totalPanelCount, setTotalPanelCount] = useAtom(TOTAL_PANEL_COUNT);
  const [panelList, setPanelList] = useAtom(PANEL_LIST);
  const [selectedPanelCount, setSelectedPanelCount] = useAtom(SELECTED_PANEL_COUNT);
  const [panelListPageCount, setPanelListPageCount] = useAtom(PANEL_LIST_PAGE_COUNT);

  // 검색 관련 atoms
  const [searchBehabioralType, setSearchBehabioralType] = useAtom(SEARCH_BEHABIORAL_TYPE);
  const [searchUtilizationTime, setSearchUtilizationTime] = useAtom(SEARCH_UTILIZATION_TIME);
  const [searchGender, setSearchGender] = useAtom(SEARCH_GENDER);
  const [searchAge, setSearchAge] = useAtom(SEARCH_AGE);
  const [searchMarriage, setSearchMarriage] = useAtom(SEARCH_MARRIAGE);
  const [searchChild, setSearchChild] = useAtom(SEARCH_CHILD);
  const [searchConsumption, setSearchConsumption] = useAtom(SEARCH_CONSUMPTION);
  const [searchTechnology, setSearchTechnology] = useAtom(SEARCH_TECHNOLOGY);

  const [showDetailOption, setShowDetailOption] = useState(false);
  const [showTimeOption, setShowTimeOption] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    behabioralType: "",
    utilizationTime: "",
    gender: "",
    age: "",
    marriage: "",
    child: "",
    consumption: "",
    technology: "",
  });
  
  const [shouldSearch, setShouldSearch] = useState(false);

  // 검색어값이 초기화 안되는 이슈 -> 검색어값이 바뀔 때 마다 handleSearch() 함수 호출
  useEffect(() => {
    if (shouldSearch) {
      handleSearch();
      setShouldSearch(false);
    }
  }, [shouldSearch, searchBehabioralType, searchUtilizationTime, searchGender, searchAge])

  const handleDetailOptionToggle = () => {
    if (showTimeOption) setShowTimeOption((prev) => !prev);
    setShowDetailOption((prev) => !prev);
  };
  const handleTimeOptionToggle = () => {
    if (showDetailOption) setShowDetailOption((prev) => !prev);
    setShowTimeOption((prev) => !prev);
  };

  const handleSearch = async () => {
    const searchParams = {
      searchBehabioralType,
      searchUtilizationTime,
      searchGender,
      searchAge,
      //searchMarriage,
      //searchChild,
      //searchConsumption,
      //searchTechnology,
    };

    console.log(searchParams); // 검색값 테스트용

    try {
      console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/panels/list?page=1&size=20`, searchParams);
      setPanelList(response.data.results);
      console.log(searchParams);
    } catch (error) {
      console.error("Error fetching panel list:", error);
    }
  };

  const handleApplyDetail = () => {
    setSelectedFilters({
      behabioralType: searchBehabioralType,
      utilizationTime: searchUtilizationTime,
      gender: searchGender,
      age: searchAge,
      marriage: searchMarriage,
      child: searchChild,
      consumption: searchConsumption,
      technology: searchTechnology,
    });
    setShowDetailOption(false);
    setShowTimeOption(false);
  };

  const handleRemoveFilter = (filterKey) => {
    // 칩 삭제하면 페이징 초기화
    setPanelListPageCount(1)

    // 칩 삭제하면 검색값상태 초기화
    if(filterKey === "behabioralType") {
      setSearchBehabioralType('');
      setSearchUtilizationTime('');
    }
    else if(filterKey === "gender") {
      setSearchGender('');
    }
    else if(filterKey === "age") {
      setSearchAge('');
    }

    setSelectedFilters(prevFilters => {
      const newFilters = { ...prevFilters, [filterKey]: "" };
      if (filterKey === "behabioralType") {
        newFilters.behabioralType = "";
        newFilters.utilizationTime = "";
      }
      else if (filterKey === "gender") {
        newFilters.gender = "";
      }
      else if (filterKey === "age") {
        newFilters.age = "";
      }
      return newFilters;
    });
    setShouldSearch(true);
  };

  return (
    <>
      <SearchFormWrap>
      <div className="searchForm">
        <div>
          <span>행동 타입</span>
          <InputField None type="text" name="type" placeholder="입력하세요" value={searchBehabioralType} onChange={(e) => setSearchBehabioralType(e.target.value)}/>
        </div>
        <div onClick={handleTimeOptionToggle}>
          <span>활용 시간</span>
          <InputField None type="text" name="type" placeholder="선택하세요" />
        </div>
        <div onClick={handleDetailOptionToggle}>
          <span>상세 옵션</span>
          <InputField None type="text" name="type" placeholder="선택하세요" />
        </div>
        <Button Black onClick={handleSearch}>
          <img src={images.Search} alt="" />검색
        </Button>
      </div>
      {showDetailOption && (
        <DetailOptions>
          <div>
            <h4>성별</h4>
            <div>
              <button className={searchGender === 'M' ? 'active' : ''} onClick={() => setSearchGender('M')}>남성</button>
              <button className={searchGender === 'F' ? 'active' : ''} onClick={() => setSearchGender('F')}>여성</button>
              <button className={searchGender === '상관없음' ? 'active' : ''} onClick={() => setSearchGender('상관없음')}>상관없음</button>
            </div>
            <div>
              <h4>나이</h4>
              <button className={searchAge.includes('20') ? 'active' : ''} onClick={() => setSearchAge('20')}>20대</button>
              <button className={searchAge.includes('30') ? 'active' : ''} onClick={() => setSearchAge('30')}>30대</button>
              <button className={searchAge.includes('40') ? 'active' : ''} onClick={() => setSearchAge('40')}>40대</button>
              <button className={searchAge.includes('50') ? 'active' : ''} onClick={() => setSearchAge('50')}>50대</button>
              <button className={searchAge.includes('60') ? 'active' : ''} onClick={() => setSearchAge('60')}>60대</button>
              <button className={searchAge.includes('상관없음') ? 'active' : ''} onClick={() => setSearchAge('상관없음')}>상관없음</button>
            </div>
          </div>
          <Button Black onClick={handleApplyDetail}>선택 적용</Button>
        </DetailOptions>
      )}
      {showTimeOption && (
        <DetailOptions>
          <div>
            <button className={searchUtilizationTime === '적게' ? 'active' : ''} onClick={() => setSearchUtilizationTime('적게')}>적게</button>
            <button className={searchUtilizationTime === '보통' ? 'active' : ''} onClick={() => setSearchUtilizationTime('보통')}>보통</button>
            <button className={searchUtilizationTime === '많이' ? 'active' : ''} onClick={() => setSearchUtilizationTime('많이')}>많이</button>
          </div>
        </DetailOptions>
      )}
      <SelectedFilters>
        {selectedFilters.behabioralType || selectedFilters.utilizationTime || selectedFilters.gender || selectedFilters.age ? (
          <FilterChipArea>
            <FilterChip onClick={() => handleRemoveFilter('behabioralType')}>
              {selectedFilters.behabioralType} <span>X</span>
            </FilterChip> 
            <span>에 시간을</span> 
            <FilterChip>
              {selectedFilters.utilizationTime} <span>X</span>
            </FilterChip> 
            <span>활용하는,</span>
          </FilterChipArea>
        ) : (
          <FilterChipArea>
            <span>예시)</span>
            <FilterChip>건강관리</FilterChip>
            <span>에 시간을</span>
            <FilterChip>많이</FilterChip>
            <span>활용하는,</span>
            <FilterChip>여성</FilterChip>
            <FilterChip>20대</FilterChip>
            <FilterChip>30대</FilterChip>
          </FilterChipArea>
        )}
        {selectedFilters.gender && (
          <FilterChip onClick={() => handleRemoveFilter('gender')}>
            {selectedFilters.gender === 'M' ? '남성' : '여성'}
            <span>X</span>
          </FilterChip>
        )}
        {selectedFilters.age && (
          <FilterChip onClick={() => handleRemoveFilter('age')}>
            {selectedFilters.age}대
            <span>X</span>
          </FilterChip>
        )}
      </SelectedFilters>
    </SearchFormWrap>
    </>
  );
};

export default MoleculeSearchForm;

const SearchFormWrap = styled.div`
  padding:20px 30px;
  border-radius:15px;
  background:${palette.white};

  .searchForm {
    display:flex;
    justify-content:space-between;
    align-items:stretch;

    button {
      display:flex;
      align-items:center;
      gap:10px;
    }
  }
`;

const DetailOptions = styled.div`
  margin-top:20px;
  padding:20px;
  border:1px solid ${palette.gray};
  border-radius:15px;
  background:${palette.white};

  h4 {
    margin-bottom:10px;
    font-size:1.2rem;
  }

  div {
    margin-bottom:20px;

    button {
      background:${palette.white};
      color:${palette.black};
      margin-right:10px;
      padding:10px 20px;
      border:1px solid ${palette.gray};
      border-radius:5px;
      cursor:pointer;

      &.active {
        background:${palette.blue};
        color:${palette.white};
      }
    }
  }
`;

const SelectedFilters = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterChip = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin-left: 5px;
  background: ${palette.lightGray};
  border-radius: 15px;
  cursor: pointer;

  span {
    margin-left: 5px;
    color: ${palette.white};
    border-radius: 50%;
    padding: 0 5px;
  }
`;

const FilterChipArea = styled.div`
  display: flex;
  align-items: center;
  span {
  margin-left: 5px;
  margin-right: 5px;
  }
`;