import { useOpenedProgramsStore } from "@/store";
import { Program, ProgramType } from "@/types";
import { getShortcutProgramIcon } from "@/utils";
import { FC } from "react";
import Image from "next/image";

import { ShortcutBody, ShortcutButton, ShortcutLink } from "./Shortcut.styles";

interface ShortcutProps {
  readonly program: Program;
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

const Shortcut: FC<ShortcutProps> = ({ program }) => {
  const ariaLabel = getShortcutAriaLabel(program.programType, program.name);
  const iconSrc = getShortcutProgramIcon(program.programType);

  const openProgram = useOpenedProgramsStore((state) => state.openProgram);

  const shortcutBody = (
    <ShortcutBody>
      <Image src={iconSrc} alt="" width={48} height={48} />
      {program.name}
    </ShortcutBody>
  );

  return program.programType === "internet"
    ? (
      <ShortcutLink
        href={program.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {shortcutBody}
      </ShortcutLink>
    )
    : (
      <ShortcutButton
        type="button"
        onClick={() => openProgram(program)}
        aria-label={ariaLabel}
      >
        {shortcutBody}
      </ShortcutButton>
    )
};

export default Shortcut;
