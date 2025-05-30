// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import GlobalStyles from "./assets/GlobalStyle";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  IS_LOGGED_IN,
  USER_NAME,
  USER_EMAIL,
  IS_SOCIAL_LOGGED_IN,
  EXPERT_DETAIL_DATA,
  IS_MOBILE,
  IS_MARKETING,
  APPROACH_PATH,
  ACCESSABLE_EXPERT,
} from "./pages/AtomStates"; // 로그인 상태 아톰 임포트
import axios from "axios";
import styled, { css } from "styled-components";
import images from "./assets/styles/Images";
import { palette } from "./assets/styles/Palette";

import PageTerms from "./pages/PageTerms";
import PagePolicy from "./pages/PagePolicy";

// import PageServiceLanding from "./pages/PageServiceLanding";
// import PageServiceLandingDCBeducation from "./pages/PageServiceLandingDCBeducation";
// import PageBlog from "./pages/PageBlog";

// import PageToolList from "./pages/Persona/components/pages/PageToolList";
import PageMyProfile from "./pages/PageMyProfile";

//! SAAS 프로젝트
import PageProject from "./pages/Saas_Project/pages/PageProject";
// import PageProjectCreate from "./pages/Saas_Project/pages/PageProjectCreate";
import PageDashBoard from "./pages/Saas_Project/pages/PageDashBoard";

import PageStyleGuide from "./pages/Design_Page/PageStyleGuide";

// 로그인, 회원가입
import OrganismLogin from "./pages/Global/organisms/OrganismLogin";
import OrganismSignin from "./pages/Global/organisms/OrganismSignin";
import OrganismSignupEducation from "./pages/Global/organisms/OrganismSignupEducation";

