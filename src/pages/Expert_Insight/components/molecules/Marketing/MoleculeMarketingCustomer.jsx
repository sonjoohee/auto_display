import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  BUTTON_STATE,
  EXPERT_BUTTON_STATE,
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_USER_GOAL_INPUT,
  SURVEY_GOAL_FIXED,
  CONVERSATION_STAGE,
  MARKETING_RESEARCH_REPORT_DATA,
  MARKETING_BM_REPORT_DATA,
  MARKETING_CUSTOMER_DATA,
  MARKETING_CUSTOMER_BUTTON_STATE,
  MARKETING_SELECTED_CUSTOMER,
} from "../../../../AtomStates";

import { useSaveConversation } from "../../atoms/AtomSaveConversation";

const MoleculeMarketingCustomer = ({ marketingCustomerCount }) => {
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const { saveConversation } = useSaveConversation();
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
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
  const [expertButtonState, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE);
  const [marketingCustomerButtonState, setMarketingCustomerButtonState] = useAtom(MARKETING_CUSTOMER_BUTTON_STATE);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [surveyGoalFixedState, setSurveyGoalFixedState] = useState({}); // 현재 선택한 상태를 저장
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingMarketingCustomer, setIsLoadingMarketingCustomer] = useState(false);
  const [surveyGoalSuggestionList, setSurveyGoalSuggestionList] = useAtom(SURVEY_GOAL_SUGGESTION_LIST);
  const [surveyUserGoalInput, setSurveyUserGoalInput] = useAtom(SURVEY_USER_GOAL_INPUT);
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [marketingResearchReportData] = useAtom(MARKETING_RESEARCH_REPORT_DATA);
  const [marketingBmReportData] = useAtom(MARKETING_BM_REPORT_DATA);
  const [marketingCustomerData, setMarketingCustomerData] = useAtom(MARKETING_CUSTOMER_DATA);
  const [marketingSelectedCustomer, setMarketingSelectedCustomer] = useAtom(MARKETING_SELECTED_CUSTOMER);
  const [marketingSelectedCustomerState1, setMarketingSelectedCustomerState1] = useState({});
  const [marketingSelectedCustomerState2, setMarketingSelectedCustomerState2] = useState({});
  const [marketingSelectedCustomerState3, setMarketingSelectedCustomerState3] = useState({});

  
  useEffect(() => {
    if(marketingSelectedCustomer.length === 1) {
      setMarketingSelectedCustomerState1(marketingSelectedCustomer[0]);
    } else if(marketingSelectedCustomer.length === 2) {
      setMarketingSelectedCustomerState1(marketingSelectedCustomer[0]);
      setMarketingSelectedCustomerState2(marketingSelectedCustomer[1]);
    } else if(marketingSelectedCustomer.length === 3) {
      setMarketingSelectedCustomerState1(marketingSelectedCustomer[0]);
      setMarketingSelectedCustomerState2(marketingSelectedCustomer[1]);
      setMarketingSelectedCustomerState3(marketingSelectedCustomer[2]);
    }
  }, [marketingSelectedCustomer]);

  const handleOptionClick = (index) => {
    if (marketingCustomerCount === 0) {
      setMarketingSelectedCustomerState1({
        content: marketingCustomerData[index],
        index: index,
      });
    } else if (marketingCustomerCount === 1) {
      setMarketingSelectedCustomerState2({
        content: marketingCustomerData[index],
        index: index,
      });
    } else if (marketingCustomerCount === 2) {
      setMarketingSelectedCustomerState3({
        content: marketingCustomerData[index],
        index: index,
      });
    }
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchMarketingCustomer = async () => {

      if(marketingCustomerButtonState) {
        setIsLoading(true);
        setIsLoadingMarketingCustomer(true);
        setMarketingCustomerButtonState(0);

        const data = {
          expert_id: "11",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
          },
          marketing_research_report: marketingResearchReportData,
          marketing_bm_report: marketingBmReportData
        };

        // let response = await axios.post(
        //   "https://wishresearch.kr/panels/marketing_customer_recommendation",
        //   data,
        //   axiosConfig
        // );
        // let marketingCustomer = response.data.marketing_customer_recommendation;

        // let retryCount = 0;
        // const maxRetries = 10;

        // while ((retryCount < maxRetries &&
        //   !response || !response.data || typeof response.data !== "object" ||
        //   !response.data.hasOwnProperty("marketing_customer_recommendation") ||
        //   !Array.isArray(response.data.marketing_customer_recommendation) ||
        //   response.data.marketing_customer_recommendation.length !== 5 ||
        //   response.data.marketing_customer_recommendation.some(item =>
        //     !item.hasOwnProperty("characteristic") ||
        //     !item.characteristic.hasOwnProperty("summary") ||
        //     !item.characteristic.hasOwnProperty("description") ||
        //     !item.hasOwnProperty("market") ||
        //     !item.market.hasOwnProperty("summary") ||
        //     !item.market.hasOwnProperty("description") ||
        //     !item.hasOwnProperty("function") ||
        //     !item.function.hasOwnProperty("summary") ||
        //     !item.function.hasOwnProperty("description") ||
        //     !item.hasOwnProperty("target") ||
        //     !item.target.hasOwnProperty("summary") ||
        //     !item.target.hasOwnProperty("description") ||
        //     !item.hasOwnProperty("competence") ||
        //     !item.competence.hasOwnProperty("summary") ||
        //     !item.competence.hasOwnProperty("description")
        //   )
        // )) {
        //   response = await axios.post(
        //     "https://wishresearch.kr/panels/marketing_customer_recommendation",
        //     data,
        //     axiosConfig
        //   );
        //   retryCount++;

        //   marketingCustomer = response.data.marketing_customer_recommendation;
        // }
        // if (retryCount === maxRetries) {
        //   throw new Error("Maximum retry attempts reached. Empty response persists.");
        // }
        
        setMarketingCustomerData([
          {
              "name": "만성 피부 질환을 앓고 있는 환자",
              "characteristic": {
                  "summary": "아토피 피부염, 건선, 여드름 등 만성 피부 질환을 앓고 있으며, 지속적인 관리가 필요합니다.",
                  "description": "이들은 피부 질환으로 인해 일상생활에서 불편함을 겪고 있으며, 증상 관리와 치료에 많은 시간과 노력을 투자합니다. 피부 상태 변화를 정확하게 기록하고 의료 전문가와 꾸준히 소통하며, 개인 맞춤형 치료 정보를 얻는 것을 중요하게 생각합니다. 또한, 스마트폰 사용에 익숙하며, 모바일 앱을 통해 편리하게 정보를 얻고 의료 서비스를 이용하는 것을 선호합니다."
              },
              "market": {
                  "summary": "만성 피부 질환 환자는 전 세계적으로 증가하고 있으며, 디지털 헬스케어 서비스에 대한 수요가 높습니다.",
                  "description": "2023년 Statista 보고서에 따르면 글로벌 만성 피부 질환 시장 규모는 약 1,000억 달러이며, 2028년까지 연평균 5% 성장할 것으로 예상됩니다. 특히, 모바일 앱을 통한 피부 질환 관리 서비스는 편리성과 접근성을 높여 환자들에게 큰 인기를 얻고 있습니다. '화이자', '존슨앤드존슨' 등 글로벌 제약회사들은 디지털 헬스케어 사업에 적극적으로 투자하고 있으며, 국내에서도 '메디블록'과 같은 스타트업들이 블록체인 기술을 활용한 환자 데이터 관리 서비스를 제공하고 있습니다."
              },
              "function": {
                  "summary": "개인 맞춤형 피부 기록 관리, 의료 전문가와의 원활한 커뮤니케이션, 개인 맞춤형 치료 정보 제공, 의료 서비스 연동",
                  "description": "피부 상태 변화, 치료 과정, 약물 복용 기록 등을 입력하고 사진과 비디오를 추가하여 시간 경과에 따른 피부 상태 변화를 기록하고 관리할 수 있습니다. 의료 전문가와 텍스트, 사진, 비디오를 이용하여 편리하게 소통하고 질문하고 답변을 얻을 수 있습니다. 환자의 피부 질환 종류, 증상, 병력, 생활 습관 등을 고려하여 개인 맞춤형 치료 정보, 건강 관리 팁, 관련 연구 정보를 제공합니다. 환자의 동의를 얻어 환자의 의료 기록을 연동하여 필요한 경우 의료 전문가가 환자의 기록을 확인하고 더욱 효과적인 진료를 제공할 수 있도록 지원합니다."
              },
              "competence": {
                  "summary": "정확한 데이터 기반의 개인 맞춤형 서비스 제공, 의료 전문가 네트워크 활용, 데이터 보안 및 개인 정보 보호 강화",
                  "description": "데이터 분석 기술을 통해 환자의 피부 상태와 치료 경과를 정확하게 파악하고, 이를 바탕으로 개인 맞춤형 정보와 기능을 제공합니다. 국내외 유명 피부과 전문의와 협력하여 전문적인 정보와 진료 연계 서비스를 제공합니다. 블록체인 기술을 활용하여 환자 데이터를 안전하게 관리하고, 개인 정보 보호 정책을 철저히 준수합니다."
              }
          },
          {
              "name": "피부 질환 진단 및 치료 후 관리가 필요한 환자",
              "characteristic": {
                  "summary": "피부 질환 진단을 받은 후, 치료 과정을 마친 환자들은 재발 방지 및 지속적인 관리가 필요합니다.",
                  "description": "이들은 치료 후에도 피부 상태를 주의 깊게 관찰하고, 재발을 예방하기 위한 관리 방법을 꾸준히 실천하고자 합니다. 정기적인 의료 전문가와의 소통과 개인 맞춤형 관리 정보를 필요로 하며, 모바일 앱을 통해 편리하게 정보를 얻고 서비스를 이용하는 것을 선호합니다. 특히, 재발 방지와 건강한 피부 유지를 위해 신뢰할 수 있는 정보와 전문적인 관리 도움을 원합니다."
              },
              "market": {
                  "summary": "피부 질환 치료 후 관리 시장은 성장하고 있으며, 환자들의 지속적인 관리 요구가 증가하고 있습니다.",
                  "description": "2023년 조사 결과, 피부 질환 치료 후 재발 방지를 위해 지속적인 관리 서비스를 원하는 환자 비율이 70% 이상입니다. 이는 환자들이 치료 후에도 건강한 피부를 유지하고 싶어하는 욕구가 높음을 보여줍니다. '아마존'과 같은 IT 기업들은 건강 관리 솔루션 제공에 뛰어들고 있으며, 국내에서도 '휴이노'와 같은 스타트업들이 웨어러블 기기를 활용한 피부 상태 모니터링 서비스를 제공하고 있습니다."
              },
              "function": {
                  "summary": "개인 맞춤형 관리 정보 제공, 재발 방지 가이드, 건강한 피부 관리 팁, 의료 전문가와의 원격 상담",
                  "description": "환자의 피부 상태와 치료 기록을 분석하여 개인 맞춤형 관리 정보와 재발 방지 가이드를 제공합니다. 건강한 피부 관리 팁, 식습관 개선, 생활 습관 관리 등 유용한 정보를 제공하여 재발을 예방하고 건강한 피부를 유지하도록 돕습니다. 의료 전문가와의 원격 상담 기능을 통해 필요할 때마다 전문적인 의료 지원을 받을 수 있도록 지원합니다."
              },
              "competence": {
                  "summary": "전문의와의 협력을 통한 신뢰성 확보, AI 기반 개인 맞춤형 관리 시스템, 데이터 분석을 통한 재발 위험 예측",
                  "description": "피부과 전문의와 협력하여 정확하고 신뢰할 수 있는 정보와 관리 가이드를 제공합니다. AI 기반 개인 맞춤형 관리 시스템은 환자의 피부 상태 변화를 분석하고, 맞춤형 관리 정보와 알림을 제공하여 재발 위험을 줄입니다. 환자 데이터를 분석하여 재발 위험을 예측하고, 사전에 예방 조치를 취할 수 있도록 지원합니다."
              }
          },
          {
              "name": "피부 질환에 대한 정보 및 관리 지원을 필요로 하는 일반인",
              "characteristic": {
                  "summary": "피부 질환에 대한 정보를 얻고, 건강한 피부 관리 방법을 배우고 싶어하는 일반인입니다.",
                  "description": "이들은 피부 건강에 대한 관심이 높으며, 건강한 피부를 유지하고 피부 질환을 예방하기 위한 정보와 관리 방법을 찾고 있습니다. 신뢰할 수 있는 정보를 제공하는 서비스를 선호하며, 전문가의 조언과 팁을 통해 피부 건강 관리에 대한 이해도를 높이고 싶어합니다. 또한, 스마트폰 사용에 익숙하며, 모바일 앱을 통해 편리하게 정보를 얻고 서비스를 이용하는 것을 선호합니다."
              },
              "market": {
                  "summary": "피부 건강 관리에 대한 관심이 증가하고 있으며, 일반인을 위한 피부 질환 정보 및 관리 서비스 시장은 성장하고 있습니다.",
                  "description": "2023년 조사 결과, 피부 건강 관리에 대한 정보를 얻고 싶어하는 일반인의 비율이 80% 이상이며, 특히 피부 질환 예방과 건강한 피부 유지를 위한 정보에 대한 수요가 높습니다. '토스'와 '카카오뱅크' 등 핀테크 기업들은 금융 서비스와 연계한 건강 관리 솔루션을 제공하며, 사용자들의 관심을 끌고 있습니다. '코세라'와 '유데미' 등 에듀테크 기업들은 피부 건강 관리 교육 프로그램을 제공하며, 일반인들의 피부 건강 관리 역량을 강화하고 있습니다."
              },
              "function": {
                  "summary": "피부 질환 관련 정보 제공, 건강한 피부 관리 팁, 피부 유형별 맞춤 관리 가이드, 전문가 칼럼 및 영상 콘텐츠",
                  "description": "피부 질환의 종류, 증상, 원인, 치료 방법 등 다양한 정보를 제공합니다. 건강한 피부를 위한 생활 습관, 화장품 사용법, 식습관 관리 등 유용한 팁을 제공합니다. 피부 유형별 맞춤 관리 가이드를 제공하여 사용자들이 자신의 피부에 맞는 관리 방법을 선택할 수 있도록 돕습니다. 피부과 전문의, 뷰티 전문가 등 전문가들의 칼럼과 영상 콘텐츠를 제공하여 신뢰성 있는 정보를 제공합니다."
              },
              "competence": {
                  "summary": "전문가 검증을 통한 정보 신뢰성 확보, 다양한 콘텐츠 제공, 사용자 참여 유도 및 커뮤니티 형성",
                  "description": "피부과 전문의와 뷰티 전문가 등 전문가들의 검증을 거친 정확하고 신뢰할 수 있는 정보를 제공합니다. 텍스트, 이미지, 영상 등 다양한 형태의 콘텐츠를 제공하여 사용자들의 흥미와 이해도를 높입니다. 사용자들이 서로 정보를 공유하고 소통할 수 있는 커뮤니티 기능을 제공하여, 사용자 참여를 유도하고 정보 공유를 활성화합니다."
              }
          },
          {
              "name": "피부 질환 예방 및 건강 관리에 관심 있는 젊은 세대",
              "characteristic": {
                  "summary": "피부 건강에 대한 관심이 높고, 모바일 앱을 통한 정보 습득과 서비스 이용에 익숙합니다.",
                  "description": "이들은 미디어와 SNS를 통해 피부 건강 정보를 얻고, 피부 질환 예방과 건강한 피부 유지를 위해 다양한 노력을 기울입니다. 모바일 앱을 통한 정보 습득과 서비스 이용에 익숙하며, 편리하고 사용자 친화적인 인터페이스를 선호합니다. 또한, 개인 맞춤형 정보와 기능을 제공하는 서비스를 선호하며, 피부 건강 관리에 대한 최신 트렌드와 정보를 얻고자 합니다."
              },
              "market": {
                  "summary": "젊은 세대는 피부 건강 관리에 대한 관심이 높으며, 모바일 앱을 통한 서비스 이용에 익숙합니다.",
                  "description": "2023년 조사 결과, 20대~30대의 90% 이상이 모바일 앱을 통해 피부 건강 정보를 얻고, 관련 서비스를 이용합니다. 이들은 디지털 기기에 대한 높은 친숙도와 개인 맞춤형 서비스에 대한 선호도를 가지고 있습니다. '스켈터랩스'와 '아크릴' 등 AI 전문 기업들은 젊은 세대를 타겟으로 인공지능 기반의 피부 분석 및 맞춤형 콘텐츠 서비스를 제공하고 있습니다."
              },
              "function": {
                  "summary": "피부 분석 기능, 개인 맞춤형 관리 팁, 피부 트렌드 정보 제공, 뷰티 콘텐츠 및 커뮤니티 기능",
                  "description": "AI 기반 피부 분석 기능을 통해 사용자의 피부 상태를 분석하고, 개인 맞춤형 관리 팁과 제품 추천을 제공합니다. 최신 피부 트렌드, 화장품 정보, 피부 건강 관리 정보 등을 제공하여 사용자들의 피부 건강 관리에 대한 이해도를 높입니다. 뷰티 관련 콘텐츠와 정보를 제공하며, 사용자들이 서로 소통하고 정보를 공유할 수 있는 커뮤니티 기능을 제공합니다."
              },
              "competence": {
                  "summary": "AI 기반 피부 분석 기술 활용, 트렌드 반영된 콘텐츠 제공, 사용자 참여 유도 및 커뮤니티 활성화",
                  "description": "AI 기술을 활용하여 사용자의 피부 상태를 정확하게 분석하고, 개인 맞춤형 정보를 제공하여 경쟁력을 높입니다. 젊은 세대의 관심사를 반영한 최신 트렌드 정보와 콘텐츠를 제공하여, 사용자들의 참여와 만족도를 높입니다. 사용자들이 서로 소통하고 정보를 공유할 수 있는 커뮤니티 기능을 제공하여, 지속적인 사용과 참여를 유도합니다."
              }
          },
          {
              "name": "피부 건강에 대한 정보 접근성이 제한적인 지역 주민",
              "characteristic": {
                  "summary": "대도시에 비해 피부 질환 정보 접근성이 낮고, 전문적인 의료 서비스 이용이 어려울 수 있습니다.",
                  "description": "이들은 의료 기관 접근성이 제한적이며, 피부 질환 관련 정보를 얻는 데 어려움을 겪고 있습니다. 전문적인 의료 서비스를 받기 위해서는 시간과 비용이 많이 소요되며, 지역 특성에 맞는 정보와 서비스를 찾기 어려울 수 있습니다. 모바일 앱을 통해 편리하게 정보를 얻고, 필요한 경우 의료 전문가와 원격으로 소통하는 것을 선호합니다."
              },
              "market": {
                  "summary": "지역 의료 서비스 접근성이 낮은 지역은 디지털 헬스케어 서비스에 대한 수요가 높습니다.",
                  "description": "2023년 조사 결과, 의료 기관 접근성이 낮은 지역 주민의 60% 이상이 디지털 헬스케어 서비스를 통해 피부 질환 정보를 얻고, 의료 서비스를 이용하는 것을 선호합니다. 이는 지역 주민들이 디지털 플랫폼을 통해 의료 서비스 접근성을 높이고, 건강 관리에 대한 정보를 얻고자 하는 욕구가 높음을 보여줍니다."
              },
              "function": {
                  "summary": "지역 특성에 맞는 정보 제공, 의료 기관 연계 서비스, 지역 의료 전문가와의 원격 상담",
                  "description": "지역 특성에 맞는 피부 질환 정보와 건강 관리 팁을 제공합니다. 지역 내 의료 기관과 연계하여, 진료 예약, 진료 정보 확인, 의료 서비스 이용 등을 지원합니다. 지역 의료 전문가와의 원격 상담 기능을 제공하여, 사용자들이 편리하게 의료 상담을 받을 수 있도록 지원합니다."
              },
              "competence": {
                  "summary": "지역 특성 반영한 정보 제공, 지역 의료 기관과의 협력, 의료 서비스 접근성 향상",
                  "description": "지역 특성을 고려하여 피부 질환 정보와 관리 팁을 제공하여, 사용자들의 이해도를 높입니다. 지역 의료 기관과의 협력을 통해, 사용자들에게 보다 나은 의료 서비스 접근성을 제공합니다. 의료 서비스 접근성을 높여, 지역 주민들의 건강 관리 수준을 향상시키고, 지역 사회의 건강 증진에 기여합니다."
              }
          }
      ]);

        // await saveConversation(
        //   { changingConversation: { marketingCustomerData: marketingCustomer } }
        // );

        setIsLoading(false);
        setIsLoadingMarketingCustomer(false);
      }
    };

    fetchMarketingCustomer();
  }, [marketingCustomerButtonState]);

  const handleConfirm = async () => {
    if (marketingCustomerCount === 0 && Object.keys(marketingSelectedCustomerState1).length === 0 ||
        marketingCustomerCount === 1 && Object.keys(marketingSelectedCustomerState2).length === 0 ||
        marketingCustomerCount === 2 && Object.keys(marketingSelectedCustomerState3).length === 0
      ) return;

    if (marketingCustomerCount === 0) setMarketingSelectedCustomer([marketingSelectedCustomerState1]);
    else if (marketingCustomerCount === 1) setMarketingSelectedCustomer([...marketingSelectedCustomer, marketingSelectedCustomerState2]);
    else if (marketingCustomerCount === 2) setMarketingSelectedCustomer([...marketingSelectedCustomer, marketingSelectedCustomerState3]);

    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "user",
        message: marketingCustomerCount === 0 ? `${marketingSelectedCustomerState1.content.name}`
                  : marketingCustomerCount === 1 ? `${marketingSelectedCustomerState2.content.name}`
                    : `${marketingSelectedCustomerState3.content.name}`,
      },
      {
        type: "system",
        message: marketingCustomerCount === 0 ? 
                  `${marketingSelectedCustomerState1.content.name}을 주요 고객으로 생각하시는 군요,\n그럼 이 고객에게 어떤 매력 포인트가 먹힐지, 어떻게 포지셔닝을 하면 좋을지 확인해볼게요 💭` 
                  : marketingCustomerCount === 1 ? 
                    `${marketingSelectedCustomerState2.content.name}도 알아보겠습니다.\n${marketingSelectedCustomerState1.content.name}과 어떤 관점에서 변화가 있는지 궁금하네요 🤔`
                    : 
                    `${marketingSelectedCustomerState3.content.name}으로 마지막 주요 고객층을 선택하셨네요🙌🏻\n마지막으로 아이템은 어떻게 달라질까요? `,
        expertIndex: 0,
      },
      {
        type: `marketingSegmentReport`,
      },
      {
        type: "system",
        message: marketingCustomerCount === 0 ? `좋습니다🌞 첫번째 주요 고객을 확인해보았습니다.\n다른 고객들도 주요 고객이라고 생각하신다면, 추가적으로 더 확인해볼게요! (총 3회 가능)`
                  : marketingCustomerCount === 1 ? `두번째 주요 고객도 확인해 보았네요. 마지막 고객도 확인해 볼까요? (총 3회 가능)`
                  : `세 가지 타겟 고객층을 모두 확인해 보았습니다. 이제 ${titleOfBusinessInfo}에 가장 적합하다고 생각하는 핵심 타겟 고객층을 하나 선택해 주세요.\n선택하신 타겟층을 중심으로 서비스의 잠재력을 집중 분석해 보겠습니다. 🚀`,
        expertIndex: -1,
      },
      {
        type: "marketingCustomerButton",
      },
    );
    setConversation(updatedConversation);

    await saveConversation(
      { changingConversation: { conversation: updatedConversation } }
    );
  };

  return (
    <Wrapper>
      {isLoadingMarketingCustomer ?
      <>
      </>
      :
      <> 
      {marketingCustomerCount === 0 ? 
      <>
        <OptionsContainer>
          {marketingCustomerData.map((customer, index) => (
            <Option1
              key={index}
              onClick={() => handleOptionClick(index)}
              selected={marketingSelectedCustomerState1.index === index}
              marketingSelectedCustomer={marketingSelectedCustomer}
              marketingCustomerCount={marketingCustomerCount}
            >
              <Label1
                marketingSelectedCustomer={marketingSelectedCustomer}
                selected={marketingSelectedCustomerState1.index === index}
                marketingCustomerCount={marketingCustomerCount}
              >
                {customer.name}
              </Label1>
            </Option1>
          ))}
        </OptionsContainer>

        <ButtonWrap>
          <Button1 
            marketingSelectedCustomerState1={marketingSelectedCustomerState1} 
            marketingSelectedCustomer={marketingSelectedCustomer} 
            marketingCustomerCount={marketingCustomerCount}
            onClick={handleConfirm}
          >확인</Button1>
        </ButtonWrap>
      </>
      : 
      marketingCustomerCount === 1 ?
      <>
        <OptionsContainer>
          {marketingCustomerData
          .filter((_, index) => index !== marketingSelectedCustomerState1.index)
          .map((customer, index) => (
            <Option2
              key={index}
              onClick={() => handleOptionClick(index)}
              selected={marketingSelectedCustomerState2.index === index}
              marketingSelectedCustomer={marketingSelectedCustomer}
              marketingCustomerCount={marketingCustomerCount}
            >
              <Label2
                marketingSelectedCustomer={marketingSelectedCustomer}
                selected={marketingSelectedCustomerState2.index === index}
                marketingCustomerCount={marketingCustomerCount}
              >
                {customer.name}
              </Label2>
            </Option2>
          ))}
        </OptionsContainer>

        <ButtonWrap>
          <Button2 
            marketingSelectedCustomerState2={marketingSelectedCustomerState2} 
            marketingSelectedCustomer={marketingSelectedCustomer} 
            marketingCustomerCount={marketingCustomerCount}
            onClick={handleConfirm}
          >확인</Button2>
        </ButtonWrap>
      </>
      :
      <>
        <OptionsContainer>
          {marketingCustomerData
          .filter((_, index) => index !== marketingSelectedCustomerState1.index && index !== marketingSelectedCustomerState2.index)
          .map((customer, index) => (
            <Option3
              key={index}
              onClick={() => handleOptionClick(index)}
              selected={marketingSelectedCustomerState3.index === index}
              marketingSelectedCustomer={marketingSelectedCustomer}
              marketingCustomerCount={marketingCustomerCount}
            >
              <Label3
                marketingSelectedCustomer={marketingSelectedCustomer}
                selected={marketingSelectedCustomerState3.index === index}
                marketingCustomerCount={marketingCustomerCount}
              >
                {customer.name}
              </Label3>
            </Option3>
          ))}
        </OptionsContainer>

        <ButtonWrap>
          <Button3 
            marketingSelectedCustomerState3={marketingSelectedCustomerState3} 
            marketingSelectedCustomer={marketingSelectedCustomer} 
            marketingCustomerCount={marketingCustomerCount}
            onClick={handleConfirm}
          >확인</Button3>
        </ButtonWrap>
      </>
      }
      </>
    }
    </Wrapper>
  );
};

