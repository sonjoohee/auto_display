// MoleculeSignupForm.jsx
import React, { useEffect, useState, useRef } from "react";
import { useAtom } from "jotai";
import { useNavigate, Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CustomInput } from "../../../../assets/styles/InputStyle";
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
  IS_LOGIN_POPUP_OPEN,
  IS_SIGNUP_POPUP_OPEN,
  PROJECT_EDUCATION_CODE,
} from "../../../AtomStates";
import MoleculeSignupPopup from "./MoleculeSignupPopup";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { Body3, Helptext, Body4 } from "../../../../assets/styles/Typography";

const MoleculeSignupEducationForm = () => {
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
  const [isSignupSuccessful, setSignupSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectEducationCode, setProjectEducationCode] = useAtom(
    PROJECT_EDUCATION_CODE
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isCommercialEmail, setIsCommercialEmail] = useState(false);
  const [codeChars, setCodeChars] = useState(["", "", "", "", ""]);
  const [educationAuthCode, setEducationAuthCode] = useState("");
  const [educationCodeError, setEducationCodeError] = useState("");

  const navigate = useNavigate();

  // 팝업 상태 atom의 setter 가져오기
  const [, setIsLoginPopupOpen] = useAtom(IS_LOGIN_POPUP_OPEN);
  const [, setIsSignupPopupOpen] = useAtom(IS_SIGNUP_POPUP_OPEN);

  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태 추가
  const [EmailError, setEmailError] = useState("");

  // 교육 코드 입력 상자에 대한 ref 추가
  const codeInputRefs = useRef([]);

  useEffect(() => {
    setErrorStatus("");
  }, [setErrorStatus]);

  useEffect(() => {
    const newCode = codeChars.join("");
    setEducationAuthCode(newCode);

    if (newCode.length === 5) {
      const alphanumericRegex = /^[a-zA-Z0-9]{5}$/;
      if (alphanumericRegex.test(newCode)) {
        setEducationCodeError("");
      } else {
        setEducationCodeError("교육 코드는 5자리 영문 또는 숫자여야 합니다.");
      }
    } else if (newCode.length > 0 && newCode.length < 5) {
      setEducationCodeError("교육 코드는 5자리여야 합니다.");
    } else {
      setEducationCodeError("");
    }
  }, [codeChars]);

  const validateForm = () => {
    if (
      !signUpName ||
      !signUpEmail ||
      !signUpPassword ||
      !confirmPassword ||
      educationAuthCode.length < 5
    ) {
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
      response = await fetch(
        "https://wishresearch.kr/api/user/education_signup/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: signUpName,
            email: signUpEmail,
            password: signUpPassword,
            phone_number: phoneNumber,
            education_state: true,
            // education_code: projectEducationCode,
            education_code: "edu_000001",
            education_auth_code: educationAuthCode,
            role: signUpRole,
            status: signUpStatus,
          }),
        }
      );

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
      console.log("🚀 ~ handleSignup ~ error response:", response);
      // setErrorStatus(error);
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
    navigate("/DCB-education");
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
      setIsCommercialEmail(false);
      return;
    }

    // 상용 이메일 체크 로직 추가
    const commonEmailDomains = [
      "gmail.com",
      "yahoo.com",
      "yahoo.co.jp",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "zoho.com",
      "mail.com",
      "mail.ru",
      "gmx.com",
      "yandex.com",
      "protonmail.com",
      "icloud.com",
      "fastmail.com",
      "hushmail.com",
      "inbox.com",
      "lycos.com",
      "rediffmail.com",
      "mail.ru",
      "qq.com",
      "163.com",
      "126.com",
      "sina.com",
      "sohu.com",
      "yeah.net",
      "21cn.com",
      "tom.com",
      "foxmail.com",
      "live.com",
      "msn.com",
      "naver.com",
      "daum.net",
      "nate.com",
      "kakao.com",
      "hanmail.net",
      "korea.com",
      "hanmir.com",
      "empal.com",
      "hitel.net",
      "kebi.com",
      "netian.com",
      "dreamwiz.com",
      "tistory.com",
      "naver.com",
      "daum.net",
      "nate.com",
      "orgio.net",
      "wail.co.kr",
      "lycos.co.kr",
      "chol.com",
      "chollian.net",
      "intizen.com",
      "freechal.com",
      "teramail.com",
      "metq.com",
      "paran.com",
      "cyworld.com",
      "hanafos.com",
      "unitel.co.kr",
    ];
    const emailDomain = email.split("@")[1];
    // if (commonEmailDomains.includes(emailDomain)) {
    //   setErrorStatus("상용 이메일은 사용할 수 없습니다.");
    //   setIsEmailValid(false);
    //   setIsCommercialEmail(true);
    //   return;
    // }

    setIsEmailValid(true);
    setIsCommercialEmail(false);
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

  const handleCodeInputChange = (e, index) => {
    const value = e.target.value;
    const alphanumericRegex = /^[a-zA-Z0-9]?$/;

    if (alphanumericRegex.test(value)) {
      const newCodeChars = [...codeChars];
      newCodeChars[index] = value;
      setCodeChars(newCodeChars);

      if (value && index < 4) {
        setTimeout(() => {
          if (codeInputRefs.current[index + 1]) {
            codeInputRefs.current[index + 1].focus();
          }
        }, 0);
      }
    }
  };

  const handleCodeInputKeyDown = (e, index) => {
    if (e.key === "Backspace" && codeChars[index] === "" && index > 0) {
      if (codeInputRefs.current[index - 1]) {
        codeInputRefs.current[index - 1].focus();
      }
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
                {/* {
                  <Helptext color="gray600" align="left">
                    공용 도메인(기업, 학교, 기관) 이메일만 사용 가능하며, 상용
                    이메일(gmail, naver, daum 등)은 사용할 수 없습니다.
                  </Helptext>
                } */}
                {errorStatus && (
                  <ErrorMessage style={{ color: "red", fontSize: "0.8rem" }}>
                    {errorStatus}
                  </ErrorMessage>
                )}
                {successStatus && (
                  <SuccessMessage
                    style={{ color: "green", fontSize: "0.8rem" }}
                  >
                    {successStatus}
                  </SuccessMessage>
                )}
              </div>

              {/* <SignInfo>
                <img src={images.ExclamationCircle} alt="info" />
                <Body3 color="gray500">
                  사내 메일 인증이 불가능한 경우나 기업 메일이 없는 사업장 및
                  기관은 info@userconnect.kr 메일을 통해 가입 문의해 주세요.
                </Body3>
              </SignInfo> */}
            </div>

            {/* <SignInfo>
              <img src={images.ExclamationCircle} alt="info" />
              <Body3 color="gray500">
                사내 메일 인증이 불가능한 경우나 기업 메일이 없는 사업장 및
                기관은 info@userconnect.kr 메일을 통해 가입 문의해 주세요.
              </Body3>
            </SignInfo> */}

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
                      );
                    } else {
                      setEmailError("");
                    }
                  }}
                  placeholder="비밀번호를 입력해주세요"
                />

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

                    if (e.target.value !== signUpPassword) {
                      setEmailError("비밀번호가 일치하지 않습니다.");
                    } else {
                      setEmailError("");
                    }
                  }}
                  placeholder="비밀번호를 다시 입력해 주세요"
                />

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
          <div
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#212529",
              marginBottom: "8px",
              marginTop: "32px",
              textAlign: "left",
            }}
          >
            <label htmlFor="educationCode">
              교육 코드<span>*</span>
            </label>
          </div>
          <div
            style={{ width: "610px", marginBottom: "20px", marginTop: "8px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {[0, 1, 2, 3, 4].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  inputMode="text"
                  style={{
                    width: "102.8px",
                    height: "102px",
                    borderRadius: "8px",
                    border: codeChars[index] ? "none" : "1px solid #E0E4EB",
                    backgroundColor: codeChars[index] ? "#F7F8FA" : "#FFFFFF",
                    textAlign: "center",
                    fontSize: "24px",
                    lineHeight: "150%",
                    letterSpacing: "0%",
                    color: "#323232",
                    outline: "none",
                    opacity: index > 0 && !codeChars[index - 1] ? 0.5 : 1,
                    cursor:
                      index > 0 && !codeChars[index - 1]
                        ? "not-allowed"
                        : "text",
                  }}
                  value={codeChars[index]}
                  onChange={(e) => handleCodeInputChange(e, index)}
                  onKeyDown={(e) => handleCodeInputKeyDown(e, index)}
                  ref={(el) => (codeInputRefs.current[index] = el)}
                  disabled={index > 0 && !codeChars[index - 1]}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = "#F7F8FA";
                    e.target.select();
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      e.target.style.backgroundColor = "#FFFFFF";
                      e.target.style.border = "1px solid #E0E4EB";
                    }
                  }}
                />
              ))}
            </div>
            {educationCodeError && (
              <ErrorMessage
                style={{ color: "red", textAlign: "left", marginTop: "8px" }}
              >
                {educationCodeError}
              </ErrorMessage>
            )}
          </div>

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
              !termsAccepted ||
              isCommercialEmail
              // ||
              // !!educationCodeError ||
              // projectEducationCode.length !== 5
            }
          >
            {isLoading ? "메일을 전송 중입니다..." : "회원가입"}
          </StyledAtomButton>

          <JoinWrap>
            <p>이미 가입하셨나요?</p>
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

export default MoleculeSignupEducationForm;

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
    font-size: 0.9rem !important;
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

// const StyledAtomInput = styled.input`
//   width: 100%;
//   font-family: "Pretendard", "Poppins";
//   font-size: 0.75rem;
//   padding: 12px 16px;
//   border-radius: 8px;
//   border: 1px solid ${palette.lineGray};
//   box-sizing: border-box;
// `;

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
  font-size: 0.8rem;
  color: ${palette.red};
  margin-top: 8px;
  text-align: center;
`;

const SuccessMessage = styled.p`
  font-size: 0.8rem;
  color: ${palette.green};
  margin-top: 8px;
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
