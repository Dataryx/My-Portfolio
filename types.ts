
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github: string;
}

export interface Skill {
  name: string;
  category: 'Data Ingestion' | 'Data Platforms' | 'Data Orchestration' | 'Data Tools';
  level: number;
}

export interface AIRecommendation {
  projectName: string;
  techStack: string[];
  description: string;
  difficulty: string;
}
