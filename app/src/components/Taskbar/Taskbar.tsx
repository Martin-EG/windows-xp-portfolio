"use client"

import { useOpenedProgramsStore } from "@/store";
import { ProgramType } from "@/types";
import { FC, useState } from "react";
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
  readonly startMenuRef: React.RefObject<HTMLDivElement | null>;
}

const getProgramImageProps = (programType: ProgramType, name: string) => {
  switch (programType) {
    case "folder":
      return { src: "/images/ClosedFolder24.svg", alt: `${name} folder shortcut` };
    case "document":
      return { src: "/images/Document32.png", alt: `${name} document shortcut` };
    case "internet":
      return { src: "/images/InternetExplorer24.png", alt: `${name} internet shortcut` };
  }
}

const Taskbar: FC<TaskbarProps> = ({ toggleStartMenu, startMenuRef }) => {
  const programs = useOpenedProgramsStore((state) => state.programs);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }));

  setInterval(() => {
    setTime(new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }));
  }, 1000);

  const programButtons = programs.map((program, index) => {
    const { src, alt } = getProgramImageProps(program.programType, program.name);

    return (
      <ProgramButton key={index} $isActive={program.isActive}>
        <Image src={src} alt={alt} width={24} height={24} />
        {program.name}
      </ProgramButton>
    )
  });

  return (
    <TaskbarWrapper>
      <TaskbarContainer>
        <div ref={startMenuRef}>
          <StartButton data-id="start-button" onClick={toggleStartMenu}>Start</StartButton>
        </div>
        <Flexbox>
          {programButtons}
        </Flexbox>
      </TaskbarContainer>
      <SystemSection>EN {time}</SystemSection>
    </TaskbarWrapper>
  )
}

export default Taskbar;