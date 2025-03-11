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
  createRequestPersonOnServer,
  UserCreditCheck,
  UserCreditInfo,
  UserCreditUse,
  createRequestPersonaOnServer,
  getProjectByIdFromIndexedDB,
} from "../../../utils/indexedDB";

import OrganismPersonaCardList from "../components/organisms/OrganismPersonaCardList";
import {
  PROJECT_ID,
  PERSONA_LIST_SAAS,
  PROJECT_SAAS,
  IS_LOGGED_IN,
  USER_CREDITS,
  CREDIT_REQUEST_BUSINESS_PERSONA,
} from "../../../pages/AtomStates";
import AtomPersonaLoader from "../../Global/atoms/AtomPersonaLoader";

const PageAiPersona = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useAtom(PROJECT_SAAS);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const [personaListSaas, setPersonaListSaas] = useAtom(PERSONA_LIST_SAAS);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [creditRequestBusinessPersona] = useAtom(
    CREDIT_REQUEST_BUSINESS_PERSONA
  );

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isCustomizePopupOpen, setIsCustomizePopupOpen] = useState(false);
  const [isPersonaConfirmPopupOpen, setIsPersonaConfirmPopupOpen] =
    useState(false);

  const [selectedPersona, setSelectedPersona] = useState(null);

  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [activeTab2, setActiveTab2] = useState("lifestyle");
  const [showPopup, setShowPopup] = useState(false);
  const [isPersonaEditPopupOpen, setIsPersonaEditPopupOpen] = useState(false);
  const [currentPersona, setCurrentPersona] = useState({});

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

  const [customPersonaForm, setCustomPersonaForm] = useState({
    gender: "",
    ageGroups: [],
    purpose: "",
    additionalInfo: "",
  });

  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [eventState, setEventState] = useState(false);
  const [trialState, setTrialState] = useState(false);
  const [eventTitle, setEventTitle] = useState("이벤트 제목");

  const handleEditClose = () => {
    setIsEditPopupOpen(false);
  };

  const handleEditConfirmClose = () => {
    setIsPersonaConfirmPopupOpen(false);
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

  const handlePersonaEditUpdate = async () => {
    if (currentPersona) {
      const updatedPersona = {
        id: currentPersona._id,
        ...Object.fromEntries(
          Object.entries(currentPersona).filter(([key]) => key !== "_id")
        ),
      };

      // 서버에 업데이트된 페르소나 저장
      await updatePersonaOnServer(updatedPersona, true);

      // 페르소나 리스트 새로고침
      await refreshPersonaList();

      setCurrentPersona({ ...updatedPersona });
      // 활성 탭 설정
      setActiveTab2("lifestyle");
    }
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
    experienceDepth: false,
    usageDepth: false,
    consumptionPattern: false,
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

  const handleCurrentPersonaChange = (field, value) => {
    setCurrentPersona((prev) => ({
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

  const handleFormChange = (field, value) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

  const isPersonaEditFormValid = () => {
    if (activeTabIndex1 === 0) {
      return (
        currentPersona?.gender?.trim() !== "" &&
        currentPersona?.age?.trim() !== "" &&
        // currentPersona?.keywords?.trim() !== "" &&
        currentPersona?.personaCharacteristics?.trim() !== ""
      );
    } else if (activeTabIndex1 === 1) {
      return currentPersona?.lifestyle?.trim() !== "";
    } else if (activeTabIndex1 === 2) {
      return currentPersona?.interests?.trim() !== "";
    } else if (activeTabIndex1 === 3) {
      return currentPersona?.consumptionPattern?.trim() !== "";
    } else if (activeTabIndex1 === 4) {
      return (
        currentPersona?.experienceDepth &&
        currentPersona?.usageDepth &&
        currentPersona?.userExperience?.trim() !== ""
      );
    }
    return true;
  };

  const handlePrevTab = () => {
    setActiveTabIndex1(activeTabIndex1 - 1); // activeTabIndex1을 감소시켜 이전 탭으로 이동
  };

  const handlePrevTab2 = () => {
    setActiveTabIndex(activeTabIndex - 1); // activeTabIndex1을 감소시켜 이전 탭으로 이동
  };

  const handleRequestClick = (persona) => {
    setSelectedPersona(persona); // 선택된 페르소나 설정
    setShowRequestPopup(true); // 팝업 표시
  };

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const openPersonaPopup = async (persona) => {
    setCurrentPersona(persona);
    setShowPopup(true);
    setIsLoading(true);

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
      if (persona.status !== "default") {
        setIsLoading(false);
        return;
      }
      // 페르소나 기초 데이터로 프로필 정보 생성 API 호출
      const isLoggedIn = sessionStorage.getItem("accessToken") !== null;
      let profileData = await InterviewXPersonaProfileRequest(
        {
          business_description:
            project.projectAnalysis.business_analysis +
            (project.projectAnalysis.file_analysis || ""),
          persona_info,
          // 필요한 추가 데이터가 있다면 여기에 추가
        },
        isLoggedIn
      );
      console.log("🚀 ~ openPersonaPopup ~ profileData:", profileData);
      const max_attempt = 10;
      let attempt = 0;

      while (
        !profileData ||
        !profileData.response ||
        !profileData.response.persona_profile ||
        !profileData.response.persona_profile.experience_depth ||
        !profileData.response.persona_profile.lifestyle ||
        !profileData.response.persona_profile.monthly_income ||
        !profileData.response.persona_profile.residence ||
        !profileData.response.persona_profile.user_experience ||
        !profileData.response.persona_profile.interests ||
        !profileData.response.persona_profile.consumption_pattern ||
        !profileData.response.persona_profile.usage_depth ||
        !profileData.response.persona_profile.family
      ) {
        profileData = await InterviewXPersonaProfileRequest(
          {
            business_description:
              project.projectAnalysis.business_analysis +
              (project.projectAnalysis.file_analysis || ""),
            persona_info,
            // 필요한 추가 데이터가 있다면 여기에 추가
          },
          isLoggedIn
        );
        attempt++;

        if (attempt >= max_attempt) {
          throw new Error("프로필 정보 생성에 실패했습니다.");
          // 에러 팝업 추가
        }
      }

      if (profileData) {
        const updatedPersona = {
          id: persona._id,
          family: profileData.response.persona_profile.family,
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

  // 현재 선택된 탭에 따라 표시할 통계 정보 결정
  const getCurrentTabStats = () => {
    switch (activeTab) {
      case "macro_segment":
        return macroSegmentStats;
      case "unique_user":
        return uniqueUserStats;
      case "key_stakeholder":
        return keyStakeholderStats;
      case "my_persona":
        // 즐겨찾기된 페르소나만 필터링 (다양한 형태의 isStarred 값 처리)
        const starredPersonas = personaListSaas.filter(
          (persona) => persona?.favorite === true
        );

        console.log("즐겨찾기된 페르소나:", starredPersonas);

        // 즐겨찾기된 페르소나 중 활성 페르소나 수
        const activeStarred = starredPersonas.filter(
          (persona) => persona?.status === "complete"
        ).length;

        // 즐겨찾기된 페르소나 중 생성 중인 페르소나 수
        const generatingStarred = starredPersonas.filter(
          (persona) =>
            persona?.status === "ing" || persona?.status === "request"
        ).length;

        // 즐겨찾기된 페르소나 중 비활성 페르소나 수
        const inactiveStarred = starredPersonas.filter(
          (persona) =>
            persona?.status !== "complete" &&
            persona?.status !== "ing" &&
            persona?.status !== "request"
        ).length;

        return {
          active: activeStarred,
          generating: generatingStarred,
          inactive: inactiveStarred,
          total: starredPersonas.length,
        };
      default:
        return macroSegmentStats;
    }
  };

  // 현재 탭의 통계 정보
  const currentTabStats = getCurrentTabStats();

  // refreshPersonaList 함수 수정 - 전체 통계와 함께 탭별 통계도 업데이트
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

        // 전체 페르소나 통계 업데이트
        const activeCount = sortedList.filter(
          (persona) => persona?.status === "complete"
        ).length;

        const generatingCount = sortedList.filter(
          (persona) =>
            persona?.status === "ing" || persona?.status === "request"
        ).length;

        const inactiveCount = sortedList.filter(
          (persona) =>
            persona?.status !== "complete" &&
            persona?.status !== "ing" &&
            persona?.status !== "request"
        ).length;

        setPersonaStats({
          active: activeCount,
          inactive: inactiveCount,
          generating: generatingCount,
        });
      }
    } catch (error) {
      console.error("페르소나 목록을 새로고침하는데 실패했습니다:", error);
    }
  };

  const mapExperienceDepth = (level) => {
    switch (level) {
      case "1":
      case "1단계":
      case 1:
        return "이 제품/서비스를 들어본 적도 없음";
      case "2":
      case "2단계":
      case 2:
        return "들어본 적은 있지만, 사용해본 적은 없음";
      case "3":
      case "3단계":
      case 3:
        return "사용해본 적은 있지만, 한두 번 경험한 수준";
      case "4":
      case "4단계":
      case 4:
        return "몇 번 사용해봤고, 기능을 어느 정도 이해하고 있음";
      case "5":
      case "5단계":
      case 5:
        return "정기적으로 사용하고 있고, 익숙한 사용자";
      default:
        return "선택해주세요";
    }
  };

  const mapUsageDepth = (level) => {
    switch (level) {
      case "1":
      case "1단계":
      case 1:
        return "기본적인 기능도 잘 모름";
      case "2":
      case "2단계":
      case 2:
        return "몇 가지 주요 기능만 사용";
      case "3":
      case "3단계":
      case 3:
        return "대부분의 기능을 사용해 봤지만, 특정 기능은 모름";
      case "4":
      case "4단계":
      case 4:
        return "거의 모든 기능을 능숙하게 사용";
      default:
        return "선택해주세요";
    }
  };

  const handleCustomPersonaRequest = async () => {
    try {
      const requestData = {
        projectId: projectId,
        businessAnalysis: {
          businessModel: project.businessModel,
          projectAnalysis: project.projectAnalysis,
          projectDescription: project.projectDescription,
          projectTitle: project.projectTitle,
          targetCountry: project.targetCountry,
        },
        projectType: project.projectType,
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
        personaRequest: {
          preferences: {
            gender: customPersonaForm.gender,
            ageGroups: customPersonaForm.ageGroups,
          },
          additionalInfo: customPersonaForm.additionalInfo,
          ocean: {
            openness: oceanValues.openness,
            conscientiousness: oceanValues.conscientiousness,
            extraversion: oceanValues.extraversion,
            agreeableness: oceanValues.agreeableness,
            neuroticism: oceanValues.neuroticism,
          },
          ignoreOcean: ignoreOcean,
          status: "request",
        },
      };
      // API 호출 예시
      const response = await createRequestPersonOnServer(
        requestData,
        isLoggedIn
      );

      if (!response) {
        throw new Error("페르소나 요청에 실패했습니다.");
      }
      console.log("페르소나 요청 성공:", response);
      setIsCustomizePopupOpen(false);
      // 추가적인 성공 처리 로직
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  // 크레딧 사용 함수
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
      mount: creditRequestBusinessPersona,
    };
    const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

    if (creditResponse?.state !== "use") {
      setShowCreditPopup(true);
      return;
    }

    // 크레딧이 사용 가능한 상태면 사용 API 호출
    const creditUsePayload = {
      title: selectedPersona.title,
      service_type: "페르소나 모집 요청",
      target: "",
      state: "use",
      mount: creditRequestBusinessPersona,
    };

    // 크레딧 사용 후 사용자 정보 새로고침
    accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const userCreditValue = await UserCreditInfo(isLoggedIn);
      setUserCredits(userCreditValue);
    }

    handleRequestPersona(selectedPersona);
  };

  // 페르소나 요청 처리 함수
  const handleRequestPersona = async (persona) => {
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
          personaRequest: { ...persona, status: "request" },
          requestPersonaType: "saas",
        };
        createRequestPersonaOnServer(requestData, isLoggedIn);
        // 페르소나 요청 완료 후 페르소나 목록 새로고침
        await refreshPersonaList();

        // 상태 업데이트
        setPersonaStats((prevStats) => ({
          ...prevStats,
          active: prevStats.active + 1,
          generating: prevStats.generating - 1,
        }));
      } else {
        console.error("이미 요청된 페르소나입니다.");
      }
    } catch (error) {
      console.error("페르소나 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("aipersona")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          console.log("새로고침 감지: URL 비교");
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
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />
        <MoleculeHeader />

        <MainContent Wide1030>
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

              {/* <Button
                ExLarge
                PrimaryLightest
                Fill
                onClick={() => {
                  setActiveTabIndex(0);
                  setIsCustomizePopupOpen(true);
                }}
              >
                <img src={images.PlusPrimary} width="14" height="14" />
                <Sub2 color="primary">나만의 AI Persona 요청</Sub2>
              </Button> */}
            </AiPersonaTitle>

            {personaListSaas && personaListSaas.length > 0 ? (
              <AiPersonaContent>
                <TabWrapType3 Border>
                  <TabButtonType3
                    className={activeTab === "macro_segment" ? "active" : ""}
                    onClick={() => handleTabClick("macro_segment")}
                    isActive={activeTab === "macro_segment"}
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
                    isActive={activeTab === "unique_user"}
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
                    isActive={activeTab === "key_stakeholder"}
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
                    isActive={activeTab === "my_persona"}
                    style={
                      activeTab === "my_persona"
                        ? { color: "#333333" }
                        : { color: "#999999" }
                    }
                  >
                    My Persona
                  </TabButtonType3>
                </TabWrapType3>

                <AiPersonaInfo>
                  <div>
                    <span className="inactive">
                      <Sub3 color="gray700">{currentTabStats.inactive}</Sub3>
                    </span>
                    <Sub3 color="gray800">비활성 페르소나</Sub3>
                  </div>
                  <div>
                    <span className="generating">
                      <Sub3 color="gray800">{currentTabStats.generating}</Sub3>
                    </span>
                    <Sub3 color="gray800">생성 중</Sub3>
                  </div>
                  <div>
                    <span className="active">
                      <Sub3 color="gray800">{currentTabStats.active}</Sub3>
                    </span>
                    <Sub3 color="gray800">활성 페르소나</Sub3>
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
                      <>
                        <BoxWrap Column Small>
                          <SelectBox>
                            <SelectBoxTitle None>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <Body2 color="gray300">경험여부</Body2>
                                <Body2
                                  color={
                                    currentPersona.experienceDepth
                                      ? "gray700"
                                      : "gray300"
                                  }
                                >
                                  {mapExperienceDepth(
                                    currentPersona.experienceDepth
                                  )}
                                </Body2>
                              </div>
                            </SelectBoxTitle>
                          </SelectBox>

                          <SelectBox>
                            <SelectBoxTitle None>
                              <div style={{ display: "flex", gap: "10px" }}>
                                <Body2 color="gray300">사용수준</Body2>
                                <Body2
                                  color={
                                    currentPersona.usageDepth
                                      ? "gray700"
                                      : "gray300"
                                  }
                                >
                                  {mapUsageDepth(currentPersona.usageDepth)}
                                </Body2>
                              </div>
                            </SelectBoxTitle>
                          </SelectBox>
                        </BoxWrap>
                        <TabContent>
                          <Body3 color="gray700">
                            {currentPersona.userExperience ||
                              "학업과 여가를 균형 있게 추구하며, 문화적 호기심이 많습니다. 대학 근처의 문화 공간을 자주 방문하며, 예술 전시와 독립영화를 감상하거나 워크숍에 참여합니다."}
                          </Body3>
                        </TabContent>
                      </>
                    )}
                  </>
                )}
              </div>

              {!isLoading &&
                !["request", "ing", "complete"].includes(
                  currentPersona.status
                ) && (
                  <ButtonGroup>
                    <>
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
                        onClick={() => handleRequestClick(currentPersona)}
                      >
                        페르소나 생성
                      </Button>
                    </>
                  </ButtonGroup>
                )}
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
          onPrev={handlePrevTab2}
          isModal={true}
          onCancel={handleCustomizePopupClose}
          onConfirm={
            activeTabIndex === 2
              ? handleCustomPersonaRequest
              : handleCustomizePopupConfirm
          }
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
                    <div className="column">
                      <Body2 color="gray700" align="left">
                        성별<span style={{ color: "red" }}>*</span>
                      </Body2>

                      <SelectBox>
                        <SelectBoxTitle
                          Small
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

                    <div className="column">
                      <Body2 color="gray700" align="left">
                        연령<span style={{ color: "red" }}>*</span>
                      </Body2>

                      <SelectBox>
                        <SelectBoxTitle
                          Small
                          onClick={() => toggleSelectBox("age")}
                        >
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
                            {[
                              "10대",
                              "20대",
                              "30대",
                              "40대",
                              "50대",
                              "60대",
                              "70대",
                            ].map((ageGroup) => (
                              <SelectBoxItem
                                key={ageGroup}
                                onClick={() => {
                                  const newAgeGroups = [
                                    ...customPersonaForm.ageGroups,
                                  ];
                                  const index = newAgeGroups.indexOf(ageGroup);
                                  if (index === -1) {
                                    newAgeGroups.push(ageGroup);
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
                                  {ageGroup}
                                </Body2>
                              </SelectBoxItem>
                            ))}
                          </SelectBoxList>
                        )}
                      </SelectBox>
                    </div>
                  </div>

                  <div className="column">
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

                  <div className="column">
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
                      {customPersonaForm.purpose || "*해당정보 없음"}
                    </Body2>
                  </div>

                  <div>
                    <Body3 color="gray500" align="left">
                      필수정보
                    </Body3>
                    <Body2 color="gray800" align="left">
                      {customPersonaForm.additionalInfo || "*해당정보 없음"}
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
          title={currentPersona.personaName || ""}
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
          onConfirm={() => {
            if (activeTabIndex1 === 4) {
              setIsPersonaConfirmPopupOpen(true); // 확인 팝업 열기
            } else {
              handlePersonaEditContinue(); // 다음 탭으로 이동
            }
          }}
          showTabs={true}
          tabs={["기본정보", "라이프스타일", "관심사", "소비성향", "사용경험"]}
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
                          value={currentPersona.gender || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange("gender", e.target.value)
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
                          value={currentPersona.age || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange("age", e.target.value)
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
                          placeholder="주요 특징 1"
                          value={
                            currentPersona.keywords &&
                            currentPersona.keywords[0]
                              ? currentPersona.keywords[0]
                              : ""
                          }
                          onChange={(e) => {
                            const updatedKeywords = [
                              ...(Array.isArray(currentPersona.keywords)
                                ? currentPersona.keywords
                                : []),
                            ];
                            updatedKeywords[0] = e.target.value;
                            handleCurrentPersonaChange(
                              "keywords",
                              updatedKeywords
                            );
                          }}
                          status="valid"
                        />
                      </FormBox>
                      <FormBox>
                        <CustomInput
                          Edit
                          type="text"
                          placeholder="주요 특징 2"
                          value={
                            currentPersona.keywords &&
                            currentPersona.keywords[1]
                              ? currentPersona.keywords[1]
                              : ""
                          }
                          onChange={(e) => {
                            const updatedKeywords = [
                              ...(Array.isArray(currentPersona.keywords)
                                ? currentPersona.keywords
                                : []),
                            ];
                            updatedKeywords[1] = e.target.value;
                            handleCurrentPersonaChange(
                              "keywords",
                              updatedKeywords
                            );
                          }}
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
                          value={currentPersona.personaCharacteristics || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange(
                              "personaCharacteristics",
                              e.target.value
                            )
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
                          value={currentPersona.lifestyle || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange(
                              "lifestyle",
                              e.target.value
                            )
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
                          value={currentPersona.interests || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange(
                              "interests",
                              e.target.value
                            )
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
                          value={currentPersona.consumptionPattern || ""}
                          onChange={(e) =>
                            handleCurrentPersonaChange(
                              "consumptionPattern",
                              e.target.value
                            )
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
                            experienceDepth: !prev.experienceDepth,
                          }));
                        }}
                      >
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Body2 color="gray300">경험여부</Body2>
                          <Body2
                            color={
                              currentPersona.experienceDepth
                                ? "gray700"
                                : "gray300"
                            }
                          >
                            {mapExperienceDepth(currentPersona.experienceDepth)}
                          </Body2>
                        </div>
                        <images.ChevronDown
                          width="24px"
                          height="24px"
                          color={palette.gray500}
                          style={{
                            transform: selectBoxStates1.experienceDepth
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </SelectBoxTitle>

                      {selectBoxStates1.experienceDepth && (
                        <SelectBoxList>
                          <SelectBoxItem
                            onClick={() => {
                              handleCurrentPersonaChange(
                                "experienceDepth",
                                "1단계"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                experienceDepth: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              이 제품/서비스를 들어본 적도 없음
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleCurrentPersonaChange(
                                "experienceDepth",
                                "2단계"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                experienceDepth: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              들어본 적은 있지만, 사용해본 적은 없음
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleCurrentPersonaChange(
                                "experienceDepth",
                                "3단계"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                experienceDepth: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              사용해본 적은 있지만, 한두 번 경험한 수준
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleCurrentPersonaChange(
                                "experienceDepth",
                                "4단계"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                experienceDepth: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              몇 번 사용해봤고, 기능을 어느 정도 이해하고 있음
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleCurrentPersonaChange(
                                "experienceDepth",
                                "5단계"
                              );
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                experienceDepth: false,
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
                            usageDepth: !prev.usageDepth,
                          }));
                        }}
                      >
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Body2 color="gray300">사용수준</Body2>
                          <Body2
                            color={
                              currentPersona.usageDepth ? "gray700" : "gray300"
                            }
                          >
                            {mapUsageDepth(currentPersona.usageDepth)}
                          </Body2>
                        </div>
                        <images.ChevronDown
                          width="24px"
                          height="24px"
                          color={palette.gray500}
                          style={{
                            transform: selectBoxStates1.usageDepth
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </SelectBoxTitle>

                      {selectBoxStates1.usageDepth && (
                        <SelectBoxList>
                          <SelectBoxItem
                            onClick={() => {
                              handleCurrentPersonaChange("usageDepth", "1단계");
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                usageDepth: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              기본적인 기능도 잘 모름
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleCurrentPersonaChange("usageDepth", "2단계");
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                usageDepth: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              몇 가지 주요 기능만 사용
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleCurrentPersonaChange("usageDepth", "3단계");
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                usageDepth: false,
                              }));
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              대부분의 기능을 사용해 봤지만, 특정 기능은 모름
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleCurrentPersonaChange("usageDepth", "4단계");
                              setSelectBoxStates1((prev) => ({
                                ...prev,
                                usageDepth: false,
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
                    placeholder="사용경험"
                    value={currentPersona.userExperience || ""}
                    onChange={(e) =>
                      handleCurrentPersonaChange(
                        "userExperience",
                        e.target.value
                      )
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
          Warning
          title={
            <>
              페르소나 프로필을
              <br />
              변경하시겠습니까?
            </>
          }
          message="편집 후에는 복구 할 수 없으니, 변경 전 확인해주세요"
          buttonType="Outline"
          confirmText="변경하기"
          closeText="취소"
          onCancel={handleEditConfirmClose}
          isModal={false}
          onConfirm={() => {
            handlePersonaEditUpdate();
            setIsPersonaEditPopupOpen(false);
            setIsPersonaConfirmPopupOpen(false);
          }}
        />
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
              setShowPopup(false);
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
    gap: 6px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 24px;
    // height: 24px;
    padding: 4px 12px;
    border-radius: 5px;

    &.active {
      border: 1px solid ${palette.white};
      background: rgba(34, 111, 255, 0.16);
    }

    &.generating {
      border: 1px solid ${palette.white};
      background: rgba(50, 173, 230, 0.16);
    }

    &.inactive {
      border: 1px solid ${palette.white};
      background: ${palette.chatGray};
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
