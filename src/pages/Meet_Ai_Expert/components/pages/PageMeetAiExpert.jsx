import React, { useEffect, useState } from "react";
import styled, { css } from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO, 
} from '../../../AtomStates';

import { Link } from "react-router-dom";

import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

import OrganismHeader from '../../../organisms/OrganismHeader';

const PageMeetAiExpert = () => {

  const navigate = useNavigate();

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);

  useEffect(() => {
    setSelectedExpertIndex(SELECTED_EXPERT_INDEX);
    setInputBusinessInfo(INPUT_BUSINESS_INFO);
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

  return (
    <div>
      <OrganismHeader />

      <Container>
        <Title>
          Meet AI Expert
          <p>한 줄의 아이디어로 시작하는, AI 전문가와의 맞춤형 인사이트 세션</p>
        </Title>

        <InputWrap>
          <div className="inputWrap">
            <textarea placeholder="당신의 아이템 또는 프로젝트 아이디어를 적어 주세요 (예: 원격 근무자를 위한 생산성 관리 툴)" onChange={(e) => setInputBusinessInfo(e.target.value)}></textarea>
            {/* <InputField None placeholder="당신의 비즈니스를 간단히 입력한 후 시작해보세요!" onChange={(e) => setInputBusinessInfo(e.target.value)}/> */}
            <button type="button" onClick={() => {setSelectedExpertIndex(0); navigate("/ExpertInsight");}}>검색</button>
          </div>
          <div className="maxLetter">
            <span>0/300</span>
          </div>
        </InputWrap>

        <ExpertSelectWrap>
          <h2><img src={images.Chat} alt="" />AI 전문가 선택해서 시작하기</h2>

          <ExpertSelectBox>
            <ExpertCard select onClick={() => {setSelectedExpertIndex(1); navigate("/ExpertInsight");}}>
              <span><img src={images.IconChat} alt="" /></span>
              <p>가볍게 시작하는 내 비즈니스 전략 팁</p>
              <strong>전략 디렉터와 1:1 커피챗</strong>
            </ExpertCard>
            <ExpertCard onClick={() => {setSelectedExpertIndex(2); navigate("/ExpertInsight");}}>
              <span><img src={images.IconWrite} alt="" /></span>
              <p>지금 바로 쓸 수 있는 브랜딩 솔루션</p>
              <strong>10초 맞춤 제안서 받기</strong>
            </ExpertCard>
            <ExpertCard onClick={() => {setSelectedExpertIndex(3); navigate("/ExpertInsight");}}>
              <span><img src={images.IconTarget2} alt="" /></span>
              <p>고객 데이터 전문가의 맞춤 타겟 추천</p>
              <strong>당장 만나야할 고객은?</strong>
            </ExpertCard>
            <ExpertCard More>
              <div>
                <span>More</span>
                <p>다른 분야 전문가가 필요하신가요?</p>
              </div>
            </ExpertCard>
          </ExpertSelectBox>

          <Link>다른 분야 전문가가 필요하신가요?</Link>
        </ExpertSelectWrap>

        {/* 
        <FAQSection>
          <h2>
            <select>
              <option value="스타트업 창업자">스타트업 창업자</option>
            </select>
            는 주로 이런 질문을 많이 해요.
          </h2>


          <AccordionMenu>
            <AccordionItem>
              <input type="checkbox" id="section1" className="accordion-toggle" />
              <label for="section1" className="accordion-label">
                우리 스타트업의 비즈니스 모델을 어떻게 검증하고 개선할 수 있을까요?
              </label>
              <AccordionContent>
                <div>우리 스타트업의 비즈니스 모델을 어떻게 검증하고 개선할 수 있을까요? 우리 스타트업의 비즈니스 모델을 어떻게 검증하고 개선할 수 있을까요? 우리 스타트업의 비즈니스 모델을 어떻게 검증하고 개선할 수 있을까요?</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem>
              <input type="checkbox" id="section2" className="accordion-toggle" />
              <label for="section2" className="accordion-label">
                초기 단계에서 효과적으로 자금을 조달하는 방법은 무엇인가요?
              </label>
              <AccordionContent>
                <div>초기 단계에서 효과적으로 자금을 조달하는 방법은 무엇인가요? 초기 단계에서 효과적으로 자금을 조달하는 방법은 무엇인가요? 초기 단계에서 효과적으로 자금을 조달하는 방법은 무엇인가요?</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem>
              <input type="checkbox" id="section3" className="accordion-toggle" />
              <label for="section3" className="accordion-label">
                제품-시장 적합성(Product-Market Fit)을 빠르게 달성하기 위한 전략은 무엇인가요?
              </label>
              <AccordionContent>
                <div>제품-시장 적합성(Product-Market Fit)을 빠르게 달성하기 위한 전략은 무엇인가요? 제품-시장 적합성(Product-Market Fit)을 빠르게 달성하기 위한 전략은 무엇인가요? 제품-시장 적합성(Product-Market Fit)을 빠르게 달성하기 위한 전략은 무엇인가요?</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem>
              <input type="checkbox" id="section4" className="accordion-toggle" />
              <label for="section4" className="accordion-label">
                초기 고객을 확보하고 사용자 기반을 빠르게 확장하는 방법은 무엇인가요?
              </label>
              <AccordionContent>
                <div>초기 고객을 확보하고 사용자 기반을 빠르게 확장하는 방법은 무엇인가요? 초기 고객을 확보하고 사용자 기반을 빠르게 확장하는 방법은 무엇인가요? 초기 고객을 확보하고 사용자 기반을 빠르게 확장하는 방법은 무엇인가요?</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem>
              <input type="checkbox" id="section5" className="accordion-toggle" />
              <label for="section5" className="accordion-label">
                스타트업의 성장 단계에 따라 어떻게 조직 구조와 문화를 발전시켜 나가야 할까요?
              </label>
              <AccordionContent>
                <div>스타트업의 성장 단계에 따라 어떻게 조직 구조와 문화를 발전시켜 나가야 할까요? 스타트업의 성장 단계에 따라 어떻게 조직 구조와 문화를 발전시켜 나가야 할까요? 스타트업의 성장 단계에 따라 어떻게 조직 구조와 문화를 발전시켜 나가야 할까요?</div>
              </AccordionContent>
            </AccordionItem>
          </AccordionMenu>
        </FAQSection> 
        */}
      </Container>
    </div>
  );
};

export default PageMeetAiExpert;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 110px 20px 40px;
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:8px;
  font-size:3.13rem;
  font-weight:600;
  margin:150px auto 55px;

  p {
    font-size:1.25rem;
    font-weight:400;
  }
`;

const InputWrap = styled.div`
  max-width:1000px;
  width:100%;
  display:flex;
  flex-direction:column;
  border-radius:20px;
  border:1px solid ${palette.lineGray};
  background:${palette.white};
  box-shadow:0 4px 30px rgba(0,0,0,.15);
  overflow:hidden;

  .inputWrap {
    display:flex;
    justify-content:space-between;
    gap:20px;
    padding:28px 38px;

    textarea {
      width:100%;
      height:40px;
      font-family: 'Pretendard';
      font-size:1rem;
      outline:0;
      border:0;
      resize:none;
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
  max-width:1210px;
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
  margin-bottom:30px;

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
  cursor:pointer;
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
    color:${(props) => (props.select ? palette.white : palette.black)};
    margin-top:auto;
  }

  strong {
    font-size:1.38rem;
    font-weight:700;
    color:${(props) => (props.select ? palette.white : palette.black)};
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

