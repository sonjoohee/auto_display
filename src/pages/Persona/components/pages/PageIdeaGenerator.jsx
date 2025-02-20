//아이디어 제너레이터
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
import MoleculeHeader from "../molecules/MoleculeHeader";
import MoleculeIdeaGeneratorCard from "../molecules/MoleculeIdeaGeneratorCard";
import MoleculeIdeaGeneratorCard2 from "../molecules/MoleculeIdeaGeneratorCard2";
import AtomPersonaLoader from "../atoms/AtomPersonaLoader";
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
  RadioButton,
} from "../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  Badge,
  TabWrapType4,
  TabButtonType4,
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
  ListBoxItem,
  TextWrap,
  ListBox,
  Table,
  TableHeader,
  TableBody,
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
  Caption1,
  Caption2,
} from "../../../../assets/styles/Typography";
import ZoomableSunburst from "../../../../components/Charts/ZoomableSunburst";

import {
  IDEA_GENERATOR_INFO,
  IDEA_GENERATOR_KNOW_TARGET,
  IDEA_GENERATOR_CUSTOM_TARGET,
  IDEA_GENERATOR_PERSONA,
  IDEA_GENERATOR_IDEA,
  IDEA_GENERATOR_CLUSTERING,
  IDEA_GENERATOR_FINAL_REPORT,
  TOOL_LOADING,
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  IDEA_GENERATOR_SELECTED_PERSONA,
} from "../../../../pages/AtomStates";

import {
  createToolOnServer,
  updateToolOnServer,
  getToolOnServer,
  getToolListOnServer,
  InterviewXIdeaGeneratorPersonaRequest,
  InterviewXIdeaGeneratorIdeaRequest,
  InterviewXIdeaGeneratorClusteringRequest,
  InterviewXIdeaGeneratorFinalReportRequest,
} from "../../../../utils/indexedDB";

