"use client"
import { Project } from "@/types";
import { create } from "zustand";

interface OpenedProjectState {
  project: Project | null;
  openProject: (project: Project) => void;
  closeProject: () => void;
}

export const useOpenedProjectStore = create<OpenedProjectState>((set) => ({
  project: null,
  openProject: (project: Project) => set(
    (state) => ({
      project: project
    })
  ),
  closeProject: () => set(
    (state) => ({
      project: null
    })
  ),
}));
