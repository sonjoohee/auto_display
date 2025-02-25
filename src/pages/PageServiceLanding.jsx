import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../assets/styles/ButtonStyle";
import { palette } from "../assets/styles/Palette";
import images from "../assets/styles/Images";
import { media } from '../assets/styles/Breakpoints';

const PageServiceLanding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textColor, setTextColor] = useState('#fff');
  const [logoColor, setLogoColor] = useState(palette.white);
  const [buttonColor, setButtonColor] = useState(palette.white);
  const totalSlides = 3;
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSection, setActiveSection] = useState(1);
  const [openContent, setOpenContent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(true); // 팝업 상태 추가
  const [scrollPosition, setScrollPosition] = useState(0); // 새로운 state 추가

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollPosition(scrollPosition); // 스크롤 위치 업데이트
      const isMobile = window.innerWidth <= 768; // 모바일 기준 너비 설정
      
      if (isMobile) {
        // 모바일일 때의 스크롤 위치 조건
        if (scrollPosition > 720) {
          setTextColor('#000');
          setLogoColor(palette.black);
        } else if (scrollPosition > 0) {
          setTextColor('#fff');
          setLogoColor(palette.white);
        }
        
        if (scrollPosition > 1500) {
          setTextColor('#fff');
          setLogoColor(palette.white);
        }
      } else {
        // PC일 때의 스크롤 위치 조건
        if (scrollPosition > 1100) {
          setTextColor('#000');
          setLogoColor(palette.black);
        } else if (scrollPosition > 0) {
          setTextColor('#fff');
          setLogoColor(palette.white);
        }
        if (scrollPosition > 2250) {
          setTextColor('#fff');
          setLogoColor(palette.white);
        }
      }

      if (scrollPosition < 600) {
        setButtonColor(palette.white);
      } else if (scrollPosition < 1800) {
        setButtonColor(palette.black);
      } else {
        setButtonColor(palette.white);
      }

      const mainVisual = document.querySelector('#mainVisual');
      const section01 = document.querySelector('#section01');
      const section02 = document.querySelector('#section02');
      const section03 = document.querySelector('#section03');
      const section04 = document.querySelector('#section04');
      const section05 = document.querySelector('#section05');

      const sections = [mainVisual, section01, section02, section03, section04, section05];
      
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(index + 1);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (sectionNumber) => {
    let targetSection;
    switch(sectionNumber) {
      case 1:
        targetSection = document.querySelector('#mainVisual');
        break;
      case 2:
        targetSection = document.querySelector('#section01');
        break;
      case 3:
        targetSection = document.querySelector('#section02');
        break;
      case 4:
        targetSection = document.querySelector('#section03');
        break;
      case 5:
        targetSection = document.querySelector('#section04');
        break;
      case 6:
        targetSection = document.querySelector('#section05');
        break;
      default:
        return;
    }

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleContent = (index) => {
    setOpenContent(openContent === index ? null : index);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    // 터치 이벤트인 경우와 마우스 이벤트인 경우를 구분
    const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    setStartX(pageX - e.currentTarget.offsetLeft);
    setScrollLeft(currentSlide);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    // 터치 이벤트인 경우와 마우스 이벤트인 경우를 구분
    const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const x = pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    const slideMove = Math.round(walk / e.currentTarget.offsetWidth);
    const newSlide = Math.max(0, Math.min(scrollLeft - slideMove, totalSlides - 1));
    
    setCurrentSlide(newSlide);
  };

  // 터치 이벤트 핸들러 추가
  const handleTouchStart = (e) => {
    handleMouseDown(e);
  };

  const handleTouchMove = (e) => {
    handleMouseMove(e);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      <Header textColor={textColor} scrollPosition={scrollPosition}>
        <h1 className="logo">
          <images.Logo2 color={logoColor} />
        </h1>
        <div className="gnb">
          <Link to="/blog">Blog</Link>
          <Button Large Round Primary Fill onClick={() => navigate('/')}>Get Started</Button>
        </div>
      </Header>

      <SectionButtonWrap buttonColor={buttonColor}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <span
            key={num}
            className={activeSection === num ? 'active' : ''}
            onClick={() => scrollToSection(num)}
          >
            {num}
          </span>
        ))}
      </SectionButtonWrap>

      <MainVisual id="mainVisual">
        <i />
        <div className="visual-text pc">
          <p>
            EXPERIENCE
            <span className="subtext01">SCALABLE RESEARCH</span>
          </p>
          <p>X</p>
          <p>
            PERSONA
            <span className="subtext02">
              HUMAN CONTEXT AI<br />
              AI FEEDBACK<br />
              AI INTERVIEW LAB
            </span>
          </p>
          <p>
            AI-DRIVEN INSIGHTS
            <span className="subtext03">ADAPTIVE PERSONA</span>
          </p>
          <p>R</p>
          <p>T</p>
        </div>

        <div className="visual-text mobile">
          <p>
            EXPERT<br />PERSONA
            <span className="subtext01">SCALABLE RESEARCH</span>
          </p>
          <p>
            EXPERIENCE<br />AI-DRIVEN<br />INSIGHT
            <span className="subtext02">
              HUMAN CONTEXT AI<br />
              AI FEEDBACK<br />
              AI INTERVIEW LAB
            </span>
          </p>
        </div>

        <div className="image-wrapper blur">
          <img src={images.ServiceLandingImages2} alt="" />
        </div>
        <div className="image-wrapper">
          <img src={images.ServiceLandingImages} alt="" />
        </div>

        <div className="scroll-down" />
      </MainVisual>

      <Section01 id="section01">
        <p>
          "X의 가능성: 경험, 맥락, 그리고 확장"<br />
          eXperience<br />
          conteXt<br />
          eXpansion
        </p>

        <h2>EXPERIENCE<br />CONTE &nbsp;&nbsp;T</h2>

        <strong>
          X를 통해 페르소나와 대화하고, 통찰을 얻고,<br />
          새로운 가능성을 발견해보세요.
        </strong>

        <button type="button" onClick={() => navigate('/')}>
          Start Now
          <span />
        </button>

        <span>"1분 만에 타겟 페르소나를 생성하고 인터뷰를 시작하세요."</span>

        <div className="bg-wrapper">
          <i className="icon01" />
          <i className="icon02" />
          <i className="icon03" />
        </div>
      </Section01>

      <Section02 id="section02">
        <div className="title">
          <h3>AI Persona</h3>
          <p>신뢰할 수 있는 AI Persona, 현실감 있는 대화의 시작</p>
        </div>

        <div className="content">
          <img src={images.ServiceLandingSection02} alt="" />

          <div className="text-wrapper">
            <p>신뢰할 수 있는 AI Persona, 현실감 있는 대화의 시작</p>

            <h3>"신뢰할 수 있는 데이터 연구로 탄생한 AI Persona,<br />대화 속에서 경험을 공유합니다."</h3>

            <div>
              <ul>
                <li>
                  <p>공공 데이터 가공 기술</p>
                  <p>(통계청, 학술 자료, 시장 조사 데이터 등 합성 기술)</p>
                </li>
                <li>
                  <p>프로파일링 패터닝 기술</p>
                  <p>(실존하는 연령, 직업, 관심사, 라이프스타일 등 패터닝)</p>
                </li>
                <li>
                  <p>동적 인터뷰 기술</p>
                  <p>(AI 모더레이팅을 통한 1:1 심층 인터뷰 및 1:N 퀵서베이)</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section02>

      <Section03 id="section03">
        <div className="title">
          <h3>AI - Powered New Research</h3>
          <p>
            interviewX.ai로 기존의 설문조사, 인터뷰 조사를 혁신하세요!<br />
          AI 하이퍼 페르소나 + AI 모더레이터 + AI 리서처로 빠르고 정교한 소비자 의견 조사
          </p>
        </div>

        <div className="content">
          <div className="box-content">
            <div className="content-text">
              <h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
                  <path d="M35.2264 25.6667C40.3811 25.6667 44.5597 21.488 44.5597 16.3333C44.5597 11.1787 40.3811 7 35.2264 7C30.0717 7 25.8931 11.1787 25.8931 16.3333C25.8931 21.488 30.0717 25.6667 35.2264 25.6667Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.55957 56.3333C8.55957 44.5507 19.3049 35 32.5596 35" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M35.2261 56.6665L40.1381 41.9305C40.2614 41.5628 40.4971 41.243 40.812 41.0165C41.1268 40.79 41.5049 40.6681 41.8927 40.6681C42.2806 40.6681 42.6587 40.79 42.9735 41.0165C43.2884 41.243 43.5241 41.5628 43.6474 41.9305L48.5594 56.6665M56.5594 40.6665V56.6665M37.8927 51.3332H45.8927" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                AI HYPER PERSONA
              </h4>
              <p className={openContent === 0 ? 'show' : ''}>실제 소비자처럼 반응하는 맞춤형 AI 페르소나 인터뷰</p>
              <ul className={openContent === 0 ? 'show' : ''}>
                <li>한 줄 아이디어만 입력하면 AI가 최적의 타겟 페르소나 자동 생성</li>
                <li>실제 인구통계 및 라이프스타일 데이터를 반영한 200+ 프로파일을 갖는 페르소나 기반 인터뷰</li>
                <li>20가지 소비자 유형 + 산업별 상위 10명 페르소나 추천으로 다양한 관점 분석</li>
                <li>나만의 맞춤형 페르소나 커스터마이징 가능 (Pro 모드 지원)</li>
                <li>기업 맞춤형 대량 AI 페르소나 생성 및 분석 지원 (엔터프라이즈 문의)</li>
              </ul>
            </div>

            <p className={openContent === 0 ? 'show' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M2.55957 20.5V9.5H5.55957V20.5H2.55957Z" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
                <path d="M5.55957 9.50004C9.1119 6.21504 11.1714 4.33171 11.7381 3.85004C12.5881 3.12704 13.5481 3.43054 13.5481 5.23954C13.5481 7.04854 10.9166 8.12204 10.9166 9.50004C10.9146 9.50871 14.2949 9.50921 21.0576 9.50154C21.2547 9.50128 21.4499 9.53987 21.6321 9.6151C21.8143 9.69033 21.9799 9.80074 22.1193 9.94C22.2588 10.0793 22.3695 10.2446 22.4451 10.4267C22.5206 10.6088 22.5595 10.8039 22.5596 11.001V11.0025C22.5596 11.1998 22.5208 11.3952 22.4454 11.5775C22.3699 11.7598 22.2593 11.9254 22.1198 12.0649C21.9803 12.2045 21.8147 12.3151 21.6325 12.3907C21.4502 12.4662 21.2549 12.505 21.0576 12.505H17.5511C16.9477 16.489 16.6149 18.6555 16.5526 19.0045C16.4586 19.527 15.9596 20.5 14.5256 20.5H5.55957V9.50004Z" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
              </svg>
              기존 리서치보다 빠르고 정밀한 소비자 이해!
            </p>

            <div className="more" onClick={() => toggleContent(0)}>
              <span>{openContent === 0 ? '세부내용 접기' : '세부내용 펼쳐보기'}</span>
              <i className={openContent === 0 ? 'open' : ''} />
            </div>
          </div>

          <div className="box-content">
            <div className="content-text">
              <h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
                  <path d="M57.8929 32.0002C57.2609 45.5522 45.5676 56.3548 31.2396 56.3548C29.5045 56.3566 27.7836 56.1984 26.0769 55.8802C24.8529 55.6482 24.2396 55.5335 23.8129 55.6002C23.3862 55.6642 22.7809 55.9868 21.5676 56.6295C18.1163 58.468 14.1448 59.0854 10.2982 58.3815C11.7669 56.5659 12.7628 54.4147 13.1969 52.1202C13.4636 50.7068 12.8049 49.3335 11.8129 48.3282C7.3169 43.7628 4.55957 37.6135 4.55957 30.8455C4.55957 16.7575 16.5062 5.3335 31.2396 5.3335C32.5942 5.3335 33.9231 5.42772 35.2262 5.61616M31.2156 32.0002H31.2369M41.8689 32.0002H41.8929M20.5596 32.0002H20.5836" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M39.2261 21L44.1381 6.264C44.2614 5.89625 44.4971 5.57654 44.812 5.35002C45.1268 5.12351 45.5049 5.00165 45.8927 5.00165C46.2806 5.00165 46.6587 5.12351 46.9735 5.35002C47.2884 5.57654 47.5241 5.89625 47.6474 6.264L52.5594 21M60.5594 5V21M41.8927 15.6667H49.8927" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                AI MODERATOR AUTO INTERVIEW
              </h4>
              <p className={openContent === 1 ? 'show' : ''}>실시간 AI 모더레이터로 1:1, 1:N, 퀵서베이 자동 진행</p>
              <ul className={openContent === 1 ? 'show' : ''}>
                <li>1:1 인뎁스 인터뷰 – 최대 3단계 심층 질문 & 추가 질문 가능</li>
                <li>1:N 인터뷰 – 최대 5명의 페르소나와 동시 인터뷰 진행</li>
                <li>퀵서베이 – 50명 이상 대량 응답 분석으로 빠른 시장 조사 가능</li>
                <li>실시간 미러룸 방식 – AI 인터뷰를 실시간으로 관찰하고 추가 질문 가능</li>
                <li>자동화된 대량 인터뷰로 연속적인 대규모 인사이트 확보 (엔터프라이즈 지원)</li>
              </ul>
            </div>

            <p className={openContent === 1 ? 'show' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M2.55957 20.5V9.5H5.55957V20.5H2.55957Z" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
                <path d="M5.55957 9.50004C9.1119 6.21504 11.1714 4.33171 11.7381 3.85004C12.5881 3.12704 13.5481 3.43054 13.5481 5.23954C13.5481 7.04854 10.9166 8.12204 10.9166 9.50004C10.9146 9.50871 14.2949 9.50921 21.0576 9.50154C21.2547 9.50128 21.4499 9.53987 21.6321 9.6151C21.8143 9.69033 21.9799 9.80074 22.1193 9.94C22.2588 10.0793 22.3695 10.2446 22.4451 10.4267C22.5206 10.6088 22.5595 10.8039 22.5596 11.001V11.0025C22.5596 11.1998 22.5208 11.3952 22.4454 11.5775C22.3699 11.7598 22.2593 11.9254 22.1198 12.0649C21.9803 12.2045 21.8147 12.3151 21.6325 12.3907C21.4502 12.4662 21.2549 12.505 21.0576 12.505H17.5511C16.9477 16.489 16.6149 18.6555 16.5526 19.0045C16.4586 19.527 15.9596 20.5 14.5256 20.5H5.55957V9.50004Z" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
              </svg>
              일반적 수준의 피드백은 비싼 패널 모집 없이, 즉각적 인터뷰 실행 & 실시간 인사이트 확보!
            </p>

            <div className="more" onClick={() => toggleContent(1)}>
              <span>{openContent === 1 ? '세부내용 접기' : '세부내용 펼쳐보기'}</span>
              <i className={openContent === 1 ? 'open' : ''} />
            </div>
          </div>

          <div className="box-content">
            <div className="content-text">
              <h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.05957 5C3.05957 4.17157 3.73114 3.5 4.55957 3.5H60.5596C61.388 3.5 62.0596 4.17157 62.0596 5C62.0596 5.82843 61.388 6.5 60.5596 6.5H56.5596V7V40C56.5596 42.2091 54.7687 44 52.5596 44H40.8586L47.8619 56.2558C48.2729 56.9751 48.0231 57.8913 47.3038 58.3024C46.5845 58.7134 45.6682 58.4635 45.2572 57.7442L37.4034 44H27.7158L19.8619 57.7442C19.4509 58.4635 18.5346 58.7134 17.8154 58.3024C17.0961 57.8913 16.8462 56.9751 17.2572 56.2558L24.2605 44H12.5596C10.3504 44 8.55957 42.2091 8.55957 40V7V6.5H4.55957C3.73114 6.5 3.05957 5.82843 3.05957 5ZM11.5596 7H53.5596V40C53.5596 40.5523 53.1119 41 52.5596 41H12.5596C12.0073 41 11.5596 40.5523 11.5596 40V7ZM24.0596 24C24.0596 23.1716 23.388 22.5 22.5596 22.5C21.7311 22.5 21.0596 23.1716 21.0596 24V30C21.0596 30.8284 21.7311 31.5 22.5596 31.5C23.388 31.5 24.0596 30.8284 24.0596 30V24ZM32.5596 18.5C33.388 18.5 34.0596 19.1716 34.0596 20V30C34.0596 30.8284 33.388 31.5 32.5596 31.5C31.7311 31.5 31.0596 30.8284 31.0596 30V20C31.0596 19.1716 31.7311 18.5 32.5596 18.5ZM44.0596 16C44.0596 15.1716 43.388 14.5 42.5596 14.5C41.7311 14.5 41.0596 15.1716 41.0596 16V30C41.0596 30.8284 41.7311 31.5 42.5596 31.5C43.388 31.5 44.0596 30.8284 44.0596 30V16Z" fill="white"/>
                </svg>
                AI RESEARCHER AUTOMATIC ANALYSIS
              </h4>
              <p className={openContent === 2 ? 'show' : ''}>맞춤형 조사 설계 & 자동 분석으로 빠른 의사결정 지원</p>
              <ul className={openContent === 2 ? 'show' : ''}>
                <li>제품 개발 단계별 맞춤형 질문 자동 추천 (아이디어~시장 확장)</li>
                <li>AI 기반 실시간 데이터 분석 및 주요 인사이트 요약 제공</li>
                <li>ChatGPT처럼 자연어로 질문하면 AI가 자동 조사 설계 및 문항 추천</li>
                <li>비즈니스 확장 및 시장 진출 전략 수립을 위한 대량 조사 지원  (엔터프라이즈 맞춤 지원)</li>
                <li>기업 맞춤형 보고서 자동 생성 (엔터프라이즈 맞춤 지원)</li>
              </ul>
            </div>

            <p className={openContent === 2 ? 'show' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path d="M2.55957 20.5V9.5H5.55957V20.5H2.55957Z" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
                <path d="M5.55957 9.50004C9.1119 6.21504 11.1714 4.33171 11.7381 3.85004C12.5881 3.12704 13.5481 3.43054 13.5481 5.23954C13.5481 7.04854 10.9166 8.12204 10.9166 9.50004C10.9146 9.50871 14.2949 9.50921 21.0576 9.50154C21.2547 9.50128 21.4499 9.53987 21.6321 9.6151C21.8143 9.69033 21.9799 9.80074 22.1193 9.94C22.2588 10.0793 22.3695 10.2446 22.4451 10.4267C22.5206 10.6088 22.5595 10.8039 22.5596 11.001V11.0025C22.5596 11.1998 22.5208 11.3952 22.4454 11.5775C22.3699 11.7598 22.2593 11.9254 22.1198 12.0649C21.9803 12.2045 21.8147 12.3151 21.6325 12.3907C21.4502 12.4662 21.2549 12.505 21.0576 12.505H17.5511C16.9477 16.489 16.6149 18.6555 16.5526 19.0045C16.4586 19.527 15.9596 20.5 14.5256 20.5H5.55957V9.50004Z" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
              </svg>
              데이터 기반으로 신속한 인사이트 확보 & 제품 전략 최적화!
            </p>

            <div className="more" onClick={() => toggleContent(2)}>
              <span>{openContent === 2 ? '세부내용 접기' : '세부내용 펼쳐보기'}</span>
              <i className={openContent === 2 ? 'open' : ''} />
            </div>
          </div>
        </div>
      </Section03>

      <Section04 id="section04" currentSlide={currentSlide}>
        <div className="title">
          <h3>Innovating X’s Insight</h3>
          <p>X는 데이터를 넘어선 인사이트의 시작입니다</p>
        </div>

        <div className="carousel">
          <div 
            className="carousel-container"
            style={{ 
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="carousel-item">
              <img src={images.CarouselImg01} alt="캐러셀 이미지 1" />
            </div>
            <div className="carousel-item">
              <img src={images.CarouselImg02} alt="캐러셀 이미지 2" />
            </div>
            <div className="carousel-item">
              <img src={images.CarouselImg03} alt="캐러셀 이미지 3" />
            </div>
          </div>

          <div className="carousel-indicators">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={currentSlide === index ? 'active' : ''}
              />
            ))}
          </div>
        </div>
      </Section04>

      <Section05 id="section05">
        <div className="title">
          <h3>We are<br />InterviewX</h3>
          <button>
            지금 시작하세요
            <span />
          </button>
        </div>

        <FaqWrap>
          <div>
            <h3>
              FAQ<em>?</em>
              <span onClick={() => navigate('/blog')}>Blog로 이동<i /></span>
            </h3>

            <FaqList>
              <li>
                <button onClick={() => toggleFaq(0)} className={`${openFaq === 0 ? 'open' : ''}`}>
                  <p>InterviewX.ai는 기존 시장조사 방식과 어떻게 다른가요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 0 ? 'open' : ''}`}>
                  <p className="gray">
                    기존 시장 조사는 패널 모집, 설문 설계, 데이터 분석 등에 많은 시간과 비용이 소요됩니다.<br />
                    InterviewX.ai는 AI 페르소나와 대화형 인터뷰를 통해 즉각적인 인사이트 도출이 가능하며, 기존 조사 방식보다 더 정밀하고 신뢰도 높은 피드백을 자동으로 분석합니다.
                  </p>
                  <p>
                    ✔ 빠른 실행 – 몇 분 만에 AI 페르소나와 인터뷰 진행<br />
                    ✔ 심층 분석 – 단순 응답이 아닌, 맥락과 감정을 반영한 피드백 제공<br />
                    ✔ 자동화된 인사이트 – 인터뷰 후 AI가 주요 인사이트를 요약하여 제공
                  </p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(1)} className={`${openFaq === 1 ? 'open' : ''}`}>
                  <p>InterviewX.ai는 어떤 사람이 사용하면 좋을까요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 1 ? 'open' : ''}`}>
                  <p className="gray">
                    🚀 스타트업 창업자 – 제품 아이디어 검증, 타겟 고객 인터뷰, 시장 반응 분석<br />
                    📢 마케팅 전문가 – 광고 메시지 테스트, 브랜드 포지셔닝, 캠페인 효과 분석<br />
                    🔬 UX 및 리서처 – 사용자 경험 조사, 제품 사용성 테스트, 소비자 심리 분석
                  </p>
                  <p>
                    InterviewX.ai는 소비자의 행동과 반응을 분석하여 맞춤형 피드백을 제공하는 강력한 AI 리서치 도구입니다.
                  </p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(2)} className={`${openFaq === 2 ? 'open' : ''}`}>
                  <p>InterviewX.ai의 AI 페르소나는 어떻게 신뢰성을 확보하나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 2 ? 'open' : ''}`}>
                  <p className="gray">
                    InterviewX.ai의 AI 페르소나는 단순한 챗봇이 아니라, 공공 데이터, 학술 연구, 시장 조사 데이터를 기반으로 학습된 AI 모델입니다.
                  </p>
                  <p>
                    ✔ 200개 이상의 실제 프로파일 반영 – 연령, 직업, 관심사, 소비 패턴 등<br />
                    ✔ 실제 사용자 인터뷰 데이터 학습 – 현실적인 반응을 제공하도록 설계<br />
                    ✔ 자동 데이터 검증 및 개선 – AI가 지속적으로 학습하며 정확도 향상<br />
                    따라서, AI 페르소나는 실제 소비자와 유사한 피드백을 제공하며, 신뢰할 수 있는 조사 결과를 생성합니다.
                  </p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(3)} className={`${openFaq === 3 ? 'open' : ''}`}>
                  <p>InterviewX.ai를 활용하면 어떤 조사가 가능한가요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 3 ? 'open' : ''}`}>
                  <p>
                    InterviewX.ai는 다양한 비즈니스 요구에 맞춰 유연한 인터뷰 방식을 제공합니다.<br />
                    📍 1:1 심층 인터뷰 – 개별 AI 페르소나와 심층적인 대화 진행<br />
                    📍 1:N 인터뷰 – 최대 5명의 AI 페르소나와 동시 인터뷰 가능<br />
                    📍 퀵서베이 – 50명 이상의 AI 페르소나를 대상으로 대량 의견 조사
                  </p>
                  <p className="gray">
                    이를 통해 제품 기획, 마케팅 전략 수립, 소비자 인사이트 분석 등의 다양한 리서치를 효율적으로 수행할 수 있습니다.
                  </p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(4)} className={`${openFaq === 4 ? 'open' : ''}`}>
                  <p>InterviewX.ai는 어떻게 시작하나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 4 ? 'open' : ''}`}>
                  <p className="gray">
                    InterviewX.ai는 누구나 쉽게 사용할 수 있도록 설계되었습니다.
                  </p>
                  <p>
                    아이디어 입력 – 조사할 제품이나 서비스 개요 입력<br />
                    ️페르소나 자동 생성 – AI가 맞춤형 타겟 페르소나 추천<br />
                    인터뷰 진행 – 1:1, 1:N, 퀵서베이 중 원하는 방식 선택<br />
                    결과 분석 – AI가 인터뷰 내용을 분석하여 주요 인사이트 제공<br />
                    👉 몇 분 만에 실행 가능하며, 누구나 쉽게 시작할 수 있습니다! 🚀
                  </p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(5)} className={`${openFaq === 5 ? 'open' : ''}`}>
                  <p>추가 문의가 필요한 경우 어떻게 하나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 5 ? 'open' : ''}`}>
                  <p>
                    InterviewX.ai에 대한 더 자세한 정보가 필요하시거나, 맞춤형 사용 방법을 상담받고 싶다면, 아래의 이메일을 통해 문의해 주세요.<br />
                    📧 이메일 문의 – info@userconnect.kr
                  </p>
                </div>
              </li>
              {/* 
              <li>
                <button onClick={() => toggleFaq(6)} className={`${openFaq === 6 ? 'open' : ''}`}>
                  <p>서비스를 이용하는 것은 무료인가요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 6 ? 'open' : ''}`}>
                  <p>예, InterviewX의 기본적인 기능은 모두 무료로 이용가능합니다만, 일부 맞춤형 기능은 사용자가 원하는 만큼의 토큰을 구매하여 이용이 가능합니다. InterviewX의 지속적 이용이 필요한 경우에는 구독 플랜을 통해 경제적으로 이용하는 것도 가능합니다.</p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(7)} className={`${openFaq === 7 ? 'open' : ''}`}>
                  <p>어떤 사람이 InterviewX를 사용하면 좋을까요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 7 ? 'open' : ''}`}>
                  <ul>
                    <li>창업 아이디어를 검증하려는 대학생 예비창업자</li>
                    <li>타겟 고객군에 대한 심층적인 데이터를 얻고 싶은 마케팅 전문가</li>
                    <li>사용자 경험을 개선하려는 UX 리서처</li>
                  </ul>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(8)} className={`${openFaq === 8 ? 'open' : ''}`}>
                  <p>InterviewX는 어떤 산업에서 유용한가요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 8 ? 'open' : ''}`}>
                  <p>현재 IT, 소비재, 교육, 헬스케어, 패션 등 소비자 대상의 다양한 B2C산업에서 활용 가능합니다.</p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(9)} className={`${openFaq === 9 ? 'open' : ''}`}>
                  <p>AI 분석 결과는 얼마나 신뢰할 수 있나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 9 ? 'open' : ''}`}>
                  <p>InterviewX는 AI 페르소나의 인터뷰 결과를 체계적으로 분석하여 실제 고객 인터뷰와 동일한 수준의 인사이트를 제공합니다.</p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(10)} className={`${openFaq === 10 ? 'open' : ''}`}>
                  <p>데이터는 어떻게 보호되나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 10 ? 'open' : ''}`}>
                  <p>InterviewX는 사용자 데이터를 안전하게 관리하며, 데이터 보호를 위한 최신 보안 프로토콜을 따릅니다.</p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(11)} className={`${openFaq === 11 ? 'open' : ''}`}>
                  <p>시장 검증을 반복적으로 실시하는 것이 필요할까요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 11 ? 'open' : ''}`}>
                  <p>지속적으로 데이터를 축적하고, 다양한 타겟 세그먼트를 공략하기 위한 전략을 구축하는 것이 필요하며, 고객의 성향이 트렌드에 따라 변화하면, 나만의 AI 고객 페르소나를 재생성하는 것이 필요합니다. 이는 Pro 구독 플랜을 통해 가능합니다.</p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(12)} className={`${openFaq === 12 ? 'open' : ''}`}>
                  <p>InterviewX의 구독은 어떤 점에서 유용한가요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 12 ? 'open' : ''}`}>
                  <p>시간이 지나며 쌓이는 데이터를 통해 고객의 변화된 니즈와 트렌드를 더 잘 이해할 수 있습니다.</p>
                </div>
              </li>
               */}
            </FaqList>
          </div>
        </FaqWrap>
      </Section05>

      <Footer>
        <div>
          <div className="address">
            <images.LogoType width="201" height="32" color={palette.white} />
            <strong>(주)유저커넥트</strong>

            <div>
              <p>
                사업자 등록번호: 678 - 81 - 01795
                <span>대표자: 박영수</span>
              </p>
              <p>
                통신판매업신고: 제 2025 - 경기안산 - 0424호
                <span>대표전화: 031 - 216 - 5930</span>
              </p>
              <p>
                고객센터 운영시간: 10:00 ~ 18:00
                <span>메일: info@userconnect.kr</span>
              </p>
              <p>
                주소: 경기도 안산시 상록구 해양3로 15, 1512호 ~ 1515호 (그랑시티 시그니처타워)
              </p>
            </div>
          </div>

          <div className="copyright">2025 Userconnect Inc. All rights reserved.</div>
        </div>
      </Footer>

      {/* {isPopupOpen && (
        <Popup>
          <div>
            <span className="close" onClick={() => setIsPopupOpen(false)} />
            <img src={images.Popup01} alt="" />
          </div>
        </Popup>
      )} */}
    </>
  );
};

