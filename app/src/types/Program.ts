export type ProgramId =
  | "welcome"
  | "experience"
  | "skills"
  | "projects"
  | "contact"
  | "linkedin"
  | "github";

export type ProgramType = "folder" | "internet" | "document";

export type Program = {
  id: ProgramId;
  name: string;
  programType: ProgramType;
  url?: string;
}

export type OpenedProgram = Program & {
  isMinimized: boolean;
  isMaximized: boolean;
  // Slot used to cascade windows so they don't open exactly on top of each other
  cascadeIndex: number;
  // Only the window that is open on page load sets this, so it doesn't steal focus
  skipInitialFocus?: boolean;
}
