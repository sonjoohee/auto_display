import axios from "axios";
import { useAtom } from "jotai";
import { IS_LOGGED_IN, SELECTED_EXPERT_INDEX } from "../pages/AtomStates"; // AtomStates 파일에서 IS_LOGGED_IN 임포트

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

export const saveConversationToIndexedDB = async (
  conversation,
  isLoggedIn,
  conversationId,
  expertIndex
  // saveData,
  // conversationId,
) => {
  // if (isLoggedIn) {
  // 사용자 로그인 시 서버에 저장
  try {
    const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
    // console.log("token", token);

    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    if (!conversationId) {
      throw new Error("대화 ID가 필요합니다.");
    }
    // console.log("saveConversationToIndexedDB");
    // console.log(conversation);
    // 서버에 업데이트 요청을 보냄 (PUT 메서드 사용)
    const PUT_DATA = {
      id: conversationId,
      chat_input: conversation.inputBusinessInfo,
      business_info: conversation.inputBusinessInfo,
      // chat_title: conversation.analysisReportData.title,
      chat_date: conversation.timestamp,
      chat_data: conversation,
      expert_index: expertIndex,
      timestamp: conversation.timestamp,
    };
    // const PUT_DATA = {
    //   id: conversationId,
    //   ...saveData.data,
    //   chat_date: Date.now(),
    // };
    // console.log("🚀 ~ PUT_DATA:", PUT_DATA);
    await axios.put(`https://wishresearch.kr/panels/update_chat`, PUT_DATA, {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
        "Content-Type": "application/json",
      },
      withCredentials: true, // 쿠키와 함께 자격 증명을 전달 (optional)
    });
  } catch (error) {
    console.error("Error updating conversation on server:", error);
  }
  // } else {
  //   // 비로그인 시 IndexedDB에 저장
  //   const db = await openDB();
  //   const transaction = db.transaction("conversations", "readwrite");
  //   const store = transaction.objectStore("conversations");
  //   return new Promise((resolve, reject) => {
  //     const request = store.put(saveData);
  //     request.onsuccess = () => resolve(request.result);
  //     request.onerror = () =>
  //       reject("Failed to save conversation to IndexedDB");
  //   });
  // }
};

export const getConversationByIdFromIndexedDB = async (id, isLoggedIn) => {
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에서 데이터 가져오기
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `https://wishresearch.kr/panels/chat/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log("response");

      // console.log(response);
      // setSelectedConversation(response.data); // 선택된 대화 내용 저장

      // console.log(
      //   "🚀 ~ getConversationByIdFromIndexedDB ~ response.data.chat_data:",
      //   response.data.chat_data
      // );

      return response.data.chat_data;

      // const response = await axios.get(
      //   `https://wishresearch.kr/panels/chat_list`
      // );
      // return response.data;
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

export const createChatOnServer = async (projectId) => {
  console.log("🚀 ~ createChatOnServer ~ projectId:", projectId);
  try {
    const token = sessionStorage.getItem("accessToken"); // 세션에서 액세스 토큰 가져오기
    // console.log("token");
    // console.log(token);
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      projectId: projectId,
      timestamp: Date.now(),
      toolType: "chat",
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/create_chat",
      PUT_DATA, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
          "Content-Type": "application/json",
        },
        withCredentials: true, // 쿠키와 자격 증명 포함 (필요 시)
      }
    );

    // console.log(response.data.inserted_id);
    return response.data.inserted_id; // 서버로부터 가져온 conversationId 반환
  } catch (error) {
    console.error("Error creating chat on server:", error);
    throw error;
  }
};

//==============================================
//페르소나 api
//==============================================

//프로젝트 관련 api

//프로젝트 생성 api
export const createProjectOnServer = async (isLoggedIn) => {
  if (isLoggedIn) {
    try {
      const token = sessionStorage.getItem("accessToken"); // 세션에서 액세스 토큰 가져오기

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      const PUT_DATA = {
        createDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
      const response = await axios.post(
        "https://wishresearch.kr/project/create",
        PUT_DATA, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키와 자격 증명 포함 (필요 시)
        }
      );

      // console.log(response.data.inserted_id);
      return response.data.inserted_id; // 서버로부터 가져온 conversationId 반환
    } catch (error) {
      console.error("Error creating chat on server:", error);
      throw error;
    }
  }
};

