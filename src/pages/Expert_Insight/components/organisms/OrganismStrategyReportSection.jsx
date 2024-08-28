import React, { useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_1,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_2,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_3,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_1,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_2,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_3,
  STRATEGY_REPORT_COSTOMER_NEEDS_1,
  STRATEGY_REPORT_COSTOMER_NEEDS_2,
  STRATEGY_REPORT_COSTOMER_NEEDS_3,
  STRATEGY_REPORT_COSTOMER_NEEDS_4,
  STRATEGY_REPORT_COSTOMER_NEEDS_5,
  STRATEGY_REPORT_COSTOMER_NEEDS_6,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_1,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_2,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_3,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_4,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_5,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_1,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_2,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_3,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_4,
} from '../../../AtomStates';

import MoleculeReportController from '../molecules/MoleculeReportController';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { InputField } from '../../../../assets/styles/Input';

const OrganismStrategyReportSection = ({ conversationId }) => {
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [selectedTab, setSelectedTab] = useState('tab1'); // 추가: 기본 탭은 'needs'로 설정
  const handleTabClick = (tab) => {
    setSelectedTab(tab); // 선택한 탭을 상태로 설정
  };
  const [bizAnalysisReportIndex, setBizAnalysisReportIndex] = useState(0);
  const [newAddContent, setNewAddContent] = useState('');
  const [isAddingNow, setIsAddingNow] = useState(false);
  const [newEditContent, setNewEditContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const [strategyReportCustomerNeeds1, setStrategyReportCustomerNeeds1] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_1);
  const [strategyReportCustomerNeeds2, setStrategyReportCustomerNeeds2] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_2);
  const [strategyReportCustomerNeeds3, setStrategyReportCustomerNeeds3] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_3);
  const [strategyReportCustomerNeeds4, setStrategyReportCustomerNeeds4] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_4);
  const [strategyReportCustomerNeeds5, setStrategyReportCustomerNeeds5] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_5);
  const [strategyReportCustomerNeeds6, setStrategyReportCustomerNeeds6] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_6);

  const [strategyReportCustomerBenefitsTitle1, setStrategyReportCustomerBenefitsTitle1] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_1);
  const [strategyReportCustomerBenefitsTitle2, setStrategyReportCustomerBenefitsTitle2] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_2);
  const [strategyReportCustomerBenefitsTitle3, setStrategyReportCustomerBenefitsTitle3] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_3);
  const [strategyReportCustomerBenefits1, setStrategyReportCustomerBenefits1] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_1);
  const [strategyReportCustomerBenefits2, setStrategyReportCustomerBenefits2] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_2);
  const [strategyReportCustomerBenefits3, setStrategyReportCustomerBenefits3] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_3);
  const [strategyReportCustomerBenefits4, setStrategyReportCustomerBenefits4] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_4);
  const [strategyReportCustomerBenefits5, setStrategyReportCustomerBenefits5] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_5);

  const [strategyReportCompetitionDifferentiationTitle1, setStrategyReportCompetitionDifferentiationTitle1] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_1);
  const [strategyReportCompetitionDifferentiationTitle2, setStrategyReportCompetitionDifferentiationTitle2] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_2);
  const [strategyReportCompetitionDifferentiationTitle3, setStrategyReportCompetitionDifferentiationTitle3] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_3);
  const [strategyReportCompetitionDifferentiation1, setStrategyReportCompetitionDifferentiation1] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_1);
  const [strategyReportCompetitionDifferentiation2, setStrategyReportCompetitionDifferentiation2] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_2);
  const [strategyReportCompetitionDifferentiation3, setStrategyReportCompetitionDifferentiation3] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_3);
  const [strategyReportCompetitionDifferentiation4, setStrategyReportCompetitionDifferentiation4] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_4)

  return (
    <AnalysisSection>
      <TabHeader>
        <TabButton
          active={selectedTab === 'tab1'}
          onClick={() => handleTabClick('tab1')}
        >
          해결할 문제와 고객 니즈
        </TabButton>
        <TabButton
          active={selectedTab === 'tab2'}
          onClick={() => handleTabClick('tab2')}
        >
          고객 주요 혜택
        </TabButton>
        <TabButton
          active={selectedTab === 'tab3'}
          onClick={() => handleTabClick('tab3')}
        >
          경쟁 차별화 전략
        </TabButton>
      </TabHeader>

      {selectedTab === 'tab1' && (
        <>
          <h1>해결할 문제와 고객 니즈</h1>
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
        </>
      )}

      {selectedTab === 'tab2' && (
        <>
          <h1>고객 주요 혜택</h1>
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
        </>
      )}

      {selectedTab === 'tab3' && (
        <>
          <h1>경쟁 차별화 전략</h1>
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
        </>
      )}

    <MoleculeReportController reportIndex={1} conversationId={conversationId}/>
    </AnalysisSection>
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

  li {
    position:relative;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
    padding-left:10px;

    &:before {
      position:absolute;
      left:0;
      top:50%;
      transform:translateY(-50%);
      width:5px;
      height:1px;
      background:${palette.black};
      content:'';
    }

    + li {
      margin-top:5px;
    }
  }

  p {
    font-size:0.88rem;
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
  }
`;

const AddInfo = styled.div`
  display:flex;
  align-items:stretch;
  gap:10px;
  margin-top:20px;

  input {
    font-size:0.88rem;
    height:40px;
    padding:4px 10px;
  }
`;

const ButtonWrap = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-top:20px;
  padding-top:20px;
  border-top:1px solid ${palette.lineGray};

  button {
    display:flex;
    align-items:center;
    gap:10px;
    font-family: 'Pretendard';
    fpmt-size:0.75rem;
    color:${palette.gray};
    border:0;
    background:none;
  }

  > button {
    padding:8px 16px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};
  }

  > div {
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:30px;
    // padding:8px 15px;
    // border-radius:6px;
    // border:1px solid ${palette.lineGray};
    // background:${palette.white};
    // box-shadow:0 4px 28px rgba(0,0,0,.1);
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
