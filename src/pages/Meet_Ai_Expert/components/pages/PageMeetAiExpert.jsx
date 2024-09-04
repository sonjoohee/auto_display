import React, { useEffect, useState } from "react";
import styled, { css } from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  APPROACH_PATH, 
  ANALYSIS_BUTTON_STATE,
} from '../../../AtomStates';

import { Link } from "react-router-dom";

import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

import OrganismHeader from '../../../organisms/OrganismHeader';
import OrganismLeftSideBar from '../../../Expert_Insight/components/organisms/OrganismLeftSideBar';

const PageMeetAiExpert = () => {

  const navigate = useNavigate();
  const [buttonState, setButtonState] = useAtom(ANALYSIS_BUTTON_STATE);

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO); // 상태값으로 설정
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  useEffect(() => {
    setSelectedExpertIndex(SELECTED_EXPERT_INDEX);
  }, []);
  
  useEffect(() => {
    const checkboxes = document.querySelectorAll('.accordion-toggle');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    });

    // Cleanup 이벤트 리스너
    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener('change', () => {});
      });
    };
  }, []);

  const handledExpertSelect = (index) => {
    if (index === 0) {
        setApproachPath(-1);  // 검색을 통해 들어가는 경우
        setButtonState(1);  // 버튼 상태를 1로 설정
    } else {
        setApproachPath(1);
        setInputBusinessInfo(""); // 또는 null, undefined로 초기화
    }

    setSelectedExpertIndex(index);
    navigate("/ExpertInsight");
  }

  return (
    <div>
      {/* <OrganismHeader /> */}

      <ContentsWrap>
        <OrganismLeftSideBar />

        <MainContent>
          <Title>
            Meet AI Expert
            <p>한 줄의 아이디어로 시작하는, AI 전문가와의 맞춤형 인사이트 세션</p>
          </Title>

          <InputWrap>
            <div className="inputWrap">
              <textarea 
                placeholder="당신의 아이템 또는 프로젝트 아이디어를 적어 주세요 (예: 원격 근무자를 위한 생산성 관리 툴)"
                onChange={(e) => setInputBusinessInfo(e.target.value)}
              ></textarea>
              <button type="button" onClick={() => handledExpertSelect(0)}>검색</button>
            </div>
            <div className="maxLetter">
              <span>0/300</span>
            </div>
          </InputWrap>

          <ExpertSelectWrap>
            <h2><img src={images.Chat} alt="" />AI 전문가 선택해서 시작하기</h2>

            <ExpertSelectBox>
              <ExpertCard onClick={() => handledExpertSelect(1)}>
                <span><img src={images.IconChat} alt="" /></span>
                <p>가볍게 시작하는 내 비즈니스 전략 팁</p>
                <strong>전략 디렉터와 1:1 커피챗</strong>
              </ExpertCard>
              <ExpertCard onClick={() => handledExpertSelect(2)}>
                <span><img src={images.IconWrite} alt="" /></span>
                <p>지금 바로 쓸 수 있는 브랜딩 솔루션</p>
                <strong>10초 맞춤 제안서 받기</strong>
              </ExpertCard>
              <ExpertCard onClick={() => handledExpertSelect(3)}>
                <span><img src={images.IconTarget2} alt="" /></span>
                <p>고객 데이터 전문가의 맞춤 타겟 추천</p>
                <strong>당장 만나야할 고객은?</strong>
              </ExpertCard>
              <ExpertCard More>
                <div>
                  {/* <span>More</span> */}
                  <p>Coming Soon</p>
                </div>
              </ExpertCard>
            </ExpertSelectBox>
          </ExpertSelectWrap>
        </MainContent>
      </ContentsWrap>
    </div>
  );
};

export default PageMeetAiExpert;

// 스타일 정의는 기존대로 유지

const MainContent = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
  // height:100%;
  justify-content:center;  
`;

const ContentsWrap = styled.div`
  position: relative;
  width: calc(100% - 40px);
  display:flex;
  gap:40px;
  flex-direction:row;
  // height:100dvh;
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:8px;
  // font-size:3.13rem;
  font-size:2rem;
  font-weight:600;
  // margin:0 auto 55px;
  margin:120px auto 55px;

  p {
    // font-size:1.25rem;
    font-size:0.88rem;
    font-weight:400;
  }
`;

const InputWrap = styled.div`
  // max-width:1000px;
  max-width:820px;
  width:100%;
  display:flex;
  flex-direction:column;
  margin:0 auto;
  border-radius:20px;
  border:1px solid ${palette.lineGray};
  background:${palette.white};
  box-shadow:0 4px 30px rgba(0,0,0,.15);
  overflow:hidden;

  .inputWrap {
    display:flex;
    justify-content:space-between;
    gap:20px;
    // padding:28px 38px;
    padding:28px;

    textarea {
      width:100%;
      height:40px;
      font-family: 'Pretendard', 'Poppins';
      font-size:1rem;
      outline:0;
      border:0;
      resize:none;

      &::placeholder {
        color:${palette.gray};
      }
    }

    button {
      flex-shrink:0;
      width:27px;
      height:27px;
      font-size:0;
      border:0;
      background:url(${images.IconSearch}) center no-repeat;
    }
  }

  .maxLetter {
    display:flex;
    justify-content:flex-end;
    font-size:0.75rem;
    padding:15px 35px;
    border-top:1px solid ${palette.lineGray};
    background:#EBF3FE;
  }
