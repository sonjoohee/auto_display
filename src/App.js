import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'; // PayPalScriptProvider 임포트
import './App.css';
import PageLogin from './pages/Login_Sign/components/pages/PageLogin';
import PageSignup from './pages/Login_Sign/components/pages/PageSignup';
import PageLoginSuccess from './pages/Login_Sign/components/pages/PageLoginSuccess';
import PageVerifyEmail from './pages/Login_Sign/components/pages/PageVerifyEmail';
import PageEmailVerified from './pages/Login_Sign/components/pages/PageEmailVerified';
import PageEmailVerificationFailed from './pages/Login_Sign/components/pages/PageEmailVerificationFailed';
import PageResetPassword from './pages/Login_Sign/components/pages/PageResetPassword';
import PageRequestResetPassword from './pages/Login_Sign/components/pages/PageRequestResetPassword';
import PageAIPanelList from './pages/AI_Panel/components/pages/PageAIPanelList';
import PagePayTest from './pages/Purchase_Credit/components/pages/PagePayTest';
import PageMeetAiExpert from './pages/Meet_Ai_Expert/components/pages/PageMeetAiExpert';
import GlobalStyles from "./assets/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lending from './pages/Lending';
import BusinessTool from './pages/Business_Tool';
import TargetSetting from "./pages/Persona/TargetSetting";
import TargetChoice from "./pages/Persona/TargetChoice";
import PersonaGenerator from "./pages/Persona/PersonaGenerator";
import Loading from "./pages/Persona/Loading";
import LoadingPersona from "./pages/Persona/LoadingPersona";

function App() {
  return (
    <div className="App">
      {/* 스타일 컴퍼넌트 적용 */}
      <GlobalStyles />

      {/* PayPalScriptProvider로 PayPal SDK를 감싸기 */}
      <PayPalScriptProvider options={{ "client-id": "AZ8YnURNB0jk4DtQea_FPZ7Zq-MfLHCU05aWjD51tpCJKHEGhoW6VwBvWGFqo-iMRpf0Qe05DVupI6Nb" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Lending />} />
            <Route path="/QuickReport" element={<BusinessTool />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/signup" element={<PageSignup />} />
            <Route path="/success" element={<PageLoginSuccess />} />
            <Route path="*" element={<Lending />} />
            <Route path="/verify-email" element={<PageVerifyEmail />} />
            <Route path="/email-verified" element={<PageEmailVerified />} />
            <Route path="/email-verification-failed" element={<PageEmailVerificationFailed />} />
            <Route path="/reset-password" element={<PageResetPassword />} />
            <Route path="/request-reset-password" element={<PageRequestResetPassword />} />
            <Route path="/AI_Panel" element={<PageAIPanelList />} />
            <Route path="/PagePayTest" element={<PagePayTest />} />
            <Route path="/PageMeetAiExpert" element={<PageMeetAiExpert />} />

            {/* Biz 라우팅 */}
            <Route path="/TargetSetting" element={<TargetSetting />} />
            <Route path="/TargetChoice" element={<TargetChoice />} />
            <Route path="/Loading" element={<Loading />} />
            <Route path="/LoadingPersona" element={<LoadingPersona />} />
            <Route path="/PersonaGenerator" element={<PersonaGenerator />} />
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
