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
  IS_LOADING,
  PERSONA_STEP,
  BUSINESS_ANALYSIS,
  REQUEST_PERSONA_LIST,
  PROJECT_ID,
  PROJECT_LOAD_BUTTON_STATE,
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
  CustomAccordionHeader,
  CustomAccordionIcon,
  CustomAccordionContent,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
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

  useEffect(() => {
    const loadProject = async () => {
      // 1. 로그인 여부 확인

      if (projectLoadButtonState) {
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
        const savedProjectInfo = await getProjectByIdFromIndexedDB(
          projectId,
          projectLoadButtonState
        );
        if (savedProjectInfo) {
          const analysisData = savedProjectInfo.analysisReportData || {};
          setTitleOfBusinessInfo(analysisData.title || "");
          setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
          setInputBusinessInfo(savedProjectInfo.inputBusinessInfo);
          setPersonaList(savedProjectInfo.personaList);
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

            unselectedPersonas.push(...response.data);
          }

          let personaList = {
            selected: [],
            unselected: unselectedPersonas,
          };
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

          while (
            retryCount < maxRetries &&
            (!response ||
              !response.data ||
              !requestPersonaList.hasOwnProperty("persona_spectrum") ||
              !requestPersonaList.hasOwnProperty("positioning_analysis") ||
              !requestPersonaList.persona_spectrum.length === 3 ||
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
              !requestPersonaList.persona_spectrum[0].persona_1.keyword
                .length == 3 ||
              !requestPersonaList.persona_spectrum[1].persona_2.keyword
                .length == 3 ||
              !requestPersonaList.persona_spectrum[2].persona_3.keyword
                .length == 3)
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
              personaList: personaList,
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
                {/* 비즈니스 맞춤 페르소나 */}

                <>
                  <CustomizePersona>
                    <Title Column>
                      <h3>맞춤 페르소나</h3>
                      <p>
                        추천된 페르소나를 선택하고 인터뷰를 진행하세요. (최대
                        5명까지 선택이 가능합니다)
                      </p>
                    </Title>

                    <ContentSection>
                      {personaButtonState2 ? (
                        <PersonaCards>
                          <AtomLoader />
                        </PersonaCards>
                      ) : (
                        <PersonaCards>
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
                          {requestPersonaList.persona.map((persona, index) => (
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
                          ))}
                        </PersonaCards>
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
              <h5>Let's Start Now</h5>

              <ProgressBar>
                <span>🚀</span>
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
    </>
  );
};

export default PagePersona2;

const Sidebar = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  width: 290px;
  padding: 16px 20px;
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
    background: ${palette.chatBlue};
    content: "";
  }
`;

const PersonaCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
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
      color: ${palette.chatBlue};
      text-decoration: underline;
    }
  }
`;
