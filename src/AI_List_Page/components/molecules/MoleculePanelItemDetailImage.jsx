// MoleculePanelItemDetail.jsx
// This file contains the MoleculePanelItemDetail component, which displays detailed information about a panel in a modal with multiple tabs and action buttons.

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 사용하여 페이지 이동

import { palette } from '../../assets/styles/Palette';

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
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 추가: 박스 그림자 */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${palette.gray}; /* 추가: 닫기 버튼 색상 */
  
  &:hover {
    color: ${palette.black}; /* 추가: 마우스 오버 시 색상 변경 */
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover; /* 추가: 이미지 커버 스타일 */
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const HeaderName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${palette.black}; /* 추가: 텍스트 색상 */
`;

const HeaderSubText = styled.div`
  color: ${palette.gray}; /* 추가: 서브 텍스트 색상 */
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background: ${palette.lightGray};
  color: ${palette.gray};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.9rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  padding: 8px;
  cursor: pointer;
  border-bottom: 2px solid ${({ active }) => (active ? palette.blue : 'transparent')};
  color: ${({ active }) => (active ? palette.blue : palette.gray)};
  transition: color 0.2s ease; /* 추가: 색상 전환 애니메이션 */
  
  &:hover {
    color: ${palette.blue}; /* 추가: 마우스 오버 시 색상 변경 */
  }
`;

const Content = styled.div`
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: ${palette.black};
  line-height: 1.5;
  white-space: pre-wrap; /* 추가: 줄바꿈 처리 */
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: ${palette.lightBlue};
  color: ${palette.blue};
  transition: background-color 0.3s ease, color 0.3s ease; /* 추가: 색상 전환 애니메이션 */
  
  &:hover {
    background: ${palette.blue};
    color: white;
  }
`;

const MoleculePanelItemDetailImage = ({ onClose, imgSrc, altText, description, lifeStyle, consumption, interest, tags, isSelected, toggleSelection }) => {
  const [activeTab, setActiveTab] = useState('lifestyle');
  const navigate = useNavigate();  // useNavigate 훅 사용
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // 외부 클릭 시 모달 닫기
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'lifestyle':
        return lifeStyle;
      case 'consumption':
        return consumption;
      case 'interest':
        return interest;
      default:
        return lifeStyle;
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Header>
          <Avatar src={imgSrc} alt={altText} />
          <HeaderText>
            <HeaderName>{description}</HeaderName>
            <HeaderSubText>{lifeStyle}</HeaderSubText>
          </HeaderText>
        </Header>
        <Tags>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>
        <Tabs>
          <Tab active={activeTab === 'lifestyle'} onClick={() => setActiveTab('lifestyle')}>라이프스타일</Tab>
          <Tab active={activeTab === 'consumption'} onClick={() => setActiveTab('consumption')}>소비성향</Tab>
          <Tab active={activeTab === 'interest'} onClick={() => setActiveTab('interest')}>관심제품군</Tab>
        </Tabs>
        <Content>
          {renderContent()}
        </Content>
        <Actions>
          <ActionButton isSelected={isSelected} onClick={toggleSelection}>
            {isSelected ? '패널 선택됨' : '패널 선택'}
          </ActionButton>
          <ActionButton onClick={() => navigate('/')}>인터뷰</ActionButton>
          <ActionButton onClick={() => navigate('/')}>퀵 리포트</ActionButton>
        </Actions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MoleculePanelItemDetailImage;
