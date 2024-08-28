import React, { useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
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
  STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_1,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_2,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_3,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_1,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_2,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_3,
  STRATEGY_REPORT_COSTOMER_NEEDS_1,
  STRATEGY_REPORT_COSTOMER_NEEDS_2,
  STRATEGY_REPORT_COSTOMER_NEEDS_3,
  STRATEGY_REPORT_COSTOMER_NEEDS_4,
  STRATEGY_REPORT_COSTOMER_NEEDS_5,
  STRATEGY_REPORT_COSTOMER_NEEDS_6,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_1,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_2,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_3,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_4,
  STRATEGY_REPORT_CUSTOMER_BENEFITS_5,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_1,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_2,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_3,
  STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_4,
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
  const [strategyReportCustomerNeeds1, setStrategyReportCustomerNeeds1] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_1);
  const [strategyReportCustomerNeeds2, setStrategyReportCustomerNeeds2] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_2);
  const [strategyReportCustomerNeeds3, setStrategyReportCustomerNeeds3] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_3);
  const [strategyReportCustomerNeeds4, setStrategyReportCustomerNeeds4] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_4);
  const [strategyReportCustomerNeeds5, setStrategyReportCustomerNeeds5] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_5);
  const [strategyReportCustomerNeeds6, setStrategyReportCustomerNeeds6] = useAtom(STRATEGY_REPORT_COSTOMER_NEEDS_6);

  const [strategyReportCustomerBenefitsTitle1, setStrategyReportCustomerBenefitsTitle1] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_1);
  const [strategyReportCustomerBenefitsTitle2, setStrategyReportCustomerBenefitsTitle2] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_2);
  const [strategyReportCustomerBenefitsTitle3, setStrategyReportCustomerBenefitsTitle3] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_TITLE_3);
  const [strategyReportCustomerBenefits1, setStrategyReportCustomerBenefits1] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_1);
  const [strategyReportCustomerBenefits2, setStrategyReportCustomerBenefits2] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_2);
  const [strategyReportCustomerBenefits3, setStrategyReportCustomerBenefits3] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_3);
  const [strategyReportCustomerBenefits4, setStrategyReportCustomerBenefits4] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_4);
  const [strategyReportCustomerBenefits5, setStrategyReportCustomerBenefits5] = useAtom(STRATEGY_REPORT_CUSTOMER_BENEFITS_5);

  const [strategyReportCompetitionDifferentiationTitle1, setStrategyReportCompetitionDifferentiationTitle1] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_1);
  const [strategyReportCompetitionDifferentiationTitle2, setStrategyReportCompetitionDifferentiationTitle2] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_2);
  const [strategyReportCompetitionDifferentiationTitle3, setStrategyReportCompetitionDifferentiationTitle3] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_TITLE_3);
  const [strategyReportCompetitionDifferentiation1, setStrategyReportCompetitionDifferentiation1] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_1);
  const [strategyReportCompetitionDifferentiation2, setStrategyReportCompetitionDifferentiation2] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_2);
  const [strategyReportCompetitionDifferentiation3, setStrategyReportCompetitionDifferentiation3] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_3);
  const [strategyReportCompetitionDifferentiation4, setStrategyReportCompetitionDifferentiation4] = useAtom(STRATEGY_REPORT_COMPETITION_DIFFERENTIATION_4);

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
    let reportData;
  
    if (reportIndex === 0) {
      // 비즈니스 분석 리포트 데이터 저장
      reportData = {
        title: titleOfBusinessInfo,
        mainFeatures: mainFeaturesOfBusinessInformation,
        mainCharacter: mainCharacteristicOfBusinessInformation,
        mainCustomer: businessInformationTargetCustomer,
      };
    } else if (reportIndex === 1) {
      // 전략 보고서 데이터 저장
      reportData = {
        strategyCustomerNeeds: {
          title1: strategyReportCustomerNeeds1,
          title2: strategyReportCustomerNeeds2,
          title3: strategyReportCustomerNeeds3,
          title4: strategyReportCustomerNeeds4,
          title5: strategyReportCustomerNeeds5,
          title6: strategyReportCustomerNeeds6,
        },
        strategyCustomerBenefits: {
          title1: strategyReportCustomerBenefitsTitle1,
          benefits1: strategyReportCustomerBenefits1,
          title2: strategyReportCustomerBenefitsTitle2,
          benefits2: strategyReportCustomerBenefits2,
          title3: strategyReportCustomerBenefitsTitle3,
          benefits3: strategyReportCustomerBenefits3,
          benefits4: strategyReportCustomerBenefits4,
          benefits5: strategyReportCustomerBenefits5,
        },
        strategyCompetitionDifferentiation: {
          title1: strategyReportCompetitionDifferentiationTitle1,
          differentiation1: strategyReportCompetitionDifferentiation1,
          title2: strategyReportCompetitionDifferentiationTitle2,
          differentiation2: strategyReportCompetitionDifferentiation2,
          title3: strategyReportCompetitionDifferentiationTitle3,
          differentiation3: strategyReportCompetitionDifferentiation3,
          differentiation4: strategyReportCompetitionDifferentiation4,
        },
      };
    }
  
  // 기존 리포트에 새로운 리포트 추가
  setSavedReports((prevReports) => [
    ...prevReports,
    {
      title: titleOfBusinessInfo,
      date: new Date().toLocaleDateString(),
      content: reportData,
      reportIndex: reportIndex, // reportIndex를 추가하여 저장
    },
  ]);
  console.log(reportData)
  
    // 기존 대화 내역에 리포트 데이터 추가
    console.log(conversationId)
    const existingConversation = await getConversationByIdFromIndexedDB(conversationId);
    const updatedConversation = {
      ...existingConversation,
      analysisReportData: reportIndex === 0 ? reportData : existingConversation.analysisReportData,
      strategyReportData: reportIndex === 1 ? reportData : existingConversation.strategyReportData,
      timestamp: Date.now(),
    };
  
    await saveConversationToIndexedDB(updatedConversation);
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
