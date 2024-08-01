import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PageLogin from './Login_Sign_Page/components/pages/PageLogin';
import PageSignup from './Login_Sign_Page/components/pages/PageSignup';
import PageLoginSuccess from './Login_Sign_Page/components/pages/PageLoginSuccess';
import PageAIPanelList from './AI_List_Page/components/pages/PageAIPanelList';
import PageAIPanelListImage from './AI_List_Page/components/pages/PageAIPanelListImage';
import GlobalStyles from "./assets/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lending from './pages/Lending';
import AIPanelList from "./pages/AI-Panel/AIList";

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
          <Route path="/list" element={<PageAIPanelList />} />
          <Route path="/imagelist" element={<PageAIPanelListImage />} />
          <Route path="*" element={<Lending />} />
          <Route path="/AI_Panel" element={<AIPanelList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
