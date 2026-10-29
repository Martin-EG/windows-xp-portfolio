"use client"
import { useStartMenuStore } from "@/store";
import { useEffect } from "react";

interface UseCloseStartMenuWhenClickingOutsideProps {
  startMenuRef: React.RefObject<HTMLDivElement | null>;
  toggleStartMenu: () => void;
}
type UseCloseStartMenuWhenClickingOutside = ({ startMenuRef, toggleStartMenu }: UseCloseStartMenuWhenClickingOutsideProps) => void;

export const START_BUTTON_SELECTOR = '[data-id="start-button"]';

export const useCloseStartMenuWhenClickingOutside: UseCloseStartMenuWhenClickingOutside = ({ startMenuRef, toggleStartMenu }) => {
  const isStartMenuOpen = useStartMenuStore((state) => state.isOpen);

  useEffect(() => {
    if (!isStartMenuOpen) return;

    const handleMouseDown = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(target) &&
        !target.closest(START_BUTTON_SELECTOR)
      ) {
        toggleStartMenu();
      }
    }

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleStartMenu();
        document.querySelector<HTMLElement>(START_BUTTON_SELECTOR)?.focus();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStartMenuOpen, startMenuRef, toggleStartMenu]);
}
