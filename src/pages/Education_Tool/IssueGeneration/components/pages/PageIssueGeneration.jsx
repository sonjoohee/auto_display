//디자인 감성 분석기
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button, IconButton } from "../../../../../assets/styles/ButtonStyle";
import {
  FormBox,
  CustomTextarea,
} from "../../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  TabWrapType4,
  TabButtonType4,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  CardGroupWrap,
  BottomBar,
  BgBoxItem,
  StyledDropzone,
  DropzoneStyles,
  OCEANRangeWrap,
  RangeSlider,
  Title,
  ListBoxGroup,
  BoxWrap,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  DESIGN_ANALYSIS_BUSINESS_INFO,
  DESIGN_ANALYSIS_EMOTION_ANALYSIS,
  DESIGN_ANALYSIS_SELECTED_PERSONA,
  DESIGN_ANALYSIS_EMOTION_TARGET,
  DESIGN_ANALYSIS_EMOTION_SCALE,
  DESIGN_ANALYSIS_FILE_NAMES,
  DESIGN_ANALYSIS_FILE_ID,
  PROJECT_SAAS,
  DESIGN_ANALYSIS_BUSINESS_TITLE,
  IDEA_GENERATION_START_POSITION,
  IDEA_GENERATION_IDEA_LIST,
  CUSTOMER_JOURNEY_MAP_REPORT,
  CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA,
  IDEA_GENERATION_PROBLEM_LIST,
  PERSONA_LIST_SAAS,
  IDEA_GENERATION_MANDALART_DATA,
  IDEA_GENERATION_PROBLEM_LIST_TITLE,
  IDEA_GENERATION_SELECTED_START_POSITION,
  IDEA_GENERATION_SELECTED_MANDALART,
  IDEA_GENERATION_POSSSESSION_TECH,
  IDEA_GENERATION_SELECTED_PURPOSE,
} from "../../../../AtomStates";
import {
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../../../assets/styles/InputStyle";
import images from "../../../../../assets/styles/Images";
import {
  H4,
  H3,
  Sub3,
  Body1,
  Body2,
  Body3,
  Caption1,
} from "../../../../../assets/styles/Typography";
import {
  createToolOnServer,
  updateToolOnServer,
  EducationToolsRequest,
  getFindToolListOnServerSaas,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import MoleculeDeleteForm from "../../../public/MoleculeDeleteForm";
import MandalArtGraph from "../../../../../components/Charts/MandalArtGraph";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import MoleculeTagList from "../molecules/MoleculeTagList";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import MoleculeMandalArtGraph from "../molecules/MoleculeMandalArtGraph";
import OrganismToastPopupQuickSurveyComplete from "../molecules/OrganismToastPopupQuickSurveyComplete";

const PageIssueGeneration = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [
    ideaGenerationSelectedStartPosition,
    setIdeaGenerationSelectedStartPosition,
  ] = useAtom(IDEA_GENERATION_SELECTED_START_POSITION);
  const [ideaGenerationStartPosition, setIdeaGenerationStartPosition] = useAtom(
    IDEA_GENERATION_START_POSITION
  );

  const [ideaGenerationPossessionTech, setIdeaGenerationPossessionTech] =
    useAtom(IDEA_GENERATION_POSSSESSION_TECH);
  const [ideaGenerationSelectedPurpose, setIdeaGenerationSelectedPurpose] =
    useAtom(IDEA_GENERATION_SELECTED_PURPOSE);

  const [ideaGenerationProblemList, setIdeaGenerationProblemList] = useAtom(
    IDEA_GENERATION_PROBLEM_LIST
  );
  const [ideaGenerationMandalArtData, setIdeaGenerationMandalArtData] = useAtom(
    IDEA_GENERATION_MANDALART_DATA
  );
  const [ideaGenerationProblemListTitle, setIdeaGenerationProblemListTitle] =
    useAtom(IDEA_GENERATION_PROBLEM_LIST_TITLE);
  const [ideaGenerationSelectedMandalart, setIdeaGenerationSelectedMandalart] =
    useAtom(IDEA_GENERATION_SELECTED_MANDALART);

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [customerJourneyList, setCustomerJourneyList] = useState([]);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const customerListRef = useRef(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [businessDescriptionTitle, setBusinessDescriptionTitle] = useState("");
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
  });
  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
  });
  const [dropUpStates, setDropUpStates] = useState({
    customerList: false,
  });
  const [, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedJourneyMapData, setSelectedJourneyMapData] = useState([]);
  const [
    customerJourneyMapSelectedPersona,
    setCustomerJourneyMapSelectedPersona,
  ] = useState([]);
  const [customerJourneyMapReport, setCustomerJourneyMapReport] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interviewLoading = async () => {
      // 비즈니스 정보 설정 (Step 1)

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
      const projectTitle = project?.projectTitle;

      if (project) {
        setBusinessDescriptionTitle(projectTitle);
        setBusinessDescription(projectAnalysis);
      }

      if (toolLoading) {
        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 4));
        setToolSteps(toolStep ?? 1);

        if (Object.keys(ideaGenerationSelectedPurpose).length > 0) {
          setSelectedPurposes(ideaGenerationSelectedPurpose ?? {});
        }
        if (ideaGenerationProblemList) {
          setIdeaGenerationProblemList(ideaGenerationProblemList ?? []);
        }
        if (ideaGenerationProblemListTitle) {
          setIdeaGenerationProblemListTitle(
            ideaGenerationProblemListTitle ?? []
          );
        }
        if (ideaGenerationStartPosition) {
          setIdeaGenerationStartPosition(ideaGenerationStartPosition ?? []);
        }
        if (ideaGenerationSelectedStartPosition) {
          setIdeaGenerationSelectedStartPosition(
            ideaGenerationSelectedStartPosition ?? []
          );
        }
        if (ideaGenerationPossessionTech) {
          setProjectDescription(ideaGenerationPossessionTech ?? "");
        }
        if (ideaGenerationMandalArtData) {
          setIdeaGenerationMandalArtData(ideaGenerationMandalArtData ?? []);
        }

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  const business = {
    business: businessDescription,
    business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };

  // 고객핵심가치분석 리스트 가져오기
  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];

        const response = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_customer_journey_map_education",
          isLoggedIn
        );

        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_customer_journey_map_education" &&
            item?.completedStep === 3
        );

        allItems = [...allItems, ...newItems];

        setCustomerJourneyList(allItems);
      } catch (error) {
        setCustomerJourneyList([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn, projectSaas]);

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  // handleInputChange 함수 수정
  const handleInputChange = (field, value) => {
    // formData 대신 개별 상태 업데이트
    if (field === "projectDescription") {
      setProjectDescription(value);
    }
  };

  const handleSubmitProblem = async () => {
    handleNextStep(1);

    const currentProblemList = [...ideaGenerationProblemList];

    // 각 title을 currentProblemList의 해당 인덱스에 할당
    // 만약 currentProblemList가 더 짧다면 새 객체를 생성하여 추가
    const updatedProblemList = ideaGenerationProblemListTitle.map(
      (title, index) => {
        if (index < currentProblemList.length) {
          // 기존 항목이 있으면 title만 업데이트
          return {
            ...currentProblemList[index],
            title: title,
          };
        } else {
          // 기존 항목이 없으면 새 객체 생성
          return { title: title };
        }
      }
    );

    // 업데이트된 리스트로 상태 설정
    setIdeaGenerationProblemList(updatedProblemList);

    await updateToolOnServer(
      toolId,
      {
        // completedStep: 1,
        selectedPurposes: selectedPurposes,
        ideaGenerationProblemList: ideaGenerationProblemList,
        ideaGenerationProblemListTitle: ideaGenerationProblemListTitle,
      },
      isLoggedIn
    );
    try {
      setIsLoading(true);
      // 빈 문자열이나 공백만 있는 항목 제거
      // const validItems = ideaGenerationProblemList.filter(
      //   (item) => item.trim() !== ""
      // );

      // if (validItems.length === 0) {
      //   // 유효한 항목이 없는 경우 처리
      //   return;
      // }

      const Data = {
        type: "ix_idea_generation_keyword_education",
        business_info: business,
        info: customerJourneyMapSelectedPersona,
        problem_needs: ideaGenerationProblemList,
        is_load: true,
      };

      const response = await EducationToolsRequest(Data, isLoggedIn);

      setIdeaGenerationStartPosition(
        response.response.idea_generation_keyword_education
      );

      setIsLoading(false);
      await updateToolOnServer(
        toolId,
        {
          completedStep: 1,
          ideaGenerationStartPosition:
            response.response.idea_generation_keyword_education,
        },
        isLoggedIn
      );

      setToolSteps(1);
    } catch (error) {
      console.error("Error submitting problems:", error);
      setShowPopupError(true);
    }
  };

  const handleSubmitTheme = async () => {
    handleNextStep(2);
    setToolSteps(2);

    await updateToolOnServer(
      toolId,
      {
        completedStep: 2,
        ideaGenerationStartPosition: ideaGenerationStartPosition,
        ideaGenerationSelectedStartPosition:
          ideaGenerationSelectedStartPosition,
        possessionTech: projectDescription,
      },
      isLoggedIn
    );
  };

  const handlePurposeSelect = (purpose, selectBoxId, item) => {
    setSelectedPurposes((prev) => ({
      ...(prev || {}),
      [selectBoxId]: purpose || "",
    }));

    handleContactInputChange("purpose", purpose || "");
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: false,
    }));

    if (selectBoxId === "customerList" && item) {
      setSelectedJourneyMapData(item);

      const persona = item.customerJourneyMapSelectedPersona;
      const Customer = {
        personaName: persona?.personaName || "",
        personaCharacteristics: persona?.personaCharacteristics || "",
        age: persona?.age || "",
        gender: persona?.gender || "",
        job: persona?.job || "",
        keywords: persona?.keywords || [],
        type: persona?.type || "",
      };

      setCustomerJourneyMapSelectedPersona(Customer);
      setCustomerJourneyMapReport(item.customerJourneyMapReport);

      // handleSubmitCustomerJourney ();
      setShouldSubmit(true);
    }
  };

  const [shouldSubmit, setShouldSubmit] = useState(false);
  useEffect(() => {
    if (shouldSubmit) {
      handleSubmitCustomerJourney();
      setShouldSubmit(false); // Reset the flag
    }
  }, [selectedPurposes, shouldSubmit]);

  const handleSubmitCustomerJourney = async () => {
    setIsContentLoading(true);

    setIdeaGenerationSelectedPurpose(selectedPurposes);

    const responseToolId = await createToolOnServer(
      {
        projectId: project._id,
        type: "ix_issue_generation_education",
      },
      isLoggedIn
    );
    setToolId(responseToolId);

    try {
      if (selectedJourneyMapData) {
        // setSelectedJourneyMapData(item);

        const data = {
          type: "ix_idea_generation_problem_education",
          customer_journey_map_persona: customerJourneyMapSelectedPersona,
          customer_journey_map_report: customerJourneyMapReport,
        };

        const response = await EducationToolsRequest(data, isLoggedIn);

        setIdeaGenerationProblemList(
          response.response.idea_generation_problem_education
        );

        setIdeaGenerationProblemListTitle(
          response.response.idea_generation_problem_education.map(
            (item) => item.title
          )
        );

        await updateToolOnServer(
          responseToolId,
          {
            completedStep: 0,
            selectedPurposes: selectedPurposes,
            ideaGenerationProblemList:
              response.response.idea_generation_problem_education,
            ideaGenerationProblemListTitle:
              response.response.idea_generation_problem_education.map(
                (item) => item.title
              ),
          },
          isLoggedIn
        );
      }

      //       await updateToolOnServer(
      //         responseToolId,
      //         {
      //           completedStep: 0,
      //           selectedPurposes: selectedPurposes,
      //           ideaGenerationProblemList: ideaGenerationProblemList,
      //           ideaGenerationProblemListTitle: ideaGenerationProblemListTitle,
      //         },
      //         isLoggedIn
      //       );
    } catch (error) {
      console.error("Error in handlePurposeSelect:", error);
      setShowPopupError(true);
    } finally {
      setTimeout(() => {
        setIsContentLoading(false);
      }, 500);
    }
  };

  const handleMandalArt = async () => {
    handleNextStep(3);
    setToolSteps(3);
    setIsLoadingReport(true);

    const persona_group = personaListSaas
      .filter((persona) => persona?.favorite === true)
      .map((persona) => ({
        name: persona.personaName,
        personaCharacteristics: persona.personaCharacteristics,
        type: persona.type,
        age: persona.age,
        gender: persona.gender,
        job: persona.job,
        keywords: persona.keywords,
      }));

    const persona_group_interview = personaListSaas
      .filter((persona) => persona?.favorite === true)
      .map((persona) => ({
        name: persona.personaName,
        age: persona.age,
        gender: persona.gender,
        job: persona.job,
        keywords: persona.keywords,
        imageKey: persona.imageKey,
      }));

    try {
      const apiResults = [];

      //8번의 API 호출을 순차적으로 실행
      for (let i = 0; i < 8; i++) {
        const Data = {
          type: "ix_idea_generation_interview_education",
          business: business,
          idea_theme: ideaGenerationSelectedStartPosition[i],
          persona_group: persona_group,
        };

        const interviewResponse = await EducationToolsRequest(Data, isLoggedIn);

        const data = {
          type: "ix_idea_generation_report_education",
          business: business,
          idea_content: ideaGenerationSelectedStartPosition[i], // i 인덱스의 아이템만 선택
          interview_list:
            interviewResponse.response.idea_generation_interview_education,
        };

        let reportResponse = await EducationToolsRequest(data, isLoggedIn);

        let reportRetryCount = 0;
        const reportMaxRetries = 10;
        while (
          reportRetryCount < reportMaxRetries &&
          (!reportResponse ||
            !reportResponse?.response ||
            !reportResponse?.response?.idea_generation_report_education ||
            !reportResponse?.response?.idea_generation_report_education
              ?.core_ideas ||
            !reportResponse?.response?.idea_generation_report_education
              ?.detailed_execution_ideas ||
            !reportResponse?.response?.idea_generation_report_education
              ?.additional_execution_ideas)
        ) {
          reportResponse = await EducationToolsRequest(data, isLoggedIn);
          reportRetryCount++;
        }

        if (reportRetryCount >= reportMaxRetries) {
          setShowPopupError(true);
          return;
        }

        const reportData =
          reportResponse.response.idea_generation_report_education;

        reportData.core_ideas = reportData?.core_ideas?.map((coreIdea) => {
          // persona_name과 일치하는 persona 찾기
          const matchingPersona = persona_group_interview.find(
            (persona) => persona.name === coreIdea.persona_name
          );

          return {
            ...coreIdea,
            // 매칭된 persona의 정보 추가
            age: matchingPersona?.age,
            gender: matchingPersona?.gender,
            job: matchingPersona?.job,
            keywords: matchingPersona?.keywords,
            imageKey: matchingPersona?.imageKey,
          };
        });

        apiResults.push(reportData);
      }

      setIdeaGenerationMandalArtData(apiResults);

      await updateToolOnServer(
        toolId,
        {
          completedStep: 4,
          ideaGenerationMandalArtData: apiResults,
        },
        isLoggedIn
      );
    } catch (error) {
      console.error("Error in handleMandalArt:", error);
      setShowPopupError(true);
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...(prev || {}),
      [field]: value || "",
    }));
  };

  const handleSelectBoxClick = (selectBoxId, ref) => {
    // Don't open dropdown if toolSteps >= 1 for customerList
    if (toolSteps >= 1) {
      return;
    }
    if (ideaGenerationProblemList.length > 0) {
      return;
    }

    calculateDropDirection(ref, selectBoxId);
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: !prev?.[selectBoxId],
    }));
  };

  const calculateDropDirection = (ref, selectBoxId) => {
    if (ref?.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200;

      setDropUpStates((prev) => ({
        ...(prev || {}),
        [selectBoxId]: spaceBelow < dropDownHeight && spaceAbove > spaceBelow,
      }));
    }
  };

  const handleEnterInterviewRoom = () => {
    // setSelectedOption(null);
    // setSelectedOptionIndex(null);
    setShowToast(true);
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("ideageneration")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          // console.log("새로고침 감지: URL 비교");
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
      // 이벤트 취소 (표준에 따라)
      event.preventDefault();
      // Chrome은 returnValue 설정 필요
      event.returnValue = "";

      // 새로고침 시 루트 페이지로 이동
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
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    문제 정의
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
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    아이디어 키워드 도출
                  </Body1>
                  {/* <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Design Sector
                  </Body1> */}
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={
                  !completedSteps.includes(2) || isLoading || isLoadingReport
                }
              >
                <span>03</span>
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    아이디어 발상
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 4}
                onClick={() => completedSteps.includes(3) && setActiveTab(4)}
                disabled={!completedSteps.includes(3) || isLoading}
              >
                <span>04</span>
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 4 ? "gray700" : "gray300"}>
                    아이디어 결과 보기
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
                    <AtomPersonaLoader message="문제점 & 니즈 리스트를 불러오고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Problem & Needs</H3>
                      <Body3 color="gray800">
                        고객 여정 분석을 원하는 주요 페르소나의 문제점 또는
                        니즈를 도출하세요
                      </Body3>
                    </div>

                    <div className="content">
                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">
                            고객 여정 지도 가져오기{" "}
                          </Body1>
                        </div>

                        <SelectBox ref={customerListRef}>
                          <SelectBoxTitle
                            onClick={() =>
                              handleSelectBoxClick(
                                "customerList",
                                customerListRef
                              )
                            }
                            style={{
                              cursor:
                                toolSteps >= 1 || isContentLoading
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            <Body2
                              color={
                                selectedPurposes.customerList
                                  ? "gray800"
                                  : "gray300"
                              }
                            >
                              {selectedPurposes.customerList ||
                                "직접 문제점을 작성합니다."}
                            </Body2>
                            <images.ChevronDown
                              width="24px"
                              height="24px"
                              color={palette.gray500}
                              style={{
                                transform: selectBoxStates.customerList
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </SelectBoxTitle>

                          {selectBoxStates.customerList && (
                            <SelectBoxList dropUp={dropUpStates.customerList}>
                              {customerJourneyList.length === 0 ? (
                                <SelectBoxItem
                                  disabled={
                                    toolSteps >= 1 ||
                                    ideaGenerationProblemList.length > 0
                                  }
                                >
                                  <Body2 color="gray300" align="left">
                                    직접 문제점을 작성합니다.
                                  </Body2>
                                </SelectBoxItem>
                              ) : (
                                customerJourneyList.map((item, index) => (
                                  <SelectBoxItem
                                    disabled={
                                      toolSteps >= 1 || isContentLoading
                                    }
                                    key={index}
                                    onClick={() => {
                                      handlePurposeSelect(
                                        `${
                                          item.customerJourneyMapSelectedPersona
                                            .personaName || "페르소나"
                                        }의 고객 여정 지도 (${
                                          item.updateDate.split(":")[0]
                                        }:${item.updateDate.split(":")[1]})`,
                                        "customerList",
                                        item
                                      );
                                    }}
                                  >
                                    <Body2 color="gray700" align="left">
                                      {item.customerJourneyMapSelectedPersona
                                        .personaName || "페르소나"}
                                      의 고객 여정 지도 (
                                      {item.updateDate.split(":")[0]}:
                                      {item.updateDate.split(":")[1]})
                                    </Body2>
                                  </SelectBoxItem>
                                ))
                              )}
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </TabContent5Item>

                      <TabContent5Item required>
                        {isContentLoading ? (
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              minHeight: "200px",
                              alignItems: "center",
                            }}
                          >
                            <AtomPersonaLoader message="문제점 & 니즈 리스트를 불러오고 있어요..." />
                          </div>
                        ) : (
                          <>
                            {ideaGenerationProblemList.length === 0 ? (
                              <BoxWrap
                                NoData
                                style={{ height: "300px" }}
                                onClick={() => navigate("/CustomerJourneyMap")}
                              >
                                <img src={images.PeopleFillPrimary2} alt="" />
                                <Body2
                                  color="gray700"
                                  align="center !important"
                                >
                                  고객 여정 지도를 선택해주세요.
                                </Body2>
                              </BoxWrap>
                            ) : (
                              <>
                                <div className="title">
                                  <Body1 color="gray700">
                                    고객 여정에서 드러난​ 핵심 문제와 니즈
                                    항목입니다.
                                  </Body1>
                                </div>
                                <MoleculeDeleteForm
                                  items={ideaGenerationProblemListTitle || []}
                                  setItems={setIdeaGenerationProblemListTitle}
                                  disabled={toolSteps >= 1}
                                  maxItems={13}
                                  placeholder="문제점 작성"
                                  initialItemCount={8}
                                  edit={false}
                                />
                              </>
                            )}
                          </>
                        )}
                      </TabContent5Item>
                    </div>

                    {ideaGenerationProblemListTitle.length > 0 && (
                      <Button
                        Other
                        Primary
                        Fill
                        Round
                        onClick={handleSubmitProblem}
                        disabled={
                          isContentLoading ||
                          toolSteps >= 1 ||
                          selectedPurposes.customerList.length === 0
                        }
                      >
                        아이디어 키워드 추출
                      </Button>
                    )}
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
                    <AtomPersonaLoader message="아이디어 발산을 위한 핵심 키워드를 추출하고 있어요 " />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Idea Generation Theme</H3>
                      <Body3 color="gray800">
                        문제와 니즈를 창의적 해결 주제로 전환하여, 아이디어
                        발상의 방향을 정해주세요.
                      </Body3>
                    </div>

                    <div className="content">
                      <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">고객 여정 맵</Body2>

                          <Body2 color="gray500">
                            {selectedPurposes.customerList}
                          </Body2>
                        </li>

                        <li>
                          <Body2 color="gray500">분석 장면 선택</Body2>

                          <Body2
                            color={
                              ideaGenerationSelectedStartPosition?.length > 0
                                ? "gray500"
                                : "gray300"
                            }
                            style={{
                              whiteSpace: "normal",
                              wordBreak: "keep-all",
                              wordWrap: "break-word",
                              overflow: "visible",
                              maxWidth: "100%",
                              textAlign: "left",
                            }}
                          >
                            {ideaGenerationSelectedStartPosition?.length > 0
                              ? ideaGenerationSelectedStartPosition
                                  .map((item) => item.theme)
                                  .join(", ")
                              : "선택해주세요"}
                          </Body2>
                        </li>
                      </ListBoxGroup>
                    </div>

                    <div className="content">
                      <Title style={{ marginBottom: "-18px" }}>
                        <Body1 color="gray700">
                          아이디어 시작점을 선택하세요 (8개 선택필수)
                        </Body1>
                      </Title>

                      <CardGroupWrap ideaGeneration>
                        <MoleculeTagList
                          items={
                            ideaGenerationStartPosition
                              .map((item) => item.content)
                              .flat() // 모든 content 배열을 하나로 합침
                          }
                          disabled={toolSteps >= 2}
                        />
                      </CardGroupWrap>

                      {/* <div className="content">
                        <TabContent5Item required>
                          <Title>
                            <Body1 color="gray700">
                              보유하고 있는 기술을 작성하세요
                            </Body1>
                          </Title>

                          <FormBox Large>
                            <CustomTextarea
                              Edit
                              rows={4}
                              placeholder="보유 기술을 입력하시면, 아이디어가 더 잘나와요 "
                              maxLength={150}
                              status="valid"
                              value={projectDescription}
                              onChange={(e) => {
                                handleInputChange(
                                  "projectDescription",
                                  e.target.value
                                );
                                setDescriptionLength(e.target.value.length);
                              }}
                              disabled={
                                completedSteps.includes(2) || toolSteps >= 2
                              }
                            />
                            <Body2 color="gray300" align="right">
                              {descriptionLength} / 150
                            </Body2>
                          </FormBox>
                        </TabContent5Item>
                      </div> */}
                    </div>
                  </>
                )}
                <Button
                  Other
                  Primary
                  Fill
                  Round
                  onClick={handleSubmitTheme}
                  disabled={
                    ideaGenerationSelectedStartPosition.length < 8 ||
                    toolSteps >= 2
                  }
                >
                  다음
                </Button>
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
                    <AtomPersonaLoader message="결과보고서를 작성하고 있습니다" />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Participating Persona</H3>
                      <Body3 color="gray800">
                        함께 아이디에이션에 참여하는 페르소나들을 확인해보세요
                      </Body3>
                    </div>

                    <div className="content">
                      <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">고객 여정 맵</Body2>

                          <Body2 color="gray500">
                            {selectedPurposes.customerList}
                          </Body2>
                        </li>

                        <li>
                          <Body2 color="gray500">분석 장면 선택</Body2>

                          <Body2
                            color={
                              ideaGenerationSelectedStartPosition?.length > 0
                                ? "gray500"
                                : "gray300"
                            }
                            // style={{
                            //   whiteSpace: "nowrap",
                            //   overflow: "hidden",
                            //   textOverflow: "ellipsis",
                            //   maxWidth: "100%",
                            // }}
                            style={{
                              whiteSpace: "normal",
                              wordBreak: "keep-all",
                              wordWrap: "break-word",
                              overflow: "visible",
                              maxWidth: "100%",
                              textAlign: "left",
                            }}
                          >
                            {ideaGenerationSelectedStartPosition?.length > 0
                              ? ideaGenerationSelectedStartPosition
                                  .map((item) => item.theme)
                                  .join(", ")
                              : "선택해주세요"}
                          </Body2>
                        </li>
                      </ListBoxGroup>
                    </div>

                    <div className="content">
                      <TabContent5Item style={{ marginTop: "20px" }}>
                        <div className="title">
                          <Body1 color="gray800">
                            Favorite 페르소나 리스트
                          </Body1>
                        </div>
                        {personaListSaas.filter(
                          (item) => item.favorite === true
                        ).length >= 20 ? (
                          <MoleculePersonaSelectCard
                            filteredPersonaList={personaListSaas}
                            hideSelectButton={true}
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
                  </>
                )}

                <Button
                  Other
                  Primary
                  Fill
                  Round
                  onClick={handleMandalArt}
                  disabled={
                    toolSteps >= 3 ||
                    personaListSaas.filter((item) => item.favorite === true)
                      .length < 20
                  }
                >
                  아이디에이션 시작하기
                </Button>
              </TabContent5>
            )}

            {activeTab === 4 && completedSteps.includes(3) && (
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
                    <AtomPersonaLoader message="결과보고서를 작성하고 있습니다" />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Define Your Key Customer</H3>
                      <Body3 color="gray800">
                        고객 여정 분석을 원하는 주요 고객군을 선택하세요
                      </Body3>
                    </div>

                    <div className="content">
                      {/* <Title>
                        <Body1 color="gray700">
                          아이디어 시작점을 선택하세요 (8개 선택가능)
                        </Body1>
                      </Title> */}

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          minHeight: "100%", // 페이지 높이의 80% 정도로 설정
                        }}
                      >
                        <MoleculeMandalArtGraph
                          mandalartData={ideaGenerationMandalArtData}
                        />
                      </div>
                    </div>

                    <Button
                      Primary
                      onClick={handleEnterInterviewRoom}
                      style={{
                        visibility:
                          ideaGenerationSelectedMandalart === null
                            ? "hidden"
                            : "visible",
                      }} // 메인에서는 가리고 세부 보기에선 보여주기
                    >
                      <img
                        src={images.ReportSearch}
                        alt="인터뷰 스크립트 보기"
                      />
                      응답자 의견 확인
                    </Button>

                    <div className="content">
                      {!ideaGenerationMandalArtData[
                        ideaGenerationSelectedMandalart - 1
                      ]?.additional_execution_ideas ||
                      ideaGenerationMandalArtData[
                        ideaGenerationSelectedMandalart - 1
                      ]?.additional_execution_ideas?.length === 0 ? (
                        <IdeaContainer>
                          <IdeaBox>
                            {/* <IdeaTitle>{idea.title}</IdeaTitle> */}
                            <IdeaContent>
                              각 아이디어 주제를 클릭해보세요. 주제별로 연관된
                              아이디어 8가지가 제시됩니다.
                            </IdeaContent>
                          </IdeaBox>
                        </IdeaContainer>
                      ) : (
                        <IdeaContainer>
                          {/* {ideaGenerationMandalArtData[ideaGenerationSelectedMandalart - 1]?.additional_execution_ideas.map((idea, index) => ( */}
                          <IdeaBox>
                            <IdeaTitle>기타 의견</IdeaTitle>
                            {/* <IdeaTitle>{idea.idea_title}</IdeaTitle> */}
                            <IdeaContent>
                              {ideaGenerationMandalArtData[
                                ideaGenerationSelectedMandalart - 1
                              ]?.additional_execution_ideas.map(
                                (idea, index) => (
                                  <IdeaText>
                                    • {idea.idea_title} :{" "}
                                    {idea.idea_description}
                                  </IdeaText>
                                )
                              )}
                            </IdeaContent>
                          </IdeaBox>
                          {/* ))} */}
                        </IdeaContainer>
                      )}
                    </div>
                  </>
                )}
              </TabContent5>
            )}

            {showToast && (
              <OrganismToastPopupQuickSurveyComplete
                isActive={showToast}
                onClose={() => setShowToast(false)}
                isComplete={true}
                // selectedOption={selectedOption}
                // selectedOptionIndex={selectedOptionIndex}
              />
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

export default PageIssueGeneration;

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const EditButtonGroup = styled(ButtonGroup)`
  justify-content: end;
`;

const InsightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #e0e4e8;
  border-radius: 10px;
  padding: 16px;
`;

const InsightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid #e0e4e8;
  padding-bottom: 16px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const IdeaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 20px;
`;

const IdeaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: ${palette.white};
  border: 1px solid ${palette.outlineGray};
  border-radius: 8px;
  text-align: left;
`;

const IdeaTitle = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${palette.gray800};
  margin: 0;
`;

const IdeaContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`;

const IdeaText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: ${palette.gray600};
  margin: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: ${palette.white};
  border-radius: 10px;
  padding: 24px;
  margin-top: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 140px;
`;
