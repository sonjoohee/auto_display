import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { InputField } from "../../../../assets/styles/Input";
import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";
import axios from "axios";

import {
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER,
  INPUT_BUSINESS_INFO,
  ANALYSIS_BUTTON_STATE,
  IS_LOADING,
  CONVERSATION,
  IS_LOADING_ANALYSIS,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  MARKETING_MBTI_RESULT,
  MARKETING_INTEREST,
  MARKETING_RECOMMENDED_ITEM_BUTTON_STATE,
  MARKETING_RECOMMENDED_ITEM_DATA,
} from "../../../AtomStates";

const OrganismMarketingRecommendedItem = () => {
  const navigate = useNavigate();
  const { saveConversation } = useSaveConversation();

  const [conversation, setConversation] = useAtom(CONVERSATION);

  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);

  const [
    tempMainFeaturesOfBusinessInformation,
    setTempMainFeaturesOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    tempMainCharacteristicOfBusinessInformation,
    setTempMainCharacteristicOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    tempBusinessInformationTargetCustomer,
    setTempBusinessInformationTargetCustomer,
  ] = useAtom(TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useAtom(IS_LOADING_ANALYSIS);
  const [isLoadingRecommendedItem, setIsLoadingRecommendedItem] = useAtom(IS_LOADING);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(IS_EXPERT_INSIGHT_ACCESSIBLE);
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(MARKETING_MBTI_RESULT);
  const [marketingInterest, setMarketingInterest] = useAtom(MARKETING_INTEREST);
  const [marketingRecommendedItemButtonState, setMarketingRecommendedItemButtonState] = useAtom(MARKETING_RECOMMENDED_ITEM_BUTTON_STATE);
  const [marketingRecommendedItemData, setMarketingRecommendedItemData] = useAtom(MARKETING_RECOMMENDED_ITEM_DATA);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const data = {
    expert_index: 11,
    startup_mbti: marketingMbtiResult,
    startup_interest: marketingInterest,
  };

  useEffect(() => {
    const handleRecommendedItem = async () => {

        setIsLoading(true);
        setIsLoadingRecommendedItem(true);

        // let response = await axios.post(
        //   "https://wishresearch.kr/panels/marketing/mbti_result",
        //   data,
        //   axiosConfig
        // );
        // let recommendedItemData = response.data.marketing_mbti_result;

        // let retryCount = 0;
        // const maxRetries = 10;

        // while (retryCount < maxRetries && (
        //     !response || 
        //     !response.data || 
        //     typeof response.data !== "object" ||
        //     !response.data.hasOwnProperty("marketing_mbti_result") || 
        //     typeof recommendedItemData !== "object" ||
        //     !recommendedItemData.hasOwnProperty("overview") ||
        //     typeof recommendedItemData.overview !== "object" ||
        //     !recommendedItemData.overview.hasOwnProperty("name") ||
        //     !recommendedItemData.overview.hasOwnProperty("description") ||
        //     !recommendedItemData.hasOwnProperty("example") ||
        //     !Array.isArray(recommendedItemData.example) ||
        //     recommendedItemData.example.length !== 3 ||
        //     recommendedItemData.example.some(item => 
        //       !item.hasOwnProperty("name") || 
        //       !item.hasOwnProperty("summary") ||
        //       !item.hasOwnProperty("description") ||
        //       !item.hasOwnProperty("mbti") ||
        //       !Array.isArray(item.mbti) ||
        //       item.mbti.some(contentItem => 
        //         !contentItem.hasOwnProperty("type") || 
        //         !contentItem.hasOwnProperty("description") ||
        //         !contentItem.hasOwnProperty("compatibility")
        //       )
        //     )
        //   )) 
        //   {
        //     retryCount += 1;

        //   response = await axios.post(
        //     "https://wishresearch.kr/panels/marketing/mbti_result",
        //     data,
        //     axiosConfig
        //   );
        //   recommendedItemData = response.data.marketing_mbti_result;
        // }

        // setMarketingRecommendedItemData(recommendedItemData);

        setMarketingRecommendedItemData({
          "overview": {
            "name": "RPTA - 모험적 팀 실용주의자",
            "description": "RPTA 유형은 적극적인 기회 포착 능력과 계획적 접근을 갖춘 창업자 유형입니다. 이들은 팀과의 협력을 통해 실질적이고 효율적인 성과를 중요시하며, 비즈니스 실행에 있어 실용성을 최우선으로 고려합니다. 새로운 가능성을 탐색하면서도 체계적인 전략 수립과 팀워크를 중시하여 목표를 달성하려는 성향이 강합니다."
          },
          "example": [
            {
              "name": "테이블매니저",
              "summary": "예약 관리와 고객 맞춤형 추천을 제공하여 외식업체 운영 효율성을 높이는 플랫폼",
              "description": "이 플랫폼은 외식업체가 예약을 효율적으로 관리하고, 고객의 취향과 요구에 맞춘 추천을 제공할 수 있도록 돕습니다. 소비자는 예약 과정에서 맞춤형 서비스 경험을 제공받을 수 있고, 외식업체는 고객의 선호도를 분석하여 서비스 품질을 개선할 수 있습니다. 이 플랫폼은 외식업체의 운영 효율성을 높이고, 고객 만족도를 강화하여 외식업계의 경쟁력을 높이는 데 기여합니다.",
              "mbti": [
                {
                  "type": "R (고위험 추구)",
                  "description": "고위험을 감수하는 성향으로, 새로운 기회를 빠르게 포착하고 시장에 도전하는 경향이 강합니다.",
                  "compatibility": "이 플랫폼은 고객 맞춤형 예약 시스템을 도입해 외식업체의 기존 운영 방식에 변화를 주고 있습니다. 외식업에서 디지털화된 시스템을 과감히 도입함으로써 고위험 감수 성향을 반영합니다."
                },
                {
                  "type": "P (계획 기반형)",
                  "description": "체계적인 계획 수립을 통해 목표 달성을 선호하며, 구체적인 전략을 중시합니다.",
                  "compatibility": "이 플랫폼은 외식업체가 예약과 고객 데이터를 체계적으로 관리할 수 있도록 지원하며, 맞춤형 계획을 세울 수 있는 기능을 제공합니다. 이를 통해 계획 기반 성향과 부합하는 관리 및 운영 방식을 제공합니다."
                },
                {
                  "type": "T (협력 중시)",
                  "description": "협력적 접근 방식을 통해 팀과의 소통과 협력을 중시하며, 다양한 이해관계자와의 상호작용을 중요시합니다.",
                  "compatibility": "이 플랫폼은 외식업체와 소비자 간의 소통을 강화하고, 고객 요구를 반영해 서비스 품질을 개선합니다. 외식업체와의 협력으로 서비스 개선을 도모하는 점에서 협력 성향과 맞습니다."
                },
                {
                  "type": "A (실용성 중심)",
                  "description": "실용적 접근을 통해 문제를 해결하고, 고객에게 실질적인 가치를 제공하는 것을 중시합니다.",
                  "compatibility": "이 플랫폼은 예약 과정에서의 편의성과 효율성을 높여 실용적인 문제를 해결하고자 합니다. 고객과 외식업체 모두에게 실질적인 가치를 제공하는 점에서 실용성 중심 성향을 반영합니다."
                }
              ]
            },
            {
              "name": "Synclly",
              "summary": "고객 피드백을 데이터로 분석하여 외식업체의 서비스 개선을 돕는 AI 기반 솔루션",
              "description": "이 서비스는 외식업체가 고객 피드백을 수집하고, 이를 데이터로 분석해 서비스 품질을 개선할 수 있도록 돕습니다. 고객 경험에 대한 실질적인 데이터를 제공하여 외식업체가 서비스 개선과 맞춤형 마케팅을 진행할 수 있도록 지원하며, 고객 만족도를 높이고 충성도를 강화하는 것을 목표로 합니다.",
              "mbti": [
                {
                  "type": "R (고위험 추구)",
                  "description": "기회를 포착해 과감하게 새로운 시스템을 적용하고, 시장 변화에 빠르게 대응합니다.",
                  "compatibility": "이 솔루션은 외식업의 고객 피드백 데이터를 활용해 서비스 개선을 추구하며, 전통적 운영 방식을 혁신하고 있습니다. 고위험 감수 성향을 통해 새로운 데이터를 활용하는 접근 방식이 반영되었습니다."
                },
                {
                  "type": "P (계획 기반형)",
                  "description": "체계적 계획을 바탕으로 구체적인 목표와 분석을 통해 운영됩니다.",
                  "compatibility": "외식업체가 고객 피드백을 계획적으로 분석하여 서비스 개선에 활용하도록 함으로써, 데이터 기반의 체계적인 접근을 제공합니다. 계획 기반 성향과 일치합니다."
                },
                {
                  "type": "T (협력 중시)",
                  "description": "고객과의 소통을 통해 협력적 방식으로 피드백을 반영하고, 협력적 개선을 추구합니다.",
                  "compatibility": "고객의 피드백을 기반으로 외식업체와의 협력을 강화하며, 서비스 품질을 개선하는 점에서 협력 중시 성향과 일치합니다."
                },
                {
                  "type": "A (실용성 중심)",
                  "description": "실용적 데이터를 통해 외식업체가 실질적으로 활용할 수 있는 정보를 제공합니다.",
                  "compatibility": "이 솔루션은 외식업체가 피드백을 실질적인 데이터로 활용해 운영 효율성을 높이도록 돕습니다. 실용성 중심 성향과 부합하는 실질적인 가치 제공이 이 솔루션의 특징입니다."
                }
              ]
            },
            {
              "name": "데이터퓨레",
              "summary": "결제와 주문을 자동화하여 외식업체의 운영 효율을 극대화하는 솔루션",
              "description": "이 솔루션은 외식업체가 고객의 주문과 결제 과정을 자동화하여 운영 효율을 높일 수 있도록 돕습니다. 고객은 간편하게 결제와 주문을 할 수 있으며, 외식업체는 인건비 절감과 동시에 운영 효율을 극대화할 수 있습니다. 이를 통해 외식업체의 운영 효율성과 고객 편의성을 동시에 높이고자 합니다.",
              "mbti": [
                {
                  "type": "R (고위험 추구)",
                  "description": "기술 혁신을 통해 새로운 시스템을 과감히 도입하며, 고객과 외식업체에 새로운 경험을 제공합니다.",
                  "compatibility": "외식업의 주문과 결제 자동화라는 새로운 접근 방식을 통해 운영 효율성을 높이고 있어, 고위험 감수 성향을 반영합니다."
                },
                {
                  "type": "P (계획 기반형)",
                  "description": "체계적 계획에 따른 주문과 결제 과정의 효율적 관리를 중시합니다.",
                  "compatibility": "이 솔루션은 주문과 결제 자동화를 통해 외식업체가 운영을 체계적으로 관리할 수 있도록 설계되었습니다. 계획 기반 성향과 조화를 이룹니다."
                },
                {
                  "type": "T (협력 중시)",
                  "description": "고객과의 상호작용을 통해 결제 과정에서 협력을 촉진하고, 고객 경험을 향상합니다.",
                  "compatibility": "고객과의 상호작용을 통해 결제 과정을 간소화하고 서비스 만족도를 높이는 점에서 협력 성향이 반영됩니다."
                },
                {
                  "type": "A (실용성 중심)",
                  "description": "실용적인 접근을 통해 외식업체와 고객 모두에게 간편하고 효율적인 결제 환경을 제공합니다.",
                  "compatibility": "주문과 결제 자동화를 통해 실질적인 운영 개선과 고객 편의성을 제공하는 점에서 실용성 중심 성향과 부합합니다."
                }
              ]
            }
          ]
        });

        console.log(marketingRecommendedItemData);

        setIsLoadingRecommendedItem(false);
        setIsLoading(false);

        // await saveConversation(
        //   { changingConversation: { marketingRecommendedItemData: recommendedItemData } }
        // );
    };

    handleRecommendedItem();
  }, [marketingRecommendedItemButtonState]);


  const handleButtonExpert = async (item) => {
    const updatedConversation = [...conversation];

    updatedConversation.push(
      {
        type: "system",
        message: 
          `${marketingMbtiResult} 창업가 이시군요! 그 성향에 맞는 ${item}을 분석해드릴게요\n당신의 스타일에 딱 맞는 창업 전략을 잡는데 도움이 되었으면 좋겠어요 ✨`,
        expertIndex: 0,
      },
      {
        type: "system",
        message: `자! 이제 본격적인 준비를 시작해보겠습니다.\n먼저 시장에서 ${item}의 가능성을 한눈에 파악할 수 있는 시장조사를 바로 시작해볼게요`,
        expertIndex: -1,
      },
      { type: "marketingStartButton" }
    );

    await saveConversation(
      { changingConversation: { conversation: updatedConversation } }
    );

    setTitleOfBusinessInfo(item);
    setConversation(updatedConversation);
    setIsExpertInsightAccessible(true);
    navigate("/ExpertInsight");
  };

  return (
    <>
      <h3>💡 맞춤 추천 아이템</h3>
      <p>아이템이 나에게 맞는지 확인하고, 나만의 비즈니스로 발전시킬 힌트를 얻어보세요 </p><br/>

      <AnalysisSection>
        {isLoadingRecommendedItem ? (
          <>
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <Spacing />
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <Spacing />
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
          </>
        ) : (
          <>
            <p>{marketingRecommendedItemData?.example?.[0]?.name}</p>
            <p>{marketingRecommendedItemData?.example?.[0]?.summary}</p><br/>

            <p>{marketingRecommendedItemData?.example?.[1]?.name}</p>
            <p>{marketingRecommendedItemData?.example?.[1]?.summary}</p><br/>

            <p>{marketingRecommendedItemData?.example?.[2]?.name}</p>
            <p>{marketingRecommendedItemData?.example?.[2]?.summary}</p><br/>
          </>
        )}
      </AnalysisSection>

      <div>
        <span>{marketingMbtiResult[0]}</span> <p>안정 추구 (Safety-seeking)</p>
        <p>{marketingRecommendedItemData?.example?.[0]?.mbti?.[0]?.compatibility}</p>

        <span>{marketingMbtiResult[1]}</span> <p>기회 포착형 (Opportunity-driven)</p>
        <p>{marketingRecommendedItemData?.example?.[0]?.mbti?.[1]?.compatibility}</p>

        <span>{marketingMbtiResult[2]}</span> <p>독립성 중시 (Independence-focused)</p>
        <p>{marketingRecommendedItemData?.example?.[0]?.mbti?.[2]?.compatibility}</p>

        <span>{marketingMbtiResult[3]}</span> <p>창의성 중심 (Creativity-centered)</p>
        <p>{marketingRecommendedItemData?.example?.[0]?.mbti?.[3]?.compatibility}</p>

        <button onClick={() => handleButtonExpert(marketingRecommendedItemData?.example?.[0]?.summary)}>
          사업화 가능성 확인하기
        </button>
      </div>
    </>
  );
};

export default OrganismMarketingRecommendedItem;

const AnalysisSection = styled.div`
  position: relative;
  max-width: 1135px;
  // width: 91.5%;
  text-align: left;
  margin-top: 25px;
  margin-left:50px;
  padding: 28px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};

  h1 {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 20px;
  }

  > p {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 30px;

    span {
      color: ${palette.red};
    }
  }
`;

const fillAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: ${palette.gray100};
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
  position: relative;
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  height: 8px;
  background-color: ${palette.gray500};
  animation: ${fillAnimation} 1.5s ease-in-out forwards;
  border-radius: 5px;
`;

const ProgressWrap = styled.div`
  position: relative;
  text-align: center;
  p {
    font-family: "Pretendard";
    font-size: 0.75rem;
    margin-top: 8px;
    color: ${palette.gray500};
  }
`;

const Spacing = styled.div`
  margin-bottom: 40px;
`;