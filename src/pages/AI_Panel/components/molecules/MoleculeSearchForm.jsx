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
  SEARCH_CHILD_M, 
  SEARCH_CHILD_F,
  SEARCH_TAG_1,
  SEARCH_TAG_2,
  SEARCH_TAG_3,
  PANEL_LIST_PAGE_COUNT,
  IS_ALL_PANELS_LOADED,
  FILTERD_PANEL_COUNT,
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
  const [searchChildM, setSearchChildM] = useAtom(SEARCH_CHILD_M);
  const [searchChildF, setSearchChildF] = useAtom(SEARCH_CHILD_F);
  const [searchTag1, setSearchTag1] = useAtom(SEARCH_TAG_1);
  const [searchTag2, setSearchTag2] = useAtom(SEARCH_TAG_2);
  const [searchTag3, setSearchTag3] = useAtom(SEARCH_TAG_3);

  const [isAllPanelsLoaded, setIsAllPanelsLoaded] = useAtom(IS_ALL_PANELS_LOADED);
  const [filterdPanelCount, setFilterdPanelCount] = useAtom(FILTERD_PANEL_COUNT);
  
  const [showDetailOption, setShowDetailOption] = useState(false);
  const [showTimeOption, setShowTimeOption] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    behabioralType: "",
    utilizationTime: "",
    gender: [],
    age: [],
    marriage: [],
    childM: "",
    childF: "",
    tag1: [],
    tag2: [],
    tag3: [],
  });
  const [tempBehabioralType, setTempBehabioralType] = useState("");
  const [tempUtilizationTime, setTempUtilizationTime] = useState("");
  const [tempGender, setTempGender] = useState([]);
  const [tempAge, setTempAge] = useState([]);
  const [tempMarriage, setTempMarriage] = useState([]);
  const [tempChildM, setTempChildM] = useState("");
  const [tempChildF, setTempChildF] = useState("");
  const [tempTag1, setTempTag1] = useState([]);
  const [tempTag2, setTempTag2] = useState([]);
  const [tempTag3, setTempTag3] = useState([]);
  
  const [shouldSearch, setShouldSearch] = useState(false); // 필터가 변경되어 검색이 필요한지?
  const [isAfterSearch, setIsAfterSearch] = useState(false); // 검색을 하기전인지 하고난후인지?

  const [isChildExist, setIsChildExist] = useState(false);
  const [isChildNotExist, setIsChildNotExist] = useState(false);

  useEffect(() => {
    // 모든 필터가 해제되었다면 검색 여부 초기화
    if (!searchBehabioralType && !searchUtilizationTime && !searchGender.length && !searchAge.length
      && !searchMarriage.length && !searchChildM && !searchChildF && !searchTag1 && !searchTag2 && !searchTag3
    ) {
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
    setTempMarriage(searchMarriage)
    setTempChildM(searchChildM)
    setTempChildF(searchChildF)
    setTempTag1(searchTag1)
    setTempTag2(searchTag2)
    setTempTag3(searchTag3)

  }, [isAfterSearch, shouldSearch, searchBehabioralType, searchUtilizationTime, searchGender,
     searchAge, searchMarriage, searchChildM, searchChildF, searchTag1, searchTag2, searchTag3])

  // 상세옵션 취소 함수
  const cancleDetailOption = () => {
    if (showTimeOption) setShowTimeOption((prev) => !prev);
    setShowDetailOption((prev) => !prev);

    setTempBehabioralType(searchBehabioralType)
    setTempUtilizationTime(searchUtilizationTime)
    setTempGender(searchGender)
    setTempAge(searchAge)
    setTempMarriage(searchMarriage)
    setTempChildM(searchChildM)
    setTempChildF(searchChildF)
    setTempTag1(searchTag1)
    setTempTag2(searchTag2)
    setTempTag3(searchTag3)
  };

  // 선택 초기화 함수
  const resetSelectionOption = () => {

    setIsAllPanelsLoaded(false);
    
    setSelectedFilters({
      behabioralType: "",
      utilizationTime: "",
      gender: [],
      age: [],
      marriage: [],
      childM: "",
      childF: "",
      tag1: [],
      tag2: [],
      tag3: [],
    });

    setTempBehabioralType("");
    setTempUtilizationTime("");
    setTempGender([]);
    setTempAge([]);
    setTempMarriage([]);
    setTempChildM("");
    setTempChildF("");
    setTempTag1([]);
    setTempTag2([]);
    setTempTag3([]);

    setSearchBehabioralType("");
    setSearchUtilizationTime("");
    setSearchGender([]);
    setSearchAge([]);
    setSearchMarriage([]);
    setSearchChildM("");
    setSearchChildF("");
    setSearchTag1([]);
    setSearchTag2([]);
    setSearchTag3([]);

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
    const combinedTags = [...searchTag1, ...searchTag2, ...searchTag3]; // 소비습관, 기술수용도 하나의 태그에 담아서 보냄

    try {
      console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/panels/list?page=1&size=20&searchBehabioralType=${searchBehabioralType}&searchUtilizationTime=${searchUtilizationTime}&searchGender=${searchGender}&searchAge=${searchAge}&searchTag=${combinedTags}&searchMarriage=${searchMarriage}&searchChildM=${searchChildM}&searchChildF=${searchChildF}`
      );
      console.log(response)
      
      setPanelList(response.data.results);
      setFilterdPanelCount(response.data.count); // 필터링된 패널 개수

      if (response.data.results.length < 20) setIsAllPanelsLoaded(true); // 20개 미만의 데이터가 오면 동작
      else setIsAllPanelsLoaded(false);
      
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
    if (tempBehabioralType && !tempUtilizationTime) {
      alert('활용 시간을 입력해주세요.');
      return;
    }
    // if (!tempBehabioralType && !tempUtilizationTime && !tempGender.length && !tempAge.length) {
    //   alert('상세 검색에 적용할 항목을 선택해주세요.');
    //   return;
    // }

    setSelectedFilters({
      behabioralType: tempBehabioralType,
      utilizationTime: tempUtilizationTime,
      gender: tempGender,
      age: tempAge,
      marriage: tempMarriage,
      childM: tempChildM,
      childF: tempChildF,
      tag1: tempTag1,
      tag2: tempTag2,
      tag3: tempTag3,
    });

    setSearchBehabioralType(tempBehabioralType);
    setSearchUtilizationTime(tempUtilizationTime);
    setSearchGender(tempGender);
    setSearchAge(tempAge);
    setSearchMarriage(tempMarriage);
    setSearchChildM(tempChildM);
    setSearchChildF(tempChildF);
    setSearchTag1(tempTag1);
    setSearchTag2(tempTag2);
    setSearchTag3(tempTag3);

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
    else if (filterKey === "marriage") {
      if (filterValue !== null) {
        setSearchMarriage((prevMarriage) => prevMarriage.filter((marriage) => marriage !== filterValue));
        selectedFilters.marriage.filter((marriage) => marriage !== filterValue);
      } else {
        setSearchMarriage([]);
      }
    }
    else if (filterKey === "childM") {
      selectedFilters.childM = '';
      setSearchChildM('');
      setIsChildExist(false);
      setIsChildNotExist(false);
    }
    else if (filterKey === "childF") {
      selectedFilters.childF = '';
      setSearchChildF('');
      setIsChildExist(false);
      setIsChildNotExist(false);
    }
    else if (filterKey === "tag1") {
      if (filterValue !== null) {
        setSearchTag1((prevtag1) => prevtag1.filter((tag1) => tag1 !== filterValue));
        selectedFilters.tag1.filter((tag1) => tag1 !== filterValue);
      } else {
        setSearchTag1([]);
      }
    }
    else if (filterKey === "tag2") {
      if (filterValue !== null) {
        setSearchTag2((prevtag2) => prevtag2.filter((tag2) => tag2 !== filterValue));
        selectedFilters.tag2.filter((tag2) => tag2 !== filterValue);
      } else {
        setSearchTag2([]);
      }
    }
    else if (filterKey === "tag3") {
      if (filterValue !== null) {
        setSearchTag3((prevtag3) => prevtag3.filter((tag3) => tag3 !== filterValue));
        selectedFilters.tag3.filter((tag3) => tag3 !== filterValue);
      } else {
        setSearchTag3([]);
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

  // 자녀 정보 버튼 클릭 이벤트 핸들러
  const handleChildExistClick = () => {
    setIsChildExist(true);
    setIsChildNotExist(false);
    setTempChildM(100); 
    setTempChildF(100);
  };

  const handleChildNotExistClick = () => {
    setIsChildExist(false);
    setIsChildNotExist(true);
    setTempChildM(0); 
    setTempChildF(0); 
  };

  const handleChildNoMatterClick = () => {
    setIsChildExist(true);
    setIsChildNotExist(true);
    setTempChildM(99); 
    setTempChildF(99);
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
          <Button SelectBtn>선택하세요</Button>
          {/* <InputField None type="text" name="type" placeholder="선택하세요" /> */}
        </div>
        <div onClick={handleDetailOptionToggle}>
          <span>상세 옵션</span>
          <Button SelectBtn>선택하세요</Button>
          {/* <InputField None type="text" name="type" placeholder="선택하세요" /> */}
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
            <br/>
            <div>
              <h4>나이</h4>
              <button className={tempAge.includes(20) ? 'active' : ''} onClick={() => toggleMultipleOptions('age',20)}>20대</button>
              <button className={tempAge.includes(30) ? 'active' : ''} onClick={() => toggleMultipleOptions('age',30)}>30대</button>
              <button className={tempAge.includes(40) ? 'active' : ''} onClick={() => toggleMultipleOptions('age',40)}>40대</button>
              <button className={tempAge.includes(50) ? 'active' : ''} onClick={() => toggleMultipleOptions('age',50)}>50대</button>
              <button className={tempAge.includes(60) ? 'active' : ''} onClick={() => toggleMultipleOptions('age',60)}>60대 이상</button>
              <button className={[20, 30, 40, 50, 60].every(age => tempAge.includes(age)) ? 'active' : ''} onClick={() => setTempAge([20,30,40,50,60])}>상관없음</button>
            </div>
            <br/>
            <h4>결혼 여부</h4>
            <div>
              <button className={tempMarriage.includes('미혼') ? 'active' : ''} onClick={() => setTempMarriage(['미혼'])}>미혼</button>
              <button className={tempMarriage.includes('기혼') ? 'active' : ''} onClick={() => setTempMarriage(['기혼'])}>기혼</button>
              <button className={tempMarriage.includes('사별') ? 'active' : ''} onClick={() => setTempMarriage(['사별'])}>사별</button>
              <button className={['미혼', '기혼', '사별'].every(marriage => tempMarriage.includes(marriage)) ? 'active' : ''} onClick={() => setTempMarriage(['미혼', '기혼', '사별'])}>상관없음</button>
            </div>
            <br/>
            <h4>자녀 정보</h4>
            <div>
              <button className={isChildExist ? 'active' : ''} onClick={handleChildExistClick}>있음</button>
              <button className={isChildNotExist ? 'active' : ''} onClick={handleChildNotExistClick}>없음</button>
              <button className={isChildExist && isChildNotExist ? 'active' : ''} onClick={handleChildNoMatterClick}>상관없음</button>
              {/* <button className={tempChildM === 100 && tempChildF === 100 ? 'active' : ''} onClick={() => {setTempChildM(100); setTempChildF(100);}}>있음</button>
              <button className={tempChildM === 0 && tempChildF === 0 ? 'active' : ''} onClick={() => {setTempChildM(0); setTempChildF(0);}}>없음</button>
              <button className={tempChildM === 99 && tempChildF === 99 ? 'active' : ''} onClick={() => {setTempChildM(99); setTempChildF(99);}}>상관없음</button> */}
              {/* {isChild &&
                <>
                <InputField Black type="text" name="type" placeholder="남아 수" value={tempChildM === 100 ? '' : tempChildM} onChange={(e) => setTempChildM(e.target.value)}/>
                <InputField Black type="text" name="type" placeholder="여아 수" value={tempChildF} onChange={(e) => setTempChildF(e.target.value)}/>
                </>
              } */}
              </div>
            <br/>
            <h4>소비 성향</h4>
            <div>
              <button className={tempTag1.includes("충동구매자" ) ? 'active' : ''} onClick={() => setTempTag1(["충동구매자"])}>충동 구매자</button>
              <button className={tempTag1.includes("계획구매자") ? 'active' : ''} onClick={() => setTempTag1(["계획구매자"])}>계획 구매자</button>
              <button className={["충동구매자","계획구매자"].every(tag1 => tempTag1.includes(tag1)) ? 'active' : ''} 
                      onClick={() => setTempTag1(["충동구매자","계획구매자"])}>상관없음</button>
              <br/>
              <button className={tempTag2.includes("절약형") ? 'active' : ''} onClick={() => setTempTag2(["절약형"])}>절약형</button>
              <button className={tempTag2.includes("고급형") ? 'active' : ''} onClick={() => setTempTag2(["고급형"])}>고급형</button>
              <button className={["절약형","고급형"].every(tag2 => tempTag2.includes(tag2)) ? 'active' : ''} 
                      onClick={() => setTempTag2(["절약형","고급형"])}>상관없음</button>
            </div>
            <br/>
            <h4>기술 수용도</h4>
            <div>
              <button className={tempTag3.includes("혁신가" ) ? 'active' : ''} onClick={() => setTempTag3(["혁신가"])}>혁신가</button>
              <button className={tempTag3.includes("얼리어답터") ? 'active' : ''} onClick={() => setTempTag3(["얼리어답터"])}>얼리어답터</button>
              <br/>
              <button className={tempTag3.includes("보통 사용자") ? 'active' : ''} onClick={() => setTempTag3(["보통 사용자"])}>보통 사용자</button>
              <button className={tempTag3.includes("후기 사용자") ? 'active' : ''} onClick={() => setTempTag3(["후기 사용자"])}>후기 사용자</button>
              <button className={["혁신가","얼리어답터","보통 사용자","후기 사용자"].every(tag3 => tempTag3.includes(tag3)) ? 'active' : ''} 
                      onClick={() => setTempTag3(["혁신가","얼리어답터","보통 사용자", "후기 사용자"])}>상관없음</button>
            </div>
          </div>
          <Button Black onClick={handleApplyDetail}>선택 적용</Button> <Button Black onClick={cancleDetailOption}>취소</Button>
        </DetailOptions>
      )}
      {showTimeOption && (
        <DetailOptions>
          <div>
            <button className={tempUtilizationTime === '적게' ? 'active' : ''} onClick={() => setTempUtilizationTime('적게')}>적게</button>
            <button className={tempUtilizationTime === '보통' ? 'active' : ''} onClick={() => setTempUtilizationTime('보통')}>보통</button>
            <button className={tempUtilizationTime === '많이' ? 'active' : ''} onClick={() => setTempUtilizationTime('많이')}>많이</button>
            <button className={tempUtilizationTime === '모두' ? 'active' : ''} onClick={() => setTempUtilizationTime('모두')}>모두</button>
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
          selectedFilters.age.length === 0 &&
          selectedFilters.marriage.length === 0 &&
          selectedFilters.childM === "" &&
          selectedFilters.childF === "" &&
          selectedFilters.tag1.length === 0 &&
          selectedFilters.tag2.length === 0 &&
          selectedFilters.tag3.length === 0 && (
            <FilterChipArea>
              <span>예시)</span>
              <FilterChip>건강관리</FilterChip>
              <span>에 시간을</span>
              <FilterChip>많이</FilterChip>
              <span>활용하는,</span>
              <FilterChip bgGray>여성</FilterChip>
              <FilterChip bgGray>20대</FilterChip>
              <FilterChip bgGray>30대</FilterChip>
            </FilterChipArea>
          )
        )}
        {selectedFilters.gender.length > 0 &&
          selectedFilters.gender.map((gender) => (
            <FilterChip key={gender} onClick={() => handleRemoveFilter("gender", gender)}>
              {gender === 'M' ? '남성' : '여성'}
              {/* <span>X</span> */}
            </FilterChip>
        ))}
        {selectedFilters.age.length > 0 &&
          selectedFilters.age.map((age) => (
            <FilterChip key={age} onClick={() => handleRemoveFilter("age", age)}>
              {age}대
              {/* <span>X</span> */}
            </FilterChip>
          ))}
        {selectedFilters.marriage.length > 0 &&
          selectedFilters.marriage.map((marriage) => (
            <FilterChip key={marriage} onClick={() => handleRemoveFilter("marriage", marriage)}>
              {marriage}
              {/* <span>X</span> */}
            </FilterChip>
          ))}
        {/* {selectedFilters.childM !== "" &&
          <FilterChip onClick={() => handleRemoveFilter('childM')}>
            {selectedFilters.childM === 0 && <>남아(없음) <span>X</span></>}
            {selectedFilters.childM === 99 && <>남아(상관없음) <span>X</span></>}
            {selectedFilters.childM === 100 && <>남아(있음) <span>X</span></>}
            {selectedFilters.childM !== 0 && selectedFilters.childM !== 99 && <>남아({selectedFilters.childM}명) <span>X</span></>}
          </FilterChip>
        }
        {selectedFilters.childF !== "" &&
          <FilterChip onClick={() => handleRemoveFilter('childF')}>
            {selectedFilters.childF === 0 && <>여아(없음) <span>X</span></>}
            {selectedFilters.childF === 99 && <>여아(상관없음) <span>X</span></>}
            {selectedFilters.childF === 100 && <>여아(있음) <span>X</span></>}
            {selectedFilters.childF !== 0 && selectedFilters.childF !== 99 && <>여아({selectedFilters.childM}명) <span>X</span></>}
          </FilterChip>
        } */}
        {selectedFilters.childM !== "" && selectedFilters.childF !== "" &&
          <FilterChip onClick={() => {handleRemoveFilter('childM'); handleRemoveFilter('childF');}}>
            {selectedFilters.childM === 0 && <>자녀(없음) </>}
            {selectedFilters.childM === 99 && <>자녀(상관없음) </>}
            {selectedFilters.childM === 100 && <>자녀(있음) </>}
          </FilterChip>
        }
        {selectedFilters.tag1.length > 0 &&
          selectedFilters.tag1.map((tag1) => (
            <FilterChip key={tag1} onClick={() => handleRemoveFilter("tag1", tag1)}>
              {tag1}
              {/* <span>X</span> */}
            </FilterChip>
          ))}
        {selectedFilters.tag2.length > 0 &&
          selectedFilters.tag2.map((tag2) => (
            <FilterChip key={tag2} onClick={() => handleRemoveFilter("tag2", tag2)}>
              {tag2}
              {/* <span>X</span> */}
            </FilterChip>
          ))}
        {selectedFilters.tag3.length > 0 &&
          selectedFilters.tag3.map((tag3) => (
            <FilterChip key={tag3} onClick={() => handleRemoveFilter("tag3", tag3)}>
              {tag3}
              {/* <span>X</span> */}
            </FilterChip>
          ))}
      </SelectedFilters>
      {(selectedFilters.behabioralType || selectedFilters.utilizationTime || selectedFilters.gender.length > 0 || selectedFilters.age.length > 0 || selectedFilters.marriage.length > 0
        || selectedFilters.childM || selectedFilters.childF || selectedFilters.tag1.length > 0 || selectedFilters.tag2.length > 0 || selectedFilters.tag3.length > 0) &&
          <Button Black onClick={resetSelectionOption}>초기화</Button>
      }
    </SearchFormWrap>
    </>
  );
};

export default MoleculeSearchForm;

const SearchFormWrap = styled.div`
  position:relative;
  padding:20px 30px;
  border-radius:15px;
  background:${palette.white};

  .searchForm {
    display:flex;
    justify-content:space-between;
    align-items:stretch;
    gap:40px;

    > div {
      position:relative;
      flex:1 1 0;

      + div:before {
        position:absolute;
        left:-20px;
        top:50%;
        transform:translateY(-50%);
        width:1px;
        height:100%;
        background:${palette.lineGray};
        content:'';
      }

      button {
        margin-top:0;

        &:hover {background:none;}
      }
    }

    span {
      font-size:0.75rem;
      color:${palette.lightGray};
    }

    > button {
      display:flex;
      align-items:center;
      gap:10px;
      margin-top:0;
    }
  }
`;

const DetailOptions = styled.div`
  position:absolute;
  left:50%;
  top:95px;
  transform:translateX(-50%);
  width:calc(100% - 60px);
  padding:20px;
  border:1px solid ${palette.gray};
  border-radius:10px;
  background:${palette.white};
  z-index:1;

  h4 {
    margin-bottom:10px;
    font-size:1.2rem;
  }

  > div {
    display:flex;
    gap:10px;

    button {
      background:${palette.white};
      color:${palette.black};
      margin:0;
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
  padding-top:20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border-top:1px solid ${palette.lineGray};
`;

const FilterChip = styled.div`
  position:relative;
  display: flex;
  align-items: center;
  font-size:0.88rem;
  padding: 8px 30px 8px 10px;
  background:${props => {
    if (props.bgGray) return `rgba(0,0,0,0.05)`;
    else return `rgba(4,83,244,0.1)`;
  }};
  border-radius: 10px;
  cursor: pointer;

  &:before, &:after {
    position:absolute;
    right:15px;
    top:50%;
    width:1px;
    height:10px;
    background:${palette.lightGray};
    content:'';
  }

  &:before {
    transform:translateY(-50%) rotate(45deg);
  }

  &:after {
    transform:translateY(-50%) rotate(-45deg);
  }

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
  gap:10px;

  span {
    color:${palette.lightGray};
  }
`;