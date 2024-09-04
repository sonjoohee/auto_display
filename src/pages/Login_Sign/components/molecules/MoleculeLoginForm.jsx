// src/pages/Login_Sign/components/molecules/MoleculeLoginForm.jsx

import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AtomButton from '../atoms/AtomButton';
import { isValidEmail } from '../atoms/AtomValidation';
import { emailAtom, passwordAtom, currentUserAtom, errorAtom } from '../../../AtomStates';
import { isLoggedInAtom, loginSuccessAtom } from '../../../../pages/AtomStates'; // 아톰 임포트
import { Link } from 'react-router-dom';
import { palette } from '../../../../assets/styles/Palette';

import MoleculeSignupPopup from './MoleculeSignupPopup';

const MoleculeLoginForm = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [error, setError] = useAtom(errorAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setLoginSuccess] = useAtom(loginSuccessAtom);

  useEffect(() => {
    setError('');
  }, [setError]);

  const validateForm = () => {
    if (!email || !password) {
      setError('모든 필드를 입력해주세요.');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError('');
    if (!validateForm()) return;
  
    try {
      const response = await fetch('https://wishresearch.kr/api/user/login/normal/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const result = await response.json();
  
        sessionStorage.setItem('accessToken', result.access_token);
  
        setCurrentUser(result.user);
        setIsLoggedIn(true);
        setLoginSuccess(true);
        navigate('/');
      } else {
        // 서버에서 받은 에러 메시지 처리
        const result = await response.json();
        setError(result.message || '로그인 중 오류가 발생했습니다.'); // 서버 메시지 표시
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordReset = (event) => {
    // event.preventDefault(); // 기본 동작 방지
    navigate('/request-reset-password');
  };

  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);

  const handleSignupClick = (e) => {
    e.preventDefault();
    setIsSignupPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsSignupPopupOpen(false);
  };

  

  return (
    <LoginFormContainer>
      <div>
        <label htmlFor="email">아이디<span>*</span></label>
        <StyledAtomInput
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소를 입력해주세요"
        />
      </div>

      <div>
        <label htmlFor="password">비밀번호<span>*</span></label>
        <StyledAtomInput
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
        />
        <TogglePasswordButton onClick={togglePasswordVisibility}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </TogglePasswordButton>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <PasswordResetLink>
        <a onClick={handlePasswordReset}>비밀번호 찾기</a>
      </PasswordResetLink>

      <StyledLoginButton onClick={handleLogin}>로그인</StyledLoginButton>

      <JoinWrap>
        <p>InterviewX가 처음이에요</p>
        <Link to="/signup">가입하기</Link>
        {/* <Link to="#" onClick={handleSignupClick}>가입하기</Link> */}
        {isSignupPopupOpen && <MoleculeSignupPopup onClose={handleClosePopup} />}
      </JoinWrap>
    </LoginFormContainer>
  );
};

export default MoleculeLoginForm;

// CSS-in-JS 스타일링
const LoginFormContainer = styled.div`
  width: 100%;

  > div {
    position:relative;
    display:flex;
    flex-direction:column;
    gap:8px;

    label {
      font-size:0.75rem;
      text-align:left;
      display:flex;
      align-items:flex-start;
      gap:5px;

      span {
        color:${palette.red};
      }
    }

    + div {
      margin-top:20px;
    }
  }
`;

const StyledAtomInput = styled.input`
  width: 100%;
  font-family: 'Pretendard', 'Poppins';
  font-size:1rem;
  padding: 12px 16px;
  border-radius:8px;
  border: 1px solid ${palette.lineGray};
  box-sizing: border-box;

  &::placeholder {
    font-size:0.875rem;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right:10px;
  bottom: 0;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #888;

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  font-size:0.75rem;
  color:${palette.red};
  margin-top: 20px;
  text-align: center;
`;

const PasswordResetLink = styled.div`
  margin: 20px auto 30px;
  text-align: right;
  cursor:pointer;

  a {
    color:${palette.gray};
    font-size:0.75rem;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const StyledLoginButton = styled.button`
  width: 100%;
  font-family: 'Pretendard';
  color:${palette.white};
  padding: 15px;
  border-radius: 8px;
  border: none;
  background-color:${palette.blue};
  font-size: 16px;
  cursor: pointer;
`;

const JoinWrap = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:row !important;
  gap:12px;
  font-size:1rem;
  color:${palette.gray};
  margin-top:80px;

  a {
    color:${palette.blue};
    text-decoration:underline;
  }
`;
