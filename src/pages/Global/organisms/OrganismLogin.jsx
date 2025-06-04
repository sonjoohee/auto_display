//로그인
import React, { useState } from "react";
import styled from "styled-components";
import {
  ContentsWrap,
  MainContent,
} from "../../../assets/styles/BusinessAnalysisStyle";
import MoleculeLoginPopup from "../../LoginSign/components/molecules/MoleculeLoginPopup";
import { H1 } from "../../../assets/styles/Typography";
import MoleculeLoginForm from "../../LoginSign/components/molecules/MoleculeLoginForm";
import { useDynamicViewport } from "../../../assets/DynamicViewport";
import { palette } from "../../../assets/styles/Palette";
import MoleculeHeader from "../molecules/MoleculeHeader";

const OrganismIncLogin = () => {
  useDynamicViewport("width=800"); // 특정페이지에서만 pc화면처럼 보이기
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  return (
    <>
      <MoleculeHeader />
      <ContentsWrap>
        <MainContent Wide>
          <LoginWrap>
            <TitleSection>
              <H1>Autodisplay</H1>
              <DescriptionText>
                비즈니스용으로 발급된 아이디와 비밀번호를 입력해주세요
              </DescriptionText>
            </TitleSection>
            <MoleculeLoginForm />
          </LoginWrap>
        </MainContent>
      </ContentsWrap>
      {/* <button onClick={handleLoginClick} className="login">
        <img src={images.PersonCircle} alt="로그인" />
        로그인
      </button> */}

      {isLoginPopupOpen && <MoleculeLoginPopup onClose={closeLoginPopup} />}
    </>
  );
};

export default OrganismIncLogin;

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 56px;
  max-width: 610px;
  width: 100%;
  margin: 156px auto 0;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const DescriptionText = styled.p`
  font-family: "Pretendard", "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.55;
  color: ${palette.gray};
  text-align: center;
  margin: 0;
`;

// const ViewInfo = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: $space-between;
//   gap: 4px;
//   width: 100%;
//   font-size: 0.875rem;
//   color: ${palette.gray800};

//   + div {
//     padding-top: 16px;
//     border-top: 1px solid ${palette.outlineGray};
//   }

//   .title {
//     display: flex;
//     align-items: flex-end;
//     justify-content: flex-start;
//     gap: 8px;
//     font-size: 0.875rem;
//     color: ${palette.black};

//     span {
//       font-size: 0.75rem;
//       font-weight: 300;
//       color: ${palette.gray500};
//     }
//   }

//   .info {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 32px;

//     div {
//       position: relative;
//       display: flex;
//       align-items: center;
//       justify-content: flex-start;
//       gap: 7px;
//       font-size: 0.875rem;
//       font-weight: 300;
//       color: ${palette.gray500};
//       line-height: 1.5;

//       + div:before {
//         position: absolute;
//         top: 50%;
//         left: -16px;
//         transform: translateY(-50%);
//         width: 1px;
//         height: 12px;
//         background-color: ${palette.outlineGray};
//         content: "";
//       }
//     }
//   }

//   .button {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;

//     button {
//       font-family: "Pretendard", poppins;
//       font-size: 0.75rem;
//       font-weight: 300;
//       padding: 6px 10px;
//       border-radius: 6px;

//       &.view {
//         color: ${palette.black};
//         border: 1px solid ${palette.outlineGray};
//         background: ${palette.chatGray};
//       }

//       &.analysis {
//         color: ${palette.primary};
//         border: 1px solid ${palette.primary};
//         background: #e9f1ff;
//       }
//     }
//   }
// `;
