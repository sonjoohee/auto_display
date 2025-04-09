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
import images from "../../../../../assets/styles/Images";
import {
  CustomTextarea,
  SelectBox,
  SelectBoxTitle,
  SelectBoxList,
  SelectBoxItem,
  FormBox,
  CustomInput,
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
} from "../../../../AtomStates";
import {
  H4,
  H3,
  Sub3,
  Body1,
  Body2,
  Body3,
} from "../../../../../assets/styles/Typography";
import {
  InterviewXQuickSurveyRequest,
  createToolOnServer,
  updateToolOnServer,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import AnalysisItem from "../molecules/MoleculeAnalysisItem";
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";
import MoleculeDetailSetting from "../molecules/MoleculeDetailSetting";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import MoleculePersonaSelect from "../molecules/MolculePersonaSelect";
import MolculePresetPersona from "../molecules/MolculePresetPersona";
import ABGraph from "../../../../../components/Charts/ABGraph";
import BarChartLikertScale5 from "../../../../../components/Charts/BarChartLikertScale5";
import BarChartLikertScale11 from "../../../../../components/Charts/BarChartLikertScale11";
import GraphChartScale2 from "../../../../../components/Charts/GraphChartScale2";
import GraphChartScale5 from "../../../../../components/Charts/GraphChartScale5";
import GraphChartScale11 from "../../../../../components/Charts/GraphChartScale11";
import OrganismToastPopupQuickSurveyComplete from "../organisms/OrganismToastPopupQuickSurveyComplete";
const PageQuickSurvey = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [quickSurveyAnalysis, setQuickSurveyAnalysis] = useAtom(
    QUICK_SURVEY_ANALYSIS
  );
  const [quickSurveySelectedQuestion, ] = useAtom(
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
  const [quickSurveyDetailInfo, ] = useAtom(
    QUICK_SURVEY_DETAIL_INFO
  );
  const [quickSurveyRecruitingCondition, ] = useAtom(
    QUICK_SURVEY_RECRUITING_CONDITION
  );
  const [quickSurveyInterviewModeType, ] = useAtom(
    QUICK_SURVEY_INTERVIEW_MODE_TYPE
  );
  const [quickSurveyReport, setQuickSurveyReport] =
    useAtom(QUICK_SURVEY_REPORT);
  const [quickSurveyStaticData, setQuickSurveyStaticData] = useAtom(
    QUICK_SURVEY_STATIC_DATA
  );
  const [quickSurveyProjectDescription, setQuickSurveyProjectDescription] =
    useAtom(QUICK_SURVEY_PROJECT_DESCRIPTION);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [activeDesignTab, setActiveDesignTab] = useState("emotion");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isLoadingDetailSetting, setIsLoadingDetailSetting] = useState(false);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [recruitingCondition, setRecruitingCondition] = useState("");

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
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

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
      if (businessDescription.length === 0) {
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

      if (project) {
        setBusinessDescription(projectAnalysis);
      }
    }
      if (toolLoading) {
        // 비즈니스 정보 설정 (Step 1)
        if (quickSurveyProjectDescription) {
          setProjectDescription(quickSurveyProjectDescription);
        }

        if (quickSurveyAnalysis && quickSurveyAnalysis.length > 0) {
          setQuickSurveyAnalysis(quickSurveyAnalysis);
        }
        if (quickSurveySurveyMethod && quickSurveySurveyMethod.length > 0) {
          setQuickSurveySurveyMethod(quickSurveySurveyMethod);
        }

        if (quickSurveySelectedQuestion && quickSurveySelectedQuestion.length > 0){
          setSelectedQuestion(quickSurveySelectedQuestion);
        }
       

        // 활성 탭 설정 (기본값 1)
        if (toolStep === undefined || toolStep === 1) {
          setActiveTab(1);
          setToolSteps(0);
        } else {
          setActiveTab(Math.min(toolStep, 3));
          setToolSteps(toolStep);
        }
        // setActiveTab(Math.min((toolStep ?? 1) + 1, 3));
        // setToolSteps(toolStep ?? 1);

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);

        // 페르소나 설정 (Step 2)

        if (quickSurveySurveyMethod && quickSurveySurveyMethod.length > 0){
          setQuickSurveySurveyMethod(quickSurveySurveyMethod); 

        }
        if (quickSurveyInterviewModeType && quickSurveyInterviewModeType.length > 0){
          setInterviewModeType(quickSurveyInterviewModeType);
        }
       
        if (quickSurveyDetailInfo && Object.keys(quickSurveyDetailInfo).length > 0) {
          // customPersonaForm 설정
          setCustomPersonaForm(quickSurveyDetailInfo);
          
          // selectedValues용으로 데이터 가공
          const processedValues = {
            gender: quickSurveyDetailInfo.gender === "male" ? "남성" : 
                    quickSurveyDetailInfo.gender === "female" ? "여성" : 
                    quickSurveyDetailInfo.gender,  // "상관없음"은 그대로
            
            age: Array.isArray(quickSurveyDetailInfo.age) ? 
                 quickSurveyDetailInfo.age[0] === "상관없음" ? "상관없음" :
                 quickSurveyDetailInfo.age.join(", ") : "",
            
            residence: Array.isArray(quickSurveyDetailInfo.residence) ?
                      quickSurveyDetailInfo.residence[0] === "상관없음" ? "상관없음" :
                      quickSurveyDetailInfo.residence.join(", ") : "",
            
            income: Array.isArray(quickSurveyDetailInfo.income) ?
                    quickSurveyDetailInfo.income[0] === "상관없음" ? "상관없음" :
                    quickSurveyDetailInfo.income.join(", ") : ""
          };
        
          setSelectedValues(processedValues);
        }

        if (quickSurveyRecruitingCondition && quickSurveyRecruitingCondition.length > 0){
          setRecruitingCondition(quickSurveyRecruitingCondition);
        }

        if (quickSurveyPersonaGroup && quickSurveyPersonaGroup.length > 0){
          setquickSurveyPersonaGroup(quickSurveyPersonaGroup);
        }

        if (quickSurveyInterview && quickSurveyInterview.length > 0){
          setQuickSurveyInterview(quickSurveyInterview);
        }
          
        if (quickSurveyReport && quickSurveyReport.length > 0){
          setQuickSurveyReport(quickSurveyReport);
        }
        if (quickSurveyStaticData && quickSurveyStaticData.length > 0){
          setQuickSurveyStaticData(quickSurveyStaticData);
        }

      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  const handleCheckboxChange = (personaId) => {
    if (toolSteps >= 2) return;
    setSelectedQuestion((prev) => {
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

  // // 필수 필드가 모두 입력되었는지 확인하는 함수
  // const isRequiredFieldsFilled = () => {
  //   return businessDescription.trim().length > 0 && uploadedFiles.length > 0;
  // };

  // // 비즈니스 설명 입력 핸들러
  // const handleBusinessDescriptionChange = (e) => {
  //   const input = e.target.value;
  //   if (input.length <= 500) {
  //     setBusinessDescription(input);
  //   }
  // };

  const toggleSelectBox = (type) => {
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handlePurposeSelect = (value, type) => {
    setSelectedValues((prev) => ({
      ...prev,
      [type]: value,
    }));
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: false,
    }));

    // customPersonaForm도 함께 업데이트
    if (type === "gender") {
      handleFormChange(
        "gender",
        value === "남성" ? "male" : value === "여성" ? "female" : "상관없음" // "상관없음" 케이스 추가
      );
    } else if (type === "age") {
      handleFormChange("age", value.split(", "));
    } else if (type === "residence") {
      handleFormChange("residence", value.split(", "));
    } else if (type === "income") {
      handleFormChange("income", value.split(", "));
    }
  };

  const handleFormChange = (field, value) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const business = {
    business: businessDescription,
    target: project.projectAnalysis.target_customer,
    business_model: project.businessModel,
    sector: project.industryType,
    country: project.targetCountry,
  };

  const handleSubmitBusinessInfo = async () => {
    // quickSurveyAnalysis가 비어있을 때만 API 호출
    if (!Object.keys(quickSurveyAnalysis).length) {
    setIsLoading(true);
    try {
        // 비즈니스 데이터 추가
        const Data = {
          type: "ix_quick_survey_question",
          business: businessDescription,
          goal: projectDescription,
        };

        setQuickSurveyProjectDescription(projectDescription);

        // API 요청
        let response;
        let retryCount = 0;
        const maxRetries = 10;
        
        while (retryCount < maxRetries) {
          try {
            response = await InterviewXQuickSurveyRequest(Data, isLoggedIn);
            
            // 응답 형식 검증
            if (response.response && 
                response.response.quick_survey_question && 
                response.response.quick_survey_question.ab_test && 
                response.response.quick_survey_question.importance && 
                response.response.quick_survey_question.nps && 
                response.response.quick_survey_question.single_choice) {
              break; // 올바른 응답 형식이면 루프 종료
            }
            
            retryCount++;
          } catch (error) {
            retryCount++;
            if (retryCount >= maxRetries) throw error;
          }
        }
        
        if (retryCount >= maxRetries) {
          throw new Error("올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다.");
        }

        const responseToolId = await createToolOnServer(
          {
            projectId: project._id,
            type: "ix_quick_survey_question",
          },
          isLoggedIn
        );

        setToolId(responseToolId);

        setQuickSurveyAnalysis(response.response.quick_survey_question);

        await updateToolOnServer(
          responseToolId,
          {
            quickSurveyAnalysis: response.response.quick_survey_question,
            business: business,
            goal: projectDescription,
          },
          isLoggedIn
        );

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
    } else {
      handleNextStep(1);
      setIsLoading(true);

      const Data = {
        type: "ix_quick_survey_custom_guide",
        business: business,
        goal: projectDescription,
      };
      let response;
      let retryCount = 0;
      const maxRetries = 10;
      
      while (retryCount < maxRetries) {
        response = await InterviewXQuickSurveyRequest(Data, isLoggedIn);
        
        // 응답 형식 확인
        if (response.response && 
            response.response.quick_survey_custom_guide && 
            Array.isArray(response.response.quick_survey_custom_guide) && 
            response.response.quick_survey_custom_guide.length === 3) {
          break;
        }
        
        retryCount++;
        if (retryCount >= maxRetries) {
          throw new Error("응답 형식이 올바르지 않습니다. 최대 재시도 횟수를 초과했습니다.");
        }
      }

      setQuickSurveyCustomGuide(response.response.quick_survey_custom_guide);

      setQuickSurveySurveyMethod(quickSurveyAnalysis[selectedQuestion]);

      await updateToolOnServer(
        toolId,
        {
          selectedQuestion: selectedQuestion,
          surveyMethod: quickSurveyAnalysis[selectedQuestion],
          quickSurveyCustomGuide: response.response.quick_survey_custom_guide,
          completedStep: 1,
        },
        isLoggedIn
      );
      setIsLoading(false);
      setToolSteps(1);
    }
  };

  useEffect(() => {
    if (shouldRegenerate && Object.keys(quickSurveyAnalysis).length === 0) {
      handleSubmitBusinessInfo();
      setShouldRegenerate(false); // 리셋
    }
  }, [quickSurveyAnalysis, shouldRegenerate]);

  const handleRegenerate = () => {
    setShouldRegenerate(true);
    setSelectedQuestion([]); // 재생성 flag 설정
    setQuickSurveyAnalysis({});
  };

  const handleSubmitSelfSelect = async () => {
    // setToolSteps(2);
    setIsLoadingDetailSetting(true);

    try {
      let Data;

      if (interviewModeType === "selfQuestion") {
        const detail_info = {
          gender: customPersonaForm.gender || "상관없음",
          age:
            customPersonaForm.age?.length > 0
              ? customPersonaForm.age
              : ["상관없음"],
          residence:
            customPersonaForm.residence?.length > 0
              ? customPersonaForm.residence
              : ["상관없음"],
          income:
            customPersonaForm.income?.length > 0
              ? customPersonaForm.income
              : ["상관없음"],
        };
        Data = {
          type: "ix_quick_survey_persona_group",
          business: business,
          goal: projectDescription,
          recruitment_criteria: recruitingCondition || "상관없음",
          survey_method: quickSurveyAnalysis[selectedQuestion],
          detail_info: detail_info,
        };
      } else {
        // 선택된 카드의 ID 찾기
        // const selectedCardId = Object.entries(selectedPresetCards).find(([_, isSelected]) => isSelected)?.[0];

        // const selectedPersona = quickSurveyPresetData.find(persona => persona._id === selectedCardId);
        Data = {
          type: "ix_quick_survey_persona_group",
          business: business,
          goal: projectDescription,
          survey_method: quickSurveyAnalysis[selectedQuestion],
          recruitment_criteria: selectedPersona?.original_description || "",
        };
      }

      const response = await InterviewXQuickSurveyRequest(Data, isLoggedIn);

      const personaGroupWithImage =
        response.response.quick_survey_persona_group.map((persona) => ({
          ...persona,
          imageKey: `persona_${persona.gender === "남성" ? "m" : "f"}_${
            Math.floor(
              (persona.age ? parseInt(persona.age.replace("세", "")) : 20) / 10
            ) * 10
          }_${String(Math.floor(Math.random() * 10) + 1).padStart(2, "0")}`,
        }));


      setquickSurveyPersonaGroup(personaGroupWithImage);

      // setquickSurveyPersonaGroup(response.response.quick_survey_persona_group)

      await updateToolOnServer(
        toolId,
        {
          detailInfo: customPersonaForm,
          recruitmentCriteria:
            interviewModeType === "selfQuestion"
              ? recruitingCondition
              : selectedPersona?.original_description,
          personaGroup: personaGroupWithImage,
          interviewModeType: interviewModeType,
          completedStep: 2,
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
      setIsLoadingDetailSetting(false);
    }
  };

  const handlePresetPersona = async () => {
    // setToolSteps(2);
    setIsLoadingPreset(true);
    try {
      const Data = {
        type: "ix_quick_survey_preset",
        business: business,
        goal: projectDescription,
        survey_method: {
          question: quickSurveyAnalysis[selectedQuestion].question,
          follow_up: quickSurveyAnalysis[selectedQuestion].follow_up,
        },
      };

      let response;
      let retryCount = 0;
      const maxRetries = 10;
      
      while (retryCount < maxRetries) {
        try {
          response = await InterviewXQuickSurveyRequest(Data, isLoggedIn);
          
          // 응답 형식 확인
          if (response?.response?.quick_survey_preset?.low_user_group &&
              response?.response?.quick_survey_preset?.general_user_group &&
              response?.response?.quick_survey_preset?.high_user_group) {
            break; // 올바른 형식이면 루프 종료
          }
          
          retryCount++;
        } catch (error) {
          retryCount++;
        }
      }
      
      if (retryCount >= maxRetries) {
        throw new Error("최대 재시도 횟수를 초과했습니다. 응답 형식이 올바르지 않습니다.");
      }

      // 여기서 데이터 가공
      const allPersonas = [
        ...response.response.quick_survey_preset.low_user_group,
        ...response.response.quick_survey_preset.general_user_group,
        ...response.response.quick_survey_preset.high_user_group,
      ].map((persona, index) => ({
        _id: String(index + 1),
        personaName: persona.preset_name,
        personaCharacteristics: persona.preset_description,
        status: "complete",
        original_description: persona.preset_description, // recruitment_criteria용으로 원본 저장
      }));

      setQuickSurveyPresetData(allPersonas);

      await updateToolOnServer(
        toolId,
        {
          quickSurveyPresetData: allPersonas,
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
      setIsLoadingPreset(false);
    }
  };

  const handleSubmitPersonas = async () => {
    handleNextStep(2);
    // setToolSteps(2);
    setIsLoadingReport(true);
   
    try {

      const Data = {
        type: "ix_quick_survey_interview",
        business: business,
        survey_method: {
          ...quickSurveyAnalysis[selectedQuestion],
          type: selectedQuestion.toString(),
        },
        persona_group: quickSurveyPersonaGroup,
      };

      let response;
      let retryCount = 0;
      const maxRetries = 10;
      
      while (retryCount < maxRetries) {
        try {
          response = await InterviewXQuickSurveyRequest(Data, isLoggedIn);
          
          // 응답 형식 검증
          if (response.response && 
              response.response.quick_survey_interview && 
              Array.isArray(response.response.quick_survey_interview) && 
              response.response.quick_survey_interview.length > 0) {
            break; // 올바른 응답 형식이면 루프 종료
          }
          
          retryCount++;
        } catch (error) {
          retryCount++;
          if (retryCount >= maxRetries) throw error;
        }
      }
      
      if (retryCount >= maxRetries) {
        throw new Error("올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다.");
      }

      const combinedInterviews = response.response.quick_survey_interview.map(
        (interview, index) => {
          const matchedPersona = quickSurveyPersonaGroup.find(
            (persona, pIndex) =>
              pIndex === index && persona.name === interview.persona_name
          );

          if (matchedPersona) {
            const { name, ...personaInfoWithoutName } = matchedPersona;
            return {
              ...interview,
              ...personaInfoWithoutName,
            };
          }
          return interview;
        }
      );

      setQuickSurveyInterview(combinedInterviews);

      const reportData = {
        type: "ix_quick_survey_report",
        business: business,
        goal: projectDescription,
        survey_method: {
          ...quickSurveyAnalysis[selectedQuestion],
          type: selectedQuestion.toString(),
        },
        persona_group: quickSurveyPersonaGroup,
        quick_survey_interview: response.response.quick_survey_interview,
      };

      let responseReport;
      let reportRetryCount = 0;
      const reportMaxRetries = 10;
      
      while (reportRetryCount < reportMaxRetries) {
        try {
          responseReport = await InterviewXQuickSurveyRequest(reportData, isLoggedIn);
          
          // 응답 형식 검증
          if (responseReport.response && 
              responseReport.response.quick_survey_report && 
              responseReport.response.statistics_data) {
            break; // 올바른 응답 형식이면 루프 종료
          }
          reportRetryCount++;
        } catch (error) {
          reportRetryCount++;
          if (reportRetryCount >= reportMaxRetries) throw error;
        }
      }
      
      if (reportRetryCount >= reportMaxRetries) {
        throw new Error("올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다.");
      }

      setQuickSurveyReport(responseReport.response.quick_survey_report);

      setQuickSurveyStaticData(responseReport.response.statistics_data);

          await updateToolOnServer(
            toolId,
            {
          // quickSurveyInterview: response.response.quick_survey_interview,
          quickSurveyInterview: combinedInterviews,
          quickSurveyReport: responseReport.response.quick_survey_report,
          quickSurveyStaticData: responseReport.response.statistics_data,
              completedStep: 3,
            },
            isLoggedIn
          );

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

  // const handlePresetCardSelection = (personaId) => {
  //   setSelectedPresetCards(prev => {
  //     // 현재 선택된 카드가 있고, 그게 클릭한 카드라면 선택 해제
  //     if (prev[personaId]) {
  //       return {};
  //     }
  //     // 새로운 카드 선택 시 이전 선택은 모두 해제하고 새로운 카드만 선택
  //     return {
  //       [personaId]: true
  //     };
  //   });
  // };

  const handlePresetCardSelection = (personaId) => {
    const newSelectedCards = { ...selectedPresetCards };
    // 현재 선택 상태 확인
    const isCurrentlySelected = newSelectedCards[personaId];

    // 모든 카드 선택 해제
    Object.keys(newSelectedCards).forEach((key) => {
      newSelectedCards[key] = false;
    });

    // 현재 카드가 선택되지 않은 상태였다면 선택
    if (!isCurrentlySelected) {
      newSelectedCards[personaId] = true;
      const persona = quickSurveyPresetData.find((p) => p._id === personaId);
      setSelectedPersona(persona);
    } else {
      // 이미 선택된 카드를 다시 클릭하면 선택 해제
      setSelectedPersona(null);
    }

    setSelectedPresetCards(newSelectedCards);
  };

  const handleEnterInterviewRoom = () => {
    setSelectedOption(null);
    setSelectedOptionIndex(null);
    setShowToast(true);
  };
  // showToast가 변경될 때마다 selectedOption 초기화
    // useEffect(() => {
    //   if (!showToast) {
    //     setSelectedOption(null);
    //     // setSelectedOptionIndex(null);
    //   }
    // }, [showToast]);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;

      if (currentUrl.toLowerCase().includes("QuickSurvey")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        console.log("세션 스토리지에서 마지막 URL 가져오기");
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

  const processMarketingABData = (data) => {
    if (!data || !data.총합) return { a: 0, b: 0 };

    const options = Object.keys(data).filter((key) => key !== "총합");
    if (options.length !== 2) return { a: 0, b: 0 };

    const [optionAKey, optionBKey] = options;
    const totalA = data[optionAKey]?.총합 || 0;
    const totalB = data[optionBKey]?.총합 || 0;
    const overallTotal = data.총합?.총합 || totalA + totalB; // 혹시 전체 총합이 없을 경우 대비

    if (overallTotal === 0) return { a: 0, b: 0 };

    return {
      a: Math.round((totalA / overallTotal) * 100),
      b: Math.round((totalB / overallTotal) * 100),
    };
  };

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
                    목적 및 문항
                  </Body1>
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    Question Select
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
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={
                  !completedSteps.includes(2) || isLoading || isLoadingReport
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
                      <H3 color="gray800">Survey Question Selection</H3>
                      <Body3 color="gray800">
                      다수의 페르소나에게 빠르게 확인하고 싶은 내용은
                      무엇인가요?
                      </Body3>
                    </div>

                    <div className="content">
                      <TabContent5Item required>
                        <Title>
                        <Body1 color="gray700">
                          Quick Survey로 확인하고 싶은 내용이 무엇인가요?
                        </Body1>
                        </Title>
                        
                        <FormBox Large>
                          <CustomTextarea
                            Edit
                            rows={6}
                            placeholder="알고 싶은 문제 및 문항에 대한 내용을 작성해 주세요."
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
                            {descriptionLength} / 150
                          </Body2>
                        </FormBox>
                      </TabContent5Item>
                    </div>
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
                      {quickSurveyAnalysis &&
                        Object.keys(quickSurveyAnalysis).length > 0 && (
                          <div className="content">
                            <>
                              <div className="title">
                                <Body1
                                  color="gray700"
                                  style={{
                                    textAlign: "left",
                                    marginBottom: "-20px",
                                  }}
                                >
                                  💡문항 선택
                                </Body1>
                              </div>
                              {/* 로딩 후 보여질 컴포넌트 */}
                              {Object.entries(quickSurveyAnalysis).map(
                                ([key, value]) => {
                                  const getTitleByKey = {
                                    ab_test: "A/B 테스트",
                                    importance: "경험 평가 질문",
                                    nps: "NPS 질문",
                                    single_choice: "단일 선택형",
                                  };

                                  return (
                        <MoleculeDesignItem
                          FlexStart
                                      key={key}
                                      id={key}
                                      title={getTitleByKey[key]}
                                      question={quickSurveyAnalysis}
                                      subtitle={value.question}
                                      // details={getDetails(value)}
                                      isSelected={selectedQuestion.includes(
                                        key
                                      )}
                                      onSelect={() => handleCheckboxChange(key)}
                                      disabled={toolSteps >= 1}
                                    />
                                  );
                                }
                              )}
                            </>
                          </div>
                        )}
                      {/* 버튼들을 content div 바깥으로 이동 */}
                      {quickSurveyAnalysis &&
                      Object.keys(quickSurveyAnalysis).length > 0 ? (
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
                            onClick={handleRegenerate} // 재생성 핸들러로 변경 필요
                            disabled={toolSteps >= 1}
                      >
                            재생성
                      </Button>
                        <Button
                          Other
                          Primary
                          Fill
                          Round
                          onClick={handleSubmitBusinessInfo}
                            disabled={
                              selectedQuestion.length === 0 || toolSteps >= 1
                            }
                        >
                          다음
                        </Button>
                        </div>
                      ) : (
                        // <Button
                        //   Other
                        //   Primary
                        //   Fill
                        //   Round
                        //       onClick={handleSubmitBusinessInfo}
                        //       disabled={selectedQuestion.length === 0}
                        // >
                        //   다음
                        // </Button>
                        <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={handleSubmitBusinessInfo}
                          disabled={!projectDescription || toolSteps >= 1}
                    >
                      다음
                        </Button>
                      )}
                  </>                                       
                  )}
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
                          <Body2 color="gray500">설문 주제</Body2>
                          <div
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "100%", // 또는 특정 픽셀값
                            }}
                          >
                            {quickSurveyAnalysis[selectedQuestion].question}
                          </div>
                        </li>
                        <li style={{ alignItems: "flex-start" }}>
                          <Body2 color="gray500">리쿠르팅 조건</Body2>
                          {interviewModeType === "moderator" &&
                          selectedPersona ? (
                            <Body2
                              color="gray800"
                              style={{ textAlign: "left" }}
                            >
                              {selectedPersona?.original_description}
                            </Body2>
                          ) : recruitingCondition ? (
                            <Body2
                              color="gray800"
                              style={{ textAlign: "left" }}
                            >
                              {recruitingCondition}
                            </Body2>
                          ) : (
                            <Body2 color="gray300">선택해 주세요.</Body2>
                          )}
                        </li>

                        <li>
                          <Body2 color="gray500">상세 조건</Body2>

                          {interviewModeType === "moderator" ? (
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                              }}
                            >
                              <div
                                style={{
                                  padding: "4px 12px",
                                  borderRadius: "16px",
                                  backgroundColor: "#F7F8FA",
                                  display: "inline-flex",
                                  alignItems: "center",
                                }}
                              >
                                <Body2 color="gray800">상관없음</Body2>
                              </div>
                            </div>
                          ) : selectedValues.gender ||
                            selectedValues.age ||
                            selectedValues.residence ||
                            selectedValues.income ? (
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                              }}
                            >
                              {(() => {
                                const totalValues = Object.values(selectedValues).filter((value) => value);
                                const irrelevantCount = totalValues.filter(
                                  (value) => value === "상관없음"
                                ).length;

                                if (totalValues.length === 4 && irrelevantCount === 4) {
                                  // 모든 값이 "상관없음"일 때
                              return (
                                    <div
                                      style={{
                                        padding: "4px 12px",
                                        borderRadius: "16px",
                                        backgroundColor: "#F7F8FA",
                                        display: "inline-flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Body2 color="gray800">상관없음</Body2>
                                    </div>
                                  );
                                } else {
                                  // "상관없음"을 제외한 나머지 값들만 표시
                                  return Object.entries(selectedValues)
                                    .filter(([_, value]) => value && value !== "상관없음") // "상관없음" 제외
                                    .map(([key, value]) => (
                                      <div
                                        key={key}
                                        style={{
                                          padding: "4px 12px",
                                          borderRadius: "16px",
                                          backgroundColor: "#F7F8FA",
                                          display: "inline-flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Body2 color="gray800">{value}</Body2>
                                      </div>
                                    ));
                                }
                              })()}
                            </div>
                          ) : (
                            <Body2 color="gray300">선택해 주세요.</Body2>
                          )}
                        </li>
                        <li>
                          <Body2 color="gray500">페르소나 수</Body2>
                          <Body2 color="gray800">
                            {quickSurveyPersonaGroup &&
                            quickSurveyPersonaGroup.length > 0
                              ? `${quickSurveyPersonaGroup.length}명 완료`
                              : "30명 예상"}
                          </Body2>
                        </li>
                      </ListBoxGroup>

                      {isLoadingDetailSetting ? (
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
                      ) : quickSurveyPersonaGroup.length > 0 || toolSteps >= 3 ? (
                        <TabContent5Item>
                          <div className="title">
                            <Body1 color="gray700">
                              🚩 Quick Survey 참여 페르소나 리스트
                            </Body1>
                          </div>
                          <MoleculePersonaSelect
                            filteredPersonaList={quickSurveyPersonaGroup}
                            businessPersonaList={[]}
                            customPersonaList={[]}
                            // selectedQuestion={selectedQuestion}
                            // onPersonaSelect={setSelectedQuestion}
                          />
                        </TabContent5Item>
                      ) : (
                        <TabContent5Item>
                          <InterviewModeSelection>
                            <InterviewModeCard
                              isActive={interviewModeType === "selfQuestion"}
                              onClick={() => {
                                if (toolSteps >= 2 || isLoadingPreset) return; // 여기서 조건 체크
                                setInterviewModeType("selfQuestion");
                              }}
                              disabled={toolSteps >= 2 || isLoadingPreset}
                            >
                              <CardWrapper>
                                <CheckboxWrapper>
                                  <CheckCircle
                                    as="input"
                                    type="radio"
                                    id="selfQuestion"
                                    name="interviewMode"
                                    checked={
                                      interviewModeType === "selfQuestion"
                                    }
                                    onChange={() => {
                                      if (toolSteps >= 2 || isLoadingPreset)
                                        return; // onChange에도 조건 체크
                                      setInterviewModeType("selfQuestion");
                                    }}
                                    disabled={toolSteps >= 2 || isLoadingPreset}
                                  />
                                </CheckboxWrapper>
                                <CardContent>
                                  <div>
                                    <Body2
                                      color={
                                        interviewModeType === "selfQuestion"
                                          ? "primary"
                                          : "gray800"
                                      }
                                      style={{ fontWeight: "700" }}
                                    >
                                      설문 대상 직접 설정
                                    </Body2>
                                    <Body3
                                      style={{ marginTop: "0px" }}
                                      color={
                                        interviewModeType === "selfQuestion"
                                         ? "gray800"
                                          : "gray500"
                                      }
                                    >
                                      성별, 연령, 지역, 소득 등 원하는 설문 대상
                                      기준을 직접 설정해 타겟 응답자의 의견을
                                      수집할 수 있어요.
                                      {/* 원하는 질문을 직접 입력하여 Persona에게
                                      <br/>
                                      답을 얻을 수 있습니다. */}
                                    </Body3>
                                  </div>
                                </CardContent>
                              </CardWrapper>
                            </InterviewModeCard>

                            <InterviewModeCard
                              isActive={interviewModeType === "moderator"}
                              onClick={() => {
                                setInterviewModeType("moderator");
                                if (
                                  !quickSurveyPresetData ||
                                  quickSurveyPresetData.length === 0
                                ) {
                                  handlePresetPersona();
                                }
                              }}
                            >
                              <CardWrapper>
                                <CheckboxWrapper>
                                  <CheckCircle
                                    as="input"
                                    type="radio"
                                    id="moderator"
                                    name="interviewMode"
                                    checked={interviewModeType === "moderator"}
                                    onChange={() => {}} // 빈 함수로 변경
                                  />
                                </CheckboxWrapper>
                                <CardContent>
                                  <div>
                                    <Body2
                                      color={
                                        interviewModeType === "moderator"
                                          ? "primary"
                                            : "gray800"
                                        }
                                      style={{ fontWeight: "700" }}
                                   >
                                      맞춤형 응답자 추천
                                   </Body2>
                                    <Body3
                                      style={{ marginTop: "0px" }}
                                      color={
                                        interviewModeType === "moderator"
                                          ? "gray800"
                                          : "gray500"
                                      }
                                    >
                                      비즈니스와 설문 내용에 맞춰 가장 적합한
                                      페르소나를 분석하여 최적의 응답자 그룹을
                                      추천해드려요.
                                    </Body3>
                                  </div>
                                </CardContent>
                              </CardWrapper>
                            </InterviewModeCard>
                          </InterviewModeSelection>

                          {interviewModeType === "selfQuestion" && (
                            <>
                              <TabContent5Item>
                                <div className="title">
                                  <Body1 color="gray700">리쿠르팅 조건</Body1>
                                </div>
                                <CustomTextarea
                                  rows={3}
                                  type="text"
                                  placeholder="아래 태그의 정보를 참고하여 작성해 주세요."
                                  value={recruitingCondition}
                                  onChange={(e) =>
                                    setRecruitingCondition(e.target.value)
                                  }
                                />
                                {quickSurveyCustomGuide &&
                                quickSurveyCustomGuide.length > 0 ? (
                                  <div>
                                    {quickSurveyCustomGuide.map(
                                      (guide, index) => (
                                        <TagButton key={index}>
                                          <Body2
                                            color="gray700"
                                            style={{ fontSize: "14px" }}
                                          >
                                            {guide}
                                          </Body2>
                                        </TagButton>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    <TagButton>
                                      <Body2
                                        color="gray700"
                                        style={{ fontSize: "14px" }}
                                      >
                                        리쿠르팅 조건 도출
                                      </Body2>
                                    </TagButton>
                                  </div>
                                )}
                              </TabContent5Item>

                              <div
                                className="title"
                                style={{ marginTop: "30px" }}
                              >
                                <Body1 color="gray700">상세 조건 설정</Body1>
                              </div>
                              <MoleculeDetailSetting
                                customPersonaForm={customPersonaForm}
                                selectedValues={selectedValues}
                                selectBoxStates={selectBoxStates}
                                toggleSelectBox={toggleSelectBox}
                                handleFormChange={handleFormChange}
                                handlePurposeSelect={handlePurposeSelect}
                              />
                            </>
                          )}

                          {interviewModeType === "moderator" &&
                            (isLoadingPreset ? (
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
                              <TabContent5Item>
                                <div className="title">
                                  <Body1 color="gray700">
                                    💡Quick Survey에 최적화된 페르소나 집단을
                                    추천 드려요{" "}
                                  </Body1>
                                </div>
                                <MolculePresetPersona
                                  personaData={quickSurveyPresetData}
                                  selectedCards={selectedPresetCards}
                                  onCardSelect={handlePresetCardSelection}
                                />
                              </TabContent5Item>
                            ))}
                        </TabContent5Item>
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
                        onClick={() => {
                          if (quickSurveyPersonaGroup.length > 0) {
                            handleSubmitPersonas(); //마지막 보고서 함수
                          } else {
                            if (
                              interviewModeType === "selfQuestion" ||
                              (interviewModeType === "moderator" &&
                                quickSurveyPresetData &&
                                quickSurveyPresetData.length > 0)
                            ) {
                              handleSubmitSelfSelect();
                            }
                          }
                        }}
                          disabled={
                            toolSteps >= 3 ||
                          !interviewModeType ||
                          (interviewModeType === "moderator" &&
                            (!selectedPresetCards ||
                              !Object.values(selectedPresetCards).some(
                                (value) => value
                              ))&&(!quickSurveyPersonaGroup.length > 0 )) ||
                          (interviewModeType === "selfQuestion" &&
                            (!recruitingCondition ||
                              recruitingCondition.trim() === "" ||
                              !selectedValues ||
                              Object.values(selectedValues).every(
                                (value) => !value
                              )))
                        }
                      >
                        다음
                        </Button>
                    )}
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
                      <H3 color="gray800">퀵서베이 결과</H3>
                      <Body3 color="gray800">
                        페르소나 그룹의 의견을 확인하여 타겟 반응을 사전에
                        확인해보세요.
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
                              결과 개요
                            </TabButtonType4>
                            <TabButtonType4
                              active={activeDesignTab === "scale"}
                              onClick={() => setActiveDesignTab("scale")}
                            >
                              항목별 통계
                            </TabButtonType4>
                          </TabWrapType4>
                        </div>
                        <Button Primary onClick={handleEnterInterviewRoom}>
                          <img
                            src={images.ReportSearch}
                            alt="인터뷰 스크립트 보기"
                          />
                          응답자 의견 확인
                        </Button>
                      </div>
                    </InsightAnalysis>

                    <InsightAnalysis>
                      <div className="title"></div>
                    </InsightAnalysis>

                    <InsightAnalysis>
                      <div className="title">
                        <H4 color="gray800" align="left">
                          Q. 이 제품/서비스의 핵심 강점으로 가장 가까운 것은
                          무엇이라고 느꼈나요?
                        </H4>
                      </div>

                      {activeDesignTab === "emotion" && (
                        <>
                          {/* 각 질문 유형에 맞는 그래프 렌더링 */}
                          {selectedQuestion[0] === "ab_test" &&
                            Object.keys(quickSurveyStaticData).length > 0 && (
                              <ABGraph
                                onOptionSelect={setSelectedOption}
                                onOptionSelectIndex={setSelectedOptionIndex}
                                onBarClick={() => setShowToast(true)}
                              />
                            )}
                          {(selectedQuestion[0] === "importance" ||
                            selectedQuestion[0] === "single_choice") &&
                            Object.keys(quickSurveyStaticData).length > 0 && (
                              <BarChartLikertScale5
                                onOptionSelect={setSelectedOption}
                                onOptionSelectIndex={setSelectedOptionIndex}
                                onBarClick={() => setShowToast(true)}
                              />
                            )}
                          {selectedQuestion[0] === "nps" &&
                            Object.keys(quickSurveyStaticData).length > 0 && (
                              <BarChartLikertScale11
                              onOptionSelect={setSelectedOption}
                              onOptionSelectIndex={setSelectedOptionIndex}
                              onBarClick={() => setShowToast(true)} />
                            )}

                          {/* Insight 섹션 */}
                          <div className="content">
                            {quickSurveyReport?.[0] && (
                              <InsightContainer>
                                <InsightSection>
                                  <InsightLabel color="gray700">
                                    총평
                                  </InsightLabel>
                                  <InsightContent color="gray700">
                                    {quickSurveyReport[0].total_insight}
                                  </InsightContent>
                                </InsightSection>

                                <InsightSection>
                                  <InsightLabel color="gray700">
                                    성별 의견 정리
                                  </InsightLabel>
                                  <InsightContent color="gray700">
                                    {quickSurveyReport[0].gender_insight}
                                  </InsightContent>
                                </InsightSection>

                                <InsightSection>
                                  <InsightLabel color="gray700">
                                    연령별 의견 정리
                                  </InsightLabel>
                                  <InsightContent color="gray700">
                                    {quickSurveyReport[0].age_insight}
                                  </InsightContent>
                                </InsightSection>
                              </InsightContainer>
                            )}
                              </div>
                        </>
                      )}
                      {activeDesignTab === "scale" && (
                        <>

                         {/* 각 질문 유형에 맞는 그래프 렌더링 */}
                         {selectedQuestion[0] === 'ab_test' && Object.keys(quickSurveyStaticData).length > 0 && (
                            <GraphChartScale2 />
                          )}
                          {(selectedQuestion[0] === 'importance' || selectedQuestion[0] === 'single_choice') && Object.keys(quickSurveyStaticData).length > 0 && (
                            <GraphChartScale5 />
                          )}
                          {selectedQuestion[0] === 'nps' && Object.keys(quickSurveyStaticData).length > 0 && (

                            <GraphChartScale11 />
                          )}
                        </>
                      )}
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

export default PageQuickSurvey;

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
`;

const InterviewModeSelection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: center;
  margin-bottom: 30px;

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
  gap: 8px;
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
`;
