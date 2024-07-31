// src/components/molecules/MoleculeSearchForm.jsx
import React from "react";
import styled from "styled-components";
import { InputField } from "../../assets/styles/Input";  // 기존 CSS import
import Button from "../../assets/styles/Button";
import images from "../../assets/styles/Images";

const MoleculeSearchForm = () => (
  <SearchFormWrapper>
    <div className="searchForm">
      <div>
        <span>행동 타입</span>
        <InputField None type="text" name="type" placeholder="입력하세요" />
      </div>
      <div>
        <span>활용 시간</span>
        <InputField None type="text" name="time" placeholder="입력하세요" />
      </div>
      <div>
        <span>상세 옵션</span>
        <InputField None type="text" name="option" placeholder="입력하세요" />
      </div>
      <Button Black onClick="#">
        <img src={images.Search} alt="검색" />
        검색
      </Button>
    </div>
  </SearchFormWrapper>
);

export default MoleculeSearchForm;

const SearchFormWrapper = styled.div`
  padding: 20px 30px;
  border-radius: 15px;
  background: white;

  .searchForm {
    display: flex;
    justify-content: space-between;
    align-items: stretch;

    div {
      display: flex;
      flex-direction: column;
      span {
        margin-bottom: 5px;
      }
    }

    button {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;
