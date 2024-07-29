// src/components/atoms/AtomButton.jsx
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AtomButton = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default AtomButton;
