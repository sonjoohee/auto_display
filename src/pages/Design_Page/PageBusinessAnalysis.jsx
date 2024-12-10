import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";

import images from "../../assets/styles/Images";
import { palette } from "../../assets/styles/Palette";
import { Button } from "../../assets/styles/ButtonStyle";
import { CustomInput, CustomTextarea } from "../../assets/styles/InputStyle";
import OrganismLeftSideBar from "../Expert_Insight/components/organisms/OrganismLeftSideBar";
import Header from "./IncHeader";
import StepIndicator from "./IncStepIndicator";
import PersonaCard from "./PersonaCard";
import PopupWrap from "../../assets/styles/Popup";
import ToastPopupWrap from "../../assets/styles/ToastPopup";

const PageBusinessAnalysis = () => {
  const [state, setState] = useState({
    showPersona: false,
    showInterview: false,
    showCustomizePersona: false,
    selectedInterviewType: '',
    activeCategory: 1,
    showCardContent: true,
    showEditCard: false,
    showCustomModal: false,
    showInterviewReady: false,
    progress: 25,
    steps: [
      { number: 1, label: '비즈니스 분석', active: true },
      { number: 2, label: '맞춤 페르소나 추천', active: false },
      { number: 3, label: '인터뷰 방법 선택', active: false },
      { number: 4, label: '페르소나와 인터뷰', active: false },
      { number: 5, label: '의견 분석', active: false }
    ],
    inputs: {
      field1: { value: "쉽고 빠른 개인 금융업무 지원 모바일 서비스", isValid: false, isError: false, errorMessage: "" },
      field2: { value: "이 애플리케이션은 사용자가 쉽고 빠르게 송금 및 이체를 할 수 있도록 돕는 것을 목표로 합니다.", isValid: false, isError: false, errorMessage: "" },
      field3: { value: "", isValid: false, isError: false, errorMessage: "" }
    }
  });

  const textareaRef = useRef(null);

  const handleChange = (e, fieldName) => {
    const newValue = e.target.value;
    validateInput(newValue, fieldName);
    adjustTextareaHeight(e.target);
  };

  const validateInput = (value, fieldName) => {
    setState(prev => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [fieldName]: {
          ...prev.inputs[fieldName],
          value: value,
          isError: value.length < 3,
          isValid: value.length >= 3,
          errorMessage: value.length < 3 ? "최소 3자 이상 입력해주세요." : ""
        }
      }
    }));
  };

  const adjustTextareaHeight = (element) => {
    if (element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [state.inputs.field2.value]);

  const handleCreatePersona = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setState(prev => ({
      ...prev,
      showPersona: true,
      showInterview: false,
      showCustomizePersona: true,
      progress: 50,
      steps: prev.steps.map(step => 
        step.number === 2 ? { ...step, active: true } : step
      )
    }));
  };

  const [showToast, setShowToast] = useState(false);
  const [showInterviewReady, setShowInterviewReady] = useState(false);
  const handleStartInterview = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        showPersona: false,
        showInterview: true,
        showCustomizePersona: false,
        showCardContent: false,
        progress: 75,
        steps: prev.steps.map(step => 
          step.number === 3 ? { ...step, active: true } : step
        ),
        showInterviewReady: true, // 추가된 부분
      }));
    }, 300);
  };

  const handleCategoryClick = (categoryId) => {
    setState(prev => ({
      ...prev,
      activeCategory: categoryId
    }));
  };

  const handleInterviewTypeSelect = (type) => {
    setState(prev => ({
      ...prev,
      selectedInterviewType: type
    }));
  };

  const toggleCardContent = () => {
    setState(prev => ({
      ...prev,
      showCardContent: !prev.showCardContent
    }));
  };

  const handleConfirm = () => {
    setState(prev => ({
      ...prev,
      showCustomModal: false
    }));
  };

  const handleCancel = () => {
    setState(prev => ({
      ...prev,
      showCustomModal: false
    }));
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
  
  const [checkedPersonas, setCheckedPersonas] = useState(0);

  const getInputStatus = (field) => {
    if (field.isError) return 'error';
    if (field.isValid) return 'valid';
    return 'default';
  }

  const [showPopup, setShowPopup] = useState(false);
  const handlePopupClose = () => {
    setShowPopup(false);
    setShowInterviewReady(false);
  }




  // const [showPersona, setShowPersona] = useState(false);
  // const [showInterview, setShowInterview] = useState(false);
  // const [showCustomizePersona, setShowCustomizePersona] = useState(false);
  // const [selectedInterviewType, setSelectedInterviewType] = useState('');
  // const [activeCategory, setActiveCategory] = useState(1);
  // const [showCardContent, setShowCardContent] = useState(true);
  // const [showEditCard, setShowEditCard] = useState(false);
  // const [showCustomModal, setShowCustomModal] = useState(false);
  // const [showInterviewReady, setShowInterviewReady] = useState(false);

  // const [progress, setProgress] = useState(25);


  // useEffect(() => {
  //   if (showEditCard) {
  //     adjustTextareaHeight(textareaRef.current);
  //   }
  // }, [showEditCard, inputs.field2.value]);

    
  // 부모 스크롤 비활성화
  useEffect(() => {
    if (showToast) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showToast]);

  return (
    <>
      <ContentsWrap>
        <OrganismLeftSideBar />

        <Header />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <Title>
                <h3>비즈니스 분석</h3>
                <ButtonGroup>
                  {state.showEditCard ? (
                    <IconButton onClick={() => setState(prev => ({ ...prev, showEditCard: false }))}>
                      <img src={images.IconRepeatSquare} alt="저장하기" />
                      <span>저장하기</span>
                    </IconButton>
                  ) : (
                    <>
                      <IconButton>
                        <img src={images.IconRepeatSquare} alt="재생성" />
                        <span>재생성하기</span>
                      </IconButton>
                      <IconButton onClick={() => setState(prev => ({ ...prev, showEditCard: true }))}>
                        <img src={images.IconRepeatSquare} alt="수정하기" />
                        <span>수정하기</span>
                      </IconButton>
                    </>
                  )}
                </ButtonGroup>
              </Title>

              <CardWrap>
                {state.showEditCard ? (
                  <Card Edit>
                    <FormEdit>
                      <span>비즈니스 명</span>
                      <FormBox status={getInputStatus(state.inputs.field1)}>
                        <CustomInput Edit
                          type="text" 
                          placeholder="비즈니스 명을 입력해주세요."
                          value={state.inputs.field1.value}
                          onChange={(e) => handleChange(e, 'field1')}
                          status={getInputStatus(state.inputs.field1)}
                        />
                      </FormBox>
                    </FormEdit>

                    <FormEdit>
                      <span>태그</span>
                      <FormBox>
                        <TagWrap>
                          <Tag color="Red" />
                          <Tag color="LavenderMagenta" />
                          <Tag color="Amethyst" />
                        </TagWrap>
                      </FormBox>
                    </FormEdit>

                    <FormEdit>
                      <span>비즈니스 설명</span>
                      <FormBox status={getInputStatus(state.inputs.field2)}>
                        <CustomTextarea Edit 
                          ref={textareaRef}
                          value={state.inputs.field2.value}
                          onChange={(e) => handleChange(e, 'field2')}
                          status={getInputStatus(state.inputs.field2)}
                          style={{ height: 'auto', overflow: 'hidden', resize: 'none' }}
                        />

                        <EditButtonGroup>
                          <IconButton>
                            <img src={images.ClockCounterclockwise} alt="" />
                            <span>이전으로 되돌리기</span>
                          </IconButton>
                          <IconButton>
                            <img src={images.MagicStick} alt="" />
                            <span>AI로 다듬기</span>
                          </IconButton>
                        </EditButtonGroup>
                      </FormBox>
                    </FormEdit>
                  </Card>
                ) : (
                  <Card>
                    <CardTitle>
                      <h2>쉽고 빠르게 송금 및 이체 할 수 있는 어플리케이션</h2>
                      <TagWrap>
                        <Tag color="Red" />
                        <Tag color="LavenderMagenta" />
                        <Tag color="Amethyst" />
                      </TagWrap>
                      {state.showInterview && (
                        <ToggleButton 
                          showContent={state.showCardContent}
                          onClick={toggleCardContent}
                        >
                          {state.showCardContent ? '' : ''}
                        </ToggleButton>
                      )}
                    </CardTitle>
                    {state.showCardContent && (
                      <CardContent>
                        <p>이 애플리케이션은 사용자가 쉽고 빠르게 송금 및 이체를 할 수 있도록 돕는 것을 목표로 합니다. 이를 통해 복잡한 금융 절차를 간소화하고 사용자에게 편리함을 제공합니다.</p>
                        <p>주요 특징으로는 사용 편의성을 극대화한 직관적인 UI/UX, 빠른 송금 속도, 저렴한 수수료, 그리고 사용자 맞춤형 알림 서비스 등이 있습니다. 이러한 특징들은 사용자에게 최상의 경험을 제공하며 경쟁사 대비 차별화된 가치를 제안합니다.<br />
                        주요 특징으로는 사용 편의성을 극대화한 직관적인 UI/UX, 빠른 송금 속도, 저렴한 수수료, 그리고 사용자 맞춤형 알림 서비스 등이 있습니다. 이러한 특징들은 사용자에게 최상의 경험을 제공하며 경쟁사 대비 차별화된 가치를 제안합니다.</p>
                      </CardContent>
                    )}
                  </Card>
                )}

                {/* 맞춤 페르소나 생성 */}
                {!state.showPersona && !state.showInterview && (
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
                {state.showCustomizePersona && (
                  <>
                    <CustomizePersona>
                      <Title Column>
                        <h3>비즈니스 맞춤 페르소나</h3>
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
                          <PersonaCard 
                            title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                            keywords={['키워드1', '키워드2', '키워드3']}
                            description="이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다. 이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다"
                            isBasic={true}
                            onCheckChange={(isChecked) => setCheckedPersonas(prev => isChecked ? prev + 1 : prev - 1)}
                          />
                          <PersonaCard 
                            title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                            keywords={['키워드1', '키워드2', '키워드3']}
                            description="이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다. 이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다"
                            isBasic={true}
                            onCheckChange={(isChecked) => setCheckedPersonas(prev => isChecked ? prev + 1 : prev - 1)}
                          />
                          <PersonaCard 
                            title="도심에 거주하며 전문직에 종사하는 바쁜 생활인"
                            keywords={['키워드1', '키워드2', '키워드3']}
                            isCustom={true}
                            onShowPopup={() => {
                              setShowPopup(true);
                            }}
                          />
                        </PersonaCards>
                        
                        <BottomBar>
                          <p>
                            {checkedPersonas > 0 ? (
                              <>선택하신 <span>{checkedPersonas}명</span>의 페르소나와 인터뷰 하시겠어요?</>
                            ) : (
                              '페르소나를 선택하고 그들의 인터뷰를 시작해 보세요'
                            )}
                          </p>
                          <Button Large Primary Fill={checkedPersonas > 0} Edit={checkedPersonas === 0} disabled={checkedPersonas === 0} onClick={handleStartInterview}>
                            인터뷰 시작하기
                            <img src={images.ChevronRight} alt="" />
                          </Button>
                        </BottomBar>
                      </ContentSection>
                    </CustomizePersona>
                  </>
                )}

                {/* 인터뷰 방식 선택 */}
                {state.showInterview && (
                  <>
                    <CustomizePersona>
                      <Title>인터뷰 방식 선택</Title>

                      <InterviewTypeCards>
                        <InterviewTypeCard 
                          isActive={state.selectedInterviewType === 'multiple'}
                          onClick={() => handleInterviewTypeSelect('multiple')}
                        >
                          <CheckBox isActive={state.selectedInterviewType === 'multiple'} />
                          <strong isActive={state.selectedInterviewType === 'multiple'}>
                            (1:N) 다양한 페르소나와 인터뷰
                          </strong>
                          <p isActive={state.selectedInterviewType === 'multiple'}>
                            다양한 타겟 페르소나의 의견을 수집하여 인사이트를 얻어보세요.
                          </p>
                        </InterviewTypeCard>

                        <InterviewTypeCard 
                          isActive={state.selectedInterviewType === 'single'}
                          onClick={() => handleInterviewTypeSelect('single')}
                        >
                          <CheckBox isActive={state.selectedInterviewType === 'single'} />
                          <strong isActive={state.selectedInterviewType === 'single'}>
                            (1:1) 심층 인터뷰
                            <span>준비중</span>
                          </strong>
                          <p isActive={state.selectedInterviewType === 'single'}>
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
                            isActive={state.activeCategory === category.id}
                            onClick={() => handleCategoryClick(category.id)}
                          >
                            {category.label}
                          </TabButton>
                        ))}
                      </TabWrap>

                      <TabContent>
                        {categoryItems[state.activeCategory].map((item) => (
                          <PersonaCard 
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            expandedContent={item.expandedContent}
                            showDescription={state.showInterview}
                          />
                        ))}
                      </TabContent>
                    </InterviewSelect>

                    <CustomizePersona>
                      <Title Column>
                        비즈니스 맞춤 페르소나
                        <p>
                          추천된 페르소나와 인터뷰하세요. 그룹 또는 한 명의 타겟을 선택할 수 있습니다.
                          <span onClick={() => setState(prev => ({ ...prev, showCustomModal: true }))}>
                            <img src={images.PencilSquare} alt="" />
                            편집하기
                          </span>
                        </p>
                      </Title>
                      
                      <ContentSection>
                        <PersonaCards>
                          <PersonaCard 
                            title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                            description="이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다. 이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다"
                            isBasic={true}
                            hideCheckCircle={true}
                          />
                          <PersonaCard 
                            title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                            description="이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다. 이 사람에 대한 설명이 들어가는 자리 입니다. 너무 길게 들어가진 않고, 한 3줄 정도 들어가려고 합니다"
                            isBasic={true}
                            hideCheckCircle={true}
                          />
                        </PersonaCards>
                      </ContentSection>
                      
                      {state.showCustomModal && (
                        <PopupWrap 
                          TitleFlex
                          title="📝 맞춤형 페르소나 모집 요청하기" 
                          onConfirm={() => {
                            setState(prev => ({ ...prev, showCustomModal: false }));
                            handleConfirm();
                          }} 
                          onCancel={() => {
                            setState(prev => ({ ...prev, showCustomModal: false }));
                            handleCancel();
                          }}
                          buttonType="Fill"
                          closeText="닫기"
                          confirmText="편집완료"
                          isModal={true}
                          body={
                            <>
                              <Title>
                                <p>
                                  Selected
                                  <span onClick={() => setState(prev => ({ ...prev, showCustomModal: true }))}>
                                    <img src={images.ClockCounterclockwise} alt="" />
                                    이전으로 되돌리기
                                  </span>
                                </p>
                              </Title>
                              <PersonaCard 
                                TitleFlex
                                title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                                keywords={['키워드1', '키워드2', '키워드3']}
                                isBasic={true}
                                checked={true}
                              />
                              <PersonaCard 
                                TitleFlex
                                title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                                keywords={['키워드1', '키워드2', '키워드3']}
                                isBasic={true}
                                checked={true}
                              />

                              <Title style={{marginTop: '20px'}}>
                                <p>
                                  available
                                </p>
                              </Title>
                              <PersonaCard 
                                TitleFlex
                                title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                                keywords={['키워드1', '키워드2', '키워드3']}
                                isBasic={true}
                                checked={true}
                              />
                              <PersonaCard 
                                TitleFlex
                                title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                                keywords={['키워드1', '키워드2', '키워드3']}
                                isBasic={true}
                                checked={true}
                              />
                              
                            </>
                          }
                        />
                      )}

                    </CustomizePersona>
                  </>
                )}





                <>
                  <InterviewReport>
                    <div>
                      <ReportHeader>
                        <h3>제품 경험 평가 결과 리포트</h3>
                        <p>제품이 고객에게 어떤 가치를 전달하고 있는지, 소비자들이 느끼는 장점과 개선점을 세심히 파악하기 위해 진행되었습니다. 이를 통해 제품에 대한 긍정적인 경험을 더욱 확장하고, 고객 만족과 구매 전환율을 높이는 데 기여하고자 합니다.</p>
                      </ReportHeader>

                      <ReportContent>
                        <div>
                          <h3>조사 방법 및 범위</h3>
                          <UlList Disc>
                            <li>조사 방법 : 여러 페르소나와 인터뷰 (1:N)</li>
                            <li>조사 대상 : OO에 관심있는 페르소나 5명</li>
                          </UlList>
                        </div>
                      </ReportContent>
                    </div>

                    <div>
                    </div>
                  </InterviewReport>
                </>


              </CardWrap>
            </MainSection>

            <Sidebar>
              <h5>Let's Start Now</h5>

              <ProgressBar>
                <span>🚀</span>
                <Progress progress={state.progress} />
                <span>{state.progress}%</span>
              </ProgressBar>

              <StepIndicator steps={state.steps} />

              <InterviewRoom showInterview={state.showInterview}>
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
                <Button Large Primary Fill onClick={() => setShowInterviewReady(true)}>인터뷰룸 입장</Button>
              </InterviewRoom>
            </Sidebar>


            {showPopup && (
              <PopupWrap 
                Warning
                title="Request 상태의 페르소나는 선택이 제한됩니다." 
                message="인터뷰를 진행하려면 모집 요청을 먼저 진행해주세요"
                buttonType="Outline"
                closeText="확인"
                isModal={false}
                onCancel={handlePopupClose}
              />
            )}

            {showInterviewReady && (
              <PopupWrap 
                Check
                title="인터뷰 준비 완료" 
                message={
                  <>
                    인터뷰 룸 이동 시, 바로 시작됩니다.<br />
                    인터뷰를 중단하면 모든 내역이 삭제되니 주의하세요
                  </> 
                }
                buttonType="Outline"
                closeText="취소"
                confirmText="시작하기"
                isModal={false}
                onCancel={handlePopupClose}
                onConfirm={() => {
                  handlePopupClose(); // 팝업 닫기
                  setShowToast(true); // ToastPopupWrap 보이기
                }}
              />
            )}

            {showToast && (
              <ToastPopupWrap />
            )}
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageBusinessAnalysis;

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
  width: 100%;

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
      cursor: pointer;
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

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Pretendard', 'Poppins';
  font-size: 0.75rem;
  color: ${palette.chatBlue};
  padding: 4px 8px;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
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
  align-items: center;
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

const CardTitle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${palette.gray800};
  }
