//작업관리/ 프로젝트 리스트 
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../molecules/MoleculeHeader";
import { ButtonGroup, Button, IconButton } from "../../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  Badge,
  DashboardCard,
  DashboardAmount,
  TabWrapType3,
  TabButtonType3,
  ToggleBox,
  ToggleList,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { useNavigate } from "react-router-dom";
import {
  IS_LOGGED_IN,
  PROJECT_REPORT_LIST,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  PROJECT_LIST,
  REPORT_LIST,
  PERSONA_LIST,
  SELECTED_PERSONA_LIST,
  CUSTOMIZE_PERSONA_LIST,
  REQUEST_PERSONA_LIST,
  INTERVIEW_QUESTION_LIST,
  SELECTED_INTERVIEW_PURPOSE,
  CATEGORY_COLOR,
  PROJECT_LOAD_BUTTON_STATE,
  REPORT_LOAD_BUTTON_STATE,
  REPORT_DESCRIPTION_LOAD_BUTTON_STATE,
  INTERVIEW_DATA,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL,
  IS_EDIT_MODE,
  IS_SHOW_TOAST,
  IS_PERSONA_ACCESSIBLE,
  PROJECT_LOADING,
  PROJECT_REFRESH_TRIGGER,
} from "../../../AtomStates";
import OrganismProjectCard from "../organisms/OrganismProjectCard";
import { getProjectListByIdFromIndexedDB } from "../../../../utils/indexedDB";
import OrganismEmptyProject from "../organisms/OrganismEmptyProject";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { H2, H3, H5, Body2, Body3, Sub3, Caption2 } from "../../../../assets/styles/Typography";

