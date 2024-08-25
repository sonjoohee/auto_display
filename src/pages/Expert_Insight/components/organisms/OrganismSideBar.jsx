// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismSideBar.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { INPUT_BUSINESS_INFO, SAVED_REPORTS } from '../../../AtomStates';
import images from '../../../../assets/images/Search.svg';
import OrganismReportPopup from './OrganismReportPopup'; // 팝업 컴포넌트 임포트

const OrganismSideBar = () => {
  const [bizName] = useAtom(INPUT_BUSINESS_INFO);
  const [savedReports] = useAtom(SAVED_REPORTS);
  const [selectedReport, setSelectedReport] = useState(null); // 선택된 보고서 상태 관리

  const handleReportClick = (index) => {
    setSelectedReport(savedReports[index]); // 보고서 선택
  };

  const closePopup = () => {
    setSelectedReport(null); // 팝업 닫기
  };

  return (
    <SideBarContainer>
      <SideBarHeader>
        <Link to="/new-chat">
          <img src={images} alt="새 대화 시작하기" />
          새 대화 시작하기
        </Link>
      </SideBarHeader>

      <SideBarContent>
        <SectionTitle>최근 기록</SectionTitle>
        <RecentRecordList>
          {bizName && (
            <RecordItem>
              <Link to="#" onClick={() => handleReportClick(0)}>
                <RecordTitle>{bizName}</RecordTitle>
                <RecordDate>오늘</RecordDate>
              </Link>
            </RecordItem>
          )}
          <RecordItem>
            <Link to="#" onClick={() => handleReportClick(1)}>
              <RecordTitle>조사 데이터 정리 분석</RecordTitle>
              <RecordDate>어제</RecordDate>
            </Link>
          </RecordItem>
          <RecordItem>
            <Link to="#" onClick={() => handleReportClick(2)}>
              <RecordTitle>시장 분석 데이터 수집</RecordTitle>
              <RecordDate>2024.08.22</RecordDate>
            </Link>
          </RecordItem>
        </RecentRecordList>

        <SectionTitle>저장된 항목</SectionTitle>
        <SavedItemsList>
          {savedReports.map((report, index) => (
            <SavedItem key={index}>
              <Link to="#" onClick={() => handleReportClick(index)}>
                {report.title}
              </Link>
            </SavedItem>
          ))}
        </SavedItemsList>
      </SideBarContent>

      {selectedReport && (
        <OrganismReportPopup report={selectedReport} onClose={closePopup} />
      )}
    </SideBarContainer>
  );
};

export default OrganismSideBar;


const SideBarContainer = styled.div`
  position: fixed;
  top: 110px; /* 헤더 바로 아래 */
  left: 0;
  width: 240px;
  height: calc(100% - 110px); /* 헤더를 제외한 전체 높이 */
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 98; /* MoleculeBizName의 z-index보다 높게 설정 */
`;

const SideBarHeader = styled.div`
  margin-bottom: 40px;

  a {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-radius: 30px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: #333;
    font-weight: bold;

    img {
      margin-right: 10px;
      width: 16px;
      height: 16px;
    }

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const SideBarContent = styled.div`
  overflow-y: auto;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const RecentRecordList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 40px;
`;

const RecordItem = styled.li`
  margin-bottom: 15px;

  a {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: #333;

    &:hover {
      color: #000;
    }
  }
`;

const RecordTitle = styled.span`
  font-size: 0.88rem;
  font-weight: 500;
`;

const RecordDate = styled.span`
  font-size: 0.75rem;
  color: #999;
`;

const SavedItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SavedItem = styled.li`
  margin-bottom: 15px;

  a {
    text-decoration: none;
    color: #333;

    &:hover {
      color: #000;
    }
  }
`;
