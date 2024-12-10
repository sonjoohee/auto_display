import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import images from "../../assets/styles/Images";
import { palette } from "../../assets/styles/Palette";

const IncHeader = () => {
  const location = useLocation();

  return (
    <HeaderWrap>
      {location.pathname === "/BusinessAnalysis" && (
        <h1>쉽고 빠른 개인 금융업무 지원 모바일 서비스</h1>
      )}

      <div className="gnb">
        <Link to="/">
          <img src={images.IconBell} alt="" />
        </Link>
        <div className="userInfo">
          유저프로필
        </div>
      </div>
    </HeaderWrap>
  );
};

export default IncHeader;

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
  z-index: 100;

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
