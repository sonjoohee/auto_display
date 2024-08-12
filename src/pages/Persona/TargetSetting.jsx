import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { palette } from "../../assets_copy/styles/Palette";
import Button from "../../assets_copy/styles/Button";

import {
  AGE_AREA_VALUE,
  GENDER_AREA_VALUE,
  TEXT_AREA_VALUE,
} from "./state/persona_manager";
import { useAtom } from "jotai";
import { Popup, ReportWrap } from "../../assets_copy/styles/Common";

const TargetSetting = () => {
  const [textAreaValue, setTextAreaValue] = useAtom(TEXT_AREA_VALUE);
  const [genderAreaValue, setGenderAreaValue] = useAtom(GENDER_AREA_VALUE);
  const [ageAreaValue, setAgeAreaValue] = useAtom(AGE_AREA_VALUE);
  const navigate = useNavigate();

  const [isPopupOpen_1, setIsPopupOpen_1] = useState(false);
  const [isPopupOpen_2, setIsPopupOpen_2] = useState(false);
  const [isPopupOpen_3, setIsPopupOpen_3] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen_1(false);
    setIsPopupOpen_2(false);
    setIsPopupOpen_3(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 116) {
        // F5 key code
        setIsPopupOpen_3(true);
        event.preventDefault();
      }
    };
    window.history.pushState(null, "", "");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  const moveNone = () => {
    setIsPopupOpen_3(false);
  };

  const moveMain = () => {
    navigate("/");
  };

  const handleGenderChange = (event) => {
    setGenderAreaValue(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAgeAreaValue(event.target.value);
  };

  // 다음버튼 클릭시 페이지 이동

  const LinkURL = () => {
    if (ageAreaValue !== "" && genderAreaValue !== "") {
      navigate("/Loading");
    } else {
      setIsPopupOpen_2(true);
    }
  };
  return (
    <>
      <BreadCrumb>
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>목표 고객 설정</li>
        </ol>
      </BreadCrumb>

      <TargetWrap>
        <h1>
          목표 고객군을 설정하세요
          <p>설정하신 대상에 적합한 AI 페르소나를 도출해드려요 </p>
        </h1>

        <ChoiceWrap>
          <p className="title">성별을 선택하세요</p>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                onChange={handleGenderChange}
              />
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M14.5,13A1.5,1.5,0,1,1,16,11.5,1.5,1.5,0,0,1,14.5,13Zm7.351-4.726A9.975,9.975,0,0,0,12,0C5.1,0,3.124,4.674,1.819,7.767A6.372,6.372,0,0,1,.5,10.136a1,1,0,0,0,.379,1.856,15.806,15.806,0,0,0,7.257-1.1,1.5,1.5,0,1,0,1.724-.84,15.09,15.09,0,0,0,4.956-4.467,1,1,0,1,0-1.626-1.162A13.357,13.357,0,0,1,3,10.027c.227-.453.438-.956.662-1.483C4.892,5.628,6.423,2,12,2a7.978,7.978,0,0,1,7.954,7.15,1,1,0,0,0,.816.878A1.5,1.5,0,0,1,20.5,13a1.606,1.606,0,0,1-.252-.027.994.994,0,0,0-1.117.651C18.215,16.221,15.132,19,12,19h0c-2.9,0-5.6-2.283-6.766-4.539a1,1,0,1,0-1.776.92A11.264,11.264,0,0,0,8,19.953V23a1,1,0,0,0,2,0V20.738a7.708,7.708,0,0,0,4,0V23a1,1,0,0,0,2,0V19.954a11.037,11.037,0,0,0,4.732-4.962,3.5,3.5,0,0,0,1.119-6.718Z" />
                </svg>
                <span>남자</span>
              </p>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                onChange={handleGenderChange}
              />
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M14.5,13A1.5,1.5,0,1,1,16,11.5,1.5,1.5,0,0,1,14.5,13Zm9.425,5.144A5,5,0,0,1,19,24H15a1,1,0,0,1-1-1V20.737A7.959,7.959,0,0,1,12,21a7.84,7.84,0,0,1-2-.27V23a1,1,0,0,1-1,1H5A5,5,0,0,1,.075,18.144l.3-1.74a2.939,2.939,0,0,1,5.337-1.138C6.976,17.124,9.409,19,12,19h0c3.13,0,6.214-2.779,7.13-5.376a1.03,1.03,0,0,1,.959-.667l.432.007A1.461,1.461,0,0,0,22,11.5a1.5,1.5,0,0,0-1.23-1.474,1,1,0,0,1-.816-.879A7.977,7.977,0,0,0,12,2C6.423,2,4.892,5.628,3.662,8.544c-.224.527-.435,1.03-.662,1.483A13.354,13.354,0,0,0,13.186,4.419a1,1,0,0,1,1.628,1.162,15.089,15.089,0,0,1-4.956,4.467,1.5,1.5,0,1,1-1.725.84,15.807,15.807,0,0,1-7.257,1.1A1,1,0,0,1,.5,10.136,6.372,6.372,0,0,0,1.819,7.767C3.124,4.674,5.1,0,12,0a9.972,9.972,0,0,1,9.85,8.274A3.5,3.5,0,0,1,24,11.5a3.428,3.428,0,0,1-.854,2.257c.007.026.025.047.03.075ZM8,19.94a11.088,11.088,0,0,1-3.941-3.552.946.946,0,0,0-.783-.424H3.259a.945.945,0,0,0-.911.782l-.3,1.739A3,3,0,0,0,5,22H8Zm13.955-1.455-.628-3.613a3.384,3.384,0,0,1-.579.086A11.033,11.033,0,0,1,16,19.952V22h3a3,3,0,0,0,2.955-3.514Z" />
                </svg>
                <span>여자</span>
              </p>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="N"
                onChange={handleGenderChange}
              />
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,2a9.949,9.949,0,0,1,6.324,2.262L4.262,18.324A9.992,9.992,0,0,1,12,2Zm0,20a9.949,9.949,0,0,1-6.324-2.262L19.738,5.676A9.992,9.992,0,0,1,12,22Z" />
                </svg>
                <span>상관없음</span>
              </p>
            </label>
          </div>
        </ChoiceWrap>

        <ChoiceWrap Checkbox>
          <p className="title">나이를 선택하세요</p>
          <div>
            <label>
              <input
                onChange={handleAgeChange}
                type="radio"
                name="age"
                value="10"
              />
              <p>
                <span>10대</span>
              </p>
            </label>
            <label>
              <input
                onChange={handleAgeChange}
                type="radio"
                name="age"
                value="20"
              />
              <p>
                <span>20대</span>
              </p>
            </label>
            <label>
              <input
                onChange={handleAgeChange}
                type="radio"
                name="age"
                value="30"
              />
              <p>
                <span>30대</span>
              </p>
            </label>
            <label>
              <input
                onChange={handleAgeChange}
                type="radio"
                name="age"
                value="40"
              />
              <p>
                <span>40대</span>
              </p>
            </label>
            <label>
              <input
                onChange={handleAgeChange}
                type="radio"
                name="age"
                value="50"
              />
              <p>
                <span>50대</span>
              </p>
            </label>
            <label>
              <input
                onChange={handleAgeChange}
                type="radio"
                name="age"
                value="60"
              />
              <p>
                <span>60대 이상</span>
              </p>
            </label>
            <label>
              <input
                onChange={handleAgeChange}
                type="radio"
                name="age"
                value="All"
              />
              <p>
                <span>상관없음</span>
              </p>
            </label>
          </div>
        </ChoiceWrap>
        {/* 
        <Link to="/Loading">
          <Button Black Full >
            페르소나 생성하기
          </Button>
        </Link> */}

        <Button onClick={LinkURL} Black Full>
          페르소나 생성하기
        </Button>
      </TargetWrap>

      {isPopupOpen_1 && (
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
              <strong>페르소나 생성 중 오류가 발생했어요</strong>
              <p>
                다시 한번 페르소나 생성을 위한 정보를 입력해 주세요.
                <br />
                불편을 드려 죄송합니다.{" "}
              </p>
              <Button Black onClick={LinkURL}>
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}

      {/* 목표 고객군 미설정 시 */}
      {isPopupOpen_2 && (
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
              <strong>
                목표 고객군에 대한
                <br />
                성별, 나이 정보를 선택해 주세요
              </strong>
              <Button Black onClick={togglePopup}>
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}

      {/* 오류 */}
      {isPopupOpen_3 && (
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
              <strong>페르소나 정보가 초기화됩니다</strong>
              <p>
                본 페이지를 나가시면 생성된 페르소나 정보가 초기화됩니다
                <br />
                정말 나가시겠습니까?
              </p>
              <Button Black onClick={moveNone} style={{ minWidth: "160px" }}>
                페이지 유지
              </Button>
              <Button Black onClick={moveMain} style={{ minWidth: "160px", marginLeft: "15px" }}>
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}
    </>
  );
};

export default TargetSetting;

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

const TargetWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 510px;
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

const ChoiceWrap = styled.div`
  position: relative;
  text-align: left;

  .title {
    font-size: 1.125rem;
    margin-bottom: 20px;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 60px;
  }

  label {
    position: relative;
    width: 120px;
    height: ${(props) => (props.Checkbox ? "50px" : "120px")};
    display: inline-block;
    text-align: center;
    box-sizing: border-box;

    p {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: ${(props) => (props.Checkbox ? "10px 0" : "35px 0")};
      border-radius: 10px;
      border: 1px solid ${palette.gray};
      cursor: pointer;
      transition: all 0.5s;
      opacity: 0.5;
    }

    input {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 0;
      height: 0;
    }

    span {
      display: block;
      margin-top: 5px;
    }

    input:checked {
      + p {
        border-color: ${palette.blue};
        background: rgba(4, 83, 244, 0.05);
        opacity: 1;

        svg {
          fill: ${palette.blue};
        }

        span {
          color: ${palette.blue};
        }
      }
    }
  }
`;
