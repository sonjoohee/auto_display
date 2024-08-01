// src/AI_List_Page/components/molecules/MoleculePanelItem.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../assets/styles/Palette';
import panelimages from "../../assets/images/panel/PanelImage1.png"

const MoleculePanelItem = ({ id, imgSrc, gender, age, job, address, subAddress, comment, tags, onSelect, lifeStyle, consumption, productGroup }) => {
  const [isSelected, setSelected] = useState(false);
  const [isDetailsVisible, setDetailsVisible] = useState(false);

  const handlePanelClick = (e) => {
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    const newSelected = !isSelected;
    setSelected(newSelected);
    onSelect(newSelected);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    setDetailsVisible(true);
  };

  const handleSelectButtonClick = (e) => {
    e.stopPropagation();
    const newSelected = !isSelected;
    setSelected(newSelected);
    onSelect(newSelected);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(false);
  };

  return (
    <>
      <PanelItem className={isSelected ? 'selected' : ''} onClick={handlePanelClick}>
        <Image src={panelimages} />
        <Overlay className="overlay">
          <InfoButton onClick={handleDetailsClick}>패널정보 상세보기</InfoButton>
          <InfoButton onClick={handleSelectButtonClick}>
            {isSelected ? '✅ 패널 선택됨' : '패널 선택하기'}
          </InfoButton>
        </Overlay>
        <PanelDetails>
          <p>{gender === "M" ? "남성" : "여성"}({age}세) | {job}</p>
          <strong>{comment}</strong>
          <ol>
            {tags}
          </ol>
        </PanelDetails>
      </PanelItem>
      {isDetailsVisible && (
        <DetailsModal 
          onClose={handleCloseDetails} 
          lifeStyle={lifeStyle} 
          consumption={consumption} 
          productGroup={productGroup} 
        />
      )}
    </>
  );
};

const DetailsModal = ({ onClose, lifeStyle, consumption, productGroup }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>패널 상세 정보</h2>
        <p><strong>라이프 스타일:</strong> {lifeStyle}</p>
        <p><strong>소비 성향:</strong> {consumption}</p>
        <p><strong>관심 제품군:</strong> {productGroup}</p>
      </ModalContent>
    </ModalOverlay>
  );
};

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
  width: 80%;
  max-width: 600px;
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

const PanelItem = styled.li`
  position: relative;
  max-width: 295px;
  overflow: hidden;
  background: #F4F4F4;
  border-radius: 15px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border 0.3s ease-in-out;

  &.selected {
    border: 2px solid ${palette.blue};
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 15px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const InfoButton = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const PanelDetails = styled.div`
  padding: 20px;
  text-align: left;

  p {
    font-size: 0.88rem;
    font-weight: 400;
  }

  strong {
    font-size: 1.25rem;
  }

  ol {
    display: flex;
    gap: 8px;
    font-size: 0.88rem;
    color: #999;
    margin-top: 8px;
  }
`;

export default MoleculePanelItem;
