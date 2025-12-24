"use client"
import Taskbar from "@/components/Taskbar";
import { useCloseStartMenuWhenClickingOutside } from "@/hooks";
import Desktop from "@/sections/Desktop";
import { useStartMenuStore } from "@/store";

import { useRef } from "react";


export default function Home() {
  const { toggleStartMenu } = useStartMenuStore((state) => state);
  const startMenuRef = useRef<HTMLDivElement>(null);

  useCloseStartMenuWhenClickingOutside({ startMenuRef, toggleStartMenu });

  return (
    <div style={{ width: "100%", height: "100svh", overflowY: "hidden" }}>
      <Desktop startMenuRef={startMenuRef} />

      <Taskbar toggleStartMenu={toggleStartMenu} startMenuRef={startMenuRef} />
    </div>
  );
}
