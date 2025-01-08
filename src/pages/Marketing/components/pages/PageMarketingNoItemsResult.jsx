import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css, ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/Theme";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import {
  SkeletonH1,
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from "jotai";
import {
  MARKETING_MBTI_RESULT,
  MARKETING_INTEREST,
  MARKETING_RECOMMENDED_ITEM_BUTTON_STATE,
  MARKETING_RECOMMENDED_ITEM_DATA,
  IS_LOADING,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  CONVERSATION,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
} from "../../../AtomStates";
import axios from "axios";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";

const PageMarketingNoItemsResult = () => {
  const navigate = useNavigate();
  const { saveConversation } = useSaveConversation();
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(
    MARKETING_MBTI_RESULT
  );
  const [marketingInterest, setMarketingInterest] = useAtom(MARKETING_INTEREST);
  const [
    marketingRecommendedItemButtonState,
    setMarketingRecommendedItemButtonState,
  ] = useAtom(MARKETING_RECOMMENDED_ITEM_BUTTON_STATE);
  const [marketingRecommendedItemData, setMarketingRecommendedItemData] =
    useAtom(MARKETING_RECOMMENDED_ITEM_DATA);
  const [isLoadingRecommendedItem, setIsLoadingRecommendedItem] =
    useAtom(IS_LOADING);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(
    IS_EXPERT_INSIGHT_ACCESSIBLE
  );

  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
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

  // 팝업
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  const handleOpenPopup = (index) => {
    setIsPopup1Open(true);
    setPopupIndex(index);
  };

  const closePopup = () => {
    setIsPopup1Open(false); // 팝업 닫기
  };

  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);

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
    window.location.href = "/";
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const data = {
    expert_id: "11",
    startup_mbti: marketingMbtiResult.name,
    startup_interest: marketingInterest,
  };

  useEffect(() => {
    const handleRecommendedItem = async () => {
      if (marketingRecommendedItemButtonState) {
        setIsLoading(true);
        setIsLoadingRecommendedItem(true);
        setMarketingRecommendedItemButtonState(0);

        let response = await axios.post(
          "https://wishresearch.kr/panels/marketing/mbti_result",
          data,
          axiosConfig
        );
        let recommendedItemData = response.data.marketing_mbti_result;

        let retryCount = 0;
        const maxRetries = 10;

        while (
          retryCount < maxRetries &&
          (!response?.data?.marketing_mbti_result ||
            typeof recommendedItemData !== "object" ||
            !recommendedItemData?.overview?.name ||
            !recommendedItemData?.overview?.description ||
            !Array.isArray(recommendedItemData?.example) ||
            recommendedItemData.example.length !== 3 ||
            recommendedItemData.example.some(
              (item) =>
                !item?.name ||
                !item?.summary ||
                !item?.description ||
                !Array.isArray(item?.mbti) ||
                item.mbti.some(
                  (contentItem) =>
                    !contentItem?.type ||
                    !contentItem?.description ||
                    !contentItem?.compatibility
                )
            ))
        ) {
          retryCount += 1;

          response = await axios.post(
            "https://wishresearch.kr/panels/marketing/mbti_result",
            data,
            axiosConfig
          );
          recommendedItemData = response.data.marketing_mbti_result;
        }

        setMarketingRecommendedItemData(recommendedItemData);

        setIsLoadingRecommendedItem(false);
        setIsLoading(false);
      }
    };

    handleRecommendedItem();
  }, [marketingRecommendedItemButtonState]);

  const handleButtonExpert = async (index) => {
    const itemName = marketingRecommendedItemData?.example?.[index]?.summary;
    const itemDetail =
      marketingRecommendedItemData?.example?.[index]?.description;

    const updatedConversation = [...conversation];

    updatedConversation.push(
      {
        type: "system",
        message: `${marketingMbtiResult.category} 스타일 이시군요! 그 성향에 맞는 ${itemName}을 분석해드릴게요\n당신의 스타일에 딱 맞는 창업 전략을 잡는데 도움이 되었으면 좋겠어요 ✨`,
        expertIndex: 0,
      },
      {
        type: "system",
        message: `자! 이제 본격적인 준비를 시작해보겠습니다.\n먼저 시장에서 ${itemName}의 가능성을 한눈에 파악할 수 있는 시장조사를 바로 시작해볼게요`,
        expertIndex: -1,
      },
      { type: "marketingStartButton" }
    );

    const analysisReportData = {
      title: itemName,
      mainFeatures: itemDetail,
      mainCharacter: [],
      mainCustomer: [],
    };

    await saveConversation({
      changingConversation: {
        conversation: updatedConversation,
        analysisReportData: analysisReportData,
      },
    });

    setTitleOfBusinessInfo(itemName);
    setInputBusinessInfo(itemName);
    setMainFeaturesOfBusinessInformation(itemDetail);
    setConversation(updatedConversation);
    setIsExpertInsightAccessible(true);
    navigate("/ExpertInsight");
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(null);
  const [questionFlex, setQuestionFlex] = useState("1 1 100%");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // 모바일 화면
      } else {
        setIsMobile(false); // 데스크탑 화면
      }
    };

    checkMobile(); // 처음 로드 시 확인
    window.addEventListener("resize", checkMobile); // 화면 크기 변경 시 확인

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (isMobile) {
      setIsDragging(true);
      setStartY(e.clientY); // 마우스 위치 저장
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || startY === null) return;

    const currentY = e.clientY;

    // 위로 드래그 시 flex: 10%, 아래로 드래그 시 flex: 70%
    if (startY - currentY > 30) {
      // 위로 드래그했을 때
      setQuestionFlex("1 1 10%");
    } else if (currentY - startY > 30) {
      setQuestionFlex("1 1 70%");
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartY(null);
  };

  const handleTouchStart = (e) => {
    if (isMobile) {
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || startY === null) return;

    const currentY = e.touches[0].clientY;

    // 위로 드래그 시 flex: 10%, 아래로 드래그 시 flex: 70%
    if (startY - currentY > 30) {
      setQuestionFlex("1 1 10%");
    } else if (currentY - startY > 30) {
      setQuestionFlex("1 1 70%");
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setStartY(null);
  };

  const handleShare = async () => {
    try {
      // 실제 배포된 도메인으로 변경해야 합니다
      const shareUrl = `${window.location.origin}/MarketingSetting/Share/${marketingMbtiResult.name}`;
      
      await navigator.clipboard.writeText(shareUrl);
      alert('URL이 클립보드에 복사되었습니다!'); // 사용자에게 복사 성공 알림
      
      // navigate(`/MarketingSetting/Share/${marketingMbtiResult.name}`, {
      //   state: {
      //     mbtiResult: {
      //       name: marketingMbtiResult.name,
      //       category: marketingMbtiResult.category,
      //       summary: marketingMbtiResult.summary,
      //       description: marketingMbtiResult.description
      //     }
      //   },
      //   replace: true
      // });
    } catch (err) {
      console.error("Error sharing:", err);
      alert("URL 복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <QuestionWrap>
          <Question
            // style={{ flex: questionFlex }}
            style={{
              flex: isMobile ? questionFlex : "1 1 50%",
            }}
            isDragging={isDragging}
            questionFlex={questionFlex}
          >
            <p>
              <span>
                <img
                  src={
                    marketingMbtiResult.name === "ROIC"
                      ? images.ImgMBTIROIC
                      : marketingMbtiResult.name === "ROIA"
                      ? images.ImgMBTIROIA
                      : marketingMbtiResult.name === "ROTC"
                      ? images.ImgMBTIROTC
                      : marketingMbtiResult.name === "ROTA"
                      ? images.ImgMBTIROTA
                      : marketingMbtiResult.name === "RPIA"
                      ? images.ImgMBTIRPIA
                      : marketingMbtiResult.name === "RPIC"
                      ? images.ImgMBTIRPIC
                      : marketingMbtiResult.name === "RPTA"
                      ? images.ImgMBTIRPTA
                      : marketingMbtiResult.name === "RPTC"
                      ? images.ImgMBTIRPTC
                      : marketingMbtiResult.name === "SOIA"
                      ? images.ImgMBTISOIA
                      : marketingMbtiResult.name === "SOIC"
                      ? images.ImgMBTISOIC
                      : marketingMbtiResult.name === "SOTA"
                      ? images.ImgMBTISOTA
                      : marketingMbtiResult.name === "SOTC"
                      ? images.ImgMBTISOTC
                      : marketingMbtiResult.name === "SPIA"
                      ? images.ImgMBTISPIA
                      : marketingMbtiResult.name === "SPIC"
                      ? images.ImgMBTISPIC
                      : marketingMbtiResult.name === "SPTA"
                      ? images.ImgMBTISPTA
                      : marketingMbtiResult.name === "SPTC"
                      ? images.ImgMBTISPTC
                      : marketingMbtiResult.name === "SPTA"
                      ? images.ImgMBTISPTA
                      : ""
                  }
                  alt=""
                />
              </span>
              {marketingMbtiResult.category} <br />
              {marketingMbtiResult.name}
            </p>
            <div>
              <strong>{marketingMbtiResult.summary}</strong>
              <p>{marketingMbtiResult.description}</p>
              <ShareButton onClick={handleShare}>
                결과 공유하기
              </ShareButton>
            </div>
          </Question>

          <Answer
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            isDragging={isDragging}
            questionFlex={questionFlex}
          >
            <ResultWrap>
              <div className="info">
                <strong>{marketingMbtiResult.summary}</strong>
                <p>{marketingMbtiResult.description}</p>
              </div>

              <div className="title">
                <strong>💡 추천 아이템, 내 사업으로 만들기</strong>
                <p>
                  추천된 아이템의 가능성을 분석하고, 나만의 창업 아이템으로
                  발전시켜 보세요
                </p>
              </div>

              <ListBox>
                {isLoadingRecommendedItem ? (
                  <>
                    <div
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <SkeletonTitle
                        className="title-placeholder"
                        style={{ marginBottom: "0" }}
                      />
                      <SkeletonLine className="title-placeholder" />
                    </div>
                    <div
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <SkeletonTitle
                        className="title-placeholder"
                        style={{ marginBottom: "0" }}
                      />
                      <SkeletonLine className="title-placeholder" />
                    </div>
                    <div
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <SkeletonTitle
                        className="title-placeholder"
                        style={{ marginBottom: "0" }}
                      />
                      <SkeletonLine className="title-placeholder" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p>
                        <strong>
                          {marketingRecommendedItemData?.example?.[0]?.name}
                        </strong>
                        {marketingRecommendedItemData?.example?.[0]?.summary}
                      </p>
                      <span onClick={() => handleOpenPopup(0)}>시작하기</span>
                    </div>
                    <div>
                      <p>
                        <strong>
                          {marketingRecommendedItemData?.example?.[1]?.name}
                        </strong>
                        {marketingRecommendedItemData?.example?.[1]?.summary}
                      </p>
                      <span onClick={() => handleOpenPopup(1)}>시작하기</span>
                    </div>
                    <div>
                      <p>
                        <strong>
                          {marketingRecommendedItemData?.example?.[2]?.name}
                        </strong>
                        {marketingRecommendedItemData?.example?.[2]?.summary}
                      </p>
                      <span onClick={() => handleOpenPopup(2)}>시작하기</span>
                    </div>
                  </>
                )}
              </ListBox>

              <span className="comment">
                * 위 아이템은 창업 MBTI 결과를 기반으로 구성되었으며, 현실에
                없는 아이템이 포함될 수 있습니다.
              </span>
            </ResultWrap>
          </Answer>

          {isPopup1Open && (
            <Popup
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  closePopup(); // 상태를 false로 설정
                }
              }}
            >
              <div>
                <ScrollBoxWrap>
                  <div className="header">
                    <h5>
                      {
                        marketingRecommendedItemData?.example?.[popupIndex]
                          ?.summary
                      }
                    </h5>
                    <p>
                      {
                        marketingRecommendedItemData?.example?.[popupIndex]
                          ?.description
                      }
                    </p>
                    <button className="closePopup" onClick={() => closePopup()}>
                      닫기
                    </button>
                  </div>
                  <div className="body">
                    <ScrollWrap>
                      <div>
                        <strong>
                          <span>{marketingMbtiResult.name[0]}</span>
                          {marketingMbtiResult.name[0] === "S"
                            ? "안정 추구 (Safety-seeking)"
                            : "고위험 추구 (Risk-seeking)"}
                        </strong>
                        <p>
                          {
                            marketingRecommendedItemData?.example?.[popupIndex]
                              ?.mbti?.[0]?.compatibility
                          }
                        </p>
                      </div>
                      <div>
                        <strong>
                          <span>{marketingMbtiResult.name[1]}</span>
                          {marketingMbtiResult.name[1] === "O"
                            ? "기회 포착형 (Opportunity-driven)"
                            : "계획획 기반형 (Planning-driven)"}
                        </strong>
                        <p>
                          {
                            marketingRecommendedItemData?.example?.[popupIndex]
                              ?.mbti?.[1]?.compatibility
                          }
                        </p>
                      </div>
                      <div>
                        <strong>
                          <span>{marketingMbtiResult.name[2]}</span>
                          {marketingMbtiResult.name[2] === "I"
                            ? "독립성 중시 (Independence-focused)"
                            : "협력 중시 (Teamwork-focused)"}
                        </strong>
                        <p>
                          {
                            marketingRecommendedItemData?.example?.[popupIndex]
                              ?.mbti?.[2]?.compatibility
                          }
                        </p>
                      </div>
                      <div>
                        <strong>
                          <span>{marketingMbtiResult.name[3]}</span>
                          {marketingMbtiResult.name[3] === "C"
                            ? "창의성 중심 (Creativity-centered)"
                            : "실용성 중심 (Application-centered)"}
                        </strong>
                        <p>
                          {
                            marketingRecommendedItemData?.example?.[popupIndex]
                              ?.mbti?.[3]?.compatibility
                          }
                        </p>
                      </div>
                    </ScrollWrap>

                    <PopupButton>
                      <button onClick={() => handleButtonExpert(popupIndex)}>
                        사업화 가능성 확인하기
                      </button>
                    </PopupButton>
                  </div>
                </ScrollBoxWrap>
              </div>
            </Popup>
          )}
        </QuestionWrap>
        {isExitPopupOpen && (
          <ExitPopup Cancel>
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
                <strong>모든 내용이 삭제됩니다</strong>
                <span>
                  종료 또는 새로고침 할 경우, 모든 대화내역이 사라집니다.
                </span>
              </p>
              <div className="btnWrap">
                <button type="button" onClick={handleExitCancel}>
                  계속 진행하기
                </button>
                <button type="button" onClick={handleExitConfirm}>
                  종료할게요
                </button>
              </div>
            </div>
          </ExitPopup>
        )}
      </ThemeProvider>
    </>
  );
};

