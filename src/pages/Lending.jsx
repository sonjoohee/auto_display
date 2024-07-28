import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import styled, { css } from "styled-components";

import { useAtom } from "jotai";
import { CURRENT_PERSONA_COUNT } from "./Lending_manager";

const Lending = () => {
  const [currentPersoinaCount, setCurrentPersonaCount] = useAtom(
    CURRENT_PERSONA_COUNT
  );

  useEffect(() => {
    const fetchPersonaCount = async () => {
      console.log(
        "process.env.REACT_APP_SERVER_URL",
        process.env.REACT_APP_SERVER_URL
      );
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/hello`
        );
        setCurrentPersonaCount(response.data.value);
      } catch (error) {
        console.error("Error fetching persona count:", error);
      }
    };

    fetchPersonaCount();
  }, [setCurrentPersonaCount]);

  return (
    <>
      <div>
        <h1>초기 셋팅 :) </h1>
        <p>랜딩페이지 기초 설정 해두었습니다.</p>
        <p> Jotai 및 API 연결 확인 값 : {currentPersoinaCount} </p>
        <p> 값이 0일 경우 API 연결이 안되었음. </p>
        <VisualH3> 스타일컴퍼넌트 적용 한것. 코드 참조 </VisualH3>
        <p>라우트 따로 셋팅하셔서 하나씩 작업해주시면 됩니다 :) </p>
        <p> 팀즈 연동 체크 푸쉬용 </p>
        <p>PR테스트 - 지선</p>
      </div>
    </>
  );
};

export default Lending;

const VisualH3 = styled.h3`
  font-size: 3.25rem;
  font-weight: 700;
  color: #21f5f5;
`;
