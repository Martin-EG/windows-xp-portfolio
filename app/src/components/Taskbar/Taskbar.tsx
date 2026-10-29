"use client"

import { useOpenedProgramsStore, useStartMenuStore } from "@/store";
import { ProgramType } from "@/types";
import { FC, useEffect, useState } from "react";
import Image from 'next/image';


import {
  Flexbox,
  ProgramButton,
  StartButton,
  SystemSection,
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
  const { programs, toggleProgram } = useOpenedProgramsStore((state) => state);
  const isStartMenuOpen = useStartMenuStore((state) => state.isOpen);
  // Empty on the server so the first client render matches, then filled in after mount
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(getCurrentTime());
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const programButtons = programs.map((program) => {
    return (
      <ProgramButton
        key={program.id}
        type="button"
        $isActive={program.isActive}
        aria-pressed={!!program.isActive}
        onClick={() => toggleProgram(program.id)}
      >
        <Image src={getProgramIcon(program.programType)} alt="" width={24} height={24} />
        {program.name}
      </ProgramButton>
    )
  });

  return (
    <TaskbarWrapper>
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
        <span aria-hidden="true" style={{ marginRight: 6 }}>EN</span>
        <time>{time}</time>
      </SystemSection>
    </TaskbarWrapper>
  )
}

export default Taskbar;