import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { palette } from "../../assets/styles/Palette";
import MoleculeLoginPopup from "../../../Login_Sign_Page/components/molecules/MoleculeLoginPopup"; // 경로 수정

const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid ${palette.lineGray};
  background: ${palette.white};
  z-index: 99;

  h1 {
    font-size: 2rem;
  }

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 50px;

    a {
      color: ${palette.gray};
    }
  }

  .gnbWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .loginButton, .join {
      padding: 10px 20px;
      border-radius: 30px;
      transition: all 0.5s;
      text-decoration: none;
      color: ${palette.gray};
      font-weight: bold; /* 글자 진하게 설정 */
      cursor: pointer;

      &:hover {
        color: ${palette.white};
        background: ${palette.black};
      }
    }

    .join {
      border: 1px solid ${palette.black};

      &:hover {
        color: ${palette.white};
        background: ${palette.black};
      }
    }
  }
`;

const OrganismHeader = () => {
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setLoginPopupOpen(true);
  };

  const handleClosePopup = () => {
    setLoginPopupOpen(false);
  };

  return (
    <HeaderWrap>
      <h1><Link to="/">Crowd Insight</Link></h1>
      <ul>
        <li><Link to="/">맞춤패널 생성</Link></li>
        <li><Link to="/">Template</Link></li>
        <li><Link to="/">Price</Link></li>
        <li><Link to="/">Contents</Link></li>
      </ul>
      <div className="gnbWrap">
        <Link to="#" className="loginButton" onClick={handleLoginClick}>로그인</Link>
        <Link to="/signup" className="join">회원가입</Link>
      </div>
      {isLoginPopupOpen && <MoleculeLoginPopup onClose={handleClosePopup} />}
    </HeaderWrap>
  );
};

export default OrganismHeader;
