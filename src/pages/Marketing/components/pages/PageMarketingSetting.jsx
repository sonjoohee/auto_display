import React, { useState } from "react";
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
  MARKETING_HAVE_IEDA
} from '../../../AtomStates';
import OrganismBizAnalysisSection from "../../../Expert_Insight/components/organisms/OrganismBizAnalysisSection";
import MoleculeSignPopup from "../../../Login_Sign/components/molecules/MoleculeSignPopup";

const PageMarketSetting = () => {
  const navigate = useNavigate();
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
  const [marketingHaveIdea, setMarketingHaveIdea] = useAtom(MARKETING_HAVE_IEDA);

  const [isSignPopupOpen, setIsSignPopupOpen] = useState(false);

  const handleButtonExpert = async () => {
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