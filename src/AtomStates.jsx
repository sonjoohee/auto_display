// src/AtomStates.jsx
import { atom } from 'jotai';

// 로그인 상태
export const emailAtom = atom('');
export const passwordAtom = atom('');

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
export const selectedPanelCountAtom = atom(0);
export const loadedPanelCountAtom = atom(0);
export const selectedPanelsAtom = atom(new Set());

///////////////////////////////////////////////////////////////////////////

export const TOTAL_PANEL_COUNT = atom(0);
export const SELECTED_PANEL_COUNT = atom(0);

// 상세 옵션 적용 전 패널 리스트
export const PANEL_LIST = atom([]);

// 싱세 옵션 적용 후 패널 리스트, 실제로 보여지는 패널 리스트
export const FILTERED_PANEL_LIST = atom([]);

// 검색어 상태
export const SEARCH_KEYWORD = atom("");
export const SEARCH_TIME = atom("");
export const SEARCH_GENDER = atom("");
export const SEARCH_AGE = atom("");
export const SEARCH_MARRIAGE = atom("");
export const SEARCH_CHILD = atom("");
export const SEARCH_CONSUMPTION = atom("");
export const SEARCH_TECHNOLOGY = atom("");