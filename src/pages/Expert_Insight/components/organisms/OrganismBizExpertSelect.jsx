import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { useAtom } from "jotai";
import {
  IS_CLICK_EXPERT_SELECT,
  SELECTED_EXPERT_INDEX,
  APPROACH_PATH,
  CONVERSATION_STAGE,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  EXPERT_BUTTON_STATE,
  IS_LOADING,
  SELECTED_EXPERT_LIST,
  iS_CLICK_CHECK_REPORT_RIGHTAWAY,
  STRATEGY_REPORT_DATA,
} from "../../../AtomStates";

const OrganismBizExpertSelect = ({ conversationId }) => {
  const [isClickExpertSelect, setIsClickExpertSelect] = useAtom(
    IS_CLICK_EXPERT_SELECT
  );
  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(
    SELECTED_EXPERT_INDEX
  );
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);

  const [strategyReportData, setStrategyReportData] =
  useAtom(STRATEGY_REPORT_DATA);

  // const [expert1ReportData, setExpert1ReportData] =
  //   useAtom(EXPERT1_REPORT_DATA);
  // const [expert2ReportData, setExpert2ReportData] =
  //   useAtom(EXPERT2_REPORT_DATA);
  // const [expert3ReportData, setExpert3ReportData] =
  //   useAtom(EXPERT3_REPORT_DATA);

  const [expertButtonState, setExpertButtonState] =
    useAtom(EXPERT_BUTTON_STATE); // 추가된 부분

  const [isLoading, setIsLoading] = useAtom(IS_LOADING);

  const [selectedExpertList, setSelectedExpertList] = useAtom(SELECTED_EXPERT_LIST);

  const [isClickCheckReportRightAway, setIsClickCheckReportRightAway] = useAtom(
    iS_CLICK_CHECK_REPORT_RIGHTAWAY
  );

  const handledExpertSelect = (index) => {
    if (!isLoading) {
      setIsClickCheckReportRightAway(false);
      setSelectedExpertIndex(index);
      setIsClickExpertSelect(true);
      setConversationStage(2); // stage를 2로 설정
      setExpertButtonState(1);
      setApproachPath(3);
    }
  };

  return (
    <>
      {/* 모든 전문가가 선택되었거나, 모든 보고서가 생성되었으면 영역 표시 안함
          selectedExpertList는 DB에 저장되고 있지 않기 떄문에 expertReportData 조건이 필요함 */}
      {((selectedExpertList.includes("1") || strategyReportData.hasOwnProperty(1)) &&
        (selectedExpertList.includes("2") || strategyReportData.hasOwnProperty(2)) &&
        (selectedExpertList.includes("3") || strategyReportData.hasOwnProperty(3))) ? null : (
  
        <BizExpertSelectContainer>
          <h1>아래 분야별 전문가와 대화를 통해 아이디어를 발전시켜보세요.</h1>
          <SelectOptions>
            {(selectedExpertList.includes("1") || strategyReportData.hasOwnProperty(1)) ? null : (
              <div>
                <img src={images.ImgChat} alt="" />
                <p>10년차 전략 디렉터와 1:1 커피챗하기</p>
                <button type="button" onClick={() => handledExpertSelect("1")}>
                  시작하기
                </button>
              </div>
            )}
            {(selectedExpertList.includes("2") || strategyReportData.hasOwnProperty(2)) ? null : (
              <div>
                <img src={images.ImgWrite} alt="" />
                <p>브랜드 전문가의 10초 맞춤 제안서 받기</p>
                <button type="button" onClick={() => handledExpertSelect("2")}>
                  시작하기
                </button>
              </div>
            )}
            {(selectedExpertList.includes("3") || strategyReportData.hasOwnProperty(3)) ? null : (
              <div>
                <img src={images.ImgTarget} alt="" />
                <p>지금 바로 만나 타겟 고객 확인하기</p>
                <button type="button" onClick={() => handledExpertSelect("3")}>
                  시작하기
                </button>
              </div>
            )}
            {/* 4번 전문가 */}
            {/* {(selectedExpertList.includes("4") || strategyReportData.hasOwnProperty(4)) ? null : (
              <div>
                <img src={images.ImgTarget} alt="" />
                <p>PoC 설계 전문가와 1:1 커피챗하기</p>
                <button type="button" onClick={() => handledExpertSelect("4")}>
                  시작하기
                </button>
              </div>
            )} */}
          </SelectOptions>
        </BizExpertSelectContainer>
      )}
    </>
  );  
};

export default OrganismBizExpertSelect;

const BizExpertSelectContainer = styled.div`
  text-align: left;
  margin: 48px auto 0;
  padding-top: 30px;
  padding-bottom: 40px;
  border-top: 1px solid ${palette.lineGray};

  h1 {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${palette.gray};
    margin-bottom: 20px;
  }
`;

const SelectOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > div {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    border-radius: 10px;
    border: 1px solid ${palette.lineGray};

    p {
      color: ${palette.gray};
    }

    button {
      position: relative;
      font-family: "Pretendard";
      font-size: 0.75rem;
      color: ${palette.gray};
      // width:22px;
      // height:22px;
      margin-left: auto;
      padding: 8px 16px;
      border-radius: 10px;
      border: 1px solid ${palette.lineGray};
      background: ${palette.white};

      &:before {
        position: absolute;
        left: 30%;
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
        width: 7px;
        height: 7px;
        border-top: 1px solid ${palette.gray};
        border-right: 1px solid ${palette.gray};
        // content:'';
      }
    }
  }
`;
