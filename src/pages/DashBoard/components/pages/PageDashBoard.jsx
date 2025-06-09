//대시보드
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import {
  H1,

  H4,

  Body1,
  Body2,
  Caption1,
} from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import MoleculeHeader from "../../../Global/molecules/MoleculeHeader";

import OrganismDashboardToolList from "../organisms/OrganismDashboardToolList";
import OrganismDashboardDisplayList from "../organisms/OrganismDashboardDisplayList";
import PopupWrap from "../../../../assets/styles/Popup";
import { 
  SelectBox, 
  SelectBoxTitle, 
  SelectBoxList, 
  SelectBoxItem,
  CustomTextarea,
  CheckBoxButton
} from "../../../../assets/styles/InputStyle";
import images from "../../../../assets/styles/Images";


const PageDashBoard = () => {
  const navigate = useNavigate();
  
  // 대시보드 상태 데이터
  const [stats] = useState({
    registeredDevices: 5,
    totalContent: 20,
    activeContent: 10,
    credits: 21250
  });

  // 탭 상태
  const [activeTab, setActiveTab] = useState("content");


  // 팝업 관련 상태
  const [isCustomizePopupOpen, setIsCustomizePopupOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isSelectDisplayPopupOpen, setIsSelectDisplayPopupOpen] = useState(false);
  const [addDisplayForm, setAddDisplayForm] = useState({
    deviceName: "",
    location: "",
    targetAudience: "",
    resolution: "",
    customResolution: "",
    inch: "",
    widthSize: "",
    heightSize: ""
  });
  const [selectBoxStates, setSelectBoxStates] = useState({
    resolution: false,
    inch: false
  });
  const [showCustomResolution, setShowCustomResolution] = useState(false);


  const [registeredDevices] = useState([
    { id: 1, name: "1층 로비 디스플레이", type: "55인치 디스플레이", location: "1층 로비" },
    { id: 2, name: "2층 안내 키오스크", type: "32인치 키오스크", location: "2층 복도" },
    //빈 배열로 테스트: []
  ]);

  // 콘텐츠 생성 관련 팝업 상태
  const [showContentPopup, setShowContentPopup] = useState(false);
  const [showDeviceSelectPopup, setShowDeviceSelectPopup] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // 선택된 기기 상태 추가
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  // 팝업 핸들러들
  const showPopup = () => {
    setIsCustomizePopupOpen(true);
  };

  const handleCustomizePopupClose = () => {
    setIsCustomizePopupOpen(false);
    setActiveTabIndex(0);
    setAddDisplayForm({
      deviceName: "",
      location: "",
      targetAudience: "",
      resolution: "",
      customResolution: "",
      inch: "",
      widthSize: "",
      heightSize: ""
    });
  };

  const handleCustomizePopupConfirm = () => {
    if (activeTabIndex < 2) {
      setActiveTabIndex(activeTabIndex + 1);
    } else {
      // 마지막 탭에서 확인
      console.log("기기 등록 완료", addDisplayForm);
      handleCustomizePopupClose();
    }
  };

  const toggleSelectBox = (type) => {
    setSelectBoxStates(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleFormChange = (field, value) => {
    setAddDisplayForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePurposeSelect = (value, type) => {
    setSelectBoxStates(prev => ({
      ...prev,
      [type]: false
    }));
  };

  const isFormValid = () => {
    const resolutionValid = addDisplayForm.resolution && 
      (addDisplayForm.resolution !== "기타" || addDisplayForm.customResolution);
      
    return addDisplayForm.deviceName && 
           addDisplayForm.location && 
           addDisplayForm.targetAudience &&
           resolutionValid &&
           addDisplayForm.inch &&
           addDisplayForm.widthSize &&
           addDisplayForm.heightSize;
  };

  // 테이블 데이터 (장애인 지원금 예시)
  const [tableData] = useState([
    {
      category: "국민기초생활보장 생계 또는 의료급여 수급자",
      severeDisability: "22 만원",
      mildDisability: "11 만원"
    },
    {
      category: "차상위계층 (차상위본인부담경감대상자 등)",
      severeDisability: "22 만원", 
      mildDisability: "11 만원"
    },
    {
      category: "기초연금수급자 (만65세 이상)",
      severeDisability: "22 만원",
      mildDisability: "11 만원"
    },
    {
      category: "장애아동수당 대상자",
      severeDisability: "22 만원",
      mildDisability: "11 만원"
    },
    {
      category: "장애인연금 대상자",
      severeDisability: "22 만원",
      mildDisability: "11 만원"
    },
    {
      category: "기타 저소득 장애인",
      severeDisability: "22 만원",
      mildDisability: "11 만원"
    }
  ]);



  // 기기 선택 후 콘텐츠 생성
  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
    setShowDeviceSelectPopup(false);
    navigate("/CreateContent", { state: { selectedDevice: device } });
  };

  // 기기 선택 확정 핸들러
  const handleConfirmDeviceSelect = () => {
    if (registeredDevices.length === 0) {
      // 기기가 없으면 기기 등록 팝업 열기
      setShowDeviceSelectPopup(false);
      showPopup();
    } else {
      // 기기가 있으면 선택된 기기로 콘텐츠 생성
      const device = registeredDevices.find(d => d.id === selectedDeviceId);
      if (device) {
        setSelectedDevice(device);
        setShowDeviceSelectPopup(false);
        setSelectedDeviceId(null);
        navigate("/CreateContent", { state: { selectedDevice: device } });
      }
    }
  };

  const handleDomainKeyGenerate = async () => {
    console.log("도메인 키 생성 시작", addDisplayForm);
    setIsCustomizePopupOpen(false);
    try {
      // console.log("도메인 키 생성 시작", addDisplayForm);
      // const response = await generateDomainKey();
      // console.log(response);

    } catch (error) {
      console.error("도메인 키 생성 오류:", error);
    }finally{
      setIsCustomizePopupOpen(false);
    }
  };


  return (
    <DashboardContainer>
      <MoleculeHeader />

      {/* 메인 컨텐츠 */}
      <MainContent>
        {/* 상단 섹션 */}
        <TopSection>
          <CompanyInfo>
            <Avatar />
            <CompanyName>회사명</CompanyName>
          </CompanyInfo>
          <ButtonGroup>

            <Button Large Fill PrimaryLightest onClick={showPopup}>  
              <Caption1 color="primary">새 기기 등록</Caption1>
            </Button>
            <Button Large Primary Fill onClick={() => setShowDeviceSelectPopup(true)}>
              <Caption1 color="white">새 콘텐츠</Caption1>
            </Button> 

          </ButtonGroup>
        </TopSection>

        {/* 통계 섹션 */}
        <StatsSection>
          <SectionTitle>기기 및 콘텐츠 현황</SectionTitle>
          <StatsGrid>
            <StatCard>
              <StatHeader>
                <Body2 color="gray600">등록 기기 수</Body2>
                <Body2 color="gray600">갯수</Body2>
              </StatHeader>
              <StatValue>{stats.registeredDevices} 개</StatValue>
            </StatCard>
            <StatCard>
              <StatHeader>
                <Body2 color="gray600">전체 콘텐츠 수</Body2>
                <Body2 color="gray600">건수</Body2>
              </StatHeader>
              <StatValue>{stats.totalContent} 건</StatValue>
            </StatCard>
            <StatCard>
              <StatHeader>
                <Body2 color="gray600">활성화 콘텐츠 수</Body2>
                <Body2 color="gray600">건수</Body2>
              </StatHeader>
              <StatValue>{stats.activeContent} 건</StatValue>
            </StatCard>
          </StatsGrid>
        </StatsSection>

        {/* 탭 및 테이블 섹션 */}
        <TableSection>
          <TabContainer>
            <Tab 
              active={activeTab === "content"} 
              onClick={() => setActiveTab("content")}
            >
              등록 콘텐츠 (10)
            </Tab>
            <Tab 
              active={activeTab === "display"} 
              onClick={() => setActiveTab("display")}
            >
              등록 디스플레이 (3)
            </Tab>
          </TabContainer>

          <OrganismDashboardDisplayList />
        </TableSection>
      </MainContent>
      
      {/* 기기 등록 팝업 */}
      {isCustomizePopupOpen && (
        <PopupWrap
          title="디스플레이 기기 등록"
          // buttonType="Fill"
          // confirmText="도메인 Key값 생성"
          isModal={true}
          isFormValid={isFormValid()}
          onCancel={handleCustomizePopupClose}
          onConfirm={handleCustomizePopupConfirm}
          showTabs={false}
          eventState={false}
          body={
            <PopupFormContainer>
              <FormField>
                <Body2 color="gray700" align="left">
                  디스플레이 기기명 입력
                </Body2>
                <CustomTextarea
                  width="100%"
                  rows={1}
                  placeholder="입력해주세요"
                  value={addDisplayForm.deviceName}
                  onChange={(e) =>
                    handleFormChange("deviceName", e.target.value)
                  }
                />
              </FormField>

              <FormField>
                <Body2 color="gray700" align="left">
                  설치 장소 입력
                </Body2>
                <CustomTextarea
                  width="100%"
                  rows={1}
                  placeholder="입력해주세요"
                  value={addDisplayForm.location}
                  onChange={(e) =>
                    handleFormChange("location", e.target.value)
                  }
                />
              </FormField>

              <FormField>
                <Body2 color="gray700" align="left">
                  주요 사용 대상 입력
                </Body2>
                <CustomTextarea
                  width="100%"
                  rows={1}
                  placeholder="입력해주세요"
                  value={addDisplayForm.targetAudience}
                  onChange={(e) =>
                    handleFormChange("targetAudience", e.target.value)
                  }
                />
              </FormField>

              <FormRow>
                <FormField flex={1}>
                  <Body2 color="gray700" align="left">
                    디스플레이 해상도
                  </Body2>
                    <SelectBox>
                    <SelectBoxTitle onClick={() => toggleSelectBox("resolution")}>
                        <Body2
                          color={
                          (addDisplayForm.resolution && addDisplayForm.resolution !== "기타") || 
                          (addDisplayForm.resolution === "기타" && addDisplayForm.customResolution)
                            ? "gray800" 
                            : "gray300"
                        }
                      >
                        {addDisplayForm.resolution === "기타" && addDisplayForm.customResolution
                          ? addDisplayForm.customResolution
                          : addDisplayForm.resolution && addDisplayForm.resolution !== "기타"
                          ? addDisplayForm.resolution
                          : "선택해주세요"}
                        </Body2>
                        <images.ChevronDown
                          width="24px"
                          height="24px"
                          color={palette.gray500}
                          style={{
                            transform: selectBoxStates.resolution
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </SelectBoxTitle>

                      {selectBoxStates.resolution && (
                        <SelectBoxList>
                          <SelectBoxItem
                            onClick={() => {
                            handleFormChange("resolution", "HD | 1366 × 768");
                            handleFormChange("customResolution", "");
                            handlePurposeSelect("HD | 1366 × 768", "resolution");
                            }}
                          >
                            <Body2 color="gray700" align="left">
                            HD | 1366 × 768
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("resolution", "FHD | 1920 × 1080");
                            handleFormChange("customResolution", "");
                              handlePurposeSelect("FHD | 1920 × 1080", "resolution");
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              FHD | 1920 × 1080
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("resolution", "QHD (2K) | 2560 × 1440");
                            handleFormChange("customResolution", "");
                              handlePurposeSelect("QHD (2K) | 2560 × 1440", "resolution");
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              QHD (2K) | 2560 × 1440
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("resolution", "UHD (4K) | 3840 × 2160");
                            handleFormChange("customResolution", "");
                              handlePurposeSelect("UHD (4K) | 3840 × 2160", "resolution");
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              UHD (4K) | 3840 × 2160
                            </Body2>
                          </SelectBoxItem>
                        
                        {addDisplayForm.resolution === "기타" ? (
                          <SelectBoxItem>
                            <SizeInput
                              type="text"
                              placeholder="예: 1920 × 1080"
                              value={addDisplayForm.customResolution}
                              onChange={(e) =>
                                handleFormChange("customResolution", e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && addDisplayForm.customResolution.trim()) {
                                  setSelectBoxStates(prev => ({ ...prev, resolution: false }));
                                }
                                if (e.key === 'Escape') {
                                  handleFormChange("resolution", "");
                                  handleFormChange("customResolution", "");
                                }
                              }}
                              autoFocus
                              style={{
                                border: 'none',
                                background: 'transparent',
                                width: '100%',
                                outline: 'none',
                                fontSize: '14px',
                                color: palette.gray700
                              }}
                            />
                          </SelectBoxItem>
                        ) : (
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("resolution", "기타");
                              // handlePurposeSelect 호출하지 않음 - SelectBox가 열린 상태 유지
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              기타 - 해상도를 입력하겠습니다
                            </Body2>
                          </SelectBoxItem>
                        )}
                      </SelectBoxList>
                    )}
                  </SelectBox>
                </FormField>

                <FormField flex={1}>
                <Body2 color="gray700" align="left">
                    디스플레이 인치
                  </Body2>
                  <SelectBox>
                    <SelectBoxTitle onClick={() => toggleSelectBox("inch")}>
                      <Body2
                        color={
                          (addDisplayForm.inch && addDisplayForm.inch !== "기타") || 
                          (addDisplayForm.inch === "기타" && addDisplayForm.customInch)
                            ? "gray800" 
                            : "gray300"
                        }
                      >
                        {addDisplayForm.inch === "기타" && addDisplayForm.customInch
                          ? addDisplayForm.customInch
                          : addDisplayForm.inch && addDisplayForm.inch !== "기타"
                          ? addDisplayForm.inch
                          : "선택해주세요"}
                      </Body2>
                      <images.ChevronDown
                        width="24px"
                        height="24px"
                        color={palette.gray500}
                        style={{
                          transform: selectBoxStates.inch
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </SelectBoxTitle>

                    {selectBoxStates.inch && (
                      <SelectBoxList>
                        <SelectBoxItem
                          onClick={() => {
                            handleFormChange("inch", "21.5인치");
                            handleFormChange("customInch", "");
                            handlePurposeSelect("21.5인치", "inch");
                          }}
                        >
                          <Body2 color="gray700" align="left">21.5 인치</Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() => {
                            handleFormChange("inch", "27인치");
                            handleFormChange("customInch", "");
                            handlePurposeSelect("27인치", "inch");
                          }}
                        >
                          <Body2 color="gray700" align="left">27 인치</Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() => {
                            handleFormChange("inch", "32인치");
                            handleFormChange("customInch", "");
                            handlePurposeSelect("32인치", "inch");
                          }}
                        >
                          <Body2 color="gray700" align="left">32 인치</Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() => {
                            handleFormChange("inch", "43인치");
                            handleFormChange("customInch", "");
                            handlePurposeSelect("43인치", "inch");
                          }}
                        >
                          <Body2 color="gray700" align="left">43 인치</Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() => {
                            handleFormChange("inch", "55인치");
                            handleFormChange("customInch", "");
                            handlePurposeSelect("55인치", "inch");
                          }}
                        >
                          <Body2 color="gray700" align="left">55 인치</Body2>
                        </SelectBoxItem>
                        <SelectBoxItem
                          onClick={() => {
                            handleFormChange("inch", "65인치");
                            handleFormChange("customInch", "");
                            handlePurposeSelect("65인치", "inch");
                          }}
                        >
                          <Body2 color="gray700" align="left">65 인치</Body2>
                        </SelectBoxItem>
                        
                        {addDisplayForm.inch === "기타" ? (
                          <SelectBoxItem>
                            <SizeInput
                              type="text"
                              placeholder="예: 43인치"
                              value={addDisplayForm.customInch}
                              onChange={(e) =>
                                handleFormChange("customInch", e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && addDisplayForm.customInch.trim()) {
                                  setSelectBoxStates(prev => ({ ...prev, inch: false }));
                                }
                                if (e.key === 'Escape') {
                                  handleFormChange("inch", "");
                                  handleFormChange("customInch", "");
                                }
                              }}
                              autoFocus
                              style={{
                                border: 'none',
                                background: 'transparent',
                                width: '100%',
                                outline: 'none',
                                fontSize: '14px',
                                color: palette.gray700
                              }}
                            />
                          </SelectBoxItem>
                        ) : (
                          <SelectBoxItem
                            onClick={() => {
                              handleFormChange("inch", "기타");
                              // handlePurposeSelect 호출하지 않음 - SelectBox가 열린 상태 유지
                            }}
                          >
                            <Body2 color="gray700" align="left">
                              기타 - 디스플레이의 인치를 입력하겠습니다
                            </Body2>
                          </SelectBoxItem>
                        )}
                      </SelectBoxList>
                    )}
                  </SelectBox>
                </FormField>
              </FormRow>

              <FormField>
                <Body2 color="gray700" align="left">
                  디스플레이 사이즈 확인
                </Body2>
                <SizeInputRow>
                  <SizeInputGroup>
                    <SizeInput
                      type="text"
                      placeholder="가로 사이즈"
                      value={addDisplayForm.widthSize}
                      onChange={(e) =>
                        handleFormChange("widthSize", e.target.value)
                      }
                    />
                    <SizeUnit>mm</SizeUnit>
                  </SizeInputGroup>
                  <SizeInputGroup>
                    <SizeInput
                      type="text"
                      placeholder="세로 사이즈"
                      value={addDisplayForm.heightSize}
                      onChange={(e) =>
                        handleFormChange("heightSize", e.target.value)
                      }
                    />
                    <SizeUnit>mm</SizeUnit>
                  </SizeInputGroup>
                </SizeInputRow>
              </FormField>

              <InfoBox>
                <Body2 color="gray700" style={{ textAlign: 'center', marginBottom: '16px' }}>
                  디스플레이 기기 정보 입력이 완료되면 아래 버튼을 눌러주세요
                </Body2>
                <ButtonCenter>
                  <LargeButton Large Primary Fill>
                    <Body1 color="white" style={{ fontSize: '16px', fontWeight: '400' }} onClick={handleDomainKeyGenerate}>도메인 Key값 생성</Body1>
                  </LargeButton>
                </ButtonCenter>
              </InfoBox>
            </PopupFormContainer>
          }
        />
      )}

      {/* 기기 없음 알림 팝업 */}

      {/* 기기 선택 팝업 */}
      {showDeviceSelectPopup && (
        <PopupWrap
          title="등록한 디스플레이 선택"
          subtitle="콘텐츠를 등록할 기기를 선택해 주세요."
          buttonType="Fill"
          // closeText="취소"
          confirmText={registeredDevices.length === 0 ? "기기 등록하러 가기" : "디스플레이 선택"}
          isModal={true}
          isFormValid={registeredDevices.length === 0 || selectedDeviceId !== null}
          onCancel={() => {
            setShowDeviceSelectPopup(false);
            setSelectedDeviceId(null);
          }}
          onConfirm={handleConfirmDeviceSelect}
          body={
            <DeviceSelectContainer>
              {registeredDevices.length === 0 ? (
                // 등록된 기기가 없을 때 빈 박스
                <EmptyDeviceBox>
                  <EmptyMessage>
                    <Body2 color="gray500">아직 기기가 등록되지 않았어요.</Body2>
                    <Body2 color="gray500">콘텐츠 만들용 아래 먼저 기기를 등록해주세요.</Body2>
                  </EmptyMessage>
                </EmptyDeviceBox>
              ) : (
                // 등록된 기기가 있을 때 목록
                registeredDevices.map((device) => (
                  <DeviceSelectItem 
                    key={device.id}
                    selected={selectedDeviceId === device.id}
                    onClick={() => setSelectedDeviceId(device.id)}
                  >
                    <CheckBoxButton
                      id={`device-${device.id}`}
                      name="selectedDevice"
                      checked={selectedDeviceId === device.id}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSelectedDeviceId(device.id);
                      }}
                      style={{ cursor: 'pointer', marginTop: '2px' }}
                    />
                    <DeviceInfo>
                      <DeviceName>디스플레이 기기명</DeviceName>
                      <DeviceDetails>
                        <DeviceDetailRow>
                          <Body2 color="gray600">해상도: 정보</Body2>
                          <Body2 color="gray600">인치 정보</Body2>
                          <Body2 color="gray600">사이즈 정보 (mm)</Body2>
                        </DeviceDetailRow>
                        <DeviceLocation>
                          <Body2 color="gray600">설치장소: </Body2>
                          <Body2 color="primary">{device.location}</Body2>
                        </DeviceLocation>
                      </DeviceDetails>
                    </DeviceInfo>
                  </DeviceSelectItem>
                ))
              )}
            </DeviceSelectContainer>
          }
        />
      )}

    </DashboardContainer>
  );
};

