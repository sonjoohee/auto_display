// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\molecules\MoleculeSystemMessage.jsx

import React from 'react';
import styled from 'styled-components';

import { palette } from '../../../../assets/styles/Palette';

const MoleculeSystemMessage = () => {
  return (
    <>
    <SystemMessageContainer>
      <div><p>입력해주신 비즈니스(아이디어) 정보를 바탕으로 분석을 진행하겠습니다.</p></div>
      <span>1 min ago</span>
    </SystemMessageContainer>

    <SystemMessageContainer Myself>
      <div><p>10년차 전략 디렉터와 1:1 커피챗을 진행하고 싶습니다.</p></div>
      <span>1 min ago</span>
    </SystemMessageContainer>
    </>
  );
};

export default MoleculeSystemMessage;

const SystemMessageContainer = styled.div`
  display:flex;
  align-items:flex-end;
  flex-direction:${props => {
    if (props.Myself) return `row-reverse`;
    else return `row`;
  }};
  gap:18px;
  margin-top: 40px;

  > div {
    font-size:0.88rem;
    padding:14px 20px;
    border-radius:15px;
    border:1px solid ${props => {
      if (props.Myself) return `rgba(4,83,244,.05)`;
      else return `rgba(0,0,0,.05)`;
    }};
    background:${props => {
      if (props.Myself) return `rgba(4,83,244,.05)`;
      else return `rgba(0,0,0,.05)`;
    }};
  }

  p {
    line-height:1.8;
  }

  span {
    font-size:0.75rem;
    color:${palette.lightGray}
  }
`;
