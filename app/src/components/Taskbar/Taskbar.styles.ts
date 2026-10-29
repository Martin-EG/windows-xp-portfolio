"use client"

import styled, { keyframes } from "styled-components";

export const TaskbarWrapper = styled.div`
  width: 100%;
  height: var(--taskbar-height);
  display: flex;
  justify-content: space-between;
`;

export const TaskbarContainer = styled.div`
  width: 100%;
  min-width: 0;
  background-color: #245DDB;
  display: flex;
  column-gap: 5px;
`;

export const StartButton = styled.button<{ $isPressed: boolean }>`
  height: 100%;
  width: 150px;
  background: ${props => props.$isPressed
    ? "radial-gradient(circle at 50% 120%, #1A7A1A 0%, #237F23 45%, #2E9A2E 100%)"
    : "radial-gradient(circle at 50% 120%, #3DAA3D 0%, #39B439 45%, #5ECF5E 100%)"};
  box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.35), inset 2px 2px 4px rgba(255, 255, 255, 0.35);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-right: 10px;
  color: white;
  font-family: "Trebuchet MS", Tahoma, sans-serif;
  font-style: italic;
  font-weight: bold;
  font-size: 26px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  flex-shrink: 0;
  transition: filter 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }

  @media (max-width: 900px) {
    width: 130px;
    font-size: 24px;
  }

  @media (max-width: 600px) {
    width: 96px;
    font-size: 20px;
    gap: 4px;
  }
`

export const SystemSection = styled.div`
  height: 100%;
  min-width: 150px;
  padding: 0 14px;
  background: linear-gradient(to bottom, #0C59B9 0%, #139EE9 8%, #18B5F2 50%, #139BEB 92%, #1290E8 100%);
  border-left: 1px solid #1042AF;
  box-shadow: inset 1px 0 1px #18BBFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: 900px) {
    min-width: 130px;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    min-width: 0;
    padding: 0 10px;
    font-size: 14px;
  }
`

export const SystemTrayIcons = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-right: 8px;

  @media (max-width: 600px) {
    display: none;
  }
`

export const SystemSectionLanguage = styled.span`
  margin-right: 6px;

  @media (max-width: 600px) {
    display: none;
  }
`

const ProgramButtonOpenAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const ProgramButton = styled.button<{ $isActive?: boolean }>`
  height: 100%;
  width: 200px;
  min-width: 0;
  flex-shrink: 1;
  background: ${props => props.$isActive ? 'linear-gradient(148deg, #164DBC 0%, #1E53BB 100%)' : '#3980F4'};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  color: white;
  font-size: 20px;
  padding: 5px 5px;
  transition: all 0.2s ease-in-out;
  border: rgba(35, 75, 157, .5) 0.5px solid;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: ${ProgramButtonOpenAnimation} 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(148deg, #164DBC 0%, #1E53BB 100%);
  }

  @media (max-width: 900px) {
    width: 160px;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    width: 130px;
    font-size: 14px;
  }

  & > img {
    flex-shrink: 0;
  }
`

export const ProgramButtonLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Flexbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 5px;
  padding: 2px 10px;
  min-width: 0;

  @media (max-width: 600px) {
    padding: 2px 6px;
  }
`
