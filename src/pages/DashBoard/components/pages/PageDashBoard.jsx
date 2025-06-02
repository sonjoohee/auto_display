//대시보드
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import {
  H1,
  Body1,
  Body2,
  Caption1,
} from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";

const PageDashBoard = () => {
  const navigate = useNavigate();
  
  // 대시보드 상태 데이터
  const [stats] = useState({
    registeredDevices: 5,
    totalContent: 20,
    activeContent: 10,
    credits: 21250
  });

  // 탭 상태
  const [activeTab, setActiveTab] = useState("content");

  // 테이블 데이터 (장애인 지원금 예시)
  const [tableData] = useState([
    {
      category: "국민기초생활보장 생계 또는 의료급여 수급자",
      severeDisability: "22 만원",
      mildDisability: "11 만원"
    },
    {
      category: "차상위계층 (차상위본인부담경감대상자 등)",
      severeDisability: "22 만원", 
      mildDisability: "11 만원"
    },
    {
      category: "기초연금수급자 (만65세 이상)",
      severeDisability: "22 만원",
      mildDisability: "11 만원"
    },
    {
      category: "장애아동수당 대상자",
      severeDisability: "22 만원",
      mildDisability: "11 만원"
    },
    {
      category: "장애인연금 대상자",
      severeDisability: "22 만원",
      mildDisability: "11 만원"
    },
    {
      category: "기타 저소득 장애인",
      severeDisability: "22 만원",
      mildDisability: "11 만원"
    }
  ]);

  return (
    <DashboardContainer>
      <MoleculeHeader />

      {/* 메인 컨텐츠 */}
      <MainContent>
        {/* 상단 섹션 */}
        <TopSection>
          <CompanyInfo>
            <Avatar />
            <CompanyName>회사명</CompanyName>
          </CompanyInfo>
          <ButtonGroup>
            <Button Medium Outline>
              <Caption1 color="primary">새 기기 등록</Caption1>
            </Button>
            <Button Medium Primary>
              <Caption1 color="white">새 콘텐츠</Caption1>
            </Button>
          </ButtonGroup>
        </TopSection>

        {/* 통계 섹션 */}
        <StatsSection>
          <SectionTitle>기기 및 콘텐츠 현황</SectionTitle>
          <StatsGrid>
            <StatCard>
              <StatHeader>
                <Body2 color="gray600">등록 기기 수</Body2>
                <Body2 color="gray600">갯수</Body2>
              </StatHeader>
              <StatValue>{stats.registeredDevices} 개</StatValue>
            </StatCard>
            <StatCard>
              <StatHeader>
                <Body2 color="gray600">전체 콘텐츠 수</Body2>
                <Body2 color="gray600">건수</Body2>
              </StatHeader>
              <StatValue>{stats.totalContent} 건</StatValue>
            </StatCard>
            <StatCard>
              <StatHeader>
                <Body2 color="gray600">활성화 콘텐츠 수</Body2>
                <Body2 color="gray600">건수</Body2>
              </StatHeader>
              <StatValue>{stats.activeContent} 건</StatValue>
            </StatCard>
          </StatsGrid>
        </StatsSection>

        {/* 탭 및 테이블 섹션 */}
        <TableSection>
          <TabContainer>
            <Tab 
              active={activeTab === "content"} 
              onClick={() => setActiveTab("content")}
            >
              등록 콘텐츠 (10)
            </Tab>
            <Tab 
              active={activeTab === "display"} 
              onClick={() => setActiveTab("display")}
            >
              등록 디스플레이 (3)
            </Tab>
          </TabContainer>

          <Table>
            <TableHeader>
              <HeaderCell wide>대상인 구분</HeaderCell>
              <HeaderCell>중증 장애인</HeaderCell>
              <HeaderCell>경증 장애인</HeaderCell>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell wide>{row.category}</TableCell>
                  <TableCell>{row.severeDisability}</TableCell>
                  <TableCell>{row.mildDisability}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default PageDashBoard;

// 스타일 컴포넌트들
const DashboardContainer = styled.div`
  width: 100%;
  max-width: 2330px;
  margin: 0 auto;
  background: ${palette.white};
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 40px;
  height: 56px;
`;

const Logo = styled.h1`
  font-family: Poppins;
  font-weight: 700;
  font-size: 20px;
  color: #323232;
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const CreditSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CreditIcon = styled.div`
  width: 20px;
  height: 20px;
  background: #FFD54A;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const CreditText = styled.span`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  color: #323232;
`;

const CreditArrow = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #CCCCCC;
`;

const NotificationIcon = styled.div`
  width: 18px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MoreIcon = styled.div`
  width: 18px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #E0E4EB;
`;

const MainContent = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  padding: 72px 0;
  display: flex;
  flex-direction: column;
  gap: 72px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background: #D9D9D9;
  border-radius: 50%;
`;

const CompanyName = styled.h2`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 40px;
  color: #1E2124;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h3`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 24px;
  color: #696969;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: flex;
  gap: 20px;
`;

const StatCard = styled.div`
  flex: 1;
  background: ${palette.white};
  border: 1px solid #E0E4EB;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatValue = styled.div`
  font-family: Poppins;
  font-weight: 700;
  font-size: 40px;
  color: #666666;
`;

const TableSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 272px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 0 0 12px 0;
  font-family: Pretendard;
  font-weight: ${props => props.active ? 700 : 400};
  font-size: 16px;
  color: ${props => props.active ? '#323232' : '#8C8C8C'};
  cursor: pointer;
  position: relative;
  
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: #323232;
    }
  `}
`;

const Table = styled.div`
  border-radius: 0;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: flex;
  background: #EEF2F7;
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: flex;
  background: ${palette.white};
  
  &:not(:last-child) {
    border-bottom: 1px solid #CDD1D5;
  }
`;

const HeaderCell = styled.div`
  padding: 20px 16px;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 15px;
  color: #131416;
  border-right: 1px solid #D6E0EB;
  
  ${props => props.wide ? `
    flex: 1;
    text-align: left;
  ` : `
    width: 240px;
    text-align: right;
  `}
  
  &:last-child {
    border-right: none;
  }
`;

const TableCell = styled.div`
  padding: 20px 16px;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 17px;
  color: #464C53;
  border-right: 1px solid #CDD1D5;
  
  ${props => props.wide ? `
    flex: 1;
    text-align: left;
  ` : `
    width: 240px;
    text-align: right;
  `}
  
  &:last-child {
    border-right: none;
  }
`;
