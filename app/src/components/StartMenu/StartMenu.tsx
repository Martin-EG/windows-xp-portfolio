"use client"
import { links, mostUsedPrograms } from "@/data";
import { useOpenProgramCallback } from "@/hooks";
import { useStartMenuStore } from "@/store";
import { getShortcutProgramIcon } from "@/utils";
import { FC, useEffect } from "react";
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
    url: links.linkedIn
  },
  {
    name: "GitHub",
    url: links.gitHub
  },
  {
    name: "CV",
    url: links.cv
  },
  {
    name: "Email me",
    url: links.email
  }
]

const StartMenu: FC<StartMenuProps> = ({ isOpen, shouldShowStartMenu, startMenuRef }) => {
  const { toggleStartMenu } = useStartMenuStore((state) => state);
  const openProgram = useOpenProgramCallback();

  // Move focus to the first item when the menu opens so keyboard users land inside it
  useEffect(() => {
    if (!isOpen) return;

    const frameId = requestAnimationFrame(() => {
      startMenuRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    });
    return () => cancelAnimationFrame(frameId);
  }, [isOpen, startMenuRef]);

  if (!shouldShowStartMenu) return null;

  const MostUsedProgramItems = mostUsedPrograms.map((program) => {
    const openProgramAndCloseStartMenu = () => {
      openProgram(program);
      toggleStartMenu();
    }

    return (
      <StartMenuMostUsedProgramsItem key={program.id} type="button" onClick={openProgramAndCloseStartMenu}>
        <Image
          src={getShortcutProgramIcon(program.programType)}
          alt=""
          width={32}
          height={32}
          preload={false}
        />
        {program.name}
      </StartMenuMostUsedProgramsItem>
    )
  })

  return (
    <StartMenuContainer
      id="start-menu"
      ref={startMenuRef}
      $isOpen={isOpen}
      aria-label="Start menu"
      role="region"
    >
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
          {mostVisitedUrls.map((url) => (
            <StartMenuOptionsItem
              key={url.name}
              href={url.url}
              target={url.url.startsWith("mailto:") ? undefined : "_blank"}
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
