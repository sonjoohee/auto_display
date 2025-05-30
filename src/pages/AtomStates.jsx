import { atom } from "jotai";

// 로그인 상태
export const EMAIL = atom("");
export const PASSWORD = atom("");
export const NEW_PASSWORD = atom("");
export const RE_PASSWORD = atom("");
export const IS_LOGGED_IN = atom(false);
export const LOGIN_SUCCESS = atom(null);

// 회원가입 상태
export const SIGN_UP_NAME = atom("");
export const SIGN_UP_EMAIL = atom("");
export const SIGN_UP_PASSWORD = atom("");
export const CONFIRM_PASSWORD = atom("");
export const SIGN_UP_ROLE = atom("user");
export const SIGN_UP_STATUS = atom("active");
export const USER_NAME = atom("");
export const USER_EMAIL = atom("");
export const USER_MEMBERSHIP = atom("Normal");
export const EDUCATION_STATE = atom(false);
export const ADMIN_STATE = atom(false);

// 사용자 데이터 상태
export const CURRENT_USER_STATUS = atom(null);
export const ERROR_STATUS = atom(""); // 에러 상태 추가
export const SUCCESS_STATUS = atom(""); // 성공 상태 추가
export const USER_CREDITS = atom({});


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


export const IS_EDITING_NOW = atom(false);

export const SELECTED_TAB_COPY = atom({
  key: "selectedTabCopy",
  default: {},
});

export const STRATEGY_REPORT_DATA = atom({});

export const ADDITIONAL_REPORT_DATA = atom([]);
export const CUSTOMER_ADDITIONAL_REPORT_DATA = atom([]);

/* -1: 검색으로 시작하기, 1: AI 전문가 선택해서 시작하기*/
export const APPROACH_PATH = atom(0);

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

export const IS_EXPERT_INSIGHT_ACCESSIBLE = atom(false); // Expert Insight 접근 가능 여부를 나타내는 아톰

export const SELECTED_POC_OPTIONS = atom([]);
export const SELCTED_POC_TARGET = atom({});

export const RECOMMENDED_TARGET_DATA = atom({});

export const POC_DETAIL_REPORT_DATA = atom({});

export const POC_PERSONA_LIST = atom([]);
export const EXPERT_DETAIL_DATA = atom([]);
export const IS_MOBILE = atom(false);

export const USER_CREDIT = atom(0);

export const BUTTON_STATE = atom({}); // 버튼 클릭 여부 확인 -> 버튼 클릭 시 MoleculeReportController 비활성화

export const IS_ADDING_NOW = atom({
  section: "",
  isAdding: false,
});

export const NEW_ADD_CONTENT = atom("");

export const USER_CREDIT_DATA = atom([]);
export const USER_PAGE_CNT = atom([]);
export const USER_PROJECT_LIST = atom([]);
export const USER_CREDIT_LIST = atom([]);
export const USER_PERSONA_LIST = atom([]);

export const CREDIT_TARGET_PAGE = atom(1);
export const PROJECT_TARGET_PAGE = atom(1);
export const PERSONA_TARGET_PAGE = atom(1);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 마케팅 */

export const IS_MARKETING = atom(false);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 페르소나 */

export const PROJECT_ID = atom("");

export const PROJECT_REPORT_ID = atom("");
export const FILTERED_PROJECT_LIST = atom([]);
export const BUSINESS_PERSONA_LIST = atom([]);
export const PROJECT_LIST = atom([]);
export const PROJECT_REPORT_LIST = atom([]);
export const REPORT_LIST = atom([]);
export const REQUESTED_PERSONA = atom([]);

export const All_BUSINESS_PERSONA_LIST = atom([]);
// export const BUSINESS_ = atom([]);

export const BUSINESS_ANALYSIS = atom({
  input: "",
  title: "",
  characteristics: "",
  features: [],
  category: {},
});

export const PERSONA_LIST = atom({
  selected: [],
  unselected: [],
});

export const SELECTED_PERSONA_LIST = atom([]);

export const CUSTOMIZE_PERSONA_LIST = atom({
  selected: [],
  unselected: [],
});

export const REQUEST_PERSONA_LIST = atom({
  persona: [],
  positioning: {},
});

