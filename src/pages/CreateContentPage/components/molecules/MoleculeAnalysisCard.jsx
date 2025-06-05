import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { H4, InputText } from "../../../../assets/styles/Typography";

const MoleculeAnalysisCard = ({ 
  title = "정보 개요 요약", 
  buttonText = "분석 상세 확인", 
  onButtonClick, 
  values = {},
  showButton = true,
  type = "default"
}) => {
  // 기본 데이터와 템플릿 데이터 분리
  const getAnalysisData = () => {
    if (type === "template") {
      return [
        {
          label: "기기정보",
          value: values.deviceInfo || "기기명 (55인치 / 1920×1080(FHD) / 1217×685mm)"
        },
        {
          label: "자료명",
          value: values.materialName || "수성기리축제 안내 자료"
        },
        {
          label: "핵심 내용",
          value: values.coreContent || "민, 관, 군이 참여하는 고성 간성지역 대표 기리축제 소개"
        },
        {
          label: "콘텐츠 목적",
          value: values.contentPurpose || "정보전달형",
          hasLink: true,
          linkText: "자세히 보기"
        },
        {
          label: "디자인컨셉",
          value: values.designConcept || "미니멀 & 고대비 디자인 (가독성 강화)"
        }
      ];
    } else {
      // 기본 데이터
      return [
        {
          label: "기기정보",
          value: values.deviceInfo || "기기명 (55인치 / 1920×1080(FHD) / 1217×685mm)"
        },
        {
          label: "지료형",
          value: values.materialType || "수용기기에 맞춰 맞춤 지료"
        },
        {
          label: "용처",
          value: values.usage || "강원도 고성군 관광포털 웹사이트에서 제공된 콘텐츠를 기반으로 구성된 자료"
        },
        {
          label: "핵심 내용",
          value: values.coreContent || "민, 관, 군이 함께하는 고성 간성지역 대표 지역축제 소개"
        },
        {
          label: "형식",
          value: values.format || "파일 업로드 (pdf), 직접 입력"
        }
      ];
    }
  };

  const analysisData = getAnalysisData();

  return (
    <AnalysisCard>
      <CardHeader>
        <H4 color="gray800">{title}</H4>
        {showButton && buttonText && (
          <Button Small Outline onClick={onButtonClick}>
            <InputText color="gray700">{buttonText}</InputText>
          </Button>
        )}
      </CardHeader>
      
      <AnalysisTable>
        {analysisData.map((item, index) => (
          <AnalysisRow key={index}>
            <AnalysisLabel>{item.label}</AnalysisLabel>
            <AnalysisValue>
              {item.value}
              {item.hasLink && (
                <LinkText onClick={onButtonClick}>
                  {item.linkText}
                </LinkText>
              )}
            </AnalysisValue>
          </AnalysisRow>
        ))}
      </AnalysisTable>
    </AnalysisCard>
  );
};

export default MoleculeAnalysisCard;

const AnalysisCard = styled.div`
  background: #F8F9FA;
  border: 1px solid #E9ECEF;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AnalysisTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AnalysisRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-height: 40px;
`;

const AnalysisLabel = styled.div`
  min-width: 80px;
  width: 80px;
  font-size: 18px;
  font-weight: 600;
  color: black;
  // padding: 8px 12px;
  border-radius: 4px;
  text-align: left;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const AnalysisValue = styled.div`
  flex: 1;
  font-size: 18px;
  color: ${palette.gray800};
  text-align: left;
  // line-height: 1.5;
  // padding: 8px 0;
  display: flex;
  align-items: center;
`;

// 링크 텍스트 스타일 추가
const LinkText = styled.span`
  color: ${palette.primary};
  cursor: pointer;
  margin-left: 8px;
  text-decoration: underline;
  font-size: 16px;
  
  &:hover {
    opacity: 0.8;
  }
`; 