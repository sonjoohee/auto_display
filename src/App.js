// App.js
import React, { useEffect } from 'react';
import './App.css';
import GlobalStyles from "./assets/GlobalStyle";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAtom , } from 'jotai';
import { isLoggedInAtom,USER_NAME, USER_EMAIL } from './pages/AtomStates'; // 로그인 상태 아톰 임포트

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

import ExpertExample from './pages/Expert_Insight/components/pages/ExpertExample';

function App() {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태를 위한 아톰
  const [, setUserName] = useAtom(USER_NAME); // 유저 이름 아톰
  const [, setUserEmail] = useAtom(USER_EMAIL); // 유저 이메일 아톰

  // 애플리케이션이 로드될 때 로그인 상태 확인
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken'); // sessionStorage에서 토큰 확인
    const storedUserName = sessionStorage.getItem('userName');
    const storedUserEmail = sessionStorage.getItem('userEmail');

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
  }, [setIsLoggedIn, setUserName, setUserEmail]);


  return (
    <div className="App">
      {/* 스타일 컴퍼넌트 적용 */}
      <GlobalStyles />

      {/* PayPalScriptProvider로 PayPal SDK를 감싸기 */}
      <PayPalScriptProvider options={{ "client-id": "AZ8YnURNB0jk4DtQea_FPZ7Zq-MfLHCU05aWjD51tpCJKHEGhoW6VwBvWGFqo-iMRpf0Qe05DVupI6Nb" }}>
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

            <Route path="/" element={<PageMeetAiExpert />} />
            <Route path="*" element={<PageMeetAiExpert />} />
            <Route path="/PageMeetAiExpert" element={<PageMeetAiExpert />} />
            <Route path="/ExpertInsight" element={<PageExpertInsight />}></Route>

            <Route path="/CompletedMail" element={<PageCompletedMail />}></Route>

            <Route path="/ExpertExample" element={<ExpertExample />}></Route>


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
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
