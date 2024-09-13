import React, { useState } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

const ExpertExample = () => {

  const [StrategyTab, setStrategyTab] = useState(0);
  const [MarketingTab, setMarketingTab] = useState(0);
  const [InsightTab, setInsightTab] = useState(0);

  return (
    <>
      {/* 전략 전문가 */}
      <ExpertWrap>
        <ExpertHeader>
          <button 
            type="button" 
            className={StrategyTab === 0 ? 'active' : ''} 
            onClick={() => setStrategyTab(0)}
          >
            시장 분석 및 기회 탐색
          </button>
          <button 
            type="button" 
            className={StrategyTab === 1 ? 'active' : ''} 
            onClick={() => setStrategyTab(1)}
          >
            고객 가치 제안
          </button>
          <button 
            type="button" 
            className={StrategyTab === 2 ? 'active' : ''} 
            onClick={() => setStrategyTab(2)}
          >
            시장 내 경쟁 우위
          </button>
        </ExpertHeader>

        <ExpertContent Strategy>
          {StrategyTab === 0 && (
            <>
            <div className="ScrollWrap">
              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  타겟 시장 세그먼트
                </h4>
                <p>'달콤한 베트남 망고 젤리'는 10대 남녀라는 특정 세그먼트를 겨냥하고 있습니다. 이 집단은 달콤한 간식에 대한 욕구가 강하며, 특히 학교나 여가 활동 중 간편하게 섭취할 수 있는 제품을 선호합니다. 조사에 따르면, 10대들은 간식 선택 시 맛과 편리함을 중시하며, 2022년 기준으로 10대 간식 시장의 규모는 약 1조 원에 달하고 있습니다 (출처: 한국소비자원). 이와 유사한 제품으로는 한국산 젤리, 과일 스낵 등이 있으나, '달콤한 베트남 망고 젤리'는 베트남산 신선한 망고를 사용하여 차별화된 맛과 향을 제공합니다. 이러한 차별점은 소비자에게 특별한 경험을 제공할 수 있습니다.</p>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  고객의 주요 불편사항
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>강점 파악</strong>
                    <p>이 제품은 10대 남녀가 겪는 간식 선택의 어려움을 해결합니다. 예를 들어, 학업 중 스트레스를 해소하기 위해 간편하게 섭취할 수 있는 달콤한 간식이 필요할 때, 젤리는 쫄깃한 식감과 망고의 풍부한 맛으로 긍정적인 경험을 제공합니다.</p>
                  </div>
                  <div>
                    <strong>고려해야 할 점</strong>
                    <p>그러나, 일부 소비자는 인공 색소나 방부제가 포함된 젤리에 대한 우려가 있을 수 있습니다. 이는 소비자 기대와의 차이로 인해 불만을 초래할 수 있으며, 제품의 신뢰성을 떨어뜨릴 수 있습니다.</p>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  잠재적 니즈 및 기회
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>기회 요소</strong>
                    <p>'달콤한 베트남 망고 젤리'는 자연 유래 성분을 강조하여 건강 지향적인 소비자의 니즈를 충족시킬 수 있습니다. 예를 들어, '무첨가, 자연 재료 사용'을 강조하는 마케팅 전략을 통해 더 많은 소비자층을 확보할 수 있습니다.</p>
                  </div>
                  <div>
                    <strong>리스크 요소</strong>
                    <p>그러나, 이러한 방향으로 나아갈 경우 생산 비용이 증가할 수 있으며, 가격 경쟁력이 약화될 위험이 있습니다. 따라서 가격 조정과 품질 유지를 동시에 고려해야 합니다.</p>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  이상적인 시장 포지셔닝
                </h4>
                <p>이 제품은 '프리미엄 간식'으로 자리매김할 수 있습니다. 이는 소비자에게 건강한 간식 옵션을 제공하면서도, 베트남의 독특한 맛과 향을 통해 차별화된 경험을 선사합니다. 최근 건강식 트렌드에 따라 소비자들은 더욱 건강한 간식을 선호하고 있으며, 이에 맞춰 제품 라인을 확대할 기회가 존재합니다.</p>
              </BgBox>

              <p className="comment">'달콤한 베트남 망고 젤리'는 현재의 시장에서 고유한 기회를 포착할 수 있는 잠재력을 가지고 있습니다. 이 보고서는 제품이 시장에서 차지할 수 있는 위치를 명확히 하며, 경쟁에서 성공적으로 자리매김할 수 있는 전략적 방안을 제시합니다. 하지만, 잠재적인 리스크와 도전 과제를 철저히 분석하고 대응하여야만 제품의 성공을 보장할 수 있을 것입니다.</p>
            </div>

            <ButtonWrap>
              <button type="button">
                <img src={images.IconRefresh} alt="" />
                재생성하기
              </button>
              <button type="button">
                <img src={images.IconCopy} alt="" />
                복사하기
              </button>
              <button type="button">
                <img src={images.IconSave} alt="" />
                저장하기
              </button>
            </ButtonWrap>
            </>
          )}

          {StrategyTab === 1 && (
            <>
            <div className="ScrollWrap">
              <BgBox>
                <h4>
                  <span className="number">1</span>
                  특징 : 뛰어난 맛과 향
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>장점</strong>
                    <p>베트남 망고젤리는 신선한 베트남산 망고를 사용하여 망고의 풍부한 맛과 향을 그대로 담아냅니다. 이는 10대 소비자들에게 신선하고 달콤한 간식으로 인식되며, 쫄깃한 젤리 식감이 더해져 소비자 경험을 향상시킵니다. 예를 들어, 젤리의 쫄깃함과 망고의 달콤함이 조화를 이루어 소비자들에게 긍정적인 피드백을 받을 가능성이 높습니다.</p>
                  </div>
                  <div>
                    <strong>도전과제</strong>
                    <p>그러나, 특정 소비자들은 인공적인 맛이나 향을 선호할 수 있으며, 이러한 차별화된 맛이 모든 소비자에게 매력적이지 않을 수 있습니다. 따라서, 다양한 맛 옵션을 추가하거나 소비자의 피드백을 반영한 제품 개선이 필요합니다.</p>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <span className="number">2</span>
                  특징 : 휴대 간편한 포장 
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>가치 제안</strong>
                    <p>개별 포장된 베트남 망고젤리는 이동 중에도 간편하게 즐길 수 있어, 10대 남녀에게 특히 매력적입니다. 학업이나 여가 활동 중에도 쉽게 간식으로 섭취할 수 있기 때문에 소비자들의 바쁜 일상 속에서 유용한 제품으로 자리매김할 수 있습니다.</p>
                  </div>
                  <div>
                    <strong>위험 요소</strong>
                    <p>그러나 포장재가 너무 얇거나 약할 경우, 과정을 겪는 동안 파손될 가능성이 있습니다. 이는 소비자에게 불만을 초래할 수 있으므로, 포장재의 품질을 지속적으로 관리해야 합니다.</p>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <span className="number">3</span>
                  특징 : 휴대 간편한 포장 
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>다양한 측면</strong>
                    <p>베트남 현지에서 생산된 제품으로, 소비자들에게 이국적인 경험을 제공합니다. 이는 단순한 간식을 넘어, 문화적 경험을 함께 제공합니다. 젤리를 통해 베트남의 맛을 느끼고, 이를 친구들과 나누는 경험은 소비자들에게 특별한 가치를 전달합니다.</p>
                  </div>
                  <div>
                    <strong>품질 관리 이슈 </strong>
                    <p>그러나, 이국적인 경험이 소비자에게 매력적으로 다가가지 않을 경우, 품질 문제나 생산 과정에서의 불일치가 소비자 경험에 부정적인 영향을 미칠 수 있습니다. 따라서, 품질 관리 시스템을 구축하고 소비자 피드백을 주기적으로 수집하여 제품 개선에 반영할 필요가 있습니다.</p>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  우선순위와 고객 영향 분석  
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>우선 요소</strong>
                    <p>뛰어난 맛과 향은 고객에게 가장 큰 영향을 미치는 요소입니다. 소비자들은 간식에서 맛을 가장 우선시하며, 이를 통해 반복 구매를 유도할 수 있습니다.</p>
                  </div>
                  <div>
                    <strong>잠재적 영향</strong>
                    <p>만약 이 핵심 이점이 기대에 미치지 못할 경우, 고객 만족도가 저하되고, 이는 경쟁 제품으로의 이탈로 이어질 수 있습니다. 따라서 지속적인 개선 노력과 제품 품질 보장 시스템이 필요합니다.</p>
                  </div>
                </div>
              </BgBox>

              <p className="comment">베트남 망고젤리는 고객에게 제공하는 가치를 명확히 하고, 이를 통해 경쟁에서의 차별화를 확보할 수 있는 강력한 잠재력을 가지고 있습니다. 이 보고서는 제품의 이점과 가치를 분석하여 고객에게 실질적인 혜택을 제공할 수 있는 전략적 방향을 제시합니다. 그러나 고객의 기대에 부응하지 못할 경우 발생할 수 있는 리스크를 철저히 분석하고 대비하는 것이 중요합니다.</p>
            </div>

            <ButtonWrap>
              <button type="button">
                <img src={images.IconRefresh} alt="" />
                재생성하기
              </button>
              <button type="button">
                <img src={images.IconCopy} alt="" />
                복사하기
              </button>
              <button type="button">
                <img src={images.IconSave} alt="" />
                저장하기
              </button>
            </ButtonWrap>
            </>
          )}

          {StrategyTab === 2 && (
            <>
            <div className="ScrollWrap">
              <BgBox>
                <h4>
                  <span className="number">1</span>
                  차별점 : 뛰어난 맛과 향
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>경쟁력</strong>
                    <p>베트남 망고젤리는 신선한 베트남산 망고를 사용하여 망고의 풍부한 맛과 향을 그대로 담아냅니다. 이는 10대 소비자들에게 신선하고 달콤한 간식으로 인식되며, 쫄깃한 젤리 식감이 더해져 소비자 경험을 향상시킵니다. 예를 들어, 젤리의 쫄깃함과 망고의 달콤함이 조화를 이루어 소비자들에게 긍정적인 피드백을 받을 가능성이 높습니다.</p>
                  </div>
                  <div>
                    <strong>경쟁 압박</strong>
                    <p>그러나, 특정 소비자들은 인공적인 맛이나 향을 선호할 수 있으며, 이러한 차별화된 맛이 모든 소비자에게 매력적이지 않을 수 있습니다. 따라서, 다양한 맛 옵션을 추가하거나 소비자의 피드백을 반영한 제품 개선이 필요합니다.</p>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <span className="number">2</span>
                  차별점 : 휴대 간편한 포장
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>고유 강점</strong>
                    <p>개별 포장된 젤리는 10대 소비자에게 매우 매력적입니다. 특히 학업이나 여가 활동 중 간편하게 즐길 수 있는 특성이 강점으로 작용합니다. 2023년 설문 조사에 따르면, 10대의 65%가 휴대성이 좋은 간식을 선호한다고 응답했습니다. 이는 제품의 흥미로운 마케팅 포인트로 활용될 수 있습니다.</p>
                  </div>
                  <div>
                    <strong>위험 요소</strong>
                    <p>포장 디자인 및 기능이 혁신적이지 않으면 소비자들의 관심을 끌기 어려울 수 있습니다. 새로운 포장 기술이나 친환경 포장이 주목받고 있는 추세에서, 지속적인 포장 개선과 소비자 반응을 반영한 디자인 변경이 필요합니다.</p>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  시장 내 유리한 위치 평가  
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>유리한 위치</strong>
                    <p>'달콤한 베트남 망고젤리'는 신선한 원재료와 휴대성 높은 포장을 통해 차별화된 가치 제안을 합니다. 이는 10대 소비자들에게 강력한 매력을 발휘하며, 고객 충성도를 높일 수 있는 기반이 됩니다. 소비자 조사 데이터에 따르면, 브랜드 충성도는 제품 품질과 포장 만족도가 75% 이상 영향을 미친다고 합니다.</p>
                  </div>
                  <div>
                    <strong>지속 가능성</strong>
                    <p> 경쟁 심화와 고객 니즈 변화에 대응하기 위해 지속적인 제품 개선과 새로운 가치 창출이 필요합니다. 예를 들어, 망고젤리의 다양한 맛 변형이나 시즌 한정판 출시 등을 통해 소비자의 흥미를 유도할 수 있습니다. 또한, 소셜 미디어 캠페인을 통해 젊은 소비자와의 소통을 강화해야 합니다.</p>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  제안 사항
                </h4>
                <p>
                1. **소셜 미디어 마케팅 강화**: 10대 소비자와의 소통을 강화하기 위해 인스타그램, 틱톡 등 소셜 미디어 플랫폼을 활용한 마케팅 캠페인을 진행합니다.<br />
                2. **브랜드 스토리텔링**: 제품의 원재료와 생산 과정을 강조하는 스토리텔링 마케팅을 통해 소비자들의 신뢰를 구축합니다.<br />
                3. **제품 다양화 및 한정판 출시**: 다양한 맛 변형과 시즌 한정판 제품 출시를 통해 소비자의 흥미를 지속적으로 유도합니다.
                </p>
              </BgBox>

              <p className="comment">'달콤한 베트남 망고젤리'는 신선한 베트남산 망고와 휴대 간편한 포장이라는 두 가지 차별화 요소를 통해 시장 내 경쟁 우위를 확보할 수 있는 잠재력을 가지고 있습니다. 그러나 경쟁사의 대응과 변화하는 시장 환경에 대한 지속적인 분석이 필요합니다. 이를 통해 제품의 시장 내 위치를 강화하고, 고객의 기대를 충족시키는 것이 중요합니다.</p>
            </div>

            <ButtonWrap>
              <button type="button">
                <img src={images.IconRefresh} alt="" />
                재생성하기
              </button>
              <button type="button">
                <img src={images.IconCopy} alt="" />
                복사하기
              </button>
              <button type="button">
                <img src={images.IconSave} alt="" />
                저장하기
              </button>
            </ButtonWrap>
            </>
          )}
        </ExpertContent>
      </ExpertWrap>

      {/* 마케팅 전문가 */}
      <ExpertWrap>
        <ExpertHeader>
          <button 
            type="button" 
            className={MarketingTab === 0 ? 'active' : ''} 
            onClick={() => setMarketingTab(0)}
          >
            브랜드 검토
          </button>
          <button 
            type="button" 
            className={MarketingTab === 1 ? 'active' : ''} 
            onClick={() => setMarketingTab(1)}
          >
            마케팅 전략
          </button>
          <button 
            type="button" 
            className={MarketingTab === 2 ? 'active' : ''} 
            onClick={() => setMarketingTab(2)}
          >
            경쟁 분석
          </button>
        </ExpertHeader>

        <ExpertContent Marketing>
          {MarketingTab === 0 && (
            <>
            <div className="ScrollWrap">
              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  브랜드 전략 분석
                </h4>
                <p>베트남 망고 젤리는 현재 시장에서 '신선함'과 '색다른 맛'으로 인식되고 있습니다. 이 제품은 베트남산 망고를 사용하여 진하고 풍부한 맛을 제공하며, 젤리 형태로 소비자에게 즐거운 식감을 선사합니다. 특히 10대 남녀를 주타겟으로 하는 마케팅 전략은 해당 세대의 트렌드와 취향에 민감하게 반응하고 있습니다. 따라서, 이 제품은 '젊음', '활력', '트렌디함'의 이미지를 효과적으로 전달하고 있습니다.</p>
                <div className="bgWhite">
                  <ul>
                    <li>달콤하고 상큼한 망고 맛 : 베트남산 망고 과즙을 사용하여 소비자에게 진하고 풍부한 맛을 제공합니다. 이는 10대가 선호하는 맛으로, 소비자에게 즐거운 경험을 제공합니다.</li>
                    <li>휴대 및 섭취의 편리성 : 개별 포장된 형태로 언제 어디서나 간편하게 섭취할 수 있습니다. 이 특성은 바쁜 일상 속에서 쉽게 즐길 수 있는 간식으로서의 가치를 높입니다.</li>
                    <li>다양한 맛과 식감 : 망고 외에도 다양한 맛을 출시하여 소비자의 선택 폭을 넓혔고, 탱글탱글한 식감은 씹는 재미를 더해 소비자의 호기심을 자극합니다.</li>
                  </ul>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  브랜드 아이덴티티
                </h4>
                <p>브랜드 이미지와 제품 특성 간의 일치도는 높습니다. 소비자들은 베트남 망고 젤리를 통해 기대하는 신선함과 색다른 맛을 실제로 경험할 수 있으며, 10대 남녀의 취향에 맞춘 달콤한 맛과 편리한 섭취 방식이 잘 결합되어 있습니다. 그러나, 다양한 맛의 출시가 소비자에게 혼란을 줄 수 있으므로, 이를 명확하게 전달할 필요가 있습니다.</p>
                <div className="bgWhite">
                  <ul>
                    <li>명확한 브랜딩 및 포지셔닝 : 베트남 망고 젤리의 고유한 특성을 강조하는 마케팅 메시지를 개발하여 소비자에게 명확하게 전달할 필요가 있습니다. 예를 들어, "현지 재료를 사용한 진정한 망고 젤리" 라는 슬로건을 통해 소비자에게 차별화된 가치를 제안할 수 있습니다.</li>
                    <li>소비자 교육 강화 : 제품에 대한 소비자 교육 캠페인을 통해 망고 젤리의 원재료와 맛의 차별성을 강조하고, 소비자들이 제품에 대한 이해도를 높일 수 있도록 지원합니다.</li>
                  </ul>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  브랜드 신뢰도 구축 방안
                </h4>
                <ul>
                  <li>품질 관리 : 제품의 품질을 지속적으로 모니터링하고, 소비자 피드백을 반영하여 개선하는 시스템을 구축합니다. 이를 통해 소비자에게 일관된 품질을 제공하여 신뢰도를 높일 수 있습니다.</li>
                  <li>소셜 미디어 활용 : 소셜 미디어 플랫폼을 통해 소비자와의 소통을 강화하고, 브랜드의 스토리와 가치를 공유함으로써 소비자와의 신뢰관계를 구축합니다. 이는 소비자 참여를 유도하고, 긍정적인 브랜드 이미지를 강화하는데 도움을 줍니다.</li>
                </ul>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  소비자 인식 관리 방안
                </h4>
                <ul>
                  <li>일관된 메시지 전달 : 모든 마케팅 채널에서 브랜드의 핵심 메시지를 일관되게 전달하여 소비자에게 혼란을 주지 않도록 합니다. 이는 브랜드의 신뢰도를 높이는데 중요한 요소입니다.</li>
                  <li>고객 경험 관리 : 소비자들이 제품을 구매하고 사용하는 과정에서 긍정적인 경험을 제공하기 위해 노력해야 합니다. 고객 서비스의 질을 높이고, 소비자 피드백을 적극 반영하는 것이 중요합니다.</li>
                </ul>
              </BgBox>

              <p className="comment">베트남 망고 젤리는 현재 시장에서 신선하고 색다른 간식으로 자리 잡고 있으며, 10대 남녀의 입맛을 사로잡고 있습니다. 그러나 제품의 차별성을 더욱 강조하고 소비자 교육을 강화하는 것이 필요합니다. 이러한 전략을 통해 브랜드 신뢰도를 높이고 장기적인 성장을 도모할 수 있습니다. 향후에는 소비자 피드백을 적극적으로 수렴하여 제품 개선 및 마케팅 전략을 지속적으로 보완함으로써, 베트남 망고 젤리의 브랜드 가치를 더욱 강화할 수 있을 것입니다.</p>
            </div>

            <ButtonWrap>
              <button type="button">
                <img src={images.IconRefresh} alt="" />
                재생성하기
              </button>
              <button type="button">
                <img src={images.IconCopy} alt="" />
                복사하기
              </button>
              <button type="button">
                <img src={images.IconSave} alt="" />
                저장하기
              </button>
            </ButtonWrap>
            </>
          )}

          {MarketingTab === 1 && (
            <>
            <div className="ScrollWrap">
              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  주요 타겟층 특징
                </h4>
                <p>베트남 망고젤리는 10대 남녀를 주요 타겟 오디언스로 설정하고 있습니다. 이 연령대의 소비자들은 새로운 맛과 트렌드에 민감하며, 간편하게 즐길 수 있는 달콤한 간식을 선호합니다. 특히, 이들은 SNS를 통해 정보를 얻고, 제품을 공유하는 경향이 있어, 소셜 미디어에서의 활발한 홍보가 중요합니다.</p>
                <div className="flexBox">
                  <div>
                    <strong>주요 니즈 </strong>
                    <ul>
                      <li>달콤하고 상큼한 맛 : 10대 소비자들은 강렬한 맛과 색다른 경험을 추구합니다.</li>
                      <li>편리한 섭취 : 바쁜 일상 속에서 간편하게 소비할 수 있는 제품에 대한 수요가 높습니다.</li>
                      <li>다양한 선택 : 다양한 맛과 식감을 제공하여 소비자들의 선택 폭을 넓히는 것이 필요합니다.</li>
                    </ul>
                  </div>
                  <div>
                    <strong>잠재적인 리스크</strong>
                    <ul>
                      <li>경쟁 심화 : 젤리/간식 시장은 경쟁이 치열하므로 소비자들의 관심을 끌기 어려운 영역입니다.</li>
                      <li>트렌드 변화 : 10대 소비자들의 취향은 빠르게 변하므로 지속적인 제품 혁신이 필수적입니다.</li>
                    </ul>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                <img src={images.Check} alt="" />
                  콘텐츠 및 마케팅 전략
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>콘텐츠 유형</strong>
                    <ul>
                      <li>비디오 콘텐츠 : 젤리의 제조 과정, 다양한 맛 조합, 소비자 반응 등을 담은 짧은 비디오를 제작하여 소셜 미디어에서 공유합니다.</li>
                      <li>레시피 포스트 : 망고 젤리를 활용한 다양한 레시피를 블로그와 SNS에 게시하여 소비자들이 제품을 활용할 수 있는 방법을 제시합니다.</li>
                      <li>사용자 생성 콘텐츠 : 소비자들이 제품을 즐기는 모습을 공유하도록 유도하여 브랜드 충성도를 높입니다.</li>
                    </ul>
                  </div>
                  <div>
                    <strong>마케팅 채널 믹스 전략</strong>
                    <ul>
                      <li>소셜 미디어 : 인스타그램, 틱톡 등 10대가 많이 사용하는 플랫폼에서 비주얼 중심의 콘텐츠를 통해 소비자와의 소통을 강화합니다.</li>
                      <li>인플루언서 마케팅 : 인기 있는 인플루언서와 협업하여 제품을 홍보하고, 소비자들의 신뢰를 얻습니다.</li>
                      <li>검색엔진 광고 : 특정 키워드를 중심으로 광고를 집행하여 관련 검색 결과에서 노출을 극대화 합니다.</li>
                    </ul>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  경쟁사 분석 및 차별화 전략
                </h4>
                <p>경쟁 분석 결과, 대표적인 젤리 브랜드들이 강력한 시장 점유율을 보이고 있습니다. 이들은 다채로운 맛과 패키지 디자인을 통해 소비자들의 관심을 끌고 있으며, SNS에서도 활발히 활동하고 있습니다. 특히, 한국의 '젤리킹'과 미국의 'Haribo'와 같은 브랜드들이 주요 경쟁자로 떠오르고 있습니다.</p>
                <div className="bgWhite">
                  <ul>
                    <li>현지 망고 사용 : 베트남산 망고를 사용하여 독특하고 진한 맛을 제공합니다. 이는 소비자들에게 새로운 경험을 제공합니다.</li>
                    <li>탱글탱글한 식감 : 젤리의 독특한 식감은 다른 제품과 차별화된 요소로 작용할 것입니다.</li>
                    <li>개별 포장 : 개별 포장이 소비자들의 편리함을 증가시켜 반복 구매를 유도합니다.</li>
                  </ul>
                </div>
              </BgBox>

              <p className="comment">베트남 망고젤리는 10대 남녀를 주요 타겟으로 하여 간편하고 달콤한 간식을 제공하는 제품입니다. 시장에서의 성공 가능성은 높지만, 경쟁사와의 차별화와 트렌드 변화에 대한 적응력이 필수적입니다. 소비자 니즈를 충족시키는 동시에, 지속적인 혁신과 마케팅 전략을 통해 경쟁에서 우위를 점할 수 있을 것입니다.</p>
            </div>

            <ButtonWrap>
              <button type="button">
                <img src={images.IconRefresh} alt="" />
                재생성하기
              </button>
              <button type="button">
                <img src={images.IconCopy} alt="" />
                복사하기
              </button>
              <button type="button">
                <img src={images.IconSave} alt="" />
                저장하기
              </button>
            </ButtonWrap>
            </>
          )}

          {MarketingTab === 2 && (
            <>
            <div className="ScrollWrap">
              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  시장 위치 평가 및 경쟁자 분석
                </h4>
                <p>베트남 망고 젤리는 현지 망고를 사용하여 진한 망고 맛을 제공하며, 개별 포장으로 인해 휴대성이 뛰어나다는 점에서 경쟁 우위를 지닙니다. 현재 시장 점유율은 약 15%이며, 특히 10대 남녀 사이에서 인지도가 상승하고 있습니다. 경쟁사 대비 가격이 합리적이며, 품질 또한 우수하다는 피드백이 확인되었습니다.</p>
                <div className="flexBox">
                  <div className="bgWhite">
                    <strong className="title">
                      <span className="number">1</span>
                      국내 망고 젤리 브랜드 A
                    </strong>
                    <ul>
                      <li>강점 : 이미 구축된 브랜드 인지도와 충성도 높은 고객층. 다양한 맛과 패키징 옵션 제공.</li>
                      <li>약점 : 가격이 상대적으로 비쌈. 망고 맛이 약하게 느껴질 수 있음.</li>
                    </ul>
                  </div>
                  <div className="bgWhite">
                    <strong className="title">
                      <span className="number">2</span>
                      국내 망고 젤리 브랜드 A
                    </strong>
                    <ul>
                      <li>강점 : 이미 구축된 브랜드 인지도와 충성도 높은 고객층. 다양한 맛과 패키징 옵션 제공.</li>
                      <li>약점 : 가격이 상대적으로 비쌈. 망고 맛이 약하게 느껴질 수 있음.</li>
                    </ul>
                  </div>
                  <div className="bgWhite">
                    <strong className="title">
                      <span className="number">3</span>
                      국내 망고 젤리 브랜드 A
                    </strong>
                    <ul>
                      <li>강점 : 이미 구축된 브랜드 인지도와 충성도 높은 고객층. 다양한 맛과 패키징 옵션 제공.</li>
                      <li>약점 : 가격이 상대적으로 비쌈. 망고 맛이 약하게 느껴질 수 있음.</li>
                    </ul>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  경쟁사 대비 차별화 전략
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>주요 차별화 요소</strong>
                    <ul>
                      <li>독특한 맛 : 현지 망고를 사용하여 다른 젤리 제품보다 진하고 풍부한 맛을 제공.</li>
                      <li>식감 : 탱글탱글한 식감으로 씹는 재미를 더해 소비자들의 관심을 끌 수 있음.</li>
                      <li>편리한 포장 : 개별 포장으로 언제 어디서나 간편하게 즐길 수 있는 점.</li>
                    </ul>
                  </div>
                  <div>
                    <strong>차별화 전략 제안</strong>
                    <ul>
                      <li>가격 전략 : 경쟁사 대비 저렴한 가격으로 소비자 접근성 강화.</li>
                      <li>브랜드 강화 : SNS 및 온라인 플랫폼을 활용한 브랜드 스토리텔링 및 캠페인 전개.</li>
                      <li>제품 개선 : 새로운 맛 출시 및 소비자 피드백을 반영하여 지속적인 제품 개선 추진.</li>
                    </ul>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  시장 내 경쟁 우위 확보 방안
                </h4>
                <div className="flexBox">
                  <div>
                    <strong>경쟁 압박 대처 방안</strong>
                    <ul>
                      <li>시장 변화 대응 : 트렌드에 발맞춘 다양한 맛을 지속적으로 출시하여 소비자 관심 유지.</li>
                      <li>기술 혁신 : 생산 공정 개선을 통해 품질을 높이고 원가 절감.</li>
                      <li>마케팅 강화 : 타겟 세그먼트에 맞춘 맞춤형 광고 캠페인 전개.</li>
                    </ul>
                  </div>
                  <div>
                    <strong>장기적인 경쟁 우위 전략</strong>
                    <ul>
                      <li>고객 충성도 강화 : 포인트 적립 프로그램 등의 로열티 프로그램 도입.</li>
                      <li>품질 개선 : 원재료의 품질을 지속적으로 모니터링하고, 소비자 피드백 반영.</li>
                      <li>새로운 가치 창출 : 건강 및 웰빙 트렌드에 맞춘 제품 라인업 확장.</li>
                    </ul>
                  </div>
                </div>
              </BgBox>

              <p className="comment">베트남 망고 젤리는 독특한 맛과 탱글탱글한 식감으로 시장에서 경쟁력을 갖추고 있으며, 가격 접근성 또한 우수한 편입니다. 그러나 경쟁사들이 강력한 브랜드 인지도를 지니고 있으므로, 적극적인 마케팅과 소비자 피드백 반영이 필요합니다. 장기적으로는 지속적인 제품 혁신과 고객 충성도 강화를 통해 시장 내 경쟁 우위를 확보할 수 있는 가능성이 높습니다. 이 보고서는 베트남 망고 젤리가 시장에서 성공적으로 자리잡기 위해 필요한 방향성을 제시하며, 고객이 기대하는 바를 충족시킬 수 있는 실질적인 전략을 제공합니다.</p>
            </div>

            <ButtonWrap>
              <button type="button">
                <img src={images.IconRefresh} alt="" />
                재생성하기
              </button>
              <button type="button">
                <img src={images.IconCopy} alt="" />
                복사하기
              </button>
              <button type="button">
                <img src={images.IconSave} alt="" />
                저장하기
              </button>
            </ButtonWrap>
            </>
          )}
        </ExpertContent>
      </ExpertWrap>

      {/* 고객 인사이트 전문가 */}
      <ExpertWrap>
        <ExpertHeader>
          <button 
            type="button" 
            className={InsightTab === 0 ? 'active' : ''} 
            onClick={() => setInsightTab(0)}
          >
            고객 가치 분석 및 제안
          </button>
          <button 
            type="button" 
            className={InsightTab === 1 ? 'active' : ''} 
            onClick={() => setInsightTab(1)}
          >
            고객 경험 최적화 방법 제시
          </button>
        </ExpertHeader>

        <ExpertContent Insight>
          {InsightTab === 0 && (
            <>
            <div className="ScrollWrap">
              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  고객 니즈 및 세분화 분석
                </h4>
                <p>10대 고객층은 맛있는 간식에 대한 높은 관심을 가지고 있으며, 특히 달콤하고 상큼한 맛을 선호합니다. 또한, 간편하게 섭취할 수 있는 제품과 새로운 경험을 제공하는 간식에 대한 수요가 높습니다. 이는 베트남 망고 젤리가 충족할 수 있는 기능적 혜택(편리함, 맛)과 정서적 혜택(신선함, 이국적인 경험)으로 나뉘어 분석할 수 있습니다.</p>
                <div className="bgWhite">
                  <ul>
                    <li>10대 남녀 : 새로운 맛과 트렌드에 민감하며, 학교나 학원에서 간편하게 즐길 수 있는 간식을 선호합니다.</li>
                    <li>달콤한 간식을 선호하는 소비자 : 망고 젤리의 달콤함과 젤리 특유의 식감을 찾는 소비자들입니다.</li>
                    <li>색다른 맛을 찾는 소비자 : 국내에서 접하기 힘든 이국적인 맛을 갈망하는 소비자들입니다.</li>
                  </ul>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  핵심 가치 제안
                </h4>
                <p>브랜드 이미지와 제품 특성 간의 일치도는 높습니다. 소비자들은 베트남 망고 젤리를 통해 기대하는 신선함과 색다른 맛을 실제로 경험할 수 있으며, 10대 남녀의 취향에 맞춘 달콤한 맛과 편리한 섭취 방식이 잘 결합되어 있습니다. 그러나, 다양한 맛의 출시가 소비자에게 혼란을 줄 수 있으므로, 이를 명확하게 전달할 필요가 있습니다.</p>
                <div className="flexBox">
                  <div>
                    <strong>이점 분석</strong>
                    <p>베트남 망고 젤리는 진한 망고 맛과 탱글탱글한 식감을 제공하여 소비자들에게 달콤한 간식의 즐거움을 선사합니다. 휴대하기 용이한 개별 포장은 바쁜 일상 속에서 간편하게 즐길 수 있는 이점을 제공합니다.</p>
                  </div>
                  <div>
                    <strong>차별화된 가치</strong>
                    <p>현지 망고를 사용하여 다른 젤리 제품보다 진하고 풍부한 맛을 제공하며, 젤리의 독특한 식감은 소비자들에게 새로운 경험을 제공합니다. 이는 경쟁 제품과의 차별화 요인으로 작용할 수 있습니다.</p>
                  </div>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  고객 여정 맵핑 및 터치포인트 최적화
                </h4>
                <p>베트남 망고 젤리의 구매 과정에서 소비자가 거치는 주요 터치포인트를 맵핑해 분석합니다. 예를 들어, 소비자가 제품을 인지하고, 탐색하고, 구매하고, 리뷰를 작성하는 각 단계에서 중요한 상호작용과 경험을 분석합니다.</p>
                <div className="bgWhite">
                  <ul>
                    <li>제품 인지 단계: 소비자가 첫 번째로 베트남 망고 젤리를 접하게 되는 순간을 분석하여, 제품의 첫 인상을 강화하는 방법을 모색합니다.</li>
                    <li>제품 탐색 단계: 소비자가 다양한 채널을 통해 제품에 대한 정보를 찾는 과정을 분석하여, 탐색 경험을 최적화하는 방안을 제안합니다.</li>
                    <li>구매 및 리뷰 단계: 구매 과정의 간편성을 평가하고, 리뷰 작성의 유도 방법을 검토하여, 소비자 경험을 향상시킬 수 있는 전략을 수립합니다.</li>
                  </ul>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <img src={images.Check} alt="" />
                  터치포인트 최적화 방안
                </h4>
                <div className="flexBox">
                  <div className="bgWhite">
                    <strong className="title">
                      <span className="number">1</span>
                      시각적 매력 강화
                    </strong>
                    <p>제품 탐색 단계에서 시각적 매력을 강화하기 위한 방안을 제안합니다. 예를 들어, 젊은 소비자들에게 어필할 수 있는 트렌디한 디자인과 컬러를 활용하여 제품의 주목도를 높입니다.</p>
                  </div>
                  <div className="bgWhite">
                    <strong className="title">
                      <span className="number">2</span>
                      고객 서비스 개선
                    </strong>
                    <p>구매 후 만족도를 높이기 위해 고객 서비스를 개선하는 방안을 제안합니다. 예를 들어, 소비자가 쉽게 접근할 수 있는 고객 지원 채널을 마련하고, 리뷰 작성에 대한 인센티브를 제공하여 소비자 참여를 유도합니다.</p>
                  </div>
                </div>
              </BgBox>

              <p className="comment">베트남 망고젤리는 고객에게 제공하는 가치를 명확히 하고, 이를 통해 경쟁에서의 차별화를 확보할 수 있는 강력한 잠재력을 가지고 있습니다. 이 보고서는 제품의 이점과 가치를 분석하여 고객에게 실질적인 혜택을 제공할 수 있는 전략적 방향을 제시합니다. 그러나 고객의 기대에 부응하지 못할 경우 발생할 수 있는 리스크를 철저히 분석하고 대비하는 것이 중요합니다.</p>
            </div>

            <ButtonWrap>
              <button type="button">
                <img src={images.IconRefresh} alt="" />
                재생성하기
              </button>
              <button type="button">
                <img src={images.IconCopy} alt="" />
                복사하기
              </button>
              <button type="button">
                <img src={images.IconSave} alt="" />
                저장하기
              </button>
            </ButtonWrap>
            </>
          )}

          {InsightTab === 1 && (
            <>
            <div className="ScrollWrap">
              <BgBox>
                <h4>
                  <span className="number">1</span>
                  방법 : 데이터 기반 고객 분석
                </h4>
                <p>데이터 기반 고객 분석을 통해 베트남산 망고젤리의 고객 데이터를 심층적으로 분석하여 소비 패턴, 구매 이력, 피드백을 이해합니다. 이를 통해 베트남산 망고젤리가 고객에게 제공하는 가치를 평가하고, 시장에서의 경쟁력을 강화할 수 있습니다. 주요 고객의 선호도와 요구 사항을 파악하여 제품을 개선하고, 특히 베트남산 망고젤리에 대한 건강, 품질, 맛에 대한 선호를 분석해 마케팅 전략을 최적화할 수 있습니다. 예를 들어, 젤리의 원료나 생산 방식에 대한 투명한 정보 제공은 고객 신뢰를 높이는 데 기여할 수 있습니다.</p>
                <div className="bgWhite">
                  <ul>
                    <li>브랜드명: Haribo</li>
                    <li>프로젝트명: 'Fruitilicious Health Campaign'</li>
                    <li>실제 기대효과: Haribo는 건강을 중시하는 고객을 대상으로 한 과일 젤리 마케팅 캠페인을 통해 소비자 데이터를 분석하고, 설탕 함량을 줄이면서도 맛을 유지한 제품을 출시했습니다. 이 캠페인은 고객 만족도와 판매율 증가로 이어졌으며, 브랜드 신뢰도를 강화하는 효과를 보였습니다.</li>
                  </ul>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <span className="number">2</span>
                  방법 : 고객 여정 맵핑 
                </h4>
                <p>고객 여정 맵핑을 통해 베트남산 망고젤리의 고객이 구매 과정에서 경험하는 주요 터치포인트를 분석합니다. 이를 통해 고객이 직면하는 주요 페인 포인트를 파악하고, 이를 해결함으로써 최적의 고객 경험을 제공할 수 있습니다. 예를 들어, 온라인 구매 시 제품의 포장 상태나 배송 시간에 대한 고객 불만을 해결하기 위한 개선 방안을 마련할 수 있습니다. 또한, 제품의 맛과 신선도를 유지하기 위한 포장 기술을 개선함으로써 고객 만족도를 높일 수 있습니다.</p>
                <div className="bgWhite">
                  <ul>
                    <li>브랜드명: Lotte</li>
                    <li>프로젝트명: 'Lotte Jelly Brand Revamp'</li>
                    <li>실제 기대효과: 롯데는 젤리 제품의 패키징과 고객 여정을 개선하기 위한 프로젝트를 통해 고객 경험을 향상시켰습니다. 고객의 불만을 반영하여 포장을 개선하고, 보다 신선하고 맛있는 제품을 제공함으로써 구매 전환율이 증가하고 고객 만족도가 높아졌습니다.</li>
                  </ul>
                </div>
              </BgBox>

              <BgBox>
                <h4>
                  <span className="number">2</span>
                  방법 : 사용자 경험(UX) 리디자인 
                </h4>
                <p>UX 리디자인을 통해 베트남산 망고젤리의 사용성을 개선하고, 소비자와의 상호작용을 최적화할 수 있습니다. 예를 들어, 온라인 판매 플랫폼의 UX를 개선하여 소비자들이 쉽게 제품을 찾고 구매할 수 있도록 직관적인 디자인과 간편한 결제 시스템을 구축할 수 있습니다. 이를 통해 고객의 구매 과정을 단순화하고, 소비자 피드백을 바탕으로 UX를 지속적으로 개선하는 것은 브랜드 충성도를 높이는 데 기여할 것입니다.</p>
                <div className="bgWhite">
                  <ul>
                    <li>브랜드명: 마켓컬리(Market Kurly)</li>
                    <li>프로젝트명: 'Market Kurly UX Overhaul'</li>
                    <li>실제 기대효과: 마켓컬리는 고객의 온라인 쇼핑 경험을 개선하기 위해 UX 리디자인을 실시했습니다. 직관적인 인터페이스와 개인 맞춤형 추천 시스템을 도입하여, 고객의 구매 편의성을 높였고, 그 결과 구매 전환율이 상승하고 고객 만족도가 크게 향상되었습니다.</li>
                  </ul>
                </div>
              </BgBox>

              <p className="comment">베트남산 망고젤리는 데이터 기반 고객 분석, 고객 여정 맵핑, UX 리디자인을 통해 고객 경험을 향상시킬 수 있는 잠재력을 가지고 있습니다. 이러한 접근법을 통해, 베트남산 망고젤리는 경쟁사 대비 차별화된 가치를 제공할 수 있으며, 시장에서의 경쟁력을 강화할 수 있습니다. 고객 중심의 접근법을 지속적으로 적용함으로써, 베트남산 망고젤리는 장기적인 고객 충성도를 확보하고, 시장에서 지속 가능한 성장을 이룰 수 있을 것입니다.</p>
            </div>

            <p className="comment2">“ 제공된 시나리오는 실제 데이터에 기반하거나 참고용 가상 시나리오일 수 있습니다. 가상 시나리오는 비즈니스 참고 용도로만 사용하시고, 중요한 비즈니스 결정은 추가적인 데0이터 검토 후에 활용해주세요.”</p>

            <ButtonWrap style={{marginTop: "8px"}}>
              <button type="button">
                <img src={images.IconRefresh} alt="" />
                재생성하기
              </button>
              <button type="button">
                <img src={images.IconCopy} alt="" />
                복사하기
              </button>
              <button type="button">
                <img src={images.IconSave} alt="" />
                저장하기
              </button>
            </ButtonWrap>
            </>
          )}
        </ExpertContent>
      </ExpertWrap>

      {/* 후속질문 */}
      <ExpertWrap>
        <h2>홈케어 뷰티 시장, 스마트한 소비자를 사로잡는 메시지 전략</h2>
        <p>이 보고서는 20대 후반 여성 취업준비생, 특히 경영학과를 졸업하고 직장 경험이 있지만 UI/UX 디자이너로 전향하고자 유데미 큐레이션 이벤트 페이지를 통해 부트캠프를 알아보는 잠재 고객을 대상으로 합니다. 이 보고서는 부트캠프가 속한 산업군과 관련 업계 정보를 제공하여 잠재 고객을 유인할 수 있는 매력적인 혜택 제안 아이디어를 제시하고, 이를 통해 부트캠프의 전략적 의사결정에 필요한 통찰력을 제공하는 데 목적을 두고 있습니다.</p>

        <QuestionBox>
          <div>
            <strong>1. UI/UX 디자이너 전환, 새로운 가능성을 열다</strong>
            <p>UI/UX 디자이너는 디지털 환경에서 사용자 경험을 디자인하는 전문가로, 최근 급격한 디지털 전환과 함께 그 중요성이 더욱 커지고 있습니다. 특히 20대 후반 여성 취업준비생의 경우, 경영학과 전공을 바탕으로 UI/UX 디자인 분야로 진출하여 새로운 가능성을 열 수 있습니다. 경영학적 지식은 UI/UX 디자인 프로세스 이해 및 전략적 디자인 의사결정에 도움이 될 수 있으며, 직장 경험은 실제 사용자 니즈와 비즈니스 요구사항을 연결하는 데 유용한 자산이 될 것입니다.</p>
          </div>

          <div>
            <h4>2. UI/UX 디자인 부트캠프, 성공적인 전환을 위한 지름길</h4>
            <p>UI/UX 디자인 부트캠프는 빠르게 변화하는 디지털 환경에 발맞춰 실무 중심의 교육을 제공하여 단기간에 전문성을 갖추도록 돕습니다. 특히, 20대 후반 여성 취업준비생의 경우, 직장 경험을 바탕으로 빠르게 실무에 적용할 수 있는 실무 지식과 프로젝트 경험을 쌓을 수 있습니다.</p>
            <ul>
              <li>실무중심 교육과 프로젝트 경험 : 부트캠프는 실제 프로젝트를 수행하며 실무 역량을 강화하고, 디자인 트렌드와 최신 기술을 빠르게 익힐 수 있도록 지원합니다. 또한, 포트폴리오 제작 및 취업 지원을 통해 성공적인 취업을 위한 발판을 마련합니다.</li>
              <li>전문 강사진과 커뮤니티 지원 : 숙련된 UI/UX 디자이너 및 개발자로 구성된 전문 강사진은 실무 노하우를 전수하고, 멘토링을 통해 성장을 돕습니다. 또한, 동료 학습자들과의 네트워킹 기회를 제공하여 커뮤니티를 형성하고 지속적인 성장을 지원합니다.</li>
              <li>취업 연계 및 성장 지원 : 부트캠프는 취업 연계 프로그램을 통해 우수한 기업에 취업할 수 있도록 지원하며, 졸업 후에도 지속적인 성장을 위한 네트워킹 및 커뮤니티 활동을 제공합니다.</li>
            </ul>
          </div>

          <div>
            <strong>3. 잠재 고객 분석 및 혜택 제안 아이디어</strong>
            <p>UI/UX 디자인 부트캠프는 20대 후반 여성 취업준비생에게 새로운 기회를 제공합니다. 경영학과 전공과 직장 경험은 UI/UX 디자인 분야에서 큰 강점이 될 수 있으며, 부트캠프를 통해 전문성을 빠르게 습득하고 성공적인 커리어 전환을 이룰 수 있습니다.</p>
          </div>

          <ButtonWrap NoLine>
            <button type="button">
              <img src={images.IconCopy} alt="" />
              복사하기
            </button>
            <button type="button">
              <img src={images.IconSave} alt="" />
              저장하기
            </button>
          </ButtonWrap>
        </QuestionBox>

      </ExpertWrap>
    </>
  );
};

