import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PageLogin from './pages/Login_Sign/components/pages/PageLogin';
import PageSignup from './pages/Login_Sign/components/pages/PageSignup';
import PageLoginSuccess from './pages/Login_Sign/components/pages/PageLoginSuccess';
import PageVerifyEmail  from './pages/Login_Sign/components/pages/PageVerifyEmail';
import PageEmailVerified from './pages/Login_Sign/components/pages/PageEmailVerified'; // 생성한 페이지 임포트
import PageEmailVerificationFailed from './pages/Login_Sign/components/pages/PageEmailVerificationFailed'; // 이메일 인증 실패 페이지 추가
import PageAIPanelList from './pages/AI_Panel/components/pages/PageAIPanelList';
import GlobalStyles from "./assets/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lending from './pages/Lending';

function App() {
  return (
    <div className="App">
      {/* 스타일 컴퍼넌트 적용 */}
      <GlobalStyles />

      {/* 라우터 적용 */}
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Lending />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/signup" element={<PageSignup />} />
          <Route path="/success" element={<PageLoginSuccess />} />
          <Route path="*" element={<Lending />} />
          <Route path="/verify-email" element={<PageVerifyEmail />} />
          <Route path="/email-verified" element={<PageEmailVerified />} /> {/* 임시 페이지 추가 */}
          <Route path="/email-verification-failed" element={<PageEmailVerificationFailed />} /> {/* 이메일 인증 실패 페이지 추가 */}
          <Route path="/AI_Panel" element={<PageAIPanelList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
