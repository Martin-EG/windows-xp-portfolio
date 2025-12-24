"use client"
import { create } from "zustand";

interface StartMenuState {
  isOpen: boolean;
  shouldShowStartMenu: boolean;
  toggleStartMenu: () => void;
}

export const useStartMenuStore = create<StartMenuState>((set) => ({
  isOpen: false,
  shouldShowStartMenu: false,
  toggleStartMenu: () => set((state) => ({ isOpen: !state.isOpen, shouldShowStartMenu: true })),
}));