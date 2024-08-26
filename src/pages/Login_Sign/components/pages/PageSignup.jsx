// src/components/pages/PageSignup.jsx

import React from 'react';
import styled from 'styled-components';
import MoleculeSignupForm from '../molecules/MoleculeSignupForm';
import OrganismFooterBar from '../organisms/OrganismFooterBar';
import MoleculeLoginPopupManager from '../molecules/MoleculeLoginPopupManager';
// AI_Panel페이지의 헤더 가져옴-나중에 전역으로 뺄수도 있음
import OrganismHeader from '../../../../pages/AI_Panel/components/organisms/OrganismHeader';

import { palette } from '../../../../assets/styles/Palette';

const PageSignup = () => {
  return (
    <>
    <OrganismHeader />
    
    <MoleculeLoginPopupManager>
      {(handleLoginClick) => (
        <SignupPageContainer>
          <SignupHeader>
            Crowd Insight 회원가입
            <p>지금 바로 가입하고 수천명의 AI 패널을 만나보세요</p>
          </SignupHeader>

          <MoleculeSignupForm />

          <OrganismFooterBar onLoginClick={handleLoginClick} />
          <FooterText>
            {/* 이미 가입하셨나요? <a href="/login">로그인하기</a> */}
          </FooterText>
        </SignupPageContainer>
      )}
    </MoleculeLoginPopupManager>
    </>
  );
};

export default PageSignup;

// CSS-in-JS 스타일링
const SignupPageContainer = styled.div`
  position:relative;
  max-width:400px;
  width:100%;
  margin:220px auto 0;
`;

const SignupHeader = styled.h2`
  display:flex;
  flex-direction:column;
  gap:8px;
  font-size: 2rem;
  margin: 110px auto;
  text-align: center;

  p {
    font-size:1rem;
    font-weight:300;
    color:${palette.gray};
  }
`;

const FooterText = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #333;
  text-align: center;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;
