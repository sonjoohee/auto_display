import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import OrganismOneInterview from '../organisms/OrganismOneInterview';
import {
  BUSINESS_ANALYSIS,
  SELECTED_INTERVIEW_PURPOSE,
  PERSONA_LIST,
} from '../../../AtomStates';

const Test = () => {
  const navigate = useNavigate();
  const [, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
  const [, setSelectedInterviewPurpose] = useAtom(SELECTED_INTERVIEW_PURPOSE);
  const [, setPersonaList] = useAtom(PERSONA_LIST);

  useEffect(() => {
    // 테스트용 데이터로 atom 초기화
    setBusinessAnalysis({
      title: "테스트 프로젝트",
      input: "테스트 비즈니스 아이디어",
    });
    setSelectedInterviewPurpose("서비스 개선");
    setPersonaList({
      selected: [{
        personaImg: "1",
        persona: "테스트 페르소나",
        profile: "[age: 28, gender: 여성, job: 디자이너]",
      }]
    });
  }, []);

  return (
    <OrganismOneInterview 
      isActive={true}
      onClose={() => navigate('/')}
    />
  );
};

export default Test;
