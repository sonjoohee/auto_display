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

const OrganismLeftSideBar = () => {
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
    // 저장된 보고서를 클릭하면 해당 보고서를 선택하여 팝업에 표시
    setSelectedReport(savedReports[index]);
  };

  const closePopup = () => {
    setSelectedReport(null); // 팝업 닫기
  };

  useEffect(() => {
    const checkboxes = document.querySelectorAll('.accordion-toggle');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', function () {
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
        checkbox.removeEventListener('change', () => { });
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
            <img src={images.Chat} alt="" />
            새 프로젝트 시작
          </button>

          <AccordionMenu>
            <AccordionItem>
              <input type="checkbox" id="section1" className="accordion-toggle" />
              <label htmlFor="section1" className="accordion-label">
                <img src={images.Folder} alt="" />
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
              <label htmlFor="section2" className="accordion-label">
                <img src={images.Clock} alt="" />
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
              </AccordionContent>
            </AccordionItem>
          </AccordionMenu>
        </SideBarMenu>
      </SideBar>
    </>
  );
};

export default OrganismLeftSideBar;


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