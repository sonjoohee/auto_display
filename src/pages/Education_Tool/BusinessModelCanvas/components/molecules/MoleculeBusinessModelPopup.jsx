import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import { Button } from "../../../../../assets/styles/ButtonStyle";
import { Body1, Body2, Caption1 } from "../../../../../assets/styles/Typography";
import { useAtom } from "jotai";
import { BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS, BUSINESS_MODEL_CANVAS_POPUP_OPTIONS ,BUSINESS_MODEL_CANVAS_GRAPH_ITEMS,BUSINESS_MODEL_CANVAS_INITIAL_GRAPH_DATA} from "../../../../AtomStates";
import images from "../../../../../assets/styles/Images";
import { CheckBoxButton, RadioButton } from "../../../../../assets/styles/InputStyle";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";

const businessModelItems = [
  { id: 1, title: "고객 세그먼트", value: "1고객 세그먼트" },
  { id: 2, title: "가치 제안", value: "2가치 제안" },
  { id: 3, title: "채널", value: "3채널" },
  { id: 4, title: "고객관계", value: "4고객관계" },
  { id: 5, title: "수익원", value: "5수익원" },
  { id: 6, title: "핵심자원", value: "6핵심자원" },
  { id: 7, title: "핵심활동", value: "7핵심활동" },
  { id: 8, title: "핵심파트너십", value: "8핵심파트너십" },
  { id: 9, title: "비용구조", value: "9비용구조" }
];


/**
 * 비즈니스 모델 설정을 위한 팝업 컴포넌트
 */
const MoleculeBusinessModelPopup = ({ 
  isOpen = false, 
  
  onClose = () => {}, 
  onSave = () => {},
  currentModelId = 3, // 기본값으로 채널(id: 3) 설정
  isLoading,
  onCardSelect,
  isSelected=false,
  selectedKeys = [], // isSelected 대신 selectedKeys 배열 받기
  // popupOptions = []  // API 응답의 items 배열
}) => {
  // 팝업 상태 관리
  const [isVisible, setIsVisible] = useState(isOpen);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentModel, setCurrentModel] = useState(businessModelItems.find(item => item.id === currentModelId) || businessModelItems[2]);
  const [userOptions, setUserOptions] = useState([]);
  const [inputFields, setInputFields] = useState([]); // 입력 필드 관리
  const [inputValues, setInputValues] = useState({}); // 입력 값 관리
  const [bmCanvasSelectedPopupOptions, setBMCanvasSelectedPopupOptions] = useAtom(BUSINESS_MODEL_CANVAS_SELECTED_POPUP_OPTIONS);
  const [bmCanvasPopupOptions, setBMCanvasPopupOptions] = useAtom(BUSINESS_MODEL_CANVAS_POPUP_OPTIONS);
  const [businessModelCanvasGraphItems, setBusinessModelCanvasGraphItems] = useAtom(BUSINESS_MODEL_CANVAS_GRAPH_ITEMS);
  const [bmCanvasInitialGraphData, setBMCanvasInitialGraphData] = useAtom(BUSINESS_MODEL_CANVAS_INITIAL_GRAPH_DATA);
  const [applyOptions, setApplyOptions] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // isOpen props가 변경될 때 상태 업데이트
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  // 모델 ID가 변경될 때 현재 모델 업데이트
  useEffect(() => {
    const model = businessModelItems.find(item => item.id === currentModelId) || businessModelItems[2];
    setCurrentModel(model);
    setSelectedOption(null); // 모델 변경 시 선택 초기화
    setUserOptions([]); // 사용자 정의 옵션 초기화
    setInputFields([]); // 입력 필드 초기화
    setInputValues({}); // 입력 값 초기화
  }, [currentModelId]);

   // 또는 더 엄격하게 처리하려면
// useEffect(() => {
//   let isMounted = true;

//   if (isOpen && isMounted) {
//     const existingData = bmCanvasInitialGraphData.find(item => item.id === currentModel.id);
//     if (existingData) {
//       setBMCanvasSelectedPopupOptions(existingData.items);
//       setBMCanvasPopupOptions(existingData.items);
//     } else {
//       setBMCanvasSelectedPopupOptions([]);
//       setBMCanvasPopupOptions([]);
//     }
//   }

