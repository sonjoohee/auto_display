import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  KPI_QUESTION_LIST,
  GROWTH_HACKER_BUTTON_STATE,
  GROWTH_HACKER_REPORT_DATA,
  CONVERSATION_STAGE,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";

const OrganismGrowthHackerReport = () => {
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const { saveConversation } = useSaveConversation();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
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

  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [isLoadingGrowthHacker, setIsLoadingGrowthHacker] = useState(false);
  const [growthHackerButtonState, setGrowthHackerButtonState] = useAtom(GROWTH_HACKER_BUTTON_STATE);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchIdeaList = async () => {

      if(growthHackerButtonState) {
        setIsLoading(true);
        setIsLoadingGrowthHacker(true);
        setGrowthHackerButtonState(0);

        const data = {
          expert_id: "6",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
            목표고객: businessInformationTargetCustomer,
          },
          kpi_question_list: KpiQuestionList,
        };

        let response = await axios.post(
          "https://wishresearch.kr/panels/growth_hacker",
          data,
          axiosConfig
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || 
          !response.data || 
          typeof response.data !== "object" ||
          !response.data.hasOwnProperty("growth_hacker_report") || 
          !Array.isArray(response.data.growth_hacker_report) ||
          !response.data.growth_hacker_report[0].hasOwnProperty("content") ||
          !Array.isArray(response.data.growth_hacker_report[0].content) ||
          !response.data.growth_hacker_report[0].content[0].hasOwnProperty("text") ||
          !response.data.growth_hacker_report[0].content[1].hasOwnProperty("text") ||
          response.data.growth_hacker_report[1].content.some(item => 
            !item.hasOwnProperty("title") || 
            !item.hasOwnProperty("text") || 
            !item.hasOwnProperty("subcontent") || 
            !Array.isArray(item.subcontent) || 
            item.subcontent.some(contentItem => 
              !contentItem.hasOwnProperty("subTitle") || 
              !contentItem.hasOwnProperty("text")
            )
          )
        )) 
        {
          response = await axios.post(
            "https://wishresearch.kr/panels/growth_hacker",
            data,
            axiosConfig
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
          console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }

        setGrowthHackerReportData(response.data.growth_hacker_report);

        setIsLoading(false);
        setIsLoadingGrowthHacker(false);

        const updatedConversation = [...conversation];
        updatedConversation.push(
          {
            type: "system",
            message:
              "현황 진단 결과를 바탕으로 고객 여정의 각 단계에서 집중해야할 부분과 최적의 KPI 전략을 제안해드립니다.",
            expertIndex: selectedExpertIndex,
          },
          { type: `growthHackerKPIButton` }
        );
        setConversationStage(3);
        setConversation(updatedConversation);

        await saveConversation(
          { changingConversation: { conversation: updatedConversation, conversationStage: 3, growthHackerReportData : response.data.growth_hacker_report, } }
        );
      }
    };

    fetchIdeaList();
  }, [growthHackerButtonState]);

  return (
    <Wrap>
      {isLoadingGrowthHacker || growthHackerButtonState ? (
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
          <h1>마케팅 분석과 개선 솔루션 제안</h1>
          <p>{growthHackerReportData[0].content[0].text} {growthHackerReportData[0].content[1].text}</p>
          {growthHackerReportData[1].content.map((report, index) => (
            <SeparateSection key={index}>
              <h3>
                <span className="number">{index + 1}</span>
                {report.title}
              </h3>
              <p>{report.text}</p>
              <div>
              <ol className="list-disc">
                {report.subcontent.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    {subItem.subTitle} : {subItem.text}
                  </li>
                ))}
              </ol>
              </div>
            </SeparateSection>
          ))
        }

      <MoleculeReportController
        reportIndex={6}
        sampleData={growthHackerReportData}
        />
      </>
      )}

    </Wrap>
  );
};

export default OrganismGrowthHackerReport;

const Wrap = styled.div`
  max-width:986px;
  // width:100%;
  display:flex;
  flex-direction:column;
  padding: 28px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    text-align:left;
    margin-bottom:20px;
  }

  p {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.black};
    text-align:left;
    margin-bottom:10px;
  }
`;

const SeparateSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap:12px;
  margin-top: 12px;
  padding: 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h3 {
    display:flex;
    align-items:center;
    gap:12px;
    font-size:1rem;
    font-weight:700;

    span {
      width: 15px;
      height: 15px;
      font-size: 0.63rem;
      color: ${palette.chatBlue};
      line-height: 15px;
      text-align: center;
      border: 1px solid ${palette.chatBlue};
    }
  }

  p {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    text-align:left;
  }

  div {
    padding:16px;
    border-radius:10px;
    background:${palette.white};
  }

  .list-disc li {
    list-style-type:disc;
    list-style-position:inside;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    text-align:left;
  }
`;
