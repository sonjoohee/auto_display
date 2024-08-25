import React from 'react';
import styled from 'styled-components';

const MoleculeSystemMessage = ({ message }) => {
  return (
    <SystemMessageContainer>
      {message}
    </SystemMessageContainer>
  );
};

export default MoleculeSystemMessage;

const SystemMessageContainer = styled.div`
  max-width: 100%;
  display: inline-block;
  width: auto;
  padding: 15px 20px;
  background-color: #e0f7fa;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: auto;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: #e0f7fa;
    border-left: 0;
    margin-top: -10px;
  }
`;
