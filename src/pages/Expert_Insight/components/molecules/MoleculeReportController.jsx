import React, { useState } from 'react';
import styled, { css } from 'styled-components';
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
  SELECTED_TAB,
  EXPERT_REPORT_DATA,
} from '../../../AtomStates';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';

const MoleculeReportController = ({ reportIndex, conversationId, sampleData }) => {
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

  const [selectedTab, setSelectedTab] = useAtom(SELECTED_TAB);

  const [expertReportData, setExpertReportData] = useAtom(EXPERT_REPORT_DATA);

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
    alert("저장되었습니다.");

    let reportData;

    if (reportIndex === 0) {
      // 비즈니스 분석 리포트 데이터 저장 (이 부분은 기존 로직을 유지합니다)
      reportData = {
        title: titleOfBusinessInfo,
        mainFeatures: mainFeaturesOfBusinessInformation,
        mainCharacter: mainCharacteristicOfBusinessInformation,
        mainCustomer: businessInformationTargetCustomer,
      };
    } else if (reportIndex === 1) {
      // 전략 보고서 데이터 저장 - sampleData 사용
      reportData = sampleData; // sampleData를 그대로 저장합니다
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

    console.log(reportData);

    // 기존 대화 내역에 리포트 데이터 추가
    const existingConversation = await getConversationByIdFromIndexedDB(conversationId);
    const updatedConversation = {
      ...existingConversation,
      analysisReportData: reportIndex === 0 ? reportData : existingConversation.analysisReportData,
      strategyReportData: reportIndex === 1 ? reportData : existingConversation.strategyReportData,
      timestamp: Date.now(),
    };

    await saveConversationToIndexedDB(updatedConversation);
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
    // 재귀적으로 JSON 데이터에서 모든 텍스트 내용을 추출하는 함수
    const extractTextContent = (data) => {
      let textContent = '';

      if (typeof data === 'string') {
        return data + '\n';
      }

      if (Array.isArray(data)) {
        data.forEach(item => {
          textContent += extractTextContent(item);
        });
      } else if (typeof data === 'object' && data !== null) {
        Object.values(data).forEach(value => {
          textContent += extractTextContent(value);
        });
      }

      return textContent;
    };

    contentToCopy = extractTextContent(expertReportData);
  }

  navigator.clipboard.writeText(contentToCopy.trim())
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
<<<<<<< HEAD

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenCancel, setIsPopupOpenCancel] = useState(false);
  const [clickState, setClickState] = useState(false);

  const togglePopup = () => {
    if (clickState == false) {
      setIsPopupOpen(!isPopupOpen);
    }
  };

  const togglePopupCancel = () => {
    if (clickState == false) {
      setIsPopupOpenCancel(!isPopupOpenCancel);
    }
  };

=======
  
>>>>>>> dd3e7d76c586c8038460e5e1f27f1ea464b5ad01
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
                    <button type="button" onClick={togglePopup}>
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
                    {/* <button type="button" className="lineBtn" onClick={() => handleEditCancel()}> */}
                    <button type="button" className="lineBtn" onClick={togglePopupCancel}>
                      취소하기
                    </button>
                    <button type="button" className="lineBtn" onClick={() => handleEditConfirm()}>
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
            <button type="button" onClick={togglePopup}>
              <img src={images.IconRefresh} alt="" />
              재생성하기
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
      )}

      {isPopupOpen && (
        <Popup
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              togglePopup();
            }
          }}
        >
          <div>
            <button type="button" className="closePopup" onClick={togglePopup}>닫기</button>
            <span><img src={images.ExclamationMark} alt="" /></span>
            <p>해당 기능을 사용하시려면 로그인이 필요해요<br />로그인 하시겠습니까?</p>
            <div className="btnWrap">
              <button type="button">회원가입</button>
              <button type="button">로그인</button>
            </div>
          </div>
        </Popup>
      )}

      {isPopupOpenCancel && (
        <Popup Cancel
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              togglePopupCancel();
            }
          }}
        >
          <div>
            <button type="button" className="closePopup" onClick={togglePopupCancel}>닫기</button>
            <span><img src={images.ExclamationMark} alt="" /></span>
            <p>
              <strong>정말 취소하시겠습니까?</strong>
              <span>취소 시 수정하신 내용은 저장되지 않습니다</span>
            </p>
            <div className="btnWrap">
              <button type="button" onClick={togglePopupCancel}>아니오</button>
              <button type="button">네, 취소할게요</button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};



export default MoleculeReportController;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap:16px;
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
    padding:4px 8px;
    border-radius:5px;
    border: 0;
    background: none;
    transition:all .5s;

    &:hover {
      background:rgba(0,0,0,.03);
    }
  }

  .lineBtn {
    padding:8px 16px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};
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
    gap: 15px;
  }
`;

const Popup = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,.5);
  transition:all .5s;
  z-index:9999;

  .closePopup {
    position:absolute;
    right:24px;
    top:24px;
    width:16px;
    height:16px;
    font-size:0;
    padding:11px;
    border:0;
    background:none;

    &:before, &:after {
      position:absolute;
      top:50%;
      left:50%;
      width:2px;
      height:100%;
      border-radius:10px;
      background:${palette.black};
      content:'';
    }

    &:before {
      transform:translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform:translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    display:flex;
    flex-direction:column;
    width:100%;
    max-width:540px;
    text-align:center;
    // overflow:hidden;
    padding:60px 24px 24px;
    border-radius:10px;
    background:${palette.white};

    p {
      font-size:1.25rem;
      margin:30px auto 40px;
  }

  .btnWrap {
    display:flex;
    align-items:center;
    gap:16px;

    button {
      flex:1;
      font-size:1.25rem;
      font-weight:600;
      color:${palette.blue};
      padding:15px;
      border-radius:12px;
      border:1px solid ${palette.blue};
      background:${palette.white};

      &:last-child {
        color:${palette.white};
        background:${palette.blue};
      }
    }
  }

  
  ${props =>
    props.Cancel &&
    css`
      p {
        strong {
          font-weight:600;
          display:block;
        }
        span {
          font-size:1rem;
          display:block;
          margin-top:8px;
        }
      }

      .btnWrap {
        padding-top:25px;
        border-top:1px solid ${palette.lineGray};

        button {
          color:${palette.gray};
          font-weight:600;
          padding:0;
          border:0;
          background:none;

          &:last-child {
            color:${palette.blue};
            background:none;
          }
        }
      }
    `
  }

`;

