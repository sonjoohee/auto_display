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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 5000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isMobile = window.innerWidth <= 768; // 모바일 기준 너비 설정
      
      if (isMobile) {
        // 모바일일 때의 스크롤 위치 조건
        if (scrollPosition > 700) {
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
        if (scrollPosition > 1200) {
          setTextColor('#000');
          setLogoColor(palette.black);
        } else if (scrollPosition > 0) {
          setTextColor('#fff');
          setLogoColor(palette.white);
        }
        
        if (scrollPosition > 2400) {
          setTextColor('#fff');
          setLogoColor(palette.white);
        }
      }

      if (scrollPosition < 400) {
        setButtonColor(palette.white);
      } else if (scrollPosition < 2100) {
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

  return (
    <>
      <Header textColor={textColor}>
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
            PERSONA<br />AI-DRIVEN<br />INSIGHT
            <span className="subtext02">
              HUMAN CONTEXT AI<br />
              AI FEEDBACK<br />
              AI INTERVIEW LAB
            </span>
          </p>
        </div>

        <div className="image-wrapper blur">
          <img src={images.ServiceLandingImages2} alt="" />
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="168" height="170" viewBox="0 0 168 170" fill="none">
            <g opacity="0.8" filter="url(#filter0_f_262_1483)">
              <path d="M7.57608 151.118C8.98798 148.898 11.4363 147.554 14.0671 147.554H49.1218C51.5267 147.554 53.7834 148.716 55.1798 150.674C57.2733 153.609 55.2037 157.687 51.5985 157.731L11.526 158.211C7.85962 158.254 5.60826 154.212 7.57608 151.118Z" fill="black"/>
            </g>
            <g opacity="0.8" filter="url(#filter1_f_262_1483)">
              <path d="M154.424 151.118C153.013 148.898 150.564 147.554 147.933 147.554H112.879C110.474 147.554 108.217 148.716 106.821 150.674C104.727 153.609 106.797 157.687 110.402 157.731L150.474 158.211C154.141 158.254 156.392 154.212 154.424 151.118Z" fill="black"/>
            </g>
            <g filter="url(#filter2_bi_262_1483)">
              <path d="M76.8594 103.008L80.0547 100.376L84.002 94.3616L122.722 150.186H112.336C109.314 150.186 106.492 148.673 104.82 146.155L91.5205 126.127L76.8594 103.008Z" fill="url(#paint0_linear_262_1483)" fill-opacity="0.5"/>
            </g>
            <g filter="url(#filter3_bi_262_1483)">
              <path d="M76.8594 103.008L80.0547 100.376L84.002 94.3616L122.722 150.186H112.336C109.314 150.186 106.492 148.673 104.82 146.155L91.5205 126.127L76.8594 103.008Z" fill="url(#paint1_linear_262_1483)" fill-opacity="0.5"/>
            </g>
            <g filter="url(#filter4_bi_262_1483)">
              <path d="M80.2456 43.6074L83.441 46.2389L87.3882 52.2537L124.417 4.57764e-05H114.031C111.008 4.57764e-05 108.187 1.5134 106.515 4.03119L93.215 24.0593L80.2456 43.6074Z" fill="url(#paint2_linear_262_1483)" fill-opacity="0.5"/>
            </g>
            <g filter="url(#filter5_bi_262_1483)">
              <path d="M80.2456 43.6074L83.441 46.2389L87.3882 52.2537L124.417 4.57764e-05H114.031C111.008 4.57764e-05 108.187 1.5134 106.515 4.03119L93.215 24.0593L80.2456 43.6074Z" fill="url(#paint3_linear_262_1483)" fill-opacity="0.5"/>
            </g>
            <g filter="url(#filter6_bi_262_1483)">
              <path d="M16.4531 7.47182C14.4347 4.21623 16.7761 0.00964355 20.6067 0.00964355H30.9989L69.5312 73.3151H57.2754L16.4531 7.47182Z" fill="url(#paint4_linear_262_1483)" fill-opacity="0.5"/>
            </g>
            <g filter="url(#filter7_bi_262_1483)">
              <path d="M16.4532 7.47185C14.4348 4.21626 16.7762 0.00964355 20.6067 0.00964355H30.9989L69.5312 73.3151H57.2762L16.4532 7.47185Z" fill="url(#paint5_linear_262_1483)" fill-opacity="0.5"/>
            </g>
            <g filter="url(#filter8_bi_262_1483)">
              <path d="M13.2675 142.877C11.2059 146.131 13.5436 150.38 17.3957 150.38H31.1316L20.4373 144.72L39.181 113.297L65.6425 73.3149H57.3436L13.2675 142.877Z" fill="url(#paint6_linear_262_1483)" fill-opacity="0.5"/>
            </g>
            <g filter="url(#filter9_bi_262_1483)">
              <path d="M13.2675 142.877C11.2059 146.131 13.5436 150.38 17.3957 150.38H31.1316L21.9326 147.622C20.6872 147.248 20.0335 145.884 20.5228 144.679L23.1937 138.105L65.0913 73.3149H57.3436L13.2675 142.877Z" fill="url(#paint7_linear_262_1483)" fill-opacity="0.5"/>
            </g>
            <g filter="url(#filter10_b_262_1483)">
              <path d="M23.2138 150.38C22.0008 150.38 20.99 149.95 20.1814 149.091C19.3728 148.088 18.9685 147.014 18.9685 145.869C18.9685 145.439 19.0359 145.009 19.1706 144.58C19.3054 144.15 19.4402 143.721 19.575 143.291L64.2517 73.691L22.6073 7.09852C22.203 6.23926 22.0008 5.38001 22.0008 4.52075C22.0008 3.37507 22.4052 2.3726 23.2138 1.51335C24.0224 0.510877 25.0332 0.00964355 26.2461 0.00964355H51.1115C52.8636 0.00964355 54.2112 0.510877 55.1546 1.51335C56.2328 2.51581 57.0415 3.44668 57.5806 4.30594L84.6697 47.054L111.961 4.30594C112.5 3.44668 113.309 2.51581 114.387 1.51335C115.465 0.510877 116.88 0.00964355 118.632 0.00964355H142.285C143.363 0.00964355 144.306 0.510877 145.115 1.51335C146.058 2.3726 146.53 3.37507 146.53 4.52075C146.53 5.52322 146.26 6.38247 145.721 7.09852L104.077 73.4762L148.956 143.291C149.225 143.721 149.36 144.15 149.36 144.58C149.495 145.009 149.562 145.439 149.562 145.869C149.562 147.014 149.158 148.088 148.349 149.091C147.541 149.95 146.53 150.38 145.317 150.38H119.643C117.891 150.38 116.476 149.879 115.398 148.876C114.454 147.874 113.713 147.014 113.174 146.298L83.6588 101.187L54.3461 146.298C53.9418 147.014 53.2005 147.874 52.1223 148.876C51.1789 149.879 49.7638 150.38 47.877 150.38H23.2138Z" fill="url(#paint8_linear_262_1483)" fill-opacity="0.5"/>
            </g>
            <g filter="url(#filter11_bi_262_1483)">
              <path d="M23.2138 150.38C22.0008 150.38 20.99 149.95 20.1814 149.091C19.3728 148.088 18.9685 147.014 18.9685 145.869C18.9685 145.439 19.0359 145.009 19.1706 144.58C19.3054 144.15 19.4402 143.721 19.575 143.291L64.2517 73.691L22.6073 7.09852C22.203 6.23926 22.0008 5.38001 22.0008 4.52075C22.0008 3.37507 22.4052 2.3726 23.2138 1.51335C24.0224 0.510877 25.0332 0.00964355 26.2461 0.00964355H51.1115C52.8636 0.00964355 54.2112 0.510877 55.1546 1.51335C56.2328 2.51581 57.0415 3.44668 57.5806 4.30594L84.6697 47.054L111.961 4.30594C112.5 3.44668 113.309 2.51581 114.387 1.51335C115.465 0.510877 116.88 0.00964355 118.632 0.00964355H142.285C143.363 0.00964355 144.306 0.510877 145.115 1.51335C146.058 2.3726 146.53 3.37507 146.53 4.52075C146.53 5.52322 146.26 6.38247 145.721 7.09852L104.077 73.4762L148.956 143.291C149.225 143.721 149.36 144.15 149.36 144.58C149.495 145.009 149.562 145.439 149.562 145.869C149.562 147.014 149.158 148.088 148.349 149.091C147.541 149.95 146.53 150.38 145.317 150.38H119.643C117.891 150.38 116.476 149.879 115.398 148.876C114.454 147.874 113.713 147.014 113.174 146.298L83.6588 101.187L54.3461 146.298C53.9418 147.014 53.2005 147.874 52.1223 148.876C51.1789 149.879 49.7638 150.38 47.877 150.38H23.2138Z" fill="url(#paint9_linear_262_1483)" fill-opacity="0.5"/>
            </g>
            <g filter="url(#filter12_bdi_262_1483)">
              <path d="M23.2341 150.38C22.0211 150.38 21.0103 149.95 20.2017 149.091C19.393 148.088 18.9888 147.014 18.9888 145.869C18.9888 145.439 19.0561 145.009 19.1909 144.58C19.3257 144.15 19.4604 143.721 19.5952 143.291L64.272 73.691L22.6276 7.09852C22.2233 6.23926 22.0211 5.38001 22.0211 4.52075C22.0211 3.37507 22.4254 2.3726 23.2341 1.51335C24.0427 0.510877 25.0534 0.00964355 26.2664 0.00964355H51.1318C52.8838 0.00964355 54.2315 0.510877 55.1749 1.51335C56.2531 2.51581 57.0618 3.44668 57.6008 4.30594L84.6899 47.054L111.981 4.30594C112.52 3.44668 113.329 2.51581 114.407 1.51335C115.485 0.510877 116.9 0.00964355 118.652 0.00964355H142.305C143.383 0.00964355 144.326 0.510877 145.135 1.51335C146.078 2.3726 146.55 3.37507 146.55 4.52075C146.55 5.52322 146.281 6.38247 145.742 7.09852L104.097 73.4762L148.976 143.291C149.246 143.721 149.38 144.15 149.38 144.58C149.515 145.009 149.582 145.439 149.582 145.869C149.582 147.014 149.178 148.088 148.37 149.091C147.561 149.95 146.55 150.38 145.337 150.38H119.663C117.911 150.38 116.496 149.879 115.418 148.876C114.474 147.874 113.733 147.014 113.194 146.298L83.6791 101.187L54.3663 146.298C53.962 147.014 53.2208 147.874 52.1426 148.876C51.1992 149.879 49.7841 150.38 47.8973 150.38H23.2341Z" fill="url(#paint10_linear_262_1483)" fill-opacity="0.5" shape-rendering="crispEdges"/>
            </g>
            <g filter="url(#filter13_i_262_1483)">
              <path d="M23.2341 150.38C22.0211 150.38 21.0103 149.95 20.2017 149.091C19.393 148.088 18.9888 147.014 18.9888 145.869C18.9888 145.439 19.0561 145.009 19.1909 144.58C19.3257 144.15 19.4604 143.721 19.5952 143.291L64.272 73.691L22.6276 7.09852C22.2233 6.23926 22.0211 5.38001 22.0211 4.52075C22.0211 3.37507 22.4254 2.3726 23.2341 1.51335C24.0427 0.510877 25.0534 0.00964355 26.2664 0.00964355H51.1318C52.8838 0.00964355 54.2315 0.510877 55.1749 1.51335C56.2531 2.51581 57.0618 3.44668 57.6008 4.30594L84.69 47.054L111.981 4.30594C112.52 3.44668 113.329 2.51581 114.407 1.51335C115.485 0.510877 116.9 0.00964355 118.652 0.00964355H142.305C143.383 0.00964355 144.326 0.510877 145.135 1.51335C146.078 2.3726 146.55 3.37507 146.55 4.52075C146.55 5.52322 146.281 6.38247 145.742 7.09852L104.097 73.4762L148.976 143.291C149.246 143.721 149.38 144.15 149.38 144.58C149.515 145.009 149.582 145.439 149.582 145.869C149.582 147.014 149.178 148.088 148.37 149.091C147.561 149.95 146.55 150.38 145.337 150.38H119.663C117.911 150.38 116.496 149.879 115.418 148.876C114.475 147.874 113.733 147.014 113.194 146.298L83.6791 101.187L54.3663 146.298C53.962 147.014 53.2208 147.874 52.1426 148.876C51.1992 149.879 49.7841 150.38 47.8973 150.38H23.2341Z" fill="white" fill-opacity="0.1"/>
            </g>
            <defs>
              <filter id="filter0_f_262_1483" x="0.00410128" y="140.711" width="62.8561" height="24.3432" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="3.42153" result="effect1_foregroundBlur_262_1483"/>
              </filter>
              <filter id="filter1_f_262_1483" x="99.1403" y="140.711" width="62.8561" height="24.3432" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="3.42153" result="effect1_foregroundBlur_262_1483"/>
              </filter>
              <filter id="filter2_bi_262_1483" x="65.5816" y="83.0838" width="68.4183" height="78.3805" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.63888"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_262_1483" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="0.375925"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_262_1483"/>
              </filter>
              <filter id="filter3_bi_262_1483" x="65.5816" y="83.0838" width="68.4183" height="78.3805" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.63888"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_262_1483" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="0.375925"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_262_1483"/>
              </filter>
              <filter id="filter4_bi_262_1483" x="68.9678" y="-11.2778" width="66.7267" height="74.8092" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.63888"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_262_1483" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="0.375925"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_262_1483"/>
              </filter>
              <filter id="filter5_bi_262_1483" x="68.9678" y="-11.2778" width="66.7267" height="74.8092" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.63888"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_262_1483" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="0.375925"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_262_1483"/>
              </filter>
              <filter id="filter6_bi_262_1483" x="4.43415" y="-11.2681" width="76.3749" height="95.8609" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.63888"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_262_1483" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="0.375925"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_262_1483"/>
              </filter>
              <filter id="filter7_bi_262_1483" x="4.43415" y="-11.2681" width="76.3749" height="95.8609" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.63888"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_262_1483" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="0.375925"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_262_1483"/>
              </filter>
              <filter id="filter8_bi_262_1483" x="1.22297" y="62.0372" width="75.6974" height="99.6202" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.63888"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_262_1483" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="0.375925"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_262_1483"/>
              </filter>
              <filter id="filter9_bi_262_1483" x="1.22297" y="62.0372" width="75.1461" height="99.6202" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.63888"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_262_1483" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="0.375925"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_262_1483"/>
              </filter>
              <filter id="filter10_b_262_1483" x="11.45" y="-7.50886" width="145.631" height="165.407" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="3.75925"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_262_1483" result="shape"/>
              </filter>
              <filter id="filter11_bi_262_1483" x="11.45" y="-7.50886" width="145.631" height="165.407" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="3.75925"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_262_1483" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="0.751851"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_262_1483"/>
              </filter>
              <filter id="filter12_bdi_262_1483" x="16.2324" y="-2.74677" width="151.395" height="172.675" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.37821"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_262_1483"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="10.5259" dy="12.0296"/>
                <feGaussianBlur stdDeviation="3.75925"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.435294 0 0 0 0 1 0 0 0 0.16 0"/>
                <feBlend mode="normal" in2="effect1_backgroundBlur_262_1483" result="effect2_dropShadow_262_1483"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_262_1483" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="0.751851"/>
                <feGaussianBlur stdDeviation="0.375925"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
                <feBlend mode="normal" in2="shape" result="effect3_innerShadow_262_1483"/>
              </filter>
              <filter id="filter13_i_262_1483" x="12.1864" y="-3.61827" width="137.396" height="153.998" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="-7.25582" dy="-3.62791"/>
                <feGaussianBlur stdDeviation="3.40117"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_262_1483"/>
              </filter>
              <linearGradient id="paint0_linear_262_1483" x1="82.8934" y1="100.94" x2="119.884" y2="150.186" gradientUnits="userSpaceOnUse">
                <stop stop-color="#3F3F3F"/>
                <stop offset="0.2" stop-color="#9D9D9D"/>
                <stop offset="1" stop-color="#9D9D9D"/>
              </linearGradient>
              <linearGradient id="paint1_linear_262_1483" x1="82.8934" y1="100.94" x2="119.884" y2="150.186" gradientUnits="userSpaceOnUse">
                <stop stop-color="#3F3F3F"/>
                <stop offset="0.2" stop-color="#9D9D9D"/>
                <stop offset="1" stop-color="#9D9D9D"/>
              </linearGradient>
              <linearGradient id="paint2_linear_262_1483" x1="84.588" y1="49.2463" x2="121.578" y2="7.20724e-05" gradientUnits="userSpaceOnUse">
                <stop stop-color="#9D9D9D"/>
                <stop offset="0.5" stop-color="#003599"/>
                <stop offset="1"/>
              </linearGradient>
              <linearGradient id="paint3_linear_262_1483" x1="84.588" y1="49.2463" x2="121.578" y2="7.20724e-05" gradientUnits="userSpaceOnUse">
                <stop stop-color="#9D9D9D"/>
                <stop offset="0.5" stop-color="#003599"/>
                <stop offset="1"/>
              </linearGradient>
              <linearGradient id="paint4_linear_262_1483" x1="24.722" y1="0.00964354" x2="56.6359" y2="73.3151" gradientUnits="userSpaceOnUse">
                <stop/>
                <stop offset="0.5" stop-color="#003599"/>
                <stop offset="1" stop-color="#737373"/>
              </linearGradient>
              <linearGradient id="paint5_linear_262_1483" x1="24.722" y1="0.00964354" x2="56.6359" y2="73.3151" gradientUnits="userSpaceOnUse">
                <stop/>
                <stop offset="0.5" stop-color="#003599"/>
                <stop offset="1" stop-color="#737373"/>
              </linearGradient>
              <linearGradient id="paint6_linear_262_1483" x1="24.8344" y1="150.38" x2="59.4502" y2="74.5001" gradientUnits="userSpaceOnUse">
                <stop stop-color="#CECECE"/>
                <stop offset="0.5" stop-color="#9D9D9D"/>
                <stop offset="1" stop-color="#737373"/>
              </linearGradient>
              <linearGradient id="paint7_linear_262_1483" x1="24.8344" y1="150.38" x2="59.4502" y2="74.5001" gradientUnits="userSpaceOnUse">
                <stop stop-color="#CECECE"/>
                <stop offset="0.5" stop-color="#9D9D9D"/>
                <stop offset="1" stop-color="#737373"/>
              </linearGradient>
              <linearGradient id="paint8_linear_262_1483" x1="66.3932" y1="0.0096444" x2="104.867" y2="159.402" gradientUnits="userSpaceOnUse">
                <stop/>
                <stop offset="0.14" stop-color="#226FFF"/>
                <stop offset="0.345" stop-color="#226FFF"/>
                <stop offset="0.54" stop-color="white"/>
                <stop offset="1" stop-color="white"/>
              </linearGradient>
              <linearGradient id="paint9_linear_262_1483" x1="66.3932" y1="0.0096445" x2="104.116" y2="162.973" gradientUnits="userSpaceOnUse">
                <stop/>
                <stop offset="0.14" stop-color="#226FFF"/>
                <stop offset="0.345" stop-color="#226FFF" stop-opacity="0.5"/>
                <stop offset="0.54" stop-color="white" stop-opacity="0.2"/>
                <stop offset="1" stop-color="white" stop-opacity="0"/>
              </linearGradient>
              <linearGradient id="paint10_linear_262_1483" x1="66.4135" y1="0.00964477" x2="104.888" y2="164.101" gradientUnits="userSpaceOnUse">
                <stop/>
                <stop offset="0.14" stop-color="#226FFF"/>
                <stop offset="0.345" stop-color="#226FFF" stop-opacity="0.5"/>
                <stop offset="0.54" stop-color="white" stop-opacity="0.2"/>
                <stop offset="1" stop-color="white" stop-opacity="0"/>
              </linearGradient>
            </defs>
          </svg> */}
        </div>
        {/* <div className="image-wrapper">
          <img src={images.ServiceLandingImages} alt="" />
        </div> */}

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
        <div>
          <img src={images.ServiceLandingSection02} alt="" />

          <div className="text-wrapper">
            <h3>AI PERSONA</h3>

            <div>
              <p>신뢰할 수 있는 AI Persona, 현실감 있는 대화의 시작</p>
              <p>"신뢰할 수 있는 데이터 연구로 탄생한 AI Persona,<br />대화 속에서 경험을 공유합니다."</p>
              
              <ul>
                <li>
                  <p>공공 데이터 가공 기술</p>
                  <p>(통계청, 학술 자료, 시장 조사 데이터 등 합성 기술)</p>
                </li>
                <li>
                  <p>프로파일링 패터닝 기술</p>
                  <p>(실존하는 연령, 직업, 관심사, 라이프스타일 등의 패터닝)</p>
                </li>
                <li>
                  <p>동적 인터뷰 기술</p>
                  <p>(AI 모더레이팅을 통한 1:1 심층 인터뷰 및 1:N 퀵서베이 지원)</p>
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

            <p>
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

            <p>
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

            <p>
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
          <h3>INNOVATING X's INSIGHTS</h3>
          <p>X는 데이터를 넘어선 인사이트의 시작입니다</p>
        </div>

        <div className="carousel">
          <div 
            className="carousel-container"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
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
            <h3>FAQ</h3>

            <FaqList>
              <li>
                <button onClick={() => toggleFaq(0)} className={`${openFaq === 0 ? 'open' : ''}`}>
                  <p>InterviewX는 어떤 서비스인가요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 0 ? 'open' : ''}`}>
                  <p>InterviewX는 AI 기반 사용자 인터뷰 플랫폼으로, 창업에 관심이 있는 대학생이나 예비 창업가, 마케팅분야 종사자, UX 연구자 등이 신속하게 고객 피드백을 수집하고, 시장 검증을 통해 더 나은 의사결정을 내릴 수 있도록 돕는 도구입니다.</p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(1)} className={`${openFaq === 1 ? 'open' : ''}`}>
                  <p>InterviewX는 어떤 문제를 해결해 주나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 1 ? 'open' : ''}`}>
                  <p>시간과 비용이 많이 드는 전통적인 인터뷰 방식 대신, AI 페르소나를 활용하여 고객 피드백을 자동화하고 데이터 기반으로 실행 가능한 인사이트를 제공합니다.</p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(2)} className={`${openFaq === 2 ? 'open' : ''}`}>
                  <p>AI 페르소나는 어떻게 작동하나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 2 ? 'open' : ''}`}>
                  <p>AI 페르소나는 AI가 개개인의 연령, 직업, 관심사, 행동 패턴 등의 총 300개 이상의 데이터를 학습하여, 타겟 고객의 행동과 반응을 시뮬레이션하고 실제와 가까운 답변을 제공합니다.</p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(3)} className={`${openFaq === 3 ? 'open' : ''}`}>
                  <p>InterviewX로 무엇을 할 수 있나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 3 ? 'open' : ''}`}>
                  <p>AI 페르소나, AI 타겟고객, 분야별 AI 전문가와 다양한 방식으로 인터뷰를 진행하고, 인사이트를 얻을 수 있습니다.</p>
                  <ul>
                    <li>타겟 고객 페르소나와의 1:N 인터뷰</li>
                    <li>타겟 고객 1:1 심층 인터뷰 (나만의 맞춤형 인터뷰 질문 지원)</li>
                    <li>분야별 AI 전문가 인터뷰</li>
                    <li>인터뷰 결과 분석</li>
                    <li>자동화된 분석 보고서 제공</li>
                  </ul>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(4)} className={`${openFaq === 4 ? 'open' : ''}`}>
                  <p>InterviewX는 어떻게 시작하나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 4 ? 'open' : ''}`}>
                  <p>간단한 창업 아이디어 또는 창업 아이템에 대한 간단한 설명을 입력하면, AI 비즈니스 분석 및  AI 페르소나를 생성하고 인터뷰를 실행한 후 결과를 제공합니다.</p>
                </div>
              </li>
              <li>
                <button onClick={() => toggleFaq(5)} className={`${openFaq === 5 ? 'open' : ''}`}>
                  <p>사용자가 직접 질문을 작성해야 하나요?</p>
                  <i />
                </button>
                <div className={`answer ${openFaq === 5 ? 'open' : ''}`}>
                  <p>기본 제공 질문 템플릿이 있으며, 필요에 따라 맞춤형 질문을 작성할 수도 있습니다.</p>
                </div>
              </li>
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

  ${media.mobile} {
    top: 20px;
    width: calc(100% - 20px);
    padding: 0;
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
    height: 780px;
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
    top: 47%;
    left: 61%;
    transform: translate(-50%, -50%);

    ${media.mobile} {
      top: 49%;
    }

    &.blur {
      z-index: 0;
      transform: translate(-48%, -48%);
      // opacity: 0.6;
        
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(10px);
        background: rgba(0, 0, 0, 0.3);
        z-index: -1;
      }

      img {
        filter: blur(20px) brightness(0);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
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
          right: 30%;
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
          bottom: -100px;
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
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) rotate(-45deg);
    width: 24px;
    height: 24px;
    border-left: 2px solid ${palette.white};
    border-bottom: 2px solid ${palette.white};
    transition: opacity .3s;
    animation: sdb05 1.5s infinite;

    ${media.mobile} {
      bottom: 30%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -110px auto;
  padding: 330px 0 300px;
  overflow: hidden;

  ${media.mobile} {
    margin: 0 auto;
    padding: 120px 0 110px;
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

        ${media.mobile} {
          bottom: 0;
          right: -4%;
          width: 82px;
          height: 85px;
        }
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
      font-size: 1.25rem;
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

    ${media.mobile} {
      font-size: 1.25rem;
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
  padding: 590px 0 380px;
  background: radial-gradient(114.49% 114.49% at 50% 114.49%, #000 0%, #000 88.09%, rgba(0, 0, 0, 0.00) 100%);

  ${media.mobile} {
    padding: 205px 0 100px;
    background: radial-gradient(200.49% 200.49% at 50% 200.49%, #000 0%, #000 96.09%, rgba(0, 0, 0, 0.00) 100%);
  }

  img {
    position: relative;
    z-index: 1;

    ${media.mobile} {
      width: 80%;
      padding-top: 56px;
    }
  }

  > div {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 50px;

    ${media.mobile} {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    &:after {
      position: absolute;
      bottom: -470px;
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
    gap: 30px;
    text-align: left;
    z-index: 1;

    > div {
      display: flex;
      flex-direction: column;
      gap: 56px;
      margin-top: 17px;

      ${media.mobile} {
        gap: 15px;
        margin-top: 24px;
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
      gap: 16px;
    }
  }

  h3 {
    position: absolute;
    top: -130px;
    left: -190px;
    font-size: 4.5rem;
    font-weight: 500;
    color: ${palette.white};
    line-height: 1.25;
    letter-spacing: -2.16px;

    ${media.mobile} {
      top: -280px;
      left: 0;
      font-size: 2.75rem;
    }
  }

  p {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${palette.white};
    line-height: 1.3;
    letter-spacing: -0.6px;

    ${media.mobile} {
      font-size: 1rem;
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

    &:hover {
      border: 0;
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

      ${media.mobile} {
        font-size: 1rem;
        display: none;
      }

      svg {
        flex-shrink: 0;
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
  padding: 250px 0 130px;
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
        font-size: 1.25rem;
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
      padding: 0 20px;
      margin: 40px auto 0;
    }

    .carousel-container {
      display: flex;
      transition: transform 0.5s ease;
      gap: 20px;
      transform: translateX(calc(-${props => props.currentSlide * 100}% - ${props => props.currentSlide * 20}px));

      ${media.mobile} {
        gap: 20px;
        transform: translateX(calc(-${props => props.currentSlide * 100}% - ${props => props.currentSlide * 20}px));
      }
    }

    .carousel-item {
      min-width: 1024px;
      margin: 0 auto;
      transform: scale(0.9);
      transition: all 0.5s ease;
      opacity: 0.5;

      ${media.mobile} {
        min-width: calc(100vw - 40px);
        padding: 0;
        transform: scale(1);
        opacity: 1;
        display: flex;
        justify-content: center;
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

    ${media.mobile} {
      font-size: 2rem;
      text-align: left;
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
        line-height: 1.25;
        letter-spacing: -0.48px;
        text-align: left;
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
        }

        span {
          display: flex;
          align-items: center;
          gap: 20px;

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
