//대시보드
import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { palette } from "../../../assets/styles/Palette";
import OrganismIncNavigation from "../../Global/organisms/OrganismIncNavigation";
// import Header from "../../../Design_Page/IncHeader";
import MoleculeHeader from "../../Global/molecules/MoleculeHeader";
import MoleculeAccountPopup from "../../Login_Sign/components/molecules/MoleculeAccountPopup";
import PopupWrap from "../../../assets/styles/Popup";
import { Button } from "../../../assets/styles/ButtonStyle";
import {
  ContentsWrap,
  MainContent,
  Tag,
  Table,
  TableHeader,
  TableBody,
} from "../../../assets/styles/BusinessAnalysisStyle";
import OrganismStorageBoxToolList from "../components/organisms/OrganismStorageBoxToolList";
import OrganismDashboardToolList from "../components/organisms/OrganismDashboardToolList";
import { TOOL_LIST_SAAS, PROJECT_SAAS } from "../../AtomStates";
import images from "../../../assets/styles/Images";
import {
  H1,
  H2,
  H4,
  Body1,
  Body2,
  Body3,
  Sub1,
  Sub2,
  Sub3,
  Caption1,
  InputText,
} from "../../../assets/styles/Typography";

import { getToolListOnServerSaas, getToolDeleteListOnServer, updateToolOnServer, updateProjectReportOnServer } from "../../../utils/indexedDB";
import axios from "axios";

