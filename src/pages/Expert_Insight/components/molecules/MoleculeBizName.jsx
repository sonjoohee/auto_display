// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\molecules\MoleculeBizName.jsx

import React from 'react';
import styled from 'styled-components';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';

const MoleculeBizName = ({ bizName }) => {
  return (
    <BizNameContainer>
      <div>
        <span><img src={images.File} alt="" /></span>
        <NameTitle>
          <strong>
            {bizName || "아이템(아이디어)를 설명해주시면, 분석된 내용이 적용됩니다"}
            <Badge>Edited by AI</Badge>
          </strong>
          <p>10 min ago</p>
        </NameTitle>
      </div>
      <button type="button">내가 쓴 설명 보기</button>
    </BizNameContainer>
  );
};

export default MoleculeBizName;

const BizNameContainer = styled.div`
  position: sticky;
  top: 150px;
  width: 100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 24px 35px;
  text-align: center;
  border-radius:15px;
  border:2px solid ${palette.black};
  background:${palette.white};
  box-shadow:0 4px 20px rgba(0,0,0,.05);
  z-index: 98;

  > div {
    display:flex;
    align-items:center;
    gap:16px;

    > span {
      position:relative;
      flex-shrink:0;
      width:42px;
      height:42px;
      border-radius:8px;
      background:${palette.black};

      > img {
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
      }
    }
  }

  > button {
    font-size:0.75rem;
    color:${palette.gray};
    letter-spacing:-1px;
    padding:8px 16px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};
    background:none;
  }
`;

const NameTitle = styled.div`
  display:flex;
  flex-direction:column;
  gap:3px;

  > strong {
    display:flex;
    align-items:center;
    gap:8px;
    font-size:1.5rem;
    font-weight:700;
    text-align:left;
  }

  p {
    font-size:0.75rem;
    color:${palette.gray};
    text-align:left;
  }
`;

const Badge = styled.div`
  font-size:0.63rem;
  color:${palette.blue};
  text-align:center;
  padding:2px 6px;
  border-radius:10px;
  background:#E2E8FE;
`;