export default PageServiceLanding;

const Header = styled.div`
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 88px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  padding: 10px;
  border-radius: 8px;
  background: transparent;
  transition: background 0.3s ease;

  ${media.mobile} {
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    padding: 20px 20px 40px;
    border-radius: 0;
    background: ${props => {
      if (props.scrollPosition > 1500) {
        return 'linear-gradient(180deg, #000 60%, rgba(0, 0, 0, 0.00) 100%)';
      } else if (props.scrollPosition > 720) {
        return 'linear-gradient(180deg, #FFF 60%, rgba(255, 255, 255, 0.00) 100%)';
      } else {
        return 'linear-gradient(180deg, #000 60%, rgba(0, 0, 0, 0.00) 100%)';
      }
    }};
  }

  .logo svg {
    ${media.mobile} {
      width: 155px;
      height: 24px;
    }
  }

  .gnb {
    display: flex;
    align-items: center;
    gap: 40px;

    a {
      position: relative;
      font-size: 1.19rem;
      font-weight: 500;
      color: ${props => props.textColor};
      line-height: 1.3;
      letter-spacing: -0.57px;
      transition: color 0.3s ease;

      ${media.mobile} {
        display: none;
      }
    }
  }
`;

const SectionButtonWrap = styled.div`
  position: fixed;
  top: 50%;
  right: 55px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 26px;
  z-index: 10;

  ${media.mobile} {
    display: none;
  }

  span {
    font-size: 0;
    width: 20px;
    height: 3px;
    border-radius: 5px;
    background: ${props => props.buttonColor};
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0.3;

    &.active {
      opacity: 1;
    }

    &:hover {
      opacity: 0.5;
    }
  }
`;

