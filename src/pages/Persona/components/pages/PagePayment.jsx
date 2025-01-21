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
  Title,
  PaymentPrice,
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
  const [showFailPopup, setShowFailPopup] = useState(false);

  const handlePlanChange = () => {
    setShowSuccessPopup(true);
  };

  const handlePlanChange2 = () => {
    setShowFailPopup(true);
  };

  const handlePopupConfirm = () => {
    setShowSuccessPopup(false);
    setShowFailPopup(false);
    setIsProPlan(true);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide>
          <PaymentWrap>
            <Title Column>
              <H2 color="gray800">크레딧 충전</H2>
              <H6 color="gray800">필요한 만큼, 원하는 만큼 자유롭게 선택하세요</H6>
            </Title>

            <PaymentWrap> 
              <PaymentCard>
                <PaymentCredit onClick={handlePlanChange2}>
                  <images.CoinSmall color={palette.gray700} />
                  <div>
                    <p>50</p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5>￦1,100</H5>
                    </Button>

                    <H6 color="gray700">5% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
                <PaymentCredit onClick={handlePlanChange2}>
                  <images.CoinMedium color={palette.gray700} />
                  <div>
                    <p>160</p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5>￦3,300</H5>
                    </Button>

                    <H6 color="gray700">10% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
                <PaymentCredit onClick={handlePlanChange}>
                  <images.CoinLarge width="34px" height="32px" color={palette.gray700} />
                  <div>
                    <p>300</p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5>￦5,500</H5>
                    </Button>

                    <H6 color="gray700">20% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
                <PaymentCredit onClick={handlePlanChange}>
                  <images.ClockClockwise width="39px" height="36px" color={palette.gray700} />
                  <div>
                    <p>1,000<span>/월</span></p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5>구독 플랜</H5>
                    </Button>

                    <H6 color="gray700">35% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
              </PaymentCard>
            </PaymentWrap>

            {/* <PaymentCard>
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
            </PaymentCard> */}
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

          {showFailPopup && (
            <PopupWrap
              Fail
              title="결제 실패"
              message={
                <>
                  현재 (문제명)로 인하여 결제에 실패했습니다.<br />
                  다시 시도해주세요
                </>
              }
              buttonType="Outline"
              confirmText="확인"
              isModal={false}
              onConfirm={handlePopupConfirm}
              onCancel={handlePopupConfirm}
            />
          )}

        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePayment;
