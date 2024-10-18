import React, { useState, useRef } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

const steps = ['Acquisition', 'Activation', 'Retention', 'Referral', 'Revenue'];
const labels = ['획득', '활성화', '유지', '추천', '수익'];

const MarketingKPI = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const progressBarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // 마우스 클릭 또는 드래그 시 단계 계산
  const handleDrag = (e) => {
    if (!isDragging) return; // 드래그 중이 아닐 때는 무시

    const progressBar = progressBarRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressBar.left;
    const stepWidth = progressBar.width / (steps.length - 1);
    const newStep = Math.round(clickPosition / stepWidth);
    setCurrentStep(Math.min(Math.max(newStep, 0), steps.length - 1));
  };

  // 각 단계를 클릭했을 때 이동
  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  // 마우스 버튼을 눌렀을 때 드래그 시작
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  // 마우스 버튼을 뗐을 때 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 마우스가 바닥에서 나갔을 때 드래그 종료
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      <Wrap>
        <h1>
          AARRR 모델 기반 최적의 KPI 도출
          <p>
            AARRR이란?
            <span onClick={toggleVisibility}>!</span>
          </p>
          {isVisible && 
            <ToogleBox>
              <span onClick={toggleVisibility}>닫기</span>
              <div>
                <strong>AARRR이란?</strong>
                <p>AARRR 모델은 각 성장 단계를 분석해 최적의 성장을 도출하는데 활용됩니다. 고객 여정을 따라 단계별로 개선 방안을 수립하여 효율적으로 성과를 달성할 수 있도록 도와줍니다.</p>
                <UlList>
                  <li>
                    <span>A</span>
                    Acquisition (획득) : 고객을 어떻게 유입시킬 것인가.<br />
                    지표: 방문자 수, 클릭률(CTR), 유입 경로<br />
                    이유: 잠재 고객이 서비스를 처음 인지하고 진입하는 시점에 집중
                  </li>
                  <li>
                    <span>A</span>
                    Activation (활성화): 사용자가 가치를 처음 경험하게 만듦.<br />
                    지표: 첫 사용 후 만족도, 가입 후 일정 시간 내 재방문.<br />
                    이유: 첫인상에서 성공해야 지속적인 사용을 유도할 수 있음.
                  </li>
                  <li>
                    <span>R</span>
                    Retention (유지): 고객이 서비스를 계속 사용하게 유도.<br />
                    지표: 재방문율, 이탈률.<br />
                    이유: 기존 고객의 유지가 신규 고객 유치보다 비용이 적게 듦.
                  </li>
                  <li>
                    <span>R</span>
                    Referral (추천): 고객이 자발적으로 서비스를 추천하도록 유도.<br />
                    지표: 추천 사용자 수, 바이럴 효과.<br />
                    이유: 만족한 고객이 새로운 고객을 데려오는 바이럴 성장 유도.
                  </li>
                  <li>
                    <span>R</span>
                    Revenue (수익): 서비스를 통해 수익을 창출.<br />
                    지표: 결제율, 고객당 수익.<br />
                    이유: 지속 가능한 비즈니스를 위해 수익화가 필수적.
                  </li>
                </UlList>
              </div>
            </ToogleBox>
          }
        </h1>

        <KPIWrap>
          <h4>
            <span>비즈니스와 퍼널 분석 결과</span>
            고객에게 핵심가치 경험시키기(Activation) 단계 집중
          </h4>

          <Progress
            // onMouseDown={handleMouseDown}
            // onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseLeave}
            // onMouseMove={handleDrag}
            ref={progressBarRef}
          >
            <div
              className="progress-container"
              onMouseDown={handleDrag}
              onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
              ref={progressBarRef}
            >
              {steps.map((step, index) => {
                const firstLetter = step.charAt(0);
                const restOfWord = step.slice(1);
                const isLastStep = index === steps.length - 1;

                return (
                  <div 
                    key={index} 
                    className="step" 
                    // onClick={() => handleStepClick(index)}
                  >
                    <div className={`bar ${index < currentStep ? 'completed' : index === currentStep ? 'current' : ''}`}></div>
                    <div className={`label ${index <= currentStep ? 'active' : ''}`}>
                      <strong>{firstLetter}</strong>{restOfWord}
                    </div>
                  </div>
                );
              })}

              <div
                className="handle"
                style={{
                  left: currentStep === steps.length - 1 
                    ? '100%'
                    : `${(currentStep + 0.5) / steps.length * 100}%`,
                  transform: currentStep === steps.length - 1 
                    ? 'translateX(-100%)'
                    : 'translateX(-50%)',
                  transition: 'left 0.3s ease',
                }}
              >
                <img src={images.IconCheck} alt="" />
                <span>{labels[currentStep]}</span>
              </div>
            </div>
          </Progress>

          <Content>
            <span>평가 내용</span>
            <p>현재 아이디어 단계에 있는 점안액 제품의 경우, 가장 우선적으로 해야 할 일은 고객 획득에 집중하는 것입니다. 이를 위해 랜딩 페이지 구축, 초기 사용자 인센티브 제공, 소셜 미디어를 통한 바이럴 마케팅 등 다양한 전략을 통해 초기 사용자를 확보하고, 제품에 대한 초기 반응을 신속히 파악하는 것이 중요합니다. 초기 사용자로부터 수집된 피드백을 바탕으로 제품의 기능을 개선하고, 고객이 원하는 제품으로 발전시켜나가는 것이 목표입니다.</p>
          </Content>

          <DownloadButton>
            <p>
              <img src={images.IconEdit3} alt="" />
              자료 (1건)
            </p>
            <div>
              <button>
                <img src={images.IconDownload2} alt="" />
                <div>
                  <strong>마케팅 전략 다운로드</strong>
                  <span>1.8 MB · Download</span>
                </div>
              </button>
            </div>
          </DownloadButton>
        </KPIWrap>
      </Wrap>
    </>
  );
};

