// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\molecules\MoleculeSystemMessage.jsx

import React from 'react';
import styled from 'styled-components';

const MoleculeSystemMessage = () => {
  return (
    <SystemMessageContainer>
      입력해주신 비즈니스(아이디어) 정보를 바탕으로 분석을 진행하였습니다.
    </SystemMessageContainer>
  );
};

export default MoleculeSystemMessage;

const SystemMessageContainer = styled.div`
  width: 100%;
  padding: 15px 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px; /* 아래 요소와의 간격 */
`;
