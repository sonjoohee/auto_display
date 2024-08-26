// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismStrategyReportSection.jsx

import React from 'react';
import styled from 'styled-components';

const OrganismStrategyReportSection = () => {
  return (
    <StrategyReportContainer>
      <h2>전략 보고서</h2>
      <p>이곳에 전략 보고서의 내용을 작성합니다.</p>
      {/* 추가적인 보고서 내용 */}
    </StrategyReportContainer>
  );
};

export default OrganismStrategyReportSection;

const StrategyReportContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
