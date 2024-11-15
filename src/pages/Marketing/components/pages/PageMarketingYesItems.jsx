import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";
import axios from "axios";
import { useAtom } from "jotai";
import {
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER,
  INPUT_BUSINESS_INFO,
  ANALYSIS_BUTTON_STATE,
  IS_LOADING,
  CONVERSATION,
  IS_LOADING_ANALYSIS,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
} from "../../../AtomStates";

const PageMarketingYesItems = () => {
  const navigate = useNavigate();
  const { saveConversation } = useSaveConversation();

  const [conversation, setConversation] = useAtom(CONVERSATION);

  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);

  const [
    tempMainFeaturesOfBusinessInformation,
    setTempMainFeaturesOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    tempMainCharacteristicOfBusinessInformation,
    setTempMainCharacteristicOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    tempBusinessInformationTargetCustomer,
    setTempBusinessInformationTargetCustomer,
  ] = useAtom(TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useAtom(IS_LOADING_ANALYSIS);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(IS_EXPERT_INSIGHT_ACCESSIBLE);

  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
      const handleBeforeUnload = (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = "";
      };

      const handlePopState = () => {
        setIsExitPopupOpen(true);
      };

      const handleKeyDown = (event) => {
        // if (event.keyCode === 116)
        if (
          (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
          event.key === "F5"
        ) {
          // F5 key code
          setIsExitPopupOpen(true);
          event.preventDefault();
          // navigate("/");
        }
      };

      //새로고침방지
      window.addEventListener("beforeunload", handleBeforeUnload);

      window.history.pushState(null, "", "");
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        //새로고침 방지

        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("popstate", handlePopState);
      };
  }, []);

  const handleExitCancel = () => {
    setIsExitPopupOpen(false);
  };

  const handleExitConfirm = () => {
    window.location.href = "/MarketingLanding";
  };

  useEffect(() => {
    // 페이지가 로드될 때 body의 overflow를 hidden으로 설정
    document.body.style.overflow = 'hidden';

    // 페이지가 언마운트될 때 body의 overflow를 원래 상태로 복원
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const questionRefs = useRef([]);
  const questions = Array.from({ length: 14 }, (_, i) => `Q${i + 1}`); // 질문 생성 갯수 설정

  // 특정 섹션으로 스크롤 이동
  const handleScrollToQuestion = (index) => {
    
    handleBizAnalysis();

    const target = questionRefs.current[index];
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
      setActiveQuestion(index);
    }
  };

  // 스크롤에 따라 active 클래스 업데이트
  const updateActiveQuestion = () => {
    questionRefs.current.forEach((section, index) => {
      if (window.scrollY >= section.offsetTop - 100) {
        setActiveQuestion(index);
      }
    });
  };

  // 스크롤 이벤트 설정
  useEffect(() => {
    window.addEventListener("scroll", updateActiveQuestion);
    return () => {
      window.removeEventListener("scroll", updateActiveQuestion);
    };
  }, []);

   // 입력값 상태 관리
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 엔터 동작 방지
      handleScrollToQuestion(1);
      handleBizAnalysis();
    }
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };
  const data = {
    business_idea: inputBusinessInfo,
  };

    const handleBizAnalysis = async () => {
      let businessData;
      let attempts = 0;
      const maxAttempts = 5;

        setIsLoading(true);
        setIsLoadingAnalysis(true);
        // 버튼 클릭으로 API 호출
        let response = await axios.post(
          "https://wishresearch.kr/panels/business",
          data,
          axiosConfig
        );
        businessData = response.data.business_analysis;

        // 필요한 데이터가 없을 경우 재시도, 최대 5번
        while (
          (!businessData.hasOwnProperty("명칭") ||
            !businessData.hasOwnProperty("주요_목적_및_특징") ||
            !businessData.hasOwnProperty("주요기능") ||
            !businessData.hasOwnProperty("목표고객") ||
            !businessData["명칭"] ||
            !businessData["주요_목적_및_특징"].length ||
            !businessData["주요기능"].length ||
            !businessData["목표고객"].length) &&
          attempts < maxAttempts
        ) {
          attempts += 1;

          response = await axios.post(
            "https://wishresearch.kr/panels/business",
            data,
            axiosConfig
          );
          businessData = response.data.business_analysis;
        }

        setMainFeaturesOfBusinessInformation(
          businessData["주요_목적_및_특징"]?.map((item) => item)
        );

        setMainCharacteristicOfBusinessInformation(
          businessData["주요기능"]?.map((item) => item)
        );

        setBusinessInformationTargetCustomer(
          businessData["목표고객"]?.map((item) => item)
        );

        setTitleOfBusinessInfo(businessData["명칭"]);

        const analysisReportData = {
          title: businessData?.["명칭"],
          mainFeatures: businessData["주요_목적_및_특징"],
          mainCharacter: businessData["주요기능"],
          mainCustomer: businessData["목표고객"],
        };

        setIsLoadingAnalysis(false);
        setIsLoading(false);

        await saveConversation(
          { changingConversation: { analysisReportData: analysisReportData } }
        );
      
    };

  const handleButtonExpert = async () => {
    const updatedConversation = [...conversation];

    updatedConversation.push(
      {
        type: "system",
        message: 
          `${titleOfBusinessInfo} 사업을 하시려는 창업가 이시군요!\n당신의 스타일에 딱 맞는 창업 전략을 잡는데 도움이 되었으면 좋겠어요. 함께 멋진 여정을 시작해 보아요!  ✨`,
        expertIndex: 0,
      },
      {
        type: "system",
        message: `자! 이제 본격적인 준비를 시작해보겠습니다.\n먼저 시장에서 ${titleOfBusinessInfo}의 가능성을 한눈에 파악할 수 있는 시장조사를 바로 시작해볼게요`,
        expertIndex: -1,
      },
      { type: "marketingStartButton" }
    );

    await saveConversation(
      { changingConversation: { conversation: updatedConversation } }
    );

    setConversation(updatedConversation);
    setIsExpertInsightAccessible(true);
    navigate("/ExpertInsight");
  };


  return (
    <>
      <Navbar>
        <h1 onClick={() => setIsExitPopupOpen(true)}><img src={images.SymbolLogoWhite} alt="" /></h1>
      </Navbar>

      <QuestionWrap id="question0" ref={(el) => (questionRefs.current[0] = el)}>
        <Question>
          <p>
            아이디어만으로도<br />
            첫걸음을 내딘 창업가이시네요 🎉<br />
            이제 아이디어의 잠재력을 확인해볼게요 
          </p>
        </Question>

        <Answer inputValue={inputBusinessInfo}>
          <InputIdea>
            <span>어떤 아이디어인가요?</span>
            <input 
              type="text" 
              placeholder="아이디어를 이곳에 알려주세요" 
              value={inputBusinessInfo}
              onInput={(e) => {
                if (e.target.value.length > 300) {
                  e.target.value = e.target.value.substring(0, 300);
                }
                setInputBusinessInfo(e.target.value);
              }} 
              onKeyDown={handleKeyPress}
            />
          </InputIdea>
          <button 
            className="ideaSubmit" 
            onClick={() => handleScrollToQuestion(1)}
            disabled={!inputBusinessInfo}
          >
            확인
          </button>
        </Answer>
        
      </QuestionWrap>

      <QuestionWrap id="question1" ref={(el) => (questionRefs.current[1] = el)}>
        <Question>
          <p>
            <span>🔖 아이디어를 정리해 보았어요</span>
            {isLoadingAnalysis ? inputBusinessInfo : titleOfBusinessInfo}
          </p>
        </Question>

        <Answer>
          <ResultWrap>
            <div className="title">
              <strong>💡 아이디어의 특징</strong>
              <p>아이디어 특징을 확인하고 내 비즈니스로 발전시킬 힌트를 얻어보세요</p>
            </div>
            {isLoadingAnalysis ? (
              <>
                <SkeletonLine className="content-placeholder" />
                <SkeletonLine className="content-placeholder" />
                <SkeletonLine className="content-placeholder" />
              </>
            ) : (
              <>
              <ListBox>
                <div>
                  <p>{mainFeaturesOfBusinessInformation[0]}</p>
                </div>
              </ListBox>

              <button 
                className="ideaSubmit" 
                onClick={handleButtonExpert}
              >
                사업화 가능성 확인하기 📊
              </button>
              </>
            )}
          </ResultWrap>
        </Answer>
      </QuestionWrap>
            {isExitPopupOpen && (
        <Popup Cancel>
        <div>
          <button
            type="button"
            className="closePopup"
            onClick={handleExitCancel}
          >
            닫기
          </button>
          <span>
            <img src={images.ExclamationMarkRed} alt="" />
          </span>
          <p>
            <strong>정말 종료하시겠습니까?</strong>
            <span>종료 또는 새로고침 할 경우, 모든 대화내역이 사라집니다.</span>
          </p>
          <div className="btnWrap">
            <button type="button" onClick={handleExitCancel}>
              대화를 저장할래요
            </button>
            <button type="button" onClick={handleExitConfirm}>
              종료할게요
            </button>
          </div>
        </div>
      </Popup>
    )}
    </>
  );
};

