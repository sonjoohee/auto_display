//직압관리/프로젝트 리스트
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { Body2 } from "../../../../assets/styles/Typography";
import { useAtom } from "jotai";
import AtomPersonaLoader from "../../../Global/atoms/AtomPersonaLoader";

import {
  createPersonaOnServer,
  updatePersonaOnServer,
  getPersonaOnServer,
  getPersonaListOnServer,
  deletePersonaOnServer,
  InterviewXPersonaMacroSegmentRequest,
  InterviewXPersonaUniqueUserRequest,
  InterviewXPersonaKeyStakeholderRequest,
  InterviewXPersonaProfileRequest,
} from "../../../../utils/indexedDB";

import {
  PROJECT_PERSONA_LIST,
  IS_LOGGED_IN,
} from "../../../../pages/AtomStates";

const OrganismEmptyPersona = () => {
  const location = useLocation();
  const project = location.state?.project;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [projectPersonaList, setProjectPersonaList] =
    useAtom(PROJECT_PERSONA_LIST);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);

  const handleCreatePersona = async () => {
    setIsLoading(true);

    const data = {
      business_description:
        project.projectAnalysis.business_analysis +
        (project.projectAnalysis.file_analysis
          ? project.projectAnalysis.file_analysis
          : ""),
      target_customer: project.projectAnalysis.target_customer,
      business_model: project.businessModel,
      industry_type: project.industryType,
      target_country: project.targetCountry,
    };

    try {
      // Macro Segment 페르소나 생성
      let response1 = await InterviewXPersonaMacroSegmentRequest(
        data,
        isLoggedIn
      );

      const max_attempt1 = 10;
      let attempt1 = 0;

      while (
        !response1 ||
        !response1.response ||
        !response1.response.persona_macro_segment ||
        response1.response.persona_macro_segment.length === 0
      ) {
        response1 = await InterviewXPersonaMacroSegmentRequest(
          data,
          isLoggedIn
        );
        attempt1++;

        if (attempt1 >= max_attempt1) {
          throw new Error("Macro Segment 페르소나 생성에 실패했습니다.");
          // 에러 팝업 추가
        }
      }

      const personasWithType1 = response1.response.persona_macro_segment.map(
        (persona) => {
          // 스네이크 케이스를 카멜 케이스로 변환
          const camelCasePersona = {
            personaName: persona.persona_name,
            personaCharacteristics: persona.persona_characteristics,
            type: persona.type,
            age: persona.age,
            gender: persona.gender,
            job: persona.job,
            keywords: persona.keywords,
            personaType: "macro_segment",
            projectId: project._id,
            // 다른 필드가 있다면 여기에 추가
          };

          return camelCasePersona;
        }
      );

      // Unique User 페르소나 생성
      let response2 = await InterviewXPersonaUniqueUserRequest(
        data,
        isLoggedIn
      );

      const max_attempt2 = 10;
      let attempt2 = 0;

      while (
        !response2 ||
        !response2.response ||
        !response2.response.persona_unique_user ||
        response2.response.persona_unique_user.length === 0
      ) {
        response2 = await InterviewXPersonaUniqueUserRequest(data, isLoggedIn);
        attempt2++;

        if (attempt2 >= max_attempt2) {
          throw new Error("Unique User 페르소나 생성에 실패했습니다.");
          // 에러 팝업 추가
        }
      }

      const personasWithType2 = response2.response.persona_unique_user.map(
        (persona) => {
          // 스네이크 케이스를 카멜 케이스로 변환
          const camelCasePersona = {
            personaName: persona.persona_name,
            personaCharacteristics: persona.persona_characteristics,
            type: persona.type,
            age: persona.age,
            gender: persona.gender,
            job: persona.job,
            keywords: persona.keywords,
            personaType: "unique_user",
            projectId: project._id,
            // 다른 필드가 있다면 여기에 추가
          };

          return camelCasePersona;
        }
      );

      // Key Stakeholder 페르소나 생성
      let response3 = await InterviewXPersonaKeyStakeholderRequest(
        data,
        isLoggedIn
      );

      const max_attempt3 = 10;
      let attempt3 = 0;

      while (
        !response3 ||
        !response3.response ||
        !response3.response.persona_key_stakeholder ||
        response3.response.persona_key_stakeholder.length === 0
      ) {
        response3 = await InterviewXPersonaKeyStakeholderRequest(
          data,
          isLoggedIn
        );
        attempt3++;

        if (attempt3 >= max_attempt3) {
          throw new Error("Key Stakeholder 페르소나 생성에 실패했습니다.");
          // 에러 팝업 추가
        }
      }

      const personasWithType3 = response3.response.persona_key_stakeholder.map(
        (persona) => {
          // 스네이크 케이스를 카멜 케이스로 변환
          const camelCasePersona = {
            personaName: persona.persona_name,
            personaCharacteristics: persona.persona_characteristics,
            type: persona.type,
            age: persona.age,
            gender: persona.gender,
            job: persona.job,
            keywords: persona.keywords,
            personaType: "key_stakeholder",
            projectId: project._id,
            // 다른 필드가 있다면 여기에 추가
          };

          return camelCasePersona;
        }
      );

      // 모든 페르소나를 하나의 배열로 합치기
      const allPersonas = [
        ...personasWithType1,
        ...personasWithType2,
        ...personasWithType3,
      ];

      // 상태 업데이트
      setProjectPersonaList(allPersonas);

      // DB에 저장 - 상태 업데이트를 기다리지 않고 바로 allPersonas 배열 사용
      for (let i = 0; i < allPersonas.length; i++) {
        const persona = allPersonas[i];
        console.log(persona);
        await createPersonaOnServer(persona, isLoggedIn);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EmptyStateWrapper>
      {isLoading ? (
        <AtomPersonaLoader message="페르소나를 생성하고 있습니다." />
      ) : (
        <EmptyStateContent>
          <EmptyIcon>
            <img src={images.FileFill} alt="빈 프로젝트" />
          </EmptyIcon>
          <EmptyText>
            <Body2 color="gray500">아직 생성된 페르소나가 없습니다.</Body2>
            <Body2 color="gray500">지금 바로 AI 페르소나를 만들어보세요</Body2>
          </EmptyText>
          <Button Other Primary Round onClick={handleCreatePersona}>
            <Body2 color="primary">페르소나 생성</Body2>
          </Button>
        </EmptyStateContent>
      )}
    </EmptyStateWrapper>
  );
};

const EmptyStateWrapper = styled.div`
  width: 100%;
  height: 258px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${palette.white};
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const EmptyStateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 40px;
`;

const EmptyIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const EmptyText = styled.p`
  font-size: 1rem;
  color: ${palette.gray800};
  line-height: 1.5;
  margin: 0;
`;

const SubText = styled.span`
  display: block;
  font-size: 1rem;
  color: ${palette.gray500};
  margin-top: 4px;
`;

export default OrganismEmptyPersona;
