import React from "react";
import { useAtom } from "jotai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { Body1, Body2, Body3 } from "../../../../assets/styles/Typography";
import { PROJECT_ID } from "../../../../pages/AtomStates";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";

const OrganismProjectItem = ({ project, onClick, isNoData }) => {
  const navigate = useNavigate();
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const handleClick = async () => {
    if (onClick) {
      onClick();
    } else if (isNoData) {
      navigate("/ProjectCreate");
    } else {
      setProjectId(project.id);
      // 프로젝트 데이터를 state로 전달하여 DashBoard 페이지로 이동
      navigate("/DashBoard", { state: { project: project } });
    }
  };

  return (
    <ProjectItem
      NoData={isNoData}
      onClick={handleClick}
      className="project-item"
    >
      {!isNoData ? (
        <>
          <div className="thumbnail">
            <img src={project?.thumbnail || images.ProjectThumbnail01} alt="" />
          </div>
          <div className="content">
            <div className="info">
              <Body1 color="gray800" align="left">
                {project?.projectTitle || "전기차 충전소 안내 서비스"}
              </Body1>
              <Body3 color="gray700" align="left" className="description">
                {project?.projectDescription ||
                  "프로젝트에 대한 개요적인 부분을 설명하는 문장을 넣는 공간입니다."}
              </Body3>
            </div>
            <div className="date">
              <Body3 color="gray700" align="left">
                마지막 업데이트 : {project?.updateDate || project?.createDate}
              </Body3>
            </div>
          </div>
        </>
      ) : (
        <div className="noData">
          <img src={images.PlusSquareWhite} alt="새 작업" />
          <Body2 color="primary">새 프로젝트를 시작하세요</Body2>
        </div>
      )}
    </ProjectItem>
  );
};

export default OrganismProjectItem;

const ProjectItem = styled.div`
  max-width: 32.2%;
  max-height: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  overflow: hidden;
  border-radius: 20px;
  background: ${palette.chatGray};
  cursor: pointer;
  height: ${(props) => (props.NoData ? "100%" : "auto")};
  min-height: ${(props) => (props.NoData ? "300px" : "auto")};

  .thumbnail {
    width: 100%;
    max-height: 200px;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    width: 100%;
    padding: 20px 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .info {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .description {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .date {
      padding-top: 16px;
      border-top: 1px solid ${palette.outlineGray};
    }
  }

  .noData {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
`;
