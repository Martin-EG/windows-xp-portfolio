"use client"

import { ContactDocument, ExperienceDocument, SkillsDocument, WelcomeDocument } from "@/sections/Documents";
import { selectActiveProgramId, useOpenedProgramsStore, useOpenedProjectStore } from "@/store";
import { OpenedProgram, ProgramId } from "@/types";
import { getShortcutProgramIcon } from "@/utils";
import Image from "next/image";
import { FC, KeyboardEvent, useEffect, useRef } from "react";

import FolderViewer from "../FolderViewer";

import {
  DocumentViewerBody,
  DocumentViewerContainer,
  DocumentViewerHeader,
  DocumentViewerHeaderButtons,
  DocumentViewerHeaderCloseButton,
  DocumentViewerHeaderMinimizeButton,
  DocumentViewerHeaderTitle
} from "./DocumentViewer.styles"

const documentBodies: Partial<Record<ProgramId, FC>> = {
  welcome: WelcomeDocument,
  experience: ExperienceDocument,
  skills: SkillsDocument,
  contact: ContactDocument,
};

const isVisible = (element: HTMLElement) =>
  element.isConnected &&
  (element.checkVisibility?.({ visibilityProperty: true }) ?? true);

interface DocumentViewerProps {
  readonly program: OpenedProgram;
}

const DocumentViewer: FC<DocumentViewerProps> = ({ program }) => {
  const { id, name, programType, isMinimized, cascadeIndex, skipInitialFocus } = program;
  const { closeProgram, focusProgram, minimizeProgram } = useOpenedProgramsStore((state) => state);
  const zIndex = useOpenedProgramsStore((state) => state.zOrder.indexOf(id));
  const isActive = useOpenedProgramsStore((state) => selectActiveProgramId(state) === id);
  const { closeProject } = useOpenedProjectStore((state) => state);
  const containerRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const skipFocusRef = useRef(!!skipInitialFocus);

  // Move focus into the window when it becomes the active one (opened, restored or
  // brought to front from outside), and remember where focus came from
  useEffect(() => {
    if (skipFocusRef.current) {
      skipFocusRef.current = false;
      return;
    }

    const container = containerRef.current;
    if (!isActive || !container || container.contains(document.activeElement)) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    container.focus();
  }, [isActive]);

  if (isMinimized) return null;

  const closeDocumentViewer = () => {
    closeProgram(id);
    if (id === "projects") closeProject();

    // When another window is still showing it becomes active and takes focus,
    // otherwise send focus back to whatever opened this window
    const hasOtherVisibleWindow = selectActiveProgramId(useOpenedProgramsStore.getState()) !== undefined;
    const returnFocusElement = returnFocusRef.current;
    if (!hasOtherVisibleWindow && returnFocusElement && isVisible(returnFocusElement)) {
      returnFocusElement.focus();
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeDocumentViewer();
    }
  }

  const DocumentBody = documentBodies[id];
  const body = programType === "folder"
    ? <FolderViewer />
    : (
      <DocumentViewerBody>
        {DocumentBody && <DocumentBody />}
      </DocumentViewerBody>
    );

  const titleId = `window-title-${id}`;

  return (
    <DocumentViewerContainer
      ref={containerRef}
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      // Clicking or tabbing into a window brings it to the front
      onFocus={() => !isActive && focusProgram(id)}
      $zIndex={zIndex}
      $cascadeIndex={cascadeIndex}
    >
      <DocumentViewerHeader>
        <DocumentViewerHeaderTitle id={titleId}>
          <Image src={getShortcutProgramIcon(programType)} alt="" width={20} height={20} />
          {name}
        </DocumentViewerHeaderTitle>
        <DocumentViewerHeaderButtons>
          <DocumentViewerHeaderMinimizeButton
            type="button"
            aria-label={`Minimize ${name}`}
            onClick={() => minimizeProgram(id)}
          >
            <span aria-hidden="true">_</span>
          </DocumentViewerHeaderMinimizeButton>
          <DocumentViewerHeaderCloseButton
            type="button"
            aria-label={`Close ${name}`}
            onClick={closeDocumentViewer}
          >
            <span aria-hidden="true">x</span>
          </DocumentViewerHeaderCloseButton>
        </DocumentViewerHeaderButtons>
      </DocumentViewerHeader>
      {body}
    </DocumentViewerContainer>
  )
}

export default DocumentViewer
