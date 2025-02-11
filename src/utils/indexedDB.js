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
) => {
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // // console.log("token", token);

      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      if (!conversationId) {
        throw new Error("대화 ID가 필요합니다.");
      }
      // // console.log("saveConversationToIndexedDB");
      // // console.log(conversation);
      // 서버에 업데이트 요청을 보냄 (PUT 메서드 사용)
      const PUT_DATA = {
        id: conversationId,
        chat_input: conversation.inputBusinessInfo,
        business_info: conversation.inputBusinessInfo,
        // chat_title: conversation.analysisReportData.title,
        chat_date: conversation.timestamp,
        chat_data: conversation,
        expert_index: expertIndex,
      };
      // // console.log("🚀 ~ PUT_DATA:", PUT_DATA);
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
  } else {
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
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `https://wishresearch.kr/panels/chat/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // // console.log("response");

      // // console.log(response);
      // setSelectedConversation(response.data); // 선택된 대화 내용 저장

      // // console.log(
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

export const createChatOnServer = async () => {
  try {
    const token = sessionStorage.getItem("accessToken"); // 세션에서 액세스 토큰 가져오기
    // // console.log("token");
    // // console.log(token);
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/panels/create_chat",
      {}, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
          "Content-Type": "application/json",
        },
        withCredentials: true, // 쿠키와 자격 증명 포함 (필요 시)
      }
    );

    // // console.log(response.data.inserted_id);
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
      // // console.log("token");
      // // console.log(token);
      if (!token) {
        throw new Error("액세스 토큰이 존재하지 않습니다.");
      }

      const PUT_DATA = {
        createDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
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

      // // console.log(response.data.inserted_id);
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
  // // console.log("🚀 ~ projectId:", projectId);
  // // console.log("🚀 ~ updateData:", updateData);
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // // console.log("token", token);

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
  // // console.log("🚀 ~ getProjectByIdFromIndexedDB ~ projectId:", projectId);

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
export const createProjectReportOnServer = async () => {
  try {
    const token = sessionStorage.getItem("accessToken"); // 세션에서 액세스 토큰 가져오기
    // // console.log("token");
    // // console.log(token);
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.post(
      "https://wishresearch.kr/project/report/create",
      {}, // POST 요청에 보낼 데이터가 없는 경우 빈 객체 전달
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
          "Content-Type": "application/json",
        },
        withCredentials: true, // 쿠키와 자격 증명 포함 (필요 시)
      }
    );

    // // console.log(response.data.inserted_id);
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
  // // console.log("🚀 ~ reportId:", reportId);
  // // console.log("🚀 ~ updateData:", updateData);
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // // console.log("token", token);

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
  // // console.log("🚀 ~ reportId:", reportId);

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
      // // console.log("🚀 ~ response:", response);

      return response.data;
    } catch (error) {
      console.error("Error fetching conversation from server:", error);
      return null;
    }
  }
};

// AI Person 요청 업데이트 api
export const createRequestPersonOnServer = async (updateData, isLoggedIn) => {
  // // console.log("🚀 ~ updateData:", updateData);
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // // console.log("token", token);

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

      // // console.log(response.data.inserted_id);
      return response.data.inserted_id; // 서버로부터 가져온 conversationId 반환
    } catch (error) {
      console.error("Error creating chat on server:", error);
      throw error;
    }
  }
};

// AI Persona 요청 업데이트 api
export const createRequestPersonaOnServer = async (updateData, isLoggedIn) => {
  // // console.log("🚀 ~ updateData:", updateData);
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에 저장
    try {
      const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
      // // console.log("token", token);

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

      // // console.log(response.data.inserted_id);
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

    while (true) {
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
        if (response.data.state !== 0) {
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
export const MarketingCustomerRecommendationRequest = async (data) => { // isLoggedIn 제거
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
export const MarketingResearchReportRequest = async (data) => { // isLoggedIn 제거
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
export const MarketingBmReportRequest = async (data) => { // isLoggedIn 제거
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
export const MarketingFinalReportRequest = async (data) => { // isLoggedIn 제거
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
export const MarketingMbtiResultRequest = async (data) => { // isLoggedIn 제거
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
  export const AlarmCreate= async (data,isLoggedIn) => {
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
      "https://wishresearch.kr/api/user/myPage/alarmCreate",
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

    console.error("알림 기능 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;

  }
};