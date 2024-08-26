// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismTakingChargeAiExpert.jsx

import React from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { SELECTED_EXPERT_INDEX } from '../../../AtomStates';

const experts = [
  {
    id: 1,
    title: '서비스/프로덕트 전략가',
    description: '10년 경력 시장에서 통하는 전략을 확인해보세요',
  },
  {
    id: 2,
    title: '마케팅 구축',
    description: '브랜드/마케팅 교수와의 컨설팅 미팅',
  },
  {
    id: 3,
    title: '고객 인사이트 전문가',
    description: '고객 이탈 극복 노하우 비즈니스 팁을 공유해요',
  },
];

const OrganismTakingChargeAiExpert = () => {
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);

  const selectedExpert = experts.find((expert) => expert.id === selectedExpertIndex);

  if (!selectedExpert) return null; // 선택된 전문가가 없을 경우 아무것도 표시하지 않음

  return (
    <ExpertContainer>
      <ExpertTitle>{selectedExpert.title}</ExpertTitle>
      <ExpertDescription>{selectedExpert.description}</ExpertDescription>
    </ExpertContainer>
  );
};

export default OrganismTakingChargeAiExpert;

const ExpertContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #e0e0e0;
  border-bottom: 1px solid #ccc;
`;

const ExpertTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const ExpertDescription = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #555;
`;
