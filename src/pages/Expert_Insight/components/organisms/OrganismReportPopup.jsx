import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import ReactDOM from "react-dom";

import images from "../../../../assets/styles/Images";

const OrganismReportPopup = ({ report, onClose }) => {
  if (!report) return null;

  const reportIndex =
    report.reportIndex !== undefined
      ? report.reportIndex
      : report.type === "strategy"
      ? 1
      : 0;
  let reportTypeText;
  {
    reportIndex === 0 && (reportTypeText = "비즈니스 분석");
  }

  {
    reportIndex === 1 && (reportTypeText = "전문가 보고서");
  }

  {
    reportIndex === 2 && (reportTypeText = "추가 보고서");
  }

  return ReactDOM.createPortal(
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <div className="title">
          <h1>{report.title}</h1>
          <p>
            <span>
              <img src={images.IconList} alt="" />
              {reportTypeText}
            </span>
            {/* <span>생성 : {report.date}</span> */}
            <span>
              <img src={images.IconSaveDate} alt="" />
              저장 : {report.date}
            </span>
          </p>
        </div>

        {reportIndex === 0 && <BizAnalysisSection report={report} />}

        {reportIndex === 1 && <StrategyReportSection report={report} />}

        {reportIndex === 2 && <AdditionalReportSection report={report} />}

        <CloseButton onClick={onClose}>닫기</CloseButton>
      </PopupContent>
    </PopupOverlay>,
    document.body // 팝업을 document.body 아래에 렌더링
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
  position: relative;
  max-width: 1200px;
  width: 100%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  gap: 44px;
  text-align: left;
  padding: 32px;
  border-radius: 15px;
  background: ${palette.white};
  z-index: 10001;

  .title {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 20px;
    border-radius: 15px;
    border: 1px solid ${palette.lineGray};
    background: ${palette.white};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }

  h1 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    font-size: 0.75rem;
    color: ${palette.gray};
    display: flex;
    align-items: center;
    gap: 20px;

    span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const List = styled.ul`
  // padding-left: 20px;
  // margin-bottom: 20px;
`;

const ListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 10px;

  &:before {
    position: absolute;
    left: 0;
    top: 10px;
    width: 5px;
    height: 1px;
    background: ${palette.darkGray};
    content: "";
  }

  p {
    font-size: 0.875rem;
    color: ${palette.darkGray};
    line-height: 1.5;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: -40px;
  font-family: "Pretendard";
  font-size: 1rem;
  color: ${palette.white};
  padding: 5px 26px 5px 0;
  border: 0;
  outline: none;
  background: none;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    top: 50%;
    right: 6px;
    width: 2px;
    height: 18px;
    border-radius: 5px;
    background: ${palette.white};
    content: "";
  }

  &:before {
    transform: translateY(-50%) rotate(45deg);
  }

  &:after {
    transform: translateY(-50%) rotate(-45deg);
  }
`;

const BoxWrap = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);

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

    + li {
      margin-top: 5px;
    }
  }

  button {
    flex-shrink: 0;
    font-family: "Pretendard";
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

  p {
    font-size: 0.875rem;
    color: ${palette.darkGray};
    line-height: 1.5;
  }
`;

const BizAnalysisSection = ({ report }) => {
  const mainFeatures = report.content.mainFeatures || [];
  const mainCharacter = report.content.mainCharacter || [];
  const mainCustomer = report.content.mainCustomer || [];

  return (
    <>
      <ContentsWrap>
        <h1>{report.title}</h1>
        <BoxWrap>
          <SectionTitle>
            <img src={images.StarChack} alt="" />
            주요 특징
          </SectionTitle>
          <List>
            {mainFeatures.map((feature, index) => (
              <ListItem key={index}>
                <p>{feature}</p>
              </ListItem>
            ))}
          </List>
        </BoxWrap>
        <BoxWrap>
          <SectionTitle>
            <img src={images.IconSetting} alt="" />
            주요 기능
          </SectionTitle>
          <List>
            {mainCharacter.map((func, index) => (
              <ListItem key={index}>
                <p>{func}</p>
              </ListItem>
            ))}
          </List>
        </BoxWrap>
        <BoxWrap>
          <SectionTitle>
            <img src={images.IconTarget} alt="" />
            목표 고객
          </SectionTitle>
          <List>
            {mainCustomer.map((customer, index) => (
              <ListItem key={index}>
                <p>{customer}</p>
              </ListItem>
            ))}
          </List>
        </BoxWrap>
      </ContentsWrap>
    </>
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
      <AnalysisSection Strategy>
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

        {Array.isArray(tabs[selectedTab]?.sections) &&
          tabs[selectedTab]?.sections.length > 0 &&
          tabs[selectedTab].sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}
      </AnalysisSection>
    </>
  );
};

// 스타일 컴포넌트들
const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px;
  border-radius: 15px;
  border: 1px solid ${palette.lineGray};
  overflow-y: auto;

  h1 {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 8px;
  }
`;

const TabHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-weight: ${(props) => (props.active ? "500" : "400")};
  color: ${(props) => (props.active ? `${palette.black}` : "rgba(0,0,0,.2)")};
  border: none;
  outline: none;
  border-bottom: ${(props) =>
    props.active ? `1px solid ${palette.black}` : "none"};
  background: ${palette.white};
  cursor: pointer;
  transition: all 0.5s;

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
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }
`;

const SubTitle = styled.div`
  font-size: 0.875rem;
  color: ${palette.gray};
  margin-bottom: 5px;
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
  // sections 데이터를 report에서 가져옴
  const sections = report.content.sections || [];

  return (
    <AnalysisSection>
      {/* 보고서의 제목과 첫 번째 섹션의 첫 번째 콘텐츠 표시 */}
      {report.title && (
        <TabHeader>
          <TabTitle>{report.title}</TabTitle>
        </TabHeader>
      )}

      {/* 각 섹션을 반복하여 표시 */}
      {sections.map((section, index) => (
        <Section key={index} title={section.title} content={section.content} />
      ))}
    </AnalysisSection>
  );
};

// Section 컴포넌트 - 각 섹션의 제목과 콘텐츠를 표시
const Section = ({ title, content }) => {
  const subTitleItems = content.filter((item) => item.subTitle);
  const nonSubTitleItems = content.filter((item) => !item.subTitle);

  return (
    <BoxWrap>
      {title && (
        <strong>
          <img src={images.Check} alt="" />
          {title}
        </strong>
      )}

      {nonSubTitleItems.length > 0 &&
        nonSubTitleItems.map((item, index) => (
          <div key={index}>
            <p>{item.text}</p>
            {item.subText1 && <SubTextBox>{item.subText1}</SubTextBox>}
            {item.subText2 && <SubTextBox>{item.subText2}</SubTextBox>}
            {item.subText3 && <SubTextBox>{item.subText3}</SubTextBox>}
          </div>
        ))}

      {subTitleItems.length > 0 && (
        <DynamicGrid columns={subTitleItems.length}>
          {subTitleItems.map((item, index) => (
            <div key={index}>
              {item.subTitle && <SubTitle>{item.subTitle}</SubTitle>}
              <p>{item.text}</p>
              {item.subText1 && <SubTextBox>{item.subText1}</SubTextBox>}
              {item.subText2 && <SubTextBox>{item.subText2}</SubTextBox>}
              {item.subText3 && <SubTextBox>{item.subText3}</SubTextBox>}
            </div>
          ))}
        </DynamicGrid>
      )}
    </BoxWrap>
  );
};
const DynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 12px;
  margin-top: 10px;

  > div {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }
`;
const AnalysisSection = styled.div`
  position: relative;
  max-width: 1135px;
  width: 91.5%;
  text-align: left;
  margin-top: 25px;
  padding: 30px;
  border-radius: 15px;
  border: 1px solid ${palette.lineGray};
  max-height: 80vh; /* 최대 높이를 제한하여 스크롤이 작동하도록 설정 */
  overflow-y: auto; /* 스크롤 활성화 */

  h1 {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 20px;
  }

  > p {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 15px;

    span {
      color: ${palette.red};
    }
  }
`;

const TabTitle = styled.div`
  font-family: "Pretendard";
  font-size: 1.25rem;
  font-weight: 500;
  color: ${palette.black};
  border: none;
  border-bottom: none;
  background: ${palette.white};
  margin-bottom: 10px;
`;
const TabContent = styled.div`
  font-family: "Pretendard";
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.black};
  border: none;
  border-bottom: none;
  background: ${palette.white};
`;
