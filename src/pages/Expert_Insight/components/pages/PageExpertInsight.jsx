import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  APPROACH_PATH,
  STRATEGY_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA, // Import the new list-based atom
  CONVERSATION_STAGE,
  iS_CLICK_CHECK_REPORT_RIGHTAWAY,
  CONVERSATION,
  BUTTON_STATE,
  isLoggedInAtom,
  CONVERSATION_ID,
  ADDITIONAL_REPORT_COUNT,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITION_BUTTON_STATE,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_LIST,
  IS_LOADING,
  SAVED_TIMESTAMP,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  RECOMMENDED_TARGET_DATA,
  POC_DETAIL_REPORT_ATOM,
  POC_PERSONA_LIST,
} from "../../../AtomStates";

import {
  saveConversationToIndexedDB,
  getConversationByIdFromIndexedDB,
} from "../../../../utils/indexedDB";
import { createChatOnServer } from "../../../../utils/indexedDB"; // 서버와 대화 ID 생성 함수

import OrganismLeftSideBar from "../organisms/OrganismLeftSideBar";
import OrganismRightSideBar from "../organisms/OrganismRightSideBar";
import OrganismBizAnalysisSection from "../organisms/OrganismBizAnalysisSection";
import OrganismStrategyReportSection from "../organisms/OrganismStrategyReportSection";
import OrganismPocReportSection from "../organisms/OrganismPocReportSection";
import OrganismSearchBottomBar from "../organisms/OrganismSearchBottomBar";
import MoleculeBizName from "../molecules/MoleculeBizName";
import MoleculeSystemMessage from "../molecules/MoleculeSystemMessage";
import MoleculeUserMessage from "../molecules/MoleculeUserMessage";
import OrganismBizExpertSelect from "../organisms/OrganismBizExpertSelect";
import MoleculeAdditionalKeyword from "../molecules/MoleculeAdditionalKeyword";
import OrganismAdditionalReport from "../organisms/OrganismAdditionalReport";
import MoleculeCheckReportRightAway from "../molecules/MoleculeCheckReportRightAway";
import MoleculeCheckPocRightAway from "../molecules/MoleculeCheckPocRightAway";
import MoleculeCheckPocOption from "../molecules/MoleculeCheckPocOption";
import OrganismCustomerAdditionalReport from "../organisms/OrganismCustomerAdditionalReport";
import MoleculePersonaSelect from "../molecules/MoleculePersonaSelect";
import MoleculeRecommendedTargetButton from "../molecules/MoleculeRecommendedTargetButton";
import OrganismRecommendedTargetReport from "../organisms/OrganismRecommendedTargetReport";

