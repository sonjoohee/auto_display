import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";

const NoItems = () => {
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
  
  // 상태에 따라 Navbar 보여질 여부
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    // question0일 때 Navbar 숨기기
    if (activeQuestion === 0) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [activeQuestion]);

  const tooltips = [
    "START",
    "Q1. 아침에 직장(학교)를 가기전 드는 생각은?",
    "Q2. 위험하다는 말을 들었을 때 나는?",
    "Q3. 실패할 수도 있을 때?",
    "Q4. 기회가 오면 나는?",
    "Q5. 최신 기술 뉴스에 대한 반응은?",
    "Q6. 여유 자금이 생기면?",
    "Q7. 일할 때 나는?",
    "Q8. 내가 원하는 창업 무대는?",
    "Q9. 창업스타일 중 마음에 드는 건?",
    "Q10. 어떤 분야에 더 끌리시나요?",
    "Q11. 이루고 싶은 목표는?",
    "Q12. 신기술이나 새 아이디어에 대해 나는?",
    "Q13. 가장 관심이 가는 분야는?",
  ];

  const [tooltip, setTooltip] = useState({
    show: false,
    text: "",
    top: 0,
    left: 0,
  });

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

  // 툴팁 표시 핸들러
  const handleMouseOver = (e, index) => {
    if (index < activeQuestion) {
      const liRect = e.target.getBoundingClientRect();
      setTooltip({
        show: true,
        text: tooltips[index],
        top: liRect.top + window.scrollY + liRect.height / 2,
        left: liRect.right + 10,
      });
    }
  };

  const handleMouseOut = () => {
    setTooltip({ ...tooltip, show: false });
  };

  // const handleRadioChange = (index) => {
  //   if (index < questions.length - 1) {
  //     setActiveQuestion(index + 1);
  //     handleScrollToQuestion(index + 1);
  //   }
  // };

  const handleRadioChange = (index) => {
    if (index === activeQuestion && index < questions.length - 1) {
      // 다음 질문으로 이동
      setActiveQuestion(index + 1);
      handleScrollToQuestion(index + 1); // 해당 질문으로 스크롤
    }
  };


  return (
    <>
      <Navbar>
        <h1><img src={images.SymbolLogoWhite} alt="" /></h1>
        {showNavbar && (
          <ul>
            {questions.map((question, index) => (
              <li
                key={question}
                className={`${activeQuestion === index ? "active" : ""} ${index < activeQuestion ? "disabled" : ""}`}
                // onClick={() => handleScrollToQuestion(index)}
                onClick={() => {
                  if (index <= activeQuestion) handleScrollToQuestion(index);
                }}
                onMouseOver={(e) => handleMouseOver(e, index)}
                onMouseOut={handleMouseOut}
              >
                {question}
                <Tooltip
                  show={tooltip.show && tooltip.text === tooltips[index]} // 해당 tooltip만 표시
                  top={tooltip.top}
                  left={tooltip.left}
                >
                  {tooltip.text}
                </Tooltip>
              </li>
            ))}
          </ul>
        )}
      </Navbar>

      <QuestionWrap id="question0" ref={(el) => (questionRefs.current[0] = el)}>
        <Question>
          <p>
            아이디어가 아직 없어도 걱정마세요 😊<br />
            창업 성향 테스트로 함께 찾아볼까요?<br />
            새로운 기회를 발견할지 몰라요 !
          </p>
        </Question>

        <Answer>
          <StartWrap>
            <p onClick={() => handleScrollToQuestion(1)}>START</p>
            <span>내게 맞는 아이템 찾기</span>
          </StartWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question1" ref={(el) => (questionRefs.current[1] = el)}>
        <Question>
          <p>
            <span>Q1.</span>
            아침에 직장(학교)를<br />가기전 드는 생각은?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q1" name="question1" onChange={() => handleRadioChange(1)} />
              <label htmlFor="q1">
                <strong>💥</strong>
                <span>오늘은 무슨<br />대박을 터트릴까?</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q2" name="question1" onChange={() => handleRadioChange(1)} />
              <label htmlFor="q2">
                <strong>📅</strong>
                <span>오늘도 차분하게,<br />계획대로</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question2" ref={(el) => (questionRefs.current[2] = el)}>
        <Question>
          <p>
            <span>Q2.</span>
            위험하다는 말을 들었을 때<br />나는?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q3" name="question2" onChange={() => handleRadioChange(2)} />
              <label htmlFor="q3">
                <strong>🚀</strong>
                <span>그래도<br />도전해보자!</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q4" name="question2" onChange={() => handleRadioChange(2)} />
              <label htmlFor="q4">
                <strong>🔍</strong>
                <span>그럼 다른<br />방법을 찾자</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question3" ref={(el) => (questionRefs.current[3] = el)}>
        <Question>
          <p>
            <span>Q3.</span>
            실패할 수도<br />있을 때
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q5" name="question3" onChange={() => handleRadioChange(3)} />
              <label htmlFor="q5">
                <strong>💪</strong>
                <span>일단 부딪쳐<br />보자</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q6" name="question3" onChange={() => handleRadioChange(3)} />
              <label htmlFor="q6">
                <strong>🤔</strong>
                <span>신중히<br />생각해보자</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question4" ref={(el) => (questionRefs.current[4] = el)}>
        <Question>
          <p>
            <span>Q4.</span>
            기회가 오면<br />나는?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q7" name="question4" onChange={() => handleRadioChange(4)} />
              <label htmlFor="q7">
                <strong>🏃🏻</strong>
                <span>지금이야!<br />바로가자!</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q8" name="question4" onChange={() => handleRadioChange(4)} />
              <label htmlFor="q8">
                <strong>📝</strong>
                <span>탄탄히<br />준비하고 가자</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question5" ref={(el) => (questionRefs.current[5] = el)}>
        <Question>
          <p>
            <span>Q5.</span>
            최신 기술 뉴스에<br />대한 반응은?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q9" name="question5" onChange={() => handleRadioChange(5)} />
              <label htmlFor="q9">
                <strong>💡</strong>
                <span>이걸 어디<br />써먹을 수 있을까?</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q10" name="question5" onChange={() => handleRadioChange(5)} />
              <label htmlFor="q10">
                <strong>📖</strong>
                <span>재밌네<br />좀 더 알아보자</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question6" ref={(el) => (questionRefs.current[6] = el)}>
        <Question>
          <p>
            <span>Q6.</span>
            여유 자금이<br />생기면?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q11" name="question6" onChange={() => handleRadioChange(6)} />
              <label htmlFor="q11">
                <strong>💸</strong>
                <span>새로운 기회에<br />투자해보자</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q12" name="question6" onChange={() => handleRadioChange(6)} />
              <label htmlFor="q12">
                <strong>💼</strong>
                <span>일단 계획된 곳에<br />써야지</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question7" ref={(el) => (questionRefs.current[7] = el)}>
        <Question>
          <p>
            <span>Q7.</span>
            일할 때<br />나는?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q13" name="question7" onChange={() => handleRadioChange(7)} />
              <label htmlFor="q13">
                <strong>✋🏻</strong>
                <span>혼자 집중해서<br />해결하는게 좋아</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q14" name="question7" onChange={() => handleRadioChange(7)} />
              <label htmlFor="q14">
                <strong>👥</strong>
                <span>팀과 함께하는게<br />더 재밌어!</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question8" ref={(el) => (questionRefs.current[8] = el)}>
        <Question>
          <p>
            <span>Q8.</span>
            내가 원하는<br />창업 무대는?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q15" name="question8" onChange={() => handleRadioChange(8)} />
              <label htmlFor="q15">
                <strong>🎤</strong>
                <span>나 혼자<br />주도하는 무대!</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q16" name="question8" onChange={() => handleRadioChange(8)} />
              <label htmlFor="q16">
                <strong>🎪</strong>
                <span>다 같이 만드는<br />큰 무대</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question9" ref={(el) => (questionRefs.current[9] = el)}>
        <Question>
          <p>
            <span>Q9.</span>
            창업스타일 중<br />마음에 드는 건?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q17" name="question9" onChange={() => handleRadioChange(9)} />
              <label htmlFor="q17">
                <strong>🎨</strong>
                <span>혼자 자유롭게,<br />내 방식대로</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q18" name="question9" onChange={() => handleRadioChange(9)} />
              <label htmlFor="q18">
                <strong>🤝</strong>
                <span>팀과 함께<br />배우며 성장</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question10" ref={(el) => (questionRefs.current[10] = el)}>
        <Question>
          <p>
            <span>Q10.</span>
            어떤 분야에<br />더 끌리시나요?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q19" name="question10" onChange={() => handleRadioChange(10)} />
              <label htmlFor="q19">
                <strong>🌈</strong>
                <span>남다른 창의적<br />분야</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q20" name="question10" onChange={() => handleRadioChange(10)} />
              <label htmlFor="q20">
                <strong>📊</strong>
                <span>효과 확실한<br />분야</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question11" ref={(el) => (questionRefs.current[11] = el)}>
        <Question>
          <p>
            <span>Q11.</span>
            이루고 싶은<br />목표는?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q21" name="question11" onChange={() => handleRadioChange(11)} />
              <label htmlFor="q21">
                <strong>🌍✨</strong>
                <span>내 아이디어로<br />세상에 새로움 전하기</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q22" name="question11" onChange={() => handleRadioChange(11)} />
              <label htmlFor="q22">
                <strong>📊</strong>
                <span>바로 성과 내며<br />성장하기</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question12" ref={(el) => (questionRefs.current[12] = el)}>
        <Question>
          <p>
            <span>Q12.</span>
            신기술이나<br />새 아이디어에 대해 나는?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q23" name="question12" onChange={() => handleRadioChange(12)} />
              <label htmlFor="q23">
                <strong>🧪</strong>
                <span>새로운 걸<br />만들어보고 싶어!</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q24" name="question12" onChange={() => handleRadioChange(12)} />
              <label htmlFor="q24">
                <strong>🔧</strong>
                <span>실용적이어야<br />좋지</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>

      <QuestionWrap id="question13" ref={(el) => (questionRefs.current[13] = el)}>
        <Question>
          <p>
            <span>Q13.</span>
            가장 관심이 가는<br />분야는?
          </p>
        </Question>

        <Answer>
          <RadioButtonWrap>
            <RadioButton>
              <input type="radio" id="q23" name="question13" onChange={() => handleRadioChange(13)} />
              <label htmlFor="q23">
                <strong>💻</strong>
                <span>IT / 테크</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q24" name="question13" onChange={() => handleRadioChange(13)} />
              <label htmlFor="q24">
                <strong>🏋️‍♀️</strong>
                <span>헬스케어</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q25" name="question13" onChange={() => handleRadioChange(13)} />
              <label htmlFor="q25">
                <strong>📘</strong>
                <span>교육 / 컨설팅</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q26" name="question13" onChange={() => handleRadioChange(13)} />
              <label htmlFor="q26">
                <strong>🎨</strong>
                <span>예술 / 디자인</span>
              </label>
            </RadioButton>
            <RadioButton>
              <input type="radio" id="q27" name="question13" onChange={() => handleRadioChange(13)} />
              <label htmlFor="q27">
                <strong>🍔</strong>
                <span>외식 / 소매업</span>
              </label>
            </RadioButton>
          </RadioButtonWrap>
        </Answer>
      </QuestionWrap>
    </>
  );
};

export default NoItems;

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
  }
`;

const Answer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:32px;
  flex:1 1 50%;
`;

const StartWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:21px;

  p {
    width:190px;
    height:190px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:2.5rem;
    font-weight:600;
    line-height:1.5;
    color:${palette.white};
    border-radius:100%;
    background:#5547FF;
    cursor:pointer;
  }

  span {
    font-size:1.25rem;
    font-weight:300;
    color:${palette.gray800};
    line-height:1.3;
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
