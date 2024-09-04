import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  INPUT_BUSINESS_INFO,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER,
  APPROACH_PATH,
  STRATEGY_REPORT_DATA,
  SELECTED_ADDITIONAL_KEYWORD,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  ADDITIONAL_REPORT_DATA,  // Import the new list-based atom
  CONVERSATION_STAGE,
  ADDITIONAL_QUESTION_1,
  ADDITIONAL_QUESTION_2,
  ADDITIONAL_QUESTION_3,
  iS_CLICK_CHECK_REPORT_RIGHTAWAY,
  CONVERSATION,
  BUTTON_STATE,
  isLoggedInAtom,
} from '../../../AtomStates';

import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';
import { createChatOnServer } from '../../../../utils/indexedDB'; // 서버와 대화 ID 생성 함수

import OrganismLeftSideBar from '../organisms/OrganismLeftSideBar';
import OrganismRightSideBar from '../organisms/OrganismRightSideBar';
import OrganismBizAnalysisSection from '../organisms/OrganismBizAnalysisSection';
import OrganismStrategyReportSection from '../organisms/OrganismStrategyReportSection';
import OrganismSearchBottomBar from '../organisms/OrganismSearchBottomBar';
import MoleculeBizName from '../molecules/MoleculeBizName';
import MoleculeSystemMessage from '../molecules/MoleculeSystemMessage';
import MoleculeUserMessage from '../molecules/MoleculeUserMessage';
import OrganismBizExpertSelect from '../organisms/OrganismBizExpertSelect';
import MoleculeAdditionalKeyword from '../molecules/MoleculeAdditionalKeyword';
import OrganismAdditionalReport from '../organisms/OrganismAdditionalReport';
import MoleculeCheckReportRightAway from '../molecules/MoleculeCheckReportRightAway';

