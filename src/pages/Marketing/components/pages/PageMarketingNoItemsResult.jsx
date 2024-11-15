import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import images from "../../../../assets/styles/Images";
import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";
import { palette } from "../../../../assets/styles/Palette";
import { useAtom } from 'jotai';
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
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(MARKETING_MBTI_RESULT);
  const [marketingInterest, setMarketingInterest] = useAtom(MARKETING_INTEREST);
  const [marketingRecommendedItemButtonState, setMarketingRecommendedItemButtonState] = useAtom(MARKETING_RECOMMENDED_ITEM_BUTTON_STATE);
  const [marketingRecommendedItemData, setMarketingRecommendedItemData] = useAtom(MARKETING_RECOMMENDED_ITEM_DATA);
  const [isLoadingRecommendedItem, setIsLoadingRecommendedItem] = useAtom(IS_LOADING);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(IS_EXPERT_INSIGHT_ACCESSIBLE);

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
    window.location.href = "/MarketingLanding";
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
      if(marketingRecommendedItemButtonState) {
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

        while (retryCount < maxRetries && (
          !response?.data?.marketing_mbti_result ||
          typeof recommendedItemData !== "object" ||
          !recommendedItemData?.overview?.name ||
          !recommendedItemData?.overview?.description ||
          !Array.isArray(recommendedItemData?.example) ||
          recommendedItemData.example.length !== 3 ||
          recommendedItemData.example.some(item => 
            !item?.name || 
            !item?.summary ||
            !item?.description ||
            !Array.isArray(item?.mbti) ||
            item.mbti.some(contentItem => 
              !contentItem?.type || 
              !contentItem?.description ||
              !contentItem?.compatibility
            )
          )
        ))
          {
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
    const itemDetail = marketingRecommendedItemData?.example?.[index]?.description;

    const updatedConversation = [...conversation];

    updatedConversation.push(
      {
        type: "system",
        message: 
          `${marketingMbtiResult.name} 창업가 이시군요! 그 성향에 맞는 ${itemName}을 분석해드릴게요\n당신의 스타일에 딱 맞는 창업 전략을 잡는데 도움이 되었으면 좋겠어요 ✨`,
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

    await saveConversation(
      { changingConversation: { conversation: updatedConversation, analysisReportData: analysisReportData } }
    );

    setTitleOfBusinessInfo(itemName);
    setInputBusinessInfo(itemName);
    setMainFeaturesOfBusinessInformation(itemDetail);
    setConversation(updatedConversation);
    setIsExpertInsightAccessible(true);
    navigate("/ExpertInsight");
  };

  return (
    <>
      <QuestionWrap>
        <Question>
          <p>
            <span>
              <img 
                src={
                  marketingMbtiResult.name === "ROIC" ? images.ImgMBTIROIC :
                  marketingMbtiResult.name === "ROIA" ? images.ImgMBTIROIA :
                  marketingMbtiResult.name === "ROTC" ? images.ImgMBTIROTC :
                  marketingMbtiResult.name === "ROTA" ? images.ImgMBTIROTA :
                  marketingMbtiResult.name === "RPIA" ? images.ImgMBTIRPIA :
                  marketingMbtiResult.name === "RPIC" ? images.ImgMBTIRPIC :
                  marketingMbtiResult.name === "RPTA" ? images.ImgMBTIRPTA :
                  marketingMbtiResult.name === "RPTC" ? images.ImgMBTIRPTC :
                  marketingMbtiResult.name === "SOIA" ? images.ImgMBTISOIA :
                  marketingMbtiResult.name === "SOIC" ? images.ImgMBTISOIC :
                  marketingMbtiResult.name === "SOTA" ? images.ImgMBTISOTA :
                  marketingMbtiResult.name === "SOTC" ? images.ImgMBTISOTC :
                  marketingMbtiResult.name === "SPIA" ? images.ImgMBTISPIA :
                  marketingMbtiResult.name === "SPIC" ? images.ImgMBTISPIC :
                  marketingMbtiResult.name === "SPTC" ? images.ImgMBTISPTC :
                  ""
                } 
                alt=""
              />
            </span>
            {marketingMbtiResult.category}<br />{marketingMbtiResult.name}
          </p>
          <div>
            <strong>{marketingMbtiResult.summary}</strong>
            <p>{marketingMbtiResult.description}</p>
          </div>
        </Question>

        <Answer>
          <ResultWrap>
            <div className="title">
              <strong>💡 맞춤 추천 아이템</strong>
              <p>아이템이 나에게 맞는지 확인하고, 나만의 비즈니스로 발전시킬 힌트를 얻어보세요</p>
            </div>

            <ListBox>
              {isLoadingRecommendedItem ? (
                <>
                  <SkeletonTitle className="title-placeholder" />
                  <SkeletonTitle className="title-placeholder" />
                  <SkeletonTitle className="title-placeholder" />
                </>
              ) : (
                <>
                  <div>
                    <p>
                      <strong>{marketingRecommendedItemData?.example?.[0]?.name}</strong>
                      {marketingRecommendedItemData?.example?.[0]?.summary}
                    </p>
                    <span onClick={() => handleOpenPopup(0)}>시작하기</span>
                  </div>
                  <div>
                    <p>
                      <strong>{marketingRecommendedItemData?.example?.[1]?.name}</strong>
                      {marketingRecommendedItemData?.example?.[1]?.summary}
                    </p>
                    <span onClick={() => handleOpenPopup(1)}>시작하기</span>
                  </div>
                  <div>
                    <p>
                      <strong>{marketingRecommendedItemData?.example?.[2]?.name}</strong>
                      {marketingRecommendedItemData?.example?.[2]?.summary}
                    </p>
                    <span onClick={() => handleOpenPopup(2)}>시작하기</span>
                  </div>
                </>
              )}
            </ListBox>

            <span className="comment">* 일부 아이템은 현실에 없는 아이템으로 혁신적 가능성을 고려해 제시되었습니다.</span>
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
              <div className="header">
                <h5>{marketingRecommendedItemData?.example?.[popupIndex]?.summary}</h5>
                <p>{marketingRecommendedItemData?.example?.[popupIndex]?.description}</p>
                <button className="closePopup" onClick={() => closePopup()}>닫기</button>
              </div>
              <div className="body">
                <ScrollWrap>
                  <div>
                    <strong>
                      <span>{marketingMbtiResult.name[0]}</span>
                      안정 추구 (Safety-seeking)
                    </strong>
                    <p>{marketingRecommendedItemData?.example?.[popupIndex]?.mbti?.[0]?.compatibility}</p>
                  </div>
                  <div>
                    <strong>
                      <span>{marketingMbtiResult.name[1]}</span>
                      기회 포착형 (Opportunity-driven)
                    </strong>
                    <p>{marketingRecommendedItemData?.example?.[popupIndex]?.mbti?.[1]?.compatibility}</p>
                  </div>
                  <div>
                    <strong>
                      <span>{marketingMbtiResult.name[2]}</span>
                      독립성 중시 (Independence-focused)
                    </strong>
                    <p>{marketingRecommendedItemData?.example?.[popupIndex]?.mbti?.[2]?.compatibility}</p>
                  </div>
                  <div>
                    <strong>
                      <span>{marketingMbtiResult.name[3]}</span>
                      창의성 중심 (Creativity-centered)
                    </strong>
                    <p>{marketingRecommendedItemData?.example?.[popupIndex]?.mbti?.[3]?.compatibility}</p>
                  </div>
                </ScrollWrap>

                <PopupButton>
                  <button onClick={() => handleButtonExpert(popupIndex)}>사업화 가능성 확인하기</button>
                </PopupButton>
              </div>
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
      </ExitPopup>
    )}
    </>
  );
};

