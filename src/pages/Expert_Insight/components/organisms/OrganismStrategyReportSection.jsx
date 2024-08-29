import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import MoleculeReportController from '../molecules/MoleculeReportController';
import { useAtom } from 'jotai';
import {
  SELECTED_TAB,
} from '../../../AtomStates';
import sampleData from './sample3.json'; // sample.json 파일을 불러옵니다.

const OrganismStrategyReportSection = ({ conversationId }) => {
  const [selectedTab, setSelectedTab] = useAtom(SELECTED_TAB); // 탭을 인덱스로 관리
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // sample.json의 탭 데이터를 설정합니다.
    setTabs(sampleData.tabs);

    // 탭이 선택되면 해당 탭의 섹션을 설정합니다.
    if (sampleData.tabs.length > 0) {
      setSections(sampleData.tabs[selectedTab].sections);
    }
  }, [selectedTab]);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <AnalysisSection>
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

      {sections.map((section, index) => (
        <Section key={index} title={section.title} content={section.content} />
      ))}

      <MoleculeReportController reportIndex={1} conversationId={conversationId} sampleData={sampleData} />
    </AnalysisSection>
  );
};

const Section = ({ title, content }) => {
  // 서브 타이틀이 있는지 확인하고, 그 갯수를 셉니다.
  const subTitles = content.filter(item => item.subTitle);

  return (
    <BoxWrap>
      {title && <strong><img src={images.StarChack} alt="" />{title}</strong>}
      {subTitles.length > 0 ? (
        <DynamicGrid columns={subTitles.length}>
          {content.map((item, index) => (
            <div key={index}>
              {item.subTitle && <SubTitle>{item.subTitle}</SubTitle>}
              <p>{item.text}</p>
              {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
            </div>
          ))}
        </DynamicGrid>
      ) : (
        content.map((item, index) => (
          <div key={index}>
            <p>{item.text}</p>
            {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
          </div>
        ))
      )}
    </BoxWrap>
  );
};

export default OrganismStrategyReportSection;

const AnalysisSection = styled.div`
  position:relative;
  text-align:left;
  margin-top:25px;
  padding:30px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    margin-bottom:20px;
  }

  > p {
    font-size:0.88rem;
    line-height:1.5;
    margin-top:30px;

    span {
      color:${palette.red};
    }
  }
`;

const BoxWrap = styled.div`
  padding:20px;
  border-radius:10px;
  background:rgba(0,0,0,.04);

  + div {
    margin-top:12px;
  }

  strong {
    display:flex;
    align-items:center;
    gap:8px;
    margin-bottom:10px;
  }

  p {
    font-size:0.88rem;
    margin-bottom:10px;
  }
`;

const TabHeader = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid ${palette.lineGray};
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  color: ${props => (props.active ? palette.black : palette.gray)};
  background: ${props => (props.active ? palette.white : palette.lightGray)};
  border: none;
  border-bottom: ${props => (props.active ? `2px solid ${palette.black}` : 'none')};
  cursor: pointer;

  &:hover {
    background: ${palette.white};
    color: ${palette.black};
  }

  &:focus {
    outline: none;
  }
`;

// DynamicGrid로 그리드 컬럼의 갯수를 서브 타이틀 갯수에 맞춰 동적으로 설정
const DynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
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

const SubTextBox = styled.div`
  background: ${palette.white};
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 0.85rem;
  color: ${palette.gray};
`;
