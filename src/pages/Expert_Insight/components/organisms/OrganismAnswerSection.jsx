import React, { useState } from 'react';
import styled from 'styled-components';
import OrganismAnswerReportSection from './OrganismAnswerReportSection';

const OrganismAnswerSection = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    '브랜드 관리 및 마케팅 전략',
    '마케팅 자동화 및 최적화',
    'SEO 및 웹 마케팅',
    '데이터 분석 및 전략 수립',
    '시장 및 경쟁 분석'
  ];

  return (
    <AnswerSectionContainer>
      <h2>관심 있는 주제를 선택해주세요:</h2>
      <TopicList>
        {topics.map((topic, index) => (
          <TopicItem key={index} onClick={() => setSelectedTopic(topic)}>
            {topic}
          </TopicItem>
        ))}
      </TopicList>

      {selectedTopic && (
        <OrganismAnswerReportSection selectedTopic={selectedTopic} />
      )}
    </AnswerSectionContainer>
  );
};

export default OrganismAnswerSection;

const AnswerSectionContainer = styled.div`
  margin-top: 20px;
`;

const TopicList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TopicItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  background-color: #e0f7fa;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #b2ebf2;
  }
`;
