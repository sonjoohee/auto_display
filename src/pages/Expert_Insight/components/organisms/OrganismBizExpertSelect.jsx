import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { useAtom } from 'jotai';
import {
  IS_CLICK_EXPERT_SELECT,
  SELECTED_EXPERT_INDEX,
  APPROACH_PATH,
  CONVERSATION_STAGE,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  ADDITIONAL_QUESTION_1,
  ADDITIONAL_QUESTION_2,
  ADDITIONAL_QUESTION_3,
  SELECTED_ADDITIONAL_KEYWORD1,
  SELECTED_ADDITIONAL_KEYWORD2,
  SELECTED_ADDITIONAL_KEYWORD3,
  EXPERT_BUTTON_STATE,
} from '../../../AtomStates';

const OrganismBizExpertSelect = ({ conversationId }) => {
  const [isClickExpertSelect, setIsClickExpertSelect] = useAtom(IS_CLICK_EXPERT_SELECT);
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);

  const [expert1ReportData, setExpert1ReportData] = useAtom(EXPERT1_REPORT_DATA);
  const [expert2ReportData, setExpert2ReportData] = useAtom(EXPERT2_REPORT_DATA);
  const [expert3ReportData, setExpert3ReportData] = useAtom(EXPERT3_REPORT_DATA);

  const [addtionalQuestion1, setAddtionalQuestion1] = useAtom(ADDITIONAL_QUESTION_1);
  const [addtionalQuestion2, setAddtionalQuestion2] = useAtom(ADDITIONAL_QUESTION_2);
  const [addtionalQuestion3, setAddtionalQuestion3] = useAtom(ADDITIONAL_QUESTION_3);

  const [selectedAdditionalKeyword1, setSelectedAdditionalKeyword1] = useAtom(SELECTED_ADDITIONAL_KEYWORD1);
  const [selectedAdditionalKeyword2, setSelectedAdditionalKeyword2] = useAtom(SELECTED_ADDITIONAL_KEYWORD2);
  const [selectedAdditionalKeyword3, setSelectedAdditionalKeyword3] = useAtom(SELECTED_ADDITIONAL_KEYWORD3);

  const [expertButtonState, setExpertButtonState] = useAtom(EXPERT_BUTTON_STATE); // 추가된 부분

  const handledExpertSelect = (index) => {
    setSelectedExpertIndex(index);
    setIsClickExpertSelect(true);
    setConversationStage(2); // stage를 2로 설정
    setAddtionalQuestion1("");
    setAddtionalQuestion2("");
    setAddtionalQuestion3("");
    setExpertButtonState(1);
    
    if(index === 1) {
      setSelectedAdditionalKeyword1("");
    }
    else if(index === 2) {
      setSelectedAdditionalKeyword2("");
    }
    else if(index === 3) {
      setSelectedAdditionalKeyword3("");
    }
  }

  return (
    <BizExpertSelectContainer>
      <h1>홈케어 뷰티 디바이스와 기능성화장품에 대해 전문가에게 직접 확인해보세요</h1>
      <SelectOptions>
        { Object.keys(expert1ReportData).length === 0 &&
          <div>
            <img src={images.ImgChat} alt="" />
            <p>10년차 전략 디렉터와 1:1 커피챗하기</p>
            <button type="button" onClick={() => handledExpertSelect(1)}>시작하기</button>
          </div>
        }
        { Object.keys(expert2ReportData).length === 0 &&     
          <div>
            <img src={images.ImgWrite} alt="" />
            <p>브랜드 전문가의 10초 맞춤 제안서 받기</p>
            <button type="button" onClick={() => handledExpertSelect(2)}>시작하기</button>
          </div>
        }
        { Object.keys(expert3ReportData).length === 0 &&     
          <div>
            <img src={images.ImgTarget} alt="" />
            <p>지금 바로 만나 타겟 고객 확인하기</p>
            <button type="button" onClick={()=> handledExpertSelect(3)}>시작하기</button>
        </div>
        }                
      </SelectOptions>
    </BizExpertSelectContainer>
  );
};

export default OrganismBizExpertSelect;

const BizExpertSelectContainer = styled.div`
  text-align:left;
  margin: 48px auto 0;
  padding-top: 30px;
  padding-bottom:40px;
  border-top:1px solid ${palette.lineGray};

  h1 {
    font-size:0.875rem;
    font-weight:500;
    color:${palette.gray};
    margin-bottom:20px;
  }
`;

const SelectOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > div {
    display: flex;
    align-items:center;
    gap:12px;
    padding:14px 20px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};

    p {
      color:${palette.gray};
    }

    button {
      position:relative;
      font-family: 'Pretendard';
      font-size:0.75rem;
      color:${palette.gray};
      // width:22px;
      // height:22px;
      margin-left:auto;
      padding:8px 16px;
      border-radius:10px;
      border:1px solid ${palette.lineGray};
      background:${palette.white};

      &:before {
        position:absolute;
        left:30%;
        top:50%;
        transform:translateY(-50%) rotate(45deg);
        width:7px;
        height:7px;
        border-top:1px solid ${palette.gray};
        border-right:1px solid ${palette.gray};
        // content:'';
      }
    }
  }
`;
