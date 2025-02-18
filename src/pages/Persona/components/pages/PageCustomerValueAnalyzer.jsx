//고객 핵심 가치 분석기
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

import AtomPersonaLoader from "../atoms/AtomPersonaLoader";
import MoleculeCustomerValueCard from "../molecules/MoleculeCustomerValueCard";

import { 
  FormBox, 
  CustomTextarea, 
  CustomInput, 
  SelectBox, 
  SelectBoxItem, 
  SelectBoxTitle, 
  SelectBoxList,
  CheckBoxButton,
  GenderRadioButton,
} from "../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  Badge,
  TabWrapType2,
  TabButtonType2,
  TabWrapType3,
  TabButtonType3,
  TabWrapType4,
  TabButtonType4,
  TabContent,
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
  InterviewPopup,
  Status,
  ListRowWrap,
  ListRowItem,
  BoxWrap,
  PopupContent,
  PopupTitle,
  PopupTitle2,
  TextWrap,
  ListBox,
  ListGroup,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import {
  H4,
  H3,
  H5,
  Sub1,
  Sub3,
  Body1,
  Body2,
  Body3,
  Caption2,
} from "../../../../assets/styles/Typography";

import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  CUSTOMER_VALUE_ANALYZER_INFO,
  CUSTOMER_VALUE_ANALYZER_PERSONA,
  CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA,
  CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP,
  CUSTOMER_VALUE_ANALYZER_FACTOR,
  CUSTOMER_VALUE_ANALYZER_CLUSTERING,
  CUSTOMER_VALUE_ANALYZER_POSITIONING,
  CUSTOMER_VALUE_ANALYZER_FINAL_REPORT,
} from "../../../../pages/AtomStates";

import {
  createToolOnServer,
  updateToolOnServer,
  getToolOnServer,
  InterviewXCustomerValueAnalyzerPersonaRequest,
  getToolListOnServer,
  InterviewXCustomerValueAnalyzerJourneyMapRequest,
  InterviewXCustomerValueAnalyzerFactorRequest,
  InterviewXCustomerValueAnalyzerClusteringRequest,
  InterviewXCustomerValueAnalyzerPositioningRequest,
  InterviewXCustomerValueAnalyzerFinalReportRequest,
} from "../../../../utils/indexedDB";


