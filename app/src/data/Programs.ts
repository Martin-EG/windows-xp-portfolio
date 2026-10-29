import { Program, ProgramId } from "@/types"

import { links } from "./Links"

export const programs: Program[] = [
  {
    id: "welcome",
    name: "Welcome",
    programType: "document"
  },
  {
    id: "experience",
    name: "My Experience",
    programType: "document"
  },
  {
    id: "skills",
    name: "My Skills",
    programType: "document"
  },
  {
    id: "projects",
    name: "Projects",
    programType: "folder"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    programType: "internet",
    url: links.linkedIn
  },
  {
    id: "github",
    name: "GitHub",
    programType: "internet",
    url: links.gitHub
  },
  {
    id: "contact",
    name: "Contact",
    programType: "document"
  }
];

const mostUsedProgramIds: ProgramId[] = ["welcome", "experience", "projects", "contact"];

export const mostUsedPrograms = mostUsedProgramIds.map(
  (id) => programs.find((program) => program.id === id)!
);
