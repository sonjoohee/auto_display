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
import { CustomInput, CustomTextarea } from "../../../../assets/styles/InputStyle";

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

const PageMyProfile = () => {
  const navigate = useNavigate();
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false); // 계정설정 팝업
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false); // 문의하기 팝업
  const [contactForm, setContactForm] = useState({
    email: '',
    purpose: '',
    content: ''
  });
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState('');

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

  const handleContactInputChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isContactFormValid = () => {
    return contactForm.email && contactForm.purpose && contactForm.content;
  };

  const handleContactSubmit = () => {
    if (isContactFormValid()) {
      // TODO: 문의하기 제출 로직 구현
      console.log('문의하기 제출:', contactForm);
      closeContactPopup();
    }
  };

  const handleSelectBoxClick = () => {
    setIsSelectBoxOpen(!isSelectBoxOpen);
  };

  const handlePurposeSelect = (purpose) => {
    setSelectedPurpose(purpose);
    handleContactInputChange('purpose', purpose);
    setIsSelectBoxOpen(false);
  };

  const getPlaceholderText = (purpose) => {
    switch(purpose) {
      case "환불 요청하기":
        return "아래의 요건이 충족 되신 분들은 환불 요청이 가능합니다.\n" +
               "- 구매하신 유료 서비스는 계약 체결일 또는 서비스 이용 시작일로부터 7일 이내에 취소 가능합니다.\n" +
               "- 환불 요청은 InterviewX 계정과 연결된 이메일 주소를 통해 요청하셔야 합니다. 연결된 이메일 주소를 사용하지 않으시면 환불이 제한됩니다.\n" +
               "- InterviewX에서 구매한 크레딧은 구매일로부터 7일 이내에만 환불이 가능하며, 이는 크레딧이 사용되지 않았을 경우에 한합니다.\n" +
               "- 구독 해지는 구독 관리 페이지에서 처리하실 수 있습니다.";
      default:
        return "문의 내용을 작성해 주세요.\n" +
               "- 문의 요청은 InterviewX 계정과 연결된 이메일 주소를 통해 요청하셔야 합니다. 연결된 이메일 주소를 사용하지 않으시면 문의 사항 답변이 제한됩니다.";
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
              <H2 color="gray800" align="left">내 프로필</H2>

              <ButtonGroup>
                <Button Primary onClick={() => navigate("/Payment")}>
                  <images.CoinSmall
                    width="12px"
                    height="8px"
                    color={palette.primary}
                  />

                  <Sub3 color="primary">요금제 관리</Sub3>
                </Button>
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
                          <img
                            src={images.QuestionCircle}
                            alt="고객 서비스"
                          />
                          <Sub3 color="gray700">문의사기 및 환불요청</Sub3>
                        </IconButton>
                        <IconButton onClick={() => navigate("/Terms")}>
                          <img
                            src={images.ExclamationCircle}
                            alt="이용약관"
                          />
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
                    <H4 color="gray800">OOO</H4>
                    <Grade />
                  </div>
                  <Caption2 color="gray500" align="left">
                    가입 날짜 24.10.19
                  </Caption2>
                </div>
              </ProfileInfo>

              <Button Large Outline Round onClick={() => navigate("/Payment")}>
                <images.CoinSmall width="12px" height="8" color={palette.gray800} />
                <InputText>크레딧 충전</InputText>
              </Button>
            </ProfileInfoWrap>

            <ProfileInfoWrap column>
              <ProfileTitle>
                <Body2>사용자 정보</Body2>
              </ProfileTitle>

              <ProfileContent>
                <ProfileContentItem>
                  <div>
                    <Sub3 color="gray500">이름 (Name)</Sub3>
                    <Sub3 color="gray800">이혜은</Sub3>
                  </div>
                  <div>
                    <Sub3 color="gray500">이메일 주소 (E-mail adress)</Sub3>
                    <Sub3 color="gray800">hyeeun@userconnect.kr</Sub3>
                  </div>
                </ProfileContentItem>

                <ProfileContentItem>
                  <div>
                    <Sub3 color="gray500">성별 (Gender)</Sub3>
                    <Sub3 color="gray800">여성</Sub3>
                  </div>
                  <div>
                    <Sub3 color="gray500">요금제 </Sub3>
                    <Sub3 color="gray800">일반 사용자, 구독 플랜</Sub3>
                  </div>
                </ProfileContentItem>
              </ProfileContent>
            </ProfileInfoWrap>

            <ProfileInfoWrap column>
              <ProfileTitle>
                <Body2>아이디 & 비밀번호</Body2>

                <Button Large Outline Round onClick={handleAccountClick}>
                  <img src={images.Repeat} alt="" />
                  <InputText>비밀번호 변경</InputText>
                </Button>
              </ProfileTitle>

              <ProfileContent>
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
              </ProfileContent>
            </ProfileInfoWrap>

            <WithdrawalButton>
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
          onConfirm={handleContactSubmit}
          isFormValid={isContactFormValid()}
          body={
            <>
              <ContactUsWrap>
                <div>
                  <H5 color="gray800" align="left">E-mail</H5>
                  <CustomInput 
                    type="text" 
                    placeholder="가입하신 이메일 주소를 입력해주세요. (이메일 답변 발송 예정)"
                    value={contactForm.email}
                    onChange={(e) => handleContactInputChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <H5 color="gray800" align="left">문의 목적</H5>
                  <SelectBox>
                    <SelectBoxTitle onClick={handleSelectBoxClick}>
                      <Body2 color={selectedPurpose ? "gray800" : "gray500"}>
                        {selectedPurpose || "문의 하시려는 목적을 선택해 주세요."}
                      </Body2>
                      <images.ChevronDown 
                        width="24px" 
                        height="24px" 
                        color={palette.gray500}
                        style={{ transform: isSelectBoxOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                      />
                    </SelectBoxTitle>

                    {isSelectBoxOpen && (
                      <SelectBoxList>
                        <SelectBoxItem onClick={() => handlePurposeSelect("문의사항 남기기")}>
                          <Body2 color="gray700" align="left">문의사항 남기기</Body2>
                        </SelectBoxItem>
                        <SelectBoxItem onClick={() => handlePurposeSelect("환불 요청하기")}>
                          <Body2 color="gray700" align="left">환불 요청하기</Body2>
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
                  <H5 color="gray800" align="left">문의 내용</H5>
                  <CustomTextarea 
                    placeholder={getPlaceholderText(selectedPurpose)}
                    rows="8"
                    value={contactForm.content}
                    onChange={(e) => handleContactInputChange('content', e.target.value)}
                  />
                </div>
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
  transition: all .5s;

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
  flex-direction: ${(props) => props.column ? "column" : "row"};
  justify-content: space-between;
  align-items: ${(props) => props.column ? "flex-start" : "center"};
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
  background: ${palette.primaryLightest};

  &:before {
    font-size: 0.88rem;
    font-weight: 400;
    line-height:1.55;
    letter-spacing: -0.42px;
    color: ${palette.primary};
    content: '충전 플랜';
  }
`;

const WithdrawalButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 68px;
  cursor: pointer;
`;