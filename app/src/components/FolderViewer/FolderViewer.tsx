"use client"

import { useOpenedProjectStore } from "@/store";
import Image from "next/image";

import { projects } from "../../data";

import {
  FolderViewerBody,
  FolderViewerLeftPanel,
  ProjectWrapper,
} from "./FolderViewer.styles"
import ProjectOverview from "./ProjectOverview";

const FolderViewer = () => {
  const { project: activeProject, openProject } = useOpenedProjectStore((state) => state);

  return (
    <FolderViewerBody>
      <FolderViewerLeftPanel $isSomeProjectOpened={!!activeProject}>
        {projects.map((project) => (
          <ProjectWrapper
            key={project.id}
            type="button"
            onClick={() => openProject(project)}
            aria-pressed={project.id === activeProject?.id}
            $isProjectActive={project.id === activeProject?.id}
          >
            <Image src="/images/Document48.png" alt="" width={48} height={48} />
            {project.name}
          </ProjectWrapper>
        ))}

      </FolderViewerLeftPanel>
      <ProjectOverview />
    </FolderViewerBody>
  )
}

export default FolderViewer
