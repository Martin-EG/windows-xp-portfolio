import DocumentViewer from "@/components/DocumentViewer";
import StartMenu from "@/components/StartMenu";
import Shortcut from "@/components/Shortcut";
import { useOpenedProgramsStore, useStartMenuStore } from "@/store";
import { programs } from "@/data";

import { ProgramId } from "@/types";
import { FC, PointerEvent, useState } from "react";

import { StyledDesktop, ProgramsContainer } from "./Desktop.styles";

interface DesktopProps {
  startMenuRef: React.RefObject<HTMLDivElement | null>;
}

const Desktop: FC<DesktopProps> = ({ startMenuRef }) => {
  const isStartMenuOpen = useStartMenuStore((state) => state.isOpen);
  const shouldShowStartMenu = useStartMenuStore((state) => state.shouldShowStartMenu);
  const openedPrograms = useOpenedProgramsStore((state) => state.programs);
  const [selectedShortcutId, setSelectedShortcutId] = useState<ProgramId | null>(null);

  // Clicking empty desktop space clears the icon selection
  const handleDesktopPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSelectedShortcutId(null);
  }

  return (
    <StyledDesktop>
      <ProgramsContainer onPointerDown={handleDesktopPointerDown}>
        {programs.map((program) => (
          <Shortcut
            key={program.id}
            program={program}
            isSelected={program.id === selectedShortcutId}
            onSelect={setSelectedShortcutId}
          />
        ))}

        {openedPrograms.map((program) => (
          <DocumentViewer key={program.id} program={program} />
        ))}

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