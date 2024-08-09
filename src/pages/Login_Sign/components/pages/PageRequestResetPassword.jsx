import React, { useState } from 'react';
import styled from 'styled-components';
import MoleculePasswordResetPopup from '../molecules/MoleculePasswordResetPopup';

const RequestResetPassword = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRequestReset = async () => {
    try {
      const response = await fetch('http://localhost:4008/request-reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }), // 이름과 이메일을 함께 전송
      });

      if (response.ok) {
        setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
        setIsPopupOpen(true); // 팝업을 열도록 상태 설정
      } else {
        const result = await response.json();
        setMessage(result.error || '비밀번호 재설정 요청 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setMessage('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // 팝업을 닫는 상태 설정
  };

  const handleResendEmail = async () => {
    try {
      const response = await fetch('http://localhost:4008/resend-password-reset-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert('비밀번호 재설정 이메일이 재발송되었습니다.');
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
    window.location.href = '/login'; // 로그인 페이지로 이동
  };

  return (
    <RequestResetContainer>
      <Header>비밀번호 재설정 요청</Header>
      <Label htmlFor="name">이름</Label>
      <StyledInput
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <Label htmlFor="email">이메일</Label>
      <StyledInput
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일 주소를 입력하세요"
      />
      <StyledButton onClick={handleRequestReset}>비밀번호 재설정 링크 보내기</StyledButton>
      {message && <Message>{message}</Message>}

      {isPopupOpen && (
        <MoleculePasswordResetPopup
          onClose={handleClosePopup}
          email={email}
          handleResendEmail={handleResendEmail}
          handleGoToLogin={handleGoToLogin}
        />
      )}
    </RequestResetContainer>
  );
};

export default RequestResetPassword;

// CSS-in-JS 스타일링
const RequestResetContainer = styled.div`
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
  text-align: left; /* 왼쪽 정렬 */
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
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
`;

const Message = styled.p`
  margin-top: 20px;
  color: #333;
  font-size: 14px;
  text-align: center;
`;
