export type Project = {
  id: number;
  name: string;
  description: string;
  url?: string;
  urlText?: string;
  image: string;
  technologies?: string[];
}