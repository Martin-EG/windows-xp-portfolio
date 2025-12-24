"use client"

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


interface ProgramProps {
  readonly name: string;
  readonly isActive?: boolean;
}

interface TaskbarProps {
  readonly programs: ProgramProps[];
  readonly toggleStartMenu: () => void;
}

const Taskbar: FC<TaskbarProps> = ({ programs, toggleStartMenu }) => {
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

  const programButtons = programs.map((program, index) =>
    <ProgramButton key={index} $isActive={program.isActive}>
      <Image src="/images/ClosedFolder24.svg" alt="folder icon" width={20} height={20} />
      {program.name}
    </ProgramButton>
  );

  return (
    <TaskbarWrapper>
      <TaskbarContainer>
        <StartButton onClick={toggleStartMenu}>Start</StartButton>
        <Flexbox>
          {programButtons}
        </Flexbox>
      </TaskbarContainer>
      <SystemSection>EN {time}</SystemSection>
    </TaskbarWrapper>
  )
}

export default Taskbar;