export default MarketingKPI;

const Wrap = styled.div`
  max-width:540px;
  width:100%;
  display:flex;
  flex-direction:column;
  padding:20px;
  margin:24px 0 0 44px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

  h1 {
    position:relative;
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:1rem;
    font-weight:700;
    text-align:left;
    padding-bottom:8px;
    margin-bottom:32px;
    border-bottom:1px solid ${palette.lineGray};
    z-index:1;

    p {
      display:flex;
      align-items:center;
      gap:4px;
      font-size:0.88rem;
      font-weight:300;
      color:${palette.gray500};

      span {
        width:12px;
        height:12px;
        font-size:0.63rem;
        font-weight:700;
        color:${palette.chatBlue};
        text-align:center;
        border-radius:50%;
        border:1px solid ${palette.chatBlue};
        cursor:pointer;
      }
    }
  }
`;

const ToogleBox = styled.div`
  position:absolute;
  top:30px;
  right:0;
  max-width:360px;
  width:100%;
  padding:40px 20px 20px;
  border-radius:15px;
  box-shadow:0 4px 32px rgba(0,0,0,.15);
  background:${palette.white};

  > div {
    display:flex;
    flex-direction:column;
    gap:12px;

    strong, p {
      font-size:0.75rem;
      font-weight:400;
      color:${palette.gray800};
    }
  }

  > span {
    position:absolute;
    top:16px;
    right:20px;
    width:16px;
    height:16px;
    text-indent:-99em;
    cursor:pointer;

    &:before, &:after {
      position:absolute;
      top:50%;
      left:50%;
      width:2px;
      height:100%;
      border-radius:10px;
      background:${palette.gray300};
      content:'';
    }

    &:before {
      transform:translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform:translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const UlList = styled.ul`
  display:flex;
  flex-direction:column;
  gap:16px;
  padding:16px;
  border-radius:10px;
  background:${palette.gray50};

  li {
    display:flex;
    gap:8px;
    font-size:0.63rem;
    font-weight:400;
    color:${palette.gray700};

    span {
      width:20px;
      height:20px;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      font-size:0.75rem;
      margin-top:2px;
      border-radius:50%;
      border:1px solid ${palette.gray700};
    }
  }
`;

const KPIWrap = styled.div`
  display:flex;
  flex-direction:column;

  h4 {
    display:flex;
    flex-direction:column;
    gap:6px;
    font-size:1.25rem;
    font-weight:600;
    color:${palette.gray800};
    text-align:left;
    margin-bottom:16px;

    span {
      font-size:0.88rem;
      font-weight:500;
      color:${palette.gray500};
    }
  }
`;

const Progress = styled.div`
  width: 100%;
  padding: 20px;

  .progress-container {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 57px 0 0;
    cursor: pointer;
  }

  .step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex:1;
    width: 100%;
  }

  .step:nth-child(1) .bar {
    border-radius:10px 0 0 10px;
  }

  .step:nth-child(5) .bar {
    border-radius:0 10px 10px 0;
  }

  .step:nth-child(5) .bar.current:after {
    width:100%;
  }


  .bar {
    position: relative;
    width: 100%;
    height: 7px;
    background-color: #E0E4EB;
    overflow:hidden;
  }

  .bar.completed {
    width:100%;

    &:after {
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      background-color:${palette.chatBlue};
      content:'';
    }
  }

  .bar.current {
    background-color:#E0E4EB;

    &:after {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      background-color: ${palette.chatBlue}; /* 활성화된 색상 */
      content: '';
    }
  }

  .label {
    font-size:0.88rem;
    color: ${palette.gray500};
    margin-top: 12px;
  }

  .handle {
    position: absolute;
    bottom: 27px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border:1px solid ${palette.white};
    box-shadow:2px 2px 8px rgba(34,111,255,.5);
    background-color:${palette.chatBlue};
    cursor: pointer;
    pointer-events: none;
    display:flex;
    align-itmes:center;
    justify-content: center;

    span {
      position:absolute;
      bottom:37px;
      left:50%;
      transform:translateX(-50%);
      min-width:57px;
      font-size:0.75rem;
      color:${palette.white};
      padding:8px;
      border-radius:15px;
      background:${palette.chatBlue};
      box-shadow:2px 2px 8px rgba(34, 111, 255, .5);

      &:before {
        position:absolute;
        top:25px;
        left:50%;
        transform:translateX(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 14px 7px 0px 7px;
        border-color: ${palette.chatBlue} transparent transparent transparent;
        content:'';
      }
    }
  }
`;

const Content = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
  font-size:0.88rem;
  color:${palette.gray800};
  line-height:1.3;
  text-align:left;
  margin:32px auto;
  padding-top:20px;
  border-top:1px solid ${palette.lineGray};

  span {
    font-weight:500;
    color:${palette.gray500};
  }
`;

const DownloadButton = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;

  p {
    display:flex;
    align-items:center;
    gap:8px;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray500};
    line-height:22px;
  }

  div {
    display:flex;
    gap:12px;
  }

  button {
    display:flex;
    align-items:center;
    gap:8px;
    padding:6px 8px;
    border-radius:6px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};
    font-family: 'Pretendard';

    div {
      display:flex;
      flex-direction:column;
      gap:4px;
      min-width:160px;
      text-align:left;
    }

    strong {
      font-size:0.63rem;
      font-weight:400;
      color:${palette.gray800};
    }

    span {
      font-size:0.5rem;
      color:${palette.gray500};
    }
  }
`;