const PageExpertInsight = () => {
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [isLoadingPage, setIsLoadingPage] = useState(true); // 로딩 상태 추가
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const navigate = useNavigate();
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(IS_EXPERT_INSIGHT_ACCESSIBLE);

  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
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
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [sections, setSections] = useState([]);

  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);

  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);

  const [customerAdditionalReportData, setCustomerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);

  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  const [additionalReportData, setAdditionalReportData] = useAtom(ADDITIONAL_REPORT_DATA); // Use the new list-based atom

  const [strategyReportData, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA); // 변경된 부분

  const [inputAdditionalQuestion, setInputAdditionalQuestion] = useState("");
  const [isClickCheckReportRightAway, setIsClickCheckReportRightAway] = useAtom(iS_CLICK_CHECK_REPORT_RIGHTAWAY);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인
  const [advise, setAdvise] = useState(""); // 새로운 advise 상태 추가

  const [selectedExpertList, setSelectedExpertList] = useAtom(SELECTED_EXPERT_LIST);
  
  const [savedTimestamp, setSavedTimestamp] = useAtom(SAVED_TIMESTAMP);

  const [selectedPocOptions, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);

  const [pocDetailReportData, setpocDetailReportData] = useAtom(POC_DETAIL_REPORT_ATOM);
  
  let additionalReportCount = 0;
  let customerAdditionalReportCount = 0;

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const saveConversation = async (updatedConversation, newConversationStage) => {
    const existingReports = {
      strategyReportData: strategyReportData, // 변경된 부분
    };

    // IndexedDB에서 기존 데이터를 가져옴
    const existingData = await getConversationByIdFromIndexedDB(conversationId, isLoggedIn);

    // 기존의 selectedAdditionalKeyword가 있으면 병합
    const updatedSelectedAdditionalKeyword = existingData?.selectedAdditionalKeyword
      ? [...existingData.selectedAdditionalKeyword, ...selectedAdditionalKeyword]
      : selectedAdditionalKeyword;
    const updatedSelectedCustomerAdditionalKeyword = existingData?.selectedCustumoerdditionalKeyword
      ? [...existingData.selectedCustumoerdditionalKeyword, ...selectedCustomerAdditionalKeyword]
      : selectedCustomerAdditionalKeyword;
    saveConversationToIndexedDB(
      {
        id: conversationId,
        conversation: updatedConversation,
        conversationStage: newConversationStage,
        inputBusinessInfo,
        analysisReportData,
        selectedAdditionalKeyword: updatedSelectedAdditionalKeyword,
        additionalReportData, // Save the entire list of additional reports
        additionalReportCount,
        customerAdditionalReportCount,
        customerAdditionalReportData,
        selectedCustomerAdditionalKeyword: updatedSelectedCustomerAdditionalKeyword,
        ...existingReports,
        timestamp: Date.now(),
        expert_index: selectedExpertIndex,
        selectedPocOptions: selectedPocOptions,
        pocPersonaList: pocPersonaList,
        selectedPocTarget: selectedPocTarget,
        recommendedTargetData: recommendedTargetData,
        pocDetailReportData : pocDetailReportData,
      },
      isLoggedIn,
      conversationId
    );
  };

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isExpertInsightAccessible) {
      navigate('/'); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsExpertInsightAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, [navigate]);

  useEffect(() => {
    const loadConversation = async () => {
      // 1. 로그인 여부 확인
      if (isLoggedIn) {
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
        if (!conversationId) {
          try {
            // 서버에서 새로운 대화 ID 생성
            const newConversationId = await createChatOnServer();
            setConversationId(newConversationId); // 생성된 대화 ID 설정
            setIsExpertInsightAccessible(true); 
            setIsLoadingPage(false); // 로딩 완료
            // 새로운 대화 ID로 경로 변경
            navigate(`/conversation/${newConversationId}`, { replace: true });
          } catch (error) {
            setIsLoadingPage(false); // 로딩 완료
            setIsExpertInsightAccessible(true); 
            console.error("Failed to create conversation on server:", error);
            navigate(`/conversation/${conversationId}`, { replace: true });
          }
        } else {
          // 3. 대화 ID가 이미 존재하면 IndexedDB에서 대화 불러오기
          const savedConversation = await getConversationByIdFromIndexedDB(conversationId, isLoggedIn);

          if (savedConversation) {
            setSelectedExpertIndex(savedConversation.expert_index !== undefined ? savedConversation.expert_index : 0);
            const analysisData = savedConversation.analysisReportData || {};
            setTitleOfBusinessInfo(analysisData.title || "");
            setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
            setMainCharacteristicOfBusinessInformation(analysisData.mainCharacter || []);
            setBusinessInformationTargetCustomer(analysisData.mainCustomer || []);

            // 복구된 데이터를 로컬 상태로 설정
            setConversation(savedConversation.conversation);
            setConversationStage(savedConversation.conversationStage);
            setInputBusinessInfo(savedConversation.inputBusinessInfo);

            // 전략 보고서 데이터 복구
            setStrategyReportData(savedConversation.strategyReportData || {}); // 변경된 부분
            setAdditionalReportData(savedConversation.additionalReportData || []);
            setSelectedAdditionalKeyword(savedConversation.selectedAdditionalKeyword || []);
            setSelectedCustomerAdditionalKeyword(savedConversation.selectedCustomerAdditionalKeyword || []);
            setCustomerAdditionalReportData(savedConversation.customerAdditionalReportData || []);

            setSelectedPocOptions(savedConversation.selectedPocOptions || []);
            setSelectedPocTarget(savedConversation.selectedPocTarget || {});
            setRecommendedTargetData(savedConversation.recommendedTargetData || {});
            setpocDetailReportData(savedConversation.pocDetailReportData || {});
            setPocPersonaList(savedConversation.pocPersonaList || []);
            
            // 대화 단계가 초기 상태라면 초기 시스템 메시지 설정
            if (savedConversation.conversationStage === 1) {
              const initialMessage = getInitialSystemMessage();
              setConversation([
                {
                  type: "system",
                  message: initialMessage,
                  expertIndex: selectedExpertIndex,
                },
              ]);
            }
          } else {
            // 저장된 대화가 없으면 초기 메시지 설정
            if (selectedExpertIndex) {
              const initialMessage = getInitialSystemMessage();
              setConversation([
                {
                  type: "system",
                  message: initialMessage,
                  expertIndex: selectedExpertIndex,
                },
              ]);
            }
          }
          setIsLoadingPage(false); // 로딩 완료
        }
      } else {
        // 4. 비로그인 상태인 경우, 새로운 로컬 대화 ID 생성 또는 기존 대화 로드
        if (!conversationId) {
          setConversationId(nanoid()); // 비로그인 시 로컬에서 새로운 ID 생성
          setIsLoadingPage(false); // 로딩 완료
          setIsExpertInsightAccessible(true); 
          navigate(`/conversation/${conversationId}`, { replace: true });
        } else {
          const savedConversation = await getConversationByIdFromIndexedDB(conversationId, isLoggedIn);
          if (savedConversation) {
            const analysisData = savedConversation.analysisReportData || {};
            setTitleOfBusinessInfo(analysisData.title || "");
            setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
            setMainCharacteristicOfBusinessInformation(analysisData.mainCharacter || []);
            setBusinessInformationTargetCustomer(analysisData.mainCustomer || []);

            // 복구된 데이터를 로컬 상태로 설정
            setConversation(savedConversation.conversation);
            setConversationStage(savedConversation.conversationStage);
            setInputBusinessInfo(savedConversation.inputBusinessInfo);

            // 전략 보고서 데이터 복구
            setStrategyReportData(savedConversation.strategyReportData || {}); // 변경된 부분

            setAdditionalReportData(savedConversation.additionalReportData || []);
            setSelectedAdditionalKeyword(savedConversation.selectedAdditionalKeyword || []);

            // 대화 단계가 초기 상태라면 초기 시스템 메시지 설정
            if (savedConversation.conversationStage === 1) {
              const initialMessage = getInitialSystemMessage();
              setConversation([
                {
                  type: "system",
                  message: initialMessage,
                  expertIndex: selectedExpertIndex,
                },
              ]);
            }
          } else {
            // 저장된 대화가 없으면 초기 메시지 설정
            if (selectedExpertIndex) {
              const initialMessage = getInitialSystemMessage();
              setConversation([
                {
                  type: "system",
                  message: initialMessage,
                  expertIndex: selectedExpertIndex,
                },
              ]);
            }
          }
          setIsLoadingPage(false); // 로딩 완료
        }
      }
    };

    loadConversation();
  }, [conversationId, isLoggedIn, navigate]);

  // ... 나머지 코드 (변경 없음)

  // 전문가 선택 표시 조건 수정
 // 검색을 통해 들어왔으면 handleSearch 실행
 useEffect(() => {
  if (conversationId && conversationId.length >= 2) {
    if (approachPath === -1) {
      handleSearch(-1);
    } else if (approachPath === 1) {
      setInputBusinessInfo("");
      const initialMessage = getInitialSystemMessage();
      setConversation([
        {
          type: "system",
          message: initialMessage,
          expertIndex: selectedExpertIndex,
        },
      ]);
    }
  }
}, [approachPath, selectedExpertIndex, isLoadingPage]);

