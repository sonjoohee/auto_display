import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { 
} from '../../../AtomStates';

import OrganismHeader from '../../../organisms/OrganismHeader';
import OrganismSideBar from '../organisms/OrganismSideBar';
import MoleculeBottomInputBar from '../molecules/MoleculeBottomInputBar';

const PageExpertInsight = () => {

  return (
    <>
        <OrganismHeader/>
        <OrganismSideBar/>

        <MoleculeBottomInputBar/>
    </>
  );
};

export default PageExpertInsight;

const Styled = styled.div`
`;