//프로젝트 업데이트 api
export const updateProjectOnServer = async (
  projectId,
  updateData,
  isLoggedIn
) => {
  // console.log("🚀 ~ projectId:", projectId);
  // console.log("🚀 ~ updateData:", updateData);
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // console.log("token", token);

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      if (!projectId) {
        throw new Error("프로젝트 ID가 필요합니다.");
      }
      const PUT_DATA = {
        id: projectId,
        ...updateData,
        updateDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
      await axios.put(`https://wishresearch.kr/project/update`, PUT_DATA, {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
          "Content-Type": "application/json",
        },
        withCredentials: true, // 쿠키와 함께 자격 증명을 전달 (optional)
      });
    } catch (error) {
      console.error("Error updating project on server:", error);
    }
  }
};

//프로젝트 조회 api
export const getProjectByIdFromIndexedDB = async (
  projectId,
  projectLoadButtonState
) => {
  //두개 매개변수 받음
  // console.log("🚀 ~ getProjectByIdFromIndexedDB ~ projectId:", projectId);

  if (projectLoadButtonState) {
    // 사용자 로그인 시 서버에서 데이터 가져오기
    try {
      //요청이 유효한 사용자인지 확인
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `https://wishresearch.kr/project/find/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching project from server:", error);
      return null;
    }
  }
};

//프로젝트 리스트 조회 api
export const getProjectListByIdFromIndexedDB = async (isLoggedIn) => {
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에서 데이터 가져오기
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(`https://wishresearch.kr/project/list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching project list from server:", error);
      return null;
    }
  }
};

//보고서 관련 api

//보고서 생성 api
export const createProjectReportOnServer = async (projectId, interviewType) => {
  try {
    const token = sessionStorage.getItem("accessToken"); // 세션에서 액세스 토큰 가져오기
    // console.log("token");
    // console.log(token);
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      projectId: projectId,
      createDate: new Date().toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      timestamp: Date.now(),
      toolType: interviewType,
    };
    const response = await axios.post(
      "https://wishresearch.kr/project/report/create",
      PUT_DATA, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
          "Content-Type": "application/json",
        },
        withCredentials: true, // 쿠키와 자격 증명 포함 (필요 시)
      }
    );

    // console.log(response.data.inserted_id);
    return response.data.inserted_id; // 서버로부터 가져온 conversationId 반환
  } catch (error) {
    console.error("Error creating chat on server:", error);
    throw error;
  }
};

// 보고서 업데이트 api
export const updateProjectReportOnServer = async (
  reportId,
  updateData,
  isLoggedIn
) => {
  // console.log("🚀 ~ reportId:", reportId);
  // console.log("🚀 ~ updateData:", updateData);
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // console.log("token", token);

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      if (!reportId) {
        throw new Error("프로젝트 보고서 ID가 필요합니다.");
      }
      const PUT_DATA = {
        id: reportId,
        ...updateData,
        createDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
      await axios.put(
        `https://wishresearch.kr/project/report/update`,
        PUT_DATA,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키와 함께 자격 증명을 전달 (optional)
        }
      );
    } catch (error) {
      console.error("Error updating project on server:", error);
    }
  }
};

