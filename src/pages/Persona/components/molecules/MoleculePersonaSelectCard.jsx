import React, { useEffect } from "react";
import styled from "styled-components";
import { Body1, Sub2 } from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { Badge } from "../../../../assets/styles/BusinessAnalysisStyle";
import { palette } from "../../../../assets/styles/Palette";
import personaImages from "../../../../assets/styles/PersonaImages";
import { useAtom } from "jotai";
import { PERSONA_LIST, FILTERED_PROJECT_LIST } from "../../../AtomStates";

const MoleculePersonaSelectCard = ({
  interviewType,
  personaList,
  selectedPersonas,
  onPersonaSelect,
}) => {
  const [personaListState, setPersonaListState] = useAtom(PERSONA_LIST);
  const [filteredProjectList, setFilteredProjectList] = useAtom(
    FILTERED_PROJECT_LIST
  );
  // 컴포넌트 마운트 시 초기 unselected 리스트 설정
  useEffect(() => {
    if (personaList && personaList.length > 0) {
      setPersonaListState({
        selected: [],
        unselected: personaList,
      });
    }
  }, [personaList]);

  const handlePersonaSelect = (persona) => {
    const targetPersona = [
      ...personaListState.selected,
      ...personaListState.unselected,
    ].find((p) => p.persona_id === persona.persona_id);

    if (interviewType === "single") {
      if (personaListState?.selected?.[0]?.persona_id === persona.persona_id) {
        // 선택 해제
        setPersonaListState({
          selected: [],
          unselected: [...personaListState.unselected, targetPersona],
        });
        onPersonaSelect(null);
      } else {
        // 새로운 선택
        const newUnselected = personaListState.unselected.filter(
          (p) => p.persona_id !== persona.persona_id
        );
        if (personaListState.selected.length > 0) {
          // 기존 선택된 항목이 있으면 unselected로 이동
          newUnselected.push(personaListState.selected[0]);
        }
        setPersonaListState({
          selected: [targetPersona],
          unselected: newUnselected,
        });
        onPersonaSelect(persona);
      }
    } else {
      // multiple 선택 모드
      const currentSelected = Array.isArray(selectedPersonas)
        ? selectedPersonas
        : [];

      if (currentSelected.some((p) => p.persona_id === persona.persona_id)) {
        // 이미 선택된 페르소나인 경우 선택 해제
        const removedPersona = personaListState.selected.find(
          (p) => p.persona_id === persona.persona_id
        );
        setPersonaListState({
          selected: personaListState.selected.filter(
            (p) => p.persona_id !== persona.persona_id
          ),
          unselected: [...personaListState.unselected, removedPersona],
        });
        onPersonaSelect(
          currentSelected.filter((p) => p.persona_id !== persona.persona_id)
        );
      } else if (currentSelected.length < 5) {
        // 새로운 선택 (최대 5개)
        setPersonaListState({
          selected: [...personaListState.selected, targetPersona],
          unselected: personaListState.unselected.filter(
            (p) => p.persona_id !== persona.persona_id
          ),
        });
        onPersonaSelect([...currentSelected, persona]);
      }
    }
  };

  const isSelected = (personaId) => {
    if (interviewType === "single") {
      return selectedPersonas === personaId;
    }
    return (
      Array.isArray(selectedPersonas) && selectedPersonas.includes(personaId)
    );
  };

  return (
    <CardGroupWrap>
      {personaList &&
        personaList.map((persona) => {
          // 현재 persona가 선택된 상태인지 확인 (personaListState.selected 에서 조회)
          const isSelected = personaListState.selected.some(
            (p) => p.persona_id === persona.persona_id
          );

          return (
            <ListBoxItem
              key={persona.persona_id}
              selected={isSelected}
              anySelected={personaListState.selected.length > 0}
              interviewType={interviewType}
            >
              {/* 카드 내용 렌더링 */}
              <Persona color="Linen" size="Large" Round>
                <img
                  src={`/ai_person/${persona.personaImg}.png`}
                  alt={persona.persona}
                />
              </Persona>
              <ListText>
                <ListTitle>
                  <Body1 color="gray800">{persona.persona_view}</Body1>
                  {/* {persona.isNew && <Badge New>비즈니스</Badge>} */}
                </ListTitle>
                <ListSubtitle>
                  <PersonaInfo>
                    <span>{persona.gender}</span>
                    <span>
                      {persona.age.includes("세")
                        ? persona.age
                        : `${persona.age}세`}
                    </span>
                    <span>{persona.job}</span>
                  </PersonaInfo>
                </ListSubtitle>
              </ListText>
              <ListButton>
                {isSelected ? (
                  <Button
                    Medium
                    PrimaryLightest={true}
                    Fill={true}
                    onClick={() => handlePersonaSelect(persona)}
                  >
                    <Sub2 color="primary">Selected</Sub2>
                  </Button>
                ) : (
                  <Button
                    Medium
                    PrimaryLightest={false}
                    Fill={false}
                    onClick={() => handlePersonaSelect(persona)}
                  >
                    <Sub2 color="gray500">Add</Sub2>
                  </Button>
                )}
              </ListButton>
            </ListBoxItem>
          );
        })}
    </CardGroupWrap>
  );
};

export default MoleculePersonaSelectCard;

const CardGroupWrap = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 8px;
  width: 100%;
`;

const ListBoxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  background: ${(props) =>
    props.selected && props.interviewType === "single"
      ? palette.primaryLightest
      : props.theme.white};
  opacity: ${(props) =>
    props.interviewType === "single" && props.anySelected && !props.selected
      ? 0.5
      : 1};

  // hover 효과 추가
  transition: background-color 0.2s ease;

  ${(props) =>
    ((props.interviewType === "single" && !props.selected) ||
      props.interviewType === "multiple") &&
    `
    &:hover {
      border-radius: 10px;
      background-color: ${palette.chatGray};
      cursor: pointer;

      ${Button} {
        color: ${palette.gray500};
        border-color: ${palette.chatGray};
        background-color: #ECEFF3;
      }

      ${Sub2} {
        color: ${palette.gray500};
      }
    }
  `}

  ${(props) =>
    props.selected &&
    props.interviewType === "multiple" &&
    `
    &:hover {
      ${Button} {
        background: ${palette.primaryLightest};
      }

      ${Sub2} {
        color: ${palette.primary};
      }
    }
  `}

  ${(props) =>
    props.selected &&
    props.interviewType === "single" &&
    `
      ${Button} {
        color: ${palette.primary};
        border: 1px solid ${palette.primary};
      }

      ${Sub2} {
        color: ${palette.primary};
      }

      &:hover {
        background-color: ${palette.primaryLightest};
      }
    `}

  + div {
    border-top: 1px solid ${palette.outlineGray};
    border-radius: 0;
  }
`;

const Persona = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ListText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ListSubtitle = styled.div``;

const PersonaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${palette.gray500};
    font-size: 14px;

    + span:before {
      width: 1px;
      height: 10px;
      display: block;
      background: ${palette.gray500};
      content: "";
    }
  }
`;

const ListButton = styled.div``;
