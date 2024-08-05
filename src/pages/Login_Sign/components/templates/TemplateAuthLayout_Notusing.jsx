// src/components/templates/TemplateAuthLayout.jsx

import React from 'react';
import OrganismHeader from '../organisms/OrganismHeader';
import OrganismFooter from '../organisms/OrganismFooter';
import styled from 'styled-components';

const TemplateAuthLayout = ({ children }) => (
  <AuthLayoutContainer>
    <OrganismHeader />
    <MainContent>
      {children}
    </MainContent>
    <OrganismFooter />
  </AuthLayoutContainer>
);

export default TemplateAuthLayout;

// CSS-in-JS 스타일링
const AuthLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
