import React from "react";
import styled from "styled-components";

const LandingPageWrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  font-family: "Pretendard", sans-serif;
`;

const Header = styled.header`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 100px 0;
`;

const Title = styled.h1`
  font-size: 68px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 24px;
  color: #323232;
  margin-bottom: 40px;
`;

const InputSection = styled.div`
  max-width: 1236px;
  margin: 0 auto;
  padding: 24px 36px;
  background: #ffffff;
  box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 50px 0;
`;

const AIPersonaSection = styled.section`
  padding: 100px 0;
  background: #f3f7fa;
`;

const SectionTitle = styled.h2`
  font-size: 50px;
  font-weight: 600;
  margin-bottom: 40px;
  text-align: center;
`;

const AIInsightSection = styled.section`
  padding: 100px 0;
`;

const AIModeratorSection = styled.section`
  padding: 100px 0;
  background: #f3f7fa;
`;

const Footer = styled.footer`
  background: #f6f6f6;
  padding: 50px 0;
`;

const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <Header>
        <Logo src="/path-to-logo.png" alt="Logo" />
      </Header>

      <HeroSection>
        <Title>AI Personas Ready for Your Business</Title>
        <Subtitle>
          비즈니스를 함께 만들어갈 고객과 전문가를 언제 어디서든 만나보세요.
        </Subtitle>
        <InputSection>
          <p>
            🖐 비즈니스에 어떤 고민이든 입력해보세요. 필요하신 AI Persona를
            매칭시켜 드릴게요!
          </p>
          {/* 입력 필드 구현 */}
        </InputSection>
      </HeroSection>

      <ImageGrid>{/* 이미지 그리드 구현 */}</ImageGrid>

      <AIPersonaSection>
        <SectionTitle>
          수많은 비즈니스 고민 ✨<br />
          AI가 분석해 전문가 실시간 매칭
        </SectionTitle>
        {/* AI 페르소나 관련 컨텐츠 */}
      </AIPersonaSection>

      <AIInsightSection>
        <SectionTitle>
          믿어볼 AI 전문가의
          <br />
          핵심 인사이트를 한번에 👀
        </SectionTitle>
        {/* AI 인사이트 관련 컨텐츠 */}
      </AIInsightSection>

      <AIModeratorSection>
        <SectionTitle>
          하나하나 고민 말고 💬
          <br />
          AI 모더레이터에게 맡기세요
        </SectionTitle>
        {/* AI 모더레이터 관련 컨텐츠 */}
      </AIModeratorSection>

      <Footer>
        <div>
          <h3>(주)유저커넥트</h3>
          <p>사업자 등록번호 : 678-81-01795 | 대표: 박영수</p>
          <p>
            주소 : 경기도 안산시 상록구 해양3로 15, 1514호 (그랑시티
            시그니처타워)
          </p>
          <p>대표전화 : 031-216-5930 | 메일 : weneedyourthinking@gmail.com</p>
          <p>고객센터 운영시간 : 10:00 ~ 18:00</p>
          <p>Copyright ⓒ 2024 Userconnect Co.,Ltd All rights reserved.</p>
        </div>
      </Footer>
    </LandingPageWrapper>
  );
};

export default LandingPage;
