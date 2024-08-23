import React from 'react';
import styled from 'styled-components';

const OrganismBizAnalysisSection = () => {
  return (
    <BizAnalysisContainer>
      <ContentBox>
        {/* 여기에 필요한 콘텐츠를 추가하세요 */}
        <PlaceholderText>여기에 비즈니스 분석 내용이 표시됩니다.</PlaceholderText>
      </ContentBox>
    </BizAnalysisContainer>
  );
};

export default OrganismBizAnalysisSection;

const BizAnalysisContainer = styled.div`
  width: 100%;
  padding: 40px 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  margin-bottom: 30px; /* 아래 요소와의 간격 */
`;

const ContentBox = styled.div`
  border: 2px solid #ccc; /* 테두리 색상 */
  padding: 30px;
  border-radius: 12px;
  background-color: #f9f9f9;
`;

const PlaceholderText = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
  text-align: center;
`;
