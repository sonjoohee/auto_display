// OrganismHeader.jsx
import React from 'react';
import logo from '../../assets/images/logo.svg';
import styles from '../../assets/styles/organisms_css/OrganismHeader.module.css';

const OrganismHeader = () => (
  <header className={styles.header}>
    <img src={logo} alt="Logo" />
    <h1>My App</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
);

export default OrganismHeader;
