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

export const IDEA_FEATURE_BUTTON_STATE = atom(0);
export const IDEA_CUSTOMER_BUTTON_STATE = atom(0);
export const IDEA_PRIORITY_BUTTON_STATE = atom(0);
export const IDEA_LIST_BUTTON_STATE = atom(0);
export const IDEA_GENERATE_BUTTON_STATE = atom(0);

export const IDEA_FEATURE_DATA = atom([
  {
      "title": "맞춤형 면접 질문 생성",
      "text": "AI 시스템은 지원자의 이력서 및 지원 분야를 분석하여 개별 지원자에게 최적화된 면접 질문을 자동 생성합니다. 이를 통해 지원자의 강점과 경험을 효과적으로 파악하고 면접의 객관성을 높입니다. 기존 획일적인 면접 질문에서 벗어나 지원자의 역량을 더욱 정확하게 평가할 수 있습니다."
  },
  {
      "title": "실시간 답변 분석 및 피드백 제공",
      "text": "AI 시스템은 지원자의 답변을 실시간으로 분석하여 언어 능력, 논리력, 표현력, 태도 등을 종합적으로 평가합니다. 면접 진행 중에 부족한 부분이나 개선할 점을 실시간으로 피드백하여 지원자의 면접 역량 향상을 돕습니다. 즉각적인 피드백을 통해 지원자는 면접 과정에서 자신감을 얻고 더 나은 답변을 준비할 수 있습니다."
  },
  {
      "title": "다양한 면접 유형 지원",
      "text": "AI 시스템은 코딩 테스트, 프레젠테이션, 역할극 등 다양한 면접 유형을 지원합니다. 기업은 면접 방식을 선택하여 지원자의 다양한 역량을 효과적으로 평가할 수 있습니다. 다양한 면접 유형을 통해 지원자의 실제 업무 능력과 잠재력을 더욱 정확하게 파악할 수 있습니다."
  },
  {
      "title": "면접 결과 분석 및 보고서 제공",
      "text": "AI 시스템은 면접 결과를 종합적으로 분석하여 객관적인 평가 보고서를 제공합니다. 보고서에는 지원자의 강점, 약점, 개선점, 잠재력 등이 포함되어 채용 담당자의 의사 결정을 지원합니다. 면접 결과 분석을 통해 기업은 채용 전략을 개선하고 더 나은 인재를 확보할 수 있습니다."
  },
  {
      "title": "면접 과정 자동화 및 효율성 증대",
      "text": "AI 시스템을 통해 면접 일정 관리, 질문 생성, 답변 분석, 결과 보고 등 면접 과정을 자동화하여 채용 담당자의 업무 부담을 줄이고 효율성을 높입니다. 면접 과정 자동화를 통해 시간과 비용을 절감하고 더 많은 지원자를 효과적으로 평가할 수 있습니다."
  },
  {
      "title": "데이터 기반 면접 결과 분석 및 예측",
      "text": "AI 시스템은 방대한 면접 데이터를 기반으로 지원자의 잠재력과 성공 가능성을 예측합니다. 과거 면접 데이터를 분석하여 성공적인 채용 사례를 파악하고 미래 성과를 예측하는 모델을 구축합니다. 데이터 기반 예측을 통해 기업은 더욱 효과적인 채용 결정을 내릴 수 있습니다."
  },
  {
      "title": "공정하고 객관적인 면접 평가",
      "text": "AI 시스템은 면접 과정에서 면접관의 주관적인 판단을 최소화하여 공정하고 객관적인 평가를 제공합니다. 면접관의 편견이나 감정을 배제하여 모든 지원자에게 동일한 기회를 제공합니다. 공정한 평가 시스템을 통해 차별 없는 채용 문화를 조성하고 인재 발굴의 효율성을 높일 수 있습니다."
  },
  {
      "title": "면접 환경 개선 및 지원자 만족도 향상",
      "text": "AI 시스템은 면접 환경을 개선하여 지원자의 면접 경험을 향상시킵니다. 편리하고 효율적인 면접 진행을 통해 지원자의 만족도를 높이고 기업 이미지를 개선합니다. 긍정적인 면접 경험을 제공하여 기업에 대한 지원자의 호감도를 높이고 인재 유치 경쟁력을 강화할 수 있습니다."
  },
  {
      "title": "면접 데이터 분석 및 채용 전략 개선",
      "text": "AI 시스템은 면접 데이터를 분석하여 채용 전략을 개선하는 데 활용됩니다. 면접 결과 데이터를 분석하여 채용 프로세스의 문제점을 파악하고 개선 방향을 제시합니다. 데이터 기반 분석을 통해 기업은 더욱 효과적인 채용 전략을 수립하고 인재 확보 목표 달성률을 높일 수 있습니다."
  },
  // {
  //     "title": "보안 및 개인정보 보호 강화",
  //     "text": "AI 시스템은 엄격한 보안 시스템을 통해 지원자의 개인정보를 안전하게 보호합니다. 면접 과정에서 발생하는 모든 데이터는 암호화되고 안전하게 관리됩니다. 보안 및 개인정보 보호 강화를 통해 지원자의 신뢰를 확보하고 윤리적인 채용 시스템 구축에 기여합니다."
  // }
]);
export const IDEA_REQUIREMENT_DATA = atom([
  {
      "title": "사용 편의성 및 직관적인 인터페이스",
      "text": "채용 담당자는 AI 시스템을 쉽고 편리하게 사용할 수 있어야 합니다. 직관적인 인터페이스와 간편한 사용 방법을 통해 누구나 손쉽게 AI 시스템을 활용하고 면접 과정을 자동화할 수 있습니다. 사용 편의성을 높여 채용 담당자의 업무 부담을 줄이고 시스템 활용도를 향상시킬 수 있습니다."
  },
  {
      "title": "맞춤형 설정 및 기능 확장성",
      "text": "기업의 특성과 요구사항에 맞춰 AI 시스템을 설정하고 기능을 확장할 수 있어야 합니다. 면접 질문, 평가 기준, 보고서 형식 등을 자유롭게 설정하여 기업의 채용 시스템에 최적화할 수 있습니다. 맞춤형 설정과 기능 확장성을 통해 다양한 기업의 요구를 충족하고 시스템 활용 범위를 넓힐 수 있습니다."
  },
  {
      "title": "데이터 보안 및 개인정보 보호",
      "text": "AI 시스템은 지원자의 개인정보를 안전하게 보호해야 합니다. 데이터 암호화, 접근 권한 제한, 개인정보 보호 정책 준수 등을 통해 정보 유출을 방지하고 지원자의 신뢰를 확보해야 합니다. 보안 및 개인정보 보호는 AI 시스템의 신뢰성과 지속 가능성을 위한 필수 요소입니다."
  },
  {
      "title": "정확하고 객관적인 면접 평가",
      "text": "AI 시스템은 정확하고 객관적인 면접 평가를 제공해야 합니다. 인공지능 알고리즘의 정확성과 객관성을 검증하여 면접 결과의 신뢰도를 높여야 합니다. 정확한 평가를 통해 공정한 채용 환경을 조성하고 기업의 인재 발굴 효율성을 향상시킬 수 있습니다."
  },
  {
      "title": "지속적인 업데이트 및 기능 개선",
      "text": "AI 시스템은 지속적으로 업데이트되고 기능이 개선되어야 합니다. 새로운 기술 트렌드를 반영하고 사용자 피드백을 수렴하여 시스템을 개선해야 합니다. 지속적인 업데이트를 통해 시스템의 경쟁력을 유지하고 사용자 만족도를 높일 수 있습니다."
  },
  {
      "title": "효율적인 기술 지원 및 고객 서비스",
      "text": "AI 시스템 사용 중 발생하는 문제 해결을 위한 효율적인 기술 지원 및 고객 서비스를 제공해야 합니다. 사용자 친화적인 기술 지원 시스템과 빠른 응답 시간을 통해 사용자의 불편을 최소화해야 합니다. 효율적인 기술 지원은 시스템의 안정적인 운영과 사용자 만족도를 높이는 데 중요한 역할을 합니다."
  },
  {
      "title": "다양한 기업 환경과 규정 적용 가능성",
      "text": "AI 시스템은 다양한 기업 환경과 규정에 적용될 수 있어야 합니다. 다양한 산업 분야, 기업 규모, 채용 규정 등에 맞춰 시스템을 유연하게 적용할 수 있어야 합니다. 적용 가능성을 확대하여 다양한 기업의 채용 시스템 개선에 기여할 수 있습니다."
  },
  {
      "title": "경쟁력 있는 가격 및 비용 효율성",
      "text": "AI 시스템은 경쟁력 있는 가격으로 제공되어야 하며 비용 효율성을 갖춰야 합니다. 면접 과정 자동화를 통한 비용 절감 효과를 제공하고 기업의 경제적 부담을 최소화해야 합니다. 경쟁력 있는 가격과 비용 효율성은 AI 시스템의 도입 가치를 높이고 기업의 경쟁력 강화에 기여할 수 있습니다."
  },
  {
      "title": "데이터 분석 및 활용을 통한 인사이트 제공",
      "text": "AI 시스템은 면접 데이터를 분석하여 채용 관련 인사이트를 제공해야 합니다. 면접 결과 데이터를 분석하여 인재 유형, 채용 트렌드, 성과 예측 등의 정보를 제공합니다. 인사이트 제공을 통해 기업은 더욱 효과적인 채용 전략을 수립하고 인재 확보 목표 달성률을 높일 수 있습니다."
  },
  {
      "title": "지속 가능한 성장 및 발전 가능성",
      "text": "AI 시스템은 지속 가능한 성장과 발전 가능성을 갖춰야 합니다. 새로운 기술 트렌드와 사용자 요구를 반영하여 지속적으로 기능을 업그레이드하고 발전시켜야 합니다. 지속 가능한 성장을 통해 AI 시스템의 가치를 지속적으로 증대하고 기업의 경쟁력 강화에 기여할 수 있습니다."
  }
]);

