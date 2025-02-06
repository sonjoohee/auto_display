//헤더 컴포넌트
import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import {
  Body2,
  Sub1,
  Sub2,
  Sub3,
  Caption2,
} from "../../../../assets/styles/Typography";
import {
  CreditTotal,
  CreditDashBoardItem,
  CreditNoData,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { useAtom } from "jotai";
import {
  BUSINESS_ANALYSIS,
  PERSONA_STEP,
  USER_CREDITS,
  IS_LOGGED_IN,
} from "../../../AtomStates";
import OrganismBusinessAnalysis from "../organisms/OrganismBusinessAnalysis";
import { UserCreditInfo } from "../../../../utils/indexedDB";

const MoleculeHeader = ({ businessAnalysisTitle }) => {
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showBusinessAnalysis, setShowBusinessAnalysis] = useState(false);
  const [showCreditToggle, setShowCreditToggle] = useState(false);
  const [isClosingCreditToggle, setIsClosingCreditToggle] = useState(false);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);

  console.log("🚀 ~ MoleculeHeader ~ personaStep:", personaStep);

  const navigate = useNavigate();

  // Persona/3 경로 체크를 위한 조건 수정
  const isPersona3Page =
    /^\/Persona\/(3\/[^/]+|3\/Select\/[^/]+|4\/[^/]+|4\/Single\/[^/]+)$/.test(
      location.pathname
    );

  // 첫 페이지 체크 (루트 경로 확인)
  const isRootPage = location.pathname === "/";

  // MyProject 경로 체크 추가
  const isMyProjectPage = location.pathname === "/MyProject";

  // MyProfile 경로 체크 추가
  const isMyProfilePage = location.pathname === "/MyProfile";

  // Payment 경로 체크 추가
  const isPaymentPage = location.pathname === "/Payment";

  const handleAlertToggle = () => {
    if (showAlert) {
      setIsClosing(true);
      setTimeout(() => {
        setShowAlert(false);
        setIsClosing(false);
      }, 300);
    } else {
      setShowAlert(true);
    }
  };

  const handleBusinessAnalysisToggle = () => {
    setShowBusinessAnalysis(!showBusinessAnalysis);
  };

  const handleCreditToggle = () => {
    if (showCreditToggle) {
      setIsClosingCreditToggle(true);
      setTimeout(() => {
        setShowCreditToggle(false);
        setIsClosingCreditToggle(false);
      }, 300);
    } else {
      setShowCreditToggle(true);
    }
  };

  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        const credits = await UserCreditInfo(true);
        if (credits) {
          setUserCredits(credits);
          setIsLoggedInState(true);
        } else {
          setUserCredits({
            additional_credit: 0,
            regular_credit: 0,
            event_credit: 0,
          });
          setIsLoggedInState(false);
        }
      } catch (error) {
        console.error("유저 크레딧 정보 조회 오류 발생:", error);
        setUserCredits({
          additional_credit: 0,
          regular_credit: 0,
          event_credit: 0,
        });
        setIsLoggedInState(false);
      }
    };

    fetchUserCredits();
  }, []);

  return (
    <>
      <HeaderWrap>
        {(personaStep > 0 ||
          isMyProjectPage ||
          isMyProfilePage ||
          isPaymentPage) && (
          <>
            <Title>
              {isMyProjectPage
                ? "작업관리"
                : isMyProfilePage
                ? "계정관리"
                : isPaymentPage
                ? "크레딧"
                : businessAnalysis.title
                ? businessAnalysis.title
                : "새로운 프로젝트"}
              {isPersona3Page && (
                <>
                  <images.ChatPlus
                    color={palette.primary}
                    onClick={handleBusinessAnalysisToggle}
                  />
                  {showBusinessAnalysis && (
                    <>
                      <div className="businessAnalysis">
                        <OrganismBusinessAnalysis personaStep={2} />
                        <CloseButton onClick={handleBusinessAnalysisToggle} />
                      </div>
                    </>
                  )}
                </>
              )}
            </Title>
          </>
        )}

        <div className="gnb">
          {isRootPage && (
            <Sub2
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/ServiceLanding")}
            >
              서비스 소개
            </Sub2>
          )}

          <TotalCreditToggle>
            <CreditTotal
              onClick={handleCreditToggle}
              style={{ cursor: "pointer" }}
            >
              <div>
                <span>
                  <images.CoinSmall
                    width="12px"
                    height="8px"
                    color={palette.white}
                  />
                </span>
                <Sub2 color="gray800">
                  {(
                    (userCredits.regular_credit || 0) +
                    (userCredits.additional_credit || 0) +
                    (userCredits.event_credit || 0)
                  ).toLocaleString()}
                </Sub2>
              </div>
              <images.ChevronDown
                width="20px"
                height="20px"
                color={palette.gray300}
                style={{
                  transform: showCreditToggle
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </CreditTotal>

            {showCreditToggle && (
              <CreditToggle className={isClosingCreditToggle ? "closing" : ""}>
                <div className="title">
                  <Sub1 color="gray700">크레딧 내역</Sub1>
                  {isLoggedInState &&
                    (sessionStorage.getItem("userEmail") ===
                      "pg_card@userconnect.kr" ||
                      sessionStorage.getItem("userEmail") ===
                        "sungeun_lee@userconnect.kr" ||
                      sessionStorage.getItem("userEmail") ===
                        "pixelweb@naver.com") && (
                      <button onClick={() => navigate("/Payment")}>
                        <Caption2 color="primary">충전하기</Caption2>
                      </button>
                    )}
                </div>

                {isLoggedIn ? (
                  <ul>
                    <li>
                      <CreditDashBoardItem NoLine>
                        <div className="icon yellow">
                          <images.CoinFill
                            width="9.6"
                            height="6.1"
                            color="#FFD54A"
                          />
                        </div>
                        <Sub3 color="gray500" align="left">
                          일반 크레딧
                        </Sub3>
                      </CreditDashBoardItem>
                      <Sub3 color="gray500" align="right">
                        {userCredits.additional_credit.toLocaleString()}
                      </Sub3>
                    </li>
                    <li>
                      <CreditDashBoardItem NoLine>
                        <div className="icon green">
                          <images.CoinFill
                            width="9.6"
                            height="6.1"
                            color="#34C759"
                          />
                        </div>
                        <Sub3 color="gray500" align="left">
                          구독 크레딧
                        </Sub3>
                      </CreditDashBoardItem>
                      <Sub3 color="gray500" align="right">
                        {userCredits.regular_credit.toLocaleString()}
                      </Sub3>
                    </li>
                    <li>
                      <CreditDashBoardItem NoLine>
                        <div className="icon red">
                          <images.CoinFill
                            width="9.6"
                            height="6.1"
                            color="#FF5322"
                          />
                        </div>
                        <Sub3 color="gray500" align="left">
                          이벤트 크레딧
                        </Sub3>
                      </CreditDashBoardItem>
                      <Sub3 color="gray500" align="right">
                        {userCredits.event_credit.toLocaleString()}
                      </Sub3>
                    </li>
                  </ul>
                ) : (
                  <CreditNoData>
                    <Sub3 color="gray500">
                      크레딧 내역은 로그인 후,
                      <br />
                      확인 가능합니다.
                    </Sub3>
                  </CreditNoData>
                )}
              </CreditToggle>
            )}
          </TotalCreditToggle>

          <Notify Alarm onClick={handleAlertToggle}>
            <img src={images.IconBell} alt="" />
          </Notify>
          {/* <div className="userInfo">
          유저프로필
        </div> */}
        </div>
      </HeaderWrap>

      {showAlert && (
        <AlertToogle className={isClosing ? "closing" : ""}>
          <AlertHeader>알림</AlertHeader>

          <AlertContent>
            {/* 메시지 있을 때 */}
            <Messageox NoAlarm>
              <img src={images.NoAlarm} alt="" />
              <p>알림이 없습니다.</p>
            </Messageox>

            {/* 메시지 있을 떄 */}
            {/*
          <Messageox>
            <img src={images.CheckMark} alt="" />
            <Message>
              <MessageContent>
                <p>요청하신 <strong>5명의 커스터마이즈 페르소나</strong>가 준비되었습니다.<br />바로 인터뷰를 진행해보세요. </p>
                <span>2024.12.09 at 10:15am</span>
              </MessageContent>

              <ButtonWrap>
                <Button>페르소나 확인</Button>
              </ButtonWrap>
            </Message>
          </Messageox>

          <Messageox>
            <img src={images.CheckMark} alt="" />
            <Message>
              <MessageContent>
                <p>요청하신 <strong>5명의 커스터마이즈 페르소나</strong>가 준비되었습니다.<br />바로 인터뷰를 진행해보세요. </p>
                <span>2024.12.09 at 10:15am</span>
              </MessageContent>

              <ButtonWrap>
                <Button>페르소나 확인</Button>
              </ButtonWrap>
            </Message>
          </Messageox> 
          */}
          </AlertContent>
        </AlertToogle>
      )}
    </>
  );
};

export default MoleculeHeader;

const TotalCreditToggle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const CreditToggle = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 240px;
  padding: 16px;
  border-radius: 5px;
  background: ${palette.white};
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
  z-index: 100;

  &.closing {
    animation: fadeOut 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      font-family: "Pretendard", "Poppins";
      padding: 2px 4px;
      border-radius: 5px;
      border: 0;
      background: ${palette.chatGray};
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      + li {
        padding-top: 8px;
        border-top: 1px solid ${palette.chatGray};
      }
    }
  }
