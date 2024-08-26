// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\molecules\MoleculeBizName.jsx

import React from 'react';
import styled from 'styled-components';

const MoleculeBizName = ({ bizName }) => {
  return (
    <BizNameContainer>
      <BizNameText>
      {bizName || "비즈니스 이름을 입력하세요"}
      </BizNameText>
    </BizNameContainer>
  );
};

export default MoleculeBizName;

const BizNameContainer = styled.div`
  position: fixed;
  top: 110px; /* 헤더 바로 아래에 위치 */
  left: 0;
  width: 100%;
  padding: 20px 0;
  background-color: #f4f4f4;  /* 배경색 설정 */
  text-align: center;
  z-index: 90; /* 헤더보다 뒤에 위치하도록 z-index 설정 */
`;

const BizNameText = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;  /* 텍스트 색상 설정 */
`;
