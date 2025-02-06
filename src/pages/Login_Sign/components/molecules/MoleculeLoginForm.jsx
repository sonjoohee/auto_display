// src/pages/Login_Sign/components/molecules/MoleculeLoginForm.jsx

import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AtomButton from "../atoms/AtomButton";
import { isValidEmail } from "../atoms/AtomValidation";
import { UserCreditInfo } from "../../../../utils/indexedDB";

import images from "../../../../assets/styles/Images";
import {
  SIGN_UP_NAME,
  EMAIL,
  SIGN_UP_EMAIL,
  SIGN_UP_PASSWORD,
  CONFIRM_PASSWORD,
  ERROR_STATUS,
} from "../../../AtomStates";
import {
  IS_LOGGED_IN,
  LOGIN_SUCCESS,
  USER_NAME,
  USER_EMAIL,
  IS_LOGIN_POPUP_OPEN,
  IS_MARKETING,
  CONVERSATION_ID,
  USER_MEMBERSHIP,
  IS_SIGNUP_POPUP_OPEN,
  USER_CREDITS,
} from "../../../../pages/AtomStates"; // 아톰 임포트
import { Link } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";

import MoleculeSignPopup from "./MoleculeSignPopup";
import MoleculeResetPasswordPopup from "./MoleculeResetPasswordPopup";

const MoleculeLoginForm = ({ onClosePopup }) => {
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [signUpName, setSignUpName] = useAtom(SIGN_UP_NAME);
  const [email, setEmail] = useAtom(EMAIL);
  const [userMembership, setUserMembership] = useAtom(USER_MEMBERSHIP);
  const [, setSignupEmail] = useAtom(SIGN_UP_EMAIL);
  const [password, setPassword] = useState("");
  const [, setSignupPassword] = useAtom(SIGN_UP_PASSWORD);
  const [confirmPassword, setConfirmPassword] = useAtom(CONFIRM_PASSWORD);
  const [errorStatus, setErrorStatus] = useAtom(ERROR_STATUS);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [, setLoginSuccess] = useAtom(LOGIN_SUCCESS);
  const [, setUserName] = useAtom(USER_NAME); // 유저 이름 아톰
  const [, setUserEmail] = useAtom(USER_EMAIL); // 유저 이메일 아톰
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN);
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);

  useEffect(() => {
    setErrorStatus("");
  }, [setErrorStatus]);

  const validateForm = () => {
    if (!email || !password) {
      setErrorStatus("모든 필드를 입력해주세요.");
      return false;
    }
    if (!isValidEmail(email)) {
      setErrorStatus("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
    return true;
  };

  const isIOSDevice = () => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAppleDevice = navigator.userAgent.includes("Macintosh");
    const isTouchScreen = navigator.maxTouchPoints >= 1; // iOS 13 이상 체크

    return isIOS || (isAppleDevice && isTouchScreen);
  };

  // 모바일 감지 함수 추가
  const isMobileDevice = () => {
    if (isIOSDevice()) {
      return true;
    }
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };

  // const handleMobileWarningConfirm = () => {
  //   setShowMobileWarning(false);
  // };

  const handleExitCancel = () => {
    setIsExitPopupOpen(false);
  };

  const handleLogin = async () => {
    setErrorStatus("");
    if (!validateForm()) return;

    try {
      let response;

      // 로그인 요청
      if (isMarketing) {
        response = await fetch(
          "https://wishresearch.kr/api/user/defaultLogin_marketing/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
              chatGetId: conversationId,
            }),
          }
        );
      } else {
        response = await fetch(
          "https://wishresearch.kr/api/user/login/normal/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );
      }

      if (response.ok) {
        const result = await response.json();
        const accessToken = result.access_token;
        sessionStorage.setItem("accessToken", accessToken);

        const userInfoResponse = await fetch(
          "https://wishresearch.kr/api/user/userInfo/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          // console.log("🚀 ~ handleLogin ~ userInfo:", userInfo);

          // 유저 정보 저장
          setUserName(userInfo.name);
          setUserEmail(userInfo.email);
          setUserMembership(userInfo.membership);
          sessionStorage.setItem("userName", userInfo.name);
          sessionStorage.setItem("userEmail", userInfo.email);
          sessionStorage.setItem("userMembership", userInfo.membership);
          const accessToken = sessionStorage.getItem("accessToken");
          if (accessToken) {
            const userCreditValue = await UserCreditInfo(true);
    
            // 전역 상태의 크레딧 정보 업데이트
            setUserCredits(userCreditValue);
          }
          setIsLoggedIn(true);

          // 모바일 기기 체크 후 처리 수정
          if (isMobileDevice()) {
            setShowMobileWarning(true); // 모바일 경고창 표시
            setLoginSuccess(false); // 로그인 성공 상태를 false로 유지
          } else {
            setLoginSuccess(true); // PC에서는 바로 로그인 성공 처리
            navigate("/");
          }
        } else {
          setErrorStatus("유저 정보를 불러오는 중 오류가 발생했습니다.");
        }
      } else {
        const result = await response.json();
        setErrorStatus(result.message || "로그인 중 오류가 발생했습니다.");
      }
    } catch (error) {
      setErrorStatus("로그인 중 오류가 발생했습니다.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordReset = (event) => {
    // event.preventDefault(); // 기본 동작 방지
    navigate("/request-reset-password");
  };

  const handleMobileWarningConfirm = () => {
    setShowMobileWarning(false);
    setLoginSuccess(true); // 확인 버튼 클릭 시 로그인 성공 처리
    navigate("/");
  };

  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);

  const handleSignupClick = (e) => {
    e.preventDefault();
    setIsSignupPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsSignupPopupOpen(false);
  };

  const [isSignPopupOpen, setIsSignPopupOpen] = useAtom(IS_SIGNUP_POPUP_OPEN); // 회원가입 팝업 상태 관리
  const handleSignClick = () => {
    setIsSignPopupOpen(true); // 회원가입 팝업 열기
    setIsLoginPopupOpen(false);
    onClosePopup();
  };
  const closeSignPopup = () => {
    setIsSignPopupOpen(false); // 회원가입 팝업 닫기
    setErrorStatus("");
    setSignUpName("");
    setEmail("");
    setSignupEmail("");
    setPassword("");
    setSignupPassword("");
    setConfirmPassword("");
  };

  const [isPasswordRestPopupOpen, setIsPasswordRestPopupOpen] = useState(false); // 비밀번호 리셋 팝업 상태 관리
  const handlePasswordRestClick = () => {
    setIsPasswordRestPopupOpen(true); // 비밀번호 리셋 팝업 열기
  };
  const closePasswordRestPopup = () => {
    setIsPasswordRestPopupOpen(false); // 비밀번호 리셋 팝업 닫기
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* 팝업이 열리면 로그인 폼은 숨기고 팝업만 표시 */}
        {isSignPopupOpen || isPasswordRestPopupOpen ? null : (
          <LoginFormContainer>
            <div>
              <label htmlFor="email">
                아이디<span>*</span>
              </label>
              <StyledAtomInput
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력해주세요"
              />
            </div>

            <div>
              <label htmlFor="password">
                비밀번호<span>*</span>
              </label>
              <StyledAtomInput
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                onKeyDown={handleKeyPress}
              />
              <TogglePasswordButton onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </TogglePasswordButton>
            </div>

            <PasswordResetLink>
              <a onClick={handlePasswordRestClick}>비밀번호 찾기</a>
            </PasswordResetLink>

            <StyledLoginButton
              onClick={handleLogin}
              disabled={!email || !password}
            >
              로그인
            </StyledLoginButton>

            {errorStatus && <ErrorMessage>{errorStatus}</ErrorMessage>}

            <JoinWrap>
              <p>InterviewX가 처음이에요</p>
              <Link to="#" onClick={handleSignClick}>
                가입하기
              </Link>
            </JoinWrap>
          </LoginFormContainer>
        )}
        {/* 비밀번호 재설정 팝업 */}
        {isPasswordRestPopupOpen && (
          <MoleculeResetPasswordPopup onClose={closePasswordRestPopup} />
        )}{" "}
        {/* 모바일 경고 팝업 */}
        {showMobileWarning && (
          <Popup Cancel>
            <div>
              <button
                type="button"
                className="closePopup"
                onClick={handleExitCancel}
              >
                닫기
              </button>
              <span>
                <img src={images.ExclamationMark} alt="" />
              </span>
              <p>
                <strong>본 서비스는 웹 전용으로 운영되고 있습니다.</strong>
                <span>웹에서 최적의 작업을 진행하세요</span>
              </p>
              <div className="btnWrap">
                <button type="button" onClick={handleMobileWarningConfirm}>
                  확인
                </button>
              </div>
            </div>
          </Popup>
        )}
      </ThemeProvider>
    </>
  );
};
export default MoleculeLoginForm;

