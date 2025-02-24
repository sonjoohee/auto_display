//디자인 감성 분석기기
import React, { useEffect, useState, useRef, useCallback } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";

import {
  Button,
} from "../../../../../assets/styles/ButtonStyle";
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
  TARGET_DISCOVERY_INFO,
  TARGET_DISCOVERY_PERSONA,
  SELECTED_TARGET_DISCOVERY_PERSONA,
  TARGET_DISCOVERY_SCENARIO,
  TARGET_DISCOVERY_FINAL_REPORT,
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
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import AnalysisItem from '../molecules/MoleculeAnalysisItem'; // Import the new component

const PageDesignAnalysis = () => {
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);

  const [designAnalysisBusinessInfo, setDesignAnalysisBusinessInfo] = useAtom(DESIGN_ANALYSIS_BUSINESS_INFO);
  const [designAnalysisUploadedFiles, setDesignAnalysisUploadedFiles] = useAtom(DESIGN_ANALYSIS_UPLOADED_FILES);
  const [designAnalysisEmotionAnalysis, setDesignAnalysisEmotionAnalysis] = useAtom(DESIGN_ANALYSIS_EMOTION_ANALYSIS); 
  const [selectedDesignAnalysisEmotionAnalysis, setSelectedDesignAnalysisEmotionAnalysis] = useAtom(DESIGN_ANALYSIS_SELECTED_PERSONA);
  const [designAnalysisEmotionTarget, setDesignAnalysisEmotionTarget] = useAtom(DESIGN_ANALYSIS_EMOTION_TARGET);
  const [designAnalysisEmotionScale, setDesignAnalysisEmotionScale] = useAtom(DESIGN_ANALYSIS_EMOTION_SCALE);
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
  const [activeDesignTab, setActiveDesignTab] = useState('emotion'); // 'emotion' 또는 'scale'
  const [isLoadingReport, setIsLoadingReport] = useState(false); 
  
  const handleToggle = (key) => {
    setState((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  const [state, setState] = useState({
    isExpanded: false,
    showQuestions: false,
  });


  // OCEAN 값들을 관리하기 위한 상태
  const [oceanValues, setOceanValues] = useState({
    Comfortable: 3,        // 편안한
    Satisfying: 3,        // 만족스러운
    Trustworthy: 3,       // 신뢰가는
    Anticipated: 3,       // 기대되는
    Attractive: 3,        // 매력적인
    Practical: 3,         // 실용적인
    Beautiful: 3,         // 아름다운
    Efficient: 3,         // 효율적인
    Easy: 3,             // 사용하기 쉬운
  });

  // OCEAN 무시 여부를 관리하는 상태
  const [ignoreOcean, setIgnoreOcean] = useState(false);

  const [showPopupFileSize, setShowPopupFileSize] = useState(false);

  const calculateDropDirection = () => {
    if (selectBoxRef.current) {
      const rect = selectBoxRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200; // 예상되는 드롭다운 높이

      setDropUp(spaceBelow < dropDownHeight && spaceAbove > spaceBelow);
    }
  };

  const handleSelectBoxClick = () => {
    if (toolStep >= 1) return;
    calculateDropDirection();
    setIsSelectBoxOpen(!isSelectBoxOpen);
  };

  const handlePurposeSelect = (purpose) => {
    setSelectedPurpose(purpose);
    handleContactInputChange("purpose", purpose);
    setIsSelectBoxOpen(false);
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectPersona = () => {
    if (selectedPersonas.length > 0) {
      setSelectedInterviewType("multiple");
      setSelectedInterviewPurpose("product_experience_new");
    }
  };

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      if (toolLoading) {
        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 3));

        // 비즈니스 정보 설정 (Step 1)
        if (designAnalysisBusinessInfo) {
          setBusinessDescription(designAnalysisBusinessInfo?.business ?? "");
          setUploadedFiles(designAnalysisUploadedFiles ?? []);
          setFileNames(designAnalysisUploadedFiles?.map(file => file.name) ?? []);
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
              // targetDiscoveryScenario에 있는 페르소나만 선택
              return (designAnalysisEmotionTarget ?? []).some(
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

       if (designAnalysisEmotionScale) {
        setDesignAnalysisEmotionScale(designAnalysisEmotionScale ?? {});
       }

        // 최종 리포트 설정 (Step 4)
        if (designAnalysisEmotionTarget) {
          setDesignAnalysisEmotionTarget(designAnalysisEmotionTarget ?? {});
        }

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  // const handleCheckboxChange = (personaId) => {
  //   if (toolStep >= 2) return;
  //   setSelectedPersonas((prev) => {
  //     if (prev.includes(personaId)) {
  //       return prev.filter((id) => id !== personaId);
  //     } else {
  //       // 최대 5개까지만 선택 가능
  //       if (prev.length >= 5) return prev;
  //       return [...prev, personaId];
  //     }
  //   });
  // };

  
  const handleCheckboxChange = (index) => {
    if (toolStep >= 2) return;
    // 이미 선택된 항목을 다시 클릭하면 선택 해제
    if (selectedPersonas === index) {
      setSelectedPersonas(null);
    } else {
      // 다른 항목을 선택하면 해당 항목으로 변경
      setSelectedPersonas(index);
    }
  };



  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  // 필수 필드가 모두 입력되었는지 확인하는 함수
  const isRequiredFieldsFilled = () => {
    console.log('Business Description:', businessDescription.trim());
    console.log('Uploaded Files:', uploadedFiles);
    return businessDescription.trim().length > 0 && uploadedFiles.length > 0;
  };

  // 비즈니스 설명 입력 핸들러
  const handleBusinessDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 150) {
      setBusinessDescription(input);
    }
  };

  // 타겟 고객 입력 핸들러
  const handleTargetCustomerChange = (e) => {
    setTargetCustomer(e.target.value);
  };

  const handleSubmitBusinessInfo = async () => {
    setIsLoading(true);
    try {

      const responseToolId = await createToolOnServer(
        {
          type: "ix_design_emotion_analysis",
        },
        isLoggedIn
      );
      setToolId(responseToolId);
      console.log('responseToolId:', responseToolId);

      // const data = new FormData();

      // // 파일이 선택된 경우에만 'image' 필드 추가
      // if (uploadedFiles.length > 0) {
      //     data.append('image', uploadedFiles[0]); 
      // } else {
      //     console.warn("파일이 선택되지 않았습니다."); 
      // }

      // 비즈니스 데이터 추가
      const Data = {
          business: businessDescription,
          tool_id: responseToolId,
          image: uploadedFiles[0],
      };

      // FormData에 비즈니스 데이터의 각 속성을 개별적으로 추가
      // data.append('business', businessData.business);
      // data.append('responseToolId', businessData.responseToolId);
        // FormData에 비즈니스 데이터 추가
        // data.append('business', JSON.stringify(businessData));
      

      // API 요청
      const response = await InterviewXDesignEmotionAnalysisRequest(Data, isLoggedIn);
      
      if (
        !response?.response.design_emotion_analysis  ||
        !Array.isArray(response.response.design_emotion_analysis) ||
        response.response.design_emotion_analysis.length === 0
      ) {
        setShowPopupError(true);
        return;
      }
     
      setToolStep(1);
      // API 응답에서 페르소나 데이터를 추출하여 atom에 저장
      setDesignAnalysisEmotionAnalysis(
        response.response.design_emotion_analysis || []
      );
      setDesignAnalysisBusinessInfo(businessDescription);
      // setDesignAnalysisUploadedFiles(uploadedFiles);
      setFileNames(uploadedFiles.map(file => file.name));

      await updateToolOnServer(
        toolId,
        {
          completed_step: 1,
          // design_emotion_analysis: response.response.design_emotion_analysis ,
          business: businessDescription,
          // image: uploadedFiles.length > 0 ? uploadedFiles[0] : null,
  
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
    // setIsLoadingReport(true);
    handleNextStep(2);
    await updateToolOnServer(
      toolId,
      {
        completed_step: 2,
      },
      isLoggedIn
    );
    setToolStep(2);
    try {
      const selectedPersonaData = designAnalysisEmotionAnalysis.filter(
        (persona, index) => selectedPersonas.includes(index)
      );
      setSelectedDesignAnalysisEmotionAnalysis(selectedPersonaData);

      // 선택된 페르소나가 하나일 경우에만 시나리오 요청
      if (selectedPersonaData) {
        const persona = selectedPersonaData; 
        try {
          const apiRequestData = {
            business: designAnalysisBusinessInfo.business,
            design_emotion_selected_field: persona.name,
            design_emotion_analysis: persona,
          };

          const response = await InterviewXDesignEmotionTargetRequest(
            apiRequestData,
            isLoggedIn
          );

          if (
            !response?.response?.design_emotion_target
          ) {
            console.log("🚀 ~ handleSubmitPersonas ~ response:", response);
            setShowPopupError(true);
            return;
          }

          setDesignAnalysisEmotionTarget(response.response.design_emotion_target);
      
          const oceanData = {
            tool_id: toolId,
            business: designAnalysisBusinessInfo.business,
            design_emotion_selected_field: persona.name,
            design_emotion_target: response?.response?.design_emotion_target
          };

          
          const oceanResponse = await InterviewXDesignEmotionScaleRequest(
            oceanData,
            isLoggedIn
          );
          console.log("🚀 ~ oceanResponse:", oceanResponse);
          setDesignAnalysisEmotionScale(oceanResponse.response.design_emotion_scale);


        } catch (error) {
          console.error(`Error processing persona ${persona.name}:`, error);
        }
      }

      await updateToolOnServer(
        toolId,
        {
          completed_step: 3,
          design_emotion_target: designAnalysisEmotionTarget,
          design_emotion_scale: designAnalysisEmotionScale,
        },
        isLoggedIn
      );

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

  const getButtonText = (persona, hasScenarioData, isLoading) => {
    if (isLoading) {
      return "호출중";
    } else if (hasScenarioData) {
      return "자세히";
    }
    return "대기중";
  };

  

  // 파일 업로드 핸들러
  const handleChangeStatus = ({ meta, file, remove }, status) => {
    // console.log(status, meta, file);

    // 20MB 크기 제한 체크
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes
    if (file.size > maxSize && status !== 'removed') {
      setShowPopupFileSize(true);
      remove();
      return;
    }

    // 파일 상태 업데이트
    if (status === 'done' || status === 'preparing' || status === 'uploading') {
      setUploadedFiles(prev => {
        // 이미 존재하는 파일이 아닌 경우에만 추가
        if (!prev.find(f => f.name === file.name)) {
          setFileNames(prev => [...prev, file.name]);
          return [...prev, file];
        }
        return prev;
      });
    } else if (status === 'removed') {
      setUploadedFiles(prev => prev.filter(f => f.name !== file.name));
      setFileNames(prev => prev.filter(name => name !== file.name));
    }

    // 파일 크기를 KB 또는 MB 단위로 변환
    const size = file.size;
    const sizeStr = size > 1024 * 1024 
      ? `${(size / (1024 * 1024)).toFixed(1)}MB`
      : `${(size / 1024).toFixed(1)}KB`;

    // setTimeout을 사용하여 DOM이 업데이트된 후 실행
    setTimeout(() => {
      const containers = document.querySelectorAll('.dzu-previewContainer');
      containers.forEach(container => {
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
  const handleSubmit = (files) => {
    const validFiles = files.filter(f => f.meta.status === 'done' && f.file.size <= 20 * 1024 * 1024);
    setUploadedFiles(validFiles.map(f => f.file));
  }

  // OCEAN 값 변경을 처리하는 핸들러
  const handleOceanChange = (trait, value) => {
    if (!ignoreOcean) {
      const numValue = parseFloat(value);
      // 값이 3에 가까울 때 자동으로 3으로 스냅
      const snapValue = Math.abs(numValue - 3) < 0.2 ? 3 : numValue;
      
      setOceanValues(prev => ({
        ...prev,
        [trait]: snapValue
      }));
    }
  };

  // OCEAN 값들을 초기화하는 함수
  const resetOceanValues = () => {
    setOceanValues({
      openness: 0.5,
      conscientiousness: 0.5,
      extraversion: 0.5,
      agreeableness: 0.5,
      neuroticism: 0.5
    });
  };

  const perspectives = [
    {
      name: "심미적 관점",
      weight: 25,
      features: [
        {
          title: "감성적인 색감 연출",
          description: "파스텔톤의 부드러운 색감을 사용하여 따뜻하고 편안한 분위기 조성"
        },
        {
          title: "자연스러운 조명 활용",
          description: "자연광을 활용하여 동물의 생기 넘치는 모습과 자연 친화적인 분위기 연출"
        },
        {
          title: "아름다운 배경 선택",
          description: "쾌적하고 안전한 환경을 연상시키는 배경(잔디밭, 햇살 좋은 공간)을 선택"
        }
      ],
      form_factors: [
        {
          title: "고화질 이미지 사용",
          description: "고화질 이미지를 사용하여 동물의 섬세한 표정과 질감을 생생하게 표현"
        },
        {
          title: "적절한 구도 설정",
          description: "동물의 자연스러운 모습을 포착하는 구도를 통해 편안하고 자유로운 분위기 연출"
        },
        {
          title: "시선 처리",
          description: "동물의 시선이 카메라를 향하도록 하여 친근함과 교감을 증진시킴"
        }
      ],
      design_direction: "고품질의 시각적 요소를 활용하여 감성적인 분위기를 조성하고, 서비스의 신뢰도를 높임. 파스텔톤, 자연광, 아름다운 배경은 안정감과 편안함을 전달하여 서비스에 대한 긍정적 인식 형성"
    },
    {
      name: "조형적 관점",
      weight: 35,
      features: [
        {
          title: "균형 잡힌 구성",
          description: "동물과 배경의 조화로운 구성을 통해 시각적 균형과 안정감을 유지"
        },
        {
          title: "시각적 계층 구조",
          description: "중요 요소를 강조하고, 시각적 흐름을 유도하는 계층 구조를 통해 정보 전달 효율 증대"
        },
        {
          title: "색상 대비 활용",
          description: "동물과 배경의 색상 대비를 활용하여 시각적 명확성과 흥미를 유발"
        }
      ],
      form_factors: [
        {
          title: "구도 및 비율",
          description: "황금비율 등을 활용하여 시각적 조화를 이루고, 안정감 있는 구성을 제공"
        },
        {
          title: "선과 면의 조화",
          description: "선과 면의 조화로운 사용을 통해 역동적이면서도 안정적인 시각적 효과 연출"
        },
        {
          title: "공간 활용",
          description: "여백을 효과적으로 활용하여 동물과 배경을 더욱 돋보이게 함"
        }
      ],
      design_direction: "시각적 요소들의 균형과 조화를 통해 편안하고 안정적인 시각적 경험 제공. 계층 구조와 색상 대비를 통해 메시지 전달력을 높이고, 시각적 흥미 유발"
    },
    {
      name: "목적성 관점",
      weight: 20,
      features: [
        {
          title: "서비스 가치 제시",
          description: "반려동물의 행복과 복지를 중시하는 서비스의 가치를 명확하게 전달"
        },
        {
          title: "신뢰감 형성",
          description: "전문성과 안전성을 강조하여 서비스에 대한 신뢰와 안정감을 높임"
        },
        {
          title: "감정적 연결",
          description: "반려동물과의 행복한 순간을 공유하여 고객과 감정적인 연결을 형성"
        }
      ],
      form_factors: [
        {
          title: "이미지 선택",
          description: "행복하고 건강한 반려동물의 모습을 보여주는 이미지 선택"
        },
        {
          title: "텍스트 구성",
          description: "서비스의 특징과 장점을 간결하고 명확하게 전달하는 텍스트 구성"
        },
        {
          title: "전체 분위기",
          description: "전문적이고 신뢰감 있는 분위기를 조성"
        }
      ],
      design_direction: "서비스의 목적과 가치를 명확히 전달하고, 고객과의 감정적 연결을 강화. 신뢰감 있는 분위기 조성을 통해 서비스 이용을 유도"
    },
    {
      name: "독창성 관점",
      weight: 10,
      features: [
        {
          title: "새로운 시각적 접근",
          description: "기존의 반려동물 관련 이미지와 차별화되는 독창적인 시각적 요소 도입"
        },
        {
          title: "이야기 전달",
          description: "이미지를 통해 반려동물과의 특별한 순간을 담아낸 스토리텔링 기법 활용"
        },
        {
          title: "차별화된 스타일",
          description: "경쟁 서비스와 차별화되는 독특한 스타일을 구축"
        }
      ],
      form_factors: [
        {
          title: "독특한 구도",
          description: "일반적인 구도에서 벗어난 독창적인 구도를 통해 시선을 사로잡음"
        }
      ],
      design_direction: "독창적인 시각적 요소를 통해 서비스의 차별성을 강조하고, 고객의 관심을 끌어내는 효과를 기대"
    }
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
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray800" : "gray300"}>
                    이미지 업로드
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={!completedSteps.includes(1)}
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    디자인 분야 분석
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    Design Sector
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={!completedSteps.includes(2)}
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
                    디자인 감성 분석
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
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
                    <AtomPersonaLoader message="잠재 고객을 분석하고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Image Upload</H3>
                      <Body3 color="gray800">
                        감성 분석을 원하시는 비즈니스 설명과 디자인 이미지를 업로드해주세요
                      </Body3>
                    </div>

                    <div className="content">
                      <TabContent5Item required>
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
                            maxLength={150}
                            status="valid"
                          />
                          <Body2 color="gray300" align="right">
                            {businessDescription.length} / 150
                          </Body2>
                        </FormBox>
                      </TabContent5Item>

                      <TabContent5Item required>
                        <div className="title">
                          <Body1 color="gray700">분석할 이미지 업로드</Body1>
                          <Body1 color="red">*</Body1>
                        </div>
                        <Dropzone
                          onChangeStatus={handleChangeStatus}
                          onSubmit={handleSubmit}
                          // getUploadParams={getUploadParams}
                          maxFiles={3}
                          multiple={true}
                          canRemove={true}
                          canRestart={false}
                          disabled={toolStep >= 1} 
                          accept="image/*"
                          maxSizeBytes={20 * 1024 * 1024}
                          inputWithFilesContent={
                            <>
                              <img src={images.ImagePrimary} alt="" />
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}>
                                <Body2 color="gray700">이미지 첨부 또는</Body2>
                                <Body2 color="primary">이미지 가져오기</Body2>
                              </div>
                              {fileNames.length > 0 && (
                                <div>
                                  {fileNames.map((name, index) => (
                                    <Body2 key={index} color="gray700">{name}</Body2>
                                  ))}
                                </div>
                              )}
                            </>
                          }
                          inputContent={
                            <>
                              <img src={images.ImagePrimary} alt="" />
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}>
                                <Body2 color="gray700">이미지 첨부 또는</Body2>
                                <Body2 color="primary">이미지 가져오기</Body2>
                              </div>
                              {fileNames.length > 0 && (
                                <div>
                                  {fileNames.map((name, index) => (
                                    <Body2 key={index} color="gray700">{name}</Body2>
                                  ))}
                                </div>
                              )}
                            </>
                          }
                          styles={StyledDropzone}
                          submitButtonContent="업로드"
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
                        업로드된 이미지를 기반으로 가장 적합한 디자인 분야를 분류했습니다
                      </Body3>
                    </div>

                    <div className="content">
                      <CardGroupWrap column style={{ marginBottom: "140px" }}>


                        {/* 
              <CardGroupWrap column>
                    {designAnalysisEmotionAnalysis.map((persona, index) => {
                      return (
                        <MoleculeCustomerValueCard
                          key={index}
                          id={index}
                          title={persona.name}
                          content={persona.reason}
                          business={designAnalysisBusinessInfo.business}
                          isSelected={selectedPersonas.includes(index)}
                          //disabled={toolStep >= 2 ? true : false}
                          onSelect={(id) => handleCheckboxChange(id)}
                          hideButton={true}
                        />
                      );
                    })}
                  </CardGroupWrap>


  */}
                        <ListBoxItem FlexStart>
                          <CheckCircle />

                          <ListText>
                            <ListTitle>
                              <Body1 color="gray800" align="left">제품 디자인</Body1>
                            </ListTitle>
                            <ListSubtitle>
                              <Sub2 color="gray500" align="left">왜 제품 디자인에 해당 되는 근거</Sub2>
                            </ListSubtitle>
                          </ListText>
                        </ListBoxItem>

                        <ListBoxItem FlexStart>
                          <CheckCircle />

                          <ListText>
                            <ListTitle>
                              <Body1 color="gray800" align="left">제품 디자인</Body1>
                            </ListTitle>
                            <ListSubtitle>
                              <Sub2 color="gray500" align="left">왜 제품 디자인에 해당 되는 근거</Sub2>
                            </ListSubtitle>
                          </ListText>
                        </ListBoxItem>

                        <ListBoxItem FlexStart>
                          <CheckCircle />

                          <ListText>
                            <ListTitle>
                              <Body1 color="gray800" align="left">제품 디자인</Body1>
                            </ListTitle>
                            <ListSubtitle>
                              <Sub2 color="gray500" align="left">왜 제품 디자인에 해당 되는 근거</Sub2>
                            </ListSubtitle>
                          </ListText>
                        </ListBoxItem>
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
                            toolStep >= 2 
                          }
                          // disabled={
                          //   toolStep >= 2 || selectedPersonas.length === 0
                          // }
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
                        디자인이 사용자에게 전달하는 감정을 분석하고, 시각적 커뮤니케이션 효과를 극대화하세요
                      </Body3>
                    </BgBoxItem>

                    <InsightAnalysis>
                      <div className="title">
                        <div>
                          <TabWrapType4>
                            <TabButtonType4 
                              active={activeDesignTab === 'emotion'}
                              onClick={() => setActiveDesignTab('emotion')}
                            >
                              디자인 목표 감성
                            </TabButtonType4>
                            <TabButtonType4 
                              active={activeDesignTab === 'scale'}
                              onClick={() => setActiveDesignTab('scale')}
                            >
                              감정 스케일 매핑
                            </TabButtonType4>
                          </TabWrapType4>
                        </div>
                        <Button Primary onClick={() => setShowPopupSave(true)}>
                          리포트 저장하기
                        </Button>
                      </div>
                    </InsightAnalysis>

                    <InsightAnalysis>
                      <div className="title">
                        <H4 color="gray800" align="left">
                          {activeDesignTab === 'emotion' 
                            ? "(Business)의 (목표감성)을 기반으로 이미지의 감성 스케일 맵핑을 진행했을때..." 
                            : "(Business)의 (목표감성)을 기반으로 이미지의 감성 스케일 맵핑을 진행했을때..."}
              
                        </H4>
                      </div>

                      
                            {/* <div className="title">
                      <H4 color="gray800" align="left">
                          {activeDesignTab === 'emotion' 
                            ? 
                           `${designAnalysisBusinessInfo.business}가(${selectedDesignAnalysisEmotionAnalysis.name})에서 궁극적으로 달성하고자하는 주요 목표 감성은<br />
                          ${designAnalysisEmotionTarget.target_emotion}`
                            :
                         `${designAnalysisEmotionScale.conclusion}` }
                        </H4>
                      </div> */}


                      <div className="content">
                        {activeDesignTab === 'emotion' ? (
                            <Body3 color="gray700">
                     
                            스케일 분석 결과: 디자인이 전달하고자 하는 감정의 강도와 그에 따른 사용자 반응을 분석한 결과, 특정 감정이 더 강조되어야 할 필요가 있습니다. 
                          </Body3>
                        ) : (
                          <>
                          <Body3 color="gray700">
                     
                            강점: '편리한(6점)', '명확한(6점)', '간편한(6점)'으로 높은 점수를 받은 것은 디자인이 고객에게 전달하고자 하는 핵심 가치를 잘 표현하고 있음을 의미합니다. 텍스트와 이미지를 통해 서비스의 핵심적인 특징을 효과적으로 전달하고, 사용자들이 쉽게 이해하고 이용할 수 있도록 시각적인 정보를 명확하게 제공하고 있습니다. 스마트폰 UI 이미지를 통해 모바일 주문의 편리함을 강조하는 것은 긍정적인 부분입니다.
                          </Body3>
                          <Body3 color="gray700">
                       
                            약점 및 개선 방향: '신속한(4점)', '즐거운(3점)', '생동감 있는(3점)', '세련된(3점)' 감성에 낮은 점수를 받은 것은 디자인이 신속하고 즐거운 경험을 충분히 전달하지 못하고 있다는 것을 의미합니다. 전반적으로 레이아웃이 다소 정적이고 획일적이며, 샌드위치 이미지 외에 시선을 사로잡는 요소가 부족하여 생동감과 즐거움을 느끼기 어렵습니다. 특히, 배경 이미지와 스마트폰 UI 이미지의 부조화, 브랜드 로고의 과도한 사용은 세련된 느낌을 저해합니다.
                          </Body3>
                        </>
                        
                        )}
                      </div>

                          
                      {/* <div className="content">
                        {activeDesignTab === 'emotion' ? (
                            <Body3 color="gray700">
                         {designAnalysisEmotionTarget.designer_guidelines}
                          </Body3>
                        ) : (
                          <>
                          <Body3 color="gray700">
                            강점 : {designAnalysisEmotionScale.evaluation_analysis.strength}
                          </Body3>
                          <Body3 color="gray700">
                            약점 및 개선 방향: {designAnalysisEmotionScale.evaluation_analysis.weaknesses}
                          </Body3>
                        </>
                        
                        )}
                      </div> */}
                    </InsightAnalysis>

                    {activeDesignTab === 'emotion' && (
                      <InsightAnalysis>
                        <Sub3 color="gray700" align="left">💡 %는 해당 비즈니스에서 차지하는 중요도를 의미합니다.</Sub3>

                        {/* 
                        <CardGroupWrap column $isExpanded={state.isExpanded}>
                        {designAnalysisEmotionTarget?.design_perspectives?.map((perspective, index) => (
                          <AnalysisItem 
                            business={designAnalysisBusinessInfo.business}
                            key={index} 
                            percentage={perspective.weight + "%"} 
                            title={perspective.name} 
                            subtitle={perspective.features.map(feature => feature.title).join(", ")}
                            details={perspective}
                     
                      </CardGroupWrap> */}

                        <CardGroupWrap column $isExpanded={state.isExpanded}>
                          
                           {perspectives.map((perspective, index) => (
                              <AnalysisItem 
                                key={index} // 각 항목에 고유한 키 부여
                                percentage={perspective.weight + "%"} // weight를 백분율로 사용
                                title={perspective.name} // name을 title로 사용
                                subtitle={perspective.features.map(feature => feature.title).join(", ")} // feature 제목을 조인하여 subtitle로 사용
                                details={perspective} // 전체 perspective 객체를 details로 전달
                              />
                            ))}


                        </CardGroupWrap>
                      </InsightAnalysis>
                    )}

                    {activeDesignTab === 'scale' && (


// <InsightAnalysis>
// <OCEANRangeWrap>
//   {/* OCEAN 값 슬라이더 */}
//   {designAnalysisEmotionScale.sd_scale_analysis.map((item, index) => (
//     <div key={index}>
//       <Body3 color="gray800" align="left">{item.target_emotion}</Body3>
//       <RangeSlider
//         type="range"
//         min="0"
//         max="6"
//         step="1"
//         value={item.score}
//         disabled={true} // 변경을 허용하지 않으려면 비활성화
//         style={{ flex: "2" }}
//       />
//       <Body3 color="gray800" align="right">{item.opposite_emotion}</Body3>
//     </div>
//   ))}
// </OCEANRangeWrap>
// </InsightAnalysis>
// )}

<InsightAnalysis>
  <OCEANRangeWrap>
    {/* 하드코딩된 데이터로 대체 */}
    {[
      {
        target_emotion: "편안한 (Comfortable)",
        opposite_emotion: "불편한 (Uncomfortable)",
        score: 5
      },
      {
        target_emotion: "안정적인 (Stable)",
        opposite_emotion: "불안정한 (Unstable)",
        score: 4
      },
      {
        target_emotion: "친근한 (Friendly)",
        opposite_emotion: "낯선 (Strange)",
        score: 5
      },
      {
        target_emotion: "신뢰할 수 있는 (Trustworthy)",
        opposite_emotion: "불신하는 (Untrustworthy)",
        score: 6
      },
      {
        target_emotion: "행복한 (Happy)",
        opposite_emotion: "슬픈 (Sad)",
        score: 5
      },
      {
        target_emotion: "따뜻한 (Warm)",
        opposite_emotion: "차가운 (Cold)",
        score: 5
      },
      {
        target_emotion: "독창적인 (Original)",
        opposite_emotion: "평범한 (Ordinary)",
        score: 3
      },
      {
        target_emotion: "세련된 (Sophisticated)",
        opposite_emotion: "촌스러운 (Cheesy)",
        score: 4
      },
      {
        target_emotion: "매력적인 (Attractive)",
        opposite_emotion: "매력없는 (Unattractive)",
        score: 4
      }
    ].map((item, index) => (
      <div key={index}>
        <Body3 color="gray800" align="left">{item.target_emotion}</Body3>
        <RangeSlider
          type="range"
          min="0"
          max="6"
          step="1"
          value={item.score}
          disabled={true} // 변경을 허용하지 않으려면 비활성화
          style={{ flex: "2" }}
        />
        <Body3 color="gray800" align="right">{item.opposite_emotion}</Body3>
      </div>
    ))}
  </OCEANRangeWrap>
</InsightAnalysis>
                      // <InsightAnalysis>
                      //   <OCEANRangeWrap>
                      //     <div>
                      //       <Body3 color="gray800" align="left" style={{flex: "1"}}>편안한 (Comfortable)</Body3>
                      //       <RangeSlider
                      //         type="range"
                      //         min="0"
                      //         max="6"
                      //         step="1"
                      //         value={oceanValues.Comfortable}
                      //         onChange={(e) => handleOceanChange("Comfortable", e.target.value)}
                      //         disabled={ignoreOcean}
                      //         $ignored={ignoreOcean}
                      //         style={{flex: "2"}}
                      //       />
                      //       <Body3 color="gray800" align="right" style={{flex: "1"}}>불편한 (Uncomfortable)</Body3>
                      //     </div>
                      //     <div>
                      //       <Body3 color="gray800" align="left" style={{flex: "1"}}>만족스러운 (Satisfying)</Body3>
                      //       <RangeSlider
                      //         type="range"
                      //         min="0"
                      //         max="6"
                      //         step="1"
                      //         value={oceanValues.Satisfying}
                      //         onChange={(e) =>
                      //           handleOceanChange(
                      //             "Satisfying",
                      //             e.target.value
                      //           )
                      //         }
                      //         disabled={ignoreOcean}
                      //         $ignored={ignoreOcean}
                      //         style={{flex: "2"}}
                      //       />
                      //       <Body3 color="gray800" align="right" style={{flex: "1"}}>불만족스러운 (Dissatisfying)</Body3>
                      //     </div>
                      //     <div>
                      //       <Body3 color="gray800" align="left" style={{flex: "1"}}>신뢰가는 (Trustworthy)</Body3>
                      //       <RangeSlider
                      //         type="range"
                      //         min="0"
                      //         max="6"
                      //         step="1"
                      //         value={oceanValues.Trustworthy}
                      //         onChange={(e) =>
                      //           handleOceanChange("Trustworthy", e.target.value)
                      //         }
                      //         disabled={ignoreOcean}
                      //         $ignored={ignoreOcean}
                      //         style={{flex: "2"}}
                      //       />
                      //       <Body3 color="gray800" align="right" style={{flex: "1"}}>불신하는 (Untrustworthy)</Body3>
                      //     </div>
                      //     <div>
                      //       <Body3 color="gray800" align="left" style={{flex: "1"}}>기대되는 (Anticipated)</Body3>
                      //       <RangeSlider
                      //         type="range"
                      //         min="0"
                      //         max="6"
                      //         step="1"
                      //         value={oceanValues.Anticipated}
                      //         onChange={(e) =>
                      //           handleOceanChange("Anticipated", e.target.value)
                      //         }
                      //         disabled={ignoreOcean}
                      //         $ignored={ignoreOcean}
                      //         style={{flex: "2"}}
                      //       />
                      //       <Body3 color="gray800" align="right" style={{flex: "1"}}>실망스러운 (Disappointing)</Body3>
                      //     </div>
                      //     <div>
                      //       <Body3 color="gray800" align="left" style={{flex: "1"}}>매력적인 (Attractive)</Body3>
                      //       <RangeSlider
                      //         type="range"
                      //         min="0"
                      //         max="6"
                      //         step="1"
                      //         value={oceanValues.Attractive}
                      //         onChange={(e) =>
                      //           handleOceanChange("Attractive", e.target.value)
                      //         }
                      //         disabled={ignoreOcean}
                      //         $ignored={ignoreOcean}
                      //         style={{flex: "2"}}
                      //       />
                      //       <Body3 color="gray800" align="right" style={{flex: "1"}}>비매력적인 (Unacttractive)</Body3>
                      //     </div> 
                      //     <div>
                      //       <Body3 color="gray800" align="left" style={{flex: "1"}}>실용적인 (Practical)</Body3>
                      //       <RangeSlider
                      //         type="range"
                      //         min="0"
                      //         max="6"
                      //         step="1"
                      //         value={oceanValues.Practical}
                      //         onChange={(e) =>
                      //           handleOceanChange("Practical", e.target.value)
                      //         }
                      //         disabled={ignoreOcean}
                      //         $ignored={ignoreOcean}
                      //         style={{flex: "2"}}
                      //       />
                      //       <Body3 color="gray800" align="right" style={{flex: "1"}}>비실용적인 (Impratical)</Body3>
                      //     </div>
                      //     <div>
                      //       <Body3 color="gray800" align="left" style={{flex: "1"}}>아름다운 (Beautiful)</Body3>
                      //       <RangeSlider
                      //         type="range"
                      //         min="0"
                      //         max="6"
                      //         step="1"
                      //         value={oceanValues.Beautiful}
                      //         onChange={(e) =>
                      //           handleOceanChange("Beautiful", e.target.value)
                      //         }
                      //         disabled={ignoreOcean}
                      //         $ignored={ignoreOcean}
                      //         style={{flex: "2"}}
                      //       />
                      //       <Body3 color="gray800" align="right" style={{flex: "1"}}>추한 (Ugly)</Body3>
                      //     </div>
                      //     <div>
                      //       <Body3 color="gray800" align="left" style={{flex: "1"}}>효율적인 (Efficient)</Body3>
                      //       <RangeSlider
                      //         type="range"
                      //         min="0"
                      //         max="6"
                      //         step="1"
                      //         value={oceanValues.Efficient}
                      //         onChange={(e) =>
                      //           handleOceanChange("Efficient", e.target.value)
                      //         }
                      //         disabled={ignoreOcean}
                      //         $ignored={ignoreOcean}
                      //         style={{flex: "2"}}
                      //       />
                      //       <Body3 color="gray800" align="right" style={{flex: "1"}}>비효율적인 (Inefficient)</Body3>
                      //     </div>
                      //     <div>
                      //       <Body3 color="gray800" align="left" style={{flex: "1"}}>사용하기 쉬운 (Easy to use)</Body3>
                      //       <RangeSlider
                      //         type="range"
                      //         min="0"
                      //         max="6"
                      //         step="1"
                      //         value={oceanValues.Easy}
                      //         onChange={(e) =>
                      //           handleOceanChange("Easy", e.target.value)
                      //         }
                      //         disabled={ignoreOcean}
                      //         $ignored={ignoreOcean}
                      //         style={{flex: "2"}}
                      //       />
                      //       <Body3 color="gray800" align="right" style={{flex: "1"}}>불편한 (Uncomfortable)</Body3>
                      //     </div> 
                      //   </OCEANRangeWrap>
                      // </InsightAnalysis>
                    )}

                    <Button
                      Small
                      Primary
                      onClick={() => setShowPopupSave(true)}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      리포트 저장하기
                    </Button>
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
          onConfirm={() => handleNextStep(1)}
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