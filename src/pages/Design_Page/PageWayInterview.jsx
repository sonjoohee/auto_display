import React, { useState } from "react";
import styled from "styled-components";

import { palette } from "../../assets/styles/Palette";
import images from "../../assets/styles/Images";
import { Button } from "../../assets/styles/ButtonStyle";
import { CustomTextarea } from "../../assets/styles/InputStyle";
import PopupWrap from "../../assets/styles/Popup";

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
  // AccordionHeader,  // 제거
  // AccordionIcon,    // 제거
  // AccordionContent, // 제거
} from "../../assets/styles/BusinessAnalysisStyle";

import OrganismLeftSideBar from "../Expert_Insight/components/organisms/OrganismLeftSideBar";
import Header from "./IncHeader";
import PersonaCard from "./PersonaCard";
import AnalysisInfo from "./PageAnalysisInfo";
import Sidebar from "./IncSidebar";


const PageWayInterview = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formState, setFormState] = useState({
    purpose: '', // 목적 텍스트에리어
    personaCount: '', // 페르소나 수 라디오
  });
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleTypeSelect = (type) => {
    if (type === 'single') return;
    setSelectedType(type);
  };

  const handleEditClick = () => {
    setShowPopup(true);
  };

  const handleInputChange = (field, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return formState.purpose.trim() !== '' && formState.personaCount !== '';
  };

  // 인터뷰 목적 데이터 정의
  const interviewPurposes = [
    {
      id: 1,
      title: "가족과 함께 여가를 보내는 활동 지향형 소비자",
      description: "다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견",
      expandedContent: [
        "제품 사용 시 가장 불편했던 점은 무엇인가요?",
        "제품의 어떤 기능이 가장 유용했나요?",
        "제품을 사용하면서 개선되었으면 하는 점이 있다면 무엇인가요?"
      ]
    },
    {
      id: 2,
      title: "가족과 함께 여가를 보내는 활동 지향형 소비자",
      description: "다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견",
      expandedContent: [
        "제품의 가격대비 만족도는 어떠신가요?",
        "비슷한 제품과 비교했을 때 차별화된 장점은 무엇인가요?",
        "주변 지인들에게 추천하고 싶은 정도를 평가한다면?"
      ]
    },
    {
      id: 3,
      title: "가족과 함께 여가를 보내는 활동 지향형 소비자",
      description: "다양한 시나리오에서 제품의 사용 가능성을 평가하여 부적합한 환경 발견",
      expandedContent: [
        "제품을 처음 접했을 때의 첫인상은 어땠나요?",
        "제품 사용법을 익히는데 어려움은 없었나요?",
        "앞으로도 계속 사용할 의향이 있으신가요?"
      ]
    }
  ];

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismLeftSideBar />

        <Header />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <AnalysisInfo />

              <CustomizePersona>
                <CardWrap>
                  <Title>인터뷰 방식 선택</Title>

                  <InterviewTypeCards>
                    <InterviewTypeCard 
                      isActive={selectedType === 'multiple'}
                      onClick={() => handleTypeSelect('multiple')}
                    >
                      <CheckBox isActive={selectedType === 'multiple'} />
                      <strong>
                        (1:N) 다양한 페르소나와 인터뷰
                      </strong>
                      <p>
                        다양한 타겟 페르소나의 의견을 수집하여 인사이트를 얻어보세요.
                      </p>
                    </InterviewTypeCard>

                    <InterviewTypeCard 
                      isActive={selectedType === 'single'}
                      onClick={() => handleTypeSelect('single')}
                      disabled={true}
                    >
                      <CheckBox isActive={selectedType === 'single'} />
                      <strong>
                        (1:1) 심층 인터뷰
                        <span>준비중</span>
                      </strong>
                      <p>
                        한 명의 타겟 페르소나에게 개인화된 질문으로 심층적인 인사이트를 얻어보세요
                      </p>
                    </InterviewTypeCard>
                  </InterviewTypeCards>
                </CardWrap>
              </CustomizePersona>

              <InterviewSelect>
                <Title>인터뷰 목적</Title>

                <TabWrap>
                  <TabButton>전체</TabButton>
                  <TabButton>제품 사용 경험</TabButton>
                  <TabButton>구매 및 소비 심리</TabButton>
                  <TabButton>사용자 시뮬레이션</TabButton>
                </TabWrap>

                <TabContent>
                  {interviewPurposes.map((item) => (
                    <PersonaCard 
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      expandedContent={item.expandedContent}
                    />
                  ))}
                </TabContent>
              </InterviewSelect>

              <CustomizePersona>
                <Title Column>
                  비즈니스 맞춤 페르소나
                  <p>
                    추천된 페르소나와 인터뷰하세요. 그룹 또는 한 명의 타겟을 선택할 수 있습니다.
                    <span onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                      <img src={images.PencilSquare} alt="" />
                      편집하기
                    </span>
                  </p>
                </Title>
              
                <ContentSection>
                  <PersonaCards>
                    <PersonaCard 
                      title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                      isBasic={true}
                      hideCheckCircle={true}
                    />
                    <PersonaCard 
                      title="가족과 함께 여가를 보내는 활동 지향형 소비자"
                      isBasic={true}
                      hideCheckCircle={true}
                    />
                  </PersonaCards>
                </ContentSection>
              </CustomizePersona>
            </MainSection>

            <Sidebar />
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>



      {showPopup && (
        <PopupWrap 
          title="📝 맞춤형 페르소나 모집 요청하기" 
          buttonType="Fill"
          confirmText="맞춤 페르소나 모집하기"
          isModal={true}
          onClose={handlePopupClose}
          onCancel={handlePopupClose}
          body={
            <div>
              <div className="bgBox">
                <strong>도심에 거주하며 전문직에 종사하는 바쁜 생활인 </strong>
                <p className="tag">
                  <span>키워드1</span>
                  <span>키워드2</span>
                  <span>키워드3</span>
                </p>
              </div>

              <dl>
                <dt className="point">맞춤형 페르소나는 어떤 용도로 활용하실 계획이신가요?</dt>
                <dd>
                  <CustomTextarea 
                    rows={3}
                    placeholder="생성하기 위한 목적을 적어 주세요."
                    value={formState.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                  />
                </dd>
              </dl>

              <AccordionSection>
                <CustomAccordionHeader 
                  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                >
                  🔍 추가정보를 입력하여, 더 정확한 타겟 페르소나를 찾으세요
                  <CustomAccordionIcon isOpen={isAccordionOpen} />
                </CustomAccordionHeader>
                {isAccordionOpen && (
                  <CustomAccordionContent>
                    <dl>
                      <dt>추가정보</dt>
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
                        나이
                        <p>* 선택하지 않는 경우, 연령 무관으로 페르소나를 생성합니다.</p>
                      </dt>
                      <dd>
                        <input type="radio" id="age1" name="age" />
                        <label htmlFor="age1" className="age">10대</label>
                        <input type="radio" id="age2" name="age" />
                        <label htmlFor="age2" className="age">20대</label>
                        <input type="radio" id="age3" name="age" />
                        <label htmlFor="age3" className="age">30대</label>
                        <input type="radio" id="age4" name="age" />
                        <label htmlFor="age4" className="age">40대</label>
                        <input type="radio" id="age5" name="age" />
                        <label htmlFor="age5" className="age">50대</label>
                        <input type="radio" id="age6" name="age" />
                        <label htmlFor="age6" className="age">60대</label>
                        <input type="radio" id="age7" name="age" />
                        <label htmlFor="age7" className="age">70대 이상</label>
                      </dd>
                    </dl>

                    <dl>
                      <dt>더 상세하게 필요한 정보를 입력해주세요 </dt>
                      <dd>
                        <CustomTextarea 
                          rows={3}
                          placeholder="모집하고 싶은 페르소나의 성향, 목표, 행동 패턴을 구체적으로 입력해주세요"
                        />
                      </dd>
                    </dl>
                  </CustomAccordionContent>
                )}
              </AccordionSection>
            </div>
          }
        />
      )}







    </>
  );
};

export default PageWayInterview;

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
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
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

const InterviewSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

const PersonaCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const TabContent = styled(PersonaCards)`
  gap: 12px;
`;

const CustomAccordionIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${palette.gray500};
    border-bottom: 2px solid ${palette.gray500};
    transform: translate(-50%, -50%) ${props => props.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
    transition: transform 0.3s ease;
  }
`;

const CustomAccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: ${palette.chatGray};
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${palette.gray700};
  transition: background 0.3s ease;

  &:hover {
    background: ${palette.gray100};
  }
`;

const CustomAccordionContent = styled.div`
  padding: 20px 16px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  margin-top: 12px;
  background: ${palette.white};
`;
