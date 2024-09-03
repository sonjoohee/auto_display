// MoleculeLoginPopup.jsx

import React from 'react';
import styled from 'styled-components';
import MoleculeLogin from './MoleculeLogin';

const MoleculeLoginPopup = ({ onClose = () => {} }) => { // 기본값으로 빈 함수 설정
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <LoginPopupOverlay onClick={handleOverlayClick}>
      <PopupContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <MoleculeLogin onClosePopup={onClose} /> {/* 함수 전달 */}
      </PopupContent>
    </LoginPopupOverlay>
  );
};

export default MoleculeLoginPopup;

// CSS-in-JS 스타일링
const LoginPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
