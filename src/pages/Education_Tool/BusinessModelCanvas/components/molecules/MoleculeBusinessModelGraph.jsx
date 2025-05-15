import React, { useState, useCallback, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { palette } from '../../../../../assets/styles/Palette';
import { useAtom } from "jotai";
import { BUSINESS_MODEL_CANVAS_GRAPH_ITEMS} from "../../../../AtomStates";

// 비즈니스 모델 그래프 컴포넌트
const MoleculeBusinessModelGraph = ({ data = {}, onBoxClick, setShowPopup = () => {}, setSelectedBoxId, selectedBoxId, }) => {
  const [businessModelCanvasGraphItems, setBusinessModelCanvasGraphItems] = useAtom(BUSINESS_MODEL_CANVAS_GRAPH_ITEMS);
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [nextActiveBoxId, setNextActiveBoxId] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

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

  useEffect(() => {
    setIsInitialRender(true);
  }, []);

  const findNextActiveBoxId = () => {
    if (isInitialRender && selectedBoxId === null) {
      return 1;
    }

    const activationOrder = [2,3, 4, 5, 6, 7, 8, 9];
    
    const currentIndex = activationOrder.indexOf(selectedBoxId);
    
    if (currentIndex === -1 || currentIndex === activationOrder.length - 1) {
      for (const id of activationOrder) {
        if (isBoxDataFilled(id) && !isBoxClicked(id)) {
          return id;
        }
      }
      return activationOrder[0];
    }
    
    const nextId = activationOrder[currentIndex + 1];
    if (isBoxDataFilled(nextId)) {
      return nextId;
    }
    
    for (let i = currentIndex + 2; i < activationOrder.length; i++) {
      const id = activationOrder[i];
      if (isBoxDataFilled(id)) {
        return id;
      }
    }
    
    return null;
  };

  const isBoxDataFilled = (id) => {
    if (id === 1) {
      const currentBoxData = businessModelCanvasGraphItems[0];
      return currentBoxData && Object.values(currentBoxData).length > 0;
    }

    const previousBoxData = businessModelCanvasGraphItems[id - 2];
    const isPreviousBoxFilled = previousBoxData && Object.values(previousBoxData).length > 0;

    const currentBoxData = businessModelCanvasGraphItems[id - 1];
    const isCurrentBoxFilled = currentBoxData && Object.values(currentBoxData).length > 0;

    return isPreviousBoxFilled || isCurrentBoxFilled;
  };

  useEffect(() => {
    setNextActiveBoxId(findNextActiveBoxId());
    
    if (isInitialRender && selectedBoxId !== null && selectedBoxId !== 1) {
      setIsInitialRender(false);
    }
  }, [selectedBoxId, businessModelCanvasGraphItems]);

  const handleBoxClick = (id) => {
    if(id === 1) {
      setSelectedBoxId(id);
      setShowPopup(id);
      return;
    }
    else {
      const previousBox = businessModelCanvasGraphItems[id - 2];
      const isPreviousBoxFilled = previousBox && Object.values(previousBox).length > 0;

      if (!isPreviousBoxFilled) {
        return;
      }

      if (!clickedBoxes.includes(id)) {
        setClickedBoxes([...clickedBoxes, id]);
      }
     
      setSelectedBoxId(id);
      setShowPopup(id);
    }
  };

  const isBoxActive = (id) => {
    if (id === 1) {
      return isInitialRender && nextActiveBoxId === 1;
    }

    return id === nextActiveBoxId;
  };

  const isBoxClicked = (id) => {
    return clickedBoxes.includes(id);
  };

  const isNextActiveBox = (id) => {
    return id === nextActiveBoxId;
  };

  return (
    <>
      <GlobalStyle />
      <GraphContainer>
        <TopSection>
          <LeftColumn>
            <ModelBox 
              title={businessAreas[0].title} 
              id={businessAreas[0].id}
              items={
                businessModelCanvasGraphItems[7]
                  ? businessModelCanvasGraphItems[7]?.slice(0, 7).map(item => item.title)
                  : []
              }
              onClick={() => handleBoxClick(businessAreas[0].id)}
              isSelected={selectedBoxId === businessAreas[0].id}
              isActive={isBoxActive(businessAreas[0].id)}
              isClicked={isBoxClicked(businessAreas[0].id)}
              isNextActive={isNextActiveBox(businessAreas[0].id)}
              style={{
                cursor: isBoxDataFilled(businessAreas[0].id) ? 'pointer' : 'not-allowed',
                opacity: isBoxDataFilled(businessAreas[0].id) ? 1 : 0.7
              }}
            />
          </LeftColumn>

          <MiddleColumns>
            <Column>
              <ModelBox 
                title={businessAreas[1].title} 
                id={businessAreas[1].id}
                items={
                  businessModelCanvasGraphItems[6]
                    ? businessModelCanvasGraphItems[6]?.slice(0, 7).map(item => item.title)
                    : []
                }
                onClick={() => handleBoxClick(businessAreas[1].id)}
                isSelected={selectedBoxId === businessAreas[1].id}
                isActive={isBoxActive(businessAreas[1].id)}
                isClicked={isBoxClicked(businessAreas[1].id)}
                isNextActive={isNextActiveBox(businessAreas[1].id)}
                style={{
                  cursor: isBoxDataFilled(businessAreas[1].id) ? 'pointer' : 'not-allowed',
                  opacity: isBoxDataFilled(businessAreas[1].id) ? 1 : 0.7
                }}
              />
              <ModelBox 
                title={businessAreas[2].title} 
                id={businessAreas[2].id}
                items={
                  businessModelCanvasGraphItems[5]
                    ? businessModelCanvasGraphItems[5]?.slice(0, 7).map(item => item.title)
                    : []
                }
                onClick={() => handleBoxClick(businessAreas[2].id)}
                isSelected={selectedBoxId === businessAreas[2].id}
                isActive={isBoxActive(businessAreas[2].id)}
                isClicked={isBoxClicked(businessAreas[2].id)}
                isNextActive={isNextActiveBox(businessAreas[2].id)}
                style={{
                  cursor: isBoxDataFilled(businessAreas[2].id) ? 'pointer' : 'not-allowed',
                  opacity: isBoxDataFilled(businessAreas[2].id) ? 1 : 0.7
                }}
              />
            </Column>

            <Column>
              <ModelBox 
                title={businessAreas[3].title} 
                id={businessAreas[3].id}
                items={
                  Array.isArray(businessModelCanvasGraphItems[1])
                    ? businessModelCanvasGraphItems[1].slice(0, 7).map(item => item && item.title)
                    : []
                }
                onClick={() => handleBoxClick(businessAreas[3].id)}
                isSelected={selectedBoxId === businessAreas[3].id}
                isActive={isBoxActive(businessAreas[3].id)}
                isClicked={isBoxClicked(businessAreas[3].id)}
                isNextActive={isNextActiveBox(businessAreas[3].id)}
                style={{
                  cursor: isBoxDataFilled(businessAreas[3].id) ? 'pointer' : 'not-allowed',
                  opacity: isBoxDataFilled(businessAreas[3].id) ? 1 : 0.7
                }}
              />  
            </Column>

            <Column>
              <ModelBox 
                title={businessAreas[4].title} 
                id={businessAreas[4].id}
                items={
                  businessModelCanvasGraphItems[3]
                    ? businessModelCanvasGraphItems[3]?.slice(0, 7).map(item => item && item.title)
                    : []
                }
                onClick={() => handleBoxClick(businessAreas[4].id)}
                isSelected={selectedBoxId === businessAreas[4].id}
                isActive={isBoxActive(businessAreas[4].id)}
                isClicked={isBoxClicked(businessAreas[4].id)}
                isNextActive={isNextActiveBox(businessAreas[4].id)}
                style={{
                  cursor: isBoxDataFilled(businessAreas[4].id) ? 'pointer' : 'not-allowed',
                  opacity: isBoxDataFilled(businessAreas[4].id) ? 1 : 0.7
                }}
              />
              <ModelBox 
                title={businessAreas[5].title} 
                id={businessAreas[5].id}
                items={
                  businessModelCanvasGraphItems[2]
                    ? businessModelCanvasGraphItems[2].slice(0, 7).map(item => item && item.title)
                    : []
                }
                onClick={() => handleBoxClick(businessAreas[5].id)}
                isSelected={selectedBoxId === businessAreas[5].id}
                isActive={isBoxActive(businessAreas[5].id)}
                isClicked={isBoxClicked(businessAreas[5].id)}
                isNextActive={isNextActiveBox(businessAreas[5].id)}
                style={{
                  cursor: isBoxDataFilled(businessAreas[5].id) ? 'pointer' : 'not-allowed',
                  opacity: isBoxDataFilled(businessAreas[5].id) ? 1 : 0.7
                }}
              />
            </Column>
          </MiddleColumns>

          <RightColumn>
            <ModelBox 
              title={businessAreas[6].title} 
              id={businessAreas[6].id}
              items={
                Array.isArray(businessModelCanvasGraphItems[0])
                  ? businessModelCanvasGraphItems[0].slice(0, 7).map(item => item && item.title)
                  : []
              }
              onClick={() => handleBoxClick(businessAreas[6].id)}
              isSelected={selectedBoxId === businessAreas[6].id}
              isActive={isBoxActive(businessAreas[6].id)}
              isClicked={isBoxClicked(businessAreas[6].id)}
              isNextActive={isNextActiveBox(businessAreas[6].id)}
              style={{
                cursor: true ? 'pointer' : 'not-allowed',
                opacity: 1
              }}
            />
          </RightColumn>
        </TopSection>

        <BottomSection>
          <ModelBox 
            title={businessAreas[7].title} 
            id={businessAreas[7].id}
            items={
              businessModelCanvasGraphItems[8]
                ? businessModelCanvasGraphItems[8]?.slice(0, 7).map(item => item && item.title)
                : []
            }
            onClick={() => handleBoxClick(businessAreas[7].id)}
            isSelected={selectedBoxId === businessAreas[7].id}
            isActive={isBoxActive(businessAreas[7].id)}
            isClicked={isBoxClicked(businessAreas[7].id)}
            isNextActive={isNextActiveBox(businessAreas[7].id)}
            style={{
              cursor: isBoxDataFilled(businessAreas[7].id) ? 'pointer' : 'not-allowed',
              opacity: isBoxDataFilled(businessAreas[7].id) ? 1 : 0.7
            }}
          />
          <ModelBox 
            title={businessAreas[8].title} 
            id={businessAreas[8].id}
            items={
              businessModelCanvasGraphItems[4]
                ? businessModelCanvasGraphItems[4]?.slice(0, 7).map(item => item && item.title)
                : []
            }
            onClick={() => handleBoxClick(businessAreas[8].id)}
            isSelected={selectedBoxId === businessAreas[8].id}
            isActive={isBoxActive(businessAreas[8].id)}
            isClicked={isBoxClicked(businessAreas[8].id)}
            isNextActive={isNextActiveBox(businessAreas[8].id)}
            style={{
              cursor: isBoxDataFilled(businessAreas[8].id) ? 'pointer' : 'not-allowed',
              opacity: isBoxDataFilled(businessAreas[8].id) ? 1 : 0.7
            }}
          />
        </BottomSection>
      </GraphContainer>
    </>
  );
};

const ModelBox = ({ title, id, items = [], onClick, isSelected, isActive, isClicked, isNextActive, style }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasItems = items.length > 0;
  
  return (
    <BoxWrapper 
      onMouseEnter={() => isActive && setIsHovered(true)}
      onMouseLeave={() => isActive && setIsHovered(false)}
      onClick={onClick}
      isActive={isActive}
      style={style}
    >
      <ModelHeader>
        <NumberCircle>{id}</NumberCircle>
        <Title >
          {title}
        </Title>
      </ModelHeader>
      
      <ContentBox 
        hasItems={hasItems} 
        isHovered={isHovered && isActive}
        isSelected={isSelected && !hasItems}
        isActive={isActive}
        isClicked={isClicked}
        isNextActive={isNextActive}
      >
        {hasItems ? (
          <ItemList>
            {items.map((item, index) => (
              <ItemRow key={index} style={{textAlign: "left"}}>
                <ItemText>
                  {item}
                </ItemText>
              </ItemRow>
            ))}
          </ItemList>
        ) : (
          <div style={{
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '1.55em',
            letterSpacing: '-0.03em',
            textAlign: 'center',
            color: 
                  !isActive ? '#CCCCCC' : 
                  isSelected ? '#666666' : 
                  isClicked ? '#666666' : 
                  (isActive && isHovered) ? '#226FFF' : 
                  (isActive && isNextActive) ? '#226FFF' : '#666666'
          }}>
            {isActive ? "여기를 눌러\n내용을 작성하세요" : "이전 단계를 먼저 완료해주세요"}
          </div>
        )}
      </ContentBox>
    </BoxWrapper>
  );
};

const CheckMarkIcon = () => (
  <CheckMark>
    <img src="/images/CheckMark.svg" alt="✓" />
  </CheckMark>
);

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 820px;
  height: 780px;
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
      return props.isNextActive ? '#226FFF' : '#E0E4EB';
    }
    return '#E0E4EB';
  }};
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${palette.gray300};
    border-radius: 4px;
  }
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

const GlobalStyle = createGlobalStyle`
  #box-1 *, #box-2 * {
    color: #000000 !important;
    font-weight: 600 !important;
  }
`;

export default MoleculeBusinessModelGraph; 