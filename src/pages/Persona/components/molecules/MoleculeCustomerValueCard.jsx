import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import { Button } from "../../../../assets/styles/ButtonStyle";
import {
  ListBoxItem,
  ListText,
  ListTitle,
  ListSubtitle,
  ListButton,
  Badge,
  ListRowWrap,
  ListRowItem,
  InterviewPopup,
  Status,
  TabWrapType2,
  TabButtonType2,
  TabContent,
  BoxWrap,
  ListBox,
  TextWrap,
  ListGroup,
} from "../../../../assets/styles/BusinessAnalysisStyle";
import {
  FormBox,
  CustomTextarea,
  CustomInput,
  SelectBox,
  SelectBoxItem,
  SelectBoxTitle,
  SelectBoxList,
  CheckBoxButton,
  GenderRadioButton,
} from "../../../../assets/styles/InputStyle";
import PopupWrap from "../../../../assets/styles/Popup";
import {
  H4,
  Body1,
  Body2,
  Body3,
  Sub1,
  Sub2,
  Sub3,
} from "../../../../assets/styles/Typography";

import { useAtom } from "jotai";
import {
  CUSTOMER_VALUE_ANALYZER_INFO,
  CUSTOMER_VALUE_ANALYZER_PERSONA,
  CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP,
  CUSTOMER_VALUE_ANALYZER_FACTOR,
  CUSTOMER_VALUE_ANALYZER_CLUSTERING,
  CUSTOMER_VALUE_ANALYZER_POSITIONING,
  CUSTOMER_VALUE_ANALYZER_FINAL_REPORT,
  TOOL_ID,
} from "../../../../pages/AtomStates";

import {
  createToolOnServer,
  updateToolOnServer,
  getToolOnServer,
  InterviewXCustomerValueAnalyzerPersonaRequest,
  getToolListOnServer,
  InterviewXCustomerValueAnalyzerJourneyMapRequest,
  InterviewXCustomerValueAnalyzerFactorRequest,
  InterviewXCustomerValueAnalyzerClusteringRequest,
  InterviewXCustomerValueAnalyzerPositioningRequest,
  InterviewXCustomerValueAnalyzerFinalReportRequest,
} from "../../../../utils/indexedDB";

// const MermaidDiagram = ({ code }) => {
//   const elementId = useRef(`mermaid-diagram-${Date.now()}`);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js";
//     script.async = true;

//     script.onload = async () => {
//       try {
//         window.mermaid.initialize({
//           startOnLoad: true,
//           theme: "default",
//           securityLevel: "loose",
//           logLevel: "error",
//           themeVariables: {
//             background: "#ffffff",
//             primaryColor: "#D6EBFF",
//             secondaryColor: "#D7DBFE",
//             tertiaryColor: "#E8E4FF",
//             journeyHoverColor: "#226FFF20",
//           },
//         });

//         window.mermaid.contentLoaded();
//       } catch (error) {
//         console.error("Mermaid rendering error:", error);
//       }
//     };

//     document.body.appendChild(script);
//     return () => {
//       if (document.body.contains(script)) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   return <div className="mermaid">{code}</div>;
// };