export default PageMarketingYesItems;

const Navbar = styled.div`
  position:fixed;
  top:50%;
  left:40px;
  transform:translateY(-50%);
  height:calc(100vh - 40px);
  display:flex;
  flex-direction:column;
  align-items:center;
  transition:all .5s;
  z-index:99;

  h1 {
    font-size:0;
    cursor:pointer;
  }

  ul {
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    display:flex;
    flex-direction:column;
    gap:9px;
  }

  li {
    display:inline-block;
    width:12px;
    height:12px;
    font-size:0;
    box-sizing:border-box;
    border-radius:100%;
    background:${palette.white};
    cursor:pointer;

    &.active {
      border:2px solid ${palette.white};
      background:none;
    }

    &.disabled {
      background:rgba(255, 255, 255, .3);
    }

    &:nth-child(1) {
      display:none;
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  // left: ${(props) => props.left}px;
  // top: ${(props) => props.top}px;
  // top:0;
  left:200%;
  font-size:0.63rem;
  color: ${palette.white};
  line-height:1.5;
  padding: 8px 14px;
  margin-top:-8px;
  border-radius:8px;
  white-space: nowrap;
  pointer-events: none;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  background: #333;
  z-index:999;
`;

const QuestionWrap = styled.section`
  position:relative;
  height:100vh;
  display:flex;
`;

