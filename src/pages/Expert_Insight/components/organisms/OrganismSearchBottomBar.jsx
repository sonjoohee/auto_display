// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismSearchBottomBar.jsx

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
        <InputField None placeholder="더 알고 싶은 내용이 있으신가요? 추가 질문으로 더 많은 인사이트를 얻어보세요" value={inputValue} onChange={handleInputChange} />

        <button type="button" onClick={handleSearch}>검색</button>
      </SearchBar>
      <p>아이템이나 프로젝트와 관련 없는 질문은 정확한 답변이 어려울 수 있습니다.</p>
    </BottomBar>
  );
};

export default OrganismSearchBottomBar;

// 스타일 정의는 그대로 사용


const BottomBar = styled.div`
  position: sticky;
  bottom: 20px;
  left:0;
  // left: 50%;
  // transform: translateX(-50%);
  width:100%;
  // max-width:1240px;
  color: white;
  display: flex;
  flex-direction:column;
  flex-basis: 100% !important;
  // margin:0 20px;
  margin-top:40px;
  z-index: 1000;
  flex:auto !important;

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
    color:${palette.black};
  }

  > button {
    width:31px;
    height:31px;
    font-size:0;
    border:0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='31' height='32' viewBox='0 0 31 32' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.81312 14.6353C0.185698 14.0232 0.492915 11.5854 2.28215 10.9138L28.4735 1.08357C30.0242 0.501552 31.3491 1.81746 30.7777 3.37213L21.1264 29.6299C20.467 31.4237 18.0314 31.7476 17.4081 30.1243L13.0895 18.8771L1.81312 14.6353ZM15.4483 18.0665L19.2864 28.0622L28.2866 3.57606L3.86237 12.7431L13.884 16.5129L21.5388 8.8056C21.928 8.41374 22.5612 8.41158 22.9531 8.80077L23.0984 8.94508C23.4902 9.33427 23.4924 9.96743 23.1032 10.3593L15.4483 18.0665Z' fill='%230453F4'/%3E%3C/svg%3E");
    background-size:auto;
    transition:all .5s;

    &:hover {
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 29 29' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M28.0732 1.96976C28.3987 1.15128 27.5981 0.336236 26.7862 0.659366L1.13033 10.8696C0.324506 11.1903 0.280878 12.3266 1.05969 12.7093L9.90059 17.0541L17.7243 11.1888L12.1109 19.2613L15.983 27.826C16.3462 28.6294 17.4845 28.6026 17.8104 27.7829L28.0732 1.96976Z' fill='%230453F4'/%3E%3C/svg%3E");
    }
  }
`;
