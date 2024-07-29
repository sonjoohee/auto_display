// src/components/molecules/MoleculeLoginPopupManager.jsx

import React, { useState } from 'react';
import MoleculeLoginPopup from './MoleculeLoginPopup';

const MoleculeLoginPopupManager = ({ children }) => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginPopupOpen(true);
  };

  const handleClosePopup = () => {
    setLoginPopupOpen(false);
  };

  return (
    <>
      {children(handleLoginClick)}
      {isLoginPopupOpen && <MoleculeLoginPopup onClose={handleClosePopup} />}
    </>
  );
};

export default MoleculeLoginPopupManager;
