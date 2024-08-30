import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  SAVED_CONVERSATIONS,
  IS_CLICK_EXPERT_SELECT,
  APPROACH_PATH,
  STRATEGY_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  ADDITIONAL_REPORT_DATA1,
  ADDITIONAL_REPORT_DATA2,
  ADDITIONAL_REPORT_DATA3,
  ADDITIONAL_QUESTION_1,
  ADDITIONAL_QUESTION_2,
  ADDITIONAL_QUESTION_3,
  CONVERSATION_STAGE ,

} from '../../../AtomStates';

import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';

import OrganismHeader from '../../../organisms/OrganismHeader';
import OrganismLeftSideBar from '../organisms/OrganismLeftSideBar';
import OrganismRightSideBar from '../organisms/OrganismRightSideBar';
import OrganismBizAnalysisSection from '../organisms/OrganismBizAnalysisSection';
import OrganismStrategyReportSection from '../organisms/OrganismStrategyReportSection';
import OrganismSearchBottomBar from '../organisms/OrganismSearchBottomBar';
import MoleculeBizName from '../molecules/MoleculeBizName';
import MoleculeSystemMessage from '../molecules/MoleculeSystemMessage';
import MoleculeUserMessage from '../molecules/MoleculeUserMessage';
import OrganismBizExpertSelect from '../organisms/OrganismBizExpertSelect';
import MoleculeAdditionalKeyword from '../molecules/MoleculeAdditionalKeyword';
import OrganismAdditionalReport from '../organisms/OrganismAdditionalReport';

