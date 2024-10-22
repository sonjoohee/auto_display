import React, { useRef, useEffect, useState } from "react";
import * as d3 from 'd3';
import styled, { css } from "styled-components";
import { palette } from "../../../../assets/styles/Palette";

const PriceAnalysis = ({ priceData }) => {
  const sliderRef = useRef(null);
  priceData = {
    "expert_id": "1",
    "price_scrap_report": {
        "search_query": "땅콩버터",
        "standardization_method": "단위 기반 표준화",
        "unit_setting": "100g 당 가격",
        "price_range_groups": [
            {
                "group": "그룹 1",
                "range": "500원 ~ 1500원",
                "count": 3,
                "product_list": [
                    {
                        "제품명": "리고 땅콩 버터 1kg",
                        "단위 당 가격": "738원"
                    },
                    {
                        "제품명": "리고 LIGO 100프로 땅콩버터 청키 453g 1병",
                        "단위 당 가격": "1843원"
                    },
                    {
                        "제품명": "리고 LIGO 100프로 땅콩버터 크리미 453g 1병",
                        "단위 당 가격": "1843원"
                    }
                ]
            },
            {
                "group": "그룹 2",
                "range": "1501원 ~ 2500원",
                "count": 12,
                "product_list": [
                    {
                        "제품명": "스키피 땅콩버터 1.36kg 크리미 대량구매가능",
                        "단위 당 가격": "1639원"
                    },
                    {
                        "제품명": "스키피 땅콩버터 수퍼청크 1.36kg",
                        "단위 당 가격": "1426원"
                    },
                    {
                        "제품명": "스키피 땅콩버터 1.36kg",
                        "단위 당 가격": "1515원"
                    },
                    {
                        "제품명": "스키피 땅콩버터 잼 1.36kg 코스트코 슈퍼청크 대용량 악마의잼 피넛버터",
                        "단위 당 가격": "1595원"
                    },
                    {
                        "제품명": "스키피 수퍼 청크 크런치 피넛 땅콩 버터 잼 1 36kg x 1개 코스트코",
                        "단위 당 가격": "1757원"
                    },
                    {
                        "제품명": "청정원 스키피 땅콩버터 청크 462g",
                        "단위 당 가격": "1832원"
                    },
                    {
                        "제품명": "스키피 땅콩버터 크리미 462g x 2개",
                        "단위 당 가격": "1557원"
                    },
                    {
                        "제품명": "스키피 수퍼 청크 피넛 버터 1.36kg x 2개입",
                        "단위 당 가격": "1942원"
                    },
                    {
                        "제품명": "스키피 스키피땅콩버터 2종(크리미+청크)",
                        "단위 당 가격": "1557원"
                    },
                    {
                        "제품명": "스키피 스키피 땅콩버터 수퍼청크 1.36kg",
                        "단위 당 가격": "1875원"
                    },
                    {
                        "제품명": "스키피 땅콩버터 청크",
                        "단위 당 가격": "1422원"
                    },
                    {
                        "제품명": "[청정원] 스키피 땅콩버터 크리미462g 1개 + 청크 462g 1개",
                        "단위 당 가격": "1837원"
                    }
                ]
            },
            {
                "group": "그룹 3",
                "range": "2501원 ~ 3500원",
                "count": 21,
                "product_list": [
                    {
                        "제품명": "슈퍼너츠 100% 땅콩 피넛버터 크런치 460g",
                        "단위 당 가격": "3130원"
                    },
                    {
                        "제품명": "슈퍼너츠 100% 땅콩 피넛버터 스무스 460g",
                        "단위 당 가격": "3130원"
                    },
                    {
                        "제품명": "테라사나 100 유기농 피넛버터 땅콩 잼 크런치 피넛버터 500g 1개",
                        "단위 당 가격": "2560원"
                    },
                    {
                        "제품명": "안단 땅콩버터 크리미 크런치 피넛버터 100 무첨가 무가당 무설탕",
                        "단위 당 가격": "2975원"
                    },
                    {
                        "제품명": "영화식품 국산 땅콩버터 피넛 대용량 100 무가당 순 무첨가 200g 볶음땅콩",
                        "단위 당 가격": "5300원"
                    },
                    {
                        "제품명": "옳곡 국내산 100% 무첨가 땅콩버터 200g 스무스",
                        "단위 당 가격": "6750원"
                    },
                    {
                        "제품명": "크레이지피넛 국산 100% 오리지널 땅콩버터 무가당 설탕무첨가 200g",
                        "단위 당 가격": "7400원"
                    },
                    {
                        "제품명": "땅콩100% 넛츠어바웃 무첨가 땅콩버터 크런치 500g 무가당 무염",
                        "단위 당 가격": "2780원"
                    },
                    {
                        "제품명": "레미레미 짜먹는 극강의 땅콩버터 소포장 250g 25g x 10개입 302612",
                        "단위 당 가격": "5960원"
                    },
                    {
                        "제품명": "슈퍼너츠 피넛버터 크런치 460g 스무스 460g",
                        "단위 당 가격": "5826원"
                    },
                    {
                        "제품명": "홀넛 무가당 무첨가 순 100% 땅콩버터 다이어트 땅콩잼 아기 이유식 피넛버터 스무스",
                        "단위 당 가격": "4950원"
                    },
                    {
                        "제품명": "슈퍼너츠100%땅콩 피넛버터 스무스 460g",
                        "단위 당 가격": "3130원"
                    },
                    {
                        "제품명": "너티풀 국내산 100 무첨가 크런치 스무스 피넛버터 국산 땅콩잼 땅콩버터 200g 원산지 국내산",
                        "단위 당 가격": "6550원"
                    },
                    {
                        "제품명": "옳곡 국내산 100% 무첨가 땅콩버터 464g 스무스",
                        "단위 당 가격": "5366원"
                    },
                    {
                        "제품명": "국산 땅콩버터 230g (100% 무첨가 피넛버터, 잼)",
                        "단위 당 가격": "5957원"
                    },
                    {
                        "제품명": "470g 순 땅콩버터 100 아르헨티나산 하이올레익 무설탕 무첨가 피넛버터 1개",
                        "단위 당 가격": "3383원"
                    },
                    {
                        "제품명": "코스트코 퀸즈트리 무가당 땅콩버터 피넛버터 크리미",
                        "단위 당 가격": "2521원"
                    },
                    {
                        "제품명": "[100%] 정미소 순 땅콩버터 크런치 400g / 설탕무첨가 피넛버터",
                        "단위 당 가격": "3725원"
                    },
                    {
                        "제품명": "땅콩100% 넛츠어바웃 무첨가 땅콩버터 스무스 500g 무가당 무염",
                        "단위 당 가격": "2780원"
                    },
                    {
                        "제품명": "3박스 레미레미 짜먹는 땅콩버터 클래식 솔티 구성 소포장 25g 10개입 X 3",
                        "단위 당 가격": "1548원"
                    },
                    {
                        "제품명": "너츠굿 무가당 땅콩버터 파우더 100 무첨가 무설탕 유기농 가루 피넛버터 땅콩잼 계량 스푼",
                        "단위 당 가격": "6450원"
                    },
                    {
                        "제품명": "일품미가 수입산 100 무첨가 땅콩버터 1kg 스무스 피넛 잼",
                        "단위 당 가격": "2580원"
                    }
                ]
            },
            {
                "group": "그룹 4",
                "range": "3501원 ~ 4500원",
                "count": 14,
                "product_list": [
                    {
                        "제품명": "피넛버터앤코 3통 무가당 100 미국정통 땅콩버터 설탕 무첨가278242",
                        "단위 당 가격": "3989원"
                    },
                    {
                        "제품명": "스키피 땅콩버터 2종 크리미+청크",
                        "단위 당 가격": "3113원"
                    },
                    {
                        "제품명": "스키피 크리미 땅콩버터 2.27kg 코스트코 대용량 피넛버터 땅콩스프레드",
                        "단위 당 가격": "3754원"
                    },
                    {
                        "제품명": "테디 땅콩버터 스무스 100% 454g 무설탕 무첨가 피넛버터 무염 스프레드",
                        "단위 당 가격": "3252원"
                    },
                    {
                        "제품명": "썸앤썸 국산 100% 무첨가 땅콩버터 200g 프리미엄 잼 (땅콩100%) 비건 피넛",
                        "단위 당 가격": "4450원"
                    },
                    {
                        "제품명": "스키피 SKIPPY 땅콩 버터 스프레드 무설탕 함유 청키 473 16온스 12팩",
                        "단위 당 가격": "3809원"
                    },
                    {
                        "제품명": "100%땅콩 슈퍼너츠 피넛버터 460g+슈퍼잼 블루베리 212g",
                        "단위 당 가격": "4870원"
                    },
                    {
                        "제품명": "옳곡 직 땅콩버터 총 6병크런치 200g x 3병 스무스 3병",
                        "단위 당 가격": "4540원"
                    },
                    {
                        "제품명": "크레이지피넛 국산 100% 오리지널 땅콩버터 무가당 설탕무첨가 500g",
                        "단위 당 가격": "5960원"
                    },
                    {
                        "제품명": "어썸 피넛 100% 피넛버터 리필팩 무첨가 무가당 땅콩버터 500g",
                        "단위 당 가격": "3120원"
                    },
                    {
                        "제품명": "포레스티 무첨가 100 땅콩버터 200g 2병 무가당 신선한 피넛버터 2개",
                        "단위 당 가격": "4073원"
                    },
                    {
                        "제품명": "꿀이구마 무첨가 땅콩잼 크리미 크런치 땅콩버터",
                        "단위 당 가격": "6045원"
                    },
                    {
                        "제품명": "피넛버터앤코 땅콩 버터 올드 패션드 크런치 454g",
                        "단위 당 가격": "3252원"
                    },
                    {
                        "제품명": "국산 땅콩버터 스무스 피넛버터 땅콩잼 무설탕 무첨가 100% 땅콩 볶음",
                        "단위 당 가격": "7400원"
                    }
                ]
            },
            {
                "group": "그룹 5",
                "range": "4501원 ~ 5500원",
                "count": 11,
                "product_list": [
                    {
                        "제품명": "무염 테디 땅콩버터 스무스 다이어트 454g",
                        "단위 당 가격": "3252원"
                    },
                    {
                        "제품명": "코스트코 땅콩 버터 스키피 잼 SKIPPY 슈퍼청크 대용량 크런치 피넛 1.36kg 2병",
                        "단위 당 가격": "4353원"
                    },
                    {
                        "제품명": "[슈퍼너츠] 무첨가 땅콩버터 460g 2종 (택1)",
                        "단위 당 가격": "3130원"
                    },
                    {
                        "제품명": "수입산 100% 무첨가 땅콩버터 1kg 스무스 피넛 잼",
                        "단위 당 가격": "2580원"
                    },
                    {
                        "제품명": "넛츠그린 땅콩 스프레드 무설탕 잼 식물성 피넛 버터",
                        "단위 당 가격": "4400원"
                    },
                    {
                        "제품명": "퀸즈트리 땅콩버터 땅콩쨈 크런치+크리미 대용량 500g",
                        "단위 당 가격": "3958원"
                    },
                    {
                        "제품명": "러브앤피넛 무설탕 땅콩버터 100% 국산 피넛버터 210g 5가지 맛",
                        "단위 당 가격": "6429원"
                    },
                    {
                        "제품명": "넛츠그린 땅콩 스프레드 크런치 (100% 무첨가 땅콩 피넛 버터 잼) 200g",
                        "단위 당 가격": "4400원"
                    },
                    {
                        "제품명": "어썸 피넛 100% 피넛버터 무첨가 무가당 땅콩버터 200g",
                        "단위 당 가격": "3900원"
                    },
                    {
                        "제품명": "포레스티 국내제조 무첨가 100 땅콩버터 200g 1병 무가당 신선한 피넛버터",
                        "단위 당 가격": "4750원"
                    },
                    {
                        "제품명": "리고 LIGO 땅콩버터 청키 462g 6개",
                        "단위 당 가격": "4173원"
                    }
                ]
            },
            {
                "group": "그룹 6",
                "range": "5501원 ~ 6500원",
                "count": 9,
                "product_list": [
                    {
                        "제품명": "스머커즈 구버 포도 딸기 땅콩버터 510g",
                        "단위 당 가격": "5982원"
                    },
                    {
                        "제품명": "유기농 테라사나 100% 땅콩버터 피넛버터 크런치 500g 땅콩 잼 무첨가",
                        "단위 당 가격": "2560원"
                    },
                    {
                        "제품명": "안단잼 땅콩 피넛 버터 400g 100% 크런치 무가당 무설탕 저당",
                        "단위 당 가격": "2975원"
                    },
                    {
                        "제품명": "슈퍼너츠 100% 땅콩 피넛버터 크런치 460g + 스무스 460g",
                        "단위 당 가격": "5826원"
                    },
                    {
                        "제품명": "국산 땅콩버터 피넛 대용량 100% 무가당 순 무첨가 200g 볶음땅콩",
                        "단위 당 가격": "5300원"
                    },
                    {
                        "제품명": "레미레미 짜먹는 극강의 땅콩버터 소포장 250g (25g x 10개입)",
                        "단위 당 가격": "5960원"
                    },
                    {
                        "제품명": "너티풀 국내산 국산 100% 무첨가 무가당 크런치 스무스 피넛버터 땅콩잼 땅콩버터 200g",
                        "단위 당 가격": "6550원"
                    },
                    {
                        "제품명": "국산 땅콩버터 500g 23년 땅콩 100 무첨가 피넛버터 1021559",
                        "단위 당 가격": "5780원"
                    },
                    {
                        "제품명": "일품미가 국산 100 무첨가 땅콩버터 1kg 피넛 잼 원산지 국산",
                        "단위 당 가격": "5380원"
                    }
                ]
            },
            {
                "group": "그룹 7",
                "range": "6501원 ~ 7500원",
                "count": 10,
                "product_list": [
                    {
                        "제품명": "스키피 수퍼 청크 크런치 피넛 땅콩 버터 잼 1.36kg x 1개 코스트코",
                        "단위 당 가격": "1757원"
                    },
                    {
                        "제품명": "넛츠그린 땅콩버터 100% 무첨가 무설탕 피넛 땅콩스프레드 200g",
                        "단위 당 가격": "4400원"
                    },
                    {
                        "제품명": "순 땅콩버터 470g 100% 무설탕 무첨가 슈퍼 땅콩잼 넛츠 피넛버터",
                        "단위 당 가격": "3383원"
                    },
                    {
                        "제품명": "Ligo 리고 땅콩버터 크리미 1kg 피넛 버터",
                        "단위 당 가격": "7380원"
                    },
                    {
                        "제품명": "스키피 수퍼청크 땅콩버터",
                        "단위 당 가격": "1591원"
                    },
                    {
                        "제품명": "피넛버터앤코 3통 무가당 100% 미국정통 땅콩버터 설탕 무첨가",
                        "단위 당 가격": "3989원"
                    },
                    {
                        "제품명": "국산 땅콩버터 500g (100% 무첨가 피넛버터, 잼)",
                        "단위 당 가격": "5780원"
                    },
                    {
                        "제품명": "유기농 테라사나 100% 땅콩버터 피넛버터 스무스 500g 땅콩 잼 무첨가",
                        "단위 당 가격": "2560원"
                    },
                    {
                        "제품명": "퀸즈트리 피넛버터크런치 500G",
                        "단위 당 가격": "1898원"
                    },
                    {
                        "제품명": "최화정 무가당 무첨가 땅콩버터 100 크런치 200g 3개",
                        "단위 당 가격": "6665원"
                    }
                ]
            },
            {
                "group": "그룹 8",
                "range": "7501원 ~ 8500원",
                "count": 6,
                "product_list": [
                    {
                        "제품명": "유기농 순 땅콩버터 100% 설탕 무첨가 무가당 무염 피넛버터 땅콩잼 만들기 효능 스무드",
                        "단위 당 가격": "4800원"
                    },
                    {
                        "제품명": "국산 땅콩버터 80g (100% 무첨가 피넛버터, 잼)",
                        "단위 당 가격": "9375원"
                    },
                    {
                        "제품명": "오넛티 오넛티 땅콩버터 오리지널 100 무첨가 230g",
                        "단위 당 가격": "6543원"
                    },
                    {
                        "제품명": "너츠굿 무가당 땅콩버터 무첨가 100% 파우더 무설탕",
                        "단위 당 가격": "6450원"
                    },
                    {
                        "제품명": "김재식헬스푸드 진짜 땅콩버터크림 350g",
                        "단위 당 가격": "2543원"
                    },
                    {
                        "제품명": "옳곡 넛버터 땅콩버터 총 4병 크런치 200g x 2병 스무스 200g x 2병",
                        "단위 당 가격": "4880원"
                    }
                ]
            },
            {
                "group": "그룹 9",
                "range": "8501원 ~ 9500원",
                "count": 2,
                "product_list": [
                    {
                        "제품명": "스키피 스키피 땅콩버터 수퍼청크 1.36kg",
                        "단위 당 가격": "1875원"
                    },
                    {
                        "제품명": "제이넛터 무가당 100 땅콩버터 대용량 2개 2kg",
                        "단위 당 가격": "6725원"
                    }
                ]
            },
            {
                "group": "그룹 10",
                "range": "9501원 ~ 10500원",
                "count": 3,
                "product_list": [
                    {
                        "제품명": "순 땅콩버터 100%땅콩 무첨가 무설탕 슈퍼 땅콩잼 넛츠 피넛버터  300g  1개",
                        "단위 당 가격": "3300원"
                    },
                    {
                        "제품명": "스키피 땅콩버터 청크",
                        "단위 당 가격": "1422원"
                    },
                    {
                        "제품명": "슈퍼잼 땅콩 피넛버터 크런치 460g",
                        "단위 당 가격": "3130원"
                    }
                ]
            },
            {
                "group": "그룹 11",
                "range": "10501원 ~ 11500원",
                "count": 1,
                "product_list": [
                    {
                        "제품명": "스키피 땅콩버터 수퍼청크 1.36kg 2개",
                        "단위 당 가격": "1596원"
                    }
                ]
            },
            {
                "group": "그룹 12",
                "range": "11501원 ~ 12500원",
                "count": 4,
                "product_list": [
                    {
                        "제품명": "무가당 크런치 땅콩버터 아침대용 식단관리 신선한땅콩",
                        "단위 당 가격": "6750원"
                    },
                    {
                        "제품명": "썸앤썸 크런치 100% 땅콩버터 프리미엄 1kg 무첨가 잼 땅콩잼 피넛  1개",
                        "단위 당 가격": "18900원"
                    },
                    {
                        "제품명": "미국산 100 무첨가 땅콩버터 1kg 스무스 피넛 잼",
                        "단위 당 가격": "17900원"
                    },
                    {
                        "제품명": "슈퍼너츠 100% 땅콩 피넛버터 크런치 460g 2개 + 슈퍼너츠 그래놀라 150g 1개",
                        "단위 당 가격": "6367원"
                    }
                ]
            },
            {
                "group": "그룹 13",
                "range": "12501원 ~ 13500원",
                "count": 2,
                "product_list": [
                    {
                        "제품명": "옳곡 넛버터 땅콩버터 총 4병 크런치 200g x 2병 스무스 200g x 2병",
                        "단위 당 가격": "4880원"
                    },
                    {
                        "제품명": "리고 크리미 땅콩버터 땅콩소스 (피넛버터) 잼 1kg",
                        "단위 당 가격": "7700원"
                    }
                ]
            },
            {
                "group": "그룹 14",
                "range": "13501원 ~ 14500원",
                "count": 1,
                "product_list": [
                    {
                        "제품명": "글루어트 저당 식물성 고단백 무설탕 땅콩버터 크런치 280g x 2개",
                        "단위 당 가격": "7170원"
                    }
                ]
            }
        ]
    }
}
  // 기존 데이터 대신 단위당 가격 데이터로 대체
  const productPrices = priceData.price_scrap_report.price_range_groups.flatMap(group =>
    group.product_list.map(product => parseFloat(product["단위 당 가격"].replace("원", "").replace(",", "")))
  );
  
  // 가격 구간 집계 (예: 500원 단위로 그룹화)
  const binWidth = 500;
  const bins = d3.histogram()
    .thresholds(d3.range(0, d3.max(productPrices) + binWidth, binWidth))
    (productPrices);

  const [data, setData] = useState(productPrices);
  const [range, setRange] = useState([10, 40]);
  const [width, setWidth] = useState(500);
  const minPrice = d3.min(data);
  const maxPrice = d3.max(data);
  const avgPrice = Math.round(d3.mean(data));

  useEffect(() => {
    const handleResize = () => {
      const newWidth = sliderRef.current.parentElement.offsetWidth;
      setWidth(newWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const svg = d3.select(sliderRef.current);
    const height = 150;
    const margin = { left: 40, right: 40, top: 20, bottom: 20 };

    // x 축 스케일 설정
    const x = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([margin.left, width - margin.right])
      .clamp(true);

    // bins 배열의 각 항목에서 d.length 값으로 최대값 설정
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])  // 각 구간의 제품 개수를 기반으로 Y축 도메인 설정
      .range([height - margin.bottom, margin.top]);

    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    const xAxis = d3.axisBottom(x).ticks(10);
    const xAxisGroup = svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    xAxisGroup.selectAll('path')
      .style('stroke', '#E0E4EB')
      .style('stroke-width', '5px');

    xAxisGroup.selectAll('line')
      .style('stroke', '#E0E4EB')
      .style('stroke-width', '5px');

    // 선택된 범위에 대한 파란색 선 추가
    svg.append('rect')
      .attr('x', x(range[0]))
      .attr('y', height - margin.bottom + 0)
      .attr('width', x(range[1]) - x(range[0]))
      .attr('height', '5px')
      .style('fill', palette.chatBlue);

    // 바차트 그리기: 각 가격 구간에 속하는 제품 개수로 바 높이 설정
    const barWidth = (width - margin.left - margin.right) / bins.length;
    svg.selectAll('.bar')
    .data(bins)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => margin.left + i * barWidth)
    .attr('y', d => y(d.length)) // 바 차트의 높이는 데이터의 개수로 설정
    .attr('width', barWidth)
    .attr('height', d => height - margin.bottom - y(d.length))
    .style('fill', '#E0E4EB')
    // X축 값과 range 값 비교: 스케일링된 값을 비교하지 않고 실제 데이터 값(d.x0, d.x1)과 비교
    .style('display', d => (d.x0 >= range[0] && d.x1 <= range[1]) ? 'block' : 'none');
  

    let dragOffset = 0; // 드래그 시 좌표 보정을 위한 변수를 선언
    
    const drag = d3.drag()
      .on('start', function (event) {
        const pos = d3.pointer(event, this)[0]; // 드래그 시작 시 마우스 포인터의 좌표
        const handleIndex = +d3.select(this).attr('data-index');
        let newRange = [...range];
    
        const handlePos = x(range[handleIndex]);  // 핸들의 현재 위치를 가져옴
        dragOffset = handlePos - pos;  // 마우스 위치와 핸들의 차이를 계산 (보정값)
        
        // 마우스 포인터와 핸들의 위치 일치시키기
        const newValue = x.invert(pos + dragOffset);  // 보정값을 더하여 핸들을 왼쪽으로 이동
        newRange[handleIndex] = newValue;
    
        if (newRange[0] < newRange[1]) {
          setRange(newRange);
        }
      })
      .on('drag', function (event) {
        const pos = d3.pointer(event, this)[0];
        const handleIndex = +d3.select(this).attr('data-index');
        let newRange = [...range];
    
        // Drag Position에서 70을 빼서 보정
        const correctedPos = pos - 70;    
        const newValue = x.invert(correctedPos + dragOffset);  // 보정값을 더하여 이동
        newRange[handleIndex] = newValue;
    
        if (newRange[0] < newRange[1]) {
          setRange(newRange);
        }
      });
    

    svg.selectAll('.handle')
      .data(range)
      .enter().append('circle')
      .attr('class', 'handle')
      .attr('cx', d => x(d))
      .attr('cy', height - margin.bottom + 2)
      .attr('r', 8)
      .attr('data-index', (d, i) => i)
      .style('fill', palette.chatBlue)
      .call(drag);

    // 드래그 핸들 아래에 가격 표시 추가 (소수점 제거 및 텍스트 레이어 조정)
    svg.selectAll('.handle-label')
      .data(range)
      .enter().append('text')
      .attr('class', 'handle-label')
      .attr('x', d => x(d))
      .attr('y', height - margin.bottom +20)  // 텍스트를 약간 아래로
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .style('pointer-events', 'none')  // 마우스 이벤트가 텍스트에 영향을 주지 않도록 함
      .style('position', 'relative')    // CSS에서 position을 설정하여 z-index 적용
      .text(d => `₩${d3.format(",.0f")(d)}`);

  }, [range, data, width]);

  const [isMoreView, setIsMoreView] = useState(false);
  const onClickImageMoreViewButton = () => {
    setIsMoreView(!isMoreView);
  };

  return (
    <>
      <Wrap>
        <h1>가격 분석할 제품군을 선택해주세요 (택 1)</h1>

        <OptionContainer>
          <Option
          >뷰티 디바이스</Option>
          <Option>기능성 화장품</Option>
        </OptionContainer>

        <ButtonWrap>
          <div className="finish">확인</div>
        </ButtonWrap>
      </Wrap>

      <Wrap H1Border>
        <h1>뷰티 디바이스 가격 분석 리포트</h1>
        <p>
          <span>소비자 가격 수용 범위 예측</span>
          20만원 ~ 30만원 사이
        </p>

        <ChartWrap>
          <svg ref={sliderRef}></svg>

          <PriceWrap>
            <div>
              <span>최저 가격</span>
              <input type="text" value={`₩${minPrice.toLocaleString()}원`} readOnly></input>
              </div>
            <div>
              <span>최대 가격</span>
              <input type="text" value={`₩${maxPrice.toLocaleString()}원`} readOnly></input>
              </div>
            <div>
              <span>평균가</span>
              <input type="text" value={`₩${avgPrice.toLocaleString()}원`} readOnly></input>
              </div>
          </PriceWrap>

          <p>* (가격의 기준 : 예시 100g당 가격 등)을 기준으로 평가되었습니다.</p>
        </ChartWrap>

        <AnalysisWrap>
          <div>
            <span>가격대 분석</span>
            <p>대부분의 제품은 100,000원에서 500,000원 사이에 형성되어 있으며, 고가 제품은 1,000,000원 이상의 가격대를 형성하고 있습니다.<br />
            경쟁 제품들의 가격과 소비자의 브랜드 인식을 바탕으로, 소비자들이 수용할 수 있는 가격 범위는 100,000원에서 500,000원 사이로 예상됩니다. 특히, 200,000원에서 300,000원 사이의 가격대는 소비자들이 가장 많이 수용할 것으로 예상됩니다.</p>
          </div>

          <AnalysisBox isMoreView={isMoreView}>
            <div>
              <span>최소 가격군 제품</span>
              <ul>
                <li>
                  <span>1</span>
                  <p>루킨스 고주파 마사지기1</p>
                  <strong>1,920,000원</strong>
                </li>
                <li>
                  <span>2</span>
                  <p>루킨스 고주파 마사지기2</p>
                  <strong>1,580,000원</strong>
                </li>
                <li>
                  <span>3</span>
                  <p>루킨스 고주파 마사지기3</p>
                  <strong>1,340,000원</strong>
                </li>
              </ul>
            </div>
            
            <div>
              <span>최대 가격군 제품</span>
              <ul>
                <li>
                  <span>1</span>
                  <p>센텔리안24</p>
                  <strong>279,000원</strong>
                </li>
                <li>
                  <span>2</span>
                  <p>센텔리안21</p>
                  <strong>244,000원</strong>
                </li>
                <li>
                  <span>3</span>
                  <p>센텔리안18</p>
                  <strong>238,000원</strong>
                </li>
              </ul>
            </div>
            
            <div>
              <span>평균가 가격군 제품</span>
              <ul>
                <li>
                  <span>1</span>
                  <p>닥터리</p>
                  <strong>299,000원</strong>
                </li>
                <li>
                  <span>2</span>
                  <p>닥터리</p>
                  <strong>279,000원</strong>
                </li>
                <li>
                  <span>3</span>
                  <p>닥터리</p>
                  <strong>259,000원</strong>
                </li>
              </ul>
            </div>
          </AnalysisBox>

          <MoreViewButtonWrap isMoreView={isMoreView}>
            <MoreButton onClick={onClickImageMoreViewButton} isMoreView={isMoreView}>
              {isMoreView ? "접기" : "더보기"}
            </MoreButton>
          </MoreViewButtonWrap>
        </AnalysisWrap>
      </Wrap>

    </>
  );
};

