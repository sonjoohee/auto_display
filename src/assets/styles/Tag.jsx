import styled from "styled-components";
import { palette } from "./Palette";

export const HashTag = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:10px;
`;

export const Tag = styled.a`
  font-size:0.88rem;
  display:inline-flex;
  gap:10px;
  align-items:center;
  height:33px;
  color:${props => {
    if (props.White) return palette.darkGray;
    else return palette.black;
  }};
  padding:8px 16px;
  border-radius:10px;

  background: ${props => {
    if (props.Gray) return 'rgba(52,58,64,.08)';
    else if (props.Red) return 'rgba(252,48,48,.08)';
    else if (props.Green) return 'rgba(81,216,136,.2)';
    else if (props.Blue) return 'rgba(4,83,244,.1)';
    else if (props.White) return palette.white;
    else return 'none';
  }};
`;

