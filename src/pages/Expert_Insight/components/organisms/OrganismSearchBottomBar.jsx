// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismSearchBottomBar.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import images from '../../../../assets/images/Search.svg'; // Search.svg 이미지 import

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
      <InputContainer>
        <InputField 
          type="text" 
          placeholder="질문을 입력해주세요" 
          value={inputValue} 
          onChange={handleInputChange} 
        />
      </InputContainer>
      <SearchButton onClick={handleSearch}>
        <img src={images} alt="검색" />
      </SearchButton>
    </BottomBar>
  );
};

export default OrganismSearchBottomBar;

// 스타일 정의는 그대로 사용


const BottomBar = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width:100%;
  max-width:606px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 40px;
  background: black;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.2);
  z-index: 98;
`;

const InputContainer = styled.div`
  flex: 1;
  margin-right: 12px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 30px;
  border: 1px solid white;
  background-color: lightgray;
  font-size: 0.88rem;
  color: black;
  outline: none;

  &::placeholder {
    color: gray;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: blue;
  border: none;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;