export default PageMarketingNoItemsResult;

const QuestionWrap = styled.section`
  position: relative;
  height: 100dvh;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Question = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 64px;
  flex: 1 1 50%;
  background: #5547ff;
  transition: all 0.5s;

  > p {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.4;
    color: ${palette.white};
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 12px;

    span {
      font-size: 1.25rem;
      font-weight: 300;
      line-height: 1.2;

      img {
        max-width: 100px;
      }
    }

    br {
      display: ${(props) =>
        props.questionFlex === "1 1 10%" ? "none" : "inline"};
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 680px;
    text-align: left;
    padding: 32px;
    margin: 0 10%;
    border-radius: 20px;
    background: ${palette.white};

    strong {
      font-size: 1.13rem;
      font-weight: 500;
      color: #5547ff;
      line-height: 1.5;
    }

    p {
      font-size: 1.25rem;
      line-height: 1.6;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1 1 100%;
    // justify-content:end;
    // padding-bottom:76px;
    justify-content: ${(props) =>
      props.questionFlex === "1 1 10%" ? "center" : "end"};
    padding-bottom: ${(props) =>
      props.questionFlex === "1 1 10%" ? "0" : "76px"};

    > p {
      font-size: 1.25rem;

      span {
        // display: ${(props) => (props.isSmallFlex ? "none" : "inline-block")};
        display: ${(props) =>
          props.questionFlex === "1 1 10%" ? "none" : "block"};

        img {
          max-width: 100%;
        }
      }
    }

    div {
      display: none;
    }

    ${(props) =>
      props.isDragging &&
      `
      ${Question} {
        flex: 1 1 10%;
      }
    `}
  }
`;

