import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";
import images from "../../../../../assets/styles/Images";
import { useAtom } from 'jotai';
import { IDEA_GENERATION_START_POSITION, IDEA_GENERATION_SELECTED_START_POSITION } from '../../../../AtomStates';

// IdeaGenerationTag 컴포넌트

const IdeaGenerationTag = ({ text, onClick, initialSelected = false, disabled = false }) => {
  const [selected, setSelected] = useState(initialSelected);

  const handleClick = (e) => {
    if (disabled && !selected) return; // 비활성화 상태이고 선택되지 않은 경우 클릭 무시
    setSelected(!selected);
    if (onClick) {
      onClick(e, !selected);
    }
  };

  return (
    <TagContainer selected={selected} onClick={handleClick} disabled={disabled && !selected}>
      {selected && (
        <CheckIcon width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.77777 8.49989L6.22063 12.9443L14.2178 4.94434" stroke="white" strokeWidth="1.77778" strokeLinecap="round" strokeLinejoin="round"/>
        </CheckIcon>
      )}
      <TagText selected={selected}>{text}</TagText>
    </TagContainer>
  );
};

// MoleculeTagList 컴포넌트
const MoleculeTagList = ({ items, onTagsChange, disabled }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['']);
  const MAX_SELECTIONS = 8;
  const [ideaGenerationStartPosition, setIdeaGenerationStartPosition] = useAtom(IDEA_GENERATION_START_POSITION);
  const [ideaGenerationSelectedStartPosition, setIdeaGenerationSelectedStartPosition] = useAtom(IDEA_GENERATION_SELECTED_START_POSITION);
  const [addedTagsCount, setAddedTagsCount] = useState(0);

  const handleTagClick = (index, isSelected) => {
    if (disabled) return;
    
    setSelectedTags(prev => {
      if (isSelected && prev.length >= MAX_SELECTIONS) {
        return prev;
      }

    setIdeaGenerationSelectedStartPosition(prev => {
      return [...prev, items[index]]
    })
    // console.log("ideaGenerationSelectedStartPosition", ideaGenerationSelectedStartPosition)
 
      const newSelected = isSelected 
        ? [...prev, index]
        : prev.filter(i => i !== index);
      
      const selectedItems = items.filter((_, idx) => newSelected.includes(idx));
      if (onTagsChange) {
        onTagsChange(selectedItems);
      }
      
      return newSelected;
    });
  };




  const handleClose = () => {
    setIsPopupOpen(false);
    setQuestionText('');
    setOptions(['', '']);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleDeleteOption = (index) => {
    if (options.length <= 2) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleAddTag = () => {
    const validOptions = options.filter(option => option.trim());

    // 새 태그 생성
    const newTags = validOptions.map(option => ({
      id: Date.now(), // 고유한 ID 생성
      title: option,
      description: ""
    }));


    // 상태 업데이트
    setIdeaGenerationStartPosition(prev => {
      const updated = [...prev, ...newTags];
      return updated;
    });

    setAddedTagsCount(prev => prev + validOptions.length);
    
    // 팝업 닫기 전에 상태 확인
    setOptions([""]);
    setIsPopupOpen(false);
  };

  return (
    <>
      <TagListContainer>
        {items.map((item, index) => (
          <IdeaGenerationTag
            key={index}
            text={item}
            onClick={(e, isSelected) => handleTagClick(index, isSelected)}
            initialSelected={selectedTags.includes(index)}
            disabled={!selectedTags.includes(index) && selectedTags.length >= MAX_SELECTIONS}
          />
        ))}
        {!disabled && addedTagsCount < 3 && (
          <AddButton onClick={() => setIsPopupOpen(true)}>
            <PlusIcon>+</PlusIcon>
            <span>추가하기</span>
          </AddButton>
        )}
      </TagListContainer>

      {isPopupOpen && (
        <PopupOverlay>
          <PopupContainer>
            <PopupHeader>
              <HeaderTitle>직접 설정하기</HeaderTitle>
              <CloseButton onClick={handleClose}>
                ×
              </CloseButton>
            </PopupHeader>

            <HeaderSpacer />

            {isLoading ? (
              <LoadingWrapper>
                <AtomPersonaLoader message="로딩 중..." />
              </LoadingWrapper>
            ) : (
              <>
                <PopupContent>
                  <SectionTitle>태그 문항 추가 (남은 추가 가능 개수: {3 - addedTagsCount}개)</SectionTitle>
                  <OptionsContainer>
                    {options.map((option, index) => (
                      <OptionItemWrapper key={index}>
                        <InputField
                          placeholder="선택지를 작성해주세요."
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        {options.length > 1 && (
                          <DeleteButton onClick={() => handleDeleteOption(index)}></DeleteButton>
                        )}
                      </OptionItemWrapper>
                    ))}
                    {options.length < (3 - addedTagsCount) && (
                      <AddOptionButton onClick={addOption}>
                        + 추가 하기 (최대 {3 - addedTagsCount}개)
                      </AddOptionButton>
                    )}
                  </OptionsContainer>
                </PopupContent>

                <Spacer />
                <Divider />

                <ButtonContainer>
                  <CreateButton onClick={handleAddTag}>
                  아이디어 기반 태그 생성
                  </CreateButton>
                </ButtonContainer>
              </>
            )}
          </PopupContainer>
        </PopupOverlay>
      )}
    </>
  );
};



export default MoleculeTagList;



const TagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  // padding: ${props => props.selected ? '13px 25px' : '12px 24px'};
  padding: 12px 24px;
  margin: 0px;
  background-color: ${props => {
    if (props.disabled) return palette.gray100;
    return props.selected ? palette.gray800 : palette.chatGray;
  }};
  border: ${props => props.selected ? 'none' : `1px solid ${palette.outlineGray}`};
    // border: 1px solid ${palette.outlineGray}
  border-radius: 8px;
  user-select: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  box-sizing: border-box;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background-color: ${props => {
      if (props.disabled) return palette.gray100;
      return props.selected ? palette.gray900 : palette.gray100;
    }};
  }