`;

const FormEdit = styled.div`
  display: flex;
  flex-direction:column;
  align-items:flex-start;
  gap:8px;

  > span {
    font-weight: 300;
    line-height:1.5;
    color:${palette.gray700};
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap:32px;
  width:100%;
  padding:16px;
  border-radius:10px;
  border: 1px solid ${props => 
    props.status === 'error' ? palette.error : palette.outlineGray};
  transition: all .5s;

  &:focus-within {
    border: 1px solid ${palette.chatBlue};
    box-shadow: 0 0 8px 0 rgba(34, 111, 255, 0.5);
  }
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 0.88rem;
  line-height: 1.5;
  padding: 4px 12px;
  border-radius: 15px;

  &::before {
    content: "${props => {
      switch(props.color) {
        case 'Red': return '광고, 마케팅';
        case 'LavenderMagenta': return '교육';
        case 'Amethyst': return '금융, 보험, 핀테크';
        case 'VistaBlue': return '게임';
        case 'BlueYonder': return '모빌리티, 교통';
        case 'MidnightBlue': return '물류';
        case 'ButtonBlue': return '부동산, 건설';
        case 'ButtonBlue': return '뷰티, 화장품';
        case 'MiddleBlueGreen': return 'AI, 딥테크, 블록체인';
        case 'GreenSheen': return '소셜미디어, 커뮤니티';
        case 'TropicalRainForest': return '여행, 레저';
        case 'DollarBill': return '유아 출산';
        case 'Olivine': return '인사, 비즈니스, 법률';
        case 'ChineseGreen': return '제조, 하드웨어';
        case 'Jonquil': return '커머스';
        case 'PastelOrange': return '콘텐츠, 예술';
        case 'Tangerine': return '통신, 보안, 데이터';
        case 'Copper': return '패션';
        case 'Shadow': return '푸드, 농업';
        case 'Tuscany': return '환경, 에너지';
        case 'VeryLightTangelo': return '홈 리빙, 펫';
        case 'Orange': return '헬스케어, 바이오';
        case 'CarnationPink': return '피트니스, 스포츠';
        default: return '';
      }
    }}";
  }
  
  ${({ color }) => {
    switch(color) {
      case 'Red':
        return `
          color: #E90102;
          background: rgba(233, 1, 2, 0.06);
        `;
      case 'LavenderMagenta':
        return `
          color: #ED7EED;
          background: rgba(237, 126, 237, 0.06);
        `;
      case 'Amethyst':
        return `
          color: #8B61D1;
          background: rgba(139, 97, 209, 0.06);
        `;
      case 'VistaBlue':
        return `
          color: #8B61D1;
          background: rgba(125, 140, 225, 0.06);
        `;
      case 'BlueYonder':
        return `
          color: #8B61D1;
          background: rgba(84, 113, 171, 0.06);
        `;
      case 'MidnightBlue':
        return `
          color: #03458F;
          background: rgba(3, 69, 143, 0.06);
        `;
      case 'ButtonBlue':
        return `
          color: #20B1EA;
          background: rgba(32, 177, 234, 0.06);
        `;
      case 'CeruleanFrost':
        return `
          color: #5E9EBF;
          background: rgba(94, 158, 191, 0.06);
        `;
      case 'MiddleBlueGreen':
        return `
          color: #7DCED2;
          background: rgba(125, 206, 210, 0.06);

        `;
      case 'GreenSheen':
        return `
          color: #74B49C;
          background: rgba(116, 180, 156, 0.06);
        `;
      case 'TropicalRainForest':
        return `
          color: #027355;
          background: rgba(2, 115, 85, 0.06);
        `;
      case 'DollarBill':
        return `
          color: #8DC955;
          background: rgba(141, 201, 85, 0.06);
        `;
      case 'Olivine':
        return `
          color: #AABC76;
          background: rgba(170, 188, 118, 0.06);
        `;
      case 'ChineseGreen':
        return `
          color: #C7D062;
          background: rgba(199, 208, 98, 0.06);
        `;
      case 'Jonquil':
        return `
          color: #F7CD17;
          background: rgba(247, 205, 23, 0.06);
        `; 
      case 'PastelOrange':
        return `
          color: #FFBB52;
          background: rgba(255, 187, 82, 0.06);
        `;
      case 'Tangerine':
        return `
          color: #F48D0B;
          background: rgba(244, 141, 11, 0.06);
        `;
      case 'Copper':
        return `
          color: #BC742F;
          background: rgba(188, 116, 47, 0.06);
        `;
      case 'Shadow':
        return `
          color: #8C725B;
          background: rgba(140, 114, 91, 0.06);
        `;
      case 'Tuscany':
        return `
          color: #B1A098;
          background: rgba(177, 160, 152, 0.06);
        `;
      case 'VeryLightTangelo':
        return `
          color: #FAAD80;
          background: rgba(250, 173, 128, 0.06);
        `;
      case 'Orange':
        return `
          color: #FC6602;
          background: rgba(252, 102, 2, 0.06);
        `;
      case 'CarnationPink':
        return `
          color: #FFA8B9;
          background: rgba(255, 168, 185, 0.06);
        `;
      default:
        return '';
    }
  }}
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Pretendard', 'Poppins';
  font-size: 0.75rem;
  color: ${palette.chatBlue};
  padding: 4px 8px;
  border-radius: 100px;
  border: none;
  background: ${palette.chatGray};
  cursor: pointer;

  &:before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: ${props => props.showContent 
      ? 'translate(-50%, -50%) rotate(225deg)' 
      : 'translate(-50%, -50%) rotate(45deg)'};
    width: 10px;
    height: 10px;
    border-bottom: 2px solid ${palette.gray300};
    border-right: 2px solid ${palette.gray300};
    transition: all .5s;
    content: '';
  }
`;

const CardContent = styled.div`
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  p + p {
    margin-top: 20px;
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
    font-size: 0.875rem;
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

const InterviewReport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
`;

const ReportHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  text-align: left;

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray800};
  }

  p {
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
  }
`;

const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  text-align: left;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid ${palette.outlineGray};

  > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  h3 {
    font-weight: 500;
    line-height: 1.3;
    color: ${palette.gray800};
  }
`;

const UlList = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    position: relative;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
    padding-left: 20px;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${palette.gay700};
    }


  }
`;