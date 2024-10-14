import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  APPROACH_PATH,
  STRATEGY_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA, // Import the new list-based atom
  CONVERSATION_STAGE,
  CONVERSATION,
  isLoggedInAtom,
  CONVERSATION_ID,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_LIST,
  IS_LOADING,
  SAVED_TIMESTAMP,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  RECOMMENDED_TARGET_DATA,
  POC_DETAIL_REPORT_ATOM,
  POC_PERSONA_LIST,
} from "../../../AtomStates";

import { getConversationByIdFromIndexedDB } from "../../../../utils/indexedDB";
import { createChatOnServer } from "../../../../utils/indexedDB"; // 서버와 대화 ID 생성 함수

import OrganismLeftSideBar from "../organisms/OrganismLeftSideBar";
import OrganismRightSideBar from "../organisms/OrganismRightSideBar";
import OrganismBizAnalysisSection from "../organisms/OrganismBizAnalysisSection";
import OrganismStrategyReportSection from "../organisms/OrganismStrategyReportSection";
import OrganismPocReportSection from "../organisms/OrganismPocReportSection";
import OrganismSearchBottomBar from "../organisms/OrganismSearchBottomBar";
import MoleculeBizName from "../molecules/MoleculeBizName";
import MoleculeSystemMessage from "../molecules/MoleculeSystemMessage";
import MoleculeUserMessage from "../molecules/MoleculeUserMessage";
import OrganismBizExpertSelect from "../organisms/OrganismBizExpertSelect";
import MoleculeAdditionalKeyword from "../molecules/MoleculeAdditionalKeyword";
import OrganismAdditionalReport from "../organisms/OrganismAdditionalReport";
import MoleculeCheckReportRightAway from "../molecules/MoleculeCheckReportRightAway";
import MoleculeCheckPocRightAway from "../molecules/MoleculeCheckPocRightAway";
import MoleculeCheckPocOption from "../molecules/MoleculeCheckPocOption";
import OrganismCustomerAdditionalReport from "../organisms/OrganismCustomerAdditionalReport";
import MoleculePersonaSelect from "../molecules/MoleculePersonaSelect";
import MoleculeRecommendedTargetButton from "../molecules/MoleculeRecommendedTargetButton";
import OrganismRecommendedTargetReport from "../organisms/OrganismRecommendedTargetReport";

