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
        <svg width="20" height="20" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 24.9987C0 25.1828 0.149218 25.332 0.333286 25.332C0.3388 25.332 0.344283 25.3319 0.349731 25.3316H24.3298C24.5139 25.3316 24.6631 25.1824 24.6631 24.9983C24.6631 24.8143 24.5139 24.6651 24.3298 24.6651H0.666571L0.66657 1.00223C0.66657 0.818163 0.517353 0.668945 0.333285 0.668945C0.149217 0.668945 0 0.818163 0 1.00223V24.9983V24.9987ZM3.93314 17.1281C3.93314 16.5758 4.38086 16.1281 4.93314 16.1281H5.74395C6.29624 16.1281 6.74395 16.5758 6.74395 17.1281V21.3984H3.93314V17.1281ZM9.50121 3.1281C8.94893 3.1281 8.50121 3.57582 8.50121 4.1281V21.3984H11.312V4.1281C11.312 3.57582 10.8643 3.1281 10.312 3.1281H9.50121ZM13.0685 13.2635C13.0685 12.7112 13.5163 12.2635 14.0685 12.2635H14.8794C15.4316 12.2635 15.8793 12.7112 15.8793 13.2635V21.3986H13.0685V13.2635ZM18.6359 6.29073C18.0836 6.29073 17.6359 6.73845 17.6359 7.29073V21.3988H20.4467V7.29073C20.4467 6.73844 19.999 6.29073 19.4467 6.29073H18.6359Z" fill="black"/>
        </svg>

        <InputField None placeholder="당신의 아이템 또는 프로젝트 아이디어를 적어 주세요 (예: 원격 근무자를 위한 생산성 관리 툴)" value={inputValue} onChange={handleInputChange} />

        <button type="button" onClick={handleSearch}>검색</button>
      </SearchBar>
{/* 
      <SearchBar Blue>
        <svg width="20" height="20" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 24.9987C0 25.1828 0.149218 25.332 0.333286 25.332C0.3388 25.332 0.344283 25.3319 0.349731 25.3316H24.3298C24.5139 25.3316 24.6631 25.1824 24.6631 24.9983C24.6631 24.8143 24.5139 24.6651 24.3298 24.6651H0.666571L0.66657 1.00223C0.66657 0.818163 0.517353 0.668945 0.333285 0.668945C0.149217 0.668945 0 0.818163 0 1.00223V24.9983V24.9987ZM3.93314 17.1281C3.93314 16.5758 4.38086 16.1281 4.93314 16.1281H5.74395C6.29624 16.1281 6.74395 16.5758 6.74395 17.1281V21.3984H3.93314V17.1281ZM9.50121 3.1281C8.94893 3.1281 8.50121 3.57582 8.50121 4.1281V21.3984H11.312V4.1281C11.312 3.57582 10.8643 3.1281 10.312 3.1281H9.50121ZM13.0685 13.2635C13.0685 12.7112 13.5163 12.2635 14.0685 12.2635H14.8794C15.4316 12.2635 15.8793 12.7112 15.8793 13.2635V21.3986H13.0685V13.2635ZM18.6359 6.29073C18.0836 6.29073 17.6359 6.73845 17.6359 7.29073V21.3988H20.4467V7.29073C20.4467 6.73844 19.999 6.29073 19.4467 6.29073H18.6359Z" fill="black"/>
        </svg>

        <InputField None placeholder="당신의 아이템 또는 프로젝트 아이디어를 적어 주세요 (예: 원격 근무자를 위한 생산성 관리 툴)" value={inputValue} onChange={handleInputChange} />

        <button type="button" onClick={handleSearch}>검색</button>
      </SearchBar>
 */}
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
  justify-content:flex-start;
  align-items:center;
  gap:10px;
  padding:14px 32px;
  border-radius:50px;
  border:1px solid ${palette.lineGray};
  background:#F5F9FF;

  input {
    font-family: 'Pretendard', 'Poppins';
    color:${palette.black};

    &:placeholder {
      font-size:1rem;
    }
  }

  > button {
    width:31px;
    height:31px;
    font-size:0;
    margin-left:auto;
    border:0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='31' height='32' viewBox='0 0 31 32' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.81312 14.6353C0.185698 14.0232 0.492915 11.5854 2.28215 10.9138L28.4735 1.08357C30.0242 0.501552 31.3491 1.81746 30.7777 3.37213L21.1264 29.6299C20.467 31.4237 18.0314 31.7476 17.4081 30.1243L13.0895 18.8771L1.81312 14.6353ZM15.4483 18.0665L19.2864 28.0622L28.2866 3.57606L3.86237 12.7431L13.884 16.5129L21.5388 8.8056C21.928 8.41374 22.5612 8.41158 22.9531 8.80077L23.0984 8.94508C23.4902 9.33427 23.4924 9.96743 23.1032 10.3593L15.4483 18.0665Z' fill='%230453F4'/%3E%3C/svg%3E");
    background-size:auto;
    transition:all .5s;

    &:hover {
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 29 29' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M28.0732 1.96976C28.3987 1.15128 27.5981 0.336236 26.7862 0.659366L1.13033 10.8696C0.324506 11.1903 0.280878 12.3266 1.05969 12.7093L9.90059 17.0541L17.7243 11.1888L12.1109 19.2613L15.983 27.826C16.3462 28.6294 17.4845 28.6026 17.8104 27.7829L28.0732 1.96976Z' fill='%230453F4'/%3E%3C/svg%3E");
    }
  }
`;
