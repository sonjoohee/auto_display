// src/pages/Login_Sign/components/molecules/MoleculeLoginForm.jsx

import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AtomInput from '../atoms/AtomInput';
import AtomButton from '../atoms/AtomButton';
import { isValidEmail } from '../atoms/AtomValidation';
import { emailAtom, passwordAtom, currentUserAtom, errorAtom } from '../../../AtomStates';

const MoleculeLoginForm = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [error, setError] = useAtom(errorAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const result = await response.json();
        setCurrentUser(result.user);
        navigate('/success');
      } else {
        const result = await response.json();
        setError(result.error);
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordReset = () => {
    navigate('/reset-password');
  };

  return (
    <LoginFormContainer>
      <Label htmlFor="email">아이디</Label>
      <InputContainer>
        <StyledAtomInput
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소를 입력해주세요"
        />
      </InputContainer>
      <Label htmlFor="password">비밀번호</Label>
      <InputContainer>
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
      </InputContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonContainer>
        <StyledLoginButton onClick={handleLogin}>로그인</StyledLoginButton>
      </ButtonContainer>
      <PasswordResetLink>
        <a href="#" onClick={handlePasswordReset}>비밀번호 찾기</a>
      </PasswordResetLink>
    </LoginFormContainer>
  );
};

export default MoleculeLoginForm;

// CSS-in-JS 스타일링
const LoginFormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  text-align: left;
  color: #333; // 라벨 텍스트 색상을 명확하게 설정
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const StyledAtomInput = styled(AtomInput)`
  width: 100%;
  padding: 10px;
  padding-right: 40px; /* Add padding to accommodate the eye icon */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
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

const StyledLoginButton = styled(AtomButton)`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 5px;
  background-color: #4285F4;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #357ae8;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const PasswordResetLink = styled.div`
  margin-top: 10px;
  text-align: right;

  a {
    color: #007bff;
    text-decoration: none;
    font-size: 14px;
  }

  a:hover {
    text-decoration: underline;
  }
`;
