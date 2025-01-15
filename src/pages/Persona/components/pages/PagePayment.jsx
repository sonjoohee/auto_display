//작업관리/ 프로젝트 리스트 
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../molecules/MoleculeHeader";
import { ButtonGroup, Button, IconButton } from "../../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  PaymentWrap,
  PaymentCard,
  PaymentPlan,
  PlanTitle,
  PlanList,
  PaymentCredit,
  ToggleList,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { useNavigate } from "react-router-dom";
import {
  IS_LOGGED_IN,
  PROJECT_REPORT_LIST,
  PROJECT_ID,
  PROJECT_REPORT_ID,
  PROJECT_LIST,
  REPORT_LIST,
  PERSONA_LIST,
  SELECTED_PERSONA_LIST,
  CUSTOMIZE_PERSONA_LIST,
  REQUEST_PERSONA_LIST,
  INTERVIEW_QUESTION_LIST,
  SELECTED_INTERVIEW_PURPOSE,
  CATEGORY_COLOR,
  PROJECT_LOAD_BUTTON_STATE,
  REPORT_LOAD_BUTTON_STATE,
  REPORT_DESCRIPTION_LOAD_BUTTON_STATE,
  INTERVIEW_DATA,
  INTERVIEW_REPORT,
  INTERVIEW_REPORT_ADDITIONAL,
  IS_EDIT_MODE,
  IS_SHOW_TOAST,
  IS_PERSONA_ACCESSIBLE,
  PROJECT_LOADING,
  PROJECT_REFRESH_TRIGGER,
} from "../../../AtomStates";
import OrganismProjectCard from "../organisms/OrganismProjectCard";
import { getProjectListByIdFromIndexedDB } from "../../../../utils/indexedDB";
import OrganismEmptyProject from "../organisms/OrganismEmptyProject";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { H2, H3, H4, H5, H6, Body2, Body3, Sub3, Caption2 } from "../../../../assets/styles/Typography";
import PopupWrap from "../../../../assets/styles/Popup";

const PagePayment = () => {
  const [isProPlan, setIsProPlan] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handlePlanChange = () => {
    setShowSuccessPopup(true);
  };

  const handlePopupConfirm = () => {
    setShowSuccessPopup(false);
    setIsProPlan(true);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide>
          <PaymentWrap>
            <H2 color="gray800" align="left">Pro Plan으로<br />모든 기능을 자유롭게 활용하세요</H2>

            <PaymentCard>
              <PaymentPlan>
                <PlanTitle>
                  <H2>Basic Plan</H2>
                  <h1>FREE</h1>
                </PlanTitle>

                <PlanList>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">비즈니스 페르소나 요청 1건 / My Persona 요청 불가</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">인터뷰 커스터마이징 3건</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">반응형 인터뷰 사용 불가능</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">인터뷰 룸 추가질문 1건 가능</H6>
                  </li>
                </PlanList>

                {isProPlan ? (
                  <>
                    <Button DbExLarge Round Outline W100>
                      <Body2 color="gray500">다운그레이드 하기</Body2>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button DbExLarge Round W100>
                      <Body2 color="gray500">시작하기</Body2>
                    </Button>
                  </>
                )}
              </PaymentPlan>

              <PaymentPlan>
                <PlanTitle>
                  <H2>Pro Plan</H2>
                  <h1 className="price">12,900</h1>
                </PlanTitle>

                <PlanList>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">비즈니스 페르소나 요청 10건</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">인터뷰 커스터마이징 무제한</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">반응형 인터뷰 1건 가능</H6>
                  </li>
                  <li>
                    <img src={images.CheckGreen} alt="" />
                    <H6 color="gray500">인터뷰 룸 추가질문 3건 가능 </H6>
                  </li>
                </PlanList>

                {isProPlan ? (
                  <Button DbExLarge Round W100>
                    <Body2 color="gray500">현재 플랜</Body2>
                  </Button>
                ) : (
                  <Button DbExLarge Primary Fill Round W100 onClick={handlePlanChange}>
                    <Body2 color="white">시작하기</Body2>
                  </Button>
                )}
              </PaymentPlan>
            </PaymentCard>
          </PaymentWrap>

          {showSuccessPopup && (
            <PopupWrap
              Success
              title="결제 완료!"
              message="성공적으로 Pro 업그레이드에 성공 하셨습니다!"
              buttonType="Outline"
              confirmText="확인"
              isModal={false}
              onConfirm={handlePopupConfirm}
              onCancel={handlePopupConfirm}
            />
          )}

          <PaymentWrap>
            <H4 color="gray800" align="left">PRO들이 쓰는 Plan을 간편하게 크레딧 구매로!</H4>

            <PaymentCard>
              <PaymentCredit>
                <img src={images.CoinSmall} alt="" />
                <div>
                  <p>50</p>
                  <H6 color="gray700">Credit</H6>
                </div>

                <H2 color="gray700">1,100￦</H2>
              </PaymentCredit>
              <PaymentCredit>
                <img src={images.CoinMedium} alt="" />
                <div>
                  <p>160</p>
                  <H6 color="gray700">Credit</H6>
                </div>

                <H2 color="gray700">3,300￦</H2>
              </PaymentCredit>
              <PaymentCredit>
                <img src={images.CoinLarge} alt="" />
                <div>
                  <p>300</p>
                  <H6 color="gray700">Credit</H6>
                </div>

                <H2 color="gray700">5,500￦</H2>
              </PaymentCredit>
            </PaymentCard>
          </PaymentWrap>

        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePayment;
