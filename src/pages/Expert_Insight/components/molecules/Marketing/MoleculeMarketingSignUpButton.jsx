import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  MARKETING_BM_BUTTON_STATE,
  TITLE_OF_BUSINESS_INFORMATION,
  MARKETING_CUSTOMER_BUTTON_STATE,
  MARKETING_SELECTED_CUSTOMER,
  MARKETING_FINAL_CUSTOMER,
  MARKETING_FINAL_REPORT_BUTTON_STATE,
  ERROR_STATUS,
  SIGN_UP_NAME,
  EMAIL,
  SIGN_UP_EMAIL,
  SIGN_UP_PASSWORD,
  CONFIRM_PASSWORD,
} from "../../../../AtomStates";

import { useNavigate } from "react-router-dom";
import { useSaveConversation } from "../../atoms/AtomSaveConversation";
import MoleculeSignPopup from "../../../../Login_Sign/components/molecules/MoleculeSignPopup";
import { palette } from "../../../../../assets/styles/Palette";
import images from "../../../../../assets/styles/Images";

const MoleculeMarketingSignUpButton = () => {
  const navigate = useNavigate();
  const { saveConversation } = useSaveConversation();
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [marketingCustomerButtonState, setMarketingCustomerButtonState] = useAtom(MARKETING_CUSTOMER_BUTTON_STATE);
  const [marketingSelectedCustomer, setMarketingSelectedCustomer] = useAtom(MARKETING_SELECTED_CUSTOMER);
  const [marketingFinalCustomer, setMarketingFinalCustomer] = useAtom(MARKETING_FINAL_CUSTOMER);
  const [marketingFinalReportButtonState, setMarketingFinalReportButtonState] = useAtom(MARKETING_FINAL_REPORT_BUTTON_STATE);
  const [errorStatus, setErrorStatus] = useAtom(ERROR_STATUS);
  const [signUpName, setSignUpName] = useAtom(SIGN_UP_NAME);
  const [email, setEmail] = useAtom(EMAIL);
  const [signupEmail, setSignupEmail] = useAtom(SIGN_UP_EMAIL);
  const [password, setPassword] = useState("");
  const [signupPassword, setSignupPassword] = useAtom(SIGN_UP_PASSWORD);
  const [confirmPassword, setConfirmPassword] = useAtom(CONFIRM_PASSWORD);

  const [isSignPopupOpen, setIsSignPopupOpen] = useState(false);
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);

  const closeSignPopup = () => {
    setIsSignPopupOpen(false);
    setErrorStatus("");
    setSignUpName('');
    setEmail('');
    setSignupEmail('');
    setPassword('');
    setSignupPassword('');
    setConfirmPassword('');
  };

  const handleExitChatCancel = () => {
    setIsExitPopupOpen(false);
  };

  const handleExitChatCancel2 = () => {
    setIsExitPopupOpen(false);
    setIsSignPopupOpen(true);
  };

  const handleExitChatConfirm = () => {
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
      updatedConversation[updatedConversation.length - 1].type === "marketingSignUpButton"
    ) {
      updatedConversation.pop();
    }

    setConversation(updatedConversation);
    saveConversation({ changingConversation: { conversation: updatedConversation } });

    navigate("/MeetAiExpert");
  };

  return (
    <>
      <ButtonWrap>
        <button onClick={() => setIsSignPopupOpen(true)}>회원가입하고 대화내용 평생 간직 💌</button>
        <button onClick={() => setIsExitPopupOpen(true)}>저장하지 않고 종료하기 😱</button>
      </ButtonWrap>
      {isSignPopupOpen && (
        <>
          <MoleculeSignPopup onClose={closeSignPopup} />
          <Overlay onClick={closeSignPopup} />
        </>
      )}
      {isExitPopupOpen && (
        <Popup Cancel>
        <div>
          <button
            type="button"
            className="closePopup"
            onClick={handleExitChatCancel}
          >
            닫기
          </button>
          <span>
            <img src={images.ExclamationMark} alt="" />
          </span>
          <p>
            <strong>정말 종료하시겠습니까?</strong>
            <span>종료 또는 새로고침 할 경우, 모든 대화내역이 사라집니다.</span>
          </p>
          <div className="btnWrap">
            <button type="button" onClick={handleExitChatCancel2}>
              대화를 저장할래요
            </button>
            <button type="button" onClick={handleExitChatConfirm}>
              종료할게요
            </button>
          </div>
        </div>
      </Popup>
    )}
    </>
  );
};

export default MoleculeMarketingSignUpButton;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 15px;
  margin-left: 50px;

  button {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: "Pretendard";
    font-size: 0.875rem;
    color: ${palette.darkGray};
    border: 0;
    background: none;
    margin-right: 10px;
  }

  > button {
    padding: 8px 16px;
    border-radius: 40px;
    border: 1px solid ${palette.lineGray};
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
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
    padding: 11px;
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
      background: ${palette.black};
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
        font-family: 'Pretendard', 'Poppins';
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
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.blue};
              background: none;
            }
          }
        }
      `}
  }
`;