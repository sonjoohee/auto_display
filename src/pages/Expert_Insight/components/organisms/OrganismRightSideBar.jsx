// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismRightSideBar.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import panelimages from '../../../../assets/styles/PanelImages';

import { Link } from "react-router-dom";
import { useAtom } from 'jotai';
import { SELECTED_EXPERT_INDEX } from '../../../AtomStates';

// const experts = [
//   {
//     id: 1,
//     title: '서비스/프로덕트 전략가',
//     description: '10년 경력 시장에서 통하는 전략을 확인해보세요',
//     details: '서비스와 프로덕트에 대한 깊이 있는 전략을 제시합니다. 다양한 성공 사례를 통해 실질적인 인사이트를 제공합니다.',
//   },
//   {
//     id: 2,
//     title: '마케팅 구축',
//     description: '브랜드/마케팅 교수와의 컨설팅 미팅',
//     details: '브랜드 구축과 마케팅 전략에 대한 깊이 있는 이해를 바탕으로 스타트업의 성장 로드맵을 제시합니다.',
//   },
//   {
//     id: 3,
//     title: '고객 인사이트 전문가',
//     description: '고객 이탈 극복 노하우 비즈니스 팁을 공유해요',
//     details: '고객 분석을 통해 비즈니스의 핵심 문제를 파악하고 이를 해결할 수 있는 전략을 제안합니다.',
//   },
// ];

const experts = [
  {
    id: 1,
    name: '김도원',
    title: '제품 전략가',
    description: '제품 전략 총괄 디렉터',
  },
  {
    id: 2,
    name: '이지현',
    title: '마케팅 구축',
    description: '마케팅 구축 총괄 디렉터',
  },
  {
    id: 3,
    name: '박서연',
    title: '고객 인사이트 전문가',
    description: '고객 인사이트 디렉터',
  },
];

