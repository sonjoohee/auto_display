import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  iS_CLICK_CHECK_REPORT_RIGHTAWAY,
} from "../../../AtomStates";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeCheckPocOption = () => {
    const [selectedOption, setSelectedOption] = useState("프로토타입 개발 단계");
  
    const options = [
      { label: "아이디어 검증 단계", value: "아이디어 검증 단계" },
      { label: "기술 검증 단계", value: "기술 검증 단계" },
      { label: "프로토타입 개발 단계", value: "프로토타입 개발 단계" },
      { label: "기능 테스트 단계", value: "기능 테스트 단계" },
      { label: "사용자 적합성 검증 단계", value: "사용자 적합성 검증 단계" },
      { label: "완전 제품 준비 단계", value: "완전 제품 준비 단계" },
    ];
  
    return (
      <Wrap>
        <Question>Q. 현재 PoC를 진행 단계는 무엇인가요?</Question>
        <OptionContainer>
          {options.map((option) => (
            <Option
              key={option.value}
              selected={selectedOption === option.value}
              onClick={() => setSelectedOption(option.value)}
            >
              {option.label}
            </Option>
          ))}
        </OptionContainer>
      </Wrap>
    );
  };
  
  export default MoleculeCheckPocOption;
  
  // Styled-components
  const Wrap = styled.div`
    padding: 20px;
  `;
  
  const Question = styled.div`
    font-size: 16px;
    margin-bottom: 10px;
  `;
  
  const OptionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  `;
  
  const Option = styled.div`
    flex: 1 1 calc(33.33% - 10px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    background-color: ${(props) => (props.selected ? "#000" : "#fff")};
    color: ${(props) => (props.selected ? "#fff" : "#000")};
    border-color: ${(props) => (props.selected ? "#000" : "#ccc")};
  
    &:hover {
      border-color: #000;
    }
  `;
