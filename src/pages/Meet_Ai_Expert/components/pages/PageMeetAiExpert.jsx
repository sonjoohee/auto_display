import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  APPROACH_PATH,
  ANALYSIS_BUTTON_STATE,
  isLoggedInAtom,
  SAVED_REPORTS,
  USER_NAME,
  USER_EMAIL,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  STRATEGY_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  ADDITIONAL_REPORT_DATA, // Import the new list-based atom
  CONVERSATION_STAGE,
  ADDITIONAL_QUESTION_1,
  ADDITIONAL_QUESTION_2,
  ADDITIONAL_QUESTION_3,
  iS_CLICK_CHECK_REPORT_RIGHTAWAY,
  CONVERSATION,
  BUTTON_STATE,
} from "../../../AtomStates";

import { Link } from "react-router-dom";

import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

import OrganismHeader from "../../../organisms/OrganismHeader";
import OrganismLeftSideBar from "../../../Expert_Insight/components/organisms/OrganismLeftSideBar";

const PageMeetAiExpert = () => {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useAtom(ANALYSIS_BUTTON_STATE);
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO); // 상태값으로 설정
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  useEffect(() => {
    setSelectedExpertIndex(SELECTED_EXPERT_INDEX);
  }, []);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
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
  const [sections, setSections] = useState([]);
  const [additionalReportCount, setAdditionalReportCount] = useState(0);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );

  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  ); // Use the new list-based atom

  const [expert1ReportData, setExpert1ReportData] =
    useAtom(EXPERT1_REPORT_DATA);
  const [expert2ReportData, setExpert2ReportData] =
    useAtom(EXPERT2_REPORT_DATA);
  const [expert3ReportData, setExpert3ReportData] =
    useAtom(EXPERT3_REPORT_DATA);

  const [addtionalQuestion1, setAddtionalQuestion1] = useAtom(
    ADDITIONAL_QUESTION_1
  );
  const [addtionalQuestion2, setAddtionalQuestion2] = useAtom(
    ADDITIONAL_QUESTION_2
  );
  const [addtionalQuestion3, setAddtionalQuestion3] = useAtom(
    ADDITIONAL_QUESTION_3
  );

  const [inputAdditionalQuestion, setInputAdditionalQuestion] = useState("");
  const [isClickCheckReportRightAway, setIsClickCheckReportRightAway] = useAtom(
    iS_CLICK_CHECK_REPORT_RIGHTAWAY
  );

  const [isPopupRegex, setIsPopupRegex] = useState(false);
  const [isPopupRegex2, setIsPopupRegex2] = useState(false);
  const [isPopupLogin, setIsPopupLogin] = useState(false); // 로그인 상태가 아닐 때 팝업을 띄우기 위한 상태

  const closePopupRegex = () => {
    setInputBusinessInfo("");
    setIsPopupRegex(false); // 팝업 닫기
  };
  const closePopupRegex2 = () => {
    setIsPopupRegex2(false);
  };
  const closePopupLogin = () => {
    setIsPopupLogin(false); // 로그인 필요 팝업 닫기
  };
  useEffect(() => {
    setConversation([]);
    setConversationStage(1);
    setInputBusinessInfo("");
    setTitleOfBusinessInfo("");
    setMainFeaturesOfBusinessInformation([]);
    setMainCharacteristicOfBusinessInformation([]);
    setBusinessInformationTargetCustomer([]);
    setSelectedExpertIndex(1);
    setSections([]);
    setAdditionalReportCount(0);
    setSelectedAdditionalKeyword([]);
    setApproachPath(0);
    setAdditionalReportData([]);
    setExpert1ReportData({});
    setExpert2ReportData({});
    setExpert3ReportData({});
    setAddtionalQuestion1("");
    setAddtionalQuestion2("");
    setAddtionalQuestion3("");
    setInputAdditionalQuestion("");
    setIsClickCheckReportRightAway(false);
  }, []);

  useEffect(() => {
    const checkboxes = document.querySelectorAll(".accordion-toggle");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    });

    // Cleanup 이벤트 리스너
    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("change", () => {});
      });
    };
  }, []);

  const handledSearch = () => {
    const regex = /^[가-힣a-zA-Z0-9\s.,'"-]*$/;
    if (!regex.test(inputBusinessInfo)) {
      setIsPopupRegex(true);
      return;
    }
    if (inputBusinessInfo.trim() === "") {
      setIsPopupRegex2(true);
      return;
    }
    if (isLoggedIn) {
      setApproachPath(-1); // 검색을 통해 들어가는 경우
      setButtonState(1); // 버튼 상태를 1로 설정
      setSelectedExpertIndex("0");
      navigate("/ExpertInsight");
    } else {
      setIsPopupLogin(true); // 로그인 상태가 아니라면 로그인 팝업 띄우기
    }

  };

  // const handledExpertSelect = (index) => {
  //   setApproachPath(1);
  //   setInputBusinessInfo(""); // 또는 null, undefined로 초기화
  //   setSelectedExpertIndex(index);
  //   navigate("/ExpertInsight");
  // };
  const handledExpertSelect = (index) => {    if (isLoggedIn) {
    setApproachPath(1);
    setInputBusinessInfo(""); // 또는 null, undefined로 초기화
    setSelectedExpertIndex(index);
    navigate("/ExpertInsight");
  } else {
    setIsPopupLogin(true); // 로그인 상태가 아니라면 로그인 팝업 띄우기
  }

  };
  return (
    <>
      {/* <OrganismHeader /> */}

      <ContentsWrap>
        <OrganismLeftSideBar />

        <MainContent>
          <Title>
            Meet AI Expert
            <p>
              한 줄의 아이디어로 시작하는, AI 전문가와의 맞춤형 인사이트 세션
            </p>
          </Title>

          <InputWrap>
            <div className="inputWrap">
              <textarea
                placeholder="당신의 아이템 또는 프로젝트 아이디어를 적어 주세요 (예: 원격 근무자를 위한 생산성 관리 툴)"
                onInput={(e) => {
                  // 입력값을 최대 300자로 제한
                  if (e.target.value.length > 300) {
                    e.target.value = e.target.value.substring(0, 300);
                  }
                  setInputBusinessInfo(e.target.value);

                  // 글자 수 표시
                  const currentLength = e.target.value.length;
                  document.getElementById(
                    "letterCount"
                  ).innerText = `${currentLength}/300`;
                }}
              ></textarea>
              <button type="button" onClick={handledSearch}>
                검색
              </button>
            </div>
            <div className="maxLetter">
              <span id="letterCount">0/300</span>
            </div>
          </InputWrap>
          {/* <InputWrap>
            <div className="inputWrap">
              <textarea 
                placeholder="당신의 아이템 또는 프로젝트 아이디어를 적어 주세요 (예: 원격 근무자를 위한 생산성 관리 툴)"
                onChange={(e) => setInputBusinessInfo(e.target.value)}
              ></textarea>
              <button type="button" onClick={() => handledExpertSelect(0)}>검색</button>
            </div>
            <div className="maxLetter">
              <span>0/300</span>
            </div>
          </InputWrap> */}

          <ExpertSelectWrap>
            <h2>
              <img src={images.Chat} alt="" />
              AI 전문가 선택해서 시작하기
            </h2>

            <ExpertSelectBox>
              <ExpertCard
                onClick={() => {
                  setButtonState(1);
                  handledExpertSelect(1);
                }}
              >
                <span>
                  <img src={images.IconChat} alt="" />
                </span>
                <p>가볍게 시작하는 내 비즈니스 전략 팁</p>
                <strong>전략 디렉터와 1:1 커피챗</strong>
              </ExpertCard>
              <ExpertCard
                onClick={() => {
                  setButtonState(1);
                  handledExpertSelect(2);
                }}
              >
                <span>
                  <img src={images.IconWrite} alt="" />
                </span>
                <p>지금 바로 쓸 수 있는 브랜딩 솔루션</p>
                <strong>10초 맞춤 제안서 받기</strong>
              </ExpertCard>
              <ExpertCard
                onClick={() => {
                  setButtonState(1);
                  handledExpertSelect(3);
                }}
              >
                <span>
                  <img src={images.IconTarget2} alt="" />
                </span>
                <p>고객 데이터 전문가의 맞춤 타겟 추천</p>
                <strong>당장 만나야할 고객은?</strong>
              </ExpertCard>
              <ExpertCard More>
                <div>
                  {/* <span>More</span> */}
                  <p>Coming Soon</p>
                </div>
              </ExpertCard>
            </ExpertSelectBox>
          </ExpertSelectWrap>
        </MainContent>
      </ContentsWrap>

      {isPopupRegex && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupRegex(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupRegex}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>한글, 영문 외 특수문자는 입력할 수 없어요. 자음이나 모음만 입력한 경우 검색이 제한되니, 문장을 완전하게 입력해주세요.</p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupRegex}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isPopupRegex2 && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupRegex2(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupRegex2}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>비즈니스 분석을 위해 내용을 입력해주세요</p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupRegex2}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}

