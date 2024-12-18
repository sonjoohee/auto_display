import styled from "styled-components";
import { palette } from "./Palette";

export const ContentsWrap = styled.div`
  // overflow: ${({ noScroll }) => (noScroll ? "hidden" : "auto")};
  position: relative;
  // width: ${(props) => (props.isMobile ? "100%" : "calc(100% - 40px)")};
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  gap: ${(props) => (props.isMobile ? "20px" : "40px")};
  padding: ${(props) => (props.isMobile ? "20px" : "0")};
  min-height: 100vh;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: ${(props) => {
    if (props.row) return `row`;
    else return `column`;
  }};
  // gap: 32px;
  gap: ${(props) => {
    if (props.row) return `16px`;
    else return `32px`;
  }};
`;

export const MainContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  // min-height: 100vh;
  width: 100%;
  justify-content: flex-start;
  padding: 57px 0 40px;
  margin: 0 auto;
  // padding: ${(props) => (props.isMobile ? "0" : "0 20px")};
`;

export const AnalysisWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 16px;
  margin-top: 44px;
  overflow: visible;
`;

export const MainSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => {
    if (props.Column) return `column`;
    else return `row`;
  }};
  align-items: ${(props) => {
    if (props.Column) return `flex-start`;
    else return `center`;
  }};
  gap: ${(props) => {
    if (props.Column) return `8px`;
    else return `0`;
  }};
  width: 100%;

  h3 {
    font-weight: 500;
    color: ${palette.gray800};
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.primary};
      cursor: pointer;
    }
  }

  .required {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 4px;
    font-size: 1rem;

    &:after {
      content: "*";
      color: ${palette.red};
    }
  }
`;

export const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CustomizePersona = styled.div`
  display: flex;
  flex-direction: ${(props) => {
    if (props.row) return `row`;
    else return `column`;
  }};
  flex-wrap: wrap;
  // flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

export const AccordionSection = styled.div`
  width: 100%;
  margin-top: 20px;
  padding-top: 40px;
  border-top: 1px solid ${palette.outlineGray};
`;

export const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5;
  color: ${palette.gray800};
  padding: 16px;
  background: ${palette.white};
  cursor: pointer;
`;

export const AccordionIcon = styled.span`
  width: 10px;
  height: 10px;
  border-right: 2px solid ${palette.gray800};
  border-bottom: 2px solid ${palette.gray800};
  transform: ${(props) =>
    props.$isExpanded ? "rotate(225deg)" : "rotate(45deg)"};
  transition: transform 0.5s;
`;

export const AccordionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-height: ${(props) => (props.$isExpanded ? "500px" : "0")};
  margin-top: ${(props) => (props.$isExpanded ? "20px" : "0")};
  padding-bottom: 5px;
  overflow: hidden;
  background: ${palette.white};
  transition: all 0.5s;
`;

export const CustomAccordionIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 8px;
    border-right: 2px solid ${palette.gray500};
    border-bottom: 2px solid ${palette.gray500};
    transform: translate(-50%, -50%)
      ${(props) => (props.isOpen ? "rotate(-135deg)" : "rotate(45deg)")};
    transition: transform 0.3s ease;
  }
`;

export const CustomAccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.None ? "0" : "16px")};
  // padding: 16px;
  background: ${(props) => (props.None ? "transparent" : palette.chatGray)};
  // background: ${palette.chatGray};
  border-radius: 10px;
  cursor: pointer;
  font-size: ${(props) => (props.None ? "1rem" : "0.875rem")};
  // font-size: 0.875rem;
  color: ${(props) => (props.None ? palette.gray800 : palette.gray700)};
  // color: ${palette.gray700};
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => (props.None ? "transparent" : palette.gray100)};
    // background: ${palette.gray100};
  }
`;

export const CustomAccordionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: ${(props) => (props.None ? "0" : "20px 16px")};
  // padding: 20px 16px;
  border: 1px solid ${(props) => (props.None ? "none" : props.outlineGray)};
  // border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  margin-top: 12px;
  background: ${palette.white};
`;
