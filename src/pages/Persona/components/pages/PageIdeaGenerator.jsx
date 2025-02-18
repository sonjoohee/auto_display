//아이디어 제너레이터
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
import MoleculeHeader from "../molecules/MoleculeHeader";
import {
  ButtonGroup,
  Button,
  IconButton,
} from "../../../../assets/styles/ButtonStyle";
import {
  FormBox,
  CustomTextarea,
  CustomInput,
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
  CheckBoxButton,
  RadioButton,
} from "../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  Badge,
  TabWrapType4,
  TabButtonType4,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  CardGroupWrap,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BottomBar,
  BgBoxItem,
  ListBoxItem,
  TextWrap,
  ListBox,
  Table,
  TableHeader,
  TableBody,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import {
  H4,
  H3,
  H5,
  Sub1,
  Sub3,
  Body1,
  Body2,
  Body3,
  Caption1,
  Caption2,
} from "../../../../assets/styles/Typography";
import ZoomableSunburst from "../../../../components/Charts/ZoomableSunburst";

const data = [
  {
    key: "1",
    title: "아이디어",
    marketSize: "",
    productConcept: "",
    implementability: "",
    uniqueness: "",
  },
  {
    key: "2",
    title: "아이디어",
    marketSize: "",
    productConcept: "",
    implementability: "",
    uniqueness: "",
  },
  {
    key: "3",
    title: "아이디어",
    marketSize: "",
    productConcept: "",
    implementability: "",
    uniqueness: "",
  },
  {
    key: "4",
    title: "아이디어",
    marketSize: "",
    productConcept: "",
    implementability: "",
    uniqueness: "",
  },
];

