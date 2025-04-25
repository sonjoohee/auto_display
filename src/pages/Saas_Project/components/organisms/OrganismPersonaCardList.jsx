import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Body1, Sub3 } from "../../../../assets/styles/Typography";
import AtomPersonaLoader from "../../../Global/atoms/AtomPersonaLoader";
import {
  AiPersonaCardGroupWrap,
  AiPersonaCardListItem,
  AiPersonaCardButtonWrap,
  UniqueTag,
  BoxWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";

import {
  Body2,
  Body3,
  Sub2,
  Sub4,
  Caption1,
} from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import images from "../../../../assets/styles/Images";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  updatePersonaOnServer,
  UserCreditCheck,
  UserCreditInfo,
  createPersonaOnServer,
  getPersonaListOnServer,
  InterviewXPersonaMacroSegmentRequest,
  InterviewXPersonaUniqueUserRequest,
  InterviewXPersonaKeyStakeholderRequest,
  UserCreditUse,
} from "../../../../utils/indexedDB";
import {
  PROJECT_PERSONA_LIST,
  IS_LOGGED_IN,
  USER_CREDITS,
  PROJECT_SAAS,
  PERSONA_LIST_SAAS,
  CREDIT_CREATE_PERSONA_DEFAULT,
} from "../../../../pages/AtomStates";
import PopupWrap from "../../../../assets/styles/Popup.jsx";

import MacroSegTag from "../../../../components/Charts/MacroSegTag.jsx";
import StakeHolderTag from "../../../../components/Charts/StakeHolderTag.jsx";
import MyPersonaTag from "../../../../components/Charts/MyPersonaTag.jsx";

