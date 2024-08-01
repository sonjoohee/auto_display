// MoleculePanelItem.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../assets/styles/Palette';
import MoleculePanelItemDetail from './MoleculePanelItemDetail';

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

const MoleculePanelItem = ({ id, name, gender, age, address, job, tag, lifeStyle, consumptionPropensity, productGroup, onSelect }) => {
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
        <PanelDetails>
          <p>{name} | {job}</p>
          <strong>{lifeStyle}</strong>
          <ol>
            {(tag ? tag.split(',') : []).map((t, index) => (
              <li key={index}>{t.trim()}</li>
            ))}
          </ol>
        </PanelDetails>
        <Overlay className="overlay">
          <InfoButton onClick={handleDetailsClick}>패널정보 상세보기</InfoButton>
          <InfoButton onClick={handleSelectButtonClick}>
            {isSelected ? '✅ 패널 선택됨' : '패널 선택하기'}
          </InfoButton>
        </Overlay>
      </PanelItem>
      {isDetailsVisible && (
        <MoleculePanelItemDetail 
          onClose={handleCloseDetails} 
          imgSrc={null} // 이미지가 필요하면 해당 속성 추가
          altText={`${name}의 이미지`}
          description={`${name} | ${job}`}
          lifeStyle={lifeStyle}
          consumption={consumptionPropensity}
          interest={productGroup}
          tags={tag ? tag.split(',').map(t => t.trim()) : []}
          isSelected={isSelected}
          toggleSelection={handleSelectButtonClick}
        />
      )}
    </>
  );
};

export default MoleculePanelItem;
