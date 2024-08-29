// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\molecules\MoleculeUserMessage.jsx

import React from 'react';
import styled from 'styled-components';

const MoleculeUserMessage = ({ message }) => {
  return (
    <UserMessageContainer>
      <div>
        <p>{message}</p>
      </div>
    </UserMessageContainer>
  );
};

export default MoleculeUserMessage;

const UserMessageContainer = styled.div`
  // max-width: 70%;
  display:flex;
  align-items:flex-end;
  flex-direction:row-reverse;
  // width: auto;
  // padding: 15px 20px;
  // background-color: #ffe0b2;
  // border-radius: 15px;
  // font-size: 1rem;
  // font-weight: 500;
  // color: #333;
  // margin-bottom: 20px;
  // margin-left: auto;
  // margin-right: 0;
  margin-top:40px;
  position: relative;

  > div {
    font-size:0.88rem;
    padding:14px 20px;
    border-radius:15px;
    background:#EBF3FE;

    p {
      line-height:1.8;
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: #EBF3FE;
    border-right: 0;
    margin-top: -10px;
  }
`;