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
import OrganismTakingChargeAiExpert from '../organisms/OrganismTakingChargeAiExpert';

const PageExpertInsight = () => {
  const navigate = useNavigate();
  const { conversationId: paramConversationId } = useParams();
  const conversationId = paramConversationId || nanoid();
  const [conversation, setConversation] = useState([]);
  const [conversationStage, setConversationStage] = useState(1);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);  // 추가
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);  // 추가
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [isClickExpertSelect, setIsClickExpertSelect] = useAtom(IS_CLICK_EXPERT_SELECT);
  const [sections, setSections] = useState([]);
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
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
  
          // strategyReportData에서 데이터를 복원
          const strategyData = savedConversation.strategyReportData || {};
          if (strategyData.tabs) {
            // sample.json의 구조를 그대로 사용하고 있기 때문에, 탭과 섹션을 관리하는 상태에 맞춰 데이터를 복원합니다.
            setSections(strategyData.tabs);
          }
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
    selectedExpertIndex, 
    setInputBusinessInfo, 
    setTitleOfBusinessInfo, 
    setMainFeaturesOfBusinessInformation, 
    setMainCharacteristicOfBusinessInformation, 
    setBusinessInformationTargetCustomer,
    setSections // 추가된 부분
  ]);

  // 검색을 통해 들어왔으면 handleSearch 실행
  useEffect(() => {
    if(inputBusinessInfo) handleSearch(-1);
  },[])
  
  const handleSearch = (inputValue) => {
  
    const updatedConversation = [...conversation];

    if (inputValue !== -1) { 
      updatedConversation.push({ type: 'user', message: inputValue }); 
    }

    if (conversationStage === 1) {
      // setInputBusinessInfo(inputValue);
      updatedConversation.push(
        { type: 'system', message: `아이디어를 입력해 주셔서 감사합니다!\n지금부터 아이디어를 세분화하여 주요한 특징과 목표 고객을 파악해보겠습니다 🙌🏻` },
        { type: 'analysis' },
      );
      setConversationStage(2);
    } else if (conversationStage === 2) {
      updatedConversation.push(
        { type: 'system', message: '리포트를 바탕으로 전략 보고서를 작성하겠습니다.' },
        { type: 'strategy' },
        { type: 'system', message: '전략 보고서를 기반으로 추가적인 질문을 해주세요.' },
      );
      setConversationStage(3);
    } else if (conversationStage === 3) {
      updatedConversation.push(
        { type: 'system', message: '해당 질문에 대한 답변을 준비 중입니다.' }
      );
    }

    setConversation(updatedConversation);

    // 대화 내역을 IndexedDB에 저장
    saveConversationToIndexedDB({
      id: conversationId,
      conversation: updatedConversation,
      conversationStage: conversationStage + 1,
      inputBusinessInfo,
      analysisReportData,
      timestamp: Date.now(),
    });
  };

  const getInitialSystemMessage = () => {
    switch (selectedExpertIndex) {
      case 1:
        return '안녕하세요, 저는 서비스/프로덕트 전략가입니다. 비즈니스(아이디어)를 입력해주세요.';
      case 2:
        return '안녕하세요, 저는 마케팅 구축 전문가입니다. 비즈니스(아이디어)를 입력해주세요.';
      case 3:
        return '안녕하세요, 저는 고객 인사이트 전문가입니다. 비즈니스(아이디어)를 입력해주세요.';
      default:
        return '비즈니스(아이디어)를 입력해주세요.';
    }
  };

  return (
      <>
        {selectedExpertIndex !== 0 && <OrganismTakingChargeAiExpert />}

        <OrganismHeader />
      
        <ContentsWrap>
          <OrganismLeftSideBar />
          <OrganismRightSideBar />
          {/* <OrganismSideBar /> */}

          <MainContent>
            <MoleculeBizName bizName={inputBusinessInfo} />

            {conversation.map((item, index) => {
              if (item.type === 'user') {
                return <MoleculeUserMessage key={index} message={item.message} />;
              } else if (item.type === 'system') {
                return <MoleculeSystemMessage key={index} message={item.message} />;
              } else if (item.type === 'analysis') {
                return <OrganismBizAnalysisSection conversationId={conversationId} />;
              } else if (item.type === 'strategy') {
                return <OrganismStrategyReportSection conversationId={conversationId} />;
              }
              return null;
            })}
            {/* 전략 보고서 섹션 */}
            {isClickExpertSelect && <OrganismStrategyReportSection />}
            <OrganismBizExpertSelect />
          </MainContent>
        </ContentsWrap>

        <OrganismSearchBottomBar onSearch={handleSearch} />
    </>
  );
};

export default PageExpertInsight;

const MainContent = styled.div`
  grid-area: content;
  min-width: 1px;
  max-width: 1135px;
  padding-bottom: 150px;
  margin: 0 auto;
`;

const ContentsWrap = styled.div`
  position: relative;
  width: calc(100% - 45px);
  margin: 150px auto 0;
  padding-left: 380px;
  padding-right: 380px;
`;
