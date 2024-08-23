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
  max-width: 100%; /* 최대 너비 설정 */
  display: inline-block; /* 텍스트 길이에 따라 말풍선 크기가 조절되도록 함 */
  width: auto; /* 자동 너비 설정 */
  padding: 15px 20px;
  background-color: #e0f7fa; /* 말풍선 스타일을 위한 밝은 배경색 */
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  margin-left: 0; /* 왼쪽에 딱 붙이기 */
  margin-right: auto; /* 오른쪽 여백을 자동으로 설정하여 왼쪽에 붙임 */
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px; /* 왼쪽에 말풍선 꼬리를 추가 */
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: #e0f7fa;
    border-left: 0;
    margin-top: -10px;
  }
    
`;
