"use client"

import { useOpenedProjectStore } from "@/store";
import { Project } from "@/types";
import { FC, useEffect, useState } from "react";

import {
  FolderViewerRightPanel,
  ProjectLink,
  ProjectPreviewFrame,
  ProjectPreviewLoading,
  ProjectPreviewLoadingBar,
  ProjectPreviewVideo,
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

// Keyed by project in the parent, so every project starts in the loading state
const ProjectPreview: FC<{ readonly project: Project }> = ({ project }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);
  const { preview } = project;
  const markLoaded = () => setIsLoaded(true);

  return (
    <ProjectPreviewFrame aria-busy={!isLoaded}>
      <ProjectPreviewVideo
        width={preview.width}
        height={preview.height}
        poster={preview.poster}
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        // Native controls (and the browser's own spinner) only once loaded, so they don't fight the overlay
        controls={isLoaded}
        preload="auto"
        aria-label={`Video preview of ${project.name}`}
        onLoadedData={markLoaded}
        onError={markLoaded}
      >
        <source src={preview.webm} type="video/webm" />
        {/* Source errors fire on the <source>, not the video; stop loading once the last one fails */}
        <source src={preview.mp4} type="video/mp4" onError={markLoaded} />
      </ProjectPreviewVideo>

      {!isLoaded && (
        <ProjectPreviewLoading role="status">
          <ProjectPreviewLoadingBar aria-hidden="true">
            <div>
              <span />
              <span />
              <span />
            </div>
          </ProjectPreviewLoadingBar>
          Loading preview…
        </ProjectPreviewLoading>
      )}
    </ProjectPreviewFrame>
  );
}

const ProjectOverview = () => {
  const { project } = useOpenedProjectStore((state) => state);

  if (!project) return null;

  return (
    <FolderViewerRightPanel $isSomeProjectOpened={!!project}>
      <ProjectPreview key={project.id} project={project} />
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
