import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { } from '../../../AtomStates';

import OrganismHeader from '../../../organisms/OrganismHeader';
import OrganismSideBar from '../organisms/OrganismSideBar';
import MoleculeBottomInputBar from '../molecules/MoleculeBottomInputBar';

const PageExpertInsight = () => {

  return (
    <>
      <OrganismHeader/>

      <ContentsWrap>
        <OrganismSideBar/>

        <MoleculeBottomInputBar/>
      </ContentsWrap>
    </>
  );
};

export default PageExpertInsight;

const ContentsWrap = styled.div`
  position:relative;
  width:calc(100% - 45px);
  margin:150px auto 0;
`;