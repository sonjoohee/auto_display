import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useAtom } from "jotai";
import {
  SELECTED_EXPERT_INDEX,
  STRATEGY_REPORT_DATA,
  SELECTED_TAB_COPY,
  EXPERT_BUTTON_STATE,
  CONVERSATION,
  APPROACH_PATH,
  isLoggedInAtom,
  INPUT_BUSINESS_INFO,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
} from "../../../AtomStates";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";

import MoleculeReportController from "../molecules/MoleculeReportController";
import {
  saveConversationToIndexedDB,
  getConversationByIdFromIndexedDB,
} from "../../../../utils/indexedDB";
import axios from "axios";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, TextRun } from "docx"; // docx 라이브러리 임포트
import { saveAs } from "file-saver"; // file-saver를 사용하여 파일 저장

import {
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  IS_LOADING,
  SELECTED_ADDITIONAL_KEYWORD,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  IS_EDITING_NOW,
  CONVERSATION_STAGE,
  POC_DETAIL_REPORT_ATOM,
  POC_PERSONA_LIST,
  RECOMMENDED_TARGET_DATA,
} from "../../../AtomStates";

const OrganismStrategyReportSection = ({ conversationId, expertIndex }) => {
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [selectedPocOptions, setSelectedPocOptions] =
    useAtom(SELECTED_POC_OPTIONS);
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [approachPath] = useAtom(APPROACH_PATH);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedTab, setSelectedTab] = useState(0); // 선택된 보고서 탭 상태관리
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인
  const [selectedKeywords] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [loading, setLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(""); // 상태 메시지를 관리
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET); // 확인 버튼을 눌렀을 때만 저장 -> 히스토리 저장
  const [selectedTabCopy, setSelectedTabCopy] = useAtom(SELECTED_TAB_COPY);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [expertButtonState, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE); // BUTTON_STATE 사용

  // Use the single strategyReportData atom
  const [strategyReportData, setStrategyReportData] =
    useAtom(STRATEGY_REPORT_DATA);

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const [isLoadingExpert, setIsLoadingExpert] = useState(false);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  );
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);

  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  useEffect(() => {
    const loadData = async () => {
      let finalResponse;

      try {
        const currentExpertData = strategyReportData[expertIndex];

        // Existing data handling
        if (currentExpertData && Object.keys(currentExpertData).length > 0) {
          setTabs(currentExpertData.tabs);
          setSections(currentExpertData.tabs[selectedTab].sections);
        }
        // buttonState === 1일 때만 API 호출
        else if (expertButtonState === 1) {
          setExpertButtonState(0); // 버튼 상태를 초기화
          setIsLoadingExpert(true);
          setIsLoading(true);
          setIsEditingNow(false); // 수정 상태 초기화

          // 여기서 expert_id를 임시로 "3"으로 설정합니다.
          const data = {
            expert_id: selectedExpertIndex,
            business_info: titleOfBusinessInfo, // DB에서 가져온 titleOfBusinessInfo 사용
            business_analysis_data: {
              명칭: analysisReportData.title,
              주요_목적_및_특징: analysisReportData.mainFeatures,
              주요기능: analysisReportData.mainCharacter,
              목표고객: analysisReportData.mainCustomer,
            },
            goal: selectedPocOptions[0],
            standpoint: selectedPocOptions[1],
            target: selectedPocTarget.job,
            tabs: [],
            page_index: 1,
          };

          let response1 = await axios.post(
            "https://wishresearch.kr/panels/expert",
            data,
            axiosConfig
          );

          while (true) {
            if (!response1.data["tabs"][0].hasOwnProperty("title")) {
              response1 = await axios.post(
                "https://wishresearch.kr/panels/expert",
                data,
                axiosConfig
              );
            } else {
              break;
            }
          }

          finalResponse = response1.data;

          if (finalResponse.total_page_index === 2) {
            let response2 = await axios.post(
              "https://wishresearch.kr/panels/expert",
              finalResponse,
              axiosConfig
            );
            while (true) {
              if (!response2.data["tabs"][1].hasOwnProperty("title")) {
                response2 = await axios.post(
                  "https://wishresearch.kr/panels/expert",
                  finalResponse,
                  axiosConfig
                );
              } else {
                break;
              }
            }
            finalResponse = response2.data;
          } else if (finalResponse.total_page_index === 3) {
            let response2 = await axios.post(
              "https://wishresearch.kr/panels/expert",
              finalResponse,
              axiosConfig
            );
            while (true) {
              if (!response2.data["tabs"][1].hasOwnProperty("title")) {
                response2 = await axios.post(
                  "https://wishresearch.kr/panels/expert",
                  finalResponse,
                  axiosConfig
                );
              } else {
                break;
              }
            }
            let response3 = await axios.post(
              "https://wishresearch.kr/panels/expert",
              response2.data,
              axiosConfig
            );
            while (true) {
              if (!response3.data["tabs"][2].hasOwnProperty("title")) {
                response3 = await axios.post(
                  "https://wishresearch.kr/panels/expert",
                  response2.data,
                  axiosConfig
                );
              } else {
                break;
              }
            }
            finalResponse = response3.data;
          }

          const strategyData = finalResponse;

          // Update the strategyReportData atom
          setStrategyReportData((prevData) => ({
            ...prevData,
            [expertIndex]: strategyData,
          }));
          // 바로 저장할 데이터
          const updatedStrategyReportData = {
            ...strategyReportData,
            [expertIndex]: strategyData, // 새로운 데이터를 추가한 객체를 바로 생성
          };
          setTabs(strategyData.tabs);
          setSections(strategyData.tabs[selectedTab].sections);

          setIsLoadingExpert(false);
          setIsLoading(false);

          const updatedConversation = [...conversation];
          updatedConversation.push(
            {
              type: "system",
              message:
                "PoC 설계 보고서의 핵심 내용을 정리했습니다. 목표에 맞는 'PoC 수행 계획서'를 다운로드해보세요!",
              expertIndex: selectedExpertIndex,
            },
            {
              type: "system",
              message:
                "PoC 실행 목적에 적합한 타겟과 예상 인사이트를 확인하고 싶다면, '타겟 추천 받기' 버튼을 눌러보세요.",
              expertIndex: selectedExpertIndex,
            },
            { type: `pocTargetButton` }
          );
          setConversationStage(3);
          setConversation(updatedConversation);
          await saveConversationToIndexedDB(
            {
              id: conversationId,
              inputBusinessInfo: inputBusinessInfo,
              analysisReportData: analysisReportData,
              selectedAdditionalKeywords: selectedKeywords,
              conversationStage: 3,
              strategyReportData: updatedStrategyReportData, // Save the entire strategyReportData
              conversation: updatedConversation,
              selectedAdditionalKeywords: selectedAdditionalKeyword,
              selectedCustomerAdditionalKeyword:
                selectedCustomerAdditionalKeyword,
              additionalReportData: additionalReportData,
              customerAdditionalReportData: customerAdditionalReportData,
              timestamp: Date.now(),
              expert_index: selectedExpertIndex,
              selectedPocOptions: selectedPocOptions,
              pocPersonaList: pocPersonaList,
              selectedPocTarget: selectedPocTarget,
              recommendedTargetData: recommendedTargetData,
            },
            isLoggedIn,
            conversationId
          );
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [conversationId, selectedTab, expertIndex, expertButtonState]); // buttonState 의존성 추가

  const handleTabClick = (index, expertIndex) => {   
   setSelectedTab(index);
   setSelectedTabCopy(prevState => ({
     ...prevState,
     [expertIndex]: index
   }));
 };

  return (
    <>
      <AnalysisSection Strategy>
        {/* PDF로 변환할 콘텐츠를 감싸는 div에 id 추가 */}
        <div id="print-content">
          {isLoadingExpert ? (
            <>
              <SkeletonTitle className="title-placeholder" />
              <SkeletonLine className="content-placeholder" />
              <SkeletonLine className="content-placeholder" />
              <Spacing />
              <SkeletonTitle className="title-placeholder" />
              <SkeletonLine className="content-placeholder" />
              <SkeletonLine className="content-placeholder" />
              <Spacing />
              <SkeletonTitle className="title-placeholder" />
              <SkeletonLine className="content-placeholder" />
              <SkeletonLine className="content-placeholder" />
            </>
          ) : (
            <>
              <TabHeader>
                {tabs &&
                  tabs.length > 0 &&
                  tabs.map((tab, index) => (
                    <h1
                      key={index}
                      active={selectedTab === index}
                      expertIndex={expertIndex}
                      onClick={() => handleTabClick(index, expertIndex)}
                      style={{marginBottom: "0"}}
                    >
                      {tab.title}
                    </h1>
                  ))}
              </TabHeader>

              {sections?.map((section, index) => (
                <div key={index}>
                  <Section
                    title={section.title}
                    title_text={section.text}
                    content={section.content}
                    isLast={index === sections.length - 1}
                    expertIndex={expertIndex}
                    selectedTab={selectedTab}
                    conversationId={conversationId}
                    index={index}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {!isLoadingExpert && (
          <MoleculeReportController
            reportIndex={1}
            strategyReportID={expertIndex}
            conversationId={conversationId}
            sampleData={strategyReportData[expertIndex]}
          />
        )}
      </AnalysisSection>
    </>
  );
};

const Section = ({
  title,
  title_text,
  content,
  isLast,
  expertIndex,
  selectedTab,
  index,
  conversationId,
}) => {
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  // 서브 타이틀이 있는 항목과 없는 항목을 분리
  const [pocDetailReportData, setpocDetailReportData] = useAtom(
    POC_DETAIL_REPORT_ATOM
  );
  const subTitleItems = content.filter((item) => item.subTitle);
  const nonSubTitleItems = content.filter((item) => !item.subTitle);
  const summaryItem = content.find((item) => item.title === "총평");
  const subItems = content.filter((item) => item.subTitle);
  const [loading, setLoading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(""); // 상태 메시지를 관리
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [approachPath] = useAtom(APPROACH_PATH);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인
  const [selectedKeywords] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [additionalReportData, setAdditionalReportData] = useAtom(
    ADDITIONAL_REPORT_DATA
  );
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(
    SELECTED_ADDITIONAL_KEYWORD
  );
  const [
    selectedCustomerAdditionalKeyword,
    setSelectedCustomerAdditionalKeyword,
  ] = useAtom(SELECTED_CUSTOMER_ADDITIONAL_KEYWORD);
  const [customerAdditionalReportData, setCustomerAdditionalReportData] =
    useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  // Use the single strategyReportData atom
  const [strategyReportData, setStrategyReportData] =
    useAtom(STRATEGY_REPORT_DATA);
  const [selectedPocOptions, setSelectedPocOptions] =
    useAtom(SELECTED_POC_OPTIONS);
  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET); // 확인 버튼을 눌렀을 때만 저장 -> 히스토리 저장

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [isModalOpen, setIsModalOpen] = useState({});
  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const [selectedLanguage, setSelectedLanguage] = useState("한글");
  const popupRef = useRef(null); // 팝업 요소를 참조하는 useRef 생성
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.closest('.download-button')
      ) {
        setIsModalOpen({});
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const [isAutoSaveToggle, setIsAutoSaveToggle] = useState(false); // 팝업이 처음에는 닫힌 상태
  const toggleAutoSavePopup = () => {
    setIsAutoSaveToggle(!isAutoSaveToggle); // 현재 상태를 반전시킴
  };

  // subText에서 ':'로 분리하여 subTitle과 text를 따로 처리
  const splitText = (text) => {
    const [subTitle, ...rest] = text.split(":");
    return {
      subTitle: subTitle.trim(), // ':' 앞부분
      text: rest.join(":").trim(), // ':' 뒷부분
    };
  };

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 }); // 팝업 위치 상태
  const buttonRef = useRef(null); // 버튼 위치를 참조할 ref 생성

  const handleOpenModal = (index, event) => {
    if (isModalOpen[index]) {
      setIsModalOpen({}); // 모달을 다시 클릭하면 닫기
      return;
    }

    setIsModalOpen(prev => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      newState[index] = true; // 현재 index만 true
      return newState;
    });

    const clickedElement = event.currentTarget;

    // 클릭된 요소의 위치와 크기 정보 가져오기
    let top = clickedElement.offsetTop + 30;
    let left = clickedElement.offsetLeft + clickedElement.offsetWidth - 100;
    // console.log(top)
    // console.log(left)

    // 새로운 위치를 설정
    setPopupPosition({ top, left });
  };

  const handleDownloadClick = (index) => {
    if (!selectedLanguage) {
      alert("언어를 선택해주세요");
      return;
    }

    setLoading(true);
    setDownloadStatus("다운로드 중입니다...");

    if (selectedFormat === "PDF") {
      handleDownload(selectedLanguage, index);
    } else if (selectedFormat === "Word") {
      handleDownloadDocx(selectedLanguage, index);
    }
  };

  const generatePDF = async (cleanedContent, index, fileName) => {
    try {
      const contentDiv = document.getElementById(`print-content-${index}`);
      if (!contentDiv) {
        console.error("contentDiv 요소를 찾을 수 없습니다.");
        setLoading(false);
        return;
      }
  
      contentDiv.innerHTML = cleanedContent;
      contentDiv.style.fontSize = '20px'; 
      contentDiv.style.display = "block";
      document.body.appendChild(contentDiv);
  
      const canvas = await html2canvas(contentDiv, {
        scale: 2,
        useCORS: true,
      });
  
      const imgData = canvas.toDataURL("image/png");
  
      const doc = new jsPDF();
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;
      
      const contentWidth = pageWidth - (2 * margin);
      const contentHeight = (canvas.height * contentWidth) / canvas.width;
      
      let heightLeft = contentHeight;
      let position = 0;
      let pageCount = 0;
  
      while (heightLeft > 0) {
        if (pageCount > 0) {
          doc.addPage();
        }
  
        const currentHeight = Math.min(pageHeight - (2 * margin), heightLeft);
        const sy = position / contentHeight * canvas.height;
        const sHeight = currentHeight / contentWidth * canvas.width;
  
        doc.addImage(
          imgData, 
          "PNG", 
          margin, 
          margin, 
          contentWidth, 
          currentHeight,
          null,
          'FAST',
          0,
          sy,
          canvas.width,
          sHeight
        );
  
        heightLeft -= currentHeight;
        position += currentHeight;
        pageCount++;
      }
  
      doc.save(`${fileName}.pdf`);
      console.log('PDF 생성 및 다운로드 완료');
  
      setDownloadStatus("다운로드 완료");
  
      contentDiv.style.display = "none";
      setLoading(false);
  
      setTimeout(() => {
        setDownloadStatus("");
      }, 2000);
    } catch (error) {
      console.error("PDF 생성 오류:", error);
      setLoading(false);
      setDownloadStatus("다운로드 실패");
  
      setTimeout(() => {
        setDownloadStatus("");
      }, 2000);
    }
  };

  const handleDownload = async (language, index) => {
    setLoading(true); // 로딩 상태 시작
    setDownloadStatus("다운로드 중입니다...");
    const existingReport = pocDetailReportData[`${expertIndex}-${index}`];

    const currentExpertData = strategyReportData[expertIndex];

    if (!currentExpertData) {
      setLoading(false);
      setDownloadStatus("데이터를 찾을 수 없습니다.");
      return;
    }

    let fileName = `PoC 수행 계획서`; // 기본 파일 이름

    // 목표 행위 텍스트를 파일 이름으로 설정
    const content = currentExpertData.tabs[0].sections[0].content[index];
    if (content && content.subContent) {
      content.subContent.forEach((subItem) => {
        if (subItem.subTitle === "목표 행위") {
          fileName = `${subItem.text} - PoC 수행 계획서`; // "목표 행위" 텍스트를 파일 이름으로 사용
        }
      });
    }

    if (existingReport) {
      // 저장된 데이터를 사용하여 PDF 생성
      const cleanedContent = existingReport;
      setTimeout(() => {
        generatePDF(cleanedContent, index, fileName); // PDF 생성 함수 호출을 약간 지연
      }, 0);
      return;
    }

    // 요청에 필요한 데이터 준비
    const data = {
      expert_id: selectedExpertIndex,
      business_info: titleOfBusinessInfo,
      business_analysis_data: {
        명칭: analysisReportData.title,
        주요_목적_및_특징: analysisReportData.mainFeatures,
        주요기능: analysisReportData.mainCharacter,
        목표고객: analysisReportData.mainCustomer,
      },
      goal: selectedPocOptions[0],
      standpoint: selectedPocOptions[1],
      target: selectedPocTarget.job,
      poc_data: extractSpecificContent(strategyReportData, expertIndex, index),
      tabs: currentExpertData.tabs,
      page_index: 1,
    };

    try {
      // API 요청 보내기
      const response = await axios.post(
        "https://wishresearch.kr/panels/expert/poc_report",
        data
      );

      // 응답으로부터 보고서 내용 가져오기
      const reportContent = response.data.poc_report;

      // Markdown 스타일 제거 (정규식 사용)
      const cleanedContent = reportContent
        .replace(/##/g, "") // 제목 표시 '##' 제거
        .replace(/\*\*/g, "") // 굵은 글씨 '**' 제거
        .replace(/\*/g, "") // 이탤릭체 '*' 제거
        .replace(/-\s/g, "• ") // 리스트 '-'를 '•'로 변환
        .replace(/\n/g, "<br/>"); // 줄바꿈을 <br>로 변환

      // Atom에 보고서 내용을 저장
      setpocDetailReportData((prevReport) => ({
        ...prevReport,
        [`${expertIndex}-${index}`]: cleanedContent,
      }));

      // 저장 후 indexedDB에도 저장
      await saveConversationToIndexedDB(
        {
          id: conversationId,
          inputBusinessInfo: inputBusinessInfo,
          analysisReportData: analysisReportData,
          selectedAdditionalKeywords: selectedKeywords,
          conversationStage: 3,
          strategyReportData: strategyReportData, // Save the entire strategyReportData
          conversation: conversation,
          selectedAdditionalKeywords: selectedAdditionalKeyword,
          selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
          additionalReportData: additionalReportData,
          customerAdditionalReportData: customerAdditionalReportData,
          timestamp: Date.now(),
          expert_index: selectedExpertIndex,
          selectedPocOptions: selectedPocOptions,
          pocPersonaList: pocPersonaList,
          selectedPocTarget: selectedPocTarget,
          recommendedTargetData: recommendedTargetData,
          pocDetailReportData: {
            ...pocDetailReportData,
            [`${expertIndex}-${index}`]: cleanedContent,
          },
        },
        isLoggedIn,
        conversationId
      );

      // PDF 생성 함수 호출
      generatePDF(cleanedContent, index, fileName);
    } catch (error) {
      console.error("Error fetching report:", error);
      setLoading(false);
      setDownloadStatus("다운로드 실패");
      setTimeout(() => {
        setDownloadStatus("");
      }, 2000);
    }
  };

  function extractSpecificContent(
    strategyReportData,
    expertIndex,
    contentIndex
  ) {
    let specificContent = null;

    const currentExpertData = strategyReportData[expertIndex];

    // 첫 번째 tab의 첫 번째 section에서 특정 인덱스의 content 항목을 가져옴
    if (
      currentExpertData &&
      currentExpertData.tabs.length > 0 &&
      currentExpertData.tabs[0].sections.length > 0
    ) {
      const contentItem =
        currentExpertData.tabs[0].sections[0].content[contentIndex];

      if (contentItem) {
        specificContent = {
          title: contentItem.title,
          text: contentItem.text,
          subContent: contentItem.subContent.map((subItem) => ({
            subTitle: subItem.subTitle,
            text: subItem.text,
          })),
        };
      }
    }

    return specificContent;
  }

  const handleDownloadDocx = async (language, index) => {
    setLoading(true); // 로딩 상태 시작
    setDownloadStatus("다운로드 중입니다...");

    // `strategyReportData`에서 필요한 정보를 직접 가져옴
    const currentExpertData = strategyReportData[expertIndex];

    if (!currentExpertData) {
      setLoading(false);
      setDownloadStatus("데이터를 찾을 수 없습니다.");
      return;
    }

    // 기존에 저장된 보고서가 있는지 확인
    const existingReport = pocDetailReportData[`${expertIndex}-${index}`];

    let fileName = `PoC 수행 계획서`; // 기본 파일 이름

    // 목표 행위 텍스트를 파일 이름으로 설정
    const content = currentExpertData.tabs[0].sections[0].content[index];
    if (content && content.subContent) {
      content.subContent.forEach((subItem) => {
        if (subItem.subTitle === "목표 행위") {
          fileName = `${subItem.text} - PoC 수행 계획서`; // "목표 행위" 텍스트를 파일 이름으로 사용
        }
      });
    }

    // 이미 저장된 데이터가 있는 경우 해당 데이터를 사용
    if (existingReport) {
      generateDocx(existingReport, index, fileName); // DOCX 생성 함수 호출
      return;
    }

    // 요청에 필요한 데이터 준비
    const data = {
      expert_id: selectedExpertIndex,
      business_info: titleOfBusinessInfo, // DB에서 가져온 titleOfBusinessInfo 사용
      business_analysis_data: {
        명칭: analysisReportData.title,
        주요_목적_및_특징: analysisReportData.mainFeatures,
        주요기능: analysisReportData.mainCharacter,
        목표고객: analysisReportData.mainCustomer,
      },
      goal: selectedPocOptions[0],
      standpoint: selectedPocOptions[1],
      target: selectedPocTarget.job,
      poc_data: extractSpecificContent(strategyReportData, expertIndex, index), // strategyReportData에서 추출
      tabs: currentExpertData.tabs, // strategyReportData에서 직접 가져옴
      page_index: 1,
    };

    try {
      // API 요청 보내기
      const response = await axios.post(
        "https://wishresearch.kr/panels/expert/poc_report",
        data
      );

      // 응답으로부터 보고서 내용 가져오기
      const reportContent = response.data.poc_report; // 실제 응답 구조에 맞춰 수정 필요

      // Markdown 스타일 제거 (정규식 사용)
      const cleanedContent = reportContent
        .replace(/##/g, "") // 제목 표시 '##' 제거
        .replace(/\*\*/g, "") // 굵은 글씨 '**' 제거
        .replace(/\*/g, "") // 이탤릭체 '*' 제거
        .replace(/-\s/g, "• ") // 리스트 '-'를 '•'로 변환
        .replace(/\n/g, "<br/>"); // 줄바꿈을 <br>로 변환

      // Atom에 보고서 내용을 저장
      setpocDetailReportData((prevReport) => ({
        ...prevReport,
        [`${expertIndex}-${index}`]: cleanedContent,
      }));

      // 저장 후 DOCX 생성 함수 호출
      generateDocx(reportContent, index, fileName);

      // 저장 후 indexedDB에도 저장
      await saveConversationToIndexedDB(
        {
          id: conversationId,
          inputBusinessInfo: inputBusinessInfo,
          analysisReportData: analysisReportData,
          selectedAdditionalKeywords: selectedKeywords,
          conversationStage: 3,
          strategyReportData: strategyReportData, // Save the entire strategyReportData
          conversation: conversation,
          selectedAdditionalKeywords: selectedAdditionalKeyword,
          selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
          additionalReportData: additionalReportData,
          customerAdditionalReportData: customerAdditionalReportData,
          timestamp: Date.now(),
          expert_index: selectedExpertIndex,
          selectedPocOptions: selectedPocOptions,
          pocPersonaList: pocPersonaList,
          selectedPocTarget: selectedPocTarget,
          recommendedTargetData: recommendedTargetData,
          pocDetailReportData: {
            ...pocDetailReportData,
            [`${expertIndex}-${index}`]: reportContent,
          },
        },
        isLoggedIn,
        conversationId
      );
    } catch (error) {
      console.error("Error fetching report:", error);
      setLoading(false);
      setDownloadStatus("다운로드 실패");
      setTimeout(() => {
        setDownloadStatus("");
      }, 2000);
    }
  };

  // DOCX 파일을 생성하는 함수
  const generateDocx = (content, index, fileName) => {
    try {
      // Word 문서용 전처리
      const cleanedContent = content
        .replace(/##/g, "") // 제목 표시 '##' 제거
        .replace(/\*\*/g, "") // 굵은 글씨 '**' 제거
        .replace(/\*/g, "") // 이탤릭체 '*' 제거
        .replace(/-\s/g, "• ") // 리스트 '-'를 '•'로 변환
        .replace(/<br\/>/g, "\n"); // <br/>을 줄바꿈으로 변환

      // 줄바꿈 기준으로 텍스트 분리
      const contentParagraphs = cleanedContent.split("\n").map((line) => {
        return new Paragraph({
          children: [
            new TextRun({
              text: line,
            }),
          ],
        });
      });

      // 문서 생성을 위한 docx Document 객체 생성
      const doc = new Document({
        sections: [
          {
            children: [
              ...contentParagraphs, // 분리된 각 줄을 Paragraph로 추가
            ],
          },
        ],
      });

      // docx 파일 패킹 및 다운로드
      Packer.toBlob(doc)
        .then((blob) => {
          saveAs(blob, `${fileName}.docx`);
          setDownloadStatus("다운로드 완료");

          // 2초 후 상태 리셋
          setTimeout(() => {
            setLoading(false);
            setDownloadStatus("");
          }, 2000);
        })
        .catch((error) => {
          console.error("Error generating DOCX:", error);
          setLoading(false);
          setDownloadStatus("다운로드 실패");
          setTimeout(() => {
            setDownloadStatus("");
          }, 2000);
        });
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };

  // 팝업 외부 클릭 시 닫히도록 처리하는 useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsAutoSaveToggle(false); // 외부 클릭 시 팝업 닫기
      }
    };

    if (isAutoSaveToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAutoSaveToggle]);

  // 데이터를 추출하는 함수 (필요 시 수정)
  const extractTextContent = (data) => {
    let textContent = "";
    if (typeof data === "string") {
      return data + "\n";
    }
    if (Array.isArray(data)) {
      data.forEach((item) => {
        textContent += extractTextContent(item);
      });
    } else if (typeof data === "object" && data !== null) {
      Object.values(data).forEach((value) => {
        textContent += extractTextContent(value);
      });
    }
    return textContent;
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);  // 선택된 언어 상태를 설정
  };

  // 기존 subTitle과 text를 합쳐 새로운 text 생성

  return (
    <BoxWrap
      expertIndex={expertIndex}
      isLast={isLast}
      selectedTab={selectedTab}
      title={title}
      index={index}
    >
      {/* 보이지 않도록 설정된 캡처 대상 영역 */}

      {/* 4번 전문가 */}
      {expertIndex === "4" ? (
        <>
          {/* content 배열이 존재하는 경우 */}
          {content &&
            content.length > 0 &&
            content.map((item, index) => (
              <SeparateSection key={index}>
                {/* 항목 번호 및 제목 */}
                <strong_title>
                  <span className="number">{index + 1}</span>{" "}
                  <strong_title>{`${title} : ${item.title}`}</strong_title>{" "}
                  <DownloadButton
                    className={`download-button`}
                    ref={buttonRef}
                    onClick={(event) => handleOpenModal(index, event)}
                    disabled={loading}
                    isModalOpen={isModalOpen[index]}
                  >
                    {loading ? downloadStatus : "다운로드"}
                  </DownloadButton> 
                </strong_title>
                {/* 항목 내용 */}
                <p style={{ marginTop: "15px", marginBottom: "15px" }}>
                  <div
                    id={`print-content-${index}`}
                    style={{ position: "absolute", bottom: "-10000px" }}
                  />
                  {item.text}
                </p>

                {/* subContent가 존재하는 경우 */}
                {item.subContent && item.subContent.length > 0 && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    {item.subContent.map((subItem, subIndex) => (
                      <div key={subIndex} style={{ marginTop: "3px" }}>
                        <p style={{ textIndent: '-1em', paddingLeft: '1em', marginBottom: '5px' }} key={subIndex}>
                          {subIndex + 1}. {subItem.subTitle} : {subItem.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {/* 모달도 각 Section과 관련되어 렌더링 */}
               {isModalOpen[index] && (
                  <DownloadPopup
                    ref={popupRef}
                    isAutoSaveToggle={false}
                    style={{ top: popupPosition.top, left: popupPosition.left }}
                  >
                    <div>
                      <h3>PoC 수행 계획서 다운로드</h3>
                      <SelectBoxWrap>
                        <label>포맷 선택 (택1)</label>
                        <SelectBox>
                          <div
                            className={`${selectedFormat === "PDF" ? "selected" : ""}`}
                            onClick={() => handleFormatChange("PDF")}
                          >
                            <img src={images.ImgPDF} alt="" />
                            PDF
                          </div>
                          <div
                            className={`${selectedFormat === "Word" ? "selected" : ""}`}
                            onClick={() => handleFormatChange("Word")}
                          >
                            <img src={images.ImgWord} alt="" />
                            Word
                          </div>
                        </SelectBox>
                      </SelectBoxWrap>
                      <SelectBoxWrap>
                        <label>언어 선택 (택1)</label>
                        <SelectBox>
                          <div
                            className={`${selectedLanguage === "한글" ? "selected" : ""}`}
                            onClick={() => handleLanguageChange("한글")}
                          >
                            <img src={images.ImgKOR} alt="" />
                            한글
                          </div>
                          <div
                            className={`${selectedLanguage === "영문" ? "selected" : ""}`}
                            onClick={() => handleLanguageChange("영문")}
                          >
                            <img src={images.ImgENG} alt="" />
                            영문
                          </div>
                        </SelectBox>
                      </SelectBoxWrap>
                      <div>
                        <button
                          onClick={() => handleDownloadClick(index)}
                          disabled={loading || !selectedLanguage}
                        >
                          {loading ? downloadStatus : selectedLanguage ? "다운로드" : "언어를 선택해주세요"}
                        </button>
                      </div>
                    </div>
                  </DownloadPopup>
                )}
              </SeparateSection>
            ))}
        </>
      ) : expertIndex === "3" && selectedTab === 1 ? (
        <>
          <strong>
            <img src={images.Check} alt="" />
            {title}
          </strong>
          {nonSubTitleItems.length > 0 &&
            nonSubTitleItems.map((item, index) => (
              <div key={index}>
                <p>{item.text}</p>
              </div>
            ))}
          {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
          {subTitleItems.length > 0 &&
            subTitleItems.map((item, index) => (
              <SubTextBox key={index}>
                <SubTitle style={{ marginBottom: "5px" }}>
                  {item.subTitle}
                </SubTitle>
                <p className="dashedLine">{item.text}</p>
              </SubTextBox>
            ))}
        </>
      ) : (
        <>
          {/* title 표시 (특정 타이틀 제외) */}
          {!isLast &&
            title &&
            !(
              title === "주요 차별화 요소" ||
              title === "차별화 전략 제안" ||
              title === "제안 사항" ||
              title === "경쟁 압박 대처 방안" ||
              title === "브랜드 전략분석" ||
              title === "브랜드 아이덴티티" ||
              title === "소비자 인식 관리 방안" ||
              title === "브랜드 신뢰도 구축 방안" ||
              title === "경쟁사 분석 및 차별화 전략" ||
              title === "고객 니즈 및 세분화 분석" ||
              title === "고객 여정 맵핑" ||
              title === "고객 여정 맵핑 터치포인트 단계 최적화 방안" ||
              title === "시장 위치 평가 및 경쟁자 분석" ||
              title === "장기적인 경쟁 우위 전략"
            ) && (
              <>
                <strong>
                  <img src={images.Check} alt="" />
                  {title}
                </strong>
              </>
            )}

          {title === "제안 사항" && (
            <>
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>
              {/* subTitle : text 형태로 넘버링 추가하여 출력 */}
              {content.map((item, index) => (
                <div key={index} style={{ marginTop: "3px" }}>
                  {" "}
                  {/* 각 요소에 마진 추가 */}
                  <p>
                    {index + 1}. {item.subTitle} : {item.text}
                  </p>
                </div>
              ))}
            </>
          )}

          {title === "브랜드 전략분석" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {summaryItem && (
                <p style={{ marginBottom: "15px" }}>{summaryItem.text}</p> // 총평 텍스트를 제목 밑에 표시
              )}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "브랜드 아이덴티티" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {summaryItem && (
                <p style={{ marginBottom: "15px" }}>{summaryItem.text}</p> // 총평 텍스트를 제목 밑에 표시
              )}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "경쟁사 분석 및 차별화 전략" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* 총평 항목 필터링 */}
              {content
                .filter(
                  (item) => item.title === "경쟁사 분석 및 차별화 전략 설명"
                )
                .map((summaryItem, index) => (
                  <p key={index} style={{ marginBottom: "15px" }}>
                    {summaryItem.text} {/* 총평 텍스트를 제목 밑에 표시 */}
                  </p>
                ))}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "고객 니즈 및 세분화 분석" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* 총평 항목 필터링 */}
              {content
                .filter((item) => item.title === "고객 니즈 분석")
                .map((summaryItem, index) => (
                  <p key={index} style={{ marginBottom: "15px" }}>
                    {summaryItem.text} {/* 총평 텍스트를 제목 밑에 표시 */}
                  </p>
                ))}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "고객 여정 맵핑" && (
            <>
              {/* 제목과 총평 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* 총평 항목 필터링 */}
              {content
                .filter((item) => item.title === "고객 여정 맵핑")
                .map((summaryItem, index) => (
                  <p key={index} style={{ marginBottom: "15px" }}>
                    {summaryItem.text} {/* 총평 텍스트를 제목 밑에 표시 */}
                  </p>
                ))}

              {/* subTitle : text 형태로 하얀 박스 안에 출력 */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "브랜드 신뢰도 구축 방안" && (
            <>
              {/* 제목 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* subTitle : text 형태로 기본 박스 안에 출력 */}
              {/* <div style={{ padding: "15px", borderRadius: "10px" }}> */}
              <div>
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {title === "소비자 인식 관리 방안" && (
            <>
              {/* 제목 출력 */}
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>

              {/* subTitle : text 형태로 기본 박스 안에 출력 */}
              {/* <div style={{ padding: "15px", borderRadius: "10px" }}> */}
              <div>
                {subItems.map((item, index) => (
                  <div key={index} style={{ marginTop: "3px" }}>
                    {" "}
                    {/* 각 항목 간 마진 추가 */}
                    <p className="dashedLine">
                      {item.subTitle} : {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* "시장 위치 평가 및 경쟁자 분석"일 때 별도의 처리 */}
          {title === "시장 위치 평가 및 경쟁자 분석" && (
            <>
              <strong>
                <img src={images.Check} alt="" />
                {title}
              </strong>
              {nonSubTitleItems.length > 0 && <p>{nonSubTitleItems[0].text}</p>}

              <BgStyledSection>
                <div className="flexBox">
                  {subTitleItems.map((item, index) => (
                    <div className="bgWhite" key={index}>
                      <strong className="title">
                        {/* 번호 표시를 위한 span.number */}
                        <span className="number">{index + 1}</span>
                        {item.subTitle}
                      </strong>
                      <ul>
                        {item.subText1 && (
                          <li className="dashedLine">
                            {item.subText1.startsWith("강점:")
                              ? item.subText1
                              : `강점: ${item.subText1}`}
                          </li>
                        )}
                        {item.subText2 && (
                          <li className="dashedLine">
                            {item.subText2.startsWith("약점:")
                              ? item.subText2
                              : `약점: ${item.subText2}`}
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </BgStyledSection>
            </>
          )}

          {title === "고객 여정 맵핑 터치포인트 단계 최적화 방안" && (
            <BgStyledSection>
              <h4>
                <img src={images.Check} alt="" />
                {title}
              </h4>

              <div className="flexBox">
                {content.map((item, index) => (
                  <div className="bgWhite" key={index}>
                    <strong className="title">
                      {/* 번호 표시를 위한 span.number */}
                      <span className="number">{index + 1}</span>
                      {item.subTitle}
                    </strong>
                    <p>{item.text}</p> {/* text 필드에서 데이터 출력 */}
                  </div>
                ))}
              </div>
            </BgStyledSection>
          )}

          {(title === "경쟁사 대비 차별화 전략" ||
            title === "시장 내 경쟁 우위 확보 방안" ||
            title === "주요 타겟층 특징" ||
            title === "콘텐츠 및 마케팅 전략") && (
            <>
              {title_text && <p>{title_text}</p>}

              <DoubleGrid columns={2} style={{ padding: "0" }}>
                {" "}
                {/* 2개의 컬럼을 생성하여 가로로 나열 */}
                {content.map((section, sectionIndex) => (
                  <SectionWrapper key={sectionIndex}>
                    {" "}
                    {/* 각 섹션을 감싸는 div */}
                    {/* section.title 출력 */}
                    <SubTitle>{section.title}</SubTitle>
                    {/* subContent를 하나의 DynamicGrid 안에서 출력 */}
                    {section.subContent.map((item, itemIndex) => (
                      <div key={itemIndex} style={{ marginBottom: "0" }}>
                        <p className="dashedLine">
                          {item.subTitle} : {item.text}
                        </p>
                      </div>
                    ))}
                  </SectionWrapper>
                ))}
              </DoubleGrid>
            </>
          )}

          {/* "특징" 또는 "차별화 요소" 섹션을 처리 */}
          {(title === "특징" || title === "차별화 요소") &&
            subTitleItems.length > 0 && (
              <>
                {subTitleItems.map((item, index) => (
                  <SeparateSection key={index}>
                    <SectionWrapper_2>
                      <strong>
                        <span className="number">{index + 1}</span>{" "}
                        {/* 번호 추가 */}
                        <strong_title>{`${title} : ${item.subTitle}`}</strong_title>{" "}
                        {/* 이 부분만 bold 처리 */}
                      </strong>
                      <p>{item.text}</p>

                      {/* subContent가 존재하는 경우 */}
                      {item.subContent && item.subContent.length > 0 ? (
                        <NumDynamicGrid columns={2}>
                          {item.subContent[0] && (
                            <div>
                              <SubTitle>{item.subContent[0].subTitle}</SubTitle>
                              <p>{item.subContent[0].text}</p>
                            </div>
                          )}
                          {item.subContent[1] && (
                            <div>
                              <SubTitle>{item.subContent[1].subTitle}</SubTitle>
                              <p>{item.subContent[1].text}</p>
                            </div>
                          )}
                          {item.subContent[2] && (
                            <div>
                              <SubTitle>{item.subContent[2].subTitle}</SubTitle>
                              <p>{item.subContent[2].text}</p>
                            </div>
                          )}
                        </NumDynamicGrid>
                      ) : (
                        // subContent가 없을 경우 아래 섹션 적용
                        <NumDynamicGrid columns={2}>
                          {item.subText1 && (
                            <div>
                              <SubTitle>
                                {splitText(item.subText1).subTitle}
                              </SubTitle>
                              <p>{splitText(item.subText1).text}</p>
                            </div>
                          )}
                          {item.subText2 && (
                            <div>
                              <SubTitle>
                                {splitText(item.subText2).subTitle}
                              </SubTitle>
                              <p>{splitText(item.subText2).text}</p>
                            </div>
                          )}
                          {item.subText3 && (
                            <div>
                              <SubTitle>
                                {splitText(item.subText3).subTitle}
                              </SubTitle>
                              <p>{splitText(item.subText3).text}</p>
                            </div>
                          )}
                        </NumDynamicGrid>
                      )}
                    </SectionWrapper_2>
                  </SeparateSection>
                ))}
              </>
            )}

          {/* "특징", "차별화 요소", "경쟁 분석"이 아닌 경우 기존 방식대로 처리 */}
          {title !== "특징" &&
            title !== "차별화 요소" &&
            title !== "제안 사항" &&
            title !== "시장 위치 평가 및 경쟁자 분석" &&
            title !== "주요 차별화 요소" &&
            title !== "브랜드 전략분석" &&
            title !== "브랜드 아이덴티티" &&
            title !== "브랜드 신뢰도 구축 방안" &&
            title !== "소비자 인식 관리 방안" &&
            title !== "차별화 전략 제안" &&
            title !== "경쟁사 분석 및 차별화 전략" &&
            title !== "고객 니즈 및 세분화 분석" &&
            title !== "고객 여정 맵핑" &&
            title !== "고객 여정 맵핑 터치포인트 단계 최적화 방안" &&
            title !== "경쟁사 대비 차별화 전략" &&
            title !== "경쟁 압박 대처 방안" &&
            title !== "장기적인 경쟁 우위 전략" && (
              <>
                {/* nonSubTitleItems는 일반적으로 title과 text만 표시 */}

                {nonSubTitleItems.length > 0 &&
                  nonSubTitleItems.map((item, index) => (
                    <>
                      <div key={index}>
                        <p>{item.text}</p>
                        {item.subText1 && (
                          <SubTextBox>{item.subText1}</SubTextBox>
                        )}
                        {item.subText2 && (
                          <SubTextBox>{item.subText2}</SubTextBox>
                        )}
                        {item.subText3 && (
                          <SubTextBox>{item.subText3}</SubTextBox>
                        )}
                      </div>
                    </>
                  ))}

                {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
                {subTitleItems.length > 0 && (
                  <>
                    <DynamicGrid columns={subTitleItems.length}>
                      {subTitleItems.map((item, index) => (
                        <div key={index}>
                          <SubTitle>{item.subTitle}</SubTitle>
                          <p>{item.text}</p>
                          {item.subText1 && (
                            <SubTextBox>{item.subText1}</SubTextBox>
                          )}
                          {item.subText2 && (
                            <SubTextBox>{item.subText2}</SubTextBox>
                          )}
                          {item.subText3 && (
                            <SubTextBox>{item.subText3}</SubTextBox>
                          )}
                        </div>
                      ))}
                    </DynamicGrid>
                  </>
                )}
              </>
            )}
        </>
      )}
    </BoxWrap>
  );
};

export default OrganismStrategyReportSection;
const SeparateSection = styled.div`
  position:relative;
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.03);

  + div {
    margin-top: 12px;
  }

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  span.number {
    width: 15px;
    height: 15px;
    font-size: 0.63rem;
    color: ${palette.blue};
    line-height: 15px;
    text-align: center;
    border: 1px solid ${palette.blue};
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
  }

  strong_title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    font-weight: 700;
    color: ${palette.darkGray};
    word-break: break-word; // 긴 제목이 줄바꿈되도록 설정
    max-width: calc(100% - 50px); // 버튼 영역을 고려한 최대 너비 설정
  }

  p {
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
  }

  .flexBox {
    display: flex;
    gap: 12px;
    margin-top: 12px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid ${palette.lineGray};

      p {
        overflow: visible;
        // text-overflow: ellipsis;
        display: flex;
        // -webkit-line-clamp: 3;
        // -webkit-box-orient: vertical;
      }
    }

    .bgWhite {
      margin-top: 0 !important;
    }
  }

  .bgWhite {
    padding: 15px !important;
    margin-top: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.white} !important;
    background: ${palette.white};

    .title {
      color: ${palette.black};
      font-weight: 700;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;

    li {
      position: relative;
      font-size: 0.875rem;
      color: ${palette.darkGray};
      line-height: 1.5;
      padding-left: 13px;

      &:before {
        position: absolute;
        top: 8px;
        left: 0;
        width: 5px;
        height: 1px;
        background: ${palette.black};
        content: "";
      }
    }
  }
`;

const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  `;

const AnalysisSection = styled.div`
  position: relative;
  max-width: 1135px;
  width: 91.5%;
  text-align: left;
  margin-top: 25px;
  margin-left:50px;
  padding: 30px;
  border-radius: 15px;
  border: 1px solid ${palette.lineGray};

  h1 {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 20px;
  }

  > p {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 15px;

    span {
      color: ${palette.red};
    }
  }
`;

const BoxWrap = styled.div`
  padding: ${(props) =>
    props.title === "특징" || props.title === "차별화 요소"
      ? "0"
      : props.isLast
      ? "0"
      : "20px"};

  border-radius: 10px;
  background: ${(props) =>
    props.title === "특징" || props.title === "차별화 요소"
      ? palette.white
      : props.isLast
      ? palette.white
      : "rgba(0, 0, 0, 0.03)"};

  + div {
    margin-top: 12px;
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    color: ${(props) =>
      props.expertIndex === "1"
        ? palette.darkGray // 1번 전문가일 때 글자색 파란색
        : props.expertIndex === "2"
        ? palette.darkGray // 2번 전문가일 때 글자색 빨간색
        : palette.darkGray}; // 3번 전문가일 때 글자색 녹색
  }

  p {
    font-size: 0.875rem;
    color: ${(props) =>
      props.expertIndex === "1"
        ? palette.darkGray
        : props.expertIndex === "2"
        ? palette.darkGray
        : palette.darkGray};
    line-height: 1.5;
    word-wrap: break-word; /* 단어가 긴 경우 자동 줄바꿈 */
    overflow: visible; /* 내용이 넘치면 자동으로 박스가 확장됨 */
    height: auto; /* 박스의 높이가 내용에 맞춰 자동으로 조정 */
  }

  .dashedLine {
    position: relative;
    padding-left: 12px;

    &:before {
      position: absolute;
      left: 0;
      // top:10px;
      top: 0;
      // width:5px;
      // height:1px;
      // background:${palette.darkGray};
      content: "-";
    }
  }

  /* 마지막 섹션일 경우 title을 숨기고, 내부 텍스트만 보이도록 */
  ${(props) =>
    props.isLast &&
    `
      strong {
        display: none;
      }
    `}
`;

const TabHeader = styled.div`
  position:relative;
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
`;

// color: ${(props) => (props.active ? palette.black : palette.lightGray)};

const TabButton = styled.button`
  font-family: "Pretendard", "Poppins";
  font-size: 1.25rem;
  font-weight: 400;

  color: ${(props) =>
    props.active
      ? palette.black
      : props.expertIndex === "1"
      ? `rgba(0,0,0,.2)` // 1번 전문가일 때
      : props.expertIndex === "2"
      ? `rgba(0,0,0,.2)` // 2번 전문가일 때
      : `rgba(0,0,0,.2)`}; // 3번 전문가일 때
  border: none;
  border-bottom: ${(props) =>
    props.active ? `1px solid ${palette.black}` : "none"};
  background: ${palette.white};
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    color: ${palette.black};
  }

  &:focus {
    outline: none;
  }
`;

// DynamicGrid로 그리드 컬럼의 갯수를 서브 타이틀 갯수에 맞춰 동적으로 설정
const DynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 10px;
  margin-top: 10px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  p {
    height: 64px;
    margin: 0;
    // overflow: hidden;
    // text-overflow: ellipsis;
    display: flex;
    // -webkit-line-clamp: 3;
    // -webkit-box-orient: vertical;
    overflow-y: auto;
    scrollbar-width: thin;
  }
`;

const SubTitle = styled.strong`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${palette.lightGray} !important;
  text-align: left;
  margin-bottom: 0;
`;

const SubTextBox = styled.div`
  background: ${palette.white};
  padding: 16px;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 0.875rem;
  color: ${palette.gray};
  border: 0 !important;
`;

const Spacing = styled.div`
  margin-bottom: 40px; /* 제목과 본문 사이의 간격 */
`;
const NumDynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    1fr
  ); /* 동적 컬럼 수 설정 */
  gap: 10px;
  margin-top: 10px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
    position: relative; /* 번호 표시를 위한 상대적 위치 */

    /* 각 div 내에서 번호를 표시하는 span.number */
    span.number {
      width: 20px;
      height: 20px;
      font-size: 0.75rem;
      color: ${palette.blue};
      line-height: 20px;
      text-align: center;
      border: 1px solid ${palette.blue};
      position: absolute;
      top: -10px;
      left: -10px;
      background-color: ${palette.white}; /* 번호 배경색 */
      border-radius: 50%;
    }
  }

  p {
    height: 64px;
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${palette.darkGray};
    line-height: 1.5;
    word-wrap: break-word;
    display: flex;
    // -webkit-line-clamp: 3 ;
    // -webkit-box-orient: vertical;
    // overflow: hidden;
    // text-overflow: ellipsis;
    overflow-y: auto;
    scrollbar-width: thin;
  }
`;
const BgStyledSection = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 20px;
  // border-radius: 10px;
  // background: rgba(0, 0, 0, 0);

  h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .flexBox {
    display: flex;
    gap: 12px;
    margin-top: 12px;

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px; /* BgBox와 동일하게 설정 */
      padding: 12px; /* BgBox와 동일하게 설정 */
      border-radius: 10px;
      border: 1px solid ${palette.lineGray};
      background-color: ${palette.white}; /* 하얀 배경 */

      .number {
        width: 15px; /* 크기를 BgBox와 동일하게 맞춤 */
        height: 15px;
        font-size: 0.63rem;
        color: ${palette.blue};
        line-height: 15px;
        text-align: center;
        border: 1px solid ${palette.blue};
        background-color: ${palette.white}; /* 번호 배경색 */
      }

      .title {
        color: ${palette.black};
        font-weight: 700;
        margin-bottom: 8px;
        font-size: 0.875rem;
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: 5px;

        li {
          font-size: 0.875rem;
          color: ${palette.darkGray};
          line-height: 1.5;
          padding-left: 13px;

          &:before {
            position: absolute;
            top: 8px;
            left: 0;
            width: 5px;
            height: 1px;
            background: ${palette.black};
            content: "";
          }
        }
      }
    }

    .bgWhite {
      border: 0;
    }
  }
`;
const DoubleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 10px;
  margin-top: 10px;
  padding: 12px; /* 가장 큰 div에 padding 적용 */
  border-radius: 10px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    /* 각 개별 div에서는 border를 제거 */
  }

  p {
    margin: 0;
    /* 텍스트가 생략되지 않도록 아래 스타일을 제거 */
    overflow: visible; /* 숨기지 않도록 */
    text-overflow: unset; /* 생략하지 않음 */
    display: block; /* 줄바꿈을 정상적으로 처리 */
  }
`;
const SectionWrapper = styled.div`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray}; /* 각 section에만 border 적용 */
  margin-bottom: 10px; /* 섹션 간 간격 추가 */

  div {
    margin-bottom: 8px; /* subContent 간의 간격 */
  }
`;
const SectionWrapper_2 = styled.div`
  // padding: 12px;
  // border-radius: 10px;
  // border: 1px solid ${palette.lineGray};
`;
const DownloadButton = styled.button`
  position: absolute; /* 절대 위치 */
  top:14px;
  right: 20px; /* 오른쪽 끝으로 배치 */
  display:flex;
  align-items:center;
  gap:4px;
  font-family:Pretendard, Poppins;
  font-size:0.75rem;
  font-weight:500;
  color: ${props => props.isModalOpen ? palette.blue : palette.gray500};
  padding: 8px 0;
  border: none;
  background:none;
  cursor: pointer;
  z-index: 9;
  transition:all .5s;

  &:after {
    width:16px;
    height:16px;
    ${props => props.isModalOpen ? 
      `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.9668 1.91406C5.08247 1.91406 1.93359 5.06293 1.93359 8.94727C1.93359 12.8316 5.08247 15.9805 8.9668 15.9805C12.8511 15.9805 16 12.8316 16 8.94727C16 5.06293 12.8511 1.91406 8.9668 1.91406ZM0.933594 8.94727C0.933594 4.51065 4.53018 0.914062 8.9668 0.914062C13.4034 0.914062 17 4.51065 17 8.94727C17 13.3839 13.4034 16.9805 8.9668 16.9805C4.53018 16.9805 0.933594 13.3839 0.933594 8.94727Z' fill='%230453F4'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.51499 9.30487C6.32573 9.49131 6.32573 9.79807 6.51499 9.98451L8.6359 12.0738C8.81967 12.2548 9.1139 12.2548 9.29767 12.0738L11.4186 9.98451C11.6078 9.79807 11.6078 9.49131 11.4186 9.30487C11.2348 9.12384 10.9406 9.12384 10.7568 9.30487L9.43962 10.6024V6.15919C9.43962 5.88712 9.2187 5.68359 8.96679 5.68359C8.71487 5.68359 8.49395 5.88712 8.49395 6.15919V10.6024L7.17677 9.30487C6.99299 9.12384 6.69877 9.12384 6.51499 9.30487Z' fill='%230453F4'/%3E%3C/svg%3E");` 
      : `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.9668 1.91406C5.08247 1.91406 1.93359 5.06293 1.93359 8.94727C1.93359 12.8316 5.08247 15.9805 8.9668 15.9805C12.8511 15.9805 16 12.8316 16 8.94727C16 5.06293 12.8511 1.91406 8.9668 1.91406ZM0.933594 8.94727C0.933594 4.51065 4.53018 0.914062 8.9668 0.914062C13.4034 0.914062 17 4.51065 17 8.94727C17 13.3839 13.4034 16.9805 8.9668 16.9805C4.53018 16.9805 0.933594 13.3839 0.933594 8.94727Z' fill='%238c8c8c'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.51499 9.30487C6.32573 9.49131 6.32573 9.79807 6.51499 9.98451L8.6359 12.0738C8.81967 12.2548 9.1139 12.2548 9.29767 12.0738L11.4186 9.98451C11.6078 9.79807 11.6078 9.49131 11.4186 9.30487C11.2348 9.12384 10.9406 9.12384 10.7568 9.30487L9.43962 10.6024V6.15919C9.43962 5.88712 9.2187 5.68359 8.96679 5.68359C8.71487 5.68359 8.49395 5.88712 8.49395 6.15919V10.6024L7.17677 9.30487C6.99299 9.12384 6.69877 9.12384 6.51499 9.30487Z' fill='%238c8c8c'/%3E%3C/svg%3E");`}
    background-size:cover;
    transition:all .5s;
    content:'';
  }

  &:hover {
    color:${palette.blue};

    &:after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.9668 1.91406C5.08247 1.91406 1.93359 5.06293 1.93359 8.94727C1.93359 12.8316 5.08247 15.9805 8.9668 15.9805C12.8511 15.9805 16 12.8316 16 8.94727C16 5.06293 12.8511 1.91406 8.9668 1.91406ZM0.933594 8.94727C0.933594 4.51065 4.53018 0.914062 8.9668 0.914062C13.4034 0.914062 17 4.51065 17 8.94727C17 13.3839 13.4034 16.9805 8.9668 16.9805C4.53018 16.9805 0.933594 13.3839 0.933594 8.94727Z' fill='%230453F4'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.51499 9.30487C6.32573 9.49131 6.32573 9.79807 6.51499 9.98451L8.6359 12.0738C8.81967 12.2548 9.1139 12.2548 9.29767 12.0738L11.4186 9.98451C11.6078 9.79807 11.6078 9.49131 11.4186 9.30487C11.2348 9.12384 10.9406 9.12384 10.7568 9.30487L9.43962 10.6024V6.15919C9.43962 5.88712 9.2187 5.68359 8.96679 5.68359C8.71487 5.68359 8.49395 5.88712 8.49395 6.15919V10.6024L7.17677 9.30487C6.99299 9.12384 6.69877 9.12384 6.51499 9.30487Z' fill='%230453F4'/%3E%3C/svg%3E");
    }
  }
`;
const DownloadPopup = styled.div`
  position: absolute;
  right: ${(props) => (props.isAutoSaveToggle ? "0" : "-70px")};
  top: 120px;
  max-width: 288px;
  width:100%;
  max-height: 400px; /* 팝업의 최대 높이를 적절히 설정 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능하게 설정 */
  padding: ${(props) => (props.isAutoSaveToggle ? "0" : "24px 20px 20px")};
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  visibility: ${(props) => (props.isAutoSaveToggle ? "hidden" : "visible")};
  opacity: ${(props) => (props.isAutoSaveToggle ? "0" : "1")};
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 트랜지션 추가 */
  z-index:99;

  &:before {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0px 20px 12px 20px;
    border-color: transparent transparent ${palette.white} transparent;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2));
    // content: "";
    z-index: 0;
  }

  > div {
    display:flex;
    flex-direction:column;
    gap:16px;
  }

  h3 {
    font-size: 0.88rem;
    font-weight: 600;
    color: ${palette.gray800};
  }

  label {
    font-size: 0.875rem;
    color: ${palette.gray};
  }

  select {
    margin-left: 10px;
    padding: 5px;
    border-radius: 5px;
  }

  button {
    width:100%;
    font-family:Pretendard, Poppins;
    font-size:0.88rem;
    color:${palette.white};
    margin-top: 16px;
    padding: 15px 0;
    border-radius: 8px;
    border: none;
    background-color: ${palette.blue};
    cursor: pointer;

    &:disabled {
      background-color: ${palette.lineGray};
      cursor: not-allowed;
    }
  }
`;

const SelectBoxWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;
`;

const SelectBox = styled.div`
  display:flex;
  flex-direction:row;
  gap:8px;

  div {
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:4px;
    min-width:120px;
    font-size:0.75rem;
    text-align:center;
    color:${palette.gray700};
    padding:13px 0;
    border-radius:10px;
    border:1px solid ${palette.gray100};
    cursor:pointer;
    transition:all .5s;

    img {
      width:40px;
      height:40px;
    }

    &.selected {
      font-weight:700;
      color:${palette.gray800};
      border:1px solid ${palette.blue};
      background:rgba(4,83,244,.05);
    }
  }
`;

