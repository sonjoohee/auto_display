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
import { palette } from "../../../../assets/styles/Palette";
import { InputField, CheckBox } from "../../../../assets/styles/Input";
import Button from "../../../../assets/styles/Button";
import images from "../../../../assets/styles/Images";

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
    gender: [],
    age: [],
    marriage: "",
    child: "",
    consumption: "",
    technology: "",
  });
  const [tempBehabioralType, setTempBehabioralType] = useState("");
  const [tempUtilizationTime, setTempUtilizationTime] = useState("");
  const [tempGender, setTempGender] = useState([]);
  const [tempAge, setTempAge] = useState([]);
  
  const [shouldSearch, setShouldSearch] = useState(false); // 필터가 변경되어 검색이 필요한지?
  const [isAfterSearch, setIsAfterSearch] = useState(false); // 검색을 하기전인지 하고난후인지?

  const [isAllPanelsLoaded, setIsAllPanelsLoaded] = useState(false);

  useEffect(() => {
    // 모든 필터가 해제되었다면 검색 여부 초기화
    if (!searchBehabioralType && !searchUtilizationTime && !searchGender.length && !searchAge.length) {
      setIsAfterSearch(false);
    }
    // 검색을 하고 난 후 필터가 변경되었다면 재검색
    if (shouldSearch && isAfterSearch) {
      handleSearch();
      setShouldSearch(false);
    }

    // 검색값이 바뀔 때마다 임시값도 초기화  
    setTempBehabioralType(searchBehabioralType)
    setTempUtilizationTime(searchUtilizationTime)
    setTempGender(searchGender)
    setTempAge(searchAge)

  }, [isAfterSearch, shouldSearch, searchBehabioralType, searchUtilizationTime, searchGender, searchAge])

  // 상세옵션 취소 함수
  const cancleDetailOption = () => {
    if (showTimeOption) setShowTimeOption((prev) => !prev);
    setShowDetailOption((prev) => !prev);

    setTempBehabioralType(searchBehabioralType)
    setTempUtilizationTime(searchUtilizationTime)
    setTempGender(searchGender)
    setTempAge(searchAge)
  };

  // 선택 초기화 함수
  const resetSelectionOption = () => {
    setSelectedFilters({
      behabioralType: "",
      utilizationTime: "",
      gender: [],
      age: [],
      marriage: "",
      child: "",
      consumption: "",
      technology: "",
    });

    setTempBehabioralType("");
    setTempUtilizationTime("");
    setTempGender([]);
    setTempAge([]);

    setSearchBehabioralType("");
    setSearchUtilizationTime("");
    setSearchGender([]);
    setSearchAge([]);

    setShouldSearch(true);
  };

  const handleDetailOptionToggle = () => {
    if (showTimeOption) setShowTimeOption((prev) => !prev);
    setShowDetailOption((prev) => !prev);
  };
  const handleTimeOptionToggle = () => {
    if (showDetailOption) setShowDetailOption((prev) => !prev);
    setShowTimeOption((prev) => !prev);
  };

  const handleSearch = async () => {

    setIsAfterSearch(true)
    
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
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/panels/list?page=1&size=20field_go=식당`, {
        params: {
          searchParams
        }
      });
      setPanelList(response.data.results);

      if (response.data.results.length < 20) setIsAllPanelsLoaded(true); // 20개 미만의 데이터가 오면 동작
      
    } catch (error) {
      console.error("Error fetching panel list:", error);
    }
  };

  const handleApplyDetail = () => {

    const regex = /^[가-힣a-zA-Z0-9\s.,'"-]*$/;
    if (!regex.test(tempBehabioralType)) {
      alert("한글, 영문 외 특수문자는 입력할 수 없어요. 자음이나 모음만 입력한 경우 검색이 제한되니, 문장을 완전하게 입력해주세요.");
      return;
    }
    if (tempBehabioralType.length > 100) {
      alert("행동 타입은 100자 이내로 입력주세요.");
      return;
    }
    if (!tempBehabioralType && tempUtilizationTime) {
      alert('행동 타입을 입력해주세요.');
      return;
    }
    // if (tempBehabioralType && !tempUtilizationTime) {
    //   alert('활용 시간을 입력해주세요.');
    //   return;
    // }

    setSelectedFilters({
      behabioralType: tempBehabioralType,
      utilizationTime: tempUtilizationTime,
      gender: tempGender,
      age: tempAge,
    });

    setSearchBehabioralType(tempBehabioralType);
    setSearchUtilizationTime(tempUtilizationTime);
    setSearchGender(tempGender);
    setSearchAge(tempAge);

    setShowDetailOption(false);
    setShowTimeOption(false);
  };

  const handleRemoveFilter = (filterKey, filterValue = null) => {
    // 칩 삭제하면 페이징 초기화
    setPanelListPageCount(1)

    // 칩 삭제하면 검색값상태 초기화
    if(filterKey === "behabioralType") {
      selectedFilters.behabioralType = '';
      selectedFilters.utilizationTime = '';
      setSearchUtilizationTime('');
      setSearchBehabioralType('');
    }
    else if(filterKey === "gender") {
      if (filterValue !== null) {
        setSearchGender((prevGender) => prevGender.filter((gender) => gender !== filterValue));
        selectedFilters.gender.filter((gender) => gender !== filterValue);
      } else {
        setSearchGender([]);
      }
    }
    else if (filterKey === "age") {
      if (filterValue !== null) {
        setSearchAge((prevAge) => prevAge.filter((age) => age !== filterValue));
        selectedFilters.age.filter((age) => age !== filterValue);
      } else {
        setSearchAge([]);
      }
    }

    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [filterKey]: filterValue !== null ? prevFilters[filterKey].filter((item) => item !== filterValue) : "" };
      return newFilters;
    });

    setShouldSearch(true);
  };

  // 상세 옵션 중복선택 관련 함수
  const toggleMultipleOptions = (key, val) => {
    if(key == "age") {
      setTempAge((prevAge) => {
        const newSet = new Set(prevAge);
        if (newSet.has(val)) {
          newSet.delete(val);
        } else {
          newSet.add(val);
        }
        return Array.from(newSet);
      });
    }
  };

  return (
    <>
      <SearchFormWrap>
      <div className="searchForm">
        <div>
          <span>행동 타입</span>
          <InputField None type="text" name="type" placeholder="입력하세요" value={tempBehabioralType} onChange={(e) => setTempBehabioralType(e.target.value)}/>
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
              <button className={tempGender.includes('M') ? 'active' : ''} onClick={() => setTempGender(['M'])}>남성</button>
              <button className={tempGender.includes('F') ? 'active' : ''} onClick={() => setTempGender(['F'])}>여성</button>
              <button className={['M', 'F'].every(gender => tempGender.includes(gender)) ? 'active' : ''} onClick={() => setTempGender(['M', 'F'])}>상관없음</button>
            </div>
            <div>
              <h4>나이</h4>
              <button className={tempAge.includes(20) ? 'active' : ''} onClick={() => toggleMultipleOptions('age',20)}>20대</button>
              <button className={tempAge.includes(30) ? 'active' : ''} onClick={() => toggleMultipleOptions('age',30)}>30대</button>
              <button className={tempAge.includes(40) ? 'active' : ''} onClick={() => toggleMultipleOptions('age',40)}>40대</button>
              <button className={tempAge.includes(50) ? 'active' : ''} onClick={() => toggleMultipleOptions('age',50)}>50대</button>
              <button className={tempAge.includes(60) ? 'active' : ''} onClick={() => toggleMultipleOptions('age',60)}>60대</button>
              <button className={[20, 30, 40, 50, 60].every(age => searchAge.includes(age)) ? 'active' : ''} onClick={() => setTempAge([20,30,40,50,60])}>상관없음</button>
            </div>
          </div>
          <Button Black onClick={handleApplyDetail}>선택 적용</Button>
          <Button Black onClick={cancleDetailOption}>취소</Button>
        </DetailOptions>
      )}
      {showTimeOption && (
        <DetailOptions>
          <div>
            <button className={tempUtilizationTime === '적게' ? 'active' : ''} onClick={() => setTempUtilizationTime('적게')}>적게</button>
            <button className={tempUtilizationTime === '보통' ? 'active' : ''} onClick={() => setTempUtilizationTime('보통')}>보통</button>
            <button className={tempUtilizationTime === '많이' ? 'active' : ''} onClick={() => setTempUtilizationTime('많이')}>많이</button>
          </div>
        </DetailOptions>
      )}
      <SelectedFilters>
        {selectedFilters.behabioralType && selectedFilters.utilizationTime ? (
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
          selectedFilters.gender.length === 0 &&
          selectedFilters.age.length === 0 && (
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
          )
        )}
        {selectedFilters.gender.length > 0 &&
          selectedFilters.gender.map((gender) => (
            <FilterChip key={gender} onClick={() => handleRemoveFilter("gender", gender)}>
              {gender === 'M' ? '남성' : '여성'}
              <span>X</span>
            </FilterChip>
        ))}
        {selectedFilters.age.length > 0 &&
          selectedFilters.age.map((age) => (
            <FilterChip key={age} onClick={() => handleRemoveFilter("age", age)}>
              {age}대
              <span>X</span>
            </FilterChip>
          ))}
        {(selectedFilters.behabioralType > 0 || selectedFilters.utilizationTime > 0 || selectedFilters.gender.length > 0 || selectedFilters.age.length > 0) &&
          <Button Black onClick={resetSelectionOption}>초기화</Button>
        }
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