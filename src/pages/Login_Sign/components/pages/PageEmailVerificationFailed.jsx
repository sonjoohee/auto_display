import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageEmailVerificationFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <Message>이메일 인증에 실패했습니다.</Message>
      <SubMessage>링크가 만료되었거나 잘못된 인증 링크입니다.</SubMessage>
      <Button onClick={handleRetry}>다시 시도하기</Button>
    </Container>
  );
};

export default PageEmailVerificationFailed;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Message = styled.h2`
  color: #ff0000;
  margin-bottom: 10px;
`;

const SubMessage = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;
