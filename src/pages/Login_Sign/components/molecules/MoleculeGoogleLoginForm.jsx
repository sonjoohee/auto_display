// src/pages/Login_Sign/components/molecules/MoleculeGoogleLoginForm.jsx

import React from 'react';
import { auth, provider } from '../../../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import images from '../../assets/styles/Images'; // Images.jsx 임포트
import { useAtom } from 'jotai';
import { isLoggedInAtom, loginSuccessAtom } from '../../../../pages/AtomStates'; // 아톰 임포트

const MoleculeGoogleLoginForm = () => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setLoginSuccess] = useAtom(loginSuccessAtom);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Firebase 인증 후 사용자 정보를 서버에 저장
      await axios.post('http://localhost:4008/google-login', {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      }, { withCredentials: true });

      // 로그인 성공 시 처리
      setIsLoggedIn(true); // 아톰 업데이트
      setLoginSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleLoginForm>
      <LoginButton onClick={handleGoogleLogin}>
        <GoogleIconStyled src={images.GoogleIcon} alt="Google Icon" />
        Google 계정으로 로그인
      </LoginButton>
    </GoogleLoginForm>
  );
};

export default MoleculeGoogleLoginForm;

// CSS-in-JS 스타일링
const GoogleLoginForm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: white;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  max-width: 300px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f7f7f7;
  }
`;

const GoogleIconStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
