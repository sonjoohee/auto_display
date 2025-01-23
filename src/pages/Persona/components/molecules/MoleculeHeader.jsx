//헤더 컴포넌트
import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Body2, Sub2 } from "../../../../assets/styles/Typography";
import { useAtom } from "jotai";
import { BUSINESS_ANALYSIS, PERSONA_STEP } from "../../../AtomStates";
import OrganismBusinessAnalysis from "../organisms/OrganismBusinessAnalysis";

const MoleculeHeader = () => {
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showBusinessAnalysis, setShowBusinessAnalysis] = useState(false);

  // Persona/3 경로 체크를 위한 조건 수정
  const isPersona3Page = /^\/Persona\/3\/[^/]+$/.test(location.pathname);

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
  
  return (
    <>
    <HeaderWrap>
      {personaStep > 0 && (
        <>
        <Title>
          {businessAnalysis.title ? businessAnalysis.title : "새로운 프로젝트"}
          {isPersona3Page && (
            <>
              <images.ChatPlus color={palette.primary} onClick={handleBusinessAnalysisToggle} />
              {showBusinessAnalysis && 
                <>
                <div className="businessAnalysis">
                  <OrganismBusinessAnalysis personaStep={2} />
                  <CloseButton onClick={handleBusinessAnalysisToggle} />
                </div>
                </>
              }
            </>
          )}
        </Title>
        </>
      )}

      <div className="gnb">
        <Sub2>
          서비스 소개
        </Sub2>
        <Notify Alarm onClick={handleAlertToggle}>
          <img src={images.IconBell} alt="" />
        </Notify>
        {/* <div className="userInfo">
          유저프로필
        </div> */}
      </div>
    </HeaderWrap>
    {showAlert && (
      <AlertToogle className={isClosing ? 'closing' : ''}>
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

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display:flex;
  align-items: center;
  padding:10px 28px;
  border-bottom: 1px solid ${palette.lineGray};
  background: ${palette.white};
  z-index: 99;

  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size:1rem;
  }

  .gnb {
    display:flex;
    align-items: center;
    gap: 24px;
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
        fill: #0B45B1;
      }
    }
  }

  // OrganismBusinessAnalysis의 위치를 조정하기 위한 스타일 추가
  .businessAnalysis {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 816px;
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
    content: '';
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

  // ${props => props.Alarm && css`
  //   &::after {
  //     position: absolute;
  //     top: -5px;
  //     right: -5px;
  //     width: 6px;
  //     height: 6px;
  //     background: ${palette.red};
  //     border-radius: 100px;
  //     content: '';
  //     animation: blink 1.5s infinite;
  //   }

    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
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
  flex-direction: ${props => props.NoAlarm ? 'column' : 'row'};
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: ${props => props.NoAlarm ? '38px 0' : '16px'};
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
    background: ${props => props.NoAlarm ? 'transparent' : 'rgba(34, 111, 255, 0.04)'};
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