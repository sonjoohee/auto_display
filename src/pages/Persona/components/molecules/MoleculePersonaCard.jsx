import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../../../../assets/styles/Palette';
import images from '../../../../assets/styles/Images';
import { Button } from '../../../../assets/styles/ButtonStyle'
import PopupWrap from '../../../../assets/styles/Popup';
import { CustomTextarea } from '../../../../assets/styles/InputStyle';
import {
  AccordionSection,
  CustomAccordionHeader,
  CustomAccordionIcon,
  CustomAccordionContent
} from '../../../../components/common/Accordion';

const MoleculePersonaCard = ({ 
  title, 
  keywords = [], 
  isBasic = false, 
  isCustom = false, 
  hideCheckCircle = false,
  TitleFlex = false,
  onSelect,
  currentSelection,
  onClick,
  checked = null,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheck = () => {
    if (isCustom) {
      onClick && onClick();  // 팝업 표시를 위한 콜백 실행
      return;
    }
    onSelect && onSelect();

    // 이미 선택된 상태면 항상 해제 가능
    if (isChecked && checked === null) {
      setIsChecked(false);
      onSelect(false);
    } 
    // 새로 선택하는 경우, 최대 선택 개수 확인
    else if (currentSelection < 5 && checked === null) {
      setIsChecked(true);
      onSelect(true);
    }
  };

  const [state, setState] = useState({
    isExpanded: false,
    isChecked: false,
    showPopup: false,
    showRequestBadge: false,
    showCustomModal: false,
    customTextarea: '',
    isTextareaValid: false,
    isRadioSelected: false,
    showQuestions: false,
    showCustomPopup: false,
    isAccordionOpen: false,
    formState: {
      purpose: '',
      personaCount: '',
      gender: '',
      age: '',
      additionalInfo: ''
    }
  });

  const handleInputChange = (field, value) => {
    setState(prev => ({
      ...prev,
      formState: {
        ...prev.formState,
        [field]: value
      }
    }));
  };

  const isFormValid = () => {
    return state.formState.purpose.trim() !== '' && state.formState.personaCount !== '';
  };

  return (
    <>
    <CardContainer TitleFlex={TitleFlex} $isChecked={isChecked}>
      <MainContent>
        {!hideCheckCircle && (
          <CheckCircle 
            $isChecked={isChecked}
            onClick={handleCheck}
          />
        )}

        <ContentWrapper>
          <TitleSection>
            <Title>{title}</Title>
          </TitleSection>
          
          {keywords.length > 0 && (
            <KeywordGroup>
              {keywords.map((keyword, index) => (
                <KeywordTag key={index}>#{keyword}</KeywordTag>
              ))}
            </KeywordGroup>
          )}

        </ContentWrapper>

        {isBasic ? (
            <Badge Basic>
              <img src={images.StatusBadgeBasic} alt="기본형" />
              기본형
            </Badge>
          ) : isCustom ? (
            state.showRequestBadge ? (
              <Badge Custom>
                <img src={images.StatusBadgeCustom} alt="커스터마이즈" />
                커스터마이즈
              </Badge>
            ) : (
              <Button 
                Large 
                Primary
                onClick={(e) => {
                  e.stopPropagation();
                  // console.log('Badge clicked');
                  setState(prev => {
                    // console.log('Previous state:', prev);
                    const newState = { ...prev, showPopup: true };
                    // console.log('New state:', newState);
                    return newState;
                  });
                }}
              >
                {/* <img src={images.PencilSquare} alt="" /> */}
                모집 요청하기
              </Button>
            )
          ) : (
            <></>
          )}
      </MainContent>

    </CardContainer>
      {state.showPopup && (
        <PopupWrap 
          title="📝 맞춤형 페르소나 모집 요청하기" 
          buttonType="Fill"
          confirmText="맞춤 페르소나 모집하기"
          isModal={true}
          onClose={() => setState(prev => ({ ...prev, showPopup: false }))}
          onCancel={() => setState(prev => ({ ...prev, showPopup: false }))}
          onConfirm={() => {
            if (isFormValid()) {
              setState(prev => ({
                ...prev,
                showPopup: false
              }));
            }
          }}
          isFormValid={isFormValid()}
          body={
            <>
              <div className="bgBox">
                <strong>도심에 거주하며 전문직에 종사하는 바쁜 생활인 </strong>
                <p className="tag">
                  <span>키워드1</span>
                  <span>키워드2</span>
                  <span>키워드3</span>
                </p>
              </div>

              <dl>
                <dt className="point">맞춤형 페르소나는 어떤 용도로 활용하실 계획이신가요?</dt>
                <dd>
                  <CustomTextarea 
                    rows={3}
                    placeholder="생성하기 위한 목적을 적어 주세요."
                    value={state.formState.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                  />
                </dd>
              </dl>

              <dl>
                <dt className="point">몇명의 페르소나를 모집하시고 싶으신가요?</dt>
                <dd>
                  <input 
                    type="radio" 
                    id="persona1" 
                    name="persona" 
                    value="5"
                    onChange={(e) => handleInputChange('personaCount', e.target.value)}
                  />
                  <label htmlFor="persona1" className="persona">5명</label>
                  <input 
                    type="radio" 
                    id="persona2" 
                    name="persona" 
                    value="10"
                    onChange={(e) => handleInputChange('personaCount', e.target.value)}
                  />
                  <label htmlFor="persona2" className="persona">10명</label>
                  <input 
                    type="radio" 
                    id="persona3" 
                    name="persona" 
                    value="15"
                    onChange={(e) => handleInputChange('personaCount', e.target.value)}
                  />
                  <label htmlFor="persona3" className="persona">15명</label>
                  <input 
                    type="radio" 
                    id="persona4" 
                    name="persona" 
                    value="20"
                    onChange={(e) => handleInputChange('personaCount', e.target.value)}
                  />
                  <label htmlFor="persona4" className="persona">20명</label>
                </dd>
              </dl>

              <AccordionSection>
                <CustomAccordionHeader 
                  onClick={() => setState(prev => ({
                    ...prev,
                    isAccordionOpen: !prev.isAccordionOpen
                  }))}
                >
                  🔍 추가정보를 입력하여, 더 정확한 타겟 페르소나를 찾으세요
                  <CustomAccordionIcon isOpen={state.isAccordionOpen} />
                </CustomAccordionHeader>
                {state.isAccordionOpen && (
                  <CustomAccordionContent>
                    <dl>
                      <dt>추가정보</dt>
                      <dd>
                        <input type="radio" id="gender1" name="gender" />
                        <label htmlFor="gender1" className="gender men">
                          <img src={images.GenderMen} alt="GenderMen" />
                          남자
                        </label>
                        <input type="radio" id="gender2" name="gender" />
                        <label htmlFor="gender2" className="gender women">
                          <img src={images.GenderWomen} alt="GenderWomen" />
                          여자
                        </label>
                      </dd>
                    </dl>

                    <dl>
                      <dt>
                        나이
                        <p>* 선택하지 않는 경우, 연령 무관으로 페르소나를 생성합니다.</p>
                      </dt>
                      <dd>
                        <input type="radio" id="age1" name="age" />
                        <label htmlFor="age1" className="age">10대</label>
                        <input type="radio" id="age2" name="age" />
                        <label htmlFor="age2" className="age">20대</label>
                        <input type="radio" id="age3" name="age" />
                        <label htmlFor="age3" className="age">30대</label>
                        <input type="radio" id="age4" name="age" />
                        <label htmlFor="age4" className="age">40대</label>
                        <input type="radio" id="age5" name="age" />
                        <label htmlFor="age5" className="age">50대</label>
                        <input type="radio" id="age6" name="age" />
                        <label htmlFor="age6" className="age">60대</label>
                        <input type="radio" id="age7" name="age" />
                        <label htmlFor="age7" className="age">70대 이상</label>
                      </dd>
                    </dl>

                    <dl>
                      <dt>더 상세하게 필요한 정보를 입력해주세요 </dt>
                      <dd>
                        <CustomTextarea 
                          rows={3}
                          placeholder="모집하고 싶은 페르소나의 성향, 목표, 행동 패턴을 구체적으로 입력해주세요"
                        />
                      </dd>
                    </dl>
                  </CustomAccordionContent>
                )}
              </AccordionSection>
            </>
          }
        />
      )}
    </>
  );
};

export default MoleculePersonaCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid ${props => props.$isChecked ? palette.primary : palette.outlineGray};
  background: ${props => props.isActive ? 'rgba(34, 111, 255, 0.10)' : palette.white};
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  transition: all 0.2s ease-in-out;

  ${props => props.TitleFlex && css`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  `}
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  > button {
    display: flex;
    align-items: center;
    gap: 12px;

    &:after {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-right: 2px solid ${palette.primary};
      border-top: 2px solid ${palette.primary};
      transform: rotate(45deg);
      content: '';
    }
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background-image: ${props => props.$isChecked 
    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23226FFF'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
    : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Ccircle cx='12' cy='12' r='11' stroke='%23E0E4EB' stroke-width='2'/%3E%3Cpath d='M6.76562 12.4155L9.9908 15.6365L17.2338 8.36426' stroke='%23E0E4EB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
  };
  transition: background-image 0.3s ease-in-out;
  cursor: pointer;
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.div`
  font-weight: 600;
  color: ${palette.gray800};
  text-align: left;
  word-wrap: break-word;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  line-height: 1.2;
  color: ${props => {
    if (props.Basic) return `#34C759`;
    else if (props.Custom) return palette.gray500;
    else return palette.gray500;
  }};
  padding: 4px 8px;
  border-radius: 50px;
  border: 1px solid ${props => {
    if (props.Basic) return `#34C759`;
    else if (props.Custom) return palette.primary;
    else return palette.outlineGray;
  }};
  background:${props => {
    if (props.Basic) return `rgba(52, 199, 89, 0.10)`;
    else if (props.Custom) return palette.primary;
    else return palette.gray50;
  }};
  cursor: pointer;
`;

const ReadyIcon = styled.div`
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent #34C759;
  transform: rotate(0deg);
`;

const KeywordGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Description = styled.div`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray500};
  text-align: left;
  word-break: keep-all;
  white-space: pre-wrap;
