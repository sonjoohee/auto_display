import React from 'react';
import { Body1, Body2, Sub3 } from "../../../../assets/styles/Typography";
import Dropzone from 'react-dropzone-uploader';
import images from "../../../../assets/styles/Images";
import { TabContent5Item,StyledDropzone } from "../../../../assets/styles/BusinessAnalysisStyle";

const MoleculeFileUpload = ({ 
  fileNames, 
  handleChangeStatus, 
  toolSteps
}) => {

  return (
    <TabContent5Item required>
      <div className="title">
        {/* <Body1 color="gray700">NPS 평가를 받을 컨셉보드를 업로드해주세요</Body1> */}
      </div>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        maxFiles={3}
        multiple={true}
        canRemove={true}
        canRestart={false}
        disabled={toolSteps >= 1}
        accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp, application/pdf"
        maxSizeBytes={20 * 1024 * 1024}

        inputWithFilesContent={
          <>
            <img src={images.ImagePrimary} alt="" />
            {fileNames.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div>
                  <Body2 color="gray800">
                  파일을 끌어다 놓거나 선택 버튼을 클릭해 주세요
              
                  </Body2>
                  <Sub3 color="gray500">
                  (한글파일.hwp은 지원되지 않습니다)
                  </Sub3>
                </div>
                <div className="browse-button">
                  파일 선택
                </div>
              </div>
            )}
        
            {fileNames.length > 0 && (
              <div>
                {fileNames.map((name, index) => (
                  <Body2 key={index} color="gray700">
                    {name}
                  </Body2>
                ))}
              </div>
            )}
          </>
        }
        inputContent={
          <>
            <img src={images.ImagePrimary} alt="" />
            {fileNames.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div>
                  <Body2 color="gray800">
                    업로드하려는 파일을 드래그하여 놓아주세요
                  </Body2>
                  <Sub3 color="gray500">
                  컨셉보드 첨부 또는 가져오기
                  </Sub3>
                </div>
                <div className="browse-button">
                  파일 찾아보기
                </div>
              </div>
            )}
            {fileNames.length > 0 && (
              <div>
                {fileNames.map((name, index) => (
                  <Body2 key={index} color="gray700">
                    {name}
                  </Body2>
                ))}
              </div>
            )}
          </>
        }
        
        styles={StyledDropzone}
      />
    </TabContent5Item>
  );
};

export default MoleculeFileUpload;