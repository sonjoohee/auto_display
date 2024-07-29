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
