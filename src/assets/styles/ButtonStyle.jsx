import styled, { css } from "styled-components";
import { palette } from "./Palette";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: 'Pretendard', 'Poppins';
  font-weight: 600;
  border-radius: 4px;
  border: 0;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.Small && css`
    font-size: 0.81rem;
    line-height: 1.6;
    padding: 4px 10px;
  `}

  ${props => props.Medium && css`
    font-size: 0.88rem;
    line-height: 1.7;
    padding: 6px 16px;
  `}

  ${props => props.Large && css`
    font-size: 0.94rem;
    line-height: 1.7;
    padding: 8px 22px;
  `}

  ${props => props.Round && css`
    border-radius: 70px;
  `}

  ${props => props.Primary && props.Fill && css`
    color: ${palette.white};
    background: ${palette.primary};

    &:hover {
      background: #3537B3;

      &:disabled {
        background: ${palette.primary};
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}

  ${props => props.Primary && !props.Fill && css`
    color: ${palette.main};
    border: 1px solid ${palette.main};
    background: ${palette.white};

    &:hover {
      background-color: rgba(76, 79, 255, 0.1);
    }
  `}

  ${props => props.Error && css`
    color: ${palette.error};
    border: 1px solid ${palette.error};
    background: ${palette.white};

    &:hover {
      background: rgba(255, 47, 62, 0.10);

      &:disabled {
        background: ${palette.white};
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}

  ${props => props.Edit && css`
    color: ${palette.gray500};
    border: 1px solid ${palette.gray500};
    background: ${palette.white};

    &:hover {
      background: ${palette.gray50};

      &:disabled {
        background: ${palette.white};
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}
`;