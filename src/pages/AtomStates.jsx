// src/AtomStates.jsx
import { atom } from 'jotai';

// 로그인 상태
export const emailAtom = atom('');
export const passwordAtom = atom('');
export const isLoggedInAtom = atom(false);
export const loginSuccessAtom = atom(null);

// 회원가입 상태
export const nameAtom = atom('');
export const signupEmailAtom = atom('');
export const signupPasswordAtom = atom('');
export const confirmPasswordAtom = atom('');
export const roleAtom = atom('user');
export const statusAtom = atom('active');

// 사용자 데이터 상태
export const usersAtom = atom([]); // db 사용 시 필요 없음
export const currentUserAtom = atom(null);
export const errorAtom = atom(''); // 에러 상태 추가

// 패널 선택 상태
export const selectedPanelsAtom = atom(new Set());
export const SELECTED_COUNT = atom(0);
export const SELECTED_PANELS = atom(new Set()); // 선택된 패널의 ID 저장
export const SELECTED_ALL_PANELS = atom(false); 

export const VIEW_PANEL_TYPE = atom(true); // true=카드, false=목록
export const TOTAL_PANEL_COUNT = atom(0);
export const SELECTED_PANEL_COUNT = atom(0);
export const FILTERD_PANEL_COUNT = atom(0); // 필터링된 패널 개수

// 패널 리스트
export const PANEL_LIST = atom([
]);
export const PANEL_LIST_PAGE_COUNT = atom(1);
export const IS_ALL_PANELS_LOADED = atom(false); // 모든 패널을 불러와서 더이상 더보기할 패널이 없는지
export const IS_PANEL_NULL = atom(true);

// 검색어 상태
export const SEARCH_BEHABIORAL_TYPE = atom("");
export const SEARCH_UTILIZATION_TIME = atom("");
export const SEARCH_GENDER = atom([]);
export const SEARCH_AGE = atom([]);
export const SEARCH_MARRIAGE = atom([]);
export const SEARCH_CHILD_M = atom("");
export const SEARCH_CHILD_F = atom("");
export const SEARCH_TAG_1 = atom([]);
export const SEARCH_TAG_2 = atom([]);
export const SEARCH_TAG_3 = atom([]);
export const SEARCH_TAG_4 = atom([]);

// 행동타입이 필터에 걸려있을때 최초검색(0)인지 재검색(1)인지
// 재검색은 패널더보기, 칩삭제
export const IS_RE_SEARCH = atom(0);

// 행동타입값 5개 저장
export const PANEL_TOTAL_VALUE = atom([]);

/////////////////////////////////////////////////////////////////////////////////////////////////////

/* Expert Insight */

// 0 : 아이템 또는 프로젝트 아이디어 직접 입력 시
// 1 : 전략 디렉터와 1:1 커피챗
// 2 : 10초 맞춤 제안서 받기
// 3 : 당장 만나야할 고객은?
export const SELECTED_EXPERT_INDEX = atom(0);

// 사용자가 입력한 비즈니스 정보
export const INPUT_BUSINESS_INFO = atom("");

// 프롬프트 진입 비즈니스 분석
export const TITLE_OF_BUSINESS_INFORMATION = atom("홈케어 뷰티 디바이스와 기능성 화장품");

