import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MoleculePasswordResetPopup = ({ onClose, email }) => {
  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleResendEmail = async () => {
    try {
      const response = await fetch(
        "https://wishresearch.kr/api/user/passwordMail/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        alert("비밀번호 재설정 이메일이 재발송되었습니다.");
      } else {
        const result = await response.json();
        alert(result.error || "이메일 재발송 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("이메일 재발송 요청 중 오류 발생:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  const handleGoToLogin = () => {
    navigate("/");
    console.log("메인 페이지로 이동");
  };

  return (
    <PasswordResetPopupOverlay onClick={handleOverlayClick}>
      <PopupContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Content>
          <Title>비밀번호 재설정 요청이 완료되었습니다.</Title>
          <Description>
            재설정 링크가 <strong>{email}</strong>으로 발송되었습니다. 메일에
            기재된 링크를 클릭하여 비밀번호를 재설정해 주세요.
            <br />
            메일을 받지 못한 경우, 스팸편지함 확인 또는 아래 버튼을 클릭하여
            재전송 해주세요.
          </Description>
          <ButtonGroup>
            <ActionButton onClick={handleGoToLogin}>
              메인 화면 바로가기
            </ActionButton>
            <ActionButton onClick={handleResendEmail} primary>
              메일 재발송
            </ActionButton>
          </ButtonGroup>
        </Content>
      </PopupContent>
    </PasswordResetPopupOverlay>
  );
};

export default MoleculePasswordResetPopup;

// Styled Components
const PasswordResetPopupOverlay = styled.div`
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
  font-family: "Pretendard", "Poppins";
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
  background: ${(props) => (props.primary ? "#000" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#000")};
  font-weight: bold;
  font-family: "Pretendard", "Poppins";

  &:hover {
    background: ${(props) => (props.primary ? "#333" : "#f7f7f7")};
  }
`;