export const INTERVIEW_QUESTION_LIST = atom([]);
export const SINGLE_INTERVIEW_QUESTION_LIST = atom([]);

export const IS_PERSONA_ACCESSIBLE = atom(false);
export const PERSONA_STEP = atom(0);
export const PERSONA_BUTTON_STATE_1 = atom(0);
export const PERSONA_BUTTON_STATE_2 = atom(0);
export const PERSONA_BUTTON_STATE_3 = atom(0);

// export const SELECTED_INTERVIEW_PURPOSE = atom("");
export const CATEGORY_COLOR = atom({});

export const PROJECT_LOAD_BUTTON_STATE = atom(false);
export const REPORT_LOAD_BUTTON_STATE = atom(false);
export const REPORT_DESCRIPTION_LOAD_BUTTON_STATE = atom(false);

export const INTERVIEW_DATA = atom([]);
export const INTERVIEW_REPORT = atom([]);
export const INTERVIEW_REPORT_ADDITIONAL = atom([]);
export const SINGLE_INTERVIEW_REPORT_TAB1 = atom([]);
export const SINGLE_INTERVIEW_REPORT_TAB2 = atom([]);
export const SINGLE_INTERVIEW_REPORT_TAB3 = atom([]);

export const IS_EDIT_MODE = atom(false);

export const IS_SHOW_TOAST = atom(false);

export const IS_LOADING_BUSINESS_ANALYSIS = atom(false);

export const PROJECT_LOADING = atom({
  isLoading: false,
  lastLoadTime: null,
  error: null,
});
export const PROJECT_REFRESH_TRIGGER = atom(0);


export const SELECTED_INTERVIEW_TYPE = atom("");

export const SELECTED_INTERVIEW_PURPOSE = atom("");
export const SELECTED_PURPOSE_INDEX = atom(0);
export const SELECTED_INTERVIEW_PURPOSE_DATA = atom({});

export const PURPOSE_ITEMS_SINGLE = atom([]);
export const CUSTOM_THEORY_DATA = atom({});

export const IS_LOADING_QUESTION = atom(false);

export const CREDIT_CUSTOM_THEORY = atom(0);
export const CREDIT_ADDITIONAL_QUESTION = atom(0);
export const CREDIT_INDEPTH_INTERVIEW = atom(0);
export const CREDIT_REQUEST_CUSTOM_PERSONA = atom(0);
export const CREDIT_REQUEST_BUSINESS_PERSONA = atom(0);
export const CREDIT_CREATE_PERSONA_DEFAULT = atom(0);
export const CREDIT_CREATE_TOOL = atom(0);
export const CREDIT_CREATE_EXPERT = atom(0);
export const CREDIT_CREATE_MULTIMODAL = atom(0);
export const CREDIT_CREATE_INTERVIEW = atom(0);
export const CREDIT_CREATE_PROJECT = atom(0);
export const CREDIT_CREATE_TOOL_LOW = atom(0);
export const CREDIT_CREATE_TOOL_HIGH = atom(0);
export const CREDIT_CREATE_TOOL_LOADED = atom(false);

export const EVENT_STATE = atom(false);
export const EVENT_TITLE = atom("");
export const TRIAL_STATE = atom(false);

export const CUSTOM_PERSONA_LIST = atom([]);

export const ACCESSABLE_EXPERT = atom(false);

export const TOOL_ID = atom("");
export const TOOL_STEP = atom(0);

export const TOOL_LOADING = atom(false);

//Education Tool
export const EDUCATION_TOOL_COMPLETED_STATUS = atom(false);

export const KANO_MODEL_GRAPH_DATA = atom({});

// 프로젝트 생성 페이지
export const PROJECT_CREATE_INFO = atom({});
export const PROJECT_TOTAL_INFO = atom({});
export const PROJECT_EDUCATION_STATE = atom("basic");
export const PROJECT_EDUCATION_CODE = atom("");

export const PROJECT_PERSONA_LIST = atom([]);

export const PERSONA_LIST_SAAS = atom([]);
export const TOOL_LIST_SAAS = atom([]);
export const DASHBOARD_TOOL_LIST_SAAS = atom([]);
export const PROJECT_SAAS = atom({});
export const ACCESS_DASHBOARD = atom(false);
export const ACCESS_STATE_SAAS = atom(false);
