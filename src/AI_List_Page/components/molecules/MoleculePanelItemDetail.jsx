// MoleculePanelItemDetail.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const MoleculePanelItemDetail = ({ id, imgSrc, gender, age, job, address, subAddress, tags, lifeStyle, consumption, productGroup = '', onClose, isSelected, toggleSelection }) => {
  const [activeTab, setActiveTab] = useState('lifestyle');

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'lifestyle':
        return lifeStyle;
      case 'consumption':
        return consumption;
      case 'productGroup':
        // Split the productGroup string by '^' and map over the resulting array
        return (
          <ProductGroupContainer>
            {productGroup.split('^').map((item, index) => (
              <ProductGroupItem key={index}>{item}</ProductGroupItem>
            ))}
          </ProductGroupContainer>
        );
      default:
        return lifeStyle;
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Header>
          <ProfileImage>😊</ProfileImage>
          <HeaderText>
            <UserInfo>{gender} ({age}세)</UserInfo>
            <UserDetails>{address} 거주 | {job}</UserDetails>
          </HeaderText>
        </Header>
        <TagsContainer>
          {tags.split(',').filter(tags => tags.trim() !== '').map((tags, index) => (
            <Tag key={index}>#{tags.trim()}</Tag>
          ))}
        </TagsContainer>
        <TabMenu>
          <TabButton active={activeTab === 'lifestyle'} onClick={() => setActiveTab('lifestyle')}>라이프스타일</TabButton>
          <TabButton active={activeTab === 'consumption'} onClick={() => setActiveTab('consumption')}>소비성향</TabButton>
          <TabButton active={activeTab === 'productGroup'} onClick={() => setActiveTab('productGroup')}>관심제품군</TabButton>
        </TabMenu>
        <Content>
          {renderContent()}
        </Content>
        <Footer>
          <ActionButton onClick={toggleSelection}>
            {isSelected ? '패널 선택됨' : '패널 선택'}
          </ActionButton>
          <Link to={`/interview/${id}`}>
            <ActionButton>인터뷰</ActionButton>
          </Link>
          <Link to={`/quickreport/${id}`}>
            <ActionButton>퀵 리포트</ActionButton>
          </Link>
        </Footer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MoleculePanelItemDetail;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-right: 10px;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const UserDetails = styled.div`
  font-size: 14px;
  color: gray;
`;

const TagsContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  background-color: #f0f0f0;
  color: #333;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  margin: 0 5px 5px 0;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 0;
  background: ${(props) => (props.active ? '#ffffff' : '#f0f0f0')};
  color: ${(props) => (props.active ? '#333333' : '#888888')};
  border: none;
  border-bottom: ${(props) => (props.active ? '2px solid #333333' : '2px solid #dddddd')};
  cursor: pointer;
  font-size: 14px;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};

  &:hover {
    background: ${(props) => (props.active ? '#ffffff' : '#e0e0e0')};
  }
`;

const Content = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ProductGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ProductGroupItem = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;
