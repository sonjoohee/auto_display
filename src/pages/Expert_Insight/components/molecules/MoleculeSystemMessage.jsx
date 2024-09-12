import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import panelimages from "../../../../assets/styles/PanelImages";
import { useAtom } from "jotai";
import { SELECTED_EXPERT_INDEX } from "../../../AtomStates";

const MoleculeSystemMessage = ({ item }) => {
  // console.log("🚀 ~ MoleculeSystemMessage ~ item:", item);
  const [displayedText, setDisplayedText] = useState(""); // 현재까지 타이핑된 텍스트
  const [isTyping, setIsTyping] = useState(true); // 타이핑 중인지 여부
  // const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const message = item.message;
  const selectedExpertIndex = item.expertIndex;
  // console.log(
  //   "🚀 ~ MoleculeSystemMessage ~ selectedExpertIndex:",
  //   selectedExpertIndex
  // );

  useEffect(() => {
    const messageLines = message.split("\n"); // 메시지를 줄바꿈 기준으로 나눔
    let lineIndex = 0; // 현재 줄 인덱스
    let charIndex = 0; // 현재 글자 인덱스
    let currentText = ""; // 현재까지 출력된 텍스트
    const typingSpeed = 10; // 타이핑 속도 (50ms에 한 글자씩)

    const typeNextChar = () => {
      // 줄이 모두 출력되었는지 확인
      if (lineIndex < messageLines.length) {
        const currentLine = messageLines[lineIndex];

        // 현재 줄에서 모든 글자가 출력되었는지 확인
        if (charIndex < currentLine.length) {
          currentText += currentLine[charIndex]; // 한 글자 추가
          setDisplayedText(currentText); // 화면에 표시할 텍스트 업데이트
          charIndex++; // 다음 글자로 이동
        } else {
          // 현재 줄이 끝났을 때 줄바꿈 추가
          currentText += "\n";
          setDisplayedText(currentText); // 줄바꿈이 포함된 텍스트 업데이트
          lineIndex++; // 다음 줄로 이동
          charIndex = 0; // 글자 인덱스 초기화
        }
      } else {
        // 모든 줄이 출력되었으면 타이핑 종료
        setIsTyping(false);
        clearInterval(typingInterval); // 타이머 정리
      }
    };

    const typingInterval = setInterval(typeNextChar, typingSpeed);

    return () => clearInterval(typingInterval); // 컴포넌트 언마운트 시 타이머 정리
  }, [message]);

  return (
    <>
      <SystemMessageContainer>
        <Thumb>
          <img src={panelimages[`expert_${selectedExpertIndex}`]} alt="" />
        </Thumb>
        <Bubble>
          <TypingEffect isTyping={isTyping}>
            <p>{displayedText}</p>
          </TypingEffect>
        </Bubble>
        {/* <Time>1 min age</Time> */}
      </SystemMessageContainer>
    </>
  );
};

export default MoleculeSystemMessage;

const Thumb = styled.div`
  position: relative;
  width: 55px;
  height: 55px;
  border-radius: 100px;
  overflow: hidden;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Time = styled.span`
  align-self: flex-end;
  font-size: 0.63rem;
  color: ${palette.gray};
`;

const SystemMessageContainer = styled.div`
  display: flex;
  // align-items: flex-end;
  align-items: center;
  flex-direction: ${(props) => (props.Myself ? "row-reverse" : "row")};
  gap: 18px;
  margin-top: 40px;
`;

const Bubble = styled.div`
  font-size: 0.88rem;
  padding: 14px 20px;
  border-radius: 15px;
  border: 1px solid ${(props) => (props.Myself ? "rgba(4,83,244,.05)" : "0")};
  background: ${(props) =>
    props.Myself ? "rgba(4,83,244,.05)" : "rgba(0,0,0,.05)"};
  max-width: 80%; /* 말풍선 크기를 제한하여 텍스트가 넘어가지 않도록 함 */
`;

const TypingEffect = styled.div`
  overflow: hidden;
  text-align: left;
  white-space: pre-wrap; /* 줄바꿈을 유지 */
  display: inline-block;
  border-right: ${({ isTyping }) =>
    isTyping ? `2px solid ${palette.lightGray}` : "none"}; /* Cursor effect */
  animation: ${({ isTyping }) =>
    isTyping ? "blink-caret 0.75s step-end infinite" : "none"};

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: ${palette.lightGray};
    }
  }
`;

const p = styled.p`
  line-height: 1.8;
  text-align: left;
  white-space: pre-wrap; /* 줄바꿈과 공백 유지 */
`;