const MainVisual = styled.div`
  position: relative;
  width: 100%;
  height: 120vh;
  background: radial-gradient(114.49% 114.49% at 50% -14.49%, #000 0%, #000 88.09%, rgba(0, 0, 0, 0.00) 100%);
  overflow: hidden;

  ${media.mobile} {
    height: 100vh;
    background: radial-gradient(144.72% 66.79% at 50% 33.21%, #000 0%, #000 88.09%, rgba(0, 0, 0, 0.00) 100%);
  }

  i {
    position: absolute;
    top: 0;
    right: 15vw;
    width: 762px;
    height: 762px;
    border-radius: 50%;
    background: radial-gradient(50% 50% at 50% 50%, rgba(34, 111, 255, 0.45) 24%, rgba(0, 0, 0, 0.45) 90%, rgba(0, 0, 0, 0.45) 100%);

    ${media.mobile} {
      width: 486px;
      height: 486px;
      top: 15%;
      right: -80px;
      opacity: 0.8;
    }
  }

  .image-wrapper {
    position: absolute;
    top: 36%;
    left: 61%;
    transform: translate(-50%, -50%);
    opacity: 0; // 초기에는 투명하게
    animation: fadeIn 1s ease 1s forwards; // 1초 지연 후 1초 동안 페이드인

    ${media.mobile} {
      top: 50.5vh;
      left: 57vw;
    }

    &.blur {
      z-index: 0;
      transform: translate(-48%, -48%);
      opacity: 0;
      animation: fadeIn 1s ease 0.5s forwards; // blur 이미지는 0.5초 지연 후 페이드인

      img {
        filter: blur(20px) brightness(0);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  .visual-text {
    position: absolute;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    display: inline-flex;
    flex-direction: column;
    align-items: center;

    ${media.mobile} {
      display: none;
    }

    &.mobile {
      display: none;

      ${media.mobile} {
        display: flex;
        top: 40%;
      }
    }

    p {
      position: relative;
      font-size: 7.13rem;
      font-weight: 400;
      color: ${palette.white};
      letter-spacing: -3.42px;
      line-height: 0.8;
      text-shadow: 40px 40px 12px rgba(255, 255, 255, 0.10);

      ${media.mobile} {
        font-size: 3.75rem;
        line-height: 1;
        letter-spacing: -1.8px;
        text-align: left;
        text-shadow: 13px 13px 4px rgba(255, 255, 255, 0.06);
      }

      &:nth-child(1) {
        ${media.mobile} {
          margin-left: auto;
        }
      }

      &:nth-child(2) {
        margin-right: 170px;

        ${media.mobile} {
          margin-right: auto;
        }
      }

      &:nth-child(3) {
        margin-left: 245px;
      }

      &:nth-child(4) {
        margin-left: 9px;
      }

      &:nth-child(5), &:nth-child(6) {
        margin-right: 168px;
      }
    }

    span {
      position: absolute;
      font-size: 1rem;
      font-weight: 300;
      color: ${palette.lightGray};
      letter-spacing: -0.48px;
      line-height: 1.25;
      text-shadow: none;

      ${media.mobile} {
        font-size: 0.75rem;
      }

      &.subtext01 {
        top: -40px;
        right: 0;

        ${media.mobile} {
          right: 10vw;
          width: 100%;
        }
      }

      &.subtext02 {
        top: -40px;
        left: -200px;
        text-align: right;

        ${media.mobile} {
          left: 40%;
          top: auto;
          bottom: -10vh;
          width: 100%;
          text-align: left;
        }
      }

      &.subtext03 {
        top: 170px;
        left: 25px;
      }
    }
  }

  .scroll-down {
    position: absolute;
    bottom: 30vh;
    left: 50%;
    transform: translateX(-50%) rotate(-45deg);
    width: 24px;
    height: 24px;
    border-left: 2px solid ${palette.white};
    border-bottom: 2px solid ${palette.white};
    transition: opacity .3s;
    animation: sdb05 1.5s infinite;

    ${media.mobile} {
      bottom: 20vh;
      width: 18px;
      height: 18px;
    }

    @keyframes sdb05 {
      0% {transform: rotate(-45deg) translate(0, 0); opacity: 0;}
      50% {opacity: 1;}
      100% {transform: rotate(-45deg) translate(-20px, 20px); opacity: 0;}
    }
  }
`;

