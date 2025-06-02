import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import {
  Body1,
  Body2,
  Caption1,
} from "../../../../assets/styles/Typography";

const OrganismDashboardToolList = () => {
  // 콘텐츠 목록 데이터
  const contentList = [
    {
      id: 1,
      title: "메인 홍보 영상",
      type: "동영상",
      status: "활성",
      lastUpdate: "24.01.15 14:30",
      duration: "00:03:25"
    },
    {
      id: 2,
      title: "제품 소개 슬라이드",
      type: "이미지",
      status: "활성", 
      lastUpdate: "24.01.14 09:15",
      duration: "00:00:30"
    },
    {
      id: 3,
      title: "공지사항 템플릿",
      type: "텍스트",
      status: "비활성",
      lastUpdate: "24.01.13 16:45",
      duration: "00:00:15"
    },
    {
      id: 4,
      title: "브랜드 광고 영상",
      type: "동영상", 
      status: "활성",
      lastUpdate: "24.01.12 11:20",
      duration: "00:02:10"
    },
    {
      id: 5,
      title: "이벤트 안내 배너",
      type: "이미지",
      status: "활성",
      lastUpdate: "24.01.11 13:55",
      duration: "00:00:45"
    }
  ];

  return (
    <ContentListWrap>
      <Table>
        <colgroup>
          <col width="30%" />
          <col width="15%" />
          <col width="15%" />
          <col width="20%" />
          <col width="15%" />
          <col width="5%" />
        </colgroup>

        <TableHeader>
          <tr>
            <th>
              <Body1 color="gray700" align="left">
                콘텐츠명
              </Body1>
            </th>
            <th>
              <Body1 color="gray700" align="center">
                타입
              </Body1>
            </th>
            <th>
              <Body1 color="gray700" align="center">
                상태
              </Body1>
            </th>
            <th>
              <Body1 color="gray700" align="center">
                최근 업데이트
              </Body1>
            </th>
            <th>
              <Body1 color="gray700" align="center">
                재생 시간
              </Body1>
            </th>
            <th>
              <Body1 color="gray700" align="center">
                관리
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
              <td>
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
              </td>
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
              <td style={{ textAlign: "center" }}>
                <ActionButton>
                  <Caption1 color="gray600">⋯</Caption1>
                </ActionButton>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </ContentListWrap>
  );
};

export default OrganismDashboardToolList;

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
    
    &:not(:last-child) {
      border-right: 1px solid #D6E0EB;
    }
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
    
    &:not(:last-child) {
      border-right: 1px solid #E5E7EB;
    }
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
