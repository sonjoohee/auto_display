// src/AtomStates.jsx
import { atom } from "jotai";

// 로그인 상태
export const emailAtom = atom("");
export const passwordAtom = atom("");
export const newPasswordAtom = atom("");
export const rePasswordAtom = atom("");
export const isLoggedInAtom = atom(false);
export const loginSuccessAtom = atom(null);

// 회원가입 상태
export const nameAtom = atom("");
export const signupEmailAtom = atom("");
export const signupPasswordAtom = atom("");
export const confirmPasswordAtom = atom("");
export const roleAtom = atom("user");
export const statusAtom = atom("active");
export const USER_NAME = atom("");
export const USER_EMAIL = atom("");

// 사용자 데이터 상태
export const usersAtom = atom([]); // db 사용 시 필요 없음
export const currentUserAtom = atom(null);
export const errorAtom = atom(""); // 에러 상태 추가

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
export const PANEL_LIST = atom([]);
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

export const SELECTED_EXPERT_INDEX = atom("0");

// 사용자가 입력한 비즈니스 정보
export const INPUT_BUSINESS_INFO = atom("");

// 프롬프트 진입 비즈니스 분석
export const TITLE_OF_BUSINESS_INFORMATION = atom("");
export const MAIN_FEATURES_OF_BUSINESS_INFORMATION = atom([]);
export const MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION = atom([]);
export const BUSINESS_INFORMATION_TARGET_CUSTOMER = atom([]);

export const TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION = atom([]);
export const TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION = atom([]);
export const TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER = atom([]);

export const IS_EDITING_NOW = atom(false);

export const SELECTED_TAB_COPY = atom({
  key: 'selectedTabCopy',
  default: {}
});

export const STRATEGY_REPORT_DATA = atom({});

export const ADDITIONAL_REPORT_DATA = atom([]);
export const CUSTOMER_ADDITIONAL_REPORT_DATA = atom([]);

/* -1: 검색으로 시작하기, 1: AI 전문가 선택해서 시작하기*/
export const APPROACH_PATH = atom(0);

export const SELECTED_ADDITIONAL_KEYWORD = atom([]);
export const SELECTED_CUSTOMER_ADDITIONAL_KEYWORD = atom([]);

