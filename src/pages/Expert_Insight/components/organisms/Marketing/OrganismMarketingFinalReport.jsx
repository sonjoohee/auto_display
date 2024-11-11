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
  MARKETING_BM_BUTTON_STATE,
  MARKETING_BM_REPORT_DATA,
  MARKETING_RESEARCH_REPORT_DATA,
  MARKETING_FINAL_REPORT_DATA,
  MARKETING_FINAL_CUSTOMER,
  MARKETING_FINAL_REPORT_BUTTON_STATE,
} from "../../../../AtomStates";

import { useSaveConversation } from "../../atoms/AtomSaveConversation";

const OrganismMarketingFinalReport = () => {
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
  const [isLoadingMarketingFinalReport, setIsLoadingMarketingFinalReport] = useState(false);
  const [marketingResearchReportData] = useAtom(MARKETING_RESEARCH_REPORT_DATA);
  const [marketingBmButtonState, setMarketingBmButtonState] = useAtom(MARKETING_BM_BUTTON_STATE);
  const [marketingBmReportData, setMarketingBmReportData] = useAtom(MARKETING_BM_REPORT_DATA);
  const [marketingFinalReportData, setMarketingFinalReportData] = useAtom(MARKETING_FINAL_REPORT_DATA);
  const [marketingFinalCustomer, setMarketingFinalCustomer] = useAtom(MARKETING_FINAL_CUSTOMER);
  const [marketingFinalReportButtonState, setMarketingFinalReportButtonState] = useAtom(MARKETING_FINAL_REPORT_BUTTON_STATE);

  const axiosConfig = {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    const fetchMarketingFinalReport = async () => {
      try {
       if(marketingFinalReportButtonState === 1) {
          setIsLoadingMarketingFinalReport(true);
          setIsLoading(true);
          setMarketingFinalReportButtonState(0);

          const data = {
            expert_id: "11",
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
              명칭: titleOfBusinessInfo,
              주요_목적_및_특징: mainFeaturesOfBusinessInformation,
              주요기능: mainCharacteristicOfBusinessInformation,
              목표고객: businessInformationTargetCustomer,
            },
            marketing_research_report: marketingResearchReportData,
            marketing_bm_report: marketingBmReportData,
            marketing_selected_customer: marketingFinalCustomer
          };

          // let response = await axios.post(
          //   "https://wishresearch.kr/marketing_final_report",
          //   data,
          //   axiosConfig
          // );

          // let marketingFinalReport = response.data.marketing_final_report;
            
          // let retryCount = 0;
          // const maxRetries = 10;

          // while (retryCount < maxRetries && (
          //   !response || 
          //   !response.data || 
          //   typeof response.data !== "object" ||
          //   !response.data.hasOwnProperty("marketing_final_report") || 
          //   !Array.isArray(marketingFinalReport) ||
          //   marketingFinalReport.length !== 3 ||
          //   marketingFinalReport[0].hasOwnProperty("title") ||
          //   marketingFinalReport[0].hasOwnProperty("content") ||
          //   marketingFinalReport[0].content.hasOwnProperty("purpose") ||
          //   marketingFinalReport[0].content.hasOwnProperty("target") ||
          //   marketingFinalReport[0].content.hasOwnProperty("value") ||
          //   marketingFinalReport[0].content.hasOwnProperty("elements") ||
          //   marketingFinalReport[0].content.hasOwnProperty("type") ||
          //   marketingFinalReport[1].hasOwnProperty("distinctiveness") ||
          //   marketingFinalReport[1].distinctiveness.hasOwnProperty("score") ||
          //   marketingFinalReport[1].distinctiveness.hasOwnProperty("description") ||
          //   marketingFinalReport[1].hasOwnProperty("potential") ||
          //   marketingFinalReport[1].potential.hasOwnProperty("score") ||
          //   marketingFinalReport[1].potential.hasOwnProperty("description") ||
          //   marketingFinalReport[1].hasOwnProperty("model") ||
          //   marketingFinalReport[1].model.hasOwnProperty("score") ||
          //   marketingFinalReport[1].model.hasOwnProperty("description") ||
          //   marketingFinalReport[1].hasOwnProperty("vision") ||
          //   marketingFinalReport[1].vision.hasOwnProperty("score") ||
          //   marketingFinalReport[1].vision.hasOwnProperty("description") ||
          //   marketingFinalReport[1].hasOwnProperty("barriers") ||
          //   marketingFinalReport[1].barriers.hasOwnProperty("score") ||
          //   marketingFinalReport[1].barriers.hasOwnProperty("description") ||
          //   marketingFinalReport[1].hasOwnProperty("scarcity") ||
          //   marketingFinalReport[1].scarcity.hasOwnProperty("score") ||
          //   marketingFinalReport[1].scarcity.hasOwnProperty("description") ||
          //   marketingFinalReport[1].hasOwnProperty("adaptability") ||
          //   marketingFinalReport[1].adaptability.hasOwnProperty("score") ||
          //   marketingFinalReport[1].adaptability.hasOwnProperty("description") ||
          //   marketingFinalReport[1].hasOwnProperty("total_score") ||
          //   marketingFinalReport[2].hasOwnProperty("session1") ||
          //   marketingFinalReport[2].hasOwnProperty("session2") ||
          //   marketingFinalReport[2].hasOwnProperty("session3") ||
          //   marketingFinalReport[2].session1.hasOwnProperty("title") ||
          //   marketingFinalReport[2].session1.hasOwnProperty("content") ||
          //   marketingFinalReport[2].session2.hasOwnProperty("title") ||
          //   marketingFinalReport[2].session2.hasOwnProperty("content") ||
          //   marketingFinalReport[2].session3.hasOwnProperty("title") ||
          //   marketingFinalReport[2].session3.hasOwnProperty("content")
          // )) 
          // {
          //   response = await axios.post(
          //     "https://wishresearch.kr/marketing_final_report",
          //     data,
          //     axiosConfig
          //   );
          //   retryCount++;

          //   marketingFinalReport = response.data.marketing_final_report;
          // }
          // if (retryCount === maxRetries) {
          //   throw new Error("Maximum retry attempts reached. Empty response persists.");
          // }

          setMarketingFinalReportData([
            {
                "title": "피부 질환 정보, 관리, 전문가 지원을 통합적으로 제공하는 모바일 헬스케어 서비스",
                "content": {
                    "purpose": "피부 질환 환자들이 자신의 질환 정보를 체계적으로 관리하고, 전문가의 도움을 받아 질환을 효과적으로 관리할 수 있도록 돕는 목적",
                    "target": "만성 피부 질환 환자, 피부 질환 관리에 어려움을 겪는 환자, 피부 건강에 관심 있는 일반인, 특히 모바일 기기를 활용하는 젊은 세대",
                    "value": "개인별 피부 질환 정보 기록 및 관리, 의료 정보 접근, 전문가 지원을 통해 효과적인 질환 관리 지원, 자가 관리 능력 향상 및 의료 접근성 증진",
                    "elements": "개인별 피부 질환 기록 관리 기능, 의료 정보 제공 기능, 의료 케어 지원 기능, 데이터 분석을 통한 개인 맞춤형 정보 제공, 사용자 친화적인 모바일 인터페이스",
                    "type": "모바일 앱 기반의 피부 질환 관리 플랫폼"
                }
            },
            {
                "distinctiveness": {
                    "score": "4",
                    "description": "피부 질환 정보와 관리 기능, 전문가 지원을 통합적으로 제공하는 점은 차별점이 될 수 있지만, 유사한 기능을 제공하는 헬스케어 앱들이 이미 시장에 존재합니다. 특히, AI 기반의 피부 질환 진단 기능이나 웨어러블 기기와의 연동 등 차별화된 기술적 요소가 부족하여 장기적인 경쟁에서 강력한 우위를 점하기 어렵습니다. 더욱 독창적인 기능과 기술 개발이 필요합니다."
                },
                "potential": {
                    "score": "5",
                    "description": "모바일 헬스케어 시장은 급성장하고 있으며, 피부 질환 관리에 대한 수요도 꾸준히 증가하고 있습니다. 특히, 젊은 세대는 모바일 기기를 통해 피부 정보를 얻고 관리하는 것을 선호합니다. 하지만 경쟁이 심화되고 있고, 사용자 데이터 보안 및 개인정보 보호에 대한 우려가 커지고 있어 시장 진출 및 성장에 어려움이 존재합니다."
                },
                "model": {
                    "score": "3",
                    "description": "기본 서비스를 무료로 제공하고, 프리미엄 기능, 추가 정보, 전문가 상담 등 유료 서비스를 통해 수익을 창출하는 모델은 일반적입니다. 하지만 수익 모델 다변화가 제한적이며, 유료 서비스의 경쟁력이 부족하여 수익성 확보에 어려움을 겪을 수 있습니다. AI 기술을 활용한 데이터 분석 기반의 맞춤형 광고나 건강 관리 서비스와의 연계를 통해 수익 모델을 확장해야 합니다."
                },
                "vision": {
                    "score": "3",
                    "description": "장기적인 관점에서 피부 질환 관리 서비스는 데이터 기반의 개인 맞춤형 솔루션과 AI 기술을 활용하여 웰니스 및 건강 관리 서비스와 연계할 수 있는 잠재력을 가지고 있습니다. 하지만, 데이터 보안 및 개인정보 보호에 대한 우려가 커지고 있으며, 사용자 데이터를 활용한 솔루션 개발은 윤리적 문제와 규제 문제에 직면할 수 있습니다. 사용자 데이터 보안 및 윤리적 문제 해결을 위한 노력 없이는 장기적인 비전을 실현하기 어렵습니다."
                },
                "barriers": {
                    "score": "2",
                    "description": "피부 질환 관리 서비스 시장은 셀트리온, 마이크로소프트 등 다양한 분야의 기업들이 진출하며 경쟁이 심화되고 있습니다. 특히, AI 기술과 의료 데이터 플랫폼을 활용한 경쟁이 치열하여, 신규 서비스가 시장에서 강력한 경쟁력을 확보하기 어렵습니다. 차별화된 기술력 확보와 사용자 데이터 보안에 대한 신뢰 구축이 시장 진입의 중요한 과제입니다."
                },
                "scarcity": {
                    "score": "3",
                    "description": "블록체인 기술을 활용하여 데이터 보안과 개인정보 보호를 강화하는 것은 차별화 요소가 될 수 있지만, 블록체인 기술 자체는 아직 대중화되지 않았으며, 사용자에게 높은 희소성을 제공하기에는 부족합니다. 혁신적인 기술과 서비스를 통해 사용자에게 독점적인 가치를 제공해야 합니다."
                },
                "adaptability": {
                    "score": "4",
                    "description": "피부 질환 관리 서비스는 꾸준히 변화하는 의료 기술과 사용자 요구에 맞춰 지속적인 업데이트와 개선이 가능합니다. 사용자 피드백을 적극적으로 반영하고, 새로운 의료 기술을 도입하여 서비스를 발전시킬 수 있습니다. 하지만, 빠르게 변화하는 헬스케어 시장에서 경쟁력을 유지하기 위해서는 지속적인 기술 개발과 투자가 필수적입니다."
                },
                "total_score": "24"
            },
            {
                "session1": {
                    "title": "차별화된 기술력 확보와 사용자 데이터 보안 강화",
                    "content": "AI 기반의 피부 질환 진단 및 관리 기능, 웨어러블 기기 연동, 3D 피부 모델링 등 차별화된 기술을 개발하여 사용자에게 독점적인 가치를 제공해야 합니다. 또한, 사용자 데이터 보안 및 개인정보 보호에 대한 신뢰를 구축하기 위해 블록체인 기술 도입, 데이터 암호화, 사용자 동의 기반 데이터 활용 등을 통해 데이터 보안 시스템을 강화해야 합니다."
                },
                "session2": {
                    "title": "수익 모델 다변화 및 협력을 통한 시장 확장",
                    "content": "AI 기술을 활용한 데이터 분석 기반의 맞춤형 광고, 건강 관리 서비스, 화장품 및 의료기기 추천 서비스와의 연계를 통해 수익 모델을 다변화해야 합니다. 또한, 제약회사, 화장품 회사, 의료기관 등과의 협력을 통해 시장 진출을 확대하고, 서비스 경쟁력을 강화해야 합니다."
                },
                "session3": {
                    "title": "지속 가능한 성장을 위한 기술 혁신과 사회적 책임",
                    "content": "사용자 데이터를 활용하여 개인 맞춤형 건강 관리 서비스를 제공하고, AI 기술을 통해 피부 질환 예측 및 예방 솔루션을 개발해야 합니다. 또한, 사용자 데이터 보안 및 개인정보 보호에 대한 윤리적 책임을 강화하고, 데이터 활용에 대한 투명성을 확보하여 사용자 신뢰를 구축해야 합니다."
                }
            }
        ]);

          setIsLoadingMarketingFinalReport(false);
          setIsLoading(false);

          const updatedConversation = [...conversation];

          updatedConversation.push(
            {
              type: "system",
              message:
                `${titleOfBusinessInfo}의 시장조사부터 잠재력 지수까지 모두 확인하셨습니다. 👍🏻\n이번 분석이 창업 준비에 도움이 되었나요? 저희는 비즈니스 전문 AI 솔루션으로 전문가와 1:1 사업 상담이 가능합니다.\n창업 여정의 든든한 조력자로 함께 하겠습니다. 😊`,
              expertIndex: 0,
            },
            {
              type: "system",
              message:
                "회원가입을 하시면 대화 내역을 저장할 수 있어요.\n회원가입 없이 나가시면 내역이 사라지니 참고해주세요 📌 ",
              expertIndex: -1,
            },
            { type: `marketingSignUpButton` }
          );

          setConversation(updatedConversation);

          // await saveConversation({ changingConversation: { conversation: updatedConversation, marketingFinalReportData: marketingFinalReportData } });
        }
      } catch (error) {
        console.error("Error fetching marketing final report:", error);
      }
    };

    fetchMarketingFinalReport();
  }, [marketingFinalReportButtonState]);

  return (
    <Wrap>
      {isLoadingMarketingFinalReport ? (
        <>
        </>
      ) : (
        <>
          {marketingFinalReportData[0]?.title}<br/>
          {marketingFinalReportData[2]?.session1.content}<br/><br/>
          아이템 차별성: {marketingFinalReportData[1]?.distinctiveness.score}점<br/>
          시장성: {marketingFinalReportData[1]?.potential.score}점<br/>
          수익 모델: {marketingFinalReportData[1]?.model.score}점<br/>
          비전: {marketingFinalReportData[1]?.vision.score}점<br/>
          시장 진입장벽: {marketingFinalReportData[1]?.barriers.score}점<br/>
          희소성: {marketingFinalReportData[1]?.scarcity.score}점<br/>
          적응성: {marketingFinalReportData[1]?.adaptability.score}점<br/>
        </>
      )}
    </Wrap>
  );
};

export default OrganismMarketingFinalReport;

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
