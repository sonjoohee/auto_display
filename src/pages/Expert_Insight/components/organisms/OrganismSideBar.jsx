import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import panelimages from '../../../../assets/styles/PanelImages';
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { INPUT_BUSINESS_INFO, SAVED_REPORTS } from '../../../AtomStates';
import { getAllConversationsFromIndexedDB } from '../../../../utils/indexedDB'; // IndexedDB에서 대화 내역 가져오기

import OrganismReportPopup from './OrganismReportPopup'; // 팝업 컴포넌트 임포트

const OrganismSideBar = () => {
  const navigate = useNavigate();
  const [bizName] = useAtom(INPUT_BUSINESS_INFO);
  const [savedReports] = useAtom(SAVED_REPORTS);
  const [selectedReport, setSelectedReport] = useState(null); // 선택된 보고서 상태 관리
  const [conversations, setConversations] = useState([]); // 저장된 대화 상태 관리

  useEffect(() => {
    // IndexedDB에서 저장된 모든 대화 내역 가져오기
    const loadConversations = async () => {
      const allConversations = await getAllConversationsFromIndexedDB();
      setConversations(allConversations);
    };
    loadConversations();
  }, []);

  const handleConversationClick = (id) => {
    // 클릭 시 해당 대화로 이동
    navigate(`/conversation/${id}`);
  };

  const handleReportClick = (index) => {
    setSelectedReport(savedReports[index]); // 보고서 선택
  };

  const closePopup = () => {
    setSelectedReport(null); // 팝업 닫기
  };
  
  useEffect(() => {
    const checkboxes = document.querySelectorAll('.accordion-toggle');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          checkboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== this) {
              otherCheckbox.checked = false;
            }
          });
        }
      });
    });

    // Cleanup 이벤트 리스너
    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener('change', () => {});
      });
    };
  }, []);

  return (
    <>
    <SideBar>
      <div className="logo">
        <Link to="#"></Link>
        <button type="button">닫기</button>
      </div>

      <SideBarMenu>
        <button type="button" className="newChat">
          <img src={images.Chat} alt ="" />
          새 프로젝트 시작
        </button>

        <AccordionMenu>
          <AccordionItem>
            <input type="checkbox" id="section1" className="accordion-toggle" />
            <label for="section1" className="accordion-label">
              <img src={images.Folder} alt ="" />
              인사이트 보관함
            </label>
            <AccordionContent>
              {savedReports.map((report, index) => (
                <div key={index}>
                  <Link to="#" onClick={() => handleReportClick(index)}>
                    {report.title}
                  </Link>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {selectedReport && (
            <OrganismReportPopup report={selectedReport} onClose={closePopup} />
          )}

          <AccordionItem>
            <input type="checkbox" id="section2" className="accordion-toggle" />
            <label for="section2" className="accordion-label">
              <img src={images.Clock} alt ="" />
              프로젝트 히스토리
            </label>
            <AccordionContent>
              <div>
                <strong>최근 작업</strong>
                <ul>
                  {conversations.map((conversation, index) => (
                    <li key={index} onClick={() => handleConversationClick(conversation.id)}>
                      <p>{conversation.inputBusinessInfo}</p>
                      <span>{new Date(conversation.timestamp).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 기존의 지난 7일 대화 코드 삭제 또는 수정 가능 */}
            </AccordionContent>
          </AccordionItem>
        </AccordionMenu>
      </SideBarMenu>
    </SideBar>

    {/* 담당 AI 전문가 */}
    <SideBar Right>
      <AIProfileWrap>
        <div>
          <h3>담당 AI 전문가</h3>

          <AIProfile>
            <div className="thumb">
              <img src={panelimages.PanelIMG} alt="" />
            </div>
            <div className="name">
              <strong>김도원 - 제품 전략가</strong>
              <p>제품 전략 총괄 디렉터</p>
            </div>
            <div className="field">
              <strong>
                <img src={images.IconChatSmile} alt="" />
                전문분석 분야
              </strong>

              <p>
                <span>핵심 가치 제안 분석</span>
                <span>제품 개발 로드맵 구상</span>
                <span>제품 포지셔닝 전략</span>
              </p>
            </div>
          </AIProfile>

          <Link to="#">상세 정보 확인하기</Link>
        </div>
      </AIProfileWrap>

      <IdeaWrap>
        <strong>김도원 디렉터님의 추천 사항이에요</strong>

        <div>
          <Link to="#">
            <svg width="13" height="13" viewBox="0 0 21 21" fill="#ABABAB" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.0674 13.3651H14.1407L13.8122 13.0486C15.22 11.4077 15.9473 9.16911 15.5484 6.78983C14.9971 3.53149 12.2753 0.929517 8.99053 0.531016C4.02811 -0.078456 -0.148303 4.09408 0.461735 9.0519C0.860606 12.3337 3.465 15.0529 6.72635 15.6037C9.10785 16.0022 11.3486 15.2756 12.991 13.8691L13.3077 14.1973V15.1232L18.2936 20.1044C18.7746 20.585 19.5606 20.585 20.0416 20.1044C20.5226 19.6239 20.5226 18.8386 20.0416 18.3581L15.0674 13.3651ZM8.02855 13.3651C5.10741 13.3651 2.74938 11.0092 2.74938 8.09081C2.74938 5.17238 5.10741 2.81654 8.02855 2.81654C10.9497 2.81654 13.3077 5.17238 13.3077 8.09081C13.3077 11.0092 10.9497 13.3651 8.02855 13.3651Z" fill="#ABABAB"/>
            </svg>
            "이런 페르소나"의 의견 들어보기
          </Link>
          <Link to="#">
            <svg width="13" height="13" viewBox="0 0 21 21" fill="#ABABAB" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.0674 13.3651H14.1407L13.8122 13.0486C15.22 11.4077 15.9473 9.16911 15.5484 6.78983C14.9971 3.53149 12.2753 0.929517 8.99053 0.531016C4.02811 -0.078456 -0.148303 4.09408 0.461735 9.0519C0.860606 12.3337 3.465 15.0529 6.72635 15.6037C9.10785 16.0022 11.3486 15.2756 12.991 13.8691L13.3077 14.1973V15.1232L18.2936 20.1044C18.7746 20.585 19.5606 20.585 20.0416 20.1044C20.5226 19.6239 20.5226 18.8386 20.0416 18.3581L15.0674 13.3651ZM8.02855 13.3651C5.10741 13.3651 2.74938 11.0092 2.74938 8.09081C2.74938 5.17238 5.10741 2.81654 8.02855 2.81654C10.9497 2.81654 13.3077 5.17238 13.3077 8.09081C13.3077 11.0092 10.9497 13.3651 8.02855 13.3651Z" fill="#ABABAB"/>
            </svg>
            "이런 페르소나"의 의견 들어보기
          </Link>
          <Link to="#">
            <svg width="13" height="13" viewBox="0 0 21 21" fill="#ABABAB" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.0674 13.3651H14.1407L13.8122 13.0486C15.22 11.4077 15.9473 9.16911 15.5484 6.78983C14.9971 3.53149 12.2753 0.929517 8.99053 0.531016C4.02811 -0.078456 -0.148303 4.09408 0.461735 9.0519C0.860606 12.3337 3.465 15.0529 6.72635 15.6037C9.10785 16.0022 11.3486 15.2756 12.991 13.8691L13.3077 14.1973V15.1232L18.2936 20.1044C18.7746 20.585 19.5606 20.585 20.0416 20.1044C20.5226 19.6239 20.5226 18.8386 20.0416 18.3581L15.0674 13.3651ZM8.02855 13.3651C5.10741 13.3651 2.74938 11.0092 2.74938 8.09081C2.74938 5.17238 5.10741 2.81654 8.02855 2.81654C10.9497 2.81654 13.3077 5.17238 13.3077 8.09081C13.3077 11.0092 10.9497 13.3651 8.02855 13.3651Z" fill="#ABABAB"/>
            </svg>
            "이런 페르소나"의 의견 들어보기
          </Link>
        </div>
      </IdeaWrap>
    </SideBar>
    </>
  );
};

export default OrganismSideBar;

const SideBar = styled.div`
  position:sticky;
  top:150px;
  float:${props => {
    if (props.Right) return `right`;
    else return `left`;
  }};
  grid-area:toc;
  width:100%;
  max-width:360px;
  // height:calc(100vh - 12rem);
  margin-left:${props => {
    if (props.Right) return `0`;
    else return `-380px`;
  }};
  margin-right:${props => {
    if (props.Right) return `-380px`;
    else return `0`;
  }};
  margin-bottom:150px;
  padding:${props => {
    if (props.Right) return `0`;
    else return `40px 28px`;
  }};
  border-radius:20px;
  border:${props => {
    if (props.Right) return `none`;
    else return `1px solid ${palette.lineGray}`;
  }};
  background:${props => {
    if (props.Right) return palette.white;
    else return `rgba(0,0,0,.02)`;
  }};

  box-shadow:${props => {
    if (props.Right) return `none`;
    else return `0 4px 10px rgba(0,0,0,.1)`;
  }};

  h3 {
    font-size:1rem;
    font-weight:400;
    text-align:left;
    margin-bottom:20px;
  }

  .logo {
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:40px;

    a {
      width:44px;
      height:44px;
      font-size:0;
      background:url(${images.SymbolLogo}) left center no-repeat;
      background-size:auto 100%;
    }

    button {
      position:relative;
      font-size:0;
      width:30px;
      height:30px;
      border-radius:50%;
      border:0;
      background:${palette.white};
      box-shadow:2px 2px 2px rgba(0,0,0,.1);

      &:before {
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        width:7px;
        height:2px;
        border-radius:10px;
        background:${palette.black};
        content:'';
      }

      &:after {
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%) rotate(45deg);
        width:8px;
        height:8px;
        border-left:2px solid ${palette.black};
        border-bottom:2px solid ${palette.black};
        content:'';
      }
    }
  }
`;

const SideBarMenu = styled.div`
  display:flex;
  flex-direction:column;

  .newChat {
    display:flex;
    align-items:center;
    gap:16px;
    font-family: 'Pretendard';
    font-size:1rem;
    font-weight:500;
    padding:12px 16px;
    border:0;
    background:none;
  }
`;

const AccordionMenu = styled.div`
  width: 100%;
`;

const AccordionItem = styled.div`
  .accordion-toggle {
    display: none;
  }

  .accordion-label {
    position:relative;
    display:flex;
    align-items:center;
    gap:16px;
    font-family: 'Pretendard';
    font-size:1rem;
    font-weight:500;
    padding:12px 16px;
    border:0;
    background:none;
    cursor:pointer;

    &:after {
      position:absolute;
      right:20px;
      top:50%;
      transform:translateY(-50%) rotate(45deg);
      width:8px;
      height:8px;
      border-right:2px solid ${palette.black};
      border-bottom:2px solid ${palette.black};
      transition:all .5s;
      content:'';
    }
  }

  .accordion-toggle:checked + .accordion-label:after {
    transform:translateY(-50%) rotate(-135deg);
  }

  .accordion-toggle:checked + .accordion-label + div {
    max-height: 1000px;
    margin-top:20px;
    padding:0 16px;
  }
`;

const AccordionContent = styled.div`
  max-height: 0;
  overflow: hidden;
  padding: 0 16px;
  transition: max-height 0.5s ease, padding 0.5s ease;

  > div + div {
    margin-top:30px;
  }

  strong {
    font-size:0.75rem;
    font-weight:400;
    color:${palette.gray};
    text-align:left;
    display:block;
  }

  ul {
    display:flex;
    flex-direction:column;
    gap:4px;
    margin-top:10px;
  }

  li {
    position:relative;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-family: 'Pretendard';
    font-size:0.88rem;
    color:${palette.gray};
    text-align:left;
    padding:8px 12px 8px 25px;

    &:before {
      position:absolute;
      left:0;
      top:50%;
      transform:translateY(-50%);
      width:10px;
      height:10px;
      background:${palette.lightGray};
      content:'';
    }

    p {
      width:70%;
      text-overflow:ellipsis;
      white-space:nowrap;
      overflow:hidden;
    }

    span {
      font-size:0.75rem;
      color:${palette.lightGray};
    }
  }
`;

const AIProfileWrap = styled.div`
  padding:30px;
  border-radius:20px;
  border:1px solid ${palette.lineGray};
  box-shadow:0 4px 10px rgba(0,0,0,.05);
  background:${palette.white};

  + div {
    margin-top:28px;
  }

  a {
    position:relative;
    font-size:0.88rem;
    text-decoration:underline;
    padding-right:16px;
    margin-top:20px;

    &:after {
      position:absolute;
      right:0;
      top:50%;
      transform:translateY(-50%) rotate(45deg);
      width:8px;
      height:8px;
      border-top:2px solid ${palette.black};
      border-right:2px solid ${palette.black};
      content:'';
    }
  }
`;

const AIProfile = styled.div`
  display:flex;
  flex-direction:column;
  padding:25px;
  border-radius:12px;
  border:1px solid ${palette.lineGray};
  background:rgba(0,0,0,.04);

  .thumb {
    position:relative;
    width:160px;
    height:160px;
    margin:0 auto;
    border-radius:50%;
    overflow:hidden;

    img {
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
      width:100%;
      height:100%;
      object-fit: cover;
    }
  }

  .name {
    margin-top:30px;

    strong {
      font-size:1.25rem;
      font-weight:700;
    }

    p {
      color:${palette.gray};
      margin-top:15px;
    }
  }

  .field {
    display:flex;
    flex-direction:column;
    margin:25px auto 0;

    strong {
      display:flex;
      align-items:center;
      gap:5px;
      font-weight:400;
      color:${palette.blue};
      margin-bottom:12px;
    }

    p {
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:8px;
    }

    span {
      font-size:0.88rem;
      padding:8px 16px;
      border-radius:25px;
      border:1px solid ${palette.lineGray};
      background:${palette.white};
    }
  }
`;

const IdeaWrap = styled.div`
  text-align:left;
  padding:30px;
  border-radius:20px;
  border:1px solid ${palette.lineGray};
  box-shadow:0 4px 10px rgba(0,0,0,.05);

  strong {
    display:block;
    padding-bottom:10px;
    margin-bottom:20px;
    border-bottom:1px solid ${palette.lineGray};
  }

  div {
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:20px;

    a {
      display:flex;
      align-items:flex-start;
      gap:10px;
      width:100%;
      font-size:0.81rem;
      color:${palette.gray};
    }

    svg {
      flex-shrink:0;
    }
  }
`;