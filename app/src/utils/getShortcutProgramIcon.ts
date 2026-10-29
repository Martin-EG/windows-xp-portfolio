import { ProgramType } from "@/types";

// Icons sit next to the program name, so they are decorative and rendered with an empty alt
export const getShortcutProgramIcon = (programType?: ProgramType) => {
  switch (programType) {
    case "internet":
      return "/images/InternetExplorer48.png";
    case "document":
      return "/images/Document48.png";
    default:
      return "/images/ClosedFolder48.svg";
  }
}
