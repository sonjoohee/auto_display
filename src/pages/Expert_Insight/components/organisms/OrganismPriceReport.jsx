import React, { useEffect, useState, useRef } from "react";
import * as d3 from 'd3';
import styled, { css } from "styled-components";
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
  KPI_QUESTION_LIST,
  IDEA_PRIORITY,
  BUTTON_STATE,
  GROWTH_HACKER_BUTTON_STATE,
  GROWTH_HACKER_REPORT_DATA,
  IDEA_MIRO,
  PRICE_START_BUTTON_STATE,
  PRICE_SCRAP_DATA,
  PRICE_REPORT_DATA,
  PRICE_PRODUCT,
  PRICE_PRODUCT_SEGMENTATION,
  PRICE_SELECTED_PRODUCT_SEGMENTATION,
  CASE_HASH_TAG,
  CASE_REPORT_DATA,
  SURVEY_GUIDELINE_REPORT_DATA,
  SURVEY_GUIDELINE_DETAIL_REPORT_DATA,
  SURVEY_GOAL_SUGGESTION_LIST,
  SURVEY_GOAL_FIXED,
  SURVEY_QUESTION_LIST,
  BM_OR_LEAN,
  BM_BM_AUTO_REPORT_DATA,
  BM_LEAN_AUTO_REPORT_DATA,
  BM_BM_ADS_REPORT_DATA,
  SELECTED_PROBLEM_OPTIONS,
  BM_LEAN_ADS_REPORT_DATA,
  BM_BM_CUSTOM_REPORT_DATA,
  BM_LEAN_CUSTOM_REPORT_DATA,
  BM_MODEL_SUGGESTION_REPORT_DATA,
  BM_QUESTION_LIST,
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";

import {
  SkeletonTitle,
  SkeletonLine,
  Spacing,
} from "../../../../assets/styles/Skeleton";

import images from "../../../../assets/styles/Images";
import MoleculeReportController from "../molecules/MoleculeReportController";

