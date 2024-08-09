// MoleculeSignupForm.jsx
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AtomInput from '../atoms/AtomInput';
import AtomButton from '../atoms/AtomButton';
import { isValidEmail, isValidPassword } from '../atoms/AtomValidation';
import { nameAtom, signupEmailAtom, signupPasswordAtom, confirmPasswordAtom, roleAtom, statusAtom, errorAtom } from '../../../AtomStates';
import MoleculeSignupPopup from './MoleculeSignupPopup'; // 팝업 컴포넌트 임포트

const MoleculeSignupForm = () => {
  const [name, setName] = useAtom(nameAtom);
  const [email, setEmail] = useAtom(signupEmailAtom);
  const [password, setPassword] = useAtom(signupPasswordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);
  const [role, setRole] = useAtom(roleAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [error, setError] = useAtom(errorAtom);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignupSuccessful, setSignupSuccessful] = useState(false); // 회원가입 성공 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, [setError]);

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return false;
    }
    if (!isValidPassword(password)) {
      setError('비밀번호는 8-16자 길이여야 하며, 문자, 숫자, 특수문자 중 최소 두 가지를 포함해야 합니다.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (!termsAccepted) {
      setError('이용약관에 동의해야 합니다.');
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;

    setIsLoading(true); // 로딩 상태 시작

    try {
      const response = await fetch('http://localhost:4008/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, status })
      });
      if (response.ok) {
        setSignupSuccessful(true); // 회원가입 성공 상태 설정
        setName('');
        // setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('user');
        setStatus('inactive');
      } else {
        const result = await response.json();
        setError(result.error || '회원가입 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('서버와의 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const closePopup = () => {
    setSignupSuccessful(false);
    navigate('/login');
  };

  return (
    <SignupFormContainer>
      <Header>회원가입</Header>
      <Label htmlFor="name">이름</Label>
      <AtomInput
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력해주세요"
      />
      <Label htmlFor="email">이메일</Label>
      <AtomInput
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 주소를 입력해주세요"
      />
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
      <InputContainer style={{ marginTop: '-10px' }}>
        <StyledAtomInput
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호 확인을 입력해주세요"
        />
        <TogglePasswordButton onClick={toggleConfirmPasswordVisibility}>
          {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
        </TogglePasswordButton>
      </InputContainer>
      <PasswordHint>
        영문/숫자/특수문자 2가지 이상 혼합, 8~16자
      </PasswordHint>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <TermsAndConditions>
        <input
          type="checkbox"
          id="terms"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <label htmlFor="terms">서비스 <a href="#">이용약관</a>과 <a href="#">개인정보처리방침</a>에 동의합니다.</label>
      </TermsAndConditions>
      <StyledAtomButton onClick={handleSignup} disabled={isLoading}>
        {isLoading ? "메일을 전송 중입니다..." : "회원가입"}
      </StyledAtomButton>
      <Footer>
        이미 가입하셨나요? <a href="/login">로그인하기</a>
      </Footer>

      {isSignupSuccessful && (
        <MoleculeSignupPopup 
          onClose={closePopup} 
          email={email}
        />
      )}
    </SignupFormContainer>
  );
};

export default MoleculeSignupForm;

// CSS-in-JS 스타일링
const SignupFormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
  align-self: flex-start;
  text-align: left; /* 왼쪽 정렬 추가 */
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 5px;
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

const PasswordHint = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: -10px;
  margin-bottom: 20px;
  text-align: left;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 10px 0;
  text-align: center;
`;

const TermsAndConditions = styled.div`
  margin-top: 20px;
  text-align: left;
  font-size: 12px;
  color: #666;

  input {
    margin-right: 8px;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const StyledAtomButton = styled(AtomButton)`
  margin-top: 20px;
  width: 100%;
  padding: 15px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #135cbf;
    transform: scale(1.05);
  }

  &:active {
    background-color: #0d47a1;
    transform: scale(1);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Footer = styled.div`
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
