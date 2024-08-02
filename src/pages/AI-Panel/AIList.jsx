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
  const [isChecked, setIsChecked] = useState(false);
  const [selectedText, setSelectedText] = useState('선택해주세요');

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

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

  // 탭메뉴
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['라이프스타일', '소비성향', '관심제품군'];
  const content = [
      <>
      김지영은 아침마다 피트니스 센터에서 운동을 하고, 건강한 아침 식사로 하루를 시작하는 활동적인 생활을 즐깁니다. 직장에서 효율적으로 업무를 처리하며 최신 마케팅 트렌드를 주시합니다.<br />주말에는 친구들과 브런치를 즐기거나 패션 아이템을 쇼핑하며 사교적인 시간을 보냅니다. 또한, 새로운 장소를 탐험하는 것을 좋아해 국내외 여행을 자주 다닙니다. 자기계발에도 관심이 많아 꾸준히 독서와 온라인 강의를 통해 지식을 넓혀갑니다.
      </>,
      <>
      김지영은 실용적이고 다기능적인 제품을 선호하며, 스마트워치나 다기능 노트북과 같은 제품에 관심이 많습니다. 브랜드의 평판과 신뢰성을 중요하게 생각하며, 고객 리뷰와 평점이 좋은 제품을 선택합니다.<br />스타일리시하고 세련된 디자인의 제품을 선호하고, 가격 대비 성능이 좋은 제품에 가치를 둡니다. 또한, 환경 보호에 관심이 많아 친환경 소재로 만들어진 제품이나 지속 가능한 브랜드를 지지합니다.
      </>,
      <>
      <Tag Line>제품군 명</Tag><Tag Line>제품군 명</Tag><Tag Line>제품군 명</Tag><Tag Line>제품군 명</Tag><Tag Line>제품군 명</Tag>
      </>,
  ];

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
                <input type="radio" id="setCardType" class="" name="viewGroup" value="card" checked />
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
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>

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
                    </div>

                    <div className="panelTag">
                      <Tag Line>#충동구매자</Tag>
                      <Tag Line>#고급형</Tag>
                      <Tag Line>#얼리어답터</Tag>
                    </div>

                    <PopupTab>
                      <div className="tabList">
                        {tabs.map((tab, index) => (
                          <button
                              key={index}
                              className={`tab-button ${activeTab === index ? 'active' : ''}`}
                              onClick={() => setActiveTab(index)}
                          >
                              {tab}
                          </button>
                        ))}
                      </div>
                      <div className="tabContent">
                          {content[activeTab]}
                      </div>
                    </PopupTab>

                    <div className="btnWrap">
                      <label for="panelListCheck" className={`popup-panel-select ${isChecked ? 'checked' : ''}`}>패널선택</label>
                      <div>
                        <Button LineBlue ExtraSmall><img src={images.Interview} alt="" />인터뷰</Button>
                        <Button Blue ExtraSmall><img src={images.Report} alt="" />퀵 리포트</Button>
                      </div>
                    </div>
                  </div>
                </Popup>
              )}
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck" className="checkBox" name="panelList" value="1" onChange={handleCheckboxChange} />
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

              <div className="panelHover">
                <Button LineWhite onClick={togglePopup}>패널정보 상세보기</Button>
                <label for="panelListCheck">
                  {isChecked ? '패널선택 해제' : '패널 선택하기'}
                </label>
              </div>
            </li>
          </PanelList>

          <MoreView>
            <Button Round LineBlack>20명 패널 더보기</Button>
          </MoreView>
        </PanelWrap>
      </ContentsWrap>
    </>
  );

};

export default AIPanelList;

