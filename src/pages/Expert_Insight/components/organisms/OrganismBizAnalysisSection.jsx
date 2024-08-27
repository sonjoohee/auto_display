import React, { useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  SAVED_REPORTS,
  IS_EDITING_NOW,
} from '../../../AtomStates';
import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { InputField } from '../../../../assets/styles/Input';
import MoleculeReportController from '../molecules/MoleculeReportController';

const OrganismBizAnalysisSection = ({ conversationId }) => {
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [savedReports, setSavedReports] = useAtom(SAVED_REPORTS);

  const [bizAnalysisReportIndex, setBizAnalysisReportIndex] = useState(0);
  const [newAddContent, setNewAddContent] = useState('');
  const [isAddingNow, setIsAddingNow] = useState({ section: '', isAdding: false });
  const [newEditContent, setNewEditContent] = useState('');
  const [editingIndex, setEditingIndex] = useState({ section: '', index: -1 });
  // const [isEditingNow, setIsEditingNow] = useState(false);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  const [warningMessage, setWarningMessage] = useState('');

  const handleEditStart = (section, index) => {
    setEditingIndex({ section, index });
    if (section === 'mainFeatures') {
      setNewEditContent(mainFeaturesOfBusinessInformation[index]);
    } else if (section === 'mainCharacteristic') {
      setNewEditContent(mainCharacteristicOfBusinessInformation[index]);
    } else if (section === 'targetCustomer') {
      setNewEditContent(businessInformationTargetCustomer[index]);
    }
  };

  const handleApplyChange = () => {
    if (editingIndex.section === 'mainFeatures') {
      const updatedFeatures = [...mainFeaturesOfBusinessInformation];
      updatedFeatures[editingIndex.index] = newEditContent;
      setMainFeaturesOfBusinessInformation(updatedFeatures);
    } else if (editingIndex.section === 'mainCharacteristic') {
      const updatedFeatures = [...mainCharacteristicOfBusinessInformation];
      updatedFeatures[editingIndex.index] = newEditContent;
      setMainCharacteristicOfBusinessInformation(updatedFeatures);
    } else if (editingIndex.section === 'targetCustomer') {
      const updatedCustomers = [...businessInformationTargetCustomer];
      updatedCustomers[editingIndex.index] = newEditContent;
      setBusinessInformationTargetCustomer(updatedCustomers);
    }

    setEditingIndex({ section: '', index: -1 });
    setWarningMessage('');  // 경고 메시지를 초기화합니다.
  };

  const handleEditCancel = () => {
    setEditingIndex({ section: '', index: -1 });
    setWarningMessage('');  // 경고 메시지를 초기화합니다.
  };

  const handleAddSave = (section) => {
    if (newAddContent.trim() !== '') {
      if (section === 'mainFeatures') {
        setMainFeaturesOfBusinessInformation([...mainFeaturesOfBusinessInformation, newAddContent]);
      } else if (section === 'mainCharacteristic') {
        setMainCharacteristicOfBusinessInformation([...mainCharacteristicOfBusinessInformation, newAddContent]);
      } else if (section === 'targetCustomer') {
        setBusinessInformationTargetCustomer([...businessInformationTargetCustomer, newAddContent]);
      }
      setNewAddContent('');
      setIsAddingNow({ section: '', isAdding: false });
    }
  };

  const handleDelete = (section, index) => {
    if (section === 'mainFeatures') {
      setMainFeaturesOfBusinessInformation(
        mainFeaturesOfBusinessInformation.filter((_, i) => i !== index)
      );
    } else if (section === 'mainCharacteristic') {
      setMainCharacteristicOfBusinessInformation(
        mainCharacteristicOfBusinessInformation.filter((_, i) => i !== index)
      );
    } else if (section === 'targetCustomer') {
      setBusinessInformationTargetCustomer(
        businessInformationTargetCustomer.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <AnalysisSection>
      <h1>{titleOfBusinessInfo}</h1>

      <BoxWrap>
        <strong><img src={images.StarChack} alt="" />주요 특징</strong>
        {isEditingNow && <button onClick={() => setIsAddingNow({ section: 'mainFeatures', isAdding: true })}>추가</button>}
        <ul>
          {mainFeaturesOfBusinessInformation.map((content, index) => (
            <li key={index}>
              {editingIndex.section === 'mainFeatures' && editingIndex.index === index ? (
                <InputField
                  type="text"
                  value={newEditContent}
                  onChange={(e) => {setBizAnalysisReportIndex(0); setNewEditContent(e.target.value);}}
                />
              ) : (
                <p>{content}</p>
              )}
              {editingIndex.section === 'mainFeatures' && editingIndex.index === index ? (
                <>
                  <button onClick={handleApplyChange}>적용</button>
                  <button onClick={handleEditCancel}>취소</button>
                </>
              ) : (
                <>
                  {isEditingNow && (
                    <>
                      <button onClick={() => handleEditStart('mainFeatures', index)}>수정</button>
                      <button onClick={() => handleDelete('mainFeatures', index)}>삭제</button>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        {isAddingNow.section === 'mainFeatures' && isAddingNow.isAdding &&
          <AddInfo>
            <InputField value={newAddContent} onChange={(e) => { setNewAddContent(e.target.value); }} placeholder="새로운 정보를 추가해보세요"></InputField>
            <button onClick={() => handleAddSave('mainFeatures')}>저장</button>
            <button onClick={() => setIsAddingNow({ section: '', isAdding: false })}>취소</button>
          </AddInfo>
        }
      </BoxWrap>

      <BoxWrap>
        <strong><img src={images.StarChack} alt="" />주요 기능</strong>
        {isEditingNow && <button onClick={() => setIsAddingNow({ section: 'mainCharacteristic', isAdding: true })}>추가</button>}
        <ul>
          {mainCharacteristicOfBusinessInformation.map((content, index) => (
            <li key={index}>
              {editingIndex.section === 'mainCharacteristic' && editingIndex.index === index ? (
                <InputField
                  type="text"
                  value={newEditContent}
                  onChange={(e) => setNewEditContent(e.target.value)}
                />
              ) : (
                <p>{content}</p>
              )}
              {editingIndex.section === 'mainCharacteristic' && editingIndex.index === index ? (
                <>
                  <button onClick={handleApplyChange}>적용</button>
                  <button onClick={handleEditCancel}>취소</button>
                </>
              ) : (
                <>
                  {isEditingNow && (
                    <>
                      <button onClick={() => handleEditStart('mainCharacteristic', index)}>수정</button>
                      <button onClick={() => handleDelete('mainCharacteristic', index)}>삭제</button>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        {isAddingNow.section === 'mainCharacteristic' && isAddingNow.isAdding &&
          <AddInfo>
            <InputField value={newAddContent} onChange={(e) => { setNewAddContent(e.target.value); }} placeholder="새로운 정보를 추가해보세요"></InputField>
            <button onClick={() => handleAddSave('mainCharacteristic')}>저장</button>
            <button onClick={() => setIsAddingNow({ section: '', isAdding: false })}>취소</button>
          </AddInfo>
        }
      </BoxWrap>

      <BoxWrap>
        <strong><img src={images.StarChack} alt="" />목표 고객</strong>
        {isEditingNow && <button onClick={() => setIsAddingNow({ section: 'targetCustomer', isAdding: true })}>추가</button>}
        <ul>
          {businessInformationTargetCustomer.map((content, index) => (
            <li key={index}>
              {editingIndex.section === 'targetCustomer' && editingIndex.index === index ? (
                <InputField
                  type="text"
                  value={newEditContent}
                  onChange={(e) => setNewEditContent(e.target.value)}
                />
              ) : (
                <p>{content}</p>
              )}
              {editingIndex.section === 'targetCustomer' && editingIndex.index === index ? (
                <>
                  <button onClick={handleApplyChange}>적용</button>
                  <button onClick={handleEditCancel}>취소</button>
                </>
              ) : (
                <>
                  {isEditingNow && (
                    <>
                      <button onClick={() => handleEditStart('targetCustomer', index)}>수정</button>
                      <button onClick={() => handleDelete('targetCustomer', index)}>삭제</button>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        {isAddingNow.section === 'targetCustomer' && isAddingNow.isAdding &&
          <AddInfo>
            <InputField value={newAddContent} onChange={(e) => { setNewAddContent(e.target.value); }} placeholder="새로운 정보를 추가해보세요"></InputField>
            <button onClick={() => handleAddSave('targetCustomer')}>저장</button>
            <button onClick={() => setIsAddingNow({ section: '', isAdding: false })}>취소</button>
          </AddInfo>
        }
      </BoxWrap>

      <p>입력을 바탕으로 위와 같이 이해하고 정리하였습니다. <span>제가 이해한 내용이 맞습니까? 확인해 주시기 바랍니다.</span> 정확한 정보를 바탕으로 최상의 보고서를 작성하기 위해서는 고객님의 피드백이 매우 중요합니다. 감사합니다!</p>

      {warningMessage && <WarningMessage>{warningMessage}</WarningMessage>} {/* 경고 메시지 출력 */}
      <MoleculeReportController reportIndex={0} conversationId={conversationId}  />
    </AnalysisSection>
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
    font-size: 0.88rem;
    height: 40px;
    padding: 4px 10px;
    border: 1px solid ${palette.lineGray}; /* 테두리 색상 */
    background-color: ${palette.white}; /* 배경색 */
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
  }
`;

const WarningMessage = styled.div`
  color: ${palette.red};
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`;
