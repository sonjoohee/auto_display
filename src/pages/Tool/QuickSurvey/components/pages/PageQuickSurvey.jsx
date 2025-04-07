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
  QUICK_SURVEY_ANALYSIS
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
  InterviewXQuickSurveyRequest,
  InterviewXDesignEmotionAnalysisRequest,
  InterviewXDesignEmotionTargetRequest,
  InterviewXDesignEmotionScaleRequest,
  createToolOnServer,
  updateToolOnServer,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import AnalysisItem from "../molecules/MoleculeAnalysisItem";
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";
import MoleculeDetailSetting from '../molecules/MoleculeDetailSetting';
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import MoleculePersonaSelect from "../molecules/MolculePersonaSelect";
import MolculePresetPersona from "../molecules/MolculePresetPersona";

const PageQuickSurvey = () => {

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
  const [quickSurveyAnalysis, setQuickSurveyAnalysis] = useAtom(QUICK_SURVEY_ANALYSIS);
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
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [activeDesignTab, setActiveDesignTab] = useState("emotion");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isLoadingDetailSetting, setIsLoadingDetailSetting] = useState(false);
  const [businessDescriptionTitle, setBusinessDescriptionTitle] = useState("");
  const [state, ] = useState({
    isExpanded: false,
    showQuestions: false,
  });
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [recruitingCondition, setRecruitingCondition] = useState("");

  const [customPersonaForm, setCustomPersonaForm] = useState({
    gender: "",
    ageGroups: [],
    regions: [],
    incomes: [],
  });
  const [selectBoxStates, setSelectBoxStates] = useState({
    gender: false,
    ageGroup: false,
    region: false,
    income: false,
  });
  const [selectedValues, setSelectedValues] = useState({
    gender: "",
    ageGroup: "",
    region: "",
    income: "",
  });
  const [interviewModeType, setInterviewModeType] = useState("");
  const [selectedInterviewMode, setSelectedInterviewMode] = useState(false);
  const [personaList, setPersonaList] = useState([]);
  const [isLoadingPreset, setIsLoadingPreset] = useState(false);
  const [presetPersonaData, setPresetPersonaData] = useState([]);
  const [selectedPresetCards, setSelectedPresetCards] = useState({});

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;
// console.log(project)

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

          // selectedQuestion 상태 업데이트
          setSelectedQuestion(selectedIndices);

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
      handleFormChange("gender", value === "남성" ? "male" : "female");
    } else if (type === "age") {
      handleFormChange("ageGroups", value.split(", "));
    } else if (type === "region") {
      handleFormChange("regions", value.split(", "));
    } else if (type === "income") {
      handleFormChange("incomes", value.split(", "));
    }
  };

  const handleFormChange = (field, value) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      [field]: value,
    }));
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
          target: project.projectAnalysis.target_customer,
          business_model: project.businessModel,
          sector: project.industryType,
          country: project.targetCountry,
          goal: projectDescription
        };

        // API 요청
        const response = await InterviewXQuickSurveyRequest(
          Data,
          isLoggedIn
        );

        console.log(response.response.quick_survey_question)

        const responseToolId = await createToolOnServer(
          {
            projectId: project._id,
            type: "ix_quick_survey_question",
          },
          isLoggedIn
        );

        setToolId(responseToolId);

        setQuickSurveyAnalysis(
          response.response.quick_survey_question
        );

        await updateToolOnServer(
          responseToolId,
          {
            quickSurveyAnalysis: response.response.quick_survey_question,
            business: businessDescription,
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
    }
    else {
      handleNextStep(1);

      await updateToolOnServer(
        toolId,
        {
          selectedQuestion: selectedQuestion,
          surveyMethod: quickSurveyAnalysis[selectedQuestion],
          // completedStep: 1,
        }, 
        isLoggedIn
      );
      
      setToolSteps(1);
    }
  };

  // const handleSubmitQuestionSelection = async () => {
  //   handleNextStep(1);

  //   await updateToolOnServer(
  //     toolId,
  //     {
  //       selectedQuestion: selectedQuestion,
  //       // completedStep: 1,
  //     }, 
  //     isLoggedIn
  //   );
    
  //   setToolSteps(1);
  // };


  const handleSubmitSelfSelect = async () => {
    // setToolSteps(2);
    setIsLoadingDetailSetting(true);
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      const dummyPersonaList = [
        {
          _id: "1",
          name: "피부 표현 완벽주의자",
          gender: "여성",
          age: "28세",
          job: "뷰티 유튜버",
          profile: "다양한 파운데이션 제품을 사용하고 리뷰하는 뷰티 유튜버입니다. 깨끗하고 잡티 없는 피부 표현을 위해 파운데이션의 커버력, 지속력, 피부 표현 방식에 매우 민감합니다. K-뷰티 트렌드에 맞춰 자연스러운 피부 표현을 선호하며, 새로운 제품을 적극적으로 시도하고 정보를 공유합니다. 본인의 유튜브 채널을 통해 제품 리뷰, 메이크업 튜토리얼을 제공하며, 구독자들과 소통합니다.",
          insight: "파운데이션의 사용감, 커버력, 지속력에 대한 실제 사용 후기를 통해 제품의 장단점을 파악하고, 소비자들에게 어필할 수 있는 핵심적인 특징을 도출할 수 있습니다.",
  
        },
        {
          _id: "2",
          name: "민감성 피부 케어 전문가",
          gender: "여성",
          age: "35세",
          job: "피부과 간호사",
          profile: "민감성 피부를 위한 화장품 선택에 신중하며, 제품의 성분과 피부 트러블 유발 가능성에 대한 정보를 중요하게 생각합니다. 피부 자극을 최소화하고, 피부 건강을 개선하는 데 초점을 맞춘 제품을 선호합니다. 파운데이션 구매 시, 성분, 제형, 사용감 등을 꼼꼼하게 따져보고, 피부에 안전한 제품을 선택합니다. 피부 관련 전문 지식을 바탕으로 제품 선택에 대한 조언을 구합니다.",
          insight: "민감성 피부를 가진 소비자들이 파운데이션 선택 시 가장 중요하게 고려하는 요소와 제품 사용 후 나타나는 피부 변화에 대한 정보를 얻어, 제품 개발 및 마케팅 전략에 활용할 수 있습니다.",
        
        },
        {
          _id: "3",
          name: "워킹맘의 간편 메이크업 추구자",
          gender: "여성",
          age: "38세",
          job: "회사원",
          profile: "출근과 육아를 병행하며, 짧은 시간 안에 완벽한 메이크업을 완성하는 것을 목표로 합니다. 파운데이션 선택 시, 간편한 사용법, 뛰어난 지속력, 빠른 피부 표현 효과를 중요하게 생각합니다. 촉촉한 사용감과 자연스러운 피부 표현을 선호하며, 수정 화장을 최소화할 수 있는 제품을 찾습니다. 온라인 쇼핑을 통해 제품을 구매하고, 다른 워킹맘들의 사용 후기를 참고합니다.",
          insight: "시간이 부족한 워킹맘들이 파운데이션에 기대하는 기능과 사용성을 파악하여, 제품 개발 및 마케팅 전략에 반영하고, 핵심 타겟층을 공략할 수 있습니다.",
        
        }
      ];
      
  
      setPersonaList(dummyPersonaList);

      // const Data = {
      //   type: "ix_quick_survey_persona_group",
      //   business_description: businessDescription,
      //   goal: projectDescription,
      //   // recruitment_criteria: quickSurveyAnalysis[selectedQuestion],
      //   // survey_method: quickSurveyAnalysis[selectedQuestion]
      // };

      // const response = await InterviewXQuickSurveyRequest(
      //   Data,
      //   isLoggedIn
      // );

      // console.log(response)
      // setPersonaList(response.response.persona_group)


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
      
      await new Promise(resolve => setTimeout(resolve, 1500));
     
    // 더미 데이터 추가
const dummyPersonaData = [
  {
    _id: "1",
    personaName: "20대 직장인",
    personaCharacteristics: "가격대 범에 따가를 보내는 젊은 지원형 소비자",
    status: "complete",
  },
  {
    _id: "2",
    personaName: "30대 주부",
    personaCharacteristics: "가격대 범에 따가를 보내는 젊은 지원형 소비자",
    status: "complete",
  },
  {
    _id: "3",
    personaName: "대학생",
    personaCharacteristics: "가격대 범에 따가를 보내는 젊은 지원형 소비자",
    status: "complete",
  },
  {
    _id: "4",
    personaName: "40대 전문직",
    personaCharacteristics: "가격대 범에 따가를 보내는 젊은 지원형 소비자",
    status: "complete",
  }
];

  setPresetPersonaData(dummyPersonaData);

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
      
      await new Promise(resolve => setTimeout(resolve, 1500));
     
      setToolSteps(3);

      // const selectedPersonaData = designAnalysisEmotionAnalysis.filter(
      //   (persona, index) => selectedQuestion.includes(index)
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

 

  const handlePresetCardSelection = (personaId) => {
    setSelectedPresetCards(prev => ({
      ...prev,
      [personaId]: !prev[personaId]
    }));
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
      if (currentUrl.toLowerCase().includes("quick_survey")) {
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


    // handleInputChange 함수 수정
    const handleInputChange = (field, value) => {
      // formData 대신 개별 상태 업데이트
      if (field === "projectDescription") {
        setProjectDescription(value);
      }
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
                disabled={!completedSteps.includes(1) ||  isLoading || isLoadingReport }
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
                disabled={!completedSteps.includes(2) ||  isLoading || isLoadingReport }
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
                      다수의 페르소나에게 빠르게 확인하고 싶은 내용은 무엇인가요? 
                      </Body3>
                    </div>

                    <div className="content">
                      <TabContent5Item required>
                        <Title>
                          <Body1 color="gray700">Quick Survey로 확인하고 싶은 내용이 무엇인가요?</Body1>
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
                            disabled={completedSteps.includes(2) ||  Object.keys(quickSurveyAnalysis).length > 0 }
                          />
                          <Body2 color="gray300" align="right">
                            {descriptionLength} / 150
                          </Body2>
                        </FormBox>
                      </TabContent5Item>
                    </div>
                    {isLoading ? (
                      <div style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          minHeight: "200px",
                          alignItems: "center",
                      }}>
                        <AtomPersonaLoader message="로딩 중..." />
                      </div>
                    ) : (
                      <>
                        {quickSurveyAnalysis && Object.keys(quickSurveyAnalysis).length > 0 && (
                          <div className="content">
                          <>
                            <div className="title">
                              <Body1
                                color="gray700"
                                style={{ textAlign: "left", marginBottom: "-20px" }}
                              >
                                💡문항 선택
                              </Body1>
                            </div>
                            {/* 로딩 후 보여질 컴포넌트 */}
                            {Object.entries(quickSurveyAnalysis).map(([key, value]) => {
                              const getTitleByKey = {
                                'ab_test': 'A/B 테스트',
                                'importance': '경험 평가 질문',
                                'nps': 'NPS 질문',
                                'single_choice': '단일 선택형'
                              };

                              // const getDetails = (value) => {
                              //   if (key === 'single_choice') return value.options;
                              //   if (key === 'ab_test') return [value.option_a, value.option_b];
                              //   return [value.options];
                              // };

                              return (
                                <MoleculeDesignItem
                                  FlexStart
                                  key={key}
                                  id={key}
                                  title={getTitleByKey[key]}
                                  question={quickSurveyAnalysis}
                                  subtitle={value.question}
                                  // details={getDetails(value)}
                                  isSelected={selectedQuestion.includes(key)}
                                  onSelect={() => handleCheckboxChange(key)}
                                  disabled={toolSteps >= 1}
                                />
                              );
                            })}
                          </>
                          </div>
                        )}
                        {/* 버튼들을 content div 바깥으로 이동 */}
                        {quickSurveyAnalysis && Object.keys(quickSurveyAnalysis).length > 0 ? (
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <Button
                            Other
                            Primary
                            Fill
                            Round
                            onClick={handleSubmitBusinessInfo}  // 재생성 핸들러로 변경 필요
                          >
                           
                              재생성
                            
                          </Button>
                          <Button
                            Other
                            Primary
                            Fill
                            Round
                            onClick={handleSubmitBusinessInfo}
                            disabled={selectedQuestion.length === 0}
                          >
                            다음
                          </Button>
                        </div>
                          
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
                      ) : (
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
                      Quick Survey에 참여할 페르소나에 대해서 알려주세요. 바로 리크루팅해드릴게요 !
                      </Body3>
                    </div>

                    <div className="content">
                    <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">
                          설문 주제
                          </Body2>
                          <Body2 color="gray800">
                                {quickSurveyAnalysis[selectedQuestion].question}
                          </Body2>
                        </li>
                        <li style={{ alignItems: "flex-start" }}>
                          <Body2 color="gray500">리쿠르팅 조건</Body2>
                          {recruitingCondition ? (
                            <Body2 color="gray800" style={{ textAlign: "left" }}>
                              {recruitingCondition}
                            </Body2>
                          ) : (
                            <Body2 color="gray300">
                              선택해 주세요.
                            </Body2>
                          )}
                        </li>
                        <li>
                        <Body2 color="gray500">상세 조건</Body2>
                        {selectedValues.gender || selectedValues.age || selectedValues.region || selectedValues.income ? (
                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '8px' 
                          }}>
                            {(() => {
                              const totalValues = Object.values(selectedValues).filter(value => value); // 선택된 값들
                              const irrelevantCount = totalValues.filter(value => value === "상관없음").length; // "상관없음" 개수

                              if (totalValues.length === 4 && irrelevantCount === 4) {
                                // "상관없음"이 정확히 4개일 때만 하나로 표시
                                return (
                                  <div style={{
                                    padding: '4px 12px',
                                    borderRadius: '16px',
                                    backgroundColor: '#F7F8FA',
                                    display: 'inline-flex',
                                    alignItems: 'center'
                                  }}>
                                    <Body2 color="gray800">상관없음</Body2>
                                  </div>
                                );
                              } else {
                                // 그 외의 경우는 모든 선택된 값을 표시
                                return Object.entries(selectedValues)
                                  .filter(([_, value]) => value)
                                  .map(([key, value]) => (
                                    <div key={key} style={{
                                      padding: '4px 12px',
                                      borderRadius: '16px',
                                      backgroundColor: '#F7F8FA',
                                      display: 'inline-flex',
                                      alignItems: 'center'
                                    }}>
                                      <Body2 color="gray800">{value}</Body2>
                                    </div>
                                  ));
                              }
                            })()}
                          </div>
                        ) : (
                          <Body2 color="gray300">
                            선택해 주세요.
                          </Body2>
                        )}
                        </li>
                        <li>
                          <Body2 color="gray500">
                          페르소나 수
                          </Body2>
                          <Body2 color="gray800">
                           30 명
                          </Body2>
                        </li>
                      </ListBoxGroup>
                        
                   {isLoadingDetailSetting ? (
                        <div style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          minHeight: "200px",
                          alignItems: "center",
                        }}>
                          <AtomPersonaLoader message="로딩 중..." />
                        </div>
                      ) : personaList.length > 0 ? (
                        <TabContent5Item>
                          <div className="title">
                            <Body1 color="gray700">🚩 Quick Survey 참여 페르소나 리스트</Body1>
                          </div>
                          <MoleculePersonaSelect
                          
                              filteredPersonaList={personaList}
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
                              onClick={() => setInterviewModeType("selfQuestion")}
                            >
                              <CardWrapper>
                                <CheckboxWrapper>
                                  <CheckCircle
                                    as="input"
                                    type="radio"

                                    id="selfQuestion"
                                    name="interviewMode"
                                    checked={interviewModeType === "selfQuestion"}
                                    onChange={() =>
                                      setInterviewModeType("selfQuestion")
                                    }
                                  />
                                </CheckboxWrapper>
                                <CardContent>
                                  <div>
                                    <Body2 color="gray700">설문 대상 직접 설정</Body2>
                                    <Body3
                                      style={{ marginTop: "10px" }}
                                      color="gray500"
                                    >
                                      성별, 연령, 지역, 소득 등 원하는 설문 대상 기준을 직접 설정해 타겟 응답자의 의견을 수집할 수 있어요. 
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
                                handlePresetPersona();
                               
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
                                    // onChange={() => {
                                    //   setInterviewModeType("moderator");
                                    //   setIsLoadingPreset(true);
                                    //   setTimeout(() => {
                                    //     setIsLoadingPreset(false);
                                    //   }, 1500);
                                    // }}
                                  />
                                </CheckboxWrapper>
                                <CardContent>
                                  <div>
                                    <Body2 color="gray700">
                                     맞춤형 응답자 추천
                        </Body2>
                                    <Body3
                                      style={{ marginTop: "10px" }}
                                      color="gray500"
                                    >
                                      비즈니스와 설문 내용에 맞춰 가장 적합한 페르소나를 분석하여 최적의 응답자 그룹을 추천해드려요.   
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
                                    onChange={(e) => setRecruitingCondition(e.target.value)}
                                  />
                                  <div style={{ 
                                    display: 'flex', 
                                    flexWrap: 'wrap', 
                                    gap: '8px', 
                                  }}>
                                    <TagButton>
                                      <Body2 color="gray700" style={{ fontSize: "14px" }}>리쿠르팅 조건 도출</Body2>
                                    </TagButton>
                                    <TagButton>
                                      <Body2 color="gray700" style={{ fontSize: "14px" }}>리쿠르팅 조건 도출</Body2>
                                    </TagButton>
                                    <TagButton>
                                      <Body2 color="gray700" style={{ fontSize: "14px" }}>리쿠르팅 조건 도출</Body2>
                                    </TagButton>
                                  </div>
                                </TabContent5Item>

                                <div className="title" style={{ marginTop: "30px" }}> 
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

                            {interviewModeType === "moderator" && (
                              isLoadingPreset ? (
                                <div style={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  minHeight: "200px",
                                  alignItems: "center",
                                }}>
                                  <AtomPersonaLoader message="로딩 중..." />
                                </div>
                              ) : (
                                <TabContent5Item>
                                  <div className="title">
                                    <Body1 color="gray700">💡Quick Survey에 최적화된 페르소나 집단을 추천 드려요 </Body1>
                                  </div>
                                  <MolculePresetPersona
                                    personaData={presetPersonaData}
                                    selectedCards={selectedPresetCards}
                                    onCardSelect={handlePresetCardSelection}
                                  />

                                </TabContent5Item>
                              )
                            )}

                        </TabContent5Item>
                        
    
                      )}
                    </div>
                    

                    {isLoadingDetailSetting ? (
                      <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        minHeight: "200px",
                        alignItems: "center",
                      }}>
                        {/* <AtomPersonaLoader message="로딩 중..." /> */}
                      </div>
                    ) : (
                        <Button
                        Other
                          Primary
                        Fill
                        Round
                        onClick={() => {
                          if (personaList.length > 0) {
                            handleSubmitPersonas(); //마지막 보고서 함수
                           
                          } else {
                            if(interviewModeType === "selfQuestion"){
                              handleSubmitSelfSelect();
                            } else {
                              handleSubmitPersonas();
                            }
                          }
                        }}
                        disabled={!interviewModeType}
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
                      페르소나 그룹의 의견을 확인하여 타겟 반응을 사전에 확인해보세요.
                      </Body3>
                    </BgBoxItem>

                    <InsightAnalysis>
                      <div className="title">
                      
                      </div>
                    </InsightAnalysis>

                    <InsightAnalysis>
                      <div className="title">
                        <H4 color="gray800" align="left">
                        Q. 이 제품/서비스의 핵심 강점으로 가장 가까운 것은 무엇이라고 느꼈나요? 
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
  background-color:  #F7F8FA;
  border: none;
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
  padding: 8px 0;

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
