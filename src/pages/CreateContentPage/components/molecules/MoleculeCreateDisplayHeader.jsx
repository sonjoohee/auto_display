//헤더 컴포넌트
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import {
  Body2,
  Sub1,
  Sub2,
  Sub3,
  Caption2,
} from "../../../../assets/styles/Typography";
import {
  CreditTotal,
  CreditDashBoardItem,
  CreditNoData,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import { useAtom } from "jotai";
import {
  PERSONA_STEP,
  USER_CREDITS,
  IS_LOGGED_IN,
} from "../../../../pages/AtomStates";
import { UserCreditInfo } from "../../../../utils/indexedDB";
import { AlarmList } from "../../../../utils/indexedDB";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { Button } from "../../../../assets/styles/ButtonStyle";

const MoleculeCreateDisplayHeader = ({ 
  activeTab, 
  setActiveTab, 
  completedSteps, 
  isLoading, 
  isLoadingReport,
  onPreview,
  onSave 
}) => {
  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        if (isLoggedIn) {
          const credits = await UserCreditInfo(true);

          if (credits) {
            setUserCredits(credits);
            setIsLoggedInState(true);
          } else {
            setUserCredits({
              additional_credit: 0,
              regular_credit: 0,
              event_credit: 0,
            });
            setIsLoggedInState(false);
          }
        }
      } catch (error) {
        // console.error("유저 크레딧 정보 조회 오류 발생:", error);
        setUserCredits({
          additional_credit: 0,
          regular_credit: 0,
          event_credit: 0,
        });
        setIsLoggedInState(false);
      }
    };

    fetchUserCredits();
  }, []);

  const fetchAlarms = async () => {
    if (!isLoggedIn) {
      return;
    }
    try {
      const response = await AlarmList(isLoggedIn); // AlarmCreate API 호출

      const userInfo = await UserCreditInfo(true);

      const readTimeStamp = userInfo?.read_timestamp;

      if (response && response.status === "success") {
        setAlarms(response.alarms); // Store alarms in state
        const createTimeStamp = response?.alarms[0]?.createTimeStamp;


      }
   
    } catch (error) {
      // console.error("알림 조회 오류 발생:", error);
     
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, [location, isLoggedIn]);

  const handleLinkNavigation = async (item) => {
    const link = item.link;
    // const projectId = item.projectId;
    if (!link) return;
    try {
      // const url = new URL(link);
      // if (url.hostname === "www.interviewx.ai") {
      //   // interviewx.ai 도메인인 경우 pathname으로 내부 이동
      //   navigate(url.pathname);
      // } else
      if (link === "dashboard") {
       

        navigate("/Project");
        // navigate("/DashBoard");
      } else {
        // 다른 외부 링크는 새 창에서 열기
        window.open(link, "_blank");
      }
    } catch (e) {
      // URL 파싱 실패시 (상대 경로인 경우) 직접 이동
      if (link.startsWith("/Project")) {
        navigate(link);
      } else {
        window.open(link, "_blank");
      }
    }
  };

  const handleCancel = () => {
    // 취소 로직 (예: 이전 페이지로 이동 또는 확인 팝업)
    navigate(-1);
  };

  return (
    <>
      <HeaderWrap>
        {/* 왼쪽: 취소하기 */}
        <LeftSection>
          <CancelButton onClick={handleCancel}>
            <Sub1 color="gray800" style={{ fontWeight: "600", cursor: "pointer" }}>
              취소하기
            </Sub1>
          </CancelButton>
        </LeftSection>

        {/* 중앙: 탭 버튼들 */}
        <CenterSection>
          <TabContainer>
            <TabButton
              isActive={activeTab >= 1}
              onClick={() => setActiveTab(1)}
              disabled={isLoading || isLoadingReport}
            >
              <TabNumber isActive={activeTab >= 1}>1</TabNumber>
              <TabText isActive={activeTab >= 1}>자료 업로드</TabText>
            </TabButton>
            
            <TabDivider />
            
            <TabButton
              isActive={activeTab >= 2}
              onClick={() => completedSteps.includes(1) && setActiveTab(2)}
              disabled={!completedSteps.includes(1) || isLoading || isLoadingReport}
            >
              <TabNumber isActive={activeTab >= 2}>2</TabNumber>
              <TabText isActive={activeTab >= 2}>자료 분석</TabText>
            </TabButton>
            
            <TabDivider />
            
            <TabButton
              isActive={activeTab >= 3}
              onClick={() =>
                (completedSteps.includes(2) || completedSteps.includes(3)) &&
                setActiveTab(3)
              }
              disabled={!completedSteps.includes(3) || isLoading || isLoadingReport}
            >
              <TabNumber isActive={activeTab >= 3}>3</TabNumber>
              <TabText isActive={activeTab >= 3}>콘텐츠 생성</TabText>
            </TabButton>
            
            <TabDivider />
            
            <TabButton
              isActive={activeTab >= 4}
              onClick={() =>
                (completedSteps.includes(3) || completedSteps.includes(4) ) &&
                setActiveTab(4)
              }
            >
              <TabNumber isActive={activeTab >= 4}>4</TabNumber>
              <TabText isActive={activeTab >= 4}>화면 실행</TabText>
            </TabButton>
          </TabContainer>
        </CenterSection>

        {/* 오른쪽: 액션 버튼들 */}
        <RightSection>
          <Button 
            Large
            Outline 
            onClick={onPreview}
            disabled={isLoading || isLoadingReport}
          >
         뒤로
          </Button>
          <Button 
         
            Primary 
            Large
            Fill
            onClick={onSave}
            disabled={isLoading || isLoadingReport}
          >
            자료 분석
          </Button>
        </RightSection>
      </HeaderWrap>
    </>
  );
};

export default MoleculeCreateDisplayHeader;

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  border-bottom: 1px solid ${palette.lineGray};
  background: ${palette.white};
  z-index: 99;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const CancelButton = styled.div`
  cursor: pointer;
  
  &:hover {
    opacity: 0.7;
  }
`;

const CenterSection = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TabDivider = styled.div`
  width: 20px;
  height: 1px;
  background: ${palette.gray300};
  margin: 0 8px;
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: transparent;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.2s ease;
  
  ${props => props.isActive 
    ? css`
        // background: ${palette.gray800};
      `
    : css`
        background: transparent;
        // border: 1px solid ${palette.gray300};
      `
  }
  
  &:hover {
    opacity: ${props => props.disabled ? 0.5 : 0.8};
  }
`;

const TabNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 20%;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  ${props => props.isActive 
    ? css`
        background: ${palette.gray800};
        color: ${palette.white};
      `
    : css`
        // background: ${palette.gray400};
        color: ${palette.gray800};
        border: 1px solid ${palette.gray300};
      `
  }
`;

const TabText = styled.div`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  
  ${props => props.isActive 
    ? css`
        color: ${palette.gray800};
        font-weight: 600;
      `
    : css`
        color: ${palette.gray500};
        font-weight: 600;
      `
  }
`;
const RightSection = styled.div`
display: flex;
align-items: center;
gap: 12px;
`;

