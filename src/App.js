import React, { useEffect, useState } from "react";
import './App.css';
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
          <Route path="/" element={<Lending />}></Route>
          {/* <Route path="/dashBoard" element={<DashBoard />}></Route> */}

          <Route path="/AI-Panel" element={<AIPanelList />}></Route>

          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="*" element={<Lending />}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