const PageIdeaGenerator = () => {
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [seletedIdeaIndex, setSeletedIdeaIndex] = useState(null);
  const [cardStatuses, setCardStatuses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFinalReport, setIsLoadingFinalReport] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMore, setShowPopupMore] = useState(false);
  const [showPopupSave, setShowPopupSave] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState({
    customerList: "",
    analysisScope: "",
  });
  const [selectedInterviewType, setSelectedInterviewType] = useState(null);
  const [selectedInterviewPurpose, setSelectedInterviewPurpose] =
    useState(null);
  const [activeTab1, setActiveTab1] = useState("personaInfo");
  const [contactForm, setContactForm] = useState({
    email: "",
    purpose: "",
    content: "",
  });
  const [dropUp, setDropUp] = useState(false);
  const selectBoxRef = useRef(null);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [targetCustomers, setTargetCustomers] = useState([""]);
  const [personaData, setPersonaData] = useState({
    personaInfo: "",
    personaScenario: "",
  });

  const [selectBoxStates, setSelectBoxStates] = useState({
    customerList: false,
    analysisScope: false,
  });

  const [dropUpStates, setDropUpStates] = useState({
    customerList: false,
    analysisScope: false,
  });

  const customerListRef = useRef(null);
  const analysisScopeRef = useRef(null);

  const [customerValueList, setCustomerValueList] = useState([]);

  const [ideaGeneratorInfo, setIdeaGeneratorInfo] =
    useAtom(IDEA_GENERATOR_INFO);
  const [ideaGeneratorKnowTarget, setIdeaGeneratorKnowTarget] = useAtom(
    IDEA_GENERATOR_KNOW_TARGET
  );
  const [ideaGeneratorCustomTarget, setIdeaGeneratorCustomTarget] = useAtom(
    IDEA_GENERATOR_CUSTOM_TARGET
  );
  const [ideaGeneratorPersona, setIdeaGeneratorPersona] = useAtom(
    IDEA_GENERATOR_PERSONA
  );
  const [ideaGeneratorSelectedPersona, setIdeaGeneratorSelectedPersona] =
    useAtom(IDEA_GENERATOR_SELECTED_PERSONA);
  const [ideaGeneratorIdea, setIdeaGeneratorIdea] =
    useAtom(IDEA_GENERATOR_IDEA);
  const [ideaGeneratorClustering, setIdeaGeneratorClustering] = useAtom(
    IDEA_GENERATOR_CLUSTERING
  );
  const [ideaGeneratorFinalReport, setIdeaGeneratorFinalReport] = useAtom(
    IDEA_GENERATOR_FINAL_REPORT
  );
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [toolStep, setToolStep] = useAtom(TOOL_STEP);

  const [selectedPersona, setSelectedPersona] = useState(null); // 아직 잘 모르겠습니다
  const [selectedCustomPersona, setSelectedCustomPersona] = useState(null); // 제가 원하는 타겟 고객이 있습니다

  const [selectedDetailPersona, setSelectedDetailPersona] = useState(null);

  // 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   setBusinessDescription(ideaGeneratorInfo.business);
  //   setTargetCustomers(ideaGeneratorInfo.core_value);
  //   if (toolStep === 1) {
  //     setToolStep(0);
  //   } else if (toolStep === 2) {
  //     setCompletedSteps([1]);
  //     setActiveTab(2);
  //     setToolStep(1);
  //   }
  //   console.log("ideaGeneratorKnowTarget", ideaGeneratorKnowTarget);
  //   if (ideaGeneratorKnowTarget) {
  //     setSelectedCustomPersona(ideaGeneratorPersona)
  //     setSelectedInterviewType("yesTarget");

  //   } else {
  //     setSelectedInterviewType("noTarget");
  //   }
  // }, []);

  //저장되었던 인터뷰 로드
  useEffect(() => {
    const interviewLoading = async () => {
      if (toolLoading) {
        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 4));

        // setIdeaGeneratorInfo({
        //   business: chatData.business,
        //   core_value: chatData.core_value,
        // });

        // setIdeaGeneratorPersona(chatData.idea_generator_persona || []);
        // setIdeaGeneratorIdea(chatData.idea_generator_idea || []);
        // setIdeaGeneratorClustering(chatData.idea_generator_clustering || []);
        // setIdeaGeneratorFinalReport(chatData.idea_generator_final_report || {});
        // setIdeaGeneratorSelectedPersona(
        //   chatData.idea_generator_selected_persona || []
        // );
        // setIdeaGeneratorKnowTarget(
        //   chatData.idea_generator_know_target || false
        // );

        // 비즈니스 정보 설정 (Step 1)
        if (ideaGeneratorInfo) {
          setBusinessDescription(ideaGeneratorInfo?.business ?? "");
          setTargetCustomers(ideaGeneratorInfo?.core_value ?? []);
        }

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);
        setSelectedInterviewType(
          ideaGeneratorKnowTarget ? "yesTarget" : "noTarget"
        );

        // 페르소나 설정 (Step 2)
        if (ideaGeneratorSelectedPersona) {
          // ideaGeneratorSelectedPersona가 있는 경우에만 처리
          const selectedIndices = (ideaGeneratorPersona ?? [])
            .map((persona, index) =>
              persona?.title === ideaGeneratorSelectedPersona.title ? index : -1
            )
            .filter((index) => index !== -1);

          // selectedPersonas 상태 업데이트
          setSelectedPersona(selectedIndices[0]); // 첫 번째 매칭되는 인덱스만 사용
        }

        setTableData(
          ideaGeneratorFinalReport.clusters.map((cluster, index) => ({
            key: index + 1,
            title: cluster.cluster_name,
            marketSize: cluster.market_competitiveness.score,
            productConcept: cluster.attractiveness.score,
            implementability: cluster.feasibility.score,
            uniqueness: cluster.differentiation.score,
            average: cluster.total_score / 4,
          }))
        );
        // 페르소나 설정 (Step 2)
        // if (
        //   Array.isArray(targetDiscoveryPersona) &&
        //   Array.isArray(selectedTargetDiscoveryPersona)
        // ) {
        //   // 이미 선택된 페르소나들의 인덱스 찾기
        //   const selectedIndices = (targetDiscoveryPersona ?? [])
        //     .map((persona, index) => {
        //       // targetDiscoveryScenario에 있는 페르소나만 선택
        //       return (targetDiscoveryScenario ?? []).some(
        //         (scenario) => scenario?.title === persona?.title
        //       )
        //         ? index
        //         : -1;
        //     })
        //     .filter((index) => index !== -1);

        //   // selectedPersonas 상태 업데이트
        //   setSelectedPersonas(selectedIndices);

        //   // 선택된 페르소나 데이터 설정
        //   const selectedPersonaData = selectedIndices
        //     .map((index) => targetDiscoveryPersona?.[index])
        //     .filter(Boolean);

        //   setSelectedTargetDiscoveryPersona(selectedPersonaData);
        // }

        // 시나리오 설정 (Step 3)
        // if (
        //   Array.isArray(targetDiscoveryScenario) &&
        //   Array.isArray(targetDiscoveryPersona)
        // ) {
        //   const matchedScenarioData = (targetDiscoveryScenario ?? [])
        //     .map((scenario) => {
        //       const matchedPersona = (targetDiscoveryPersona ?? []).find(
        //         (persona) => persona?.title === scenario?.title
        //       );

        //       if (!matchedPersona) return null;

        //       return {
        //         ...(matchedPersona ?? {}),
        //         title: scenario?.title ?? "",
        //         content: matchedPersona?.content ?? {},
        //         keywords: matchedPersona?.content?.keywords ?? [],
        //         scenario: scenario ?? {},
        //       };
        //     })
        //     .filter((item) => item?.title);

        //   setSelectedTargetDiscoveryScenario(matchedScenarioData);
        // }

        return;
      }
    };
    interviewLoading();
    setToolLoading(false);
  }, [toolLoading]);

  // 고객핵심가치분석 리스트 가져오기
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
            console.error("Invalid response from server");
            break;
          }

          const newItems = response.data.filter(
            (item) =>
              item.type === "ix_customer_value_persona" &&
              item.completed_step === 4
          );

          allItems = [...allItems, ...newItems];

          // Check if we've reached the end of the data
          if (!response.count || response.count <= page * size) {
            break;
          }

          page++;
        }

        setCustomerValueList(allItems);
      } catch (error) {
        console.error("Error fetching target discovery list:", error);
        setCustomerValueList([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn]);

  const fetchIdeaGeneratorPersona = async () => {
    if (ideaGeneratorPersona.length) {
      return;
    }

    try {
      const businessData = {
        business: businessDescription,
        core_value: targetCustomers,
      };

      const response = await InterviewXIdeaGeneratorPersonaRequest(
        businessData,
        isLoggedIn
      );

      if (
        !response?.response.idea_generator_persona ||
        !Array.isArray(response.response.idea_generator_persona) ||
        response.response.idea_generator_persona.length === 0
      ) {
        setShowPopupError(true);
        return;
      }

      // API 응답에서 페르소나 데이터를 추출하여 atom에 저장
      setIdeaGeneratorPersona(response.response.idea_generator_persona || []);

      updateToolOnServer(
        toolId,
        {
          idea_generator_persona: response.response.idea_generator_persona,
        },
        isLoggedIn
      );

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

  const fetchIdeaGeneratorIdea = async () => {
    if (ideaGeneratorIdea.length) {
      return;
    }

    try {
      // 모든 카드의 상태를 waiting으로 초기화
      const initialLoadingStates = ideaGeneratorInfo.core_value.reduce(
        (acc, _, index) => {
          acc[index] = "waiting";
          return acc;
        },
        {}
      );
      setCardStatuses(initialLoadingStates);

      const results = [];

      // 순차적으로 API 호출
      for (
        let index = 0;
        index < ideaGeneratorInfo.core_value.length;
        index++
      ) {
        // 현재 카드 상태를 loading으로 변경
        setCardStatuses((prev) => ({
          ...prev,
          [index]: "loading",
        }));

        const data = {
          business: ideaGeneratorInfo.business,
          core_value: ideaGeneratorInfo.core_value[index],
          core_target:
            selectedInterviewType === "yesTarget"
              ? selectedCustomPersona
              : ideaGeneratorPersona[selectedPersona],
        };

        const response = await InterviewXIdeaGeneratorIdeaRequest(
          data,
          isLoggedIn
        );

        console.log("response", response);

        if (response?.response?.idea_generator_idea) {
          results.push(response.response.idea_generator_idea);
          setIdeaGeneratorIdea((prev) => [
            ...prev,
            response.response.idea_generator_idea,
          ]);

          // 성공적인 응답 후 카드 상태 업데이트
          setCardStatuses((prev) => ({
            ...prev,
            [index]: "completed",
          }));
        }
      }

      // 서버에 결과 저장
      await updateToolOnServer(
        toolId,
        {
          idea_generator_idea: results,
        },
        isLoggedIn
      );
    } catch (error) {
      console.error("Error generating ideas:", error);
    }
  };

  const fetchIdeaGeneratorFinalReport = async () => {
    setIsLoadingFinalReport(true);
    try {
      // 클러스터링
      const data1 = {
        business: businessDescription,
        core_value: targetCustomers,
        core_target: ideaGeneratorSelectedPersona,
        idea_generator_idea: ideaGeneratorIdea,
      };

      const response1 = await InterviewXIdeaGeneratorClusteringRequest(
        data1,
        isLoggedIn
      );
      const clusteringData = response1.response.idea_generator_clustering;

      if (
        !clusteringData ||
        !Array.isArray(clusteringData) ||
        clusteringData.length === 0
      ) {
        setShowPopupError(true);
        return;
      }

      setIdeaGeneratorClustering(clusteringData);

      // 결과 보고서
      const data2 = {
        business: businessDescription,
        core_value: targetCustomers,
        core_target: ideaGeneratorSelectedPersona,
        idea_generator_idea: ideaGeneratorIdea,
        idea_generator_clustering: clusteringData,
      };

      const response2 = await InterviewXIdeaGeneratorFinalReportRequest(
        data2,
        isLoggedIn
      );

      const finalReportData = response2.response.idea_generator_final_report;

      if (
        !finalReportData ||
        !finalReportData instanceof Object ||
        Object.keys(finalReportData).length === 0
      ) {
        setShowPopupError(true);
        return;
      }

      setIdeaGeneratorFinalReport(finalReportData);

      setToolStep(4);

      // 클러스터링과 결과 보고서 저장
      updateToolOnServer(
        toolId,
        {
          completed_step: 4,
          idea_generator_clustering: clusteringData,
          idea_generator_final_report: finalReportData,
        },
        isLoggedIn
      );

      // 테이블 데이터 설정
      setTableData(
        finalReportData.clusters.map((cluster, index) => ({
          key: index + 1,
          title: cluster.cluster_name,
          marketSize: cluster.market_competitiveness.score,
          productConcept: cluster.attractiveness.score,
          implementability: cluster.feasibility.score,
          uniqueness: cluster.differentiation.score,
          average: cluster.total_score / 4,
        }))
      );

      setIsLoadingFinalReport(false);
    } catch (error) {
      console.error("Error generating final report:", error);
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
      setIsLoadingFinalReport(false);
    }
  };

  const calculateDropDirection = (ref, selectBoxId) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropDownHeight = 200;

      setDropUpStates((prev) => ({
        ...prev,
        [selectBoxId]: spaceBelow < dropDownHeight && spaceAbove > spaceBelow,
      }));
    }
  };

  const handleSelectBoxClick = (selectBoxId, ref) => {
    calculateDropDirection(ref, selectBoxId);
    setSelectBoxStates((prev) => ({
      ...prev,
      [selectBoxId]: !prev[selectBoxId],
    }));
  };

  const handlePurposeSelect = (purpose, selectBoxId) => {
    setSelectedPurposes((prev) => ({
      ...prev,
      [selectBoxId]: purpose,
    }));
    handleContactInputChange("purpose", purpose);
    setSelectBoxStates((prev) => ({
      ...prev,
      [selectBoxId]: false,
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

  // handleCheckboxChange 함수 수정
  const handleCheckboxChange = (index) => {
    // 이미 선택된 항목을 다시 클릭하면 선택 해제
    if (selectedPersona === index) {
      setSelectedPersona(null);
    } else {
      // 다른 항목을 선택하면 해당 항목으로 변경
      setSelectedPersona(index);
    }
  };

  // 다음 단계로 이동하는 함수
  const handleNextStep = async (currentStep) => {
    if (currentStep === 1) {
      setIdeaGeneratorInfo({
        business: businessDescription,
        core_value: targetCustomers.filter((value) => value !== ""),
      });

      setToolStep(1);

      const responseToolId = await createToolOnServer(
        {
          type: "ix_idea_generator_persona",
          completed_step: 1,
          business: businessDescription,
          core_value: targetCustomers.filter((value) => value !== ""),
        },
        isLoggedIn
      );

      setToolId(responseToolId);
    } else if (currentStep === 2) {
      if (selectedPersona === null) {
        // 제가 원하는 타겟 고객이 있습니다
        setIdeaGeneratorPersona(selectedCustomPersona);
        setIdeaGeneratorSelectedPersona(selectedCustomPersona);

        updateToolOnServer(
          toolId,
          {
            idea_generator_selected_persona: selectedCustomPersona,
            idea_generator_persona: selectedCustomPersona,
          },
          isLoggedIn
        );
      } else {
        // 아직 잘 모르겠습니다
        setIdeaGeneratorSelectedPersona(ideaGeneratorPersona[selectedPersona]);

        updateToolOnServer(
          toolId,
          {
            idea_generator_selected_persona:
              ideaGeneratorPersona[selectedPersona],
          },
          isLoggedIn
        );
      }

      setToolStep(2);
      setIdeaGeneratorKnowTarget(selectedInterviewType);
      updateToolOnServer(
        toolId,
        {
          completed_step: 2,
          idea_generator_Know_Target:
            selectedInterviewType === "yesTarget" ? true : false,
        },
        isLoggedIn
      );
      fetchIdeaGeneratorIdea();
    } else if (currentStep === 3) {
      setToolStep(3);
      updateToolOnServer(
        toolId,
        {
          completed_step: 3,
        },
        isLoggedIn
      );
      fetchIdeaGeneratorFinalReport();
    }

    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
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
    setTargetCustomers((prev) => {
      const newTargetCustomers = [...prev];
      newTargetCustomers[index] = value;
      return newTargetCustomers;
    });
  };

  const handleInterviewTypeSelect = (type) => {
    if (ideaGeneratorPersona.length === 0) {
      setIsLoading(true);
    }
    setSelectedInterviewType(type);
    setSelectedCustomPersona(null);
    setSelectedPersona(null);

    if (type === "noTarget") {
      fetchIdeaGeneratorPersona();
    }
  };

  const [activeAnalysisTab, setActiveAnalysisTab] = useState("summary");

  // 팝업을 보여주는 함수
  const handleShowDetail = (persona) => {
    setSelectedDetailPersona(persona);
    setShowPopup(true);
  };

  const handleShowDetailMore = (index) => {
    console.log("🚀 ~ handleShowDetailMore ~ index:", index);

    console.log(
      "🚀 ~ handleShowDetailMore ~ ideaGeneratorIdea:",
      ideaGeneratorIdea[index]
    );
    setChartData({
      name: ideaGeneratorInfo.core_value[index],
      children: [
        {
          name: "경제적 가치",
          children: ideaGeneratorIdea[index].economic_value.ideas.map(
            (idea) => ({
              name: idea.name,
              value: 100,
            })
          ),
        },
        {
          name: "기능적 가치",
          children: ideaGeneratorIdea[index].functional_value.ideas.map(
            (idea) => ({
              name: idea.name,
              value: 100,
            })
          ),
        },
        {
          name: "환경적 가치",
          children: ideaGeneratorIdea[index].environmental_value.ideas.map(
            (idea) => ({
              name: idea.name,
              value: 100,
            })
          ),
        },
        {
          name: "교육적 가치",
          children: ideaGeneratorIdea[index].educational_value.ideas.map(
            (idea) => ({
              name: idea.name,
              value: 100,
            })
          ),
        },
        {
          name: "감정적 가치",
          children: ideaGeneratorIdea[index].emotional_value.ideas.map(
            (idea) => ({
              name: idea.name,
              value: 100,
            })
          ),
        },
        {
          name: "사회적 가치",
          children: (() => {
            const socialValueIdeas = ideaGeneratorIdea[index]?.social_value;

            if (Array.isArray(socialValueIdeas)) {
              // 첫 번째 요소가 배열인 경우
              return socialValueIdeas[0].ideas.map((idea) => ({
                name: idea.name,
                value: 100,
              }));
            } else {
              // 직접 배열인 경우
              return socialValueIdeas.ideas.map((idea) => ({
                name: idea.name,
                value: 100,
              }));
            }
          })(),
        },
      ],
    });
    setSeletedIdeaIndex(index);
    setShowPopupMore(true);
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <IdeaGeneratorWrap>
            <TabWrapType5>
              <TabButtonType5
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
              >
                <span>01</span>
                <div className="text">
                  <Body1 color={activeTab >= 1 ? "gray800" : "gray300"}>
                    비즈니스 입력
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={!completedSteps.includes(1)}
              >
                <span>02</span>
                <div className="text">
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    타겟 세그먼트
                  </Body1>
                  <Body1 color={activeTab >= 2 ? "gray800" : "gray300"}>
                    Customer Segment
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={!completedSteps.includes(2)}
              >
                <span>03</span>
                <div className="text">
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
                    아이디어 도출
                  </Body1>
                  <Body1 color={activeTab >= 3 ? "gray800" : "gray300"}>
                    Idea Generation
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 4}
                onClick={() => completedSteps.includes(3) && setActiveTab(4)}
                disabled={!completedSteps.includes(3)}
              >
                <span>04</span>
                <div className="text">
                  <Body1 color={activeTab >= 4 ? "gray800" : "gray300"}>
                    최종 인사이트 분석
                  </Body1>
                </div>
              </TabButtonType5>
            </TabWrapType5>

            {activeTab === 1 && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Define Business Key Value</H3>
                  <Body3 color="gray800">
                    다양한 아이디어를 발산하고자 하는 핵심 키워드를 입력하세요
                  </Body3>
                </div>

                <div className="content">
                  <TabContent5Item borderBottom>
                    <div className="title">
                      <Body1 color="gray700">비즈니스 핵심 가치 가져오기</Body1>
                    </div>

                    <SelectBox ref={customerListRef}>
                      <SelectBoxTitle
                        onClick={() =>
                          handleSelectBoxClick("customerList", customerListRef)
                        }
                      >
                        <Body2
                          color={
                            selectedPurposes.customerList
                              ? "gray800"
                              : "gray300"
                          }
                        >
                          {selectedPurposes.customerList ||
                            "고객 핵심 가치 분석을 진행을 완료하신 경우, 정보를 가져올 수 있습니다."}
                        </Body2>
                        <images.ChevronDown
                          width="24px"
                          height="24px"
                          color={palette.gray500}
                          style={{
                            transform: selectBoxStates.customerList
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </SelectBoxTitle>

                      {selectBoxStates.customerList && (
                        <SelectBoxList dropUp={dropUpStates.customerList}>
                          {customerValueList.length === 0 ? (
                            <SelectBoxItem
                              disabled={toolStep >= 1}
                              onClick={() =>
                                handlePurposeSelect(
                                  "진행된 프로젝트가 없습니다. 타겟 탐색기를 먼저 진행해주세요",
                                  "customerList"
                                )
                              }
                            >
                              <Body2 color="gray700" align="left">
                                진행된 프로젝트가 없습니다. 타겟 탐색기를 먼저
                                진행해주세요
                              </Body2>
                            </SelectBoxItem>
                          ) : (
                            customerValueList.map((item, index) => (
                              <SelectBoxItem
                                disabled={toolStep >= 1}
                                key={index}
                                onClick={() => {
                                  handlePurposeSelect(
                                    item.business,
                                    "customerList"
                                  );
                                  setTargetCustomers(
                                    item.customer_value_persona.map(
                                      (factor) => factor
                                    )
                                  );
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
                      <Body1 color="gray700">비즈니스 핵심 가치 작성</Body1>
                      <Body1 color="red">*</Body1>
                    </div>
                    {targetCustomers.map((customer, index) => (
                      <CustomInput
                        disabled={toolStep >= 1}
                        key={index}
                        type="text"
                        placeholder="핵심 가치를 작성해주세요 (예: 안전한 송금 등)"
                        value={customer}
                        onChange={(e) =>
                          handleTargetCustomerChange(index, e.target.value)
                        }
                      />
                    ))}
                    <Button
                      DbExLarge
                      More
                      onClick={() => {
                        if (targetCustomers.length < 10) {
                          setTargetCustomers((prev) => [...prev, ""]);
                        }
                      }}
                      disabled={targetCustomers.length >= 10 || toolStep >= 1}
                    >
                      <Body2 color="gray300">+ 추가하기</Body2>
                    </Button>
                  </TabContent5Item>
                </div>

                <Button
                  Other
                  Primary
                  Fill
                  Round
                  onClick={() => handleNextStep(1)}
                  disabled={
                    businessDescription.trim() === "" ||
                    targetCustomers.filter((customer) => customer.trim() !== "")
                      .length === 0 ||
                    toolStep >= 1
                  }
                >
                  다음
                </Button>
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
              <TabContent5>
                <div className="title">
                  <H3 color="gray800">Customer Segmentation</H3>
                  <Body3 color="gray800">
                    비즈니스에 적합한 타겟 고객을 중심으로 최적화된 아이디어
                    도출을 진행해보세요
                  </Body3>
                </div>

                <SegmentContent>
                  <div>
                    <Body2 color="gray800" align="left">
                      아이디어 도출하고 싶은 고객이 있으신가요?
                    </Body2>

                    <CardGroupWrap rowW50>
                      <ListBoxItem
                        active={selectedInterviewType === "yesTarget"}
                      >
                        <ListText>
                          <ListTitle>
                            <Body1
                              color={
                                selectedInterviewType === "yesTarget"
                                  ? "primary"
                                  : "gray800"
                              }
                            >
                              제가 원하는 타겟 고객이 있습니다.
                            </Body1>
                          </ListTitle>
                        </ListText>
                        <div>
                          <RadioButton
                            id="radio1"
                            name="radioGroup1"
                            checked={selectedInterviewType === "yesTarget"}
                            disabled={toolStep >= 2}
                            onChange={() =>
                              handleInterviewTypeSelect("yesTarget")
                            }
                          />
                        </div>
                      </ListBoxItem>

                      <ListBoxItem
                        active={selectedInterviewType === "noTarget"}
                      >
                        <ListText>
                          <ListTitle>
                            <Body1
                              color={
                                selectedInterviewType === "noTarget"
                                  ? "primary"
                                  : "gray800"
                              }
                            >
                              아직 잘 모르겠습니다. 타겟 고객을 알려주세요
                            </Body1>
                          </ListTitle>
                        </ListText>
                        <div>
                          <RadioButton
                            id="radio1"
                            name="radioGroup1"
                            checked={selectedInterviewType === "noTarget"}
                            disabled={toolStep >= 2}
                            onChange={() =>
                              handleInterviewTypeSelect("noTarget")
                            }
                          />
                        </div>
                      </ListBoxItem>
                    </CardGroupWrap>
                  </div>
                </SegmentContent>

                <div className="content">
                  {selectedInterviewType === "yesTarget" ? (
                    <>
                      <TabContent5Item style={{ marginBottom: "140px" }}>
                        <div className="title">
                          <Body1 color="gray700">
                            어떤 고객을 중심으로 아이디어를 도출하시겠습니까?
                          </Body1>
                        </div>

                        <FormBox Large>
                          <CustomTextarea
                            Edit
                            rows={4}
                            placeholder="한명만 작성 가능 (예시 : 작성필요)"
                            status="valid"
                            disabled={toolStep >= 2}
                            value={
                              ideaGeneratorSelectedPersona?.[0]?.name || ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelectedCustomPersona([
                                {
                                  name: value,
                                  description: "",
                                  keywords: [],
                                },
                              ]);
                            }}
                          />
                        </FormBox>
                      </TabContent5Item>
                    </>
                  ) : selectedInterviewType === "noTarget" ? (
                    <>
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
                        <CardGroupWrap column style={{ marginBottom: "140px" }}>
                          {ideaGeneratorPersona.map((persona, index) => (
                            <MoleculeIdeaGeneratorCard
                              key={index}
                              id={index}
                              persona={persona}
                              isSelected={selectedPersona === index}
                              disabled={toolStep >= 2 ? true : false}
                              onSelect={() => handleCheckboxChange(index)}
                              onShowDetail={() => handleShowDetail(persona)}
                            />
                          ))}
                        </CardGroupWrap>
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  <BottomBar W100>
                    <Body2 color="gray800">
                      시나리오 분석을 원하는 페르소나를 선택해주세요
                    </Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={
                        (selectedPersona === null &&
                          selectedCustomPersona === null) ||
                        toolStep >= 2
                      }
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
                  <H3 color="gray800">Idea Generation without Limits</H3>
                  <Body3 color="gray800">
                    비즈니스 핵심가치를 중심으로 체계화된 방법으로 수많은
                    아이디어를 도출해드려요
                  </Body3>
                </div>

                <div className="content">
                  <CardGroupWrap column style={{ marginBottom: "140px" }}>
                    {ideaGeneratorInfo.core_value.map((coreValue, index) => (
                      <MoleculeIdeaGeneratorCard2
                        key={index}
                        id={index}
                        coreValue={coreValue}
                        status={
                          ideaGeneratorIdea.length
                            ? "completed"
                            : cardStatuses[index]
                        }
                        onShowDetail={() => handleShowDetailMore(index)}
                      />
                    ))}
                  </CardGroupWrap>

                  <BottomBar W100>
                    <Body2 color="gray800">종합 분석 결과를 확인해보세요</Body2>
                    <Button
                      Large
                      Primary
                      Round
                      Fill
                      disabled={
                        toolStep >= 3 ||
                        ideaGeneratorIdea.length <
                          ideaGeneratorInfo.core_value.length
                      }
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
                  <H3 color="gray800">아이디어 분석 및 우선순위 선정</H3>
                  <Body3 color="gray800">
                    구조화된 창의적 사고 프로세스를 통해 새로운 기회를
                    찾아보세요
                  </Body3>
                </BgBoxItem>
                {isLoadingFinalReport ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: "200px",
                      alignItems: "center",
                    }}
                  >
                    <AtomPersonaLoader message="결과보고서를 작성하고 있습니다." />
                  </div>
                ) : (
                  <>
                    <InsightAnalysis>
                      {/* <div className="title">
                    <div>
                      <TabWrapType4>
                        <TabButtonType4
                          active={activeAnalysisTab === "summary"}
                          onClick={() => setActiveAnalysisTab("summary")}
                        >
                          종합 분석 결과
                        </TabButtonType4>
                        <TabButtonType4
                          active={activeAnalysisTab === "positioning"}
                          onClick={() => setActiveAnalysisTab("positioning")}
                        >
                          포지셔닝 맵
                        </TabButtonType4>
                      </TabWrapType4>
                    </div>
                    <Button Primary onClick={() => setShowPopupSave(true)}>
                      리포트 저장하기
                    </Button>
                  </div> */}

                      <div className="content">
                        <H4 color="gray800">
                          {ideaGeneratorInfo.business}의 타겟분석결과
                          <br />
                          {(() => {
                            // 우선순위가 높은 요인 3개 추출
                            const firstNames = Array.isArray(
                              ideaGeneratorFinalReport.top_3_clusters.first.name
                            )
                              ? ideaGeneratorFinalReport.top_3_clusters.first
                                  .name
                              : [
                                  ideaGeneratorFinalReport.top_3_clusters.first
                                    .name,
                                ];

                            const secondNames = Array.isArray(
                              ideaGeneratorFinalReport.top_3_clusters.second
                                .name
                            )
                              ? ideaGeneratorFinalReport.top_3_clusters.second
                                  .name
                              : [
                                  ideaGeneratorFinalReport.top_3_clusters.second
                                    .name,
                                ];

                            const thirdNames = Array.isArray(
                              ideaGeneratorFinalReport.top_3_clusters.third.name
                            )
                              ? ideaGeneratorFinalReport.top_3_clusters.third
                                  .name
                              : [
                                  ideaGeneratorFinalReport.top_3_clusters.third
                                    .name,
                                ];

                            let result = [...firstNames];

                            if (result.length < 3) {
                              result = [
                                ...result,
                                ...secondNames.slice(0, 3 - result.length),
                              ];
                            }

                            if (result.length < 3) {
                              result = [
                                ...result,
                                ...thirdNames.slice(0, 3 - result.length),
                              ];
                            }

                            return result.slice(0, 3).join(", ");
                          })()}
                          의 요인의 우선순위가 높았습니다.
                        </H4>

                        <Body3 color="gray700">
                          {ideaGeneratorFinalReport.conclusion}
                        </Body3>
                      </div>
                    </InsightAnalysis>

                    {activeAnalysisTab === "summary" ? (
                      <TabContent5Item>
                        <div className="title">
                          <Body1 color="gray800" align="left">
                            🎯 우선순위가 높은 아이디어를 선정해보았어요
                          </Body1>
                        </div>

                        <IdeaRankingTable>
                          <Table>
                            <colgroup>
                              <col />
                              <col width="13%" />
                              <col width="13%" />
                              <col width="13%" />
                              <col width="13%" />
                            </colgroup>
                            <TableHeader>
                              <tr>
                                <th></th>
                                <th>
                                  <Body1 color="gray800">
                                    시장 규모/성장성
                                  </Body1>
                                </th>
                                <th>
                                  <Body1 color="gray800">
                                    상품 컨셉 매력도
                                  </Body1>
                                </th>
                                <th>
                                  <Body1 color="gray800">
                                    구현 가능성
                                    <br />
                                    <p> </p>
                                  </Body1>
                                </th>
                                <th>
                                  <Body1 color="gray800">
                                    차별성
                                    <br />
                                    <p> </p>
                                  </Body1>
                                </th>
                                <th>
                                  <Body1 color="gray800">
                                    평균
                                    <br />
                                    <p> </p>
                                  </Body1>
                                </th>
                              </tr>
                            </TableHeader>
                            <TableBody>
                              {tableData.map((val, key) => (
                                <tr key={key}>
                                  <th>
                                    <Body3 color="gray700" align="left">
                                      {val.title}
                                    </Body3>
                                  </th>
                                  <td>
                                    <Body3 color="gray700">
                                      {val.marketSize}
                                    </Body3>
                                  </td>
                                  <td>
                                    <Body3 color="gray700">
                                      {val.productConcept}
                                    </Body3>
                                  </td>
                                  <td>
                                    <Body3 color="gray700">
                                      {val.implementability}
                                    </Body3>
                                  </td>
                                  <td>
                                    <Body3 color="gray700">
                                      {val.uniqueness}
                                    </Body3>
                                  </td>
                                  <td>
                                    <Body3 color="gray700">{val.average}</Body3>
                                  </td>
                                </tr>
                              ))}
                            </TableBody>
                          </Table>
                        </IdeaRankingTable>
                      </TabContent5Item>
                    ) : (
                      <TabContent5Item>
                        <Body1 color="gray800">
                          Reach and engagement of campaigns
                        </Body1>
                      </TabContent5Item>
                    )}

                    {/* <Button Small Primary onClick={() => setShowPopupSave(true)}>
                  리포트 저장하기
                </Button> */}
                  </>
                )}
              </TabContent5>
            )}
          </IdeaGeneratorWrap>
        </MainContent>
      </ContentsWrap>

      {showPopup && selectedDetailPersona && (
        <ReadMorePopup
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPopup(false);
              setSelectedDetailPersona(null);
            }
          }}
        >
          <div>
            <div className="title">
              <div>
                <Body1 color="gray800" align="left">{selectedDetailPersona.name}</Body1>
                <div className="keyword">
                  {selectedDetailPersona.keywords.map((keyword, index) => (
                    <Badge Keyword key={index}>
                      #{keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* <Caption1 color="primary">상</Caption1> */}
              <div className="close-button" onClick={() => setShowPopup(false)} />
            </div>

            <div className="content">
              <Body3 color="gray700" align="left">
                {selectedDetailPersona.description}
              </Body3>
            </div>
          </div>
        </ReadMorePopup>
      )}

      {showPopupMore && seletedIdeaIndex !== null && (
        <PopupWrap
          Wide1000
          title={
            <>
              <H4 color="gray800" align="left">
                {ideaGeneratorInfo.core_value[seletedIdeaIndex]}의{" "}
                {ideaGeneratorInfo.business} - 아이디어 도출하기
              </H4>
            </>
          }
          onCancel={() => setShowPopupMore(false)}
          buttonType="Fill"
          isModal={true}
          showTabs={true}
          tabs={["아이디어 마인드맵", "아이디어 상세 설명"]}
          activeTab={activeTabIndex}
          onTabChange={(index) => setActiveTabIndex(index)}
          eventState={false}
          creditRequestCustomPersona={1}
          customAlertBox={
            <TextWrap>
              <Body2 color="gray800" align="left">
                {ideaGeneratorIdea[seletedIdeaIndex].conclusion}
              </Body2>
            </TextWrap>
          }
          body={
            <>
              {activeTabIndex === 0 && (
                <SunburstChart>
                  <ZoomableSunburst
                    data={chartData}
                    width={700}
                    height={700}
                    colors={[
                      "#D3E2FF",
                      "#D5C8DA",
                      "#D3D5E2",
                      "#B6CBE0",
                      "#C0D9D3",
                      "#E3D0CA",
                      "#97FAA4",
                      "#77ECC8",
                      "#7BCDE8",
                      "#94A8E9",
                    ]}
                  />
                </SunburstChart>
              )}

              {activeTabIndex === 1 && (
                <>
                  <ListBox>
                    <div>
                      <span className="number">1</span>
                      <div>
                        <Sub1 color="gray800">경제적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          {
                            ideaGeneratorIdea[seletedIdeaIndex].economic_value
                              .solution
                          }
                        </Body2>
                        <ul className="ul-list">
                          {ideaGeneratorIdea[
                            seletedIdeaIndex
                          ].economic_value.ideas.map((item, index) => (
                            <li key={index}>
                              <Body2 color="gray700" align="left">
                                {item.name} : {item.description}
                              </Body2>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <span className="number">2</span>
                      <div>
                        <Sub1 color="gray800">기능적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          {
                            ideaGeneratorIdea[seletedIdeaIndex].functional_value
                              .solution
                          }
                        </Body2>
                        <ul className="ul-list">
                          {ideaGeneratorIdea[
                            seletedIdeaIndex
                          ].functional_value.ideas.map((item, index) => (
                            <li key={index}>
                              <Body2 color="gray700" align="left">
                                {item.name} : {item.description}
                              </Body2>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <span className="number">3</span>
                      <div>
                        <Sub1 color="gray800">환경적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          {
                            ideaGeneratorIdea[seletedIdeaIndex]
                              .environmental_value.solution
                          }
                        </Body2>
                        <ul className="ul-list">
                          {ideaGeneratorIdea[
                            seletedIdeaIndex
                          ].environmental_value.ideas.map((item, index) => (
                            <li key={index}>
                              <Body2 color="gray700" align="left">
                                {item.name} : {item.description}
                              </Body2>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <span className="number">4</span>
                      <div>
                        <Sub1 color="gray800">교육적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          {
                            ideaGeneratorIdea[seletedIdeaIndex]
                              .educational_value.solution
                          }
                        </Body2>
                        <ul className="ul-list">
                          {ideaGeneratorIdea[
                            seletedIdeaIndex
                          ].educational_value.ideas.map((item, index) => (
                            <li key={index}>
                              <Body2 color="gray700" align="left">
                                {item.name} : {item.description}
                              </Body2>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <span className="number">5</span>
                      <div>
                        <Sub1 color="gray800">감정적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          {
                            ideaGeneratorIdea[seletedIdeaIndex].emotional_value
                              .solution
                          }
                        </Body2>
                        <ul className="ul-list">
                          {ideaGeneratorIdea[
                            seletedIdeaIndex
                          ].emotional_value.ideas.map((item, index) => (
                            <li key={index}>
                              <Body2 color="gray700" align="left">
                                {item.name} : {item.description}
                              </Body2>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <span className="number">6</span>
                      <div>
                        <Sub1 color="gray800">사회적 가치 중심</Sub1>
                        <Body2 color="gray700" align="left">
                          {(() => {
                            const socialValueIdeas =
                              ideaGeneratorIdea[seletedIdeaIndex]?.social_value;

                            console.log(
                              "🚀 ~ PageIdeaGenerator ~ socialValueIdeas1111111111:",
                              socialValueIdeas
                            );
                            if (Array.isArray(socialValueIdeas)) {
                              console.log(
                                "🚀 ~ PageIdeaGenerator ~ socialValueIdeas222222222:",
                                socialValueIdeas[0]
                              );
                              // 첫 번째 요소가 배열인 경우
                              return socialValueIdeas[0].solution;
                            } else {
                              console.log(
                                "🚀 ~ PageIdeaGenerator ~ socialValueIdeas3333333333:",
                                socialValueIdeas
                              );
                              // 직접 배열인 경우
                              return socialValueIdeas.solution;
                            }
                          })()}
                        </Body2>
                        <ul className="ul-list">
                          {(() => {
                            const socialValueIdeas =
                              ideaGeneratorIdea[seletedIdeaIndex]?.social_value;

                            const ideas = Array.isArray(socialValueIdeas)
                              ? socialValueIdeas[0].ideas
                              : socialValueIdeas.ideas;

                            return ideas.map((item, index) => (
                              <li key={index}>
                                <Body2 color="gray700" align="left">
                                  {item.name} : {item.description}
                                </Body2>
                              </li>
                            ));
                          })()}
                        </ul>
                      </div>
                    </div>
                  </ListBox>
                </>
              )}
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

export default PageIdeaGenerator;

const IdeaGeneratorWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
`;

const CustomButton = styled(Button)`
  min-width: 92px;
`;

const SegmentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  max-width: 820px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const ReadMorePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 820px;
    width: 100%;
    padding: 24px 24px 24px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    background: ${palette.white};
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    > div {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .close-button {
      position: relative;
      width: 20px;
      height: 20px;
      cursor: pointer;

      &:before,
      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 2px;
        border-radius: 10px;
        background-color: ${palette.gray500};
        content: "";
      }

      &:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }

    ${Caption1} {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background-color: rgba(34, 111, 255, 0.1);
    }
  }

  .keyword {
    display: flex;
    align-items: flex-start;
    gap: 4px;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding-top: 16px;
    border-top: 1px solid ${palette.gray200};
  }
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

const IdeaRankingTable = styled.div`
  width: 100%;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const SunburstChart = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;
