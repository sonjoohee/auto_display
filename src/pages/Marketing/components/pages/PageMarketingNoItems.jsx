import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import { MARKETING_MBTI_ANSWER, MARKETING_MBTI_RESULT, MARKETING_RECOMMENDED_ITEM_BUTTON_STATE, MARKETING_INTEREST } from "../../../AtomStates";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";
import { useNavigate } from "react-router-dom";

const PageMarketingNoItems = () => {
  const navigate = useNavigate();
  const { saveConversation } = useSaveConversation();
  const [marketingMbtiAnswer, setMarketingMbtiAnswer] = useAtom(MARKETING_MBTI_ANSWER);
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(MARKETING_MBTI_RESULT);
  const [marketingRecommendedItemButtonState, setMarketingRecommendedItemButtonState] = useAtom(MARKETING_RECOMMENDED_ITEM_BUTTON_STATE);
  const [marketingInterest, setMarketingInterest] = useAtom(MARKETING_INTEREST);

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

  const updateMbtiAnswer = (index, newValue) => {
    setMarketingMbtiAnswer((prev) => [...prev.slice(0, index), newValue, ...prev.slice(index + 1)]);
  };
  
  const generateMbti = (category) => {
    setMarketingInterest(category);

    let mbti = "";

    if (marketingMbtiAnswer[0] < 0) mbti += "R";
    else mbti += "S";

    if (marketingMbtiAnswer[1] < 0) mbti += "O";
    else mbti += "P";

    if (marketingMbtiAnswer[2] < 0) mbti += "I";
    else mbti += "T";

    if (marketingMbtiAnswer[3] < 0) mbti += "C";
    else mbti += "A";

    const mbtiResult = {
      name: mbti,
      category: mbti === "ROIC" ? "불도저형 스타트업러" : mbti === "ROTC" ? "모험심 가득한 팀플레이 혁신가" : mbti === "SOIA" ? "기회만 보면 달려가는 신중형" : mbti === "RPTC" ? "팀플레이 혁신가" : mbti === "ROTA" ? "팀과 함께 달리는 야심가" : mbti === "SPIC" ? "차근차근형 아이디어 매니아" : mbti === "SOTC" ? "기획형 팀 도전자" : mbti === "RPIA" ? "혼자서도 멋진 현실주의 전략가" : mbti === "ROIA" ? "실용적 독고다이" : mbti === "SPTC" ? "안전지향 창의 협력자" : mbti === "SPIA" ? "독립적 실용 전략가" : mbti === "RPTA" ? "모험적 팀 실용주의자" : mbti === "SOIC" ? "안정적 독립 기회포착형" : mbti === "SOTA" ? "실용적 팀 기회주의자" : mbti === "RPIC" ? "독립적 모험 계획가" : mbti === "SPTA" ? "실용적 팀 혁신가" : "",
      summary: mbti === "ROIC" ? "과감한 실행력과 창의력으로 위험을 두려워하지 않고 빠르게 기회를 잡는 멋진 타입이에요!" : mbti === "ROTC" ? "창의적 도전가로, 팀플레이를 통해 위험을 극복하며 목표를 향해 돌진하는 스타일이군요" : mbti === "SOIA" ? "기회가 오면 빠르게 잡되, 리스크를 최소화하며 안정적인 사업을 선호하는 타입!" : mbti === "RPTC" ? "팀과 함께 창의적 프로젝트에 도전하며 계획적으로 혁신적인 목표를 달성하는 스타일!" : mbti === "ROTA" ? "팀과 협력하여 빠르게 성장하며 성과를 내기 위해 과감히 위험을 감수하는 타입!" : mbti === "SPIC" ? "안정적인 환경에서 아이디어를 꼼꼼히 다듬고 창의적인 성과를 추구하는 타입이에요." : mbti === "SOTC" ? "팀과 함께 기회를 잡으며, 창의적인 프로젝트를 통해 성장을 목표로 하는 타입입니다." : mbti === "RPIA" ? "RPIA 유형은 독립적으로 계획을 실행하며 실용적 성과를 추구하는 현실주의 전략가!" : mbti === "ROIA" ? "빠르게 기회를 포착하고, 독립적으로 실용적인 결과를 추구하는 스타일입니다." : mbti === "SPTC" ? "안정적인 환경에서 팀과 함께 창의적인 아이디어를 실현하는 유형입니다." : mbti === "SPIA" ? "안정을 추구하면서도 독립적으로 실용적인 전략을 계획하고 실행하는 스타일입니다." : mbti === "RPTA" ? "팀과 협력하여 실용적인 목표를 위해 계획적으로 리스크를 감수하는 유형입니다." : mbti === "SOIC" ? "안정을 추구하면서도 독립적으로 창의적인 기회를 포착하는 스타일입니다." : mbti === "SOTA" ? "팀과 협력하여 안정적으로 실용적인 기회를 포착하는 스타일입니다." : mbti === "RPIC" ? "위험을 감수하면서도 독립적으로 창의적인 계획을 세우고 실행하는 모험적 창업가입니다." : mbti === "SPTA" ? "팀과 함께 실용적인 혁신을 추구하며, 계획적으로 리스크를 감수하는 유형입니다." : "",
      description: mbti === "ROIC" ? "불도저형 스타트업러는 대담하고 공격적인 전략을 선호하며, 높은 위험을 감수할 준비가 되어 있는 창업자에게 적합한 유형입니다. 이 유형은 빠르게 변화하는 시장에서 신속한 성장을 목표로 하며, 혁신적인 기술이나 아이디어를 추진합니다. 독립적인 실행력과 창의성으로 남다른 길을 개척해나갑니다." : mbti === "ROTC" ? "모험심 가득한 팀플레이 혁신가: ROTC 유형은 두려움 없이 새로움을 추구하는 창의적 도전가로, ‘팀플레이’를 통해 기회를 만들어내는 데 탁월합니다. 고위험의 거친 파도 속에서도 팀원들과 협력하며 기회를 포착하고, 창의적 아이디어를 무기로 목표를 향해 돌진합니다. 이들은 팀과 함께할 때 더 큰 에너지를 발휘하며, 새로운 방식으로 문제를 해결하는 데도 능합니다." : mbti === "SOIA" ? "기회만 보면 달려가는 신중형은 기회가 왔을 때 빠르게 잡되, 리스크 관리에도 신경을 쓰는 유형입니다. 안정적인 사업 운영을 중시하면서도 잠재적 이익을 놓치지 않으려는 창업자에게 적합하며, 안정과 기회 포착 사이의 균형을 유지하려고 노력합니다." : mbti === "RPTC" ? "팀플레이 혁신가는 팀과 함께 창의적 프로젝트에 도전하며, 계획적으로 리스크를 감수하면서 혁신적인 목표를 달성합니다. 협력과 혁신을 동시에 중시하는 이 유형은 팀원과의 조화로운 협업을 통해 큰 성과를 이끌어냅니다." : mbti === "ROTA" ? "팀과 함께 달리는 야심가는 빠른 성장과 성과 달성을 목표로, 고위험을 감수하면서도 팀과 협력하는 창업자 유형입니다. 강한 리더십과 추진력으로 팀과 함께 빠른 속도로 목표를 달성하고자 합니다." : mbti === "SPIC" ? "차근차근형 아이디어 매니아는 안정적인 환경에서 아이디어를 정성스럽게 다듬고 창의적인 성과를 추구합니다. 신중하면서도 새로운 아이디어에 대한 열정을 가진 유형으로, 안정적인 환경에서 꾸준히 성과를 이루려는 창업자에게 잘 맞습니다." : mbti === "SOTC" ? "기회형 팀 도전자는 팀과 함께 기회를 발견하고 창의적인 프로젝트로 성장을 목표로 합니다. 리스크를 최소화하면서도 혁신을 통해 새로운 가능성을 추구하는 유형입니다." : mbti === "RPIA" ? "혼자서도 멋진 현실주의 전략가: RPIA 유형은 무작정 도전하기보다는 ‘현실적 전략’을 세우고 철저히 계획을 지키며 나아갑니다. 독립적인 성향이 강해 ‘나 홀로’ 도전을 즐기며, 실용적인 성과를 중요시합니다. 무턱대고 위험을 감수하지 않고, 계획된 리스크 안에서 최대한의 성과를 뽑아내는 것이 특징입니다. 혼자서도 자신만의 세상에 빠져들어 문제를 해결하고, 차분히 결과를 만들어내는 타입입니다" : mbti === "ROIA" ? "실용적 독고다이는 빠르게 기회를 포착하고 독립적으로 실용적인 결과를 추구합니다. 높은 위험을 감수하면서도 실질적인 성과에 집중하는 창업자 유형으로, 독립적인 결단력이 강점입니다." : mbti === "SPTC" ? "안전지향 창의 협력자는 안정적인 환경에서 팀과 협력하여 창의적인 아이디어를 계획적으로 실현하는 유형입니다. 창의성과 협업을 조화롭게 활용하면서 신중하게 성과를 쌓아 나갑니다." : mbti === "SPIA" ? "독립적 실용 전략가는 안정적인 환경 속에서도 독립적으로 실용적인 전략을 계획하고 실행하는 유형입니다. 리스크를 최소화하면서도 실질적인 성과를 추구하는 창업자에게 잘 맞습니다." : mbti === "RPTA" ? "모험적 팀 실용주의자는 팀과 함께 실용적 목표를 위해 계획적으로 위험을 감수하는 유형입니다. 팀 협력을 통해 실용적이고 구체적인 목표를 달성하고자 하며, 안전한 성장을 도모합니다." : mbti === "SOIC" ? "안정적 독립 기회포착형은 안정을 추구하면서도 창의적인 기회를 독립적으로 포착하는 균형 잡힌 유형입니다. 창의성과 안정성을 동시에 중요시하는 창업자에게 적합하며, 신중하면서도 혁신적인 접근이 특징입니다." : mbti === "SOTA" ? "실용적 팀 기회주의자는 팀과 함께 실용적 가치를 중심으로 안정적으로 기회를 포착하는 유형입니다. 협력을 통해 실질적인 성과를 이루며, 팀워크를 통해 안정적인 성장을 추구합니다." : mbti === "RPIC" ? "독립적 모험 계획가는 위험을 감수하면서도 독립적으로 창의적인 계획을 세우고 실행하는 유형입니다. 도전적이면서도 창의적인 비전을 가진 창업자에게 적합하며, 스스로 목표를 세우고 빠르게 실행해 나갑니다." : mbti === "SPTA" ? "실용적 팀 혁신가는 팀과 함께 실용적인 혁신을 추구하며, 계획적으로 위험을 감수하는 유형입니다. 팀의 협력을 통해 실용적 목표를 이루고자 하며, 신중하면서도 혁신적인 접근이 특징입니다." : "",
    }

    setMarketingMbtiResult(mbtiResult);
    setMarketingRecommendedItemButtonState(1);

    saveConversation({ changingConversation: { marketingMbtiResult: mbtiResult } });
    navigate("/MarketingSetting/2/Result");
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
            <RadioButton onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] - 1)}>
              <input type="radio" id="q1" name="question1" onChange={() => handleRadioChange(1) } />
              <label htmlFor="q1">
                <strong>💥</strong>
                <span>오늘은 무슨<br />대박을 터트릴까?</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] - 1)}>
              <input type="radio" id="q3" name="question2" onChange={() => handleRadioChange(2)} />
              <label htmlFor="q3">
                <strong>🚀</strong>
                <span>그래도<br />도전해보자!</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] - 1)}>
              <input type="radio" id="q5" name="question3" onChange={() => handleRadioChange(3)} />
              <label htmlFor="q5">
                <strong>💪</strong>
                <span>일단 부딪쳐<br />보자</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(0, marketingMbtiAnswer[0] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] - 1)}>
              <input type="radio" id="q7" name="question4" onChange={() => handleRadioChange(4)} />
              <label htmlFor="q7">
                <strong>🏃🏻</strong>
                <span>지금이야!<br />바로가자!</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] - 1)}>
              <input type="radio" id="q9" name="question5" onChange={() => handleRadioChange(5)} />
              <label htmlFor="q9">
                <strong>💡</strong>
                <span>이걸 어디<br />써먹을 수 있을까?</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] - 1)}>
              <input type="radio" id="q11" name="question6" onChange={() => handleRadioChange(6)} />
              <label htmlFor="q11">
                <strong>💸</strong>
                <span>새로운 기회에<br />투자해보자</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(1, marketingMbtiAnswer[1] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] - 1)}>
              <input type="radio" id="q13" name="question7" onChange={() => handleRadioChange(7)} />
              <label htmlFor="q13">
                <strong>✋🏻</strong>
                <span>혼자 집중해서<br />해결하는게 좋아</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] - 1)}>
              <input type="radio" id="q15" name="question8" onChange={() => handleRadioChange(8)} />
              <label htmlFor="q15">
                <strong>🎤</strong>
                <span>나 혼자<br />주도하는 무대!</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] - 1)}>
              <input type="radio" id="q17" name="question9" onChange={() => handleRadioChange(9)} />
              <label htmlFor="q17">
                <strong>🎨</strong>
                <span>혼자 자유롭게,<br />내 방식대로</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(2, marketingMbtiAnswer[2] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] - 1)}>
              <input type="radio" id="q19" name="question10" onChange={() => handleRadioChange(10)} />
              <label htmlFor="q19">
                <strong>🌈</strong>
                <span>남다른 창의적<br />분야</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] - 1)}>
              <input type="radio" id="q21" name="question11" onChange={() => handleRadioChange(11)} />
              <label htmlFor="q21">
                <strong>🌍✨</strong>
                <span>내 아이디어로<br />세상에 새로움 전하기</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] + 1)}>
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
            <RadioButton onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] - 1)}>
              <input type="radio" id="q23" name="question12" onChange={() => handleRadioChange(12)} />
              <label htmlFor="q23">
                <strong>🧪</strong>
                <span>새로운 걸<br />만들어보고 싶어!</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => updateMbtiAnswer(3, marketingMbtiAnswer[3] + 1)}>
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
            <RadioButton onClick={() => {generateMbti("IT/테크")}}>
              <input type="radio" id="q23" name="question13" />
              <label htmlFor="q23">
                <strong>💻</strong>
                <span>IT / 테크</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => {generateMbti("헬스케어")}}>
              <input type="radio" id="q24" name="question13" />
              <label htmlFor="q24">
                <strong>🏋️‍♀️</strong>
                <span>헬스케어</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => {generateMbti("교육/컨설팅")}}>
              <input type="radio" id="q25" name="question13" />
              <label htmlFor="q25">
                <strong>📘</strong>
                <span>교육 / 컨설팅</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => {generateMbti("예술/디자인")}}>
              <input type="radio" id="q26" name="question13" />
              <label htmlFor="q26">
                <strong>🎨</strong>
                <span>예술 / 디자인</span>
              </label>
            </RadioButton>
            <RadioButton onClick={() => {generateMbti("외식/소매업")}}>
              <input type="radio" id="q27" name="question13" />
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

export default PageMarketingNoItems;

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
