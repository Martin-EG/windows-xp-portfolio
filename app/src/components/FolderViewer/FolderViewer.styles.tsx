"use client"

import styled from "styled-components";

export const FolderViewerBody = styled.div`
  height: calc(100% - 30px);
  width: 100%;
  padding: 10px;
  overflow: auto;
  display: flex;

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
  gap: 10px;
  padding: 10px;
  border-right: ${props => props.$isSomeProjectOpened ? "1px solid #ccc" : "0"};

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

export const ProjectWrapper = styled.div<ProjectWrapperProps>`
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
