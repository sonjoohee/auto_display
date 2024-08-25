import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
} from '../../../AtomStates';

import OrganismHeader from '../../../organisms/OrganismHeader';
import OrganismSideBar from '../organisms/OrganismSideBar';
import OrganismRightSideBar from '../organisms/OrganismRightSideBar';
import OrganismBizAnalysisSection from '../organisms/OrganismBizAnalysisSection';
import OrganismSearchBottomBar from '../organisms/OrganismSearchBottomBar';
import MoleculeBizName from '../molecules/MoleculeBizName';
import MoleculeSystemMessage from '../molecules/MoleculeSystemMessage';
import OrganismBizExpertSelect from '../organisms/OrganismBizExpertSelect';
import MoleculeUserMessage from '../molecules/MoleculeUserMessage';
import OrganismTakingChargeAiExpert from '../organisms/OrganismTakingChargeAiExpert';

const PageExpertInsight = () => {
  const [conversation, setConversation] = useState([]); // 대화 내용 누적
  const [conversationStage, setConversationStage] = useState(1); // 대화 단계 관리
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);

  useEffect(() => {
    // 초기 시스템 메시지를 대화에 추가
    const initialMessage = getInitialSystemMessage();
    setConversation([{ type: 'system', message: initialMessage }]);
  }, [selectedExpertIndex]);

  const handleSearch = (inputValue) => {
    setConversation((prev) => [...prev, { type: 'user', message: inputValue }]);
  
    if (conversationStage === 1) {
      setInputBusinessInfo(inputValue); // 비즈니스 정보 업데이트
      // setTitleOfBusinessInfo(inputValue); // 비즈니스 제목 업데이트
      setConversation((prev) => [
        ...prev,
        { type: 'system', message: `${inputValue}를 바탕으로 분석을 진행하겠습니다.` },
        { type: 'analysis' },
      ]);
      setConversationStage(2);
    } else if (conversationStage === 2 && inputBusinessInfo) {
      setConversation((prev) => [
        ...prev,
        { type: 'system', message: `${titleOfBusinessInfo}에 대한 리포트 입니다. 추가로 궁금하신 부분이 있다면 질문해주세요.` },
      ]);
      setConversationStage(3);
    } else if (conversationStage === 3) {
      setConversation((prev) => [
        ...prev,
        { type: 'system', message: '해당 질문에 대한 답변을 준비 중입니다.' },
      ]);
    }
  };
  

  useEffect(() => {
    // OrganismBizAnalysisSection이 추가된 후에 새로운 시스템 메시지를 추가
    if (conversationStage === 2 && titleOfBusinessInfo) {
      setConversation((prev) => [
        ...prev,
        {
          type: 'system',
          message: `${titleOfBusinessInfo}에 대한 리포트 입니다. 추가로 궁금하신 부분이 있다면 질문해주세요.`,
        },
      ]);
    }
  }, [conversationStage, titleOfBusinessInfo]);

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
      <OrganismHeader />
      <OrganismSideBar />
      <OrganismRightSideBar />

      {/* 전문가가 선택된 경우 */}
      {selectedExpertIndex !== 0 && <OrganismTakingChargeAiExpert />}

      {/* Biz Name Section */}
      <MoleculeBizName bizName={inputBusinessInfo} />

      <MainContent>
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

        {/* 전문가 선택 섹션 */}
        <OrganismBizExpertSelect />
      </MainContent>

      <OrganismSearchBottomBar onSearch={handleSearch} />
    </>
  );
};

export default PageExpertInsight;

const MainContent = styled.div`
  margin-left: 240px;
  margin-right: 240px;
  padding: 200px 20px 20px;
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
