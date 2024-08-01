import styled from "styled-components";
import { palette } from "./Palette";

export const HashTag = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:10px;
`;

export const Tag = styled.a`
  font-size:${props => {
    if (props.Line) return `0.75rem`;
    else return `0.88rem`;
  }};
  display:inline-flex;
  gap:10px;
  align-items:center;
  height:${props => {
    if (props.Line) return `auto`;
    else return `33px`;
  }};
  color:${props => {
    if (props.White) return palette.darkGray;
    else if (props.Line) return palette.gray;
    else return palette.black;
  }};
  padding:${props => {
    if (props.Line) return `4px 8px`;
    else return `8px 16px`;
  }};
  border-radius:${props => {
    if (props.Line) return `5px`;
    else return `10px`;
  }};
  border:${props => {
    if (props.Line) return `1px solid ${palette.lineGray}`;
    else return `0`;
  }};
  background: ${props => {
    if (props.Gray) return 'rgba(52,58,64,.08)';
    else if (props.Red) return 'rgba(252,48,48,.08)';
    else if (props.Green) return 'rgba(81,216,136,.2)';
    else if (props.Blue) return 'rgba(4,83,244,.1)';
    else if (props.White) return palette.white;
    else return 'none';
  }};
`;