import AtomProjectRouter from "./pages/Global/atoms/AtomProjectRouter";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN); // 로그인 상태를 위한 아톰
  const [, setUserName] = useAtom(USER_NAME); // 유저 이름 아톰
  const [, setUserEmail] = useAtom(USER_EMAIL); // 유저 이메일 아톰
  const [, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN); // 소셜 로그인 상태 아톰
  const [isServerDown, setIsServerDown] = useState(false); // 서버 상태 관리
  const [, setExpertDetail] = useAtom(EXPERT_DETAIL_DATA); // 화면 크기를 체크하는 useEffect
  const [, setIsMobile] = useAtom(IS_MOBILE);
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  // 토큰 존재 여부 확인 컴포넌트
  function RequireToken({ children }) {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      return <Navigate to="/Login" replace />;
    }
    return children;
  }

  // 로그인 상태에서 로그인/회원가입 페이지 접근 제한 컴포넌트
  function RedirectIfLoggedIn({ children }) {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      return <Navigate to="/Project" replace />;
    }
    return children;
  }

  const [accessableExpert, setAccessableExpert] = useAtom(ACCESSABLE_EXPERT);

  // useEffect(() => {
  //   const userEmail = sessionStorage.getItem("userEmail");
  //   if (
  //     userEmail === "yspark@userconnect.kr" ||
  //     userEmail === "jsjun0319@hanyang.ac.kr" ||
  //     userEmail === "sjjjang00@gmail.com" ||
  //     userEmail === "sungeun_lee@userconnect.kr" ||
  //     userEmail === "okhyund@userconnect.kr" ||
  //     userEmail === "hsb4557@naver.com" ||
  //     userEmail === "choi9110@nate.com" ||
  //     userEmail === "gusrms2346@naver.com" ||
  //     userEmail === "08doyun@naver.com" ||
  //     userEmail === "ehdbs08@hanyang.ac.kr" ||
  //     userEmail === "suauncle@gmail.com" ||
  //     userEmail === "pleasure4ur@gmail.com" ||
  //     userEmail === "r_pleasure4u@naver.com" ||
  //     userEmail === "lhm1186@naver.com" ||
  //     userEmail === "pixelweb@naver.com" ||
  //     userEmail === "hyeeun@userconnect.kr" ||
  //     userEmail === "pasrk0821@naver.com" ||
  //     userEmail === "okhyund@gmail.com" ||
  //     userEmail === "sunbin12325@gmail.com" ||
  //     userEmail === "yspark.uc@gmail.com" ||
  //     userEmail === "uvaluator@naver.com" ||
  //     userEmail === "jungmin_lee@userconnect.kr" ||
  //     userEmail === "syyoon@userconnect.kr" ||
  //     userEmail === "star7613son@gmail.com"
  //   ) {
  //     setAccessableExpert(true);
  //   }
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      // 뷰포트 너비가 768px 이하일 경우 모바일로 간주
      setIsMobile(window.innerWidth <= 768);
    };

    // 페이지 로드 시 및 창 크기 변경 시 화면 크기 체크
    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 로드 시에도 체크

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 애플리케이션이 로드될 때 로그인 상태 확인
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken"); // sessionStorage에서 토큰 확인
    const storedUserName = sessionStorage.getItem("userName");
    const storedUserEmail = sessionStorage.getItem("userEmail");
    const isSocialLogin = sessionStorage.getItem("isSocialLogin"); // 소셜 로그인 여부 확인

    if (token && storedUserName) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    } else {
      setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태로 설정
    }

    if (storedUserName) {
      setUserName(storedUserName); // 이름 아톰 업데이트
    }

    if (storedUserEmail) {
      setUserEmail(storedUserEmail); // 이메일 아톰 업데이트
    }
    if (isSocialLogin === "true") {
      setIsSocialLoggedIn(true); // 소셜 로그인 상태 업데이트
    } else {
      setIsSocialLoggedIn(false); // 일반 로그인 상태로 설정
    }
  }, [setIsLoggedIn, setUserName, setUserEmail]);

  // 10분마다 서버 상태 체크
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    const checkServerStatus = async () => {
      if (token) {
        try {
          await axios.get(`https://wishresearch.kr/api/db/token_check`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("lastUrl");
          sessionStorage.removeItem("userCreatedAt");
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("userEmail");
          sessionStorage.removeItem("isSocialLogin");
          localStorage.removeItem("userName");
          localStorage.removeItem("userEmail");
          setIsLoggedIn(false);
          setUserName("");
          setUserEmail("");
          window.location.reload();
        }
      } else {
        try {
          const response = await axios.get(
            `https://wishresearch.kr/api/db/back_server`,
            {
              timeout: 3000, // 3초 타임아웃 설정
            }
          );
          // 서버가 정상일 경우
          if (response.status === 200) {
            setIsServerDown(false);
          }
        } catch (error) {
          if (window.location.pathname !== "/Login") {
            // 서버가 응답하지 않거나 에러 발생 시 서버 다운 처리
            setIsServerDown(true);

            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("lastUrl");
            sessionStorage.removeItem("userCreatedAt");
            sessionStorage.removeItem("userName");
            sessionStorage.removeItem("userEmail");
            sessionStorage.removeItem("isSocialLogin");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            setIsLoggedIn(false);
            setUserName("");
            setUserEmail("");
          }
        }
      }
    };

    // 처음 실행
    checkServerStatus();

    // 10분마다 실행
    const intervalId = setInterval(() => {
      checkServerStatus();
    }, 600000); // 600초마다 서버 상태 확인

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
  }, []);

  return (
    <div className="App">
      {/* 스타일 컴퍼넌트 적용 */}
      <GlobalStyles />

      {/* 서버 점검 중 경고창 */}
      {isServerDown && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              window.location.href = "/Project";
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={() => (window.location.href = "/Project")}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>
              서버가 점검 중입니다
              <br />
              잠시 후 다시 시도해 주세요
            </p>
            <div className="btnWrap">
              <button
                type="button"
                onClick={() => (window.location.href = "/Project")}
              >
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}

      <BrowserRouter>
        {/* PROJECT_SAAS가 빈 객체일 때 리다이렉션하는 컴포넌트 */}
        <AtomProjectRouter />

        <Routes>
        <Route
          path="/"
          element={<Navigate to="/Login" replace />} // 루트 경로에서 /Login으로 리다이렉트
        />
          {/* <Route
            path="/"
            element={
              // <RequireToken>
              <PageServiceLanding />
              // </RequireToken>
            }
          /> */}
          {/* <Route
            path="/DCB-education"
            element={
              // <RequireToken>
              <PageServiceLandingDCBeducation />
              // </RequireToken>
            }
          /> */}
          {/* <Route
            path="*"
            element={
              // <RequireToken>
              <PageServiceLanding />
              // </RequireToken>
            }
          /> */}

          {/* <Route path="/ServiceLanding" element={<PageServiceLanding />} /> */}
          <Route
            path="/Project"
            element={
              <RequireToken>
                <PageProject />
              </RequireToken>
            }
          />
         

          {/* SAAS 프로젝트 */}
          <Route
            path="/MyProfile"
            element={
              <RequireToken>
                <PageMyProfile />
              </RequireToken>
            }
          />

          <Route
            path="/Login"
          // path="/"
            element={
              <RedirectIfLoggedIn>
                <OrganismLogin />
              </RedirectIfLoggedIn>
            }
          />

          <Route
            path="/Signin"
            element={
              <RedirectIfLoggedIn>
                <OrganismSignin />
              </RedirectIfLoggedIn>
            }
          />

          <Route
            path="/SignupEducation"
            element={
              <RedirectIfLoggedIn>
                <OrganismSignupEducation />
              </RedirectIfLoggedIn>
            }
          />

         

          <Route
            path="/DashBoard"
            element={
              <RequireToken>
                <PageDashBoard />
              </RequireToken>
            }
          />

         
         
          <Route path="/Terms" element={<PageTerms />} />
          <Route path="/Policy" element={<PagePolicy />} />

          {/* <Route
            path="/blog"
            element={
              // <RequireToken>
              <PageBlog />
              // </RequireToken>
            }
          /> */}

          <Route path="/style_guide" element={<PageStyleGuide />} />

        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

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
      line-height: 1.5;
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
