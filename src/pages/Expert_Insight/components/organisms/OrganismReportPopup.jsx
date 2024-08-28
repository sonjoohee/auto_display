import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';

const OrganismReportPopup = ({ report, onClose }) => {
  if (!report) return null;

  const reportIndex = report.reportIndex !== undefined
    ? report.reportIndex
    : report.type === 'strategy'
    ? 1
    : 0;

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <h1>{report.title}</h1>
        <p>{report.date}</p>

        {reportIndex === 0 && <BizAnalysisSection report={report} />}
        {reportIndex === 1 && <StrategyReportSection report={report} />}

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
  const [selectedTab, setSelectedTab] = useState(0);

  // 탭 제목과 섹션 데이터를 report에서 가져옵니다.
  const tabs = report.content.tabs || [];

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <>
      <TabHeader>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            active={selectedTab === index}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </TabButton>
        ))}
      </TabHeader>

      {tabs[selectedTab]?.sections?.map((section, index) => (
        <BoxWrap key={index}>
          {section.title && <SectionTitle>{section.title}</SectionTitle>}
          {section.content && (
            section.content.some((item) => item.subTitle) ? (
              <TwoColumnGrid>
                {section.content.map((item, idx) => (
                  <div key={idx}>
                    {item.subTitle && <SubTitle>{item.subTitle}</SubTitle>}
                    <p>{item.text}</p>
                  </div>
                ))}
              </TwoColumnGrid>
            ) : (
              <List>
                {section.content.map((item, idx) => (
                  <ListItem key={idx}>{item.text}</ListItem>
                ))}
              </List>
            )
          )}
        </BoxWrap>
      ))}
    </>
  );
};

const TabHeader = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#000' : '#666')};
  background: ${(props) => (props.active ? '#fff' : '#f7f7f7')};
  border: none;
  border-bottom: ${(props) => (props.active ? `2px solid #000` : 'none')};
  cursor: pointer;

  &:hover {
    background: #fff;
    color: #000;
  }

  &:focus {
    outline: none;
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  margin-top: 10px;

  strong {
    font-weight: 500;
  }

  p {
    margin: 0;
  }
`;

const SubTitle = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 8px;
`;
