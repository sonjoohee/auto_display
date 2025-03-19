import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  IS_PERSONA_ACCESSIBLE,
  IS_LOGGED_IN,
  PERSONA_STEP,
  SELECTED_INTERVIEW_PURPOSE,
  PERSONA_LIST,
  PERSONA_BUTTON_STATE_3,
  BUSINESS_ANALYSIS,
  SELECTED_INTERVIEW_TYPE,
  SELECTED_INTERVIEW_PURPOSE_DATA,
  PURPOSE_ITEMS_SINGLE,
  CUSTOM_THEORY_DATA,
  CREDIT_CUSTOM_THEORY,
  EVENT_STATE,
  EVENT_TITLE,
  TRIAL_STATE,
  USER_CREDITS,
} from "../../../AtomStates";
import {
  ContentsWrap,
  MainContent,
  Title,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  BoxWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  H3,
  Body1,
  Body2,
  Body3,
} from "../../../../assets/styles/Typography";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import {
  Button,
} from "../../../../assets/styles/ButtonStyle";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import MoleculePersonaCard from "../molecules/MoleculePersonaCard";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import PopupWrap from "../../../../assets/styles/Popup";
import OrganismToastPopup from "../organisms/OrganismToastPopup";
import MoleculeInterviewPurpose from "../molecules/MoleculeInterviewPurpose.jsx";
import OrganismCustomization from "../organisms/OrganismCustomization.jsx";
import {
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
} from "../../../../utils/indexedDB";

const FULL_DEFINITION_TEXT =
  "사용자 트렌드 민감도 분석은 사용자가 시장의 최신 트렌드에 얼마나 빠르고 효과적으로 반응하는지를 측정하는 방법론입니다. 이 분석은 사용자가 새로운 트렌드를 어떻게 인식하고, 그 트렌드에 따라 행동이 어떻게 변화하는지 파악하는 데 중점을 둡니다.";

