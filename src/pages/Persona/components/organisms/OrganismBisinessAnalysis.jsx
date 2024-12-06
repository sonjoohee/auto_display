import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";
import {
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  IS_LOADING,
  PERSONA_BUSINESS_BUTTON_STATE,
  INPUT_BUSINESS_INFO,
  PERSONA_BUSINESS_CAREGORY,
  SHOW_CARD_CONTENT,
  SHOW_INTERVIEW
} from "../../../AtomStates";
import AtomLoader from "../atoms/AtomLoader";

const OrganismBusinessAnalysis = () => {
    const { saveConversation } = useSaveConversation();
    const navigate = useNavigate();
    const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
    const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
    const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
    const [tempMainFeaturesOfBusinessInformation, setTempMainFeaturesOfBusinessInformation] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
    const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
    const [tempMainCharacteristicOfBusinessInformation, setTempMainCharacteristicOfBusinessInformation] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
    const [personaBusinessButtonState, setPersonaBusinessButtonState] = useAtom(PERSONA_BUSINESS_BUTTON_STATE);
    const [isLoading, setIsLoading] = useAtom(IS_LOADING);
    const [personaBusinessCategory, setPersonaBusinessCategory] = useAtom(PERSONA_BUSINESS_CAREGORY);
    const [showCardContent, setShowCardContent] = useAtom(SHOW_CARD_CONTENT);
    const [categoryColor, setCategoryColor] = useState({});
    const [showInterview, setShowInterview] = useAtom(SHOW_INTERVIEW);

    const toggleCardContent = () => {
        setShowCardContent(!showCardContent);
      };

    const getCategoryColor = (category) => {
        switch(category) {
          case '광고/마케팅': return 'Red';
          case '교육': return 'LavenderMagenta';
          case '금융/보험/핀테크': return 'Amethyst';
          case '게임': return 'VistaBlue';
          case '모빌리티/교통': return 'BlueYonder';
          case '물류': return 'MidnightBlue';
          case '부동산/건설': return 'ButtonBlue';
          case '뷰티/화장품': return 'ButtonBlue';
          case 'AI/딥테크/블록체인': return 'MiddleBlueGreen';
          case '소셜미디어/커뮤니티': return 'GreenSheen';
          case '여행/레저': return 'TropicalRainForest';
          case '유아/출산': return 'DollarBill';
          case '인사/비즈니스/법률': return 'Olivine';
          case '제조/하드웨어': return 'ChineseGreen';
          case '커머스': return 'Jonquil';
          case '콘텐츠/예술': return 'PastelOrange';
          case '통신/보안/데이터': return 'Tangerine';
          case '패션': return 'Copper';
          case '푸드/농업': return 'Shadow';
          case '환경/에너지': return 'Tuscany';
          case '홈/리빙/펫': return 'VeryLightTangelo';
          case '헬스케어/바이오': return 'Orange';
          case '피트니스/스포츠': return 'CarnationPink';
          default: return '';
        }
      };

    const axiosConfig = {
        timeout: 100000, // 100초
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
      };

    const data = {
      business_idea: inputBusinessInfo,
      api_key: 1,
    };

    useEffect(() => {
        const loadBusinessAnalysis = async () => {
          let businessData;
          let categoryData;
          let attempts = 0;
          const maxAttempts = 5;
    
          try {
            if (personaBusinessButtonState === 1) {
              setIsLoading(true);
              await new Promise(resolve => setTimeout(resolve, 2000));
              // 버튼 클릭으로 API 호출
              // let response = await axios.post(
              //   "https://wishresearch.kr/panels/business_category",
              //   data,
              //   axiosConfig
              // );

              // // 필요한 데이터가 없을 경우 재시도, 최대 5번
              // while ( 
              //     attempts < maxAttempts && (
              //     !response || !response.data || typeof response.data !== "object" ||
              //     !response.data.hasOwnProperty("business_analysis") ||
              //     !response.data.hasOwnProperty("category") ||
              //     !response.data.business_analysis.hasOwnProperty("명칭") ||
              //     !response.data.business_analysis.hasOwnProperty("주요_목적_및_특징") ||
              //     !response.data.business_analysis.hasOwnProperty("주요기능") ||
              //     !response.data.business_analysis["명칭"] ||
              //     !response.data.business_analysis["주요_목적_및_특징"].length ||
              //     !response.data.business_analysis["주요기능"].length ||
              //     !response.data.category.hasOwnProperty("first") ||
              //     !response.data.category.hasOwnProperty("second") ||
              //     !response.data.category.hasOwnProperty("third") ||
              //     !response.data.category.first ||
              //     !response.data.category.second ||
              //     !response.data.category.third
              // )
              // ) {
              //   attempts += 1;
      
              //   response = await axios.post(
              //     "https://wishresearch.kr/panels/business",
              //     data,
              //     axiosConfig
              //   );
              // }

              // businessData = response.data.business_analysis;
              // categoryData = response.data.category;
      
              // if (attempts >= maxAttempts) {
              //   navigate("/Main");
              // } else {
              //   if (Array.isArray(businessData["주요_목적_및_특징"])) {
              //     setTempMainFeaturesOfBusinessInformation(
              //       businessData["주요_목적_및_특징"]?.map((item) => item)
              //     );
              //     setMainFeaturesOfBusinessInformation(
              //       businessData["주요_목적_및_특징"]?.map((item) => item)
              //     );
              //   } else {
              //     setTempMainFeaturesOfBusinessInformation(
              //       businessData["주요_목적_및_특징"]
              //         ? [businessData["주요_목적_및_특징"]]
              //         : []
              //     );
              //     setMainFeaturesOfBusinessInformation(
              //       businessData["주요_목적_및_특징"]
              //         ? [businessData["주요_목적_및_특징"]]
              //         : []
              //     );
              //   }
      
              //   if (Array.isArray(businessData["주요기능"])) {
              //     setTempMainCharacteristicOfBusinessInformation(
              //       businessData["주요기능"]?.map((item) => item)
              //     );
              //     setMainCharacteristicOfBusinessInformation(
              //       businessData["주요기능"]?.map((item) => item)
              //     );
              //   } else {
              //     setTempMainCharacteristicOfBusinessInformation(
              //       businessData["주요기능"] ? [businessData["주요기능"]] : []
              //     );
              //     setMainCharacteristicOfBusinessInformation(
              //       businessData["주요기능"] ? [businessData["주요기능"]] : []
              //     );
              //   }
      
              //   setTitleOfBusinessInfo(businessData["명칭"]);

              //   const analysisReportData = {
              //     title: businessData?.["명칭"],
              //     mainFeatures: Array.isArray(businessData?.["주요_목적_및_특징"])
              //       ? businessData["주요_목적_및_특징"]
              //       : [],
              //     mainCharacter: Array.isArray(businessData?.["주요기능"])
              //       ? businessData["주요기능"]
              //       : [],
              //   };

              // setPersonaBusinessCategory(categoryData);

              setTitleOfBusinessInfo("모바일 세탁 서비스");
              setMainFeaturesOfBusinessInformation(["본 서비스는 바쁜 현대인을 위해 시간과 공간의 제약 없이 편리하게 세탁 서비스를 이용할 수 있도록 모바일 애플리케이션을 기반으로 구축되었습니다.  고객은 스마트폰 앱을 통해 세탁물 예약, 수거, 배달을 간편하게 처리할 수 있으며, 다양한 세탁 옵션과 추가 서비스를 선택할 수 있습니다.  경쟁 서비스와 비교하여 차별화된 특징으로는,  AI 기반의 세탁물 상태 자동 인식 및 맞춤형 세탁 코스 추천,  실시간 배송 추적 시스템을 통한 투명성 확보,  친환경 세제 및 포장재 사용을 통한 지속가능성 추구를 들 수 있습니다.  이는 바쁜 생활 속에서 시간을 절약하고, 편리함과 신뢰성을 높이며, 환경 보호에도 기여하는 가치를 제공합니다."]);
              setMainCharacteristicOfBusinessInformation([
                  "세탁물 예약 및 관리 기능: 고객은 앱을 통해 원하는 날짜와 시간, 세탁 종류, 추가 서비스(예: 드라이 크리닝, 섬세 세탁) 등을 선택하여 세탁물을 예약할 수 있습니다.  예약 내역 확인 및 변경도 가능하며, 세탁 진행 상황을 실시간으로 확인할 수 있습니다. 이 기능은 사용자 편의성을 극대화하고 예약 관리의 효율성을 높입니다. 기술적으로는 스케줄링 알고리즘과 실시간 데이터베이스 연동이 핵심입니다. ",
                  "수거 및 배송 기능: 지정된 시간에 전문 배송 기사가 고객이 지정한 장소로 방문하여 세탁물을 수거하고, 세탁이 완료된 후 다시 배송합니다.  실시간 위치 추적 시스템을 통해 배송 과정을 투명하게 확인할 수 있습니다.  사용자는  세탁물의 이동 경로를 실시간으로 확인하고 배송 예상 시간을 파악하여 편리하게 이용할 수 있습니다. 기술적으로는 GPS 추적 기술과 효율적인 배송 경로 최적화 알고리즘이 중요합니다.",
                  "결제 및 고객 관리 기능: 다양한 결제 방식(신용카드, 계좌이체 등)을 지원하며,  고객 정보 관리,  세탁 이력 확인,  포인트 적립 및 사용,  쿠폰 발급 등의 기능을 제공합니다.  고객은 자신의 세탁 이력을 쉽게 확인하고 관리할 수 있으며,  회원 등급에 따른 추가 혜택을 받을 수 있습니다. 기술적으로는 안전한 결제 시스템과 개인 정보 보호 기능이 필수적입니다."
              ]);
              setPersonaBusinessCategory({
                  first: "커머스",
                  second: "물류",
                  third: "AI/딥테크/블록체인"
              });

              //   await saveConversation({
              //     changingConversation: {
              //       inputBusinessInfo: "",
              //       analysisReportData: analysisReportData,
              //     },
              //   });
              // }
            }
            //   setCategoryColor({
            //     first: getCategoryColor(categoryData.first),
            //     second: getCategoryColor(categoryData.second),
            //     third: getCategoryColor(categoryData.third)
            //   });

            setCategoryColor({
              first: getCategoryColor("커머스"),
              second: getCategoryColor("물류"),
              third: getCategoryColor("AI/딥테크/블록체인")
            });

          } catch (error) {
            console.error("Error in loadAndSaveData:", error);
          } finally {
            setPersonaBusinessButtonState(0);
            setIsLoading(false);
          }
        };
    
        loadBusinessAnalysis();
      }, []);

  const handleRegenerate = async () => {
    setPersonaBusinessButtonState(1);
    setTitleOfBusinessInfo("");
    let businessData;
    let categoryData;
    let attempts = 0;
    const maxAttempts = 5;

    try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 5000));
        // 버튼 클릭으로 API 호출
        // let response = await axios.post(
        //   "https://wishresearch.kr/panels/business_category",
        //   data,
        //   axiosConfig
        // );

        // // 필요한 데이터가 없을 경우 재시도, 최대 5번
        // while ( 
        //     attempts < maxAttempts && (
        //     !response || !response.data || typeof response.data !== "object" ||
        //     !response.data.hasOwnProperty("business_analysis") ||
        //     !response.data.hasOwnProperty("category") ||
        //     !response.data.business_analysis.hasOwnProperty("명칭") ||
        //     !response.data.business_analysis.hasOwnProperty("주요_목적_및_특징") ||
        //     !response.data.business_analysis.hasOwnProperty("주요기능") ||
        //     !response.data.business_analysis["명칭"] ||
        //     !response.data.business_analysis["주요_목적_및_특징"].length ||
        //     !response.data.business_analysis["주요기능"].length ||
        //     !response.data.category.hasOwnProperty("first") ||
        //     !response.data.category.hasOwnProperty("second") ||
        //     !response.data.category.hasOwnProperty("third") ||
        //     !response.data.category.first ||
        //     !response.data.category.second ||
        //     !response.data.category.third
        // )
        // ) {
        //   attempts += 1;

        //   response = await axios.post(
        //     "https://wishresearch.kr/panels/business",
        //     data,
        //     axiosConfig
        //   );
        // }

        // businessData = response.data.business_analysis;
        // categoryData = response.data.category;

        // if (attempts >= maxAttempts) {
        //   navigate("/Main");
        // } else {
        //   if (Array.isArray(businessData["주요_목적_및_특징"])) {
        //     setTempMainFeaturesOfBusinessInformation(
        //       businessData["주요_목적_및_특징"]?.map((item) => item)
        //     );
        //     setMainFeaturesOfBusinessInformation(
        //       businessData["주요_목적_및_특징"]?.map((item) => item)
        //     );
        //   } else {
        //     setTempMainFeaturesOfBusinessInformation(
        //       businessData["주요_목적_및_특징"]
        //         ? [businessData["주요_목적_및_특징"]]
        //         : []
        //     );
        //     setMainFeaturesOfBusinessInformation(
        //       businessData["주요_목적_및_특징"]
        //         ? [businessData["주요_목적_및_특징"]]
        //         : []
        //     );
        //   }

        //   if (Array.isArray(businessData["주요기능"])) {
        //     setTempMainCharacteristicOfBusinessInformation(
        //       businessData["주요기능"]?.map((item) => item)
        //     );
        //     setMainCharacteristicOfBusinessInformation(
        //       businessData["주요기능"]?.map((item) => item)
        //     );
        //   } else {
        //     setTempMainCharacteristicOfBusinessInformation(
        //       businessData["주요기능"] ? [businessData["주요기능"]] : []
        //     );
        //     setMainCharacteristicOfBusinessInformation(
        //       businessData["주요기능"] ? [businessData["주요기능"]] : []
        //     );
        //   }

        //   setTitleOfBusinessInfo(businessData["명칭"]);

        //   const analysisReportData = {
        //     title: businessData?.["명칭"],
        //     mainFeatures: Array.isArray(businessData?.["주요_목적_및_특징"])
        //       ? businessData["주요_목적_및_특징"]
        //       : [],
        //     mainCharacter: Array.isArray(businessData?.["주요기능"])
        //       ? businessData["주요기능"]
        //       : [],
        //   };

        // setPersonaBusinessCategory(categoryData);

        setTitleOfBusinessInfo("모바일 세탁 서비스");
        setMainFeaturesOfBusinessInformation(["본 서비스는 바쁜 현대인을 위해 시간과 공간의 제약 없이 편리하게 세탁 서비스를 이용할 수 있도록 모바일 애플리케이션을 기반으로 구축되었습니다.  고객은 스마트폰 앱을 통해 세탁물 예약, 수거, 배달을 간편하게 처리할 수 있으며, 다양한 세탁 옵션과 추가 서비스를 선택할 수 있습니다.  경쟁 서비스와 비교하여 차별화된 특징으로는,  AI 기반의 세탁물 상태 자동 인식 및 맞춤형 세탁 코스 추천,  실시간 배송 추적 시스템을 통한 투명성 확보,  친환경 세제 및 포장재 사용을 통한 지속가능성 추구를 들 수 있습니다.  이는 바쁜 생활 속에서 시간을 절약하고, 편리함과 신뢰성을 높이며, 환경 보호에도 기여하는 가치를 제공합니다."]);
        setMainCharacteristicOfBusinessInformation([
            "세탁물 예약 및 관리 기능: 고객은 앱을 통해 원하는 날짜와 시간, 세탁 종류, 추가 서비스(예: 드라이 크리닝, 섬세 세탁) 등을 선택하여 세탁물을 예약할 수 있습니다.  예약 내역 확인 및 변경도 가능하며, 세탁 진행 상황을 실시간으로 확인할 수 있습니다. 이 기능은 사용자 편의성을 극대화하고 예약 관리의 효율성을 높입니다. 기술적으로는 스케줄링 알고리즘과 실시간 데이터베이스 연동이 핵심입니다. ",
            "수거 및 배송 기능: 지정된 시간에 전문 배송 기사가 고객이 지정한 장소로 방문하여 세탁물을 수거하고, 세탁이 완료된 후 다시 배송합니다.  실시간 위치 추적 시스템을 통해 배송 과정을 투명하게 확인할 수 있습니다.  사용자는  세탁물의 이동 경로를 실시간으로 확인하고 배송 예상 시간을 파악하여 편리하게 이용할 수 있습니다. 기술적으로는 GPS 추적 기술과 효율적인 배송 경로 최적화 알고리즘이 중요합니다.",
            "결제 및 고객 관리 기능: 다양한 결제 방식(신용카드, 계좌이체 등)을 지원하며,  고객 정보 관리,  세탁 이력 확인,  포인트 적립 및 사용,  쿠폰 발급 등의 기능을 제공합니다.  고객은 자신의 세탁 이력을 쉽게 확인하고 관리할 수 있으며,  회원 등급에 따른 추가 혜택을 받을 수 있습니다. 기술적으로는 안전한 결제 시스템과 개인 정보 보호 기능이 필수적입니다."
        ]);
        setPersonaBusinessCategory({
            first: "커머스",
            second: "물류",
            third: "AI/딥테크/블록체인"
        });

        //   await saveConversation({
        //     changingConversation: {
        //       inputBusinessInfo: "",
        //       analysisReportData: analysisReportData,
        //     },
        //   });
        // }

      //   setCategoryColor({
      //     first: getCategoryColor(categoryData.first),
      //     second: getCategoryColor(categoryData.second),
      //     third: getCategoryColor(categoryData.third)
      //   });

      setCategoryColor({
        first: getCategoryColor("커머스"),
        second: getCategoryColor("물류"),
        third: getCategoryColor("AI/딥테크/블록체인")
      });
    } catch (error) {
      console.error("Error in handleRegenerate:", error);
    } finally {
      setPersonaBusinessButtonState(0);
      setIsLoading(false);
    }
  };

  return (
    <>
        <Title>
            <h3>비즈니스 분석</h3>
            {!personaBusinessButtonState && (
              <ButtonGroup>
                <IconButton onClick={() => handleRegenerate()}>
                    <img src={images.IconRepeatSquare} alt="재생성" />
                    <span>재생성하기</span>
                </IconButton>
                <IconButton>
                    <img src={images.IconRepeatSquare} alt="수정" />
                    <span>수정하기</span>
                </IconButton>
              </ButtonGroup>
            )}
        </Title>
      {personaBusinessButtonState ? (
        <CardWrap>
         <Card>
          <AtomLoader />
         </Card>
        </CardWrap>
      ) : (
        <CardWrap>
            <Card>
                <CardTitle>
                    <h2>{titleOfBusinessInfo}</h2>
                    <TagWrap>
                    <Tag color={categoryColor.first} />
                    <Tag color={categoryColor.second} />
                    <Tag color={categoryColor.third} />
                    </TagWrap>
                    {showInterview && (
                    <ToggleButton 
                        showContent={showCardContent}
                        onClick={toggleCardContent}
                    >
                        {showCardContent ? '' : ''}
                    </ToggleButton>
                    )}
                </CardTitle>
                {showCardContent && (
                    <CardContent>
                    <p>{mainFeaturesOfBusinessInformation}</p>
                    </CardContent>
                )}
            </Card>
        </CardWrap>
      )}
    </>
  );
};

