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

import { palette } from '../../../../assets/styles/Palette';

const MoleculeGoogleLoginForm = () => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setLoginSuccess] = useAtom(loginSuccessAtom);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
// 'https://wishresearch.kr/google-login'
// 'https://wishresearch.kr/api/user/login/google/'
      // Firebase 인증 후 사용자 정보를 서버에 저장
      const response = await axios.post('https://wishresearch.kr/api/user/login/google/', {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      }, { withCredentials: true });

      const serverAccessToken = response.data.access_token; // 서버에서 받은 토큰
      sessionStorage.setItem('accessToken', serverAccessToken); // 서버 토큰 저장

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
  margin-top: 52px;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: 'Pretendard', 'Poppins';
  font-size: 1rem;
  font-weight: 700;
  color: ${palette.gray};
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid ${palette.lineGray};
  background-color:${palette.white};
  cursor: pointer;

`;

const GoogleIconStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