// 보고서 조회 api
export const getProjectReportByIdFromIndexedDB = async (
  reportId,
  reportLoadButtonState
) => {
  // console.log("🚀 ~ reportId:", reportId);

  if (reportLoadButtonState) {
    // 사용자 로그인 시 서버에서 데이터 가져오기
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `https://wishresearch.kr/project/report/find/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log("🚀 ~ response:", response);

      return response.data;
    } catch (error) {
      console.error("Error fetching conversation from server:", error);
      return null;
    }
  }
};

// AI Person 요청 업데이트 api
export const createRequestPersonOnServer = async (updateData, isLoggedIn) => {
  // console.log("🚀 ~ updateData:", updateData);
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // console.log("token", token);

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      const PUT_DATA = {
        ...updateData,
      };

      const response = await axios.post(
        "https://wishresearch.kr/project/request/person",
        PUT_DATA, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키와 자격 증명 포함 (필요 시)
        }
      );

      // console.log(response.data.inserted_id);
      return response.data.inserted_id; // 서버로부터 가져온 conversationId 반환
    } catch (error) {
      console.error("Error creating chat on server:", error);
      throw error;
    }
  }
};

// AI Persona 요청 업데이트 api
export const createRequestPersonaOnServer = async (updateData, isLoggedIn) => {
  // console.log("🚀 ~ updateData:", updateData);
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // console.log("token", token);

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      const PUT_DATA = {
        ...updateData,
      };

      const response = await axios.post(
        "https://wishresearch.kr/project/request/persona",
        PUT_DATA, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키와 자격 증명 포함 (필요 시)
        }
      );

      // console.log(response.data.inserted_id);
      return response.data.inserted_id; // 서버로부터 가져온 conversationId 반환
    } catch (error) {
      console.error("Error creating chat on server:", error);
      throw error;
    }
  }
};

//+++++++++++++++++++++++++++++++++++++++++
// interviewx 1.2 api

//페르소나 필터 api
export const InterviewXInterviewReportPersonaFilter = async (
  data,
  isLoggedIn
) => {
  // console.log("페르소나 필터 시작 - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      `https://wishresearch.kr/project/temporary/personaFilter`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("페르소나 필터 처리 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//비즈니스 페르소나 요청 api
export const InterviewXPersonaRequestType = async (data, isLoggedIn) => {
  // console.log("비즈니스 페르소나 요청 시작 - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      `https://wishresearch.kr/project/temporary/personaRequestType`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("비즈니스 페르소나 요청 처리 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//1:1 인터뷰 방법론 별 질문 요청 api
export const InterviewXPersonaSingleInterviewGeneratorRequest = async (
  data,
  isLoggedIn
) => {
  // console.log("1:1 인터뷰 방법론 별 질문 요청 시작  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      `https://wishresearch.kr/project/temporary/personaSingleInterview`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("1:1 인터뷰 방법론 별 질문 요청 처리 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//1:1 인터뷰 커스텀 방법론 생성
export const InterviewXPersonaSingleInterviewTheoryCustom = async (
  data,
  isLoggedIn
) => {
  // console.log(
  //   "1:1 인터뷰 커스텀 방법론 생성 문 요청 시작  - 입력 데이터:",
  //   data
  // );
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      `https://wishresearch.kr/project/temporary/personaSingleCustomInterview`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("1:1 인터뷰 방법론 별 질문 요청 처리 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//1:1 인터뷰 커스텀 방법론 질문 생성
export const InterviewXPersonaSingleInterviewGeneratorRequestTheoryCustom =
  async (data, isLoggedIn) => {
    // console.log(
    //   "1:1 인터뷰 커스텀 방법론 질문 생성 요청 시작  - 입력 데이터:",
    //   data
    // );
    if (!isLoggedIn) {
      console.error("로그인이 필요합니다.");
      return null;
    }

    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      const response = await axios.post(
        `https://wishresearch.kr/project/temporary/personaSingleCustomQuestionInterview`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (!response.data?.time || !response.data?.objectId) {
        return response.data;
      }

      await new Promise((resolve) => setTimeout(resolve, response.data.time));

      const result = await getTermkeyResult(response.data.objectId);
      return result;
    } catch (error) {
      console.error(
        "1:1 인터뷰 커스텀 방법론 질문 생성 처리 중 오류 발생:",
        error
      );
      console.error("오류 상세:", error.response?.data || error.message);
      throw error;
    }
  };

// termkey를 이용한 결과 조회 API
export const getTermkeyResult = async (termkey) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("인증 토큰이 없습니다. 로그인이 필요합니다.");
    }

    let attempts = 0;

    while (true) {
      if (attempts > 20) throw new Error("시도 횟수가 초과되었습니다.");
      try {
        const response = await axios.get(
          `https://wishresearch.kr/project/temporary/findTemp/${termkey}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (!response?.data) {
          throw new Error("응답 데이터가 없습니다.");
        }

        // state가 0이 아닐 때 (처리가 완료되었을 때) 즉시 결과 반환
        if (response.data.state == 1) {
          // console.log("처리 완료, 결과 반환");
          return response.data;
        }

        const randomDelay = Math.floor(
          Math.random() * (5000 - 3000 + 1) + 3000
        ); // 3000ms(3초)에서 5000ms(5초) 사이의 랜덤한 시간
        await new Promise((resolve) => setTimeout(resolve, randomDelay));
      } catch (error) {
        console.error("결과 조회 중 오류 발생:", error);
        throw error;
      }

      attempts++;
    }
  } catch (error) {
    console.error("termkey를 이용한 결과 조회 중 오류:", error);
    throw error;
  }
};

//1:N 인터뷰 질문 생성
export const InterviewXPersonaMultipleInterviewGeneratorRequest = async (
  data,
  isLoggedIn
) => {
  // console.log("1:N 인터뷰 방법론 질문 생성 요청 시작  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/persona_multiple_interview_generator",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error(
      "1:1 인터뷰 커스텀 방법론 질문 생성 처리 중 오류 발생:",
      error
    );
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//1:N 인터뷰
export const InterviewXPersonaMultipleInterviewRequest = async (
  data,
  isLoggedIn
) => {
  // console.log("1:N 인터뷰 방법론 질문 생성 요청 시작  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/persona_multiple_interview_module",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
    // return response.data;
  } catch (error) {
    console.error(
      "1:1 인터뷰 커스텀 방법론 질문 생성 처리 중 오류 발생:",
      error
    );
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//1:1 인터뷰
export const InterviewXPersonaSingleInterviewRequest = async (
  data,
  isLoggedIn
) => {
  // console.log("1:1 인터뷰 방법론 질문 생성 요청 시작  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/persona_single_interview_module",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
    // return response.data;
  } catch (error) {
    console.error(
      "1:1 인터뷰 커스텀 방법론 질문 생성 처리 중 오류 발생:",
      error
    );
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//1:1 인터뷰 추가질문 생성
export const InterviewXPersonaSingleInterviewRequestAddQuestion = async (
  data,
  isLoggedIn
) => {
  // console.log("1:1 인터뷰 방법론 질문 생성 요청 시작  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/persona_single_interview_additional_generator",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
    // return response.data;
  } catch (error) {
    console.error(
      "1:1 인터뷰 커스텀 방법론 질문 생성 처리 중 오류 발생:",
      error
    );
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//1:1 인터뷰 결과보고서 탭1
export const InterviewXPersonaSingleInterviewReportTab1 = async (
  data,
  isLoggedIn
) => {
  // console.log("1:1 인터뷰 결과 보고서 탭1 요청 시작  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/persona_single_interview_reoport_tab1",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
    // return response.data;
  } catch (error) {
    console.error("1:1 인터뷰 결과보고서 탭1 생성 처리 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//1:1 인터뷰 결과보고서 탭2
export const InterviewXPersonaSingleInterviewReportTab2 = async (
  data,
  isLoggedIn
) => {
  // console.log("1:1 인터뷰 결과 보고서 탭2 요청 시작  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/persona_single_interview_reoport_tab2",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
    // return response.data;
  } catch (error) {
    console.error("1:1 인터뷰 결과보고서 탭2 생성 처리 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//1:1 인터뷰 결과보고서 탭3
export const InterviewXPersonaSingleInterviewReportTab3 = async (
  data,
  isLoggedIn
) => {
  // console.log("1:1 인터뷰 결과 보고서 탭3 요청 시작  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/persona_single_interview_reoport_tab3",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
    // return response.data;
  } catch (error) {
    console.error("1:1 인터뷰 결과보고서 탭3 생성 처리 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// 크레딧 조회
export const CreditInfo = async (isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.get(
      "https://wishresearch.kr/api/user/credit/state",

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("크레딧 정보 조회 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// 유저 크레딧 조회
export const UserCreditInfo = async (isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.get(
      "https://wishresearch.kr/api/user/userInfo/",

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.state === "Fail"
    ) {
      return error.response.data;
    }

    console.error("유저 크레딧 정보 조회 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// 크레딧 사용전 사용 확인
export const UserCreditCheck = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/api/user/credit/check",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.state === "Fail"
    ) {
      return error.response.data;
    }

    console.error("유저 크레딧 정보 조회 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// 크레딧 사용
export const UserCreditUse = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/api/user/credit/use",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.state === "Fail"
    ) {
      return error.response.data;
    }

    console.error("유저 크레딧 정보 조회 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// interviewx 1.1 api 수정 250131
// 비즈니스 카테고리 분석 250131
export const BusinessCategoryAnalysis = async (data, isLoggedIn) => {
  // console.log("비즈니스 카테고리 분석  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/business_category",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
    // return response.data;
  } catch (error) {
    console.error("비즈니스 카테고리 분석 처리 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// interviewx 1.1 api 수정 250131
// 페르소나 인터뷰 생성 API 250131
export const InterviewXPersonaInterviewModeratorRequest = async (
  data,
  isLoggedIn
) => {
  // console.log("페르소나 인터뷰 생성 API  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/persona_interview",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
    // return response.data;
  } catch (error) {
    console.error("페르소나 인터뷰 생성 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// interviewx 1.1 api 수정 250131
// 페르소나 인터뷰 수행(단건) API 250131
export const InterviewXPersonaBusinessInterviewModuleRequest = async (
  data,
  isLoggedIn
) => {
  // console.log("페르소나 인터뷰 수행(단건) API  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/persona_interview_module",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
    // return response.data;
  } catch (error) {
    console.error("페르소나 인터뷰 수행(단건) API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// interviewx 1.1 api 수정 250131
// 페르소나 요청 API 250131
export const InterviewXPersonaRequestRequest = async (data, isLoggedIn) => {
  // console.log("페르소나 요청 API  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/persona_request",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("페르소나 요청 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// interviewx 1.1 api 수정 250131
// 인터뷰 결과 보고서 요청 API 250131
export const InterviewXInterviewReportRequest = async (data, isLoggedIn) => {
  // console.log("인터뷰 결과 보고서 요청 API  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/interview_reports",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("인터뷰 결과 보고서 요청 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// interviewx 1.1 api 수정 250131
//비즈니스 카테고리 분석 수정 API 250131
export const InterviewXBusinessCategoryModifyRequest = async (
  data,
  isLoggedIn
) => {
  // console.log("비즈니스 카테고리 분석 수정 API  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/business_category_modify",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("비즈니스 카테고리 분석 수정 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// interviewx 1.1 api 수정 250131
//인터뷰 결과 추가 보고서 요청 수정 API 250131
export const InterviewXInterviewReportAdditionalRequest = async (
  data,
  isLoggedIn
) => {
  // console.log("인터뷰 결과 추가 보고서 요청 API  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/interview_report_additional",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("인터뷰 결과 추가 보고서 요청 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//인뎁스 인터뷰 질문 생성 요청 API
export const InterviewXPersonaSingleIndepthInterviewGeneratorRequest = async (
  data,
  isLoggedIn
) => {
  // console.log("인뎁스 인터뷰 질문 생성 요청 API  - 입력 데이터:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/project/temporary/personaSingleIndepthInterviewGenerator",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("인뎁스 인터뷰 질문 생성 요청 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//마케팅 고객 추천 요청 API
export const MarketingCustomerRecommendationRequest = async (data) => {
  // isLoggedIn 제거
  // console.log(" 마케팅 고객 추천 요청 API  - 입력 데이터:", data);
  // 로그인 체크 제거
  // if (!isLoggedIn) {
  //   console.error("로그인이 필요합니다.");
  //   return null;
  // }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/marketing/temporary/customer_recommendation",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("마케팅 고객 추천 요청 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//마케팅 연구 보고서 요청 API
export const MarketingResearchReportRequest = async (data) => {
  // isLoggedIn 제거
  // console.log(" 마케팅 연구 보고서 요청 API  - 입력 데이터:", data);
  // 로그인 체크 제거
  // if (!isLoggedIn) {
  //   console.error("로그인이 필요합니다.");
  //   return null;
  // }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/marketing/temporary/research_report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("마케팅 연구 보고서 요청 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//마케팅 비즈니스 모델 보고서 요청 API
export const MarketingBmReportRequest = async (data) => {
  // isLoggedIn 제거
  // console.log(" 마케팅 비즈니스 모델 보고서 요청 API  - 입력 데이터:", data);
  // 로그인 체크 제거
  // if (!isLoggedIn) {
  //   console.error("로그인이 필요합니다.");
  //   return null;
  // }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/marketing/temporary/bm_report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("마케팅 비즈니스 모델 보고서 요청 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//마케팅 최종 보고서 요청 API
export const MarketingFinalReportRequest = async (data) => {
  // isLoggedIn 제거
  // console.log(" 마케팅 최종 보고서 요청 API  - 입력 데이터:", data);
  // 로그인 체크 제거
  // if (!isLoggedIn) {
  //   console.error("로그인이 필요합니다.");
  //   return null;
  // }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/marketing/temporary/final_report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("마케팅 최종 보고서 요청 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//마케팅 MBTI 결과 요청 API
export const MarketingMbtiResultRequest = async (data) => {
  // isLoggedIn 제거
  // console.log(" 마케팅 MBTI 결과 요청 API  - 입력 데이터:", data);
  // 로그인 체크 제거
  // if (!isLoggedIn) {
  //   console.error("로그인이 필요합니다.");
  //   return null;
  // }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/marketing/temporary/mbti_result",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("마케팅 MBTI 결과 요청 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// 알림 기능
export const AlarmList = async (isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.get(
      "https://wishresearch.kr/api/user/alarm/alarmList",

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }

    console.error("알림 기능 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// !===============================================
// !TOOL 관련 API
// !===============================================

//TOOL 생성 api
export const createToolOnServer = async (data, isLoggedIn) => {
  console.log("🚀 ~ createToolOnServer ~ data:", data);
  if (isLoggedIn) {
    try {
      const token = sessionStorage.getItem("accessToken"); // 세션에서 액세스 토큰 가져오기

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      const PUT_DATA = {
        createDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        updateDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        timestamp: Date.now(),
        ...data,
        toolType: "tool",
      };
      const response = await axios.post(
        "https://wishresearch.kr/panels/tool/create_tool",
        PUT_DATA, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키와 자격 증명 포함 (필요 시)
        }
      );

      // console.log(response.data.inserted_id);
      return response.data.inserted_id; // 서버로부터 가져온 conversationId 반환
    } catch (error) {
      console.error("Error creating chat on server:", error);
      throw error;
    }
  }
};

//TOOL 업데이트 api
export const updateToolOnServer = async (toolId, updateData, isLoggedIn) => {
  // console.log("🚀 ~ projectId:", projectId);
  // console.log("🚀 ~ updateData:", updateData);
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // console.log("token", token);

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      if (!toolId) {
        throw new Error("TOOL ID가 필요합니다.");
      }
      const PUT_DATA = {
        id: toolId,
        ...updateData,
        updateDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        timestamp: Date.now(),
      };
      await axios.put(
        `https://wishresearch.kr/panels/tool/update_tool`,
        PUT_DATA,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키와 함께 자격 증명을 전달 (optional)
        }
      );
    } catch (error) {
      console.error("Error updating project on server:", error);
    }
  }
};

// TOOL 단건 조회
export const getToolOnServer = async (toolId, isLoggedIn) => {
  if (isLoggedIn) {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `https://wishresearch.kr/panels/tool/tool_detail/${toolId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tool from server:", error);
      throw error;
    }
  }
};

// TOOL 리스트 조회
export const getToolListOnServer = async (size, page, isLoggedIn) => {
  if (isLoggedIn) {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `https://wishresearch.kr/panels/tool/tool_list?size=${size}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tool from server:", error);
      throw error;
    }
  }
};

//타겟 탐색기 페르소나 찾기
export const InterviewXTargetDiscoveryPersonaRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_target_discovery_persona",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error("타겟 탐색기 페르소나 찾기 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//타겟 탐색기 페르소나 시나리오
export const InterviewXTargetDiscoveryScenarioRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const PUT_DATA = {
      type: "ix_target_discovery_scenario",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("타겟 탐색기 페르소나 시나리오 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

//타겟 탐색기 최종 보고서
export const InterviewXTargetDiscoveryFinalReportRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const PUT_DATA = {
      type: "ix_target_discovery_final_report",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);
    return result;
  } catch (error) {
    console.error("타겟 탐색기 최종 보고서 API 중 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// 고객 핵심 가치 분석기 페르소나 찾기
export const InterviewXCustomerValueAnalyzerPersonaRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_customer_value_persona",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 고객 핵심 가치 분석기 저니맵
export const InterviewXCustomerValueAnalyzerJourneyMapRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_customer_value_journey_map",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 고객 핵심 가치 분석기 팩터
export const InterviewXCustomerValueAnalyzerFactorRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_customer_value_factor",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 고객 핵심 가치 분석기 클러스터링
export const InterviewXCustomerValueAnalyzerClusteringRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_customer_value_clustering",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 고객 핵심 가치 분석기 포지셔닝
export const InterviewXCustomerValueAnalyzerPositioningRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_customer_value_positioning",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 고객 핵심 가치 분석기 최종 보고서
export const InterviewXCustomerValueAnalyzerFinalReportRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_customer_value_final_report",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 아이디어 생성기 페르소나
export const InterviewXIdeaGeneratorPersonaRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_idea_generator_persona",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 아이디어 생성기 아이디어
export const InterviewXIdeaGeneratorIdeaRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_idea_generator_idea",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 아이디어 생성기 클러스터링
export const InterviewXIdeaGeneratorClusteringRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_idea_generator_clustering",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 아이디어 생성기 최종 보고서
export const InterviewXIdeaGeneratorFinalReportRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_idea_generator_final_report",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//디자인 감성 분석기 : analysis
export const InterviewXDesignEmotionAnalysisRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", data.image); // File 객체 추가
    formData.append("business", data.business); // 다른 데이터 추가
    formData.append("tool_id", data.tool_id); // 다른 데이터 추가
    formData.append("type", "ix_design_emotion_analysis"); // 다른 데이터 추가

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp_file",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//디자인 감성 분석기 : target
export const InterviewXDesignEmotionTargetRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_design_emotion_target",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//디자인 감성 분석기 : scale
export const InterviewXDesignEmotionScaleRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const PUT_DATA = {
      type: "ix_design_emotion_scale",
      ...data,
    };
    const response = await axios.post(
      "https://wishresearch.kr/panels/tool/create_tool_temp",
      PUT_DATA,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// !===============================================
// !전문가 관련 API
// !===============================================

//비즈니스 분석
export const InterviewXBusinessAnalysisRequest = async (data, isLoggedIn) => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/business_category",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//새로운 정보 추가
export const InterviewXBusinessAnalysisModifyRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }
    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/business_category_modify",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//추가 질문 생성
export const InterviewXAdditionalQuestionRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/add_question",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//입력 추가 질문
export const InterviewXCustomerAdditionalQuestionRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/person/temporary/customer_add_question",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//시장 기회 탐색
export const InterviewXExpertReportRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/expert",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//시장 가격 분석
export const InterviewXPriceScrapReportRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/price_scrap",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//시장 가격 분석
export const InterviewXPriceAnalysisReportRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/price_analysis",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//bm생성
export const InterviewXBmCheckStageRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/bm_stage_report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//비즈니스 모델 캔버스 생성
export const InterviewXBmBmAutoReportRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/bm_auto_report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//bm 세분화 질문 생성
export const InterviewXBmBmAdsReportRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/bm_ads_report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// bm 세분화
export const InterviewXBmBmCustomReportRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/bm_custom_report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//린 캔버스 생성
export const InterviewXBmLeanAutoReportRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/lean_auto_report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//린 세분화 질문 생성
export const InterviewXBmLeanAdsReportRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/lean_ads_report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
//린 세분화
export const InterviewXBmLeanCustomReportRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/lean_custom_report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//그로스해커 아이템 진단
export const InterviewXIdeaGrowthHackerReportRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/growth_hacker",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//디테일 리포트
export const InterviewXIdeaGrowthHackerdetail_reportRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/experts/growth_hacker_detail",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// !===============================================
// !interviewX SaaS
// !===============================================

//프로젝트 생성 api saas
export const createProjectOnServerSaas = async (data, isLoggedIn) => {
  if (isLoggedIn) {
    try {
      const token = sessionStorage.getItem("accessToken"); // 세션에서 액세스 토큰 가져오기

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      const PUT_DATA = {
        createDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        ...data,
        projectType: "saas",
        timestamp: Date.now(),
      };
      const response = await axios.post(
        "https://wishresearch.kr/project/create",
        PUT_DATA, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키와 자격 증명 포함 (필요 시)
        }
      );

      // console.log(response.data.inserted_id);
      return response.data.inserted_id; // 서버로부터 가져온 conversationId 반환
    } catch (error) {
      console.error("Error creating chat on server:", error);
      throw error;
    }
  }
};

//프로젝트 정보 생성
export const InterviewXProjectAnalysisMultimodalRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("project_name", data.project_name); // File 객체 추가
    formData.append("product_description", data.product_description); // 다른 데이터 추가
    formData.append("business_model", data.business_model); // 다른 데이터 추가
    formData.append("industry_type", data.industry_type); // 다른 데이터 추가
    formData.append("target_country", data.target_country); // 다른 데이터 추가
    formData.append("tool_id", data.tool_id); // 다른 데이터 추가 - 파일 이름값 timestamp
    data.files.forEach((file) => {
      formData.append("files", file);
    });

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/project/temporary/projectAnalysisMultimodal",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 파일 업로드 X, 건너뛰기
export const InterviewXProjectAnalysisRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/project/temporary/projectAnalysis",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//프로젝트 리스트 조회 api
export const getProjectListSaasByIdFromIndexedDB = async (isLoggedIn) => {
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에서 데이터 가져오기
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `https://wishresearch.kr/project/listSaas`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching project list from server:", error);
      return null;
    }
  }
};

// !===============================================
// !페르소나 관련
// !===============================================

//페르소나 DB 생성 api
export const createPersonaOnServer = async (data, isLoggedIn) => {
  console.log("🚀 ~ createPersonaOnServer ~ data:", data);
  if (isLoggedIn) {
    try {
      const token = sessionStorage.getItem("accessToken"); // 세션에서 액세스 토큰 가져오기

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      const PUT_DATA = {
        createDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        updateDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        timestamp: Date.now(),
        favorite: false,
        status: "default",
        ...data,
      };
      const response = await axios.post(
        "https://wishresearch.kr/project/persona/create",
        PUT_DATA, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키와 자격 증명 포함 (필요 시)
        }
      );

      // console.log(response.data.inserted_id);
      return response.data.inserted_id; // 서버로부터 가져온 conversationId 반환
    } catch (error) {
      console.error("Error creating chat on server:", error);
      throw error;
    }
  }
};

// 페르소나 업데이트 api
export const updatePersonaOnServer = async (updateData, isLoggedIn) => {
  console.log("🚀 ~ updatePersonaOnServer ~ updateData:", updateData);
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // console.log("token", token);

      const PUT_DATA = {
        // id: personaId,
        ...updateData,
        // updateDate: new Date().toLocaleString("ko-KR", {
        //   timeZone: "Asia/Seoul",
        //   year: "numeric",
        //   month: "2-digit",
        //   day: "2-digit",
        //   hour: "2-digit",
        //   minute: "2-digit",
        //   second: "2-digit",
        // }),
        // timestamp: Date.now(),
      };

      await axios.put(
        `https://wishresearch.kr/project/persona/update`,
        PUT_DATA,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키와 함께 자격 증명을 전달 (optional)
        }
      );
    } catch (error) {
      console.error("Error updating persona on server:", error);
    }
  }
};

