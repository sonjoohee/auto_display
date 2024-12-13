import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { Badge } from "../../../../assets/styles/Badge";
import images from "../../../../assets/styles/Images";

const OrganismProjectCard = ({ project, index }) => {
  const navigate = useNavigate();
  const [openStates, setOpenStates] = useState({});
  const [closingStates, setClosingStates] = useState({});

  //   const toggleView = (projectId) => {
  //     if (openStates[projectId]) {
  //       setClosingStates((prev) => ({ ...prev, [projectId]: true }));
  //       setTimeout(() => {
  //         setOpenStates((prev) => ({ ...prev, [projectId]: false }));
  //         setClosingStates((prev) => ({ ...prev, [projectId]: false }));
  //       }, 280);
  //     } else {
  //       setOpenStates((prev) => ({ ...prev, [projectId]: true }));
  //     }
  //   };
  const toggleView = (projectId) => {
    if (openStates[projectId]) {
      setClosingStates((prev) => ({ ...prev, [projectId]: true }));
      setTimeout(() => {
        setOpenStates((prev) => ({ ...prev, [projectId]: false }));
        setClosingStates((prev) => ({ ...prev, [projectId]: false }));
      }, 280);
    } else {
      setOpenStates((prev) => ({ ...prev, [projectId]: true }));
    }
  };
  const getRecruitStatusText = (project) => {
    const selectedCount = project.personaList?.selected?.length || 0;
    const requestCount = project.requestPersonaList?.persona?.length || 0;

    if (selectedCount === 0 && requestCount === 0) return "대기중";
    if (selectedCount === requestCount) return "모집 완료";
    return "모집 중";
  };

  const getRecruitStatus = (project) => {
    const status = getRecruitStatusText(project);
    if (status === "모집 완료") return "complete";
    if (status === "모집 중") return "ing";
    return "";
  };

  return (
    <>

      <ProjectItem $isOpen={openStates[index]}>
        <ProjectInfo>
          <Name>
            <strong>{project.businessAnalysis.title}</strong>
            <span>
              생성일 - {new Date(project.updateDate).toLocaleDateString()}
            </span>
          </Name>
          <Persona>
            <div>
              <span>기본형</span>
              <p>{project.personaList || 0}명</p>
            </div>
            <div>
              <span>커스터마이즈</span>
              <p>
                {project.customPersonaList?.persona?.length || 0}명
                {project.customPersonaList?.persona?.length > 0 && (
                  <Badge New />
                )}
              </p>
            </div>
          </Persona>
          <Recruit>
            <span>
              {project.requestPersonaList?.persona?.length || 0}개 페르소나
            </span>
            <p className={getRecruitStatus(project)}>
              {getRecruitStatusText(project)}
            </p>
          </Recruit>
          <Report>
            <div>
              <span>Report</span>
              <p>{project.reportList?.length || 0}건</p>
            </div>
            <div>
              <button onClick={() => toggleView(index)}>자세히 보기</button>
            </div>
          </Report>
        </ProjectInfo>

        {openStates[index] && (
          <ProjectButton>
            <p>6명의 맞춤 페르소나가 사용자님을 기다리고 있어요!</p>
            <button onClick={() => navigate(`/Persona/${project._id}`)}>
              바로가기
            </button>
          </ProjectButton>
        )}
      </ProjectItem>
// =======
//     <ProjectItem $isOpen={openStates[index]}>
//       <ProjectInfo>
//         <Name>
//           <strong>{project.businessAnalysis.title}</strong>
//           <span>
//             생성일 - {new Date(project.updateDate).toLocaleDateString()}
//           </span>
//         </Name>
//         <Persona>
//           <div>
//             <span>기본형</span>
//             <p>{project.personaList || 0}명</p>
//           </div>
//           <div>
//             <span>커스터마이즈</span>
//             <p>
//               {project.customPersonaList?.persona?.length || 0}명
//               {project.customPersonaList?.persona?.length > 0 && <Badge New />}
//             </p>
//           </div>
//         </Persona>
//         <Recruit>
//           <span>
//             {project.requestPersonaList?.persona?.length || 0}개 페르소나
//           </span>
//           <p className={getRecruitStatus(project)}>
//             {getRecruitStatusText(project)}
//           </p>
//         </Recruit>
//         <Report>
//           <div>
//             <span>Report</span>
//             <p>{project.projectReportList?.length || 0}건</p>
//           </div>
//           <div>
//             <button onClick={() => toggleView(index)}>자세히 보기</button>
//           </div>
//         </Report>
//       </ProjectInfo>

//       {openStates[index] && (
//         <ProjectButton>
//           <p>
//             <img src={images.PeopleFillPrimary} alt="" />
//             맞춤 페르소나와 인터뷰를 시작해보세요!
//           </p>
//           <button onClick={() => navigate(`/Persona/${project._id}`)}>
//             바로가기
//           </button>
//         </ProjectButton>
//       )}
//     </ProjectItem>
// >>>>>>> main

      {openStates[index] && (
        <ProjectView className={closingStates[index] ? "closing" : ""}>
          {project.reportList && project.reportList.length > 0 ? (
            project.reportList.map((report, reportIndex) => (
              <ViewInfo key={reportIndex}>
                <div className="title">
                  {report.reportTitle}
                  <span>
                    {new Date(report.createDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="info">
                  <div>
                    <span>문항수</span>
                    <p>{report.interviewData || 0}개</p>
                  </div>
                  <div>
                    <span>참여페르소나</span>
                    <p>{report.selectedPersona || 0}명</p>
                  </div>
                </div>
                <div className="button">
                  <button className="view">인터뷰 상세 보기</button>
                  <button className="analysis">결과 분석 보기</button>
                </div>
              </ViewInfo>
            ))
          ) : (
            <ViewInfoNodata>
              <div>
                <img src={images.FileFill} alt="" />
                <div>
// <<<<<<< branch-fixProjectCard
//                   현재 리포트가 비어 있습니다.
//                   <br />
//                   추천 페르소나와 인터뷰를 완료하시면 결과 리포트를 확인할 수
//                   있습니다.
//                   <span>맞춤페르소나와 인터뷰 진행하기</span>
// =======
                  현재 리포트가 비어 있습니다.<br />추천 페르소나와 인터뷰를 완료하시면 결과 리포트를 확인할 수 있습니다.
                  <Button Medium Primary Round>맞춤페르소나와 인터뷰 진행하기</Button>
// >>>>>>> main
                </div>
              </div>
            </ViewInfoNodata>
          )}
        </ProjectView>
      )}
    </>
  );
};

export default OrganismProjectCard;

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
  gap: 12px;
  padding: 12px 24px;
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
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.875rem;
    font-weight: 300;
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