export const QUESTION_LIST = atom({
  1: {
    방법론관련: [
      "우리 산업의 강점과 약점 파악하기", // input : SWOT방법론 기반 고객 산업의 강점과 약점 제시
      "스타와 캐시카우 찾기", // input : BCG모델기반 스타와 캐시카우 찾는 방법 제시
      "차별화 전략 세우기", // input : 차별화 전략 세우는 방법 제시
      "KPI 설정과 관리법", // input : KPI 설정과 관리법 제시
      "애자일로 전략 수정하기", // input : 애자일로 전략 수정 방법 제시
      "프로덕트-마켓 핏 확인", // input : 프로덕트-마켓 핏 확인 방법 제시
      "스타트업 비용 절감 팁", // input : 스타트업 비용 절감 팁 제시
    ],
    사례제시: [
      "혁신으로 성공한 전통 기업들", // input : 혁신으로 성공한 전통 기업 사례 제시
      "독보적 시장 지위 전략", // input : 독보적 시장 지위 전략 사례 제시
      "위기를 기회로 바꾼 사례", // input : 위기를 기회로 바꾼 사례 제시
      "틈새 시장 성공 스토리", // input : 틈새 시장 성공 스토리 사례 제시
      "변화에 대응한 스타트업", // input : 변화에 대응한 스타트업 사례 제시
    ],
    아이디어제공: [
      "우리 제품 기능 우선순위 설정 해보기", // input : 고객 제품 기능 우선순위 설정 해주기
      "새 수익 창출 기회 찾아보기", // input : 새 수익 창출 기회 찾아주기
      "파트너십 기회 발굴해보기", // input : 파트너십 기회 발굴 해주기
      "비즈니스 모델 혁신 방법 제안받기", // input : 비즈니스 모델 혁신 방법 제안해주기
      "제품 개선 아이디어 받아보기", // input : 제품 개선 아이디어 제안해주기
    ],
  },
  2: {
    방법론관련: [
      "타겟팅 제대로 하고 있을까?", // input : 적합한 타겟팅 방법 제시
      "4P 전략 업그레이드", // input : 4P 전략을 활용한 마케팅 전략 향상 방법 제시
      "콘텐츠로 브랜드 강화하기", // input : 콘텐츠 마케팅을 활용한 브랜드 인지도 향상 방법 제시
      "성과 중심 광고 캠페인", // input : 성과 기반 광고 캠페인 관리 팁 제시
      "맞춤형 마케팅 자동화", // input : 고객 여정에 맞춤 마케팅 자동화 설정 가이드 제시
      "소셜 미디어로 고객 참여", // input : 고객 참여를 이끄는 소셜 미디어 전략 제시
      "데이터 기반 마케팅 자동화", // input : 데이터 기반 마케팅 자동화 기법 제시
      "사용자 콘텐츠 활용 팁", // input : 사용자 콘텐츠 활용 팁 제시
    ],
    사례제시: [
      "성공적인 인플루언서 활용 사례", // input : 성공적인 인플루언서 활용 사례 제시
      "바이럴 마케팅 사례 톱3", // input : 바이럴 마케팅 사례 톱 3 제시
      "리브랜딩 성공 사례", // input : 리브랜딩 성공 사례 제시
      "사용자 콘텐츠로 충성도 강화 사례", // input : 사용자 콘텐츠로 충성도 강화 사례 제시
      "감성 마케팅 성공 사례", // input : 감성 마케팅 성공 사례 제시
      "리텐션으로 재구매 유도 사례", // input : 리텐션으로 재구매 유도 사례 제시
      "게릴라 마케팅 성공", // input : 게릴라 마케팅 성공 사례 제시
      "소셜 미디어로 바이럴 성공한 사례", // input : 소셜 미디어로 바이럴 성공한 사례 제시
    ],
    아이디어제공: [
      "SNS 광고 카피 제안받기", // input : SNS 광고 카피 제안해주기
      "소비자 행동 메시지 제안받기", // input : 소비자 행동 메세지 제안해주기
      "감성 캠페인 아이디어 받기", // input : 감성 캠페인 아이디어 제안해주기
      "신제품 론칭 이벤트 아이디어 받기", // input : 신제품 론칭 이벤트 아이디어 제안해주기
      "브랜드 스토리 강화해보기", // input : 소비자 행동 메세지 제안해주기
      "타겟 맞춤 프로모션 제안받기", // input : 타겟 맞춤 프로모션 제안해주기
    ],
  },
  3: {
    방법론관련: [
      "효과적인 고객 세분화", // input : 효과적인 고객 세분화를 위한 데이터 분석 방법 제시
      "고객 페르소나 개발 꿀팁", // input : 고객 페르소나 개발 꿀팁 제시
      "심리적 세분화 활용하기", // input : 심리적 세분화를 통한 맞춤형 마케팅 전략
      "구매 패턴으로 충성도 높이기", // input : 구매 패턴 분석으로 고객 충성도 향상 방법 제시
      "고객 여정 맵핑 전략", // input : 고객 여정 맵핑을 통한 맞춤형 경험 설계 방법 제시
      "피드백 루프 활용법", // input : 고객 피드백 루프 구축과 활용 방법 제시
    ],
    사례제시: [
      "니치 마켓 성공 사례", // input : 니치 마켓으로 성공한 사례 제시
      "생애 가치 극대화 브랜드", // input : 고객의 생애 가치를 극대화한 리테일 브랜드 사례 제시
      "SNS 데이터로 세분화 성공 사례", // input : 소셜 미디어 데이터를 활용한 고객 세분화 성공 사례 제시
      "추천 시스템으로 매출 증대한 사례", // input : 고객의 취향에 맞춘 추천 시스템으로 매출을 증대시킨 사례 제시
      "AI 고객 세분화 혁신 사례", // input : 인공지능을 활용한 고객 세분화 성공 사례 제시
      "로열티 프로그램 성공 사례", // input : 고객 로열티 프로그램으로 혁신한 사례 제시
    ],
    아이디어제공: [
      "고객 유형별 분석해보기", // input : 고객에 적합한 고객 유형 분석해주기
      "페르소나로 마음 읽어보기", // input : 고객에 적합한 페르소나 만들어주기
      "세그먼트 맞춤 프로모션 제안받기", // input : 고객 세그먼트에 맞춘 프로모션 아이디어 만들어주기
      "새로운 고객 세그먼트 찾기", // input : 새로운 고객 세그먼트를 발굴하는 창의적인 아이디어 제안해주기
      "피드백으로 전략 개선 방법 확인하기", // input : 고객 피드백을 활용한 세분화 전략 개선 아이디어 알려주기
      "잠재 고객 혜택 제안받기", // input : 잠재 고객을 유인할 수 있는 매력적 혜택 제안 아이디어 주기
    ],
  },
});

export const CONVERSATION_STAGE = atom(1); // 초기값 1

export const ANALYSIS_BUTTON_STATE = atom(0);
export const EXPERT_BUTTON_STATE = atom(0);
export const ADDITION_BUTTON_STATE = atom(0);
export const CUSTOMER_ADDITION_BUTTON_STATE = atom(0);
export const TARGET_REPORT_BUTTON_STATE = atom(0);
export const TARGET_SELECT_BUTTON_STATE = atom(0);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 아이디어 디벨로퍼 */