useEffect(() => {
  if (
    conversationId &&
    conversationId.length >= 2 &&
    selectedAdditionalKeyword &&
    !isLoadingPage &&
    approachPath !== 2
  ) {
    handleSearch(-1);
  }
}, [selectedAdditionalKeyword]);
// useEffect(() => {
//   console.log(22222222)
//   if (selectedAdditionalKeyword) handleSearch(-1);
// }, [
//   selectedAdditionalKeyword,
// ]);

useEffect(() => {
  if (
    conversationId &&
    conversationId.length >= 2 &&
    approachPath !== 2 &&
    !isLoadingPage
  ) {
    handleSearch(-1);
  }
}, [selectedExpertIndex]);

useEffect(() => {
  if (
    conversationId &&
    conversationId.length >= 2 &&
    isClickCheckReportRightAway &&
    !isLoadingPage
  ) {
    handleSearch(-1);
  }
}, [isClickCheckReportRightAway]);

const handleSearch = async (inputValue) => {
  if (isLoggedIn) {
    if (!conversationId) {
      try {
        return;
      } catch (error) {
        console.error("Failed to create conversation on server:", error);
        return;
      }
    }
  }

  const updatedConversation = [...conversation];

  // 사용자가 입력한 경우에만 inputBusinessInfo를 업데이트
  if (conversationStage === 1 && inputValue !== -1) {
    setInputBusinessInfo(inputValue);
    updatedConversation.push({ type: "user", message: inputValue });
  }

  let newConversationStage = conversationStage;

  if (conversationStage === 1) {
    if (inputBusinessInfo || inputValue !== -1) {
      const businessInfo = inputBusinessInfo || inputValue;
      updatedConversation.push(
        {
          type: "system",
          message: `아이디어를 입력해 주셔서 감사합니다!\n지금부터 아이디어를 세분화하여 주요한 특징과 목표 고객을 파악해보겠습니다 🙌🏻`,
          expertIndex: selectedExpertIndex,
        },
        { type: "analysis", businessInfo }
      );
      newConversationStage = 2;
    }
  } else if (conversationStage > 1 && inputValue !== -1) {
    if (
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "keyword") ||
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "reportButton") ||
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "pocTargetButton")
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: inputValue,
      },
      {
        type: `customerAddition`,
        addition_index: customerAdditionalReportCount,
      }
    );
  }else if (conversationStage === 2 && titleOfBusinessInfo) {
    if (
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "keyword") ||
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "reportButton") ||
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "pocTargetButton")
    ) {
      updatedConversation.pop();
    }

    // 전문가 선택영역 표시 관련, 선택된 전문가 인덱스 추가
    setSelectedExpertList((prevList) => {
      if (prevList.includes(selectedExpertIndex)) {
        return prevList;
      }
      return [...prevList, selectedExpertIndex];
    });

    // 보고서 바로보기 버튼 눌렀을 때
    if (isClickCheckReportRightAway) {
      if (selectedExpertIndex === "1") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "보고서를 확인하고 싶습니다. 분석 결과를 기반으로 멋진 전략 부탁드립니다. 🙌🏻",
          },
          {
            type: "system",
            message: `${titleOfBusinessInfo}를 성장 시킬 맞춤형 전략 보고서를 준비했습니다. 이 전략을 통해 성과를 극대화 할 수 있기를 바랍니다`,
            expertIndex: selectedExpertIndex,
          }
        );
      } else if (selectedExpertIndex === "2") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "보고서를 확인하고 싶습니다. 어떤 마케팅 방법이 있을지 궁금해요. 🙌🏻",
          },
          {
            type: "system",
            message: `${titleOfBusinessInfo}의 마케팅 기회를 극대화 할 보고서를 준비했습니다. 이 전략을 통해 고객과의 연결을 강화할 수 있길 바래요`,
            expertIndex: selectedExpertIndex,
          }
        );
      } else if (selectedExpertIndex === "3") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "보고서를 확인하고 싶습니다. 제가 보지 못한 고객 인사이트는 무엇이 있을까요. 🙌🏻",
          },
          {
            type: "system",
            message: `${titleOfBusinessInfo}의 고객의 요구와 니즈를 반영하여 전략을 제안드립니다. 이 보고서로 고객 이해도를 높여 더 효과적인 전략을 수립해 보세요`,
            expertIndex: selectedExpertIndex,
          }
        );
      } else if (selectedExpertIndex === "4") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "보고서를 확인하고 싶습니다. 새로운 PoC 아이디어가 필요합니다. 🙌🏻",
          },
          {
            type: "system",
            message: `${titleOfBusinessInfo}를 위한 PoC 보고서를 준비했습니다. 이 보고서를 통해 새로운 아이디어를 발견할 수 있기를 바랍니다`,
            expertIndex: selectedExpertIndex,
          }
        );
      }
    } else {
      if (selectedExpertIndex === "1") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "10년차 전략 디렉터와 1:1 커피챗, 지금 바로 시작하겠습니다 🙌🏻",
          },
          {
            type: "system",
            message:
              "안녕하세요! 저는 전략 전문가 김도원입니다. 😊 여러분의 아이디어를 구체화하고, 성공적인 전략을 세우는 데 도움을 드리겠습니다.\n아이디어나 비즈니스 아이템을 간단히 작성해 주세요. 분석 후, 여러분의 비즈니스에 맞는 전략 리포트를 제공하겠습니다!",
            expertIndex: selectedExpertIndex,
          }
        );
      } else if (selectedExpertIndex === "2") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "마케팅 전문가님의 맞춤 브랜딩 제안서를 요청드려요. 멋진 마케팅 방법을 기대합니다.💡",
          },
          {
            type: "system",
            message:
              "안녕하세요! 마케팅 전문가 이지현입니다. 😄 여러분의 아이디어를 효과적으로 시장에 알릴 수 있는 전략을 함께 고민해 보아요.\n아이디어나 비즈니스 아이템을 여기에 작성해 주세요. 제가 분석하고, 효과적인 마케팅 전략 리포트를 준비해 드리겠습니다!",
            expertIndex: selectedExpertIndex,
          }
        );
      } else if (selectedExpertIndex === "3") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "고객 인사이트를 파악하는 것이 시작이라고 생각합니다.✨ 전문가님의 분석과 제안 내용이 큰 도움이 될 것 같습니다.",
          },
          {
            type: "system",
            message:
              "반갑습니다! 저는 고객 인사이트 전문가 박서연입니다. 😊 여러분의 비즈니스가 목표 고객에게 잘 다가갈 수 있도록 돕겠습니다.\n아이디어나 비즈니스 아이템을 작성해 주세요. 분석 후, 타겟 고객을 정의하고 세분화 방법에 대한 리포트를 제공해 드리겠습니다!",
            expertIndex: selectedExpertIndex,
          }
        );
      } else if (selectedExpertIndex === "4") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "새로운 PoC 전문가와의 상담을 시작하겠습니다. 새로운 아이디어를 기대합니다.✨",
          },
          {
            type: "system",
            message:
              "안녕하세요! PoC 전문가 이민재입니다. 😊 여러분의 아이디어를 현실화하는 데 도움을 드리겠습니다.\n아이디어나 비즈니스 아이템을 작성해 주세요. 분석 후, 효과적인 PoC 전략 리포트를 제공해 드리겠습니다!",
            expertIndex: selectedExpertIndex,
          }
        );
      }
    }

    // selectedExpertIndex에 따라 적절한 타입을 업데이트
    if (selectedExpertIndex === "4") {
      updatedConversation.push({ type: `poc_${selectedExpertIndex}` });
    } else {
      updatedConversation.push({ type: `strategy_${selectedExpertIndex}` });
    }

    newConversationStage = 3;
  }
 else if (conversationStage === 3) {
    if (
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "keyword") ||
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "reportButton") ||
      (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type ===
          "pocTargetButton")
    ) {
      updatedConversation.pop();
    }

    updatedConversation.push(
      {
        type: "user",
        message: `제 프로젝트와 관련된 "${
          selectedAdditionalKeyword[selectedAdditionalKeyword.length - 1]
        }"를 요청드려요`,
      },
      { type: `addition`, addition_index: additionalReportCount }
    );
  }
  setConversation(updatedConversation);
  setConversationStage(newConversationStage);
  saveConversation(updatedConversation, newConversationStage);
  setIsLoadingPage(false); // 로딩 완료
};

