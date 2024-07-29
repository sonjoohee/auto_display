import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PageLogin from './components/pages/PageLogin';
import PageSignup from './components/pages/PageSignup';
import PageLoginSuccess from './components/pages/PageLoginSuccess';
import PageList from './List_Page/components/pages/PageList';
import Lending from './pages/Lending';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Lending />} />
          <Route path="/login" element={<PageLogin />} />
          <Route path="/signup" element={<PageSignup />} />
          <Route path="/success" element={<PageLoginSuccess />} />
          <Route path="/list" element={<PageList />} />
          <Route path="*" element={<Lending />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
