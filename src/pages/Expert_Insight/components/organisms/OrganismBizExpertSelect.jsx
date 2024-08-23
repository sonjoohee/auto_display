// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismBizExpertSelect.jsx

import React from 'react';
import styled from 'styled-components';

const OrganismBizExpertSelect = () => {
  return (
    <BizExpertSelectContainer>
      <h2>홈케어 뷰티 디바이스와 기능성화장품에 대해 전문가에게 직접 확인해보세요</h2>
      <SelectOptions>
        <Option>
          <Button>10차시 전략 다회차 1:1 커피챗하기</Button>
        </Option>
        <Option>
          <Button>브랜드 전문가의 10초 맞춤 제안서 받기</Button>
        </Option>
        <Option>
          <Button>지금 바로 만나 타겟 고객 확인하기</Button>
        </Option>
      </SelectOptions>
      <TextInput placeholder="질문을 입력해주세요" />
    </BizExpertSelectContainer>
  );
};

export default OrganismBizExpertSelect;

const BizExpertSelectContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
`;

const SelectOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: #f4f4f4;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
`;
