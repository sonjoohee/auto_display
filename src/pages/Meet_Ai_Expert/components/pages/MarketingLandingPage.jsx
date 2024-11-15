import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useAtom } from 'jotai';
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import Landingimages from "../../../../assets/styles/Landingimages"
import { INPUT_BUSINESS_INFO } from '../../../AtomStates';

const MarketingLandingPage = () => {

  return (
    <></>
  );
};

export default MarketingLandingPage;

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
  color:${(props) => (
    props.isActive 
    ? palette.white 
    : palette.gray500)};
  letter-spacing:-1px;
  margin:0 auto;
  padding:15px 25px;
  border-radius:8px;
  border:0;
  background: ${(props) => (
    props.isActive 
    ? palette.blue 
    : '#F3F7FA')};
  cursor:${(props) => (
    props.isActive 
    ? `pointer` 
    : `auto`)};
    pointer-events:${(props) => (
      props.isActive 
      ? `auto` 
      : `none`)};
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
