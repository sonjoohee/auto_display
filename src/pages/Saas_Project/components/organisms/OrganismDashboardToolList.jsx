import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../assets/styles/ButtonStyle";
import {
  Table,
  TableHeader,
  TableBody,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  Body1,
  Body2,
  Caption1,
  InputText,
} from "../../../../assets/styles/Typography";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";

const OrganismDashboardToolList = ({ toolListSaas }) => {
  const navigate = useNavigate();

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
    if (tool.interviewType) return tool.interviewType;
    if (tool.chat_data?.expert_index) return tool.chat_data.expert_index;
    return "상세 내용 없음";
  };

  // 툴 설명 가져오기 함수
  const getToolDescription = (tool) => {
    if (tool.type) {
      switch (tool.type) {
        case "ix_target_discovery_persona":
          return tool.specificSituation || "상세 내용 없음";
        case "ix_customer_value_persona":
          return tool.analysisScope || "상세 내용 없음";
        case "ix_idea_generator_persona":
          return (
            `${tool.coreValue?.[0]}외 ${tool.coreValue?.length - 1}개` ||
            "상세 내용 없음"
          );
        case "ix_design_emotion_analysis":
          return "이미지 명";
        default:
          return tool.type;
      }
    }
    if (tool.interviewType) return tool.interviewType;
    if (tool.chat_data?.expert_index) return tool.chat_data.expert_index;
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

  return (
    <RecentToolWrap>
      {toolListSaas?.length > 0 ? (
        <Table>
          <colgroup>
            <col width="20%" />
            <col />
            <col width="10%" />
            <col width="15%" />
            <col width="10%" />
          </colgroup>

          <TableHeader Type1>
            <tr>
              <th>
                <Body1 color="gray700" align="left">
                  리서치 툴 명
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
              <th>
                <Body1 color="gray700" align="left">
                  상세보기
                </Body1>
              </th>
            </tr>
          </TableHeader>

          <TableBody Type1>
            {toolListSaas.map((tool, index) => (
              <tr key={index}>
                <td>
                  <Body2 color="gray700" align="left">
                    {getToolName(tool)}
                  </Body2>
                </td>
                <td>
                  <Body2 color="gray700" align="left">
                    {getToolDescription(tool)}
                  </Body2>
                </td>
                <td>
                  <Body2 color="gray700" align="left">
                    {tool.status || "완료"}
                  </Body2>
                </td>
                <td>
                  <Body2 color="gray700" align="left">
                    {formatDate(tool.timestamp)}
                  </Body2>
                </td>
                <td>
                  <Button
                    Medium
                    Outline
                    Fill
                    onClick={() => tool.onDetailClick && tool.onDetailClick()}
                  >
                    <InputText color="gray700">자세히 보기</InputText>
                  </Button>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoDataWrap onClick={() => navigate("/Tool")}>
          <div>
            <img src={images.Tools} alt="" />
            <Body2 color="gray500">
              AI 기반 리서치, 어디까지 해보셨나요? 다양한 리서치 툴을 지금
              사용해보세요
              <br />
              (AI Persona 확인 후 리서치 툴을 사용하면 더 효과적입니다)
            </Body2>
            <Button Medium Outline Fill onClick={() => navigate("/Tool")}>
              <Caption1 color="gray700">리서치 툴 바로가기</Caption1>
            </Button>
          </div>
        </NoDataWrap>
      )}
    </RecentToolWrap>
  );
};

export default OrganismDashboardToolList;

const RecentToolWrap = styled.div`
  width: 100%;
`;

const NoDataWrap = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 130px 0 155px;
    border-radius: 10px;
    border: 1px solid ${palette.outlineGray};
    cursor: pointer;

    button {
      margin-top: 4px;
    }
  }
`;
