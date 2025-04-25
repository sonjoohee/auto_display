//디자인 감성 분석기
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import Markdown from "markdown-to-jsx";
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  CardGroupWrap,
  BgBoxItem,
  DropzoneStyles,
  ListBoxGroup,
  PersonaGroup,
  Persona,
  BoxWrap,
  TabContent5Item,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../../assets/styles/Images";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  PROJECT_SAAS,
  PSST_BUSINESS_INFO,
  PERSONA_LIST_SAAS,
  CUSTOMER_JOURNEY_MAP_MOMENT_ANALYSIS,
  CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA,
  CUSTOMER_JOURNEY_MAP_REPORT,
  CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION,
  CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION_INDEX,
} from "../../../../AtomStates";
import personaImages from "../../../../../assets/styles/PersonaImages";
import {
  H3,
  Body1,
  Body2,
  Body3,
} from "../../../../../assets/styles/Typography";
import {
  createToolOnServer,
  updateToolOnServer,
  EducationToolsRequest,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import MoleculeWriteCard from "../molecules/MoleculeWriteCard";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";

const prepareMarkdown = (text) => {
  if (!text) return "";
  // 연속된 줄바꿈('\n\n')을 <br/><br/>로 변환
  return text.replace(/\n\n/g, "\n&nbsp;\n").replace(/\n/g, "  \n");
};

const PageCustomerJourneyMap = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [psstBusinessInfo, setPsstBusinessInfo] = useAtom(PSST_BUSINESS_INFO);
  const [
    customerJourneyMapSelectedPersona,
    setCustomerJourneyMapSelectedPersona,
  ] = useAtom(CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [
    customerJourneyMapMomentAnalysis,
    setCustomerJourneyMapMomentAnalysis,
  ] = useAtom(CUSTOMER_JOURNEY_MAP_MOMENT_ANALYSIS);
  const [customerJourneyMapSelectedDirection, ,] = useAtom(
    CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION
  );
  const [customerJourneyMapReport, setCustomerJourneyMapReport] = useAtom(
    CUSTOMER_JOURNEY_MAP_REPORT
  );
  const [customerJourneyMapSelectedDirectionIndex] = useAtom(
    CUSTOMER_JOURNEY_MAP_SELECTED_DIRECTION_INDEX
  );

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [isCreateReportIndex, setIsCreateReportIndex] = useState(false);
  const [hideIndexButton, setHideIndexButton] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState(null);
  const [selectedMoment, setSelectedMoment] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [customItemCount, setCustomItemCount] = useState(0);
  const [selectedMomentData, setSelectedMomentData] = useState(null);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(
    "customerJourneyMapMomentAnalysis",
    customerJourneyMapMomentAnalysis
  );
  useEffect(() => {
    const interviewLoading = async () => {
      if (toolLoading) {
        // 비즈니스 정보 설정 (Step 1)
        if (psstBusinessInfo) {
          setPsstBusinessInfo(psstBusinessInfo ?? {});
        }

        // 활성 탭 설정 (기본값 1)
        // setActiveTab(Math.min((toolStep ?? 1) +1 , 3));
        if (toolStep === undefined || toolStep === 1) {
          setActiveTab(1);
          setToolSteps(0);
          setCompletedSteps([]);
        } else {
          setActiveTab(Math.min(toolStep, 3));
          setToolSteps(toolStep);
          const completedStepsArray = [];
          for (let i = 1; i <= toolStep; i++) {
            completedStepsArray.push(i);
          }
          setCompletedSteps(completedStepsArray);
        }

        if (customerJourneyMapMomentAnalysis) {
          setCustomerJourneyMapMomentAnalysis(
            customerJourneyMapMomentAnalysis ?? []
          );
        }
        if (customerJourneyMapSelectedDirection) {
          setSelectedMomentData(customerJourneyMapSelectedDirection ?? []);
        }
        if (customerJourneyMapSelectedDirectionIndex) {
          setSelectedMoment(customerJourneyMapSelectedDirectionIndex ?? []);
        }
        if (customerJourneyMapReport) {
          setCustomerJourneyMapReport(customerJourneyMapReport ?? []);
        }
        if (customerJourneyMapSelectedPersona) {
          setSelectedPersonas(customerJourneyMapSelectedPersona ?? {});
        }

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  // const handleCheckboxChange = (momentId) => {
  //   // if (toolSteps >= 2) return;
  //   setSelectedMoment((prev) => {
  //     // 하나만 선택되도록 변경, 다른 항목 선택 시 해당 항목으로 변경
  //     if (prev.includes(momentId)) {
  //       return []; // 이미 선택된 항목을 다시 클릭하면 선택 해제
  //     } else {
  //       return [momentId]; // 새 항목 선택
  //     }
  //   });
  // };

  const handleCheckboxChange = (momentId) => {
    setSelectedMoment((prev) => {
      if (prev.includes(momentId)) {
        setSelectedMomentData(null); // 선택 해제 시 데이터도 초기화
        return [];
      } else {
        // 선택된 moment의 전체 데이터 저장
        const selectedData = customerJourneyMapMomentAnalysis[momentId];
        setSelectedMomentData(selectedData);
        return [momentId];
      }
    });
  };

  console.log("selectedMomentData", selectedMomentData);
  console.log("selectedMoment", selectedMoment);

  const business = {
    business: project?.projectAnalysis?.business_analysis || "",
    // target: project?.projectAnalysis?.target_customer || "",
    business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };
  console.log("🚀 ~ PageCustomerJourneyMap ~ business.project:", project);

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  const handleSubmitPersona = async () => {
    setIsLoading(true);
    handleNextStep(1);
    setToolSteps(1);

    try {
      // 선택된 페르소나에서 필요한 필드만 추출
      const selectedCustomer = {
        personaName: selectedPersonas?.personaName || "",
        personaCharacteristics: selectedPersonas?.personaCharacteristics || "",
        age: selectedPersonas?.age || "",
        gender: selectedPersonas?.gender || "",
        job: selectedPersonas?.job || "",
        // keywords: selectedPersonas?.keywords || [],
        // imageKey: selectedPersonas?.imageKey || "",
        userExperience: selectedPersonas?.userExperience || "",
        // consumptionPattern: selectedPersonas?.consumptionPattern || "",
        interests: selectedPersonas?.interests || "",
        // lifestyle: selectedPersonas?.lifestyle || "",
      };

      const data = {
        projectId: project._id,
        type: "ix_customer_journey_map_direction_education",
        business: business,
        persona: selectedCustomer,
      };

      setCustomerJourneyMapSelectedPersona(selectedCustomer);

      let response = await EducationToolsRequest(data, isLoggedIn);

      const maxAttempts = 10;
      let attempts = 0;

      while (
        attempts < maxAttempts &&
        (!response ||
          !response?.response?.customer_journey_map_direction_education ||
          !response?.response?.customer_journey_map_direction_education
            ?.time_based ||
          !response?.response?.customer_journey_map_direction_education
            ?.context_based ||
          !response?.response?.customer_journey_map_direction_education
            ?.goal_based)
      ) {
        response = await EducationToolsRequest(data, isLoggedIn);
        attempts++;
      }
      if (attempts >= maxAttempts) {
        setShowPopupError(true);
        return;
      }

      // 데이터 변환 및 저장
      const transformedData = Object.entries(
        response.response.customer_journey_map_direction_education
      ).reduce(
        (acc, [type, items]) => [
          ...acc,
          ...items.map((item) => ({
            name: item.title,
            description: item.description,
            type: type,
          })),
        ],
        []
      );

      // 상태 업데이트
      setCustomerJourneyMapMomentAnalysis(transformedData);

      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_customer_journey_map_education",
        },
        isLoggedIn
      );
      setToolId(responseToolId);

      await updateToolOnServer(
        responseToolId,
        {
          customerJourneyMapMomentAnalysis: transformedData,
          customerJourneyMapSelectedPersona: selectedPersonas,
          completedStep: 2,
        },
        isLoggedIn
      );

      setToolSteps(2);
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
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addCustomMoment = () => {
    if (inputValue.trim() && customItemCount < 3) {
      setCustomerJourneyMapMomentAnalysis([
        ...customerJourneyMapMomentAnalysis,
        {
          name: inputValue,
        },
      ]);
      setInputValue("");
      setCustomItemCount((prev) => prev + 1);
    }
  };

  const handleReportRequest = async () => {
    setIsLoadingReport(true);
    handleNextStep(2);
    // setToolSteps(2);
    try {
      await updateToolOnServer(
        toolId,
        {
          selectedDirection: selectedMomentData,
          selectedDirectionIndex: selectedMoment,
          customerJourneyMapMomentAnalysis: customerJourneyMapMomentAnalysis,
        },
        isLoggedIn
      );

      try {
        const apiRequestData = {
          type: "ix_customer_journey_map_report_education",
          business: business,
          persona: customerJourneyMapSelectedPersona,
          direction: selectedMomentData,
        };

        let response = await EducationToolsRequest(apiRequestData, isLoggedIn);

        const maxAttempts = 10;
        let attempts = 0;

        while (
          attempts < maxAttempts &&
          (!response ||
            !response?.response ||
            !response?.response?.customer_journey_map_report_education)
        ) {
          response = await EducationToolsRequest(apiRequestData, isLoggedIn);
          attempts++;
        }
        if (attempts >= maxAttempts) {
          setShowPopupError(true);
          return;
        }
        setCustomerJourneyMapReport(
          response.response.customer_journey_map_report_education
        );

        setIsLoadingReport(false);

        await updateToolOnServer(
          toolId,
          {
            completedStep: 3,
            customerJourneyMapReport:
              response.response.customer_journey_map_report_education,
          },
          isLoggedIn
        );
      } catch (error) {}
      setToolSteps(3);
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
      setIsLoadingReport(false);
    }
  };

  const getSelectedCount = () => {
    if (!selectedPersonas) return 0;
    return Array.isArray(selectedPersonas) ? selectedPersonas.length : 1;
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("customerjourneymap")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          navigate("/Project");
          return true;
        }
        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }
      return false;
    };
    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = (event) => {
      event.preventDefault();

      event.returnValue = "";

      navigate("/Project");
    };
    // F5 키 또는 Ctrl+R 감지
    const handleKeyDown = (event) => {
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 키 코드
        event.preventDefault();
        navigate("/Project");
      }
    };

    detectRefresh();

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
  console.log("selectedPersonas", selectedPersonas);
  return (
    <>
      <DropzoneStyles />
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <DesignAnalysisWrap>
            <TabWrapType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
                disabled={isLoading || isLoadingReport}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    페르소나 선택
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={
                  !completedSteps.includes(1) || isLoading || isLoadingReport
                }
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    분석 방향 설정
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={
                  !completedSteps.includes(3) || isLoading || isLoadingReport
                }
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    유저저니맵 분석
                  </Body1>
                  {/* <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    Generate Business Plan​
                  </Body1> */}
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Persona Selection</H3>
                    <Body3 color="gray800">
                      고객 여정 분석을 진행할 대상 페르소나를 선택해주세요
                    </Body3>
                  </div>

                  <div className="content">
                    <div>
                      <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">페르소나 선택</Body2>
                          {selectedPersonas ? (
                            <PersonaGroup>
                              {Array.isArray(selectedPersonas) ? (
                                <>
                                  {selectedPersonas.length > 3 && (
                                    <span>+{selectedPersonas.length - 3}</span>
                                  )}
                                  {selectedPersonas
                                    .slice(0, 3)
                                    .map((persona, index) => (
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          alignItems: "center",
                                          gap: "10px",
                                        }}
                                      >
                                        <Persona key={index} size="Small" Round>
                                          <img
                                            src={
                                              personaImages[persona.imageKey] ||
                                              (persona.gender === "남성"
                                                ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                                : personaImages.persona_f_20_01) // 여성 기본 이미지
                                            }
                                            alt={persona.personaName}
                                          />
                                        </Persona>
                                        {/* <Body1 color="gray800">
                                          {persona.personaName}
                                        </Body1>
                                        <PersonaInfo>
                                          <span>{persona.gender}</span>
                                          <span>
                                            {persona.age.includes("세")
                                              ? persona.age
                                              : `${persona.age}세`}
                                          </span>
                                          <span>{persona.job}</span>
                                        </PersonaInfo> */}
                                      </div>
                                    ))}
                                </>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <Persona size="Small" Round>
                                    <img
                                      src={
                                        personaImages[
                                          selectedPersonas.imageKey
                                        ] ||
                                        (selectedPersonas.gender === "남성"
                                          ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                          : personaImages.persona_f_20_01) // 여성 기본 이미지
                                      }
                                      alt={selectedPersonas.personaName}
                                    />
                                  </Persona>
                                  <Body1 color="gray800">
                                    {selectedPersonas.personaName}
                                  </Body1>
                                  <PersonaInfo>
                                    <span>{selectedPersonas.gender}</span>
                                    <span>
                                      {selectedPersonas.age.includes("세")
                                        ? selectedPersonas.age
                                        : `${selectedPersonas.age}세`}
                                    </span>
                                    <span>{selectedPersonas.job}</span>
                                  </PersonaInfo>
                                </div>
                              )}
                            </PersonaGroup>
                          ) : (
                            <Body2 color="gray300">
                              아래 리스트에서 페르소나를 선택해주세요 (1명
                              선택가능)
                            </Body2>
                          )}
                        </li>
                      </ListBoxGroup>
                    </div>

                    <TabContent5Item style={{ marginTop: "20px" }}>
                      <div className="title">
                        <Body1 color="gray800">
                          고객 여정 분석을 진행할 페르소나를 선택해주세요 (AI
                          페르소나 Favorite에서 리스트 설정 가능)
                        </Body1>
                      </div>
                      {personaListSaas.filter((item) => item.favorite === true)
                        .length >= 20 ? (
                        <MoleculePersonaSelectCard
                          filteredPersonaList={personaListSaas}
                          selectedPersonas={selectedPersonas}
                          onPersonaSelect={(persona) => {
                            setSelectedPersonas(persona);
                            // 필요한 경우 여기서 추가 로직 수행
                          }}
                          disabled={toolSteps >= 1}
                        />
                      ) : (
                        <BoxWrap
                          Hover
                          NoData
                          Border
                          onClick={() => navigate("/AiPersona")}
                        >
                          <img src={images.PeopleStarFillPrimary} alt="" />
                          <Body2 color="gray500" align="center !important">
                            즐겨찾기를 하시면 관심 있는 페르소나를 해당
                            페이지에서 확인하실 수 있습니다.{" "}
                            {
                              personaListSaas.filter(
                                (item) => item.favorite === true
                              ).length
                            }
                          </Body2>
                        </BoxWrap>
                      )}
                    </TabContent5Item>
                  </div>

                  <Button
                    Other
                    Primary
                    Fill
                    Round
                    onClick={handleSubmitPersona}
                    disabled={
                      toolSteps >= 1 ||
                      getSelectedCount() === 0 ||
                      personaListSaas.filter((item) => item.favorite === true)
                        .length < 20
                    }
                  >
                    다음
                  </Button>
                </>
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
                    <AtomPersonaLoader message="로딩중..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Moment of Analysis</H3>
                      <Body3 color="gray800">
                        페르소나의 고객 여정에서 집중적으로 분석하고 싶은 순간을
                        선택해주세요
                      </Body3>
                    </div>

                    <div className="content">
                      <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">페르소나 선택</Body2>
                          {selectedPersonas ? (
                            <PersonaGroup>
                              {Array.isArray(selectedPersonas) ? (
                                <>
                                  {selectedPersonas.length > 3 && (
                                    <span>+{selectedPersonas.length - 3}</span>
                                  )}
                                  {selectedPersonas
                                    .slice(0, 3)
                                    .map((persona, index) => (
                                      <Persona key={index} size="Small" Round>
                                        <img
                                          src={
                                            personaImages[persona.imageKey] ||
                                            (persona.gender === "남성"
                                              ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                              : personaImages.persona_f_20_01) // 여성 기본 이미지
                                          }
                                          alt={persona.persona}
                                        />
                                      </Persona>
                                    ))}
                                </>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <Persona size="Small" Round>
                                    <img
                                      src={
                                        personaImages[
                                          selectedPersonas.imageKey
                                        ] ||
                                        (selectedPersonas.gender === "남성"
                                          ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                          : personaImages.persona_f_20_01) // 여성 기본 이미지
                                      }
                                      alt={selectedPersonas.personaName}
                                    />
                                  </Persona>
                                  <Body1 color="gray800">
                                    {selectedPersonas.personaName}
                                  </Body1>
                                  <PersonaInfo>
                                    <span>{selectedPersonas.gender}</span>
                                    <span>
                                      {selectedPersonas.age.includes("세")
                                        ? selectedPersonas.age
                                        : `${selectedPersonas.age}세`}
                                    </span>
                                    <span>{selectedPersonas.job}</span>
                                  </PersonaInfo>
                                </div>
                              )}
                            </PersonaGroup>
                          ) : (
                            <Body2 color="gray300">
                              페르소나가 선택되지 않았습니다. 하단에서
                              페르소나를 선택해 주세요!(1명 선택 가능)
                            </Body2>
                          )}
                        </li>

                        <li>
                          <Body2 color="gray500">분석 장면 선택</Body2>
                          {/* <Body2 color={selectedMoment !== null ? "gray800" : "gray300"}>
                          {selectedMoment !== null && customerJourneyMapMomentAnalysis[selectedMoment]
                            ? customerJourneyMapMomentAnalysis[selectedMoment].name
                            : '선택해주세요'}
                        </Body2> */}
                          <Body2
                            color={
                              selectedMoment?.length > 0 ? "gray800" : "gray300"
                            }
                          >
                            {selectedMoment?.length > 0
                              ? customerJourneyMapMomentAnalysis[selectedMoment]
                                  ?.name
                              : "선택해주세요"}
                          </Body2>
                        </li>
                      </ListBoxGroup>
                      <TabContent5Item style={{ marginTop: "20px" }}>
                        <div className="title">
                          <Body1 color="gray800">
                            어떤 순간을 고객 여정으로 분석하시겠습니까?{" "}
                          </Body1>
                        </div>

                        <CardGroupWrap
                          column
                          style={{ marginBottom: "0px", width: "100%" }}
                        >
                          {customerJourneyMapMomentAnalysis.map(
                            (moment, index) => {
                              return (
                                <MoleculeDesignItem
                                  FlexStart
                                  key={index}
                                  id={index}
                                  title={moment.name}
                                  isSelected={selectedMoment.includes(index)}
                                  onSelect={() => handleCheckboxChange(index)}
                                  disabled={toolSteps > 2}
                                />
                              );
                            }
                          )}
                        </CardGroupWrap>
                        <div style={{ marginBottom: "140px", width: "100%" }}>
                          {customItemCount < 3 && (
                            <>
                              {showCustomForm && (
                                <MoleculeWriteCard
                                  placeholder="직접 입력"
                                  value={inputValue}
                                  onChange={handleInputChange}
                                  onSubmit={addCustomMoment}
                                  buttonText="등록"
                                />
                              )}

                              <CustomButton
                                onClick={() =>
                                  setShowCustomForm(!showCustomForm)
                                }
                                style={{ width: "100%" }}
                                disabled={toolSteps > 2}
                              >
                                <ButtonContent>
                                  <PlusIconWrapper>
                                    <PlusIcon>+</PlusIcon>
                                    <ButtonTitle>직접 생성하기</ButtonTitle>
                                  </PlusIconWrapper>
                                </ButtonContent>
                              </CustomButton>
                            </>
                          )}
                        </div>
                      </TabContent5Item>
                    </div>
                    <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={handleReportRequest}
                      disabled={toolSteps > 2 || selectedMoment.length === 0}
                    >
                      다음
                    </Button>
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 3 && completedSteps.includes(2) && (
              <TabContent5 Small>
                {isLoadingReport ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader
                      message={`결과보고서를 작성하고 있습니다.
                        1분 정도 소요 될 수 있어요.`}
                    />
                  </div>
                ) : (
                  <>
                    <BgBoxItem primaryLightest>
                      <H3 color="gray800">Customer Journey Analysis</H3>
                      <Body3 color="gray800">
                        페르소나와 분석 상황을 기반으로 고객 여정의 주요 단계를
                        정리해드립니다
                      </Body3>
                    </BgBoxItem>
                    <InsightAnalysis>
                      <div
                        className="markdown-body"
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Markdown>
                          {prepareMarkdown(customerJourneyMapReport ?? "")}
                        </Markdown>
                      </div>
                    </InsightAnalysis>
                    <InsightAnalysis>
                      <div
                        className="markdown-body"
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Markdown>
                          {prepareMarkdown(customerJourneyMapReport ?? "")}
                        </Markdown>
                      </div>
                    </InsightAnalysis>
                  </>
                )}
              </TabContent5>
            )}
          </DesignAnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {showPopupError && (
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

      {showPopupFileSize && (
        <PopupWrap
          Warning
          title="파일 크기 초과"
          message="파일 크기는 20MB를 초과할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => setShowPopupFileSize(false)}
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

export default PageCustomerJourneyMap;

const DesignAnalysisWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const InsightAnalysis = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  text-align: left;

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

  p {
    text-align: left;
  }

  /* GitHub Markdown 스타일 적용 */
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    color: ${palette.gray800};
    font-family: "Pretendard";
    line-height: 1.65;
    /* white-space: pre-wrap; */
    /* max-width: 980px; */
    /* padding: 45px; */
    /* &,
    p,
    li,
    ul,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong,
    em,
    span,
    div {
      color: ${palette.gray800}; 
    } */
    @media (max-width: 767px) {
      padding: 15px;
    }
  }
`;

const CustomButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${palette.white};
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  margin-top: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${palette.gray50};
    border-color: ${palette.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

const ButtonTitle = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  color: ${palette.gray700};
`;

const PlusIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlusIcon = styled.span`
  font-size: 16px;
  color: ${palette.gray700};
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  height: 65px;
  padding: 24px 20px;
  border: 1px solid #e0e4eb;
  border-radius: 8px;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none; // 기본 포커스 아웃라인 제거
    border-color: #e0e4eb; // 기존 테두리 색상 유지
  }
`;

const RegisterButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 6px;
  background: ${(props) => (props.disabled ? "#F7F8FA" : "#F0F4FF")};
  color: ${(props) => (props.disabled ? "#8C8C8C" : "#226FFF")};
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};

  // &:hover {
  //   background: ${(props) => (props.disabled ? "#E0E4EB" : "#1b5cd9")};
  // }
`;

const AddButton = styled.button`
  width: 100%;
  height: 48px;
  border: 1px dashed #e0e4eb;
  border-radius: 8px;
  background: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #f8f9fa;
  }
`;

const PersonaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${palette.gray500};
    font-size: 14px;

    + span:before {
      width: 1px;
      height: 10px;
      display: block;
      background: ${palette.gray500};
      content: "";
    }
  }
`;