const PageStorageBox = () => {
  const navigate = useNavigate();
  const [projectSaas, setProjectSaas] = useAtom(PROJECT_SAAS);
  const [toolListSaas, setToolListSaas] = useAtom(TOOL_LIST_SAAS);
  const project = projectSaas;
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [deletedTools, setDeletedTools] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const loadToolList = async () => {
      try {
        const savedToolListInfo = await getToolListOnServerSaas(
          project?._id,
          0,
          true
        );

        if (savedToolListInfo) {
          // const filteredList = savedToolListInfo.filter(
          //   (tool) => !(tool.deleteState >= 1)
          // );
          const sortedList = [...savedToolListInfo].sort((a, b) => {
            const dateA = a.timestamp;
            const dateB = b.timestamp;
            return dateB - dateA; // 최신 날짜가 위로
          });

          console.log("🚀 ~ sortedList ~ sortedList:", sortedList);
          setToolListSaas(sortedList);
        }
      } catch (error) {}
    };
    loadToolList();
  }, []); // refreshTrigger가 변경될 때마다 데이터 다시 로드

  useEffect(() => {
    // 새로고침 감지 함수
    const detectRefresh = () => {
      // 현재 URL 확인
      const currentUrl = window.location.href;
      if (currentUrl.toLowerCase().includes("storagebox")) {
        // 세션 스토리지에서 마지막 URL 가져오기
        const lastUrl = sessionStorage.getItem("lastUrl");

        // 마지막 URL이 현재 URL과 같으면 새로고침
        if (lastUrl && lastUrl === currentUrl) {
          navigate("/");
          return true;
        }

        // 현재 URL 저장
        sessionStorage.setItem("lastUrl", currentUrl);
      }

      return false;
    };

    // beforeunload 이벤트 핸들러
    const handleBeforeUnload = (event) => {
      // 이벤트 취소 (표준에 따라)
      event.preventDefault();
      // Chrome은 returnValue 설정 필요
      event.returnValue = "";

      // 새로고침 시 루트 페이지로 이동
      navigate("/");
    };

    // F5 키 또는 Ctrl+R 감지
    const handleKeyDown = (event) => {
      if (
        (event.key === "r" && (event.metaKey || event.ctrlKey)) ||
        event.key === "F5"
      ) {
        // F5 키 코드
        event.preventDefault();
        navigate("/");
      }
    };

    // 함수 실행
    detectRefresh();

    // 이벤트 리스너 등록
    // window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      // window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  // 임시 삭제함 데이터 로드
  useEffect(() => {
    const loadDeletedTools = async () => {
      if (isTrashModalOpen) {
        try {
          const deletedToolsData = await getToolDeleteListOnServer(
            100,
            1,
            true
          );
          if (deletedToolsData.data.length > 0) {
            setDeletedTools(deletedToolsData.data);
            console.log("deletedToolsData", deletedToolsData.data);
          }
        } catch (error) {
          console.error("삭제된 툴 목록을 불러오는데 실패했습니다:", error);
        }
      }
    };

    loadDeletedTools();
  }, [isTrashModalOpen, refreshTrigger]);

  // 툴 복구 처리
  const handleRestoreTool = async (toolId, toolType) => {
    try {
      if (toolType === "interviewSingle" || toolType === "interviewGroup") {
        await updateProjectReportOnServer(
          toolId,
          {
            deleteState: 0,
          },
          true,
        );
      } 
      else if (toolType === "chat") {
        // 서버에서 채팅 복구 (deleteState를 0으로 설정)
        try {
          const accessToken = sessionStorage.getItem("accessToken");
          
          await axios.put(`https://wishresearch.kr/panels/update_chat`, {
            id: toolId,
            deleteState: 0
          }, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
        } catch (error) {
          console.error("채팅 복구 중 오류 발생:", error);
        }
      }
      else {
        await updateToolOnServer(toolId, { deleteState: 0 });
      }
      
      // 화면에서 제거
      setDeletedTools((prev) => prev.filter((tool) => tool._id !== toolId));
      // 스토리지 박스 목록 새로고침 트리거
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("툴 복구에 실패했습니다:", error);
    }
  };

  // 툴 영구 삭제 처리
  const handlePermanentDelete = async (toolId, toolType) => {
    try {
      if (toolType === "interviewSingle" || toolType === "interviewGroup") {
        await updateProjectReportOnServer(
          toolId,
          {
            deleteState: 2,
          },
          true,
        );
      } 
      else if (toolType === "chat") {
        // 서버에서 채팅 영구 삭제 (deleteState를 2로 설정)
        try {
          const accessToken = sessionStorage.getItem("accessToken");
          
          await axios.put(`https://wishresearch.kr/panels/update_chat`, {
            id: toolId,
            deleteState: 2
          }, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
        } catch (error) {
          console.error("채팅 영구 삭제 중 오류 발생:", error);
        }
      }
      else {
        await updateToolOnServer(toolId, { deleteState: 2 });
      }
      
      // 화면에서 제거
      setDeletedTools((prev) => prev.filter((tool) => tool._id !== toolId));
    } catch (error) {
      console.error("툴 영구 삭제에 실패했습니다:", error);
    }
  };

  // 툴 설명 가져오기 함수
  const getToolDescription = (tool) => {
    if (tool.type) {
      switch (tool.type) {
        case "ix_target_discovery_persona":
          return tool.specificSituation || "상세 내용 없음";
        case "ix_customer_value_persona":
          return (tool.analysisScope?.split("|")[0] || "상세 내용 없음").trim();
        case "ix_idea_generator_persona":
          return (
            `${tool.coreValue?.[0]} 외 ${tool.coreValue?.length - 1}개` ||
            "상세 내용 없음"
          );
        case "ix_design_emotion_analysis":
          return tool.imageName?.[0]?.name || "상세 내용 없음";
        default:
          return tool.type;
      }
    }
    if (tool.reportTitle) return tool.reportTitle;
    if (tool.chat_data?.expert_index) {
      switch (tool.chat_data.expert_index) {
        case "1":
          return "시장 내 경쟁 우위 방안 보고서";
        case "2":
          return "마케팅 전문가";
        case "3":
          return "고객 인사이트 전문가";
        case "4":
          return "PoC 설계 전문가";
        case "5":
          return "아이디어 디벨로퍼";
        case "6":
          return "최적화된 전략을 제시";
        case "7":
          return "제품/서비스 분석 보고서";
        case "8":
          return "사례 분석 전문가";
        case "9":
          return "린 캔버스 vs 비즈니스 모델 캔버스 매칭 분석";
        case "10":
          return "조사 설계 전문가";
        default:
          return tool.chat_data.expert_index;
      }
    }
    return "상세 내용 없음";
  };
  // 날짜 포맷팅 함수 (년월일시분 표기)
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear().toString().slice(2)}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  // 툴 이름 가져오기 함수
  const getToolName = (tool) => {
    if (tool.type) {
      switch (tool.type) {
        case "ix_target_discovery_persona":
          return "타겟 탐색기";
        case "ix_customer_value_persona":
          return "고객 핵심 가치 분석기";
        case "ix_design_emotion_analysis":
          return "디자인 감성 분석기";
        case "ix_idea_generator_persona":
          return "아이디어 생성기";
        default:
          return tool.type;
      }
    }
    if (tool.interviewType)
      return tool.interviewType === "single" ? "심층 인터뷰" : "그룹 인터뷰";
    if (tool.chat_data?.expert_index) {
      switch (tool.chat_data.expert_index) {
        case "1":
          return "전략 컨설턴트";
        case "2":
          return "마케팅 전문가";
        case "3":
          return "고객 인사이트 전문가";
        case "4":
          return "PoC 설계 전문가";
        case "5":
          return "아이디어 디벨로퍼";
        case "6":
          return "그로스 해커";
        case "7":
          return "가격 분석 전문가";
        case "8":
          return "사례 분석 전문가";
        case "9":
          return "BM 전문가";
        case "10":
          return "조사 설계 전문가";
        default:
          return tool.chat_data.expert_index;
      }
    }
    return "상세 내용 없음";
  };

  return (
    <>
      <ContentsWrap>
        <OrganismIncNavigation />

        <MoleculeHeader />

        <MainContent Wide1030>
          <StorageBoxWrap>
            <StorageBoxTitle>
              <div>
                <H1 color="gray800" align="left">
                  Knowledge Archive
                </H1>
                <Body3 color="gray700" align="left">
                  해당 서비스를 통해 수집한 리포트들을 한곳에 모아두었어요
                </Body3>
              </div>
              <Button Outline onClick={() => setIsTrashModalOpen(true)}>
                <img src={images.Trash} alt="" />
                <Caption1 color="gray700">임시 삭제함</Caption1>
              </Button>
            </StorageBoxTitle>

            {/* <TabWrapType4>
              <TabButtonType4Main
              // isActive={activeTab === "all"}
              // onClick={() => setActiveTab("all")}
              >
                <Caption1 color="gray700">All</Caption1>
              </TabButtonType4Main>
              <TabButtonType4Main
              // isActive={activeTab === "interview"}
              // onClick={() => setActiveTab("interview")}
              >
                <Caption1 color="gray700">AI Person Interview</Caption1>
              </TabButtonType4Main>
              <TabButtonType4Main
              // isActive={activeTab === "research"}
              // onClick={() => setActiveTab("research")}
              >
                <Caption1 color="gray700">Research Tool</Caption1>
              </TabButtonType4Main>
              <TabButtonType4Main
              // isActive={activeTab === "expert"}
              // onClick={() => setActiveTab("expert")}
              >
                <Caption1 color="gray700">Business Expert</Caption1>
              </TabButtonType4Main>
            </TabWrapType4> */}

            <DashBoardItem>
              <OrganismStorageBoxToolList toolListSaas={toolListSaas} />
            </DashBoardItem>
            {/* <Table Round>
              <colgroup>
                <col width="20%" />
                <col />
                <col width="20%" />
                <col width="10%" />
                <col width="10%" />
                <col width="5%" />
              </colgroup>

              <TableHeader Type1>
                <tr>
                  <th>
                    <Body1 color="gray700" align="left">
                      리포트 이름
                    </Body1>
                  </th>
                  <th>
                    <Body1 color="gray700" align="left">
                      상세 내용
                    </Body1>
                  </th>
                  <th>
                    <Body1 color="gray700" align="left">
                      현황
                    </Body1>
                  </th>
                  <th>
                    <Body1 color="gray700" align="left">
                      진행 일시
                    </Body1>
                  </th>
                  <th colSpan={2}>
                    <Body1 color="gray700" align="left">
                      상세보기
                    </Body1>
                  </th>
                </tr>
              </TableHeader>
              <TableBody>
                <tr>
                  <td>
                    <Body2 color="gray700" align="left">
                      고객 탐색기
                    </Body2>
                  </td>
                  <td>
                    <Body2 color="gray700" align="left">
                      총 8명의 페르소나 시나리오 분석
                    </Body2>
                  </td>
                  <td>
                    <Body2 color="gray700" align="left">
                      완료
                    </Body2>
                  </td>
                  <td>
                    <Body2 color="gray700" align="left">
                      25.02.19
                    </Body2>
                  </td>
                  <td>
                    <Button Small Outline Fill>
                      <InputText color="gray700">자세히 보기</InputText>
                    </Button>
                  </td>
                  <td>
                    <Button View>삭제</Button>
                  </td>
                </tr>
              </TableBody>
            </Table> */}
          </StorageBoxWrap>
        </MainContent>
      </ContentsWrap>

      {isTrashModalOpen && (
        <PopupWrap
          Wide455
          TitleFlex
          title="임시 삭제함"
          buttonType="Fill"
          isModal={true}
          onCancel={() => setIsTrashModalOpen(false)}
          body={
            <>
              <div className="deleted-wrap">
                {deletedTools.length > 0 ? (
                  deletedTools.map((tool) => (
                    <div key={tool._id}>
                      <images.GridCircle
                        color={palette.gray700}
                        width={12}
                        height={12}
                      />
                      <div className="content">
                        <Sub3 color="gray800" align="left">
                          ({getToolName(tool) || ""}){" "}
                          {getToolDescription(tool) || ""}
                        </Sub3>
                        <Caption1 color="gray500" align="left">
                          삭제일 : {formatDate(tool.timestamp)}
                        </Caption1>
                      </div>
                      <div className="button">
                        <span onClick={() => handleRestoreTool(tool._id, tool.toolType)}>
                          <img src={images.ArrowReturn} alt="복구" />
                        </span>
                        {/* <span onClick={() => handlePermanentDelete(tool._id)}>
                          <img src={images.Trash} alt="영구삭제" />
                        </span> */}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "20px 0", textAlign: "center" }}>
                    <Caption1 color="gray500">
                      임시 삭제된 항목이 없습니다.
                    </Caption1>
                  </div>
                )}
              </div>

              {/* <div className="delete-info">
                <Caption1 color="primary">
                  휴지통에 15일 이상 보관된 리포트는 자동으로 삭제됩니다.
                </Caption1>
              </div> */}
            </>
          }
        />
      )}
    </>
  );
};

export default PageStorageBox;

const StorageBoxWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin: 50px auto;
`;

const StorageBoxTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const DashBoardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .title {
    display: flex;
    align-items: center;
    gap: 12px;

    button {
      margin-left: auto;
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};
  background: ${palette.white};
`;

const CardTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const CardContent = styled.div`
  color: ${palette.gray800};
  text-align: left;

  p + p {
    margin-top: 20px;
  }
`;

const TooltipButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${palette.chatGray};
  cursor: pointer;
  z-index: 1;

  &:before {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    font-size: 0.63rem;
    color: ${palette.gray500};
    border: 1px solid ${palette.gray500};
    content: "!";
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  top: -25px;
  right: -300px;
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  padding: 20px 20px 32px;
  border-radius: 15px;
  background: ${palette.white};
  filter: drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.15));
  animation: fadeIn 0.3s ease-in-out;
  cursor: default;
  z-index: 100;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:before {
    position: absolute;
    top: 30px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${palette.white};
    content: "";
  }
`;

const TooltipHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 300;
  color: ${palette.gray800};
  line-height: 1.5;
  width: 100%;

  span {
    position: relative;
    width: 16px;
    height: 16px;
    display: block;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 16px;
      display: block;
      border-radius: 5px;
      background: ${palette.gray700};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const TooltipBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 12px;

    &:before {
      width: 5px;
      height: 18px;
      border-radius: 1px;
      content: "";
    }

    &.start:before {
      background: ${palette.outlineGray};
    }

    &.ing:before {
      background: #32ade6;
    }

    &.complete:before {
      background: ${palette.primary};
    }
  }

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray700};
    text-align: left;
  }
`;

const PersonaStatusWrap = styled.div`
  display: flex;
  gap: 24px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    // max-width: calc(100% / 3);
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  ${(props) =>
    props.NoData &&
    `
    > div {
      align-items: center;
      gap: 8px;
      padding: 44px 24px;

      button {
        margin-top: 4px;
      }
    }
  `}
`;

const RecentToolWrap = styled(PersonaStatusWrap)`
  ${(props) =>
    props.NoData &&
    `
    > div {
      padding: 130px 0 175px;
    }
  `}
`;

const UlInfo = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  li {
    display: flex;
    align-items: center;
    gap: 12px;

    div:last-child {
      margin-left: auto;
    }

    + li {
      padding-top: 6px;
      border-top: 1px solid ${palette.outlineGray};
    }

    &:before {
      width: 5px;
      height: 18px;
      border-radius: 1px;
      content: "";
    }

    &.start:before {
      background: ${palette.outlineGray};
    }

    &.ing:before {
      background: #32ade6;
    }

    &.complete:before {
      background: ${palette.primary};
    }
  }
`;

export const TabWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TabButton = styled.button`
  font-family: "Pretendard", "Poppins";
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 4px 16px;
  border-radius: 50px;
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? `
    background: rgba(34, 111, 255, 0.1);
    border: 1px solid ${palette.primary};
    color: ${palette.primary};
    font-weight: 500;
  `
      : `
    background: ${palette.chatGray};
    border: 1px solid ${palette.outlineGray};
    color: ${palette.gray500};
    font-weight: 300;
  `}
