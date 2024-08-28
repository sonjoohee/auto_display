import React, { useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  EXPERT1_TAB1_CT1_TITLE,
  EXPERT1_TAB1_CT2_TITLE,
  EXPERT1_TAB1_CT3_TITLE,
  EXPERT1_TAB1_CT4_TITLE,
  EXPERT1_TAB1_CT5_TITLE,
  EXPERT1_TAB2_CT1_TITLE,
  EXPERT1_TAB2_CT2_TITLE,
  EXPERT1_TAB2_CT3_TITLE,
  EXPERT1_TAB2_CT4_TITLE,
  EXPERT1_TAB3_CT1_TITLE,
  EXPERT1_TAB3_CT2_TITLE,
  EXPERT1_TAB3_CT3_TITLE,
  EXPERT1_TAB3_CT4_TITLE,
  EXPERT1_TAB1_CT1,
  EXPERT1_TAB1_CT2,
  EXPERT1_TAB1_CT3,
  EXPERT1_TAB1_CT4,
  EXPERT1_TAB1_CT5,
  EXPERT1_TAB1_CT6,
  EXPERT1_TAB2_CT1,
  EXPERT1_TAB2_CT2,
  EXPERT1_TAB2_CT3,
  EXPERT1_TAB2_CT4,
  EXPERT1_TAB2_CT5,
  EXPERT1_TAB3_CT1,
  EXPERT1_TAB3_CT2,
  EXPERT1_TAB3_CT3,
  EXPERT1_TAB3_CT4,
  EXPERT1_TAB3_CT5,
  EXPERT2_TAB1_CT1_TITLE,
  EXPERT2_TAB1_CT2_TITLE,
  EXPERT2_TAB1_CT3_TITLE,
  EXPERT2_TAB1_CT4_TITLE,
  EXPERT2_TAB2_CT1_TITLE,
  EXPERT2_TAB2_CT2_TITLE,
  EXPERT2_TAB2_CT3_TITLE,
  EXPERT2_TAB3_CT1_TITLE,
  EXPERT2_TAB3_CT2_TITLE,
  EXPERT2_TAB3_CT3_TITLE,
  EXPERT2_TAB1_CT1,
  EXPERT2_TAB1_CT2,
  EXPERT2_TAB1_CT3,
  EXPERT2_TAB1_CT4,
  EXPERT2_TAB1_CT5,
  EXPERT2_TAB2_CT1,
  EXPERT2_TAB2_CT2,
  EXPERT2_TAB2_CT3,
  EXPERT2_TAB2_CT4,
  EXPERT2_TAB3_CT1,
  EXPERT2_TAB3_CT2,
  EXPERT2_TAB3_CT3,
  EXPERT2_TAB3_CT4,
  EXPERT3_TAB1_CT1_TITLE,
  EXPERT3_TAB1_CT2_TITLE,
  EXPERT3_TAB1_CT3_TITLE,
  EXPERT3_TAB1_CT4_TITLE,
  EXPERT3_TAB2_CT1_TITLE,
  EXPERT3_TAB2_CT2_TITLE,
  EXPERT3_TAB2_CT3_TITLE,
  EXPERT3_TAB1_CT1,
  EXPERT3_TAB1_CT2,
  EXPERT3_TAB1_CT3,
  EXPERT3_TAB1_CT4,
  EXPERT3_TAB1_CT5,
  EXPERT3_TAB2_CT1,
  EXPERT3_TAB2_CT2,
  EXPERT3_TAB2_CT3,
  EXPERT3_TAB2_CT4,
  TITLE_OF_BUSINESS_INFORMATION,
  IS_CLICK_EXPERT_SELECT,
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER,
  SAVED_REPORTS,
  IS_EDITING_NOW,
} from '../../../AtomStates';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';

