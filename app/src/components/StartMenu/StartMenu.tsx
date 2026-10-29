"use client"
import { links, mostUsedPrograms, programs } from "@/data";
import { useOpenedProgramsStore, useSessionStore, useStartMenuStore } from "@/store";
import { Program } from "@/types";
import { getShortcutProgramIcon } from "@/utils";
import { FC, useEffect, useState } from "react";
import Image from "next/image";

import {
  StartMenuAllProgramsButton,
  StartMenuBody,
  StartMenuContainer,
  StartMenuFooter,
  StartMenuFooterButton,
  StartMenuHeader,
  StartMenuHeaderImageWrapper,
  StartMenuMostUsedPrograms,
  StartMenuMostUsedProgramsItem,
  StartMenuOptions,
  StartMenuOptionsItem,
  StartMenuProgramsList,
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
  const { toggleStartMenu, closeStartMenu } = useStartMenuStore((state) => state);
  const { openProgram, resetPrograms } = useOpenedProgramsStore((state) => state);
  const { logOff, turnOff } = useSessionStore((state) => state);
  const [isShowingAllPrograms, setIsShowingAllPrograms] = useState(false);
  const [wasOpen, setWasOpen] = useState(isOpen);

  // Start from the regular list again every time the menu closes
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (!isOpen) setIsShowingAllPrograms(false);
  }

  // Move focus to the first item when the menu opens so keyboard users land inside it
  useEffect(() => {
    if (!isOpen) return;

    const frameId = requestAnimationFrame(() => {
      startMenuRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    });
    return () => cancelAnimationFrame(frameId);
  }, [isOpen, startMenuRef]);

  if (!shouldShowStartMenu) return null;

  const renderProgramItem = (program: Program) => {
    const icon = (
      <Image
        src={getShortcutProgramIcon(program.programType)}
        alt=""
        width={32}
        height={32}
        preload={false}
      />
    );

    if (program.programType === "internet") {
      return (
        <StartMenuMostUsedProgramsItem
          key={program.id}
          as="a"
          href={program.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={toggleStartMenu}
        >
          {icon}
          {program.name}
        </StartMenuMostUsedProgramsItem>
      );
    }

    const openProgramAndCloseStartMenu = () => {
      openProgram(program);
      toggleStartMenu();
    }

    return (
      <StartMenuMostUsedProgramsItem key={program.id} type="button" onClick={openProgramAndCloseStartMenu}>
        {icon}
        {program.name}
      </StartMenuMostUsedProgramsItem>
    );
  }

  const leaveDesktop = (action: () => void) => {
    closeStartMenu();
    resetPrograms();
    action();
  }

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
            src="/images/profile-image.jpg"
            alt="Profile picture"
            width={60}
            height={60}
          />
        </StartMenuHeaderImageWrapper>
        Martin Espericueta
      </StartMenuHeader>
      <StartMenuBody>
        <StartMenuMostUsedPrograms>
          <StartMenuProgramsList>
            {(isShowingAllPrograms ? programs : mostUsedPrograms).map(renderProgramItem)}
          </StartMenuProgramsList>
          <StartMenuAllProgramsButton
            type="button"
            aria-expanded={isShowingAllPrograms}
            onClick={() => setIsShowingAllPrograms((isShowing) => !isShowing)}
          >
            {isShowingAllPrograms ? "Back" : "All Programs"}
            <span aria-hidden="true">{isShowingAllPrograms ? "◀" : "▶"}</span>
          </StartMenuAllProgramsButton>
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
      <StartMenuFooter>
        <StartMenuFooterButton type="button" onClick={() => leaveDesktop(logOff)}>
          <span aria-hidden="true">🔑</span> Log Off
        </StartMenuFooterButton>
        <StartMenuFooterButton type="button" $isDanger onClick={() => leaveDesktop(turnOff)}>
          <span aria-hidden="true">⏻</span> Turn Off Computer
        </StartMenuFooterButton>
      </StartMenuFooter>
    </StartMenuContainer>
  );
}

export default StartMenu;
