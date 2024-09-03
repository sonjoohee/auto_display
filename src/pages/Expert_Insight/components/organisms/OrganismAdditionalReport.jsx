import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  ADDITIONAL_REPORT_DATA,
  SELECTED_EXPERT_INDEX,
  SELECTED_TAB,
  SELECTED_ADDITIONAL_KEYWORD, // Import the new atom
  TITLE_OF_BUSINESS_INFORMATION,
  MAIN_FEATURES_OF_BUSINESS_INFORMATION,
  MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION,
  BUSINESS_INFORMATION_TARGET_CUSTOMER, 
  BUTTON_STATE,
} from '../../../AtomStates';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import MoleculeReportController from '../molecules/MoleculeReportController';
import { saveConversationToIndexedDB, getConversationByIdFromIndexedDB } from '../../../../utils/indexedDB';
import axios from 'axios';

const OrganismAdditionalReport = ({ conversationId, expertIndex }) => {
  const [titleOfBusinessInfo] = useAtom(TITLE_OF_BUSINESS_INFORMATION);
  const [mainFeaturesOfBusinessInformation, setMainFeaturesOfBusinessInformation] = useAtom(MAIN_FEATURES_OF_BUSINESS_INFORMATION);
  const [mainCharacteristicOfBusinessInformation, setMainCharacteristicOfBusinessInformation] = useAtom(MAIN_CHARACTERISTIC_OF_BUSINESS_INFORMATION);
  const [businessInformationTargetCustomer, setBusinessInformationTargetCustomer] = useAtom(BUSINESS_INFORMATION_TARGET_CUSTOMER);
  const [buttonState, setButtonState] = useAtom(BUTTON_STATE);

  const analysisReportData = {
    title: titleOfBusinessInfo,
    mainFeatures: mainFeaturesOfBusinessInformation,
    mainCharacter: mainCharacteristicOfBusinessInformation,
    mainCustomer: businessInformationTargetCustomer,
  };
  const [selectedTab, setSelectedTab] = useAtom(SELECTED_TAB);
  const [selectedKeywords] = useAtom(SELECTED_ADDITIONAL_KEYWORD); // Access the list of selected keywords
  const [tabs, setTabs] = useState([]);
  const [sections, setSections] = useState([]);
  const [additionalReportData, setAdditionalReportData] = useAtom(ADDITIONAL_REPORT_DATA); // Use the list-based atom
  const [answerData, setAnswerData] = useState(null);
  const axiosConfig = {
    timeout: 100000, // 100초
  };

  
  // const additionalReportAtom = strategyReportAtomMap[expertIndex] || ADDITIONAL_REPORT_DATA1;
  // const [additionalReportData, setAdditionalReportData] = useAtom(additionalReportAtom);

  useEffect(() => {
    const loadData = async () => {
      try {
        const existingConversation = await getConversationByIdFromIndexedDB(conversationId);
  
        if (buttonState === 1) {  // 버튼 상태가 1일 때만 API 요청 실행
          const keyword = selectedKeywords[expertIndex - 1]; // Use the keyword based on expertIndex
  
          const data = {
            business_info: titleOfBusinessInfo,
            business_analysis_data: {
                명칭: analysisReportData.title,
                개요: {
                  주요_목적_및_특징: analysisReportData.mainFeatures.map((feature) => feature.기능),
                },
                주요기능: analysisReportData.mainFeatures,
                목표고객: analysisReportData.mainCustomer,
              },
            question_info: selectedKeywords
            };
  
          const response = await axios.post('https://wishresearch.kr/panels/add_question', data, axiosConfig);
          console.log(response);
          const answerData = response.data.additional_question;
          setAnswerData(answerData);
          setSections(answerData.sections);
  
          // 기존의 추가 리포트 데이터에 새로 가져온 데이터를 추가합니다.
          const updatedAdditionalReportData = [...additionalReportData, answerData];
          setAdditionalReportData(updatedAdditionalReportData);
  
          const updatedConversation = {
            ...existingConversation,
            additionalReportData: updatedAdditionalReportData, // 전체 리스트를 저장
            timestamp: Date.now(),
          };
          await saveConversationToIndexedDB(updatedConversation);
  
          setButtonState(0);  // 버튼 상태 초기화
        } else {
          // 기존 데이터가 있을 때 처리
          if (existingConversation && additionalReportData.length > 0) {
            setTabs(additionalReportData[selectedTab]?.tabs || []);
            setSections(additionalReportData[selectedTab]?.sections || []);
          } else {
            console.warn('No saved additional report data found.');
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
  
    loadData();
  }, [
    conversationId,
    expertIndex,
    selectedTab,
    selectedKeywords,
    buttonState,  // buttonState 의존성 추가
  ]);
  

  const handleTabClick = (index) => {
    setSelectedTab(index);
    if (tabs.length > 0) {
      setSections(tabs[index].sections);
    }
  };

  return (
    <AnalysisSection Strategy>
      <TabHeader>
        {tabs.map((tab, index) => (
          <TabButton key={index} active={selectedTab === index} onClick={() => handleTabClick(index)}>
            {tab.title}
          </TabButton>
        ))}
      </TabHeader>

      {sections.map((section, index) => (
        <Section key={index} title={section.title} content={section.content} />
      ))}

      <MoleculeReportController reportIndex={2} conversationId={conversationId} sampleData={answerData} />
    </AnalysisSection>
  );
};

// ... (아래 부분은 동일)

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

export default OrganismAdditionalReport;

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
    margin-bottom:10px;
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
