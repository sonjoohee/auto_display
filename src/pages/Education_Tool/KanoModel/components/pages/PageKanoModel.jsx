//디자인 감성 분석기
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import images from "../../../../../assets/styles/Images";
import {
  CustomTextarea,
  FormBox,
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
  BgBoxItem,
  DropzoneStyles,
  Title,
  ListBoxGroup,
  BoxWrap,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  PROJECT_SAAS,
  QUICK_SURVEY_PROJECT_DESCRIPTION,
  QUICK_SURVEY_ANALYSIS,
  QUICK_SURVEY_CUSTOM_GUIDE,
  QUICK_SURVEY_PRESET_DATA,
  QUICK_SURVEY_PERSONA_GROUP,
  QUICK_SURVEY_INTERVIEW,
  QUICK_SURVEY_REPORT,
  QUICK_SURVEY_STATIC_DATA,
  QUICK_SURVEY_SELECTED_QUESTION,
  QUICK_SURVEY_SURVEY_METHOD,
  QUICK_SURVEY_DETAIL_INFO,
  QUICK_SURVEY_RECRUITING_CONDITION,
  QUICK_SURVEY_INTERVIEW_MODE_TYPE,
  QUICK_SURVEY_CUSTOM_QUESTION,
  PERSONA_LIST_SAAS,
  KANO_MODEL_IDEA_GENERATION,
  KANO_MODEL_SELECTED_IDEA,
  KANO_MODEL_IDEA_GENERATION_NAME,
  KANO_MODEL_PRODUCT_ANALYSIS,
  KANO_MODEL_CLUSTERING,
  KANO_MODEL_EVALUATION
} from "../../../../AtomStates";
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
  InterviewXQuickSurveyRequest,
  createToolOnServer,
  updateToolOnServer,
  EducationToolsRequest,
  getFindToolListOnServerSaas,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";
import MoleculeDetailSetting from "../molecules/MoleculeDetailSetting";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import MoleculePersonaSelect from "../molecules/MolculePersonaSelect";
import MolculePresetPersona from "../molecules/MolculePresetPersona";
import ABGraph from "../../../../../components/Charts/ABGraph";
import BarChartLikertScale5 from "../../../../../components/Charts/BarChartLikertScale5";
import BarChartLikertScale2 from "../../../../../components/Charts/BarChartLikertScale2";
import BarChartLikertScale3 from "../../../../../components/Charts/BarChartLikertScale3";
import BarChartLikertScale4 from "../../../../../components/Charts/BarChartLikertScale4";
import BarChartLikertScale11 from "../../../../../components/Charts/BarChartLikertScale11";
import GraphChartScale2 from "../../../../../components/Charts/GraphChartScale2";
import GraphChartScale5 from "../../../../../components/Charts/GraphChartScale5";
import GraphChartScale11 from "../../../../../components/Charts/GraphChartScale11";
import GraphChartScale3 from "../../../../../components/Charts/GraphChartScale3";
import GraphChartScale4 from "../../../../../components/Charts/GraphChartScale4";
import OrganismToastPopupQuickSurveyComplete from "../organisms/OrganismToastPopupQuickSurveyComplete";
import MolculeQuickSurveyPopup from "../molecules/MolculeQuickSurveyPopup";
import MoleculeDeleteForm from "../../../../../pages/Education_Tool/public/MoleculeDeleteForm";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import MoleculeItemSelectCard from "../../../public/MoleculeItemSelectCard";
import KanoModelGraph from "../../../../../components/Charts/KanoModelGraph";