//페르소나 단건조회 == 상세값.
export const getPersonaOnServer = async (personaId, isLoggedIn) => {
  if (isLoggedIn) {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `https://wishresearch.kr/project/persona/find/${personaId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching persona from server:", error);
      throw error;
    }
  }
};

// 페르소나 리스트
export const getPersonaListOnServer = async (projectId, isLoggedIn) => {
  if (isLoggedIn) {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `https://wishresearch.kr/project/persona/list/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching persona list from server:", error);
      throw error;
    }
  }
};

// 페르소나 삭제
export const deletePersonaOnServer = async (personaId, isLoggedIn) => {
  if (isLoggedIn) {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `https://wishresearch.kr/project/persona/delete/${personaId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting persona from server:", error);
      throw error;
    }
  }
};

//페르소나 기초정보 생성- Macro Segment
export const InterviewXPersonaMacroSegmentRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/project/temporary/personaMacroSegment",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//페르소나 기초정보 생성- Unique User
export const InterviewXPersonaUniqueUserRequest = async (data, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/project/temporary/personaUniqueUser",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 페르소나 기초정보 생성- Key Stakeholder
export const InterviewXPersonaKeyStakeholderRequest = async (
  data,
  isLoggedIn
) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/project/temporary/personaKeyStakeholder",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//페르소나 프로필정보 생성
export const InterviewXPersonaProfileRequest = async (data, isLoggedIn) => {
  console.log("🚀 ~ InterviewXPersonaProfileRequest ~ data:", data);
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/project/temporary/personaProfile",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (!response.data?.time || !response.data?.objectId) {
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, response.data.time));

    const result = await getTermkeyResult(response.data.objectId);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 툴 리스트
export const getToolListOnServerSaas = async (
  projectId,
  getCount,
  isLoggedIn
) => {
  // console.log("🚀 ~ projectId:", projectId);
  if (isLoggedIn) {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `https://wishresearch.kr/project/ToolActivities/${projectId}/${getCount}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching persona list from server:", error);
      throw error;
    }
  }
};

// 페르소나 리스트
export const getFindToolListOnServerSaas = async (
  projectId,
  getType,
  isLoggedIn
) => {
  console.log("🚀 ~ projectId:", projectId);
  if (isLoggedIn) {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `https://wishresearch.kr/project/findToolList/${projectId}/${getType}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching persona list from server:", error);
      throw error;
    }
  }
};