`;

const TagText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: ${props => props.selected ? '600' : '400'};
  line-height: 155%;
  letter-spacing: -0.03em;
  color: ${props => props.selected ? palette.white : palette.gray500};
  white-space: nowrap;
`;

const CheckIcon = styled.svg`
  margin-right: 8px;
  flex-shrink: 0;
`;

const TagListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 24px;
  background-color: ${palette.white};
  border: 1px solid ${palette.gray300};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  gap: 4px;

  span {
    font-family: 'Pretendard', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: ${palette.gray500};
  }

  &:hover {
    background-color: ${palette.gray50};
    border-color: ${palette.gray400};
  }
`;

const PlusIcon = styled.div`
  font-size: 20px;
  color: ${palette.gray500};
  line-height: 1;
`;

// 팝업 관련 새로운 스타일 컴포넌트 추가
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
  height: 500px;
  background: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${palette.gray100};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${palette.gray300};
    border-radius: 4px;
  }
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${palette.gray800};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${palette.gray600};
  cursor: pointer;
  padding: 4px;
`;

const HeaderSpacer = styled.div`
  height: 32px;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${palette.gray700};
  margin-bottom: 12px;
`;

const InputField = styled.input`
  width: 100%;
  height: 41px;
  padding: 0 12px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  font-size: 16px;
  color: ${palette.gray800};

  &::placeholder {
    color: ${palette.gray300};
  }

  &:focus {
    outline: none;
    border-color: ${palette.primary};
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OptionItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: url(${images.Trash}) no-repeat center;
  background-size: contain;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const AddOptionButton = styled.button`
  width: 100%;
  height: 41px;
  padding: 0 12px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 10px;
  background: ${palette.gray100};
  color: ${palette.gray300};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${palette.gray200};
  }
`;

const Spacer = styled.div`
  flex: 1;
  min-height: 24px;
`;

const Divider = styled.div`
  height: 1px;
  background: ${palette.outlineGray};
  margin: 24px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CreateButton = styled.button`
  height: 40px;
  padding: 0 24px;
  background: ${palette.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${palette.primaryDark};
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;