export const IDEA_FEATURE_BUTTON_STATE = atom(0);
export const IDEA_CUSTOMER_BUTTON_STATE = atom(0);
export const IDEA_PRIORITY_BUTTON_STATE = atom(0);
export const IDEA_LIST_BUTTON_STATE = atom(0);
export const IDEA_GENERATE_BUTTON_STATE = atom(0);

export const IDEA_FEATURE_DATA = atom([]);
export const IDEA_REQUIREMENT_DATA = atom([]);

export const IDEA_FEATURE_DATA_TEMP = atom([]);
export const IDEA_REQUIREMENT_DATA_TEMP = atom([]);

export const IS_EDITING_IDEA_FEATURE = atom(false);
export const IS_EDITING_IDEA_CUSTOMER = atom(false);

export const ADDING_IDEA_FEATURE = atom(false);
export const ACTIVE_IDEA_FEATURE_INDEX = atom(0);
export const ADD_CONTENT_IDEA_FEATURE = atom("");
export const EDITED_IDEA_FEATURE_TITLE = atom("");

export const ADDING_IDEA_CUSTOMER = atom(false);
export const ACTIVE_IDEA_CUSTOMER_INDEX = atom(0);
export const ADD_CONTENT_IDEA_CUSTOMER = atom("");
export const EDITED_IDEA_CUSTOMER_TITLE = atom("");

export const IDEA_LIST = atom([]);
export const IDEA_GROUP = atom({});
export const IDEA_PRIORITY = atom([]);
export const IDEA_MIRO = atom([]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 그로스 해커 */

export const GROWTH_HACKER_BUTTON_STATE = atom(0);
export const GROWTH_HACKER_KPI_BUTTON_STATE = atom(0);
export const KPI_QUESTION_LIST = atom([]);
export const GROWTH_HACKER_REPORT_DATA = atom([]);
export const GROWTH_HACKER_DETAIL_REPORT_DATA = atom({});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 가격 분석 전문가 */

export const PRICE_START_BUTTON_STATE = atom(0);
export const PRICE_PRODUCT = atom([]);
export const PRICE_SCRAP_DATA = atom({});
export const PRICE_REPORT_DATA = atom({});
export const PRICE_CONTINUE_BUTTON_STATE = atom(0);
export const PRICE_PRODUCT_SEGMENTATION = atom([]);
export const PRICE_SELECTED_PRODUCT_SEGMENTATION = atom([]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 설문조사 전문가 */

export const SURVEY_OPTION_BUTTON_STATE = atom(0);
export const SURVEY_GUIDELINE_BUTTON_STATE = atom(0);
export const SURVEY_GOAL_SUGGESTION_BUTTON_STATE = atom(0);
export const SURVEY_QUESTION_LIST = atom([]);
export const SURVEY_GUIDELINE_REPORT_DATA = atom([]);
export const SURVEY_GUIDELINE_DETAIL_REPORT_DATA = atom({});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CUSTOMER_ADDITION_QUESTION_INPUT = atom("");

export const CONVERSATION_ID = atom("");
export const CONVERSATION = atom([]);
export const IS_LOADING = atom(false);
export const IS_LOADING_ANALYSIS = atom(false);
export const REPORT_REFRESH_TRIGGER = atom(false); // 새로고침 트리거 상태 추가
export const CHAT_REFRESH_TRIGGER = atom(false); // 새로고침 트리거 상태 추가

export const SELECTED_EXPERT_LIST = atom([]); // 전문가 선택영역 표시 관련, 선택된 전문가 인덱스 관리

// 팝업 관련 atom 추가
export const IS_LOGIN_POPUP_OPEN = atom(false);
export const IS_SIGNUP_POPUP_OPEN = atom(false);
export const IS_PASSWORD_RESET_POPUP_OPEN = atom(false);

// 소셜 로그인 상태 관리 아톰 추가
export const IS_SOCIAL_LOGGED_IN = atom(false); // 소셜 로그인 여부를 나타내는 아톰

export const SAVED_TIMESTAMP = atom(0); // 지난 프로젝트의 타임스탬프

export const IS_EXPERT_INSIGHT_ACCESSIBLE = atom(false);// Expert Insight 접근 가능 여부를 나타내는 아톰

export const SELECTED_POC_OPTIONS = atom([]);
export const SELCTED_POC_TARGET = atom({});

export const RECOMMENDED_TARGET_DATA = atom({});

export const POC_DETAIL_REPORT_DATA = atom({});

export const POC_PERSONA_LIST = atom([]);
export const EXPERT_DETAIL_DATA = atom([]);
export const IS_MOBILE = atom(false);

export const USER_CREDIT = atom(0);

export const BUTTON_STATE = atom({}); // 버튼 클릭 여부 확인 -> 버튼 클릭 시 MoleculeReportController 비활성화