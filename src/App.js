// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import GlobalStyles from "./assets/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
} from "./pages/AtomStates"; // 로그인 상태 아톰 임포트
import axios from "axios";

import PageLogin from "./pages/Login_Sign/components/pages/PageLogin";
import PageSignup from "./pages/Login_Sign/components/pages/PageSignup";
import PageLoginSuccess from "./pages/Login_Sign/components/pages/PageLoginSuccess";
import PageVerifyEmail from "./pages/Login_Sign/components/pages/PageVerifyEmail";
import PageEmailVerified from "./pages/Login_Sign/components/pages/PageEmailVerified";
import PageEmailVerificationFailed from "./pages/Login_Sign/components/pages/PageEmailVerificationFailed";
import PageResetPassword from "./pages/Login_Sign/components/pages/PageResetPassword";
import PageRequestResetPassword from "./pages/Login_Sign/components/pages/PageRequestResetPassword";
import PagePayTest from "./pages/Purchase_Credit/components/pages/PagePayTest";
import PageCompletedMail from "./pages/Login_Sign/components/pages/PageCompletedMail";

import PageMeetAiExpert from "./pages/Meet_Ai_Expert/components/pages/PageMeetAiExpert";
import PageExpertInsight from "./pages/Expert_Insight/components/pages/PageExpertInsight";
import PageMarketingExpertInsight from "./pages/Expert_Insight/components/pages/PageMarketingExpertInsight";
import PageMarketingLanding from "./pages/Marketing/components/pages/PageMarketingLanding";

import PageMarketingYesItems from "./pages/Marketing/components/pages/PageMarketingYesItems";
import PageMarketingNoItems from "./pages/Marketing/components/pages/PageMarketingNoItems";
import PageMarketingNoItemsResult from "./pages/Marketing/components/pages/PageMarketingNoItemsResult";

// 디자인페이지
import PageConnetWithYouTarget from "./pages/Design_Page/PageConnetWithYourTargett";
import PageBusinessAnalysis from "./pages/Design_Page/PageBusinessAnalysis";
import PageCustomizePersona from "./pages/Design_Page/PageCustomizePersona";
import PageWayInterview from "./pages/Design_Page/PageWayInterview";
import PageInterviewResult from "./pages/Design_Page/PageInterviewResult";
import PagePersonaLoader from "./pages/Persona/components/atoms/AtomPersonaLoader";
import PageRecreate from "./assets/styles/PageRecreate";

// 페르소나
import PageMain from "./pages/Persona/components/pages/PageMain";
import PagePersona from "./pages/Persona/components/pages/PagePersona";
import PagePersona2 from "./pages/Persona/components/pages/PagePersona2";
import PagePersona3 from "./pages/Persona/components/pages/PagePersona3";
import PagePersona4 from "./pages/Persona/components/pages/PagePersona4";
import PageMyProject from "./pages/Persona/components/pages/PageMyProject";

function App() {
  const [, setIsLoggedIn] = useAtom(IS_LOGGED_IN); // 로그인 상태를 위한 아톰
  const [, setUserName] = useAtom(USER_NAME); // 유저 이름 아톰
  const [, setUserEmail] = useAtom(USER_EMAIL); // 유저 이메일 아톰
  const [, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN); // 소셜 로그인 상태 아톰
  const [isServerDown, setIsServerDown] = useState(false); // 서버 상태 관리
  const [, setExpertDetail] = useAtom(EXPERT_DETAIL_DATA); // 화면 크기를 체크하는 useEffect
  const [, setIsMobile] = useAtom(IS_MOBILE);
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

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
      try {
        const response = await axios.get(
          `https://wishresearch.kr/api/db/back_server`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 서버가 정상일 경우
        if (response.status === 200) {
          setIsServerDown(false);
        }
      } catch (error) {
        // 서버가 응답하지 않거나 에러 발생 시 서버 다운 처리
        setIsServerDown(true);

        sessionStorage.removeItem("accessToken"); // 세션 스토리지에서 토큰 삭제
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("isSocialLogin");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setUserName("");
        setUserEmail("");

        window.location.href = "/Main";
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
        <div className="server-down-alert">
          <p>서버가 점검 중입니다. 잠시 후 다시 시도해 주세요.</p>
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageMain />} />
          <Route path="*" element={<PageMain />} />
          <Route path="/MeetAiExpert" element={<PageMeetAiExpert />} />
          <Route path="/ExpertInsight" element={<PageExpertInsight />}></Route>
          <Route
            path="/MarketingExpertInsight"
            element={<PageMarketingExpertInsight />}
          ></Route>
          {isMarketing && approachPath !== 2 ? (
            <Route
              path="/conversation/:conversationId"
              element={<PageMarketingExpertInsight />}
            />
          ) : (
            <Route
              path="/conversation/:conversationId"
              element={<PageExpertInsight />}
            />
          )}

          {/* 마케팅 */}
          <Route
            path="/MarketingLanding"
            element={<PageMarketingLanding />}
          ></Route>
          <Route
            path="/MarketingSetting/1"
            element={<PageMarketingYesItems />}
          ></Route>
          <Route
            path="/MarketingSetting/2"
            element={<PageMarketingNoItems />}
          ></Route>
          <Route
            path="/MarketingSetting/2/Result"
            element={<PageMarketingNoItemsResult />}
          ></Route>

          {/* 페르소나 */}
          <Route path="/Persona" element={<PagePersona />}></Route>
          <Route path="/Main" element={<PageMain />}></Route>
          <Route path="/Persona/:projectId" element={<PagePersona />}></Route>
          <Route
            path="/Persona/2/:projectId"
            element={<PagePersona2 />}
          ></Route>
          <Route
            path="/Persona/3/:projectId"
            element={<PagePersona3 />}
          ></Route>
          <Route
            path="/Persona/4/:projectId"
            element={<PagePersona4 />}
          ></Route>

          <Route path="/MyProject" element={<PageMyProject />} />
          {/* <Route
            path="/CuratorStoryboard"
            element={<CuratorStoryboard />}
          ></Route> */}
          {/* <Route path="/MarketingLandingPage" element={<MarketingLandingPage />}></Route> */}
          {/* <Route path="/SamplePage" element={<SamplePage />}></Route> */}

          {/* AI 패널 */}
          {/* <Route path="/AI_Panel" element={<PageAIPanelList />} />
            <Route path="/QuickReport" element={<BusinessTool />} />
            <Route path="/PageAIPanelList" element={<PageAIPanelList />}></Route> */}

          {/* 디자인페이지 */}
          <Route
            path="/ConnectWithYourTarget"
            element={<PageConnetWithYouTarget />}
          />
          <Route path="/BusinessAnalysis" element={<PageBusinessAnalysis />} />
          <Route path="/CustomizePersona" element={<PageCustomizePersona />} />
          <Route path="/WayInterview" element={<PageWayInterview />} />
          <Route path="/InterviewResult" element={<PageInterviewResult />} />
          <Route path="/PersonaLoader" element={<PagePersonaLoader />} />
          <Route path="/Recreate" element={<PageRecreate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
