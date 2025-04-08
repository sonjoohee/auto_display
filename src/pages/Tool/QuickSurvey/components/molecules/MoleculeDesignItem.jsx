import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BoxListWrap,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  Body1,
  Body3,
  Caption1,
} from "../../../../../assets/styles/Typography";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import { CheckBoxButton } from '../../../../../assets/styles/InputStyle';
import { palette } from '../../../../../assets/styles/Palette';

const MoleculeDesignItem = ({ title, subtitle, isSelected, onSelect, id, disabled, question }) => {
  const [showQuestions, setShowQuestions] = useState(false);

  const handleQuestionClick = () => {
    setShowQuestions(!showQuestions);
  };

  const details = id === 'ab_test' 
    ? question[id].options
    : id === 'single_choice'
    ? question[id].options
    : [question[id].options];

  return (
    <ListBoxItem 
      selected={isSelected} 
      active={isSelected} 
      Small 
      style={{ 
        marginBottom: '-20px',
        position: 'relative',
        padding: '16px'
      }}
      showQuestions={showQuestions}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
        width: '100%',
        minHeight: '48px'
      }}>
        <div style={{ 
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '100%'
        }}>
          <CheckBoxButton
            id={id}
            name={id}
            checked={isSelected}
            onChange={() => onSelect(id)}
            disabled={disabled}
            style={{ 
              cursor: 'pointer',
              margin: 0
            }}
          />
        </div>
        <ListText style={{ 
          flex: 1, 
          minWidth: 0, 
          paddingRight: '120px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <ListTitle style={{ marginBottom: '0' }}>
            <Caption1 
              style={{ 
                fontSize: '14px', 
                lineHeight: '1.3' 
              }} 
              color={isSelected ? "primary" : "gray500"}
            >
              {title}
            </Caption1>
          </ListTitle>
          <ListSubtitle>
            <Body1 
              style={{ 
                fontSize: '14px',
                textAlign: 'left',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
              }} 
              color="gray800"
            >
              {subtitle}
            </Body1>
          </ListSubtitle>
        </ListText>
        <ListButton style={{ 
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '86px'
        }}>
          <Button
            Medium
            {...(showQuestions
              ? { PrimaryLightest: true, Fill: true }
              : { View: true })}
            onClick={handleQuestionClick}
            style={{
              width: '100%'
            }}
          >
            {showQuestions ? "문항 닫기" : "문항 보기"}
          </Button>
        </ListButton>
      </div>

      {showQuestions && (
        <BoxListWrap style={{ marginTop: '16px' }}>
          <div>
            <BgBoxList>
              {id === 'ab_test' ? (
              // A/B 테스트일 때
              details.map((detail, index) => (
                <BgBoxItem key={index}>
                  <Body3 color="gray700" align="left">
                    {index === 0 ? 'A : ' : 'B : '}
                  </Body3>
                  <Body3 color="gray700" align="left">{detail}</Body3>
                </BgBoxItem>
              ))
            ) : id === 'nps' ? (
              // NPS일 때
              <div style={{ 
                // display: 'flex', 
                // flexDirection: 'column',
                // gap: '8px',
                // width: '100%'
              }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  width: '100%'
                }}>
                  {[...Array(11)].map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: '52px',
                        height: '64px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: palette.gray50,
                        borderRadius: '4px'
                      }}
                    >
                      <Body3 color="gray700">{index}</Body3>
                    </div>
                  ))}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  width: '100%'
                }}>
                  <Body3 color="gray500">전혀 추천하고 싶지 않다</Body3>
                  <Body3 color="gray500">매우 추천하고 싶다</Body3>
                </div>
              </div>
            ) : id === 'importance' ? (
              // importance일 때
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                alignItems: 'center',
                padding: '12px 16px',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
                {question[id].options.map((option) => (
                  <div
                    key={option}
                    style={{
                      height: '80px',
                      padding: ' 12px',
                      backgroundColor: palette.gray50,
                      borderRadius: '16px',
                      border: 'none',
                      minWidth: '120px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Body3 color="gray700">{option}</Body3>
                  </div>
                ))}
              </div>
            ) : (
              // single_choice일 때
              details.map((detail, index) => (
                <BgBoxItem key={index}>
                  <Body3 color="gray700" align="left">{`${String(index + 1).padStart(2, "0")}.`}</Body3>
                  <Body3 color="gray700" align="left">{detail}</Body3>
                </BgBoxItem>
              ))
            )}
                      </BgBoxList>
          </div>
        </BoxListWrap>
      )}
    </ListBoxItem>
  );
};

const BgBoxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 4px;
`;

const BgBoxItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${palette.chatGray};
`;

export default MoleculeDesignItem;

// const CheckCircle = styled.div`
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
//   cursor: pointer;
//   background-image: ${(props) =>
//     props.$isChecked
//       ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
//       : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11.5' stroke='%23E0E4EB'/%3E%3C/svg%3E")`};
//   transition: background-image 0.3s ease-in-out;
//   cursor: pointer;
// `;