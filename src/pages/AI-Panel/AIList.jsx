import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { palette } from "../../assets/styles/Palette";
import { ContentsWrap } from "../../assets/styles/Common";
import { InputField, CheckBox } from "../../assets/styles/Input";
import Button from "../../assets/styles/Button";

import images from "../../assets/styles/Images";
import panelimages from "../../assets/styles/PanelImages";

import Header from "../layout/Header";
import Pagination from "../layout/Pagination";

const AIPanelList = () =>{

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
                <InputField None type="text" name="type" placeholder="입력하세요" />
              </div>
              <div>
                <span>상세 옵션</span>
                <InputField None type="text" name="type" placeholder="입력하세요" />
              </div>
              <Button Black onClick="#">
                <img src={images.Search} alt="" />검색
              </Button>
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
              <input type="checkbox" id="panelListCheck" name="panelList" value="1" />
              <label for="panelListCheck">
                <img src={panelimages.PanelIMG} alt="" />
                <div>
                  <p>남성(27세) | 직업</p>
                  <strong>의료서비스받기에 5시간이상 활용하고 있어요</strong>
                  <ol>
                    <li>#충동구매자</li>
                    <li>#고급형</li>
                    <li>#얼리어답터</li>
                  </ol>
                </div>
              </label>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck2" name="panelList" value="2" />
              <label for="panelListCheck2">
                <img src={panelimages.PanelIMG} alt="" />
                <div>
                  <p>남성(27세) | 직업</p>
                  <strong>의료서비스받기에 5시간이상 활용하고 있어요</strong>
                  <ol>
                    <li>#충동구매자</li>
                    <li>#고급형</li>
                    <li>#얼리어답터</li>
                  </ol>
                </div>
              </label>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck3" name="panelList" value="3" />
              <label for="panelListCheck3">
                <img src={panelimages.PanelIMG} alt="" />
                <div>
                  <p>남성(27세) | 직업</p>
                  <strong>의료서비스받기에 5시간이상 활용하고 있어요</strong>
                  <ol>
                    <li>#충동구매자</li>
                    <li>#고급형</li>
                    <li>#얼리어답터</li>
                  </ol>
                </div>
              </label>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck4" name="panelList" value="4" />
              <label for="panelListCheck4">
                <img src={panelimages.PanelIMG} alt="" />
                <div>
                  <p>남성(27세) | 직업</p>
                  <strong>의료서비스받기에 5시간이상 활용하고 있어요</strong>
                  <ol>
                    <li>#충동구매자</li>
                    <li>#고급형</li>
                    <li>#얼리어답터</li>
                  </ol>
                </div>
              </label>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck5" name="panelList" value="5" />
              <label for="panelListCheck5">
                <img src={panelimages.PanelIMG} alt="" />
                <div>
                  <p>남성(27세) | 직업</p>
                  <strong>의료서비스받기에 5시간이상 활용하고 있어요</strong>
                  <ol>
                    <li>#충동구매자</li>
                    <li>#고급형</li>
                    <li>#얼리어답터</li>
                  </ol>
                </div>
              </label>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck6" name="panelList" value="6" />
              <label for="panelListCheck6">
                <img src={panelimages.PanelIMG} alt="" />
                <div>
                  <p>남성(27세) | 직업</p>
                  <strong>의료서비스받기에 5시간이상 활용하고 있어요</strong>
                  <ol>
                    <li>#충동구매자</li>
                    <li>#고급형</li>
                    <li>#얼리어답터</li>
                  </ol>
                </div>
              </label>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck7" name="panelList" value="7" />
              <label for="panelListCheck7">
                <img src={panelimages.PanelIMG} alt="" />
                <div>
                  <p>남성(27세) | 직업</p>
                  <strong>의료서비스받기에 5시간이상 활용하고 있어요</strong>
                  <ol>
                    <li>#충동구매자</li>
                    <li>#고급형</li>
                    <li>#얼리어답터</li>
                  </ol>
                </div>
              </label>
            </li>
            <li>
              <input type="checkbox" id="panelListCheck8" name="panelList" value="8" />
              <label for="panelListCheck8">
                <img src={panelimages.PanelIMG} alt="" />
                <div>
                  <p>남성(27세) | 직업</p>
                  <strong>의료서비스받기에 5시간이상 활용하고 있어요</strong>
                  <ol>
                    <li>#충동구매자</li>
                    <li>#고급형</li>
                    <li>#얼리어답터</li>
                  </ol>
                </div>
              </label>
            </li>
          </PanelList>

          <Pagination />
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

    button {
      display:flex;
      align-items:center;
      gap:10px;
    }
  }
`;

const PanelWrap = styled.section`
  .sortBooth {
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:32px;
  }

  .choicePanel {
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
    overflow:hidden;
    background:#F4F4F4;
  }

  input[type=checkbox] {
    position:absolute;
    opacity:0;
  }

  input[type=checkbox] + label {
    position:relative;
    display:block;
    border-radius:15px;
    overflow:hidden;
    cursor:pointer;
  }

  input[type=checkbox]:checked + label:after {
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    border-radius:15px;
    border:2px solid ${palette.blue};
    content:'';
  }

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

    p {
      font-size:0.88rem;
      font-weight:400;
    }

    strong {
      font-size:1.25rem;
    }

    ol {
      display:flex;
      gap:8px;
      font-size:0.88rem;
      color:${palette.gray};
      margin-top:auto;
    }
  }
`;