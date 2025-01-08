//산업별 인기 페르소나 카드
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { Body2_1 } from "../../../../assets/styles/Typography";

const MoleculePersonaCard = ({
  title,
  keywords = [],
  gender,
  age,
  job,
  isBasic = false, 
  isCustom = false,
  hideCheckCircle = false,
  TitleFlex = false,
  NoLine = false,
  onSelect,
  currentSelection,
  onClick,
  checked = null,
  newLine = false,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheck = () => {
    if (isCustom) {
      onClick && onClick(); // 팝업 표시를 위한 콜백 실행
      return;
    }
    onSelect && onSelect();

    // 이미 선택된 상태면 항상 해제 가능
    if (isChecked && checked === null) {
      setIsChecked(false);
      onSelect(false);
    }
    // 새로 선택하는 경우, 최대 선택 개수 확인
    else if (currentSelection < 5 && checked === null) {
      setIsChecked(true);
      onSelect(true);
    }
  };

  return (
    <>
      <CardContainer
        TitleFlex={TitleFlex}
        $isChecked={isChecked}
        NoLine={NoLine}
      >
        <MainContent NoLine={NoLine}>
          {!hideCheckCircle && (
            <CheckCircle $isChecked={isChecked} onClick={handleCheck} />
          )}

          <ContentWrapper NoLine={NoLine}>
            <TitleSection>
              <Title NoLine={NoLine}>
                <body2_1>{title}</body2_1>

                {!newLine && (
                  <TitleInfo>
                    <span>{gender}</span>
                    <span>{age}세</span>
                    <span>{job}</span>
                  </TitleInfo>
                )}
              </Title>
            </TitleSection>

            {newLine && (
              <TitleInfo>
                <span>{gender}</span>
                <span>{age}세</span>
                <span>{job}</span>
              </TitleInfo>
            )}

            {keywords.length > 0 && (
              <KeywordGroup>
                {keywords.map((keyword, index) => (
                  <KeywordTag key={index}>#{keyword}</KeywordTag>
                ))}
              </KeywordGroup>
            )}
          </ContentWrapper>
          {isBasic ? (
            <Badge Basic>
              <img src={images.StatusBadgeBasic} alt="기본형" />
              기본형
            </Badge>
          ) : isCustom ? (
              <Badge Custom>
                <img src={images.StatusBadgeCustom} alt="커스터마이즈" />
                커스터마이즈
              </Badge>
          ) : (
            <></>
          )}
        </MainContent>
      </CardContainer>
    </>
  );
};

export default MoleculePersonaCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.$isChecked ? palette.primary : palette.outlineGray)};
  background: ${(props) =>
    props.isActive ? "rgba(34, 111, 255, 0.10)" : palette.white};
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};
  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.TitleFlex &&
    css`
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    `}

  ${(props) =>
    props.NoLine &&
    css`
      padding: 0;
      border: none;

      + div {
        padding-top: 16px;
        border-radius: 0;
        border-top: 1px solid ${palette.outlineGray};
      }
    `}
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  > button {
    display: flex;
    align-items: center;
    gap: 12px;

    &:after {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-right: 2px solid ${palette.primary};
      border-top: 2px solid ${palette.primary};
      transform: rotate(45deg);
      content: "";
    }
  }

  ${(props) =>
    props.NoLine &&
    css`
      justify-content: space-between; // space-between으로 변경
      gap: 8px;
    `}
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  margin-right: 12px;

  ${(props) =>
    props.NoLine &&
    css`
      flex: 1; // flex: 1로 변경하여 공간을 채우도록 설정
      margin-right: 12px; // 기본값과 동일하게 유지
    `}
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background-image: ${(props) =>
    props.$isChecked
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
  transition: background-image 0.3s ease-in-out;
  cursor: pointer;
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.div`
  font-weight: 600;
  color: ${palette.gray800};
  text-align: left;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  gap: 8px;

  > p {
    flex-shrink: 0;
  }

  ${(props) =>
    props.NoLine &&
    css`
      font-weight: 400;
      line-height: 1.5;
    `}
`;

const TitleInfo = styled.div`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.3;
  color: ${palette.gray500};

  span {
    + span {
      margin-left: 6px;

      &:before {
        display: inline-block;
        width: 1px;
        height: 9px;
        margin-right: 6px;
        background: ${palette.gray500};
        content: "";
      }
    }
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  line-height: 1.2;
  color: ${(props) => {
    if (props.Basic) return `#34C759`;
    else if (props.Custom) return palette.gray500;
    else return palette.gray500;
  }};
  padding: 4px 8px;
  border-radius: 50px;
  border: 1px solid
    ${(props) => {
      if (props.Basic) return `#34C759`;
      else if (props.Custom) return palette.primary;
      else return palette.outlineGray;
    }};
  background: ${(props) => {
    if (props.Basic) return `rgba(52, 199, 89, 0.10)`;
    else if (props.Custom) return palette.primary;
    else return palette.gray50;
  }};
  cursor: pointer;
  flex-shrink: 0;
`;

const ReadyIcon = styled.div`
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent #34c759;
  transform: rotate(0deg);
`;

const KeywordGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Description = styled.div`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray500};
  text-align: left;
  word-break: keep-all;
  white-space: pre-wrap;
`;

const KeywordTag = styled.div`
  padding: 4px 10px;
  color: #666666;
  font-size: 0.75rem;
  line-height: 1.6;
  border-radius: 20px;
  background: ${palette.chatGray};
`;

const ToggleButton = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  border: none;
  background: none;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    transform: ${(props) =>
      props.$isExpanded
        ? "translate(-50%, -50%) rotate(45deg)"
        : "translate(-50%, -50%) rotate(-135deg)"};
    // margin-top: 2px;
    border-top: 1px solid ${palette.gray500};
    border-left: 1px solid ${palette.gray500};
    transition: all 0.5s;
  }
`;

const DescriptionSection = styled.div`
  width: 100%;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
  border-radius: 10px;
  border: ${(props) =>
    props.$isTabContent ? `1px solid ${palette.outlineGray}` : "none"};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    line-height: 1.5;
    color: ${palette.gray800};
    padding: 20px;
    border-radius: 10px;
    background: ${(props) =>
      props.$isTabContent ? "transparent" : palette.chatGray};
    cursor: pointer;
  }
`;

const ListUL = styled.div`
  padding: 20px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray800};

    + li {
      padding-top: 8px;
      margin-top: 8px;
      border-top: 1px solid ${palette.outlineGray};
    }
  }

  .number {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: ${palette.primary};
    border-radius: 2px;
    border: 1px solid rgba(34, 111, 255, 0.5);
    background: rgba(34, 111, 255, 0.04);
  }
`;

const RecruitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 4px;
  background: ${palette.primary};
  color: ${palette.white};
  font-size: 0.875rem;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${palette.primaryDark};
  }

  img {
    width: 16px;
    height: 16px;
  }
`;