export default ExpertExample;

// 스타일 정의는 기존대로 유지

const ExpertWrap = styled.div`
  position:relative;
  max-width:1135px;
  width:91%;
  text-align:left;
  margin-top:25px;
  padding:30px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

  > h2 {
    font-size:1.25rem;
    font-weight:400;
    color:${palette.gray800};
  }

  > p {
    font-size:0.875rem;
    color:${palette.gray800};
    line-height:1.5;
    margin:8px auto 20px;
  }
`;

const ExpertHeader = styled.div`
  display:flex;
  gap:40px;
  margin-bottom:20px;

  button {
    font-family: 'Pretendard', 'Poppins';
    font-size: 1.25rem;
    font-weight: 400;
    color:rgba(0,0,0,.2);
    outline: none;
    padding-bottom:4px;
    border:0;
    border-bottom:1px solid ${palette.white};
    background: ${palette.white};
    cursor: pointer;
    transition: all 0.5s;

    &.active {
      font-weight:500;
      color:${palette.black};
      border-bottom:1px solid ${palette.black};
    }
  
    &:hover {
      color: ${palette.black};
    }
  }
`

const ExpertContent = styled.div`
  .comment {
    font-size:0.875rem;
    color:${palette.gray800};
    line-height:1.5;
    margin-top:12px;
  }

  .comment2 {
    font-size:0.75rem;
    color:${palette.lightGray};
  }

  ${props =>
    props.Strategy &&
    css`
      .ScrollWrap {
        height:840px;
        overflow-y:auto;
      }
    `
  }

  ${props =>
    props.Marketing &&
    css`
      .ScrollWrap {
        height:840px;
        overflow-y:auto;
      }
    `
  }

  ${props =>
    props.Insight &&
    css`
      .ScrollWrap {
        height:980px;
        overflow-y:auto;
      }
    `
  }
`;

