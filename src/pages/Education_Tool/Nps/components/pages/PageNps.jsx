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
  PROJECT_ANALYSIS_MULTIMODAL_DESCRIPTION,
  NPS_CONCEPT_DEFINITION,
  PERSONA_LIST_SAAS,
  NPS_SELECTED_CONCEPT,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  CREDIT_CREATE_TOOL,
  USER_CREDITS,
  CREDIT_CREATE_TOOL_LOADED,
  EDUCATION_STATE,
  NPS_SELECTED_MODE_TYPE,
  NPS_FILE_NAME,
  NPS_SURVEY_METHOD,
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
  getFindToolListOnServerSaas,
  EducationToolsRequest,
  InterviewXNPSConceptboardMultimodalRequest,
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
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
import MoleculeFileUpload from "../molecules/MoleculeFileUpload";
import MoleculeItemSelectCard from "../../../public/MoleculeItemSelectCard";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import WaitLongLodingBar from "../../../../../components/Charts/WaitLongLodingBar";

const PageNps = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [creditCreateTool, setCreditCreateTool] = useAtom(CREDIT_CREATE_TOOL);
  const [creditCreateToolLoaded, setCreditCreateToolLoaded] = useAtom(
    CREDIT_CREATE_TOOL_LOADED
  );
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [educationState] = useAtom(EDUCATION_STATE);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [
    projectAnalysisMultimodalDescription,
    setProjectAnalysisMultimodalDescription,
  ] = useAtom(PROJECT_ANALYSIS_MULTIMODAL_DESCRIPTION);
  // const [npsConceptDefinition, setNpsConceptDefinition] = useAtom(
  //   NPS_CONCEPT_DEFINITION
  // );
  const [quickSurveyAnalysis, setQuickSurveyAnalysis] = useAtom(
    QUICK_SURVEY_ANALYSIS
  );
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
  const [quickSurveyProjectDescription, setQuickSurveyProjectDescription] =
    useAtom(QUICK_SURVEY_PROJECT_DESCRIPTION);
  const [quickSurveyStaticDataState, setQuickSurveyStaticDataState] = useState(
    {}
  );
  const [npsSelectedConcept, setNPSSelectedConcept] =
    useAtom(NPS_SELECTED_CONCEPT);
  const [npsSelectedModeType, setNpsSelectedModeType] = useAtom(
    NPS_SELECTED_MODE_TYPE
  );
  const [npsFileName, setNpsFileName] = useAtom(NPS_FILE_NAME);
  const [npsSurveyMethod, setNpsSurveyMethod] = useAtom(NPS_SURVEY_METHOD);
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState([]);
  const [conceptList, setConceptList] = useState([]);
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
  const [interviewModeType, setInterviewModeType] = useState("explanation");
  const [isLoadingPreset, setIsLoadingPreset] = useState(false);
  const [selectedPresetCards, setSelectedPresetCards] = useState({});
  const [shouldRegenerate, setShouldRegenerate] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isCustomPopupOpen, setIsCustomPopupOpen] = useState(false);
  const [isCustomLoading, setIsCustomLoading] = useState(false);
  const [npsConceptDefinition, setNpsConceptDefinition] = useState([]);
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);

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
      if (!creditCreateToolLoaded) {
        setShowCreatePersonaPopup(true);
        // 크레딧 사용전 사용 확인
        const creditPayload = {
          // 기존 10 대신 additionalQuestionMount 사용
          mount: creditCreateTool,
        };
        const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

        if (creditResponse?.state !== "use") {
          setShowCreditPopup(true);
          return;
        }
      }
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
        // if (fileNames) {
        //   setFileNames(fileNames ?? []);
        //   setUploadedFiles(fileNames ?? []);
        // }

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

  // Concept 리스트 가져오기
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
        // console.log(allItems);

        setNpsConceptDefinition(allItems);
      } catch (error) {
        setNpsConceptDefinition([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn, projectSaas]);

  // const handleCheckboxChange = (personaId) => {
  //   if (toolSteps >= 2) return;
  //   setSelectedConcept((prev) => {
  //     // 하나만 선택되도록 변경, 다른 항목 선택 시 해당 항목으로 변경
  //     if (prev.includes(personaId)) {
  //       return []; // 이미 선택된 항목을 다시 클릭하면 선택 해제
  //     } else {
  //       return [personaId]; // 새 항목 선택
  //     }
  //   });
  // };

  const handleCheckboxChange = (ideaId) => {
    setSelectedConcept((prev) => {
      if (prev.includes(ideaId)) {
        // 이미 선택된 아이템이면 제거
        const newSelected = prev.filter((id) => id !== ideaId);
        // 선택된 데이터들 업데이트
        const selectedDataList = newSelected.map(
          (id) => npsConceptDefinition[id]
        );
        setNPSSelectedConcept(selectedDataList);
        return newSelected;
      } else {
        // 새로운 아이템 추가
        const newSelected = [...prev, ideaId];
        // 선택된 데이터들 업데이트
        const selectedDataList = newSelected.map(
          (id) => npsConceptDefinition[id]
        );
        setNPSSelectedConcept(selectedDataList);
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
    target: project?.projectAnalysis?.target_customer || "",
    business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };

  const handleSubmitConcept = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // quickSurveyAnalysis가 비어있을 때만 API 호출
    handleNextStep(1);
    if (uploadedFiles.length > 0) {
      // console.log("uploadedFiles", uploadedFiles);
      // setIsLoading(true);
      try {
        // 비즈니스 데이터 추가
        setIsLoading(true);

        const timeStamp = new Date().getTime();
        const Data = {
          business: business,
          tool_id: "file_" + timeStamp,
          files: uploadedFiles,
        };

        // setPsstFileId(["file_" + timeStamp]);
        setFileNames(uploadedFiles.map((file) => file.name));

        // setQuickSurveyProjectDescription(projectDescription);

        // API 요청
        let response;
        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries) {
          try {
            response = await InterviewXNPSConceptboardMultimodalRequest(
              Data,
              isLoggedIn
            );

            // console.log("response", response);

            // // 응답 형식 검증
            // if (
            //   response.response &&
            //   response.response.nps_conceptboard_multimodal &&
            //   response.response.nps_conceptboard_multimodal.ab_test &&
            //   response.response.nps_conceptboard_multimodal.importance &&
            //   response.response.nps_conceptboard_multimodal.nps &&
            //   response.response.quick_survey_question.single_choice
            // ) {
            //   break; // 올바른 응답 형식이면 루프 종료
            // }

            retryCount++;
          } catch (error) {
            retryCount++;
            if (retryCount >= maxRetries) throw error;
          }
        }

        if (retryCount >= maxRetries) {
          throw new Error(
            "올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다."
          );
        }

        setNpsSurveyMethod(response.response.nps_conceptboard_multimodal);
        // setNpsConceptboardMultimodal(response.response.nps_conceptboard_multimodal);

        const responseToolId = await createToolOnServer(
          {
            projectId: project._id,
            type: "ix_nps_education",
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
            // goal: projectDescription,
            fileName: uploadedFiles.map((file) => ({
              id: "file_" + timeStamp,
              name: fileNames,
            })),
            interviewModeType: "moderator",
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
      // console.log("Data", Data);
      let response;
      let retryCount = 0;
      const maxRetries = 10;

      while (retryCount < maxRetries) {
        response = await EducationToolsRequest(Data, isLoggedIn, signal);

        // 응답 형식 확인
        if (
          response.response &&
          response.response.quick_survey_custom_guide &&
          Array.isArray(response.response.quick_survey_custom_guide) &&
          response.response.quick_survey_custom_guide.length === 3
        ) {
          break;
        }

        retryCount++;
        if (retryCount >= maxRetries) {
          throw new Error(
            "응답 형식이 올바르지 않습니다. 최대 재시도 횟수를 초과했습니다."
          );
        }
      }

      setQuickSurveyCustomGuide(response.response.quick_survey_custom_guide);

      setQuickSurveySurveyMethod(quickSurveyAnalysis[selectedQuestion]);
      setQuickSurveySelectedQuestion(selectedQuestion);
      // setNpsSurveyMethod();

      const responseToolId = await createToolOnServer(
        {
          projectId: project._id,
          type: "ix_nps_education",
        },
        isLoggedIn
      );

      setToolId(responseToolId);

      await updateToolOnServer(
        toolId,
        {
          selectedQuestion: selectedQuestion,
          surveyMethod: quickSurveyAnalysis[selectedQuestion],
          quickSurveyCustomGuide: response.response.quick_survey_custom_guide,
          completedStep: 1,
          npsSelectedConcept: npsSelectedConcept,
          interviewModeType: "explanation",
        },
        isLoggedIn
      );
      setIsLoading(false);
      setToolSteps(1);
    }
  };

  useEffect(() => {
    if (shouldRegenerate && Object.keys(quickSurveyAnalysis).length === 0) {
      handleSubmitConcept();
      setShouldRegenerate(false); // 리셋
    }
  }, [quickSurveyAnalysis, shouldRegenerate]);

  const handleRegenerate = () => {
    setShouldRegenerate(true);
    setSelectedQuestion([]); // 재생성 flag 설정
    setQuickSurveyAnalysis({});
    setQuickSurveyCustomQuestion([]);
  };

  const handleSubmitSelfSelect = async () => {
    // setToolSteps(2);
    setIsLoadingDetailSetting(true);

    try {
      let Data;

      if (interviewModeType === "conceptBoard") {
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
          // recruitment_criteria: selectedPersona?.original_description || "",
          recruitment_criteria: selectedPersona?.personaName || "",
        };
      }

      let response;
      let retryCount = 0;
      const maxRetries = 10;

      while (retryCount < maxRetries) {
        try {
          response = await InterviewXQuickSurveyRequest(Data, isLoggedIn);

          // 응답 형식 검증
          if (
            response.response &&
            response.response.quick_survey_persona_group &&
            Array.isArray(response.response.quick_survey_persona_group) &&
            response.response.quick_survey_persona_group.length > 0 &&
            response.response.quick_survey_persona_group[0].name &&
            response.response.quick_survey_persona_group[0].gender &&
            response.response.quick_survey_persona_group[0].age &&
            response.response.quick_survey_persona_group[0].job &&
            response.response.quick_survey_persona_group[0].profile &&
            response.response.quick_survey_persona_group[0].insight
          ) {
            break; // 올바른 응답 형식이면 루프 종료
          }

          retryCount++;
        } catch (error) {
          retryCount++;
          if (retryCount >= maxRetries) {
            throw error; // 최대 재시도 횟수 초과 시 에러 던지기
          }
        }
      }

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
            interviewModeType === "conceptBoard"
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
          if (
            response?.response?.quick_survey_preset?.low_user_group &&
            response?.response?.quick_survey_preset?.general_user_group &&
            response?.response?.quick_survey_preset?.high_user_group
          ) {
            break; // 올바른 형식이면 루프 종료
          }

          retryCount++;
        } catch (error) {
          retryCount++;
        }
      }

      if (retryCount >= maxRetries) {
        throw new Error(
          "최대 재시도 횟수를 초과했습니다. 응답 형식이 올바르지 않습니다."
        );
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

  const handleSubmitReport = async () => {
    handleNextStep(2);
    // setToolSteps(2);
    setIsLoadingReport(true);

    try {
      const Data = {
        type: "ix_quick_survey_interview",
        business: business,
        survey_method: {
          ...quickSurveyAnalysis[selectedQuestion],
          type: "nps",
          // type: selectedQuestion.toString(),
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
          if (
            response.response &&
            response.response.quick_survey_interview &&
            Array.isArray(response.response.quick_survey_interview) &&
            response.response.quick_survey_interview.length > 0
          ) {
            break; // 올바른 응답 형식이면 루프 종료
          }

          retryCount++;
        } catch (error) {
          retryCount++;
          if (retryCount >= maxRetries) throw error;
        }
      }

      if (retryCount >= maxRetries) {
        throw new Error(
          "올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다."
        );
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
          responseReport = await InterviewXQuickSurveyRequest(
            reportData,
            isLoggedIn
          );

          // 응답 형식 검증
          if (
            responseReport.response &&
            responseReport.response.quick_survey_report &&
            responseReport.response.statistics_data
          ) {
            break; // 올바른 응답 형식이면 루프 종료
          }
          reportRetryCount++;
        } catch (error) {
          reportRetryCount++;
          if (reportRetryCount >= reportMaxRetries) throw error;
        }
      }

      if (reportRetryCount >= reportMaxRetries) {
        throw new Error(
          "올바른 응답을 받지 못했습니다. 최대 재시도 횟수를 초과했습니다."
        );
      }

      setQuickSurveyReport(responseReport.response.quick_survey_report);

      setQuickSurveyStaticData(responseReport.response.statistics_data);
      setQuickSurveyStaticDataState(responseReport.response.statistics_data);
      await updateToolOnServer(
        toolId,
        {
          // quickSurveyInterview: response.response.quick_survey_interview,
          quickSurveyInterview: combinedInterviews,
          quickSurveyReport: responseReport.response.quick_survey_report,
          quickSurveyStaticData: responseReport.response.statistics_data,
          completedStep: 3,
          completedStatus: true,
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

  const abortControllerRef = useRef(null);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      // console.log("currentUrl", currentUrl);
      if (currentUrl.toLowerCase().includes("NPS")) {
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

    // 컴포넌트가 마운트될 때 새 AbortController 생성
    abortControllerRef.current = new AbortController();

    // 함수 실행
    detectRefresh();

    // 이벤트 리스너 등록
    // window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);

      // 진행 중인 모든 API 요청 중단
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [navigate]);

  // handleInputChange 함수 수정
  const handleInputChange = (field, value) => {
    // formData 대신 개별 상태 업데이트
    if (field === "projectDescription") {
      setProjectDescription(value);
    }
  };

  const getQuestionTitle = (type) => {
    switch (type) {
      case "ab_test":
        return "[A/B 테스트]";
      case "importance":
        return "[경험 평가 질문]";
      case "nps":
        return "[NPS 질문]";
      case "single_choice":
        return "[단일 선택형]";
      default:
        return "";
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

  // AI 다듬기 처리 함수
  const handleAiRefine = async (data) => {
    setIsCustomLoading(true);

    const options_length = data.options.length;

    try {
      data = {
        type: "ix_quick_survey_custom_question",
        business: business,
        goal: projectDescription,
        user_question: data.questionText,
        user_options: data.options,
      };

      // API 호출
      const response = await InterviewXQuickSurveyRequest(data, isLoggedIn);

      // 응답에서 받은 옵션 중 사용자가 입력한 옵션 수만큼만 사용
      const refinedQuestion = response.response.quick_survey_custom_question;
      const limitedOptions = refinedQuestion.options.slice(0, options_length);

      setQuickSurveyCustomQuestion({
        question: refinedQuestion.question,
        options: limitedOptions,
      });
    } catch (error) {
      console.error("AI 다듬기 실패:", error);
      // 에러 처리
    } finally {
      setIsCustomLoading(false);
    }
  };

  // 저장 처리 함수
  const handleSaveCustomSurvey = async (data) => {
    try {
      // API 호출

      // 기존 quickSurveyAnalysis에 추가
      setQuickSurveyAnalysis((prev) => ({
        ...prev,
        [`custom_question`]: data,
      }));

      setIsCustomPopupOpen(false);
      setQuickSurveyCustomQuestion(data);

      await updateToolOnServer(
        toolId,
        {
          quickSurveyAnalysis: {
            ...quickSurveyAnalysis,
            [`custom_question`]: data,
          },
        },
        isLoggedIn
      );
    } catch (error) {
      console.error("커스텀 설문 저장 실패:", error);
      // 에러 처리
    }
  };

  const handleCloseCustomPopup = () => {
    setIsCustomPopupOpen(false);
    setQuickSurveyCustomQuestion(null); // aiResponse 초기화
  };

  const handleConfirmCredit = async () => {
    setShowCreatePersonaPopup(false);
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
                    컨셉 입력
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
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 3}
                onClick={() =>
                  (completedSteps.includes(2) || completedSteps.includes(3)) &&
                  setActiveTab(3)
                }
                disabled={
                  !completedSteps.includes(3) || isLoading || isLoadingReport
                }
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    최종 인사이트 분석
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Upload Your Concept </H3>
                    <Body3 color="gray800">
                      페르소나 평가를 위해 컨셉보드 이미지 또는 제품/서비스
                      설명을 등록해주세요
                    </Body3>
                  </div>

                  <div className="content">
                    <TabContent5Item required>
                      {/* <Title>
                        <Body1 color="gray700">
                          Quick Survey로 확인하고 싶은 내용이 무엇인가요?
                        </Body1>
                      </Title> */}

                      {/* <TabContent5Item> */}
                      <InterviewModeSelection style={{ marginTop: "-16px" }}>
                        <InterviewModeCard
                          isActive={interviewModeType === "explanation"}
                          onClick={() => {
                            setInterviewModeType("explanation");
                            // if (
                            //   !quickSurveyPresetData ||
                            //   quickSurveyPresetData.length === 0
                            // ) {
                            //   handlePresetPersona();
                            // }
                          }}
                        >
                          <CardWrapper>
                            <CheckboxWrapper>
                              <CheckCircle
                                as="input"
                                type="radio"
                                id="explanation"
                                name="interviewMode"
                                checked={interviewModeType === "explanation"}
                                onChange={() => {}} // 빈 함수로 변경
                              />
                            </CheckboxWrapper>
                            <CardContent>
                              <div>
                                <Body2
                                  color={
                                    interviewModeType === "explanation"
                                      ? "primary"
                                      : "gray800"
                                  }
                                  style={{ fontWeight: "700" }}
                                >
                                  설명만으로 평가받기
                                </Body2>
                                <Body3
                                  style={{ marginTop: "0px" }}
                                  color={
                                    interviewModeType === "explanation"
                                      ? "gray800"
                                      : "gray500"
                                  }
                                >
                                  페르소나에게 전달하고 싶은 제품/서비스 설명을
                                  입력하고, 추천 의향을 확인해보세요.
                                </Body3>
                              </div>
                            </CardContent>
                          </CardWrapper>
                        </InterviewModeCard>
                        <InterviewModeCard
                          isActive={interviewModeType === "conceptBoard"}
                          onClick={() => {
                            if (toolSteps >= 2 || isLoadingPreset) return; // 여기서 조건 체크
                            setInterviewModeType("conceptBoard");
                          }}
                          disabled={toolSteps >= 2 || isLoadingPreset}
                        >
                          <CardWrapper>
                            <CheckboxWrapper>
                              <CheckCircle
                                as="input"
                                type="radio"
                                id="conceptBoard"
                                name="interviewMode"
                                checked={interviewModeType === "conceptBoard"}
                                onChange={() => {
                                  if (toolSteps >= 2 || isLoadingPreset) return; // onChange에도 조건 체크
                                  setInterviewModeType("conceptBoard");
                                }}
                                disabled={toolSteps >= 2 || isLoadingPreset}
                              />
                            </CheckboxWrapper>
                            <CardContent>
                              <div>
                                <Body2
                                  color={
                                    interviewModeType === "conceptBoard"
                                      ? "primary"
                                      : "gray800"
                                  }
                                  style={{ fontWeight: "700" }}
                                >
                                  컨셉 보드로 평가받기
                                </Body2>
                                <Body3
                                  style={{ marginTop: "0px" }}
                                  color={
                                    interviewModeType === "conceptBoard"
                                      ? "gray800"
                                      : "gray500"
                                  }
                                >
                                  아이디어가 담긴 컨셉보드를 업로드하고, 타겟
                                  페르소나의 추천 의향을 평가받아보세요.
                                  {/* 원하는 질문을 직접 입력하여 Persona에게
                                      <br/>
                                      답을 얻을 수 있습니다. */}
                                </Body3>
                              </div>
                            </CardContent>
                          </CardWrapper>
                        </InterviewModeCard>
                      </InterviewModeSelection>

                      {interviewModeType === "conceptBoard" && (
                        <div className="content">
                          {/* <div className="title"> 
                            <Body1 color="gray700"> 
                            NPS 평가를 받을 컨셉보드를 업로드해주세요
                            </Body1>
                          </div> */}

                          <MoleculeFileUpload
                            fileNames={fileNames ?? []}
                            handleChangeStatus={handleChangeStatus}
                            toolSteps={toolSteps}
                          />

                          {/* <ListBoxGroup>
                            <li>
                              <Body2 color="gray500">
                                {uploadedFiles.length > 0 ? "파일 명" : "리포트 방식"}
                              </Body2>
                              <Body2 color="gray800">
                                {fileNames.length > 0 ? fileNames : ""}
                              </Body2>
                            </li>
                            <li style={{ alignItems: "flex-start" }}>
                              <Body2 color="gray500">주요 내용</Body2>
                              <Body2
                                                color="gray800"
                                                style={{ textAlign: "left" }}
                                                dangerouslySetInnerHTML={{
                                                  __html:
                                                    uploadedFiles.length > 0
                                                      ? projectAnalysisMultimodalDescription
                                                      : ""
                                                    
                                                }}
                                              />
                            </li>
                          </ListBoxGroup> */}
                        </div>
                      )}
                    </TabContent5Item>

                    {interviewModeType === "explanation" && (
                      <>
                        <div
                          className="title"
                          style={{
                            textAlign: "left",
                            marginBottom: "-20px",
                            marginTop: "-30px",
                          }}
                        >
                          <Body1 color="gray700">
                            NPS 평가를 받을 컨셉정의서를 선택해주세요.{" "}
                          </Body1>
                        </div>
                        {npsConceptDefinition.map((idea, index) => (
                          <MoleculeItemSelectCard
                            style
                            FlexStart
                            key={index}
                            id={index}
                            title={`${idea.updateDate.split(":")[0]}:${
                              idea.updateDate.split(":")[1]
                            } - 컨셉 정의 `}
                            isSelected={selectedConcept.includes(index)}
                            onSelect={() => handleCheckboxChange(index)}
                          />
                        ))}
                      </>
                    )}
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
                      <Button
                        Other
                        Primary
                        Fill
                        Round
                        onClick={handleSubmitConcept}
                        disabled={
                          interviewModeType === "conceptBoard"
                            ? toolSteps >= 1 || !uploadedFiles.length > 0
                            : !selectedConcept.length > 0 || toolSteps >= 1
                        }
                      >
                        다음
                      </Button>
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
                      <H3 color="gray800">NPS 평가 페르소나 </H3>
                      <Body3 color="gray800">평가 페르소나 리스트입니다</Body3>
                    </div>

                    <div className="content">
                      <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">설문 문항</Body2>
                          <div
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "100%", // 또는 특정 픽셀값
                            }}
                          >
                            <span style={{ color: "#8C8C8C" }}>
                              {" "}
                              {`${getQuestionTitle(selectedQuestion[0])} `}{" "}
                            </span>{" "}
                            {quickSurveyAnalysis[selectedQuestion]?.question}
                          </div>
                        </li>

                        <li>
                          <Body2 color="gray500">페르소나 선택</Body2>
                          <Body2 color="gray500">
                            NPS는 favorite 페르소나를 기반으로 무작위 패널
                            100명을 섭외하여 진행합니다.
                          </Body2>
                        </li>
                      </ListBoxGroup>

                      <div className="content">
                        <TabContent5Item style={{ marginTop: "20px" }}>
                          <div className="title">
                            <Body1
                              color="gray800"
                              style={{ textAlign: "left" }}
                            >
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
                                페르소나 리스트를 확인하려면, 먼저 관심 있는
                                페르소나 20명을 즐겨찾기에 추가해 주세요. (
                                {
                                  personaListSaas.filter(
                                    (item) => item.favorite === true
                                  ).length
                                }{" "}
                                / 20)
                              </Body2>
                            </BoxWrap>
                          )}
                        </TabContent5Item>
                      </div>
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
                          handleSubmitReport();
                        }}
                        disabled={toolSteps >= 3}
                      >
                        다음
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
                    <LoadingContainer>
                      <WaitLongLodingBar />
                      <LoadingText color="gray700">
                        결과보고서를 작성하고 있습니다. (1분 정도 걸려요)
                      </LoadingText>
                    </LoadingContainer>
                  ) : (
                    <>
                      <BgBoxItem primaryLightest>
                        <H3 color="gray800">NPS 평가</H3>
                        <Body3 color="gray800">
                          페르소나가 지인에게 추천할 가능성을 기반으로 한 NPS
                          분석입니다.
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
                        <div className="title">
                          <H4 color="gray800" align="left">
                            Q. {quickSurveyAnalysis[selectedQuestion].question}
                          </H4>
                        </div>

                        {activeDesignTab === "emotion" && (
                          <>
                            {/* 각 질문 유형에 맞는 그래프 렌더링 */}
                            {selectedQuestion[0] === "ab_test" && ( // null 또는 undefined가 아닌지 확인 // 비어있지 않은 객체인지 확인
                              // quickSurveyStaticDataState &&
                              // typeof quickSurveyStaticDataState === "object" && // 객체 타입인지 확인
                              // Object.keys(quickSurveyStaticData).length > 0 &&
                              <ABGraph
                                onOptionSelect={setSelectedOption}
                                onOptionSelectIndex={setSelectedOptionIndex}
                                onBarClick={() => setShowToast(true)}
                              />
                            )}

                            {selectedQuestion[0] === "custom_question" &&
                              quickSurveyAnalysis[selectedQuestion]?.options
                                ?.length === 2 && (
                                // quickSurveyStaticDataState &&
                                // typeof quickSurveyStaticDataState === "object" &&
                                // Object.keys(quickSurveyStaticDataState).length >
                                //   0 &&
                                <BarChartLikertScale2
                                  onOptionSelect={setSelectedOption}
                                  onOptionSelectIndex={setSelectedOptionIndex}
                                  onBarClick={() => setShowToast(true)}
                                />
                              )}
                            {selectedQuestion[0] === "custom_question" &&
                              quickSurveyAnalysis[selectedQuestion]?.options
                                ?.length === 3 && (
                                // quickSurveyStaticDataState &&
                                // typeof quickSurveyStaticDataState === "object" &&
                                // Object.keys(quickSurveyStaticDataState).length >
                                //   0 &&
                                <BarChartLikertScale3
                                  onOptionSelect={setSelectedOption}
                                  onOptionSelectIndex={setSelectedOptionIndex}
                                  onBarClick={() => setShowToast(true)}
                                />
                              )}
                            {selectedQuestion[0] === "custom_question" &&
                              quickSurveyAnalysis[selectedQuestion]?.options
                                ?.length === 4 && (
                                // quickSurveyStaticDataState &&
                                // typeof quickSurveyStaticDataState === "object" &&
                                // Object.keys(quickSurveyStaticDataState).length >
                                //   0 &&
                                <BarChartLikertScale4
                                  onOptionSelect={setSelectedOption}
                                  onOptionSelectIndex={setSelectedOptionIndex}
                                  onBarClick={() => setShowToast(true)}
                                />
                              )}

                            {(selectedQuestion[0] === "importance" ||
                              selectedQuestion[0] === "single_choice" ||
                              (selectedQuestion[0] === "custom_question" &&
                                quickSurveyAnalysis[selectedQuestion]?.options
                                  ?.length === 5)) && (
                              // quickSurveyStaticDataState &&
                              // typeof quickSurveyStaticDataState === "object" &&
                              // Object.keys(quickSurveyStaticDataState).length >
                              //   0 &&
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  width: "100%",
                                }}
                              >
                                <BarChartLikertScale5
                                  onOptionSelect={setSelectedOption}
                                  onOptionSelectIndex={setSelectedOptionIndex}
                                  onBarClick={() => setShowToast(true)}
                                />
                              </div>
                            )}
                            {selectedQuestion[0] === "nps" && (
                              // quickSurveyStaticDataState &&
                              // typeof quickSurveyStaticDataState === "object" &&
                              // Object.keys(quickSurveyStaticDataState).length >
                              //   0 &&
                              <BarChartLikertScale11
                                onOptionSelect={setSelectedOption}
                                onOptionSelectIndex={setSelectedOptionIndex}
                                onBarClick={() => setShowToast(true)}
                              />
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
                                      {selectedQuestion[0] === "nps" ? (
                                        <>
                                          <div>
                                            {
                                              quickSurveyReport[0]
                                                ?.total_insight
                                                ?.nps_score_interpretation
                                            }
                                          </div>
                                          <br />
                                          <div>
                                            {
                                              quickSurveyReport[0]
                                                ?.total_insight
                                                ?.group_response_analysis
                                            }
                                          </div>
                                          <br />
                                          <div>
                                            {
                                              quickSurveyReport[0]
                                                ?.total_insight
                                                ?.enhancement_and_improvement_insight
                                            }
                                          </div>
                                        </>
                                      ) : (
                                        // 기존 non-NPS 로직
                                        <>
                                          {
                                            quickSurveyReport[0]?.total_insight
                                              ?.statistic
                                          }
                                          <br />
                                          <br />
                                          {
                                            quickSurveyReport[0]?.total_insight
                                              ?.insight
                                          }
                                        </>
                                      )}
                                    </InsightContent>
                                  </InsightSection>

                                  <InsightSection>
                                    <InsightLabel color="gray700">
                                      성별 의견 정리
                                    </InsightLabel>
                                    <InsightContent color="gray700">
                                      <>
                                        {
                                          quickSurveyReport[0]?.gender_insight
                                            ?.statistic
                                        }
                                        <br />
                                        <br />
                                        {
                                          quickSurveyReport[0]?.gender_insight
                                            ?.insight
                                        }
                                      </>
                                    </InsightContent>
                                  </InsightSection>

                                  <InsightSection>
                                    <InsightLabel color="gray700">
                                      연령별 의견 정리
                                    </InsightLabel>
                                    <InsightContent color="gray700">
                                      <>
                                        {
                                          quickSurveyReport[0].age_insight
                                            .statistic
                                        }
                                        <br />
                                        <br />
                                        {
                                          quickSurveyReport[0].age_insight
                                            .insight
                                        }
                                      </>
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
                            {(selectedQuestion[0] === "ab_test" ||
                              (selectedQuestion[0] === "custom_question" &&
                                quickSurveyAnalysis[selectedQuestion]?.options
                                  ?.length === 2)) && (
                              // quickSurveyStaticDataState &&
                              // typeof quickSurveyStaticDataState === "object" &&
                              // Object.keys(quickSurveyStaticDataState).length >
                              //   0 &&
                              <GraphChartScale2 />
                            )}
                            {selectedQuestion[0] === "custom_question" &&
                              quickSurveyAnalysis[selectedQuestion]?.options
                                ?.length === 3 && (
                                // quickSurveyStaticDataState &&
                                // typeof quickSurveyStaticDataState === "object" &&
                                // Object.keys(quickSurveyStaticDataState).length >
                                //   0 &&
                                <GraphChartScale3 />
                              )}
                            {selectedQuestion[0] === "custom_question" &&
                              quickSurveyAnalysis[selectedQuestion]?.options
                                ?.length === 4 && (
                                // quickSurveyStaticDataState &&
                                // typeof quickSurveyStaticDataState === "object" &&
                                // Object.keys(quickSurveyStaticDataState).length >
                                //   0 &&
                                <GraphChartScale4 />
                              )}
                            {(selectedQuestion[0] === "importance" ||
                              selectedQuestion[0] === "single_choice" ||
                              (selectedQuestion[0] === "custom_question" &&
                                quickSurveyAnalysis[selectedQuestion]?.options
                                  ?.length === 5)) && (
                              // quickSurveyStaticDataState &&
                              // typeof quickSurveyStaticDataState === "object" &&
                              // Object.keys(quickSurveyStaticDataState).length >
                              //   0 &&
                              <GraphChartScale5 />
                            )}

                            {selectedQuestion[0] === "nps" && (
                              // quickSurveyStaticDataState &&
                              // typeof quickSurveyStaticDataState === "object" &&
                              // Object.keys(quickSurveyStaticDataState).length >
                              //   0 &&
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

      {showCreatePersonaPopup &&
        (eventState && !educationState ? (
          <PopupWrap
            Event
            title="NPS "
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditCreateTool} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => {
              setShowCreatePersonaPopup(false);
              navigate("/Tool");
            }}
            onConfirm={handleConfirmCredit}
          />
        ) : trialState && !educationState ? (
          <PopupWrap
            Check
            title="NPS "
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditCreateTool} 크레딧)
                <br />
                신규 가입 2주간 무료로 사용 가능합니다.
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => {
              setShowCreatePersonaPopup(false);
              navigate("/Tool");
            }}
            onConfirm={handleConfirmCredit}
          />
        ) : (
          <PopupWrap
            Check
            title="NPS "
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditCreateTool} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => {
              setShowCreatePersonaPopup(false);
              navigate("/Tool");
            }}
            onConfirm={handleConfirmCredit}
          />
        ))}

      {showCreditPopup && (
        <PopupWrap
          Warning
          title="크레딧이 모두 소진되었습니다"
          message={
            <>
              보유한 크레딧이 부족합니다.
              <br />
              크레딧을 충전한 후 다시 시도해주세요.
            </>
          }
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={() => {
            setShowCreditPopup(false);
            navigate("/Tool");
          }}
          onConfirm={() => {
            setShowCreditPopup(false);
            navigate("/Tool");
          }}
        />
      )}
    </>
  );
};

export default PageNps;

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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled(Body2)`
  margin-top: 12px;
  text-align: center;
`;
