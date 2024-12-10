import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../../assets/styles/Palette';
import images from '../../assets/styles/Images';
import { Button } from '../../assets/styles/ButtonStyle'
import PopupWrap from '../../assets/styles/Popup';
import { CustomTextarea } from '../../assets/styles/InputStyle';

const PersonaCard = ({ 
  title, 
  keywords = [], 
  description, 
  expandedContent, 
  isBasic = false, 
  isCustom = false, 
  showDescription = false,
  hideCheckCircle = false,
  TitleFlex = false,
  onCheckChange,
  onInputChange,
  onShowPopup
}) => {
  const [state, setState] = useState({
    isExpanded: false,
    isChecked: false,
    showPopup: false,
    showRequestBadge: false,
    showCustomModal: false,
    customTextarea: '',
    isTextareaValid: false,
    isRadioSelected: false,
  });

  const handleToggle = (key) => {
    setState(prevState => ({ ...prevState, [key]: !prevState[key] }));
  };

  const handleTextareaChange = (value) => {
    setState(prevState => ({
      ...prevState,
      customTextarea: value,
      isTextareaValid: value.trim() !== '',
    }));
  };

  const handleRequestClick = () => {
    setState(prevState => ({ ...prevState, showRequestBadge: true, showCustomModal: true }));
  };

  const handleCheckCircleClick = () => {
    if (isCustom) {
        setState(prevState => ({ ...prevState, showPopup: true }));
        if (onShowPopup) {
            onShowPopup();
        }
    } else {
        const newCheckedState = !state.isChecked;
        setState(prevState => ({ ...prevState, isChecked: newCheckedState }));
        if (onCheckChange) {
            onCheckChange(newCheckedState);
        }
    }
  };

  const handleConfirm = () => {
    if (state.isTextareaValid && state.isRadioSelected) {
      setState(prevState => ({ 
        ...prevState, 
        showPopup: false, 
        showCustomModal: false, 
        showRequestBadge: true 
      }));
      console.log("확인 버튼 클릭");
    } else {
      alert("모든 필드를 입력해 주세요.");
    }
  };

  const handleCancel = () => {
    setState(prevState => ({ ...prevState, showPopup: false }));
    console.log("취소 버튼 클릭");
  };

  const handleClose = () => {
    setState(prevState => ({ 
      ...prevState, 
      showCustomModal: false 
    }));
    handleCancel();
    if (!state.isTextareaValid || !state.isRadioSelected) {
      setState(prevState => ({ 
        ...prevState, 
        showRequestBadge: false 
      }));
    }
  };

  const handlePopupClose = () => {
    setState(prevState => ({
      ...prevState,
      showPopup: false,
      showCustomModal: false,
      isTextareaValid: false,
      isRadioSelected: false,
    }));
  };



  // const [isExpanded, setIsExpanded] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
  // const [showRequestBadge, setShowRequestBadge] = useState(false);
  // const [showCustomModal, setShowCustomModal] = useState(false);
  // const [customTextarea, setCustomTextarea] = useState('');
  // const [isTextareaValid, setIsTextareaValid] = useState(false);
  // const [isRadioSelected, setIsRadioSelected] = useState(false);

  return (
    <CardContainer TitleFlex={TitleFlex}>
      <MainContent>
        {!hideCheckCircle && (
          <CheckCircle 
            $isChecked={state.isChecked}
            onClick={handleCheckCircleClick}
          />
        )}

        <ContentWrapper>
          <TitleSection>
            <Title>
              {title}
            </Title>
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
            <ReadyIcon />
            기본형
          </Badge>
        ) : isCustom ? (
          state.showRequestBadge ? (
            <Badge>
              <img src={images.NotePencil} alt="NotePencil" />
              커스터마이즈
            </Badge>
          ) : (
            <Button Medium Primary onClick={handleRequestClick}>
              모집 요청하기
            </Button>
          )
        ) : (
          <ToggleButton $isExpanded={state.isExpanded} onClick={() => handleToggle('isExpanded')} />
        )}
      </MainContent>

      {state.isExpanded && (
        <DescriptionSection $isExpanded={state.isExpanded}>
          <ListUL>
            {Array.isArray(expandedContent) ? (
              <ul>
                {expandedContent.map((item, index) => (
                  <li key={index}>
                    <span className="number">{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              description
            )}
          </ListUL>
        </DescriptionSection>
      )}

      {state.showCustomModal && (
        <PopupWrap 
          title="📝 맞춤형 페르소나 모집 요청하기" 
          onConfirm={handleConfirm}
          onCancel={handlePopupClose}
          buttonType="Fill"
          confirmText="맞춤 페르소나 모집하기"
          isModal={true}
          confirmDisabled={!state.isTextareaValid || !state.isRadioSelected}
          isTextareaValid={state.isTextareaValid}
          isRadioSelected={state.isRadioSelected}
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
                    onChange={(e) => handleTextareaChange(e.target.value)}
                  />
                </dd>
              </dl>

              <dl>
                <dt className="point">몇명의 페르소나를 모집하시고 싶으신가요?</dt>
                <dd>
                  <input type="radio" id="persona1" name="persona" onChange={() => setState(prevState => ({ ...prevState, isRadioSelected: true }))} />
                  <label htmlFor="persona1" className="persona">5명</label>
                  <input type="radio" id="persona2" name="persona" onChange={() => setState(prevState => ({ ...prevState, isRadioSelected: true }))} />
                  <label htmlFor="persona2" className="persona">10명</label>
                  <input type="radio" id="persona3" name="persona" onChange={() => setState(prevState => ({ ...prevState, isRadioSelected: true }))} />
                  <label htmlFor="persona3" className="persona">15명</label>
                  <input type="radio" id="persona4" name="persona" onChange={() => setState(prevState => ({ ...prevState, isRadioSelected: true }))} />
                  <label htmlFor="persona4" className="persona">20명</label>
                </dd>
              </dl>

              <AccordionSection>
                <AccordionHeader onClick={() => handleToggle('isExpanded')}>
                  🔍 추가정보를 입력하여, 더 정확한 타겟 페르소나를 찾으세요
                  <AccordionIcon $isExpanded={state.isExpanded} />
                </AccordionHeader>
                <AccordionContent $isExpanded={state.isExpanded}>
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
                </AccordionContent>
              </AccordionSection>
            </>
          }
        />
      )}

    </CardContainer>
  );
};

export default PersonaCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 24px 20px;
  border-radius: 10px;
  border: 1px solid ${props => props.isActive ? palette.chatBlue : palette.outlineGray};
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
  font-size:0.75rem;
  line-height: 1.2;
  color: ${props => {
    if (props.Basic) return `#34C759`;
    else return palette.gray500;
  }};
  padding: 4px 8px;
  border-radius: 50px;
  border: 1px solid ${props => {
    if (props.Basic) return `#34C759`;
    else return palette.outlineGray;
  }};
  background:${props => {
    if (props.Basic) return `rgba(52, 199, 89, 0.10)`;
    else return palette.gray50;
  }};
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
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${palette.gray500};
  text-align: left;
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
  padding: 20px;
  border-radius: 10px;
  border: ${props => props.$isTabContent 
    ? `1px solid ${palette.outlineGray}`
    : 'none' };
  background: ${props => props.$isTabContent 
    ? 'transparent'
    : palette.chatGray};
`;

const ListUL = styled.div`
  padding: 0;

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
    color: ${palette.chatBlue};
    border-radius: 2px;
    border: 1px solid rgba(34, 111, 255, 0.50);
    background: rgba(34, 111, 255, 0.04);
  }
`;

const AccordionSection = styled.div`
  width: 100%;
  margin-top: 20px;
  padding-top: 40px;
  border-top: 1px solid ${palette.outlineGray};
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5;
  color: ${palette.gray800};
  cursor: pointer;
`;

const AccordionIcon = styled.span`
  width: 10px;
  height: 10px;
  border-right: 2px solid ${palette.gray800};
  border-bottom: 2px solid ${palette.gray800};
  transform: ${props => props.$isExpanded ? 'rotate(225deg)' : 'rotate(45deg)'};
  transition: transform 0.5s;
`;

const AccordionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-height: ${props => props.$isExpanded ? '500px' : '0'};
  margin-top: ${props => props.$isExpanded ? '20px' : '0'};
  padding-bottom:5px;
  overflow: hidden;
  background: ${palette.white};
  transition: all 0.5s;
`;