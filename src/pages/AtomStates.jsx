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

export const STRATEGY_REPORT_COSTOMER_NEEDS_1 = atom([
    "날치알 닭강정은 주로 20대 후반에서 30대 초반의 젊은 소비자, 특히 바쁜 일상 속에서 간편한 식사를 추구하는 직장인 및 미혼 남녀를 타겟으로 합니다. 이 세그먼트는 빠르고 맛있는 간편식을 선호하는 경향이 있으며,  건강한 식사 옵션을 중요시합니다. 리얼월드에서의 유사 제품으로는 '치킨너겟'이나 '튀김닭'과 같은 간편식이 있으며, 이들은 빠른 조리 시간과 간편한 소비 방식으로 시장에서 자리잡고 있습니다."
])
export const STRATEGY_REPORT_COSTOMER_NEEDS_2 = atom([
    "날치알 닭강정은 바쁜 생활 속에서 간편하면서도 고급스러운 맛을 제공하여 고객의 불편함을 해소합니다. 예를 들어, 포장된 식사로서 이동 중에도 쉽게 섭취할 수 있어 소비자에게 긍정적인 경험을 제공합니다.",
    "그러나 일부 소비자는 날치알의 비율이나 품질에 대한 기대가 높을 수 있으며, 실제 제품이 그 기대에 미치지 못할 경우 실망할 수 있습니다. 예를 들어, 날치알의 식감이나 맛이 풍부하지 않다고 느낄 경우 고객의 불만이 발생할 수 있습니다."
])
export const STRATEGY_REPORT_COSTOMER_NEEDS_3 = atom([
    "날치알의 건강 효능 및 독특한 맛을 강조하여 소비자에게 추가 가치를 제공할 수 있습니다. 고객이 건강한 식사를 추구하는 경향에 맞춰, '저지방, 고단백' 식사 옵션으로 마케팅할 수 있습니다.",
    "제품의 건강성을 강조하는 과정에서, 비건 고객이나 특정 알레르기를 가진 소비자를 배제할 위험이 있습니다. 이와 같은 고객층의 니즈를 고려해야 합니다."
])
export const STRATEGY_REPORT_COSTOMER_NEEDS_4 = atom([
    "고객은 바쁜 일상 속에서 빠르고 건강한 식사를 원하며, 날치알 닭강정은 이 요구를 충족시킴으로써 긍정적인 영향을 미칠 수 있습니다",
    "날치알 닭강정은 기존의 간편식 시장에서 차별화된 맛과 건강성을 제공하지만, 경쟁이 치열한 시장에서 지속적으로 혁신하고 소비자의 기대를 충족시켜야 하는 도전 과제가 존재합니다."
])
export const STRATEGY_REPORT_COSTOMER_NEEDS_5 = atom([
    "날치알 닭강정은 '프리미엄 간편식' 시장에서 건강과 맛을 동시에 만족시키는 제품으로 자리잡는 것을 목표로 합니다. 최근 소비자들이 건강을 중시하는 경향을 반영하여, '건강한 간편식'이라는 포지션을 확보하는 것이 중요합니다."
])
export const STRATEGY_REPORT_COSTOMER_NEEDS_6 = atom([
    "날치알 닭강정은 건강한 간편식 시장에서의 성공적인 포지셔닝을 위한 기회를 가지고 있으며, 소비자의 니즈를 충족시키기 위해 품질 관리 및 고객 맞춤형 서비스를 지속적으로 개선해야 합니다. 이를 통해 시장에서의 경쟁력을 확보하고 소비자에게 긍정적인 경험을 제공할 수 있을 것입니다."
])

export const STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_1 = atom("건강한 간편식")
export const STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_2 = atom("독특한 맛과 식감")
export const STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_3 = atom("다양한 소비 방식")

