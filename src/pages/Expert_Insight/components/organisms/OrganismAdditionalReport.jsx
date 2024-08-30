import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { 
  SELECTED_EXPERT_INDEX,
  ADDITIONAL_REPORT_DATA,
} from '../../../AtomStates'; 
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import MoleculeReportController from '../molecules/MoleculeReportController';
import sampleData4 from './sample4.json';
import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';

const OrganismAdditionalReport = ({ conversationId }) => {
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [additionalReportData, setAdditionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);

  useEffect(() => {
    const loadData = async () => {
      try {
        const existingConversation = await getConversationByIdFromIndexedDB(conversationId);
        const currentReportKey = `additionalReportData_EX${selectedExpertIndex}`;

        if (
          existingConversation &&
          existingConversation[currentReportKey] &&
          existingConversation[currentReportKey].expert_id === selectedExpertIndex
        ) {
          setAdditionalReportData(existingConversation[currentReportKey]);
        } else if (Object.keys(additionalReportData).length === 0) {
          setAdditionalReportData(sampleData4);

          const updatedConversation = {
            ...existingConversation,
            [currentReportKey]: sampleData4,
            timestamp: Date.now(),
          };
          await saveConversationToIndexedDB(updatedConversation);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [conversationId, selectedExpertIndex]);

  return (
    <AnalysisSection>
      <BoxWrap>
        {additionalReportData.title && (
          <strong>
            <img src={images.Check} alt="" />
            {additionalReportData.title}
          </strong>
        )}
        {additionalReportData.content &&
          additionalReportData.content.map((item, index) => (
            <p key={index}>{item.text}</p>
          ))}
      </BoxWrap>
      <MoleculeReportController
        reportIndex={2}
        strategyReportID={sampleData4.expert_id}
        conversationId={conversationId}
        sampleData={sampleData4}
      />
    </AnalysisSection>
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
