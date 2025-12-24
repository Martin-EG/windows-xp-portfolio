
import { FC } from "react";
import Image from "next/image";

import { ShortcutButton } from "./Shortcut.styles";

interface ShortcutProps {
  readonly name: string;
  readonly shortcutType: "folder" | "internet";
}

const Shortcut: FC<ShortcutProps> = ({ name, shortcutType }) => {
  const ariaLabel = shortcutType === "folder"
    ? `Open ${name} folder`
    : `Go to ${name} page`;
  const imageProps = shortcutType === "folder"
    ? { src: "/images/ClosedFolder48.svg", alt: `${name} folder shortcut` }
    : { src: "/images/InternetExplorer48.png", alt: `${name} internet shortcut` };

  return (
    <ShortcutButton aria-label={ariaLabel} >
      <Image {...imageProps} width={48} height={48} />
      {name}
    </ShortcutButton >
  );
};

export default Shortcut;
