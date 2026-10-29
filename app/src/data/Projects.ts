import { Project } from "@/types"

export const projects: Project[] = [
  {
    id: 1,
    name: "GlamVault",
    description: "GlamVault is a digital inventory for makeup products. Users can store their products, organize them into collections, and add products to their wishlist.",
    url: "https://try-glamvault.vercel.app/",
    urlText: "GlamVault website",
    preview: {
      webm: "/videos/glamvault.webm",
      mp4: "/videos/glamvault.mp4",
      poster: "/videos/glamvault-poster.jpg",
      width: 1280,
      height: 492,
    },
    technologies: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS", "styled-components", "Prisma", "PostgreSQL", "NestJS"]
  },
  {
    id: 2,
    name: "GlamUI",
    description: "A personal component library for React built with styled-components.",
    url: "https://github.com/Martin-EG/glamui-react",
    urlText: "GlamUI on GitHub",
    preview: {
      webm: "/videos/glamui.webm",
      mp4: "/videos/glamui.mp4",
      poster: "/videos/glamui-poster.jpg",
      width: 1280,
      height: 578,
    },
    technologies: ["React", "styled-components", "TypeScript"]
  },
  {
    id: 3,
    name: "Doctor Allways",
    description: "Built the new Doctor Allways website with a friendlier UI and fixed long-standing issues in the booking process.",
    url: "https://doctorallways.com/",
    urlText: "Doctor Allways website",
    preview: {
      webm: "/videos/drallways.webm",
      mp4: "/videos/drallways.mp4",
      poster: "/videos/drallways-poster.jpg",
      width: 1280,
      height: 646,
    },
    technologies: ["React", "JavaScript", "HTML", "CSS"]
  },
  {
    id: 4,
    name: "CESPM app",
    description: "Redesigned and developed a new version of the CESPM app, making its UI more user-friendly.",
    url: "https://play.google.com/store/apps/details?id=com.cespmapp&hl=es_MX",
    urlText: "CESPM app in Play store",
    preview: {
      webm: "/videos/cespm_redesign.webm",
      mp4: "/videos/cespm_redesign.mp4",
      poster: "/videos/cespm_redesign-poster.jpg",
      width: 480,
      height: 1066,
    },
    technologies: ["React Native", "TypeScript"]
  }
]