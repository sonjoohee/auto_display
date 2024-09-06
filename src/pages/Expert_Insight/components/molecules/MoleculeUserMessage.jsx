// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\molecules\MoleculeUserMessage.jsx

import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';

const MoleculeUserMessage = ({ message }) => {
  const messageWithLineBreaks = message.split('\n').map((line, index) => 
    <React.Fragment key={index}>
      {line}
      <br /> 
    </React.Fragment>
  );

  return (
    <UserMessageContainer>
      <div>
        <p>{messageWithLineBreaks}</p>
      </div>
      <Time>1 min age</Time>
    </UserMessageContainer>
  );
};

export default MoleculeUserMessage;

const Time = styled.span`
  align-self:flex-end;
  font-size:0.63rem;
  color:${palette.gray};
`;

const UserMessageContainer = styled.div`
  // max-width: 70%;
  display:flex;
  align-items:flex-end;
  flex-direction:row-reverse;
  gap:18px;
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
    font-size:0.875rem;
    padding:14px 20px;
    border-radius:15px;
    background:#EBF3FE;

    p {
      line-height:1.8;
    }
  }

  &:after {
    // content: '';
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