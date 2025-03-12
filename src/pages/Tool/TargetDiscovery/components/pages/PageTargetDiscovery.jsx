//타겟 탐색기리
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import {
  ButtonGroup,
  Button,
  IconButton,
} from "../../../../../assets/styles/ButtonStyle";
import {
  FormBox,
  CustomTextarea,
  CustomInput,
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
  CheckBoxButton,
} from "../../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  Badge,
  TabWrapType2,
  TabButtonType2,
  TabContent,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  CardGroupWrap,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BottomBar,
  BgBoxItem,
  ListBoxWrap,
  ListBoxItem,
  ListBoxTitle,
  ListBoxContent,
  Keyword,
  InterviewPopup,
  Status,
  ListRowWrap,
  ListRowItem,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TARGET_DISCOVERY_INFO,
  TARGET_DISCOVERY_PERSONA,
  SELECTED_TARGET_DISCOVERY_PERSONA,
  TARGET_DISCOVERY_SCENARIO,
  TARGET_DISCOVERY_FINAL_REPORT,
  TOOL_ID,
  TOOL_STEP,
  SELECTED_TARGET_DISCOVERY_SCENARIO,
  TOOL_LOADING,
  PROJECT_SAAS,
} from "../../../../AtomStates";
import images from "../../../../../assets/styles/Images";
import {
  H4,
  H3,
  H5,
  Sub3,
  Body1,
  Body2,
  Body3,
} from "../../../../../assets/styles/Typography";
import MoleculeToolPersonaCard from "../molecules/MoleculeToolPersonaCard";
import {
  InterviewXTargetDiscoveryPersonaRequest,
  InterviewXTargetDiscoveryScenarioRequest,
  InterviewXTargetDiscoveryFinalReportRequest,
  createToolOnServer,
  updateToolOnServer,
} from "../../../../../utils/indexedDB";

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";

