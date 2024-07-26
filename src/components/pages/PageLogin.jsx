// src/components/pages/PageLogin.jsx
import React from 'react';
import MoleculeLoginForm from '../molecules/MoleculeLoginForm';
import MoleculeGoogleLoginForm from '../molecules/MoleculeGoogleLoginForm';
import OrganismHeader from '../organisms/OrganismHeader';
import OrganismFooter from '../organisms/OrganismFooter';
import styles from '../../assets/styles/pages_css/PageLogin.module.css';

const PageLogin = () => {
  return (
    <div className={styles.pageLayout}>
      <OrganismHeader />
      <main className={styles.mainContent}>
        <MoleculeLoginForm />
        <MoleculeGoogleLoginForm /> {/* 구글 로그인 폼 추가 */}
      </main>
      <OrganismFooter />
    </div>
  );
};

export default PageLogin;
