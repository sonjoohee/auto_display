// MoleculeLoginPopupManager.jsx

import React, { useState } from "react";
import MoleculeLoginPopup from "./MoleculeLoginPopup";
import { useNavigate } from "react-router-dom";

const MoleculeLoginPopupManager = ({ children }) => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setLoginPopupOpen(true);
  };

  const handleClosePopup = () => {
    setLoginPopupOpen(false);
  };

  const handleLoginSuccess = () => {
    // 팝업을 통한 로그인일 경우 팝업 닫기
    setLoginPopupOpen(false);
    navigate("/");
  };

  return (
    <>
      {children(handleLoginClick)}
      {isLoginPopupOpen && (
        <MoleculeLoginPopup
          onClose={handleClosePopup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default MoleculeLoginPopupManager;
