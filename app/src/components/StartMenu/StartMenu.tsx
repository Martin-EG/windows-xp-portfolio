"use client"
import { FC } from "react";

import { StartMenuContainer } from "./StartMenu.styles";

interface StartMenuProps {
  readonly isOpen: boolean;
}

const StartMenu: FC<StartMenuProps> = ({ isOpen }) => {

  if (!isOpen) return null;

  return (
    <StartMenuContainer>

    </StartMenuContainer>
  );
}

export default StartMenu;
