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
  MARKETING_MBTI,
  CONVERSATION,
  CONVERSATION_STAGE,
  IS_EXPERT_INSIGHT_ACCESSIBLE,
} from '../../../AtomStates';
import MoleculeSignPopup from "../../../Login_Sign/components/molecules/MoleculeSignPopup";
import { useSaveConversation } from "../../../Expert_Insight/components/atoms/AtomSaveConversation";

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
  const [marketingMbti, setMarketingMbti] = useAtom(MARKETING_MBTI);
  const [isExpertInsightAccessible, setIsExpertInsightAccessible] = useAtom(IS_EXPERT_INSIGHT_ACCESSIBLE);

  const [isSignPopupOpen, setIsSignPopupOpen] = useState(false);

  const handleButtonExpert = async () => {
    const updatedConversation = [...conversation];

    updatedConversation.push(
      {
        type: "system",
        message: 
          marketingHaveIdea 
          ? `${titleOfBusinessInfo} 사업을 하시려는 창업가 이시군요!\n당신의 스타일에 딱 맞는 창업 전략을 잡는데 도움이 되었으면 좋겠어요. 함께 멋진 여정을 시작해 보아요!  ✨` 
          : `${marketingMbti} 창업가 이시군요! 그 성향에 맞는 ${titleOfBusinessInfo}을 분석해드릴게요\n당신의 스타일에 딱 맞는 창업 전략을 잡는데 도움이 되었으면 좋겠어요 ✨`,
        expertIndex: 0,
      },
      {
        type: "system",
        message: `자! 이제 본격적인 준비를 시작해보겠습니다. 먼저 시장에서 ${titleOfBusinessInfo}의 가능성을 한눈에 파악할 수 있는 시장조사를 바로 시작해볼게요`,
        expertIndex: -1,
      },
      { type: "marketingStartButton" }
    );

    await saveConversation(
      { changingConversation: { conversation: updatedConversation } }
    );

    setConversation(updatedConversation);
    setIsExpertInsightAccessible(true);
    navigate("/ExpertInsight");
  };

  const handleButtonSignup = async () => {
    setIsSignPopupOpen(true);
  };

  const closeSignPopup = () => {
    setIsSignPopupOpen(false);
    setErrorStatus("");
    setSignUpName('');
    setEmail('');
    setSignupEmail('');
    setPassword('');
    setSignupPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      {marketingHaveIdea 
        ? "아이디어만으로도 첫걸음을 내딘 창업가이시네요 🎉이제 아이디어의 잠재력을 함께 확인해보아요!" 
        : "아이디어가 아직 없어도 걱정마세요 ☺창업 성향 테스트로 함께 찾아볼까요?새로운 기회를 발견할지 몰라요!"}

      <br />

      {isSignPopupOpen && <MoleculeSignPopup onClose={closeSignPopup} />}

      <button onClick={handleButtonSignup}>회원가입 테스트</button>
      <button onClick={handleButtonExpert}>전문가 매칭 테스트</button>

      {/* <OrganismBizAnalysisSection /> */}
    </>
  );
};

export default PageMarketSetting;