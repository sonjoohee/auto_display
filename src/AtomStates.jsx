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





export const PANEL_LIST = atom([
    {
      id: 1,
      gender: "남성",
      age: 25,
      job: "대학생",
      lifeStyle: "의료서비스받기에 5시간이상 활용하고 있어요",
      consumption : "총동구매자",
      technology: "얼리어답터",
      selected: false,
    },
    {
      id: 2,
      gender: "여성",
      age: 32,
      job: "대학생",
      lifeStyle: "의료서비스받기에 5시간이상 활용하고 있어요",
      consumption : "총동구매자",
      technology: "얼리어답터",
      selected: false,
    },
    {
      id: 3,
      gender: "남성",
      age: 27,
      job: "대학생",
      consumption : "총동구매자",
      technology: "얼리어답터",
      lifeStyle: "의료서비스받기에 5시간이상 활용하고 있어요",
      selected: false,
    },
]);
export const FILTERED_PANEL_LIST = atom([]) 

export const SEARCH_KEYWORD = atom("");
export const SEARCH_TIME = atom("");

export const SEARCH_GENDER = atom("");
export const SEARCH_AGE = atom("");
export const SEARCH_MARRIAGE = atom("");
export const SEARCH_CHILD = atom("");
export const SEARCH_CONSUMPTION = atom("");
export const SEARCH_TECHNOLOGY = atom("");

