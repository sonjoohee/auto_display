import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";

const MoleculeTabMenu = ({ activeTab, onSelectTab }) => (
  <StyledTabMenu>
    <Link
      to="#"
      className={activeTab === "ai" ? "active" : ""}
      onClick={() => onSelectTab("ai")}
    >
      <img src={images.Filter} alt="" />
      <span>AI 패널 필터</span>
    </Link>
    <Link
      to="#"
      className={activeTab === "biz" ? "active" : ""}
      onClick={() => onSelectTab("biz")}
    >
      <img src={images.Filter} alt="" />
      <span>비즈니스 맞춤 패널</span>
    </Link>
    <Link
      to="#"
      className={activeTab === "preset" ? "active" : ""}
      onClick={() => onSelectTab("preset")}
    >
      <img src={images.Filter} alt="" />
      <span>산업별 프리셋 패널</span>
    </Link>
  </StyledTabMenu>
);

export default MoleculeTabMenu;

const StyledTabMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px auto 50px;

  a {
    position: relative;
    color: lightgray;
    padding: 0 56px;
    transition: all 0.5s;

    img {
      opacity: 0.3;
      transition: all 0.5s;
    }

    &:hover,
    &.active {
      color: black;

      img {
        opacity: 1;
      }
    }

    & + a:before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 90%;
      background: gray;
      content: '';
    }
  }

  span {
    display: block;
    margin-top: 8px;
  }
`;
