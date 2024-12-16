import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BubbleChart = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    // 샘플 데이터
    const data = [
      { id: 1, name: "그룹 A", value: 10, category: "카테고리1" },
      { id: 2, name: "그룹 B", value: 45, category: "카테고리1" },
      { id: 3, name: "그룹 C", value: 25, category: "카테고리2" },
      { id: 4, name: "그룹 D", value: 55, category: "카테고리2" },
      { id: 5, name: "그룹 E", value: 35, category: "카테고리3" },
      { id: 6, name: "그룹 F", value: 40, category: "카테고리3" },
    ];

    const updateChart = () => {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      
      // SVG 크기 설정
      const width = containerWidth;
      const height = Math.min(containerWidth, 500);
      
      // 기존 SVG 삭제
      d3.select(svgRef.current).selectAll("*").remove();
      
      // SVG 생성
      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      // 카테고리별 색상 정의
      const categoryColors = {
        '카테고리1': 'rgba(54,26,128,.1)',
        '카테고리2': 'rgba(86,154,126,.1)',
        '카테고리3': 'rgba(161,98,109,.1)'
      };
      
      // 시뮬레이션 설정
      const simulation = d3.forceSimulation(data)
        .force("charge", d3.forceManyBody().strength(100))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(d => Math.sqrt(d.value * 100)));
      
      // 색상 함수 정의
      const color = d => categoryColors[d.category];
      
      // 툴팁 생성
      const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("padding", "10px")
        .style("background", "rgba(255, 255, 255, 0.9)")
        .style("border", "1px solid #ddd")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("font-size", "14px")
        .style("line-height", "1.4")
        .style("box-shadow", "0 2px 4px rgba(0, 0, 0, 0.1)")
        .style("opacity", 0);
      
      // 버블 그리기
      const nodes = svg.selectAll(".node")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "node")
        .style("cursor", "pointer");
      
      // 원 추가
      nodes.append("circle")
        .attr("r", d => Math.sqrt(d.value * 100))
        .style("fill", d => color(d))
        .style("stroke", "#fff")
        .style("stroke-width", "2px")
        .style("transition", "all 0.3s ease")
        .on("mouseover", (event, d) => {
          d3.select(event.currentTarget)
            .style("stroke-width", "3px")
            .style("opacity", 0.8);

          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(
            `이름: ${d.name}<br/>
             카테고리: ${d.category}<br/>
             값: ${d.value}`
          )
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", (event) => {
          d3.select(event.currentTarget)
            .style("stroke-width", "2px")
            .style("opacity", 1);

          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });
      
      // 텍스트 추가
      nodes.append("text")
        .text(d => d.name)
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .style("font-size", d => `${Math.sqrt(d.value) * 3}px`)
        .style("pointer-events", "none")
        .style("fill", d => {
          const category = d.category;
          switch(category) {
            case '카테고리1':
              return '#361a80'; // 흰색
            case '카테고리2':
              return '#569a7e'; // 흰색
            case '카테고리3':
              return '#a1626d'; // 흰색
            default:
              return '#333333';
          }
        });
      
      // 시뮬레이션 업데이트
      simulation.on("tick", () => {
        nodes.attr("transform", d => `translate(${d.x},${d.y})`);
      });
    };

    // 초기 차트 생성
    updateChart();

    // 윈도우 리사이즈 이벤트 리스너
    const handleResize = () => {
      updateChart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px'
      }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BubbleChart;