import React from 'react';
import styled from 'styled-components';
import { Body3 } from '../../../../assets/styles/Typography';
import { palette } from '../../../../assets/styles/Palette';
import { CheckBoxButton } from "../../../../assets/styles/InputStyle";

const OrganismDesignConceptSelector = ({ 
  concepts = [], 
  selectedConcepts = [], 
  onSelect, 
  disabled = false 
}) => {
  
  const isSelected = (conceptId) => {
    return selectedConcepts.includes(conceptId);
  };

  return (
    <ConceptSelectorWrapper>
      <ConceptGrid>
        {concepts.map((concept) => (
          <ConceptCard 
            key={concept.id} 
            // selected={isSelected(concept.id)}
            // onClick={() => !disabled && onSelect(concept.id)}
          >
            <ConceptHeader>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', width: '100%' }}>
                <CheckBoxButton
                  id={concept.id}
                  name={concept.id}
                  checked={isSelected(concept.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onSelect(concept.id);
                  }}
                  disabled={disabled}
                  style={{ cursor: 'pointer', marginTop: '2px' }}
                />
                <div style={{ flex: 1 , textAlign: 'left' }}>
                  <Body3 color="gray800" style={{ fontWeight: "600", marginBottom: '4px' }}>
                    {concept.name}
                  </Body3>
                  <Body3 color="gray500" style={{ textAlign: 'left', lineHeight: '1.4' }}>
                    {concept.description}
                  </Body3>
                </div>
              </div>
            </ConceptHeader>
            <ConceptPreview />
          </ConceptCard>
        ))}
      </ConceptGrid>
    </ConceptSelectorWrapper>
  );
};

export default OrganismDesignConceptSelector;

const ConceptSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ConceptGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const ConceptCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid ${props => props.selected ? palette.primary : '#E0E4EB'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? 'rgba(34, 111, 255, 0.05)' : 'white'};
  position: relative;
  
  &:hover {
    border-color: ${palette.primary};
    background: rgba(34, 111, 255, 0.02);
  }
`;

const ConceptHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 12px;
`;

const ConceptInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
`;

const ConceptPreview = styled.div`
  width: 100%;
  height: 80px;
  background-color: #E9ECEF;
  border-radius: 4px;
`;