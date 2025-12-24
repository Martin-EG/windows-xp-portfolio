"use client"

import { useOpenedProjectStore } from "@/store";
import { Project } from "@/types";
import Image from "next/image";

import {
  FolderViewerBody,
  FolderViewerLeftPanel,
  ProjectWrapper,
} from "./FolderViewer.styles"

import ProjectOverview from "./ProjectOverview";

const projects: Project[] = [
  {
    id: 1,
    name: "Doctor Allways",
    description: "Built the new doctor allways website with a best and friendly UI and fixing old issues with booking process.",
    url: "https://doctorallways.com/",
    urlText: "Doctor Allways website",
    image: "/images/drallways_gif.gif",
    technologies: ["React", "Javascript", "HTML", "CSS"]
  },
  {
    id: 2,
    name: "CESPM app",
    description: "Redesign and develop of a new version of the CESPM app, where I improved the app UI making it more friendly for the user.",
    url: "https://play.google.com/store/apps/details?id=com.cespmapp&hl=es_MX",
    urlText: "CESPM app in Play store",
    image: "/images/cespm_redesign_gif.gif",
    technologies: ["React Native", "TypeScript"]
  }
]

const FolderViewer = () => {
  const { project: activeProject, openProject } = useOpenedProjectStore((state) => state);


  return (

    <FolderViewerBody>
      <FolderViewerLeftPanel $isSomeProjectOpened={!!activeProject}>
        {projects.map((project) => (
          <ProjectWrapper
            key={project.id}
            onClick={() => openProject(project)}
            $isProjectActive={project.id === activeProject?.id}
          >
            <Image src="/images/Document48.png" alt={`${project.name} project`} width={48} height={48} />
            {project.name}
          </ProjectWrapper>
        ))}

      </FolderViewerLeftPanel>
      <ProjectOverview />
    </FolderViewerBody>
  )
}

export default FolderViewer
