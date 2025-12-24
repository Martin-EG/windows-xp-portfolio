export type ProgramType = "folder" | "internet" | "document";

export type Program = {
  id: number;
  name: string;
  isActive?: boolean;
  programType: ProgramType;
  url?: string;
}