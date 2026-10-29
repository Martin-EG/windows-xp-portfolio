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
  // After booting the login screen continues by itself; after Log Off it waits for a click
  shouldAutoLogIn: boolean;
  finishBoot: () => void;
  logIn: () => void;
  logOff: () => void;
  turnOff: () => void;
  restart: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  // Matches the server render; returning visitors are moved to the desktop after hydration
  phase: "booting",
  shouldAutoLogIn: true,
  finishBoot: () => set({ phase: "login", shouldAutoLogIn: true }),
  logIn: () => {
    rememberLogin(true);
    set({ phase: "desktop" });
  },
  logOff: () => {
    rememberLogin(false);
    set({ phase: "login", shouldAutoLogIn: false });
  },
  turnOff: () => {
    rememberLogin(false);
    set({ phase: "shutdown" });
  },
  restart: () => set({ phase: "booting" }),
}));
