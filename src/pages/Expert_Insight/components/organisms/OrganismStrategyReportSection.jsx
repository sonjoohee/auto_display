import React, { useEffect, useState } from 'react';
import styled ,{keyframes} from 'styled-components';
import { useAtom } from 'jotai';
import {
  SELECTED_EXPERT_INDEX,
  EXPERT1_REPORT_DATA,
  EXPERT2_REPORT_DATA,
  EXPERT3_REPORT_DATA,
  SELECTED_TAB,
  EXPERT_BUTTON_STATE,
} from '../../../AtomStates';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { SkeletonTitle, SkeletonLine } from '../../../../assets/styles/Skeleton';

import MoleculeReportController from '../molecules/MoleculeReportController';
import sampleData1 from './sample1.json';
import sampleData2 from './sample2.json';
import sampleData3 from './sample3.json';
import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';
import axios from 'axios';

import { emailAtom, passwordAtom, currentUserAtom, errorAtom,
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER, 
} from '../../../AtomStates';

const OrganismStrategyReportSection = ({ conversationId, expertIndex }) => {
  const [selectedTab, setSelectedTab] = useAtom(SELECTED_TAB); // 탭을 인덱스로 관리
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const axiosConfig = {
    timeout: 100000, // 100초
    headers: { 'Content-Type': 'application/json' }, withCredentials: true // 쿠키 포함 요청 (필요한 경우)
  };
  const [email, setEmail] = useAtom(emailAtom);
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [buttonState, setButtonState] = useAtom(EXPERT_BUTTON_STATE); // BUTTON_STATE 사용

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };

  const [isLoading, setIsLoading] = useState(false);

  // 전문가 인덱스에 따라 해당 Atom을 선택
  const strategyReportAtomMap = {
    '1': EXPERT1_REPORT_DATA,
    '2': EXPERT2_REPORT_DATA,
    '3': EXPERT3_REPORT_DATA,
  };
  
  const sampleDataMap = {
    '1': sampleData1,
    '2': sampleData2,
    '3': sampleData3,
  };
  
  const strategyReportAtom = strategyReportAtomMap[expertIndex] || EXPERT3_REPORT_DATA; 
  const sampleData = sampleDataMap[expertIndex] || sampleData3;

  const [strategyReportData, setStrategyReportData] = useAtom(strategyReportAtom);
  useEffect(() => {
    const loadData = async () => {
      if (buttonState === 1) {  // BUTTON_STATE가 1일 때만 API 호출
        setIsLoading(true);
        try {
          const existingConversation = await getConversationByIdFromIndexedDB(conversationId);
          const currentReportKey = `strategyReportData_EX${expertIndex}`;

          if (
            existingConversation &&
            existingConversation[currentReportKey] &&
            existingConversation[currentReportKey].expert_id === parseInt(expertIndex, 10)
          ) {
            const strategyData = existingConversation[currentReportKey];
            setStrategyReportData(strategyData);
            setTabs(strategyData.tabs);
            setSections(strategyData.tabs[selectedTab].sections);
          } else if (Object.keys(strategyReportData).length === 0) {
            const data = {
              expert_id: expertIndex,
              business_info: titleOfBusinessInfo, // DB에서 가져온 titleOfBusinessInfo 사용
              business_analysis_data: {
                명칭: analysisReportData.title,
                개요: {
                  주요_목적_및_특징: analysisReportData.mainFeatures.map((feature) => feature.기능),
                },
                주요기능: analysisReportData.mainFeatures,
                목표고객: analysisReportData.mainCustomer,
              },
              tabs: [],
              page_index: 1,
            };

            const response1 = await axios.post('https://wishresearch.kr/panels/expert', data, axiosConfig);

            let finalResponse = response1.data;

            if (finalResponse.total_page_index === 2) {
              const response2 = await axios.post('https://wishresearch.kr/panels/expert', finalResponse, axiosConfig);
              finalResponse = response2.data;
            } else if (finalResponse.total_page_index === 3) {
              const response2 = await axios.post('https://wishresearch.kr/panels/expert', finalResponse, axiosConfig);
              const response3 = await axios.post('https://wishresearch.kr/panels/expert', response2.data, axiosConfig);
              finalResponse = response3.data;
            }

            console.log('Final response data:', finalResponse);

            const strategyData = finalResponse;

            setStrategyReportData(strategyData);
            setTabs(strategyData.tabs);
            setSections(strategyData.tabs[selectedTab].sections);

            const updatedConversation = {
              ...existingConversation,
              [currentReportKey]: strategyData,
              timestamp: Date.now(),
            };
            await saveConversationToIndexedDB(updatedConversation);
          } else {
            setTabs(strategyReportData.tabs);
            setSections(strategyReportData.tabs[selectedTab].sections);
          }
        } catch (error) {
          console.error('Error loading data:', error);
        }
        setIsLoading(false);
        setButtonState(0); // BUTTON_STATE를 초기화
      }
    };
    loadData();
  }, [buttonState, conversationId, selectedTab, expertIndex]);  // buttonState 의존성 추가
