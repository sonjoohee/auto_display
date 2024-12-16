import React, { useEffect, useRef } from "react";
import * as d3 from "d3";


  useEffect(() => {
    const updateChart = () => {
      const container = containerRef.current;
// <<<<<<< branch-fixBubbleChartNode
//       const containerWidth = container.clientWidth;
//       const width = containerWidth;
//       // 높이를 조정하여 여백 줄이기
//       const height = Math.min(containerWidth, 350); // 500에서 300으로 수정
// =======
      
      // 너비 설정
      const width = customWidth || container.clientWidth;
      
      // 높이 설정 수정
      // 데이터의 크기를 고려하여 최소 높이 계산
      const minHeight = Math.max(
        ...data.map(d => Math.sqrt(d.value * 100) * 2.5) // 버블 크기의 2.5배
      ) * 2; // 상하 여백을 위해 2배
      
      // customHeight가 있으면 사용하고, 없으면 계산된 minHeight와 container.clientWidth 중 큰 값 사용
      const height = customHeight || Math.max(minHeight, Math.min(container.clientWidth, 400));


      d3.select(svgRef.current).selectAll("*").remove();

      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      const categoryColors = {
        카테고리1: "rgba(54,26,128,.1)",
        카테고리2: "rgba(86,154,126,.1)",
        카테고리3: "rgba(161,98,109,.1)",
      };

      const simulation = d3
        .forceSimulation(data)
        .force("center", d3.forceCenter(width / 2, height / 2).strength(1))
        .force(
          "collision",
          d3.forceCollide().radius((d) => Math.sqrt(d.value * 150)) // 200에서 150으로 수정하여 버블 크기 조정
        )
        .force("charge", d3.forceManyBody().strength(-30))
        .force("x", d3.forceX(width / 2).strength(0.1))
        .force("y", d3.forceY(height / 2).strength(0.1));

      const nodes = svg
        .selectAll(".node")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "node");

      nodes
        .append("circle")
        .attr("r", (d) => Math.sqrt(d.value * 150)) // 200에서 150으로 수정
        .style("fill", (d) => categoryColors[d.category])
        .style("stroke", "#fff")
        .style("stroke-width", "2px");

      nodes
        .append("text")
        .text((d) => `${d.name}\n${d.value}%`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", (d) => `${Math.sqrt(d.value) * 2}px`) // 2.5에서 2로 수정하여 텍스트 크기 조정
        .style("fill", (d) => {
          const category = d.category;
          switch (category) {
            case "카테고리1":
              return "#361a80";
            case "카테고리2":
              return "#569a7e";
            case "카테고리3":
              return "#a1626d";
            default:
              return "#333333";
          }
        })
        .each(function (d) {
          const text = d3.select(this);
          const words = text.text().split("\n");
          text.text("");

          const lineHeight = 1.2;
          const totalLines = words.length;
          const startY = -(lineHeight * (totalLines - 1)) / 2;

          words.forEach((word, i) => {
            text
              .append("tspan")
              .text(word)
              .attr("x", 0)
              .attr("y", 0)
              .attr("dy", `${startY + i * lineHeight}em`);
          });
        });

      simulation.on("tick", () => {
        nodes.attr("transform", (d) => {
          // 여백을 줄이기 위해 제한 값을 25로 수정 (기존 50의 절반)
          d.x = Math.max(25, Math.min(width - 25, d.x));
          d.y = Math.max(25, Math.min(height - 25, d.y));
          return `translate(${d.x},${d.y})`;
        });
      });
    };

    updateChart();

    const handleResize = () => {
      updateChart();
    };

    window.addEventListener("resize", handleResize);
// <<<<<<< branch-fixBubbleChartNode
//     return () => window.removeEventListener("resize", handleResize);
//   }, [data]);
// =======

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [customWidth, customHeight]);
// >>>>>>> main

  return (
    <div
      ref={containerRef}
      style={{
        width: customWidth || "100%",
        height: customHeight || "auto",
        maxWidth: "1000px",
        margin: "0 auto",
// <<<<<<< branch-fixBubbleChartNode
//         padding: "10px", // 20px에서 10px로 수정
// =======
        overflow: "hidden"
// >>>>>>> main
      }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BubbleChart;
