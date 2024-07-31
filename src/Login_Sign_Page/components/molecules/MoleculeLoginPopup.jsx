// src/Login_Sign_Page/components/molecules/MoleculeLoginPopup.jsx
import React from 'react';
import styles from '../../assets/styles/molecules_css/MoleculeLoginPopup.module.css';
import MoleculeLoginForm from './MoleculeLoginForm';
import MoleculeGoogleLoginForm from './MoleculeGoogleLoginForm';

const MoleculeLoginPopup = ({ onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.loginPopup} onClick={handleOverlayClick}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <MoleculeLoginForm />
        <MoleculeGoogleLoginForm />
      </div>
    </div>
  );
};

export default MoleculeLoginPopup;
