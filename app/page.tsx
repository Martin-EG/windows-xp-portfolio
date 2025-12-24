"use client"
import Taskbar from "@/components/Taskbar";
import Desktop from "@/sections/Desktop";

import { useState } from "react";


export default function Home() {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  return (
    <div style={{ width: "100%", height: "100svh", overflowY: "hidden" }}>
      <Desktop isStartMenuOpen={isStartMenuOpen} toggleStartMenu={toggleStartMenu} />

      <Taskbar toggleStartMenu={toggleStartMenu} programs={[
        { name: "Projects", isActive: true },
      ]} />





    </div>
  );
}
