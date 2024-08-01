import styled from "styled-components";
import { palette } from "./Palette";

// input
export const InputField = styled.input`
  width:100%;
  height:${props => {
    if (props.None) return `40px`;
    else return `50px`;
  }};
  font-family: 'Pretendard';
  font-size:1rem;
  color:${palette.black};
  padding:${props => {
    if (props.None) return `6px 0`;
    else return `8px 16px`;
  }};
  border:${props => {
    if (props.None) return `0`;
    else return `1px solid ${palette.lineGray}`;
  }};
  outline:0;
  border-radius:5px;
  transition:all .5s;

  &::placeholder {
    font-family: 'Pretendard';
    color:${palette.lightGray};
    font-weight:400;
  }
`;

// checkbox
export const CheckBox = styled.div`
  position:relative;
  display:flex;
  flex-wrap:wrap;
  gap:${props => {
    if (props.Button) return `6px`;
    else return `20px`;
  }};
:;
  align-items:center;

  input {
    position:absolute;
    visibility:hidden;

    + label {
      position:relative;
      display:${props => {
        if (props.Button) return `flex`;
        else return `inline-block`;
      }};
      flex-wrap:${props => {
        if (props.Button) return `wrap`;
        else return `nowrap`;
      }};
      font-family:Pretendard, Poppins;
      font-size:${props => {
        if (props.Small) return `0.875rem`;
        else if (props.Button) return '1rem';
        else return `1.125rem`;
      }};
      line-height:22px;
      text-align:center;
      padding:${props => {
        if (props.Small) return `0 0 0 30px`;
        else if (props.Button) return '6px 10px';
        else return `0 0 0 30px`;
      }};
      border-radius:${props => {
        if (props.Button) return `3px`;
        else return `0`;
      }};
      border:${props => {
        if (props.Button) return `1px solid ${palette.lineGray}`;
        else return `0`;
      }};
      vertical-align:top;
      transition:all .5s;
      cursor:pointer;

      &:before {
        position:absolute;
        top:2px;
        left:0;
        width:20px;
        height:20px;
        border:1px solid ${palette.gray};
        border-radius:3px;
        background:${palette.white};
        transition:all .5s;
        content:'';
        display:${props => {
          if (props.Button) return `none`;
          else return `block`;
        }};
      }

      &:after {
        position:absolute;
        top:2px;
        left:0;
        width:20px;
        height:20px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='11' viewBox='0 0 14 11' fill='none'%3E%3Cpath d='M4.44912 8.38963L1.13019 5.28001L0 6.33147L4.44912 10.5L14 1.55145L12.8778 0.5L4.44912 8.38963Z' fill='%230453F4'/%3E%3C/svg%3E");
        background-size:60%;
        background-repeat:no-repeat;
        background-position:center;
        transition:all .5s;
        opacity:0;
        content:'';
        display:${props => {
          if (props.Button) return `none`;
          else return `block`;
        }};
      }
    }

    &:checked + label:before {
      border:1px solid ${palette.blue};
    }

    &:checked + label:after {
      opacity:1;
    }

    &:checked + label {
      color:${props => {
        if (props.Button) return `${palette.blue}`;
        else return `${palette.blue}`;
      }};
      border:${props => {
        if (props.Button) return `1px solid ${palette.blue}`;
        else return `0`;
      }};
      background:${props => {
        if (props.Button) return `rgba(4,83,244,.05)`;
        else return `0`;
      }};
    }
  }
`;

