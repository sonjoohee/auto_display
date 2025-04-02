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
import Markdown from "markdown-to-jsx";
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
  PSST_BUSINESS_INFO,
  PROJECT_ANALYSIS_MULTIMODAL,
  PSST_ANALYSIS_RESULTS,
  PSST_FILE_NAMES,
  PSST_REPORT,
  PSST_SELECTED_TEMPLETE,
} from "../../../../AtomStates";
import images from "../../../../../assets/styles/Images";
import {
  H4,
  H3,
  Sub3,
  Body1,
  Body2,
  Body3,
} from "../../../../../assets/styles/Typography";
import {
  InterviewXDesignEmotionTargetRequest,
  InterviewXDesignEmotionScaleRequest,
  createToolOnServer,
  updateToolOnServer,
  InterviewXPsstMultimodalRequest,
  InterviewXPsstAnalysisRequest,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import AnalysisItem from "../molecules/MoleculeAnalysisItem";
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";
import MoleculeFileUpload from "../molecules/MoleculeFileUpload";
import MoleculeAnalysisResults from "../molecules/MoleculeAnalysisResults";

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";

const prepareMarkdown = (text) => {
  if (!text) return "";
  // 연속된 줄바꿈('\n\n')을 <br/><br/>로 변환
  return text.replace(/\n\n/g, "\n&nbsp;\n").replace(/\n/g, "  \n");
};

const PagePsstReport = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [, setDesignAnalysisBusinessTitle] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_TITLE
  );
  const [designAnalysisBusinessInfo, setDesignAnalysisBusinessInfo] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_INFO
  );
  const [psstBusinessInfo, setPsstBusinessInfo] = useAtom(PSST_BUSINESS_INFO);
  const [designAnalysisEmotionAnalysis, setDesignAnalysisEmotionAnalysis] =
    useAtom(DESIGN_ANALYSIS_EMOTION_ANALYSIS);
  const [
    selectedDesignAnalysisEmotionAnalysis,
    setSelectedDesignAnalysisEmotionAnalysis,
  ] = useAtom(DESIGN_ANALYSIS_SELECTED_PERSONA);
  const [designAnalysisEmotionTarget, setDesignAnalysisEmotionTarget] = useAtom(
    DESIGN_ANALYSIS_EMOTION_TARGET
  );
  const [designAnalysisEmotionScale, setDesignAnalysisEmotionScale] = useAtom(
    DESIGN_ANALYSIS_EMOTION_SCALE
  );
  const [designAnalysisFileNames] = useAtom(DESIGN_ANALYSIS_FILE_NAMES);
  const [designAnalysisFileId, setDesignAnalysisFileId] = useAtom(
    DESIGN_ANALYSIS_FILE_ID
  );
  const [projectAnalysisMultimodal, setProjectAnalysisMultimodal] = useAtom(
    PROJECT_ANALYSIS_MULTIMODAL
  );

  const [analysisResults, setAnalysisResults] = useAtom(PSST_ANALYSIS_RESULTS);

  const [fileNames, setFileNames] = useAtom(PSST_FILE_NAMES);
  const [psstReport, setPsstReport] = useAtom(PSST_REPORT);
  const [selectedTemplete, setSelectedTemplete] = useAtom(
    PSST_SELECTED_TEMPLETE
  );

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  // const [selectedTemplete, setSelectedTemplete] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // const [fileNames, setFileNames] = useState([]);
  const [activeDesignTab, setActiveDesignTab] = useState("emotion");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [businessDescriptionTitle, setBusinessDescriptionTitle] = useState("");
  const [state] = useState({
    isExpanded: false,
    showQuestions: false,
  });
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  // const [projectAnalysisMultimodal, setProjectAnalysisMultimodal] = useState(
  //   []
  // );

  const [showButtons, setShowButtons] = useState(true);
  const [showFileUpload, setShowFileUpload] = useState(true);
  const [psstAnalysisResult, setPsstAnalysisResult] = useState([]);
  // const [psstReport, setPsstReport] = useState([]);
  // 초기 상태를 빈 배열로 설정
  // const [analysisResults, setAnalysisResults] = useState([]);
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
          setPsstBusinessInfo(psstBusinessInfo);
        }
        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 3));
        setToolSteps(toolStep ?? 1);

        // 비즈니스 정보 설정 (Step 1)
        if (fileNames) {
          setFileNames(fileNames);
          setUploadedFiles(fileNames);
        }
        if (projectAnalysisMultimodal) {
          setProjectAnalysisMultimodal(projectAnalysisMultimodal);
        }

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);

        // (Step 2)
        if (selectedTemplete) {
          setSelectedTemplete(selectedTemplete);
        }

        if(analysisResults) {
          setAnalysisResults(analysisResults);
        }

        if(psstReport) {

          setPsstReport(psstReport);
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

  const handleSubmitBusinessInfo = async () => {
    setIsLoading(true);
    handleNextStep(1);
    const responseToolId = await createToolOnServer(
      {
        projectId: project._id,
        type: "ix_psst_multimodal",
      },
      isLoggedIn
    );
    setToolId(responseToolId);

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

        setDesignAnalysisFileId(["file_" + timeStamp]);

        // multimodal API 요청만 실행
        const firstResponse = await InterviewXPsstMultimodalRequest(
          Data,
          isLoggedIn
        );
        if (!firstResponse?.response.psst_index_multimodal) {
          setShowPopupError(true);
          setIsLoading(false);
          return;
        }

        setProjectAnalysisMultimodal(
          firstResponse.response.psst_index_multimodal
        );

        setToolSteps(1);
        setFileNames(uploadedFiles.map((file) => file.name));
        setPsstBusinessInfo(business);

        await updateToolOnServer(
          responseToolId,
          {
            completedStep: 1,
            projectAnalysisMultimodal:
              firstResponse.response.psst_index_multimodal,
            business: business,
            fileName: uploadedFiles.map((file) => ({
              id: "file_" + timeStamp,
              name: file.name,
            })),
          },
          isLoggedIn
        );

        setIsLoading(false);
        return;
      } catch (error) {
        console.error("Error:", error);
        setShowPopupError(true);
        setIsLoading(false);
        return;
      }
    }

    try {
      let allAnalysisResults = [];
      const analysisIndexes = [1, 9, 4, 5];
      // for문을 map으로 변경
      for (const i of analysisIndexes) {
        const data = {
          analysis_index: i,
          business: business,
          // report_index: projectAnalysisMultimodal,
          type: "ix_psst_analysis",
        };

        setCurrentLoadingIndex(i);
        const response = await InterviewXPsstAnalysisRequest(data, isLoggedIn);

        setAnalysisResults((prev) => [
          ...prev,
          response.response.psst_analysis,
        ]);


        console.log(response.response.psst_analysis)
        allAnalysisResults.push(response.response.psst_analysis);
        }
        setCurrentLoadingIndex(0); 

  
      await updateToolOnServer(
        responseToolId,
        {
          completedStep: 1,
          analysisResults: allAnalysisResults,
          business: business,
          selectedTemplete: selectedTemplete,
        },
        isLoggedIn
      );

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

  const handleReportRequest = async () => {
    setIsLoadingReport(true);
    handleNextStep(2);
    setToolSteps(2);
    try {
      await updateToolOnServer(
        toolId,
        {
          completedStep: 2,
        },
        isLoggedIn
      );

      if (uploadedFiles.length > 0) {
        try {
          // 1. 8개 분석 실행
          const allResults = [];
          for (let i = 1; i <= 8; i++) {
            const data = {
              analysis_index: i,
              business: psstBusinessInfo,
              report_index: projectAnalysisMultimodal,
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
            report_index: projectAnalysisMultimodal,
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
          report_index: projectAnalysisMultimodal,
          report_contents: analysisResults,
          additional_request: "없음",
        };

        let response = await InterviewXPsstAnalysisRequest(
          apiRequestData,
          isLoggedIn
        );
        setPsstReport(response.response);

        const maxAttempts = 10;
        let attempt = 0;

        while (!response?.response) {
          if (attempt >= maxAttempts) {
            setShowPopupError(true);
            return;
          }

          response = await InterviewXPsstAnalysisRequest(
            apiRequestData,
            isLoggedIn
          );

          attempt++;
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
      // setToolStep(3);
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
        "문제 정의부터 실행, 성장 계획까지 아우르는 가장 보편적인 사업계획서 구조입니다.<br/>정부지원사업, 창업 프로그램, 공공과제 등에 활용됩니다.​",
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
                  !completedSteps.includes(2) || isLoading || isLoadingReport
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
                    <H3 color="gray800">File Upload</H3>
                    <Body3 color="gray800">
                      어떤 계획을 만들고 싶으신가요? 관련 파일을 업로드해주세요.
                    </Body3>
                  </div>

                  <div className="content">
                    <MoleculeFileUpload
                      fileNames={fileNames}
                      handleChangeStatus={handleChangeStatus}
                      toolSteps={toolSteps}
                    />
                  </div>

                  <div className="content">
                    <div className="title">
                      <Body1
                        color="gray700"
                        style={{ textAlign: "left", marginBottom: "-20px" }}
                      >
                        📝 사업계획서, 처음이라면 목적별 템플릿부터 시작하세요​
                      </Body1>
                    </div>
                    <CardGroupWrap column style={{ marginBottom: "140px" }}>
                      {Templete.map((item, index) => (
                        <MoleculeDesignItem
                          style={{ marginBottom: "10px" }}
                          FlexStart
                          key={index}
                          id={index}
                          title={item.name}
                          subtitle={item.reason}
                          isSelected={selectedTemplete.includes(index)}
                          onSelect={() => handleCheckboxChange(index)}
                          disabled={toolSteps >= 1 ? true : false}
                        />
                      ))}
                    </CardGroupWrap>
                  </div>
                  <Button
                    Other
                    Primary
                    Fill
                    Round
                    onClick={handleSubmitBusinessInfo}
                    disabled={
                      toolSteps >= 1 ||
                      (fileNames.length === 0 && selectedTemplete.length === 0)
                    }
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
                      <H3 color="gray800">Analyze Contents</H3>
                      <Body3 color="gray800">
                        {uploadedFiles.length > 0
                          ? "업로드한 파일을 분석해 계획서의 구조와 주요 정보를 정리합니다."
                          : "템플림의 구조에 맞춰 계획서의 구조와 핵심 내용을 정리합니다.​"}
                      </Body3>
                    </div>

                    <div className="content">
                      <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">
                            {uploadedFiles.length > 0
                              ? "파일 명"
                              : "리포트 방식"}
                          </Body2>
                          <Body2 color="gray800">
                            {uploadedFiles.length > 0
                              ? uploadedFiles
                                  .map((file) => file.name)
                                  .join(", ")
                              : selectedTemplete.length > 0 &&
                                Templete[selectedTemplete[0]].name}
                          </Body2>
                        </li>
                        <li>
                          <Body2 color="gray500">주요 내용</Body2>
                          <Body2
                            color="gray800"
                            style={{ textAlign: "left" }}
                            dangerouslySetInnerHTML={{
                              __html:
                                uploadedFiles.length > 0
                                  ? "창업 아이템의 문제 정의부터 해결 방안, 실행 전략, 성장 계획까지 정부지원사업에 최적화"
                                  : selectedTemplete.length > 0 &&
                                    Templete[selectedTemplete[0]].reason,
                            }}
                          />
                        </li>
                      </ListBoxGroup>

                      {uploadedFiles.length > 0 ? (
                        <InsightAnalysis>
                          <div
                            className="markdown-body"
                            style={{
                              textAlign: "left",
                              whiteSpace: "pre-wrap",
                              fontFamily: "Pretendard",
                            }}
                          >
                            <Markdown>
                              {prepareMarkdown(projectAnalysisMultimodal)}
                            </Markdown>
                          </div>
                        </InsightAnalysis>
                      ) : (
                        <MoleculeAnalysisResults
                          analysisResults={analysisResults}
                          currentLoadingIndex={currentLoadingIndex}
                          hasUploadedFiles={uploadedFiles.length > 0}
                          toolSteps={toolSteps}
                        />
                      )}
                    </div>
                    <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={handleReportRequest}
                      disabled={

                        toolSteps >= 2 || 
                        (uploadedFiles.length === 0 && analysisResults.length !== 4)

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
                    <AtomPersonaLoader message="결과보고서를 작성하고 있습니다" />
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
                        style={{ textAlign: "left", whiteSpace: "pre-wrap" }}
                      >
                        <Markdown>{prepareMarkdown(psstReport)}</Markdown>
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

export default PagePsstReport;

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
    /* max-width: 980px; */
    /* padding: 45px; */

    @media (max-width: 767px) {
      padding: 15px;
    }
  }
`;