export const MAIN_FEATURES_OF_BUSINESS_INFORMATION = atom([
    "본 제품은 사용자가 집에서도 피부과 시술과 유사한 효과를 누릴 수 있도록 도와주는 홈케어 뷰티디바이스와 함께 사용할 수 있는 기능성 화장품으로 구성되어 있습니다.", 
    "집에서 편리한 사용 : 바쁜 일상 속에서도 피부과 방문 없이 집에서 간편하게 전문적인 피부 관리가 가능하도록 설계되어야 합니다.", 
    "안전성과 효과 : 사용자가 안전하게 사용할 수 있도록 다양한 안전 장치와 가이드를 제공하여, 피부과 시술과 유사한 효과를 기대할 수 있는 기능성 제품이어야 합니다.",
]);
export const MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION = atom([
    "RF (Radio Frequency) 기술 : 콜라겐 재생을 촉진하여 피부 탄력을 개선하는데 도움을 줍니다.",
    "LED 광치료 : 다양한 파장의 LED 빛을 이용해 피부톤 개선, 여드름 치료, 피부 재생 등을 도와줍니다.", 
    "초음파 : 피부 깊숙이 영양 성분을 침투시키고, 피부 결을 매끄럽게 만드는데 도움을 줍니다.", 
]);
export const BUSINESS_INFORMATION_TARGET_CUSTOMER = atom([
    "피부 관리에 관심이 많은 성인 여성 : 피부과 방문 없이도 집에서 전문적인 피부 관리를 받고자 하는 20대~50대 여성이 목표 고객 대상입니다.",
    "바쁜 일상을 보내는 직장인 : 시간을 내기 어려운 직장인들에게 편리한 홈케어 솔루션을 제공할 수 있습니다.",
    "피부 노화 방지에 관심 있는 중장년층 : 노화 징후를 예방하고자 하는 40대 이상 중장년층이 ...??",
]);

export const TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION = atom([
    "본 제품은 사용자가 집에서도 피부과 시술과 유사한 효과를 누릴 수 있도록 도와주는 홈케어 뷰티디바이스와 함께 사용할 수 있는 기능성 화장품으로 구성되어 있습니다.", 
    "집에서 편리한 사용 : 바쁜 일상 속에서도 피부과 방문 없이 집에서 간편하게 전문적인 피부 관리가 가능하도록 설계되어야 합니다.", 
    "안전성과 효과 : 사용자가 안전하게 사용할 수 있도록 다양한 안전 장치와 가이드를 제공하여, 피부과 시술과 유사한 효과를 기대할 수 있는 기능성 제품이어야 합니다.",
]);
export const TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION = atom([
    "RF (Radio Frequency) 기술 : 콜라겐 재생을 촉진하여 피부 탄력을 개선하는데 도움을 줍니다.",
    "LED 광치료 : 다양한 파장의 LED 빛을 이용해 피부톤 개선, 여드름 치료, 피부 재생 등을 도와줍니다.", 
    "초음파 : 피부 깊숙이 영양 성분을 침투시키고, 피부 결을 매끄럽게 만드는데 도움을 줍니다.", 
]);
export const TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER = atom([
    "피부 관리에 관심이 많은 성인 여성 : 피부과 방문 없이도 집에서 전문적인 피부 관리를 받고자 하는 20대~50대 여성이 목표 고객 대상입니다.",
    "바쁜 일상을 보내는 직장인 : 시간을 내기 어려운 직장인들에게 편리한 홈케어 솔루션을 제공할 수 있습니다.",
    "피부 노화 방지에 관심 있는 중장년층 : 노화 징후를 예방하고자 하는 40대 이상 중장년층이 ...??",
]);

export const SAVED_REPORTS = atom([]);

export const IS_EDITING_NOW = atom(false);

export const SAVED_CONVERSATIONS = atom({});

export const IS_CLICK_EXPERT_SELECT = atom(false);

export const SELECTED_TAB = atom(0)

