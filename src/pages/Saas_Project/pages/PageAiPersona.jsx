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
import { Button, ButtonGroup } from "../../../assets/styles/ButtonStyle";
import { CheckBox } from "../../../assets/styles/Input";
import {
  CustomTextarea,
  SelectBox,
  SelectBoxTitle,
  SelectBoxList,
  SelectBoxItem,
  FormBox,
  CustomInput,
} from "../../../assets/styles/InputStyle";
import {
  ContentsWrap,
  MainContent,
  TabWrapType3,
  TabButtonType3,
  AiPersonaCardGroupWrap,
  AiPersonaCardListItem,
  AiPersonaCardButtonWrap,
  UniqueTag,
  TabWrapType2,
  TabButtonType2,
  TabContent,
  InterviewPopup,
  PopupTitle,
  PopupTitle2,
  PopupContent,
  BgBoxItem,
  OCEANRangeWrap,
  RangeSlider,
  BoxWrap,
} from "../../../assets/styles/BusinessAnalysisStyle";
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
  Caption2,
  InputText,
} from "../../../assets/styles/Typography";
import OrganismEmptyPersona from "../components/organisms/OrganismEmptyPersona";

import {
  createPersonaOnServer,
  updatePersonaOnServer,
  getPersonaOnServer,
  getPersonaListOnServer,
  deletePersonaOnServer,
  InterviewXPersonaMacroSegmentRequest,
  InterviewXPersonaUniqueUserRequest,
  InterviewXPersonaKeyStakeholderRequest,
  InterviewXPersonaProfileRequest,
} from "../../../utils/indexedDB";

import OrganismPersonaCardList from "../components/organisms/OrganismPersonaCardList";
import {
  PROJECT_PERSONA_LIST,
  PROJECT_ID,
  PERSONA_LIST_SAAS,
  PROJECT_SAAS,
} from "../../../pages/AtomStates";
import AtomPersonaLoader from "../../Global/atoms/AtomPersonaLoader";