`;

const ExpertSelectWrap = styled.div`
  position:relative;
  max-width:1240px;
  width:100%;
  margin:120px auto 100px;

  h2 {
    display:flex;
    align-items:center;
    gap:12px;
    font-size:1rem;
    font-weight:500;
    margin-bottom:22px;
  }

  a {
    font-size:1.25rem;
    text-decoration:underline;
    color:${palette.black};

    &:hover {
      color:${palette.black};
    }
  }
`;

const ExpertSelectBox = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:20px;
  // margin-bottom:30px;

  > div {
    flex:1 1 20%;
  }
`;

const ExpertCard = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  height:280px;
  text-align:left;
  padding:40px;
  border-radius:16px;
  border: ${props => {
    if (props.select) return `1px solid ${palette.blue}`;
    else if (props.More) return `none`;
    else return `1px solid ${palette.lineGray}`;
  }};
  background: ${props => {
    if (props.select) return palette.blue;
    else if (props.More) return `rgba(0,0,0,.03)`;
    else return palette.white;
  }};
  box-shadow: ${props => {
    if (props.select) return `0 4px 30px rgba(0, 0, 0, 0.1)`;
    else return `none`;
  }};
  cursor: ${props => {
    if (props.More) return `auto`;
    else return `pointer`;
  }};
  pointer-events: ${props => {
    if (props.More) return `auto`;
    else return `auto`;
  }};
  transition:all .5s;

  span {
    position:relative;
    width:64px;
    height:64px;
    border-radius:100px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};

    img {
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
    }
  }

  p {
    font-size:0.88rem;
    font-weight:400;
    color:${(props) => (props.select ? palette.white : palette.lightGray)};
    margin-top:auto;
  }

  strong {
    font-size:1.25rem;
    font-weight:700;
    color:${(props) => (props.select ? palette.white : palette.darkGray)};
    letter-spacing:-1px;
  }

  &:hover {
    border:1px solid ${palette.blue};
    background:${palette.blue};

    p, strong {
      color:${palette.white};
    }
  }

  ${props =>
    props.More &&
    css`
      div {
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
        gap:16px;
        height:100%;

        span {
          position:relative;
          font-size:0;
          border:0;

          &:before, &:after {
            position:absolute;
            left:50%;
            top:50%;
            transform:translate(-50%, -50%);
            width:20px;
            height:5px;
            border-radius:2px;
            background:#E8E8E8;
            content:'';
          }
          &:before {
            width:20px;
            height:5px;
          }
          &:after {
            width:5px;
            height:20px;
          }
        }

        p {
          color:${palette.gray};
          margin-top:0;
        }
      }

      &:hover {
        border:none;
        background:rgba(0,0,0,.03);

        p, strong {
          color:${palette.gray};
        }
      }
    `
  }
`;

const FAQSection = styled.div`
  width: 100%;
  max-width:1210px;
  text-align:left;

  h2 {
    display:flex;
    align-items:center;
    gap:8px;
    font-size:1rem;
    font-weight:400;
    color:${palette.gray};
    margin-bottom:22px;

    select {
      font-family: 'Pretendard';
      font-size:1rem;
      padding:10px 12px;
      border-radius:30px;
      border:1px solid ${palette.lineGray};
    }
  }
`;

const AccordionMenu = styled.div`
  width: 100%;
  display:flex;
  flex-direction:column;
  gap:20px;
`;

const AccordionItem = styled.div`
  .accordion-toggle {
    display: none;
  }

  .accordion-label {
    position:relative;
    display:flex;
    align-items:center;
    gap:16px;
    font-size:1.13rem;
    font-weight:400;
    color:${palette.gray};
    padding:14px 24px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};
    background:none;
    cursor:pointer;

    &:after {
      position:absolute;
      right:26px;
      top:48%;
      transform:translateY(-50%) rotate(45deg);
      width:8px;
      height:8px;
      border-right:1px solid ${palette.black};
      border-bottom:1px solid ${palette.black};
      transition:all .5s;
      content:'';
    }

    &:before {
      position:absolute;
      right:20px;
      top:50%;
      transform:translateY(-50%);
      width:22px;
      height:22px;
      border-radius:50px;
      background:rgba(0,0,0,.05);
      content:'';
    }
  }

  .accordion-toggle:checked + .accordion-label:after {
    transform:translateY(-20%) rotate(-135deg);
  }

  .accordion-toggle:checked + .accordion-label + div {
    max-height: 1000px;
    margin-top:20px;
    padding:0 16px;
  }
`;

const AccordionContent = styled.div`
  max-height: 0;
  font-size:1.13rem;
  color:${palette.gray};
  overflow: hidden;
  padding: 0 16px;
  transition: max-height 0.5s ease, padding 0.5s ease;

  > div + div {
    margin-top:30px;
  }
`;
