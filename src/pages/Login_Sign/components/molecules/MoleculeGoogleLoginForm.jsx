// src/pages/Login_Sign/components/molecules/MoleculeGoogleLoginForm.jsx

import React from "react";
import { auth, provider } from "../../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import axios from "axios";
import images from "../../assets/styles/Images"; // Images.jsx 임포트
import { useAtom } from "jotai";
import {
  IS_LOGGED_IN,
  LOGIN_SUCCESS,
  USER_NAME,
  USER_EMAIL,
  IS_SOCIAL_LOGGED_IN,
  IS_MARKETING,
  CONVERSATION_ID,
} from "../../../../pages/AtomStates"; // 아톰 임포트

import firebase from "firebase/app";
import "firebase/auth";

import { palette } from "../../../../assets/styles/Palette";

const MoleculeGoogleLoginForm = () => {
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [, setLoginSuccess] = useAtom(LOGIN_SUCCESS);
  const [, setUserName] = useAtom(USER_NAME); // 유저 이름 아톰
  const [, setUserEmail] = useAtom(USER_EMAIL); // 유저 이메일 아톰
  const [, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN); // 소셜 로그인 아톰
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      let response;
      // 'https://wishresearch.kr/google-login'
      // 'https://wishresearch.kr/api/user/login/google/'
      // Firebase 인증 후 사용자 정보를 서버에 저장

      if (isMarketing) {
        response = await axios.post(
          "https://wishresearch.kr/api/user/login/googleLogin_marketing/",
          {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            chatGetId: conversationId,
          },
          { withCredentials: true }
        );
      } else {
        response = await axios.post(
          "https://wishresearch.kr/api/user/login/google/",
          {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          },
          { withCredentials: true }
        );
      }

      const userName = user.displayName;
      const userEmail = user.email;
      const serverAccessToken = response.data.access_token; // 서버에서 받은 토큰
      sessionStorage.setItem("accessToken", serverAccessToken); // 서버 토큰 저장
      sessionStorage.setItem("userName", userName); // 서버 토큰 저장
      sessionStorage.setItem("userEmail", userEmail); // 서버 토큰 저장
      sessionStorage.setItem("isSocialLogin", "true"); // 소셜 로그인 여부 저장

      // 로그인 성공 시 처리
      setIsLoggedIn(true); // 아톰 업데이트
      setUserName(userName); // 유저 이름 업데이트
      setUserEmail(userEmail); // 유저 이메일 업데이트
      setIsSocialLoggedIn(true); // 소셜 로그인 상태를 true로 업데이트
      setLoginSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      navigate('/MeetAiExpert');
    }
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <GoogleLoginForm>
        <LoginButton onClick={handleGoogleLogin}>
          <GoogleIconStyled src={images.GoogleIcon} alt="Google Icon" />
          Google 계정으로 로그인
        </LoginButton>
      </GoogleLoginForm>
    </ThemeProvider>
    </>
  );
};

export default MoleculeGoogleLoginForm;

// CSS-in-JS 스타일링
const GoogleLoginForm = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 52px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top:32px;
  }
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  font-weight: 700;
  color: ${palette.gray};
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid ${palette.lineGray};
  background-color: ${palette.white};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding:10px;
  }
`;

const GoogleIconStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