//   return () => {
//     isMounted = false;
//   };
// }, [isOpen, currentModel.id, bmCanvasInitialGraphData]);
  
//   // 팝업 닫기 처리
  const handleClose = (isApplied = false) => {
    setIsVisible(false);
    setSelectedOption(null);
    setUserOptions([]);
    setInputFields([]);
    setInputValues({});
   
    const shouldApply = typeof isApplied === 'boolean' ? isApplied : false;
    setBMCanvasSelectedPopupOptions([]);
    setBMCanvasPopupOptions([]);
  
  if(!shouldApply){
  setBusinessModelCanvasGraphItems(prev => 
    prev.map(item => 
      item.id === currentModel.id 
        ? { ...item, items: [] } 
        : item
    )
  );
 }else{
  setApplyOptions(false);
 }
 if (onClose) {
  onClose();


    }
  //   setBMCanvasSelectedPopupOptions([]);
  // setBMCanvasPopupOptions([]);


  };


  // 옵션 선택 처리
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // 새 입력 필드 추가
  const handleAddInputField = () => {
    // 3개 모두 추가된 상태가 아니라면 입력 필드 추가
    if (userOptions.length < 3) {
      const newId = Date.now(); // 고유 ID 생성
      setInputFields([...inputFields, newId]);
      setInputValues({...inputValues, [newId]: ""}); // 새 입력 필드의 값 초기화
    }
  };

  // 입력 필드 값 변경 처리
  const handleInputChange = (id, value) => {
    setInputValues({...inputValues, [id]: value});
  };

  // 체크 버튼 클릭 시 사용자 정의 옵션 추가
  const handleAddUserOption = (id) => {
    const value = inputValues[id]?.trim();
    if (value) {
      // 새로운 옵션 추가
      const newUserOptions = [...userOptions, value];
      setUserOptions(newUserOptions);
      
      // 입력 필드 제거
      setInputFields(inputFields.filter(fieldId => fieldId !== id));
      
      // 필드 값 상태에서도 제거
      const newInputValues = { ...inputValues };
      delete newInputValues[id];
      setInputValues(newInputValues);
    }
  };

//   // 적용하기 버튼 클릭 처리
//   const handleApply = () => {
//     if (!selectedOption) {
//       alert("항목을 선택해주세요.");
//       return;
//     }
// console.log("selectedOption", selectedOption)
//     onSave({
//       modelId: currentModel.id,
//       modelTitle: currentModel.title,
//       selectedOption: selectedOption
//     });
    
//     handleClose();
//   };

