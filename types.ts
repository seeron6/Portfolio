
export enum Era {
  RETRO = 'RETRO',
  MODERN = 'MODERN',
  FUTURE = 'FUTURE'
}

export interface Project {
  title: string;
  tech: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export interface ResumeData {
  header: {
    name: string;
    contact: {
      phone: string;
      email: string;
      linkedin: string;
      github: string;
    };
  };
  education: {
    school: string;
    degree: string;
  }[];
  experience: Experience[];
  projects: Project[];
  skills: {
    languages: string;
    frameworks: string;
    tools: string;
    libraries: string;
  };
}