const PageKanoModel = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [kanoModelIdeaGeneration, setKanoModelIdeaGeneration] = useAtom(
    KANO_MODEL_IDEA_GENERATION
  );
  const [quickSurveyAnalysis, setQuickSurveyAnalysis] = useAtom(
    QUICK_SURVEY_ANALYSIS
  );
  const [quickSurveySelectedQuestion, setQuickSurveySelectedQuestion] = useAtom(
    QUICK_SURVEY_SELECTED_QUESTION
  );
  const [quickSurveyPersonaGroup, setquickSurveyPersonaGroup] = useAtom(
    QUICK_SURVEY_PERSONA_GROUP
  );
  const [quickSurveyInterview, setQuickSurveyInterview] = useAtom(
    QUICK_SURVEY_INTERVIEW
  );
  const [quickSurveySurveyMethod, setQuickSurveySurveyMethod] = useAtom(
    QUICK_SURVEY_SURVEY_METHOD
  );
  const [quickSurveyDetailInfo] = useAtom(QUICK_SURVEY_DETAIL_INFO);
  const [quickSurveyRecruitingCondition] = useAtom(
    QUICK_SURVEY_RECRUITING_CONDITION
  );
  const [quickSurveyInterviewModeType] = useAtom(
    QUICK_SURVEY_INTERVIEW_MODE_TYPE
  );
  const [quickSurveyReport, setQuickSurveyReport] =
    useAtom(QUICK_SURVEY_REPORT);
  const [quickSurveyStaticData, setQuickSurveyStaticData] = useAtom(
    QUICK_SURVEY_STATIC_DATA
  );
  const [quickSurveyProjectDescription, setQuickSurveyProjectDescription] =
    useAtom(QUICK_SURVEY_PROJECT_DESCRIPTION);
  const [quickSurveyStaticDataState, setQuickSurveyStaticDataState] = useState(
    {}
  );
  const [kanoModelIdeaGenerationName, setKanoModelIdeaGenerationName] = useAtom(
    KANO_MODEL_IDEA_GENERATION_NAME
  );
  const [selectedKanoModelIdea, setSelectedKanoModelIdea] = useAtom(
    KANO_MODEL_SELECTED_IDEA
  );
  const [kanoModelProductAnalysis, setKanoModelProductAnalysis] = useAtom(
    KANO_MODEL_PRODUCT_ANALYSIS
  );
  const [kanoModelClustering, setKanoModelClustering] = useAtom(
    KANO_MODEL_CLUSTERING
  );
  const [kanoModelEvaluation, setKanoModelEvaluation] = useAtom(
    KANO_MODEL_EVALUATION
  );
  // const [quickSurveyCustomQuestion, setQuickSurveyCustomQuestion] = useAtom(
  //   QUICK_SURVEY_CUSTOM_QUESTION
  // );
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeDesignTab, setActiveDesignTab] = useState("emotion");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isLoadingDetailSetting, setIsLoadingDetailSetting] = useState(false);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [recruitingCondition, setRecruitingCondition] = useState("");
  const [quickSurveyCustomQuestion, setQuickSurveyCustomQuestion] = useState(
    []
  );
  const [kanoModelIdeaList, setKanoModelIdeaList] = useState("");
  const [customPersonaForm, setCustomPersonaForm] = useState({
    gender: "",
    age: [],
    residence: [],
    income: [],
  });
  const [selectBoxStates, setSelectBoxStates] = useState({
    gender: false,
    age: false,
    residence: false,
    income: false,
  });
  const [selectedValues, setSelectedValues] = useState({
    gender: "",
    age: "",
    residence: "",
    income: "",
  });
  const [interviewModeType, setInterviewModeType] = useState("");
  const [isLoadingPreset, setIsLoadingPreset] = useState(false);
  const [selectedPresetCards, setSelectedPresetCards] = useState({});
  const [shouldRegenerate, setShouldRegenerate] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isCustomPopupOpen, setIsCustomPopupOpen] = useState(false);
  const [isCustomLoading, setIsCustomLoading] = useState(false);
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const [selectedIdea, setSelectedIdea] = useState([]);
  // 상태 추가
  const [showAnalysisList, setShowAnalysisList] = useState(false);

  const project = projectSaas;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 팝업이 열려있을 때 배경 스크롤 맊음
    if (showToast) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px"; // 스크롤바 자리만큼 패딩 추가
    }
    // 팝업이 닫혔을 때
    else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    // 컴포넌트 언마운트 시 원래대로 복구
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [showToast]);

  useEffect(() => {
    const interviewLoading = async () => {
      // 비즈니스 정보 설정 (Step 1)

      const projectAnalysis =
        (project?.projectAnalysis?.business_analysis
          ? project?.projectAnalysis?.business_analysis
          : "") +
        (project?.projectAnalysis?.business_analysis &&
        project?.projectAnalysis?.file_analysis
          ? "\n"
          : "") +
        (project?.projectAnalysis?.file_analysis
          ? project?.projectAnalysis?.file_analysis
          : "");

      if (project) {
        setBusinessDescription(projectAnalysis);
      }

      if (toolLoading) {

        // 비즈니스 정보 설정 (Step 1)
        if (quickSurveyProjectDescription) {
          setProjectDescription(quickSurveyProjectDescription);
        }

        if (
          quickSurveyAnalysis &&
          Object.keys(quickSurveyAnalysis || {}).length > 0
        ) {
          setQuickSurveyAnalysis(quickSurveyAnalysis);
        }
        if (
          quickSurveyAnalysis.custom_question &&
          quickSurveyAnalysis.custom_question.length > 0
        ) {
          setQuickSurveyCustomQuestion(quickSurveyAnalysis.custom_question);
        }
        if (quickSurveySurveyMethod && quickSurveySurveyMethod.length > 0) {
          setQuickSurveySurveyMethod(quickSurveySurveyMethod);
        }

        if (
          quickSurveySelectedQuestion &&
          quickSurveySelectedQuestion.length > 0
        ) {
          setSelectedQuestion(quickSurveySelectedQuestion);
        }

        // 활성 탭 설정 (기본값 1)
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
        // setActiveTab(Math.min((toolStep ?? 1) + 1, 3));
        // setToolSteps(toolStep ?? 1);

        // 완료된 단계 설정
        // const completedStepsArray = [];
        // for (let i = 1; i <= (toolStep ?? 1); i++) {
        //   completedStepsArray.push(i);
        // }
        // setCompletedSteps(completedStepsArray);

        // 페르소나 설정 (Step 2)

        // if (quickSurveySurveyMethod && quickSurveySurveyMethod.length > 0) {
        //   setQuickSurveySurveyMethod(quickSurveySurveyMethod);
        // }

        if (
          quickSurveyInterviewModeType &&
          quickSurveyInterviewModeType.length > 0
        ) {
          setInterviewModeType(quickSurveyInterviewModeType);
        }

        if (
          quickSurveyDetailInfo &&
          Object.keys(quickSurveyDetailInfo || {}).length > 0
        ) {
          // customPersonaForm 설정
          setCustomPersonaForm(quickSurveyDetailInfo);

          // selectedValues용으로 데이터 가공
          const processedValues = {
            gender:
              quickSurveyDetailInfo?.gender === "male"
                ? "남성"
                : quickSurveyDetailInfo?.gender === "female"
                ? "여성"
                : quickSurveyDetailInfo?.gender || "", // "상관없음"은 그대로

            age: Array.isArray(quickSurveyDetailInfo?.age)
              ? quickSurveyDetailInfo?.age[0] === "상관없음"
                ? "상관없음"
                : quickSurveyDetailInfo?.age.join(", ")
              : "",

            residence: Array.isArray(quickSurveyDetailInfo?.residence)
              ? quickSurveyDetailInfo?.residence[0] === "상관없음"
                ? "상관없음"
                : quickSurveyDetailInfo?.residence.join(", ")
              : "",

            income: Array.isArray(quickSurveyDetailInfo.income)
              ? quickSurveyDetailInfo.income[0] === "상관없음"
                ? "상관없음"
                : quickSurveyDetailInfo.income.join(", ")
              : "",
          };

          setSelectedValues(processedValues);
        }

        if (
          quickSurveyRecruitingCondition &&
          quickSurveyRecruitingCondition.length > 0
        ) {
          setRecruitingCondition(quickSurveyRecruitingCondition);
        }

        if (quickSurveyPersonaGroup && quickSurveyPersonaGroup.length > 0) {
          setquickSurveyPersonaGroup(quickSurveyPersonaGroup);
        }

        if (quickSurveyInterview && quickSurveyInterview.length > 0) {
          setQuickSurveyInterview(quickSurveyInterview);
        }

        if (quickSurveyReport && quickSurveyReport.length > 0) {
          setQuickSurveyReport(quickSurveyReport);
        }
        if (
          quickSurveyStaticData &&
          Object.keys(quickSurveyStaticData).length > 0
        ) {
          setQuickSurveyStaticData(quickSurveyStaticData);
          setQuickSurveyStaticDataState(quickSurveyStaticData);
        }
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

    // 고객핵심가치분석 리스트 가져오기


      const handleGetIdea = async () => {
        setIsLoading(true);
        try {
          let page = 1;
          const size = 10;
          let allItems = [];
  
          const response = await getFindToolListOnServerSaas(
            projectSaas?._id ?? "",
            "ix_idea_generation_education",
            isLoggedIn
          );
  
          const newItems = (response || []).filter(
            (item) =>
              item?.type === "ix_idea_generation_education" &&
              item?.completedStep === 4
          );
  
          allItems = [...allItems, ...newItems];
          console.log("allItems", allItems)
    
          setKanoModelIdeaGeneration(allItems);


        } catch (error) {
          setKanoModelIdeaGenerationName([]); // Set empty array on error
        } finally {
          setIsLoading(false);
        }
      };
  
      // getAllTargetDiscovery();



  const handleCheckboxChange = (ideaId) => {
    setSelectedIdea((prev) => {
      if (prev.includes(ideaId)) {
        // 이미 선택된 아이템이면 제거
        const newSelected = prev.filter(id => id !== ideaId);
        // 선택된 데이터들 업데이트
        const selectedDataList = newSelected.map(id => kanoModelIdeaGeneration[id]);
        setSelectedKanoModelIdea(selectedDataList);
        return newSelected;
      } else {
        // 새로운 아이템 추가
        const newSelected = [...prev, ideaId];
        // 선택된 데이터들 업데이트
        const selectedDataList = newSelected.map(id => kanoModelIdeaGeneration[id]);
        setSelectedKanoModelIdea(selectedDataList);
        return newSelected;
      }
    });
  };


  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };


  const handleFormChange = (field, value) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  

  const business = {
    business: businessDescription,
    target: project?.projectAnalysis?.target_customer || "",
    business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };

  



  useEffect(() => {
    if (shouldRegenerate && Object.keys(quickSurveyAnalysis).length === 0) {
      handleGetIdea();
      setShouldRegenerate(false); // 리셋
    }
  }, [quickSurveyAnalysis, shouldRegenerate]);

  const handleRegenerate = () => {
    setShouldRegenerate(true);
    setSelectedQuestion([]); // 재생성 flag 설정
    setQuickSurveyAnalysis({});
    setQuickSurveyCustomQuestion([]);
  };

  const handleSubmitIdeaList = async () => {
    handleNextStep(1);
    setShowAnalysisList(false);
    const responseToolId = await createToolOnServer(
      {
        type: "ix_kano_model_product_analysis_education",
        projectId: project._id,
        completedStep: 1,
        kanoModelSelectedIdea: selectedKanoModelIdea,
        },
        isLoggedIn
      );
    setToolSteps(1);
    setToolId(responseToolId);
  }



  const handleSubmitReport = async () => {
      await updateToolOnServer(
        toolId,
        {
        completedStep: 2,
        },
        isLoggedIn
      );
  
    handleNextStep(2);
    // setToolSteps(2);
    setIsLoadingReport(true);

    try {
      const Data = {
        type: "ix_kano_model_product_analysis_education",
        business: business,
      };


      let response = await EducationToolsRequest(Data, isLoggedIn);

      // let retryCount = 0;
      // const maxRetries = 10;

      // while (retryCount < maxRetries) {
      //   try {
      //     response = await EducationToolsRequest(Data, isLoggedIn);

      //     // 응답 형식 검증
      //     // if (
      //     //   response.response &&
      //     //   response.response.quick_survey_interview &&
      //     //   Array.isArray(response.response.quick_survey_interview) &&
      //     //   response.response.quick_survey_interview.length > 0
      //     // ) {
      //     //   break; // 올바른 응답 형식이면 루프 종료
      //     // }

      //     retryCount++;
      //   } catch (error) {
      //     retryCount++;
      //     if (retryCount >= maxRetries) throw error;
      //   }
      // }

      // if (retryCount >= maxRetries) {
      //   throw new Error(
      //     "올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다."
      //   );
      // }

      setKanoModelProductAnalysis(response.response.kano_model_product_analysis_education)
  
      const clusteringData = {
        type: "ix_kano_model_clustering_education",
        idea_list:  selectedKanoModelIdea
      };

      let responseReport = await EducationToolsRequest(clusteringData, isLoggedIn);


      let reportRetryCount = 0;
      const reportMaxRetries = 10;


      // while (reportRetryCount < reportMaxRetries) {
      //   try {
      //     responseReport = await EducationToolsRequest(
      //       reportData,
      //       isLoggedIn
      //     );

      //     // 응답 형식 검증
      //     if (
      //       responseReport.response &&
      //       responseReport.response.quick_survey_report &&
      //       responseReport.response.statistics_data
      //     ) {
      //       break; // 올바른 응답 형식이면 루프 종료
      //     }
      //     reportRetryCount++;
      //   } catch (error) {
      //     reportRetryCount++;
      //     if (reportRetryCount >= reportMaxRetries) throw error;
      //   }
      // }

      if (reportRetryCount >= reportMaxRetries) {
        throw new Error(
          "올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다."
        );
      }

      setKanoModelClustering(responseReport.response.kano_model_evaluation_education )

      const persona_group = personaListSaas
      .filter((persona) => persona?.favorite === true)
      .map((persona) => ({
        personaName: persona.personaName,
        personaCharacteristics: persona.personaCharacteristics,
        type: persona.type,
        age: persona.age,
        gender: persona.gender,
        job: persona.job,
        keywords: persona.keywords,
        userExperience: persona.userExperience,
        consumptionPattern: persona.consumptionPattern,
        interests: persona.interests,
        lifestyle: persona.lifestyle,
      
      }));

      const evaluteData = {
        type: "ix_kano_model_evaluation_education",
        business_analysis: response.response.kano_model_product_analysis_education,
        persona_group:persona_group,
        idea_list: responseReport.response.kano_model_evaluation_education,

      }

      let responseEvalute = await EducationToolsRequest(evaluteData, isLoggedIn);
      // let responseEvalute;
      // let evaluteRetryCount = 0;
      // const evaluteMaxRetries = 10;

      // while (evaluteRetryCount < evaluteMaxRetries) {
      //   try {   
      //     responseEvalute = await EducationToolsRequest(evaluteData, isLoggedIn);
      //   } catch (error) {
      //     evaluteRetryCount++;
      //     if (evaluteRetryCount >= evaluteMaxRetries) throw error;
      //   }
      // } 
      setKanoModelEvaluation(responseEvalute.response.kano_model_evaluation_education)
      

      await updateToolOnServer(
        toolId,
        {
          kanoModelProductAnalysis: response.response.kano_model_product_analysis_education,
          kanoModelEvaluation: responseEvalute.response.kano_model_evaluation_education,
          kanoModelClustering: responseReport.response.kano_model_evaluation_education,
          completedStep: 3,
        },
        isLoggedIn
      );

      setToolSteps(3);
      setCompletedSteps([...completedSteps, 3]);
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



  const handleEnterInterviewRoom = () => {
    setSelectedOption(null);
    setSelectedOptionIndex(null);
    setShowToast(true);
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      // console.log("currentUrl", currentUrl);
      if (currentUrl.toLowerCase().includes("quicksurvey")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        // console.log("세션 스토리지에서 마지막 URL 가져오기");

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
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                   아이디어 선별
                  </Body1>
                  {/* <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    Question Select
                  </Body1> */}
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
                    페르소나 선택 및 확인
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Participating Persona
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 3}
                onClick={() =>(( completedSteps.includes(2) || completedSteps.includes(3)) && setActiveTab(3))}
                disabled={
                  !completedSteps.includes(3) || isLoading || isLoadingReport
                }
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    최종 인사이트 분석
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    {/* Sentiment Analysis */}
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Idea Mining</H3>
                    <Body3 color="gray800">
                    발산된 아이디어를 정리하고, 최종 20개의 아이디어를 추려보세요
                    </Body3>
                  </div>

                  <div className="content">
                      
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
                      <AtomPersonaLoader message="로딩 중..." />
                    </div>
                  ) : (

                    <>
                      {!showAnalysisList ? (
                        // 아이디어 선택 화면
                        <>
                          {kanoModelIdeaGeneration.length > 0 ? (
                            <>
                              <div className="title" style={{textAlign: "left", marginBottom: "-20px"}}>
                                <Body1 color="gray700">Kano Model 평가에 포함할 아이디어를 선택해 주세요. (복수 선택)</Body1>
                              </div>
                              {kanoModelIdeaGeneration.map((idea, index) => (
                                <MoleculeItemSelectCard
                                  FlexStart
                                  key={index}
                                  id={index}
                                  title={`${idea.updateDate.split(":")[0]}:${idea.updateDate.split(":")[1]} - 아이디어 발상 - ${idea.title || "아이디어"}`}
                                  isSelected={selectedIdea.includes(index)}
                                  onSelect={() => handleCheckboxChange(index)}
                                />
                              ))}
                              <div>
                               
                              </div>
                            </>
                          ) : (
                                    // 데이터가 없을 때의 UI
                              <BoxWrap
                                NoData
                                style={{ height: "300px" }}
                                      onClick={handleGetIdea}
                              >
                                <img src={images.PeopleFillPrimary2} alt="" />
                                <Body2 color="gray700" align="center !important">
                                아이디어 발상 단계를 통해 도출된 아이디어를 통합하세요
                                </Body2>
                                <Button
                                  Medium
                                  Outline
                                  Fill
                                  onClick={handleGetIdea}
                        >
                          <Caption1 color="gray700">
                            아이디어 가져오기
                          </Caption1>
                        </Button>
                      </BoxWrap>
                    )}
                        </>
                      ) : (
                        // 분석 아이디어 리스트 화면
                        <>
                          <div className="title" style={{textAlign: "left", marginBottom: "-20px"}}>
                            <Body1 color="gray700">아이디어 도출 과정을 통해 선정된 아이디어 리스트 </Body1>
                    </div>
                      <MoleculeDeleteForm
                            items={kanoModelIdeaList || []}
                            setItems={setKanoModelIdeaList}
                        disabled={toolSteps >= 1}
                        maxItems={10}
                        placeholder="핵심 가치를 작성해주세요 (예: 안전한 송금 등)"
                      />
                        </>
                        
                      )}
                    </>
                  )}
    
                              </div>
                    <>
                      {/* 버튼들을 content div 바깥으로 이동 */}
                        {kanoModelIdeaGeneration.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            Other   
                            Primary
                            Fill
                            Round
                            onClick={() => {
                                handleSubmitIdeaList();
                           
                            }}
                              disabled={toolSteps >= 1 || selectedIdea.length === 0}
                          >
                            아이디어 방향성으로 전환
                          </Button>
                        </div>
                      )}
                    </>
                
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
                    <AtomPersonaLoader message="로딩 중..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Participating Persona</H3>
                      <Body3 color="gray800">
                        Quick Survey에 참여할 페르소나에 대해서 알려주세요. 바로
                        리크루팅해드릴게요 !
                      </Body3>
                    </div>

                    <div className="content">

                    <ListBoxGroup>
                        <li>
                          <Body2 color="gray500" style={{whiteSpace: "nowrap", marginBottom: "8px", marginRight: "50px"}}>평가할 아이디어 리스트</Body2>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            {selectedKanoModelIdea.map((idea, index) => (
                              <span key={index} style={{ color: "#8C8C8C", marginBottom: "4px" }}>
                                {`${idea.updateDate.split(":")[0]}:${idea.updateDate.split(":")[1]} - 아이디어 발상 - ${idea.title || "아이디어"}`}
                              </span>
                            ))}
                          </div>
                        </li>
                      </ListBoxGroup>

                      <div className="title">
                            <Body1 color="gray800" style={{textAlign: "left", marginBottom: "-20px" }}>
                            Kano Model 평가 참여 페르소나 (AI 페르소나 Favorite에서 설정 가능) 
                            </Body1>
                            </div>
                      
                      {personaListSaas.length > 0 ? (
                      <MoleculePersonaSelectCard
                        filteredPersonaList={personaListSaas}
                        hideSelectButton={true}
                      
                      />
                    ) : (
                      <BoxWrap
                        NoData
                        style={{ height: "300px" }}
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

                    {isLoadingDetailSetting || isLoadingPreset ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          minHeight: "200px",
                          alignItems: "center",
                        }}
                      >
                        {/* <AtomPersonaLoader message="로딩 중..." /> */}
                      </div>
                    ) : (
                      <Button
                        Other
                        Primary
                        Fill
                        Round
                        onClick={handleSubmitReport}
                         
                        disabled={
                          toolSteps >= 3 
                        }
                      >
                       Kano Model 평가 받기
                      </Button>
                    )}
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 3 &&
              (completedSteps.includes(2) || completedSteps.includes(3)) && (
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
                        <H3 color="gray800">KANO Model 결과</H3>
                        <Body3 color="gray800">
                        아이디어별 만족 유형을 분석한 결과입니다. 페르소나가 느낀 매력, 기본, 무관심 요소를 확인해보세요
                        </Body3>
                      </BgBoxItem>

                      <InsightAnalysis>
                      <KanoModelGraph  />
                      
                      </InsightAnalysis>
                    </>
                  )}
                </TabContent5>
              )}

            {showToast && (
              <OrganismToastPopupQuickSurveyComplete
                isActive={showToast}
                onClose={() => setShowToast(false)}
                isComplete={true}
                selectedOption={selectedOption}
                selectedOptionIndex={selectedOptionIndex}
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

export default PageKanoModel;

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

const TagButton = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  background-color: #f7f8fa;
  border: none;
  margin-right: 10px;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${(props) => (props.isSelected ? "#226FFF" : "#EAECF0")};
  }
`;

const InterviewModeSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: center;
  margin-bottom: 48px;

  .button-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
  }
`;

const InterviewModeCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.isActive ? palette.primary : palette.outlineGray)};
  cursor: pointer;
  background-color: ${(props) =>
    props.isActive ? "rgba(34, 111, 255, 0.05)" : "white"};
  position: relative;
  width: calc(50% - 10px);

  &:hover {
    border-color: ${palette.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  height: 100%;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px;
  flex: 1;
  padding: 0;

  img {
    width: 48px;
    height: 48px;
    margin-bottom: 4px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CustomizationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  cursor: pointer;

  > div {
    width: 100%;
  }

  button span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid ${palette.gray700};

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 1px;
      background: ${palette.gray700};
      content: "";
    }

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
`;

export const CheckCircle = styled.input`
  appearance: none;
  display: block !important;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;

  background-image: ${(props) =>
    props.checked
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
  transition: background-image 0.3s ease-in-out;

  + label {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    + label {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
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

const InsightContent = styled(Body3)`
  // border-bottom: 1px solid #E0E4E8;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;

  // &:last-child {
  //   border-bottom: none;
  // }
`;

const InsightLabel = styled(Body3)`
  font-size: 16px;
  font-weight: 700; /* 400에서 700으로 변경하여 bold 적용 */
  color: ${palette.gray800}; /* 직접 색상 지정 */
`;

const TooltipButton = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding: 12px;
  border-radius: 15px;
  background: ${palette.chatGray};
  z-index: 1;
  width: 100%;
  text-align: left;

  &:before {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 0.63rem;
    color: ${palette.gray500};
    border: 1px solid ${palette.gray500};
    content: "!";
    margin-top: 3.5px; // 아래로 내리기 위해 추가
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


const ValueMap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .mermaid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    width: 100%;
    height: auto;
  }

  .mermaid-legend {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    max-width: 170px;
    width: 100%;

    ul {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
      }
    }

    span {
      width: 16px;
      height: 16px;
      border-radius: 2px;

      &.must-fix {
        background-color: #d3e2ff;
      }

      &.niche-pain {
        background-color: #e0e4eb;
      }

      &.key-strengths {
        background-color: #e9f1ff;
      }

      &.low-impact {
        background-color: ${palette.gray100};
      }
    }
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    span {
      width: 16px;
      height: 16px;
      border-radius: 50%;

      &.must-fix {
        background-color: #d3e2ff;
      }

      &.niche-pain {
        background-color: #e0e4eb;
      }

      &.key-strengths {
        background-color: #e9f1ff;
      }

      &.low-impact {
        background-color: ${palette.gray100};
      }
    }
  }
`;

export const DiagramContainer = styled.div`
  width: 70%;
  min-width: 600px;
  min-height: 600px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;