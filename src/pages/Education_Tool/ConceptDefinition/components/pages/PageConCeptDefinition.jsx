import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import Markdown from "markdown-to-jsx";
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
} from "../../../../../assets/styles/InputStyle";
import {
  ContentsWrap,
  MainContent,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  CardGroupWrap,
  BgBoxItem,
  DropzoneStyles,
  ListBoxGroup,
  PersonaGroup,
  BoxWrap,
  TabContent5Item,
  Persona,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import personaImages from "../../../../../assets/styles/PersonaImages";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  PSST_FILE_ID,
  PROJECT_SAAS,
  PSST_BUSINESS_INFO,
  PROJECT_ANALYSIS_MULTIMODAL,
  PSST_ANALYSIS_RESULTS,
  PSST_FILE_NAMES,
  PSST_REPORT,
  PSST_SELECTED_TEMPLETE,
  PROJECT_ANALYSIS_MULTIMODAL_DESCRIPTION,
  PROJECT_ANALYSIS_MULTIMODAL_KEYMESSAGE,
  PERSONA_LIST_SAAS,
  CONCEPT_DEFINITION_FIRST_REPORT,
  CONCEPT_DEFINITION_FINAL_REPORT,
  CONCEPT_DEFINITION_SELECTED_PERSONA,
} from "../../../../AtomStates";
import images from "../../../../../assets/styles/Images";
import {
  H3,
  Body1,
  Body2,
  Body3,
  Caption1,
} from "../../../../../assets/styles/Typography";
import {
  createToolOnServer,
  updateToolOnServer,
  InterviewXPsstMultimodalRequest,
  InterviewXPsstAnalysisRequest,
  getFindToolListOnServerSaas,
  EducationToolsRequest,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import MoleculeDesignItem from "../molecules/MoleculeDesignItem";
import MoleculeFileUpload from "../molecules/MoleculeFileUpload";
import MoleculeAnalysisResults from "../molecules/MoleculeAnalysisResults";
import MoleculePersonaSelectCard from "../../../public/MoleculePersonaSelectCard";
import MoleculeItemSelectCard from "../../../public/MoleculeItemSelectCard";

import { useDynamicViewport } from "../../../../../assets/DynamicViewport";

const prepareMarkdown = (text) => {
  if (!text) return "";
  // 연속된 줄바꿈('\n\n')을 <br/><br/>로 변환
  return text.replace(/\n\n/g, "\n&nbsp;\n").replace(/\n/g, "  \n");
};

const PageConceptDefinition = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [personaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [conceptDefinitionFinalReport, setConceptDefinitionFinalReport] =
    useAtom(CONCEPT_DEFINITION_FINAL_REPORT);
  const [psstBusinessInfo, setPsstBusinessInfo] = useAtom(PSST_BUSINESS_INFO);
  const [, setPsstFileId] = useAtom(PSST_FILE_ID);
  const [projectAnalysisMultimodal, setProjectAnalysisMultimodal] = useAtom(
    PROJECT_ANALYSIS_MULTIMODAL
  );
  const [
    conceptDefinitionSelectedPersona,
    setConceptDefinitionSelectedPersona,
  ] = useAtom(CONCEPT_DEFINITION_SELECTED_PERSONA);
  const [
    projectAnalysisMultimodalKeyMessage,
    setProjectAnalysisMultimodalKeyMessage,
  ] = useAtom(PROJECT_ANALYSIS_MULTIMODAL_KEYMESSAGE);
  const [
    projectAnalysisMultimodalDescription,
    setProjectAnalysisMultimodalDescription,
  ] = useAtom(PROJECT_ANALYSIS_MULTIMODAL_DESCRIPTION);
  const [analysisResults, setAnalysisResults] = useAtom(PSST_ANALYSIS_RESULTS);
  const [fileNames, setFileNames] = useAtom(PSST_FILE_NAMES);
  const [psstReport, setPsstReport] = useAtom(PSST_REPORT);
  const [selectedTemplete, setSelectedTemplete] = useAtom(
    PSST_SELECTED_TEMPLETE
  );
  const [conceptDefinitionFirstReport, setConceptDefinitionFirstReport] =
    useAtom(CONCEPT_DEFINITION_FIRST_REPORT);

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [isCreateReportIndex, setIsCreateReportIndex] = useState(false);
  const [hideIndexButton, setHideIndexButton] = useState(false);
  const [selectedPersonas, setSelectedPersonas] = useState(null);
  const [selectedValue, setSelectedValue] = useState([]);
  const [conceptDefinitionValue, setConceptDefinitionValue] = useState([]);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
  });
  const [kanoModelList, setKanoModelList] = useState([]);

  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
  });
  // 초기 상태를 빈 배열로 설정

  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(1);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interviewLoading = async () => {
      if (toolLoading) {
        // 비즈니스 정보 설정 (Step 1)
        if (psstBusinessInfo) {
          setPsstBusinessInfo(psstBusinessInfo ?? {});
        }

        // 활성 탭 설정 (기본값 1)
        // setActiveTab(Math.min((toolStep ?? 1) +1 , 3));
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

        if (fileNames) {
          setFileNames(fileNames ?? []);
          setUploadedFiles(fileNames ?? []);
        }
        // 비즈니스 정보 설정 (Step 1)

        if (projectAnalysisMultimodal) {
          setProjectAnalysisMultimodal(projectAnalysisMultimodal ?? "");
          setIsCreateReportIndex(true);
        }

        if (projectAnalysisMultimodalKeyMessage) {
          setProjectAnalysisMultimodalKeyMessage(
            projectAnalysisMultimodalKeyMessage ?? ""
          );
        }

        if (projectAnalysisMultimodalDescription) {
          setProjectAnalysisMultimodalDescription(
            projectAnalysisMultimodalDescription ?? ""
          );
        }

        if (selectedTemplete) {
          setSelectedTemplete(selectedTemplete ?? []);
        }

        if (analysisResults) {
          setAnalysisResults(analysisResults ?? []);
        }

        if (psstReport) {
          setPsstReport(psstReport ?? "");
        }

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  // KanoModel 리스트 가져오기
  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];

        const response = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_kano_model_education",
          isLoggedIn
        );

        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_kano_model_education" &&
            item?.completedStep === 3
        );

        allItems = [...allItems, ...newItems];

        setKanoModelList(allItems);
      } catch (error) {
        setKanoModelList([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn, projectSaas]);
  console.log("kanomodel", kanoModelList);

  const handleCheckboxChange = (index) => {
    if (toolSteps >= 2) return;
    setSelectedTemplete((prev) => {
      // 하나만 선택되도록 변경, 다른 항목 선택 시 해당 항목으로 변경
      if (prev.includes(index)) {
        return []; // 이미 선택된 항목을 다시 클릭하면 선택 해제
      } else {
        return [index]; // 새 항목 선택
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

  const business = {
    businessModel: project.businessModel,
    projectAnalysis: project.projectAnalysis,
    projectDescription: project.projectDescription,
    projectTitle: project.projectTitle,
    targetCountry: project.targetCountry,
  };

  const handleSubmitPersona = async () => {
    handleNextStep(1);
    setToolSteps(1);
    console.log("selectedPersonas", selectedPersonas);

    // const responseToolId = await createToolOnServer(
    //   {
    //     projectId: project._id,
    //     type: "ix_concept_definition_education",
    //     selectedPersona: selectedPersonas,
    //   },
    //   isLoggedIn
    // );

    // setToolId(responseToolId);
  };

  const handleCheckValue = async () => {
    setIsLoading(true);

    const personaGroup = selectedPersonas.map((persona) => ({
      personaName: persona.personaName,
      personaCharacteristics: persona.personaCharacteristics,
      type: persona.type,
      age: persona.age,
      gender: persona.gender,
      job: persona.job,
      keywords: persona.keywords,
    }));

    try {
      const data = {
        type: "ix_concept_definition_report_education",
        business: business,
        persona_group: personaGroup,
        kano_model: kanoModelList,
      };

      let response = await EducationToolsRequest(data, isLoggedIn);

      console.log("response", response);

      setConceptDefinitionFirstReport(
        response.response.concept_definition_report_education
      );

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setShowPopupError(true);
      setIsLoading(false);
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
        const apiRequestData = {
          type: "ix_concept_definition_final_report_education",
          concept_definition_report_education: conceptDefinitionFirstReport,
        };

        let response = await EducationToolsRequest(apiRequestData, isLoggedIn);
        console.log("response", response);
        setConceptDefinitionFinalReport(response.response);

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

  const handlePurposeSelect = (purpose, selectBoxId) => {
    setSelectedPurposes((prev) => ({
      ...prev,
      [selectBoxId]: purpose,
    }));

    setSelectBoxStates((prev) => ({
      ...prev,
      [selectBoxId]: false,
    }));
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("ConceptDefinition")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
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
      event.preventDefault();

      event.returnValue = "";

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

    detectRefresh();

    window.addEventListener("keydown", handleKeyDown);

    return () => {
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
                    페르소나 선택
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
                    핵심가치 도출
                  </Body1>
                  {/* <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Analyze Key Points​
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
                    컨셉 정의서
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <>
                  <div className="title">
                    <H3 color="gray800">Persona Selection</H3>
                    <Body3 color="gray800">
                      컨셉정의서를 작성할 타겟 페르소나를 선택하세요
                    </Body3>
                  </div>

                  <div className="content">
                    <div>
                      <ListBoxGroup>
                        <li>
                          <Body2 color="gray500">페르소나 선택</Body2>
                          {selectedPersonas ? (
                            <PersonaGroup>
                              {Array.isArray(selectedPersonas) ? (
                                <>
                                  {selectedPersonas.length > 3 && (
                                    <span>+{selectedPersonas.length - 3}</span>
                                  )}
                                  {selectedPersonas
                                    .slice(0, 3)
                                    .map((persona, index) => (
                                      <Persona key={index} size="Small" Round>
                                        <img
                                          src={
                                            personaImages[persona.imageKey] ||
                                            (persona.gender === "남성"
                                              ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                              : personaImages.persona_f_20_01) // 여성 기본 이미지
                                          }
                                          alt={persona.persona}
                                        />
                                      </Persona>
                                    ))}
                                </>
                              ) : (
                                <Persona size="Small" Round>
                                  <img
                                    src={
                                      personaImages[
                                        selectedPersonas.imageKey
                                      ] ||
                                      (selectedPersonas.gender === "남성"
                                        ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                        : personaImages.persona_f_20_01) // 여성 기본 이미지
                                    }
                                    alt={selectedPersonas.persona}
                                  />
                                </Persona>
                              )}
                            </PersonaGroup>
                          ) : (
                            <Body2 color="gray300">
                              아래 리스트에서 페르소나를 선택해주세요 (최대 3명
                              선택가능)
                            </Body2>
                          )}
                        </li>
                      </ListBoxGroup>
                    </div>

                    <div className="title">
                      <Body1
                        color="gray800"
                        style={{ textAlign: "left", marginBottom: "-20px" }}
                      >
                        Favorite 페르소나 리스트
                      </Body1>
                    </div>

                    {personaListSaas.filter((item) => item.favorite === true)
                      .length >= 20 ? (
                      <MoleculePersonaSelectCard
                        filteredPersonaList={personaListSaas}
                        selectedPersonas={selectedPersonas}
                        onPersonaSelect={(persona) => {
                          setSelectedPersonas(persona);
                        }}
                        interviewType="multiple"
                        // onPersonaSelect={handlePersonaSelect}
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
                          즐겨찾기를 하시면 관심 있는 페르소나를 해당 페이지에서
                          확인하실 수 있습니다.
                          {
                            personaListSaas.filter(
                              (item) => item.favorite === true
                            ).length
                          }
                        </Body2>
                      </BoxWrap>
                    )}
                  </div>

                  <Button
                    Other
                    Primary
                    Fill
                    Round
                    onClick={handleSubmitPersona}
                    disabled={toolSteps >= 1 || !selectedPersonas}
                  >
                    다음
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
                    <BoxWrap Column NoneV style={{ marginBottom: "24px" }}>
                      <div className="selectBoxWrap">
                        <Body2 color="gray500" style={{ width: "110px" }}>
                          페르소나 선택
                        </Body2>
                        {selectedPersonas ? (
                          <PersonaGroup>
                            {Array.isArray(selectedPersonas) ? (
                              <>
                                {selectedPersonas.length > 3 && (
                                  <span>+{selectedPersonas.length - 3}</span>
                                )}
                                {selectedPersonas
                                  .slice(0, 3)
                                  .map((persona, index) => (
                                    <Persona key={index} size="Small" Round>
                                      <img
                                        src={
                                          personaImages[persona.imageKey] ||
                                          (persona.gender === "남성"
                                            ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                            : personaImages.persona_f_20_01) // 여성 기본 이미지
                                        }
                                        alt={persona.persona}
                                      />
                                    </Persona>
                                  ))}
                              </>
                            ) : (
                              <Persona size="Small" Round>
                                <img
                                  src={
                                    personaImages[selectedPersonas.imageKey] ||
                                    (selectedPersonas.gender === "남성"
                                      ? personaImages.persona_m_20_01 // 남성 기본 이미지
                                      : personaImages.persona_f_20_01) // 여성 기본 이미지
                                  }
                                  alt={selectedPersonas.persona}
                                />
                              </Persona>
                            )}
                          </PersonaGroup>
                        ) : (
                          <Body2 color="gray300"></Body2>
                        )}
                      </div>
                      <div className="selectBoxWrap">
                        <Body2 color="gray500" style={{ width: "110px" }}>
                          핵심 가치 선택
                        </Body2>
                        <SelectBox style={{ paddingRight: "20px" }}>
                          <SelectBoxTitle
                            onClick={() =>
                              toolSteps >= 2
                                ? null
                                : setIsSelectBoxOpen(!isSelectBoxOpen)
                            }
                            None
                            style={{
                              cursor:
                                toolSteps >= 2 ? "not-allowed" : "pointer",
                            }}
                          >
                            {selectedPurposes?.customerList ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  paddingLeft: "20px",
                                }}
                              >
                                {/* <Body1 color="gray700" align="left">
                                    {
                                      selectedPurposes?.analysisScope?.split(
                                        "|"
                                      )[0]
                                    }{" "}
                                    |
                                  </Body1> */}
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
                                {/* <Body2 color="gray700" align="left">
                                    {
                                      selectedPurposes?.analysisScope?.split(
                                        "|"
                                      )[1]
                                    }
                                  </Body2> */}
                              </div>
                            ) : (
                              <Body2
                                color="gray300"
                                style={{ paddingLeft: "20px" }}
                              >
                                Kano Model 결과 중 하나를 선택하세요.
                              </Body2>
                            )}
                            <images.ChevronDown
                              width="24px"
                              height="24px"
                              color={
                                toolSteps >= 1
                                  ? palette.gray300
                                  : palette.gray500
                              }
                              style={{
                                transform: isSelectBoxOpen
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                              }}
                            />
                          </SelectBoxTitle>

                          {isSelectBoxOpen && (
                            <SelectBoxList>
                              {kanoModelList?.map((item, index) => (
                                <SelectBoxItem
                                  key={index}
                                  onClick={() => {
                                    handlePurposeSelect(
                                      ` ${item.updateDate.split(":")[0]}:${
                                        item.updateDate.split(":")[1]
                                      }-Kano Model 결과`,
                                      "customerList",
                                      item
                                    );

                                    setIsSelectBoxOpen(false);
                                  }}
                                >
                                  {/* <Body1 color="gray700" align="left">
                                    상황 중심 여정 분석 |{" "}
                                  </Body1> */}
                                  <Body2 color="gray700" align="left">
                                    {item.updateDate.split(":")[0]}:
                                    {item.updateDate.split(":")[1]} - Kano Model
                                    결과
                                  </Body2>
                                </SelectBoxItem>
                              ))}
                            </SelectBoxList>
                          )}
                        </SelectBox>
                      </div>
                    </BoxWrap>

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
                          <Markdown>
                            {prepareMarkdown(
                              conceptDefinitionFirstReport ?? ""
                            )}
                          </Markdown>
                        </div>
                      </InsightAnalysis>
                    )}
                  </div>
                  {conceptDefinitionFirstReport &&
                  conceptDefinitionFirstReport.length > 0 ? (
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
                        onClick={handleReportRequest}
                        disabled={toolSteps > 2}
                      >
                        컨셉 정의 작성하기
                      </Button>
                    </div>
                  ) : (
                    <Button
                      Other
                      Primary
                      Fill
                      Round
                      onClick={handleCheckValue}
                      disabled={
                        toolSteps > 2 ||
                        !selectedPurposes.customerList ||
                        isLoading
                      }
                    >
                      페르소나 & 핵심가치 확인
                    </Button>
                  )}
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
                        <Markdown>{prepareMarkdown(psstReport ?? "")}</Markdown>
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

export default PageConceptDefinition;

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
  text-align: left;

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

  p {
    text-align: left;
  }

  /* GitHub Markdown 스타일 적용 */
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    color: ${palette.gray800};
    font-family: "Pretendard";
    line-height: 1.65;
    /* white-space: pre-wrap; */
    /* max-width: 980px; */
    /* padding: 45px; */
    /* &,
    p,
    li,
    ul,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong,
    em,
    span,
    div {
      color: ${palette.gray800}; 
    } */
    @media (max-width: 767px) {
      padding: 15px;
    }
  }
`;
