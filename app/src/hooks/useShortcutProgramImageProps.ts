"use client"
import { ProgramType } from "@/types";

export const useShortcutProgramImageProps = (programType: ProgramType, name: string) => {
  switch (programType) {
    case "folder":
      return { src: "/images/ClosedFolder48.svg", alt: `${name} folder shortcut` };
    case "internet":
      return { src: "/images/InternetExplorer48.png", alt: `${name} internet shortcut` };
    case "document":
      return { src: "/images/Document48.png", alt: `${name} document shortcut` };
  }
}