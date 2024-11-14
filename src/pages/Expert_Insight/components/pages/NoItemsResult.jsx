import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";

const NoItemsResult = () => {

  // 팝업
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const handleOpenPopup1 = () => setIsPopup1Open(true);

  const closePopup = () => {
    setIsPopup1Open(false); // 팝업 닫기
  };


  return (
    <>
      <QuestionWrap>
        <Question>
          <p>
            <span><img src={images.ImgMBTIROIC} alt="" /></span>
            불도저형 스타트업러<br />ROIC
          </p>
          <div>
            <strong>과감한 실행력과 창의력으로 위험을 두려워하지 않고 빠르게 기회를 잡는 멋진 타입이에요!</strong>
            <p>불도저형 스타트업러는 대담하고 공격적인 전략을 선호하며, 높은 위험을 감수할 준비가 되어 있는 창업자에게 적합한 유형입니다. 이 유형은 빠르게 변화하는 시장에서 신속한 성장을 목표로 하며, 혁신적인 기술이나 아이디어를 추진합니다. 독립적인 실행력과 창의성으로 남다른 길을 개척해나갑니다.</p>
          </div>
        </Question>

        <Answer>
          <ResultWrap>
            <div className="title">
              <strong>💡 맞춤 추천 아이템</strong>
              <p>아이템이 나에게 맞는지 확인하고, 나만의 비즈니스로 발전시킬 힌트를 얻어보세요</p>
            </div>

            <ListBox>
              <div>
                <p>
                  <strong>뱅크샐러드</strong>
                  개인 금융 데이터 기반 맞춤 자산관리 플랫폼
                </p>
                <span onClick={handleOpenPopup1}>자세히</span>
              </div>
              <div>
                <p>
                  <strong>뱅크샐러드</strong>
                  개인 금융 데이터 기반 맞춤 자산관리 플랫폼
                </p>
                <span onClick={handleOpenPopup1}>자세히</span>
              </div>
              <div>
                <p>
                  <strong>뱅크샐러드</strong>
                  개인 금융 데이터 기반 맞춤 자산관리 플랫폼
                </p>
                <span onClick={handleOpenPopup1}>자세히</span>
              </div>
            </ListBox>

            <span className="comment">* 일부 아이템은 현실에 없는 아이템으로 혁신적 가능성을 고려해 제시되었습니다.</span>
          </ResultWrap>
        </Answer>

        {isPopup1Open && (
          <Popup
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closePopup(); // 상태를 false로 설정
              }
            }}
          >
            <div>
              <div className="header">
                <h5>비즈니스명</h5>
                <p>프리랜서 일정 및 급여 관리 플랫폼은 프리랜서들이 자신의 일정을 효율적으로 관리하고, 프로젝트별 급여를 체계적으로 추적하며, 세금 신고를 간편하게 처리할 수 있도록 지원하는 플랫폼입니다. 프로젝트 일정 관리, 급여 및 비용 추적, 세금 신고 기능을 제공하여 프리랜서들의 업무 효율성을 높이고 재정 관리를 간소화하는 데 도움을 줍니다.</p>
                <button className="closePopup" onClick={() => closePopup()}>닫기</button>
              </div>
              <div className="body">
                <ScrollWrap>
                  <div>
                    <strong>
                      <span>S</span>
                      안정 추구 (Safety-seeking)
                    </strong>
                    <p>뱅크샐러드는 사용자 금융 데이터를 기반으로 꾸준한 관리와 개선을 통해 고객의 재정 안정성을 돕는 서비스를 제공합니다. 금융 서비스에서의 안정성은 신뢰와 연계되므로, 뱅크샐러드는 SPTA의 안정 추구 성향과 잘 맞습니다.</p>
                  </div>
                  <div>
                    <strong>
                      <span>O</span>
                      기회 포착형 (Opportunity-driven)
                    </strong>
                    <p>뱅크샐러드는 사용자 금융 데이터를 기반으로 꾸준한 관리와 개선을 통해 고객의 재정 안정성을 돕는 서비스를 제공합니다. 금융 서비스에서의 안정성은 신뢰와 연계되므로, 뱅크샐러드는 SPTA의 안정 추구 성향과 잘 맞습니다.</p>
                  </div>
                  <div>
                    <strong>
                      <span>I</span>
                      독립성 중시 (Independence-focused)
                    </strong>
                    <p>뱅크샐러드는 사용자 금융 데이터를 기반으로 꾸준한 관리와 개선을 통해 고객의 재정 안정성을 돕는 서비스를 제공합니다. 금융 서비스에서의 안정성은 신뢰와 연계되므로, 뱅크샐러드는 SPTA의 안정 추구 성향과 잘 맞습니다.</p>
                  </div>
                  <div>
                    <strong>
                      <span>C</span>
                      창의성 중심 (Creativity-centered)
                    </strong>
                    <p>뱅크샐러드는 사용자 금융 데이터를 기반으로 꾸준한 관리와 개선을 통해 고객의 재정 안정성을 돕는 서비스를 제공합니다. 금융 서비스에서의 안정성은 신뢰와 연계되므로, 뱅크샐러드는 SPTA의 안정 추구 성향과 잘 맞습니다.</p>
                  </div>
                </ScrollWrap>

                <PopupButton>
                  <button>사업화 가능성 확인하기</button>
                </PopupButton>
              </div>
            </div>
          </Popup>
        )}
      </QuestionWrap>
    </>
  );
};

