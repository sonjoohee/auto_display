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

export const SAVED_REPORTS = atom([]);
export const SAVED_CONVERSATIONS = atom({});
