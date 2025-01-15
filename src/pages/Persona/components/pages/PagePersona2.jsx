//persona step 2 맞춤 페르소나 추천
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_PERSONA_ACCESSIBLE,
  PERSONA_BUTTON_STATE_2,
  IS_LOGGED_IN,
  CONVERSATION_ID,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  PERSONA_LIST,
  REPORT_LIST,
  IS_LOADING,
  PERSONA_STEP,
  BUSINESS_ANALYSIS,
  REQUEST_PERSONA_LIST,
  PROJECT_ID,
  PROJECT_LOAD_BUTTON_STATE,
  CATEGORY_COLOR,
  FILTERED_PROJECT_LIST,
  BUSINESS_PERSONA_LIST,
} from "../../../AtomStates";
import {
  ContentsWrap,
  ContentSection,
  MainContent,
  AnalysisWrap,
  MainSection,
  Title,
  CardWrap,
  CustomizePersona,
  AccordionSection,
  AccordionHeader,
  AccordionIcon,
  AccordionContent,
  CustomAccordionHeader,
  CustomAccordionIcon,
  CustomAccordionContent,
  BoxWrap,
  BottomBar,
  TabWrapType3,
  TabButtonType3,
  ViewType,
  TypeButton,
  CardGroupWrap,
  CategoryView,
  ChoiceWrap,
  Choice,
  TypeMore,
  Personnel,
  MoreButton,
  TypeList,
  TypeItemList,
  TypeItem,
  TypeListItem,
  PopupTitle,
  PopupContent,
  OCEANRangeWrap,
  RangeSlider,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { H4, Body2, Body3, Sub1, Sub3, Caption2 } from "../../../../assets/styles/Typography";
import {
  CustomTextarea,
  CustomInput,
  GenderRadioButton,
} from "../../../../assets/styles/InputStyle";
import { CheckBox } from "../../../../assets/styles/Input";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
import MoleculeHeader from "../molecules/MoleculeHeader";
import MoleculeStepIndicator from "../molecules/MoleculeStepIndicator";
import MoleculePersonaCard from "../molecules/MoleculePersonaCard";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
// import { updateProjectReportOnServer } from "../../../../utils/indexedDB";
import OrganismBusinessAnalysis from "../organisms/OrganismBusinessAnalysis";
import AtomPersonaLoader from "../atoms/AtomPersonaLoader";
import PopupWrap, { Contents } from "../../../../assets/styles/Popup";
import { getProjectByIdFromIndexedDB } from "../../../../utils/indexedDB";
import MoleculeRequestPersonaCard from "../molecules/MoleculeRequestPersonaCard";
import { createRequestPersonOnServer } from "../../../../utils/indexedDB";
import MoleculeRecreate from "../molecules/MoleculeRecreate";
import { InterviewXInterviewReportPersonaFilter } from "../../../../utils/indexedDB";
import { InterviewXPersonaRequestType } from "../../../../utils/indexedDB";

const PagePersona2 = () => {
  const [customPersonaForm, setCustomPersonaForm] = useState({
    description: "", // 페르소나 특징과 역할
    purpose: "", // 사용 목적
    quantity: 1, // 모집 인원
    gender: "", // 성별 ('' | 'male' | 'female')
    ageGroups: [], // 연령대 선택 ['10s', '20s', ...]
    additionalInfo: "", // 추가 필요 정보
  });
  const [categoryColor, setCategoryColor] = useAtom(CATEGORY_COLOR);
  const [reportList, setReportList] = useAtom(REPORT_LIST);
  const [projectLoadButtonState, setProjectLoadButtonState] = useAtom(
    PROJECT_LOAD_BUTTON_STATE
  );
  const [requestPersonaListReady, setRequestPersonaListReady] = useState(false);
  const [projectId, setProjectId] = useAtom(PROJECT_ID);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [personaButtonState2, setPersonaButtonState2] = useAtom(
    PERSONA_BUTTON_STATE_2
  );//페르소나 생성/로딩 상태 관리 setPersonaButtonState2(0) :  api 호출 완료
  
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [filteredProjectList, setFilteredProjectList] = useAtom(FILTERED_PROJECT_LIST);
  const [businessPersonaList, setBusinessPersonaList] = useAtom(BUSINESS_PERSONA_LIST);
  const [personaList, setPersonaList] = useAtom(PERSONA_LIST);
  const [requestPersonaList, setRequestPersonaList] = useAtom(REQUEST_PERSONA_LIST);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCustomizePopup, setShowCustomizePopup] = useState(false);

  const [showInterviewPopup, setShowInterviewPopup] = useState(false);
  const [selectedPersonaForPopup, setSelectedPersonaForPopup] = useState(null);
  const [rangeValue, setRangeValue] = useState(50);

  const [isLoadingType, setIsLoadingType] = useState(false);
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [displayedPersonas, setDisplayedPersonas] = useState([]);

  const [customizeFormState, setCustomizeFormState] = useState({
    isAccordionOpen: false,
    personaDescription: "", // 페르소나 설명
    purposeDescription: "", // 목적 설명
  });

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [showRegenerateButton, setShowRegenerateButton] = useState(false);
  const [hasMorePersonas, setHasMorePersonas] = useState(true);

  const [viewType, setViewType] = useState('list'); // 'list' 또는 'card'
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' 또는 'business'

  const [showTypeList, setShowTypeList] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState([]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [unselectedTypes, setUnselectedTypes] = useState([
    { id: 'type1', label: '전형적 사용자 페르소나', count: 1 },
    { id: 'type2', label: '극단적 사용자 페르소나', count: 2 },
    { id: 'type3', label: '비교 소비자 페르소나', count: 1 },
    { id: 'type4', label: '비전통적 사용자 페르소나', count: 1 },
    { id: 'type5', label: '문제 해결 중심 페르소나', count: 3 },
    { id: 'type6', label: '건강 중시 페르소나', count: 2 },
    { id: 'type7', label: '시장 트렌드 리더 페르소나', count: 1 },
    { id: 'type8', label: '예산 중시 소비자 페르소나', count: 1 },
    { id: 'type9', label: '혁신 추구 소비자 페르소나', count: 1 },
    { id: 'type10', label: '환경/윤리 중시 페르소나', count: 2 },
    { id: 'type11', label: '기능/성능 중시 소비자 페르소나', count: 1 },
    { id: 'type12', label: '브랜드 충성 소비자 페르소나', count: 1 },
    { id: 'type13', label: '감성적 소비자 페르소나', count: 3 },
    { id: 'type14', label: '특정 상황 중심페르소나', count: 2 },
    { id: 'type15', label: '문화적/지역적 특성 중심 페르소나', count: 1 },
    { id: 'type16', label: 'DIY/커스터마이징 선호 페르소나', count: 1 },
    { id: 'type17', label: '트렌드 회의적 소비자 페르소나', count: 1 },
    { id: 'type18', label: '단체 구매 소비자 페르소나', count: 3 },
    { id: 'type19', label: '호기심 기반 소비자 페르소나', count: 2 },
    { id: 'type20', label: '브랜드 전환 의향 소비자 페르소나', count: 1 },
    
  ]);

  const [oceanValues, setOceanValues] = useState({
    openness: 80,     // 개방적
    conscientiousness: 70,  // 성실함
    extraversion: 90,      // 외향적
    agreeableness: 40,     // 우호적
    neuroticism: 30        // 신경적
  });

  const handleOceanChange = (trait, value) => {
    setOceanValues(prev => ({
      ...prev,
      [trait]: value
    }));
  };

  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [steps, setSteps] = useState([
    { number: 1, label: "비즈니스 분석", active: true },
    { number: 2, label: "맞춤 페르소나 추천", active: true },
    { number: 3, label: "인터뷰 방법 선택", active: false },
    { number: 4, label: "페르소나와 인터뷰", active: false },
    { number: 5, label: "의견 분석", active: false },
  ]);

  const handlePersonaSelect = (persona, isSelected) => {
    setSelectedPersonas((prev) => {
      if (isSelected) {
        // 최대 5개까지만 선택 가능
        if (prev.length >= 5) {
          return prev;
        }
        return [...prev, persona];
      } else {
        return prev.filter((p) => p !== persona);
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, [navigate]);

  useEffect(() => {
    if (projectId) {
      setRequestPersonaListReady(true);
    }
  }, [projectId]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "광고/마케팅":
        return "Red";
      case "교육":
        return "LavenderMagenta";
      case "금융/보험/핀테크":
        return "Amethyst";
      case "게임":
        return "VistaBlue";
      case "모빌리티/교통":
        return "BlueYonder";
      case "물류":
        return "MidnightBlue";
      case "부동산/건설":
        return "ButtonBlue";
      case "뷰티/화장품":
        return "ButtonBlue";
      case "AI/딥테크/블록체인":
        return "MiddleBlueGreen";
      case "소셜미디어/커뮤니티":
        return "GreenSheen";
      case "여행/레저":
        return "TropicalRainForest";
      case "유아/출산":
        return "DollarBill";
      case "인사/비즈니스/법률":
        return "Olivine";
      case "제조/하드웨어":
        return "ChineseGreen";
      case "커머스":
        return "Jonquil";
      case "콘텐츠/예술":
        return "PastelOrange";
      case "통신/보안/데이터":
        return "Tangerine";
      case "패션":
        return "Copper";
      case "푸드/농업":
        return "Shadow";
      case "환경/에너지":
        return "Tuscany";
      case "홈리빙/펫":
        return "VeryLightTangelo";
      case "헬스케어/바이오":
        return "Orange";
      case "피트니스/스포츠":
        return "CarnationPink";
      default:
        return "";
    }
  };


  //특정 카테고리에 맞는 페르소나 찾는 api 호출
  useEffect(() => {
    const loadProject = async () => {
      try {
        if (projectLoadButtonState) {
          const savedProjectInfo = await getProjectByIdFromIndexedDB(
            projectId,
            projectLoadButtonState
          );
          if (savedProjectInfo) {
            setBusinessAnalysis(savedProjectInfo.businessAnalysis);
            setRequestPersonaList(savedProjectInfo.requestPersonaList);
            setFilteredProjectList(savedProjectInfo.filteredPersonaList);
            console.log(filteredProjectList);
            setCategoryColor({
              first: getCategoryColor(
                savedProjectInfo.businessAnalysis.category.first
              ),
              second: getCategoryColor(
                savedProjectInfo.businessAnalysis.category.second
              ),
              third: getCategoryColor(
                savedProjectInfo.businessAnalysis.category.third
              ),
            });
            let unselectedPersonas = [];
            let data, response;

            // 카테고리별로 페르소나 요청
            for (const category of Object.values(
              savedProjectInfo.businessAnalysis.category
            )) {
              data = {
                target: category,
              };

              response = await axios.post(
                "https://wishresearch.kr/person/findPersonapreSet",
                data,
                axiosConfig
              );

              let newPersonas = response.data;

              // 이미 존재하는 페르소나는 제외
              for (let i = 0; i < newPersonas.length; i++) {
                let isDuplicate = false;
                for (let j = 0; j < unselectedPersonas.length; j++) {
                  if (
                    unselectedPersonas[j].persona === newPersonas[i].persona
                  ) {
                    isDuplicate = true;
                    break;
                  }
                }
                if (!isDuplicate) {
                  unselectedPersonas.push(newPersonas[i]);
                }
              }
            }

            let personaList = {
              selected: [],
              unselected: unselectedPersonas,
            };
            setPersonaList(personaList);
          }
          // setIsLoadingPage(false); // 로딩 완료
        }
        setProjectLoadButtonState(false);
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 500:
              setShowErrorPopup(true);
              break;
            case 504:
              setShowErrorPopup(true);
              break;
            default:
              setShowErrorPopup(true);
              break;
          }
          console.error("Error details:", error);
        }
      }
    };

    loadProject();
  }, [projectId, projectLoadButtonState, navigate]);

  // if (isLoadingPage) {
  //   return <div>Loading...</div>;
  // }

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  //페르소나 새로 생성
  const reloadPersona = async () => {
    try {
      if (personaButtonState2) {
        setIsLoading(true);
        setShowRegenerateButton(false);

        let data, response;

        data = {
          business_idea: businessAnalysis,
        };

        response = await axios.post(
          "https://wishresearch.kr/person/persona_request",
          data,
          axiosConfig
        );

        let requestPersonaList = response.data;

        let retryCount = 0;
        const maxRetries = 10;

        while (
          retryCount < maxRetries &&
          (!response ||
            !response.data ||
            !requestPersonaList.hasOwnProperty("persona_spectrum") ||
            requestPersonaList.persona_spectrum.length !== 3 ||
            !requestPersonaList.persona_spectrum[0].hasOwnProperty(
              "persona_1"
            ) ||
            !requestPersonaList.persona_spectrum[1].hasOwnProperty(
              "persona_2"
            ) ||
            !requestPersonaList.persona_spectrum[2].hasOwnProperty(
              "persona_3"
            ) ||
            !requestPersonaList.persona_spectrum[0].persona_1.hasOwnProperty(
              "persona"
            ) ||
            !requestPersonaList.persona_spectrum[1].persona_2.hasOwnProperty(
              "persona"
            ) ||
            !requestPersonaList.persona_spectrum[2].persona_3.hasOwnProperty(
              "persona"
            ) ||
            !requestPersonaList.persona_spectrum[0].persona_1.persona ||
            !requestPersonaList.persona_spectrum[1].persona_2.persona ||
            !requestPersonaList.persona_spectrum[2].persona_3.persona ||
            !requestPersonaList.persona_spectrum[0].persona_1.hasOwnProperty(
              "keyword"
            ) ||
            !requestPersonaList.persona_spectrum[1].persona_2.hasOwnProperty(
              "keyword"
            ) ||
            !requestPersonaList.persona_spectrum[2].persona_3.hasOwnProperty(
              "keyword"
            ) ||
            requestPersonaList.persona_spectrum[0].persona_1.keyword.length <
              3 ||
            requestPersonaList.persona_spectrum[1].persona_2.keyword.length <
              3 ||
            requestPersonaList.persona_spectrum[2].persona_3.keyword.length < 3)
        ) {
          response = await axios.post(
            "https://wishresearch.kr/person/persona_request",
            data,
            axiosConfig
          );
          retryCount++;

          requestPersonaList = response.data;
        }
        if (retryCount >= maxRetries) {
          setShowErrorPopup(true);
          return;
        }
        setPersonaButtonState2(0);

        const requestPersonaData = {
          persona: requestPersonaList.persona_spectrum,
          positioning: requestPersonaList.positioning_analysis,
        };

        setRequestPersonaList(requestPersonaData);

        await updateProjectOnServer(
          projectId,
          {
            personaList: personaList.unselected.length,
            requestPersonaList: requestPersonaData,
          },
          isLoggedIn
        );
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            if (regenerateCount >= 3) {
              setShowErrorPopup(true);
              return;
            } else {
              setShowRegenerateButton(true);
              setRegenerateCount(regenerateCount + 1);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
        console.error("Error details:", error);
      }
    } finally {
      setIsLoading(false);
      
    }
  };




  const loadPersonaWithFilter = async (isInitial = true) => {
    try {

       //초기 로딩인 경우에만 전체 로딩 상태 설정
    if (isInitial) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
      
      let availablePersonas = []; 
      
      // 초기 페르소나 데이터 로드
      for (const category of Object.values(businessAnalysis.category)) {
        const response = await axios.post(
          "https://wishresearch.kr/person/findPersonapreSet",
          { target: category },
          axiosConfig
        );


      response.data.forEach(newPersona => {
        // 이미 필터링된 페르소나는 제외
        const isAlreadyFiltered = filteredProjectList.some(
          filtered => filtered.persona_id === newPersona.persona_id
        );
        
        if (!isAlreadyFiltered && 
            !availablePersonas.some(p => p.persona_id === newPersona.persona_id)) {
          availablePersonas.push(newPersona);
        }
      });
    }


      // 초기 로드시 3번(9개), 더보기 클릭시 1번(3개) 필터링
      const filteringCount = isInitial ? 0 : 1;
      let filteredPersonas = isInitial ? [] : [...filteredProjectList]; // 기존 리스트 유지

      // let filteredPersonas = [];
      let filterResponse = null;

      // 3번의 필터링 수행
      // for (let i = 0; i < 3 && availablePersonas.length > 0; i++) {
       for (let i = 0; i < filteringCount && availablePersonas.length > 0; i++) {
        filterResponse = await InterviewXInterviewReportPersonaFilter({
          business_idea: businessAnalysis.title,
          business_analysis_data: businessAnalysis,
          persona_data: availablePersonas
        }, isLoggedIn);

        let retryCount = 0;
        const maxRetries = 10;
        
        while (
          retryCount < maxRetries &&
          (!filterResponse?.response?.persona_1?.persona_filter ||
           !filterResponse?.response?.persona_2?.persona_filter ||
           !filterResponse?.response?.persona_3?.persona_filter ||
           !filterResponse?.response?.persona_1?.persona_reason ||
           !filterResponse?.response?.persona_2?.persona_reason ||
           !filterResponse?.response?.persona_3?.persona_reason ||
           !Array.isArray(filterResponse?.response?.persona_1?.persona_keyword) ||
           !Array.isArray(filterResponse?.response?.persona_2?.persona_keyword) ||
           !Array.isArray(filterResponse?.response?.persona_3?.persona_keyword) ||
           filterResponse?.response?.persona_1?.persona_keyword?.length < 3 ||
           filterResponse?.response?.persona_2?.persona_keyword?.length < 3 ||
           filterResponse?.response?.persona_3?.persona_keyword?.length < 3)
        ) {
          console.log('Retrying filter request. Attempt:', retryCount + 1);
          filterResponse = await InterviewXInterviewReportPersonaFilter({
            business_idea: businessAnalysis.title,
            business_analysis_data: businessAnalysis,
            persona_data: availablePersonas
          }, isLoggedIn);
          retryCount++;
        }

        if (retryCount >= maxRetries) {
          setShowErrorPopup(true);
          return;
        }

        // 필터된 페르소나 추가
        if (filterResponse && filterResponse.response) {
          const { persona_1, persona_2, persona_3 } = filterResponse.response;
          
      
          console.log('Individual Personas:', {
            persona_1: persona_1,
            persona_2: persona_2,
            persona_3: persona_3
          });
          
          // 유효한 페르소나 응답들을 배열로 구성
          const validPersonas = [persona_1, persona_2, persona_3]
          .filter(p => {
            console.log('Filtering persona:', p);
            return p && p.persona_filter;
          })
          .map(p => {
            console.log('Mapping persona:', p);
            // availablePersonas에서 일치하는 페르소나 찾기
            const matchingPersona = availablePersonas.find(
              available => available.persona_id === p.persona_filter
            );
        
            if (matchingPersona) {
              // 기존 페르소나 정보에 persona_keyword 추가
              return {
                ...matchingPersona,
                persona_keyword: p.persona_keyword,
                reason: p.persona_reason
              };
            }
            return null;
          })
          .filter(Boolean); // null 값 제거
    

          console.log('Valid Personas after processing:', validPersonas);

          // 필터된 페르소나 추가
          filteredPersonas.push(...validPersonas);
          console.log('Updated filteredPersonas:', filteredPersonas);
          

          // 다음 필터링을 위해 사용되지 않은 페르소나만 남김
          availablePersonas = availablePersonas.filter(availablePersona => 
            !filteredPersonas.some(filteredPersona => 
              filteredPersona.persona_id === availablePersona.persona_id
            )
          );

          console.log('사용된 페르소나 수:', filteredPersonas.length);
          console.log('남은 페르소나 수:', availablePersonas.length);
          console.log(`=== 필터링 ${i + 1}차 종료 ===\n`);

        }
      }


      // 필터된 페르소나를 상태에 저장
      setFilteredProjectList(filteredPersonas);
      setHasMorePersonas(availablePersonas.length > 0);

      // 최종 데이터 저장
      const requestPersonaData = {
        persona: filteredPersonas,
        positioning: filterResponse?.positioning_analysis || {},
      };

      console.log('=== 최종 저장 데이터 ===');
      console.log('필터링된 페르소나 수:', filteredPersonas.length);
      console.log('필터링된 페르소나:', filteredPersonas);
      console.log('포지셔닝 데이터:', requestPersonaData.positioning);
      console.log('=== 저장 완료 ===\n');

      setRequestPersonaList(requestPersonaData);
      // setPersonaList([...selectedPersonas]);

      await updateProjectOnServer(
        projectId,
        {
          personaList: filteredPersonas.length,
          filteredPersonaList: filteredPersonas,
          requestPersonaList: requestPersonaData,
        },
        isLoggedIn
      );

      setPersonaButtonState2(0);

    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            if (regenerateCount >= 3) {
              setShowErrorPopup(true);
            } else {
              setShowRegenerateButton(true);
              setRegenerateCount(prev => prev + 1);
            }
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
      }
      console.error("Error in loadPersonaWithFilter:", error);
    } finally {
      // setIsLoading(false);
      if (isInitial) {
        setIsLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  }; 

  // 초기 로딩 (9개)
useEffect(() => {
  if (personaButtonState2) {
    loadPersonaWithFilter(true);
  }
}, [personaButtonState2]);

// 더보기 버튼 핸들러
const handleLoadMore = () => {
  loadPersonaWithFilter(false);
};

const [allBusinessPersonas, setAllBusinessPersonas] = useState([]); // 전체 비즈니스 페르소나 상태

const loadBusinessPersona = async (personaType) => {
  try {
    // setIsLoadingType(true); // Start loading for the current type
    setIsLoadingMore(true);

    let allBusinessPersonas = [];
    const requestData = {
      business_idea: businessAnalysis.title,
      business_analysis_data: businessAnalysis,
      persona_type: personaType.label
    };

    console.log(`=== ${personaType.label} 페르소나 요청 시작 ===`);
    console.log('요청 데이터:', requestData);

    const result = await InterviewXPersonaRequestType(requestData, isLoggedIn);
    console.log('API 응답 결과:', result);
    console.log('페르소나 스펙트럼:', result?.response?.persona_spectrum);

    if (result?.response?.persona_spectrum) {
      const newPersonas = result.response.persona_spectrum.map(p => Object.values(p)[0]);


       // 기존 상태에 새로운 페르소나를 추가
       setAllBusinessPersonas(prev => {
        const updatedList = [...prev, ...newPersonas]; // 누적된 리스트
        console.log('누적된 전체 비즈니스 페르소나:', updatedList);
        return updatedList; // 업데이트된 리스트 반환
      });

      // allBusinessPersonas = [...allBusinessPersonas, ...newPersonas];
      console.log('새로운 페르소나 데이터 누적:', newPersonas);
      // console.log('누적된 전체 비즈니스 페르소나:', allBusinessPersonas);


      setBusinessPersonaList(allBusinessPersonas);
      setDisplayedPersonas(prevDisplayed => [...prevDisplayed, ...newPersonas]);
      // console.log('기존 displayedPersonas:', prevDisplayed)
    }
  } catch (error) {
    console.error("비즈니스 페르소나 로드 중 오류:", error);
    setShowErrorPopup(true);
  } finally {
    // setIsLoading(false);
    setIsLoadingMore(false); // End loading for the current type
  }
};



// 비즈니스 탭 선택 시 상위 4개 타입의 페르소나 로드
useEffect(() => {
  if (activeTab === 'business') {
    // 기존 데이터 초기화
    setPersonaList(prevState => ({
      ...prevState,
      unselected: []
    }));
    
    // 상위 4개 타입만 필터링
    const topFourTypes = unselectedTypes
      .filter((type, index) => index < 4);

  // 각 타입별로 순차적으로 페르소나 요청
  const loadTopFourTypes = async () => {
    for (let i = currentTypeIndex; i < topFourTypes.length; i++) {
      const personaType = topFourTypes[i];
      await loadBusinessPersona(personaType);
      setCurrentTypeIndex(i + 1); // 다음 타입으로 인덱스 업데이트
    }
  };

  
    
    loadTopFourTypes();
  }
}, [activeTab]);



//unction to load more personas
const loadMorePersonas = async () => {
  const nextIndex = currentTypeIndex + 1;
  if (nextIndex < unselectedTypes.length) {
    setCurrentTypeIndex(nextIndex);
    const personaType = unselectedTypes[nextIndex]; // 다음 페르소나 타입 가져오기
    await loadBusinessPersona(personaType); // 새로운 타입에 대한 페르소나 로드
  }
};



 // 유형 선택/해제 처리 함수
 const handleTypeToggle = async (typeId, isSelected) => {
  if (isSelected) {
    // 선택 해제: 선택된 유형에서만 제거
    
    setSelectedTypes(prev => prev.filter(type => type.id !== typeId));
  } else {
    // 선택: 선택된 유형에 추가
    const typeToMove = unselectedTypes.find(type => type.id === typeId);
    setSelectedTypes(prev => [...prev, { 
      id: typeId, 
      label: typeToMove.label, 
      type: typeToMove.type,  // type 값 추가
      count: typeToMove.count // unselectedTypes의 count 값 사용
    }]);

    // 선택한 타입에 대한 페르소나 로드
    // 선택한 타입에 대한 페르소나 로드
    setIsLoadingMore(true); // 로딩 상태 시작
    await loadBusinessPersona(typeToMove); // 선택한 타입에 대한 페르소나 로드
    setIsLoadingMore(false); // 로딩 상태 종료
  // await loadBusinessPersona(typeToMove); // 선택한 타입에 대한 페르소나 로드
  }
};

useEffect(() => {
  // unselectedTypes가 변경될 때마다 selectedTypes를 초기화
  setSelectedTypes(unselectedTypes.slice(0, 4).map(type => ({
    id: type.id,
    label: type.label,
    type: type.type,
    count: type.count
  })));
}, [unselectedTypes]);





  
  const handleStartInterview = () => {
    // 선택된 페르소나들을 selected에 반영
    setPersonaList((prev) => ({
      selected: selectedPersonas,
      unselected: prev.unselected.filter(
        (persona) => !selectedPersonas.includes(persona)
      ),
    }));

    setPersonaStep(3);
    setIsPersonaAccessible(true);
    navigate(`/Persona/3/${projectId}`, { replace: true });
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const handleCustomizeRequest = () => {
    setShowCustomizePopup(true);
  };

  const handleCustomizePopupClose = () => {
    setShowCustomizePopup(false);
  };
  const handleCustomizePopupConfirm = () => {
    submitCustomPersonaRequest();
    setShowCustomizePopup(false);
  };
  const [state, setState] = useState({
    isAccordionOpen: false,
    formState: {
      quantity: 1,
    },
  });

  // quantity 변경 핸들러 수정
  const handleQuantityChange = (type) => {
    setCustomPersonaForm((prev) => {
      const newQuantity =
        type === "up"
          ? Math.min(prev.quantity + 1, 30) // 최대 20
          : Math.max(prev.quantity - 1, 1); // 최소 1
      return {
        ...prev,
        quantity: newQuantity,
      };
    });
  };

  // 각 입력 필드의 onChange 핸들러
  const handleCustomPersonaChange = (field, value) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 연령대 선택 핸들러
  const handleAgeGroupChange = (ageGroup) => {
    setCustomPersonaForm((prev) => ({
      ...prev,
      ageGroups: prev.ageGroups.includes(ageGroup)
        ? prev.ageGroups.filter((age) => age !== ageGroup)
        : [...prev.ageGroups, ageGroup],
    }));
  };
  const initialCustomPersonaForm = {
    description: "",
    purpose: "",
    quantity: 1,
    gender: "",
    ageGroups: [],
    additionalInfo: "",
  };

  // API 호출 함수
  const submitCustomPersonaRequest = async () => {
    try {
      const requestData = {
        projectId: projectId,
        businessAnalysis: businessAnalysis,
        requestDate: new Date().toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        }),
        personaRequest: {
          description: customPersonaForm.description,
          purpose: customPersonaForm.purpose,
          quantity: customPersonaForm.quantity,
          preferences: {
            gender: customPersonaForm.gender,
            ageGroups: customPersonaForm.ageGroups,
          },
          additionalInfo: customPersonaForm.additionalInfo,
        },
      };

      const response = await createRequestPersonOnServer(
        requestData,
        isLoggedIn
      );
      if (response) {
        // 요청 성공 시 상태 초기화
        setCustomPersonaForm({
          description: "", // 페르소나 특징과 역할
          purpose: "", // 사용 목적
          quantity: 1, // 모집 인원
          gender: "", // 성별 ('' | 'male' | 'female')
          ageGroups: [], // 연령대 선택 ['10s', '20s', ...]
          additionalInfo: "", // 추가 필요 정보
        });

        handleCustomizePopupClose();
        // 성공 메시지 표시 등 추가 처리
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowErrorPopup(true);
            break;
          case 504:
            // 재생성하기
            break;
          default:
            setShowErrorPopup(true);
            break;
        }
        console.error("Error details:", error);
      }
    }
  };

  // 폼 유효성 검사 함수 추가
  const isFormValid = () => {
    // 필수 필드 검사
    const requiredFields = {
      description: customPersonaForm.description.trim(),
      purpose: customPersonaForm.purpose.trim(),
    };

    // 모든 필수 필드가 채워져 있는지 확인
    const isRequiredFieldsFilled = Object.values(requiredFields).every(
      (field) => field.length > 0
    );

    return isRequiredFieldsFilled;
  };

  // // 유형 선택/해제 처리 함수
  // const handleTypeToggle = (typeId, isSelected) => {
  //   if (isSelected) {
  //     // 선택 해제: 선택된 유형에서만 제거
      
  //     setSelectedTypes(prev => prev.filter(type => type.id !== typeId));
  //   } else {
  //     // 선택: 선택된 유형에 추가
  //     const typeToMove = unselectedTypes.find(type => type.id === typeId);
  //     setSelectedTypes(prev => [...prev, { 
  //       id: typeId, 
  //       label: typeToMove.label, 
  //       type: typeToMove.type,  // type 값 추가
  //       count: typeToMove.count // unselectedTypes의 count 값 사용
  //     }]);

  //     // 선택한 타입에 대한 페르소나 로드
  //   // await loadBusinessPersona(typeToMove); // 선택한 타입에 대한 페르소나 로드
  //   }
  // };

  // useEffect(() => {
  //   // unselectedTypes가 변경될 때마다 selectedTypes를 초기화
  //   setSelectedTypes(unselectedTypes.slice(0, 4).map(type => ({
  //     id: type.id,
  //     label: type.label,
  //     type: type.type,
  //     count: type.count
  //   })));
  // }, [unselectedTypes]);



// const [selectedTypes, setSelectedTypes] = useState(() => {
//   // Initialize with the top 4 types from unselectedTypes
//   return unselectedTypes.slice(0, 4).map(type => ({
//     id: type.id,
//     label: type.label,
//     type: type.type,  // Ensure type is included
//     count: type.count // Use count from unselectedTypes
//   }));
// });


  // 마우스 드래그 스크롤 핸들러 추가
  const handleMouseDrag = (e) => {
    const slider = e.currentTarget;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // 스크롤 속도 조절
      slider.scrollLeft = scrollLeft - walk;
    });
  };

  // Choice 컴포넌트에서 X 버튼 클릭 시 삭제하는 핸들러 추가
  const handleRemoveType = (typeId) => {
    setSelectedTypes(prev => prev.filter(type => type.id !== typeId));
  };

  // 총 인원수를 계산하는 함수 추가
  const getTotalCount = () => {
    return selectedTypes.reduce((sum, type) => sum + type.count, 0);
  };

  // 스크롤 위치에 따른 그라데이션 상태 관리
  const [showLeftGradient, setShowLeftGradient] = useState(false);  // 왼쪽은 처음에 안보임
  const [showRightGradient, setShowRightGradient] = useState(false); // 오른쪽은 처음에 보임

  // 스크롤 이벤트 핸들러
  const handleScroll = (e) => {
    const container = e.target;
    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd = container.scrollLeft + container.offsetWidth >= container.scrollWidth;

    setShowLeftGradient(!isAtStart);
    setShowRightGradient(!isAtEnd);
  };

  // 일상/비즈니스 페르소나 카운트를 구분하여 계산하는 함수
  // const getPersonaCount = (type) => {
  //   if (!personaList || !personaList.unselected) return 0;
  //   return filteredProjectList.filter(persona => persona.type === type).length;
  // };

  const getPersonaCount = (tabType) => {
    if (!filteredProjectList) return 0;
    
    // daily 탭일 때는 filteredProjectList의 길이 반환
    if (tabType === 'daily') {
      return filteredProjectList.length;
    }
    
    // business 탭일 때는 personaList.unselected의 길이 반환
    if (tabType === 'business') {
      return displayedPersonas?.length || 0;
    }
    
    return 0;
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <OrganismBusinessAnalysis personaStep={2} />
              {/* {showRegenerateButton ? ( */}
              {isLoading ? (
                <CardWrap>
                  <AtomPersonaLoader />
                </CardWrap>
              ) : showRegenerateButton ? (
                <CardWrap>
                  <MoleculeRecreate Large onRegenerate={reloadPersona} />
                </CardWrap>
              ) : (
                <CardWrap>
                  <>
                    <BoxWrap>
                      <img src={images.BgUserChatDots} alt="" />
                      <Body3 color="gray700">바로 대화를 원하시면 일상 페르소나와 함께 !<br />맞춤형 비즈니스 대화를 원하시면 비즈니스 페르소나를 요청해주세요 </Body3>
                    </BoxWrap>

                    <CustomizePersona>

                      <Tabheader>
                        <TabWrapType3>
                          <TabButtonType3 
                            isActive={activeTab === 'daily'}
                            onClick={() => setActiveTab('daily')}
                          >
                            일상 페르소나 ({getPersonaCount('daily')})
                          </TabButtonType3>
                          <TabButtonType3 
                            isActive={activeTab === 'business'}
                            onClick={() => setActiveTab('business')}
                          >
                            비즈니스 페르소나 ({getPersonaCount('business')})
                          </TabButtonType3>
                        </TabWrapType3>

                        <FillterWrap>
                          <ViewType>
                            <TypeButton 
                              List 
                              active={viewType === 'list'} 
                              onClick={() => handleViewTypeChange('list')}
                            >
                              리스트
                            </TypeButton>
                            <TypeButton 
                              Card 
                              active={viewType === 'card'} 
                              onClick={() => handleViewTypeChange('card')}
                            >
                              카드
                            </TypeButton>
                          </ViewType>

                          <Button Large PrimaryLightest Fill onClick={handleCustomizeRequest}>
                            <img src={images.PlusPrimary} alt="" />
                            페르소나 요청
                          </Button>
                        </FillterWrap>
                      </Tabheader>

                      {activeTab === 'daily' ? (
                        <ContentSection>
                          <>
                            <CardGroupWrap>
                              {filteredProjectList.map((persona, index) => (
                                <MoleculePersonaCard
                                  key={index}
                                  title={persona.persona_view}
                                  keywords={persona.persona_keyword}
                                  gender={persona.gender}
                                  age={persona.age}
                                  job={persona.job}
                                  isRequest={false}
                                  personaData = {persona}
                                  isBasic={true}
                                  onSelect={(isSelected) =>
                                    handlePersonaSelect(persona, isSelected)
                                  }
                                  currentSelection={selectedPersonas.length}
                                  viewType={viewType}
                                />
                              ))}
                              {isLoadingMore && (
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                  <AtomPersonaLoader />
                                </div>
                              )}
                            </CardGroupWrap>
                            {hasMorePersonas && !isLoading && !isLoadingMore && (
                              <LoadMoreButton onClick={handleLoadMore}>
                                더보기
                              </LoadMoreButton>
                            )}

                            {/* 
                            <BannerPersona>
                              <div>
                                <h2>
                                  나만의 페르소나 커스터마이징
                                  <p>
                                    페르소나를 커스터마이징하여 더 정확한
                                    인터뷰를 진행해보세요.
                                  </p>
                                </h2>

                                <Button
                                  Large
                                  Primary
                                  onClick={handleCustomizeRequest}
                                >
                                  요청하기
                                  <img
                                    src={images.ChevronRightPrimary}
                                    alt=""
                                  />
                                </Button>
                              </div>
                              <img src={images.PersonaCustomizing} alt="" />
                            </BannerPersona>
                             */}
                          </>
                        </ContentSection>
                      ) : (
                        <ContentSection>

                          <CategoryView
                            showLeftGradient={showLeftGradient}
                            showRightGradient={showRightGradient}
                          >
                            <ChoiceWrap 
                              onMouseDown={handleMouseDrag} 
                              onScroll={handleScroll}
                            >
                              {selectedTypes.length > 0 ? (
                                selectedTypes.map(type => (
                                  <Choice 
                                    key={type.id} 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveType(type.id);
                                    }}
                                  >
                                    {type.label}
                                  </Choice>
                                ))
                              ) : (
                                <></>
                              )}
                            </ChoiceWrap>

                            <TypeMore style={{ zIndex: 10 }}>
                              <Personnel>{getTotalCount()}명</Personnel>
                              <MoreButton onClick={() => setShowTypeList(!showTypeList)}>
                                유형 더보기
                              </MoreButton>

                              {showTypeList && (
                                <TypeList>
                                  <TypeItem>
                                    <p>선택된 유형 ({selectedTypes.length})</p>
                                    <TypeItemList style={{ padding: '0 12px' }}>
                                      {selectedTypes.map(type => (
                                        <li key={type.id}>
                                          <CheckBox Round>
                                            <input
                                              type="checkbox"
                                              id={type.id}
                                              checked={true}
                                              onChange={() => handleTypeToggle(type.id, true)}
                                            />
                                            <label htmlFor={type.id}>{type.label}</label>
                                          </CheckBox>
                                          <span>{type.count}명</span>
                                        </li>
                                      ))}
                                    </TypeItemList>
                                  </TypeItem>

                                  <TypeItem>
                                    <p>
                                      선택하지 않은 유형 ({unselectedTypes.length})
                                      <span>?</span>
                                      <div>
                                        <Caption2 color="white">선택시 나타나는 변화에 대한 여러가지 설명</Caption2>
                                      </div>
                                    </p>
                                    <TypeItemList>
                                      {unselectedTypes.map(type => {
                                        const isTypeSelected = selectedTypes.some(selectedType => selectedType.id === type.id);
                                        return (
                                          <TypeListItem key={type.id} isSelected={isTypeSelected}>
                                            <CheckBox Round>
                                              <input
                                                type="checkbox"
                                                id={type.id}
                                                checked={isTypeSelected}
                                                onChange={() => handleTypeToggle(type.id, isTypeSelected)}
                                              />
                                              <label htmlFor={type.id}>{type.label}</label>
                                            </CheckBox>
                                          </TypeListItem>
                                        );
                                      })}
                                    </TypeItemList>

                                    <Button ExLarge PrimaryLightest Fill
                                      style={{ margin: '20px 12px 0' }}
                                    >
                                      3개 유형 더보기
                                    </Button>

                                    <Caption2 color="gray500">
                                      유형 추가 중 입니다. 몇 초걸림... 
                                    </Caption2>
                                  </TypeItem>
                                </TypeList>
                              )}
                            </TypeMore>
                          </CategoryView>
                          
                          <CardGroupWrap>

                          {displayedPersonas.map((persona, index) => (
                                <MoleculePersonaCard
                                  key={index}
                                  title={persona.persona}
                                  keywords={persona.keyword}
                                  gender={persona.gender}
                                  age={persona.age}
                                  job={persona.job}
                                  isRequest={true}
                                  personaData = {persona}
                                  isBasic={false} // 비즈니스페르소나랑 일상 페르소나 구분
                                  onSelect={(isSelected) =>
                                    handlePersonaSelect(persona, isSelected)
                                  }
                                  currentSelection={selectedPersonas.length}
                                  viewType={viewType}
                                />
                              ))}
                              {isLoadingMore && (
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                  <AtomPersonaLoader />
                                </div>
                              )}
                            {/* {personaList.unselected.map((persona, index) => {
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
                                  title={persona.persona}
                                  keywords={persona.keyword.split(",")}
                                  gender={gender}
                                  age={age}
                                  job={job}
                                  isRequest={true}
                                  onSelect={(isSelected) =>
                                    handlePersonaSelect(persona, isSelected)
                                  }
                                  currentSelection={selectedPersonas.length}
                                  viewType={viewType}
                                />
                              );
                            })} */}
                          </CardGroupWrap>

                        </ContentSection>
                      )}

                      {!personaButtonState2 && (
                        <BottomBar Black Round>
                          <p>
                            {selectedPersonas.length > 0 ? (
                              <>
                                선택하신{" "}
                                <span>{selectedPersonas.length}명</span>의
                                페르소나와 인터뷰 하시겠어요? (
                                {selectedPersonas.length}/5)
                              </>
                            ) : (
                              "추천 페르소나 10명이 인터뷰를 기다리고 있어요"
                            )}
                          </p>
                          <Button
                            DbExLarge
                            Round
                            Fill={selectedPersonas.length > 0}
                            // Edit={selectedPersonas.length === 0}
                            // disabled={selectedPersonas.length === 0}
                            onClick={handleStartInterview}
                          >
                            <Sub1 color="gray800">인터뷰 시작하기</Sub1>
                            <img src={images.ChevronRight} alt="" />
                          </Button>
                        </BottomBar>
                      )}
                    </CustomizePersona>                    
                  </>
                </CardWrap>
              )}
            </MainSection>

            {/* 
            <Sidebar>
              <h5>Discover Your Persona</h5>

              <ProgressBar>
                <span className="icon">🚀</span>
                <Progress progress={40} />
                <span>40%</span>
              </ProgressBar>

              <MoleculeStepIndicator steps={steps} activeStep={2} />
            </Sidebar>
             */}
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <PopupWrap
          Warning
          title="요청 상태의 페르소나는 선택이 제한됩니다."
          message="인터뷰를 진행하려면 모집 요청을 먼저 진행해주세요"
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={handlePopupClose}
          show={showPopup}
        />
      )}

      {showCustomizePopup && (
        <PopupWrap
          TitleFlex
          title="📝 맞춤형 페르소나 모집 요청하기"
          buttonType="Fill"
          confirmText={activeTabIndex === 0 ? "다음" : "맞춤 페르소나 모집하기"}
          isModal={true}
          isFormValid={isFormValid()}
          onCancel={handleCustomizePopupClose}
          onConfirm={() => {
            if (activeTabIndex === 0) {
              setActiveTabIndex(1);
            } else {
              handleCustomizePopupConfirm();
            }
          }}
          showTabs={true}
          tabs={['필수정보', 'OCEAN 정보']}
          onTabChange={(index) => setActiveTabIndex(index)}
          activeTab={activeTabIndex}
          body={
            <>
              {activeTabIndex === 0 && (
                <>
                <div>
                  <PopupTitle>
                    성별
                    <Sub3>
                      * 선택하지 않는 경우, 성별 무관으로 페르소나를 생성합니다.
                    </Sub3>
                  </PopupTitle>

                  <PopupContent>
                    <GenderRadioButton
                      id="gender1"
                      name="gender"
                      gender="남자"
                      icon={images.GenderMen}
                      checked={customPersonaForm.gender === "male"}
                      onClick={() => {
                        // 현재 선택된 값과 같은 값을 클릭하면 선택 해제
                        if (customPersonaForm.gender === "male") {
                          handleCustomPersonaChange("gender", "");
                        } else {
                          handleCustomPersonaChange("gender", "male");
                        }
                      }}
                    />
                    <GenderRadioButton
                      id="gender2"
                      name="gender"
                      gender="여자"
                      icon={images.GenderWomen}
                      checked={customPersonaForm.gender === "female"}
                      onClick={() => {
                        // 현재 선택된 값과 같은 값을 클릭하면 선택 해제
                        if (customPersonaForm.gender === "female") {
                          handleCustomPersonaChange("gender", "");
                        } else {
                          handleCustomPersonaChange("gender", "female");
                        }
                      }}
                    />
                  </PopupContent>
                </div>

                <div>
                  <PopupTitle>
                    연령 (다중 선택)
                    <Sub3>
                      * 선택하지 않는 경우, 연령 무관으로 페르소나를 생성합니다.
                    </Sub3>
                  </PopupTitle>

                  <PopupContent>
                    <AgeGroup>
                      <div>
                        {["10s", "20s", "30s", "40s"].map((age, index) => (
                          <React.Fragment key={age}>
                            <input
                              type="checkbox"
                              id={`age${index + 1}`}
                              name="age"
                              checked={customPersonaForm.ageGroups.includes(
                                age
                              )}
                              onChange={() => handleAgeGroupChange(age)}
                            />
                            <label
                              htmlFor={`age${index + 1}`}
                              className="age"
                            >
                              {age.replace("s", "대")}
                            </label>
                          </React.Fragment>
                        ))}
                      </div>
                      <div>
                        {["50s", "60s", "70s"].map((age, index) => (
                          <React.Fragment key={age}>
                            <input
                              type="checkbox"
                              id={`age${index + 5}`}
                              name="age"
                              checked={customPersonaForm.ageGroups.includes(
                                age
                              )}
                              onChange={() => handleAgeGroupChange(age)}
                            />
                            <label
                              htmlFor={`age${index + 5}`}
                              className="age"
                            >
                              {age.replace("s", "대")}
                            </label>
                          </React.Fragment>
                        ))}
                        <div className="empty-space"></div>
                      </div>
                    </AgeGroup>
                  </PopupContent>
                </div>

                <div>
                  <PopupTitle>
                    필수적으로 필요한 정보가 있다면, 알려주세요
                  </PopupTitle>

                  <PopupContent>
                    <CustomTextarea
                      rows={3}
                      placeholder="필수로 고려해야할 정보가 있다면 작성해주세요."
                      value={customPersonaForm.additionalInfo}
                      onChange={(e) => {
                        if (e.target.value.length <= 300) {
                          handleCustomPersonaChange(
                            "additionalInfo",
                            e.target.value
                          );
                        }
                      }}
                    />
                  </PopupContent>
                </div>
                </>
              )}

              {activeTabIndex === 1 && (
                <>
                  <div>
                    <PopupTitle>
                      성향
                      <Sub3>
                        * 선택하지 않는 경우, 성향 무관으로 페르소나를 생성합니다. 
                      </Sub3>
                    </PopupTitle>

                    <PopupContent>
                      <OCEANRangeWrap>
                        <div>
                          <Body3 color="gray800">보수적</Body3>
                          <RangeSlider 
                            type="range"
                            min="0"
                            max="100"
                            value={oceanValues.openness}
                            onChange={(e) => handleOceanChange('openness', e.target.value)}
                          />
                          <Body3 color="gray800">개방적</Body3>
                        </div>
                        <div>
                          <Body3 color="gray800">즉흥적</Body3>
                          <RangeSlider 
                            type="range"
                            min="0"
                            max="100"
                            value={oceanValues.conscientiousness}
                            onChange={(e) => handleOceanChange('conscientiousness', e.target.value)}
                          />
                          <Body3 color="gray800">성실함</Body3>
                        </div>
                        <div>
                          <Body3 color="gray800">내향적</Body3>
                          <RangeSlider 
                            type="range"
                            min="0"
                            max="100"
                            value={oceanValues.extraversion}
                            onChange={(e) => handleOceanChange('extraversion', e.target.value)}
                          />
                          <Body3 color="gray800">외향적</Body3>
                        </div>
                        <div>
                          <Body3 color="gray800">독립적</Body3>
                          <RangeSlider 
                            type="range"
                            min="0"
                            max="100"
                            value={oceanValues.agreeableness}
                            onChange={(e) => handleOceanChange('agreeableness', e.target.value)}
                          />
                          <Body3 color="gray800">우호적</Body3>
                        </div>
                        <div>
                          <Body3 color="gray800">무던함</Body3>
                          <RangeSlider 
                            type="range"
                            min="0"
                            max="100"
                            value={oceanValues.neuroticism}
                            onChange={(e) => handleOceanChange('neuroticism', e.target.value)}
                          />
                          <Body3 color="gray800">신경적</Body3>
                        </div>
                      </OCEANRangeWrap>
                    </PopupContent>
                  </div>

                  <div style={{ marginTop: "12px", textAlign: "left" }}>
                    <Body3 color="gray500">
                    페르소나 마다의 다양한 성향이 있습니다. 이러한 성향에 따라 생성되는 페르소나는 각양각색의 무한한 가능성과 여러가지 방법들이 있습니다. 원하는 바를 위해 최대한 커스터마이징 하여 페르소나를 도출해 내시기를 기원합니다.
                    </Body3>
                  </div>
                </>
              )}

              {/* 
              <Title>
                <p className="required">어떤 페르소나가 필요하신가요?</p>
              </Title>
              <div style={{ width: "100%" }}>
                <CustomTextarea
                  rows={4}
                  placeholder="필요한 페르소나의 특징과 역할을 적어주세요."
                  value={customPersonaForm.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      handleCustomPersonaChange("description", e.target.value);
                    }
                  }}
                />
              </div>
              <Title>
                <p className="required">
                  이 페르소나를 사용하려는 목적은 무엇인가요?
                </p>
              </Title>
              <div style={{ width: "100%" }}>
                <CustomTextarea
                  rows={4}
                  placeholder="해당 페르소나가 필요한 이유, 얻고 싶은 인사이트, 하고자 하는 목표 등을 입력해주세요."
                  value={customPersonaForm.purpose}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      handleCustomPersonaChange("purpose", e.target.value);
                    }
                  }}
                />
              </div>
              <Title>
                <p className="required">
                  몇명의 페르소나를 모집하시고 싶으신가요?(최대 30명)
                </p>
              </Title>
              <Quantity>
                <span
                  className="down"
                  onClick={() => handleQuantityChange("down")}
                  disabled={customPersonaForm.quantity <= 1}
                >
                  줄이기
                </span>
                <CustomInput
                  type="number"
                  value={customPersonaForm.quantity}
                  min={1}
                  max={30}
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(20, parseInt(e.target.value) || 1)
                    );
                    setCustomPersonaForm((prev) => ({
                      ...prev,
                      quantity: value,
                    }));
                  }}
                />
                <span
                  className="up"
                  onClick={() => handleQuantityChange("up")}
                  disabled={customPersonaForm.quantity >= 30}
                >
                  늘리기
                </span>
              </Quantity>
              <AccordionSection>
                <CustomAccordionHeader
                  None
                  onClick={() =>
                    setCustomizeFormState((prev) => ({
                      ...prev,
                      isAccordionOpen: !prev.isAccordionOpen,
                    }))
                  }
                >
                  🔍 세부 사항 설정
                  <CustomAccordionIcon
                    isOpen={customizeFormState.isAccordionOpen}
                  />
                </CustomAccordionHeader>
                {customizeFormState.isAccordionOpen && (
                  <CustomAccordionContent None>
                    <dl>
                      <dt>성별</dt>
                      <dd>
                        <input
                          type="radio"
                          id="gender1"
                          name="gender"
                          checked={customPersonaForm.gender === "male"}
                          onClick={() => {
                            // 현재 선택된 값과 같은 값을 클릭하면 선택 해제
                            if (customPersonaForm.gender === "male") {
                              handleCustomPersonaChange("gender", "");
                            } else {
                              handleCustomPersonaChange("gender", "male");
                            }
                          }}
                        />
                        <label htmlFor="gender1" className="gender men">
                          <i class="icon man" />
                          man
                          <span className="check-circle" />
                        </label>
                        <input
                          type="radio"
                          id="gender2"
                          name="gender"
                          checked={customPersonaForm.gender === "female"}
                          onClick={() => {
                            // 현재 선택된 값과 같은 값을 클릭하면 선택 해제
                            if (customPersonaForm.gender === "female") {
                              handleCustomPersonaChange("gender", "");
                            } else {
                              handleCustomPersonaChange("gender", "female");
                            }
                          }}
                        />
                        <label htmlFor="gender2" className="gender women">
                          <i class="icon woman" />
                          woman
                          <span className="check-circle" />
                        </label>
                      </dd>
                    </dl>

                    <dl>
                      <dt>연령 (다중 선택)</dt>
                      <dd>
                        <AgeGroup>
                          <div>
                            {["10s", "20s", "30s", "40s"].map((age, index) => (
                              <React.Fragment key={age}>
                                <input
                                  type="checkbox"
                                  id={`age${index + 1}`}
                                  name="age"
                                  checked={customPersonaForm.ageGroups.includes(
                                    age
                                  )}
                                  onChange={() => handleAgeGroupChange(age)}
                                />
                                <label
                                  htmlFor={`age${index + 1}`}
                                  className="age"
                                >
                                  {age.replace("s", "대")}
                                </label>
                              </React.Fragment>
                            ))}
                          </div>
                          <div>
                            {["50s", "60s", "70s"].map((age, index) => (
                              <React.Fragment key={age}>
                                <input
                                  type="checkbox"
                                  id={`age${index + 5}`}
                                  name="age"
                                  checked={customPersonaForm.ageGroups.includes(
                                    age
                                  )}
                                  onChange={() => handleAgeGroupChange(age)}
                                />
                                <label
                                  htmlFor={`age${index + 5}`}
                                  className="age"
                                >
                                  {age.replace("s", "대")}
                                </label>
                              </React.Fragment>
                            ))}
                            <div className="empty-space"></div>
                          </div>
                        </AgeGroup>
                      </dd>
                    </dl>

                    <dl>
                      <dt>필수적으로 필요한 정보가 있다면, 알려주세요</dt>
                      <dd>
                        <CustomTextarea
                          rows={3}
                          placeholder="필수로 고려해야할 정보가 있다면 작성해주세요."
                          value={customPersonaForm.additionalInfo}
                          onChange={(e) => {
                            if (e.target.value.length <= 300) {
                              handleCustomPersonaChange(
                                "additionalInfo",
                                e.target.value
                              );
                            }
                          }}
                        />
                      </dd>
                    </dl>
                  </CustomAccordionContent>
                )}
              </AccordionSection>
               */}
            </>
          }
        />
      )}

      {showErrorPopup && (
        <PopupWrap
          Warning
          title="작업이 중단되었습니다"
          message="데이터 오류로 인해 페이지가 초기화됩니다."
          message2="작업 중인 내용은 작업관리 페이지를 확인하세요."
          buttonType="Outline"
          closeText="확인"
          onConfirm={() => {
            setShowErrorPopup(false);
            window.location.href = "/";
          }}
          onCancel={() => {
            setShowErrorPopup(false);
            window.location.href = "/";
          }}
        />
      )}
      {isLoadingType && <div className="loading-bar">Loading...</div>}
    </>
  );
};

