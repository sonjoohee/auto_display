// C:\dev\Crowd_Insight-\src\pages\Expert_Insight\components\organisms\OrganismSideBar.jsx

import React from 'react';
import styled from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';

import { Link } from "react-router-dom";
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { 
} from '../../../AtomStates';

const OrganismSideBar = () => {

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
          새 대화 시작하기
        </button>

        <AccordionMenu>
          <AccordionItem>
            <input type="checkbox" id="section1" className="accordion-toggle" />
            <label for="section1" className="accordion-label">
              <img src={images.Folder} alt ="" />
              저장된 항목
            </label>
            <AccordionContent>
              <div>
                <strong>최근 작업</strong>
                <ul>
                  <li>
                    <p>운동을 좋아하는 20대 직장인</p>
                    <span>오늘</span>
                  </li>
                  <li>
                    <p>운동을 좋아하는 20대 직장인</p>
                    <span>24.08.20</span>
                  </li>
                </ul>
              </div>
              <div>
                <strong>최근 작업</strong>
                <ul>
                  <li>
                    <p>운동을 좋아하는 20대 직장인</p>
                    <span>오늘</span>
                  </li>
                  <li>
                    <p>운동을 좋아하는 20대 직장인</p>
                    <span>24.08.20</span>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            <input type="checkbox" id="section2" className="accordion-toggle" />
            <label for="section2" className="accordion-label">
              <img src={images.Clock} alt ="" />
              최근 기록
            </label>
            <AccordionContent>
              <div>
                <strong>최근 작업</strong>
                <ul>
                  <li>
                    <p>운동을 좋아하는 20대 직장인</p>
                    <span>오늘</span>
                  </li>
                  <li>
                    <p>운동을 좋아하는 20대 직장인</p>
                    <span>24.08.20</span>
                  </li>
                </ul>
              </div>
              <div>
                <strong>최근 작업</strong>
                <ul>
                  <li>
                    <p>운동을 좋아하는 20대 직장인</p>
                    <span>오늘</span>
                  </li>
                  <li>
                    <p>운동을 좋아하는 20대 직장인</p>
                    <span>24.08.20</span>
                  </li>
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

export default OrganismSideBar;

const SideBar = styled.div`
  position:sticky;
  width:100%;
  max-width:360px;
  height:calc(100vh - 12rem);
  padding:40px 28px;
  border-radius:20px;
  border:1px solid ${palette.lineGray};
  background:rgba(0,0,0,.02);
  box-shadow:0 4px 10px rgba(0,0,0,.1);

  .logo {
    display:flex;
    justify-content:space-between;
    margin-bottom:40px;

    a {
      width:140px;
      height:24px;
      font-size:0;
      background:url(${images.Logo}) left center no-repeat;
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
    font-weight:600;
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
    font-weight:600;
    padding:12px 16px;
    border:0;
    background:none;
    cursor:pointer;
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

    span {
      font-size:0.75rem;
      color:${palette.lightGray};
    }
  }
`;
