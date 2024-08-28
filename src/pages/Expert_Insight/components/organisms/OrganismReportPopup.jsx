import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';

const OrganismReportPopup = ({ report, onClose }) => {
  if (!report) return null;

  const reportIndex = report.reportIndex !== undefined
    ? report.reportIndex
    : report.type === 'strategy'
    ? 1
    : 0; // 예를 들어 type이 strategy면 1, 아니면 0으로 가정

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <h1>{report.title}</h1>
        <p>{report.date}</p>

        {reportIndex === 0 && (
          <BizAnalysisSection report={report} />
        )}

        {reportIndex === 1 && (
          <StrategyReportSection report={report} />
        )}

        <CloseButton onClick={onClose}>닫기</CloseButton>
      </PopupContent>
    </PopupOverlay>
  );
};
export default OrganismReportPopup;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  max-width: 800px;
  max-height: 80%;
  width: 90%;
  overflow-y: auto;
  text-align: left;
  border: 1px solid ${palette.lineGray};

  h1 {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 20px;
  }

  p {
    font-size: 0.88rem;
    line-height: 1.5;
    margin-top: 30px;

    span {
      color: ${palette.red};
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const List = styled.ul`
  padding-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  font-size: 0.88rem;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const BoxWrap = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);
  margin-top: 12px;

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  li {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-left: 10px;

    &:before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 1px;
      background: ${palette.black};
      content: '';
    }

    + li {
      margin-top: 5px;
    }
  }

  p {
    font-size: 0.88rem;
  }

  button {
    flex-shrink: 0;
    font-family: 'Pretendard';
    font-size: 0.75rem;
    color: ${palette.gray};
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid ${palette.lineGray};
    background: ${palette.white};

    &.add {
      color: ${palette.white};
      border: 1px solid ${palette.black};
      background: ${palette.black};
    }
  }
`;

const BizAnalysisSection = ({ report }) => {
  const mainFeatures = report.content.mainFeatures || [];
  const mainCharacter = report.content.mainCharacter || [];
  const mainCustomer = report.content.mainCustomer || [];

  return (
    <BoxWrap>
      <SectionTitle>주요 특징</SectionTitle>
      <List>
        {mainFeatures.map((feature, index) => (
          <ListItem key={index}>{feature}</ListItem>
        ))}
      </List>
      <SectionTitle>주요 기능</SectionTitle>
      <List>
        {mainCharacter.map((func, index) => (
          <ListItem key={index}>{func}</ListItem>
        ))}
      </List>
      <SectionTitle>목표 고객</SectionTitle>
      <List>
        {mainCustomer.map((customer, index) => (
          <ListItem key={index}>{customer}</ListItem>
        ))}
      </List>
    </BoxWrap>
  );
};

const StrategyReportSection = ({ report }) => {
  const strategyCustomerNeeds = report.content.strategyCustomerNeeds || {};
  const strategyCustomerBenefits = report.content.strategyCustomerBenefits || {};
  const strategyCompetitionDifferentiation = report.content.strategyCompetitionDifferentiation || {};

  return (
    <BoxWrap>
      <SectionTitle>해결할 문제와 고객 니즈</SectionTitle>
      <List>
        {Object.keys(strategyCustomerNeeds).map((key, index) => (
          <ListItem key={index}>{strategyCustomerNeeds[key]}</ListItem>
        ))}
      </List>
      <SectionTitle>고객 주요 혜택</SectionTitle>
      <List>
        {Object.keys(strategyCustomerBenefits).map((key, index) => (
          <ListItem key={index}>
            {Array.isArray(strategyCustomerBenefits[key])
              ? strategyCustomerBenefits[key].join(', ')
              : strategyCustomerBenefits[key]}
          </ListItem>
        ))}
      </List>
      <SectionTitle>경쟁 차별화 전략</SectionTitle>
      <List>
        {Object.keys(strategyCompetitionDifferentiation).map((key, index) => (
          <ListItem key={index}>
            {Array.isArray(strategyCompetitionDifferentiation[key])
              ? strategyCompetitionDifferentiation[key].join(', ')
              : strategyCompetitionDifferentiation[key]}
          </ListItem>
        ))}
      </List>
    </BoxWrap>
  );
};
