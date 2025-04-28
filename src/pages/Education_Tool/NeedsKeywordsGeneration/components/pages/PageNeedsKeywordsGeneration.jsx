//디자인 감성 분석기
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import OrganismIncNavigation from "../../../../Global/organisms/OrganismIncNavigation";
import MoleculeHeader from "../../../../Global/molecules/MoleculeHeader";
import { Button, IconButton } from "../../../../../assets/styles/ButtonStyle";
import {
  FormBox,
  CustomTextarea,
} from "../../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../../assets/styles/Popup";
import {
  ContentsWrap,
  MainContent,
  TabWrapType4,
  TabButtonType4,
  TabWrapType5,
  TabButtonType5,
  TabContent5,
  TabContent5Item,
  CardGroupWrap,
  BottomBar,
  BgBoxItem,
  StyledDropzone,
  DropzoneStyles,
  OCEANRangeWrap,
  RangeSlider,
  Title,
  ListBoxGroup,
  BoxWrap,
} from "../../../../../assets/styles/BusinessAnalysisStyle";
import {
  IS_LOGGED_IN,
  TOOL_ID,
  TOOL_STEP,
  TOOL_LOADING,
  PROJECT_SAAS,
  DESIGN_ANALYSIS_BUSINESS_TITLE,
  IDEA_GENERATION_START_POSITION,
  IDEA_GENERATION_IDEA_LIST,
  CUSTOMER_JOURNEY_MAP_REPORT,
  CUSTOMER_JOURNEY_MAP_SELECTED_PERSONA,
  IDEA_GENERATION_PROBLEM_LIST,
  PERSONA_LIST_SAAS,
  IDEA_GENERATION_MANDALART_DATA,
  IDEA_GENERATION_PROBLEM_LIST_TITLE,
  IDEA_GENERATION_SELECTED_START_POSITION,
  IDEA_GENERATION_SELECTED_MANDALART,
  IDEA_GENERATION_POSSSESSION_TECH,
  IDEA_GENERATION_SELECTED_PURPOSE,
  ISSUE_GENERATION_LIST,
  KEYWORDS_GENERATION_SELECTED_ISSUE,
  KEYWORDS_GENERATION_SELECTED_ISSUE_INDEX,
  KEYWORDS_GENERATION_TAG,
  EVENT_STATE,
  TRIAL_STATE,
  EVENT_TITLE,
  CREDIT_CREATE_TOOL_LOW,
  CREDIT_CREATE_TOOL_LOADED,
  EDUCATION_STATE,
  USER_CREDITS,
} from "../../../../AtomStates";

import images from "../../../../../assets/styles/Images";
import {
  H4,
  H3,
  Sub3,
  Body1,
  Body2,
  Body3,
  Caption1,
} from "../../../../../assets/styles/Typography";
import {
  createToolOnServer,
  updateToolOnServer,
  EducationToolsRequest,
  getFindToolListOnServerSaas,
  UserCreditCheck,
  UserCreditUse,
  UserCreditInfo,
} from "../../../../../utils/indexedDB";
import "react-dropzone-uploader/dist/styles.css";
import MoleculeDeleteForm from "../../../public/MoleculeDeleteForm";
import MandalArtGraph from "../../../../../components/Charts/MandalArtGraph";
import { useDynamicViewport } from "../../../../../assets/DynamicViewport";
import MoleculeTagList from "../molecules/MoleculeTagList";
import MoleculeItemSelectCard from "../../../public/MoleculeItemSelectCard";

