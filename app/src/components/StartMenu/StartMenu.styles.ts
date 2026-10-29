"use client"

import styled from "styled-components";

interface StartMenuProps {
  readonly $isOpen: boolean;
}

export const StartMenuContainer = styled.div<StartMenuProps>`
  bottom: 0;
  left: 0;
  width: min(420px, 100vw);
  height: min(500px, calc(100svh - var(--taskbar-height)));
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: absolute;
  z-index: 1000;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  opacity: ${props => props.$isOpen ? 1 : 0};
  transform: ${props => props.$isOpen ? "translateY(0%)" : "translateY(100%)"};
  visibility: ${props => props.$isOpen ? "visible" : "hidden"};
`;

export const StartMenuHeader = styled.div`
  height: 70px;
  flex-shrink: 0;
  background-color: #245DDB;
  background: linear-gradient(to bottom, #0D5FCB 0%, #4490EA 100%);
  padding: 5px 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  gap: 15px;
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
`;

export const StartMenuHeaderImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  border: 2px solid #fff;
  overflow: hidden;
`;

export const StartMenuBody = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
`;

export const StartMenuMostUsedPrograms = styled.div`
  height: 100%;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #BBD6F8;
`;

export const StartMenuProgramsList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const StartMenuAllProgramsButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 15px;
  border-top: 1px solid #D6DFF5;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  & > span {
    color: #2BA12B;
  }

  &:hover {
    background-color: #316AC5;
    color: #fff;
  }
`;

export const StartMenuMostUsedProgramsItem = styled.button`
  flex-shrink: 0;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 15px;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #316AC5;
    color: #fff;
  }
`;

export const StartMenuOptions = styled.div`
  height: 100%;
  width: 150px;
  background-color: #D3E5FB;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

export const StartMenuOptionsItem = styled.a`
  padding: 4px 15px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  color: #0A246A;

  &:hover {
    background-color: #316AC5;
    color: #fff;
  }
`;

export const StartMenuFooter = styled.div`
  flex-shrink: 0;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 0 8px;
  background: linear-gradient(to bottom, #4282D6 0%, #3B6FCC 50%, #2858BC 100%);
`;

export const StartMenuFooterButton = styled.button<{ $isDanger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  cursor: pointer;

  & > span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 3px;
    border: 1px solid #fff;
    font-size: 13px;
    background: ${props => props.$isDanger
      ? "linear-gradient(to bottom right, #F09A7E 0%, #E0512D 45%, #C1311C 100%)"
      : "linear-gradient(to bottom right, #FCE38A 0%, #E9A93A 100%)"};
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;
