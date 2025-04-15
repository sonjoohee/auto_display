import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";

const WriteSelfCard = () => {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);
  const cardRef = useRef(null);

  // 메시지를 추가하는 함수
  const addMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, inputText]);
      setInputText("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  // Enter 키를 눌렀을 때 메시지 전송
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addMessage();
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // 카드 클릭 시 입력 필드로 포커스
  const handleCardClick = () => {
    if (inputRef.current && !isFocused) {
      inputRef.current.focus();
    }
  };

  // 플레이스홀더 클릭 시 입력 필드로 전환
  const handlePlaceholderClick = (e) => {
    e.stopPropagation();
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 새 메시지가 추가될 때마다 스크롤을 최하단으로 이동
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <CardContainer ref={cardRef} onClick={handleCardClick}>
      {messages.length > 0 ? (
        <ChatContainer onClick={(e) => e.stopPropagation()}>
          {messages.map((message, index) => (
            <ChatBubble key={index}>
              {message}
            </ChatBubble>
          ))}
          <div ref={messageEndRef} />
        </ChatContainer>
      ) : null}

      <InputContainer hasText={inputText.length > 0 || messages.length > 0}>
        <CardContent>
          {inputText.length === 0 && !isFocused ? (
            <PlaceholderText onClick={handlePlaceholderClick}>직접 작성</PlaceholderText>
          ) : (
            <InputField
              ref={inputRef}
              value={inputText}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder=""
              autoFocus={isFocused}
            />
          )}
        </CardContent>
        <IconContainer>
          <TrashIcon onClick={(e) => e.stopPropagation()}>
            <svg 
              width="14" 
              height="17" 
              viewBox="0 0 14 17" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill-rule="evenodd" 
                clip-rule="evenodd" 
                d="M4.67517 1.86523C4.67517 1.52006 4.95499 1.24023 5.30017 1.24023H9.25951C9.60469 1.24023 9.88451 1.52006 9.88451 1.86523C9.88451 2.21041 9.60469 2.49023 9.25951 2.49023H5.30017C4.95499 2.49023 4.67517 2.21041 4.67517 1.86523ZM0.55896 4.20532C0.55896 3.86014 0.838782 3.58032 1.18396 3.58032H13.375C13.7202 3.58032 14 3.86014 14 4.20532C14 4.5505 13.7202 4.83032 13.375 4.83032H13.0349V13.6346C13.0349 15.3605 11.6358 16.7596 9.90987 16.7596H4.64831C2.92242 16.7596 1.52332 15.3605 1.52332 13.6346V4.83032H1.18396C0.838782 4.83032 0.55896 4.5505 0.55896 4.20532ZM2.77332 4.83032V13.6346C2.77332 14.6702 3.61278 15.5096 4.64831 15.5096H9.90987C10.9454 15.5096 11.7849 14.6702 11.7849 13.6346V4.83032H2.77332ZM5.97034 6.52954C6.31552 6.52954 6.59534 6.80936 6.59534 7.15454L6.59534 12.9573C6.59534 13.3025 6.31551 13.5823 5.97034 13.5823C5.62516 13.5823 5.34534 13.3025 5.34534 12.9573L5.34534 7.15454C5.34534 6.80936 5.62516 6.52954 5.97034 6.52954ZM9.21252 7.15454C9.21252 6.80936 8.9327 6.52954 8.58752 6.52954C8.24235 6.52954 7.96252 6.80936 7.96252 7.15454L7.96252 12.9573C7.96252 13.3025 8.24235 13.5823 8.58752 13.5823C8.9327 13.5823 9.21252 13.3025 9.21252 12.9573V7.15454Z" 
                fill="#8C8C8C"
              />
            </svg>
          </TrashIcon>
          <CheckIcon 
            onClick={(e) => {
              e.stopPropagation();
              // 체크표시 클릭 시 아무 동작도 하지 않음
              // 메시지 추가 기능 제거
            }}
            active={inputText.trim() !== ""}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M4 13L9 18L20 7" 
                stroke={inputText.trim() !== "" ? "#226FFF" : "#E0E4EB"} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </CheckIcon>
        </IconContainer>
      </InputContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 820px;
  height: auto;
  min-height: 56px;
  background-color: ${palette.white};
  border-radius: 10px;
  border: 1px solid #E0E4EB;
  box-sizing: border-box;
  transition: all 0.2s ease;
  overflow: hidden;
  cursor: text;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  padding: 16px 20px;
  gap: 8px;
  cursor: default;
  justify-content: flex-start;
`;

const ChatBubble = styled.div`
  background-color: #F7F8FA;
  border-radius: 8px;
  padding: 12px 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.55;
  color: #323232;
  align-self: flex-start;
  max-width: 80%;
  word-break: break-word;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 16px 20px;
  border-top: none;
  box-sizing: border-box;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 24px;
`;

const PlaceholderText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #CCCCCC;
  cursor: text;
  width: 100%;
  text-align: left;
  padding: 0;
  display: flex;
  align-items: center;
`;

const InputField = styled.textarea`
  width: 100%;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.55;
  letter-spacing: -0.03em;
  color: #323232;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  padding: 0;
  margin: 0;
  height: 24px;
  max-height: 120px;
  overflow-y: hidden;
  display: block;

  &::placeholder {
    color: #CCCCCC;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  gap: 12px;
`;

const TrashIcon = styled.div`
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
  
  svg path {
    transition: fill 0.2s ease;
  }
  
  &:hover svg path {
    fill: #6C6C6C;
  }
`;

const CheckIcon = styled.div`
  cursor: ${props => props.active ? 'pointer' : 'default'};
  transition: transform 0.2s ease;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  
  &:hover {
    transform: ${props => props.active ? 'scale(1.1)' : 'none'};
  }
`;

export default WriteSelfCard;
