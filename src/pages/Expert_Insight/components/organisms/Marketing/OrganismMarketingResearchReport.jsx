import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
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
  MARKETING_START_BUTTON_STATE,
  MARKETING_RESEARCH_REPORT_DATA,
} from "../../../../AtomStates";

import { useSaveConversation } from "../../atoms/AtomSaveConversation";

const OrganismMarketingResearchReport = ({ caseReportCount }) => {
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
  const [isLoadingMarketingResearchReport, setIsLoadingMarketingResearchReport] = useState(false);

  const [marketingStartButtonState, setMarketingStartButtonState] = useAtom(MARKETING_START_BUTTON_STATE);
  const [marketingResearchReportData, setMarketingResearchReportData] = useAtom(MARKETING_RESEARCH_REPORT_DATA);

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    }
  };

  useEffect(() => {
    const fetchMarketingResearchReport = async () => {
      try {
       if(marketingStartButtonState === 1) {
          setIsLoadingMarketingResearchReport(true);
          setIsLoading(true);
          setMarketingStartButtonState(0);

          const data = {
            expert_id: "11",
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: titleOfBusinessInfo,
              주요_목적_및_특징: mainFeaturesOfBusinessInformation,
              주요기능: mainCharacteristicOfBusinessInformation,
              목표고객: businessInformationTargetCustomer,
            },
          };

          // let response = await axios.post(
          //   "https://wishresearch.kr/marketing_research_report",
          //   data,
          //   axiosConfig
          // );

          // let marketingResearchReport = response.data.marketing_research_report;
            
          // let retryCount = 0;
          // const maxRetries = 10;

          // while (retryCount < maxRetries && (
          //   !response || 
          //   !response.data || 
          //   typeof response.data !== "object" ||
          //   !response.data.hasOwnProperty("marketing_research_report") || 
          //   !Array.isArray(marketingResearchReport)
          //   // !marketingResearchReport[0].hasOwnProperty("title") ||
          //   // !marketingResearchReport[0].hasOwnProperty("text") ||
          //   // !marketingResearchReport[1].hasOwnProperty("title") ||
          //   // !marketingResearchReport[1].hasOwnProperty("content") ||
          //   // !Array.isArray(marketingResearchReport[1].content) ||
          //   // marketingResearchReport[1].content.some(item => 
          //   //   !item.hasOwnProperty("title") || 
          //   //   !item.hasOwnProperty("text") || 
          //   //   !item.hasOwnProperty("subcontent") || 
          //   //   !Array.isArray(item.subcontent) || 
          //   //   item.subcontent.some(contentItem => 
          //   //     !contentItem.hasOwnProperty("subTitle") || 
          //   //     !contentItem.hasOwnProperty("text")
          //   //   )
          //   // ) ||
          //   // !marketingResearchReport[2].hasOwnProperty("title") ||
          //   // !marketingResearchReport[2].hasOwnProperty("text")
          // )) 
          // {
          //   response = await axios.post(
          //     "http://58.72.4.190:8503/ix_marketing_research_report",
          //     data,
          //     axiosConfig
          //   );
          //   retryCount++;

          //   marketingResearchReport = response.data.marketing_research_report;
          // }
          // if (retryCount === maxRetries) {
          //   throw new Error("Maximum retry attempts reached. Empty response persists.");
          // }

          setMarketingResearchReportData([
            {
                "title": "1단계 트렌드분석: 시장에 이슈가 있는 걸까?",
                "content": {
                    "key_content": "피부 질환 관리 시장은 전 세계적으로 성장하고 있으며, 특히 디지털 헬스케어 분야의 발전과 함께 모바일 앱을 통한 피부 질환 관리 서비스에 대한 수요가 증가하고 있습니다. 2023년 Statista 보고서에 따르면, 글로벌 디지털 헬스케어 시장은 약 3,800억 달러 규모이며, 2028년까지 약 2,000억 달러 성장할 것으로 예상됩니다. 특히 피부 질환 관리 앱은 사용자 편의성과 개인 맞춤형 서비스 제공 가능성으로 인해 높은 성장세를 보이고 있습니다.",
                    "specific_data": "2023년 기준, 미국에서만 피부 질환 관리 앱 다운로드 수는 1억 건을 돌파했습니다.",
                    "keywords": [
                        "피부 질환 관리",
                        "디지털 헬스케어",
                        "모바일 앱",
                        "개인 맞춤형 서비스"
                    ],
                    "message": "피부 질환 관리 시장은 디지털 헬스케어 트렌드와 맞물려 성장 가능성이 높으며, 특히 모바일 앱을 통한 개인 맞춤형 서비스 제공이 중요합니다.",
                    "sources": "Statista의 2023년 디지털 헬스케어 시장 보고서, SimilarWeb의 피부 질환 관리 앱 다운로드 수 분석, Google Trends의 피부 질환 관리 앱 검색 트렌드.",
                    "summary": "글로벌 디지털 헬스케어 시장은 2028년까지 2,000억 달러 성장 예상되며, 피부 질환 관리 앱 다운로드 수는 2023년 미국에서만 1억 건을 돌파했습니다."
                }
            },
            {
                "title": "2단계 산업 분석: 업계에 변화가 생긴 걸까?",
                "content": {
                    "key_content": "피부 질환 관리 서비스 시장은 기존 의료 기관과 함께 다양한 헬스케어 스타트업이 진출하며 경쟁이 심화되고 있습니다. 특히, '토스'와 '카카오페이' 등 국내 핀테크 기업들은 헬스케어 사업으로 진출하며 의료 정보 제공 및 건강 관리 서비스를 제공하고 있습니다. 또한, '셀트리온'과 '삼성바이오로직스' 등 바이오 기업들은 피부 질환 치료제 개발 및 생산에 집중하며 시장 경쟁력을 강화하고 있습니다.",
                    "specific_data": "'토스'는 2023년 헬스케어 사업 진출을 발표하며 건강 관리 서비스를 제공하고 있으며, '셀트리온'은 2023년 기준 피부 질환 치료제 시장 점유율 10%를 달성했습니다.",
                    "company_cases": "LG전자는 2023년 스마트폰에 피부 질환 진단 기능을 탑재하여 개인 맞춤형 관리 서비스를 제공하고 있으며, '화웨이'는 AI 기반의 피부 질환 분석 서비스를 개발하여 의료 서비스의 디지털 전환을 주도하고 있습니다.",
                    "keywords": [
                        "핀테크",
                        "바이오",
                        "스마트폰",
                        "AI",
                        "디지털 전환"
                    ],
                    "message": "피부 질환 관리 서비스 시장은 핀테크, 바이오 기업의 진출과 스마트 기술 도입으로 경쟁이 심화되고 있으며, 디지털 전환이 가속화되고 있습니다.",
                    "summary": "핀테크, 바이오 기업의 진출과 스마트 기술 도입으로 피부 질환 관리 서비스 시장은 디지털 전환이 가속화되고 있으며 경쟁이 심화되고 있습니다."
                }
            },
            {
                "title": "3단계 타겟 분석: 고객의 소비가 변한 걸까?",
                "content": {
                    "key_content": "피부 질환 관리 서비스의 주요 고객은 만성 피부 질환 환자, 피부 질환 진단 및 치료 후 관리가 필요한 환자, 그리고 피부 질환에 대한 정보 및 관리 지원을 필요로 하는 일반인입니다. 특히, 20~30대 젊은 층은 피부 건강에 대한 관심이 높아지면서, 모바일 앱을 통한 편리하고 개인 맞춤형 관리 서비스를 선호하는 경향이 있습니다.",
                    "specific_data": "2023년 조사 결과, 20~30대 중 70%가 피부 질환 관리 앱을 사용해 본 경험이 있으며, 80%가 피부 질환 관련 정보를 모바일로 검색합니다.",
                    "keywords": [
                        "만성 피부 질환",
                        "피부 관리",
                        "젊은 층",
                        "모바일 앱"
                    ],
                    "message": "피부 질환 관리 서비스는 젊은 층을 중심으로 모바일 앱을 통한 편리하고 개인 맞춤형 서비스에 대한 수요가 높습니다.",
                    "summary": "20~30대 젊은 층은 피부 건강에 대한 관심이 높아지면서, 모바일 앱을 통한 피부 질환 관리 서비스에 대한 선호도가 높습니다."
                }
            },
            {
                "title": "4단계 경쟁사 분석: 경쟁사 상황도 비슷할까?",
                "content": {
                    "key_content": "피부 질환 관리 서비스 시장에는 '마이크로소프트'의 '헬스케어 봇'과 '아마존'의 '알렉사' 등 AI 기반의 챗봇 서비스를 제공하는 경쟁사들이 존재합니다. 이들은 사용자와의 대화를 통해 피부 질환 정보를 제공하고 건강 관리 팁을 제공하며, 사용자 경험을 향상시키는 데 집중하고 있습니다. 또한, '유한양행'과 'GC녹십자' 등 국내 제약 회사들은 피부 질환 치료제 개발 및 정보 제공 서비스를 제공하며 시장 경쟁력을 강화하고 있습니다.",
                    "specific_data": "'헬스케어 봇'은 2023년 기준, 약 500만 명의 사용자를 확보하고 있으며, '유한양행'은 피부 질환 관련 정보 제공 앱의 월 사용자 수가 100만 명을 돌파했습니다.",
                    "company_cases": "'구글'은 2023년 AI 기반의 피부 질환 진단 서비스를 출시하며 시장 진출을 선언했습니다. 이는 기존 의료 서비스 대비 빠르고 정확한 진단을 제공하여 시장 경쟁력을 강화할 것으로 예상됩니다.",
                    "keywords": [
                        "AI 챗봇",
                        "피부 질환 진단",
                        "정보 제공",
                        "제약 회사"
                    ],
                    "message": "피부 질환 관리 서비스 시장은 AI 챗봇, 피부 질환 진단 서비스 등 다양한 기술 기반의 서비스가 경쟁하고 있으며, 사용자 경험 및 정보 제공의 차별화가 중요합니다.",
                    "summary": "AI 기반의 챗봇 서비스와 제약 회사들의 정보 제공 서비스 등 다양한 경쟁사들이 존재하며, 사용자 경험과 정보 제공의 차별화가 중요합니다."
                }
            },
            {
                "title": "5단계 가설과 검증: 다른 요인이 더 있을까?",
                "content": {
                    "key_content": "피부 질환 관리 서비스는 개인의 피부 상태와 건강 상태에 대한 정보를 수집하고 분석하는 것이 중요하며, 개인정보 보호 및 데이터 보안에 대한 사용자들의 우려가 높습니다. 2023년 한국인터넷진흥원의 조사 결과, 개인정보 보호에 대한 국민들의 인식은 높아지고 있으며, 개인정보 유출 사고에 대한 우려는 지속적으로 증가하고 있습니다.",
                    "specific_data": "2023년 한국인터넷진흥원의 조사 결과, 국민의 90% 이상이 개인정보 보호에 대한 우려를 가지고 있으며, 70% 이상이 개인정보 유출 사고 경험이 있다고 응답했습니다.",
                    "keywords": [
                        "개인정보 보호",
                        "데이터 보안",
                        "사용자 우려"
                    ],
                    "message": "피부 질환 관리 서비스는 개인정보 보호 및 데이터 보안에 대한 철저한 관리가 필수적이며, 사용자들의 신뢰를 얻기 위한 노력이 필요합니다.",
                    "summary": "개인정보 보호와 데이터 보안에 대한 사용자 우려가 높아지고 있으며, 이를 해결하기 위한 철저한 관리와 투명한 정보 공개가 중요합니다."
                }
            },
            {
                "title": "해당 시장이나 산업군에서 해도 되는가에 대한 답변",
                "content": {
                    "conclusion": "피부 질환 관리 지원 서비스는 디지털 헬스케어 시장의 성장과 함께 젊은 층을 중심으로 높은 수요가 예상됩니다. 특히, AI 기반의 챗봇 서비스, 개인 맞춤형 관리 기능, 그리고 사용자 경험을 향상시키는 UX/UI 디자인은 경쟁 우위를 확보할 수 있는 핵심 요소입니다. 다만, 개인정보 보호 및 데이터 보안에 대한 사용자들의 우려를 해소하기 위한 철저한 관리 체계 구축과 투명한 정보 공개가 필수적입니다. 이러한 전략을 통해 피부 질환 관리 지원 서비스는 시장 경쟁력을 강화하고 지속적인 성장을 이룰 수 있을 것입니다.",
                    "summary": "디지털 헬스케어 시장 성장과 젊은 층의 수요 증가를 고려하여 AI 기반의 챗봇, 개인 맞춤형 관리 기능, 사용자 경험 향상에 집중하고, 철저한 개인정보 보호 및 데이터 보안 체계를 구축해야 합니다."
                }
            }
        ]);

          setIsLoadingMarketingResearchReport(false);
          setIsLoading(false);

          const updatedConversation = [...conversation];

          updatedConversation.push(
            {
              type: "system",
              message:
                "시장조사 완료! 🎉 아이템의 시장 현황은 어떤 것 같으신가요?",
              expertIndex: -1,
            },
            {
              type: "system",
              message:
                "지금 확인하신 시장조사 결과를 기반으로, 이제 비즈니스 모델(BM) 분석을 진행해볼 예정이에요.\n이 분석을 통해 비즈니스 모델과 전략을 조금 더 구체적으로 세워볼 수 있을거에요 📊",
              expertIndex: -1,
            },
            { type: `marketingBmButton` }
          );

          setConversation(updatedConversation);

          // await saveConversation({ changingConversation: { conversation: updatedConversation, marketingResearchReportData: marketingResearchReport } });
        }
      } catch (error) {
        console.error("Error fetching marketing research report:", error);
      }
    };

    fetchMarketingResearchReport();
  }, [marketingStartButtonState]);

  return (
    <Wrap>
      {isLoadingMarketingResearchReport ? (
        <>
        </>
      ) : (
        <>
          {marketingResearchReportData[0]?.title}
          {/* <h1>{caseReportData[caseReportCount]?.[0]?.report_title}</h1>
          <p>{caseReportData[caseReportCount]?.[0]?.text}</p>
          {caseReportData[caseReportCount]?.[1]?.content.map((report, index) => (
            <SeparateSection key={index}>
              <h3>
                <span className="number">{index + 1}</span>
                {report.title}
              </h3>
              <p>{report.text}</p>
              <div>
              <ol className="list-decimal">
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
        <p className="conclusion">{caseReportData[caseReportCount]?.[2]?.text}</p> */}
        </>
      )}

    </Wrap>
  );
};

export default OrganismMarketingResearchReport;

const Wrap = styled.div`
  max-width:986px;
  // width:100%;
  display:flex;
  flex-direction:column;
  padding: 28px;
  margin:15px 0 0 50px;
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

  .conclusion {
    margin-top: 20px;
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

  .list-decimal li {
    list-style-type:decimal;
    list-style-position:inside;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    text-align:left;
  }
`;
