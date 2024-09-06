import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";
import { palette } from "../../assets_copy/styles/Palette";
import { Popup, ReportWrap, Title } from "../../assets_copy/styles/Common";
import Button from "../../assets_copy/styles/Button";
import { InputField } from "../../assets_copy/styles/Input";

import axios from "axios";
import MyDocument from "../pdf-module/page/PDF-page";
import { pdf } from "@react-pdf/renderer";
import { useAtom } from "jotai";
import {
  AGE_AREA_VALUE,
  AI_ALL_DATA,
  GENDER_AREA_VALUE,
  POPUP_STATE,
  RANDOMSET,
  TEXT_AREA_VALUE,
} from "./state/persona_manager";

const PersonaGenerator = ({ data }) => {
  const navigate = useNavigate();

  // 팝업 관리
  const [showPopup, setShowPopup] = useAtom(POPUP_STATE);

  // 팝업 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showOneContents, setShowOneContents] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const [isNoneData, setIsNoneData] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  // 유저가 등록한 정보 ( 초기화를 위해 불러왔다.)
  const [textAreaValue, setTextAreaValue] = useAtom(TEXT_AREA_VALUE);
  const [genderAreaValue, setGenderAreaValue] = useAtom(GENDER_AREA_VALUE);
  const [ageAreaValue, setAgeAreaValue] = useAtom(AGE_AREA_VALUE);

  // 저장된 페르소나
  const [allData, setAllData] = useAtom(AI_ALL_DATA);
  // 랜덤 숫자 셋팅
  const [randomSet, setRandomSet] = useAtom(RANDOMSET);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [mailSend, setMailSend] = useState(false);

  let imgTarget = "";
  const imgGender = allData.persona.기본정보.성별 == "남성" ? "M" : "F";
  const imgAge = Math.floor(parseInt(allData.persona.기본정보.나이) / 10) * 10;
  let randeomNum = 0;

  if (randomSet == 9999) {
    setRandomSet(Math.random() < 0.5 ? 1 : 2);
  }

  imgTarget = imgAge + imgGender + "_" + randomSet + ".png";

  useEffect(() => {
    if (allData.persona.기본정보.이름 == "") {
      navigate("/");
    }

    console.log("넘어온 props값 : ", data);

    const handleBeforeUnload = (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = "";
    };

    const handlePopState = () => {
      setIsBackwardPopup(true);
    };

    const handleKeyDown = (event) => {
      // if (event.keyCode === 116)
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 key code
        setIsBackwardPopup(true);
        event.preventDefault();
        // navigate("/");
      }
    };

    //새로고침방지
    window.addEventListener("beforeunload", handleBeforeUnload);

    window.history.pushState(null, "", "");
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      //새로고침 방지

      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [allData]);

  const moveNone = () => {
    setIsBackwardPopup(false);
    setIsNoneData(false);
    setShowContents(false);
    setShowOneContents(false);
    setIsPopupOpen(false);
  };

  const moveMain = () => {
    // 팝업상태 초기화
    setIsBackwardPopup(false);
    setIsNoneData(false);
    setShowContents(false);
    setShowOneContents(false);
    setIsPopupOpen(false);

    setTextAreaValue("");
    setGenderAreaValue("");
    setAgeAreaValue("");

    navigate("/");
  };

  const checkEmailSend = () => {
    if (userEmail == "" || userName == "") {
      setIsNoneData(true);
      return false;
    }

    if (userEmail !== "" && userName !== "") {
      setShowContents(true);
    }
  };

  const goMain = () => {
    setIsBackwardPopup(true);
    // window.location.href = "/";
  };

  const sendEmail = async () => {
    console.log("상태값 확인 -------------");

    // 메일 셋팅 해주기.
    const email = userEmail;
    const fileName = textAreaValue;

    // PDF 에필요한 녀석들
    const blob = await pdf(<MyDocument data={allData.persona} />).toBlob();
    const formData = new FormData();
    formData.append("pdf", blob, "example.pdf");
    formData.append("email", userEmail);
    formData.append("name", userName);
    formData.append("fileName", fileName);

    formData.append("persona", JSON.stringify(allData.persona));

    try {
      await axios.post(
        // "http://localhost:7300/api/v1/mail/sendPDF-Email",
        "https://wishpoll.co.kr/api/v1/mail/sendPDF-Email",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 유저가 작성한 데이터 초기화 시켜야합니다.
      setTextAreaValue("");
      setGenderAreaValue("");
      setAgeAreaValue("");

      // 결과는 쿠키로 잠시 저장?
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  const sendUpdate = async () => {
    try {
      await axios.patch(
        // "http://localhost:7300/api/v1/zbiz/update",
        "https://wishpoll.co.kr/api/v1/zbiz/update",
        {
          userName: userName,
          userEmail: userEmail,
          perInfo: allData.persona.기본정보["페르소나 상세정보"],
          perName: allData.persona.기본정보.이름,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  const [isBackwardPopup, setIsBackwardPopup] = useState(false);
  // const togglePopup = () => {
  //   setIsBackwardPopup(false);
  //   setIsNoneData(false);
  //   setShowContents(false);
  //   setShowOneContents(false);
  //   setIsPopupOpen(false);
  // };

  // 좌측메뉴 열고닫기
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <BreadCrumb>
        <ol>
          <li>
            <Link onClick={goMain}>Home</Link>
          </li>
          <li>
            <Link>목표 고객 설정</Link>
          </li>
          <li>Persona Generator</li>
        </ol>
      </BreadCrumb>

      <PersonaWrap>
        <PersonaMenu className={`${isMenuOpen ? "open" : "closed"}`}>
          <div className="MenuBtn" onClick={toggleMenu}>
            <div className="line line-1"></div>
            <div className="line line-2"></div>
            <div className="line line-3"></div>
          </div>

          <h2>AI Generation Tool</h2>
          <ul>
            <li>
              <Link to="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="30"
                  viewBox="0 0 25 29"
                  fill="none"
                >
                  <rect
                    x="1"
                    y="1.14062"
                    width="22.5977"
                    height="27"
                    rx="3"
                    stroke="black"
                  />
                  <path
                    d="M5.53906 21.6211H19.4985"
                    stroke="#0453F4"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5.53906 24.3828H12.5188"
                    stroke="#0453F4"
                    stroke-linecap="round"
                  />
                  <circle
                    cx="12.4659"
                    cy="9.32529"
                    r="4.23154"
                    stroke="black"
                  />
                  <path
                    d="M5.09699 17.9297C5.09703 17.1152 4.76469 15.5284 6.88817 13.924L9.25743 12.4414"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5.09699 17.9297C5.09703 17.1152 4.76469 15.5284 6.88817 13.924L9.25743 12.4414"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M19.7936 17.9297C19.7936 17.1152 20.1259 15.5284 18.0025 13.924L15.6332 12.4414"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M19.7936 17.9297C19.7936 17.1152 20.1259 15.5284 18.0025 13.924L15.6332 12.4414"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <line
                    x1="1"
                    y1="18.8398"
                    x2="23.5977"
                    y2="18.8398"
                    stroke="black"
                  />
                </svg>
                <span>Persona Generator</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <path
                    d="M5.25 25.8984H10.639"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5.25 29.0391H10.639"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M16.2183 13.8902L16.6893 14.058L16.7635 13.8495L16.6592 13.6544L16.2183 13.8902ZM14.8984 17.5964L14.4274 17.4287L14.136 18.2471L14.99 18.088L14.8984 17.5964ZM18.8232 16.8652L19.1163 16.4601L18.9425 16.3344L18.7316 16.3736L18.8232 16.8652ZM32.4945 9.85248C32.4945 14.3781 28.7464 18.0643 24.101 18.0643V19.0643C29.2791 19.0643 33.4945 14.9497 33.4945 9.85248H32.4945ZM24.101 1.64062C28.7464 1.64062 32.4945 5.32688 32.4945 9.85248H33.4945C33.4945 4.75523 29.2791 0.640625 24.101 0.640625V1.64062ZM15.7074 9.85248C15.7074 5.32688 19.4556 1.64062 24.101 1.64062V0.640625C18.9228 0.640625 14.7074 4.75523 14.7074 9.85248H15.7074ZM16.6592 13.6544C16.0512 12.5179 15.7074 11.225 15.7074 9.85248H14.7074C14.7074 11.3942 15.0941 12.8486 15.7774 14.1261L16.6592 13.6544ZM15.3695 17.7642L16.6893 14.058L15.7473 13.7225L14.4274 17.4287L15.3695 17.7642ZM18.7316 16.3736L14.8069 17.1049L14.99 18.088L18.9148 17.3567L18.7316 16.3736ZM24.101 18.0643C22.2329 18.0643 20.5095 17.4679 19.1163 16.4601L18.5302 17.2703C20.0895 18.3983 22.017 19.0643 24.101 19.0643V18.0643Z"
                    fill="black"
                  />
                  <ellipse
                    cx="19.8481"
                    cy="10.1388"
                    rx="1.26221"
                    ry="1.23642"
                    fill="#0453F4"
                  />
                  <ellipse
                    cx="23.9497"
                    cy="10.1388"
                    rx="1.26221"
                    ry="1.23642"
                    fill="#0453F4"
                  />
                  <ellipse
                    cx="28.0513"
                    cy="10.1388"
                    rx="1.26221"
                    ry="1.23642"
                    fill="#0453F4"
                  />
                  <path
                    d="M1 18.3594C1 17.2548 1.89543 16.3594 3 16.3594H6.54863C7.6532 16.3594 8.54863 17.2548 8.54863 18.3594V20.5797C8.54863 21.6842 9.44406 22.5797 10.5486 22.5797H12.8987C14.0032 22.5797 14.8987 23.4751 14.8987 24.5797V31.1402C14.8987 32.2448 14.0032 33.1402 12.8987 33.1402H3C1.89543 33.1402 1 32.2448 1 31.1402V18.3594Z"
                    stroke="black"
                  />
                  <path
                    d="M7.95312 16.3594L14.9013 23.1404"
                    stroke="black"
                    stroke-linecap="round"
                  />
                </svg>
                <span>Interview</span>
                <em>준비중</em>
              </Link>
            </li>
            <li>
              <Link to="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="30"
                  viewBox="0 0 33 28"
                  fill="none"
                >
                  <rect
                    y="0.140625"
                    width="10.7005"
                    height="10.7005"
                    rx="3"
                    fill="#0453F4"
                  />
                  <rect
                    y="16.5977"
                    width="10.7005"
                    height="10.7005"
                    rx="3"
                    fill="black"
                  />
                  <path
                    d="M2.83594 5.81955L3.99355 7.18541C4.43126 7.70185 5.24488 7.64325 5.60406 7.06942L7.86517 3.45703"
                    stroke="white"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2.83594 21.9211L3.99355 23.287C4.43126 23.8034 5.24488 23.7448 5.60406 23.171L7.86517 19.5586"
                    stroke="white"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14.5703 1.47656H32.0004"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14.5703 5.49219H32.0004"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14.5703 9.50391H23.2853"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14.5703 17.9336H32.0004"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14.5703 21.9492H32.0004"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14.5703 25.9609H23.2853"
                    stroke="black"
                    stroke-linecap="round"
                  />
                </svg>
                <span>Survey</span>
                <em>준비중</em>
              </Link>
            </li>
          </ul>
        </PersonaMenu>

        <PersonaCont>
          <AvatarProfile>
            <div className="thumb">
              <img src={`avatarList/${imgTarget}`} alt="" />

              {/* <img src={Avatar1} alt="" /> */}
            </div>
            <div className="cont">{allData.persona.기본정보.한줄소개}</div>
          </AvatarProfile>

          <ProfileInfo style={{ marginBottom: "50px" }}>
            <ul className="summary">
              <li>
                <strong>이름</strong>
                <p> {allData.persona.기본정보.이름}</p>
              </li>
              <li>
                <strong>나이</strong>
                <p>{allData.persona.기본정보.나이}</p>
              </li>
              <li>
                <strong>성별</strong>
                <p>{allData.persona.기본정보.성별}</p>
              </li>
              <li>
                <strong>직업</strong>
                <p>{allData.persona.기본정보.직업}</p>
              </li>
              <li>
                <strong>가족상태</strong>
                <p>
                  {allData.persona.기본정보.결혼유무},
                  {allData.persona.기본정보.자녀유무}
                </p>
              </li>
            </ul>

            <div className="info">
              <strong>페르소나 정보</strong>
              <p>{allData.persona.기본정보["페르소나 상세정보"]}</p>
            </div>
          </ProfileInfo>

          <BoxWrap>
            <Title H3>
              <span>비즈니스 내용</span>
              {allData.persona["제품/서비스 정보"][0]["제품/서비스"]}
            </Title>
            <p>
              {allData.persona["제품/서비스 정보"][1]["제품/서비스 분석결과"]}
            </p>
          </BoxWrap>

          <BoxWrap>
            <Title H3>제품에 대한 정보 수집 방법 </Title>

            <BgBoxWrap Flex>
              <BgBox>
                <strong>💡 핵심 기능</strong>
                <p> {allData.persona["제품/서비스 정보"][2]["핵심기능"]}</p>
              </BgBox>
              <BgBox>
                <strong>✨ 고객이 기대하는 속성</strong>
                <p>
                  {
                    allData.persona["제품/서비스 정보"][3][
                      "고객이 기대하는 속성"
                    ]
                  }
                </p>
              </BgBox>
              <BgBox>
                <strong>🎁 추가적인 서비스와 혜택</strong>
                <p>
                  {
                    allData.persona["제품/서비스 정보"][4][
                      "추가적인 서비스와 혜택"
                    ]
                  }
                </p>
              </BgBox>
            </BgBoxWrap>
          </BoxWrap>

          <BoxWrap>
            <Title H3>
              {allData.persona.기본정보.이름}의 심리 및 라이프스타일
            </Title>

            <BgBoxWrap>
              <div>
                <strong>⭐ 심리적 특성</strong>
                <p>{allData.persona["라이프 스타일"][0]["심리적 특성"]}</p>
              </div>
              <div>
                <strong>👁‍ 행동패턴</strong>
                <p>{allData.persona["라이프 스타일"][1]["행동패턴"]}</p>
              </div>
              <div>
                <strong>💌 관심사 및 필요 사항</strong>
                <p>
                  {allData.persona["라이프 스타일"][2]["관심사 및 필요사항"]}
                </p>
              </div>
              <div>
                <strong>🎯 제품/서비스를 사용해 보기 전 습관 및 정보</strong>
                <p>
                  {
                    allData.persona["라이프 스타일"][3][
                      "제품/서비스를 사용해 보기 전 습관 및 정보"
                    ]
                  }
                </p>
              </div>
            </BgBoxWrap>
          </BoxWrap>

          <BoxWrap>
            <Title H3>제품/서비스의 문제점 및 니즈, 서비스 고려사항</Title>

            <BgBoxWrap style={{ minHeight: "580px" }}>
              <div>
                <strong>
                  💰 {allData.persona.기본정보.이름}는(은) 해당 제품/서비스 관련
                  제품을 이렇게 구매해요
                </strong>
                <p className="blink">
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][3]["니즈 정보1"]
                  }
                  :
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][3]["니즈 설명1"]
                  }
                </p>
                <p className="blink">
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][4]["니즈 정보2"]
                  }
                  :
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][4]["니즈 설명2"]
                  }
                </p>
                <p className="blink">
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][5]["니즈 정보3"]
                  }{" "}
                  :
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][5]["니즈 설명3"]
                  }
                </p>
              </div>
              <div>
                <strong>
                  👀 {allData.persona.기본정보.이름}는(은) 이러한 문제점을
                  느끼고 있어요
                </strong>
                <p className="blink">
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][0]["문제점 정보1"]
                  }
                  :
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][0]["문제점 설명1"]
                  }
                </p>
                <p className="blink">
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][1]["문제점 정보2"]
                  }
                  :
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][1]["문제점 설명2"]
                  }
                </p>
                <p className="blink">
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][2]["문제점 정보3"]
                  }{" "}
                  :
                  {
                    allData.persona[
                      "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                    ][2]["문제점 설명3"]
                  }
                </p>
              </div>
              {showPopup ? (
                <div>
                  <strong>
                    👀 {allData.persona.기본정보.이름}님과 같은 페르소나를 위해
                    고려해야할 기능이에요
                  </strong>
                  <p className="blink">
                    {
                      allData.persona[
                        "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                      ][6]["고려사항 정보1"]
                    }
                    :
                    {
                      allData.persona[
                        "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                      ][6]["고려사항 설명1"]
                    }
                  </p>
                  <p className="blink">
                    {
                      allData.persona[
                        "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                      ][7]["고려사항 정보2"]
                    }
                    :
                    {
                      allData.persona[
                        "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                      ][7]["고려사항 설명2"]
                    }
                  </p>
                  <p className="blink">
                    {
                      allData.persona[
                        "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                      ][8]["고려사항 정보3"]
                    }
                    :
                    {
                      allData.persona[
                        "제품/서비스의 문제점 및 니즈, 서비스 고려사항"
                      ][8]["고려사항 설명3"]
                    }
                  </p>
                </div>
              ) : (
                ""
              )}
            </BgBoxWrap>

            <PopupReport>
              <div>
                <h1>
                  성함과 이메일 주소를 알려주시면
                  <br />
                  메일로 페르소나 전체 보고서를 전달드려요
                  <p>메일 발송까지 최대 7일이 소요될 수 있습니다</p>
                </h1>

                <div>
                  <InputField
                    type="text"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="이름을 입력해주세요"
                  />
                </div>

                <div>
                  <InputField
                    type="email"
                    name="userEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="이메일 주소를 확인해주세요"
                  />
                </div>

                <Button Black Full onClick={checkEmailSend}>
                  보고서 요청하기
                </Button>
              </div>
            </PopupReport>
          </BoxWrap>
        </PersonaCont>
      </PersonaWrap>

      {isBackwardPopup && (
        <Popup
          Error
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              // //togglePopup();
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
              <Button Black onClick={moveNone}>
                페이지 유지
              </Button>
              <Button Black onClick={moveMain} style={{ marginLeft: "15px" }}>
                나가기
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}

      {showContents && (
        <Popup
          Error
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              // //togglePopup();
            }
          }}
        >
          <div>
            <ReportWrap Error>
              <strong>입력하신 정보를 확인해주세요</strong>
              <ul>
                <li>
                  <strong>이름 :</strong>
                  <p>{userName}</p>
                </li>
                <li>
                  <strong>메일주소 :</strong>
                  <p>{userEmail}</p>
                </li>
              </ul>
              <Button Black onClick={() => setShowContents(false)}>
                다시입력
              </Button>
              <Button
                Black
                onClick={() => {
                  setShowOneContents(true);
                  setShowContents(false);
                  sendUpdate();
                  sendEmail();
                }}
                style={{ marginLeft: "15px" }}
              >
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}

      {showOneContents && (
        <Popup
          Error
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              //togglePopup();
            }
          }}
        >
          <div>
            <ReportWrap Error>
              <strong>보고서 요청이 완료되었습니다.</strong>
              <p>
                AI기반 페르소나 생성 서비스에 관심을 가져주셔서 감사합니다.
                <br />
                전체 페르소나 보고서는 최대 7일 이내에
                <br />
                입력하신 메일로 전송될 예정입니다.{" "}
              </p>
              <Button
                Black
                onClick={() => {
                  setMailSend(true);
                  setShowOneContents(false);
                  navigate("/");
                  //  setShowContents(false);
                  // setIsPopupOpen(false);
                }}
              >
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}

      {isNoneData && (
        <Popup
          Error
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              //togglePopup();
            }
          }}
        >
          <div>
            <ReportWrap Error>
              <strong>이메일 또는 이름을 확인해주세요</strong>
              <Button Black onClick={moveNone}>
                확인
              </Button>
            </ReportWrap>
          </div>
        </Popup>
      )}
    </>
  );
};

