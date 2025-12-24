"use client"
import { Program } from "@/types";
import { create } from "zustand";

interface OpenedProgramsState {
  programs: Program[];
  addProgram: (program: Program) => void;
  removeProgram: (programId: number) => void;
  toggleProgram: (programId: number) => void;
}

export const useOpenedProgramsStore = create<OpenedProgramsState>((set) => ({
  programs: [
    {
      id: 1,
      name: "Welcome",
      isActive: true,
      programType: "document",
    }
  ],
  addProgram: (newProgram: Program) => set(
    (state) => ({
      programs: [...state.programs, newProgram]
    })
  ),
  removeProgram: (programId: number) => set(
    (state) => ({
      programs: state.programs.filter((program) => program.id !== programId)
    })
  ),
  toggleProgram: (programId: number) => set(
    (state) => ({
      programs: state.programs.map((program) => (program.id === programId
        ? { ...program, isActive: !program.isActive }
        : program
      ))
    })
  ),
}));