const Section01 = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: -10vh;

  ${media.mobile} {
    margin: 0 auto;
  }

  .bg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    i {
      position: absolute;
      display: block;
      background: url(${images.ServiceLandingSectionBg}) no-repeat center center / cover;

      &.icon01 {
        top: 25%;
        left: -50px;
        transform: rotate(-21deg);
        width: 398px;
        height: 410px;
        animation: float1 6s ease-in-out infinite;

        ${media.mobile} {
          top: 8%;
          left: -80px;
          width: 202px;
          height: 208px;
        }
      }

      &.icon02 {
        top: 17%;
        left: 63%;
        transform: rotate(-29deg);
        width: 58px;
        height: 60px;
        animation: float2 4s ease-in-out infinite;

        ${media.mobile} {
          top: 7%;
          left: 78%;
          width: 28px;
          height: 29px;
        }
      }

      &.icon03 {
        bottom: 16%;
        right: 22%;
        transform: rotate(30deg);
        width: 112px;
        height: 115px;
        animation: float3 5s ease-in-out infinite;

        ${media.mobile} {
          bottom: 10vh;
          right: -4%;
          width: 82px;
          height: 85px;
        }
      }
    }

    @keyframes float1 {
      0% {
        transform: rotate(-21deg) translateY(0px);
      }
      50% {
        transform: rotate(-21deg) translateY(-60px);
      }
      100% {
        transform: rotate(-21deg) translateY(0px);
      }
    }

    @keyframes float2 {
      0% {
        transform: rotate(-29deg) translateY(0px);
      }
      50% {
        transform: rotate(-29deg) translateY(-15px);
      }
      100% {
        transform: rotate(-29deg) translateY(0px);
      }
    }

    @keyframes float3 {
      0% {
        transform: rotate(30deg) translateY(0px);
      }
      50% {
        transform: rotate(30deg) translateY(-25px);
      }
      100% {
        transform: rotate(30deg) translateY(0px);
      }
    }
  }

  p {
    font-size: 2.25rem;
    font-weight: 500;
    color: ${palette.lightGray};
    line-height: 1.25;
    letter-spacing: -1.08px;

    ${media.mobile} {
      font-size: 1.13rem;
    }
  }

  h2 {
    position: relative;
    font-size: 5.75rem;
    font-weight: 500;
    color: #191919;
    line-height: 1.25;
    letter-spacing: -2.76px;

    ${media.mobile} {
      font-size: 3.75rem;
    }

    &::before {
      position: absolute;
      bottom: 8px;
      right: 65px;
      width: 111px;
      height: 111px;
      background: url(${images.ServiceLandingSection01}) no-repeat center center / contain;
      content: "";

      ${media.mobile} {
        width: 74px;
        height: 74px;
        bottom: 5px;
        right: 35px;
      }
    }
  }

  strong {
    font-size: 2.25rem;
    font-weight: 500;
    color: #191919;
    line-height: 1.25;
    letter-spacing: -1.08px;
    display: block;
    margin-top: 20px;

    ${media.mobile} {
      font-size: 1.25rem;
    }
  }

  button {
    font-family: Pretendard, "Poppins";
    font-size: 1.75rem;
    font-weight: 500;
    color: #191919;
    letter-spacing: -0.84px;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 28px 42px;
    margin: 48px auto 24px;
    border-radius: 50px;
    border: 2px solid ${palette.gray300};
    background: ${palette.white};
    transition: all .5s;

    ${media.mobile} {
      font-size: 1.13rem;
      padding: 12px 20px;
      margin: 20px auto 12px;
    }

    span {
      position: relative;
      width: 41px;
      height: 16px;

      ${media.mobile} {
        width: 20px;
        height: 8px;
      }

      &::before {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        border-radius: 4px;
        background: #191919;
        content: "";
      }

      &::after {
        position: absolute;
        bottom: 5px;
        right: 0;
        transform: rotate(40deg);
        width: 16px;
        height: 2px;
        border-radius: 4px;
        background: #191919;
        content: "";

        ${media.mobile} {
          bottom: 4px;
          width: 12px;
        }
      }
    }

    &:hover {
      border: 2px solid ${palette.gray300};
      background: rgba(25, 25, 25, 0.05);
    }
  }

  span {
    font-size: 1.25rem;
    font-weight: 500;
    color: #969696;
    letter-spacing: -0.6px;
    line-height: 1.3;

    ${media.mobile} {
      font-size: 0.75rem;
    }
  }