const PagePersona3Single = () => {

  const [, setUserCredits] = useAtom(USER_CREDITS);
  const [eventState, ] = useAtom(EVENT_STATE);
  const [eventTitle, ] = useAtom(EVENT_TITLE);
  const [trialState, ] = useAtom(TRIAL_STATE);
  const [creditCustomTheory, ] =useAtom(CREDIT_CUSTOM_THEORY);
  const [customTheoryData, ] = useAtom(CUSTOM_THEORY_DATA);
  const [, setPersonaButtonState3] = useAtom(
    PERSONA_BUTTON_STATE_3
  );
  const [isLoggedIn, ] = useAtom(IS_LOGGED_IN);
  const [, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [businessAnalysis, ] = useAtom(BUSINESS_ANALYSIS);
  const [, setPersonaStep] = useAtom(PERSONA_STEP);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useAtom(
    SELECTED_INTERVIEW_PURPOSE
  );
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [, setSelectedInterviewPurposeData] =useAtom(SELECTED_INTERVIEW_PURPOSE_DATA);
  const [purposeItemsSingleAtom, setPurposeItemsSingleAtom] =
    useAtom(PURPOSE_ITEMS_SINGLE);
  const [selectedInterviewType, setSelectedInterviewType] = useAtom(
      SELECTED_INTERVIEW_TYPE
    );

  const [, setShowPopup] = useState(false);
  const [showCustomButton, setShowCustomButton] = useState(true);
  const [customizations, setCustomizations] = useState([]);
  const [, setShowCustomization] = useState(false);
  const [showQuestions, setShowQuestions] = useState({
    radio3: false,
    radio4: false,
    radio5: false,
  });
  const [, setShowNewListBox] = useState(false);

  const navigate = useNavigate();
  
  const [showInterviewReady, setShowInterviewReady] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showEditPersona, setShowEditPersona] = useState(false);
  const [personaListState, setPersonaListState] = useState(null);
  const [showInterviewTypeAlert, setShowInterviewTypeAlert] = useState(false);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);

  const handlePopupClose = () => {
    setShowInterviewReady(false);
    setShowToast(false);
  };
  const handleSelectPersona = () => {
    // 선택된 페르소나들을 selected에 반영
    setSelectedInterviewType("single");
    setPersonaStep(3);
    setIsPersonaAccessible(true);
    navigate(`/Persona/3/Select`, { replace: true });
  };


  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const purposeItemsSingle = [
    {
      id: 1,
      category: "제품 사용 경험",
      title: "소비자 가치 우선순위 분석",
      view_title: "소비자 중요 가치 분석",
      description: "고객이 가장 원하는 가치를 이해하고 효과적인 전략 수립",
      theory_data:
        "(1) 정의: 소비자가 제품/서비스에서 중요하게 여기는 핵심 가치를 식별하고, 각 요소의 우선순위를 분석하는 방법론.\n(2) 방법론 목적: 소비자 중심의 가치 기반 전략 수립 및 차별화된 브랜드 포지셔닝 강화.\n(3) 주요 특징: 소비자의 주요 가치 요소(가격, 품질, 지속 가능성 등) 탐구, 가치 간 우선순위를 식별하고, 중요도를 기반으로 개선 방향 제안.\n(4) 기대 결과: 소비자의 핵심 니즈를 충족시키고, 브랜드의 차별성을 강화하는 데 필요한 전략 도출.\n(5) 인터뷰 목적: 소비자가 제품/서비스에서 가장 중요하게 여기는 가치를 식별하고, 이를 기반으로 개선 및 차별화 전략을 도출.",
    },
    {
      id: 2,
      category: "제품 사용 경험",
      title: "감성적 가치 평가",
      view_title: "감성적 매력 평가",
      description: "고객이 제품/서비스에 느끼는 감정을 분석하여 매력 향상",
      theory_data:
        "(1) 정의: 감성적 가치 평가는 소비자가 제품/서비스에서 기대하는 감정(감성)과 실제 느낀 감정(감성)을 탐구하여, 두 감정 간의 차이를 분석하고 개선 방안을 도출하는 방법론.\n(2) 방법론 목적: 소비자가 제품/서비스에서 기대하는 감정(감성)과 실제 느낀 감정(감성)의 차이를 탐구하고, 이러한 갭 차이를 완화하여 소비자 경험의 정서적 가치를 극대화하고, 제품/서비스의 만족도를 높임.\n(3) 주요 특징: 소비자가 제품/서비스에서 기대하는 감정과 실제 느낀 감정을 비교 분석, 제품/서비스 경험에서 감성적 갭 차이를 식별하고 개선 방안을 도출.\n(4) 기대 결과: 기대 감정과 실제 감정의 차이를 줄여 소비자 경험의 품질을 향상, 감성적 경험을 바탕으로 소비자 만족도를 극대화하기 위한 실질적 개선 방향 제안.\n(5) 인터뷰 목적: 소비자가 제품/서비스에서 느끼는 기대 감정(감성)과 실제 감정(감성)을 탐구하여 갭 차이를 완화하기 위한 개선 방안을 도출.",
    },
    {
      id: 3,
      category: "구매 및 소비 심리",
      title: "구매 장벽 및 유인 요소 분석",
      view_title: "구매 요인과 장애물 분석",
      description: "구매 결정을 방해하는 요인과 구매를 이끄는 핵심 발굴",
      theory_data:
        "(1) 정의: 소비자가 제품/서비스를 구매하지 않는 주요 이유(장벽)를 분석하고, 구매를 유도할 수 있는 요소(유인 요소)를 파악하는 방법론.\n(2) 방법론 목적: 구매 결정 과정에서 발생하는 장애물을 제거하고, 구매를 촉진할 수 있는 전략을 개발.\n(3) 주요 특징: 구매 의사결정을 저해하는 주요 요소(가격, 신뢰도, 정보 부족 등) 탐구, 구매를 유도하는 핵심 요인(프로모션, 후기, 브랜드 이미지 등) 분석\n(4) 기대 결과: 구매 전환율을 높이고, 구매 장벽을 제거하기 위한 실행 가능한 개선안 제안.\n(5) 인터뷰 목적: 소비자가 구매를 망설이는 이유 파악, 구매 결정을 이끌어낼 유인 요소 탐구.",
    },
  ];

  useEffect(() => {
      setPurposeItemsSingleAtom(purposeItemsSingle);
      if (customTheoryData?.theory_title) {
        const generatedQuestions = {
          id: 4,
          title: customTheoryData?.theory_title || "",
          theory_title: customTheoryData?.theory_title || "",
          view_title: customTheoryData?.theory_title || "",
          definition: customTheoryData?.definition || "",
          objective: customTheoryData?.objective || "",
          characteristic: customTheoryData?.characteristic || [],
          description: "사용자 커스텀 방법론" || "",
          custom_theory_data: customTheoryData || "",
        };
        setPurposeItemsSingleAtom((prev) => [...prev, generatedQuestions]);
      }
  }, [setPurposeItemsSingleAtom]);

  const handleEnterInterviewRoom = () => {
    setPersonaStep(4);
    setPersonaButtonState3(1);
    handlePopupClose();
    setShowToast(true);
  };

  // 페르소나 선택/해제 처리 함수 추가
  const handlePersonaToggle = (persona, isCurrentlySelected) => {
    if (isCurrentlySelected) {
      // selected에서 제거하고 unselected로 이동
      if (personaListState.selected.length > 1) {
        setPersonaListState({
          selected: personaListState.selected.filter(
            (p) => p.persona !== persona.persona
          ),
          unselected: [...personaListState.unselected, persona],
        });
      }
    } else {
      // 선택 개수가 5개 미만일 때만 추가 허용
      if (personaListState.selected.length < 5) {
        setPersonaListState({
          selected: [...personaListState.selected, persona],
          unselected: personaListState.unselected.filter(
            (p) => p.persona !== persona.persona
          ),
        });
      }
    }
  };

  // 이전으로 되돌리기
  const handleRevertPersonaList = () => {
    setPersonaListState(personaList);
  };

  // 편집 완료
  const handleConfirmEditPersona = () => {
    setPersonaList(personaListState);
    setShowEditPersona(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 팝업이나 토스트가 열려있을 때
    if (showToast || showInterviewReady || showEditPersona) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px"; // 스크롤바 자리만큼 패딩 추가
    }
    // 팝업이나 토스트가 닫혔을 때
    else {
      document.body.style.overflow = "auto"; // "hidden"에서 "auto"로 변경
      document.body.style.paddingRight = "0";
    }

    // 컴포넌트가 언마운트될 때 원래대로 복구
    return () => {
      document.body.style.overflow = "auto"; // "hidden"에서 "auto"로 변경
      document.body.style.paddingRight = "0";
    };
  }, [showToast, showInterviewReady, showEditPersona]);

  // radio6 선택 핸들러 수정
  const handlePurposeSelect = (purpose) => {
    const selectedPurpose = purposeItemsSingleAtom.find(
      (item) => item.id === purpose
    );

    setSelectedInterviewPurposeData(selectedPurpose);
    setSelectedInterviewPurpose(purpose);
  };

  const handleCloseRequestPopup = async () => {
    try {
      const creditPayload = {
        mount: creditCustomTheory,
      };

      const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

      if (creditResponse?.state !== "use") {
        setShowRequestPopup(false);
        setShowCreditPopup(true);
        return;
      }

      // 만약 creditResponse.state가 "use"라면 아래 payload 형식으로 API 호출
      const creditUsePayload = {
        title: businessAnalysis.title,
        service_type: "커스텀 방법론",
        target: "",
        state: "use",
        mount: creditCustomTheory,
      };

      const creditUseResponse = await UserCreditUse(
        creditUsePayload,
        isLoggedIn
      );
      setShowRequestPopup(false);
      setShowCustomButton(false);
      setCustomizations((prev) => [
        ...prev,
        {
          id: Date.now(),
          purposeText: "",
          showMethodology: false,
          isEditing: false,
          definitionText: FULL_DEFINITION_TEXT,
          editedDefinition: "",
          editedPurpose: "",
        },
      ]);
      // 크레딧 사용 후 사용자 정보 새로고침
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const userCreditValue = await UserCreditInfo(isLoggedIn);

        // 전역 상태의 크레딧 정보 업데이트
        setUserCredits(userCreditValue);
      }
    } catch (error) {
      console.error("크레딧 체크 실패:", error);
      setShowCreditPopup(true);
    }
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("persona3single")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          navigate("/Project");
          return true;
        }

        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }

      return false;
    };


    // F5 키 또는 Ctrl+R 감지
    const handleKeyDown = (event) => {
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 키 코드
        event.preventDefault();
        navigate("/Project");
      }
    };

    // 함수 실행
    detectRefresh();

    // 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
  const [activeTab, setActiveTab] = useState(1);
  const completedSteps = [1, 2, 3, 4];

  return (
    <>
      <ContentsWrap
        noScroll={Boolean(showToast || showInterviewReady || showEditPersona)}
      >
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <PersonaSingleWrap>
            <TabWrapType5>
              <TabButtonType5 isActive>
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    인터뷰 목표 설정
                  </Body1>
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    Interview Define
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5>
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    페르소나 선택
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Persona Selection
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5>
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    {selectedInterviewType === "multiple"
                      ? "그룹 인터뷰"
                      : "심층 인터뷰"}
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    {selectedInterviewType === "multiple"
                      ? "Group Interview"
                      : "Indepth Interview"}
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5>
                <span>04</span>
                <div className="text">
                  <Body1 color={activeTab >= 4 ? "gray700" : "gray300"}>
                    최종 인사이트 분석
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            <TabContent5>
              <div className="title">
                <H3 color="gray800">Interview Objective Define</H3>
                <Body3 color="gray800">
                  인터뷰 주제를 명확히하고 원하는 인사이트를 얻기 위한 질문을
                  설계합니다
                </Body3>
              </div>

              <div className="content">
                <TabContent5Item>
                  <div className="title">
                    <Body1 color="gray700">맞춤형 인터뷰 문항 생성</Body1>
                  </div>

                  <CustomizationWrap>
                    {showCustomButton &&
                      (!customTheoryData ||
                        Object.keys(customTheoryData).length === 0) && (
                        <BoxWrap
                          NoData
                          onClick={() => setShowRequestPopup(true)}
                        >
                          <img src={images.NoData} alt="no data" />
                          <Body2 color="gray700" align="center">
                            페르소나에게 어떤 인사이트를 얻고 싶은가요? 원하는
                            목적을 직접 입력하세요
                          </Body2>
                        </BoxWrap>
                      )}

                    <OrganismCustomization
                      customizations={customizations}
                      setCustomizations={setCustomizations}
                      setShowPopup={setShowPopup}
                      setShowNewListBox={setShowNewListBox}
                      setShowCustomization={setShowCustomization}
                      setShowCustomButton={setShowCustomButton}
                      setShowQuestions={setShowQuestions}
                    />

                    {purposeItemsSingleAtom.slice(3).map((purpose) => (
                      <MoleculeInterviewPurpose
                        Small
                        key={purpose.id}
                        purpose={purpose}
                        selectedPurpose={selectedInterviewPurpose}
                        showQuestions={showQuestions}
                        onPurposeSelect={handlePurposeSelect}
                        toggleQuestions={(id) =>
                          setShowQuestions((prev) => ({
                            ...prev,
                            [id]: !prev[id],
                          }))
                        }
                      />
                    ))}
                  </CustomizationWrap>
                </TabContent5Item>
              </div>

              <div className="content">
                <TabContent5Item>
                  <Body1 color="gray700" align="left">
                    추천 질문 템플릿
                  </Body1>

                  {purposeItemsSingleAtom.slice(0, 3).map((purpose) => (
                    <MoleculeInterviewPurpose
                      Small
                      key={purpose.id}
                      purpose={purpose}
                      selectedPurpose={selectedInterviewPurpose}
                      showQuestions={showQuestions}
                      onPurposeSelect={handlePurposeSelect}
                      toggleQuestions={(id) =>
                        setShowQuestions((prev) => ({
                          ...prev,
                          [id]: !prev[id],
                        }))
                      }
                    />
                  ))}
                </TabContent5Item>
              </div>

              <Button
                Other
                Primary
                Fill
                disabled={!selectedInterviewPurpose}
                onClick={handleSelectPersona}
              >
                다음
              </Button>
            </TabContent5>

            {/* 크레딧 소진팝업 */}
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

            {/* 인터뷰 커스터마이징 하기 팝업 */}
            {showRequestPopup &&
              (eventState ? (
                <PopupWrap
                  Event
                  title="인터뷰 커스터마이징 하기"
                  message={
                    <>
                      현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                      <br />({creditCustomTheory} 크레딧)
                    </>
                  }
                  buttonType="Outline"
                  closeText="취소"
                  confirmText="시작하기"
                  isModal={false}
                  onCancel={() => setShowRequestPopup(false)}
                  onConfirm={handleCloseRequestPopup}
                />
              ) : trialState ? (
                <PopupWrap
                  Check
                  title="인터뷰 커스터마이징 하기"
                  message={
                    <>
                      해당 서비스 사용시 크레딧이 소진됩니다.
                      <br />({creditCustomTheory} 크레딧)
                      <br />
                      신규 가입 2주간 무료로 사용 가능합니다.
                    </>
                  }
                  buttonType="Outline"
                  closeText="취소"
                  confirmText="시작하기"
                  isModal={false}
                  onCancel={() => setShowRequestPopup(false)}
                  onConfirm={handleCloseRequestPopup}
                />
              ) : (
                <PopupWrap
                  Check
                  title="인터뷰 커스터마이징 하기"
                  message={
                    <>
                      해당 서비스 사용시 크레딧이 소진됩니다.
                      <br />({creditCustomTheory} 크레딧)
                    </>
                  }
                  buttonType="Outline"
                  closeText="취소"
                  confirmText="시작하기"
                  isModal={false}
                  onCancel={() => setShowRequestPopup(false)}
                  onConfirm={handleCloseRequestPopup}
                />
              ))}

            {showEditPersona && (
              <PopupWrap
                TitleFlex
                title="📝 페르소나 편집하기"
                buttonType="Fill"
                closeText="닫기"
                confirmText="편집완료"
                isModal={true}
                isFormValid={true}
                onCancel={() => setShowEditPersona(false)}
                onConfirm={() => {
                  handleConfirmEditPersona();
                }}
                body={
                  <>
                    <Title>
                      <p>
                        Selected
                        <span onClick={handleRevertPersonaList}>
                          <img src={images.ClockCounterclockwise} alt="" />
                          이전으로 되돌리기
                        </span>
                      </p>
                    </Title>
                    {personaListState.selected.map((persona, index) => {
                      const profileArray = persona.profile
                        .replace(/['\[\]]/g, "")
                        .split(", ");
                      const age = profileArray[0].split(": ")[1];
                      const gender =
                        profileArray[1].split(": ")[1] === "남성"
                          ? "남성"
                          : "여성";
                      const job = profileArray[2].split(": ")[1];

                      return (
                        <MoleculePersonaCard
                          key={index}
                          TitleFlex
                          title={persona.persona}
                          keywords={persona.keywords || []}
                          isBasic={true}
                          checked={true}
                          onSelect={() => handlePersonaToggle(persona, true)}
                          gender={gender}
                          age={age}
                          job={job}
                          newLine={true}
                        />
                      );
                    })}

                    <Title style={{ marginTop: "20px" }}>
                      <p>Available</p>
                    </Title>
                    {personaListState.unselected.map((persona, index) => {
                      const profileArray = persona.profile
                        .replace(/['\[\]]/g, "")
                        .split(", ");
                      const age = profileArray[0].split(": ")[1];
                      const gender =
                        profileArray[1].split(": ")[1] === "남성"
                          ? "남성"
                          : "여성";
                      const job = profileArray[2].split(": ")[1];

                      return (
                        <MoleculePersonaCard
                          key={index}
                          TitleFlex
                          title={persona.persona}
                          keywords={persona.keywords || []}
                          isBasic={true}
                          checked={false}
                          onSelect={() => handlePersonaToggle(persona, false)}
                          gender={gender}
                          age={age}
                          job={job}
                          newLine={true}
                        />
                      );
                    })}
                  </>
                }
              />
            )}

            {showInterviewReady && (
              <PopupWrap
                Check
                title="인터뷰 준비 완료"
                message={
                  <>
                    인터뷰 룸 이동 시, 바로 시작됩니다.
                    <br />
                    인터뷰를 중단하면 모든 내역이 삭제되니 주의하세요
                  </>
                }
                buttonType="Outline"
                closeText="취소"
                confirmText="시작하기"
                isModal={false}
                onCancel={handlePopupClose}
                onConfirm={() => {
                  handleEnterInterviewRoom();
                }}
              />
            )}

            {showToast && (
              <OrganismToastPopup
                isActive={showToast}
                onClose={() => setShowToast(false)}
              />
            )}

            {showInterviewTypeAlert && (
              <PopupWrap
                Warning
                title="인터뷰 방식을 선택해주세요"
                message="인터뷰 목적을 선택하기 전에 인터뷰 방식을 먼저 선택해주세요."
                buttonType="Outline"
                confirmText="확인"
                isModal={false}
                onCancel={() => setShowInterviewTypeAlert(false)}
                onConfirm={() => setShowInterviewTypeAlert(false)}
              />
            )}
          </PersonaSingleWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePersona3Single;

const PersonaSingleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;


const CustomizationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  cursor: pointer;

  > div {
    width: 100%;
  }

  button span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid ${palette.gray700};

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 1px;
      background: ${palette.gray700};
      content: "";
    }

    &::after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
`;



const PersonaCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 24px 24px 24px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