const OrganismPersonaCardList = ({
  personaData = [],
  setIsStarred = () => {},
  setShowPopup = () => {},
  activeTab = "macro_segment", // 기본 탭은 macro_segment로 설정
  setPersonaStats = () => {}, // 페르소나 통계 정보를 부모 컴포넌트에 전달하는 함수
  onCustomizeRequest,
  loadingTabs,
  setLoadingTabs,
}) => {
  const navigate = useNavigate();

  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [project] = useAtom(PROJECT_SAAS);
  const [creditCreatePersonaDefault] = useAtom(CREDIT_CREATE_PERSONA_DEFAULT);
  const creditPersonaCreate = creditCreatePersonaDefault;
  const [, setPersonaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [, setProjectPersonaList] = useAtom(PROJECT_PERSONA_LIST);
  const [, setUserCredits] = useAtom(USER_CREDITS);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [filteredPersonaData, setFilteredPersonaData] = useState([]);
  console.log("🚀 ~ filteredPersonaData:", filteredPersonaData);
  const [showFavoriteLimitPopup, setShowFavoriteLimitPopup] = useState(false);
  const eventState = true;
  const trialState = false;
  const eventTitle = "이벤트 제목";

  // 탭이 변경될 때마다 데이터 필터링 및 통계 계산
  useEffect(() => {
    if (!personaData || personaData.length === 0) {
      setFilteredPersonaData([]);
      setPersonaStats({ active: 0, inactive: 0, generating: 0 });
      return;
    }

    let filtered = [];

    // 'favorite 탭인 경우 favorite이 true인 항목만 표시
    if (activeTab === "my_favorite") {
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

    const isEducation = sessionStorage.getItem("educationState") === "true";
    const currentFavoriteCount = personaData.filter(
      (p) => p.favorite === true
    ).length;

    // 교육 상태이고, 즐겨찾기 수가 20개 이상이며, 현재 페르소나를 즐겨찾기 하려는 경우
    if (isEducation && currentFavoriteCount >= 20 && !persona.favorite) {
      setShowFavoriteLimitPopup(true);
      return;
    }

    try {
      // ID가 없는 경우 처리
      const personaId = persona._id;
      if (!personaId) {
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
    } catch (error) {}
  };

  const handleCreatePersona = async (personaType) => {
    // 해당 탭만 로딩 상태로 변경
    setLoadingTabs((prev) => ({
      ...prev,
      [personaType]: true,
    }));

    try {
      // 현재 탭의 페르소나 리스트 필터링
      const currentTabPersonas = personaData.filter(
        (p) => p.personaType === personaType
      );

      // last_persona 객체 배열 생성
      const lastPersonaInfo = currentTabPersonas.map((persona) => ({
        persona_name: persona.personaName,
        keywords: persona.keywords,
        gender: persona.gender,
        age: persona.age,
        characteristics: persona.personaCharacteristics,
      }));

      const data = {
        business_description:
          project.projectAnalysis.business_analysis +
          (project.projectAnalysis.file_analysis
            ? project.projectAnalysis.file_analysis
            : ""),
        target_customer: project.projectAnalysis.target_customer,
        business_model: project.businessModel,
        industry_type: project.industryType,
        target_country: project.targetCountry,
        last_persona: lastPersonaInfo,
      };

      let response;
      let personas;
      const max_attempt = 10;
      let attempt = 0;

      switch (personaType) {
        case "macro_segment":
          response = await InterviewXPersonaMacroSegmentRequest(
            data,
            isLoggedIn
          );
          while (
            !response ||
            !response.response ||
            !response.response.persona_macro_segment ||
            response.response.persona_macro_segment.length === 0
          ) {
            response = await InterviewXPersonaMacroSegmentRequest(
              data,
              isLoggedIn
            );
            attempt++;
            if (attempt >= max_attempt) {
              throw new Error("Macro Segment 페르소나 생성에 실패했습니다.");
            }
          }
          personas = response.response.persona_macro_segment.map((persona) => ({
            ...mapPersonaData(persona),
            personaType: "macro_segment",
          }));
          break;

        case "unique_user":
          response = await InterviewXPersonaUniqueUserRequest(data, isLoggedIn);
          while (
            !response ||
            !response.response ||
            !response.response.persona_unique_user ||
            response.response.persona_unique_user.length === 0
          ) {
            response = await InterviewXPersonaUniqueUserRequest(
              data,
              isLoggedIn
            );
            attempt++;
            if (attempt >= max_attempt) {
              throw new Error("Unique User 페르소나 생성에 실패했습니다.");
            }
          }
          personas = response.response.persona_unique_user.map((persona) => ({
            ...mapPersonaData(persona),
            personaType: "unique_user",
          }));
          break;

        case "key_stakeholder":
          response = await InterviewXPersonaKeyStakeholderRequest(
            data,
            isLoggedIn
          );
          while (
            !response ||
            !response.response ||
            !response.response.persona_key_stakeholder ||
            response.response.persona_key_stakeholder.length === 0
          ) {
            response = await InterviewXPersonaKeyStakeholderRequest(
              data,
              isLoggedIn
            );
            attempt++;
            if (attempt >= max_attempt) {
              throw new Error("Key Stakeholder 페르소나 생성에 실패했습니다.");
            }
          }
          personas = response.response.persona_key_stakeholder.map(
            (persona) => ({
              ...mapPersonaData(persona),
              personaType: "key_stakeholder",
            })
          );
          break;
      }

      // DB에 저장
      const updatedPersonas = [];
      for (const persona of personas) {
        try {
          const insertedId = await createPersonaOnServer(persona, isLoggedIn);
          if (insertedId) {
            updatedPersonas.push({ ...persona, _id: insertedId });
          } else {
            updatedPersonas.push(persona);
          }
        } catch (error) {
          updatedPersonas.push(persona);
        }
      }

      // 서버에서 최신 데이터 가져오기
      const savedPersonaListInfo = await getPersonaListOnServer(
        project?._id,
        true
      );
      if (savedPersonaListInfo) {
        const sortedList = savedPersonaListInfo
          .filter((persona) => persona.personaType === personaType)
          .sort((a, b) => a.timestamp - b.timestamp);

        setProjectPersonaList((prev) => {
          const filteredPrev = prev.filter(
            (p) => p.personaType !== personaType
          );
          return [...filteredPrev, ...sortedList];
        });

        // personaListSaas도 같은 방식으로 업데이트
        setPersonaListSaas((prev) => {
          const filteredPrev = prev.filter(
            (p) => p.personaType !== personaType
          );
          return [...filteredPrev, ...sortedList];
        });
      }
    } catch (error) {
      console.error(error);
      // 에러 처리
    } finally {
      // 해당 탭의 로딩 상태만 해제
      setLoadingTabs((prev) => ({
        ...prev,
        [personaType]: false,
      }));
    }
  };

  // 페르소나 데이터 매핑 헬퍼 함수
  const mapPersonaData = (persona) => ({
    personaName: persona.persona_name,
    personaCharacteristics: persona.persona_characteristics,
    type: persona.type,
    age: persona.age,
    gender: persona.gender,
    job: persona.job,
    keywords: persona.keywords,
    projectId: project._id,
    imageKey: `persona_${persona.gender === "남성" ? "m" : "f"}_${
      Math.floor(parseInt(persona.age.replace("세", "")) / 10) * 10
    }_${String(Math.floor(Math.random() * 10) + 1).padStart(2, "0")}`,
  });

  // 크레딧 확인 핸들러 추가
  const handleCreditCheck = () => {
    setShowCreatePersonaPopup(true);
  };

  // 크레딧 확인 팝업에서 확인 클릭 시 핸들러
  const handleConfirmCredit = async () => {
    setShowCreatePersonaPopup(false);

    let accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    // 크레딧 사용전 사용 확인
    const creditPayload = {
      // 기존 10 대신 additionalQuestionMount 사용
      mount: creditPersonaCreate,
    };
    const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

    if (creditResponse?.state !== "use") {
      setShowCreditPopup(true);
      return;
    }

    // 크레딧이 사용 가능한 상태면 사용 API 호출
    const creditUsePayload = {
      title: project.projectTitle,
      service_type: "페르소나 생성",
      target: "",
      state: "use",
      mount: creditPersonaCreate,
    };

    await UserCreditUse(creditUsePayload, isLoggedIn);

    // 크레딧 사용 후 사용자 정보 새로고침
    accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const userCreditValue = await UserCreditInfo(isLoggedIn);
      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue);
    }
    handleCreatePersona(activeTab);
  };

  // 현재 탭의 페르소나 개수 계산
  const currentTabPersonaCount = personaData.filter(
    (p) => p.personaType === activeTab
  ).length;

  return (
    <>
      {/* activeTab이 'favorite'이고 filteredPersonaData가 비어있을 때만 BoxWrap 표시 */}
      {(activeTab === "my_favorite" ||
        (activeTab === "my_persona" &&
          !personaData.some((p) => p.personaType === "my_persona"))) &&
      (!filteredPersonaData || filteredPersonaData.length === 0) &&
      !loadingTabs.my_persona ? (
        <BoxWrap
          Hover
          NoData
          Border
          onClick={() =>
            activeTab === "my_persona"
              ? onCustomizeRequest()
              : navigate("/AiPersona")
          }
        >
          <>
            <img
              src={
                activeTab === "my_favorite"
                  ? images.PeopleStarFillPrimary
                  : images.PeopleFillPrimary2
              }
              alt=""
            />
            <Body2 color="gray500" align="center !important">
              {activeTab === "my_favorite"
                ? "즐겨찾기를 하시면 관심 있는 페르소나를 해당 페이지에서 확인하실 수 있습니다."
                : "나만의 페르소나를 생성하시면 해당 페이지에서 확인하실 수 있습니다."}
            </Body2>
            {activeTab === "my_persona" && (
              <Button
                Medium
                Outline
                Fill
                onClick={(e) => {
                  e.stopPropagation();
                  onCustomizeRequest();
                }}
              >
                {/* <img src={images.PlusPrimary} width="14" height="14" alt="" /> */}
                <Caption1 color="gray700">My Persona 요청</Caption1>
                {/* <Sub2 color="primary">My Persona 요청</Sub2> */}
              </Button>
            )}
          </>
        </BoxWrap>
      ) : (
        <AiPersonaCardGroupWrap>
          {filteredPersonaData.map((persona) => (
            <AiPersonaCardListItem key={persona?._id}>
              <div className="header">
                {persona?.personaType === "macro_segment" && (
                  <MacroSegTag text={persona?.type || "default"} />
                )}
                {persona?.personaType === "key_stakeholder" && (
                  <StakeHolderTag text={persona?.type || "default"} />
                )}
                {persona?.personaType === "my_persona" && (
                  <MyPersonaTag text={persona?.type || "default"} />
                )}
                {persona?.personaType === "unique_user" && (
                  <UniqueTag color={persona?.type || "default"} />
                )}
                <div className="title">
                  <Body1 color="gray800">
                    {persona?.personaName || "제목 없음"}
                  </Body1>
                  <div style={{ height: "44px", marginBottom: "10px" }}>
                    <Sub4 color="gray700">#{persona?.gender || ""}</Sub4>
                    <Sub4 color="gray700">#{persona?.age || ""}</Sub4>
                    <Sub4 color="gray700">#{persona?.keywords[0] || ""}</Sub4>
                    <Sub4 color="gray700">#{persona?.keywords[1] || ""}</Sub4>
                  </div>
                </div>
              </div>

              <div className="content" style={{ minHeight: "114px" }}>
                <Sub3 color="gray700">
                  {persona?.personaType === "my_persona" ? (
                    <>
                      {persona?.customData?.persona_reason || ""}
                      {persona?.customData?.persona_additional_info && (
                        <>{" " + persona.customData.persona_additional_info}</>
                      )}
                    </>
                  ) : (
                    persona?.personaCharacteristics || "설명 없음"
                  )}
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

                  <StyledButton
                    Medium
                    Primary
                    Fill
                    onClick={() => setShowPopup(persona)}
                    style={{
                      background:
                        persona?.status === "complete"
                          ? palette.primary
                          : persona?.status === "ing" ||
                            persona?.status === "request" ||
                            persona?.status === "default" ||
                            !persona?.status ||
                            persona?.status === "profile"
                          ? `#F0F4FF`
                          : palette.chatGray,
                      color:
                        persona?.status === "complete"
                          ? palette.white
                          : palette.primary,
                    }}
                  >
                    {persona?.status === "ing" ||
                    persona?.status === "request" ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: palette.primary,
                        }}
                      >
                        <images.ArrowClockwise2
                          width="14"
                          height="14"
                          color={palette.primary}
                        />
                        생성중
                      </div>
                    ) : persona?.status === "complete" ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: palette.white,
                        }}
                      >
                        <img src={images.IconCheck3} width="8" />
                        활성화
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: palette.primary,
                        }}
                      >
                        <img src={images.PlusPrimary} width="8" height="8" />
                        생성 요청
                      </div>
                    )}
                  </StyledButton>
                </div>
              </AiPersonaCardButtonWrap>
            </AiPersonaCardListItem>
          ))}

          {activeTab !== "my_favorite" &&
            activeTab !== "my_persona" &&
            currentTabPersonaCount < 40 && (
              <>
                {loadingTabs[activeTab] ? (
                  <div className="more">
                    <AtomPersonaLoader message="페르소나를 생성하고 있습니다." />
                  </div>
                ) : (
                  <div className="more" onClick={handleCreditCheck}>
                    <Body3 color="gray500" align="center">
                      + 더보기 ({creditPersonaCreate} credit)
                    </Body3>
                  </div>
                )}
              </>
            )}
        </AiPersonaCardGroupWrap>
      )}

      {showCreatePersonaPopup &&
        (eventState ? (
          <PopupWrap
            Event
            title="페르소나 더보기"
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditPersonaCreate} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowCreatePersonaPopup(false)}
            onConfirm={handleConfirmCredit}
          />
        ) : trialState ? (
          <PopupWrap
            Check
            title="페르소나 더보기"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditPersonaCreate} 크레딧)
                <br />
                신규 가입 2주간 무료로 사용 가능합니다.
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowCreatePersonaPopup(false)}
            onConfirm={handleConfirmCredit}
          />
        ) : (
          <PopupWrap
            Check
            title="페르소나 더보기"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditPersonaCreate} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => setShowCreatePersonaPopup(false)}
            onConfirm={handleConfirmCredit}
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
          onConfirm={() => setShowCreditPopup(false)}
        />
      )}

      {showFavoriteLimitPopup && (
        <PopupWrap
          Warning
          title="즐겨찾기 제한"
          message={
            <>
              교육 프로젝트에서는 즐겨찾기를 최대 20개까지 추가할 수 있습니다.
            </>
          }
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={() => setShowFavoriteLimitPopup(false)}
          onConfirm={() => setShowFavoriteLimitPopup(false)}
        />
      )}
    </>
  );
};

export default OrganismPersonaCardList;

const StyledButton = styled(Button)`
  flex-grow: 1;

  &:hover {
    background: ${palette.chatGray};
  }
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