const PageTargetDiscovery = () => {
  const navigate = useNavigate();
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [targetDiscoveryInfo, setTargetDiscoveryInfo] = useAtom(
    TARGET_DISCOVERY_INFO
  );
  const [targetDiscoveryPersona, setTargetDiscoveryPersona] = useAtom(
    TARGET_DISCOVERY_PERSONA
  );
  const [selectedTargetDiscoveryPersona, setSelectedTargetDiscoveryPersona] =
    useAtom(SELECTED_TARGET_DISCOVERY_PERSONA);
  const [targetDiscoveryScenario, setTargetDiscoveryScenario] = useAtom(
    TARGET_DISCOVERY_SCENARIO
  );
  const [targetDiscoveryFinalReport, setTargetDiscoveryFinalReport] = useAtom(
    TARGET_DISCOVERY_FINAL_REPORT
  );
  const [selectedTargetDiscoveryScenario, setSelectedTargetDiscoveryScenario] =
    useAtom(SELECTED_TARGET_DISCOVERY_SCENARIO);
  const [projectSaas, setProjectSaas] = useAtom(PROJECT_SAAS);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMore, setShowPopupMore] = useState(false);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [showPopupRetry, setShowPopupRetry] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedInterviewType, setSelectedInterviewType] = useState(null);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] =
    useState(null);
  const [activeTab1, setActiveTab1] = useState("personaInfo");
  const [contactForm, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [dropUp, setDropUp] = useState(false);
  const selectBoxRef = useRef(null);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [personaData, setPersonaData] = useState({
    personaInfo: "",
    personaScenario: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingScenario, setIsLoadingScenario] = useState(false); // 시나리오 단계용 로딩 상태 추가
  const [specificSituation, setSpecificSituation] = useState("");
  const [loadingPersonas, setLoadingPersonas] = useState({});

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  // 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const project = projectSaas;

  const calculateDropDirection = () => {
    if (selectBoxRef.current) {
      const rect = selectBoxRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200; // 예상되는 드롭다운 높이

      setDropUp(spaceBelow < dropDownHeight && spaceAbove > spaceBelow);
    }
  };

  const handleSelectBoxClick = () => {
    if (toolStep >= 1) return;
    calculateDropDirection();
    setIsSelectBoxOpen(!isSelectBoxOpen);
  };

  const handlePurposeSelect = (purpose) => {
    setSelectedPurpose(purpose);
    handleContactInputChange("purpose", purpose);
    setIsSelectBoxOpen(false);
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectPersona = () => {
    if (selectedPersonas.length > 0) {
      setSelectedInterviewType("multiple");
      setSelectedInterviewPurpose("product_experience_new");
    }
  };

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      const projectAnalysis =
        (project?.projectAnalysis.business_analysis
          ? project?.projectAnalysis.business_analysis
          : "") +
        (project?.projectAnalysis.business_analysis &&
        project?.projectAnalysis.file_analysis
          ? "\n"
          : "") +
        (project?.projectAnalysis.file_analysis
          ? project?.projectAnalysis.file_analysis
          : "");
      // 비즈니스 정보 설정 (Step 1)
      if (project) {
        setBusinessDescription(projectAnalysis);
        setTargetCustomer(project?.projectAnalysis.target_customer ?? "");
        setSpecificSituation(targetDiscoveryInfo?.specificSituation ?? "");
        setSelectedPurpose(project?.targetCountry ?? "");
      }

      if (toolLoading) {
        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 4));

        const projectAnalysis =
          (project?.projectAnalysis.business_analysis
            ? project?.projectAnalysis.business_analysis
            : "") +
          (project?.projectAnalysis.business_analysis &&
          project?.projectAnalysis.file_analysis
            ? "\n"
            : "") +
          (project?.projectAnalysis.file_analysis
            ? project?.projectAnalysis.file_analysis
            : "");
        // 비즈니스 정보 설정 (Step 1)
        if (project) {
          setBusinessDescription(projectAnalysis);
          setTargetCustomer(project?.projectAnalysis.target_customer ?? "");
          setSpecificSituation(targetDiscoveryInfo?.specificSituation ?? "");
          setSelectedPurpose(project?.targetCountry ?? "");
        }

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);

        // 페르소나 설정 (Step 2)
        if (
          Array.isArray(targetDiscoveryPersona) &&
          Array.isArray(selectedTargetDiscoveryPersona)
        ) {
          // 이미 선택된 페르소나들의 인덱스 찾기
          const selectedIndices = (targetDiscoveryPersona ?? [])
            .map((persona, index) => {
              // targetDiscoveryScenario에 있는 페르소나만 선택
              return (targetDiscoveryScenario ?? []).some(
                (scenario) => scenario?.title === persona?.title
              )
                ? index
                : -1;
            })
            .filter((index) => index !== -1);

          // selectedPersonas 상태 업데이트
          setSelectedPersonas(selectedIndices);

          // 선택된 페르소나 데이터 설정
          const selectedPersonaData = selectedIndices
            .map((index) => targetDiscoveryPersona?.[index])
            .filter(Boolean);

          setSelectedTargetDiscoveryPersona(selectedPersonaData);
        }

        // 시나리오 설정 (Step 3)
        if (
          Array.isArray(targetDiscoveryScenario) &&
          Array.isArray(targetDiscoveryPersona)
        ) {
          const matchedScenarioData = (targetDiscoveryScenario ?? [])
            .map((scenario) => {
              const matchedPersona = (targetDiscoveryPersona ?? []).find(
                (persona) => persona?.title === scenario?.title
              );

              if (!matchedPersona) return null;

              return {
                ...(matchedPersona ?? {}),
                title: scenario?.title ?? "",
                content: matchedPersona?.content ?? {},
                keywords: matchedPersona?.content?.keywords ?? [],
                scenario: scenario ?? {},
              };
            })
            .filter((item) => item?.title);

          setSelectedTargetDiscoveryScenario(matchedScenarioData);
        }

        // 최종 리포트 설정 (Step 4)
        if (targetDiscoveryFinalReport) {
          setTargetDiscoveryFinalReport(targetDiscoveryFinalReport ?? {});
        }

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  const handleCheckboxChange = (personaId) => {
    if (toolStep >= 2) return;
    setSelectedPersonas((prev) => {
      if (prev.includes(personaId)) {
        return prev.filter((id) => id !== personaId);
      } else {
        // 최대 5개까지만 선택 가능
        if (prev.length >= 5) return prev;
        return [...prev, personaId];
      }
    });
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  // 필수 필드가 모두 입력되었는지 확인하는 함수
  const isRequiredFieldsFilled = () => {
    return (
      businessDescription.trim() !== "" &&
      targetCustomer.trim() !== "" &&
      specificSituation.trim() !== ""
    );
  };

  // 비즈니스 설명 입력 핸들러
  const handleBusinessDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 150) {
      setBusinessDescription(input);
    }
  };

  // 타겟 고객 입력 핸들러
  const handleTargetCustomerChange = (e) => {
    setTargetCustomer(e.target.value);
  };

  const handleSubmitBusinessInfo = async () => {
    try {
      setIsLoading(true);

      const businessData = {
        business: businessDescription,
        target: targetCustomer,
        specific_situation: specificSituation,
        country: selectedPurpose,
      };

      let response = await InterviewXTargetDiscoveryPersonaRequest(
        businessData,
        isLoggedIn
      );

      const maxAttempts = 10;
      let attempts = 0;
      while (
        !response ||
        !response.response ||
        !response.response.target_discovery_persona ||
        !Array.isArray(response.response.target_discovery_persona) ||
        response.response.target_discovery_persona.length === 0 ||
        response.response.target_discovery_persona.some(
          (persona) => !persona.title || !persona.content
        )
      ) {
        if (attempts >= maxAttempts) {
          setShowPopupRetry(true);
          return;
        }
        attempts++;

        response = await InterviewXTargetDiscoveryPersonaRequest(
          businessData,
          isLoggedIn
        );
      }

      const updateBusinessData = {
        business: businessDescription,
        target: targetCustomer,
        specificSituation: specificSituation,
        country: selectedPurpose,
      };
      const responseToolId = await createToolOnServer(
        {
          type: "ix_target_discovery_persona",
          completedStep: 1,
          projectId: project._id,
          targetDiscoveryPersona: response.response.target_discovery_persona,
          business: businessDescription,
          target: targetCustomer,
          specificSituation: specificSituation,
          country: selectedPurpose,
        },
        isLoggedIn
      );
      setToolId(responseToolId);
      setToolStep(1);
      // API 응답에서 페르소나 데이터를 추출하여 atom에 저장
      setTargetDiscoveryPersona(
        response.response.target_discovery_persona || []
      );
      setTargetDiscoveryInfo(updateBusinessData);

      // API 호출 성공시 다음 단계로 이동
      handleNextStep(1);
      setIsLoading(false);
    } catch (error) {
      setShowPopupError(true);
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowPopupError(true);
            break;
          case 504:
            setShowPopupError(true);
            break;
          default:
            setShowPopupError(true);
            break;
        }
      } else {
        setShowPopupError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPersonas = async () => {
    handleNextStep(2);
    setIsLoading(true);
    try {
      const selectedPersonaData = targetDiscoveryPersona.filter(
        (persona, index) => selectedPersonas.includes(index)
      );
      setSelectedTargetDiscoveryPersona(selectedPersonaData);

      let allScenarios = []; // 모든 시나리오를 저장할 배열
      // 각 페르소나에 대해 개별적으로 시나리오 요청 및 상태 업데이트
      for (const persona of selectedPersonaData) {
        // 현재 페르소나의 로딩 상태를 true로 설정
        setLoadingPersonas((prev) => ({
          ...prev,
          [persona.title]: true,
        }));

        try {
          const isDuplicate = selectedTargetDiscoveryPersona.some(
            (existingPersona) => existingPersona.title === persona.title
          );

          if (!isDuplicate) {
            const apiRequestData = {
              business: targetDiscoveryInfo.business,
              target_discovery_persona: persona,
              specific_situation: targetDiscoveryInfo.specificSituation,
              country: targetDiscoveryInfo.country,
            };

            const response = await InterviewXTargetDiscoveryScenarioRequest(
              apiRequestData,
              isLoggedIn
            );

            const maxAttempts = 10;
            let attempts = 0;

            while (
              !response ||
              !response?.response ||
              !response?.response?.target_discovery_scenario ||
              !response?.response?.target_discovery_scenario
                ?.potential_customer_info ||
              !response?.response?.target_discovery_scenario
                ?.potential_customer_info?.gender ||
              !response?.response?.target_discovery_scenario
                ?.potential_customer_info?.age ||
              !response?.response?.target_discovery_scenario
                ?.potential_customer_info?.main_use_purpose ||
              !response?.response?.target_discovery_scenario
                ?.potential_customer_info?.pain_points ||
              !response?.response?.target_discovery_scenario?.usage_scenario ||
              !response?.response?.target_discovery_scenario?.usage_scenario
                ?.description ||
              !response?.response?.target_discovery_scenario?.usage_scenario
                ?.key_sentence
            ) {
              if (attempts >= maxAttempts) {
                setShowPopupError(true);
                return;
              }
              attempts++;

              response = await InterviewXTargetDiscoveryScenarioRequest(
                apiRequestData,
                isLoggedIn
              );
            }

            // 개별 시나리오 데이터 업데이트
            setTargetDiscoveryScenario((prev) => {
              const currentScenarios = prev || [];
              return [
                ...currentScenarios,
                response?.response?.target_discovery_scenario,
              ].filter(Boolean);
            });

            // 현재 페르소나의 로딩 상태를 false로 설정
            setLoadingPersonas((prev) => ({
              ...prev,
              [persona.title]: false,
            }));

            // 개별 시나리오 데이터를 selectedTargetDiscoveryScenario에 추가
            setSelectedTargetDiscoveryScenario((prev) => [
              ...(prev || []),
              {
                ...persona,
                scenario: response.response.target_discovery_scenario,
              },
            ]);
            allScenarios.push({
              ...persona, // 기존 페르소나 데이터 유지
              scenario: response.response.target_discovery_scenario, // 시나리오 데이터 추가
            });
          }
        } catch (error) {
          // 에러 발생 시 현재 페르소나의 로딩 상태를 false로 설정
          setLoadingPersonas((prev) => ({
            ...prev,
            [persona.title]: false,
          }));
        } finally {
          setIsLoading(false);
        }
      }

      setSelectedTargetDiscoveryScenario(allScenarios);
      // 모든 시나리오를 서버에 저장
      await updateToolOnServer(
        toolId,
        {
          projectId: project._id,
          completedStep: 2,
          targetDiscoveryScenario: allScenarios,
          updateDate: new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        },
        isLoggedIn
      );

      setToolStep(2);
    } catch (error) {
      // 에러 발생 시 모든 로딩 상태 초기화
      setLoadingPersonas({});
      setShowPopupError(true);
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowPopupError(true);
            break;
          case 504:
            setShowPopupError(true);
            break;
          default:
            setShowPopupError(true);
            break;
        }
      } else {
        setShowPopupError(true);
      }
    }
  };

  const handleSubmitScenario = async () => {
    try {
      setIsLoadingScenario(true);
      handleNextStep(3);

      const scenarioData = {
        business: targetDiscoveryInfo.business,
        target: targetDiscoveryInfo.target,
        target_discovery_persona: selectedTargetDiscoveryPersona,
        target_discovery_scenario: targetDiscoveryScenario,
      };

      const response = await InterviewXTargetDiscoveryFinalReportRequest(
        scenarioData,
        isLoggedIn
      );

      const maxAttempts = 10;
      let attempts = 0;

      while (
        !response ||
        !response?.response?.target_discovery_final_report?.potential_rank_1
          ?.title ||
        !response?.response?.target_discovery_final_report?.potential_rank_1
          ?.discovery_criteria ||
        !response?.response?.target_discovery_final_report?.potential_rank_1
          ?.selection_criteria ||
        !response?.response?.target_discovery_final_report?.potential_rank_1
          ?.rank_reason ||
        !response?.response?.target_discovery_final_report?.potential_rank_1
          ?.keywords
      ) {
        if (attempts >= maxAttempts) {
          setShowPopupError(true);
          return;
        }
        attempts++;

        response = await InterviewXTargetDiscoveryFinalReportRequest(
          scenarioData,
          isLoggedIn
        );
      }

      setTargetDiscoveryFinalReport(
        response.response.target_discovery_final_report
      );

      // 모든 시나리오를 한번에 저장
      await updateToolOnServer(
        toolId,
        {
          projectId: project._id,
          completedStep: 4,
          targetDiscoveryFinalReport:
            response.response.target_discovery_final_report,
          updateDate: new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        },
        isLoggedIn
      );
      setToolStep(3);

      setIsLoadingScenario(false);
      handleNextStep(3);
    } catch (error) {
      setShowPopupError(true);
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowPopupError(true);
            break;
          case 504:
            setShowPopupError(true);
            break;
          default:
            setShowPopupError(true);
            break;
        }
      } else {
        setShowPopupError(true);
      }
    } finally {
      setIsLoadingScenario(false);
    }
  };

  const getButtonText = (persona, hasScenarioData, isLoading) => {
    if (isLoading) {
      return "호출중";
    } else if (hasScenarioData) {
      return "자세히";
    }
    return "대기중";
  };

  // useEffect(() => {
  //   // 새로고침 감지 함수
  //   const detectRefresh = () => {
  //     // 1. Performance API 확인
  //     // if (performance.navigation && performance.navigation.type === 1) {
  //     //   console.log("새로고침 감지: Performance API");
  //     //   navigate("/");
  //     //   return true;
  //     // }

  //     // 2. 현재 URL 확인
  //     const currentUrl = window.location.href;
  //     if (currentUrl.toLowerCase().includes("targetdiscovery")) {
  //       // 세션 스토리지에서 마지막 URL 가져오기
  //       const lastUrl = sessionStorage.getItem("lastUrl");

  //       // 마지막 URL이 현재 URL과 같으면 새로고침
  //       if (lastUrl && lastUrl === currentUrl) {
  //         console.log("새로고침 감지: URL 비교");
  //         navigate("/");
  //         return true;
  //       }

  //       // 현재 URL 저장
  //       sessionStorage.setItem("lastUrl", currentUrl);
  //     }

  //     return false;
  //   };

  //   // 함수 실행
  //   detectRefresh();

  //   // 컴포넌트 마운트 시 한 번만 실행
  // }, [navigate]);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("targetdiscovery")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
         // console.log("새로고침 감지: URL 비교");
          navigate("/");
          return true;
        }

        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }

      return false;
    };

    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = (event) => {
      // 이벤트 취소 (표준에 따라)
      event.preventDefault();
      // Chrome은 returnValue 설정 필요
      event.returnValue = "";

      // 새로고침 시 루트 페이지로 이동
      navigate("/");
    };

    // F5 키 또는 Ctrl+R 감지
    const handleKeyDown = (event) => {
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 키 코드
        event.preventDefault();
        navigate("/");
      }
    };

    // 함수 실행
    detectRefresh();

    // 이벤트 리스너 등록
    // window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <TargetDiscoveryWrap>
            <TabWrapType5>
              <TabButtonType5
                isActive={activeTab >= 1}
                onClick={() =>
                  isLoading === false &&
                  isLoadingScenario === false &&
                  setActiveTab(1)
                }
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    비즈니스 입력
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 2}
                onClick={() =>
                  isLoading === false &&
                  isLoadingScenario === false &&
                  completedSteps.includes(1) &&
                  setActiveTab(2)
                }
                disabled={!completedSteps.includes(1)}
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    잠재고객 맥락 분석
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Contextual Inquiry
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 3}
                onClick={() =>
                  isLoading === false &&
                  isLoadingScenario === false &&
                  completedSteps.includes(2) &&
                  setActiveTab(3)
                }
                disabled={!completedSteps.includes(2)}
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    시나리오 분석
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    Scenario Analysis
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 4}
                onClick={() =>
                  isLoading === false &&
                  isLoadingScenario === false &&
                  completedSteps.includes(3) &&
                  setActiveTab(4)
                }
                disabled={!completedSteps.includes(3)}
              >
                <span>04</span>
                <div className="text">
                  <Body1 color={activeTab >= 4 ? "gray700" : "gray300"}>
                    최종 인사이트 분석
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                {isLoading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="잠재 고객을 분석하고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Find Your Potential Customers</H3>
                      <Body3 color="gray800">
                        혹시 놓치고 있는 고객은 없을까요? 잠재력있는 고객을
                        체계적으로 확인해보세요{" "}
                      </Body3>
                    </div>

                    <div className="content">
                      <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">비즈니스 설명</Body1>
                          {/* <Body1 color="red">*</Body1> */}
                        </div>
                        <FormBox Large>
                          <CustomTextarea
                            disabled={toolStep >= 1}
                            Edit
                            rows={6}
                            placeholder="잠재고객을 도출하고 싶은 비즈니스에 대해서 설명해주세요 (예: 친환경 전기 자전거 공유 플랫폼 등)"
                            value={businessDescription}
                            status="valid"
                          />
                        </FormBox>
                      </TabContent5Item>

                      <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">타겟 고객</Body1>
                          {/* <Body1 color="red">*</Body1> */}
                        </div>
                        {/* <CustomInput
                          disabled={toolStep >= 1}
                          type="text"
                          placeholder="핵심 타겟 고객 군을 작성해주세요 (예: 20대 여성 등)"
                          value={targetCustomer}
                          onChange={handleTargetCustomerChange}
                        /> */}
                        <FormBox Large>
                          <CustomTextarea
                            disabled={toolStep >= 1}
                            Edit
                            rows={5}
                            placeholder="잠재고객을 도출하고 싶은 비즈니스에 대해서 설명해주세요 (예: 친환경 전기 자전거 공유 플랫폼 등)"
                            value={targetCustomer}
                            status="valid"
                          />
                        </FormBox>
                      </TabContent5Item>

                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">분석하고자 하는 상황</Body1>
                          <Body1 color="red">*</Body1>
                        </div>
                        <CustomInput
                          disabled={toolStep >= 1}
                          type="text"
                          placeholder="특별히 분석하고자 하는 상황을 입력해주세요 (예: 전기자전거의 배터리가 없는 상황 등)"
                          value={specificSituation}
                          onChange={(e) => setSpecificSituation(e.target.value)}
                        />
                      </TabContent5Item>

                      {/* <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">타겟 국가</Body1>
                        </div>

                        <SelectBox ref={selectBoxRef}>
                          <SelectBoxTitle onClick={handleSelectBoxClick}>
                            <Body2
                              color={selectedPurpose ? "gray800" : "gray300"}
                            >
                              {selectedPurpose ||
                                "특정 타겟 국가가 있는 경우 선택해주세요"}
                            </Body2>
                            <images.ChevronDown
                              width="24px"
                              height="24px"
                              color={palette.gray500}
                              style={{
                                transform: isSelectBoxOpen
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </SelectBoxTitle>

                          {isSelectBoxOpen && (
                            <SelectBoxList dropUp={dropUp}>
                              <SelectBoxItem
                                onClick={() => handlePurposeSelect("대한민국")}
                              >
                                <Body2 color="gray700" align="left">
                                  대한민국
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() => handlePurposeSelect("미국")}
                              >
                                <Body2 color="gray700" align="left">
                                  미국
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() => handlePurposeSelect("중국")}
                              >
                                <Body2 color="gray700" align="left">
                                  중국
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() => handlePurposeSelect("일본")}
                              >
                                <Body2 color="gray700" align="left">
                                  일본
                                </Body2>
                              </SelectBoxItem>
                              <SelectBoxItem
                                onClick={() => handlePurposeSelect("베트남")}
                              >
                                <Body2 color="gray700" align="left">
                                  베트남
                                </Body2>
                              </SelectBoxItem>
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </TabContent5Item> */}
                    </div>

                    <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={handleSubmitBusinessInfo}
                      disabled={
                        !isRequiredFieldsFilled() || toolStep >= 1 || isLoading
                      }
                    >
                      다음
                    </Button>
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
              <TabContent5>
                {isLoading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="맞춤 페르소나를 찾고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Contextual Inquiry Analysis</H3>
                      <Body3 color="gray800">
                        비즈니스에 적합한 다양한 페르소나를 기반으로 잠재고객을
                        분석합니다
                      </Body3>
                    </div>

                    <div className="content">
                      <CardGroupWrap column style={{ marginBottom: "140px" }}>
                        {targetDiscoveryPersona.map((persona, index) => (
                          <MoleculeToolPersonaCard
                            key={`persona-${index}`}
                            title={persona.title}
                            keywords={persona.content.keywords}
                            checked={selectedPersonas.includes(index)}
                            onSelect={() => handleCheckboxChange(index)}
                            currentSelection={selectedPersonas.length}
                            personaData={persona}
                            viewType="list"
                            popupType="basic"
                            onDetailClick={() => setShowPopup(true)}
                            selectedIndex={index}
                          />
                        ))}
                      </CardGroupWrap>

                      <BottomBar W100>
                        <Body2
                          color={
                            selectedPersonas.length === 0
                              ? "gray300"
                              : "gray800"
                          }
                        >
                          시나리오 분석을 원하는 페르소나를 선택해주세요 (
                          {selectedPersonas.length}/5)
                        </Body2>
                        <Button
                          Large
                          Primary
                          Round
                          Fill
                          disabled={
                            selectedPersonas.length === 0 ||
                            toolStep >= 2 ||
                            isLoading ||
                            isLoadingScenario
                          }
                          onClick={handleSubmitPersonas}
                        >
                          다음
                          <images.ChevronRight
                            width="20"
                            height="20"
                            color={palette.white}
                          />
                        </Button>
                      </BottomBar>
                    </div>
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 3 && completedSteps.includes(2) && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Persona Scenario Analysis</H3>
                  <Body3 color="gray800">
                    선택하신 잠재고객과 비즈니스의 연관성을 분석해드려요
                  </Body3>
                </div>

                <div className="content">
                  <CardGroupWrap column style={{ marginBottom: "140px" }}>
                    {selectedTargetDiscoveryPersona.map((persona, index) => {
                      // selectedTargetDiscoveryScenario에서 매칭되는 시나리오 데이터 찾기
                      const matchingScenarioData =
                        selectedTargetDiscoveryScenario.find(
                          (scenarioData) => scenarioData.title === persona.title
                        );

                      const hasScenarioData = Boolean(
                        matchingScenarioData?.scenario
                      );
                      const isLoading = loadingPersonas[persona.title];

                      return (
                        <MoleculeToolPersonaCard
                          key={index}
                          title={persona.title}
                          keywords={persona.content.keywords}
                          viewType="list"
                          hideCheckCircle={true}
                          popupType="detail"
                          personaData={persona}
                          personaScenario={matchingScenarioData?.scenario} // scenario 객체만 전달
                          onDetailClick={() => setShowPopupMore(true)}
                          selectedIndex={index}
                          buttonText={getButtonText(
                            persona,
                            hasScenarioData,
                            isLoading
                          )}
                          disabled={isLoading}
                        />
                      );
                    })}
                  </CardGroupWrap>

                  <BottomBar W100>
                    <Body2 color="gray800">
                      {selectedPersonas.length}명의 페르소나에 대한 잠재고객
                      가능성을 분석해드릴게요
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={
                        isLoading ||
                        isLoadingScenario ||
                        toolStep >= 3 ||
                        !targetDiscoveryScenario ||
                        targetDiscoveryScenario.length !==
                          selectedTargetDiscoveryPersona.length
                      }
                      onClick={handleSubmitScenario}
                    >
                      다음
                      <images.ChevronRight
                        width="20"
                        height="20"
                        color={palette.white}
                      />
                    </Button>
                  </BottomBar>
                </div>
              </TabContent5>
            )}

            {activeTab === 4 && completedSteps.includes(3) && (
              <TabContent5 Small>
                {isLoadingScenario ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="결과보고서를 작성하고 있습니다" />
                  </div>
                ) : (
                  <>
                    <BgBoxItem primaryLightest>
                      <H3 color="gray800">타겟 탐색기 인사이트 분석</H3>
                      <Body3 color="gray800">
                        잠재 고객과 시나리오 분석을 통해 새로운 전략적 방향을
                        탐색해보세요
                      </Body3>
                    </BgBoxItem>

                    <InsightAnalysis>
                      <div className="title">
                        <H4 color="gray800">
                          잠재력이 가장 높은 페르소나는{" "}
                          {targetDiscoveryFinalReport?.potential_rank_1?.title}
                          입니다.
                        </H4>
                        {/* <Button Primary onClick={() => setShowPopupSave(true)}>
                          리포트 저장하기
                        </Button> */}
                      </div>

                      <div className="content">
                        <Body3 color="gray700">
                          {
                            targetDiscoveryFinalReport?.potential_rank_1
                              ?.discovery_criteria
                          }
                        </Body3>

                        <Body3 color="gray700">
                          {
                            targetDiscoveryFinalReport?.potential_rank_1
                              ?.selection_criteria
                          }
                        </Body3>
                      </div>
                    </InsightAnalysis>

                    <ListBoxWrap style={{ marginBottom: "240px" }}>
                      {targetDiscoveryFinalReport &&
                        Object.keys(targetDiscoveryFinalReport)
                          .filter((key) => key.startsWith("potential_rank_"))
                          .map((rankKey) => {
                            const rank = parseInt(rankKey.split("_").pop());
                            const rankData =
                              targetDiscoveryFinalReport[rankKey];

                            if (!rankData?.title) return null;

                            return (
                              <MoleculeToolPersonaCard
                                key={rankKey}
                                title={rankData?.title}
                                keywords={[
                                  ...(rankKey === "potential_rank_1"
                                    ? ["Strong Potential"]
                                    : []),
                                  ...(rankData?.keywords || []),
                                ]}
                                hideCheckCircle={true}
                                viewType="list"
                                popupType="detail"
                                personaData={selectedTargetDiscoveryScenario?.find(
                                  (item) => item.title === rankData?.title
                                )}
                                personaScenario={
                                  selectedTargetDiscoveryScenario?.find(
                                    (item) => item.title === rankData?.title
                                  )?.scenario
                                }
                                additionalContent={
                                  <Body3 color="gray700" align="left">
                                    {rankData?.rank_reason}
                                  </Body3>
                                }
                              />
                            );
                          })}
                    </ListBoxWrap>

                    {/* <Button
                      Small
                      Primary
                      onClick={() => setShowPopupSave(true)}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      리포트 저장하기
                    </Button> */}
                  </>
                )}
              </TabContent5>
            )}
          </TargetDiscoveryWrap>
        </MainContent>
      </ContentsWrap>

      {showPopupRetry && (
        <PopupWrap
          Warning
          title="다시 입력해 주세요."
          message="현재 입력하신 정보는 목적을 생성할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => window.location.reload()}
        />
      )}

      {showPopupError && (
        <PopupWrap
          Warning
          title="작업이 중단되었습니다"
          message="데이터 오류로 인해 페이지가 초기화됩니다."
          message2="작업 중인 내용은 보관함을 확인하세요."
          buttonType="Outline"
          closeText="확인"
          onConfirm={() => {
            window.location.reload();
          }}
          onCancel={() => {
            window.location.reload();
          }}
        />
      )}

      {showPopupSave && (
        <PopupWrap
          Check
          title="리포트가 저장되었습니다."
          message="저장된 리포트는 '보관함'을 확인해주세요"
          buttonType="Outline"
          closeText="보관함 바로가기"
          confirmText="리포트 계속 확인"
          isModal={false}
          onCancel={() => setShowPopupSave(false)}
          onConfirm={() => setShowPopupSave(false)}
        />
      )}
    </>
  );
};

