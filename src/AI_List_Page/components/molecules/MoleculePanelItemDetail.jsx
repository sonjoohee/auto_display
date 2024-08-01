// MoleculePanelItemDetail.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../assets/styles/Palette';

const ModalOverlay = styled.div`
  /* 스타일 생략 */
`;

const ModalContent = styled.div`
  /* 스타일 생략 */
`;

const MoleculePanelItemDetail = ({ onClose, description, lifeStyle, consumption, interest, tags, isSelected, toggleSelection }) => {
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
      case 'interest':
        return interest;
      default:
        return lifeStyle;
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <button onClick={onClose}>X</button>
        <div>
          <div>{description}</div>
          <div>
            {tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
          <div>
            <button active={activeTab === 'lifestyle'} onClick={() => setActiveTab('lifestyle')}>라이프스타일</button>
            <button active={activeTab === 'consumption'} onClick={() => setActiveTab('consumption')}>소비성향</button>
            <button active={activeTab === 'interest'} onClick={() => setActiveTab('interest')}>관심제품군</button>
          </div>
          <div>
            {renderContent()}
          </div>
          <div>
            <button onClick={toggleSelection}>
              {isSelected ? '패널 선택됨' : '패널 선택'}
            </button>
          </div>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MoleculePanelItemDetail;
