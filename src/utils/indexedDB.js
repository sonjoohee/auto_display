import axios from "axios";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../pages/AtomStates"; // AtomStates 파일에서 isLoggedInAtom 임포트
const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인

export const fetchDataById = async (id) => {
  try {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/data/${id}`; // 숫자에 해당하는 데이터 가져오기
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from server:", error);
    throw error;
  }
};

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MyAppDB", 2); // 버전이 1인지 확인

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 오브젝트 스토어가 없으면 생성
      if (!db.objectStoreNames.contains("conversations")) {
        db.createObjectStore("conversations", {
          keyPath: "id",
          autoIncrement: false,
        });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject("IndexedDB Error: " + event.target.errorCode);
    };
  });
};

export const saveConversationToIndexedDB = async (conversation, isLoggedIn, conversationId) => {
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem('accessToken'); // 액세스 토큰을 세션에서 가져오기
      console.log("token", token);

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      if (!conversationId) {
        throw new Error("대화 ID가 필요합니다.");
      }
      console.log("conversation")
      console.log(conversation)

      // 서버에 업데이트 요청을 보냄 (PUT 메서드 사용)
      await axios.put(
        `https://wishresearch.kr/panels/update_chat`,
        conversation,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            'Content-Type': 'application/json'
          },
          withCredentials: true // 쿠키와 함께 자격 증명을 전달 (optional)
        }
      );
    } catch (error) {
      console.error("Error updating conversation on server:", error);
    }
  } else {
    console.log("비로그인상태")

    // 비로그인 시 IndexedDB에 저장
    const db = await openDB();
    const transaction = db.transaction("conversations", "readwrite");
    const store = transaction.objectStore("conversations");
    return new Promise((resolve, reject) => {
      const request = store.put(conversation);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () =>
        reject("Failed to save conversation to IndexedDB");
    });
  }
};



export const getConversationByIdFromIndexedDB = async (id, isLoggedIn) => {
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에서 데이터 가져오기
    try {
      const response = await axios.put(
        `https://wishresearch.kr/panels/chat_list`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching conversation from server:", error);
      return null;
    }
  } else {
    // 비로그인 시 IndexedDB에서 데이터 가져오기
    const db = await openDB();
    const transaction = db.transaction("conversations", "readonly");
    const store = transaction.objectStore("conversations");
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () =>
        reject("Failed to fetch conversation from IndexedDB");
    });
  }
};

export const getAllConversationsFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction("conversations", "readonly");
  const store = transaction.objectStore("conversations");
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject("Failed to fetch conversations from IndexedDB");
  });
};

export const saveRecordToIndexedDB = async (record) => {
  const db = await openDB();
  const transaction = db.transaction("records", "readwrite");
  const store = transaction.objectStore("records");
  return new Promise((resolve, reject) => {
    const request = store.add(record);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to save record to IndexedDB");
  });
};

export const getAllRecordsFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction("records", "readonly");
  const store = transaction.objectStore("records");
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to fetch records from IndexedDB");
  });
};

export const createChatOnServer = async () => {
  try {
    const token = sessionStorage.getItem('accessToken'); // 세션에서 액세스 토큰 가져오기
    console.log("token")
    console.log(token)
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/create_chat",
      {}, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
          'Content-Type': 'application/json'
        },
        withCredentials: true // 쿠키와 자격 증명 포함 (필요 시)
      }
    );

    console.log(response.data.inserted_id)
    return response.data.inserted_id; // 서버로부터 가져온 conversationId 반환
  } catch (error) {
    console.error("Error creating chat on server:", error);
    throw error;
  }
};

