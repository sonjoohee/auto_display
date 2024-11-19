import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useAtom } from 'jotai';
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import Landingimages from "../../../../assets/styles/Landingimages"
import { INPUT_BUSINESS_INFO } from '../../../AtomStates';

const SamplePage = () => {

  return (
    <AnalysisSection>
      <Analysis>
        <h1>홈케어 뷰티 디바이스와 기능성 화장품</h1>
        <div>
          <strong>주요 특징</strong>
          <p>프리랜서 업무 관리 플랫폼은 프리랜서들이 업무를 효율적으로 관리하고 일정을 체계적으로 계획할 수 있도록 지원하는 서비스입니다. 프로젝트 관리, 시간 기록, 청구서 발행, 고객 관리 등 프리랜서 업무에 필요한 다양한 기능을 제공하여 업무 효율성을 높이고, 시간 관리를 개선하며, 수익 관리를 용이하게 합니다.</p>
        </div>

        <div>
          <strong>주요 기능</strong>
          <ul className="disc">
            <li>프로젝트 관리 기능: 프로젝트별로 작업 목록을 생성하고, 진행 상황을 추적하며, 마감일을 설정하여 업무를 체계적으로 관리할 수 있습니다. 또한, 팀 협업 기능을 통해 다른 프리랜서들과 프로젝트를 공동으로 진행할 수 있으며, 파일 공유 및 의사소통 기능을 제공하여 원활한 협업을 지원합니다.</li>
            <li>시간 기록 기능: 업무별로 작업 시간을 기록하고, 시간 관리를 분석하여 생산성을 향상시킬 수 있습니다. 또한, 시간 기록 데이터를 기반으로 프로젝트별 비용 산정 및 청구서 발행을 자동화하여 시간 관리 및 수익 관리를 효율적으로 할 수 있습니다.</li>
            <li>청구서 발행 기능: 프로젝트 완료 후 고객에게 청구서를 발행하고, 결제 관리를 편리하게 할 수 있습니다. 다양한 결제 방식을 지원하며, 자동화된 청구서 발행 및 관리 기능을 통해 수익 관리를 간소화합니다.</li>
            <li>고객 관리 기능: 고객 정보를 관리하고, 프로젝트 진행 상황을 공유하며, 소통을 효율적으로 할 수 있습니다. 고객과의 커뮤니케이션 이력을 관리하고, 프로젝트별 정보를 제공하여 고객 만족도를 높입니다.</li>
          </ul>
        </div>
      </Analysis>

      <ButtonWrap>
        <div>
          <button type="button">
            <img src={images.IconRefresh} alt="" />
            재생성하기
          </button>
          <button type="button">
            <img src={images.IconEdit} alt="" />
            수정하기
          </button>
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
    </AnalysisSection>
  );
};

export default SamplePage;

const AnalysisSection = styled.div`
  position: relative;
  max-width: 986px;
  width: 100%;
  display:flex;
  flex-direction:column;
  gap:20px;
  text-align: left;
  margin-top: 25px;
  margin-left:50px;
  padding: 28px;
  border-radius: 15px;
  background:${palette.chatGray};
`;

const Analysis = styled.div`
  display:flex;
  flex-direction:column;
  gap:40px;

  h1 {
    font-size: 1.25rem;
    font-weight: 300;
  }

  > div {
    display:flex;
    flex-direction:column;
    gap:12px;

    strong {
      font-weight:600;
      line-height:1.2;
    }

    p, .disc {
      position:relative;
      font-weight:300;
      line-height:1.6;
      color:${palette.gray800};
      padding-left:20px;

      &:before {
        position:absolute;
        left:0;
        top:0;
        width:2px;
        height:100%;
        background:${palette.gray200};
        content:'';
      }
    }

    ul {
      display:flex;
      flex-direction:column;

      li {
        position:relative;
        padding-left:13px;

        &:before {
          position:absolute;
          left:0;
          top:10px;
          width:3px;
          height:3px;
          border-radius:100%;
          background:${palette.gray800};
          content:'';
        }
      }
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

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
