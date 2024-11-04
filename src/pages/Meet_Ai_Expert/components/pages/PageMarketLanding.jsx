import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useAtom } from 'jotai';
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import Landingimages from "../../../../assets/styles/Landingimages"
import { createChatOnServer } from "../../../../utils/indexedDB";
import { INPUT_BUSINESS_INFO, IS_LOGGED_IN, LOGIN_SUCCESS, ANALYSIS_BUTTON_STATE, CONVERSATION_ID, IS_MARKETING } from '../../../AtomStates';
import axios from 'axios';

const PageMarketLanding = () => {
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [analysisButtonState, setAnalysisButtonState] = useAtom(ANALYSIS_BUTTON_STATE);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [, setLoginSuccess] = useAtom(LOGIN_SUCCESS);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const handleSubmit = async (type) => {
    try {
      // 로그인 요청
      const response = await axios.get(
        "https://wishresearch.kr/api/user/login/marketing/",
        axiosConfig
      );

      const accessToken = response.data.access_token;

      // accessToken을 세션 스토리지에 저장
      sessionStorage.setItem("accessToken", accessToken);

      // 로그인 성공 처리
      setIsLoggedIn(true);
      setLoginSuccess(true);

    } catch (error) {
      console.error("로그인 중 오류가 발생했습니다.", error);
    }

    const newConversationId = await createChatOnServer();
    setConversationId(newConversationId); // 생성된 대화 ID 설정

    setIsMarketing(true);
    setAnalysisButtonState(1);
    setInputBusinessInfo("피자");
    
    navigate('/MarketSetting', { state: { type: type } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleButtonExpert = () => {
    navigate('/MeetAiExpert');
  };

  return (
    <LandingPageWrapper>
      <Header>
        <Logo src={images.SymbolLogo} alt="Logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
        <button onClick={handleButtonExpert}>서비스 바로가기</button>
      </Header>

      <HeroSection>
        <Title>
          AI Personas<br />Ready for Your Business
          <p>비즈니스를 함께 만들어갈 고객과 전문가를 언제 어디서든 만나보세요.</p>
        </Title>

        <InputSection>
          <InputButton onClick={() => handleSubmit(1)}><i>🔍</i>계획이 있어요</InputButton>
          <InputButton onClick={() => handleSubmit(0)}><i>🔍</i>아직 없어요</InputButton>
        </InputSection>
      </HeroSection>

      <ImageGrid>
        <div>
          <img src={Landingimages.Img01} alt="" />
        </div>
        <div style={{gap:"28px", marginTop:"auto"}}>
          <img src={Landingimages.Img02} alt="" />
          <img src={Landingimages.Img03} alt="" />
        </div>
        <div style={{gap:"27px"}}>
          <img src={Landingimages.Img04} alt="" />
          <img src={Landingimages.Img05} alt="" />
        </div>
        <div style={{marginBottom:"auto"}}>
          <img src={Landingimages.Img06} alt="" />
        </div>
        <div style={{gap:"25px"}}>
          <img src={Landingimages.Img07} alt="" />
          <img src={Landingimages.Img08} alt="" />
        </div>
        <div style={{gap:"9px", marginBottom:"auto"}}>
          <img src={Landingimages.Img09} alt="" />
          <img src={Landingimages.Img10} alt="" />
        </div>
        <div>
          <img src={Landingimages.Img11} alt="" />
        </div>
      </ImageGrid>

      <AIPersonaSection>
        <SectionTitle>
          수많은 비즈니스 고민 👀<br />
          AI가 분석해 전문가 실시간 매칭
          <p>
            시간은 없고 고민은 많은 비즈니스<br />
            하지만 전문가와 미팅하고 의견을 조율하는데 어렵지 않으신가요?<br />
            저희가 비즈니스 고민은 분석해 AI 전문가를 즉시 연결해드릴게요 
          </p>
        </SectionTitle>
        {/* AI 페르소나 관련 컨텐츠 */}

        <AIPersona>
          <ChatAIPersona style={{maxWidth:"670px", marginRight:"90px"}}>
            <div className="cont">
              <strong>
                <span>헬스케어 스타트업</span>
                제품 기획자
              </strong>
              <p>"사용자들이 제품의 기능을 충분히 활용하지 못하는데, 어떤 기능이 사용자들에게 가장 가치 있는지 어떻게 파악해야 할까?"</p>
            </div>
            <div className="thumb">
              <img src={Landingimages.AIPersona01} alt="" />
            </div>
          </ChatAIPersona>
          <ChatAIPersona style={{maxWidth:"440px", margin:"110px 0 65px auto"}}>
            <div className="cont">
              <strong>
                <span>Ed Tech 스타트업</span>
                CEO
              </strong>
              <p>"온라인 교육 시장에서 빠르게 변화하는 기술 트렌드에 어떻게 대응해야 할까?"</p>
            </div>
            <div className="thumb">
              <img src={Landingimages.AIPersona02} alt="" />
            </div>
          </ChatAIPersona>
          <ChatAIPersona style={{maxWidth:"585px", marginRight:"110px"}}>
            <div className="cont">
              <strong>
                <span>E-Commerce 스타트업</span>
                마케팅 담당자
              </strong>
              <p>"우리 서비스 타겟에게 맞는 광고 비용 대비 매출 효과가 높은 채널은 무엇일까? 페이스북, 인스타그램, 유튜브 중 어디에 더 집중해야 할까?"</p>
            </div>
            <div className="thumb">
              <img src={Landingimages.AIPersona03} alt="" />
            </div>
          </ChatAIPersona>
        </AIPersona>
      </AIPersonaSection>

      <AIInsightSection>
        <div>
          <AIInsightUl>
            <li>
              <span><img src={Landingimages.Iconfield01} alt="" /></span>
              <p>트렌드<br />애널리스트</p>
            </li>
            <li>
              <span><img src={Landingimages.Iconfield02} alt="" /></span>
              <p>PoC설계<br />전문가</p>
            </li>
            <li>
              <span><img src={Landingimages.Iconfield03} alt="" /></span>
              <p>니치 마켓<br />리서처</p>
            </li>
            <li>
              <span><img src={Landingimages.Iconfield04} alt="" /></span>
              <p>VOC<br />분석가</p>
            </li>
            <li>
              <span><img src={Landingimages.Iconfield05} alt="" /></span>
              <p>경쟁사<br />리서처</p>
            </li>
            <li>
              <span><img src={Landingimages.Iconfield06} alt="" /></span>
              <p>제품 개발<br />컨설턴트</p>
            </li>
            <li>
              <span><img src={Landingimages.Iconfield07} alt="" /></span>
              <p>고객 평가<br />리서처</p>
            </li>
            <li>
              <span><img src={Landingimages.Iconfield08} alt="" /></span>
              <p>고객<br />매니지먼트</p>
            </li>
            <li>
              <span><img src={Landingimages.Iconfield09} alt="" /></span>
            </li>
          </AIInsightUl>
          <SectionTitle>
            분야별 AI 전문가의<br />
            핵심 인사이트를 한번에 📝
            <p>
              전문가의 의견을 듣고 싶지만 시간과 비용이 부담되셨죠?<br />
              실무자의 노하우를 담은 AI 전문가와 비즈니스 인사이트를<br />
              복잡한 과정 없이 신속하게 확인하세요
            </p>
          </SectionTitle>
          {/* AI 인사이트 관련 컨텐츠 */}
        </div>
      </AIInsightSection>

      <AIModeratorSection>
        <SectionTitle>
          하나하나 고민 말고 💬<br />
          AI 모더레이터에게 맡기세요
          <p>
            사용자 인터뷰는 처음이시라구요?<br />
            인터뷰 노하우를 기반으로 생성된 AI 모더레이터에게<br />
            자동 인터뷰를 맡기고, 의견 분석까지 진행해드려요
          </p>
        </SectionTitle>
        {/* AI 모더레이터 관련 컨텐츠 */}

        <img src={Landingimages.ImgAIModerator} alt="" />
      </AIModeratorSection>

      <AIExpertSection>
        <div>
          <img src={Landingimages.ImgAIExpert} alt="" />

          <SectionTitle>
            심도 있는 분석은<br />
            실제 전문가 매칭으로 📈
            <p>
              AI 전문가 리포트를 기반으로 어떤 전문가에게<br />
              어떤 요청을 해야하는지, 정리해드려요.<br />
              복잡한 과정 없이 맞춤형 전문가와 비즈니스를 성장시켜보세요
            </p>
          </SectionTitle>
          {/* 실제 전문가 매칭 */}
        </div>
      </AIExpertSection>

      <ProposalSection>
        <h3>이런 기능도 제안드려요.</h3>
        <ProposalButton>
          <Link to="#">
            <div>
                <p>
                  <strong>비즈니스 진단 받기</strong>
                  내게 필요한 다양한 비즈니스<br />진단 서비스
                </p>
                <img src={Landingimages.ImgProposal01} alt="" />
            </div>
          </Link>
          <Link to="#">
            <div>
              <p>
                <strong>내게 필요한 AI 페르소나 찾기</strong>
                고민하지 말고, 내가 원하던<br />페르소나까지 한번에!
              </p>
              <img src={Landingimages.ImgProposal02} alt="" />
            </div>
          </Link>
        </ProposalButton>
      </ProposalSection>

      <Footer>
        <div>
          <address>
            <strong>(주)유저커넥트</strong>
            <div>
              <p>사업자 등록번호 : 678-81-01795 | 대표: 박영수</p>
              <p>
                주소 : 경기도 안산시 상록구 해양3로 15, 1514호 (그랑시티
                시그니처타워)
              </p>
              <p>대표전화 : 031-216-5930 | 메일 : weneedyourthinking@gmail.com</p>
              <p>고객센터 운영시간 : 10:00 ~ 18:00</p>
            </div>
          </address>
          <p>Copyright ⓒ 2024 Userconnect Co.,Ltd All rights reserved.</p>
        </div>
      </Footer>
    </LandingPageWrapper>
  );
};

export default PageMarketLanding;

const LandingPageWrapper = styled.div`
  width: 100%;
  // max-width: 1920px;
  font-family: 'Pretendard', 'Poppins';
  margin: 0 auto;
`;

const Header = styled.header`
  position:fixed;
  top:0;
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:36px 40px 36px 65px;

  > button {
    font-family: 'Poppins', 'Pretendard';
    font-size:1rem;
    font-weight:400;
    letter-spacing:-0.3px;
    padding:8px 12px;
    border-radius:10px;
    border:0;
    background:${palette.gray100};
    box-shadow:1px 1px 0 rgba(0,0,0,.1);
  }
`;

const Logo = styled.img`
  width: 150px;
`;

const HeroSection = styled.section`
  display:flex;
  flex-direction:column;
  justify-content:center;
  height:80vh;
  text-align: center;
  padding: 100px 0;
`;

const Title = styled.h1`
  display:flex;
  flex-direction:column;
  gap:12px;
  font-size: 2rem;
  font-weight: 700;
  line-height:1.1;
  margin-bottom:124px;

  p {
    font-size:0.875rem;
    font-weight:400;
    color:${palette.gray800};
  }
`;

const InputSection = styled.div`
  display:flex;
  flex-direction:column;
  gap:48px;
  max-width: 820px;
  width:100%;
  margin:0 auto;

  > div {
    display:flex;
    flex-direction:column;
    padding: 24px 36px;
    border-radius: 24px;
    box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.15);
  }

  p {
    display:flex;
    align-itesm:center;
    gap:5px;
    font-size:1rem;
    color:${palette.gray800};
    text-align:left;
    padding-bottom:18px;
    margin-bottom:18px;
    border-bottom:1px dashed ${palette.black};

    i {
      font-family:'Segoe UI Emoji';
      font-size:0.88rem;
      font-style:normal;
    }
  }

  span {
    display:flex;
    align-items:center;
    gap:8px;
    font-size:0.88rem;
    color:${palette.gray300};
    margin-top:5px;
  }

  textarea {
    font-family: 'Pretendard', 'Poppins';
    font-size:1rem;
    border:0;
    rows:2;
    resize:none;
    outline:none;

    &::placeholder {
      color:${palette.gray300}
    }
  }
`;

const InputButton = styled.button`
  display:flex;
  align-items:center;
  gap:4px;
  max-width:none;
  width:auto;
  font-family: 'Pretendard', 'Poppins';
  font-size:1rem;
  color: palette.white
  letter-spacing:-1px;
  margin:0 auto;
  padding:15px 25px;
  border-radius:8px;
  border:0;
  background: #F3F7FA
  cursor: pointer;
  pointer-events: auto;
  transition:all .5s;

  i {
    font-size:1rem;
    font-style:normal;
  }
`;

const ImageGrid = styled.div`
  // display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  // gap: 20px;
  // margin: 50px 0;
  position:relative;
  max-width:2220px;
  width:100%;
  height:645px;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:26px;
  margin:0 auto;
  overflow:hidden;

  > div {
    display:flex;
    flex-direction:column;
  }

  img {
    filter: brightness(50%);
    border-radius:30px;
    transition:all .5s;

    &:hover {
      filter: brightness(100%);
      box-shadow:0 4px 28px rgba(0,0,0,.25);
    }
  }
`;

const AIPersonaSection = styled.section`
  position:relative;
  max-width:1500px;
  margin: 200px auto 200px;
  padding:210px 0 50px;
  overflow:hidden;

  h2 {
    max-width:1040px;
    margin:0 auto;
  }
`;

const AIPersona = styled.div`
  // position:absolute;
  // top:0;
  // right:0;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
  max-width:1040px;
  width:100%;
  margin:-355px auto 0;
`;

const ChatAIPersona = styled.div`
  position:relative;
  margin-left:auto;

  .cont {
    display:flex;
    flex-direction:column;
    gap:15px;
    text-align:left;
    padding:32px 40px 32px 64px;
    border-radius:30px;
    box-shadow:0 4px 20px rgba(0,0,0,.1);

    strong {
      display:flex;
      align-items:center;
      font-size:0.88rem;
      color:${palette.gray800};
      font-weight:400;

      span {
        font-weight:600;
        color:${palette.blue};

        &:after {
          display:inline-block;
          width:1px;
          height:10px;
          margin:0 16px;
          background:${palette.gray500};
          content:'';
        }
      }
    }

    p {
      font-size:1rem;
      color:${palette.gray700};
      line-height:1.3;
    }
  }

  .thumb {
    position:absolute;
    left:0;
    top:50%;
    transform:translate(-50%, -50%);
    width:82px;
    height:82px;
    border-radius:50%;
    background:#EDEDED;
    overflow:hidden;
  }
`;

const SectionTitle = styled.h2`
  display:flex;
  flex-direction:column;
  gap:32px;
  font-size: 2rem;
  font-weight: 600;
  line-height:1.1;
  text-align:left;

  p {
    font-size:1rem;
    font-weight:400;
    color:${palette.gray800};
    line-height:1.3;
  }
`;

const AIInsightSection = styled.section`
  padding: 200px 0;
  background:#F3F7FA;

  > div {
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:220px;
    max-width:1020px;
    margin:0 auto;
  }

  h2 {
    margin-right:17px;
  }
`;

const AIInsightUl = styled.ul`
  display:flex;
  flex-wrap:wrap;
  gap:16px;
  max-width:410px;
  // padding:20px;

  li {
    flex:1 1 30%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:16px;
    padding:19px 16px;
    border-radius:12px;
    background:${palette.white};

    &:last-child {
      background:${palette.blue};
    }
  }

  p {
    font-size:0.75rem;
    // letter-spacing:-1.8px;
  }
`;

const AIModeratorSection = styled.section`
  position:relative;
  max-width:1040px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin: 200px auto;
`;

const AIExpertSection = styled.section`
  padding:200px 0;
  background:#F3F7FA;

  > div {
    max-width:1040px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin:0 auto;
  }
`;

const ProposalSection = styled.section`
  max-width:1100px;
  display:flex;
  flex-direction:column;
  gap:42px;
  margin:200px auto;

  h3 {
    font-size:1.75rem;
    text-align:left;
    letter-spacing:-1px;
  }
`;

const ProposalButton = styled.div`
  display:flex;
  justify-content:space-between;
  gap:32px;

  a {
    flex:1 1 40px;
  }

  div {
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:40px 50px;
    border-radius:20px;
    background:#F3F7FA;
  }

  p {
    display:flex;
    flex-direction:column;
    gap:20px;
    font-size:1rem;
    color:${palette.gray500};
    text-align:left;
  }

  strong {
    font-size:1.5rem;
    color:${palette.black};
  }
`;

const Footer = styled.footer`
  padding: 60px 0;
  background: #EFEFEF;

  > div {
    max-width:1100px;
    display:flex;
    flex-direction:column;
    color:rgba(0,0,0,.6);
    text-align:left;
    margin:0 auto;

    > p {
      font-size:0.75rem;
    }
  }

  address {
    font-style:normal;
    display:flex;
    flex-direction:column;
    gap:16px;
    font-size:0.88rem;
    line-height:1.5;
    margin-bottom:50px;
  }
`;
