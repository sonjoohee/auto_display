import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../../assets/styles/Palette';
import MoleculeBusinessModelPopup from "./MoleculeBusinessModelPopup";
import { useAtom } from "jotai";
import { BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS, BUSINESS_MODEL_CANVAS_POPUP_OPTIONS ,BUSINESS_MODEL_CANVAS_GRAPH_ITEMS} from "../../../../AtomStates";

// 비즈니스 모델 그래프 컴포넌트
const MoleculeBusinessModelGraph = ({ data = {}, onBoxClick, setShowPopup = () => {}, setSelectedBoxId, selectedBoxId, }) => {
  const [bmCanvasSelectedPopupOptions, setBMCanvasSelectedPopupOptions] = useAtom(BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS);
  const [bmCanvasPopupOptions, setBMCanvasPopupOptions] = useAtom(BUSINESS_MODEL_CANVAS_POPUP_OPTIONS);
  const [businessModelCanvasGraphItems, setBusinessModelCanvasGraphItems] = useAtom(BUSINESS_MODEL_CANVAS_GRAPH_ITEMS);
  // 이미 클릭한 버튼들을 추적하는 상태 추가
  const [clickedBoxes, setClickedBoxes] = useState([]);
  // 현재 활성화된 다음 단계의 버튼 ID를 추적
  const [nextActiveBoxId, setNextActiveBoxId] = useState(null);

  const businessAreas = [
    { id: 8, title: '핵심 파트너십' },
    { id: 7, title: '핵심활동' },
    { id: 6, title: '핵심자원' },
    { id: 2, title: '가치 제안' },
    { id: 4, title: '고객 관계' },
    { id: 3, title: '채널' },
    { id: 1, title: '고객 세그먼트' },
    { id: 9, title: '비용구조' },
    { id: 5, title: '수익원' }
  ];

  // 다음 활성화될 버튼 ID를 찾는 함수
  const findNextActiveBoxId = () => {
    for (const area of businessAreas) {
      if (isBoxActive(area.id) && area.id !== selectedBoxId) {
        return area.id;
      }
    }
    return null;
  };

  // 선택된 박스가 변경될 때 다음 활성화될 버튼 ID 업데이트
  useEffect(() => {
    setNextActiveBoxId(findNextActiveBoxId());
  }, [selectedBoxId, businessModelCanvasGraphItems]);

  const handleBoxClick = (id) => {
    // id가 1이나 2일 때는 클릭 불가
    if (id === 1 || id === 2) {
      return;
    }
  
    // 이전 박스의 데이터 가져오기 (id-2: 0번, 1번 ...)
    const previousBox = businessModelCanvasGraphItems[id - 2];
    const isPreviousBoxFilled = previousBox && Object.values(previousBox).length > 0;
  
    if (!isPreviousBoxFilled) {
      return; // 팝업이 열리지 않음
    }
  
    // 클릭한 박스 ID를 클릭된 박스 목록에 추가
    if (!clickedBoxes.includes(id)) {
      setClickedBoxes([...clickedBoxes, id]);
    }
    
    setSelectedBoxId(id);
    setShowPopup(id);
  };
  
  const isBoxActive = (id) => {
    // id가 1이나 2일 때는 비활성화
    if (id === 1 || id === 2) {
      return false;
    }
  
    const previousBox = businessModelCanvasGraphItems[id - 2];
    const isPreviousBoxFilled = previousBox && Object.values(previousBox).length > 0;
  
    if (!isPreviousBoxFilled) {
      return false;
    }
  
    return true;
  };

  // 박스가 이미 클릭되었는지 확인하는 함수
  const isBoxClicked = (id) => {
    return clickedBoxes.includes(id);
  };

  // 박스가 현재 다음 단계로 활성화된 버튼인지 확인
  const isNextActiveBox = (id) => {
    return id === nextActiveBoxId;
  };

  return (
    <GraphContainer>
      <TopSection>
        {/* 상단 섹션: 핵심 파트너십, 핵심활동, 핵심자원, 가치 제안, 고객 관계, 채널, 고객 세그먼트 */}
        <LeftColumn>
          {/* 핵심 파트너십 */}
          <ModelBox 
            title={businessAreas[0].title} 
            id={businessAreas[0].id}
            items={Array.isArray(businessModelCanvasGraphItems[7]) ? 
              businessModelCanvasGraphItems[7].slice(0, 7).map(item => item.title) : 
              []
            }
            onClick={() => handleBoxClick(businessAreas[0].id)}
            isSelected={selectedBoxId === businessAreas[0].id}
            isActive={isBoxActive(businessAreas[0].id)}
            isClicked={isBoxClicked(businessAreas[0].id)}
            isNextActive={isNextActiveBox(businessAreas[0].id)}
            style={{
              cursor: isBoxActive(businessAreas[0].id) ? 'pointer' : 'not-allowed',
              opacity: isBoxActive(businessAreas[0].id) ? 1 : 0.7
            }}
          />
        </LeftColumn>

        <MiddleColumns>
          <Column>
            {/* 핵심활동 */}
            <ModelBox 
              title={businessAreas[1].title} 
              id={businessAreas[1].id}
              items={
                businessModelCanvasGraphItems[6]?.business_model_canvas_report_education
                  ? businessModelCanvasGraphItems[6].business_model_canvas_report_education.slice(0, 7).map(item => item.title)
                  : []
              }
              onClick={() => handleBoxClick(businessAreas[1].id)}
              isSelected={selectedBoxId === businessAreas[1].id}
              isActive={isBoxActive(businessAreas[1].id)}
              isClicked={isBoxClicked(businessAreas[1].id)}
              isNextActive={isNextActiveBox(businessAreas[1].id)}
              style={{
                cursor: isBoxActive(businessAreas[1].id) ? 'pointer' : 'not-allowed',
                opacity: isBoxActive(businessAreas[1].id) ? 1 : 0.7
              }}
            />
            {/* 핵심자원 */}
            <ModelBox 
              title={businessAreas[2].title} 
              id={businessAreas[2].id}
              items={
                businessModelCanvasGraphItems[5]?.business_model_canvas_report_education
                  ? businessModelCanvasGraphItems[5].business_model_canvas_report_education.slice(0, 7).map(item => item.title)
                  : []
              }
              onClick={() => handleBoxClick(businessAreas[2].id)}
              isSelected={selectedBoxId === businessAreas[2].id}
              isActive={isBoxActive(businessAreas[2].id)}
              isClicked={isBoxClicked(businessAreas[2].id)}
              isNextActive={isNextActiveBox(businessAreas[2].id)}
              style={{
                cursor: isBoxActive(businessAreas[2].id) ? 'pointer' : 'not-allowed',
                opacity: isBoxActive(businessAreas[2].id) ? 1 : 0.7
              }}
            />
          </Column>

          <Column>
            {/* 가치 제안 */}
            <ModelBox 
              title={businessAreas[3].title} 
              id={businessAreas[3].id}
              items={
                Array.isArray(businessModelCanvasGraphItems) && businessModelCanvasGraphItems[1]
                  ? Object.values(businessModelCanvasGraphItems[1]).slice(0, 7)
                  : []
              }
              onClick={() => handleBoxClick(businessAreas[3].id)}
              isSelected={selectedBoxId === businessAreas[3].id}
              isActive={isBoxActive(businessAreas[3].id)}
              isClicked={isBoxClicked(businessAreas[3].id)}
              isNextActive={isNextActiveBox(businessAreas[3].id)}
              style={{
                cursor: isBoxActive(businessAreas[3].id) ? 'pointer' : 'not-allowed',
                opacity: isBoxActive(businessAreas[3].id) ? 1 : 0.7
              }}
            />  
          </Column>

          <Column>
            {/* 고객 관계 */}
            <ModelBox 
              title={businessAreas[4].title} 
              id={businessAreas[4].id}
              items={
                businessModelCanvasGraphItems[3]?.business_model_canvas_report_education
                  ? businessModelCanvasGraphItems[3].business_model_canvas_report_education.slice(0, 7).map(item => item.title)
                  : []
              }
              onClick={() => handleBoxClick(businessAreas[4].id)}
              isSelected={selectedBoxId === businessAreas[4].id}
              isActive={isBoxActive(businessAreas[4].id)}
              isClicked={isBoxClicked(businessAreas[4].id)}
              isNextActive={isNextActiveBox(businessAreas[4].id)}
              style={{
                cursor: isBoxActive(businessAreas[4].id) ? 'pointer' : 'not-allowed',
                opacity: isBoxActive(businessAreas[4].id) ? 1 : 0.7
              }}
            />
            {/* 채널 */}
            <ModelBox 
              title={businessAreas[5].title} 
              id={businessAreas[5].id}
              items={
                businessModelCanvasGraphItems[2]?.business_model_canvas_report_education
                  ? businessModelCanvasGraphItems[2].business_model_canvas_report_education.slice(0, 7).map(item => item.title)
                  : []
              }
              onClick={() => handleBoxClick(businessAreas[5].id)}
              isSelected={selectedBoxId === businessAreas[5].id}
              isActive={isBoxActive(businessAreas[5].id)}
              isClicked={isBoxClicked(businessAreas[5].id)}
              isNextActive={isNextActiveBox(businessAreas[5].id)}
              style={{
                cursor: isBoxActive(businessAreas[5].id) ? 'pointer' : 'not-allowed',
                opacity: isBoxActive(businessAreas[5].id) ? 1 : 0.7
              }}
            />
          </Column>
        </MiddleColumns>

        <RightColumn>
          {/* 고객 세그먼트 */}
          <ModelBox 
            title={businessAreas[6].title} 
            id={businessAreas[6].id}
            items={
              Array.isArray(businessModelCanvasGraphItems) && businessModelCanvasGraphItems[0]
                ? Object.values(businessModelCanvasGraphItems[0]).slice(0, 7)
                : []
            }
            onClick={() => handleBoxClick(businessAreas[6].id)}
            isSelected={selectedBoxId === businessAreas[6].id}
            isActive={isBoxActive(businessAreas[6].id)}
            isClicked={isBoxClicked(businessAreas[6].id)}
            isNextActive={isNextActiveBox(businessAreas[6].id)}
            style={{
              cursor: isBoxActive(businessAreas[6].id) ? 'pointer' : 'not-allowed',
              opacity: isBoxActive(businessAreas[6].id) ? 1 : 0.7
            }}
          />
    
        </RightColumn>
      </TopSection>

      <BottomSection>
        {/* 하단 섹션: 비용구조, 수익원 */}
        <ModelBox 
          title={businessAreas[7].title} 
          id={businessAreas[7].id}
          items={
            businessModelCanvasGraphItems[8]?.business_model_canvas_report_education
              ? businessModelCanvasGraphItems[8].business_model_canvas_report_education.slice(0, 7).map(item => item.title)
              : []
          }
          onClick={() => handleBoxClick(businessAreas[7].id)}
          isSelected={selectedBoxId === businessAreas[7].id}
          isActive={isBoxActive(businessAreas[7].id)}
          isClicked={isBoxClicked(businessAreas[7].id)}
          isNextActive={isNextActiveBox(businessAreas[7].id)}
          style={{
            cursor: isBoxActive(businessAreas[7].id) ? 'pointer' : 'not-allowed',
            opacity: isBoxActive(businessAreas[7].id) ? 1 : 0.7
          }}
        />
        <ModelBox 
          title={businessAreas[8].title} 
          id={businessAreas[8].id}
          items={
            businessModelCanvasGraphItems[4]?.business_model_canvas_report_education
              ? businessModelCanvasGraphItems[4].business_model_canvas_report_education.slice(0, 7).map(item => item.title)
              : []
          }
          onClick={() => handleBoxClick(businessAreas[8].id)}
          isSelected={selectedBoxId === businessAreas[8].id}
          isActive={isBoxActive(businessAreas[8].id)}
          isClicked={isBoxClicked(businessAreas[8].id)}
          isNextActive={isNextActiveBox(businessAreas[8].id)}
          style={{
            cursor: isBoxActive(businessAreas[8].id) ? 'pointer' : 'not-allowed',
            opacity: isBoxActive(businessAreas[8].id) ? 1 : 0.7
          }}
        />
      </BottomSection>

      {/* MoleculeBusinessModelPopup 컴포넌트 추가 */}
      {/* {showPopup && (
        <MoleculeBusinessModelPopup
          isOpen={showPopup}
          onClose={handleClosePopup}
          onSave={handleSavePopup}
          currentModelId={selectedBoxId}
        />
      )} */}
    </GraphContainer>
  );
};

