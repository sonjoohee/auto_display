import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";

const BMExpert = () => {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* 비즈니스 모델 캔버스 */}
      <Wrap>
        <h1>
          린 캔버스 vs 비즈니스 모델 캔버스 매칭 분석
          <p>
            캔버스 알아보기
            <span onClick={toggleVisibility}>!</span>
          </p>
          {isVisible && 
            <ToogleBox>
              <span onClick={toggleVisibility}>닫기</span>
              <div>
                <strong>린캔버스와 비즈니스 모델 캔버스는 무엇일까요?</strong>
                <p>린 캔버스와 비즈니스 모델 캔버스는 스타트업이나 사업 아이디어를 정리하고 구체화하는 도구입니다. 특히, 린캔버스는 문제 해결과 빠른 실행을 위해, 비즈니스 모델 캔버스는 전체 비즈니스 구조 설계에 중점을 둔 도구입니다.</p>
                
                <TabWrap>
                  <input type="radio" id="tab1" name="tabs" checked />
                  <label htmlFor="tab1">린 캔버스</label>
                  <input type="radio" id="tab2" name="tabs" />
                  <label htmlFor="tab2">비즈니스 모델 캔버스</label>

                  <TabContents id="tab-content1">
                    <p>린 캔버스는 스타트업이나 신규 사업 아이디어를 빠르게 검증하고 실행하기 위한 도구입니다. 애쉬 모리야(Ash Maurya)가 개발한 이 캔버스는 복잡한 계획보다는 간단하고 핵심적인 요소들만을 다룹니다. 린 캔버스는 다음과 같은 9가지 요소로 구성됩니다</p>
                    <ol>
                      <li>문제: 해결하려는 주요 문제를 명확히 정의합니다.</li>
                      <li>고객 세그먼트: 문제를 겪고 있는 타겟 고객 그룹을 설정합니다.</li>
                      <li>독특한 가치 제안: 고객에게 제시할 차별화된 해결책을 설명합니다.</li>
                      <li>해결책: 문제를 해결하기 위한 구체적인 방법을 제시합니다.</li>
                      <li>채널: 고객에게 도달할 방법과 경로를 결정합니다.</li>
                      <li>수익 흐름: 수익을 창출하는 방법을 정의합니다.</li>
                      <li>비용 구조: 사업을 운영하는 데 드는 주요 비용을 파악합니다.</li>
                      <li>핵심 지표: 성공 여부를 판단할 수 있는 중요한 지표를 설정합니다.</li>
                      <li>무형 자산: 경쟁 우위에 있는 비밀 병기나 자원을 포함합니다</li>
                    </ol>
                  </TabContents>

                  <TabContents id="tab-content2">
                    <p>비즈니스 모델 캔버스(Business Model Canvas)는 사업의 전반적인 구조와 전략을 체계적으로 시각화하는 도구입니다. 이 캔버스는 사업의 9가지 핵심 요소를 다루며, 각 요소가 상호 연결되어 비즈니스 모델을 설명합니다. 구성 요소는 다음과 같습니다</p>
                    <ol>
                      <li>고객 세그먼트: 가치를 제공할 주요 고객 그룹.</li>
                      <li>가치 제안: 고객이 얻는 고유한 혜택과 차별화된 서비스.</li>
                      <li>채널: 고객에게 가치를 전달하는 경로(유통 및 소통 방법).</li>
                      <li>고객 관계: 고객과의 관계를 구축하고 유지하는 방식.</li>
                      <li>수익원: 수익을 창출하는 방식(판매, 구독, 수수료 등).</li>
                      <li>핵심 자원: 사업 운영에 필수적인 자원(인프라, 인력 등).</li>
                      <li>핵심 활동: 가치 제공을 위해 수행해야 하는 주요 활동.</li>
                      <li>핵심 파트너: 협력 관계를 통해 사업을 지원하는 파트너.</li>
                      <li>비용 구조: 운영에 필요한 주요 비용 항목(고정비, 변동비 등).</li>
                    </ol>
                  </TabContents>
                </TabWrap>
              </div>
            </ToogleBox>
          }
        </h1>

        <CanvasWrap>
          <h4>
            <span>아이템의 단계 및 상황을 검토한 결과</span>
            비즈니스 모델 캔버스를 활용하여 OOO을 도출하는 것을<br />추천 드립니다. 
          </h4>

          <ImageBox>
            <img src={images.ImgCanvasBusiness} alt="" />
            <p>Business Model Canvas</p>
          </ImageBox>

          <Content>
            <span>매칭 분석 내용</span>
            <p>현재 프로토타입 개발 단계에 있으며, 제품 시장 적합성 검증이 주요 목표입니다. 고객의 문제가 명확히 정의되지 않았기 때문에, 시장 검증을 통해 초기 고객의 피드백을 바탕으로 제품이 고객 문제를 해결할 수 있는지 확인해야 합니다. 비즈니스의 복잡한 요소들은 아직 고려하지 않아도 되는 상황입니다. 따라서, 린 캔버스를 통해 고객의 문제 정의와 시장에서 제품의 적합성을 검증하는 데 집중해야 합니다.</p>
          </Content>
        </CanvasWrap>
      </Wrap>

      {/* 모델 캔버스 */}
      <BoxWrap>
        <h1>홈케어 뷰티 디바이스와 기능성 화장품의 비즈니스 모델 캔버스 - 기본형</h1>
        <p>따릉이는 서울 시민과 방문자에게 저렴하고 편리한 공공 자전거 대여 서비스를 제공합니다. 모바일 앱을 통해 쉽고 빠르게 자전거를 대여하고, 서울 전역의 다양한 대여소에서 자유롭게 반납할 수 있습니다. 따릉이는 교통 혼잡을 피하고 환경 보호를 실천하면서 건강도 증진시킬 수 있는 스마트한 교통 수단입니다. 정기적인 자전거 유지보수와 안전 점검으로 신뢰성을 높이고, 대여비와 구독 모델을 통해 합리적인 비용으로 지속 가능한 서비스를 운영하고 있습니다.</p>

        <ModelCanvasWrap>
          <CanvasSection>
            <CanvasList>
              <section>
                <strong>
                  핵심 파트너십
                  <span><img src={images.IconCanvas01} alt="" /></span>
                </strong>
                <div>
                  <p>고객들이 배달비 부담을 줄이는 문제를 해결하고자 합니다.<br />특히, 개별 배달 주문 시 높은 배달비에 대한 고객의 불편함을 해결하는 것이 주요 목표입니다.</p>
                  <ul>
                    <li>자전거 유지 보수</li>
                    <li>앱 관리</li>
                  </ul>
                </div>
              </section>
            </CanvasList>

            <CanvasList Num2> 6 7 
              <section>
                <strong>
                  핵심 활동
                  <span><img src={images.IconCanvas02} alt="" /></span>
                </strong>
                <div>
                  <p>따릉이는 서울 시민에게 저렴하고 편리한 공공 교통 수단을 제공하며, 환경 보호와 건강 증진이라는 가치를 동시에 제공합니다.</p>
                  <ul>
                    <li>자전거 유지 보수</li>
                    <li>앱 관리</li>
                  </ul>
                </div>
              </section>

              <section>
                <strong>
                  핵심 자원
                  <span><img src={images.IconCanvas03} alt="" /></span>
                </strong>
                <div>
                  <p>따릉이 시스템의 원활한 운영을 위해 자전거 유지 보수, 앱 관리, 고객 지원 등의 활동이 필수적입니다.</p>
                </div>
              </section>
            </CanvasList>

            <CanvasList>
              <section>
                <strong>
                가치 제안
                  <span><img src={images.IconCanvas04} alt="" /></span>
                </strong>
                <div>
                  <p>따릉이는 서울 시민에게 저렴하고 편리한 공공 교통 수단을 제공하며, 환경 보호와 건강 증진이라는 가치를 동시에 제공합니다.</p>
                  <ul>
                    <li>키워드</li>
                    <li>키워드</li>
                  </ul>
                </div>
              </section>
            </CanvasList>

            <CanvasList Num2> 
              <section>
                <strong>
                  고객관계
                  <span><img src={images.IconCanvas05} alt="" /></span>
                </strong>
                <div>
                  <p>따릉이는 모바일 앱을 통한 맞춤형 서비스와 자전거 유지보수를 통해 고객과의 신뢰를 강화하며, 사용 후기와 고객 피드백을 반영해 지속적으로 시스템을 개선합니다.<br />따릉이는 모바일 앱을 통한 맞춤형 서비스와 자전거 유지보수를 통해 고객과의 신뢰를 강화하며, 사용 후기와 고객 피드백을 반영해 지속적으로 시스템을 개선합니다.<br />따릉이는 모바일 앱을 통한 맞춤형 서비스와 자전거 유지보수를 통해 고객과의 신뢰를 강화하며, 사용 후기와 고객 피드백을 반영해 지속적으로 시스템을 개선합니다.<br />따릉이는 모바일 앱을 통한 맞춤형 서비스와 자전거 유지보수를 통해 고객과의 신뢰를 강화하며, 사용 후기와 고객 피드백을 반영해 지속적으로 시스템을 개선합니다.</p>
                </div>
              </section>

              <section>
                <strong>
                  채널
                  <span><img src={images.IconCanvas06} alt="" /></span>
                </strong>
                <div>
                  <p>따릉이는 모바일 앱과 물리적인 대여소를 통해 고객에게 서비스를 제공합니다. 고객은 쉽고 빠르게 접근할 수 있으며, 온라인과 오프라인을 결합한 서비스 경험을 제공합니다.</p>
                </div>
              </section>
            </CanvasList>

            <CanvasList>
              <section>
                <strong>
                  고객 세그먼트
                  <span><img src={images.IconCanvas07} alt="" /></span>
                </strong>
                <div>
                  <p>배달비 절감을 원하는 다양한 연령대의 배달 서비스 사용자들을 타겟으로 하며, 특히 배달비가 부담스러운 고객들이 주요 타겟입니다 </p>
                </div>
              </section>
            </CanvasList>
          </CanvasSection>

          <CanvasSection>
            <CanvasList>
              <section>
                <strong>
                  비용
                  <span><img src={images.IconCanvas08} alt="" /></span>
                </strong>
                <div>
                  <p>고객들이 배달비 부담을 줄이는 문제를 해결하고자 합니다.<br />특히, 개별 배달 주문 시 높은 배달비에 대한 고객의 불편함을 해결하는 것이 주요 목표입니다. </p>
                  <ul>
                    <li>자전거 유지 보수</li>
                    <li>앱 관리</li>
                  </ul>
                </div>
              </section>
            </CanvasList>

            <CanvasList>
              <section>
                <strong>
                  수익
                  <span><img src={images.IconCanvas09} alt="" /></span>
                </strong>
                <div>
                  <p>
                    배달비 절감을 제공하는 팀매칭 서비스는 구독 모델과 배달비 절감 후, 발생하는 소액 수수료 기반으로 수익을 창출합니다.
                    <span>* 너무 보편적 + 예외적인 케이스 제시 필요</span>
                  </p>
                </div>
              </section>
            </CanvasList>
          </CanvasSection>
        </ModelCanvasWrap>

        <ButtonWrap>
          <div />
          <div>
            <button type="button">
              <img src={images.IconCopy} alt="" />
              복사하기
            </button>
            <button type="button">
              <img src={images.IconSave} alt="" />
              저장하기
            </button>
          </div>
        </ButtonWrap>
      </BoxWrap>

      {/* 린 캔버스 */}
      <Wrap>
        <h1>
          린 캔버스 vs 비즈니스 모델 캔버스 매칭 분석
          <p>
            캔버스 알아보기
            <span onClick={toggleVisibility}>!</span>
          </p>
          {isVisible && 
            <ToogleBox>
              <span onClick={toggleVisibility}>닫기</span>
              <div>
                <strong>린캔버스와 비즈니스 모델 캔버스는 무엇일까요?</strong>
                <p>린 캔버스와 비즈니스 모델 캔버스는 스타트업이나 사업 아이디어를 정리하고 구체화하는 도구입니다. 특히, 린캔버스는 문제 해결과 빠른 실행을 위해, 비즈니스 모델 캔버스는 전체 비즈니스 구조 설계에 중점을 둔 도구입니다.</p>
                
                <TabWrap>
                  <input type="radio" id="tab1" name="tabs" checked />
                  <label htmlFor="tab1">린 캔버스</label>
                  <input type="radio" id="tab2" name="tabs" />
                  <label htmlFor="tab2">비즈니스 모델 캔버스</label>

                  <TabContents id="tab-content1">
                    <p>린 캔버스는 스타트업이나 신규 사업 아이디어를 빠르게 검증하고 실행하기 위한 도구입니다. 애쉬 모리야(Ash Maurya)가 개발한 이 캔버스는 복잡한 계획보다는 간단하고 핵심적인 요소들만을 다룹니다. 린 캔버스는 다음과 같은 9가지 요소로 구성됩니다</p>
                    <ol>
                      <li>문제: 해결하려는 주요 문제를 명확히 정의합니다.</li>
                      <li>고객 세그먼트: 문제를 겪고 있는 타겟 고객 그룹을 설정합니다.</li>
                      <li>독특한 가치 제안: 고객에게 제시할 차별화된 해결책을 설명합니다.</li>
                      <li>해결책: 문제를 해결하기 위한 구체적인 방법을 제시합니다.</li>
                      <li>채널: 고객에게 도달할 방법과 경로를 결정합니다.</li>
                      <li>수익 흐름: 수익을 창출하는 방법을 정의합니다.</li>
                      <li>비용 구조: 사업을 운영하는 데 드는 주요 비용을 파악합니다.</li>
                      <li>핵심 지표: 성공 여부를 판단할 수 있는 중요한 지표를 설정합니다.</li>
                      <li>무형 자산: 경쟁 우위에 있는 비밀 병기나 자원을 포함합니다</li>
                    </ol>
                  </TabContents>

                  <TabContents id="tab-content2">
                    <p>비즈니스 모델 캔버스(Business Model Canvas)는 사업의 전반적인 구조와 전략을 체계적으로 시각화하는 도구입니다. 이 캔버스는 사업의 9가지 핵심 요소를 다루며, 각 요소가 상호 연결되어 비즈니스 모델을 설명합니다. 구성 요소는 다음과 같습니다</p>
                    <ol>
                      <li>고객 세그먼트: 가치를 제공할 주요 고객 그룹.</li>
                      <li>가치 제안: 고객이 얻는 고유한 혜택과 차별화된 서비스.</li>
                      <li>채널: 고객에게 가치를 전달하는 경로(유통 및 소통 방법).</li>
                      <li>고객 관계: 고객과의 관계를 구축하고 유지하는 방식.</li>
                      <li>수익원: 수익을 창출하는 방식(판매, 구독, 수수료 등).</li>
                      <li>핵심 자원: 사업 운영에 필수적인 자원(인프라, 인력 등).</li>
                      <li>핵심 활동: 가치 제공을 위해 수행해야 하는 주요 활동.</li>
                      <li>핵심 파트너: 협력 관계를 통해 사업을 지원하는 파트너.</li>
                      <li>비용 구조: 운영에 필요한 주요 비용 항목(고정비, 변동비 등).</li>
                    </ol>
                  </TabContents>
                </TabWrap>
              </div>
            </ToogleBox>
          }
        </h1>
        <CanvasWrap>
          <h4>
            <span>아이템의 단계 및 상황을 검토한 결과</span>
            린캔버스 활용하여 OOO을 도출하는 것을 추천 드립니다. 
          </h4>

          <ImageBox>
            <img src={images.ImgCanvasLean} alt="" />
            <p>Lean Canvas</p>
          </ImageBox>

          <Content>
            <span>매칭 분석 내용</span>
            <p>현재 프로토타입 개발 단계에 있으며, 제품 시장 적합성 검증이 주요 목표입니다. 고객의 문제가 명확히 정의되지 않았기 때문에, 시장 검증을 통해 초기 고객의 피드백을 바탕으로 제품이 고객 문제를 해결할 수 있는지 확인해야 합니다. 비즈니스의 복잡한 요소들은 아직 고려하지 않아도 되는 상황입니다. 따라서, 린 캔버스를 통해 고객의 문제 정의와 시장에서 제품의 적합성을 검증하는 데 집중해야 합니다.</p>
          </Content>
        </CanvasWrap>
      </Wrap>

      {/* 린 캔버스 */}
      <BoxWrap>
        <h1>홈케어 뷰티 디바이스와 기능성 화장품의 비즈니스 모델 캔버스 - 기본형</h1>
        <p>따릉이는 서울 시민과 방문자에게 저렴하고 편리한 공공 자전거 대여 서비스를 제공합니다. 모바일 앱을 통해 쉽고 빠르게 자전거를 대여하고, 서울 전역의 다양한 대여소에서 자유롭게 반납할 수 있습니다. 따릉이는 교통 혼잡을 피하고 환경 보호를 실천하면서 건강도 증진시킬 수 있는 스마트한 교통 수단입니다. 정기적인 자전거 유지보수와 안전 점검으로 신뢰성을 높이고, 대여비와 구독 모델을 통해 합리적인 비용으로 지속 가능한 서비스를 운영하고 있습니다.</p>

        <ModelCanvasWrap>
          <CanvasSection>
            <CanvasList>
              <section>
                <strong>
                  문제
                  <span><img src={images.IconCanvas01} alt="" /></span>
                </strong>
                <div>
                  <p>고객들이 배달비 부담을 줄이는 문제를 해결하고자 합니다.<br />특히, 개별 배달 주문 시 높은 배달비에 대한 고객의 불편함을 해결하는 것이 주요 목표입니다.</p>
                  <ul>
                    <li>자전거 유지 보수</li>
                    <li>앱 관리</li>
                  </ul>
                </div>
              </section>
            </CanvasList>

            <CanvasList Num2>
              <section>
                <strong>
                  솔루션
                  <span><img src={images.IconCanvas11} alt="" /></span>
                </strong>
                <div>
                  <p>고객핵심기능 : 팀매칭을 통해 여러 사용자가 동일한 배달 시간에 주문을 묶어서 처리합니다.</p>
                </div>
              </section>

              <section>
                <strong>
                  핵심 자원
                  <span><img src={images.IconCanvas12} alt="" /></span>
                </strong>
                <div>
                  <p>성공 여부는 고객 획득 비용<br />고객 유지율<br />사용자 활성화 지표 평가</p>
                </div>
              </section>
            </CanvasList>

            <CanvasList>
              <section>
                <strong>
                  가치 제안
                  <span><img src={images.IconCanvas04} alt="" /></span>
                </strong>
                <div>
                  <p>따릉이는 서울 시민에게 저렴하고 편리한 공공 교통 수단을 제공하며, 환경 보호와 건강 증진이라는 가치를 동시에 제공합니다.</p>
                  <ul>
                    <li>키워드</li>
                    <li>키워드</li>
                  </ul>
                </div>
              </section>
            </CanvasList>

            <CanvasList Num2>
              <section>
                <strong>
                  경쟁우위
                  <span><img src={images.IconCanvas13} alt="" /></span>
                </strong>
                <div>
                  <p>따릉이는 모바일 앱을 통한 맞춤형 서비스와 자전거 유지보수를 통해 고객과의 신뢰를 강화하며, 사용 후기와 고객 피드백을 반영해 지속적으로 시스템을 개선합니다.<br />따릉이는 모바일 앱을 통한 맞춤형 서비스와 자전거 유지보수를 통해 고객과의 신뢰를 강화하며, 사용 후기와 고객 피드백을 반영해 지속적으로 시스템을 개선합니다.<br />따릉이는 모바일 앱을 통한 맞춤형 서비스와 자전거 유지보수를 통해 고객과의 신뢰를 강화하며, 사용 후기와 고객 피드백을 반영해 지속적으로 시스템을 개선합니다.<br />따릉이는 모바일 앱을 통한 맞춤형 서비스와 자전거 유지보수를 통해 고객과의 신뢰를 강화하며, 사용 후기와 고객 피드백을 반영해 지속적으로 시스템을 개선합니다.</p>
                </div>
              </section>

              <section>
                <strong>
                  채널
                  <span><img src={images.IconCanvas06} alt="" /></span>
                </strong>
                <div>
                  <p>따릉이는 모바일 앱과 물리적인 대여소를 통해 고객에게 서비스를 제공합니다. 고객은 쉽고 빠르게 접근할 수 있으며, 온라인과 오프라인을 결합한 서비스 경험을 제공합니다.</p>
                </div>
              </section>
            </CanvasList>

            <CanvasList>
              <section>
                <strong>
                  고객 세그먼트
                  <span><img src={images.IconCanvas07} alt="" /></span>
                </strong>
                <div>
                  <p>배달비 절감을 원하는 다양한 연령대의 배달 서비스 사용자들을 타겟으로 하며, 특히 배달비가 부담스러운 고객들이 주요 타겟입니다 </p>
                </div>
              </section>
            </CanvasList>
          </CanvasSection>

          <CanvasSection>
            <CanvasList>
              <section>
                <strong>
                  비용
                  <span><img src={images.IconCanvas08} alt="" /></span>
                </strong>
                <div>
                  <p>
                    고정 비용 : 플랫폼 운영을 위한 서버 비용, 직원 급여 (직원 누구)<br />
                    변동 비용 : 사용자가 증가할 때마다 발생하는 배달 수수료 처리 비용<br />
                    운영 비용 : 앱 유지보수, 기술 지원, 마케팅 비용
                  </p>
                </div>
              </section>
            </CanvasList>

            <CanvasList>
              <section>
                <strong>
                  수익
                  <span><img src={images.IconCanvas09} alt="" /></span>
                </strong>
                <div>
                  <p>
                    배달비 절감을 제공하는 팀매칭 서비스는 구독 모델과 배달비 절감 후, 발생하는 소액 수수료 기반으로 수익을 창출합니다.
                    <span>* 너무 보편적 + 예외적인 케이스 제시 필요</span>
                  </p>
                </div>
              </section>
            </CanvasList>
          </CanvasSection>
        </ModelCanvasWrap>

        <ButtonWrap>
          <div />
          <div>
            <button type="button">
              <img src={images.IconCopy} alt="" />
              복사하기
            </button>
            <button type="button">
              <img src={images.IconSave} alt="" />
              저장하기
            </button>
          </div>
        </ButtonWrap>
      </BoxWrap>

      <Wrap>
        <Question>제시된 고객 세그먼트(Customer Segment) 중에서 하나를 골라주세요.</Question>
        <OptionContainer>
          <Option>방향성 1</Option>
          <Option>방향성 2</Option>
          <Option>방향성 3</Option>
          <Option>방향성 4</Option>
          <Option>방향성 5</Option>
        </OptionContainer>

        <ButtonWrap>
          <Pagination>
            <li><Link to="#" className="active">1</Link></li>
            <li><Link to="#">2</Link></li>
            <li><Link to="#">3</Link></li>
            <li><Link to="#">4</Link></li>
            <li><Link to="#">5</Link></li>
          </Pagination>

          <div>
            <button type="button">
              <img src={images.IconCopy} alt="" />
              복사하기
            </button>
            <button type="button">
              <img src={images.IconSave} alt="" />
              저장하기
            </button>
          </div>
        </ButtonWrap>
      </Wrap>
    </>
  );
};

