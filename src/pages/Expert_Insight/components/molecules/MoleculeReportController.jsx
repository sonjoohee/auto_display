import React, { useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  SAVED_REPORTS,
  IS_EDITING_NOW,
  IS_CLICK_EXPERT_SELECT,
} from '../../../AtomStates';

import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { InputField } from '../../../../assets/styles/Input';

const OrganismBizAnalysisSection = ({ reportIndex }) => {
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [savedReports, setSavedReports] = useAtom(SAVED_REPORTS);
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [isClickExpertSelect, setIsClickExpertSelect] = useAtom(IS_CLICK_EXPERT_SELECT);

  const [newAddContent, setNewAddContent] = useState('');
  const [isAddingNow, setIsAddingNow] = useState(false);
  const [newEditContent, setNewEditContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  

  const saveReport = () => {
    setSavedReports((prevReports) => [
      ...prevReports,
      {
        title: titleOfBusinessInfo,
        date: new Date().toLocaleDateString(),
        content: mainFeaturesOfBusinessInformation,
      },
    ]);
  };
  
  // reportIndex === 0 : 비즈니스 분석 리포트 (아이디어 설명 다시하기, 재생성하기, 수정하기, 복사하기, 저장하기)
    // isClickExpertSelect === true :  전문가를 선택했을 때 비즈니스 분석 리포트 (복사하시, 저장하기)
    // isEditingNow === true : 수정중인 비즈니스 분석 리포트 (취소하기, 수정완료하기)

  // reportIndex === 1 : 전문가 리포트 (재생성하기, 복사하기, 저장하기)
  return (
    <>
    {reportIndex === 0 ?
      <>
      {isClickExpertSelect ? 
      <>
        <ButtonWrap>
          <div/>
          <div>
            <button type="button"><img src={images.IconCopy} alt="" />복사하기</button>
            <button type="button "onClick={() => saveReport()}><img src={images.IconSave} alt="" />저장하기</button>
          </div>
        </ButtonWrap>
      </>
      : 
      <>
        {!isEditingNow ? 
          <ButtonWrap>
              <button type="button"><img src={images.IconWrite2} alt="" />비즈니스 설명 다시 하기</button>
              <div>
                  <button type="button"><img src={images.IconRefresh} alt="" />재생성하기</button>
                  <button type="button" onClick={() => setIsEditingNow(true)}><img src={images.IconEdit} alt="" />수정하기</button>
                  <button type="button"><img src={images.IconCopy} alt="" />복사하기</button>
                  <button type="button "onClick={() => saveReport()}><img src={images.IconSave} alt="" />저장하기</button>
              </div>
          </ButtonWrap>
        : 
          <ButtonWrap>
              <div/>
              <div>
                  <button type="button" onClick={() => setIsEditingNow(false)}>취소하기</button>
                  <button type="button" onClick={() => setIsEditingNow(false)}>수정 완료하기</button>
              </div>
          </ButtonWrap>
        }
      </>
      }

      </>
    :
    <ButtonWrap>
      <div/>
      <div>
        <button type="button"><img src={images.IconRefresh} alt="" />재생성하기</button>
        <button type="button"><img src={images.IconCopy} alt="" />복사하기</button>
        <button type="button "onClick={() => saveReport()}><img src={images.IconSave} alt="" />저장하기</button>
      </div>
    </ButtonWrap>

    }
    </>
  );
};

export default OrganismBizAnalysisSection;

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