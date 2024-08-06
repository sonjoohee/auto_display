// AtomCheckbox.jsx
import React from "react";
import styled from "styled-components";
import { CheckBox } from "../../../../assets/styles/Input";

const AtomCheckbox = ({ id, label }) => (
  <CheckBox>
    <input type="checkbox" id={id} className=""/>
    <label for={id}>{label}</label>
  </CheckBox>
);

export default AtomCheckbox;