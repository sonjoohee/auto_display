import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO, 
} from '../../../AtomStates';

import OrganismHeader from '../../../organisms/OrganismHeader';

const PageMeetAiExpert = () => {

  const navigate = useNavigate();

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);

  useEffect(() => {
    setSelectedExpertIndex(SELECTED_EXPERT_INDEX);
    setInputBusinessInfo(INPUT_BUSINESS_INFO);
  }, []);
  
  return (
    <div>
      <OrganismHeader />

      <Container>
        <Title>Meet AI Expert</Title>
        <Subtitle>
          단 한 줄의 사업 아이디어로 시작하는 AI 전문가와의 짧고 강력한 인사이트 세션
        </Subtitle>

        <InputField placeholder="당신의 비즈니스를 간단히 입력한 후 시작해보세요!" onChange={(e) => setInputBusinessInfo(e.target.value)}/>
        <div onClick={() => {setSelectedExpertIndex(0); navigate("/ExpertInsight");}}>Let's go</div>

        <ExpertSelectionSection>
          <ExpertCard selected onClick={() => {setSelectedExpertIndex(1); navigate("/ExpertInsight");}}>
            <Icon>💡</Icon>
            <ExpertTitle>서비스/프로덕트 전략가</ExpertTitle>
            <ExpertDescription>
              10년 경력 시장에서 통하는 전략을 확인해보세요
            </ExpertDescription>
          </ExpertCard>
          <ExpertCard onClick={() => {setSelectedExpertIndex(2); navigate("/ExpertInsight");}}>
            <Icon>💡</Icon>
            <ExpertTitle>마케팅 구축</ExpertTitle>
            <ExpertDescription>
              브랜드/마케팅 교수와의 컨설팅 미팅
            </ExpertDescription>
          </ExpertCard>
          <ExpertCard onClick={() => {setSelectedExpertIndex(3); navigate("/ExpertInsight");}}>
            <Icon>💡</Icon>
            <ExpertTitle>고객 인사이트 전문가</ExpertTitle>
            <ExpertDescription>
              고객 이탈 극복 노하우 비즈니스 팁을 공유해요
            </ExpertDescription>
          </ExpertCard>
        </ExpertSelectionSection>

        <Link>다른 분야 전문가가 필요하신가요?</Link>

        <FAQSection>
          <FAQItem>
            <FAQQuestion>우리 스타트업의 비즈니스 모델을 어떻게 검증하고 개선할 수 있을까요?</FAQQuestion>
          </FAQItem>
          <FAQItem>
            <FAQQuestion>초기 단계에서 효과적으로 자금을 조달하는 방법은 무엇인가요?</FAQQuestion>
          </FAQItem>
          <FAQItem>
            <FAQQuestion>제품-시장 적합성(Product-Market Fit)을 빠르게 달성하기 위한 전략은 무엇인가요?</FAQQuestion>
          </FAQItem>
          <FAQItem>
            <FAQQuestion>기 고객을 확보하고 시장에 기반을 빠르게 확장하는 방법은 무엇인가요?</FAQQuestion>
          </FAQItem>
          <FAQItem>
            <FAQQuestion>스타트업의 성장을 인력적인 면에서 어떻게 견고히 구축할 인재를 발굴하고 나아가야 할까요?</FAQQuestion>
          </FAQItem>
        </FAQSection>
      </Container>
    </div>
  );
};

export default PageMeetAiExpert;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px 40px;  /* 상단에 충분한 패딩을 추가 */
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
`;

const InputField = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ExpertSelectionSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const ExpertCard = styled.div`
  background-color: ${(props) => (props.selected ? '#000' : '#fff')};
  color: ${(props) => (props.selected ? '#fff' : '#000')};
  padding: 30px 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  max-width: 300px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.selected ? '#333' : '#f1f1f1')};
  }
`;

const Icon = styled.div`
  font-size: 36px;
  margin-bottom: 15px;
`;

const ExpertTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ExpertDescription = styled.p`
  font-size: 14px;
`;

const Link = styled.a`
  color: #007bff;
  font-size: 16px;
  text-decoration: underline;
  margin-bottom: 40px;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const FAQSection = styled.div`
  width: 100%;
  max-width: 800px;
`;

const FAQItem = styled.div`
  border-top: 1px solid #ddd;
  padding: 15px 0;

  &:last-child {
    border-bottom: 1px solid #ddd;
  }
`;

const FAQQuestion = styled.div`
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;
