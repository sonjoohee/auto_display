import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import { Button } from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import PopupWrap from "../../../../assets/styles/Popup";
import Markdown from "markdown-to-jsx";
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
  InterviewPopup,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  H4,
  H3,
  Sub3,
  Body1,
  Body2,
  Body3,
  Caption1,
  InputText,
} from "../../../../assets/styles/Typography";
import {
  FormBox,
  CustomTextarea,
  CustomInput,
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../../assets/styles/InputStyle";
import "react-dropzone-uploader/dist/styles.css";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import MoleculeFileUpload from "../molecules/MoleculeFileUpload";
import OrganismDesignConceptSelector from "../orangisms/OrganismDesignConceptSelector";
import MoleculeAnalysisCard from "../molecules/MoleculeAnalysisCard";
import MoleculeTemplateCard from "../molecules/MoleculeTemplateCard";
import MoleculeCreateDisplayHeader from "../molecules/MoleculeCreateDisplayHeader";

const GlobalStyle = createGlobalStyle`  
  .markdown-body p {
    margin-bottom: 12px !important;
  }
`;

// 더미 데이터
const dummyConceptDefinition = [
  {
    personaTitle: "스마트 홈 IoT 솔루션",
    conceptDefinitionFinalReport: `# 스마트 홈 IoT 솔루션

## 개요
가정용 스마트 홈 자동화 시스템으로, 사용자의 생활 패턴을 학습하여 최적의 환경을 제공합니다.

## 핵심 기능
- 음성 제어 시스템
- 자동 조명 및 온도 조절
- 보안 시스템 연동
- 에너지 효율 관리

## 타겟 고객
- 30-50대 중산층 가정
- 기술에 관심이 많은 얼리어답터
- 편의성을 중시하는 맞벌이 부부`,
    updateDate: "2024-01-15 14:30"
  },
  {
    personaTitle: "친환경 배송 서비스",
    conceptDefinitionFinalReport: `# 친환경 배송 서비스

## 개요
전기 자전거와 친환경 포장재를 활용한 지속가능한 배송 서비스입니다.

## 핵심 가치
- 탄소 배출량 90% 감소
- 재활용 가능한 포장재 사용
- 지역 커뮤니티 기반 배송망

## 서비스 특징
- 당일 배송 보장
- 실시간 배송 추적
- 포장재 회수 서비스`,
    updateDate: "2024-01-14 16:45"
  }
];

const dummyPersonaList = [
  {
    name: "김민수",
    age: "35세",
    gender: "남성",
    job: "IT 개발자",
    imageKey: "persona_m_30_01"
  },
  {
    name: "이지영",
    age: "28세", 
    gender: "여성",
    job: "마케터",
    imageKey: "persona_f_20_02"
  },
  {
    name: "박준호",
    age: "42세",
    gender: "남성", 
    job: "회사원",
    imageKey: "persona_m_40_03"
  }
];

const dummySurveyMethod = {
  question: "제시된 컨셉을 다른 사람에게 추천할 가능성은 얼마나 되시나요?",
  options: ["0","1","2","3","4","5","6","7","8","9","10"],
  follow_up: "선택하신 점수의 이유를 자세히 설명해주세요."
};

const designConceptsData = [
  {
    id: 'modern',
    name: '모던 컨셉',
    description: '깔끔하고 현대적인 디자인으로 전문성을 강조합니다.'
  },
  {
    id: 'warm',
    name: '따뜻한 컨셉',
    description: '친근하고 따뜻한 느낌으로 접근성을 높입니다.'
  },
  {
    id: 'nature',
    name: '자연 컨셉',
    description: '자연스럽고 편안한 분위기를 연출합니다.'
  },
  {
    id: 'elegant',
    name: '우아한 컨셉',
    description: '세련되고 고급스러운 이미지를 표현합니다.'
  },
  {
    id: 'minimal',
    name: '미니멀 컨셉',
    description: '단순하고 깔끔한 디자인으로 집중도를 높입니다.'
  }
];


const dummyTemplateData = [
  {
    id: 1,
    title: "고대비 밝은 양식 디자인",
    description: "가독성을 높인 밝은 톤의 디자인으로 중요한 정보를 명확하게 전달합니다.",   
    category: "디자인 컨셉",
    location: "4층 도서자료실(지금실내네비)",
    image: "/images/template1.jpg"
  },
  {
    id: 2,
    title: "심플한 직관 양식 디자인",
    description: "가독성을 높인 밝은 톤의 디자인으로 중요한 정보를 명확하게 전달합니다.",
    category: "디자인 컨셉",
    location: "4층 도서자료실(지금실내네비)",
    image: "/images/template2.jpg"
  },
  {
    id: 3,
    title: "아이콘 인포그래픽 양식 디자인",
    description: "가독성을 높인 밝은 톤의 디자인으로 중요한 정보를 명확하게 전달합니다.",
    category: "디자인 컨셉",
  }
];


const PageNps = () => {
  const navigate = useNavigate();
  
  // UI 상태 관리
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [businessDescription, setBusinessDescription] = useState("");
  const [contentTarget, setContentTarget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeDesignTab, setActiveDesignTab] = useState("emotion");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isLoadingDetailSetting, setIsLoadingDetailSetting] = useState(false);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [projectDescription, setProjectDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState([]);
  const [interviewModeType, setInterviewModeType] = useState("conceptBoard");
  const [isLoadingPreset, setIsLoadingPreset] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [npsConceptDefinition, setNpsConceptDefinition] = useState(dummyConceptDefinition);
  const [npsSavedConceptDefinition, setNpsSavedConceptDefinition] = useState([]);
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [npsSelectedConceptDefinitionFinalReport, setNpsSelectedConceptDefinitionFinalReport] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedConceptId, setSelectedConceptId] = useState(null);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [npsSurveyMethod, setNpsSurveyMethod] = useState(dummySurveyMethod);
  const [npsPersonaList, setNpsPersonaList] = useState(dummyPersonaList);
  const [completedStatus, setCompletedStatus] = useState(false);
  const [selectedDesignConcepts, setSelectedDesignConcepts] = useState([]);
  const [dropUpStates, setDropUpStates] = useState({
    customerList: false
  });
  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false
  });
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: ""
  });
  const customerListRef = useRef(null);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [showTemplateSelection, setShowTemplateSelection] = useState(false);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // 템플릿 데이터
  const templateData = [
    {
      id: 1,
      title: "고대비 밝은 양식 디자인",
      description: "가독성을 높인 밝은 톤의 디자인으로 중요한 정보를 명확하게 전달합니다.",
      category: "디자인 컨셉",
      image: "/images/template1.jpg", // 실제 이미지 경로로 변경
      location: "4층 도서자료실(지금실내네비)"
    },
    {
      id: 2,
      title: "심플한 직관 양식 디자인",
      description: "가독성을 높인 밝은 톤의 디자인으로 중요한 정보를 명확하게 전달합니다.",
      category: "디자인 컨셉",
      image: "/images/template2.jpg", // 실제 이미지 경로로 변경
      location: "4층 도서자료실(지금실내네비)"
    },
    {
      id: 3,
      title: "아이콘 인포그래픽 양식 디자인",
      description: "가독성을 높인 밝은 톤의 디자인으로 중요한 정보를 명확하게 전달합니다.",
      category: "디자인 컨셉",
      image: "/images/template3.jpg", // 실제 이미지 경로로 변경
      location: "4층 도서자료실(지금실내네비)"
    }
  ];

  useDynamicViewport("width=1280");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (showToast) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, [showToast]);

  const handleCheckboxChange = (ideaId) => {
    if(toolSteps > 1) {
      return;
    }
    
    setSelectedConcept((prev) => {
      if (prev.includes(ideaId)) {
        const newSelected = [];
        setNpsSelectedConceptDefinitionFinalReport("");
        return newSelected;
      } else {
        const newSelected = [ideaId];
        const selectedData = npsConceptDefinition[ideaId];
        setNpsSelectedConceptDefinitionFinalReport(selectedData.conceptDefinitionFinalReport);
        return newSelected;
      }
    });
  };

  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  const handleSubmitConcept = async () => {
    // setIsLoading(true);
    
    // 2초 후 다음 단계로 이동 (API 호출 시뮬레이션)
 
      handleNextStep(1);
      setToolSteps(2);
      setIsLoading(false);

  };

  
  const handleSelectBoxClick = (boxName, ref) => {
    setSelectBoxStates(prev => ({
      ...prev,
      [boxName]: !prev[boxName]
    }));
    
    // 드롭업/드롭다운 방향 결정
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      setDropUpStates(prev => ({
        ...prev,
        [boxName]: spaceBelow < 200 && spaceAbove > 200
      }));
    }
  };

  const handleContentTypeSelect = (type) => {
    setSelectedPurposes(prev => ({
      ...prev,
      customerList: type
    }));
    setSelectBoxStates(prev => ({
      ...prev,
      customerList: false
    }));
  };

  const handleSubmitReport = async () => {
    setIsLoadingReport(true);
    
    // 3초 후 완료 (API 호출 시뮬레이션)
  
      handleNextStep(2);
      setToolSteps(3);
      setCompletedStatus(true);
      setCompletedSteps(prev => [...prev, 3]);
      setIsLoadingReport(false);
 
  };


  const handleChangeStatus = ({ meta, file, remove }, status) => {
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize && status !== "removed") {
      setShowPopupFileSize(true);
      remove();
      return;
    }

    if (status === "done" || status === "preparing" || status === "uploading") {
      setUploadedFiles((prev) => {
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

    const size = file.size;
    const sizeStr =
      size > 1024 * 1024
        ? `${(size / (1024 * 1024)).toFixed(1)}MB`
        : `${(size / 1024).toFixed(1)}KB`;

    setTimeout(() => {
      const containers = document.querySelectorAll(".dzu-previewContainer");
      containers.forEach((container) => {
        if (!container.dataset.filename) {
          container.dataset.filename = file.name;
          container.dataset.size = sizeStr;

          if (file.type.startsWith("image/")) {
            if (!container.querySelector(".dzu-previewFileName")) {
              const nameSpan = document.createElement("span");
              nameSpan.className = "dzu-previewFileName";
              nameSpan.textContent = `${file.name}, ${sizeStr}`;

              if (container.firstChild) {
                container.insertBefore(nameSpan, container.firstChild);
              } else {
                container.appendChild(nameSpan);
              }
            }
          }
        }
      });
    }, 0);
  };

  const handleConfirmCredit = async () => {
    setShowCreatePersonaPopup(false);
  };

  const handleDesignConceptSelect = (conceptId) => {
    setSelectedDesignConcepts(prev => {
      if (prev.includes(conceptId)) {
        return prev.filter(id => id !== conceptId);
      } else {
        return [...prev, conceptId];
      }
    });
  };

  const handleDisplayConversion = async () => {
    setIsLoadingTemplate(true);
    
    // 3초 후 템플릿 선택 화면 표시
    // setTimeout(() => {
    //   setIsLoadingTemplate(false);
    //   setShowTemplateSelection(true);
    // }, 3000);
   
      setIsLoadingTemplate(false);
      setShowTemplateSelection(true);
 

  };

  
  const handlePreview = () => {
    // 미리보기 로직
    console.log("미리보기 실행");
  };

  const handleSave = () => {
    // 저장 로직
    console.log("저장하기 실행");
  };

  const handleClosePreviewPopup = () => {
    setShowPreviewPopup(false);
    setSelectedTemplate(null);
  };

  return (
    <>
      <DropzoneStyles />
      <ContentsWrap>
        {/* <OrganismIncNavigation /> */}
      {/* <MoleculeHeader /> */}
      <MoleculeCreateDisplayHeader 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          completedSteps={completedSteps}
          isLoading={isLoading}
          isLoadingReport={isLoadingReport}
          onPreview={handlePreview}
          onSave={handleSave}
        />
    
      {/* <MoleculeTabHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              completedSteps={completedSteps}
              isLoading={isLoading}
              isLoadingReport={isLoadingReport}
            /> */}

        <MainContent Wide1030>
          <DesignAnalysisWrap>
            {/* <TabWrapType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
                disabled={isLoading || isLoadingReport}
              >
                <span>1</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    자료 업로드
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
                <span>2</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    자료 분석
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
                <span>3</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    콘텐츠 생성
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 4}
                onClick={() =>
                  (completedSteps.includes(3) || completedSteps.includes(4) || completedSteps.includes(2)) &&
                  setActiveTab(4)
                }
                // disabled={
                //   !completedSteps.includes(4) || isLoading || isLoadingReport
                // }
              >
                <span>4</span>
                <div className="text">
                  <Body1 color={activeTab >= 4 ? "gray700" : "gray300"}>
                   화면 실행
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5> */}

            {activeTab === 1 && (
              <TabContent5>
                <>

                <div className="content">
                <TabContent5Item required>  
               
                    <H3 color="gray800" style={{textAlign: "left" }}>AI 콘텐츠 생성을 위한 자료를 업로드해주세요 </H3>
                    <InfoBox>
                      <InfoContent>
                        <Body2 color="black" style={{ fontWeight: "600", textAlign: "left" }}>
                          디지털 기기명
                        </Body2>
                        <DeviceInfoBox>
                          <Body3 color="gray600">해상도 정보</Body3>
                          <Body3 color="gray600">인치 정보</Body3>
                          <Body3 color="gray600">사이즈 정보 (mm)</Body3>
                          <Body3 color="gray600">설치장소 :</Body3>
                          <Body3 color="primary" >
                            4층 도서자료실(지금실내네비)
                          </Body3>
                        </DeviceInfoBox>
                      </InfoContent>
                    </InfoBox>
                 
                </TabContent5Item>
                </div>

                  <div className="content">
                    <TabContent5Item required>

                    
                      <InterviewModeSelection style={{ marginBottom: "-5px" }}>
                        <Button 
                          Medium 
                          Outline
                          style={{
                            backgroundColor: interviewModeType === "conceptBoard" ? "#E0E4EB" : "transparent",
                            borderColor: interviewModeType === "conceptBoard" ? "#E0E4EB" : "#E0E4EB"
                          }}
                          onClick={() => {
                            if (toolSteps >= 1 || isLoadingPreset) return;
                            setInterviewModeType("conceptBoard");
                          }}
                          disabled={toolSteps >= 1 || isLoadingPreset}
                        >
                          <InputText color="gray700">
                            파일 업로드
                          </InputText>
                        </Button>

                        <Button 
                          Medium 
                          Outline
                          style={{
                            backgroundColor: interviewModeType === "explanation" ? "#E0E4EB" : "transparent",
                            borderColor: interviewModeType === "explanation" ? "#E0E4EB" : "#E0E4EB"
                          }}
                          onClick={() => {
                            if (toolSteps >= 1 || isLoadingPreset) return;
                            setInterviewModeType("explanation");
                          }}
                          disabled={toolSteps >= 1 || isLoadingPreset}
                        >
                          <InputText color="gray700">
                            텍스트로 작성
                          </InputText>
                      </Button>
                      </InterviewModeSelection>


                      {interviewModeType === "conceptBoard" && (
                        <div className="content">
                          <MoleculeFileUpload
                            fileNames={fileNames ?? []}
                            handleChangeStatus={handleChangeStatus}
                            toolSteps={toolSteps}
                          />
                        </div>
                      )}
                    </TabContent5Item>

                    {interviewModeType === "explanation" && (
                      <>
                       
                        <FormBox Large>
                            <CustomTextarea
                              Edit
                              rows={6}
                              placeholder="텍스트를 입력해주세요."
                              value={businessDescription}
                              onChange={(e) =>
                                setBusinessDescription(e.target.value)
                              }
                              status="valid"
                              disabled={toolSteps >= 1}
                            />
                            
                          </FormBox>
                       
                        
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
                    <AtomPersonaLoader message="콘텐츠 핵심 내용을 AI로 분석하고 있어요" />
                  </div>
                ) : (
                  <>
                    <div className="content">
                      <TabContent5Item required>  
                        <H3 color="gray800" style={{textAlign: "left" }}>콘텐츠 핵심 내용을 AI로 분석했어요 </H3>

                        <ContentAnalysisSection>
                          <MoleculeAnalysisCard
                            
                            onButtonClick={() => {
                              console.log("분석 상세 확인 클릭");
                            }}
                            values={{
                              deviceInfo: "기기명 (55인치 / 1920×1080(FHD) / 1217×685mm)",
                              materialType: "수용기기에 맞춰 맞춤 지료"
                              // 필요한 값만 override
                            }}
                          />

                          <ContentOptionsSection>
                            <H3 color="gray800" style={{textAlign: "left" }}>아래 항목을 선택해주세요 </H3>

                            <TabContent5Item>
                              <div className="title">
                                <Body1 color="gray700">콘텐츠 목적</Body1>
                              </div>

                              <SelectBox ref={customerListRef}>
                                <SelectBoxTitle
                                  onClick={() =>
                                    handleSelectBoxClick(
                                      "customerList",
                                      customerListRef
                                    )
                                  }
                                >
                                  <Body2
                                    color={
                                      selectedPurposes.customerList
                                        ? "gray800"
                                        : "gray300"
                                    }
                                  >
                                    {selectedPurposes.customerList ||
                                      "선택해주세요"}
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
                                  <SelectBoxList dropUp={dropUpStates.customerList} style={{zIndex: "1000"}}>
                                    <SelectBoxItem onClick={() => handleContentTypeSelect("정보전달형")}>
                                      <Body2 color="gray700" align="left">정보전달형</Body2>
                                    </SelectBoxItem>
                                    
                                    <SelectBoxItem onClick={() => handleContentTypeSelect("프로세스 안내형")}>
                                      <Body2 color="gray700" align="left">프로세스 안내형</Body2>
                                    </SelectBoxItem>
                                    
                                    <SelectBoxItem onClick={() => handleContentTypeSelect("홍미유도형")}>
                                      <Body2 color="gray700" align="left">홍미유도형</Body2>
                                    </SelectBoxItem>
                                    
                                    <SelectBoxItem onClick={() => handleContentTypeSelect("경고/주의형")}>
                                      <Body2 color="gray700" align="left">경고/주의형</Body2>
                                    </SelectBoxItem>
                                    
                                    <SelectBoxItem onClick={() => handleContentTypeSelect("광고/홍보형")}>
                                      <Body2 color="gray700" align="left">광고/홍보형</Body2>
                                    </SelectBoxItem>
                                  </SelectBoxList>
                                )}
                              </SelectBox>

                              <div className="title" style={{marginTop: "24px"}}>
                                <Body1 color="gray700">콘텐츠 대상자</Body1>
                              </div>
                              <FormBox Large>
                                <CustomTextarea
                                  Edit
                                  rows={1}
                                  placeholder="작성해주세요"
                                  value={contentTarget}
                                  onChange={(e) =>
                                    setContentTarget(e.target.value)
                                  }
                                  status="valid"
                                />
                              </FormBox>

                              <div className="title" style={{marginTop: "24px"}}>
                                <Body1 color="gray700">디자인 컨셉 (복수 선택 가능)</Body1>
                              </div>

                              <OrganismDesignConceptSelector
                                concepts={designConceptsData}
                                selectedConcepts={selectedDesignConcepts}
                                onSelect={handleDesignConceptSelect}
                              />
                            </TabContent5Item>
                          </ContentOptionsSection>
                        </ContentAnalysisSection>
                      </TabContent5Item>
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
                <TabContent5>
                {isLoading || isLoadingTemplate ? (
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
                      message={isLoadingTemplate ? "디스플레이 템플릿을 생성하고 있어요..." : "콘텐츠 핵심 내용을 AI로 분석하고 있어요"} 
                    />
                  </div>
                ) : showTemplateSelection ? (
                  <>
                    <div className="content">
                      <TabContent5Item required>  
                        <H3 color="gray800" style={{textAlign: "left" }}>설정한 방향에 따라 콘텐츠 내용을 자동 생성했어요 </H3>

                        <ContentAnalysisSection>
                          <MoleculeAnalysisCard
                            showButton={false}
                            type="template"
                            onButtonClick={() => {
                              setShowPreviewPopup(true);
                              // setSelectedTemplate(template);s
                            }}
                            values={{
                              deviceInfo: "기기명 (55인치 / 1920×1080(FHD) / 1217×685mm)",
                              materialType: "수용기기에 맞춰 맞춤 지료"
                              // 필요한 값만 override
                            }}
                          />

                          <ContentOptionsSection>
                            <TabContent5Item>
                            <H3 color="gray800" style={{textAlign: "left" }}>콘텐츠 시안 ({templateData.length}개)</H3>
                              <div style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: '20px', 
                                marginTop: '24px',
                                width: '100%'
                              }}>
                                {templateData.map((template) => (
                                  <MoleculeTemplateCard
                                    key={template.id}
                                    template={template}
                                    onPreview={() => {
                                      setShowPreviewPopup(true);
                                      setSelectedTemplate(template);
                                    }}
                                  />
                                ))} 
                              </div>

                            
                            </TabContent5Item>
                          </ContentOptionsSection>
                        </ContentAnalysisSection>
                      </TabContent5Item>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="content">
                      <TabContent5Item required>  
                        <H3 color="gray800" style={{textAlign: "left" }}>설정한 방향에 따라 콘텐츠 내용을 자동 생성했어요 </H3>

                        <ContentAnalysisSection>
                          

                          <MoleculeAnalysisCard
                            showButton={false}
                            type="template"
                            onButtonClick={() => {
                              setShowPreviewPopup(true);
                          // setSelectedTemplate(template);
                            }}
                            values={{
                              deviceInfo: "기기명 (55인치 / 1920×1080(FHD) / 1217×685mm)",
                              materialType: "수용기기에 맞춰 맞춤 지료"
                              // 필요한 값만 override
                            }}
                          />

                          <ContentOptionsSection>
                            <TabContent5Item>
                              <div className="title">
                                <Body1 color="gray700">콘텐츠 목적</Body1>
                              </div>

                              <SelectBox ref={customerListRef}>
                                <SelectBoxTitle
                                  onClick={() =>
                                    handleSelectBoxClick(
                                      "customerList",
                                      customerListRef
                                    )
                                  }
                                >
                                  <Body2
                                    color={
                                      selectedPurposes.customerList
                                        ? "gray800"
                                        : "gray300"
                                    }
                                  >
                                    {selectedPurposes.customerList ||
                                      "선택해주세요"}
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
                                  <SelectBoxList dropUp={dropUpStates.customerList} style={{zIndex: "1000"}}>
                                    <SelectBoxItem onClick={() => handleContentTypeSelect("정보전달형")}>
                                      <Body2 color="gray700" align="left">정보전달형</Body2>
                                    </SelectBoxItem>
                                    
                                    <SelectBoxItem onClick={() => handleContentTypeSelect("프로세스 안내형")}>
                                      <Body2 color="gray700" align="left">프로세스 안내형</Body2>
                                    </SelectBoxItem>
                                    
                                    <SelectBoxItem onClick={() => handleContentTypeSelect("홍미유도형")}>
                                      <Body2 color="gray700" align="left">홍미유도형</Body2>
                                    </SelectBoxItem>
                                    
                                    <SelectBoxItem onClick={() => handleContentTypeSelect("경고/주의형")}>
                                      <Body2 color="gray700" align="left">경고/주의형</Body2>
                                    </SelectBoxItem>
                                    
                                    <SelectBoxItem onClick={() => handleContentTypeSelect("광고/홍보형")}>
                                      <Body2 color="gray700" align="left">광고/홍보형</Body2>
                                    </SelectBoxItem>
                                  </SelectBoxList>
                                )}
                              </SelectBox>

                              <div className="title" style={{marginTop: "24px"}}>
                                <Body1 color="gray700">콘텐츠 대상자</Body1>
                              </div>
                              <FormBox Large>
                                <CustomTextarea
                                  Edit
                                  rows={1}
                                  placeholder="작성해주세요"
                                  value={contentTarget}
                                  onChange={(e) =>
                                    setContentTarget(e.target.value)
                                  }
                                  status="valid"
                                />
                              </FormBox>

                              <div className="title" style={{marginTop: "24px"}}>
                                <Body1 color="gray700">콘텐츠 내용 </Body1>
                              </div>

                              <FestivalInfoBox>
                                <Markdown>
                                  {`# 🎪 수성거리축제 안내

## 📅 축제 개요
**강원도 고성군 간성지역**에서 매년 가을에 열리는 대표적인 지역축제입니다.
민, 관, 군이 함께하는 화합의 장으로 지역 주민과 관광객들에게 특별한 추억을 선사합니다.

*`}
                                </Markdown>
                              </FestivalInfoBox>
                            </TabContent5Item>
                          </ContentOptionsSection>
                        </ContentAnalysisSection>
                      </TabContent5Item>
                    </div>

                    <ButtonContainer>
                      <Button
                        Primary
                        Edit
                        Large
                        onClick={() => {
                          handleSubmitReport();
                        }}
                      >
                        내용 재생성
                      </Button>
                      
                      <Button
                        Primary
                        Large
                        Fill
                        onClick={handleDisplayConversion}
                      >
                        디스플레이로 변환
                      </Button>
                    </ButtonContainer>
                  </>
                )}
              </TabContent5>
              )}