const PageMyProject = () => {
  useDynamicViewport("width=1280");

  const [projectLoading, setProjectLoading] = useAtom(PROJECT_LOADING);
  const [refreshTrigger, setRefreshTrigger] = useAtom(PROJECT_REFRESH_TRIGGER);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [reportList, setReportList] = useAtom(REPORT_LIST);
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [selectedPersonaList, setSelectedPersonaList] = useAtom(
    SELECTED_PERSONA_LIST
  );
  const [customizePersonaList, setCustomizePersonaList] = useAtom(
    CUSTOMIZE_PERSONA_LIST
  );
  const [requestPersonaList, setRequestPersonaList] =
    useAtom(REQUEST_PERSONA_LIST);
  const [interviewQuestionList, setInterviewQuestionList] = useAtom(
    INTERVIEW_QUESTION_LIST
  );
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [categoryColor, setCategoryColor] = useAtom(CATEGORY_COLOR);
  const [reportLoadButtonState, setReportLoadButtonState] = useAtom(
    REPORT_LOAD_BUTTON_STATE
  );
  const [
    reportDescriptionLoadButtonState,
    setReportDescriptionLoadButtonState,
  ] = useAtom(REPORT_DESCRIPTION_LOAD_BUTTON_STATE);
  const [interviewData, setInterviewData] = useAtom(INTERVIEW_DATA);
  const [interviewReport, setInterviewReport] = useAtom(INTERVIEW_REPORT);
  const [interviewReportAdditional, setInterviewReportAdditional] = useAtom(
    INTERVIEW_REPORT_ADDITIONAL
  );
  const [isEditMode, setIsEditMode] = useAtom(IS_EDIT_MODE);
  const [isShowToast, setIsShowToast] = useAtom(IS_SHOW_TOAST);
  const navigate = useNavigate();
  const [openStates, setOpenStates] = useState({});
  const [closingStates, setClosingStates] = useState({});
  const [projectLoadButtonState, setProjectLoadButtonState] = useState(true);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [projectReportId, setProjectReportId] = useAtom(PROJECT_REPORT_ID);
  const [projectList, setProjectList] = useAtom(PROJECT_LIST);
  const [projectReportList, setProjectReportList] =
    useAtom(PROJECT_REPORT_LIST);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [activeTab, setActiveTab] = useState('project');
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeServiceMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsServiceMenuOpen(false);
      setIsClosing(false);
    }, 300); // 애니메이션 시간과 동일하게 설정
  };

  const toggleView = (projectId) => {
    if (openStates[projectId]) {
      // 닫을 때
      setClosingStates((prev) => ({ ...prev, [projectId]: true }));
      setTimeout(() => {
        setOpenStates((prev) => ({ ...prev, [projectId]: false }));
        setClosingStates((prev) => ({ ...prev, [projectId]: false }));
      }, 280); // 애니메이션 시간보다 살짝 짧게
    } else {
      // 열 때
      setOpenStates((prev) => ({ ...prev, [projectId]: true }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // 브라우저 뒤로가기 감지 및 상태 초기화
    const handlePopState = () => {
      // 필요한 상태들 초기화
      setProjectList([]);
      setReportList([]);
      setPersonaList([]);
      setSelectedPersonaList([]);
      setCustomizePersonaList([]);
      setRequestPersonaList([]);
      setInterviewQuestionList([]);
      setSelectedInterviewPurpose("");
      setCategoryColor("");
      setIsEditMode(false);
      setIsShowToast(false);

      // 필요한 경우 특정 페이지로 리다이렉트
      navigate("/");
    };

    window.addEventListener("popstate", handlePopState);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
  // useEffect(() => {
  //   const loadProjectList = async () => {
  //     const savedProjectListInfo = await getProjectListByIdFromIndexedDB(true);
  //     if (savedProjectListInfo) {
  //       const sortedList = [...savedProjectListInfo]
  //         .map((project) => ({
  //           ...project,
  //           reportList:
  //             project.reportList?.sort(
  //               (a, b) => new Date(b.createDate) - new Date(a.createDate)
  //             ) || [],
  //         }))
  //         .sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate));
  //       setProjectList(sortedList);
  //     }
  //     setProjectLoadButtonState(false);
  //   };
  //   loadProjectList();
  // }, []);
  useEffect(() => {
    const loadProjectList = async () => {
      try {
        setProjectLoading({
          isLoading: true,
          lastLoadTime: new Date(),
          error: null,
        });

        const savedProjectListInfo = await getProjectListByIdFromIndexedDB(
          true
        );
        if (savedProjectListInfo) {
          const parseKoreanDate = (dateStr) => {
            const [date, time] = dateStr.split("오");
            const [year, month, day] = date.split(".").map((s) => s.trim());
            const [hour, minute, second] = time.includes("전")
              ? time.trim().replace("전", "").split(":")
              : time.trim().replace("후", "").split(":");

            const adjustedHour = time.includes("오후")
              ? Number(hour) + 12
              : Number(hour);

            return new Date(year, month - 1, day, adjustedHour, minute, second);
          };

          const sortedList = [...savedProjectListInfo]
            .map((project) => ({
              ...project,
              reportList:
                project.reportList?.sort((a, b) => {
                  const dateA = parseKoreanDate(a.createDate);
                  const dateB = parseKoreanDate(b.createDate);
                  return dateB - dateA; // 최신 날짜가 위로
                }) || [],
            }))
            .sort((a, b) => {
              const dateA = parseKoreanDate(a.updateDate);
              const dateB = parseKoreanDate(b.updateDate);
              return dateB - dateA; // 최신 날짜가 위로
            });
          setProjectList(sortedList);
        }

        setProjectLoading({
          isLoading: false,
          lastLoadTime: new Date(),
          error: null,
        });
      } catch (error) {
        setProjectLoading({
          isLoading: false,
          lastLoadTime: new Date(),
          error: error.message,
        });
        console.error("프로젝트 목록을 불러오는데 실패했습니다:", error);
      }
    };

    loadProjectList();
  }, [refreshTrigger]); // refreshTrigger가 변경될 때마다 데이터 다시 로드
  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide>
          <MyProjectWrap>
            <MyDashboard>
              <MyDashboardHeader>
                <MyDashboardTitle>
                  <H2>이혜은님</H2>
                  <Badge classBasic>Basic</Badge>
                </MyDashboardTitle>

                <ButtonGroup>
                  <Button 
                    Primary
                    onClick={() => navigate('/Payment')}
                  >
                    <img src={images.CalendarCheck} alt="구독 플랜 관리" />
                    <Sub3 color="primary">구독 플랜 관리</Sub3>
                  </Button>
                  <div style={{ position: 'relative' }}>
                    <Button 
                      Primary 
                      onClick={() => {
                        if (isServiceMenuOpen) {
                          closeServiceMenu();
                        } else {
                          setIsServiceMenuOpen(true);
                        }
                      }}
                    >
                      <img src={images.Headset} alt="고객 서비스" />
                      <Sub3 color="primary">고객 서비스</Sub3>
                    </Button>
                    
                    {(isServiceMenuOpen || isClosing) && (
                      <ToggleBox $isClosing={isClosing}>
                        <Body3>고객 서비스</Body3>
                        <ToggleList>
                          <IconButton>
                            <img src={images.QuestionCircle} alt="고객 서비스" />
                            <Sub3 color="gray700">문의사항</Sub3>
                          </IconButton>
                          <IconButton>
                            <img src={images.ExclamationCircle} alt="이용약관" />
                            <Sub3 color="gray700">이용약관</Sub3>
                          </IconButton>
                          <IconButton>
                            <img src={images.Lock} alt="개인정보 이용 정책" />
                            <Sub3 color="gray700">개인정보 이용 정책</Sub3>
                          </IconButton>
                        </ToggleList>
                      </ToggleBox>
                    )}
                  </div>
                </ButtonGroup>
              </MyDashboardHeader>

              <MyDashboardContent>
                <DashboardCard>
                  <Body2 color="gray500">
                    요청 페르소나
                  </Body2>
                  <DashboardAmount>
                    <H3 color="gray800">3건</H3>
                    <Badge New>new</Badge>
                  </DashboardAmount>
                </DashboardCard>
                <DashboardCard>
                  <Body2 color="gray500">
                    완료 페르소나
                  </Body2>
                  <DashboardAmount>
                    <H3 color="gray800">1건</H3>
                    <Badge New>new</Badge>
                  </DashboardAmount>
                </DashboardCard>
                <DashboardCard>
                  <Body2 color="gray500">
                    인터뷰 진행 건(수)
                  </Body2>
                  <DashboardAmount>
                    <H3 color="gray800">0건</H3>
                  </DashboardAmount>
                </DashboardCard>
                <DashboardCard>
                  <Body2 color="gray500">
                    당월 요금제
                  </Body2>
                  <DashboardAmount>
                    <H3 color="gray800">Pro Plan</H3>
                  </DashboardAmount>
                </DashboardCard>
              </MyDashboardContent>
            </MyDashboard>
            
            {/* <Title>프로젝트 리스트</Title> */}
            {projectList.length === 0 ? (
              <OrganismEmptyProject />
            ) : (
              <>
                <MyProjectList>
                  <TabWrapType3>
                    <TabButtonType3 
                      isActive={activeTab === 'project'}
                      onClick={() => setActiveTab('project')}
                    >
                      프로젝트 리스트 ({projectList.length})
                    </TabButtonType3>
                    <TabButtonType3 
                      isActive={activeTab === 'persona'}
                      onClick={() => setActiveTab('persona')}
                    >
                      페르소나 리스트
                    </TabButtonType3>
                  </TabWrapType3>

                  {activeTab === 'project' && (
                    /* 프로젝트 리스트 */
                    <ProjectList>
                      <ProjectHeader>
                        <Body3 color="gray500">프로젝트 명</Body3>
                        <Body3 color="gray500">맞춤 페르소나</Body3>
                        <Body3 color="gray500">페르소나 모집</Body3>
                        <Body3 color="gray500">결과 리포트</Body3>
                      </ProjectHeader>
                      <ProjectContent>
                        {projectList.map((project, index) => (
                          <OrganismProjectCard
                            key={index} 
                            project={project}
                            index={index} 
                          />
                        ))}
                      </ProjectContent>
                    </ProjectList>
                  )}

                  {activeTab === 'persona' && (
                    /* 페르소나 리스트 */
                    <ProjectList>
                      <ProjectHeader>
                        <Body3 color="gray500">페르소나 명</Body3>
                        <Body3 color="gray500">요청일</Body3>
                        <Body3 color="gray500">생성 완료일</Body3>
                      </ProjectHeader>
                      <ProjectContent>
                        <ProjectItem>
                          <ProjectInfo>
                            <Name>
                              <Caption2 color="gray500">홈리빙 플랫폼 서비스</Caption2>
                              <Body2 color="gray800">가족과 함께 여가를 보내는 활동 지향형 소비자</Body2>
                            </Name>
                            <Persona>
                              <Sub3 color="gray500">2024. 10. 26</Sub3>
                            </Persona>
                            <Report>
                              <Badge Keyword>In Process</Badge>
                              <Button Small Outline Fill>
                                자세히
                              </Button>
                            </Report>
                          </ProjectInfo>
                        </ProjectItem>
                        <ProjectItem>
                          <ProjectInfo>
                            <Name>
                              <Caption2 color="gray500">홈리빙 플랫폼 서비스</Caption2>
                              <Body2 color="gray800">가족과 함께 여가를 보내는 활동 지향형 소비자</Body2>
                            </Name>
                            <Persona>
                              <Sub3 color="gray500">2024. 10. 26</Sub3>
                            </Persona>
                            <Report>
                              <Sub3 color="gray500">2024. 10. 26</Sub3>
                              <Button Small Outline Fill>
                                자세히
                              </Button>
                            </Report>
                          </ProjectInfo>
                        </ProjectItem>
                      </ProjectContent>
                    </ProjectList>
                  )}
                </MyProjectList>
              </>
            )}
          </MyProjectWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageMyProject;

const MyDashboard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const MyDashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MyDashboardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const MyDashboardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MyProjectWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin: 50px auto;
`;

const MyProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled(H5)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: ${palette.gray800};
  padding-bottom: 20px;
  border-bottom: 1px solid ${palette.outlineGray};
`;

const ProjectList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > p {
    flex-grow: 1;
    text-align: left;
  }

  > p:nth-child(1) {
    max-width: 475px;
    width: 100%;
  }

  > p:nth-child(2) {
    max-width: 220px;
    width: 100%;
  }

  > p:nth-child(3) {
    max-width: 150px;
    width: 100%;
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // gap: 12px;
  gap: ${(props) => (props.Nodata ? "16px" : "12px")};
  // padding: 12px 24px;
  padding: ${(props) => (props.Nodata ? "52px 24px 40px" : "12px 24px")};
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.white};
  z-index: 1;
  transition: box-shadow 0.3s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen &&
    `
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
  `}

  ${(props) =>
    props.Nodata &&
    css`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        p {
          color: ${palette.gray500};
          line-height: 1.5;
        }
      }
    `}
`;

const ProjectInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 440px;
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${palette.gray500};
  }
`;

const Persona = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  max-width: 230px;
  width: 100%;
  padding: 8px;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px 24px;
    flex: 1;
    text-align: left;

    + div:before {
      position: absolute;
      top: 50%;
      left: -12px;
      transform: translateY(-50%);
      width: 1px;
      height: 19px;
      background-color: ${palette.outlineGray};
      content: "";
    }

    span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.gray300};
    }

    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-size: 0.875rem;
      color: ${palette.gray700};
    }
  }
