import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  ADDITIONAL_REPORT_DATA1,
  ADDITIONAL_REPORT_DATA2,
  ADDITIONAL_REPORT_DATA3,
  SELECTED_EXPERT_INDEX,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  SELECTED_TAB,
} from '../../../AtomStates';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import MoleculeReportController from '../molecules/MoleculeReportController';
import sampleData4 from './sample4.json';
import sampleData5 from './sample5.json';
import sampleData6 from './sample6.json';
import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';

const OrganismAdditionalReport = ({ conversationId, expertIndex }) => {
  const [selectedTab, setSelectedTab] = useAtom(SELECTED_TAB); // 탭을 인덱스로 관리
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);

  // 전문가 인덱스에 따라 해당 Atom을 선택
  const strategyReportAtomMap = {
    '1': ADDITIONAL_REPORT_DATA1,
    '2': ADDITIONAL_REPORT_DATA2,
    '3': ADDITIONAL_REPORT_DATA3,
    // 필요한 경우 추가할 수 있음
  };
  
  const sampleDataMap = {
    '1': sampleData4,
    '2': sampleData5,
    '3': sampleData6,
    // 필요한 경우 추가할 수 있음
  };
  
  // expertIndex가 1, 2, 3 이외의 값일 경우 예외 처리
  const additionalReportAtom = strategyReportAtomMap[expertIndex] || ADDITIONAL_REPORT_DATA1; 
  const sampleData = sampleDataMap[expertIndex] || sampleData4;
  

  const [additionalReportData, setAdditionalReportData] = useAtom(additionalReportAtom);

  useEffect(() => {
    const loadData = async () => {
      try {
        const existingConversation = await getConversationByIdFromIndexedDB(conversationId);
        const currentReportKey = `additionalReportData_EX${expertIndex}`;

        if (
          existingConversation &&
          existingConversation[currentReportKey] &&
          existingConversation[currentReportKey].expert_id === parseInt(expertIndex, 10)
        ) {
          // IndexedDB에 현재 선택된 전문가의 데이터가 있는 경우 해당 데이터를 사용합니다.
          const strategyData = existingConversation[currentReportKey];
          setAdditionalReportData(strategyData);
          setTabs(strategyData.tabs);
          setSections(strategyData.tabs[selectedTab].sections);
        } else if (Object.keys(additionalReportData).length === 0) {
          // IndexedDB에 데이터가 없고 atom에도 데이터가 없으면 JSON 데이터를 사용합니다.
          setAdditionalReportData(sampleData); // atom에 sampleData 저장
          setTabs(sampleData.tabs);
          setSections(sampleData.tabs[selectedTab].sections);

          // 새 데이터를 IndexedDB에 저장합니다.
          const updatedConversation = {
            ...existingConversation,
            [currentReportKey]: sampleData, // 전문가를 키로 저장
            timestamp: Date.now(),
          };
          await saveConversationToIndexedDB(updatedConversation);
        } else {
          // atom에 데이터가 있으면 그 데이터를 사용합니다.
          setTabs(additionalReportData.tabs);
          setSections(additionalReportData.tabs[selectedTab].sections);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [conversationId, selectedTab, expertIndex]);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    if (tabs.length > 0) {
      setSections(tabs[index].sections);
    }
  };

  return (
    <AnalysisSection Strategy>
      <TabHeader>
        {tabs.map((tab, index) => (
          <TabButton key={index} active={selectedTab === index} onClick={() => handleTabClick(index)}>
            {tab.title}
          </TabButton>
        ))}
      </TabHeader>

      {sections.map((section, index) => (
        <Section key={index} title={section.title} content={section.content} />
      ))}

      <MoleculeReportController reportIndex={2} strategyReportID={sampleData.expert_id} conversationId={conversationId} sampleData={sampleData} />
    </AnalysisSection>
  );
};

// ... (아래 부분은 동일)

const Section = ({ title, content }) => {
  // 서브 타이틀이 있는지 확인하고, 그 갯수를 셉니다.
  const subTitles = content.filter((item) => item.subTitle);

  return (
    <BoxWrap>
      {title && (
        <strong>
          <img src={images.Check} alt="" />
          {title}
        </strong>
      )}
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

export default OrganismAdditionalReport;

const AnalysisSection = styled.div`
  position:relative;
  max-width:1135px;
  width:91.5%;
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
    margin-top:15px;

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
  gap:40px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  font-family: 'Pretendard';
  font-size: 1.25rem;
  font-weight: ${props => (props.active ? '600' : '400')};
  color: ${props => (props.active ? palette.black : palette.lightGray)};
  border: none;
  border-bottom: ${props => (props.active ? `1px solid ${palette.black}` : 'none')};
  background: ${palette.white};
  cursor: pointer;
  transition:all .5s;

  &:hover {
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

  div {
    flex:1;
    display:flex;
    flex-direction:column;
    padding:12px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};
  }

  p {
    margin: 0;
  }
`;

const SubTitle = styled.strong`
  font-size:0.88rem;
  font-weight: 500;
  color:${palette.gray};
  text-align:left;
`;

const SubTextBox = styled.div`
  background: ${palette.white};
  padding: 16px;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 0.88rem;
  color: ${palette.gray};
  border:0 !important;
`;
