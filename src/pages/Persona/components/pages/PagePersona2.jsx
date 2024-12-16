import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_PERSONA_ACCESSIBLE,
  PERSONA_BUTTON_STATE_2,
  IS_LOGGED_IN,
  CONVERSATION_ID,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  PERSONA_LIST,
  REPORT_LIST,
  IS_LOADING,
  PERSONA_STEP,
  BUSINESS_ANALYSIS,
  REQUEST_PERSONA_LIST,
  PROJECT_ID,
  PROJECT_LOAD_BUTTON_STATE,
  CATEGORY_COLOR,
} from "../../../AtomStates";
import {
  ContentsWrap,
  ContentSection,
  MainContent,
  AnalysisWrap,
  MainSection,
  Title,
  CardWrap,
  CustomizePersona,
  AccordionSection,
  AccordionHeader,
  AccordionIcon,
  AccordionContent,
  CustomAccordionHeader,
  CustomAccordionIcon,
  CustomAccordionContent,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import {
  CustomTextarea,
  CustomInput,
} from "../../../../assets/styles/InputStyle";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
import MoleculeHeader from "../molecules/MoleculeHeader";
import MoleculeStepIndicator from "../molecules/MoleculeStepIndicator";
import MoleculePersonaCard from "../molecules/MoleculePersonaCard";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
// import { updateProjectReportOnServer } from "../../../../utils/indexedDB";
import OrganismBusinessAnalysis from "../organisms/OrganismBisinessAnalysis";
import AtomLoader from "../atoms/AtomLoader";
import PopupWrap from "../../../../assets/styles/Popup";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";

const PagePersona2 = () => {
  const [categoryColor, setCategoryColor] = useAtom(CATEGORY_COLOR);
  const [reportList, setReportList] = useAtom(REPORT_LIST);
  const [projectLoadButtonState, setProjectLoadButtonState] = useAtom(
    PROJECT_LOAD_BUTTON_STATE
  );
  const [requestPersonaListReady, setRequestPersonaListReady] = useState(false);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [personaButtonState2, setPersonaButtonState2] = useAtom(
    PERSONA_BUTTON_STATE_2
  );
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [requestPersonaList, setRequestPersonaList] =
    useAtom(REQUEST_PERSONA_LIST);

  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [checkedPersonas, setCheckedPersonas] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPersonaForPopup, setSelectedPersonaForPopup] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showCustomizePopup, setShowCustomizePopup] = useState(false);
  const [customizeFormState, setCustomizeFormState] = useState({
    quantity: 1,
    isAccordionOpen: false,
  });

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [steps, setSteps] = useState([
    { number: 1, label: "비즈니스 분석", active: true },
    { number: 2, label: "맞춤 페르소나 추천", active: true },
    { number: 3, label: "인터뷰 방법 선택", active: false },
    { number: 4, label: "페르소나와 인터뷰", active: false },
    { number: 5, label: "의견 분석", active: false },
  ]);

  const handlePersonaSelect = (persona, isSelected) => {
    setSelectedPersonas((prev) => {
      if (isSelected) {
        // 최대 5개까지만 선택 가능
        if (prev.length >= 5) {
          return prev;
        }
        return [...prev, persona];
      } else {
        return prev.filter((p) => p !== persona);
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/Main"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, [navigate]);

  useEffect(() => {
    if (projectId) {
      setRequestPersonaListReady(true);
    }
  }, [projectId]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "광고/마케팅":
        return "Red";
      case "교육":
        return "LavenderMagenta";
      case "금융/보험/핀테크":
        return "Amethyst";
      case "게임":
        return "VistaBlue";
      case "모빌리티/교통":
        return "BlueYonder";
      case "물류":
        return "MidnightBlue";
      case "부동산/건설":
        return "ButtonBlue";
      case "뷰티/화장품":
        return "ButtonBlue";
      case "AI/딥테크/블록체인":
        return "MiddleBlueGreen";
      case "소셜미디어/커뮤니티":
        return "GreenSheen";
      case "여행/레저":
        return "TropicalRainForest";
      case "유아/출산":
        return "DollarBill";
      case "인사/비즈니스/법률":
        return "Olivine";
      case "제조/하드웨어":
        return "ChineseGreen";
      case "커머스":
        return "Jonquil";
      case "콘텐츠/예술":
        return "PastelOrange";
      case "통신/보안/데이터":
        return "Tangerine";
      case "패션":
        return "Copper";
      case "푸드/농업":
        return "Shadow";
      case "환경/에너지":
        return "Tuscany";
      case "홈리빙/펫":
        return "VeryLightTangelo";
      case "헬스케어/바이오":
        return "Orange";
      case "피트니스/스포츠":
        return "CarnationPink";
      default:
        return "";
    }
  };

  useEffect(() => {
    const loadProject = async () => {
      if (projectLoadButtonState) {
        const savedProjectInfo = await getProjectByIdFromIndexedDB(
          projectId,
          projectLoadButtonState
        );
        if (savedProjectInfo) {
          setBusinessAnalysis(savedProjectInfo.businessAnalysis);
          setRequestPersonaList(savedProjectInfo.requestPersonaList);
          setCategoryColor({
            first: getCategoryColor(
              savedProjectInfo.businessAnalysis.category.first
            ),
            second: getCategoryColor(
              savedProjectInfo.businessAnalysis.category.second
            ),
            third: getCategoryColor(
              savedProjectInfo.businessAnalysis.category.third
            ),
          });
          let unselectedPersonas = [];
          let data, response;

          // 카테고리별로 페르소나 요청
          for (const category of Object.values(
            savedProjectInfo.businessAnalysis.category
          )) {
            data = {
              target: category,
            };

            response = await axios.post(
              "https://wishresearch.kr/person/find",
              data,
              axiosConfig
            );

            let newPersonas = response.data;

            // 이미 존재하는 페르소나는 제외
            for (let i = 0; i < newPersonas.length; i++) {
              let isDuplicate = false;
              for (let j = 0; j < unselectedPersonas.length; j++) {
                if (unselectedPersonas[j].persona === newPersonas[i].persona) {
                  isDuplicate = true;
                  break;
                }
              }
              if (!isDuplicate) {
                unselectedPersonas.push(newPersonas[i]);
              }
            }
          }

          let personaList = {
            selected: [],
            unselected: unselectedPersonas,
          };
          setPersonaList(personaList);
        }
        // setIsLoadingPage(false); // 로딩 완료
      }
      setProjectLoadButtonState(false);
    };

    loadProject();
  }, [projectId, projectLoadButtonState, navigate]);

  // if (isLoadingPage) {
  //   return <div>Loading...</div>;
  // }

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const loadPersona = async () => {
      try {
        if (personaButtonState2) {
          setIsLoading(true);

          let unselectedPersonas = [];
          let data, response;

          // 카테고리별로 페르소나 요청
          for (const category of Object.values(businessAnalysis.category)) {
            data = {
              target: category,
            };

            response = await axios.post(
              "https://wishresearch.kr/person/find",
              data,
              axiosConfig
            );

            let newPersonas = response.data;

            // 이미 존재하는 페르소나는 제외
            for (let i = 0; i < newPersonas.length; i++) {
              let isDuplicate = false;
              for (let j = 0; j < unselectedPersonas.length; j++) {
                if (unselectedPersonas[j].persona === newPersonas[i].persona) {
                  isDuplicate = true;
                  break;
                }
              }
              if (!isDuplicate) {
                unselectedPersonas.push(newPersonas[i]);
              }
            }
          }

          let personaList = {
            selected: [],
            unselected: unselectedPersonas,
          };
          console.log(personaList);
          setPersonaList(personaList);

          ////////////////////////////////////////////////////////////////////////////////////////
          data = {
            business_idea: businessAnalysis.title,
          };

          response = await axios.post(
            "https://wishresearch.kr/person/persona_request",
            data,
            axiosConfig
          );

          let requestPersonaList = response.data;

          let retryCount = 0;
          const maxRetries = 10;
          // console.log(requestPersonaList);
          while (
            retryCount < maxRetries &&
            (!response ||
              !response.data ||
              !requestPersonaList.hasOwnProperty("persona_spectrum") ||
              requestPersonaList.persona_spectrum.length !== 3 ||
              !requestPersonaList.persona_spectrum[0].hasOwnProperty(
                "persona_1"
              ) ||
              !requestPersonaList.persona_spectrum[1].hasOwnProperty(
                "persona_2"
              ) ||
              !requestPersonaList.persona_spectrum[2].hasOwnProperty(
                "persona_3"
              ) ||
              !requestPersonaList.persona_spectrum[0].persona_1.hasOwnProperty(
                "persona"
              ) ||
              !requestPersonaList.persona_spectrum[1].persona_2.hasOwnProperty(
                "persona"
              ) ||
              !requestPersonaList.persona_spectrum[2].persona_3.hasOwnProperty(
                "persona"
              ) ||
              !requestPersonaList.persona_spectrum[0].persona_1.persona ||
              !requestPersonaList.persona_spectrum[1].persona_2.persona ||
              !requestPersonaList.persona_spectrum[2].persona_3.persona ||
              !requestPersonaList.persona_spectrum[0].persona_1.hasOwnProperty(
                "keyword"
              ) ||
              !requestPersonaList.persona_spectrum[1].persona_2.hasOwnProperty(
                "keyword"
              ) ||
              !requestPersonaList.persona_spectrum[2].persona_3.hasOwnProperty(
                "keyword"
              ) ||
              requestPersonaList.persona_spectrum[0].persona_1.keyword.length <
                3 ||
              requestPersonaList.persona_spectrum[1].persona_2.keyword.length <
                3 ||
              requestPersonaList.persona_spectrum[2].persona_3.keyword.length <
                3)
          ) {
            response = await axios.post(
              "https://wishresearch.kr/person/persona_request",
              data,
              axiosConfig
            );
            retryCount++;

            requestPersonaList = response.data;
          }
          if (retryCount === maxRetries) {
            throw new Error(
              "Maximum retry attempts reached. Empty response persists."
            );
          }

          const requestPersonaData = {
            persona: requestPersonaList.persona_spectrum,
            positioning: requestPersonaList.positioning_analysis,
          };

          setRequestPersonaList(requestPersonaData);
          await updateProjectOnServer(
            projectId,
            {
              personaList: personaList.unselected.length,
              requestPersonaList: requestPersonaData,
            },
            isLoggedIn
          );
        }
      } catch (error) {
        console.error("Error in loadPersona:", error);
      } finally {
        setPersonaButtonState2(0);
        setIsLoading(false);
      }
    };

    loadPersona();
  }, [personaButtonState2]);

  const handleStartInterview = () => {
    // 선택된 페르소나들을 selected에 반영
    setPersonaList((prev) => ({
      selected: selectedPersonas,
      unselected: prev.unselected.filter(
        (persona) => !selectedPersonas.includes(persona)
      ),
    }));

    setPersonaStep(3);
    setIsPersonaAccessible(true);
    navigate(`/Persona/3/${projectId}`, { replace: true });
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const [activeTab, setActiveTab] = useState("lifestyle");

  const handleInterviewRequest = () => {
    setSelectedPersonaForPopup(null);
    setShowSuccessPopup(true);
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
  };

  const handleCustomizeRequest = () => {
    setShowCustomizePopup(true);
  };

  const handleCustomizePopupClose = () => {
    setShowCustomizePopup(false);
  };

  const [state, setState] = useState({
    isAccordionOpen: false,
    formState: {
      quantity: 1,
    },
  });

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <OrganismBusinessAnalysis personaStep={2} />
              <CardWrap>
                <>
                  {/* 비즈니스 맞춤 페르소나 */}
                  <CustomizePersona>
                    <Title Column>
                      <h3>비즈니스 맞춤 페르소나</h3>
                      <p>
                        비즈니스에 딱 맞는 페르소나를 추천해드려요. 요청을
                        보내주시면 인터뷰 참여 모집이 시작됩니다.
                      </p>
                    </Title>

                    <ContentSection row>
                      <CardPersona>
                        <span>
                          <img src={images.CheckCircle} alt="요청 필요" />
                          요청 필요
                        </span>

                        <div>
                          <h4>시간이 부족한 바쁜 프리랜서</h4>
                          <p className="keywords">
                            <span>#키워드1</span>
                            <span>#키워드2</span>
                            <span>#키워드3</span>
                          </p>
                          <div className="content">
                            김지영은 아침마다 피트니스 센터에서 운동을 하고,
                            건강한 아침 식사로 하루를 시작하는 활동적인 생활을
                            즐깁니다. 직장에서 효율적으로 업무를 처리하며 최신
                            마케팅 트렌드를 주시합니다.
                          </div>
                        </div>

                        <Button
                          Small
                          Primary
                          onClick={() => setSelectedPersonaForPopup(true)}
                        >
                          자세히 보기
                          <img src={images.ChevronRightPrimary} alt="" />
                        </Button>
                      </CardPersona>

                      <CardPersona>
                        <span>
                          <img src={images.CheckCircle} alt="요청 필요" />
                          요청 필요
                        </span>

                        <div>
                          <h4>시간이 부족한 바쁜 프리랜서</h4>
                          <p className="keywords">
                            <span>#키워드1</span>
                            <span>#키워드2</span>
                            <span>#키워드3</span>
                          </p>
                          <div className="content">
                            김지영은 아침마다 피트니스 센터에서 운동을 하고,
                            건강한 아침 식사로 하루를 시작하는 활동적인 생활을
                            즐깁니다. 직장에서 효율적으로 업무를 처리하며 최신
                            마케팅 트렌드를 주시합니다.
                          </div>
                        </div>

                        <Button
                          Small
                          Primary
                          onClick={() => setSelectedPersonaForPopup(true)}
                        >
                          자세히 보기
                          <img src={images.ChevronRightPrimary} alt="" />
                        </Button>
                      </CardPersona>

                      <CardPersona>
                        <span>
                          <img src={images.CheckCircle} alt="요청 필요" />
                          요청 필요
                        </span>

                        <div>
                          <h4>시간이 부족한 바쁜 프리랜서</h4>
                          <p className="keywords">
                            <span>#키워드1</span>
                            <span>#키워드2</span>
                            <span>#키워드3</span>
                          </p>
                          <div className="content">
                            김지영은 아침마다 피트니스 센터에서 운동을 하고,
                            건강한 아침 식사로 하루를 시작하는 활동적인 생활을
                            즐깁니다. 직장에서 효율적으로 업무를 처리하며 최신
                            마케팅 트렌드를 주시합니다.
                          </div>
                        </div>

                        <Button
                          Small
                          Primary
                          onClick={() => setSelectedPersonaForPopup(true)}
                        >
                          자세히 보기
                          <img src={images.ChevronRightPrimary} alt="" />
                        </Button>
                      </CardPersona>

                      {selectedPersonaForPopup && (
                        <InterviewPopup>
                          <div>
                            <div className="header">
                              <h4>
                                시간이 부족한 바쁜 프리랜서
                                <span
                                  className="close"
                                  onClick={() =>
                                    setSelectedPersonaForPopup(null)
                                  }
                                />
                              </h4>
                              <p className="info">
                                <span>여성</span>
                                <span>25세</span>
                                <span>서울 송파구 거주</span>
                              </p>
                            </div>

                            <p className="keywords">
                              <span>#시간 관리</span>
                              <span>#페르소나 키워드</span>
                              <span>#업무 효율</span>
                            </p>

                            <div className="content">
                              <TabButton>
                                <button
                                  className={
                                    activeTab === "lifestyle" ? "active" : ""
                                  }
                                  onClick={() => setActiveTab("lifestyle")}
                                >
                                  라이프스타일
                                </button>
                                <button
                                  className={
                                    activeTab === "interests" ? "active" : ""
                                  }
                                  onClick={() => setActiveTab("interests")}
                                >
                                  관심사
                                </button>
                                <button
                                  className={
                                    activeTab === "consumption" ? "active" : ""
                                  }
                                  onClick={() => setActiveTab("consumption")}
                                >
                                  소비성향
                                </button>
                              </TabButton>

                              {activeTab === "lifestyle" && (
                                <TabContent>
                                  [라이프스타일] 학업과 여가를 균형 있게
                                  추구하며, 문화적 호기심이 많습니다. 대학
                                  근처의 문화 공간을 자주 방문하며, 예술 전시와
                                  독립영화를 감상하거나 워크숍에 참여합니다.
                                  소셜 미디어를 통해 최신 문화 소식을 빠르게
                                  접하고, 친구들과 경험을 공유하는 것을
                                  즐깁니다. 새로운 시도를 통해 자기 계발을
                                  추구하며, 학업과 관련된 창의적 활동에도
                                  열정적입니다.
                                </TabContent>
                              )}
                              {activeTab === "interests" && (
                                <TabContent>
                                  [관심사] 학업과 여가를 균형 있게 추구하며,
                                  문화적 호기심이 많습니다. 대학 근처의 문화
                                  공간을 자주 방문하며, 예술 전시와 독립영화를
                                  감상하거나 워크숍에 참여합니다. 소셜 미디어를
                                  통해 최신 문화 소식을 빠르게 접하고, 친구들과
                                  경험을 공유하는 것을 즐깁니다. 새로운 시도를
                                  통해 자기 계발을 추구하며, 학업과 관련된
                                  창의적 활동에도 열정적입니다.
                                </TabContent>
                              )}
                              {activeTab === "consumption" && (
                                <TabContent>
                                  [소비성향] 학업과 여가를 균형 있게 추구하며,
                                  문화적 호기심이 많습니다. 대학 근처의 문화
                                  공간을 자주 방문하며, 예술 전시와 독립영화를
                                  감상하거나 워크숍에 참여합니다. 소셜 미디어를
                                  통해 최신 문화 소식을 빠르게 접하고, 친구들과
                                  경험을 공유하는 것을 즐깁니다. 새로운 시도를
                                  통해 자기 계발을 추구하며, 학업과 관련된
                                  창의적 활동에도 열정적입니다.
                                </TabContent>
                              )}
                            </div>

                            <Button
                              Large
                              Primary
                              style={{ width: "100%", marginTop: "16px" }}
                              onClick={handleInterviewRequest}
                            >
                              인터뷰 준비 요청하기
                            </Button>
                          </div>
                        </InterviewPopup>
                      )}
                    </ContentSection>
                  </CustomizePersona>

                  {/* 산업별 인기 페르소나 */}
                  <CustomizePersona>
                    <Title Column>
                      <h3>산업별 인기 페르소나</h3>
                      <p>
                        산업별로 자주 활용되는 페르소나를 지금 바로 확인하고
                        인사이트를 얻어보세요.
                        <TooltipButton
                          onClick={() => setShowTooltip(!showTooltip)}
                        >
                          유형별 설명 보기
                          {showTooltip && (
                            <TooltipContent>
                              <TooltipHeader>
                                아이콘에 대한 정보
                                <span />
                              </TooltipHeader>

                              <TooltipBody>
                                <div>
                                  <Badge Basic>
                                    <img
                                      src={images.StatusBadgeBasic}
                                      alt="기본형"
                                    />
                                    기본형
                                  </Badge>
                                  <p>
                                    기본형은 특정 요구 사항 없이도 다양한 질문과
                                    답변을 처리할 수 있는 표준형 AI
                                    Person입니다. 범용적인 활용이 가능하며,
                                    일반적인 상황에 적합합니다.
                                  </p>
                                </div>

                                <div>
                                  <Badge Custom>
                                    <img
                                      src={images.StatusBadgeCustom}
                                      alt="커스터마이즈"
                                    />
                                    커스터마이즈
                                  </Badge>
                                  <p>
                                    커스터마이즈는 특정 요구 사항에 맞춰 설정된
                                    AI Person입니다. 라이프스타일, 경험, 지식
                                    등을 학습하여 원하는 목적에 맞게 활용할 수
                                    있으며, 보다 깊이 있는 대화에 적합합니다.
                                  </p>
                                </div>

                                <div>
                                  <Badge>
                                    <img
                                      src={images.NoteArrowUp}
                                      alt="요청 필요"
                                    />
                                    요청 필요
                                  </Badge>
                                  <p>
                                    요청필요는 사용자 요청에 따라 준비되는 AI
                                    Person입니다. 원하는 정보와 경험을
                                    입력하시면 맞춤 제작이 가능합니다.
                                  </p>
                                </div>
                              </TooltipBody>
                            </TooltipContent>
                          )}
                        </TooltipButton>
                      </p>
                    </Title>

                    <ContentSection>
                      {personaButtonState2 ? (
                        <PersonaCards>
                          <AtomLoader />
                        </PersonaCards>
                      ) : (
                        <>
                          <PersonaCards>
                            {/* {requestPersonaList.persona.map((persona, index) => (
                            <MoleculePersonaCard
                              key={index}
                              title={persona[`persona_${index + 1}`].persona}
                              keywords={persona[`persona_${index + 1}`].keyword}
                              isCustom={true}
                              onSelect={(isSelected) =>
                                handlePersonaSelect(persona, isSelected)
                              }
                              onClick={() => setShowPopup(true)}
                              currentSelection={selectedPersonas.length}
                            />
                          ))} */}
                            {personaList.unselected.map((persona, index) => (
                              <MoleculePersonaCard
                                key={index}
                                title={persona.persona}
                                keywords={persona.keyword.split(",")}
                                isBasic={true}
                                onSelect={(isSelected) =>
                                  handlePersonaSelect(persona, isSelected)
                                }
                                currentSelection={selectedPersonas.length}
                              />
                            ))}
                          </PersonaCards>

                          {/* 나만의 페르소나 커스터마이징 배너 */}
                          <BannerPersona>
                            <div>
                              <h2>
                                나만의 페르소나 커스터마이징
                                <p>
                                  페르소나를 커스터마이징하여 더 정확한 인터뷰를
                                  진행해보세요.
                                </p>
                              </h2>

                              <Button
                                Large
                                Primary
                                onClick={handleCustomizeRequest}
                              >
                                요청하기
                                <img src={images.ChevronRightPrimary} alt="" />
                              </Button>
                            </div>
                            <img src={images.PersonaCustomizing} alt="" />
                          </BannerPersona>
                        </>
                      )}
                      {!personaButtonState2 && (
                        <BottomBar>
                          <p>
                            {selectedPersonas.length > 0 ? (
                              <>
                                선택하신{" "}
                                <span>{selectedPersonas.length}명</span>의
                                페르소나와 인터뷰 하시겠어요?
                              </>
                            ) : (
                              "페르소나를 선택하고 그들의 인터뷰를 시작해 보세요"
                            )}
                          </p>
                          <Button
                            Large
                            Primary
                            Fill={selectedPersonas.length > 0}
                            Edit={selectedPersonas.length === 0}
                            disabled={selectedPersonas.length === 0}
                            onClick={handleStartInterview}
                          >
                            인터뷰 시작하기
                            <img src={images.ChevronRight} alt="" />
                          </Button>
                        </BottomBar>
                      )}
                    </ContentSection>
                  </CustomizePersona>
                </>
              </CardWrap>
            </MainSection>

            <Sidebar>
              <h5>Discover Your Persona</h5>

              <ProgressBar>
                <span className="icon">🚀</span>
                <Progress progress={40} />
                <span>40%</span>
              </ProgressBar>

              <MoleculeStepIndicator steps={steps} activeStep={2} />
            </Sidebar>
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <PopupWrap
          Warning
          title="요청 상태의 페르소나는 선택이 제한됩니다."
          message="인터뷰를 진행하려면 모집 요청을 먼저 진행해주세요"
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={handlePopupClose}
          show={showPopup}
        />
      )}

      {showSuccessPopup && (
        <PopupWrap
          Check
          title={
            <>
              인터뷰 준비 요청이 완료되었습니다.
              <br />
              완료 후 알림을 보내드릴게요
            </>
          }
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={handleSuccessPopupClose}
          show={true}
        />
      )}

      {showCustomizePopup && (
        <PopupWrap
          TitleFlex
          title="📝 맞춤형 페르소나 모집 요청하기"
          buttonType="Fill"
          confirmText="맞춤 페르소나 모집하기"
          isModal={true}
          isFormValid={true}
          onCancel={handleCustomizePopupClose}
          onConfirm={() => {
            // 여기에 확인 버튼 클릭 시 처리할 로직 추가
            handleCustomizePopupClose();
          }}
          body={
            <>
              <Title>
                <p>어떤 페르소나가 필요하신가요? *</p>
              </Title>

              <div style={{ width: "100%" }}>
                <CustomTextarea
                  rows={4}
                  placeholder="필요한 페르소나의 특징과 역할을 적어주세요."
                />
              </div>

              <Title>
                <p>이 페르소나를 사용하려는 목적은 무엇인가요? *</p>
              </Title>

              <div style={{ width: "100%" }}>
                <CustomTextarea
                  rows={4}
                  placeholder="해당 페르소나가 필요한 이유, 얻고 싶은 인사이트, 하고자 하는 목표 등을 입력해주세요."
                />
              </div>

              <Title>
                <p>몇명의 페르소나를 모집하시고 싶으신가요? *</p>
              </Title>

              <Quantity>
                <span className="down">줄이기</span>
                <CustomInput
                  type="number"
                  value={customizeFormState.quantity}
                />
                <span className="up">늘리기</span>
              </Quantity>

              <AccordionSection>
                <CustomAccordionHeader
                  None
                  onClick={() =>
                    setCustomizeFormState((prev) => ({
                      ...prev,
                      isAccordionOpen: !prev.isAccordionOpen,
                    }))
                  }
                >
                  🔍 세부 사항 설정
                  <CustomAccordionIcon
                    isOpen={customizeFormState.isAccordionOpen}
                  />
                </CustomAccordionHeader>
                {customizeFormState.isAccordionOpen && (
                  <CustomAccordionContent None>
                    <dl>
                      <dt>성별</dt>
                      <dd>
                        <input type="radio" id="gender1" name="gender" />
                        <label htmlFor="gender1" className="gender men">
                          <img src={images.GenderMen} alt="GenderMen" />
                          남자
                        </label>
                        <input type="radio" id="gender2" name="gender" />
                        <label htmlFor="gender2" className="gender women">
                          <img src={images.GenderWomen} alt="GenderWomen" />
                          여자
                        </label>
                      </dd>
                    </dl>

                    <dl>
                      <dt>
                        연령 (다중 선택)
                        <p>
                          * 선택하지 않는 경우, 연령 무관으로 페르소나를
                          생성합니다.
                        </p>
                      </dt>
                      <dd>
                        <input type="checkbox" id="age1" name="age" />
                        <label htmlFor="age1" className="age">
                          10대
                        </label>
                        <input type="checkbox" id="age2" name="age" />
                        <label htmlFor="age2" className="age">
                          20대
                        </label>
                        <input type="checkbox" id="age3" name="age" />
                        <label htmlFor="age3" className="age">
                          30대
                        </label>
                        <input type="checkbox" id="age4" name="age" />
                        <label htmlFor="age4" className="age">
                          40대
                        </label>
                        <input type="checkbox" id="age5" name="age" />
                        <label htmlFor="age5" className="age">
                          50대
                        </label>
                        <input type="checkbox" id="age6" name="age" />
                        <label htmlFor="age6" className="age">
                          60대
                        </label>
                        <input type="checkbox" id="age7" name="age" />
                        <label htmlFor="age7" className="age">
                          70대 이상
                        </label>
                        <label className="age none" />
                      </dd>
                    </dl>

                    <dl>
                      <dt>필수적으로 필요한 정보가 있다면, 알려주세요</dt>
                      <dd>
                        <CustomTextarea
                          rows={3}
                          placeholder="필수로 고려해야할 정보가 있다면 작성해주세요."
                        />
                      </dd>
                    </dl>
                  </CustomAccordionContent>
                )}
              </AccordionSection>
            </>
          }
        />
      )}
    </>
  );
};

