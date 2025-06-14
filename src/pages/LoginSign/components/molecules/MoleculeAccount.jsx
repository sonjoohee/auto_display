import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import MoleculeAccountForm from "./MoleculeAccountForm";
import { LOGIN_SUCCESS } from "../../../../pages/AtomStates"; // 아톰 임포트
import { palette } from "../../../../assets/styles/Palette";
// import images from "../../../../assets/styles/Images";

const MoleculeAccount = ({ onOpenPopup = () => {} }) => {
  const [loginSuccess, setLoginSuccess] = useAtom(LOGIN_SUCCESS);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      if (onOpenPopup) onOpenPopup(); // 비밀번호 변경 성공 시 팝업 열기
      setLoginSuccess(null); // 상태 초기화
    }
  }, [loginSuccess, navigate, setLoginSuccess]);

  return (
    <AccountContainer>
      <h1>
        비밀번호 변경
        <p>회원정보는 비밀번호 변경이 가능해요</p>
      </h1>

      <MoleculeAccountForm onOpenPopup={onOpenPopup} /> {/* 팝업 열기 함수 전달 */}
    </AccountContainer>
  );
};

export default MoleculeAccount;


// CSS-in-JS 스타일링
const AccountContainer = styled.div`
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 50px;

    p {
      font-size: 1rem;
      font-weight: 300;
      color: ${palette.gray};
    }
  }

  min-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  text-align: center;
`;
