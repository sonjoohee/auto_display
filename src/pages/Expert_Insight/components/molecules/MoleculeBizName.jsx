// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\molecules\MoleculeBizName.jsx

import React, { useState } from 'react';
import styled from 'styled-components';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';

const MoleculeBizName = ({ bizName }) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 아이디어 분석 완료시 */}
      
      <BizNameContainer>
        <div>
          <span><img src={images.Graph} alt="" /></span>
          <NameTitle>
            <strong>
              {bizName || "비즈니스 이름을 입력하세요"}
              <Badge>Edited by AI</Badge>
            </strong>
            <p>10 min ago</p>
          </NameTitle>
        </div>
        <button type="button" onClick={toggleMenu}>내가 쓴 설명 보기</button>

        {isOpen && (
        <AutosavePopup>
          <strong>
            <span>일시 : 2024년 8월 28일</span>
            내가 작성한 아이템 및 아이디어 설명
          </strong>
          <p>유데미 큐레이션 이벤트 페이지를 이용하려는 20대 여자 취업준비생인데 부트캠프, 자격증패키지, 기획전,스터디모임 등등을 알아보려하는 모습</p>
        </AutosavePopup>
      )}
      </BizNameContainer>
    

      {/* 아이디어 설명 입력 데이터만 있는 경우 */}
      {/*
      <BizNameContainer>
        <div>
          <span><img src={images.Graph} alt="" /></span>
          <NameTitle>
            <strong>
              {bizName || "비즈니스 이름을 입력하세요"}
            </strong>
            <p>10 min ago</p>
          </NameTitle>
        </div>
      </BizNameContainer>
    */}

      {/* 아이디어 설명 없는 경우 */}
      {/* 
      <BizNameContainer>
        <div>
          <span><img src={images.Graph} alt="" /></span>
          <NameTitle Nodata>
            <strong>
              {bizName || "아이템(아이디어)를 설명해주시면, 분석된 내용이 적용됩니다"}
            </strong>
            <p>10 min ago</p>
          </NameTitle>
        </div>
      </BizNameContainer>
      */}
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
    font-size:1.5rem;
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
