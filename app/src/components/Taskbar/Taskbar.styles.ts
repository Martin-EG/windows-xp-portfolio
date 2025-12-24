"use client"

import styled from "styled-components";

export const TaskbarWrapper = styled.div`
  width: 100%;
  height: 5svh;
  display: flex;
  justify-content: space-between;
`;

export const TaskbarContainer = styled.div`
  width: 100%;
  background-color: #245DDB;
  display: flex;
  column-gap: 5px;
`;

export const StartButton = styled.button`
  height: 100%;
  width: 180px;
  background: linear-gradient(148deg, #278D27 0%, #15D715 100%);
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  -webkit-text-stroke: 1px black;
  font-size: 28px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: linear-gradient(148deg, #1B611B 0%, #13BF13 100%);
  }

  @media (max-width: 900px) {
    width: 130px;
    font-size: 28px;
  }

  @media (max-width: 600px) {
    width: 100px;
    font-size: 24px;
  }
`

export const SystemSection = styled.div`
  height: 100%;
  width: 180px;
  background-color: #0D9BEF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;

  @media (max-width: 900px) {
    width: 130px;
    font-size: 16px;
  }

  @media (max-width: 600px) {
    width: 130px;
    font-size: 14px;
  }
`

export const ProgramButton = styled.button<{ $isActive?: boolean }>`
  height: 100%;
  width: 200px;
  background-color: ${props => props.$isActive ? 'linear-gradient(148deg, #164DBC 0%, #1E53BB 100%)' : '#3980F4'};
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

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
`

export const Flexbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  padding: 2px 10px;
`
