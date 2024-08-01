import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { ContentsWrap, Popup } from "../../assets/styles/Common";
import { InputField, CheckBox } from "../../assets/styles/Input";
import Button from "../../assets/styles/Button";

import images from "../../assets/styles/Images";
import panelimages from "../../assets/styles/PanelImages";

import Header from "../layout/Header";
import Pagination from "../layout/Pagination";
import { Tag } from "../../assets/styles/Tag";

const AIPanelList = () =>{
  // 상태를 정의
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('선택해주세요');

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  // 리스트 버튼 클릭 핸들러
  const handleListClick = (event) => {
    if (event.target.nodeName === "BUTTON") {
      setSelectedText(event.target.innerText);
      setIsOpen(false);
    }
  };

  // 팝업
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return(
    <>
      <Header /> 

      <ContentsWrap>
        <TabMenu>
          <Link to="#" className="active">
            <img src={images.Filter} alt="" />
            <span>AI 패널 필터</span>
          </Link>
          <Link to="#">
            <img src={images.Filter} alt="" />
            <span>비즈니스 맞춤 패널</span>
          </Link>
          <Link to="#">
            <img src={images.Filter} alt="" />
            <span>산업별 프리셋 패널</span>
          </Link>
        </TabMenu>

        <SearchWrap>
          <h2>123,456명의 AI 패널 대기 중
            <p>[사용자명] 님의 비즈니스를 함께 할 패널을 찾아보세요</p>
          </h2>

          <SearchFormWrap>
            <div className="searchForm">
              <div>
                <span>행동 타입</span>
                <InputField None type="text" name="type" placeholder="입력하세요" />
              </div>

              <div>
                <span>활용 시간</span>
                <div className="selectWrap">
                  <button className={`${isOpen ? 'on' : ''}`} onClick={handleButtonClick}>
                    {selectedText}
                  </button>
                  {isOpen && (
                    <div className="selectList" onClick={handleListClick}>
                      <button>전체</button>
                      <button>많이</button>
                      <button>보통</button>
                      <button>적게</button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <span>상세 옵션</span>
                <div className="selectWrap">
                  <button className={`${isOpen ? 'on' : ''}`} onClick={handleButtonClick}>
                    {selectedText}
                  </button>
                  {isOpen && (
                    <div className="selectList type2" onClick={handleListClick}>
                      <dl>
                        <dt>기본 정보</dt>
                        <dd>
                          <p>성별</p>
                          <CheckBox Button>
                            <span>
                              <input type="checkbox" id="genderM" className="" />
                              <label for="genderM">남자</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderW" className="" />
                              <label for="genderW">여자</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderN" className="" />
                              <label for="genderN">상관없음</label>
                            </span>
                          </CheckBox>
                        </dd>

                        <dd>
                          <p>나이</p>
                          <CheckBox Button>
                            <span>
                              <input type="checkbox" id="age10" className="" />
                              <label for="age10">10대</label>
                            </span>
                            <span>
                            <input type="checkbox" id="age20" className="" />
                              <label for="age20">20대</label>
                            </span>
                            <span>
                            <input type="checkbox" id="age30" className="" />
                              <label for="age30">30대</label>
                            </span>
                            <span>
                              <input type="checkbox" id="age40" className="" />
                              <label for="age40">40대</label>
                            </span>
                            <span>
                              <input type="checkbox" id="age50" className="" />
                              <label for="age50">50대</label>
                            </span>
                            <span>
                              <input type="checkbox" id="age60" className="" />
                              <label for="age60">60대</label>
                            </span>
                            <span>
                              <input type="checkbox" id="age70" className="" />
                              <label for="age70">70대</label>
                            </span>
                            <span>
                              <input type="checkbox" id="age80" className="" />
                              <label for="age80">80대</label>
                            </span>
                            <span>
                              <input type="checkbox" id="age90" className="" />
                              <label for="age90">90대</label>
                            </span>
                            <span>
                              <input type="checkbox" id="ageN" className="" />
                              <label for="ageN">상관없음</label>
                            </span>
                          </CheckBox>
                        </dd>
                      </dl>

                      <dl>
                        <dt>가족 상태</dt>
                        <dd>
                          <p>결혼 여부</p>
                          <CheckBox Button>
                            <span>
                              <input type="checkbox" id="genderM" className="" />
                              <label for="genderM">미혼</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderW" className="" />
                              <label for="genderW">기혼</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderN" className="" />
                              <label for="genderN">상관없음</label>
                            </span>
                          </CheckBox>
                        </dd>

                        <dd>
                          <p>자녀 정보</p>
                          <CheckBox Button>
                            <span>
                              <input type="checkbox" id="age10" className="" />
                              <label for="age10">없음</label>
                            </span>
                            <span>
                            <input type="checkbox" id="age20" className="" />
                              <label for="age20">유아</label>
                            </span>
                            <span>
                            <input type="checkbox" id="age30" className="" />
                              <label for="age30">미성년</label>
                            </span>
                            <span>
                              <input type="checkbox" id="age40" className="" />
                              <label for="age40">성인</label>
                            </span>
                            <span>
                              <input type="checkbox" id="age50" className="" />
                              <label for="age50">상관없음</label>
                            </span>
                          </CheckBox>
                        </dd>
                      </dl>

                      <dl>
                        <dt>소비 성향</dt>
                        <dd>
                          <CheckBox Button>
                            <span>
                              <input type="checkbox" id="genderM" className="" />
                              <label for="genderM">충동 구매자</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderW" className="" />
                              <label for="genderW">계획 구매자</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderN" className="" />
                              <label for="genderN">절약형</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderN" className="" />
                              <label for="genderN">고급형</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderN" className="" />
                              <label for="genderN">상관없음</label>
                            </span>
                          </CheckBox>
                        </dd>
                      </dl>
                    
                      <dl>
                        <dt>기술 수용도</dt>
                        <dd>
                          <CheckBox Button>
                            <span>
                              <input type="checkbox" id="genderM" className="" />
                              <label for="genderM">이노베이터</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderW" className="" />
                              <label for="genderW">얼리어답터</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderN" className="" />
                              <label for="genderN">전기 다수수용자</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderN" className="" />
                              <label for="genderN">후기 다수수용자</label>
                            </span>
                            <span>
                              <input type="checkbox" id="genderN" className="" />
                              <label for="genderN">지각 수용자</label>
                            </span>
                          </CheckBox>
                        </dd>
                      </dl>
                    </div>
                  )}
                </div>
              </div>

              <Button Black onClick="#">
                <img src={images.Search} alt="" />검색
              </Button>
            </div>

            <div className="searchTag">
              <div>
                <Tag Blue>건강관리
                  <span><img src={images.BtnClose} alt= "" /></span>
                </Tag>
                에 시간을
                <Tag Blue>많이
                  <span><img src={images.BtnClose} alt= "" /></span>
                </Tag>
                활용하는,
              </div>

              <div>
                <Tag Gray>여성
                  <span><img src={images.BtnClose} alt= "" /></span>
                </Tag>
                <Tag Gray>20대
                  <span><img src={images.BtnClose} alt= "" /></span>
                </Tag>
                <Tag Gray>30대
                  <span><img src={images.BtnClose} alt= "" /></span>
                </Tag>
              </div>

              <Button Small LineBlack>초기화</Button>
            </div>
          </SearchFormWrap>
        </SearchWrap>

        <PanelWrap>
          <div className="sortBooth">
            <div>
              <CheckBox>
                <input type="checkbox" id="allChk" className="" />
                <label for="allChk">전체 선택</label>
              </CheckBox>
            </div>

            <div className="choicePanel">
              210명의 패널 중 <strong>2</strong>명의 패널을 선택하셨어요
            </div>

            <div className="viewList">
              <div>
                <input type="radio" id="setCardType" class="" name="viewGroup" value="card" />
                <label for="setCardType" class="">카드보기</label>
              </div>
              <div>
                <input type="radio" id="setListType" class="" name="viewGroup" value="list" />
                <label for="setListType" class="">목록보기</label>
              </div>
            </div>
          </div>

          <PanelList>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" />
              <label for="panelListCheck">
                <img src={panelimages.PanelIMG} alt="" />
                <div>
                  <p>남성(27세) | 직업</p>
                  <strong>의료서비스받기에 5시간이상 활용하고 있어요</strong>
                  <p className="tag">
                    <span>#충동구매자</span>
                    <span>#고급형</span>
                    <span>#얼리어답터</span>
                  </p>
                </div>
              </label>

              <div>
                <Button onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">패널 선택하기</label>
              </div>
            </li>
          </PanelList>

          <Pagination />
        </PanelWrap>
      </ContentsWrap>

      {isPopupOpen && (
        <Popup Panel
          onClick={(e) => {
            // 팝업 내용 영역인 div를 클릭할 때는 팝업을 닫지 않도록 합니다.
            if (e.target === e.currentTarget) {
              togglePopup();
            }
          }}
        >
          <div>
            <span onClick={togglePopup}></span>
            <div className="panelInfo">
              <div className="thumb"><img src={panelimages.PanelIMG} alt ="" /></div>
              <div className="cont">
                <strong>여성 (26세)</strong>
                <p>서울 거주 | 마케팅 매니저</p>
              </div>
              <div className="tag">
                123
              </div>
            </div>
          </div>
        </Popup>
      )}
    </>
  );

};

export default AIPanelList;

const TabMenu = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  margin:60px auto 50px;

  a {
    position:relative;
    color:${palette.lightGray};
    padding:0 56px;
    transition:all .5s;

    img {
      opacity:0.3;
      transition:all .5s;
    }

    &:hover, &.active {
      color:${palette.black};

      img {
        opacity:1;
      }
    }

    + a:before {
      position:absolute;
      left:0;
      top:50%;
      transform:translateY(-50%);
      width:1px;
      height:90%;
      background:${palette.lineGray};
      content:'';
    }
  }

  span {
    display:block;
    margin-top:8px;
  }
`;

const SearchWrap = styled.section`
  position:relative;
  text-align:left;
  padding:60px;
  margin-bottom:80px;
  border-radius:15px;
  background:url(${images.BgSearch}) center no-repeat;
  background-size:cover;
  z-index:1;

  h2 {
    font-size:3rem;
    color:${palette.white};
    margin-bottom:60px;

    p {
      font-size:1rem;
      font-weight:normal;
    }
  }
`;

const SearchFormWrap = styled.div`
  padding:20px 30px;
  border-radius:15px;
  background:${palette.white};

  .searchForm {
    display:flex;
    justify-content:space-between;
    align-items:stretch;
    gap:20px;

    > div {
      width:25%;
    }

    span {
      font-size:0.88rem;
      color:${palette.lightGray};
    }

    input[type=text]::placeholder {
      font-size:1rem;
      color:${palette.black} !important;
    }

    > button {
      display:flex;
      align-items:center;
      gap:10px;
    }
  }

  .searchTag {
    display:flex;
    align-items:center;
    gap:8px;
    margin-top:20px;
    padding-top:20px;
    border-top:1px solid ${palette.lineGray};

    div {
      display:flex;
      align-items:center;
      gap:8px;
      font-size:1rem;
      color:${palette.lightGray};
    }

    button {
      margin-left:auto;
    }
  }

  .selectWrap {
    position:relative;
    width:100%;

    > button {
      position:relative;
      width:100%;
      height:40px;
      font-family: 'Pretendard';
      font-size:1rem;
      color:${palette.black};
      text-align:left;
      padding:6px 0;
      border:0;
      border-radius:5px;
      background:none;
      transition:all .5s;

      &:after {
        position:absolute;
        right:10px;
        top:50%;
        transform:translateY(-50%) rotate(45deg);
        width:10px;
        height:10px;
        border-right:2px solid ${palette.black};
        border-bottom:2px solid ${palette.black};
        transition:all .5s;
        z-index:2;
        content:'';
      }

      &.on:after {
        transform:translateY(-50%) rotate(225deg);
      }
    }

    .selectList {
      position:absolute;
      top:40px;
      left:0;
      width:100%;
      height:auto;
      display:flex;
      flex-direction:column;
      gap:5px;
      padding:10px;
      box-shadow:0 10px 14px rgba(0,0,0,.16);
      background:${palette.white};

      &.type2 {
        right:0;
        left:auto;
        width:910px;
        display:flex;
        flex-direction:row;
        gap:20px;
        padding:30px;
      }

      button {
        font-family: 'Pretendard';
        font-size:1rem;
        color:${palette.gray};
        text-align:left;
        padding:5px;
        border:0;
        background:none;
        transition:all .5s;

        &:hover {
          font-weight:700;
          color:${palette.blue};
          background:rgba(4,83,244,.05);
        }
      }

      dl {
        width:25%;

        dt {
          font-size:1.38rem;
          font-weight:700;
          padding:0 0 15px;
          margin-bottom:20px;
          border-bottom:2px solid ${palette.black};
        }

        dd {
          +dd {
            margin-top:20px;
            padding-top:20px;
            border-top:1px solid ${palette.lineGray};
          }

          p {
            font-size:1rem;
            font-weight:700;
            margin-bottom:8px;
          }

          div {
            display:flex;

            span {
              // flex:1 1 auto;
            }
          }
        }
      }
    }
  }
`;

const PanelWrap = styled.section`
  position:relative;
  z-index:0;

  .sortBooth {
    position:relative;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:32px;
  }

  .choicePanel {
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    strong {
      font-weight:400;
      margin:0 12px;
      padding:4px 20px;
      border-radius:10px;
      background:rgba(4,83,244,.1);
    }
  }

  .viewList {
    display:flex;
    justify-content:flex-end;
    align-items:center;
    gap:30px;

    input[type=radio] {
      opacity:0;
    }

    input[type=radio] + label {
      position:relative;
      display:inline-block;
      padding-left:28px;
      cursor:pointer;
    }
  }
`;

const PanelList = styled.ul`
  display:flex;
  flex-wrap:wrap;
  gap:20px;

  li {
    position:relative;
    max-width:295px;
    width:100%;
    overflow:hidden;
    border-radius:15px;
    background:#F4F4F4;
    transition:all .5s;

    > div {
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      display:flex;
      align-items:center;
      flex-direction:column;
      gap:10px;
      padding-top:100px;
      background:rgba(0,0,0,.6);
      transition:all .5s;
      opacity:0;
      z-index:1;
    }

    &:hover > div {
      opacity:1;

      label, a {
        min-width:150px;
        display:flex;
        gap:5px;
        color:${palette.white};
        padding:8px 16px;
        border-radius:10px;
        border:1px solid ${palette.white};
      }
    }


    > label {
      position:relative;
      top:0;
      left:0;
      width:100%;
      height:100%;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
  
      img {
        border-radius:15px;
      }
  
      div {
        height:200px;
        display:flex;
        flex-direction:column;
        gap:8px;
        text-align:left;
        padding:20px;
  
        strong {
          font-size:1.25rem;
        }
      }
  
      .tag {
        margin-top:auto;
        display:flex;
        gap:8px;
        font-size:0.88rem;
        color:${palette.gray};
      }
    }
  }

  .checkBox {
    position:absolute;
    right:0;
    top:0;
    width:100%;
    height:100%;
    outline:none;
    border-radius:15px;
    border:0;
    -webkit-appearance:none;
    cursor:pointer;
    z-index:1;

    &:after {
      position:absolute;
      right:12px;
      top:12px;
      width:20px;
      height:20px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19' fill='none'%3E%3Cpath d='M18.5149 9.13258C18.5149 11.5195 17.5667 13.8087 15.8789 15.4965C14.191 17.1844 11.9018 18.1326 9.51489 18.1326C7.12794 18.1326 4.83876 17.1844 3.15093 15.4965C1.4631 13.8087 0.514893 11.5195 0.514893 9.13258C0.514893 6.74564 1.4631 4.45645 3.15093 2.76862C4.83876 1.0808 7.12794 0.132584 9.51489 0.132584C11.9018 0.132584 14.191 1.0808 15.8789 2.76862C17.5667 4.45645 18.5149 6.74564 18.5149 9.13258ZM14.0486 5.72383C13.9683 5.64375 13.8726 5.5807 13.7673 5.53845C13.662 5.4962 13.5493 5.47561 13.4359 5.47792C13.3225 5.48023 13.2107 5.50539 13.1072 5.5519C13.0037 5.5984 12.9107 5.6653 12.8336 5.74858L8.92652 10.7267L6.57189 8.37096C6.41195 8.22192 6.20039 8.14078 5.9818 8.14464C5.76322 8.14849 5.55466 8.23704 5.40007 8.39163C5.24548 8.54622 5.15693 8.75478 5.15307 8.97337C5.14921 9.19196 5.23035 9.40351 5.37939 9.56346L8.35614 12.5413C8.43633 12.6214 8.53183 12.6845 8.63692 12.7268C8.74202 12.7691 8.85457 12.7899 8.96786 12.7878C9.08114 12.7857 9.19285 12.7608 9.2963 12.7146C9.39976 12.6684 9.49285 12.6018 9.57002 12.5188L14.061 6.90508C14.2141 6.74589 14.2987 6.53302 14.2966 6.31216C14.2945 6.0913 14.2059 5.88008 14.0498 5.72383H14.0486Z' fill='white'/%3E%3C/svg%3E");
      background-repeat:no-repeat;
      background-size:cover;
      opacity:0.3;
      content:'';
    }

    &:checked {
      border:3px solid ${palette.blue};
  
      &:after {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19' fill='none'%3E%3Cpath d='M18.5149 9.77127C18.5149 12.1582 17.5667 14.4474 15.8789 16.1352C14.191 17.8231 11.9018 18.7713 9.51489 18.7713C7.12794 18.7713 4.83876 17.8231 3.15093 16.1352C1.4631 14.4474 0.514893 12.1582 0.514893 9.77127C0.514893 7.38432 1.4631 5.09514 3.15093 3.40731C4.83876 1.71948 7.12794 0.771271 9.51489 0.771271C11.9018 0.771271 14.191 1.71948 15.8789 3.40731C17.5667 5.09514 18.5149 7.38432 18.5149 9.77127ZM14.0486 6.36252C13.9683 6.28244 13.8726 6.21939 13.7673 6.17714C13.662 6.13489 13.5493 6.1143 13.4359 6.11661C13.3225 6.11892 13.2107 6.14408 13.1072 6.19059C13.0037 6.23709 12.9107 6.30399 12.8336 6.38727L8.92652 11.3654L6.57189 9.00965C6.41195 8.86061 6.20039 8.77947 5.9818 8.78332C5.76322 8.78718 5.55466 8.87573 5.40007 9.03032C5.24548 9.18491 5.15693 9.39347 5.15307 9.61206C5.14921 9.83065 5.23035 10.0422 5.37939 10.2021L8.35614 13.18C8.43633 13.2601 8.53183 13.3231 8.63692 13.3655C8.74202 13.4078 8.85457 13.4286 8.96786 13.4265C9.08114 13.4244 9.19285 13.3995 9.2963 13.3533C9.39976 13.3071 9.49285 13.2405 9.57002 13.1575L14.061 7.54377C14.2141 7.38458 14.2987 7.17171 14.2966 6.95085C14.2945 6.72999 14.2059 6.51876 14.0498 6.36252H14.0486Z' fill='%230453F4'/%3E%3C/svg%3E");
        opacity:1;
      }
    }
  }

`;