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
  IDEA_GENERATION_START_POSITION,
  IDEA_GENERATION_IDEA_LIST,
  CUSTOMER_JOURNEY_MAP_REPORT,
  CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA,
  IDEA_GENERATION_PROBLEM_LIST,
  PERSONA_LIST_SAAS,
  IDEA_GENERATION_MANDALART_DATA,
  IDEA_GENERATION_PROBLEM_LIST_TITLE,
  IDEA_GENERATION_SELECTED_START_POSITION,
  IDEA_GENERATION_SELECTED_MANDALART
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
  Caption1,
} from "../../../../../assets/styles/Typography";
import {
  InterviewXDesignEmotionAnalysisRequest,
  InterviewXDesignEmotionTargetRequest,
  InterviewXDesignEmotionScaleRequest,
  createToolOnServer,
  updateToolOnServer,
  EducationToolsRequest,
  getFindToolListOnServerSaas,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import AnalysisItem from "../molecules/MoleculeAnalysisItem";
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";
import MoleculeDeleteForm from "../../../public/MoleculeDeleteForm";
import MandalArtGraph from "../../../../../components/Charts/MandalArtGraph";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import MoleculeTagList from "../molecules/MoleculeTagList";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import MoleculeMandalArtGraph from "../molecules/MoleculeMandalArtGraph";

const PageIdeaGeneration = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [, setDesignAnalysisBusinessTitle] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_TITLE
  );
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [designAnalysisBusinessInfo, setDesignAnalysisBusinessInfo] = useAtom(
    DESIGN_ANALYSIS_BUSINESS_INFO
  );
  const [ideaGenerationSelectedStartPosition, setIdeaGenerationSelectedStartPosition] = useAtom(IDEA_GENERATION_SELECTED_START_POSITION);
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
  const [ideaGenerationStartPosition, setIdeaGenerationStartPosition] = useAtom(
    IDEA_GENERATION_START_POSITION
  );
  const [ideaGenerationIdeaList, setIdeaGenerationIdeaList] = useAtom(
    IDEA_GENERATION_IDEA_LIST
  );

  const [ideaGenerationProblemList, setIdeaGenerationProblemList] = useAtom(
    IDEA_GENERATION_PROBLEM_LIST
  );
  const [ideaGenerationMandalArtData, setIdeaGenerationMandalArtData] = useAtom(
    IDEA_GENERATION_MANDALART_DATA
  );
  const [ideaGenerationProblemListTitle, setIdeaGenerationProblemListTitle] = useAtom(
    IDEA_GENERATION_PROBLEM_LIST_TITLE
  );
  const [ideaGenerationSelectedMandalart, setIdeaGenerationSelectedMandalart] = useAtom(IDEA_GENERATION_SELECTED_MANDALART);

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
  const [state] = useState({
    isExpanded: false,
    showQuestions: false,
  });
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [targetCustomer, setTargetCustomer] = useState([]);
  const [toolSteps, setToolSteps] = useState(0);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: ""
  });
  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false
  });
  const [dropUpStates, setDropUpStates] = useState({
    customerList: false
  });
  const [, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedStartPosition, setSelectedStartPosition] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // 첫 로딩 체크를 위한 상태
  const [selectedJourneyMapData, setSelectedJourneyMapData] = useState([]);
  const[customerJourneyMapSelectedPersona, setCustomerJourneyMapSelectedPersona] = useState([]);
  const[customerJourneyMapReport, setCustomerJourneyMapReport] = useState([]);

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


  const business = {
    business: businessDescription,
    target: project?.projectAnalysis?.target_customer || "",
    business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };

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
    setSelectedStartPosition(selected);
  };

  const handleSubmitProblem = async () => {
    try {
    setIsLoading(true);
      await updateToolOnServer(
        toolId,
        {
          completedStep: 1,
          selectedPurposes: selectedPurposes,
          ideaGenerationProblemList: ideaGenerationProblemList,
          ideaGenerationProblemListTitle: ideaGenerationProblemListTitle,
        },
        isLoggedIn
      );  
          // 빈 문자열이나 공백만 있는 항목 제거
      const validItems = ideaGenerationProblemList.filter(item => item.trim() !== "");

      if (validItems.length === 0) {
        // 유효한 항목이 없는 경우 처리
        return;
      }

      // // API 요청 데이터 구성
      // const Data = {
      //   type : "ix_idea_generation_keyword_education",
      //   info: customerJourneyMapSelectedPersona,
      //   problem_needs : validItems,
      //   is_load:  true
      // };

      // // API 호출
      // const response = await EducationToolsRequest (
      //  Data,
      //   isLoggedIn
      // );
      // console.log(response);
      

      // setIdeaGenerationStartPosition(response.response.idea_generation_keyword_education);

       const dummydata  = 
       [
       {
        "problem": "배송 및 설치 과정의 불안감, 구매 후 관리 및 지원 부재에 대한 우려",
        "content": [
          {
            "idea": "안심 배송 시스템",
            "description": "제품의 안전한 배송을 보장하고, 배송 과정에 대한 정보를 실시간으로 제공합니다. (예: 배송 추적, 파손 보험, 안심 포장) 사용자는 배송 과정에 대한 불안감을 해소하고, 안심하고 제품을 받을 수 있습니다.",
            "problem": "배송 및 설치 과정의 불안감, 구매 후 관리 및 지원 부재에 대한 우려",
          },
          {
            "idea": "설치 서비스 연계",
            "description": "제품 설치 서비스를 제공하거나, 신뢰할 수 있는 설치 업체와 연계하여, 사용자들이 제품 설치에 대한 어려움을 덜도록 합니다. 설치 과정에 대한 안내, 문제 발생 시의 지원 등을 제공합니다.",
            "problem": "배송 및 설치 과정의 불안감, 구매 후 관리 및 지원 부재에 대한 우려",
          },
          {
            "idea": "사후 관리 및 AS 지원",
            "description": "제품 구매 후에도 지속적인 관리 및 AS 지원을 제공합니다. 제품 사용 팁, 관리 방법, 문제 발생 시의 대처법 등을 제공하고, AS 접수 및 처리 과정을 간소화합니다.",
            "problem": "배송 및 설치 과정의 불안감, 구매 후 관리 및 지원 부재에 대한 우려",
          }
        ]
      },
        {
          "problem": "배송 및 설=리 및 지원 부재에 대한 우려",
          "content": [
            {
              "idea": "안심 배=스템",
              "description": "제품의 안전한 배송을 보장하고, 배송 과정에 대한 정보를 실시간으로 제공합니다. (예: 배송 추적, 파손 보험, 안심 포장) 사용자는 배송 과정에 대한 불안감을 해소하고, 안심하고 제품을 받을 수 있습니다.",
              "problem": "배송 및 설치 과정의 불안감, 구매 후 관리 및 지원 부재에 대한 우려",
            },
            {
              "idea": "설치 서비===스 연계",
              "description": "제품 설치 서비스를 제공하거나, 신뢰할 수 있는 설치 업체와 연계하여, 사용자들이 제품 설치에 대한 어려움을 덜도록 합니다. 설치 과정에 대한 안내, 문제 발생 시의 지원 등을 제공합니다.",
              "problem": "배송 및 설치 과정의 불안감, 구매 후 관리 및 지원 부재에 대한 우려",
            },
            {
              "idea": "사후 및 AS 지원",
              "description": "제품 구매 후에도 지속적인 관리 및 AS 지원을 제공합니다. 제품 사용 팁, 관리 방법, 문제 발생 시의 대처법 등을 제공하고, AS 접수 및 처리 과정을 간소화합니다.",
              "problem": "배송 및 설치 과정의 불안감, 구매 후 관리 및 지원 부재에 대한 우려",
            }
          ]
        }

       ]

      setIdeaGenerationStartPosition(dummydata);

      // API 호출 로직...
      setIsLoading(false);

      handleNextStep(1);
    } catch (error) {
      console.error("Error submitting problems:", error);
      setShowPopupError(true);
    }
  };
 

  const handleSubmitTheme = async () => {
    handleNextStep(2);
    setToolSteps(2);

  };


  console.log("ideaGenerationStartPosition", ideaGenerationStartPosition);


  const handlePurposeSelect = async (purpose, selectBoxId, item) => {
    setIsContentLoading(true);

    const responseToolId = await createToolOnServer(
      {
        projectId: project._id,
        type: "ix_idea_generation_problem_education",
      },
      isLoggedIn
    );
    setToolId(responseToolId);


    setSelectedPurposes((prev) => ({
      ...(prev || {}),
      [selectBoxId]: purpose || "",
    }));

    handleContactInputChange("purpose", purpose || "");
    setSelectBoxStates((prev) => ({
      ...(prev || {}),
      [selectBoxId]: false,
    }));

    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      if (selectBoxId === "customerList" && item) {
        setSelectedJourneyMapData(item);
        // console.log("Selected Journey Map Data:", item);

        setBusinessDescription(purpose || "");

        const data = {
          type: "ix_idea_generation_problem_education",
          customer_journey_map_persona: item.customerJourneyMapSelectedPersona,
          customer_journey_map_report: item.customerJourneyMapReport,
        };

        setCustomerJourneyMapSelectedPersona(item.customerJourneyMapSelectedPersona);
        setCustomerJourneyMapReport(item.customerJourneyMapReport);
    
        const response = await EducationToolsRequest(
          data,
          isLoggedIn
        );

        setIdeaGenerationProblemList(response.response.idea_generation_problem_education);
        setIdeaGenerationProblemList(
          response.response.idea_generation_problem_education.map(item => item.title)
        );

      }
   

      // await updateToolOnServer(
    //   responseToolId,
      //   {
    //    selectedPurposes: selectedPurposes,
    //    ideaGenerationProblemList: ideaGenerationProblemList,
    //    ideaGenerationProblemListTitle: ideaGenerationProblemListTitle,
      //   },
      //   isLoggedIn
      // );

  
    } catch (error) {
      console.error("Error in handlePurposeSelect:", error);
      setShowPopupError(true);
    } finally {
      setTimeout(() => {
        setIsContentLoading(false);
      }, 500);
    }
  };

  const handleMandalArt = async () => {
    handleNextStep(3);
    setToolSteps(3);
    setIsLoadingReport(true);

    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const persona_group = personaListSaas
  .filter(persona => persona?.favorite === true)
  .map(persona => ({
    personaName: persona.personaName,
    personaCharacteristics: persona.personaCharacteristics,
    type: persona.type,
    age: persona.age,
    gender: persona.gender,
    job: persona.job,
    keywords: persona.keywords
  }));

  try {
    console.log("ideaGenerationStartPosition", ideaGenerationStartPosition);
    console.log("ideaGenerationSelectedStartPosition", ideaGenerationSelectedStartPosition);

    const Data = {
      type: "ix_idea_generation_interview_education",
      business:business,
      idea_theme: ideaGenerationSelectedStartPosition,
      persona_group:persona_group,
    }
   

    const data = {
      type: "ix_idea_generation_mandalart_education",
      idea_generation_start_position: ideaGenerationStartPosition,
     idea_generation_selected_start_position: ideaGenerationSelectedStartPosition,
      project_description: projectDescription,
  
    };

    // const apiResults = [];

   // 8번의 API 호출을 순차적으로 실행
  //  for (let i = 0; i < 8; i++) {
  //   const response = await EducationToolsRequest({
  //     ...baseData,
  //     position: i + 1  // API 호출마다 다른 position 값 전달
  //   }, isLoggedIn);
    
  //   apiResults.push(response.response.idea_generation_mandalart_education);
  // }

    // 결과를 만달아트 형식으로 구성
    // const mandalartData = {
    //   center: {
    //     id: 5,
    //     text: projectDescription, // 또는 적절한 중심 주제
    //     isCenter: true
    //   },
    //   items: apiResults.map((result, index) => ({
    //     id: index + 1,
    //     text: result.mainIdea, // API 응답에서 적절한 필드 사용
    //     isCenter: false,
    //     subItems: result.subIdeas.map((subIdea, subIndex) => ({
    //       id: subIndex + 1,
    //       text: subIdea,
    //       isCenter: subIndex === 4 ? true : false
    //     }))
    //   }))
    // };

    // setIdeaGenerationMandalArtData(mandalartData);


  } catch (error) {
    console.error("Error in handleMandalArt:", error);
    setShowPopupError(true);
  } finally {
    setIsLoadingReport(false);
  }


    // API 호출 대신 더미데이터 생성
  const dummyMandalartData = {
    center: {
      id: 5,
      text: "사용자 경험 개선",
      isCenter: true
    },
    items: [
      {
        id: 1,
        text: "UI/UX 개선",
        isCenter: false,
        subItems: [
          { id: 1, text: "직관적인 네비게이션 구현" },
          { id: 2, text: "사용자 피드백 시스템 도입" },
          { id: 3, text: "모바일 최적화" },
          { id: 4, text: "접근성 향상" },
          { id: 5, text: "UI/UX 개선", isCenter: true },
          { id: 6, text: "사용자 행동 분석" },
          { id: 7, text: "디자인 시스템 구축" },
          { id: 8, text: "성능 최적화" },
          { id: 9, text: "에러 처리 개선" }
        ]
      },
      {
        id: 2,
        text: "성능 최적화",
        isCenter: false,
        subItems: [
          { id: 1, text: "로딩 시간 단축" },
          { id: 2, text: "캐시 시스템 도입" },
          { id: 3, text: "이미지 최적화" },
          { id: 4, text: "코드 스플리팅" },
          { id: 5, text: "성능 최적화", isCenter: true },
          { id: 6, text: "데이터베이스 최적화" },
          { id: 7, text: "CDN 활용" },
          { id: 8, text: "서버 응답 시간 개선" },
          { id: 9, text: "리소스 관리" }
        ]
      },
      {
        id: 3,
        text: "보안 강화",
        isCenter: false,
        subItems: [
          { id: 1, text: "암호화 시스템 강화" },
          { id: 2, text: "인증 시스템 개선" },
          { id: 3, text: "보안 감사 실시" },
          { id: 4, text: "취약점 분석" },
          { id: 5, text: "보안 강화", isCenter: true },
          { id: 6, text: "접근 권한 관리" },
          { id: 7, text: "데이터 백업 시스템" },
          { id: 8, text: "보안 모니터링" },
          { id: 9, text: "사고 대응 체계" }
        ]
      },
      {
        id: 4,
        text: "데이터 동기화",
        isCenter: false,
        subItems: [
          { id: 1, text: "실시간 동기화" },
          { id: 2, text: "충돌 해결 시스템" },
          { id: 3, text: "백업 자동화" },
          { id: 4, text: "버전 관리" },
          { id: 5, text: "데이터 동기화", isCenter: true },
          { id: 6, text: "데이터 정합성 검증" },
          { id: 7, text: "동기화 로그 관리" },
          { id: 8, text: "오프라인 지원" },
          { id: 9, text: "에러 복구 시스템" }
        ]
      },
      {
        id: 6,
        text: "사용자 지원",
        isCenter: false,
        subItems: [
          { id: 1, text: "챗봇 시스템 도입" },
          { id: 2, text: "FAQ 시스템 개선" },
          { id: 3, text: "실시간 상담" },
          { id: 4, text: "피드백 관리" },
          { id: 5, text: "사용자 지원", isCenter: true },
          { id: 6, text: "매뉴얼 제작" },
          { id: 7, text: "교육 자료 제공" },
          { id: 8, text: "커뮤니티 관리" },
          { id: 9, text: "지원 품질 관리" }
        ]
      },
      {
        id: 7,
        text: "기능 확장",
        isCenter: false,
        subItems: [
          { id: 1, text: "신규 기능 개발" },
          { id: 2, text: "API 확장" },
          { id: 3, text: "서드파티 연동" },
          { id: 4, text: "customization" },
          { id: 5, text: "기능 확장", isCenter: true },
          { id: 6, text: "플러그인 시스템" },
          { id: 7, text: "확장성 설계" },
          { id: 8, text: "마이그레이션 도구" },
          { id: 9, text: "버전 관리" }
        ]
      },
      {
        id: 8,
        text: "분석 도구",
        isCenter: false,
        subItems: [
          { id: 1, text: "사용자 행동 분석" },
          { id: 2, text: "성능 모니터링" },
          { id: 3, text: "에러 트래킹" },
          { id: 4, text: "통계 대시보드" },
          { id: 5, text: "분석 도구", isCenter: true },
          { id: 6, text: "리포트 자동화" },
          { id: 7, text: "데이터 시각화" },
          { id: 8, text: "예측 분석" },
          { id: 9, text: "커스텀 분석" }
        ]
      },
      {
        id: 9,
        text: "테스트 자동화",
        isCenter: false,
        subItems: [
          { id: 1, text: "단위 테스트" },
          { id: 2, text: "통합 테스트" },
          { id: 3, text: "E2E 테스트" },
          { id: 4, text: "성능 테스트" },
          { id: 5, text: "테스트 자동화", isCenter: true },
          { id: 6, text: "테스트 케이스 관리" },
          { id: 7, text: "CI/CD 통합" },
          { id: 8, text: "리그레션 테스트" },
          { id: 9, text: "테스트 보고서" }
        ]
      }
    ]
  };

  // 나중에는 여기서 API 호출하고 응답을 저장
  setIdeaGenerationMandalArtData(dummyMandalartData);


      const DUMMY_IDEAS = [
        {
          id: 1,
          title: "Idea 1. 소비자 중요 가치 분석",
          content: [
            "설명: 장인의 오리엔트를 실시간으로 분석하고, AI가 최적의 정소 결정의 방법을 선택하여 자동으로 청소하는 로봇 시스템.",
            "기술 활용: 병원 진료 데이터를 기반으로 알레르기 유발 물질, 공기 중 유해 성분 등을 분석하고, 맞춤형 청소 설정을 제공.",
          ],
        },
        {
          id: 2,
          title: "Idea 2. 소비자 중요 가치 분석",
          content: [
            "설명: 장인의 오리엔트를 실시간으로 분석하고, AI가 최적의 정소 결정의 방법을 선택하여 자동으로 청소하는 로봇 시스템.",
            "기술 활용: 병원 진료 데이터를 기반으로 알레르기 유발 물질, 공기 중 유해 성분 등을 분석하고, 맞춤형 청소 설정을 제공.",
          ],
        },
        // ... 더 많은 아이디어 추가 가능
      ];

      setIdeaGenerationIdeaList(DUMMY_IDEAS);

    // setIdeaGenerationMandalArt();
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


  const handleIdeaSelect = (selectedIdea) => {
    console.log("selectedIdea", selectedIdea);
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
                <div className="text" style={{whiteSpace: "nowrap"}}>
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    문제 정의
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
                <div className="text" style={{whiteSpace: "nowrap"}}>
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
                disabled={
                  !completedSteps.includes(2) || isLoading || isLoadingReport
                }
              >
                <span>03</span>
                <div className="text" style={{whiteSpace: "nowrap"}}>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    아이디어 발상
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 4}
                onClick={() => completedSteps.includes(3) && setActiveTab(4)}
                disabled={
                  !completedSteps.includes(3) ||
                  isLoading 
                }
              >
                <span>04</span>
                <div className="text" style={{whiteSpace: "nowrap"}}>
                  <Body1 color={activeTab >= 4 ? "gray700" : "gray300"}>
                    최종 인사이트 분석
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
                        고객 여정 분석을 원하는 주요 페르소나의 문제점 또는
                        니즈를 도출하세요
                      </Body3>
                    </div>

                    <div className="content">
                      <TabContent5Item >
                        <div className="title">
                          <Body1 color="gray700">문제점 & 니즈 가져오기 </Body1>
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
                                toolSteps >= 1  || isContentLoading ? "not-allowed" : "pointer",
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
                                <SelectBoxItem disabled={toolSteps >= 1}>
                                  <Body2 color="gray300" align="left">
                                    직접 문제점을 작성합니다.
                                  </Body2>
                                </SelectBoxItem>
                              ) : (
                                customerJourneyList.map((item, index) => (
                                  <SelectBoxItem
                                    disabled={toolSteps >= 1 || isContentLoading}
                                    key={index}
                                    onClick={() => {
                                      handlePurposeSelect(
                                        `${item.updateDate.split(":")[0]}:${
                                          item.updateDate.split(":")[1]
                                        } 고객 핵심 가치 분석기 - 
                                    ${
                                      item.customerJourneyMapSelectedPersona
                                        .personaName || "페르소나"
                                    } 분석`,
                                        "customerList",
                                        item
                                      );
                                    }}
                                  >
                                    <Body2 color="gray700" align="left">
                                      {item.updateDate.split(":")[0]}:
                                      {item.updateDate.split(":")[1]} 고객 핵심
                                      가치 분석기 -
                                      {item.customerJourneyMapSelectedPersona
                                        .personaName || "페르소나"}{" "}
                                      분석
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
                              <Body1 color="gray700">
                                문제점 & 니즈 리스트 (최소 8개 이상 작성 필요)
                              </Body1>
                            </div>
                            <MoleculeDeleteForm
                              items={ideaGenerationProblemList || []}
                              setItems={setIdeaGenerationProblemList}
                              disabled={toolSteps >= 1}
                              maxItems={13}
                              placeholder="문제점 작성"
                              initialItemCount={8}
                              edit={false}  
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
                      disabled = {isContentLoading }
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
                        문제와 니즈를 창의적 해결 주제로 전환하여, 아이디어
                        발상의 방향을 정해주세요.
                      </Body3>
                    </div>

                    <div className="content">
                      <Title>
                        <Body1 color="gray700">
                          아이디어 시작점을 선택하세요 (8개 선택필수)
                        </Body1>
                      </Title>

                      {/* {selectedProblems.length > 0 ? ( */}
                      <CardGroupWrap column >
                        {/* <MoleculeTagList
                          items={ideaGenerationStartPosition.map(
                            (problem) => problem.title
                          )} // name만 전달
                          // onTagsChange={handleTagsChange}
                          disabled={toolSteps >= 2}
                        /> */}
                       

                          <MoleculeTagList
                            items={ideaGenerationStartPosition  // 배열이라고 가정
                              .map(item => item.content)  // 각 객체의 content 배열 추출
                              .flat()  // 모든 content 배열을 하나로 합침
                            }
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
                              placeholder="보유 기술을 입력하시면, 아이디어가 더 잘나와요 "
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
                                completedSteps.includes(2) || toolSteps >= 2
                              }
                            />
                            <Body2 color="gray300" align="right">
                              {descriptionLength} / 150
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
                  // disabled={ideaGenerationSelectedStartPosition.length < 8}
                  // targetCustomer.filter(item => item.trim() !== '').length < 8  // 8개 미만이면 비활성화
                >다음
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
                      <H3 color="gray800">Participating Persona</H3>
                      <Body3 color="gray800">
                      함께 아이디에이션에 참여하는 페르소나들을 확인해보세요
                      </Body3>
                    </div>

                    <div className="content">
                      
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
                  </>
                )}

                <Button
                  Other
                  Primary
                  Fill
                  Round
                  onClick={handleMandalArt}
                  // disabled={toolSteps > 3}
                >
                  아이디에이션 시작하기
                </Button>
              </TabContent5>
            )}

            {activeTab === 4 && completedSteps.includes(3) && (
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
                        문제와 니즈를 창의적 해결 주제로 전환하여, 아이디어
                        발상의 방향을 정해주세요.
                      </Body3>
                    </div>

                    <div className="content">
                      <Title>
                        <Body1 color="gray700">
                          아이디어 시작점을 선택하세요 (8개 선택가능)
                        </Body1>
                      </Title>

                      {/* {selectedProblems.length > 0 ? ( */}
                    <CardGroupWrap column >
                      <MoleculeMandalArtGraph
                      mandalartData={ideaGenerationMandalArtData}
                      // onSelectIdea={handleIdeaSelect}
                        />
                      </CardGroupWrap>
                      {/* ) : (
                      <Body3 color="gray700">데이터가 없습니다.</Body3>
                    )} */}

                      <div className="content">
                      {ideaGenerationSelectedMandalart.length > 0 ? (
                         <IdeaContainer>
                         
                           <IdeaBox >
                             {/* <IdeaTitle>{idea.title}</IdeaTitle> */}
                             <IdeaContent>
                             각 아이디어 주제를 클릭해보세요. 주제별로 연관된 아이디어 8가지가 제시됩니다. 
                             </IdeaContent>
                           </IdeaBox>
                       </IdeaContainer>

                        ) : (


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
                      )}
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
  font-family: "Pretendard", sans-serif;
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
  font-family: "Pretendard", sans-serif;
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
