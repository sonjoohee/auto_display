import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { palette } from "../../assets_copy/styles/Palette";
import Button from "../../assets_copy/styles/Button";
import { Popup, ReportWrap } from "../../assets_copy/styles/Common";

import AvatarM from "../../assets_copy/images/target_choice_M.png";
import AvatarW from "../../assets_copy/images/target_choice_W.png";
import { AI_PERSONA_LIST, SELECT_PERSONA } from "./state/persona_manager";
import { useAtom } from "jotai";

const TargetChoice = () => {
  const navigate = useNavigate();
  const [aiPersonaList, setAiPersonaList] = useAtom(AI_PERSONA_LIST);

  const [selectPer, setSelectPer] = useAtom(SELECT_PERSONA);

  // aiPersonaList["persona_list"]?.map((persona, index) => {
  //   console.log("CHECK :: ", persona[`페르소나`][0]["이름"]);
  // });
  // 팝업
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [clickState, setClickState] = useState(false);

  const togglePopup = () => {
    // console.log("인사이트 :: ", selectPer['페르소나'][0]['이름']);

    if (clickState == false) {
      console.log("팝업창! 뿌뿌! ");
      setIsPopupOpen(!isPopupOpen);
    }
  };

  const selectPersona = (e) => {
    // console.log(e.target.value);
    setClickState(true);
    console.log(aiPersonaList["persona_list"][e.target.value - 1]);
    setSelectPer(
      aiPersonaList["persona_list"][e.target.value - 1][
        `페르소나_${e.target.value}`
      ]
    );
  };

  return (
    <>
      <BreadCrumb>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link>목표 고객 설정</Link>
          </li>
          <li>페르소나 추천</li>
        </ol>
      </BreadCrumb>

      <TargetChoiceWrap>
        <h1>
          비즈니스에 맞춤형 페르소나를 추천드려요
          <p>
            아이템에 가장 적합한 페르소나를 선택하고, 인사이트 보고서를
            확인하세요
          </p>
        </h1>

        <TargetWrap>
          {aiPersonaList["persona_list"]?.map((persona, index) => {
            return (
              // console.log("CHECK :: 1 ", persona[`페르소나`][0]['이름']);
              <label>
                <input
                  type="radio"
                  name="targetChoice"
                  value={index + 1}
                  onClick={(e) => selectPersona(e)}
                />
                <div>
                  <div className="info">
                    <div>
                      <img
                        src={
                          persona[`페르소나_${index + 1}`][2]["성별"] == "남성"
                            ? AvatarM
                            : AvatarW
                        }
                        style={{ width: "60px" }}
                      />
                      <p>{persona[`페르소나_${index + 1}`][0]["이름"]}</p>
                    </div>
                    <div>
                      <span className="badges genderM">
                        {persona[`페르소나_${index + 1}`][2]["성별"]}
                      </span>
                      <span className="badges age">
                        {persona[`페르소나_${index + 1}`][1]["나이"]}
                      </span>
                    </div>
                  </div>

                  <ul>
                    <li>
                      <strong>결혼</strong>
                      <p>
                        {persona[`페르소나_${index + 1}`][3]["결혼여부"]} (
                        {persona[`페르소나_${index + 1}`][4]["자녀여부"]})
                      </p>
                    </li>
                    <li>
                      <strong>직업</strong>
                      <p>{persona[`페르소나_${index + 1}`][5]["직업"]} </p>
                    </li>
                    <li>
                      <strong>특징</strong>
                      <p>{persona[`페르소나_${index + 1}`][6]["특성"]}</p>
                    </li>
                  </ul>
                </div>
              </label>
            );
          })}
        </TargetWrap>

        {clickState ? (
          <Link to="/LoadingPersona">
            <Button
              Black
              Full
              // onClick={togglePopup}
            >
              인사이트 리포트 생성하기
            </Button>
          </Link>
        ) : (
          <Link to="">
            <Button Black Full onClick={togglePopup}>
              인사이트 리포트 생성하기
            </Button>
          </Link>
        )}
      </TargetChoiceWrap>

      {isPopupOpen && (
        <Popup
          Error
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              togglePopup();
            }
          }}
        >
          <div>
            <ReportWrap Error>
              <strong>페르소나를 선택해주세요</strong>
              <p>
                인사이트 리포트를 생성하기 위한
                <br />
                페르소나를 선택해주세요
              </p>
              <Button Black onClick={togglePopup}>
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}
    </>
  );
};

export default TargetChoice;

const BreadCrumb = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  backdrop-filter: blur(40px) !important;
  background-color: rgba(255, 255, 255, 0.08);
  transition: all 0.5s;
  z-index: 99;

  ol {
    display: flex;
    align-items: center;
  }

  a {
    color: ${palette.gray};
  }

  li + li {
    position: relative;
    padding-left: 30px;
    margin-left: 20px;

    &:before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      width: 10px;
      height: 10px;
      border-right: 1px solid ${palette.black};
      border-top: 1px solid ${palette.black};
      content: "";
    }
  }
`;

const TargetChoiceWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding-top: 20vh;

  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 80px;

    p {
      font-size: 1.125rem;
      font-weight: 400;
      color: ${palette.darkGray};
    }
  }
`;

const TargetWrap = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 0 auto 40px;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${palette.gray};

    > div {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.25rem;
      font-weight: 700;

      + div {
        gap: 3px;
      }
    }

    img {
      border-radius: 50%;
      overflow: hidden;
      background: ${palette.lightGray};
    }

    .badges {
      font-size: 0.875rem;
      font-weight: 400;
      padding: 5px 10px;
      border-radius: 5px;

      &.genderM {
        background: rgba(4, 83, 244, 0.2);
      }
      &.genderW {
        background: rgba(239, 98, 176, 0.2);
      }
      &.age {
        background: rgba(0, 0, 0, 0.08);
      }
    }
  }

  input[type="radio"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 0;
    height: 0;
  }

  label > div {
    max-width: 400px;
    height: 100%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${palette.gray};
    cursor: pointer;
    transition: all 0.5s;

    img {
      width: 80%;
    }

    ul {
      text-align: left;
      margin-top: 20px;

      li {
        position: relative;
        font-size: 1.125rem;
        display: flex;
        gap: 20px;
        color: ${palette.DimGray};

        + li {
          margin-top: 10px;
        }

        strong {
          color: ${palette.black};
          flex-shrink: 0;
        }
      }
    }
  }

  input:checked {
    + div {
      border-color: ${palette.blue};
      background: rgba(4, 83, 244, 0.05);
    }
  }
`;
