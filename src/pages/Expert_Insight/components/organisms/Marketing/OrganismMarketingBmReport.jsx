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
} from "../../../../AtomStates";

import { useSaveConversation } from "../../atoms/AtomSaveConversation";

const OrganismMarketingBmReport = () => {
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
  const [isLoadingMarketingBmReport, setIsLoadingMarketingBmReport] = useState(false);

  const [marketingBmButtonState, setMarketingBmButtonState] = useAtom(MARKETING_BM_BUTTON_STATE);
  const [marketingBmReportData, setMarketingBmReportData] = useAtom(MARKETING_BM_REPORT_DATA);

  const axiosConfig = {
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    const fetchMarketingBmReport = async () => {
      try {
       if(marketingBmButtonState === 1) {
          setIsLoadingMarketingBmReport(true);
          setIsLoading(true);
          setMarketingBmButtonState(0);

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
          //   "https://wishresearch.kr/marketing_bm_report",
          //   data,
          //   axiosConfig
          // );

          // let marketingBmReport = response.data.marketing_bm_report;
            
          // let retryCount = 0;
          // const maxRetries = 10;

          // while (retryCount < maxRetries && (
          //   !response || 
          //   !response.data || 
          //   typeof response.data !== "object" ||
          //   !response.data.hasOwnProperty("marketing_bm_report") || 
          //   !Array.isArray(marketingBmReport) ||
          //   marketingBmReport.length !== 10 ||
          //   marketingBmReport.slice(0, 9).some(item => 
          //     !item.hasOwnProperty("title") || 
          //     !item.hasOwnProperty("content") ||
          //     item.content.some(contentItem => 
          //       !contentItem.hasOwnProperty("key_message") || 
          //       !contentItem.hasOwnProperty("keyword") ||
          //       !Array.isArray(contentItem.keyword) ||
          //       contentItem.keyword.length === 0 ||
          //       !contentItem.hasOwnProperty("summary")
          //     )
          //   ) ||
          //   !marketingBmReport[9].hasOwnProperty("title") ||
          //   !marketingBmReport[9].hasOwnProperty("content") ||
          //   !marketingBmReport[9].content.hasOwnProperty("conclusion") ||
          //   !marketingBmReport[9].content.hasOwnProperty("summary")
          // )) 
          // {
          //   response = await axios.post(
          //     "https://wishresearch.kr/marketing_bm_report",
          //     data,
          //     axiosConfig
          //   );
          //   retryCount++;

          //   marketingBmReport = response.data.marketing_bm_report;
          // }
          // if (retryCount === maxRetries) {
          //   throw new Error("Maximum retry attempts reached. Empty response persists.");
          // }

          setMarketingBmReportData([
            {
                "title": "고객 세그먼트(Customer Segments)",
                "content": {
                    "key_message": "주요 고객은 만성 피부 질환으로 꾸준한 관리가 필요한 환자, 피부 질환 진단 및 치료 후 지속적인 관리가 필요한 환자, 그리고 피부 질환 정보 및 관리 지원을 필요로 하는 일반인입니다. 이들은 피부 질환에 대한 정보 접근성을 높이고 개인 맞춤형 관리를 통해 피부 건강을 개선하고자 하며, 의료 전문가와 원활한 소통을 통해 질병 관리에 대한 만족도를 높이고자 합니다.",
                    "keyword": [
                        "만성 피부 질환 환자",
                        "피부 질환 진단 및 치료 후 관리 환자",
                        "피부 질환 정보 필요 일반인",
                        "개인 맞춤형 관리",
                        "의료 전문가 소통"
                    ],
                    "summary": "주요 고객은 만성 피부 질환 환자, 치료 후 관리가 필요한 환자, 피부 건강 정보를 얻고자 하는 일반인입니다."
                }
            },
            {
                "title": "가치 제안(Value Propositions)",
                "content": {
                    "key_message": "이 서비스는 개인 맞춤형 피부 기록 관리 기능을 통해 환자들이 자신의 피부 상태 변화를 효과적으로 기록하고 관리할 수 있도록 지원합니다. 또한, 의료 전문가와의 원활한 커뮤니케이션 기능을 통해 환자는 질문하고 답변을 얻으며 필요한 경우 추가적인 검사나 진료를 권고받을 수 있습니다. 더불어, 개인 맞춤형 치료 정보 제공 기능은 환자의 피부 질환 종류, 증상, 병력, 생활 습관 등을 고려하여 개인에게 필요한 치료 정보, 건강 관리 팁, 관련 연구 정보를 제공하여 환자의 자가 관리 능력을 향상시키고, 치료 효과를 높이는 데 기여합니다.",
                    "keyword": [
                        "개인 맞춤형 피부 기록 관리",
                        "의료 전문가 커뮤니케이션",
                        "개인 맞춤형 치료 정보",
                        "자가 관리 능력 향상",
                        "치료 효과 증진"
                    ],
                    "summary": "피부 질환 환자들에게 개인 맞춤형 기록 관리, 의료 전문가 소통, 치료 정보 제공을 통해 피부 건강 관리를 지원합니다."
                }
            },
            {
                "title": "채널(Channels)",
                "content": {
                    "key_message": "고객들에게 서비스를 제공하기 위해 모바일 앱, 웹사이트, 그리고 병원 및 의료기관과의 협력을 통한 연동 서비스를 제공합니다. 모바일 앱은 사용자 친화적인 인터페이스를 통해 편리한 접근성을 제공하며, 웹사이트는 더욱 상세한 정보와 추가적인 기능을 제공합니다. 병원 및 의료기관과의 협력을 통해 환자의 의료 기록을 연동하여 더욱 효과적인 진료를 지원하고, 환자들에게 서비스 접근성을 높입니다.",
                    "keyword": [
                        "모바일 앱",
                        "웹사이트",
                        "병원 연동",
                        "의료 기록 연동",
                        "서비스 접근성"
                    ],
                    "summary": "모바일 앱, 웹사이트, 병원 연동을 통해 고객들에게 서비스를 제공합니다."
                }
            },
            {
                "title": "고객 관계(Customer Relationships)",
                "content": {
                    "key_message": "고객과의 지속적인 관계를 유지하고 강화하기 위해 앱 내 챗봇 및 문의 기능을 제공하여 실시간으로 고객의 질문에 답변하고 문제를 해결합니다. 또한, 정기적인 건강 정보 업데이트, 개인 맞춤형 건강 관리 팁 제공, 사용자 커뮤니티 운영을 통해 고객 참여를 유도하고, 지속적인 소통을 통해 고객 만족도를 높입니다.",
                    "keyword": [
                        "챗봇 및 문의 기능",
                        "건강 정보 업데이트",
                        "개인 맞춤형 팁",
                        "사용자 커뮤니티",
                        "고객 만족도 향상"
                    ],
                    "summary": "챗봇, 정보 업데이트, 맞춤형 팁 제공, 커뮤니티 운영으로 고객 참여와 만족도를 높입니다."
                }
            },
            {
                "title": "수익 모델(Revenue Streams)",
                "content": {
                    "key_message": "주요 수익 모델은 프리미엄 구독 서비스, 의료 기관과의 협력을 통한 수수료, 그리고 광고 수익입니다. 프리미엄 구독 서비스는 개인 맞춤형 기능 강화, 추가적인 정보 제공, 전문가 상담 등을 통해 고객들에게 더욱 차별화된 서비스를 제공하고, 이를 통해 수익을 창출합니다. 또한, 의료 기관과의 협력을 통해 환자 데이터 분석 및 관리 서비스를 제공하고, 수수료를 받는 방식으로 수익을 확보할 수 있습니다. 더불어, 앱 및 웹사이트 내 광고를 통해 추가적인 수익을 창출할 수 있습니다.",
                    "keyword": [
                        "프리미엄 구독",
                        "의료 기관 협력 수수료",
                        "광고 수익"
                    ],
                    "summary": "프리미엄 구독, 의료 기관 협력, 광고를 통해 수익을 창출합니다."
                }
            },
            {
                "title": "핵심 자원(Key Resources)",
                "content": {
                    "key_message": "핵심 자원은 모바일 앱 및 웹사이트 플랫폼, 피부 질환 관련 데이터베이스, 전문 의료진 네트워크, 그리고 고객 데이터입니다. 안정적인 플랫폼 운영 및 서비스 제공을 위해서는 기술 인프라와 개발 능력이 중요하며, 고객에게 정확하고 신뢰성 있는 정보를 제공하기 위해서는 방대한 피부 질환 데이터베이스가 필수적입니다. 또한, 전문 의료진 네트워크를 구축하여 환자들에게 정확하고 신뢰성 있는 의료 정보와 상담을 제공하는 것이 중요하며, 고객 데이터 분석을 통해 개인 맞춤형 서비스를 제공하고 서비스를 개선하는 데 활용합니다.",
                    "keyword": [
                        "모바일 앱 및 웹사이트",
                        "피부 질환 데이터베이스",
                        "전문 의료진 네트워크",
                        "고객 데이터"
                    ],
                    "summary": "플랫폼, 피부 질환 데이터, 의료진 네트워크, 고객 데이터가 핵심 자원입니다."
                }
            },
            {
                "title": "핵심 활동(Key Activities)",
                "content": {
                    "key_message": "핵심 활동은 모바일 앱 및 웹사이트 개발 및 유지 보수, 피부 질환 관련 데이터 수집 및 분석, 의료 전문가 네트워크 구축 및 관리, 고객 마케팅 및 홍보, 그리고 고객 지원 서비스 제공입니다. 사용자 경험을 개선하기 위해 지속적인 플랫폼 업데이트와 기능 개선이 필요하며, 정확하고 최신 정보를 제공하기 위해 데이터베이스 관리 및 분석은 필수적입니다. 또한, 전문 의료진과의 협력 관계를 유지하고 새로운 의료진을 확보하여 서비스 품질을 유지하고 향상하는 것이 중요하며, 고객 유치 및 충성도를 높이기 위해 효과적인 마케팅 전략을 수립하고, 고객 지원 서비스를 통해 고객 만족도를 높여야 합니다.",
                    "keyword": [
                        "플랫폼 개발 및 유지 보수",
                        "데이터 수집 및 분석",
                        "의료 전문가 네트워크 관리",
                        "고객 마케팅 및 홍보",
                        "고객 지원 서비스"
                    ],
                    "summary": "플랫폼 개발, 데이터 관리, 의료진 확보, 마케팅, 고객 지원 활동이 핵심입니다."
                }
            },
            {
                "title": "핵심 파트너십(Key Partnerships)",
                "content": {
                    "key_message": "핵심 파트너십은 의료 기관, 제약 회사, 그리고 IT 기술 파트너입니다. 의료 기관과의 협력을 통해 환자 데이터 접근 및 연동 서비스를 제공하고, 제약 회사와의 협력을 통해 피부 질환 관련 최신 정보와 연구 결과를 확보하여 서비스의 신뢰성을 높일 수 있습니다. 또한, IT 기술 파트너와의 협력을 통해 플랫폼 안정성 및 보안을 강화하고, 새로운 기능 개발 및 서비스 개선을 위한 기술 지원을 확보할 수 있습니다.",
                    "keyword": [
                        "의료 기관",
                        "제약 회사",
                        "IT 기술 파트너"
                    ],
                    "summary": "의료 기관, 제약 회사, IT 기술 파트너와의 협력이 중요합니다."
                }
            },
            {
                "title": "비용 구조(Cost Structure)",
                "content": {
                    "key_message": "주요 비용 요소는 플랫폼 개발 및 유지 보수 비용, 데이터 수집 및 분석 비용, 의료 전문가 네트워크 유지 비용, 마케팅 및 홍보 비용, 그리고 고객 지원 비용입니다. 플랫폼 개발 및 유지 보수에는 개발 인력, 서버 운영 및 관리, 보안 강화 등이 포함되며, 데이터 수집 및 분석에는 데이터베이스 구축, 데이터 분석 도구 활용 등이 포함됩니다. 의료 전문가 네트워크 유지는 의료진 섭외, 교육 및 훈련, 상담료 등이 포함되며, 마케팅 및 홍보에는 광고, 홍보 자료 제작, 마케팅 채널 운영 등이 포함됩니다. 또한, 고객 지원에는 챗봇 개발 및 운영, 고객 상담 인력 운영 등이 포함됩니다.",
                    "keyword": [
                        "플랫폼 개발 및 유지 보수",
                        "데이터 수집 및 분석",
                        "의료 전문가 네트워크 유지",
                        "마케팅 및 홍보",
                        "고객 지원"
                    ],
                    "summary": "플랫폼 개발, 데이터 관리, 의료진 유지, 마케팅, 고객 지원 비용이 주요 비용입니다."
                }
            },
            {
                "title": " 최종 결론 및 제언",
                "content": {
                    "conclusion": "피부 질환 관리 지원 서비스는 디지털 헬스케어 기술을 활용하여 개인 맞춤형 피부 관리 및 의료 전문가와의 원활한 소통을 지원함으로써 환자들의 피부 건강 관리를 효과적으로 돕고, 시장 경쟁력을 확보할 수 있는 잠재력이 높은 서비스입니다. 서비스 성공을 위해서는 지속적인 플랫폼 개선 및 기능 업데이트, 고품질 데이터 확보 및 분석, 전문 의료진과의 협력 강화, 그리고 효과적인 마케팅 전략 수립을 통해 고객 만족도를 높이고 시장 경쟁력을 확보해야 합니다.",
                    "summary": "개인 맞춤형 기능, 의료 전문가 연계, 데이터 기반 서비스 제공을 통해 피부 질환 관리 시장에서 경쟁력을 확보해야 합니다."
                }
            }
        ]);

          setIsLoadingMarketingBmReport(false);
          setIsLoading(false);

          const updatedConversation = [...conversation];

          updatedConversation.push(
            {
              type: "system",
              message:
                "분석 완료 ! 시장 환경 속에서 확실한 입지를 다질 수 있는 포인트가 무엇인지 확인해보세요 🎯",
              expertIndex: -1,
            },
            {
              type: "system",
              message:
                "여기까지가 기본 분석이었어요! 이제 아이템의 성공 가능성을 최대한 끌어올릴 차례입니다.\n더 정확한 타겟 분석과 최적화된 사업 전략을 만들어 봐야겠죠?!  ",
              expertIndex: -1,
            },
            { type: `marketingCustomer` }
          );

          setConversation(updatedConversation);

          // await saveConversation({ changingConversation: { conversation: updatedConversation, marketingBmReportData: marketingBmReport } });
        }
      } catch (error) {
        console.error("Error fetching marketing bm report:", error);
      }
    };

    fetchMarketingBmReport();
  }, [marketingBmButtonState]);

  return (
    <Wrap>
      {isLoadingMarketingBmReport ? (
        <>
        </>
      ) : (
        <>
          {marketingBmReportData[9]?.content.summary}<br/><br/>
          타겟 고객군: {marketingBmReportData[0]?.content.summary}<br/>
          가치 제안: {marketingBmReportData[1]?.content.summary}<br/>
          채널: {marketingBmReportData[2]?.content.summary}<br/>
          고객관계: {marketingBmReportData[3]?.content.summary}<br/>
          수익원: {marketingBmReportData[4]?.content.summary}<br/>
          핵심활동: {marketingBmReportData[5]?.content.summary}<br/>
          핵심자원: {marketingBmReportData[6]?.content.summary}<br/>
          파트너쉽: {marketingBmReportData[7]?.content.summary}<br/>
          비용구조: {marketingBmReportData[8]?.content.summary}<br/>
        </>
      )}
    </Wrap>
  );
};

export default OrganismMarketingBmReport;

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
