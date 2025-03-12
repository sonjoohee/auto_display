//대시보드
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { palette } from "../../../assets/styles/Palette";
import OrganismIncNavigation from "../../Global/organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../../Global/molecules/MoleculeHeader";
import MoleculeAccountPopup from "../../Login_Sign/components/molecules/MoleculeAccountPopup";
import PopupWrap from "../../../assets/styles/Popup";
import { Button } from "../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  ProjectTag,
  ListBoxGroup,
  TableHeader,
  TableBody,
} from "../../../assets/styles/BusinessAnalysisStyle";
import { FormBox, CustomTextarea } from "../../../assets/styles/InputStyle";
import images from "../../../assets/styles/Images";
import {
  H1,
  H2,
  H4,
  Body1,
  Body2,
  Body3,
  Sub1,
  Sub2,
  Sub3,
  Caption1,
  InputText,
} from "../../../assets/styles/Typography";
import * as d3 from "d3";
import {
  PROJECT_SAAS,
  PERSONA_LIST_SAAS,
  ACCESS_STATE_SAAS,
  ACCESS_DASHBOARD,
  TOOL_LIST_SAAS,
  DASHBOARD_TOOL_LIST_SAAS,
} from "../../../pages/AtomStates";
import {
  getPersonaListOnServer,
  getToolListOnServerSaas,
} from "../../../utils/indexedDB";
import OrganismDashboardToolList from "../components/organisms/OrganismDashboardToolList";

