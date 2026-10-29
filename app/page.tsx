"use client"
import Taskbar from "@/components/Taskbar";
import { useCloseStartMenuWhenClickingOutside } from "@/hooks";
import Desktop from "@/sections/Desktop";
import { useStartMenuStore } from "@/store";
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

  useCloseStartMenuWhenClickingOutside({ startMenuRef, toggleStartMenu });

  return (
    <Screen>
      <Desktop startMenuRef={startMenuRef} />

      <Taskbar toggleStartMenu={toggleStartMenu} />
    </Screen>
  );
}
