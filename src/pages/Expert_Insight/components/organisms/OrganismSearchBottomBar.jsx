// OrganismSearchBottomBar.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import images from '../../../../assets/images/Search.svg'; // Search.svg 이미지 import
import { palette } from '../../../../assets/styles/Palette';
import { InputField } from '../../../../assets/styles/Input';

const OrganismSearchBottomBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <BottomBar>
      <SearchBar>
        <InputField None placeholder="전문가에게 추가적으로 궁금한 내용을 물어보세요" value={inputValue} onChange={handleInputChange} />

        <button type="button" onClick={handleSearch}>검색</button>
      </SearchBar>
      <p>아이템 또는 프로젝트 아이디어와 관련되지 않은 항목을 입력하실 경우, 적합한 응답결과가 도출되지 않을 수 있습니다.</p>
    </BottomBar>
  );
};

export default OrganismSearchBottomBar;

const BottomBar = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width:100%;
  max-width:1135px;
  color: white;
  display: flex;
  flex-direction:column;
  z-index: 1000;

  > p {
    font-size:0.75rem;
    color:${palette.gray};
    margin-top:10px;
  }
`;

const SearchBar = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
  padding:14px 32px;
  border-radius:50px;
  border:1px solid ${palette.lineGray};
  background:#F5F9FF;

  input {
    font-family: 'Pretendard';
    color:${palette.white};
  }

  > button {
    width:50px;
    height:30px;
    font-size:0;
    border-radius:50px;
    border:1px solid ${palette.lineGray};
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.85986 1.54501C0.470465 0.584174 1.5341 -0.324464 2.48361 0.157903L16.3829 7.21895C17.2058 7.63701 17.2058 8.76826 16.3829 9.18633L2.48362 16.2474C1.53411 16.7297 0.47046 15.8211 0.85986 14.8603L3.55798 8.20264L0.85986 1.54501ZM4.78078 8.87046L2.38289 14.7873L15.3444 8.20264L2.38289 1.61801L4.78078 7.53482H10.5964C10.9652 7.53482 11.2642 7.83381 11.2642 8.20264C11.2642 8.57147 10.9652 8.87046 10.5964 8.87046H4.78078Z' fill='black'/%3E%3C/svg%3E") center no-repeat;
    background-size:auto;
  }
`;
