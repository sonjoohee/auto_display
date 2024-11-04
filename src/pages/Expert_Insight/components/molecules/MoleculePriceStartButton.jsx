import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import {
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_ID,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  CONVERSATION_STAGE,
  PRICE_START_BUTTON_STATE,
  PRICE_PRODUCT,
  IS_EDITING_NOW,
} from "../../../AtomStates";

import { useSaveConversation } from "../atoms/AtomSaveConversation";

import { palette } from "../../../../assets/styles/Palette";

const MoleculePriceStartButton = () => {
  const { saveConversation } = useSaveConversation();
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [priceStartButtonState, setPriceStartButtonState] = useAtom(PRICE_START_BUTTON_STATE);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  
  const handleClick = async () => {
    if (isLoading) return;
    const updatedConversation = [...conversation];

    if (updatedConversation.length > 0 &&
        updatedConversation[updatedConversation.length - 1].type === "priceStartButton"
    ) {
      updatedConversation.pop();
    }

    /* 제품 개수를 확인하는 API */

    // const data = {
    //   expert_id: "7",
    //   business_info: titleOfBusinessInfo,
    //   business_analysis_data: {
    //     명칭: titleOfBusinessInfo,
    //     주요_목적_및_특징: mainFeaturesOfBusinessInformation,
    //     주요기능: mainCharacteristicOfBusinessInformation,
    //     목표고객: businessInformationTargetCustomer,
    //   }
    // };

    // let response = await axios.post(
    //   "https://wishresearch.kr/panels/growth_hacker",
    //   data,
    //   axiosConfig
    // );

    // let retryCount = 0;
    // const maxRetries = 10;

    // while (retryCount < maxRetries && (
    //   !response || 
    //   !response.data || 
    //   typeof response.data !== "object" ||
    //   !response.data.hasOwnProperty("growth_hacker_report") || 
    //   !Array.isArray(response.data.growth_hacker_report) ||
    //   !response.data.growth_hacker_report[0].hasOwnProperty("content") ||
    //   !Array.isArray(response.data.growth_hacker_report[0].content) ||
    //   !response.data.growth_hacker_report[0].content[0].hasOwnProperty("text") ||
    //   !response.data.growth_hacker_report[0].content[1].hasOwnProperty("text") ||
    //   response.data.growth_hacker_report[1].content.some(item => 
    //     !item.hasOwnProperty("title") || 
    //     !item.hasOwnProperty("text") || 
    //     !item.hasOwnProperty("subcontent") || 
    //     !Array.isArray(item.subcontent) || 
    //     item.subcontent.some(contentItem => 
    //       !contentItem.hasOwnProperty("subTitle") || 
    //       !contentItem.hasOwnProperty("text")
    //     )
    //   )
    // )) 
    // {
    //   response = await axios.post(
    //     "https://wishresearch.kr/panels/growth_hacker",
    //     data,
    //     axiosConfig
    //   );
    //   retryCount++;
    // }
    // if (retryCount === maxRetries) {
    //   console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
    //   // 에러 처리 로직 추가
    //   throw new Error("Maximum retry attempts reached. Empty response persists.");
    // }
    
    const product = ["기능성 화장품"];
    setPriceProduct(product);

    updatedConversation.push(
      {
        type: "user",
        message:
          "시장 가격 분석하기를 진행하겠습니다",
        expertIndex: selectedExpertIndex,
      },
    );

    if(product.length === 1) {
      setPriceStartButtonState(1);

      updatedConversation.push(
        {
          type: "system",
          message:
            `${titleOfBusinessInfo}에 대한 가격 정보를 확인하여 시장 가격 분석을 진행하겠습니다.`,
          expertIndex: selectedExpertIndex,
        },
        {
          type: 'priceReport',
        },
      );
    } else {
      updatedConversation.push(
        {
          type: "system",
          message:
            `시장 가격 분석을 위해 조사할 제품군을 확인해주세요`,
          expertIndex: selectedExpertIndex,
        },
        {
          type: 'priceOption',
        },
      );
    }

    setIsEditingNow(false);
    setConversation(updatedConversation);
    setConversationStage(3);
    setApproachPath(3);

    await saveConversation(
      { changingConversation: { conversation: updatedConversation, conversationStage: 3 } }
    );
  };
  return (
    <>
      <ButtonWrap>
        <button onClick={handleClick}>시장 가격 분석하기</button>
      </ButtonWrap>
    </>
  );
};

export default MoleculePriceStartButton;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 15px;
  margin-left:50px;

  button {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: "Pretendard";
    font-size: 0.875rem;
    color: ${palette.darkGray};
    border: 0;
    background: none;
    margin-right: 10px;
  }

  > button {
    padding: 8px 16px;
    border-radius: 40px;
    border: 1px solid ${palette.lineGray};
  }

  button.other {
    color: ${palette.lightGray};
    font-size: 0.75rem;
    border: none;
  }
`;
