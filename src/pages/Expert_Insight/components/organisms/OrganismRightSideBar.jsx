// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismRightSideBar.jsx

import React from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { SELECTED_EXPERT_INDEX } from '../../../AtomStates';

const experts = [
  {
    id: 1,
    title: '서비스/프로덕트 전략가',
    description: '10년 경력 시장에서 통하는 전략을 확인해보세요',
    details: '서비스와 프로덕트에 대한 깊이 있는 전략을 제시합니다. 다양한 성공 사례를 통해 실질적인 인사이트를 제공합니다.',
  },
  {
    id: 2,
    title: '마케팅 구축',
    description: '브랜드/마케팅 교수와의 컨설팅 미팅',
    details: '브랜드 구축과 마케팅 전략에 대한 깊이 있는 이해를 바탕으로 스타트업의 성장 로드맵을 제시합니다.',
  },
  {
    id: 3,
    title: '고객 인사이트 전문가',
    description: '고객 이탈 극복 노하우 비즈니스 팁을 공유해요',
    details: '고객 분석을 통해 비즈니스의 핵심 문제를 파악하고 이를 해결할 수 있는 전략을 제안합니다.',
  },
];

const OrganismRightSideBar = () => {
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);

  const selectedExpert = experts.find((expert) => expert.id === selectedExpertIndex);

  if (!selectedExpert) return null; // 선택된 전문가가 없을 경우 아무것도 표시하지 않음

  return (
    <RightSideBarContainer>
      <ProfileTitle>{selectedExpert.title}</ProfileTitle>
      <ProfileDescription>{selectedExpert.description}</ProfileDescription>
      <ProfileDetails>{selectedExpert.details}</ProfileDetails>
    </RightSideBarContainer>
  );
};

export default OrganismRightSideBar;

const RightSideBarContainer = styled.div`
  position: fixed;
  top: 110px; /* 헤더 바로 아래 */
  right: 0;
  width: 240px;
  height: calc(100% - 110px); /* 헤더를 제외한 전체 높이 */
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 98;
`;

const ProfileTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProfileDescription = styled.p`
  font-size: 0.88rem;
  margin-bottom: 15px;
`;

const ProfileDetails = styled.p`
  font-size: 0.75rem;
  color: #666;
`;
