//작업관리/ 프로젝트 리스트
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../molecules/MoleculeHeader";
import MoleculeAccountPopup from "../../../Login_Sign/components/molecules/MoleculeAccountPopup";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  CustomInput,
  CustomTextarea,
} from "../../../../assets/styles/InputStyle";
import {
  IS_LOGGED_IN,
  USER_NAME,
  USER_EMAIL,
  USER_CREDIT_DATA,
  USER_MEMBERSHIP,
  IS_SOCIAL_LOGGED_IN,
} from "../../../AtomStates";
import {
  ButtonGroup,
  Button,
  IconButton,
} from "../../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  ToggleBox,
  ToggleList,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import {
  H2,
  H4,
  H5,
  Body2,
  Body3,
  Sub3,
  Caption2,
  InputText,
} from "../../../../assets/styles/Typography";
import axios from "axios";

const PageMyProfile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [isSocialLoggedIn, setIsSocialLoggedIn] = useAtom(IS_SOCIAL_LOGGED_IN);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false); // 계정설정 팝업
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false); // 문의하기 팝업
  const [isMemberDeletePopupOpen, setIsMemberDeletePopupOpen] = useState(false); // 회원탈퇴 팝업
  const [contactForm, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [memberDeleteForm, setMemberDeleteForm] = useState({
    reason: "",
  });
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("");

  const [userCreditData, setUserCreditData] = useAtom(USER_CREDIT_DATA);
  const [userMembership, setUserMembership] = useAtom(USER_MEMBERSHIP);
  const [userName, setUserName] = useAtom(USER_NAME); // 아톰에서 유저 이름 불러오기
  const [userEmail, setUserEmail] = useAtom(USER_EMAIL); // 아톰에서 유저 이메일 불러오기
  const handleAccountClick = () => {
    setAccountPopupOpen(true); // 계정설정 팝업 열기
  };

  const closeAccountPopup = () => {
    setAccountPopupOpen(false); // 계정설정 팝업 닫기
  };

  const closeServiceMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsServiceMenuOpen(false);
      setIsClosing(false);
    }, 300); // 애니메이션 시간과 동일하게 설정
  };

  const handleContactClick = () => {
    setIsContactPopupOpen(true);
    closeServiceMenu(); // 서비스 메뉴 닫기
  };

  const closeContactPopup = () => {
    setIsContactPopupOpen(false);
  };

  const closeMemberDeletePopup = () => {
    setIsMemberDeletePopupOpen(false);
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMemberDeleteInputChange = (field, value) => {
    setMemberDeleteForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isContactFormValid = () => {
    return contactForm.email && contactForm.purpose && contactForm.content;
  };

  const isMemberDeleteFormValid = () => {
    return memberDeleteForm.reason;
  };

  const token = sessionStorage.getItem("accessToken");

  const axiosConfig = {
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };

  const handleContactSubmit = async () => {
    if (isContactFormValid()) {
      // API 호출을 위한 데이터 준비
      const requestData = {
        email: contactForm.email,
        purpose: contactForm.purpose,
        content: contactForm.content,
      };

      try {
        const response = await axios.post(
          "https://wishresearch.kr/api/user/support/",
          {
            purpose: contactForm.purpose,
            content: contactForm.content,
          },
          axiosConfig
        );
        closeContactPopup();
      } catch (error) {
        console.error("문의하기 제출 실패:", error);
      }
    }
  };

  const handleMemberDeleteSubmit = async () => {
    if (isMemberDeleteFormValid()) {
      // TODO: 회원탈퇴 제출 로직 구현
      try {
        const response = await axios.post(
          "https://wishresearch.kr/api/user/leave/",
          {
            leave_comment: memberDeleteForm.reason,
          },
          axiosConfig
        );
        closeMemberDeletePopup();

        sessionStorage.removeItem("accessToken"); // 세션 스토리지에서 토큰 삭제
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("isSocialLogin");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setIsSocialLoggedIn(false);
        setUserName("");
        setUserEmail("");
        window.location.href = "/"; // 페이지 이동
      } catch (error) {
        console.error("회원탈퇴 제출 실패:", error);
      }
    }
  };

  const handleSelectBoxClick = () => {
    setIsSelectBoxOpen(!isSelectBoxOpen);
  };

  const handlePurposeSelect = (purpose) => {
    setSelectedPurpose(purpose);
    handleContactInputChange("purpose", purpose);
    setIsSelectBoxOpen(false);
  };

  const getPlaceholderText = (purpose) => {
    switch (purpose) {
      case "환불 요청하기":
        return (
          "아래의 요건이 충족 되신 분들은 환불 요청이 가능합니다.\n" +
          "- 구매하신 유료 서비스는 계약 체결일 또는 서비스 이용 시작일로부터 7일 이내에 취소 가능합니다.\n" +
          "- 환불 요청은 InterviewX 계정과 연결된 이메일 주소를 통해 요청하셔야 합니다. 연결된 이메일 주소를 사용하지 않으시면 환불이 제한됩니다.\n" +
          "- InterviewX에서 구매한 크레딧은 구매일로부터 7일 이내에만 환불이 가능하며, 이는 크레딧이 사용되지 않았을 경우에 한합니다.\n" +
          "- 구독 해지는 구독 관리 페이지에서 처리하실 수 있습니다."
        );

      case "서비스 이용 관련 문의":
        return (
          "- 서비스 이용 중 발생한 문제나 사용 방법에 대한 어려움이 있으시면 문의해 주세요.\n" +
          "- 보다 나은 서비스를 위해 소중한 의견과 개선 제안을 남겨 주세요.\n"
        );

      case "결제 및 청구 관련 문의":
        return (
          "- 결제 오류, 청구 내역 확인, 결제 수단 변경 등의 문제가 있으시면 문의해 주세요.\n" +
          "- 결제와 관련된 정확한 정보를 제공해 주시면 보다 빠르게 도와드릴 수 있습니다.\n"
        );

      case "버그 리포트":
        return (
          "- 서비스 사용 중 오류나 버그가 발생한 경우 알려 주세요.\n" +
          "- 빠른 해결을 위해 버그 리포트 작성 시, 아래 내용을 포함해 주시면 보다 정확하게 버그 상황을 진단할 수 있습니다. \n" +
          "  * 사용 중인 브라우저 및 기기 정보 (예: Chrome, iPhone 13)\n" +
          "  * 인터넷 환경 (Wi-Fi 또는 모바일 데이터)\n" +
          "  * 오류 발생 단계\n"
        );
      default:
        return (
          "문의 내용을 작성해 주세요.\n" +
          "- 문의 요청은 InterviewX 계정과 연결된 이메일 주소를 통해 요청하셔야 합니다. 연결된 이메일 주소를 사용하지 않으시면 문의 사항 답변이 제한됩니다."
        );
    }
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide>
          <MyProfileWrap>
            <MyProfileHeader>
              <H2 color="gray800" align="left">
                내 프로필
              </H2>

              <ButtonGroup>
                {(sessionStorage.getItem("userEmail") ===
                  "pg_card@userconnect.kr" ||
                  sessionStorage.getItem("userEmail") ===
                    "sungeun_lee@userconnect.kr" ||
                  sessionStorage.getItem("userEmail") ===
                    "pixelweb@naver.com") && (
                  <Button Primary onClick={() => navigate("/Payment")}>
                    <images.CoinSmall
                      width="12px"
                      height="8px"
                      color={palette.primary}
                    />
                    <Sub3 color="primary">요금제 관리</Sub3>
                  </Button>
                )}
                {/* <img src={images.CoinSmall} alt="요금제 관리" /> */}
                <div style={{ position: "relative" }}>
                  <Button
                    Primary
                    onClick={() => {
                      if (isServiceMenuOpen) {
                        closeServiceMenu();
                      } else {
                        setIsServiceMenuOpen(true);
                      }
                    }}
                  >
                    <img src={images.Headset} alt="고객 서비스" />
                    <Sub3 color="primary">고객 서비스</Sub3>
                  </Button>

                  {(isServiceMenuOpen || isClosing) && (
                    <ToggleBox $isClosing={isClosing}>
                      <Body3>고객 서비스</Body3>
                      <ToggleList>
                        <IconButton onClick={handleContactClick}>
                          <img src={images.QuestionCircle} alt="고객 서비스" />
                          <Sub3 color="gray700">문의하기 및 환불요청</Sub3>
                        </IconButton>
                        <IconButton onClick={() => navigate("/Terms")}>
                          <img src={images.ExclamationCircle} alt="이용약관" />
                          <Sub3 color="gray700">이용약관</Sub3>
                        </IconButton>
                        <IconButton onClick={() => navigate("/Policy")}>
                          <img src={images.Lock} alt="개인정보 이용 정책" />
                          <Sub3 color="gray700">개인정보 이용 정책</Sub3>
                        </IconButton>
                      </ToggleList>
                    </ToggleBox>
                  )}
                </div>
              </ButtonGroup>
            </MyProfileHeader>

            <ProfileInfoWrap>
              <ProfileInfo>
                <div className="thumb">
                  <img src={images.NoUserThumb} alt="" />
                </div>
                <div className="text">
                  <div className="name">
                    <H4 color="gray800">{userName}</H4>
                    {/* 일반일때 Grade General */}
                    {sessionStorage.getItem("userMembership") === "Normal" ? (
                      <Grade General />
                    ) : (
                      <Grade />
                    )}
                    {/* <Grade /> */}
                  </div>
                  <Caption2 color="gray500" align="left">
                    가입 날짜 24.10.19
                  </Caption2>
                </div>
              </ProfileInfo>

              {(sessionStorage.getItem("userEmail") ===
                "pg_card@userconnect.kr" ||
                sessionStorage.getItem("userEmail") ===
                  "sungeun_lee@userconnect.kr" ||
                sessionStorage.getItem("userEmail") ===
                  "pixelweb@naver.com") && (
                <Button
                  Large
                  Outline
                  Round
                  onClick={() => navigate("/Payment")}
                >
                  <images.CoinSmall
                    width="12px"
                    height="8"
                    color={palette.gray800}
                  />
                  <InputText>크레딧 충전</InputText>
                </Button>
              )}
            </ProfileInfoWrap>

            <ProfileInfoWrap column>
              <ProfileTitle>
                <Body2>사용자 정보</Body2>
              </ProfileTitle>

              <ProfileContent>
                <ProfileContentItem>
                  <div>
                    <Sub3 color="gray500">이름 (Name)</Sub3>
                    <Sub3 color="gray800">{userName}</Sub3>
                  </div>
                  <div>
                    <Sub3 color="gray500">이메일 주소 (E-mail adress)</Sub3>
                    <Sub3 color="gray800">{userEmail}</Sub3>
                  </div>
                </ProfileContentItem>

                <ProfileContentItem>
                  {/* <div>
                    <Sub3 color="gray500">성별 (Gender)</Sub3>
                    <Sub3 color="gray800">여성</Sub3>
                  </div> */}
                  <div>
                    <Sub3 color="gray500">요금제 </Sub3>
                    <Sub3 color="gray800">
                      {sessionStorage.getItem("userMembership") === "Normal"
                        ? "일반 사용자"
                        : "구독 사용자"}
                    </Sub3>
                  </div>
                </ProfileContentItem>
              </ProfileContent>
            </ProfileInfoWrap>

            <ProfileInfoWrap column>
              <ProfileTitle>
                {/* <Body2>아이디 & 비밀번호</Body2> */}

                <Button Large Outline Round onClick={handleAccountClick}>
                  <img src={images.Repeat} alt="" />
                  <InputText>비밀번호 변경</InputText>
                </Button>
              </ProfileTitle>

              {/* <ProfileContent>
                <ProfileContentItem>
                  <div>
                    <Sub3 color="gray500">아이디 (ID)</Sub3>
                    <Sub3 color="gray800">User Lee</Sub3>
                  </div>
                </ProfileContentItem>

                <ProfileContentItem>
                  <div>
                    <Sub3 color="gray500">비밀번호 (Password)</Sub3>
                    <Sub3 color="gray800">User********</Sub3>
                  </div>
                </ProfileContentItem>
              </ProfileContent> */}
            </ProfileInfoWrap>

            <WithdrawalButton onClick={() => setIsMemberDeletePopupOpen(true)}>
              <Sub3 color="gray500">회원 탈퇴하기</Sub3>
            </WithdrawalButton>
          </MyProfileWrap>
        </MainContent>
      </ContentsWrap>

      {isAccountPopupOpen && (
        <MoleculeAccountPopup onClose={closeAccountPopup} />
      )}

      {isContactPopupOpen && (
        <PopupWrap
          TitleFlex
          TitleBorder
          Wide
          title="문의하기"
          buttonType="Fill"
          confirmText="문의 등록하기"
          isModal={true}
          onClose={closeContactPopup}
          onCancel={closeContactPopup}
          onConfirm={handleContactSubmit}
          isFormValid={isContactFormValid()}
          body={
            <>
              <ContactUsWrap>
                <div>
                  <H5 color="gray800" align="left">
                    답변 받으실 Email 주소
                  </H5>
                  <CustomInput
                    type="text"
                    placeholder="입력하신 이메일로 답변이 발송되니, 다시 한번 확인 부탁드립니다."
                    value={contactForm.email}
                    onChange={(e) =>
                      handleContactInputChange("email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <H5 color="gray800" align="left">
                    문의 목적
                  </H5>
                  <SelectBox>
                    <SelectBoxTitle onClick={handleSelectBoxClick}>
                      <Body2 color={selectedPurpose ? "gray800" : "gray500"}>
                        {selectedPurpose ||
                          "문의 하시려는 목적을 선택해 주세요."}
                      </Body2>
                      <images.ChevronDown
                        width="24px"
                        height="24px"
                        color={palette.gray500}
                        style={{
                          transform: isSelectBoxOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </SelectBoxTitle>

                    {isSelectBoxOpen && (
                      <SelectBoxList>
                        <SelectBoxItem
                          onClick={() => handlePurposeSelect("문의사항 남기기")}
                        >
                          <Body2 color="gray700" align="left">
                            문의사항 남기기
                          </Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() =>
                            handlePurposeSelect("서비스 이용 관련 문의")
                          }
                        >
                          <Body2 color="gray700" align="left">
                            서비스 이용 관련 문의
                          </Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() =>
                            handlePurposeSelect("결제 및 청구 관련 문의")
                          }
                        >
                          <Body2 color="gray700" align="left">
                            결제 및 청구 관련 문의
                          </Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() => handlePurposeSelect("버그 리포트")}
                        >
                          <Body2 color="gray700" align="left">
                            버그 리포트
                          </Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() => handlePurposeSelect("환불 요청하기")}
                        >
                          <Body2 color="gray700" align="left">
                            환불 요청하기
                          </Body2>
                        </SelectBoxItem>
                      </SelectBoxList>
                    )}
                  </SelectBox>
                  {/* <CustomInput 
                    type="text" 
                    placeholder="문의 하시려는 목적을 선택해 주세요."
                    value={contactForm.purpose}
                    onChange={(e) => handleContactInputChange('purpose', e.target.value)}
                  /> */}
                </div>
                <div>
                  <H5 color="gray800" align="left">
                    문의 내용
                  </H5>
                  <CustomTextarea
                    placeholder={getPlaceholderText(selectedPurpose)}
                    rows="8"
                    value={contactForm.content}
                    onChange={(e) =>
                      handleContactInputChange("content", e.target.value)
                    }
                  />
                </div>
              </ContactUsWrap>
            </>
          }
        />
      )}
      {isMemberDeletePopupOpen && (
        <PopupWrap
          TitleFlex
          TitleBorder
          Wide
          title="회원탈퇴"
          buttonType="Fill"
          confirmText="이 버튼을 누르면, 바로 탈퇴가 진행됩니다."
          isModal={true}
          onClose={closeMemberDeletePopup}
          onCancel={closeMemberDeletePopup}
          onConfirm={handleMemberDeleteSubmit}
          isFormValid={isMemberDeleteFormValid()}
          body={
            <>
              <ContactUsWrap>
                <div>
                  <H5 color="gray800" align="left">
                    더 나은 서비스를 위해, 탈퇴하시는 이유를 간단히 알려주세요
                  </H5>
                  <CustomTextarea
                    placeholder={"탈퇴하시는 이유를 설명해주세요"}
                    rows="8"
                    value={memberDeleteForm.reason}
                    onChange={(e) =>
                      handleMemberDeleteInputChange("reason", e.target.value)
                    }
                  />
                </div>{" "}
                <BgBoxItem NoOutline style={{ marginBottom: "10px" }}>
                  <Sub3 color="gray500" align="left">
                    🚩 탈퇴 시, 주의사항 안내
                    <br /> - 회원 탈퇴 시, 생성된 모든 데이터가 영구적으로
                    삭제됩니다.
                    <br /> - 보유하신 크레딧 역시 함께 삭제되며, 복구가
                    불가능합니다.
                    <br /> - 탈퇴 후에는 계정 및 관련 데이터 복원이 불가능하니
                    신중하게 결정해 주세요.
                    <br /> - 삭제된 데이터는 서비스 이용 기록, 설정 정보 등을
                    포함할 수 있습니다.
                    <br /> - 궁금한 점이 있으시면 고객센터로 문의해 주세요.
                  </Sub3>
                </BgBoxItem>
              </ContactUsWrap>
            </>
          }
        />
      )}
    </>
  );
};

export default PageMyProfile;

const SelectBox = styled.div`
  position: relative;
`;

const SelectBoxItem = styled.div`
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: ${palette.primaryLightest};
  }
`;

const SelectBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 5px;
  border: 1px solid ${palette.outlineGray};
  cursor: pointer;
  z-index: 1;
  background-color: ${palette.white};

  &:hover {
    border-color: ${palette.primary};
  }
`;

const SelectBoxList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 5px 5px;
  border: 1px solid ${palette.outlineGray};
  border-top: none;
  background: ${palette.white};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.12);
  z-index: 2;

  > div {
    padding: 13px 20px;
  }
`;

const ContactUsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid ${palette.outlineGray};

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
`;

const MyProfileWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 50px auto;
`;

const MyProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileInfoWrap = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  justify-content: space-between;
  align-items: ${(props) => (props.column ? "flex-start" : "center")};
  gap: 9px;
  padding-top: 32px;
  border-top: 1px solid ${palette.outlineGray};
`;

const ProfileInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;

  .thumb {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4px;
  }

  .name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
  }

  .date {
    font-size: 0.875rem;
    color: ${palette.gray500};
  }
`;

const ProfileTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProfileContent = styled.div`
  display: flex;
  width: 100%;
`;

const ProfileContentItem = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const Grade = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 5px;
  background: ${(props) =>
    props.General ? palette.primaryLightest : palette.primary};

  &:before {
    font-size: 0.88rem;
    font-weight: 400;
    line-height: 1.55;
    letter-spacing: -0.42px;
    color: ${(props) => (props.General ? palette.primary : palette.white)};
    content: "${(props) => (props.General ? "일반" : "구독")}";
  }
`;

// const Grade = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 4px 8px;
//   border-radius: 5px;
//   background: ${palette.primaryLightest};

//   &:before {
//     font-size: 0.88rem;
//     font-weight: 400;
//     line-height: 1.55;
//     letter-spacing: -0.42px;
//     color: ${palette.primary};
//     content: "충전 플랜";
//   }
// `;

const WithdrawalButton = styled.div`
  position: fixed;
  bottom: 50px;
  display: flex;

  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 68px;
  cursor: pointer;
`;

export const BgBoxItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
  padding: ${(props) => (props.NoOutline ? "12px" : "8px 12px")};
  border-radius: 10px;
  border: ${(props) =>
    props.NoOutline ? "0" : `1px solid ${palette.outlineGray}`};
  background: ${(props) => (props.white ? palette.white : palette.chatGray)};
`;
