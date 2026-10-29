"use client"

import { ContactDocument, ExperienceDocument, SkillsDocument, WelcomeDocument } from "@/sections/Documents";
import { useOpenedProgramsStore, useOpenedProjectStore } from "@/store";
import { getShortcutProgramIcon } from "@/utils";
import Image from "next/image";
import { KeyboardEvent, useEffect, useRef } from "react";

import FolderViewer from "../FolderViewer";

import {
  DocumentViewerBody,
  DocumentViewerContainer,
  DocumentViewerHeader,
  DocumentViewerHeaderCloseButton,
  DocumentViewerHeaderTitle
} from "./DocumentViewer.styles"

const DOCUMENT_VIEWER_TITLE_ID = "document-viewer-title";

const getDocumentBody = (programId: number) => {
  switch (programId) {
    case 1:
      return <WelcomeDocument />
    case 2:
      return <ExperienceDocument />
    case 3:
      return <SkillsDocument />
    case 7:
      return <ContactDocument />
    default:
      return null
  }
}

const isVisible = (element: HTMLElement) =>
  element.isConnected &&
  (element.checkVisibility?.({ visibilityProperty: true }) ?? true);

const DocumentViewer = () => {
  const { programs, removeProgram } = useOpenedProgramsStore((state) => state);
  const { closeProject } = useOpenedProjectStore((state) => state);
  const containerRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const hasMountedRef = useRef(false);

  const currentProgram = programs[0];
  const isOpen = !!currentProgram?.isActive;
  const currentProgramId = currentProgram?.id;

  // Move focus into the window when the user opens one, and remember where it came from.
  // The Welcome window that is open on page load does not steal focus.
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (!isOpen) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    containerRef.current?.focus();
  }, [isOpen, currentProgramId]);

  if (!currentProgram || !isOpen) return null;

  const { id, name, programType } = currentProgram;

  const closeDocumentViewer = () => {
    removeProgram(id);
    closeProject();

    const returnFocusElement = returnFocusRef.current;
    if (returnFocusElement && isVisible(returnFocusElement)) {
      returnFocusElement.focus();
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeDocumentViewer();
    }
  }

  const body = programType === "folder"
    ? <FolderViewer />
    : (
      <DocumentViewerBody>
        {getDocumentBody(id)}
      </DocumentViewerBody>
    );

  return (
    <DocumentViewerContainer
      ref={containerRef}
      role="dialog"
      aria-labelledby={DOCUMENT_VIEWER_TITLE_ID}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <DocumentViewerHeader>
        <DocumentViewerHeaderTitle id={DOCUMENT_VIEWER_TITLE_ID}>
          <Image src={getShortcutProgramIcon(programType)} alt="" width={20} height={20} />
          {name}
        </DocumentViewerHeaderTitle>
        <DocumentViewerHeaderCloseButton
          type="button"
          aria-label={`Close ${name}`}
          onClick={closeDocumentViewer}
        >
          <span aria-hidden="true">x</span>
        </DocumentViewerHeaderCloseButton>
      </DocumentViewerHeader>
      {body}
    </DocumentViewerContainer>
  )
}

export default DocumentViewer