const TabMenu = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding:60px 0 50px;

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
      position:absolute;
      left:0;
    }

    input[type=radio] + label {
      position:relative;
      line-height:20px;
      color:${palette.lightGray};
      display:inline-block;
      padding-left:28px;
      cursor:pointer;
      background-size:20px;
      background-repeat:no-repeat;
      background-position:left center;
    }

    #setCardType + label {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M3.8709 20H16.1291C17.1557 20 18.1403 19.5921 18.8662 18.8662C19.5921 18.1402 20 17.1556 20 16.1291V3.8709C20 2.84425 19.5921 1.8597 18.8662 1.13378C18.1402 0.407854 17.1556 0 16.1291 0H3.8709C2.84425 0 1.8597 0.407854 1.13378 1.13378C0.407854 1.8598 0 2.84436 0 3.8709V16.1291C0 17.1557 0.407854 18.1403 1.13378 18.8662C1.8598 19.5921 2.84436 20 3.8709 20ZM2.58057 16.129V8.38697H8.70966V17.4193H3.8709C3.52869 17.4193 3.20052 17.2833 2.9585 17.0414C2.71656 16.7993 2.58057 16.4712 2.58057 16.129ZM16.1291 17.4193H11.2903V14.1935H17.4194V16.129C17.4194 16.4712 17.2835 16.7994 17.0415 17.0414C16.7995 17.2833 16.4713 17.4193 16.1291 17.4193ZM17.4194 3.87079V11.6128H11.2903V2.58046H16.1291C16.4713 2.58046 16.7995 2.71644 17.0415 2.95839C17.2834 3.20043 17.4194 3.52859 17.4194 3.87079ZM3.8709 2.58046H8.70966V5.8063H2.58057V3.87079C2.58057 3.52859 2.71655 3.20041 2.9585 2.95839C3.20054 2.71645 3.52869 2.58046 3.8709 2.58046Z' fill='%23AAAAAA'/%3E%3C/svg%3E");
    }

    #setCardType:checked + label {
      color:${palette.blue};
      font-weight:600;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M3.8709 20H16.1291C17.1557 20 18.1403 19.5921 18.8662 18.8662C19.5921 18.1402 20 17.1556 20 16.1291V3.8709C20 2.84425 19.5921 1.8597 18.8662 1.13378C18.1402 0.407854 17.1556 0 16.1291 0H3.8709C2.84425 0 1.8597 0.407854 1.13378 1.13378C0.407854 1.8598 0 2.84436 0 3.8709V16.1291C0 17.1557 0.407854 18.1403 1.13378 18.8662C1.8598 19.5921 2.84436 20 3.8709 20ZM2.58057 16.129V8.38697H8.70966V17.4193H3.8709C3.52869 17.4193 3.20052 17.2833 2.9585 17.0414C2.71656 16.7993 2.58057 16.4712 2.58057 16.129ZM16.1291 17.4193H11.2903V14.1935H17.4194V16.129C17.4194 16.4712 17.2835 16.7994 17.0415 17.0414C16.7995 17.2833 16.4713 17.4193 16.1291 17.4193ZM17.4194 3.87079V11.6128H11.2903V2.58046H16.1291C16.4713 2.58046 16.7995 2.71644 17.0415 2.95839C17.2834 3.20043 17.4194 3.52859 17.4194 3.87079ZM3.8709 2.58046H8.70966V5.8063H2.58057V3.87079C2.58057 3.52859 2.71655 3.20041 2.9585 2.95839C3.20054 2.71645 3.52869 2.58046 3.8709 2.58046Z' fill='%230453F4'/%3E%3C/svg%3E");
    }

    #setListType + label {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M0 5.3125C0 6.22417 0.362135 7.09849 1.00677 7.74323C1.65151 8.38786 2.52583 8.75 3.4375 8.75H5.3125C6.22416 8.75 7.09848 8.38786 7.74322 7.74323C8.38786 7.09849 8.74999 6.22417 8.74999 5.3125V3.4375C8.74999 2.52583 8.38786 1.65151 7.74322 1.00677C7.09848 0.362135 6.22416 0 5.3125 0H3.4375C2.52583 0 1.65151 0.362135 1.00677 1.00677C0.362135 1.65151 0 2.52583 0 3.4375V5.3125ZM2.5 3.4375C2.5 3.18888 2.59877 2.95044 2.77455 2.77456C2.95044 2.59878 3.18888 2.5 3.4375 2.5H5.3125C5.56111 2.5 5.79955 2.59878 5.97544 2.77456C6.15122 2.95044 6.24999 3.18888 6.24999 3.4375V5.3125C6.24999 5.56112 6.15122 5.79956 5.97544 5.97544C5.79955 6.15122 5.56111 6.25 5.3125 6.25H3.4375C3.18888 6.25 2.95044 6.15122 2.77455 5.97544C2.59877 5.79956 2.5 5.56112 2.5 5.3125V3.4375Z' fill='%23AAAAAA'/%3E%3Cpath d='M0 16.5623C0 17.474 0.362135 18.3483 1.00677 18.993C1.65151 19.6377 2.52583 19.9998 3.4375 19.9998H5.3125C6.22416 19.9998 7.09848 19.6377 7.74322 18.993C8.38786 18.3483 8.74999 17.474 8.74999 16.5623V14.6873C8.74999 13.7757 8.38786 12.9013 7.74322 12.2566C7.09848 11.612 6.22416 11.2498 5.3125 11.2498H3.4375C2.52583 11.2498 1.65151 11.612 1.00677 12.2566C0.362135 12.9013 0 13.7757 0 14.6873V16.5623ZM2.5 14.6873C2.5 14.4387 2.59877 14.2003 2.77455 14.0244C2.95044 13.8486 3.18888 13.7498 3.4375 13.7498H5.3125C5.56111 13.7498 5.79955 13.8486 5.97544 14.0244C6.15122 14.2003 6.24999 14.4387 6.24999 14.6873V16.5623C6.24999 16.8109 6.15122 17.0494 5.97544 17.2253C5.79955 17.401 5.56111 17.4998 5.3125 17.4998H3.4375C3.18888 17.4998 2.95044 17.401 2.77455 17.2253C2.59877 17.0494 2.5 16.8109 2.5 16.5623V14.6873Z' fill='%23AAAAAA'/%3E%3Cpath d='M18.75 0.624573H12.1875C11.741 0.624573 11.3282 0.862812 11.105 1.24957C10.8817 1.63634 10.8817 2.1128 11.105 2.49957C11.3283 2.88634 11.741 3.12457 12.1875 3.12457H18.75C19.1966 3.12457 19.6093 2.88633 19.8326 2.49957C20.0558 2.1128 20.0558 1.63634 19.8326 1.24957C19.6093 0.862802 19.1966 0.624573 18.75 0.624573Z' fill='%23AAAAAA'/%3E%3Cpath d='M18.75 5.62543H12.1875C11.741 5.62543 11.3282 5.86367 11.105 6.25043C10.8817 6.6372 10.8817 7.11366 11.105 7.50043C11.3283 7.8872 11.741 8.12543 12.1875 8.12543H18.75C19.1966 8.12543 19.6093 7.88719 19.8326 7.50043C20.0558 7.11366 20.0558 6.6372 19.8326 6.25043C19.6093 5.86366 19.1966 5.62543 18.75 5.62543Z' fill='%23AAAAAA'/%3E%3Cpath d='M18.75 11.8754H12.1875C11.741 11.8754 11.3282 12.1137 11.105 12.5004C10.8817 12.8872 10.8817 13.3637 11.105 13.7504C11.3283 14.1372 11.741 14.3754 12.1875 14.3754H18.75C19.1966 14.3754 19.6093 14.1372 19.8326 13.7504C20.0558 13.3637 20.0558 12.8872 19.8326 12.5004C19.6093 12.1137 19.1966 11.8754 18.75 11.8754Z' fill='%23AAAAAA'/%3E%3Cpath d='M18.75 16.8752H12.1875C11.741 16.8752 11.3282 17.1134 11.105 17.5002C10.8817 17.887 10.8817 18.3634 11.105 18.7502C11.3283 19.137 11.741 19.3752 12.1875 19.3752H18.75C19.1966 19.3752 19.6093 19.1369 19.8326 18.7502C20.0558 18.3634 20.0558 17.887 19.8326 17.5002C19.6093 17.1134 19.1966 16.8752 18.75 16.8752Z' fill='%23AAAAAA'/%3E%3C/svg%3E");
    }

    #setListType:checked + label {
      color:${palette.blue};
      font-weight:600;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M0 5.3125C0 6.22417 0.362135 7.09849 1.00677 7.74323C1.65151 8.38786 2.52583 8.75 3.4375 8.75H5.3125C6.22416 8.75 7.09848 8.38786 7.74322 7.74323C8.38786 7.09849 8.74999 6.22417 8.74999 5.3125V3.4375C8.74999 2.52583 8.38786 1.65151 7.74322 1.00677C7.09848 0.362135 6.22416 0 5.3125 0H3.4375C2.52583 0 1.65151 0.362135 1.00677 1.00677C0.362135 1.65151 0 2.52583 0 3.4375V5.3125ZM2.5 3.4375C2.5 3.18888 2.59877 2.95044 2.77455 2.77456C2.95044 2.59878 3.18888 2.5 3.4375 2.5H5.3125C5.56111 2.5 5.79955 2.59878 5.97544 2.77456C6.15122 2.95044 6.24999 3.18888 6.24999 3.4375V5.3125C6.24999 5.56112 6.15122 5.79956 5.97544 5.97544C5.79955 6.15122 5.56111 6.25 5.3125 6.25H3.4375C3.18888 6.25 2.95044 6.15122 2.77455 5.97544C2.59877 5.79956 2.5 5.56112 2.5 5.3125V3.4375Z' fill='%230453F4'/%3E%3Cpath d='M0 16.5623C0 17.474 0.362135 18.3483 1.00677 18.993C1.65151 19.6377 2.52583 19.9998 3.4375 19.9998H5.3125C6.22416 19.9998 7.09848 19.6377 7.74322 18.993C8.38786 18.3483 8.74999 17.474 8.74999 16.5623V14.6873C8.74999 13.7757 8.38786 12.9013 7.74322 12.2566C7.09848 11.612 6.22416 11.2498 5.3125 11.2498H3.4375C2.52583 11.2498 1.65151 11.612 1.00677 12.2566C0.362135 12.9013 0 13.7757 0 14.6873V16.5623ZM2.5 14.6873C2.5 14.4387 2.59877 14.2003 2.77455 14.0244C2.95044 13.8486 3.18888 13.7498 3.4375 13.7498H5.3125C5.56111 13.7498 5.79955 13.8486 5.97544 14.0244C6.15122 14.2003 6.24999 14.4387 6.24999 14.6873V16.5623C6.24999 16.8109 6.15122 17.0494 5.97544 17.2253C5.79955 17.401 5.56111 17.4998 5.3125 17.4998H3.4375C3.18888 17.4998 2.95044 17.401 2.77455 17.2253C2.59877 17.0494 2.5 16.8109 2.5 16.5623V14.6873Z' fill='%230453F4'/%3E%3Cpath d='M18.75 0.624573H12.1875C11.741 0.624573 11.3282 0.862812 11.105 1.24957C10.8817 1.63634 10.8817 2.1128 11.105 2.49957C11.3283 2.88634 11.741 3.12457 12.1875 3.12457H18.75C19.1966 3.12457 19.6093 2.88633 19.8326 2.49957C20.0558 2.1128 20.0558 1.63634 19.8326 1.24957C19.6093 0.862802 19.1966 0.624573 18.75 0.624573Z' fill='%230453F4'/%3E%3Cpath d='M18.75 5.62543H12.1875C11.741 5.62543 11.3282 5.86367 11.105 6.25043C10.8817 6.6372 10.8817 7.11366 11.105 7.50043C11.3283 7.8872 11.741 8.12543 12.1875 8.12543H18.75C19.1966 8.12543 19.6093 7.88719 19.8326 7.50043C20.0558 7.11366 20.0558 6.6372 19.8326 6.25043C19.6093 5.86366 19.1966 5.62543 18.75 5.62543Z' fill='%230453F4'/%3E%3Cpath d='M18.75 11.8754H12.1875C11.741 11.8754 11.3282 12.1137 11.105 12.5004C10.8817 12.8872 10.8817 13.3637 11.105 13.7504C11.3283 14.1372 11.741 14.3754 12.1875 14.3754H18.75C19.1966 14.3754 19.6093 14.1372 19.8326 13.7504C20.0558 13.3637 20.0558 12.8872 19.8326 12.5004C19.6093 12.1137 19.1966 11.8754 18.75 11.8754Z' fill='%230453F4'/%3E%3Cpath d='M18.75 16.8752H12.1875C11.741 16.8752 11.3282 17.1134 11.105 17.5002C10.8817 17.887 10.8817 18.3634 11.105 18.7502C11.3283 19.137 11.741 19.3752 12.1875 19.3752H18.75C19.1966 19.3752 19.6093 19.1369 19.8326 18.7502C20.0558 18.3634 20.0558 17.887 19.8326 17.5002C19.6093 17.1134 19.1966 16.8752 18.75 16.8752Z' fill='%230453F4'/%3E%3C/svg%3E");
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
    border-radius:15px;
    transition:all .5s;

    > .panelHover {
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
      border-radius:15px;
      background:rgba(0,0,0,.6);
      transition:all .5s;
      opacity:0;
      z-index:1;

      button, label {
        display:block !important;
        text-align:center;
        cursor:pointer;
        transition:all .5s;

        &:hover {
          background:rgba(255,255,255,.3);
        }
      }
    }

    &:hover > .panelHover {
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
      border-radius:15px;
      background:#f4f4f4;
      transition:all .5s;
  
      img {
        border-radius:15px;
      }
  
      div {
        height:200px;
        display:flex;
        flex-direction:column;
        gap:8px;
        padding:20px;
        text-align:left;
  
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
    transition:all .5s;

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
      border:2px solid ${palette.blue};

      &:after {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19' fill='none'%3E%3Cpath d='M18.5149 9.77127C18.5149 12.1582 17.5667 14.4474 15.8789 16.1352C14.191 17.8231 11.9018 18.7713 9.51489 18.7713C7.12794 18.7713 4.83876 17.8231 3.15093 16.1352C1.4631 14.4474 0.514893 12.1582 0.514893 9.77127C0.514893 7.38432 1.4631 5.09514 3.15093 3.40731C4.83876 1.71948 7.12794 0.771271 9.51489 0.771271C11.9018 0.771271 14.191 1.71948 15.8789 3.40731C17.5667 5.09514 18.5149 7.38432 18.5149 9.77127ZM14.0486 6.36252C13.9683 6.28244 13.8726 6.21939 13.7673 6.17714C13.662 6.13489 13.5493 6.1143 13.4359 6.11661C13.3225 6.11892 13.2107 6.14408 13.1072 6.19059C13.0037 6.23709 12.9107 6.30399 12.8336 6.38727L8.92652 11.3654L6.57189 9.00965C6.41195 8.86061 6.20039 8.77947 5.9818 8.78332C5.76322 8.78718 5.55466 8.87573 5.40007 9.03032C5.24548 9.18491 5.15693 9.39347 5.15307 9.61206C5.14921 9.83065 5.23035 10.0422 5.37939 10.2021L8.35614 13.18C8.43633 13.2601 8.53183 13.3231 8.63692 13.3655C8.74202 13.4078 8.85457 13.4286 8.96786 13.4265C9.08114 13.4244 9.19285 13.3995 9.2963 13.3533C9.39976 13.3071 9.49285 13.2405 9.57002 13.1575L14.061 7.54377C14.2141 7.38458 14.2987 7.17171 14.2966 6.95085C14.2945 6.72999 14.2059 6.51876 14.0498 6.36252H14.0486Z' fill='%230453F4'/%3E%3C/svg%3E");
        opacity:1;
      }

      + label {
        background:rgba(4,83,244,.06);
        box-shadow:0 4px 15px rgba(0,0,0,.2);
      }
    }
  }

  .btnWrap {
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-top:25px;
    padding-top:25px;
    border-top:1px solid ${palette.lineGray};

    label {
      color:${palette.gray};
      padding-left:25px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='19' viewBox='0 0 18 19' fill='none'%3E%3Cpath d='M18 9.5C18 11.8869 17.0518 14.1761 15.364 15.864C13.6761 17.5518 11.3869 18.5 9 18.5C6.61305 18.5 4.32387 17.5518 2.63604 15.864C0.948212 14.1761 0 11.8869 0 9.5C0 7.11305 0.948212 4.82387 2.63604 3.13604C4.32387 1.44821 6.61305 0.5 9 0.5C11.3869 0.5 13.6761 1.44821 15.364 3.13604C17.0518 4.82387 18 7.11305 18 9.5ZM13.5337 6.09125C13.4534 6.01117 13.3577 5.94812 13.2524 5.90587C13.1471 5.86361 13.0344 5.84303 12.921 5.84534C12.8076 5.84765 12.6958 5.87281 12.5923 5.91931C12.4888 5.96582 12.3958 6.03271 12.3187 6.116L8.41162 11.0941L6.057 8.73837C5.89705 8.58933 5.6855 8.5082 5.46691 8.51205C5.24832 8.51591 5.03976 8.60446 4.88518 8.75905C4.73059 8.91364 4.64204 9.1222 4.63818 9.34079C4.63432 9.55938 4.71546 9.77093 4.8645 9.93088L7.84125 12.9087C7.92144 12.9888 8.01693 13.0519 8.12203 13.0942C8.22713 13.1366 8.33968 13.1573 8.45296 13.1552C8.56625 13.1531 8.67795 13.1282 8.78141 13.082C8.88486 13.0358 8.97795 12.9692 9.05512 12.8863L13.5461 7.2725C13.6992 7.11331 13.7838 6.90043 13.7817 6.67958C13.7796 6.45872 13.691 6.24749 13.5349 6.09125H13.5337Z' fill='black' fill-opacity='0.05'/%3E%3C/svg%3E");
      background-repeat:no-repeat;
      background-size:19px;
      cursor:pointer;
    }

    div {
      display:flex;
      gap:10px;

      button {
        display:flex;
        align-items:center;
        gap:5px;
      }
    }
  }

  .popup-panel-select.checked {
    color:${palette.blue};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19' fill='none'%3E%3Cpath d='M18.5149 9.77127C18.5149 12.1582 17.5667 14.4474 15.8789 16.1352C14.191 17.8231 11.9018 18.7713 9.51489 18.7713C7.12794 18.7713 4.83876 17.8231 3.15093 16.1352C1.4631 14.4474 0.514893 12.1582 0.514893 9.77127C0.514893 7.38432 1.4631 5.09514 3.15093 3.40731C4.83876 1.71948 7.12794 0.771271 9.51489 0.771271C11.9018 0.771271 14.191 1.71948 15.8789 3.40731C17.5667 5.09514 18.5149 7.38432 18.5149 9.77127ZM14.0486 6.36252C13.9683 6.28244 13.8726 6.21939 13.7673 6.17714C13.662 6.13489 13.5493 6.1143 13.4359 6.11661C13.3225 6.11892 13.2107 6.14408 13.1072 6.19059C13.0037 6.23709 12.9107 6.30399 12.8336 6.38727L8.92652 11.3654L6.57189 9.00965C6.41195 8.86061 6.20039 8.77947 5.9818 8.78332C5.76322 8.78718 5.55466 8.87573 5.40007 9.03032C5.24548 9.18491 5.15693 9.39347 5.15307 9.61206C5.14921 9.83065 5.23035 10.0422 5.37939 10.2021L8.35614 13.18C8.43633 13.2601 8.53183 13.3231 8.63692 13.3655C8.74202 13.4078 8.85457 13.4286 8.96786 13.4265C9.08114 13.4244 9.19285 13.3995 9.2963 13.3533C9.39976 13.3071 9.49285 13.2405 9.57002 13.1575L14.061 7.54377C14.2141 7.38458 14.2987 7.17171 14.2966 6.95085C14.2945 6.72999 14.2059 6.51876 14.0498 6.36252H14.0486Z' fill='%230453F4'/%3E%3C/svg%3E");
  }
`;

const PopupTab = styled.div`
  margin-top:25px;

  .tabList {
    display:flex;
    gap:4px;
    padding:4px;
    margin-bottom:15px;
    border-radius:20px;
    background:#f4f4f4;

    button {
      width:33.33%;
      font-family: 'Pretendard';
      font-size:0.88rem;
      color:${palette.gray};
      padding:6px 12px;
      border-radius:20px;
      border:0;
      background:none;
      transition:all .5s;

      &.active {
        color:${palette.black};
        background:${palette.white};
      }

      &:hover {
      }
    }
  }

  .tabContent {
    font-size:0.88rem;
    color:${palette.gray};
    line-height:1.4;
  }
`;

const MoreView = styled.div`
  position:relative;
  margin:50px auto;

  button {
    font-size:0.88rem;
    color:${palette.gray};
    font-weight:400;
    padding:12px 20px;
  }
`;
