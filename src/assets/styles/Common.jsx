import styled, { css } from "styled-components";
import { palette } from "./Palette";

export const ContentsWrap = styled.div`
  position:relative;
  max-width:1240px;
  width:100%;
  margin:110px auto 0;
`;


export const Popup = styled.div`
  position:${props => {
    if (props.Panel) return `absolute`;
    else return `fixed`;
  }};
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:${props => {
    if (props.Panel) return `none`;
    else return `rgba(0,0,0,.8)`;
  }};
  transition: all .5s;
  z-index:99;

  .textCenter {text-align:center;}

  h1 {
    font-size:1.75rem;
    margin-bottom:40px;

    span {
      display:block;
      font-size:0.875rem;
      color:${palette.blue};
      margin-bottom:5px;
    }
  }

  > div {
    position:${props => {
      if (props.Panel) return `absolute`;
      else return `fixed`;
    }};
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    width:${props => {
      if (props.Panel) return `130%`;
      else return `100%`;
    }};
    max-width:${props => {
      if (props.Panel) return `450px`;
      else return `860px`;
    }};
    text-align:left;
    padding:20px;
    border-radius:10px;
    background:${palette.white};
    box-shadow:${props => {
      if (props.Panel) return `4px 4px 30px rgba(0,0,0,.15)`;
      else return `none`;
    }};

    > span {
      position:absolute;
      right:20px;
      top:20px;
      width:20px;
      height:20px;
      cursor:pointer;

      &:before, &:after {
        position:absolute;
        top:50%;
        left:50%;
        width:1px;
        height:100%;
        background:${palette.black};
        content:'';
      }  
      &:before {transform:translate(-50%, -50%) rotate(45deg);}
      &:after {transform:translate(-50%, -50%) rotate(-45deg);}
    }

    > div {
      max-height:60vh;
      overflow-y:auto;
    }
  }

  .panelInfo {
    display:flex;
    align-items:center;
    gap:10px;

    .thumb {
      width:42px;
      height:42px;
      border-radius:100px;
      overflow:hidden;

      img {
        height:100%;
      }
    }

    .cont {
      font-size:0.88rem;

      strong {
        font-size:1.13rem;
        font-weight:700;
        display:block;
        margin-bottom:5px;
      }
    }
  }

  .panelTag {
    display:flex;
    gap:5px;
    margin-top:15px;
  }

  .subTitle {
    padding:0;
    border:0;

    + .subTitle {margin-top:60px;}

    .title {
      display:flex;
      align-items:center;
      gap:10px;
      font-size:1.125rem;
      padding-bottom:10px;
      border-bottom:1px solid ${palette.gray};

      span {
        width:22px;
        height:22px;
        font-size:0.875rem;
        line-height:22px;
        display:inline-flex;
        justify-content:center;
        color:${palette.white};
        border-radius:5px;
        background:${palette.blue};
      }
    }

    .desc {
      padding-top:10px;

      p {
        font-size:1rem !important;
        color:${palette.darkGray};
        line-height:1.4;
        padding:0;
        margin:0;
        border:0;

        &.dot {
          position:relative;
          margin-left:16px;
          padding-left:8px;

          &:before {
            position:absolute;
            top:10px;
            left:0;
            width:3px;
            height:3px;
            border-radius:50%;
            background:${palette.darkGray};
            content:'';
          }
        }
      }
    }
  }

  h3 {
    font-size:1.5rem;
    // color:${palette.white};
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:15px 30px;
    border-radius:10px 10px 0 0;
    border-bottom:1px solid ${palette.lineGray};
    // background:${palette.black};

    span {
      position:relative;
      width:40px;
      height:40px;
      cursor:pointer;

      &:before, &:after {
        position:absolute;
        top:50%;
        left:50%;
        width:1px;
        height:100%;
        background:${palette.black};
        content:'';
      }  
      &:before {transform:translate(-50%, -50%) rotate(45deg);}
      &:after {transform:translate(-50%, -50%) rotate(-45deg);}
    }
  }

  h4 {
    font-size:1.5rem;
    font-weight:700;
    display:block;
  }

  ul {
    margin-bottom:40px;
  }

  li {
    display:flex;
    align-items:center;
    gap:10px;

    + li {
      margin-top:10px;
    }

    p, strong {
      font-size:1.25rem;
      font-weight:400;
      color:${palette.black};
      margin:0;
      padding:0;
    }

    strong {
      color:${palette.gray};
    }
  }
  
  ${(props) =>
    props.Error &&
    css`
      > div {
        max-width:500px;
      }
  `}
`;
