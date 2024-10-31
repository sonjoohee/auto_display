// App.js
import React, { useEffect, useState } from "react";
import './App.css';
import GlobalStyles from "./assets/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAtom , } from 'jotai';
import { isLoggedInAtom,USER_NAME, USER_EMAIL ,IS_SOCIAL_LOGGED_IN, EXPERT_DETAIL_DATA, IS_MOBILE } from './pages/AtomStates'; // 로그인 상태 아톰 임포트
import axios from "axios";

import PageLogin from './pages/Login_Sign/components/pages/PageLogin';
import PageSignup from './pages/Login_Sign/components/pages/PageSignup';
import PageLoginSuccess from './pages/Login_Sign/components/pages/PageLoginSuccess';
import PageVerifyEmail from './pages/Login_Sign/components/pages/PageVerifyEmail';
import PageEmailVerified from './pages/Login_Sign/components/pages/PageEmailVerified';
import PageEmailVerificationFailed from './pages/Login_Sign/components/pages/PageEmailVerificationFailed';
import PageResetPassword from './pages/Login_Sign/components/pages/PageResetPassword';
import PageRequestResetPassword from './pages/Login_Sign/components/pages/PageRequestResetPassword';
import PagePayTest from './pages/Purchase_Credit/components/pages/PagePayTest';

import PageAIPanelList from './pages/AI_Panel/components/pages/PageAIPanelList';
import BusinessTool from './pages/Business_Tool';
import PageMeetAiExpert from './pages/Meet_Ai_Expert/components/pages/PageMeetAiExpert';
import LandingPage from './pages/Meet_Ai_Expert/components/pages/LandingPage';

import PageExpertInsight from "./pages/Expert_Insight/components/pages/PageExpertInsight";

// Biz
import Lending from './pages/Lending';
import TargetSetting from "./pages/Persona/TargetSetting";
import TargetChoice from "./pages/Persona/TargetChoice";
import PersonaGenerator from "./pages/Persona/PersonaGenerator";
import Loading from "./pages/Persona/Loading";
import LoadingPersona from "./pages/Persona/LoadingPersona";
import OrganismReportPopup from './pages/Expert_Insight/components/organisms/OrganismReportPopup'; 

import PageCompletedMail from './pages/Login_Sign/components/pages/PageCompletedMail';

import BMExpert from "./pages/Expert_Insight/components/pages/BMExpert";
import PriceAnalysis from "./pages/Expert_Insight/components/pages/PriceAnalysis";
import ExpertExample from './pages/Expert_Insight/components/pages/ExpertExample';

function App() {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태를 위한 아톰
  const [, setUserName] = useAtom(USER_NAME); // 유저 이름 아톰
  const [, setUserEmail] = useAtom(USER_EMAIL); // 유저 이메일 아톰
  const [, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN); // 소셜 로그인 상태 아톰
  const [isServerDown, setIsServerDown] = useState(false); // 서버 상태 관리
  const [, setExpertDetail] = useAtom(EXPERT_DETAIL_DATA);
      // 화면 크기를 체크하는 useEffect
  const [, setIsMobile] = useAtom(IS_MOBILE);
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
    const token = sessionStorage.getItem('accessToken'); // sessionStorage에서 토큰 확인
    const storedUserName = sessionStorage.getItem('userName');
    const storedUserEmail = sessionStorage.getItem('userEmail');
    const isSocialLogin = sessionStorage.getItem('isSocialLogin'); // 소셜 로그인 여부 확인

    if (token) {
      setIsLoggedIn(true);  // 토큰이 있으면 로그인 상태로 설정
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

  // useEffect(() => {
  //   const fetchExperts = async () => {
  //     try {
  //       const accessToken = sessionStorage.getItem("accessToken");
  //       const response = await axios.get(
  //         "https://wishresearch.kr/expert/list",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //           timeout: 100000, // 100 seconds
  //           withCredentials: true,
  //         }
  //       );
  //       setExpertDetail(response.data);
  //     } catch (err) {
  //       console.error("Error fetching experts:", err);
  //     }
  //   };

  //   fetchExperts();
  // }, []); 

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
            <Route path="/login" element={<PageLogin />} />
            <Route path="/signup" element={<PageSignup />} />
            <Route path="/success" element={<PageLoginSuccess />} />
            <Route path="/verify-email" element={<PageVerifyEmail />} />
            <Route path="/email-verified" element={<PageEmailVerified />} />
            <Route path="/email-verification-failed" element={<PageEmailVerificationFailed />} />
            <Route path="/reset-password" element={<PageResetPassword />} />
            <Route path="/request-reset-password" element={<PageRequestResetPassword />} />
            <Route path="/PagePayTest" element={<PagePayTest />} />

            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<LandingPage />} />
            <Route path="/MeetAiExpert" element={<PageMeetAiExpert />} />
            <Route path="/ExpertInsight" element={<PageExpertInsight />}></Route>

            <Route path="/CompletedMail" element={<PageCompletedMail />}></Route>

            <Route path="/BMExpert" element={<BMExpert />}></Route>
            <Route path="/PriceAnalysis" element={<PriceAnalysis />}></Route>
            <Route path="/ExpertExample" element={<ExpertExample />}></Route>

            <Route path="/PageAIPanelList" element={<PageAIPanelList />}></Route>

            <Route path="/Landing" element={<LandingPage />}></Route>



            {/* <Route path="/AI_Panel" element={<PageAIPanelList />} />
            <Route path="/QuickReport" element={<BusinessTool />} /> */}

            {/* Biz */}
            {/* <Route path="/Lending" element={<Lending />} />
            <Route path="/TargetSetting" element={<TargetSetting />} />
            <Route path="/TargetChoice" element={<TargetChoice />} />
            <Route path="/Loading" element={<Loading />} />
            <Route path="/LoadingPersona" element={<LoadingPersona />} />
            <Route path="/PersonaGenerator" element={<PersonaGenerator />} /> */}

            {/* 추가된 Route */}

            <Route path="/report/:id" element={<OrganismReportPopup />} />
            <Route path="/conversation/:conversationId" element={<PageExpertInsight />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
