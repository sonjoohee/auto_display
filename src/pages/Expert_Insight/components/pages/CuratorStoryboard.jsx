import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";

const CuratorStoryboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState([false, false, false, false]);
  const toggleMenu = (index) => {
    setIsMenuOpen((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  useEffect(() => {
    const anyMenuOpen = isMenuOpen.some((open) => open);
    document.body.style.overflow = anyMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <ChatSlideWrap>
        <Overlay isMenuOpen={isMenuOpen.some((open) => open)} onClick={() => setIsMenuOpen([false, false, false, false])} />

        <ChatWrap isMenuOpen={isMenuOpen.some((open) => open)}>
          {/* 시장조사 시작하기 */}
          <ExportChat>
            <ChatBox>
              [창업 MBTI 성향이름] 창업가 이시군요! 그 성향에 맞는 [아이템 명]을 분석해드릴게요<br />당신의 스타일에 딱 맞는 창업 전략을 잡는데 도움이 되었으면 좋겠어요 ✨
            </ChatBox>
            <ChatBox>
              자! 이제 본격적인 준비를 시작해보겠습니다. 먼저 시장에서 [아이템 명]의 가능성을 한눈에 파악할 수 있는 시장조사를 바로 시작해볼게요
              <span className="time">1 min ago</span>
            </ChatBox>

            <SelectButton>
              <button>시장조사 시작하기 🚀</button>
            </SelectButton>
          </ExportChat>

          {/* BM분석 시작하기 */}
          <ExportChat>
            <ChatBox>
              시장조사가 진행 중 입니다... 🔍 잠시 후 시장조사 결과가 도착합니다.<br />과연 내가 선택한 아이템의 가능성은 ?!
            </ChatBox>

            <SummaryBox>
              <h3>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성</h3>
              <UlList Disc>
                <li><strong>시장 현황 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>업계 변화 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>고객의 변화 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성</li>
                <li><strong>경쟁사 상황 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을</li>
                <li><strong>추가 요인 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
              </UlList>
              <button onClick={() => toggleMenu(0)}>
                <img src={images.IconDetailView} alt="" />
                상세 내용 확인하기
              </button>
            </SummaryBox>

            <ChatBox>
              시장조사 완료! 🎉 아이템의 시장 현황은 어떤 것 같으신가요?
            </ChatBox>

            <ChatBox>
              지금 확인하신 시장조사 결과를 기반으로, 이제 비즈니스 모델(BM) 분석을 진행해볼 예정이에요.<br />이 분석을 통해 비즈니스 모델과 전략을 조금 더 구체적으로 세워볼 수 있을거에요 📊
              <span className="time">1 min ago</span>
            </ChatBox>

            <SelectButton>
              <button>BM분석 시작하기 📈</button>
            </SelectButton>
          </ExportChat>

          {/* 고객 분석으로 잠재력 발견하기 */}
          <ExportChat>
            <ChatBox>
              BM 분석을 진행 중입니다! [아이템 명]의 시장 겅공 가능성을 구체화하는 중이에요.<br />곧 나올 비즈니스 모델 전략, 과연 대박 전략일까요? 신박한 발견 일까요? 👀
            </ChatBox>

            <SummaryBox>
              <h3>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성</h3>
              <UlList Number>
                <li><strong>타겟 고객군 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>가치 제안 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>채널 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성</li>
                <li><strong>고객관계 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을</li>
                <li><strong>수익원 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>핵심활동 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>핵심자원 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>파트너쉽 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>비용구조 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
              </UlList>
              <button onClick={() => toggleMenu(1)}>
                <img src={images.IconDetailView} alt="" />
                상세 내용 확인하기
              </button>
            </SummaryBox>

            <ChatBox>
              분석 완료 ! 시장 환경 속에서 확실한 입지를 다질 수 있는 포인트가 무엇인지 확인해보세요 🎯
            </ChatBox>

            <ChatBox>
              여기까지가 기본 분석이었어요! 이제 아이템의 성공 가능성을 최대한 끌어올릴 차례입니다.<br />더 정확한 타겟 분석과 최적화된 사업 전략을 만들어 봐야겠죠?!  
              <span className="time">1 min ago</span>
            </ChatBox>

            <SelectButton>
              <button>고객 분석으로 잠재력 발견하기 🔎</button>
            </SelectButton>
          </ExportChat>

          {/* 고객유형 선택하기 */}
          <ExportChat>
            <ChatBox>
              이 아이템에 매력을 느낄 주요 고객은 누구일까요?<br />가장 적합하다고 생각하는 타겟을 골라주세요
            </ChatBox>

            <SelectBoxWrap>
              <Question>아래 고객 유형 중, 어떤 고객이 주요 고객이라고 생각하시나요?</Question>
              <OptionContainer Column>
                <Option>고객 1</Option>
                <Option>고객 2</Option>
                <Option>고객 3</Option>
                <Option>고객 4</Option>
                <Option>고객 5</Option>
              </OptionContainer>

              <ButtonWrap>
                <div />
                <div className="next">확인</div>
              </ButtonWrap>
            </SelectBoxWrap>
          </ExportChat>

          {/* 세그먼트에 대한 요약 */}
          <ExportChat>
            <ChatBox>
              [고객 1]을 주요 고객으로 생각하시는 군요,<br />그럼 이 고객에게 어떤 매력 포인트가 먹힐지, 어떻게 포지셔닝을 하면 좋을지 확인해볼게요 💭 
            </ChatBox>

            <SummaryBox>
              <h3>세그먼트에 대한 요약 </h3>
              <UlList Disc>
                <li><strong>특징 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>시장현황 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>맞춤형 기능 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을</li>
                <li><strong>핵심 경쟁력 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성</li>
              </UlList>
              <button onClick={() => toggleMenu(2)}>
                <img src={images.IconDetailView} alt="" />
                상세 내용 확인하기
              </button>
            </SummaryBox>

            <ChatBox>
              좋습니다🌞 첫번째 주요 고객을 확인해보았습니다.<br />다른 고객들도 주요 고객이라고 생각하신다면, 추가적으로 더 확인해볼게요! (총 3회 가능)
              <span className="time">1 min ago</span>
            </ChatBox>

            <SelectButton>
              <button>다른 고객도 알아보기 🔎</button>
              <button>[고객 1]로 잠재력 지수 알아보기 ⭐</button>
              <button className="finish">저장하지 않고 종료하기 😱</button>
            </SelectButton>
          </ExportChat>

          {/* 고객유형 선택하기 */}
          <ExportChat>
            <ChatBox>
              다른 고객들은 어떤 특징을 갖고 있는지 확인이 필요하죠 !<br />어떤 고객이 아이템에 관심을 갖을까요? 
            </ChatBox>

            <SelectBoxWrap>
              <Question>아래 고객 유형 중, 어떤 고객이 주요 고객이라고 생각하시나요?</Question>
              <OptionContainer Column>
                <Option Disabled>고객 1</Option>
                <Option Checked>고객 2</Option>
                <Option>고객 3</Option>
                <Option>고객 4</Option>
                <Option>고객 5</Option>
              </OptionContainer>

              <ButtonWrap>
                <div />
                <div className="next">확인</div>
              </ButtonWrap>
            </SelectBoxWrap>
          </ExportChat>

          {/* 세그먼트에 대한 요약 */}
          <ExportChat>
            <ChatBox>
              [고객 3]으로 마지막 주요 고객층을 선택하셨네요 🙌🏻<br />마지막으로 아이템은 어떻게 달라질까요? 
            </ChatBox>

            <SummaryBox>
              <h3>세그먼트에 대한 요약 </h3>
              <UlList Disc>
                <li><strong>특징 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>시장현황 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성합니다</li>
                <li><strong>맞춤형 기능 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을</li>
                <li><strong>핵심 경쟁력 :</strong> 시장은 비대면 교육과 시니어의 디지털 참여 확대에 긍정적이며, 이는 비즈니스 아이템에 유리한 조건을 조성</li>
              </UlList>
              <button onClick={() => toggleMenu(2)}>
                <img src={images.IconDetailView} alt="" />
                상세 내용 확인하기
              </button>
            </SummaryBox>

            <ChatBox>
              세 가지 타겟 고객층을 모두 확인해 보았습니다. 이제 [아이템 명]에 가장 적합하다고 생각하는 핵심 타겟 고객층을 하나 선택해 주세요<br />선택하신 타겟층을 중심으로 서비스의 잠재력을 집중 분석해 보겠습니다. 🚀
              <span className="time">1 min ago</span>
            </ChatBox>

            <SelectButton>
              <button>고객 1</button>
              <button>고객 2</button>
              <button>고객 3</button>
            </SelectButton>
          </ExportChat>

          {/* 잠재력 확인 */}
          <ExportChat>
            <ChatBox>
              이제 [고객 1]을 타겟 고객으로 한 [아이템 명]의 잠재력을 확인해 볼 시간입니다.<br />과연 대박 가능성을 품고 있을까요? 👀
            </ChatBox>

            <SummaryBox>
              <h2>
                퇴직 후 여가와 의미 있는 삶을 위한<br />시니어 맞춤형 가족 참여 교육 플랫폼
                <p>비즈니스 아이템에 유리한 조건을 조성합니다. 비즈니스 아이템에 유리한 조건을 조성합니다.비즈니스 아이템에 유리한 조건을 조성합니다. 비즈니스 아이템에 유리한 조건을 조성합니다. 비즈니스 아이템에 유리한 조건을 조성합니다.비즈니스 아이템에 유리한 조건을 조성합니다비즈니스 아이템에 유리한 조건을 조성합니다. 비즈니스 아이템에 유리한 조건을 조성합니다.</p>
              </h2>

              {isExpanded && (
                <WhiteBoxWrap>
                  <h3>
                    <span>📌</span>아이템의 핵심 내용을 다음과 같이 정리했어요
                  </h3>
                  <UlList Disc>
                    <li><strong>특정 행동 :</strong> 퇴직 후 여가 시간을 활용하여 자기계발을 하고자 하는 행동</li>
                    <li><strong>사용 목적 :</strong> 퇴직한 60대 이상의 시니어층으로, 활기차고 의미 있는 삶을 추구하는 은퇴자들</li>
                    <li><strong>제공 가치 :</strong> 교육을 통한 자기계발, 사회적 교류, 정서적 안정 및 삶의 질 향상</li>
                    <li><strong>필요한 요소 :</strong> 시니어 친화적인 UI, 맞춤형 학습 경로, 음성 안내, 가족 참여 기능, 커뮤니티 활동을 포함한 교육 콘텐츠</li>
                    <li><strong>프로덕트 타입 :</strong> 온라인 교육 플랫폼</li>
                  </UlList>
                </WhiteBoxWrap>
              )}

              <ProgressWrap isExpanded={isExpanded}>
                {isExpanded && (
                  <h3>
                    <span>📌</span>아이템으로 사업을 시작하시기 전 검토해야할 내용이에요
                  </h3>
                )}

                <div>
                  <Progress>
                    <strong>아이템 차별성</strong>
                    <ProgressBar>
                      <div style={{width:"70%"}}></div>
                    </ProgressBar>
                    <span>7점</span>
                  </Progress>
                  {isExpanded && (
                    <p>플랫폼은 시니어 친화적인 UI, 맞춤형 학습 경로, 음성 안내, 가족 참여 기능 등 시니어층의 요구에 특화된 기능을 갖추고 있어 차별성을 보유합니다. 특히, 가족 참여 기능은 시니어 사용자가 쉽게 접근할 수 있는 환경을 조성해 초기 참여를 유도합니다. 다만, 혁신적 기술로 평가되기에는 제한적이며, 경쟁사들이 쉽게 유사 기능을 도입할 가능성이 있어 높은 점수를 부여하기는 어렵습니다.</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>시장성</strong>
                    <ProgressBar>
                      <div style={{width:"100%"}}></div>
                    </ProgressBar>
                    <span>10점</span>
                  </Progress>
                  {isExpanded && (
                    <p>글로벌 시니어 교육 시장의 연평균 성장률이 6.3%에 이르는 등 성장 가능성이 높습니다. COVID-19 이후 비대면 교육과 자기계발 수요가 증가하고 있어 이 시장의 확장성도 충분합니다. 다만, 디지털 적응도가 낮은 시니어층이 플랫폼을 사용하는 데 시간이 걸릴 수 있는 점은 한계로 작용할 수 있습니다.</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>수익모델</strong>
                    <ProgressBar>
                      <div style={{width:"50%"}}></div>
                    </ProgressBar>
                    <span>5점</span>
                  </Progress>
                  {isExpanded && (
                    <p>이 플랫폼은 시니어 사용자와 가족 구성원의 결제 가능성을 모두 고려한 수익 모델을 지니고 있습니다. 가족이 쉽게 결제를 진행할 수 있는 기능(예: 선물 결제, 간편 결제 옵션)을 제공하고, 시니어 본인이 결제를 진행할 경우 소액 결제 방식을 통해 진입 장벽을 낮출 수 있습니다. 이러한 결제 유연성은 수익성을 높이고, 가족이 선물 형태로 결제할 수 있도록 돕는 전략은 고객 충성도를 높이는 데 기여할 수 있습니다.</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>비전</strong>
                    <ProgressBar>
                      <div style={{width:"10%"}}></div>
                    </ProgressBar>
                    <span>1점</span>
                  </Progress>
                  {isExpanded && (
                    <p>시니어층의 자기계발과 삶의 질 향상에 대한 관심이 꾸준히 증가하고 있으며, 이는 플랫폼의 장기 성장 가능성에 긍정적 요소로 작용합니다. 그러나 경쟁사들이 유사한 서비스를 제공하거나 기술적 우위를 확보할 경우 비전 달성에 제약이 있을 수 있어 지속적인 차별화와 기술 혁신이 필요합니다.</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>시장 진입장벽</strong>
                    <ProgressBar>
                      <div style={{width:"70%"}}></div>
                    </ProgressBar>
                    <span>7점</span>
                  </Progress>
                  {isExpanded && (
                    <p>기존의 오프라인 중심 교육 프로그램과 시니어층의 디지털 전환 저항이 주요 진입 장벽입니다. 디지털 경험이 부족한 시니어층은 초기에 적응에 어려움을 겪을 수 있으나, 개인 맞춤형 서비스와 고객 지원을 통해 이 장벽을 낮출 수 있는 여지가 있습니다.</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>희소성</strong>
                    <ProgressBar>
                      <div style={{width:"40%"}}></div>
                    </ProgressBar>
                    <span>4점</span>
                  </Progress>
                  {isExpanded && (
                    <p>가족 참여와 맞춤형 학습 경로는 시니어층의 필요에 최적화된 요소로, 플랫폼의 고유한 강점이 됩니다. 가족의 참여가 초기 적응을 돕고 장기적인 충성도를 유도할 수 있어 시장에서 쉽게 모방하기 어려운 고유의 희소성을 확보하고 있습니다.</p>
                  )}
                </div>

                <div>
                  <Progress>
                    <strong>적응성</strong>
                    <ProgressBar>
                      <div style={{width:"20%"}}></div>
                    </ProgressBar>
                    <span>2점</span>
                  </Progress>
                  {isExpanded && (
                    <p>플랫폼은 시니어층이 쉽게 적응할 수 있도록 설계되었으나, 시장 트렌드 변화에 대한 대응은 다소 제한적입니다. 시니어층의 변화 속도가 느리지만, 새로운 기술 도입과 콘텐츠 업데이트가 지속되지 않으면 경쟁력 약화의 우려가 있습니다. 초기 단계에서 기술적 투자를 통한 적응성 향상이 필요합니다.</p>
                  )}
                </div>
              </ProgressWrap>

              {isExpanded && (
                <WhiteBoxWrap>
                  <h3>
                    <span>📌</span>앞으로 이런 부분을 고려하세요
                  </h3>
                  <UlList Disc>
                    <li><strong>AI와 웨어러블 기기 연계로 수익 모델 다각화 :</strong> 기존의 광고와 프리미엄 구독 외에도, AI 기술을 활용한 데이터 분석과 웨어러블 기기와의 연계를 통해 사용자 맞춤형 건강 및 웰니스 프로그램과 연결하여 수익성을 높이는 전략이 필요합니다.</li>
                    <li><strong>장기적 비전을 위한 기술적 혁신과 고객 신뢰 구축 :</strong> 장기적인 충성도 확보를 위해서는 데이터 보안과 신뢰성을 강화하면서, 사용자 데이터를 기반으로 새로운 맞춤형 솔루션을 지속적으로 개발해야 합니다. 이외에도 사용자 피드백을 적극 반영하여 고객 중심의 기능 개선을 이루고, 개인화된 경험을 제공하여 충성도 높은 고객층을 형성할 필요가 있습니다.</li>
                  </UlList>
                </WhiteBoxWrap>
              )}

              <ButtonDetail onClick={handleToggle}>
                {isExpanded ? '닫기' : '상세 내용 확인하기'}
              </ButtonDetail>
            </SummaryBox>
          </ExportChat>
        </ChatWrap>

        <Sidebar isMenuOpen={isMenuOpen[0]}>
          <div>
            <div className="header">
              <h5>시장조사 상세 리포트</h5>
              <button className="closePopup" onClick={() => setIsMenuOpen([false, false, false, false])}>닫기</button>
            </div>
            <div className="body">
              <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다. 다만, 참신함이 곧 블루 오션을 의미하지 않으므로, 진입 전략은 사용자 친화적 디자인, 가족의 참여를 유도하는 마케팅, 맞춤형 프로그램으로 보강해야 합니다.</p>
              <ScrollWrap>
                <ListBox>
                  <div>
                    <span>📌</span>
                    <div>
                      <strong>시장에 이슈가 있는 걸까?</strong>
                      <p>고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을<br />기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻</p>
                    </div>
                  </div>
                  <div>
                    <span>⏰</span>
                    <div>
                      <strong>업계에 변화가 생긴 걸까?</strong>
                      <p>고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을<br />기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻</p>
                    </div>
                  </div>
                  <div>
                    <span>👩🏻‍🦰</span>
                    <div>
                      <strong>고객의 소비가 변한 걸까?</strong>
                      <p>고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을<br />기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻</p>
                    </div>
                  </div>
                  <div>
                    <span>🤝🏻</span>
                    <div>
                      <strong>경쟁사 상황은 어떠할까?</strong>
                      <p>고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을<br />기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻</p>
                    </div>
                  </div>
                  <div>
                    <span>🔎</span>
                    <div>
                      <strong>다른 요인이 더 있을까?</strong>
                      <p>고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을<br />기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻</p>
                    </div>
                  </div>
                </ListBox>
              </ScrollWrap>
            </div>
          </div>
        </Sidebar>

        <Sidebar isMenuOpen={isMenuOpen[1]}>
          <div>
            <div className="header">
              <h5>비즈니스 모델 상세 리포트</h5>
              <button className="closePopup" onClick={() => setIsMenuOpen([false, false, false, false])}>닫기</button>
            </div>
            <div className="body">
              <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다. 다만, 참신함이 곧 블루 오션을 의미하지 않으므로, 진입 전략은 사용자 친화적 디자인, 가족의 참여를 유도하는 마케팅, 맞춤형 프로그램으로 보강해야 합니다.</p>
              <ScrollWrap>
                <ListBox>
                  <div>
                    <span><img src={images.IconCanvas07} alt="" /></span>
                    <div>
                      <strong>타겟 고객군</strong>
                      <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                      <p className="tag">
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas04} alt="" /></span>
                    <div>
                      <strong>가치 제안</strong>
                      <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                      <p className="tag">
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas06} alt="" /></span>
                    <div>
                      <strong>채널</strong>
                      <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                      <p className="tag">
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas05} alt="" /></span>
                    <div>
                      <strong>고객관계</strong>
                      <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                      <p className="tag">
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas09} alt="" /></span>
                    <div>
                      <strong>수익원</strong>
                      <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                      <p className="tag">
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas02} alt="" /></span>
                    <div>
                      <strong>핵심활동</strong>
                      <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                      <p className="tag">
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas03} alt="" /></span>
                    <div>
                      <strong>핵심자원</strong>
                      <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                      <p className="tag">
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas01} alt="" /></span>
                    <div>
                      <strong>핵심 파트너십</strong>
                      <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                      <p className="tag">
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span><img src={images.IconCanvas08} alt="" /></span>
                    <div>
                      <strong>비용구조</strong>
                      <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                      <p className="tag">
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                        <span>#키워드</span>
                      </p>
                    </div>
                  </div>
                </ListBox>
              </ScrollWrap>
            </div>
          </div>
        </Sidebar>

        <Sidebar isMenuOpen={isMenuOpen[2]}>
          <div>
            <div className="header">
              <h5>고객 세그먼트 명 상세 내용</h5>
              <button className="closePopup" onClick={() => setIsMenuOpen([false, false, false, false])}>닫기</button>
            </div>
            <div className="body">
              <ScrollWrap>
                <ListBox>
                  <div>
                    <span>📌</span>
                    <div>
                      <strong>특징 : 은퇴 후 새로운 활동과 학습을 통해 삶의 질을 높이고자 합니다.</strong>
                      <p>이들은 퇴직 후 여가 시간을 활용하여 다양한 교육과 사회적 교류 활동을 통해 생활에 활력을 더하고자 합니다. 기존 오프라인 활동의 한계를 보완할 수 있는 디지털 플랫폼의 필요성을 인식하고 있으며, 맞춤형 프로그램과 사회적 교류 기능을 중요시합니다.</p>
                    </div>
                  </div>
                  <div>
                    <span>📈</span>
                    <div>
                      <strong>시장 현황 : 시니어 디지털 교육 시장은 연평균 6.3% 성장 중입니다.</strong>
                      <p>글로벌 시니어 교육 시장은 지속적인 성장세를 보이고 있으며, 특히 COVID-19 이후 비대면 서비스의 중요성이 부각되었습니다. 일본의 'Silver Online Academy'는 비대면 교육으로 사용자 수가 전년 대비 40% 증가했으며, 이는 시니어들이 디지털 교육의 가치를 점점 더 인식하고 있음을 보여줍니다.</p>
                    </div>
                  </div>
                  <div>
                    <span>⚙</span>
                    <div>
                      <strong>맞춤형 기능 : 단순한 UI, 음성 안내, 맞춤형 학습 경로, 커뮤니티 포럼.</strong>
                      <p>시니어 사용자들이 쉽게 이해하고 사용할 수 있는 단순한 UI와 음성 안내 기능은 사용자 친화성을 높이며, 맞춤형 학습 경로와 포럼은 참여와 만족도를 높입니다.</p>
                    </div>
                  </div>
                  <div>
                    <span>🔑</span>
                    <div>
                      <strong>핵심 경쟁력 : 사용자 친화적인 플랫폼과 개인 맞춤형 콘텐츠로 차별화합니다.</strong>
                      <p>기존 오프라인 프로그램의 한계를 극복하고 디지털 경험을 향상시키는 사용자 친화적 설계는 경쟁사 대비 차별화 요소가 됩니다. 플랫폼은 고객 충성도를 높이고 모방이 어려운 기술적 인프라와 콘텐츠 큐레이션을 통해 희소성을 보장합니다.</p>
                    </div>
                  </div>
                </ListBox>
              </ScrollWrap>
            </div>
          </div>
        </Sidebar>
      </ChatSlideWrap>


{/* 
      {popups.popup1 && (
        <Popup
          title="Popup 1"
          onClose={() => closePopup('popup1')}
        >
          <div>
            <div className="header">
              <h5>시장조사 상세 리포트</h5>
              <button className="closePopup" onClick={() => closePopup('popup1')}>닫기</button>
            </div>
            <div className="body">
              <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다. 다만, 참신함이 곧 블루 오션을 의미하지 않으므로, 진입 전략은 사용자 친화적 디자인, 가족의 참여를 유도하는 마케팅, 맞춤형 프로그램으로 보강해야 합니다.</p>
              <ListBox>
                <div>
                  <span>📌</span>
                  <div>
                    <strong>시장에 이슈가 있는 걸까?</strong>
                    <p>고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을<br />기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻</p>
                  </div>
                </div>
                <div>
                  <span>⏰</span>
                  <div>
                    <strong>업계에 변화가 생긴 걸까?</strong>
                    <p>고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을<br />기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻</p>
                  </div>
                </div>
                <div>
                  <span>👩🏻‍🦰</span>
                  <div>
                    <strong>고객의 소비가 변한 걸까?</strong>
                    <p>고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을<br />기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻</p>
                  </div>
                </div>
                <div>
                  <span>🤝🏻</span>
                  <div>
                    <strong>경쟁사 상황은 어떠할까?</strong>
                    <p>고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을<br />기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻</p>
                  </div>
                </div>
                <div>
                  <span>🔎</span>
                  <div>
                    <strong>다른 요인이 더 있을까?</strong>
                    <p>고객 요구사항을 확인하셨다면, 이제 주요 기능 및 특성과 고객 요구 사항을<br />기반으로 다양한 아이디어를 발상하는 단계입니다. 제가 최대한 많은 아이디어를 도출해볼게요 🙌🏻</p>
                  </div>
                </div>
              </ListBox>
            </div>
          </div>
        </Popup>
      )}
      {popups.popup2 && (
        <Popup
          title="Popup 2"
          content="This is the second popup."
          onClose={() => closePopup('popup2')}
        >
          <div>
            <div className="header">
              <h5>비즈니스 모델 상세 리포트</h5>
              <button className="closePopup" onClick={() => closePopup('popup2')}>닫기</button>
            </div>
            <div className="body">
              <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다. 다만, 참신함이 곧 블루 오션을 의미하지 않으므로, 진입 전략은 사용자 친화적 디자인, 가족의 참여를 유도하는 마케팅, 맞춤형 프로그램으로 보강해야 합니다.</p>
              <ListBox>
                <div>
                  <span><img src={images.IconCanvas07} alt="" /></span>
                  <div>
                    <strong>타겟 고객군</strong>
                    <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                    <p className="tag">
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                    </p>
                  </div>
                </div>
                <div>
                  <span><img src={images.IconCanvas04} alt="" /></span>
                  <div>
                    <strong>가치 제안</strong>
                    <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                    <p className="tag">
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                    </p>
                  </div>
                </div>
                <div>
                  <span><img src={images.IconCanvas06} alt="" /></span>
                  <div>
                    <strong>채널</strong>
                    <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                    <p className="tag">
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                    </p>
                  </div>
                </div>
                <div>
                  <span><img src={images.IconCanvas05} alt="" /></span>
                  <div>
                    <strong>고객관계</strong>
                    <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                    <p className="tag">
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                    </p>
                  </div>
                </div>
                <div>
                  <span><img src={images.IconCanvas09} alt="" /></span>
                  <div>
                    <strong>수익원</strong>
                    <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                    <p className="tag">
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                    </p>
                  </div>
                </div>
                <div>
                  <span><img src={images.IconCanvas02} alt="" /></span>
                  <div>
                    <strong>핵심활동</strong>
                    <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                    <p className="tag">
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                    </p>
                  </div>
                </div>
                <div>
                  <span><img src={images.IconCanvas03} alt="" /></span>
                  <div>
                    <strong>핵심자원</strong>
                    <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                    <p className="tag">
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                    </p>
                  </div>
                </div>
                <div>
                  <span><img src={images.IconCanvas01} alt="" /></span>
                  <div>
                    <strong>핵심 파트너십</strong>
                    <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                    <p className="tag">
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                    </p>
                  </div>
                </div>
                <div>
                  <span><img src={images.IconCanvas08} alt="" /></span>
                  <div>
                    <strong>비용구조</strong>
                    <p>이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다.</p>
                    <p className="tag">
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                      <span>#키워드</span>
                    </p>
                  </div>
                </div>
              </ListBox>
            </div>
          </div>
        </Popup>
      )}
      {popups.popup3 && (
        <Popup
          title="Popup 3"
          content="This is the third popup."
          onClose={() => closePopup('popup3')}
        >
          <div>
            <div className="header">
              <h5>고객 세그먼트 명 상세 내용</h5>
              <button className="closePopup" onClick={() => closePopup('popup3')}>닫기</button>
            </div>
            <div className="body">
              <ListBox>
                <div>
                  <span>📌</span>
                  <div>
                    <strong>특징 : 은퇴 후 새로운 활동과 학습을 통해 삶의 질을 높이고자 합니다.</strong>
                    <p>이들은 퇴직 후 여가 시간을 활용하여 다양한 교육과 사회적 교류 활동을 통해 생활에 활력을 더하고자 합니다. 기존 오프라인 활동의 한계를 보완할 수 있는 디지털 플랫폼의 필요성을 인식하고 있으며, 맞춤형 프로그램과 사회적 교류 기능을 중요시합니다.</p>
                  </div>
                </div>
                <div>
                  <span>📈</span>
                  <div>
                    <strong>시장 현황 : 시니어 디지털 교육 시장은 연평균 6.3% 성장 중입니다.</strong>
                    <p>글로벌 시니어 교육 시장은 지속적인 성장세를 보이고 있으며, 특히 COVID-19 이후 비대면 서비스의 중요성이 부각되었습니다. 일본의 'Silver Online Academy'는 비대면 교육으로 사용자 수가 전년 대비 40% 증가했으며, 이는 시니어들이 디지털 교육의 가치를 점점 더 인식하고 있음을 보여줍니다.</p>
                  </div>
                </div>
                <div>
                  <span>⚙</span>
                  <div>
                    <strong>맞춤형 기능 : 단순한 UI, 음성 안내, 맞춤형 학습 경로, 커뮤니티 포럼.</strong>
                    <p>시니어 사용자들이 쉽게 이해하고 사용할 수 있는 단순한 UI와 음성 안내 기능은 사용자 친화성을 높이며, 맞춤형 학습 경로와 포럼은 참여와 만족도를 높입니다.</p>
                  </div>
                </div>
                <div>
                  <span>🔑</span>
                  <div>
                    <strong>핵심 경쟁력 : 사용자 친화적인 플랫폼과 개인 맞춤형 콘텐츠로 차별화합니다.</strong>
                    <p>기존 오프라인 프로그램의 한계를 극복하고 디지털 경험을 향상시키는 사용자 친화적 설계는 경쟁사 대비 차별화 요소가 됩니다. 플랫폼은 고객 충성도를 높이고 모방이 어려운 기술적 인프라와 콘텐츠 큐레이션을 통해 희소성을 보장합니다.</p>
                  </div>
                </div>
              </ListBox>
            </div>
          </div>
        </Popup>
      )}
      {popups.popup4 && (
        <Popup
          title="Popup 4"
          content="This is the third popup."
          onClose={() => closePopup('popup4')}
        >
          <div>
            <div className="header">
              <h5>
                퇴직 후 여가와 의미 있는 삶을 위한<br />시니어 맞춤형 가족 참여 교육 플랫폼
                <p>비즈니스 아이템에 유리한 조건을 조성합니다. 비즈니스 아이템에 유리한 조건을 조성합니다.비즈니스 아이템에 유리한 조건을 조성합니다. 비즈니스 아이템에 유리한 조건을 조성합니다. 비즈니스 아이템에 유리한 조건을 조성합니다.비즈니스 아이템에 유리한 조건을 조성합니다비즈니스 아이템에 유리한 조건을 조성합니다. 비즈니스 아이템에 유리한 조건을 조성합니다.</p>
              </h5>
              <button className="closePopup" onClick={() => closePopup('popup4')}>닫기</button>
            </div>
            <div className="body">
            </div>
          </div>
        </Popup>
      )}
       */}
    </>
  );
};

export default CuratorStoryboard;

const ChatSlideWrap = styled.div`
  position:relative;
  min-width:1200px;
  padding-left:0;
  // overflow:hidden;

  display:flex;
  overflow: ${({ isMenuOpen }) => (isMenuOpen ? 'hidden' : 'auto')}; 
`;

const ChatWrap = styled.div`
  position: relative;
  // height: calc(100% - 55px);
  // min-height:90%;
  // padding: ${({ isMenuOpen }) => (isMenuOpen ? '0 800px 0 0' : '0')};
  // transform: ${({ isMenuOpen }) => (isMenuOpen ? 'translateX(-300px)' : 'translateX(0)')};
  // overflow: ${({ isMenuOpen }) => (isMenuOpen ? 'hidden' : 'auto')};
  transition:all .5s;

  max-width:100%;
  display:flex;
  flex-direction:column;
  flex:1 1 0%;
  // overflow:hidden;
  padding-right: ${({ isMenuOpen }) => (isMenuOpen ? '800px' : '0')};
  overflow: ${({ isMenuOpen }) => (isMenuOpen ? 'hidden' : 'auto')};

  gap:50px; /* 추후 삭제할 내용 */
`;

const ExportChat = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
`;

const ChatBox = styled.div`
  position:relative;
  max-width:80%;
  width:fit-content;
  display:inline-flex;
  font-weight:300;
  color:${palette.gray800};
  line-height:1.6;
  text-align:left;
  padding:14px 20px;
  border-radius:15px;
  border:1px solid ${palette.gray200};

  .time {
    position:absolute;
    right:-80px;
    bottom:1px;
    font-size:0.75rem;
    color:${palette.gray500};
  }
`;

const SelectButton = styled.div`
  display:flex;
  align-items:center;
  gap:12px;

  button {
    // display:inline-block;
    // width:fit-content;
    font-family: 'Pretendard', 'Poppins';
    font-size:0.88rem;
    color:${palette.chatBlue};
    padding:8px 20px;
    border-radius:40px;
    border:0;
    background:rgba(4, 83, 244, 0.1);
  }

  .finish {
    color:${palette.gray500};
    background:${palette.gray100};
  }
`;

const SummaryBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  max-width:825px;
  width:fit-content;
  text-align:left;
  padding:20px;
  border-radius:20px;
  background:${palette.chatGray};

  h2 {
    font-size:1.5rem;
    font-weight:600;
    line-height:1.3;
    color:${palette.gray800};

    p {
      font-size:1rem;
      font-weight:300;
      line-height:1.5;
      color:${palette.gray800};
      margin-top:16px;
    }
  }

  h3 {
    font-size:1rem;
    font-weight:500;
    color:${palette.gray800};
    line-height:1.6;
  }

  > span {
    display:flex;
    align-items:center;
    gap:4px;
    font-size:0.75rem;
    color:${palette.gray500};
    margin-top:4px;
  }

  button {
    display:flex;
    align-items:center;
    gap:5px;
    font-family: 'Pretendard', 'Poppins';
    font-size:0.75rem;
    color:${palette.gray500};
    padding:6px 0;
    margin-top:5px;
    border:0;
    background:none;
  }
`;

const UlList = styled.ul`
  display:flex;
  flex-direction:column;
  // gap:8px;

  li {
    position:relative;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    padding-left:26px;
  }

  ${props =>
    props.Disc &&
    css`
      li {
        &:before {
          position:absolute;
          left:8px;
          top:8px;
          width:3px;
          height:3px;
          display:inline-block;
          border-radius:10px;
          background:${palette.gray800};
          content:'';
        }
      }
    `
  }

  ${props =>
    props.Number &&
    css`
      counter-reset: list-counter;

      li {
        counter-increment: list-counter;

        &:before {
          position:absolute;
          left:0;
          top:2px;
          width:18px;
          height:18px;
          display:flex;
          justify-content:center;
          align-items:center;
          font-size:0.69rem;
          font-weight:600;
          text-align:center;
          border-radius:50px;
          border:1px solid ${palette.gray800};
          content:counter(list-counter);
        }
      }
    `
  }

  strong {
    font-weight:500;
  }

`;

const SelectBoxWrap = styled.div`
  max-width:540px;
  width:100%;
  display:flex;
  flex-direction:column;
  gap:12px;
  padding:20px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};
`;

const Question = styled.div`
  font-size:0.88rem;
  font-weight:700;
  text-align:left;
`;

const OptionContainer = styled.div`
  display:flex;
  flex-wrap:wrap;
  flex-direction: ${props => {
    if (props.Column) return 'column';
    else return `row`;
  }};
  gap:8px;
`;

const Option = styled.div`
  position:relative;
  display:flex;
  gap:8px;
  align-items:center;
  font-size:0.88rem;
  color: ${props => {
    if (props.Disabled) return `${palette.gray500}`;
    else return `${palette.gray800}`;
  }};
  padding:8px 12px;
  border-radius:8px;
  border: ${props => {
    if (props.Checked) return `2px solid ${palette.chatBlue}`;
    else return `1px solid ${palette.outlineGray}`;
  }};

  background: ${props => {
    if (props.Disabled) return `${palette.gray100}`;
    else if (props.Checked) return `rgba(34, 111, 255, 0.05)`;
    else return `${palette.white}`;
  }};
  cursor: ${props => {
    if (props.Disabled) return 'auto';
    else return `pointer`;
  }};
  transition:all .5s;

  &:before {
    width:20px;
    height:20px;
    border-radius:50%;
    border:1px solid ${palette.outlineGray};
    background:${palette.white};
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

  
  ${props =>
    props.Disabled &&
    css`
      &:before {
        border:0;
        background:${palette.gray500};
      }
    `
  }
  
  ${props =>
    props.Checked &&
    css`
      &:before {
        border:0;
        background:${palette.chatBlue};
      }
    `
  }
`;

const ButtonWrap = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;

  .next, .finish {
    font-size:0.88rem;
    margin-left:auto;
    border-radius:8px;
    background:none;
    transition:all .5s;
  }
`;

const WhiteBoxWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:16px;
  padding:20px;
  border-radius:10px;
  background:${palette.white};

  h3 {
    display:flex;
    align-items:center;
    gap:12px;

    span {
      font-size:0.88rem;
    }
  }
`;

const ProgressWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap: ${({ isExpanded }) => (isExpanded ? '40px' : '20px')};
  padding:20px;
  margin:20px 0;
  border-radius:10px;
  background:${palette.white};

  > div {
    display:flex;
    flex-direction:column;
    gap: 16px;
  }

  p {
    font-weight:400;
    color:${palette.gray700};
    line-height:1.5;
  }
`;

const Progress = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:35px;

  strong {
    max-width:90px;
    width:100%;
    font-weight:700;
    color:${palette.gray800};
  }

  span {
    font-weight:400;
  }
`;

const ProgressBar = styled.div`
  max-width:540px;
  width:100%;
  height:16px;
  border-radius:20px;
  background:${palette.gray100};
  overflow:hidden;

  > div {
    height:100%;
    border-radius:20px;
    background:${palette.blue};
  }
`;

const ButtonDetail = styled.div`
  width:100%;
  font-family: 'Pretendard', 'Poppins';
  font-size:0.88rem;
  color:${palette.gray800};
  line-height:1.5;
  text-align:center;
  padding:14px 20px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};
  cursor:pointer;
`;

const ScrollWrap = styled.div`
  position:relative;
  flex:1 1 0%;
  overflow-y:auto;

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

const ListBox = styled.div`
  // max-height:525px;
  overflow-y:auto;
  border-radius:10px;
  border:1px solid ${palette.outlineGray};

  > div {
    display:flex;
    gap:8px;
    padding:14px 20px;

    + div {
      border-top:1px solid ${palette.outlineGray};
    }

    span {
      flex-shrink:0;
      font-size:0.88rem;
      line-height:1.5;
    }

    div {
      display:flex;
      flex-direction: column;
      gap:12px;
    }

    strong, p {
      font-size:0.88rem;
      line-height:1.5;
      text-align:left;
    }

    p.tag {
      display:flex;
      align-items:center;
      gap:12px;
    }
  }
`;

const Sidebar = styled.div`
  // position:absolute;
  // top: 0;
  // right: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '-800px')};
  // height: 100%;
  // max-width: 800px;
  // width:100%;

  width: ${({ isMenuOpen }) => (isMenuOpen ? '800px' : '0')};

  background:${palette.white};
  // transform: ${({ isMenuOpen }) => (isMenuOpen ? 'translateX(0)' : 'translateX(200%)')};
  transition: all .5s;
  z-index: 900;

  visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'visible' : 'hidden')};
  overflow:hidden;
  flex-shrink:0;
  position:fixed;
  top:0;
  right:0;
  height:100vh;

  
  > div {
    display: flex;
    flex-direction: column;
    gap:50px;
    width: 100%;
    // max-width: 800px;
    height: 100%;
    text-align: center;
    // overflow:hidden;
    padding: 32px;
    border-radius: 10px;
    background: ${palette.white};
  }

  .header {
    position:relative;
    display:flex;
    flex-direction: column;
    gap:16px;
    align-items:center;

    h5 {
      width:100%;
      font-size:1.25rem;
      font-weight:600;
      line-height:1.3;
      color:${palette.gray800};
      text-align:left;

      p {
        font-size:1rem;
        font-weight:400;
        line-height:1.5;
        margin-top:16px;
      }
    }
  }

  .closePopup {
    position:absolute;
    top:0;
    right:0;
    width:21px;
    height:21px;
    font-size:0;
    border:0;
    background:none;

    &:before, &:after {
      position:absolute;
      top:50%;
      left:50%;
      width:3px;
      height:21px;
      display:inline-block;
      border-radius:50px;
      background:${palette.gray500};
      content:'';
    }
    &:before {
      transform:translate(-50%, -50%) rotate(45deg);
    }
    &:after {
      transform:translate(-50%, -50%) rotate(-45deg);
    }
  }

  .body {
    height:calc(100% - 80px);
    display: flex;
    flex-direction: column;
    gap:32px;

    p {
      line-height:1.5;
      color:${palette.gray800};
      text-align:left;
    }
  }


  h2 {
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 20px 0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .1);
  opacity: ${({ isMenuOpen }) => (isMenuOpen ? 1 : 0)};
  visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'visible' : 'hidden')};
  transition: all .5s;
  z-index: 800;
`;