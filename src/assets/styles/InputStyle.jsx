import styled, { css } from "styled-components";
import { palette } from "../styles/Palette";

const getStatusColor = (props) => {
  if (props.status === "error") return palette.error;
  if (props.status === "valid") return palette.gray300;
  return palette.gray300;
};

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 30px;
`;

export const Label = styled.span`
  font-size: 0.75rem;
  color: ${getStatusColor};
  pointer-events: none;
  transition: all 0.5s;
`;

export const CustomInput = styled.input`
  width: ${(props) => props.width || "100%"};
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  line-height: 1.2;
  color: ${palette.gray900};
  padding: 0;
  border-radius: 0;
  border: 1px solid ${getStatusColor};
  outline: none;
  transition: all 0.5s;

  ${(props) =>
    props.Floating &&
    css`
      font-size: 0.94rem;
      line-height: 1;
      padding: 15px 12px;
      border-radius: 4px;
      border: 1px solid ${getStatusColor};

      + span {
        position: absolute;
        top: -8px;
        left: 12px;
        padding: 0 4px;
        background: ${palette.white};
      }
    `}

  ${(props) =>
    props.Edit &&
    css`
      font-size: 1.25rem;
      line-height: 1.3;
      border: 0;

      + span {
        position: absolute;
        top: -8px;
        left: 12px;
        padding: 0 4px;
        background: ${palette.white};
      }
    `}

  &:focus, &:hover {
    border-color: ${(props) =>
      props.status === "error"
        ? palette.error
        : props.status === "valid"
        ? palette.outlineGray
        : palette.main};

    ${(props) =>
      props.Floating &&
      `
      + span {
        color: ${(props) =>
          props.status === "error"
            ? palette.error
            : props.status === "valid"
            ? palette.gray300
            : palette.main};
      }
    `}
  }

  &::placeholder {
    color: ${palette.gray300};
  }
`;

export const CustomTextarea = styled.textarea`
  width: ${(props) => props.width || "100%"};
  font-family: "Pretendard", "Poppins";
  font-size: 1rem;
  line-height: 1.5;
  color: ${palette.gray800};
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${getStatusColor};
  outline: none;
  resize: none;
  overflow: auto;
  transition: all 0.5s;
  margin-bottom: 10px;
  /* height: 320px !important; // 고정 높이 */

  ${(props) =>
    props.Edit &&
    css`
      font-size: 1rem;
      line-height: 1.5;
      padding: 0;
      border-radius: 0;
      border: 0;
    `}

  &::placeholder {
    font-weight: 300;
    // line-height: 1.5;
    color: ${palette.gray500};
  }
`;

export const ErrorMessage = styled.p`
  color: ${palette.error};
  font-size: 0.75rem;
  margin-left: ${(props) => (props.floating ? "14px" : "0")};
`;
