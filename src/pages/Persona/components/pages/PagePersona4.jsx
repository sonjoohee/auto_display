import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  IS_PERSONA_ACCESSIBLE,
  IS_LOGGED_IN,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  REPORT_LOAD_BUTTON_STATE,
  SELECTED_INTERVIEW_PURPOSE,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL
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
import Header from "../molecules/MoleculeHeader";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
// import Sidebar from "../../../Design_Page/IncSidebar";
import IncNavigation from "../organisms/OrganismIncNavigation";
import OrganismBusinessAnalysis from "../organisms/OrganismBisinessAnalysis";
import { createProjectReportOnServer } from "../../../../utils/indexedDB";
import { getProjectReportByIdFromIndexedDB } from "../../../../utils/indexedDB";
import MoleculeStepIndicator from "../molecules/MoleculeStepIndicator";

const PagePersona4 = () => {
  const navigate = useNavigate();
  const [interviewReport, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [interviewReportAdditional, setInterviewReportAdditional] = useAtom(INTERVIEW_REPORT_ADDITIONAL);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [reportReady, setReportReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [reportId, setReportId] = useAtom(PROJECT_REPORT_ID);
  const [reportLoadButtonState, setReportLoadButtonState] = useAtom(
    REPORT_LOAD_BUTTON_STATE
  );
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openCard, setOpenCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRef = useRef(null);

  const [steps, setSteps] = useState([
    { number: 1, label: "비즈니스 분석", active: true },
    { number: 2, label: "맞춤 페르소나 추천", active: true },
    { number: 3, label: "인터뷰 방법 선택", active: true },
    { number: 4, label: "페르소나와 인터뷰", active: true },
    { number: 5, label: "의견 분석", active: true },
  ]);

  let newReportId;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (reportId) {
      setReportReady(true);
    }
  }, [reportId]);

  useEffect(() => {
    const loadProjectReport = async () => {
      // 1. 로그인 여부 확인
      if (reportLoadButtonState) {
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
        const savedProjectReportInfo = await getProjectReportByIdFromIndexedDB(
          reportId,
          reportLoadButtonState
        );
        if (savedProjectReportInfo) {
          // const analysisData = savedProjectInfo.analysisReportData || {};
          // setTitleOfBusinessInfo(analysisData.title || "");
          // setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
          // setInputBusinessInfo(savedProjectInfo.inputBusinessInfo);
          // setPersonaList(savedProjectInfo.personaList);
        }
        // setIsLoadingPage(false); // 로딩 완료
        setReportLoadButtonState(false);
      } else {
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
        if (!reportId && isPersonaAccessible) {
          try {
            newReportId = await createProjectReportOnServer(isLoggedIn);
            setReportId(newReportId); // 생성된 대화 ID 설정
            setIsPersonaAccessible(true);
          } catch (error) {
            // setIsLoadingPage(false); // 로딩 완료
            setIsPersonaAccessible(true);
            console.error("Failed to create project on server:", error);
          }
        }
      }
    };

    loadProjectReport();
  }, [reportId, isLoggedIn, navigate]);

  const handleAccordionClick = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleCardClick = (index) => {
    setOpenCard(openCard === index ? null : index);
  };

  const handleSlide = (direction) => {
    const cards = document.querySelectorAll(".find-card > div > div");
    const cardWidth = 311;
    const maxSlide = Math.max(0, cards.length - 2);

    if (direction === "next" && currentSlide < maxSlide) {
      setCurrentSlide((prev) => prev + 1);
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(-${
          (currentSlide + 1) * cardWidth
        }px)`;
      }
    } else if (direction === "prev" && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      if (cardRef.current) {
        cardRef.current.style.transform = `translateX(-${
          (currentSlide - 1) * cardWidth
        }px)`;
      }
    }
  };

  const getInterviewPurposeDescription = (purpose) => {
    switch (purpose) {
      case "제품 경험 평가":
        return "제품이 고객에게 어떤 가치를 전달하고 있는지, 소비자들이 느끼는 장점과 개선점을 세심히 파악하기 위해 진행되었습니다. 이를 통해 제품에 대한 긍정적인 경험을 더욱 확장하고, 고객 만족과 구매 전환율을 높이는 데 기여하고자 합니다.";
      
      case "구매 전환 요인 분석":
        return "소비자가 구매를 결정하는 데 영향을 미치는 핵심 요인을 파악하여, 최적의 구매 환경을 설계하기 위해 수행됩니다. 이를 통해 고객의 구매 장벽을 낮추고 전환율을 높이는 전략적 개선점을 도출합니다.";
      
      case "소비자 여정 맵핑":
        return "소비자가 제품 또는 서비스를 이용하는 과정에서의 모든 접점과 경험을 분석하여, 고객의 니즈와 개선이 필요한 부분을 명확히 식별하는 데 활용됩니다. 이를 기반으로 고객 여정을 최적화하고 긍정적인 경험을 제공합니다.";
      
      case "사용 맥락 조사":
        return "제품이 사용되는 실제 환경과 상황적 요인을 이해하여, 사용자 경험에 영향을 미치는 요소를 체계적으로 분석합니다. 이를 통해 제품 사용의 편의성을 높이고 환경적 제약을 고려한 개선안을 도출합니다.";
      
      case "제품 이해도 테스트":
        return "소비자가 제품의 개념과 사용 방법을 얼마나 잘 이해하는지를 측정하고, 이를 바탕으로 정보 전달과 사용성 문제를 해결합니다. 이를 통해 제품과 사용자 간의 상호작용을 개선합니다.";
      
      case "소비자 행동 유도 요소 분석":
        return "소비자가 구매, 클릭 등의 특정 행동을 하도록 유도하는 설계 요소를 분석하여, 전환율을 높이는 전략적 개선 기회를 제공합니다. 이를 통해 사용자 참여를 극대화하고 비즈니스 성과를 향상시킵니다.";
      
      case "제품 기대치 확인":
        return "소비자가 제품에 대해 가지는 초기 기대와 실제 사용 경험 간의 차이를 분석하여, 기대 불일치를 줄이고 사용자 만족을 높이는 데 초점을 맞춥니다. 이를 통해 고객 신뢰를 강화하고 긍정적인 제품 이미지를 확립합니다.";
      
      case "사용자 경험 시뮬레이션":
        return "제품 사용 과정을 가상으로 재현하여, 발생 가능한 문제를 사전에 파악하고 개선 기회를 찾는 데 활용됩니다. 이를 통해 사용자 중심의 설계를 실현하고 제품 품질을 한 단계 끌어올립니다.";
      
      default:
        return "제품이 고객에게 어떤 가치를 전달하고 있는지, 소비자들이 느끼는 장점과 개선점을 세심히 파악하기 위해 진행되었습니다. 이를 통해 제품에 대한 긍정적인 경험을 더욱 확장하고, 고객 만족과 구매 전환율을 높이는 데 기여하고자 합니다.";
    }
  };

  return (
    <>
      <ContentsWrap>
        <IncNavigation />

        <Header />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <OrganismBusinessAnalysis personaStep={4} />

              <InterviewReport>
                <div>
                  <ReportHeader>
                    <h3>{selectedInterviewPurpose} 결과 리포트</h3>
                    <p>{getInterviewPurposeDescription(selectedInterviewPurpose)}</p>
                  </ReportHeader>

                  <ReportContent>
                    <div>
                      <h3>1. 조사 방법 및 범위</h3>
                      <UlList Disc>
                        <li>조사 방법 : 여러 페르소나와 인터뷰 (1:N)</li>
                        <li>조사 대상 : {interviewReport[0].text}</li>
                      </UlList>
                    </div>

                    <div>
                      <h3>2. 주요 인사이트</h3>
                      <UlList Disc Spacing>
                        <li>
                          {interviewReport[1].main_insight[0].description_1}
                        </li>
                        <li>
                          {interviewReport[1].main_insight[1].description_2}
                        </li>
                      </UlList>
                    </div>

                    <div>
                      <h3>
                        3. 문항별 결과
                        <span>
                          <img src={images.ReportSearch} alt="인터뷰 스크립트 보기" />
                          인터뷰 스크립트 보기
                        </span>
                      </h3>

                      <ResultAccordion>
                        <AccordionHeader
                          onClick={() => handleAccordionClick(1)}
                          isOpen={openAccordion === 1}
                        >
                          <span>1</span>
                          <p>제품이 고객에게 전달하는 가치는 무엇인가요?</p>
                        </AccordionHeader>

                        {openAccordion === 1 && (
                          <AccordionContent>
                            <div className="title">
                              <strong>인터뷰 핵심 키워드</strong>
                              <p>
                                응답자의 의견을 바탕으로 키워드 빈도수를 분석해
                                문항별 인사이트를 도출했습니다.
                              </p>
                            </div>

                            <GraphWrap />

                            <BgInside>
                              <strong>인터뷰 인사이드</strong>
                              <div>
                                <p>
                                  비대면 방식과 모바일 앱을 통한 편리한 예약 및
                                  관리 시스템이 가장 큰 차별점으로 인식됩니다.
                                  바쁜 현대인의 시간 부족 문제를 효과적으로
                                  해결하며, 실시간 진행 상황 확인 기능은
                                  투명성을 제공합니다. 다양한 세탁 옵션 또한
                                  고객 맞춤형 서비스를 제공하는 강점으로
                                  작용합니다.
                                </p>
                                <p>
                                  시간 절약과 편리성 외에도, 세탁 옵션의
                                  다양성과 정확한 세탁 의뢰 및 배송 추적
                                  시스템이 높은 평가를 받고 있습니다. 특히,
                                  개인의 시간 관리가 중요한 직장인들에게 업무
                                  효율 향상에 기여하는 점이 큰 장점으로
                                  인식됩니다.
                                </p>
                              </div>
                            </BgInside>
                          </AccordionContent>
                        )}
                      </ResultAccordion>

                      <ResultAccordion>
                        <AccordionHeader
                          onClick={() => handleAccordionClick(2)}
                          isOpen={openAccordion === 2}
                        >
                          <span>2</span>
                          <p>
                            경쟁 제품 사용자가 지금의 브랜드를 바꿔야 한다고
                            느낄 만한 상황은 어떤 경우일까요?
                          </p>
                        </AccordionHeader>

                        {openAccordion === 2 && (
                          <AccordionContent>
                            <div className="title">
                              <strong>인터뷰 핵심 키워드</strong>
                              <p>
                                응답자의 의견을 바탕으로 키워드 빈도수를 분석해
                                문항별 인사이트를 도출했습니다.
                              </p>
                            </div>

                            <GraphWrap />

                            <BgInside>
                              <strong>인터뷰 인사이드</strong>
                              <div>
                                <p>
                                  비대면 방식과 모바일 앱을 통한 편리한 예약 및
                                  관리 시스템이 가장 큰 차별점으로 인식됩니다.
                                  바쁜 현대인의 시간 부족 문제를 효과적으로
                                  해결하며, 실시간 진행 상황 확인 기능은
                                  투명성을 제공합니다. 다양한 세탁 옵션 또한
                                  고객 맞춤형 서비스를 제공하는 강점으로
                                  작용합니다.
                                </p>
                                <p>
                                  시간 절약과 편리성 외에도, 세탁 옵션의
                                  다양성과 정확한 세탁 의뢰 및 배송 추적
                                  시스템이 높은 평가를 받고 있습니다. 특히,
                                  개인의 시간 관리가 중요한 직장인들에게 업무
                                  효율 향상에 기여하는 점이 큰 장점으로
                                  인식됩니다.
                                </p>
                              </div>
                            </BgInside>
                          </AccordionContent>
                        )}
                      </ResultAccordion>

                      <ResultAccordion>
                        <AccordionHeader
                          onClick={() => handleAccordionClick(3)}
                          isOpen={openAccordion === 3}
                        >
                          <span>3</span>
                          <p>
                            경쟁 제품 사용자가 지금의 브랜드를 바꿔야 한다고
                            느낄 만한 상황은 어떤 경우일까요?
                          </p>
                        </AccordionHeader>

                        {openAccordion === 3 && (
                          <AccordionContent>
                            <div className="title">
                              <strong>인터뷰 핵심 키워드</strong>
                              <p>
                                응답자의 의견을 바탕으로 키워드 빈도수를 분석해
                                문항별 인사이트를 도출했습니다.
                              </p>
                            </div>

                            <GraphWrap />

                            <BgInside>
                              <strong>인터뷰 인사이드</strong>
                              <div>
                                <p>
                                  비대면 방식과 모바일 앱을 통한 편리한 예약 및
                                  관리 시스템이 가장 큰 차별점으로 인식됩니다.
                                  바쁜 현대인의 시간 부족 문제를 효과적으로
                                  해결하며, 실시간 진행 상황 확인 기능은
                                  투명성을 제공합니다. 다양한 세탁 옵션 또한
                                  고객 맞춤형 서비스를 제공하는 강점으로
                                  작용합니다.
                                </p>
                                <p>
                                  시간 절약과 편리성 외에도, 세탁 옵션의
                                  다양성과 정확한 세탁 의뢰 및 배송 추적
                                  시스템이 높은 평가를 받고 있습니다. 특히,
                                  개인의 시간 관리가 중요한 직장인들에게 업무
                                  효율 향상에 기여하는 점이 큰 장점으로
                                  인식됩니다.
                                </p>
                              </div>
                            </BgInside>
                          </AccordionContent>
                        )}
                      </ResultAccordion>
                    </div>
                  </ReportContent>
                </div>

                <div></div>
              </InterviewReport>

              <InterviewFind>
                <FindTitle>
                  <h3>💡 인터뷰로 이런 걸 발견했어요 !</h3>
                  <div>
                    <span
                      className="prev"
                      onClick={() => handleSlide("prev")}
                      style={{ opacity: currentSlide === 0 ? 0.4 : 1 }}
                    />
                    <span
                      className="next"
                      onClick={() => handleSlide("next")}
                      style={{ opacity: currentSlide === 2 ? 0.4 : 1 }}
                    />
                  </div>
                </FindTitle>

                <FindCard className="find-card">
                  <div
                    ref={cardRef}
                    style={{
                      display: "flex",
                      gap: "16px",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  >
                    {[
                      {
                        icon: images.DiscoveryBrand,
                        badge: { icon: "🌟", text: "브랜드 파워" },
                        title: "디자인 강점 더 알리기 디자인 강점 더 알리기",
                        description:
                          "사용자들은 개인 맞춤형 기능이 부족하다고 느끼고 있습니다. 특히 가족 구성원별 설정, 사용 패턴 학습을 통한 자동화 기능 등이 요구됩니다. 개인화 기능을 강화하여 사용자 만족도를 높일 수 있습니다.",
                      },
                      {
                        icon: images.DiscoveryInsight,
                        badge: { icon: "🎟", text: "타겟 세분화" },
                        title: "디자인 강점 더 알리기 디자인 강점 더 알리기",
                        description:
                          "개인정보 보안에 대한 우려가 높게 나타났습니다. 강화된 보안 시스템 구축과 함께, 사용자들에게 보안 정책을 명확하게 전달하고 정기적인 보안 업데이트를 제공하는 것이 중요합니다.",
                      },
                      {
                        icon: images.DiscoverySuccess,
                        badge: { icon: "🚀", text: "성공 전략" },
                        title: "디자인 강점 더 알리기 디자인 강점 더 알리기",
                        description:
                          "모든 연령대가 쉽게 사용할 수 있는 직관적인 인터페이스가 필요합니다. 특히 고령자를 위한 큰 글씨 모드, 음성 안내 기능 등 접근성을 고려한 UI/UX 개선이 요구됩니다.",
                      },
                      {
                        icon: images.DiscoveryExperience,
                        badge: { icon: "🤝", text: "고객 경험" },
                        title: "디자인 강점 더 알리기 디자인 강점 더 알리기",
                        description:
                          "전반적인 음성 인식률과 반응 속도는 긍정적으로 평가되었으나, 일부 복잡한 명령어 처리 시 지연이 발생합니다. 성능 최적화를 통해 더 빠르고 정확한 응답 시스템 구축이 필요합니다.",
                      },
                      {
                        icon: images.DiscoveryScale,
                        badge: { icon: "📈", text: "스케일업" },
                        title: "디자인 강점 더 알리기 디자인 강점 더 알리기",
                        description:
                          "전반적인 음성 인식률과 반응 속도는 긍정적으로 평가되었으나, 일부 복잡한 명령어 처리 시 지연이 발생합니다. 성능 최적화를 통해 더 빠르고 정확한 응답 시스템 구축이 필요합니다.",
                      },
                      {
                        icon: images.DiscoveryBM,
                        badge: { icon: "📋", text: "BM 전략" },
                        title: "디자인 강점 더 알리기 디자인 강점 더 알리기",
                        description:
                          "전반적인 음성 인식률과 반응 속도는 긍정적으로 평가되었으나, 일부 복잡한 명령어 처리 시 지연이 발생합니다. 성능 최적화를 통해 더 빠르고 정확한 응답 시스템 구축이 필요합니다.",
                      },
                    ].map((item, index) => (
                      <Card key={index} onClick={() => handleCardClick(index)}>
                        {openCard !== index ? (
                          <>
                            <CardIcon>
                              <img src={item.icon} />
                            </CardIcon>
                            <CardBadge text={item.badge.text}>
                              <span>{item.badge.icon}</span>
                              {item.badge.text}
                            </CardBadge>
                            <CardTitle>{item.title}</CardTitle>
                          </>
                        ) : (
                          <CardDescription>
                            <strong>{item.title}</strong>
                            <p>{item.description}</p>
                          </CardDescription>
                        )}
                      </Card>
                    ))}
                  </div>
                </FindCard>
              </InterviewFind>
            </MainSection>

            <Sidebar>
              <h5>Let's Start Now</h5>

              <ProgressBar>
                <span>🚀</span>
                <Progress progress={100} />
                <span>Fin</span>
              </ProgressBar>

              <MoleculeStepIndicator steps={steps} activeStep={5} />

            </Sidebar>
          
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePersona4;

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

const InterviewReport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 100%;
  margin-top: 20px;
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
  gap: 32px;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-weight: 500;
    line-height: 1.3;
    color: ${palette.gray800};

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      font-weight: 300;
      color: ${palette.primary};
      line-height: 1.5;
      padding: 4px 16px;
      border-radius: 10px;
      border: 1px solid ${palette.primary};
      cursor: pointer;
    }
  }
`;

const UlList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.Spacing ? "20px" : "0")};

  li {
    position: relative;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
    padding-left: 10px;

    &:before {
      position: absolute;
      left: 0;
      top: 10px;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: ${palette.gray700};
      content: "";
    }
  }
`;

const ResultAccordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 24px 20px 24px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  font-weight: 600;
  color: ${palette.gray800};
  cursor: pointer;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    font-size: 0.875rem;
    color: ${palette.primary};
    line-height: 1.5;
    border-radius: 2px;
    border: 1px solid rgba(34, 111, 255, 0.5);
    background: rgba(34, 111, 255, 0.04);
  }

  &:after {
    width: 12px;
    height: 12px;
    margin-left: auto;
    border-right: 2px solid ${palette.gray500};
    border-bottom: 2px solid ${palette.gray500};
    transition: transform 0.3s ease;
    transform: rotate(${(props) => (props.isOpen ? "225deg" : "45deg")});
    content: "";
  }
`;

const AccordionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 16px 0;
  border-top: 1px solid ${palette.outlineGray};

  .title {
    display: flex;
    flex-direction: column;
    line-height: 1.5;

    strong {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${palette.gray800};
    }

    p {
      font-size: 0.75rem;
      font-weight: 300;
      color: ${palette.gray700};
    }
  }
`;

const GraphWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
`;

const BgInside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  color: ${palette.gray800};
  line-height: 1.5;
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  strong {
    font-weight: 600;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-weight: 300;
  }
`;

const InterviewFind = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const FindTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;

  h3 {
    font-size: 1.25rem;
    color: ${palette.gray800};
    font-weight: 500;
    line-height: 1.3;
    text-align: left;
  }

  div {
    display: flex;
    align-items: center;
    gap: 12px;

    span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid ${palette.outlineGray};
      background: ${palette.white};
      cursor: pointer;

      &:before {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 2px;
        border-radius: 50%;
        background: ${palette.gray800};
        content: "";
      }

      &.prev {
        transform: rotate(180deg);
      }

      &:after {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 9px;
        height: 9px;
        border-right: 2px solid ${palette.gray800};
        border-top: 2px solid ${palette.gray800};
        content: "";
      }
    }
  }
`;

const FindCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 718px;
  overflow: hidden;
  position: relative;

  > div {
    display: flex;
    gap: 16px;
    transition: transform 0.3s ease-in-out;
    flex-shrink: 0;
  }
`;

const Card = styled.div`
  width: 295px;
  min-width: 295px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  gap: 16px;
  padding: 24px;
  border-radius: 15px;
  background: ${palette.chatGray};
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background: ${palette.outlineGray};
  }

  &:hover {
    img {
      filter: brightness(120%);
    }
  }
