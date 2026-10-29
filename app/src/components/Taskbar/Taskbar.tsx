"use client"

import { useOpenedProgramsStore } from "@/store";
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

const getProgramImageProps = (programType: ProgramType, name: string) => {
  switch (programType) {
    case "folder":
      return { src: "/images/ClosedFolder24.svg", alt: `${name} folder shortcut` };
    case "document":
      return { src: "/images/Document32.png", alt: `${name} document shortcut` };
    case "internet":
      return { src: "/images/InternetExplorer24.svg", alt: `${name} internet shortcut` };
  }
}

const getCurrentTime = () => new Date().toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
});

const Taskbar: FC<TaskbarProps> = ({ toggleStartMenu }) => {
  const { programs, toggleProgram } = useOpenedProgramsStore((state) => state);
  // Empty on the server so the first client render matches, then filled in after mount
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(getCurrentTime());
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const programButtons = programs.map((program) => {
    const { src, alt } = getProgramImageProps(program.programType, program.name);

    return (
      <ProgramButton
        key={program.id}
        $isActive={program.isActive}
        onClick={() => toggleProgram(program.id)}
      >
        <Image src={src} alt={alt} width={24} height={24} />
        {program.name}
      </ProgramButton>
    )
  });

  return (
    <TaskbarWrapper>
      <TaskbarContainer>
        <StartButton data-id="start-button" onClick={toggleStartMenu}>Start</StartButton>
        <Flexbox>
          {programButtons}
        </Flexbox>
      </TaskbarContainer>
      <SystemSection>EN {time}</SystemSection>
    </TaskbarWrapper>
  )
}

export default Taskbar;