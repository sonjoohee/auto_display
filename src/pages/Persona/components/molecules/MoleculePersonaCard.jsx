import React, { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { Button } from '../../../../assets/styles/ButtonStyle'

const MoleculePersonaCard = ({ 
  title, 
  keywords = [], 
  description, 
  expandedContent, 
  isReady = false, 
  isRequest = false, 
  showDescription = false,
  hideCheckCircle = false,
  onSelect,
  currentSelection
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    // 이미 선택된 상태면 항상 해제 가능
    if (isChecked) {
      setIsChecked(false);
      onSelect(false);
    } 
    // 새로 선택하는 경우, 최대 선택 개수 확인
    else if (currentSelection < 5) {
      setIsChecked(true);
      onSelect(true);
    }
  };

  return (
    <CardContainer>
      <MainContent>
        {!hideCheckCircle && (
          <CheckCircle 
            $isChecked={isChecked}
            onClick={handleCheck}
          />
        )}

        <ContentWrapper>
          <TitleSection>
            <Title>{title}</Title>
          </TitleSection>
          
          {keywords.length > 0 && (
            <KeywordGroup>
              {keywords.map((keyword, index) => (
                <KeywordTag key={index}>#{keyword}</KeywordTag>
              ))}
            </KeywordGroup>
          )}

          {/* {showDescription && description && (
            <Description>{description}</Description>
          )}  */}
        </ContentWrapper>

        {isReady ? (
          <ToggleButton $isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
        ) : isRequest ? (
          <Button Medium Primary>
            모집 요청하기
          </Button>
        ) : (
          <ToggleButton $isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
        )}
      </MainContent>

      {isExpanded && (
        <DescriptionSection $isExpanded={isExpanded}>
          <ListUL>
            {Array.isArray(expandedContent) ? (
              <ul>
                {expandedContent.map((item, index) => (
                  <li key={index}>
                    <span className="number">{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              description
            )}
          </ListUL>
        </DescriptionSection>
      )}
    </CardContainer>
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
  border: 1px solid ${palette.outlineGray};
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background-image: ${props => props.$isChecked 
    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11' stroke='%23226FFF' stroke-width='2'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='%23226FFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
    : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11' stroke='%23E0E4EB' stroke-width='2'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='%23E0E4EB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
  };
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
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size:0.75rem;
  line-height: 1.2;
  color: ${props => {
    if (props.Ready) return `#34C759`;
    else return palette.gray500;
  }};
  padding: 4px 8px;
  border-radius: 50px;
  border: 1px solid ${props => {
    if (props.Ready) return `#34C759`;
    else return palette.outlineGray;
  }};
  background:${props => {
    if (props.Ready) return `rgba(52, 199, 89, 0.10)`;
    else return palette.gray50;
  }};
`;

const ReadyIcon = styled.div`
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent #34C759;
  transform: rotate(0deg);
`;

const KeywordGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Description = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.gray500};
  text-align: left;
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
  border: none;
  background: none;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height:10px;
    transform: ${props => props.$isExpanded 
      ? 'translate(-50%, -50%) rotate(45deg)' 
      : 'translate(-50%, -50%) rotate(-135deg)'};
    margin-top: 2px;
    border-top: 1px solid ${palette.gray500};
    border-left: 1px solid ${palette.gray500};
    transition: all .5s;
  }
`;

const DescriptionSection = styled.div`
  width: 100%;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
  padding: 20px;
  border-radius: 10px;
  border: ${props => props.$isTabContent 
    ? `1px solid ${palette.outlineGray}`
    : 'none' };
  background: ${props => props.$isTabContent 
    ? 'transparent'
    : palette.chatGray};
`;

const ListUL = styled.div`
  padding: 0;

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
    color: ${palette.chatBlue};
    border-radius: 2px;
    border: 1px solid rgba(34, 111, 255, 0.50);
    background: rgba(34, 111, 255, 0.04);
  }
`;

