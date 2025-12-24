"use client"
import { mostUsedPrograms } from "@/data";
import { useOpenProgramCallback, useShortcutProgramImageProps } from "@/hooks";
import { useStartMenuStore } from "@/store";
import { FC } from "react";
import Image from "next/image";

import {
  StartMenuBody,
  StartMenuContainer,
  StartMenuHeader,
  StartMenuHeaderImageWrapper,
  StartMenuMostUsedPrograms,
  StartMenuMostUsedProgramsItem,
  StartMenuOptions,
  StartMenuOptionsItem,
} from "./StartMenu.styles";


interface StartMenuProps {
  readonly isOpen: boolean;
  readonly shouldShowStartMenu: boolean;
  readonly startMenuRef: React.RefObject<HTMLDivElement | null>;
}

type MostVisitedUrl = {
  name: string;
  url: string;
}

const mostVisitedUrls: MostVisitedUrl[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/martin-espericueta/"
  },
  {
    name: "GitHub",
    url: "https://github.com/Martin-EG"
  },
  {
    name: "CV",
    url: "/files/CV-MartinMateoEspericuetaGomez-SoftwareEngineer-Nov2025.pdf"
  }
]

const StartMenu: FC<StartMenuProps> = ({ isOpen, shouldShowStartMenu, startMenuRef }) => {
  const { toggleStartMenu } = useStartMenuStore((state) => state);
  const openProgram = useOpenProgramCallback();

  if (!shouldShowStartMenu) return null;

  const MostUsedProgramItems = mostUsedPrograms.map((program, index) => {
    const imageProps = useShortcutProgramImageProps(program.programType, program.name);

    const openProgramAndCloseStartMenu = () => {
      openProgram(program);
      toggleStartMenu();
    }

    return (
      <StartMenuMostUsedProgramsItem key={index} onClick={openProgramAndCloseStartMenu}>
        <Image
          {...imageProps}
          width={32}
          height={32}
          preload={false}
        />
        {program.name}
      </StartMenuMostUsedProgramsItem>
    )
  })

  return (
    <StartMenuContainer ref={startMenuRef} $isOpen={isOpen}>
      <StartMenuHeader>
        <StartMenuHeaderImageWrapper>
          <Image
            src="/images/profile-image.JPEG"
            alt="Profile picture"
            width={60}
            height={60}
          />
        </StartMenuHeaderImageWrapper>
        Martin Espericueta
      </StartMenuHeader>
      <StartMenuBody>
        <StartMenuMostUsedPrograms>
          {MostUsedProgramItems}
        </StartMenuMostUsedPrograms>
        <StartMenuOptions>
          {mostVisitedUrls.map((url, index) => (
            <StartMenuOptionsItem
              key={index}
              href={url.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {url.name}
            </StartMenuOptionsItem>
          ))}
        </StartMenuOptions>
      </StartMenuBody>
    </StartMenuContainer>
  );
}

export default StartMenu;
