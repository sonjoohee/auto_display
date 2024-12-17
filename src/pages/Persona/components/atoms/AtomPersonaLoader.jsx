import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";

const AtomPersonaLoader = ({ message = "비즈니스를 분석하고 있어요..." }) => {

  return (
    <>
    <LoaderWrap>
      <Loader />
      <p>{message}</p>
    </LoaderWrap>
    </>
  );
};

export default AtomPersonaLoader;

const LoaderWrap = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:50px;
  padding: 70px 0 50px;

  p {
    line-height:1.3;
    color:${palette.gray700};
  }
`;

const Loader = styled.span`
  position: relative;
  width: 120px;
  height: 120px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side,#009dff 94%,#0000) top/14.1px 14.1px no-repeat,
    conic-gradient(#0000 30%,#009dff);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 14.1px),#000 0);
  animation: spinner 1.2s infinite linear;

  @keyframes spinner {
    100% {
        transform: rotate(1turn);
    }
  }
`;
