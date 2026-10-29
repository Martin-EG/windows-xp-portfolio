"use client"
import { LOGGED_IN_STORAGE_KEY } from "@/utils";
import { create } from "zustand";

export type SessionPhase = "booting" | "login" | "desktop" | "shutdown";

const rememberLogin = (isLoggedIn: boolean) => {
  try {
    if (isLoggedIn) {
      sessionStorage.setItem(LOGGED_IN_STORAGE_KEY, "1");
    } else {
      sessionStorage.removeItem(LOGGED_IN_STORAGE_KEY);
    }
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the boot screen just shows again
  }
}

interface SessionState {
  phase: SessionPhase;
  finishBoot: () => void;
  logIn: () => void;
  logOff: () => void;
  turnOff: () => void;
  restart: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  // Matches the server render; returning visitors are moved to the desktop after hydration
  phase: "booting",
  finishBoot: () => set({ phase: "login" }),
  logIn: () => {
    rememberLogin(true);
    set({ phase: "desktop" });
  },
  logOff: () => {
    rememberLogin(false);
    set({ phase: "login" });
  },
  turnOff: () => {
    rememberLogin(false);
    set({ phase: "shutdown" });
  },
  restart: () => set({ phase: "booting" }),
}));
