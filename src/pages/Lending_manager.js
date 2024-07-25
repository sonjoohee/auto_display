import { atom } from "jotai";

// 조터이 사용시 디폴트 값은 필수입니다. 
// 추가로, 디폴트값 과 받는쪽 즉, 사용하는쪽의 타입이 일치해야 합니다. 특히 json일 경우 주의!! 
export const CURRENT_PERSONA_COUNT = atom(0);