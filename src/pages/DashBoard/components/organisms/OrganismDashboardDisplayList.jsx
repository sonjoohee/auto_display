import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import {
  Body1,
  Body2,
  Caption1,
} from "../../../../assets/styles/Typography";

// 토글 스위치 컴포넌트
const ToggleSwitch = ({ isActive, onChange, disabled = false }) => {
  return (
    <ToggleContainer onClick={() => !disabled && onChange(!isActive)} disabled={disabled}>
      <ToggleSlider isActive={isActive}>
        <ToggleKnob isActive={isActive} />
      </ToggleSlider>
      <ToggleLabel isActive={isActive}>
        {isActive ? "활성화" : "비활성화"}
      </ToggleLabel>
    </ToggleContainer>
  );
};

const OrganismDashboardDisplayList = () => {
  // 콘텐츠 목록 데이터 - isActive 상태 추가
  const [contentList, setContentList] = useState([
    {
      id: 1,
      title: "메인 홍보 영상",
      type: "동영상",
      isActive: true,
      lastUpdate: "24.01.15 14:30",
      duration: "00:03:25"
    },
    {
      id: 2,
      title: "제품 소개 슬라이드",
      type: "이미지",
      isActive: false, 
      lastUpdate: "24.01.14 09:15",
      duration: "00:00:30"
    },
    {
      id: 3,
      title: "공지사항 템플릿",
      type: "텍스트",
      isActive: true,
      lastUpdate: "24.01.13 16:45",
      duration: "00:00:15"
    },
    {
      id: 4,
      title: "브랜드 광고 영상",
      type: "동영상", 
      isActive: true,
      lastUpdate: "24.01.12 11:20",
      duration: "00:02:10"
    },
    {
      id: 5,
      title: "이벤트 안내 배너",
      type: "이미지",
      isActive: false,
      lastUpdate: "24.01.11 13:55",
      duration: "00:00:45"
    }
  ]);

  // 토글 상태 변경 핸들러
  const handleToggleChange = (id, newState) => {
    setContentList(prev => 
      prev.map(content => 
        content.id === id 
          ? { ...content, isActive: newState }
          : content
      )
    );
  };

  return (
    <ContentListWrap>
      <Table>
        <colgroup>
          <col width="40%" />
          {/* <col width="15%" />
          <col width="15%" />
          <col width="20%" /> */}
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>

        <TableHeader>
          <tr>
            <th>
              <Body1 color="gray700" align="left">
                콘텐츠 명
              </Body1>
            </th>
        
            <th>
              <Body1 color="gray700" align="center">
              설치 장소
              </Body1>
            </th>
            <th>
              <Body1 color="gray700" align="center">
             제작일
              </Body1>
            </th>
            <th>
              <Body1 color="gray700" align="center">
                활성화 여부
              </Body1>
            </th>
          </tr>
        </TableHeader>

        <TableBody>
          {contentList.map((content) => (
            <tr key={content.id}>
              <td>
                <Body2 color="gray700" align="left">
                  {content.title}
                </Body2>
              </td>
              {/* <td>
                <Body2 color="gray700" align="center">
                  {content.type}
                </Body2>
              </td>
              <td>
                <StatusBadge status={content.status}>
                  <Caption1 color={content.status === "활성" ? "white" : "gray600"}>
                    {content.status}
                  </Caption1>
                </StatusBadge>
              </td> */}
              <td>
                <Body2 color="gray700" align="center">
                  {content.lastUpdate}
                </Body2>
              </td>
              <td>
                <Body2 color="gray700" align="center">
                  {content.duration}
                </Body2>
              </td>
              <td>
                <ToggleCell>
                  <ToggleSwitch 
                    isActive={content.isActive}
                    onChange={(newState) => handleToggleChange(content.id, newState)}
                  />
                </ToggleCell>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </ContentListWrap>
  );
};

export default OrganismDashboardDisplayList;

const ContentListWrap = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${palette.white};
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${palette.outlineGray};
`;

const TableHeader = styled.thead`
  background: #EEF2F7;
  
  th {
    padding: 16px 20px;
    border-bottom: 1px solid ${palette.outlineGray};
    
    // &:not(:last-child) {
    //   border-right: 1px solid #D6E0EB;
    // }
  }
`;

const TableBody = styled.tbody`
  tr {
    &:hover {
      background: #F9FAFB;
    }
    
    &:not(:last-child) {
      border-bottom: 1px solid ${palette.outlineGray};
    }
  }
  
  td {
    padding: 16px 20px;
    
    // &:not(:last-child) {
    //   border-right: 1px solid #E5E7EB;
    // }
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 20px;
  background: ${props => props.status === "활성" ? palette.primary : "#F3F4F6"};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background: #F3F4F6;
  }
`;

const ToggleCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const ToggleSlider = styled.div`
  position: relative;
  width: 44px;
  height: 24px;
  background-color: ${props => props.isActive ? '#226FFF' : '#D1D5DB'};
  border-radius: 12px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isActive ? '#1E5CE6' : '#B5B9BD'};
  }
`;

const ToggleKnob = styled.div`
  position: absolute;
  top: 2px;
  left: ${props => props.isActive ? '22px' : '2px'};
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: left 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ToggleLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.isActive ? '#226FFF' : '#6B7280'};
  white-space: nowrap;
`;