export default PageDashBoard;

// PopupContent 스타일 추가
const PopupContent = styled.div`
  margin-top: 8px;
`;


// 스타일 컴포넌트들
const DashboardContainer = styled.div`
  width: 100%;
  max-width: 2330px;
  margin: 0 auto;
  background: ${palette.white};
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 40px;
  height: 56px;
`;

const Logo = styled.h1`
  font-family: Poppins;
  font-weight: 700;
  font-size: 20px;
  color: #323232;
  margin: 0;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const CreditSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CreditIcon = styled.div`
  width: 20px;
  height: 20px;
  background: #FFD54A;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const CreditText = styled.span`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  color: #323232;
`;

const CreditArrow = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #CCCCCC;
`;

const NotificationIcon = styled.div`
  width: 18px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MoreIcon = styled.div`
  width: 18px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #E0E4EB;
`;

const MainContent = styled.main`
  max-width: 1240px;
  margin: 0 auto;
  padding: 72px 0;
  display: flex;
  flex-direction: column;
  gap: 72px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background: #D9D9D9;
  border-radius: 50%;
`;

const CompanyName = styled.h2`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 40px;
  color: #1E2124;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h3`
  font-family: Pretendard;
  font-weight: 700;

  font-size: 16px;
  color: #696969;
  margin: 0;
  text-align: left;

