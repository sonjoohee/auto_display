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
import Markdown from "markdown-to-jsx";
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
  IDEA_EVALUATE_SELECTED_LIST,
  IDEA_EVALUATE_LIST,
  IDEA_EVALUATE_COMPARISON_EDUCATION,
  IDEA_EVALUATE_SELECTED_KANO_MODEL,
  IDEA_EVALUATE_SELECTED_KANO_MODEL_INDEX,
  IDEA_EVALUATE_SELECTED_LIST_INDEX,
} from "../../../../AtomStates";
import {
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../../../assets/styles/InputStyle";
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
  getFindToolListOnServerSaas,
  EducationToolsRequest,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import MoleculeItemSelectCard from "../../../public/MoleculeItemSelectCard";
import ParetoCurveGraph from "../../../../../components/Charts/ParetoCurveGraph";
import BusinessModelPopup from "../../../../../components/Charts/BusinessModelPopup";
import BusinessModelGraph from "../../../../../components/Charts/BusinessModelGraph";
// import MoleculeBusinessModelGraph from "../molecules/MoleculeBusinessModelGraph";


const PagePRFAQ = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const[personaListSaas, setPersonaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [quickSurveyAnalysis, setQuickSurveyAnalysis] = useAtom(
    QUICK_SURVEY_ANALYSIS
  );
  const [ideaEvaluateSelectedListIndex, setIdeaEvaluateSelectedListIndex] = useAtom(IDEA_EVALUATE_SELECTED_LIST_INDEX);
  const [ideaEvaluateComparisonEducation, setIdeaEvaluateComparisonEducation] = useAtom(IDEA_EVALUATE_COMPARISON_EDUCATION)
  const [quickSurveySelectedQuestion, setQuickSurveySelectedQuestion] = useAtom(
    QUICK_SURVEY_SELECTED_QUESTION
  );
  const [quickSurveyCustomGuide, setQuickSurveyCustomGuide] = useAtom(
    QUICK_SURVEY_CUSTOM_GUIDE
  );
  const [quickSurveyPresetData, setQuickSurveyPresetData] = useAtom(
    QUICK_SURVEY_PRESET_DATA
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
  const [ideaEvaluateSelectedKanoModel, setIdeaEvaluateSelectedKanoModel] = useAtom(IDEA_EVALUATE_SELECTED_KANO_MODEL);
  const [ideaEvaluateSelectedList, setIdeaEvaluateSelectedList] = useAtom(IDEA_EVALUATE_SELECTED_LIST);
  const [ideaEvaluateList, setIdeaEvaluateList] = useAtom(IDEA_EVALUATE_LIST);
  const [quickSurveyProjectDescription, setQuickSurveyProjectDescription] =
    useAtom(QUICK_SURVEY_PROJECT_DESCRIPTION);
  const [quickSurveyStaticDataState, setQuickSurveyStaticDataState] = useState(
    {}
  );
  // const [quickSurveyCustomQuestion, setQuickSurveyCustomQuestion] = useAtom(
  //   QUICK_SURVEY_CUSTOM_QUESTION
  // );
  const [ideaEvaluateSelectedKanoModelIndex, setIdeaEvaluateSelectedKanoModelIndex] = useAtom(IDEA_EVALUATE_SELECTED_KANO_MODEL_INDEX);
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
  const [
    customerJourneyMapSelectedPersona,
    setCustomerJourneyMapSelectedPersona,
  ] = useState([]);
  const [customPersonaForm, setCustomPersonaForm] = useState({
    gender: "",
    age: [],
    residence: [],
    income: [],
  });
  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
    businessModelCanvas: false,
  });
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
    businessModelCanvas: "",
  });
  const [dropUpStates, setDropUpStates] = useState({
    customerList: false,
    businessModelCanvas: false,
  });
  const [, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
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
  const [customerJourneyList, setCustomerJourneyList] = useState([]);
  const [selectedKanoModelData, setSelectedKanoModelData] = useState([]);
  const [showKanoModelList, setshowKanoModelList] = useState(false);
  const [ideaEvaluateSelect, setIdeaEvaluateSelect] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [conceptDefinitionList, setConceptDefinitionList] = useState([]);

  const customerListRef = useRef(null);
  const businessModelCanvasRef = useRef(null);
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  const prepareMarkdown = (text) => {
    if (!text) return "";
    // 연속된 줄바꿈('\n\n')을 <br/><br/>로 변환
    return text.replace(/\n\n/g, "\n&nbsp;\n").replace(/\n/g, "  \n");
  };

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




  console.log("ideaEvaluateSelectedList", ideaEvaluateSelectedList);
  console.log("ideaEvaluateSelectedListIndex", ideaEvaluateSelectedListIndex);


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
        if (Object.keys(ideaEvaluateSelectedKanoModel).length > 0) {
          setSelectedKanoModelData(ideaEvaluateSelectedKanoModel);
          setshowKanoModelList(true);
        
        }
        if (Object.keys(ideaEvaluateSelectedKanoModelIndex).length > 0) {
          setSelectedPurposes(ideaEvaluateSelectedKanoModelIndex);
          
        }
        if (ideaEvaluateList && ideaEvaluateList.length > 0) {
          setIdeaEvaluateList(ideaEvaluateList);
        }
        if (ideaEvaluateSelectedList && ideaEvaluateSelectedList.length > 0) {
          setIdeaEvaluateSelectedList(ideaEvaluateSelectedList);
        }
        if (Object.keys(ideaEvaluateSelectedListIndex).length > 0) {
          setIdeaEvaluateSelect(ideaEvaluateSelectedListIndex);
        }

        if (ideaEvaluateComparisonEducation && ideaEvaluateComparisonEducation.length > 0) {
          setIdeaEvaluateComparisonEducation(ideaEvaluateComparisonEducation);
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
  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];

        const response = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_concept_definition_education",
          isLoggedIn
        );


        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_concept_definition_education" &&
            item?.completedStep === 3
        );

        allItems = [...allItems, ...newItems];
  
        setConceptDefinitionList(allItems);
      } catch (error) {
        setConceptDefinitionList([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn, projectSaas]);

  // const handleCheckboxChange = (personaId) => {
  //   if (toolSteps >= 2) return;
  //   setIdeaEvaluateSelectedList((prev) => {
  //     // 하나만 선택되도록 변경, 다른 항목 선택 시 해당 항목으로 변경
  //     if (prev.includes(personaId)) {
  //       return []; // 이미 선택된 항목을 다시 클릭하면 선택 해제
  //     } else {
  //       return [personaId]; // 새 항목 선택
  //     }
  //   });
  // };


  // const handleCheckboxChange = (ideaId) => {
  //   setIdeaEvaluateSelect((prev) => {
  //     if (prev.includes(ideaId)) {
  //       // 이미 선택된 아이템이면 제거
  //       const newSelected = prev.filter(id => id !== ideaId);
  //       // 선택된 데이터들 업데이트
  //       const selectedDataList = newSelected.map(id => ideaEvaluateList[id]);
  //       setIdeaEvaluateSelectedList(selectedDataList);
  //       return newSelected;
  //     } else {
  //       // 새로운 아이템 추가
  //       const newSelected = [...prev, ideaId];
  //       // 선택된 데이터들 업데이트
  //       const selectedDataList = newSelected.map(id => ideaEvaluateList[id]);
  //       setIdeaEvaluateSelectedList(selectedDataList);
  //       return newSelected;
  //     }
  //   });
  // };


  const handleCheckboxChange = (ideaId) => {
    setIdeaEvaluateSelect((prev) => {
      if (prev.includes(ideaId)) {
        // 이미 선택된 아이템이면 제거
        const newSelected = prev.filter(id => id !== ideaId);
        return newSelected;
      } else {
        // 새로운 아이템 추가
        const newSelected = [...prev, ideaId];
        return newSelected;
      }
    });
  
    // 선택된 아이템들의 실제 데이터를 가져옴
    setIdeaEvaluateSelectedList((prev) => {
      const selectedItems = ideaEvaluateSelect.map(ideaId => {
        const [category, index] = ideaId.split('-');
        const categoryKey = category.replace('-', '_');
        return selectedKanoModelData.kanoModelClustering[categoryKey][parseInt(index)];
      });
      return selectedItems;
    });
  };



// 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  const toggleSelectBox = (type) => {
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };


  const handlePurposeSelect = (purpose, selectBoxId,item) => {
    setSelectedPurposes((prev) => ({
      ...(prev || {}),
      [selectBoxId]: purpose || "",
    }));
    handleContactInputChange("purpose", purpose || "");
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: false,
    }));

    if (selectBoxId === "customerList") {
      setBusinessDescription(purpose || "");
    }
    setSelectedKanoModelData(item);
  };



  const business = {
    business_analysis: businessDescription,
    target: project?.projectAnalysis?.target_customer || "",
    business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };

  const handleCuratedIdea = async () => {
    
    
    if(!ideaEvaluateSelectedList.length > 0){
      setshowKanoModelList(true)
    }
      else{
        handleNextStep(1);

        const responseToolId = await createToolOnServer(
          {
            projectId: project._id,
            type: "ix_idea_evaluation_education",
          },
          isLoggedIn
        );
        setToolId(responseToolId);

      await updateToolOnServer(
        responseToolId,
        {
          selectedKanoModelIdea: selectedKanoModelData,
          selectedKanoModelIdeaIndex: selectedPurposes,
          ideaEvaluateSelectedList: ideaEvaluateSelectedList,
          ideaEvaluateSelectedListIndex: ideaEvaluateSelect,
          completedStep: 2,
        },
        isLoggedIn
      );

      setToolSteps(1);
    }
  };




 

  const handleSubmitReport = async () => {
    handleNextStep(1);
    // setToolSteps(2);
    // setIsLoadingReport(true);

    try {

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

      const Data = {
        type: "ix_idea_evaluation_comparison_education",
        business: business,
        idea_list: ideaEvaluateSelectedList, 
        persona: persona_group,
      };

      let response = await EducationToolsRequest (Data, isLoggedIn);

       let retryCount = 0;
      const maxRetries = 10;
        while (retryCount < maxRetries &&
          (!response ||
           !response?.response ||
           !response?.response?.idea_evaluation_comparison_education ||
           !Array.isArray(response?.response?.idea_evaluation_comparison_education)
          )
         ) {
           response = await EducationToolsRequest(Data, isLoggedIn);
           maxRetries++;
          
         }
           if (retryCount >= maxRetries) {
           setShowPopupError(true);
           return;
         }

      setIdeaEvaluateComparisonEducation(response.response.idea_evaluation_comparison_education)
      

      await updateToolOnServer(
        toolId,
        {
          ideaEvaluateComparisonEducation: response.response.idea_evaluation_comparison_education,
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

      try {
        // const apiRequestData = {
        //   type: "ix_concept_definition_final_report_education",
        //   concept_definition_report_education: conceptDefinitionFirstReport,
        // };

        // let response = await EducationToolsRequest(apiRequestData, isLoggedIn);
        // console.log("response", response);
        // setConceptDefinitionFinalReport(response.response);

        // const maxAttempts = 10;
        // let attempts = 0;

        // while (attempts < maxAttempts && (!response || !response?.response)) {
        //   response = await InterviewXPsstAnalysisRequest(
        //     apiRequestData,
        //     isLoggedIn
        //   );
        //   attempts++;
        // }
        // if (attempts >= maxAttempts) {
        //   setShowPopupError(true);
        //   return;
        // }

        setIsLoadingReport(false);

        // await updateToolOnServer(
        //   toolId,
        //   {
        //     completedStep: 3,
        //     psstReport: response.response,
        //   },
        //   isLoggedIn
        // );
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


  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      // console.log("currentUrl", currentUrl);
      if (currentUrl.toLowerCase().includes("prfaq")) {
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

  // handleInputChange 함수 수정
  const handleInputChange = (field, value) => {
    // formData 대신 개별 상태 업데이트
    if (field === "projectDescription") {
      setProjectDescription(value);
    }
  };


  const handleAnswerChange = (id, option) => {
    setQuickSurveyAnalysis((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        answer: option,
      },
    }));
  };


  useEffect(() => {
    if (ideaEvaluateComparisonEducation && ideaEvaluateComparisonEducation.length > 0) {
      // 각 아이디어별 선택된 횟수를 카운트
      const ideaCount = {};
      
      ideaEvaluateComparisonEducation.forEach(comparison => {
        const selectedIdea = comparison.selected_idea;
        ideaCount[selectedIdea] = (ideaCount[selectedIdea] || 0) + 1;
      });
  
      // 파레토 그래프용 데이터 형식으로 변환
      const paretoData = Object.entries(ideaCount)
        .map(([name, value]) => ({
          name,
          value
        }))
        .sort((a, b) => b.value - a.value); // 값이 큰 순서대로 정렬
  
      // 파레토 그래프 데이터 설정
      setGraphData(paretoData);
    }
  }, [ideaEvaluateComparisonEducation]);
  

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
                  기초 데이터 가져오기
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
                  핵심 내용 확인
                  </Body1>
                  {/* <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Participating Persona
                  </Body1> */}
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
                    최종 PRFAQ
                  </Body1>
                </div>
              </TabButtonType5>
             
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Curated Ideas</H3>
                    <Body3 color="gray800">
                    선별된 아이디어를 사용자 의견으로 다시 평가하여 우선순위를 도출하세요
                    </Body3>
                  </div>

                  <div className="content">
                    <TabContent5Item required>
                     

                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray700">컨셉 정의서 </Body1>
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
                                toolSteps >= 1 
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
                                "컨셉 정의서를 불러 올 수 있습니다"}
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
                              {conceptDefinitionList.length === 0 ? (
                                <SelectBoxItem 
                                disabled={toolSteps >= 1 }
                                >
                                  <Body2 color="gray300" align="left">
                                    직접 문제점을 작성합니다.
                                  </Body2>
                                </SelectBoxItem>
                              ) : (
                                conceptDefinitionList.map((item, index) => (
                                  <SelectBoxItem
                                    // disabled={
                                    //   toolSteps >= 1 
                                    // }
                                    key={index}
                                    onClick={() => {
                                      handlePurposeSelect(
                                        `${item.updateDate.split(":")[0]}:${
                                          item.updateDate.split(":")[1]
                                        } - 컨셉 정의서
                                    `,
                                        "customerList",
                                        item
                                      );
                                    }}
                                  >
                                    <Body2 color="gray700" align="left">
                                      {item.updateDate.split(":")[0]}:
                                      {item.updateDate.split(":")[1]} 컨셉 정의서
                                     
                                    </Body2>
                                  </SelectBoxItem>
                                ))
                              )}
                            </SelectBoxList>
                          )}
                        </SelectBox>
                        <div className="title">
                          <Body1 color="gray700">비즈니스 모델 캔버스  </Body1>
                        </div>

                        <SelectBox ref={customerListRef}>
                          <SelectBoxTitle
                            onClick={() =>
                              handleSelectBoxClick(
                                "businessModelCanvas",
                                businessModelCanvasRef
                              )
                            }
                            style={{
                              cursor:
                                toolSteps >= 1 
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                          >
                            <Body2
                              color={
                                selectedPurposes.businessModelCanvas
                                  ? "gray800"
                                  : "gray300"
                              }
                            >
                              {selectedPurposes.businessModelCanvas ||
                                "비즈니스 모델 캔버스를 불러 올 수 있습니다"}
                            </Body2>
                            <images.ChevronDown
                              width="24px"
                              height="24px"
                              color={palette.gray500}
                              style={{
                                transform: selectBoxStates.businessModelCanvas
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </SelectBoxTitle>

                          {selectBoxStates.businessModelCanvas && (
                            <SelectBoxList dropUp={dropUpStates.businessModelCanvas}>
                              {conceptDefinitionList.length === 0 ? (
                                <SelectBoxItem 
                                disabled={toolSteps >= 1 }
                                >
                                  <Body2 color="gray300" align="left">
                                    직접 문제점을 작성합니다.
                                  </Body2>
                                </SelectBoxItem>
                              ) : (
                                conceptDefinitionList.map((item, index) => (
                                  <SelectBoxItem
                                    // disabled={
                                    //   toolSteps >= 1 
                                    // }
                                    key={index}
                                    onClick={() => {
                                      handlePurposeSelect(
                                        `${item.updateDate.split(":")[0]}:${
                                          item.updateDate.split(":")[1]
                                        } - 비즈니스 모델 캔버스 
                                    `,
                                        "businessModelCanvas",
                                        item
                                      );
                                    }}
                                  >
                                    <Body2 color="gray700" align="left">
                                      {item.updateDate.split(":")[0]}:
                                      {item.updateDate.split(":")[1]} 비즈니스 모델 캔버스 
                                     
                                    </Body2>
                                  </SelectBoxItem>
                                ))
                              )}
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </TabContent5Item>


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
                  ) : !showKanoModelList ? (
                    <BoxWrap
                      NoData
                      style={{ height: "300px" }}
                    >
                      <img src={images.PeopleFillPrimary2} alt="" />
                      <Body2 color="gray700" align="center !important">
                      Kano Model 결과가 보여집니다.
                      </Body2>
                     
                    </BoxWrap>
                  ) : (
                    <InsightAnalysis>
                    <div
                      className="markdown-body"
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <Markdown>
                        {prepareMarkdown(
                        ideaEvaluateComparisonEducation ?? ""
                        )}
                      </Markdown>
                    </div>
                  </InsightAnalysis>
               
                  )}
                    </TabContent5Item>
                  </div>   
                        <Button
                          Other
                          Primary
                          Fill
                          Round
                          onClick={handleSubmitReport}
                          // disabled={
                          
                          // }
                        >
                          아이디어 방향성으로 전환
                        </Button>
             
                  
                </>
              </TabContent5>
            )}

           

              {activeTab === 2 && completedSteps.includes(1) && (
                    <TabContent5>
                      <>
                        <div className="title">
                          <H3 color="gray800">Core Value Analysis</H3>
                          <Body3 color="gray800">
                            Kano Model 결과를 기반으로 비즈니스의 주요 가치를
                            도출합니다
                          </Body3>
                        </div>

                        <div className="content">
                        <IdeaContainer>
                      
                            <IdeaBox>
                                  <IdeaTitle>기타 의견</IdeaTitle>
                            
                                  <IdeaContent>
                                    
                                        <IdeaText>
                                          •
                                        </IdeaText>
                                
                                  </IdeaContent>
                                </IdeaBox>
                          
                              </IdeaContainer>
                      

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
                              <AtomPersonaLoader message={`분석 중이예요 ...`} />
                            </div>
                          ) : (
                            <InsightAnalysis>
                              <div
                                className="markdown-body"
                                style={{
                                  textAlign: "left",
                                }}
                              >
                                {/* <Markdown>
                                  {prepareMarkdown(
                                    conceptDefinitionFirstReport ?? ""
                                  )}
                                </Markdown> */}
                              </div>
                            </InsightAnalysis>
                          )}
                        </div>
                       
                          <Button
                            Other
                            Primary
                            Fill
                            Round
                            onClick={handleReportRequest}
                            disabled={
                              toolSteps > 2 
                            
                            }
                          >
                            페르소나 & 핵심가치 확인
                          </Button>
                   
                      </>
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
                                        <H3 color="gray800">컨셉 정의서</H3>
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
                                          {/* <Markdown>{prepareMarkdown(psstReport ?? "")}</Markdown> */}
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

export default PagePRFAQ;

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

