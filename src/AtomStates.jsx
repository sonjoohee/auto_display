import { atom } from 'jotai';

// 로그인 상태
export const emailAtom = atom('');
export const passwordAtom = atom('');

// 회원가입 상태
export const nameAtom = atom('');
export const signupEmailAtom = atom('');
export const signupPasswordAtom = atom('');

// 사용자 데이터 상태
export const usersAtom = atom([]); //db쓰면 필요없음
export const currentUserAtom = atom(null);
