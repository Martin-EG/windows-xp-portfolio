"use client"

import { useOpenedProjectStore } from "@/store";
import { useEffect, useState } from "react";

import {
  FolderViewerRightPanel,
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        {/* Keyed by project so switching projects loads the new sources */}
        <video
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
          style={{ maxWidth: "100%", maxHeight: 500, width: "auto", height: "auto" }}
        >
          <source src={preview.webm} type="video/webm" />
          <source src={preview.mp4} type="video/mp4" />
        </video>
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
