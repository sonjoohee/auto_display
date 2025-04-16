//디자인 감성 분석기
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button , IconButton } from "../../../../../assets/styles/ButtonStyle";
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
  ListBoxGroup
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
} from "../../../../../assets/styles/Typography";
import {
  InterviewXDesignEmotionAnalysisRequest,
  InterviewXDesignEmotionTargetRequest,
  InterviewXDesignEmotionScaleRequest,
  createToolOnServer,
  updateToolOnServer,
  EducationToolsRequest,
  getFindToolListOnServerSaas
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import AnalysisItem from "../molecules/MoleculeAnalysisItem";
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";
import MoleculeDeleteForm from "../../../public/MoleculeDeleteForm";
import MandalArtGraph from "../../../../../components/Charts/MandalArtGraph";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import MoleculeTagList from "../molecules/MoleculeTagList";

const PageIdeaGeneration = () => {

  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn, ] = useAtom(IS_LOGGED_IN);
  const [projectSaas, ] = useAtom(PROJECT_SAAS);
  const [, setDesignAnalysisBusinessTitle] = useAtom(DESIGN_ANALYSIS_BUSINESS_TITLE);
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
  const [designAnalysisFileNames, ] = useAtom(DESIGN_ANALYSIS_FILE_NAMES);
  const [designAnalysisFileId, setDesignAnalysisFileId] = useAtom(
    DESIGN_ANALYSIS_FILE_ID
  );
  const [ideaGenerationStartPosition, setIdeaGenerationStartPosition] = useAtom(IDEA_GENERATION_START_POSITION);
  const [ideaGenerationIdeaList, setIdeaGenerationIdeaList] = useAtom(IDEA_GENERATION_IDEA_LIST);
  const [customerJourneyMapReport, setCustomerJourneyMapReport] = useAtom(CUSTOMER_JOURNEY_MAP_REPORT);
  const [customerJourneyMapSelectedPersona, setCustomerJourneyMapSelectedPersona] = useAtom(CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA);

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [customerJourneyList, setCustomerJourneyList] = useState([]);
  const [showPopupError, setShowPopupError] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const customerListRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);
  const [activeDesignTab, setActiveDesignTab] = useState("emotion");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [businessDescriptionTitle, setBusinessDescriptionTitle] = useState("");
  const [customerValueList, setCustomerValueList] = useState([]);
  const [state, ] = useState({
    isExpanded: false,
    showQuestions: false,
  });
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [targetCustomer, setTargetCustomer] = useState([]);
  const [toolSteps, setToolSteps] = useState(0);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
    analysisScope: "",
  });
  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
    analysisScope: false,
  });
  const [dropUpStates, setDropUpStates] = useState({
    customerList: false,
    analysisScope: false,
  });
  const [, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // 첫 로딩 체크를 위한 상태
  const [selectedJourneyMapData, setSelectedJourneyMapData] = useState([]);

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

  
  // 고객핵심가치분석 리스트 가져오기
  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];

        const response = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_customer_journey_map_direction_education",
          isLoggedIn
        );

        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_customer_journey_map_direction_education" &&
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

    // handleInputChange 함수 수정
    const handleInputChange = (field, value) => {
      // formData 대신 개별 상태 업데이트
      if (field === "projectDescription") {
        setProjectDescription(value);
      }
    };

  const handleTagsChange = (selected) => {
    setSelectedProblems(selected);
  };

  const handleSubmitProblem = async () => {
    try {
    

      //     // 빈 문자열이나 공백만 있는 항목 제거
    // const validItems = targetCustomer.filter(item => item.trim() !== "");
    
    // if (validItems.length === 0) {
    //   // 유효한 항목이 없는 경우 처리
    //   return;
    // }

    // // API 요청 데이터 구성
    // const Data = {
    //   problems: validItems,
    //   // 필요한 경우 추가 데이터
    //   // business_id: currentBusinessId,
    //   // timestamp: new Date().getTime(),
    // };

    // // API 호출
    // // const response = await EducationToolsRequest (
    // //  Data,
    // //   isLoggedIn
    // // );

    
  const DUMMY_PROBLEMS = [
    {
      id: 1,
      name: "사용자 경험 개선 필요",
      description: "현재 UI가 사용자 친화적이지 않음"
    },
    {
      id: 2,
      name: "성능 최적화 필요",
      description: "페이지 로딩 속도가 느림"
    },
    {
      id: 3,
      name: "모바일 대응 미흡",
      description: "모바일에서 사용성이 좋지 않음"
    },
    {
      id: 4,
      name: "데이터 동기화 문제",
      description: "실시간 업데이트가 원활하지 않음"
    },
    {
      id: 5,
      name: "보안 강화 필요",
      description: "데이터 보안 수준 향상 필요"
    },
    {
      id: 6,
      name: "검색 기능 개선",
      description: "검색 결과의 정확도가 낮음"
    },
    {
      id: 7,
      name: "에러 처리 미흡",
      description: "사용자 친화적인 에러 메시지 필요"
    },
    {
      id: 8,
      name: "접근성 개선 필요",
      description: "장애인 사용자를 위한 기능 부족"
    },
    {
      id: 9,
      name: "모바일 대응 미흡",
      description: "모바일에서 사용성이 좋지 않음"
    },
    {
      id: 10,
      name: "모바일 대응 미흡",
      description: "모바일에서 사용성이 좋지 않음"
    }
  ];
 
  setIdeaGenerationStartPosition(DUMMY_PROBLEMS);

    // setIdeaGenerationStartPosition(selectedProblems);



      // API 호출 로직...

      handleNextStep(1);

    } catch (error) {
      console.error("Error submitting problems:", error);
      setShowPopupError(true);
    }
  };

  const handleSubmitTheme = async () => {
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
      // setIsLoadingReport(true);

      // // 선택된 페르소나가 하나일 경우에만 시나리오 요청
      // if (selectedPersonaData.length > 0) {
      //   const persona = selectedPersonaData[0]; // 첫 번째 페르소나 선택
      //   try {
      //     const apiRequestData = {
      //       business: designAnalysisBusinessInfo,
      //       design_emotion_selected_field: persona.name,
      //       design_emotion_analysis: persona,
      //     };

      //     let response = await InterviewXDesignEmotionTargetRequest(
      //       apiRequestData,
      //       isLoggedIn
      //     );

      //     const maxAttempts = 10;
      //     let attempt = 0;

      //     while (
      //       !response?.response?.design_emotion_target ||
      //       typeof response.response.design_emotion_target !== "object" ||
      //       Object.keys(response?.response?.design_emotion_target).length ===
      //         0 ||
      //       !response?.response?.design_emotion_target?.hasOwnProperty(
      //         "target_emotion"
      //       ) ||
      //       !response?.response?.design_emotion_target?.hasOwnProperty(
      //         "design_perspectives"
      //       ) ||
      //       !response?.response?.design_emotion_target?.hasOwnProperty(
      //         "designer_guidelines"
      //       )
      //     ) {
      //       if (attempt >= maxAttempts) {
      //         setShowPopupError(true);
      //         return;
      //       }

      //       response = await InterviewXDesignEmotionTargetRequest(
      //         apiRequestData,
      //         isLoggedIn
      //       );

      //       attempt++;
      //     }

      //     setDesignAnalysisEmotionTarget(
      //       response.response.design_emotion_target
      //     );

      //     const oceanData = {
      //       tool_id: designAnalysisFileId[0],
      //       business: designAnalysisBusinessInfo,
      //       design_emotion_selected_field: persona.name,
      //       design_emotion_target: response?.response?.design_emotion_target,
      //     };

      //     attempt = 0;
      //     let oceanResponse = null;

      //     while (
      //       !oceanResponse ||
      //       typeof oceanResponse.response.design_emotion_scale !== "object" ||
      //       Object.keys(oceanResponse?.response?.design_emotion_scale)
      //         .length === 0 ||
      //       !oceanResponse?.response?.design_emotion_scale?.hasOwnProperty(
      //         "conclusion"
      //       ) ||
      //       !oceanResponse?.response?.design_emotion_scale?.hasOwnProperty(
      //         "evaluation_analysis"
      //       ) ||
      //       !oceanResponse?.response?.design_emotion_scale?.hasOwnProperty(
      //         "sd_scale_analysis"
      //       )
      //     ) {
      //       if (attempt >= maxAttempts) {
      //         setShowPopupError(true);
      //         return;
      //       }

      //       oceanResponse = await InterviewXDesignEmotionScaleRequest(
      //         oceanData,
      //         isLoggedIn
      //       );

      //       attempt++;
      //     }
      //     setDesignAnalysisEmotionScale(
      //       oceanResponse.response.design_emotion_scale
      //     );

      //     await updateToolOnServer(
      //       toolId,
      //       {
      //         completedStep: 3,
      //         designEmotionTarget: response.response.design_emotion_target,
      //         designEmotionScale: oceanResponse.response.design_emotion_scale,
      //         designSelectedPersona: selectedPersonaData,
      //       },
      //       isLoggedIn
      //     );
      //   } catch (error) {}
      // }


const DUMMY_IDEAS = [
  {
    id: 1,
    title: "Idea 1. 소비자 중요 가치 분석",
    content: [
      "설명: 장인의 오리엔트를 실시간으로 분석하고, AI가 최적의 정소 결정의 방법을 선택하여 자동으로 청소하는 로봇 시스템.",
      "기술 활용: 병원 진료 데이터를 기반으로 알레르기 유발 물질, 공기 중 유해 성분 등을 분석하고, 맞춤형 청소 설정을 제공."
    ]
  },
  {
    id: 2,
    title: "Idea 2. 소비자 중요 가치 분석",
    content: [
      "설명: 장인의 오리엔트를 실시간으로 분석하고, AI가 최적의 정소 결정의 방법을 선택하여 자동으로 청소하는 로봇 시스템.",
      "기술 활용: 병원 진료 데이터를 기반으로 알레르기 유발 물질, 공기 중 유해 성분 등을 분석하고, 맞춤형 청소 설정을 제공."
    ]
  },
  // ... 더 많은 아이디어 추가 가능
];

setIdeaGenerationIdeaList(DUMMY_IDEAS);

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

  
  // const handlePurposeSelect = (purpose, selectBoxId) => {

  //   setSelectedPurposes((prev) => ({
  //     ...(prev || {}),
  //     [selectBoxId]: purpose || "",
  //   }));
  //   handleContactInputChange("purpose", purpose || "");
  //   setSelectBoxStates((prev) => ({
  //     ...(prev || {}),
  //     [selectBoxId]: false,
  //   }));

  //   if (selectBoxId === "customerList") {
  //     setBusinessDescription(purpose || "");
  //   }

  // };

  const handlePurposeSelect = async (purpose, selectBoxId, item) => {
    setIsContentLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      if (selectBoxId === "customerList" && item) {
        setSelectedJourneyMapData(item);
        console.log("Selected Journey Map Data:", item);

        setBusinessDescription(purpose || "");
        
        const data = {
          type: "ix_idea_generation_problem_education",
          customer_journey_map_persona: item.customerJourneyMapSelectedPersona,
          customer_journey_map_report: item.customerJourneyMapReport,
        };
        console.log(data);

        const response = await EducationToolsRequest({
          data,
          isLoggedIn
        });

        console.log("API Response:", response);
      }

      setSelectedPurposes((prev) => ({
        ...(prev || {}),
        [selectBoxId]: purpose || "",
      }));
      
      handleContactInputChange("purpose", purpose || "");
      setSelectBoxStates((prev) => ({
        ...(prev || {}),
        [selectBoxId]: false,
      }));

    } catch (error) {
      console.error("Error in handlePurposeSelect:", error);
      setShowPopupError(true);
    } finally {
      setTimeout(() => {
        setIsContentLoading(false);
      }, 500);
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



  const handleEditBusinessClick = () => {
    setIsEditingBusiness(true);
  };

  const handleSaveBusinessClick = () => {
    setIsEditingBusiness(false);
  };

  const handleUndoBusinessClick = () => {
    const originalText = (project?.projectAnalysis.business_analysis
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

  // // activeTab이 1로 변경될 때 API 호출
  // useEffect(() => {
  //   const fetchProblemData = async () => {
  //     // if (activeTab === 1 && isFirstLoad) {
  //       setIsLoading(true);
  //       try {

  //         const data = {
  //           type: "ix_idea_generation_problem_education",
  //           customer_journey_map_persona : customerJourneyMapSelectedPersona,
  //           customer_journey_map_report : customerJourneyMapReport,
  //         }

  //         console.log(data);
         
  //         // API 호출
  //         const response = await EducationToolsRequest({
  //          data, isLoggedIn
  //         });

  //         console.log(response);

  //       } catch (error) {
  //         console.error("Error fetching problem data:", error);
  //         setShowPopupError(true);
  //       } finally {
  //         setIsLoading(false);
  //         setIsFirstLoad(false); // 첫 로딩 완료 표시
  //       }
  //     }
  //   // };

  //   fetchProblemData();
  // }, []); // activeTab이 변경될 때마다 실행

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
                    문제 정의
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={!completedSteps.includes(1) ||  isLoading || isLoadingReport }
              >
                <span>02</span>
                <div className="text">
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
                disabled={!completedSteps.includes(2) ||  isLoading || isLoadingReport }
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                  아이디어 발상
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
                      <H3 color="gray800">Problem & Needs</H3>
                      <Body3 color="gray800">
                      고객 여정 분석을 원하는 주요 페르소나의 문제점 또는 니즈를 도출하세요
                      </Body3>
                    </div>

                    <div className="content">
                    <TabContent5Item borderBottom>
                    <div className="title">
                      <Body1 color="gray700">문제점 & 니즈 가져오기 </Body1>
                    </div>

                    <SelectBox ref={customerListRef}>
                      <SelectBoxTitle
                        onClick={() =>
                          handleSelectBoxClick("customerList", customerListRef)
                        }
                        style={{
                          cursor: toolSteps >= 1 ? "not-allowed" : "pointer",
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
                              disabled={toolSteps >= 1}
                       
                            >
                              <Body2 color="gray300" align="left">
                               직접 문제점을 작성합니다.
                              </Body2>
                            </SelectBoxItem>
                          ) : (
                            customerJourneyList.map((item, index) => (
                              <SelectBoxItem
                                disabled={toolSteps >= 1}
                                key={index}
                                onClick={() => {
                                  console.log("Selected Item:", item);
                                  handlePurposeSelect(
                                    `${item.updateDate.split(":")[0]}:${
                                      item.updateDate.split(":")[1]
                                    } 고객 핵심 가치 분석기 - 
                                    ${item.customerJourneyMapSelectedPersona.personaName || '페르소나'} 분석`,
                                    "customerList",
                                    item
                                  );
                                }}
                              >
                                <Body2 color="gray700" align="left">
                                  {item.updateDate.split(":")[0]}:
                                  {item.updateDate.split(":")[1]} 고객 핵심 가치
                                  분석기 -
                                  {item.customerJourneyMapSelectedPersona.personaName || '페르소나'} 분석
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
                        <div className="title">
                          <Body1 color="gray700">문제점 & 니즈 리스트 (최소 8개 이상 작성 필요)</Body1>
                        </div>
                        <MoleculeDeleteForm
                          items={targetCustomer || []}
                          setItems={setTargetCustomer || []}
                          disabled={toolSteps >= 1}
                          maxItems={13}
                          placeholder="문제점 작성"
                          initialItemCount={8}
                        />
                 
                        
                      </>
                    )}
                  </TabContent5Item>
                  
                    </div>
                    <Button
                            Other
                            Primary
                            Fill
                            Round
                            onClick={handleSubmitProblem}
                            // disabled={!isRequiredFieldsFilled() || toolSteps >= 1}
                          >
                            아이디어 발상으로 전환
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
                      <H3 color="gray800">Idea Generation Theme</H3>
                      <Body3 color="gray800">
                      문제와 니즈를 창의적 해결 주제로 전환하여, 아이디어 발상의 방향을 정해주세요.
                      </Body3>
                    </div>

                    <div className="content">
                    <Title>
                        <Body1 color="gray700">
                        아이디어 시작점을 선택하세요 (8개 선택가능) 
                        </Body1>
                      </Title>

                      {/* {selectedProblems.length > 0 ? ( */}
                     <CardGroupWrap column style={{ marginBottom: "140px" }}>
                     <MoleculeTagList
                       items={ideaGenerationStartPosition.map(problem => problem.name)}  // name만 전달
                       onTagsChange={handleTagsChange}
                       disabled={toolSteps >= 2}
                     />
                   </CardGroupWrap>
                    {/* ) : (
                      <Body3 color="gray700">데이터가 없습니다.</Body3>
                    )} */}


                      <div className="content">
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
                          placeholder='보유 기술을 입력하시면, 아이디어가 더 잘나와요 '
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
                          // disabled={completedSteps.includes(2) ||  Object.keys(quickSurveyAnalysis).length > 0 }
                          disabled={
                            completedSteps.includes(2) || toolSteps >= 1
                          }
                        />
                        <Body2 color="gray300" align="right">
                          {descriptionLength} / 100
                        </Body2>
                      </FormBox>
                     
                    </TabContent5Item>
                  </div>

                    </div>
                  </>
                )}
                 <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={handleSubmitTheme}
                      // disabled={!isRequiredFieldsFilled() || toolSteps >= 1}
                      // targetCustomer.filter(item => item.trim() !== '').length < 8  // 8개 미만이면 비활성화
                    >
                      아이디어 발상으로 전환
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
                      <H3 color="gray800">Idea Generation Theme</H3>
                      <Body3 color="gray800">
                      문제와 니즈를 창의적 해결 주제로 전환하여, 아이디어 발상의 방향을 정해주세요.
                      </Body3>
                    </div>

                    <div className="content">
                    <Title>
                        <Body1 color="gray700">
                        아이디어 시작점을 선택하세요 (8개 선택가능) 
                        </Body1>
                      </Title>

                      {/* {selectedProblems.length > 0 ? ( */}
                     <CardGroupWrap column style={{ marginBottom: "140px" }}>
                     <MandalArtGraph
                      //  items={ideaGenerationStartPosition.map(problem => problem.name)}  // name만 전달
                      //  onTagsChange={handleTagsChange}
                      //  disabled={toolSteps >= 2}
                     />
                   </CardGroupWrap>
                    {/* ) : (
                      <Body3 color="gray700">데이터가 없습니다.</Body3>
                    )} */}


                      <div className="content">
                      <IdeaContainer>
                      {ideaGenerationIdeaList.map((idea) => (
                        <IdeaBox key={idea.id}>
                          <IdeaTitle>{idea.title}</IdeaTitle>
                          <IdeaContent>
                            {idea.content.map((text, index) => (
                              <IdeaText key={index}>• {text}</IdeaText>
                            ))}
                          </IdeaContent>
                        </IdeaBox>
                      ))}
                </IdeaContainer>
                  </div>

                    </div>
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

export default PageIdeaGeneration;

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
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${palette.gray800};
  margin: 0;
`;

const IdeaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const IdeaText = styled.p`
  font-family: 'Pretendard', sans-serif;
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