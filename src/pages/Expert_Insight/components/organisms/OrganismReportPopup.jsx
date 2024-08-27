import React from 'react';
import styled from 'styled-components';

const OrganismReportPopup = ({ report, onClose }) => {
  if (!report) return null;

  const { mainFeatures, keyFunctions, targetCustomers } = report.content;

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <h1>{report.title}</h1>
        <p>{report.date}</p>

        <h2>주요 특징</h2>
        <ul>
          {mainFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <h2>주요 기능</h2>
        <ul>
          {keyFunctions.map((functionality, index) => (
            <li key={index}>{functionality}</li>
          ))}
        </ul>

        <h2>목표 고객</h2>
        <ul>
          {targetCustomers.map((customer, index) => (
            <li key={index}>{customer}</li>
          ))}
        </ul>

        <CloseButton onClick={onClose}>닫기</CloseButton>
      </PopupContent>
    </PopupOverlay>
  );
};

export default OrganismReportPopup;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
`;

const CloseButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;
