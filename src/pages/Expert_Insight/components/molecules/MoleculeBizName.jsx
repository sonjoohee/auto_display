// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\molecules\MoleculeBizName.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';

import { useAtom } from 'jotai';
import {
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  APPROACH_PATH,
} from '../../../AtomStates';

const MoleculeBizName = () => {
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);

  return (
    <>
      <BizNameContainer>
        <div>
          <span><img src={images.Graph} alt="" /></span>
          <NameTitle Nodata={!inputBusinessInfo}>
            <strong>
              {!inputBusinessInfo ? "아이템(아이디어)를 설명해주시면, 분석된 내용이 적용됩니다" 
              : !titleOfBusinessInfo ? inputBusinessInfo : titleOfBusinessInfo}
              {titleOfBusinessInfo && <Badge>Edited by AI</Badge>}
            </strong>
            <p>2024-09-03</p>
          </NameTitle>
        </div>
        {titleOfBusinessInfo && <button type="button">내가 쓴 설명 보기</button>}
      </BizNameContainer>
    </>
  );
};

export default MoleculeBizName;

const BizNameContainer = styled.div`
  position: sticky;
  top: 40px;
  width: 100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:16px 20px;
  margin-bottom:47px;
  text-align: center;
  border-radius:15px;
  border:1px solid ${palette.lineGray};
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
    font-size:1rem;
    font-weight:700;
    text-align:left;
    color: ${props => {
      if (props.Nodata) return palette.gray;
      else return palette.black;
    }};
  }

  p {
    font-size:0.75rem;
    color:${palette.gray};
    text-align:left;
  }
`;

const Badge = styled.div`
  font-size:0.63rem;
  font-weight:400;
  color:${palette.blue};
  text-align:center;
  padding:2px 6px;
  border-radius:10px;
  background:#E2E8FE;
`;

const AutosavePopup = styled.div`
  position:absolute;
  right:-70px;
  top:77px;
  max-width:304px;
  flex-direction:column;
  gap:20px !important;
  text-align:left;
  padding:24px;
  border-radius:20px;
  background:${palette.white};
  box-shadow:0 4px 20px rgba(0,0,0,.2);

  &:before {
    position:absolute;
    top:-12px;
    left:50%;
    transform:translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 20px 12px 20px;
    border-color: transparent transparent ${palette.white} transparent;
    filter:drop-shadow(0 4px 20px rgba(0,0,0,.2));
    content:'';
    zindex:0;
  }

  strong {
    font-size:0.75rem;
    font-weight:700;
    color:${palette.gray};
    display:flex;
    flex-direction:column;
    gap:4px;
    width:100%;
  }

  span {
    font-size:0.63rem;
    font-weight:300;
  }

  p {
    font-size:0.75rem;
    line-height:1.5;
  }
`;
