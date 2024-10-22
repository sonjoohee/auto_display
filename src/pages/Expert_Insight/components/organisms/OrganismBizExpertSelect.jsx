import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  APPROACH_PATH,
  CONVERSATION_STAGE,
  EXPERT_BUTTON_STATE,
  IS_LOADING,
  SELECTED_EXPERT_LIST,
  STRATEGY_REPORT_DATA,
  CONVERSATION,
  POC_PERSONA_LIST,
  RECOMMENDED_TARGET_DATA,
  SELCTED_POC_TARGET,
  SELECTED_POC_OPTIONS,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  isLoggedInAtom,
  POC_DETAIL_REPORT_DATA,
  INPUT_BUSINESS_INFO,
  SELECTED_ADDITIONAL_KEYWORD,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_LIST,
  IDEA_GROUP,
  IDEA_PRIORITY,
  BUTTON_STATE,
  IDEA_FEATURE_BUTTON_STATE,
  CONVERSATION_ID,
  IDEA_MIRO,
  GROWTH_HACKER_REPORT_DATA,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  KPI_QUESTION_LIST,
} from "../../../AtomStates";

import {
  saveConversationToIndexedDB,
} from "../../../../utils/indexedDB";

const OrganismBizExpertSelect = () => {
  const [ideaMiro, setIdeaMiro] = useAtom(IDEA_MIRO);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] = useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [pocDetailReportData, setpocDetailReportData] = useAtom(POC_DETAIL_REPORT_DATA);
  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [selectedPocOptions, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [conversation, setConversation] = useAtom(CONVERSATION);
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
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [selectedCustomerAdditionalKeyword, setSelectedCustomerAdditionalKeyword] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [additionalReportData, setAdditionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);

  const [strategyReportData, setStrategyReportData] =
    useAtom(STRATEGY_REPORT_DATA);

  const [expertButtonState, setExpertButtonState] =
    useAtom(EXPERT_BUTTON_STATE);

  const [ideaFeatureButtonState, setIdeaFeatureButtonState] = useAtom(IDEA_FEATURE_BUTTON_STATE);

  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [selectedExpertList, setSelectedExpertList] = useAtom(SELECTED_EXPERT_LIST);

  const handledExpertSelect = async (index) => {
    if (!isLoading) {
      const updatedConversation = [...conversation];

      if (
        (updatedConversation.length > 0 &&
          updatedConversation[updatedConversation.length - 1].type ===
            "keyword")
      ) {
        updatedConversation.pop();
      }
  
      // 전문가 선택영역 표시 관련, 선택된 전문가 인덱스 추가
      setSelectedExpertList((prevList) => {
        if (prevList.includes(index)) {
          return prevList;
        }
        return [...prevList, index];
      });
  
      if (index === "1") {
        setExpertButtonState(1);

        updatedConversation.push(
          {
            type: "user",
            message:
              "10년차 전략 디렉터와 1:1 커피챗, 지금 바로 시작하겠습니다 🙌🏻",
          },
          {
            type: "system",
            message:
              "안녕하세요! 저는 전략 전문가 김도원입니다. 😊 여러분의 아이디어를 구체화하고, 성공적인 전략을 세우는 데 도움을 드리겠습니다.\n아이디어나 비즈니스 아이템을 간단히 작성해 주세요. 분석 후, 여러분의 비즈니스에 맞는 전략 리포트를 제공하겠습니다!",
            expertIndex: index,
          },
          { type: `strategy_${index}` }
        );
      } else if (index === "2") {
        setExpertButtonState(1);

        updatedConversation.push(
          {
            type: "user",
            message:
              "마케팅 전문가님의 맞춤 브랜딩 제안서를 요청드려요. 멋진 마케팅 방법을 기대합니다.💡",
          },
          {
            type: "system",
            message:
              "안녕하세요! 마케팅 전문가 이지현입니다. 😄 여러분의 아이디어를 효과적으로 시장에 알릴 수 있는 전략을 함께 고민해 보아요.\n아이디어나 비즈니스 아이템을 여기에 작성해 주세요. 제가 분석하고, 효과적인 마케팅 전략 리포트를 준비해 드리겠습니다!",
            expertIndex: index,
          },
          { type: `strategy_${index}` }
        );
      } else if (index === "3") {
        setExpertButtonState(1);

        updatedConversation.push(
          {
            type: "user",
            message:
              "고객 인사이트를 파악하는 것이 시작이라고 생각합니다.✨ 전문가님의 분석과 제안 내용이 큰 도움이 될 것 같습니다.",
          },
          {
            type: "system",
            message:
              "반갑습니다! 저는 고객 인사이트 전문가 박서연입니다. 😊 여러분의 비즈니스가 목표 고객에게 잘 다가갈 수 있도록 돕겠습니다.\n아이디어나 비즈니스 아이템을 작성해 주세요. 분석 후, 타겟 고객을 정의하고 세분화 방법에 대한 리포트를 제공해 드리겠습니다!",
            expertIndex: index,
          },
          { type: `strategy_${index}` }
        );
      } else if (index === "4") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "제 사업을 위한 적절한 PoC 전략과 검증 가설을 도출해 주세요 🎯",
          },
          {
            type: "system",
            message:
              "안녕하세요! 저는 PoC 설계 전문가 장석훈입니다. 😊 여러분의 사업 목표에 맞춘 가설 설정과 PoC 전략을 설계하고, 성공적인 검증 과정을 지원해드립니다. 맞춤형 PoC 설계를 위해 몇가지 질문에 응답 부탁드립니다!",
            expertIndex: index,
          },
          { type: "pocOption" }
        );
      } else if (index === "5") {
        setIdeaFeatureButtonState(1);

        updatedConversation.push(
          {
            type: "user",
            message:
              "체계적인 방법으로 많은 아이디어 발상 부탁드립니다 💡",
          },
          {
            type: "system",
            message:
              "안녕하세요. 저는 아이디어 디벨로퍼 윤재민입니다.\n혼자 아이디어를 고민하다보면, 한정된 생각에 갇히기 쉽습니다. 제가 다각도로 사업 아이디어 발산을 돕고 우선순위 높은 아이디어를 선별해드려요. 아이템에 대한 설명을 해주세요 📝",
            expertIndex: index,
          },
          { type: `ideaFeature` }
        );
      } else if (index === "6") {
        updatedConversation.push(
          {
            type: "user",
            message:
              "함께 사업 아이디어를 확장해가고 싶습니다 💡",
          },
          {
            type: "system",
            message:
              "안녕하세요. 저는 그로스 해커 김세준입니다. 고객 퍼널에 맞는 전략을 수립하는 것은 비즈니스 성장에 중요한 요소입니다. 제가 퍼널을 분석하고 각 단계에서 성장을 가속화할 전략을 제시해드릴게요. 아이템에 대한 설명을 해주세요 📝",
            expertIndex: index,
          },
          { type: `growthHackerOption` }
        );
      }

      await saveConversationToIndexedDB(
        {
          id: conversationId,
          inputBusinessInfo: inputBusinessInfo,
          analysisReportData: analysisReportData,
          strategyReportData: strategyReportData,
          conversation: updatedConversation,
          conversationStage: 3,
          selectedAdditionalKeywords: selectedAdditionalKeyword,
          selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
          additionalReportData: additionalReportData,
          customerAdditionalReportData: customerAdditionalReportData,
          timestamp: Date.now(),
          expert_index: index,
          selectedPocOptions: selectedPocOptions,
          pocPersonaList: pocPersonaList,
          selectedPocTarget: selectedPocTarget,
          recommendedTargetData: recommendedTargetData,
          pocDetailReportData : pocDetailReportData,
          ideaFeatureData : ideaFeatureData,
          ideaRequirementData : ideaRequirementData,
          ideaList : ideaList,
          ideaGroup : ideaGroup,
          ideaPriority : ideaPriority,
          buttonState : buttonState,
          growthHackerReportData : growthHackerReportData,
          growthHackerDetailReportData : growthHackerDetailReportData,
          KpiQuestionList : KpiQuestionList,
        },
        isLoggedIn,
        conversationId
      );

      setConversation(updatedConversation);
      setConversationStage(3);
      setSelectedExpertIndex(index);
      setApproachPath(3);
    }
  };

  return (
    <>
      {/* 모든 전문가가 선택되었거나, 모든 보고서가 생성되었으면 영역 표시 안함
          selectedExpertList는 DB에 저장되고 있지 않기 떄문에 expertReportData 조건이 필요함 */}
      {((selectedExpertList.includes("1") || strategyReportData.hasOwnProperty(1)) &&
        (selectedExpertList.includes("2") || strategyReportData.hasOwnProperty(2)) &&
        (selectedExpertList.includes("3") || strategyReportData.hasOwnProperty(3)) &&
        (selectedExpertList.includes("4") || strategyReportData.hasOwnProperty(4)) &&
        (selectedExpertList.includes("5") || ideaFeatureData.length !== 0)) ? null : (
  
        <BizExpertSelectContainer>
          <h1>아래 분야별 전문가와 대화를 통해 아이디어를 발전시켜보세요.</h1>
          <SelectOptions>
            {(selectedExpertList.includes("1") || strategyReportData.hasOwnProperty(1)) ? null : (
              <div>
                <img src={images.IconExpert1} alt="" />
                <p>전략 컨설턴트에게 최적화 전략 상담 받기</p>
                <button type="button" onClick={() => handledExpertSelect("1")}>
                  시작하기
                </button>
              </div>
            )}
            {(selectedExpertList.includes("2") || strategyReportData.hasOwnProperty(2)) ? null : (
              <div>
                <img src={images.IconExpert2} alt="" />
                <p>마케팅 전문가에게 마케팅 전략 상담 받기</p>
                <button type="button" onClick={() => handledExpertSelect("2")}>
                  시작하기
                </button>
              </div>
            )}
            {(selectedExpertList.includes("3") || strategyReportData.hasOwnProperty(3)) ? null : (
              <div>
                <img src={images.IconExpert3} alt="" />
                <p>고객 세분화 전문가에게 타겟 고객 제안 받기</p>
                <button type="button" onClick={() => handledExpertSelect("3")}>
                  시작하기
                </button>
              </div>
            )}
            {(selectedExpertList.includes("4") || strategyReportData.hasOwnProperty(4)) ? null : (
              <div>
                <img src={images.IconExpert4} alt="" />
                <p>PoC 설계 전문가에게 맞춤형 PoC 전략 기획서 받기</p>
                <button type="button" onClick={() => handledExpertSelect("4")}>
                  시작하기
                </button>
              </div>
            )}
            {(selectedExpertList.includes("5") || ideaFeatureData.length !== 0) ? null : (
              <div>
                <img src={images.IconExpert5} alt="" />
                <p>구조화된 방법으로 다양한 아이디어 제안 받기</p>
                <button type="button" onClick={() => handledExpertSelect("5")}>
                  시작하기
                </button>
              </div>
            )}
            {(selectedExpertList.includes("6") || KpiQuestionList.length !== 0) ? null : (
              <div>
                <img src={images.IconExpert6} alt="" />
                <p>그로스 해커에게 KPI 전략 받기</p>
                <button type="button" onClick={() => handledExpertSelect("6")}>
                  시작하기
                </button>
              </div>
            )}
            {/* {(selectedExpertList.includes("7") || KpiQuestionList.length !== 0) ? null : (
              <div>
                <img src={images.IconExpert7} alt="" />
                <p>그로스 해커에게 KPI 전략 받기</p>
                <button type="button" onClick={() => handledExpertSelect("7")}>
                  시작하기
                </button>
              </div>
            )}
            {(selectedExpertList.includes("8") || KpiQuestionList.length !== 0) ? null : (
              <div>
                <img src={images.IconExpert8} alt="" />
                <p>그로스 해커에게 KPI 전략 받기</p>
                <button type="button" onClick={() => handledExpertSelect("8")}>
                  시작하기
                </button>
              </div>
            )}
            {(selectedExpertList.includes("9") || KpiQuestionList.length !== 0) ? null : (
              <div>
                <img src={images.IconExpert9} alt="" />
                <p>그로스 해커에게 KPI 전략 받기</p>
                <button type="button" onClick={() => handledExpertSelect("9")}>
                  시작하기
                </button>
              </div>
            )}
            {(selectedExpertList.includes("10") || KpiQuestionList.length !== 0) ? null : (
              <div>
                <img src={images.IconExpert10} alt="" />
                <p>그로스 해커에게 KPI 전략 받기</p>
                <button type="button" onClick={() => handledExpertSelect("10")}>
                  시작하기
                </button>
              </div>
            )} */}
          </SelectOptions>
        </BizExpertSelectContainer>
      )}
    </>
  );  
};

export default OrganismBizExpertSelect;

const BizExpertSelectContainer = styled.div`
  text-align: left;
  margin: 48px auto 0;
  padding-top: 30px;
  padding-bottom: 40px;
  border-top: 1px solid ${palette.lineGray};

  h1 {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${palette.gray};
    margin-bottom: 20px;
  }
`;

const SelectOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 행당 항목 2개
  gap: 12px;

  > div {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};

    p {
      color: ${palette.gray};
    }

    button {
      position: relative;
      font-family: "Pretendard";
      font-size: 0.75rem;
      color: ${palette.gray};
      margin-left: auto;
      padding: 8px 16px;
      border-radius: 10px;
      border: 1px solid ${palette.lineGray};
      background: ${palette.white};

      &:before {
        position: absolute;
        left: 30%;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 7px;
        height: 7px;
        border-top: 1px solid ${palette.gray};
        border-right: 1px solid ${palette.gray};
      }
    }
  }
`;