const PageAiPersona = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useAtom(PROJECT_SAAS);
  const [projectPersonaList, setProjectPersonaList] =
    useAtom(PROJECT_PERSONA_LIST);

  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [personaListSaas, setPersonaListSaas] = useAtom(PERSONA_LIST_SAAS);

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isCustomizePopupOpen, setIsCustomizePopupOpen] = useState(false);
  const [isPersonaConfirmPopupOpen, setIsPersonaConfirmPopupOpen] =
    useState(false);

  const [isStarred, setIsStarred] = useState(false);
  const [activeTab2, setActiveTab2] = useState("lifestyle");
  const [showPopup, setShowPopup] = useState(false);
  const [isPersonaEditPopupOpen, setIsPersonaEditPopupOpen] = useState(false);
  const [currentPersona, setCurrentPersona] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabIndex1, setActiveTabIndex1] = useState(0);

  const [genderRef, setGenderRef] = useState(null);
  const [ageGroupRef, setAgeGroupRef] = useState(null);
  const [businessRef, setBusinessRef] = useState(null);
  const [uniqueUserRef, setUniqueUserRef] = useState(null);
  const [keyStakeholderRef, setKeyStakeholderRef] = useState(null);
  const [purpose, setPurpose] = useState(null);

  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "macro_segment"
  );

  const [personaStats, setPersonaStats] = useState({
    active: 0,
    inactive: 0,
    generating: 0,
  });

  // customPersonaForm 상태 추가
  const [customPersonaForm, setCustomPersonaForm] = useState({
    gender: "",
    ageGroups: [],
    purpose: "",
    additionalInfo: "",
  });

  // 기본정보 탭의 입력 필드들을 위한 상태 추가
  const [basicInfo, setBasicInfo] = useState({
    gender: "",
    age: "",
    mainFeature: "",
    relatedInfo: "",
  });

  // 새로운 상태 추가
  const [tabInputs, setTabInputs] = useState({
    lifestyle: "",
    interests: "",
    consumption: "",
    productExperience: "",
  });

  const handleEditClose = () => {
    setIsEditPopupOpen(false);
  };
  const handleEditContinue = () => {
    setIsEditPopupOpen(false);
    setShowPopup(false);
    setActiveTabIndex(0);

    setTimeout(() => {
      setIsPersonaEditPopupOpen(true);
      setActiveTabIndex1(0);
    }, 100);
  };

  const handleCreateContinue = () => {
    setIsCreatePopupOpen(false);
  };

  const handleCustomizePopupClose = () => {
    setIsCustomizePopupOpen(false);
    setActiveTabIndex(0);
  };

  const handleCustomizePopupConfirm = () => {
    if (activeTabIndex === 0) {
      if (isCustomizeFormValid()) {
        setActiveTabIndex(1);
      }
    } else if (activeTabIndex === 1) {
      // OCEAN 정보 탭
      setActiveTabIndex(2); // 요청사항확인 탭으로 이동
    } else {
      setIsCustomizePopupOpen(false);
    }
  };

  const handlePersonaEditClose = () => {
    setIsPersonaEditPopupOpen(false);
    setActiveTabIndex1(0);
  };

  const handlePersonaEditContinue = () => {
    if (activeTabIndex1 < 4) {
      // 마지막 탭이 아닐 경우
      setActiveTabIndex1(activeTabIndex1 + 1); // 다음 탭으로 이동
    } else {
      // 마지막 탭일 경우
      setIsPersonaEditPopupOpen(false); // 편집 팝업 닫기
      setIsPersonaConfirmPopupOpen(true); // 확인 팝업 열기
    }
  };

  const handleTabChange = (index) => {
    setActiveTabIndex1(index);
  };

  const [oceanValues, setOceanValues] = useState({
    openness: 0.5,
    conscientiousness: 0.5,
    extraversion: 0.5,
    agreeableness: 0.5,
    neuroticism: 0.5,
  });

  const handleOceanChange = (trait, value) => {
    // 값을 0 또는 1로 스냅
    const snappedValue = Number(value) <= 0.5 ? 0 : 1;

    setOceanValues((prev) => ({
      ...prev,
      [trait]: snappedValue,
    }));
  };

  const [ignoreOcean, setIgnoreOcean] = useState(false);

  const handleIgnoreOcean = (e) => {
    setIgnoreOcean(e.target.checked);
  };

  const [selectBoxStates, setSelectBoxStates] = useState({
    gender: false,
    ageGroup: false,
    business: false,
    uniqueUser: false,
    keyStakeholder: false,
  });

  const [selectBoxStates1, setSelectBoxStates1] = useState({
    experience: false,
    interests: false,
    consumption: false,
  });

  const [selectedValues, setSelectedValues] = useState({
    gender: "",
    ageGroup: "",
    business: "",
    uniqueUser: "",
    keyStakeholder: "",
  });

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // 입력 필드 onChange 핸들러
  const handleBasicInfoChange = (field, value) => {
    setBasicInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 입력 핸들러 추가
  const handleTabInputChange = (field, value) => {
    setTabInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const loadPersonaList = async () => {
      try {
        const savedPersonaListInfo = await getPersonaListOnServer(
          projectId,
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
      } catch (error) {
        console.error("프로젝트 목록을 불러오는데 실패했습니다:", error);
      }
    };
    loadPersonaList();
  }, []);

  const toggleSelectBox = (type) => {
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handlePurposeSelect = (value, type) => {
    setSelectedValues((prev) => ({
      ...prev,
      [type]: value,
    }));
    setSelectBoxStates((prev) => ({
      ...prev,
      [type]: false,
    }));

    // customPersonaForm도 함께 업데이트
    if (type === "gender") {
      handleFormChange("gender", value === "남성" ? "male" : "female");
    } else if (type === "age") {
      handleFormChange("ageGroups", value.split(", "));
    }
  };

  // handleFormChange 함수 수정
  const handleFormChange = (field, value) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // isCustomizeFormValid 함수 추가 (AI 페르소나 요청 팝업용)
  const isCustomizeFormValid = () => {
    if (activeTabIndex === 0) {
      return (
        customPersonaForm.gender !== "" &&
        customPersonaForm.ageGroups.length > 0 &&
        customPersonaForm.purpose.trim() !== "" &&
        customPersonaForm.additionalInfo.trim() !== ""
      );
    } else if (activeTabIndex === 1) {
      return true; // OCEAN 정보는 선택사항
    }
    return true;
  };

  const updatePersonaList = async (updatedList) => {
    // 업데이트된 리스트가 배열인 경우 직접 설정
    if (Array.isArray(updatedList)) {
      setPersonaListSaas(updatedList);
      return;
    }

    // 그렇지 않은 경우 서버에서 최신 데이터 다시 불러오기
    try {
      const refreshedData = await getPersonaListOnServer(projectId, true);
      if (refreshedData) {
        const sortedList = [...refreshedData].sort((a, b) => {
          const dateA = a.timestamp;
          const dateB = b.timestamp;
          return dateB - dateA; // 최신 날짜가 위로
        });

        setPersonaListSaas(sortedList);
      }
    } catch (error) {
      console.error("페르소나 목록을 새로고침하는데 실패했습니다:", error);
    }
  };

  // isPersonaEditFormValid 함수 추가 (페르소나 편집 팝업용)
  const isPersonaEditFormValid = () => {
    if (activeTabIndex1 === 0) {
      return (
        basicInfo.gender.trim() !== "" &&
        basicInfo.age.trim() !== "" &&
        basicInfo.mainFeature.trim() !== "" &&
        basicInfo.relatedInfo.trim() !== ""
      );
    } else if (activeTabIndex1 === 1) {
      return tabInputs.lifestyle.trim() !== "";
    } else if (activeTabIndex1 === 2) {
      return tabInputs.interests.trim() !== "";
    } else if (activeTabIndex1 === 3) {
      return tabInputs.consumption.trim() !== "";
    } else if (activeTabIndex1 === 4) {
      return (
        selectedValues.experience &&
        selectedValues.usage &&
        tabInputs.productExperience?.trim() !== ""
      );
    }
    return true;
  };

  // handlePrevTab 함수 수정
  const handlePrevTab = () => {
    setActiveTabIndex1(activeTabIndex1 - 1); // activeTabIndex1을 감소시켜 이전 탭으로 이동
  };

  // 컴포넌트가 마운트될 때 전달받은 탭으로 설정
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // 페르소나 팝업을 열 때 프로필 정보를 가져오는 함수 수정
  const openPersonaPopup = async (persona) => {
    setCurrentPersona(persona);
    setShowPopup(true);
    setIsLoading(true);

    console.log("🚀 ~ openPersonaPopup ~ persona:", persona);
    const persona_info = {
      personaType: persona.type,
      personaName: persona.personaName,
      personaCharacteristics: persona.personaCharacteristics || "",
      keywords: persona.keywords || [],
      age: persona.age || "",
      gender: persona.gender || "",
      job: persona.job || "",
    };
    try {
      if (persona.status === "profile") {
        setIsLoading(false);
        return;
      }
      // 페르소나 기초 데이터로 프로필 정보 생성 API 호출
      const isLoggedIn = sessionStorage.getItem("accessToken") !== null;
      const profileData = await InterviewXPersonaProfileRequest(
        {
          business_description:
            project.projectAnalysis.business_analysis +
            (project.projectAnalysis.file_analysis || ""),
          persona_info,
          // 필요한 추가 데이터가 있다면 여기에 추가
        },
        isLoggedIn
      );

      if (profileData) {
        const updatedPersona = {
          id: persona._id,
          experienceDepth:
            profileData.response.persona_profile.experience_depth,
          lifestyle: profileData.response.persona_profile.lifestyle,
          monthlyIncome: profileData.response.persona_profile.monthly_income,
          residence: profileData.response.persona_profile.residence,
          userExperience: profileData.response.persona_profile.user_experience,
          interests: profileData.response.persona_profile.interests,
          consumptionPattern:
            profileData.response.persona_profile.consumption_pattern,
          usageDepth: profileData.response.persona_profile.usage_depth,
          status: "profile",
        };

        // 서버에 업데이트된 페르소나 저장
        await updatePersonaOnServer(updatedPersona, true);

        // 페르소나 리스트 새로고침
        await refreshPersonaList();

        setCurrentPersona({ ...persona, ...updatedPersona });
        // 활성 탭 설정
        setActiveTab2("lifestyle");
      }
    } catch (error) {
      console.error("페르소나 프로필 정보를 가져오는데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페르소나 리스트를 새로고침하는 함수 추가
  const refreshPersonaList = async () => {
    try {
      const refreshedData = await getPersonaListOnServer(projectId, true);
      if (refreshedData) {
        const sortedList = [...refreshedData].sort((a, b) => {
          const dateA = a.timestamp;
          const dateB = b.timestamp;
          return dateB - dateA; // 최신 날짜가 위로
        });

        setPersonaListSaas(sortedList);

        // 페르소나 통계 업데이트
        const activeCount = sortedList.filter(
          (persona) => persona?.status === "complete"
        ).length;

        const inactiveCount = sortedList.filter(
          (persona) =>
            persona?.status !== "complete" && persona?.status !== "ing"
        ).length;

        setPersonaStats({
          active: activeCount,
          inactive: inactiveCount,
          generating: 0,
        });
      }
    } catch (error) {
      console.error("페르소나 목록을 새로고침하는데 실패했습니다:", error);
    }
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />
        <MoleculeHeader />

        <MainContent Wide1240>
          <AiPersonaWrap>
            <AiPersonaTitle>
              <div>
                <H1 color="gray800" align="left">
                  AI Persona
                </H1>
                <div style={{ height: "10px" }}></div>
                <Body3 color="gray700" align="left">
                  당신의 비즈니스에 새로운 인사이트를 제시해줄 AI 페르소나가
                  대화를 기다리고 있어요
                </Body3>
              </div>

              <Button
                exLarge
                PrimaryLightest
                Fill
                onClick={() => {
                  setActiveTabIndex(0);
                  setIsCustomizePopupOpen(true);
                }}
              >
                <img src={images.PlusPrimary} width="14" height="14" />
                <Sub1 color="primary">나만의 AI Persona 요청</Sub1>
              </Button>
            </AiPersonaTitle>

            {personaListSaas && personaListSaas.length > 0 ? (
              <AiPersonaContent>
                <TabWrapType3 Border>
                  <TabButtonType3
                    className={activeTab === "macro_segment" ? "active" : ""}
                    onClick={() => handleTabClick("macro_segment")}
                    style={
                      activeTab === "macro_segment"
                        ? { color: "#333333" }
                        : { color: "#999999" }
                    }
                  >
                    Macro Segment
                  </TabButtonType3>
                  <TabButtonType3
                    className={activeTab === "unique_user" ? "active" : ""}
                    onClick={() => handleTabClick("unique_user")}
                    style={
                      activeTab === "unique_user"
                        ? { color: "#333333" }
                        : { color: "#999999" }
                    }
                  >
                    Unique User
                  </TabButtonType3>
                  <TabButtonType3
                    className={activeTab === "key_stakeholder" ? "active" : ""}
                    onClick={() => handleTabClick("key_stakeholder")}
                    style={
                      activeTab === "key_stakeholder"
                        ? { color: "#333333" }
                        : { color: "#999999" }
                    }
                  >
                    Key Stakeholder
                  </TabButtonType3>
                  <TabButtonType3
                    className={activeTab === "my_persona" ? "active" : ""}
                    onClick={() => handleTabClick("my_persona")}
                    style={
                      activeTab === "my_persona"
                        ? { color: "#333333", fontWeight: "600" }
                        : { color: "#999999" }
                    }
                  >
                    My Persona
                  </TabButtonType3>
                </TabWrapType3>

                <AiPersonaInfo>
                  <div>
                    <span className="active">
                      <Sub3 color="primary">{personaStats.active}</Sub3>
                    </span>
                    <Sub3 color="gray700">활성 페르소나</Sub3>
                  </div>
                  {/* <div>
                    <span className="generating">
                      <Sub3 color="primary">{personaStats.generating}</Sub3>
                    </span>
                    <Sub3 color="gray700">생성 중</Sub3>
                  </div> */}
                  <div>
                    <span className="inactive">
                      <Sub3 color="primary">{personaStats.inactive}</Sub3>
                    </span>
                    <Sub3 color="gray700">비활성 페르소나</Sub3>
                  </div>
                </AiPersonaInfo>

                <OrganismPersonaCardList
                  personaData={personaListSaas}
                  setIsStarred={updatePersonaList}
                  setShowPopup={openPersonaPopup}
                  activeTab={activeTab}
                  setPersonaStats={setPersonaStats}
                />
              </AiPersonaContent>
            ) : (
              <OrganismEmptyPersona />
            )}
          </AiPersonaWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <>
          <InterviewPopup>
            <div style={{ maxWidth: "560px" }}>
              <div className="header">
                <H4>
                  {currentPersona?.personaName || "시간이 부족한 바쁜 프리랜서"}
                  <span className="close" onClick={() => setShowPopup(false)} />
                </H4>
                <p className="info noLine">
                  <Sub3>#{currentPersona?.gender || "남성"}</Sub3>
                  <Sub3>#{currentPersona?.age || "20세"}</Sub3>
                  <Sub3>
                    #{currentPersona?.keywords[0] || "은퇴 후 건강 관리에 집중"}
                  </Sub3>
                  <Sub3>
                    #{currentPersona?.keywords[1] || "부드러운 기상 선호"}
                  </Sub3>
                </p>
              </div>

              <div className="content">
                {isLoading ? (
                  <AtomPersonaLoader message="페르소나 프로필을 생성하고 있습니다." />
                ) : (
                  <>
                    <TabWrapType2>
                      <TabButtonType2
                        isActive={activeTab2 === "lifestyle"}
                        onClick={() => setActiveTab2("lifestyle")}
                      >
                        라이프스타일
                      </TabButtonType2>
                      <TabButtonType2
                        isActive={activeTab2 === "interests"}
                        onClick={() => setActiveTab2("interests")}
                      >
                        관심사
                      </TabButtonType2>
                      <TabButtonType2
                        isActive={activeTab2 === "consumption"}
                        onClick={() => setActiveTab2("consumption")}
                      >
                        소비성향
                      </TabButtonType2>
                      <TabButtonType2
                        isActive={activeTab2 === "experience"}
                        onClick={() => setActiveTab2("experience")}
                      >
                        사용경험
                      </TabButtonType2>
                    </TabWrapType2>

                    {activeTab2 === "lifestyle" && (
                      <TabContent>
                        <Body3 color="gray700">
                          {currentPersona.lifestyle ||
                            "학업과 여가를 균형 있게 추구하며, 문화적 호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다."}
                        </Body3>
                      </TabContent>
                    )}
                    {activeTab2 === "interests" && (
                      <TabContent>
                        <Body3 color="gray700">
                          {currentPersona.interests ||
                            "학업과 여가를 균형 있게 추구하며, 문화적 호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다."}
                        </Body3>
                      </TabContent>
                    )}
                    {activeTab2 === "consumption" && (
                      <TabContent>
                        <Body3 color="gray700">
                          {currentPersona.consumptionPattern ||
                            "학업과 여가를 균형 있게 추구하며, 문화적 호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다."}
                        </Body3>
                      </TabContent>
                    )}
                    {activeTab2 === "experience" && (
                      <TabContent>
                        <Body3 color="gray700">
                          {currentPersona.userExperience ||
                            "학업과 여가를 균형 있게 추구하며, 문화적 호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다."}
                        </Body3>
                      </TabContent>
                    )}
                  </>
                )}
              </div>

              <ButtonGroup>
                <Button
                  DbExLarge
                  PrimaryLightest
                  Fill
                  W100
                  onClick={() => setIsEditPopupOpen(true)}
                >
                  페르소나 편집
                </Button>
                <Button
                  DbExLarge
                  Primary
                  Fill
                  W100
                  onClick={() => setIsCreatePopupOpen(true)}
                >
                  페르소나 생성
                </Button>
              </ButtonGroup>
            </div>
          </InterviewPopup>
        </>
      )}

      {isEditPopupOpen && (
        <PopupWrap
          Warning
          title="편집을 진행하면 기존 페르소나가 삭제됩니다"
          message="편집 후에는 복구 할 수 없으니, 변경 전 확인해주세요"
          buttonType="Outline"
          closeText="취소"
          confirmText="페르소나 편집"
          isModal={false}
          onCancel={handleEditClose}
          onConfirm={() => {
            setIsEditPopupOpen(false);
            setShowPopup(false);
            setIsCreatePopupOpen(false);
            setIsCustomizePopupOpen(false);
            setIsPersonaEditPopupOpen(true);
          }}
        />
      )}

      {isCreatePopupOpen && (
        <PopupWrap
          Warning
          title="사용경험에 대한 내용을 입력해주세요"
          message="사용경험에 대한 내용은 필수입력 항목입니다"
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={handleCreateContinue}
        />
      )}

      {isCustomizePopupOpen && (
        <PopupWrap
          TitleFlex
          title="📝 나만의 AI Person 요청하기"
          buttonType="Fill"
          confirmText={
            activeTabIndex === 0
              ? "다음"
              : activeTabIndex === 1
              ? "다음"
              : "맞춤 페르소나 모집하기"
          }
          showPrevButton={activeTabIndex === 2} // 마지막 탭에서만 이전 버튼 표시
          prevText="이전"
          onPrev={handlePrevTab}
          isModal={true}
          onCancel={handleCustomizePopupClose}
          onConfirm={handleCustomizePopupConfirm}
          showTabs={true}
          tabs={["필수정보", "OCEAN 정보", "요청사항확인"]}
          onTabChange={handleTabChange}
          activeTab={activeTabIndex}
          eventState={false}
          creditRequestCustomPersona={100}
          isFormValid={isCustomizeFormValid()}
          body={
            <div>
              {activeTabIndex === 0 && (
                <>
                  <div className="flex">
                    <div>
                      <Body2 color="gray700" align="left">
                        성별<span style={{ color: "red" }}>*</span>
                      </Body2>

                      <SelectBox>
                        <SelectBoxTitle
                          onClick={() => toggleSelectBox("gender")}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            {customPersonaForm.gender && (
                              <img
                                src={
                                  customPersonaForm.gender === "male"
                                    ? images.GenderMenPrimary
                                    : images.GenderWomenPrimary
                                }
                                alt="성별"
                                style={{ width: "25px", height: "25px" }}
                              />
                            )}
                            <Body2
                              color={
                                customPersonaForm.gender ? "primary" : "gray300"
                              }
                            >
                              {customPersonaForm.gender === "male"
                                ? "남성"
                                : customPersonaForm.gender === "female"
                                ? "여성"
                                : "선택해주세요"}
                            </Body2>
                          </div>
                          <images.ChevronDown
                            width="24px"
                            height="24px"
                            color={palette.gray500}
                            style={{
                              transform: selectBoxStates.gender
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </SelectBoxTitle>

                        {selectBoxStates.gender && (
                          <SelectBoxList>
                            <SelectBoxItem
                              onClick={() => {
                                handleFormChange("gender", "male");
                                handlePurposeSelect("남성", "gender");
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                남성
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                handleFormChange("gender", "female");
                                handlePurposeSelect("여성", "gender");
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                여성
                              </Body2>
                            </SelectBoxItem>
                          </SelectBoxList>
                        )}
                      </SelectBox>
                    </div>

                    <div>
                      <Body2 color="gray700" align="left">
                        연령<span style={{ color: "red" }}>*</span>
                      </Body2>

                      <SelectBox>
                        <SelectBoxTitle onClick={() => toggleSelectBox("age")}>
                          <Body2
                            color={selectedValues.age ? "gray800" : "gray300"}
                          >
                            {selectedValues.age || "선택해주세요"}
                          </Body2>
                          <images.ChevronDown
                            width="24px"
                            height="24px"
                            color={palette.gray500}
                            style={{
                              transform: selectBoxStates.age
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </SelectBoxTitle>

                        {selectBoxStates.age && (
                          <SelectBoxList>
                            <SelectBoxItem
                              onClick={() => {
                                const newAgeGroups = [
                                  ...customPersonaForm.ageGroups,
                                ];
                                const index = newAgeGroups.indexOf("20대");
                                if (index === -1) {
                                  newAgeGroups.push("20대");
                                } else {
                                  newAgeGroups.splice(index, 1);
                                }
                                handleFormChange("ageGroups", newAgeGroups);
                                handlePurposeSelect(
                                  newAgeGroups.join(", "),
                                  "age"
                                );
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                20대
                              </Body2>
                            </SelectBoxItem>
                            <SelectBoxItem
                              onClick={() => {
                                const newAgeGroups = [
                                  ...customPersonaForm.ageGroups,
                                ];
                                const index = newAgeGroups.indexOf("30대");
                                if (index === -1) {
                                  newAgeGroups.push("30대");
                                } else {
                                  newAgeGroups.splice(index, 1);
                                }
                                handleFormChange("ageGroups", newAgeGroups);
                                handlePurposeSelect(
                                  newAgeGroups.join(", "),
                                  "age"
                                );
                              }}
                            >
                              <Body2 color="gray700" align="left">
                                30대
                              </Body2>
                            </SelectBoxItem>
                          </SelectBoxList>
                        )}
                      </SelectBox>
                    </div>
                  </div>

                  <div>
                    <Body2 color="gray700" align="left">
                      맞춤 페르소나를 생성하는 이유와 목적이 무엇인가요?
                      <span style={{ color: "red" }}>*</span>
                    </Body2>
                    <PopupContent>
                      <CustomTextarea
                        width="100%"
                        rows={5}
                        placeholder="이유와 목적을 알려주시면 상황에 걸맞은 최적의 페르소나를 생성해 드려요!"
                        value={customPersonaForm.purpose}
                        onChange={(e) =>
                          handleFormChange("purpose", e.target.value)
                        }
                      />
                    </PopupContent>
                  </div>

                  <div>
                    <Body2 color="gray700" align="left">
                      필수적으로 필요한 정보가 있다면, 알려주세요{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Body2>
                    <PopupContent>
                      <CustomTextarea
                        width="100%"
                        rows={5}
                        placeholder="필수로 고려해야할 정보가 있다면 작성해주세요."
                        value={customPersonaForm.additionalInfo}
                        onChange={(e) =>
                          handleFormChange("additionalInfo", e.target.value)
                        }
                      />
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex === 1 && (
                <>
                  <BgBoxItem NoOutline style={{ marginBottom: "10px" }}>
                    <Sub3 color="gray500" align="left">
                      OCEAN이란?
                      <br />
                      성격 심리학에서 인간의 성격을 설명하는 다섯 요인
                      창의성(Openness), 성실성(Conscientiouseness),
                      외향성(Extraversion), 친화성(Agreeableness), 정서적
                      안정성(Neuroticism)을 평가하는 방법입니다.
                    </Sub3>
                  </BgBoxItem>

                  <OCEANRangeWrap>
                    <div>
                      <Body3 color="gray800">보수적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.openness}
                        onChange={(e) =>
                          handleOceanChange("openness", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">개방적</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">즉흥적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.conscientiousness}
                        onChange={(e) =>
                          handleOceanChange("conscientiousness", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">성실함</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">내향적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.extraversion}
                        onChange={(e) =>
                          handleOceanChange("extraversion", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">외향적</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">독립적</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.agreeableness}
                        onChange={(e) =>
                          handleOceanChange("agreeableness", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">우호적</Body3>
                    </div>
                    <div>
                      <Body3 color="gray800">무던함</Body3>
                      <RangeSlider
                        type="range"
                        min="0"
                        max="1"
                        step="0.5"
                        value={oceanValues.neuroticism}
                        onChange={(e) =>
                          handleOceanChange("neuroticism", e.target.value)
                        }
                        disabled={ignoreOcean}
                        $ignored={ignoreOcean}
                      />
                      <Body3 color="gray800">신경적</Body3>
                    </div>
                  </OCEANRangeWrap>

                  <div style={{ marginTop: "12px", textAlign: "left" }}>
                    <CheckBox Fill>
                      <input
                        type="checkbox"
                        id="chk1"
                        checked={ignoreOcean}
                        onChange={handleIgnoreOcean}
                      />
                      <label htmlFor="chk1">
                        페르소나의 성격 유형을 랜덤으로 생성 하겠습니다.
                      </label>
                    </CheckBox>
                  </div>
                </>
              )}

              {activeTabIndex === 2 && (
                <>
                  <BgBoxItem
                    NoOutline
                    style={{ marginBottom: "10px", alignItems: "flex-start" }}
                  >
                    <Sub3 color="gray500" align="left">
                      💡 맞춤 페르소나 요청이 많은 경우,
                      <br />
                      페르소나 생성 시간이 다소 길어질 수 있는 점 양해
                      부탁드립니다.
                      <br />
                      보다 정확하고 정교한 페르소나를 제공해 드릴 수 있도록
                      최선을 다하겠습니다. 😊
                    </Sub3>
                  </BgBoxItem>

                  <div className="flex">
                    <div>
                      <Body3 color="gray500" align="left">
                        성별
                      </Body3>
                      <Body2 color="gray800" align="left">
                        남자
                      </Body2>
                    </div>

                    <div>
                      <Body3 color="gray500" align="left">
                        연령
                      </Body3>
                      <Body2 color="gray800" align="left">
                        20대
                      </Body2>
                    </div>
                  </div>

                  <div>
                    <Body3 color="gray500" align="left">
                      이유, 목적
                    </Body3>
                    <Body2 color="gray800" align="left">
                      여러가지 이유와 목적을 작성하시면 됩니다.
                      <br />
                      해당 내용이 길어질 수 있습니다.
                    </Body2>
                  </div>

                  <div>
                    <Body3 color="gray500" align="left">
                      필수정보
                    </Body3>
                    <Body2 color="gray800" align="left">
                      여러가지 내용이 들어갈 수 있는 다양한 정보를 보여줍니다.
                      너무 많은 내용은 줄 바꿈이 필요 합니다. 당연히 두줄도 가능
                      합니다. 너무 많은 내용은 힘들 수 있습니다.
                      <br />
                      물론 세줄까지도!! 가능 할지도 모릅니다. 하지만 이 이상은
                      정말 힘들기 때문에 자제..{" "}
                    </Body2>
                  </div>

                  <div>
                    <Body3 color="gray500" align="left">
                      성격(OCEAN)
                    </Body3>
                    <div className="box-list">
                      <div>
                        <Body2 color="gray800">개방적</Body2>
                        <Sub3 color="gray300">open mind</Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">즉흥적</Body2>
                        <Sub3 color="gray300">impromptu</Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">내향적</Body2>
                        <Sub3 color="gray300">introvert</Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">우호적</Body2>
                        <Sub3 color="gray300">friendly</Sub3>
                      </div>
                      <div>
                        <Body2 color="gray800">무던함</Body2>
                        <Sub3 color="gray300">simple</Sub3>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          }
        />
      )}

      {isPersonaEditPopupOpen && (
        <PopupWrap
          TitleFlex
          title="시간이 부족한 바쁜 프리랜서"
          buttonType="Fill"
          confirmText={
            activeTabIndex1 === 4 // 마지막 탭(4)일 때만 "변경사항 저장하기"
              ? "변경사항 저장하기"
              : "다음" // 나머지 탭(0~3)에서는 "다음"
          }
          showPrevButton={activeTabIndex1 !== 0}
          prevText={activeTabIndex1 !== 0 ? "뒤로" : ""}
          prevTextSmall
          onPrev={handlePrevTab}
          isModal={true}
          onCancel={handlePersonaEditClose}
          onConfirm={handlePersonaEditContinue}
          showTabs={true}
          tabs={["기본정보", "라이프스타일", "관심사", "소비성향", "제품경험"]}
          onTabChange={handleTabChange}
          activeTab={activeTabIndex1}
          eventState={false}
          creditRequestCustomPersona={100}
          isFormValid={isPersonaEditFormValid()}
          bottomText={
            activeTabIndex1 === 4
              ? "AI Person의 제품 경험은 경험여부와 사용수준에 따라 달라질 수 있습니다"
              : null
          }
          body={
            <div>
              {activeTabIndex1 === 0 && (
                <>
                  <div>
                    <Body1 color="gray700" align="left">
                      성별
                    </Body1>
                    <PopupContent>
                      <FormBox>
                        <CustomInput
                          Edit
                          type="text"
                          placeholder="성별"
                          value={basicInfo.gender}
                          onChange={(e) =>
                            handleBasicInfoChange("gender", e.target.value)
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>

                  <div>
                    <Body1 color="gray700" align="left">
                      나이
                    </Body1>
                    <PopupContent>
                      <FormBox>
                        <CustomInput
                          Edit
                          type="text"
                          placeholder="나이"
                          value={basicInfo.age}
                          onChange={(e) =>
                            handleBasicInfoChange("age", e.target.value)
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>

                  <div>
                    <Body1 color="gray700" align="left">
                      주요 특징
                    </Body1>
                    <PopupContent>
                      <FormBox>
                        <CustomInput
                          Edit
                          type="text"
                          placeholder="주요 특징"
                          value={basicInfo.mainFeature}
                          onChange={(e) =>
                            handleBasicInfoChange("mainFeature", e.target.value)
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>

                  <div>
                    <Body1 color="gray700" align="left">
                      관련 정보
                    </Body1>
                    <PopupContent>
                      <FormBox>
                        <CustomTextarea
                          Edit
                          placeholder="관련 정보"
                          value={basicInfo.relatedInfo}
                          onChange={(e) =>
                            handleBasicInfoChange("relatedInfo", e.target.value)
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex1 === 1 && (
                <>
                  <div>
                    <PopupContent>
                      <FormBox>
                        <CustomTextarea
                          Edit
                          rows={16}
                          placeholder="라이프스타일"
                          value={tabInputs.lifestyle}
                          onChange={(e) =>
                            handleTabInputChange("lifestyle", e.target.value)
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex1 === 2 && (
                <>
                  <div>
                    <PopupContent>
                      <FormBox>
                        <CustomTextarea
                          Edit
                          rows={16}
                          placeholder="관심사"
                          value={tabInputs.interests}
                          onChange={(e) =>
                            handleTabInputChange("interests", e.target.value)
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex1 === 3 && (
                <>
                  <div>
                    <PopupContent>
                      <FormBox>
                        <CustomTextarea
                          Edit
                          rows={16}
                          placeholder="소비성향"
                          value={tabInputs.consumption}
                          onChange={(e) =>
                            handleTabInputChange("consumption", e.target.value)
                          }
                          status="valid"
                        />
                      </FormBox>
                    </PopupContent>
                  </div>
                </>
              )}

              {activeTabIndex1 === 4 && (
                <>
                  <BoxWrap Column Small>
                    <SelectBox>
                      <SelectBoxTitle
                        None
                        onClick={() => {
                          setSelectBoxStates1((prev) => ({
                            ...prev,
                            experience: !prev.experience,
                          }));
                        }}
                      >
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Body2 color="gray300">경험유무</Body2>
                          <Body2
                            color={
                              selectedValues.experience ? "gray700" : "gray300"
                            }
                          >
                            {selectedValues.experience || "선택해주세요"}
                          </Body2>
                        </div>
                        <images.ChevronDown
                          width="24px"
                          height="24px"
                          color={palette.gray500}
                          style={{
                            transform: selectBoxStates1.experience
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </SelectBoxTitle>

                      {selectBoxStates1.experience && (
                        <SelectBoxList>
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("experience", "experience1");
                              handlePurposeSelect(
                                "해당 제품/서비스를 들어본 적도 없음 ",
                                "experience"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                experience: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              해당 제품/서비스를 들어본 적도 없음
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("experience", "experience2");
                              handlePurposeSelect(
                                "들어본 적은 있지만, 사용해본 적은 없음 ",
                                "experience"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                experience: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              들어본 적은 있지만, 사용해본 적은 없음
                            </Body2>
                          </SelectBoxItem>

                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("experience", "experience3");
                              handlePurposeSelect(
                                "사용해본 적은 있지만, 한두 번 경험한 수준 ",
                                "experience"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                experience: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              사용해본 적은 있지만, 한두 번 경험한 수준
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("experience", "experience4");
                              handlePurposeSelect(
                                "몇 번 사용해봤고, 기능을 어느 정도 이해하고 있음 ",
                                "experience"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                experience: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              몇 번 사용해봤고, 기능을 어느 정도 이해하고 있음
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("experience", "experience5");
                              handlePurposeSelect(
                                "정기적으로 사용하고 있고, 익숙한 사용자 ",
                                "experience"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                experience: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              정기적으로 사용하고 있고, 익숙한 사용자
                            </Body2>
                          </SelectBoxItem>
                        </SelectBoxList>
                      )}
                    </SelectBox>

                    <SelectBox>
                      <SelectBoxTitle
                        None
                        onClick={() => {
                          setSelectBoxStates1((prev) => ({
                            ...prev,
                            usage: !prev.usage,
                          }));
                        }}
                      >
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Body2 color="gray300">사용수준</Body2>
                          <Body2
                            color={selectedValues.usage ? "gray700" : "gray300"}
                          >
                            {selectedValues.usage || "선택해주세요"}
                          </Body2>
                        </div>
                        <images.ChevronDown
                          width="24px"
                          height="24px"
                          color={palette.gray500}
                          style={{
                            transform: selectBoxStates1.usage
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </SelectBoxTitle>

                      {selectBoxStates1.usage && (
                        <SelectBoxList>
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("usage", "usage1");
                              handlePurposeSelect(
                                "기본적인 기능도 잘 모름 ",
                                "usage"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                usage: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              기본적인 기능도 잘 모름
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("usage", "usage2");
                              handlePurposeSelect(
                                "몇 가지 주요 기능만 사용",
                                "usage"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                usage: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              몇 가지 주요 기능만 사용
                            </Body2>
                          </SelectBoxItem>

                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("usage", "usage3");
                              handlePurposeSelect(
                                "대부분의 기능을 사용해 봤지만, 특정 기능은 모름  ",
                                "usage"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                usage: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              대부분의 기능을 사용해 봤지만, 특정 기능은 모름
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("usage", "usage4");
                              handlePurposeSelect(
                                "거의 모든 기능을 능숙하게 사용 ",
                                "usage"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                usage: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              거의 모든 기능을 능숙하게 사용
                            </Body2>
                          </SelectBoxItem>
                        </SelectBoxList>
                      )}
                    </SelectBox>
                  </BoxWrap>

                  <CustomTextarea
                    None
                    rows={12}
                    placeholder="제품경험"
                    value={tabInputs.productExperience}
                    onChange={(e) =>
                      handleTabInputChange("productExperience", e.target.value)
                    }
                    status="valid"
                  />
                </>
              )}
            </div>
          }
        />
      )}

      {isPersonaConfirmPopupOpen && (
        <PopupWrap
          Check
          title={
            <>
              페르소나 프로필이
              <br />
              변경되었습니다.
            </>
          }
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => {
            setIsPersonaConfirmPopupOpen(false);
          }}
        />
      )}
    </>
  );
};

export default PageAiPersona;

const AiPersonaWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 54px;
  margin: 50px auto;
`;

const AiPersonaTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const AiPersonaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const AiPersonaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  > div {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 12px;
    border-radius: 5px;

    &.active {
      border: 1px solid ${palette.white};
      background: ${palette.primaryLightest};
    }

    &.inactive {
      border: 1px solid ${palette.primary};
      background: ${palette.white};
    }
  }
`;

const StarButton = styled.span`
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

const PersonaStatusWrap = styled.div`
  display: flex;
  gap: 24px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    // max-width: calc(100% / 3);
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
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
