// TemplateMainLayout.jsx
import React from 'react';
import OrganismHeader from '../organisms/OrganismHeader';
import OrganismFooter from '../organisms/OrganismFooter';
import OrganismSidebar from '../organisms/OrganismSidebar';
import styles from '../../assets/styles/templates_css/TemplateMainLayout.module.css';

const TemplateMainLayout = ({ children }) => (
  <div className={styles.mainLayout}>
    <OrganismHeader />
    <div className={styles.contentWithSidebar}>
      <OrganismSidebar items={[{ name: 'Home', link: '/' }, { name: 'About', link: '/about' }]} />
      <main className={styles.mainContent}>{children}</main>
    </div>
    <OrganismFooter />
  </div>
);

export default TemplateMainLayout;
