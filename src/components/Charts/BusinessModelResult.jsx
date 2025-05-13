import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from '../../assets/styles/Palette';

/**
 * 비즈니스 모델 결과 컴포넌트
 * 피그마 디자인: https://www.figma.com/design/mM7wQp9Md03OKRu60WQ9cB/Untitled?node-id=149-124
 * 
 * @param {Object} props
 * @param {Array} props.data - 비즈니스 모델 데이터 배열
 * @param {number} props.initialSelectedId - 초기 선택된 ID (기본값: 1)
 * @param {Function} props.onSelectChange - 선택된 ID가 변경될 때 호출되는 콜백
 * @returns {JSX.Element}
 */
const BusinessModelResult = ({ 
  data = [], 
  initialSelectedId = 1, 
  onSelectChange = () => {} 
}) => {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  // 비즈니스 영역 정의 (MoleculeBusinessModelGraph와 동일한 순서)
  const businessAreas = [
    { id: 1, title: '고객 세그먼트' },
    { id: 2, title: '가치 제안' },
    { id: 3, title: '채널' },
    { id: 4, title: '고객 관계' },
    { id: 5, title: '수익원' },
    { id: 6, title: '핵심자원' },
    { id: 7, title: '핵심활동' },
    { id: 8, title: '핵심 파트너십' },
    { id: 9, title: '비용구조' }
  ];

  // 선택된 영역의 정보 가져오기
  const selectedArea = businessAreas.find(area => area.id === selectedId);
  
  // 선택된 ID가 변경될 때 콜백 호출
  useEffect(() => {
    onSelectChange(selectedId);
  }, [selectedId, onSelectChange]);

  // 선택된 영역의 데이터 가져오기
  const getAreaData = (id) => {
    // 실제 데이터가 있으면 해당 데이터 사용
    if (data && data.length > 0) {
      // id에 해당하는 데이터 찾기
      const areaData = data.find(item => item.id === id);
      
      // 데이터 형식에 따라 다르게 처리
      if (areaData) {
        if (id === 1 || id === 2) {
          // 고객 세그먼트와 가치 제안은 특별한 형식
          return Object.values(areaData).filter(item => typeof item === 'string').map((item, index) => 
            `${index + 1}. ${item}`
          );
        } else if (areaData.business_model_canvas_report_education) {
          // 나머지는 표준 형식
          return areaData.business_model_canvas_report_education
            .filter(item => item.type !== "사용자 정의") // 사용자 정의 타입 제외
            .map((item, index) => 
              `${index + 1}. ${item.title}: ${item.description}`
            );
        }
      }
    }
    
    // 데이터가 없는 경우 예시 데이터 반환
    return [
      `1. 여행을 계획 중이라면 저렴한 항공권을 찾는 것이 중요합니다. 여러 항공사와 예약 사이트를 비교해 최적의 가격을 찾아보세요. 비수기나 주중에 여행하면 더 많은 할인 혜택을 받을 수 있습니다.`,
      `2. 추가 요금이 없는지 확인하고, 프로모션 코드나 특별 이벤트를 활용하는 것도 좋은 방법입니다. 이렇게 하면 여행 예산을 절약할 수 있습니다.`,
      `3. 여행을 계획 중이라면 저렴한 항공권을 찾는 것이 중요합니다. 여러 항공사와 예약 사이트를 비교해 최적의 가격을 찾아보세요.`
    ];
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = (id) => {
    setSelectedId(id);
  };

  return (
    <ResultContainer>
      <ButtonColumn>
        {businessAreas.map((area) => (
          <ButtonFrame 
            key={area.id}
            isSelected={selectedId === area.id}
            onClick={() => handleButtonClick(area.id)}
          >
            <NumberCircle isSelected={selectedId === area.id}>
              {area.id}
            </NumberCircle>
          </ButtonFrame>
        ))}
      </ButtonColumn>
      
      <ContentFrame selectedId={selectedId}>
        <ContentHeader>
          <ContentTitle>{selectedArea?.title}</ContentTitle>
        </ContentHeader>
        <ContentBody>
          {getAreaData(selectedId).map((item, index) => (
            <ContentItem key={index}>{item}</ContentItem>
          ))}
          {getAreaData(selectedId).length === 0 && (
            <EmptyContent>
              데이터가 없습니다. 비즈니스 모델 캔버스에서 해당 영역을 작성해주세요.
            </EmptyContent>
          )}
        </ContentBody>
      </ContentFrame>
    </ResultContainer>
  );
};

// 스타일 컴포넌트
const ResultContainer = styled.div`
  display: flex;
  width: 820px;
  height: 444px;
  gap: 0;
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 44px;
  height: 444px; /* 전체 높이 명시 */
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background-color: #E0E4EB;
    z-index: 1;
  }
`;

const ButtonFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  background-color: ${props => props.isSelected ? '#FFFFFF' : '#F6F6F6'};
  border-top: 1px solid #E0E4EB;
  border-bottom: 1px solid #E0E4EB;
  border-left: 1px solid #E0E4EB;
  border-right: none;
  position: relative;
  z-index: ${props => props.isSelected ? '2' : '1'};
  height: 44px; /* 444px - (8 * 6px 간격) / 9개 버튼 = 44px */
  padding: 0; /* 패딩 제거하고 높이로 통일 */
  
  &:hover {
    background-color: ${props => props.isSelected ? '#FFFFFF' : '#F0F0F0'};
  }
`;

const NumberCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.isSelected ? '#000000' : '#CCCCCC'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: white;
  font-family: 'Pretendard', 'Poppins', sans-serif;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  line-height: 1;
  letter-spacing: -0.03em;
`;

const ContentFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  padding: 12px 20px;
  border: 1px solid #E0E4EB;
  border-left: none;
  border-radius: 0 10px 10px 0;
  background-color: #FFFFFF;
  overflow: hidden; /* 내용이 넘치지 않도록 설정 */
  position: relative;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentTitle = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  height: 100%;
  
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${palette.gray300};
    border-radius: 4px;
  }
`;

const ContentItem = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
  white-space: pre-wrap; /* 줄바꿈 유지 */
  text-align: left;
`;

const EmptyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${palette.gray400};
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

export default BusinessModelResult;