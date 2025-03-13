// MoleculeSignupForm.jsx
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate, Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AtomInput from "../atoms/AtomInput";
import AtomButton from "../atoms/AtomButton";
import { FormBox, CustomInput } from "../../../../assets/styles/InputStyle";
import { isValidEmail, isValidPassword } from "../atoms/AtomValidation";
import axios from "axios";
import {
  SIGN_UP_NAME,
  SIGN_UP_EMAIL,
  SIGN_UP_PASSWORD,
  CONFIRM_PASSWORD,
  SIGN_UP_ROLE,
  SIGN_UP_STATUS,
  ERROR_STATUS,
  SUCCESS_STATUS,
  CONVERSATION_ID,
} from "../../../AtomStates";
import MoleculeSignupPopup from "./MoleculeSignupPopup"; // 팝업 컴포넌트 임포트

import {
  IS_LOGIN_POPUP_OPEN,
  IS_SIGNUP_POPUP_OPEN,
  IS_MARKETING,
} from "../../../AtomStates"; // 팝업 상태 atom 임포트
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { Body3, Helptext } from "../../../../assets/styles/Typography";
import MoleculeLoginPopup from "./MoleculeLoginPopup";

const MoleculeSignupForm = () => {
  const [signUpName, setSignUpName] = useAtom(SIGN_UP_NAME);
  const [signUpEmail, setSignUpEmail] = useAtom(SIGN_UP_EMAIL);
  const [signUpPassword, setSignUpPassword] = useAtom(SIGN_UP_PASSWORD);
  const [confirmPassword, setConfirmPassword] = useAtom(CONFIRM_PASSWORD);
  const [signUpRole, setSignUpRole] = useAtom(SIGN_UP_ROLE);
  const [signUpStatus, setSignUpStatus] = useAtom(SIGN_UP_STATUS);
  const [errorStatus, setErrorStatus] = useAtom(ERROR_STATUS);
  const [successStatus, setSuccessStatus] = useAtom(SUCCESS_STATUS);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignupSuccessful, setSignupSuccessful] = useState(false); // 회원가입 성공 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const navigate = useNavigate();

  // 팝업 상태 atom의 setter 가져오기
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN);
  const [isSignupPopupOpen, setIsSignupPopupOpen] =
    useAtom(IS_SIGNUP_POPUP_OPEN);

  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태 추가
  const [EmailError, setEmailError] = useState("");

  useEffect(() => {
    setErrorStatus("");
  }, [setErrorStatus]);

  const validateForm = () => {
    if (!signUpName || !signUpEmail || !signUpPassword || !confirmPassword) {
      setErrorStatus("모든 필드를 입력해주세요.");
      return false;
    }
    if (!isValidEmail(signUpEmail)) {
      setErrorStatus("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
    if (!isValidPassword(signUpPassword)) {
      setErrorStatus(
        "비밀번호는 8-16자 길이여야 하며, 문자, 숫자, 특수문자 중 최소 두 가지를 포함해야 합니다."
      );
      return false;
    }
    if (signUpPassword !== confirmPassword) {
      setErrorStatus("비밀번호가 일치하지 않습니다.");
      return false;
    }
    if (!termsAccepted) {
      setErrorStatus("이용약관에 동의해야 합니다.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    let response;
    e.preventDefault();
    setErrorStatus("");
    if (!validateForm()) return;

    setIsLoading(true); // 로딩 상태 시작

    try {
      if (isMarketing) {
        response = await fetch(
          "https://wishresearch.kr/api/user/signup_marketing/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: signUpName,
              email: signUpEmail,
              password: signUpPassword,
              chatGetId: conversationId,
            }),
          }
        );
      } else {
        response = await fetch("https://wishresearch.kr/api/user/signup/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: signUpName,
            email: signUpEmail,
            password: signUpPassword,
            phone_number: phoneNumber,
            role: signUpRole,
            status: signUpStatus,
          }),
        });
      }

      if (response.ok) {
        setSignupSuccessful(true); // 회원가입 성공 상태 설정
        setSignUpName("");
        // setSignUpEmail('');
        setSignUpPassword("");
        setConfirmPassword("");
        setSignUpRole("user");
        setSignUpStatus("inactive");
      } else {
        const result = await response.json();
        if (result.email[0] === "user의 email은/는 이미 존재합니다.") {
          setErrorStatus("이미 사용 중인 이메일 주소입니다.");
        } else {
          setErrorStatus(result.email || "회원가입 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      setErrorStatus("서버와의 통신 중 오류가 발생했습니다.");
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
    setErrorStatus("");
    setSignUpName("");
    setSignUpEmail("");
    setSignUpPassword("");
    setConfirmPassword("");
    navigate("/");
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // 숫자만 허용 및 첫 세 자리가 010인지 확인
    if (value === "" || /^\d+$/.test(value)) {
      if (
        value.length <= 11 &&
        (value.length < 3 || value.slice(0, 3) === "010")
      ) {
        setPhoneNumber(value);
        setPhoneError("");
      } else {
        setPhoneError("연락처는 010으로 시작해야 하며, 최대 11자리입니다.");
      }
    } else {
      setPhoneError("숫자만 입력 가능합니다.");
    }
  };

  const validateEmail = (email) => {
    if (!isValidEmail(email)) {
      setErrorStatus("유효한 이메일 주소를 입력해주세요.");
      setIsEmailValid(false);
      return;
    }

    // 상용 이메일 체크 로직 추가
    const commonEmailDomains = [
      "gmail.com",
      "naver.com",
      "daum.net",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
    ]; // 상용 이메일 도메인 예시
    const emailDomain = email.split("@")[1];
    if (commonEmailDomains.includes(emailDomain)) {
      setErrorStatus("상용 이메일은 사용할 수 없습니다.");
      setIsEmailValid(false);
      return;
    }

    setIsEmailValid(true);
    setErrorStatus("");
  };

  const handleEmailCheck = async () => {
    validateEmail(signUpEmail);
    try {
      const response = await axios.post(
        "https://wishresearch.kr/api/user/checkEmail/",
        { email: signUpEmail }
      );
      if (response.data.exists) {
        setErrorStatus("이미 사용 중인 이메일 주소입니다.");
      } else {
        setSuccessStatus("사용 가능한 이메일 주소입니다.");
      }
    } catch (error) {
      setErrorStatus("중복 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {isLoading && (
          <LoadingOverlay>
            <div className="loader"></div>
          </LoadingOverlay>
        )}
        <SignupFormContainer>
          <ScrollWrap>
            <div>
              <label htmlFor="signUpEmail">
                이메일<span>*</span>
              </label>
              <div class="input-wrap">
                <div>
                  <CustomInput
                    Small
                    id="email"
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => {
                      setSignUpEmail(e.target.value);
                      validateEmail(e.target.value); // 실시간 이메일 검증 호출
                    }}
                    placeholder="이메일 주소를 입력해주세요"
                  />
                  <Button
                    ExLarge
                    Outline
                    Fill
                    onClick={handleEmailCheck}
                    disabled={!isEmailValid}
                  >
                    중복확인
                  </Button>
                </div>
                <Helptext color="gray600" align="left">
                  공용 도메인(기업, 학교, 기관) 이메일만 사용 가능하며, 상용
                  이메일(gmail, naver, daum 등)은 사용할 수 없습니다.
                </Helptext>
                {errorStatus && (
                  <ErrorMessage style={{ color: "red" }}>
                    {errorStatus}
                  </ErrorMessage>
                )}
                {successStatus && (
                  <SuccessMessage>{successStatus}</SuccessMessage>
                )}
              </div>

              <SignInfo>
                <img src={images.ExclamationCircle} alt="info" />
                <Body3 color="gray500">
                  사내 메일 인증이 불가능한 경우나 기업 메일이 없는 사업장 및
                  기관은 1:1 문의를 통해 가입 문의해 주세요.
                </Body3>
              </SignInfo>

              {/* <StyledAtomInput
                id="email"
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder="이메일 주소를 입력해주세요"
              /> */}
            </div>

            <div>
              <label htmlFor="signUpPassword">
                비밀번호<span>*</span>
              </label>
              <InputWrap>
                <CustomInput
                  Small
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={signUpPassword}
                  onChange={(e) => {
                    setSignUpPassword(e.target.value);
                    if (!isValidPassword(e.target.value)) {
                      setEmailError(
                        "비밀번호는 8-16자 길이여야 하며, 문자, 숫자, 특수문자 중 최소 두 가지를 포함해야 합니다."
                      ); // Use EmailError for password validation
                    } else {
                      setEmailError(""); // Clear error if valid
                    }
                  }}
                  placeholder="비밀번호를 입력해주세요"
                />

                {/* <StyledAtomInput
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="비밀번호를 입력해주세요"
                /> */}
                <TogglePasswordButton onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </TogglePasswordButton>
              </InputWrap>
              <InputWrap>
                <CustomInput
                  Small
                  id="password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    // 비밀번호 일치 여부 확인
                    if (e.target.value !== signUpPassword) {
                      setEmailError("비밀번호가 일치하지 않습니다."); // 에러 메시지 설정
                    } else {
                      setEmailError(""); // 에러 메시지 초기화
                    }
                  }}
                  placeholder="비밀번호를 다시 입력해 주세요"
                />

                {/* <StyledAtomInput
                  type={showConfirmPassword ? "text" : "password"}
                  id="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호 다시 입력해주세요"
                /> */}
                <TogglePasswordButton onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </TogglePasswordButton>
              </InputWrap>
              <Helptext color="gray600" align="left">
                영문/숫자/특수문자 2가지 이상 혼합. 8~16자
              </Helptext>
              {EmailError && (
                <ErrorMessage style={{ color: "red" }}>
                  {EmailError}
                </ErrorMessage>
              )}{" "}
              {/* Display EmailError */}
            </div>

            <div>
              <label htmlFor="signUpName">
                이름<span>*</span>
              </label>
              <CustomInput
                Small
                id="signUpName"
                type="text"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                placeholder="이름을 입력해주세요"
              />

              {/* <StyledAtomInput
                id="signUpName"
                type="text"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                placeholder="이름을 입력해주세요"
              /> */}
            </div>

            <div>
              <label htmlFor="phoneNumber">
                연락처<span>*</span>
              </label>
              <CustomInput
                Small
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="숫자만 입력해 주세요"
                maxLength={11}
              />
              {phoneError && (
                <ErrorMessage style={{ color: "red" }}>
                  {phoneError}
                </ErrorMessage>
              )}
            </div>
          </ScrollWrap>

          {/* {errorStatus && <ErrorMessage style={{ color: 'red' }}>{errorStatus}</ErrorMessage>} */}

          <TermsAndConditions>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms">
              서비스{" "}
              <a href="/Terms" target="_blank">
                이용약관
              </a>
              과{" "}
              <a href="/Policy" target="_blank">
                개인정보처리방침
              </a>
              에 동의합니다.
            </label>
          </TermsAndConditions>

          <StyledAtomButton
            onClick={handleSignup}
            disabled={
              isLoading ||
              !signUpName ||
              !signUpEmail ||
              !signUpPassword ||
              !confirmPassword ||
              !phoneNumber ||
              !termsAccepted
            }
          >
            {isLoading ? "메일을 전송 중입니다..." : "회원가입"}
          </StyledAtomButton>

          <JoinWrap>
            <p>이미 가입하셨나요?</p>
            {/* <Link to="#" onClick={() => {
              setIsSignupPopupOpen(false);
              setIsLoginPopupOpen(true);
            }}> */}
            <Link to="/login">로그인하기</Link>
          </JoinWrap>
        </SignupFormContainer>
        {isSignupSuccessful && (
          <MoleculeSignupPopup onClose={closePopup} signUpEmail={signUpEmail} />
        )}
      </ThemeProvider>
    </>
  );
};

