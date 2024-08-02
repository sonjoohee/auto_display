import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import AtomCheckbox from '../atoms/AtomCheckbox';
import { palette } from '../../assets/styles/Palette';

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const ChoicePanel = styled.div`
  strong {
    font-weight: 400;
    margin: 0 12px;
    padding: 4px 20px;
    border-radius: 10px;
    background: rgba(4, 83, 244, 0.1);
  }
`;

const ViewList = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;

  input[type="radio"] {
    opacity: 0;
  }

  input[type="radio"] + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
  }
`;

const MoleculePanelControls = ({ selectedCount, onViewChange, onSelectAll, loadedPanelCount }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectAll = useCallback(() => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onSelectAll(newCheckedState);
  }, [isChecked, onSelectAll]);


  return (
    <ControlsWrapper>
      <AtomCheckbox id="allChk" label="전체 선택" checked={isChecked} onChange={handleSelectAll} />
      <ChoicePanel>
        {loadedPanelCount}명의 패널 중 <strong>{selectedCount}</strong>명의 패널을 선택하셨어요
      </ChoicePanel>
      <ViewList>
        <input
          type="radio"
          id="setCardType"
          name="viewGroup"
          value="card"
          onChange={onViewChange}
        />
        <label htmlFor="setCardType">카드보기</label>
        <input
          type="radio"
          id="setListType"
          name="viewGroup"
          value="list"
          onChange={onViewChange}
        />
        <label htmlFor="setListType">목록보기</label>
      </ViewList>
    </ControlsWrapper>
  );
};

export default MoleculePanelControls;