const PageNeedsKeywordsGeneration = () => {
  const navigate = useNavigate();

  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [eventState] = useAtom(EVENT_STATE);
  const [trialState] = useAtom(TRIAL_STATE);
  const [eventTitle] = useAtom(EVENT_TITLE);
  const [creditCreateToolLow, ] = useAtom(CREDIT_CREATE_TOOL_LOW);
  const [creditCreateToolLoaded, setCreditCreateToolLoaded] = useAtom(CREDIT_CREATE_TOOL_LOADED);
  const [userCredits, setUserCredits] = useAtom(USER_CREDITS);
  const [educationState] = useAtom(EDUCATION_STATE);
  const [toolStep] = useAtom(TOOL_STEP);
  const [toolLoading, setToolLoading] = useAtom(TOOL_LOADING);
  const [isLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectSaas] = useAtom(PROJECT_SAAS);
  const [keywordsGenerationTag, setKeywordsGenerationTag] = useAtom(KEYWORDS_GENERATION_TAG);
  const [issueGenerationList, setIssueGenerationList] = useAtom(ISSUE_GENERATION_LIST);
  const [keywordsGenerationSelectedIssue, setKeywordsGenerationSelectedIssue] = useAtom(KEYWORDS_GENERATION_SELECTED_ISSUE);

  const [showPopupSave, setShowPopupSave] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // 완료된 단계를 추적
  const [businessDescription, setBusinessDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const customerListRef = useRef(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [businessDescriptionTitle, setBusinessDescriptionTitle] = useState("");
  const [showPopupFileSize, setShowPopupFileSize] = useState(false);
  const [toolSteps, setToolSteps] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState([]);
  const [showSelectedIssue, setshowSelectedIssue] = useState(false);
  const [showCreatePersonaPopup, setShowCreatePersonaPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);


  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  const project = projectSaas;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    const interviewLoading = async () => {
      // 비즈니스 정보 설정 (Step 1)
      if(!creditCreateToolLoaded){
      setShowCreatePersonaPopup(true);
       // 크레딧 사용전 사용 확인
       const creditPayload = {
        // 기존 10 대신 additionalQuestionMount 사용
        mount: creditCreateToolLow,
      };
      const creditResponse = await UserCreditCheck(creditPayload, isLoggedIn);

      if (creditResponse?.state !== "use") {
        setShowCreditPopup(true);
        return;
      }
    }
      const projectAnalysis =
        (project?.projectAnalysis.business_analysis
          ? project?.projectAnalysis.business_analysis
          : "") +
        (project?.projectAnalysis.business_analysis &&
        project?.projectAnalysis.file_analysis
          ? "\n"
          : "") +
        (project?.projectAnalysis.file_analysis
          ? project?.projectAnalysis.file_analysis
          : "");
      const projectTitle = project?.projectTitle;

      if (project) {
        setBusinessDescriptionTitle(projectTitle);
        setBusinessDescription(projectAnalysis);
      }
 
      if (toolLoading) {
        // 활성 탭 설정 (기본값 1)
        setActiveTab(Math.min((toolStep ?? 1) + 1, 2));
        setToolSteps(toolStep ?? 1);
        if (keywordsGenerationTag && keywordsGenerationTag.length > 0) {
          setKeywordsGenerationTag(keywordsGenerationTag ?? []);
        }
  
        if (keywordsGenerationSelectedIssue) {
          setKeywordsGenerationSelectedIssue(keywordsGenerationSelectedIssue ?? []);
          setshowSelectedIssue(true);
          const issueIndexes = Array.from(
            { length: keywordsGenerationSelectedIssue.length },
            (_, index) => index
          );
          setSelectedIssue(issueIndexes);
        }
   
        
        // if (issueGenerationList && issueGenerationList.length > 0) {
        //   setSelectedIssue(issueGenerationList ?? []);
        // }
        // if (keywordsGenerationSelectedIssueIndex) {
        //   setSelectedIssue(keywordsGenerationSelectedIssueIndex ?? []);
        // }

        // 완료된 단계 설정
        const completedStepsArray = [];
        for (let i = 1; i <= (toolStep ?? 1); i++) {
          completedStepsArray.push(i);
        }
        setCompletedSteps(completedStepsArray);

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

        const response = await getFindToolListOnServerSaas(
          projectSaas?._id ?? "",
          "ix_issue_generation_education",
          isLoggedIn
        );


        // console.log("respontgfsdgbfdsghrfsdgfsdgfsdgrfse", response);
        const newItems = (response || []).filter(
          (item) =>
            item?.type === "ix_issue_generation_education" &&
            item?.completedStep === 3
        );

        allItems = [...allItems, ...newItems];

        setIssueGenerationList(allItems);
      } catch (error) {

        setIssueGenerationList([]); // Set empty array on error
      }
    };

    getAllTargetDiscovery();
  }, [isLoggedIn, projectSaas]);

  const business = {
    business: businessDescription,
    business_model: project?.businessModel || "",
    sector: project?.industryType || "",
    country: project?.targetCountry || "",
  };

  

  // 다음 단계로 이동하는 함수
  const handleNextStep = (currentStep) => {
    setCompletedSteps([...completedSteps, currentStep]);
    setActiveTab(currentStep + 1);
    setShowPopupError(false);
  };

  const handleSubmitIssuList = async () => {
    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    handleNextStep(1);

    const responseToolId = await createToolOnServer(
      {
        projectId: project._id,
        type: "ix_needs_keywords_generation_education",
        keywordsGenerationSelectedIssue: keywordsGenerationSelectedIssue,
        selectedIssueIndex: selectedIssue,
        completedStep: 1,
      },
      isLoggedIn
    );
    setToolId(responseToolId);

    const creditUsePayload = {
      title: project.projectTitle,
      service_type: "고객 여정 지도",
      target: "",
      state: "use",
      mount: creditCreateToolLow,
    };

    await UserCreditUse(creditUsePayload, isLoggedIn);

    // 크레딧 사용 후 사용자 정보 새로고침

      const userCreditValue = await UserCreditInfo(isLoggedIn);
      // 전역 상태의 크레딧 정보 업데이트
      setUserCredits(userCreditValue)


    // 각 title을 currentProblemList의 해당 인덱스에 할당
    // 만약 currentProblemList가 더 짧다면 새 객체를 생성하여 추가
  //   if (keywordsGenerationSelectedIssue.length > 3) {
  //   const updatedProblemList = keywordsGenerationSelectedIssue.flatMap(
  //    (issue) => {
  //     return { issueGenerationSelectedStartPosition: issue.issueGenerationSelectedStartPosition };
  //    }
  //   );
  // }



    // await updateToolOnServer(
    //   toolId,
    //   {
    //     completedStep: 2,
     
    //   },
    //   isLoggedIn
    // );
    try {

      if (keywordsGenerationSelectedIssue.length >= 3) {
        setIsLoading(true);

        const updatedProblemList = keywordsGenerationSelectedIssue.flatMap(
         (issue) => {
          return { issueGenerationSelectedStartPosition: issue.issueGenerationSelectedStartPosition };
         }
        );
        setIsLoading(true);
    
        const Data = {
          type: "ix_needs_keywords_generation_clustering_education",
          business: business,
          theme_list:updatedProblemList
          
        };
  
        const response = await EducationToolsRequest(Data, isLoggedIn, signal);
  
        // console.log("response", response);
  
        // setIdeaGenerationStartPosition(
        //   response.response.idea_generation_keyword_education
        // );
  
        setKeywordsGenerationTag(
          response.response.needs_keywords_generation_clustering_education
        );
  
        setIsLoading(false);
        await updateToolOnServer(
          responseToolId,
          {
            completedStep: 2,
            keywordsGenerationTag:
              response.response.needs_keywords_generation_clustering_education,
          },
          isLoggedIn
        )
      }else{
      
        // const updatedProblemList = keywordsGenerationSelectedIssue.flatMap(
        //   (issue) => {
        //    return { issueGenerationSelectedStartPosition: issue.issueGenerationSelectedStartPosition };
        //   }
        //  );
        const updatedProblemList = keywordsGenerationSelectedIssue.flatMap(issue => {
          if (issue.issueGenerationSelectedStartPosition && Array.isArray(issue.issueGenerationSelectedStartPosition)) {
            return issue.issueGenerationSelectedStartPosition.map(item => ({
              main_theme: item.theme,
              raw_data: item.description
            }));
          }
          return []; // 해당하는 배열이 없으면 빈 배열 반환
        });
        setKeywordsGenerationTag(updatedProblemList);
        //  console.log("updatedProblemList", updatedProblemList);
        await updateToolOnServer(
          responseToolId,
          {
            completedStep: 2,
            keywordsGenerationTag:
            updatedProblemList
            },
          isLoggedIn
        )
      }
    
    
      // const Data = {
      //   type: "ix_needs_keywords_generation_clustering_education",
      //   business: business,
      //   theme_list:updatedProblemList
        
      // };

      // const response = await EducationToolsRequest(Data, isLoggedIn);

      // console.log("response", response);

      // // setIdeaGenerationStartPosition(
      // //   response.response.idea_generation_keyword_education
      // // );

      // setKeywordsGenerationTag(
      //   response.response.needs_keywords_generation_clustering_education
      // );

      // setIsLoading(false);
      // await updateToolOnServer(
      //   responseToolId,
      //   {
      //     completedStep: 2,
      //     keywordsGenerationTag:
      //       response.response.needs_keywords_generation_clustering_education,
      //   },
      //   isLoggedIn
      // );

      setToolSteps(1);
    } catch (error) {
      console.error("Error submitting problems:", error);
      setShowPopupError(true);
    }
  };

  
  const handleConfirmCredit = async () => {
    setShowCreatePersonaPopup(false);
  };

  const handleCheckboxChange = (ideaId) => {
    setSelectedIssue((prev) => {
      if (prev.includes(ideaId)) {
        // 이미 선택된 아이템이면 제거
        const newSelected = prev.filter((id) => id !== ideaId);
        // 선택된 데이터들 업데이트
        const selectedDataList = newSelected.map(
          (id) => issueGenerationList[id]
        );
        setKeywordsGenerationSelectedIssue(selectedDataList);
        return newSelected;
      } else {
        // 새로운 아이템 추가
        const newSelected = [...prev, ideaId];
        // 선택된 데이터들 업데이트
        const selectedDataList = newSelected.map(
          (id) => issueGenerationList[id]
        );
        setKeywordsGenerationSelectedIssue(selectedDataList);
        return newSelected;
      }
    });
  };

  const abortControllerRef = useRef(null);

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("needskeywordsgeneration")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          // console.log("새로고침 감지: URL 비교");
          navigate("/Project");
          return true;
        }

        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }

      return false;
    };


    // F5 키 또는 Ctrl+R 감지
    const handleKeyDown = (event) => {
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 키 코드
        event.preventDefault();
        navigate("/Project");
      }
    };

    // 컴포넌트가 마운트될 때 새 AbortController 생성
    abortControllerRef.current = new AbortController();

    // 함수 실행
    detectRefresh();

    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      // 진행 중인 모든 API 요청 중단
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [navigate]);

  return (
    <>
      <DropzoneStyles />
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <DesignAnalysisWrap>
            <TabWrapType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 1}
                onClick={() => setActiveTab(1)}
                disabled={isLoading || isLoadingReport}
              >
                <span>01</span>
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 1 ? "gray700" : "gray300"}>
                    문제 정의
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                Num3
                isActive={activeTab >= 2}
                onClick={() => completedSteps.includes(1) && setActiveTab(2)}
                disabled={
                  !completedSteps.includes(1) || isLoading || isLoadingReport
                }
              >
                <span>02</span>
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    아이디어 키워드 도출
                  </Body1>
                  {/* <Body1 color={activeTab >= 2 ? "gray700" : "gray300"}>
                    Design Sector
                  </Body1> */}
                </div>
              </TabButtonType5>
              {/* <TabButtonType5
                Num3
                isActive={activeTab >= 3}
                onClick={() => completedSteps.includes(2) && setActiveTab(3)}
                disabled={
                  !completedSteps.includes(2) || isLoading || isLoadingReport
                }
              >
                <span>03</span>
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 3 ? "gray700" : "gray300"}>
                    아이디어 발상
                  </Body1>
                </div>
              </TabButtonType5>
              <TabButtonType5
                isActive={activeTab >= 4}
                onClick={() => completedSteps.includes(3) && setActiveTab(4)}
                disabled={!completedSteps.includes(3) || isLoading}
              >
                <span>04</span>
                <div className="text" style={{ whiteSpace: "nowrap" }}>
                  <Body1 color={activeTab >= 4 ? "gray700" : "gray300"}>
                    아이디어 결과 보기
                  </Body1>
                </div>
              </TabButtonType5> */}
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
                    <AtomPersonaLoader message="문제점 & 니즈 리스트를 불러오고 있어요..." />
                  </div>
                ) : (
                  <>
                    <div className="title">
                      <H3 color="gray800">Problem & Needs</H3>
                      <Body3 color="gray800">
                        고객 여정 분석을 원하는 주요 페르소나의 문제점 또는
                        니즈를 도출하세요
                      </Body3>
                    </div>

                    <div className="content">

                              <>
                              <div
                                  className="title"
                                  style={{
                                    textAlign: "left",
                                    marginBottom: "-20px",
                                  }}
                                >
                                  <Body1 color="gray700">
                                  아이디어 리스트 선택
                                  </Body1>
                                </div>
                                {showSelectedIssue ? (
                                  <>
                                    {keywordsGenerationSelectedIssue.map((idea, index) => (
                                      <MoleculeItemSelectCard
                                        FlexStart
                                        key={index}
                                        id={index}
                                        title={`${idea.updateDate.split(":")[0]}:${
                                          idea.updateDate.split(":")[1]
                                        } - 문제점 & 니즈 - ${
                                          idea.title || "아이디어"
                                        }`}
                                        isSelected={selectedIssue.includes(index)}
                                        onSelect={() => handleCheckboxChange(index)}
                                      />
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    {issueGenerationList.map((idea, index) => (
                                      <MoleculeItemSelectCard
                                        FlexStart
                                        key={index}
                                        id={index}
                                        title={`${idea.updateDate.split(":")[0]}:${
                                          idea.updateDate.split(":")[1]
                                        } - 문제점 & 니즈 - ${
                                          idea.title || "아이디어"
                                        }`}
                                        isSelected={selectedIssue.includes(index)}
                                        onSelect={() => handleCheckboxChange(index)}
                                      />
                                    ))}
                                  </>
                                )}
                              </>
                          
                     
                        </div>
                      <Button
                        Other
                        Primary
                        Fill
                        Round
                        onClick={handleSubmitIssuList}
                        disabled={
                          isContentLoading ||
                          toolSteps >= 1 ||
                          selectedIssue.length === 0
                        }
                      >
                        아이디어 키워드 추출
                      </Button>
              
                  </>
                )}
              </TabContent5>
            )}

            {activeTab === 2 && completedSteps.includes(1) && (
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
                    <AtomPersonaLoader message="아이디어 발산을 위한 핵심 키워드를 추출하고 있어요 " />
                  </div>
                ) : (
                  keywordsGenerationTag.length > 0 && (
                    <>
                      <div className="title">
                        <H3 color="gray800">Idea Generation Theme</H3>
                        <Body3 color="gray800">
                          문제와 니즈를 창의적 해결 주제로 전환하여, 아이디어
                          발상의 방향을 정해주세요.
                        </Body3>
                      </div>

                      <div className="content">
                        <Title style={{ marginBottom: "-18px" }}>
                          <Body1 color="gray700">
                            {keywordsGenerationTag.length}개의 고객 여정 지도 결과를 취합한 핵심 니즈 키워드입니다.
                          </Body1>
                        </Title>

                        <CardGroupWrap ideaGeneration>
                          <MoleculeTagList
                            items={
                              keywordsGenerationTag
                                .map((item) => item.main_theme)
                                .flat() // 모든 content 배열을 하나로 합침
                            }
                            disabled={toolSteps >= 2}
                          />
                        </CardGroupWrap>
                      </div>
                    </>
                  )
                )}
              </TabContent5>
            )}
            

          </DesignAnalysisWrap>
        </MainContent>
      </ContentsWrap>

      {showPopupError && (
        <PopupWrap
          Warning
          title="다시 입력해 주세요."
          message="현재 입력하신 정보는 목적을 생성할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => window.location.reload()}
        />
      )}

      {showPopupFileSize && (
        <PopupWrap
          Warning
          title="파일 크기 초과"
          message="파일 크기는 20MB를 초과할 수 없습니다."
          buttonType="Outline"
          confirmText="확인"
          isModal={false}
          onConfirm={() => setShowPopupFileSize(false)}
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
   

{showCreatePersonaPopup &&
        (eventState && !educationState ? (
          <PopupWrap
            Event
            title="핵심 키워드 추출"
            message={
              <>
                현재 {eventTitle} 기간으로 이벤트 크레딧이 소진됩니다.
                <br />({creditCreateToolLow} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => {
              setShowCreatePersonaPopup(false);
              navigate("/Tool");
            }}
            onConfirm={handleConfirmCredit}
          />
        ) : trialState && !educationState ? (
          <PopupWrap
            Check
            title="핵심 키워드 추출"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditCreateToolLow} 크레딧)
                <br />
                신규 가입 2주간 무료로 사용 가능합니다.
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => {
              setShowCreatePersonaPopup(false);
              navigate("/Tool");
            }}
            onConfirm={handleConfirmCredit}
          />
        ) : (
          <PopupWrap
            Check
            title="핵심 키워드 추출"
            message={
              <>
                해당 서비스 사용시 크레딧이 소진됩니다.
                <br />({creditCreateToolLow} 크레딧)
              </>
            }
            buttonType="Outline"
            closeText="취소"
            confirmText="시작하기"
            isModal={false}
            onCancel={() => {
              setShowCreatePersonaPopup(false);
              navigate("/Tool");
            }}
            onConfirm={handleConfirmCredit}
          />
        ))}

      {showCreditPopup && (
        <PopupWrap
          Warning
          title="크레딧이 모두 소진되었습니다"
          message={
            <>
              보유한 크레딧이 부족합니다.
              <br />
              크레딧을 충전한 후 다시 시도해주세요.
            </>
          }
          buttonType="Outline"
          closeText="확인"
          isModal={false}
          onCancel={() => setShowCreditPopup(false)}
          onConfirm={() => setShowCreditPopup(false)}
        />
      )}
    </>
  );
};

export default PageNeedsKeywordsGeneration;

const DesignAnalysisWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 60px;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const EditButtonGroup = styled(ButtonGroup)`
  justify-content: end;
`;

const InsightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #e0e4e8;
  border-radius: 10px;
  padding: 16px;
`;

const InsightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid #e0e4e8;
  padding-bottom: 16px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const IdeaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 20px;
`;

const IdeaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: ${palette.white};
  border: 1px solid ${palette.outlineGray};
  border-radius: 8px;
  text-align: left;
`;

const IdeaTitle = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${palette.gray800};
  margin: 0;
`;

const IdeaContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`;

const IdeaText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: ${palette.gray600};
  margin: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: ${palette.white};
  border-radius: 10px;
  padding: 24px;
  margin-top: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 140px;
`;