// 스크롤
const [isScrolled, setIsScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 160) {
      setIsScrolled(true); // 스크롤이 내려가면 상태를 true로 변경
    } else {
      setIsScrolled(false); // 스크롤이 최상단에 있을 때 상태를 false로 변경
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll); // 메모리 누수 방지
  };
}, []);

const getInitialSystemMessage = () => {
  switch (selectedExpertIndex) {
    case "1":
      return "안녕하세요! 저는 전략 전문가 김도원입니다. 😊 여러분의 아이디어를 구체화하고, 성공적인 전략을 세우는 데 도움을 드리겠습니다.\n아이디어나 비즈니스 아이템을 간단히 작성해 주세요. 분석 후, 여러분의 비즈니스에 맞는 전략 리포트를 제공하겠습니다!";
    case "2":
      return "안녕하세요! 마케팅 전문가 이지현입니다. 😄 여러분의 아이디어를 효과적으로 시장에 알릴 수 있는 전략을 함께 고민해 보아요.\n아이디어나 비즈니스 아이템을 여기에 작성해 주세요. 제가 분석하고, 효과적인 마케팅 전략 리포트를 준비해 드리겠습니다!";
    case "3":
      return "반갑습니다! 저는 고객 인사이트 전문가 박서연입니다. 😊 여러분의 비즈니스가 목표 고객에게 잘 다가갈 수 있도록 돕겠습니다.\n아이디어나 비즈니스 아이템을 작성해 주세요. 분석 후, 타겟 고객을 정의하고 세분화 방법에 대한 리포트를 제공해 드리겠습니다!";
    case "4":
      return "안녕하세요. 저는 PoC 설계 전문가 장석훈입니다. PoC 설계를 위해 아이템에 대한 설명을 해주세요 📝"
    default:
      return "비즈니스(아이디어)를 입력해주세요.";
  }
};

