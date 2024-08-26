import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
} from '../../../AtomStates';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { InputField } from '../../../../assets/styles/Input';

import OrganismHeader from '../../../organisms/OrganismHeader';
import OrganismSideBar from '../organisms/OrganismSideBar';
import OrganismTakingChargeAiExpert from '../organisms/OrganismTakingChargeAiExpert';

const OrganismBizAnalysisSection = () => {

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);

  const [newAddContent, setNewAddContent] = useState(''); // 내용 추가 입력값 임시 저장용
  const [newEditContent, setNewEditContent] = useState(''); // 내용 수정 입력값 임시 저장용
  const [editingIndex, setEditingIndex] = useState(-1); // 수정 중인 항목의 인덱스 저장

  console.log("전문가 인덱스:", selectedExpertIndex, "인풋값:", inputBusinessInfo);
  console.log("주요특징 내용", mainFeaturesOfBusinessInformation);

  const addContent = () => {
    if (newAddContent.trim() !== '') {
      setMainFeaturesOfBusinessInformation([...mainFeaturesOfBusinessInformation, newAddContent]);
      setNewAddContent('');
    }
  };
  
  const deleteContent = (index) => {
    setMainFeaturesOfBusinessInformation(
      mainFeaturesOfBusinessInformation.filter((_, i) => i !== index)
    );
  };

  const handleEditStart = (index) => {
    setEditingIndex(index);
    setNewEditContent(mainFeaturesOfBusinessInformation[index]);
  };

  const handleEditSave = (index) => {
    const updatedFeatures = [...mainFeaturesOfBusinessInformation];
    updatedFeatures[index] = newEditContent;
    setMainFeaturesOfBusinessInformation(updatedFeatures);
    setEditingIndex(-1);
  };

  const handleEditCancel = () => {
    setEditingIndex(-1);
  };

  return (
    <>
      <AnalysisSection>
        <h1>{titleOfBusinessInfo}</h1>

        <BoxWrap>
          <strong><img src={images.StarChack} alt="" />주요 특징</strong>
          <ul>
          {mainFeaturesOfBusinessInformation.map((content, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={newEditContent}
                  onChange={(e) => setNewEditContent(e.target.value)}
                />
              ) : (
                <p onDoubleClick={() => handleEditStart(index)}>{content}</p>
              )}
              {editingIndex === index ? (
                <>
                  <button onClick={() => handleEditSave(index)}>저장</button>
                  <button onClick={handleEditCancel}>취소</button>
                </>
              ) : <button onClick={() => deleteContent(index)}>삭제</button>}
            </li>
          ))}
          </ul>

          <AddInfo>
            <InputField value={newAddContent} onChange={(e)=>{setNewAddContent(e.target.value);}} placeholder="새로운 정보를 추가해보세요"></InputField>
            <button onClick={addContent} className="add">추가</button>
          </AddInfo>
        </BoxWrap>

        <BoxWrap>
          <strong><img src={images.IconSetting} alt="" />주요 기능</strong>
          <ul>
          {mainFeaturesOfBusinessInformation.map((content, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={newEditContent}
                  onChange={(e) => setNewEditContent(e.target.value)}
                />
              ) : (
                <p onDoubleClick={() => handleEditStart(index)}>{content}</p>
              )}
              {editingIndex === index ? (
                <>
                  <button onClick={() => handleEditSave(index)}>저장</button>
                  <button onClick={handleEditCancel}>취소</button>
                </>
              ) : <button onClick={() => deleteContent(index)}>삭제</button>}
            </li>
          ))}
          </ul>

          <AddInfo>
            <InputField value={newAddContent} onChange={(e)=>{setNewAddContent(e.target.value);}} placeholder="새로운 정보를 추가해보세요"></InputField>
            <button onClick={addContent} className="add">추가</button>
          </AddInfo>
        </BoxWrap>

        <BoxWrap>
          <strong><img src={images.IconTarget} alt="" />목표 고객</strong>
          <ul>
          {mainFeaturesOfBusinessInformation.map((content, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={newEditContent}
                  onChange={(e) => setNewEditContent(e.target.value)}
                />
              ) : (
                <p onDoubleClick={() => handleEditStart(index)}>{content}</p>
              )}
              {editingIndex === index ? (
                <>
                  <button onClick={() => handleEditSave(index)}>저장</button>
                  <button onClick={handleEditCancel}>취소</button>
                </>
              ) : <button onClick={() => deleteContent(index)}>삭제</button>}
            </li>
          ))}
          </ul>

          <AddInfo>
            <InputField value={newAddContent} onChange={(e)=>{setNewAddContent(e.target.value);}} placeholder="새로운 정보를 추가해보세요"></InputField>
            <button onClick={addContent} className="add">추가</button>
          </AddInfo>
        </BoxWrap>

        <p>입력을 바탕으로 위와 같이 이해하고 정리하였습니다. <span>제가 이해한 내용이 맞습니까? 확인해 주시기 바랍니다.</span> 정확한 정보를 바탕으로 최상의 보고서를 작성하기 위해서는 고객님의 피드백이 매우 중요합니다. 감사합니다!</p>

        <ButtonWrap>
          <button type="button"><img src={images.IconWrite2} alt="" />비즈니스 설명 다시 하기</button>
          <div>
            <button type="button"><img src={images.IconRefresh} alt="" />재생성하기</button>
            <button type="button"><img src={images.IconEdit} alt="" />수정하기</button>
            <button type="button"><img src={images.IconCopy} alt="" />복사하기</button>
            <button type="button"><img src={images.IconSave} alt="" />저장하기</button>
          </div>
        </ButtonWrap>

      </AnalysisSection>
    </>
  );
};