export default PagePersona2;

const AgeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  > div {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .empty-space {
    width: 100%;
  }
`;

const TooltipButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.75rem;
  color: ${palette.gray300};
  padding: 4px 8px;
  cursor: pointer;
  z-index: 1;

  &:after {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 0.63rem;
    color: ${palette.gray500};
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};
    content: "?";
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  top: -25px;
  right: -300px;
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  padding: 20px 20px 32px;
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  animation: fadeIn 0.3s ease-in-out;
  cursor: default;
  z-index: 100;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:before {
    position: absolute;
    top: 30px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${palette.white};
    content: "";
  }
`;

const TooltipHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 300;
  color: ${palette.gray800};
  line-height: 1.5;
  width: 100%;

  span {
    position: relative;
    width: 16px;
    height: 16px;
    display: block;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 16px;
      display: block;
      border-radius: 5px;
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
`;

const TooltipBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: ${(props) =>
    props.Basic || props.Custom ? "0.75rem" : "0.63rem"};
  color: ${(props) =>
    props.Basic
      ? palette.green
      : props.Custom
      ? palette.primary
      : palette.gray500};
  line-height: 1.2;
  padding: 4px 8px;
  border-radius: 50px;
  border: 1px solid
    ${(props) =>
      props.Basic
        ? `rgba(52, 199, 89, 0.10)`
        : props.Custom
        ? `rgba(34, 111, 255, 0.10)`
        : palette.gray200};
  background: ${(props) =>
    props.Basic
      ? `rgba(52, 199, 89, 0.10)`
      : props.Custom
      ? `rgba(34, 111, 255, 0.10)`
      : palette.white};
`;

const Sidebar = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  width: 290px;
  padding: 16px 20px;
  margin-top: 44px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h5 {
    font-size: 0.88rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  span {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.gray700};
  }

  .icon {
    font-size: 1.13rem;
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 20px;
  background: ${palette.outlineGray};

  &:before {
    display: block;
    width: ${(props) => props.progress}%;
    height: 100%;
    border-radius: 20px;
    background: ${palette.primary};
    content: "";
  }
`;

const PersonaCards = styled.div`
  display: flex;
  flex-direction: ${(props) => {
    if (props.row) return `row`;
    else return `column`;
  }};
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

// const BottomBar = styled.div`
//   position: sticky;
//   bottom: 40px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 24px 20px;
//   border-radius: 10px;
//   border: 1px solid ${palette.outlineGray};
//   box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
//   background: ${palette.white};

//   //   button:disabled {
//   //     cursor: default;
//   //   }

//   p {
//     font-size: 0.875rem;
//     font-weight: 300;
//     line-height: 1.5;
//     color: ${palette.gray500};

//     span {
//       font-size: 1rem;
//       font-weight: 600;
//       color: ${palette.primary};
//       // text-decoration: underline;
//     }
//   }
// `;

// const BottomBar = styled.div`
//   position: fixed;
//   bottom: 40px;
//   width: 718px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 24px 20px;
//   border-radius: 10px;
//   border: 1px solid ${palette.outlineGray};
//   box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
//   background: ${palette.white};
//   z-index: 100;

//   p {
//     font-size: 0.875rem;
//     font-weight: 300;
//     line-height: 1.5;
//     color: ${palette.gray500};

//     span {
//       font-size: 1rem;
//       font-weight: 600;
//       color: ${palette.primary};
//     }
//   }
// `;

const BannerPersona = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 26px 32px 26px 50px;
  border-radius: 10px;
  background: #f8f9fd;
  overflow: hidden;
  margin-bottom: 120px; // 하단 여백 추가하여 BottomBar가 가리지 않도록 함

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
  }

  h2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 4px;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.3;
    color: ${palette.gray800};

    p {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      color: ${palette.gray700};
    }
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  height: 67px;

  span {
    position: relative;
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 67px;
    height: 67px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};
    cursor: pointer;
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &.down:before,
    &.up:before,
    &.up:after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 11px;
      height: 2px;
      border-radius: 10px;
      background: ${palette.gray500};
      content: "";
    }

    &.up:after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  input {
    font-size: 1rem;
    font-weight: 300;
    color: ${palette.gray500};
    text-align: center;
    padding: 24px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    outline: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
  }
`;

const Tabheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const FillterWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;



const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;