export default PageTargetDiscovery;

const TargetDiscoveryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const CustomButton = styled(Button)`
  min-width: 92px;
`;

const InsightAnalysis = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
  }
`;

const MyDashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MyDashboardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const MyDashboardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MyProjectWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin: 50px auto;
`;

const MyProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled(H5)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: ${palette.gray800};
  padding-bottom: 20px;
  border-bottom: 1px solid ${palette.outlineGray};
`;

const ProjectList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > p {
    flex-grow: 1;
    text-align: left;
  }

  > p:nth-child(1) {
    max-width: 440px;
    width: 100%;
  }

  > p:nth-child(2) {
    max-width: 220px;
    width: 100%;
  }

  > p:nth-child(3) {
    max-width: 165px;
    width: 100%;
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // gap: 12px;
  gap: ${(props) => (props.Nodata ? "16px" : "12px")};
  // padding: 12px 24px;
  padding: ${(props) => (props.Nodata ? "52px 24px 40px" : "12px 24px")};
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.white};
  z-index: 1;
  transition: box-shadow 0.3s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen &&
    `
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
  `}

  ${(props) =>
    props.Nodata &&
    css`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        p {
          color: ${palette.gray500};
          line-height: 1.5;
        }
      }
    `}
`;

const ProjectInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 440px;
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
  color: ${palette.gray800};

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${palette.gray500};
  }
