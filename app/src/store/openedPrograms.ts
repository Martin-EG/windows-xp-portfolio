"use client"
import { OpenedProgram, Program, ProgramId } from "@/types";
import { create } from "zustand";

const CASCADE_SLOTS = 5;

interface OpenedProgramsState {
  // In the order they were opened, which is the order shown in the taskbar
  programs: OpenedProgram[];
  // Window stacking order; the last id is the top-most window
  zOrder: ProgramId[];
  openProgram: (program: Program) => void;
  closeProgram: (programId: ProgramId) => void;
  focusProgram: (programId: ProgramId) => void;
  minimizeProgram: (programId: ProgramId) => void;
}

const bringToFront = (zOrder: ProgramId[], programId: ProgramId) => [
  ...zOrder.filter((id) => id !== programId),
  programId,
];

// The active window is the top-most one that isn't minimized
export const selectActiveProgramId = ({ programs, zOrder }: OpenedProgramsState) =>
  [...zOrder].reverse().find((id) =>
    programs.some((program) => program.id === id && !program.isMinimized)
  );

export const useOpenedProgramsStore = create<OpenedProgramsState>((set) => ({
  programs: [
    {
      id: "welcome",
      name: "Welcome",
      programType: "document",
      isMinimized: false,
      cascadeIndex: 0,
      skipInitialFocus: true,
    }
  ],
  zOrder: ["welcome"],
  openProgram: (program) => set((state) => {
    const isAlreadyOpen = state.programs.some(({ id }) => id === program.id);

    if (isAlreadyOpen) {
      return {
        programs: state.programs.map((openedProgram) => openedProgram.id === program.id
          ? { ...openedProgram, isMinimized: false }
          : openedProgram
        ),
        zOrder: bringToFront(state.zOrder, program.id),
      };
    }

    const usedCascadeSlots = new Set(state.programs.map(({ cascadeIndex }) => cascadeIndex));
    const freeSlot = Array.from({ length: CASCADE_SLOTS }, (_, slot) => slot)
      .find((slot) => !usedCascadeSlots.has(slot));

    return {
      programs: [
        ...state.programs,
        {
          ...program,
          isMinimized: false,
          cascadeIndex: freeSlot ?? state.programs.length % CASCADE_SLOTS,
        },
      ],
      zOrder: bringToFront(state.zOrder, program.id),
    };
  }),
  closeProgram: (programId) => set((state) => ({
    programs: state.programs.filter(({ id }) => id !== programId),
    zOrder: state.zOrder.filter((id) => id !== programId),
  })),
  focusProgram: (programId) => set((state) => ({
    programs: state.programs.map((program) => program.id === programId
      ? { ...program, isMinimized: false }
      : program
    ),
    zOrder: bringToFront(state.zOrder, programId),
  })),
  minimizeProgram: (programId) => set((state) => ({
    programs: state.programs.map((program) => program.id === programId
      ? { ...program, isMinimized: true }
      : program
    ),
  })),
}));