export default PagePersona2;

const TooltipButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.75rem;
  color: ${palette.gray300};
  padding: 4px 8px;
  cursor: pointer;
  z-index: 1;

  &:after {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 0.63rem;
    color: ${palette.gray500};
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};
    content: "?";
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  top: -25px;
  right: -300px;
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  padding: 20px 20px 32px;
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  animation: fadeIn 0.3s ease-in-out;
  cursor: default;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:before {
    position: absolute;
    top: 30px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${palette.white};
    content: "";
  }
`;

const TooltipHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 300;
  color: ${palette.gray800};
  line-height: 1.5;
  width: 100%;

  span {
    position: relative;
    width: 16px;
    height: 16px;
    display: block;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 16px;
      display: block;
      border-radius: 5px;
      background: ${palette.gray700};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const TooltipBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: ${(props) =>
    props.Basic || props.Custom ? "0.75rem" : "0.63rem"};
  color: ${(props) =>
    props.Basic
      ? palette.green
      : props.Custom
      ? palette.primary
      : palette.gray500};
  line-height: 1.2;
  padding: 4px 8px;
  border-radius: 50px;
  border: 1px solid
    ${(props) =>
      props.Basic
        ? `rgba(52, 199, 89, 0.10)`
        : props.Custom
        ? `rgba(34, 111, 255, 0.10)`
        : palette.gray200};
  background: ${(props) =>
    props.Basic
      ? `rgba(52, 199, 89, 0.10)`
      : props.Custom
      ? `rgba(34, 111, 255, 0.10)`
      : palette.white};
`;

