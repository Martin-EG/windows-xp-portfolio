import { Program } from "@/types"

import { links } from "./Links"

export const programs: Program[] = [
  {
    id: 1,
    name: "Welcome",
    programType: "document"
  },
  {
    id: 2,
    name: "My Experience",
    programType: "document"
  },
  {
    id: 3,
    name: "My Skills",
    programType: "document"
  },
  {
    id: 4,
    name: "Projects",
    programType: "folder"
  },
  {
    id: 5,
    name: "LinkedIn",
    programType: "internet",
    url: links.linkedIn
  },
  {
    id: 6,
    name: "GitHub",
    programType: "internet",
    url: links.gitHub
  },
  {
    id: 7,
    name: "Contact",
    programType: "document"
  }
];

export const mostUsedPrograms: Program[] = [
  {
    id: 1,
    name: "Welcome",
    programType: "document",
  },
  {
    id: 2,
    name: "My Experience",
    programType: "document",
    isActive: false
  },
  {
    id: 4,
    name: "Projects",
    programType: "folder"
  },
  {
    id: 7,
    name: "Contact",
    programType: "document"
  }
];