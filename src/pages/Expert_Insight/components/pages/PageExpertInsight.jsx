import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  SAVED_CONVERSATIONS,
  IS_CLICK_EXPERT_SELECT,
} from '../../../AtomStates';

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
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [savedConversations, setSavedConversations] = useAtom(SAVED_CONVERSATIONS);
  const [isClickExpertSelect, setIsClickExpertSelect] = useAtom(IS_CLICK_EXPERT_SELECT);

  // conversationId가 처음 설정되었을 때 URL을 업데이트하거나 기존 대화 불러오기
  useEffect(() => {
    if (!paramConversationId) {
      navigate(`/conversation/${conversationId}`, { replace: true });
    } else {
      const savedConversation = savedConversations[conversationId];
      if (savedConversation) {
        setConversation(savedConversation.conversation);
        setConversationStage(savedConversation.conversationStage);
        setInputBusinessInfo(savedConversation.inputBusinessInfo);
        setTitleOfBusinessInfo(savedConversation.titleOfBusinessInfo);
      } else {
        // 만약 기존 대화가 없다면 초기 시스템 메시지를 추가
        if (selectedExpertIndex) {
          const initialMessage = getInitialSystemMessage();
          setConversation([{ type: 'system', message: initialMessage }]);
        }
      }
    }
  }, [paramConversationId, conversationId, navigate, savedConversations, selectedExpertIndex]);

  // 뒤로가기를 눌렀을 때 특정 페이지로 이동하도록 설정
  useEffect(() => {
    const handlePopState = () => {
      navigate('/PageMeetAiExpert'); // 특정 페이지로 리다이렉트
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleSearch = (inputValue) => {
    const updatedConversation = [
      ...conversation,
      { type: 'user', message: inputValue },
    ];

    if (conversationStage === 1) {
      setInputBusinessInfo(inputValue); // 사용자가 입력한 값을 inputBusinessInfo로 설정
      updatedConversation.push(
        { type: 'system', message: `${inputValue}를 바탕으로 분석을 진행하겠습니다.` },
        { type: 'analysis' },
        { type: 'system', message: `${inputValue}에 대한 리포트 입니다. 추가로 궁금하신 부분이 있다면 질문해주세요.` }
      );
      setConversationStage(2);  // Stage를 2로 설정
    } else if (conversationStage === 2) {
      updatedConversation.push(
        { type: 'system', message: '리포트를 바탕으로 전략 보고서를 작성하겠습니다.' },
        { type: 'strategy' },
        { type: 'system', message: '전략 보고서를 기반으로 추가적인 질문을 해주세요.' },
      );
      setConversationStage(3);  // Stage를 3으로 설정
    } else if (conversationStage === 3) {
      updatedConversation.push(
        { type: 'system', message: '해당 질문에 대한 답변을 준비 중입니다.' }
      );
    }

    // 대화 상태를 저장하고 저장된 대화들에 추가
    setConversation(updatedConversation);

    const updatedConversations = {
      ...savedConversations,
      [conversationId]: {
        conversation: updatedConversation,
        conversationStage: conversationStage + 1,  // 다음 단계로 설정
        inputBusinessInfo, // 이 값을 저장하여 이후에도 참조 가능하도록 함
        titleOfBusinessInfo,
      },
    };

    setSavedConversations(updatedConversations);
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
      {selectedExpertIndex !== 0 ? <OrganismTakingChargeAiExpert/> : ''}

      <OrganismHeader />
    
      <ContentsWrap>
        <OrganismLeftSideBar />
        <OrganismRightSideBar />

        <MainContent>
          {/* Biz Name Section */}
          <MoleculeBizName bizName={inputBusinessInfo}/>

          {/* 대화 내용 누적 출력 */}
          {conversation.map((item, index) => {
            if (item.type === 'user') {
              return <MoleculeUserMessage key={index} message={item.message} />;
            } else if (item.type === 'system') {
              return <MoleculeSystemMessage key={index} message={item.message} />;
            } else if (item.type === 'analysis') {
              return <OrganismBizAnalysisSection key={index} />;
            }
            return null;
          })}

          {/* 전략 보고서 섹션 */}
          {isClickExpertSelect && <OrganismStrategyReportSection />}

          {/* 전문가 선택 섹션 */}
          <OrganismBizExpertSelect />
        </MainContent>
      </ContentsWrap>
      <OrganismSearchBottomBar onSearch={handleSearch} />
    </>
  );
};

export default PageExpertInsight;

const MainContent = styled.div`
  grid-area:content;
  min-width:1px;
  max-width:1135px;
  padding-bottom:150px;
  margin:0 auto;
`;

const ContentsWrap = styled.div`
  position:relative;
  width:calc(100% - 45px);
  // display:grid;
  // grid-template-rows:auto 1fr;
  // grid-template-columns:1fr 4fr;
  // grid-template-areas:"toc content";
  // gap:40px;
  margin:150px auto 0;
  padding-left:380px;
  padding-right:380px;
`;