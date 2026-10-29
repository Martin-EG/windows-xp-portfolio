
import { useOpenProgramCallback } from "@/hooks";
import { Program, ProgramType } from "@/types";
import { getShortcutProgramIcon } from "@/utils";
import { FC } from "react";
import Image from "next/image";

import { ShortcutBody } from "./Shortcut.styles";

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

  const openProgram = useOpenProgramCallback();

  const shortcutBody = (
    <ShortcutBody>
      <Image src={iconSrc} alt="" width={48} height={48} />
      {program.name}
    </ShortcutBody>
  );

  return program.programType === "internet"
    ? (
      <a
        href={program.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        style={{
          width: 135,
          height: 75,
        }}
      >
        {shortcutBody}
      </a>
    )
    : (
      <button
        type="button"
        onClick={() => openProgram(program)}
        aria-label={ariaLabel}
        style={{
          width: 135,
          height: 75,
        }}
      >
        {shortcutBody}
      </button>
    )
};

export default Shortcut;
