import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO, 
} from '../../../AtomStates';

const OrganismTakingChargeAiExpert = () => {

  const [selectedExpertIndex, setSelectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);

  return (
    <>

    </>
  );
};

export default OrganismTakingChargeAiExpert;

const Styled = styled.div`
`;