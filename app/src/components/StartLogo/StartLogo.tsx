import { FC } from "react";

// A small four-colour waving flag in the spirit of the XP Start button
const StartLogo: FC<{ readonly size?: number }> = ({ size = 22 }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24">
    <path d="M2 4.5c2.6-1.4 5.3-1.4 8 0v7c-2.7-1.4-5.4-1.4-8 0z" fill="#F35325" />
    <path d="M12 4.5c2.7 1.4 5.4 1.4 8 0v7c-2.6 1.4-5.3 1.4-8 0z" fill="#81BC06" />
    <path d="M2 13.5c2.6-1.4 5.3-1.4 8 0v7c-2.7-1.4-5.4-1.4-8 0z" fill="#05A6F0" />
    <path d="M12 13.5c2.7 1.4 5.4 1.4 8 0v7c-2.6 1.4-5.3 1.4-8 0z" fill="#FFBA08" />
  </svg>
);

export default StartLogo;