export default MoleculeSignupForm;

// CSS-in-JS 스타일링
const SignupFormContainer = styled.div`
  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    // gap:8px;

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

    p {
      font-size: 0.63rem;
      color: ${palette.gray};
      text-align: left;
    }

    + div {
      margin-top: 20px;
    }

    .input-wrap {
      display: flex;
      flex-direction: column;
      gap: 8px;

      div {
        display: flex;
        flex-direction: row;
        gap: 8px;

        button {
          flex-shrink: 0;
        }
      }
    }
  }
`;

const SignInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: ${palette.chatGray};

  p {
    font-size: 1rem !important;
    color: ${palette.gray500} !important;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const ScrollWrap = styled.div`
  gap: 32px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const InputWrap = styled.div`
  position: relative;
`;

const StyledAtomInput = styled.input`
  width: 100%;
  font-family: "Pretendard", "Poppins";
  font-size: 0.75rem;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${palette.lineGray};
  box-sizing: border-box;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 0;
  transform: translateY(-50%);
  font-family: "Pretendard", "Poppins";
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
  font-size: 0.75rem;
  color: ${palette.red};
  margin-top: 20px;
  text-align: center;
`;

const SuccessMessage = styled.p`
  font-size: 0.75rem;
  color: ${palette.green};
  margin-top: 20px;
  text-align: center;
`;

const TermsAndConditions = styled.div`
  display: flex;
  flex-direction: row !important;
  margin-top: 30px !important;
  gap: 8px;
  text-align: left;
  align-items: flex-start;

  label {
    font-size: 0.875rem !important;
    color: ${palette.gray};
    flex-wrap: wrap;
  }

  a {
    color: ${palette.blue};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const StyledAtomButton = styled.button`
  width: 100%;
  color: ${palette.white};
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  font-weight: 600;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.88rem;
    font-weight: 500;
    padding: 10px;
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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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
    font-weight: 400;
  }

  p {
    font-size: 1rem !important;
    font-weight: 400;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 20px;
    font-size: 0.88rem;
  }
`;