// =======

//   useEffect(() => {
//     const loadData = async () => {
//       setIsLoading(true);
//       try {
//         const existingConversation = await getConversationByIdFromIndexedDB(conversationId);
//         const currentReportKey = `strategyReportData_EX${expertIndex}`;

//         if (
//           existingConversation &&
//           existingConversation[currentReportKey] &&
//           existingConversation[currentReportKey].expert_id === parseInt(expertIndex, 10)
//         ) {
//           const strategyData = existingConversation[currentReportKey];
//           setStrategyReportData(strategyData);
//           setTabs(strategyData.tabs);
//           setSections(strategyData.tabs[selectedTab].sections);
//         } else if (Object.keys(strategyReportData).length === 0) {
//           const data = {
//             expert_id: expertIndex,
//             business_info: titleOfBusinessInfo, // DB에서 가져온 titleOfBusinessInfo 사용
//             business_analysis_data: {
//               명칭: analysisReportData.title,
//               개요: {
//                 주요_목적_및_특징: analysisReportData.mainFeatures.map((feature) => feature.기능),
//               },
//               주요기능: analysisReportData.mainFeatures,
//               목표고객: analysisReportData.mainCustomer,
//             },
//             tabs: [],
//             page_index: 1,
//           };


//           const response1 = await axios.post('https://wishresearch.kr/panels/expert', data, axiosConfig);

//           let finalResponse = response1.data;

//           if (finalResponse.total_page_index === 2) {
//             const response2 = await axios.post('https://wishresearch.kr/panels/expert', finalResponse, axiosConfig);
//             finalResponse = response2.data;
//           } else if (finalResponse.total_page_index === 3) {
//             const response2 = await axios.post('https://wishresearch.kr/panels/expert', finalResponse, axiosConfig);
//             const response3 = await axios.post('https://wishresearch.kr/panels/expert', response2.data, axiosConfig);
//             finalResponse = response3.data;
//           }

//           console.log('Final response data:', finalResponse);

//           const strategyData = finalResponse;

//           setStrategyReportData(strategyData);
//           setTabs(strategyData.tabs);
//           setSections(strategyData.tabs[selectedTab].sections);

//           const updatedConversation = {
//             ...existingConversation,
//             [currentReportKey]: strategyData,
//             timestamp: Date.now(),
//           };
//           await saveConversationToIndexedDB(updatedConversation);
//         } else {
//           setTabs(strategyReportData.tabs);
//           setSections(strategyReportData.tabs[selectedTab].sections);
//         }
//       } catch (error) {
//         console.error('Error loading data:', error);
//       }
//       setIsLoading(false);
//     };
//     loadData();
//   }, [conversationId, selectedTab, expertIndex]);
// >>>>>>> main

  const handleTabClick = (index) => {
    setSelectedTab(index);
    if (tabs.length > 0) {
      setSections(tabs[index].sections);
    }
  };
  

  return (
    <>
      <AnalysisSection Strategy>
        <TabHeader>
          {tabs.map((tab, index) => (
            <TabButton key={index} active={selectedTab === index} onClick={() => handleTabClick(index)}>
              {tab.title}
            </TabButton>
          ))}
        </TabHeader>
  
        {isLoading ? (
          <>
            <SkeletonTitle className="title-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <SkeletonLine className="content-placeholder" />
            <Spacing />
          </>
        ) : (
          sections.length > 0 ? (
            sections.map((section, index) => (
              <Section key={index} title={section.title} content={section.content} />
            ))
          ) : (
            <>
              <SkeletonTitle className="title-placeholder" />
              <SkeletonLine className="content-placeholder" />
              <SkeletonLine className="content-placeholder" />
              <Spacing />
            </>
          )
        )}
  
        <MoleculeReportController reportIndex={1} strategyReportID={sampleData.expert_id} conversationId={conversationId} sampleData={sampleData} />
      </AnalysisSection>
    </>
  );
  };