const PageExpertInsight = () => {
  const navigate = useNavigate();
  const { conversationId: paramConversationId } = useParams();
  const conversationId = paramConversationId || nanoid();
  const [conversation, setConversation] = useState([]);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [isClickExpertSelect, setIsClickExpertSelect] = useAtom(IS_CLICK_EXPERT_SELECT);
  const [sections, setSections] = useState([]);

  // const [strategyReportData, setStrategyReportData] = useAtom(STRATEGY_REPORT_DATA); // 전략 리포트 데이터를 atom으로 관리
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);

  // 각 전문가의 보고서를 관리하는 Atom
  const [expert1ReportData, setExpert1ReportData] = useAtom(EXPERT1_REPORT_DATA);
  const [expert2ReportData, setExpert2ReportData] = useAtom(EXPERT2_REPORT_DATA);
  const [expert3ReportData, setExpert3ReportData] = useAtom(EXPERT3_REPORT_DATA);
  const [additionalReportData1, setAdditionalReportData1] = useAtom(ADDITIONAL_REPORT_DATA1);
  const [additionalReportData2, setAdditionalReportData2] = useAtom(ADDITIONAL_REPORT_DATA2);
  const [additionalReportData3, setAdditionalReportData3] = useAtom(ADDITIONAL_REPORT_DATA3);

  const [addtionalQuestion1, setAddtionalQuestion1] = useAtom(ADDITIONAL_QUESTION_1);
  const [addtionalQuestion2, setAddtionalQuestion2] = useAtom(ADDITIONAL_QUESTION_2);
  const [addtionalQuestion3, setAddtionalQuestion3] = useAtom(ADDITIONAL_QUESTION_3);

  // 현재 선택된 전문가에 맞는 보고서 데이터를 결정
  const getStrategyReportData = () => {
    switch (selectedExpertIndex) {
      case 1:
        return expert1ReportData;
      case 2:
        return expert2ReportData;
      case 3:
        return expert3ReportData;
      default:
        return {};
    }
  };

  const setStrategyReportData = (data) => {
    switch (selectedExpertIndex) {
      case 1:
        setExpert1ReportData(data);
        break;
      case 2:
        setExpert2ReportData(data);
        break;
      case 3:
        setExpert3ReportData(data);
        break;
      default:
        break;
    }
  };

  const setAdditionalReportData = (data) => {
    switch (selectedExpertIndex) {
      case 1:
        setAdditionalReportData1(data);
        break;
      case 2:
        setAdditionalReportData2(data);
        break;
      case 3:
        setAdditionalReportData3(data);
        break;
      default:
        break;
    }
  };

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const [approachPath] = useAtom(APPROACH_PATH);

  useEffect(() => {

  }, )
    const saveConversation = (updatedConversation, newConversationStage) => {
      const existingConversation = getConversationByIdFromIndexedDB(conversationId);

      // 기존의 모든 보고서를 함께 저장
      const existingReports = {
        strategyReportData_EX1: expert1ReportData,
        strategyReportData_EX2: expert2ReportData,
        strategyReportData_EX3: expert3ReportData,

        additionalReportData_EX1: additionalReportData1,
        additionalReportData_EX2: additionalReportData2, 
        additionalReportData_EX3: additionalReportData3, 
      };
      console.log(addtionalQuestion1);
      saveConversationToIndexedDB({
        id: conversationId,
        conversation: updatedConversation,
        conversationStage: newConversationStage,
        inputBusinessInfo,
        analysisReportData,
        addtionalQuestion1: addtionalQuestion1,
        addtionalQuestion2: addtionalQuestion2,
        addtionalQuestion3: addtionalQuestion3,
        selectedAdditionalKeyword: selectedAdditionalKeyword,
        ...existingReports, // 기존의 모든 보고서를 함께 저장
        timestamp: Date.now(),
      });
    };

  useEffect(() => {
    const loadConversation = async () => {
      if (!paramConversationId) {
        navigate(`/conversation/${conversationId}`, { replace: true });
        } else {
            const savedConversation = await getConversationByIdFromIndexedDB(conversationId);
            if (savedConversation) {
                setConversation(savedConversation.conversation);
                setConversationStage(savedConversation.conversationStage);
                setInputBusinessInfo(savedConversation.inputBusinessInfo);

                // analysisReportData에서 데이터를 복원
                const analysisData = savedConversation.analysisReportData || {};
                setTitleOfBusinessInfo(analysisData.title || "");
                setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
                setMainCharacteristicOfBusinessInformation(analysisData.mainCharacter || []);
                setBusinessInformationTargetCustomer(analysisData.mainCustomer || []);

                // 전략 보고서 데이터를 전문가별로 복원
                setExpert1ReportData(savedConversation.strategyReportData_EX1 || {});
                setExpert2ReportData(savedConversation.strategyReportData_EX2 || {});
                setExpert3ReportData(savedConversation.strategyReportData_EX3 || {});

                // 전문가가 바뀌었을 때 해당 전문가의 전략 보고서 바로 적용
                const currentReportKey = `strategyReportData_EX${selectedExpertIndex}`;
                setStrategyReportData(savedConversation[currentReportKey] || {});

                // 추가 보고서 데이터 복원
                setAdditionalReportData1(savedConversation.additionalReportData_EX1 || {});
                setAdditionalReportData2(savedConversation.additionalReportData_EX2 || {});
                setAdditionalReportData3(savedConversation.additionalReportData_EX3 || {});

                // 전문가가 바뀌었을 때 해당 전문가의 전략 보고서 바로 적용
                const currentReportKey2 = `additionalReportData_EX${selectedExpertIndex}`;
                setAdditionalReportData(savedConversation[currentReportKey2] || {});

                setSelectedAdditionalKeyword(savedConversation.selectedAdditionalKeyword);
            } else {
                if (selectedExpertIndex) {
                    const initialMessage = getInitialSystemMessage();
                    setConversation([{ type: 'system', message: initialMessage }]);
                }
            }
        }
    };

    loadConversation();
}, [
    paramConversationId,
    conversationId,
    navigate,
    selectedExpertIndex, // 전문가가 바뀔 때마다 실행
    setInputBusinessInfo,
    setTitleOfBusinessInfo,
    setMainFeaturesOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
    setBusinessInformationTargetCustomer,
    setSections,
    setExpert1ReportData,
    setExpert2ReportData,
    setExpert3ReportData,
    setStrategyReportData, // 추가: 전문가가 바뀌면 바로 반영되도록
    setAdditionalReportData1,
    setAdditionalReportData2,
    setAdditionalReportData3,
    setAdditionalReportData,
]);

