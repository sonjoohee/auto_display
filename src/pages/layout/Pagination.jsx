import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";

import images from "../../assets/styles/Images";

const Pagination = () => {

  return (
    <PaginationWrap>
      <Link to="#" className="btnFirst disabled">맨처음</Link>
      <Link to="#" className="btnPrev disabled">이전</Link>

      <Link to="#" className="btn now">1</Link>
      <Link to="#" className="btn">2</Link>
      <Link to="#" className="btn">3</Link>
      <Link to="#" className="btn">4</Link>
      <Link to="#" className="btn">5</Link>
      <Link to="#" className="btn">6</Link>
      <Link to="#" className="btn">7</Link>
      <Link to="#" className="btn">8</Link>
      <Link to="#" className="btn">9</Link>
      <Link to="#" className="btn">10</Link>

      <Link to="#" className="btnNext">다음</Link>
      <Link to="#" className="btnEnd">맨뒤로</Link>
    </PaginationWrap>
  );

};

export default Pagination;

const PaginationWrap = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  margin:30px auto 60px;

  .btn {
    display:inline-block;
    width:33px;
    height:33px;
    font-size:0.88rem;
    color:${palette.gray};
    line-height:33px;
    margin:0 2px;
    border-radius:5px;
    border:1px solid ${palette.white};
    transition:all .5s;

    &:hover {
      border:1px solid ${palette.lineGray};
    }

    &.now {
      color:${palette.blue};
      pointer-events:none;
      background:rgba(4,83,244,.1);
    }
  }

  .btnFirst, .btnPrev, .btnNext, .btnEnd {
    width:33px;
    height:33px;
    font-size:0;
    background-position:center;
    background-repeat:no-repeat;

    &.disabled {
      pointer-events:none;
      opacity:0.3;
    }
  }

  .btnFirst {
    background-image:url(${images.BtnFirst});
  }

  .btnPrev {
    background-image:url(${images.BtnPrev});
  }

  .btnNext {
    background-image:url(${images.BtnNext});
  }

  .btnEnd {
    background-image:url(${images.BtnEnd});
  }
`;