const MoleculeReportController = ({ reportIndex, conversationId }) => {
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [isClickExpertSelect] = useAtom(IS_CLICK_EXPERT_SELECT);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [tempMainFeaturesOfBusinessInformation, setTempMainFeaturesOfBusinessInformation] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [tempMainCharacteristicOfBusinessInformation, setTempMainCharacteristicOfBusinessInformation] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [tempMusinessInformationTargetCustomer, setTemptBusinessInformationTargetCustomer] = useAtom(TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER);
  
  const [savedReports, setSavedReports] = useAtom(SAVED_REPORTS);
  const [bizAnalysisReportIndex, setBizAnalysisReportIndex] = useState(0);
  const [newAddContent, setNewAddContent] = useState('');
  const [isAddingNow, setIsAddingNow] = useState({ section: '', isAdding: false });
  const [newEditContent, setNewEditContent] = useState('');
  const [editingIndex, setEditingIndex] = useState({ section: '', index: -1 });
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [warningMessage, setWarningMessage] = useState('');

  const [expert1Tab1Ct1Title, setExpert1Tab1Ct1Title] = useAtom(EXPERT1_TAB1_CT1_TITLE);
  const [expert1Tab1Ct2Title, setExpert1Tab1Ct2Title] = useAtom(EXPERT1_TAB1_CT2_TITLE);
  const [expert1Tab1Ct3Title, setExpert1Tab1Ct3Title] = useAtom(EXPERT1_TAB1_CT3_TITLE);
  const [expert1Tab1Ct4Title, setExpert1Tab1Ct4Title] = useAtom(EXPERT1_TAB1_CT4_TITLE);
  const [expert1Tab1Ct5Title, setExpert1Tab1Ct5Title] = useAtom(EXPERT1_TAB1_CT5_TITLE);
  const [expert1Tab2Ct1Title, setExpert1Tab2Ct1Title] = useAtom(EXPERT1_TAB2_CT1_TITLE);
  const [expert1Tab2Ct2Title, setExpert1Tab2Ct2Title] = useAtom(EXPERT1_TAB2_CT2_TITLE);
  const [expert1Tab2Ct3Title, setExpert1Tab2Ct3Title] = useAtom(EXPERT1_TAB2_CT3_TITLE);
  const [expert1Tab2Ct4Title, setExpert1Tab2Ct4Title] = useAtom(EXPERT1_TAB2_CT4_TITLE);
  const [expert1Tab3Ct1Title, setExpert1Tab3Ct1Title] = useAtom(EXPERT1_TAB3_CT1_TITLE);
  const [expert1Tab3Ct2Title, setExpert1Tab3Ct2Title] = useAtom(EXPERT1_TAB3_CT2_TITLE);
  const [expert1Tab3Ct3Title, setExpert1Tab3Ct3Title] = useAtom(EXPERT1_TAB3_CT3_TITLE);
  const [expert1Tab3Ct4Title, setExpert1Tab3Ct4Title] = useAtom(EXPERT1_TAB3_CT4_TITLE);
  const [expert1Tab1Ct1, setExpert1Tab1Ct1] = useAtom(EXPERT1_TAB1_CT1);
  const [expert1Tab1Ct2, setExpert1Tab1Ct2] = useAtom(EXPERT1_TAB1_CT2);
  const [expert1Tab1Ct3, setExpert1Tab1Ct3] = useAtom(EXPERT1_TAB1_CT3);
  const [expert1Tab1Ct4, setExpert1Tab1Ct4] = useAtom(EXPERT1_TAB1_CT4);
  const [expert1Tab1Ct5, setExpert1Tab1Ct5] = useAtom(EXPERT1_TAB1_CT5);
  const [expert1Tab1Ct6, setExpert1Tab1Ct6] = useAtom(EXPERT1_TAB1_CT6);
  const [expert1Tab2Ct1, setExpert1Tab2Ct1] = useAtom(EXPERT1_TAB2_CT1);
  const [expert1Tab2Ct2, setExpert1Tab2Ct2] = useAtom(EXPERT1_TAB2_CT2);
  const [expert1Tab2Ct3, setExpert1Tab2Ct3] = useAtom(EXPERT1_TAB2_CT3);
  const [expert1Tab2Ct4, setExpert1Tab2Ct4] = useAtom(EXPERT1_TAB2_CT4);
  const [expert1Tab2Ct5, setExpert1Tab2Ct5] = useAtom(EXPERT1_TAB2_CT5);
  const [expert1Tab3Ct1, setExpert1Tab3Ct1] = useAtom(EXPERT1_TAB3_CT1);
  const [expert1Tab3Ct2, setExpert1Tab3Ct2] = useAtom(EXPERT1_TAB3_CT2);
  const [expert1Tab3Ct3, setExpert1Tab3Ct3] = useAtom(EXPERT1_TAB3_CT3);
  const [expert1Tab3Ct4, setExpert1Tab3Ct4] = useAtom(EXPERT1_TAB3_CT4);
  const [expert1Tab3Ct5, setExpert1Tab3Ct5] = useAtom(EXPERT1_TAB3_CT5);
  const [expert2Tab1Ct1Title, setExpert2Tab1Ct1Title] = useAtom(EXPERT2_TAB1_CT1_TITLE);
  const [expert2Tab1Ct2Title, setExpert2Tab1Ct2Title] = useAtom(EXPERT2_TAB1_CT2_TITLE);
  const [expert2Tab1Ct3Title, setExpert2Tab1Ct3Title] = useAtom(EXPERT2_TAB1_CT3_TITLE);
  const [expert2Tab1Ct4Title, setExpert2Tab1Ct4Title] = useAtom(EXPERT2_TAB1_CT4_TITLE);
  const [expert2Tab2Ct1Title, setExpert2Tab2Ct1Title] = useAtom(EXPERT2_TAB2_CT1_TITLE);
  const [expert2Tab2Ct2Title, setExpert2Tab2Ct2Title] = useAtom(EXPERT2_TAB2_CT2_TITLE);
  const [expert2Tab2Ct3Title, setExpert2Tab2Ct3Title] = useAtom(EXPERT2_TAB2_CT3_TITLE);
  const [expert2Tab3Ct1Title, setExpert2Tab3Ct1Title] = useAtom(EXPERT2_TAB3_CT1_TITLE);
  const [expert2Tab3Ct2Title, setExpert2Tab3Ct2Title] = useAtom(EXPERT2_TAB3_CT2_TITLE);
  const [expert2Tab3Ct3Title, setExpert2Tab3Ct3Title] = useAtom(EXPERT2_TAB3_CT3_TITLE);
  const [expert2Tab1Ct1, setExpert2Tab1Ct1] = useAtom(EXPERT2_TAB1_CT1);
  const [expert2Tab1Ct2, setExpert2Tab1Ct2] = useAtom(EXPERT2_TAB1_CT2);
  const [expert2Tab1Ct3, setExpert2Tab1Ct3] = useAtom(EXPERT2_TAB1_CT3);
  const [expert2Tab1Ct4, setExpert2Tab1Ct4] = useAtom(EXPERT2_TAB1_CT4);
  const [expert2Tab1Ct5, setExpert2Tab1Ct5] = useAtom(EXPERT2_TAB1_CT5);
  const [expert2Tab2Ct1, setExpert2Tab2Ct1] = useAtom(EXPERT2_TAB2_CT1);
  const [expert2Tab2Ct2, setExpert2Tab2Ct2] = useAtom(EXPERT2_TAB2_CT2);
  const [expert2Tab2Ct3, setExpert2Tab2Ct3] = useAtom(EXPERT2_TAB2_CT3);
  const [expert2Tab2Ct4, setExpert2Tab2Ct4] = useAtom(EXPERT2_TAB2_CT4);
  const [expert2Tab3Ct1, setExpert2Tab3Ct1] = useAtom(EXPERT2_TAB3_CT1);
  const [expert2Tab3Ct2, setExpert2Tab3Ct2] = useAtom(EXPERT2_TAB3_CT2);
  const [expert2Tab3Ct3, setExpert2Tab3Ct3] = useAtom(EXPERT2_TAB3_CT3);
  const [expert2Tab3Ct4, setExpert2Tab3Ct4] = useAtom(EXPERT2_TAB3_CT4);
  const [expert3Tab1Ct1Title, setExpert3Tab1Ct1Title] = useAtom(EXPERT3_TAB1_CT1_TITLE);
  const [expert3Tab1Ct2Title, setExpert3Tab1Ct2Title] = useAtom(EXPERT3_TAB1_CT2_TITLE);
  const [expert3Tab1Ct3Title, setExpert3Tab1Ct3Title] = useAtom(EXPERT3_TAB1_CT3_TITLE);
  const [expert3Tab1Ct4Title, setExpert3Tab1Ct4Title] = useAtom(EXPERT3_TAB1_CT4_TITLE);
  const [expert3Tab2Ct1Title, setExpert3Tab2Ct1Title] = useAtom(EXPERT3_TAB2_CT1_TITLE);
  const [expert3Tab2Ct2Title, setExpert3Tab2Ct2Title] = useAtom(EXPERT3_TAB2_CT2_TITLE);
  const [expert3Tab2Ct3Title, setExpert3Tab2Ct3Title] = useAtom(EXPERT3_TAB2_CT3_TITLE);
  const [expert3Tab1Ct1, setExpert3Tab1Ct1] = useAtom(EXPERT3_TAB1_CT1);
  const [expert3Tab1Ct2, setExpert3Tab1Ct2] = useAtom(EXPERT3_TAB1_CT2);
  const [expert3Tab1Ct3, setExpert3Tab1Ct3] = useAtom(EXPERT3_TAB1_CT3);
  const [expert3Tab1Ct4, setExpert3Tab1Ct4] = useAtom(EXPERT3_TAB1_CT4);
  const [expert3Tab1Ct5, setExpert3Tab1Ct5] = useAtom(EXPERT3_TAB1_CT5);
  const [expert3Tab2Ct1, setExpert3Tab2Ct1] = useAtom(EXPERT3_TAB2_CT1);
  const [expert3Tab2Ct2, setExpert3Tab2Ct2] = useAtom(EXPERT3_TAB2_CT2);
  const [expert3Tab2Ct3, setExpert3Tab2Ct3] = useAtom(EXPERT3_TAB2_CT3);
  const [expert3Tab2Ct4, setExpert3Tab2Ct4] = useAtom(EXPERT3_TAB2_CT4);

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const handleEditSave = async () => {
    if (editingIndex.section !== '' && editingIndex.index !== -1) {
      setWarningMessage('변경 사항을 적용해주세요.');
      return;
    }

    const existingConversation = await getConversationByIdFromIndexedDB(conversationId);

    const updatedConversation = {
      ...existingConversation,
      analysisReportData,
      timestamp: Date.now(),
    };


    await saveConversationToIndexedDB(updatedConversation);
    setIsEditingNow(false);
  };

  const handleEditConfirm = () => {
    handleEditSave(); 
    setIsEditingNow(false);

    setTempMainFeaturesOfBusinessInformation(mainFeaturesOfBusinessInformation);
    setTempMainCharacteristicOfBusinessInformation(mainCharacteristicOfBusinessInformation);
    setTemptBusinessInformationTargetCustomer(businessInformationTargetCustomer);
  };

  const handleEditCancel = () => {
    // 임시로 confirm 함수 사용
    // eslint-disable-next-line no-restricted-globals
    let isCancel = confirm("정말 취소하시겠습니까?");

    if (isCancel) {
      setMainFeaturesOfBusinessInformation(tempMainFeaturesOfBusinessInformation)
      setMainCharacteristicOfBusinessInformation(tempMainCharacteristicOfBusinessInformation)
      setBusinessInformationTargetCustomer(tempMusinessInformationTargetCustomer)
      setIsEditingNow(false);
    }
  };

  // const handleEditCancel = () => {
  //   setEditingIndex({ section: '', index: -1 });
  //   setWarningMessage('');  // 경고 메시지를 초기화합니다.
  // };

  const saveReport = async () => {
    alert("저장되었습니다.")

    const analysisData = {
      title: titleOfBusinessInfo,
      mainFeatures: mainFeaturesOfBusinessInformation,
      keyFunctions: mainCharacteristicOfBusinessInformation,
      targetCustomers: businessInformationTargetCustomer,
    };

    setSavedReports((prevReports) => [
      ...prevReports,
      {
        title: titleOfBusinessInfo,
        date: new Date().toLocaleDateString(),
        content: analysisData,
      },
    ]);

    // 기존 대화 내역을 유지하면서 새로운 정보를 추가
    const existingConversation = await getConversationByIdFromIndexedDB(conversationId);
    const updatedConversation = {
      ...existingConversation,
      analysisReportData,
      timestamp: Date.now(),
    };

    saveConversationToIndexedDB(updatedConversation);
  };

const handleCopyContent = () => {

let contentToCopy = ``

if (selectedExpertIndex === 0) {
contentToCopy = `
${titleOfBusinessInfo}

주요 특징
${mainFeaturesOfBusinessInformation.map(feature => `- ${feature}`).join('\n')}

주요 특성
${mainCharacteristicOfBusinessInformation.map(character => `- ${character}`).join('\n')}

대상 고객
${businessInformationTargetCustomer.map(customer => `- ${customer}`).join('\n')}
    `;
}

else {
  return;
}

navigator.clipboard.writeText(contentToCopy)
  .then(() => {
    alert("복사가 완료되었습니다.");
  })
  .catch(error => {
    console.error("복사 실패?", error);
  });
};

  // reportIndex === 0 : 비즈니스 분석 리포트 (아이디어 설명 다시하기, 재생성하기, 수정하기, 복사하기, 저장하기)
    // isClickExpertSelect === true :  전문가를 선택했을 때 비즈니스 분석 리포트 (복사하시, 저장하기)
    // isEditingNow === true : 수정중인 비즈니스 분석 리포트 (취소하기, 수정완료하기)
  
  // reportIndex === 1 : 전문가 리포트 (재생성하기, 복사하기, 저장하기)
  return (
    <>
      {reportIndex === 0 ? (
        <>
          {isClickExpertSelect ? (
            <ButtonWrap>
              <div />
              <div>
                <button type="button">
                  <img src={images.IconCopy} alt="" />
                  복사하기
                </button>
                <button type="button" onClick={saveReport}>
                  <img src={images.IconSave} alt="" />
                  저장하기
                </button>
              </div>
            </ButtonWrap>
          ) : (
            <>
              {!isEditingNow ? (
                <ButtonWrap>
                  <button type="button">
                    <img src={images.IconWrite2} alt="" />
                    비즈니스 설명 다시 하기
                  </button>
                  <div>
                    <button type="button">
                      <img src={images.IconRefresh} alt="" />
                      재생성하기
                    </button>
                    <button type="button" onClick={() => setIsEditingNow(true)}>
                      <img src={images.IconEdit} alt="" />
                      수정하기
                    </button>
                    <button type="button" onClick={handleCopyContent}>
                      <img src={images.IconCopy} alt="" />
                      복사하기
                    </button>
                    <button type="button" onClick={saveReport}>
                      <img src={images.IconSave} alt="" />
                      저장하기
                    </button>
                  </div>
                </ButtonWrap>
              ) : (
                <ButtonWrap>
                  <div />
                  <div>
                    <button type="button" onClick={() => handleEditCancel()}>
                      취소하기
                    </button>
                    <button type="button" onClick={() => handleEditConfirm()}>
                      수정 완료하기
                    </button>
                  </div>
                </ButtonWrap>
              )}
            </>
          )}
        </>
      ) : (
        <ButtonWrap>
          <div />
          <div>
            <button type="button">
              <img src={images.IconRefresh} alt="" />
              재생성하기
            </button>
            <button type="button">
              <img src={images.IconCopy} alt="" />
              복사하기
            </button>
            <button type="button" onClick={saveReport}>
              <img src={images.IconSave} alt="" />
              저장하기
            </button>
          </div>
        </ButtonWrap>
      )}
    </>
  );
};

export default MoleculeReportController;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${palette.lineGray};

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Pretendard';
    font-size: 0.75rem;
    color: ${palette.gray};
    border: 0;
    background: none;
  }

  > button {
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
  }
`;