const OrganismRightSideBar = () => {

  const [isOpen, setIsOpen] = useState(true);
  const moreProfile = () => {
    setIsOpen(!isOpen);
  };

  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);

  const selectedExpert = experts.find((expert) => expert.id === selectedExpertIndex);

  if (!selectedExpert) return null; // 선택된 전문가가 없을 경우 아무것도 표시하지 않음

  return (
    <>
      <SideBar Right>
        <AIProfileWrap>
          <div>
            {/* <h3>담당 AI 전문가</h3> */}

            <AIProfile>
              <div className="profileInfo">
                <div className="thumb">
                  <img src={panelimages.PanelIMG} alt="" />
                </div>
                <div className="name">
                  <strong>{selectedExpert.title}</strong>
                  <ul>
                    <li>이름 : {selectedExpert.name}</li>
                    <li>주요경력 : {selectedExpert.description}</li>
                  </ul>
                </div>
              </div>

              <FieldWrap isOpen={isOpen}>
                <strong>주요 이력</strong>
                <div>
                  <FieldUl isOpen={isOpen}>
                    <li>삼성전자 갤럭시 시리즈 기획</li>
                    <li>카카오 신규 서비스 개발 총괄</li>
                    <li>네이버 제품 전략 총괄</li>
                    <li>MIT슬론 경영대학원 MBA</li>
                    <li>서울대학교 경영학과 졸업</li>
                  </FieldUl>
                </div>
              </FieldWrap>

              <div className="field">
                <strong>
                  {/* <img src={images.IconChatSmile} alt="" /> */}
                  전문분석 분야
                </strong>

                <div>
                  <strong><img src={images.ProfessionalValue} alt="" />핵심 가치 제안 분석</strong>
                  <FieldUl isOpen={isOpen}>
                    <li>문제 해결과 니즈 파악</li>
                    <li>핵심 이점 식별</li>
                    <li>독특한 가치 제안 도출</li>
                  </FieldUl>
                  <strong><img src={images.ProfessionalRoadmap} alt="" />제품 개발 로드맵 구상</strong>
                  <FieldUl isOpen={isOpen}>
                    <li>최소 기능 제품 정의</li>
                    <li>장기적 제품 비전 검토</li>
                    <li>기술적 확장성 계획</li>
                  </FieldUl>
                  <strong><img src={images.ProfessionalPositioning} alt="" />제품 포지셔닝 전략</strong>
                  <FieldUl isOpen={isOpen}>
                    <li>시장 내 제품/서비스 포지셔닝</li>
                    <li>차별화 요소(USP) 식별</li>
                    <li>브랜드와 제품 일관성 검토</li>
                  </FieldUl>
                </div>
              </div>
            </AIProfile>

            <button type="button" onClick={moreProfile}>상세 정보 확인하기</button>
          </div>
        </AIProfileWrap>

        {/* <IdeaWrap>
          <strong>김도원 디렉터님의 추천 사항이에요</strong>

          <div>
            <Link to="#">
              <svg width="13" height="13" viewBox="0 0 21 21" fill="#ABABAB" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0674 13.3651H14.1407L13.8122 13.0486C15.22 11.4077 15.9473 9.16911 15.5484 6.78983C14.9971 3.53149 12.2753 0.929517 8.99053 0.531016C4.02811 -0.078456 -0.148303 4.09408 0.461735 9.0519C0.860606 12.3337 3.465 15.0529 6.72635 15.6037C9.10785 16.0022 11.3486 15.2756 12.991 13.8691L13.3077 14.1973V15.1232L18.2936 20.1044C18.7746 20.585 19.5606 20.585 20.0416 20.1044C20.5226 19.6239 20.5226 18.8386 20.0416 18.3581L15.0674 13.3651ZM8.02855 13.3651C5.10741 13.3651 2.74938 11.0092 2.74938 8.09081C2.74938 5.17238 5.10741 2.81654 8.02855 2.81654C10.9497 2.81654 13.3077 5.17238 13.3077 8.09081C13.3077 11.0092 10.9497 13.3651 8.02855 13.3651Z" fill="#ABABAB"/>
              </svg>
              "이런 페르소나"의 의견 들어보기
            </Link>
            <Link to="#">
              <svg width="13" height="13" viewBox="0 0 21 21" fill="#ABABAB" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0674 13.3651H14.1407L13.8122 13.0486C15.22 11.4077 15.9473 9.16911 15.5484 6.78983C14.9971 3.53149 12.2753 0.929517 8.99053 0.531016C4.02811 -0.078456 -0.148303 4.09408 0.461735 9.0519C0.860606 12.3337 3.465 15.0529 6.72635 15.6037C9.10785 16.0022 11.3486 15.2756 12.991 13.8691L13.3077 14.1973V15.1232L18.2936 20.1044C18.7746 20.585 19.5606 20.585 20.0416 20.1044C20.5226 19.6239 20.5226 18.8386 20.0416 18.3581L15.0674 13.3651ZM8.02855 13.3651C5.10741 13.3651 2.74938 11.0092 2.74938 8.09081C2.74938 5.17238 5.10741 2.81654 8.02855 2.81654C10.9497 2.81654 13.3077 5.17238 13.3077 8.09081C13.3077 11.0092 10.9497 13.3651 8.02855 13.3651Z" fill="#ABABAB"/>
              </svg>
              "이런 페르소나"의 의견 들어보기
            </Link>
            <Link to="#">
              <svg width="13" height="13" viewBox="0 0 21 21" fill="#ABABAB" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0674 13.3651H14.1407L13.8122 13.0486C15.22 11.4077 15.9473 9.16911 15.5484 6.78983C14.9971 3.53149 12.2753 0.929517 8.99053 0.531016C4.02811 -0.078456 -0.148303 4.09408 0.461735 9.0519C0.860606 12.3337 3.465 15.0529 6.72635 15.6037C9.10785 16.0022 11.3486 15.2756 12.991 13.8691L13.3077 14.1973V15.1232L18.2936 20.1044C18.7746 20.585 19.5606 20.585 20.0416 20.1044C20.5226 19.6239 20.5226 18.8386 20.0416 18.3581L15.0674 13.3651ZM8.02855 13.3651C5.10741 13.3651 2.74938 11.0092 2.74938 8.09081C2.74938 5.17238 5.10741 2.81654 8.02855 2.81654C10.9497 2.81654 13.3077 5.17238 13.3077 8.09081C13.3077 11.0092 10.9497 13.3651 8.02855 13.3651Z" fill="#ABABAB"/>
              </svg>
              "이런 페르소나"의 의견 들어보기
            </Link>
          </div>
        </IdeaWrap> */}
      </SideBar>
    </>
  );
};

export default OrganismRightSideBar;

const SideBar = styled.div`
  position:sticky;
  top:40px;
  right:40px;
  grid-area:toc;
  width:100%;
  max-width:240px;
  height:calc(100vh - 200px);
  // height:calc(100vh - 12rem);
  margin-left:${props => {
    if (props.Right) return `0`;
    else return `-300px`;
  }};
  margin-right:0;
  // margin-bottom:150px;
  padding:${props => {
    if (props.Right) return `0`;
    else return `40px 28px`;
  }};
  border-radius:20px;
  border:${props => {
    if (props.Right) return `none`;
    else return `1px solid ${palette.lineGray}`;
  }};
  background:${props => {
    if (props.Right) return palette.white;
    else return `rgba(0,0,0,.02)`;
  }};

  box-shadow:${props => {
    if (props.Right) return `none`;
    else return `0 4px 10px rgba(0,0,0,.1)`;
  }};

  h3 {
    font-size:1rem;
    font-weight:400;
    text-align:left;
    margin-bottom:20px;
  }

  .logo {
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:40px;

    a {
      width:44px;
      height:44px;
      font-size:0;
      background:url(${images.SymbolLogo}) left center no-repeat;
      background-size:auto 100%;
    }

    button {
      position:relative;
      font-size:0;
      width:30px;
      height:30px;
      border-radius:50%;
      border:0;
      background:${palette.white};
      box-shadow:2px 2px 2px rgba(0,0,0,.1);

      &:before {
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        width:7px;
        height:2px;
        border-radius:10px;
        background:${palette.black};
        content:'';
      }

      &:after {
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%) rotate(45deg);
        width:8px;
        height:8px;
        border-left:2px solid ${palette.black};
        border-bottom:2px solid ${palette.black};
        content:'';
      }
    }
  }
`;

