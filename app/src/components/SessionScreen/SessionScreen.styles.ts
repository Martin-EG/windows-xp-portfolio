"use client"

import styled, { keyframes } from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  font-family: Tahoma, Verdana, sans-serif;
  color: #fff;
`;

/* Boot */

export const BootOverlay = styled(Overlay)`
  background-color: #000;
  align-items: center;
  justify-content: center;
  gap: 24px;
  cursor: progress;
`;

export const BootBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BootTitle = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

export const BootName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const BootProduct = styled.span`
  font-family: "Trebuchet MS", Tahoma, sans-serif;
  font-size: 40px;
  font-weight: bold;

  & > sup {
    color: #FF7B00;
    font-size: 20px;
    margin-left: 4px;
  }
`;

const progressSlide = keyframes`
  from {
    transform: translateX(-40px);
  }
  to {
    transform: translateX(160px);
  }
`;

export const BootProgress = styled.div`
  width: 160px;
  height: 18px;
  padding: 2px;
  border: 2px solid #B2B2B2;
  border-radius: 4px;
  overflow: hidden;
`;

export const BootProgressBlocks = styled.div`
  display: flex;
  gap: 2px;
  height: 100%;
  animation: ${progressSlide} 1.4s linear infinite;

  & > span {
    width: 9px;
    height: 100%;
    border-radius: 1px;
    background: linear-gradient(to bottom, #2838C7 0%, #3C80F5 50%, #2838C7 100%);
  }
`;

export const BootHint = styled.p`
  position: absolute;
  bottom: 24px;
  font-size: 12px;
  color: #8C8C8C;
`;

/* Login */

export const LoginOverlay = styled(Overlay)`
  background-color: #5A7EDC;
`;

export const LoginBar = styled.div`
  flex-shrink: 0;
  height: 12%;
  min-height: 56px;
  background-color: #00309C;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 32px;

  &:first-child {
    border-bottom: 2px solid #E8A24D;
  }

  &:last-child {
    border-top: 2px solid #4A73D6;
  }

  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

export const LoginMain = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 10% 10%, #94B4F6 0%, #5A7EDC 45%);

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 32px;
  }
`;

export const LoginIntro = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  padding: 0 40px;
  text-align: right;

  @media (max-width: 600px) {
    flex: none;
    align-items: center;
    text-align: center;
    padding: 0 16px;
  }
`;

export const LoginTitle = styled.h1`
  font-family: "Trebuchet MS", Tahoma, sans-serif;
  font-size: 40px;
  font-style: italic;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
`;

export const LoginInstructions = styled.p`
  font-size: 18px;
`;

export const LoginDivider = styled.div`
  width: 2px;
  align-self: stretch;
  margin: 10% 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);

  @media (max-width: 600px) {
    display: none;
  }
`;

export const LoginUsers = styled.div`
  flex: 1;
  display: flex;
  padding: 0 40px;

  @media (max-width: 600px) {
    flex: none;
    justify-content: center;
    padding: 0 16px;
  }
`;

export const LoginUserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 24px 8px 8px;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  color: #fff;
  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:focus-visible {
    background: linear-gradient(to right, #00309C 0%, rgba(90, 126, 220, 0) 100%);
  }

  & img {
    border: 3px solid #fff;
    border-radius: 6px;
  }
`;

export const LoginUserName = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 22px;

  & > small {
    font-size: 14px;
    color: #DCE6FA;
  }
`;

export const LoginFooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;

  & > span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid #fff;
    background: linear-gradient(to bottom right, #F09A7E 0%, #E0512D 45%, #C1311C 100%);
  }
`;

export const LoginFooterNote = styled.p`
  max-width: 340px;
  font-size: 13px;
  text-align: right;

  @media (max-width: 600px) {
    display: none;
  }
`;

/* Shutdown */

export const ShuttingDownOverlay = styled(Overlay)`
  background-color: #5A7EDC;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 20px;
  cursor: progress;
`;

export const SafeToTurnOffOverlay = styled(Overlay)`
  background-color: #000;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 16px;
  text-align: center;
`;

export const SafeToTurnOffMessage = styled.p`
  color: #FF9A1F;
  font-size: 24px;
  font-weight: bold;
`;

export const RestartButton = styled.button`
  padding: 8px 20px;
  border: 1px solid #fff;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;
