"use client"

import { useOpenedProjectStore } from "@/store";
import Image from "next/image";

import {
  FolderViewerRightPanel,
} from "./FolderViewer.styles"

const ProjectOverview = () => {
  const { project } = useOpenedProjectStore((state) => state);

  if (!project) return null;

  const imageWidth = project.id === 4 ? 200 : 1500;

  return (
    <FolderViewerRightPanel $isSomeProjectOpened={!!project}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <Image src={project.image} alt={`Animated preview of ${project.name}`} width={imageWidth} height={500} />
      </div>
      <div>
        <h2 style={{ fontWeight: "bold" }}>{project.name}</h2>
        <p>{project.description}</p>
        <p><b>Technologies:</b> {project.technologies?.join(", ")}</p>
        <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>
          {project.urlText}<span className="sr-only"> (opens in a new tab)</span>
        </a>

      </div>
    </FolderViewerRightPanel>
  )
}

export default ProjectOverview
