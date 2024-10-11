// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismSearchBottomBar.jsx

import React, { useState } from "react";
import styled, { css } from "styled-components";
import images from "../../../../assets/styles/Images"; // Search.svg 이미지 import
import { palette } from "../../../../assets/styles/Palette";
import { InputField } from "../../../../assets/styles/Input";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CUSTOMER_ADDITION_BUTTON_STATE,
  CUSTOMER_ADDITION_QUESTION_INPUT,
} from "../../../AtomStates";

const OrganismSearchBottomBar = ({ onSearch, isBlue }) => {
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [customerAdditionButtonState, setCustomerAdditionButtonState] = useAtom(
    CUSTOMER_ADDITION_BUTTON_STATE
  );
  const [customerAdditionQuestionInput, setCustomerAdditionQuestionInput] = useAtom(
    CUSTOMER_ADDITION_QUESTION_INPUT
  );

  const [inputValue, setInputValue] = useState("");
  const [isPopupRegex, setIsPopupRegex] = useState(false);
  const [isPopupRegex2, setIsPopupRegex2] = useState(false);

  const closePopupRegex = () => {
    setIsPopupRegex(false);
  };
  const closePopupRegex2 = () => {
    setIsPopupRegex2(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (isLoading) return;

    const regex = /^[가-힣a-zA-Z0-9\s.,'"?!()\-]*$/;
    const specialChars = /^[.,'"?!()\-]+$/;

    // 단독으로 특수 문자만 사용된 경우
    if (specialChars.test(inputValue.trim())) {
      setIsPopupRegex(true);
      return;
    }

    // 입력 값에 대한 정규식 및 빈 값 체크
    if (!regex.test(inputValue)) {
      setIsPopupRegex(true);
      return;
    }
    if (inputValue.trim() === "") {
      setIsPopupRegex2(true);
      return;
    }

    if (isBlue) {
      setCustomerAdditionButtonState(1);
    }
    if (onSearch) {
      onSearch(inputValue);
      setCustomerAdditionQuestionInput(inputValue);
    }

    setInputValue("");
  };

  return (
    <>
      <BottomBar>
        <SearchBar isBlue={isBlue}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 24.9987C0 25.1828 0.149218 25.332 0.333286 25.332C0.3388 25.332 0.344283 25.3319 0.349731 25.3316H24.3298C24.5139 25.3316 24.6631 25.1824 24.6631 24.9983C24.6631 24.8143 24.5139 24.6651 24.3298 24.6651H0.666571L0.66657 1.00223C0.66657 0.818163 0.517353 0.668945 0.333285 0.668945C0.149217 0.668945 0 0.818163 0 1.00223V24.9983V24.9987ZM3.93314 17.1281C3.93314 16.5758 4.38086 16.1281 4.93314 16.1281H5.74395C6.29624 16.1281 6.74395 16.5758 6.74395 17.1281V21.3984H3.93314V17.1281ZM9.50121 3.1281C8.94893 3.1281 8.50121 3.57582 8.50121 4.1281V21.3984H11.312V4.1281C11.312 3.57582 10.8643 3.1281 10.312 3.1281H9.50121ZM13.0685 13.2635C13.0685 12.7112 13.5163 12.2635 14.0685 12.2635H14.8794C15.4316 12.2635 15.8793 12.7112 15.8793 13.2635V21.3986H13.0685V13.2635ZM18.6359 6.29073C18.0836 6.29073 17.6359 6.73845 17.6359 7.29073V21.3988H20.4467V7.29073C20.4467 6.73844 19.999 6.29073 19.4467 6.29073H18.6359Z"
              fill="black"
            />
          </svg>

          <InputField
            None
            isBlue
            placeholder={
              isBlue
                ? "더 알고 싶은 내용이 있으신가요? 추가 질문으로 더 많은 인사이트를 얻어보세요 "
                : "당신의 아이템 또는 프로젝트 아이디어를 적어 주세요 (예: 원격 근무자를 위한 생산성 관리 툴)"
            }
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress} // 여기에 키 입력 이벤트 핸들러 추가
          />

          <button
            type="button"
            onClick={() => handleSearch()}
          >
            검색
          </button>
        </SearchBar>

        <p>
          아이템이나 프로젝트와 관련 없는 질문은 정확한 답변이 어려울 수
          있습니다.
        </p>
      </BottomBar>

      {isPopupRegex && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupRegex(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupRegex}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>
              한글, 영문 외 특수문자는 입력할 수 없어요. 자음이나 모음만 입력한
              경우 검색이 제한되니, 문장을 완전하게 입력해주세요.
            </p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupRegex}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}

      {isPopupRegex2 && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupRegex2(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupRegex2}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            {isBlue ? (
              <p>내용을 입력해주세요</p>
            ) : (
              <p>비즈니스 분석을 위해 내용을 입력해주세요</p>
            )}
            <div className="btnWrap">
              <button type="button" onClick={closePopupRegex2}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default OrganismSearchBottomBar;

// 스타일 정의는 그대로 사용

const BottomBar = styled.div`
  position: sticky;
  bottom: 20px;
  left: 0;
  // left: 50%;
  // transform: translateX(-50%);
  width: 100%;
  // max-width:1240px;
  color: white;
  display: flex;
  flex-direction: column;
  flex-basis: 100% !important;
  align-items: center;
  // margin:0 20px;
  // margin-top: 40px;
  z-index: 998;
  flex: auto !important;

  > p {
    font-size: 0.75rem;
    color: ${palette.gray};
    padding-top: 10px;
  }

  &:before {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -20px;
    height: 60px;
    background: ${palette.white};
    // background: linear-gradient(
    //   0deg,
    //   rgba(255, 255, 255, 0) 0%,
    //   rgba(255, 255, 255, 1) 30%
    // );
    content: "";
    z-index: -1;
  }
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 14px 32px;
  border-radius: 50px;
  border: ${(props) => {
    if (props.isBlue) return `1px solid ${palette.lineGray}`;
    else return `2px solid ${palette.black}`;
  }};
  box-shadow: ${(props) => {
    if (props.isBlue) return `none`;
    else return `0 4px 15px rgba(0, 0, 0, 0.15)`;
  }};
  background: ${(props) => {
    if (props.isBlue) return `#F5F9FF`;
    else return `#F6F6F6`;
  }};

  svg {
    display: ${(props) => {
      if (props.isBlue) return `none`;
      else return `inline-block`;
    }};
  }

  svg path {
    fill: ${(props) => {
      if (props.isBlue) return `${palette.blue}`;
      else return `${palette.black}`;
    }};
  }

  input {
    font-family: "Pretendard", "Poppins";
    color: ${palette.black};

    &:placeholder {
      font-size: 1rem;

      color: ${(props) => {
        if (props.isBlue) return `${palette.gray}`;
        else return `${palette.lightGray}`;
      }};
    }
  }

  > button {
    width: 34px;
    height: 31px;
    font-size: 0;
    margin-left: auto;
    border: 0;
    background: ${(props) => {
      if (props.isBlue)
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='31' height='31' viewBox='0 0 31 31' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.88734 14.3697C0.259917 13.7575 0.567134 11.3198 2.35637 10.6482L28.5477 0.817949C30.0984 0.235928 31.4234 1.55184 30.8519 3.1065L21.2006 29.3643C20.5413 31.158 18.1056 31.4819 17.4823 29.8587L13.1637 18.6115L1.88734 14.3697ZM15.5225 17.8009L19.3606 27.7966L28.3608 3.31043L3.93658 12.4774L13.9582 16.2472L21.6131 8.53997C22.0023 8.14812 22.6354 8.14596 23.0273 8.53515L23.1726 8.67946C23.5644 9.06865 23.5666 9.70181 23.1774 10.0937L15.5225 17.8009Z' fill='%230453F4'/%3E%3C/svg%3E")`;
      else
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='31' height='31' viewBox='0 0 31 31' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.88734 14.3697C0.259917 13.7575 0.567134 11.3198 2.35637 10.6482L28.5477 0.817949C30.0984 0.235928 31.4234 1.55184 30.8519 3.1065L21.2006 29.3643C20.5413 31.158 18.1056 31.4819 17.4823 29.8587L13.1637 18.6115L1.88734 14.3697ZM15.5225 17.8009L19.3606 27.7966L28.3608 3.31043L3.93658 12.4774L13.9582 16.2472L21.6131 8.53997C22.0023 8.14812 22.6354 8.14596 23.0273 8.53515L23.1726 8.67946C23.5644 9.06865 23.5666 9.70181 23.1774 10.0937L15.5225 17.8009Z' fill='black'/%3E%3C/svg%3E")`;
    }};
    background-size: auto;
    transition: all 0.5s;

    &:hover {
      background: ${(props) => {
        if (props.isBlue)
          return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='31' viewBox='0 0 30 31' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M29.737 2.32621C30.0624 1.50773 29.2619 0.692681 28.4499 1.01581L0.630328 12.0871C-0.175495 12.4078 -0.219121 13.5441 0.559696 13.9269L10.1873 18.6582L18.5772 12.3685L12.5576 21.0251L16.7796 30.3636C17.1428 31.167 18.281 31.1402 18.6069 30.3205L29.737 2.32621Z' fill='%230453F4'/%3E%3C/svg%3E")`;
        else
          return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='31' viewBox='0 0 30 31' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M29.737 2.32621C30.0624 1.50773 29.2619 0.692681 28.4499 1.01581L0.630328 12.0871C-0.175495 12.4078 -0.219121 13.5441 0.559696 13.9269L10.1873 18.6582L18.5772 12.3685L12.5576 21.0251L16.7796 30.3636C17.1428 31.167 18.281 31.1402 18.6069 30.3205L29.737 2.32621Z' fill='black'/%3E%3C/svg%3E")`;
      }};
    }
  }
`;
const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 11px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.black};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

    p {
      font-family: "Pretendard", "Poppins";
      font-size: 0.875rem;
      font-weight: 500;
      margin: 20px auto 24px;
    }

    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 500;
            display: block;
          }
          span {
            font-size: 0.75rem;
            font-weight: 400;
            color: ${palette.gray500};
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            font-family: "Pretendard", "Poppins";
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.blue};
              background: none;
            }
          }
        }
      `}
  }
`;
