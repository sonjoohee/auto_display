import React, { useEffect } from "react";
import styled from "styled-components";
import { Body1, Sub2 } from "../../../../assets/styles/Typography";
import { Button } from "../../../../assets/styles/ButtonStyle";
import { Badge } from "../../../../assets/styles/BusinessAnalysisStyle";
import { palette } from "../../../../assets/styles/Palette";
import personaImages from "../../../../assets/styles/PersonaImages";
import { useAtom } from "jotai";
import { PERSONA_LIST } from "../../../AtomStates";

const MoleculePersonaSelectCard = ({
  interviewType,
  personaList,
  selectedPersonas,
  onPersonaSelect,
}) => {
  const [personaListState, setPersonaListState] = useAtom(PERSONA_LIST);

  // 컴포넌트 마운트 시 초기 unselected 리스트 설정
  useEffect(() => {
    if (personaList && personaList.length > 0) {
      setPersonaListState({
        selected: [],
        unselected: personaList,
      });
    }
  }, [personaList]);

  const handlePersonaSelect = (personaId) => {
    const targetPersona = [
      ...personaListState.selected,
      ...personaListState.unselected,
    ].find((p) => p.persona_id === personaId);

    if (interviewType === "single") {
      if (selectedPersonas === personaId) {
        // 선택 해제
        setPersonaListState({
          selected: [],
          unselected: [...personaListState.unselected, targetPersona],
        });
        onPersonaSelect(null);
      } else {
        // 새로운 선택
        const newUnselected = personaListState.unselected.filter(
          (p) => p.persona_id !== personaId
        );
        if (personaListState.selected.length > 0) {
          // 기존 선택된 항목이 있으면 unselected로 이동
          newUnselected.push(personaListState.selected[0]);
        }
        setPersonaListState({
          selected: [targetPersona],
          unselected: newUnselected,
        });
        onPersonaSelect(personaId);
      }
    } else {
      // multiple 선택 모드
      const currentSelected = Array.isArray(selectedPersonas)
        ? selectedPersonas
        : [];

      if (currentSelected.includes(personaId)) {
        // 선택 해제
        const removedPersona = personaListState.selected.find(
          (p) => p.persona_id === personaId
        );
        setPersonaListState({
          selected: personaListState.selected.filter(
            (p) => p.persona_id !== personaId
          ),
          unselected: [...personaListState.unselected, removedPersona],
        });
        onPersonaSelect(currentSelected.filter((id) => id !== personaId));
      } else if (currentSelected.length < 5) {
        // 새로운 선택 (최대 5개)
        setPersonaListState({
          selected: [...personaListState.selected, targetPersona],
          unselected: personaListState.unselected.filter(
            (p) => p.persona_id !== personaId
          ),
        });
        onPersonaSelect([...currentSelected, personaId]);
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

  // selected와 unselected 리스트를 순서대로 렌더링
  return (
    <CardGroupWrap>
      {/* 선택된 페르소나 렌더링 */}
      {personaListState.selected.map((persona) => (
        <ListBoxItem
          key={persona.persona_id}
          selected={true}
          anySelected={true}
        >
          {/* 카드 내용 렌더링 */}
          <Persona color="Linen" size="Large" Round>
            <img src={personaImages.PersonaWomen01} alt="페르소나" />
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
            <Button
              Medium
              PrimaryLightest={true}
              Fill={true}
              onClick={() => handlePersonaSelect(persona.persona_id)}
            >
              <Sub2 color="gray500">Selected</Sub2>
            </Button>
          </ListButton>
        </ListBoxItem>
      ))}

      {/* 선택되지 않은 페르소나 렌더링 */}
      {personaListState.unselected.map((persona) => (
        <ListBoxItem
          key={persona.persona_id}
          selected={false}
          anySelected={personaListState.selected.length > 0}
        >
          {/* 카드 내용 렌더링 */}
          <Persona color="Linen" size="Large" Round>
            <img src={personaImages.PersonaWomen01} alt="페르소나" />
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
            <Button
              Medium
              PrimaryLightest={false}
              Fill={false}
              onClick={() => handlePersonaSelect(persona.persona_id)}
            >
              <Sub2 color="gray500">Add</Sub2>
            </Button>
          </ListButton>
        </ListBoxItem>
      ))}
    </CardGroupWrap>
  );
};

export default MoleculePersonaSelectCard;

const CardGroupWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ListBoxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  background: ${(props) => props.theme.white};
  border: 1px solid
    ${(props) => (props.selected ? palette.primary : palette.outlineGray)};
  opacity: ${(props) => (props.anySelected && !props.selected ? 0.5 : 1)};
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
  gap: 8px;

  span {
    color: ${palette.gray500};
    font-size: 14px;
  }
`;

const ListButton = styled.div``;