export default BMExpert;

const Wrap = styled.div`
  max-width:540px;
  // width:100%;
  display:flex;
  flex-direction:column;
  padding:20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

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

const Question = styled.div`
  font-size: 0.88rem;
  font-weight:700;
  text-align:left;
  margin-bottom: 20px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction:column;
  justify-content:space-between;
  gap: 8px;
  margin-bottom:18px;
`;

const Option = styled.div`
  position:relative;
  display:flex;
  gap:8px;
  align-items:center;
  // flex: 1 1 40%;
  font-size:0.88rem;
  color: ${palette.gray800};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${palette.white};
  border: 1px solid ${palette.lineGray};
  transition:all .5s;

  &:before {
    width:20px;
    height:20px;
    border-radius:50%;
    border: 1px solid ${palette.lineGray};
    background-color: ${palette.white};
    transition:all .5s;
    content:'';
  }

  &:after {
    position:absolute;
    left:12px;
    top:8px;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }

  &:hover {
    border-color: none;
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

const TabWrap = styled.div`
  margin-top:10px;

  input[type=radio] {
    display:none;
  }

  label {
    position:relative;
    display:inline-block;
    font-size:0.63rem;
    font-weight:400;
    color:${palette.gray700};
    padding-bottom:3px;
    transition:all .5s;
    cursor:pointer;

    ~ label {
      margin-left:16px;
    }

    &:before {
      position:absolute;
      bottom:0;
      left:0;
      width:0;
      height:1px;
      background:${palette.gray700};
      transition:all .5s;
      content:'';
    }

    &:hover {
      font-weight:700;
    }
  }

  input:checked + label:before {
    width:100%;
  }

  #tab1:checked ~ #tab-content1,
  #tab2:checked ~ #tab-content2 {
    display:block;
  }
`;

const TabContents = styled.div`
  display:none;
  width:100%;
  padding:16px;
  margin-top:8px;
  border-radius:10px;
  background:${palette.gray50};

  p {
    font-size:0.63rem !important;
    color:${palette.gray700} !important;
    line-height:1.3;
  }

  ol {
    margin-top:8px;
    padding-top:8px;
    border-top:1px solid ${palette.gray100};

    li {
      font-size:0.63rem;
      font-weight:400;
      color:${palette.gray700};
      line-height:1.3;
      list-style:decimal;
      list-style-position: inside;

      + li {
        margin-top:4px;
      }
    }
  }
`;

const CanvasWrap = styled.div`
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

    span {
      font-size:0.88rem;
      font-weight:500;
      color:${palette.gray500};
    }
  }
`;

const ImageBox = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:20px;
  margin:32px auto;
  font-size:1.25rem;
  font-weight:500;
  padding:20px;
  border-radius:10px;
  background:${palette.chatGray};
`;

const Content = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
  font-size:0.88rem;
  color:${palette.gray800};
  line-height:1.3;
  text-align:left;
  margin:32px auto 0;
  padding-top:20px;
  border-top:1px solid ${palette.lineGray};

  span {
    font-weight:500;
    color:${palette.gray500};
  }
`;

const BoxWrap = styled.div`
  max-width:988px;
  width:100%;
  display:flex;
  flex-direction:column;
  text-align:left;
  padding:20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    margin-bottom:8px;
  }

  p {
    font-size:0.88rem;
    line-height:1.3;
  }
`;

const ModelCanvasWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  margin:24px auto;
`;

const CanvasSection = styled.div`
  display:flex;
  gap:12px;
`;

const CanvasList = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:12px;
  flex:1 1 19%;
  max-height:400px;

  ${props =>
    props.Num2 &&
    css`
      section {
        height:50% !important;
      }
    `
  }

  section {
    height:100%;
    padding:16px;
    border-radius:15px;
    background:${palette.chatGray};
    overflow:hidden;
  }

  strong {
    display:flex;
    align-items:center;
    justify-content:space-between;
    min-height:26px;
    font-size:0.88rem;
    font-weight:500;
    color:${palette.gray800};
    margin-bottom:16px;
    
    span {
      width:26px;
      height:26px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:100%;
      background:${palette.white};
    }
  }

  div {
    height:calc(100% - 40px);
    overflow-y:auto;
    scrollbar-width:thin;
  }

  p {
    font-size:0.75rem;
    color:${palette.gray800};
    line-height:1.3;

    span {
      display:block;
      font-size:0.63rem;
      margin-top:4px;
    }
  }

  ul {
    margin-top:12px;

    li {
      position:relative;
      font-size:0.75rem;
      line-height:1.3;
      padding-left:18px;

      + li {
        margin-top:5px;
      }

      &:before {
        position:absolute;
        left:8px;
        top:7px;
        width:2px;
        height:2px;
        border-radius:10px;
        background:${palette.gray800};
        content:'';
      }
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  // padding-top: 20px;
  // border-top: 1px solid ${palette.lineGray};

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Pretendard";
    font-size: 0.75rem;
    color: ${palette.gray};
    padding: 4px 8px;
    border-radius: 5px;
    border: 0;
    background: none;
    transition: all 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
  }

  .lineBtn {
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  > button {
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }
`;

const Pagination = styled.ul`
  display:flex;
  align-items:center;

  li + li:before {
    display:inline-block;
    width:1px;
    height:8px;
    background:${palette.gray300};
    content:'';
  }

  a {
    font-size:0.88rem;
    color:${palette.gray300};
    padding:0 10px;
    transition:all .5s;

    &:hover {
      color:${palette.gray700};
    }

    &.active {
      font-weight:500;
      color:${palette.chatBlue};
    }
  }
`;
