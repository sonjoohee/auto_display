// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismBizExpertSelect.jsx

import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';

import { useAtom } from 'jotai';
import {
  IS_CLICK_EXPERT_SELECT,
  SELECTED_EXPERT_INDEX,
  APPROACH_PATH,
} from '../../../AtomStates';

const OrganismBizExpertSelect = () => {
  const [isClickExpertSelect, setIsClickExpertSelect] = useAtom(IS_CLICK_EXPERT_SELECT);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  const handledExpertSelect = (index) => {
    setSelectedExpertIndex(index);
    setIsClickExpertSelect(true);
    setApproachPath(1);
  }
  
  return (
    <BizExpertSelectContainer>
      <h1>홈케어 뷰티 디바이스와 기능성화장품에 대해 전문가에게 직접 확인해보세요</h1>
      <SelectOptions>
        <div>
          <img src={images.ImgChat} alt="" />
          <p>10차시 전략 다회차 1:1 커피챗하기</p>
          <button type="button" onClick={() => handledExpertSelect(1)}>시작하기</button>
        </div>
        <div>
          <img src={images.ImgWrite} alt="" />
          <p>브랜드 전문가의 10초 맞춤 제안서 받기</p>
          <button type="button" onClick={() => handledExpertSelect(2)}>시작하기</button>
        </div>
        <div>
          <img src={images.ImgTarget} alt="" />
          <p>지금 바로 만나 타겟 고객 확인하기</p>
          <button type="button" onClick={()=> handledExpertSelect(3)}>시작하기</button>
        </div>
      </SelectOptions>
    </BizExpertSelectContainer>
  );
};

export default OrganismBizExpertSelect;

const BizExpertSelectContainer = styled.div`
  text-align:left;
  margin: 48px auto 0;
  padding-top: 30px;
  border-top:1px solid ${palette.lineGray};

  h1 {
    font-size:0.88rem;
    font-weight:500;
    color:${palette.gray};
    margin-bottom:20px;
  }
`;

const SelectOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > div {
    display: flex;
    align-items:center;
    gap:12px;
    padding:14px 20px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};

    p {
      color:${palette.gray};
    }

    button {
      position:relative;
      font-family: 'Pretendard';
      font-size:0;
      color:${palette.gray};
      width:22px;
      height:22px;
      margin-left:auto;
      border-radius:50px;
      border:0;
      background:rgba(0,0,0,.05);

      &:before {
        position:absolute;
        left:30%;
        top:50%;
        transform:translateY(-50%) rotate(45deg);
        width:7px;
        height:7px;
        border-top:1px solid ${palette.gray};
        border-right:1px solid ${palette.gray};
        content:'';
      }
    }
  }
`;