export default MoleculeMarketingCustomer;

const Wrapper = styled.div`
  max-width:540px;
  width:100%;
  display:flex;
  flex-direction:column;
  gap:20px;
  padding:20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};
`;

const OptionsContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:8px;
`;

const Option1 = styled.div`
  position:relative;
  display:flex;
  gap:8px;
  align-items:center;
  color: ${palette.gray800};
  font-size:0.88rem;
  text-align: left;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? Object.keys(props.marketingSelectedCustomer).length >= 1
        ? "rgba(0,0,0,0.05)"
        : "rgba(4,83,244,0.05)"
      : palette.white};
  border: 1px solid ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 1 ? palette.gray800 : palette.blue) : palette.lineGray)};
  transition:all .5s;

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height:1.3;
  }
  
  img {
    margin-bottom: 5px;
    background-color: ${(props) => (!props.selected || Object.keys(props.marketingSelectedCustomer).length >= 1 ? "rgba(246, 246, 246, 1)" : "rgba(255, 255, 255, 1)")};
    border-radius: 50%;
    padding: 10px;
    width: 34px;
    height: 34px;
  }

  &:hover {
    border-color: ${(props) =>
      Object.keys(props.marketingSelectedCustomer).length >= 1
        ? "none" 
        : palette.blue};
  }