{isPopupLogin && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupLogin(); // 팝업 닫기
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupLogin}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>로그인 후 사용해 주세요.</p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupLogin}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default PageMeetAiExpert;

// 스타일 정의는 기존대로 유지

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // height:100%;
  justify-content: center;
`;

const ContentsWrap = styled.div`
  position: relative;
  width: calc(100% - 40px);
  display: flex;
  gap: 40px;
  flex-direction: row;
  // height:100dvh;
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  // font-size:3.13rem;
  font-size: 2rem;
  font-weight: 600;
  // margin:0 auto 55px;
  margin: 120px auto 55px;

  p {
    // font-size:1.25rem;
    font-size: 0.875rem;
    font-weight: 400;
  }
`;

const InputWrap = styled.div`
  // max-width:1000px;
  max-width: 820px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 20px;
  border: 1px solid ${palette.lineGray};
  background: ${palette.white};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  .inputWrap {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    // padding:28px 38px;
    padding: 28px;

    textarea {
      width: 100%;
      height: 40px;
      font-family: "Pretendard", "Poppins";
      font-size: 1rem;
      outline: 0;
      border: 0;
      resize: none;

      &::placeholder {
        color: ${palette.gray500};
      }
    }

    button {
      flex-shrink: 0;
      width: 27px;
      height: 27px;
      font-size: 0;
      border: 0;
      background: url(${images.IconSearch}) center no-repeat;
      transition: all 0.5s;

      &:hover {
        background: url(${images.IconSearchHover}) center no-repeat;
      }
    }
  }

  .maxLetter {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    color: ${palette.gray500};
    padding: 15px 35px;
    border-top: 1px solid ${palette.lineGray};
    background: #ebf3fe;
  }
