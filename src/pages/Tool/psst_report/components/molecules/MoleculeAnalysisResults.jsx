import React from 'react';
import { Body2 } from '../../../../../assets/styles/Typography';
import AtomPersonaLoader from "../../../../Global/atoms/AtomPersonaLoader";

const MoleculeAnalysisResults = ({ 
  analysisResults, 
  currentLoadingIndex,
  hasUploadedFiles
}) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {analysisResults.map((analysis, index) => (
        <div key={index}>
          <div>
            <Body2 color="gray800" style={{ textAlign: "left" }}>
              {analysis.title}
            </Body2>
          </div>
          <div style={{
            border: "1px solid #E5E5E5",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "16px",
          }}>
            {analysis.contents?.map((content, contentIndex) => (
              <div key={contentIndex}>
                {contentIndex > 0 && (
                  <div style={{
                    height: "1px",
                    background: "#E5E5E5",
                    margin: "20px 0",
                  }} />
                )}
                <div>
                  <Body2 color="gray800" style={{ textAlign: "left" }}>
                    {content.sub_title}
                  </Body2>
                  <Body2 color="gray500" style={{
                    marginTop: "8px",
                    textAlign: "left",
                  }}>
                    {content.key_message}
                  </Body2>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {!hasUploadedFiles && currentLoadingIndex <= 8 && (
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          minHeight: "100px",
          alignItems: "center",
          marginTop: "20px"
        }}>
          <AtomPersonaLoader message={`${currentLoadingIndex}번째 분석을 진행하고 있어요...`} />
        </div>
      )}
    </div>
  );
};

export default MoleculeAnalysisResults;