const MoleculeCustomerValueCard = ({
  title,
  content,
  status, // 'waiting' | 'loading' | 'completed'
  onAnalyze, // API 요청을 시작하는 함수
  isSelected, // 선택 여부
  onSelect, // 선택 이벤트 핸들러
  id, // 카드 식별자
  journeyMapData, // 새로운 prop 추가
  hideCheckCircle, // 새로운 prop 추가
  activeTab, // 새로운 prop 추가
  factor, // 새로운 prop 추가
  viewType, // 새로운 prop 추가
  business, // 새로운 prop 추가
  hideButton, // 새로운 prop 추가
}) => {
  const [toolId, setToolId] = useAtom(TOOL_ID);
  const [customerValueAnalyzerInfo, setCustomerValueAnalyzerInfo] = useAtom(
    CUSTOMER_VALUE_ANALYZER_INFO
  );
  const [customerValueAnalyzerPersona, setCustomerValueAnalyzerPersona] =
    useAtom(CUSTOMER_VALUE_ANALYZER_PERSONA);
  const [customerValueAnalyzerJourneyMap, setCustomerValueAnalyzerJourneyMap] =
    useAtom(CUSTOMER_VALUE_ANALYZER_JOURNEY_MAP);
  const [customerValueAnalyzerFactor, setCustomerValueAnalyzerFactor] = useAtom(
    CUSTOMER_VALUE_ANALYZER_FACTOR
  );
  const [customerValueAnalyzerClustering, setCustomerValueAnalyzerClustering] =
    useAtom(CUSTOMER_VALUE_ANALYZER_CLUSTERING);
  const [
    customerValueAnalyzerPositioning,
    setCustomerValueAnalyzerPositioning,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_POSITIONING);
  const [
    customerValueAnalyzerFinalReport,
    setCustomerValueAnalyzerFinalReport,
  ] = useAtom(CUSTOMER_VALUE_ANALYZER_FINAL_REPORT);

  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [mermaidData, setMermaidData] = useState("");
  const [isMermaidLoaded, setIsMermaidLoaded] = useState(false);
  const elementId = useRef(`mermaid-diagram-${Date.now()}`);

  //커스터머 저니맵 머메이드
  useEffect(() => {
    if (showDetailPopup && activeTabIndex === 0) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js";
      script.async = true;

      script.onload = async () => {
        try {
          window.mermaid.initialize({
            startOnLoad: true,
            theme: "default",
            securityLevel: "loose",
            logLevel: "error",
            themeVariables: {
              background: "#ffffff",
              primaryColor: "#D6EBFF",
              secondaryColor: "#D7DBFE",
              tertiaryColor: "#E8E4FF",
              journeyHoverColor: "#226FFF20",
            },
          });

          window.mermaid.contentLoaded();
        } catch (error) {
          console.error("Mermaid rendering error:", error);
        }
      };

      document.body.appendChild(script);
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [showDetailPopup, activeTabIndex]);

  // const MermaidDiagram = ({ code }) => {
  //   const [imageUrl, setImageUrl] = useState("");
  //   const elementId = useRef(`mermaid-diagram-${Date.now()}`);

  //   useEffect(() => {
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js";
  //     script.async = true;

  //     script.onload = async () => {
  //       try {
  //         window.mermaid.initialize({
  //           startOnLoad: true,
  //           theme: "default",
  //           securityLevel: "loose",
  //           logLevel: "error",
  //           themeVariables: {
  //             background: "#ffffff",
  //             quadrantPointFill: "#226FFF",
  //             quadrantPointStroke: "#226FFF",
  //             quadrantXAxisTextFill: "#333333",
  //             quadrantYAxisTextFill: "#333333",
  //             quadrant1Fill: "#E0E4EB",
  //             quadrant2Fill: "#D3E2FF",
  //             quadrant3Fill: "#F6F6F6",
  //             quadrant4Fill: "#E9F1FF",
  //           },
  //         });

  //         const { svg: originalSvg } = await window.mermaid.render(
  //           elementId.current,
  //           code
  //         );

  //         const parser = new DOMParser();
  //         const svgDoc = parser.parseFromString(originalSvg, "image/svg+xml");
  //         const svgElement = svgDoc.querySelector("svg");

  //         svgElement.setAttribute("viewBox", "0 0 500 500"); // 여백을 줄이기 위해 viewBox 조정
  //         svgElement.setAttribute("width", "100%");
  //         svgElement.setAttribute("height", "100%");
  //         svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

  //         const modifiedSvg = svgElement.outerHTML;

  //         const canvas = document.createElement("canvas");
  //         const ctx = canvas.getContext("2d");
  //         const img = new Image();

  //         img.onload = () => {
  //           const scaleFactor = 2; // 해상도를 두 배로 높이기 위한 스케일 팩터
  //           canvas.width = 500; // 고정된 너비
  //           canvas.height = 500; // 고정된 높이

  //           ctx.scale(scaleFactor, scaleFactor); // 스케일 적용
  //           ctx.fillStyle = "#ffffff";
  //           ctx.fillRect(0, 0, canvas.width, canvas.height);
  //           ctx.drawImage(
  //             img,
  //             0,
  //             0,
  //             canvas.width / scaleFactor,
  //             canvas.height / scaleFactor
  //           );

  //           const pngUrl = canvas.toDataURL("image/png", 1.0);
  //           setImageUrl(pngUrl);
  //         };

  //         img.src =
  //           "data:image/svg+xml;base64," +
  //           window.btoa(unescape(encodeURIComponent(modifiedSvg)));
  //       } catch (error) {
  //         console.error("Mermaid rendering error:", error);
  //       }
  //     };

  //     document.body.appendChild(script);

  //     return () => {
  //       if (script.parentNode) {
  //         script.parentNode.removeChild(script);
  //       }
  //     };
  //   }, [code]);

  //   return (
  //     <DiagramContainer>
  //       {imageUrl && (
  //         <img
  //           src={imageUrl}
  //           alt="Mermaid Diagram"
  //           style={{
  //             width: "100%",
  //             height: "auto",
  //             objectFit: "contain",
  //           }}
  //         />
  //       )}
  //     </DiagramContainer>
  //   );
  // };

  const renderButton = () => {
    switch (status) {
      case "waiting":
        return (
          <CustomButton waiting Medium PrimaryLightest Fill disabled $loading>
            대기중
          </CustomButton>
        );
      case "loading":
        return (
          <CustomButton Medium PrimaryLightest Fill disabled $loading>
            호출중
          </CustomButton>
        );
      case "completed":
        return (
          <CustomButton
            Medium
            PrimaryLightest
            Fill
            onClick={() => setShowDetailPopup(true)}
          >
            자세히
          </CustomButton>
        );
      default:
        return (
          <CustomButton waiting Medium PrimaryLightest Fill disabled $loading>
            대기중
          </CustomButton>
        );
    }
  };

  const renderPopup = () => {
    if (activeTab === 3) {
      return (
        <PopupWrap
          Wide1000
          title={
            <>
              <H4 color="gray800" align="left">
                {title}의 {business} - 구매 핵심 요인 분석
              </H4>
            </>
          }
          buttonType="Fill"
          isModal={true}
          showTabs={true}
          activeTab={activeTabIndex}
          onTabChange={(index) => setActiveTabIndex(index)}
          eventState={false}
          customAlertBox={
            <TextWrap>
              <Body2 color="gray800" align="left">
                {factor?.conclusion || "결론이 없습니다."}
              </Body2>
            </TextWrap>
          }
          body={
            <>
              <ListGroup>
                {factor?.key_buying_factors?.map((factorItem, index) => (
                  <div key={index}>
                    <Body1 color="gray800" align="left">
                      {factorItem.title}
                    </Body1>
                    <Sub3 color="gray800" align="left">
                      {factorItem.reason}
                    </Sub3>
                  </div>
                ))}
              </ListGroup>
            </>
          }
          onClose={() => setShowDetailPopup(false)}
          onCancel={() => setShowDetailPopup(false)}
        />
      );
    } else {
      // 기존 팝업 내용
      return (
        <PopupWrap
          Wide1000
          title={
            <>
              <H4 color="gray800" align="left">
                {title}의 {business} - 고객 여정 분석
              </H4>
            </>
          }
          buttonType="Fill"
          isModal={true}
          showTabs={true}
          tabs={["고객 여정 맵", "여정별 상세 설명"]}
          activeTab={activeTabIndex}
          onTabChange={(index) => setActiveTabIndex(index)}
          eventState={false}
          customAlertBox={
            <TextWrap>
              <Body2 color="gray800" align="left">
                {journeyMapData?.conclusion || "결론이 없습니다."}
              </Body2>
            </TextWrap>
          }
          onClose={() => setShowDetailPopup(false)}
          onCancel={() => setShowDetailPopup(false)}
          body={
            <>
              {activeTabIndex === 0 && (
                <BoxWrap>
                  <ScrollContainer>
                    {journeyMapData?.journey_map_image || (
                      <div
                        className="mermaid"
                        style={{ height: "100%", minWidth: "fit-content" }}
                      >
                        {journeyMapData?.mermaid}
                      </div>
                    )}
                  </ScrollContainer>
                </BoxWrap>
              )}
              {activeTabIndex === 1 && (
                <ListBox>
                  {Object.entries(journeyMapData).map(([key, step], index) => {
                    if (
                      key === "conclusion" ||
                      key.startsWith("section") ||
                      key === "mermaid" ||
                      key === "business" ||
                      key === "target"
                    )
                      return null;
                    return (
                      <div key={index}>
                        <span className="number">{index + 1}</span>
                        <div>
                          <Sub1 color="gray800">{step.title}</Sub1>
                          <Body2 color="gray700" align="left">
                            {step.detail}
                          </Body2>

                          <div className="tag">
                            {step.emotion &&
                              step.emotion.split(",").map((emotion, i) => (
                                <Sub3 key={i} color="gray800">
                                  #{emotion.trim()}
                                </Sub3>
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ListBox>
              )}
            </>
          }
        />
      );
    }
  };

  return (
    <>
      {viewType === "list" && (
        <ListBoxItem NoBg selected={isSelected} active={isSelected}>
          {!hideCheckCircle && (
            <div>
              <CheckBoxButton
                id={id}
                name={id}
                checked={isSelected}
                onChange={() => onSelect(id)}
              />
            </div>
          )}
          <ListText>
            <ListTitle>
              <Body1 color={isSelected ? "primary" : "gray800"}>{title}</Body1>
            </ListTitle>

            <Sub2 color="gray500" align="left">
              {content}
            </Sub2>
          </ListText>
          {!hideButton && <ListButton>{renderButton()}</ListButton>}
        </ListBoxItem>
      )}

      {showDetailPopup && renderPopup()}
    </>
  );
};

export default MoleculeCustomerValueCard;

const CustomButton = styled(Button)`
  min-width: 92px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: ${(props) =>
    props.children === "호출중" ? `1px solid ${palette.outlineGray}` : `0`};

  ${(props) =>
    props.$loading &&
    css`
      position: relative;
      justify-content: ${props.children === "호출중"
        ? "space-between"
        : "center"};
      // border: 1px solid ${palette.outlineGray} !important;
      background: ${palette.chatGray} !important;
      color: ${palette.gray700} !important;
      opacity: ${(props) => (props.children === "호출중" ? 1 : 0.5)};

      ${props.children === "호출중" &&
      css`
        &:after {
          content: "";
          width: 3px;
          height: 3px;
          border-radius: 50%;
          display: block;
          position: relative;
          margin-right: 8px;
          background: ${palette.white};
          box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.white};
          box-sizing: border-box;
          animation: shadowPulse 2s linear infinite;
        }

        @keyframes shadowPulse {
          33% {
            background: ${palette.white};
            box-shadow: -10px 0 ${palette.primary}, 10px 0 ${palette.white};
          }
          66% {
            background: ${palette.primary};
            box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.white};
          }
          100% {
            background: ${palette.white};
            box-shadow: -10px 0 ${palette.white}, 10px 0 ${palette.primary};
          }
        }
      `}
    `}
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow-x: auto;
  overflow-y: hidden;

  .mermaid {
    height: 100%;
    display: flex;
    align-items: center;
  }

  svg {
    height: 100%;
    width: auto;
  }
`;

// const ListGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 24px;

//   > div {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//   }
// `;

// export const DiagramContainer = styled.div`
//   width: 70%;
//   min-width: 600px;
//   min-height: 600px;
//   margin: 20px 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow: visible;
// `;
