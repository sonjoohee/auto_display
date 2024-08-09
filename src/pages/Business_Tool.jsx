import React from 'react';

import { ContentsWrap } from '../assets/styles/Common';
import Button from '../assets/styles/Button';
import OrganismHeader from './AI_Panel/components/organisms/OrganismHeader';

import styled from 'styled-components';
import { palette } from '../assets/styles/Palette';

const BusinessTool = () => {
  return (
    <>
      <OrganismHeader />

      <ContentsWrap>
        <BusonessToolWrap>
          <h2>비즈니스 툴</h2>
          <TextareaWrap>
            <textarea placeholder="아이템(비즈니스)에 맞춤형 툴을 추천해드려요. 아이템에 대한 정보를 입력해 주세요."></textarea>
            <div>
              <p>선정적이거나 도덕적, 사회적 문제가 있는 아이템의 경우, 패널 생성을 제한할 수 있습니다. 또한, B2B 아이템은 추가 확인 절차가 필요할 수 있습니다.</p>
              <Button Blue>비즈니스 맞춤 추천</Button>
            </div>
          </TextareaWrap>
        </BusonessToolWrap>

        <BusinessField>
          <h3>다양한 분야에서 사용하는 툴이에요 !!</h3>

          <FieldTool>
            <div>
              <p>서비스 기획자</p>
              <strong>우리 서비스 제품군의 구매 동기는 무엇일까?</strong>
              <span>즉시 가능</span>
            </div>
            <div>
              <p>서비스 기획자</p>
              <strong>우리서비스의 잠재 고객은 누구일까?</strong>
              <span>인터뷰</span>
            </div>
            <div>
              <p>마케터</p>
              <strong>우리 고객의 소비 트렌드는 무엇일까?</strong>
              <span>즉시 가능</span>
            </div>
            <div>
              <p>마케터</p>
              <strong>우리 제품의 홍보 키워드에 어떤 감정을 갖고 있을까?</strong>
              <span>인터뷰</span>
            </div>
            <div>
              <p>서비스 기획자</p>
              <strong>우리 서비스 제품군의 구매 동기는 무엇일까?</strong>
              <span>인터뷰</span>
            </div>
          </FieldTool>

          <Button>더 많은 툴 보기</Button>
        </BusinessField>
      </ContentsWrap>
      
    </>
  );
};

export default BusinessTool;

const BusonessToolWrap = styled.div`
  position:relative;
  margin:120px auto 60px;

  h2 {
    font-size:2.5rem;
    margin-bottom:60px;
  }
`;

const TextareaWrap = styled.div`
  padding:30px;
  border-radius:20px;
  border:2px solid ${palette.blue};

  textarea {
    width:100%;
    height:90px;
    font-family: 'Pretendard';
    font-size:1.5rem;
    border:0;
    outline:0;
    resize:none;

    &::placeholder {
      color:${palette.lightGray};
    }
  }

  > div {
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:20px;
    padding-top:20px;
    border-top:1px solid ${palette.lineGray};
  }

  p {
    font-size:0.75rem;
    color:${palette.lightGray};
    padding-left:20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='12' viewBox='0 0 13 12' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.2371 6C11.2371 8.48528 9.22234 10.5 6.73706 10.5C4.25178 10.5 2.23706 8.48528 2.23706 6C2.23706 3.51472 4.25178 1.5 6.73706 1.5C9.22234 1.5 11.2371 3.51472 11.2371 6ZM12.7371 6C12.7371 9.31371 10.0508 12 6.73706 12C3.42335 12 0.737061 9.31371 0.737061 6C0.737061 2.68629 3.42335 0 6.73706 0C10.0508 0 12.7371 2.68629 12.7371 6ZM7.17439 7.36967L7.25955 3.6H6.20668L6.29958 7.36967H7.17439ZM6.74085 7.85656C6.40796 7.86025 6.13313 8.11475 6.137 8.42459C6.13313 8.7418 6.40796 9 6.74085 9C7.06213 9 7.33696 8.7418 7.33696 8.42459C7.33696 8.11475 7.06213 7.86025 6.74085 7.85656Z' fill='black' fill-opacity='0.3'/%3E%3C/svg%3E");
    background-size:12px;
    background-position:left center;
    background-repeat:no-repeat;
  }

  button {
    font-family: 'Pretendard';
    font-size:0.88rem;
    font-weight:500;
    padding:12px 20px;
  }
`;

const BusinessField = styled.div`
  margin-bottom:60px;

  h3 {
    font-size:1.5rem;
    font-weight:600;
    text-align:left;
    margin-bottom:20px;
  }

  > button {
    font-family: 'Pretendard';
    font-size:0.88rem;
    font-weight:400;
    color:${palette.black};
    padding:10px 20px;
    border-radius:30px;

    &:hover {
      border:1px solid ${palette.black};
    }
  }
`;

const FieldTool = styled.div`
  display:flex;
  flex-wrap:wrap;
  gap:16px;
  margin-bottom:40px;

  > div {
    display:flex;
    flex-direction:column;
    gap:10px;
    flex:1 1 18%;
    height:200px;
    font-size:0.88rem;
    color:${palette.gray};
    text-align:left;
    padding:20px;
    border-radius:15px;
    background:rgba(0,0,0,.05);

    strong {
      font-size:1.13rem;
      color:${palette.black};
    }

    span {
      margin-top:auto;
    }
  }
`;
