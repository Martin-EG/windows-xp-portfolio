"use client"

import { useSessionStore } from "@/store";
import { LOGGED_IN_STORAGE_KEY } from "@/utils";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";

import StartLogo from "../StartLogo";

import {
  BootBrand,
  BootHint,
  BootName,
  BootOverlay,
  BootProduct,
  BootProgress,
  BootProgressBlocks,
  BootTitle,
  LoginBar,
  LoginDivider,
  LoginFooterButton,
  LoginFooterNote,
  LoginInstructions,
  LoginIntro,
  LoginMain,
  LoginOverlay,
  LoginTitle,
  LoginUserButton,
  LoginUserName,
  LoginUsers,
  RestartButton,
  SafeToTurnOffMessage,
  SafeToTurnOffOverlay,
  ShuttingDownOverlay,
} from "./SessionScreen.styles";

const BOOT_DURATION_MS = 2500;
const SHUTDOWN_DURATION_MS = 1500;

const isLoggedInThisSession = () => {
  try {
    return sessionStorage.getItem(LOGGED_IN_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

const BootScreen: FC = () => {
  const finishBoot = useSessionStore((state) => state.finishBoot);

  // Any key or click skips the boot animation
  useEffect(() => {
    // Swallow the key so it doesn't also press the login button that receives focus next
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      e.preventDefault();
      finishBoot();
    }

    const timeoutId = setTimeout(finishBoot, BOOT_DURATION_MS);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishBoot]);

  return (
    <BootOverlay data-session-screen="booting" role="status" aria-label="Starting up" onClick={finishBoot}>
      <BootBrand>
        <StartLogo size={72} />
        <BootTitle>
          <BootName>Martin Espericueta</BootName>
          <BootProduct>Portfolio<sup>xp</sup></BootProduct>
        </BootTitle>
      </BootBrand>
      <BootProgress aria-hidden="true">
        <BootProgressBlocks>
          <span />
          <span />
          <span />
        </BootProgressBlocks>
      </BootProgress>
      <BootHint>Press any key to skip</BootHint>
    </BootOverlay>
  );
}

const LoginScreen: FC = () => {
  const { logIn, turnOff } = useSessionStore((state) => state);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    userButtonRef.current?.focus();
  }, []);

  return (
    <LoginOverlay role="dialog" aria-modal="true" aria-labelledby="login-title">
      <LoginBar />
      <LoginMain>
        <LoginIntro>
          <StartLogo size={64} />
          <LoginTitle id="login-title">welcome</LoginTitle>
          <LoginInstructions>To begin, click your user name</LoginInstructions>
        </LoginIntro>
        <LoginDivider />
        <LoginUsers>
          <LoginUserButton ref={userButtonRef} type="button" onClick={logIn}>
            <Image src="/images/profile-image.jpg" alt="" width={64} height={64} />
            <LoginUserName>
              Martin Espericueta
              <small>Software Engineer</small>
            </LoginUserName>
          </LoginUserButton>
        </LoginUsers>
      </LoginMain>
      <LoginBar>
        <LoginFooterButton type="button" onClick={turnOff}>
          <span aria-hidden="true">⏻</span>
          Turn off computer
        </LoginFooterButton>
        <LoginFooterNote>
          After you log on, double-click the icons on the desktop or use the Start menu to explore my work.
        </LoginFooterNote>
      </LoginBar>
    </LoginOverlay>
  );
}

const ShutdownScreen: FC = () => {
  const restart = useSessionStore((state) => state.restart);
  const [isSafeToTurnOff, setIsSafeToTurnOff] = useState(false);
  const restartButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsSafeToTurnOff(true), SHUTDOWN_DURATION_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isSafeToTurnOff) restartButtonRef.current?.focus();
  }, [isSafeToTurnOff]);

  if (!isSafeToTurnOff) {
    return (
      <ShuttingDownOverlay role="status">
        <StartLogo size={48} />
        Shutting down…
      </ShuttingDownOverlay>
    );
  }

  return (
    <SafeToTurnOffOverlay role="dialog" aria-modal="true" aria-labelledby="safe-to-turn-off">
      <SafeToTurnOffMessage id="safe-to-turn-off">
        It’s now safe to turn off your computer.
      </SafeToTurnOffMessage>
      <RestartButton ref={restartButtonRef} type="button" onClick={restart}>
        Restart
      </RestartButton>
    </SafeToTurnOffOverlay>
  );
}

const SessionScreen: FC = () => {
  const phase = useSessionStore((state) => state.phase);
  const logIn = useSessionStore((state) => state.logIn);

  // Visitors who already logged in during this tab session go straight to the desktop.
  // The inline script in the layout hides the boot screen before paint in that case.
  useEffect(() => {
    if (isLoggedInThisSession()) logIn();
    delete document.documentElement.dataset.skipBoot;
  }, [logIn]);

  switch (phase) {
    case "booting":
      return <BootScreen />;
    case "login":
      return <LoginScreen />;
    case "shutdown":
      return <ShutdownScreen />;
    default:
      return null;
  }
}

export default SessionScreen;
