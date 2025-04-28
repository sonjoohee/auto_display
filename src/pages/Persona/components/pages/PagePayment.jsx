//작업관리/ 프로젝트 리스트
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../../../Global/organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";
import {
  ButtonGroup,
  Button,
  IconButton,
} from "../../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  PaymentWrap,
  PaymentCard,
  PaymentCredit,
  Title,
  PaymentPrice,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { useNavigate } from "react-router-dom";
import { USER_EMAIL } from "../../../AtomStates";
import { useLocation } from "react-router-dom";
import { H2, H5, H6 } from "../../../../assets/styles/Typography";
import PopupWrap from "../../../../assets/styles/Popup";

const PagePayment = () => {
  const [userEmail, setUserEmail] = useAtom(USER_EMAIL);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL의 쿼리 파라미터 확인
    const queryParams = new URLSearchParams(location.search);

    // 결제 후 리다이렉트된 경우의 파라미터 체크
    const tid = queryParams.get("tid");
    const orderId = queryParams.get("orderId");
    const status = queryParams.get("status");
    const mou = queryParams.get("mou");

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      throw new Error("액세스 토큰이 존재하지 않습니다.");
    }

    if (tid && orderId) {
      console.log("🚀 ~ useEffect ~ tid:", tid);
      console.log("🚀 ~ useEffect ~ orderId:", orderId);

      const verifyPayment = async () => {
        try {
          // const response = await fetch("http://localhost:8000/payment/onePay", {
          const response = await fetch(
            "https://wishresearch.kr/payment/onePay",
            {
              method: "POST",

              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,

              body: JSON.stringify({
                tid: tid,
                orderId: orderId,
                status: status,
                amount: mou,
                // 필요한 다른 데이터들도 추가
              }),
            }
          );

          const result = await response.json();

          if (result.resultCode === "0000") {
            setShowSuccessPopup(true);
          } else {
            setShowFailPopup(true);
            // 이미 사용된 OrderId입니다 ==> 중복결제 오류 안내이후 확인누를시 새로고침 필요 ( 상단에 결제데이터 남아있음. )

            // 결제 실패시 데이터 전달해서 결제 실패 사유를  사용자가 알아야할거같아요.
            // 실패 이후 확인시 네비게이터로  / Payment 로 이동
          }
        } catch (error) {
          alert("결제 처리 중 오류가 발생했습니다.");
        }
      };

      verifyPayment();
    }

    // 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://pay.nicepay.co.kr/v1/js/";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [location]);

  const onePayments = (e) => {
    console.log("onePayments");

    if (window.AUTHNICE) {
      // 상품 가격 추출
      const priceElement = e.currentTarget.querySelector("[data-price]");
      const price = priceElement.getAttribute("data-price");
      // 상품 이름 추출 + 충전할 크레딧 추출
      const creditElement = e.currentTarget.querySelector("[credit-name]");
      const credit = creditElement.getAttribute("credit-name");

      const createdOrderId = "UC_" + uuidv4();
      const goodsItem = "Credit" + credit;

      window.AUTHNICE.requestPay({
        clientId: "R2_7a52394e0f5e4d298ff882d3931f1e8f",
        method: "card",
        orderId: createdOrderId,
        amount: price,
        goodsName: goodsItem,
        returnUrl: "https://wishresearch.kr/payment/onePayCall",
        fnError: function (result) {
          alert("개발자확인용 : " + result.errorMsg + "");
        },
      });
    } else {
      // console.error("AUTHNICE is not loaded");
    }
  };

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
    // navigate(0);
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
              <H6 color="gray800">
                필요한 만큼, 원하는 만큼 자유롭게 선택하세요
              </H6>
            </Title>

            <PaymentWrap>
              <PaymentCard>
                <PaymentCredit onClick={onePayments}>
                  <images.CoinSmall color={palette.gray700} />
                  <div>
                    <p credit-name="5500">5,500</p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5 data-price="4900">￦4,900</H5>
                    </Button>

                    <H6 color="gray700">11% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
                <PaymentCredit onClick={onePayments}>
                  <images.CoinMedium color={palette.gray700} />
                  <div>
                    <p credit-name="11000">11,000</p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5 data-price="9900">￦9,900</H5>
                    </Button>

                    <H6 color="gray700">11% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
                <PaymentCredit onClick={onePayments}>
                  <images.CoinLarge
                    width="34px"
                    height="32px"
                    color={palette.gray700}
                  />
                  <div>
                    <p credit-name="24000">24,000</p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5 data-price="19900">￦19,900</H5>
                    </Button>

                    <H6 color="gray700">21% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
                <PaymentCredit onClick={onePayments}>
                  <images.CoinLarge
                    width="34px"
                    height="32px"
                    color={palette.gray700}
                  />
                  <div>
                    <p credit-name="65000">65,000</p>
                    <H6 color="gray700">Credit</H6>
                  </div>

                  <PaymentPrice>
                    <Button Large PrimaryLightest Fill Round W100>
                      <H5 data-price="49900">￦49,900</H5>
                    </Button>

                    <H6 color="gray700">31% 할인</H6>
                  </PaymentPrice>
                </PaymentCredit>
              </PaymentCard>
            </PaymentWrap>
          </PaymentWrap>

          {showSuccessPopup && (
            <PopupWrap
              Success
              title="결제 완료!"
              message="성공적으로 결제 하셨습니다!"
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
                  결제에 실패했습니다.
                  <br />
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