export default PriceAnalysis;

const Wrap = styled.div`
  max-width:540px;
  width:100%;
  display:flex;
  flex-direction:column;
  gap:20px;
  padding:20px;
  margin:24px 0 0 44px;
  border-radius:15px;
  border:1px solid ${palette.lineGray};

  h1 {
    position:relative;
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:1rem;
    font-weight:700;
    text-align:left;
  }

  ${(props) =>
    props.H1Border &&
    css`
      h1 {
        padding-bottom:8px;
        margin-bottom:12px;
        border-bottom:1px solid ${palette.lineGray};
      }
    `
  }

  p {
    display:flex;
    flex-direction:column;
    gap:8px;
    font-size:1.25rem;
    font-weight:600;
    color:${palette.gray800};
    text-align:left;

    span {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray500};
    }
  }
`;

const OptionContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:8px;
`;

const Option = styled.div`
  position:relative;
  display:flex;
  align-items:center;
  gap:8px;
  font-size:0.88rem;
  color: ${palette.gray800};
  padding:8px 12px;
  border-radius:8px;
  cursor:pointer;
  border: 1px solid ${palette.lineGray};
  background-color: ${palette.white};
  transition:all .5s;
  
  &:before {
    display:inline-block;
    width:20px;
    height:20px;
    border-radius:50%;
    border: 1px solid ${palette.lineGray};
    background-color: ${palette.white};
    transition:all .5s;
    content:'';
  }
    
  &:after {
    position:absolute;
    left:12px;
    top:8px;
    width:20px;
    height:20px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8' fill='none'%3E%3Cpath d='M9 0.914062L3.4 6.91406L1 4.51406' stroke='white' stroke-width='1.33333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center no-repeat;
    content:'';
  }
    
  &:hover {
    border-color: ${palette.blue};
  }