const Sidebar = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  width: 290px;
  padding: 16px 20px;
  margin-top: 44px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h5 {
    font-size: 0.88rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  span {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.gray700};
  }

  .icon {
    font-size: 1.13rem;
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 20px;
  background: ${palette.outlineGray};

  &:before {
    display: block;
    width: ${(props) => props.progress}%;
    height: 100%;
    border-radius: 20px;
    background: ${palette.primary};
    content: "";
  }
`;

const PersonaCards = styled.div`
  display: flex;
  flex-direction: ${(props) => {
    if (props.row) return `row`;
    else return `column`;
  }};
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const CardPersona = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 0.63rem;
    line-height: 1.2;
    color: ${palette.primary};
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.3;
    color: ${palette.gray700};
    text-align: left;
  }

  .keywords {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4px;
    margin: 8px auto 20px;

    span {
      font-size: 0.75rem;
      line-height: 1.2;
      color: ${palette.gray700};
      line-height: 1.5;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid ${palette.outlineGray};
    }
  }

  .content {
    position: relative;
    height: 110px;
    font-size: 0.75rem;
    line-height: 1.5;
    font-weight: 300;
    color: ${palette.gray500};
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;

    &:before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        ${palette.white} 80%
      );
      content: "";
    }
  }

  button {
    width: 100%;
  }
