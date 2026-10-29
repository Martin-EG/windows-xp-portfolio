"use client"
import SessionScreen from "@/components/SessionScreen";
import Taskbar from "@/components/Taskbar";
import { useCloseStartMenuWhenClickingOutside } from "@/hooks";
import Desktop from "@/sections/Desktop";
import { useSessionStore, useStartMenuStore } from "@/store";
import styled from "styled-components";

import { useRef } from "react";

const Screen = styled.div`
  width: 100%;
  height: 100svh;
  overflow-y: hidden;
`;

export default function Home() {
  const { toggleStartMenu } = useStartMenuStore((state) => state);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const isOnDesktop = useSessionStore((state) => state.phase === "desktop");

  useCloseStartMenuWhenClickingOutside({ startMenuRef, toggleStartMenu });

  return (
    <>
      {/* The desktop stays in the page for crawlers but is inert behind the boot and login screens */}
      <Screen inert={!isOnDesktop}>
        <Desktop startMenuRef={startMenuRef} />

        <Taskbar toggleStartMenu={toggleStartMenu} />
      </Screen>

      <SessionScreen />
    </>
  );
}