`;

const Option2 = styled.div`
  position:relative;
  display:flex;
  gap:8px;
  align-items:center;
  color: ${palette.gray800};
  font-size:0.88rem;
  text-align: left;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? Object.keys(props.marketingSelectedCustomer).length >= 2
        ? "rgba(0,0,0,0.05)"
        : "rgba(4,83,244,0.05)"
      : palette.white};
  border: 1px solid ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 2 ? palette.gray800 : palette.blue) : palette.lineGray)};
  transition:all .5s;

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height:1.3;
  }
  
  img {
    margin-bottom: 5px;
    background-color: ${(props) => (!props.selected || Object.keys(props.marketingSelectedCustomer).length >= 2 ? "rgba(246, 246, 246, 1)" : "rgba(255, 255, 255, 1)")};
    border-radius: 50%;
    padding: 10px;
    width: 34px;
    height: 34px;
  }

  &:hover {
    border-color: ${(props) =>
      Object.keys(props.marketingSelectedCustomer).length >= 2
        ? "none" 
        : palette.blue};
  }
`;

const Option3 = styled.div`
  position:relative;
  display:flex;
  gap:8px;
  align-items:center;
  color: ${palette.gray800};
  font-size:0.88rem;
  text-align: left;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? Object.keys(props.marketingSelectedCustomer).length >= 3
        ? "rgba(0,0,0,0.05)"
        : "rgba(4,83,244,0.05)"
      : palette.white};
  border: 1px solid ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 3 ? palette.gray800 : palette.blue) : palette.lineGray)};
  transition:all .5s;

  p {
    color: ${(props) => (props.selected ? palette.gray800 : palette.gray500)};
    line-height:1.3;
  }
  
  img {
    margin-bottom: 5px;
    background-color: ${(props) => (!props.selected || Object.keys(props.marketingSelectedCustomer).length >= 3 ? "rgba(246, 246, 246, 1)" : "rgba(255, 255, 255, 1)")};
    border-radius: 50%;
    padding: 10px;
    width: 34px;
    height: 34px;
  }

  &:hover {
    border-color: ${(props) =>
      Object.keys(props.marketingSelectedCustomer).length >= 3
        ? "none" 
        : palette.blue};
  }
