"use client"

import styled, { keyframes } from "styled-components";

const DocumentViewerOpenAnimation = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
`

export const DocumentViewerContainer = styled.div`
  max-width: 90%;
  max-height: 90%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;

  animation: ${DocumentViewerOpenAnimation} 0.3s ease-in-out;

  @media (max-width: 600px) {
    width: 90%;
    height: 90%;
  }
`;

export const DocumentViewerHeader = styled.div`
  height: 30px;
  width: 100%;
  padding: 0 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #3980F4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, #0D5FCB 0%, #4490EA 100%);
`;

export const DocumentViewerHeaderTitle = styled.div`
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DocumentViewerHeaderCloseButton = styled.button`
  background: linear-gradient(to bottom, #AE2B1D 0%, #C37755 100%);
  color: #fff;
  border: 1px solid #000;
  cursor: pointer;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DocumentViewerBody = styled.div`
  height: calc(100% - 30px);
  width: 100%;
  padding: 10px;
  overflow: auto;
`;
