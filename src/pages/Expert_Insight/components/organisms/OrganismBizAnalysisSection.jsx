import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useAtom } from "jotai";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { InputField } from "../../../../assets/styles/Input";
import {
  SkeletonH1,
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";
import MoleculeReportController from "../molecules/MoleculeReportController";
import businessTemplate from "./sample_analyse.json"; // JSON 파일 불러오기
import {
  saveConversationToIndexedDB,
  getConversationByIdFromIndexedDB,
} from "../../../../utils/indexedDB";
import axios from "axios";

import {
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER,
  INPUT_BUSINESS_INFO,
  IS_EDITING_NOW,
  ANALYSIS_BUTTON_STATE,
  IS_LOADING,
  CONVERSATION,
  APPROACH_PATH,
  isLoggedInAtom,

} from "../../../AtomStates";

const OrganismBizAnalysisSection = ({ conversationId }) => {
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인

  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [approachPath] = useAtom(APPROACH_PATH);

  const [inputBusinessInfo, setInputBusinessInfo] =
    useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(
    TITLE_OF_BUSINESS_INFORMATION
  );
  const [
    mainFeaturesOfBusinessInformation,
    setMainFeaturesOfBusinessInformation,
  ] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    businessInformationTargetCustomer,
    setBusinessInformationTargetCustomer,
  ] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);

  const [
    tempMainFeaturesOfBusinessInformation,
    setTempMainFeaturesOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    tempMainCharacteristicOfBusinessInformation,
    setTempMainCharacteristicOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    tempBusinessInformationTargetCustomer,
    setTempBusinessInformationTargetCustomer,
  ] = useAtom(TEMP_BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [isLoading, setIsLoading] = useAtom(IS_LOADING); // useState 대신 useAtom으로 변경
  //   const [isLoading, setIsLoading] = useState(false);
  const [buttonState, setButtonState] = useAtom(ANALYSIS_BUTTON_STATE);

  const [newAddContent, setNewAddContent] = useState("");
  const [isAddingNow, setIsAddingNow] = useState({
    section: "",
    isAdding: false,
  });
  const [newEditContent, setNewEditContent] = useState("");
  const [editingIndex, setEditingIndex] = useState({ section: "", index: -1 });
  const [isEditingNow, setIsEditingNow] = useAtom(IS_EDITING_NOW);
  const [warningMessage, setWarningMessage] = useState("");

  const [isPopupOpenDelete, setIsPopupOpenDelete] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ section: "", index: null });

  const togglePopupDelete = () => {
      setIsPopupOpenDelete(!isPopupOpenDelete);
  };
  const confirmDelete = (section, index) => {
      setDeleteInfo({ section, index });
      togglePopupDelete();
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };
  const data = {
    business_idea: inputBusinessInfo,
  };
  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  useEffect(() => {
    console.log("기초보고서1");
    setIsLoading(true);

    const loadAndSaveData = async () => {
      let businessData;

      if (buttonState === 1) {
        setButtonState(0);
        // 버튼 클릭으로 API 호출
        console.log("기초보고서api호출");
        const response = await axios.post(
          "https://wishresearch.kr/panels/business",
          data,
          axiosConfig
        );
        businessData = response.data.business_analysis;

        // 데이터를 받아온 직후 아톰에 값을 설정합니다.
        if (Array.isArray(businessData["주요_목적_및_특징"])) {
          setTempMainFeaturesOfBusinessInformation(
            businessData["주요_목적_및_특징"].map((item) => item)
          );
          setMainFeaturesOfBusinessInformation(
            businessData["주요_목적_및_특징"].map((item) => item)
          );
        } else {
          setTempMainFeaturesOfBusinessInformation(
            businessData["주요_목적_및_특징"]
              ? [businessData["주요_목적_및_특징"]]
              : []
          );
          setMainFeaturesOfBusinessInformation(
            businessData["주요_목적_및_특징"]
              ? [businessData["주요_목적_및_특징"]]
              : []
          );
        }

        if (Array.isArray(businessData["주요기능"])) {
          setTempMainCharacteristicOfBusinessInformation(
            businessData["주요기능"].map((item) => item)
          );
          setMainCharacteristicOfBusinessInformation(
            businessData["주요기능"].map((item) => item)
          );
        } else {
          setTempMainCharacteristicOfBusinessInformation(
            businessData["주요기능"] ? [businessData["주요기능"]] : []
          );
          setMainCharacteristicOfBusinessInformation(
            businessData["주요기능"] ? [businessData["주요기능"]] : []
          );
        }

        if (Array.isArray(businessData["목표고객"])) {
          setTempBusinessInformationTargetCustomer(
            businessData["목표고객"].map((item) => item)
          );
          setBusinessInformationTargetCustomer(
            businessData["목표고객"].map((item) => item)
          );
        } else {
          setTempBusinessInformationTargetCustomer(
            businessData["목표고객"] ? [businessData["목표고객"]] : []
          );
          setBusinessInformationTargetCustomer(
            businessData["목표고객"] ? [businessData["목표고객"]] : []
          );
        }

        // 명칭은 배열이 아니므로 기존 방식 유지
        setTitleOfBusinessInfo(businessData["명칭"]);

        // 아톰이 업데이트된 후에 analysisReportData를 생성합니다.
        const analysisReportData = {
          title: businessData["명칭"],
          mainFeatures: Array.isArray(businessData["주요_목적_및_특징"])
            ? businessData["주요_목적_및_특징"]
            : [],
          mainCharacter: Array.isArray(businessData["주요기능"])
            ? businessData["주요기능"]
            : [],
          mainCustomer: Array.isArray(businessData["목표고객"])
            ? businessData["목표고객"]
            : [],
        };

        console.log("OrganismBizAnalysisSectionconversationId")
        console.log(conversationId)

        // 기존 대화 내역을 유지하면서 새로운 정보를 추가
        const existingConversation = await getConversationByIdFromIndexedDB(
          conversationId
        );

        const updatedConversation = {
          ...existingConversation,
          analysisReportData,
          timestamp: Date.now(),
        };
        await saveConversationToIndexedDB({
          id: conversationId,
          inputBusinessInfo,
          analysisReportData,
          timestamp: Date.now(),
        }
        ,isLoggedIn,conversationId
        );
        console.log("___________기초보고서_____________");
        console.log("기초보고서2");
        console.log(analysisReportData);
        setIsLoading(false);
      } else {
        // IndexedDB에서 기존 데이터를 가져와 적용
        const existingConversation = await getConversationByIdFromIndexedDB(
          conversationId, isLoggedIn
        );

        if (existingConversation && existingConversation.analysisReportData) {
          const storedData = existingConversation.analysisReportData;

          // 저장된 데이터를 각 상태에 적용
          setTitleOfBusinessInfo(storedData.title);
          setTempMainFeaturesOfBusinessInformation(storedData.mainFeatures);
          setTempMainCharacteristicOfBusinessInformation(
            storedData.mainCharacter
          );
          setTempBusinessInformationTargetCustomer(storedData.mainCustomer);

          setMainFeaturesOfBusinessInformation(storedData.mainFeatures);
          setMainCharacteristicOfBusinessInformation(storedData.mainCharacter);
          setBusinessInformationTargetCustomer(storedData.mainCustomer);
        } else {
          console.warn("No saved analysis data found.");
        }
        setIsLoading(false);
      }
      const updatedConversation2 = [...conversation];
      if(approachPath === 1) {
        updatedConversation2.push(
          { type: 'system', message: '비즈니스 분석이 완료되었습니다. 추가 사항이 있으시면 ‘수정하기’ 버튼을 통해 수정해 주세요.\n분석 결과에 만족하신다면, 지금 바로 전략 보고서를 준비해드려요.' },
          { type: 'report_button'},
        );
      }
      else {
        updatedConversation2.push(
          { type: 'system', message: '비즈니스 분석이 완료되었습니다. 추가 사항이 있으시면 ‘수정하기’ 버튼을 통해 수정해 주세요.\n분석 결과에 만족하신다면, 전문가들의 의견을 확인하여 아이디어를 한 단계 더 발전시켜 보세요 🔍' },
        );
      }
      setConversation(updatedConversation2);
      
      const analysisReportData = {
        title: businessData["명칭"],
        mainFeatures: Array.isArray(businessData["주요_목적_및_특징"])
          ? businessData["주요_목적_및_특징"]
          : [],
        mainCharacter: Array.isArray(businessData["주요기능"])
          ? businessData["주요기능"]
          : [],
        mainCustomer: Array.isArray(businessData["목표고객"])
          ? businessData["목표고객"]
          : [],
      };

      console.log("updatedConversation2")
      console.log(updatedConversation2)
      await saveConversationToIndexedDB({
        id: conversationId,
        conversation: updatedConversation2, // 여기서는 { updatedConversation }가 아니라 그대로 updatedConversation로 넘겨야 함
        analysisReportData,
        inputBusinessInfo,
        timestamp: Date.now(),
      }
      ,isLoggedIn,conversationId
      );
    };
    loadAndSaveData();
  }, [
    conversationId,
    setTitleOfBusinessInfo,
    setMainFeaturesOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
    setBusinessInformationTargetCustomer,
    setTempMainFeaturesOfBusinessInformation,
    setTempMainCharacteristicOfBusinessInformation,
    setTempBusinessInformationTargetCustomer,
    setIsLoading,
  ]);

  //   const handleEditStart = (section, index) => {
  //     setEditingIndex({ section, index });
  //     setIsEditingNow(true);
  //     if (section === 'mainFeatures') {
  //       setNewEditContent(tempMainFeaturesOfBusinessInformation[index]);
  //     } else if (section === 'mainCharacteristic') {
  //       setNewEditContent(tempMainCharacteristicOfBusinessInformation[index]);
  //     } else if (section === 'targetCustomer') {
  //       setNewEditContent(tempBusinessInformationTargetCustomer[index]);

  //       setTempMainFeaturesOfBusinessInformation(mainFeaturesOfBusinessInformation);
  //     setTempMainCharacteristicOfBusinessInformation(mainCharacteristicOfBusinessInformation);
  //     setTempBusinessInformationTargetCustomer(businessInformationTargetCustomer);
  //   },[])

  const handleEditStart = (section, index) => {
    setEditingIndex({ section, index });

    switch (section) {
      case "mainFeatures":
        setNewEditContent(mainFeaturesOfBusinessInformation[index]);
        break;
      case "mainCharacteristic":
        setNewEditContent(mainCharacteristicOfBusinessInformation[index]);
        break;
      case "targetCustomer":
        setNewEditContent(businessInformationTargetCustomer[index]);
        break;
      default:
        break;
    }
  };

  const handleApplyChange = () => {
    if (newEditContent.trim() === "") {
      alert("내용을 입력해주세요."); // 비어있는 내용에 대한 경고 메시지
      return;
    }

    let updatedArray;

    switch (editingIndex.section) {
      case "mainFeatures":
        updatedArray = [...mainFeaturesOfBusinessInformation];
        updatedArray[editingIndex.index] = newEditContent;
        setMainFeaturesOfBusinessInformation(updatedArray);
        break;
      case "mainCharacteristic":
        updatedArray = [...mainCharacteristicOfBusinessInformation];
        updatedArray[editingIndex.index] = newEditContent;
        setMainCharacteristicOfBusinessInformation(updatedArray);
        break;
      case "targetCustomer":
        updatedArray = [...businessInformationTargetCustomer];
        updatedArray[editingIndex.index] = newEditContent;
        setBusinessInformationTargetCustomer(updatedArray);
        break;
      default:
        break;
    }

    setEditingIndex({ section: "", index: -1 });
    setWarningMessage("");
    setNewEditContent("");
    console.log("Updated State:", updatedArray);
  };

  const handleEditCancel = () => {
    setEditingIndex({ section: "", index: -1 });
    setWarningMessage("");
    setNewEditContent("");
  };

  const handleAddSave = (section) => {
    if (newAddContent.trim() !== "") {
      if (section === "mainFeatures") {
        setMainFeaturesOfBusinessInformation([
          ...mainFeaturesOfBusinessInformation,
          newAddContent,
        ]);
      } else if (section === "mainCharacteristic") {
        setMainCharacteristicOfBusinessInformation([
          ...mainCharacteristicOfBusinessInformation,
          newAddContent,
        ]);
      } else if (section === "targetCustomer") {
        setBusinessInformationTargetCustomer([
          ...businessInformationTargetCustomer,
          newAddContent,
        ]);
      }
      setNewAddContent("");
      setIsAddingNow({ section: "", isAdding: false });
    }
  };

  const handleDelete = () => {
    const { section, index } = deleteInfo;
  
    if (section === "mainFeatures") {
      setMainFeaturesOfBusinessInformation(
        mainFeaturesOfBusinessInformation.filter((_, i) => i !== index)
      );
    } else if (section === "mainCharacteristic") {
      setMainCharacteristicOfBusinessInformation(
        mainCharacteristicOfBusinessInformation.filter((_, i) => i !== index)
      );
    } else if (section === "targetCustomer") {
      setBusinessInformationTargetCustomer(
        businessInformationTargetCustomer.filter((_, i) => i !== index)
      );
    }
  
    togglePopupDelete();
  };

  return (
    <>
    <AnalysisSection>
      {isLoading ? (
        <>
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing /> {/* 제목과 본문 사이에 간격 추가 */}
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <Spacing /> {/* 제목과 본문 사이에 간격 추가 */}
          <SkeletonTitle className="title-placeholder" />
          <SkeletonLine className="content-placeholder" />
          <SkeletonLine className="content-placeholder" />
        </>
      ) : (
        <>
          <h1>{titleOfBusinessInfo}</h1>
          {/* 주요 특징 섹션 */}
          <BoxWrap>
            <strong>
              <img src={images.StarChack} alt="" />
              주요 특징
            </strong>
            <ul>
              {mainFeaturesOfBusinessInformation.map((content, index) => (
                <li key={index}>
                  {editingIndex.section === "mainFeatures" &&
                  editingIndex.index === index ? (
                    <InputField
                      type="text"
                      value={newEditContent}
                      onChange={(e) => setNewEditContent(e.target.value)}
                    />
                  ) : (
                    <p>{content}</p>
                  )}
                  {editingIndex.section === "mainFeatures" &&
                  editingIndex.index === index ? (
                    <>
                      <BtnWrap>
                        <button onClick={handleEditCancel}>
                          <img src={images.IconClose2} alt="" />
                          취소
                        </button>
                        <button onClick={handleApplyChange}>
                          <img src={images.IconCheck2} alt="" />
                          적용
                        </button>
                      </BtnWrap>
                    </>
                  ) : (
                    <>
                      {isEditingNow && (
                        <>
                          <BtnWrap>
                            <button
                              onClick={() =>
                                handleEditStart("mainFeatures", index)
                              }
                            >
                              <img src={images.IconEdit2} alt="" />
                              수정
                            </button>
                            <button
                              onClick={() =>
                                confirmDelete("targetCustomer", index)
                              }
                            >
                              <img src={images.IconDelete2} alt="" />
                              삭제
                            </button>
                          </BtnWrap>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
            {isAddingNow.section === "mainFeatures" && 
            isAddingNow.isAdding &&
            isEditingNow ? (
              <AddInfo>
                <InputField
                  value={newAddContent}
                  onChange={(e) => {
                    setNewAddContent(e.target.value);
                  }}
                  placeholder="새로운 정보를 추가해보세요"
                />
                <BtnWrap>
                  <button
                    onClick={() =>
                      setIsAddingNow({ section: "", isAdding: false })
                    }
                  >
                    <img src={images.IconClose2} alt="" />
                    취소
                  </button>
                  <button onClick={() => handleAddSave("mainFeatures")}>
                    <img src={images.IconCheck2} alt="" />
                    저장
                  </button>
                </BtnWrap>
              </AddInfo>
            ) : (
              isEditingNow && (
                <button
                  className="moreButton"
                  onClick={() =>
                    setIsAddingNow({ section: "mainFeatures", isAdding: true })
                  }
                >
                  특징 추가하기 +
                </button>
              )
            )}
          </BoxWrap>
          <BoxWrap>
            <strong>
              <img src={images.IconSetting} alt="" />
              주요 기능
            </strong>
            <ul>
              {mainCharacteristicOfBusinessInformation.map((content, index) => (
                <li key={index}>
                  {editingIndex.section === "mainCharacteristic" &&
                  editingIndex.index === index ? (
                    <InputField
                      type="text"
                      value={newEditContent}
                      onChange={(e) => setNewEditContent(e.target.value)}
                    />
                  ) : (
                    <p>{content}</p>
                  )}
                  {editingIndex.section === "mainCharacteristic" &&
                  editingIndex.index === index ? (
                    <>
                      <BtnWrap>
                        <button onClick={handleEditCancel}>
                          <img src={images.IconClose2} alt="" />
                          취소
                        </button>
                        <button onClick={handleApplyChange}>
                          <img src={images.IconCheck2} alt="" />
                          적용
                        </button>
                      </BtnWrap>
                    </>
                  ) : (
                    <>
                      {isEditingNow && (
                        <>
                          <BtnWrap>
                            <button
                              onClick={() =>
                                handleEditStart("mainCharacteristic", index)
                              }
                            >
                              <img src={images.IconEdit2} alt="" />
                              수정
                            </button>
                            <button
                              onClick={() =>
                                confirmDelete("targetCustomer", index)
                              }
                            >
                              <img src={images.IconDelete2} alt="" />
                              삭제
                            </button>
                          </BtnWrap>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
            {isAddingNow.section === "mainCharacteristic" &&
            isAddingNow.isAdding &&
            isEditingNow ? (
              <AddInfo>
                <InputField
                  value={newAddContent}
                  onChange={(e) => {
                    setNewAddContent(e.target.value);
                  }}
                  placeholder="새로운 정보를 추가해보세요"
                />
                <button
                  onClick={() =>
                    setIsAddingNow({ section: "", isAdding: false })
                  }
                >
                  <img src={images.IconClose2} alt="" />
                  취소
                </button>
                <button onClick={() => handleAddSave("mainCharacteristic")}>
                  <img src={images.IconCheck2} alt="" />
                  저장
                </button>
              </AddInfo>
            ) : (
              isEditingNow && (
                <button
                  className="moreButton"
                  onClick={() =>
                    setIsAddingNow({
                      section: "mainCharacteristic",
                      isAdding: true,
                    })
                  }
                >
                  기능 추가하기 +
                </button>
              )
            )}
          </BoxWrap>
          <BoxWrap>
            <strong>
              <img src={images.IconTarget} alt="" />
              목표 고객
            </strong>
            <ul>
              {businessInformationTargetCustomer.map((content, index) => (
                <li key={index}>
                  {editingIndex.section === "targetCustomer" &&
                  editingIndex.index === index ? (
                    <InputField
                      type="text"
                      value={newEditContent}
                      onChange={(e) => setNewEditContent(e.target.value)}
                    />
                  ) : (
                    <p>{content}</p>
                  )}
                  {editingIndex.section === "targetCustomer" &&
                  editingIndex.index === index ? (
                    <>
                      <BtnWrap>
                        <button onClick={handleEditCancel}>
                          <img src={images.IconClose2} alt="" />
                          취소
                        </button>
                        <button onClick={handleApplyChange}>
                          <img src={images.IconCheck2} alt="" />
                          적용
                        </button>
                      </BtnWrap>
                    </>
                  ) : (
                    <>
                      {isEditingNow && (
                        <>
                          <BtnWrap>
                            <button
                              onClick={() =>
                                handleEditStart("targetCustomer", index)
                              }
                            >
                              <img src={images.IconEdit2} alt="" />
                              수정
                            </button>
                            <button
                              onClick={() =>
                                confirmDelete("targetCustomer", index)
                              }
                            >
                              <img src={images.IconDelete2} alt="" />
                              삭제
                            </button>
                          </BtnWrap>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
            {isAddingNow.section === "targetCustomer" &&
            isAddingNow.isAdding &&
            isEditingNow ? (
              <AddInfo>
                <InputField
                  value={newAddContent}
                  onChange={(e) => {
                    setNewAddContent(e.target.value);
                  }}
                  placeholder="새로운 정보를 추가해보세요"
                />
                <button
                  onClick={() =>
                    setIsAddingNow({ section: "", isAdding: false })
                  }
                >
                  <img src={images.IconClose2} alt="" />
                  취소
                </button>
                <button onClick={() => handleAddSave("targetCustomer")}>
                  <img src={images.IconCheck2} alt="" />
                  저장
                </button>
              </AddInfo>
            ) : (
              isEditingNow && (
                <button
                  className="moreButton"
                  onClick={() =>
                    setIsAddingNow({
                      section: "targetCustomer",
                      isAdding: true,
                    })
                  }
                >
                  목표 고객 추가하기 +
                </button>
              )
            )}
          </BoxWrap>
          <p>
            입력된 내용을 바탕으로 위와 같이 이해하고 정리하였습니다.
            확인부탁드립니다.
          </p>
          {warningMessage && <WarningMessage>{warningMessage}</WarningMessage>}{" "}
          {/* 경고 메시지 출력 */}
          <MoleculeReportController
            reportIndex={0}
            conversationId={conversationId}
          />
        </>
      )}
    </AnalysisSection>

    {isPopupOpenDelete && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              togglePopupDelete();
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={togglePopupDelete}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark} alt="" />
            </span>
            <p>
              <strong>정말 삭제하시겠습니까?</strong>
              <span>삭제된 내용은 복구 할 수 없습니다.</span>
            </p>
            <div className="btnWrap">
              <button type="button" onClick={togglePopupDelete}>
                취소
              </button>
              <button type="button" onClick={handleDelete}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default OrganismBizAnalysisSection;

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const TitlePlaceholder = styled.div`
  width: 60%;
  height: 30px;
  background-color: ${palette.lineGray};
  border-radius: 4px;
  animation: ${blinkAnimation} 1.5s ease-in-out infinite;
  margin-bottom: 20px;
`;

const ContentPlaceholder = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${palette.lineGray};
  border-radius: 4px;
  animation: ${blinkAnimation} 1.5s ease-in-out infinite;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 30px;
  }
`;

const AnalysisSection = styled.div`
  position: relative;
  max-width: 1135px;
  width: 91.5%;
  text-align: left;
  margin-top: 25px;
  padding: 30px;
  border-radius: 15px;
  border: 1px solid ${palette.lineGray};

  h1 {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 20px;
  }

  > p {
    font-size: 0.875rem;
    line-height: 1.5;
    margin-top: 30px;

    span {
      color: ${palette.red};
    }
  }
`;

const BoxWrap = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);

  + div {
    margin-top: 12px;
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  li {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding-left: 10px;

    &:before {
      position: absolute;
      left: 0;
      top: 10px;
      // top:50%;
      // transform:translateY(-50%);
      width: 5px;
      height: 1px;
      background: ${palette.darkGray};
      content: "";
    }

    + li {
      margin-top: 5px;
    }

    input[type="text"] {
      height: 30px;
      font-size: 0.875rem;
      padding: 4px 12px;
      border: 0;
    }
  }

  p {
    font-size: 0.875rem;
    color: ${palette.darkGray};
    line-height: 1.5;
  }

  button {
    flex-shrink: 0;
    font-family: "Pretendard";
    font-size: 0;
    color: ${palette.gray};
    padding: 5px 8px;
    border-radius: 5px;
    border: 0;
    background: ${palette.white};

    img {
      width: 14px;
      height: 14px;
    }

    &.add {
      color: ${palette.white};
      border: 1px solid ${palette.black};
      background: ${palette.black};
    }
  }

  .moreButton {
    width: 100%;
    font-size: 0.75rem;
    margin-top: 4px;
    padding: 8px;
    border: 0;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 5px;
  border-radius: 5px;
  // background:${palette.white};

  input[type="text"] {
    height: 30px;
    font-size: 0.875rem;
    padding: 4px 12px;
    border: 0;
  }
`;

const AddInfo = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
  margin-top: 20px;

  input {
    font-size: 0.875rem;
    height: 40px;
    padding: 4px 10px;
    border: 1px solid ${palette.lineGray}; /* 테두리 색상 */
    background-color: ${palette.white}; /* 배경색 */
  }
`;

const WarningMessage = styled.div`
  color: ${palette.red};
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .loader {
    border: 12px solid #f3f3f3; /* Light grey */
    border-top: 12px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Spacing = styled.div`
  margin-bottom: 40px; /* 제목과 본문 사이의 간격 */
`;
const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.5s;
  z-index: 9999;

  .closePopup {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 16px;
    height: 16px;
    font-size: 0;
    padding: 11px;
    border: 0;
    background: none;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 100%;
      border-radius: 10px;
      background: ${palette.black};
      content: "";
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    text-align: center;
    // overflow:hidden;
    padding: 45px 24px 24px;
    border-radius: 10px;
    background: ${palette.white};

    p {
      font-family: "Pretendard", "Poppins";
      font-size: 0.875rem;
      font-weight: 500;
      margin: 20px auto 24px;
    }

    .btnWrap {
      display: flex;
      align-items: center;
      gap: 16px;

      button {
        flex: 1;
        font-family: "Pretendard", "Poppins";
        font-size: 0.875rem;
        font-weight: 600;
        color: ${palette.blue};
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid ${palette.blue};
        background: ${palette.white};

        &:last-child {
          color: ${palette.white};
          background: ${palette.blue};
        }
      }
    }

    ${(props) =>
      props.Cancel &&
      css`
        p {
          strong {
            font-weight: 500;
            display: block;
          }
          span {
            font-size: 0.75rem;
            font-weight: 400;
            color: ${palette.gray500};
            display: block;
            margin-top: 8px;
          }
        }

        .btnWrap {
          padding-top: 16px;
          border-top: 1px solid ${palette.lineGray};

          button {
            font-family: "Pretendard", "Poppins";
            color: ${palette.gray};
            font-weight: 600;
            padding: 0;
            border: 0;
            background: none;

            &:last-child {
              color: ${palette.blue};
              background: none;
            }
          }
        }
      `}
  }
`;