const PageExpertInsight = () => {
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [isLoadingPage, setIsLoadingPage] = useState(true); // 로딩 상태 추가
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const navigate = useNavigate();
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(IS_EXPERT_INSIGHT_ACCESSIBLE);

  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
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
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [sections, setSections] = useState([]);

  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);

  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);

  const [customerAdditionalReportData, setCustomerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);

  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  const [additionalReportData, setAdditionalReportData] = useAtom(ADDITIONAL_REPORT_DATA); // Use the new list-based atom

  const [strategyReportData, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA); // 변경된 부분

  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인
  const [advise, setAdvise] = useState(""); // 새로운 advise 상태 추가

  const [selectedExpertList, setSelectedExpertList] = useAtom(SELECTED_EXPERT_LIST);
  
  const [savedTimestamp, setSavedTimestamp] = useAtom(SAVED_TIMESTAMP);

  const [selectedPocOptions, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);

  const [pocDetailReportData, setpocDetailReportData] = useAtom(POC_DETAIL_REPORT_ATOM);
  
  let additionalReportCount = 0;
  let customerAdditionalReportCount = 0;

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isExpertInsightAccessible) {
      navigate('/MeetAiExpert'); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
      console.log("메인 페이지로 리다이렉트");
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsExpertInsightAccessible(false); // 페이지 떠날 때 접근 불가로 설정
      console.log("접근 불가로 설정");
    };
  }, [navigate]);

  useEffect(() => {
    const loadConversation = async () => {
      // 1. 로그인 여부 확인
      if (isLoggedIn) {
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
        if (!conversationId && isExpertInsightAccessible) {
          try {
            // 서버에서 새로운 대화 ID 생성
            // console.log("서버에서 새로운 대화 ID 생성");
            const newConversationId = await createChatOnServer();
            setConversationId(newConversationId); // 생성된 대화 ID 설정
            setIsExpertInsightAccessible(true); 
            setIsLoadingPage(false); // 로딩 완료
            // 새로운 대화 ID로 경로 변경
            navigate(`/conversation/${newConversationId}`, { replace: true });
          } catch (error) {
            setIsLoadingPage(false); // 로딩 완료
            setIsExpertInsightAccessible(true); 
            console.error("Failed to create conversation on server:", error);
            navigate(`/conversation/${conversationId}`, { replace: true });
          }
        } else {
          // 3. 대화 ID가 이미 존재하면 IndexedDB에서 대화 불러오기
          const savedConversation = await getConversationByIdFromIndexedDB(conversationId, isLoggedIn);

          if (savedConversation) {
            setSelectedExpertIndex(savedConversation.expert_index !== undefined ? savedConversation.expert_index : "0");
            const analysisData = savedConversation.analysisReportData || {};
            setTitleOfBusinessInfo(analysisData.title || "");
            setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
            setMainCharacteristicOfBusinessInformation(analysisData.mainCharacter || []);
            setBusinessInformationTargetCustomer(analysisData.mainCustomer || []);

            // 복구된 데이터를 로컬 상태로 설정
            setConversation(savedConversation.conversation);
            setConversationStage(savedConversation.conversationStage);
            setInputBusinessInfo(savedConversation.inputBusinessInfo);

            // 전략 보고서 데이터 복구
            setStrategyReportData(savedConversation.strategyReportData || {}); // 변경된 부분
            setAdditionalReportData(savedConversation.additionalReportData || []);
            setSelectedAdditionalKeyword(savedConversation.selectedAdditionalKeyword || []);
            setSelectedCustomerAdditionalKeyword(savedConversation.selectedCustomerAdditionalKeyword || []);
            setCustomerAdditionalReportData(savedConversation.customerAdditionalReportData || []);

            setSelectedPocOptions(savedConversation.selectedPocOptions || []);
            setSelectedPocTarget(savedConversation.selectedPocTarget || {});
            setRecommendedTargetData(savedConversation.recommendedTargetData || {});
            setpocDetailReportData(savedConversation.pocDetailReportData || {});
            setPocPersonaList(savedConversation.pocPersonaList || []);
          }
          
          setIsLoadingPage(false); // 로딩 완료
        }
      } else {
        // 4. 비로그인 상태인 경우, 새로운 로컬 대화 ID 생성 또는 기존 대화 로드
        // if (!conversationId) {
        //   setConversationId(nanoid()); // 비로그인 시 로컬에서 새로운 ID 생성
        //   setIsLoadingPage(false); // 로딩 완료
        //   setIsExpertInsightAccessible(true); 
        //   navigate(`/conversation/${conversationId}`, { replace: true });
        // } else {
        //   const savedConversation = await getConversationByIdFromIndexedDB(conversationId, isLoggedIn);
        //   if (savedConversation) {
        //     const analysisData = savedConversation.analysisReportData || {};
        //     setTitleOfBusinessInfo(analysisData.title || "");
        //     setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
        //     setMainCharacteristicOfBusinessInformation(analysisData.mainCharacter || []);
        //     setBusinessInformationTargetCustomer(analysisData.mainCustomer || []);

        //     // 복구된 데이터를 로컬 상태로 설정
        //     setConversation(savedConversation.conversation);
        //     setConversationStage(savedConversation.conversationStage);
        //     setInputBusinessInfo(savedConversation.inputBusinessInfo);

        //     // 전략 보고서 데이터 복구
        //     setStrategyReportData(savedConversation.strategyReportData || {}); // 변경된 부분

        //     setAdditionalReportData(savedConversation.additionalReportData || []);
        //     setSelectedAdditionalKeyword(savedConversation.selectedAdditionalKeyword || []);

        //     // 대화 단계가 초기 상태라면 초기 시스템 메시지 설정
        //     if (savedConversation.conversationStage === 1) {
        //       const initialMessage = getInitialSystemMessage();
        //       setConversation([
        //         {
        //           type: "system",
        //           message: initialMessage,
        //           expertIndex: selectedExpertIndex,
        //         },
        //       ]);
        //     }
        //   } else {
        //     // 저장된 대화가 없으면 초기 메시지 설정
        //     if (selectedExpertIndex) {
        //       const initialMessage = getInitialSystemMessage();
        //       setConversation([
        //         {
        //           type: "system",
        //           message: initialMessage,
        //           expertIndex: selectedExpertIndex,
        //         },
        //       ]);
        //     }
        //   }
        //   setIsLoadingPage(false); // 로딩 완료
        // }
      }
    };

    loadConversation();
  }, [conversationId, isLoggedIn, navigate]);

// 스크롤
const [isScrolled, setIsScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 160) {
      setIsScrolled(true); // 스크롤이 내려가면 상태를 true로 변경
    } else {
      setIsScrolled(false); // 스크롤이 최상단에 있을 때 상태를 false로 변경
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll); // 메모리 누수 방지
  };
}, []);

