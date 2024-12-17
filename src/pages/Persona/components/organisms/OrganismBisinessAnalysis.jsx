import React from "react";
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import images from "../../../../assets/styles/Images";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import {
  SkeletonTitle,
  SkeletonLine,
} from "../../../../assets/styles/Skeleton";
import {
  CustomInput,
  CustomTextarea,
} from "../../../../assets/styles/InputStyle";
import {
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  IS_LOADING,
  PERSONA_BUTTON_STATE_1,
  INPUT_BUSINESS_INFO,
  BUSINESS_ANALYSIS,
  CATEGORY_COLOR,
  PROJECT_ID,
  IS_LOGGED_IN,
  IS_EDIT_MODE,
} from "../../../AtomStates";
import AtomPersonaLoader from "../atoms/AtomPersonaLoader";
import { updateProjectOnServer } from "../../../../utils/indexedDB";
// import { updateProjectReportOnServer } from "../../../../utils/indexedDB";

const OrganismBusinessAnalysis = ({ personaStep }) => {
  const [isProjectIdReady, setIsProjectIdReady] = useState(false);
  const [projectId, setprojectId] = useAtom(PROJECT_ID);
  const [isLoggedIn, setIsLoggedIn] = useAtom(IS_LOGGED_IN);
  const navigate = useNavigate();
  const [businessAnalysis, setBusinessAnalysis] = useAtom(BUSINESS_ANALYSIS);
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
    tempMainFeaturesOfBusinessInformation,
    setTempMainFeaturesOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [
    mainCharacteristicOfBusinessInformation,
    setMainCharacteristicOfBusinessInformation,
  ] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [
    tempMainCharacteristicOfBusinessInformation,
    setTempMainCharacteristicOfBusinessInformation,
  ] = useAtom(TEMP_MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [personaButtonState1, setPersonaButtonState1] = useAtom(
    PERSONA_BUTTON_STATE_1
  );
  const [isLoading, setIsLoading] = useAtom(IS_LOADING);
  const [loadingState, setLoadingState] = useState(false);
  const [showCardContent, setShowCardContent] = useState(personaStep <= 2);
  const [categoryColor, setCategoryColor] = useAtom(CATEGORY_COLOR);

  const [isEditMode, setIsEditMode] = useAtom(IS_EDIT_MODE);
  const [inputs, setInputs] = useState({
    field1: {
      value: "",
      isValid: true,
      error: null,
    },
    field2: {
      value: "",
      isValid: true,
      error: null,
    },
    field3: {
      value: "",
    },
  });

  // 입력 상태 확인 함수
  const getInputStatus = (field) => {
    if (field.error) return "error";
    if (field.isValid) return "valid";
    return "normal";
  };

  // 입력 핸들러
  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        isValid: value.length > 0,
        error: value.length === 0 ? "필수 입력 항목입니다." : null,
      },
    }));
  };

  const toggleCardContent = () => {
    setShowCardContent(!showCardContent);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setInputs({
      field1: {
        value: businessAnalysis.title,
        isValid: true,
        error: null,
      },
      field2: {
        value: businessAnalysis.characteristics,
        isValid: true,
        error: null,
      },
      field3: {
        value: businessAnalysis.features,
      },
    });
  };

  const [isPopupRegex, setIsPopupRegex] = useState(false);

  const closePopupRegex = () => {
    setIsPopupRegex(false); // 팝업 닫기
  };

  const handleSaveClick = async () => {
    if (loadingState) {
      return;
    }
    // 입력값 유효성 검사
    const regex = /^[가-힣a-zA-Z0-9\s.,'"?!()\-·%]*$/;
    const specialChars = /^[.,'"?!()\-·%]+$/;
    const consecutiveSpecialChars = /[.,'"?!()\-·%]{2,}/; // 특수문자가 2번 이상 연속되는 패턴

    // 단독으로 특수 문자만 사용된 경우
    if (
      specialChars.test(inputs.field1.value) ||
      specialChars.test(inputs.field2.value)
    ) {
      setIsPopupRegex(true);
      return;
    }

    // 연속된 특수문자 체크
    if (
      consecutiveSpecialChars.test(inputs.field1.value) ||
      consecutiveSpecialChars.test(inputs.field2.value)
    ) {
      setIsPopupRegex(true);
      return;
    }

    // 입력 값에 대한 정규식 체크
    if (!regex.test(inputs.field1.value) || !regex.test(inputs.field2.value)) {
      setIsPopupRegex(true);
      return;
    }

    if (inputs.field1.value && inputs.field2.value) {
      // 새로운 비즈니스 분석 데이터 생성
      const updatedBusinessAnalysis = {
        input: inputs.field1.value,
        title: inputs.field1.value,
        characteristics: inputs.field2.value,
        features: inputs.field3.value,
      };

      await updateProjectOnServer(
        projectId,
        {
          businessAnalysis: updatedBusinessAnalysis
        },
        isLoggedIn
      );

      // 상태 업데이트
      setBusinessAnalysis(updatedBusinessAnalysis);

      // 대화 저장

      setIsEditMode(false);
    }
  };

  const handleUndoClick = () => {
    setInputs((prev) => ({
      ...prev,
      field1: {
        ...prev.field1,
        value: businessAnalysis.title,
      },
      field2: {
        ...prev.field2,
        value: businessAnalysis.characteristics,
      },
      field3: {
        ...prev.field3,
        value: businessAnalysis.features,
      },
    }));
  };

  const handleAIDetailClick = async () => {
    // setPersonaButtonState1(1);
    let businessData;
    let categoryData;
    let attempts = 0;
    const maxAttempts = 5;

    try {
      setIsLoading(true);
      setLoadingState(true);

      const data = {
        business_analysis_data: {
          title: inputs.field1.value,
          characteristics: inputs.field2.value,
          features: inputs.field3.value,
        },
        keyword: inputs.field2.value,
      };
      let response = await axios.post(
        "https://wishresearch.kr/person/business_category_modify",
        data,
        axiosConfig
      );

      // // 필요한 데이터가 없을 경우 재시도, 최대 5번
      // while (
      //     attempts < maxAttempts && (
      //     !response || !response.data || typeof response.data !== "object" ||
      //     !response.data.hasOwnProperty("business_analysis") ||
      //     !response.data.hasOwnProperty("category") ||
      //     !response.data.business_analysis.hasOwnProperty("명칭") ||
      //     !response.data.business_analysis.hasOwnProperty("주요_목적_및_특징") ||
      //     !response.data.business_analysis.hasOwnProperty("주요기능") ||
      //     !response.data.business_analysis["명칭"] ||
      //     !response.data.business_analysis["주요_목적_및_특징"].length ||
      //     !response.data.business_analysis["주요기능"].length ||
      //     !response.data.category.hasOwnProperty("first") ||
      //     !response.data.category.hasOwnProperty("second") ||
      //     !response.data.category.hasOwnProperty("third") ||
      //     !response.data.category.first ||
      //     !response.data.category.second ||
      //     !response.data.category.third
      // )
      // ) {
      //   attempts += 1;

      //   response = await axios.post(
      //     "https://wishresearch.kr/person/business_category",
      //     data,
      //     axiosConfig
      //   );
      // }

      businessData = response.data.business_analysis;
      categoryData = response.data.category;

      if (attempts >= maxAttempts) {
        navigate("/Main");
      } else {
        setInputs((prev) => ({
          ...prev,
          field2: {
            ...prev.field2,
            value: businessData["추가_주요_목적_및_특징"],
          },
          field3: {
            value: businessData["추가_주요기능"],
          },
        }));
      }
      setCategoryColor({
        first: getCategoryColor(categoryData.first),
        second: getCategoryColor(categoryData.second),
        third: getCategoryColor(categoryData.third),
      });
    } catch (error) {
      console.error("Error in handleRegenerate:", error);
    } finally {
      // setPersonaButtonState1(0);
      setIsLoading(false);
      setLoadingState(false);
    }
  };

  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 200), 500);
      textarea.style.height = newHeight + "px";
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [inputs.field2.value]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "광고/마케팅":
        return "Red";
      case "교육":
        return "LavenderMagenta";
      case "금융/보험/핀테크":
        return "Amethyst";
      case "게임":
        return "VistaBlue";
      case "모빌리티/교통":
        return "BlueYonder";
      case "물류":
        return "MidnightBlue";
      case "부동산/건설":
        return "ButtonBlue";
      case "뷰티/화장품":
        return "ButtonBlue";
      case "AI/딥테크/블록체인":
        return "MiddleBlueGreen";
      case "소셜미디어/커뮤니티":
        return "GreenSheen";
      case "여행/레저":
        return "TropicalRainForest";
      case "유아/출산":
        return "DollarBill";
      case "인사/비즈니스/법률":
        return "Olivine";
      case "제조/하드웨어":
        return "ChineseGreen";
      case "커머스":
        return "Jonquil";
      case "콘텐츠/예술":
        return "PastelOrange";
      case "통신/보안/데이터":
        return "Tangerine";
      case "패션":
        return "Copper";
      case "푸드/농업":
        return "Shadow";
      case "환경/에너지":
        return "Tuscany";
      case "홈리빙/펫":
        return "VeryLightTangelo";
      case "헬스케어/바이오":
        return "Orange";
      case "피트니스/스포츠":
        return "CarnationPink";
      default:
        return "";
    }
  };

  const axiosConfig = {
    timeout: 100000, // 100초
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 포함 요청 (필요한 경우)
  };

  const data = {
    business_idea: businessAnalysis.input,
  };

  useEffect(() => {
    if (projectId) {
      setIsProjectIdReady(true);
    }
  }, [projectId]);

  useEffect(() => {
    const loadBusinessAnalysis = async () => {
      if (!isProjectIdReady) return;

      let businessData;
      let categoryData;
      let attempts = 0;
      const maxAttempts = 5;

      try {
        if (personaButtonState1 === 1) {
          console.log(
            "🚀 ~ loadBusinessAnalysis ~ personaButtonState1:",
            personaButtonState1
          );
          setIsLoading(true);
          // 버튼 클릭으로 API 호출
          let response = await axios.post(
            "https://wishresearch.kr/person/business_category",
            data,
            axiosConfig
          );

          // 필요한 데이터가 없을 경우 재시도, 최대 5번
          while (
            attempts < maxAttempts &&
            (!response ||
              !response.data ||
              typeof response.data !== "object" ||
              !response.data.hasOwnProperty("business_analysis") ||
              !response.data.hasOwnProperty("category") ||
              !response.data.business_analysis.hasOwnProperty("명칭") ||
              !response.data.business_analysis.hasOwnProperty(
                "주요_목적_및_특징"
              ) ||
              !response.data.business_analysis.hasOwnProperty("주요기능") ||
              !response.data.business_analysis["명칭"] ||
              !response.data.business_analysis["주요_목적_및_특징"].length ||
              !response.data.business_analysis["주요기능"].length ||
              !response.data.category.hasOwnProperty("first") ||
              !response.data.category.first)
          ) {
            attempts += 1;

            response = await axios.post(
              "https://wishresearch.kr/person/business_category",
              data,
              axiosConfig
            );
          }

          businessData = response.data.business_analysis;
          categoryData = response.data.category;

          const updatedBusinessAnalysis = {
            input: businessAnalysis.input,
            title: businessData["명칭"],
            characteristics: businessData["주요_목적_및_특징"],
            features: businessData["주요기능"],
            category: categoryData,
          };

          if (attempts >= maxAttempts) {
            navigate("/Main");
          } else {
            setBusinessAnalysis(updatedBusinessAnalysis);
            await updateProjectOnServer(
              projectId,
              {
                businessAnalysis: updatedBusinessAnalysis,
              },
              isLoggedIn
            );
          }
        }
        setCategoryColor({
          first: getCategoryColor(categoryData.first),
          second: getCategoryColor(categoryData.second),
          third: getCategoryColor(categoryData.third),
        });
      } catch (error) {
        console.error("Error in loadAndSaveData:", error);
      } finally {
        setPersonaButtonState1(0);
        setIsLoading(false);
      }
    };
    if (isProjectIdReady) {
      loadBusinessAnalysis();
    }
  }, [isProjectIdReady, personaButtonState1]);

  const handleRegenerate = async () => {
    setPersonaButtonState1(1);
    let businessData;
    let categoryData;
    let attempts = 0;
    const maxAttempts = 5;

    try {
      setIsLoading(true);
      // 버튼 클릭으로 API 호출
      let response = await axios.post(
        "https://wishresearch.kr/person/business_category",
        data,
        axiosConfig
      );

      // 필요한 데이터가 없을 경우 재시도, 최대 5번
      while (
        attempts < maxAttempts &&
        (!response ||
          !response.data ||
          typeof response.data !== "object" ||
          !response.data.hasOwnProperty("business_analysis") ||
          !response.data.hasOwnProperty("category") ||
          !response.data.business_analysis.hasOwnProperty("명칭") ||
          !response.data.business_analysis.hasOwnProperty(
            "주요_목적_및_특징"
          ) ||
          !response.data.business_analysis.hasOwnProperty("주요기능") ||
          !response.data.business_analysis["명칭"] ||
          !response.data.business_analysis["주요_목적_및_특징"].length ||
          !response.data.business_analysis["주요기능"].length ||
          !response.data.category.hasOwnProperty("first") ||
          !response.data.category.first)
      ) {
        attempts += 1;

        response = await axios.post(
          "https://wishresearch.kr/person/business_category",
          data,
          axiosConfig
        );
      }

      businessData = response.data.business_analysis;
      categoryData = response.data.category;

      const updatedBusinessAnalysis = {
        input: businessAnalysis.input,
        title: businessData["명칭"],
        characteristics: businessData["주요_목적_및_특징"],
        features: businessData["주요기능"],
        category: categoryData,
      };
      if (attempts >= maxAttempts) {
        navigate("/Main");
      } else {
        setBusinessAnalysis(updatedBusinessAnalysis);
      }
      setCategoryColor({
        first: getCategoryColor(categoryData.first),
        second: getCategoryColor(categoryData.second),
        third: getCategoryColor(categoryData.third),
      });
      await updateProjectOnServer(
        projectId,
        {
          businessAnalysis: updatedBusinessAnalysis,
        },
        isLoggedIn
      );
    } catch (error) {
      console.error("Error in handleRegenerate:", error);
    } finally {
      setPersonaButtonState1(0);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Title>
        <h3>비즈니스 분석</h3>
        {!personaButtonState1 && personaStep === 1 && (
          <ButtonGroup>
            {isEditMode ? (
              <IconButton onClick={handleSaveClick}>
                <img src={images.FolderArrowDown} alt="저장하기" />
                <span>저장하기</span>
              </IconButton>
            ) : (
              <>
                <IconButton onClick={handleRegenerate}>
                  <img src={images.IconRepeatSquare} alt="재생성" />
                  <span>재생성하기</span>
                </IconButton>
                <IconButton onClick={handleEditClick}>
                  <img src={images.PencilSquare} alt="수정하기" />
                  <span>수정하기</span>
                </IconButton>
              </>
            )}
          </ButtonGroup>
        )}
      </Title>
      {personaButtonState1 ? (
        <Card>
          <AtomPersonaLoader message="비즈니스를 분석하고 있어요..." />
        </Card>
      ) : isEditMode ? (
        <Card Edit>
          <FormEdit>
            <span>비즈니스 명</span>
            <FormBox status={getInputStatus(inputs.field1)}>
              <CustomInput
                Edit
                type="text"
                placeholder="비즈니스 명을 입력해주세요."
                value={inputs.field1.value}
                onChange={(e) => handleChange(e, "field1")}
                status={getInputStatus(inputs.field1)}
              />
            </FormBox>
          </FormEdit>

          <FormEdit>
            <span>태그</span>
            <FormBox>
              <TagWrap>
                <Tag color={categoryColor.first} />
                <Tag color={categoryColor.second} />
                <Tag color={categoryColor.third} />
              </TagWrap>
            </FormBox>
          </FormEdit>

          <FormEdit>
            <span>비즈니스 설명</span>
            <FormBox status={getInputStatus(inputs.field2)}>
              {loadingState ? (
                <>
                  <SkeletonLine />
                  <SkeletonLine />
                </>
              ) : (
                <>
                  <CustomTextarea
                    Edit
                    ref={textareaRef}
                    value={inputs.field2.value}
                    onChange={(e) => {
                      handleChange(e, "field2");
                      adjustHeight();
                    }}
                    status={getInputStatus(inputs.field2)}
                  />

                  <EditButtonGroup>
                    <IconButton onClick={handleUndoClick}>
                      <img src={images.ClockCounterclockwise} alt="" />
                      <span>이전으로 되돌리기</span>
                    </IconButton>
                    <IconButton onClick={handleAIDetailClick}>
                      <img src={images.MagicStick} alt="" />
                      <span>AI로 다듬기</span>
                    </IconButton>
                  </EditButtonGroup>
                </>
              )}
            </FormBox>
          </FormEdit>
        </Card>
      ) : (
        <Card>
          <CardTitle>
            <h2>{businessAnalysis.title}</h2>
            <TagWrap>
              <Tag color={categoryColor.first} />
              <Tag color={categoryColor.second} />
              <Tag color={categoryColor.third} />
            </TagWrap>
            {personaStep > 2 && (
              <ToggleButton
                showContent={showCardContent}
                onClick={toggleCardContent}
              >
                {showCardContent ? "" : ""}
              </ToggleButton>
            )}
          </CardTitle>
          {showCardContent && (
            <CardContent>
              <p>{businessAnalysis.characteristics}</p>
            </CardContent>
          )}
        </Card>
      )}
      {isPopupRegex && (
        <Popup
          Cancel
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePopupRegex(); // 상태를 false로 설정
            }
          }}
        >
          <div>
            <button
              type="button"
              className="closePopup"
              onClick={closePopupRegex}
            >
              닫기
            </button>
            <span>
              <img src={images.ExclamationMark2} alt="" />
            </span>
            <p>
              한글, 영문 외 특수문자는 입력할 수 없어요. 자음이나 모음만 입력한
              경우 검색이 제한되니, 문장을 완전하게 입력해주세요.
            </p>
            <div className="btnWrap">
              <button type="button" onClick={closePopupRegex}>
                확인
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default OrganismBusinessAnalysis;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => {
    if (props.Column) return `column`;
    else return `row`;
  }};
  align-items: ${(props) => {
    if (props.Column) return `flex-start`;
    else return `center`;
  }};
  gap: ${(props) => {
    if (props.Column) return `8px`;
    else return `0`;
  }};
  width: 100%;

  h3 {
    font-weight: 500;
    color: ${palette.gray800};
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 0.88rem;
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray500};

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      color: ${palette.primary};
      cursor: pointer;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const EditButtonGroup = styled(ButtonGroup)`
  justify-content: end;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: "Pretendard", "Poppins";
  font-size: 0.75rem;
  color: ${palette.primary};
  padding: 4px 8px;
  border: none;
  background: none;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
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

const CardTitle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${palette.gray800};
  }
`;

