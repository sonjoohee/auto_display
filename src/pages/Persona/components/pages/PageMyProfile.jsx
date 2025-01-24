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
import {
  Button,
} from "../../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import {
  H2,
  H4,
  H5,
  Body2,
  Sub3,
  Caption2,
  InputText,
} from "../../../../assets/styles/Typography";

const PageMyProfile = () => {
  const navigate = useNavigate();

  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false); // 계정설정 팝업

  const handleAccountClick = () => {
    setAccountPopupOpen(true); // 계정설정 팝업 열기
  };

  const closeAccountPopup = () => {
    setAccountPopupOpen(false); // 계정설정 팝업 닫기
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide>
          <MyProfileWrap>
            <H2 color="gray800" align="left">내 프로필</H2>

            <ProfileInfoWrap>
              <ProfileInfo>
                <div className="thumb" />
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
          </MyProfileWrap>
        </MainContent>
      </ContentsWrap>
           
      {isAccountPopupOpen && (
        <MoleculeAccountPopup onClose={closeAccountPopup} />
      )}

    </>
  );
};

export default PageMyProfile;

const MyProfileWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 50px auto;
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
    background-color: ${palette.gray200};
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

const MyProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MyProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const MyDashboardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

const MyDashboardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MyProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled(H5)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: ${palette.gray800};
  padding-bottom: 20px;
  border-bottom: 1px solid ${palette.outlineGray};
`;

const ProjectList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > p {
    flex-grow: 1;
    text-align: left;
  }

  > p:nth-child(1) {
    max-width: 475px;
    width: 100%;
  }

  > p:nth-child(2) {
    max-width: 220px;
    width: 100%;
  }

  > p:nth-child(3) {
    max-width: 150px;
    width: 100%;
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // gap: 12px;
  gap: ${(props) => (props.Nodata ? "16px" : "12px")};
  // padding: 12px 24px;
  padding: ${(props) => (props.Nodata ? "52px 24px 40px" : "12px 24px")};
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.white};
  z-index: 1;
  transition: box-shadow 0.3s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen &&
    `
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.12);
  `}

  ${(props) =>
    props.Nodata &&
    css`
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        p {
          color: ${palette.gray500};
          line-height: 1.5;
        }
      }
    `}
`;

const ProjectInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 440px;
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${palette.gray500};
  }
`;

const Persona = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  max-width: 230px;
  width: 100%;
  padding: 8px;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px 24px;
    flex: 1;
    text-align: left;

    + div:before {
      position: absolute;
      top: 50%;
      left: -12px;
      transform: translateY(-50%);
      width: 1px;
      height: 19px;
      background-color: ${palette.outlineGray};
      content: "";
    }

    span {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.gray300};
    }

    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
      font-size: 0.875rem;
      color: ${palette.gray700};
    }
  }
`;

const Recruit = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  max-width: 155px;
  width: 100%;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray300};
  }

  p {
    font-size: 0.875rem;
    color: ${palette.gray700};

    &.ing {
      color: ${palette.primary};
    }

    &.complete {
      color: ${palette.green};
    }
  }
`;

const Report = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.75rem;
    color: ${palette.gray300};
  }

  p {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-size: 0.875rem;
    color: ${palette.gray700};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    font-family: "Pretendard", poppins;
    font-size: 0.75rem;
    font-weight: 400;
    color: ${palette.gray500};
    padding: 6px 10px;
    border-radius: 4px;
    border: 1px solid ${palette.outlineGray};
    background-color: ${palette.chatGray};
  }
`;

const ProjectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid ${palette.outlineGray};

  p {
    font-size: 0.875rem;
    color: ${palette.gray800};
  }

  button {
    font-family: "Pretendard", poppins;
    font-size: 0.75rem;
    color: ${palette.white};
    padding: 6px 10px;
    border-radius: 4px;
    border: none;
    background-color: ${palette.primary};
  }
`;

const ProjectView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 28px 20px 20px;
  margin-top: -20px;
  border-radius: 0 0 10px 10px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.chatGray};
  animation: slideDown 0.3s ease-in-out;
  transform-origin: top;
  opacity: 1;

  &.closing {
    animation: slideUp 0.3s ease-in-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

const ViewInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: $space-between;
  gap: 4px;
  width: 100%;
  font-size: 0.875rem;
  color: ${palette.gray800};

  + div {
    padding-top: 16px;
    border-top: 1px solid ${palette.outlineGray};
  }

  .title {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 8px;
    font-size: 0.875rem;
    color: ${palette.black};

    span {
      font-size: 0.75rem;
      font-weight: 300;
      color: ${palette.gray500};
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 7px;
      font-size: 0.875rem;
      font-weight: 300;
      color: ${palette.gray500};
      line-height: 1.5;

      + div:before {
        position: absolute;
        top: 50%;
        left: -16px;
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background-color: ${palette.outlineGray};
        content: "";
      }
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    button {
      font-family: "Pretendard", poppins;
      font-size: 0.75rem;
      font-weight: 300;
      padding: 6px 10px;
      border-radius: 6px;

      &.view {
        color: ${palette.black};
        border: 1px solid ${palette.outlineGray};
        background: ${palette.chatGray};
      }

      &.analysis {
        color: ${palette.primary};
        border: 1px solid ${palette.primary};
        background: #e9f1ff;
      }
    }
  }
`;

const ViewInfoNodata = styled(ViewInfo)`
  justify-content: center;
  padding: 24px 0 16px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      line-height: 1.5;
      color: ${palette.gray500};

      span {
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.5;
        color: ${palette.primary};
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid ${palette.primary};
        background-color: #e9f1ff;
        cursor: pointer;
      }
    }
  }
`;

const PageWrap = styled.div`
  width: 100%;
`;