export default OrganismBizAnalysisSection;

const AnalysisSection = styled.div`
  position:relative;
  text-align:left;
  margin-top:25px;
  padding:30px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    margin-bottom:20px;
  }

  > p {
    font-size:0.88rem;
    line-height:1.5;
    margin-top:30px;

    span {
      color:${palette.red};
    }
  }
`;

const BoxWrap = styled.div`
  padding:20px;
  border-radius:10px;
  background:rgba(0,0,0,.04);

  + div {
    margin-top:12px;
  }

  strong {
    display:flex;
    align-items:center;
    gap:8px;
    margin-bottom:10px;
  }

  li {
    position:relative;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
    padding-left:10px;

    &:before {
      position:absolute;
      left:0;
      top:50%;
      transform:translateY(-50%);
      width:5px;
      height:1px;
      background:${palette.black};
      content:'';
    }

    + li {
      margin-top:5px;
    }
  }

  p {
    font-size:0.88rem;
  }

  button {
    flex-shrink:0;
    font-family: 'Pretendard';
    font-size:0.75rem;
    color:${palette.gray};
    padding:5px 10px;
    border-radius:5px;
    border:1px solid ${palette.lineGray};
    background:${palette.white};

    &.add {
      color:${palette.white};
      border:1px solid ${palette.black};
      background:${palette.black};
    }
  }
`;

const AddInfo = styled.div`
  display:flex;
  align-items:stretch;
  gap:10px;
  margin-top:20px;

  input {
    font-size:0.88rem;
    height:40px;
    padding:4px 10px;
  }
`;

const ButtonWrap = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-top:20px;
  padding-top:20px;
  border-top:1px solid ${palette.lineGray};

  button {
    display:flex;
    align-items:center;
    gap:10px;
    font-family: 'Pretendard';
    fpmt-size:0.75rem;
    color:${palette.gray};
    border:0;
    background:none;
  }

  > button {
    padding:8px 16px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};
  }

  > div {
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:30px;
    // padding:8px 15px;
    // border-radius:6px;
    // border:1px solid ${palette.lineGray};
    // background:${palette.white};
    // box-shadow:0 4px 28px rgba(0,0,0,.1);
  }
`;