`;

const Label1 = styled.label`
  position:relative;
  display:flex;
  gap:8px;
  align-items:flex-start;
  width:100%;
  color: ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 1 ? palette.gray800 : palette.blue) : palette.gray800)};
  cursor:pointer;

  &:before {
    width:20px;
    height:20px;
    flex-shrink:0;
    border-radius:50%;
    border:1px solid ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 1 ? palette.gray800 : palette.blue) : palette.lineGray)};
    background-color: ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 1 ? palette.gray800 : palette.blue) : palette.white)};
    transition:all .5s;
    content:'';
  }

  &:after {
    position:absolute;
    left:0;
    top:0;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }
`;

const Label2 = styled.label`
  position:relative;
  display:flex;
  gap:8px;
  align-items:flex-start;
  width:100%;
  color: ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 2 ? palette.gray800 : palette.blue) : palette.gray800)};
  cursor:pointer;

  &:before {
    width:20px;
    height:20px;
    flex-shrink:0;
    border-radius:50%;
    border:1px solid ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 2 ? palette.gray800 : palette.blue) : palette.lineGray)};
    background-color: ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 2 ? palette.gray800 : palette.blue) : palette.white)};
    transition:all .5s;
    content:'';
  }

  &:after {
    position:absolute;
    left:0;
    top:0;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }
