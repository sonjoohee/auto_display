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
    expert_id: "11",
    startup_mbti: marketingMbtiResult,
    startup_interest: marketingInterest,
  };

  useEffect(() => {
    const handleRecommendedItem = async () => {

        setIsLoading(true);
        setIsLoadingRecommendedItem(true);

        let response = await axios.post(
          "https://wishresearch.kr/panels/marketing/mbti_result",
          data,
          axiosConfig
        );
        let recommendedItemData = response.data.marketing_mbti_result;

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response?.data?.marketing_mbti_result ||
          typeof recommendedItemData !== "object" ||
          !recommendedItemData?.overview?.name ||
          !recommendedItemData?.overview?.description ||
          !Array.isArray(recommendedItemData?.example) ||
          recommendedItemData.example.length !== 3 ||
          recommendedItemData.example.some(item => 
            !item?.name || 
            !item?.summary ||
            !item?.description ||
            !Array.isArray(item?.mbti) ||
            item.mbti.some(contentItem => 
              !contentItem?.type || 
              !contentItem?.description ||
              !contentItem?.compatibility
            )
          )
        ))
          {
            retryCount += 1;

          response = await axios.post(
            "https://wishresearch.kr/panels/marketing/mbti_result",
            data,
            axiosConfig
          );
          recommendedItemData = response.data.marketing_mbti_result;
        }

        setMarketingRecommendedItemData(recommendedItemData);

        setIsLoadingRecommendedItem(false);
        setIsLoading(false);

        await saveConversation(
          { changingConversation: { marketingRecommendedItemData: recommendedItemData } }
        );
    };

    handleRecommendedItem();
  }, [marketingRecommendedItemButtonState]);


  const handleButtonExpert = async (index) => {
    const itemName = marketingRecommendedItemData?.example?.[index]?.summary;
    const itemDetail = marketingRecommendedItemData?.example?.[index]?.description;

    const updatedConversation = [...conversation];

    updatedConversation.push(
      {
        type: "system",
        message: 
          `${marketingMbtiResult} 창업가 이시군요! 그 성향에 맞는 ${itemName}을 분석해드릴게요\n당신의 스타일에 딱 맞는 창업 전략을 잡는데 도움이 되었으면 좋겠어요 ✨`,
        expertIndex: 0,
      },
      {
        type: "system",
        message: `자! 이제 본격적인 준비를 시작해보겠습니다.\n먼저 시장에서 ${itemName}의 가능성을 한눈에 파악할 수 있는 시장조사를 바로 시작해볼게요`,
        expertIndex: -1,
      },
      { type: "marketingStartButton" }
    );

    await saveConversation(
      { changingConversation: { conversation: updatedConversation } }
    );

    setTitleOfBusinessInfo(itemName);
    setMainFeaturesOfBusinessInformation(itemDetail);
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

        <button onClick={() => handleButtonExpert(0)}>
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