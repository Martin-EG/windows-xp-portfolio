"use client"
import { useStartMenuStore } from "@/store";
import { useEffect } from "react";

interface UseCloseStartMenuWhenClickingOutsideProps {
  startMenuRef: React.RefObject<HTMLDivElement | null>;
  toggleStartMenu: () => void;
}
type UseCloseStartMenuWhenClickingOutside = ({ startMenuRef, toggleStartMenu }: UseCloseStartMenuWhenClickingOutsideProps) => void;

export const useCloseStartMenuWhenClickingOutside: UseCloseStartMenuWhenClickingOutside = ({ startMenuRef, toggleStartMenu }) => {
  const isStartMenuOpen = useStartMenuStore((state) => state.isOpen);

  useEffect(() => {
    const handleMouseDown = (e: globalThis.MouseEvent) => {
      if (isStartMenuOpen &&
        startMenuRef.current &&
        !startMenuRef.current.contains(e.target as Node) &&
        (e.target as HTMLElement).getAttribute("data-id") !== "start-button"
      ) {
        toggleStartMenu();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isStartMenuOpen]);
}