const resetConversationState = () => {
  setTitleOfBusinessInfo("");
  setMainFeaturesOfBusinessInformation([]);
  setMainCharacteristicOfBusinessInformation([]);
  setBusinessInformationTargetCustomer([]);
  setExpert1ReportData({});
  setExpert2ReportData({});
  setExpert3ReportData({});
  setAdditionalReportData1({});
  setAdditionalReportData2({});
  setAdditionalReportData3({});
  setConversation([]); // 대화 초기화
  setConversationStage(1); // 초기 대화 단계 설정
  setAdditionalReportData({});
};

  // 검색을 통해 들어왔으면 handleSearch 실행
  useEffect(() => {
    if (approachPath === -1) {
        resetConversationState(); 
        handleSearch(-1); // 검색을 통해 접근한 경우
    } else if (approachPath > 0) {
        // 새로운 전문가를 선택하여 대화를 시작하는 경우 상태를 초기화
        setInputBusinessInfo(""); // 입력된 비즈니스 정보 초기화
        resetConversationState(); 
        const initialMessage = getInitialSystemMessage();
        setConversation([{ type: 'system', message: initialMessage }]);
    }
}, [approachPath, selectedExpertIndex]);

  useEffect(() => {
    if(approachPath) handleSearch(-1);
  },[selectedExpertIndex])

  useEffect(() => {
    if(selectedAdditionalKeyword && conversationStage <= 3) handleSearch(-1);
  },[selectedAdditionalKeyword])

  const handleSearch = (inputValue) => {
    const updatedConversation = [...conversation];

    // 사용자가 입력한 경우에만 inputBusinessInfo를 업데이트
    if (inputValue !== -1) {
        setInputBusinessInfo(inputValue);
        updatedConversation.push({ type: 'user', message: inputValue });
    }

    let newConversationStage = conversationStage;

    if (conversationStage === 1) {
        if (inputBusinessInfo || inputValue !== -1) {  // inputValue가 입력되었을 때도 대화 진행
            const businessInfo = inputBusinessInfo || inputValue;  // inputValue가 더 우선
            // inputBusinessInfo가 존재하거나, 유저가 입력한 경우 대화 진행
            if (approachPath === 0) {
                updatedConversation.push(
                    { type: 'analysis' },
                    { type: 'system', message: '리포트 내용을 보시고 추가로 궁금한 점이 있나요? 아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊' },
                );
            } else {
                updatedConversation.push(
                    { type: 'system', message: `아이디어를 입력해 주셔서 감사합니다!\n지금부터 아이디어를 세분화하여 주요한 특징과 목표 고객을 파악해보겠습니다 🙌🏻` },
                    { type: 'analysis', businessInfo },  // 입력된 비즈니스 정보를 분석
                );
            }
            newConversationStage = 2;
        } else if (!inputBusinessInfo && approachPath !== 0) {
          // inputBusinessInfo가 비어 있고, 검색을 통해 접근하지 않은 경우 전문가 인덱스에 따라 메시지 추가
          const expertPromptMessage = getInitialSystemMessage();
          updatedConversation.push({ type: 'system', message: expertPromptMessage });
      }
      
    } else if (conversationStage === 2) {
        if (!selectedExpertIndex) {
            alert("전문가를 선택해 주세요.");
            return;
        }
        updatedConversation.push(
            { type: 'user', message: '10년차 전략 디렉터와 1:1 커피챗, 지금 바로 시작하겠습니다 🙌🏻' },
            { type: 'system', message: `안녕하세요, 김도원입니다! ${titleOfBusinessInfo}을 구체화하는 데 도움이 될 전략 보고서를 준비했습니다.\n함께 전략을 다듬어 보시죠! 📊"`},
            { type: `strategy_${selectedExpertIndex}` }, // 전문가 인덱스에 따라 전략 보고서 타입 변경
            { type: 'system', message: '리포트 내용을 보시고 추가로 궁금한 점이 있나요? 아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊'},
            { type: `addition_${selectedExpertIndex}` },
        );
        newConversationStage = 3;
    } else if (conversationStage === 3) {
        updatedConversation.pop();
        updatedConversation.push(
            { type: 'user', message: `제 프로젝트와 관련된 "${selectedAdditionalKeyword}"를 요청드려요` },
            { type: `addition_${selectedExpertIndex}` },
            { type: 'system', message: `"${titleOfBusinessInfo}"과 관련된 시장에서의 BDG 메트릭스를 기반으로 ${selectedAdditionalKeyword}를 찾아드렸어요`},
        );
        newConversationStage = 4;
    }

    setConversation(updatedConversation);
    setConversationStage(newConversationStage);

    // 대화 내역을 저장
    saveConversation(updatedConversation, newConversationStage);
};

  const getInitialSystemMessage = () => {
    switch (selectedExpertIndex) {
      case 1:
        return "안녕하세요! 저는 전략 전문가 김도원입니다. 😊 여러분의 아이디어를 구체화하고, 성공적인 전략을 세우는 데 도움을 드리겠습니다.\n아이디어나 비즈니스 아이템을 간단히 작성해 주세요. 분석 후, 여러분의 비즈니스에 맞는 전략 리포트를 제공하겠습니다!";
      case 2:
        return "안녕하세요! 마케팅 전문가 이지현입니다. 😄 여러분의 아이디어를 효과적으로 시장에 알릴 수 있는 전략을 함께 고민해 보아요.\n아이디어나 비즈니스 아이템을 여기에 작성해 주세요. 제가 분석하고, 효과적인 마케팅 전략 리포트를 준비해 드리겠습니다!";
      case 3:
        return "반갑습니다! 저는 고객 인사이트 전문가 박서연입니다. 😊 여러분의 비즈니스가 목표 고객에게 잘 다가갈 수 있도록 돕겠습니다. 아이디어나 비즈니스 아이템을 작성해 주세요. 분석 후, 타겟 고객을 정의하고 세분화 방법에 대한 리포트를 제공해 드리겠습니다!";
      default:
        return '비즈니스(아이디어)를 입력해주세요.';
    }
  };

  return (
    <>
      <ContentsWrap>
        <OrganismLeftSideBar />

        <MainContent>
          <div>
          <MoleculeBizName bizName={titleOfBusinessInfo} />
          {conversation.map((item, index) => {
            if (item.type === 'user') {
              return <MoleculeUserMessage key={index} message={item.message} />;
            } else if (item.type === 'system') {
              return <MoleculeSystemMessage key={index} message={item.message} />;
            } else if (item.type === 'analysis') {
              return <OrganismBizAnalysisSection conversationId={conversationId} />;
            } else if (item.type.startsWith('strategy_')) {
              const expertIndex = item.type.split('_')[1]; // 전략 보고서 타입에서 전문가 인덱스 추출
              return (
                <OrganismStrategyReportSection
                  key={`strategy_${expertIndex}_${index}`} // 키를 고유하게 설정
                  conversationId={conversationId}
                  expertIndex={expertIndex} // 전문가 인덱스를 Prop으로 전달
                />
              );
            } else if (item.type.startsWith('addition_')) {
              const expertIndex = item.type.split('_')[1];
                if(selectedAdditionalKeyword) {
                  return <OrganismAdditionalReport 
                          key={`addition_${expertIndex}_${index}`}
                          conversationId={conversationId}
                          expertIndex={expertIndex}
                        />;
                }
                else return <MoleculeAdditionalKeyword/>;
              }
            return null;
          })}
          {conversationStage !== 1 && <OrganismBizExpertSelect />}
          </div>

          <OrganismRightSideBar />
        </MainContent>
      </ContentsWrap>
      <OrganismSearchBottomBar onSearch={handleSearch} />
    </>
  );
};

export default PageExpertInsight;

const MainContent = styled.div`
  position:relative;
  top:40px;
  grid-area: content;
  display:flex;
  flex-direction:row;
  gap:40px;
  min-width: 1px;
  // max-width: 1240px;
  max-width:1484px;
  width:calc(100% - 40px);
  padding-bottom: 150px;
  margin: 0 auto;

  > div:first-child {
    max-width:1240px;
    width:100%;
    margin:0 40px;
  }
`;

const ContentsWrap = styled.div`
  position: relative;
  display:flex;
`;
