import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrganismHeader from '../../../../pages/AI_Panel/components/organisms/OrganismHeader';

import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { 
} from '../../../AtomStates';

const PageExpertInsight = () => {

  return (
    <>
        <OrganismHeader></OrganismHeader>
    </>
  );
};

export default PageExpertInsight;

const Styled = styled.div`
`;