const BgBox = styled.div`
  display:flex;
  flex-direction:column;
  padding:20px;
  border-radius:10px;
  background:rgba(0, 0, 0, 0.03);

  + div {
    margin-top:12px;
  }

  h4 {
    display:flex;
    align-items:center;
    gap:8px;
    margin-bottom:10px;
  }

  span.number {
    width:15px;
    height:15px;
    font-size:0.63rem;
    color:${palette.blue};
    line-height:15px;
    text-align:center;
    border:1px solid ${palette.blue};
  }

  strong {
    display:flex;
    align-items:center;
    gap:8px;
    font-size:0.875rem;
    font-weight:400;
    color:${palette.lightGray};
  }

  p {
    font-size:0.875rem;
    font-weight:400;
    color:${palette.darkGray};
    line-height:1.5;
  }

  .flexBox {
    display:flex;
    gap:12px;
    margin-top:12px;

    > div {
      display:flex;
      flex-direction:column;
      gap:4px;
      width:100%;
      padding:10px;
      border-radius:10px;
      border:1px solid ${palette.lineGray};

      p {
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

    .bgWhite {
      margin-top:0 !important;
    }
  }

  .bgWhite {
    padding:15px !important;
    margin-top:12px;
    border-radius:10px;
    border:1px solid ${palette.white} !important;
    background:${palette.white};

    .title {
      color:${palette.black};
      font-weight:700;
    }
  }

  ul {
    display:flex;
    flex-direction:column;
    gap:5px;

    li {
      position:relative;
      font-size:0.875rem;
      color:${palette.darkGray};
      line-height:1.5;
      padding-left:13px;

      &:before {
        position:absolute;
        top:8px;
        left:0;
        width:5px;
        height:1px;
        background:${palette.black};
        content:'';
      }
    }
  }
`;

const QuestionBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:20px;
  padding:20px;
  border-radius:10px;
  background:rgba(0,0,0,.03);

  div {
    display:flex;
    flex-direction:column;
    gap:4px;
    font-size:0.875rem;
    color:${palette.gray800};
    line-height:1.5;
  }

  strong {
    font-weight:700;
  }

  ul {
    display:flex;
    flex-direction:column;
    gap:5px;

    li {
      position:relative;
      font-size:0.875rem;
      color:${palette.gray800};
      line-height:1.5;
      padding-left:13px;
      margin-left:8px;

      &:before {
        position:absolute;
        top:8px;
        left:0;
        width:3px;
        height:3px;
        border-radius:50%;
        background:${palette.gray800};
        content:'';
      }
    }
  }
`;

const ButtonWrap = styled.div`
  display:flex;
  flex-direction:row !important;
  justify-content:flex-end;
  gap:20px;
  margin-top:${props => {
    if (props.NoLine) return `0`;
    else return `30px`;
  }};
  padding-top:${props => {
    if (props.NoLine) return `0`;
    else return `20px`;
  }};
  border-top:${props => {
    if (props.NoLine) return `0`;
    else return `1px solid ${palette.lineGray}`;
  }};

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
`;
