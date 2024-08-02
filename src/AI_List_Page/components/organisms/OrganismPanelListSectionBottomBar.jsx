// OrganismPanelListSectionBottomBar.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const OrganismPanelListSectionBottomBar = ({ onSaveSelection }) => {
  return (
    <BottomBar>
      <SaveButton onClick={onSaveSelection}>
        <SaveIcon>⬇️</SaveIcon> 선택패널 저장
      </SaveButton>
      <LinkButton to="/interview">
        <InterviewIcon>🎤</InterviewIcon> 인터뷰하기
      </LinkButton>
      <LinkButton to="/quickreport">
        <ReportIcon>📄</ReportIcon> 퀵 리포트
      </LinkButton>
    </BottomBar>
  );
};

export default OrganismPanelListSectionBottomBar;

const BottomBar = styled.div`
  position: fixed;
  bottom: 20px; /* 화면 하단에서 약간 위로 이동 */
  left: 50%;
  transform: translateX(-50%);
  width: 50%; /* 좌우 길이를 줄임 */
  background: black;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 15px; /* 높이를 30% 줄임 */
  border-radius: 20px;
  z-index: 1000; /* 다른 요소보다 위에 표시 */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  font-size: 14px; /* 폰트 크기 약간 줄임 */
  cursor: pointer;
`;

const SaveIcon = styled.span`
  margin-right: 8px;
`;

const LinkButton = styled(Link)`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 6px 10px; /* 패딩 크기 조정 */
  border-radius: 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 14px; /* 폰트 크기 약간 줄임 */
  cursor: pointer;
`;

const InterviewIcon = styled.span`
  margin-right: 8px;
`;

const ReportIcon = styled.span`
  margin-right: 8px;
`;