export default PageMarketingNoItemsResult;

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
  flex-direction:column;
  gap:64px;
  flex:1 1 50%;
  background:#5547FF;

  > p {
    font-size:2.5rem;
    font-weight:600;
    line-height:1.4;
    color:${palette.white};
    text-align:center;
    display:flex;
    flex-direction:column;
    gap:12px;

    span {
      font-size:1.25rem;
      font-weight:300;
      line-height:1.2;
    }
  }

  div {
    display:flex;
    flex-direction:column;
    gap:16px;
    max-width:680px;
    text-align:left;
    padding:32px;
    margin:0 10%;
    border-radius:20px;
    background:${palette.white};

    strong {
      font-size:1.13rem;
      font-weight:500;
      color:#5547FF;
      line-height:1.5;
    }

    p {
      font-size:1.25rem;
      line-height:1.6;
    }
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
    gap:32px;
    width: 100%;
    max-width: 686px;
    text-align: center;
    padding: 32px;
    border-radius: 20px;
    background: ${palette.white};
  }

  .header {
    position:relative;
    display:flex;
    flex-direction:column;
    gap:20px;
    font-size:1rem;
    text-align:left;
    padding-bottom:32px;
    border-bottom:1px solid ${palette.gray200};

    h5 {
      font-weight:500;
      color:#5547FF;
      line-height:1.7;
    }

    p {
      font-weight:400;
      line-height:1.6;
      color:${palette.gray800};
    }
  }

  .body {
    display:flex;
    flex-direction:column;
    gap:32px;
  }
`;

const ScrollWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:32px;
  max-height:580px;
  overflow-y:auto;

  > div {
    display:flex;
    flex-direction:column;
    gap:12px;

    strong {
      display:flex;
      align-items:center;
      gap:12px;
      font-weight:300;

      span {
        display:flex;
        justify-content:center;
        align-items:center;
        width:32px;
        height:32px;
        font-weight:400;
        color:${palette.blue};
        border-radius:5px;
        background:rgba(4, 83, 244, 0.1);
      }
    }

    p {
      font-weight:300;
      line-height:1.6;
      color:${palette.gray700};
      text-align:left;
      padding-left:44px;
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
`;

const PopupButton = styled.div`
  display:flex;
  gap:12px;
  align-itesm:center;

  button {
    width:100%;
    font-family:Pretendard, Poppins;
    font-weight:600;
    color:${palette.white};
    line-height:1.5;
    padding:12px;
    border-radius:8px;
    border:0;
    background:${palette.chatBlue};
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