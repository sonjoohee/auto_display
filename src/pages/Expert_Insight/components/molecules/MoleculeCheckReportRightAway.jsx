import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  iS_CLICK_CHECK_REPORT_RIGHTAWAY,
  EXPERT_BUTTON_STATE,
} from '../../../AtomStates';

import { palette } from '../../../../assets/styles/Palette';

const MoleculeCheckReportRightAway = () => {
  const [isClickCheckReportRightAway, setIsClickCheckReportRightAway] = useAtom(iS_CLICK_CHECK_REPORT_RIGHTAWAY);
  const [expertButtonState, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE);
  const handleClick = () => {
    setIsClickCheckReportRightAway(true);
    setExpertButtonState(1); // 버튼 클릭 시 EXPERT_BUTTON_STATE를 1로 설정
  };
  return (
    <>
      <ButtonWrap>
      <button onClick={handleClick}>
          보고서 바로 확인하기
      </button>
      </ButtonWrap>
    </>
  );
};

export default MoleculeCheckReportRightAway;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 15px;

  button {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Pretendard';
    font-size: 0.875rem;
    color: ${palette.darkGray};
    border: 0;
    background: none;
    margin-right: 10px;
  }

  > button {
    padding: 8px 16px;
    border-radius: 40px;
    border: 1px solid ${palette.lineGray};
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
    
`;
