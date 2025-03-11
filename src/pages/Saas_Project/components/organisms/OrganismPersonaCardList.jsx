import React, { useState, useEffect } from "react";
import { Body1, Sub3 } from "../../../../assets/styles/Typography";
import {
  AiPersonaCardGroupWrap,
  AiPersonaCardListItem,
  AiPersonaCardButtonWrap,
  UniqueTag,
  BoxWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { Body2 } from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  updatePersonaOnServer,
  getPersonaListOnServer,
  UserCreditCheck,
  UserCreditInfo,
  UserCreditUse,
  createRequestPersonaOnServer,
  getProjectByIdFromIndexedDB,
} from "../../../../utils/indexedDB";
import {
  PROJECT_ID,
  IS_LOGGED_IN,
  BUSINESS_ANALYSIS,
  USER_CREDITS,
  CREDIT_REQUEST_BUSINESS_PERSONA,
} from "../../../../pages/AtomStates";
import PopupWrap from "../../../../assets/styles/Popup.jsx";

const OrganismPersonaCardList = ({
  personaData = [],
  setIsStarred = () => {},
  setShowPopup = () => {},
  activeTab = "macro_segment", // 기본 탭은 macro_segment로 설정
  setPersonaStats = () => {}, // 페르소나 통계 정보를 부모 컴포넌트에 전달하는 함수
}) => {
  // 활성화된 탭에 따라 필터링된 페르소나 데이터
  const [filteredPersonaData, setFilteredPersonaData] = useState([]);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const eventState = true; // Set this based on your logic
  const trialState = false; // Set this based on your logic
  const eventTitle = "이벤트 제목"; // Replace with actual event title
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [creditRequestBusinessPersona] = useAtom(
    CREDIT_REQUEST_BUSINESS_PERSONA
  );
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [selectedPersona, setSelectedPersona] = useState(null); // selectedPersona 상태 추가
  const [showCreditPopup, setShowCreditPopup] = useState(false);

  // 탭이 변경될 때마다 데이터 필터링 및 통계 계산
  useEffect(() => {
    if (!personaData || personaData.length === 0) {
      setFilteredPersonaData([]);
      setPersonaStats({ active: 0, inactive: 0, generating: 0 });
      return;
    }

    let filtered = [];

    // 'my_persona' 탭인 경우 favorite이 true인 항목만 표시
    if (activeTab === "my_persona") {
      filtered = personaData.filter((persona) => persona?.favorite === true);
    } else {
      // 선택된 탭에 맞는 personaType을 가진 데이터만 필터링
      filtered = personaData.filter(
        (persona) => persona?.personaType === activeTab
      );
    }

    setFilteredPersonaData(filtered);

    // 현재 탭의 활성/생성 중/비활성 페르소나 수 계산
    const activeCount = filtered.filter(
      (persona) => persona?.status === "complete"
    ).length;

    const generatingCount = filtered.filter(
      (persona) => persona?.status === "ing"
    ).length;

    const inactiveCount = filtered.filter(
      (persona) => persona?.status !== "complete" && persona?.status !== "ing"
    ).length;

    // 통계 정보를 부모 컴포넌트에 전달
    setPersonaStats({
      active: activeCount,
      inactive: inactiveCount,
      generating: generatingCount,
    });
  }, [personaData, activeTab, setPersonaStats]);

  // 즐겨찾기 토글 함수
  const toggleFavorite = async (persona) => {
    if (!persona) return;

    try {
      // ID가 없는 경우 처리
      const personaId = persona._id;
      if (!personaId) {
        console.error("페르소나 ID가 없습니다.");
        return;
      }

      // 페르소나 객체의 favorite 값을 반전
      const updatedPersona = {
        id: personaId,
        favorite: !persona.favorite,
      };

      // 서버에 업데이트된 페르소나 저장
      await updatePersonaOnServer(updatedPersona, true);

      // 로컬 상태 업데이트 (필터링된 데이터와 원본 데이터 모두 업데이트)
      const updatedPersonaData = personaData.map((p) => {
        if (p._id === personaId) {
          return { ...p, favorite: !p.favorite };
        }
        return p;
      });

      // 원본 데이터 업데이트 (부모 컴포넌트에 전달)
      setIsStarred(updatedPersonaData);

      // 필터링된 데이터 업데이트 (현재 탭에 표시되는 데이터)
      setFilteredPersonaData((prevData) =>
        prevData.map((p) => {
          if (p._id === personaId) {
            return { ...p, favorite: !p.favorite };
          }
          return p;
        })
      );
    } catch (error) {
      console.error("즐겨찾기 업데이트 실패:", error);
    }
  };

  // // 데이터가 없는 경우 빈 상태 컴포넌트 표시
  // if (!filteredPersonaData || filteredPersonaData.length === 0) {
  //   return <OrganismEmptyPersona />;
  // }

  const handleRequestClick = (persona) => {
    setSelectedPersona(persona); // 선택된 페르소나 설정
    setShowRequestPopup(true); // 팝업 표시
  };

  const creditUse = async () => {
    // 팝업 닫기
    setShowRequestPopup(false);

    let accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("토큰이 없습니다.");
      return;
    }

    // 크레딧 사용전 사용 확인
    const creditPayload = {
      // 기존 10 대신 additionalQuestionMount 사용
      mount: creditRequestBusinessPersona,
    };
    const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);
    // console.log("크레딧 체크 응답:", creditResponse);

    if (creditResponse?.state !== "use") {
      setShowCreditPopup(true);
      return;
    }

    // 크레딧이 사용 가능한 상태면 사용 API 호출
    const creditUsePayload = {
      title: selectedPersona.title,
      service_type: " 페르소나 모집 요청",
      target: "",
      state: "use",
      mount: creditRequestBusinessPersona,
    };

    // 크레딧 사용 후 사용자 정보 새로고침
    accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const userCreditValue = await UserCreditInfo(isLoggedIn);

      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);
    }

    handleRequestPersona(selectedPersona);
  };

  const handleRequestPersona = async (persona) => {
    console.log("handleRequestPersona", persona);

    if (!persona) {
      console.error("선택된 페르소나가 없습니다.");
      return;
    }

    try {
      const projectId =
        persona.projectId || localStorage.getItem("currentProjectId");
      const currentProject = await getProjectByIdFromIndexedDB(
        projectId,
        isLoggedIn
      );
      console.log("currentProject", currentProject);

      // const currentRequestedPersona = currentProject?.businessPersonaList || [];

      // console.log("currentRequestedPersona", currentRequestedPersona);

      // // 현재 요청된 페르소나 목록에서 동일한 페르소나가 있는지 확인하고 status 업데이트
      // let filteredPersona = [];
      // currentRequestedPersona.forEach((p) => {
      //   if (p.personaName === persona.personaName) {
      //     p.status = "request";
      //   }
      //   filteredPersona.push(p);
      // });

      // selectedPersona.status가 undefined일 때만 요청을 진행
      if (persona.status === "profile" || persona.status === "default") {
        // 새로운 requestedPersona 배열 생성
        const newRequestedPersona = {
          id: persona._id,
          ...Object.fromEntries(
            Object.entries(persona).filter(([key]) => key !== "_id")
          ),
          status: "request",
        };

        await updatePersonaOnServer(newRequestedPersona, true);

        const requestData = {
          projectId: projectId,
          requestDate: new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          requestTimeStamp: Date.now(),
          businessAnalysis: {
            businessModel: currentProject.businessModel,
            projectAnalysis: currentProject.projectAnalysis,
            projectDescription: currentProject.projectDescription,
            projectTitle: currentProject.projectTitle,
            targetCountry: currentProject.targetCountry,
          },
          projectType: currentProject.projectType,
          status: "request",
          personaRequest: { ...persona },
        };
        createRequestPersonaOnServer(requestData, isLoggedIn);
      } else {
        console.error("이미 요청된 페르소나입니다.");
      }
    } catch (error) {
      console.error("페르소나 요청 중 오류 발생:", error);
    }
  };

  return (
    <>
      {/* activeTab이 'my_persona'이고 filteredPersonaData가 비어있을 때만 BoxWrap 표시 */}
      {activeTab === "my_persona" &&
      (!filteredPersonaData || filteredPersonaData.length === 0) ? (
        <BoxWrap NoData Border>
          <img src={images.PeopleStarFillPrimary} alt="" />
          <Body2 color="gray500" align="center !important">
            현재 요청된 My Persona가 없습니다
            <br />
            찜(북마크)를 하시면 해당 페이지에서 확인 가능합니다
          </Body2>
        </BoxWrap>
      ) : (
        <AiPersonaCardGroupWrap>
          {filteredPersonaData.map((persona) => (
            <AiPersonaCardListItem key={persona?._id}>
              <div className="header">
                <UniqueTag color={persona?.type || "default"} />
                <div className="title">
                  <Body1 color="gray800">
                    {persona?.personaName || "제목 없음"}
                  </Body1>
                  <div style={{ height: "44px" }}>
                    <Sub3 color="gray700">#{persona?.gender || ""}</Sub3>
                    <Sub3 color="gray700">#{persona?.age || ""}</Sub3>
                    <Sub3 color="gray700">#{persona?.keywords[0] || ""}</Sub3>
                    <Sub3 color="gray700">#{persona?.keywords[1] || ""}</Sub3>
                  </div>
                </div>
              </div>

              <div className="content">
                <Sub3 color="gray700">
                  {persona?.personaCharacteristics || "설명 없음"}
                </Sub3>
              </div>

              <AiPersonaCardButtonWrap>
                <div>
                  <StarButtonStyled
                    onClick={() => toggleFavorite(persona)}
                    isStarred={persona?.favorite || false}
                  >
                    {persona?.favorite ? (
                      <img src={images?.StarFill || ""} alt="즐겨찾기 됨" />
                    ) : (
                      <img src={images?.Star || ""} alt="즐겨찾기" />
                    )}
                  </StarButtonStyled>
                </div>

                <div style={{ flex: "1" }}>
                  <StyledButton
                    Medium
                    Outline
                    onClick={() => setShowPopup(persona)}
                  >
                    프로필
                  </StyledButton>
                  {!["request", "ing", "complete"].includes(
                    persona?.status
                  ) && (
                    <StyledButton
                      Medium
                      Primary
                      Fill
                      onClick={() => setShowPopup(persona)}
                    >
                      페르소나 생성
                    </StyledButton>
                  )}
                </div>
              </AiPersonaCardButtonWrap>
            </AiPersonaCardListItem>
          ))}
        </AiPersonaCardGroupWrap>
      )}

      {showRequestPopup &&
        (eventState ? (
          <PopupWrap
            Event
            title="페르소나 모집 요청"
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditRequestBusinessPersona.toLocaleString()} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              creditUse(); // Call creditUse function
              setShowRequestPopup(false); // 팝업 닫기
            }}
          />
        ) : trialState ? (
          <PopupWrap
            Check
            title="페르소나 모집 요청"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditRequestBusinessPersona.toLocaleString()} 크레딧)
                <br />
                신규 가입 2주간 무료로 사용 가능합니다.
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              handleRequestPersona(selectedPersona); // 선택된 페르소나를 전달
              setShowRequestPopup(false); // 팝업 닫기
            }}
          />
        ) : (
          <PopupWrap
            Check
            title="페르소나 모집 요청"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditRequestBusinessPersona.toLocaleString()} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowRequestPopup(false)}
            onConfirm={() => {
              handleRequestPersona(selectedPersona); // 선택된 페르소나를 전달
              setShowRequestPopup(false); // 팝업 닫기
            }}
          />
        ))}
      {showCreditPopup && (
        <PopupWrap
          Warning
          title="크레딧이 모두 소진되었습니다"
          message={
            <>
              보유한 크레딧이 부족합니다.
              <br />
              크레딧을 충전한 후 다시 시도해주세요.
            </>
          }
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={() => setShowCreditPopup(false)}
        />
      )}
    </>
  );
};

export default OrganismPersonaCardList;

const StyledButton = styled(Button)`
  flex-grow: 1;
`;

const StarButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.isStarred ? `rgba(255, 149, 0, 0.10)` : palette.gray200};
  background: ${(props) =>
    props.isStarred ? `rgba(255, 149, 0, 0.10)` : palette.white};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
