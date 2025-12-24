"use client"

import { useOpenedProjectStore } from "@/store";
import { Project } from "@/types";
import Image from "next/image";

import {
  FolderViewerRightPanel,
} from "./FolderViewer.styles"

const ProjectOverview = () => {
  const { project } = useOpenedProjectStore((state) => state);

  if (!project) return null;

  const imageWidth = project.id === 2 ? 200 : 1200;

  return (
    <FolderViewerRightPanel $isSomeProjectOpened={!!project}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <Image src={project.image} alt={project.name} width={imageWidth} height={500} />
      </div>
      <div>
        <h2 style={{ fontWeight: "bold" }}>{project.name}</h2>
        <p>{project.description}</p>
        <p><b>Technologies:</b> {project.technologies?.join(", ")}</p>
        <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>{project.urlText}</a>

      </div>
    </FolderViewerRightPanel>
  )
}

export default ProjectOverview
