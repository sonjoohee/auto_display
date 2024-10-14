import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import {
  passwordAtom,
  newPasswordAtom,
  rePasswordAtom,
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
  ADDITIONAL_REPORT_DATA, // Import the new list-based atom
  CONVERSATION_STAGE,
  iS_CLICK_CHECK_REPORT_RIGHTAWAY,
  CONVERSATION,
  BUTTON_STATE,
  CONVERSATION_ID,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_LIST,
  IS_EDITING_NOW,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  RECOMMENDED_TARGET_DATA,
  POC_DETAIL_REPORT_ATOM,
  POC_PERSONA_LIST,
  EXPERT_DETAIL_DATA,
  IS_MOBILE,
} from "../../../AtomStates";

import { Link } from "react-router-dom";

import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

import OrganismHeader from "../../../organisms/OrganismHeader";
import OrganismLeftSideBar from "../../../Expert_Insight/components/organisms/OrganismLeftSideBar";
import MoleculeLoginPopup from "../../../Login_Sign/components/molecules/MoleculeLoginPopup"; // 로그인 팝업 컴포넌트 임포트
import MoleculeAccountPopup from "../../../Login_Sign/components/molecules/MoleculeAccountPopup"; // 계정설정 팝업 컴포넌트 임포트

const PageMeetAiExpert = () => {
  const [isMobile, setIsMobile] = useAtom(IS_MOBILE);
  const location = useLocation();
  const navigate = useNavigate();
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(
    RECOMMENDED_TARGET_DATA
  );
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [selectedPocOptions, setSelectedPocOptions] =
    useAtom(SELECTED_POC_OPTIONS);
  const [selectedExpertList, setSelectedExpertList] =
    useAtom(SELECTED_EXPERT_LIST);
  const [analysisButtonState, setAnalysisButtonState] = useAtom(
    ANALYSIS_BUTTON_STATE
  );
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(
    IS_EXPERT_INSIGHT_ACCESSIBLE
  );
  const [expertData] = useAtom(EXPERT_DETAIL_DATA);
  const [password, setPassword] = useAtom(passwordAtom);
  const [newPassword, setNewPassword] = useAtom(newPasswordAtom);
  const [rePassword, setRePassword] = useAtom(rePasswordAtom);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO); // 상태값으로 설정
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);

  useEffect(() => {
    setSelectedExpertIndex(SELECTED_EXPERT_INDEX);
  }, []);

  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
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

  const [strategyReportData, setStrategyReportData] =
    useAtom(STRATEGY_REPORT_DATA);

  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);

  const [inputAdditionalQuestion, setInputAdditionalQuestion] = useState("");
  const [isClickCheckReportRightAway, setIsClickCheckReportRightAway] = useAtom(
    iS_CLICK_CHECK_REPORT_RIGHTAWAY
  );

  const [isPopupRegex, setIsPopupRegex] = useState(false);
  const [isPopupRegex2, setIsPopupRegex2] = useState(false);
  const [isPopupLogin, setIsPopupLogin] = useState(false); // 로그인 상태가 아닐 때 팝업을 띄우기 위한 상태
  const [isPopupInvalidBusiness, setIsPopupInvalidBusiness] = useState(false);
  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false); // 계정설정 팝업
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false); // 로그인 팝업 상태 관리
  const [isComingSoon, setIsComingSoon] = useState(false);

  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [advise, setAdvise] = useState(""); // 새로운 advise 상태 추가

  const [pocDetailReportData, setpocDetailReportData] = useAtom(
    POC_DETAIL_REPORT_ATOM
  );

  const closePopupRegex = () => {
    setInputBusinessInfo("");
    setIsPopupRegex(false); // 팝업 닫기
  };
  const closePopupRegex2 = () => {
    setIsPopupRegex2(false);
  };
  const closePopupLogin = () => {
    setIsPopupLogin(false); // 로그인 필요 팝업 닫기
    setLoginPopupOpen(true);
  };
  const closePopupInvalidBusiness = () => {
    setIsPopupInvalidBusiness(false); // 팝업 닫기
  };
  const closeAccountPopup = () => {
    setAccountPopupOpen(false); // 계정설정 팝업 닫기
  };
  const closeLoginPopup = () => {
    setLoginPopupOpen(false); // 로그인 팝업 닫기
  };
  const closeComingSoonPopup = () => {
    setIsComingSoon(false);
  };

  useEffect(() => {
    let savedInputBusinessInfo = "";
    // If there's inputBusinessInfo in the location state, save it
    if (location.state && location.state.inputBusinessInfo) {
      savedInputBusinessInfo = location.state.inputBusinessInfo;
      // Remove the inputBusinessInfo from location.state
      const newState = { ...location.state };
      delete newState.inputBusinessInfo;
      window.history.replaceState(newState, '');

      // 비로그인 상태에서 들어온 경우 로그인 팝업 띄우기
      if (!isLoggedIn) {
        setLoginPopupOpen(true);
      }
    }
  

    // Reset all states except inputBusinessInfo
    setConversation([]);
    setConversationId(null);
    setConversationStage(1);
    setTitleOfBusinessInfo("");
    setMainFeaturesOfBusinessInformation([]);
    setMainCharacteristicOfBusinessInformation([]);
    setBusinessInformationTargetCustomer([]);
    setSelectedExpertIndex("0");
    setSections([]);
    setAdditionalReportCount(0);
    setSelectedAdditionalKeyword([]);
    setApproachPath(0);
    setAdditionalReportData([]);
    setCustomerAdditionalReportData([]);
    setStrategyReportData({});
    setInputAdditionalQuestion("");
    setSelectedCustomerAdditionalKeyword([]);
    setIsClickCheckReportRightAway(false);
    setPassword("");
    setNewPassword("");
    setRePassword("");
    setSelectedExpertList([]);
    setIsEditingNow(false);
    setSelectedPocOptions([]);
    setSelectedPocTarget({});
    setRecommendedTargetData({});
    setpocDetailReportData({});
    setPocPersonaList([]);
    setInputBusinessInfo(savedInputBusinessInfo);
  }, [location]);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 엔터 동작 방지
      handledSearch(); // 검색 함수 호출
    }
  };

  const handledSearch = async () => {
    // 로그인 상태인지 확인 후 처리
    if (isLoggedIn) {
      const regex = /^[가-힣a-zA-Z0-9\s.,'"?!()\-]*$/;
      const specialChars = /^[.,'"?!()\-]+$/;

      // 단독으로 특수 문자만 사용된 경우
      if (specialChars.test(inputBusinessInfo.trim())) {
        setIsPopupRegex(true);
        return;
      }

      // 입력 값에 대한 정규식 및 빈 값 체크
      if (!regex.test(inputBusinessInfo)) {
        setIsPopupRegex(true);
        return;
      }
      if (inputBusinessInfo.trim() === "") {
        setIsPopupRegex2(true);
        return;
      }

      try {
        const data = {
          business_info: inputBusinessInfo,
        };
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        };

        // 서버로 질문 요청 보내기 (주석처리)
        // let response = await axios.post(
        //   "https://wishresearch.kr/panels/customer_add_question",
        //   sampledata,
        //   axiosConfig
        // );

        // const answerData = response.data.additional_question;

        // 임시 데이터로 성공 처리
        const answerData = { answer: "Sample answer from AI" };

        // answerData.advise가 있을 경우에만 동작 진행
        if (!answerData.advise) {
          setIsExpertInsightAccessible(true);
          setApproachPath(-1); // 검색을 통해 들어가는 경우
          setAnalysisButtonState(1); // 버튼 상태를 1로 설정
          setSelectedExpertIndex(0);
          navigate("/ExpertInsight");
        } else {
          setAdvise(answerData.advise); // advise 데이터 설정
          setIsPopupInvalidBusiness(true); // 경고 팝업 띄우기
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    } else {
      setIsPopupLogin(true); // 로그인 상태가 아니라면 로그인 팝업 띄우기
    }
  };

  const getExpertImage = (expertIndex) => {
    switch (expertIndex) {
      case "1":
        return images.ImgStrategy;
      case "2":
        return images.ImgMarketing;
      case "3":
        return images.ImgClient;
      case "4":
        return images.ImgPoC;
      default:
        return images.ImgPoC; // 기본 이미지
    }
  };

  const handledExpertSelect = (index) => {
    if (isLoggedIn) {
      setIsExpertInsightAccessible(true);
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

      <ContentsWrap isMobile={isMobile}>
        <OrganismLeftSideBar />
        <MainContent isMobile={isMobile}>
          <Title>
            Meet AI Expert
            <p>
              한 줄의 아이디어로 시작하는, AI 전문가와의 맞춤형 인사이트 세션
            </p>
          </Title>

          <InputWrap isMobile={isMobile}>
            <div className="inputWrap">
              <textarea
                placeholder="당신의 아이템 또는 프로젝트 아이디어를 적어 주세요 (예: 원격 근무자를 위한 생산성 관리 툴)"
                value={inputBusinessInfo}
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
                onKeyDown={handleKeyPress} // 키 입력 이벤트 핸들러 추가
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

          <ExpertSelectWrap isMobile={isMobile}>
            {/* 고정 데이터 활용 */}
            <ExpertSelectBox isMobile={isMobile}>
              <ExpertCard
                PoC
                onClick={() => {
                  setAnalysisButtonState(1);
                  handledExpertSelect("4");
                }}
              >
                <strong>PoC 설계 전문가</strong>
                <p>아이템 및 PoC 목적에 따른 가설 검증 방법 제시</p>
                <span>
                  <img src={images.ImgPoC} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard
                Strategy
                onClick={() => {
                  setAnalysisButtonState(1);
                  handledExpertSelect("1");
                }}
              >
                <strong>전략 컨설턴트</strong>
                <p>차별화 전략과 리스트 분석 제시</p>
                <span>
                  <img src={images.ImgStrategy} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard
                Marketing
                onClick={() => {
                  setAnalysisButtonState(1);
                  handledExpertSelect("2");
                }}
              >
                <strong>마케팅 전략가</strong>
                <p>마케팅 방향성과 실행 방안 제시</p>
                <span>
                  <img src={images.ImgMarketing} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard
                Client
                onClick={() => {
                  setAnalysisButtonState(1);
                  handledExpertSelect("3");
                }}
              >
                <strong>고객 세분화 전문가</strong>
                <p>고객 세분화와 맞춤 전략 제시</p>
                <span>
                  <img src={images.ImgClient} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard
                Idea
                onClick={() => {
                  setIsComingSoon(true);
                }}
              >
                <strong>아이디어 디벨로퍼</strong>
                <p>다양한 아이디어 발굴과 최적의 사업 아이디어 도출</p>
                <span>
                  <img src={images.ImgIdea} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard
                Hacker
                onClick={() => {
                  setIsComingSoon(true);
                }}
              >
                <strong>그로스 해커</strong>
                <p>고객 퍼널을 분석하여, 마케팅<br/>퍼널별 전략 제시</p>
                <span>
                  <img src={images.ImgHacker} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard
                BM
                onClick={() => {
                  setIsComingSoon(true);
                }}
              >
                <strong>BM 전문가</strong>
                <p>비즈니스 모델 설계 및 최적화</p>
                <span>
                  <img src={images.ImgBM} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard
                Price
                onClick={() => {
                  setIsComingSoon(true);
                }}
              >
                <strong>가격 분석 전문가</strong>
                <p>시장 데이터를 기반으로 최적의 가격 전략 제시 (제품 한정)</p>
                <span>
                  <img src={images.ImgPrice} alt="" />
                </span>
              </ExpertCard>

              <ExpertCard Coming>
                <div>
                  <span>
                    <img src={images.ImgComing} alt="" />
                  </span>
                  <p>coming soon</p>
                </div>
              </ExpertCard>

              <ExpertCard Empty>
                <div>
                  <span>
                    <img src="" alt="" />
                  </span>
                  <p></p>
                </div>
              </ExpertCard>

            </ExpertSelectBox>
          </ExpertSelectWrap>
          {/* API 데이터 활용 */}
          {/* <ExpertSelectBox>
              {expertData.results && expertData.results.map((expert) => (
                <ExpertCard
                  key={expert.id}
                  PoC={expert.expertIndex === "4"}
                  Marketing={expert.expertIndex === "2"}
                  Client={expert.expertIndex === "3"}
                  Strategy={expert.expertIndex === "1"}
                  onClick={() => {
                    setAnalysisButtonState(1);
                    handledExpertSelect(expert.expertIndex);
                  }}
                >
                  <strong>{expert.job}</strong>
                  <p>{expert.coreValue}</p>
                  <span>
                  <img src={getExpertImage(expert.expertIndex)} alt="" />
                  </span>
                </ExpertCard>
              ))}

              <ExpertCard Coming>
                <div>
                  <span>
                    <img src={images.ImgComing} alt="" />
                  </span>
                  <p>coming soon</p>
                </div>
              </ExpertCard>
            </ExpertSelectBox>
          </ExpertSelectWrap> */}
          {isLoginPopupOpen && <MoleculeLoginPopup onClose={closeLoginPopup} />}

          {isAccountPopupOpen && (
            <MoleculeAccountPopup onClose={closeAccountPopup} />
          )}
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
            <p>
              한글, 영문 외 특수문자는 입력할 수 없어요. 자음이나 모음만 입력한
              경우 검색이 제한되니, 문장을 완전하게 입력해주세요.
            </p>
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
      {isPopupInvalidBusiness && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupInvalidBusiness(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupInvalidBusiness}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>
              올바른 비즈니스 정보를 입력해주세요. 입력한 정보로 검색이 제한될
              수 있습니다.
            </p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupInvalidBusiness}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
      {isComingSoon && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeComingSoonPopup();
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closeComingSoonPopup}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>전문가가 곧 공개됩니다<br />조금만 기다려 주세요!</p>
            <div className="btnWrap">
              <button type="button" onClick={closeComingSoonPopup}>
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
  justify-content: center;
  padding: ${(props) => (props.isMobile ? "0" : "0 20px")};
`;

const ContentsWrap = styled.div`
  position: relative;
  width: ${(props) => (props.isMobile ? "100%" : "calc(100% - 40px)")};
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  gap: ${(props) => (props.isMobile ? "20px" : "40px")};
  padding: ${(props) => (props.isMobile ? "20px" : "0")};
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  // font-size:3.13rem;
  font-size: ${(props) => (props.isMobile ? "1.5rem" : "2rem")};
  font-weight: 600;
  // margin:0 auto 55px;
  margin: ${(props) => (props.isMobile ? "40px auto 30px" : "120px auto 55px")};

  p {
    // font-size:1.25rem;
    font-size: ${(props) => (props.isMobile ? "0.75rem" : "0.875rem")};
    font-weight: 400;
  }
`;

const InputWrap = styled.div`
  // max-width:1000px;
  max-width: ${(props) => (props.isMobile ? "100%" : "820px")};
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
    padding: ${(props) => (props.isMobile ? "20px" : "28px")};

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
      font-family: "Pretendard", "Poppins";
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
  max-width: 1040px;
  width: 100%;
  margin: ${(props) =>
    props.isMobile ? "60px auto 50px" : "120px auto 100px"};

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
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  justify-content: space-between;
  gap: ${(props) => (props.isMobile ? "10px" : "15px")};
  // margin-bottom:30px;

  > div {
    flex: ${(props) => (props.isMobile ? "1 1 auto" : "1 1 18%")};
  }
`;

const ExpertCard = styled.div`
  visibility: ${(props) => (props.Empty ? "hidden" : "visible")};
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: ${(props) => (props.isMobile ? "auto" : "215px")};
  text-align: left;
  padding: ${(props) => (props.isMobile ? "20px 15px" : "26px 20px")};
  border-radius: 16px;
  border: ${(props) => {
    if (props.select) return `1px solid ${palette.blue}`;
    else if (props.Coming) return `none`;
    else if (props.PoC) return `1px solid #E2E7EA`;
    else if (props.Marketing) return `1px solid #F0EDE6`;
    else if (props.Client) return `1px solid #E2E7EA`;
    else if (props.Strategy) return `1px solid #E0E5DF`;
    else if (props.Idea) return `1px solid #DAE1F1`;
    else if (props.Hacker) return `1px solid #EDE9DE`;
    else if (props.BM) return `1px solid #EEE7E7`;
    else if (props.Price) return `1px solid #E8E2EA`;
    else return `1px solid ${palette.gray100}`;
  }};
  background: ${(props) => {
    if (props.select) return palette.blue;
    else if (props.Coming) return `rgba(0,0,0,.03)`;
    else if (props.PoC) return `#E2E7EA`;
    else if (props.Marketing) return `#F0EDE6`;
    else if (props.Client) return `#E2E7EA`;
    else if (props.Strategy) return `#E0E5DF`;
    else if (props.Idea) return `#DAE1F1`;
    else if (props.Hacker) return `#EDE9DE`;
    else if (props.BM) return `#EEE7E7`;
    else if (props.Price) return `#E8E2EA`;
    else return palette.gray100;
  }};
  box-shadow: ${(props) => {
    if (props.select) return `0 4px 30px rgba(0, 0, 0, 0.1)`;
    else return `none`;
  }};
  cursor: ${(props) => {
    if (props.Coming) return `auto`;
    else return `pointer`;
  }};
  pointer-events: ${(props) => {
    if (props.Coming) return `auto`;
    else return `auto`;
  }};
  transition: all 0.5s;

  span {
    position: relative;
    width: 70px;
    height: 70px;
    margin: 0 auto;
    margin-top: auto;
    // border-radius: 100px;
    // border: 1px solid ${palette.lineGray};
    // background: ${palette.white};

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
    color: ${(props) => (props.select ? palette.white : palette.gray500)};
  }

  strong {
    font-family: "Pretendard", "Poppins";
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) => (props.select ? palette.white : palette.darkGray)};
    letter-spacing: -1px;
    line-height: 1.2rem;
    min-height: 1.2rem;
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

  ${(props) =>
    props.Coming &&
    css`
      align-items: center;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin: auto;
      }

      span {
        position: relative;
        font-size: 0;
        border: 0;
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
      line-height: 1.5;
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
