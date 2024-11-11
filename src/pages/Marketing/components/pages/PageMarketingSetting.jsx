import React, { useState, useEffect } from "react";
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { 
  INPUT_BUSINESS_INFO, 
  ANALYSIS_BUTTON_STATE, 
  CONVERSATION_ID,
  SIGN_UP_NAME,
  EMAIL,
  SIGN_UP_EMAIL,
  SIGN_UP_PASSWORD,
  CONFIRM_PASSWORD,
  ERROR_STATUS,
  MARKETING_HAVE_IEDA,
  TITLE_OF_BUSINESS_INFORMATION,
  IS_MARKETING,
  MARKETING_MBTI_ANSWER,
  MARKETING_MBTI_RESULT,
  MARKETING_INTEREST,
  CONVERSATION,
  CONVERSATION_STAGE,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
  MARKETING_MBTI_STAGE,
} from '../../../AtomStates';
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";
import OrganismMarketingBizAnalysis from "../organisms/OrganismMarketingBizAnalysis";

const PageMarketSetting = () => {
  const { saveConversation } = useSaveConversation();
  const navigate = useNavigate();
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [analysisButtonState, setAnalysisButtonState] = useAtom(ANALYSIS_BUTTON_STATE);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [signUpName, setSignUpName] = useAtom(SIGN_UP_NAME);
  const [email, setEmail] = useAtom(EMAIL);
  const [, setSignupEmail] = useAtom(SIGN_UP_EMAIL);
  const [password, setPassword] = useState("");
  const [, setSignupPassword] = useAtom(SIGN_UP_PASSWORD);
  const [confirmPassword, setConfirmPassword] = useAtom(CONFIRM_PASSWORD);
  const [errorStatus, setErrorStatus] = useAtom(ERROR_STATUS);
  const [isMarketing, setIsMarketing] = useAtom(IS_MARKETING);
  const [marketingHaveIdea, setMarketingHaveIdea] = useAtom(MARKETING_HAVE_IEDA);
  const [marketingMbtiAnswer, setMarketingMbtiAnswer] = useAtom(MARKETING_MBTI_ANSWER);
  const [marketingMbtiResult, setMarketingMbtiResult] = useAtom(MARKETING_MBTI_RESULT);
  const [marketingInterest, setMarketingInterest] = useAtom(MARKETING_INTEREST);
  const [marketingMbtiStage, setMarketingMbtiStage] = useAtom(MARKETING_MBTI_STAGE);
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(IS_EXPERT_INSIGHT_ACCESSIBLE);
  
  const updateMbtiAnswer = (index, newValue) => {
    setMarketingMbtiAnswer((prev) => [...prev.slice(0, index), newValue, ...prev.slice(index + 1)]);
  };

  return (
    <>
      {marketingHaveIdea 
        ? titleOfBusinessInfo ? 
          <>
            <p>🔖아이디어를 정리해 보았어요</p>
            <h1>{titleOfBusinessInfo}</h1>
          </>
          : "아이디어만으로도 첫걸음을 내딘 창업가이시네요 🎉이제 아이디어의 잠재력을 함께 확인해보아요!" 
        : "아이디어가 아직 없어도 걱정마세요 ☺창업 성향 테스트로 함께 찾아볼까요?새로운 기회를 발견할지 몰라요!"}

      <br />

      {marketingHaveIdea 
        ? <OrganismMarketingBizAnalysis />
        : 
        <>
          {marketingMbtiStage === 0 && <button onClick={() => setMarketingMbtiStage(1)}>내게 맞는 아이템 찾기</button>}
          {marketingMbtiStage === 1 && <>
            <button onClick={() => {updateMbtiAnswer(0, marketingMbtiAnswer[0] - 1); setMarketingMbtiStage(2)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(0, marketingMbtiAnswer[0] + 1); setMarketingMbtiStage(2)}}>+1</button>
          </>}
          {marketingMbtiStage === 2 && <>
            <button onClick={() => {updateMbtiAnswer(0, marketingMbtiAnswer[0] - 1); setMarketingMbtiStage(3)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(0, marketingMbtiAnswer[0] + 1); setMarketingMbtiStage(3)}}>+1</button>
          </>}
          {marketingMbtiStage === 3 && <>
            <button onClick={() => {updateMbtiAnswer(0, marketingMbtiAnswer[0] - 1); setMarketingMbtiStage(4)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(0, marketingMbtiAnswer[0] + 1); setMarketingMbtiStage(4)}}>+1</button>
          </>}
          {marketingMbtiStage === 4 && <>
            <button onClick={() => {updateMbtiAnswer(1, marketingMbtiAnswer[1] - 1); setMarketingMbtiStage(5)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(1, marketingMbtiAnswer[1] + 1); setMarketingMbtiStage(5)}}>+1</button>
          </>}
          {marketingMbtiStage === 5 && <>
            <button onClick={() => {updateMbtiAnswer(1, marketingMbtiAnswer[1] - 1); setMarketingMbtiStage(6)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(1, marketingMbtiAnswer[1] + 1); setMarketingMbtiStage(6)}}>+1</button>
          </>}
          {marketingMbtiStage === 6 && <>
            <button onClick={() => {updateMbtiAnswer(1, marketingMbtiAnswer[1] - 1); setMarketingMbtiStage(7)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(1, marketingMbtiAnswer[1] + 1); setMarketingMbtiStage(7)}}>+1</button>
          </>}
          {marketingMbtiStage === 7 && <>
            <button onClick={() => {updateMbtiAnswer(2, marketingMbtiAnswer[2] - 1); setMarketingMbtiStage(8)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(2, marketingMbtiAnswer[2] + 1); setMarketingMbtiStage(8)}}>+1</button>
          </>}
          {marketingMbtiStage === 8 && <>
            <button onClick={() => {updateMbtiAnswer(2, marketingMbtiAnswer[2] - 1); setMarketingMbtiStage(9)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(2, marketingMbtiAnswer[2] + 1); setMarketingMbtiStage(9)}}>+1</button>
          </>}
          {marketingMbtiStage === 9 && <>
            <button onClick={() => {updateMbtiAnswer(2, marketingMbtiAnswer[2] - 1); setMarketingMbtiStage(10)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(2, marketingMbtiAnswer[2] + 1); setMarketingMbtiStage(10)}}>+1</button>
          </>}
          {marketingMbtiStage === 10 && <>
            <button onClick={() => {updateMbtiAnswer(3, marketingMbtiAnswer[3] - 1); setMarketingMbtiStage(11)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(3, marketingMbtiAnswer[3] + 1); setMarketingMbtiStage(11)}}>+1</button>
          </>}
          {marketingMbtiStage === 11 && <>
            <button onClick={() => {updateMbtiAnswer(3, marketingMbtiAnswer[3] - 1); setMarketingMbtiStage(12)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(3, marketingMbtiAnswer[3] + 1); setMarketingMbtiStage(12)}}>+1</button>
          </>}
          {marketingMbtiStage === 12 && <>
            <button onClick={() => {updateMbtiAnswer(3, marketingMbtiAnswer[3] - 1); setMarketingMbtiStage(13)}}>-1</button>
            <p>{marketingMbtiAnswer[0]}{marketingMbtiAnswer[1]}{marketingMbtiAnswer[2]}{marketingMbtiAnswer[3]}</p>
            <button onClick={() => {updateMbtiAnswer(3, marketingMbtiAnswer[3] + 1); setMarketingMbtiStage(13)}}>+1</button>
          </>}
          {marketingMbtiStage === 13 && <>
            <button onClick={() => {setMarketingMbtiStage(14)}}>결과 확인하기</button>
          </>}
        </>
      }

    </>
  );
};

export default PageMarketSetting;