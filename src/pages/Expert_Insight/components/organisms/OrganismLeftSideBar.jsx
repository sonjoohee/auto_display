import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
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

  // 클릭 시 이동
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Logo isOpen={isOpen}>
        <a href="/"></a> {/* Link를 a 태그로 변경 */}
        <button type="button" onClick={toggleSidebar}>닫기</button>
      </Logo>

      <SideBar isOpen={isOpen} bgNone={!isOpen}>
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
                <ul>
                {savedReports.map((report, index) => (
                  <li key={index}>
                    <p onClick={() => handleReportClick(index)}>{report.title}</p>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="3" viewBox="0 0 14 3" fill="none">
                        <circle cx="2.0067" cy="1.51283" r="1.49694" transform="rotate(-90 2.0067 1.51283)" fill="#A0A0A0"/>
                        <circle cx="7.00084" cy="1.51283" r="1.49694" transform="rotate(-90 7.00084 1.51283)" fill="#A0A0A0"/>
                        <circle cx="11.993" cy="1.51283" r="1.49694" transform="rotate(-90 11.993 1.51283)" fill="#A0A0A0"/>
                      </svg>
                    </span>
                  </li>
                ))}
                </ul>
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
                      <li key={index}>
                        <p onClick={() => handleConversationClick(conversation.id)}>{conversation.inputBusinessInfo}</p>
                        {/* <span>{new Date(conversation.timestamp).toLocaleDateString()}</span> */}
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="3" viewBox="0 0 14 3" fill="none">
                            <circle cx="2.0067" cy="1.51283" r="1.49694" transform="rotate(-90 2.0067 1.51283)" fill="#A0A0A0"/>
                            <circle cx="7.00084" cy="1.51283" r="1.49694" transform="rotate(-90 7.00084 1.51283)" fill="#A0A0A0"/>
                            <circle cx="11.993" cy="1.51283" r="1.49694" transform="rotate(-90 11.993 1.51283)" fill="#A0A0A0"/>
                          </svg>
                        </span>
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

const Logo = styled.div`
  position:fixed;
  top:72px;
  left:60px;
  width:250px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  z-index:1;

  a {
    // width:44px;
    width:135px;
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
      transition:all .5s;
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
      transition:all .5s;
      content:'';
    }
  }

  ${props =>
    css`
      button:after {
        transform: ${props.isOpen ? 'translate(-50%, -50%) rotate(45deg)' : 'translate(-50%, -50%) rotate(225deg)'} !important;
      }
    `
  }
`;

const SideBar = styled.div`
  position:sticky;
  top:40px;
  display:flex;
  flex-direction:column;
  width: ${(props) => (props.bgNone ? "0" : "257px")};
  height:calc(100vh - 80px);
  padding:96px 20px 30px;
  margin: ${(props) => (props.bgNone ? "40px 0 0 0" : "40px 0 0 40px")};
  // margin: 40px 0 0 40px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};
  background: ${(props) => (props.bgNone ? "none" : "rgba(0,0,0,.02)")};
  box-shadow:0 4px 10px rgba(0,0,0,.05);
  transition:all .5s;
  transform: ${(props) => (props.bgNone ? "translateX(-257px)" : "0")};

  h3 {
    font-size:1rem;
    font-weight:400;
    text-align:left;
    margin-bottom:20px;
  }

  .logo {
    position:fixed;
    top:40px;
    left:40px;
    width:215px;
    transform: translateX(0);
    // display:flex;
    // justify-content:space-between;
    // align-items:center;
    // margin-bottom:40px;

    a {
      // width:44px;
      width:135px;
      height:44px;
      font-size:0;
      background:url(${images.SymbolLogo}) left center no-repeat;
      background-size:auto 100%;
    }

    button {
      // position:relative;
      position:absolute;
      right:-30px;
      top:50%;
      transform:translateY(-50%);
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
    padding:12px 0;
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
    padding:12px 0;
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
    // max-height:calc(100vh - 22rem);
    // margin-top:20px;
    padding:0;
    overflow-y:auto;
  }
`;

const AccordionContent = styled.div`
  max-height: 0;
  overflow: hidden;
  padding: 0;
  transition: max-height 0.5s ease, padding 0.5s ease;

  > div {
    margin-top:20px;
  }

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
    margin:0 12px;
    // margin-top:10px;
  }

  li {
    position:relative;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
    font-family: 'Pretendard';
    font-size:0.88rem;
    color:${palette.gray};
    text-align:left;
    padding:8px 0 8px 15px;
    cursor:pointer;

    &:before {
      position:absolute;
      left:0;
      top:50%;
      transform:translateY(-50%);
      width:10px;
      height:10px;
      border-radius:2px;
      background:${palette.lightGray};
      content:'';
      transition:all .5s;
    }

    p {
      width:100%;
      min-height:19px;
      text-overflow:ellipsis;
      white-space:nowrap;
      overflow:hidden;
      color:${palette.darkGray};
    }

    span {
      font-size:0.75rem;
      color:${palette.lightGray};
      flex-shrink:0;
      display:none;
      align-items:center;
    }

    &:hover {
      &:before {
        background:${palette.blue};
      }

      span {
        display:flex;
      }
    }
  }
`;

const ToogleMenu = styled.div`
  position:absolute;
  right:-260px;
  top:0;
  display:flex;
  flex-direction:column;
  gap:20px;
  min-width:217px;
  padding:20px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};
  background:${palette.white};
  box-shadow:0 4px 28px rgba(0,0,0,.05);

  button {
    display:flex;
    align-items:center;
    gap:8px;
    font-family: 'Pretendard';
    font-size:0.88rem;
    color:${palette.gray};
    border:0;
    background:none;
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