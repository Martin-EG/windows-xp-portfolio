import { FC } from "react";

type WindowButtonIconType = "minimize" | "maximize" | "restore" | "close";

const paths: Record<WindowButtonIconType, string> = {
  minimize: "M3 10h6v2H3z",
  maximize: "M2 2h10v10H2z M3.5 4.5v6h7v-6z",
  restore: "M4 1h8v8h-2V3H4z M1 4h8v8H1z M2.5 6.5v4h5v-4z",
  close: "M2.5 1.5 6.5 5.5 10.5 1.5 12 3 8 7 12 11 10.5 12.5 6.5 8.5 2.5 12.5 1 11 5 7 1 3z",
};

// Glyphs drawn on the title bar buttons; the buttons carry the accessible name
export const WindowButtonIcon: FC<{ readonly type: WindowButtonIconType }> = ({ type }) => (
  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 13 13" fill="currentColor" fillRule="evenodd">
    <path d={paths[type]} />
  </svg>
);
