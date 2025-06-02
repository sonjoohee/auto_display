import React from "react";
import styled from "styled-components";
import { palette } from "../../../../assets/styles/Palette";
import {
  Body1,
  Body2,
  Body3,
  Caption1,
} from "../../../../assets/styles/Typography";

const OrganismProjectItem = ({ device, isNoData, onAdd }) => {
  const handleClick = () => {
    if (isNoData && onAdd) {
      onAdd();
    }
  };

  return (
    <DeviceCard NoData={isNoData} onClick={handleClick}>
      {!isNoData ? (
        <>
          <div className="device-info">
            <DeviceIcon status={device?.status}>
              📺
            </DeviceIcon>
            <div className="info">
              <Body1 color="gray800" align="left">
                {device?.name || "디스플레이 #1"}
              </Body1>
              <Body3 color="gray600" align="left">
                {device?.location || "1층 로비"}
              </Body3>
              <StatusBadge status={device?.status || "온라인"}>
                <Caption1 color={device?.status === "온라인" ? "white" : "gray600"}>
                  {device?.status || "온라인"}
                </Caption1>
              </StatusBadge>
            </div>
          </div>
          <div className="device-details">
            <DetailItem>
              <Body3 color="gray500">해상도</Body3>
              <Body3 color="gray700">{device?.resolution || "1920x1080"}</Body3>
            </DetailItem>
            <DetailItem>
              <Body3 color="gray500">마지막 연결</Body3>
              <Body3 color="gray700">{device?.lastConnected || "2분 전"}</Body3>
            </DetailItem>
          </div>
        </>
      ) : (
        <div className="noData">
          <AddIcon>+</AddIcon>
          <Body2 color="primary">새 기기 등록</Body2>
        </div>
      )}
    </DeviceCard>
  );
};

export default OrganismProjectItem;

const DeviceCard = styled.div`
  max-width: 31.9%;
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${palette.outlineGray};
  border-radius: 12px;
  background: ${palette.white};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${palette.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  .device-info {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 16px;

    .info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
  }

  .device-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid ${palette.outlineGray};
  }

  .noData {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 160px;
  }
`;

const DeviceIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: ${props => 
    props.status === "온라인" ? "#E8F5E8" : 
    props.status === "오프라인" ? "#FFE8E8" : "#F5F5F5"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${props => 
    props.status === "온라인" ? "#22C55E" : 
    props.status === "오프라인" ? "#EF4444" : "#94A3B8"};
  width: fit-content;
  margin-top: 4px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${palette.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 300;
`;
