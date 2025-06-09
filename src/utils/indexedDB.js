import axios from "axios";
import { useAtom } from "jotai";
import { IS_LOGGED_IN, SELECTED_EXPERT_INDEX } from "../pages/AtomStates"; // AtomStates 파일에서 IS_LOGGED_IN 임포트

const liveUrl = "https://wishresearch.kr";
const localUrl = "http://localhost:8000";

const serverUrl = liveUrl;


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

  try {
    const token = sessionStorage.getItem("accessToken"); // 액세스 토큰을 세션에서 가져오기
    // console.log("token", token);

    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    if (!conversationId) {
      throw new Error("대화 ID가 필요합니다.");
    }
   
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
   
    await axios.put(`${serverUrl}/panels/update_chat`, PUT_DATA, {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
        "Content-Type": "application/json",
      },
      withCredentials: true, // 쿠키와 함께 자격 증명을 전달 (optional)
    });
  } catch (error) {
    console.error("Error updating conversation on server:", error);
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
        `${serverUrl}/project/create`,
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
      await axios.put(`${serverUrl}/project/update`, PUT_DATA, {
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
        `${serverUrl}/project/find/${projectId}`,
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
      const response = await axios.get(`${serverUrl}/project/list`, {
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



// termkey를 이용한 결과 조회 API
export const getTermkeyResult = async (termkey, abortSignal) => {
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
          `${serverUrl}/project/temporary/findTemp/${termkey}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
            signal: abortSignal,
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
      `${serverUrl}/api/user/credit/state`,

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
      `${serverUrl}/api/user/userInfo/`,

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

// 유저 교육 상태 조회
export const UserEducationStateInfo = async (isLoggedIn) => {
  // if (!isLoggedIn) {
  //   console.error("로그인이 필요합니다.");
  //   return null;
  // }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.get(
      `${serverUrl}/api/user/userEducationInfo/`,

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

    console.error("유저 교육 상태 정보 조회 오류 발생:", error);
    console.error("오류 상세:", error.response?.data || error.message);
    throw error;
  }
};

// 유저 관리자 상태 조회
export const UserAdminStateInfo = async (isLoggedIn) => {
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
      `${serverUrl}/api/user/userAdminInfo/`,

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

    console.error("유저 관리자 상태 정보 조회 오류 발생:", error);
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
      `${serverUrl}/api/user/credit/check`,
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
      `${serverUrl}/api/user/credit/use`,
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
      `${serverUrl}/api/user/alarm/alarmList`,

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
        completedStatus: false,
      };
      const response = await axios.post(
        `${serverUrl}/panels/tool/create_tool`,
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
export const updateToolOnServer = async (toolId, updateData) => {
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
      `${serverUrl}/panels/tool/update_tool`,
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
};



//프로젝트 리스트 조회 api
export const getProjectListSaasByIdFromIndexedDB = async (isLoggedIn) => {
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에서 데이터 가져오기
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${serverUrl}/project/listSaas`,
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

//교육 프로젝트 리스트 조회 api
export const getProjectListSaasEducationByIdFromIndexedDB = async (
  educationCode,
  isLoggedIn
) => {
  if (isLoggedIn) {
    // 사용자 로그인 시 서버에서 데이터 가져오기
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `${serverUrl}/project/listSaasEducation/${educationCode}`,
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
        `${serverUrl}/project/ToolActivities/${projectId}/${getCount}`,
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

// 프로젝트 휴지통
export const getProjectDeleteListOnServer = async (size, page, isLoggedIn) => {
  if (isLoggedIn) {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `${serverUrl}/project/deleteList?size=${size}&page=${page}`,
      {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
      }
    );
      return response.data;
  } catch (error) {
      console.error("Error fetching project delete list from server:", error);
    throw error;
  }
  }
};

// 툴 휴지통
export const getToolDeleteListOnServer = async (
  projectId,
  size,
  isLoggedIn
) => {
  if (isLoggedIn) {
    try {
      const accessToken = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `${serverUrl}/project/ToolDeleteList/${projectId}/${size}`,
      {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
      }
    );
      return response.data;
  } catch (error) {
      console.error("Error fetching tool delete list from server:", error);
    throw error;
  }
  }
};


/////////////////////////////////
// App.js
/////////////////////////////////
// 토큰 유효성 검사 API
export const checkTokenValidity = async () => {
  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.get(`${serverUrl}/api/db/token_check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

      return response.data;
  } catch (error) {
    console.error("토큰 유효성 검사 오류:", error);
    throw error;
  }
};

// 백엔드 서버 상태 체크 API
export const checkBackendServerStatus = async () => {
  try {
    const response = await axios.get(`${serverUrl}/api/db/back_server`, {
      timeout: 3000, // 3초 타임아웃 설정
    });

      return response.data;
  } catch (error) {
    console.error("백엔드 서버 상태 체크 오류:", error);
    throw error;
  }
};


/////////////////////////////////
//My profile
/////////////////////////////////

// 문의하기 제출 API
export const submitUserSupport = async (contactData, isLoggedIn) => {
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
      `${serverUrl}/api/user/support/`,
      {
        purpose: contactData.purpose,
        content: contactData.content,
      },
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
    console.error("문의하기 제출 실패:", error);
    throw error;
  }
};

// 회원탈퇴 API
export const submitUserLeave = async (leaveReason, isLoggedIn) => {
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
      `${serverUrl}/api/user/leave/`,
      {
        leave_comment: leaveReason,
      },
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
    console.error("회원탈퇴 실패:", error);
    throw error;
  }
};

// 인사이트 이름 변경 API
export const updateInsightName = async (reportId, newName, isLoggedIn) => {
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
      id: reportId,
      view_name: newName,
    };

    const response = await axios.put(
      `${serverUrl}/panels/update_insight`,
      PUT_DATA,
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
    console.error("인사이트 이름 변경 실패:", error);
    throw error;
  }
};

// 채팅 이름 변경 API
export const updateChatName = async (chatId, newName, isLoggedIn) => {
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
      id: chatId,
      view_name: newName,
    };

    const response = await axios.put(
      `${serverUrl}/panels/update_chat`,
      PUT_DATA,
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
    console.error("채팅 이름 변경 실패:", error);
    throw error;
  }
};

// 인사이트 삭제 API
export const deleteInsight = async (reportId, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.delete(
      `${serverUrl}/panels/insight/delete/${reportId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      return response.data;
  } catch (error) {
    console.error("인사이트 삭제 실패:", error);
    throw error;
  }
};

// 채팅 삭제 API
export const deleteChat = async (chatId, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.delete(
      `${serverUrl}/panels/chat/delete/${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      return response.data;
  } catch (error) {
    console.error("채팅 삭제 실패:", error);
    throw error;
  }
};

// 채팅 리스트 조회 API
export const getChatList = async (isLoggedIn) => {
  if (!isLoggedIn) {
    return [];
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.get(`${serverUrl}/panels/chat_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

      return response.data;
  } catch (error) {
    console.error("채팅 리스트 조회 실패:", error);
    throw error;
  }
};

// 인사이트 리스트 조회 API
export const getInsightList = async (isLoggedIn) => {
  if (!isLoggedIn) {
    return [];
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.get(`${serverUrl}/panels/insight_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

      return response.data;
  } catch (error) {
    console.error("인사이트 리스트 조회 실패:", error);
    throw error;
  }
};

// 인사이트 상세 조회 API
export const getInsightDetail = async (reportId, isLoggedIn) => {
  if (!isLoggedIn) {
    console.error("로그인이 필요합니다.");
    return null;
  }

  try {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    const response = await axios.get(`${serverUrl}/panels/insight/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

      return response.data;
  } catch (error) {
    console.error("인사이트 상세 조회 실패:", error);
    throw error;
  }
};

/////////////////////////////////
// Login API functions
/////////////////////////////////
export const loginNormal = async (email, password) => {
  try {
    const response = await axios.post(`${serverUrl}/api/user_autodisplay/login/normal/`, {
      email,
      password
    }, {
          headers: {
        'Content-Type': 'application/json'
      }
    });
      return response.data;
  } catch (error) {
    console.error("Error during normal login:", error);
    throw error;
  }
};

export const loginMarketing = async (email, password, chatGetId) => {
  try {
    const response = await axios.post(`${serverUrl}/api/user/defaultLogin_marketing/`, {
      email,
      password,
      chatGetId
    }, {
        headers: {
        'Content-Type': 'application/json'
      }
    });
      return response.data;
  } catch (error) {
    console.error("Error during marketing login:", error);
    throw error;
  }
};

export const getUserInfo = async (accessToken) => {
    try {
    const response = await axios.get(`${serverUrl}/api/user_autodisplay/userInfo/`, {
          headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
        }
    });
      return response.data;
    } catch (error) {
    console.error("Error fetching user info:", error);
      throw error;
  }
};

/////////////////////////////////
// Signup API functions
/////////////////////////////////
export const signupAutodisplay = async (signupData) => {
  try {
    const response = await axios.post(`${serverUrl}/api/user_autodisplay/autodisplay_signup/`, signupData, {
          headers: {
        'Content-Type': 'application/json'
      }
    });
      return response.data;
    } catch (error) {
    console.error("Error during autodisplay signup:", error);
      throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await axios.post(`${serverUrl}/api/user_autodisplay/checkEmail/`, {
      email
    }, {
          headers: {
        'Content-Type': 'application/json'
        }
    });
      return response.data;
    } catch (error) {
    console.error("Error checking email:", error);
      throw error;
  }
};





