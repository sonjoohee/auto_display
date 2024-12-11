import React from "react";
import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import IncNavigation from "./IncNavigation";
import Header from "./IncHeader";
import { ContentsWrap, MainContent } from "../../assets/styles/BusinessAnalysisStyle";

const PageMyProject = () => {
  return (
    <>
      <ContentsWrap>
        <IncNavigation />

        <Header />

        <MainContent>
          <MyProjectWrap>
            <Title>프로젝트 리스트</Title>

            <ProjectList>
              <ProjectHeader>
                <div>프로젝트 명</div>
                <div>맞춤 페르소나</div>
                <div>페르소나 모집</div>
                <div>결과 리포트</div>
              </ProjectHeader>

              <ProjectContent>
                <ProjectItem>
                  <Name>
                    <strong>쉽고 빠르게 송금 및 이체 할 수 있는 어플리케이션</strong>
                    <span>생성일 - 2024. 10. 26</span>
                  </Name>
                  <Persona>
                    <div>
                      <span>기본형</span>
                      <p>4명</p>
                    </div>
                    <div>
                      <span>커스터마이즈</span>
                      <p>2명</p>
                    </div>
                  </Persona>
                  <Persona>페르소나 모집</Persona>
                  <Persona>결과 리포트</Persona>
                </ProjectItem>
              </ProjectContent>
            </ProjectList>
          </MyProjectWrap>
        </MainContent>
      </ContentsWrap>
    </>
  );
};

export default PageMyProject;


const MyProjectWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 50px auto;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${palette.gray800};
  padding-bottom: 20px;
  border-bottom: 1px solid ${palette.outlineGray};
`;

const ProjectList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > div {
    flex-grow: 1;
    font-weight: 300;
    color: ${palette.gray500};
    text-align: left;
  }

  > div:nth-child(1) {
    flex-grow: 3;
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProjectItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 24px;
  border-radius: 10px;
  border: 1px solid ${palette.outlineGray};
`;

const Name = styled.div`
  flex-grow: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  font-weight: 400;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: ${palette.gray500};
  }
`;

const Persona = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    text-align: left;

    + div:before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      margin-right: 12px;
      width: 1px;
      height: 19px;
      background-color: ${palette.outlineGray};
      content: "";
    }
  }
`;
