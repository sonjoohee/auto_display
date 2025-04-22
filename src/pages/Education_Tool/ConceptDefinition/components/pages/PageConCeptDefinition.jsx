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
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../../../assets/styles/InputStyle";
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
  BoxWrap,
  TabContent5Item,
  Persona,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import personaImages from "../../../../../assets/styles/PersonaImages";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  PSST_FILE_ID,
  PROJECT_SAAS,
  PSST_BUSINESS_INFO,
  PROJECT_ANALYSIS_MULTIMODAL,
  PSST_ANALYSIS_RESULTS,
  PSST_FILE_NAMES,
  PSST_REPORT,
  PSST_SELECTED_TEMPLETE,
  PROJECT_ANALYSIS_MULTIMODAL_DESCRIPTION,
  PROJECT_ANALYSIS_MULTIMODAL_KEYMESSAGE,
  PERSONA_LIST_SAAS,
} from "../../../../AtomStates";
import images from "../../../../../assets/styles/Images";
import {
  H3,
  Body1,
  Body2,
  Body3,
  Caption1,
} from "../../../../../assets/styles/Typography";
import {
  createToolOnServer,
  updateToolOnServer,
  InterviewXPsstMultimodalRequest,
  InterviewXPsstAnalysisRequest,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";
import MoleculeFileUpload from "../molecules/MoleculeFileUpload";
import MoleculeAnalysisResults from "../molecules/MoleculeAnalysisResults";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import MoleculeItemSelectCard from "../../../public/MoleculeItemSelectCard";

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";

const prepareMarkdown = (text) => {
  if (!text) return "";
  // 연속된 줄바꿈('\n\n')을 <br/><br/>로 변환
  return text.replace(/\n\n/g, "\n&nbsp;\n").replace(/\n/g, "  \n");
};

const psstReportIndex = `문제 정의 (Problem)
            1-1. 창업 배경 및 필요성
            1-2. 목표 시장 및 고객 분석
            1-3. 기존 대안의 한계

            해결책 (Solution)
            2-1. 핵심 기능 및 문제 대응 방식
            2-2. 기술·구조적 작동 원리
            2-3. 차별성 및 경쟁 우위

            실행 전략 (Strategy)
            3-1. 수익 모델 및 가치 전환 구조
            3-2. 시장 진입 전략 (GTM)
            3-3. 사업 확장 및 운영 계획

            팀 (Team)
            4-1. 팀 구성 
            4-2. 외부 협력 자원 및 네트워크
            4-3. 운영 체계 및 실행 구조`;

const PageConceptDefinition = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);

  const [psstBusinessInfo, setPsstBusinessInfo] = useAtom(PSST_BUSINESS_INFO);
  const [, setPsstFileId] = useAtom(PSST_FILE_ID);
  const [projectAnalysisMultimodal, setProjectAnalysisMultimodal] = useAtom(
    PROJECT_ANALYSIS_MULTIMODAL
  );
  const [
    projectAnalysisMultimodalKeyMessage,
    setProjectAnalysisMultimodalKeyMessage,
  ] = useAtom(PROJECT_ANALYSIS_MULTIMODAL_KEYMESSAGE);
  const [
    projectAnalysisMultimodalDescription,
    setProjectAnalysisMultimodalDescription,
  ] = useAtom(PROJECT_ANALYSIS_MULTIMODAL_DESCRIPTION);
  const [analysisResults, setAnalysisResults] = useAtom(PSST_ANALYSIS_RESULTS);
  const [fileNames, setFileNames] = useAtom(PSST_FILE_NAMES);
  const [psstReport, setPsstReport] = useAtom(PSST_REPORT);
  const [selectedTemplete, setSelectedTemplete] = useAtom(
    PSST_SELECTED_TEMPLETE
  );

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [isCreateReportIndex, setIsCreateReportIndex] = useState(false);
  const [hideIndexButton, setHideIndexButton] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState(null);
  const [selectedValue, setSelectedValue] = useState([]);
  const [conceptDefinitionValue, setConceptDefinitionValue] = useState([]);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
    analysisScope: "",
  });

  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
  });
  // 초기 상태를 빈 배열로 설정

  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(1);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        if (fileNames) {
          setFileNames(fileNames ?? []);
          setUploadedFiles(fileNames ?? []);
        }
        // 비즈니스 정보 설정 (Step 1)

        if (projectAnalysisMultimodal) {
          setProjectAnalysisMultimodal(projectAnalysisMultimodal ?? "");
          setIsCreateReportIndex(true);
        }

        if (projectAnalysisMultimodalKeyMessage) {
          setProjectAnalysisMultimodalKeyMessage(
            projectAnalysisMultimodalKeyMessage ?? ""
          );
        }

        if (projectAnalysisMultimodalDescription) {
          setProjectAnalysisMultimodalDescription(
            projectAnalysisMultimodalDescription ?? ""
          );
        }

        if (selectedTemplete) {
          setSelectedTemplete(selectedTemplete ?? []);
        }

        if (analysisResults) {
          setAnalysisResults(analysisResults ?? []);
        }

        if (psstReport) {
          setPsstReport(psstReport ?? "");
        }

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  const handleCheckboxChange = (index) => {
    if (toolSteps >= 2) return;
    setSelectedTemplete((prev) => {
      // 하나만 선택되도록 변경, 다른 항목 선택 시 해당 항목으로 변경
      if (prev.includes(index)) {
        return []; // 이미 선택된 항목을 다시 클릭하면 선택 해제
      } else {
        return [index]; // 새 항목 선택
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
    return businessDescription.trim().length > 0 && uploadedFiles.length > 0;
  };

  // 비즈니스 설명 입력 핸들러
  const handleBusinessDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 500) {
      setBusinessDescription(input);
    }
  };

  const handleSubmitPersona = async () => {
    setIsLoading(true);
    handleNextStep(1);
    setToolSteps(1);

    const business = {
      businessModel: project.businessModel,
      projectAnalysis: project.projectAnalysis,
      projectDescription: project.projectDescription,
      projectTitle: project.projectTitle,
      targetCountry: project.targetCountry,
    };
    setPsstBusinessInfo(business);
    // 파일 업로드 케이스 먼저 체크
    if (uploadedFiles.length > 0) {
      try {
        const data = {
          analysis_index: 10,
          business: psstBusinessInfo,
          report_index: projectAnalysisMultimodal,
          type: "ix_psst_analysis",
        };

        let response = await InterviewXPsstAnalysisRequest(data, isLoggedIn);

        const maxAttempts = 10;
        let attempts = 0;

        while (
          attempts < maxAttempts &&
          (!response ||
            !response?.response?.psst_analysis?.report_index_key_message)
        ) {
          response = await InterviewXPsstAnalysisRequest(data, isLoggedIn);
          attempts++;
        }
        if (attempts >= maxAttempts) {
          setShowPopupError(true);
          return;
        }
        setProjectAnalysisMultimodalKeyMessage(
          response.response.psst_analysis.report_index_key_message
        );

        await updateToolOnServer(
          toolId,
          {
            completedStep: 2,
            projectAnalysisMultimodalKeyMessage:
              response.response.psst_analysis.report_index_key_message,
          },
          isLoggedIn
        );

        setIsLoading(false);
        setToolSteps(2);
        return;
      } catch (error) {
        console.error("Error:", error);
        setShowPopupError(true);
        setIsLoading(false);
        return;
      }
    }

    try {
      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_psst_multimodal",
        },
        isLoggedIn
      );
      setToolId(responseToolId);

      await updateToolOnServer(
        responseToolId,
        {
          selectedTemplete: selectedTemplete,
        },
        isLoggedIn
      );
      let allAnalysisResults = [];
      const analysisIndexes = [1, 9, 4, 5];
      // for문을 map으로 변경
      for (const i of analysisIndexes) {
        const data = {
          analysis_index: i,
          business: business,
          report_index: psstReportIndex,
          type: "ix_psst_analysis",
        };

        setCurrentLoadingIndex(i);
        const response = await InterviewXPsstAnalysisRequest(data, isLoggedIn);

        setAnalysisResults((prev) => [
          ...prev,
          response.response.psst_analysis,
        ]);

        allAnalysisResults.push(response.response.psst_analysis);
      }
      setCurrentLoadingIndex(0);

      await updateToolOnServer(
        responseToolId,
        {
          completedStep: 2,
          analysisResults: allAnalysisResults,
          business: business,
        },
        isLoggedIn
      );
      setToolSteps(2);
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

  const handleSubmitReportIndex = async () => {
    setIsLoading(true);

    const responseToolId = await createToolOnServer(
      {
        projectId: project._id,
        type: "ix_psst_multimodal",
      },
      isLoggedIn
    );
    setToolId(responseToolId);

    setHideIndexButton(true);

    const timeStamp = new Date().getTime();
    const business = {
      businessModel: project.businessModel,
      projectAnalysis: project.projectAnalysis,
      projectDescription: project.projectDescription,
      projectTitle: project.projectTitle,
      targetCountry: project.targetCountry,
    };
    // 파일 업로드 케이스 먼저 체크
    if (uploadedFiles.length > 0) {
      try {
        const Data = {
          business: business,
          tool_id: "file_" + timeStamp,
          files: uploadedFiles,
        };

        setPsstFileId(["file_" + timeStamp]);
        // multimodal API 요청만 실행
        let firstResponse = await InterviewXPsstMultimodalRequest(
          Data,
          isLoggedIn
        );

        const maxAttempts = 10;
        let attempts = 0;

        while (
          attempts < maxAttempts &&
          (!firstResponse ||
            firstResponse?.repsponse === null ||
            !firstResponse?.response?.psst_index_multimodal)
        ) {
          firstResponse = await InterviewXPsstMultimodalRequest(
            Data,
            isLoggedIn
          );
          // console.log(firstResponse);
          attempts++;
        }
        if (attempts >= maxAttempts) {
          setShowPopupError(true);
          return;
        }

        setProjectAnalysisMultimodal(
          firstResponse.response.psst_index_multimodal
        );
        setProjectAnalysisMultimodalDescription(
          firstResponse.response.psst_index_multimodal_description
        );

        await updateToolOnServer(
          responseToolId,
          {
            projectAnalysisMultimodal:
              firstResponse.response.psst_index_multimodal,
            projectAnalysisMultimodalDescription:
              firstResponse.response.psst_index_multimodal_description,
            business: business,
            fileName: uploadedFiles.map((file) => ({
              id: "file_" + timeStamp,
              name: fileNames,
            })),
          },
          isLoggedIn
        );

        setFileNames(uploadedFiles.map((file) => file.name));
        setPsstBusinessInfo(business);

        setIsLoading(false);
        setIsCreateReportIndex(true);
        return;
      } catch (error) {
        console.error("Error:", error);
        setShowPopupError(true);
        setIsLoading(false);
        return;
      }
    }
  };

  const handleReportRequest = async () => {
    setIsLoadingReport(true);
    handleNextStep(2);
    // setToolSteps(2);
    try {
      // await updateToolOnServer(
      //   toolId,
      //   {
      //     completedStep: 2,
      //   },
      //   isLoggedIn
      // );

      if (uploadedFiles.length > 0) {
        try {
          // 1. 8개 분석 실행
          const allResults = [];
          for (let i = 1; i <= 8; i++) {
            const data = {
              analysis_index: i,
              business: psstBusinessInfo,
              report_index: projectAnalysisMultimodalKeyMessage,
              type: "ix_psst_analysis",
            };

            const response = await InterviewXPsstAnalysisRequest(
              data,
              isLoggedIn
            );
            allResults.push(response.response.psst_analysis);
          }
          setAnalysisResults(allResults);

          // 2. 바로 종합 리포트 생성
          const apiRequestData = {
            type: "ix_psst_report",
            business: psstBusinessInfo,
            report_index: projectAnalysisMultimodalKeyMessage,
            report_contents: allResults, // 방금 생성된 allResults 사용
            additional_request: "없음",
          };

          let response = await InterviewXPsstAnalysisRequest(
            apiRequestData,
            isLoggedIn
          );
          setPsstReport(response.response);

          // 3. 서버 업데이트 및 로딩 상태 변경
          setIsLoadingReport(false);
          await updateToolOnServer(
            toolId,
            {
              completedStep: 3,
              psstReport: response.response,
              analysisResults: allResults,
            },
            isLoggedIn
          );
        } catch (error) {
          console.error("Error:", error);
          setShowPopupError(true);
          setIsLoadingReport(false);
        }
        return;
      }
      try {
        const apiRequestData = {
          type: "ix_psst_report",
          business: psstBusinessInfo,

          report_index: psstReportIndex,

          report_contents: analysisResults,
          additional_request: "없음",
        };

        let response = await InterviewXPsstAnalysisRequest(
          apiRequestData,
          isLoggedIn
        );
        setPsstReport(response.response);

        const maxAttempts = 10;
        let attempts = 0;

        while (attempts < maxAttempts && (!response || !response?.response)) {
          response = await InterviewXPsstAnalysisRequest(
            apiRequestData,
            isLoggedIn
          );
          attempts++;
        }
        if (attempts >= maxAttempts) {
          setShowPopupError(true);
          return;
        }

        setIsLoadingReport(false);

        await updateToolOnServer(
          toolId,
          {
            completedStep: 3,
            psstReport: response.response,
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

  // 파일 업로드 핸들러
  const handleChangeStatus = ({ meta, file, remove }, status) => {
    // 20MB 크기 제한 체크
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes
    if (file.size > maxSize && status !== "removed") {
      setShowPopupFileSize(true);
      remove();
      return;
    }

    // 파일 상태 업데이트
    if (status === "done" || status === "preparing" || status === "uploading") {
      setUploadedFiles((prev) => {
        // 이미 존재하는 파일이 아닌 경우에만 추가
        if (!prev.find((f) => f.name === file.name)) {
          setFileNames((prev) => [...prev, file.name]);
          return [...prev, file];
        }
        return prev;
      });
    } else if (status === "removed") {
      setUploadedFiles((prev) => prev.filter((f) => f.name !== file.name));
      setFileNames((prev) => prev.filter((name) => name !== file.name));
    }

    // 파일 크기를 KB 또는 MB 단위로 변환
    const size = file.size;
    const sizeStr =
      size > 1024 * 1024
        ? `${(size / (1024 * 1024)).toFixed(1)}MB`
        : `${(size / 1024).toFixed(1)}KB`;

    // setTimeout을 사용하여 DOM이 업데이트된 후 실행
    setTimeout(() => {
      const containers = document.querySelectorAll(".dzu-previewContainer");
      containers.forEach((container) => {
        if (!container.dataset.filename) {
          container.dataset.filename = file.name;
          container.dataset.size = sizeStr;
        }
      });
    }, 0);
  };

  const handleEditBusinessClick = () => {
    setIsEditingBusiness(true);
  };

  const handleSaveBusinessClick = () => {
    setIsEditingBusiness(false);
  };

  const handleUndoBusinessClick = () => {
    const originalText =
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

    setBusinessDescription(originalText);
  };

  const handlePurposeSelect = (purpose, selectBoxId) => {
    setSelectedPurposes((prev) => ({
      ...prev,
      [selectBoxId]: purpose,
    }));

    setSelectBoxStates((prev) => ({
      ...prev,
      [selectBoxId]: false,
    }));

    // if (selectBoxId === "customerList") {
    //   setSelectedBusiness(purpose);
    //   setBusinessDescription(purpose);
    // }
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("psstreport")) {
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

  const Templete = [
    {
      name: "PSST 프레임워크 ",
      reason:
        "문제 정의부터 실행, 성장 계획까지 아우르는 가장 보편적인 사업계획서 구조입니다.정부지원사업, 창업 프로그램, 공공과제 등에 활용됩니다.​",
    },
    // {
    //   name: "3W1H 프레임워크 ",
    //   reason:
    //     "해커톤, 메이커톤 등 단기간 기술 구현 중심의 구조입니다.<br/>무엇(What), 왜(Why), 누구(Who), 어떻게(How) 구현할지를 중심으로 계획을 구체화합니다.​",
    // },
    // {
    //   name: "IDEA PITCH 제안서",
    //   reason:
    //     "시장성, 차별성, 실행력을 강조하는 발표형 구조입니다.<br/>투자유치(IR), 경진대회, 피칭 행사에 적합합니다.​",
    // },
  ];

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
                    파일 업로드
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
                    핵심 내용 확인
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Analyze Key Points​
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
                    계획서 작성
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    Generate Business Plan​
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Persona Selection</H3>
                    <Body3 color="gray800">
                      컨셉정의서를 작성할 타겟 페르소나를 선택하세요
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
                                    alt={selectedPersonas.persona}
                                  />
                                </Persona>
                              )}
                            </PersonaGroup>
                          ) : (
                            <Body2 color="gray300">
                              페르소나가 선택되지 않았습니다. 하단에서
                              페르소나를 선택해 주세요!(1명 선택 가능)
                            </Body2>
                          )}
                        </li>
                      </ListBoxGroup>
                    </div>

                    {personaListSaas.length > 0 ? (
                      <MoleculePersonaSelectCard
                        filteredPersonaList={personaListSaas}
                        selectedPersonas={selectedPersonas}
                        onPersonaSelect={(persona) => {
                          setSelectedPersonas(persona);
                          // 필요한 경우 여기서 추가 로직 수행
                        }}
                      />
                    ) : (
                      <BoxWrap
                        Hover
                        NoData
                        style={{
                          height: "300px",
                        }}
                        onClick={() => navigate("/AiPersona")}
                      >
                        <img src={images.PeopleFillPrimary2} alt="" />

                        <Body2 color="gray700" align="center !important">
                          현재 대화가 가능한 활성 페르소나가 없습니다
                          <br />
                          페르소나 생성 요청을 진행하여 페르소나를
                          활성화해주세요
                        </Body2>

                        <Button
                          Medium
                          Outline
                          Fill
                          onClick={() => navigate("/AiPersona")}
                        >
                          <Caption1 color="gray700">
                            AI Person 생성 요청
                          </Caption1>
                        </Button>
                      </BoxWrap>
                    )}
                  </div>

                  <Button
                    Other
                    Primary
                    Fill
                    Round
                    onClick={handleSubmitPersona}
                    // disabled={
                    //   toolSteps >= 1 ||
                    //   (!isCreateReportIndex && selectedTemplete.length === 0)
                    // }
                  >
                    다음
                  </Button>
                </>
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
              <TabContent5>
                {isLoading && uploadedFiles.length > 0 ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="보고서를 분석하고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Core Value Analysis</H3>
                      <Body3 color="gray800">
                        {uploadedFiles.length > 0
                          ? "업로드한 파일을 분석해 계획서의 구조와 주요 정보를 정리합니다."
                          : "템플림의 구조에 맞춰 계획서의 구조와 핵심 내용을 정리합니다.​"}
                      </Body3>
                    </div>

                    <div className="content">
                      <BoxWrap Column NoneV style={{ marginBottom: "24px" }}>
                        <div className="selectBoxWrap">
                          <Body2 color="gray500" style={{ width: "110px" }}>
                            페르소나 선택
                          </Body2>
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
                                    alt={selectedPersonas.persona}
                                  />
                                </Persona>
                              )}
                            </PersonaGroup>
                          ) : (
                            <Body2 color="gray300">
                              페르소나가 선택되지 않았습니다. 하단에서
                              페르소나를 선택해 주세요!(1명 선택 가능)
                            </Body2>
                          )}
                        </div>
                        <div className="selectBoxWrap">
                          <Body2 color="gray500" style={{ width: "110px" }}>
                            여정 분석 범위
                          </Body2>
                          <SelectBox style={{ paddingRight: "20px" }}>
                            <SelectBoxTitle
                              onClick={() =>
                                toolSteps >= 1
                                  ? null
                                  : setIsSelectBoxOpen(!isSelectBoxOpen)
                              }
                              None
                              style={{
                                cursor:
                                  toolSteps >= 1 ? "not-allowed" : "pointer",
                              }}
                            >
                              {selectedPurposes?.analysisScope ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    paddingLeft: "20px",
                                  }}
                                >
                                  <Body1 color="gray700" align="left">
                                    {
                                      selectedPurposes?.analysisScope?.split(
                                        "|"
                                      )[0]
                                    }{" "}
                                    |
                                  </Body1>
                                  <Body2 color="gray700" align="left">
                                    {
                                      selectedPurposes?.analysisScope?.split(
                                        "|"
                                      )[1]
                                    }
                                  </Body2>
                                </div>
                              ) : (
                                <Body2
                                  color="gray300"
                                  style={{ paddingLeft: "20px" }}
                                >
                                  고객 여정 맵의 분석 방향성을 선택하세요
                                </Body2>
                              )}
                              <images.ChevronDown
                                width="24px"
                                height="24px"
                                color={
                                  toolSteps >= 1
                                    ? palette.gray300
                                    : palette.gray500
                                }
                                style={{
                                  transform: isSelectBoxOpen
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                            </SelectBoxTitle>

                            {isSelectBoxOpen && (
                              <SelectBoxList>
                                <SelectBoxItem
                                  onClick={() => {
                                    handlePurposeSelect(
                                      "시간 흐름 기반 여정 분석 | 제품/서비스의 전체적인 사용자 여정을 기반으로 분석",
                                      "analysisScope"
                                    );
                                    setIsSelectBoxOpen(false);
                                  }}
                                >
                                  <Body1 color="gray700" align="left">
                                    시간 흐름 기반 여정 분석 |{" "}
                                  </Body1>
                                  <Body2 color="gray700" align="left">
                                    제품/서비스의 전체적인 사용자 여정을
                                    기반으로 분석
                                  </Body2>
                                </SelectBoxItem>
                                <SelectBoxItem
                                  onClick={() => {
                                    handlePurposeSelect(
                                      "상황 중심 여정 분석 | 특정 이벤트나 고객 경험을 중심으로 여정 분석",
                                      "analysisScope"
                                    );
                                    setIsSelectBoxOpen(false);
                                  }}
                                >
                                  <Body1 color="gray700" align="left">
                                    상황 중심 여정 분석 |{" "}
                                  </Body1>
                                  <Body2 color="gray700" align="left">
                                    특정 이벤트나 고객 경험을 중심으로 여정 분석
                                  </Body2>
                                </SelectBoxItem>
                                <SelectBoxItem
                                  onClick={() => {
                                    handlePurposeSelect(
                                      "목적 기반 여정 분석 | 고객이 제품/서비스를 사용하여 달성하려는 목표를 중심으로 여정 분석",
                                      "analysisScope"
                                    );
                                    setIsSelectBoxOpen(false);
                                  }}
                                >
                                  <Body1 color="gray700" align="left">
                                    목적 기반 여정 분석 |{" "}
                                  </Body1>
                                  <Body2 color="gray700" align="left">
                                    고객이 제품/서비스를 사용하여 달성하려는
                                    목표를 중심으로 여정 분석
                                  </Body2>
                                </SelectBoxItem>
                              </SelectBoxList>
                            )}
                          </SelectBox>
                        </div>
                      </BoxWrap>
                      {/* <ListBoxGroup>
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
                                    alt={selectedPersonas.persona}
                                  />
                                </Persona>
                              )}
                            </PersonaGroup>
                          ) : (
                            <Body2 color="gray300">
                              페르소나가 선택되지 않았습니다. 하단에서
                              페르소나를 선택해 주세요!(1명 선택 가능)
                            </Body2>
                          )}
                        </li>
                        <li style={{ alignItems: "flex-start" }}>
                          <Body2 color="gray500">핵심 가치 선택</Body2>
                          <Body2
                            color="gray800"
                            style={{ textAlign: "left" }}
                            dangerouslySetInnerHTML={{
                              __html: uploadedFiles.length > 0,
                            }}
                          />
                        </li>
                      </ListBoxGroup> */}

                      {uploadedFiles.length > 0 ? (
                        <InsightAnalysis>
                          <div
                            className="markdown-body"
                            style={{
                              textAlign: "left",
                            }}
                          >
                            <Markdown>
                              {prepareMarkdown(
                                projectAnalysisMultimodalKeyMessage ?? ""
                              )}
                            </Markdown>
                          </div>
                        </InsightAnalysis>
                      ) : (
                        <>
                          <div className="title">
                            <Body1
                              color="gray700"
                              style={{ textAlign: "left" }}
                            >
                              Kano Model 평가에 포함할 아이디어를 선택해 주세요.
                              (복수 선택)
                            </Body1>
                          </div>
                          {conceptDefinitionValue.map((value, index) => (
                            <MoleculeItemSelectCard
                              FlexStart
                              key={index}
                              id={index}
                              title={value.name}
                              isSelected={selectedValue.includes(index)}
                              onSelect={() => handleCheckboxChange(index)}
                            />
                          ))}
                        </>
                      )}
                    </div>
                    <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={handleReportRequest}
                      disabled={
                        toolSteps > 2 ||
                        (uploadedFiles.length === 0 &&
                          analysisResults.length !== 4)
                      }
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
                      <H3 color="gray800">비즈니스 기획서</H3>
                      <Body3 color="gray800">
                        사업 아이템의 실행 전략을 정리한 초안입니다. 이를
                        기반으로 세부 내용을 구체화해보세요.​
                      </Body3>
                    </BgBoxItem>

                    <InsightAnalysis>
                      <div
                        className="markdown-body"
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <Markdown>{prepareMarkdown(psstReport ?? "")}</Markdown>
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

export default PageConceptDefinition;

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