`;

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 28px;
  border-bottom: 1px solid ${palette.lineGray};
  background: ${palette.white};
  z-index: 99;

  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
  }

  .gnb {
    display: flex;
    align-items: center;
    gap: 32px;
    margin-left: auto;
  }

  .userInfo {
    width: 36px;
    height: 36px;
    font-size: 0;
    font-weight: 500;
    border-radius: 100px;
    background: ${palette.gray200};
  }
`;

const Title = styled(Body2)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    cursor: pointer;

    &:hover {
      path {
        fill: #0b45b1;
      }
    }
  }

  .businessAnalysis {
    position: absolute;
    top: 30px;
    // left: 77px;
    left: 50%;
    transform: none;
    width: 816px;
    margin-left: -408px;
    z-index: 100;
    animation: fadeIn 0.3s ease-in-out;
    border-radius: 15px;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
    overflow: hidden;

    > div:nth-child(1) {
      display: none;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 32px;
  right: 24px;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 2px;
    background: ${palette.gray700};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const Notify = styled.div`
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.Alarm &&
    css`
      /* &::after {
       position: absolute;
       top: -5px;
       right: -5px;
       width: 6px;
       height: 6px;
       background: ${palette.red};
       border-radius: 100px;
       content: '';
       animation: blink 1.5s infinite;
     } */

      @keyframes blink {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `}
`;

const AlertToogle = styled.div`
  position: fixed;
  top: 40px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 396px;
  width: 100%;
  // margin-top: 20px;
  margin-top: 3px;
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  z-index: 99;
  animation: fadeIn 0.3s ease-in-out;

  &.closing {
    animation: fadeOut 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  &:before {
    position: absolute;
    top: -10px;
    right: 70px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${palette.white};
    // content: '';
  }
`;

const AlertHeader = styled.div`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
  padding: 20px 16px;
  border-bottom: 1px solid ${palette.outlineGray};
`;

const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const Messageox = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.NoAlarm ? "column" : "row")};
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: ${(props) => (props.NoAlarm ? "38px 0" : "16px")};
  // padding: 16px;
  transition: all 0.5s;

  > p {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray500};
  }

  > img {
    width: 28px;
    height: 28px;
  }

  & + & {
    border-top: 1px solid ${palette.outlineGray};
  }

  &:hover {
    background: ${(props) =>
      props.NoAlarm ? "transparent" : "rgba(34, 111, 255, 0.04)"};
    // background: rgba(34, 111, 255, 0.04);
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  p {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray800};
    text-align: left;
  }

  strong {
    font-weight: 500;
  }

  span {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};
    text-align: left;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const Button = styled.div`
  font-size: 0.75rem;
  line-height: 1.2;
  color: ${palette.primary};
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid ${palette.primary};
  background: ${palette.white};
`;