export const EXPERT_REPORT_DATA = atom(
  {
    "tabs": [
      {
        "title": "해결할 문제와 고객 니즈",
        "sections": [
          {
            "title": "타겟 시장 세그먼트",
            "content": [
              {
                "text": "'달콤한 베트남 망고 젤리'는 10대 남녀라는 특정 세그먼트를 겨냥하고 있습니다. 이 집단은 달콤한 간식에 대한 욕구가 강하며, 특히 학교나 여가 활동 중 간편하게 섭취할 수 있는 제품을 선호합니다."
              }
            ]
          },
          {
            "title": "고객의 주요 불편사항",
            "content": [
              {
                "subTitle": "탭1 - 제목2: 서브 타이틀 1",
                "text": "이 제품은 10대 남녀가 겪는 간식 선택의 어려움을 해결합니다. 예를 들어, 학업 중 스트레스를 해소하기 위해 간편하게 섭취할 수 있는 달콤한 간식이 필요할 때..."
              },
              {
                "subTitle": "탭1 - 제목2: 서브 타이틀 2",
                "text": "그러나, 일부 소비자는 인공 색소나 방부제가 포함된 젤리에 대한 우려가 있을 수 있습니다. 이는 소비자 기대와의 차이로 인해 불만을 초래할 수 있으며..."
              }
            ]
          },
          {
            "title": "잠재적 니즈 및 기회",
            "content": [
              {
                "subTitle": "탭1 - 제목3: 서브 타이틀 1",
                "text": "'달콤한 베트남 망고 젤리'는 자연 유래 성분을 강조하여 건강 지향적인 소비자의 니즈를 충족시킬 수 있습니다. 예를 들어, '무첨가, 자연 재료 사용'을 강조하는..."
              },
              {
                "subTitle": "탭1 - 제목3: 서브 타이틀 2",
                "text": "그러나, 이러한 방향으로 나아갈 경우 생산 비용이 증가할 수 있으며, 가격 경쟁력이 약화될 위험이 있습니다. 따라서 가격 조정과 품질 유지를 동시에 고려해야..."
              }
            ]
          },
          {
            "title": "문제 해결의 시급성",
            "content": [
              {
                "subTitle": "탭1 - 제목4: 서브 타이틀 1",
                "text": "'달콤한 베트남 망고 젤리'는 간편함과 맛을 동시에 제공하여 소비자의 스트레스를 해소하는 데 기여할 수 있습니다. 특히, 학업 중이나 외출 시 간편하게 즐길 수 있는..."
              },
              {
                "subTitle": "탭1 - 제목4: 서브 타이틀 2",
                "text": "그러나, 경쟁사 제품과의 차별성을 유지하기 위해서는 지속적인 혁신과 품질 개선이 필요합니다. 시장의 변화에 민감하게 반응하고, 소비자 피드백을 반영하여 제품..."
              }
            ]
          },
          {
            "title": "이상적인 시장 포지셔닝",
            "content": [
              {
                "text": "이 제품은 '프리미엄 간식'으로 자리매김할 수 있습니다. 이는 소비자에게 건강한 간식 옵션을 제공하면서도, 베트남의 독특한 맛과 향을 통해 차별화된 경험을 선사합니다."
              }
            ]
          },
          {
            "title": "",
            "content": [
              {
                "text": "'달콤한 베트남 망고 젤리'는 현재의 시장에서 고유한 기회를 포착할 수 있는 잠재력을 가지고 있습니다."
              }
            ]
          }
        ]
      },
      {
        "title": "고객 주요 혜택",
        "sections": [
          {
            "title": "뛰어난 맛과 향",
            "content": [
              {
                "text": "베트남 망고젤리는 신선한 베트남산 망고를 사용하여 망고의 풍부한 맛과 향을 그대로 담아냅니다. 이는 10대 소비자들에게 신선하고 달콤한 간식으로 인식되며..."
              }
            ]
          },
          {
            "title": "휴대 간편한 포장",
            "content": [
              {
                "subTitle": "탭2 - 제목2: 서브 타이틀 1",
                "text": "개별 포장된 베트남 망고젤리는 이동 중에도 간편하게 즐길 수 있어, 10대 남녀에게 특히 매력적입니다."
              },
              {
                "subTitle": "탭2 - 제목2: 서브 타이틀 2",
                "text": "그러나 포장재가 너무 얇거나 약할 경우, 과정을 겪는 동안 파손될 가능성이 있습니다."
              }
            ]
          },
          {
            "title": "차별화된 경험",
            "content": [
              {
                "subTitle": "탭2 - 제목3: 서브 타이틀 1",
                "text": "베트남 현지에서 생산된 제품으로, 소비자들에게 이국적인 경험을 제공합니다."
              },
              {
                "subTitle": "탭2 - 제목3: 서브 타이틀 2",
                "text": "그러나, 이국적인 경험이 소비자에게 매력적으로 다가가지 않을 경우, 품질 문제나 생산 과정에서의 불일치가 소비자 경험에 부정적인 영향을 미칠 수 있습니다."
              }
            ]
          },
          {
            "title": "우선순위와 고객 영향 분석",
            "content": [
              {
                "subTitle": "탭2 - 제목4: 서브 타이틀 1",
                "text": "뛰어난 맛과 향은 고객에게 가장 큰 영향을 미치는 요소입니다."
              },
              {
                "subTitle": "탭2 - 제목4: 서브 타이틀 2",
                "text": "만약 이 핵심 이점이 기대에 미치지 못할 경우, 고객 만족도가 저하되고, 이는 경쟁 제품으로의 이탈로 이어질 수 있습니다."
              }
            ]
          },
          {
            "title": "",
            "content": [
              {
                "text": "베트남 망고젤리는 고객에게 제공하는 가치를 명확히 하고, 이를 통해 경쟁에서의 차별화를 확보할 수 있는 강력한 잠재력을 가지고 있습니다."
              }
            ]
          }
        ]
      },
      {
        "title": "경쟁 차별화 전략",
        "sections": [
          {
            "title": "신선한 베트남산 망고 사용",
            "content": [
              {
                "text": "베트남 망고젤리는 신선한 베트남산 망고를 사용하여 망고의 풍부한 맛과 향을 그대로 담아냅니다."
              }
            ]
          },
          {
            "title": "휴대 간편한 포장",
            "content": [
              {
                "subTitle": "탭3 - 제목2: 서브 타이틀 1",
                "text": "개별 포장된 베트남 망고젤리는 이동 중에도 간편하게 즐길 수 있어, 10대 남녀에게 특히 매력적입니다."
              },
              {
                "subTitle": "탭3 - 제목2: 서브 타이틀 2",
                "text": "그러나 포장재가 너무 얇거나 약할 경우, 과정을 겪는 동안 파손될 가능성이 있습니다."
              }
            ]
          },
          {
            "title": "시장 내 유리한 위치 평가",
            "content": [
              {
                "subTitle": "탭3 - 제목3: 서브 타이틀 1",
                "text": "유리한 위치: '달콤한 베트남 망고젤리'는 신선한 원재료와 휴대성 높은 포장을 통해 차별화된 가치 제안을 합니다."
              },
              {
                "subTitle": "탭3 - 제목3: 서브 타이틀 2",
                "text": "지속 가능성: 경쟁 심화와 고객 니즈 변화에 대응하기 위해 지속적인 제품 개선과 새로운 가치 창출이 필요합니다."
              }
            ]
          },
          {
            "title": "제안 사항",
            "content": [
              {
                "text": "1. **소셜 미디어 마케팅 강화**: 10대 소비자와의 소통을 강화하기 위해 인스타그램, 틱톡 등 소셜 미디어 플랫폼을 활용한 마케팅 캠페인을 진행합니다."
              },
              {
                "text": "2. **브랜드 스토리텔링**: 제품의 원재료와 생산 과정을 강조하는 스토리텔링 마케팅을 통해 소비자들의 신뢰를 구축합니다."
              }
            ]
          },
          {
            "title": "",
            "content": [
              {
                "text": "베트남 망고젤리는 고객에게 제공하는 가치를 명확히 하고, 이를 통해 경쟁에서의 차별화를 확보할 수 있는 강력한 잠재력을 가지고 있습니다."
              }
            ]
          }
        ]
      }
    ]
  }
)