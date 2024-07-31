// src/components/pages/PageSignup.jsx

import React from 'react';
import MoleculeSignupForm from '../molecules/MoleculeSignupForm';
import OrganismFooterBar from '../organisms/OrganismFooterBar';
import MoleculeLoginPopupManager from '../molecules/MoleculeLoginPopupManager';

const PageSignup = () => {
  return (
    <MoleculeLoginPopupManager>
      {(handleLoginClick) => (
        <div>
          <h2>Signup Page</h2>
          <MoleculeSignupForm />
          <OrganismFooterBar onLoginClick={handleLoginClick} />
        </div>
      )}
    </MoleculeLoginPopupManager>
  );
};

export default PageSignup;
