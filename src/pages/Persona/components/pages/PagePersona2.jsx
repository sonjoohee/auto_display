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
  SHOW_CARD_CONTENT,
  SHOW_INTERVIEW,
  PERSONA_LIST,
  PERSONA_SELECTED_LIST,
  IS_LOADING,
  PERSONA_STEP,
  PERSONA_SPECTRUM,
  POSITIONING_ANALYSIS
} from "../../../AtomStates";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import OrganismLeftSideBar from "../../../Expert_Insight/components/organisms/OrganismLeftSideBar";
import MoleculeHeader from "../molecules/MoleculeHeader";
import MoleculeStepIndicator from "../molecules/MoleculeStepIndicator";
import MoleculePersonaCard from "../molecules/MoleculePersonaCard";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { getConversationByIdFromIndexedDB } from "../../../../utils/indexedDB";
import { createChatOnServer } from "../../../../utils/indexedDB";
import OrganismBusinessAnalysis from "../organisms/OrganismBisinessAnalysis";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";
import AtomLoader from "../atoms/AtomLoader";

const PagePersona2 = () => {
  const { saveConversation } = useSaveConversation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(IS_PERSONA_ACCESSIBLE);
  const [personaButtonState2, setPersonaButtonState2] = useAtom(PERSONA_BUTTON_STATE_2);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [personaSelectedList, setPersonaSelectedList] = useAtom(PERSONA_SELECTED_LIST);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [personaSpectrum, setPersonaSpectrum] = useAtom(PERSONA_SPECTRUM);
  const [positioningAnalysis, setPositioningAnalysis] = useAtom(POSITIONING_ANALYSIS);

  // const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [steps, setSteps] = useState([
    { number: 1, label: '비즈니스 분석', active: true },
    { number: 2, label: '맞춤 페르소나 추천', active: true },
    { number: 3, label: '인터뷰 방법 선택', active: false },
    { number: 4, label: '페르소나와 인터뷰', active: false },
    { number: 5, label: '의견 분석', active: false }
  ]);

  const handlePersonaSelect = (persona, isSelected) => {
    setPersonaSelectedList(prev => {
      if (isSelected) {
        // 최대 5개까지만 선택 가능
        if (prev.length >= 5) return prev;
        return [...prev, persona];
      } else {
        return prev.filter(p => p.persona !== persona.persona);
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
    const loadConversation = async () => {
      // 1. 로그인 여부 확인
      if (isLoggedIn) {
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
          const savedConversation = await getConversationByIdFromIndexedDB(
            conversationId,
            isLoggedIn
          );

          if (savedConversation) {
            const analysisData = savedConversation.analysisReportData || {};
            setTitleOfBusinessInfo(analysisData.title || "");
            setMainFeaturesOfBusinessInformation(
              analysisData.mainFeatures || []
            );
            setInputBusinessInfo(savedConversation.inputBusinessInfo);
            setPersonaList(savedConversation.personaList);
          }

          // setIsLoadingPage(false); // 로딩 완료
      }
    };

    loadConversation();
  }, [conversationId, isLoggedIn, navigate]);

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

          /* 페르소나 추천 */
          let data = {
            target : "출산"
          };

          let response = await axios.post(
            "https://wishresearch.kr/person/find",
            data,
            axiosConfig
          );

          let personaList = response.data;
          setPersonaList(personaList);
          await saveConversation({ changingConversation: { personaList: personaList } });

          ////////////////////////////////////////////////////////////////////////////////////////
          /* 페르소나 모집 요청 */
          // data = {
          //   business_idea : titleOfBusinessInfo,
          //   api_key : 1
          // };

          // response = await axios.post(
          //   "https://wishresearch.kr/person/request",
          //   data,
          //   axiosConfig
          // );

          // personaList = response.data;
          // let retryCount = 0;
          // const maxRetries = 10;

          // while (retryCount < maxRetries && (
          //   !response || 
          //   !response.data || 
          //   personaList.hasOwnProperty("persona_spectrum") ||
          //   personaList.hasOwnProperty("positioning_analysis") ||
          //   !personaList.persona_spectrum.length === 3 || 
          //   !personaList.persona_spectrum[0].hasOwnProperty("persona_1") ||
          //   !personaList.persona_spectrum[1].hasOwnProperty("persona_2") ||
          //   !personaList.persona_spectrum[2].hasOwnProperty("persona_3") ||
          //   !personaList.persona_spectrum[0].persona_1.hasOwnProperty("persona") ||
          //   !personaList.persona_spectrum[1].persona_2.hasOwnProperty("persona") ||
          //   !personaList.persona_spectrum[2].persona_3.hasOwnProperty("persona") ||
          //   !personaList.persona_spectrum[0].persona_1.persona ||
          //   !personaList.persona_spectrum[1].persona_2.persona ||
          //   !personaList.persona_spectrum[2].persona_3.persona ||
          //   !personaList.persona_spectrum[0].persona_1.hasOwnProperty("keyword") ||
          //   !personaList.persona_spectrum[1].persona_2.hasOwnProperty("keyword") ||
          //   !personaList.persona_spectrum[2].persona_3.hasOwnProperty("keyword") ||
          //   !personaList.persona_spectrum[0].persona_1.keyword.length == 3 ||
          //   !personaList.persona_spectrum[1].persona_2.keyword.length == 3 ||
          //   !personaList.persona_spectrum[2].persona_3.keyword.length == 3
          // ))
          // {
          //   response = await axios.post(
          //     "https://wishresearch.kr/person/request",
          //     data,
          //     axiosConfig
          //   );
          //   retryCount++;

          //   personaList = response.data;
          // }
          // if (retryCount === maxRetries) {
          //   throw new Error("Maximum retry attempts reached. Empty response persists.");
          // }
          setPersonaSpectrum([
            {
                "persona_1": {
                    "persona": "시간에 쫓기는 바쁜 직장인",
                    "age": "25-35세",
                    "job": "사무직, 마케터, 영업직",
                    "family": "1인 가구 또는 2인 가구",
                    "income": "월 250만원~400만원",
                    "residence": "서울 및 수도권",
                    "lifestyle": {
                        "lifestyle_1": "바쁜 일상 속에서 효율성을 중시하며 시간 절약을 최우선으로 생각",
                        "lifestyle_2": "스마트폰 사용 빈도가 높고, 모바일 서비스 이용에 익숙",
                        "lifestyle_3": "편리함과 간편함을 추구하는 소비 성향"
                    },
                    "interest": {
                        "interest_1": "세탁 관련 시간 절약 서비스",
                        "interest_2": "편리한 모바일 주문 및 결제 시스템",
                        "interest_3": "다양한 세탁 옵션과 추가 서비스"
                    },
                    "goal": "세탁에 소요되는 시간과 노력을 최소화하고, 깨끗한 옷을 편리하게 받아보는 것",
                    "problem": "세탁 시간 부족, 빨래 건조 공간 부족, 세탁물 관리의 어려움",
                    "relationship_with_product": "모바일 세탁 서비스는 시간을 절약하고 편리하게 세탁을 해결해주는 필수적인 서비스로 인식",
                    "keyword": [
                        "시간 절약",
                        "편리성",
                        "모바일 주문"
                    ]
                }
            },
            {
                "persona_2": {
                    "persona": "세탁에 시간을 할애하기 어려운 워킹맘",
                    "age": "30-45세",
                    "job": "직장인, 프리랜서, 사업가",
                    "family": "2인 이상 가족",
                    "income": "월 300만원~500만원",
                    "residence": "서울 및 수도권",
                    "lifestyle": {
                        "lifestyle_1": "육아와 직장 생활을 병행하며 시간 관리에 어려움을 겪음",
                        "lifestyle_2": "가사 시간 단축을 위한 효율적인 서비스 선호",
                        "lifestyle_3": "가족 구성원 모두에게 편리한 서비스를 선호"
                    },
                    "interest": {
                        "interest_1": "시간 절약 가능한 세탁 서비스",
                        "interest_2": "아이 옷 세탁에 특화된 서비스",
                        "interest_3": "안전하고 위생적인 세탁 서비스"
                    },
                    "goal": "세탁으로 인한 시간 부담을 줄이고, 깨끗하고 위생적인 옷을 가족에게 제공하는 것",
                    "problem": "육아와 직장 생활 병행으로 세탁 시간 부족, 세탁물 관리 어려움, 아이 옷 세탁의 번거로움",
                    "relationship_with_product": "모바일 세탁 서비스는 육아와 직장 생활 병행에 도움을 주는 필수적인 서비스로 인식",
                    "keyword": [
                        "시간 절약",
                        "육아 편의성",
                        "위생"
                    ]
                }
            },
            {
                "persona_3": {
                    "persona": "고품질 세탁 서비스를 원하는 고소득 전문직",
                    "age": "35-55세",
                    "job": "의사, 변호사, 회계사",
                    "family": "2인 이상 가족",
                    "income": "월 500만원 이상",
                    "residence": "강남 및 고급 주택가",
                    "lifestyle": {
                        "lifestyle_1": "시간과 비용에 대한 부담이 적고, 고품질 서비스를 선호",
                        "lifestyle_2": "편리성과 고급스러움을 동시에 추구",
                        "lifestyle_3": "프리미엄 서비스 경험을 중시"
                    },
                    "interest": {
                        "interest_1": "고급 세탁 서비스",
                        "interest_2": "세탁물 관리 전문성",
                        "interest_3": "프리미엄 세탁 옵션"
                    },
                    "goal": "고품질의 세탁 서비스를 통해 편리함과 만족도를 동시에 얻는 것",
                    "problem": "시간 부족으로 세탁에 신경 쓰기 어려움, 고급 의류 세탁의 어려움",
                    "relationship_with_product": "모바일 세탁 서비스는 시간과 노력을 절약하면서 고급 의류 관리까지 가능한 프리미엄 서비스로 인식",
                    "keyword": [
                        "고급",
                        "프리미엄",
                        "전문성"
                    ]
                }
            }
        ]);
          // setPositioningAnalysis(personaList.positioning_analysis);
          // await saveConversation({ changingConversation: { personaList: personaList } });
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
    setPersonaStep(3);
    setIsPersonaAccessible(true);
    saveConversation({ changingConversation: { personaStep: 3 } });
    navigate(`/Persona/3/${conversationId}`, { replace: true });
  };

  return (
    <>
      <ContentsWrap>
        <OrganismLeftSideBar />

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
                        <p>추천된 페르소나를 선택하고 인터뷰를 진행하세요. (최대 5명까지 선택이 가능합니다)</p>
                      </Title>
                      
                      <ContentSection>
                        {personaButtonState2 ? (
                          <PersonaCards>
                            <AtomLoader />
                          </PersonaCards>
                        ) : (
                          <PersonaCards>
                            {personaList.map((persona, index) => (
                              <MoleculePersonaCard 
                                key={index}
                                title={persona.persona}
                                keywords={persona.keyword.split(',')}
                                isReady={true}
                                isRequest={false}
                                onSelect={(isSelected) => handlePersonaSelect(persona, isSelected)}
                                currentSelection={personaSelectedList.length}
                              />
                            ))}
                            {personaSpectrum.map((persona, index) => (
                              <MoleculePersonaCard 
                                key={index}
                                title={persona[`persona_${index + 1}`].persona}
                                keywords={persona[`persona_${index + 1}`].keyword}
                                isRequest={true} 
                                onSelect={(isSelected) => handlePersonaSelect(persona, isSelected)}
                                currentSelection={personaSelectedList.length}
                              />
                            ))}
                          </PersonaCards>
                        )}
                        
                        <BottomBar>
                          <p>
                            선택하신 <span>{personaSelectedList.length}명</span>의 페르소나와 인터뷰 하시겠어요?
                          </p>
                          <Button Large Primary Fill onClick={handleStartInterview} disabled={personaSelectedList.length === 0}>
                            인터뷰 시작하기
                            <img src={images.ChevronRight} alt="" />
                          </Button>
                        </BottomBar>
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

              <MoleculeStepIndicator steps={steps} activeStep={2}/>

            </Sidebar>
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePersona2;

// Styled Components
const ContentsWrap = styled.div`
  position: relative;
  // width: ${(props) => (props.isMobile ? "100%" : "calc(100% - 40px)")};
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  gap: ${(props) => (props.isMobile ? "20px" : "40px")};
  padding: ${(props) => (props.isMobile ? "20px" : "0")};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  min-height: 100vh;
  width: 100%;
  justify-content:${props => {
    if (props.MainSearch) return `center`;
    else return `flex-start`;
  }};
  margin: 57px auto 40px;
  // padding: ${(props) => (props.isMobile ? "0" : "0 20px")};
`;

const AnalysisWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 16px;
  margin-top:44px;
  overflow: visible;
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${props => {
    if (props.Column) return `column`;
    else return `row`;
  }};
  align-items: ${props => {
    if (props.Column) return `flex-start`;
    else return `center`;
  }};
  gap: ${props => {
    if (props.Column) return `8px`;
    else return `0`;
  }};

  h3 {
    font-weight: 500;
    color: ${palette.gray800};
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.chatBlue};
    }
  }
`;

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
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
  border-radius: 10px;
  background: ${palette.chatGray};

  h5{
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
    width: ${props => props.progress}%;
    height: 100%;
    border-radius: 20px;
    background: ${palette.chatBlue};
    content: '';
  }
`;

const CustomizePersona = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  
  button:disabled {
    cursor: default;
  }

  p {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.gray500};

    span {
      color: ${palette.chatBlue};
      text-decoration: underline;
    }
  }
`;