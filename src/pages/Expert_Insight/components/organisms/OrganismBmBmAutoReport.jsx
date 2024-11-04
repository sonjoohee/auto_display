import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  CONVERSATION,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  IS_LOGGED_IN,
  CONVERSATION_STAGE,
  BM_BM_AUTO_REPORT_DATA,
  BM_BM_AUTO_REPORT_BUTTON_STATE,
  BM_QUESTION_LIST,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";

const OrganismBmBmAutoReport = () => {
  const { saveConversation } = useSaveConversation();
  const [bmQuestionList, setBmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
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
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [bmBmAutoButtonState, setBmBmAutoButtonState] = useAtom(BM_BM_AUTO_REPORT_BUTTON_STATE);
  const [isLoadingIdeaPriority, setIsLoadingIdeaPriority] = useState(false);
  const [bmBmAutoReportData, setBmBmAutoReportData] = useAtom(BM_BM_AUTO_REPORT_DATA);

  
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  useEffect(() => {
    const fetchBmBmAutoReport = async () => {

      if(bmBmAutoButtonState) {
        setIsLoading(true);
        setIsLoadingIdeaPriority(true);
        setBmBmAutoButtonState(0);

        const data = {
          expert_id: "9",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
            목표고객: businessInformationTargetCustomer,
          },
          bm_question_list: bmQuestionList,
        };

        let response = await axios.post(
          "https://wishresearch.kr/panels/bm_auto_report",
          data,
          axiosConfig
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response || !response.data || typeof response.data !== "object" ||
          !response.data.hasOwnProperty("bm_bm_auto_report") ||
          !Array.isArray(response.data.bm_bm_auto_report) ||
          response.data.bm_bm_auto_report.some(section => 
            !section.hasOwnProperty("section") || 
            !Array.isArray(section.content) || 
            section.content.some(contentItem => 
              !contentItem.hasOwnProperty("title") || 
              !contentItem.hasOwnProperty("description") || 
              !Array.isArray(contentItem.keyword)
            )
          )
        )) {
          response = await axios.post(
            "https://wishresearch.kr/panels/bm_auto_report",
            data,
            axiosConfig
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
          console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }

        setBmBmAutoReportData(response.data.bm_bm_auto_report);

        setIsLoading(false);
        setIsLoadingIdeaPriority(false);

        const updatedConversation = [...conversation];
        updatedConversation.push(
          {
            type: "system",
            message:
              "기본 비즈니스 모델 캔버스 작성이 완료되었습니다.\n이제부터는 비즈니스 목표에 따라 비즈니스 모델을 다양하게 구분해보겠습니다.",
            expertIndex: selectedExpertIndex,
          },
          { type: `bmBmAdsContinueButton`}
        );
        setConversationStage(3);
        setConversation(updatedConversation);

        await saveConversation(
          { changingConversation: { conversation: updatedConversation, conversationStage: 3, bmBmAutoReportData : response.data.bm_bm_auto_report, } }
        );
      }
    };

    fetchBmBmAutoReport();
  }, [bmBmAutoButtonState]);

  return (
    <BoxWrap>
      {isLoadingIdeaPriority || bmBmAutoButtonState ? (
        <>
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing />
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing />
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
        </>
      ) : (
        <>
          <h1>{titleOfBusinessInfo}의 비즈니스 모델 캔버스 - 기본형</h1>
          <p>{mainFeaturesOfBusinessInformation[0]}</p>
  
          <ModelCanvasWrap>
          <CanvasSection>
            {/* 1번째 항목 */}
            <CanvasList>
              <section>
                <strong>
                  핵심 파트너십
                  <span>
                    <img src={images.IconCanvas01} alt="" />
                  </span>
                </strong>
                {bmBmAutoReportData[7]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    <p>{contentItem?.description}</p>
                    <ul>
                      {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                        <li key={keywordIndex}>{keywordItem}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </CanvasList>

            {/* 6번째와 7번째 항목을 묶은 CanvasList Num2 */}
            <CanvasList Num2>
              {[...bmBmAutoReportData?.slice(5, 7)].reverse().map((section, index) => (
                <section key={index + 5}>
                  <strong>
                    {index === 0 ? "핵심 활동" : "핵심 자원"}
                    <span>
                      <img src={images[`IconCanvas0${index + 2}`]} alt="" />
                    </span>
                  </strong>
                  {section?.content?.map((contentItem, contentIndex) => (
                    <div key={contentIndex}>
                      <p>{contentItem?.description}</p>
                      <ul>
                        {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                          <li key={keywordIndex}>{keywordItem}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              ))}
            </CanvasList>

            {/* 2번째 항목 */}
            <CanvasList>
              <section>
                <strong>
                  가치 제안
                  <span>
                    <img src={images.IconCanvas04} alt="" />
                  </span>
                </strong>
                {bmBmAutoReportData[1]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    <p>{contentItem?.description}</p>
                    <ul>
                      {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                        <li key={keywordIndex}>{keywordItem}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </CanvasList>

            {/* 3번째와 4번째 항목을 묶은 CanvasList Num2 */}
            <CanvasList Num2>
              {[...bmBmAutoReportData?.slice(2, 4)].reverse().map((section, index) => (
                <section key={index + 2}>
                  <strong>
                    {index === 0 ? "고객관계" : "채널"}
                    <span>
                      <img src={images[`IconCanvas0${index + 5}`]} alt="" />
                    </span>
                  </strong>
                  {section?.content?.map((contentItem, contentIndex) => (
                    <div key={contentIndex}>
                      <p>{contentItem?.description}</p>
                      <ul>
                        {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                          <li key={keywordIndex}>{keywordItem}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              ))}
            </CanvasList>

            {/* 5번째 항목 */}
            <CanvasList>
              <section>
                <strong>
                  고객 세그먼트
                  <span>
                    <img src={images.IconCanvas07} alt="" />
                  </span>
                </strong>
                {bmBmAutoReportData[0]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    <p>{contentItem?.description}</p>
                    <ul>
                      {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                        <li key={keywordIndex}>{keywordItem}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </CanvasList>
          </CanvasSection>

          <CanvasSection>
          {/* 8번째 항목 */}
          <CanvasList>
            <section>
              <strong>
                비용
                <span>
                  <img src={images.IconCanvas08} alt="" />
                </span>
              </strong>
              {bmBmAutoReportData[8]?.content?.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  <p>{contentItem?.description}</p>
                  <ul>
                    {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                      <li key={keywordIndex}>{keywordItem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </CanvasList>

          {/* 9번째 항목 */}
          <CanvasList>
            <section>
              <strong>
                수익
                <span>
                  <img src={images.IconCanvas09} alt="" />
                </span>
              </strong>
              {bmBmAutoReportData[4]?.content?.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  <p>{contentItem?.description}</p>
                  <ul>
                    {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                      <li key={keywordIndex}>{keywordItem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            </CanvasList>
          </CanvasSection>
          </ModelCanvasWrap>
          {/* <MoleculeReportController
            reportIndex={9}
            sampleData={bmBmAutoReportData}
          /> */}
        </>
      )}
    </BoxWrap>
  );
};


export default OrganismBmBmAutoReport;
const BoxWrap = styled.div`
  max-width:988px;
  // width:100%;
  display:flex;
  flex-direction:column;
  text-align:left;
  padding:20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    margin-bottom:8px;
  }

  p {
    font-size:0.88rem;
    line-height:1.3;
  }
`;

const ModelCanvasWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  margin:24px auto 0;
`;

const CanvasSection = styled.div`
  display:flex;
  gap:12px;
`;

const CanvasList = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:12px;
  flex:1 1 19%;
  max-height:400px;

  ${props =>
    props.Num2 &&
    css`
      section {
        height:50% !important;
      }
    `
  }

  section {
    height:100%;
    padding:16px;
    border-radius:15px;
    background:${palette.chatGray};
    overflow:hidden;
  }

  strong {
    display:flex;
    align-items:center;
    justify-content:space-between;
    min-height:26px;
    font-size:0.88rem;
    font-weight:500;
    color:${palette.gray800};
    margin-bottom:16px;
    
    span {
      width:26px;
      height:26px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:100%;
      background:${palette.white};
    }
  }

  div {
    height:calc(100% - 40px);
    overflow-y:auto;
    scrollbar-width:thin;
  }

  p {
    font-size:0.75rem;
    color:${palette.gray800};
    line-height:1.3;

    span {
      display:block;
      font-size:0.63rem;
      margin-top:4px;
    }
  }

  ul {
    margin-top:12px;

    li {
      position:relative;
      font-size:0.75rem;
      line-height:1.3;
      padding-left:18px;

      + li {
        margin-top:5px;
      }

      &:before {
        position:absolute;
        left:8px;
        top:7px;
        width:2px;
        height:2px;
        border-radius:10px;
        background:${palette.gray800};
        content:'';
      }
    }
  }
`;
const ButtonWrap = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 16px;
// padding-top: 20px;
// border-top: 1px solid ${palette.lineGray};

button {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Pretendard";
  font-size: 0.75rem;
  color: ${palette.gray};
  padding: 4px 8px;
  border-radius: 5px;
  border: 0;
  background: none;
  transition: all 0.5s;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
}

.lineBtn {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray};
}

> button {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray};
}

> div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}
`;
