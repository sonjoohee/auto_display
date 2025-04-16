import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { palette } from "../../assets/styles/Palette";

/**
 * 파레토 커브(Pareto Curve) 그래프 컴포넌트
 * 각 단계마다 이전 단계의 값이 누적되는 형태로 표시
 */
const ParetoCurveGraph = ({
  data = [
    { name: "항목 1", value: 35 },
    { name: "항목 2", value: 20 },
    { name: "항목 3", value: 15 },
    { name: "항목 4", value: 10 },
    { name: "항목 5", value: 8 },
    { name: "항목 6", value: 6 },
    { name: "항목 7", value: 4 },
    { name: "항목 8", value: 2 }
  ],
  width = 600,
  height = 520,
  animate = true,
  animationDuration = 1000
}) => {
  const svgRef = useRef(null);
  const [processedData, setProcessedData] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // 데이터 처리 함수: 누적 값 계산
  useEffect(() => {
    if (!data || data.length === 0) return;

    // 데이터 내림차순 정렬 (가장 큰 값부터)
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    
    // 총합 계산
    const total = sortedData.reduce((sum, item) => sum + item.value, 0);
    
    // 누적 값 계산
    let cumulativeValue = 0;
    const processed = sortedData.map((item, index) => {
      cumulativeValue += item.value;
      
      // 단계별 레이블 생성 (1단계, 2단계, ...)
      const stageLabel = `${index + 1}단계`;
      
      return {
        name: item.name,
        stageLabel: stageLabel,
        originalValue: item.value,
        cumulativeValue: cumulativeValue,
        cumulativePercentage: (cumulativeValue / total) * 100
      };
    });
    
    setProcessedData(processed);
  }, [data]);

  // D3 그래프 렌더링
  useEffect(() => {
    if (!processedData.length || !svgRef.current) return;

    // SVG 요소 선택 및 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 마진 설정
    const margin = { top: 40, right: 80, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 그래프 그룹 생성
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 스케일 설정
    const x = d3.scaleBand()
      .domain(processedData.map(d => d.stageLabel))
      .range([0, innerWidth])
      .padding(0.3);

    const y1 = d3.scaleLinear()
      .domain([0, d3.max(processedData, d => d.cumulativeValue) * 1.1])
      .nice()
      .range([innerHeight, 0]);

    const y2 = d3.scaleLinear()
      .domain([0, 100])
      .nice()
      .range([innerHeight, 0]);

    // 축 생성
    const xAxis = d3.axisBottom(x)
      .tickSize(0);

    const y1Axis = d3.axisLeft(y1)
      .ticks(5)
      .tickSize(-innerWidth);

    const y2Axis = d3.axisRight(y2)
      .ticks(5)
      .tickSize(0)
      .tickFormat(d => `${d}%`);

    // X축 추가
    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins', sans-serif")
      .attr("fill", palette.gray700);

    // Y축 추가 (왼쪽 - 값)
    g.append("g")
      .attr("class", "y-axis")
      .call(y1Axis)
      .selectAll("text")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins', sans-serif")
      .attr("fill", palette.gray700);

    g.selectAll(".y-axis line")
      .attr("stroke", palette.outlineGray)
      .attr("stroke-dasharray", "2,2");

    g.selectAll(".y-axis path")
      .attr("stroke", "none");

    // Y축 추가 (오른쪽 - 백분율)
    g.append("g")
      .attr("class", "y-axis-percentage")
      .attr("transform", `translate(${innerWidth}, 0)`)
      .call(y2Axis)
      .selectAll("text")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins', sans-serif")
      .attr("fill", palette.gray700)
      .attr("dx", "12px");

    // 축 제목 추가
    g.append("text")
      .attr("class", "y-axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins', sans-serif")
      .attr("fill", palette.gray700)
      .text("누적 값");

    g.append("text")
      .attr("class", "y-axis-percentage-title")
      .attr("transform", "rotate(-90)")
      .attr("y", innerWidth + 50)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-family", "'Pretendard', 'Poppins', sans-serif")
      .attr("fill", palette.gray700)
      .text("누적 백분율 (%)");

    // 누적 막대 생성
    const bars = g.selectAll(".bar")
      .data(processedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.stageLabel))
      .attr("width", x.bandwidth())
      .attr("y", innerHeight)
      .attr("height", 0)
      .attr("fill", palette.primary)
      .attr("rx", 2)
      .attr("ry", 2);

    // 파레토 라인 생성 함수
    const createLine = (dataSlice) => {
      return d3.line()
        .x(d => x(d.stageLabel) + x.bandwidth() / 2)
        .y(d => y2(d.cumulativePercentage))
        .curve(d3.curveMonotoneX)(dataSlice);
    };

    // 파레토 라인 경로 생성
    const path = g.append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", palette.gray900)
      .attr("stroke-width", 2)
      .attr("d", createLine([]))
      .attr("opacity", 1);

    // 라인 점 생성
    const points = g.selectAll(".point")
      .data(processedData)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", d => x(d.stageLabel) + x.bandwidth() / 2)
      .attr("cy", d => y2(d.cumulativePercentage))
      .attr("r", 5)
      .attr("fill", palette.gray900)
      .attr("opacity", 0);

    // 누적 값 텍스트 추가
    const valueTexts = g.selectAll(".value-text")
      .data(processedData)
      .enter()
      .append("text")
      .attr("class", "value-text")
      .attr("x", d => x(d.stageLabel) + x.bandwidth() / 2)
      .attr("y", d => y1(d.cumulativeValue) - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("font-family", "'Pretendard', 'Poppins', sans-serif")
      .attr("fill", palette.gray800)
      .attr("opacity", 0)
      .text(d => d.cumulativeValue.toFixed(0));

    // 백분율 텍스트 추가
    const percentTexts = g.selectAll(".percent-text")
      .data(processedData)
      .enter()
      .append("text")
      .attr("class", "percent-text")
      .attr("x", d => x(d.stageLabel) + x.bandwidth() / 2)
      .attr("y", d => y2(d.cumulativePercentage) - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("font-family", "'Pretendard', 'Poppins', sans-serif")
      .attr("fill", palette.gray900)
      .attr("opacity", 0)
      .text(d => `${d.cumulativePercentage.toFixed(0)}%`);

    // 애니메이션 적용
    if (animate) {
      // 각 단계별로 애니메이션 적용
      processedData.forEach((_, i) => {
        const delay = i * (animationDuration / processedData.length);
        const duration = animationDuration / processedData.length;
        
        // 현재 인덱스까지의 바 애니메이션
        bars.filter((d, j) => j === i)
          .transition()
          .delay(delay)
          .duration(duration)
          .attr("y", d => y1(d.cumulativeValue))
          .attr("height", d => innerHeight - y1(d.cumulativeValue));
        
        // 현재 인덱스까지의 데이터 슬라이스로 선 업데이트
        const currentSlice = processedData.slice(0, i + 1);
        path.transition()
          .delay(delay)
          .duration(duration / 2)
          .attr("d", createLine(currentSlice));
        
        // 해당 점도 함께 표시
        points.filter((d, j) => j === i)
          .transition()
          .delay(delay)
          .duration(duration / 2)
          .attr("opacity", 1);
        
        // 값 텍스트 표시
        valueTexts.filter((d, j) => j === i)
          .transition()
          .delay(delay + duration * 0.7)
          .duration(duration * 0.3)
          .attr("opacity", 1);
        
        // 백분율 텍스트 표시
        percentTexts.filter((d, j) => j === i)
          .transition()
          .delay(delay + duration * 0.7)
          .duration(duration * 0.3)
          .attr("opacity", 1);
      });
    } else {
      // 애니메이션 없이 바로 표시
      bars
        .attr("y", d => y1(d.cumulativeValue))
        .attr("height", d => innerHeight - y1(d.cumulativeValue));
      
      path.attr("d", createLine(processedData));
      points.attr("opacity", 1);
      valueTexts.attr("opacity", 1);
      percentTexts.attr("opacity", 1);
    }

    // 초기 렌더링 플래그 업데이트
    if (isInitialRender) {
      setIsInitialRender(false);
    }

  }, [processedData, width, height, animate, animationDuration, isInitialRender]);

  return (
    <GraphContainer>
      <svg ref={svgRef} width="100%" height="100%" />
    </GraphContainer>
  );
};

export default ParetoCurveGraph;

// 스타일 컴포넌트
const GraphContainer = styled.div`
  width: 600px;
  height: 520px;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: ${palette.white};
  border-radius: 8px;
  font-family: 'Pretendard', 'Poppins', sans-serif;
`; 