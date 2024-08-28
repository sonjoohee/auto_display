import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import MoleculeReportController from '../molecules/MoleculeReportController';
import sampleData from './sample.json'; // sample.json 파일을 불러옵니다.
import { useAtom } from 'jotai';

const OrganismStrategyReportSection = ({ conversationId }) => {
  const [selectedTab, setSelectedTab] = useState(0); // 탭을 인덱스로 관리
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

<<<<<<< HEAD
      {selectedTab === 'tab1' && (
        <>
          {/* <h1>해결할 문제와 고객 니즈</h1> */}
          <TabContenst Insight>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />1번탭 변수1</strong>
              <p>{strategyReportCustomerNeeds1}</p>
            </BoxWrap>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />1번탭 변수2</strong>
              <p>{strategyReportCustomerNeeds2[0]}</p>
              <p>{strategyReportCustomerNeeds2[1]}</p>
            </BoxWrap>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />1번탭 변수3</strong>
              <p>{strategyReportCustomerNeeds3[0]}</p>
              <p>{strategyReportCustomerNeeds3[1]}</p>
            </BoxWrap>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />문제 해결의 시급성(1번탭 고정1)</strong>
              <p>{strategyReportCustomerNeeds4[0]}</p>
              <p>{strategyReportCustomerNeeds4[1]}</p>
            </BoxWrap>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />이상적인 시장 포지셔닝(1번탭 고정2)</strong>
              <p>{strategyReportCustomerNeeds5}</p>
            </BoxWrap>
            <p>{strategyReportCustomerNeeds6}</p>
          </TabContenst>
        </>
      )}

      {selectedTab === 'tab2' && (
        <>
          {/* <h1>고객 주요 혜택</h1> */}
          <TabContenst Strategy>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />{strategyReportCustomerBenefitsTitle1}</strong>
              <p>{strategyReportCustomerBenefits1[0]}</p>
              <p>{strategyReportCustomerBenefits1[1]}</p>
            </BoxWrap>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />{strategyReportCustomerBenefitsTitle2}</strong>
              <p>{strategyReportCustomerBenefits2[0]}</p>
              <p>{strategyReportCustomerBenefits2[1]}</p>
            </BoxWrap>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />{strategyReportCustomerBenefitsTitle3}</strong>
              <p>{strategyReportCustomerBenefits3[0]}</p>
              <p>{strategyReportCustomerBenefits3[1]}</p>
            </BoxWrap>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />우선순위와 영향 분석(2번탭 고정1)</strong>
              <p>{strategyReportCustomerBenefits4[0]}</p>
              <p>{strategyReportCustomerBenefits4[1]}</p>
            </BoxWrap>
            <p>{strategyReportCustomerBenefits5}</p>
          </TabContenst>
        </>
      )}

      {selectedTab === 'tab3' && (
        <>
          {/* <h1>경쟁 차별화 전략</h1> */}
          <TabContenst Insight>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />{strategyReportCompetitionDifferentiationTitle1}</strong>
              <p>{strategyReportCompetitionDifferentiation1}</p>
            </BoxWrap>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />{strategyReportCompetitionDifferentiationTitle2}</strong>
              <p>{strategyReportCompetitionDifferentiation2[0]}</p>
              <p>{strategyReportCompetitionDifferentiation2[1]}</p>
            </BoxWrap>
            <BoxWrap>
              <strong><img src={images.StarChack} alt="" />{strategyReportCompetitionDifferentiationTitle3}</strong>
              <p>{strategyReportCompetitionDifferentiation3[0]}</p>
              <p>{strategyReportCompetitionDifferentiation3[1]}</p>
            </BoxWrap>
            <p>{strategyReportCompetitionDifferentiation4}</p>
          </TabContenst>
        </>
      )}

    <MoleculeReportController reportIndex={1} conversationId={conversationId}/>
=======
      {sections.map((section, index) => (
        <Section key={index} title={section.title} content={section.content} />
      ))}

      <MoleculeReportController reportIndex={1} conversationId={conversationId} sampleData={sampleData} />
>>>>>>> dd3e7d76c586c8038460e5e1f27f1ea464b5ad01
    </AnalysisSection>
  );
};

const Section = ({ title, content }) => {
  const hasSubTitles = content.some(item => item.subTitle); // 서브 타이틀이 있는지 확인

  return (
    <BoxWrap>
      {title && <strong><img src={images.StarChack} alt="" />{title}</strong>}
      {hasSubTitles ? (
        <TwoColumnGrid>
          {content.map((item, index) => (
            <div key={index}>
              {item.subTitle && <SubTitle>{item.subTitle}</SubTitle>}
              <p>{item.text}</p>
            </div>
          ))}
        </TwoColumnGrid>
      ) : (
        content.map((item, index) => <p key={index}>{item.text}</p>)
      )}
    </BoxWrap>
  );
};

export default OrganismStrategyReportSection;

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

  p {
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
<<<<<<< HEAD
    line-height:1.5;
  }

  button {
    flex-shrink:0;
    font-family: 'Pretendard';
    font-size:0.75rem;
    color:${palette.gray};
    padding:5px 10px;
    border-radius:5px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};

    &.add {
      color:${palette.white};
      border:1px solid ${palette.black};
      background:${palette.black};
    }
=======
    margin-bottom:10px;
>>>>>>> dd3e7d76c586c8038460e5e1f27f1ea464b5ad01
  }
`;

const TabHeader = styled.div`
  display: flex;
  gap:40px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
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
<<<<<<< HEAD

const TabContenst = styled.div`
  height: ${props => {
    if (props.Strategy) return '980px'; // '전략 전문가' 일경우, 세로길이
    else if (props.Marketing) return '840px'; // '마케팅 전문가' 일경우, 세로길이
    else if (props.Insight) return '980px'; // '고객 인사이트 전문가' 일경우, 세로길이
    else return 'auto';
  }};
  overflow-y:auto;
=======
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
  font-size: 0.9rem;  /* 글자 크기를 작게 설정 */
  color: #6c757d;     /* 회색으로 설정 */
  margin-bottom: 8px;
>>>>>>> dd3e7d76c586c8038460e5e1f27f1ea464b5ad01
`;