const Answer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex: 1 1 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1 1 70%;
    overflow: hidden;
    justify-content: flex-start;
    overflow-y: ${(props) =>
      props.questionFlex === "1 1 10%" ? "auto" : "hidden"};

    ${(props) =>
      props.isDragging &&
      `
      overflow-y: auto;
    `}
  }
`;

const ResultWrap = styled.div`
  max-width: 566px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 10%;

  .info {
    display: none;
    flex-direction: column;
    gap: 16px;
    text-align: left;
    padding-bottom: 32px;
    margin-bottom: 10px;
    border-bottom: 4px solid ${palette.chatGray};

    strong {
      font-size: 1.13rem;
      font-weight: 500;
      line-height: 1.5;
      color: #5547ff;
    }

    p {
      font-weight: 300;
      line-height: 1.6;
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;

    strong {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.5;
    }

    p {
      font-weight: 300;
      line-height: 1.5;
      margin-left: 22px;
    }
  }

  .comment {
    font-size: 0.88rem;
    font-weight: 300;
    color: ${palette.gray500};
    line-height: 1.5;
    text-align: left;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 44px 20px;
    margin: 0 auto;

    .info {
      display: flex;
    }

    .title {
      strong {
        font-size: 1.13rem;
      }

      p {
        font-size: 0.88rem;
      }
    }

    .comment {
      font-size: 0.75rem;
      letter-spacing: -0.5px;
    }
  }
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid ${palette.gray200};
  }

  p {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-weight: 300;
    color: ${palette.gray800};
    line-height: 1.5;
    text-align: left;

    strong {
      font-weight: 600;
      color: #5547ff;
    }
  }

  span {
    flex-shrink: 0;
    font-size: 0.88rem;
    color: #0453f4;
    line-height: 1.5;
    padding: 8px 20px;
    border-radius: 5px;
    background: rgba(4, 83, 244, 0.1);
    cursor: pointer;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 8px;

    > div {
      padding: 16px 20px;
      border-radius: 15px;
    }

    p {
      font-size: 0.88rem;

      strong {
        font-size: 1rem;
      }
    }

    span {
      padding: 8px 12px;
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
    right: 0;
    top: 0;
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
    gap: 32px;
    width: 100%;
    max-width: 686px;
    text-align: center;
    padding: 32px;
    border-radius: 20px;
    background: ${palette.white};
    max-height: 90vh; // 화면을 벗어나지 않도록 최대 높이 설정
  }

  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 1rem;
    text-align: left;
    padding-bottom: 32px;
    margin-bottom: 32px;
    border-bottom: 1px solid ${palette.gray200};

    h5 {
      font-size: 1rem;
      font-weight: 500;
      color: #5547ff;
      line-height: 1.7;
    }

    p {
      font-weight: 400;
      line-height: 1.6;
      color: ${palette.gray800};
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: auto; // 내용이 넘칠 경우 스크롤 추가
    // max-height: calc(90vh - 64px);
    // max-height:570px;
    max-height: 40dvh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background: rgba(0, 0, 0, 0.6);

    > div {
      top: auto;
      bottom: 0;
      transform: translateX(-50%);
      height: 83%;
      // padding:56px 0 0;
      // padding: 56px 0 84px;
      padding: 20px 0 84px;
      overflow: hidden;
      border-radius: 20px 20px 0 0;
    }

    .closePopup {
      right: 20px;
      top: 0;
    }

    .header {
      padding: 0 20px;
      gap: 16px;
      padding-bottom: 32px;
      padding-top: 30px;

      h5 {
        font-size: 1.13rem;
        line-height: 1.5;
      }

      p {
        font-weight: 300;
      }
    }

    .body {
      padding: 0 20px 30px;
      max-height: 100%;
      overflow: initial;
    }
  }
`;

const ScrollBoxWrap = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow-y: auto;
  }
`;

const ScrollWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  // max-height: 580px;
  overflow-y: auto;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;

    strong {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 300;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        font-weight: 400;
        color: ${palette.blue};
        border-radius: 5px;
        background: rgba(4, 83, 244, 0.1);
      }
    }

    p {
      font-weight: 300;
      line-height: 1.6;
      color: ${palette.gray700};
      text-align: left;
      padding-left: 44px;
    }
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${palette.lineGray};
    border-radius: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 20px;
    overflow: initial;

    > div {
      text-align: left;

      p {
        font-size: 0.88rem;
      }
    }
  }
`;

const PopupButton = styled.div`
  display: flex;
  gap: 12px;
  align-itesm: center;

  button {
    width: 100%;
    font-family: Pretendard, Poppins;
    font-weight: 600;
    font-size: 1rem;
    color: ${palette.white};
    line-height: 1.5;
    padding: 12px;
    border-radius: 8px;
    border: 0;
    background: ${palette.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    width: calc(100% - 40px);
  }
`;

const ExitPopup = styled.div`
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
        color: #f40404;
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
        font-family: "Pretendard", "Poppins";
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > div {
      width: 90%;
    }
  }
`;

const ShareButton = styled.button`
  padding: 16px 48px;
  background: ${palette.white};
  color: #5547ff;
  border: none;
  border-radius: 50px;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 12px 32px;
    font-size: 1rem;
  }
`;
