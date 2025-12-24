"use client"

import { Program } from "@/types";
import { useOpenedProgramsStore } from "@/store";
import { useCallback } from "react";

type UseOpenProgramCallback = (program: Program) => () => void;
export const useOpenProgramCallback: UseOpenProgramCallback = (program) => {
  const { programs, addProgram, removeProgram, toggleProgram } = useOpenedProgramsStore((state) => state);

  return useCallback(() => {
    const currentProgram = programs[0];
    if (currentProgram && currentProgram.id === program.id && currentProgram.isActive) {
      return;
    }

    if (currentProgram && currentProgram.id === program.id) {
      return toggleProgram(program.id);
    }

    if (currentProgram) {
      removeProgram(currentProgram.id);
    }

    addProgram({ ...program, isActive: true });
  }, [programs, addProgram, removeProgram, toggleProgram])
}