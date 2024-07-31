// src/components/pages/PageLogin.jsx

import React from 'react';
import MoleculeLoginForm from '../molecules/MoleculeLoginForm';
import MoleculeGoogleLoginForm from '../molecules/MoleculeGoogleLoginForm';
import TemplateAuthLayout from '../templates/TemplateAuthLayout';
import styles from '../../assets/styles/pages_css/PageLogin.module.css';

const PageLogin = () => {
  return (
    <TemplateAuthLayout>
      <div className={styles.loginForms}>
        <MoleculeLoginForm />
        <MoleculeGoogleLoginForm />
      </div>
    </TemplateAuthLayout>
  );
};

export default PageLogin;