// 비즈니스 모델 박스 컴포넌트
const ModelBox = ({ title, id, items = [], onClick, isSelected, isActive, isClicked, isNextActive, style }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasItems = items.length > 0;

  return (
    <BoxWrapper 
      onMouseEnter={() => isActive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      isActive={isActive}
      style={style}
    >
      <ModelHeader>
        <NumberCircle>{id}</NumberCircle>
        <Title>{title}</Title>
      </ModelHeader>
      
      <ContentBox 
        hasItems={hasItems} 
        isHovered={isHovered}
        isSelected={isSelected && !hasItems}
        isActive={isActive}
        isClicked={isClicked}
        isNextActive={isNextActive}
      >
        {hasItems ? (
          <ItemList>
            {items.map((item, index) => (
              <ItemRow key={index} style={{textAlign: "left"}}>
                <ItemText>{item}</ItemText>
              </ItemRow>
            ))}
          </ItemList>
        ) : (
          <EmptyText 
            isHovered={isHovered} 
            isSelected={isSelected}
            isActive={isActive}
            isClicked={isClicked}
            isNextActive={isNextActive}
          >
            {isActive ? "여기를 눌러\n내용을 작성하세요" : "이전 단계를 먼저 완료해주세요"}
          </EmptyText>
        )}
      </ContentBox>
    </BoxWrapper>
  );
};

// 체크마크 아이콘 컴포넌트
const CheckMarkIcon = () => (
  <CheckMark>
    <img src="/images/CheckMark.svg" alt="✓" />
  </CheckMark>
);

// 스타일 컴포넌트
const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 820px;
  height: 720px;
`;

const TopSection = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  flex: 2;
`;

const BottomSection = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  flex: 1;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MiddleColumns = styled.div`
  flex: 3;
  display: flex;
  gap: 16px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  cursor: pointer;
  opacity: 1;
`;

const ModelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NumberCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  
  color: white;
  font-family: 'Pretendard', 'Poppins', sans-serif;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  line-height: 1.55em;
  letter-spacing: -0.03em;
`;

const Title = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
  align-items: ${props => props.hasItems ? 'flex-start' : 'center'};
  justify-content: ${props => props.hasItems ? 'flex-start' : 'center'};
  padding: 12px;
  border-radius: 10px;
  transition: all 0.2s ease;
  overflow-y: auto;
  
  background-color: ${props => {
    if (props.hasItems) return '#FFFFFF';
    if (props.isSelected) return '#FFFFFF'; 
    if (props.isActive && props.isHovered) return '#E9F1FF';
    return '#F7F8FA';
  }};
  
  border: 1px solid ${props => {
    if (props.isSelected) return '#E0E4EB';
    if (props.isClicked) return '#E0E4EB';
    if (props.isActive && props.isHovered) return '#226FFF';
    if (props.isActive) {
      // 다음 활성화 버튼만 primary 색상 테두리, 나머지 활성화 버튼은 outline 색상
      return props.isNextActive ? '#226FFF' : '#E0E4EB';
    }
    return '#E0E4EB';
  }};
  
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${palette.gray300};
    border-radius: 4px;
  }
`;

const EmptyText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-align: center;
  
  color: ${props => {
    if (!props.isActive) return '#CCCCCC';
    if (props.isSelected) return '#666666';
    if (props.isClicked) return '#666666';
    if (props.isActive && props.isHovered) return '#226FFF';
    // 다음 활성화 버튼만 primary 색상 텍스트, 나머지 활성화 버튼은 일반 텍스트 색상
    return props.isActive ? (props.isNextActive ? '#226FFF' : '#666666') : '#CCCCCC';
  }};
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 0;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid ${palette.outlineGray};
  
  &:last-child {
    border-bottom: none;
  }
`;

const CheckMark = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 12px;
    height: 12px;
  }
`;

const ItemText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: #666666;
  flex: 1;
  padding-left: 4px;
`;

export default MoleculeBusinessModelGraph; 