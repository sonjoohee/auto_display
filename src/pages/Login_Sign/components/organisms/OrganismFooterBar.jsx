// src/components/organisms/OrganismFooterBar.jsx

import React from 'react';
import styled from 'styled-components';

const OrganismFooterBar = ({ onLoginClick }) => {
  return (
    <FooterBar>
      <FooterButton onClick={onLoginClick}>로그인</FooterButton>
    </FooterBar>
  );
};

export default OrganismFooterBar;

// CSS-in-JS 스타일링
const FooterBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f1f1f1;
  text-align: center;
  padding: 10px 0;
`;

const FooterButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
`;
