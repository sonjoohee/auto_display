import styled, { css } from "styled-components";
import { palette } from "./Palette";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', 'Poppins';
  border-radius: 4px;
  border: 0;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:disabled {
    cursor: not-allowed;
  }

  ${props => props.Small && css`
    gap: 4px;
    font-size: 0.75rem;
    line-height: 1.2;
    padding: 6px 10px;
  `}

  ${props => props.Medium && css`
    gap: 12px;
    font-size: 1rem;
    line-height: 1.5;
    padding: 8px 24px;
    border-radius: 8px;
  `}

  ${props => props.Large && css`
    gap: 12px;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 12px 16px;
    border-radius: 8px;
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
      cursor: not-allowed;
    }
  `}

    ${props => props.Primary && props.Fill && props.Large && css`
    color: ${palette.white};
    background: ${palette.primary};

    &:hover {
      background: #3537B3;
    }

    &:disabled {
      color: ${palette.white};
      border: none;
      // border: 1px solid ${palette.gray300};
      background: ${palette.gray300};

      &:hover {
        background: ${palette.gray300};
      }
    }
  `}

  ${props => props.Primary && !props.Fill && css`
    color: ${palette.primary};
    border: 1px solid ${palette.primary};
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
      color: ${palette.white};
      border: none;
      // border: 1px solid ${palette.gray300};
      background: ${palette.gray300};

      &:hover {
        background: ${palette.gray300};
      }
    }
  `}

  
  ${props => props.Outline && props.Fill && css`
    color: ${palette.gray700};
    border: 1px solid ${palette.outlineGray};
    background: ${palette.chatGray};

    &:hover {
      background: ${palette.chatGray};

      &:disabled {
        background: ${palette.chatGray};
      }
    }

    &:disabled {
      cursor: not-allowed;
    }
  `}
`;