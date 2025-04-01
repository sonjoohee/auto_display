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

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";

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
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
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
  const [projectAnalysisMultimodal, setProjectAnalysisMultimodal] = useState(
    []
  );

  const [showButtons, setShowButtons] = useState(true);
  const [showFileUpload, setShowFileUpload] = useState(true);
  const [psstAnalysisResult, setPsstAnalysisResult] = useState([]);
  const [psstReport, setPsstReport] = useState([]);
  // 초기 상태를 빈 배열로 설정
  const [analysisResults, setAnalysisResults] = useState([]);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interviewLoading = async () => {
      // 비즈니스 정보 설정 (Step 1)

      if (designAnalysisBusinessInfo.length === 0) {
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
      }

      if (toolLoading) {
        const projectTitle = project?.projectTitle;
        // 비즈니스 정보 설정 (Step 1)
        if (project) {
          setBusinessDescriptionTitle(projectTitle);
        }

        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 3));
        setToolSteps(toolStep ?? 1);

        // 비즈니스 정보 설정 (Step 1)
        if (designAnalysisBusinessInfo) {
          setBusinessDescription(designAnalysisBusinessInfo ?? "");
          setFileNames(designAnalysisFileNames);
        }

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);

        // 페르소나 설정 (Step 2)
        if (
          Array.isArray(designAnalysisEmotionAnalysis) &&
          Array.isArray(selectedDesignAnalysisEmotionAnalysis)
        ) {
          // 이미 선택된 페르소나들의 인덱스 찾기
          const selectedIndices = (designAnalysisEmotionAnalysis ?? [])
            .map((persona, index) => {
              return (selectedDesignAnalysisEmotionAnalysis ?? []).some(
                (target) => target?.name === persona?.name
              )
                ? index
                : -1;
            })
            .filter((index) => index !== -1);

          // selectedPersonas 상태 업데이트
          setSelectedPersonas(selectedIndices);

          // 선택된 페르소나 데이터 설정
          const selectedPersonaData = selectedIndices
            .map((index) => designAnalysisEmotionAnalysis?.[index])
            .filter(Boolean);

          setSelectedDesignAnalysisEmotionAnalysis(selectedPersonaData);
        }

        // 추가된 조건 체크
        if (
          Object.keys(designAnalysisEmotionTarget).length === 0 &&
          !designAnalysisEmotionScale.length &&
          completedStepsArray.length === 2
        ) {
          // designAnalysisEmotionTarget이 빈 객체이고, designAnalysisEmotionScale이 빈 배열인 경우
          setActiveTab(2);
          setToolSteps(1);
          setCompletedSteps(completedStepsArray.slice(0, -1));
        } else {
          if (designAnalysisEmotionTarget) {
            setDesignAnalysisEmotionTarget(designAnalysisEmotionTarget ?? {});
          }

          if (designAnalysisEmotionScale) {
            setDesignAnalysisEmotionScale(designAnalysisEmotionScale ?? {});
          }
        }
        setToolStep(0);

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  const handleCheckboxChange = (personaId) => {
    if (toolSteps >= 2) return;
    setSelectedPersonas((prev) => {
      // 하나만 선택되도록 변경, 다른 항목 선택 시 해당 항목으로 변경
      if (prev.includes(personaId)) {
        return []; // 이미 선택된 항목을 다시 클릭하면 선택 해제
      } else {
        return [personaId]; // 새 항목 선택
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
    try {
      const timeStamp = new Date().getTime();

      const business = {
        businessModel: project.businessModel,
        projectAnalysis: project.projectAnalysis,
        projectDescription: project.projectDescription,
        projectTitle: project.projectTitle,
        targetCountry: project.targetCountry,
      };

      // 비즈니스 데이터 추가
      const Data = {
        business: business,
        tool_id: "file_" + timeStamp,
        files: uploadedFiles,
      };

      setDesignAnalysisFileId(["file_" + timeStamp]);

      // API 요청
      const firstResponse = await InterviewXPsstMultimodalRequest(
        Data,
        isLoggedIn
      );
      // if (
      //   !response?.response.project_analysis_multimodal ||
      //   response.response.design_emotion_analysis.length === 0
      // ) {
      //   setShowPopupError(true);
      //   return;
      // }

      setProjectAnalysisMultimodal(
        firstResponse.response.psst_index_multimodal
      );

      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_psst_multimodal",
        },
        isLoggedIn
      );

      setToolId(responseToolId);
      setToolSteps(1);

      // API 응답에서 페르소나 데이터를 추출하여 atom에 저장

      setDesignAnalysisBusinessInfo(business);
      // setDesignAnalysisBusinessTitle(businessDescriptionTitle);
      // setDesignAnalysisUploadedFiles(uploadedFiles);
      setFileNames(uploadedFiles.map((file) => file.name));

      // API 호출 부분
      for (let i = 1; i <= 8; i++) {
        const data = {
          analysis_index: i,
          business: business,
          report_index: firstResponse.response.psst_index_multimodal,
          type: "ix_psst_analysis",
        };

        const response = await InterviewXPsstAnalysisRequest(data, isLoggedIn);
        console.log(`Analysis ${i} response:`, response);

        // 각 응답이 올 때마다 바로 상태 업데이트
        setAnalysisResults((prev) => [
          ...prev,
          response.response.psst_analysis,
        ]);
      }

      await updateToolOnServer(
        responseToolId,
        {
          completedStep: 1,
          projectAnalysisMultimodal: projectAnalysisMultimodal,
          business: businessDescription,
          fileName: uploadedFiles.map((file) => ({
            id: "file_" + timeStamp,
            name: file.name,
          })),
        },
        isLoggedIn
      );

      // handleNextStep(1);
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

  const handleReportRequest = async () => {
    handleNextStep(2);
    setToolSteps(2);
    try {
      // const selectedPersonaData = designAnalysisEmotionAnalysis.filter(
      //   (persona, index) => selectedPersonas.includes(index)
      // );
      // setSelectedDesignAnalysisEmotionAnalysis(selectedPersonaData);

      // await updateToolOnServer(
      //   toolId,
      //   {
      //     completedStep: 2,
      //     designSelectedPersona: selectedPersonaData,
      //   },
      //   isLoggedIn
      // );
      setIsLoadingReport(true);
      console.log(analysisResults);
      // 선택된 페르소나가 하나일 경우에만 시나리오 요청
      try {
        const apiRequestData = {
          type: "ix_psst_report",
          business: {
            businessModel: project.businessModel,
            projectAnalysis: project.projectAnalysis,
            projectDescription: project.projectDescription,
            projectTitle: project.projectTitle,
            targetCountry: project.targetCountry,
          },
          report_index: projectAnalysisMultimodal,
          report_contents: analysisResults,
          additional_request: "없음",
        };

        let response = await InterviewXPsstAnalysisRequest(
          apiRequestData,
          isLoggedIn
        );
        setPsstReport(response.response.psst_report);
        console.log(response);

        // const maxAttempts = 10;
        // let attempt = 0;

        // while (
        //   !response?.response?.design_emotion_target ||
        //   typeof response.response.design_emotion_target !== "object" ||
        //   Object.keys(response?.response?.design_emotion_target).length ===
        //     0 ||
        //   !response?.response?.design_emotion_target?.hasOwnProperty(
        //     "target_emotion"
        //   ) ||
        //   !response?.response?.design_emotion_target?.hasOwnProperty(
        //     "design_perspectives"
        //   ) ||
        //   !response?.response?.design_emotion_target?.hasOwnProperty(
        //     "designer_guidelines"
        //   )
        // ) {
        //   if (attempt >= maxAttempts) {
        //     setShowPopupError(true);
        //     return;
        //   }

        //   response = await InterviewXDesignEmotionTargetRequest(
        //     apiRequestData,
        //     isLoggedIn
        //   );

        //   attempt++;
        // }

        await updateToolOnServer(
          toolId,
          {
            completedStep: 3,
            designEmotionTarget: response.response.design_emotion_target,
            // designEmotionScale: oceanResponse.response.design_emotion_scale,
            // designSelectedPersona: selectedPersonaData,
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

  const dummyData = [
    {
      name: "PSST 계획서",
      reason:
        "창업 아이템의 문제 정의부터 해결 방안, 실행 전략, 성장 계획까지 정부지원사업에 최적화",
    },
    {
      name: "FAST 기획서",
      reason:
        "제한된 시간동안 팀을 이루어 문제 해결을 위한 기술 기반 솔루션을 실제로 구현하는 대회",
    },
    {
      name: "IDEA PITCH 제안서",
      reason:
        "창업 아이디어의 시장성, 차별성, 실행력을 설득력 있게 구성하는 경진대회 전용 툴",
    },
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
                    디자인 분야 분석
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Design Sector
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
                    디자인 감성 분석
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    Sentiment Analysis
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">File Upload</H3>
                    <Body3 color="gray800">파일 업로드</Body3>
                  </div>

                  <div className="content">
                    <TabContent5Item required>
                      <div className="title">
                        <Body1 color="gray700">파일 업로드 (20MB)</Body1>
                      </div>
                      <Dropzone
                        onChangeStatus={handleChangeStatus}
                        maxFiles={1}
                        multiple={false}
                        canRemove={false}
                        canRestart={false}
                        disabled={toolSteps >= 1}
                        accept="application/pdf"
                        maxSizeBytes={20 * 1024 * 1024}
                        inputWithFilesContent={
                          <>
                            <img src={images.ImagePrimary} alt="" />
                            {fileNames.length === 0 && (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                <div>
                                  <Body2 color="gray800">
                                    업로드하려는 파일을 드래그하여 놓아주세요
                                  </Body2>
                                  <Sub3 color="gray500">
                                    jpg, png, PDF 파일만 업로드가 가능합니다
                                    (20MB 이하)
                                  </Sub3>
                                </div>
                                <div className="browse-button">
                                  파일 찾아보기
                                </div>
                              </div>
                            )}
                            {fileNames.length > 0 && (
                              <div>
                                {fileNames.map((name, index) => (
                                  <Body2 key={index} color="gray700">
                                    {name}
                                  </Body2>
                                ))}
                              </div>
                            )}
                          </>
                        }
                        inputContent={
                          <>
                            <img src={images.ImagePrimary} alt="" />
                            {fileNames.length === 0 && (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                <div>
                                  <Body2 color="gray800">
                                    업로드하려는 파일을 드래그하여 놓아주세요
                                  </Body2>
                                  <Sub3 color="gray500">
                                    PDF 파일만 업로드가 가능합니다 (20MB 이하)
                                  </Sub3>
                                </div>
                                <div className="browse-button">
                                  파일 찾아보기
                                </div>
                              </div>
                            )}
                            {fileNames.length > 0 && (
                              <div>
                                {fileNames.map((name, index) => (
                                  <Body2 key={index} color="gray700">
                                    {name}
                                  </Body2>
                                ))}
                              </div>
                            )}
                          </>
                        }
                        styles={StyledDropzone}
                      />
                    </TabContent5Item>
                  </div>

                  <div className="content">
                    <CardGroupWrap column style={{ marginBottom: "140px" }}>
                      {dummyData.map((item, index) => (
                        <MoleculeDesignItem
                          style={{ marginBottom: "10px" }}
                          FlexStart
                          key={index}
                          id={index}
                          title={item.name}
                          subtitle={item.reason}
                          isSelected={selectedPersonas.includes(index)}
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
                    disabled={toolSteps >= 1}
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
                    <AtomPersonaLoader message="맞춤 페르소나를 찾고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">수정 필요</H3>
                      <Body3 color="gray800">수정 필요</Body3>
                    </div>

                    <div className="content">
                      <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">리포트 방식</Body2>
                          <Body2 color="gray800">
                            PSST 계획서(PDF 업로드시 "사용자 입력"으로 표시)
                          </Body2>
                        </li>

                        <li>
                          <Body2 color="gray500">설명</Body2>
                          <Body2 color="gray800">수정 필요</Body2>
                        </li>
                      </ListBoxGroup>

                      {/* 추가된 내용 */}
                      <div style={{ marginTop: "20px" }}>
                        {analysisResults.map((analysis, index) => (
                          <>
                            {/* 제목 섹션 */}
                            <div>
                              <Body2
                                color="gray500"
                                style={{ textAlign: "left" }}
                              >
                                {analysis.title}
                              </Body2>
                            </div>
                            <div
                              key={index}
                              style={{
                                border: "1px solid #E5E5E5",
                                borderRadius: "8px",
                                padding: "20px",
                                marginBottom: "16px",
                              }}
                            >
                              {/* 내용 섹션들 */}
                              {analysis.contents?.map(
                                (content, contentIndex) => (
                                  <div key={contentIndex}>
                                    {/* 첫 번째 content가 아닐 경우에만 구분선 표시 */}
                                    {contentIndex > 0 && (
                                      <div
                                        style={{
                                          height: "1px",
                                          background: "#E5E5E5",
                                          margin: "20px 0",
                                        }}
                                      />
                                    )}

                                    <div>
                                      <Body2
                                        color="gray500"
                                        style={{ textAlign: "left" }}
                                      >
                                        {content.sub_title}
                                      </Body2>
                                      <Body2
                                        color="gray800"
                                        style={{
                                          marginTop: "8px",
                                          textAlign: "left",
                                        }}
                                      >
                                        {content.key_message}
                                      </Body2>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </>
                        ))}
                      </div>

                      <Button
                        Other
                        Primary
                        Fill
                        Round
                        onClick={handleReportRequest}
                        // disabled={ selectedPersonas.length === 0 || toolSteps >= 1}
                      >
                        다음
                      </Button>
                    </div>
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
                      <H3 color="gray800">사업계획서</H3>
                      <Body3 color="gray800">사업 계획서를 작성 초안</Body3>
                    </BgBoxItem>

                    <InsightAnalysis>
                      <Markdown style={{ textAlign: "left" }}>
                        {psstReport}
                      </Markdown>
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

const ButtonWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  > div {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
