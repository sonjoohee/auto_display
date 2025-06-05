import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { palette } from '../../../../assets/styles/Palette';
import { H2, Body1, Body2 } from '../../../../assets/styles/Typography';
import { Button } from '../../../../assets/styles/ButtonStyle';

const OrganismTemplatePreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const template = location.state?.template;
  const previousTab = location.state?.previousTab || 3; // 기본값은 3번 탭
  const formData = location.state?.formData;


  const handleUseTemplate = () => {
    navigate('/CreateContent', { 
      
    });
  };

  const handleGoBack = () => {
    // 이전 페이지로 돌아가면서 탭 정보와 폼 데이터를 함께 전달
    navigate('/CreateContent', { 

      replace: true 
    });
  };

  // 템플릿이 없어도 일단 페이지를 보여주도록 수정
  return (
    <PreviewContainer>
      <Header style={{ justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            Medium
            Outline
            onClick={handleGoBack}
          >
            <Body2 color="gray700">뒤로가기</Body2>
          </Button>
          
          <Button
            Medium
            Primary
            Fill
            onClick={handleUseTemplate}
          >
            <Body2 color="white">HTML 코드 편집</Body2>
          </Button>
        </div>
      </Header>

      <PreviewContent>
        <PreviewSection>
          <TemplatePreview>
            <PreviewImage>
              <EventPoster>
                <TopRedTriangle />
                
                <TopSection>
                  <div /> {/* 빈 공간 */}
                  <TopRightInfo>
                    <CategoryBadge>이벤트</CategoryBadge>
                    <EventYear>2023년</EventYear>
                    <EventTitle>제2회 시흥 SOLO</EventTitle>
                  </TopRightInfo>
                </TopSection>
                
                <MainSection>
                  <MainTitle>시흥 SOLO</MainTitle>
                  <Subtitle>미혼남녀 만남 행사 참가자 모집</Subtitle>
                  <Description>
                    2023년 제2회 시흥SOLO에서 젊은이들의 만남진행을 하고,
                    좋은 인연, 시흥의 이웃을 만나 좋은 모임을 만들어갑니다.
                  </Description>
                </MainSection>

                <InfoList>
                  <InfoItem>
                    <InfoLabel>행사일시</InfoLabel>
                    <InfoValue>2023년 6월 15일 (목) 19:00 ~ 21:00</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>장소</InfoLabel>
                    <InfoValue>시흥ABC복합쇼핑몰 + 온케어푸른공원 일대</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>참가대상</InfoLabel>
                    <InfoValue>1985~1999년생, 시흥시민 or 시흥 근무자</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>신청기간</InfoLabel>
                    <InfoValue>2023년 5월 12일 ~ 6월 30일 오후 6시까지</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>신청방법</InfoLabel>
                    <InfoValue>
                      신청서 + 서류 제출 후 면접
                      <br />siheungsolo@gmail.com
                    </InfoValue>
                  </InfoItem>
                </InfoList>

                <BottomRedTriangle />
              </EventPoster>
            </PreviewImage>
          </TemplatePreview>
        </PreviewSection>

        {/* <InfoSection>
          <TemplateInfo>
            <H2 color="gray800">{template?.title || '시흥 SOLO 템플릿'}</H2>
            <Body1 color="gray600" style={{ margin: '12px 0 24px 0' }}>
              {template?.description || '미혼남녀 만남 행사 참가자 모집을 위한 포스터 템플릿'}
            </Body1>
            
            <ButtonGroup>
              <Button Large Outline Fill onClick={handleGoBack}>
                <Body1 color="primary">다른 템플릿 보기</Body1>
              </Button>
              <Button Large Primary Fill onClick={handleUseTemplate}>
                <Body1 color="white">이 템플릿 사용하기</Body1>
              </Button>
            </ButtonGroup>
          </TemplateInfo>
        </InfoSection> */}
      </PreviewContent>
    </PreviewContainer>
  );
};

export default OrganismTemplatePreview;

// Styled Components
const PreviewContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
`;

const PreviewContent = styled.div`
  display: flex;
  gap: 40px;
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PreviewSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const TemplatePreview = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const PreviewImage = styled.div`
  width: 420px;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
`;

const EventPoster = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #e8e9ea;
  padding: 30px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const TopRedTriangle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 80px 0 0 120px;
  border-color: transparent transparent transparent #dc3545;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
`;

const TopRightInfo = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const CategoryBadge = styled.div`
  background: #007bff;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const EventYear = styled.div`
  font-size: 14px;
  color: #333;
  margin-top: 8px;
`;

const EventTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-bottom: 30px;
`;

const MainTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #000;
  margin: 0 0 8px 0;
  line-height: 1.1;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.3;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin: 0;
`;

const InfoList = styled.div`
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #dc3545;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`;

const BottomRedTriangle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 80px 120px;
  border-color: transparent transparent #dc3545 transparent;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const TemplateInfo = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  height: fit-content;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;