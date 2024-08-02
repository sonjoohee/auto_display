// src/components/molecules/MoleculeLoginPopup.jsx

import React from 'react';
import styles from '../../assets/styles/molecules_css/MoleculeLoginPopup.module.css';
import MoleculeLoginForm from './MoleculeLoginForm';
import MoleculeGoogleLoginForm from './MoleculeGoogleLoginForm';

const MoleculeLoginPopup = ({ onClose }) => {
  return (
    <div className={styles.loginPopup}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <MoleculeLoginForm />
        <MoleculeGoogleLoginForm />
      </div>
    </div>
  );
};

export default MoleculeLoginPopup;
