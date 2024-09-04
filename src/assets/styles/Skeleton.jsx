import styled, { keyframes } from "styled-components";
import { palette } from "./Palette";

export const loadingAnimation = keyframes`
  0% {
    background-position: -1000px;
  }
  100% {
    background-position: 1200px;
  }
`;


export const SkeletonH1 = styled.h1`
  width: 40%;
  height: 28px;
  border-radius: 6px;
  margin-bottom: 20px;
  // animation: shimmer 1.5s infinite linear;
  animation: ${loadingAnimation} 3s infinite linear;
  background: #F4F4F4;
  background-image: -webkit-linear-gradient(to right, #F4F4F4 0%, #FCFCFC 20%, #F4F4F4 40%, #F4F4F4 100%);
  background-image: linear-gradient(to right, #F4F4F4 0%, #FCFCFC 20%, #F4F4F4 40%, #F4F4F4 100%);
  background-repeat: no-repeat;

  @keyframes shimmer {
    0% {
      background-position: -100%;
    }
    100% {
      background-position: 100%;
    }
  }
`;

export const SkeletonTitle = styled.div`
  width: 20%;
  height: 22px;
  border-radius: 6px;
  margin-bottom: 10px;
  // animation: shimmer 1.5s infinite linear;
  animation: ${loadingAnimation} 3s infinite linear;
  background: #F4F4F4;
  background-image: -webkit-linear-gradient(to right, #F4F4F4 0%, #FCFCFC 20%, #F4F4F4 40%, #F4F4F4 100%);
  background-image: linear-gradient(to right, #F4F4F4 0%, #FCFCFC 20%, #F4F4F4 40%, #F4F4F4 100%);
  background-repeat: no-repeat;

  @keyframes shimmer {
    0% {
      background-position: -100%;
    }
    100% {
      background-position: 100%;
    }
  }
`;

export const SkeletonLine = styled.div`
  width: 100%;
  height: 16px;
  border-radius: 6px;
  margin-top: 8px;
  // animation: shimmer 1.5s infinite linear;
  animation: ${loadingAnimation} 3s infinite linear;
  background: #F4F4F4;
  background-image: -webkit-linear-gradient(to right, #F4F4F4 0%, #FCFCFC 20%, #F4F4F4 40%, #F4F4F4 100%);
  background-image: linear-gradient(to right, #F4F4F4 0%, #FCFCFC 20%, #F4F4F4 40%, #F4F4F4 100%);
  background-repeat: no-repeat;

  @keyframes shimmer {
    0% {
      background-position: -100%;
    }
    100% {
      background-position: 100%;
    }
  }
`;
