import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { palette } from "./Palette";
import images from "./Images";

const PopupWrap = ({ 
  title, 
  message, 
  body,
  onConfirm, 
  onCancel,
  Warning, 
  Check, 
  Error, 
  Info, 
  buttonType, 
  nomalText, 
  closeText,
  confirmText, 
  redirectUrl, 
  isModal,
  isTextareaValid,
  isRadioSelected,
  isFormValid,
  TitleFlex,
 }) => {
  const [isOpen, setIsOpen] = useState(true);

  // 부모 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 원래 상태로 복원
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onCancel();
  };
  
  const handleConfirm = () => {
    onConfirm();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  const renderButtons = (buttonType, handleClose, handleConfirm, nomalText, closeText, confirmText) => {
    if (buttonType === 'Outline') {
      return (
        <ButtonWrap>
          {nomalText && (
            <Button className="Outline" onClick={handleClose}>{nomalText}</Button>
          )}
          {closeText && (
            <Button Close className="Outline" onClick={handleClose}>{closeText}</Button>
          )}
          {confirmText && (
            <Button Confirm className="Outline" onClick={handleConfirm}>{confirmText}</Button>
          )}
        </ButtonWrap>
      );
    } else if (buttonType === 'Fill') {
      return (
        <FillButtonWrap>
          {nomalText && (
            <Button className="Fill">{nomalText}</Button>
          )}
          {closeText && (
            <Button Close className="Fill" onClick={handleClose}>{closeText}</Button>
          )}
          {confirmText && (
            <Button 
              Confirm 
              className={`Fill ${!isFormValid ? 'disabled' : ''}`} 
              onClick={isFormValid ? handleConfirm : undefined}
              disabled={!isFormValid}
            >
              {confirmText}
            </Button>
          )}
        </FillButtonWrap>
      );
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <PopupBox>
      {isModal ? (
        <ModalPopup>
          <Header>
            {title}
            <ColseButton TitleFlex={TitleFlex} onClick={handleClose} />
          </Header>

          <Body>{body}</Body>

          {renderButtons(buttonType, handleClose, handleConfirm, nomalText, closeText, confirmText)}
        </ModalPopup>
      ) : (
        <AlertPopup>
          <ColseButton TitleFlex={TitleFlex} onClick={handleClose} />
          <Contents>
            {Warning ? (
              <img src={images.ExclamationMark} alt="Warning" />
            ) : Check ? (
              <img src={images.CheckMark} alt="Check" />
            ) : Info ? (
              <img src={images.iconQuestionMark} alt="Info" />
            ) : Error ? (
              <img src={images.ExclamationMark} alt="Error" />
            ) : null}
            
            <Text>
              <strong>{title}</strong>
              <p>{message}</p>
            </Text>
          </Contents>

          {renderButtons(buttonType, handleClose, handleConfirm, nomalText, closeText, confirmText)}
        </AlertPopup>
      )}
    </PopupBox>
  );
};

export default PopupWrap;

export const PopupBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.50);
  z-index: 200;
`;

export const AlertPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 15px;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.15);
  background: ${palette.white};
`;

export const ModalPopup = styled(AlertPopup)`
  gap: 32px;
  max-width: 600px;
  padding: 32px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.3;
  color: ${palette.gray800};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // gap: 20px;
  gap: ${props => props.TitleFlex ? '20px' : '12px'};
  width: 100%;
  height: 100%;
  max-height: 60dvh;
  padding-right:10px;
  overflow-y: auto;
  overflow-x: hidden;

  .bgBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background: ${palette.chatGray};

    strong {
      font-weight: 600;
      line-height: 1.5;
      color: ${palette.gray800};
    }

    .tag {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;

      span {
        display: flex;
        align-items: center;
        font-size: 0.75rem;
        line-height: 1.5;
        color: ${palette.gray700};
        padding: 4px 10px;
        border-radius: 20px;
        border: 1px solid ${palette.outlineGray};

        &:before {
          content: '#';
        }
      }
    }
  }

  dl {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }

  dt {
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;

    &.point:after {
      color: ${palette.error};
      margin-left: 4px;
      content: '*';
    }
    
    p {
      font-size: 0.875rem;
      line-height: 1.5;
      color: ${palette.gray700};
      margin-top: 4px;
    }
  }

  dd {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    flex-wrap: wrap;
    width: 100%;
  }

  input[type="radio"],
  input[type="checkbox"] {
    display: none;
  }

  label.persona,
  label.age {
    flex: 1 1 20%;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    cursor: pointer;
    transition: all 0.5s;
  }

  label.age.none {
    border: 0;
    cursor: default;

    &:hover {
      background: none;
    }
  }

  label.gender {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    cursor: pointer;
    transition: all 0.5s;
  }

  input[type="radio"]:checked + .persona,
  input[type="radio"]:checked + .gender,
  input[type="radio"]:checked + .age,
  input[type="checkbox"]:checked + .age {
    color: ${palette.primary};
    border: 1px solid ${palette.primary};
  }
`;

export const ColseButton = styled.div`
  position: absolute;
  top: ${props => props.TitleFlex ? '37px' : '24px'};
  right: ${props => props.TitleFlex ? '32px' : '24px'};
  // top: 24px;
  // right: 24px;
  width: ${props => props.TitleFlex ? '16px' : '12px'};
  height: ${props => props.TitleFlex ? '16px' : '12px'};
  // width: 12px;
  // height: 12px;
  cursor: pointer;

  &:before, &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    border-radius: 10px;
    background-color: ${palette.gray500};
    content: '';
  }
  
  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 24px 0 0;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  strong {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    color: ${palette.gray800};
  }

  p {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  align-self: stretch;
  align-items: flex-start;
  gap: 16px;
  // padding-top: 16px;
  padding-top: 8px;
  border-top: 1px solid ${palette.gray200};
`;

export const FillButtonWrap = styled(ButtonWrap)`
  padding-top: 0;
  border-top: 0;
`;

export const Button = styled.div`
  flex: 1 1 auto;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  padding: 8px 0 0;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.5s;

  &.Outline {
    color: ${props => {
      if (props.Confirm) return '#0453F4';
      if (props.Close) return palette.gray500;
      return '#7D7D7D';
    }};
  }

  &.Fill {
    color: ${props => 
      props.Confirm ? (props.disabled ? palette.gray500 : palette.white)
      : props.Close ? palette.gray500
      : palette.gray500};
    padding: 12px 20px;
    border-radius: 8px;
    border: 1px solid ${props => 
      props.Confirm ? (props.disabled ? palette.gray300 : palette.primary)
      : props.Close ? palette.outlineGray
      : palette.outlineGray};
    background: ${props => 
      props.Confirm ? (props.disabled ? palette.gray200 : palette.primary)
      : props.Close ? palette.chatGray
      : palette.chatGray};
    
    &:hover {
      background: ${props => 
        props.Confirm && !props.disabled ? palette.blue 
        : props.Close ? palette.gray100
        : palette.gray100};
    }
  }

  &.disabled {
    opacity: 0.5;
    border: 1px solid ${palette.gray300};
    background: ${palette.gray300};
    cursor: not-allowed;
  }
`;