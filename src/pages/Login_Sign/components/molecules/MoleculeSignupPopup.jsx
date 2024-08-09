// MoleculeSignupPopup.jsx
import { useAtom } from 'jotai';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signupEmailAtom } from '../../../AtomStates';

const MoleculeSignupPopup = ({ onClose, email }) => {
  const navigate = useNavigate();
  const [, setEmail] = useAtom(signupEmailAtom);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleResendEmail = async () => {
    try {
      const response = await fetch('http://localhost:4008/resend-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert('인증 이메일이 재발송되었습니다.');
      } else {
        const result = await response.json();
        alert(result.error || '이메일 재발송 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('이메일 재발송 요청 중 오류 발생:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
    setEmail(''); // 이메일 상태를 초기화합니다.
    console.log("로그인 페이지로 이동");
  };

  return (
    <SignupPopupOverlay onClick={handleOverlayClick}>
      <PopupContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Content>
          <Title>이메일 인증 후 회원가입이 완료됩니다.</Title>
          <Description>
            인증 메일은 <strong>{email}</strong>으로 발송했습니다. 메일에 기재된 링크를 클릭하여 인증을 완료해 주세요.<br />
            메일을 받지 못한 경우, 스팸편지함 확인 또는 아래 버튼을 클릭하여 재전송 해주세요.
          </Description>
          <ButtonGroup>
            <ActionButton onClick={handleGoToLogin}>로그인 화면 바로가기</ActionButton>
            <ActionButton onClick={handleResendEmail} primary>메일 재발송</ActionButton>
          </ButtonGroup>
        </Content>
      </PopupContent>
    </SignupPopupOverlay>
  );
};

export default MoleculeSignupPopup;

// Styled Components
const SignupPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  position: relative;
  width: 500px;
  max-width: 90%;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background: ${props => props.primary ? '#000' : '#fff'};
  color: ${props => props.primary ? '#fff' : '#000'};
  font-weight: bold;
  
  &:hover {
    background: ${props => props.primary ? '#333' : '#f7f7f7'};
  }
`;
