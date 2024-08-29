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
  const [approachPath] = useAtom(APPROACH_PATH);
  

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
    // selectedExpertIndex,
    setInputBusinessInfo, 
    setTitleOfBusinessInfo, 
    setMainFeaturesOfBusinessInformation, 
    setMainCharacteristicOfBusinessInformation, 
    setBusinessInformationTargetCustomer,
    setSections // 추가된 부분
  ]);

  // 검색을 통해 들어왔으면 handleSearch 실행
  useEffect(() => {
    if(approachPath === -1) handleSearch(-1);
  },[])

  useEffect(() => {
    if(approachPath) handleSearch(-1);
  },[selectedExpertIndex])
  
  const handleSearch = (inputValue) => {
  
    const updatedConversation = [...conversation];

    if (inputValue !== -1) { 
      updatedConversation.push({ type: 'user', message: inputValue }); 
    }

    if (conversationStage === 1) {
      if(!approachPath) {
        updatedConversation.push(
          { type: 'strategy' },
          { type: 'system', message: '리포트 내용을 보시고 추가로 궁금한 점이 있나요? 아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊'},
        );
      }
      else {
        // setInputBusinessInfo(inputValue);
        updatedConversation.push(
          { type: 'system', message: `아이디어를 입력해 주셔서 감사합니다!\n지금부터 아이디어를 세분화하여 주요한 특징과 목표 고객을 파악해보겠습니다 🙌🏻`},
          { type: 'analysis' },
        );
      }
      setConversationStage(2);
    } else if (conversationStage === 2) {
        updatedConversation.push(
          { type: 'user', message: '10년차 전략 디렉터와 1:1 커피챗, 지금 바로 시작하겠습니다 🙌🏻' },
          { type: 'system', message: `안녕하세요, 김도원입니다! ${titleOfBusinessInfo}을 구체화하는 데 도움이 될 전략 보고서를 준비했습니다.\n함께 전략을 다듬어 보시죠! 📊"`},
          { type: 'strategy' },
          { type: 'system', message: '리포트 내용을 보시고 추가로 궁금한 점이 있나요? 아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊'},
        );
    //   setConversationStage(3);
    // } else if (conversationStage === 3) {
    //   updatedConversation.push(
    //     { type: 'system', message: '해당 질문에 대한 답변을 준비 중입니다.' }
    //   );
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

        <OrganismHeader />
      
        <ContentsWrap>
          <OrganismLeftSideBar />
          <OrganismRightSideBar />
          {/* <OrganismSideBar /> */}

          <MainContent>
            <MoleculeBizName bizName={titleOfBusinessInfo} />

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
            {/* {isClickExpertSelect && <OrganismStrategyReportSection conversationId={conversationId} />} */}
            {conversationStage !== 1 && <OrganismBizExpertSelect />}
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