export default PersonaGenerator;

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
  border-bottom: 1px solid ${palette.lineGray};
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

const PersonaWrap = styled.div`
  position: relative;
  // left: 320px;
  // width: calc(100% - 350px);
  padding-top: 80px;
  // display: block;
  display: flex;
`;

const PersonaMenu = styled.div`
  // position: fixed;
  position: sticky;
  top: 80px;
  left: 0;
  max-width: 290px;
  width: 100%;
  height: 100vh;
  text-align: left;
  padding: 30px 40px;
  margin-right: 60px;
  border-right: 1px solid ${palette.lineGray};
  transition: transform 0.5s;
  transform: translateX(0);

  .MenuBtn {
    position: absolute;
    top: 20px;
    right: -40px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    .line {
      width: 30px;
      height: 2px;
      margin: 5px 0;
      padding: 0;
      background: ${palette.black};
      transition: all 700ms cubic-bezier(0.9, 0, 0.33, 1);

      &.line-1 {
        width: 30px;
        transform: rotate(0) translateY(0);
      }

      &.line-2 {
        width: 28px;
        transform: translateX(0);
      }

      &.line-3 {
        width: 20px;
        transform: rotate(0) translateY(0);
      }
    }
  }

  &.open {
    transform: translateX(0);
  }
  &.closed {
    width: 0;
    padding: 0;
    margin-right: 0;
    transform: translateX(-100%);

    h2,
    ul {
      display: none;
    }
  }

  &.open {
    .line-1 {
      width: 30px !important;
      transform: rotate(45deg) translateY(5px) !important;
    }
    .line-2 {
      display: none;
    }
    .line-3 {
      width: 30px !important;
      transform: rotate(-45deg) translateY(-5px) !important;
    }
  }

  @media (max-width: 767px) {
    transform: translateX(-100%);
  }

  em {
    font-style: normal;
    font-size: 0.875rem;
    padding: 8px 10px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.05);
  }

  h2 {
    font-size: 1.125rem;
    margin-bottom: 50px;
  }

  li a {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.125rem;
    transition: all 0.5s;

    svg {
      flex-shrink: 0;
    }
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  li + li {
    margin-top: 25px;
  }
`;