const handleApply = () => {
  // 선택된 옵션이 없으면 경고
  if (bmCanvasSelectedPopupOptions.length === 0) {
    return;
  }
  console.log("bmCanvasSelectedPopupOptions",bmCanvasSelectedPopupOptions)

  setBusinessModelCanvasGraphItems(prev => {
    // 이전 상태가 없거나 배열이 아닌 경우 빈 배열로 초기화
    const prevItems = Array.isArray(prev) ? [...prev] : [];
    console.log("prevItems", prevItems)
    
    // 현재 모델의 데이터를 찾거나 새로 생성
    const currentModelData = {
      id: currentModel.id,
      title: currentModel.title,
      items: [...bmCanvasSelectedPopupOptions],
      content: currentModel.content
    };
    console.log("currentModelData", currentModelData)
  
    // 이전 항목들 중 현재 모델 ID와 일치하는 항목이 있는지 확인
    const existingIndex = prevItems.findIndex(item => item.id === currentModel.id);
    if (existingIndex !== -1) {
      // 기존 항목이 있으면 해당 위치의 항목만 업데이트
      prevItems[existingIndex] = currentModelData;
      console.log("prevItems", prevItems)
      return prevItems; // 여기서 바로 반환
    } else {
      // 기존 항목이 없으면 새로 추가
      return [...prevItems, currentModelData];
    }
  
  
  });

 
  setApplyOptions(true);
  handleClose(true); 
};

  // 엔터키 입력시 옵션 추가
  const handleKeyDown = (id, e) => {
    if (e.key === 'Enter' && inputValues[id]?.trim()) {
      handleAddUserOption(id);
    }
  };

  // 입력 필드 값이 존재하는지 확인하는 함수
  const isInputFieldEmpty = (id) => !inputValues[id]?.trim();

  // 사용자 추가 옵션과 현재 입력 필드를 합쳐서 3개일 때 버튼 숨김
  const hideAddButton = userOptions.length + inputFields.length >= 3;

  if (!isVisible) return null;

  return (
    <PopupOverlay>

      <PopupContainer>
        <PopupHeader>
          <HeaderTitle>
            <NumberCircle>{currentModel.id}</NumberCircle>
            <HeaderTitleText>{currentModel.title}</HeaderTitleText>
          </HeaderTitle>
          <CloseButton onClick={handleClose}>
            <CloseButtonIcon />
          </CloseButton>
        </PopupHeader>

        <HeaderSpacer />

        {isLoading ? (
         <div
         style={{
           width: "100%",
           display: "flex",
           justifyContent: "center",
           minHeight: "200px",
           alignItems: "center",
           marginTop: "50px",
         }}
       >
          <AtomPersonaLoader message="구성 요소 선별 중입니다 " />
        </div>
        ) : (
          <>
            <PopupContent>
              <SectionTitle>원하는 항목을 선택하세요</SectionTitle>
              <OptionsContainer>
                {/* 기본 제공 옵션 */}
                {bmCanvasPopupOptions?.map((option, index) => (
                  <OptionItem 
                    key={`default-${index}`} 
                    onClick={() => handleOptionSelect(option)}
                  >
                    <OptionFlex>
                      <div>
                        <CheckBoxButton
                          id={index}
                          name={index}
                          // checked={selectedOption === option}
                          checked={selectedKeys.includes(option)} // 각 옵션별로 체크
                          // onChange={() => onCardSelect && onCardSelect(!isSelected)} 
                          onChange={() => onCardSelect && onCardSelect(option)} 
                          // onChange={() => handleOptionSelect(option)}
                        />
                      </div>
                      <OptionText>{option}</OptionText>
                    </OptionFlex>
                  </OptionItem>
                ))}
                
                {/* 사용자 정의 옵션 */}
                {userOptions.map((option, index) => (
                  <OptionItem key={`user-${index}`} onClick={() => handleOptionSelect(option)}>
                    <OptionFlex>
                      <div>
                        <RadioButton 
                          id={`radio-user-${index}`}
                          name="modelOptionGroup"
                          checked={selectedOption === option}
                          onChange={() => handleOptionSelect(option)}
                        />
                      </div>
                      <OptionText>{option}</OptionText>
                    </OptionFlex>
                  </OptionItem>
                ))}
                
                {/* 입력 필드 */}
                {inputFields.map(id => (
                  <OptionItem key={`input-${id}`} as="div">
                    <OptionFlex>
                      <InputField 
                        placeholder={`${currentModel.title} 항목을 직접 입력하세요`}
                        value={inputValues[id] || ""}
                        onChange={(e) => handleInputChange(id, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(id, e)}
                        autoFocus
                      />
                      <CheckButton 
                        onClick={() => handleAddUserOption(id)}
                        disabled={isInputFieldEmpty(id)}
                        active={!isInputFieldEmpty(id)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L19 8" 
                            stroke={isInputFieldEmpty(id) ? "#E0E4EB" : "#226FFF"} 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"/>
                        </svg>
                      </CheckButton>
                    </OptionFlex>
                  </OptionItem>
                ))}
                
                {!hideAddButton && (
                  <AddOptionItem onClick={handleAddInputField}>
                    + 직접 추가하기 (최대 3개)
                  </AddOptionItem>
                )}
              </OptionsContainer>
            </PopupContent>
            
            <BottomSpacer />
            
            <Divider />

            <ButtonContainer>
              <div></div> {/* 왼쪽 공간 유지용 */}
              {/* <ApplyButton 
                isActive={!!selectedOption}
                onClick={handleApply}ㄴㄴ
                disabled={!selectedOption}
              > */}
               <ApplyButton 
                isActive={bmCanvasSelectedPopupOptions.length > 0}
                onClick={handleApply}
                disabled={bmCanvasSelectedPopupOptions.length === 0}
              >
                적용하기
              </ApplyButton>
            </ButtonContainer>
          </>
        )}
      </PopupContainer>
          
    </PopupOverlay>
  );
};

// CloseButtonIcon SVG 컴포넌트
const CloseButtonIcon = () => (
  <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.6767 2.47245C16.1079 2.02132 16.1079 1.28988 15.6767 0.838745C15.2455 0.387609 14.5464 0.387609 14.1152 0.838745L7.99942 7.23754L1.8846 0.839765C1.45341 0.388629 0.754327 0.388629 0.323143 0.839765C-0.10804 1.2909 -0.10804 2.02234 0.323144 2.47347L6.43797 8.87124L1.03279 14.5265C0.601602 14.9777 0.601602 15.7091 1.03279 16.1602C1.46397 16.6114 2.16306 16.6114 2.59424 16.1602L7.99943 10.505L13.4056 16.1613C13.8368 16.6124 14.5359 16.6124 14.967 16.1613C15.3982 15.7101 15.3982 14.9787 14.967 14.5276L9.56088 8.87124L15.6767 2.47245Z" fill="#666666"/>
  </svg>
);

// CloseButton 스타일 수정
const CloseButton = styled.div`
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 스타일 컴포넌트
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PopupContainer = styled.div`
  width: 640px;
  height: 576px;
  background: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
`;

const NumberCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #323232;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-family: "Pretendard", "Poppins";
  font-size: 12px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
`;

const HeaderTitleText = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3em;
  letter-spacing: -0.03em;
  color: #666666;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 0;
  width: 100%;
`;

const SectionTitle = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  line-height: 1.3em;
  letter-spacing: -0.03em;
  color: ${palette.gray700};
  margin-bottom: 12px;
  text-align: left;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-height: 320px; /* 350에서 30 줄임 */
  overflow-y: auto;
  padding-right: 8px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${palette.gray300};
    border-radius: 4px;
  }
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.white};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${palette.primary};
    background-color: ${palette.gray50};
  }
`;

const AddOptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid ${palette.outlineGray};
  background-color: ${palette.gray100};
  color: ${palette.gray300};
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: ${palette.gray200};
    border-color: ${palette.outlineGray}; /* 호버 시 테두리 색상 변경 없음 */
  }
  
  /* 명시적으로 아웃라인 제거 */
  outline: none !important;
  
  &:focus, &:active {
    outline: none !important;
    border-color: ${palette.outlineGray}; /* 포커스/활성화 시에도 테두리 색상 변경 없음 */
  }
