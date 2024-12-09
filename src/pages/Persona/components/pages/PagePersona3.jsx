import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { 
  IS_PERSONA_ACCESSIBLE, 
  IS_LOGGED_IN, 
  CONVERSATION_ID, 
  INPUT_BUSINESS_INFO, 
  TITLE_OF_BUSINESS_INFORMATION, 
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  PERSONA_STEP,
  PERSONA_SELECTED_LIST,
  SELECTED_INTERVIEW_PURPOSE,
  PERSONA_LIST
} from "../../../AtomStates";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import OrganismLeftSideBar from "../../../Expert_Insight/components/organisms/OrganismLeftSideBar";
import MoleculeHeader from "../molecules/MoleculeHeader";
import MoleculeStepIndicator from "../molecules/MoleculeStepIndicator";
import MoleculeInterviewCard from "../molecules/MoleculeInterviewCard";
import MoleculePersonaCard from "../molecules/MoleculePersonaCard";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { getConversationByIdFromIndexedDB } from "../../../../utils/indexedDB";
import { createChatOnServer } from "../../../../utils/indexedDB";
import OrganismBusinessAnalysis from "../organisms/OrganismBisinessAnalysis";

const PagePersona3 = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(IS_PERSONA_ACCESSIBLE);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [personaSelectedList, setPersonaSelectedList] = useAtom(PERSONA_SELECTED_LIST);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(SELECTED_INTERVIEW_PURPOSE);
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);

  const [interviewPurpose, setInterviewPurpose] = useState("제품 경험 평가");
  const [selectedInterviewType, setSelectedInterviewType] = useState('multiple');
  const [activeCategory, setActiveCategory] = useState(1);


  // const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [steps, setSteps] = useState([
    { number: 1, label: '비즈니스 분석', active: true },
    { number: 2, label: '맞춤 페르소나 추천', active: true },
    { number: 3, label: '인터뷰 방법 선택', active: true },
    { number: 4, label: '페르소나와 인터뷰', active: false },
    { number: 5, label: '의견 분석', active: false }
  ]);

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
          // 3. 대화 ID가 이미 존재하면 IndexedDB에서 대화 불러오기
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
            setPersonaSelectedList(savedConversation.personaSelectedList);
            setSelectedInterviewPurpose(savedConversation.selectedInterviewPurpose);
          }

          // setIsLoadingPage(false); // 로딩 완료
      }
    };

    loadConversation();
  }, [conversationId, isLoggedIn, navigate]);

  // if (isLoadingPage) {
  //   return <div>Loading...</div>;
  // }

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleInterviewTypeSelect = (type) => {
    setSelectedInterviewType(type);
  };

  const purposeItems = [
    {
      id: 1,
      category: '제품 사용 경험',
      title: '제품 경험 평가',
      description: '사용자의 기능, 디자인, 사용성 경험을 분석해 만족도와 불만족 요인을 도출',
      expandedContent: [
        '이 제품이 현재의 시장 경쟁 제품들과 비교해 독특하다고 느껴질 수 있는 요소는 무엇인가요?',
        '이 제품이 더 많은 사람들에게 매력적으로 다가가기 위해 추가되거나 개선되어야 할 가장 중요한 요소는 무엇이라고 생각하시나요?',
        '이 제품이 사용자에게 전달하려는 메시지나 숨겨진 이야기가 있다면, 그것은 무엇일까요?'
      ]
    },
    {
      id: 2,
      category: '제품 사용 경험',
      title: '사용 맥락 조사',
      description: '사용 환경과 패턴을 이해해 사용자 문제와 제약 요인을 해결',
      expandedContent: [
        '이 제품을 사용하는 데 있어 불편하거나 부적합할 수 있는 상황은 어떤 경우일까요?',
        '이 제품을 사용할 수 있는 환경에서 가장 중요한 조건은 무엇이라고 생각하시나요?',
        '이 제품이 예상치 못한 환경에서도 효과적으로 사용될 가능성이 있다면, 어떤 환경일까요?'
      ]
    },
    {
      id: 3,
      category: '구매 및 소비 심리',
      title: '구매 전환 요인 분석',
      description: '소비자의 구매 결정에 영향을 미치는 핵심 요인을 파악해 최적의 전략을 설계',
      expandedContent: [
        '이 제품에 대해 소비자가 가장 많이 질문할 가능성이 있는 부분은 무엇일까요?',
        '경쟁 제품 대비 이 제품이 소비자의 선택을 받을 가능성이 높은 이유는 무엇인가요?',
        '소비자가 이 제품을 구매하지 않을 가능성이 있다면, 그 이유는 무엇일까요?'
      ]
    },
    {
      id: 4,
      category: '구매 및 소비 심리',
      title: '소비자 행동 유도 요소 분석',
      description: '사용자의 행동을 유도하는 요소를 파악해 전환율과 참여를 극대화',
      expandedContent: [
        '이 제품이 구매를 망설이는 소비자의 마음을 바꿀 수 있다면, 어떤 요소가 가장 중요한 역할을 할까요?',
        '소비자가 이 제품에 대해 가장 큰 불신이나 의구심을 가질 가능성이 있다면, 그 이유는 무엇일까요?',
        '이 제품이 소비자의 행동을 더 효과적으로 유도하기 위해 추가하거나 수정해야 할 요소는 무엇인가요?'
      ]
    },
    {
      id: 5,
      category: '구매 및 소비 심리',
      title: '제품 기대치 확인',
      description: '초기 기대와 실제 경험의 차이를 줄여 사용자 만족도를 증대',
      expandedContent: [
        '이 제품이 소비자에게 가장 기대감을 줄 수 있는 핵심 요소는 무엇이라고 생각하시나요?',
        '이 제품이 소비자 기대를 현실적으로 충족시키는 동시에 놀라움을 제공하려면 어떤 점을 개선하거나 추가해야 할까요?',
        '이 제품이 소비자의 기대를 충족하지 못할 가능성이 있다면, 그 이유는 무엇일까요?'
      ]
    },
    {
      id: 6,
      category: '사용자 시뮬레이션',
      title: '소비자 여정 맵핑',
      description: '다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견',
      expandedContent: [
        '소비자가 이 제품의 구매를 결정하기 전에 가장 궁금해할 질문은 무엇일까요?',
        '소비자가 이 제품을 구매하는 과정을 상상했을 때, 가장 큰 장벽은 무엇일까요?',
        '이 제품을 구매 후, 소비자가 기대와 실제 사용 경험 간에 느낄 수 있는 가장 큰 차이는 무엇일까요?'
      ]
    },
    {
      id: 7,
      category: '사용자 시뮬레이션',
      title: '제품 이해도 테스트',
      description: '사용자 관점에서 제품의 목적과 사용법을 평가해 접근성 강화',
      expandedContent: [
        '제품 설명을 기준으로, 이 제품이 해결하고자 하는 문제는 무엇이라고 생각하시나요?',
        '이 제품을 사용할 수 있는 환경에서 가장 중요한 조건은 무엇이라고 생각하시나요?',
        '이 제품의 가장 독특하거나 주목할 만한 기능은 무엇이라고 느껴지시나요?'
      ]
    },
    {
      id: 8,
      category: '사용자 시뮬레이션',
      title: '사용자 경험 시뮬레이션',
      description: '제품 사용을 가상으로 재현해 문제를 예측하고 설계를 최적화',
      expandedContent: [
        '이 제품이 당신의 일상에서 자연스럽게 사용될 가능성이 가장 높은 순간은 언제이며, 그 이유는 무엇인가요?',
        '이 제품을 사용하기 전과 사용한 후에 당신이 느낄 가장 큰 차이점은 무엇일 것 같나요?',
        '이 제품을 사용하는 과정에서 가장 큰 장애물로 예상되는 부분은 무엇이며, 이를 극복하려면 어떤 개선이 필요할까요?'
      ]
    },
  ];
  const purposeCategories = [
    { id: 1, label: '전체' },
    { id: 2, label: '제품 사용 경험' },
    { id: 3, label: '구매 및 소비 심리' },
    { id: 4, label: '사용자 시뮬레이션' },
  ];
  const categoryItems = {
    1: purposeItems,
    2: purposeItems.filter(item => item.category === '제품 사용 경험'),
    3: purposeItems.filter(item => item.category === '구매 및 소비 심리'),
    4: purposeItems.filter(item => item.category === '사용자 시뮬레이션'),
  };

  return (
    <>
      <ContentsWrap>
        <OrganismLeftSideBar />

        <MoleculeHeader />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <OrganismBusinessAnalysis personaStep={personaStep}/>
              <CardWrap>
                {/* 인터뷰 방식 선택 */}
                  <>
                    <CustomizePersona>
                      <Title>인터뷰 방식 선택</Title>

                      <InterviewTypeCards>
                        <InterviewTypeCard 
                          isActive={selectedInterviewType === 'multiple'}
                          onClick={() => handleInterviewTypeSelect('multiple')}
                        >
                          <CheckBox isActive={selectedInterviewType === 'multiple'} />
                          <strong isActive={selectedInterviewType === 'multiple'}>
                            (1:N) 다양한 페르소나와 인터뷰
                          </strong>
                          <p isActive={selectedInterviewType === 'multiple'}>
                            다양한 타겟 페르소나의 의견을 수집하여 인사이트를 얻어보세요.
                          </p>
                        </InterviewTypeCard>

                        <InterviewTypeCard 
                          isActive={selectedInterviewType === 'single'}
                          // onClick={() => handleInterviewTypeSelect('single')}
                          disabled={true}
                        >
                          <CheckBox isActive={selectedInterviewType === 'single'} />
                          <strong isActive={selectedInterviewType === 'single'}>
                            (1:1) 심층 인터뷰
                            <span>준비중</span>
                          </strong>
                          <p isActive={selectedInterviewType === 'single'}>
                            한 명의 타겟 페르소나에게 개인화된 질문으로 심층적인 인사이트를 얻어보세요
                          </p>
                        </InterviewTypeCard>
                      </InterviewTypeCards>
                    </CustomizePersona>

                    <InterviewSelect>
                      <Title>인터뷰 목적</Title>

                      <TabWrap>
                        {purposeCategories.map((category) => (
                          <TabButton 
                            key={category.id} 
                            isActive={activeCategory === category.id}
                            onClick={() => handleCategoryClick(category.id)}
                          >
                            {category.label}
                          </TabButton>
                        ))}
                      </TabWrap>

                      <TabContent>
                        {categoryItems[activeCategory].map((item) => (
                          <MoleculeInterviewCard 
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            expandedContent={item.expandedContent}
                            isSelected={interviewPurpose === item.title}
                            onSelect={(title) => setInterviewPurpose(title)}
                          />
                        ))}
                      </TabContent>
                    </InterviewSelect>

                    <CustomizePersona>
                      <Title Column>
                        비즈니스 맞춤 페르소나
                        <p>
                          추천된 페르소나와 인터뷰하세요. 그룹 또는 한 명의 타겟을 선택할 수 있습니다.
                          <span>
                            <img src={images.PencilSquare} alt="" />
                            편집하기
                          </span>
                        </p>
                      </Title>
                      <ContentSection>
                        <PersonaCards>
                          {personaSelectedList.map((persona, index) => (
                            <MoleculePersonaCard 
                              key={index}
                              title={persona.persona}
                              isReady={true}
                              hideCheckCircle={true}
                            />
                          ))}
                        </PersonaCards>
                      </ContentSection>
                    </CustomizePersona>
                  </>
              </CardWrap>
            </MainSection>

            <Sidebar>
              <h5>Let's Start Now</h5>

              <ProgressBar>
                <span>🚀</span>
                <Progress progress={60} />
                <span>60%</span>
              </ProgressBar>

              <MoleculeStepIndicator steps={steps} activeStep={3} />

              <InterviewRoom>
                <ul>
                  <li>
                    <span>방식</span>
                    <p>{selectedInterviewType === 'multiple' ? '1:N 인터뷰' : '1:1 인터뷰'}</p>
                  </li>
                  <li>
                    <span>목적</span>
                    <p>{interviewPurpose}</p>
                  </li>
                  <li>
                    <span>참여자</span>
                    <p>{personaSelectedList.length}명</p>
                  </li>
                </ul>
                <Button Large Primary Fill>인터뷰룸 입장</Button>
              </InterviewRoom>
            </Sidebar>
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePersona3;

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

const InterviewRoom = styled.div`
  // display: ${props => props.showInterview ? 'flex' : 'none'};
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${palette.outlineGray};

  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      line-height: 1.5;
      color: ${palette.gray700};

      span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      
      p {
        text-align: right;
      }
    }
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

const InterviewTypeCards = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  width: 100%;
`;

const InterviewTypeCard = styled.div`
  position: relative;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 10px;
  border: 1px solid ${props => props.isActive 
    ? palette.chatBlue 
    : palette.outlineGray};
  background: ${props => props.isActive 
    ? 'rgba(34, 111, 255, 0.10)' 
    : 'white'};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: all 0.2s ease-in-out;
  

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    line-height: 1.5;
    color: ${props => props.isActive 
      ? palette.chatBlue 
      : palette.gray800};
    text-align: left;

    span {
      font-size: 0.75rem;
      font-weight: 400;
      color: ${palette.gray300};
      padding: 2px 8px;
      border-radius: 15px;
      background: ${palette.gray100};
    }
  }

  p {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${props => props.isActive 
      ? palette.gray800 
      : palette.gray500};
    text-align: left;
  }
`;

const CheckBox = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid ${props => props.isActive ? palette.chatBlue : palette.outlineGray};
  background: ${props => props.isActive ? palette.chatBlue : 'white'};
  
  ${props => props.isActive && `
    &:after {
      content: '';
      position: absolute;
      left: 8px;
      top: 5px;
      width: 6px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  `}
`;

const TabWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TabButton = styled.button`
  font-family: 'Pretendard', 'Poppins';
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 4px 16px;
  border-radius: 50px;
  cursor: pointer;

  ${({ isActive }) => isActive ? `
    background: rgba(34, 111, 255, 0.1);
    border: 1px solid ${palette.chatBlue};
    color: ${palette.chatBlue};
    font-weight: 600;
  ` : `
    background: ${palette.chatGray};
    border: 1px solid ${palette.outlineGray};
    color: ${palette.gray500};
    font-weight: 400;
  `}
`;

const TabContent = styled(PersonaCards)`
  gap: 12px;
`;

const InterviewSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;