// CSS-in-JS 스타일링
const LoginFormContainer = styled.div`
  width: 100%;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 0.75rem;
      text-align: left;
      display: flex;
      align-items: flex-start;
      gap: 5px;

      span {
        color: ${palette.red};
      }
    }

    + div {
      margin-top: 20px;
    }
  }
`;

const StyledAtomInput = styled.input`
  width: 100%;
  font-family: "Pretendard", "Poppins", sans-serif;
  // font-size: 1rem;
  font-size: 0.75rem;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${palette.lineGray};
  box-sizing: border-box;

  &::placeholder {
    font-size: 0.75rem;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 0;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-family: "Pretendard", "Poppins";
  color: #888;

  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  font-size: 0.75rem;
  color: ${palette.red};
  margin-top: 20px;
  text-align: center;
`;

const PasswordResetLink = styled.div`
  margin: 20px auto 30px;
  text-align: right;
  cursor: pointer;

  a {
    color: ${palette.gray};
    font-size: 0.75rem;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const StyledLoginButton = styled.button`
  width: 100%;
  font-family: "Pretendard", "Poppins";
  color: ${palette.white};
  padding: 15px;
  border-radius: 8px;
  border: none;
  background-color: ${palette.primary};
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background: #d6d6d6;
    pointer-events: none;
  }
`;

const JoinWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row !important;
  gap: 12px;
  font-size: 1rem;
  color: ${palette.gray};
  margin-top: 50px;

  a {
    color: ${palette.blue};
    text-decoration: underline;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 20px;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 9px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.gray500};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

    p {
      font-family: "Pretendard", "Poppins";
      font-size: 0.875rem;
      font-weight: 500;
      margin: 20px auto 24px;
      strong {
        font-weight: 500;
        display: block;
      }

      span {
        font-size: 0.75rem !important;
        font-weight: 400;
        color: #8c8c8c;
        display: block;
        margin-top: 8px;
      }
    }

    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 12px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        // &:last-child {
        //   color: ${palette.white};
        //   background: ${palette.blue};
        // }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 600;
            display: block;
            color: ${palette.gray800};
          }
          span {
            font-size: 1rem;
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            color: ${palette.gray700};
            font-weight: 400;
            padding: 0;
            border: 0;
            background: none;
          }
        }
      `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > div {
      width: 90%;
    }
  }
`;