const PageExpertInsight = () => {
  const navigate = useNavigate();
  const { conversationId: paramConversationId } = useParams();
  const [conversationId, setConversationId] = useState(paramConversationId || nanoid());
  const [conversation, setConversation] = useAtom(CONVERSATION);
  const [conversationStage, setConversationStage] = useAtom(CONVERSATION_STAGE);
  const [inputBusinessInfo, setInputBusinessInfo] = useAtom(INPUT_BUSINESS_INFO);
  const [titleOfBusinessInfo, setTitleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [selectedExpertIndex] = useAtom(SELECTED_EXPERT_INDEX);
  const [sections, setSections] = useState([]);
  const [additionalReportCount, setAdditionalReportCount] = useState(0);
  const [selectedAdditionalKeyword, setSelectedAdditionalKeyword] = useAtom(SELECTED_ADDITIONAL_KEYWORD);
  const [approachPath] = useAtom(APPROACH_PATH);

  const [additionalReportData, setAdditionalReportData] = useAtom(ADDITIONAL_REPORT_DATA);  // Use the new list-based atom

  const [expert1ReportData, setExpert1ReportData] = useAtom(EXPERT1_REPORT_DATA);
  const [expert2ReportData, setExpert2ReportData] = useAtom(EXPERT2_REPORT_DATA);
  const [expert3ReportData, setExpert3ReportData] = useAtom(EXPERT3_REPORT_DATA);

  const [addtionalQuestion1, setAddtionalQuestion1] = useAtom(ADDITIONAL_QUESTION_1);
  const [addtionalQuestion2, setAddtionalQuestion2] = useAtom(ADDITIONAL_QUESTION_2);
  const [addtionalQuestion3, setAddtionalQuestion3] = useAtom(ADDITIONAL_QUESTION_3);

  const [inputAdditionalQuestion, setInputAdditionalQuestion] = useState("");
  const [isClickCheckReportRightAway, setIsClickCheckReportRightAway] = useAtom(iS_CLICK_CHECK_REPORT_RIGHTAWAY);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);
  const [isLoggedIn] = useAtom(isLoggedInAtom); // 로그인 상태 확인

  // 현재 선택된 전문가에 맞는 보고서 데이터를 결정
  const getStrategyReportData = () => {
    switch (selectedExpertIndex) {
      case 1:
        return expert1ReportData;
      case 2:
        return expert2ReportData;
      case 3:
        return expert3ReportData;
      default:
        return {};
    }
  };

  const setStrategyReportData = (data) => {
    switch (selectedExpertIndex) {
      case 1:
        setExpert1ReportData(data);
        break;
      case 2:
        setExpert2ReportData(data);
        break;
      case 3:
        setExpert3ReportData(data);
        break;
      default:
        break;
    }
  };

  // const setAdditionalReportData = (data) => {
  //   switch (selectedExpertIndex) {
  //     case 1:
  //       setAdditionalReportData1(data);
  //       break;
  //     case 2:
  //       setAdditionalReportData2(data);
  //       break;
  //     case 3:
  //       setAdditionalReportData3(data);
  //       break;
  //     default:
  //       break;
  //   }
  // };


  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const saveConversation = (updatedConversation, newConversationStage) => {
    const existingReports = {
      strategyReportData_EX1: expert1ReportData,
      strategyReportData_EX2: expert2ReportData,
      strategyReportData_EX3: expert3ReportData,
    };

    saveConversationToIndexedDB({
      id: conversationId,
      conversation: updatedConversation,
      conversationStage: newConversationStage,
      inputBusinessInfo,
      analysisReportData,
      selectedAdditionalKeyword,
      additionalReportData,  // Save the entire list of additional reports
      ...existingReports,
      timestamp: Date.now(),
    });
  };

// =======
//   // // 현재 선택된 전문가에 맞는 보고서 데이터를 결정
//   // const getStrategyReportData = () => {
//   //   switch (selectedExpertIndex) {
//   //     case 1:
//   //       return expert1ReportData;
//   //     case 2:
//   //       return expert2ReportData;
//   //     case 3:
//   //       return expert3ReportData;
//   //     default:
//   //       return {};
//   //   }
//   // };

//   // const setStrategyReportData = (data) => {
//   //   switch (selectedExpertIndex) {
//   //     case 1:
//   //       setExpert1ReportData(data);
//   //       break;
//   //     case 2:
//   //       setExpert2ReportData(data);
//   //       break;
//   //     case 3:
//   //       setExpert3ReportData(data);
//   //       break;
//   //     default:
//   //       break;
//   //   }
//   // };

//   // const setAdditionalReportData = (data) => {
//   //   switch (selectedExpertIndex) {
//   //     case 1:
//   //       setAdditionalReportData1(data);
//   //       break;
//   //     case 2:
//   //       setAdditionalReportData2(data);
//   //       break;
//   //     case 3:
//   //       setAdditionalReportData3(data);
//   //       break;
//   //     default:
//   //       break;
//   //   }
//   // };
  
//   const analysisReportData = {
//     title: titleOfBusinessInfo,
//     mainFeatures: mainFeaturesOfBusinessInformation,
//     mainCharacter: mainCharacteristicOfBusinessInformation,
//     mainCustomer: businessInformationTargetCustomer,
//   };

//   const saveConversation = (updatedConversation, newConversationStage) => {
//     const existingReports = {
//       strategyReportData_EX1: expert1ReportData,
//       strategyReportData_EX2: expert2ReportData,
//       strategyReportData_EX3: expert3ReportData,
//     };
//     console.log(inputBusinessInfo);
//     saveConversationToIndexedDB({
//       id: conversationId,
//       conversation: updatedConversation,
//       conversationStage: newConversationStage,
//       inputBusinessInfo : inputBusinessInfo,
//       analysisReportData,
//       selectedAdditionalKeyword,
//       additionalReportData,  // Save the entire list of additional reports
//       ...existingReports,
//       timestamp: Date.now(),
//     });
//   };

// >>>>>>> main
  useEffect(() => {
    const loadConversation = async () => {
      if (!paramConversationId) {
        if (isLoggedIn) {
          try {
            // 서버에서 새로운 대화 ID를 생성하고 설정
            const newConversationId = await createChatOnServer();
            setConversationId(newConversationId);
            navigate(`/conversation/${newConversationId}`, { replace: true });
          } catch (error) {
            console.error('Failed to create conversation on server:', error);
            // 서버에서 ID를 가져오지 못했을 경우 로컬 ID 사용
            navigate(`/conversation/${conversationId}`, { replace: true });
          }
        } else {
          navigate(`/conversation/${conversationId}`, { replace: true });
        }
      } else {
        const savedConversation = await getConversationByIdFromIndexedDB(conversationId);
        if (savedConversation) {
          // 복구된 데이터를 로컬 상태로 설정
          setConversation(savedConversation.conversation);
          setConversationStage(savedConversation.conversationStage);
          setInputBusinessInfo(savedConversation.inputBusinessInfo);

  
          // 전략 보고서 데이터를 복구
          setExpert1ReportData(savedConversation.strategyReportData_EX1 || {});
          setExpert2ReportData(savedConversation.strategyReportData_EX2 || {});
          setExpert3ReportData(savedConversation.strategyReportData_EX3 || {});
  
          setAdditionalReportData(savedConversation.additionalReportData || []);
          setSelectedAdditionalKeyword(savedConversation.selectedAdditionalKeyword || ["", "", ""]);
  
          // 복구된 conversationStage가 올바른지 확인
          if (savedConversation.conversationStage === 1) {
            const initialMessage = getInitialSystemMessage();
            setConversation([{ type: 'system', message: initialMessage }]);
          }
        } else {
          if (selectedExpertIndex) {
            const initialMessage = getInitialSystemMessage();
            setConversation([{ type: 'system', message: initialMessage }]);
          }
        }
      }
    };
  
    loadConversation();
  }, [
    paramConversationId,
    conversationId,
    conversation,
    navigate,
    selectedExpertIndex,
    setExpert1ReportData,
    setExpert2ReportData,
    setExpert3ReportData,
    setAdditionalReportData,
    setSelectedAdditionalKeyword,
    setConversation,
    setConversationStage,
  ]);
  
  

  // useEffect(() => {
  //   const loadConversationOther = async () => {
  //     const savedConversation = await getConversationByIdFromIndexedDB(conversationId);
  //     if (savedConversation) {
  //         const analysisData = savedConversation.analysisReportData || {};
  //         setTitleOfBusinessInfo(analysisData.title || "");
  //         setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
  //         setMainCharacteristicOfBusinessInformation(analysisData.mainCharacter || []);
  //         setBusinessInformationTargetCustomer(analysisData.mainCustomer || []);
  //     }
  //   }
  //   loadConversationOther();
  // }, [navigate]);
// =======
  
//           // 전략 보고서 데이터를 복구
//           setExpert1ReportData(savedConversation.strategyReportData_EX1 || {});
//           setExpert2ReportData(savedConversation.strategyReportData_EX2 || {});
//           setExpert3ReportData(savedConversation.strategyReportData_EX3 || {});
  
//           setAdditionalReportData(savedConversation.additionalReportData || []);
//           setSelectedAdditionalKeyword(savedConversation.selectedAdditionalKeyword || ["", "", ""]);
  
//           // 복구된 conversationStage가 올바른지 확인
//           if (savedConversation.conversationStage === 1) {
//             const initialMessage = getInitialSystemMessage();
//             setConversation([{ type: 'system', message: initialMessage }]);
//           }
//         } else {
//           if (selectedExpertIndex) {
//             const initialMessage = getInitialSystemMessage();
//             setConversation([{ type: 'system', message: initialMessage }]);
//           }
//         }
//       }
//     };
  
//     loadConversation();
//   }, [
//     paramConversationId,
//     conversationId,
//     conversation,
//     navigate,
//     selectedExpertIndex,
//     setExpert1ReportData,
//     setExpert2ReportData,
//     setExpert3ReportData,
//     setAdditionalReportData,
//     setSelectedAdditionalKeyword,
//     setConversation,
//     setConversationStage,
//   ]);
  
//   useEffect(() => {
//     const loadConversationOther = async () => {
//       const savedConversation = await getConversationByIdFromIndexedDB(conversationId);
//       if (savedConversation) {
//           const analysisData = savedConversation.analysisReportData || {};
//           setTitleOfBusinessInfo(analysisData.title || "");
//           setMainFeaturesOfBusinessInformation(analysisData.mainFeatures || []);
//           setMainCharacteristicOfBusinessInformation(analysisData.mainCharacter || []);
//           setBusinessInformationTargetCustomer(analysisData.mainCustomer || []);
//       }
//     }
//     loadConversationOther();
//   }, [navigate]);
// >>>>>>> main

// const resetConversationState = () => {
//   setTitleOfBusinessInfo("");
//   setMainFeaturesOfBusinessInformation([]);
//   setMainCharacteristicOfBusinessInformation([]);
//   setBusinessInformationTargetCustomer([]);
//   setExpert1ReportData({});
//   setExpert2ReportData({});
//   setExpert3ReportData({});
//   setAdditionalReportData1({});
//   setAdditionalReportData2({});
//   setAdditionalReportData3({});
//   setConversation([]); // 대화 초기화
//   setConversationStage(1); // 초기 대화 단계 설정
//   setAdditionalReportData({});
// };

//   // 검색을 통해 들어왔으면 handleSearch 실행
//   useEffect(() => {
//     if (approachPath === -1) {
//       handleSearch(-1);
//     } else if (approachPath === 1) {
//       setInputBusinessInfo("");
//       const initialMessage = getInitialSystemMessage();
//       setConversation([{ type: 'system', message: initialMessage }]);
//     }
//   }, [approachPath, selectedExpertIndex]);

//   useEffect(() => {
//     if (selectedAdditionalKeyword[selectedExpertIndex - 1]) handleSearch(-1);
//   }, [
//     selectedAdditionalKeyword,
//   ]);

//   useEffect(() => {
//     if(approachPath) handleSearch(-1);
//   },[selectedExpertIndex])

//   // useEffect(() => {
//   //   if(selectedAdditionalKeyword1 || selectedAdditionalKeyword2 || selectedAdditionalKeyword3) handleSearch(-1);
//   // },[
//   //   selectedAdditionalKeyword1,
//   //   selectedAdditionalKeyword2,
//   //   selectedAdditionalKeyword3,
//   // ])
// >>>>>>> main

  // 검색을 통해 들어왔으면 handleSearch 실행
  useEffect(() => {

    if (approachPath === -1) {
      handleSearch(-1);
    } else if (approachPath === 1) {
      setInputBusinessInfo("");
      const initialMessage = getInitialSystemMessage();
      setConversation([{ type: 'system', message: initialMessage }]);
    }
  }, [approachPath, selectedExpertIndex]);

  useEffect(() => {
    if (selectedAdditionalKeyword[selectedExpertIndex - 1]) handleSearch(-1);
  }, [
    selectedAdditionalKeyword,
  ]);

  useEffect(() => {
    if(approachPath) handleSearch(-1);
  },[selectedExpertIndex])

  // useEffect(() => {
  //   if(selectedAdditionalKeyword1 || selectedAdditionalKeyword2 || selectedAdditionalKeyword3) handleSearch(-1);
  // },[
  //   selectedAdditionalKeyword1,
  //   selectedAdditionalKeyword2,
  //   selectedAdditionalKeyword3,
  // ])

  useEffect(() => {
    if(isClickCheckReportRightAway) handleSearch(-1);
  },[isClickCheckReportRightAway])

  // // 추가 질문 입력 API
  // const fetchInputAdditionalQuestion = async ({ input }) => {
  //   console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
  //   try {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_SERVER_URL}/${input}`
  //   );
  //   console.log(response);
  //   setInputAdditionalQuestion(response.data);

  //   if(selectedExpertIndex === 1) setSelectedAdditionalKeyword1(inputAdditionalQuestion);
  //   else if(selectedExpertIndex === 2) setSelectedAdditionalKeyword2(inputAdditionalQuestion);
  //   else setSelectedAdditionalKeyword3(inputAdditionalQuestion);

  //   } catch (error) {
  //     console.error("Error fetching ...:", error);
  //   } finally {
  //   }
  // };  

  const handleSearch = (inputValue) => {
    const updatedConversation = [...conversation];

    // 사용자가 입력한 경우에만 inputBusinessInfo를 업데이트
    if (conversationStage < 3 && inputValue !== -1) {
      setButtonState(1);
      setInputBusinessInfo(inputValue);
      console.log(inputValue);
      updatedConversation.push({ type: 'user', message: inputValue });
    }
// =======
//     if(isClickCheckReportRightAway) handleSearch(-1);
//   },[isClickCheckReportRightAway])

//   // // 추가 질문 입력 API
//   // const fetchInputAdditionalQuestion = async ({ input }) => {
//   //   console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
//   //   try {
//   //   const response = await axios.get(
//   //     `${process.env.REACT_APP_SERVER_URL}/${input}`
//   //   );
//   //   console.log(response);
//   //   setInputAdditionalQuestion(response.data);

//   //   if(selectedExpertIndex === 1) setSelectedAdditionalKeyword1(inputAdditionalQuestion);
//   //   else if(selectedExpertIndex === 2) setSelectedAdditionalKeyword2(inputAdditionalQuestion);
//   //   else setSelectedAdditionalKeyword3(inputAdditionalQuestion);

//   //   } catch (error) {
//   //     console.error("Error fetching ...:", error);
//   //   } finally {
//   //   }
//   // };  

//   const handleSearch = (inputValue) => {
//     const updatedConversation = [...conversation];

//     // 사용자가 입력한 경우에만 inputBusinessInfo를 업데이트
//     if (conversationStage < 3 && inputValue !== -1) {
//       console.log("inputValue");
//       console.log(inputValue);
//       setButtonState(1);
//       setInputBusinessInfo(inputValue);
//       updatedConversation.push({ type: 'user', message: inputValue });
//     }
// >>>>>>> main

    let newConversationStage = conversationStage;

    if (conversationStage === 1) {
        if (inputBusinessInfo || inputValue !== -1) {  // inputValue가 입력되었을 때도 대화 진행
            const businessInfo = inputBusinessInfo || inputValue;  // inputValue가 더 우선
            updatedConversation.push(
                { type: 'system', message: `아이디어를 입력해 주셔서 감사합니다!\n지금부터 아이디어를 세분화하여 주요한 특징과 목표 고객을 파악해보겠습니다 🙌🏻` },
                { type: 'analysis', businessInfo },  // 입력된 비즈니스 정보를 분석
            );
            if(approachPath === 1) {
              updatedConversation.push(
                { type: 'system', message: '비즈니스 분석이 완료되었습니다. 추가 사항이 있으시면 ‘수정하기’ 버튼을 통해 수정해 주세요.\n분석 결과에 만족하신다면, 지금 바로 전략 보고서를 준비해드려요.' },
                { type: 'report_button'},
              );
            }
            else {
              updatedConversation.push(
                { type: 'system', message: '비즈니스 분석이 완료되었습니다. 추가 사항이 있으시면 ‘수정하기’ 버튼을 통해 수정해 주세요.\n분석 결과에 만족하신다면, 전문가들의 의견을 확인하여 아이디어를 한 단계 더 발전시켜 보세요 🔍' },
              );
            }
            newConversationStage = 2;
        } else if (!inputBusinessInfo && approachPath === 1) {
          // inputBusinessInfo가 비어 있고, 검색을 통해 접근하지 않은 경우 전문가 인덱스에 따라 메시지 추가
          const expertPromptMessage = getInitialSystemMessage();
          updatedConversation.push({ type: 'system', message: expertPromptMessage });
      }
    } else if (conversationStage === 2) {
        if (!selectedExpertIndex || (inputValue !== -1 && approachPath === 1)) {
            alert("전문가를 선택해 주세요.");
            return;
        }
        // 마지막 요소가 keyword 이거나 report_button 이면 pop
        if ((updatedConversation.length > 0 && updatedConversation[updatedConversation.length - 1].type === 'keyword')
          || (updatedConversation.length > 0 && updatedConversation[updatedConversation.length - 1].type === 'report_button')) {
          updatedConversation.pop(); 
        }

        if(selectedExpertIndex === 1) {
          updatedConversation.push(
            { type: 'user', message: '10년차 전략 디렉터와 1:1 커피챗, 지금 바로 시작하겠습니다 🙌🏻' },
            { type: 'system', message: `안녕하세요, 김도원입니다! ${titleOfBusinessInfo}을 구체화하는 데 도움이 될 전략 보고서를 준비했습니다.\n함께 전략을 다듬어 보시죠! 📊"`},
          )
        }
        else if(selectedExpertIndex === 2) {
          updatedConversation.push(
            { type: 'user', message: '지금 바로 쓸 수 있는 브랜딩 솔루션 10초 맞춤 제안서 받기, 지금 바로 시작하겠습니다 🙌🏻' },
            { type: 'system', message: `안녕하세요, 이지현입니다! ${titleOfBusinessInfo}을 구체화하는 데 도움이 될 전략 보고서를 준비했습니다.\n함께 전략을 다듬어 보시죠! 📊"`},
          )
        }
        else if(selectedExpertIndex === 3) {
          updatedConversation.push(
            { type: 'user', message: '고객 데이터 전문가의 맞춤 타겟 추천, 지금 바로 시작하겠습니다 🙌🏻' },
            { type: 'system', message: `안녕하세요, 박서연입니다! ${titleOfBusinessInfo}을 구체화하는 데 도움이 될 전략 보고서를 준비했습니다.\n함께 전략을 다듬어 보시죠! 📊"`},
          )
        }
        updatedConversation.push(
          { type: `strategy_${selectedExpertIndex}` },
          { type: 'system', message: '리포트 내용을 보시고 추가로 궁금한 점이 있나요? 아래 키워드 선택 또는 질문해주시면, 더 많은 인사이트를 제공해 드릴게요! 😊'},
          { type: `keyword` },
        );
      newConversationStage = 3;
    } else if (conversationStage === 3) {
      updatedConversation.pop();

      if (additionalReportCount >= 3) {
        alert("추가 리포트는 최대 3개까지 요청 가능합니다. 더 보려면 로그인 해주세요!");
        return;
      }

      if (inputValue !== -1) {
        const updatedKeywords = [...selectedAdditionalKeyword];
        updatedKeywords[selectedExpertIndex - 1] = inputValue;
        setSelectedAdditionalKeyword(updatedKeywords);
      }

      updatedConversation.push(
        { type: 'user', message: `제 프로젝트와 관련된 "${selectedAdditionalKeyword[selectedExpertIndex - 1]}"를 요청드려요` },
        { type: `addition_${selectedExpertIndex}` },
        { type: 'system', message: `"${titleOfBusinessInfo}"과 관련된 시장에서의 BDG 메트릭스를 기반으로 ${selectedAdditionalKeyword[selectedExpertIndex - 1]}를 찾아드렸어요\n추가적인 질문이 있으시면, 언제든지 물어보세요💡 다른 분야 전문가의 의견도 프로젝트에 도움이 될거에요👇🏻` },
        { type: `keyword` },
      );

      setAdditionalReportCount(additionalReportCount + 1);
    }

    setConversation(updatedConversation);
    setConversationStage(newConversationStage);

    console.log("5555555555555555555555555555555555555");
    console.log(updatedConversation);
    
    console.log(inputBusinessInfo);
    saveConversation(updatedConversation, newConversationStage);
  };

  const getInitialSystemMessage = () => {
    switch (selectedExpertIndex) {
      case 1:
        return "안녕하세요! 저는 전략 전문가 김도원입니다. 😊 여러분의 아이디어를 구체화하고, 성공적인 전략을 세우는 데 도움을 드리겠습니다.\n아이디어나 비즈니스 아이템을 간단히 작성해 주세요. 분석 후, 여러분의 비즈니스에 맞는 전략 리포트를 제공하겠습니다!";
      case 2:
        return "안녕하세요! 마케팅 전문가 이지현입니다. 😄 여러분의 아이디어를 효과적으로 시장에 알릴 수 있는 전략을 함께 고민해 보아요.\n아이디어나 비즈니스 아이템을 여기에 작성해 주세요. 제가 분석하고, 효과적인 마케팅 전략 리포트를 준비해 드리겠습니다!";
      case 3:
        return "반갑습니다! 저는 고객 인사이트 전문가 박서연입니다. 😊 여러분의 비즈니스가 목표 고객에게 잘 다가갈 수 있도록 돕겠습니다.\n아이디어나 비즈니스 아이템을 작성해 주세요. 분석 후, 타겟 고객을 정의하고 세분화 방법에 대한 리포트를 제공해 드리겠습니다!";
      default:
        return '비즈니스(아이디어)를 입력해주세요.';
    }
  };

  return (
    <>
      <ContentsWrap>
        <OrganismLeftSideBar />

        <MainContent>
          <div>
            <MoleculeBizName />
            {conversation.map((item, index) => {
              if (item.type === 'user') {
                return <MoleculeUserMessage key={index} message={item.message} />;
              } else if (item.type === 'system') {
                return <MoleculeSystemMessage key={index} message={item.message} />;
              } else if (item.type === 'analysis') {
                return <OrganismBizAnalysisSection conversationId={conversationId} />;
              } else if (item.type.startsWith('strategy_')) {
                const expertIndex = item.type.split('_')[1];
                return (
                  <OrganismStrategyReportSection
                    key={`strategy_${expertIndex}_${index}`}
                    conversationId={conversationId}
                    expertIndex={expertIndex}
                  />
                );
              } else if (item.type.startsWith('addition_')) {
                const expertIndex = item.type.split('_')[1];
                return (
                  <OrganismAdditionalReport
                    key={`addition_${expertIndex}_${index}`}
                    conversationId={conversationId}
                    expertIndex={expertIndex}
                    keyword={selectedAdditionalKeyword[expertIndex - 1]}
                  />
                );
              } else if (item.type === 'keyword') {
                return <MoleculeAdditionalKeyword />;
              }
              else if (item.type === 'report_button') {
                return <MoleculeCheckReportRightAway/>;
              }
              return null;
            })}
            
          {approachPath === -1 && inputBusinessInfo && (Object.keys(expert1ReportData).length === 0 || Object.keys(expert2ReportData).length === 0 || Object.keys(expert3ReportData).length === 0) &&
            <OrganismBizExpertSelect />
          }

          </div>

          <OrganismRightSideBar />
        </MainContent>
      </ContentsWrap>
      <OrganismSearchBottomBar onSearch={handleSearch} />
    </>
  );
};

export default PageExpertInsight;

const MainContent = styled.div`
  position:relative;
  top:40px;
  grid-area: content;
  display:flex;
  flex-direction:row;
  gap:40px;
  min-width: 1px;
  max-width:1484px;
  width:calc(100% - 40px);
  padding-bottom: 150px;
  margin: 0 auto;

  > div:first-child {
    max-width:1240px;
    width:100%;
    margin:0 40px;
  }
`;

const ContentsWrap = styled.div`
  position: relative;
  display:flex;
`;