const Question = styled.div`
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  flex:1 1 50%;
  background:#5547FF;

  p {
    font-size:2.5rem;
    font-weight:600;
    line-height:1.4;
    color:${palette.white};
    text-align:center;
    display:flex;
    flex-direction:column;
    gap:32px;

    span {
      font-size:1.25rem;
      font-weight:300;
      line-height:1.2;
    }
  }
`;

const Answer = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:32px;
  flex:1 1 50%;

  .ideaSubmit {
    position:absolute;
    left:50%;
    bottom:60px;
    transform:translateX(-50%);
    max-width:360px;
    width:100%;
    font-family:Pretendard, Poppins;
    font-size:1.25rem;
    font-weight:500;
    color:${palette.white};
    line-height:1.3;
    padding:15px 22px;
    border-radius:28px;
    border:0;
    background: ${(props) => 
      props.inputValue ? '#5547FF' : 
      props.inputValue === '' ? palette.gray200 : 
      '#5547FF'};
    cursor: ${(props) => 
    props.inputValue ? 'pointer' : 
    props.inputValue === '' ? 'not-allowed' : 
    'pointer'};
    transition:all .5s;

    &:disabled {
      pointer-events: none;
    }
  }
`;

const InputIdea = styled.div`
  display:flex;
  flex-direction:column;
  gap:40px;
  max-width:450px;
  width:100%;
  text-align:left;

  span {
    font-size:1.25rem;
    line-height:1.3;
    color:${palette.gray800};
  }

  input {
    font-family:Pretendard, Poppins;
    font-size:2.5rem;
    font-weight:600;
    line-height:1.6;
    letter-spacing:-3px;
    border:0;
    outline:0;

    &::placeholder {
      color:${palette.gray200};
    }
  }
`;

const ResultWrap = styled.div`
  max-width:566px;
  display:flex;
  flex-direction:column;
  gap:20px;
  margin:0 10%;

  .title {
    display:flex;
    flex-direction:column;
    gap:4px;
    text-align:left;

    strong {
      font-size:1.25rem;
      font-weight:600;
      line-height:1.5;
    }

    p {
      font-weight:300;
      line-height:1.5;
      margin-left:22px;
    }
  }

  .comment {
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray500};
    line-height:1.5;
    text-align:left;
  }
`;

const ListBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:16px;

  > div {
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
    border-radius:20px;
    border:1px solid ${palette.gray200};
  }

  p {
    display:flex;
    flex-direction:column;
    gap:4px;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.5;
    text-align:left;

    strong {
      font-weight:600;
      color:#5547FF;
    }
  }

  span {
    font-size:0.88rem;
    color:#0453F4;
    line-height:1.5;
    padding:8px 20px;
    border-radius:5px;
    background:rgba(4, 83, 244, 0.1);
    cursor:pointer;
  }
`;

const RadioButtonWrap = styled.div`
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  justify-content:center;
  gap:100px;
`;

const RadioButton = styled.div`
  input[type=radio] {
    display:none;
  }

  label {
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:48px;
    cursor:pointer;
  }

  strong {
    font-size:3.75rem;
    font-weight:300;
    line-height:1.5;
    opacity:.4;
    transition:all .5s;
  }

  span {
    font-size:1.25rem;
    line-height:1.6;
    color:${palette.gray300};
    text-align:center;
    transition:all .5s;
  }

  input[type=radio]:checked + label,
  input[type=radio]:hover + label {
    strong {
      opacity:1;
    }

    span {
      font-weight:500;
      color:#5547FF;
    }
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 9px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.gray500};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

    p {
      font-family: "Pretendard", "Poppins";
      font-size: 0.875rem;
      font-weight: 500;
      margin: 20px auto 24px;
      strong {
        font-weight: 500;
        display: block;
      }

      span {
        font-size: 0.75rem !important;
        font-weight: 400;
        color: #F40404;
        display: block;
        margin-top: 8px;
      }
    }
    
    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: 'Pretendard', 'Poppins';
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 12px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        // &:last-child {
        //   color: ${palette.white};
        //   background: ${palette.blue};
        // }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 600;
            display: block;
            color: ${palette.gray800};
          }
          span {
            font-size: 1rem;
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            color: ${palette.gray700};
            font-weight: 400;
            padding: 0;
            border: 0;
            background: none;
          }
        }
      `}
  }
`;