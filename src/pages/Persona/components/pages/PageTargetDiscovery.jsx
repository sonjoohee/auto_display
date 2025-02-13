//타겟 디스커버리리
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
import MoleculeHeader from "../molecules/MoleculeHeader";
import {
  ButtonGroup,
  Button,
  IconButton,
} from "../../../../assets/styles/ButtonStyle";
import { 
  FormBox, 
  CustomTextarea, 
  CustomInput, 
  SelectBox, 
  SelectBoxItem, 
  SelectBoxTitle, 
  SelectBoxList,
  CheckBoxButton,
} from "../../../../assets/styles/InputStyle";
import {
  ContentsWrap,
  MainContent,
  Badge,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  CardGroupWrap,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  BottomBar,
  BgBoxItem,
  ListBoxWrap,
  ListBoxItem,
  ListBoxTitle,
  ListBoxContent,
  Keyword,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import {
  H4,
  H3,
  H5,
  Body1,
  Body2,
  Body3,
} from "../../../../assets/styles/Typography";

const PageTargetDiscovery = () => {
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedInterviewType, setSelectedInterviewType] = useState(null);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useState(null);
  const [contactForm, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [dropUp, setDropUp] = useState(false);
  const selectBoxRef = useRef(null);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);  // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");

  const calculateDropDirection = () => {
    if (selectBoxRef.current) {
      const rect = selectBoxRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200; // 예상되는 드롭다운 높이

      setDropUp(spaceBelow < dropDownHeight && spaceAbove > spaceBelow);
    }
  };

  const handleSelectBoxClick = () => {
    calculateDropDirection();
    setIsSelectBoxOpen(!isSelectBoxOpen);
  };

  const handlePurposeSelect = (purpose) => {
    setSelectedPurpose(purpose);
    handleContactInputChange("purpose", purpose);
    setIsSelectBoxOpen(false);
  };

  const handleContactInputChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectPersona = () => {
    if (selectedPersonas.length > 0) {
      setSelectedInterviewType("multiple");
      setSelectedInterviewPurpose("product_experience_new");
    }
  };

  const handleCheckboxChange = (personaId) => {
    setSelectedPersonas(prev => {
      if (prev.includes(personaId)) {
        return prev.filter(id => id !== personaId);
      } else {
        // 최대 5개까지만 선택 가능
        if (prev.length >= 5) return prev;
        return [...prev, personaId];
      }
    });
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
  };

  // 필수 필드가 모두 입력되었는지 확인하는 함수
  const isRequiredFieldsFilled = () => {
    return businessDescription.trim() !== "" && targetCustomer.trim() !== "";
  };

  // 비즈니스 설명 입력 핸들러
  const handleBusinessDescriptionChange = (e) => {
    setBusinessDescription(e.target.value);
  };

  // 타겟 고객 입력 핸들러
  const handleTargetCustomerChange = (e) => {
    setTargetCustomer(e.target.value);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <TargetDiscoveryWrap>
            <TabWrapType5>
              <TabButtonType5 
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray800" : "gray300"}>비즈니스 입력</Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5 
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={!completedSteps.includes(1)}
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>잠재고객 맥락 분석</Body1>
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>Contextual Inquiry</Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5 
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={!completedSteps.includes(2)}
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>시나리오 분석</Body1>
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>Scenario Analysis</Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5 
                isActive={activeTab >= 4}
                onClick={() => completedSteps.includes(3) && setActiveTab(4)}
                disabled={!completedSteps.includes(3)}
              >
                <span>04</span>
                <div className="text">
                  <Body1 color={activeTab >= 4 ? "gray800" : "gray300"}>최종 인사이트 분석</Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Find Your Potential Customers</H3>
                  <Body3 color="gray800">혹시 놓치고 있는 고객은 없을까요? 잠재력있는 고객을 체계적으로 확인해보세요 </Body3>
                </div>

                <div className="content">
                  <TabContent5Item required>
                    <div className="title">
                      <Body1 color="gray700">비즈니스 설명</Body1>
                      <Body1 color="red">*</Body1>
                    </div>
                    <FormBox Large>
                      <CustomTextarea 
                        Edit 
                        rows={4} 
                        placeholder="잠재고객을 도출하고 싶은 비즈니스에 대해서 설명해주세요 (예: 친환경 전기 자전거 공유 플랫폼 등)" 
                        onChange={handleBusinessDescriptionChange}
                        value={businessDescription}
                        status="valid" 
                      />
                      <Body2 color="gray300" align="right">
                        {businessDescription.length} / 150
                      </Body2>
                    </FormBox>
                  </TabContent5Item>

                  <TabContent5Item required>
                    <div className="title">
                      <Body1 color="gray700">타겟 고객</Body1>
                      <Body1 color="red">*</Body1>
                    </div>
                    <CustomInput
                      type="text"
                      placeholder="핵심 타겟 고객 군을 작성해주세요 (예: 20대 여성 등)"
                      value={targetCustomer}
                      onChange={handleTargetCustomerChange}
                    />
                  </TabContent5Item>

                  <TabContent5Item>
                    <div className="title">
                      <Body1 color="gray700">분석하고자 하는 특정 상황</Body1>
                    </div>
                    <CustomInput
                      type="text"
                      placeholder="특별히 분석하고자 하는 특정 상황이 있으신 경우, 입력해주세요 (예: 전기자전거의 배터리가 없는 상황 등)"
                    />
                  </TabContent5Item>

                  <TabContent5Item>
                    <div className="title">
                      <Body1 color="gray700">타겟 국가</Body1>
                    </div>
                    
                    <SelectBox ref={selectBoxRef}>
                      <SelectBoxTitle onClick={handleSelectBoxClick}>
                        <Body2 color={selectedPurpose ? "gray800" : "gray300"}>
                          {selectedPurpose ||
                            "특정 타겟 국가가 있는 경우 선택해주세요"}
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
                        <SelectBoxList dropUp={dropUp}>
                          <SelectBoxItem
                            onClick={() => handlePurposeSelect("대한민국")}
                          >
                            <Body2 color="gray700" align="left">
                              대한민국
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() =>
                              handlePurposeSelect("미국")
                            }
                          >
                            <Body2 color="gray700" align="left">
                              미국
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() =>
                              handlePurposeSelect("중국")
                            }
                          >
                            <Body2 color="gray700" align="left">
                              중국
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => handlePurposeSelect("일본")}
                          >
                            <Body2 color="gray700" align="left">
                              일본
                            </Body2>
                          </SelectBoxItem>
                          <SelectBoxItem
                            onClick={() => handlePurposeSelect("베트남")}
                          >
                            <Body2 color="gray700" align="left">
                              베트남
                            </Body2>
                          </SelectBoxItem>
                        </SelectBoxList>
                      )}
                    </SelectBox>
                  </TabContent5Item>
                </div>

                <Button 
                  Other 
                  Primary 
                  Fill 
                  Round
                  onClick={() => handleNextStep(1)}
                  disabled={!isRequiredFieldsFilled()}
                >
                    다음
                </Button>
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Contextual Inquiry Analysis</H3>
                  <Body3 color="gray800">비즈니스에 적합한 다양한 페르소나를 기반으로 잠재고객을 분석합니다</Body3>
                </div>

                <div className="content">
                  <CardGroupWrap>
                    <ListBoxItem 
                      NoBg
                      selected={selectedPersonas.includes('persona1')} 
                      active={selectedPersonas.includes('persona1')}
                    >
                      <div>
                        <CheckBoxButton 
                          id="persona1"
                          name="persona1"
                          checked={selectedPersonas.includes('persona1')}
                          onChange={() => handleCheckboxChange('persona1')}
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1>가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        </ListTitle>

                        <ListSubtitle>
                            <Badge Keyword>
                              #키워드1
                            </Badge>
                            <Badge Keyword>
                              #키워드2
                            </Badge>
                            <Badge Keyword>
                              #키워드3
                            </Badge>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <CustomButton
                          Medium
                          PrimaryLightest
                          Fill
                        >
                          자세히
                        </CustomButton>
                      </ListButton>
                    </ListBoxItem>

                    <ListBoxItem 
                      NoBg
                      selected={selectedPersonas.includes('persona2')} 
                      active={selectedPersonas.includes('persona2')}
                    >
                      <div>
                        <CheckBoxButton 
                          id="persona2"
                          name="persona2"
                          checked={selectedPersonas.includes('persona2')}
                          onChange={() => handleCheckboxChange('persona2')}
                        />
                      </div>
                      <ListText>
                        <ListTitle>
                          <Body1>가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        </ListTitle>

                        <ListSubtitle>
                            <Badge Keyword>
                              #키워드1
                            </Badge>
                            <Badge Keyword>
                              #키워드2
                            </Badge>
                            <Badge Keyword>
                              #키워드3
                            </Badge>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <CustomButton
                          Medium
                          PrimaryLightest
                          Fill
                        >
                          자세히
                        </CustomButton>
                      </ListButton>
                    </ListBoxItem>
                  </CardGroupWrap>

                  <BottomBar W100>
                    <Body2
                      color={selectedPersonas.length === 0 ? "gray300" : "gray800"}
                    >
                      시나리오 분석을 원하는 페르소나를 선택해주세요 ({selectedPersonas.length}/5)
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={selectedPersonas.length === 0}
                      onClick={() => handleNextStep(2)}
                    >
                      다음
                      <images.ChevronRight
                        width="20"
                        height="20"
                        color={palette.white}
                      />
                    </Button>
                  </BottomBar>
                </div>
              </TabContent5>
            )}

            {activeTab === 3 && completedSteps.includes(2) && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Persona Scenario Analysis</H3>
                  <Body3 color="gray800">선택하신 잠재고객과 비즈니스의 연관성을 분석해드려요</Body3>
                </div>

                <div className="content">
                  <CardGroupWrap>
                    <ListBoxItem>
                      <ListText>
                        <ListTitle>
                          <Body1>가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        </ListTitle>

                        <ListSubtitle>
                            <Badge Keyword>
                              #키워드1
                            </Badge>
                            <Badge Keyword>
                              #키워드2
                            </Badge>
                            <Badge Keyword>
                              #키워드3
                            </Badge>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <CustomButton
                          Medium
                          PrimaryLightest
                          Fill
                        >
                          자세히
                        </CustomButton>
                      </ListButton>
                    </ListBoxItem>

                    <ListBoxItem>
                      <ListText>
                        <ListTitle>
                          <Body1>가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        </ListTitle>

                        <ListSubtitle>
                            <Badge Keyword>
                              #키워드1
                            </Badge>
                            <Badge Keyword>
                              #키워드2
                            </Badge>
                            <Badge Keyword>
                              #키워드3
                            </Badge>
                        </ListSubtitle>
                      </ListText>
                      <ListButton>
                        <CustomButton
                          Medium
                          PrimaryLightest
                          Fill
                        >
                          자세히
                        </CustomButton>
                      </ListButton>
                    </ListBoxItem>
                  </CardGroupWrap>

                  <BottomBar W100>
                    <Body2 color="gray800">
                      5명의 페르소나에 대한 잠재고객 가능성을 분석해드릴게요
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      onClick={() => handleNextStep(3)}
                    >
                      다음
                      <images.ChevronRight
                        width="20"
                        height="20"
                        color={palette.white}
                      />
                    </Button>
                  </BottomBar>
                </div>
              </TabContent5>
            )}

            {activeTab === 4 && completedSteps.includes(3) && (
              <TabContent5 Small>
                <BgBoxItem primaryLightest>
                  <H3 color="gray800">타겟디스커버리 인사이트 분석</H3>
                  <Body3 color="gray800">잠재 고객과 시나리오 분석을 통해 새로운 전략적 방향을 탐색해보세요</Body3>
                </BgBoxItem>

                <InsightAnalysis>
                  <div className="title">
                    <H4 color="gray800">잠재력이 가장 높은 페르소나는 OOO 입니다.</H4>
                    <Button Primary>리포트 저장하기</Button>
                  </div>

                  <div className="content">
                    <Body3 color="gray700">
                      인터뷰 결과, 스마트홈 스피커의 음성 인식률과 반응 속도는 높게 평가되었으나, 개인 맞춤형 기능 부족 및 정보 보안에 대한 우려가 주요 문제점으로 나타났습니다. 특히, 워킹맘 답변자는 자녀를 위한 교육 콘텐츠 및 안전 기능 강화의 필요성을 강조했고, 50대 가장 답변자는 가족 구성원 모두가 쉽게 사용할 수 있는 가족 친화적인 인터페이스 부족을 지적했습니다. 49세 남성 답변자는 개인정보 보안 및 유출에 대한 우려를 표명하며, 이에 대한 강화된 보안 시스템 구축의 필요성을 언급했습니다. 이러한 문제들은 사용자의 스마트홈 스피커에 대한 전반적인 만족도를 저해할 수 있는 요인으로 작용합니다. 따라서 사용자의 니즈를 충족하고, 불안감을 해소하는 것이 중요한 과제입니다.
                    </Body3>

                    <Body3 color="gray700">
                      인터뷰 데이터를 통해 도출된 문제점을 해결하고 사용자 경험을 개선할 수 있는 기회는 다음과 같습니다. 첫째, 가격 경쟁력 강화를 위해 다양한 할인 혜택 및 패키지 상품을 개발하고, 경쟁사 가격과 비교 분석하여 합리적인 가격 정책을 수립해야 합니다. 둘째, 세탁물 관리의 투명성을 높이기 위해 세탁 과정을 사진 또는 영상으로 촬영하여 고객에게 제공하는 기능을 추가하고, 세탁 전후 의류 상태 비교 사진 제공을 통해 고객의 불안감을 해소해야 합니다. 셋째, 세탁 사고에 대한 보상 체계 마련을 통해 고객의 신뢰를 확보하는 것이 중요합니다. 이는 보험 가입 및 명확한 보상 절차를 마련함으로써 이루어질 수 있습니다. 이러한 개선을 통해 서비스의 신뢰도를 높이고 고객 만족도를 향상시킬 수 있을 것입니다..
                    </Body3>
                  </div>
                </InsightAnalysis>

                <ListBoxWrap>
                  <ListBoxItem>
                    <ListBoxTitle>
                      <div>
                        <Body1 color="gray800">가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        <Keyword>
                          <Badge Keyword>Strong Potential</Badge>
                          <Badge Keyword>#키워드</Badge>
                          <Badge Keyword>#키워드</Badge>
                        </Keyword>
                      </div>
                      <CustomButton
                        Medium
                        PrimaryLightest
                        Fill
                      >
                        자세히
                      </CustomButton>
                    </ListBoxTitle>

                    <ListBoxContent>
                      <Body3 color="gray700" align="left">
                        인터뷰 결과, 스마트홈 스피커의 음성 인식률과 반응 속도는 높게 평가되었으나, 개인 맞춤형 기능 부족 및 정보 보안에 대한 우려가 주요 문제점으로 나타났습니다. 특히, 워킹맘 답변자는 자녀를 위한 교육 콘텐츠 및 안전 기능 강화의 필요성을 강조했고, 50대 가장 답변자는 가족 구성원 모두가 쉽게 사용할 수 있는 가족 친화적인 인터페이스 부족을 지적했습니다. 
                      </Body3>
                    </ListBoxContent>
                  </ListBoxItem>

                  <ListBoxItem>
                    <ListBoxTitle>
                      <div>
                        <Body1 color="gray800">가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        <Keyword>
                          <Badge Keyword>Strong Potential</Badge>
                          <Badge Keyword>#키워드</Badge>
                          <Badge Keyword>#키워드</Badge>
                        </Keyword>
                      </div>
                      <CustomButton
                        Medium
                        PrimaryLightest
                        Fill
                      >
                        자세히
                      </CustomButton>
                    </ListBoxTitle>

                    <ListBoxContent>
                      <Body3 color="gray700" align="left">
                        인터뷰 결과, 스마트홈 스피커의 음성 인식률과 반응 속도는 높게 평가되었으나, 개인 맞춤형 기능 부족 및 정보 보안에 대한 우려가 주요 문제점으로 나타났습니다. 특히, 워킹맘 답변자는 자녀를 위한 교육 콘텐츠 및 안전 기능 강화의 필요성을 강조했고, 50대 가장 답변자는 가족 구성원 모두가 쉽게 사용할 수 있는 가족 친화적인 인터페이스 부족을 지적했습니다. 
                      </Body3>
                    </ListBoxContent>
                  </ListBoxItem>

                  <ListBoxItem>
                    <ListBoxTitle>
                      <div>
                        <Body1 color="gray800">가족과 함께 여가를 보내는 활동 지향형 소비자</Body1>
                        <Keyword>
                          <Badge Keyword>Strong Potential</Badge>
                          <Badge Keyword>#키워드</Badge>
                          <Badge Keyword>#키워드</Badge>
                        </Keyword>
                      </div>
                      <CustomButton
                        Medium
                        PrimaryLightest
                        Fill
                      >
                        자세히
                      </CustomButton>
                    </ListBoxTitle>

                    <ListBoxContent>
                      <Body3 color="gray700" align="left">
                        인터뷰 결과, 스마트홈 스피커의 음성 인식률과 반응 속도는 높게 평가되었으나, 개인 맞춤형 기능 부족 및 정보 보안에 대한 우려가 주요 문제점으로 나타났습니다. 특히, 워킹맘 답변자는 자녀를 위한 교육 콘텐츠 및 안전 기능 강화의 필요성을 강조했고, 50대 가장 답변자는 가족 구성원 모두가 쉽게 사용할 수 있는 가족 친화적인 인터페이스 부족을 지적했습니다. 
                      </Body3>
                    </ListBoxContent>
                  </ListBoxItem>
                </ListBoxWrap>

                <Button Small Primary>리포트 저장하기</Button>
              </TabContent5>
            )}
          </TargetDiscoveryWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageTargetDiscovery;

const TargetDiscoveryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const CustomButton = styled(Button)`
  min-width: 92px;
`;

const InsightAnalysis = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
  }
`;

const MyDashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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

const MyProjectWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin: 50px auto;
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
    max-width: 440px;
    width: 100%;
  }

  > p:nth-child(2) {
    max-width: 220px;
    width: 100%;
  }

  > p:nth-child(3) {
    max-width: 165px;
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