const AIProfileWrap = styled.div`
  padding:24px 20px 20px;
  border-radius:20px;
  border:1px solid ${palette.lineGray};
  box-shadow:0 4px 10px rgba(0,0,0,.05);
  background:${palette.white};

  + div {
    margin-top:28px;
  }

  button {
    position:relative;
    width:100%;
    font-size:0.75rem;
    color:${palette.gray};
    // text-decoration:underline;
    // padding-right:16px;
    padding:8px 16px;
    margin-top:25px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};

    &:after {
      position:absolute;
      right:0;
      top:50%;
      transform:translateY(-50%) rotate(45deg);
      width:8px;
      height:8px;
      border-top:2px solid ${palette.black};
      border-right:2px solid ${palette.black};
      // content:'';
    }
  }
`;

const AIProfile = styled.div`
  display:flex;
  flex-direction:column;

  .profileInfo {
    display:flex;
    align-items:center;
    gap:12px;
  }

  .thumb {
    position:relative;
    flex-shrink:0;
    width:48px;
    height:48px;
    margin:0 auto;
    border-radius:50%;
    overflow:hidden;

    img {
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
      width:100%;
      height:100%;
      object-fit: cover;
    }
  }

  .name {
    display:flex;
    flex-direction:column;
    gap:10px;
    text-align:left;

    strong {
      font-size:1rem;
      font-weight:700;
    }

    li {
      display:flex;
      align-items:center;
      font-size:0.75rem;
      color:${palette.darkGray};

      + li {
        margin-top:5px;
      }
    }

    p {
      color:${palette.gray};
      margin-top:15px;
    }
  }

  .field {
    display:flex;
    flex-direction:column;
    width:100%;
    margin:20px auto 0;
    padding-top:20px;
    border-top:1px solid ${palette.lineGray};

    > strong {
      display:flex;
      align-items:center;
      gap:5px;
      font-size:1rem;
      font-weight:400;
      margin-bottom:15px;
    }

    div {
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:8px;

      strong {
        display:flex;
        align-items:center;
        gap:8px;
        width:100%;
        font-size:0.88rem;
        font-weight:300;
        color:${palette.darkGray};
        // padding:8px 16px;
        // border-radius:25px;
        // border:1px solid ${palette.lineGray};
        // background:${palette.white};
      }
    }
  }
`;

const FieldWrap = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  max-height: ${(props) => (props.isOpen ? "0" : "1000px")};
  margin:20px auto 0;
  padding-top: ${(props) => (props.isOpen ? "0" : "20px")};
  overflow:hidden;
  transition: max-height 0.5s ease, padding 0.5s ease;

  strong {
    display:flex;
    align-items:center;
    gap:5px;
    font-size:1rem;
    font-weight:400;
    margin-bottom:15px;
  }

  div {
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:8px;
  }
`;

const FieldUl = styled.ul`
  width:100%;
  max-height: ${(props) => (props.isOpen ? "0" : "1000px")};
  display:flex;
  flex-direction:column;
  padding:0 8px;
  overflow:hidden;
  transition: max-height 0.5s ease, padding 0.5s ease;

  li {
    position:relative;
    font-size:0.75rem;
    line-height:1.5;
    text-align:left;
    color:${palette.darkGray};
    padding-left:20px;

    &:before {
      position:absolute;
      left:0;
      top:7px;
      width:3px;
      height:3px;
      border-radius:10px;
      background:${palette.darkGray};
      content:'';
    }
  }
`;

const IdeaWrap = styled.div`
  text-align:left;
  padding:30px;
  border-radius:20px;
  border:1px solid ${palette.lineGray};
  box-shadow:0 4px 10px rgba(0,0,0,.05);

  strong {
    display:block;
    padding-bottom:10px;
    margin-bottom:20px;
    border-bottom:1px solid ${palette.lineGray};
  }

  div {
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:20px;

    a {
      display:flex;
      align-items:flex-start;
      gap:10px;
      width:100%;
      font-size:0.81rem;
      color:${palette.gray};
    }

    svg {
      flex-shrink:0;
    }
  }
`;
