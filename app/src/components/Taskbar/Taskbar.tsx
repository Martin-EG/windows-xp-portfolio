"use client"

import { selectActiveProgramId, useOpenedProgramsStore, useStartMenuStore } from "@/store";
import { ProgramId, ProgramType } from "@/types";
import StartLogo from "../StartLogo";
import { FC, useEffect, useState } from "react";
import Image from 'next/image';


import {
  Flexbox,
  ProgramButton,
  ProgramButtonLabel,
  StartButton,
  SystemSection,
  SystemSectionLanguage,
  SystemTrayIcons,
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

const getCurrentClock = () => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    // Shown as a tooltip on the clock, like XP
    date: now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
  };
};

// Decorative tray icons: volume and network
const TrayIcons: FC = () => (
  <SystemTrayIcons aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M2 6h3l4-3v10l-4-3H2z" fill="#fff" />
      <path d="M11 5.5c1.3 1.3 1.3 3.7 0 5M12.8 3.8c2.3 2.3 2.3 6.1 0 8.4" stroke="#fff" strokeWidth="1.2" fill="none" />
    </svg>
    <svg width="16" height="16" viewBox="0 0 16 16">
      <rect x="1" y="2" width="8" height="6" rx="1" fill="#DCE6FA" stroke="#0A246A" />
      <rect x="7" y="7" width="8" height="6" rx="1" fill="#DCE6FA" stroke="#0A246A" />
      <path d="M3 10h3v4" stroke="#fff" fill="none" />
    </svg>
  </SystemTrayIcons>
);

const Taskbar: FC<TaskbarProps> = ({ toggleStartMenu }) => {
  const { programs, focusProgram, minimizeProgram } = useOpenedProgramsStore((state) => state);
  const activeProgramId = useOpenedProgramsStore(selectActiveProgramId);
  const isStartMenuOpen = useStartMenuStore((state) => state.isOpen);
  // Empty on the server so the first client render matches, then filled in after mount
  const [clock, setClock] = useState({ time: "", date: "" });

  useEffect(() => {
    const updateClock = () => setClock(getCurrentClock());
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
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
        <ProgramButtonLabel>{program.name}</ProgramButtonLabel>
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
          $isPressed={isStartMenuOpen}
        >
          <StartLogo />
          start
        </StartButton>
        <Flexbox>
          {programButtons}
        </Flexbox>
      </TaskbarContainer>
      <SystemSection>
        <SystemSectionLanguage aria-hidden="true">EN</SystemSectionLanguage>
        <TrayIcons />
        <time title={clock.date}>{clock.time}</time>
      </SystemSection>
    </TaskbarWrapper>
  )
}

export default Taskbar;