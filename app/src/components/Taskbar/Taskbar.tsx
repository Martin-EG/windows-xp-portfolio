"use client"

import { selectActiveProgramId, useOpenedProgramsStore, useStartMenuStore } from "@/store";
import { ProgramId, ProgramType } from "@/types";
import { FC, useEffect, useState } from "react";
import Image from 'next/image';


import {
  Flexbox,
  ProgramButton,
  StartButton,
  SystemSection,
  SystemSectionLanguage,
  TaskbarContainer,
  TaskbarWrapper,
} from './Taskbar.styles';

interface TaskbarProps {
  readonly toggleStartMenu: () => void;
}

const getProgramIcon = (programType: ProgramType) => {
  switch (programType) {
    case "folder":
      return "/images/ClosedFolder24.svg";
    case "document":
      return "/images/Document32.png";
    case "internet":
      return "/images/InternetExplorer24.svg";
  }
}

const getCurrentTime = () => new Date().toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
});

const Taskbar: FC<TaskbarProps> = ({ toggleStartMenu }) => {
  const { programs, focusProgram, minimizeProgram } = useOpenedProgramsStore((state) => state);
  const activeProgramId = useOpenedProgramsStore(selectActiveProgramId);
  const isStartMenuOpen = useStartMenuStore((state) => state.isOpen);
  // Empty on the server so the first client render matches, then filled in after mount
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(getCurrentTime());
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Like XP: clicking the active window's button minimizes it, any other button brings that window forward
  const handleProgramButtonClick = (programId: ProgramId) => {
    if (programId === activeProgramId) {
      minimizeProgram(programId);
    } else {
      focusProgram(programId);
    }
  }

  const programButtons = programs.map((program) => {
    const isActive = program.id === activeProgramId;

    return (
      <ProgramButton
        key={program.id}
        type="button"
        $isActive={isActive}
        aria-pressed={isActive}
        onClick={() => handleProgramButtonClick(program.id)}
      >
        <Image src={getProgramIcon(program.programType)} alt="" width={24} height={24} />
        {program.name}
      </ProgramButton>
    )
  });

  return (
    <TaskbarWrapper role="region" aria-label="Taskbar">
      <TaskbarContainer>
        <StartButton
          type="button"
          data-id="start-button"
          aria-expanded={isStartMenuOpen}
          aria-controls="start-menu"
          onClick={toggleStartMenu}
        >
          Start
        </StartButton>
        <Flexbox>
          {programButtons}
        </Flexbox>
      </TaskbarContainer>
      <SystemSection>
        <SystemSectionLanguage aria-hidden="true">EN</SystemSectionLanguage>
        <time>{time}</time>
      </SystemSection>
    </TaskbarWrapper>
  )
}

export default Taskbar;