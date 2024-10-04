import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TITLE_OF_BUSINESS_INFORMATION,
  IS_CLICK_EXPERT_SELECT,
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER,
  SAVED_REPORTS,
  IS_EDITING_NOW,
  SELECTED_TAB_COPY_1,
  SELECTED_TAB_COPY_2,
  SELECTED_TAB_COPY_3,
  STRATEGY_REPORT_DATA,
  APPROACH_PATH,
  CONVERSATION_STAGE,
  SELECTED_ADDITIONAL_KEYWORD,
  CONVERSATION,
  isLoggedInAtom,
  IS_LOADING,
  REPORT_REFRESH_TRIGGER,
  CHAT_REFRESH_TRIGGER,
  ADDITIONAL_REPORT_DATA,
  IS_LOADING_ANALYSIS,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  RECOMMENDED_TARGET_DATA,
} from "../../../AtomStates";

import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import {
  saveConversationToIndexedDB,
  getConversationByIdFromIndexedDB,
} from "../../../../utils/indexedDB";
import MoleculeLoginPopup from "../../../Login_Sign/components/molecules/MoleculeLoginPopup"; // 로그인 팝업 컴포넌트 임포트

const MoleculeReportController = ({
  reportIndex,
  strategyReportID,
  conversationId,
  sampleData,
  report,
  additionalReportCount, // 추가 보고서 복사기능을 위한 인덱스
  showCopyOnly = false,
}) => {
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [selectedPocOptions, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
  const [isClickExpertSelect] = useAtom(IS_CLICK_EXPERT_SELECT);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
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
  const [
    tempMainFeaturesOfBusinessInformation,
    setTempMainFeaturesOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    tempMainCharacteristicOfBusinessInformation,
    setTempMainCharacteristicOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    tempMusinessInformationTargetCustomer,
    setTempBusinessInformationTargetCustomer,
  ] = useAtom(TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 관리
  const token = sessionStorage.getItem("accessToken");
  const [savedReports, setSavedReports] = useAtom(SAVED_REPORTS);
  const [reportRefreshTrigger, setReportRefreshTrigger] = useAtom(
    REPORT_REFRESH_TRIGGER
  ); // 리프레시 트리거 상태 구독
  const [chatRefreshTrigger, setChatRefreshTrigger] = useAtom(
    CHAT_REFRESH_TRIGGER
  ); // 리프레시 트리거 상태 구독
  
  const [bizAnalysisReportIndex, setBizAnalysisReportIndex] = useState(0);
  const [newAddContent, setNewAddContent] = useState("");
  const [isAddingNow, setIsAddingNow] = useState({
    section: "",
    isAdding: false,
  });
  const [newEditContent, setNewEditContent] = useState("");
  const [editingIndex, setEditingIndex] = useState({ section: "", index: -1 });
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [warningMessage, setWarningMessage] = useState("");

  const [selectedTabCopy1, setSelectedTabCopy1] = useAtom(SELECTED_TAB_COPY_1);
  const [selectedTabCopy2, setSelectedTabCopy2] = useAtom(SELECTED_TAB_COPY_2);
  const [selectedTabCopy3, setSelectedTabCopy3] = useAtom(SELECTED_TAB_COPY_3);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenCancel, setIsPopupOpenCancel] = useState(false);
  const [clickState, setClickState] = useState(false);

  const [isPopupSave, setIsPopupSave] = useState(false);

  const [approachPath] = useAtom(APPROACH_PATH);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false); // 로그인 팝업 상태 관리

  const [isPopupCopy, setIsPopupCopy] = useState(false);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useAtom(IS_LOADING_ANALYSIS);
  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  );
  const [selectedCustomerAdditionalKeyword, setSelectedCustomerAdditionalKeyword] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);

  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };
  const handleLoginClick = () => {
    setLoginPopupOpen(true); // 로그인 팝업 열기
  };
  const closeLoginPopup = () => {
    setLoginPopupOpen(false); // 로그인 팝업 닫기
  };
  const togglePopup = () => {
    if (clickState == false) {
      setIsPopupOpen(!isPopupOpen);
    }
  };
  const closePopupCopy = () => {
    setIsPopupCopy(false); // 팝업 닫기
  };
  const closePopupSave = () => {
    setIsPopupSave(false); // 팝업 닫기
  };

  const togglePopupCancel = () => {
    if (clickState == false) {
      setIsPopupOpenCancel(!isPopupOpenCancel);
      setIsAddingNow({ section: "", isAdding: false });
    }
  };
  const handleEditCancel = () => {
    setMainFeaturesOfBusinessInformation(tempMainFeaturesOfBusinessInformation);
    setMainCharacteristicOfBusinessInformation(
      tempMainCharacteristicOfBusinessInformation
    );
    setBusinessInformationTargetCustomer(tempMusinessInformationTargetCustomer);
    setIsEditingNow(false);
    setIsAddingNow({ section: "", isAdding: false });
    togglePopupCancel();
  };
  const [strategyReportData, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA);
  const [selectedTabCopyByExpert, setSelectedTabCopyByExpert] = useState({});
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const handleEditSave = async () => {
    if (editingIndex.section !== "" && editingIndex.index !== -1) {
      setWarningMessage("변경 사항을 적용해주세요.");
      return;
    }

    const existingConversation = await getConversationByIdFromIndexedDB(
      conversationId,
      isLoggedIn
    );

    const updatedConversation = {
      ...existingConversation,
      analysisReportData,
      expert_index: selectedExpertIndex,
      timestamp: Date.now(),
    };

    await saveConversationToIndexedDB(updatedConversation);
    setIsEditingNow(false);
  };

  const handleEditConfirm = () => {
    handleEditSave();
    setIsEditingNow(false);

    setTempMainFeaturesOfBusinessInformation(mainFeaturesOfBusinessInformation);
    setTempMainCharacteristicOfBusinessInformation(
      mainCharacteristicOfBusinessInformation
    );
    setTempBusinessInformationTargetCustomer(businessInformationTargetCustomer);

    saveConversationToIndexedDB(
      {
        id: conversationId,
        conversation: conversation,
        analysisReportData,
        inputBusinessInfo,
        conversationStage: 2,
        timestamp: Date.now(),
        expert_index: selectedExpertIndex,
        selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
        customerAdditionalReportData: customerAdditionalReportData,
        selectedPocOptions: selectedPocOptions,
        selectedPocTarget: selectedPocTarget,
      },
      isLoggedIn,
      conversationId
    );
  };

  const toggleSave = async () => {
    if (!isLoggedIn) {
      // 로그인 상태가 아닐 경우 팝업을 띄움
      setIsPopupOpen(true); // 팝업 열기
      return; // 로그인 상태가 아닐 경우 함수를 종료
    }

    setIsPopupSave(true); // 저장 팝업 열기

    let reportData;
    let business_info;

    if (reportIndex === 0) {
      // 비즈니스 분석 리포트 데이터 저장 (이 부분은 기존 로직을 유지합니다)
      reportData = {
        title: titleOfBusinessInfo,
        mainFeatures: mainFeaturesOfBusinessInformation,
        mainCharacter: mainCharacteristicOfBusinessInformation,
        mainCustomer: businessInformationTargetCustomer,
      };
      business_info = reportData.title;
    } else if (reportIndex === 1) {
      // 전략 보고서 데이터 저장 - sampleData 사용
      reportData = sampleData; // sampleData를 그대로 저장합니다
      business_info = reportData?.business_info || "Unknown Title";
    } else if (reportIndex === 4) {
      reportData = sampleData; // sampleData를 그대로 저장합니다
      business_info = titleOfBusinessInfo || "Unknown Title";
    }else {
      reportData = sampleData;
      business_info = reportData?.title || "Unknown Title";
    }

    // API에 저장 요청
    try {
      const accessToken = sessionStorage.getItem("accessToken"); // 저장된 토큰을 가져옴

      const postData = {
        business_info: business_info,
        title: business_info,
        date: new Date().toLocaleDateString(),
        content: reportData,
        reportIndex: reportIndex, // 보고서 인덱스를 추가하여 저장
      };

      // API로 보고서 저장 요청
      const response = await axios.post(
        "https://wishresearch.kr/panels/insight",
        postData, // 요청 본문에 보낼 데이터
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Bearer 토큰을 헤더에 추가
            "Content-Type": "application/json", // 필요에 따라 Content-Type 설정
          },
          withCredentials: true, // 쿠키와 함께 자격 증명을 전달 (optional)
        }
      );

      if (response.status === 200) {
        // 성공적으로 저장된 경우 savedReports 아톰 업데이트
        setSavedReports((prevReports) => [
          ...prevReports,
          {
            title: business_info,
            date: new Date().toLocaleDateString(),
            content: reportData,
            reportIndex: reportIndex, // reportIndex를 추가하여 저장
          },
        ]);

        // // 기존 대화 내역에 리포트 데이터 추가
        // const existingConversation = await getConversationByIdFromIndexedDB(
        //   conversationId,
        //   isLoggedIn
        // );

        // const updatedConversation = {
        //   ...existingConversation,
        //   analysisReportData:
        //     reportIndex === 0
        //       ? reportData
        //       : existingConversation.analysisReportData,
        //   strategyReportData:
        //     reportIndex === 1
        //       ? reportData
        //       : existingConversation.strategyReportData,
        //   additionalReportData:
        //     reportIndex === 2
        //       ? reportData
        //       : existingConversation.additionalReportData,
        //   timestamp: Date.now(),
        //   expert_index: selectedExpertIndex,
        // };

        // await saveConversationToIndexedDB(
        //   updatedConversation,
        //   isLoggedIn,
        //   conversationId
        // );
        setReportRefreshTrigger((prev) => !prev); // 트리거 상태를 반전시켜 OrganismLeftSideBar가 새로고침되도록 설정
      } else {
        console.error("API 응답 에러", response.status);
      }
    } catch (error) {
      console.error("API 요청 실패", error);
    }
  };

  const findGoalActionText = (index) => {
    const currentExpertData = strategyReportData[selectedExpertIndex];
    if (currentExpertData && currentExpertData.tabs[0] && currentExpertData.tabs[0].sections[0]) {
      const content = currentExpertData.tabs[0].sections[0].content[index];
      if (content && content.subContent) {
        for (let subItem of content.subContent) {
          if (subItem.subTitle === "목표 행위") {
            return subItem.text;
          }
        }
      }
    }
    return "목표 행위"; // 기본값
  };

  const toggleCopy = () => {
    let contentToCopy = '';
  
    const extractTextContent = (data) => {
      let textContent = '';
      if (typeof data === "string") {
        return data + "\n";
      }
      if (Array.isArray(data)) {
        data.forEach((item) => {
          textContent += extractTextContent(item);
        });
      } else if (typeof data === "object" && data !== null) {
        Object.values(data).forEach((value) => {
          textContent += extractTextContent(value);
        });
      }
      return textContent;
    };
  
    const getSelectedTabData = () => {
      const reportData = strategyReportData[strategyReportID];
      if (!reportData) return null;
    
      const selectedTabCopy = selectedTabCopyByExpert[strategyReportID] || 0;
      return reportData.tabs[selectedTabCopy];
    };
  
    const findGoalActionText = (index) => {
      const currentExpertData = strategyReportData[selectedExpertIndex];
      if (currentExpertData && currentExpertData.tabs[0] && currentExpertData.tabs[0].sections[0]) {
        const content = currentExpertData.tabs[0].sections[0].content[index];
        if (content && content.subContent) {
          for (let subItem of content.subContent) {
            if (subItem.subTitle === "목표 행위") {
              return subItem.text;
            }
          }
        }
      }
      return "목표 행위"; // 기본값
    };
  
    if (report && report.content) {
      switch (reportIndex) {
        case 0: // 비즈니스 분석 리포트
          contentToCopy = `
  ${report.content.title}
  
  주요 특징
  ${report.content.mainFeatures.join('\n')}
  
  주요 특성
  ${report.content.mainCharacter.join('\n')}
  
  목표 고객
  ${report.content.mainCustomer.join('\n')}
          `.trim();
          break;
          case 1: // 전략 보고서
          if (report.content.tabs) {
            const selectedTabData = report.content.tabs[selectedTabCopy1 || 0];
            contentToCopy = extractTextContent(selectedTabData);
          } else {
            contentToCopy = JSON.stringify(report.content, null, 2);
          }
          break;
        case 2: // 추가 질문
          if (Array.isArray(report.content)) {
            contentToCopy = report.content.map((item, index) => 
              `질문 ${index + 1}: ${item.question}\n답변: ${item.answer}`
            ).join('\n\n');
          } else {
            contentToCopy = JSON.stringify(report.content, null, 2);
          }
          break;
        case 3: // 고객 추가 질문
          if (Array.isArray(report.content)) {
            contentToCopy = report.content.map((item, index) => 
              `질문 ${index + 1}: ${item.question}\n답변: ${item.answer}`
            ).join('\n\n');
          } else {
            contentToCopy = JSON.stringify(report.content, null, 2);
          }
          break;
          case 4: // PoC 목적별 추천 타겟 및 예상 인사이트
          if (report.content.poc_persona) {
            contentToCopy = "PoC 목적별 추천 타겟 및 예상 인사이트\n\n";
            Object.entries(report.content.poc_persona).forEach(([key, value], index) => {
              const goalActionText = findGoalActionText(index);
              contentToCopy += `${index + 1}. ${goalActionText}\n`;
              contentToCopy += `   1. 추천 가상 페르소나 : ${value[0]["추천 가상 페르소나"]}\n`;
              contentToCopy += `   2. 이유 및 예상 인사이트 : ${value[1]["이유 및 예상 인사이트"]}\n\n`;
            });
          } else {
            contentToCopy = JSON.stringify(report.content, null, 2);
          }
          break;

        default:
          contentToCopy = JSON.stringify(report, null, 2);
          
      }
    } else {
      if (reportIndex === 0) {
        contentToCopy = `
  ${titleOfBusinessInfo}
  주요 특징
  ${mainFeaturesOfBusinessInformation?.map((feature) => `${feature}`).join("\n")}
  주요 특성
  ${mainCharacteristicOfBusinessInformation
    ?.map((character) => `${character}`)
    .join("\n")}
  목표 고객
  ${businessInformationTargetCustomer
    ?.map((customer) => `${customer}`)
    .join("\n")}
  `;
      } else if (reportIndex === 1) {
        // 전문가 보고서 복사 기능
        const selectedTabData = getSelectedTabData();
        contentToCopy = extractTextContent(selectedTabData);
      } else if (reportIndex === 2) {
        // 추가 질문 복사 기능
        contentToCopy = extractTextContent(additionalReportData[additionalReportCount]);
      } else if (reportIndex === 3) {
        contentToCopy = extractTextContent(customerAdditionalReportData[additionalReportCount]);
      } else if (reportIndex === 4) {
        if (recommendedTargetData && recommendedTargetData.poc_persona) {
          contentToCopy = "PoC 목적별 추천 타겟 및 예상 인사이트\n";
          Object.entries(recommendedTargetData.poc_persona).forEach(([key, value], index) => {
            const goalActionText = findGoalActionText(index);
            contentToCopy += `${index + 1}. ${goalActionText}\n`;
            contentToCopy += `1. 추천 가상 페르소나 : ${value[0]["추천 가상 페르소나"]}\n`;
            contentToCopy += `2. 이유 및 예상 인사이트 : ${value[1]["이유 및 예상 인사이트"]}\n`;
          });
        }
      }
    }
  
    navigator.clipboard
      .writeText(contentToCopy.trim())
      .then(() => {
        setIsPopupCopy(true); // 복사 팝업 열기
      })
      .catch((error) => {
        console.error("복사 실패", error);
      });
  };
  // const resetConversationState = () => {
  //   setTitleOfBusinessInfo([]);
  //   setMainFeaturesOfBusinessInformation([]);
  //   setMainCharacteristicOfBusinessInformation([]);
  //   setBusinessInformationTargetCustomer([]);
  //   setConversation([]);
  //   setConversationStage(1);
  //   setInputBusinessInfo("");

  //   saveConversationToIndexedDB(
  //     {
  //       id: conversationId,
  //       conversation: [],
  //       conversationStage: 1,
  //       inputBusinessInfo: "",
  //       analysisReportData: {
  //         title: [],
  //         mainFeatures: [],
  //         mainCharacter: [],
  //         mainCustomer: [],
  //       },
  //       timestamp: Date.now(),
  //       expert_index: selectedExpertIndex,
  //     },
  //     isLoggedIn,
  //     conversationId
  //   );
  // };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const data = {
    business_idea: inputBusinessInfo,
  };

  // 기초 보고서 재생성
  const regenerateReport = async () => {
    let businessData;

    setIsLoading(true);
    setIsLoadingAnalysis(true);

    // 버튼 클릭으로 API 호출
    const response = await axios.post(
      "https://wishresearch.kr/panels/business",
      data,
      axiosConfig
    );
    businessData = response.data.business_analysis;

    // 데이터를 받아온 직후 아톰에 값을 설정합니다.
    if (Array.isArray(businessData["주요_목적_및_특징"])) {
      setTempMainFeaturesOfBusinessInformation(
        businessData["주요_목적_및_특징"]?.map((item) => item)
      );
      setMainFeaturesOfBusinessInformation(
        businessData["주요_목적_및_특징"]?.map((item) => item)
      );
    } else {
      setTempMainFeaturesOfBusinessInformation(
        businessData["주요_목적_및_특징"]
          ? [businessData["주요_목적_및_특징"]]
          : []
      );
      setMainFeaturesOfBusinessInformation(
        businessData["주요_목적_및_특징"]
          ? [businessData["주요_목적_및_특징"]]
          : []
      );
    }

    if (Array.isArray(businessData["주요기능"])) {
      setTempMainCharacteristicOfBusinessInformation(
        businessData["주요기능"]?.map((item) => item)
      );
      setMainCharacteristicOfBusinessInformation(
        businessData["주요기능"]?.map((item) => item)
      );
    } else {
      setTempMainCharacteristicOfBusinessInformation(
        businessData["주요기능"] ? [businessData["주요기능"]] : []
      );
      setMainCharacteristicOfBusinessInformation(
        businessData["주요기능"] ? [businessData["주요기능"]] : []
      );
    }

    if (Array.isArray(businessData["목표고객"])) {
      setTempBusinessInformationTargetCustomer(
        businessData["목표고객"]?.map((item) => item)
      );
      setBusinessInformationTargetCustomer(
        businessData["목표고객"]?.map((item) => item)
      );
    } else {
      setTempBusinessInformationTargetCustomer(
        businessData["목표고객"] ? [businessData["목표고객"]] : []
      );
      setBusinessInformationTargetCustomer(
        businessData["목표고객"] ? [businessData["목표고객"]] : []
      );
    }

    // 명칭은 배열이 아니므로 기존 방식 유지
    setTitleOfBusinessInfo(businessData["명칭"]);

    // 아톰이 업데이트된 후에 analysisReportData를 생성합니다.
    const analysisReportData = {
      title: businessData["명칭"],
      mainFeatures: Array.isArray(businessData["주요_목적_및_특징"])
        ? businessData["주요_목적_및_특징"]
        : [],
      mainCharacter: Array.isArray(businessData["주요기능"])
        ? businessData["주요기능"]
        : [],
      mainCustomer: Array.isArray(businessData["목표고객"])
        ? businessData["목표고객"]
        : [],
    };

    await saveConversationToIndexedDB(
      {
        id: conversationId,
        conversation: conversation,
        analysisReportData,
        inputBusinessInfo,
        conversationStage: 2,
        timestamp: Date.now(),
        expert_index: selectedExpertIndex,
        selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
        customerAdditionalReportData: customerAdditionalReportData,
        selectedPocOptions: selectedPocOptions,
        selectedPocTarget: selectedPocTarget,
      },
      isLoggedIn,
      conversationId
    );
    setChatRefreshTrigger((prev) => !prev);
    // setReportRefreshTrigger((prev) => !prev);
    setIsLoadingAnalysis(false);
    setIsLoading(false);
  };

  return (
    <>
      {reportIndex === 0 ? (
        <>
          {conversationStage > 2 ? (
            <ButtonWrap>
              <div />
              <div>
                <button type="button" onClick={toggleCopy}>
                  <img src={images.IconCopy} alt="" />
                  복사하기
                </button>
                <button type="button" onClick={toggleSave}>
                  <img src={images.IconSave} alt="" />
                  저장하기
                </button>
              </div>
            </ButtonWrap>
          ) : (
            <>
              {!isEditingNow ? (
                <ButtonWrap>
                  <div />
                  {/* <button type="button" onClick={handleRetryIdea}>
                    <img src={images.IconWrite2} alt="" />
                    아이디어 설명 다시 하기
                  </button> */}
                  <div>
                    <button type="button" onClick={regenerateReport}>
                      <img src={images.IconRefresh} alt="" />
                      재생성하기
                    </button>
                    <button type="button" onClick={() => setIsEditingNow(true)}>
                      <img src={images.IconEdit} alt="" />
                      수정하기
                    </button>
                    <button type="button" onClick={toggleCopy}>
                      <img src={images.IconCopy} alt="" />
                      복사하기
                    </button>
                    <button type="button" onClick={toggleSave}>
                      <img src={images.IconSave} alt="" />
                      저장하기
                    </button>
                  </div>
                </ButtonWrap>
              ) : (
                <ButtonWrap>
                  <div />
                  <div>
                    <button
                      type="button"
                      className="lineBtn"
                      onClick={togglePopupCancel}
                    >
                      취소하기
                    </button>
                    <button
                      type="button"
                      className="lineBtn"
                      onClick={() => handleEditConfirm()}
                    >
                      수정 완료하기
                    </button>
                  </div>
                </ButtonWrap>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <ButtonWrap>
            <div />
            <div>
              {/* {selectedAdditionalKeyword.length === 0 && (
                <button type="button" onClick={regenerateReport}>
                  <img src={images.IconRefresh} alt="" />
                  재생성하기
                </button>
              )} */}
              <button type="button" onClick={toggleCopy}>
                <img src={images.IconCopy} alt="" />
                복사하기
              </button>
              <button type="button" onClick={toggleSave}>
                <img src={images.IconSave} alt="" />
                저장하기
              </button>
            </div>
          </ButtonWrap>
        </>
      )}

      {isPopupOpen && (
        <Popup
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              togglePopup();
            }
          }}
        >
          <div>
            <button type="button" className="closePopup" onClick={togglePopup}>
              닫기
            </button>
            <span>
              <img src={images.CheckMark} alt="" />
            </span>
            <p>
              해당 기능을 사용하시려면 로그인이 필요해요
              <br />
              로그인 하시겠습니까?
            </p>
            <div className="btnWrap">
              <button type="button" onClick={handleSignupClick}>
                회원가입
              </button>
              <button type="button" onClick={handleLoginClick}>
                로그인
              </button>
            </div>
          </div>
        </Popup>
      )}

      {isPopupOpenCancel && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              togglePopupCancel();
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={togglePopupCancel}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>
              <strong>정말 취소하시겠습니까?</strong>
              <span>취소 시 수정하신 내용은 저장되지 않습니다</span>
            </p>
            <div className="btnWrap">
              <button type="button" onClick={togglePopupCancel}>
                아니오
              </button>
              <button type="button" onClick={handleEditCancel}>
                네, 취소할게요
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isPopupCopy && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupCopy();
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupCopy}
            >
              닫기
            </button>
            <span>
              <img src={images.CheckMark} alt="" />
            </span>
            <p>복사가 완료되었습니다</p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupCopy}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}

      {isPopupSave && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupSave(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupSave}
            >
              닫기
            </button>
            <span>
              <img src={images.CheckMark} alt="" />
            </span>
            <p>
              저장되었습니다.
              <br />
              인사이트 보관함을 확인해주세요
            </p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupSave}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}

      {isPopupCopy && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupCopy(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupCopy}
            >
              닫기
            </button>
            <span>
              <img src={images.CheckMark} alt="" />
            </span>
            <p>복사가 완료되었습니다</p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupCopy}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}

      {isLoginPopupOpen && <MoleculeLoginPopup onClose={closeLoginPopup} />}
    </>
  );
};

export default MoleculeReportController;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 20px !important;
  // padding-top: 20px;
  // border-top: 1px solid ${palette.lineGray};

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Pretendard";
    font-size: 0.75rem;
    color: ${palette.gray};
    padding: 4px 8px;
    border-radius: 5px;
    border: 0;
    background: none;
    transition: all 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
  }

  .lineBtn {
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  > button {
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }
`;

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
    }

    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 8px;
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
            font-weight: 500;
            display: block;
          }
          span {
            font-size: 0.75rem;
            font-weight: 400;
            color: ${palette.gray500};
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            font-family: "Pretendard", "Poppins";
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
