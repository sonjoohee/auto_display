import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { Body1, Body3, InputText } from "../../../../assets/styles/Typography";

const MoleculeTemplateCard = ({ 
  template,
  onPreview,
  onSelect 
}) => {
  return (
    <TemplateCard>
      <TemplateImageContainer>
        <TemplateImage src={template.image} alt={template.title} />
      </TemplateImageContainer>
      
      <TemplateContent>
        <TemplateHeader>
          <TemplateCategory>
            <Body3 color="primary">{template.category}</Body3>
          </TemplateCategory>
        </TemplateHeader>
        
        <TemplateTitle>
          <Body1 color="gray800">{template.title}</Body1>
        </TemplateTitle>
        
        <TemplateDescription>
          <Body3 color="gray600">{template.description}</Body3>
          <LocationText>
            자료 이용 장소 : <LocationValue>{template.location}</LocationValue>
          </LocationText>
        </TemplateDescription>
      </TemplateContent>
      
      <TemplateActions>
        <Button 
          Large
          PrimaryLightest
          Fill
          onClick={() => onPreview && onPreview(template)}
        >
          <InputText fontSize="15px">미리보기</InputText>
        </Button>
      </TemplateActions>
    </TemplateCard>
  );
};

export default MoleculeTemplateCard;

const TemplateCard = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${palette.outlineGray};
  border-radius: 12px;
  overflow: hidden;
  background: white;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    border-color: ${palette.primary};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const TemplateImageContainer = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  overflow: hidden;
  background-color: ${palette.gray100};
`;

const TemplateImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TemplateContent = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TemplateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const TemplateCategory = styled.div`
  font-size: 8px;
  color: ${palette.primary};
  font-weight: 500;
  background-color: ${palette.primaryLightest};
  padding: 3px;
  border-radius: 2px;
`;

const TemplateTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${palette.gray800};
  margin-bottom: 8px;
  text-align: left;
  
`;

const TemplateDescription = styled.div`
  font-size: 14px;
  color: ${palette.gray600};
  line-height: 1.4;
  flex: 1;
  text-align: left;
`;

const TemplateActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  flex-shrink: 0;
`;

const LocationText = styled(Body3)`
  color: ${palette.gray800};
`;

const LocationValue = styled.span`
  color: ${palette.primary};
`;