const PageDashBoard = () => {
  const [projectSaas, setProjectSaas] = useAtom(PROJECT_SAAS);
  const [accessStateSaas, setAccessStateSaas] = useAtom(ACCESS_STATE_SAAS);
  const [accessDashboard, setAccessDashboard] = useAtom(ACCESS_DASHBOARD);
  const project = projectSaas;
  const [showPopup, setShowPopup] = useState(false);

  const [personaListSaas, setPersonaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [toolListSaas, setToolListSaas] = useAtom(DASHBOARD_TOOL_LIST_SAAS);

  const navigate = useNavigate();

  const [showTooltip, setShowTooltip] = useState(false);

  const macroChartRef = useRef();
  const uniqueChartRef = useRef();
  const stakeholderChartRef = useRef();

  useEffect(() => {
    const loadPersonaList = async () => {
      try {
        const savedPersonaListInfo = await getPersonaListOnServer(
          project?._id,
          true
        );

        if (savedPersonaListInfo) {
          const sortedList = [...savedPersonaListInfo].sort((a, b) => {
            const dateA = a.timestamp;
            const dateB = b.timestamp;
            return dateB - dateA; // 최신 날짜가 위로
          });

          setPersonaListSaas(sortedList);
        }
      } catch (error) {}
    };
    loadPersonaList();
  }, []); // refreshTrigger가 변경될 때마다 데이터 다시 로드

  useEffect(() => {
    const loadToolList = async () => {
      try {
        const savedToolListInfo = await getToolListOnServerSaas(
          project?._id,
          5,
          true
        );
        // console.log(
        //   "🚀 ~ loadToolList ~ savedToolListInfo:",
        //   savedToolListInfo
        // );

        if (savedToolListInfo) {
          // const filteredList = savedToolListInfo.filter(
          //   (tool) => !(tool.deleteState >= 1)
          // );
          const sortedList = [...savedToolListInfo].sort((a, b) => {
            const dateA = a.timestamp;
            const dateB = b.timestamp;
            return dateB - dateA; // 최신 날짜가 위로
          });

          setToolListSaas(sortedList);
        }
      } catch (error) {}
    };
    loadToolList();
  }, []); // refreshTrigger가 변경될 때마다 데이터 다시 로드

  const createPieChart = (ref, data) => {
    if (ref.current) {
      // 이전 차트 제거
      d3.select(ref.current).selectAll("*").remove();

      const width = 88;
      const height = 88;
      const radius = Math.min(width, height) / 2;

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const pie = d3
        .pie()
        .value((d) => d.value)
        .sort(null)
        .startAngle(-0.5 * Math.PI)
        .endAngle(1.5 * Math.PI);

      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => d.data.color)
        .attr("stroke", "none");
    }
  };
  const getBusinessColor = (business) => {
    switch (business) {
      case "B2C":
        return "#AF52DE";
      case "B2B":
        return "#5856D6";
      case "B2G":
        return "#007AFF";
      case "B2B2C":
        return "#32ADE6";
      case "B2B2B":
        return "#30B0C7";
      default:
        return "#8E8E93";
    }
  };
  // 페르소나 타입별 상태 카운트 함수 추가
  const countPersonasByTypeAndStatus = (personaList, type) => {
    if (!personaList || !Array.isArray(personaList)) {
      return { total: 0, active: 0, generating: 0, inactive: 0 };
    }

    // 해당 타입의 페르소나만 필터링
    const filteredPersonas = personaList.filter(
      (persona) => persona?.personaType === type
    );

    // 총 개수
    const total = filteredPersonas.length;

    // 활성 페르소나 (status가 complete인 경우)
    const active = filteredPersonas.filter(
      (persona) => persona?.status === "complete"
    ).length;

    // 생성 중인 페르소나 (status가 ing인 경우)
    const generating = filteredPersonas.filter(
      (persona) => persona?.status === "ing" || persona?.status === "request"
    ).length;

    // 비활성 페르소나 (status가 complete나 ing가 아닌 경우)
    const inactive = filteredPersonas.filter(
      (persona) =>
        persona?.status !== "complete" &&
        persona?.status !== "ing" &&
        persona?.status !== "request"
    ).length;

    return { total, active, generating, inactive };
  };

  // 컴포넌트 내부에서 사용
  const macroSegmentStats = countPersonasByTypeAndStatus(
    personaListSaas,
    "macro_segment"
  );
  const uniqueUserStats = countPersonasByTypeAndStatus(
    personaListSaas,
    "unique_user"
  );
  const keyStakeholderStats = countPersonasByTypeAndStatus(
    personaListSaas,
    "key_stakeholder"
  );

  useEffect(() => {
    // 페르소나 데이터가 있을 때만 차트 생성
    if (personaListSaas && personaListSaas.length > 0) {
      // Macro Segment 데이터
      const macroData = [
        {
          label: "비활성 페르소나",
          value: macroSegmentStats.inactive || 0,
          color: palette.outlineGray,
        },
        {
          label: "생성 중",
          value: macroSegmentStats.generating || 0,
          color: "#32ADE6",
        },
        {
          label: "활성 페르소나",
          value: macroSegmentStats.active || 0,
          color: palette.primary,
        },
      ];

      // Unique User 데이터
      const uniqueData = [
        {
          label: "비활성 페르소나",
          value: uniqueUserStats.inactive || 0,
          color: palette.outlineGray,
        },
        {
          label: "생성 중",
          value: uniqueUserStats.generating || 0,
          color: "#32ADE6",
        },
        {
          label: "활성 페르소나",
          value: uniqueUserStats.active || 0,
          color: palette.primary,
        },
      ];

      // Key Stakeholder 데이터
      const stakeholderData = [
        {
          label: "비활성 페르소나",
          value: keyStakeholderStats.inactive || 0,
          color: palette.outlineGray,
        },
        {
          label: "생성 중",
          value: keyStakeholderStats.generating || 0,
          color: "#32ADE6",
        },
        {
          label: "활성 페르소나",
          value: keyStakeholderStats.active || 0,
          color: palette.primary,
        },
      ];

      // 각각의 차트 생성
      createPieChart(macroChartRef, macroData);
      createPieChart(uniqueChartRef, uniqueData);
      createPieChart(stakeholderChartRef, stakeholderData);
    }
  }, [
    personaListSaas,
    macroSegmentStats,
    uniqueUserStats,
    keyStakeholderStats,
  ]);

  // 페르소나 카드 클릭 시 AI 페르소나 페이지의 특정 탭으로 이동하는 함수 추가
  const navigateToAiPersonaTab = (tabName) => {
    setAccessStateSaas(true);
    navigate("/AiPersona", { state: { activeTab: tabName } });
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("dashboard")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          navigate("/");
          return true;
        }

        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }

      return false;
    };

    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = (event) => {
      // 이벤트 취소 (표준에 따라)
      event.preventDefault();
      // Chrome은 returnValue 설정 필요
      event.returnValue = "";

      // 새로고침 시 루트 페이지로 이동
      navigate("/");
    };

    // F5 키 또는 Ctrl+R 감지
    const handleKeyDown = (event) => {
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 키 코드
        event.preventDefault();
        navigate("/");
      }
    };

    // 함수 실행
    detectRefresh();

    // 이벤트 리스너 등록
    // window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  const [selectedValues, setSelectedValues] = useState({
    business: "",
    industry: "",
    country: "",
  });

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <DashBoardWrap>
            <DashBoardItem>
              <div className="title">
                <H1 color="gray800" align="left">
                  Dash Board
                </H1>

                {/* <Button ExLarge Primary Fill>
                  <Sub2 color="white">팀원 초대</Sub2>
                </Button> */}
              </div>

              <Card>
                <CardTitle>
                  <div>
                    <H4 color="gray800" align="left">
                      {project?.projectTitle}
                    </H4>
                    <TagWrap>
                      <ProjectTag Business={project?.businessModel}>
                        <images.ProjectTag
                          color={getBusinessColor(project?.businessModel)}
                        />
                      </ProjectTag>
                      <ProjectTag Type={project?.industryType} />
                      <ProjectTag Country={project?.targetCountry} />
                    </TagWrap>
                  </div>

                  <Button
                    ExLarge
                    PrimaryLightest
                    Fill
                    onClick={() => setShowPopup(true)}
                  >
                    자세히보기
                    <images.ChevronRight
                      width="14px"
                      height="14px"
                      color={palette.primary}
                    />
                  </Button>
                </CardTitle>
                <CardContent>
                  <Body3 color="gray800">
                    {project?.projectAnalysis?.business_analysis}
                  </Body3>
                </CardContent>
              </Card>
            </DashBoardItem>

            <DashBoardItem>
              <div className="title">
                <H2 color="gray800" align="left">
                  Persona Status
                </H2>

                <TooltipButton onClick={() => setShowTooltip(!showTooltip)}>
                  <Sub3 color="gray500">페르소나 유형 알아보기</Sub3>
                  {showTooltip && (
                    <TooltipContent>
                      <TooltipHeader>
                        페르소나 유형 알아보기
                        <span />
                      </TooltipHeader>

                      <TooltipBody>
                        <div>
                          <div className="title start">
                            <Sub3 color="gray500">비활성 페르소나</Sub3>
                          </div>
                          <Sub3 color="gray700" align="left">
                            프로젝트에 따라 추천되었지만, 아직 자신의 경험이나
                            의견을 표현할 수 없는 상태의 페르소나
                          </Sub3>
                        </div>

                        <div>
                          <div className="title ing">
                            <Sub3 color="gray500">생성 중</Sub3>
                          </div>
                          <Sub3 color="gray700" align="left">
                            생성 요청이 접수되어, 의견을 표현할 수 있도록 생성
                            중인 상태의 페르소나
                          </Sub3>
                        </div>

                        <div>
                          <div className="title complete">
                            <Sub3 color="gray500">활성 페르소나</Sub3>
                          </div>
                          <Sub3 color="gray700" align="left">
                            생성이 완료되어 자신의 경험과 의견을 자유롭게 표현할
                            수 있는 상태의 페르소나
                          </Sub3>
                        </div>
                      </TooltipBody>
                    </TooltipContent>
                  )}
                </TooltipButton>
              </div>

              {personaListSaas?.length > 0 ? (
                <PersonaStatusWrap>
                  <div
                    onClick={() => navigateToAiPersonaTab("macro_segment")}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="title">
                      <Body1 color="gray700" align="left">
                        Macro Segment
                        <br />
                        추천 페르소나
                      </Body1>
                      <Body1 color="gray700" align="right">
                        총 {macroSegmentStats.total}명
                      </Body1>
                    </div>
                    <div className="content">
                      <div ref={macroChartRef}></div>
                      <UlInfo>
                        <li className="start">
                          <Sub3 color="gray500">비활성 페르소나</Sub3>
                          <Sub2 color="gray700">
                            {macroSegmentStats.inactive}명
                          </Sub2>
                        </li>
                        <li className="ing">
                          <Sub3 color="gray500">생성 중</Sub3>
                          <Sub2 color="gray700">
                            {macroSegmentStats.generating}명
                          </Sub2>
                        </li>
                        <li className="complete">
                          <Sub3 color="gray500">활성 페르소나</Sub3>
                          <Sub2 color="gray700">
                            {macroSegmentStats.active}명
                          </Sub2>
                        </li>
                      </UlInfo>
                    </div>
                  </div>

                  <div
                    onClick={() => navigateToAiPersonaTab("unique_user")}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="title">
                      <Body1 color="gray700" align="left">
                        Unique User
                        <br />
                        추천 페르소나
                      </Body1>
                      <Body1 color="gray700" align="right">
                        총 {uniqueUserStats.total}명
                      </Body1>
                    </div>
                    <div className="content">
                      <div ref={uniqueChartRef}></div>
                      <UlInfo>
                        <li className="start">
                          <Sub3 color="gray500">비활성 페르소나</Sub3>
                          <Sub2 color="gray700">
                            {uniqueUserStats.inactive}명
                          </Sub2>
                        </li>
                        <li className="ing">
                          <Sub3 color="gray500">생성 중</Sub3>
                          <Sub2 color="gray700">
                            {uniqueUserStats.generating}명
                          </Sub2>
                        </li>
                        <li className="complete">
                          <Sub3 color="gray500">활성 페르소나</Sub3>
                          <Sub2 color="gray700">
                            {uniqueUserStats.active}명
                          </Sub2>
                        </li>
                      </UlInfo>
                    </div>
                  </div>

                  <div
                    onClick={() => navigateToAiPersonaTab("key_stakeholder")}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="title">
                      <Body1 color="gray700" align="left">
                        Key Stakeholder
                        <br />
                        추천 페르소나
                      </Body1>
                      <Body1 color="gray700" align="right">
                        총 {keyStakeholderStats.total}명
                      </Body1>
                    </div>
                    <div className="content">
                      <div ref={stakeholderChartRef}></div>
                      <UlInfo>
                        <li className="start">
                          <Sub3 color="gray500">비활성 페르소나</Sub3>
                          <Sub2 color="gray700">
                            {keyStakeholderStats.inactive}명
                          </Sub2>
                        </li>
                        <li className="ing">
                          <Sub3 color="gray500">생성 중</Sub3>
                          <Sub2 color="gray700">
                            {keyStakeholderStats.generating}명
                          </Sub2>
                        </li>
                        <li className="complete">
                          <Sub3 color="gray500">활성 페르소나</Sub3>
                          <Sub2 color="gray700">
                            {keyStakeholderStats.active}명
                          </Sub2>
                        </li>
                      </UlInfo>
                    </div>
                  </div>
                </PersonaStatusWrap>
              ) : (
                <PersonaStatusWrap
                  NoData
                  onClick={() => navigate("/AiPersona")}
                >
                  <div>
                    <img src={images.PeopleFillPrimary2} alt="" />
                    <Body2 color="gray500">
                      당신의 프로젝트에 딱 맞는 AI Persona를 지금 확인해보세요
                    </Body2>
                    <Button
                      Medium
                      Outline
                      Fill
                      onClick={() => navigate("/AiPersona")}
                    >
                      <Caption1 color="gray700">AI Persona 확인하기</Caption1>
                    </Button>
                  </div>
                </PersonaStatusWrap>
              )}
            </DashBoardItem>

            <DashBoardItem>
              <div className="title">
                <H2 color="gray800" align="left">
                  Recent Tool Activities
                </H2>
                <Body3
                  color="gray700"
                  align="right"
                  style={{ marginLeft: "auto" }}
                >
                  최근 작업한 항목 중 5개를 보여드립니다.
                </Body3>
              </div>

              <OrganismDashboardToolList toolListSaas={toolListSaas} />
            </DashBoardItem>
          </DashBoardWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <PopupWrap
          Wide1000
          TitleFlex
          title={`${project?.projectTitle} 상세 정보`}
          buttonType="Fill"
          isModal={true}
          onCancel={() => setShowPopup(false)}
          // onClose={() => setShowPopup(false)}
          body={
            <div style={{ gap: "40px" }}>
              <SummaryWrap>
                <Body1 color="gray700" align="left">
                  프로젝트 정보
                </Body1>
                <ListBoxGroup Small>
                  <li>
                    <Body2 color="gray500">사업모델</Body2>
                    <Body2 color="gray800">{project?.businessModel}</Body2>
                  </li>
                  <li>
                    <Body2 color="gray500">업종</Body2>
                    <Body2 color="gray800">{project?.industryType}</Body2>
                  </li>
                  <li>
                    <Body2 color="gray500">타겟 국가</Body2>
                    <Body2 color="gray800">{project?.targetCountry}</Body2>
                  </li>
                  <li>
                    <Body2 color="gray500">업로드 파일</Body2>
                    <Body2 color="gray800">
                      {project?.files?.length > 0
                        ? project.files.map((file) => (
                            <div key={file.id}>{file.name}</div>
                          ))
                        : "-"}
                    </Body2>
                    {/* <Button Large Outline Fill style={{ marginLeft: "auto" }}>파일보기</Button> */}
                  </li>
                </ListBoxGroup>
              </SummaryWrap>

              <SummaryWrap>
                <Body1 color="gray700" align="left">
                  프로젝트 개요
                </Body1>
                <ListBoxGroup>
                  <Body2 color="gray800" align="left">
                    {/* {project?.projectAnalysis?.business_analysis} */}
                    {project?.projectAnalysis?.business_analysis}
                    {project?.projectAnalysis?.business_analysis &&
                    project?.projectAnalysis?.file_analysis
                      ? "\n"
                      : ""}
                    {project?.projectAnalysis?.file_analysis}
                  </Body2>
                </ListBoxGroup>
              </SummaryWrap>

              <SummaryWrap>
                <Body1 color="gray700" align="left">
                  주요 타겟 고객군
                </Body1>
                <ListBoxGroup>
                  <Body2 color="gray800" align="left">
                    {project?.projectAnalysis?.target_customer}
                  </Body2>
                </ListBoxGroup>
              </SummaryWrap>
            </div>
          }
        />
      )}
    </>
  );
};

