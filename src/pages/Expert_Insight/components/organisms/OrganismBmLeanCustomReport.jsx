import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  EXPERT_BUTTON_STATE,
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_ID,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  isLoggedInAtom,
  STRATEGY_REPORT_DATA,
  INPUT_BUSINESS_INFO,
  CONVERSATION_STAGE,
  SELECTED_ADDITIONAL_KEYWORD,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  TARGET_SELECT_BUTTON_STATE,
  SELECTED_POC_OPTIONS,
  SELCTED_POC_TARGET,
  POC_PERSONA_LIST,
  IDEA_PRIORITY_BUTTON_STATE,
  IDEA_LIST,
  IDEA_GROUP,
  RECOMMENDED_TARGET_DATA,
  POC_DETAIL_REPORT_DATA,
  IDEA_FEATURE_DATA,
  IDEA_REQUIREMENT_DATA,
  IDEA_PRIORITY,
  BUTTON_STATE,
  GROWTH_HACKER_REPORT_DATA,
  GROWTH_HACKER_DETAIL_REPORT_DATA,
  KPI_QUESTION_LIST,
  IDEA_MIRO,
  PRICE_SCRAP_DATA,
  PRICE_REPORT_DATA,
  PRICE_PRODUCT,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  PRICE_PRODUCT_SEGMENTATION,
  CASE_HASH_TAG,
  CASE_REPORT_DATA,
  BM_LEAN_AUTO_REPORT_DATA,
  BM_LEAN_CUSTOM_REPORT_BUTTON_STATE,
  BM_QUESTION_LIST,
  SURVEY_GUIDELINE_REPORT_DATA,
  SURVEY_GUIDELINE_DETAIL_REPORT_DATA,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_GOAL_FIXED,
  SURVEY_QUESTION_LIST,
  SELECTED_PROBLEM_OPTIONS,
  BM_LEAN_CUSTOM_REPORT_DATA,
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";

import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";

const OrganismBmLeanCustomReport = () => {
  const [surveyGuidelineReportData, setSurveyGuidelineReportData] = useAtom(SURVEY_GUIDELINE_REPORT_DATA);
  const [surveyGuidelineDetailReportData, setSurveyGuidelineDetailReportData] = useAtom(SURVEY_GUIDELINE_DETAIL_REPORT_DATA);
  const [surveyGoalSuggestionList, setSurveyGoalSuggestionList] = useAtom(SURVEY_GOAL_SUGGESTION_LIST);
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [surveyQuestionList, setSurveyQuestionList] = useAtom(SURVEY_QUESTION_LIST);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);
  const [priceScrapData, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [priceReportData, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [priceSelectedProductSegmentation, setPriceSelectedProductSegmentation] = useAtom(PRICE_SELECTED_PRODUCT_SEGMENTATION);
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(PRICE_PRODUCT_SEGMENTATION);
  const [ideaMiro, setIdeaMiro] = useAtom(IDEA_MIRO);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [growthHackerDetailReportData, setGrowthHackerDetailReportData] = useAtom(GROWTH_HACKER_DETAIL_REPORT_DATA);
  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [conversationId, setConversationId] = useAtom(CONVERSATION_ID);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [selectedPocOptions, setSelectedPocOptions] =
    useAtom(SELECTED_POC_OPTIONS);
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
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
  const [expertButtonState, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE);
  const [targetSelectButtonState, setTargetSelectButtonState] = useAtom(TARGET_SELECT_BUTTON_STATE);
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [strategyReportData] = useAtom(STRATEGY_REPORT_DATA);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [selectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [selectedCustomerAdditionalKeyword] = useAtom(
    SELECTED_CUSTOMER_ADDITIONAL_KEYWORD
  );
  const [additionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);
  const [customerAdditionalReportData] = useAtom(
    CUSTOMER_ADDITIONAL_REPORT_DATA
  );
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [selectedKeywords, setSelectedKeywords] = useAtom(SELECTED_ADDITIONAL_KEYWORD);

  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [isLoadingTarget, setIsLoadingTarget] = useState(false);
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);
  const [pocDetailReportData, setPocDetailReportData] = useAtom(POC_DETAIL_REPORT_DATA);

  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);

  const [bmLeanCustomButtonState, setBmLeanCustomButtonState] = useAtom(BM_LEAN_CUSTOM_REPORT_BUTTON_STATE);

  
  const [ideaList, setIdeaList] = useAtom(IDEA_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [isLoadingIdeaPriority, setIsLoadingIdeaPriority] = useState(false);
  const [bmLeanAutoReportData, setBmLeanAutoReportData] = useAtom(BM_LEAN_AUTO_REPORT_DATA);
  const [bmLeanCustomReportData, setBmLeanCustomReportData] = useAtom(BM_LEAN_CUSTOM_REPORT_DATA);
  const [bmQuestionList, setbmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [selectedProblemOptions, setSelectedProblemOptions] = useAtom(SELECTED_PROBLEM_OPTIONS); // 문제 선택 아톰

  const [isModalOpen, setIsModalOpen] = useState({});
  const [selectedFormat, setSelectedFormat] = useState("Word");
  const [selectedLanguage, setSelectedLanguage] = useState("한글");
  const [isPopupOpenDownload, setIsPopupOpenDownload] = useState(false);
  const popupRef = useRef(null);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };
  
  const togglePopupDownload = () => {
    setIsPopupOpenDownload(!isPopupOpenDownload);
  };
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language); // 선택된 언어 상태를 설정
  };
useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.closest(".download-button")
      ) {
        setIsPopupOpenDownload(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);
  const handleDownloadDocx = async () => {
    setLoadingDownload(true); // 로딩 상태 시작

    let fileName = `Lean Canvas`; // 기본 파일 이름

    // 이미 저장된 데이터가 있는 경우 해당 데이터를 사용
    if (Object.keys(bmLeanCustomReportData).length !== 0) {
      generateDocx(bmLeanCustomReportData, fileName); // DOCX 생성 함수 호출
      return;
    }


    try {
      // Markdown 스타일 제거 (정규식 사용)
      const cleanedContent = bmLeanCustomReportData
        .replace(/##/g, "") // 제목 표시 '##' 제거
        .replace(/\*\*/g, "") // 굵은 글씨 '**' 제거
        .replace(/\*/g, "") // 이탤릭체 '*' 제거
        .replace(/-\s/g, "• ") // 리스트 '-'를 '•'로 변환
        .replace(/\n/g, "<br/>"); // 줄바꿈을 <br>로 변환

      // 저장 후 DOCX 생성 함수 호출
      generateDocx(cleanedContent, fileName);

      // 저장 후 indexedDB에도 저장
      await saveConversationToIndexedDB(
        {
          id: conversationId,
          inputBusinessInfo: inputBusinessInfo,
          analysisReportData: analysisReportData,
          selectedAdditionalKeywords: selectedKeywords,
          conversationStage: 3,
          strategyReportData: strategyReportData,
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
          pocDetailReportData: pocDetailReportData,
          ideaFeatureData : ideaFeatureData,
          ideaRequirementData : ideaRequirementData,
          ideaList : ideaList,
          ideaGroup : ideaGroup,
          ideaPriority : ideaPriority,
          ideaMiro : ideaMiro,
          buttonState : buttonState,
          growthHackerReportData : growthHackerReportData,
          growthHackerDetailReportData : cleanedContent,
          KpiQuestionList : KpiQuestionList,
          priceScrapData : priceScrapData,
          priceReportData : priceReportData,
          priceProduct : priceProduct,
          priceSelectedProductSegmentation : priceSelectedProductSegmentation,
          priceProductSegmentation : priceProductSegmentation,
          caseHashTag : caseHashTag,
          caseReportData : caseReportData,

          surveyGuidelineReportData : surveyGuidelineReportData,
          surveyGuidelineDetailReportData : surveyGuidelineDetailReportData,
          surveyGoalSuggestionList: surveyGoalSuggestionList,
          surveyGoalFixed: surveyGoalFixed,
          surveyQuestionList: surveyQuestionList,
        },
        isLoggedIn,
        conversationId
      );
    } catch (error) {
      console.error("Error fetching report:", error);
      setLoadingDownload(false);
      setTimeout(() => {
      }, 2000);
    }
  };

  // DOCX 파일을 생성하는 함수
  const generateDocx = (content, fileName) => {
    try {
      // JSON 데이터를 순회하여 섹션별 Paragraph 생성
      const contentParagraphs = content.flatMap((section) => {
        // section 제목
        const sectionTitle = new Paragraph({
          children: [
            new TextRun({
              text: section.section,
              bold: true, // 제목을 굵게 표시
            }),
          ],
        });
  
        // 각 section의 content를 순회하며 제목, 설명, 키워드 처리
        const contentItems = section.content.flatMap((contentItem) => {
          const titleParagraph = new Paragraph({
            children: [
              new TextRun({
                text: contentItem.title,
                bold: true,
              }),
            ],
          });
  
          const descriptionParagraph = new Paragraph({
            children: [
              new TextRun({
                text: contentItem.description,
              }),
            ],
          });
  
          // 키워드를 • 구분 기호와 함께 나열
          const keywordParagraph = new Paragraph({
            children: (contentItem.keyword || []).map((keyword) => {
              return new TextRun({
                text: `• ${keyword} `,
                break: 1, // 각 키워드 이후 줄바꿈
              });
            }),
          });
  
          return [titleParagraph, descriptionParagraph, keywordParagraph];
        });
  
        // section 제목과 그 내용 배열로 반환
        return [sectionTitle, ...contentItems];
      });
  
      // docx 문서 생성
      const doc = new Document({
        sections: [
          {
            children: [...contentParagraphs],
          },
        ],
      });
  
      // docx 파일 패킹 및 다운로드
      Packer.toBlob(doc)
        .then((blob) => {
          saveAs(blob, `${fileName}.docx`);
          setTimeout(() => {
            setLoadingDownload(false);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error generating DOCX:", error);
          setLoadingDownload(false);
          setTimeout(() => {}, 2000);
        });
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };
  
  
  
  useEffect(() => {
    const fetchBmLeanCustomReport = async () => {

      if(bmLeanCustomButtonState) {
        setIsLoading(true);
        setIsLoadingIdeaPriority(true);
        setBmLeanCustomButtonState(0);

        const data = {
          expert_id: "1",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
            목표고객: businessInformationTargetCustomer,
          },
          bm_lean_auto_report: bmLeanAutoReportData,
          selected_bm_lean_problem : selectedProblemOptions
        };

        let response = await axios.post(
          "https://wishresearch.kr/panels/lean_custom_report",
          data,
          axiosConfig
        );

        let retryCount = 0;
        const maxRetries = 10;

        // while (retryCount < maxRetries && (
        //   !response || !response.data || typeof response.data !== "object" ||
        //   !response.data.hasOwnProperty("bm_lean_custom_report") ||
        //   !Array.isArray(response.data.bm_lean_custom_report) ||
        //   response.data.bm_lean_custom_report.some(section => 
        //     !section.hasOwnProperty("section") || 
        //     !Array.isArray(section.content) || 
        //     section.content.some(contentItem => 
        //       !contentItem.hasOwnProperty("title") || 
        //       !contentItem.hasOwnProperty("description") || 
        //       !Array.isArray(contentItem.keyword)
        //     )
        //   )
        // )) 
        {
          response = await axios.post(
            "https://wishresearch.kr/panels/lean_custom_report",
            data,
            axiosConfig
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
          console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }

        setBmLeanCustomReportData(response.data.bm_lean_custom_report);

        setIsLoading(false);
        setIsLoadingIdeaPriority(false);

        const updatedConversation = [...conversation];
        updatedConversation.push(
          {
            type: "system",
            message: `*${selectedProblemOptions}*에 대한 린 캔버스 작성이 완료되었습니다.\n이제부터는 비즈니스 목표에 따라 비즈니스 모델을 다양하게 구분해보겠습니다.`,
            expertIndex: selectedExpertIndex,
          },
          { type: `bmLeanCustomContinueButton`}
        );
        setConversationStage(3);
        setConversation(updatedConversation);

        await saveConversationToIndexedDB(
          {
            id: conversationId,
            inputBusinessInfo: inputBusinessInfo,
            analysisReportData: analysisReportData,
            strategyReportData: strategyReportData,
            conversation: updatedConversation,
            conversationStage: conversationStage,
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
            pocDetailReportData : pocDetailReportData,
            ideaFeatureData : ideaFeatureData,
            ideaRequirementData : ideaRequirementData,
            ideaList : ideaList,
            ideaGroup : ideaGroup,
            ideaPriority : ideaPriority,
            buttonState : buttonState,
            growthHackerReportData : growthHackerReportData,
            growthHackerDetailReportData : growthHackerDetailReportData,
            KpiQuestionList : KpiQuestionList,
            priceScrapData : priceScrapData,
            priceReportData : priceReportData,
            priceProduct : priceProduct,
            priceSelectedProductSegmentation : priceSelectedProductSegmentation,
            priceProductSegmentation : priceProductSegmentation,
            caseHashTag : caseHashTag,
            caseReportData : caseReportData,
            bmLeanAutoReportData : bmLeanAutoReportData,
            bmLeanCustomReportData : response.data.bm_lean_custom_report,
            surveyGuidelineReportData : surveyGuidelineReportData,
            surveyGuidelineDetailReportData : surveyGuidelineDetailReportData,
            surveyGoalSuggestionList: surveyGoalSuggestionList,
            surveyGoalFixed: surveyGoalFixed,
            surveyQuestionList: surveyQuestionList,
          },
          isLoggedIn,
          conversationId
        );
      }
    };

    fetchBmLeanCustomReport();
  }, [bmLeanCustomButtonState]);

  return (
    <BoxWrap>
      {isLoadingIdeaPriority ? (
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
          <h1>린 캔버스 보고서</h1>
          <p>{titleOfBusinessInfo}의 비즈니스 모델 캔버스 - {selectedProblemOptions}</p>
  
          <ModelCanvasWrap>
          <CanvasSection>
            {/* 1번째 항목 */}
            <CanvasList>
              <section>
                <strong>
                  {bmLeanCustomReportData[0]?.section}
                  <span>
                    <img src={images.IconCanvas01} alt="" />
                  </span>
                </strong>
                {bmLeanCustomReportData[0]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    <p>{contentItem?.description}</p>
                    <ul>
                      {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                        <li key={keywordIndex}>{keywordItem}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </CanvasList>

            {/* 6번째와 7번째 항목을 묶은 CanvasList Num2 */}
            <CanvasList Num2>
              {bmLeanCustomReportData?.slice?.(5, 7)?.map((section, index) => (
                <section key={index + 5}>
                  <strong>
                    {section?.section}
                    <span>
                      <img src={images[`IconCanvas0${5 + index + 1}`]} alt="" />
                    </span>
                  </strong>
                  {section?.content?.map((contentItem, contentIndex) => (
                    <div key={contentIndex}>
                      <p>{contentItem?.description}</p>
                      <ul>
                        {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                          <li key={keywordIndex}>{keywordItem}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              ))}
            </CanvasList>

            {/* 2번째 항목 */}
            <CanvasList>
              <section>
                <strong>
                  {bmLeanCustomReportData[1]?.section}
                  <span>
                    <img src={images.IconCanvas02} alt="" />
                  </span>
                </strong>
                {bmLeanCustomReportData[1]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    <p>{contentItem?.description}</p>
                    <ul>
                      {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                        <li key={keywordIndex}>{keywordItem}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </CanvasList>

            {/* 3번째와 4번째 항목을 묶은 CanvasList Num2 */}
            <CanvasList Num2>
              {bmLeanCustomReportData?.slice?.(2, 4).map((section, index) => (
                <section key={index + 2}>
                  <strong>
                    {section?.section}
                    <span>
                      <img src={images[`IconCanvas0${2 + index + 1}`]} alt="" />
                    </span>
                  </strong>
                  {section?.content?.map((contentItem, contentIndex) => (
                    <div key={contentIndex}>
                      <p>{contentItem?.description}</p>
                      <ul>
                        {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                          <li key={keywordIndex}>{keywordItem}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              ))}
            </CanvasList>

            {/* 5번째 항목 */}
            <CanvasList>
              <section>
                <strong>
                  {bmLeanCustomReportData[4]?.section}
                  <span>
                    <img src={images.IconCanvas05} alt="" />
                  </span>
                </strong>
                {bmLeanCustomReportData[4]?.content?.map((contentItem, contentIndex) => (
                  <div key={contentIndex}>
                    <p>{contentItem?.description}</p>
                    <ul>
                      {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                        <li key={keywordIndex}>{keywordItem}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </CanvasList>
          </CanvasSection>

          <CanvasSection>
          {/* 8번째 항목 */}
          <CanvasList>
            <section>
              <strong>
                {bmLeanCustomReportData[7]?.section}
                <span>
                  <img src={images.IconCanvas08} alt="" />
                </span>
              </strong>
              {bmLeanCustomReportData[7]?.content?.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  <p>{contentItem?.description}</p>
                  <ul>
                    {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                      <li key={keywordIndex}>{keywordItem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </CanvasList>

          {/* 9번째 항목 */}
          <CanvasList>
            <section>
              <strong>
                {bmLeanCustomReportData[8]?.section}
                <span>
                  <img src={images.IconCanvas09} alt="" />
                </span>
              </strong>
              {bmLeanCustomReportData[8]?.content?.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  <p>{contentItem?.description}</p>
                  <ul>
                    {contentItem?.keyword?.map((keywordItem, keywordIndex) => (
                      <li key={keywordIndex}>{keywordItem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </CanvasList>
        </CanvasSection>
        <ButtonSectionWrap>
        <DownloadButton onClick={togglePopupDownload} className="download-button">
            <p>
              <img src={images.IconEdit3} alt="" />
              자료 (1건)
            </p>
            <div>
              <button>
                <img src={images.IconDownload2} alt="" />
                <div>
                  <strong>마케팅 전략 다운로드</strong>
                  <span>1.8 MB · Download</span>
                </div>
              </button>
            </div>
          </DownloadButton>
            <ButtonWrap>
              <div />
              <div>
                <button type="button">
                  <img src={images.IconCopy} alt="" />
                  복사하기
                </button>
                <button type="button">
                  <img src={images.IconSave} alt="" />
                  저장하기
                </button>
              </div>
            </ButtonWrap>
            </ButtonSectionWrap>
          </ModelCanvasWrap>
        </>
      )}
      {isPopupOpenDownload && (
        <DownloadPopup
          ref={popupRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              togglePopupDownload();
            }
          }}
        >
          <span className="close" onClick={togglePopupDownload}></span>
          <div>
            <h3>마케팅 전략 다운로드</h3>
            <SelectBoxWrap>
                <label>포맷 선택 (택1)</label>
                <SelectBox>
                  <div
                    className={`${
                      selectedFormat === "Word" ? "selected" : ""
                    }`}
                  >
                    {selectedFormat === "Word" ? (
                      <img src={images.ImgWord2} alt="" />
                    ) : (
                      <img src={images.ImgWord} alt="" />
                    )}
                    Word
                  </div>
                  {/* <div
                    className={`${
                      selectedFormat === "Excel" ? "selected" : ""
                    }`}
                    onClick={() => handleFormatChange("Excel")}
                  >
                    {selectedFormat === "Excel" ? (
                      <img src={images.ImgExcel2} alt="" />
                    ) : (
                      <img src={images.ImgExcel} alt="" />
                    )}
                    Excel
                  </div> */}
                </SelectBox>
              </SelectBoxWrap>
              <SelectBoxWrap>
                <label>언어 선택 (택1)</label>
                <SelectBox>
                  <div
                    className={`${
                      selectedLanguage === "한글" ? "selected" : ""
                    }`}
                    onClick={() => handleLanguageChange("한글")}
                  >
                    {selectedLanguage === "한글" ? (
                      <img src={images.ImgKOR2} alt="" />
                    ) : (
                      <img src={images.ImgKOR} alt="" />
                    )}
                    한글
                  </div>
                  <div
                    className={`${
                      selectedLanguage === "영문" ? "selected" : ""
                    } disabled`}
                    onClick={() => handleLanguageChange("영문")}
                  >
                    {selectedLanguage === "영문" ? (
                      <img src={images.ImgENG2} alt="" />
                    ) : (
                      <img src={images.ImgENG} alt="" />
                    )}
                    영문(준비 중)
                  </div>
                </SelectBox>
              </SelectBoxWrap>
            <div>
              <button 
                onClick={handleDownloadDocx}
                disabled={loadingDownload}
              >
                {loadingDownload
                  ? "다운로드 중..."
                  : "다운로드"}
              </button>
            </div>
          </div>
        </DownloadPopup>
      )}
    </BoxWrap>
  );
};


export default OrganismBmLeanCustomReport;
const BoxWrap = styled.div`
  max-width:988px;
  width:100%;
  display:flex;
  flex-direction:column;
  text-align:left;
  padding:20px;
  margin:24px 0 0 50px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    margin-bottom:8px;
  }

  p {
    font-size:0.88rem;
    line-height:1.3;
  }
`;

const ModelCanvasWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:12px;
  margin:24px auto;
`;

const CanvasSection = styled.div`
  display:flex;
  gap:12px;
`;

const CanvasList = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:12px;
  flex:1 1 19%;
  max-height:400px;

  ${props =>
    props.Num2 &&
    css`
      section {
        height:50% !important;
      }
    `
  }

  section {
    height:100%;
    padding:16px;
    border-radius:15px;
    background:${palette.chatGray};
    overflow:hidden;
  }

  strong {
    display:flex;
    align-items:center;
    justify-content:space-between;
    min-height:26px;
    font-size:0.88rem;
    font-weight:500;
    color:${palette.gray800};
    margin-bottom:16px;
    
    span {
      width:26px;
      height:26px;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:100%;
      background:${palette.white};
    }
  }

  div {
    height:calc(100% - 40px);
    overflow-y:auto;
    scrollbar-width:thin;
  }

  p {
    font-size:0.75rem;
    color:${palette.gray800};
    line-height:1.3;

    span {
      display:block;
      font-size:0.63rem;
      margin-top:4px;
    }
  }

  ul {
    margin-top:12px;

    li {
      position:relative;
      font-size:0.75rem;
      line-height:1.3;
      padding-left:18px;

      + li {
        margin-top:5px;
      }

      &:before {
        position:absolute;
        left:8px;
        top:7px;
        width:2px;
        height:2px;
        border-radius:10px;
        background:${palette.gray800};
        content:'';
      }
    }
  }
`;
const ButtonWrap = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 16px;
// padding-top: 20px;
// border-top: 1px solid ${palette.lineGray};

button {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Pretendard";
  font-size: 0.75rem;
  color: ${palette.gray};
  padding: 4px 8px;
  border-radius: 5px;
  border: 0;
  background: none;
  transition: all 0.5s;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
}

.lineBtn {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray};
}

> button {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${palette.lineGray};
}

> div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}
`;
const DownloadButton = styled.div`
  display:flex;
  flex-direction:column;
  gap:8px;

  p {
    display:flex;
    align-items:center;
    gap:8px;
    font-size:0.88rem;
    font-weight:300;
    color:${palette.gray500};
    line-height:22px;
  }

  div {
    display:flex;
    gap:12px;
  }

  button {
    display:flex;
    align-items:center;
    gap:8px;
    padding:6px 8px;
    border-radius:6px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};
    font-family: 'Pretendard';

    div {
      display:flex;
      flex-direction:column;
      gap:4px;
      min-width:160px;
      text-align:left;
    }

    strong {
      font-size:0.63rem;
      font-weight:400;
      color:${palette.gray800};
    }

    span {
      font-size:0.5rem;
      color:${palette.gray500};
    }
  }
`;

const DownloadPopup = styled.div`
  position: absolute;
  right: ${(props) => (props.isAutoSaveToggle ? "0" : "130px")};
  bottom:215px;
  max-width: 288px;
  width: 100%;
  max-height: 400px; /* 팝업의 최대 높이를 적절히 설정 */
  overflow-y: auto; /* 내용이 많을 경우 스크롤 가능하게 설정 */
  padding: ${(props) => (props.isAutoSaveToggle ? "0" : "24px 20px 20px")};
  border-radius: 15px;
  background: ${palette.white};
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.05);
  visibility: ${(props) => (props.isAutoSaveToggle ? "hidden" : "visible")};
  opacity: ${(props) => (props.isAutoSaveToggle ? "0" : "1")};
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 트랜지션 추가 */
  z-index: 99;

  .close {
    position:absolute;
    right:20px;
    top:20px;
    width:12px;
    height:12px;
    cursor:pointer;

    &:before, &:after {
      position:absolute;
      top:50%;
      left:50%;
      width:2px;
      height:100%;
      background:${palette.gray500};
      content:'';
    }
    &:before {
      transform:translate(-50%, -50%) rotate(45deg);
    }
    &:after {
      transform:translate(-50%, -50%) rotate(-45deg);
    }
  }

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
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align:left;
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
    width: 100%;
    font-family: Pretendard, Poppins;
    font-size: 0.88rem;
    color: ${palette.white};
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
const ButtonSectionWrap = styled.div`
  display: flex;
  justify-content: space-between; /* 가로로 공간을 균등 배분 */
  align-items: center;
  margin-top: 20px; /* 적절한 간격 추가 */
`;
const SelectBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const SelectBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 120px;
    font-size: 0.75rem;
    text-align: center;
    color: ${palette.gray700};
    padding: 13px 0;
    border-radius: 10px;
    border: 1px solid ${palette.gray100};
    cursor: pointer;
    transition: all 0.5s;

    img {
      width: 40px;
      height: 40px;
    }

    &.selected {
      font-weight: 700;
      color: ${palette.gray800};
      border: 1px solid ${palette.blue};
      background: rgba(4, 83, 244, 0.05);
    }
  }
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .disabled img {
    filter: grayscale(100%);
  }

  .disabled span {
    color: ${palette.gray300};
  }
`;