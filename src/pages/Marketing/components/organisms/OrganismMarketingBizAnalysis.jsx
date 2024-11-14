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
} from "../../../AtomStates";

const OrganismMarketingBizAnalysis = () => {
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
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(IS_EXPERT_INSIGHT_ACCESSIBLE);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };
  const data = {
    business_idea: inputBusinessInfo,
  };

    const handleBizAnalysis = async () => {
      let businessData;
      let attempts = 0;
      const maxAttempts = 5;

        setIsLoading(true);
        setIsLoadingAnalysis(true);
        // 버튼 클릭으로 API 호출
        let response = await axios.post(
          "https://wishresearch.kr/panels/business",
          data,
          axiosConfig
        );
        businessData = response.data.business_analysis;

        // 필요한 데이터가 없을 경우 재시도, 최대 5번
        while (
          (!businessData.hasOwnProperty("명칭") ||
            !businessData.hasOwnProperty("주요_목적_및_특징") ||
            !businessData.hasOwnProperty("주요기능") ||
            !businessData.hasOwnProperty("목표고객") ||
            !businessData["명칭"] ||
            !businessData["주요_목적_및_특징"].length ||
            !businessData["주요기능"].length ||
            !businessData["목표고객"].length) &&
          attempts < maxAttempts
        ) {
          attempts += 1;

          response = await axios.post(
            "https://wishresearch.kr/panels/business",
            data,
            axiosConfig
          );
          businessData = response.data.business_analysis;
        }

        setMainFeaturesOfBusinessInformation(
          businessData["주요_목적_및_특징"]?.map((item) => item)
        );

        setMainCharacteristicOfBusinessInformation(
          businessData["주요기능"]?.map((item) => item)
        );

        setBusinessInformationTargetCustomer(
          businessData["목표고객"]?.map((item) => item)
        );

        setTitleOfBusinessInfo(businessData["명칭"]);

        const analysisReportData = {
          title: businessData?.["명칭"],
          mainFeatures: businessData["주요_목적_및_특징"],
          mainCharacter: businessData["주요기능"],
          mainCustomer: businessData["목표고객"],
        };

        setIsLoadingAnalysis(false);
        setIsLoading(false);

        await saveConversation(
          { changingConversation: { analysisReportData: analysisReportData } }
        );
      
    };

  const handleButtonExpert = async () => {
    const updatedConversation = [...conversation];

    updatedConversation.push(
      {
        type: "system",
        message: 
          `${titleOfBusinessInfo} 사업을 하시려는 창업가 이시군요!\n당신의 스타일에 딱 맞는 창업 전략을 잡는데 도움이 되었으면 좋겠어요. 함께 멋진 여정을 시작해 보아요!  ✨`,
        expertIndex: 0,
      },
      {
        type: "system",
        message: `자! 이제 본격적인 준비를 시작해보겠습니다.\n먼저 시장에서 ${titleOfBusinessInfo}의 가능성을 한눈에 파악할 수 있는 시장조사를 바로 시작해볼게요`,
        expertIndex: -1,
      },
      { type: "marketingStartButton" }
    );

    await saveConversation(
      { changingConversation: { conversation: updatedConversation } }
    );

    setConversation(updatedConversation);
    setIsExpertInsightAccessible(true);
    navigate("/ExpertInsight");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 엔터 동작 방지
      handleBizAnalysis();
    }
  };

  return (
    <>
      <AnalysisSection>
        {isLoadingAnalysis ? (
          <>
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
          </>
        ) : (
          <>
            {!titleOfBusinessInfo ? 
            <>
              <input type="text"                 
                value={inputBusinessInfo}
                onInput={(e) => {
                  if (e.target.value.length > 300) {
                    e.target.value = e.target.value.substring(0, 300);
                  }
                  setInputBusinessInfo(e.target.value);
                }}
                placeholder="아이디어를 이곳에 알려주세요" 
                onKeyDown={handleKeyPress}
              />
            </>
            : 
            <>
              <h1>💡아이디어의 특징</h1>
              <p>아이디어 특징을 확인하고 내 비즈니스로 발전시킬 힌트를 얻어보세요</p>
              <p>{mainFeaturesOfBusinessInformation[0]}</p>
              <button onClick={handleButtonExpert}>사업화 가능성 확인하기 📊</button>
            </>
            }
          </>
        )}
      </AnalysisSection>
    </>
  );
};

export default OrganismMarketingBizAnalysis;

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