// ideaData 수정
const ideaData = {
  name: "비즈니스 아이디어",
  children: [
    {
      name: "경제적 가치",
      children: [
        {
          name: "맞춤형 렌탈 서비스",
          children: [
            { name: "맞춤형 렌탈 서비스1", value: 100 },
            { name: "맞춤형 렌탈 서비스2", value: 80 },
            { name: "맞춤형 렌탈 서비스3", value: 60 },
          ],
        },
        {
          name: "중고 거래 플랫폼 연동",
          children: [
            { name: "중고 거래 플랫폼 연동1", value: 90 },
            { name: "중고 거래 플랫폼 연동2", value: 70 },
            { name: "중고 거래 플랫폼 연동3", value: 85 },
          ],
        },
        {
          name: "포인트 적립 & 할인 혜택",
          children: [
            { name: "포인트 적립 & 할인 혜택1", value: 90 },
            { name: "포인트 적립 & 할인 혜택2", value: 70 },
            { name: "포인트 적립 & 할인 혜택3", value: 85 },
          ],
        },
        {
          name: "DIY 디자인 튜터링",
          children: [
            { name: "DIY 디자인 튜터링1", value: 90 },
            { name: "DIY 디자인 튜터링2", value: 70 },
            { name: "DIY 디자인 튜터링3", value: 85 },
          ],
        },
        {
          name: "가성비 인테리어 세트",
          children: [
            { name: "가성비 인테리어 세트1", value: 90 },
            { name: "가성비 인테리어 세트2", value: 70 },
            { name: "가성비 인테리어 세트3", value: 85 },
          ],
        },
        {
          name: "금융 상품 연계 서비스",
          children: [
            { name: "금융 상품 연계 서비스1", value: 90 },
            { name: "금융 상품 연계 서비스2", value: 70 },
            { name: "금융 상품 연계 서비스3", value: 85 },
          ],
        },
        {
          name: "리퍼브 상품 & B급 상품 특별전",
          children: [
            { name: "리퍼브 상품 & B급 상품 특별전1", value: 90 },
            { name: "리퍼브 상품 & B급 상품 특별전2", value: 70 },
            { name: "리퍼브 상품 & B급 상품 특별전3", value: 85 },
          ],
        },
        {
          name: "인테리어 비용 예측 서비스",
          children: [
            { name: "인테리어 비용 예측 서비스1", value: 90 },
            { name: "인테리어 비용 예측 서비스", value: 70 },
            { name: "인테리어 비용 예측 서비스3", value: 85 },
          ],
        },
      ],
    },
    {
      name: "기능적 가치",
      children: [
        {
          name: "맞춤형 공간 분석 & 추천",
          children: [
            { name: "맞춤형 공간 분석 & 추천1", value: 95 },
            { name: "맞춤형 공간 분석 & 추천2", value: 75 },
            { name: "맞춤형 공간 분석 & 추천3", value: 85 },
          ],
        },
        {
          name: "3D 가상 시뮬레이션",
          children: [
            { name: "3D 가상 시뮬레이션1", value: 90 },
            { name: "3D 가상 시뮬레이션2", value: 80 },
            { name: "3D 가상 시뮬레이션3", value: 70 },
          ],
        },
        {
          name: "반려동물 친화적 디자인 필터",
          children: [
            { name: "반려동물 친화적 디자인 필터1", value: 90 },
            { name: "반려동물 친화적 디자인 필터2", value: 80 },
            { name: "반려동물 친화적 디자인 필터3", value: 70 },
          ],
        },
        {
          name: "AI 기반 스타일 큐레이션",
          children: [
            { name: "AI 기반 스타일 큐레이션1", value: 90 },
            { name: "AI 기반 스타일 큐레이션2", value: 80 },
            { name: "AI 기반 스타일 큐레이션3", value: 70 },
          ],
        },
        {
          name: "간편 시공 서비스 연계",
          children: [
            { name: "간편 시공 서비스 연계1", value: 90 },
            { name: "간편 시공 서비스 연계2", value: 80 },
            { name: "간편 시공 서비스 연계3", value: 70 },
          ],
        },
        {
          name: "스마트 홈 연동",
          children: [
            { name: "스마트 홈 연동1", value: 90 },
            { name: "스마트 홈 연동2", value: 80 },
            { name: "스마트 홈 연동3", value: 70 },
          ],
        },
        {
          name: "제품 비교 분석 기능",
          children: [
            { name: "제품 비교 분석 기능1", value: 90 },
            { name: "제품 비교 분석 기능2", value: 80 },
            { name: "제품 비교 분석 기능3", value: 70 },
          ],
        },
        {
          name: "전문가 Q&A 게시판",
          children: [
            { name: "전문가 Q&A 게시판1", value: 90 },
            { name: "전문가 Q&A 게시판2", value: 80 },
            { name: "전문가 Q&A 게시판3", value: 70 },
          ],
        },
      ],
    },
    {
      name: "환경적 가치",
      children: [
        {
          name: "친환경 소재 제품 강조",
          children: [
            { name: "친환경 소재 제품 강조1", value: 95 },
            { name: "친환경 소재 제품 강조2", value: 75 },
            { name: "친환경 소재 제품 강조3", value: 85 },
          ],
        },
        {
          name: "업사이클링 & 리사이클링 디자인",
          children: [
            { name: "업사이클링 & 리사이클링 디자인1", value: 90 },
            { name: "업사이클링 & 리사이클링 디자인2", value: 80 },
            { name: "업사이클링 & 리사이클링 디자인3", value: 70 },
          ],
        },
        {
          name: "탄소 배출량 정보 제공",
          children: [
            { name: "탄소 배출량 정보 제공1", value: 90 },
            { name: "탄소 배출량 정보 제공2", value: 80 },
            { name: "탄소 배출량 정보 제공3", value: 70 },
          ],
        },
        {
          name: "중고 제품 활성화",
          children: [
            { name: "중고 제품 활성화1", value: 90 },
            { name: "중고 제품 활성화2", value: 80 },
            { name: "중고 제품 활성화3", value: 70 },
          ],
        },
        {
          name: "친환경 포장재 사용",
          children: [
            { name: "친환경 포장재 사용1", value: 90 },
            { name: "친환경 포장재 사용2", value: 80 },
            { name: "친환경 포장재 사용3", value: 70 },
          ],
        },
        {
          name: "에너지 효율 제품 추천",
          children: [
            { name: "에너지 효율 제품 추천1", value: 90 },
            { name: "에너지 효율 제품 추천2", value: 80 },
            { name: "에너지 효율 제품 추천3", value: 70 },
          ],
        },
        {
          name: "공기 정화 기능 제품",
          children: [
            { name: "공기 정화 기능 제품1", value: 90 },
            { name: "공기 정화 기능 제품2", value: 80 },
            { name: "공기 정화 기능 제품3", value: 70 },
          ],
        },
        {
          name: "기부 캠페인 연계",
          children: [
            { name: "기부 캠페인 연계1", value: 90 },
            { name: "기부 캠페인 연계2", value: 80 },
            { name: "기부 캠페인 연계3", value: 70 },
          ],
        },
      ],
    },
    {
      name: "교육적 가치",
      children: [
        {
          name: "인테리어 튜토리얼 제공",
          children: [
            { name: "인테리어 튜토리얼 제공1", value: 95 },
            { name: "인테리어 튜토리얼 제공2", value: 75 },
            { name: "인테리어 튜토리얼 제공3", value: 85 },
          ],
        },
        {
          name: "전문가 강좌 & 웨비나",
          children: [
            { name: "전문가 강좌 & 웨비나1", value: 90 },
            { name: "전문가 강좌 & 웨비나2", value: 80 },
            { name: "전문가 강좌 & 웨비나3", value: 70 },
          ],
        },
        {
          name: "공간별 맞춤 가이드",
          children: [
            { name: "공간별 맞춤 가이드1", value: 90 },
            { name: "공간별 맞춤 가이드2", value: 80 },
            { name: "공간별 맞춤 가이드3", value: 70 },
          ],
        },
        {
          name: "반려동물 인테리어 교육",
          children: [
            { name: "반려동물 인테리어 교육1", value: 90 },
            { name: "반려동물 인테리어 교육2", value: 80 },
            { name: "반려동물 인테리어 교육3", value: 70 },
          ],
        },
        {
          name: "디자인 트렌드 리포트",
          children: [
            { name: "디자인 트렌드 리포트1", value: 90 },
            { name: "디자인 트렌드 리포트2", value: 80 },
            { name: "디자인 트렌드 리포트3", value: 70 },
          ],
        },
        {
          name: "DIY 워크숍",
          children: [
            { name: "DIY 워크숍1", value: 90 },
            { name: "DIY 워크숍2", value: 80 },
            { name: "DIY 워크숍3", value: 70 },
          ],
        },
        {
          name: "커뮤니티 기반 노하우 공유",
          children: [
            { name: "커뮤니티 기반 노하우 공유1", value: 90 },
            { name: "커뮤니티 기반 노하우 공유2", value: 80 },
            { name: "커뮤니티 기반 노하우 공유3", value: 70 },
          ],
        },
        {
          name: "AR 체험 가이드",
          children: [
            { name: "AR 체험 가이드1", value: 90 },
            { name: "AR 체험 가이드2", value: 80 },
            { name: "AR 체험 가이드3", value: 70 },
          ],
        },
      ],
    },
    {
      name: "감성적 가치",
      children: [
        {
          name: "맞춤형 테마 공간 제안",
          children: [
            { name: "맞춤형 테마 공간 제안1", value: 95 },
            { name: "맞춤형 테마 공간 제안2", value: 75 },
            { name: "맞춤형 테마 공간 제안3", value: 85 },
          ],
        },
        {
          name: "힐링 & 휴식 공간 제안",
          children: [
            { name: "힐링 & 휴식 공간 제안1", value: 90 },
            { name: "힐링 & 휴식 공간 제안2", value: 80 },
            { name: "힐링 & 휴식 공간 제안3", value: 70 },
          ],
        },
        {
          name: "사진 기반 스토리텔링",
          children: [
            { name: "사진 기반 스토리텔링1", value: 90 },
            { name: "사진 기반 스토리텔링2", value: 80 },
            { name: "사진 기반 스토리텔링3", value: 70 },
          ],
        },
        {
          name: "긍정적 피드백 시스템",
          children: [
            { name: "긍정적 피드백 시스템1", value: 90 },
            { name: "긍정적 피드백 시스템2", value: 80 },
            { name: "긍정적 피드백 시스템3", value: 70 },
          ],
        },
        {
          name: "반려동물 사진 갤러리",
          children: [
            { name: "반려동물 사진 갤러리1", value: 90 },
            { name: "반려동물 사진 갤러리2", value: 80 },
            { name: "반려동물 사진 갤러리3", value: 70 },
          ],
        },
        {
          name: "계절별 인테리어 테마",
          children: [
            { name: "계절별 인테리어 테마1", value: 90 },
            { name: "계절별 인테리어 테마2", value: 80 },
            { name: "계절별 인테리어 테마3", value: 70 },
          ],
        },
        {
          name: "나만의 공간 큐레이션",
          children: [
            { name: "나만의 공간 큐레이션1", value: 90 },
            { name: "나만의 공간 큐레이션2", value: 80 },
            { name: "나만의 공간 큐레이션3", value: 70 },
          ],
        },
        {
          name: "향기 & 사운드 추천",
          children: [
            { name: "향기 & 사운드 추천1", value: 90 },
            { name: "향기 & 사운드 추천2", value: 80 },
            { name: "향기 & 사운드 추천3", value: 70 },
          ],
        },
      ],
    },
    {
      name: "사회적 가치",
      children: [
        {
          name: "커뮤니티 기반 정보 교류",
          children: [
            { name: "커뮤니티 기반 정보 교류1", value: 95 },
            { name: "커뮤니티 기반 정보 교류2", value: 75 },
            { name: "커뮤니티 기반 정보 교류3", value: 85 },
          ],
        },
        {
          name: "반려동물 동반 모임 지원",
          children: [
            { name: "반려동물 동반 모임 지원1", value: 90 },
            { name: "반려동물 동반 모임 지원2", value: 80 },
            { name: "반려동물 동반 모임 지원3", value: 70 },
          ],
        },
        {
          name: "재능 기부 플랫폼 연계",
          children: [
            { name: "재능 기부 플랫폼 연계1", value: 90 },
            { name: "재능 기부 플랫폼 연계2", value: 80 },
            { name: "재능 기부 플랫폼 연계3", value: 70 },
          ],
        },
        {
          name: "지역 사회 연계",
          children: [
            { name: "지역 사회 연계1", value: 90 },
            { name: "지역 사회 연계2", value: 80 },
            { name: "지역 사회 연계3", value: 70 },
          ],
        },
        {
          name: "소셜 미디어 연동",
          children: [
            { name: "소셜 미디어 연동1", value: 90 },
            { name: "소셜 미디어 연동2", value: 80 },
            { name: "소셜 미디어 연동3", value: 70 },
          ],
        },
        {
          name: "자선 경매 & 바자회 개최",
          children: [
            { name: "자선 경매 & 바자회 개최1", value: 90 },
            { name: "자선 경매 & 바자회 개최2", value: 80 },
            { name: "자선 경매 & 바자회 개최3", value: 70 },
          ],
        },
        {
          name: "파트너십 프로그램",
          children: [
            { name: "파트너십 프로그램1", value: 90 },
            { name: "파트너십 프로그램2", value: 80 },
            { name: "파트너십 프로그램3", value: 70 },
          ],
        },
        {
          name: "사회적 기업 제품 판매",
          children: [
            { name: "사회적 기업 제품 판매1", value: 90 },
            { name: "사회적 기업 제품 판매2", value: 80 },
            { name: "사회적 기업 제품 판매3", value: 70 },
          ],
        },
      ],
    },
  ],
};

