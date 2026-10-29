import { useOpenedProgramsStore } from "@/store";
import { Program, ProgramId, ProgramType } from "@/types";
import { getShortcutProgramIcon } from "@/utils";
import { FC, MouseEvent, PointerEvent, useRef } from "react";
import Image from "next/image";

import { ShortcutBody, ShortcutButton, ShortcutIcon, ShortcutLabel, ShortcutLink } from "./Shortcut.styles";

interface ShortcutProps {
  readonly program: Program;
  readonly isSelected: boolean;
  readonly onSelect: (programId: ProgramId) => void;
}

const getShortcutAriaLabel = (programType: ProgramType, name: string) => {
  switch (programType) {
    case "folder":
      return `Open ${name} folder`;
    case "internet":
      return `Go to ${name} page (opens in a new tab)`;
    case "document":
      return `Open ${name} document`;
  }
}

const Shortcut: FC<ShortcutProps> = ({ program, isSelected, onSelect }) => {
  const ariaLabel = getShortcutAriaLabel(program.programType, program.name);
  const iconSrc = getShortcutProgramIcon(program.programType);
  const openProgram = useOpenedProgramsStore((state) => state.openProgram);
  const pointerTypeRef = useRef("");

  // Like XP, a mouse click only selects the icon and a double-click opens it.
  // Taps and the keyboard (Enter/Space, which report detail 0) open on a single activation.
  const opensOnSingleClick = (e: MouseEvent) =>
    e.detail === 0 || pointerTypeRef.current === "touch" || pointerTypeRef.current === "pen";

  const handlePointerDown = (e: PointerEvent) => {
    pointerTypeRef.current = e.pointerType;
  }

  const shortcutBody = (
    <ShortcutBody>
      <ShortcutIcon $isSelected={isSelected}>
        <Image src={iconSrc} alt="" width={48} height={48} />
      </ShortcutIcon>
      <ShortcutLabel $isSelected={isSelected}>{program.name}</ShortcutLabel>
    </ShortcutBody>
  );

  if (program.programType === "internet") {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onSelect(program.id);
      if (!opensOnSingleClick(e)) e.preventDefault();
    }

    return (
      <ShortcutLink
        href={program.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        onDoubleClick={() => window.open(program.url, "_blank", "noopener,noreferrer")}
      >
        {shortcutBody}
      </ShortcutLink>
    );
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onSelect(program.id);
    if (opensOnSingleClick(e)) openProgram(program);
  }

  return (
    <ShortcutButton
      type="button"
      aria-label={ariaLabel}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onDoubleClick={() => openProgram(program)}
    >
      {shortcutBody}
    </ShortcutButton>
  );
};

export default Shortcut;
