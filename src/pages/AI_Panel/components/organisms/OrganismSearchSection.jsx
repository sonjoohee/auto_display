// src/AI_List_Page/components/organisms/OrganismSearchSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import images from "../../../../assets/styles/Images"; 
import MoleculeSearchForm from "../molecules/MoleculeSearchForm";
import { useAtom } from "jotai";
import { 
  currentUserAtom, 
  TOTAL_PANEL_COUNT,
} from "../../../AtomStates";  // currentUserAtom import

const OrganismSearchSection = () => {
  const [currentUser] = useAtom(currentUserAtom);
  const [totalPanelCount, setTotalPanelCount] = useAtom(TOTAL_PANEL_COUNT);

  // 전체 AI 패널 수
  useEffect(() => {
    const fetchPanelCount = async () => {
      console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/hello`);
        setTotalPanelCount(response.data.value);
      } catch (error) {
        console.error("Error fetching panel count:", error);
      }
    };

    fetchPanelCount();
  }, [setTotalPanelCount]);

  return (
    <StyledSearchSection>
      <h2>
        {totalPanelCount}명의 AI 패널 대기 중
        <p>{currentUser ? `${currentUser.name} 님의 비즈니스를 함께 할 패널을 찾아보세요` : "당신의 비즈니스를 함께 할 패널을 찾아보세요"}</p>
      </h2>
      <MoleculeSearchForm />
    </StyledSearchSection>
  );
};

export default OrganismSearchSection;

const StyledSearchSection = styled.section`
  text-align: left;
  padding: 60px;
  margin-bottom: 80px;
  border-radius: 15px;
  background: url(${images.BgSearch}) center no-repeat;
  background-size: cover;
  h2 {
    font-size: 3rem;
    color: white;
    margin-bottom: 60px;
    p {
      font-size: 1rem;
      font-weight: normal;
    }
  }
`;
