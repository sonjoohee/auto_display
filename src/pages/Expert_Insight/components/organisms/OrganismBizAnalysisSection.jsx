import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER,
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
  const [tempMainFeaturesOfBusinessInformation, setTempMainFeaturesOfBusinessInformation] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [tempMainCharacteristicOfBusinessInformation, setTempMainCharacteristicOfBusinessInformation] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [tempMusinessInformationTargetCustomer, setTempBusinessInformationTargetCustomer] = useAtom(TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER);

  const [newAddContent, setNewAddContent] = useState('');
  const [isAddingNow, setIsAddingNow] = useState({ section: '', isAdding: false });
  const [newEditContent, setNewEditContent] = useState('');
  const [editingIndex, setEditingIndex] = useState({ section: '', index: -1 });
  // const [isEditingNow, setIsEditingNow] = useState(false);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);

  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    setTempMainFeaturesOfBusinessInformation(mainFeaturesOfBusinessInformation);
    setTempMainCharacteristicOfBusinessInformation(mainCharacteristicOfBusinessInformation);
    setTempBusinessInformationTargetCustomer(businessInformationTargetCustomer);
  },[])

  const handleEditStart = (section, index) => {
    setEditingIndex({ section, index });
    
    switch (section) {
      case 'mainFeatures':
        setNewEditContent(mainFeaturesOfBusinessInformation[index]);
        break;
      case 'mainCharacteristic':
        setNewEditContent(mainCharacteristicOfBusinessInformation[index]);
        break;
      case 'targetCustomer':
        setNewEditContent(businessInformationTargetCustomer[index]);
        break;
      default:
        break;
    }
  };

  const handleApplyChange = () => {
    if (newEditContent.trim() === '') {
      alert("내용을 입력해주세요.");  // 비어있는 내용에 대한 경고 메시지
      return;
    }
  
    let updatedArray;
    
    switch (editingIndex.section) {
      case 'mainFeatures':
        updatedArray = [...mainFeaturesOfBusinessInformation];
        updatedArray[editingIndex.index] = newEditContent;
        setMainFeaturesOfBusinessInformation(updatedArray);
        break;
      case 'mainCharacteristic':
        updatedArray = [...mainCharacteristicOfBusinessInformation];
        updatedArray[editingIndex.index] = newEditContent;
        setMainCharacteristicOfBusinessInformation(updatedArray);
        break;
      case 'targetCustomer':
        updatedArray = [...businessInformationTargetCustomer];
        updatedArray[editingIndex.index] = newEditContent;
        setBusinessInformationTargetCustomer(updatedArray);
        break;
      default:
        break;
    }
  
    setEditingIndex({ section: '', index: -1 });
    setNewEditContent('');
    setWarningMessage('');
    console.log("Updated State:", updatedArray);
  };

  const handleEditCancel = () => {
    setEditingIndex({ section: '', index: -1 });
    setNewEditContent('');
    setWarningMessage('');
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
    alert("정말 삭제하시겠습니까?");
    
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
        {/* 주요특징 추가 기능 없음 */}
        <ul>
          {mainFeaturesOfBusinessInformation.map((content, index) => (
            <li key={index}>
              {editingIndex.section === 'mainFeatures' && editingIndex.index === index ? (
                <InputField
                  type="text"
                  value={newEditContent}
                  onChange={(e) => setNewEditContent(e.target.value)}
                />
              ) : (
                <p>{content}</p>
              )}
              {editingIndex.section === 'mainFeatures' && editingIndex.index === index ? (
                <>
                  <BtnWrap>
                    <button onClick={handleEditCancel}><img src={images.IconClose2} alt="" />취소</button>
                    <button onClick={handleApplyChange}><img src={images.IconCheck2} alt="" />적용</button>
                  </BtnWrap>
                </>
              ) : (
                <>
                  {isEditingNow && (
                    <>
                      <BtnWrap>
                        <button onClick={() => handleEditStart('mainFeatures', index)}><img src={images.IconEdit2} alt="" />수정</button>
                        <button onClick={() => {handleDelete('mainFeatures', index)}}><img src={images.IconDelete2} alt="" />삭제</button>
                      </BtnWrap>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        {isAddingNow.section === 'mainFeatures' && isAddingNow.isAdding ? (
          <AddInfo>
            <InputField
              value={newAddContent}
              onChange={(e) => { setNewAddContent(e.target.value); }}
              placeholder="새로운 정보를 추가해보세요"
            />
            <BtnWrap>
              <button onClick={() => setIsAddingNow({ section: '', isAdding: false })}><img src={images.IconClose2} alt="" />취소</button>
              <button onClick={() => handleAddSave('mainFeatures')}><img src={images.IconCheck2} alt="" />저장</button>
            </BtnWrap>
          </AddInfo>
        ) : (
          isEditingNow && (
            <button className="moreButton" onClick={() => setIsAddingNow({ section: 'mainFeatures', isAdding: true })}>
              특징 추가하기 +
            </button>
          )
        )}
      </BoxWrap>

      <BoxWrap>
        <strong><img src={images.IconSetting} alt="" />주요 기능</strong>
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
                  <BtnWrap>
                    <button onClick={handleEditCancel}><img src={images.IconClose2} alt="" />취소</button>
                    <button onClick={handleApplyChange}><img src={images.IconCheck2} alt="" />적용</button>
                  </BtnWrap>
                </>
              ) : (
                <>
                  {isEditingNow && (
                    <>
                      <BtnWrap>
                        <button onClick={() => handleEditStart('mainCharacteristic', index)}><img src={images.IconEdit2} alt="" />수정</button>
                        <button onClick={() => handleDelete('mainCharacteristic', index)}><img src={images.IconDelete2} alt="" />삭제</button>
                      </BtnWrap>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        {isAddingNow.section === 'mainCharacteristic' && isAddingNow.isAdding ? (
          <AddInfo>
            <InputField
              value={newAddContent}
              onChange={(e) => { setNewAddContent(e.target.value); }}
              placeholder="새로운 정보를 추가해보세요"
            />
            <button onClick={() => setIsAddingNow({ section: '', isAdding: false })}><img src={images.IconClose2} alt="" />취소</button>
            <button onClick={() => handleAddSave('mainCharacteristic')}><img src={images.IconCheck2} alt="" />저장</button>
          </AddInfo>
        ) : (
          isEditingNow && (
            <button className="moreButton" onClick={() => setIsAddingNow({ section: 'mainCharacteristic', isAdding: true })}>
              기능 추가하기 +
            </button>
          )
        )}
      </BoxWrap>

      <BoxWrap>
        <strong><img src={images.IconTarget} alt="" />목표 고객</strong>
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
                  <BtnWrap>
                    <button onClick={handleEditCancel}><img src={images.IconClose2} alt="" />취소</button>
                    <button onClick={handleApplyChange}><img src={images.IconCheck2} alt="" />적용</button>
                  </BtnWrap>
                </>
              ) : (
                <>
                  {isEditingNow && (
                    <>
                      <BtnWrap>
                        <button onClick={() => handleEditStart('targetCustomer', index)}><img src={images.IconEdit2} alt="" />수정</button>
                        <button onClick={() => handleDelete('targetCustomer', index)}><img src={images.IconDelete2} alt="" />삭제</button>
                      </BtnWrap>
                    </>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        {isAddingNow.section === 'targetCustomer' && isAddingNow.isAdding ? (
          <AddInfo>
            <InputField
              value={newAddContent}
              onChange={(e) => { setNewAddContent(e.target.value); }}
              placeholder="새로운 정보를 추가해보세요"
            />
          <button onClick={() => setIsAddingNow({ section: '', isAdding: false })}><img src={images.IconClose2} alt="" />취소</button>
          <button onClick={() => handleAddSave('targetCustomer')}><img src={images.IconCheck2} alt="" />저장</button>
          </AddInfo>
        ) : (
          isEditingNow && (
            <button className="moreButton" onClick={() => setIsAddingNow({ section: 'targetCustomer', isAdding: true })}>
              목표 고객 추가하기 +
            </button>
          )
        )}
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
  max-width:1135px;
  width:91.5%;
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
    gap:5px;
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
      margin-bottom:5px;
    }

    input[type=text] {
      height:30px;
      font-size:0.88rem;
      padding:4px 12px;
      border:0;
    }
  }

  p {
    font-size:0.88rem;
  }

  button {
    flex-shrink:0;
    font-family: 'Pretendard';
    // font-size:0.75rem;
    font-size:0;
    color:${palette.gray};
    padding:5px 8px;
    border-radius:5px;
    // border:1px solid ${palette.lineGray};
    border:0;
    background:${palette.white};

    img {
      width:14px;
      height:14px;
    }

    &.add {
      color:${palette.white};
      border:1px solid ${palette.black};
      background:${palette.black};
    }
  }

  .moreButton {
    width:100%;
    font-size:0.75rem;
    margin-top:4px;
    padding:8px;
    border:0;
  }
`;

const BtnWrap = styled.div`
  display:flex;
  align-items:center;
  flex-shrink:0;
  gap:5px;
  border-radius:5px;
  // background:${palette.white};

  input[type=text] {
    height:30px;
    font-size:0.88rem;
    padding:4px 12px;
    border:0;
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
