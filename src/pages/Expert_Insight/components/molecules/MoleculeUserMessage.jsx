import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";

const MoleculeUserMessage = ({ message }) => {
  const formatMessage = (msg) => {
    const regex = /\*(.*?)\*/g; // *로 감싸진 부분 찾기

    return msg.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line.split(regex).map((part, i) => {
          if (i % 2 === 1) {
            // *로 감싸진 부분일 때
            const updatedPart = part.includes(",") ? part.replace(/,/g, " 및") : part; // 쉼표를 "및"으로 치환
            return (
              <span key={i}>
                <u>{updatedPart}</u>
              </span> // 밑줄 및 강조
            );
          }
          return part;
        })}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <UserMessageContainer>
      <div>
        <p>{formatMessage(message)}</p>
      </div>
      {/* <Time>1 min age</Time> */}
    </UserMessageContainer>
  );
};

export default MoleculeUserMessage;

const Time = styled.span`
  align-self: flex-end;
  font-size: 0.63rem;
  color: ${palette.gray};
`;

const UserMessageContainer = styled.div`
  // max-width: 70%;
  display: flex;
  align-items: flex-end;
  flex-direction: row-reverse;
  gap: 18px;
  // width: auto;
  // padding: 15px 20px;
  // background-color: #ffe0b2;
  // border-radius: 15px;
  // font-size: 1rem;
  // font-weight: 500;
  // color: #333;
  // margin-bottom: 20px;
  // margin-left: auto;
  // margin-right: 0;
  margin-top: 40px;
  position: relative;

  > div {
    font-size: 0.875rem;
    padding: 14px 20px;
    border-radius: 15px;
    // background: #ebf3fe;
    background:${palette.chatBlue};

    p {
      color:${palette.white};
      text-align:left;
      line-height: 1.8;
    }
  }

  &:after {
    // content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-left-color: #ebf3fe;
    border-right: 0;
    margin-top: -10px;
  }
`;
