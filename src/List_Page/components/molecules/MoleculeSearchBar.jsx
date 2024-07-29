// src/components/molecules/MoleculeSearchBar.jsx
import React from 'react';
import styled from 'styled-components';
import AtomInput from '../atoms/AtomInput';
import AtomButton from '../atoms/AtomButton';

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const MoleculeSearchBar = () => {
  return (
    <SearchBarContainer>
      <AtomInput placeholder="활동 태그" />
      <AtomInput placeholder="활동 시간" />
      <AtomInput placeholder="상세 옵션" />
      <AtomButton>검색</AtomButton>
    </SearchBarContainer>
  );
};

export default MoleculeSearchBar;