`;

const StatsGrid = styled.div`
  display: flex;
  gap: 20px;
`;

const StatCard = styled.div`
  flex: 1;
  background: ${palette.white};
  border: 1px solid #E0E4EB;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatValue = styled.div`
  font-family: Poppins;
  font-weight: 700;

  font-size: 30px;
  color: #666666;
  text-align: left;

`;

const TableSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 272px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 0 0 12px 0;
  font-family: Pretendard;
  font-weight: ${props => props.active ? 700 : 400};
  font-size: 16px;
  color: ${props => props.active ? '#323232' : '#8C8C8C'};
  cursor: pointer;
  position: relative;
  
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: #323232;
    }
  `}
`;

const Table = styled.div`
  border-radius: 0;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: flex;
  background: #EEF2F7;
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: flex;
  background: ${palette.white};
  
  &:not(:last-child) {
    border-bottom: 1px solid #CDD1D5;
  }
`;

const HeaderCell = styled.div`
  padding: 20px 16px;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 15px;
  color: #131416;
  border-right: 1px solid #D6E0EB;
  
  ${props => props.wide ? `
    flex: 1;
    text-align: left;
  ` : `
    width: 240px;
    text-align: right;
  `}
  
  &:last-child {
    border-right: none;
  }
`;

const TableCell = styled.div`
  padding: 20px 16px;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 17px;
  color: #464C53;
  border-right: 1px solid #CDD1D5;
  
  ${props => props.wide ? `
    flex: 1;
    text-align: left;
  ` : `
    width: 240px;
    text-align: right;
  `}
  
  &:last-child {
    border-right: none;
  }
