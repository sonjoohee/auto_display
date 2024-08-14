import React from "react";
import styled from "styled-components";
import { palette } from "../assets_copy/styles/Palette";

const Loading2 = () => {
  return (
    <>
      <LoadingWrap>
        <Spinner>Loading...</Spinner>
      </LoadingWrap>
    </>
  );
};

export default Loading2;

const LoadingWrap = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  overflow:hidden;
`;

const Spinner = styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 11em;
  height: 11em;
  font-size: 10px;
  text-indent: -9999em;
  margin: 0 auto;
  border-radius: 50%;
  background: ${palette.blue};
  background: linear-gradient(to right, #0453F4 10%, #fff 42%);
  animation: load3 1.4s infinite linear;

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    border-radius: 100% 0 0 0;
    background: #0453F4;
    content: '';
  }

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;