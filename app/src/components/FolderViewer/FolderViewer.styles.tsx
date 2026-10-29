"use client"

import styled, { keyframes } from "styled-components";

export const FolderViewerBody = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: 10px;
  overflow: auto;
  display: flex;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

interface FolderViewerPanelProps {
  $isSomeProjectOpened: boolean;
}

// Fixed-size tiles in a grid, so they keep their size (two per row) when a project is open
export const FolderViewerLeftPanel = styled.div<FolderViewerPanelProps>`
  width: ${props => props.$isSomeProjectOpened ? "230px" : "100%"};
  flex-shrink: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  align-content: start;
  gap: 10px;
  padding: 10px;

  @media (max-width: 600px) {
    width: 100%;
    border-right: 0;
    border-bottom: ${props => props.$isSomeProjectOpened ? "1px solid #ccc" : "0"};
  }
`;

export const FolderViewerRightPanel = styled.div<FolderViewerPanelProps>`
  width: ${props => props.$isSomeProjectOpened ? "auto" : 0};
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;

interface ProjectWrapperProps {
  $isProjectActive: boolean;
}

export const ProjectWrapper = styled.button<ProjectWrapperProps>`
  width: 100px;
  min-height: 90px;
  padding: 6px 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  cursor: pointer;
  flex-direction: column;
  color: #000;
  font-size: 14px;
  line-height: 1.2;
  border-radius: 2px;
  background-color: ${props => props.$isProjectActive ? "#ccc" : "transparent"};

  &:hover {
    background-color: ${props => props.$isProjectActive ? "#ccc" : "#EEF3FC"};
  }
`

// Fixed height so the window keeps its size while switching between projects
export const ProjectPreviewFrame = styled.div`
  position: relative;
  flex-shrink: 0;
  height: min(500px, 50svh);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    height: min(360px, 45svh);
  }
`

export const ProjectPreviewVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const loadingFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const loadingSlide = keyframes`
  from {
    transform: translateX(-40px);
  }
  to {
    transform: translateX(120px);
  }
`

// Fades in after a short delay so cached previews that load instantly don't flash it
export const ProjectPreviewLoading = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
  color: #333;
  animation: ${loadingFadeIn} 0.2s ease-in 0.15s both;
`

export const ProjectPreviewLoadingBar = styled.div`
  width: 120px;
  height: 14px;
  padding: 2px;
  border: 1px solid #7F9DB9;
  border-radius: 3px;
  background-color: #fff;
  overflow: hidden;

  & > div {
    display: flex;
    gap: 2px;
    height: 100%;
    animation: ${loadingSlide} 1.2s linear infinite;
  }

  & span {
    width: 8px;
    height: 100%;
    border-radius: 1px;
    background: linear-gradient(to bottom, #8FE08F 0%, #2BA12B 50%, #8FE08F 100%);
  }
`

export const ProjectTitle = styled.h2`
  font-weight: bold;
`

export const ProjectLink = styled.a`
  color: blue;
  text-decoration: underline;
`

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`