`;


const PopupFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 4px;
  flex: ${props => props.flex || 'none'};
  margin-bottom: -10px;

  Body2 {
    margin-bottom: 10px;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
`;

const SizeInputRow = styled.div`
  display: flex;
  gap: 16px;
`;

const SizeInputGroup = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SizeInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #E0E4EB;
  border-radius: 6px;
  font-size: 14px;
  color: ${palette.gray700};
  
  &:focus {
    outline: none;
    border-color: ${palette.primary};
  }
  
  &::placeholder {
    color: ${palette.gray400};
  }
`;

const SizeUnit = styled.span`
  font-size: 14px;
  color: ${palette.gray600};
  min-width: 24px;
`;

const ButtonCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const InfoBox = styled.div`
  background-color: ${palette.primaryLightest};
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // gap: 16px;
`;

const LargeButton = styled(Button)`
  width: 200px;
  padding: 16px 32px;
  font-size: 16px;
  min-height: 56px;
`;

const DirectInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: ${palette.gray500};
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: ${palette.gray100};
    color: ${palette.gray700};
  }
`;

// 새로운 styled components 추가
const DeviceSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
  padding: 0;
`;

const DeviceSelectItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 20px;
  border: 1px solid ${props => props.selected ? palette.primary : palette.outlineGray};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.selected ? palette.primaryLightest : palette.white};

  &:hover {
    border-color: ${palette.primary};
  }
`;

const DeviceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const DeviceName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${palette.gray800};
  text-align: left;
`;

const DeviceDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
`;

const DeviceDetailRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const DeviceLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EmptyDeviceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 12px;
  background-color: ${palette.gray50};
  min-height: 200px;
`;

const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

