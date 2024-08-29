import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';

const MoleculeSystemMessage = ({ message }) => {
  return (
    <>
    <SystemMessageContainer>
      <div><p>{message}</p></div>
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
      else return `0`;
    }};
    background:${props => {
      if (props.Myself) return `rgba(4,83,244,.05)`;
      else return `rgba(0,0,0,.05)`;
    }};
  }

  p {
    line-height:1.8;
    text-align:left;
  }

  span {
    font-size:0.75rem;
    color:${palette.lightGray};
    flex-shrink:0;
  }
`;
