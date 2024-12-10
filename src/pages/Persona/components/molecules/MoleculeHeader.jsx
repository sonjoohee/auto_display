import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";

const MoleculeHeader = () => {
  return (
    <HeaderWrap>
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
  z-index: 100;

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
