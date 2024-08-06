import React, { useState } from 'react';
import styled from 'styled-components';
import AtomCheckbox from '../atoms/AtomCheckbox';
import { palette } from '../../../../assets/styles/Palette';
import { useAtom } from "jotai";
import { 
  VIEW_PANEL_TYPE,
} from "../../../AtomStates";

const MoleculePanelControls = ({ selectedCount, loadedPanelCount }) => {
  const [viewPanelType, setViewPanelType] = useAtom(VIEW_PANEL_TYPE);
   
  return (
    <ControlsWrapper>
      <AtomCheckbox id="allChk" label="전체 선택" />
      <ChoicePanel>
        {loadedPanelCount}명의 패널 중 <strong>{selectedCount}</strong>명의 패널을 선택하셨어요
      </ChoicePanel>
      <ViewList>
        <input
          type="radio"
          id="setCardType"
          name="viewGroup"
          value="card"
          onClick={() => setViewPanelType(true)}
        />
        <label for="setCardType">카드보기</label>
        <input
          type="radio"
          id="setListType"
          name="viewGroup"
          value="list"
          onClick={() => setViewPanelType(false)}
        />
        <label for="setListType">목록보기</label>
      </ViewList>
    </ControlsWrapper>
  );
};

export default MoleculePanelControls;

const ControlsWrapper = styled.div`
  .sortBooth {
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:32px;
  }
    
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