// src/components/atoms/AtomInput.jsx
import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const AtomInput = (props) => {
  return <Input {...props} />;
};

export default AtomInput;
