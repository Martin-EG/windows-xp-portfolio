"use client"

import { ContactDocument, ExperienceDocument, SkillsDocument, WelcomeDocument } from "@/sections/Documents";
import { selectActiveProgramId, useOpenedProgramsStore, useOpenedProjectStore } from "@/store";
import { OpenedProgram, ProgramId } from "@/types";
import { getShortcutProgramIcon } from "@/utils";
import Image from "next/image";
import { CSSProperties, FC, KeyboardEvent, MouseEvent, PointerEvent, useEffect, useRef, useState } from "react";

import FolderViewer from "../FolderViewer";

import {
  DocumentViewerBody,
  DocumentViewerContainer,
  DocumentViewerHeader,
  DocumentViewerHeaderButtons,
  DocumentViewerHeaderCloseButton,
  DocumentViewerHeaderMaximizeButton,
  DocumentViewerHeaderMinimizeButton,
  DocumentViewerHeaderTitle,
  PHONE_MEDIA_QUERY,
} from "./DocumentViewer.styles"
import { WindowButtonIcon } from "./WindowButtonIcon";

const documentBodies: Partial<Record<ProgramId, FC>> = {
  welcome: WelcomeDocument,
  experience: ExperienceDocument,
  skills: SkillsDocument,
  contact: ContactDocument,
};

const isVisible = (element: HTMLElement) =>
  element.isConnected &&
  (element.checkVisibility?.({ visibilityProperty: true }) ?? true);

// How much of the title bar has to stay on the desktop so the window can always be grabbed again
const MIN_VISIBLE_TITLE_BAR = 80;
const TITLE_BAR_HEIGHT = 30;

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const isPhoneLayout = () => window.matchMedia(PHONE_MEDIA_QUERY).matches;

const isOnTitleBarButton = (target: EventTarget) => !!(target as HTMLElement).closest("button");

interface DocumentViewerProps {
  readonly program: OpenedProgram;
}

const DocumentViewer: FC<DocumentViewerProps> = ({ program }) => {
  const { id, name, programType, isMinimized, isMaximized, cascadeIndex, skipInitialFocus } = program;
  const { closeProgram, focusProgram, minimizeProgram, toggleMaximizeProgram } = useOpenedProgramsStore((state) => state);
  const zIndex = useOpenedProgramsStore((state) => state.zOrder.indexOf(id));
  const isActive = useOpenedProgramsStore((state) => selectActiveProgramId(state) === id);
  const { closeProject } = useOpenedProjectStore((state) => state);
  const containerRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const skipFocusRef = useRef(!!skipInitialFocus);
  const dragRef = useRef<DragState | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

  const handleTitleBarPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isMaximized || isOnTitleBarButton(e.target) || isPhoneLayout()) return;

    const container = containerRef.current;
    const desktop = container?.offsetParent;
    if (!container || !desktop) return;

    const windowRect = container.getBoundingClientRect();
    const desktopRect = desktop.getBoundingClientRect();

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: dragOffset.x,
      originY: dragOffset.y,
      minX: dragOffset.x + desktopRect.left - windowRect.right + MIN_VISIBLE_TITLE_BAR,
      maxX: dragOffset.x + desktopRect.right - windowRect.left - MIN_VISIBLE_TITLE_BAR,
      minY: dragOffset.y + desktopRect.top - windowRect.top,
      maxY: dragOffset.y + desktopRect.bottom - windowRect.top - TITLE_BAR_HEIGHT,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  const handleTitleBarPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    setDragOffset({
      x: clamp(drag.originX + e.clientX - drag.startX, drag.minX, drag.maxX),
      y: clamp(drag.originY + e.clientY - drag.startY, drag.minY, drag.maxY),
    });
  }

  const handleTitleBarPointerUp = () => {
    dragRef.current = null;
  }

  // Like XP, double-clicking the title bar maximizes or restores the window
  const handleTitleBarDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isOnTitleBarButton(e.target) || isPhoneLayout()) return;
    toggleMaximizeProgram(id);
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
      style={{ "--drag-x": `${dragOffset.x}px`, "--drag-y": `${dragOffset.y}px` } as CSSProperties}
      $zIndex={zIndex}
      $cascadeIndex={cascadeIndex}
      $isMaximized={isMaximized}
    >
      <DocumentViewerHeader
        $isActive={isActive}
        $isDraggable={!isMaximized}
        onPointerDown={handleTitleBarPointerDown}
        onPointerMove={handleTitleBarPointerMove}
        onPointerUp={handleTitleBarPointerUp}
        onPointerCancel={handleTitleBarPointerUp}
        onDoubleClick={handleTitleBarDoubleClick}
      >
        <DocumentViewerHeaderTitle id={titleId} $isActive={isActive}>
          <Image src={getShortcutProgramIcon(programType)} alt="" width={20} height={20} />
          {name}
        </DocumentViewerHeaderTitle>
        <DocumentViewerHeaderButtons>
          <DocumentViewerHeaderMinimizeButton
            type="button"
            aria-label={`Minimize ${name}`}
            onClick={() => minimizeProgram(id)}
          >
            <WindowButtonIcon type="minimize" />
          </DocumentViewerHeaderMinimizeButton>
          <DocumentViewerHeaderMaximizeButton
            type="button"
            aria-label={`${isMaximized ? "Restore" : "Maximize"} ${name}`}
            onClick={() => toggleMaximizeProgram(id)}
          >
            <WindowButtonIcon type={isMaximized ? "restore" : "maximize"} />
          </DocumentViewerHeaderMaximizeButton>
          <DocumentViewerHeaderCloseButton
            type="button"
            aria-label={`Close ${name}`}
            onClick={closeDocumentViewer}
          >
            <WindowButtonIcon type="close" />
          </DocumentViewerHeaderCloseButton>
        </DocumentViewerHeaderButtons>
      </DocumentViewerHeader>
      {body}
    </DocumentViewerContainer>
  )
}

export default DocumentViewer
