import React, { useState } from "react";
import styled from "styled-components";
import { palette } from "../../../../../assets/styles/Palette";

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
  const MAX_SELECTIONS = 8;

  const handleTagClick = (index, isSelected) => {
    if (disabled) return;
    
    setSelectedTags(prev => {
      if (isSelected && prev.length >= MAX_SELECTIONS) {
        return prev;
      }
      
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

  return (
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
    </TagListContainer>
  );
};



export default MoleculeTagList;



const TagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.selected ? '13px 25px' : '12px 24px'};
  margin: 0px;
  background-color: ${props => {
    if (props.disabled) return palette.gray100;
    return props.selected ? palette.gray800 : palette.chatGray;
  }};
  border: ${props => props.selected ? 'none' : `1px solid ${palette.outlineGray}`};
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