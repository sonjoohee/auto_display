import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { 
  IS_PERSONA_ACCESSIBLE, 
  PERSONA_BUSINESS_BUTTON_STATE, 
  IS_LOGGED_IN, 
  CONVERSATION_ID, 
  INPUT_BUSINESS_INFO, 
  TITLE_OF_BUSINESS_INFORMATION, 
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  SHOW_CARD_CONTENT,
  SHOW_INTERVIEW
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

const PagePersona = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(IS_PERSONA_ACCESSIBLE);
  const [personaBusinessButtonState, setPersonaBusinessButtonState] = useAtom(PERSONA_BUSINESS_BUTTON_STATE);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);

  const [showPersona, setShowPersona] = useState(false);
  const [showInterview, setShowInterview] = useAtom(SHOW_INTERVIEW);
  const [showCustomizePersona, setShowCustomizePersona] = useState(false);
  const [selectedInterviewType, setSelectedInterviewType] = useState('');
  const [activeCategory, setActiveCategory] = useState(1);
  const [showCardContent, setShowCardContent] = useAtom(SHOW_CARD_CONTENT);

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [progress, setProgress] = useState(25);
  const [steps, setSteps] = useState([
    { number: 1, label: '비즈니스 분석', active: true },
    { number: 2, label: '맞춤 페르소나 추천', active: false },
    { number: 3, label: '인터뷰 방법 선택', active: false },
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
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
        if (!conversationId && isPersonaAccessible) {
          try {
            // 서버에서 새로운 대화 ID 생성
            // console.log("서버에서 새로운 대화 ID 생성");
            const newConversationId = await createChatOnServer();
            setConversationId(newConversationId); // 생성된 대화 ID 설정
            setIsPersonaAccessible(true);
            setIsLoadingPage(false); // 로딩 완료
            // 새로운 대화 ID로 경로 변경
            navigate(`/Persona/${newConversationId}`, { replace: true });
          } catch (error) {
            setIsLoadingPage(false); // 로딩 완료
            setIsPersonaAccessible(true);
            console.error("Failed to create conversation on server:", error);
            navigate(`/Persona/${conversationId}`, { replace: true });
          }
        } else {
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
          }

          setIsLoadingPage(false); // 로딩 완료
        }
      }
    };

    loadConversation();
  }, [conversationId, isLoggedIn, navigate]);

  if (isLoadingPage) {
    return <div>Loading...</div>;
  }

  const handleCreatePersona = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowPersona(true);
    setShowInterview(false);
    setShowCustomizePersona(true);
    setProgress(50);
    setSteps(steps.map(step => 
      step.number === 2 ? { ...step, active: true } : step
    ));
    /* 인터뷰 생성 API */
  };

  const handleStartInterview = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setShowPersona(false);
      setShowInterview(true);
      setShowCustomizePersona(false);
      setShowCardContent(false);  // CardContent 숨기기
      setProgress(75);
      setSteps(steps.map(step => 
        step.number === 3 ? { ...step, active: true } : step
      ));
    }, 300);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleInterviewTypeSelect = (type) => {
    setSelectedInterviewType(type);
  };

  const purposeItems = [
    {
      id: 1,
      title: '제품 사용 경험',
      description: '다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견',
      expandedContent: [
        '경쟁 제품 사용자들이 특정 브랜드를 선택할 때 가장 큰 이유는 무엇이라고 생각하시나요?',
        '경쟁 제품 사용자가 지금의 브랜드를 바꿔야 한다고 느낄 만한 상황은 어떤 경우일까요?',
        '경쟁 제품 사용자들을 우리 제품으로 전환하기 위해 추가하거나 변경해야 할 가장 독창적인 접근 방식은 무엇인가요?'
      ]
    },
    {
      id: 2,
      title: '구매 및 소비 심리',
      description: '다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견',
      expandedContent: [
        '구매 의사결정 프로세스 분석',
        '소비자 행동 패턴 파악',
        '가격 민감도 조사',
        '브랜드 인식도 평가',
        '구매 저해 요인 분석'
      ]
    },
    {
      id: 3,
      title: '사용자 시뮬레이션',
      description: '다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견',
      expandedContent: [
        '실제 사용 환경 시뮬레이션',
        '사용자 행동 패턴 분석',
        '문제 해결 과정 관찰',
        '사용자 적응도 평가',
        '개선사항 도출'
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
              <OrganismBusinessAnalysis />
              <CardWrap>
                {/* 맞춤 페르소나 생성 */}
                {!showPersona && !showInterview && titleOfBusinessInfo && (
                  <CreateCard>
                    <p>
                      <img src={images.PeopleChatSquareFill} alt="" />
                      나의 비즈니스 고객은 누구일까요? 그리고 어떤 생각을 하고 있을까요?<br />당신의 타겟 고객에게 바로 물어보세요
                    </p>

                    <Button Large Primary Fill Round onClick={handleCreatePersona}>
                      맞춤 페르소나 생성
                      <img src={images.MagicStickFillWhite} alt="" />
                    </Button>
                  </CreateCard>
                )}

                {/* 비즈니스 맞춤 페르소나 */}
                {showCustomizePersona && (
                  <>
                    <CustomizePersona>
                      <Title Column>
                        <h3>비즈니스 맞춤 페르소나</h3>
                        <p>추천된 페르소나와 인터뷰하세요. 그룹 또는 한 명의 타겟을 선택할 수 있습니다.</p>
                      </Title>
                      
                      <ContentSection>
                        <PersonaCards>
                          <MoleculePersonaCard 
                            title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                            keywords={['키워드1', '키워드2', '키워드3']}
                            description="이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다. 이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다"
                            isReady={true}
                          />
                          <MoleculePersonaCard 
                            title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                            keywords={['키워드1', '키워드2', '키워드3']}
                            description="이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다. 이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다"
                            isReady={true} 
                          />
                          <MoleculePersonaCard 
                            title="도심에 거주하며 전문직에 종사하는 바쁜 생활인"
                            keywords={['키워드1', '키워드2', '키워드3']}
                            description="이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다. 이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다"
                            isRequest={true} 
                          />
                        </PersonaCards>
                        
                        <BottomBar>
                          <p>
                            선택하신 <span>5명</span>의 페르소나와 인터뷰 하시겠어요?
                          </p>
                          <Button Large Primary Fill onClick={handleStartInterview}>
                            인터뷰 시작하기
                            <img src={images.ChevronRight} alt="" />
                          </Button>
                        </BottomBar>
                      </ContentSection>
                    </CustomizePersona>
                  </>
                )}

                {/* 인터뷰 방식 선택 */}
                {showInterview && (
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
                          onClick={() => handleInterviewTypeSelect('single')}
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
                          <MoleculePersonaCard 
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            expandedContent={item.expandedContent}
                            showDescription={showInterview}
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
                          <MoleculePersonaCard 
                            title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                            description="이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다. 이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다"
                            isReady={true}
                            hideCheckCircle={true}
                          />
                          <MoleculePersonaCard 
                            title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                            description="이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다. 이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다"
                            isReady={true}
                            hideCheckCircle={true}
                          />
                        </PersonaCards>
                      </ContentSection>
                    </CustomizePersona>
                  </>
                )}
              </CardWrap>
            </MainSection>

            <Sidebar>
              <h5>Let's Start Now</h5>

              <ProgressBar>
                <span>🚀</span>
                <Progress progress={progress} />
                <span>{progress}%</span>
              </ProgressBar>

              <MoleculeStepIndicator steps={steps} />

              <InterviewRoom showInterview={showInterview}>
                <ul>
                  <li>
                    <span>방식</span>
                    <p>1:N 인터뷰</p>
                  </li>
                  <li>
                    <span>목적</span>
                    <p>제품 경험 평가</p>
                  </li>
                  <li>
                    <span>참여자</span>
                    <p>5명</p>
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

export default PagePersona;

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

const CreateCard = styled(Card)`
  align-items:center;
  padding: 44px 24px;

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    line-height: 1.5;
    color: ${palette.gray500};
  }
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
  display: ${props => props.showInterview ? 'flex' : 'none'};
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
  cursor: pointer;
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