{activeTab === 4 && (completedSteps.includes(3) || completedSteps.includes(4)) && (
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
                    <AtomPersonaLoader message="콘텐츠 핵심 내용을 AI로 분석하고 있어요" />
                  </div>
                ) : (
                  <>
                    <div className="content">
                      <TabContent5Item required>  
                        <H3 color="gray800" style={{textAlign: "left" }}>확정된 콘텐츠를 화면에 적용해보세요 </H3>
                        <DashedLine />
                        <CompletionContainer>
                          <CompletionIcon>
                            <CheckIcon>✓</CheckIcon>
                          </CompletionIcon>

                          <CompletionMessage>
                            <H3 color="gray800" style={{ marginBottom: '8px' }}>콘텐츠 등록이 완료되었습니다</H3>
                            <Body3 color="gray600">콘텐츠를 즉시 사용하려면 아래 "바로 사용하기" 버튼을 클릭하세요</Body3>
                          </CompletionMessage>
                        </CompletionContainer>

                        <ContentAnalysisSection>
                          <MoleculeAnalysisCard
                            showButton={false}
                            type="template"
                            onButtonClick={() => {
                              setShowPreviewPopup(true);
                              // setSelectedTemplate(template);
                            }}
                            values={{
                              deviceInfo: "기기명 (55인치 / 1920×1080(FHD) / 1217×685mm)",
                              materialType: "수용기기에 맞춰 맞춤 지료"
                              // 필요한 값만 override
                            }}
                          />

                          
                        </ContentAnalysisSection>
                        <DashedLine />  
                      </TabContent5Item>
                    </div>

                    <ButtonContainer>
                      <Button
                        Primary
                        Edit
                        Large
                        onClick={() => {
                          handleSubmitReport();
                        }}
                      >
                       나중에 사용하기
                      </Button>
                      
                      <Button
                        Primary
                        Large
                        Fill
                        onClick={handleDisplayConversion}
                      >
                      바로 사용하기
                      </Button>
                    </ButtonContainer>
                  </>
                )}
              </TabContent5>
            )}

              

          </DesignAnalysisWrap>
      </MainContent>
      </ContentsWrap>

      {showPopup && (
        <>
          <StyledInterviewPopup>
            <div style={{ 
              maxWidth: "700px",
              width: "100%",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "20px",
              padding: "32px 32px",
              borderRadius: "15px",
              background: "#FFFFFF",
              boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.15)"
            }}>
              <div className="header">
                <H4 style={{ 
                  fontSize: "16px", 
                  marginBottom: "16px" 
                }}>
                  {npsConceptDefinition[selectedConceptId]?.personaTitle || "컨셉 정보"} 대상 컨셉정의 내용 보기
                  <span className="close" onClick={() => setShowPopup(false)} />
                </H4>
                <div style={{ 
                  width: "100%", 
                  height: "1px", 
                  backgroundColor: "#E0E4EB", 
                  marginBottom: "16px" 
                }} />
              </div>

              <div className="content" style={{ 
                maxHeight: "500px",
                overflowY: "auto"
              }}>
                <div>
                  <div
                    className="markdown-body core-value-section"
                    style={{
                      color: palette.gray800,
                      textAlign: "left",
                      "& h1, & h2, & h3, & h4, & h5, & h6": {
                        marginBottom: "0px",
                        marginTop: "0px"
                      },
                      "& h1 + p, & h2 + p, & h3 + p, & h4 + p, & h5 + p, & h6 + p": {
                        marginTop: "12px"
                      }
                    }}
                  >
                    <Markdown>
                      {npsConceptDefinition[selectedConceptId]?.conceptDefinitionFinalReport || "내용 없음"}
                    </Markdown>
                  </div>
                </div>
              </div>
            </div>
          </StyledInterviewPopup>
        </>
      )}

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

      {showCreatePersonaPopup && (
        <PopupWrap
          Check
          title="NPS 분석을 시작합니다"
          message="페르소나 기반 NPS 분석을 진행하시겠습니까?"
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
      )}

      {showCreditPopup && (
        <PopupWrap
          Warning
          title="서비스 이용 안내"
          message="해당 서비스를 이용하시겠습니까?"
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

      {/* 미리보기 팝업 */}
      {showPreviewPopup  && (
        <PopupWrap
          title="디스플레이 콘텐츠 자세히 보기"
          // subtitle={selectedTemplate.title}
          // buttonType="Fill"
          // confirmText="이 템플릿 사용하기"
          isModal={true}
          isFormValid={true}
          onCancel={handleClosePreviewPopup}
          onConfirm={() => {
            handleClosePreviewPopup();
          }}
          body={
            <TemplatePreviewContainer>
              
              <PreviewInfoSection>
                <InfoSection>
                  <SectionTitle>
                    <Body3 color="gray600">콘텐츠 목적</Body3>
                  </SectionTitle>
                  <ContentBox>
                    <Body3   color="gray700" >
                      정보전달형 콘텐츠
                    </Body3>
                  </ContentBox>
                </InfoSection>

                <InfoSection>
                  <SectionTitle>
                    <Body3 color="gray600">콘텐츠 방향성</Body3>
                  </SectionTitle>
                  <ContentBox>
                    <Body3 color="gray700" >
                    수성거리 축제에 대한 정보를 정확하게 전달할 수 있는 내용으로 구성 
                    </Body3>
                  </ContentBox>
                </InfoSection>

                <InfoSection>
                  <SectionTitle>
                    <Body3 color="gray600">콘텐츠 내용</Body3>
                  </SectionTitle>
                
                  <ContentBox>
                    <Body3 color="gray700" style={{ lineHeight: "1.6" }}>
                      매년 가을, 고성군 간성읍 간성올 일대에서 열리는 수성기리축제는 민·관·군이 함께 
                      참여하는 지역 화합의 축제입니다. 주요 행사는 체감거리, 줄다리, 시장터, 거리 퍼
                      레이드, 가족 단위미기구 놀이며, 청년교육사업 일기부의 결계능을 업그레이의 기회에
                      서 진행됩니다.
                    </Body3>
                  </ContentBox>
                </InfoSection>

                
              </PreviewInfoSection>
            </TemplatePreviewContainer>
          }
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

const InterviewModeSelection = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: flex-start;
  margin-bottom: 48px;

  button {
    flex: 0 0 auto;
    max-width: 200px;
  }

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

const StyledInterviewPopup = styled(InterviewPopup)`
  .markdown-body {
    h1, h2, h3, h4, h5, h6 {
      margin-top: 0px;
      margin-bottom: 12px;
      color: ${palette.gray800};
  font-weight: 600;
    }
    p, li, span {
      line-height: 1.55;
    }
    p {
      margin-bottom: 8px;
    }
    h1 { font-size: 24px; }
    h2 { font-size: 20px; }
    h3 { font-size: 18px; }
  }
  .core-value-section h2:nth-of-type(4) ~ p:last-of-type {
    margin-bottom: 12px !important;
  }

  h2:nth-of-type(4) ~ h2:nth-of-type(5) {
    margin-top: 20px;
  }
`;

const ConceptListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const ConceptCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${props => props.isSelected ? palette.primary : palette.outlineGray};
  border-radius: 10px;
  cursor: pointer;
  background-color: ${props => props.isSelected ? "rgba(34, 111, 255, 0.05)" : "white"};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${palette.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ConceptInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PersonaListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin: 20px 0;
`;

const PersonaCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  background: white;
`;

const PersonaImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 12px;
    background: ${palette.gray100};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PersonaInfo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ResultSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const ResultCard = styled.div`
  padding: 20px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  background: white;
  text-align: center;
`;

const ScoreDisplay = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: ${palette.primary};
  margin: 8px 0;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
    // background: ${palette.gray100};
    width: 100%;
`;

const InfoIcon = styled.div`
  font-size: 24px;
  color: ${palette.primary};
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DeviceInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 8px;

  > * {
    white-space: nowrap;
  }

  // > *:not(:last-child)::after {
  //   content: "|";
  //   margin-left: 8px;
  //   color: #E0E4EB;
  // }
    > *:not(:last-child):not(:nth-last-child(2))::after {
    content: "|";
    margin-left: 8px;
    color: #E0E4EB;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContentAnalysisSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 24px 0;
  width: 100%;
`;

const ContentOptionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const OptionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SelectDropdown = styled.div`
  select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #E0E4EB;
    border-radius: 6px;
    font-size: 14px;
    color: ${palette.gray700};
    background: white;
    
    &:focus {
      outline: none;
      border-color: ${palette.primary};
    }
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E0E4EB;
  border-radius: 6px;
  font-size: 14px;
  color: ${palette.gray700};
  
  &:focus {
    outline: none;
    border-color: ${palette.primary};
  }
  
  &::placeholder {
    color: ${palette.gray400};
  }
`;

const ColorOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ColorOption = styled.div`
  input[type="radio"] {
    display: none;
  }
  
  label {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border: 1px solid #E0E4EB;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: ${palette.primary};
      background: rgba(34, 111, 255, 0.02);
    }
  }
  
  input[type="radio"]:checked + label {
    border-color: ${palette.primary};
    background: rgba(34, 111, 255, 0.05);
  }
`;

const ColorPreview = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
`;


const FestivalInfoBox = styled.div`

  border: 2px solid #e8ecff;
  border-radius: 16px;
  padding: 24px;
  margin-top: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

// const TemplateGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
//   gap: 20px;
//   margin-top: 24px;
// `;
const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 24px;
  width: 100%;
  box-sizing: border-box;
`;

const TemplateCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  overflow: hidden;
`;

const TemplateImageContainer = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  background-color: ${palette.gray100};
`;

const TemplateImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TemplateContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TemplateCategory = styled.div`
  font-size: 14px;
  color: ${palette.gray700};
`;

const TemplateTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${palette.gray800};
`;

const TemplateDescription = styled.div`
  font-size: 14px;
  color: ${palette.gray600};
`;

const TemplateActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;


const CompletionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 32px auto;
  text-align: center;
  width: 100%;
`;

const CompletionIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${palette.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled.div`
  color: white;
  font-size: 28px;
  font-weight: bold;
`;

const CompletionMessage = styled.div`
  text-align: center;
  max-width: 400px;
`;

const DashedLine = styled.div`
  width: 100%;
  height: 1px;
  border-top: 2px solid ${palette.gray300};
  margin: 16px 0;
`;

const TemplatePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PreviewImageSection = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 10px;
  background-color: ${palette.gray100};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PreviewInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
`;

const SectionTitle = styled.div`
  // margin-bottom: 4px;
`;

const ContentTitle = styled.div`
  margin-bottom: 8px;
`;

const ContentDescription = styled.div`
  line-height: 1.6;
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const LocationDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${palette.red || '#FF4444'};
  flex-shrink: 0;
`;

const ContactInfo = styled.div`
  margin-top: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0;
  border-bottom: 1px solid ${palette.lineGray};
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.div`
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  line-height: 1.5;
`;

const PlaceholderImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ContentBox = styled.div`
  background: ${palette.gray100};
  // border: 1px solid ${palette.gray200};
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 4px;
`;