if (isLoadingPage) {
  return <div>Loading...</div>;
}

  return (
    <>
      <ContentsWrap>
        <OrganismLeftSideBar />

        <MainContent>
          <div>
            <ChatWrap className={isScrolled ? "scrolled" : ""}>
              <MoleculeBizName date={savedTimestamp} />
              {conversation?.map((item, index) => {
                if (item.type === "user") {
                  return <MoleculeUserMessage key={index} message={item.message} />;
                } else if (item.type === "system") {
                  return <MoleculeSystemMessage key={index} item={item} />;
                } else if (item.type === "analysis") {
                  return <OrganismBizAnalysisSection conversationId={conversationId} />;
                } else if (item.type.startsWith("strategy_")) {
                  const expertIndex = item.type.split("_")[1];
                  return (
                    <OrganismStrategyReportSection
                      key={`strategy_${expertIndex}_${index}`}
                      conversationId={conversationId}
                      expertIndex={expertIndex}
                    />
                  );
                } else if (item.type.startsWith("poc_")) {
                  const expertIndex = item.type.split("_")[1];
                  return (
                    <>
                      <OrganismPocReportSection
                        key={`poc_${expertIndex}_${index}`}
                        conversationId={conversationId}
                        expertIndex={expertIndex}
                      />
                    </>
                  );
                } else if (item.type.startsWith("pocTarget_")) {
                    const expertIndex = item.type.split("_")[1];
                    return (
                      <>
                        <OrganismRecommendedTargetReport
                          key={`pocTarget_${expertIndex}_${index}`}
                          conversationId={conversationId}
                          expertIndex={expertIndex}
                        />
                      </>
                    );
                } else if (item.type === "addition") {
                  const currentAdditionalReportCount = additionalReportCount++;
                  return (
                    <OrganismAdditionalReport
                      additionalReportCount={currentAdditionalReportCount}
                      conversationId={conversationId}
                    />
                  );
                } else if (item.type === "customerAddition") {
                  const currentCustomerAdditionalReportCount = customerAdditionalReportCount++;
                  return (
                    <OrganismCustomerAdditionalReport
                      customerAdditionalReportCount={currentCustomerAdditionalReportCount}
                      conversationId={conversationId}
                    />
                  );
                } else if (item.type === "keyword") {
                  return <MoleculeAdditionalKeyword />;
                } else if (item.type === "reportButton") {
                  return <MoleculeCheckReportRightAway />;
                } else if (item.type === "pocPlanButton") {
                  return <MoleculeCheckPocRightAway />;
                } else if (item.type === "pocTargetButton") {
                  return <MoleculeRecommendedTargetButton />;
                } else if (item.type === "pocOption") {
                  return <MoleculeCheckPocOption conversationId={conversationId}/>;
                } else if (item.type === "pocPersona") {
                  return <MoleculePersonaSelect conversationId={conversationId}/>;
                }
                return null;
              })}

              {selectedExpertIndex !== "4" ?
                <>
                {/* 검색해서 시작 */}
                {(approachPath === -1 || approachPath === 3) && 
                  titleOfBusinessInfo &&
                  <OrganismBizExpertSelect />
                }

                {/* 전문가 선택하고 시작 */}
                {approachPath === 1 &&
                  Object.keys(strategyReportData).length !== 0 &&
                  !isLoading &&
                    <OrganismBizExpertSelect />
                }

                {/* 히스토리로 진입 시 */}
                {approachPath === 2 && 
                  titleOfBusinessInfo &&
                  conversation.length > 0 &&
                  conversation[conversation.length - 1].type !== "reportButton" &&
                  !isLoading &&
                    <OrganismBizExpertSelect />
                }
                </>
              :
                <>
                {/* 검색해서 시작 */}
                {(approachPath === -1 || approachPath === 3) && 
                  titleOfBusinessInfo &&
                  Object.keys(recommendedTargetData).length !== 0 && 
                  <OrganismBizExpertSelect />
                }

                {/* 4번 전문가 선택하고 시작 */}
                {approachPath === 1 &&
                  !isLoading &&
                  Object.keys(recommendedTargetData).length !== 0 && 
                    <OrganismBizExpertSelect />
                }

                {/* 4번 전문가 히스토리로 진입 시 */}
                {approachPath === 2 && 
                  titleOfBusinessInfo &&
                  conversation.length > 0 &&
                  !isLoading &&
                  Object.keys(recommendedTargetData).length !== 0 &&  
                    <OrganismBizExpertSelect />
                }
              </>
              }
              
            </ChatWrap>

            {conversationStage === 1 ? (
              <OrganismSearchBottomBar onSearch={handleSearch} isBlue={false} />
            ) : (
              selectedExpertIndex === "4" ? 
                Object.keys(recommendedTargetData).length !== 0 && <OrganismSearchBottomBar onSearch={handleSearch} isBlue={true} /> // 4번 전문가 보고서 생성 시 활성화 
                : 
                <OrganismSearchBottomBar onSearch={handleSearch} isBlue={true} />
            )}
          </div>

          <OrganismRightSideBar />
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageExpertInsight;

const MainContent = styled.div`
  position: relative;
  top: 40px;
  grid-area: content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // gap:40px;
  min-width: 1px;
  max-width: 1484px;
  width: calc(100% - 40px);
  // padding-bottom: 150px;
  margin: 0 auto;
  // justify-content:center;

  > div {
    flex: 1;
  }

  > div:first-child {
    max-width:1030px;
    // max-width: 1240px;
    // max-width:800px;
    width: 100%;
    margin: 0 20px;
    padding-bottom: 60px;
  }
`;

const ContentsWrap = styled.div`
  position: relative;
  display: flex;
`;

const ChatWrap = styled.div`
  position: relative;
  height: calc(100% - 55px);

  &:before {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    display: block;
    // height:170px;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 30%
    );
    z-index: 1;
    content: "";
  }

  &.scrolled:before {
    height: 180px;
  }
`;
