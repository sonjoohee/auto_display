// src/AI_List_Page/components/templates/TemplateAIPanelList.jsx
import React from "react";
import OrganismHeader from "../organisms/OrganismHeader";
import MoleculeTabMenu from "../molecules/MoleculeTabMenu";
import OrganismSearchSection from "../organisms/OrganismSearchSection";
import OrganismPanelListSection from "../organisms/OrganismPanelListSection";
import OrganismPagination from "../organisms/OrganismPagination.jsx페이지네이션";
import { ContentsWrap } from "../../../../assets/styles/Common";

const TemplateAIPanelList = () => (
  <>
    <OrganismHeader />
    <ContentsWrap>
      <MoleculeTabMenu />
      <OrganismSearchSection />
      <OrganismPanelListSection />
      <OrganismPagination /> {/* 페이지네이션 여기만 포함 */}
    </ContentsWrap>
  </>
);

export default TemplateAIPanelList;
