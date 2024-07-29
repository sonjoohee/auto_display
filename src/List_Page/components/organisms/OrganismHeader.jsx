import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg'; // 로고 이미지 경로

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  border-bottom: 1px solid #ccc;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
`;

const Logo = styled.img`
  height: 40px;
`;

const OrganismHeader = () => {
  return (
    <Header>
      <Logo src={logo} alt="Logo" />
      <NavLinks>
        <Link to="/template">Template</Link>
        <Link to="/price">Price</Link>
        <Link to="/contents">Contents</Link>
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </NavLinks>
    </Header>
  );
};

export default OrganismHeader;
