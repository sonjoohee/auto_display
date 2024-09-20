// MoleculeSignupForm.jsx
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AtomInput from '../atoms/AtomInput';
import AtomButton from '../atoms/AtomButton';
import { isValidEmail, isValidPassword } from '../atoms/AtomValidation';
import {
  nameAtom,
  signupEmailAtom,
  signupPasswordAtom,
  confirmPasswordAtom,
  roleAtom,
  statusAtom,
  errorAtom
} from '../../../AtomStates';
import MoleculeSignupPopup from './MoleculeSignupPopup'; // 팝업 컴포넌트 임포트

import { IS_LOGIN_POPUP_OPEN, IS_SIGNUP_POPUP_OPEN } from '../../../AtomStates'; // 팝업 상태 atom 임포트

import { palette } from '../../../../assets/styles/Palette';

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

  // 팝업 상태 atom의 setter 가져오기
  const [, setIsLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN);
  const [, setIsSignupPopupOpen] = useAtom(IS_SIGNUP_POPUP_OPEN);

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
      const response = await fetch('https://wishresearch.kr/api/user/signup/', {
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
        setError(result.email || '회원가입 중 오류가 발생했습니다.');
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
    setIsLoginPopupOpen(false);
    setIsSignupPopupOpen(false);
    setError('')
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    navigate('/');
  };

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <div className="loader"></div>
        </LoadingOverlay>
      )}
      <SignupFormContainer>
        <div>
          <label htmlFor="name">이름<span>*</span></label>
          <StyledAtomInput
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div>
          <label htmlFor="email">이메일<span>*</span></label>
          <StyledAtomInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력해주세요"
          />
        </div>

        <div>
          <label htmlFor="password">비밀번호<span>*</span></label>
          <InputWrap>
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
          </InputWrap>
          <InputWrap>
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
          </InputWrap>
          <p>영문/숫자/특수문자 2가지 이상 혼합. 8~16자</p>
        </div>

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

        <StyledAtomButton onClick={handleSignup} disabled={isLoading || !name || !email || !password || !confirmPassword || !termsAccepted}>
          {isLoading ? "메일을 전송 중입니다..." : "회원가입"}
        </StyledAtomButton>
      </SignupFormContainer>
      {isSignupSuccessful && (
        <MoleculeSignupPopup
          onClose={closePopup}
          email={email}
        />
      )}
    </>
  );
};

export default MoleculeSignupForm;

// CSS-in-JS 스타일링
const SignupFormContainer = styled.div`
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

    p {
      font-size:0.63rem;
      color:${palette.gray};
      text-align:left;
    }

    + div {
      margin-top:20px;
    }
  }
`;

const InputWrap = styled.div`
  position:relative;
`;

const StyledAtomInput = styled.input`
  width: 100%;
  font-family: 'Pretendard', 'Poppins';
  font-size: 0.75rem; /* 12px로 변경 */
  padding: 12px 16px;
  border-radius:8px;
  border: 1px solid ${palette.lineGray};
  box-sizing: border-box;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right:10px;
  bottom: 0;
  transform: translateY(-50%);
  font-family: 'Pretendard', 'Poppins';
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

const TermsAndConditions = styled.div`
  display:flex;
  flex-direction:row !important;
  margin-top: 30px !important;
  gap:8px;
  text-align: left;

  label {
    font-size: 0.875rem !important;
    color: ${palette.gray};
  }

  a {
    color:${palette.blue};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const StyledAtomButton = styled.button`
  width: 100%;
  color:${palette.white};
  font-family: 'Pretendard', 'Poppins';
  font-size: 1rem;
  font-weight: 700;
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  border: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
  background: ${palette.blue};
  cursor: pointer;

  &:disabled {
    background-color: ${palette.lightGray};
    cursor: not-allowed;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .loader {
    border: 12px solid #f3f3f3; /* Light grey */
    border-top: 12px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;