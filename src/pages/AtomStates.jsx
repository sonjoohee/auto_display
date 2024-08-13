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
    // {
	//     "id": 1,
	//     "userIndex": null,
	//     "gender": "F",
	//     "age": "33",
	//     "job": "임시데이터",
	//     "address": "Chuncheon",
	//     "subAddress": null,
	//     "image": null,
	//     "comment": null,
	//     "lifeStyle": "Expresses creativity through art, passionate about work.",
	//     "tag": "#creative, #passionate, #individualistic",
	//     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
	//     "productGroup": "Art supplies, Laptop, Smartphone"
    // },
    // {
    //     "id": 2,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 3,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 4,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 5,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 6,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 7,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 8,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 9,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 10,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 11,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 12,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 13,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 14,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 15,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 16,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 17,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 18,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 19,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
    // {
    //     "id": 20,
    //     "userIndex": null,
    //     "gender": "F",
    //     "age": "33",
    //     "job": "임시데이터",
    //     "address": "Chuncheon",
    //     "subAddress": null,
    //     "image": null,
    //     "comment": null,
    //     "lifeStyle": "Expresses creativity through art, passionate about work.",
    //     "tag": "#creative, #passionate, #individualistic",
    //     "consumptionPropensity": "Moderate spender on art supplies and personal projects",
    //     "productGroup": "Art supplies, Laptop, Smartphone"    
    // },
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