`;

export const TabButtonType2 = styled(TabButton)`
  flex: 1;
  border: 0;

  ${({ isActive }) =>
    isActive
      ? `
    background: ${palette.white};
    color: ${palette.gray800};
  `
      : `
    background: transparent;
  `}
`;

export const TabWrapType2 = styled(TabWrap)`
  gap: 4px;
  width: 100%;
  padding: 4px;
  border-radius: 20px;
  background: ${palette.chatGray};
`;

export const TabWrapType3 = styled(TabWrap)`
  gap: 16px !important;
  border-bottom: ${(props) =>
    props.Border ? `1px solid ${palette.outlineGray}` : "none"};
`;

export const TabButtonType3 = styled(TabButton)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 1rem;
  padding: 0;
  border-radius: 0;
  border: 0;
  background: transparent;
  transition: all 0.5s;

  &:after {
    height: 3px;
    background: ${palette.gray800};
    content: "";
    transition: all 0.5s;
  }

  ${({ isActive }) =>
    isActive
      ? `
        color: ${palette.gray800};
        font-weight: 500;

        &:after { 
          width: 100%;
        }
      `
      : `
        &:after {
          width: 0;
        }
      `}
`;

export const TabWrapType4 = styled(TabWrap)`
  gap: 16px !important;
`;

export const TabButtonType4Main = styled(TabButton)`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${palette.outlineGray};
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? `
      background: ${palette.chatGray};
    `
      : `
      background: ${palette.white};
    `}
`;

export const TabButtonType4 = styled(TabButton)`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid ${palette.outlineGray};
  cursor: pointer;

  ${({ active }) =>
    active
      ? `
      color: ${palette.gray700};
      background: ${palette.chatGray};
    `
      : `
      background: ${palette.white};
    `}
`;