// =======
//     {isLoading && (
//       <LoadingOverlay>
//         <div className="loader"></div>
//       </LoadingOverlay>
//     )}
//     <AnalysisSection Strategy>
//       <TabHeader>
//         {tabs.map((tab, index) => (
//           <TabButton key={index} active={selectedTab === index} onClick={() => handleTabClick(index)}>
//             {tab.title}
//           </TabButton>
//         ))}
//       </TabHeader>

//       {sections.map((section, index) => (
//         <Section key={index} title={section.title} content={section.content} />
//       ))}

//       <MoleculeReportController reportIndex={1} strategyReportID={sampleData.expert_id} conversationId={conversationId} sampleData={sampleData} />
//     </AnalysisSection>
//     </>
//   );
// };

// // ... (아래 부분은 동일)
// >>>>>>> main

const Section = ({ title, content }) => {
  // 서브 타이틀이 있는 항목과 없는 항목을 분리
  const subTitleItems = content.filter((item) => item.subTitle);
  const nonSubTitleItems = content.filter((item) => !item.subTitle);

  return (
    <BoxWrap>
      {title && (
        <strong>
          <img src={images.Check} alt="" />
          {title}
        </strong>
      )}

      {/* nonSubTitleItems는 일반적으로 title과 text만 표시 */}
      {nonSubTitleItems.length > 0 && (
        nonSubTitleItems.map((item, index) => (
          <div key={index}>
            <p>{item.text}</p>
            {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
          </div>
        ))
      )}

      {/* subTitleItems는 DynamicGrid 스타일을 적용 */}
      {subTitleItems.length > 0 && (
        <DynamicGrid columns={subTitleItems.length}>
          {subTitleItems.map((item, index) => (
            <div key={index}>
              {item.subTitle && <SubTitle>{item.subTitle}</SubTitle>}
              <p>{item.text}</p>
              {item.subtext && <SubTextBox>{item.subtext}</SubTextBox>}
            </div>
          ))}
        </DynamicGrid>
      )}
    </BoxWrap>
  );
};

export default OrganismStrategyReportSection;

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
  position:relative;
  max-width:1135px;
  width:91.5%;
  text-align:left;
  margin-top:25px;
  padding:30px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

  h1 {
    font-size:1.25rem;
    font-weight:400;
    margin-bottom:20px;
  }

  > p {
    font-size:0.88rem;
    line-height:1.5;
    margin-top:15px;

    span {
      color:${palette.red};
    }
  }
`;

const BoxWrap = styled.div`
  padding:20px;
  border-radius:10px;
  background:rgba(0,0,0,.04);

  + div {
    margin-top:12px;
  }

  strong {
    display:flex;
    align-items:center;
    gap:8px;
    margin-bottom:10px;
  }

  p {
    font-size:0.88rem;
    color:${palette.darkGray};
    line-height:1.5;
    // margin-bottom:10px;
  }
`;

const TabHeader = styled.div`
  display: flex;
  gap:40px;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  font-family: 'Pretendard';
  font-size: 1.25rem;
  font-weight: ${props => (props.active ? '600' : '400')};
  color: ${props => (props.active ? palette.black : palette.lightGray)};
  border: none;
  border-bottom: ${props => (props.active ? `1px solid ${palette.black}` : 'none')};
  background: ${palette.white};
  cursor: pointer;
  transition:all .5s;

  &:hover {
    color: ${palette.black};
  }

  &:focus {
    outline: none;
  }
`;

// DynamicGrid로 그리드 컬럼의 갯수를 서브 타이틀 갯수에 맞춰 동적으로 설정
const DynamicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: 10px;
  margin-top: 10px;

  div {
    flex:1;
    display:flex;
    flex-direction:column;
    padding:12px;
    border-radius:10px;
    border:1px solid ${palette.lineGray};
  }

  p {
    margin: 0;
  }
`;

const SubTitle = styled.strong`
  font-size:0.88rem;
  font-weight: 500;
  color:${palette.gray};
  text-align:left;
`;

const SubTextBox = styled.div`
  background: ${palette.white};
  padding: 16px;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 0.88rem;
  color: ${palette.gray};
  border:0 !important;
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const Spacing = styled.div`
  margin-bottom: 40px; /* 제목과 본문 사이의 간격 */
`;