const PersonaCont = styled.div`
  position: relative;
  max-width: 1250px;
  text-align: left;
  margin: 100px auto 0;

  @media (max-width: 767px) {
    margin: 100px auto 0;
  }
`;

const AvatarProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 75px;
  margin-bottom: 40px;

  .thumb {
    position: relative;
    width: 270px;
    height: 270px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    background: ${palette.lightGray};

    img {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;
    }
  }
  .cont {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
    word-break: keep-all;
    flex-grow: 1;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  gap: 80px;
  padding: 40px;
  border-radius: 20px;
  border: 1px solid ${palette.lineGray};

  .summary {
    position: relative;
    max-width: 300px;
    width: 100%;
    font-size: 1.25rem;
    flex-shrink: 0;

    li {
      display: flex;
      gap: 40px;

      + li {
        margin-top: 20px;
      }

      strong {
        min-width: 70px;
      }
    }

    &:after {
      position: absolute;
      right: -40px;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 100%;
      background: ${palette.lineGray};
      content: "";
    }
  }

  .info {
    font-size: 1.25rem;
    line-height: 1.2;
    word-break: keep-all;
    flex-grow: 1;

    strong {
      display: block;
      font-weight: 700;
      margin-bottom: 15px;
    }

    p {
      font-size: 1.125rem;
      line-height: 1.3;
    }
  }
`;

const BoxWrap = styled.div`
  position: relative;
  padding: 30px;
  margin: 50px auto;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${palette.lineGray};

  p {
    font-size: 1.125rem;
  }

  .summary {
    display: flex;
    align-items: center;
    gap: 20px;

    p {
      height: 100px;
      font-size: 1.125rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 10px;
      background: rgba(252, 48, 48, 0.1);
    }

    li {
      position: relative;
      font-size: 1.125rem;
      line-height: 1.2;
      word-break: keep-all;
      padding-left: 10px;

      + li {
        margin-top: 20px;
      }

      &:before {
        position: absolute;
        left: 0;
        top: 8px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: ${palette.black};
        content: "";
      }
    }
  }
`;

const BgBoxWrap = styled.div`
  ${(props) =>
    props.Flex &&
    css`
      display: flex;
      gap: 20px;
      text-align: center;

      div {
        text-align: left;
        + div {
          margin-top: 0 !important;
        }
      }
    `}

  div {
    font-size: 1.125rem;
    line-height: 1.3;
    word-break: keep-all;
    padding: 20px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.04);

    strong {
      font-weight: 700;
      display: block;
      margin-bottom: 20px;
    }

    + div {
      margin-top: 20px;
    }

    p {
      color: ${palette.darkGray};
      + p {
        margin-top: 20px;
      }
    }

    .blink {
      position: relative;
      padding-left: 20px;

      &:before {
        position: absolute;
        left: 0;
        top: 5px;
        width: 10px;
        height: 10px;
        border: 2px solid ${palette.skyBlue};
        border-radius: 50%;
        background: ${palette.white};
        content: "";
      }
    }
  }
`;

const BgBox = styled.div`
  padding: 30px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);

  li {
    font-size: 1.25rem;
    + li {
      margin-top: 20px;
    }
    p {
      color: ${palette.darkGray};
    }
  }
`;

const PopupReport = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 86%;
  padding: 12dvh 0 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 10%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 90%,
    rgba(255, 255, 255, 0) 100%
  );

  h1 {
    text-align: center;
    margin-bottom: 60px;
    p {
      font-size: 1.125rem;
      font-weight: 400;
      margin-top: 20px;
    }
  }

  div {
    max-width: 600px;
    margin: 0 auto;

    + div {
      margin-top: 15px;
    }
  }

  input {
    background: ${palette.lightGray};
  }

  button {
    font-family: 'Pretendard', 'Poppins';
    margin-top: 40px;
  }
`;
