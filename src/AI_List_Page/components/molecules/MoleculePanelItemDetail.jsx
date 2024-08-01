// MoleculePanelItemDetail.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../assets/styles/Palette';

const MoleculePanelItemDetail = ({ id, imgSrc, gender, age, job, address, subAddress, tags, lifeStyle, consumption, productGroup, onClose, isSelected, toggleSelection }) => {
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
        return productGroup;
      default:
        return lifeStyle;
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <button onClick={onClose}>X</button>
        <div>
          <div>{gender} ({age})</div>
          <div>{address} 거주 | {job}</div>
          <div>
            {tags}
          </div>
          <div>
            <button active={activeTab === 'lifestyle'} onClick={() => setActiveTab('lifestyle')}>라이프스타일</button>
            <button active={activeTab === 'consumption'} onClick={() => setActiveTab('consumption')}>소비성향</button>
            <button active={activeTab === 'productGroup'} onClick={() => setActiveTab('productGroup')}>관심제품군</button>
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
  `
;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 추가: 박스 그림자 */
  `
;