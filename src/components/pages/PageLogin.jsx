// PageLogin.jsx
import React from 'react';
import MoleculeLoginForm from '../molecules/MoleculeLoginForm';
import OrganismHeader from '../organisms/OrganismHeader';
import OrganismFooter from '../organisms/OrganismFooter';
import styles from '../../assets/styles/pages_css/PageLogin.module.css';

const PageLogin = () => {
  return (
    <div className={styles.pageLayout}>
      <OrganismHeader />
      <main className={styles.mainContent}>
        <MoleculeLoginForm />
      </main>
      <OrganismFooter />
    </div>
  );
};

export default PageLogin;
