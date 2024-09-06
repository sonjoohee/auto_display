import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
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
  BUTTON_STATE,
  isLoggedInAtom,
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
import OrganismSearchBottomBar from "../organisms/OrganismSearchBottomBar";
import MoleculeBizName from "../molecules/MoleculeBizName";
import MoleculeSystemMessage from "../molecules/MoleculeSystemMessage";
import MoleculeUserMessage from "../molecules/MoleculeUserMessage";
import OrganismBizExpertSelect from "../organisms/OrganismBizExpertSelect";
import MoleculeAdditionalKeyword from "../molecules/MoleculeAdditionalKeyword";
import OrganismAdditionalReport from "../organisms/OrganismAdditionalReport";
import MoleculeCheckReportRightAway from "../molecules/MoleculeCheckReportRightAway";

const PageExpertInsight = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const navigate = useNavigate();
  const { conversationId: paramConversationId } = useParams();
  const [conversationId, setConversationId] = useState(
    paramConversationId || nanoid()
  );
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

  const [inputAdditionalQuestion, setInputAdditionalQuestion] = useState("");
  const [isClickCheckReportRightAway, setIsClickCheckReportRightAway] = useAtom(
    iS_CLICK_CHECK_REPORT_RIGHTAWAY
  );
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인

  useEffect(() => {
    // 로그아웃 상태가 되면 페이지MeetAiExpert로 리디렉션
    if (!isLoggedIn) {
      alert("로그인 후 사용해 주세요"); // 경고창 추가
      navigate('/PageMeetAiExpert');
    }
  }, [isLoggedIn, navigate]);

  // setConversation([]);
  // setConversationStage(1);
  // setInputBusinessInfo("");
  // setTitleOfBusinessInfo("");
  // setMainFeaturesOfBusinessInformation([]);
  // setMainCharacteristicOfBusinessInformation([]);
  // setBusinessInformationTargetCustomer([]);
  // setSelectedExpertIndex(1);
  // setSections([]);
  // setAdditionalReportCount(0);
  // setSelectedAdditionalKeyword([]);
  // setApproachPath(0);
  // setAdditionalReportData([]);
  // setExpert1ReportData({});
  // setExpert2ReportData({});
  // setExpert3ReportData({});
  // setAddtionalQuestion1("");
  // setAddtionalQuestion2("");
  // setAddtionalQuestion3("");
  // setInputAdditionalQuestion("");
  // setIsClickCheckReportRightAway(false);

  // 현재 선택된 전문가에 맞는 보고서 데이터를 결정
  const getStrategyReportData = () => {
    switch (selectedExpertIndex) {
      case 1:
        return expert1ReportData;
      case 2:
        return expert2ReportData;
      case 3:
        return expert3ReportData;
      default:
        return {};
    }
  };

  const setStrategyReportData = (data) => {
    switch (selectedExpertIndex) {
      case 1:
        setExpert1ReportData(data);
        break;
      case 2:
        setExpert2ReportData(data);
        break;
      case 3:
        setExpert3ReportData(data);
        break;
      default:
        break;
    }
  };

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const saveConversation = async (
    updatedConversation,
    newConversationStage
  ) => {
    const existingReports = {
      strategyReportData_EX1: expert1ReportData,
      strategyReportData_EX2: expert2ReportData,
      strategyReportData_EX3: expert3ReportData,
    };

    // IndexedDB에서 기존 데이터를 가져옴
    const existingData = await getConversationByIdFromIndexedDB(conversationId);

    // 기존의 selectedAdditionalKeyword가 있으면 병합
    const updatedSelectedAdditionalKeyword =
      existingData?.selectedAdditionalKeyword
        ? [
            ...existingData.selectedAdditionalKeyword,
            ...selectedAdditionalKeyword,
          ]
        : selectedAdditionalKeyword;

    saveConversationToIndexedDB(
      {
        id: conversationId,
        conversation: updatedConversation,
        conversationStage: newConversationStage,
        inputBusinessInfo,
        analysisReportData,
        selectedAdditionalKeyword: updatedSelectedAdditionalKeyword,
        additionalReportData, // Save the entire list of additional reports
        ...existingReports,
        timestamp: Date.now(),
      },
      isLoggedIn,
      conversationId
    );
  };

  useEffect(() => {
    const loadConversation = async () => {
      // 1. 로그인 여부 확인
      if (isLoggedIn) {
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
        if (!paramConversationId) {
          console.log("paramConversationId219")
          try {
            // 서버에서 새로운 대화 ID 생성
            const newConversationId = await createChatOnServer();
            setConversationId(newConversationId); // 생성된 대화 ID 설정
            console.log("newConversationId", newConversationId);
            setIsLoading(false); // 로딩 완료
            // 새로운 대화 ID로 경로 변경
            navigate(`/conversation/${newConversationId}`, { replace: true });
          } catch (error) {
            setIsLoading(false); // 로딩 완료
            console.error("Failed to create conversation on server:", error);
            navigate(`/conversation/${conversationId}`, { replace: true });
          }
        } else {
          // 3. 대화 ID가 이미 존재하면 IndexedDB에서 대화 불러오기
          const savedConversation = await getConversationByIdFromIndexedDB(
            conversationId
          );
          if (savedConversation) {
            const analysisData = savedConversation.analysisReportData || {};
            setTitleOfBusinessInfo(analysisData.title || "");
            setMainFeaturesOfBusinessInformation(
              analysisData.mainFeatures || []
            );
            setMainCharacteristicOfBusinessInformation(
              analysisData.mainCharacter || []
            );
            setBusinessInformationTargetCustomer(
              analysisData.mainCustomer || []
            );

            // 복구된 데이터를 로컬 상태로 설정
            setConversation(savedConversation.conversation);
            setConversationStage(savedConversation.conversationStage);
            setInputBusinessInfo(savedConversation.inputBusinessInfo);

            // 전략 보고서 데이터 복구
            setExpert1ReportData(
              savedConversation.strategyReportData_EX1 || {}
            );
            setExpert2ReportData(
              savedConversation.strategyReportData_EX2 || {}
            );
            setExpert3ReportData(
              savedConversation.strategyReportData_EX3 || {}
            );

            setAdditionalReportData(
              savedConversation.additionalReportData || []
            );
            setSelectedAdditionalKeyword(
              savedConversation.selectedAdditionalKeyword || []
            );

            // 대화 단계가 초기 상태라면 초기 시스템 메시지 설정
            if (savedConversation.conversationStage === 1) {
              const initialMessage = getInitialSystemMessage();
              setConversation([{ type: "system", message: initialMessage }]);
            }
          } else {
            // 저장된 대화가 없으면 초기 메시지 설정
            if (selectedExpertIndex) {
              const initialMessage = getInitialSystemMessage();
              setConversation([{ type: "system", message: initialMessage }]);
            }
          }
          setIsLoading(false); // 로딩 완료
        }
      } else {
        // 4. 비로그인 상태인 경우, 새로운 로컬 대화 ID 생성 또는 기존 대화 로드
        if (!paramConversationId) {
          console.log("paramConversationId291")
          setConversationId(nanoid()); // 비로그인 시 로컬에서 새로운 ID 생성
          setIsLoading(false); // 로딩 완료
          navigate(`/conversation/${conversationId}`, { replace: true });
        } else {
          const savedConversation = await getConversationByIdFromIndexedDB(
            conversationId
          );
          if (savedConversation) {
            const analysisData = savedConversation.analysisReportData || {};
            setTitleOfBusinessInfo(analysisData.title || "");
            setMainFeaturesOfBusinessInformation(
              analysisData.mainFeatures || []
            );
            setMainCharacteristicOfBusinessInformation(
              analysisData.mainCharacter || []
            );
            setBusinessInformationTargetCustomer(
              analysisData.mainCustomer || []
            );

            // 복구된 데이터를 로컬 상태로 설정
            setConversation(savedConversation.conversation);
            setConversationStage(savedConversation.conversationStage);
            setInputBusinessInfo(savedConversation.inputBusinessInfo);

            // 전략 보고서 데이터 복구
            setExpert1ReportData(
              savedConversation.strategyReportData_EX1 || {}
            );
            setExpert2ReportData(
              savedConversation.strategyReportData_EX2 || {}
            );
            setExpert3ReportData(
              savedConversation.strategyReportData_EX3 || {}
            );

            setAdditionalReportData(
              savedConversation.additionalReportData || []
            );
            setSelectedAdditionalKeyword(
              savedConversation.selectedAdditionalKeyword || []
            );

            // 대화 단계가 초기 상태라면 초기 시스템 메시지 설정
            if (savedConversation.conversationStage === 1) {
              const initialMessage = getInitialSystemMessage();
              setConversation([{ type: "system", message: initialMessage }]);
            }
          } else {
            // 저장된 대화가 없으면 초기 메시지 설정
            if (selectedExpertIndex) {
              const initialMessage = getInitialSystemMessage();
              setConversation([{ type: "system", message: initialMessage }]);
            }
          }
          setIsLoading(false); // 로딩 완료
        }
      }
    };

    loadConversation();
  }, [
    paramConversationId,
    conversationId,
    isLoggedIn,
    // conversation,
    navigate,
    // selectedExpertIndex,
    // setExpert1ReportData,
    // setExpert2ReportData,
    // setExpert3ReportData,
    // setAdditionalReportData,
    // setSelectedAdditionalKeyword,
    // setConversation,
    // setConversationStage,
  ]);

  // useEffect(() => {
  //   const loadConversationOther = async () => {
  //     const savedConversation = await getConversationByIdFromIndexedDB(conversationId);
  //     if (savedConversation) {
  //       const analysisData = savedConversation.analysisReportData || {};
  //         setTitleOfBusinessInfo(analysisData.title || "");
  //         setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
  //         setMainCharacteristicOfBusinessInformation(analysisData.mainCharacter || []);
  //         setBusinessInformationTargetCustomer(analysisData.mainCustomer || []);
  //     }
  //   }
  //   loadConversationOther();
  // }, [
  //   navigate,
  //   conversation,
  //   setConversation,
  // ]);

  // 검색을 통해 들어왔으면 handleSearch 실행
  useEffect(() => {
    if (conversationId && conversationId.length >= 2) {
      if (approachPath === -1) {
        console.log(111111111);
        handleSearch(-1);
      } else if (approachPath === 1) {
        setInputBusinessInfo("");
        const initialMessage = getInitialSystemMessage();
        setConversation([{ type: "system", message: initialMessage }]);
      }
    }
  }, [approachPath, selectedExpertIndex, isLoading]);

  useEffect(() => {
    if (
      conversationId &&
      conversationId.length >= 2 &&
      selectedAdditionalKeyword.length > 0 &&
      !isLoading
    ) {
      console.log(22222222);
      handleSearch(-1);
    }
  }, [selectedAdditionalKeyword, isLoading]);

  useEffect(() => {
    if (
      conversationId &&
      conversationId.length >= 2 &&
      approachPath &&
      !isLoading
    ) {
      console.log(3333333333);
      handleSearch(-1);
    }
  }, [selectedExpertIndex, isLoading]);

  useEffect(() => {
    if (
      conversationId &&
      conversationId.length >= 2 &&
      isClickCheckReportRightAway &&
      !isLoading
    ) {
      console.log(444444444);
      handleSearch(-1);
    }
  }, [isClickCheckReportRightAway, isLoading]);

  const handleSearch = async (inputValue) => {
    if (isLoggedIn) {
      if (!paramConversationId) {
        try {
          // // 로그인 상태에서 새로운 대화 ID를 서버에서 생성
          // const newConversationId = await createChatOnServer();
          // setConversationId(newConversationId); // 생성된 대화 ID 설정
          // console.log("newConversationId", newConversationId);
          // // 새로운 대화 ID로 경로 변경
          // navigate(`/conversation/${newConversationId}`, { replace: true });
          return; // 새로운 대화 생성 후 return
        } catch (error) {
          console.error("Failed to create conversation on server:", error);
          return;
        }
      }
    }

    const updatedConversation = [...conversation];

    // 사용자가 입력한 경우에만 inputBusinessInfo를 업데이트
    if (conversationStage < 3 && inputValue !== -1) {
      setInputBusinessInfo(inputValue);
      console.log(inputValue);
      updatedConversation.push({ type: "user", message: inputValue });
    }

    let newConversationStage = conversationStage;

    if (conversationStage === 1) {
      if (inputBusinessInfo || inputValue !== -1) {
        // inputValue가 입력되었을 때도 대화 진행
        const businessInfo = inputBusinessInfo || inputValue; // inputValue가 더 우선
        updatedConversation.push(
          {
            type: "system",
            message: `아이디어를 입력해 주셔서 감사합니다!\n지금부터 아이디어를 세분화하여 주요한 특징과 목표 고객을 파악해보겠습니다 🙌🏻`,
          },
          { type: "analysis", businessInfo } // 입력된 비즈니스 정보를 분석
        );
        // if(approachPath === 1) {
        //   updatedConversation.push(
        //     { type: 'system', message: '비즈니스 분석이 완료되었습니다. 추가 사항이 있으시면 ‘수정하기’ 버튼을 통해 수정해 주세요.\n분석 결과에 만족하신다면, 지금 바로 전략 보고서를 준비해드려요.' },
        //     { type: 'report_button'},
        //   );
        // }
        // else {
        //   updatedConversation.push(
        //     { type: 'system', message: '비즈니스 분석이 완료되었습니다. 추가 사항이 있으시면 ‘수정하기’ 버튼을 통해 수정해 주세요.\n분석 결과에 만족하신다면, 전문가들의 의견을 확인하여 아이디어를 한 단계 더 발전시켜 보세요 🔍' },
        //   );
        // }
        newConversationStage = 2;
      } else if (!inputBusinessInfo && approachPath === 1) {
        // inputBusinessInfo가 비어 있고, 검색을 통해 접근하지 않은 경우 전문가 인덱스에 따라 메시지 추가
        // const expertPromptMessage = getInitialSystemMessage();
        // updatedConversation.push({
        //   type: "system",
        //   message: expertPromptMessage,
        // });
      }
    } else if (conversationStage === 2 && titleOfBusinessInfo) {
      // 임시로 비활성화, 새로고침이나 뒤로가기 막는 기능 필요함
      // if (!selectedExpertIndex || (inputValue !== -1 && approachPath === -1)) {
      //     alert("전문가를 선택해 주세요.");
      //     return;
      // }
      // 마지막 요소가 keyword 이거나 report_button 이면 pop
      if (
        (updatedConversation.length > 0 &&
          updatedConversation[updatedConversation.length - 1].type ===
            "keyword") ||
        (updatedConversation.length > 0 &&
          updatedConversation[updatedConversation.length - 1].type ===
            "report_button")
      ) {
        updatedConversation.pop();
      }

      if (selectedExpertIndex === "1") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "10년차 전략 디렉터와 1:1 커피챗, 지금 바로 시작하겠습니다 🙌🏻",
          },
          {
            type: "system",
            message: `안녕하세요, 김도원입니다! ${titleOfBusinessInfo}을 구체화하는 데 도움이 될 전략 보고서를 준비했습니다.\n함께 전략을 다듬어 보시죠! 📊"`,
          }
        );
      } else if (selectedExpertIndex === "2") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "지금 바로 쓸 수 있는 브랜딩 솔루션 10초 맞춤 제안서 받기, 지금 바로 시작하겠습니다 🙌🏻",
          },
          {
            type: "system",
            message: `안녕하세요, 이지현입니다! ${titleOfBusinessInfo}을 구체화하는 데 도움이 될 전략 보고서를 준비했습니다.\n함께 전략을 다듬어 보시죠! 📊"`,
          }
        );
      } else if (selectedExpertIndex === "3") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "고객 데이터 전문가의 맞춤 타겟 추천, 지금 바로 시작하겠습니다 🙌🏻",
          },
          {
            type: "system",
            message: `안녕하세요, 박서연입니다! ${titleOfBusinessInfo}을 구체화하는 데 도움이 될 전략 보고서를 준비했습니다.\n함께 전략을 다듬어 보시죠! 📊"`,
          }
        );
      }
      updatedConversation.push(
        { type: `strategy_${selectedExpertIndex}` }
        // { type: 'system', message: '리포트 내용을 보시고 추가로 궁금한 점이 있나요? 아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊'},
        // { type: `keyword` },
      );
      newConversationStage = 3;
    } else if (conversationStage === 3) {
      updatedConversation.pop();

      // 로그인 상태에 따라 활성화 또는 비활성화 해야함
      // if (additionalReportCount >= 3) {
      //   alert("추가 리포트는 최대 3개까지 요청 가능합니다. 더 보려면 로그인 해주세요!");
      //   return;
      // }

      if (inputValue !== -1) {
        const updatedKeywords = [...selectedAdditionalKeyword];
        updatedKeywords[0] = inputValue;
        setSelectedAdditionalKeyword(updatedKeywords);
      }

      // updatedConversation.push(
      //   {
      //     type: "user",
      //     message: `제 프로젝트와 관련된 "${
      //       selectedAdditionalKeyword[selectedAdditionalKeyword.length - 1]
      //     }"를 요청드려요`,
      //   },
      //   { type: `addition_${selectedExpertIndex}` }
        // { type: 'system', message: `"${titleOfBusinessInfo}"과 관련된 시장에서의 BDG 메트릭스를 기반으로 ${selectedAdditionalKeyword[selectedAdditionalKeyword.length-1]}를 찾아드렸어요\n추가적인 질문이 있으시면, 언제든지 물어보세요💡 다른 분야 전문가의 의견도 프로젝트에 도움이 될거에요👇🏻` },
        // { type: `keyword` },
      // );

      setAdditionalReportCount(additionalReportCount + 1);
    }

    console.log(
      "🚀 ~ handleSearch ~ updatedConversation:",
      updatedConversation
    );
    setConversation(updatedConversation);
    setConversationStage(newConversationStage);
    saveConversation(updatedConversation, newConversationStage);
    setIsLoading(false); // 로딩 완료
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
      case 1:
        return "안녕하세요! 저는 전략 전문가 김도원입니다. 😊 여러분의 아이디어를 구체화하고, 성공적인 전략을 세우는 데 도움을 드리겠습니다.\n아이디어나 비즈니스 아이템을 간단히 작성해 주세요. 분석 후, 여러분의 비즈니스에 맞는 전략 리포트를 제공하겠습니다!";
      case 2:
        return "안녕하세요! 마케팅 전문가 이지현입니다. 😄 여러분의 아이디어를 효과적으로 시장에 알릴 수 있는 전략을 함께 고민해 보아요.\n아이디어나 비즈니스 아이템을 여기에 작성해 주세요. 제가 분석하고, 효과적인 마케팅 전략 리포트를 준비해 드리겠습니다!";
      case 3:
        return "반갑습니다! 저는 고객 인사이트 전문가 박서연입니다. 😊 여러분의 비즈니스가 목표 고객에게 잘 다가갈 수 있도록 돕겠습니다.\n아이디어나 비즈니스 아이템을 작성해 주세요. 분석 후, 타겟 고객을 정의하고 세분화 방법에 대한 리포트를 제공해 드리겠습니다!";
      default:
        return "비즈니스(아이디어)를 입력해주세요.";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ContentsWrap>
        <OrganismLeftSideBar/>

        <MainContent>
          <div>
            <ChatWrap className={isScrolled ? "scrolled" : ""}>
              <MoleculeBizName date={Date.now()}/>
              {conversation.map((item, index) => {
                if (item.type === "user") {
                  return (
                    <MoleculeUserMessage key={index} message={item.message} />
                  );
                } else if (item.type === "system") {
                  return (
                    <MoleculeSystemMessage key={index} message={item.message} />
                  );
                } else if (item.type === "analysis") {
                  return (
                    <OrganismBizAnalysisSection
                      conversationId={conversationId}
                    />
                  );
                } else if (item.type.startsWith("strategy_")) {
                  const expertIndex = item.type.split("_")[1];
                  return (
                    <OrganismStrategyReportSection
                      key={`strategy_${expertIndex}_${index}`}
                      conversationId={conversationId}
                      expertIndex={expertIndex}
                    />
                  );
                } else if (item.type.startsWith("addition_")) {
                  // console.log("🚀 ~ {conversation.map ~ item:", item, index);
                  const expertIndex = item.type.split("_")[1];

                  return (
                    <OrganismAdditionalReport
                      key={`addition_${expertIndex}_${index}`}
                      conversationId={conversationId}
                      expertIndex={expertIndex}
                      keyword={
                        selectedAdditionalKeyword[
                          selectedAdditionalKeyword.length - 1
                        ]
                      }
                    />
                  );
                } else if (item.type === "keyword") {
                  return <MoleculeAdditionalKeyword />;
                } else if (item.type === "report_button") {
                  return <MoleculeCheckReportRightAway />;
                }
                return null;
              })}

              {approachPath === -1 &&
                inputBusinessInfo &&
                (Object.keys(expert1ReportData).length === 0 ||
                  Object.keys(expert2ReportData).length === 0 ||
                  Object.keys(expert3ReportData).length === 0) && (
                  <OrganismBizExpertSelect />
                )}
            </ChatWrap>

            {approachPath === 1 && conversationStage == 1 && <OrganismSearchBottomBar onSearch={handleSearch} />}
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

  > div {
    flex: 1;
  }

  > div:first-child {
    max-width: 1240px;
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
const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8); // 화면을 덮는 반투명 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // 다른 요소 위에 표시
  pointer-events: none; // 모든 클릭 비활성화
`;