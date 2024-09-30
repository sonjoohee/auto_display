import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import MoleculePanelItemCard from "../../../AI_Panel/components/molecules/MoleculePanelItemCard";
// import MoleculePanelItemList from "../../../AI_Panel/components/molecules/MoleculePanelItemList";
import MoleculePanelItemCard from "../molecules/MoleculePanelItemCard";
// import MoleculePanelItemList from "../molecules/MoleculePanelItemList";
import { palette } from "../../../../assets/styles/Palette";
import axios from "axios";
import { useAtom } from "jotai";
import {
  iS_CLICK_CHECK_POC_RIGHTAWAY,
  EXPERT_BUTTON_STATE,
  IS_LOADING,
  APPROACH_PATH,
  CONVERSATION,
  CONVERSATION_ID,
  SELECTED_EXPERT_INDEX,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  ADDITION_BUTTON_STATE,
  isLoggedInAtom,
  STRATEGY_REPORT_DATA,
  INPUT_BUSINESS_INFO,
  CONVERSATION_STAGE,
  SELECTED_ADDITIONAL_KEYWORD,
  SELECTED_CUSTOMER_ADDITIONAL_KEYWORD,
  ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITIONAL_REPORT_DATA,
  CUSTOMER_ADDITION_BUTTON_STATE,
  CUSTOMER_ADDITION_QUESTION_INPUT,
  SELECTED_EXPERT_LIST,
  SELECTED_POC_OPTIONS,
} from "../../../AtomStates";

import { saveConversationToIndexedDB } from "../../../../utils/indexedDB";

const OrganismPanelSection = ({ conversationId }) => {
  const [selectedPocOptions, setSelectedPocOptions] = useAtom(SELECTED_POC_OPTIONS);
  const [panelList, setPanelList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelNull, setIsPanelNull] = useState(false);
  const [viewPanelType, setViewPanelType] = useState(true); // true for card view, false for list view
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation,] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [buttonState, setButtonState] = useAtom(EXPERT_BUTTON_STATE);
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [strategyReportData] = useAtom(STRATEGY_REPORT_DATA);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [selectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [selectedCustomerAdditionalKeyword] = useAtom(
    SELECTED_CUSTOMER_ADDITIONAL_KEYWORD
  );
  const [additionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);
  const [customerAdditionalReportData] = useAtom(CUSTOMER_ADDITIONAL_REPORT_DATA);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [approachPath, setApproachPath] = useAtom(APPROACH_PATH);
  const [isClickCheckPocRightAway, setIsClickCheckPocRightAway] = useAtom(iS_CLICK_CHECK_POC_RIGHTAWAY);

  const handleButtonClick = async () => {
    // Update the conversation
    const updatedConversation = [...conversation];
    updatedConversation.push(
      {
        type: "system",
        message: "선택한 타겟 유저를 바탕으로 PoC 보고서를 작성하겠습니다.",
        expertIndex: selectedExpertIndex,
      },
      {
        type: `poc_${selectedExpertIndex}`,
      }
    );
    setConversation(updatedConversation);
    setConversationStage(3)
    setApproachPath(3);

    await saveConversationToIndexedDB(
      {
        id: conversationId,
        inputBusinessInfo: inputBusinessInfo,
        analysisReportData: analysisReportData,
        strategyReportData: strategyReportData,
        conversation: updatedConversation,
        conversationStage: 3,
        selectedAdditionalKeywords: selectedAdditionalKeyword,
        selectedCustomerAdditionalKeyword: selectedCustomerAdditionalKeyword,
        additionalReportData: additionalReportData,
        customerAdditionalReportData: customerAdditionalReportData,
        timestamp: Date.now(),
        expert_index: selectedExpertIndex,
        selectedPocOptions: selectedPocOptions,
      },
      isLoggedIn,
      conversationId
    );
    setButtonState(1); 
  };

  useEffect(() => {
    const fetchInitialPanelList = async () => {
      setIsPanelNull(true);
      setIsLoading(true);
      try {
        const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/panels/list?page=1&size=20&searchBehabioralType=&searchUtilizationTime=&searchGender=&searchAge=&searchTag=&searchMarriage=&searchChildM=&searchChildF=`
          );
        setPanelList(response.data.results);
        console.log("Fetched panel list:", response.data.results);
      } catch (error) {
        console.error("Error fetching panel list:", error);
      } finally {
        setIsPanelNull(false);
        setIsLoading(false);
      }
    };

    fetchInitialPanelList();
  }, []);

  if (!Array.isArray(panelList) || panelList.length === 0) {
    if (isPanelNull) return <NoData>패널 데이터를 불러오고 있습니다.</NoData>;
    else return <NoData>패널 데이터가 없습니다.</NoData>;
  }

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <div className="loader"></div>
        </LoadingOverlay>
      )}
      <PanelWrap>
          <CardViewContainer>
            {panelList.map((panel, index) => (
              <MoleculePanelItemCard
                key={panel.id}
                id={panel.id}
                gender={panel.gender}
                age={panel.age}
                job={panel.job}
                address={panel.address}
                subAddress={panel.subAddress}
                imgSrc={(index % 10) + 1} // Images from 1 to 10
                tags={panel.tag}
                comment={panel.comment}
                lifeStyle={panel.lifeStyle}
                consumption={panel.consumptionPropensity}
                productGroup={panel.productGroup}
                target_1={panel.target_1}
                target_2={panel.target_2}
                target_3={panel.target_3}
                target_4={panel.target_4}
                target_5={panel.target_5}
                value_1={panel.value_1}
                value_2={panel.value_2}
                value_3={panel.value_3}
                value_4={panel.value_4}
                value_5={panel.value_5}
              />
            ))}
          </CardViewContainer>
          <button onClick={handleButtonClick}>확인</button>
      </PanelWrap>
    </>
  );
};

export default OrganismPanelSection;

const NoData = styled.p`
  min-height: 700px;
  text-align: center;
  padding-top: 50px;
`;

const PanelWrap = styled.section`
  .sortBooth {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }
`;

const CardViewContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;
`;

const ListViewContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .loader {
    border: 12px solid #f3f3f3; /* Light grey */
    border-top: 12px solid ${palette.blue}; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
