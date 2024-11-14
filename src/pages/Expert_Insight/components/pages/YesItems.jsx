import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";

const YesItems = () => {
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

  const handleRadioChange = (index) => {
    if (index === activeQuestion && index < questions.length - 1) {
      // 다음 질문으로 이동
      setActiveQuestion(index + 1);
      handleScrollToQuestion(index + 1); // 해당 질문으로 스크롤
    }
  };

   // 입력값 상태 관리
  const [inputValue, setInputValue] = useState('');
  // 입력값 변경 시 상태 업데이트
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  return (
    <>
      <Navbar>
        <h1><img src={images.SymbolLogoWhite} alt="" /></h1>
      </Navbar>

      <QuestionWrap id="question0" ref={(el) => (questionRefs.current[0] = el)}>
        <Question>
          <p>
            아이디어만으로도<br />
            첫걸음을 내딘 창업가이시네요 🎉<br />
            이제 아이디어의 잠재력을 확인해볼게요 
          </p>
        </Question>

        <Answer inputValue={inputValue}>
          <InputIdea>
            <span>어떤 아이디어인가요?</span>
            <input 
              type="text" 
              placeholder="아이디어를 이곳에 알려주세요" 
              value={inputValue} 
              onChange={handleInputChange} 
            />
          </InputIdea>
          <button 
            className="ideaSubmit" 
            onClick={() => handleScrollToQuestion(1)}
            disabled={!inputValue}
          >
            확인
          </button>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question1" ref={(el) => (questionRefs.current[1] = el)}>
        <Question>
          <p>
            <span>🔖 아이디어를 정리해 보았어요</span>
            프리랜서 일정 및<br />급여 관리 플랫폼
          </p>
        </Question>

        <Answer>
          <ResultWrap>
            <div className="title">
              <strong>💡 아이디어의 특징</strong>
              <p>아이디어 특징을 확인하고 내 비즈니스로 발전시킬 힌트를 얻어보세요</p>
            </div>

            <ListBox>
              <div>
                <p>프리랜서 일정 및 급여 관리 플랫폼은 프리랜서들이 자신의 일정을 효율적으로 관리하고, 프로젝트별 급여를 체계적으로 추적하며, 세금 신고를 간편하게 처리할 수 있도록 지원하는 플랫폼입니다. 프로젝트 일정 관리, 급여 및 비용 추적, 세금 신고 기능을 제공하여 프리랜서들의 업무 효율성을 높이고 재정 관리를 간소화하는 데 도움을 줍니다.</p>
              </div>
            </ListBox>
          </ResultWrap>

          <button 
            className="ideaSubmit" 
          >
            사업화 가능성 확인하기 📊
          </button>
        </Answer>
      </QuestionWrap>
    </>
  );
};

export default YesItems;

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
