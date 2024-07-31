// AtomCheckbox.jsx
import React from "react";
import styled from "styled-components";

const AtomCheckbox = ({ id, label }) => (
  <CheckBoxWrapper>
    <input type="checkbox" id={id} />
    <label htmlFor={id}>{label}</label>
  </CheckBoxWrapper>
);

export default AtomCheckbox;

const CheckBoxWrapper = styled.div`
  input[type="checkbox"] {
    opacity: 0;
  }

  input[type="checkbox"] + label {
    position: relative;
    display: inline-block;
    padding-left: 28px;
    cursor: pointer;
  }
`;