export default OrganismBusinessAnalysis;

// Styled Components
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 500;
    color: ${palette.gray800};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Pretendard', 'Poppins';
  font-size: 0.75rem;
  color: ${palette.chatBlue};
  padding: 4px 8px;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
`;

const CardTitle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${palette.gray800};
  }
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 0.88rem;
  line-height: 1.5;
  padding: 4px 12px;
  border-radius: 15px;

  &::before {
    content: "${props => {
      switch(props.color) {
        case 'Red': return '광고, 마케팅';
        case 'LavenderMagenta': return '교육';
        case 'Amethyst': return '금융, 보험, 핀테크';
        case 'VistaBlue': return '게임';
        case 'BlueYonder': return '모빌리티, 교통';
        case 'MidnightBlue': return '물류';
        case 'ButtonBlue': return '부동산, 건설';
        case 'ButtonBlue': return '뷰티, 화장품';
        case 'MiddleBlueGreen': return 'AI, 딥테크, 블록체인';
        case 'GreenSheen': return '소셜미디어, 커뮤니티';
        case 'TropicalRainForest': return '여행, 레저';
        case 'DollarBill': return '유아 출산';
        case 'Olivine': return '인사, 비즈니스, 법률';
        case 'ChineseGreen': return '제조, 하드웨어';
        case 'Jonquil': return '커머스';
        case 'PastelOrange': return '콘텐츠, 예술';
        case 'Tangerine': return '통신, 보안, 데이터';
        case 'Copper': return '패션';
        case 'Shadow': return '푸드, 농업';
        case 'Tuscany': return '환경, 에너지';
        case 'VeryLightTangelo': return '홈 리빙, 펫';
        case 'Orange': return '헬스케어, 바이오';
        case 'CarnationPink': return '피트니스, 스포츠';
        default: return '';
      }
    }}";
  }
  
  ${({ color }) => {
    switch(color) {
      case 'Red':
        return `
          color: #E90102;
          background: rgba(233, 1, 2, 0.06);
        `;
      case 'LavenderMagenta':
        return `
          color: #ED7EED;
          background: rgba(237, 126, 237, 0.06);
        `;
      case 'Amethyst':
        return `
          color: #8B61D1;
          background: rgba(139, 97, 209, 0.06);
        `;
      case 'VistaBlue':
        return `
          color: #8B61D1;
          background: rgba(125, 140, 225, 0.06);
        `;
      case 'BlueYonder':
        return `
          color: #8B61D1;
          background: rgba(84, 113, 171, 0.06);
        `;
      case 'MidnightBlue':
        return `
          color: #03458F;
          background: rgba(3, 69, 143, 0.06);
        `;
      case 'ButtonBlue':
        return `
          color: #20B1EA;
          background: rgba(32, 177, 234, 0.06);
        `;
      case 'CeruleanFrost':
        return `
          color: #5E9EBF;
          background: rgba(94, 158, 191, 0.06);
        `;
      case 'MiddleBlueGreen':
        return `
          color: #7DCED2;
          background: rgba(125, 206, 210, 0.06);

        `;
      case 'GreenSheen':
        return `
          color: #74B49C;
          background: rgba(116, 180, 156, 0.06);
        `;
      case 'TropicalRainForest':
        return `
          color: #027355;
          background: rgba(2, 115, 85, 0.06);
        `;
      case 'DollarBill':
        return `
          color: #8DC955;
          background: rgba(141, 201, 85, 0.06);
        `;
      case 'Olivine':
        return `
          color: #AABC76;
          background: rgba(170, 188, 118, 0.06);
        `;
      case 'ChineseGreen':
        return `
          color: #C7D062;
          background: rgba(199, 208, 98, 0.06);
        `;
      case 'Jonquil':
        return `
          color: #F7CD17;
          background: rgba(247, 205, 23, 0.06);
        `; 
      case 'PastelOrange':
        return `
          color: #FFBB52;
          background: rgba(255, 187, 82, 0.06);
        `;
      case 'Tangerine':
        return `
          color: #F48D0B;
          background: rgba(244, 141, 11, 0.06);
        `;
      case 'Copper':
        return `
          color: #BC742F;
          background: rgba(188, 116, 47, 0.06);
        `;
      case 'Shadow':
        return `
          color: #8C725B;
          background: rgba(140, 114, 91, 0.06);
        `;
      case 'Tuscany':
        return `
          color: #B1A098;
          background: rgba(177, 160, 152, 0.06);
        `;
      case 'VeryLightTangelo':
        return `
          color: #FAAD80;
          background: rgba(250, 173, 128, 0.06);
        `;
      case 'Orange':
        return `
          color: #FC6602;
          background: rgba(252, 102, 2, 0.06);
        `;
      case 'CarnationPink':
        return `
          color: #FFA8B9;
          background: rgba(255, 168, 185, 0.06);
        `;
      default:
        return '';
    }
  }}
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Pretendard', 'Poppins';
  font-size: 0.75rem;
  color: ${palette.chatBlue};
  padding: 4px 8px;
  border-radius: 100px;
  border: none;
  background: ${palette.chatGray};
  cursor: pointer;

  &:before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: ${props => props.showContent 
      ? 'translate(-50%, -50%) rotate(225deg)' 
      : 'translate(-50%, -50%) rotate(45deg)'};
    width: 10px;
    height: 10px;
    border-bottom: 2px solid ${palette.gray300};
    border-right: 2px solid ${palette.gray300};
    transition: all .5s;
    content: '';
  }
`;

const CardContent = styled.div`
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  p + p {
    margin-top: 20px;
  }
`;