`;

const Recruit = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 155px;
  width: 100%;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray300};
  }

  p {
    font-size: 0.875rem;
    color: ${palette.gray700};

    &.ing {
      color: ${palette.primary};
    }

    &.complete {
      color: ${palette.green};
    }
  }
`;

const Report = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray300};
  }

  p {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.875rem;
    color: ${palette.gray700};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-family: "Pretendard", poppins;
    font-size: 0.75rem;
    font-weight: 400;
    color: ${palette.gray500};
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid ${palette.outlineGray};
    background-color: ${palette.chatGray};
  }
`;

const ProjectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid ${palette.outlineGray};

  p {
    font-size: 0.875rem;
    color: ${palette.gray800};
  }

  button {
    font-family: "Pretendard", poppins;
    font-size: 0.75rem;
    color: ${palette.white};
    padding: 6px 10px;
    border-radius: 4px;
    border: none;
    background-color: ${palette.primary};
  }
`;

const ProjectView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 28px 20px 20px;
  margin-top: -20px;
  border-radius: 0 0 10px 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.chatGray};
  animation: slideDown 0.3s ease-in-out;
  transform-origin: top;
  opacity: 1;

  &.closing {
    animation: slideUp 0.3s ease-in-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

const ViewInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: $space-between;
  gap: 4px;
  width: 100%;
  font-size: 0.875rem;
  color: ${palette.gray800};

  + div {
    padding-top: 16px;
    border-top: 1px solid ${palette.outlineGray};
  }

  .title {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 8px;
    font-size: 0.875rem;
    color: ${palette.black};

    span {
      font-size: 0.75rem;
      font-weight: 300;
      color: ${palette.gray500};
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 7px;
      font-size: 0.875rem;
      font-weight: 300;
      color: ${palette.gray500};
      line-height: 1.5;

      + div:before {
        position: absolute;
        top: 50%;
        left: -16px;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background-color: ${palette.outlineGray};
        content: "";
      }
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    button {
      font-family: "Pretendard", poppins;
      font-size: 0.75rem;
      font-weight: 300;
      padding: 6px 10px;
      border-radius: 6px;

      &.view {
        color: ${palette.black};
        border: 1px solid ${palette.outlineGray};
        background: ${palette.chatGray};
      }

      &.analysis {
        color: ${palette.primary};
        border: 1px solid ${palette.primary};
        background: #e9f1ff;
      }
    }
  }
`;

const ViewInfoNodata = styled(ViewInfo)`
  justify-content: center;
  padding: 24px 0 16px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      line-height: 1.5;
      color: ${palette.gray500};

      span {
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.5;
        color: ${palette.primary};
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid ${palette.primary};
        background-color: #e9f1ff;
        cursor: pointer;
      }
    }
  }
`;
