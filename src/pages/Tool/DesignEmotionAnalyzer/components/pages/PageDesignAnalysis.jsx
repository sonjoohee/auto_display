//디자인 감성 분석기기
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import MoleculeCustomerValueCard from "../../../../Tool/CustomerValueAnalyzer/components/molecules/MoleculeCustomerValueCard";

import { Button } from "../../../../../assets/styles/ButtonStyle";
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
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  PercentBadge,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  SELECTED_TARGET_DISCOVERY_SCENARIO,
  TOOL_LOADING,
  DESIGN_ANALYSIS_BUSINESS_INFO,
  DESIGN_ANALYSIS_UPLOADED_FILES,
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
  H5,
  Sub1,
  Sub2,
  Sub3,
  Body1,
  Body2,
  Body2_1,
  Body3,
  Caption1,
} from "../../../../../assets/styles/Typography";
import {
  InterviewXDesignEmotionAnalysisRequest,
  InterviewXDesignEmotionTargetRequest,
  InterviewXDesignEmotionScaleRequest,
  createToolOnServer,
  updateToolOnServer,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import AnalysisItem from "../molecules/MoleculeAnalysisItem"; // Import the new component
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";

const PageDesignAnalysis = () => {
  const navigate = useNavigate();
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas, setProjectSaas] = useAtom(PROJECT_SAAS);
  const [designAnalysisBusinessTitle, setDesignAnalysisBusinessTitle] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_TITLE
  );
  const [designAnalysisBusinessInfo, setDesignAnalysisBusinessInfo] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_INFO
  );
  const [designAnalysisUploadedFiles, setDesignAnalysisUploadedFiles] = useAtom(
    DESIGN_ANALYSIS_UPLOADED_FILES
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
  const [designAnalysisFileNames, setDesignAnalysisFileNames] = useAtom(
    DESIGN_ANALYSIS_FILE_NAMES
  );
  const [designAnalysisFileId, setDesignAnalysisFileId] = useAtom(
    DESIGN_ANALYSIS_FILE_ID
  );
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMore, setShowPopupMore] = useState(false);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
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
  const [businessDescriptionProject, setBusinessDescriptionProject] =
    useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [personaData, setPersonaData] = useState({
    personaInfo: "",
    personaScenario: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPersonas, setLoadingPersonas] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeDesignTab, setActiveDesignTab] = useState("emotion"); // 'emotion' 또는 'scale'
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [businessDescriptionTitle, setBusinessDescriptionTitle] = useState("");
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const handleToggle = (key) => {
    setState((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  const [state, setState] = useState({
    isExpanded: false,
    showQuestions: false,
  });

  const project = projectSaas;
  // // OCEAN 값들을 관리하기 위한 상태
  // const [oceanValues, setOceanValues] = useState({
  //   Comfortable: 3,        // 편안한
  //   Satisfying: 3,        // 만족스러운
  //   Trustworthy: 3,       // 신뢰가는
  //   Anticipated: 3,       // 기대되는
  //   Attractive: 3,        // 매력적인
  //   Practical: 3,         // 실용적인
  //   Beautiful: 3,         // 아름다운
  //   Efficient: 3,         // 효율적인
  //   Easy: 3,             // 사용하기 쉬운
  // });

  // // OCEAN 무시 여부를 관리하는 상태
  // const [ignoreOcean, setIgnoreOcean] = useState(false);

  const [showPopupFileSize, setShowPopupFileSize] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const calculateDropDirection = () => {
  //   if (selectBoxRef.current) {
  //     const rect = selectBoxRef.current.getBoundingClientRect();
  //     const spaceBelow = window.innerHeight - rect.bottom;
  //     const spaceAbove = rect.top;
  //     const dropDownHeight = 200; // 예상되는 드롭다운 높이

  //     setDropUp(spaceBelow < dropDownHeight && spaceAbove > spaceBelow);
  //   }
  // };

  // const handleSelectBoxClick = () => {
  //   if (toolStep >= 1) return;
  //   calculateDropDirection();
  //   setIsSelectBoxOpen(!isSelectBoxOpen);
  // };

  // const handlePurposeSelect = (purpose) => {
  //   setSelectedPurpose(purpose);
  //   handleContactInputChange("purpose", purpose);
  //   setIsSelectBoxOpen(false);
  // };

  // const handleContactInputChange = (field, value) => {
  //   setContactForm((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  // const handleSelectPersona = () => {
  //   if (selectedPersonas.length > 0) {
  //     setSelectedInterviewType("multiple");
  //     setSelectedInterviewPurpose("product_experience_new");
  //   }
  // };

  //저장되었던 인터뷰 로드
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
        setTargetCustomer(project?.projectAnalysis.target_customer ?? "");
      }
      if (toolLoading) {
        console.log("project", project);
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

        // 비즈니스 정보 설정 (Step 1)
        if (project) {
          setBusinessDescriptionTitle(projectTitle);
          setBusinessDescription(projectAnalysis);
          setTargetCustomer(project?.projectAnalysis.target_customer ?? "");
        }

        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 3));

        // 비즈니스 정보 설정 (Step 1)
        if (designAnalysisBusinessInfo) {
          // setBusinessDescription(designAnalysisBusinessInfo ?? "");
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
          setToolStep(1);
          setCompletedSteps(completedStepsArray.slice(0, -1));
        } else {
          if (designAnalysisEmotionTarget) {
            setDesignAnalysisEmotionTarget(designAnalysisEmotionTarget ?? {});
          }

          if (designAnalysisEmotionScale) {
            setDesignAnalysisEmotionScale(designAnalysisEmotionScale ?? {});
          }
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
    try {
      const timeStamp = new Date().getTime();

      // 비즈니스 데이터 추가
      const Data = {
        business: businessDescription,
        tool_id: "image_" + timeStamp,
        image: uploadedFiles[0],
      };

      setDesignAnalysisFileId(["image_" + timeStamp]);

      // API 요청
      const response = await InterviewXDesignEmotionAnalysisRequest(
        Data,
        isLoggedIn
      );
      if (
        !response?.response.design_emotion_analysis ||
        !Array.isArray(response.response.design_emotion_analysis) ||
        response.response.design_emotion_analysis.length === 0
      ) {
        setShowPopupError(true);
        return;
      }

      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_design_emotion_analysis",
        },
        isLoggedIn
      );

      setToolId(responseToolId);
      setToolStep(1);

      // API 응답에서 페르소나 데이터를 추출하여 atom에 저장
      setDesignAnalysisEmotionAnalysis(
        response.response.design_emotion_analysis
      );
      setDesignAnalysisBusinessInfo(businessDescription);
      setDesignAnalysisBusinessTitle(businessDescriptionTitle);
      // setDesignAnalysisUploadedFiles(uploadedFiles);
      setFileNames(uploadedFiles.map((file) => file.name));

      await updateToolOnServer(
        responseToolId,
        {
          completed_step: 1,
          designEmotionAnalysis: response.response.design_emotion_analysis,
          business: businessDescription,
          imageName: uploadedFiles.map((file) => ({
            id: "image_" + timeStamp,
            name: file.name,
          })),
        },
        isLoggedIn
      );

      handleNextStep(1);
    } catch (error) {
      console.error("Error submitting business info:", error);
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
    setToolStep(2);
    try {
      const selectedPersonaData = designAnalysisEmotionAnalysis.filter(
        (persona, index) => selectedPersonas.includes(index)
      );
      setSelectedDesignAnalysisEmotionAnalysis(selectedPersonaData);
      // console.log('selectedPersonaData:', selectedPersonaData);
      await updateToolOnServer(
        toolId,
        {
          completed_step: 2,
          designSelectedPersona: selectedPersonaData,
        },
        isLoggedIn
      );
      setIsLoadingReport(true);

      // 선택된 페르소나가 하나일 경우에만 시나리오 요청
      if (selectedPersonaData.length > 0) {
        const persona = selectedPersonaData[0]; // 첫 번째 페르소나 선택
        try {
          const apiRequestData = {
            business: designAnalysisBusinessInfo,
            design_emotion_selected_field: persona.name,
            design_emotion_analysis: persona,
          };

          let response = await InterviewXDesignEmotionTargetRequest(
            apiRequestData,
            isLoggedIn
          );

          const maxAttempts = 10;
          let attempt = 0;

          while (
            !response?.response?.design_emotion_target ||
            typeof response.response.design_emotion_target !== "object" ||
            Object.keys(response?.response?.design_emotion_target).length ===
              0 ||
            !response?.response?.design_emotion_target?.hasOwnProperty(
              "target_emotion"
            ) ||
            !response?.response?.design_emotion_target?.hasOwnProperty(
              "design_perspectives"
            ) ||
            !response?.response?.design_emotion_target?.hasOwnProperty(
              "designer_guidelines"
            )
          ) {
            if (attempt >= maxAttempts) {
              setShowPopupError(true);
              return;
            }

            response = await InterviewXDesignEmotionTargetRequest(
              apiRequestData,
              isLoggedIn
            );

            attempt++;
          }

          setDesignAnalysisEmotionTarget(
            response.response.design_emotion_target
          );

          const oceanData = {
            tool_id: designAnalysisFileId[0],
            business: designAnalysisBusinessInfo,
            design_emotion_selected_field: persona.name,
            design_emotion_target: response?.response?.design_emotion_target,
          };

          attempt = 0;
          let oceanResponse = null;

          while (
            !oceanResponse ||
            typeof oceanResponse.response.design_emotion_scale !== "object" ||
            Object.keys(oceanResponse?.response?.design_emotion_scale)
              .length === 0 ||
            !oceanResponse?.response?.design_emotion_scale?.hasOwnProperty(
              "conclusion"
            ) ||
            !oceanResponse?.response?.design_emotion_scale?.hasOwnProperty(
              "evaluation_analysis"
            ) ||
            !oceanResponse?.response?.design_emotion_scale?.hasOwnProperty(
              "sd_scale_analysis"
            )
          ) {
            if (attempt >= maxAttempts) {
              setShowPopupError(true);
              return;
            }

            oceanResponse = await InterviewXDesignEmotionScaleRequest(
              oceanData,
              isLoggedIn
            );

            attempt++;
          }
          // console.log("🚀 ~ oceanResponse:", oceanResponse);
          setDesignAnalysisEmotionScale(
            oceanResponse.response.design_emotion_scale
          );

          await updateToolOnServer(
            toolId,
            {
              completed_step: 3,
              designEmotionTarget: response.response.design_emotion_target,
              designEmotionScale: oceanResponse.response.design_emotion_scale,
              designSelectedPersona: selectedPersonaData,
            },
            isLoggedIn
          );
        } catch (error) {
          console.error(`Error processing persona ${persona.name}:`, error);
        }
      }

      // setToolStep(3);
    } catch (error) {
      console.error("Error submitting personas:", error);
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
    // console.log(status, meta, file);

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

  // 업로드 파라미터 설정
  // const getUploadParams = () => {
  //   return { url: 'https://wishresearch.kr/panels/tool/create_tool_temp_file' } // 실제 업로드 URL로 변경 필요
  // }

  // 파일 제출 핸들러
  // const handleSubmit = (files) => {
  //   const validFiles = files.filter(f => f.meta.status === 'done' && f.file.size <= 20 * 1024 * 1024);
  //   setUploadedFiles(validFiles.map(f => f.file));
  // }

  // // OCEAN 값 변경을 처리하는 핸들러
  // const handleOceanChange = (trait, value) => {
  //   if (!ignoreOcean) {
  //     const numValue = parseFloat(value);
  //     // 값이 3에 가까울 때 자동으로 3으로 스냅
  //     const snapValue = Math.abs(numValue - 3) < 0.2 ? 3 : numValue;

  //     setOceanValues(prev => ({
  //       ...prev,
  //       [trait]: snapValue
  //     }));
  //   }
  // };

  // // OCEAN 값들을 초기화하는 함수
  // const resetOceanValues = () => {
  //   setOceanValues({
  //     openness: 0.5,
  //     conscientiousness: 0.5,
  //     extraversion: 0.5,
  //     agreeableness: 0.5,
  //     neuroticism: 0.5
  //   });
  // };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("designanalysis")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          console.log("새로고침 감지: URL 비교");
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
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    이미지 업로드
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={!completedSteps.includes(1)}
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
                disabled={!completedSteps.includes(2)}
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
                    <AtomPersonaLoader message="이미지를 분석하고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Image Upload</H3>
                      <Body3 color="gray800">
                        감성 분석을 원하시는 비즈니스 설명과 디자인 이미지를
                        업로드해주세요
                      </Body3>
                    </div>

                    <div className="content">
                      {/* <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">비즈니스 설명</Body1>
                          <Body1 color="red">*</Body1>
                        </div>
                        <FormBox Large>
                          <CustomTextarea
                            disabled={toolStep >= 1}
                            Edit
                            rows={4}
                            placeholder="비즈니스에 대해서 설명해주세요 (예: 친환경 전기 자전거 공유 플랫폼 등)"
                            onChange={handleBusinessDescriptionChange}
                            value={businessDescription}
                            maxLength={500}
                            status="valid"
                          />
                          <Body2 color="gray300" align="right">
                            {businessDescription.length} / 500
                          </Body2>
                        </FormBox>
                      </TabContent5Item> */}
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
                          <Body1 color="gray700">분석할 이미지 업로드</Body1>
                          <Body1 color="red">*</Body1>
                        </div>
                        <Dropzone
                          onChangeStatus={handleChangeStatus}
                          // onSubmit={handleSubmit}
                          // getUploadParams={getUploadParams}
                          maxFiles={1}
                          multiple={true}
                          canRemove={true}
                          canRestart={false}
                          disabled={toolStep >= 1}
                          accept="image/*"
                          maxSizeBytes={20 * 1024 * 1024}
                          inputWithFilesContent={
                            <>
                              <img src={images.ImagePrimary} alt="" />
                              {fileNames.length === 0 && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <Body2 color="gray700">
                                    이미지 첨부 또는
                                  </Body2>
                                  <Body2 color="primary">이미지 가져오기</Body2>
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
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <Body2 color="gray700">
                                    이미지 첨부 또는
                                  </Body2>
                                  <Body2 color="primary">이미지 가져오기</Body2>
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
                          // submitButtonContent="업로드"
                        />
                      </TabContent5Item>
                    </div>

                    <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={handleSubmitBusinessInfo}
                      disabled={!isRequiredFieldsFilled() || toolStep >= 1}
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
                      <H3 color="gray800">Design Sector Analysis</H3>
                      <Body3 color="gray800">
                        업로드된 이미지를 기반으로 가장 적합한 디자인 분야를
                        분류했습니다
                      </Body3>
                    </div>

                    <div className="content">
                      <CardGroupWrap column style={{ marginBottom: "140px" }}>
                        {designAnalysisEmotionAnalysis.length > 0 ? (
                          designAnalysisEmotionAnalysis.map(
                            (persona, index) => {
                              return (
                                <MoleculeDesignItem
                                  FlexStart
                                  key={index}
                                  id={index}
                                  title={persona.name}
                                  subtitle={persona.reason}
                                  isSelected={selectedPersonas.includes(index)}
                                  onSelect={() => handleCheckboxChange(index)}
                                  disabled={toolStep >= 2 ? true : false}
                                />
                              );
                            }
                          )
                        ) : (
                          <Body3 color="gray700">데이터가 없습니다.</Body3>
                        )}
                      </CardGroupWrap>

                      <BottomBar W100>
                        <Body2
                          color={
                            selectedPersonas.length === 0
                              ? "gray800"
                              : "gray800"
                          }
                        >
                          가장 적합하다고 생각하시는 디자인 분야를 선택해주세요
                        </Body2>
                        <Button
                          Large
                          Primary
                          Round
                          Fill
                          disabled={
                            toolStep >= 2 || selectedPersonas.length === 0
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
                      <H3 color="gray800">디자인 감성 분석</H3>
                      <Body3 color="gray800">
                        디자인이 사용자에게 전달하는 감정을 분석하고, 시각적
                        커뮤니케이션 효과를 극대화하세요
                      </Body3>
                    </BgBoxItem>

                    <InsightAnalysis>
                      <div className="title">
                        <div>
                          <TabWrapType4>
                            <TabButtonType4
                              active={activeDesignTab === "emotion"}
                              onClick={() => setActiveDesignTab("emotion")}
                            >
                              디자인 목표 감성
                            </TabButtonType4>
                            <TabButtonType4
                              active={activeDesignTab === "scale"}
                              onClick={() => setActiveDesignTab("scale")}
                            >
                              감정 스케일 매핑
                            </TabButtonType4>
                          </TabWrapType4>
                        </div>
                        {/* <Button Primary onClick={() => setShowPopupSave(true)}>
                          리포트 저장하기
                        </Button> */}
                      </div>
                    </InsightAnalysis>

                    <InsightAnalysis>
                      <div className="title">
                        <H4 color="gray800" align="left">
                          {activeDesignTab === "emotion" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: `${project?.projectTitle}가(${selectedDesignAnalysisEmotionAnalysis?.[0]?.name})
                            에서 궁극적으로 달성하고자하는 주요 목표 감성은 ${designAnalysisEmotionTarget?.target_emotion} `,
                              }}
                            />
                          ) : (
                            `${designAnalysisEmotionScale?.conclusion}`
                          )}
                        </H4>
                      </div>

                      <div className="content">
                        {activeDesignTab === "emotion" ? (
                          <Body3 color="gray700">
                            {designAnalysisEmotionTarget?.designer_guidelines}
                          </Body3>
                        ) : (
                          <>
                            <Body3 color="gray700">
                              강점 :{" "}
                              {
                                designAnalysisEmotionScale?.evaluation_analysis
                                  ?.strengths
                              }
                            </Body3>
                            <Body3 color="gray700">
                              약점 및 개선 방향:{" "}
                              {
                                designAnalysisEmotionScale?.evaluation_analysis
                                  ?.weaknesses
                              }
                            </Body3>
                          </>
                        )}
                      </div>
                    </InsightAnalysis>

                    {activeDesignTab === "emotion" && (
                      <InsightAnalysis style={{ marginBottom: "240px" }}>
                        <Sub3 color="gray700" align="left">
                          💡 %는 해당 비즈니스에서 차지하는 중요도를 의미합니다.
                        </Sub3>
                        <CardGroupWrap column $isExpanded={state.isExpanded}>
                          {designAnalysisEmotionTarget?.design_perspectives?.map(
                            (perspective, index) => (
                              <AnalysisItem
                                business={designAnalysisBusinessInfo}
                                key={index}
                                percentage={perspective.weight + "%"}
                                title={perspective.name}
                                subtitle={perspective.features
                                  .map((feature) => feature.title)
                                  .join(", ")}
                                details={perspective}
                              />
                            )
                          )}
                        </CardGroupWrap>
                      </InsightAnalysis>
                    )}

                    {activeDesignTab === "scale" && (
                      <InsightAnalysis style={{ marginBottom: "240px" }}>
                        <OCEANRangeWrap report>
                          {/* OCEAN 값 슬라이더 */}
                          {designAnalysisEmotionScale?.sd_scale_analysis?.map(
                            (item, index) => (
                              <div key={index}>
                                <Body3 color="gray800" align="right">
                                  {item.opposite_emotion}
                                </Body3>
                                <RangeSlider
                                  type="range"
                                  min="1"
                                  max="7"
                                  step="1"
                                  value={item.score}
                                  // disabled={true}
                                  // style={{ flex: "2" }}
                                />
                                <Body3 color="gray800" align="left">
                                  {item.target_emotion}
                                </Body3>
                              </div>
                            )
                          )}
                        </OCEANRangeWrap>
                      </InsightAnalysis>
                    )}

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

export default PageDesignAnalysis;

const DesignAnalysisWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background-image: ${(props) =>
    props.$isChecked
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
  transition: background-image 0.3s ease-in-out;
  cursor: pointer;
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleButton = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-bottom: 6px;
  border: none;
  background: none;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    transform: ${(props) =>
      props.$isExpanded
        ? "translate(-50%, -50%) rotate(45deg)"
        : "translate(-50%, -50%) rotate(-135deg)"};
    margin-top: 2px;
    border-top: 1px solid ${palette.gray500};
    border-left: 1px solid ${palette.gray500};
    transition: all 0.5s;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const ToggleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid ${palette.outlineGray};

  .bgContent {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background: ${palette.chatGray};

    > div {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 8px;

      + div {
        padding-top: 8px;
        border-top: 1px solid ${palette.outlineGray};
      }
    }
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;

    &:before {
      flex-shrink: 0;
      width: 3px;
      height: 3px;
      margin-top: 10px;
      border-radius: 50%;
      background: ${palette.gray800};
      content: "";
    }
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.$isSelected ? palette.primary : palette.outlineGray)};
  background: ${(props) => {
    if (props.NoBackground) {
      return props.$isSelected ? "rgba(34, 111, 255, 0.10)" : palette.white;
    }
    return props.$isSelected && !props.$isExpanded
      ? "rgba(34, 111, 255, 0.10)"
      : palette.white;
  }};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.TitleFlex &&
    css`
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    `}
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