export default PageDashBoard;

const SummaryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const DashBoardWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin: 50px auto;
`;

const DashBoardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .title {
    display: flex;
    align-items: center;
    gap: 12px;

    button {
      margin-left: auto;
    }
  }
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

const CardTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const CardContent = styled.div`
  color: ${palette.gray800};
  text-align: left;

  p + p {
    margin-top: 20px;
  }
`;

const TooltipButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${palette.chatGray};
  cursor: pointer;
  z-index: 1;

  &:before {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 0.63rem;
    color: ${palette.gray500};
    border: 1px solid ${palette.gray500};
    content: "!";
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
  z-index: 100;

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

  .title {
    display: flex;
    align-items: center;
    gap: 12px;

    &:before {
      width: 5px;
      height: 18px;
      border-radius: 1px;
      content: "";
    }

    &.start:before {
      background: ${palette.outlineGray};
    }

    &.ing:before {
      background: #32ade6;
    }

    &.complete:before {
      background: ${palette.primary};
    }
  }

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const PersonaStatusWrap = styled.div`
  display: flex;
  gap: 24px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: ${palette.primary};
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  ${(props) =>
    props.NoData &&
    `
    > div {
      align-items: center;
      gap: 8px;
      padding: 44px 24px;

      button {
        margin-top: 4px;
      }
    }
  `}
`;

const RecentToolWrap = styled(PersonaStatusWrap)`
  ${(props) =>
    props.NoData &&
    `
    > div {
      padding: 130px 0 155px;
    }
  `}
`;

const UlInfo = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  li {
    display: flex;
    align-items: center;
    gap: 12px;

    div:last-child {
      margin-left: auto;
    }

    + li {
      padding-top: 6px;
      border-top: 1px solid ${palette.outlineGray};
    }

    &:before {
      width: 5px;
      height: 18px;
      border-radius: 1px;
      content: "";
    }

    &.start:before {
      background: ${palette.outlineGray};
    }

    &.ing:before {
      background: #32ade6;
    }

    &.complete:before {
      background: ${palette.primary};
    }
  }
`;
