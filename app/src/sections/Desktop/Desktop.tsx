import StartMenu from "@/components/StartMenu";
import Shortcut from "@/components/Shortcut";
import { FC } from "react";

import { StyledDesktop, ProgramsContainer } from "./Desktop.styles";


interface DesktopProps {
  isStartMenuOpen: boolean;
  toggleStartMenu: () => void;
}

const Desktop: FC<DesktopProps> = ({ isStartMenuOpen, toggleStartMenu }) => {
  return (
    <StyledDesktop>
      <ProgramsContainer>
        <Shortcut name="About me" shortcutType="folder" />
        <Shortcut name="Projects" shortcutType="folder" />

        <Shortcut name="LinkedIn" shortcutType="internet" />
        <Shortcut name="GitHub" shortcutType="internet" />

        <StartMenu isOpen={isStartMenuOpen} />
      </ProgramsContainer>
    </StyledDesktop>
  )
}

export default Desktop;