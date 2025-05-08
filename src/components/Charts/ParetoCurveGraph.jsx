import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { palette } from "../../assets/styles/Palette";

/**
 * 파레토 커브(Pareto Curve) 그래프 컴포넌트
 * 각 단계마다 이전 단계의 값이 누적되는 형태로 표시
 * 7~9단계까지 가능하도록 설정, 가로 너비 820px로 조정
 * 바 크기는 일정하게 유지하면서 간격만 조절됨
 * 단계 레이블이 5자 이상이면 말줄임표로 표시되고 호버 시 전체 텍스트 표시
 */
const ParetoCurveGraph = ({
  data = [
    { name: "품질 관련 문제점", value: 175 },
    { name: "배송 지연 및 오배송", value: 50 },
    { name: "가격 불만족 사항", value: 35 },
    { name: "결제 시스템 오류", value: 20 },
    { name: "재고 부족 현상", value: 15 },
    { name: "고객 서비스 불량", value: 10 },
    { name: "애플리케이션 기능 오류", value: 8 },
    { name: "기타 불편사항", value: 5 },
  ],
  width = 820, // 가로 사이즈를 820px로 변경
  height = 520,
  animate = true,
  animationDuration = 1000,
  barWidth = 30, // 그래프 바의 고정 너비 설정
  sideMargin = 40, // 그래프 좌우 여백 설정 (양쪽 각각 적용)
  maxLabelLength = 5, // 최대 레이블 길이 설정
}) => {
  const svgRef = useRef(null);
  const [processedData, setProcessedData] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // 데이터 처리 함수: 누적 값 계산
  useEffect(() => {
    if (!data || data.length === 0) return;

    // 데이터 내림차순 정렬 (가장 큰 값부터)
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    // 단계 수를 7~9개로 제한
    const limitedData = sortedData.slice(0, Math.min(9, sortedData.length));

    // 총합 계산
    const total = limitedData.reduce((sum, item) => sum + item.value, 0);

    // 누적 값 계산
    let cumulativeValue = 0;
    const processed = limitedData.map((item, index) => {
      cumulativeValue += item.value;

      // 단계별 레이블 생성 - item.name을 사용하거나 없는 경우 기본값으로 N단계 사용
      const stageLabel = item.name || `${index + 1}단계`;

      return {
        name: item.name,
        stageLabel: stageLabel,
        originalValue: item.value,
        cumulativeValue: cumulativeValue,
        cumulativePercentage: (cumulativeValue / total) * 100,
      };
    });

    setProcessedData(processed);
  }, [data]);

  // 텍스트 말줄임표 처리 함수
  const truncateText = (text) => {
    if (text.length <= maxLabelLength) return text;
    return text.substring(0, maxLabelLength) + "...";
  };

  // D3 그래프 렌더링
  useEffect(() => {
    if (!processedData.length || !svgRef.current) return;

    // SVG 요소 선택 및 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 마진 설정
    const margin = { top: 40, right: 92, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 그래프 그룹 생성
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 스테이지 개수와 고정 바 너비를 기반으로 한 레이아웃 계산
    const stageCount = processedData.length;

    // 모든 바의 총 너비 (고정 크기 * 단계 수)
    const totalBarsWidth = barWidth * stageCount;

    // 양쪽 사이드 마진을 추가하고 나머지 공간을 간격으로 사용
    // 양쪽(좌우) 모두에 사이드 마진 적용
    const usableWidth = innerWidth - sideMargin * 2;

    // 사용 가능한 총 간격 (사용 가능 너비 - 모든 바의 총 너비)
    const totalSpacing = usableWidth - totalBarsWidth;

    // 각 간격의 너비 (단계 수 - 1개의 간격)
    const spacingWidth = stageCount > 1 ? totalSpacing / (stageCount - 1) : 0;

    // 스케일 설정 - scaleBand 대신 직접 계산
    const xPositions = {};
    processedData.forEach((d, i) => {
      // 각 바의 x 위치 계산: 사이드 마진 + 이전 바들의 너비 + 이전 간격들의 너비
      xPositions[d.stageLabel] = sideMargin + i * (barWidth + spacingWidth);
    });

    // x 스케일은 이제 단순히 위치를 반환하는 함수
    const x = (stageLabel) => xPositions[stageLabel];
    // bandwidth는 고정 바 너비 반환
    x.bandwidth = () => barWidth;

    // 실제 최대 누적 값 계산
    const totalCumulativeValue =
      d3.max(processedData, (d) => d.cumulativeValue) || 0;

    const y1 = d3
      .scaleLinear()
      .domain([0, totalCumulativeValue]) // 최대값을 정확히 설정, .nice() 제거
      .range([innerHeight, 0]);

    // y2 스케일을 y1 스케일에 맞게 조정
    const y2 = d3
      .scaleLinear()
      .domain([0, 100]) // 백분율 범위 (0% ~ 100%)
      .range([innerHeight, 0]);

    // X축용 스케일 (오직 축 표시용 - 양쪽 여백 포함)
    const xAxis = d3
      .scaleBand()
      .domain(processedData.map((d) => d.stageLabel))
      .range([0, innerWidth])
      .padding(0);

    // X축 생성
    const xAxisGen = d3.axisBottom(xAxis).tickSize(0);

    const y1Axis = d3.axisLeft(y1).ticks(5).tickSize(-innerWidth);

    // Y축 추가 (오른쪽 - 백분율)
    const y2Axis = d3
      .axisRight(y2)
      .ticks(5)
      .tickSize(0)
      .tickFormat((d) => `${d}%`);

    // X축 추가 - 위치 수정 및 호버 효과 개선
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxisGen)
      .call((g) => {
        // 각 tick 위치를 바의 중앙으로 수동 조정
        g.selectAll(".tick")
          .attr("transform", (d, i) => `translate(${x(d) + barWidth / 2}, 0)`)
          .each(function (d) {
            // 기존 텍스트 요소 제거
            d3.select(this).select("text").remove();

            const tickGroup = d3.select(this);

            // 기본 텍스트 (말줄임표 처리)
            const textElement = tickGroup
              .append("text")
              .attr("class", "x-axis-label")
              .attr("font-size", "16px")
              .attr("font-family", "Pretendard, Poppins")
              .attr("fill", palette.gray700)
              .attr("dy", "20px")
              .attr("text-anchor", "middle")
              .text(
                d.length > maxLabelLength
                  ? d.substring(0, maxLabelLength) + "..."
                  : d
              );

            // 툴팁 그룹 생성 (처음에는 숨겨둠)
            const tooltipGroup = tickGroup
              .append("g")
              .attr("class", "tooltip-group")
              .attr("opacity", 0)
              .attr("pointer-events", "none");

            // 측정을 위한 임시 텍스트 생성
            const tempText = tooltipGroup
              .append("text")
              .attr("font-size", "14px")
              .attr("font-family", "Pretendard, Poppins")
              .attr("opacity", 0)
              .text(d);

            // 텍스트 크기 측정 후 제거
            const textWidth = tempText.node().getComputedTextLength();
            const textHeight = 16; // 대략적인 텍스트 높이
            tempText.remove();

            // 툴팁 배경 (말풍선)
            const padding = 8;
            const tooltipWidth = textWidth + padding * 2;
            const tooltipHeight = textHeight + padding * 2;

            // 말풍선 배경
            tooltipGroup
              .append("rect")
              .attr("x", -tooltipWidth / 2)
              .attr("y", -tooltipHeight - 15) // 텍스트 위로 15px
              .attr("width", tooltipWidth)
              .attr("height", tooltipHeight)
              .attr("fill", "white")
              .attr("stroke", palette.primary)
              .attr("stroke-width", 1)
              .attr("rx", 4)
              .attr("ry", 4);

            // 말풍선 아래 화살표
            tooltipGroup
              .append("path")
              .attr("d", `M-5,-15 L0,-10 L5,-15 Z`)
              .attr("fill", "white")
              .attr("stroke", palette.primary)
              .attr("stroke-width", 1);

            // 툴팁 텍스트
            tooltipGroup
              .append("text")
              .attr("x", 0)
              .attr("y", -(tooltipHeight / 2) - 15 + 4) // 텍스트를 말풍선 중앙에 위치
              .attr("text-anchor", "middle")
              .attr("font-size", "14px")
              .attr("font-family", "Pretendard, Poppins")
              .attr("fill", "#333")
              .text(d);

            // 5자 이상인 경우에만 호버 이벤트 추가
            if (d.length > maxLabelLength) {
              // 호버 이벤트
              textElement
                .style("cursor", "pointer")
                .on("mouseover", function () {
                  // 텍스트 강조
                  d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("fill", palette.primary)
                    .attr("font-weight", "bold");

                  // 툴팁 표시
                  tooltipGroup.transition().duration(200).attr("opacity", 1);
                })
                .on("mouseout", function () {
                  // 텍스트 원래대로
                  d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("fill", palette.gray700)
                    .attr("font-weight", "normal");

                  // 툴팁 숨기기
                  tooltipGroup.transition().duration(200).attr("opacity", 0);
                });
            }
          });

        // X축 도메인 라인 설정
        g.select(".domain")
          .attr("stroke", palette.gray700)
          .attr("stroke-width", 1);
      });

    // 호버 영역 추가 (바 아래 부분에 투명한 영역 생성)
    g.selectAll(".hover-area")
      .data(processedData)
      .enter()
      .append("rect")
      .attr("class", "hover-area")
      .attr("x", (d) => x(d.stageLabel))
      .attr("y", innerHeight)
      .attr("width", barWidth)
      .attr("height", 40) // 축 아래 영역
      .attr("fill", "transparent") // 투명하게 설정
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        // 해당 라벨 강조
        g.selectAll(".axis-label")
          .filter((label, i) => label === d.stageLabel)
          .transition()
          .duration(200)
          .attr("font-weight", "bold")
          .attr("fill", palette.primary);

        // 툴팁 추가
        const tooltip = g.append("g").attr("class", "tooltip");

        // 툴팁 배경
        tooltip
          .append("rect")
          .attr("x", x(d.stageLabel) - 100)
          .attr("y", innerHeight + 60)
          .attr("width", 200)
          .attr("height", 30)
          .attr("fill", "white")
          .attr("stroke", palette.primary)
          .attr("stroke-width", 1)
          .attr("rx", 4)
          .attr("ry", 4);

        // 툴팁 텍스트
        tooltip
          .append("text")
          .attr("x", x(d.stageLabel) + barWidth / 2)
          .attr("y", innerHeight + 80)
          .attr("text-anchor", "middle")
          .attr("font-size", "14px")
          .attr("font-family", "Pretendard, Poppins")
          .attr("fill", palette.primary)
          .attr("font-weight", "bold")
          .text(d.stageLabel);
      })
      .on("mouseout", function () {
        // 모든 라벨 원래대로
        g.selectAll(".axis-label")
          .transition()
          .duration(200)
          .attr("font-weight", "normal")
          .attr("fill", palette.gray700);

        // 툴팁 제거
        g.selectAll(".tooltip").remove();
      });

    // Y축 추가 (왼쪽 - 값)
    g.append("g")
      .attr("class", "y-axis")
      .call(y1Axis)
      .selectAll("text")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("fill", palette.gray700);

    g.selectAll(".y-axis line")
      .attr("stroke", palette.outlineGray)
      .attr("stroke-dasharray", "2,2");

    g.selectAll(".y-axis path").attr("stroke", "none");

    // Y축 추가 (오른쪽 - 백분율)
    g.append("g")
      .attr("class", "y-axis-percentage")
      .attr("transform", `translate(${innerWidth}, 0)`)
      .call(y2Axis)
      .selectAll("text")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("fill", palette.gray700)
      .attr("dx", "4px");

    // 축 제목 추가
    g.append("text")
      .attr("class", "y-axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("fill", palette.gray700)
      .text("누적 값");

    g.append("text")
      .attr("class", "y-axis-percentage-title")
      .attr("transform", "rotate(-90)")
      .attr("y", innerWidth + 62)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("fill", palette.gray700)
      .text("누적 백분율 (%)");

    // 누적 막대 생성
    const bars = g
      .selectAll(".bar")
      .data(processedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.stageLabel))
      .attr("width", barWidth) // 고정 너비 사용
      .attr("y", innerHeight)
      .attr("height", 0)
      .attr("fill", "#A3C3FF")
      .attr("rx", 2)
      .attr("ry", 2);

    // 파레토 라인 생성 함수 수정
    const createLine = (dataSlice) => {
      return d3
        .line()
        .x((d) => x(d.stageLabel) + barWidth / 2) // 바 중앙에 점 위치
        .y((d) => y2(d.cumulativePercentage)) // customY2 대신 y2 사용
        .curve(d3.curveMonotoneX)(dataSlice);
    };

    // 파레토 라인 경로 생성
    const path = g
      .append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("style", `stroke: ${palette.gray800} !important`)
      .attr("stroke-width", 2)
      .attr("d", createLine([]))
      .attr("opacity", 1);

    // 라인 점 생성
    const points = g
      .selectAll(".point")
      .data(processedData)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d) => x(d.stageLabel) + barWidth / 2) // 바 중앙에 점 위치
      .attr("cy", (d) => y2(d.cumulativePercentage)) // customY2 대신 y2 사용
      .attr("r", 5)
      .attr("fill", palette.gray800)
      .attr("opacity", 0);

    // 누적 값 텍스트 추가
    const valueTexts = g
      .selectAll(".value-text")
      .data(processedData)
      .enter()
      .append("text")
      .attr("class", "value-text")
      .attr("x", (d) => x(d.stageLabel) + barWidth / 2) // 바 중앙에 텍스트 위치
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("opacity", 0)
      .each(function (d) {
        const barHeight = innerHeight - y1(d.cumulativeValue);
        const text = d3.select(this);

        if (barHeight >= 40) {
          // 바 높이가 충분히 높을 때만 내부에 배치
          text
            .attr("y", y1(d.cumulativeValue) + 20)
            .attr("fill", palette.white);
        } else {
          // 바가 너무 낮으면 바 위에 표시
          text
            .attr("y", y1(d.cumulativeValue) - 10)
            .attr("fill", palette.gray800);
        }
      })
      .text((d) => d.cumulativeValue.toFixed(0));

    // 백분율 텍스트 추가
    const percentTexts = g
      .selectAll(".percent-text")
      .data(processedData)
      .enter()
      .append("text")
      .attr("class", "percent-text")
      .attr("x", (d) => x(d.stageLabel) + barWidth / 2 + 5) // 바 중앙에서 약간 오른쪽
      .attr("y", (d) => y2(d.cumulativePercentage) - 10) // customY2 대신 y2 사용
      .attr("text-anchor", "start")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("font-family", "'Pretendard', 'Poppins'")
      .attr("fill", palette.gray800)
      .attr("opacity", 0)
      .text((d) => `${d.cumulativePercentage.toFixed(0)}%`);

    // 애니메이션 적용
    if (animate) {
      // 각 단계별로 애니메이션 적용
      processedData.forEach((_, i) => {
        const delay = i * (animationDuration / processedData.length);
        const duration = animationDuration / processedData.length;

        // 현재 인덱스까지의 바 애니메이션
        bars
          .filter((d, j) => j === i)
          .transition()
          .delay(delay)
          .duration(duration)
          .attr("y", (d) => y1(d.cumulativeValue))
          .attr("height", (d) => innerHeight - y1(d.cumulativeValue));

        // 현재 인덱스까지의 데이터 슬라이스로 선 업데이트
        const currentSlice = processedData.slice(0, i + 1);
        path
          .transition()
          .delay(delay)
          .duration(duration / 2)
          .attr("d", createLine(currentSlice));

        // 해당 점도 함께 표시
        points
          .filter((d, j) => j === i)
          .transition()
          .delay(delay)
          .duration(duration / 2)
          .attr("opacity", 1);

        // 값 텍스트 표시
        valueTexts
          .filter((d, j) => j === i)
          .transition()
          .delay(delay + duration * 0.7)
          .duration(duration * 0.3)
          .attr("opacity", 1);

        // 백분율 텍스트 표시
        percentTexts
          .filter((d, j) => j === i)
          .transition()
          .delay(delay + duration * 0.7)
          .duration(duration * 0.3)
          .attr("opacity", 1);
      });
    } else {
      // 애니메이션 없이 바로 표시
      bars
        .attr("y", (d) => y1(d.cumulativeValue))
        .attr("height", (d) => innerHeight - y1(d.cumulativeValue));

      path.attr("d", createLine(processedData));
      points.attr("opacity", 1);
      valueTexts.attr("opacity", 1);
      percentTexts.attr("opacity", 1);
    }

    // 초기 렌더링 플래그 업데이트
    if (isInitialRender) {
      setIsInitialRender(false);
    }

    // X축 위치에 실선 추가 - 전체 너비 사용
    g.append("line")
      .attr("x1", 0)
      .attr("y1", innerHeight)
      .attr("x2", innerWidth)
      .attr("y2", innerHeight)
      .attr("stroke", palette.gray700)
      .attr("stroke-width", 1);

    // X축 라벨과 툴팁 부분만 수정
    const renderAxisLabelsAndTooltips = () => {
      // 기존 X축 라벨 제거
      g.select(".x-axis").selectAll(".tick text").remove();

      // 새 X축 라벨 및 툴팁 생성
      g.select(".x-axis")
        .selectAll(".tick")
        .each(function (d, i) {
          const tick = d3.select(this);

          // 기본 텍스트 (말줄임표 처리)
          const textElement = tick
            .append("text")
            .attr("class", "x-axis-label")
            .attr("font-size", "16px")
            .attr("font-family", "Pretendard, Poppins")
            .attr("fill", palette.gray700)
            .attr("dy", "20px")
            .attr("text-anchor", "middle")
            .text(
              d.length > maxLabelLength
                ? d.substring(0, maxLabelLength) + "..."
                : d
            );

          // 5자 이상인 경우에만 툴팁 및 호버 이벤트 추가
          if (d.length > maxLabelLength) {
            // 측정을 위한 임시 텍스트 요소 생성 (정확한 텍스트 크기 계산용)
            const tempText = g
              .append("text")
              .attr("font-size", "14px")
              .attr("font-family", "Pretendard, Poppins")
              .attr("opacity", 0)
              .text(d);

            // 텍스트 너비 측정 후 제거
            const textWidth = tempText.node().getComputedTextLength();
            tempText.remove();

            // 툴팁 크기 계산 (텍스트 너비 + 좌우 패딩)
            const sidePadding = 12; // 좌우 여백 각각 12px
            const verticalPadding = 10; // 상하 여백 각각 10px
            const tooltipWidth = textWidth + sidePadding * 2;
            const tooltipHeight = 36; // 고정 높이

            // 툴팁 그룹 생성 (최상단에 표시됨)
            const tooltipGroup = g
              .append("g")
              .attr("class", "tooltip-group")
              .attr(
                "transform",
                `translate(${x(d) + barWidth / 2}, ${innerHeight})`
              )
              .style("opacity", 0)
              .style("pointer-events", "none");

            // 말풍선 배경 (단순한 둥근 사각형) - 삼각형 없음
            tooltipGroup
              .append("rect")
              .attr("x", -tooltipWidth / 2) // 정확히 중앙 정렬
              .attr("y", -50) // 텍스트 위에 위치, 충분한 여백
              .attr("width", tooltipWidth)
              .attr("height", tooltipHeight)
              .attr("fill", "white")
              .attr("stroke", palette.primary)
              .attr("stroke-width", 1)
              .attr("rx", 6) // 둥근 모서리
              .attr("ry", 6);

            // 툴팁 내부 텍스트 - 말풍선 내부 정중앙에 배치
            tooltipGroup
              .append("text")
              .attr("x", 0) // 수평 중앙
              .attr("y", -50 + tooltipHeight / 2) // 말풍선 중앙
              .attr("text-anchor", "middle") // 수평 중앙 정렬
              .attr("dominant-baseline", "middle") // 수직 중앙 정렬
              .attr("font-size", "14px")
              .attr("font-family", "Pretendard, Poppins")
              .attr("fill", "#333")
              .text(d);

            // 호버 이벤트
            textElement
              .style("cursor", "pointer")
              .on("mouseover", function () {
                // 텍스트 강조
                d3.select(this)
                  .transition()
                  .duration(200)
                  .attr("fill", palette.primary)
                  .attr("font-weight", "bold");

                // 툴팁 표시
                tooltipGroup.transition().duration(200).style("opacity", 1);
              })
              .on("mouseout", function () {
                // 텍스트 원래대로
                d3.select(this)
                  .transition()
                  .duration(200)
                  .attr("fill", palette.gray700)
                  .attr("font-weight", "normal");

                // 툴팁 숨기기
                tooltipGroup.transition().duration(200).style("opacity", 0);
              });
          }
        });
    };

    // 모든 SVG 그래프 요소가 그려진 후 마지막에 실행
    renderAxisLabelsAndTooltips();
  }, [
    processedData,
    width,
    height,
    animate,
    animationDuration,
    isInitialRender,
    barWidth,
    sideMargin,
    maxLabelLength,
  ]);

  // 컴포넌트 언마운트 시 툴팁 제거
  useEffect(() => {
    return () => {
      d3.select(".pareto-tooltip").remove();
    };
  }, []);

  return (
    <GraphContainer>
      <svg ref={svgRef} width="100%" height="100%" />
    </GraphContainer>
  );
};

export default ParetoCurveGraph;

// 스타일 컴포넌트
const GraphContainer = styled.div`
  width: 820px; // 가로 사이즈를 820px로 변경
  height: 520px;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: ${palette.white};
  border-radius: 8px;
  font-family: "Pretendard", "Poppins";
  color: ${palette.gray800};
`;
