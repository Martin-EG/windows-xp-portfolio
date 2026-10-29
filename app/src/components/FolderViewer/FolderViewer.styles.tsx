"use client"

import styled from "styled-components";

export const FolderViewerBody = styled.div`
  height: calc(100% - 30px);
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

export const FolderViewerLeftPanel = styled.div<FolderViewerPanelProps>`
  width: ${props => props.$isSomeProjectOpened ? "250px" : "100%"};
  display: flex;
  align-items: baseline;
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
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  color: #000;
  font-size: 14px;
  background-color: ${props => props.$isProjectActive ? "#ccc" : "transparent"};
`

export const ProjectPreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const ProjectPreviewVideo = styled.video`
  max-width: 100%;
  max-height: 500px;
  width: auto;
  height: auto;
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
