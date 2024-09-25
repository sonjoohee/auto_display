import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import panelimages from "../../../../assets/styles/PanelImages";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import axios from "axios";

import {
  passwordAtom,
  newPasswordAtom,
  rePasswordAtom,
  INPUT_BUSINESS_INFO,
  isLoggedInAtom,
  USER_NAME,
  USER_EMAIL,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  APPROACH_PATH,
  SELECTED_ADDITIONAL_KEYWORD,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  ADDITIONAL_REPORT_DATA, // Import the new list-based atom
  CONVERSATION_STAGE,
  ADDITIONAL_QUESTION_1,
  ADDITIONAL_QUESTION_2,
  ADDITIONAL_QUESTION_3,
  iS_CLICK_CHECK_REPORT_RIGHTAWAY,
  CONVERSATION,
  CONVERSATION_ID,
  SELECTED_EXPERT_INDEX,
  REPORT_REFRESH_TRIGGER,
  IS_LOADING,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_LIST,
  IS_SOCIAL_LOGGED_IN,
  SAVED_TIMESTAMP,
  IS_EDITING_NOW,
  ANALYSIS_BUTTON_STATE,
  EXPERT_BUTTON_STATE,
  ADDITION_BUTTON_STATE,
  CUSTOMER_ADDITION_BUTTON_STATE,
} from "../../../AtomStates";
import { getAllConversationsFromIndexedDB } from "../../../../utils/indexedDB"; // IndexedDB에서 대화 내역 가져오기
import MoleculeLoginPopup from "../../../Login_Sign/components/molecules/MoleculeLoginPopup"; // 로그인 팝업 컴포넌트 임포트
import MoleculeAccountPopup from "../../../Login_Sign/components/molecules/MoleculeAccountPopup"; // 계정설정 팝업 컴포넌트 임포트

import OrganismReportPopup from "./OrganismReportPopup"; // 팝업 컴포넌트 임포트

