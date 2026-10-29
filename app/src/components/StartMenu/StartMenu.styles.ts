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
  overflow-y: auto;
  border-right: 1px solid #BBD6F8;
`;

export const StartMenuMostUsedProgramsItem = styled.button`
  height: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 15px;
  cursor: pointer;
  text-align: left;
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
  padding: 2px 15px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
`;
