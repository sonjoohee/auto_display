// src/components/organisms/OrganismFooterBar.jsx

import React from 'react';
import styles from '../../assets/styles/organisms_css/OrganismFooterBar.module.css';

const OrganismFooterBar = ({ onLoginClick }) => {
  return (
    <div className={styles.footerBar}>
      <button onClick={onLoginClick}>로그인</button>
    </div>
  );
};

export default OrganismFooterBar;
