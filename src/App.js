import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PageLogin from './pages/Login_Sign/components/pages/PageLogin';
import PageSignup from './pages/Login_Sign/components/pages/PageSignup';
import PageLoginSuccess from './pages/Login_Sign/components/pages/PageLoginSuccess';
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
          <Route path="/AI_Panel" element={<PageAIPanelList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