const OrganismLeftSideBar = () => {
  const [selectedExpertList, setSelectedExpertList] = useAtom(SELECTED_EXPERT_LIST);
  const [password, setPassword] = useAtom(passwordAtom);
  const [newPassword, setNewPassword] = useAtom(newPasswordAtom);
  const [rePassword, setRePassword] = useAtom(rePasswordAtom);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const navigate = useNavigate();
  const [bizName] = useAtom(INPUT_BUSINESS_INFO);
  // const [savedReports] = useAtom(SAVED_REPORTS);
  const [selectedReport, setSelectedReport] = useState(null); // 선택된 보고서 상태 관리
  const [conversations, setConversations] = useState([]); // 저장된 대화 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 관리
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false); // 로그인 팝업 상태 관리
  const [reports, setReports] = useState([]); // 서버에서 가져온 보고서 리스트 상태
  const [reportRefreshTrigger, setReportRefreshTrigger] = useAtom(
    REPORT_REFRESH_TRIGGER
  ); // 리프레시 트리거 상태 구독

  const [chatList, setChatList] = useState([]); // 서버에서 가져온 대화 리스트

  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false); // 계정설정 팝업
  const [isSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN); // 소셜 로그인 상태 읽기

  const [isLogoutPopup, setIsLogoutPopup] = useState(false); // 로그아웃 팝업 상태 관리
  const [userName, setUserName] = useAtom(USER_NAME); // 아톰에서 유저 이름 불러오기
  const [userEmail, setUserEmail] = useAtom(USER_EMAIL); // 아톰에서 유저 이메일 불러오기
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // 삭제 경고 팝업 상태
  const [isChatDeletePopupOpen, setChatIsDeletePopupOpen] = useState(false); // 삭제 경고 팝업 상태

  const [reportIdToDelete, setReportIdToDelete] = useState(null); // 삭제하려는 reportId 저장
  const [chatIdToDelete, setChatIdToDelete] = useState(null); // 삭제하려는 reportId 저장

  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const [sections, setSections] = useState([]);
  const [additionalReportCount, setAdditionalReportCount] = useState(0);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  ); // Use the new list-based atom

  const [expert1ReportData, setExpert1ReportData] =
    useAtom(EXPERT1_REPORT_DATA);
  const [expert2ReportData, setExpert2ReportData] =
    useAtom(EXPERT2_REPORT_DATA);
  const [expert3ReportData, setExpert3ReportData] =
    useAtom(EXPERT3_REPORT_DATA);

  const [addtionalQuestion1, setAddtionalQuestion1] = useAtom(
    ADDITIONAL_QUESTION_1
  );
  const [addtionalQuestion2, setAddtionalQuestion2] = useAtom(
    ADDITIONAL_QUESTION_2
  );
  const [addtionalQuestion3, setAddtionalQuestion3] = useAtom(
    ADDITIONAL_QUESTION_3
  );

  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [inputAdditionalQuestion, setInputAdditionalQuestion] = useState("");
  const [isClickCheckReportRightAway, setIsClickCheckReportRightAway] = useAtom(
    iS_CLICK_CHECK_REPORT_RIGHTAWAY
  );
  const insightEditBoxRef = useRef(null);
  const historyEditBoxRef = useRef(null);
  const toggleRef = useRef(null); 
  
  const [editToggleIndex, setEditToggleIndex] = useState(null); // 특정 인덱스를 저장

  const [savedTimestamp, setSavedTimestamp] = useAtom(SAVED_TIMESTAMP);

  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [editBoxPosition, setEditBoxPosition] = useState({ top: 0, left: 0 });
  const accordionContentRef = useRef(null);
  const [insightEditBoxPosition, setInsightEditBoxPosition] = useState({ top: 0, left: 0 });
  const insightAccordionContentRef = useRef(null);

  const [analysisButtonState, setAnalysisButtonState] = useAtom(ANALYSIS_BUTTON_STATE);
  const [expertButtonState, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE);
  const [additionButtonState, setAdditionButtonState] = useAtom(ADDITION_BUTTON_STATE);
  const [customerAdditionButtonState, setCustomerAdditionButtonState] = useAtom(CUSTOMER_ADDITION_BUTTON_STATE);

  const [isSection1Open, setIsSection1Open] = useState(false); // 인사이트 보관함 열림/닫힘 상태
  const [isSection2Open, setIsSection2Open] = useState(false); // 프로젝트 히스토리 열림/닫힘 상태

 // 사이드바의 최대 높이 설정
 const maxSidebarHeight = 600; // 예시로 700px 설정

 const ITEM_HEIGHT = 50;

 // 첫 번째 아코디언(보고서)와 두 번째 아코디언(대화 내역)의 높이를 계산하는 함수
 const calculateAccordionHeight = () => {
   const reportHeight = reports.length * ITEM_HEIGHT; // 보고서 높이
   const chatHeight = chatList.length * ITEM_HEIGHT; // 대화 내역 높이
 
   return { reportHeight, chatHeight };
 };
 
 const exceedsSidebarHeight = () => {
   const { reportHeight, chatHeight } = calculateAccordionHeight();
 
   // 두 아코디언이 열렸을 때의 총 높이 계산
   const totalHeight = reportHeight + chatHeight; // 조건 없이 둘 다 더함
  //  console.log("Total Height:", totalHeight);
 
   return totalHeight > maxSidebarHeight; // maxSidebarHeight와 비교하여 넘는지 확인
 };

 // 첫 번째 아코디언 토글 함수
 const toggleSection1 = () => {
   setIsSection1Open((prev) => {
     const willOpen = !prev;

     // 열릴 때 사이드바 높이를 초과하면 두 번째 아코디언을 닫음
     if (willOpen && exceedsSidebarHeight()) {
       setIsSection2Open(false);
     }

     return willOpen;
   });
 };

 // 두 번째 아코디언 토글 함수
 const toggleSection2 = () => {
   setIsSection2Open((prev) => {
     const willOpen = !prev;

     // 열릴 때 사이드바 높이를 초과하면 첫 번째 아코디언을 닫음
     if (willOpen && exceedsSidebarHeight()) {
       setIsSection1Open(false);
     }

     return willOpen;
   });
 };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        // 클릭한 곳이 요소 내부가 아니면 토글을 닫음
        setIsToggle(true);
      }
    };
    // 마운트될 때 클릭 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    
    // 언마운트될 때 클릭 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        insightEditBoxRef.current &&
        !insightEditBoxRef.current.contains(event.target)
      ) {
        setInsightEditToggleIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [insightEditBoxRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        historyEditBoxRef.current &&
        !historyEditBoxRef.current.contains(event.target)
      ) {
        setEditToggleIndex(null); // setInsightEditToggleIndex가 아닌 히스토리용 상태를 업데이트
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [historyEditBoxRef]);


  const editBoxToggle = (index, event, category) => {
    // console.log('editBoxPosition:', editBoxPosition);
    if (editToggleIndex === index) {
      // 이미 열려 있으면 아무 동작 안 함
      return;
    }
  
    setEditToggleIndex(index);
  
    if (event && accordionContentRef.current) {
      const container = accordionContentRef.current;
      const clickedElement = event.currentTarget;
  
      let top = clickedElement.offsetTop - container.scrollTop;
      let left = clickedElement.offsetLeft + clickedElement.offsetWidth + 10;
  
      // category에 따라 이동
      if (category === 'recent') {
        left -= 40; // 최근 대화면 40px 왼쪽 이동
        top -= 10;
      } else if (category === '7days') {
        left -= 190; // 지난 7일이면 190px 왼쪽 이동
        top += 10; // 10px 아래로 이동
      } else if (category === '30days') {
        left -= 340; // 지난 30일이면 340px 왼쪽 이동
        top += 30; // 20px 아래로 이동
      }
  
      setEditBoxPosition({ top, left });
    }
  };

useEffect(() => {
  const handleClickOutside = (event) => {
    if (editToggleIndex !== null) {
      const editBoxElement = document.getElementById(`edit-box-${editToggleIndex}`);
      const toggleElement = document.getElementById(`insight-toggle-${editToggleIndex}`);
      if (
        editBoxElement &&
        !editBoxElement.contains(event.target) &&
        toggleElement &&
        !toggleElement.contains(event.target)
      ) {
        setEditToggleIndex(null);
      }
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [editToggleIndex]);

  // 삭제 버튼 클릭 시, 삭제 경고 팝업 열기
  const handleDeleteButtonClick = (reportId) => {
    setReportIdToDelete(reportId); // 삭제할 reportId 저장
    setIsDeletePopupOpen(true); // 팝업 열기
  };
  const handleChatDeleteButtonClick = (ChatId) => {
    setChatIdToDelete(ChatId); // 삭제할 reportId 저장
    setChatIsDeletePopupOpen(true); // 팝업 열기
  };
  const [insightEditToggleIndex, setInsightEditToggleIndex] = useState(null);

  // 인사이트 보관함용 EditBox 열기/닫기 함수
  const insightEditBoxToggle = (index, event) => {
    if (isLoading) return;
  
    setInsightEditToggleIndex((prevIndex) => (prevIndex === index ? null : index));
  
    if (event && insightAccordionContentRef.current) {
      const container = insightAccordionContentRef.current;
      const clickedElement = event.currentTarget;
  
      // Calculate the position considering the scroll
      const top = clickedElement.offsetTop - container.scrollTop -10;
      const left = clickedElement.offsetLeft + clickedElement.offsetWidth -30;
  
      setInsightEditBoxPosition({ top, left });
    }
  };
  
  useEffect(() => {
    const loadConversations = async () => {
      const allConversations = await getAllConversationsFromIndexedDB();
      setConversations(allConversations);
    };
    loadConversations();
  }, []);

  // 대화 리스트 가져오기 (챗 리스트)
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
          setChatList([]); // 로그아웃 상태에서는 대화 리스트를 빈 배열로 설정
          return;
        }
        const response = await axios.get(
          "https://wishresearch.kr/panels/chat_list",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const sortedChatList = response.data
          .filter((chat) => chat.business_info !== null && chat.business_info !== "") // business_info가 비었으면(기초보고서 생성 전) 히스토리에 남기지 않음
          .sort((a, b) => b.timestamp - a.timestamp); // 최근 날짜 순으로 정렬

        setChatList(sortedChatList);

      } catch (error) {
        console.error("대화 목록 가져오기 오류:", error);
      }
    };
    fetchChatList();
  }, [reportRefreshTrigger, isLoggedIn]);

  useEffect(() => {
    // 서버에서 보고서 목록을 가져오는 함수
    const fetchReports = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰 가져오기

        if (!accessToken) {
          setReports([]); // 로그아웃 상태에서는 대화 리스트를 빈 배열로 설정
          return;
        }
        const response = await axios.get(
          "https://wishresearch.kr/panels/insight_list",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setReports(response.data); // 보고서 리스트를 상태로 설정
      } catch (error) {
        console.error("보고서 목록 가져오기 오류:", error);
      }
    };
    fetchReports();
  }, [reportRefreshTrigger, isLoggedIn]);

  // const handleConversationClick = (id) => {
  //   // 클릭 시 해당 대화로 이동
  //   navigate(`/conversation/${id}`);
  // };
  const handleConversationClick = async (conversationId) => {
    if (isLoading) return;

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.get(
        `https://wishresearch.kr/panels/chat/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const chatData = response.data.chat_data;
      // console.log("🚀 ~ handleConversationClick ~ chatData:", chatData);
      setSavedTimestamp(chatData.timestamp); // 대화 날짜 설정
      setSelectedExpertIndex(
        chatData.expert_index !== undefined ? chatData.expert_index : 0
      );
      setConversationId(chatData.id); // 대화 ID 설정
      setConversation(chatData.conversation); // 이전 대화 내역 설정
      setConversationStage(chatData.conversationStage); // 대화 단계 설정
      setInputBusinessInfo(chatData.inputBusinessInfo); // 비즈니스 정보 설정
      setTitleOfBusinessInfo(chatData.analysisReportData.title); // 분석 데이터 설정
      setMainFeaturesOfBusinessInformation(
        chatData.analysisReportData.mainFeatures
      ); // 주요 특징 설정
      setMainCharacteristicOfBusinessInformation(
        chatData.analysisReportData.mainCharacter
      ); // 주요 특징 설정
      setBusinessInformationTargetCustomer(
        chatData.analysisReportData.mainCustomer
      ); // 목표 고객 설정

      // 전문가 보고서 데이터 복구
      setExpert1ReportData(chatData.strategyReportData_EX1 || {});
      setExpert2ReportData(chatData.strategyReportData_EX2 || {});
      setExpert3ReportData(chatData.strategyReportData_EX3 || {});

      // 필요하다면 추가 상태 업데이트
      setSelectedAdditionalKeyword(chatData.selectedAdditionalKeyword || []);
      setAdditionalReportData(chatData.additionalReportData || []);
      setCustomerAdditionalReportData(
        chatData.customerAdditionalReportData || []
      );
      setSelectedCustomerAdditionalKeyword(
        chatData.selectedCustomerAdditionalKeyword || []
      );

      // 어프로치 패스 추가 필요(보고서만 뽑고 나온 뒤에 들어가면 버튼만 추가되어 보이게)
      // set어프로치패스(2)
      setApproachPath(2);

      setIsEditingNow(false);

      setAnalysisButtonState(0);
      setExpertButtonState(0);
      setAdditionButtonState(0);
      setCustomerAdditionButtonState(0);
      
      // 페이지를 대화가 이어지는 형태로 전환
      navigate(`/conversation/${conversationId}`);
    } catch (error) {
      console.error("대화 내용 가져오기 오류:", error);
    }
  };

  const handleLoginClick = () => {
    setLoginPopupOpen(true); // 로그인 팝업 열기
  };

  const closeLoginPopup = () => {
    setLoginPopupOpen(false); // 로그인 팝업 닫기
  };

  const handleAccountClick = () => {
    setAccountPopupOpen(true); // 계정설정 팝업 열기
  };

  const closeAccountPopup = () => {
    setAccountPopupOpen(false); // 계정설정 팝업 닫기
  };

  const handleLogoutClick = () => {
    // 로그아웃 버튼 클릭 시 로그아웃 팝업 열기
    setIsLogoutPopup(true);
  };

  const handleLogoutConfirm = () => {
    // 로그아웃 확인 버튼을 눌렀을 때 실행
    sessionStorage.removeItem("accessToken"); // 세션 스토리지에서 토큰 삭제
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("isSocialLogin");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserName("");
    setUserEmail("");
    setIsLogoutPopup(false); // 로그아웃 팝업 닫기
    navigate("/"); // 페이지 이동
  };

  const handleCloseLogoutPopup = () => {
    // 로그아웃 팝업 닫기
    setIsLogoutPopup(false);
  };

  const handleReportClick = async (reportId) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰 가져오기
      const response = await axios.get(
        `https://wishresearch.kr/panels/insight/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSelectedReport(response.data); // 선택된 보고서의 상세 데이터 상태로 설정
    } catch (error) {
      console.error("보고서 상세 정보 가져오기 오류:", error);
    }
  };

  const closePopup = () => {
    setSelectedReport(null); // 팝업 닫기
  };

  const handleDeleteInsightConfirm = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰 가져오기
      const response = await axios.delete(
        `https://wishresearch.kr/panels/insight/delete/${reportIdToDelete}`, // reportId를 이용해 URL 동적으로 생성
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 삭제가 성공적으로 이루어진 경우 처리할 코드

      // 삭제 후에 상태 업데이트 (예: 삭제된 항목을 리스트에서 제거)
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== reportIdToDelete)
      );

      // 팝업 닫기 및 삭제할 reportId 초기화
      setIsDeletePopupOpen(false);
      setReportIdToDelete(null);
      setReportRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error("삭제 요청 오류:", error);
    }
  };

  const handleDeleteHistoryConfirm = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰 가져오기
      const response = await axios.delete(
        `https://wishresearch.kr/panels/chat/delete/${chatIdToDelete}`, // reportId를 이용해 URL 동적으로 생성
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 삭제가 성공적으로 이루어진 경우 처리할 코드

      // 삭제 후에 상태 업데이트 (예: 삭제된 항목을 리스트에서 제거)
      setReports((prevReports) =>
        prevReports.filter((chat) => chat.id !== chatIdToDelete)
      );

      // 팝업 닫기 및 삭제할 reportId 초기화
      setChatIsDeletePopupOpen(false);
      setChatIdToDelete(null);
      setReportRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.error("삭제 요청 오류:", error);
    }
  };

  // 삭제 취소 처리 함수
  const handleDeleteCancel = () => {
    setIsDeletePopupOpen(false); // 팝업 닫기
    setChatIsDeletePopupOpen(false);
    setReportIdToDelete(null); // 삭제할 reportId 초기화
    setChatIdToDelete(null);
  };

  useEffect(() => {
    const checkboxes = document.querySelectorAll(".accordion-toggle");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    });

    // Cleanup 이벤트 리스너
    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", () => {});
      });
    };
  }, []);

  // 클릭 시 이동
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [isToggle, setIsToggle] = useState(true);
  const moreProfile = (event) => {
    event.stopPropagation(); // 내부 클릭 이벤트가 외부로 전파되지 않도록 방지
    setIsToggle((prev) => !prev); // 팝업 열기/닫기
  };

  const handleNewProjectClick = () => {
    if (isLoading) return;

    navigate("/");
    setConversation([]);
    setConversationStage(1);
    setInputBusinessInfo("");
    setTitleOfBusinessInfo("");
    setMainFeaturesOfBusinessInformation([]);
    setMainCharacteristicOfBusinessInformation([]);
    setBusinessInformationTargetCustomer([]);
    setSelectedExpertIndex("0");
    setSections([]);
    setAdditionalReportCount(0);
    setSelectedAdditionalKeyword([]);
    setApproachPath(0);
    setAdditionalReportData([]);
    setCustomerAdditionalReportData([]);
    setSelectedCustomerAdditionalKeyword([]);
    setExpert1ReportData({});
    setExpert2ReportData({});
    setExpert3ReportData({});
    setAddtionalQuestion1("");
    setAddtionalQuestion2("");
    setAddtionalQuestion3("");
    setInputAdditionalQuestion("");
    setIsClickCheckReportRightAway(false);
    setConversationId(null);
    setPassword("");
    setNewPassword("");
    setRePassword("");
    setSelectedExpertList([]);
    setIsEditingNow(false);
  };

  return (
    <>
      <Logo isOpen={isOpen}>
        <a onClick={handleNewProjectClick}></a>
        <button type="button" onClick={toggleSidebar}>
          닫기
        </button>
      </Logo>

      <SideBar isOpen={isOpen} bgNone={!isOpen}>
        <SideBarMenu>
          <button
            type="button"
            className="newChat"
            onClick={handleNewProjectClick}
          >
            <img src={images.Chat} alt="" />새 프로젝트 시작
          </button>

          <AccordionMenu>
            <AccordionItem> 
            <label 
                className={`accordion-label ${isSection1Open ? 'open' : ''}`} 
                onClick={toggleSection1}
              >
                    <img src={images.Folder} alt="" />
                인사이트 보관함
              </label>
              <AccordionContent className="scrollbar" ref={insightAccordionContentRef} style={{ maxHeight: isSection1Open ? "calc(100vh - 26rem)" : "0" }}>
                  <ul>
                    {reports && reports.length > 0 ? (
                      reports.map((report, index) => (
                        <li
                          key={index}
                          data-expert-index={report.reportIndex} // data-expert-index 속성 추가
                        >
                          <p onClick={() => handleReportClick(report.id)}>
                            {report.business_info}
                          </p>
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                          <span
                            id={`insight-toggle-${index}`}
                            style={{
                              display: "inline-block",
                              padding: "10px",
                              cursor: "pointer",
                            }}
                            onClick={(event) => insightEditBoxToggle(index, event)} // event 전달
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="3"
                              viewBox="0 0 14 3"
                              // fill={getColor(report.reportIndex)}
                              >
                              <circle
                                cx="2.0067"
                                cy="1.51283"
                                r="1.49694"
                                transform="rotate(-90 2.0067 1.51283)"
                                fill="#A0A0A0"
                              />
                              <circle
                                cx="7.00084"
                                cy="1.51283"
                                r="1.49694"
                                transform="rotate(-90 7.00084 1.51283)"
                                fill="#A0A0A0"
                              />
                              <circle
                                cx="11.993"
                                cy="1.51283"
                                r="1.49694"
                                transform="rotate(-90 11.993 1.51283)"
                                fill="#A0A0A0"
                              />
                            </svg>
                          </span>
                          {insightEditToggleIndex === index && (
                            <div
                              id={`insight-edit-box-${index}`}
                              className="insight-toggle"
                              ref={insightEditBoxRef}
                            >
                              <EditBox
                                id={`insight-edit-box-${editToggleIndex}`}
                                isEditToggle={true}
                                style={{
                                  top: `${insightEditBoxPosition.top}px`,
                                  left: `${insightEditBoxPosition.left}px`,
                                }}
                                ref={insightEditBoxRef}
                              >
                                <button
                                  type="button"
                                  onClick={() => handleDeleteButtonClick(report.id)}
                                >
                                  <img src={images.IconDelete2} alt="" />
                                  삭제
                                </button>
                                <button type="button">
                                  <img src={images.IconEdit2} alt="" />
                                  이름 변경
                                </button>
                              </EditBox>
                            </div>
                          )}
                          </div>
                        </li>
                    ))
                  ) : (
                    <p>저장한 보고서가 없습니다</p>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {selectedReport && (
              <OrganismReportPopup
                report={selectedReport}
                onClose={closePopup}
              />
            )}

            <AccordionItem>
            <label 
    className={`accordion-label ${isSection2Open ? 'open' : ''}`} 
    onClick={toggleSection2}
  >
                <img src={images.Clock} alt="" />
                프로젝트 히스토리
              </label>
              <AccordionContent className="scrollbar" ref={accordionContentRef} style={{ maxHeight: isSection2Open ? "calc(100vh - 26rem)" : "0" }}>
                {chatList && chatList.length > 0 ?               
                  <div>
                    {chatList.some(chat => Date.now() - chat.timestamp <= 604800000) && (
                      <>
                        <strong>최근 대화</strong>
                        <ul>
                          {chatList
                            .filter(chat => Date.now() - chat.timestamp <= 604800000)
                            .map((chat) => (
                              <li key={chat.id}>
                                <p onClick={() => handleConversationClick(chat.id)}>
                                  {chat.business_info}
                                </p>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                <span
                                  id={`insight-toggle-${chat.id}`}
                                  style={{
                                    display: "inline-block",
                                    padding: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={(event) => editBoxToggle(chat.id, event, 'recent')}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="3"
                                    viewBox="0 0 14 3"
                                    fill="none"
                                  >
                                    <circle
                                      cx="2.0067"
                                      cy="1.51283"
                                      r="1.49694"
                                      transform="rotate(-90 2.0067 1.51283)"
                                      fill="#A0A0A0"
                                    />
                                    <circle
                                      cx="7.00084"
                                      cy="1.51283"
                                      r="1.49694"
                                      transform="rotate(-90 7.00084 1.51283)"
                                      fill="#A0A0A0"
                                    />
                                    <circle
                                      cx="11.993"
                                      cy="1.51283"
                                      r="1.49694"
                                      transform="rotate(-90 11.993 1.51283)"
                                      fill="#A0A0A0"
                                    />
                                  </svg>
                                </span>
                                
                                {editToggleIndex === chat.id && (
                                  <div
                                    id={`insight-edit-box-${chat.id}`}
                                    className="insight-toggle"
                                    ref={historyEditBoxRef}
                                  >
                                   <EditBox
                                      id={`insight-edit-box-${chat.id}`}
                                      isEditToggle={editToggleIndex === chat.id}
                                      style={{
                                        top: `${editBoxPosition.top}px`,
                                        left: `${editBoxPosition.left}px`,
                                      }}
                                    >
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleChatDeleteButtonClick(chat.id)
                                        }
                                      >
                                        <img src={images.IconDelete2} alt="" />
                                        삭제
                                      </button>
                                      <button type="button">
                                        <img src={images.IconEdit2} alt="" />
                                        이름 변경
                                      </button>
                                    </EditBox>
                                  </div>
                                )}
                                </div>
                              </li>
                            ))}
                        </ul>
                      </>
                    )}
                    {chatList.some(chat => (Date.now() - chat.timestamp) > 604800000 && (Date.now() - chat.timestamp <= 2592000000)) && (
                      <>            
                      <strong>지난 7일</strong>
                        <ul>
                          {chatList
                            .filter(chat => Date.now() - chat.timestamp > 604800000 && Date.now() - chat.timestamp <= 2592000000)
                            .map((chat) => (
                              <li key={chat.id}>
                                <p onClick={() => handleConversationClick(chat.id)}>
                                  {chat.business_info}
                                </p>
                                <span
                                  id={`insight-toggle-${chat.id}`}
                                  style={{
                                    display: "inline-block",
                                    padding: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={(event) => editBoxToggle(chat.id, event, '7days')}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="3"
                                    viewBox="0 0 14 3"
                                    fill="none"
                                  >
                                    <circle
                                      cx="2.0067"
                                      cy="1.51283"
                                      r="1.49694"
                                      transform="rotate(-90 2.0067 1.51283)"
                                      fill="#A0A0A0"
                                    />
                                    <circle
                                      cx="7.00084"
                                      cy="1.51283"
                                      r="1.49694"
                                      transform="rotate(-90 7.00084 1.51283)"
                                      fill="#A0A0A0"
                                    />
                                    <circle
                                      cx="11.993"
                                      cy="1.51283"
                                      r="1.49694"
                                      transform="rotate(-90 11.993 1.51283)"
                                      fill="#A0A0A0"
                                    />
                                  </svg>
                                </span>
                                
                                {editToggleIndex === chat.id && (
                                  <div
                                    id={`insight-edit-box-${chat.id}`}
                                    className="insight-toggle"
                                    ref={historyEditBoxRef}
                                  >
                               <EditBox
                                  id={`insight-edit-box-${chat.id}`}
                                  isEditToggle={editToggleIndex === chat.id}
                                  style={{
                                    top: `${editBoxPosition.top}px`,
                                    left: `${editBoxPosition.left}px`,
                                  }}
                                >
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleChatDeleteButtonClick(chat.id)
                                        }
                                      >
                                        <img src={images.IconDelete2} alt="" />
                                        삭제
                                      </button>
                                      <button type="button">
                                        <img src={images.IconEdit2} alt="" />
                                        이름 변경
                                      </button>
                                    </EditBox>
                                  </div>
                                )}
                              </li>
                            ))}
                        </ul>
                      </>
                    )}
                    {chatList.some(chat => Date.now() - chat.timestamp > 2592000000) && (
                      <>            
                      <strong>지난 30일</strong>
                        <ul>
                          {chatList
                            .filter(chat => Date.now() - chat.timestamp > 2592000000)
                            .map((chat) => (
                              <li key={chat.id}>
                                <p onClick={() => handleConversationClick(chat.id)}>
                                  {chat.business_info}
                                </p>
                                <span
                                  id={`insight-toggle-${chat.id}`}
                                  style={{
                                    display: "inline-block",
                                    padding: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={(event) => editBoxToggle(chat.id, event, '30days')}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="3"
                                    viewBox="0 0 14 3"
                                    fill="none"
                                  >
                                    <circle
                                      cx="2.0067"
                                      cy="1.51283"
                                      r="1.49694"
                                      transform="rotate(-90 2.0067 1.51283)"
                                      fill="#A0A0A0"
                                    />
                                    <circle
                                      cx="7.00084"
                                      cy="1.51283"
                                      r="1.49694"
                                      transform="rotate(-90 7.00084 1.51283)"
                                      fill="#A0A0A0"
                                    />
                                    <circle
                                      cx="11.993"
                                      cy="1.51283"
                                      r="1.49694"
                                      transform="rotate(-90 11.993 1.51283)"
                                      fill="#A0A0A0"
                                    />
                                  </svg>
                                </span>
                                
                                {editToggleIndex === chat.id && (
                                  <div
                                    id={`insight-edit-box-${chat.id}`}
                                    className="insight-toggle"
                                    ref={historyEditBoxRef}
                                  >
                          <EditBox
                              id={`insight-edit-box-${chat.id}`}
                              isEditToggle={editToggleIndex === chat.id}
                              style={{
                                top: `${editBoxPosition.top}px`,
                                left: `${editBoxPosition.left}px`,
                              }}
                            >
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleChatDeleteButtonClick(chat.id)
                                        }
                                      >
                                        <img src={images.IconDelete2} alt="" />
                                        삭제
                                      </button>
                                      <button type="button">
                                        <img src={images.IconEdit2} alt="" />
                                        이름 변경
                                      </button>
                                    </EditBox>
                                  </div>
                                )}
                              </li>
                            ))}
                        </ul>
                      </>
                    )}
                  </div>
                  :
                  <ul> 
                    <p>최근 대화 내역이 없습니다</p>
                  </ul>
                }
              </AccordionContent>
            </AccordionItem>
          </AccordionMenu>
        </SideBarMenu>

        <LoginButtonWrap className="logBtn">
          {isLoggedIn ? (
            // <button onClick={handleLogout}>로그아웃</button>
            <>
              <LogoutBtnWrap className="logInfo">
                <div>
                  <strong>{sessionStorage.getItem("userName")}</strong>{" "}
                  {/* 유저 이름 표시 */}
                  <p>{sessionStorage.getItem("userEmail")}</p>{" "}
                  {/* 유저 이메일 표시 */}
                </div>

                <button className="more" onMouseDown={moreProfile}>
                  {/* <img src={images.AccountSetting} alt="" /> */}
                  <span>
                    {(() => {
                      const userName = sessionStorage.getItem("userName");
                      return userName && userName.length > 1 ? `${userName.slice(0, 1)}` : userName;
                    })()}
                  </span>
                </button>
              </LogoutBtnWrap>

              <LogoutToggle ref={toggleRef} isToggle={isToggle} className="AccountInfo">
                  <div className="info">
                    <strong>{sessionStorage.getItem("userName")}</strong>{" "}
                    {/* 유저 이름 표시 */}
                    <p>{sessionStorage.getItem("userEmail")}</p>{" "}
                    {/* 유저 이메일 표시 */}
                  </div>

                  <ul>
                    {/* 소셜 로그인 상태가 아닐 때만 비밀번호 변경 버튼을 표시 */}
                    {!isSocialLoggedIn && (
                      <li>
                        <button type="button" onClick={handleAccountClick}>
                          <img src={images.AccountSetting} alt="" />
                          비밀번호 변경
                        </button>
                      </li>
                    )}

                    <li>
                      <button type="button">
                        <img src={images.AccountInfo} alt="" />
                        정책 및 약관 정보
                      </button>
                    </li>

                    <li>
                      <button type="button" onClick={handleLogoutClick}>
                        <img src={images.AccountLogout} alt="" />
                        로그아웃
                      </button>
                    </li>
                  </ul>
                </LogoutToggle>
            </>
          ) : (
            <>
              <button onClick={handleLoginClick} className="login">
                로그인
              </button>
              {/* <Link to="/signup">회원가입</Link> */}

              <div className="terms">
                <Link to="#">이용약관</Link>
                <Link to="#">개인정보처리방침</Link>
              </div>
            </>
          )}
        </LoginButtonWrap>
      </SideBar>

      {isLoginPopupOpen && <MoleculeLoginPopup onClose={closeLoginPopup} />}

      {isAccountPopupOpen && (
        <MoleculeAccountPopup onClose={closeAccountPopup} />
      )}

      {isDeletePopupOpen && (
        <Popup Cancel onClick={handleDeleteCancel}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleDeleteCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>정말 이 보고서를 삭제하시겠습니까?</p>
            <div className="btnWrap">
              <button type="button" onClick={handleDeleteCancel}>
                취소
              </button>
              <button type="button" onClick={handleDeleteInsightConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isChatDeletePopupOpen && (
        <Popup Cancel onClick={handleDeleteCancel}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleDeleteCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>정말 삭제하시겠습니까?</p>
            <div className="btnWrap">
              <button type="button" onClick={handleDeleteCancel}>
                취소
              </button>
              <button type="button" onClick={handleDeleteHistoryConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isLogoutPopup && (
        <Popup Cancel onClick={handleCloseLogoutPopup}>
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={handleCloseLogoutPopup}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>
              <strong>정말 로그아웃하시겠습니까?</strong>
              <span>로그아웃하시면 모든 계정 세션이 종료됩니다.</span>
            </p>
            <div className="btnWrap">
              <button type="button" onClick={handleLogoutConfirm}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default OrganismLeftSideBar;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 11px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.black};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

    p {
      font-family: "Pretendard", "Poppins";
      font-size: 0.875rem;
      font-weight: 500;
      margin: 20px auto 24px;
      strong {
        font-weight: 500;
        display: block;
      }

      span {
        font-size: 0.75rem !important;
        font-weight: 400;
        color: #8c8c8c;
        display: block;
        margin-top: 8px;
      }
    }
    
    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: 'Pretendard', 'Poppins';
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 12px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 600;
            display: block;
          }
          span {
            font-size: 1rem;
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.blue};
              background: none;
            }
          }
        }
      `}
  }
`;

const Logo = styled.div`
  position: fixed;
  top: 72px;
  left: 60px;
  width: 250px;
  display: flex;
  // justify-content:space-between;
  justify-content: ${(props) =>
    props.isOpen ? "space-between" : "flex-start"};
  align-items: center;
  gap: ${(props) => (props.isOpen ? "20px" : "0")};
  z-index: 1000;
  transition: all 0.5s;

  a {
    // width:44px;
    width: ${(props) => (props.isOpen ? "135px" : "44px")};
    // width:135px;
    height: 44px;
    font-size: 0;
    background: url(${images.SymbolLogo}) left center no-repeat;
    background-size: auto 100%;
    cursor: pointer;
  }

  button {
    position: relative;
    font-size: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 0;
    background: ${palette.white};
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;

    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 7px;
      height: 2px;
      border-radius: 10px;
      background: ${palette.black};
      transition: all 0.5s;
      content: "";
    }

    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 8px;
      height: 8px;
      border-left: 2px solid ${palette.black};
      border-bottom: 2px solid ${palette.black};
      transition: all 0.5s;
      content: "";
    }
  }

  ${(props) =>
    css`
      button:after {
        transform: ${props.isOpen
          ? "translate(-50%, -50%) rotate(45deg)"
          : "translate(-50%, -50%) rotate(225deg)"} !important;
      }
    `}
`;

const SideBar = styled.div`
  position: sticky;
  top: 40px;
  display: flex;
  flex-direction: column;
  max-width: 257px;
  width: 100%;
  height: calc(100vh - 80px);
  padding: 96px 20px 30px;
  margin: ${(props) => (props.bgNone ? "40px 0 0 0" : "40px 0 0 40px")};
  // margin: 40px 0 0 40px;
  border-radius: 15px;
  border: 1px solid ${palette.lineGray};
  background: ${(props) => (props.bgNone ? "none" : "rgba(0,0,0,.02)")};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.5s;
  transform: ${(props) => (props.bgNone ? "translateX(-257px)" : "0")};
  z-index: 999;

  h3 {
    font-size: 1rem;
    font-weight: 400;
    text-align: left;
    margin-bottom: 20px;
  }

  .logo {
    position: fixed;
    top: 40px;
    left: 40px;
    width: 215px;
    transform: translateX(0);
    // display:flex;
    // justify-content:space-between;
    // align-items:center;
    // margin-bottom:40px;

    a {
      // width:44px;
      width: 135px;
      height: 44px;
      font-size: 0;
      background: url(${images.SymbolLogo}) left center no-repeat;
      background-size: auto 100%;
    }

    button {
      // position:relative;
      position: absolute;
      right: -30px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 0;
      background: ${palette.white};
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);

      &:before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 7px;
        height: 2px;
        border-radius: 10px;
        background: ${palette.black};
        content: "";
      }

      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 8px;
        height: 8px;
        border-left: 2px solid ${palette.black};
        border-bottom: 2px solid ${palette.black};
        content: "";
      }
    }
  }

  ${(props) =>
    props.bgNone &&
    css`
      .logBtn {
        transform: translateX(257px);

        .more {
          // width: 40px;
          // height: 40px;
          width: 37px;
          height: 37px;
          font-size: 0;
          // background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.86737 1.23877C5.86737 1.51491 5.64351 1.73877 5.36737 1.73877L3.26709 1.73877C2.43866 1.73877 1.76709 2.41034 1.76709 3.23877L1.76709 10.6754C1.76709 11.5038 2.43866 12.1754 3.26709 12.1754H5.36737C5.64351 12.1754 5.86737 12.3993 5.86737 12.6754C5.86737 12.9516 5.64351 13.1754 5.36737 13.1754H3.26709C1.88638 13.1754 0.76709 12.0561 0.76709 10.6754V3.23877C0.76709 1.85806 1.88638 0.73877 3.26709 0.73877H5.36737C5.64351 0.73877 5.86737 0.962627 5.86737 1.23877ZM13.2332 6.95753C13.2332 7.23367 13.0093 7.45753 12.7332 7.45753L5.76741 7.45753L8.38732 10.0774C8.58258 10.2727 8.58258 10.5893 8.38732 10.7845C8.19206 10.9798 7.87548 10.9798 7.68022 10.7846L4.92287 8.0272C4.33848 7.44282 4.33688 6.49584 4.91928 5.90948L7.67902 3.13097C7.87362 2.93504 8.1902 2.93397 8.38612 3.12857C8.58205 3.32317 8.58312 3.63975 8.38852 3.83567L5.78438 6.45753L12.7332 6.45753C13.0093 6.45753 13.2332 6.68139 13.2332 6.95753Z' fill='black' fill-opacity='0.6'/%3E%3C/svg%3E")
          //   center no-repeat;
        }

        .terms {
          transform: translateX(0);
          display: none;
        }

        .login {
          width: 40px;
          height: 40px;
          font-size: 0;
          transform: translateX(40px);
          padding: 0;
          border-radius: 10px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.86737 1.23877C5.86737 1.51491 5.64351 1.73877 5.36737 1.73877L3.26709 1.73877C2.43866 1.73877 1.76709 2.41034 1.76709 3.23877L1.76709 10.6754C1.76709 11.5038 2.43866 12.1754 3.26709 12.1754H5.36737C5.64351 12.1754 5.86737 12.3993 5.86737 12.6754C5.86737 12.9516 5.64351 13.1754 5.36737 13.1754H3.26709C1.88638 13.1754 0.76709 12.0561 0.76709 10.6754V3.23877C0.76709 1.85806 1.88638 0.73877 3.26709 0.73877H5.36737C5.64351 0.73877 5.86737 0.962627 5.86737 1.23877ZM13.2332 6.95753C13.2332 7.23367 13.0093 7.45753 12.7332 7.45753L5.76741 7.45753L8.38732 10.0774C8.58258 10.2727 8.58258 10.5893 8.38732 10.7845C8.19206 10.9798 7.87548 10.9798 7.68022 10.7846L4.92287 8.0272C4.33848 7.44282 4.33688 6.49584 4.91928 5.90948L7.67902 3.13097C7.87362 2.93504 8.1902 2.93397 8.38612 3.12857C8.58205 3.32317 8.58312 3.63975 8.38852 3.83567L5.78438 6.45753L12.7332 6.45753C13.0093 6.45753 13.2332 6.68139 13.2332 6.95753Z' fill='black' fill-opacity='0.6'/%3E%3C/svg%3E")
            center no-repeat;
        }
      }

      .logInfo {
        padding: 0;
        border: 0;

        div {
          display: none;
        }

        button {
          display: flex;
          overflow: hidden;
          padding: 10px !important;
          border: 1px solid ${palette.lineGray};
          background: none !important;
          transform: translateX(40px);

          span {
            font-size: 0.88rem !important;
            overflow: hidden;
            display: block;
          }
        }
      }

      .AccountInfo {
        transform: translateX(90px);
      }
    `}
`;

const SideBarMenu = styled.div`
  display: flex;
  flex-direction: column;

  .newChat {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: "Pretendard";
    font-size: 1rem;
    font-weight: 500;
    padding: 12px 0;
    border: 0;
    background: none;
  }
`;

const EditBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 217px;
  width: 100%;
  padding: 20px;
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: all 0.5s;
  visibility: ${(props) => (props.isEditToggle ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isEditToggle ? '1' : '0')};

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: "Pretendard", "Poppins";
    font-size: 0.875rem;
    color: ${palette.gray};
    border: 0;
    background: none;
  }
`;

const AccordionMenu = styled.div`
  width: 100%;
`;

const AccordionItem = styled.div`
  max-height: unset; /* 아코디언 컨텐츠가 사이드바 높이에 따라 자연스럽게 표시 */
  overflow-y: hidden; /* 개별 아코디언 컨텐츠는 넘치는 부분을 숨김 */
  .accordion-toggle {
    display: none;
  }

.accordion-label {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 0;
  border: 0;
  background: none;
  cursor: pointer;

  &:after {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    border-right: 2px solid ${palette.black};
    border-bottom: 2px solid ${palette.black};
    transition: all 0.5s;
    content: "";
  }
}

.accordion-label.open:after {
  transform: translateY(-50%) rotate(-135deg); /* 아이콘 회전 */
}

.accordion-toggle + .accordion-label + .scrollbar {
  max-height: 0;
  overflow-y: hidden;
  transition: max-height 0.5s ease, padding 0.5s ease;
}

.accordion-label.open + .scrollbar {
  max-height: calc(100vh - 26rem);
  overflow-y: auto;
}

.scrollbar {
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${palette.lineGray};
    border-radius: 10px;
  }
}

  .accordion-toggle:checked + .accordion-label:after {
    transform: translateY(-50%) rotate(-135deg);
  }

  .accordion-toggle:checked + .accordion-label + div {
    // max-height: 1000px;
    max-height: calc(100vh - 26rem);
    // margin-top:20px;
    padding: 0;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      background: ${palette.lineGray};
      border-radius: 10px;
    }
  }
`;

const AccordionContent = styled.div`
  max-height: 0;
  position: relative;
  overflow: hidden;
  padding: 0;
  transition: max-height 0.5s ease, padding 0.5s ease;

  > div {
    margin-top: 20px;
  }

  > div + div {
    margin-top: 30px;
  }

  strong {
    font-size: 0.75rem;
    font-weight: 400;
    color: ${palette.gray};
    text-align: left;
    display: block;
    margin-top: 20px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0 12px;
    // margin-top:10px;
  }

  p {
    width: 100%;
    min-height: 19px;
    font-family: "Pretendard", "Poppins";
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: ${palette.darkGray};
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-family: "Pretendard";
    font-size: 0.875rem;
    text-align: left;
    padding: 8px 0;
  }    

  li {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-family: "Pretendard";
    font-size: 0.875rem;
    color: ${palette.gray};
    text-align: left;
    padding: 0 0 0 22px;
    cursor: pointer;

    .insight-toggle {
      position: fixed;
      left: 0;
      transform: translateX(290px) translateY(-30px);
      width: 217px;
      display: block;
      z-index: 1000;
    }

    &:before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      font-family: "Pretendard", "Poppins";
      font-size:0.63rem;
      font-weight:700;
      color:${palette.darkGray};
      text-align:center;
      border-radius: 2px;
      background: #CECECE;
      content: "";
      transition: all 0.5s;
    }

    /* 비즈니스 */
    &[data-expert-index="0"]:before {
      width:15px;
      height:15px;
      line-height:15px;
      // background: #ff0000; 
      content:'B';
    }

    /* 전문가 */
    &[data-expert-index="1"]:before {
      width:15px;
      height:15px;
      line-height:15px;
      // background: #00ff00; 
      content:'E';
    }

    /* 추가질문 */
    &[data-expert-index="2"]:before {
      width:15px;
      height:15px;
      line-height:15px;
      // background: #800080;
      content:'A';
    }

    /* 사용자 추가질문 */
    &[data-expert-index="3"]:before {
      width:15px;
      height:15px;
      line-height:15px;
      // background: #ffa500; 
      content:'C';
    }

    p {
      width: 100%;
      min-height: 19px;
      font-family: "Pretendard", "Poppins";
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: ${palette.darkGray};
      display:inline-block;
    }

    span {
      font-size: 0.75rem;
      color: ${palette.lightGray};
      flex-shrink: 0;
      display: none;
      align-items: center;
    }

    &:hover {
      &:before {
        color:${palette.white};
        background: ${palette.blue};
      }

      span {
        display: flex;
      }
    }
  }
`;

const LoginButtonWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: auto;

  button {
    font-family: "Pretendard";
    color: ${palette.gray};
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
    background: ${palette.white};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    a {
      font-size: 0.75rem;
      color: ${palette.gray};

      &:last-child:before {
        width: 1px;
        height: 8px;
        display: inline-block;
        margin-right: 10px;
        background: ${palette.lineGray};
        content: "";
      }
    }
  }
`;

const LogoutBtnWrap = styled.div`
  justify-content: space-between !important;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray};

  > div {
    width: 85%;
    flex-direction: column;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray};

    strong {
      display: flex;
      width: 100%;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      width: 100%;
    }
  }

  button {
    width: 15px;
    height: 15px;
    font-size: 0;
    padding: 0;
    border: 0;
    flex-shrink: 0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.86724 2.23147L8.51621 1.47925C8.30624 1.02933 7.66602 1.03062 7.45787 1.48139L7.10987 2.23502C6.67141 3.18455 5.57856 3.63981 4.59565 3.28238L3.81553 2.9987C3.34892 2.82902 2.89712 3.28264 3.06868 3.74857L3.3555 4.52753C3.71689 5.509 3.26604 6.60367 2.31828 7.04596L1.56606 7.39699C1.11613 7.60695 1.11742 8.24718 1.56819 8.45533L2.32182 8.80333C3.27136 9.24179 3.72661 10.3346 3.36918 11.3175L3.0855 12.0977C2.91582 12.5643 3.36945 13.0161 3.83537 12.8445L4.61434 12.5577C5.5958 12.1963 6.69047 12.6472 7.13276 13.5949L7.48379 14.3471C7.69376 14.7971 8.33398 14.7958 8.54213 14.345L8.89013 13.5914C9.32859 12.6418 10.4214 12.1866 11.4044 12.544L12.1845 12.8277C12.6511 12.9974 13.1029 12.5437 12.9313 12.0778L12.6445 11.2989C12.2831 10.3174 12.734 9.22272 13.6817 8.78044L14.4339 8.4294C14.8839 8.21944 14.8826 7.57921 14.4318 7.37106L13.6782 7.02307C12.7286 6.5846 12.2734 5.49175 12.6308 4.50884L12.9145 3.72873C13.0842 3.26212 12.6306 2.81032 12.1646 2.98188L11.3857 3.2687C10.4042 3.63008 9.30953 3.17923 8.86724 2.23147ZM9.16348 1.1772C8.69645 0.176413 7.27237 0.179282 6.80938 1.18194L6.46138 1.93557C6.17858 2.548 5.47371 2.84163 4.83975 2.6111L4.05963 2.32742C3.02174 1.95 2.01679 2.959 2.39839 3.99537L2.68521 4.77434C2.9183 5.40737 2.62751 6.11341 2.01622 6.39868L1.264 6.74971C0.263217 7.21674 0.266087 8.64082 1.26874 9.10381L2.02237 9.45181C2.63481 9.73461 2.92844 10.4395 2.6979 11.0734L2.41422 11.8536C2.0368 12.8915 3.04581 13.8964 4.08218 13.5148L4.86114 13.228C5.49417 12.9949 6.20022 13.2857 6.48549 13.897L6.83652 14.6492C7.30355 15.65 8.72763 15.6471 9.19062 14.6445L9.53862 13.8908C9.82142 13.2784 10.5263 12.9848 11.1603 13.2153L11.9404 13.499C12.9783 13.8764 13.9832 12.8674 13.6016 11.831L13.3148 11.0521C13.0817 10.419 13.3725 9.71298 13.9838 9.42771L14.736 9.07668C15.7368 8.60965 15.7339 7.18557 14.7313 6.72258L13.9776 6.37458C13.3652 6.09178 13.0716 5.38691 13.3021 4.75295L13.5858 3.97283C13.9632 2.93493 12.9542 1.92998 11.9178 2.31158L11.1389 2.59841C10.5058 2.83149 9.79978 2.5407 9.51452 1.92941L9.16348 1.1772Z' fill='%238C8C8C'/%3E%3Cpath d='M10.7611 7.91279C10.7611 9.43735 9.52524 10.6732 8.00068 10.6732C6.47613 10.6732 5.24023 9.43735 5.24023 7.91279C5.24023 6.38824 6.47613 5.15234 8.00068 5.15234C9.52524 5.15234 10.7611 6.38824 10.7611 7.91279Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.00068 9.95896C9.13075 9.95896 10.0468 9.04286 10.0468 7.91279C10.0468 6.78273 9.13075 5.86663 8.00068 5.86663C6.87062 5.86663 5.95452 6.78273 5.95452 7.91279C5.95452 9.04286 6.87062 9.95896 8.00068 9.95896ZM8.00068 10.6732C9.52524 10.6732 10.7611 9.43735 10.7611 7.91279C10.7611 6.38824 9.52524 5.15234 8.00068 5.15234C6.47613 5.15234 5.24023 6.38824 5.24023 7.91279C5.24023 9.43735 6.47613 10.6732 8.00068 10.6732Z' fill='%238C8C8C'/%3E%3C/svg%3E")
      center no-repeat !important;
  }
`;

const LogoutToggle = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: ${(props) => (props.isToggle ? "0" : "1000px")};
  padding: ${(props) => (props.isToggle ? "0" : "20px")};
  overflow: hidden;
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  visibility: ${(props) => (props.isToggle ? "hidden" : "visible")};
  opacity: ${(props) => (props.isToggle ? "0" : "1")};
  // transition: max-height 0.5s ease, padding 0.5s ease;
  transform: translateX(260px);
  transition: all 0.5s;

  .info {
    font-size: 0.75rem;
    color: ${palette.gray};
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid ${palette.lineGray};
  }

  ul,
  strong,
  p {
    display: block;
    width: 100%;
    text-align: left;
    word-wrap: break-word;
    word-break: break-word;
  }

  li {
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;

    + li {
      margin-top: 20px;
    }

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0;
      border: 0;
      background: none;
    }
  }
`;