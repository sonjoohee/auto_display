// src/components/templates/TemplateAuthLayout.jsx

import React from 'react';
import OrganismHeader from '../organisms/OrganismHeader';
import OrganismFooter from '../organisms/OrganismFooter';
import styles from '../../assets/styles/templates_css/TemplateAuthLayout.module.css';

const TemplateAuthLayout = ({ children }) => (
  <div className={styles.authLayout}>
    <OrganismHeader />
    <main className={styles.mainContent}>
      {children}
    </main>
    <OrganismFooter />
  </div>
);

export default TemplateAuthLayout;