`;

const Section02 = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  // padding-top: 20vh;
  margin-top: -10vh;
  background: radial-gradient(114.49% 114.49% at 50% 114.49%, #000 0%, #000 88.09%, rgba(0, 0, 0, 0.00) 100%);

  ${media.mobile} {
    gap: 12px;
    padding: 205px 20px 100px;
    background: radial-gradient(200.49% 200.49% at 50% 200.49%, #000 0%, #000 96.09%, rgba(0, 0, 0, 0.00) 100%);
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    z-index: 2;

    ${media.mobile} {
      padding-top: 70px;
    }

    h3 {
      font-size: 4.5rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.25;
      letter-spacing: -2.16px;

      ${media.mobile} {
        width: 100%;
        font-size: 2.5rem;
      }
    }

    p {
      font-size: 2rem;
      font-weight: 700;
      color: ${palette.white};
      line-height: 1.3;
      letter-spacing: -0.96px;

      ${media.mobile} {
        font-size: 1rem;
      }
    }
  }

  img {
    position: relative;
    z-index: 1;

    ${media.mobile} {
      width: 70%;
    }
  }

  .content {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    ${media.mobile} {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    &:after {
      position: absolute;
      bottom: -300px;
      left: -230px;
      width: 890px;
      height: 890px;
      border-radius: 898px;
      background: radial-gradient(50% 50% at 50% 50%, rgba(34, 111, 255, 0.45) 0%, rgba(0, 0, 0, 0.45) 76%);
      content: "";
      z-index: 0;

      ${media.mobile} {
        bottom: 200px;
        left: -50px;
        width: 240px;
        height: 240px;
      }
    }
  }

  .text-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
    z-index: 1;

    ${media.mobile} {
      gap: 16px;
      text-align: center;
    }

    > p {
      display: none;
      font-size: 1rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.3;
      letter-spacing: -0.6px;
      text-align: left;
      display: none;

      ${media.mobile} {
      }
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.3;
      letter-spacing: -0.6px;
      text-align: center;

      ${media.mobile} {
        font-size: 0.88rem;
        font-weight: 400;
        color: #BCBCBC;
      }
    }

    > div {
      display: flex;
      flex-direction: column;

      ${media.mobile} {
        padding-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.30);
      }

      > p:nth-child(1) {
        margin-left: -60px;

        ${media.mobile} {
          margin-left: 0;
        }
      }

      > p:nth-child(2) {
        margin-left: -130px;

        ${media.mobile} {
          margin-left: 0;
        }
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      border-top: 1px solid rgba(255, 255, 255, 0.30);

      ${media.mobile} {
        border-top: none;
        gap: 16px;
      }

      li {
        font-size: 1.25rem;
        font-weight: 400;
        color: ${palette.white};
        line-height: 1.5;
        letter-spacing: -0.6px;
        padding: 12px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.30);

        ${media.mobile} {
          font-size: 1rem;
          padding: 0;
          border-bottom: none;
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 4px;
        }

        p {
          ${media.mobile} {
            font-size: 0.88rem;
            line-height: 1.3;
            letter-spacing: -0.54px;
          }

          &:nth-child(1) {
            ${media.mobile} {
              font-size: 1.13rem;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
`;

