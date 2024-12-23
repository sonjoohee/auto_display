import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../molecules/MoleculeHeader";
import { Button } from "../../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { Badge } from "../../../../assets/styles/Badge";
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
        <MainContent>
          <MyProjectWrap>
            <Title>프로젝트 리스트</Title>
            {projectList.length === 0 ? (
              <OrganismEmptyProject />
            ) : (
              <ProjectList>
                <ProjectHeader>
                  <div>프로젝트 명</div>
                  <div>맞춤 페르소나</div>
                  <div>페르소나 모집</div>
                  <div>결과 리포트</div>
                </ProjectHeader>
                <ProjectContent>
                  {/* 진행중인 프로젝트 없을때 디자인 */}
                  {/* <ProjectItem Nodata>
                    <img src={images.FileFill} alt="" />
                    <div>
                      <p>아직 진행 중인 프로젝트가 없습니다.<br />지금 바로 새 프로젝트를 만들어보세요</p>
                      <Button Medium Primary Round>새 프로젝트 시작하기</Button>
                    </div>
                  </ProjectItem> */}

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
          </MyProjectWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageMyProject;

const MyProjectWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 50px auto;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 500;
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

  > div {
    flex-grow: 1;
    font-weight: 300;
    color: ${palette.gray500};
    text-align: left;
  }

  > div:nth-child(1) {
    max-width: 475px;
    width: 100%;
  }

  > div:nth-child(2) {
    max-width: 220px;
    width: 100%;
  }

  > div:nth-child(3) {
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