const PageCustomerValueAnalyzer = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);
  const [customerValueAnalyzerInfo, setCustomerValueAnalyzerInfo] = useAtom(CUSTOMER_VALUE_ANALYZER_INFO);
  const [customerValueAnalyzerPersona, setCustomerValueAnalyzerPersona] = useAtom(CUSTOMER_VALUE_ANALYZER_PERSONA);
  const [customerValueAnalyzerSelectedPersona, setCustomerValueAnalyzerSelectedPersona] = useAtom(CUSTOMER_VALUE_ANALYZER_SELECTED_PERSONA);
  const [customerValueAnalyzerJourneyMap, setCustomerValueAnalyzerJourneyMap] = useAtom(CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP);
  const [customerValueAnalyzerFactor, setCustomerValueAnalyzerFactor] = useAtom(CUSTOMER_VALUE_ANALYZER_FACTOR);
  const [customerValueAnalyzerClustering, setCustomerValueAnalyzerClustering] = useAtom(CUSTOMER_VALUE_ANALYZER_CLUSTERING);
  const [customerValueAnalyzerPositioning, setCustomerValueAnalyzerPositioning] = useAtom(CUSTOMER_VALUE_ANALYZER_POSITIONING);
  const [customerValueAnalyzerFinalReport, setCustomerValueAnalyzerFinalReport] = useAtom(CUSTOMER_VALUE_ANALYZER_FINAL_REPORT);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMore, setShowPopupMore] = useState(false);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
    analysisScope: ""
  });
  const [selectedInterviewType, setSelectedInterviewType] = useState(null);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] = useState(null);
  const [activeTab1, setActiveTab1] = useState("personaInfo");
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
  const [targetCustomers, setTargetCustomers] = useState(['']);
  const [personaData, setPersonaData] = useState({
    personaInfo: "",
    personaScenario: "",
  });

  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
    analysisScope: false
  });

  const [dropUpStates, setDropUpStates] = useState({
    customerList: false,
    analysisScope: false
  });

  const customerListRef = useRef(null);
  const analysisScopeRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [targetDiscoveryList, setTargetDiscoveryList] = useState([]);

  const [cardStatuses, setCardStatuses] = useState({});

  // 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 타겟 디스커버리 리스트 가져오기
  useEffect(() => {
    const getAllTargetDiscovery = async () => {
      try {
        let page = 1;
        const size = 10;
        let allItems = [];
        
        while (true) {
          const response = await getToolListOnServer(size, page, isLoggedIn);
          
          // Check if response exists and has data
          if (!response || !response.data) {
            console.error('Invalid response from server');
            break;
          }

          const targetDiscoveryData = response.data.filter(item => 
            item.type === "ix_target_discovery_persona"
          );
          
          const newItems = targetDiscoveryData.filter(item => 
            item?.target_discovery_scenario?.length > 0
          );
          
          allItems = [...allItems, ...newItems];
          
          // Check if we've reached the end of the data
          if (!response.count || response.count <= page * size) {
            break;
          }
          
          page++;
        }

        setTargetDiscoveryList(allItems);
      } catch (error) {
        console.error('Error fetching target discovery list:', error);
        setTargetDiscoveryList([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn]);

  // 고객 여정 맵 API 호출 시작
  useEffect(() => {
    if (activeTab === 2 && 
        customerValueAnalyzerPersona.length > 0 && 
        toolStep < 2) {  // toolStep이 2보다 작을 때만 API 호출
      // 모든 카드의 상태를 waiting으로 초기화
      const initialLoadingStates = customerValueAnalyzerPersona.reduce((acc, _, index) => {
        acc[index] = 'waiting';
        return acc;
      }, {});
      setCardStatuses(initialLoadingStates);

      // 순차적으로 API 호출을 처리하는 함수
      const processSequentially = async () => {
        for (let index = 0; index < customerValueAnalyzerPersona.length; index++) {
          try {
            // 현재 카드만 loading으로 변경
            setCardStatuses(prev => ({
              ...prev,
              [index]: 'loading'
            }));

            const data = {
              business: customerValueAnalyzerInfo.business,
              target: customerValueAnalyzerInfo.target_list[index],
              analysis_scope: customerValueAnalyzerInfo.analysis_scope,
              analysis_purpose: customerValueAnalyzerPersona[index]
            };

            const response = await InterviewXCustomerValueAnalyzerJourneyMapRequest(
              data,
              isLoggedIn
            );
            console.log("Journey Map 응답:", response);
            
            setCustomerValueAnalyzerJourneyMap(prev => {
              // prev가 undefined인 경우 빈 배열로 초기화
              const currentJourneyMaps = Array.isArray(prev) ? prev : [];
              // 새로운 journey map이 존재하는 경우에만 추가
              if (response?.response?.customer_value_journey_map) {
                return [...currentJourneyMaps, response.response.customer_value_journey_map];
              }
              return currentJourneyMaps;
            });

            // 성공적인 응답 후 카드 상태 업데이트
            if (response?.response?.customer_value_journey_map) {
              setCardStatuses(prev => ({
                ...prev,
                [index]: 'completed'
              }));
            }
              // 모든 시나리오를 한번에 저장
              await updateToolOnServer(
                toolId,
                {
                  completed_step: 2,
                  customer_value_journey_map:
                    response.response.customer_value_journey_map,
                },
                isLoggedIn
              );
              setToolStep(2);


          } catch (error) {
            console.error(`Journey Map API 호출 실패 (카드 ${index}):`, error);
          }
        }
      };
      processSequentially();
    } else if (activeTab === 2 && toolStep >= 2) {
      // 이미 완료된 단계인 경우 카드 상태만 completed로 설정
      const completedStates = customerValueAnalyzerPersona.reduce((acc, _, index) => {
        acc[index] = 'completed';
        return acc;
      }, {});
      setCardStatuses(completedStates);
    }
  }, [activeTab, customerValueAnalyzerPersona]);


  const handleSubmitBusinessInfo = async () => {
    try {
      setIsLoading(true);

      const businessData = {
        business: businessDescription,
        target_list: targetCustomers,
        analysis_scope: selectedPurposes.analysisScope,
      };

      const response = await InterviewXCustomerValueAnalyzerPersonaRequest(
        businessData,
        isLoggedIn
      );
      console.log("response", response);

      if (
        !response?.response.customer_value_persona ||
        !Array.isArray(response.response.customer_value_persona) ||
        response.response.customer_value_persona.length === 0
      ) {
        setShowPopupError(true);
        return;
      }

      const responseToolId = await createToolOnServer(
        {
          type: "ix_customer_value_persona",
          completed_step: 1,
          customer_value_persona: response.response.customer_value_persona,
          ...businessData,
        },
        isLoggedIn
      );
      setToolId(responseToolId);
      setToolStep(1);

      // API 응답에서 페르소나 데이터를 추출하여 atom에 저장
      setCustomerValueAnalyzerPersona(
        response.response.customer_value_persona || []
      );

      setCustomerValueAnalyzerInfo(businessData);
      console.log("customerValueAnalyzerInfo", customerValueAnalyzerInfo);

      // API 호출 성공시 다음 단계로 이동
      handleNextStep(1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting business info:", error);
      setShowPopupError(true);
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowPopupError(true);
            break;
          case 504:
            setShowPopupError(true);
            break;
          default:
            setShowPopupError(true);
            break;
        }
      } else {
        setShowPopupError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTargetDiscoveryClick = (business) => {
    setBusinessDescription(business);
  };

  const calculateDropDirection = (ref, selectBoxId) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200;

      setDropUpStates(prev => ({
        ...prev,
        [selectBoxId]: spaceBelow < dropDownHeight && spaceAbove > spaceBelow
      }));
    }
  };

  const handleSelectBoxClick = (selectBoxId, ref) => {
    calculateDropDirection(ref, selectBoxId);
    setSelectBoxStates(prev => ({
      ...prev,
      [selectBoxId]: !prev[selectBoxId]
    }));
  };

  const handlePurposeSelect = (purpose, selectBoxId) => {
    setSelectedPurposes(prev => ({
      ...prev,
      [selectBoxId]: purpose
    }));
    handleContactInputChange("purpose", purpose);
    setSelectBoxStates(prev => ({
      ...prev,
      [selectBoxId]: false
    }));

    if (selectBoxId === "customerList") {
      setBusinessDescription(purpose);
    }
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

  const handleCheckboxChange = (index) => {
    setSelectedPersonas(prev => {
      if (prev.includes(index)) {
        return prev.filter(id => id !== index);
      } else {
        if (prev.length >= 5) return prev;
        return [...prev, index];
      }
    });
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  // 필수 필드가 모두 입력되었는지 확인하는 함수
  const isRequiredFieldsFilled = () => {
    return (
      businessDescription.trim() !== "" && 
      targetCustomers.some(customer => customer.trim() !== "") && // 최소 1개 이상의 고객 정보가 입력되었는지 확인
      selectedPurposes.analysisScope !== ""
    );
  };

  // 비즈니스 설명 입력 핸들러
  const handleBusinessDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= 150) {
      setBusinessDescription(input);
    }
  };

  // 각 입력 필드의 변경을 처리하는 함수
  const handleTargetCustomerChange = (index, value) => {
    setTargetCustomers(prev => {
      const newTargetCustomers = [...prev];
      newTargetCustomers[index] = value;
      return newTargetCustomers;
    });
  };

  const handleSubmitPersonas = async () => {
    handleNextStep(2);
    try {
      const selectedPersonaData = selectedPersonas.map(index => ({
        content: customerValueAnalyzerPersona[index],
        target: customerValueAnalyzerInfo.target_list[index],
        journeyMap: customerValueAnalyzerJourneyMap[index]
      }));
      setCustomerValueAnalyzerSelectedPersona(selectedPersonaData);

      // 초기 상태를 'waiting'으로 설정
      const initialLoadingStates = selectedPersonaData.reduce((acc, _, index) => {
        acc[index] = 'waiting';
        return acc;
      }, {});
      setCardStatuses(initialLoadingStates);

      const results = [];
      for (let i = 0; i < selectedPersonaData.length; i++) {
        setCardStatuses(prev => ({
          ...prev,
          [i]: 'loading'
        }));

        const persona = selectedPersonaData[i];
        const requestData = {
          business: customerValueAnalyzerInfo.business,
          target: persona.target,
          analysis_scope: customerValueAnalyzerInfo.analysis_scope,
          customer_value_journey_map: persona.journeyMap
        };

        const response = await InterviewXCustomerValueAnalyzerFactorRequest(requestData, isLoggedIn);
        console.log("response", response);
        
        if (response?.response?.customer_value_factor) {
          results.push(response.response.customer_value_factor);
        }
        
        setCardStatuses(prev => ({
          ...prev,
          [i]: 'completed'
        }));

        await updateToolOnServer(
          toolId,
          {
            completed_step: 3,
            customer_value_factor: results,
          },
          isLoggedIn
        );
      }
      setToolStep(3);

      setCustomerValueAnalyzerFactor(results);
      
    } catch (error) {
      console.error('Error submitting personas:', error);
      setShowPopupError(true);
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowPopupError(true);
            break;
          case 504:
            setShowPopupError(true);
            break;
          default:
            setShowPopupError(true);
            break;
        }
      } else {
        setShowPopupError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };



  const handleReport = async () => {
    try {
      setIsLoading(true);
      handleNextStep(3);

      const clusteringData = {
        customer_value_factor_data: customerValueAnalyzerFactor,
      };

      // 클러스터링 요청
      const clusteringResponse = await InterviewXCustomerValueAnalyzerClusteringRequest(clusteringData, isLoggedIn);
      console.log("Clustering response:", clusteringResponse);

      if (!clusteringResponse || !clusteringResponse.response || !clusteringResponse.response.customer_value_clustering) {
        console.error("Invalid clustering response");
        return; 
      }
      setCustomerValueAnalyzerClustering(clusteringResponse.response.customer_value_clustering);

      const positioningData = {
        customer_value_factor_data: customerValueAnalyzerFactor,
        customer_value_clustering: clusteringResponse.response.customer_value_clustering,
      };

      // 포지셔닝 요청
      const positioningResponse = await InterviewXCustomerValueAnalyzerPositioningRequest(positioningData, isLoggedIn);
      console.log("Positioning response:", positioningResponse);
    
      if (!positioningResponse || !positioningResponse.response || !positioningResponse.response.customer_value_positioning) {
        console.error("Invalid positioning response");
        return; 
    }
      setCustomerValueAnalyzerPositioning(positioningResponse.response.customer_value_positioning);

      const finalReportData = {
        business: customerValueAnalyzerInfo.business,
        customer_value_factor_data: customerValueAnalyzerFactor,
        customer_value_clustering:clusteringResponse.response.customer_value_clustering,
        customer_value_positioning: positioningResponse.response.customer_value_positioning,
      };

      // 최종 리포트 요청
      const finalReportResponse = await InterviewXCustomerValueAnalyzerFinalReportRequest(finalReportData, isLoggedIn);
      console.log("Final report response:", finalReportResponse);

      if (!finalReportResponse || !finalReportResponse.response || !finalReportResponse.response.customer_value_final_report) {
        console.error("Invalid final report response");
        return; 
      }

      setCustomerValueAnalyzerFinalReport(finalReportResponse.response.customer_value_final_report);
      console.log("customerValueAnalyzerFinalReport", customerValueAnalyzerFinalReport);  


      await updateToolOnServer(
        toolId,
        {
          completed_step: 4,
          customer_value_clustering: clusteringResponse.response.customer_value_clustering,
          customer_value_positioning: positioningResponse.response.customer_value_positioning,
          customer_value_final_report: finalReportResponse.response.customer_value_final_report,
        },
        isLoggedIn
      );


    } catch (error) {
      console.error("Error in handleReport:", error);
      setShowPopupError(true);
      if (error.response) {
        switch (error.response.status) {
          case 500:
            setShowPopupError(true);
            break;
          case 504:
            setShowPopupError(true);
            break;
          default:
            setShowPopupError(true);
            break;
        }
      } else {
        setShowPopupError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const MermaidDiagram = ({ code }) => {
    const diagramRef = useRef(null);

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js";
      script.async = true;

      script.onload = () => {
        try {
          window.mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
            logLevel: 'error',
            themeVariables: {
              background: '#ffffff',
              primaryColor: '#D6EBFF',
              secondaryColor: '#D7DBFE',
              tertiaryColor: '#E8E4FF',
              journeyHoverColor: '#226FFF20'
            }
          });

          // Render the diagram using the provided code
          window.mermaid.render('mermaid-diagram', code, (svgCode) => {
            if (diagramRef.current) {
              diagramRef.current.innerHTML = svgCode;
            }
          });
        } catch (error) {
          console.error("Mermaid rendering error:", error);
        }
      };

      document.body.appendChild(script);
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }, [code]);

    return <div ref={diagramRef} className="mermaid" />;
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <ValueAnalyzerWrap>
            <TabWrapType5>
              <TabButtonType5 
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray800" : "gray300"}>고객 정보 입력</Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5 
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={!completedSteps.includes(1)}
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>고객 여정 맵 분석</Body1>
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>Customer Journey</Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5 
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={!completedSteps.includes(2)}
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>구매 결정 요인 분석</Body1>
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>Key Buying Factor</Body1>
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
                {isLoading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="잠재 고객을 분석하고 있어요" />
                  </div>
                ) : (
                <>
                <div className="title">
                  <H3 color="gray800">Define Your Key Customer</H3>
                  <Body3 color="gray800">고객 여정 분석을 원하는 주요 고객군을 입력하세요</Body3>
                </div>

                <div className="content">
                  <TabContent5Item>
                    <div className="title">
                      <Body1 color="gray700">고객 리스트 불러오기</Body1>
                    </div>
                    
                    <SelectBox ref={customerListRef}>
                      <SelectBoxTitle onClick={() => handleSelectBoxClick('customerList', customerListRef)}>
                        <Body2 color={selectedPurposes.customerList ? "gray800" : "gray300"}>
                          {selectedPurposes.customerList || 
                            "타겟 디스커버리를 진행이 완료된 경우, 정보를 가져올 수 있습니다."}
                        </Body2>
                        <images.ChevronDown
                          width="24px"
                          height="24px"
                          color={palette.gray500}
                          style={{
                            transform: selectBoxStates.customerList ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </SelectBoxTitle>

                      {selectBoxStates.customerList && (
                        <SelectBoxList dropUp={dropUpStates.customerList}>
                          {targetDiscoveryList.length === 0 ? (
                            <SelectBoxItem
                              disabled={toolStep >= 1}
                              onClick={() => handlePurposeSelect("진행된 프로젝트가 없습니다. 타겟 디스커버리를 먼저 진행해주세요", 'customerList')}
                            >
                              <Body2 color="gray700" align="left">
                                진행된 프로젝트가 없습니다. 타겟 디스커버리를 먼저 진행해주세요
                              </Body2>
                            </SelectBoxItem>
                          ) : (
                            targetDiscoveryList.map((item, index) => (
                              <SelectBoxItem
                                disabled={toolStep >= 1}
                                key={index}
                                onClick={() => {
                                  handlePurposeSelect(item.business, 'customerList');
                                  setTargetCustomers(item.target_discovery_scenario.map(persona => persona.title));
                                }}
                              >
                                <Body2 color="gray700" align="left">
                                  {item.business}
                                </Body2>
                              </SelectBoxItem>
                            ))
                          )}
                        </SelectBoxList>
                      )}
                    </SelectBox>

                    <Sub3 color="gray700">💡 타겟 디스커버리를 진행하신 경우, 더 디테일한 분석이 가능합니다</Sub3>
                  </TabContent5Item>

                  <TabContent5Item required>
                    <div className="title">
                      <Body1 color="gray700">비즈니스 설명</Body1>
                      <Body1 color="red">*</Body1>
                    </div>
                    <FormBox Large>
                      <CustomTextarea 
                        disabled={toolStep >= 1}
                        Edit 
                        rows={4} 
                        placeholder="비즈니스에 대해서 설명해주세요 (예: 친환경 전기 자전거 공유 플랫폼 등)" 
                        onChange={handleBusinessDescriptionChange}
                        value={businessDescription}
                        maxLength={150}
                        status="valid" 
                      />
                      <Body2 color="gray300" align="right">
                        {businessDescription.length} / 150
                      </Body2>
                    </FormBox>
                  </TabContent5Item>

                  <TabContent5Item required>
                    <div className="title">
                      <Body1 color="gray700">고객 여정 분석을 원하는 고객 정보 (최대 5명 입력)</Body1>
                      <Body1 color="red">*</Body1>
                    </div>
                    {targetCustomers.map((customer, index) => (
                      <CustomInput
                        disabled={toolStep >= 1}
                        key={index}
                        type="text"
                        placeholder="핵심 타겟 고객 군을 작성해주세요 (예: 20대 여성 등)"
                        value={customer}
                        onChange={(e) => handleTargetCustomerChange(index, e.target.value)}
                      />
                    ))}
                    <Button 
                      DbExLarge 
                      More 
                      onClick={() => {
                        if (targetCustomers.length < 5) {
                          setTargetCustomers(prev => [...prev, '']);
                        }
                      }}
                      disabled={targetCustomers.length >= 5 || toolStep >= 1}
                    >
                      <Body2 color="gray300">+ 추가하기</Body2>
                    </Button>
                  </TabContent5Item>

                  <TabContent5Item required>
                    <div className="title">
                      <Body1 color="gray700">고객 여정 맵 분석 범위</Body1>
                      <Body1 color="red">*</Body1>
                    </div>
                    
                    <SelectBox ref={analysisScopeRef}>
                      <SelectBoxTitle 
                        disabled={toolStep >= 1}
                        onClick={() => handleSelectBoxClick('analysisScope', analysisScopeRef)}
                      >
                        <Body2 color={selectedPurposes.analysisScope ? "gray800" : "gray300"}>
                          {selectedPurposes.analysisScope || 
                            "고객 여정 맵의 분석 방향성을 선택하세요"}
                        </Body2>
                        <images.ChevronDown
                          width="24px"
                          height="24px"
                          color={palette.gray500}
                          style={{
                            transform: selectBoxStates.analysisScope ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </SelectBoxTitle>

                      {selectBoxStates.analysisScope && (
                        <SelectBoxList dropUp={dropUpStates.analysisScope}>
                          <SelectBoxItem
                            disabled={toolStep >= 1}
                            onClick={() => handlePurposeSelect("시간 흐름 기반 여정 분석 | 제품/서비스의 전체적인 사용자 여정을 기반으로 분석", 'analysisScope')}
                          >
                            <Body1 color="gray700" align="left" style={{display: "flex", alignItems: "center"}}>
                              시간 흐름 기반 여정 분석
                              <Body2 color="gray700">　|　제품/서비스의 전체적인 사용자 여정을 기반으로 분석</Body2>
                            </Body1>
                          </SelectBoxItem>
                          <SelectBoxItem
                            disabled={toolStep >= 1}
                            onClick={() =>
                              handlePurposeSelect("상황 중심 여정 분석 | 특정 이벤트나 고객 경험을 중심으로 여정 분석", 'analysisScope')
                            }
                          >
                            <Body1 color="gray700" align="left" style={{display: "flex", alignItems: "center"}}>
                              상황 중심 여정 분석
                              <Body2 color="gray700">　|　특정 이벤트나 고객 경험을 중심으로 여정 분석</Body2>
                            </Body1>
                          </SelectBoxItem>
                          <SelectBoxItem
                            disabled={toolStep >= 1}
                            onClick={() =>
                              handlePurposeSelect("목적 기반 여정 분석 | 고객이 제품/서비스를 사용하여 달성하려는 목표를 중심으로 여정 분석", 'analysisScope')
                            }
                          >
                            <Body1 color="gray700" align="left" style={{display: "flex", alignItems: "center"}}>
                              목적 기반 여정 분석
                              <Body2 color="gray700">　|　고객이 제품/서비스를 사용하여 달성하려는 목표를 중심으로 여정 분석</Body2>
                            </Body1>
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
                  onClick={() => handleSubmitBusinessInfo()}
                  disabled={!isRequiredFieldsFilled() || toolStep >= 1}
                >
                    다음
                </Button>
                </>
                )}
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Customer Journey Map</H3>
                  <Body3 color="gray800">고객 여정 맵 분석을 통해 비즈니스와 연결되는 핵심 터치포인트를 도출합니다</Body3>
                </div>

                <div className="content">
                  <CardGroupWrap>
                  
                    {customerValueAnalyzerPersona.map((content, index) => {
                      console.log('Persona Data:', {
                        content,
                        targetCustomer: customerValueAnalyzerInfo.target_list[index],
                      });
                      
                      return (
                        <MoleculeCustomerValueCard
                          key={index}
                          id={index}
                          title={customerValueAnalyzerInfo.target_list[index]}
                          content={content}
                          status={cardStatuses[index]}
                          isSelected={selectedPersonas.includes(index)}
                          onSelect={(id) => handleCheckboxChange(id)}
                          journeyMapData={customerValueAnalyzerJourneyMap[index]}
                        />
                      );
                    })}
                  </CardGroupWrap>
                  <BottomBar W100>
                    <Body2
                      color={selectedPersonas.length === 0 ? "gray300" : "gray800"}
                    >
                      구매 결정 요인 분석을 원하는 페르소나를 선택해주세요 ({selectedPersonas.length}/5)
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={selectedPersonas.length === 0 || Object.values(cardStatuses).some(status => status === 'loading' || status === 'waiting')}
                      // onClick={() => handleNextStep(2)}
                      onClick={() =>  handleSubmitPersonas()}
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
                  <H3 color="gray800">Key Buying Factor</H3>
                  <Body3 color="gray800">각 페르소나 별로 어떤 구매 핵심 요소가 도출되었을까요? 우리는 어떤 요소에 집중하면 좋을까요?</Body3>
                </div>

                <div className="content">
                  <CardGroupWrap>
                    {customerValueAnalyzerSelectedPersona.map((persona, index) => (
                      <MoleculeCustomerValueCard
                        key={index}
                        id={index}
                        title={persona.target}
                        content={persona.content}
                        status={cardStatuses[index]}
                        // isSelected={true}
                        // onSelect={(id) => handleCheckboxChange(id)}
                        factor={customerValueAnalyzerFactor[index]}
                        journeyMapData={persona.journeyMap}
                        showOnlySelected={true}
                        hideCheckCircle={true}
                        activeTab={3}
                      />
                    ))}
                  </CardGroupWrap>

                  <BottomBar W100>
                    <Body2 color="gray800">
                      {selectedPersonas.length}명의 페르소나에 대한 잠재고객 가능성을 분석해드릴게요
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      // onClick={() => handleNextStep(3)}
                      onClick={ handleReport}
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
                {isLoading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="결과보고서를 작성하고 있습니다" />
                  </div>
                ) : (
                  <>
                    <BgBoxItem primaryLightest>
                      <H3 color="gray800">타겟디스커버리 인사이트 분석</H3>
                      <Body3 color="gray800">잠재 고객과 시나리오 분석을 통해 새로운 전략적 방향을 탐색해보세요</Body3>
                    </BgBoxItem>

                    <InsightAnalysis>
                      <div className="title">
                        <div>
                          <TabWrapType4>
                            <TabButtonType4>종합 분석 결과</TabButtonType4>
                            <TabButtonType4>클러스터링 항목 상세 보기</TabButtonType4>
                          </TabWrapType4>
                        </div>
                        <Button Primary onClick={() => setShowPopupSave(true)}>리포트 저장하기</Button>
                      </div>

                      <div className="content">
                        <H4 color="gray800">
                          {`페르소나별 고객 여정 분석 결과, ${customerValueAnalyzerInfo.business}의 핵심 구매 요소는`}
                          <br />
                          {customerValueAnalyzerFinalReport.title.join(", ")}으로 분석됩니다.
                        </H4>

                        <Body3 color="gray700">{customerValueAnalyzerFinalReport.content_1}</Body3>

                        <Body3 color="gray700">{customerValueAnalyzerFinalReport.content_2}</Body3>
                      </div>
                    </InsightAnalysis>

                    <ValueMapWrap>
                      <div>
                        <H4 color="gray800" align="left" style={{marginBottom: "12px"}}>고객 경험 & 핵심 가치 맵</H4>
                        <BoxWrap Column>
                          <Body3 color="gray700">가로축 (X축) - 영향력 : 많은 사람들이 중요하게 여기는 구매 결정 요인의 영향 정도</Body3>
                          <Body3 color="gray700">세로축 (Y축) - 불만족도 : 사람들이 해당 구매 요인에 대해 불만족을 느끼는 정도 </Body3>
                        </BoxWrap>
                      </div>

                      <ValueMap>
                        <div className="title">
                          <div>
                            <span className="must-fix" />
                            <Caption2 color="gray700">Must Fix : 최우선 해결 요소</Caption2>
                          </div>
                          <div>
                            <span className="niche-pain" />
                            <Caption2 color="gray700">Niche Pain : 니치 불편 요소</Caption2>
                          </div>
                          <div>
                            <span className="key-strengths" />
                            <Caption2 color="gray700">Key Strengths : 차별화 요소</Caption2>
                          </div>
                          <div>
                            <span className="low-impact" />
                            <Caption2 color="gray700">Low Impact : 저관여 요소</Caption2>
                          </div>
                        </div>

                        <div className="content">
                          <div className="mermaid">
                          <MermaidDiagram code={customerValueAnalyzerPositioning?.mermaid} />
                          </div>
                        </div>
                      </ValueMap>
                    </ValueMapWrap>

                    <Button Small Primary onClick={() => setShowPopupSave(true)}>리포트 저장하기</Button>
                  </>
                )}
              </TabContent5>
            )}
          </ValueAnalyzerWrap>
        </MainContent>
      </ContentsWrap>

      {showPopupMore && (
        <PopupWrap
          Wide1000
          title={
            <>
              <H4 color="gray800" align="left">
                (Persona name)의 (Business)<br />고객 여정 분석
              </H4>
            </>
          }
          buttonType="Fill"
          isModal={true}
          showTabs={true}
          activeTab={activeTabIndex}
          onTabChange={(index) => setActiveTabIndex(index)}
          eventState={false}
          creditRequestCustomPersona={1}
          customAlertBox={
            <TextWrap>
              <Body2 color="gray800" align="left">
                이 비즈니스 아이템은 참신하고 현재의 시장 동향과 맞아떨어집니다. 특히 비대면 교육과 시니어 맞춤형 디지털 플랫폼의 필요성이 증가하는 상황에서 유망한 성장 기회를 가집니다. 다만, 참신함이 곧 블루 오션을 의미하지 않으므로, 진입 전략은 사용자 친화적 디자인, 가족의 참여를 유도하는 마케팅, 맞춤형 프로그램으로 보강해야 합니다.
              </Body2>
            </TextWrap>
          }
          body={
            <>
              <ListGroup>
                <div>
                  <Body1 color="gray800" align="left">뛰어난 지속력</Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무 효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의 프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.  
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">뛰어난 지속력</Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무 효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의 프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.  
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">뛰어난 지속력</Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무 효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의 프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.  
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">뛰어난 지속력</Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무 효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의 프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.  
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">뛰어난 지속력</Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무 효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의 프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.  
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">뛰어난 지속력</Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무 효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의 프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.  
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">뛰어난 지속력</Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무 효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의 프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.  
                  </Sub3>
                </div>
                <div>
                  <Body1 color="gray800" align="left">뛰어난 지속력</Body1>
                  <Sub3 color="gray800" align="left">
                    시간에 민감한 페르소나에게 수정 화장은 시간 낭비이자 업무 효율 저하의 원인입니다. 하루 종일 지속되는 메이크업은 그녕의 프로페셔널한 이미지 유지와 업무 집중도 향상에 직결됩니다.  
                  </Sub3>
                </div>
              </ListGroup>
            </>
          }
        />
      )}

      {showPopupError && (
        <PopupWrap
          Warning
          title="다시 입력해 주세요."
          message="현재 입력하신 정보는 목적을 생성할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => handleNextStep(1)}
        />
      )}

      {showPopupSave && (
        <PopupWrap
          Check
          title="리포트가 저장되었습니다."
          message="저장된 리포트는 '보관함'을 확인해주세요"
          buttonType="Outline"
          closeText="보관함 바로가기"
          confirmText="리포트 계속 확인"
          isModal={false}
          onCancel={() => setShowPopupSave(false)}
          onConfirm={() => setShowPopupSave(false)}
        />
      )}
    </>
  );
};

export default PageCustomerValueAnalyzer;

const ValueAnalyzerWrap = styled.div`
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
  gap: 40px;
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
    gap: 20px;
    text-align: left;
  }
`;

const ValueMapWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  margin: 40px 0;
`;

const ValueMap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;


  .mermaid {
  width: 100%;
  height: auto;
  overflow: visible;
}

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    span {
      width: 16px;
      height: 16px;
      border-radius: 50%;

      &.must-fix {
        background-color: #D3E2FF;
      }

      &.niche-pain {
        background-color: #E0E4EB;
      }

      &.key-strengths {
        background-color: #E9F1FF;
      }

      &.low-impact {
        background-color: ${palette.gray100};
      }
    }
  }
`;