`;

const ExpertSelectWrap = styled.div`
  position: relative;
  max-width: 1240px;
  width: 100%;
  margin: 120px auto 100px;

  h2 {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 22px;
  }

  a {
    font-size: 1.25rem;
    text-decoration: underline;
    color: ${palette.black};

    &:hover {
      color: ${palette.black};
    }
  }
`;

const ExpertSelectBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  // margin-bottom:30px;

  > div {
    flex: 1 1 20%;
  }
`;

const ExpertCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 280px;
  text-align: left;
  padding: 40px;
  border-radius: 16px;
  border: ${(props) => {
    if (props.select) return `1px solid ${palette.blue}`;
    else if (props.More) return `none`;
    else return `1px solid ${palette.lineGray}`;
  }};
  background: ${(props) => {
    if (props.select) return palette.blue;
    else if (props.More) return `rgba(0,0,0,.03)`;
    else return palette.white;
  }};
  box-shadow: ${(props) => {
    if (props.select) return `0 4px 30px rgba(0, 0, 0, 0.1)`;
    else return `none`;
  }};
  cursor: ${(props) => {
    if (props.More) return `auto`;
    else return `pointer`;
  }};
  pointer-events: ${(props) => {
    if (props.More) return `auto`;
    else return `auto`;
  }};
  transition: all 0.5s;

  span {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 100px;
    border: 1px solid ${palette.lineGray};
    background: ${palette.white};

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  p {
    font-size: 0.75rem;
    font-weight: 400;
    color: ${(props) => (props.select ? palette.white : palette.lightGray)};
    margin-top: auto;
  }

  strong {
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) => (props.select ? palette.white : palette.darkGray)};
    letter-spacing: -1px;
  }

  &:hover {
    border: 1px solid ${palette.blue};
    background: ${palette.blue};

    p,
    strong {
      color: ${palette.white};
    }
  }

  ${(props) =>
    props.More &&
    css`
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        height: 100%;

        span {
          position: relative;
          font-size: 0;
          border: 0;

          &:before,
          &:after {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 5px;
            border-radius: 2px;
            background: #e8e8e8;
            content: "";
          }
          &:before {
            width: 20px;
            height: 5px;
          }
          &:after {
            width: 5px;
            height: 20px;
          }
        }

        p {
          color: ${palette.gray};
          margin-top: 0;
        }
      }

      &:hover {
        border: none;
        background: rgba(0, 0, 0, 0.03);

        p,
        strong {
          color: ${palette.gray};
        }
      }
    `}
`;

const FAQSection = styled.div`
  width: 100%;
  max-width: 1210px;
  text-align: left;

  h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 400;
    color: ${palette.gray};
    margin-bottom: 22px;

    select {
      font-family: "Pretendard";
      font-size: 1rem;
      padding: 10px 12px;
      border-radius: 30px;
      border: 1px solid ${palette.lineGray};
    }
  }
`;

const AccordionMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AccordionItem = styled.div`
  .accordion-toggle {
    display: none;
  }

  .accordion-label {
    position: relative;
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 1.13rem;
    font-weight: 400;
    color: ${palette.gray};
    padding: 14px 24px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
    background: none;
    cursor: pointer;

    &:after {
      position: absolute;
      right: 26px;
      top: 48%;
      transform: translateY(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      border-right: 1px solid ${palette.black};
      border-bottom: 1px solid ${palette.black};
      transition: all 0.5s;
      content: "";
    }

    &:before {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 22px;
      height: 22px;
      border-radius: 50px;
      background: rgba(0, 0, 0, 0.05);
      content: "";
    }
  }

  .accordion-toggle:checked + .accordion-label:after {
    transform: translateY(-20%) rotate(-135deg);
  }

  .accordion-toggle:checked + .accordion-label + div {
    max-height: 1000px;
    margin-top: 20px;
    padding: 0 16px;
  }
`;

const AccordionContent = styled.div`
  max-height: 0;
  font-size: 1.13rem;
  color: ${palette.gray};
  overflow: hidden;
  padding: 0 16px;
  transition: max-height 0.5s ease, padding 0.5s ease;

  > div + div {
    margin-top: 30px;
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
    padding: 11px;
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
      background: ${palette.black};
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
    }

    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 500;
            display: block;
          }
          span {
            font-size: 0.75rem;
            font-weight: 400;
            color: ${palette.gray500};
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            font-family: "Pretendard", "Poppins";
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.blue};
              background: none;
            }
          }
        }
      `}
  }
`;