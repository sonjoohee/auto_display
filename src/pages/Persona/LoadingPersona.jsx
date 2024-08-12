import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { palette } from "../../assets_copy/styles/Palette";
import {
  AGE_AREA_VALUE,
  AI_ALL_DATA,
  AI_PERSONA_LIST,
  GENDER_AREA_VALUE,
  PASS_SATATE2,
  SELECT_PERSONA,
  TEXT_AREA_VALUE,
} from "./state/persona_manager";
import { useAtom } from "jotai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoadingPersona = () => {
  const [currentNumber, setCurrentNumber] = useState(0);

  const [textAreaValue, setTextAreaValue] = useAtom(TEXT_AREA_VALUE);
  const [genderAreaValue, setGenderAreaValue] = useAtom(GENDER_AREA_VALUE);
  const [ageAreaValue, setAgeAreaValue] = useAtom(AGE_AREA_VALUE);

  const [aiAllData, setAiAllData] = useAtom(AI_ALL_DATA);
  const [aiPersonaList, setAiPersonaList] = useAtom(AI_PERSONA_LIST);
  const [selectPersona, setSelectPersona] = useAtom(SELECT_PERSONA);

  console.log("로딩페이지 넘어온 데이터.");
  // console.log("유저가 작성한 값 : ", textAreaValue);
  // console.log("유저가 선택한 성별: ", genderAreaValue);
  // console.log("유저가 선택한 나이: ", ageAreaValue);

  const [passSate2, setPassState2] = useAtom(PASS_SATATE2);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (passSate2 === 0) {
      console.log("정상 PASS값 :", passSate2);
      sendDataToAPI();
      setPassState2(1);
    }

    if (passSate2 === 1) {
      console.log("잘못된접근 PASS값 :", passSate2);
      navigate("/");
    }

    return () => {};
  }, []);

  const sendDataToAPI = async () => {
    console.log("DATA Send!!", selectPersona);

    // 페르소나 API 쪼개기 .

    try {
      console.log("Try Start!!");

      const response0 = await axios.post(
        // "http://localhost:7300/api/v1/zbiz/generate_product_service_report",
        "https://wishpoll.co.kr/api/v1/zbiz/generate_product_service_report",
        {
          name: selectPersona[0]["이름"],
          age: selectPersona[1]["나이"],
          gender: selectPersona[2]["성별"],
          marital_status: selectPersona[3]["결혼여부"],
          number_of_children: selectPersona[4]["자녀여부"],
          occupation: selectPersona[5]["직업"],
          characteristics: selectPersona[6]["특성"],
          product_service_sentiment: selectPersona[7]["제품/서비스 긍/부정"],
          product_service_information: selectPersona[8]["제품/서비스 이름"],
        },
        {
          withCredentials: false, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          credentials: "include",
        }
      );
      console.log("제품서비스");
      console.log(response0);

      const response = await axios.post(
        //  "http://localhost:7300/api/v1/zbiz/generate_insight_report_1",
        "https://wishpoll.co.kr/api/v1/zbiz/generate_insight_report_1",
        {
          name: selectPersona[0]["이름"],
          age: selectPersona[1]["나이"],
          gender: selectPersona[2]["성별"],
          marital_status: selectPersona[3]["결혼여부"],
          number_of_children: selectPersona[4]["자녀여부"],
          occupation: selectPersona[5]["직업"],
          characteristics: selectPersona[6]["특성"],
          product_service_sentiment: selectPersona[7]["제품/서비스 긍/부정"],
          product_service_information: selectPersona[8]["제품/서비스 이름"],
        },
        {
          withCredentials: false, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          credentials: "include",
        }
      );
      console.log("페르소나 1 리턴 값 ");
      console.log(response.data);

      //setAiAllData(response.data);
      let pushData = response.data;
      const response2 = await axios.post(
        // "http://localhost:7300/api/v1/zbiz/generate_insight_report_2",
        "https://wishpoll.co.kr/api/v1/zbiz/generate_insight_report_2",
        { pushData },
        {
          withCredentials: false, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          credentials: "include",
        }
      );
      console.log("페르소나 2 리턴값 ");
      console.log(response2);

      const mergeData = {
        persona: {
          ...response.data["persona"],
          ...response2.data["persona"],
          ...response0.data["product"],
        },
      };

      console.log("합쳐봤음 어떻게 합쳐지나 체크 ", mergeData);
      setAiAllData(mergeData);

      //mergeData
      const createData = await axios.post(
        // "http://localhost:7300/api/v1/zbiz/create",
        "https://wishpoll.co.kr/api/v1/zbiz/create",
        { mergeData },
        {
          withCredentials: false,
          credentials: "include",
        }
      );

      setTimeout(() => {
        //Router.push("/PersonaGenerator");
        //history.push("/PersonaGenerator");
        if (createData) {
          console.log("페이지 이동 ");
          navigate("/PersonaGenerator");
        } else {
          navigate("/");
          alert("데이터 오류 발생, 첫 화면으로 이동합니다.");
        }
      }, 3000);
    } catch (error) {
      console.error("Error sending data to API:", error);
      navigate("/");
      setLoading(false);
    }
  };

  return (
    <>
      <NumberWrap>
        <div>
          <strong>AI 페르소나를 생성 중입니다...</strong>
          <NumberCounter>{loading ? "로딩중" : null}</NumberCounter>
          <p>1~3분정도 소요됩니다</p>
        </div>
      </NumberWrap>
    </>
  );
};

export default LoadingPersona;

const NumberCounter = styled.div`
  width: 120px;
  height: 120px;
  font-size: 0;
  border: 16px solid ${palette.lightGray};
  border-radius: 50%;
  border-top: 16px solid ${palette.blue};
  margin: 40px auto;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const NumberWrap = styled.div`
  position: relative;
  height: 100dvh;

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  strong {
    font-size: 1.25rem;
  }

  p {
    font-size: 0.875rem;
    color: ${palette.gray};
  }
`;
