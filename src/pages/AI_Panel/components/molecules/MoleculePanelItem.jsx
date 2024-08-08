// MoleculePanelItem.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import panelimages from "../../../../assets/images/panel/PanelImage.png"
import MoleculePanelItemDetail from './MoleculePanelItemDetail';
import { useAtom } from 'jotai';
import { 
} from "../../../AtomStates";
import timeCode from '../../assets/time-code.json';

const MoleculePanelItem = ({ id, imgSrc, gender, age, job, address, subAddress, comment, tags, onSelect, lifeStyle, consumption, productGroup, 
  target_1, target_2, target_3, target_4, target_5, value_1, value_2, value_3, value_4, value_5,}) => {
  
  const [maxBehabioralType, setMaxBehabioralType] = useState("");
  const [maxUtilizationTime, setMaxUtilizationTime] = useState(0);

  const [isSelected, setSelected] = useState(false);
  const [isDetailsVisible, setDetailsVisible] = useState(false);
  
  // 행동타입 검색을 했을 때 최대 시간량 데이터를 찾는 로직
  useEffect(() => {
    if (target_1) {
      const maxTime = Math.max(value_1, value_2, value_3, value_4, value_5);
      setMaxUtilizationTime(maxTime);

      let maxType;
      if (maxTime === value_1) {
        maxType = target_1;
      } else if (maxTime === value_2) {
        maxType = target_2;
      } else if (maxTime === value_3) {
        maxType = target_3;
      } else if (maxTime === value_4) {
        maxType = target_4;
      } else {
        maxType = target_5;
      }
      setMaxBehabioralType(timeCode[maxType]);
    }
  }, [target_1, value_1, value_2, value_3, value_4, value_5, setMaxUtilizationTime, setMaxBehabioralType]);
  
  const handlePanelClick = (e) => {
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    const newSelected = !isSelected;
    setSelected(newSelected);
    onSelect(newSelected, id);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    setDetailsVisible(true);
  };

  const handleSelectButtonClick = (e) => {
    e.stopPropagation();
    const newSelected = !isSelected;
    setSelected(newSelected);
    onSelect(newSelected, id);
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
          
          {maxBehabioralType && maxUtilizationTime<60 && <><strong>{maxBehabioralType}에 {maxUtilizationTime}분이상 활용하고 있어요</strong><br/><br/></>}
          {maxBehabioralType && maxUtilizationTime%60===0 && <><strong>{maxBehabioralType}에 {maxUtilizationTime/60}시간이상 활용하고 있어요</strong><br/><br/></>}
          {maxBehabioralType && maxUtilizationTime>=60 && maxUtilizationTime%60!==0 && <><strong>{maxBehabioralType}에 {Math.floor(maxUtilizationTime/60)}시간 {maxUtilizationTime%60}분이상 활용하고 있어요</strong><br/><br/></>}
          {!maxBehabioralType && <strong>{comment}</strong>}
          <ol>
            {tags}
          </ol>
        </PanelDetails>
      </PanelItem>
      {isDetailsVisible && (
        <MoleculePanelItemDetail
          gender={gender}
          age={age}
          job={job}
          address={address} 
          onClose={handleCloseDetails} 
          lifeStyle={lifeStyle} 
          consumption={consumption} 
          productGroup={productGroup} 
          isSelected={isSelected}
          tags={tags}
          toggleSelection={handleSelectButtonClick}
        />
      )}
    </>
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
    margin-bottom: 8px;
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
