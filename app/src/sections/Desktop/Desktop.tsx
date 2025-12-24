import DocumentViewer from "@/components/DocumentViewer";
import StartMenu from "@/components/StartMenu";
import Shortcut from "@/components/Shortcut";
import { useStartMenuStore } from "@/store";
import { programs } from "@/data";

import { FC } from "react";

import { StyledDesktop, ProgramsContainer } from "./Desktop.styles";

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