const PageIdeaGenerator = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMore, setShowPopupMore] = useState(false);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
    analysisScope: "",
  });
  const [selectedInterviewType, setSelectedInterviewType] = useState(null);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] =
    useState(null);
  const [activeTab1, setActiveTab1] = useState("personaInfo");
  const [contactForm, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [dropUp, setDropUp] = useState(false);
  const selectBoxRef = useRef(null);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [targetCustomers, setTargetCustomers] = useState(["", "", ""]);
  const [personaData, setPersonaData] = useState({
    personaInfo: "",
    personaScenario: "",
  });

  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
    analysisScope: false,
  });

  const [dropUpStates, setDropUpStates] = useState({
    customerList: false,
    analysisScope: false,
  });

  const customerListRef = useRef(null);
  const analysisScopeRef = useRef(null);

  const calculateDropDirection = (ref, selectBoxId) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200;

      setDropUpStates((prev) => ({
        ...prev,
        [selectBoxId]: spaceBelow < dropDownHeight && spaceAbove > spaceBelow,
      }));
    }
  };

  const handleSelectBoxClick = (selectBoxId, ref) => {
    calculateDropDirection(ref, selectBoxId);
    setSelectBoxStates((prev) => ({
      ...prev,
      [selectBoxId]: !prev[selectBoxId],
    }));
  };

  const handlePurposeSelect = (purpose, selectBoxId) => {
    setSelectedPurposes((prev) => ({
      ...prev,
      [selectBoxId]: purpose,
    }));
    handleContactInputChange("purpose", purpose);
    setSelectBoxStates((prev) => ({
      ...prev,
      [selectBoxId]: false,
    }));
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectPersona = () => {
    if (selectedPersonas.length > 0) {
      setSelectedInterviewType("multiple");
      setSelectedInterviewPurpose("product_experience_new");
    }
  };

  const handleCheckboxChange = (personaId) => {
    setSelectedPersonas((prev) => {
      if (prev.includes(personaId)) {
        return prev.filter((id) => id !== personaId);
      } else {
        // 최대 5개까지만 선택 가능
        if (prev.length >= 5) return prev;
        return [...prev, personaId];
      }
    });
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  // 필수 필드가 모두 입력되었는지 확인하는 함수
  const isRequiredFieldsFilled = () => {
    return (
      businessDescription.trim() !== "" &&
      targetCustomers.some((customer) => customer.trim() !== "") // 최소 1개 이상의 고객 정보가 입력되었는지 확인
    );
  };

  // 비즈니스 설명 입력 핸들러
  const handleBusinessDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 150) {
      setBusinessDescription(input);
    }
  };

  // 각 입력 필드의 변경을 처리하는 함수
  const handleTargetCustomerChange = (index, value) => {
    setTargetCustomers((prev) => {
      const newTargetCustomers = [...prev];
      newTargetCustomers[index] = value;
      return newTargetCustomers;
    });
  };

  const handleInterviewTypeSelect = (type) => {
    setSelectedInterviewType(type);
  };

  const [activeAnalysisTab, setActiveAnalysisTab] = useState("summary");

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <IdeaGeneratorWrap>
            <TabWrapType5>
              <TabButtonType5
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray800" : "gray300"}>
                    비즈니스 입력
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={!completedSteps.includes(1)}
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    타겟 세그먼트
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    Customer Segment
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={!completedSteps.includes(2)}
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
                    아이디어 도출
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
                    Idea Generation
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 4}
                onClick={() => completedSteps.includes(3) && setActiveTab(4)}
                disabled={!completedSteps.includes(3)}
              >
                <span>04</span>
                <div className="text">
                  <Body1 color={activeTab >= 4 ? "gray800" : "gray300"}>
                    최종 인사이트 분석
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Define Business Key Value</H3>
                  <Body3 color="gray800">
                    다양한 아이디어를 발산하고자 하는 핵심 키워드를 입력하세요
                  </Body3>
                </div>

                <div className="content">
                  <TabContent5Item>
                    <div className="title">
                      <Body1 color="gray700">비즈니스 핵심 가치 가져오기</Body1>
                    </div>

                    <SelectBox ref={customerListRef}>
                      <SelectBoxTitle
                        onClick={() =>
                          handleSelectBoxClick("customerList", customerListRef)
                        }
                      >
                        <Body2
                          color={
                            selectedPurposes.customerList
                              ? "gray800"
                              : "gray300"
                          }
                        >
                          {selectedPurposes.customerList ||
                            "고객 핵심 가치 분석을 진행을 완료하신 경우, 정보를 가져올 수 있습니다."}
                        </Body2>
                        <images.ChevronDown
                          width="24px"
                          height="24px"
                          color={palette.gray500}
                          style={{
                            transform: selectBoxStates.customerList
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </SelectBoxTitle>

                      {selectBoxStates.customerList && (
                        <SelectBoxList dropUp={dropUpStates.customerList}>
                          <SelectBoxItem
                            onClick={() =>
                              handlePurposeSelect(
                                "진행된 프로젝트가 없습니다. 타겟 탐색기를 먼저 진행해주세요",
                                "customerList"
                              )
                            }
                          >
                            <Body2 color="gray700" align="left">
                              진행된 프로젝트가 없습니다. 타겟 탐색기를 먼저
                              진행해주세요
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() =>
                              handlePurposeSelect("{Businss}", "customerList")
                            }
                          >
                            <Body2 color="gray700" align="left">
                              (Businss)
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() =>
                              handlePurposeSelect("{Businss1}", "customerList")
                            }
                          >
                            <Body2 color="gray700" align="left">
                              (Businss1)
                            </Body2>
                          </SelectBoxItem>
                        </SelectBoxList>
                      )}
                    </SelectBox>
                  </TabContent5Item>

                  <TabContent5Item required>
                    <div className="title">
                      <Body1 color="gray700">비즈니스 설명</Body1>
                      <Body1 color="red">*</Body1>
                    </div>
                    <FormBox Large>
                      <CustomTextarea
                        Edit
                        rows={4}
                        placeholder="비즈니스에 대해서 설명해주세요 (예: 친환경 전기 자전거 공유 플랫폼 등)"
                        onChange={handleBusinessDescriptionChange}
                        value={businessDescription}
                        maxLength={150}
                        status="valid"
                      />
                      <Body2 color="gray300" align="right">
                        {businessDescription.length} / 150
                      </Body2>
                    </FormBox>
                  </TabContent5Item>

                  <TabContent5Item required>
                    <div className="title">
                      <Body1 color="gray700">비즈니스 핵심 가치 작성</Body1>
                      <Body1 color="red">*</Body1>
                    </div>
                    {targetCustomers.map((customer, index) => (
                      <CustomInput
                        key={index}
                        type="text"
                        placeholder="핵심 가치를 작성해주세요 (예: 안전한 송금 등)"
                        value={customer}
                        onChange={(e) =>
                          handleTargetCustomerChange(index, e.target.value)
                        }
                      />
                    ))}
                    <Button
                      DbExLarge
                      More
                      onClick={() => {
                        if (targetCustomers.length < 5) {
                          setTargetCustomers((prev) => [...prev, ""]);
                        }
                      }}
                      disabled={targetCustomers.length >= 5}
                    >
                      <Body2 color="gray300">+ 추가하기</Body2>
                    </Button>
                  </TabContent5Item>
                </div>

                <Button
                  Other
                  Primary
                  Fill
                  Round
                  onClick={() => setShowPopupError(true)}
                  disabled={!isRequiredFieldsFilled()}
                >
                  다음
                </Button>
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Customer Segmentation</H3>
                  <Body3 color="gray800">
                    비즈니스에 적합한 타겟 고객을 중심으로 최적화된 아이디어
                    도출을 진행해보세요
                  </Body3>
                </div>

                <SegmentContent>
                  <div>
                    <Body2 color="gray800" align="left">
                      아이디어 도출하고 싶은 고객이 있으신가요?
                    </Body2>

                    <CardGroupWrap rowW50>
                      <ListBoxItem
                        active={selectedInterviewType === "yesTarget"}
                      >
                        <ListText>
                          <ListTitle>
                            <Body1
                              color={
                                selectedInterviewType === "yesTarget"
                                  ? "primary"
                                  : "gray800"
                              }
                            >
                              제가 원하는 타겟 고객이 있습니다.
                            </Body1>
                          </ListTitle>
                        </ListText>
                        <div>
                          <RadioButton
                            id="radio1"
                            name="radioGroup1"
                            checked={selectedInterviewType === "yesTarget"}
                            onChange={() =>
                              handleInterviewTypeSelect("yesTarget")
                            }
                          />
                        </div>
                      </ListBoxItem>

                      <ListBoxItem
                        active={selectedInterviewType === "noTarget"}
                      >
                        <ListText>
                          <ListTitle>
                            <Body1
                              color={
                                selectedInterviewType === "noTarget"
                                  ? "primary"
                                  : "gray800"
                              }
                            >
                              아직 잘 모르겠습니다. 타겟 고객을 알려주세요
                            </Body1>
                          </ListTitle>
                        </ListText>
                        <div>
                          <RadioButton
                            id="radio1"
                            name="radioGroup1"
                            checked={selectedInterviewType === "noTarget"}
                            onChange={() =>
                              handleInterviewTypeSelect("noTarget")
                            }
                          />
                        </div>
                      </ListBoxItem>
                    </CardGroupWrap>
                  </div>
                </SegmentContent>

                <div className="content">
                  {selectedInterviewType === "yesTarget" ? (
                    <>
                      <TabContent5Item style={{ marginBottom: "140px" }}>
                        <div className="title">
                          <Body1 color="gray700">
                            어떤 고객을 중심으로 아이디어를 도출하시겠습니까?
                          </Body1>
                        </div>

                        <FormBox Large>
                          <CustomTextarea
                            Edit
                            rows={4}
                            placeholder="한명만 작성 가능 (예시 : 작성필요)"
                            status="valid"
                          />
                        </FormBox>
                      </TabContent5Item>
                    </>
                  ) : selectedInterviewType === "noTarget" ? (
                    <>
                      <CardGroupWrap column style={{ marginBottom: "140px" }}>
                        <ListBoxItem
                          NoBg
                          selected={selectedPersonas.includes("persona1")}
                          active={selectedPersonas.includes("persona1")}
                        >
                          <div>
                            <CheckBoxButton
                              id="persona1"
                              name="persona1"
                              checked={selectedPersonas.includes("persona1")}
                              onChange={() => handleCheckboxChange("persona1")}
                            />
                          </div>
                          <ListText>
                            <ListTitle>
                              <Body1
                                color={
                                  selectedPersonas.includes("persona1")
                                    ? "primary"
                                    : "gray800"
                                }
                              >
                                가족과 함께 여가를 보내는 활동 지향형 소비자
                              </Body1>
                            </ListTitle>

                            <ListSubtitle>
                              <Badge Keyword>#키워드1</Badge>
                              <Badge Keyword>#키워드2</Badge>
                              <Badge Keyword>#키워드3</Badge>
                            </ListSubtitle>
                          </ListText>
                          <ListButton>
                            <CustomButton
                              Medium
                              PrimaryLightest
                              Fill
                              onClick={() => setShowPopup(true)}
                            >
                              자세히
                            </CustomButton>
                          </ListButton>
                        </ListBoxItem>

                        <ListBoxItem
                          NoBg
                          selected={selectedPersonas.includes("persona2")}
                          active={selectedPersonas.includes("persona2")}
                        >
                          <div>
                            <CheckBoxButton
                              id="persona2"
                              name="persona2"
                              checked={selectedPersonas.includes("persona2")}
                              onChange={() => handleCheckboxChange("persona2")}
                            />
                          </div>
                          <ListText>
                            <ListTitle>
                              <Body1
                                color={
                                  selectedPersonas.includes("persona2")
                                    ? "primary"
                                    : "gray800"
                                }
                              >
                                가족과 함께 여가를 보내는 활동 지향형 소비자
                              </Body1>
                            </ListTitle>

                            <ListSubtitle>
                              <Badge Keyword>#키워드1</Badge>
                              <Badge Keyword>#키워드2</Badge>
                              <Badge Keyword>#키워드3</Badge>
                            </ListSubtitle>
                          </ListText>
                          <ListButton>
                            <CustomButton
                              Medium
                              PrimaryLightest
                              Fill
                              onClick={() => setShowPopup(true)}
                            >
                              자세히
                            </CustomButton>
                          </ListButton>
                        </ListBoxItem>
                      </CardGroupWrap>
                    </>
                  ) : (
                    <></>
                  )}

                  <BottomBar W100>
                    <Body2 color="gray800">
                      시나리오 분석을 원하는 페르소나를 선택해주세요
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={selectedPersonas.length === 0}
                      onClick={() => handleNextStep(2)}
                    >
                      다음
                      <images.ChevronRight
                        width="20"
                        height="20"
                        color={palette.white}
                      />
                    </Button>
                  </BottomBar>
                </div>
              </TabContent5>
            )}

            {activeTab === 3 && completedSteps.includes(2) && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Idea Generation without Limits</H3>
                  <Body3 color="gray800">
                    비즈니스 핵심가치를 중심으로 체계화된 방법으로 수많은
                    아이디어를 도출해드려요
                  </Body3>
                </div>

                <div className="content">
                  <CardGroupWrap column style={{ marginBottom: "140px" }}>
                    <ListBoxItem>
                      <ListText>
                        <Body1 color="gray800">Key Value 1</Body1>
                      </ListText>
                      <ListButton>
                        <CustomButton
                          Medium
                          PrimaryLightest
                          Fill
                          onClick={() => setShowPopupMore(true)}
                        >
                          30개 아이디어 확인
                        </CustomButton>
                      </ListButton>
                    </ListBoxItem>

                    <ListBoxItem>
                      <ListText>
                        <Body1 color="gray800">Key Value 1</Body1>
                      </ListText>
                      <ListButton>
                        <CustomButton
                          Medium
                          PrimaryLightest
                          Fill
                          onClick={() => setShowPopupMore(true)}
                        >
                          30개 아이디어 확인
                        </CustomButton>
                      </ListButton>
                    </ListBoxItem>
                  </CardGroupWrap>

                  <BottomBar W100>
                    <Body2 color="gray800">
                      시나리오 분석을 원하는 페르소나를 선택해주세요
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      onClick={() => handleNextStep(3)}
                    >
                      다음
                      <images.ChevronRight
                        width="20"
                        height="20"
                        color={palette.white}
                      />
                    </Button>
                  </BottomBar>
                </div>
              </TabContent5>
            )}

            {activeTab === 4 && completedSteps.includes(3) && (
              <TabContent5 Small>
                <BgBoxItem primaryLightest>
                  <H3 color="gray800">아이디어 분석 및 우선순위 선정</H3>
                  <Body3 color="gray800">
                    구조화된 창의적 사고 프로세스를 통해 새로운 기회를
                    찾아보세요
                  </Body3>
                </BgBoxItem>

                <InsightAnalysis>
                  <div className="title">
                    <div>
                      <TabWrapType4>
                        <TabButtonType4
                          active={activeAnalysisTab === "summary"}
                          onClick={() => setActiveAnalysisTab("summary")}
                        >
                          종합 분석 결과
                        </TabButtonType4>
                        <TabButtonType4
                          active={activeAnalysisTab === "positioning"}
                          onClick={() => setActiveAnalysisTab("positioning")}
                        >
                          포지셔닝 맵
                        </TabButtonType4>
                      </TabWrapType4>
                    </div>
                    <Button Primary onClick={() => setShowPopupSave(true)}>
                      리포트 저장하기
                    </Button>
                  </div>

                  <div className="content">
                    <H4 color="gray800">
                      (Business)의 타겟분석결과
                      <br />
                      OOO, OOO, OOO의 요인의 우선순위가 높았습니다.
                    </H4>

                    <Body3 color="gray700">
                      비즈니스 핵심가치 10개를 중심으로 각 가치별 6개의 가치를
                      적용하여 총 100개의 아이디어를 도출 할 수 있었습니다.
                      (Business)에 대한 분석 내용과 어떤 부분을 참고해서
                      봐야한다는 부분을 제시하면 좋을 듯
                    </Body3>

                    <Body3 color="gray700">
                      OOO를 기반으로 20개의 아이디어를 선별하였습니다.
                    </Body3>
                  </div>
                </InsightAnalysis>

                {activeAnalysisTab === "summary" ? (
                  <TabContent5Item>
                    <div className="title">
                      <Body1 color="gray800" align="left">
                        🎯 우선순위가 높은 아이디어를 선정해보았어요
                      </Body1>
                    </div>

                    <IdeaRankingTable>
                      <Table>
                        <TableHeader>
                          <tr>
                            <th></th>
                            <th>
                              <Body1 color="gray800">시장 규모/성장성성</Body1>
                            </th>
                            <th>
                              <Body1 color="gray800">상품 컨셉 매력도</Body1>
                            </th>
                            <th>
                              <Body1 color="gray800">구현 가능성</Body1>
                            </th>
                            <th>
                              <Body1 color="gray800">차별성</Body1>
                            </th>
                          </tr>
                        </TableHeader>
                        <TableBody>
                          {data.map((val, key) => (
                            <tr key={key}>
                              <th>
                                <Body3 color="gray700">{val.title}</Body3>
                              </th>
                              <td>
                                <Body3 color="gray700">{val.marketSize}</Body3>
                              </td>
                              <td>
                                <Body3 color="gray700">
                                  {val.productConcept}
                                </Body3>
                              </td>
                              <td>
                                <Body3 color="gray700">
                                  {val.implementability}
                                </Body3>
                              </td>
                              <td>
                                <Body3 color="gray700">{val.uniqueness}</Body3>
                              </td>
                            </tr>
                          ))}
                        </TableBody>
                      </Table>
                    </IdeaRankingTable>
                  </TabContent5Item>
                ) : (
                  <TabContent5Item>
                    <Body1 color="gray800">
                      Reach and engagement of campaigns
                    </Body1>
                  </TabContent5Item>
                )}

                <Button Small Primary onClick={() => setShowPopupSave(true)}>
                  리포트 저장하기
                </Button>
              </TabContent5>
            )}
          </IdeaGeneratorWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && (
        <ReadMorePopup
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPopup(false);
            }
          }}
        >
          <div>
            <div className="title">
              <div>
                <Body1 color="gray800">
                  가족과 함께 여가를 보내는 활동 지향형 소비자
                </Body1>
                <div className="keyword">
                  <Badge Keyword>#키워드1</Badge>
                  <Badge Keyword>#키워드2</Badge>
                  <Badge Keyword>#키워드3</Badge>
                </div>
              </div>
              <Caption1 color="primary">상</Caption1>
            </div>

            <div className="content">
              <Body3 color="gray700" align="left">
                인터뷰 결과, 스마트홈 스피커의 음성 인식률과 반응 속도는 높게
                평가되었으나, 개인 맞춤형 기능 부족 및 정보 보안에 대한 우려가
                주요 문제점으로 나타났습니다. 특히, 워킹맘 답변자는 자녀를 위한
                교육 콘텐츠 및 안전 기능 강화의 필요성을 강조했고, 50대 가장
                답변자는 가족 구성원 모두가 쉽게 사용할 수 있는 가족 친화적인
                인터페이스 부족을 지적했습니다.
              </Body3>
            </div>
          </div>
        </ReadMorePopup>
      )}

      {showPopupMore && (
        <PopupWrap
          Wide1000
          title={
            <>
              <H4 color="gray800" align="left">
                (Key Value)의 (Business)
                <br />
                아이디어 도출하기기
              </H4>
            </>
          }
          buttonType="Fill"
          isModal={true}
          showTabs={true}
          tabs={["아이디어 마인드맵", "아이디어 상세 설명"]}
          activeTab={activeTabIndex}
          onTabChange={(index) => setActiveTabIndex(index)}
          eventState={false}
          creditRequestCustomPersona={1}
          customAlertBox={
            <TextWrap>
              <Body2 color="gray800" align="left">
                이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다.
                특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이
                증가하는 상황에서 유망한 성장 기회를 가집니다. 다만, 참신함이 곧
                블루 오션을 의미하지 않으므로, 진입 전략은 사용자 친화적 디자인,
                가족의 참여를 유도하는 마케팅, 맞춤형 프로그램으로 보강해야
                합니다.
              </Body2>
            </TextWrap>
          }
          body={
            <>
              {activeTabIndex === 0 && (
                <SunburstChart>
                  <ZoomableSunburst
                    data={ideaData}
                    width={700}
                    height={700}
                    colors={[
                      "#A88CCC",
                      "#D98ACF",
                      "#FE93B5",
                      "#FFAE91",
                      "#EED482",
                      "#CFF69D",
                      "#97FAA4",
                      "#77ECC8",
                      "#7BCDE8",
                      "#94A8E9",
                    ]}
                  />
                </SunburstChart>
              )}

              {activeTabIndex === 1 && (
                <>
                  <ListBox>
                    <div>
                      <span className="number">1</span>
                      <div>
                        <Sub1 color="gray800">경제적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          이 비즈니스 아이템은 참신하고 현재의 시장 동향과
                          맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형
                          디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장
                          기회를 가집니다.
                        </Body2>
                        <ul className="ul-list">
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명 아이디어 설명 아이디어
                              설명 아이디어 설명 아이디어 설명 아이디어 설명
                              아이디어 설명 아이디어 설명 아이디어 설명 아이디어
                              설명 아이디어 설명 아이디어 설명 아이디어 설명
                              아이디어 설명 아이디어 설명 아이디어 설명 아이디어
                              설명 아이디어 설명 아이디어 설명 아이디어 설명
                              아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <span className="number">2</span>
                      <div>
                        <Sub1 color="gray800">기능적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          이 비즈니스 아이템은 참신하고 현재의 시장 동향과
                          맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형
                          디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장
                          기회를 가집니다.
                        </Body2>
                        <ul className="ul-list">
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <span className="number">3</span>
                      <div>
                        <Sub1 color="gray800">환경적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          이 비즈니스 아이템은 참신하고 현재의 시장 동향과
                          맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형
                          디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장
                          기회를 가집니다.
                        </Body2>
                        <ul className="ul-list">
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <span className="number">4</span>
                      <div>
                        <Sub1 color="gray800">교육적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          이 비즈니스 아이템은 참신하고 현재의 시장 동향과
                          맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형
                          디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장
                          기회를 가집니다.
                        </Body2>
                        <ul className="ul-list">
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <span className="number">5</span>
                      <div>
                        <Sub1 color="gray800">감정적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          이 비즈니스 아이템은 참신하고 현재의 시장 동향과
                          맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형
                          디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장
                          기회를 가집니다.
                        </Body2>
                        <ul className="ul-list">
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <span className="number">6</span>
                      <div>
                        <Sub1 color="gray800">사회적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          이 비즈니스 아이템은 참신하고 현재의 시장 동향과
                          맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형
                          디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장
                          기회를 가집니다.
                        </Body2>
                        <ul className="ul-list">
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                          <li>
                            <Body2 color="gray700" align="left">
                              아이디어 1 : 아이디어 설명
                            </Body2>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </ListBox>
                </>
              )}
            </>
          }
        />
      )}

      {showPopupError && (
        <PopupWrap
          Warning
          title="다시 입력해 주세요."
          message="현재 입력하신 정보는 목적을 생성할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => handleNextStep(1)}
        />
      )}

      {showPopupSave && (
        <PopupWrap
          Check
          title="리포트가 저장되었습니다."
          message="저장된 리포트는 '보관함'을 확인해주세요"
          buttonType="Outline"
          closeText="보관함 바로가기"
          confirmText="리포트 계속 확인"
          isModal={false}
          onCancel={() => setShowPopupSave(false)}
          onConfirm={() => setShowPopupSave(false)}
        />
      )}
    </>
  );
};

export default PageIdeaGenerator;

const IdeaGeneratorWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const CustomButton = styled(Button)`
  min-width: 92px;
`;

const SegmentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  max-width: 820px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const ReadMorePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 820px;
    width: 100%;
    padding: 24px 24px 24px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    background: ${palette.white};
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    ${Caption1} {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background-color: rgba(34, 111, 255, 0.1);
    }
  }

  .keyword {
    display: flex;
    align-items: flex-start;
    gap: 4px;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding-top: 16px;
    border-top: 1px solid ${palette.gray200};
  }
`;

const InsightAnalysis = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
  }
`;

const IdeaRankingTable = styled.div`
  width: 100%;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const SunburstChart = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;
