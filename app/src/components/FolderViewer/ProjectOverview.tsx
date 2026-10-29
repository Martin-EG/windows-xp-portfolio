"use client"

import { useOpenedProjectStore } from "@/store";
import { useEffect, useState } from "react";

import {
  FolderViewerRightPanel,
  ProjectLink,
  ProjectPreviewVideo,
  ProjectPreviewWrapper,
  ProjectTitle,
  VisuallyHidden,
} from "./FolderViewer.styles"

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

const ProjectOverview = () => {
  const { project } = useOpenedProjectStore((state) => state);
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!project) return null;

  const { preview } = project;

  return (
    <FolderViewerRightPanel $isSomeProjectOpened={!!project}>
      <ProjectPreviewWrapper>
        {/* Keyed by project so switching projects loads the new sources */}
        <ProjectPreviewVideo
          key={project.id}
          width={preview.width}
          height={preview.height}
          poster={preview.poster}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label={`Video preview of ${project.name}`}
        >
          <source src={preview.webm} type="video/webm" />
          <source src={preview.mp4} type="video/mp4" />
        </ProjectPreviewVideo>
      </ProjectPreviewWrapper>
      <div>
        <ProjectTitle>{project.name}</ProjectTitle>
        <p>{project.description}</p>
        <p><b>Technologies:</b> {project.technologies?.join(", ")}</p>
        <ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
          {project.urlText}<VisuallyHidden> (opens in a new tab)</VisuallyHidden>
        </ProjectLink>
      </div>
    </FolderViewerRightPanel>
  )
}

export default ProjectOverview
