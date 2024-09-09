import React from "react";
import styled from "styled-components";

const OrganismAnswerReportSection = ({ selectedTopic }) => {
  // 임시로 대체 데이터를 사용
  const getReportContent = () => {
    switch (selectedTopic) {
      case "브랜드 관리 및 마케팅 전략":
        return "브랜드 관리 및 마케팅 전략에 대한 보고서입니다...";
      case "마케팅 자동화 및 최적화":
        return "마케팅 자동화 및 최적화에 대한 보고서입니다...";
      case "SEO 및 웹 마케팅":
        return "SEO 및 웹 마케팅에 대한 보고서입니다...";
      case "데이터 분석 및 전략 수립":
        return "데이터 분석 및 전략 수립에 대한 보고서입니다...";
      case "시장 및 경쟁 분석":
        return "시장 및 경쟁 분석에 대한 보고서입니다...";
      default:
        return "선택된 주제에 대한 보고서를 준비 중입니다...";
    }
  };

  return (
    <ReportSectionContainer>
      <h3>{selectedTopic}</h3>
      <p>{getReportContent()}</p>
    </ReportSectionContainer>
  );
};

export default OrganismAnswerReportSection;

const ReportSectionContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
`;
