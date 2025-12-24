import DocumentViewer from "@/components/DocumentViewer";
import StartMenu from "@/components/StartMenu";
import Shortcut from "@/components/Shortcut";
import { useStartMenuStore } from "@/store";
import { Program } from "@/types";

import { FC } from "react";

import { StyledDesktop, ProgramsContainer } from "./Desktop.styles";

const programs: Program[] = [
  {
    id: 1,
    name: "Welcome",
    programType: "document"
  },
  {
    id: 2,
    name: "My Experience",
    programType: "document"
  },
  {
    id: 3,
    name: "My Skills",
    programType: "document"
  },
  {
    id: 4,
    name: "Projects",
    programType: "folder"
  },
  {
    id: 5,
    name: "LinkedIn",
    programType: "internet",
    url: "https://www.linkedin.com/in/martin-espericueta/"
  },
  {
    id: 6,
    name: "GitHub",
    programType: "internet",
    url: "https://github.com/Martin-EG"
  }
]

interface DesktopProps {
  startMenuRef: React.RefObject<HTMLDivElement | null>;
}

const Desktop: FC<DesktopProps> = ({ startMenuRef }) => {
  const isStartMenuOpen = useStartMenuStore((state) => state.isOpen);
  const shouldShowStartMenu = useStartMenuStore((state) => state.shouldShowStartMenu);


  return (
    <StyledDesktop>
      <ProgramsContainer>
        {programs.map((program) => (
          <Shortcut
            key={program.id}
            program={program}
          />
        ))}

        <DocumentViewer />

        <StartMenu
          isOpen={isStartMenuOpen}
          shouldShowStartMenu={shouldShowStartMenu}
          startMenuRef={startMenuRef}
        />
      </ProgramsContainer>
    </StyledDesktop>
  )
}

export default Desktop;