import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import ReactDOM from 'react-dom';

const OrganismReportPopup = ({ report, onClose }) => {
  if (!report) return null;

  const reportIndex = report.reportIndex !== undefined
    ? report.reportIndex
    : report.type === 'strategy'
    ? 1
    : 0;

  return ReactDOM.createPortal(
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <div className="title">
          <h1>{report.title}</h1>
          <p>
            <span>마케팅</span>
            <span>생성 : {report.date}</span>
            <span>저장 : {report.date}</span>
          </p>
        </div>

        {reportIndex === 0 && (
          <BizAnalysisSection report={report} />
        )}

        {reportIndex === 1 && (
          <StrategyReportSection report={report} />
        )}

        {reportIndex === 2 && (
          <AdditionalReportSection report={report} />
        )}

        <CloseButton onClick={onClose}>닫기</CloseButton>
      </PopupContent>
    </PopupOverlay>,
    document.body  // 팝업을 document.body 아래에 렌더링
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
  z-index: 10000;
`;

const PopupContent = styled.div`
  position:relative;
  max-width: 1200px;
  width: 100%;
  max-height: 80%;
  display:flex;
  flex-direction:column;
  gap:20px;
  text-align: left;
  padding: 32px;
  border-radius: 15px;
  background:${palette.white};
  z-index: 10001;

  .title {
    display:flex;
    flex-direction:column;
    gap:12px;
    padding:20px;
    margin-bottom:40px;
    border-radius:15px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};
    box-shadow:0 4px 20px rgba(0,0,0,.05);
  }

  h1 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    font-size: 0.75rem;
    color:${palette.gray};
    display:flex;
    align-items:center;
    gap:20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 12px;
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
  position:absolute;
  right:0;
  top:-40px;
  font-family: 'Pretendard';
  font-size:1rem;
  color:${palette.white};
  padding:5px 26px 5px 0;
  border:0;
  outline:none;
  background:none;
  cursor:pointer;

  &:before, &:after {
    position:absolute;
    top:50%;
    right:6px;
    width:2px;
    height:18px;
    border-radius:5px;
    background:${palette.white};
    content:'';
  }

  &:before {
    transform:translateY(-50%) rotate(45deg);
  }

  &:after {
    transform:translateY(-50%) rotate(-45deg);
  }
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
    font-size:0.88rem;
    font-size:400;
    color:${palette.darkGray};
    line-height:1.5;
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
      <ContentsWrap>
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
                      {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
                    </div>
                  ))}
                </TwoColumnGrid>
              ) : (
                section.content.map((item, idx) => (
                  <div key={idx}>
                    <p>{item.text}</p>
                    {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
                  </div>
                ))
              )
            )}
          </BoxWrap>
        ))}
      </ContentsWrap>
    </>
  );
};

// 스타일 컴포넌트들
const ContentsWrap = styled.div`
  padding:28px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};
  overflow-y:auto;
`;

const TabHeader = styled.div`
  display: flex;
  align-items:center;
  gap:40px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  font-family: 'Pretendard';
  font-size: 1.25rem;
  font-weight: ${(props) => (props.active ? '500' : '400')};
  color: ${(props) => (props.active ? `${palette.black}` : 'rgba(0,0,0,.2)')};
  border: none;
  outline: none;
  border-bottom: ${(props) => (props.active ? `1px solid ${palette.black}` : 'none')};
  background:${palette.white};
  cursor: pointer;
  transition:all .5s;

  &:hover {
    color: ${palette.black};
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 10px;

  > div {
    padding:12px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};
  }
`;

const SubTitle = styled.div`
  font-size: 0.88rem;
  color:${palette.gray};
  margin-bottom:5px;
`;

const SubTextBox = styled.div`
  background: white;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.85rem;
  color: #666;
`;

const AdditionalReportSection = ({ report }) => {
  return (
    <BoxWrap>
      {report.content.title && (
        <SectionTitle>{report.content.title}</SectionTitle>
      )}
      <List>
        {report.content.content.map((item, index) => (
          <ListItem key={index}>{item.text}</ListItem>
        ))}
      </List>
    </BoxWrap>
  );
};