export const IDEA_FEATURE_DATA_TEMP = atom([
  {
      "title": "맞춤형 면접 질문 생성",
      "text": "AI 시스템은 지원자의 이력서 및 지원 분야를 분석하여 개별 지원자에게 최적화된 면접 질문을 자동 생성합니다. 이를 통해 지원자의 강점과 경험을 효과적으로 파악하고 면접의 객관성을 높입니다. 기존 획일적인 면접 질문에서 벗어나 지원자의 역량을 더욱 정확하게 평가할 수 있습니다."
  },
  {
      "title": "실시간 답변 분석 및 피드백 제공",
      "text": "AI 시스템은 지원자의 답변을 실시간으로 분석하여 언어 능력, 논리력, 표현력, 태도 등을 종합적으로 평가합니다. 면접 진행 중에 부족한 부분이나 개선할 점을 실시간으로 피드백하여 지원자의 면접 역량 향상을 돕습니다. 즉각적인 피드백을 통해 지원자는 면접 과정에서 자신감을 얻고 더 나은 답변을 준비할 수 있습니다."
  },
  {
      "title": "다양한 면접 유형 지원",
      "text": "AI 시스템은 코딩 테스트, 프레젠테이션, 역할극 등 다양한 면접 유형을 지원합니다. 기업은 면접 방식을 선택하여 지원자의 다양한 역량을 효과적으로 평가할 수 있습니다. 다양한 면접 유형을 통해 지원자의 실제 업무 능력과 잠재력을 더욱 정확하게 파악할 수 있습니다."
  },
  {
      "title": "면접 결과 분석 및 보고서 제공",
      "text": "AI 시스템은 면접 결과를 종합적으로 분석하여 객관적인 평가 보고서를 제공합니다. 보고서에는 지원자의 강점, 약점, 개선점, 잠재력 등이 포함되어 채용 담당자의 의사 결정을 지원합니다. 면접 결과 분석을 통해 기업은 채용 전략을 개선하고 더 나은 인재를 확보할 수 있습니다."
  },
  {
      "title": "면접 과정 자동화 및 효율성 증대",
      "text": "AI 시스템을 통해 면접 일정 관리, 질문 생성, 답변 분석, 결과 보고 등 면접 과정을 자동화하여 채용 담당자의 업무 부담을 줄이고 효율성을 높입니다. 면접 과정 자동화를 통해 시간과 비용을 절감하고 더 많은 지원자를 효과적으로 평가할 수 있습니다."
  },
  {
      "title": "데이터 기반 면접 결과 분석 및 예측",
      "text": "AI 시스템은 방대한 면접 데이터를 기반으로 지원자의 잠재력과 성공 가능성을 예측합니다. 과거 면접 데이터를 분석하여 성공적인 채용 사례를 파악하고 미래 성과를 예측하는 모델을 구축합니다. 데이터 기반 예측을 통해 기업은 더욱 효과적인 채용 결정을 내릴 수 있습니다."
  },
  {
      "title": "공정하고 객관적인 면접 평가",
      "text": "AI 시스템은 면접 과정에서 면접관의 주관적인 판단을 최소화하여 공정하고 객관적인 평가를 제공합니다. 면접관의 편견이나 감정을 배제하여 모든 지원자에게 동일한 기회를 제공합니다. 공정한 평가 시스템을 통해 차별 없는 채용 문화를 조성하고 인재 발굴의 효율성을 높일 수 있습니다."
  },
  {
      "title": "면접 환경 개선 및 지원자 만족도 향상",
      "text": "AI 시스템은 면접 환경을 개선하여 지원자의 면접 경험을 향상시킵니다. 편리하고 효율적인 면접 진행을 통해 지원자의 만족도를 높이고 기업 이미지를 개선합니다. 긍정적인 면접 경험을 제공하여 기업에 대한 지원자의 호감도를 높이고 인재 유치 경쟁력을 강화할 수 있습니다."
  },
  {
      "title": "면접 데이터 분석 및 채용 전략 개선",
      "text": "AI 시스템은 면접 데이터를 분석하여 채용 전략을 개선하는 데 활용됩니다. 면접 결과 데이터를 분석하여 채용 프로세스의 문제점을 파악하고 개선 방향을 제시합니다. 데이터 기반 분석을 통해 기업은 더욱 효과적인 채용 전략을 수립하고 인재 확보 목표 달성률을 높일 수 있습니다."
  },
  // {
  //     "title": "보안 및 개인정보 보호 강화",
  //     "text": "AI 시스템은 엄격한 보안 시스템을 통해 지원자의 개인정보를 안전하게 보호합니다. 면접 과정에서 발생하는 모든 데이터는 암호화되고 안전하게 관리됩니다. 보안 및 개인정보 보호 강화를 통해 지원자의 신뢰를 확보하고 윤리적인 채용 시스템 구축에 기여합니다."
  // }
]);
export const IDEA_REQUIREMENT_DATA_TEMP = atom([
  {
      "title": "사용 편의성 및 직관적인 인터페이스",
      "text": "채용 담당자는 AI 시스템을 쉽고 편리하게 사용할 수 있어야 합니다. 직관적인 인터페이스와 간편한 사용 방법을 통해 누구나 손쉽게 AI 시스템을 활용하고 면접 과정을 자동화할 수 있습니다. 사용 편의성을 높여 채용 담당자의 업무 부담을 줄이고 시스템 활용도를 향상시킬 수 있습니다."
  },
  {
      "title": "맞춤형 설정 및 기능 확장성",
      "text": "기업의 특성과 요구사항에 맞춰 AI 시스템을 설정하고 기능을 확장할 수 있어야 합니다. 면접 질문, 평가 기준, 보고서 형식 등을 자유롭게 설정하여 기업의 채용 시스템에 최적화할 수 있습니다. 맞춤형 설정과 기능 확장성을 통해 다양한 기업의 요구를 충족하고 시스템 활용 범위를 넓힐 수 있습니다."
  },
  {
      "title": "데이터 보안 및 개인정보 보호",
      "text": "AI 시스템은 지원자의 개인정보를 안전하게 보호해야 합니다. 데이터 암호화, 접근 권한 제한, 개인정보 보호 정책 준수 등을 통해 정보 유출을 방지하고 지원자의 신뢰를 확보해야 합니다. 보안 및 개인정보 보호는 AI 시스템의 신뢰성과 지속 가능성을 위한 필수 요소입니다."
  },
  {
      "title": "정확하고 객관적인 면접 평가",
      "text": "AI 시스템은 정확하고 객관적인 면접 평가를 제공해야 합니다. 인공지능 알고리즘의 정확성과 객관성을 검증하여 면접 결과의 신뢰도를 높여야 합니다. 정확한 평가를 통해 공정한 채용 환경을 조성하고 기업의 인재 발굴 효율성을 향상시킬 수 있습니다."
  },
  {
      "title": "지속적인 업데이트 및 기능 개선",
      "text": "AI 시스템은 지속적으로 업데이트되고 기능이 개선되어야 합니다. 새로운 기술 트렌드를 반영하고 사용자 피드백을 수렴하여 시스템을 개선해야 합니다. 지속적인 업데이트를 통해 시스템의 경쟁력을 유지하고 사용자 만족도를 높일 수 있습니다."
  },
  {
      "title": "효율적인 기술 지원 및 고객 서비스",
      "text": "AI 시스템 사용 중 발생하는 문제 해결을 위한 효율적인 기술 지원 및 고객 서비스를 제공해야 합니다. 사용자 친화적인 기술 지원 시스템과 빠른 응답 시간을 통해 사용자의 불편을 최소화해야 합니다. 효율적인 기술 지원은 시스템의 안정적인 운영과 사용자 만족도를 높이는 데 중요한 역할을 합니다."
  },
  {
      "title": "다양한 기업 환경과 규정 적용 가능성",
      "text": "AI 시스템은 다양한 기업 환경과 규정에 적용될 수 있어야 합니다. 다양한 산업 분야, 기업 규모, 채용 규정 등에 맞춰 시스템을 유연하게 적용할 수 있어야 합니다. 적용 가능성을 확대하여 다양한 기업의 채용 시스템 개선에 기여할 수 있습니다."
  },
  {
      "title": "경쟁력 있는 가격 및 비용 효율성",
      "text": "AI 시스템은 경쟁력 있는 가격으로 제공되어야 하며 비용 효율성을 갖춰야 합니다. 면접 과정 자동화를 통한 비용 절감 효과를 제공하고 기업의 경제적 부담을 최소화해야 합니다. 경쟁력 있는 가격과 비용 효율성은 AI 시스템의 도입 가치를 높이고 기업의 경쟁력 강화에 기여할 수 있습니다."
  },
  {
      "title": "데이터 분석 및 활용을 통한 인사이트 제공",
      "text": "AI 시스템은 면접 데이터를 분석하여 채용 관련 인사이트를 제공해야 합니다. 면접 결과 데이터를 분석하여 인재 유형, 채용 트렌드, 성과 예측 등의 정보를 제공합니다. 인사이트 제공을 통해 기업은 더욱 효과적인 채용 전략을 수립하고 인재 확보 목표 달성률을 높일 수 있습니다."
  },
  {
      "title": "지속 가능한 성장 및 발전 가능성",
      "text": "AI 시스템은 지속 가능한 성장과 발전 가능성을 갖춰야 합니다. 새로운 기술 트렌드와 사용자 요구를 반영하여 지속적으로 기능을 업그레이드하고 발전시켜야 합니다. 지속 가능한 성장을 통해 AI 시스템의 가치를 지속적으로 증대하고 기업의 경쟁력 강화에 기여할 수 있습니다."
  }
]);

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

export const POC_DETAIL_REPORT_ATOM = atom({});

export const POC_PERSONA_LIST = atom([]);
export const EXPERT_DETAIL_DATA = atom([]);
export const IS_MOBILE = atom(false);

export const USER_CREDIT = atom(0);