`;

const Label3 = styled.label`
  position:relative;
  display:flex;
  gap:8px;
  align-items:flex-start;
  width:100%;
  color: ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 3 ? palette.gray800 : palette.blue) : palette.gray800)};
  cursor:pointer;

  &:before {
    width:20px;
    height:20px;
    flex-shrink:0;
    border-radius:50%;
    border:1px solid ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 3 ? palette.gray800 : palette.blue) : palette.lineGray)};
    background-color: ${(props) => (props.selected ? (Object.keys(props.marketingSelectedCustomer).length >= 3 ? palette.gray800 : palette.blue) : palette.white)};
    transition:all .5s;
    content:'';
  }

  &:after {
    position:absolute;
    left:0;
    top:0;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }
`;

const ButtonWrap = styled.div`
  display:flex;
  justify-content:end;
  align-items:center;
`;

const Button1 = styled.button`
  font-family: Pretendard, Poppins;
  font-size:0.88rem;
  color: ${(props) => (Object.keys(props.marketingSelectedCustomerState1).length ? palette.chatBlue : palette.gray500)};
  line-height:22px;
  // padding:8px 20px;
  margin-left:auto;
  border-radius:8px;
  border:0;
  background:${palette.white};
  transition:all .5s;

  display: ${(props) => (
    props.marketingCustomerCount === 0 && Object.keys(props.marketingSelectedCustomer).length >= 1 ? 'none' : 'block')};
`;

const Button2 = styled.button`
  font-family: Pretendard, Poppins;
  font-size:0.88rem;
  color: ${(props) => (Object.keys(props.marketingSelectedCustomerState2).length ? palette.chatBlue : palette.gray500)};
  line-height:22px;
  // padding:8px 20px;
  margin-left:auto;
  border-radius:8px;
  border:0;
  background:${palette.white};
  transition:all .5s;

  display: ${(props) => (
    Object.keys(props.marketingSelectedCustomer).length >= 2 ? 'none' : 'block')};
`;

const Button3 = styled.button`
  font-family: Pretendard, Poppins;
  font-size:0.88rem;
  color: ${(props) => (Object.keys(props.marketingSelectedCustomerState3).length ? palette.chatBlue : palette.gray500)};
  line-height:22px;
  // padding:8px 20px;
  margin-left:auto;
  border-radius:8px;
  border:0;
  background:${palette.white};
  transition:all .5s;

  display: ${(props) => (
    Object.keys(props.marketingSelectedCustomer).length >= 3 ? 'none' : 'block')};
`;