`;

const BottomBar = styled.div`
  position: sticky;
  bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background: ${palette.white};

  //   button:disabled {
  //     cursor: default;
  //   }

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray500};

    span {
      font-size: 1rem;
      font-weight: 600;
      color: ${palette.primary};
      // text-decoration: underline;
    }
  }
`;

const InterviewPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 450px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    padding: 20px;
    border-radius: 15px;
    background: ${palette.white};
    box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.15);
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 4px;
    width: 100%;

    h4 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 1.3;
      color: ${palette.gray800};

      .close {
        position: relative;
        width: 16px;
        height: 16px;
        cursor: pointer;

        &:before,
        &:after {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 16px;
          background: ${palette.gray700};
          content: "";
        }

        &:before {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        &:after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 6px;
      width: 100%;

      span {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 6px;
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.5;
        color: ${palette.gray700};

        + span:before {
          content: "";
          display: inline-block;
          width: 1px;
          height: 9px;
          background: ${palette.gray700};
        }
      }
    }
  }

  .keywords {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: 100%;
    flex-wrap: wrap;

    span {
      font-size: 0.875rem;
      font-weight: 300;
      line-height: 1.5;
      color: ${palette.gray700};
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid ${palette.outlineGray};
    }
  }

  .content {
    width: 100%;
  }
`;

const TabButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  padding: 4px;
  border-radius: 20px;
  background: ${palette.chatGray};

  button {
    width: 100%;
    font-family: "Pretendard", "Poppins";
    font-size: 1rem;
    font-weight: 300;
    color: ${palette.gray500};
    padding: 6px 10px;
    border-radius: 20px;
    border: 0;
    background: transparent;
    transition: all 0.5s;

    &.active {
      font-weight: 400;
      color: ${palette.gray800};
      background: ${palette.white};
    }
  }
`;

const TabContent = styled.div`
  width: 100%;
  max-height: 200px;
  margin-top: 18px;
  overflow-y: auto;
  line-height: 1.5;
  color: ${palette.gray700};
  text-align: left;
`;

const BannerPersona = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 26px 32px 26px 50px;
  border-radius: 10px;
  background: #f8f9fd;
  overflow: hidden;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
  }

  h2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 4px;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.3;
    color: ${palette.gray800};

    p {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      color: ${palette.gray700};
    }
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 12px;
  width: 100%;

  span {
    position: relative;
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 67px;
    height: 67px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};
    cursor: pointer;

    &.down:before,
    &.up:before,
    &.up:after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 11px;
      height: 2px;
      border-radius: 10px;
      background: ${palette.gray500};
      content: "";
    }

    &.up:after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  input {
    font-size: 1rem;
    font-weight: 300;
    color: ${palette.gray500};
    text-align: center;
    padding: 24px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    outline: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
  }
`;
