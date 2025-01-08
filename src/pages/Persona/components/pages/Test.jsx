import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrganismOneInterview from '../organisms/OrganismOneInterview';

const Test = () => {
  const navigate = useNavigate();

  // 테스트용 초기 데이터 설정
  const mockData = {
    businessAnalysis: {
      title: "테스트 프로젝트",
      input: "테스트 비즈니스 아이디어",
    },
    selectedInterviewPurpose: "서비스 개선",
    personaList: {
      selected: [{
        personaImg: "1", // 실제 이미지 경로에 맞게 수정
        persona: "테스트 페르소나",
        profile: "[age: 28, gender: 여성, job: 디자이너]",
      }]
    }
  };

  return (
    <OrganismOneInterview 
      isActive={true}
      onClose={() => navigate('/')}
      testData={mockData} // 테스트용 데이터 전달
    />
  );
};

export default Test;