if (isLoadingPage) {
  return <div>Loading...</div>;
}

  return (
    <>
      <ContentsWrap>
        <OrganismLeftSideBar />

        <MainContent>
          <div>
            <ChatWrap className={isScrolled ? "scrolled" : ""}>
              <MoleculeBizName date={savedTimestamp} />
              {conversation?.map((item, index) => {
                if (item.type === "user") {
                  return <MoleculeUserMessage key={index} message={item.message} />;
                } else if (item.type === "system") {
                  return <MoleculeSystemMessage key={index} item={item} />;
                } else if (item.type === "analysis") {
                  return <OrganismBizAnalysisSection conversationId={conversationId} />;
                } else if (item.type.startsWith("strategy_")) {
                  const expertIndex = item.type.split("_")[1];
                  return (
                    <OrganismStrategyReportSection
                      key={`strategy_${expertIndex}_${index}`}
                      conversationId={conversationId}
                      expertIndex={expertIndex}
                    />
                  );
                } else if (item.type.startsWith("poc_")) {
                  const expertIndex = item.type.split("_")[1];
                  return (
                    <>
                      <OrganismPocReportSection
                        key={`poc_${expertIndex}_${index}`}
                        conversationId={conversationId}
                        expertIndex={expertIndex}
                      />
                    </>
                  );
                } else if (item.type.startsWith("pocTarget_")) {
                    const expertIndex = item.type.split("_")[1];
                    return (
                      <>
                        <OrganismRecommendedTargetReport
                          key={`pocTarget_${expertIndex}_${index}`}
                          conversationId={conversationId}
                          expertIndex={expertIndex}
                        />
                      </>
                    );
                } else if (item.type === "addition") {
                  const currentAdditionalReportCount = additionalReportCount++;
                  return (
                    <OrganismAdditionalReport
                      additionalReportCount={currentAdditionalReportCount}
                      conversationId={conversationId}
                    />
                  );
                } else if (item.type === "customerAddition") {
                  const currentCustomerAdditionalReportCount = customerAdditionalReportCount++;
                  return (
                    <OrganismCustomerAdditionalReport
                      customerAdditionalReportCount={currentCustomerAdditionalReportCount}
                      conversationId={conversationId}
                    />
                  );
                } else if (item.type === "keyword") {
                  return <MoleculeAdditionalKeyword />;
                } else if (item.type === "reportButton") {
                  return <MoleculeCheckReportRightAway />;
                } else if (item.type === "pocPlanButton") {
                  return <MoleculeCheckPocRightAway />;
                } else if (item.type === "pocTargetButton") {
                  return <MoleculeRecommendedTargetButton />;
                } else if (item.type === "pocOption") {
                  return <MoleculeCheckPocOption conversationId={conversationId}/>;
                } else if (item.type === "pocPersona") {
                  return <MoleculePersonaSelect conversationId={conversationId}/>;
                }
                return null;
              })}

              {selectedExpertIndex !== "4" ?
                <>
                {/* 검색해서 시작 */}
                {(approachPath === -1 || approachPath === 3) && 
                  titleOfBusinessInfo &&
                  <OrganismBizExpertSelect />
                }

                {/* 전문가 선택하고 시작 */}
                {approachPath === 1 &&
                  Object.keys(strategyReportData).length !== 0 &&
                  !isLoading &&
                    <OrganismBizExpertSelect />
                }

                {/* 히스토리로 진입 시 */}
                {approachPath === 2 && 
                  titleOfBusinessInfo &&
                  conversation.length > 0 &&
                  conversation[conversation.length - 1].type !== "reportButton" &&
                  !isLoading &&
                    <OrganismBizExpertSelect />
                }
                </>
              :
                <>
                {/* 검색해서 시작 */}
                {(approachPath === -1 || approachPath === 3) && 
                  titleOfBusinessInfo &&
                  Object.keys(recommendedTargetData).length !== 0 && 
                  <OrganismBizExpertSelect />
                }

                {/* 4번 전문가 선택하고 시작 */}
                {approachPath === 1 &&
                  !isLoading &&
                  Object.keys(recommendedTargetData).length !== 0 && 
                    <OrganismBizExpertSelect />
                }

                {/* 4번 전문가 히스토리로 진입 시 */}
                {approachPath === 2 && 
                  titleOfBusinessInfo &&
                  conversation.length > 0 &&
                  !isLoading &&
                  Object.keys(recommendedTargetData).length !== 0 &&  
                    <OrganismBizExpertSelect />
                }
              </>
              }
              
            </ChatWrap>

            {conversationStage === 1 ? (
              <OrganismSearchBottomBar isBlue={false} />
            ) : (
              selectedExpertIndex === "4" ? 
                Object.keys(recommendedTargetData).length !== 0 && <OrganismSearchBottomBar isBlue={true} /> // 4번 전문가 보고서 생성 시 활성화 
                : 
                <OrganismSearchBottomBar isBlue={true} />
            )}
          </div>

          <OrganismRightSideBar />
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageExpertInsight;

const MainContent = styled.div`
  position: relative;
  top: 40px;
  grid-area: content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // gap:40px;
  min-width: 1px;
  max-width: 1484px;
  width: calc(100% - 40px);
  // padding-bottom: 150px;
  margin: 0 auto;
  // justify-content:center;

  > div {
    flex: 1;
  }

  > div:first-child {
    max-width:1030px;
    // max-width: 1240px;
    // max-width:800px;
    width: 100%;
    margin: 0 20px;
    padding-bottom: 60px;
  }
`;

const ContentsWrap = styled.div`
  position: relative;
  display: flex;
`;

const ChatWrap = styled.div`
  position: relative;
  height: calc(100% - 55px);

  &:before {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    display: block;
    // height:170px;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 30%
    );
    z-index: 1;
    content: "";
  }

  &.scrolled:before {
    height: 180px;
  }
`;