const OrganismPriceReport = () => {
  const [bmModelSuggestionReportData, setBmModelSuggestionReportData] = useAtom(BM_MODEL_SUGGESTION_REPORT_DATA);
  const [bmQuestionList, setBmQuestionList] = useAtom(BM_QUESTION_LIST);
  const [bmOrLean, setBmOrLean] = useAtom(BM_OR_LEAN);
  const [bmBmAutoReportData, setBmBmAutoReportData] = useAtom(BM_BM_AUTO_REPORT_DATA);
  const [bmLeanAutoReportData, setBmLeanAutoReportData] = useAtom(BM_LEAN_AUTO_REPORT_DATA);
  const [bmBmAdsReportData, setBmBmAdsReportData] = useAtom(BM_BM_ADS_REPORT_DATA);
  const [selectedProblemOptions, setSelectedProblemOptions] = useAtom(SELECTED_PROBLEM_OPTIONS);
  const [bmLeanAdsReportData, setBmLeanAdsReportData] = useAtom(BM_LEAN_ADS_REPORT_DATA);
  const [bmBmCustomReportData, setBmBmCustomReportData] = useAtom(BM_BM_CUSTOM_REPORT_DATA);
  const [bmLeanCustomReportData, setBmLeanCustomReportData] = useAtom(BM_LEAN_CUSTOM_REPORT_DATA);
  const [surveyGuidelineReportData, setSurveyGuidelineReportData] = useAtom(SURVEY_GUIDELINE_REPORT_DATA);
  const [surveyGuidelineDetailReportData, setSurveyGuidelineDetailReportData] = useAtom(SURVEY_GUIDELINE_DETAIL_REPORT_DATA);
  const [surveyGoalSuggestionList, setSurveyGoalSuggestionList] = useAtom(SURVEY_GOAL_SUGGESTION_LIST);
  const [surveyGoalFixed, setSurveyGoalFixed] = useAtom(SURVEY_GOAL_FIXED);
  const [surveyQuestionList, setSurveyQuestionList] = useAtom(SURVEY_QUESTION_LIST);
  const [caseHashTag, setCaseHashTag] = useAtom(CASE_HASH_TAG);
  const [caseReportData, setCaseReportData] = useAtom(CASE_REPORT_DATA);
  const [growthHackerReportData, setGrowthHackerReportData] = useAtom(GROWTH_HACKER_REPORT_DATA);
  const [ideaMiro, setIdeaMiro] = useAtom(IDEA_MIRO);
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

  const [selectedPocTarget, setSelectedPocTarget] = useAtom(SELCTED_POC_TARGET);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [pocPersonaList, setPocPersonaList] = useAtom(POC_PERSONA_LIST);
  const [recommendedTargetData, setRecommendedTargetData] = useAtom(RECOMMENDED_TARGET_DATA);
  const [pocDetailReportData, setPocDetailReportData] = useAtom(POC_DETAIL_REPORT_DATA);

  const [ideaFeatureData, setIdeaFeatureData] = useAtom(IDEA_FEATURE_DATA);
  const [ideaRequirementData, setIdeaRequirementData] = useAtom(IDEA_REQUIREMENT_DATA);

  const [KpiQuestionList, setKpiQuestionList] = useAtom(KPI_QUESTION_LIST);
  const [ideaGroup, setIdeaGroup] = useAtom(IDEA_GROUP);
  const [ideaPriority, setIdeaPriority] = useAtom(IDEA_PRIORITY);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [priceStartButtonState, setPriceStartButtonState] = useAtom(PRICE_START_BUTTON_STATE);
  const [priceScrapData, setPriceScrapData] = useAtom(PRICE_SCRAP_DATA);
  const [priceReportData, setPriceReportData] = useAtom(PRICE_REPORT_DATA);
  const [priceProduct, setPriceProduct] = useAtom(PRICE_PRODUCT);
  const [priceProductSegmentation, setPriceProductSegmentation] = useAtom(PRICE_PRODUCT_SEGMENTATION);
  const [priceSelectedProductSegmentation, setPriceSelectedProductSegmentation] = useAtom(PRICE_SELECTED_PRODUCT_SEGMENTATION);

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const [isMoreView, setIsMoreView] = useState(false);
  const onClickImageMoreViewButton = () => {
    setIsMoreView(!isMoreView);
  };

  const sliderRef = useRef(null);

  const [productPrices, setProductPrices] = useState([]);
  const [bins, setBins] = useState([]);

  const [range, setRange] = useState([0, 0]);
  const [width, setWidth] = useState(500);

  useEffect(() => {
    const fetchPriceReport = async () => {

      if(priceStartButtonState) {
        setIsLoading(true);
        setIsLoadingPrice(true);

        const data1 = {
          expert_id: "6",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
            목표고객: businessInformationTargetCustomer,
          },
        };

        let response1 = await axios.post(
          "https://wishresearch.kr/panels/price_scrap",
          data1,
          axiosConfig
        );

        let retryCount = 0;
        const maxRetries = 10;

        while (retryCount < maxRetries && (
          !response1 || 
          !response1.data || 
          typeof response1.data !== "object" ||
          !response1.data.hasOwnProperty("price_scrap_report") ||
          typeof response1.data.price_scrap_report !== "object"
        )) 
        {
          response1 = await axios.post(
            "https://wishresearch.kr/panels/price_scrap",
            data1,
            axiosConfig
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
          console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }

        const priceScrap = response1.data.price_scrap_report;
        setPriceScrapData(priceScrap);

        const data2 = {
          expert_id: "6",
          business_info: titleOfBusinessInfo,
          business_analysis_data: {
            명칭: titleOfBusinessInfo,
            주요_목적_및_특징: mainFeaturesOfBusinessInformation,
            주요기능: mainCharacteristicOfBusinessInformation,
            목표고객: businessInformationTargetCustomer,
          },
          price_scrap_report: priceScrap,
        };

        let response2 = await axios.post(
          "https://wishresearch.kr/panels/price_analysis",
          data2,
          axiosConfig
        );

        retryCount = 0;

        while (retryCount < maxRetries && (
          !response2 || 
          !response2.data || 
          typeof response2.data !== "object" ||
          !response2.data.hasOwnProperty("price_analysis_persona_recommand_report") ||
          typeof response2.data.price_analysis_persona_recommand_report !== "object"
        )) 
        {
          response2 = await axios.post(
            "https://wishresearch.kr/panels/price_analysis",
            data2,
            axiosConfig
          );
          retryCount++;
        }
        if (retryCount === maxRetries) {
          console.error("최대 재시도 횟수에 도달했습니다. 응답이 계속 비어있습니다.");
          // 에러 처리 로직 추가
          throw new Error("Maximum retry attempts reached. Empty response persists.");
        }

        const priceReport = response2.data.price_analysis_persona_recommand_report;
        setPriceReportData(priceReport);

        const prices = priceScrap.price_range_groups.flatMap(group =>
          group.product_list.map(product =>
            parseFloat(product["단위 당 가격"].replace("원", "").replace(",", ""))
          )
        );
        setProductPrices(prices);

        // bins 계산 및 상태 업데이트
        const binWidth = 500;
        const binsData = d3.histogram()
          .thresholds(d3.range(0, d3.max(prices) + binWidth, binWidth))
          (prices);
        setBins(binsData);

        const rangeString = priceReport.price_range_analysis.consumer_price_range.range;
        const rangeNumbers = rangeString.match(/\d+/g).map(Number);
        setRange(rangeNumbers);

        setIsLoading(false);
        setIsLoadingPrice(false);
        setPriceStartButtonState(0);

        const updatedConversation = [...conversation];

        if(priceProduct.length === 1) {
          updatedConversation.push(
            {
              type: "system",
              message:
                `시장 가격 분석이 완료되었습니다.\n${titleOfBusinessInfo}를 더욱 세분화해 가격 분석을 이어가시겠습니까? `,
              expertIndex: selectedExpertIndex,
            },
            { type: `priceContinueButton` }
          );
        } else {
          updatedConversation.push(
            {
              type: "system",
              message:
                "시장 가격 분석이 완료되었습니다.\n이제 다른 제품의 가격을 분석하시겠어요, 아니면 상세한 분석을 진행하시겠습니까? 원하는 옵션을 선택해주세요 ",
              expertIndex: selectedExpertIndex,
            },
            { type: `priceContinueButton` }
          );
        }
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
            KpiQuestionList : KpiQuestionList,
            ideaGroup : ideaGroup,
            ideaPriority : ideaPriority,
            ideaMiro : ideaMiro,
            growthHackerReportData : growthHackerReportData,
            buttonState : buttonState,
            priceScrapData : priceScrap,
            priceReportData : priceReport,
            priceProduct : priceProduct,
            priceProductSegmentation : priceProductSegmentation,
            priceSelectedProductSegmentation : priceSelectedProductSegmentation,
            caseHashTag : caseHashTag,
            caseReportData : caseReportData,
            bmOrLean : BM_OR_LEAN,
            bmQuestionList : bmQuestionList,
            bmModelSuggestionReportData : bmModelSuggestionReportData,
            bmBmAutoReportData : bmBmAutoReportData,
            bmLeanAutoReportData : bmLeanAutoReportData,
            bmBmAdsReportData : bmBmAdsReportData,
            bmSelectedProblemOptions : selectedProblemOptions,
            bmLeanAdsReportData : bmLeanAdsReportData,
            bmBmCustomReportData : bmBmCustomReportData,
            bmLeanCustomReportData : bmLeanCustomReportData,
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

    fetchPriceReport();
  }, [priceStartButtonState]);
  
    // useEffect(() => {
    //   const handleResize = () => {
    //     const newWidth = sliderRef.current.parentElement.offsetWidth;
    //     setWidth(newWidth);
    //   };
  
    //   handleResize();
    //   window.addEventListener("resize", handleResize);
      
    //   return () => window.removeEventListener("resize", handleResize);
    // }, []);

    // 그래프 데이터 불러오기
    useEffect(() => {
      if (Object.keys(priceScrapData).length > 0 && Object.keys(priceReportData).length > 0) {
        const prices = priceScrapData.price_range_groups.flatMap(group =>
          group.product_list.map(product =>
            parseFloat(product["단위 당 가격"].replace("원", "").replace(",", ""))
          )
        );
        setProductPrices(prices);

        const binWidth = 500;
        const binsData = d3.histogram()
          .thresholds(d3.range(0, d3.max(prices) + binWidth, binWidth))
          (prices);
        setBins(binsData);

        const rangeString = priceReportData.price_range_analysis.consumer_price_range.range;
        const rangeNumbers = rangeString.match(/\d+/g).map(Number);
        setRange(rangeNumbers);
      }
    }, [priceScrapData, priceReportData]);
  
    useEffect(() => {
      if (productPrices.length > 0 && bins.length > 0) {
        const svg = d3.select(sliderRef.current);
        const height = 150;
        const margin = { left: 40, right: 40, top: 20, bottom: 20 };
        
        // 툴팁 추가
        const tooltip = d3.select(".App").append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("padding", "8px")
          .style("background", "rgba(0, 0, 0, 0.7)")
          .style("font-size", ".75rem")
          .style("color", "white")
          .style("border-radius", "4px")
          .style("pointer-events", "none")
          .style("opacity", 0);

        // x 축 스케일 설정
        const x = d3.scaleLinear()
          .domain([0, d3.max(productPrices)])
          .range([margin.left, width - margin.right])
          .clamp(true);
    
        // bins 배열의 각 항목에서 d.length 값으로 최대값 설정
        const y = d3.scaleLinear()
          .domain([0, d3.max(bins, d => d.length)])  // 각 구간의 제품 개수를 기반으로 Y축 도메인 설정
          .range([height - margin.bottom, margin.top]);
    
        svg.selectAll('*').remove();
        svg.attr('width', width).attr('height', height);
    
        const xAxis = d3.axisBottom(x).ticks(10);
        const xAxisGroup = svg.append('g')
          .attr('class', 'x-axis')
          .attr('transform', `translate(0, ${height - margin.bottom})`)
          .call(xAxis);
    
        xAxisGroup.selectAll('path')
          .style('stroke', '#E0E4EB')
          .style('stroke-width', '5px');
    
        xAxisGroup.selectAll('line')
          .style('stroke', '#E0E4EB')
          .style('stroke-width', '5px');

        // X축 레이블 추가
        svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width - margin.right)
        .attr("y", height - 5)
        .attr("text-anchor", "end")
        .style("fill", "#666666")
        .style("font-size", "0.75rem")
        .text("가격 범위 (₩)");

        svg.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -margin.left + 10)
        .attr("y", margin.top)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "end")
        .style("fill", "#666666")
        .style("font-size", "0.75rem")
        .text("제품 개수");

        // 선택된 범위에 대한 파란색 선 추가
        svg.append('rect')
          .attr('x', x(range[0]))
          .attr('y', height - margin.bottom + 0)
          .attr('width', x(range[1]) - x(range[0]))
          .attr('height', '5px')
          .style('fill', palette.chatBlue);

        // 바차트 그리기: 각 가격 구간에 속하는 제품 개수로 바 높이 설정
        const barWidth = (width - margin.left - margin.right) / bins.length;
        svg.selectAll('.bar')
          .data(bins)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d, i) => margin.left + i * barWidth)
          .attr('y', d => y(d.length)) // 바 차트의 높이는 데이터의 개수로 설정
          .attr('width', barWidth)
          .attr('height', d => height - margin.bottom - y(d.length))
          .style('fill', '#E0E4EB')
          // X축 값과 range 값 비교: 스케일링된 값을 비교하지 않고 실제 데이터 값(d.x0, d.x1)과 비교
          .style('display', d => (d.x0 >= range[0] && d.x1 <= range[1]) ? 'block' : 'none')
      
          // 마우스 오버 이벤트 추가
          .on('mouseover', (event, d) => {
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(`Range: ${d.x0} ~ ${d.x1}<br/>Count: ${d.length}`)
              .style("left", (event.pageX + 5) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          
          // 마우스 이동 시 툴팁 위치 업데이트
          .on('mousemove', (event) => {
            tooltip.style("left", (event.pageX + 5) + "px")
                  .style("top", (event.pageY - 28) + "px");
          })
          
          // 마우스 아웃 시 툴팁 숨기기
          .on('mouseout', () => {
            tooltip.transition().duration(500).style("opacity", 0);
          });

        svg.selectAll('.handle')
          .data(range)
          .enter().append('circle')
          .attr('class', 'handle')
          .attr('cx', d => x(d))
          .attr('cy', height - margin.bottom + 2)
          .attr('r', 8)
          .attr('data-index', (d, i) => i)
          .style('fill', palette.chatBlue);
    
        // // 드래그 핸들 아래에 가격 표시 추가 (소수점 제거 및 텍스트 레이어 조정)
        // svg.selectAll('.handle-label')
        //   .data(range)
        //   .enter().append('text')
        //   .attr('class', 'handle-label')
        //   .attr('x', d => x(d))
        //   .attr('y', height - margin.bottom +20)  // 텍스트를 약간 아래로
        //   .attr('text-anchor', 'middle')
        //   .style('fill', 'black')
        //   .style('pointer-events', 'none')  // 마우스 이벤트가 텍스트에 영향을 주지 않도록 함
        //   .style('position', 'relative')    // CSS에서 position을 설정하여 z-index 적용
        //   .text(d => `₩${d3.format(",.0f")(d)}`);
        }
    }, [range, productPrices, bins]);

  return (
    <>
      {isLoadingPrice || priceStartButtonState ? (
        <Wrap>
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
        </Wrap>
      ) : (
        <>
        <Wrap H1Border>
          <h1>{titleOfBusinessInfo} 가격 분석 리포트</h1>
          <p>
            <span>소비자 가격 수용 범위 예측</span>
            {priceReportData.price_range_analysis.consumer_price_range.range} 사이
          </p>
  
          <ChartWrap>
            <svg ref={sliderRef}></svg>
  
            <PriceWrap>
              <div>
                <span>최소 가격</span>
                <input 
                  type="text" 
                  value={`₩${parseInt(priceReportData.price_analysis.price_data.lowest_price.replace(/원/g, "").replace(/,/g, "")).toLocaleString()}원`} 
                  readOnly
                />
              </div>
              <div>
                <span>최대 가격</span>
                <input 
                  type="text" 
                  value={`₩${parseInt(priceReportData.price_analysis.price_data.highest_price.replace(/원/g, "").replace(/,/g, "")).toLocaleString()}원`} 
                  readOnly
                />
              </div>
              <div>
                <span>평균가</span>
                <input 
                  type="text" 
                  value={`₩${parseInt(priceReportData.price_analysis.price_data.average_price.replace(/원/g, "").replace(/,/g, "")).toLocaleString()}원`} 
                  readOnly
                />
              </div>
            </PriceWrap>

  
            <p>{priceReportData.price_analysis.summary.unit_setting}</p>
          </ChartWrap>
  
          <AnalysisWrap>
            <div>
              <span>가격대 분석</span>
              <p>{priceReportData.conclusion_and_strategic_recommendations.description}</p>
            </div>
  
            <AnalysisBox isMoreView={isMoreView}>
              {['lowest', 'highest', 'average'].map((type) => (
                <div key={type}>
                  <span>
                    {type === 'lowest' && '최소 가격군 제품'}
                    {type === 'highest' && '최대 가격군 제품'}
                    {type === 'average' && '평균가 가격군 제품'}
                  </span>
                  <ul>
                    {priceReportData.price_analysis.price_data[`${type}_price_products`].map((product, idx) => (
                      <li key={idx}>
                        {/* <span>{idx + 1}</span> */}
                        <p>{product.name}</p>
                        <strong>{product.price}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </AnalysisBox>
  
            <MoreViewButtonWrap isMoreView={isMoreView}>
              <MoreButton onClick={onClickImageMoreViewButton} isMoreView={isMoreView}>
                {isMoreView ? "접기" : "더보기"}
              </MoreButton>
            </MoreViewButtonWrap>
          </AnalysisWrap>
        </Wrap>
      </>
      )}
    </>
  );
};

export default OrganismPriceReport;

const Wrap = styled.div`
  max-width:540px;
  // width:100%;
  display:flex;
  flex-direction:column;
  gap:20px;
  padding:20px;
  margin:24px 0 0 44px;
  border-radius:15px;
  border:1px solid ${palette.outlineGray};

  h1 {
    position:relative;
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:1rem;
    font-weight:700;
    text-align:left;
  }

  ${(props) =>
    props.H1Border &&
    css`
      h1 {
        padding-bottom:8px;
        margin-bottom:12px;
        border-bottom:1px solid ${palette.lineGray};
      }
    `
  }

  p {
    display:flex;
    flex-direction:column;
    gap:8px;
    font-size:1.25rem;
    font-weight:600;
    color:${palette.gray800};
    text-align:left;

    span {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray500};
    }
  }
`;

const OptionContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:8px;
`;

const Option = styled.div`
  position:relative;
  display:flex;
  align-items:center;
  gap:8px;
  font-size:0.88rem;
  color: ${palette.gray800};
  padding:8px 12px;
  border-radius:8px;
  cursor:pointer;
  border: 1px solid ${palette.lineGray};
  background-color: ${palette.white};
  transition:all .5s;
  
  &:before {
    display:inline-block;
    width:20px;
    height:20px;
    border-radius:50%;
    border: 1px solid ${palette.lineGray};
    background-color: ${palette.white};
    transition:all .5s;
    content:'';
  }
    
  &:after {
    position:absolute;
    left:12px;
    top:8px;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }
    
  &:hover {
    border-color: ${palette.blue};
  }
`;

const ButtonWrap = styled.div`
  margin-top:auto;
  display:flex;
  justify-content:space-between;
  align-items:center;

  .finish {
    font-size:0.88rem;
    color:${palette.chatBlue};
    margin-left:auto;
    border-radius:8px;
    background:none;
    cursor:pointer;
    transition:all .5s;
  }
`;

const ChartWrap = styled.div`
  .tick {
    display:none;
  }

  .handle {
    box-shadow:2px 2px 8px rgba(34, 111, 255, .5);
  }

  p {
    font-size:0.75rem;
    font-weight:400;
    color:${palette.gray500};
    margin-top:8px;
  }
`;

const PriceWrap = styled.div`
  display:flex;
  align-items:center;
  gap:12px;
  margin-top:15px;

  > div {
    display:flex;
    flex-direction:column;
    gap:6px;
    flex: 1 1 40%;
    font-size:0.88rem;
    text-align:left;
    padding:8px;
    border-radius:6px;
    border:1px solid ${palette.lineGray};

    span {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray500};
    }

    input {
      width:100%;
      font-family: 'Pretendard', 'Poppins';
      font-size:0.88rem;
      color:${palette.gray800};
      border:0;
      outline:none;
    }

    p {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray800};
    }
  }
`;

const AnalysisWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:20px;
  margin-top:12px;
  padding-top:20px;
  border-top:1px solid ${palette.lineGray};

  div {
    display:flex;
    flex-direction:column;
    gap:8px;
    text-align:left;

    + div {
      margin-top:12px;
    }
  }

  span {
    font-size:0.88rem;
    font-weight:400;
    color:${palette.gray500};
  }

  p {
    font-size:0.88rem;
    font-weight:400;
    color:${palette.gray800};
    line-height:1.3;
  }

  ul {
    display:flex;
    flex-direction:column;
    gap:4px;
    // padding:8px 20px 8px 6px;
    padding:20px;
    border-radius:12px;
    background:${palette.chatGray};
  }

  li {
    display:flex;
    // align-items:center;
    // gap:58px;
    justify-content:space-between;

    p {
      max-width:320px;
      width:100%;
    }

    span {
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      width:27px;
      height:27px;
      border-radius:50%;
      border:1px solid ${palette.lineGray};
      background:${palette.white};
    }

    strong {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray800};
      text-align:right;
      margin-left:auto;
      flex-shrink:0;
    }

    + li {
      padding-top:12px;
      margin-top:12px;
      border-top:1px solid ${palette.outlineGray};
    }
  }
`;

const AnalysisBox = styled.div`
  max-height: ${(props) => (props.isMoreView 
    ? "1000px" 
    : "115px")}; 
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`;

const MoreViewButtonWrap = styled.div`
  position: relative;
  align-items:center;
  margin-top:14x;

  &:before {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 100%;
    height: ${(props) => (props.isMoreView ? "" : "100px")}; //그라데이션 높이
    background: linear-gradient(
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    content: "";
  }
`;

const MoreButton = styled.button`
  position:relative;
  display:flex;
  align-items:center;
  gap:12px;
  font-family: 'Pretendard', 'Poppins';
  font-size:1rem;
  color:${palette.gray800};
  border:0;
  background:none;

  &:after {
    width:8px;
    height:8px;
    margin-top: ${(props) => (props.isMoreView 
      ? "5px" 
      : "")};
    transform: ${(props) => (props.isMoreView 
      ? "rotate(-135deg)" 
      : "rotate(45deg)")};
    border-right:2px solid ${palette.gray800};
    border-bottom:2px solid ${palette.gray800};
    transition:all .5s;
    content:'';
  }
`;