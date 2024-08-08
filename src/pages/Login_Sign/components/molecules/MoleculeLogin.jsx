// src/pages/Login_Sign/components/molecules/MoleculeLogin.jsx

import React from 'react';
import styled from 'styled-components';
import MoleculeGoogleLoginForm from './MoleculeGoogleLoginForm';
import MoleculeLoginForm from './MoleculeLoginForm';

const MoleculeLogin = () => {
  return (
    <LoginContainer>
      <MoleculeGoogleLoginForm />
      <Separator>
        <hr /><span>or</span><hr />
      </Separator>
      <MoleculeLoginForm />
    </LoginContainer>
  );
};

export default MoleculeLogin;

// CSS-in-JS 스타일링
const LoginContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;

  hr {
    flex: 1;
    border: none;
    border-top: 1px solid #ddd;
  }

  span {
    margin: 0 15px;
    color: #bbb;
    font-weight: bold;
  }
`;
