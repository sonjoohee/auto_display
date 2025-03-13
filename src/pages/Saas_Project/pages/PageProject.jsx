//프로젝트 인사이트
import React, { useEffect, useState } from "react";
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
  TabWrapType4,
  TabButtonType4,
} from "../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../assets/styles/Images";
import {
  H1,
  Body1,
  Body2,
  Body3,
  Sub1,
  Caption1,
  Sub3,
} from "../../../assets/styles/Typography";
import {
  getProjectListSaasByIdFromIndexedDB,
  updateProjectOnServer,
  getProjectDeleteListOnServer,
} from "../../../utils/indexedDB";
import OrganismProjectItem from "../components/organisms/OrganismProjectItem";
import {
  PROJECT_LIST,
  ACCESS_DASHBOARD,
  PROJECT_ID,
  IS_LOGGED_IN,
} from "../../AtomStates";
import { useDynamicViewport } from "../../../assets/DynamicViewport";

const PageProject = () => {
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const navigate = useNavigate();
  const [accessDashboard, setAccessDashboard] = useAtom(ACCESS_DASHBOARD);

  const [projectList, setProjectList] = useAtom(PROJECT_LIST);
  const [isWarningPopupOpen, setIsWarningPopupOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [deletedProjects, setDeletedProjects] = useState([]);

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const handleWarningClose = () => {
    setIsWarningPopupOpen(false);
    setShowWarning(false);
  };

  // 임시 삭제함 데이터 로드
  useEffect(() => {
    const loadDeletedTools = async () => {
      if (isTrashModalOpen) {
        try {
          const deletedProjectsData = await getProjectDeleteListOnServer(
            0,
            0,
            true
          );
          if (deletedProjectsData.length > 0) {
            setDeletedProjects(deletedProjectsData);
          }
        } catch (error) {
          console.error("삭제된 툴 목록을 불러오는데 실패했습니다:", error);
        }
      }
    };

    loadDeletedTools();
  }, [isTrashModalOpen, refreshTrigger]);
  // 날짜 포맷팅 함수 (년월일시분 표기)
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear().toString().slice(2)}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };
  const handleWarningContinue = async () => {
    if (selectedProject) {
      const updatedProjects = projectList.filter(
        (project) => project._id !== selectedProject._id
      );
      setProjectList(updatedProjects);

      await updateProjectOnServer(
        selectedProject._id,
        {
          deleteState: 1,
        },
        isLoggedIn
      );
    }
    setShowWarning(false);
    setSelectedProject(null);
  };

  // 툴 복구 처리
  const handleRestoreProject = async (projectId) => {
    try {
      await updateProjectOnServer(
        projectId,
        {
          deleteState: 0,
        },
        true
      );

      // 화면에서 제거
      setDeletedProjects((prev) =>
        prev.filter((project) => project._id !== projectId)
      );
      // 스토리지 박스 목록 새로고침 트리거
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("프로젝트 복구에 실패했습니다:", error);
    }
  };

  const handleStart = () => {
    setIsWarningPopupOpen(false);
    navigate("/ProjectCreate");
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 1. Performance API 확인
      // if (performance.navigation && performance.navigation.type === 1) {
      //   console.log("새로고침 감지: Performance API");
      //   navigate("/");
      //   return true;
      // }

      // 2. 현재 URL 확인
      const currentUrl = window.location.href;

      // 현재 URL 저장
      sessionStorage.setItem("lastUrl", currentUrl);
      const lastUrl = sessionStorage.getItem("lastUrl");
    };
    // 함수 실행
    detectRefresh();

    // 컴포넌트 마운트 시 한 번만 실행
  }, [navigate]);

  useEffect(() => {
    setAccessDashboard(false);

    const loadProjectList = async () => {
      try {
        const savedProjectListInfo = await getProjectListSaasByIdFromIndexedDB(
          true
        );

        if (savedProjectListInfo) {
          // saas 타입 프로젝트만 필터링
          const filteredSaasProjects = savedProjectListInfo.filter(
            (project) => {
              return project.projectType === "saas";
            }
          );

          const sortedList = [...filteredSaasProjects]
            .map((project) => ({
              ...project,
              reportList:
                project.reportList?.sort((a, b) => {
                  const dateA = a.timestamp;
                  const dateB = b.timestamp;
                  return dateB - dateA; // 최신 날짜가 위로
                }) || [],
            }))
            .sort((a, b) => {
              const dateA = a.timestamp;
              const dateB = b.timestamp;
              return dateB - dateA; // 최신 날짜가 위로
            });

          setProjectList(sortedList);
        }
      } catch (error) {}
    };
    loadProjectList();
  }, [refreshTrigger]); // refreshTrigger가 변경될 때마다 데이터 다시 로드

  // 샘플 프로젝트 데이터
  const sampleProjects = projectList;

  // 프로젝트 삭제 핸들러 추가
  const handleProjectDelete = (project) => {
    setSelectedProject(project);
    setShowWarning(true);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <ProjectWrap>
            <HeaderWrap>
              <div>
                <H1 color="gray800" align="left">
                  Project
                </H1>
                <div style={{ height: "10px" }}></div>
                <Body3 color="gray700" align="left">
                  AI를 활용한 효율적인 프로젝트 인사이트를 관리하세요
                </Body3>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <Button
                  ExLarge
                  Primary
                  Fill
                  onClick={() => setIsWarningPopupOpen(true)}
                >
                  <Sub1 color="white">새 프로젝트</Sub1>
                </Button>
                <Button Outline onClick={() => setIsTrashModalOpen(true)}>
                  <img src={images.Trash} alt="" />
                  <Caption1 color="gray700">임시 삭제함</Caption1>
                </Button>
              </div>
            </HeaderWrap>

            <ProjectListWrap>
              <ProjectList>
                {sampleProjects.map((project) => (
                  <OrganismProjectItem
                    key={project._id}
                    project={project}
                    onDelete={() => handleProjectDelete(project)}
                  />
                ))}
                <OrganismProjectItem isNoData={true} />
              </ProjectList>
            </ProjectListWrap>
          </ProjectWrap>
        </MainContent>
      </ContentsWrap>
      {showWarning && (
        <PopupWrap
          Warning
          title="정말 삭제하시겠습니까?"
          message="삭제된 항목은 복구가 불가합니다"
          buttonType="Outline"
          closeText="취소"
          confirmText="확인"
          isModal={false}
          onCancel={handleWarningClose}
          onConfirm={handleWarningContinue}
        />
      )}
      {isWarningPopupOpen && (
        <PopupWrap
          Warning
          title="새 프로젝트를 시작 하시겠습니까?"
          message="프로젝트 도중 이탈 시 결과값에 문제가 발생할 수 있습니다."
          buttonType="Outline"
          closeText="취소"
          confirmText="시작"
          isModal={false}
          onCancel={handleWarningClose}
          onConfirm={handleStart}
        />
      )}{" "}
      {isTrashModalOpen && (
        <PopupWrap
          Wide455
          TitleFlex
          title="임시 삭제함 (프로젝트)"
          buttonType="Fill"
          isModal={true}
          onCancel={() => setIsTrashModalOpen(false)}
          body={
            <>
              <div className="deleted-wrap">
                {deletedProjects.length > 0 ? (
                  deletedProjects.map((project) => (
                    <div key={project._id}>
                      <images.GridCircle
                        color={palette.gray700}
                        width={12}
                        height={12}
                      />
                      <div className="content">
                        <Sub3 color="gray800" align="left">
                          {project.projectTitle}
                        </Sub3>
                        <Caption1 color="gray500" align="left">
                          삭제일 : {formatDate(project.timestamp)}
                        </Caption1>
                      </div>
                      <div className="button">
                        <span onClick={() => handleRestoreProject(project._id)}>
                          <img src={images.ArrowReturn} alt="복구" />
                        </span>
                        {/* <span onClick={() => handlePermanentDelete(tool._id)}>
                          <img src={images.Trash} alt="영구삭제" />
                        </span> */}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "20px 0", textAlign: "center" }}>
                    <Caption1 color="gray500">
                      임시 삭제된 항목이 없습니다.
                    </Caption1>
                  </div>
                )}
              </div>

              {/* <div className="delete-info">
                <Caption1 color="primary">
                  휴지통에 15일 이상 보관된 리포트는 자동으로 삭제됩니다.
                </Caption1>
              </div> */}
            </>
          }
        />
      )}
    </>
  );
};

export default PageProject;

const ProjectWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 54px;
  margin: 50px auto;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ProjectListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const BgBoxItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
  padding: ${(props) => (props.NoOutline ? "12px" : "8px 12px")};
  border-radius: 10px;
  border: ${(props) =>
    props.NoOutline ? "0" : `1px solid ${palette.outlineGray}`};
  background: ${(props) => (props.white ? palette.white : palette.chatGray)};
`;
