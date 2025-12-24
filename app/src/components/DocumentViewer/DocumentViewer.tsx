"use client"

import { useShortcutProgramImageProps } from "@/hooks";
import { ExperienceDocument, SkillsDocument, WelcomeDocument } from "@/sections/Documents";
import { useOpenedProgramsStore, useOpenedProjectStore } from "@/store";
import Image from "next/image";

import {
  DocumentViewerBody,
  DocumentViewerContainer,
  DocumentViewerHeader,
  DocumentViewerHeaderCloseButton,
  DocumentViewerHeaderTitle
} from "./DocumentViewer.styles"
import FolderViewer from "../FolderViewer";

const getDocumentBody = (programId: number) => {
  switch (programId) {
    case 1:
      return <WelcomeDocument />
    case 2:
      return <ExperienceDocument />
    case 3:
      return <SkillsDocument />
    default:
      return null
  }
}


const DocumentViewer = () => {
  const { programs, removeProgram } = useOpenedProgramsStore((state) => state);
  const { closeProject } = useOpenedProjectStore((state) => state);

  if (programs.length === 0) return null;

  const { id, name, programType } = programs[0];
  const programImageProps = useShortcutProgramImageProps(programType, name);

  const closeDocumentViewer = () => {
    removeProgram(id);
    closeProject();
  }

  const body = programType === "folder"
    ? <FolderViewer />
    : <DocumentViewerBody>
      {getDocumentBody(id)}
    </DocumentViewerBody>;

  return (
    <DocumentViewerContainer>
      <DocumentViewerHeader>
        <DocumentViewerHeaderTitle>
          <Image {...programImageProps} width={20} height={20} />
          {name}
        </DocumentViewerHeaderTitle>
        <DocumentViewerHeaderCloseButton onClick={closeDocumentViewer}>
          x
        </DocumentViewerHeaderCloseButton>
      </DocumentViewerHeader>
      {body}
    </DocumentViewerContainer>
  )
}

export default DocumentViewer