`;

const KeywordTag = styled.div`
  padding: 4px 10px;
  color: #666666;
  font-size: 0.75rem;
  line-height: 1.6;
  border-radius: 20px;
  background: ${palette.chatGray};
`;

const ToggleButton = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height:10px;
    transform: ${props => props.$isExpanded 
      ? 'translate(-50%, -50%) rotate(45deg)' 
      : 'translate(-50%, -50%) rotate(-135deg)'};
    margin-top: 2px;
    border-top: 1px solid ${palette.gray500};
    border-left: 1px solid ${palette.gray500};
    transition: all .5s;
  }
`;

const DescriptionSection = styled.div`
  width: 100%;
  font-weight: 300;
  line-height: 1.5;
  color: ${palette.gray800};
  text-align: left;
  border-radius: 10px;
  border: ${props => props.$isTabContent 
    ? `1px solid ${palette.outlineGray}`
    : 'none' };

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    line-height: 1.5;
    color: ${palette.gray800};
    padding: 20px;
    border-radius: 10px;
    background: ${props => props.$isTabContent 
      ? 'transparent'
      : palette.chatGray};
    cursor: pointer;
  }
`;

const ListUL = styled.div`
  padding: 20px;
  border-radius: 15px;
  border: 1px solid ${palette.outlineGray};

  ul {
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${palette.gray800};

    + li {
      padding-top: 8px;
      margin-top: 8px;
      border-top: 1px solid ${palette.outlineGray};
    }
  }

  .number {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: ${palette.primary};
    border-radius: 2px;
    border: 1px solid rgba(34, 111, 255, 0.50);
    background: rgba(34, 111, 255, 0.04);
  }
`;

const RecruitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 4px;
  background: ${palette.primary};
  color: ${palette.white};
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${palette.primaryDark};
  }
  
  img {
    width: 16px;
    height: 16px;
  }
`;