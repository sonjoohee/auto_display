import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
} from '../../../AtomStates';

import OrganismHeader from '../../../organisms/OrganismHeader';
import OrganismSideBar from '../organisms/OrganismSideBar';
import OrganismTakingChargeAiExpert from '../organisms/OrganismTakingChargeAiExpert';
import OrganismBizAnalysisSection from '../organisms/OrganismBizAnalysisSection';
import MoleculeBottomInputBar from '../molecules/MoleculeBottomInputBar';

const PageExpertInsight = () => {

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);

  return (
    <>
        {/* <OrganismHeader/> */}
        <OrganismSideBar/>
    
        {selectedExpertIndex !== 0 ? <OrganismTakingChargeAiExpert/> : ''}

        <OrganismBizAnalysisSection/>

        <MoleculeBottomInputBar/>
    </>
  );
};

export default PageExpertInsight;

const Styled = styled.div`
`;