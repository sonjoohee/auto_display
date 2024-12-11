import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import {
  IS_PERSONA_ACCESSIBLE,
  PERSONA_BUTTON_STATE_1,
  PERSONA_BUTTON_STATE_2,
  IS_LOGGED_IN,
  PROJECT_ID,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  PERSONA_STEP,
  BUSINESS_ANALYSIS,
} from "../../../AtomStates";
import { 
  ContentsWrap, 
  MainContent, 
  AnalysisWrap, 
  MainSection, 
  CardWrap,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import images from "../../../../assets/styles/Images";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import OrganismIncNavigation from "../organisms/OrganismIncNavigation";
import MoleculeHeader from "../molecules/MoleculeHeader";
import MoleculeStepIndicator from "../molecules/MoleculeStepIndicator";
import { useDynamicViewport } from "../../../../assets/DynamicViewport";
import { createProjectOnServer } from "../../../../utils/indexedDB";
import OrganismBusinessAnalysis from "../organisms/OrganismBisinessAnalysis";

const PagePersona = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const [projectId, setprojectId] = useAtom(PROJECT_ID);
  const [isPersonaAccessible, setIsPersonaAccessible] = useAtom(
    IS_PERSONA_ACCESSIBLE
  );
  const [personaButtonState1, setPersonaButtonState1] = useAtom(
    PERSONA_BUTTON_STATE_1
  );
  const [personaButtonState2, setPersonaButtonState2] = useAtom(
    PERSONA_BUTTON_STATE_2
  );
  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [personaStep, setPersonaStep] = useAtom(PERSONA_STEP);
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);

  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [steps, setSteps] = useState([
    { number: 1, label: "비즈니스 분석", active: true },
    { number: 2, label: "맞춤 페르소나 추천", active: false },
    { number: 3, label: "인터뷰 방법 선택", active: false },
    { number: 4, label: "페르소나와 인터뷰", active: false },
    { number: 5, label: "의견 분석", active: false },
  ]);

  let newProjectId;

  useDynamicViewport("width=1280"); // 특정페이지에서만 pc화면처럼 보이기

  useEffect(() => {
    // 접근 가능 여부를 확인하여 차단 로직 수행
    if (!isPersonaAccessible) {
      navigate("/Main"); // 접근이 허용되지 않으면 메인 페이지로 리다이렉트
    }

    // 페이지를 나갈 때 접근 가능 여부 초기화
    return () => {
      setIsPersonaAccessible(false); // 페이지 떠날 때 접근 불가로 설정
    };
  }, [navigate]);

  useEffect(() => {
    const loadProject = async () => {
      // 1. 로그인 여부 확인
      if (isLoggedIn) {
        // 2. 로그인 상태라면 서버에서 새로운 대화 ID를 생성하거나, 저장된 대화를 불러옴
        if (!projectId && isPersonaAccessible) {
          try {
            // 서버에서 새로운 대화 ID 생성
            // console.log("서버에서 새로운 대화 ID 생성");
            newProjectId = await createProjectOnServer(isLoggedIn);
            setprojectId(newProjectId); // 생성된 대화 ID 설정
            setIsPersonaAccessible(true);
            // setIsLoadingPage(false); // 로딩 완료
            // 새로운 대화 ID로 경로 변경
            navigate(`/Persona/${newProjectId}`, { replace: true });
          } catch (error) {
            // setIsLoadingPage(false); // 로딩 완료
            setIsPersonaAccessible(true);
            console.error("Failed to create project on server:", error);
            navigate(`/Persona/${projectId}`, { replace: true });
          }
        } else {
          // 3. 대화 ID가 이미 존재하면 IndexedDB에서 대화 불러오기
          // const savedProject = await getProjectByIdFromIndexedDB(
          //   projectId,
          //   isLoggedIn
          // );
          // if (savedProject) {
          //   const analysisData = savedProject.analysisReportData || {};
          //   setTitleOfBusinessInfo(analysisData.title || "");
          //   setMainFeaturesOfBusinessInformation(
          //     analysisData.mainFeatures || []
          //   );
          //   setInputBusinessInfo(savedProject.inputBusinessInfo);
          // }
          // setIsLoadingPage(false); // 로딩 완료
        }
      }
    };

    loadProject();
  }, [projectId, isLoggedIn, navigate]);

  // if (isLoadingPage) {
  //   return <div>Loading...</div>;
  // }

  const handleCreatePersona = () => {
    setPersonaStep(2);
    setIsPersonaAccessible(true);
    // saveProject({ changingProject: { personaStep: 2 } });
    setPersonaButtonState2(1);
    navigate(`/Persona/2/${projectId}`, { replace: true });
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent>
          <AnalysisWrap>
            <MainSection>
              <OrganismBusinessAnalysis
                personaStep={1}
                newProjectId={newProjectId}
              />
              <CardWrap>
                {/* 맞춤 페르소나 생성 */}
                {businessAnalysis.title && (
                  <CreateCard>
                    <p>
                      <img src={images.PeopleChatSquareFill} alt="" />
                      나의 비즈니스 고객은 누구일까요? 그리고 어떤 생각을 하고
                      있을까요?
                      <br />
                      당신의 타겟 고객에게 바로 물어보세요
                    </p>

                    <Button
                      Large
                      Primary
                      Fill
                      Round
                      onClick={handleCreatePersona}
                    >
                      맞춤 페르소나 생성
                      <img src={images.MagicStickFillWhite} alt="" />
                    </Button>
                  </CreateCard>
                )}
              </CardWrap>
            </MainSection>
            <Sidebar>
              <h5>Let's Start Now</h5>

              <ProgressBar>
                <span>🚀</span>
                <Progress progress={20} />
                <span>20%</span>
              </ProgressBar>

              <MoleculeStepIndicator steps={steps} activeStep={1} />
            </Sidebar>
          </AnalysisWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PagePersona;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
`;

const CreateCard = styled(Card)`
  align-items: center;
  padding: 44px 24px;

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    line-height: 1.5;
    color: ${palette.gray500};
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 101px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 16px;
  width: 290px;
  padding: 16px 20px;
  border-radius: 10px;
  background: ${palette.chatGray};

  h5 {
    font-size: 0.88rem;
    font-weight: 500;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  span {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.gray700};
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 20px;
  background: ${palette.outlineGray};

  &:before {
    display: block;
    width: ${(props) => props.progress}%;
    height: 100%;
    border-radius: 20px;
    background: ${palette.chatBlue};
    content: "";
  }
`;