const FormEdit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  > span {
    font-weight: 300;
    line-height: 1.5;
    color: ${palette.gray700};
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.status === "error" ? palette.error : palette.outlineGray};
  transition: all 0.5s;

  &:focus-within {
    border: 1px solid ${palette.primary};
    box-shadow: 0 0 8px 0 rgba(34, 111, 255, 0.5);
  }
`;

const TagWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 0.88rem;
  line-height: 1.5;
  padding: 4px 12px;
  border-radius: 15px;

  &::before {
    content: "${(props) => {
      switch (props.color) {
        case "Red":
          return "광고, 마케팅";
        case "LavenderMagenta":
          return "교육";
        case "Amethyst":
          return "금융, 보험, 핀테크";
        case "VistaBlue":
          return "게임";
        case "BlueYonder":
          return "모빌리티, 교통";
        case "MidnightBlue":
          return "물류";
        case "ButtonBlue":
          return "부동산, 건설";
        case "ButtonBlue":
          return "뷰티, 화장품";
        case "MiddleBlueGreen":
          return "AI, 딥테크, 블록체인";
        case "GreenSheen":
          return "소셜미디어, 커뮤니티";
        case "TropicalRainForest":
          return "여행, 레저";
        case "DollarBill":
          return "유아 출산";
        case "Olivine":
          return "인사, 비즈니스, 법률";
        case "ChineseGreen":
          return "제조, 하드웨어";
        case "Jonquil":
          return "커머스";
        case "PastelOrange":
          return "콘텐츠, 예술";
        case "Tangerine":
          return "통신, 보안, 데이터";
        case "Copper":
          return "패션";
        case "Shadow":
          return "푸드, 농업";
        case "Tuscany":
          return "환경, 에너지";
        case "VeryLightTangelo":
          return "홈 리빙, 펫";
        case "Orange":
          return "헬스케어, 바이오";
        case "CarnationPink":
          return "피트니스, 스포츠";
        default:
          return "";
      }
    }}";
  }

  ${({ color }) => {
    switch (color) {
      case "Red":
        return `
          color: #E90102;
          background: rgba(233, 1, 2, 0.06);
        `;
      case "LavenderMagenta":
        return `
          color: #ED7EED;
          background: rgba(237, 126, 237, 0.06);
        `;
      case "Amethyst":
        return `
          color: #8B61D1;
          background: rgba(139, 97, 209, 0.06);
        `;
      case "VistaBlue":
        return `
          color: #8B61D1;
          background: rgba(125, 140, 225, 0.06);
        `;
      case "BlueYonder":
        return `
          color: #8B61D1;
          background: rgba(84, 113, 171, 0.06);
        `;
      case "MidnightBlue":
        return `
          color: #03458F;
          background: rgba(3, 69, 143, 0.06);
        `;
      case "ButtonBlue":
        return `
          color: #20B1EA;
          background: rgba(32, 177, 234, 0.06);
        `;
      case "CeruleanFrost":
        return `
          color: #5E9EBF;
          background: rgba(94, 158, 191, 0.06);
        `;
      case "MiddleBlueGreen":
        return `
          color: #7DCED2;
          background: rgba(125, 206, 210, 0.06);

        `;
      case "GreenSheen":
        return `
          color: #74B49C;
          background: rgba(116, 180, 156, 0.06);
        `;
      case "TropicalRainForest":
        return `
          color: #027355;
          background: rgba(2, 115, 85, 0.06);
        `;
      case "DollarBill":
        return `
          color: #8DC955;
          background: rgba(141, 201, 85, 0.06);
        `;
      case "Olivine":
        return `
          color: #AABC76;
          background: rgba(170, 188, 118, 0.06);
        `;
      case "ChineseGreen":
        return `
          color: #C7D062;
          background: rgba(199, 208, 98, 0.06);
        `;
      case "Jonquil":
        return `
          color: #F7CD17;
          background: rgba(247, 205, 23, 0.06);
        `;
      case "PastelOrange":
        return `
          color: #FFBB52;
          background: rgba(255, 187, 82, 0.06);
        `;
      case "Tangerine":
        return `
          color: #F48D0B;
          background: rgba(244, 141, 11, 0.06);
        `;
      case "Copper":
        return `
          color: #BC742F;
          background: rgba(188, 116, 47, 0.06);
        `;
      case "Shadow":
        return `
          color: #8C725B;
          background: rgba(140, 114, 91, 0.06);
        `;
      case "Tuscany":
        return `
          color: #B1A098;
          background: rgba(177, 160, 152, 0.06);
        `;
      case "VeryLightTangelo":
        return `
          color: #FAAD80;
          background: rgba(250, 173, 128, 0.06);
        `;
      case "Orange":
        return `
          color: #FC6602;
          background: rgba(252, 102, 2, 0.06);
        `;
      case "CarnationPink":
        return `
          color: #FFA8B9;
          background: rgba(255, 168, 185, 0.06);
        `;
      default:
        return "";
    }
  }}
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: "Pretendard", "Poppins";
  font-size: 0.75rem;
  color: ${palette.primary};
  padding: 4px 8px;
  border-radius: 100px;
  border: none;
  background: ${palette.white};
  cursor: pointer;

  &:before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: ${(props) =>
      props.showContent
        ? "translate(-50%, -50%) rotate(225deg)"
        : "translate(-50%, -50%) rotate(45deg)"};
    width: 10px;
    height: 10px;
    border-bottom: 2px solid ${palette.gray500};
    border-right: 2px solid ${palette.gray500};
    transition: all 0.5s;
    content: "";
  }
`;

const CardContent = styled.div`
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;

  p + p {
    margin-top: 20px;
  }
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
      line-height: 1.5;
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
