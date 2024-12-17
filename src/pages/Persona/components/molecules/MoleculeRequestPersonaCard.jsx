import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  PROJECT_ID,
  IS_LOGGED_IN,
  REQUESTED_PERSONA,
} from "../../../AtomStates";
import images from "../../../../assets/styles/Images";
import {
  ContentSection,
  Title,
  CustomizePersona,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import PopupWrap from "../../../../assets/styles/Popup";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";

const MoleculeRequestPersonaCard = ({ persona, personaIndex }) => {
  console.log("🚀 ~ MoleculeRequestPersonaCard ~ persona:", persona);
  const [requestedPersona, setRequestedPersona] = useAtom(REQUESTED_PERSONA);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [selectedPersonaForPopup, setSelectedPersonaForPopup] = useState(null);
  const [activeTab, setActiveTab] = useState("lifestyle");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const loadRequestedPersona = async () => {
      try {
        const currentProject = await getProjectByIdFromIndexedDB(
          projectId,
          isLoggedIn
        );
        setRequestedPersona(currentProject?.requestedPersona || []);
      } catch (error) {
        console.error("요청된 페르소나 데이터 로딩 중 오류 발생:", error);
      }
    };

    loadRequestedPersona();
  }, [projectId, isLoggedIn, setRequestedPersona]);

  const isPersonaRequested = () => {
    return requestedPersona?.some(
      (persona) => persona.personaIndex === personaIndex
    );
  };
  const handleInterviewRequest = async () => {
    setSelectedPersonaForPopup(null);

    try {
      // 현재 서버에 저장된 requestedPersona 값을 가져옴
      const currentProject = await getProjectByIdFromIndexedDB(
        projectId,
        isLoggedIn
      );
      const currentRequestedPersona = currentProject?.requestedPersona || [];

      // 중복 체크
      const isDuplicate = currentRequestedPersona.some(
        (persona) => persona.personaIndex === personaIndex
      );

      if (!isDuplicate) {
        // 새로운 requestedPersona 배열 생성
        const newRequestedPersona = [
          ...currentRequestedPersona,
          {
            personaIndex: personaIndex,
          },
        ];

        // 서버 업데이트
        await updateProjectOnServer(
          projectId,
          {
            requestedPersona: newRequestedPersona,
          },
          isLoggedIn
        );

        // 로컬 상태 업데이트
        setRequestedPersona(newRequestedPersona);
        setShowSuccessPopup(true);
      } else {
        setShowSuccessPopup(true);
        console.log("이미 요청된 페르소나입니다.");
      }
    } catch (error) {
      console.error("페르소나 요청 중 오류 발생:", error);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
  };

  return (
    <>
      <CardPersona>
        <span>
          <img
            src={
              isPersonaRequested() ? images.CheckCircleFill : images.CheckCircle
            }
            alt={isPersonaRequested() ? "요청 완료" : "요청 필요"}
          />
          {isPersonaRequested() ? "요청 완료" : "요청 필요"}
        </span>

        <div>
          <h4>{persona.persona}</h4>
          <p className="keywords">
            {persona.keyword.map((keyword, idx) => (
              <span key={idx}>#{keyword}</span>
            ))}
          </p>
          <div className="content">{persona.lifestyle}</div>
        </div>

        <Button Small Primary onClick={() => setSelectedPersonaForPopup(true)}>
          자세히 보기
          <img src={images.ChevronRightPrimary} alt="" />
        </Button>
      </CardPersona>

      {selectedPersonaForPopup && (
        <InterviewPopup>
          <div>
            <div className="header">
              <h4>
                {persona.persona}
                <span
                  className="close"
                  onClick={() => setSelectedPersonaForPopup(null)}
                />
              </h4>
              <p className="info">
                <span>{persona.gender}</span>
                <span>{persona.age}</span>
                <span>{persona.residence} 거주</span>
              </p>
            </div>

            <p className="keywords">
              {persona.keyword.map((keyword, idx) => (
                <span key={idx}>#{keyword}</span>
              ))}
            </p>

            <div className="content">
              <TabButton>
                <button
                  className={activeTab === "lifestyle" ? "active" : ""}
                  onClick={() => setActiveTab("lifestyle")}
                >
                  라이프스타일
                </button>
                <button
                  className={activeTab === "interests" ? "active" : ""}
                  onClick={() => setActiveTab("interests")}
                >
                  관심사
                </button>
                <button
                  className={activeTab === "consumption" ? "active" : ""}
                  onClick={() => setActiveTab("consumption")}
                >
                  소비성향
                </button>
              </TabButton>

              {activeTab === "lifestyle" && (
                <TabContent>{persona.lifestyle}</TabContent>
              )}
              {activeTab === "interests" && (
                <TabContent>{persona.interest}</TabContent>
              )}
              {activeTab === "consumption" && (
                <TabContent>{persona.consumption_pattern}</TabContent>
              )}
            </div>

            <Button
              Large
              Primary
              style={{ width: "100%", marginTop: "16px" }}
              onClick={handleInterviewRequest}
              disabled={isPersonaRequested()}
            >
              {isPersonaRequested()
                ? "이미 요청한 페르소나입니다"
                : "인터뷰 준비 요청하기"}
            </Button>
          </div>
        </InterviewPopup>
      )}

      {showSuccessPopup && (
        <PopupWrap
          Check
          title={
            <>
              인터뷰 준비 요청이 완료되었습니다.
              <br />
              완료 후 알림을 보내드릴게요
            </>
          }
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={handleSuccessPopupClose}
          show={true}
        />
      )}
    </>
  );
};

