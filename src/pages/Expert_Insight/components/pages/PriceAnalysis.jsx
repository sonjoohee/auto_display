import React, { useRef, useEffect, useState } from "react";
import * as d3 from 'd3';
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";


const PriceAnalysis = () => {
  const sliderRef = useRef(null);
  const [data, setData] = useState([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]);  // 바차트 데이터
  const [range, setRange] = useState([10, 40]);  // 슬라이더 범위 값
  const [barWidth, setBarWidth] = useState(6);
  const [width, setWidth] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      // 부모 컨테이너의 너비를 기준으로 svg 너비를 동적으로 설정
      const newWidth = sliderRef.current.parentElement.offsetWidth;
      setWidth(newWidth);
    };

    // 최초 렌더링 시 부모 컨테이너의 너비 설정
    handleResize();

    // 윈도우 리사이즈 이벤트에 반응하도록 설정
    window.addEventListener("resize", handleResize);
    
    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const svg = d3.select(sliderRef.current);
    // const width = 500;
    const height = 150;
    const margin = { left: 40, right: 40, top: 20, bottom: 20 };

    // x 축 스케일 설정
    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([margin.left, width - margin.right])
      .clamp(true);

    // y 축 스케일 설정 (바차트용)
    const y = d3.scaleLinear()
      .domain([0, d3.max(data)])  // 데이터의 최대값에 맞춤
      .range([height - margin.bottom, margin.top]);

    // 기존 SVG 내용 제거
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    // x축 그리기
    const xAxis = d3.axisBottom(x).ticks(10);
    const xAxisGroup = svg.append('g')
      .attr('class', 'x-axis')  // 축에 'axis' 클래스 추가
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    // x축 스타일 적용 (굵기 10px, 색상 회색)
    xAxisGroup.selectAll('path')
      .style('stroke', '#E0E4EB')
      .style('stroke-width', '5px');

    xAxisGroup.selectAll('line')
      .style('stroke', '#E0E4EB')
      .style('stroke-width', '5px');

    // 선택된 범위에 대한 파란색 선 추가
    svg.append('rect')
      .attr('x', x(range[0]))
      .attr('y', height - margin.bottom + 0)
      .attr('width', x(range[1]) - x(range[0]))
      .attr('height', '5px')
      .style('fill', palette.chatBlue);

    // 바차트 그리기
    const barWidth = (width - margin.left - margin.right) / data.length;
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      // .attr('x', (d, i) => margin.left + i * barWidth)
      .attr('x', (d, i) => margin.left + i * (barWidth + 2))
      .attr('y', d => y(d))
      // .attr('width', barWidth - 1)
      .attr('width', barWidth)
      .attr('height', d => height - margin.bottom - y(d))
      // .style('fill', d => (d >= range[0] && d <= range[1]) ? '#E0E4EB' : '#E0E4EB');
      .style('fill', '#E0E4EB')
      .style('display', d => (d >= range[0] && d <= range[1]) ? 'block' : 'none');

    // 드래그 핸들 추가
    const drag = d3.drag()
      .on('drag', function (event) {
        const pos = d3.pointer(event, this)[0];
        const newValue = Math.round(x.invert(pos));
        const handleIndex = +d3.select(this).attr('data-index');
        const newRange = [...range];
        newRange[handleIndex] = newValue;

        if (newRange[0] < newRange[1]) {
          setRange(newRange);  // 새로운 범위 설정
        }
      });

    // 슬라이더 핸들 두 개 그리기
    svg.selectAll('.handle')
      .data(range)
      .enter().append('circle')
      .attr('class', 'handle')
      .attr('cx', d => x(d))
      .attr('cy', height - margin.bottom + 2)
      .attr('r', 8)
      .attr('data-index', (d, i) => i)
      .style('fill', palette.chatBlue)
      .call(drag);
  }, [range, data, barWidth]);

  const [isMoreView, setIsMoreView] = useState(false);
  const onClickImageMoreViewButton = () => {
    setIsMoreView(!isMoreView);
  };

  return (
    <>
      <Wrap>
        <h1>가격 분석할 제품군을 선택해주세요 (택 1)</h1>

        <OptionContainer>
          <Option
          >뷰티 디바이스</Option>
          <Option>기능성 화장품</Option>
        </OptionContainer>

        <ButtonWrap>
          <div className="finish">확인</div>
        </ButtonWrap>
      </Wrap>

      <Wrap H1Border>
        <h1>뷰티 디바이스 가격 분석 리포트</h1>
        <p>
          <span>소비자 가격 수용 범위 예측</span>
          20만원 ~ 30만원 사이
        </p>

        <ChartWrap>
          <svg ref={sliderRef}></svg>

          <PriceWrap>
            <div>
              <span>최저 가격</span>
              <input type="text" value="₩19,900원"></input>
            </div>
            <div>
              <span>최대 가격</span>
              <input type="text" value="₩2,090,000원"></input>
            </div>
            <div>
              <span>평균가</span>
              <input type="text" value="₩353,700원"></input>
            </div>
          </PriceWrap>

          <p>* (가격의 기준 : 예시 100g당 가격 등)을 기준으로 평가되었습니다.</p>
        </ChartWrap>

        <AnalysisWrap>
          <div>
            <span>가격대 분석</span>
            <p>대부분의 제품은 100,000원에서 500,000원 사이에 형성되어 있으며, 고가 제품은 1,000,000원 이상의 가격대를 형성하고 있습니다.<br />
            경쟁 제품들의 가격과 소비자의 브랜드 인식을 바탕으로, 소비자들이 수용할 수 있는 가격 범위는 100,000원에서 500,000원 사이로 예상됩니다. 특히, 200,000원에서 300,000원 사이의 가격대는 소비자들이 가장 많이 수용할 것으로 예상됩니다.</p>
          </div>

          <AnalysisBox isMoreView={isMoreView}>
            <div>
              <span>최소 가격군 제품</span>
              <ul>
                <li>
                  <span>1</span>
                  <p>루킨스 고주파 마사지기1</p>
                  <strong>1,920,000원</strong>
                </li>
                <li>
                  <span>2</span>
                  <p>루킨스 고주파 마사지기2</p>
                  <strong>1,580,000원</strong>
                </li>
                <li>
                  <span>3</span>
                  <p>루킨스 고주파 마사지기3</p>
                  <strong>1,340,000원</strong>
                </li>
              </ul>
            </div>
            
            <div>
              <span>최대 가격군 제품</span>
              <ul>
                <li>
                  <span>1</span>
                  <p>센텔리안24</p>
                  <strong>279,000원</strong>
                </li>
                <li>
                  <span>2</span>
                  <p>센텔리안21</p>
                  <strong>244,000원</strong>
                </li>
                <li>
                  <span>3</span>
                  <p>센텔리안18</p>
                  <strong>238,000원</strong>
                </li>
              </ul>
            </div>
            
            <div>
              <span>평균가 가격군 제품</span>
              <ul>
                <li>
                  <span>1</span>
                  <p>닥터리</p>
                  <strong>299,000원</strong>
                </li>
                <li>
                  <span>2</span>
                  <p>닥터리</p>
                  <strong>279,000원</strong>
                </li>
                <li>
                  <span>3</span>
                  <p>닥터리</p>
                  <strong>259,000원</strong>
                </li>
              </ul>
            </div>
          </AnalysisBox>

          <MoreViewButtonWrap isMoreView={isMoreView}>
            <MoreButton onClick={onClickImageMoreViewButton} isMoreView={isMoreView}>
              {isMoreView ? "접기" : "더보기"}
            </MoreButton>
          </MoreViewButtonWrap>
        </AnalysisWrap>
      </Wrap>

    </>
  );
};

export default PriceAnalysis;

const Wrap = styled.div`
  max-width:540px;
  width:100%;
  display:flex;
  flex-direction:column;
  gap:20px;
  padding:20px;
  margin:24px 0 0 44px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

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
    padding:8px 20px 8px 6px;
    border-radius:12px;
    background:${palette.chatGray};
  }

  li {
    display:flex;
    align-items:center;
    gap:12px;

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