export default NoItemsResult;



const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 100vh;
  background-color: #3f4aee;
  display: flex;
  align-items: flex-end;
`;

const Content = styled.div`
  background-color: white;
  width: 100%;
  height: ${(props) => props.height}; /* 동적 높이 설정 */
  padding: 20px;
  border-radius: 20px 20px 0 0;
  cursor: grab;
  transition: height 0.3s ease; /* 높이 변경 시 애니메이션 */

  h2 {
    font-size: 16px;
    color: #3f4aee;
  }

  p {
    font-size: 14px;
    color: #333;
    margin-top: 20px;
  }
`;

const QuestionWrap = styled.section`
  position:relative;
  height:100vh;
  display:flex;
`;

const Question = styled.div`
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap:64px;
  flex:1 1 50%;
  background:#5547FF;

  > p {
    font-size:2.5rem;
    font-weight:600;
    line-height:1.4;
    color:${palette.white};
    text-align:center;
    display:flex;
    flex-direction:column;
    gap:12px;

    span {
      font-size:1.25rem;
      font-weight:300;
      line-height:1.2;
    }
  }

  div {
    display:flex;
    flex-direction:column;
    gap:16px;
    max-width:680px;
    text-align:left;
    padding:32px;
    margin:0 10%;
    border-radius:20px;
    background:${palette.white};

    strong {
      font-size:1.13rem;
      font-weight:500;
      color:#5547FF;
      line-height:1.5;
    }

    p {
      font-size:1.25rem;
      line-height:1.6;
    }
  }
`;

const Answer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:32px;
  flex:1 1 50%;
`;

const ResultWrap = styled.div`
  max-width:566px;
  display:flex;
  flex-direction:column;
  gap:20px;
  margin:0 10%;

  .title {
    display:flex;
    flex-direction:column;
    gap:4px;
    text-align:left;

    strong {
      font-size:1.25rem;
      font-weight:600;
      line-height:1.5;
    }

    p {
      font-weight:300;
      line-height:1.5;
      margin-left:22px;
    }
  }

  .comment {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray500};
    line-height:1.5;
    text-align:left;
  }
`;

const ListBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:16px;

  > div {
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
    border-radius:20px;
    border:1px solid ${palette.gray200};
  }

  p {
    display:flex;
    flex-direction:column;
    gap:4px;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    text-align:left;

    strong {
      font-weight:600;
      color:#5547FF;
    }
  }

  span {
    font-size:0.88rem;
    color:#0453F4;
    line-height:1.5;
    padding:8px 20px;
    border-radius:5px;
    background:rgba(4, 83, 244, 0.1);
    cursor:pointer;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 0;
    top: 0;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 11px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.black};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap:32px;
    width: 100%;
    max-width: 686px;
    text-align: center;
    padding: 32px;
    border-radius: 20px;
    background: ${palette.white};
  }

  .header {
    position:relative;
    display:flex;
    flex-direction:column;
    gap:20px;
    font-size:1rem;
    text-align:left;
    padding-bottom:32px;
    border-bottom:1px solid ${palette.gray200};

    h5 {
      font-weight:500;
      color:#5547FF;
      line-height:1.7;
    }

    p {
      font-weight:400;
      line-height:1.6;
      color:${palette.gray800};
    }
  }

  .body {
    display:flex;
    flex-direction:column;
    gap:32px;
  }
`;

const ScrollWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:32px;
  max-height:580px;
  overflow-y:auto;

  > div {
    display:flex;
    flex-direction:column;
    gap:12px;

    strong {
      display:flex;
      align-items:center;
      gap:12px;
      font-weight:300;

      span {
        display:flex;
        justify-content:center;
        align-items:center;
        width:32px;
        height:32px;
        font-weight:400;
        color:${palette.blue};
        border-radius:5px;
        background:rgba(4, 83, 244, 0.1);
      }
    }

    p {
      font-weight:300;
      line-height:1.6;
      color:${palette.gray700};
      text-align:left;
      padding-left:44px;
    }
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${palette.lineGray};
    border-radius: 10px;
  }
`;

const PopupButton = styled.div`
  display:flex;
  gap:12px;
  align-itesm:center;

  button {
    width:100%;
    font-family:Pretendard, Poppins;
    font-weight:600;
    color:${palette.white};
    line-height:1.5;
    padding:12px;
    border-radius:8px;
    border:0;
    background:${palette.chatBlue};
  }
`;