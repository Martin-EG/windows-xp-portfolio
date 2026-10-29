export type ProjectPreview = {
  webm: string;
  mp4: string;
  poster: string;
  width: number;
  height: number;
}

export type Project = {
  id: number;
  name: string;
  description: string;
  url?: string;
  urlText?: string;
  preview: ProjectPreview;
  technologies?: string[];
}