`;

const ButtonWrap = styled.div`
  margin-top:auto;
  display:flex;
  justify-content:space-between;
  align-items:center;

  .finish {
    font-size:0.88rem;
    color:${palette.chatBlue};
    margin-left:auto;
    border-radius:8px;
    background:none;
    cursor:pointer;
    transition:all .5s;
  }
`;

const ChartWrap = styled.div`
  .tick {
    display:none;
  }

  .handle {
    box-shadow:2px 2px 8px rgba(34, 111, 255, .5);
  }

  p {
    font-size:0.75rem;
    font-weight:400;
    color:${palette.gray500};
    margin-top:8px;
  }
`;

const PriceWrap = styled.div`
  display:flex;
  align-items:center;
  gap:12px;
  margin-top:15px;

  > div {
    display:flex;
    flex-direction:column;
    gap:6px;
    flex: 1 1 40%;
    font-size:0.88rem;
    text-align:left;
    padding:8px;
    border-radius:6px;
    border:1px solid ${palette.lineGray};

    span {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray500};
    }

    input {
      width:100%;
      font-family: 'Pretendard', 'Poppins';
      font-size:0.88rem;
      color:${palette.gray800};
      border:0;
      outline:none;
    }

    p {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray800};
    }
  }
`;

const AnalysisWrap = styled.div`
  display:flex;
  flex-direction:column;
  gap:20px;
  margin-top:12px;
  padding-top:20px;
  border-top:1px solid ${palette.lineGray};

  div {
    display:flex;
    flex-direction:column;
    gap:8px;
    text-align:left;
  }

  span {
    font-size:0.88rem;
    font-weight:400;
    color:${palette.gray500};
  }

  p {
    font-size:0.88rem;
    font-weight:400;
    color:${palette.gray800};
    line-height:1.3;
  }

  ul {
    display:flex;
    flex-direction:column;
    gap:4px;
    padding:8px 20px 8px 6px;
    border-radius:12px;
    background:${palette.chatGray};
  }

  li {
    display:flex;
    align-items:center;
    gap:12px;

    span {
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      width:27px;
      height:27px;
      border-radius:50%;
      border:1px solid ${palette.lineGray};
      background:${palette.white};
    }

    strong {
      font-size:0.88rem;
      font-weight:400;
      color:${palette.gray800};
      text-align:right;
      margin-left:auto;
    }
  }
`;

const AnalysisBox = styled.div`
  max-height: ${(props) => (props.isMoreView 
    ? "1000px" 
    : "115px")}; 
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`;

const MoreViewButtonWrap = styled.div`
  position: relative;
  align-items:center;
  margin-top:14x;

  &:before {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 100%;
    height: ${(props) => (props.isMoreView ? "" : "100px")}; //그라데이션 높이
    background: linear-gradient(
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    content: "";
  }
`;

const MoreButton = styled.button`
  position:relative;
  display:flex;
  align-items:center;
  gap:12px;
  font-family: 'Pretendard', 'Poppins';
  font-size:1rem;
  color:${palette.gray800};
  border:0;
  background:none;

  &:after {
    width:8px;
    height:8px;
    margin-top: ${(props) => (props.isMoreView 
      ? "5px" 
      : "")};
    transform: ${(props) => (props.isMoreView 
      ? "rotate(-135deg)" 
      : "rotate(45deg)")};
    border-right:2px solid ${palette.gray800};
    border-bottom:2px solid ${palette.gray800};
    transition:all .5s;
    content:'';
  }
`;
