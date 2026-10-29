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

const MaximizedDocumentViewerOpenAnimation = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

interface DocumentViewerContainerProps {
  readonly $zIndex: number;
  readonly $cascadeIndex: number;
}

export const DocumentViewerContainer = styled.div<DocumentViewerContainerProps>`
  --cascade-offset: ${props => props.$cascadeIndex * 24}px;

  width: 80%;
  max-height: 90%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  position: absolute;
  top: calc(50% + var(--cascade-offset));
  left: calc(50% + var(--cascade-offset));
  transform: translate(-50%, -50%);
  z-index: ${props => 500 + props.$zIndex};

  display: flex;
  flex-direction: column;

  animation: ${DocumentViewerOpenAnimation} 0.3s ease-in-out;

  /* On phones windows open maximized, filling the desktop above the taskbar */
  @media (max-width: 600px) {
    inset: 0;
    width: 100%;
    height: 100%;
    max-height: none;
    border-radius: 0;
    transform: none;
    animation-name: ${MaximizedDocumentViewerOpenAnimation};
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

  @media (max-width: 600px) {
    height: 44px;
    border-radius: 0;
  }
`;

export const DocumentViewerHeaderTitle = styled.div`
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DocumentViewerHeaderButtons = styled.div`
  display: flex;
  gap: 4px;

  /* Bigger tap targets on touch screens */
  @media (max-width: 600px) {
    gap: 8px;

    & > button {
      width: 32px;
      height: 32px;
    }
  }
`;

export const DocumentViewerHeaderMinimizeButton = styled.button`
  background: linear-gradient(to bottom, #3C81F3 0%, #2663DE 100%);
  color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 4px;
  line-height: 1;
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
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: 10px;
  overflow: auto;
`;