`;

const Persona = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  max-width: 230px;
  width: 100%;
  padding: 8px;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px 24px;
    flex: 1;
    text-align: left;

    + div:before {
      position: absolute;
      top: 50%;
      left: -12px;
      transform: translateY(-50%);
      width: 1px;
      height: 19px;
      background-color: ${palette.outlineGray};
      content: "";
    }

    span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.gray300};
    }

    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-size: 0.875rem;
      color: ${palette.gray700};
    }
  }
`;

const Recruit = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 155px;
  width: 100%;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray300};
  }

  p {
    font-size: 0.875rem;
    color: ${palette.gray700};

    &.ing {
      color: ${palette.primary};
    }

    &.complete {
      color: ${palette.green};
    }
  }
`;

const Report = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray300};
  }

  p {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.875rem;
    color: ${palette.gray700};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-family: "Pretendard", poppins;
    font-size: 0.75rem;
    font-weight: 400;
    color: ${palette.gray500};
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid ${palette.outlineGray};
    background-color: ${palette.chatGray};
  }
`;

const ProjectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid ${palette.outlineGray};

  p {
    font-size: 0.875rem;
    color: ${palette.gray800};
  }

  button {
    font-family: "Pretendard", poppins;
    font-size: 0.75rem;
    color: ${palette.white};
    padding: 6px 10px;
    border-radius: 4px;
    border: none;
    background-color: ${palette.primary};
  }
