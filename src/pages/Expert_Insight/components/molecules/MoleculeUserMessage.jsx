// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\molecules\MoleculeUserMessage.jsx

import React from 'react';
import styled from 'styled-components';

const MoleculeUserMessage = ({ message }) => {
  return (
    <UserMessageContainer>
      {message || '분석 내용을 확인하였습니다. 추가로 궁금한 사항이 있습니다.'}
    </UserMessageContainer>
  );
};

export default MoleculeUserMessage;

const UserMessageContainer = styled.div`
  max-width: 70%;
  display: inline-block;
  width: auto;
  padding: 15px 20px;
  background-color: #ffe0b2;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: 0;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: #ffe0b2;
    border-right: 0;
    margin-top: -10px;
  }
`;