const Section03 = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 220px 0 290px;
  background: #010101;
  overflow: hidden;

  ${media.mobile} {
    padding: 100px 20px;
  }

  &:before {
    position: absolute;
    top: 0;
    right: -10%;
    width: 900px;
    height: 900px;
    border-radius: 50%;
    background: radial-gradient(50% 50% at 50% 50%, rgba(34, 111, 255, 0.45) 0%, rgba(0, 0, 0, 0.45) 76%);
    content: "";
    z-index: 0;

    ${media.mobile} {
      width: 380px;
      height: 380px;
      right: -120px;
      top: 110px;
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    max-width: 1024px;
    width: 100%;
    text-align: left;
    margin: 0 auto;
    z-index: 1;

    h3 {
      font-size: 4.5rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.25;
      letter-spacing: -2.16px;

      ${media.mobile} {
        font-size: 2.75rem;
      }
    }

    p {
      font-size: 2rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.3;
      letter-spacing: -0.96px;

      ${media.mobile} {
        font-size: 1.25rem;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 48px;
    max-width: 1024px;
    width: 100%;
    z-index: 1;

    ${media.mobile} {
      gap: 20px;
    }
  }

  .box-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid ${palette.white};
    transition: all .5s;

    ${media.mobile} {
      padding: 20px 16px 12px;
    }

    &:hover {
      border: 1px solid transparent;
      background: linear-gradient(180deg, rgba(34, 111, 255, 0.30) 0%, #020204 100%);
    }

    > p {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.5rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.5;
      letter-spacing: -0.72px;
      text-align: left;
      margin-top: 12px;

      ${media.mobile} {
        font-size: 1rem;
        display: none;
      }

      svg {
        flex-shrink: 0;
      }

      &.show {
        display: flex;
      }
    }

    .more {
      display: none;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      
      ${media.mobile} {
        display: flex;
      }

      span {
        font-size: 1rem;
        font-weight: 400;
        color: ${palette.lightGray};
        line-height: 1.5;
        letter-spacing: -0.48px;
      }

      i {
        width: 8px;
        height: 8px;
        border-right: 2px solid ${palette.lightGray};
        border-bottom: 2px solid ${palette.lightGray};
        transform: rotate(45deg);
      }
    }
  }

  .content-text {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;

    h4 {
      display: flex;
      flex-direction: column;
      gap: 32px;
      font-size: 2rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.2;
      letter-spacing: -0.96px;
      padding-bottom: 12px;
      border-bottom: 1px solid ${palette.white};

      ${media.mobile} {
        gap: 20px;
        font-size: 1.5rem;
      }

      svg {
        ${media.mobile} {
          width: 44px;
        }
      }
    }

    p {
      font-size: 1.25rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.5;
      letter-spacing: -0.6px;

      ${media.mobile} {
        display: none;
        
        &.show {
          display: block;
        }
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 8px;

      ${media.mobile} {
        display: none;
        
        &.show {
          display: flex;
        }
      }

      li {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 1rem;
        font-weight: 400;
        color: ${palette.white};
        line-height: 1.5;
        letter-spacing: -0.48px;

        ${media.mobile} {
          align-items: flex-start;
        }

        &::before {
          width: 20px;
          height: 20px;
          background: url(${images.IconCheck3}) no-repeat center center / 12px;
          content: "";
        }
      }
    }
  }

  .more {
    cursor: pointer;
    
    ${media.mobile} {
      display: flex;
    }
    display: none;
    
    i {
      transition: transform 0.3s ease;
      
      &.open {
        transform: rotate(-135deg);
      }
    }
  }
`;

const Section04 = styled.div`
  position: relative;
  width: 100%;
  padding: 210px 0 130px;
  background: #010101;
  overflow: hidden;

  ${media.mobile} {
    padding: 100px 0;
  }

  .title {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    ${media.mobile} {
      gap: 12px;
    }

    &::after {
      position: absolute;
      top: -100px;
      left: -320px;
      width: 890px;
      height: 890px;
      border-radius: 50%;
      background: radial-gradient(50% 50% at 50% 50%, rgba(34, 111, 255, 0.45) 0%, rgba(0, 0, 0, 0.45) 76%);
      content: "";
      z-index: 0;

      ${media.mobile} {
        width: 240px;
        height: 240px;
        top: 80px;
        left: 60%;
      }
    }

    h3 {
      font-size: 4.5rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.25;
      letter-spacing: -2.16px;
      z-index: 1;

      ${media.mobile} {
        font-size: 2.75rem;
      }
    }

    p {
      font-size: 2rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.3;
      letter-spacing: -0.96px;
      z-index: 1;

      ${media.mobile} {
        font-size: 1rem;
      }
    }
  }

  .carousel {
    position: relative;
    max-width: 1024px;
    width: 100%;
    margin: 80px auto 0;
    overflow: visible;
    z-index: 1;
    padding: 0;

    ${media.mobile} {
      overflow: hidden;
      padding: 0;
      margin: 40px auto 0;
      width: 100vw; // 전체 뷰포트 너비로 설정
      position: relative;
      left: 50%;
      transform: translateX(-50%); // 가운데 정렬
      padding: 0 20px;
    }

    .carousel-container {
      display: flex;
      transition: transform 0.5s ease;
      gap: 20px;
      transform: translateX(calc(-${props => props.currentSlide * 100}% - ${props => props.currentSlide * 20}px));

      ${media.mobile} {
        gap: 20px;
        width: 100%;
        transform: translateX(-${props => props.currentSlide * (100 + 6)}%);
      }
      user-select: none;
      touch-action: pan-y pinch-zoom;
    }

    .carousel-item {
      min-width: 1024px;
      margin: 0 auto;
      transform: scale(0.9);
      transition: all 0.5s ease;
      opacity: 0.5;

      ${media.mobile} {
        // min-width: calc(100% - 40px);
        min-width: 100%;
        padding: 0;
        transform: scale(1);
        opacity: 1;
        display: flex;
        justify-content: center;
        margin: 0;
      }
      
      &:nth-child(${props => props.currentSlide + 1}) {
        transform: scale(1);
        opacity: 1;

        ${media.mobile} {
          transform: scale(1);
        }
      }

      img {
        width: 100%;
        object-fit: cover;
        border-radius: 15px;

        ${media.mobile} {
          width: 100%;
        }
      }
    }

    .carousel-indicators {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 2;

      ${media.mobile} {
        display: none;
      }

      button {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${palette.white};
        border: none;
        padding: 0;
        cursor: pointer;
        opacity: 0.4;
        transition: all 0.3s;

        &.active {
          background: ${palette.white};
          border-radius: 10px;
          opacity: 1;
        }
      }
    }
  }
`;

const Section05 = styled.div`
  position: relative;
  width: 100%;
  padding: 85px 0 0;
  background: #010101;
  overflow: hidden;

  .title {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;
    padding: 370px 0 280px;

    ${media.mobile} {
      gap: 48px;
      padding: 200px 0 150px;
    }

    &:before {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 130px;
      border-radius: 10px;
      background: ${palette.white};
      content: "";

      ${media.mobile} {
        height: 55px;
      }
    }

    &:after {
      position: absolute;
      bottom: 120px;
      left: 40%;
      width: 900px;
      height: 900px;
      border-radius: 50%;
      background: radial-gradient(50% 50% at 50% 50%, rgba(34, 111, 255, 0.45) 0%, rgba(0, 0, 0, 0.45) 76%);
      content: "";

      ${media.mobile} {
        width: 320px;
        height: 320px;
        bottom: 140px;
        left: -5%;
      }
    }

    h3 {
      font-size: 5.75rem;
      font-weight: 500;
      color: ${palette.white};
      line-height: 1.25;
      letter-spacing: -2.76px;
      z-index: 1;
      
      ${media.mobile} {
        font-size: 2.75rem;
      }
    }

    button {
      font-family: Pretendard, "Poppins";
      font-size: 1.75rem;
      font-weight: 500;
      color: ${palette.white};
      letter-spacing: -0.84px;
      line-height: 1;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 28px 42px;
      border-radius: 50px;
      border: 2px solid ${palette.white};
      background: transparent;
      z-index: 1;
      transition: all 0.3s;

      ${media.mobile} {
        font-size: 1rem;
        padding: 12px 16px;
      }
  
      span {
        position: relative;
        width: 41px;
        height: 16px;

        ${media.mobile} {
          width: 20px;
          height: 8px;
        }
  
        &::before {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          border-radius: 4px;
          background: ${palette.white};
          content: "";
        }
  
        &::after {
          position: absolute;
          bottom: 5px;
          right: 0;
          transform: rotate(40deg);
          width: 16px;
          height: 2px;
          border-radius: 4px;
          background: ${palette.white};
          content: "";

          ${media.mobile} {
            bottom: 3px;
            width: 12px;
            height: 2px;
          }
        }
      }

      &:hover {
        background: rgba(255, 255, 255, 0.10);
      }
    }
  }
`;

const FaqWrap = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 285px;
  width: 100%;
  margin: 0 auto;
  padding: 104px 0;
  background: #191919;
  overflow: hidden;

  ${media.mobile} {
    padding: 20px;
  }

  > div {
    display: flex;
    gap: 285px;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    ${media.mobile} {
      flex-direction: column;
      gap: 32px;
    }
  }

  h3 {
    font-size: 4rem;
    font-weight: 500;
    color: ${palette.white};
    line-height: 1.25;
    letter-spacing: -1.92px;
    z-index: 1;
    display: flex;

    ${media.mobile} {
      font-size: 2rem;
      text-align: left;
    }

    em {
      font-style: normal;
      display: none;
      
      ${media.mobile} {
        display: block;
      }
    }

    span {
      display: none;
      align-items: center;
      gap: 8px;
      font-size: 1.13rem;
      font-weight: 500;
      line-height: 1.3;
      letter-spacing: -0.54px;
      cursor: pointer;

      ${media.mobile} {
        display: flex;
        margin-left: auto;
      }

      i {
        position: relative;
        width: 20px;
        height: 8px;

        &:before,
        &:after {
          position: absolute;
          height: 2px;
          border-radius: 4px;
          background: ${palette.white};
          content: "";
        }

        &:before {
          bottom: 0;
          width: 100%;
        }

        &:after {
          right: 0;
          bottom: 4px;
          transform: rotate(45deg);
          width: 10px;
        }
      }
    }
  }
`;

const FaqList = styled.ul`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #585858;
  width: 100%;

  li {
    border-bottom: 1px solid #585858;
    
    button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      text-align: left;
      background: transparent;
      border: none;
      cursor: pointer;

      ${media.mobile} {
        padding: 12px 0;
      }

      p {
        font-family: Pretendard, "Poppins";
        font-size: 1.25rem;
        font-weight: 500;
        color: ${palette.white};
        line-height: 1.25;
        letter-spacing: -0.6px;

        ${media.mobile} {
          font-size: 1rem;
        }
      }

      i {
        width: 24px;
        height: 24px;
        position: relative;
        transition: transform 0.3s ease;

        &::before,
        &::after {
          content: '';
          position: absolute;
          background-color: ${palette.white};
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        &::before {
          width: 2px;
          height: 12px;
          transition: opacity 0.3s ease;
        }

        &::after {
          width: 12px;
          height: 2px;
        }
      }

      &.open i:before {
        opacity: 0;
      }
    }

    .answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      padding: 0 32px 0 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      &.open {
        max-height: 500px;
        padding-bottom: 16px;

        & + button i::before {
          opacity: 0;
        }
      }

      p {
        font-size: 1rem;
        font-weight: 400;
        color: ${palette.white};
        line-height: 1.5;
        letter-spacing: -0.48px;
        text-align: left;

        &.gray {
          color: ${palette.lightGray};
        }
      }

      ul {
        display: flex;
        align-items: flex-start;
        flex-direction: column;

        li {
          position: relative;
          font-size: 1rem;
          font-weight: 400;
          color: ${palette.white};
          line-height: 1.25;
          letter-spacing: -0.48px;
          text-align: left;
          padding-left: 24px;
          border: 0;

          &::before {
            position: absolute;
            top: 9px;
            left: 9px;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: ${palette.white};
            content: '';
          }
        }
      }
    }
  }
`;

const Footer = styled.div`
  position: relative;
  width: 100%;
  padding: 155px 0 115px;
  background: ${palette.black};

  ${media.mobile} {
    padding: 40px 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 180px;
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;

    ${media.mobile} {
      gap: 24px;
    }
  }

  .address {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    text-align: left;

    svg {
      position: absolute;
      bottom: 0;
      right: 0;

      ${media.mobile} {
        position: relative;
        bottom: auto;
        right: auto;
        width: 100px;
      }
    }

    strong {
      font-size: 1rem;
      font-weight: 600;
      color: ${palette.white};
      line-height: 1.2;
      letter-spacing: -0.48px;

      ${media.mobile} {
        display: none;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 10px;

      ${media.mobile} {
        gap: 8px;
      }

      p {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 1rem;
        font-weight: 400;
        color: ${palette.white};
        line-height: 1.2;
        letter-spacing: -0.48px;

        ${media.mobile} {
          font-size: 0.75rem;
          color: #B1B1B1;
          gap: 10px;
          flex-wrap: wrap;
        }

        span {
          display: flex;
          align-items: center;
          gap: 20px;

          ${media.mobile} {
            gap: 10px;
          }

          &:before {
            width: 1px;
            height: 12px;
            background: ${palette.white};
            content: '';
          }
        }
      }
    }
  }

  .copyright {
    font-size: 1rem;
    font-weight: 400;
    color: #ECECEC;
    line-height: 1.2;
    letter-spacing: -0.48px;
    text-align: left;

    ${media.mobile} {
      font-size: 0.75rem;
    }
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);

  > div {
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 438px;
    height: auto;
    overflow: hidden;

    ${media.mobile} {
      width: calc(100vw - 40px);
    }
  }

  img{
    border-radius: 15px;

    ${media.mobile} {
      width: 100%;
    }
  }

  .close {
    position: absolute;
    top: 32px;
    right: 32px;
    width: 16px;
    height: 16px;
    cursor: pointer;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width:100%;
      height: 2px;
      border-radius: 4px;
      background: ${palette.gray700};
      content: '';
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }
`;