`;

const OptionFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  position: relative;
`;

const OptionText = styled.div`
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 400;
  color: ${palette.gray800};
`;

const CheckButton = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.active ? 'pointer' : 'default'};
  
  /* 아웃라인 제거 */
  outline: none !important;
  
  &:focus, &:active {
    outline: none !important;
  }
  
  svg {
    /* 체크 아이콘 자체에 마진 제거 */
    display: block;
    margin: 0;
    padding: 0;
  }
`;

const InputField = styled.input`
  width: calc(100% - 24px); /* 체크버튼 공간 확보 */
  height: 100%;
  padding: 0;
  border: none;
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 400;
  line-height: 1.55em;
  letter-spacing: -0.03em;
  color: ${palette.gray800};
  background: transparent;
  
  &::placeholder {
    color: ${palette.gray300};
  }

  &:focus {
    outline: none;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${palette.outlineGray};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-top: 32px;
`;

const ApplyButton = styled.button`
  width: 220px;
  height: 40px;
  border-radius: 4px;
  background-color: ${props => props.isActive ? palette.primary : palette.gray300};
  font-family: "Pretendard", "Poppins";
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2em;
  letter-spacing: -0.03em;
  color: ${palette.white};
  border: none;
  cursor: ${props => props.isActive ? 'pointer' : 'default'};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.isActive ? `${palette.primaryDark}` : palette.gray300};
  }
`;

const HeaderSpacer = styled.div`
  width: 100%;
  height: 32px;
`;

// 하단 여백 추가
const BottomSpacer = styled.div`
  width: 100%;
  height: 30px; // 리스트 영역에서 줄인 30px 만큼 하단 여백 추가
`;

export default MoleculeBusinessModelPopup; 