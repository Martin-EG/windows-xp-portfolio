"use client"

import styled, { css, keyframes } from "styled-components";

export const PHONE_MEDIA_QUERY = "(max-width: 600px)";

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

const maximizedWindow = css`
  inset: 0;
  width: 100%;
  height: 100%;
  max-height: none;
  border-radius: 0;
  transform: none;
`

interface DocumentViewerContainerProps {
  readonly $zIndex: number;
  readonly $cascadeIndex: number;
  readonly $isMaximized: boolean;
  readonly $hasFixedHeight: boolean;
}

// --drag-x / --drag-y are set inline while the window is dragged by its title bar
export const DocumentViewerContainer = styled.div<DocumentViewerContainerProps>`
  --cascade-offset: ${props => props.$cascadeIndex * 24}px;

  width: 80%;
  max-height: 90%;
  /* Folder windows keep one size, so switching projects doesn't resize and re-centre them */
  height: ${props => props.$hasFixedHeight ? "90%" : "auto"};
  background-color: #fff;
  border-radius: 8px 8px 4px 4px;
  border: 3px solid #0831D9;
  border-top: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  position: absolute;
  top: calc(50% + var(--cascade-offset));
  left: calc(50% + var(--cascade-offset));
  transform: translate(calc(-50% + var(--drag-x, 0px)), calc(-50% + var(--drag-y, 0px)));
  z-index: ${props => 500 + props.$zIndex};

  display: flex;
  flex-direction: column;

  animation: ${DocumentViewerOpenAnimation} 0.3s ease-in-out;

  /* The open animation stays declared: removing it here would replay it when the window is restored */
  ${props => props.$isMaximized && maximizedWindow}

  /* On phones windows open maximized, filling the desktop above the taskbar */
  @media ${PHONE_MEDIA_QUERY} {
    ${maximizedWindow}
    border: 0;
    animation-name: ${MaximizedDocumentViewerOpenAnimation};
  }
`;

interface DocumentViewerHeaderProps {
  readonly $isActive: boolean;
  readonly $isDraggable: boolean;
}

export const DocumentViewerHeader = styled.div<DocumentViewerHeaderProps>`
  height: 30px;
  flex-shrink: 0;
  width: 100%;
  padding: 0 4px 0 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  background: ${props => props.$isActive
    ? "linear-gradient(to bottom, #0A5FE4 0%, #3A8CF6 10%, #0B5FE4 50%, #0453DD 90%, #0831D9 100%)"
    : "linear-gradient(to bottom, #7697E7 0%, #A6BAEF 15%, #7B9AE6 60%, #7392E2 100%)"};

  ${props => props.$isDraggable && css`
    touch-action: none;
  `}

  @media ${PHONE_MEDIA_QUERY} {
    height: 44px;
    border-radius: 0;
  }
`;

export const DocumentViewerHeaderTitle = styled.div<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? "#fff" : "#DCE6FA"};
  font-family: "Trebuchet MS", Tahoma, sans-serif;
  font-weight: bold;
  font-size: 14px;
  text-shadow: ${props => props.$isActive ? "1px 1px 1px #0A1883" : "none"};
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & > img {
    flex-shrink: 0;
  }
`;

export const DocumentViewerHeaderButtons = styled.div`
  display: flex;
  gap: 2px;
  flex-shrink: 0;

  /* Bigger tap targets on touch screens */
  @media ${PHONE_MEDIA_QUERY} {
    gap: 8px;

    & > button {
      width: 32px;
      height: 32px;
    }
  }
`;

const windowButton = css`
  width: 22px;
  height: 22px;
  border: 1px solid #fff;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: inset -1px -1px 2px rgba(0, 0, 0, 0.25);

  &:hover {
    filter: brightness(1.15);
  }

  &:active {
    filter: brightness(0.9);
  }
`;

export const DocumentViewerHeaderMinimizeButton = styled.button`
  ${windowButton}
  background: linear-gradient(to bottom right, #6FA0F6 0%, #2663DE 60%, #1D52CC 100%);
`;

export const DocumentViewerHeaderMaximizeButton = styled.button`
  ${windowButton}
  background: linear-gradient(to bottom right, #6FA0F6 0%, #2663DE 60%, #1D52CC 100%);

  @media ${PHONE_MEDIA_QUERY} {
    display: none;
  }
`;

export const DocumentViewerHeaderCloseButton = styled.button`
  ${windowButton}
  background: linear-gradient(to bottom right, #F09A7E 0%, #E0512D 45%, #C1311C 100%);
`;

export const DocumentViewerBody = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: 10px;
  overflow: auto;
`;