export default MoleculeRequestPersonaCard;

const CardPersona = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 0.63rem;
    line-height: 1.2;
    color: ${palette.primary};
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.3;
    color: ${palette.gray700};
    text-align: left;
  }

  .keywords {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4px;
    margin: 8px auto 20px;

    span {
      font-size: 0.75rem;
      line-height: 1.2;
      color: ${palette.gray700};
      line-height: 1.5;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid ${palette.outlineGray};
    }
  }

  .content {
    position: relative;
    height: 110px;
    font-size: 0.75rem;
    line-height: 1.5;
    font-weight: 300;
    color: ${palette.gray500};
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;

    &:before {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        ${palette.white} 80%
      );
      content: "";
    }
  }

  button {
    width: 100%;
  }
`;

const InterviewPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 450px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    padding: 20px;
    border-radius: 15px;
    background: ${palette.white};
    box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.15);
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 4px;
    width: 100%;

    h4 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 1.3;
      color: ${palette.gray800};

      .close {
        position: relative;
        width: 16px;
        height: 16px;
        cursor: pointer;

        &:before,
        &:after {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 16px;
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
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 6px;
      width: 100%;

      span {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 6px;
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.5;
        color: ${palette.gray700};

        + span:before {
          content: "";
          display: inline-block;
          width: 1px;
          height: 9px;
          background: ${palette.gray700};
        }
      }
    }
  }

  .keywords {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: 100%;
    flex-wrap: wrap;

    span {
      font-size: 0.875rem;
      font-weight: 300;
      line-height: 1.5;
      color: ${palette.gray700};
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid ${palette.outlineGray};
    }
  }

  .content {
    width: 100%;
  }
`;

const TabButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  padding: 4px;
  border-radius: 20px;
  background: ${palette.chatGray};

  button {
    width: 100%;
    font-family: "Pretendard", "Poppins";
    font-size: 1rem;
    font-weight: 300;
    color: ${palette.gray500};
    padding: 6px 10px;
    border-radius: 20px;
    border: 0;
    background: transparent;
    transition: all 0.5s;

    &.active {
      font-weight: 400;
      color: ${palette.gray800};
      background: ${palette.white};
    }
  }
`;

const TabContent = styled.div`
  width: 100%;
  max-height: 200px;
  margin-top: 18px;
  overflow-y: auto;
  line-height: 1.5;
  color: ${palette.gray700};
  text-align: left;
`;
