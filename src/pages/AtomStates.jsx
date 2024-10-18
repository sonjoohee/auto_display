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

export const IDEA_PRIORITY = atom([
    {
        "title": "채용 담당자 (HR 매니저)",
        "content": [
            {
                "title": "채용 담당자 (HR 매니저)",
                "text": "채용 담당자는 AI 면접 시스템을 통해 면접 과정을 자동화하여 시간과 비용을 절감하고, 객관적인 평가를 통해 효율적인 채용을 진행하고자 합니다. 또한, 면접 결과 분석을 통해 채용 전략을 개선하고 인력 채용 효율성을 높이기를 원합니다."
            },
            {
                "subTitle": "면접 결과 요약 및 비교 분석 기능",
                "text": "이 기능은 채용 담당자가 여러 지원자의 면접 결과를 한눈에 비교 분석할 수 있도록 지원하여 효율적인 의사 결정을 내리는 데 도움을 줍니다. 다수의 지원자를 평가해야 하는 채용 담당자에게 시간을 절약하고 객관적인 비교 분석을 가능하게 하여 효율적인 채용 프로세스를 지원합니다."
            },
            {
                "subTitle": "면접 결과 시각화 및 분석 도구 제공",
                "text": "시각화된 면접 결과를 통해 채용 담당자는 면접 결과를 더욱 명확하고 효과적으로 이해할 수 있습니다. 면접 질문별 답변 분포, 지원자별 능력 평가 점수, 면접 결과 분석 등을 시각화하여 면접 결과를 한눈에 파악하고 객관적인 데이터를 기반으로 효율적인 의사 결정을 내릴 수 있도록 지원합니다."
            },
            {
                "subTitle": "면접 데이터 기반 인사이트 도출",
                "text": "면접 데이터 분석을 통해 채용 담당자는 면접 트렌드를 파악하고 면접 질문의 효과성을 평가하여 면접 질문을 개선하고 면접 과정을 효율적으로 운영할 수 있습니다. 면접 데이터 분석 결과를 바탕으로 면접 트렌드, 지원자 특징, 면접 질문 효과 등을 담은 분석 보고서를 제공하여 효과적인 인재 채용 전략 수립에 기여합니다."
            }
        ]
    },
    {
        "title": "면접관 (면접 진행자)",
        "content": [
            {
                "title": "면접관 (면접 진행자)",
                "text": "면접관은 AI 면접 시스템을 통해 면접 과정의 주관적인 판단을 최소화하고, 지원자의 능력과 잠재력을 객관적으로 평가하여 공정한 면접 환경을 조성하고자 합니다. 또한, 면접 결과 분석을 통해 면접 질문 및 평가 기준을 개선하고 면접 과정의 효율성을 높이기를 원합니다."
            },
            {
                "subTitle": "자연스러운 대화형 인터페이스",
                "text": "자연스러운 대화형 인터페이스는 면접관이 지원자에게 질문을 던지고 답변을 받는 과정을 자연스럽게 진행할 수 있도록 지원합니다. 마치 실제 면접처럼 자연스러운 어투와 표현을 사용하여 지원자의 긴장감을 완화하고 편안한 면접 환경을 조성합니다."
            },
            {
                "subTitle": "실시간 피드백 제공",
                "text": "실시간 피드백 기능은 지원자의 답변을 즉각적으로 분석하여 긍정적/부정적 피드백을 제공하여 면접 과정 중 답변을 개선할 수 있는 기회를 제공합니다. 면접관은 실시간 피드백을 통해 지원자의 답변을 더욱 정확하게 이해하고 객관적인 평가를 내릴 수 있습니다."
            },
            {
                "subTitle": "평가 지표별 상세 설명 제공",
                "text": "면접 평가 지표별 상세 설명은 면접관이 각 평가 지표가 무엇을 의미하는지, 어떤 기준으로 평가되는지에 대한 자세한 설명을 제공하여 지원자를 더욱 정확하게 평가할 수 있도록 돕습니다. 면접관은 각 지표에 대한 명확한 이해를 바탕으로 지원자의 능력과 잠재력을 더욱 정확하게 평가할 수 있습니다."
            }
        ]
    },
    {
        "title": "지원자 (면접 참여자)",
        "content": [
            {
                "title": "지원자 (면접 참여자)",
                "text": "지원자는 AI 면접 시스템을 통해 면접 과정의 긴장감을 완화하고 편안하게 면접에 참여하고자 합니다. 또한, 면접 결과를 분석하여 자신의 강점과 약점을 파악하고 향후 면접 준비에 활용하고자 합니다."
            },
            {
                "subTitle": "지원자 맞춤형 질문 난이도 조절",
                "text": "지원자의 수준에 맞는 질문 난이도를 자동으로 조절하여 면접에 대한 부담감을 줄여주고 편안한 면접 환경을 조성합니다. 지원자는 자신의 수준에 맞는 질문을 받아 면접에 대한 긴장감을 완화하고 자신감을 높일 수 있습니다."
            },
            {
                "subTitle": "개인 맞춤형 면접 결과 분석 리포트 제공",
                "text": "면접이 끝난 후, 개인별 맞춤형 면접 결과 분석 리포트를 제공하여 자신의 면접 역량을 파악하고 향후 면접 준비에 활용할 수 있도록 돕습니다. 지원자는 자신의 강점과 약점을 명확히 파악하고 개선할 수 있는 부분을 확인하여 다음 면접을 위한 전략을 수립할 수 있습니다."
            },
            {
                "subTitle": "답변 분석 결과 상세 설명 제공",
                "text": "답변에 대한 상세한 분석 결과를 제공하여 답변의 논리적 오류, 비문, 어색한 표현 등을 구체적으로 지적하고 개선 방향을 제시합니다. 지원자는 자신의 답변에 대한 명확한 이해를 얻고, 면접 과정 중 자신의 답변을 더욱 효과적으로 개선할 수 있습니다."
            }
        ]
    },
    {
        "title": "기술 개발자 (AI 엔지니어)",
        "content": [
            {
                "title": "기술 개발자 (AI 엔지니어)",
                "text": "AI 면접 시스템의 기술 개발자는 면접 평가 시스템의 정확성과 객관성을 높이고, 다양한 직무 및 산업 분야에 적용 가능하도록 시스템을 지속적으로 업데이트하고 개선하고자 합니다. 또한, 최신 기술을 적용하여 면접 시스템의 성능을 향상시키고 사용자 경험을 개선하고자 합니다."
            },
            {
                "subTitle": "최신 자연어 처리 모델 적용",
                "text": "최신 자연어 처리 모델을 적용하여 지원자의 답변을 더욱 정확하게 분석하고 평가할 수 있도록 합니다. 특히, BERT, GPT-3 등 최신 언어 모델을 활용하여 답변의 의미, 맥락, 감정을 더욱 정밀하게 파악하여 객관적인 평가를 제공할 수 있습니다. 이를 통해 면접 평가 시스템의 정확성과 신뢰성을 향상시킬 수 있습니다."
            },
            {
                "subTitle": "딥러닝 기반 면접 평가 모델 개선",
                "text": "딥러닝 기반 면접 평가 모델을 지속적으로 학습시켜, 더욱 정확하고 객관적인 평가가 가능하도록 합니다. 다양한 면접 데이터를 활용하여 모델의 정확도를 향상시키고, 지원자의 능력, 적성, 잠재력을 더욱 정확하게 평가할 수 있도록 합니다. 이를 통해 면접 평가 시스템의 정확성과 객관성을 높일 수 있습니다."
            },
            {
                "subTitle": "직무별 능력 평가 모델 구축",
                "text": "각 직무별로 능력 평가 모델을 구축하여 지원자의 능력을 정확하게 평가할 수 있습니다. 예를 들어, 개발 직무는 코드 작성 능력, 문제 해결 능력, 알고리즘 이해도를 평가하는 모델을, 마케팅 직무는 데이터 분석 능력, 커뮤니케이션 능력, 전략적 사고 능력을 평가하는 모델을 구축합니다. 이를 통해 면접 평가 시스템의 직무 적합성을 높이고, 더욱 정확한 평가를 가능하게 합니다."
            }
        ]
    },
    {
        "title": "IT 보안 전문가 (데이터 보안 담당자)",
        "content": [
            {
                "title": "IT 보안 전문가 (데이터 보안 담당자)",
                "text": "IT 보안 전문가는 AI 면접 시스템에서 발생할 수 있는 데이터 유출 및 개인 정보 침해를 방지하고, 면접 데이터를 안전하게 보호하는 데 중점을 둡니다. 면접 데이터 보안 및 개인 정보 보호에 대한 강력한 시스템 구축을 통해 면접 참여자의 신뢰를 확보하고, 안전한 면접 환경을 조성하고자 합니다."
            },
            {
                "subTitle": "개인 정보 탈취 방지 기술 적용",
                "text": "AI 시스템은 지원자의 답변을 분석할 때 개인 정보를 탈취하거나 유출하지 않도록 암호화 기술과 데이터 마스킹 기법을 적용합니다. 답변 내용에서 개인 식별 정보를 삭제하고, 익명화된 데이터만 분석하여 개인 정보 보호를 강화합니다. 이를 통해 면접 데이터 보안을 강화하고, 지원자의 개인 정보를 안전하게 보호합니다."
            },
            {
                "subTitle": "개인 정보 보호 정책 준수 면접 평가 모델 개발",
                "text": "AI 시스템은 개인 정보 보호 정책을 준수하여 개발된 면접 평가 모델을 사용합니다. 모델 학습 과정에서 개인 정보를 제외하고, 능력, 적성, 잠재력 등 객관적인 평가 지표를 기반으로 학습 데이터를 구성합니다. 이를 통해 지원자의 개인 정보를 보호하면서 객관적인 면접 평가를 수행합니다."
            },
            {
                "subTitle": "데이터 암호화 및 접근 제한 기능 강화",
                "text": "AI 시스템은 면접 데이터를 안전하게 보호하기 위해 암호화 및 접근 제한 기능을 강화합니다. 면접 데이터를 암호화하고, 접근 권한을 제한하여 면접 데이터 유출 및 오용을 방지합니다. 또한, 면접 데이터 보안 관련 정책 및 절차를 마련하여 면접 데이터를 안전하게 관리합니다. 이를 통해 면접 데이터 보안을 강화하고, 면접 참여자의 신뢰를 높입니다."
            }
        ]
    }
]);

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