export const STRATEGY_REPORT_CUSTOMER_BENEFITS_1 = atom([
    "날치알 닭강정은 고단백, 저지방 식품으로 소비자에게 건강한 옵션을 제공합니다. 예를 들어, 운동 후 간편하게 섭취할 수 있는 이상적인 스낵으로 자리잡을 수 있습니다.",
    "그러나 특정 소비자에게는 '튀김'이라는 조리 방식이 건강 측면에서 부정적으로 인식될 가능성이 있습니다. 이 경우, 대체 조리 방식이나 재료를 고려해야 합니다."
])
export const STRATEGY_REPORT_CUSTOMER_BENEFITS_2 = atom([
    "날치알의 풍부한 맛과 바삭한 식감은 경쟁 제품과 비교하여 차별화된 경험을 제공합니다. 고객은 이를 통해 새로운 미각적 경험을 즐길 수 있습니다.",
    "기대에 미치지 못할 경우, 소비자의 불만족으로 이어질 수 있습니다. 이를 방지하기 위해 철저한 품질 관리를 도입해야 합니다."
])
export const STRATEGY_REPORT_CUSTOMER_BENEFITS_3 = atom([
    "날치알 닭강정은 간편하게 포장되어 이동 중에도 소비 가능하며, 간식, 술안주 등 다양한 용도로 활용될 수 있습니다.",
    "품질 관리 실패는 고객의 부정적 경험으로 이어질 수 있으므로, 지속적인 품질 관리 시스템 구축이 필요합니다."
])
export const STRATEGY_REPORT_CUSTOMER_BENEFITS_4 = atom([
    "우선 요소 : 건강한 간편식이라는 핵심 이점은 고객에게 가장 큰 영향을 미칩니다. 이는 최근 소비 트렌드와 맞물려 중요성이 더욱 부각되고 있습니다.",
    "잠재적 영향 : 이 핵심 이점이 충족되지 않을 경우, 고객의 만족도가 저하되고 경쟁사로의 이탈이 발생할 수 잇습니다. 따라서 지속적인 개선이 필수적입니다."
])
export const STRATEGY_REPORT_CUSTOMER_BENEFITS_5 = atom([
    "날치알 닭강정은 건강한 간편식 시장에서의 성공적인 포지셔닝을 위한 기회를 가지고 있으며, 소비자의 니즈를 충족시키기 위해 품질 관리 및 고객 맞춤형 서비스를 지속적으로 개선해야 합니다. 이를 통해 시장에서의 경쟁력을 확보하고 소비자에게 긍정적인 경험을 제공할 수 있을 것입니다."
])

export const STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_1 = atom("건강한 간편식")
export const STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_2 = atom("잠재적 니즈 및 기회")
export const STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_3 = atom("문제 해결의 시급성")

export const STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_1 = atom([
    "날치알 닭강정은 고단백, 저지방 식품으로 소비자에게 건강한 옵션을 제공합니다. 예를 들어, 운동 후 간편하게 섭취할 수 있는 이상적인 스낵으로 자리잡을 수 있습니다.",
    "그러나 특정 소비자에게는 '튀김'이라는 조리 방식이 건강 측면에서 부정적으로 인식될 가능성이 있습니다. 이 경우, 대체 조리 방식이나 재료를 고려해야 합니다."
])
export const STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_2 = atom([
    "날치알의 풍부한 맛과 바삭한 식감은 경쟁 제품과 비교하여 차별화된 경험을 제공합니다. 고객은 이를 통해 새로운 미각적 경험을 즐길 수 있습니다.",
    "기대에 미치지 못할 경우, 소비자의 불만족으로 이어질 수 있습니다. 이를 방지하기 위해 철저한 품질 관리를 도입해야 합니다."
])
export const STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_3 = atom([
    "날치알 닭강정은 간편하게 포장되어 이동 중에도 소비 가능하며, 간식, 술안주 등 다양한 용도로 활용될 수 있습니다.",
    "품질 관리 실패는 고객의 부정적 경험으로 이어질 수 있으므로, 지속적인 품질 관리 시스템 구축이 필요합니다."
])
export const STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_4 = atom([
    "날치알 닭강정은 건강한 간편식 시장에서의 성공적인 포지셔닝을 위한 기회를 가지고 있으며, 소비자의 니즈를 충족시키기 위해 품질 관리 및 고객 맞춤형 서비스를 지속적으로 개선해야 합니다. 이를 통해 시장에서의 경쟁력을 확보하고 소비자에게 긍정적인 경험을 제공할 수 있을 것입니다."
])

export const SAVED_REPORTS = atom([]);

export const IS_EDITING_NOW = atom(false);

export const SAVED_CONVERSATIONS = atom({});

export const IS_CLICK_EXPERT_SELECT = atom(false);