`;

const ProjectView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 28px 20px 20px;
  margin-top: -20px;
  border-radius: 0 0 10px 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.chatGray};
  animation: slideDown 0.3s ease-in-out;
  transform-origin: top;
  opacity: 1;

  &.closing {
    animation: slideUp 0.3s ease-in-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

const ViewInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: $space-between;
  gap: 4px;
  width: 100%;
  font-size: 0.875rem;
  color: ${palette.gray800};

  + div {
    padding-top: 16px;
    border-top: 1px solid ${palette.outlineGray};
  }

  .title {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 8px;
    font-size: 0.875rem;
    color: ${palette.black};

    span {
      font-size: 0.75rem;
      font-weight: 300;
      color: ${palette.gray500};
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 7px;
      font-size: 0.875rem;
      font-weight: 300;
      color: ${palette.gray500};
      line-height: 1.5;

      + div:before {
        position: absolute;
        top: 50%;
        left: -16px;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background-color: ${palette.outlineGray};
        content: "";
      }
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    button {
      font-family: "Pretendard", poppins;
      font-size: 0.75rem;
      font-weight: 300;
      padding: 6px 10px;
      border-radius: 6px;

      &.view {
        color: ${palette.black};
        border: 1px solid ${palette.outlineGray};
        background: ${palette.chatGray};
      }

      &.analysis {
        color: ${palette.primary};
        border: 1px solid ${palette.primary};
        background: #e9f1ff;
      }
    }
  }
`;

const ViewInfoNodata = styled(ViewInfo)`
  justify-content: center;
  padding: 24px 0 16px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      line-height: 1.5;
      color: ${palette.gray500};

      span {
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.5;
        color: ${palette.primary};
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid ${palette.primary};
        background-color: #e9f1ff;
        cursor: pointer;
      }
    }
  }
`;

const PageWrap = styled.div`
  width: 100%;
`;