`;

const CardIcon = styled.div`
  align-self: flex-end;
  transition: all 0.5s;
`;

const CardBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  line-height: 1.5;
  padding: 4px 12px;
  margin-top: auto;
  border-radius: 14px;
  
  ${props => {
    switch (props.text) {
      case "브랜드 파워":
        return `
          background: #FAD6EC;
          color: #4D2D42;
        `;
      case "마케팅 인사이트":
        return `
          background: #FED6D6;
          color: #513333;
        `;
      case "타겟 세분화":
        return `
          background: #DFD3F5;
          color: #7525FF;
        `;
      case "성공 전략":
        return `
          background: #D3F3DB;
          color: #1F7534;
        `;
      case "고객 경험":
        return `
          background: #FDFCCE;
          color: #212622;
        `;
      case "스케일업":
        return `
          background: #E7EDDF;
          color: #008722;
        `;
      case "BM 전략":
        return `
          background: #D5DDE5;
          color: #2E2E2E;
        `;
      default:
        return `
          background: #D5DDE5;
          color: #2E2E2E;
        `;
    }
  }}
`;

const CardTitle = styled.div`
  font-size: 1.25rem;
  color: ${palette.gray800};
  font-weight: 500;
  line-height: 1.3;
  text-align: left;
  word-wrap: break-word;
`;

const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray700};
  text-align: left;
  animation: slideIn 0.5s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &.closing {
    animation: slideOut 0.5s;
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  strong {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    font-weight: 600;
    color: ${palette.gray800};

    &:after {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10px;
      height: 10px;
      padding: 5px;
      border-right: 2px solid ${palette.gray500};
      border-bottom: 2px solid ${palette.gray500};
      transform: rotate(45deg);
      content: "";
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
    width: ${(props) => props.progress}%;
    height: 100%;
    border-radius: 20px;
    background: ${palette.primary};
    content: "";
  }
`;